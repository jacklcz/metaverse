import { _decorator, Component, Vec3, v3, Animation } from 'cc';
const { ccclass, property } = _decorator;

import Define from '../base/Define';

export enum MoveType {    
    None     = 0,  //不移动
    Forward  = 1,  //向前
    Backward = 2,  //向后
    Left     = 3,  //向左
    Right    = 4,  //向右
    Jump     = 5,
};

export enum RotateType {
    None  = 0,   //空
    Left  = 1,   //左
    Right = 2,   //右
}

enum ActionType {
    Idle = "Idle",
    Run  = "Running",
    Walk = "Walking",
    Jump = "Jumping"
}

@ccclass('BaseRole')
export abstract class BaseRole extends Component {
    
    private _roleID: string = "";
    private _roleType: string = "0";
    private _moveType: number = 0;
    private _moveSpeed: number = 4.5;
    private _rotaSpeed: number = 80;
    private _action: string = "";

    abstract get moving(): number;
    abstract set moving(value: number);
    abstract onMovingPrv(deltaTime: number): void;
    abstract onMoving(flag: boolean): void;

    public get roleID(): string{
        return this._roleID;
    }

    public set roleID(id: string) {
        this._roleID = id;
    }

    public get roleType(): string {
        return this._roleType;
    }

    public set roleType(type: string) {
        this._roleType = type;
    }

    public get moveType(): number {
        return this._moveType;
    }

    public set moveType(type: number) {
        this._moveType = type;
    }

    public switchMove(): boolean {
        this.moveType = this.moveType == 0 ? 1 : 0;
        return this.setMoving(this.moving);
    }

    public get moveSpeed(): number {
        return this._moveSpeed;
    }

    public get rotaSpeed(): number {
        return this._rotaSpeed;
    }

    public setMoving(value: number): boolean {
        let flag = false;
        this.moving = value;
        if(value == MoveType.None){
            flag = this.stopAction();
        }
        else if(value == MoveType.Jump){
            flag = this.jupmAction();
        }
        else flag = this.moveAction();
        return flag;
    }

    public updateName(): void {
        let title = Define.briefString(this.roleID);
        let node = this.node.getChildByName("NameNode");
        let roleName: any = node.getComponent("RoleName");
        roleName.setText(title);
    }

    protected get animation(): Animation {
        return this.node.getComponent(Animation);
    }

    protected stopAction(): boolean {        
        return this.playAction(ActionType.Idle);
    }

    protected moveAction(): boolean {
        return this.playAction(this.moveType == 0 ? ActionType.Run : ActionType.Walk);
    }

    public jupmAction(): boolean {
        if(this._action == ActionType.Jump) return false;
        
        this.playAction(ActionType.Jump);
        this.animation.on(Animation.EventType.LASTFRAME, this.onFinishJump, this, true);        
        return true;
    }

    private onFinishJump(type, state): void {        
        this._action = "";
        this.setMoving(this.moving);
    }

    protected playAction(action: string): boolean {
        if(action == this._action || this._action == ActionType.Jump) return false;

        this._action = action;
        this.animation.play(action);
        return true;
    }

    protected getMoveSpeed(): number {
        let speed = this.moveSpeed;
        if(this.moveType != 0) speed /= 2;
        return speed;
    }

    update(deltaTime: number) {

        this.onMovingPrv(deltaTime);        

        let move = 0;
        switch(this.moving){
            case MoveType.Forward:
                move = -this.getMoveSpeed();
                break;
            case MoveType.Backward:
                move = this.getMoveSpeed();
                break;
            case MoveType.Left:
                break;
            case MoveType.Right:
                break;
            default: break;
        }

        if(move != 0) {
            let forward = new Vec3();            
            Vec3.transformQuat(forward, Vec3.FORWARD, this.node.rotation);
            forward.multiplyScalar(move);

            let offset: Vec3 = v3();
            Vec3.multiplyScalar(offset, forward, deltaTime);

            this.onMoving(false);

            let pos = this.node.getWorldPosition();            
            this.node.setWorldPosition(pos.add(offset));
        }
    }
}

