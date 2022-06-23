import { _decorator, Component, Vec3, v3, Animation, BoxCollider, RigidBody } from 'cc';
const { ccclass, property } = _decorator;

import Define from '../base/Define';

export enum ActionType {    
    None     = 0,  //不移动
    Forward  = 1,  //向前
    Backward = 2,  //向后
    Left     = 3,  //向左
    Right    = 4,  //向右
    Jump     = 5,
    Wave     = 6, 
    Dance1   = 7,
    Dance2   = 8,
};

export enum RotateType {
    None  = 0,   //空
    Left  = 1,   //左
    Right = 2,   //右
}

enum ActionName {
    Idle = "Idle",
    Run  = "Running",
    Walk = "Walking",
    Jump = "Jumping",
    Wave = "Waving01",
    Dance1 = "Dancing02",
    Dance2 = "Dancing03",
}

@ccclass('BaseRole')
export abstract class BaseRole extends Component {
    
    private _roleID: string = "";
    private _roleType: string = "0";
    private _nickName: string = "";
    private _moveType: number = 0;
    private _moveSpeed: number = 4.5;
    private _rotaSpeed: number = 80;
    private _actionName: string = "";

    abstract get action(): number;
    abstract set action(value: number);
    abstract onMovingPrv(deltaTime: number): void;
    abstract onMoving(flag: boolean): void;
    abstract onUpdatedPosition(): void;
    abstract onInitedRole(): void;    

    onLoad(): void {
        let collider = this.addComponent(BoxCollider);
        collider.isTrigger = false;
        //collider.center = v3(0, 0, 0);
        collider.size = v3(0.8, 2, 0.8);

        let body = this.addComponent(RigidBody);
        body.useGravity = true;
    }

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

    public get nickName(): string {
        return this._nickName;
    }

    public set nickName(name: string) {
        this._nickName = name;
    }

    public get moveType(): number {
        return this._moveType;
    }

    public set moveType(type: number) {
        this._moveType = type;
    }

    public switchMove(): boolean {
        this.moveType = this.moveType == 0 ? 1 : 0;
        return this.setAction(this.action);
    }

    public get moveSpeed(): number {
        return this._moveSpeed;
    }

    public get rotaSpeed(): number {
        return this._rotaSpeed;
    }

    public setAction(value: number): boolean {
        let flag = false;
        this.action = value;
        switch(value){
            case ActionType.None:
                flag = this.stopAction();
                break;
            case ActionType.Jump:
                flag = this.jupmAction();
                break;
            case ActionType.Wave:
                flag = this.waveAction();
                break;
            case ActionType.Dance1:
                flag = this.dancing01();
                break;
            case ActionType.Dance2:
                flag = this.dancing02();
                break;
            default:
                flag = this.moveAction();
                break;
        }
        return flag;
    }

    public updateName(type: string): void {
        let title = Define.briefString(this.nickName);
        let node = this.node.getChildByName("RoleName");
        let roleName: any = node.getComponent("RoleName");
        roleName.setText(type, title);
    }

    protected get animation(): Animation {
        return this.node.getComponent(Animation);
    }

    protected isSpecialAction(): boolean {
        return ((this._actionName == ActionName.Jump)
            //|| (this._actionName == ActionName.Wave)
            //|| (this._actionName == ActionName.Dance1)
            //|| (this._actionName == ActionName.Dance2)
        );
    }

    protected stopAction(): boolean {  
        if((this._actionName == ActionName.Wave)
            || (this._actionName == ActionName.Dance1)
            || (this._actionName == ActionName.Dance2)
        ) return false;
    
        return this.playAction(ActionName.Idle);
    }

    protected moveAction(): boolean {
        return this.playAction(this.moveType == 0 ? ActionName.Run : ActionName.Walk);
    }

    public jupmAction(): boolean {
        if(this.isSpecialAction()) return false;
        
        this.specialAction(ActionName.Jump);
        return true;
    }

    public waveAction(): boolean {        
        if(this.isSpecialAction()) return false;
        this.setAction(ActionType.None);
        
        this.specialAction(ActionName.Wave);
        return true;
    }

    public dancing01(): boolean {
        if(this.isSpecialAction()) return false;
        this.setAction(ActionType.None);
        
        this.specialAction(ActionName.Dance1);
        return true;
    }

    public dancing02(): boolean {
        if(this.isSpecialAction()) return false;
        this.setAction(ActionType.None);

        this.specialAction(ActionName.Dance2);
        return true;
    }

    private specialAction(actionName: string): void {
        this.playAction(actionName);
        this.animation.on(Animation.EventType.LASTFRAME, this.onFinishSpecial, this, true);                
    }

    private onFinishSpecial(type, state): void {        
        this._actionName = "";
        this.setAction(this.action);
    }

    protected playAction(action: string): boolean {
        if(action == this._actionName || this.isSpecialAction()) return false;

        this._actionName = action;
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
        switch(this.action){
            case ActionType.Forward:                
            case ActionType.Backward:
                move = -this.getMoveSpeed();
                break;
            case ActionType.Left:                
            case ActionType.Right:                
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
            this.onUpdatedPosition();
        }
    }
}

