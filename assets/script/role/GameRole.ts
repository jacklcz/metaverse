import { _decorator, Component, Vec3, v3 } from 'cc';
const { ccclass, property } = _decorator;

import { BaseRole, MoveType, RotateType } from './BaseRole';

@ccclass('GameRole')
export class GameRole extends BaseRole {
    
    private _moving: MoveType = MoveType.None;    

    public get moving(): MoveType {
        return this._moving;
    }

    public set moving(value: MoveType) {
        this._moving = value;
    }    

    public onMoving(deltaTime: number): void {}
}

