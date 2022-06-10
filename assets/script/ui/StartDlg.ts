import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

import * as fgui from "fairygui-cc";
import Dialog from './Dialog';

@ccclass('StartDlg')
export class StartDlg extends Dialog {

    public showDlg(mainView: fgui.GComponent): void {
        super.popupDlg(mainView, "guideStart", false);
    }

    public onInitDlg(): void {
    } 
}

