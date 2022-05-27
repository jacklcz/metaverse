import { _decorator, Component, Vec3, v3 } from 'cc';
const { ccclass, property } = _decorator;

export enum MoveType {    
    None     = 0,  //不移动
    Forward  = 1,  //向前
    Backward = 2,  //向后
    Left     = 3,  //向左
    Right    = 4,  //向右
};

export enum RotateType {
    None  = 0,   //空
    Left  = 1,   //左
    Right = 2,   //右
}

@ccclass('BaseRole')
export abstract class BaseRole extends Component {
    
    private _moveSpeed: number = 6;
    private _rotaSpeed: number = 80;    

    public get moveSpeed(): number {
        return this._moveSpeed;
    }

    public get rotaSpeed(): number {
        return this._rotaSpeed;
    }

    abstract get moving(): number;
    abstract set moving(value: number);
    abstract onMoving(deltaTime: number): void;

    update(deltaTime: number) {

        this.onMoving(deltaTime);        

        let move = 0;
        switch(this.moving){
            case MoveType.Forward:
                move = -this.moveSpeed;
                break;
            case MoveType.Backward:
                move = this.moveSpeed;
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

            let pos = this.node.getWorldPosition();            
            this.node.setWorldPosition(pos.add(offset));
        }
    }
}

