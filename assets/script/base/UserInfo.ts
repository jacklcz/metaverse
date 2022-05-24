import { _decorator } from 'cc';
const { ccclass, property } = _decorator;

class _UserInfo {
    public account: string = null;
    public token: string = null;
}

var UserInfo = new _UserInfo();
export {UserInfo as default};

