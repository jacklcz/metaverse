import { _decorator, Component, Node, EventMouse, Vec3 } from 'cc';
const { ccclass, property } = _decorator;
import { Quaternion } from "./Quaternion";

@ccclass('FirstPersonCamera')
export class FirstPersonCamera extends Component 
{
    @property
    xAxisMin:number = 140;
    @property
    xAxisMax:number = 210;

    private angleX: number = 0;
    private angleY: number = 0;
    
    start () {
        //systemEvent.on(Node.EventType.MOUSE_MOVE, this.MouseMove, this);
    }
    
    private mouseMove(e: EventMouse) {
        this.angleX -= e.movementX;
        this.angleY -= e.movementY;
        console.log(this.angleY);

        this.angleY = this.clamp(this.angleY, this.xAxisMin, this.xAxisMax);        
        this.node.rotation = Quaternion.GetQuatFromAngle(new Vec3(this.angleY, this.angleX, 0));
    }

    private clamp(val:number, min:number, max:number): number {
        if(val <= min) val = min;
        if(val >= max) val = max;
        return val;
    }
}

