import { _decorator, EventTarget } from 'cc';

class MyEvent extends EventTarget{

    constructor() { super(); }

    //system event define
    public ON_ROLE_LOCATION = "on_role_location";
    public ON_ROLE_OFFLINE = "on_role_offline";
    public ON_INIT_OWNER = "on_init_owner";
    public ON_SEND_CHAT_MSG = "on_send_chat_msg";
    public ON_CHAT_MESSAGE = "on_chat_message";
    public ON_ROLE_MOVING = "on_role_moving";

    //network event define
    public CONNECTION_ERROR = "net_connection_error";
    public CONNECTION_CLOSED = "net_connection_closed";
    
    public ON_LOADING_PROCESS = "on_loading_process";

    //switch event define
    public OPEN_MAIN_SCENE = "open_main_scene";

    //message event define
    public LOGIN_RESULT = "login_result";
    public GET_ROLE_RESULT = "get_role_result";
    public LOGIN_ROLE_SCENE = "login_role_scene";

    //message role define
    public ON_OWNER_INITED = "on_owner_inited";
    public ON_ROLE_CREATED = "on_role_created";
    public ON_ROLE_REMOVED = "on_role_removed"; 
    public ON_SCENE_CHANGED = "on_scene_changed";    
    public ON_MOVE_FINISHED = "on_move_finished";
    public ON_OWNER_POSITION = "on_owner_position";    
}

var GameEvent = new MyEvent();
export {GameEvent as default};