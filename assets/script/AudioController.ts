
import { _decorator, Component, AudioSource } from 'cc';
const { ccclass, property } = _decorator;

import AudioManager from './base/AudioManager';

@ccclass('AudioController')
export class AudioController extends Component {
    
    onLoad(): void {
        let source = this.node.getComponent(AudioSource);
        AudioManager.instance().initManager(source);
    }
}