import { _decorator, Vec3, v3 } from 'cc';
const { ccclass, property } = _decorator;

class _UserInfo {
    public id: string = null;
    public account: string = null;
    public nickName: string = null;
    public token: string = null;
    public role: string = null;
    public initPos: Vec3 = v3(12, 0, 18);
}

var UserInfo = new _UserInfo();
export {UserInfo as default};

