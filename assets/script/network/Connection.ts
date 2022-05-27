import {encode, decode} from "../base/base64/Base64";
import Define from "../base/Define";
import GameEvent from "../base/GameEvent";
import proto from "./proto/proto.js";
import {Socket, Presence} from "phoenix";
import UserInfo from "../base/UserInfo";
import { Vec3 } from "cc";

export default abstract class Connection {
		
	private _channel: any = null;
	private _socket: Socket = null;	
	private _eventCaller: any;
	private _onConnected: any;
	private _onSocketError: any;
	private _onSocketClose: any;

	public constructor() {		
		this._socket = null;
		this._onConnected = null;
		this._onSocketError = null;
		this._onSocketClose = null;
		this._eventCaller = this;
	}

	abstract onRegisterEntry(channel: any);

	public get channel(): any {
		return this._channel;
	}

	protected httpConnect(httpUrl: string, acount: string, caller: any, listener: Function): void{
		
		let thisSelf = this;
		let xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function () {
			if (xhr.readyState == 4) {				
				if(xhr.status >= 200 && xhr.status < 400){
					var response = xhr.responseText;
					console.log("loginRequest reponse:" + response);

					const HttpResponse = proto.game.Response;
					let resp = HttpResponse.decode(decode(response));	
					if(resp.code == 1){
						let LoginResponse = proto.game.LoginResponse;
						let theResp = LoginResponse.decode(resp.data.value);
						listener.call(caller, resp.code, theResp.token, theResp.id, theResp.nickname, theResp.character);
					}
					else listener.call(caller, 0, resp.message);
				}
				else listener.call(caller, 0);
			}			
		};
		xhr.onerror = function(evt){
			console.log(evt);
		}				
		
		const LoginRequest = proto.game.LoginRequest;
		let login = LoginRequest.create({
			nickname: acount,
			character: UserInfo.role
		});
		let data = encode(LoginRequest.encode(login).finish());
		
		xhr.open("POST", httpUrl, true);
		xhr.setRequestHeader("content-type", "application/x-protobuf3");		
		xhr.send(data);
	}

	protected connect(wsUrl: string, token: any): void{

		this.close();
		
		this._socket = new Socket(wsUrl, {params: {token: token}});
		this._socket.binaryType = "arraybuffer";
		
		let thisSelf = this;
		this._socket.onOpen(function(): void {
			thisSelf.onOpen();
		});
        this._socket.onClose(function(): void {
			thisSelf.onClose();
		});
        this._socket.onError(function(): void {
			thisSelf.onError();
		});
        this._socket.onMessage(function({event, payload}): void {
			thisSelf.onMessage(payload);
		});
		this._socket.connect();		
	}

	protected connectToChannel(id: string = "room:1"): void {
		if(this._socket.isConnected()){
			let thisSelf = this;
			this._channel = this._socket.channel(id, {});
			this._channel.join()
				.receive("ok", resp => { thisSelf.onJoinChannel(true, id); })
				.receive("error", resp => { thisSelf.onJoinChannel(false); })
		}
		else GameEvent.emit(GameEvent.LOGIN_RESULT, Define.ERR_ERROR,
			"Can't connect to channel for socket is not connected!");
	}

	public close(): void {
		this.closeChannel();
		if(this._socket != null){
			this._socket.onOpen(null);
           	this._socket.onClose(null);
           	this._socket.onError(null);
           	this._socket.onMessage(null);
			this._socket.close();
			this._socket = null;
		}
	}

	protected closeChannel(): void {
		if(this._channel){
			this._channel.leave();
			this._channel = null;
		}
	}

	protected addCallback(caller: any, onConnectedCb: Function, onCloseCb: Function, onErrorCb: Function): void {
		this._eventCaller = caller;
		this._onConnected = onConnectedCb;
		this._onSocketClose = onCloseCb;
		this._onSocketError = onErrorCb;
	}	
	
	private onMessage(event: any): void {
	}

	private onOpen(event: any = null): void {
		
		if(this._onConnected){
			this._onConnected.call(this._eventCaller);
		}		
	}
	
	private onClose(event: any = null): void {		
		if(this._onSocketClose){
			this._onSocketClose.call(this._eventCaller);
		}
	}

	private onError(event: any = null): void {
		if(this._onSocketError){
			this._onSocketError.call(this._eventCaller, event);
		}		
	}

	protected onJoinChannel(result: boolean, topic?: string): void {
		if(result) {
			console.log("Joined channel successfully");
			
			function handleLeave(diff, topic): void {
				let leaves = diff.leaves[topic];
				if(leaves){
					for(let user of leaves.metas){
						let id = user.user_id;
						GameEvent.emit(GameEvent.ON_ROLE_OFFLINE, id);
					}
				}
			}

			let presence = new Presence(this._channel);
			this._channel.on("presence_diff", diff =>{				
				presence = Presence.syncDiff(presence, diff)
				//handleJoin(diff, topic)
				handleLeave(diff, topic)
			});

			this.onRegisterEntry(this._channel);			
			GameEvent.emit(GameEvent.LOGIN_RESULT, Define.ERR_SUCCESS);
		}
		else GameEvent.emit(GameEvent.LOGIN_RESULT, Define.ERR_ERROR, "Unable to join channel");
	}

	public sendPosition(position: Vec3): void {
		let Placeable = proto.game.Placeable;
		let message = Placeable.create({
			//id: UserInfo.id,
			x: position.x,
			y: position.y,
			z: position.z
		  })
	  
		  let msg = Placeable.encode(message).finish();
		  this._channel.push("placeable", {payload: encode(msg)})
			.receive("ok", () => console.log("push placeable message ok!"))
			.receive("error", (reasons) => console.log("push placeable message failed:%s", reasons) );
	}
}