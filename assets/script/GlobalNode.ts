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
    }
}
