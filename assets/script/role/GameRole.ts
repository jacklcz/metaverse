import { _decorator, Component, Vec3, v3 } from 'cc';
const { ccclass, property } = _decorator;

import { BaseRole, ActionType, RotateType } from './BaseRole';

@ccclass('GameRole')
export class GameRole extends BaseRole {
    
    private _action: ActionType = ActionType.None;    

    public get action(): ActionType {
        return this._action;
    }

    public set action(value: ActionType) {
        this._action = value;
    }    

    public onMovingPrv(deltaTime: number): void {}
    public onMoving(flag: boolean): void {}
    public onInitedRole(): void {}
    public onUpdatedPosition(): void {}
}

