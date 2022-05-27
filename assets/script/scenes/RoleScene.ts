import { _decorator, Component, instantiate, input, Input, EventKeyboard, KeyCode, Vec3} from 'cc';
const { ccclass, property } = _decorator;

import GlobalNode from '../GlobalNode';
import { MyRole } from '../role/MyRole';
import UserInfo from '../base/UserInfo';
import GameEvent from '../base/GameEvent';
import { MoveType, RotateType } from '../role/BaseRole';
import { GameRole } from '../role/GameRole';

@ccclass('RoleScene')
export class RoleScene extends Component {

    private _roleList: {} = {};

    start() {
        this.initMyRole();

        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.on(Input.EventType.KEY_UP, this.onKeyUp, this);   
        
        GameEvent.on(GameEvent.ON_ROLE_LOCATION, this.onRoleLocation, this);
        GameEvent.on(GameEvent.ON_ROLE_OFFLINE, this.onRoleOffline, this);        
        GameEvent.on(GameEvent.ON_ROLE_MOVING, this.onRoleMoving, this);
    }

    protected initMyRole(): void {
        let myRole = MyRole.instance();
        myRole.node.setWorldPosition(UserInfo.initPos);
        this._roleList[UserInfo.id] = myRole;
    }

    protected onRoleLocation(id: string, nickName: string, position: Vec3): void {
        let gameRole = GlobalNode.instance().node.getChildByName("GameRole");        
        let thisRole = instantiate(gameRole);

        thisRole.setWorldPosition(position);
        thisRole.layer = this.node.layer;

        this._roleList[UserInfo.id] = thisRole;
        this.node.addChild(thisRole);
        thisRole.active = true;
    }

    protected onRoleOffline(id: string): void {
        if(this._roleList.hasOwnProperty(id)){
            let thisRole: GameRole = this._roleList[id];
            delete this._roleList[id];

            this.node.removeChild(thisRole.node);
            thisRole.destroy();
        }
    }

    protected onRoleMoving(id: string, moveType: number, startPos: Vec3, rotation: Vec3): void {
        if(this._roleList.hasOwnProperty(id)){
            let thisRole: GameRole = this._roleList[id];
            thisRole.moving = moveType;
            thisRole.node.setWorldPosition(startPos);
            thisRole.node.setRotationFromEuler(rotation);
        }
    }

    protected onKeyDown(event: EventKeyboard): void {
        switch(event.keyCode) {
            case KeyCode.KEY_W:                
                MyRole.moving = MoveType.Forward;
                break;
            case KeyCode.KEY_S:
                MyRole.moving = MoveType.Backward;
                break;
            case KeyCode.KEY_Q:
                MyRole.moving = MoveType.Left;
                break;
            case KeyCode.KEY_E:
                MyRole.moving = MoveType.Right;
                break;
            case KeyCode.KEY_A:
                MyRole.ratation = RotateType.Left;
                break;
            case KeyCode.KEY_D:
                MyRole.ratation = RotateType.Right;
                break;
            default: break;
        }
    }

    protected onKeyUp(event: EventKeyboard): void {
        switch(event.keyCode) {
            case KeyCode.KEY_W:                
            case KeyCode.KEY_S:                
            case KeyCode.KEY_Q:                
            case KeyCode.KEY_E:
                MyRole.moving = MoveType.None;
                break;
            case KeyCode.KEY_A:               
            case KeyCode.KEY_D:
                MyRole.ratation = RotateType.None;
                break;
            default: break;
        }
    }
}

