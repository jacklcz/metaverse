import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

import * as fgui from "fairygui-cc";
import GameEvent from "../base/GameEvent";
import AudioManager from '../base/AudioManager';
import PeerConnection from '../network/PeerConnection';
import Dialog from './Dialog';

@ccclass('SettingDlg')
export class SettingDlg extends Dialog {

    public showDlg(mainView: fgui.GComponent): void {
        super.popupDlg(mainView, "setFrame");
    }

    public onInitDlg(): void {
        let dlg = this._dlg.contentPane;
        dlg.getChild<fgui.GButton>("quitBtn").onClick(this.onQuit, this);

        let volume = dlg.getChild<fgui.GSlider>("volume");
        volume.on(fgui.Event.STATUS_CHANGED, this.onChanged, this);

        volume.value = AudioManager.instance().audioSource.volume * 100;
    }

    protected onQuit(): void {
        PeerConnection.instance().close();
        GameEvent.emit(GameEvent.OPEN_ROLE_SCENE);
    }

    protected onChanged(): void {
        let dlg = this._dlg.contentPane;
        let volume = dlg.getChild<fgui.GSlider>("volume");
        AudioManager.instance().audioSource.volume = volume.value / 100;
    }
}

