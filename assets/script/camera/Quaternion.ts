import { _decorator, Node, Quat, Vec3, IVec3Like } from 'cc';
const { ccclass, property } = _decorator;

export class Quaternion {
    
    private static Deg2Rad: number = (Math.PI) / 180;
    
    public static rotateY(_node: Node, _angle: number): Quat {
        let _quat = new Quat();
        _node.rotation = Quat.rotateY(_quat, _node.rotation, _angle * this.Deg2Rad);
        return _quat;
    }
     
    public static RotateX(_node: Node, _angle: number): Quat {
        let _quat = new Quat();
        _node.rotation = Quat.rotateX(_quat, _node.rotation, _angle * this.Deg2Rad);
        return _quat;
    }
    
    public static RotateZ(_node: Node, _angle: number): Quat {
        let _quat = new Quat();
        _node.rotation = Quat.rotateZ(_quat, _node.rotation, _angle * this.Deg2Rad);
        return _quat;
    }

    public static RotateAround(_targetQuat: Quat, axis: Vec3, _angle: number): Quat {
        let _quat = new Quat();
        Quat.rotateAround(_quat, _targetQuat, axis, _angle * this.Deg2Rad);
        return _quat;
    }

    public static RotateAroundLocal(_targetQuat: Quat, axis: Vec3, _angle: number): Quat {
        let _quat = new Quat();
        Quat.rotateAroundLocal(_quat, _targetQuat, axis, _angle * this.Deg2Rad);
        return _quat;
    }

    public static RotationAroundNode(self: Node, pos: Vec3, axis: Vec3, angle: number): Quat
    {
        let _quat = new Quat();
        let v1 = new Vec3();
        let v2 = new Vec3();
        let pos2: Vec3 = self.position;
        let rad = angle * this.Deg2Rad;
        Quat.fromAxisAngle(_quat, axis, rad);
        Vec3.subtract(v1, pos2, pos);
        Vec3.transformQuat(v2, v1, _quat);
        self.position=Vec3.add(v2, pos, v2);
        Quat.rotateAround(_quat, self.rotation, axis, rad);
        return _quat;
    }

    public static GetEulerFromQuat(_quat: Quat): IVec3Like {
        let angle: IVec3Like = Quat.toEuler(new Vec3(), _quat, true);
        return angle;
    }

    public static GetQuatFromAngle(_angle: IVec3Like): Quat {
        let _quat: Quat = Quat.fromEuler(new Quat(), _angle.x, _angle.y, _angle.z);
        return _quat;
    }

    public static Lerp(_a: Quat, _b: Quat, _t: number): Quat {
        let _quat = new Quat();
        Quat.lerp(_quat, _a, _b, _t);
        return _quat;
    }

    public static Slerp(_a: Quat, _b: Quat, _t: number): Quat {
        let _quat = new Quat();
        Quat.slerp(_quat, _a, _b, _t);
        return _quat;
    }

    public static LookRotation(_forward: Vec3, _upwards: Vec3 = Vec3.UP): Quat {
        let _quat = new Quat();
        Vec3.normalize(_forward, _forward);
        Quat.fromViewUp(_quat, _forward, _upwards);
        return _quat;
    }

}