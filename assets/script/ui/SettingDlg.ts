import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

import * as fgui from "fairygui-cc";
import Dialog from './Dialog';

@ccclass('SettingDlg')
export class SettingDlg extends Dialog {

    public showDlg(mainView: fgui.GComponent): void {
        super.popupDlg(mainView, "setFrame");
    }

    public onInitDlg(): void {
    }
}

