import { _decorator, Component, Node, Camera, v3, Quat, quat, Vec3, Label } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('RoleName')
export class RoleName extends Component {
    
    @property(Node)
    alignCamera: Node = null;    

    public setText(text: string): void {
        let node = this.node.getChildByName("NickName");
        node.getComponent(Label).string = text;
    }

    update(deltaTime: number): void {
                
        let dir = v3();
        let rotation = new Quat();
        Vec3.subtract(dir, this.alignCamera.worldPosition, this.node.worldPosition);        
        Quat.fromViewUp(rotation, dir.normalize(), Vec3.UP);        

        let euler = v3();
        rotation.getEulerAngles(euler);          
        this.node.setWorldRotationFromEuler(0, euler.y, 0);
    }
}

