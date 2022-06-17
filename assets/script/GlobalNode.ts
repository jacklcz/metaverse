import { _decorator, Component } from 'cc';
const { ccclass, property } = _decorator;

import GameEvent from './base/GameEvent';

@ccclass
export default class GlobalNode extends Component {

    static _thisNode: GlobalNode = null;

    static instance(): GlobalNode {
        return GlobalNode._thisNode;
    }

    onLoad () {
        GlobalNode._thisNode = this;
        this.node.getChildByName("RoleName").active = false;
        //this.node.getChildByName("character0").active = false;
        //this.node.getChildByName("character1").active = false;
        //this.node.getChildByName("character2").active = false;
        //this.node.getChildByName("character3").active = false;
        //this.node.getChildByName("character4").active = false;
        //this.node.getChildByName("character5").active = false;
        //this.node.getChildByName("character6").active = false;
        //this.node.getChildByName("character7").active = false;        
    }

    public onChatEnded(): void {
        GameEvent.emit(GameEvent.ON_SEND_CHAT_MSG);
    }
}
