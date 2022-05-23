import { _decorator, Input, EventHandler, Node} from 'cc';
const { ccclass, property } = _decorator;

import * as fgui from "fairygui-cc";
import GameEvent from '../base/GameEvent';
import PeerConnection from '../network/PeerConnection';

@ccclass('ChatFrame')
export class ChatFrame extends Node {
    
    protected _com: fgui.GComponent = null;
    protected _messages: string[] = [];

    constructor(com: fgui.GComponent) {
        super();
        this._com = com;
        this.onInitilize();
    }

    protected onInitilize(): void {
        
        //let handler: EventHandler = new EventHandler();
        //handler.handler = "onChatChanged";
        //handler.target = GlobalNode.instance().node;
        //handler.component = "GlobalNode";

        let sendBtn = this._com.getChild<fgui.GButton>("sendBtn"); 
        sendBtn.onClick(this.onSendChat, this);
        GameEvent.on(GameEvent.ON_CHAT_MESSAGE, this.onChatMessage, this);        
    }

    protected onSendChat(): void {

        let thisInput = this._com.getChild<fgui.GTextInput>("input"); 
        let text = thisInput.text;
        let length = text.length;
        if(length <= 0) return;
        
        PeerConnection.instance().sendChat(text);
        thisInput.text = "";
    }

    protected onChatMessage(nickname: string, msg: string): void {
        let thisText = nickname + ": " + msg;
        this._messages.push(thisText);
        if(this._messages.length > 50){
            this._messages.shift();
        }
        this.updateMessage();
    }

    protected updateMessage(): void {        
        let text: string = "";
        let length = this._messages.length;
        for(var i = 0; i < length; i ++){
            text += this._messages[i] + "\n";
        }
        
        let msgList = this._com.getChild<fgui.GTextField>("msgList");
        msgList.text = text;
    }
}

