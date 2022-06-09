import { _decorator, Component, assetManager, JsonAsset  } from 'cc';
const { ccclass, property } = _decorator;

import GameEvent from '../base/GameEvent';

@ccclass('BuildScene')
export class BuildScene extends Component {

    private _mapData: any = null;

    start() {
        GameEvent.on(GameEvent.ON_INITED_OWNER, this.onInitedOwner, this);
    }

    protected onInitedOwner(): void {
        let thisSelf = this;
        assetManager.loadBundle("mainRes", function(err, bundle): void {
            bundle.load("./map", JsonAsset, function(error: Error, data: JsonAsset): void {
                if(!error) {
                    thisSelf.initMapData(data.json);
                }
                else console.log(error.message);
            });
        });
    }

    protected initMapData(data: any): void {        
        this._mapData = data;
        
        this.onUpdateView();
    }

    protected onUpdateView(): void {

    }
}

