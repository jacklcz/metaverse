import { _decorator, Component, Node, Camera, v3, Quat, quat, Vec3, Label } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('RoleName')
export class RoleName extends Component {
    
    @property(Node)
    alignCamera: Node = null;

    static NameOffset: {} = {
        "0": 2.21, "1": 2.05, "2": 2.22, "3": 2.00, "4": 1.90, "5": 1.88, "6": 1.95, "7": 1.98
    };

    public setText(type: string, text: string): void {
        let y = RoleName.NameOffset[type];
        this.node.setPosition(0, y, 0);

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

