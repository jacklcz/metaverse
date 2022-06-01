import { _decorator, Vec2 } from 'cc';

class _define {
        
	public ERR_ERROR   = 0;
	public ERR_SUCCESS = 1;	
	public ERR_TIMEOUT = 2;	
	public ERR_FAILED  = -1;

	public briefString(text: string, max: number = 7): string {
        if(text.length > max){
            text = "0x.." + text.slice(text.length - 4);
        }
        return text;
    }
}
const Define = new _define();
export {Define as default};