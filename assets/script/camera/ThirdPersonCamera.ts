import { _decorator, Component, Node, Enum } from 'cc';
import { EventMouse, Vec2, Input, Quat, Vec3, IVec3Like } from 'cc';
const { ccclass, property } = _decorator;

import { Quaternion } from "./Quaternion";
import { VectorTool } from "./VectorTool";

import GameEvent from '../base/GameEvent';
import { MyRole } from '../role/MyRole';

export enum ThirdPersonCameraType {
    /** 相机紧跟随着目标，相机不会旋转 */
    Follow = 0,
    /** 相机会旋转紧跟着目标正后方，旋转不可控制 */
    FollowTrackRotation = 1,
    /** 相机紧跟随着目标，相机可以自由旋转 */
    FollowIndependentRotation = 2,
};

@ccclass('ThirdPersonCamera')
export class ThirdPersonCamera extends Component {
    
    @property(Node)
    target: Node = null;
    
    @property(Node)
    lookAt: Node = null;
    
    @property({ type: Enum(ThirdPersonCameraType) })
    cameraType: ThirdPersonCameraType = ThirdPersonCameraType.FollowIndependentRotation;
    
    @property
    positionOffset: Vec3 = new Vec3(0, 4.8, 10);
    
    @property
    moveSmooth: number = 0.02;
    
    @property
    rotateSmooth: number = 0.03;

    public MouseX: number = 0;
    public MouseY: number = 0;    

    private _forward: Vec3 = new Vec3();
    private _right: Vec3 = new Vec3();
    private _up: Vec3 = new Vec3();
    private angle: IVec3Like = null;

    private isDown: boolean = false;
    private velocity = new Vec3();
    private forwardView: Vec3 = new Vec3();

    start() {
        GameEvent.on(GameEvent.ON_INIT_OWNER, this.onInitMyRole, this);
    }

    private onInitMyRole(): void {
        this.target = this.lookAt = MyRole.instance().node;
        this.cameraType == ThirdPersonCameraType.Follow && this.node.lookAt(this.target.worldPosition);
    }
    
    public mouseDown(e: EventMouse) {
        this.isDown = true;
    }

    public mouseMove(delta: Vec2) {
        if (this.cameraType == ThirdPersonCameraType.FollowIndependentRotation) {
            this.setIndependentRotation(delta);
        }
    }

    public mouseUp(e: EventMouse) {
        this.isDown = false;
    }

    public mouseWheel(delta: number): void {
        console.log("mouseWheel %d", delta);
    }

    update(dt: number) {
        if (this.target) {
            switch (this.cameraType) {
                case ThirdPersonCameraType.Follow:
                    this.setFollow();
                    break;
                case ThirdPersonCameraType.FollowTrackRotation:
                    this.setFollowTrackRotation();
                    break;
                case ThirdPersonCameraType.FollowIndependentRotation:
                    this.setMove();
                    break;
            }
        }
    }

    private setFollow() {
        let temp: Vec3 = new Vec3();
        let tem0: Vec3 = new Vec3(0, this.positionOffset.y, this.positionOffset.z);
        Vec3.add(temp, this.lookAt.worldPosition, tem0);
        this.node.position = this.node.position.lerp(temp, this.moveSmooth);
    }

    private setFollowTrackRotation() {
        
        let u = Vec3.multiplyScalar(new Vec3(), Vec3.UP, this.positionOffset.y);
        let f = Vec3.multiplyScalar(new Vec3(), this.target.forward, this.positionOffset.z);
        let pos = Vec3.add(new Vec3(), this.target.position, u);        
        Vec3.add(pos, pos, f);        
        this.node.position = VectorTool.SmoothDampV3(this.node.position, pos, this.velocity, this.moveSmooth, 100000, 0.02);        
        this.forwardView = Vec3.subtract(this.forwardView, this.node.position, this.target.getWorldPosition());
        this.node.lookAt(this.target.worldPosition);        
    }
    
    public setMove() {
        this._forward = new Vec3();
        this._right = new Vec3();
        this._up = new Vec3();
        Vec3.transformQuat(this._forward, Vec3.FORWARD, this.node.rotation);
        
        this._forward.multiplyScalar(this.positionOffset.z);        
        let desiredPos = new Vec3();
        desiredPos = desiredPos.add(this.lookAt.worldPosition).subtract(this._forward).add(this._right).add(this._up);
        this.node.position = this.node.position.lerp(desiredPos, this.moveSmooth);
    }

    private setIndependentRotation(delta: Vec2) {

        let radX: number = -delta.x;
        let radY: number = -delta.y;
        let _quat: Quat = new Quat();
        
        let _right = Vec3.transformQuat(this._right, Vec3.RIGHT, this.node.rotation);
        _quat = Quaternion.RotationAroundNode(this.node, this.target.position, _right, radY);
        this.angle = Quaternion.GetEulerFromQuat(_quat);
        
        this.angle.x = this.angle.x > 0 ? this.clamp(this.angle.x, 120, 180) : this.clamp(this.angle.x, -180, -170);
        Quat.fromEuler(_quat, this.angle.x, this.angle.y, this.angle.z);
        this.node.setWorldRotation(_quat);
        
        _quat = Quaternion.RotationAroundNode(this.node, this.target.position, Vec3.UP, radX);
        this.node.setWorldRotation(_quat);

        this.angle = Quaternion.GetEulerFromQuat(_quat);
        this.MouseX = this.angle.y;
        this.MouseY = this.angle.x;
    }

    private clamp(val: number, min: number, max: number) {
        if (val <= min) val = min;
        else if (val >= max) val = max;
        return val;
    }

    public get type(): ThirdPersonCameraType {
        return this.cameraType;
    }
}



