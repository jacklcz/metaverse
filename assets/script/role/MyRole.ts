import { _decorator, v3  } from 'cc';
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

    constructor() {
        super();
        MyRole._instance = this;
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

    public onMoving(deltaTime: number): void {
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
}

