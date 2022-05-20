import GameEvent from "../base/GameEvent";
import Connection from "./Connection";
import {encode, decode} from "../base/base64/Base64";
import protobufjs from 'protobufjs';
import proto from "./proto/proto.js"

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
		this.registerCommandEntry(channel, "placeables", this, this.msgPosition);		
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

	public login(httpUrl: string, wsUrl: string, account: string): void {

		let thisSelf = this;
		super.httpConnect(httpUrl, account, this, function(result: any, token: any): void {
			console.log("http login result=%d, token&msg=%s", result, token);
			
			if(result == 1){
				thisSelf.connect(wsUrl, token); 
			}
		});
	}	

	private msgKeepAlive(buffer: any): void {
		console.log("keep alive " + new Date(Date.now()).toLocaleTimeString());
	}

	private msgPosition(data: any): void {
		let Placeables = proto.game.Placeables;
		let placeables = Placeables.decode(decode(data));
      	console.log(placeables)
	}

	private msgResultMsg(buffer: any): void {
		//var thisMsg: resultMsg = new resultMsg();
		//if (thisMsg.fromBinaryBuffer(buffer)) {
		//	try{
		//		let command = thisMsg._resultCmd
		//		if(command in this._resultEntry) {	
		//			let entry = this._resultEntry[command];					
		//			let resultFunction: Function = entry[1];
		//			resultFunction.call(entry[0], thisMsg);
		//		}
		//		else console.log("Message result command = " + command.toString(16) + " not entry function!");
		//	}catch(error) {
		//	}
		//}
		//else console.log("Error reading ResultMsg message data!");
	}

	private msgLoginScene(buffer: any): void {
		//var thisMsg: loginScene = new loginScene();
		//if(thisMsg.fromBinaryBuffer(buffer)){
		//	GameEvent.emit(GameEvent.LOGIN_ROLE_SCENE, thisMsg);
		//}
		//else console.log("Error reading LoginScene message data!");
	}	
}

var _peerConnection = new PeerConnection();