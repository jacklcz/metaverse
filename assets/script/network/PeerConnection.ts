import GameEvent from "../base/GameEvent";
import Connection from "./Connection";
import {encode, decode} from "../base/base64/Base64";
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
		this.registerCommandEntry(channel, "messages", this, this.msgChat);
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

	public sendChat(text: string): void {

		if(this.channel){
			let Message = proto.game.Message;
			let message = Message.create({
				id: "1",
				nickname: "111",
				data: text
			});
			
			let msg = Message.encode(message).finish();
			this.channel.push("talk", {payload: encode(msg)})
				.receive("ok", () => console.log("push chat message ok!"))
				.receive("error", (reasons) => console.log("push chat message failed:%s", reasons) );
		}
	}

	private msgKeepAlive(buffer: any): void {
		console.log("keep alive " + new Date(Date.now()).toLocaleTimeString());
	}

	private msgPosition(data: any): void {
		let Placeables = proto.game.Placeables;
		let placeables = Placeables.decode(decode(data));
      	console.log(placeables);
	}

	private msgChat(data: any): void {
		let Messages = proto.game.Messages;
		let messages = Messages.decode(decode(data));
		let result = messages.result;
		let length = result.length;
		for(var i = 0; i < length; i ++){
			let thisMsg = result[i];
			GameEvent.emit(GameEvent.ON_CHAT_MESSAGE, thisMsg.nickname, thisMsg.data);
		}
	}
}

var _peerConnection = new PeerConnection();