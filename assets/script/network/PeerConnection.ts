import { _decorator, Vec3, v3 } from 'cc';
const { ccclass, property } = _decorator;

import GameEvent from "../base/GameEvent";
import Connection from "./Connection";
import {encode, decode} from "../base/base64/Base64";
import proto from "./proto/proto.js"
import UserInfo from '../base/UserInfo';

export default class PeerConnection extends Connection {

	private static _instance: PeerConnection = null;   

	public static instance(): PeerConnection {
        return PeerConnection._instance;
	}

	public constructor() {
		super();

		PeerConnection._instance  = this;
		super.addCallback(this, this.onConnected, this.onConnectionClosed, this.onConnectionError);				
	}	

	public onRegisterEntry(channel: any): void {
		this.registerCommandEntry(channel, "placeables", this, this.msgPlace);		
		this.registerCommandEntry(channel, "messages", this, this.msgChat);
		this.registerCommandEntry(channel, "move", this, this.msgMoving);
	}

	protected registerCommandEntry(channel: any, command: string, caller: any, listener: Function): void {
		channel.on(command, resp => { listener.call(caller, resp.data); });		
	}

	private onConnected(): void {
		console.log("Connect to server successed!");

		this.connectToChannel();
	}
	
	private onConnectionClosed(): void {
		GameEvent.emit(GameEvent.CONNECTION_CLOSED);
	}

	private onConnectionError(event: any): void {		
		GameEvent.emit(GameEvent.CONNECTION_ERROR, event);
		console.log("Connection error:");
		console.log(event);
	}

	public login(httpUrl: string, wsUrl: string): void {

		let thisSelf = this;
		let account = UserInfo.account;
		super.httpConnect(httpUrl, account, this, 
			function(result: any, token: any, id?: any, nickname?: any, character?: any): void {
				console.log("http login result=%d, token&msg=%s", result, token);
				
				if(result == 1){
					UserInfo.id = id;
					UserInfo.token = token;
					UserInfo.role = character;
					UserInfo.nickName = nickname;
					
					thisSelf.connect(wsUrl, token); 
				}
		});
	}	

	public sendChat(text: string): void {

		if(this.channel){
			let Message = proto.game.Message;
			let message = Message.create({
				id: "1",
				nickname: UserInfo.account,
				data: text
			});
			
			let msg = Message.encode(message).finish();
			this.channel.push("talk", {payload: encode(msg)})
				.receive("ok", () => console.log("push chat message ok!"))
				.receive("error", (reasons) => console.log("push chat message failed:%s", reasons) );
		}
	}

	public sendMoving(type: number, startPos: Vec3, rotation: Vec3): void {
		if(this.channel){
			let Point = proto.game.Point;
			let Move = proto.game.Move;			
			let move = Move.create({
				moveType: type,
				stratPos: Point.create({
					x: Math.floor(startPos.x * 1000), 
					y: Math.floor(startPos.y * 1000), 
					z: Math.floor(startPos.z * 1000)
				}),
				rotation: Point.create({
					x: Math.floor(rotation.x * 1000), 
					y: Math.floor(rotation.y * 1000), 
					z: Math.floor(rotation.z * 1000)
				}),
			});

			let msg = Move.encode(move).finish();
			this.channel.push("move", {payload: encode(msg)});
		}
	}

	private msgKeepAlive(buffer: any): void {
		console.log("keep alive " + new Date(Date.now()).toLocaleTimeString());
	}

	private msgPlace(data: any): void {
		let Placeables = proto.game.Placeables;
		let places = Placeables.decode(decode(data));

		console.log("on Placeables");

		let result = places.result;
		let length = places.result.length;
		for(var i = 0; i < length; i++){
			let thisMsg = result[i];
			let id = thisMsg.id;			
			let nickName = thisMsg.nickname;
			let character = thisMsg.character;
			let position = v3(thisMsg.x, thisMsg.y, thisMsg.z);
			GameEvent.emit(GameEvent.ON_ROLE_LOCATION, id, character, nickName, position);
		}
	}

	private msgChat(data: any): void {
		let Messages = proto.game.Messages;
		let messages = Messages.decode(decode(data));
		let result = messages.result;
		let length = result.length;
		for(var i = 0; i < length; i ++) {
			let thisMsg = result[i];
			GameEvent.emit(GameEvent.ON_CHAT_MESSAGE, thisMsg.nickname, thisMsg.data);
		}
	}

	private msgMoving(data: any): void {
		let Move = proto.game.Move;
		let move = Move.decode(decode(data));
		let thisStart = move.stratPos;
		let thisRotat = move.rotation;
		let startPos = v3(thisStart.x / 1000, thisStart.y / 1000, thisStart.z / 1000);
		let rotation = v3(thisRotat.x / 1000, thisRotat.y / 1000, thisRotat.z / 1000);
		GameEvent.emit(GameEvent.ON_ROLE_MOVING, move.id, move.moveType, startPos, rotation);
	}
}

var _peerConnection = new PeerConnection();