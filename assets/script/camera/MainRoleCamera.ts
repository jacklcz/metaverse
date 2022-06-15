import { _decorator, Component, Node, Vec2, Quat, Vec3, v3, IVec3Like} from 'cc';
import { input, Input, EventKeyboard, KeyCode } from 'cc';
const { ccclass, property } = _decorator;

import { VectorTool } from "./VectorTool";
import GameEvent from '../base/GameEvent';
import { MyRole } from '../role/MyRole';

@ccclass('MainRoleCamera')
export class MainRoleCamera extends Component {

    private _target: Node = null;    
    private _offset: Vec3 = new Vec3(0, 0.62, 4.6);

    private _moveSmooth: number = 0.002;
    private _rotateSmooth: number = 0.03;

    private _velocity = new Vec3();    

    start() {
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        GameEvent.on(GameEvent.ON_INITED_OWNER, this.onInitMyRole, this);
    }

    public get target(): Node { return this._target;}
    public set target(node: Node) { this._target = node; }
    
    public get offset(): Vec3 { return this._offset; }
    public get lookAt(): Vec3 { 
        let lookAt = this.target.getWorldPosition();
        lookAt.y += 1.5;
        return lookAt; 
    }
    
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
        this.node.lookAt(this.lookAt);
    }   

    public onMouseMove(delta: Vec2) {        
        this.onRotation(delta);        
    }    

    public onMouseWheel(delta: number): void {
        let offset = 0.2;
        if(delta > 0) offset = -0.2;        
        this.offset.z += (offset * MyRole.instance().roleWard);

        this.setFollowTrack();
    }

    private onRotation(delta: Vec2) {
        
        let speed = 0.002;
        let horizontal = -delta.x * speed;
        let vertical = delta.y * speed;  

        let lookAt = this.lookAt;
        this.rotateAround(this.node, lookAt,  Vec3.UP, horizontal);
        this.rotateAround(this.node, lookAt, Vec3.RIGHT, vertical); 
        
        let cameraPos = this.node.getWorldPosition();        
        this._offset.y = Math.abs(cameraPos.y - lookAt.y);
    }

    private rotateAround(node: Node, point: Vec3, axis: Vec3, angle: number) {
        
        let quat = new Quat();
        Quat.fromAxisAngle(quat, axis, angle);

        let position = v3();
        Vec3.subtract(position, node.worldPosition, point);
        Vec3.transformQuat(position, position, quat);
        Vec3.add(position, point, position);

        let dir = v3();        
        Vec3.subtract(dir, position, this.lookAt);
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
    
    private setFollowTrack(deltaTime: number = 0.1): void {
        let pos = this.toPosition();
        this.node.position = VectorTool.SmoothDampV3(this.node.position, pos, this._velocity, this._moveSmooth, 100000, 0.02);        
        this.node.lookAt(this.lookAt);
    }

    private toPosition(): Vec3 {            
        let z = MyRole.instance().roleWard * this.offset.z;
        let u = Vec3.multiplyScalar(new Vec3(), Vec3.UP, this.offset.y);
        let f = Vec3.multiplyScalar(new Vec3(), this.target.forward, z);
        let thePos = this.lookAt;
        
        return Vec3.add(new Vec3(), thePos, u).add(f);
    }

    update(deltaTime: number) {
        if(!this.target) return;
        if(MyRole.action == 0 && MyRole.ratation == 0) return;
        
        this.setFollowTrack(deltaTime);
    }
}

