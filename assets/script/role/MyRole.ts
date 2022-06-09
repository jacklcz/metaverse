import { _decorator, v3  } from 'cc';
const { ccclass, property } = _decorator;

import GameEvent from '../base/GameEvent';
import PeerConnection from '../network/PeerConnection';
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

    public setBackward(): void {
        let euler = v3();
        let thisRota = this.node.getWorldRotation();
        thisRota.getEulerAngles(euler);
        euler.y += 180;
        this.node.setRotationFromEuler(euler);
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

    public onInitedRole(): void {
        GameEvent.emit(GameEvent.ON_INITED_OWNER);

        let position = this.node.getWorldPosition();
        PeerConnection.instance().sendPosition(position);
    }

    public sendAction(action: number): void {
        this.sendMovtion(action);
    }

    protected sendMovtion(action?: number): void {
        let euler = v3();
        let thisRota = this.node.getWorldRotation();
        thisRota.getEulerAngles(euler);
        
        if(!action) action = this.moving;
        if(this.moveType != 0) action |= 0x10000;

        let startPos = this.node.getWorldPosition();            
        PeerConnection.instance().sendMoving(action, startPos, euler);        
    }
}

