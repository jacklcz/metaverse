System.register("chunks:///_virtual/AppMain.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GameEvent.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, _decorator, game, setDisplayStats, director, assetManager, Component, GameEvent;

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
          _this._mainPacks = ["audio", "building", "characters", "mainRes", "texture"];
          _this._selectPack = [];
          return _this;
        }

        var _proto = AppMain.prototype;

        _proto.onLoad = function onLoad() {
          game.addPersistRootNode(this.node);
          setDisplayStats(false);
          GameEvent.on(GameEvent.OPEN_MAIN_SCENE, this.openMainScene, this);
          GameEvent.on(GameEvent.OPEN_ROLE_SCENE, this.openRoleScene, this);
          console.log("AppMain onLoad!");
        };

        _proto.loadScene = function loadScene(sceneName) {
          GameEvent.emit(GameEvent.ON_LOADING_TIPS, "加载数据...");
          GameEvent.emit(GameEvent.ON_LOADING_PROCESS, 0);
          director.preloadScene(sceneName, function (coomplateCount, totalCount, item) {
            GameEvent.emit(GameEvent.ON_LOADING_PROCESS, coomplateCount / totalCount);
          }, function () {
            director.loadScene(sceneName);
          });
        };

        _proto.openMainScene = function openMainScene() {
          GameEvent.emit(GameEvent.ON_LOADING_TIPS, "加载基础资源数据...");
          this.loadSubpack("MainScene", 0, this._mainPacks);
        };

        _proto.openRoleScene = function openRoleScene(msg) {
          this.loadSubpack("StartScene", 0, this._mainPacks);
        };

        _proto.loadSubpack = function loadSubpack(sceneName, index, packs) {
          var length = packs.length;
          var step = index / length;
          GameEvent.emit(GameEvent.ON_LOADING_PROCESS, step);

          if (index >= length) {
            this.loadScene(sceneName);
          } else {
            var thisSelf = this;
            assetManager.loadBundle(packs[index], function (err) {
              thisSelf.loadSubpack(sceneName, index + 1, packs);
            });
          }
        };

        return AppMain;
      }(Component)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/AudioController.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './AudioManager.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, _decorator, AudioSource, Component, AudioManager;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      AudioSource = module.AudioSource;
      Component = module.Component;
    }, function (module) {
      AudioManager = module.default;
    }],
    execute: function () {
      var _dec, _class;

      cclegacy._RF.push({}, "fdd08q3W9JOoYlrM5w/RggW", "AudioController", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var AudioController = exports('AudioController', (_dec = ccclass('AudioController'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(AudioController, _Component);

        function AudioController() {
          return _Component.apply(this, arguments) || this;
        }

        var _proto = AudioController.prototype;

        _proto.onLoad = function onLoad() {
          var source = this.node.getComponent(AudioSource);
          AudioManager.instance().initManager(source);
        };

        return AudioController;
      }(Component)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/AudioManager.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _createClass, cclegacy, _decorator, tween, assetManager, AudioClip;

  return {
    setters: [function (module) {
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      tween = module.tween;
      assetManager = module.assetManager;
      AudioClip = module.AudioClip;
    }],
    execute: function () {
      var _dec, _class;

      cclegacy._RF.push({}, "e574cNq6ddKnrnRyaeFUCDi", "AudioManager", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var AudioManager = exports('default', (_dec = ccclass('AudioManager'), _dec(_class = /*#__PURE__*/function () {
        function AudioManager() {
          this._audioSource = null;
        }

        AudioManager.instance = function instance() {
          return _thisManager;
        };

        var _proto = AudioManager.prototype;

        _proto.initManager = function initManager(source) {
          this._audioSource = source;
        };

        _proto.onSound = function onSound(instant, name) {
          var thisSelf = this;
          tween(this).delay(instant).call(function () {
            thisSelf.playSound(name);
          }).start();
        };

        _proto.playMusic = function playMusic(name) {
          var thisSelf = this;
          assetManager.loadBundle("audio", function (err, bundle) {
            bundle.load(name, AudioClip, function (error, clip) {
              if (error) {
                console.log("Load audio failed, error=%s", error.message);
                return;
              }

              thisSelf.audioSource.clip = clip;
              thisSelf.audioSource.loop = true;
              thisSelf.audioSource.play();
            });
          });
        };

        _proto.playSound = function playSound(name) {
          var thisSelf = this;
          assetManager.loadBundle("audio", function (err, bundle) {
            bundle.load(name, AudioClip, function (error, clip) {
              if (error) {
                console.log("Load audio failed, error=%s", error.message);
                return;
              }

              thisSelf.audioSource.playOneShot(clip);
            });
          });
        };

        _createClass(AudioManager, [{
          key: "audioSource",
          get: function get() {
            return this._audioSource;
          }
        }]);

        return AudioManager;
      }()) || _class));

      var _thisManager = new AudioManager();

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

System.register("chunks:///_virtual/BaseRole.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Define.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, _createClass, cclegacy, _decorator, BoxCollider, v3, RigidBody, MeshRenderer, Animation, Vec3, Component, Define;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      BoxCollider = module.BoxCollider;
      v3 = module.v3;
      RigidBody = module.RigidBody;
      MeshRenderer = module.MeshRenderer;
      Animation = module.Animation;
      Vec3 = module.Vec3;
      Component = module.Component;
    }, function (module) {
      Define = module.default;
    }],
    execute: function () {
      exports({
        ActionType: void 0,
        RotateType: void 0
      });

      var _dec, _class;

      cclegacy._RF.push({}, "80865o+dhNDoqopbbuuVeOw", "BaseRole", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var ActionType;

      (function (ActionType) {
        ActionType[ActionType["None"] = 0] = "None";
        ActionType[ActionType["Forward"] = 1] = "Forward";
        ActionType[ActionType["Backward"] = 2] = "Backward";
        ActionType[ActionType["Left"] = 3] = "Left";
        ActionType[ActionType["Right"] = 4] = "Right";
        ActionType[ActionType["Jump"] = 5] = "Jump";
        ActionType[ActionType["Wave"] = 6] = "Wave";
        ActionType[ActionType["Dance1"] = 7] = "Dance1";
        ActionType[ActionType["Dance2"] = 8] = "Dance2";
      })(ActionType || (ActionType = exports('ActionType', {})));

      var RotateType;

      (function (RotateType) {
        RotateType[RotateType["None"] = 0] = "None";
        RotateType[RotateType["Left"] = 1] = "Left";
        RotateType[RotateType["Right"] = 2] = "Right";
      })(RotateType || (RotateType = exports('RotateType', {})));

      var ActionName;

      (function (ActionName) {
        ActionName["Idle"] = "Idle";
        ActionName["Run"] = "Running";
        ActionName["Walk"] = "Walking";
        ActionName["Jump"] = "Jumping";
        ActionName["Wave"] = "Waving01";
        ActionName["Dance1"] = "Dancing02";
        ActionName["Dance2"] = "Dancing03";
      })(ActionName || (ActionName = {}));

      var BaseRole = exports('BaseRole', (_dec = ccclass('BaseRole'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(BaseRole, _Component);

        function BaseRole() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _this._roleID = "";
          _this._roleType = "0";
          _this._nickName = "";
          _this._moveType = 0;
          _this._moveSpeed = 4.5;
          _this._rotaSpeed = 80;
          _this._actionName = "";
          return _this;
        }

        var _proto = BaseRole.prototype;

        _proto.onLoad = function onLoad() {
          var collider = this.addComponent(BoxCollider);
          collider.isTrigger = false;
          collider.size = v3(0.8, 2, 0.8);
          collider.material.restitution = 0;
          var body = this.addComponent(RigidBody);
          body.angularFactor = v3(0, 0, 0);
          body.useGravity = true;
          body.mass = 0.3;
          var node = null;
          var length = this.node.children.length;
          if (length > 2) node = this.node;else node = this.node.getChildByName("Armature");
          var childs = node.children;
          length = childs.length;

          for (var i = 0; i < length; i++) {
            var meshRender = childs[i].getComponent(MeshRenderer);
            if (meshRender == null) continue;
            meshRender.shadowCastingMode = 1;
          }
        };

        _proto.switchMove = function switchMove() {
          this.moveType = this.moveType == 0 ? 1 : 0;
          return this.setAction(this.action);
        };

        _proto.setAction = function setAction(value) {
          var flag = false;
          this.action = value;

          switch (value) {
            case ActionType.None:
              flag = this.stopAction();
              break;

            case ActionType.Jump:
              flag = this.jupmAction();
              break;

            case ActionType.Wave:
              flag = this.waveAction();
              break;

            case ActionType.Dance1:
              flag = this.dancing01();
              break;

            case ActionType.Dance2:
              flag = this.dancing02();
              break;

            default:
              flag = this.moveAction();
              break;
          }

          return flag;
        };

        _proto.updateName = function updateName(type) {
          var title = Define.briefString(this.nickName);
          var node = this.node.getChildByName("RoleName");
          var roleName = node.getComponent("RoleName");
          roleName.setText(type, title);
        };

        _proto.isSpecialAction = function isSpecialAction() {
          return this._actionName == ActionName.Jump //|| (this._actionName == ActionName.Wave)
          //|| (this._actionName == ActionName.Dance1)
          //|| (this._actionName == ActionName.Dance2)
          ;
        };

        _proto.stopAction = function stopAction() {
          if (this._actionName == ActionName.Wave || this._actionName == ActionName.Dance1 || this._actionName == ActionName.Dance2) return false;
          return this.playAction(ActionName.Idle);
        };

        _proto.moveAction = function moveAction() {
          return this.playAction(this.moveType == 0 ? ActionName.Run : ActionName.Walk);
        };

        _proto.jupmAction = function jupmAction() {
          if (this.isSpecialAction()) return false;
          this.specialAction(ActionName.Jump);
          return true;
        };

        _proto.waveAction = function waveAction() {
          if (this.isSpecialAction()) return false;
          this.setAction(ActionType.None);
          this.specialAction(ActionName.Wave);
          return true;
        };

        _proto.dancing01 = function dancing01() {
          if (this.isSpecialAction()) return false;
          this.setAction(ActionType.None);
          this.specialAction(ActionName.Dance1);
          return true;
        };

        _proto.dancing02 = function dancing02() {
          if (this.isSpecialAction()) return false;
          this.setAction(ActionType.None);
          this.specialAction(ActionName.Dance2);
          return true;
        };

        _proto.specialAction = function specialAction(actionName) {
          this.playAction(actionName);
          this.animation.on(Animation.EventType.LASTFRAME, this.onFinishSpecial, this, true);
        };

        _proto.onFinishSpecial = function onFinishSpecial(type, state) {
          this._actionName = "";
          this.setAction(this.action);
        };

        _proto.playAction = function playAction(action) {
          if (action == this._actionName || this.isSpecialAction()) return false;
          this._actionName = action;
          this.animation.play(action);
          return true;
        };

        _proto.getMoveSpeed = function getMoveSpeed() {
          var speed = this.moveSpeed;
          if (this.moveType != 0) speed /= 2;
          return speed;
        };

        _proto.update = function update(deltaTime) {
          this.onMovingPrv(deltaTime);
          var move = 0;

          switch (this.action) {
            case ActionType.Forward:
            case ActionType.Backward:
              move = -this.getMoveSpeed();
              break;

            case ActionType.Left:
            case ActionType.Right:
          }

          if (move != 0) {
            var forward = new Vec3();
            Vec3.transformQuat(forward, Vec3.FORWARD, this.node.rotation);
            forward.multiplyScalar(move);
            var offset = v3();
            Vec3.multiplyScalar(offset, forward, deltaTime);
            this.onMoving(false);
            var pos = this.node.getWorldPosition();
            this.node.setWorldPosition(pos.add(offset));
            this.onUpdatedPosition();
          }
        };

        _createClass(BaseRole, [{
          key: "roleID",
          get: function get() {
            return this._roleID;
          },
          set: function set(id) {
            this._roleID = id;
          }
        }, {
          key: "roleType",
          get: function get() {
            return this._roleType;
          },
          set: function set(type) {
            this._roleType = type;
          }
        }, {
          key: "nickName",
          get: function get() {
            return this._nickName;
          },
          set: function set(name) {
            this._nickName = name;
          }
        }, {
          key: "moveType",
          get: function get() {
            return this._moveType;
          },
          set: function set(type) {
            this._moveType = type;
          }
        }, {
          key: "moveSpeed",
          get: function get() {
            return this._moveSpeed;
          }
        }, {
          key: "rotaSpeed",
          get: function get() {
            return this._rotaSpeed;
          }
        }, {
          key: "animation",
          get: function get() {
            return this.node.getComponent(Animation);
          }
        }]);

        return BaseRole;
      }(Component)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BuildScene.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GameEvent.ts', './MyRole.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, _decorator, assetManager, JsonAsset, Prefab, Component, GameEvent;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      assetManager = module.assetManager;
      JsonAsset = module.JsonAsset;
      Prefab = module.Prefab;
      Component = module.Component;
    }, function (module) {
      GameEvent = module.default;
    }, null],
    execute: function () {
      var _dec, _class;

      cclegacy._RF.push({}, "5e094O/tl5AnJ79O+o4ef94", "BuildScene", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var BuildScene = exports('BuildScene', (_dec = ccclass('BuildScene'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(BuildScene, _Component);

        function BuildScene() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _this._mapData = null;
          return _this;
        }

        var _proto = BuildScene.prototype;

        _proto.start = function start() {
          GameEvent.on(GameEvent.ON_INITED_OWNER, this.onInitedOwner, this);
        };

        _proto.onInitedOwner = function onInitedOwner() {
          var thisSelf = this;
          assetManager.loadBundle("mainRes", function (err, bundle) {
            bundle.load("./map", JsonAsset, function (error, data) {
              if (!error) {
                thisSelf.initMapData(data.json);
              } else console.log(error.message);
            });
          });
        };

        _proto.initMapData = function initMapData(data) {
          this._mapData = data;
          return;
        };

        _proto.onUpdateView = function onUpdateView(perfabList, infoList) {
          if (perfabList.length <= 0) return;
          var thisSelf = this;
          var loadList = perfabList.splice(0, 3);
          var thisInfo = infoList.splice(0, 3);
          assetManager.loadBundle("building", function (err, bundle) {
            bundle.load(loadList, Prefab, function (error, data) {
              thisSelf.onUpdateView(perfabList, infoList);

              if (!error) {
                thisSelf.initBuilding(loadList, thisInfo, data);
              } else console.log(error.message);
            });
          });
        };

        _proto.initBuilding = function initBuilding(perfabList, infoList, data) {
          var thisSelf = this;

          for (var i = 0; i < data.length; i++) {
            data[i].createNode(function (error, node) {
              var pos = infoList[i][1];
              var rota = infoList[i][2];
              var scale = infoList[i][3];
              node.setWorldPosition(pos[0], pos[1], pos[2]);
              node.setWorldRotationFromEuler(rota[0], rota[1], rota[2]);
              node.setScale(scale[0], scale[1], scale[2]);
              thisSelf.node.addChild(node);
            });
          }
        };

        return BuildScene;
      }(Component)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ChatFrame.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GameEvent.ts', './Define.ts', './PeerConnection.ts', './GlobalNode.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, _decorator, EventHandler, Node, GameEvent, Define, PeerConnection, GlobalNode;

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
      Define = module.default;
    }, function (module) {
      PeerConnection = module.default;
    }, function (module) {
      GlobalNode = module.default;
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
          _this._maxVisible = 6;
          _this._offset = 0;
          _this._com = com;

          _this.onInitilize();

          return _this;
        }

        var _proto = ChatFrame.prototype;

        _proto.switchVisible = function switchVisible() {
          this._com.visible = !this._com.visible;
        };

        _proto.onInitilize = function onInitilize() {
          var handler = new EventHandler();
          handler.handler = "onChatEnded";
          handler.target = GlobalNode.instance().node;
          handler.component = "GlobalNode";

          var thisInput = this._com.getChild("input");

          thisInput._editBox.editingDidEnded.push(handler);

          this._com.getChild("msgList").text = "";

          this._com.getChild("sendBtn").onClick(this.onSendChat, this);

          this._com.getChild("upBtn").onClick(this.onUpMsg, this);

          this._com.getChild("downBtn").onClick(this.onDownMsg, this);

          this._com.getChild("lastBtn").onClick(this.onLastMsg, this);

          GameEvent.on(GameEvent.ON_SEND_CHAT_MSG, this.onSendChat, this);
          GameEvent.on(GameEvent.ON_CHAT_MESSAGE, this.onChatMessage, this);
          this._com.visible = false;
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
          nickName = Define.briefString(nickName);
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
            var count = length - 1 - this._offset;

            for (var i = 0; i < count; i++) {
              text += this._messages[i] + "\n";
            }

            text += this._messages[count];
          }

          var msgList = this._com.getChild("msgList");

          msgList.text = text;
        };

        _proto.onUpMsg = function onUpMsg() {
          var length = this._messages.length;
          if (length - this._offset <= this._maxVisible) return;
          this._offset += 1;
          this.updateMessage();
        };

        _proto.onDownMsg = function onDownMsg() {
          if (this._offset <= 0) return;
          this._offset -= 1;
          this.updateMessage();
        };

        _proto.onLastMsg = function onLastMsg() {
          if (this._offset <= 0) return;
          this._offset = 0;
          this.updateMessage();
        };

        return ChatFrame;
      }(Node)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Connection.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GameEvent.ts', './Base64.ts', './Define.ts', './proto.js', './proto.mjs_cjs=&original=.js', './phoenix.mjs', './UserInfo.ts'], function (exports) {
  'use strict';

  var _createClass, _createForOfIteratorHelperLoose, cclegacy, GameEvent, decode, encode, Define, _cjsExports, Socket, Presence, UserInfo;

  return {
    setters: [function (module) {
      _createClass = module.createClass;
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
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
      Presence = module.Presence;
    }, function (module) {
      UserInfo = module.default;
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
                  var theResp = LoginResponse.decode(resp.data.value);
                  listener.call(caller, resp.code, theResp.token, theResp.id, theResp.nickname, theResp.character);
                } else listener.call(caller, 0, resp.message);
              } else listener.call(caller, 0);
            }
          };

          xhr.onerror = function (evt) {
            console.log(evt);
          };

          var LoginRequest = _cjsExports.game.LoginRequest;
          var login = LoginRequest.create({
            nickname: acount,
            character: UserInfo.role
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
              thisSelf.onJoinChannel(true, id);
            }).receive("error", function (resp) {
              thisSelf.onJoinChannel(false);
            });
          } else GameEvent.emit(GameEvent.LOGIN_RESULT, Define.ERR_ERROR, "Can't connect to channel for socket is not connected!");
        };

        _proto.close = function close() {
          this.closeChannel();
          this._socket = null;
        };

        _proto.closeChannel = function closeChannel() {
          if (this._channel) {
            this._channel.off();

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

        _proto.onMessage = function onMessage(event) {};

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

        _proto.onJoinChannel = function onJoinChannel(result, topic) {
          if (result) {
            var handleLeave = function handleLeave(diff, topic) {
              var leaves = diff.leaves[topic];

              if (leaves) {
                for (var _iterator = _createForOfIteratorHelperLoose(leaves.metas), _step; !(_step = _iterator()).done;) {
                  var user = _step.value;
                  var id = user.user_id;
                  GameEvent.emit(GameEvent.ON_ROLE_OFFLINE, id);
                }
              }
            };

            console.log("Joined channel successfully");
            var presence = new Presence(this._channel);

            this._channel.on("presence_diff", function (diff) {
              presence = Presence.syncDiff(presence, diff); //handleJoin(diff, topic)

              handleLeave(diff, topic);
            });

            this.onRegisterEntry(this._channel);
            GameEvent.emit(GameEvent.LOGIN_RESULT, Define.ERR_SUCCESS);
          } else GameEvent.emit(GameEvent.LOGIN_RESULT, Define.ERR_ERROR, "Unable to join channel");
        };

        _proto.sendPosition = function sendPosition(position) {
          var Placeable = _cjsExports.game.Placeable;
          var message = Placeable.create({
            //id: UserInfo.id,
            x: position.x,
            y: position.y,
            z: position.z
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

System.register("chunks:///_virtual/ControlScene.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GameEvent.ts', './BaseRole.ts', './UserInfo.ts', './MyRole.ts', './ChatFrame.ts', './fairygui.mjs', './GuideDlg.ts', './StartDlg.ts', './SettingDlg.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, _createClass, cclegacy, _decorator, assetManager, v2, v3, Quat, Component, GameEvent, ActionType, UserInfo, MyRole, ChatFrame, GRoot, UIPackage, Event, GuideDlg, StartDlg, SettingDlg;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      assetManager = module.assetManager;
      v2 = module.v2;
      v3 = module.v3;
      Quat = module.Quat;
      Component = module.Component;
    }, function (module) {
      GameEvent = module.default;
    }, function (module) {
      ActionType = module.ActionType;
    }, function (module) {
      UserInfo = module.default;
    }, function (module) {
      MyRole = module.MyRole;
    }, function (module) {
      ChatFrame = module.ChatFrame;
    }, function (module) {
      GRoot = module.GRoot;
      UIPackage = module.UIPackage;
      Event = module.Event;
    }, function (module) {
      GuideDlg = module.GuideDlg;
    }, function (module) {
      StartDlg = module.StartDlg;
    }, function (module) {
      SettingDlg = module.SettingDlg;
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
          _this._mouseLast = v2();
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
          this.setRoleHeader();
          view.getChild("expressFrame").visible = false;
          var frame = view.getChild("chatFrame");
          this._chatFrame = new ChatFrame(frame);
          view.getChild("messageBtn").onClick(this.onMsgFrame, this);
          view.getChild("operaBtn").onClick(this.onOprFrame, this);
          view.getChild("expressBtn").onClick(this.onExpFrame, this);
          view.getChild("settingBtn").onClick(this.onSetFrame, this);

          var expFrame = this._mainView.getChild("expressFrame");

          expFrame.getChild("btn01").onClick(this.onDancing01, this);
          expFrame.getChild("btn02").onClick(this.onWaving, this);
          expFrame.getChild("btn03").onClick(this.onDancing02, this);
          this.node.on(Event.TOUCH_BEGIN, this.mouseDown, this);
          this.node.on(Event.TOUCH_END, this.mouseUp, this);
          this.node.on(Event.MOUSE_WHEEL, this.mouseWheel, this);
          GRoot.inst.on(Event.TOUCH_MOVE, this.mouseMove, this);
          GameEvent.on(GameEvent.ON_OWNER_POSITION, this.onOwnerPosition, this);
          this.showStartGuide();
        };

        _proto.setRoleHeader = function setRoleHeader() {
          var header = this._mainView.getChild("roleHeader");

          header.url = "ui://mainScene/role" + UserInfo.role;
        };

        _proto.onMsgFrame = function onMsgFrame() {
          this._chatFrame.switchVisible();
        };

        _proto.onOprFrame = function onOprFrame() {
          var dlg = new GuideDlg();
          dlg.showDlg(this._mainView);
        };

        _proto.onExpFrame = function onExpFrame() {
          var expFrame = this._mainView.getChild("expressFrame");

          expFrame.visible = !expFrame.visible;
        };

        _proto.onSetFrame = function onSetFrame() {
          var dlg = new SettingDlg();
          dlg.showDlg(this._mainView);
        };

        _proto.showStartGuide = function showStartGuide() {
          var dlg = new StartDlg();
          dlg.showDlg(this._mainView);
        };

        _proto.onWaving = function onWaving() {
          if (MyRole.instance().waveAction()) {
            MyRole.instance().sendAction(ActionType.Wave);
          }
        };

        _proto.onDancing01 = function onDancing01() {
          if (MyRole.instance().dancing01()) {
            MyRole.instance().sendAction(ActionType.Dance1);
          }
        };

        _proto.onDancing02 = function onDancing02() {
          if (MyRole.instance().dancing02()) {
            MyRole.instance().sendAction(ActionType.Dance2);
          }
        };

        _proto.isRootInput = function isRootInput() {
          return GRoot.inst.touchTarget instanceof GRoot;
        };

        _proto.mouseDown = function mouseDown(e) {
          if (!this.isRootInput()) return;
          this._mouseLast.x = e.pos.x;
          this._mouseLast.y = e.pos.y; //this.mainCamera.onMouseDown(e);
        };

        _proto.mouseMove = function mouseMove(e) {
          if (!this.isRootInput()) return;
          var detla = v2(e.pos);
          detla.subtract(this._mouseLast);
          this._mouseLast.x = e.pos.x;
          this._mouseLast.y = e.pos.y;
          this.mainCamera.onMouseMove(detla);
        };

        _proto.mouseUp = function mouseUp(e) {
          if (!this.isRootInput()) return; //this.mainCamera.onMouseUp(e);
        };

        _proto.mouseWheel = function mouseWheel(e) {
          if (!this.isRootInput()) return;
          this.mainCamera.onMouseWheel(e.mouseWheelDelta);
        };

        _proto.onOwnerPosition = function onOwnerPosition() {
          var myNode = MyRole.instance().node;
          var euler = v3();
          var rotation = new Quat();
          myNode.getWorldRotation(rotation);
          rotation.getEulerAngles(euler);
          var pos = myNode.getWorldPosition();
          var x = Math.floor(pos.x * 10 + 740);
          var y = Math.abs(Math.floor(pos.z * 10 - 690));

          var frame = this._mainView.getChild("mapFrame");

          frame.getChild("mapPosition").text = x.toString() + ",  " + y.toString();
          x = x * 240 / 2280;
          y = y * 240 / 1620;
          y = 240 - y;
          if (x < 0) x = 0;
          if (x > 240) x = 240;
          if (y < 0) y = 0;
          if (y > 240) y = 240;
          var map = frame.getChild("roleMap");
          var role = map.getChild("role");
          role.setPosition(x, y);
          role.rotation = -euler.y;
        };

        _createClass(ControlScene, [{
          key: "mainCamera",
          get: function get() {
            var camera = this.node.parent.getChildByName("Main Camera");
            return camera.getComponent("MainRoleCamera");
          }
        }]);

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

      var _define = /*#__PURE__*/function () {
        function _define() {
          this.ERR_ERROR = 0;
          this.ERR_SUCCESS = 1;
          this.ERR_TIMEOUT = 2;
          this.ERR_FAILED = -1;
        }

        var _proto = _define.prototype;

        _proto.briefString = function briefString(text, max) {
          if (max === void 0) {
            max = 7;
          }

          if (text.length > max) {
            text = "0x.." + text.slice(text.length - 4);
          }

          return text;
        };

        return _define;
      }();

      var Define = exports('default', new _define());

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Dialog.ts", ['cc', './fairygui.mjs'], function (exports) {
  'use strict';

  var cclegacy, _decorator, Window, UIPackage;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
    }, function (module) {
      Window = module.Window;
      UIPackage = module.UIPackage;
    }],
    execute: function () {
      var _dec, _class;

      cclegacy._RF.push({}, "2912a0v13BAaJedP/KtylnF", "Dialog", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var Dialog = exports('default', (_dec = ccclass('Dialog'), _dec(_class = /*#__PURE__*/function () {
        function Dialog() {
          this._dlg = void 0;
        }

        var _proto = Dialog.prototype;

        _proto.popupDlg = function popupDlg(mainView, dlgName, center) {
          if (center === void 0) {
            center = true;
          }

          this._dlg = new Window();
          var dlg = UIPackage.createObject("mainScene", dlgName).asCom;
          this._dlg.contentPane = dlg;
          this.onInitDlg();
          var thisSelf = this;
          var btn = dlg.getChild("closeBtn");
          btn.onClick(function () {
            thisSelf._dlg.hide();

            thisSelf._dlg.dispose();

            dlg.dispose();
          }, this);
          this._dlg.modal = true;

          this._dlg.show();

          this.onShowDlg(mainView, center);
        };

        _proto.onShowDlg = function onShowDlg(mainView, center) {
          var view = this._dlg;
          var pos = mainView.node.getPosition();
          pos.x += (mainView.width - view.width) / 2;

          if (center) {
            pos.y += (mainView.height - view.height) / 2;
          } else {
            pos.y += mainView.height - view.height;
          }

          view.setPosition(pos.x, pos.y);
        };

        return Dialog;
      }()) || _class));

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
          _this.ON_ROLE_LOCATION = "on_role_location";
          _this.ON_ROLE_OFFLINE = "on_role_offline";
          _this.ON_INITED_OWNER = "on_init_owner";
          _this.ON_SEND_CHAT_MSG = "on_send_chat_msg";
          _this.ON_CHAT_MESSAGE = "on_chat_message";
          _this.ON_ROLE_MOVING = "on_role_moving";
          _this.CONNECTION_ERROR = "net_connection_error";
          _this.CONNECTION_CLOSED = "net_connection_closed";
          _this.ON_LOADING_TIPS = "on_loading_tips";
          _this.ON_LOADING_PROCESS = "on_loading_process";
          _this.OPEN_MAIN_SCENE = "open_main_scene";
          _this.OPEN_ROLE_SCENE = "open_role_scene";
          _this.LOGIN_RESULT = "login_result";
          _this.GET_ROLE_RESULT = "get_role_result";
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

System.register("chunks:///_virtual/GameRole.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './BaseRole.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, _createClass, cclegacy, _decorator, ActionType, BaseRole;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
    }, function (module) {
      ActionType = module.ActionType;
      BaseRole = module.BaseRole;
    }],
    execute: function () {
      var _dec, _class;

      cclegacy._RF.push({}, "7fcdfrQpbVCRr/CI4Ji5H/r", "GameRole", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var GameRole = exports('GameRole', (_dec = ccclass('GameRole'), _dec(_class = /*#__PURE__*/function (_BaseRole) {
        _inheritsLoose(GameRole, _BaseRole);

        function GameRole() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _BaseRole.call.apply(_BaseRole, [this].concat(args)) || this;
          _this._action = ActionType.None;
          return _this;
        }

        var _proto = GameRole.prototype;

        _proto.onMovingPrv = function onMovingPrv(deltaTime) {};

        _proto.onMoving = function onMoving(flag) {};

        _proto.onInitedRole = function onInitedRole() {};

        _proto.onUpdatedPosition = function onUpdatedPosition() {};

        _createClass(GameRole, [{
          key: "action",
          get: function get() {
            return this._action;
          },
          set: function set(value) {
            this._action = value;
          }
        }]);

        return GameRole;
      }(BaseRole)) || _class));

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
          this.node.getChildByName("RoleName").active = false; //this.node.getChildByName("character0").active = false;
          //this.node.getChildByName("character1").active = false;
          //this.node.getChildByName("character2").active = false;
          //this.node.getChildByName("character3").active = false;
          //this.node.getChildByName("character4").active = false;
          //this.node.getChildByName("character5").active = false;
          //this.node.getChildByName("character6").active = false;
          //this.node.getChildByName("character7").active = false;        
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

System.register("chunks:///_virtual/GuideDlg.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Dialog.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, _decorator, Dialog;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
    }, function (module) {
      Dialog = module.default;
    }],
    execute: function () {
      var _dec, _class;

      cclegacy._RF.push({}, "3cdaeq2a9ZENrfHJMrRpBZX", "GuideDlg", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var GuideDlg = exports('GuideDlg', (_dec = ccclass('GuideDlg'), _dec(_class = /*#__PURE__*/function (_Dialog) {
        _inheritsLoose(GuideDlg, _Dialog);

        function GuideDlg() {
          return _Dialog.apply(this, arguments) || this;
        }

        var _proto = GuideDlg.prototype;

        _proto.showDlg = function showDlg(mainView) {
          _Dialog.prototype.popupDlg.call(this, mainView, "guideFrame");
        };

        _proto.onInitDlg = function onInitDlg() {};

        return GuideDlg;
      }(Dialog)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/main", ['./GameEvent.ts', './AppMain.ts', './AudioManager.ts', './AudioController.ts', './poliyfill.ts', './Utf8.ts', './main.ts', './Base64.ts', './Define.ts', './BaseRole.ts', './proto.mjs_cjs=&original=.js', './UserInfo.ts', './Connection.ts', './PeerConnection.ts', './MyRole.ts', './BuildScene.ts', './GlobalNode.ts', './ChatFrame.ts', './Dialog.ts', './GuideDlg.ts', './StartDlg.ts', './SettingDlg.ts', './ControlScene.ts', './GameRole.ts', './MainLight.ts', './VectorTool.ts', './MainRoleCamera.ts', './MainScene.ts', './MetaMask.ts', './RoleName.ts', './RoleScene.ts', './TheConfig.ts', './StartScene.ts'], function () {
  'use strict';

  return {
    setters: [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
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

System.register("chunks:///_virtual/MainLight.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, _decorator, DirectionalLight, Component;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      DirectionalLight = module.DirectionalLight;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _class;

      cclegacy._RF.push({}, "7365aSz9qFHBoqBR1ifTx8c", "MainLight", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var MainLight = exports('MainLight', (_dec = ccclass('MainLight'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(MainLight, _Component);

        function MainLight() {
          return _Component.apply(this, arguments) || this;
        }

        var _proto = MainLight.prototype;

        _proto.start = function start() {
          this.onUpdateTime();
          var thisSelf = this;
          this.schedule(function () {
            thisSelf.onUpdateTime();
          }, 3);
        };

        _proto.onUpdateTime = function onUpdateTime() {
          var date = new Date();
          var passTime = date.getHours() * 60 + date.getMinutes();
          var noon = 720;
          var min = 4000;
          var max = 65000;
          var space = max - min;
          var illumination = min;

          if (passTime <= noon) {
            illumination += Math.floor(passTime * space / noon);
          } else {
            passTime -= noon;
            illumination = max - Math.floor(passTime * space / noon);
          }

          this.node.getComponent(DirectionalLight).illuminance = illumination;
        };

        return MainLight;
      }(Component)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/MainRoleCamera.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GameEvent.ts', './MyRole.ts', './VectorTool.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, _createClass, cclegacy, _decorator, input, Input, KeyCode, Vec3, Quat, v3, Component, GameEvent, MyRole, VectorTool;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      input = module.input;
      Input = module.Input;
      KeyCode = module.KeyCode;
      Vec3 = module.Vec3;
      Quat = module.Quat;
      v3 = module.v3;
      Component = module.Component;
    }, function (module) {
      GameEvent = module.default;
    }, function (module) {
      MyRole = module.MyRole;
    }, function (module) {
      VectorTool = module.VectorTool;
    }],
    execute: function () {
      var _dec, _class;

      cclegacy._RF.push({}, "42643sRRZJLOqTN8DULEdBu", "MainRoleCamera", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var MainRoleCamera = exports('MainRoleCamera', (_dec = ccclass('MainRoleCamera'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(MainRoleCamera, _Component);

        function MainRoleCamera() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _this._target = null;
          _this._offset = new Vec3(0, 0.62, 4.6);
          _this._moveSmooth = 0.002;
          _this._rotateSmooth = 0.03;
          _this._velocity = new Vec3();
          return _this;
        }

        var _proto = MainRoleCamera.prototype;

        _proto.start = function start() {
          input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
          GameEvent.on(GameEvent.ON_INITED_OWNER, this.onInitMyRole, this);
        };

        _proto.onKeyDown = function onKeyDown(event) {
          switch (event.keyCode) {
            case KeyCode.PAGE_DOWN:
              this.onMouseWheel(0);
              break;

            case KeyCode.PAGE_UP:
              this.onMouseWheel(1);
              break;
          }
        };

        _proto.onInitMyRole = function onInitMyRole() {
          this.target = MyRole.instance().node;
          this.node.position = this.toPosition();
          this.node.lookAt(this.lookAt);
        };

        _proto.onMouseMove = function onMouseMove(delta) {
          this.onRotation(delta);
        };

        _proto.onMouseWheel = function onMouseWheel(delta) {
          var offset = 0.2;
          if (delta > 0) offset = -0.2;
          this.offset.z += offset * MyRole.instance().roleWard;
          this.setFollowTrack();
        };

        _proto.onRotation = function onRotation(delta) {
          var speed = 0.002;
          var horizontal = -delta.x * speed;
          var vertical = delta.y * speed;
          var lookAt = this.lookAt;
          this.rotateAround(this.node, lookAt, Vec3.UP, horizontal);
          this.rotateAround(this.node, lookAt, Vec3.RIGHT, vertical);
          var cameraPos = this.node.getWorldPosition();
          this._offset.y = Math.abs(cameraPos.y - lookAt.y);
        };

        _proto.rotateAround = function rotateAround(node, point, axis, angle) {
          var quat = new Quat();
          Quat.fromAxisAngle(quat, axis, angle);
          var position = v3();
          Vec3.subtract(position, node.worldPosition, point);
          Vec3.transformQuat(position, position, quat);
          Vec3.add(position, point, position);
          var dir = v3();
          Vec3.subtract(dir, position, this.lookAt);
          var rotation = new Quat();
          Quat.fromViewUp(rotation, dir.normalize(), Vec3.UP);
          var euler = v3();
          rotation.getEulerAngles(euler);

          if (euler.x < -80 || euler.x > -5) {
            return;
          }

          node.setWorldPosition(position);
          node.setWorldRotation(rotation);
        };

        _proto.setFollowTrack = function setFollowTrack(deltaTime) {
          var pos = this.toPosition();
          this.node.position = VectorTool.SmoothDampV3(this.node.position, pos, this._velocity, this._moveSmooth, 100000, 0.02);
          this.node.lookAt(this.lookAt);
        };

        _proto.toPosition = function toPosition() {
          var z = MyRole.instance().roleWard * this.offset.z;
          var u = Vec3.multiplyScalar(new Vec3(), Vec3.UP, this.offset.y);
          var f = Vec3.multiplyScalar(new Vec3(), this.target.forward, z);
          var thePos = this.lookAt;
          return Vec3.add(new Vec3(), thePos, u).add(f);
        };

        _proto.update = function update(deltaTime) {
          if (!this.target) return;
          if (MyRole.action == 0 && MyRole.ratation == 0) return;
          this.setFollowTrack(deltaTime);
        };

        _createClass(MainRoleCamera, [{
          key: "target",
          get: function get() {
            return this._target;
          },
          set: function set(node) {
            this._target = node;
          }
        }, {
          key: "offset",
          get: function get() {
            return this._offset;
          }
        }, {
          key: "lookAt",
          get: function get() {
            var lookAt = this.target.getWorldPosition();
            lookAt.y += 1.5;
            return lookAt;
          }
        }]);

        return MainRoleCamera;
      }(Component)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/MainScene.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './AudioManager.ts', './ControlScene.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, _decorator, AudioManager, ControlScene;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
    }, function (module) {
      AudioManager = module.default;
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
          console.log("MainScene onLoadFinish %s", error ? error : "success");
          AudioManager.instance().playMusic("bkMusic");
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

        MetaMask.metaStatus = function metaStatus(listener, caller) {
          if (MetaMask.isInstalled()) {
            var ethereum = window.ethereum;

            if (ethereum._state.initialized != true) {
              listener.call(caller, 3);
            } else {
              ethereum.request({
                method: 'eth_chainId'
              }).then(function (chainId) {
                var id = parseInt(chainId, 16);
                var status = 0;

                if (id != 0x1 && id != 0x38 && id != 0x89) {
                  status = 2;
                }

                listener.call(caller, status);
              })["catch"](function (error) {
                listener.call(caller, 3);
              });
            }
          } else listener.call(caller, 1);
        };

        var _proto = MetaMask.prototype;

        _proto.connectMetaMask = function connectMetaMask(caller, listener) {
          MetaMask.metaStatus(function (status) {
            if (status == 0) {
              var ethereum = window.ethereum;
              ethereum.request({
                method: 'eth_requestAccounts'
              }).then(function (accounts) {
                var account = accounts[0];
                listener.call(caller, 1, account);
              })["catch"](function (error) {
                listener.call(caller, 0, error);
              });
            } else listener.call(caller, 0, "MetaMask status error!");
          }, this);
        };

        return MetaMask;
      }()) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/MyRole.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GameEvent.ts', './BaseRole.ts', './PeerConnection.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, _assertThisInitialized, _createClass, cclegacy, _decorator, v3, GameEvent, ActionType, RotateType, BaseRole, PeerConnection;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _assertThisInitialized = module.assertThisInitialized;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      v3 = module.v3;
    }, function (module) {
      GameEvent = module.default;
    }, function (module) {
      ActionType = module.ActionType;
      RotateType = module.RotateType;
      BaseRole = module.BaseRole;
    }, function (module) {
      PeerConnection = module.default;
    }],
    execute: function () {
      var _dec, _class, _class2;

      cclegacy._RF.push({}, "43a73u2c6pOmotoY0k9i702", "MyRole", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var MyRole = exports('MyRole', (_dec = ccclass('MyRole'), _dec(_class = (_class2 = /*#__PURE__*/function (_BaseRole) {
        _inheritsLoose(MyRole, _BaseRole);

        MyRole.instance = function instance() {
          return MyRole._instance;
        };

        function MyRole() {
          var _this;

          _this = _BaseRole.call(this) || this;
          _this._wardType = ActionType.Forward;
          _this._lastSyncTime = 0;
          MyRole._instance = _assertThisInitialized(_this);
          return _this;
        }

        var _proto = MyRole.prototype;

        _proto.start = function start() {};

        _proto.setWard = function setWard(type) {
          if (this._wardType == type) return;
          this._wardType = type;
          var euler = v3();
          var thisRota = this.node.getWorldRotation();
          thisRota.getEulerAngles(euler);
          euler.y += 180;
          this.node.setRotationFromEuler(euler);
        };

        _proto.onMovingPrv = function onMovingPrv(deltaTime) {
          var rotation = 0;

          switch (this.ratation) {
            case RotateType.Left:
              rotation = 1;
              break;

            case RotateType.Right:
              rotation = -1;
              break;
          }

          if (rotation != 0) {
            var euler = v3();
            var thisRota = this.node.getWorldRotation();
            thisRota.getEulerAngles(euler);
            euler.y += rotation * this.rotaSpeed * deltaTime;
            this.node.setRotationFromEuler(euler);
          }
        };

        _proto.onMoving = function onMoving(flag) {
          if (flag === void 0) {
            flag = true;
          }

          var thisTime = Date.now();
          var passTime = thisTime - this._lastSyncTime;

          if (passTime >= 500 || flag) {
            this._lastSyncTime = thisTime;
            this.sendMovtion();
          }
        };

        _proto.onInitedRole = function onInitedRole() {
          GameEvent.emit(GameEvent.ON_INITED_OWNER);
          var position = this.node.getWorldPosition();
          PeerConnection.instance().sendPosition(position);
          this.onUpdatedPosition();
        };

        _proto.sendAction = function sendAction(action) {
          this.sendMovtion(action);
        };

        _proto.sendMovtion = function sendMovtion(action) {
          var euler = v3();
          var thisRota = this.node.getWorldRotation();
          thisRota.getEulerAngles(euler);
          if (!action) action = this.action;
          if (this.moveType != 0) action |= 0x10000;
          var startPos = this.node.getWorldPosition();
          PeerConnection.instance().sendMoving(action, startPos, euler);
        };

        _proto.onUpdatedPosition = function onUpdatedPosition() {
          GameEvent.emit(GameEvent.ON_OWNER_POSITION);
        };

        _createClass(MyRole, [{
          key: "action",
          get: function get() {
            return MyRole.action;
          },
          set: function set(value) {
            MyRole.action = value;
          }
        }, {
          key: "ratation",
          get: function get() {
            return MyRole.ratation;
          },
          set: function set(value) {
            MyRole.ratation = value;
          }
        }, {
          key: "roleWard",
          get: function get() {
            return this._wardType == ActionType.Forward ? 1 : -1;
          }
        }]);

        return MyRole;
      }(BaseRole), _class2.action = ActionType.None, _class2.ratation = RotateType.None, _class2._instance = null, _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/PeerConnection.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GameEvent.ts', './Base64.ts', './proto.js', './proto.mjs_cjs=&original=.js', './UserInfo.ts', './Connection.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, _assertThisInitialized, cclegacy, _decorator, v3, GameEvent, encode, decode, _cjsExports, UserInfo, Connection;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      v3 = module.v3;
    }, function (module) {
      GameEvent = module.default;
    }, function (module) {
      encode = module.encode;
      decode = module.decode;
    }, function (module) {
      _cjsExports = module.default;
    }, null, function (module) {
      UserInfo = module.default;
    }, function (module) {
      Connection = module.default;
    }],
    execute: function () {
      cclegacy._RF.push({}, "1af313Tuf1F3pa/zyrmnbar", "PeerConnection", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
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
          this.registerCommandEntry(channel, "placeables", this, this.msgPlace);
          this.registerCommandEntry(channel, "messages", this, this.msgChat);
          this.registerCommandEntry(channel, "move", this, this.msgMoving);
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

        _proto.onConnectionClosed = function onConnectionClosed() {//GameEvent.emit(GameEvent.CONNECTION_CLOSED);
        };

        _proto.onConnectionError = function onConnectionError(event) {
          GameEvent.emit(GameEvent.CONNECTION_ERROR, event);
          console.log("Connection error: %s", event);
        };

        _proto.login = function login(httpUrl, wsUrl) {
          var thisSelf = this;
          var account = UserInfo.account;

          _Connection.prototype.httpConnect.call(this, httpUrl, account, this, function (result, token, id, nickname, character) {
            console.log("http login result=%d, token&msg=%s", result, token);

            if (result == 1) {
              UserInfo.id = id;
              UserInfo.token = token;
              UserInfo.role = character;
              UserInfo.nickName = nickname;
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

        _proto.sendMoving = function sendMoving(type, startPos, rotation) {
          if (this.channel) {
            var Point = _cjsExports.game.Point;
            var Move = _cjsExports.game.Move;
            var move = Move.create({
              moveType: type,
              stratPos: Point.create({
                x: Math.floor(startPos.x * 1000),
                y: Math.floor(startPos.y * 1000),
                z: Math.floor(startPos.z * 1000)
              }),
              rotation: Point.create({
                x: Math.floor(rotation.x * 1000),
                y: Math.floor(rotation.y * 1000),
                z: Math.floor(rotation.z * 1000)
              })
            });
            var msg = Move.encode(move).finish();
            this.channel.push("move", {
              payload: encode(msg)
            });
          }
        };

        _proto.msgKeepAlive = function msgKeepAlive(buffer) {
          console.log("keep alive " + new Date(Date.now()).toLocaleTimeString());
        };

        _proto.msgPlace = function msgPlace(data) {
          var Placeables = _cjsExports.game.Placeables;
          var places = Placeables.decode(decode(data));
          var result = places.result;
          var length = places.result.length;

          for (var i = 0; i < length; i++) {
            var thisMsg = result[i];
            var id = thisMsg.id;
            var nickName = thisMsg.nickname;
            var character = thisMsg.character;
            var position = v3(thisMsg.x, thisMsg.y, thisMsg.z);
            GameEvent.emit(GameEvent.ON_ROLE_LOCATION, id, character, nickName, position);
          }
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

        _proto.msgMoving = function msgMoving(data) {
          var Move = _cjsExports.game.Move;
          var move = Move.decode(decode(data));
          var thisStart = move.stratPos;
          var thisRotat = move.rotation;
          var startPos = v3(thisStart.x / 1000, thisStart.y / 1000, thisStart.z / 1000);
          var rotation = v3(thisRotat.x / 1000, thisRotat.y / 1000, thisRotat.z / 1000);
          GameEvent.emit(GameEvent.ON_ROLE_MOVING, move.id, move.moveType, startPos, rotation);
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

System.register("chunks:///_virtual/RoleName.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, Label, v3, Quat, Vec3, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      Label = module.Label;
      v3 = module.v3;
      Quat = module.Quat;
      Vec3 = module.Vec3;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor, _class3;

      cclegacy._RF.push({}, "ec4784trRhOLobnVASd52gA", "RoleName", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var RoleName = exports('RoleName', (_dec = ccclass('RoleName'), _dec2 = property(Node), _dec(_class = (_class2 = (_class3 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(RoleName, _Component);

        function RoleName() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "alignCamera", _descriptor, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = RoleName.prototype;

        _proto.setText = function setText(type, text) {
          var y = RoleName.NameOffset[type];
          this.node.setPosition(0, y, 0);
          var node = this.node.getChildByName("NickName");
          node.getComponent(Label).string = text;
        };

        _proto.update = function update(deltaTime) {
          var dir = v3();
          var rotation = new Quat();
          Vec3.subtract(dir, this.alignCamera.worldPosition, this.node.worldPosition);
          Quat.fromViewUp(rotation, dir.normalize(), Vec3.UP);
          var euler = v3();
          rotation.getEulerAngles(euler);
          this.node.setWorldRotationFromEuler(0, euler.y, 0);
        };

        return RoleName;
      }(Component), _class3.NameOffset = {
        "0": 2.21,
        "1": 2.05,
        "2": 2.22,
        "3": 2.00,
        "4": 1.90,
        "5": 1.88,
        "6": 1.95,
        "7": 1.98
      }, _class3), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "alignCamera", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/RoleScene.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GameEvent.ts', './BaseRole.ts', './UserInfo.ts', './MyRole.ts', './GlobalNode.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, _decorator, input, Input, assetManager, Prefab, instantiate, KeyCode, Component, GameEvent, ActionType, RotateType, UserInfo, MyRole, GlobalNode;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      input = module.input;
      Input = module.Input;
      assetManager = module.assetManager;
      Prefab = module.Prefab;
      instantiate = module.instantiate;
      KeyCode = module.KeyCode;
      Component = module.Component;
    }, function (module) {
      GameEvent = module.default;
    }, function (module) {
      ActionType = module.ActionType;
      RotateType = module.RotateType;
    }, function (module) {
      UserInfo = module.default;
    }, function (module) {
      MyRole = module.MyRole;
    }, function (module) {
      GlobalNode = module.default;
    }],
    execute: function () {
      var _dec, _class;

      cclegacy._RF.push({}, "30f5dso6NpKs7LbaL2Kp/gZ", "RoleScene", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var RoleScene = exports('RoleScene', (_dec = ccclass('RoleScene'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(RoleScene, _Component);

        function RoleScene() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _this._roleList = {};
          return _this;
        }

        var _proto = RoleScene.prototype;

        _proto.start = function start() {
          GameEvent.on(GameEvent.ON_ROLE_LOCATION, this.onRoleLocation, this);
          GameEvent.on(GameEvent.ON_ROLE_OFFLINE, this.onRoleOffline, this);
          GameEvent.on(GameEvent.ON_ROLE_MOVING, this.onRoleMoving, this);
          this.initMyRole();
          input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
          input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
        };

        _proto.initMyRole = function initMyRole() {
          this.newRole(UserInfo.id, UserInfo.role, UserInfo.account, UserInfo.initPos, "MyRole");
        };

        _proto.onRoleLocation = function onRoleLocation(id, character, nickName, position) {
          console.log("onRoleLocation: %s", id);
          this.newRole(id, character, nickName, position, "GameRole");
        };

        _proto.newRole = function newRole(id, character, nickName, position, comName) {
          var thisSelf = this;
          var type = "./character" + character;
          assetManager.loadBundle("characters", function (err, bundle) {
            bundle.load(type, Prefab, function (error, data) {
              if (!error) {
                data.createNode(function (error, node) {
                  if (!error) {
                    thisSelf.onLoadRole(node, id, character, nickName, position, comName);
                  } else console.log(error.message);
                });
              } else console.log(error.message);
            });
          });
        };

        _proto.onLoadRole = function onLoadRole(role, id, character, nickName, position, comName) {
          var roleName = GlobalNode.instance().node.getChildByName("RoleName");
          var thisName = instantiate(roleName);
          role.addChild(thisName);
          thisName.active = true;
          var gameRole = role.addComponent(comName);
          gameRole.roleType = character;
          gameRole.nickName = nickName;
          gameRole.roleID = id;
          this._roleList[id] = role;
          this.node.addChild(role);
          role.setWorldPosition(position);
          role.layer = this.node.layer;
          role.active = true;
          gameRole.updateName(character);
          gameRole.onInitedRole();
        };

        _proto.onRoleOffline = function onRoleOffline(id) {
          console.log("onRoleOffline: %s", id);

          if (id == UserInfo.id) {
            console.log("onRoleOffline: %s ========MyRole?????", id);
            return;
          }

          var node = this._roleList[id];

          if (node) {
            delete this._roleList[id];
            this.node.removeChild(node);
            node.destroy();
          }
        };

        _proto.onRoleMoving = function onRoleMoving(id, action, startPos, rotation) {
          var node = this._roleList[id];

          if (node) {
            node.setWorldPosition(startPos);
            node.setRotationFromEuler(rotation);
            var gameRole = node.getComponent("GameRole");
            gameRole.moveType = action & 0x10000;
            gameRole.setAction(action & 0x0ffff);
          }
        };

        _proto.onKeyDown = function onKeyDown(event) {
          var flag = true;

          switch (event.keyCode) {
            case KeyCode.KEY_W:
            case KeyCode.ARROW_UP:
              MyRole.instance().setWard(ActionType.Forward);
              MyRole.instance().setAction(ActionType.Forward);
              break;

            case KeyCode.KEY_S:
            case KeyCode.ARROW_DOWN:
              MyRole.instance().setWard(ActionType.Backward);
              MyRole.instance().setAction(ActionType.Backward);
              break;
            //case KeyCode.KEY_Q:
            //    MyRole.moving = MoveType.Left;
            //    break;
            //case KeyCode.KEY_E:
            //    MyRole.moving = MoveType.Right;
            //    break;

            case KeyCode.KEY_A:
            case KeyCode.ARROW_LEFT:
              MyRole.ratation = RotateType.Left;
              break;

            case KeyCode.KEY_D:
            case KeyCode.ARROW_RIGHT:
              MyRole.ratation = RotateType.Right;
              break;

            case KeyCode.SHIFT_LEFT:
            case KeyCode.SHIFT_RIGHT:
              flag = MyRole.instance().switchMove();
              break;

            case KeyCode.SPACE:
              if (MyRole.instance().jupmAction()) {
                MyRole.instance().sendAction(ActionType.Jump);
              }

            default:
              flag = false;
              break;
          }

          if (flag) {
            MyRole.instance().onMoving();
          }
        };

        _proto.onKeyUp = function onKeyUp(event) {
          var flag = true;

          switch (event.keyCode) {
            case KeyCode.KEY_W:
            case KeyCode.KEY_S: //case KeyCode.KEY_Q:
            //case KeyCode.KEY_E:

            case KeyCode.ARROW_UP:
            case KeyCode.ARROW_DOWN:
              MyRole.instance().setAction(ActionType.None);
              break;

            case KeyCode.KEY_A:
            case KeyCode.KEY_D:
            case KeyCode.ARROW_LEFT:
            case KeyCode.ARROW_RIGHT:
              MyRole.ratation = RotateType.None;
              break;

            default:
              flag = false;
              break;
          }

          if (flag) {
            MyRole.instance().onMoving();
          }
        };

        return RoleScene;
      }(Component)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/SettingDlg.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GameEvent.ts', './AudioManager.ts', './PeerConnection.ts', './fairygui.mjs', './Dialog.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, _decorator, GameEvent, AudioManager, PeerConnection, Event, Dialog;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
    }, function (module) {
      GameEvent = module.default;
    }, function (module) {
      AudioManager = module.default;
    }, function (module) {
      PeerConnection = module.default;
    }, function (module) {
      Event = module.Event;
    }, function (module) {
      Dialog = module.default;
    }],
    execute: function () {
      var _dec, _class;

      cclegacy._RF.push({}, "14e6awaLj9Lv5u0NJV08hci", "SettingDlg", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var SettingDlg = exports('SettingDlg', (_dec = ccclass('SettingDlg'), _dec(_class = /*#__PURE__*/function (_Dialog) {
        _inheritsLoose(SettingDlg, _Dialog);

        function SettingDlg() {
          return _Dialog.apply(this, arguments) || this;
        }

        var _proto = SettingDlg.prototype;

        _proto.showDlg = function showDlg(mainView) {
          _Dialog.prototype.popupDlg.call(this, mainView, "setFrame");
        };

        _proto.onInitDlg = function onInitDlg() {
          var dlg = this._dlg.contentPane;
          dlg.getChild("quitBtn").onClick(this.onQuit, this);
          var volume = dlg.getChild("volume");
          volume.on(Event.STATUS_CHANGED, this.onChanged, this);
          volume.value = AudioManager.instance().audioSource.volume * 100;
        };

        _proto.onQuit = function onQuit() {
          PeerConnection.instance().close();
          GameEvent.emit(GameEvent.OPEN_ROLE_SCENE);
        };

        _proto.onChanged = function onChanged() {
          var dlg = this._dlg.contentPane;
          var volume = dlg.getChild("volume");
          AudioManager.instance().audioSource.volume = volume.value / 100;
        };

        return SettingDlg;
      }(Dialog)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/StartDlg.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Dialog.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, _decorator, Dialog;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
    }, function (module) {
      Dialog = module.default;
    }],
    execute: function () {
      var _dec, _class;

      cclegacy._RF.push({}, "98e0afE3ABC3IQY+JGhrwFW", "StartDlg", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var StartDlg = exports('StartDlg', (_dec = ccclass('StartDlg'), _dec(_class = /*#__PURE__*/function (_Dialog) {
        _inheritsLoose(StartDlg, _Dialog);

        function StartDlg() {
          return _Dialog.apply(this, arguments) || this;
        }

        var _proto = StartDlg.prototype;

        _proto.showDlg = function showDlg(mainView) {
          _Dialog.prototype.popupDlg.call(this, mainView, "guideStart", false);
        };

        _proto.onInitDlg = function onInitDlg() {};

        return StartDlg;
      }(Dialog)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/StartScene.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GameEvent.ts', './Define.ts', './UserInfo.ts', './PeerConnection.ts', './fairygui.mjs', './MetaMask.ts', './TheConfig.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, _decorator, Component, GameEvent, Define, UserInfo, PeerConnection, GRoot, UIPackage, Event, MetaMask, TheConfig;

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
      Define = module.default;
    }, function (module) {
      UserInfo = module.default;
    }, function (module) {
      PeerConnection = module.default;
    }, function (module) {
      GRoot = module.GRoot;
      UIPackage = module.UIPackage;
      Event = module.Event;
    }, function (module) {
      MetaMask = module.default;
    }, function (module) {
      TheConfig = module.default;
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
          UIPackage.loadPackage("ui/startScene", this.onLoadUI.bind(this));
        };

        _proto.onLoadUI = function onLoadUI(err) {
          var view = UIPackage.createObject("startScene", "scene").asCom;
          GRoot.inst.addChild(view);
          view.makeFullScreen();
          this._mainView = view;
          var panel = view.getChild("rolePanel");
          panel.getChild("enterBtn").onClick(this.onEnterGame, this);
          panel.getChild("header").url = "ui://startScene/role0";
          panel.enabled = false;
          var control = panel.getController("c1");
          control.on(Event.STATUS_CHANGED, this.onChanged, this);
          control.selectedIndex = Math.floor(Math.random() * 8);
          GameEvent.on(GameEvent.LOGIN_RESULT, this.onLoginResult, this);
          this.checkMetaStatus();
        };

        _proto.onChanged = function onChanged() {
          var panel = this._mainView.getChild("rolePanel");

          var index = panel.getController("c1").selectedIndex;
          var url = "ui://startScene/role" + index.toString();
          panel.getChild("header").url = url;
        };

        _proto.onEnterGame = function onEnterGame() {
          console.log("StartScene onEnterGame!");

          var panel = this._mainView.getChild("rolePanel");

          panel.getChild("enterBtn").enabled = false;
          var index = panel.getController("c1").selectedIndex;
          panel.enabled = false;
          UserInfo.role = index.toString();
          var thisSelf = this;
          var metaMask = new MetaMask();
          metaMask.connectMetaMask(this, function (result, response) {
            if (result == 1) {
              console.log("Get MetaMask account=%s", response);
              UserInfo.account = response; //save the account;

              thisSelf.onGetAccount();
            } else {
              console.error("connect MetaMask failed for: %s", response.message);
              thisSelf.checkMetaStatus();
            }
          });
        };

        _proto.onGetAccount = function onGetAccount() {
          var peerConnection = PeerConnection.instance();
          peerConnection.login(TheConfig.httpUrl, TheConfig.wsUrl);
        };

        _proto.onLoginResult = function onLoginResult(result, msg) {
          if (result == Define.ERR_SUCCESS) {
            console.log("StartScene --> 登录成功!");
            this._mainView.getChild("rolePanel").visible = false;
            this._mainView.getChild("selectBk").visible = false;
            GameEvent.on(GameEvent.ON_LOADING_PROCESS, this.onLoadingProcess, this);
            GameEvent.emit(GameEvent.OPEN_MAIN_SCENE);
          } else {
            var panel = this._mainView.getChild("rolePanel");

            panel.getChild("enterBtn").enabled = true;
            panel.enabled = true;
            console.log("SelectScene --> 登录失败:%s", msg);
          }
        };

        _proto.onLoadingProcess = function onLoadingProcess(value) {
          value = Math.floor(value * 100);
          if (value > 100) value = 100;

          var loading = this._mainView.getChild("processBar");

          if (loading) loading.value = value;
        };

        _proto.checkMetaStatus = function checkMetaStatus() {
          MetaMask.metaStatus(this.onMetaMaskStatus, this);
        };

        _proto.onMetaMaskStatus = function onMetaMaskStatus(status) {
          var tips = this._mainView.getChild("notify");

          if (status == 0) {
            var panel = this._mainView.getChild("rolePanel");

            panel.enabled = true;
            tips.visible = false;
          } else {
            var url = "";

            switch (status) {
              case 1:
                url = "ui://startScene/installMetamask";
                break;

              case 2:
                url = "ui://startScene/supportNetwork";
                break;

              case 3:
                url = "ui://startScene/refreshPage";
                break;
            }

            tips.url = url;
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

System.register("chunks:///_virtual/UserInfo.ts", ['cc'], function (exports) {
  'use strict';

  var cclegacy, _decorator, v3;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      v3 = module.v3;
    }],
    execute: function () {
      cclegacy._RF.push({}, "53832rpzCFEU6ZpXgEI0tMb", "UserInfo", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;

      var _UserInfo = function _UserInfo() {
        this.id = null;
        this.account = null;
        this.nickName = null;
        this.token = null;
        this.role = null;
        this.initPos = v3(12, 0, 18);
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