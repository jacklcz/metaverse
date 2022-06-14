import { _decorator, Node, EventHandler} from 'cc';
const { ccclass, property } = _decorator;

import * as fgui from "fairygui-cc";
import Define from '../base/Define';
import GlobalNode from '../GlobalNode';
import GameEvent from '../base/GameEvent';
import PeerConnection from '../network/PeerConnection';

@ccclass('ChatFrame')
export class ChatFrame extends Node {
        
    protected _com: fgui.GComponent = null;
    protected _messages: string[] = [];
    protected _maxVisible: number = 6;
    protected _offset: number = 0;

    constructor(com: fgui.GComponent) {
        super();
        this._com = com;
        this.onInitilize();
    }

    public switchVisible(): void {
        this._com.visible = !this._com.visible;
    }

    protected onInitilize(): void {
        
        let handler: EventHandler = new EventHandler();
        handler.handler = "onChatEnded";
        handler.target = GlobalNode.instance().node;
        handler.component = "GlobalNode";        
        let thisInput = this._com.getChild<fgui.GTextInput>("input"); 
        thisInput._editBox.editingDidEnded.push(handler);

        this._com.getChild<fgui.GTextField>("msgList").text = "";

        this._com.getChild<fgui.GButton>("sendBtn").onClick(this.onSendChat, this);
        this._com.getChild<fgui.GButton>("upBtn").onClick(this.onUpMsg, this);
        this._com.getChild<fgui.GButton>("downBtn").onClick(this.onDownMsg, this);
        this._com.getChild<fgui.GButton>("lastBtn").onClick(this.onLastMsg, this);

        GameEvent.on(GameEvent.ON_SEND_CHAT_MSG, this.onSendChat, this);
        GameEvent.on(GameEvent.ON_CHAT_MESSAGE, this.onChatMessage, this);

        this._com.visible = false;
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
        nickName = Define.briefString(nickName);
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
            let count = length - 1 - this._offset;
            for(var i = 0; i < count; i ++){
                text += this._messages[i] + "\n";
            }
            text += this._messages[count];
        }
        
        let msgList = this._com.getChild<fgui.GTextField>("msgList");        
        msgList.text = text;
    }

    private onUpMsg(): void {
        let length = this._messages.length;
        if((length - this._offset) <= this._maxVisible) return;

        this._offset += 1;
        this.updateMessage();
    }

    private onDownMsg(): void {
        if(this._offset <= 0) return;

        this._offset -= 1;
        this.updateMessage();
    }
    
    private onLastMsg(): void {
        if(this._offset <= 0) return;

        this._offset = 0;
        this.updateMessage();
    }
}

