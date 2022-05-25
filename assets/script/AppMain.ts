import { _decorator, director, setDisplayStats, Component, game, assetManager} from 'cc';
const {ccclass, property} = _decorator;

import GameEvent from "./base/GameEvent";
import TheConfig from "./base/TheConfig";

@ccclass('AppMain')
export default class AppMain extends Component {

    protected _mainPacks: string[] = ["building", "characters", "mainRes", "texture"];
    protected _selectPack: string[] = ["selectRes"];

    onLoad() {
        game.addPersistRootNode(this.node);
        setDisplayStats(false);

        GameEvent.on(GameEvent.OPEN_MAIN_SCENE, this.openMainScene, this);
        GameEvent.on(GameEvent.LOGIN_ROLE_SCENE, this.selectRoleScene, this);
        console.log("AppMain onLoad!");
    }

    private loadScene(sceneName: string): void {
        director.preloadScene(sceneName, function (): void {
            director.loadScene(sceneName);
        });
    }  

    private openMainScene(): void {
        this.loadSubpack("MainScene", 0, this._mainPacks);
    }

    private selectRoleScene(msg: any): void {
        let thisSelf = this;
        let resList = TheConfig.selectResList();
        //resources.load(resList, JsonAsset,  function (err, assets: JsonAsset[]):void {
        //    if(err){
        //        console.log(err);
        //    }
        //    else {
        //        TheConfig.selectCfg.setRes(resList, assets);
        //        thisSelf.loadScene("SelectScene");
        //    }
        //});
    }

    private loadSubpack(sceneName: string, index: number, packs: string[]): void {

        let length = packs.length;
        let step = index / length;
        GameEvent.emit(GameEvent.ON_LOADING_PROCESS, step);

        if(index >= length){
            this.loadScene(sceneName);
        }
        else {
            let thisSelf = this;
            assetManager.loadBundle(packs[index], function(err): void {
                thisSelf.loadSubpack(sceneName, index + 1, packs);
            });
        }
    }
}