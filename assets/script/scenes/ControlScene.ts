import { _decorator, Component, Node, assetManager } from 'cc';
const { ccclass, property } = _decorator;

import * as fgui from "fairygui-cc";
import { ChatFrame } from '../ui/ChatFrame';

@ccclass('ControlScene')
export default class ControlScene extends Component {

    protected _mainView: fgui.GComponent = null;
    protected _chatFrame: any = null;

    onLoaded(listener: Function, caller?: any): void {
        let thisSelf = this;
        fgui.GRoot.create();
        assetManager.loadBundle("mainRes", function(err, bundle): void {
            fgui.UIPackage.loadPackage(bundle, "ui/mainScene", function(error: any): void {
                if(!error){
                    thisSelf.onLoadUI();
                }
                listener.call(caller, error);
            });
        });
    }

    protected onLoadUI(): void {
        let view: fgui.GComponent = fgui.UIPackage.createObject("mainScene", "scene").asCom;
        fgui.GRoot.inst.addChild(view);
        view.makeFullScreen();
        this._mainView = view;

        let frame = view.getChild<fgui.GComponent>("chat");
        this._chatFrame = new ChatFrame(frame);
    }
}

