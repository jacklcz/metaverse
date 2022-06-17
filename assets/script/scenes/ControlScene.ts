import { _decorator, Component, assetManager, Color, Vec2, v2, Vec3, Quat, v3 } from 'cc';
const { ccclass, property } = _decorator;

import * as fgui from "fairygui-cc";
import UserInfo from '../base/UserInfo';
import GameEvent from '../base/GameEvent';
import { MyRole } from '../role/MyRole';
import { ActionType } from '../role/BaseRole';
import { ChatFrame } from '../ui/ChatFrame';
import { GuideDlg } from '../ui/GuideDlg';
import { StartDlg } from '../ui/StartDlg';
import { SettingDlg } from '../ui/SettingDlg';

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

        this.setRoleHeader();
        
        view.getChild<fgui.GComponent>("expressFrame").visible = false;        
        let frame = view.getChild<fgui.GComponent>("chatFrame");
        this._chatFrame = new ChatFrame(frame);

        view.getChild<fgui.GButton>("messageBtn").onClick(this.onMsgFrame, this);
        view.getChild<fgui.GButton>("operaBtn").onClick(this.onOprFrame, this);        
        view.getChild<fgui.GButton>("expressBtn").onClick(this.onExpFrame, this);
        view.getChild<fgui.GButton>("settingBtn").onClick(this.onSetFrame, this);

        let expFrame = this._mainView.getChild<fgui.GComponent>("expressFrame");
        expFrame.getChild<fgui.GButton>("btn01").onClick(this.onDancing01, this);
        expFrame.getChild<fgui.GButton>("btn02").onClick(this.onWaving, this);
        expFrame.getChild<fgui.GButton>("btn03").onClick(this.onDancing02, this);

        this.node.on(fgui.Event.TOUCH_BEGIN, this.mouseDown, this);
        this.node.on(fgui.Event.TOUCH_END, this.mouseUp, this);
        this.node.on(fgui.Event.MOUSE_WHEEL, this.mouseWheel, this);
        fgui.GRoot.inst.on(fgui.Event.TOUCH_MOVE, this.mouseMove, this);

        GameEvent.on(GameEvent.ON_OWNER_POSITION, this.onOwnerPosition, this);       
        
        this.showStartGuide();
    }

    public get mainCamera(): any {
        let camera = this.node.parent.getChildByName("Main Camera");
        return camera.getComponent("MainRoleCamera");
    }

    protected setRoleHeader(): void {
        let header = this._mainView.getChild<fgui.GLoader>("roleHeader");
        header.url = "ui://mainScene/role" + UserInfo.role;
    }

    protected onMsgFrame(): void {
        this._chatFrame.switchVisible();
    }

    protected onOprFrame(): void {
        let dlg = new GuideDlg();
        dlg.showDlg(this._mainView);
    }

    protected onExpFrame(): void {
        let expFrame = this._mainView.getChild<fgui.GComponent>("expressFrame");
        expFrame.visible = !expFrame.visible;
    }

    protected onSetFrame(): void {
        let dlg = new SettingDlg();
        dlg.showDlg(this._mainView);
    }

    protected showStartGuide(): void {
        let dlg = new StartDlg();
        dlg.showDlg(this._mainView);
    }

    private onWaving(): void {
        if(MyRole.instance().waveAction()){
            MyRole.instance().sendAction(ActionType.Wave);                    
        }
    }

    private onDancing01(): void {
        if(MyRole.instance().dancing01()){
            MyRole.instance().sendAction(ActionType.Dance1);                    
        }
    }

    private onDancing02(): void {
        if(MyRole.instance().dancing02()){
            MyRole.instance().sendAction(ActionType.Dance2);                    
        }
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
    
    private onOwnerPosition(): void {
        let myNode = MyRole.instance().node;

        let euler = v3();
        let rotation = new Quat();
        myNode.getWorldRotation(rotation);
        rotation.getEulerAngles(euler);

        let pos = myNode.getWorldPosition();

        let x = Math.floor((pos.x * 10) + 740);
        let y = Math.abs(Math.floor((pos.z * 10) - 690));

        let frame = this._mainView.getChild<fgui.GComponent>("mapFrame");
        frame.getChild<fgui.GTextField>("mapPosition").text = `${x.toString()},  ${y.toString()}`;

        x = x * 240 / 2280; y = y * 240 / 1620; y = 240 - y;
        if(x < 0) x = 0; if(x > 240) x = 240;
        if(y < 0) y = 0; if(y > 240) y = 240;
        
        let map = frame.getChild<fgui.GComponent>("roleMap");
        let role = map.getChild<fgui.GObject>("role");        
        role.setPosition(x, y);        
        role.rotation = -euler.y;
    }
}

