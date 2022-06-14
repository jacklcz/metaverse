import { _decorator, assetManager } from 'cc';
const { ccclass, property } = _decorator;

import GameEvent from '../base/GameEvent';
import ControlScene from './ControlScene';
 
@ccclass('MainScene')
export class MainScene extends ControlScene {
    
    onLoad () {
        super.onLoaded(this.onLoadFinish, this);
    }

    protected onLoadFinish(error: any): void {
        console.log("MainScene onLoadFinish %s", error ? error : "success");                
    }
}