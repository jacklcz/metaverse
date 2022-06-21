import { _decorator, Component, Node, assetManager, JsonAsset, Prefab  } from 'cc';
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
        
        let buildList: [] = [];
        this.onUpdateView(buildList);
    }

    protected onUpdateView(updateList: any[]): void {
        if(updateList.length <= 0) return;

        let thisSelf = this;
        let loadList = updateList.splice(0, 3);
        assetManager.loadBundle("building", function(err, bundle): void {
            bundle.load(loadList, Prefab, function(error: Error, data: Prefab[]): void {
                
                thisSelf.onUpdateView(updateList);

                if(!error) {
                    thisSelf.initBuilding(loadList, data);
                }
                else console.log(error.message);
            });
        });
    }

    protected initBuilding(loadList: any[], data: Prefab[]): void {
        
        let thisSelf = this;
        for(var i = 0; i < data.length; i ++){
            data[i].createNode(function(error: Error, node: Node): void {
                //node.setWorldPosition();
                //node.setWorldRotation();
                //node.setScale();
                thisSelf.node.addChild(node);
            });
        }
    }
}

