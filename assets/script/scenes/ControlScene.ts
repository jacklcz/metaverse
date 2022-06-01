import { _decorator, Component, assetManager, EventMouse, Camera, Vec2, v2 } from 'cc';
const { ccclass, property } = _decorator;

import * as fgui from "fairygui-cc";
import { ChatFrame } from '../ui/ChatFrame';

@ccclass('ControlScene')
export default class ControlScene extends Component {

    protected _mouseLast: Vec2 = v2();
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

        this.node.on(fgui.Event.TOUCH_BEGIN, this.mouseDown, this);        
        this.node.on(fgui.Event.TOUCH_END, this.mouseUp, this);
        this.node.on(fgui.Event.MOUSE_WHEEL, this.mouseWheel, this);
        fgui.GRoot.inst.on(fgui.Event.TOUCH_MOVE, this.mouseMove, this);
    }

    public get mainCamera(): any {
        let camera = this.node.parent.getChildByName("Main Camera");
        return camera.getComponent("MainRoleCamera");
    }

    private isRootInput(): boolean {
        return (fgui.GRoot.inst.touchTarget instanceof fgui.GRoot)        
    }

    private mouseDown(e: fgui.Event) {
        if(!this.isRootInput()) return;
        
        this._mouseLast.x = e.pos.x;
        this._mouseLast.y = e.pos.y;
        //this.mainCamera.onMouseDown(e);
    }

    private mouseMove(e: fgui.Event) {
        if(!this.isRootInput()) return;

        let detla: Vec2 = v2(e.pos);
        detla.subtract(this._mouseLast);
        this._mouseLast.x = e.pos.x;
        this._mouseLast.y = e.pos.y;
        
        this.mainCamera.onMouseMove(detla);
    }

    private mouseUp(e: fgui.Event) {
        if(!this.isRootInput()) return;

        //this.mainCamera.onMouseUp(e);
    }

    private mouseWheel(e: fgui.Event): void {
        if(!this.isRootInput()) return;
                
        this.mainCamera.onMouseWheel(e.mouseWheelDelta);        
    }
}

