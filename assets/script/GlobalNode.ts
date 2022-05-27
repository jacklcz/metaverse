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
        this.node.getChildByName("GirlRole").active = false;
        this.node.getChildByName("BoyRole").active = false;
    }

    public onChatEnded(): void {
        GameEvent.emit(GameEvent.ON_SEND_CHAT_MSG);
    }
}
