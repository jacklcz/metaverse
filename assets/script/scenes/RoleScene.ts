import { _decorator, Component, Node, instantiate, input, Input, EventKeyboard, KeyCode, Vec3} from 'cc';
const { ccclass, property } = _decorator;

import GlobalNode from '../GlobalNode';
import { MyRole } from '../role/MyRole';
import UserInfo from '../base/UserInfo';
import GameEvent from '../base/GameEvent';
import { MoveType, RotateType } from '../role/BaseRole';
import PeerConnection from '../network/PeerConnection';
import { GameRole } from '../role/GameRole';

@ccclass('RoleScene')
export class RoleScene extends Component {

    private _roleList: {} = {};

    start() {

        GameEvent.on(GameEvent.ON_ROLE_LOCATION, this.onRoleLocation, this);
        GameEvent.on(GameEvent.ON_ROLE_OFFLINE, this.onRoleOffline, this);        
        GameEvent.on(GameEvent.ON_ROLE_MOVING, this.onRoleMoving, this);

        this.initMyRole();

        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
    }

    protected initMyRole(): void {

        this.newRole(UserInfo.id, UserInfo.role, "", UserInfo.initPos, "MyRole");

        GameEvent.emit(GameEvent.ON_INIT_OWNER);
        PeerConnection.instance().sendPosition(UserInfo.initPos);
    }

    protected onRoleLocation(id: string, character: string, nickName: string, position: Vec3): void {
        
        console.log("onRoleLocation: %s", id);

        this.newRole(id, character, nickName, position, "GameRole");
    }

    protected newRole(id: string, character: string, nickName: string, position: Vec3, comName: string): void {

        let type = (character == "0") ? "BoyRole" : "GirlRole";
        let role = GlobalNode.instance().node.getChildByName(type);        
        let thisRole = instantiate(role);
        let gameRole: any = thisRole.addComponent(comName);
        gameRole.roleType = character;

        this._roleList[id] = thisRole;
        this.node.addChild(thisRole);

        thisRole.setWorldPosition(position);
        thisRole.layer = this.node.layer;
        thisRole.active = true;
    }

    protected onRoleOffline(id: string): void {

        console.log("onRoleOffline: %s", id);
        if(id == UserInfo.id){
            console.log("onRoleOffline: %s ========MyRole?????", id);
            return;
        }

        let node: Node = this._roleList[id];
        if(node){
            delete this._roleList[id];
            this.node.removeChild(node);
            node.destroy();
        }
    }

    protected onRoleMoving(id: string, moveType: number, startPos: Vec3, rotation: Vec3): void {
        
        //console.log("onRoleMoving = %s", id);
        
        let node: Node = this._roleList[id];
        if(node){
            let gameRole: any = node.getComponent("GameRole");
            gameRole.setMoving(moveType);

            node.setWorldPosition(startPos);
            node.setRotationFromEuler(rotation);
            //console.log("recv position %s", startPos.toString())
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

