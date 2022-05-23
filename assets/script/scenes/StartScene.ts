
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

import * as fgui from "fairygui-cc";
import Define from '../base/Define';
import GameEvent from "../base/GameEvent";
import TheConfig from '../base/TheConfig';
import PeerConnection from '../network/PeerConnection';
import MetaMask from '../network/MetaMask';

@ccclass('StartScene')
export class StartScene extends Component {
    private _mainView: fgui.GComponent = null;

    start(){
        console.log("StartScene loading!");

        fgui.GRoot.create();
        fgui.UIPackage.loadPackage("ui/login", this.onLoadUI.bind(this));
    }

    private onLoadUI(err){
        let view: fgui.GComponent = fgui.UIPackage.createObject("login", "startScene").asCom;
        fgui.GRoot.inst.addChild(view);
        view.makeFullScreen();
        this._mainView = view;

        GameEvent.on(GameEvent.LOGIN_RESULT, this.onLoginResult, this);        
        view.getChild("startBtn").onClick(this.onStart, this);
    }

    onDestroy() {        
        console.log("StartScene onDestroy!");
    }

    private onStart(): void {

        console.log("StartScene onStart!");

        this._mainView.getChild<fgui.GButton>("startBtn").enabled = false;
        //this.onLoginResult(Define.ERR_SUCCESS);
        //return;

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
                
                response = randomString();
                console.log("For testing, account change to=%s", response);

                let peerConnection = PeerConnection.instance();
                peerConnection.login(TheConfig.httpUrl, TheConfig.wsUrl, response);
            }
            else console.error("connect MetaMask failed for: %s", response);            
        });
    }

    private onLoginResult(result: number, msg?: any): void {
        if(result == Define.ERR_SUCCESS) {
            console.log("StartScene --> 登录成功!");
            GameEvent.emit(GameEvent.OPEN_MAIN_SCENE, this, function(step: any): void {
                console.log("loading main scene %d", step * 100);
            });
        }
        else {
            this._mainView.getChild<fgui.GButton>("startBtn").enabled = true;
            console.log("StartScene --> 登录失败:%s", msg);
        }
    }
}