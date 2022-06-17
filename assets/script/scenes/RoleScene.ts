import { _decorator, Component, Node, instantiate, assetManager, Prefab} from 'cc';
import {input, Input, EventKeyboard, KeyCode, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

import GlobalNode from '../GlobalNode';
import { MyRole } from '../role/MyRole';
import UserInfo from '../base/UserInfo';
import GameEvent from '../base/GameEvent';
import { ActionType, RotateType } from '../role/BaseRole';

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
        
        this.newRole(UserInfo.id, UserInfo.role, UserInfo.account, UserInfo.initPos, "MyRole");        
    }

    protected onRoleLocation(id: string, character: string, nickName: string, position: Vec3): void {
        
        console.log("onRoleLocation: %s", id);

        this.newRole(id, character, nickName, position, "GameRole");
    }

    protected newRole(id: string, character: string, nickName: string, position: Vec3, comName: string): void {

        let thisSelf = this;
        let type = "./character" + character;
        assetManager.loadBundle("characters", function(err, bundle): void {
            bundle.load(type, Prefab, function(error: Error, data: Prefab): void {
                if(!error) {
                    data.createNode(function(error: Error, node: Node): void {
                        if(!error){
                            thisSelf.onLoadRole(node, id, character, nickName, position, comName);
                        }
                        else console.log(error.message);
                    });                   
                }
                else console.log(error.message);
            });
        });
    }

    private onLoadRole(role: Node, id: string, character: string, nickName: string, position: Vec3, comName: string): void {
        
        let roleName = GlobalNode.instance().node.getChildByName("RoleName");
        let thisName = instantiate(roleName);
        role.addChild(thisName);
        thisName.active = true;

        let gameRole: any = role.addComponent(comName);
        gameRole.roleType = character;
        gameRole.nickName = nickName;
        gameRole.roleID = id;

        this._roleList[id] = role;
        this.node.addChild(role);

        role.setWorldPosition(position);
        role.layer = this.node.layer;        

        role.active = true;
        gameRole.updateName(character);
        gameRole.onInitedRole();
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

    protected onRoleMoving(id: string, action: number, startPos: Vec3, rotation: Vec3): void {
        
        let node: Node = this._roleList[id];
        if(node){

            node.setWorldPosition(startPos);
            node.setRotationFromEuler(rotation);
                        
            let gameRole: any = node.getComponent("GameRole");
            gameRole.moveType = action & 0x10000;
            gameRole.setAction(action & 0x0ffff);
        }
    }

    protected onKeyDown(event: EventKeyboard): void {        
        let flag = true;
        switch(event.keyCode) {
            case KeyCode.KEY_W:
            case KeyCode.ARROW_UP:        
                MyRole.instance().setWard(ActionType.Forward);
                MyRole.instance().setAction(ActionType.Forward);
                break;
            case KeyCode.KEY_S:
            case KeyCode.ARROW_DOWN:                
                MyRole.instance().setWard(ActionType.Backward);
                MyRole.instance().setAction(ActionType.Backward);                
                break;
            //case KeyCode.KEY_Q:
            //    MyRole.moving = MoveType.Left;
            //    break;
            //case KeyCode.KEY_E:
            //    MyRole.moving = MoveType.Right;
            //    break;
            case KeyCode.KEY_A:
            case KeyCode.ARROW_LEFT:        
                MyRole.ratation = RotateType.Left;
                break;
            case KeyCode.KEY_D:
            case KeyCode.ARROW_RIGHT:
                MyRole.ratation = RotateType.Right;
                break;            
            case KeyCode.SHIFT_LEFT:
            case KeyCode.SHIFT_RIGHT:
                flag = MyRole.instance().switchMove();
                break;
            case KeyCode.SPACE:
                if(MyRole.instance().jupmAction()){
                    MyRole.instance().sendAction(ActionType.Jump);                    
                }
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
            case KeyCode.ARROW_UP:
            case KeyCode.ARROW_DOWN:
                MyRole.instance().setAction(ActionType.None);
                break;
            case KeyCode.KEY_A:               
            case KeyCode.KEY_D:
            case KeyCode.ARROW_LEFT:
            case KeyCode.ARROW_RIGHT:           
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

