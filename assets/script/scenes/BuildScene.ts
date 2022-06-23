import { _decorator, Component, Node, assetManager, JsonAsset, Prefab, Vec2, v2 } from 'cc';
const { ccclass, property } = _decorator;

import GameEvent from '../base/GameEvent';
import { MyRole } from '../role/MyRole';

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
        return;
        let ids = data.id;
        let theList = data.list;
        let length = data.list.length;        
        
        let buildList: any[] = [];
        let infoList: any[] = [];
        let level1: any[] = [];
        let level2: any[] = [];
        let info1: any[] = [];
        let info2: any[] = [];

        let basePos = MyRole.instance().node.getWorldPosition();
        let rolePos: Vec2 = v2(basePos.x, basePos.y);
        let objPos: Vec2 = v2();
        for(var i = 0; i < length; i ++) {
            let building = theList[i];
            objPos.x = building[1][0]; objPos.y = building[1][1];
            let dist = objPos.subtract(rolePos).lengthSqr();
            if(dist <= 10){
                buildList.push(ids[building[0]]);
                infoList.push(building);
            }
            else if(dist <= 20) {
                level1.push(ids[building[0]]);
                info1.push(building);
            }
            else {
                level2.push(ids[building[0]]);
                info2.push(building);
            }            
        }        
        buildList.push(level1);
        buildList.push(level2);
        infoList.push(info1);
        infoList.push(info2);
        this.onUpdateView(buildList, infoList);
    }

    protected onUpdateView(perfabList: any[], infoList: any[]): void {
        if(perfabList.length <= 0) return;

        let thisSelf = this;
        let loadList = perfabList.splice(0, 3);
        let thisInfo = infoList.splice(0, 3);
        assetManager.loadBundle("building", function(err, bundle): void {
            bundle.load(loadList, Prefab, function(error: Error, data: Prefab[]): void {
                
                thisSelf.onUpdateView(perfabList, infoList);

                if(!error) {
                    thisSelf.initBuilding(loadList, thisInfo, data);
                }
                else console.log(error.message);
            });
        });
    }

    protected initBuilding(perfabList: any[], infoList: any[], data: Prefab[]): void {
        
        let thisSelf = this;
        for(var i = 0; i < data.length; i ++){
            data[i].createNode(function(error: Error, node: Node): void {
                let pos = infoList[i][1];
                let rota = infoList[i][2];
                let scale = infoList[i][3];
                node.setWorldPosition(pos[0], pos[1], pos[2]);
                node.setWorldRotationFromEuler(rota[0], rota[1], rota[2]);
                node.setScale(scale[0], scale[1], scale[2]);
                thisSelf.node.addChild(node);
            });
        }
    }
}

