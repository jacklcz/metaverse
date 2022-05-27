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
        let role = GlobalNode.instance().node.getChildByName("GirlRole"); 
        let thisRole = instantiate(role);

        thisRole.addComponent("MyRole");
        thisRole.setWorldPosition(UserInfo.initPos);
        thisRole.layer = this.node.layer;

        this._roleList[UserInfo.id] = thisRole;
        this.node.addChild(thisRole);
        thisRole.active = true;

        GameEvent.emit(GameEvent.ON_INIT_OWNER);
    }

    protected onRoleLocation(id: string, nickName: string, position: Vec3): void {
        
        console.log("onRoleLocation: %s", id);

        let gameRole = GlobalNode.instance().node.getChildByName("GirlRole");        
        let thisRole = instantiate(gameRole);

        thisRole.addComponent("GameRole");
        thisRole.setWorldPosition(position);
        thisRole.layer = this.node.layer;

        this._roleList[UserInfo.id] = thisRole;
        this.node.addChild(thisRole);
        thisRole.active = true;
    }

    protected onRoleOffline(id: string): void {

        console.log("onRoleOffline: %s", id);

        if(this._roleList.hasOwnProperty(id)){
            let thisRole: GameRole = this._roleList[id];
            delete this._roleList[id];

            this.node.removeChild(thisRole.node);
            thisRole.destroy();
        }
    }

    protected onRoleMoving(id: string, moveType: number, startPos: Vec3, rotation: Vec3): void {
        
        console.log("onRoleMoving = %s", id);
        
        if(this._roleList.hasOwnProperty(id)){
            let thisRole: GameRole = this._roleList[id];
            thisRole.setMoving(moveType);
            thisRole.node.setWorldPosition(startPos);
            thisRole.node.setRotationFromEuler(rotation);
            console.log("recv position %s", startPos.toString())
        }
    }

    protected onKeyDown(event: EventKeyboard): void {
        let flag = true;
        switch(event.keyCode) {
            case KeyCode.KEY_W:                
                MyRole.instance().setMoving(MoveType.Forward);
                break;
            case KeyCode.KEY_S:
                MyRole.instance().setMoving(MoveType.Backward);
                break;
            //case KeyCode.KEY_Q:
            //    MyRole.moving = MoveType.Left;
            //    break;
            //case KeyCode.KEY_E:
            //    MyRole.moving = MoveType.Right;
            //    break;
            case KeyCode.KEY_A:
                MyRole.ratation = RotateType.Left;
                break;
            case KeyCode.KEY_D:
                MyRole.ratation = RotateType.Right;
                break;
            default:
                flag = false;
                break;
        }
        if(flag) {
            MyRole.instance().onMoving();
        }
    }

    protected onKeyUp(event: EventKeyboard): void {
        let flag = true;
        switch(event.keyCode) {
            case KeyCode.KEY_W:                
            case KeyCode.KEY_S:                
            //case KeyCode.KEY_Q:
            //case KeyCode.KEY_E:
                MyRole.instance().setMoving(MoveType.None);
                break;
            case KeyCode.KEY_A:               
            case KeyCode.KEY_D:
                MyRole.ratation = RotateType.None;
                break;
            default:
                flag = false;
                break;
        }
        if(flag) {
            MyRole.instance().onMoving();
        }
    }
}

