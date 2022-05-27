import { _decorator, v3  } from 'cc';
import PeerConnection from '../network/PeerConnection';
const { ccclass, property } = _decorator;

import { BaseRole, MoveType, RotateType } from './BaseRole';

@ccclass('MyRole')
export class MyRole extends BaseRole {

    static moving: MoveType = MoveType.None;
    static ratation: RotateType = RotateType.None;

    static _instance: MyRole = null;
    static instance(): MyRole {
        return MyRole._instance;
    }

    private _lastSyncTime: number = 0;

    constructor() {
        super();
        MyRole._instance = this;
    }

    start(): void {

    }

    public get moving(): MoveType {
        return MyRole.moving;
    }

    public set moving(value: MoveType) {
        MyRole.moving = value;
    }

    public get ratation(): number {
        return MyRole.ratation;
    }

    public set ratation(value: number) {
        MyRole.ratation = value;
    }

    public onMovingPrv(deltaTime: number): void {
        let rotation = 0;
        switch(this.ratation){
            case RotateType.Left:
                rotation = 1;              
                break;
            case RotateType.Right:
                rotation = -1;
                break;
            default:
                break;
        }

        if(rotation != 0){
            let euler = v3();
            let thisRota = this.node.getWorldRotation();
            thisRota.getEulerAngles(euler);
            euler.y += rotation * this.rotaSpeed * deltaTime;
            this.node.setRotationFromEuler(euler);
        }
    }

    public onMoving(flag: boolean = true): void {
        let thisTime = Date.now();
        let passTime = thisTime - this._lastSyncTime;
        if(passTime >= 500 || flag) {
            this._lastSyncTime = thisTime;
            this.sendMovtion();            
        }
    }

    protected sendMovtion(): void {
        let euler = v3();
        let thisRota = this.node.getWorldRotation();
        thisRota.getEulerAngles(euler);
        
        let startPos = this.node.getWorldPosition();            
        PeerConnection.instance().sendMoving(this.moving, startPos, euler);

        console.log("send startPos %s", startPos.toString());
    }
}
