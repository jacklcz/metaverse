import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

import * as fgui from "fairygui-cc";
import Define from '../base/Define';
import GameEvent from "../base/GameEvent";

@ccclass('SelectScene')
export class SelectScene extends Component {

    private _mainView: fgui.GComponent = null;

    start(){
        console.log("SelectScene loading!");

        fgui.GRoot.create();
        fgui.UIPackage.loadPackage("ui/select", this.onLoadUI.bind(this));
    }

    private onLoadUI(err){
        let view: fgui.GComponent = fgui.UIPackage.createObject("select", "selectScene").asCom;
        fgui.GRoot.inst.addChild(view);
        view.makeFullScreen();
        this._mainView = view;        
    }
}

