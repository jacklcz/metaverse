
import { _decorator, Component, color } from 'cc';
const { ccclass, property } = _decorator;

import * as fgui from "fairygui-cc";
import Define from '../base/Define';
import GameEvent from "../base/GameEvent";
import TheConfig from '../base/TheConfig';
import UserInfo from '../base/UserInfo';
import PeerConnection from '../network/PeerConnection';
import MetaMask from '../network/MetaMask';

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

        view.getChild<fgui.GButton>("goBtn").visible = false;
        view.getChild<fgui.GButton>("startBtn").visible = false;
        view.getChild<fgui.GComponent>("selection").visible = false;
        view.getChild<fgui.GProgressBar>("loading").visible = false;
        this.schedule(this.onCheckMetaMask, 1);

        GameEvent.on(GameEvent.LOGIN_RESULT, this.onLoginResult, this);        
        view.getChild("startBtn").onClick(this.onStart, this);
    }

    onDestroy() {        
        console.log("StartScene onDestroy!");
    }

    private onStart(): void {

        console.log("StartScene onStart!");

        this._mainView.getChild<fgui.GButton>("startBtn").enabled = false;
        let tips = this._mainView.getChild<fgui.GTextField>("tips");
        tips.text = "开始连接MetaMask..."
        //this.onLoginResult(Define.ERR_SUCCESS);
        //return;

        let thisSelf = this;
        let metaMask = new MetaMask();
        metaMask.connectMetaMask(this, function(result, response): void {
            if(result == 1){
                console.log("Get MetaMask account=%s", response);

                function randomString(length: number = 10) {
                    var t = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678";
                    let a = t.length;
                    let result = "";
                    for (var i = 0; i < length; i++){
                        result += t.charAt(Math.floor(Math.random() * a));
                    }
                    return result
                }
                
                //response = randomString();
                //console.log("For testing, account change to=%s", response);

                UserInfo.account = response; //save the account;
                thisSelf.onGetAccount();
            }
            else {
                console.error("connect MetaMask failed for: %s", response);            
                tips.text = "连接MetaMask失败: " + response.message;
            }
        });
    }

    private onGetAccount(): void {
        let tips = this._mainView.getChild<fgui.GTextField>("tips");
        tips.text = "请选择游戏角色";

        this._mainView.getChild<fgui.GButton>("startBtn").visible = false;
        
        let goBtn = this._mainView.getChild<fgui.GButton>("goBtn");
        goBtn.onClick(this.startLogin, this);

        this._mainView.getChild<fgui.GComponent>("selection").visible = true;
        goBtn.visible = true;
    }

    private startLogin(): void {
        this._mainView.getChild<fgui.GButton>("goBtn").visible = false;        
        let tips = this._mainView.getChild<fgui.GTextField>("tips");
        tips.text = "登录游戏...";

        let selection = this._mainView.getChild<fgui.GComponent>("selection");
        selection.visible = false;
        let index = selection.getController("select").selectedIndex;
        UserInfo.role = index.toString();

        let peerConnection = PeerConnection.instance();
        peerConnection.login(TheConfig.httpUrl, TheConfig.wsUrl);
    }

    private onLoginResult(result: number, msg?: any): void {
        if(result == Define.ERR_SUCCESS) {
            console.log("StartScene --> 登录成功!");

            let loading = this._mainView.getChild<fgui.GProgressBar>("loading");
            loading.visible = true;            
            GameEvent.on(GameEvent.ON_LOADING_PROCESS, this.onLoadingProcess, this);
            GameEvent.emit(GameEvent.OPEN_MAIN_SCENE);
        }
        else {
            //this._mainView.getChild<fgui.GButton>("startBtn").enabled = true;
            console.log("StartScene --> 登录失败:%s", msg);
            let tips = this._mainView.getChild<fgui.GTextField>("tips");
            tips.text = "登录游戏失败: " + msg;
        }
    }

    private onLoadingProcess(value: any): void {
        value = Math.floor(value * 100);
        if(value > 100) value = 100;
        
        console.log("loading main scene %d", value);
        let loading = this._mainView.getChild<fgui.GProgressBar>("loading");
        if(loading) loading.value = value;        
    }

    private onCheckMetaMask(): void {
        if(this.onMetaMaskStatus()){
            this.unschedule(this.onCheckMetaMask);
            this._mainView.getChild<fgui.GButton>("startBtn").visible = true;
        }
    }

    private onMetaMaskStatus(): boolean {

        let tips = this._mainView.getChild<fgui.GTextField>("tips");
        if(MetaMask.isInstalled()){
            tips.color = color(0xff, 0xff, 0xff);
            tips.text = "点击“开始游戏”登录"
            return true;
        }
        else {
            tips.color = color(0xff, 0x00, 0x00);
            tips.text = "请安装MetaMask!"
            return false;
        }
    }
}