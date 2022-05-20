import { _decorator, resources, Component, game, director, JsonAsset } from 'cc';
const {ccclass, property} = _decorator;

import GameEvent from "./base/GameEvent";
import TheConfig from "./base/TheConfig";

@ccclass('AppMain')
export default class AppMain extends Component {
    onLoad() {
        game.addPersistRootNode(this.node);
        
        GameEvent.on(GameEvent.OPEN_MAIN_SCENE, this.openMainScene, this);
        //GameEvent.on(GameEvent.LOGIN_ROLE_SCENE, this.onLoginScene, this);
        console.log("AppMain onLoad!");
    }

    private loadScene(sceneName: string): void {
        director.preloadScene(sceneName, function (): void {
            director.loadScene(sceneName);
        });
    }  

    private openMainScene(roleID: number, sceneID: number, x: number, y: number): void {
        let thisSelf = this;
        let resList = TheConfig.mainResList();
        resources.load(resList, JsonAsset,  function (err, assets: JsonAsset[]):void {
            if(err){
                console.log(err);
            }
            else {
                TheConfig.mainCfg.setRes(resList, assets);
                thisSelf.loadScene("MainScene");
            }
        });
    }

    private onLoginScene(msg: any): void {
        console.log("Get login scene message!");
        
        //GameEvent.emit(GameEvent.ON_OWNER_INITED);
    }    
}