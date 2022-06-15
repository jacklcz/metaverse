
import { _decorator, tween, assetManager, AudioSource, AudioClip } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('AudioManager')
export default class AudioManager {

    private _audioSource: AudioSource = null;
    
    static instance(): AudioManager {
        return _thisManager;
    }

    public initManager(source: AudioSource): void {
        this._audioSource = source;
    }

    public get audioSource(): AudioSource {
        return this._audioSource;
    }

    public onSound(instant: number, name: string): void {
        let thisSelf = this;
        tween(this)
            .delay(instant)
            .call(function(): void {
                thisSelf.playSound(name);
            })
            .start();
    }

    public playMusic(name: string): void {
        let thisSelf = this;
        assetManager.loadBundle("audio", function(err, bundle){            
            bundle.load(name, AudioClip, function(error: Error, clip: AudioClip): void {
                if(error){
                    console.log("Load audio failed, error=%s", error.message);
                    return;
                }          
                thisSelf.audioSource.clip = clip;
                thisSelf.audioSource.loop = true;
                thisSelf.audioSource.play()
            });            
        });        
    }

    public playSound(name: string): void {
        let thisSelf = this;
        assetManager.loadBundle("audio", function(err, bundle){            
            bundle.load(name, AudioClip, function(error: Error, clip: AudioClip): void {
                if(error){
                    console.log("Load audio failed, error=%s", error.message);
                    return;
                }             
                
                thisSelf.audioSource.playOneShot(clip);
            });            
        });
    }
}
var _thisManager: AudioManager = new AudioManager();