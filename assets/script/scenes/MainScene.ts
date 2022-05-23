
import { _decorator, debug } from 'cc';
const { ccclass, property } = _decorator;

import ControlScene from './ControlScene';
 
@ccclass('MainScene')
export class MainScene extends ControlScene {
    
    onLoad () {
        
        let thisSelf = this;        
        super.onLoaded(this.onLoadFinish, this);        
    }

    protected onLoadFinish(error: any): void {
        console.log("MainScene onLoadFinish for %s", error);
    }

}