import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

import web3 from "web3/dist/web3.min.js";

@ccclass('MetaMask')
export default class MetaMask {

    static isInstalled() : boolean {
        const { ethereum } = window;
        return Boolean(ethereum && ethereum.isMetaMask);
    }

    static metaStatus(listener: Function, caller: any): void {
        
        if(MetaMask.isInstalled()){
            let ethereum = window.ethereum;
            if(ethereum._state.initialized != true){
                listener.call(caller, 3);
            }
            else {
                ethereum.request({ method: 'eth_chainId' })
                    .then(chainId => {
                        let id = parseInt(chainId, 16);
                        let status = 0;
                        if(id != 0x1 && id != 0x38 && id != 0x89){                            
                            status = 2;
                        }
                        listener.call(caller, status);
                    })
                    .catch(function(error) {
                        listener.call(caller, 3);                                   
                    }
                );
            }  
        }
        else listener.call(caller, 1);        
    }
    
    public connectMetaMask(caller: any, listener: Function): void {

        MetaMask.metaStatus(function(status: number): void {
            if(status == 0){
                let ethereum = window.ethereum;            
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
            else listener.call(caller, 0, "MetaMask status error!");
        }, this);
    }    
}

