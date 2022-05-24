System.register("chunks:///_virtual/AppMain.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GameEvent.ts', './TheConfig.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, _decorator, game, setDisplayStats, director, assetManager, Component, GameEvent, TheConfig;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      game = module.game;
      setDisplayStats = module.setDisplayStats;
      director = module.director;
      assetManager = module.assetManager;
      Component = module.Component;
    }, function (module) {
      GameEvent = module.default;
    }, function (module) {
      TheConfig = module.default;
    }],
    execute: function () {
      var _dec, _class;

      cclegacy._RF.push({}, "4455dbrf3lI8IaZPBkNkWtB", "AppMain", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var AppMain = exports('default', (_dec = ccclass('AppMain'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(AppMain, _Component);

        function AppMain() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _this._mainPacks = ["building", "characters", "mainRes", "texture"];
          _this._selectPack = ["selectRes"];
          return _this;
        }

        var _proto = AppMain.prototype;

        _proto.onLoad = function onLoad() {
          game.addPersistRootNode(this.node);
          setDisplayStats(false);
          GameEvent.on(GameEvent.OPEN_MAIN_SCENE, this.openMainScene, this);
          GameEvent.on(GameEvent.LOGIN_ROLE_SCENE, this.selectRoleScene, this);
          console.log("AppMain onLoad!");
        };

        _proto.loadScene = function loadScene(sceneName) {
          director.preloadScene(sceneName, function () {
            director.loadScene(sceneName);
          });
        };

        _proto.openMainScene = function openMainScene(caller, listener) {
          this.loadSubpack("MainScene", 0, this._mainPacks, caller, listener);
        };

        _proto.selectRoleScene = function selectRoleScene(msg) {
          var resList = TheConfig.selectResList(); //resources.load(resList, JsonAsset,  function (err, assets: JsonAsset[]):void {
          //    if(err){
          //        console.log(err);
          //    }
          //    else {
          //        TheConfig.selectCfg.setRes(resList, assets);
          //        thisSelf.loadScene("SelectScene");
          //    }
          //});
        };

        _proto.loadSubpack = function loadSubpack(sceneName, index, packs, caller, listener) {
          var length = packs.length;

          if (index >= length) {
            this.loadScene(sceneName);
          } else {
            var thisSelf = this;
            assetManager.loadBundle(packs[index], function (err) {
              var step = index / length;
              listener.call(caller, step);
              thisSelf.loadSubpack(sceneName, index + 1, packs, caller, listener);
            });
          }
        };

        return AppMain;
      }(Component)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Base64.ts", ['cc', './Utf8.ts', './main.ts'], function (exports) {
  'use strict';

  var cclegacy, utf8Encode, utf8Decode, createEncode, createDecode, PAD;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      utf8Encode = module.utf8Encode;
      utf8Decode = module.utf8Decode;
      var _setter = {};
      _setter.utf8Decode = module.utf8Decode;
      _setter.utf8Encode = module.utf8Encode;
      exports(_setter);
    }, function (module) {
      createEncode = module.createEncode;
      createDecode = module.createDecode;
      PAD = module.PAD;
      var _setter = {};
      _setter.BASE64_TABLE = module.BASE64_TABLE;
      _setter.PAD = module.PAD;
      _setter.createDecode = module.createDecode;
      _setter.createEncode = module.createEncode;
      exports(_setter);
    }],
    execute: function () {
      cclegacy._RF.push({}, "1aaf0nTry9J3IL0TdzFHEYR", "Base64", undefined);

      var BASE64_URL_TABLE = exports('BASE64_URL_TABLE', 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_');
      var encode = exports('encode', createEncode(utf8Encode));
      var decode = exports('decode', createDecode(utf8Decode));
      var encodeURL = exports('encodeURL', createEncode(BASE64_URL_TABLE, PAD, utf8Encode));
      var decodeURL = exports('decodeURL', createDecode(BASE64_URL_TABLE, PAD, utf8Decode));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ChatFrame.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GameEvent.ts', './GlobalNode.ts', './PeerConnection.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, _decorator, EventHandler, Node, GameEvent, GlobalNode, PeerConnection;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      EventHandler = module.EventHandler;
      Node = module.Node;
    }, function (module) {
      GameEvent = module.default;
    }, function (module) {
      GlobalNode = module.default;
    }, function (module) {
      PeerConnection = module.default;
    }],
    execute: function () {
      var _dec, _class;

      cclegacy._RF.push({}, "67ed3nSxnBI1LzAkruGvfgs", "ChatFrame", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var ChatFrame = exports('ChatFrame', (_dec = ccclass('ChatFrame'), _dec(_class = /*#__PURE__*/function (_Node) {
        _inheritsLoose(ChatFrame, _Node);

        function ChatFrame(com) {
          var _this;

          _this = _Node.call(this) || this;
          _this._com = null;
          _this._messages = [];
          _this._com = com;

          _this.onInitilize();

          return _this;
        }

        var _proto = ChatFrame.prototype;

        _proto.onInitilize = function onInitilize() {
          var handler = new EventHandler();
          handler.handler = "onChatEnded";
          handler.target = GlobalNode.instance().node;
          handler.component = "GlobalNode";

          var thisInput = this._com.getChild("input");

          thisInput._editBox.editingDidEnded.push(handler);

          this._com.getChild("msgList").text = "";

          var sendBtn = this._com.getChild("sendBtn");

          sendBtn.onClick(this.onSendChat, this);
          GameEvent.on(GameEvent.ON_SEND_CHAT_MSG, this.onSendChat, this);
          GameEvent.on(GameEvent.ON_CHAT_MESSAGE, this.onChatMessage, this);
        };

        _proto.onSendChat = function onSendChat() {
          var thisInput = this._com.getChild("input");

          var text = thisInput.text;
          var length = text.length;
          if (length <= 0) return;
          PeerConnection.instance().sendChat(text);
          thisInput.text = "";
          thisInput.requestFocus();
        };

        _proto.onChatMessage = function onChatMessage(nickName, msg) {
          nickName = this.formatString(nickName);
          var thisText = "[" + nickName + "]: [COLOR=#FFFF00]" + msg + "[/COLOR]";

          this._messages.push(thisText);

          if (this._messages.length > 50) {
            this._messages.shift();
          }

          this.updateMessage();
        };

        _proto.updateMessage = function updateMessage() {
          var text = "";
          var length = this._messages.length;

          if (length > 0) {
            var count = length - 1;

            for (var i = 0; i < count; i++) {
              text += this._messages[i] + "\n";
            }

            text += this._messages[count];
          }

          var msgList = this._com.getChild("msgList");

          msgList.text = text;
        };

        _proto.formatString = function formatString(text, max) {
          if (text.length > 6) {
            text = text.slice(0, 3) + ".." + text[text.length - 1];
          }

          return text;
        };

        return ChatFrame;
      }(Node)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Connection.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GameEvent.ts', './Base64.ts', './Define.ts', './proto.js', './proto.mjs_cjs=&original=.js', './phoenix.mjs'], function (exports) {
  'use strict';

  var _createClass, cclegacy, GameEvent, decode, encode, Define, _cjsExports, Socket;

  return {
    setters: [function (module) {
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      GameEvent = module.default;
    }, function (module) {
      decode = module.decode;
      encode = module.encode;
    }, function (module) {
      Define = module.default;
    }, function (module) {
      _cjsExports = module.default;
    }, null, function (module) {
      Socket = module.Socket;
    }],
    execute: function () {
      cclegacy._RF.push({}, "13341hD1NlFKLtb9QovmL+b", "Connection", undefined);

      var Connection = exports('default', /*#__PURE__*/function () {
        function Connection() {
          this._channel = null;
          this._socket = null;
          this._eventCaller = void 0;
          this._onConnected = void 0;
          this._onSocketError = void 0;
          this._onSocketClose = void 0;
          this._socket = null;
          this._onConnected = null;
          this._onSocketError = null;
          this._onSocketClose = null;
          this._eventCaller = this;
        }

        var _proto = Connection.prototype;

        _proto.httpConnect = function httpConnect(httpUrl, acount, caller, listener) {
          var xhr = new XMLHttpRequest();

          xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
              if (xhr.status >= 200 && xhr.status < 400) {
                var response = xhr.responseText;
                console.log("loginRequest reponse:" + response);
                var HttpResponse = _cjsExports.game.Response;
                var resp = HttpResponse.decode(decode(response));

                if (resp.code == 1) {
                  var LoginResponse = _cjsExports.game.LoginResponse;
                  var thisResponse = LoginResponse.decode(resp.data.value);
                  listener.call(caller, resp.code, thisResponse.token);
                } else listener.call(caller, 0, resp.message);
              } else listener.call(caller, 0);
            }
          };

          xhr.onerror = function (evt) {
            console.log(evt);
          };

          var LoginRequest = _cjsExports.game.LoginRequest;
          var login = LoginRequest.create({
            nickname: acount
          });
          var data = encode(LoginRequest.encode(login).finish());
          xhr.open("POST", httpUrl, true);
          xhr.setRequestHeader("content-type", "application/x-protobuf3");
          xhr.send(data);
        };

        _proto.connect = function connect(wsUrl, token) {
          this.close();
          this._socket = new Socket(wsUrl, {
            params: {
              token: token
            }
          });
          this._socket.binaryType = "arraybuffer";
          var thisSelf = this;

          this._socket.onOpen(function () {
            thisSelf.onOpen();
          });

          this._socket.onClose(function () {
            thisSelf.onClose();
          });

          this._socket.onError(function () {
            thisSelf.onError();
          });

          this._socket.onMessage(function (_ref) {
            var event = _ref.event,
                payload = _ref.payload;
            thisSelf.onMessage(payload);
          });

          this._socket.connect();
        };

        _proto.connectToChannel = function connectToChannel(id) {
          if (id === void 0) {
            id = "room:1";
          }

          if (this._socket.isConnected()) {
            var thisSelf = this;
            this._channel = this._socket.channel(id, {});

            this._channel.join().receive("ok", function (resp) {
              thisSelf.onJoinChannel(true);
            }).receive("error", function (resp) {
              thisSelf.onJoinChannel(false);
            });
          } else GameEvent.emit(GameEvent.LOGIN_RESULT, Define.ERR_ERROR, "Can't connect to channel for socket is not connected!");
        };

        _proto.close = function close() {
          this.closeChannel();

          if (this._socket != null) {
            this._socket.onOpen(null);

            this._socket.onClose(null);

            this._socket.onError(null);

            this._socket.onMessage(null);

            this._socket.close();

            this._socket = null;
          }
        };

        _proto.closeChannel = function closeChannel() {
          if (this._channel) {
            this._channel.leave();

            this._channel = null;
          }
        };

        _proto.addCallback = function addCallback(caller, onConnectedCb, onCloseCb, onErrorCb) {
          this._eventCaller = caller;
          this._onConnected = onConnectedCb;
          this._onSocketClose = onCloseCb;
          this._onSocketError = onErrorCb;
        };

        _proto.onMessage = function onMessage(event) {//this._recBuffer.writeArrayBuffer(event.data);
          //this._recBuffer.pos = 0;
          //if(this._recBuffer.bytesAvailable > 0){
          //	super.onPacketHander(this._recBuffer);
          //}
          //this._recBuffer.clear();
        };

        _proto.onOpen = function onOpen(event) {
          if (this._onConnected) {
            this._onConnected.call(this._eventCaller);
          }
        };

        _proto.onClose = function onClose(event) {
          if (this._onSocketClose) {
            this._onSocketClose.call(this._eventCaller);
          }
        };

        _proto.onError = function onError(event) {
          if (event === void 0) {
            event = null;
          }

          if (this._onSocketError) {
            this._onSocketError.call(this._eventCaller, event);
          }
        };

        _proto.onJoinChannel = function onJoinChannel(result) {
          if (result) {
            console.log("Joined channel successfully");
            this.onRegisterEntry(this._channel);
            this.sendPosition();
            GameEvent.emit(GameEvent.LOGIN_RESULT, Define.ERR_SUCCESS);
          } else GameEvent.emit(GameEvent.LOGIN_RESULT, Define.ERR_ERROR, "Unable to join channel");
        };

        _proto.sendPosition = function sendPosition() {
          var Placeable = _cjsExports.game.Placeable;
          var message = Placeable.create({
            id: "1",
            x: 1000,
            y: 1000,
            z: 200
          });
          var msg = Placeable.encode(message).finish();

          this._channel.push("placeable", {
            payload: encode(msg)
          }).receive("ok", function () {
            return console.log("push placeable message ok!");
          }).receive("error", function (reasons) {
            return console.log("push placeable message failed:%s", reasons);
          });
        };

        _createClass(Connection, [{
          key: "channel",
          get: function get() {
            return this._channel;
          }
        }]);

        return Connection;
      }());

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ControlScene.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ChatFrame.ts', './fairygui.mjs'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, _decorator, assetManager, Component, ChatFrame, GRoot, UIPackage;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      assetManager = module.assetManager;
      Component = module.Component;
    }, function (module) {
      ChatFrame = module.ChatFrame;
    }, function (module) {
      GRoot = module.GRoot;
      UIPackage = module.UIPackage;
    }],
    execute: function () {
      var _dec, _class;

      cclegacy._RF.push({}, "fdbe0fhG6dN4rU24r7yEBqA", "ControlScene", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var ControlScene = exports('default', (_dec = ccclass('ControlScene'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(ControlScene, _Component);

        function ControlScene() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _this._mainView = null;
          _this._chatFrame = null;
          return _this;
        }

        var _proto = ControlScene.prototype;

        _proto.onLoaded = function onLoaded(listener, caller) {
          var thisSelf = this;
          GRoot.create();
          assetManager.loadBundle("mainRes", function (err, bundle) {
            UIPackage.loadPackage(bundle, "ui/mainScene", function (error) {
              if (!error) {
                thisSelf.onLoadUI();
              }

              listener.call(caller, error);
            });
          });
        };

        _proto.onLoadUI = function onLoadUI() {
          var view = UIPackage.createObject("mainScene", "scene").asCom;
          GRoot.inst.addChild(view);
          view.makeFullScreen();
          this._mainView = view;
          var frame = view.getChild("chat");
          this._chatFrame = new ChatFrame(frame);
        };

        return ControlScene;
      }(Component)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Define.ts", ['cc'], function (exports) {
  'use strict';

  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "caa53EmBQBHNb/JqL8nB5FE", "Define", undefined);

      var _define = function _define() {
        this.ERR_ERROR = 0;
        this.ERR_SUCCESS = 1;
        this.ERR_TIMEOUT = 2;
        this.ERR_FAILED = -1;
      };

      var Define = exports('default', new _define());

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/FirstPersonCamera.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Quaternion.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Vec3, Component, Quaternion;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Vec3 = module.Vec3;
      Component = module.Component;
    }, function (module) {
      Quaternion = module.Quaternion;
    }],
    execute: function () {
      var _dec, _class, _class2, _descriptor, _descriptor2;

      cclegacy._RF.push({}, "9fbb9jvxB5A9oJL+eERqhx3", "FirstPersonCamera", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var FirstPersonCamera = exports('FirstPersonCamera', (_dec = ccclass('FirstPersonCamera'), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(FirstPersonCamera, _Component);

        function FirstPersonCamera() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "xAxisMin", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "xAxisMax", _descriptor2, _assertThisInitialized(_this));

          _this.angleX = 0;
          _this.angleY = 0;
          return _this;
        }

        var _proto = FirstPersonCamera.prototype;

        _proto.start = function start() {//systemEvent.on(Node.EventType.MOUSE_MOVE, this.MouseMove, this);
        };

        _proto.mouseMove = function mouseMove(e) {
          this.angleX -= e.movementX;
          this.angleY -= e.movementY;
          console.log(this.angleY);
          this.angleY = this.clamp(this.angleY, this.xAxisMin, this.xAxisMax);
          this.node.rotation = Quaternion.GetQuatFromAngle(new Vec3(this.angleY, this.angleX, 0));
        };

        _proto.clamp = function clamp(val, min, max) {
          if (val <= min) val = min;
          if (val >= max) val = max;
          return val;
        };

        return FirstPersonCamera;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "xAxisMin", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 140;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "xAxisMax", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 210;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/GameEvent.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, EventTarget;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      EventTarget = module.EventTarget;
    }],
    execute: function () {
      cclegacy._RF.push({}, "a6a84eU+lBPfJp8PV5/9aX4", "GameEvent", undefined);

      var MyEvent = /*#__PURE__*/function (_EventTarget) {
        _inheritsLoose(MyEvent, _EventTarget);

        function MyEvent() {
          var _this;

          _this = _EventTarget.call(this) || this;
          _this.ON_OWNER_LOCATION = "on_owner_location";
          _this.ON_SEND_CHAT_MSG = "on_send_chat_msg";
          _this.ON_CHAT_MESSAGE = "on_chat_message";
          _this.CONNECTION_ERROR = "net_connection_error";
          _this.CONNECTION_CLOSED = "net_connection_closed";
          _this.OPEN_MAIN_SCENE = "open_main_scene";
          _this.LOGIN_RESULT = "login_result";
          _this.GET_ROLE_RESULT = "get_role_result";
          _this.LOGIN_ROLE_SCENE = "login_role_scene";
          _this.ON_OWNER_INITED = "on_owner_inited";
          _this.ON_ROLE_CREATED = "on_role_created";
          _this.ON_ROLE_REMOVED = "on_role_removed";
          _this.ON_SCENE_CHANGED = "on_scene_changed";
          _this.ON_MOVE_FINISHED = "on_move_finished";
          _this.ON_OWNER_POSITION = "on_owner_position";
          return _this;
        } //system event define


        return MyEvent;
      }(EventTarget);

      var GameEvent = exports('default', new MyEvent());

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/GlobalNode.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GameEvent.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, _decorator, Component, GameEvent;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Component = module.Component;
    }, function (module) {
      GameEvent = module.default;
    }],
    execute: function () {
      var _class, _class2;

      cclegacy._RF.push({}, "19e52Ua92JOVZ66ggficTua", "GlobalNode", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var GlobalNode = exports('default', ccclass(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(GlobalNode, _Component);

        function GlobalNode() {
          return _Component.apply(this, arguments) || this;
        }

        GlobalNode.instance = function instance() {
          return GlobalNode._thisNode;
        };

        var _proto = GlobalNode.prototype;

        _proto.onLoad = function onLoad() {
          GlobalNode._thisNode = this;
        };

        _proto.onChatEnded = function onChatEnded() {
          GameEvent.emit(GameEvent.ON_SEND_CHAT_MSG);
        };

        return GlobalNode;
      }(Component), _class2._thisNode = null, _class2)) || _class);

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/main", ['./GameEvent.ts', './TheConfig.ts', './AppMain.ts', './poliyfill.ts', './Utf8.ts', './main.ts', './Base64.ts', './GlobalNode.ts', './Define.ts', './proto.mjs_cjs=&original=.js', './Connection.ts', './UserInfo.ts', './PeerConnection.ts', './ChatFrame.ts', './ControlScene.ts', './Quaternion.ts', './FirstPersonCamera.ts', './MainScene.ts', './MetaMask.ts', './SelectScene.ts', './StartScene.ts', './VectorTool.ts', './ThirdPersonCamera.ts'], function () {
  'use strict';

  return {
    setters: [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    execute: function () {}
  };
});

System.register("chunks:///_virtual/main.ts", ['cc', './poliyfill.ts'], function (exports) {
  'use strict';

  var cclegacy, isArray, isUint8Array, isArrayBuffer, MyLikeUint8array;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      isArray = module.isArray;
      isUint8Array = module.isUint8Array;
      isArrayBuffer = module.isArrayBuffer;
      MyLikeUint8array = module.MyLikeUint8array;
    }],
    execute: function () {
      exports({
        createDecode: createDecode,
        createEncode: createEncode
      });

      cclegacy._RF.push({}, "771c8HhRKNALYbqLBzNZpJz", "main", undefined);

      var BASE64_TABLE = exports('BASE64_TABLE', 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/');
      var PAD = exports('PAD', '=');

      function getPad(pad, table) {
        var _pad = String(pad || PAD);

        if (_pad.length !== 1) {
          throw new TypeError('The apd must be char');
        }

        if (~table.join('').indexOf(_pad)) {
          throw new TypeError('The table as _pad');
        }

        return _pad;
      }

      function getTable(table) {
        var _table;

        table = table || BASE64_TABLE;

        if (typeof table == 'string') {
          _table = table.split('');
        } else if (isArray(table)) {
          _table = Array.prototype.slice.call(table, 0);
        } else {
          throw new TypeError("The \"table\" must be Array or a String.");
        }

        checkTable(_table);
        return _table;
      }

      function checkTable(table) {
        if (table.length < 64) {
          throw new TypeError('The length of "table" is not 64!');
        }

        for (var i = 0; i < 64; i++) {
          var _char = table[i];

          if (_char.length != 1) {
            throw new TypeError("table item \"" + _char + "\" must be a single character");
          }

          for (var k = i + 1; k < 64; k++) {
            if (_char == table[k]) {
              throw new TypeError("Code table character \"" + _char + "\" is repeated");
            }
          }
        }
      }
      /**
       * 创建Base64编码函数
       *
       * @param {Function} strEncode // 字符串编函数
       * @returns {(input: any) => string}
       */


      function createEncode(table, pad, strEncode) {
        if (typeof table == 'function') {
          strEncode = table;
          table = undefined;
          pad = undefined;
        }

        var TABLE = getTable(table);
        var PAD = getPad(pad, TABLE);
        return function (input) {
          var _u8arr;

          if (isArray(input) || isUint8Array(input)) {
            _u8arr = input;
          } else if (isArrayBuffer(input)) {
            _u8arr = new Uint8Array(input);
          } else if (typeof strEncode == 'function') {
            // 其它都当成 string 处理
            _u8arr = strEncode(String(input));
          } else {
            // 未初始化 strEncode 函数则不支持string类型
            throw TypeError("Input type is not supported, \"strEncode\" is not function");
          }

          var base64 = '';

          var _l = _u8arr.length % 3;

          var padLength = _l ? _l === 2 ? 1 : 2 : 0;
          var loopLength = _u8arr.length - _l;
          var a0,
              a1,
              a2,
              i = 0;

          while (i < loopLength) {
            a0 = _u8arr[i++];
            a1 = _u8arr[i++];
            a2 = _u8arr[i++];
            base64 = base64 + TABLE[a0 >> 2] + TABLE[(a0 << 4 | a1 >> 4) & 0x3f] + TABLE[(a1 << 2 | a2 >> 6) & 0x3f] + TABLE[a2 & 0x3f];
          }

          if (padLength) {
            a0 = _u8arr[i++];
            a1 = _u8arr[i++] || 0;
            base64 = base64 + TABLE[a0 >> 2] + TABLE[(a0 << 4 | a1 >> 4) & 0x3f] + (padLength === 2 ? PAD + PAD : TABLE[a1 << 2 & 0x3f] + PAD);
          }

          return base64;
        };
      }
      /**
       * 创建Base64解码函数
       *
       * @param {Function} strDecode
       * @returns {((base64str: string) => Uint8Array | number[])}
       */


      function createDecode(table, pad, strDecode) {
        if (typeof table == 'function') {
          strDecode = table;
          table = undefined;
          pad = undefined;
        }

        var TABLE = getTable(table);
        var PAD = getPad(pad, TABLE);
        var TABLE_JOIN = TABLE.join('');

        var _strDecode,
            toString = typeof strDecode == 'function' ? (_strDecode = strDecode, function () {
          return _strDecode(this);
        }) : null;

        var getV = function getV(_char2) {
          var index = TABLE_JOIN.indexOf(_char2);
          if (index == -1) throw new TypeError("\"" + _char2 + "\" not base64 char");
          return index;
        };

        var getPads = function getPads(base64Str) {
          var index = base64Str.length;
          var pads = 0;

          while (index-- > 0 && base64Str.charAt(index) === PAD) {
            pads++;
          }

          return pads;
        }; // const padreg = new RegExp(`${pad}*$`);


        return function (base64Str) {
          // base64Str = base64Str.trim();
          var length = base64Str.length;
          var indexMax = length - getPads(base64Str);
          var mc4 = indexMax % 4;
          if (mc4 === 1) throw new TypeError('The parameter is not a base64 string!');
          var buffer = new MyLikeUint8array(Math.floor(indexMax * 6 / 8));
          var index = 0;
          var i = 0;

          var next = function next() {
            return getV(base64Str.charAt(i++));
          };

          for (var loopLength = indexMax - mc4; i < loopLength;) {
            var _ref = [next(), next(), next(), next()],
                c0 = _ref[0],
                c1 = _ref[1],
                c2 = _ref[2],
                c3 = _ref[3];
            buffer[index++] = (c0 << 2 | c1 >> 4) & 0xff;
            buffer[index++] = (c1 << 4 | c2 >> 2) & 0xff;
            buffer[index++] = (c2 << 6 | c3) & 0xff;
          }

          if (mc4) {
            var _c;

            buffer[index++] = (next() << 2 | (_c = next()) >> 4) & 0xff;

            if (mc4 === 3) {
              buffer[index++] = (_c << 4 | next() >> 2) & 0xff;
            }
          } // 复写toString以UTF8编码输出;


          toString && (buffer.toString = toString);
          return buffer;
        };
      } // const __esModule = true;


      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/MainScene.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ControlScene.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, _decorator, ControlScene;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
    }, function (module) {
      ControlScene = module.default;
    }],
    execute: function () {
      var _dec, _class;

      cclegacy._RF.push({}, "d76a8ltMJBFULGM0R+1BHvH", "MainScene", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var MainScene = exports('MainScene', (_dec = ccclass('MainScene'), _dec(_class = /*#__PURE__*/function (_ControlScene) {
        _inheritsLoose(MainScene, _ControlScene);

        function MainScene() {
          return _ControlScene.apply(this, arguments) || this;
        }

        var _proto = MainScene.prototype;

        _proto.onLoad = function onLoad() {
          _ControlScene.prototype.onLoaded.call(this, this.onLoadFinish, this);
        };

        _proto.onLoadFinish = function onLoadFinish(error) {
          console.log("MainScene onLoadFinish for %s", error);
        };

        return MainScene;
      }(ControlScene)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/MetaMask.ts", ['cc'], function (exports) {
  'use strict';

  var cclegacy, _decorator;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
    }],
    execute: function () {
      var _dec, _class;

      cclegacy._RF.push({}, "3786eE4/k9O7K60i8wO8fMO", "MetaMask", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var MetaMask = exports('default', (_dec = ccclass('MetaMask'), _dec(_class = /*#__PURE__*/function () {
        function MetaMask() {}

        MetaMask.isInstalled = function isInstalled() {
          var _window = window,
              ethereum = _window.ethereum;
          return Boolean(ethereum && ethereum.isMetaMask);
        };

        var _proto = MetaMask.prototype;

        _proto.connectMetaMask = function connectMetaMask(caller, listener) {
          if (MetaMask.isInstalled()) {
            window.ethereum.request({
              method: 'eth_requestAccounts'
            }).then(function (accounts) {
              var account = accounts[0];
              listener.call(caller, 1, account);
            })["catch"](function (error) {
              listener.call(caller, 0, error);
            });
          } else listener.call(caller, 0, "MetaMask is not installed!");
        };

        return MetaMask;
      }()) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/PeerConnection.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GameEvent.ts', './Base64.ts', './proto.js', './proto.mjs_cjs=&original=.js', './Connection.ts', './UserInfo.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, _assertThisInitialized, cclegacy, GameEvent, encode, decode, _cjsExports, Connection, UserInfo;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      GameEvent = module.default;
    }, function (module) {
      encode = module.encode;
      decode = module.decode;
    }, function (module) {
      _cjsExports = module.default;
    }, null, function (module) {
      Connection = module.default;
    }, function (module) {
      UserInfo = module.default;
    }],
    execute: function () {
      cclegacy._RF.push({}, "1af313Tuf1F3pa/zyrmnbar", "PeerConnection", undefined);

      var PeerConnection = exports('default', /*#__PURE__*/function (_Connection) {
        _inheritsLoose(PeerConnection, _Connection);

        PeerConnection.instance = function instance() {
          return PeerConnection._instance;
        };

        function PeerConnection() {
          var _this;

          _this = _Connection.call(this) || this;
          PeerConnection._instance = _assertThisInitialized(_this);

          _Connection.prototype.addCallback.call(_assertThisInitialized(_this), _assertThisInitialized(_this), _this.onConnected, _this.onConnectionClosed, _this.onConnectionError);

          return _this;
        }

        var _proto = PeerConnection.prototype;

        _proto.onRegisterEntry = function onRegisterEntry(channel) {
          this.registerCommandEntry(channel, "placeables", this, this.msgPosition);
          this.registerCommandEntry(channel, "messages", this, this.msgChat);
        };

        _proto.registerCommandEntry = function registerCommandEntry(channel, command, caller, listener) {
          channel.on(command, function (resp) {
            listener.call(caller, resp.data);
          });
        };

        _proto.onConnected = function onConnected() {
          console.log("Connect to server successed!");
          this.connectToChannel();
        };

        _proto.onConnectionClosed = function onConnectionClosed() {
          GameEvent.emit(GameEvent.CONNECTION_CLOSED);
        };

        _proto.onConnectionError = function onConnectionError(event) {
          GameEvent.emit(GameEvent.CONNECTION_ERROR, event);
          console.log("Connection error:");
          console.log(event);
        };

        _proto.login = function login(httpUrl, wsUrl, account) {
          var thisSelf = this;

          _Connection.prototype.httpConnect.call(this, httpUrl, account, this, function (result, token) {
            console.log("http login result=%d, token&msg=%s", result, token);

            if (result == 1) {
              UserInfo.account = account; //save the account;

              UserInfo.token = token; //save the account;

              thisSelf.connect(wsUrl, token);
            }
          });
        };

        _proto.sendChat = function sendChat(text) {
          if (this.channel) {
            var Message = _cjsExports.game.Message;
            var message = Message.create({
              id: "1",
              nickname: UserInfo.account,
              data: text
            });
            var msg = Message.encode(message).finish();
            this.channel.push("talk", {
              payload: encode(msg)
            }).receive("ok", function () {
              return console.log("push chat message ok!");
            }).receive("error", function (reasons) {
              return console.log("push chat message failed:%s", reasons);
            });
          }
        };

        _proto.msgKeepAlive = function msgKeepAlive(buffer) {
          console.log("keep alive " + new Date(Date.now()).toLocaleTimeString());
        };

        _proto.msgPosition = function msgPosition(data) {
          var Placeables = _cjsExports.game.Placeables;
          var placeables = Placeables.decode(decode(data));
          console.log(placeables);
        };

        _proto.msgChat = function msgChat(data) {
          var Messages = _cjsExports.game.Messages;
          var messages = Messages.decode(decode(data));
          var result = messages.result;
          var length = result.length;

          for (var i = 0; i < length; i++) {
            var thisMsg = result[i];
            GameEvent.emit(GameEvent.ON_CHAT_MESSAGE, thisMsg.nickname, thisMsg.data);
          }
        };

        return PeerConnection;
      }(Connection));
      PeerConnection._instance = null;

      var _peerConnection = new PeerConnection();

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/poliyfill.ts", ['cc'], function (exports) {
  'use strict';

  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "691c2vR19hOL4UdwEQDxJrT", "poliyfill", undefined); // 手动 poliyfill 以最小的代码量兼容IE6(ES3);
      // const emptyFn = function(){};


      var isArray = exports('isArray', Array.isArray || function (obj) {
        return Object.prototype.toString.call(obj) == '[object Array]';
      });
      var hasArrayBuffer = exports('hasArrayBuffer', typeof ArrayBuffer === 'function'); // export const MyArrayBuffer = hasArrayBuffer ? ArrayBuffer : emptyFn;
      // export const MyUint8Array = hasArrayBuffer ? Uint8Array : emptyFn;

      var MyLikeUint8array = exports('MyLikeUint8array', hasArrayBuffer ? Uint8Array : Array); // export const myUint8arrayClass = hasArrayBuffer ? Uint8Array : Array;
      // export const getUint8Array = hasArrayBuffer
      // 	? function(arg: any) {
      // 			return new Uint8Array(arg);
      // 	  }
      // 	: function(arg: any) {
      // 			return typeof arg === 'number' ? new Array(arg) : arg;
      // 	  };

      var isUint8Array = exports('isUint8Array', function isUint8Array(obj) {
        return hasArrayBuffer && obj instanceof Uint8Array;
      });
      var isArrayBuffer = exports('isArrayBuffer', function isArrayBuffer(obj) {
        return hasArrayBuffer && obj instanceof ArrayBuffer;
      });

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Quaternion.ts", ['cc'], function (exports) {
  'use strict';

  var cclegacy, _decorator, Quat, Vec3;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Quat = module.Quat;
      Vec3 = module.Vec3;
    }],
    execute: function () {
      cclegacy._RF.push({}, "238e61toWRI0L+o+lcDX3MY", "Quaternion", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var Quaternion = exports('Quaternion', /*#__PURE__*/function () {
        function Quaternion() {}

        Quaternion.rotateY = function rotateY(_node, _angle) {
          var _quat = new Quat();

          _node.rotation = Quat.rotateY(_quat, _node.rotation, _angle * this.Deg2Rad);
          return _quat;
        };

        Quaternion.RotateX = function RotateX(_node, _angle) {
          var _quat = new Quat();

          _node.rotation = Quat.rotateX(_quat, _node.rotation, _angle * this.Deg2Rad);
          return _quat;
        };

        Quaternion.RotateZ = function RotateZ(_node, _angle) {
          var _quat = new Quat();

          _node.rotation = Quat.rotateZ(_quat, _node.rotation, _angle * this.Deg2Rad);
          return _quat;
        };

        Quaternion.RotateAround = function RotateAround(_targetQuat, axis, _angle) {
          var _quat = new Quat();

          Quat.rotateAround(_quat, _targetQuat, axis, _angle * this.Deg2Rad);
          return _quat;
        };

        Quaternion.RotateAroundLocal = function RotateAroundLocal(_targetQuat, axis, _angle) {
          var _quat = new Quat();

          Quat.rotateAroundLocal(_quat, _targetQuat, axis, _angle * this.Deg2Rad);
          return _quat;
        };

        Quaternion.RotationAroundNode = function RotationAroundNode(self, pos, axis, angle) {
          var _quat = new Quat();

          var v1 = new Vec3();
          var v2 = new Vec3();
          var pos2 = self.position;
          var rad = angle * this.Deg2Rad;
          Quat.fromAxisAngle(_quat, axis, rad);
          Vec3.subtract(v1, pos2, pos);
          Vec3.transformQuat(v2, v1, _quat);
          self.position = Vec3.add(v2, pos, v2);
          Quat.rotateAround(_quat, self.rotation, axis, rad);
          return _quat;
        };

        Quaternion.GetEulerFromQuat = function GetEulerFromQuat(_quat) {
          var angle = Quat.toEuler(new Vec3(), _quat, true);
          return angle;
        };

        Quaternion.GetQuatFromAngle = function GetQuatFromAngle(_angle) {
          var _quat = Quat.fromEuler(new Quat(), _angle.x, _angle.y, _angle.z);

          return _quat;
        };

        Quaternion.Lerp = function Lerp(_a, _b, _t) {
          var _quat = new Quat();

          Quat.lerp(_quat, _a, _b, _t);
          return _quat;
        };

        Quaternion.Slerp = function Slerp(_a, _b, _t) {
          var _quat = new Quat();

          Quat.slerp(_quat, _a, _b, _t);
          return _quat;
        };

        Quaternion.LookRotation = function LookRotation(_forward, _upwards) {
          if (_upwards === void 0) {
            _upwards = Vec3.UP;
          }

          var _quat = new Quat();

          Vec3.normalize(_forward, _forward);
          Quat.fromViewUp(_quat, _forward, _upwards);
          return _quat;
        };

        return Quaternion;
      }());
      Quaternion.Deg2Rad = Math.PI / 180;

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/SelectScene.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './fairygui.mjs'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, _decorator, Component, GRoot, UIPackage;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Component = module.Component;
    }, function (module) {
      GRoot = module.GRoot;
      UIPackage = module.UIPackage;
    }],
    execute: function () {
      var _dec, _class;

      cclegacy._RF.push({}, "f6865kwf7pCvKOnKFyB86Jf", "SelectScene", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var SelectScene = exports('SelectScene', (_dec = ccclass('SelectScene'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(SelectScene, _Component);

        function SelectScene() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _this._mainView = null;
          return _this;
        }

        var _proto = SelectScene.prototype;

        _proto.start = function start() {
          console.log("SelectScene loading!");
          GRoot.create();
          UIPackage.loadPackage("ui/select", this.onLoadUI.bind(this));
        };

        _proto.onLoadUI = function onLoadUI(err) {
          var view = UIPackage.createObject("select", "selectScene").asCom;
          GRoot.inst.addChild(view);
          view.makeFullScreen();
          this._mainView = view;
        };

        return SelectScene;
      }(Component)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/StartScene.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GameEvent.ts', './TheConfig.ts', './Define.ts', './PeerConnection.ts', './fairygui.mjs', './MetaMask.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, _decorator, Component, GameEvent, TheConfig, Define, PeerConnection, GRoot, UIPackage, MetaMask;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Component = module.Component;
    }, function (module) {
      GameEvent = module.default;
    }, function (module) {
      TheConfig = module.default;
    }, function (module) {
      Define = module.default;
    }, function (module) {
      PeerConnection = module.default;
    }, function (module) {
      GRoot = module.GRoot;
      UIPackage = module.UIPackage;
    }, function (module) {
      MetaMask = module.default;
    }],
    execute: function () {
      var _dec, _class;

      cclegacy._RF.push({}, "5f53eQqxdZOZaFlGxafGFxX", "StartScene", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var StartScene = exports('StartScene', (_dec = ccclass('StartScene'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(StartScene, _Component);

        function StartScene() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _this._mainView = null;
          return _this;
        }

        var _proto = StartScene.prototype;

        _proto.start = function start() {
          console.log("StartScene loading!");
          GRoot.create();
          UIPackage.loadPackage("ui/login", this.onLoadUI.bind(this));
        };

        _proto.onLoadUI = function onLoadUI(err) {
          var view = UIPackage.createObject("login", "startScene").asCom;
          GRoot.inst.addChild(view);
          view.makeFullScreen();
          this._mainView = view;
          GameEvent.on(GameEvent.LOGIN_RESULT, this.onLoginResult, this);
          view.getChild("startBtn").onClick(this.onStart, this);
        };

        _proto.onDestroy = function onDestroy() {
          console.log("StartScene onDestroy!");
        };

        _proto.onStart = function onStart() {
          console.log("StartScene onStart!");
          this._mainView.getChild("startBtn").enabled = false; //this.onLoginResult(Define.ERR_SUCCESS);
          //return;

          var metaMask = new MetaMask();
          metaMask.connectMetaMask(this, function (result, response) {
            if (result == 1) {
              var randomString = function randomString(length) {
                if (length === void 0) {
                  length = 10;
                }

                var t = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678";
                var a = t.length;
                var result = "";

                for (var i = 0; i < length; i++) {
                  result += t.charAt(Math.floor(Math.random() * a));
                }

                return result;
              };

              console.log("Get MetaMask account=%s", response);
              response = randomString();
              console.log("For testing, account change to=%s", response);
              var peerConnection = PeerConnection.instance();
              peerConnection.login(TheConfig.httpUrl, TheConfig.wsUrl, response);
            } else console.error("connect MetaMask failed for: %s", response);
          });
        };

        _proto.onLoginResult = function onLoginResult(result, msg) {
          if (result == Define.ERR_SUCCESS) {
            console.log("StartScene --> 登录成功!");
            GameEvent.emit(GameEvent.OPEN_MAIN_SCENE, this, function (step) {
              console.log("loading main scene %d", step * 100);
            });
          } else {
            this._mainView.getChild("startBtn").enabled = true;
            console.log("StartScene --> 登录失败:%s", msg);
          }
        };

        return StartScene;
      }(Component)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/TheConfig.ts", ['cc'], function (exports) {
  'use strict';

  var cclegacy, resources;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      resources = module.resources;
    }],
    execute: function () {
      cclegacy._RF.push({}, "39751K4ZuBFaY21we9lbgcr", "TheConfig", undefined);

      var GameConfig = /*#__PURE__*/function () {
        function GameConfig() {
          this._configList = {};
        }

        var _proto = GameConfig.prototype;

        _proto.getRes = function getRes(name) {
          return this._configList[name];
        };

        _proto.setRes = function setRes(names, res) {
          for (var i = 0; i < names.length; ++i) {
            this._configList[names[i]] = res[i];
          }
        };

        _proto.releaseRes = function releaseRes() {
          var cfgs = Object.keys(this._configList);

          for (var _i = 0, _cfgs = cfgs; _i < _cfgs.length; _i++) {
            var name = _cfgs[_i];
            resources.release(name);
          }

          this._configList = {};
        };

        return GameConfig;
      }();

      var TheConfig = exports('default', /*#__PURE__*/function () {
        function TheConfig() {}

        TheConfig.startSceneBk = function startSceneBk() {
          return "backgr/start.png";
        };

        TheConfig.roleConfig = function roleConfig() {
          return "gameCfg/main/roleCfg";
        };

        TheConfig.sceneCfg = function sceneCfg() {
          return "gameCfg/main/sceneCfg";
        };

        TheConfig.selectResList = function selectResList() {
          var resList = [];
          return resList;
        };

        TheConfig.mainResList = function mainResList() {
          var resList = [//this.roleConfig(),            
            //this.sceneCfg(),
          ];
          return resList;
        };

        TheConfig.getSceneCfg = function getSceneCfg(id) {
          var config = TheConfig.mainCfg.getRes(this.sceneCfg()).json;
          return config[id.toString()];
        };

        return TheConfig;
      }());
      TheConfig.httpUrl = "http://13.231.210.240:4000/login";
      TheConfig.wsUrl = "ws://13.231.210.240:4000/socket";
      TheConfig.selectCfg = new GameConfig();
      TheConfig.mainCfg = new GameConfig();

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ThirdPersonCamera.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Quaternion.ts', './VectorTool.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _createClass, cclegacy, _decorator, Node, Enum, Vec3, Quat, Component, Quaternion, VectorTool;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      Enum = module.Enum;
      Vec3 = module.Vec3;
      Quat = module.Quat;
      Component = module.Component;
    }, function (module) {
      Quaternion = module.Quaternion;
    }, function (module) {
      VectorTool = module.VectorTool;
    }],
    execute: function () {
      exports('ThirdPersonCameraType', void 0);

      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6;

      cclegacy._RF.push({}, "fd93cDT/QFFLrDn2kEEukQA", "ThirdPersonCamera", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var ThirdPersonCameraType;

      (function (ThirdPersonCameraType) {
        ThirdPersonCameraType[ThirdPersonCameraType["Follow"] = 0] = "Follow";
        ThirdPersonCameraType[ThirdPersonCameraType["FollowTrackRotation"] = 1] = "FollowTrackRotation";
        ThirdPersonCameraType[ThirdPersonCameraType["FollowIndependentRotation"] = 2] = "FollowIndependentRotation";
      })(ThirdPersonCameraType || (ThirdPersonCameraType = exports('ThirdPersonCameraType', {})));

      var ThirdPersonCamera = exports('ThirdPersonCamera', (_dec = ccclass('ThirdPersonCamera'), _dec2 = property(Node), _dec3 = property(Node), _dec4 = property({
        type: Enum(ThirdPersonCameraType)
      }), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(ThirdPersonCamera, _Component);

        function ThirdPersonCamera() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "target", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "lookAt", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "cameraType", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "positionOffset", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "moveSmooth", _descriptor5, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "rotateSmooth", _descriptor6, _assertThisInitialized(_this));

          _this.MouseX = 0;
          _this.MouseY = 0;
          _this._forward = new Vec3();
          _this._right = new Vec3();
          _this._up = new Vec3();
          _this.angle = null;
          _this.isDown = false;
          _this.velocity = new Vec3();
          _this.forwardView = new Vec3();
          return _this;
        }

        var _proto = ThirdPersonCamera.prototype;

        _proto.start = function start() {
          //systemEvent.on(Node.EventType.MOUSE_DOWN, this.MouseDown, this);
          //systemEvent.on(Node.EventType.MOUSE_MOVE, this.MouseMove, this);
          //systemEvent.on(Node.EventType.MOUSE_UP, this.MouseUp, this);
          this.cameraType == ThirdPersonCameraType.Follow && this.node.lookAt(this.target.worldPosition);
        };

        _proto.mouseDown = function mouseDown(e) {
          this.isDown = true;
        };

        _proto.mouseMove = function mouseMove(e) {
          if (this.cameraType == ThirdPersonCameraType.FollowIndependentRotation) {
            this.setIndependentRotation(e);
          }
        };

        _proto.mouseUp = function mouseUp(e) {
          this.isDown = false;
        };

        _proto.update = function update(dt) {
          if (this.target) {
            switch (this.cameraType) {
              case ThirdPersonCameraType.Follow:
                this.setFollow();
                break;

              case ThirdPersonCameraType.FollowTrackRotation:
                this.setFollowTrackRotation();
                break;

              case ThirdPersonCameraType.FollowIndependentRotation:
                this.setMove();
                break;
            }
          }
        };

        _proto.setFollow = function setFollow() {
          var temp = new Vec3();
          var tem0 = new Vec3(0, this.positionOffset.y, this.positionOffset.z);
          Vec3.add(temp, this.lookAt.worldPosition, tem0);
          this.node.position = this.node.position.lerp(temp, this.moveSmooth);
        };

        _proto.setFollowTrackRotation = function setFollowTrackRotation() {
          var u = Vec3.multiplyScalar(new Vec3(), Vec3.UP, this.positionOffset.y);
          var f = Vec3.multiplyScalar(new Vec3(), this.target.forward, this.positionOffset.z);
          var pos = Vec3.add(new Vec3(), this.target.position, u);
          Vec3.add(pos, pos, f);
          this.node.position = VectorTool.SmoothDampV3(this.node.position, pos, this.velocity, this.moveSmooth, 100000, 0.02);
          this.forwardView = Vec3.subtract(this.forwardView, this.node.position, this.target.getWorldPosition());
          this.node.lookAt(this.target.worldPosition);
        };

        _proto.setMove = function setMove() {
          this._forward = new Vec3();
          this._right = new Vec3();
          this._up = new Vec3();
          Vec3.transformQuat(this._forward, Vec3.FORWARD, this.node.rotation);

          this._forward.multiplyScalar(this.positionOffset.z);

          var desiredPos = new Vec3();
          desiredPos = desiredPos.add(this.lookAt.worldPosition).subtract(this._forward).add(this._right).add(this._up);
          this.node.position = this.node.position.lerp(desiredPos, this.moveSmooth);
        };

        _proto.setIndependentRotation = function setIndependentRotation(e) {
          var radX = -e.movementX;
          var radY = -e.movementY;

          var _quat = new Quat();

          var _right = Vec3.transformQuat(this._right, Vec3.RIGHT, this.node.rotation);

          _quat = Quaternion.RotationAroundNode(this.node, this.target.position, _right, radY);
          this.angle = Quaternion.GetEulerFromQuat(_quat);
          this.angle.x = this.angle.x > 0 ? this.clamp(this.angle.x, 120, 180) : this.clamp(this.angle.x, -180, -170);
          Quat.fromEuler(_quat, this.angle.x, this.angle.y, this.angle.z);
          this.node.setWorldRotation(_quat);
          _quat = Quaternion.RotationAroundNode(this.node, this.target.position, Vec3.UP, radX);
          this.node.setWorldRotation(_quat);
          this.angle = Quaternion.GetEulerFromQuat(_quat);
          this.MouseX = this.angle.y;
          this.MouseY = this.angle.x;
        };

        _proto.clamp = function clamp(val, min, max) {
          if (val <= min) val = min;else if (val >= max) val = max;
          return val;
        };

        _createClass(ThirdPersonCamera, [{
          key: "type",
          get: function get() {
            return this.cameraType;
          }
        }]);

        return ThirdPersonCamera;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "target", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "lookAt", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "cameraType", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return ThirdPersonCameraType.Follow;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "positionOffset", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new Vec3(0, 120, 200);
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "moveSmooth", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0.02;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "rotateSmooth", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0.03;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/UserInfo.ts", ['cc'], function (exports) {
  'use strict';

  var cclegacy, _decorator;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
    }],
    execute: function () {
      cclegacy._RF.push({}, "53832rpzCFEU6ZpXgEI0tMb", "UserInfo", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;

      var _UserInfo = function _UserInfo() {
        this.account = null;
        this.token = null;
      };

      var UserInfo = exports('default', new _UserInfo());

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Utf8.ts", ['cc', './poliyfill.ts'], function (exports) {
  'use strict';

  var cclegacy, isArray, isUint8Array, isArrayBuffer;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      isArray = module.isArray;
      isUint8Array = module.isUint8Array;
      isArrayBuffer = module.isArrayBuffer;
    }],
    execute: function () {
      exports({
        utf8Decode: utf8Decode,
        utf8Encode: utf8Encode
      });

      cclegacy._RF.push({}, "fb881yqUotN747Fb0cFjDK1", "Utf8", undefined);

      var ERR_CODE = "\uFFFD";
      /**
       * 字符串utf8编码
       *
       * @param {string} str
       * @returns
       */

      function utf8Encode(str) {
        str = String(str);
        var bf = [];
        var length = str.length;

        var add = function add(codePoint) {
          if (codePoint < 0x80) {
            return bf.push(codePoint);
          }

          if (codePoint < 0x800) {
            return bf.push(0xc0 | codePoint >> 6, 0x80 | codePoint & 0x3f);
          }

          if (codePoint < 0x10000) {
            return bf.push(0xe0 | codePoint >> 12, 0x80 | codePoint >> 6 & 0x3f, 0x80 | codePoint & 0x3f);
          }

          if (codePoint < 0x200000) {
            return bf.push(0xf0 | codePoint >> 18, 0x80 | codePoint >> 12 & 0x3f, 0x80 | codePoint >> 6 & 0x3f, 0x80 | codePoint & 0x3f);
          } // 肯定不会用到的 注释掉 减少打包代码量
          // if (codePoint < 0x4000000) {
          // 	return bf.push(
          // 		0xf8 | (codePoint >> 24),
          // 		0x80 | ((codePoint >> 18) & 0x3f),
          // 		0x80 | ((codePoint >> 12) & 0x3f),
          // 		0x80 | ((codePoint >> 6) & 0x3f),
          // 		0x80 | (codePoint & 0x3f)
          // 	);
          // }
          // return bf.push(
          // 	0xfc | (codePoint >> 30),
          // 	0x80 | ((codePoint >> 24) & 0x3f),
          // 	0x80 | ((codePoint >> 18) & 0x3f),
          // 	0x80 | ((codePoint >> 12) & 0x3f),
          // 	0x80 | ((codePoint >> 6) & 0x3f),
          // 	0x80 | (codePoint & 0x3f)
          // );

        };

        for (var i = 0; i < length; i++) {
          var code = str.charCodeAt(i);
          var cod1 = void 0;

          if (code < 0xd800 || code > 0xdfff) {
            add(code);
          } else if (code < 0xdc00 && (cod1 = str.charCodeAt(i + 1)) >= 0xdc00 && cod1 < 0xe000) {
            //四字节字符处理
            i++;
            add(0x10000 + ((code & 0x3ff) << 10 | cod1 & 0x3ff));
          } else {
            //不自行处理 不正常编码
            add(code);
          }
        }

        return bf;
      }
      /**
       * buffer以utf8转字符串
       *
       * @param {(ArrayBuffer | Uint8Array | number[])} buffer
       * @returns {string}
       */


      function utf8Decode(buffer) {
        var u8;
        var str = '';
        var index = 0;

        if (isArray(buffer) || isUint8Array(buffer)) {
          u8 = buffer;
        } else if (isArrayBuffer(buffer)) {
          u8 = new Uint8Array(buffer);
        } else {
          return String(buffer);
        }

        while (index < u8.length) {
          var c0 = u8[index++];

          if (c0 < 0x80) {
            str += String.fromCharCode(c0);
          } else if (c0 < 0xc2 || c0 > 0xfd) {
            //  多字节 `u+0080` 转第一位最小值是 1100 0010 , 0000 0000
            //  多字节 第一字节 最大位是 `1111 1101`
            // throw 'code err';
            str += ERR_CODE;
            continue;
          } else {
            var _i = index;
            var code = 0;
            var n = 0;

            if (c0 < 0xe0) {
              code |= (c0 & 31) << 6;
              n = 1;
            } else if (c0 < 0xf0) {
              n = 2;
              code |= (c0 & 15) << 12;
            } else if (c0 < 0xf8) {
              n = 3;
              code |= (c0 & 7) << 18;
            } else if (c0 < 0xfc) {
              n = 4;
              code |= (c0 & 3) << 24;
            } else {
              n = 5;
              code |= (c0 & 1) << 30;
            }

            while (n--) {
              var c = u8[_i++];

              if (c >> 6 != 2) {
                code = -1;
                break;
              }

              code |= (c & 0x3f) << n * 6;
            } // Unicode -> Utf16


            if (code > 0xffff) {
              var _code = code - 0x10000;

              str += String.fromCharCode(0xd800 | _code >> 10);
              str += String.fromCharCode(0xdc00 | _code & 0x3ff);
            } else if (code > 0) {
              str += String.fromCharCode(code);
            } else {
              str += ERR_CODE;
              continue;
            }

            index = _i;
          }
        }

        return str;
      }

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/VectorTool.ts", ['cc'], function (exports) {
  'use strict';

  var cclegacy, _decorator, Vec3;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Vec3 = module.Vec3;
    }],
    execute: function () {
      cclegacy._RF.push({}, "46716t32ZNDnZId2P87MaV7", "VectorTool", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var VectorTool = exports('VectorTool', /*#__PURE__*/function () {
        function VectorTool() {}

        VectorTool.SmoothDampV3 = function SmoothDampV3(current, target, currentVelocity, smoothTime, maxSpeed, deltaTime) {
          var outputX = 0;
          var outputY = 0;
          var outputZ = 0;
          smoothTime = Math.max(0.0001, smoothTime);
          var omega = 2 / smoothTime;
          var x = omega * deltaTime;
          var exp = 1 / (1 + x + 0.48 * x * x + 0.235 * x * x * x);
          var changX = current.x - target.x;
          var changY = current.y - target.y;
          var changZ = current.z - target.z;
          var originalTo = target;
          var maxChange = maxSpeed * smoothTime;
          var maxChangeSq = maxChange * maxChange;
          var sqrmag = changX * changX + changY * changY + changZ * changZ;

          if (sqrmag > maxChangeSq) {
            var mag = Math.sqrt(sqrmag);
            changX = changX / mag * maxChangeSq;
            changY = changY / mag * maxChangeSq;
            changZ = changZ / mag * maxChangeSq;
          }

          target.x = current.x - changX;
          target.y = current.y - changY;
          target.z = current.z - changZ;
          var tempX = (currentVelocity.x + omega * changX) * deltaTime;
          var tempY = (currentVelocity.y + omega * changY) * deltaTime;
          var tempZ = (currentVelocity.z + omega * changZ) * deltaTime;
          currentVelocity.x = (currentVelocity.x - omega * tempX) * exp;
          currentVelocity.y = (currentVelocity.y - omega * tempY) * exp;
          currentVelocity.z = (currentVelocity.z - omega * tempZ) * exp;
          outputX = target.x + (changX + tempX) * exp;
          outputY = target.y + (changY + tempY) * exp;
          outputZ = target.z + (changZ + tempZ) * exp;
          var origMinusCurrentX = originalTo.x - current.x;
          var origMinusCurrentY = originalTo.y - current.y;
          var origMinusCurrentZ = originalTo.z - current.z;
          var outMinusOrigX = outputX - originalTo.x;
          var outMinusOrigY = outputY - originalTo.y;
          var outMinusOrigZ = outputZ - originalTo.z;

          if (origMinusCurrentX * outMinusOrigX + origMinusCurrentY * outMinusOrigY + origMinusCurrentZ * outMinusOrigZ > 0) {
            outputX = originalTo.x;
            outputY = originalTo.y;
            outputZ = originalTo.z;
            currentVelocity.x = (outputX - originalTo.x) / deltaTime;
            currentVelocity.y = (outputY - originalTo.y) / deltaTime;
            currentVelocity.z = (outputZ - originalTo.z) / deltaTime;
          }

          return new Vec3(outputX, outputY, outputZ);
        };

        VectorTool.SmoothDamp = function SmoothDamp(current, target, currentVelocity, smoothTime, maxSpeed, deltaTime) {
          smoothTime = Math.max(0.0001, smoothTime);
          var num = 2 / smoothTime;
          var num2 = num * deltaTime;
          var num3 = 1 / (1 + num2 + 0.48 * num2 * num2 + 0.235 * num2 * num2 * num2);
          var num4 = current - target;
          var num5 = target;
          var num6 = maxSpeed * smoothTime;
          num4 = VectorTool.Clamp(num4, -num6, num6);
          target = current - num4;
          var num7 = (currentVelocity + num * num4) * deltaTime;
          currentVelocity = (currentVelocity - num * num7) * num3;
          var num8 = target + (num4 + num7) * num3;

          if (num5 - current > 0 == num8 > num5) {
            num8 = num5;
            currentVelocity = (num8 - num5) / deltaTime;
          }

          return num8;
        };

        VectorTool.Clamp = function Clamp(val, min, max) {
          if (val <= min) val = min;
          if (val >= max) val = max;
          return val;
        };

        return VectorTool;
      }());

      cclegacy._RF.pop();
    }
  };
});

(function(r) {
  r('virtual:///prerequisite-imports/main', 'chunks:///_virtual/main'); 
})(function(mid, cid) {
    System.register(mid, [cid], function (_export, _context) {
    return {
        setters: [function(_m) {
            var _exportObj = {};

            for (var _key in _m) {
              if (_key !== "default" && _key !== "__esModule") _exportObj[_key] = _m[_key];
            }
      
            _export(_exportObj);
        }],
        execute: function () { }
    };
    });
});