import { _decorator, Node, EventHandler} from 'cc';
const { ccclass, property } = _decorator;

import * as fgui from "fairygui-cc";
import GlobalNode from '../GlobalNode';
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
        
        let handler: EventHandler = new EventHandler();
        handler.handler = "onChatEnded";
        handler.target = GlobalNode.instance().node;
        handler.component = "GlobalNode";        
        let thisInput = this._com.getChild<fgui.GTextInput>("input"); 
        thisInput._editBox.editingDidEnded.push(handler);

        this._com.getChild<fgui.GTextField>("msgList").text = "";

        let sendBtn = this._com.getChild<fgui.GButton>("sendBtn"); 
        sendBtn.onClick(this.onSendChat, this);

        GameEvent.on(GameEvent.ON_SEND_CHAT_MSG, this.onSendChat, this);
        GameEvent.on(GameEvent.ON_CHAT_MESSAGE, this.onChatMessage, this);
    }    

    protected onSendChat(): void {

        let thisInput = this._com.getChild<fgui.GTextInput>("input"); 
        let text = thisInput.text;
        let length = text.length;
        if(length <= 0) return;
        
        PeerConnection.instance().sendChat(text);
        thisInput.text = "";
        thisInput.requestFocus();
    }

    protected onChatMessage(nickName: string, msg: string): void {        
        nickName = this.formatString(nickName);
        let thisText = `[${nickName}]: [COLOR=#FFFF00]${msg}[/COLOR]`;
        this._messages.push(thisText);
        if(this._messages.length > 50){
            this._messages.shift();
        }
        this.updateMessage();
    }

    protected updateMessage(): void {        
        let text: string = "";
        let length = this._messages.length;
        if(length > 0){
            let count = length - 1;
            for(var i = 0; i < count; i ++){
                text += this._messages[i] + "\n";
            }
            text += this._messages[count];
        }
        
        let msgList = this._com.getChild<fgui.GTextField>("msgList");
        msgList.text = text;
    }

    protected formatString(text: string, max: number = 6): string {
        if(text.length > 6){
            text = text.slice(0, 3) + ".." + text[text.length - 1];
        }
        return text;
    }
}

