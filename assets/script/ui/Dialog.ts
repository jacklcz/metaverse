import { _decorator, Component, Node, game } from 'cc';
const { ccclass, property } = _decorator;
 
import * as fgui from "fairygui-cc";

@ccclass('Dialog')
export default abstract class Dialog {

    protected _dlg: fgui.Window;

    abstract onInitDlg(): void;

    public popupDlg(mainView: fgui.GComponent, dlgName: string, center: boolean = true): void {

        this._dlg = new fgui.Window();
        let dlg = fgui.UIPackage.createObject("mainScene", dlgName).asCom;
        this._dlg.contentPane = dlg;    
        this.onInitDlg();

        let thisSelf = this;
        let btn = dlg.getChild<fgui.GButton>("closeBtn");
        btn.onClick(function(): void {
            thisSelf._dlg.hide();
            thisSelf._dlg.dispose();
            dlg.dispose();            
        }, this);        
        
        this._dlg.modal = true;
        this._dlg.show();        
        this.onShowDlg(mainView, center);
    }

    protected onShowDlg(mainView: fgui.GComponent, center: boolean): void {
        let view = this._dlg;
        let pos = mainView.node.getPosition();
        pos.x += (mainView.width - view.width) / 2;
        if(center){            
            pos.y += (mainView.height - view.height) / 2;
        }
        else {
            pos.y += mainView.height - view.height;
        }
        view.setPosition(pos.x, pos.y);
    }
}