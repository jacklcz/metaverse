import { _decorator, Component, Node, DirectionalLight } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MainLight')
export class MainLight extends Component {

    start() {
        this.onUpdateTime();

        let thisSelf = this;
        this.schedule(function(): void {
            thisSelf.onUpdateTime();
        }, 3);
    }

    protected onUpdateTime(): void {
        let date = new Date();                
        let passTime = date.getHours() * 60 + date.getMinutes();

        let noon = 720;
        let min = 4000;
        let max = 65000;
        let space = max - min;

        let illumination = min;
        if(passTime <= noon) {
            illumination += Math.floor(passTime * space / noon);
        }
        else {
            passTime -= noon;
            illumination = max - Math.floor(passTime * space / noon);
        }
        this.node.getComponent(DirectionalLight).illuminance = illumination;
    }
}

