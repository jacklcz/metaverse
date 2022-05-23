import { _decorator, resources } from 'cc';

class GameConfig {

    private _configList: {[key: string]: any} = {};

    constructor() {
    }

    public getRes(name: string): any {
        return this._configList[name];
    }

    public setRes(names: string[], res: any[]): void {
        for(var i = 0; i < names.length; ++ i){
            this._configList[names[i]] = res[i];
        }
    }

    public releaseRes(): void {
        let cfgs = Object.keys(this._configList);
        for (var name of cfgs){            
            resources.release(name);
        }
        this._configList = {};
    }
}

export default class TheConfig {

    static httpUrl: string = "http://13.231.210.240:4000/login";
    static wsUrl: string = "ws://13.231.210.240:4000/socket";    

    static selectCfg: GameConfig = new GameConfig();
    static mainCfg: GameConfig = new GameConfig();

    constructor() {
    }   

    static startSceneBk(): string {
        return "backgr/start.png";
    }   

    static roleConfig(): string {
        return "gameCfg/main/roleCfg";
    }

    static sceneCfg(): string {
        return "gameCfg/main/sceneCfg";
    }

    static selectResList(): string[] {
        let resList: string[] = [            
        ];
        return resList;
    }

    static mainResList(): string[] {
        let resList: string[] = [
            //this.roleConfig(),            
            //this.sceneCfg(),
        ];
        return resList;
    }    

    static getSceneCfg(id: number): JSON {        
        let config = TheConfig.mainCfg.getRes(this.sceneCfg()).json;
        return config[id.toString()];        
    }   
}