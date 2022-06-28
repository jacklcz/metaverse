
import { _decorator, Component, color } from 'cc';
const { ccclass, property } = _decorator;

import * as fgui from "fairygui-cc";
import Define from '../base/Define';
import UserInfo from '../base/UserInfo';
import GameEvent from "../base/GameEvent";
import TheConfig from '../base/TheConfig';
import MetaMask from '../network/MetaMask';
import PeerConnection from '../network/PeerConnection';

@ccclass('StartScene')
export class StartScene extends Component {
    private _mainView: fgui.GComponent = null;

    start(){
        console.log("StartScene loading!");

        fgui.GRoot.create();
        fgui.UIPackage.loadPackage("ui/startScene", this.onLoadUI.bind(this));
    }

    private onLoadUI(err){
        let view: fgui.GComponent = fgui.UIPackage.createObject("startScene", "scene").asCom;
        fgui.GRoot.inst.addChild(view);
        view.makeFullScreen();
        this._mainView = view;
        
        let panel = view.getChild<fgui.GComponent>("rolePanel");
        panel.getChild("enterBtn").onClick(this.onEnterGame, this);
        panel.getChild<fgui.GLoader>("header").url = "ui://startScene/role0";
        panel.enabled = false;

        let control = panel.getController("c1");
        control.on(fgui.Event.STATUS_CHANGED, this.onChanged, this);
        control.selectedIndex = Math.floor(Math.random() * 8);

        GameEvent.on(GameEvent.LOGIN_RESULT, this.onLoginResult, this);

        this.checkMetaStatus();
    }

    private onChanged(): void {
        let panel = this._mainView.getChild<fgui.GComponent>("rolePanel");
        let index = panel.getController("c1").selectedIndex;

        let url = "ui://startScene/role" + index.toString();
        panel.getChild<fgui.GLoader>("header").url = url;
    }

    private onEnterGame(): void {

        console.log("StartScene onEnterGame!");

        let panel = this._mainView.getChild<fgui.GComponent>("rolePanel");
        panel.getChild<fgui.GButton>("enterBtn").enabled = false;
        let index = panel.getController("c1").selectedIndex;
        panel.enabled = false;

        UserInfo.role = index.toString();

        let thisSelf = this;
        let metaMask = new MetaMask();
        metaMask.connectMetaMask(this, function(result, response): void {
            if(result == 1){
                console.log("Get MetaMask account=%s", response);

                UserInfo.account = response; //save the account;
                thisSelf.onGetAccount();
            }
            else{
                console.error("connect MetaMask failed for: %s", response.message);
                thisSelf.checkMetaStatus();
            }
        });
    }
    
    private onGetAccount(): void {

        let peerConnection = PeerConnection.instance();
        peerConnection.login(TheConfig.httpUrl, TheConfig.wsUrl);
    }   
    
    private onLoginResult(result: number, msg?: any): void {
        if(result == Define.ERR_SUCCESS) {
            console.log("StartScene --> 登录成功!");

            this._mainView.getChild<fgui.GComponent>("rolePanel").visible = false;
            this._mainView.getChild<fgui.GComponent>("selectBk").visible = false;
                        
            GameEvent.on(GameEvent.ON_LOADING_PROCESS, this.onLoadingProcess, this);
            GameEvent.emit(GameEvent.OPEN_MAIN_SCENE);
        }
        else {
            let panel = this._mainView.getChild<fgui.GComponent>("rolePanel");
            panel.getChild<fgui.GButton>("enterBtn").enabled = true;            
            panel.enabled = true;
            
            console.log("SelectScene --> 登录失败:%s", msg);
        }
    }

    private onLoadingProcess(value: any): void {
        value = Math.floor(value * 100);
        if(value > 100) value = 100;        
        
        let loading = this._mainView.getChild<fgui.GProgressBar>("processBar");
        if(loading) loading.value = value;        
    }

    private checkMetaStatus(): void {
        MetaMask.metaStatus(this.onMetaMaskStatus, this);
    }

    private onMetaMaskStatus(status: number): void {

        let tips = this._mainView.getChild<fgui.GLoader>("notify");
        if( status == 0){
            let panel = this._mainView.getChild<fgui.GComponent>("rolePanel");        
            panel.enabled = true;
            tips.visible = false;            
        }
        else {
            let url = "";
            switch(status){
                case 1:
                    url = "ui://startScene/installMetamask";
                    break;
                case 2:
                    url = "ui://startScene/supportNetwork";
                    break;
                case 3:
                    url = "ui://startScene/refreshPage";
                    break;
                default: break;
            }
            tips.url = url;            
        }
    }
}