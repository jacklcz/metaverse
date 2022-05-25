import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

import web3 from "web3/dist/web3.min.js";

@ccclass('MetaMask')
export default class MetaMask {

    static isInstalled() : boolean {
        const { ethereum } = window;
        return Boolean(ethereum && ethereum.isMetaMask);
    }
    
    public connectMetaMask(caller: any, listener: Function): void {

        if(MetaMask.isInstalled()){
            let ethereum = window.ethereum;
            if(ethereum._state.initialized != true){
                let erro = new Error("MetaMask is not initialized!\n请刷新页面再试!");
                listener.call(caller, 0, erro);
            }
            else{
                ethereum.request({ method: 'eth_requestAccounts' })
                    .then(accounts => {
                        const account = accounts[0];
                        listener.call(caller, 1, account);
                    })
                    .catch(function(error) {
                        listener.call(caller, 0, error);                    
                    }
                );
            }         
        }
        else listener.call(caller, 0, "MetaMask is not installed!");
    }    
}

