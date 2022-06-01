import { _decorator, Component, Node, Vec2, Quat, Vec3, v3, IVec3Like} from 'cc';
import { input, Input, EventKeyboard, KeyCode } from 'cc';
const { ccclass, property } = _decorator;

import { VectorTool } from "./VectorTool";
import GameEvent from '../base/GameEvent';
import { MyRole } from '../role/MyRole';

@ccclass('MainRoleCamera')
export class MainRoleCamera extends Component {

    private _target: Node = null;
    private _lookAt: number = 0.1;
    private _offset: Vec3 = new Vec3(0, 2.0, 6.4);

    private _moveSmooth: number = 0.02;
    private _rotateSmooth: number = 0.03;

    private _forward: Vec3 = new Vec3();
    private _right: Vec3 = new Vec3();
    private _up: Vec3 = new Vec3();

    private _velocity = new Vec3();
    private _forwardView: Vec3 = new Vec3();

    start() {
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        GameEvent.on(GameEvent.ON_INIT_OWNER, this.onInitMyRole, this);
    }

    public get target(): Node { return this._target;}
    public set target(node: Node) { this._target = node; }

    public get lookAt(): number { return this._lookAt; }
    public get offset(): Vec3 { return this._offset; }    
    
    protected onKeyDown(event: EventKeyboard): void {
        switch(event.keyCode) {            
            case KeyCode.PAGE_DOWN:
                this.onMouseWheel(0);
                break;
            case KeyCode.PAGE_UP:
                this.onMouseWheel(1);
                break;
            default: break;
        }
    }

    private onInitMyRole(): void {
        this.target = MyRole.instance().node;

        this.node.position = this.toPosition();        
        this.node.lookAt(this.target.worldPosition);
    }   

    public onMouseMove(delta: Vec2) {        
        this.onRotation(delta);        
    }    

    public onMouseWheel(delta: number): void {
        let offset = 0.1;
        if(delta > 0) offset = -0.2;
        this.offset.z += offset;

        this.setFollowTrack();
    }

    private onRotation(delta: Vec2) {
        
        let speed = 0.002;
        let horizontal = -delta.x * speed;
        let vertical = delta.y * speed;        
        this.rotateAround(this.node, this.target.worldPosition,  Vec3.UP, horizontal);        
        this.rotateAround(this.node, this.target.worldPosition, Vec3.RIGHT, vertical); 
        
        let targetPos = this.target.getWorldPosition();
        let cameraPos = this.node.getWorldPosition();        
        this._offset.y = Math.abs(cameraPos.y - targetPos.y);
    }

    private rotateAround(node: Node, point: Vec3, axis: Vec3, angle: number) {
        
        let quat = new Quat();
        Quat.fromAxisAngle(quat, axis, angle);

        let position = v3();
        Vec3.subtract(position, node.worldPosition, point);
        Vec3.transformQuat(position, position, quat);
        Vec3.add(position, point, position);

        let dir = v3();
        Vec3.subtract(dir, position, this.target.worldPosition);
        let rotation = new Quat();
        Quat.fromViewUp(rotation, dir.normalize(), Vec3.UP);

        let euler = v3();
        rotation.getEulerAngles(euler);
        if (euler.x < -80 || euler.x > -5) {
            return;
        }
        
        node.setWorldPosition(position);
        node.setWorldRotation(rotation);
    }
    
    private setFollowTrack(): void {
        let pos = this.toPosition();                
        this.node.position = VectorTool.SmoothDampV3(this.node.position, pos, this._velocity, this._moveSmooth, 100000, 0.02);        
        this._forwardView = Vec3.subtract(this._forwardView, this.node.position, this.target.getWorldPosition());
        this.node.lookAt(this.target.worldPosition);
    }

    private toPosition(): Vec3 {
        let u = Vec3.multiplyScalar(new Vec3(), Vec3.UP, this.offset.y);
        let f = Vec3.multiplyScalar(new Vec3(), this.target.forward, this.offset.z);
        let thePos = this.target.getPosition(); thePos.y += this.lookAt;        
        return Vec3.add(new Vec3(), thePos, u).add(f);
    }

    update(deltaTime: number) {
        if(!this.target) return;
        if(MyRole.moving == 0 && MyRole.ratation == 0) return;
        
        this.setFollowTrack();
    }
}

