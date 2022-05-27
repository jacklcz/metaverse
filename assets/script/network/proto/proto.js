/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal.js");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.game = (function() {

    /**
     * Namespace game.
     * @exports game
     * @namespace
     */
    var game = {};

    game.Point = (function() {

        /**
         * Properties of a Point.
         * @memberof game
         * @interface IPoint
         * @property {number|null} [x] Point x
         * @property {number|null} [y] Point y
         * @property {number|null} [z] Point z
         */

        /**
         * Constructs a new Point.
         * @memberof game
         * @classdesc Represents a Point.
         * @implements IPoint
         * @constructor
         * @param {game.IPoint=} [properties] Properties to set
         */
        function Point(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Point x.
         * @member {number} x
         * @memberof game.Point
         * @instance
         */
        Point.prototype.x = 0;

        /**
         * Point y.
         * @member {number} y
         * @memberof game.Point
         * @instance
         */
        Point.prototype.y = 0;

        /**
         * Point z.
         * @member {number} z
         * @memberof game.Point
         * @instance
         */
        Point.prototype.z = 0;

        /**
         * Creates a new Point instance using the specified properties.
         * @function create
         * @memberof game.Point
         * @static
         * @param {game.IPoint=} [properties] Properties to set
         * @returns {game.Point} Point instance
         */
        Point.create = function create(properties) {
            return new Point(properties);
        };

        /**
         * Encodes the specified Point message. Does not implicitly {@link game.Point.verify|verify} messages.
         * @function encode
         * @memberof game.Point
         * @static
         * @param {game.IPoint} message Point message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Point.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.x != null && Object.hasOwnProperty.call(message, "x"))
                writer.uint32(/* id 1, wireType 0 =*/8).sint32(message.x);
            if (message.y != null && Object.hasOwnProperty.call(message, "y"))
                writer.uint32(/* id 2, wireType 0 =*/16).sint32(message.y);
            if (message.z != null && Object.hasOwnProperty.call(message, "z"))
                writer.uint32(/* id 3, wireType 0 =*/24).sint32(message.z);
            return writer;
        };

        /**
         * Encodes the specified Point message, length delimited. Does not implicitly {@link game.Point.verify|verify} messages.
         * @function encodeDelimited
         * @memberof game.Point
         * @static
         * @param {game.IPoint} message Point message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Point.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Point message from the specified reader or buffer.
         * @function decode
         * @memberof game.Point
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {game.Point} Point
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Point.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.game.Point();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.x = reader.sint32();
                    break;
                case 2:
                    message.y = reader.sint32();
                    break;
                case 3:
                    message.z = reader.sint32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Point message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof game.Point
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {game.Point} Point
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Point.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Point message.
         * @function verify
         * @memberof game.Point
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Point.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.x != null && message.hasOwnProperty("x"))
                if (!$util.isInteger(message.x))
                    return "x: integer expected";
            if (message.y != null && message.hasOwnProperty("y"))
                if (!$util.isInteger(message.y))
                    return "y: integer expected";
            if (message.z != null && message.hasOwnProperty("z"))
                if (!$util.isInteger(message.z))
                    return "z: integer expected";
            return null;
        };

        /**
         * Creates a Point message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof game.Point
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {game.Point} Point
         */
        Point.fromObject = function fromObject(object) {
            if (object instanceof $root.game.Point)
                return object;
            var message = new $root.game.Point();
            if (object.x != null)
                message.x = object.x | 0;
            if (object.y != null)
                message.y = object.y | 0;
            if (object.z != null)
                message.z = object.z | 0;
            return message;
        };

        /**
         * Creates a plain object from a Point message. Also converts values to other types if specified.
         * @function toObject
         * @memberof game.Point
         * @static
         * @param {game.Point} message Point
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Point.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.x = 0;
                object.y = 0;
                object.z = 0;
            }
            if (message.x != null && message.hasOwnProperty("x"))
                object.x = message.x;
            if (message.y != null && message.hasOwnProperty("y"))
                object.y = message.y;
            if (message.z != null && message.hasOwnProperty("z"))
                object.z = message.z;
            return object;
        };

        /**
         * Converts this Point to JSON.
         * @function toJSON
         * @memberof game.Point
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Point.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Point;
    })();

    game.Move = (function() {

        /**
         * Properties of a Move.
         * @memberof game
         * @interface IMove
         * @property {string|null} [id] Move id
         * @property {number|null} [moveType] Move moveType
         * @property {game.IPoint|null} [stratPos] Move stratPos
         * @property {game.IPoint|null} [rotation] Move rotation
         */

        /**
         * Constructs a new Move.
         * @memberof game
         * @classdesc Represents a Move.
         * @implements IMove
         * @constructor
         * @param {game.IMove=} [properties] Properties to set
         */
        function Move(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Move id.
         * @member {string} id
         * @memberof game.Move
         * @instance
         */
        Move.prototype.id = "";

        /**
         * Move moveType.
         * @member {number} moveType
         * @memberof game.Move
         * @instance
         */
        Move.prototype.moveType = 0;

        /**
         * Move stratPos.
         * @member {game.IPoint|null|undefined} stratPos
         * @memberof game.Move
         * @instance
         */
        Move.prototype.stratPos = null;

        /**
         * Move rotation.
         * @member {game.IPoint|null|undefined} rotation
         * @memberof game.Move
         * @instance
         */
        Move.prototype.rotation = null;

        /**
         * Creates a new Move instance using the specified properties.
         * @function create
         * @memberof game.Move
         * @static
         * @param {game.IMove=} [properties] Properties to set
         * @returns {game.Move} Move instance
         */
        Move.create = function create(properties) {
            return new Move(properties);
        };

        /**
         * Encodes the specified Move message. Does not implicitly {@link game.Move.verify|verify} messages.
         * @function encode
         * @memberof game.Move
         * @static
         * @param {game.IMove} message Move message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Move.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
            if (message.moveType != null && Object.hasOwnProperty.call(message, "moveType"))
                writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.moveType);
            if (message.stratPos != null && Object.hasOwnProperty.call(message, "stratPos"))
                $root.game.Point.encode(message.stratPos, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            if (message.rotation != null && Object.hasOwnProperty.call(message, "rotation"))
                $root.game.Point.encode(message.rotation, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified Move message, length delimited. Does not implicitly {@link game.Move.verify|verify} messages.
         * @function encodeDelimited
         * @memberof game.Move
         * @static
         * @param {game.IMove} message Move message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Move.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Move message from the specified reader or buffer.
         * @function decode
         * @memberof game.Move
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {game.Move} Move
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Move.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.game.Move();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.id = reader.string();
                    break;
                case 2:
                    message.moveType = reader.uint32();
                    break;
                case 3:
                    message.stratPos = $root.game.Point.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.rotation = $root.game.Point.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Move message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof game.Move
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {game.Move} Move
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Move.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Move message.
         * @function verify
         * @memberof game.Move
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Move.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isString(message.id))
                    return "id: string expected";
            if (message.moveType != null && message.hasOwnProperty("moveType"))
                if (!$util.isInteger(message.moveType))
                    return "moveType: integer expected";
            if (message.stratPos != null && message.hasOwnProperty("stratPos")) {
                var error = $root.game.Point.verify(message.stratPos);
                if (error)
                    return "stratPos." + error;
            }
            if (message.rotation != null && message.hasOwnProperty("rotation")) {
                var error = $root.game.Point.verify(message.rotation);
                if (error)
                    return "rotation." + error;
            }
            return null;
        };

        /**
         * Creates a Move message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof game.Move
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {game.Move} Move
         */
        Move.fromObject = function fromObject(object) {
            if (object instanceof $root.game.Move)
                return object;
            var message = new $root.game.Move();
            if (object.id != null)
                message.id = String(object.id);
            if (object.moveType != null)
                message.moveType = object.moveType >>> 0;
            if (object.stratPos != null) {
                if (typeof object.stratPos !== "object")
                    throw TypeError(".game.Move.stratPos: object expected");
                message.stratPos = $root.game.Point.fromObject(object.stratPos);
            }
            if (object.rotation != null) {
                if (typeof object.rotation !== "object")
                    throw TypeError(".game.Move.rotation: object expected");
                message.rotation = $root.game.Point.fromObject(object.rotation);
            }
            return message;
        };

        /**
         * Creates a plain object from a Move message. Also converts values to other types if specified.
         * @function toObject
         * @memberof game.Move
         * @static
         * @param {game.Move} message Move
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Move.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.id = "";
                object.moveType = 0;
                object.stratPos = null;
                object.rotation = null;
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.moveType != null && message.hasOwnProperty("moveType"))
                object.moveType = message.moveType;
            if (message.stratPos != null && message.hasOwnProperty("stratPos"))
                object.stratPos = $root.game.Point.toObject(message.stratPos, options);
            if (message.rotation != null && message.hasOwnProperty("rotation"))
                object.rotation = $root.game.Point.toObject(message.rotation, options);
            return object;
        };

        /**
         * Converts this Move to JSON.
         * @function toJSON
         * @memberof game.Move
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Move.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Move;
    })();

    game.LoginRequest = (function() {

        /**
         * Properties of a LoginRequest.
         * @memberof game
         * @interface ILoginRequest
         * @property {string|null} [nickname] LoginRequest nickname
         * @property {string|null} [character] LoginRequest character
         */

        /**
         * Constructs a new LoginRequest.
         * @memberof game
         * @classdesc Represents a LoginRequest.
         * @implements ILoginRequest
         * @constructor
         * @param {game.ILoginRequest=} [properties] Properties to set
         */
        function LoginRequest(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * LoginRequest nickname.
         * @member {string} nickname
         * @memberof game.LoginRequest
         * @instance
         */
        LoginRequest.prototype.nickname = "";

        /**
         * LoginRequest character.
         * @member {string} character
         * @memberof game.LoginRequest
         * @instance
         */
        LoginRequest.prototype.character = "";

        /**
         * Creates a new LoginRequest instance using the specified properties.
         * @function create
         * @memberof game.LoginRequest
         * @static
         * @param {game.ILoginRequest=} [properties] Properties to set
         * @returns {game.LoginRequest} LoginRequest instance
         */
        LoginRequest.create = function create(properties) {
            return new LoginRequest(properties);
        };

        /**
         * Encodes the specified LoginRequest message. Does not implicitly {@link game.LoginRequest.verify|verify} messages.
         * @function encode
         * @memberof game.LoginRequest
         * @static
         * @param {game.ILoginRequest} message LoginRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        LoginRequest.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.nickname != null && Object.hasOwnProperty.call(message, "nickname"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.nickname);
            if (message.character != null && Object.hasOwnProperty.call(message, "character"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.character);
            return writer;
        };

        /**
         * Encodes the specified LoginRequest message, length delimited. Does not implicitly {@link game.LoginRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof game.LoginRequest
         * @static
         * @param {game.ILoginRequest} message LoginRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        LoginRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a LoginRequest message from the specified reader or buffer.
         * @function decode
         * @memberof game.LoginRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {game.LoginRequest} LoginRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        LoginRequest.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.game.LoginRequest();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.nickname = reader.string();
                    break;
                case 2:
                    message.character = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a LoginRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof game.LoginRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {game.LoginRequest} LoginRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        LoginRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a LoginRequest message.
         * @function verify
         * @memberof game.LoginRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        LoginRequest.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.nickname != null && message.hasOwnProperty("nickname"))
                if (!$util.isString(message.nickname))
                    return "nickname: string expected";
            if (message.character != null && message.hasOwnProperty("character"))
                if (!$util.isString(message.character))
                    return "character: string expected";
            return null;
        };

        /**
         * Creates a LoginRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof game.LoginRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {game.LoginRequest} LoginRequest
         */
        LoginRequest.fromObject = function fromObject(object) {
            if (object instanceof $root.game.LoginRequest)
                return object;
            var message = new $root.game.LoginRequest();
            if (object.nickname != null)
                message.nickname = String(object.nickname);
            if (object.character != null)
                message.character = String(object.character);
            return message;
        };

        /**
         * Creates a plain object from a LoginRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof game.LoginRequest
         * @static
         * @param {game.LoginRequest} message LoginRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        LoginRequest.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.nickname = "";
                object.character = "";
            }
            if (message.nickname != null && message.hasOwnProperty("nickname"))
                object.nickname = message.nickname;
            if (message.character != null && message.hasOwnProperty("character"))
                object.character = message.character;
            return object;
        };

        /**
         * Converts this LoginRequest to JSON.
         * @function toJSON
         * @memberof game.LoginRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        LoginRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return LoginRequest;
    })();

    game.LoginResponse = (function() {

        /**
         * Properties of a LoginResponse.
         * @memberof game
         * @interface ILoginResponse
         * @property {string|null} [id] LoginResponse id
         * @property {string|null} [nickname] LoginResponse nickname
         * @property {string|null} [character] LoginResponse character
         * @property {string|null} [token] LoginResponse token
         */

        /**
         * Constructs a new LoginResponse.
         * @memberof game
         * @classdesc Represents a LoginResponse.
         * @implements ILoginResponse
         * @constructor
         * @param {game.ILoginResponse=} [properties] Properties to set
         */
        function LoginResponse(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * LoginResponse id.
         * @member {string} id
         * @memberof game.LoginResponse
         * @instance
         */
        LoginResponse.prototype.id = "";

        /**
         * LoginResponse nickname.
         * @member {string} nickname
         * @memberof game.LoginResponse
         * @instance
         */
        LoginResponse.prototype.nickname = "";

        /**
         * LoginResponse character.
         * @member {string} character
         * @memberof game.LoginResponse
         * @instance
         */
        LoginResponse.prototype.character = "";

        /**
         * LoginResponse token.
         * @member {string} token
         * @memberof game.LoginResponse
         * @instance
         */
        LoginResponse.prototype.token = "";

        /**
         * Creates a new LoginResponse instance using the specified properties.
         * @function create
         * @memberof game.LoginResponse
         * @static
         * @param {game.ILoginResponse=} [properties] Properties to set
         * @returns {game.LoginResponse} LoginResponse instance
         */
        LoginResponse.create = function create(properties) {
            return new LoginResponse(properties);
        };

        /**
         * Encodes the specified LoginResponse message. Does not implicitly {@link game.LoginResponse.verify|verify} messages.
         * @function encode
         * @memberof game.LoginResponse
         * @static
         * @param {game.ILoginResponse} message LoginResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        LoginResponse.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
            if (message.nickname != null && Object.hasOwnProperty.call(message, "nickname"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.nickname);
            if (message.character != null && Object.hasOwnProperty.call(message, "character"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.character);
            if (message.token != null && Object.hasOwnProperty.call(message, "token"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.token);
            return writer;
        };

        /**
         * Encodes the specified LoginResponse message, length delimited. Does not implicitly {@link game.LoginResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof game.LoginResponse
         * @static
         * @param {game.ILoginResponse} message LoginResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        LoginResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a LoginResponse message from the specified reader or buffer.
         * @function decode
         * @memberof game.LoginResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {game.LoginResponse} LoginResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        LoginResponse.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.game.LoginResponse();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.id = reader.string();
                    break;
                case 2:
                    message.nickname = reader.string();
                    break;
                case 3:
                    message.character = reader.string();
                    break;
                case 4:
                    message.token = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a LoginResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof game.LoginResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {game.LoginResponse} LoginResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        LoginResponse.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a LoginResponse message.
         * @function verify
         * @memberof game.LoginResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        LoginResponse.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isString(message.id))
                    return "id: string expected";
            if (message.nickname != null && message.hasOwnProperty("nickname"))
                if (!$util.isString(message.nickname))
                    return "nickname: string expected";
            if (message.character != null && message.hasOwnProperty("character"))
                if (!$util.isString(message.character))
                    return "character: string expected";
            if (message.token != null && message.hasOwnProperty("token"))
                if (!$util.isString(message.token))
                    return "token: string expected";
            return null;
        };

        /**
         * Creates a LoginResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof game.LoginResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {game.LoginResponse} LoginResponse
         */
        LoginResponse.fromObject = function fromObject(object) {
            if (object instanceof $root.game.LoginResponse)
                return object;
            var message = new $root.game.LoginResponse();
            if (object.id != null)
                message.id = String(object.id);
            if (object.nickname != null)
                message.nickname = String(object.nickname);
            if (object.character != null)
                message.character = String(object.character);
            if (object.token != null)
                message.token = String(object.token);
            return message;
        };

        /**
         * Creates a plain object from a LoginResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof game.LoginResponse
         * @static
         * @param {game.LoginResponse} message LoginResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        LoginResponse.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.id = "";
                object.nickname = "";
                object.character = "";
                object.token = "";
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.nickname != null && message.hasOwnProperty("nickname"))
                object.nickname = message.nickname;
            if (message.character != null && message.hasOwnProperty("character"))
                object.character = message.character;
            if (message.token != null && message.hasOwnProperty("token"))
                object.token = message.token;
            return object;
        };

        /**
         * Converts this LoginResponse to JSON.
         * @function toJSON
         * @memberof game.LoginResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        LoginResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return LoginResponse;
    })();

    game.Placeable = (function() {

        /**
         * Properties of a Placeable.
         * @memberof game
         * @interface IPlaceable
         * @property {string|null} [id] Placeable id
         * @property {string|null} [nickname] Placeable nickname
         * @property {number|Long|null} [x] Placeable x
         * @property {number|Long|null} [y] Placeable y
         * @property {number|Long|null} [z] Placeable z
         */

        /**
         * Constructs a new Placeable.
         * @memberof game
         * @classdesc Represents a Placeable.
         * @implements IPlaceable
         * @constructor
         * @param {game.IPlaceable=} [properties] Properties to set
         */
        function Placeable(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Placeable id.
         * @member {string} id
         * @memberof game.Placeable
         * @instance
         */
        Placeable.prototype.id = "";

        /**
         * Placeable nickname.
         * @member {string} nickname
         * @memberof game.Placeable
         * @instance
         */
        Placeable.prototype.nickname = "";

        /**
         * Placeable x.
         * @member {number|Long} x
         * @memberof game.Placeable
         * @instance
         */
        Placeable.prototype.x = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Placeable y.
         * @member {number|Long} y
         * @memberof game.Placeable
         * @instance
         */
        Placeable.prototype.y = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Placeable z.
         * @member {number|Long} z
         * @memberof game.Placeable
         * @instance
         */
        Placeable.prototype.z = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new Placeable instance using the specified properties.
         * @function create
         * @memberof game.Placeable
         * @static
         * @param {game.IPlaceable=} [properties] Properties to set
         * @returns {game.Placeable} Placeable instance
         */
        Placeable.create = function create(properties) {
            return new Placeable(properties);
        };

        /**
         * Encodes the specified Placeable message. Does not implicitly {@link game.Placeable.verify|verify} messages.
         * @function encode
         * @memberof game.Placeable
         * @static
         * @param {game.IPlaceable} message Placeable message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Placeable.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
            if (message.nickname != null && Object.hasOwnProperty.call(message, "nickname"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.nickname);
            if (message.x != null && Object.hasOwnProperty.call(message, "x"))
                writer.uint32(/* id 3, wireType 0 =*/24).sint64(message.x);
            if (message.y != null && Object.hasOwnProperty.call(message, "y"))
                writer.uint32(/* id 4, wireType 0 =*/32).sint64(message.y);
            if (message.z != null && Object.hasOwnProperty.call(message, "z"))
                writer.uint32(/* id 5, wireType 0 =*/40).sint64(message.z);
            return writer;
        };

        /**
         * Encodes the specified Placeable message, length delimited. Does not implicitly {@link game.Placeable.verify|verify} messages.
         * @function encodeDelimited
         * @memberof game.Placeable
         * @static
         * @param {game.IPlaceable} message Placeable message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Placeable.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Placeable message from the specified reader or buffer.
         * @function decode
         * @memberof game.Placeable
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {game.Placeable} Placeable
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Placeable.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.game.Placeable();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.id = reader.string();
                    break;
                case 2:
                    message.nickname = reader.string();
                    break;
                case 3:
                    message.x = reader.sint64();
                    break;
                case 4:
                    message.y = reader.sint64();
                    break;
                case 5:
                    message.z = reader.sint64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Placeable message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof game.Placeable
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {game.Placeable} Placeable
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Placeable.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Placeable message.
         * @function verify
         * @memberof game.Placeable
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Placeable.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isString(message.id))
                    return "id: string expected";
            if (message.nickname != null && message.hasOwnProperty("nickname"))
                if (!$util.isString(message.nickname))
                    return "nickname: string expected";
            if (message.x != null && message.hasOwnProperty("x"))
                if (!$util.isInteger(message.x) && !(message.x && $util.isInteger(message.x.low) && $util.isInteger(message.x.high)))
                    return "x: integer|Long expected";
            if (message.y != null && message.hasOwnProperty("y"))
                if (!$util.isInteger(message.y) && !(message.y && $util.isInteger(message.y.low) && $util.isInteger(message.y.high)))
                    return "y: integer|Long expected";
            if (message.z != null && message.hasOwnProperty("z"))
                if (!$util.isInteger(message.z) && !(message.z && $util.isInteger(message.z.low) && $util.isInteger(message.z.high)))
                    return "z: integer|Long expected";
            return null;
        };

        /**
         * Creates a Placeable message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof game.Placeable
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {game.Placeable} Placeable
         */
        Placeable.fromObject = function fromObject(object) {
            if (object instanceof $root.game.Placeable)
                return object;
            var message = new $root.game.Placeable();
            if (object.id != null)
                message.id = String(object.id);
            if (object.nickname != null)
                message.nickname = String(object.nickname);
            if (object.x != null)
                if ($util.Long)
                    (message.x = $util.Long.fromValue(object.x)).unsigned = false;
                else if (typeof object.x === "string")
                    message.x = parseInt(object.x, 10);
                else if (typeof object.x === "number")
                    message.x = object.x;
                else if (typeof object.x === "object")
                    message.x = new $util.LongBits(object.x.low >>> 0, object.x.high >>> 0).toNumber();
            if (object.y != null)
                if ($util.Long)
                    (message.y = $util.Long.fromValue(object.y)).unsigned = false;
                else if (typeof object.y === "string")
                    message.y = parseInt(object.y, 10);
                else if (typeof object.y === "number")
                    message.y = object.y;
                else if (typeof object.y === "object")
                    message.y = new $util.LongBits(object.y.low >>> 0, object.y.high >>> 0).toNumber();
            if (object.z != null)
                if ($util.Long)
                    (message.z = $util.Long.fromValue(object.z)).unsigned = false;
                else if (typeof object.z === "string")
                    message.z = parseInt(object.z, 10);
                else if (typeof object.z === "number")
                    message.z = object.z;
                else if (typeof object.z === "object")
                    message.z = new $util.LongBits(object.z.low >>> 0, object.z.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from a Placeable message. Also converts values to other types if specified.
         * @function toObject
         * @memberof game.Placeable
         * @static
         * @param {game.Placeable} message Placeable
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Placeable.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.id = "";
                object.nickname = "";
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.x = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.x = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.y = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.y = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.z = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.z = options.longs === String ? "0" : 0;
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.nickname != null && message.hasOwnProperty("nickname"))
                object.nickname = message.nickname;
            if (message.x != null && message.hasOwnProperty("x"))
                if (typeof message.x === "number")
                    object.x = options.longs === String ? String(message.x) : message.x;
                else
                    object.x = options.longs === String ? $util.Long.prototype.toString.call(message.x) : options.longs === Number ? new $util.LongBits(message.x.low >>> 0, message.x.high >>> 0).toNumber() : message.x;
            if (message.y != null && message.hasOwnProperty("y"))
                if (typeof message.y === "number")
                    object.y = options.longs === String ? String(message.y) : message.y;
                else
                    object.y = options.longs === String ? $util.Long.prototype.toString.call(message.y) : options.longs === Number ? new $util.LongBits(message.y.low >>> 0, message.y.high >>> 0).toNumber() : message.y;
            if (message.z != null && message.hasOwnProperty("z"))
                if (typeof message.z === "number")
                    object.z = options.longs === String ? String(message.z) : message.z;
                else
                    object.z = options.longs === String ? $util.Long.prototype.toString.call(message.z) : options.longs === Number ? new $util.LongBits(message.z.low >>> 0, message.z.high >>> 0).toNumber() : message.z;
            return object;
        };

        /**
         * Converts this Placeable to JSON.
         * @function toJSON
         * @memberof game.Placeable
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Placeable.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Placeable;
    })();

    game.Placeables = (function() {

        /**
         * Properties of a Placeables.
         * @memberof game
         * @interface IPlaceables
         * @property {Array.<game.IPlaceable>|null} [result] Placeables result
         */

        /**
         * Constructs a new Placeables.
         * @memberof game
         * @classdesc Represents a Placeables.
         * @implements IPlaceables
         * @constructor
         * @param {game.IPlaceables=} [properties] Properties to set
         */
        function Placeables(properties) {
            this.result = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Placeables result.
         * @member {Array.<game.IPlaceable>} result
         * @memberof game.Placeables
         * @instance
         */
        Placeables.prototype.result = $util.emptyArray;

        /**
         * Creates a new Placeables instance using the specified properties.
         * @function create
         * @memberof game.Placeables
         * @static
         * @param {game.IPlaceables=} [properties] Properties to set
         * @returns {game.Placeables} Placeables instance
         */
        Placeables.create = function create(properties) {
            return new Placeables(properties);
        };

        /**
         * Encodes the specified Placeables message. Does not implicitly {@link game.Placeables.verify|verify} messages.
         * @function encode
         * @memberof game.Placeables
         * @static
         * @param {game.IPlaceables} message Placeables message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Placeables.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.result != null && message.result.length)
                for (var i = 0; i < message.result.length; ++i)
                    $root.game.Placeable.encode(message.result[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified Placeables message, length delimited. Does not implicitly {@link game.Placeables.verify|verify} messages.
         * @function encodeDelimited
         * @memberof game.Placeables
         * @static
         * @param {game.IPlaceables} message Placeables message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Placeables.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Placeables message from the specified reader or buffer.
         * @function decode
         * @memberof game.Placeables
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {game.Placeables} Placeables
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Placeables.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.game.Placeables();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.result && message.result.length))
                        message.result = [];
                    message.result.push($root.game.Placeable.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Placeables message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof game.Placeables
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {game.Placeables} Placeables
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Placeables.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Placeables message.
         * @function verify
         * @memberof game.Placeables
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Placeables.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.result != null && message.hasOwnProperty("result")) {
                if (!Array.isArray(message.result))
                    return "result: array expected";
                for (var i = 0; i < message.result.length; ++i) {
                    var error = $root.game.Placeable.verify(message.result[i]);
                    if (error)
                        return "result." + error;
                }
            }
            return null;
        };

        /**
         * Creates a Placeables message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof game.Placeables
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {game.Placeables} Placeables
         */
        Placeables.fromObject = function fromObject(object) {
            if (object instanceof $root.game.Placeables)
                return object;
            var message = new $root.game.Placeables();
            if (object.result) {
                if (!Array.isArray(object.result))
                    throw TypeError(".game.Placeables.result: array expected");
                message.result = [];
                for (var i = 0; i < object.result.length; ++i) {
                    if (typeof object.result[i] !== "object")
                        throw TypeError(".game.Placeables.result: object expected");
                    message.result[i] = $root.game.Placeable.fromObject(object.result[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a Placeables message. Also converts values to other types if specified.
         * @function toObject
         * @memberof game.Placeables
         * @static
         * @param {game.Placeables} message Placeables
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Placeables.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.result = [];
            if (message.result && message.result.length) {
                object.result = [];
                for (var j = 0; j < message.result.length; ++j)
                    object.result[j] = $root.game.Placeable.toObject(message.result[j], options);
            }
            return object;
        };

        /**
         * Converts this Placeables to JSON.
         * @function toJSON
         * @memberof game.Placeables
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Placeables.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Placeables;
    })();

    game.Message = (function() {

        /**
         * Properties of a Message.
         * @memberof game
         * @interface IMessage
         * @property {string|null} [id] Message id
         * @property {string|null} [nickname] Message nickname
         * @property {string|null} [data] Message data
         */

        /**
         * Constructs a new Message.
         * @memberof game
         * @classdesc Represents a Message.
         * @implements IMessage
         * @constructor
         * @param {game.IMessage=} [properties] Properties to set
         */
        function Message(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Message id.
         * @member {string} id
         * @memberof game.Message
         * @instance
         */
        Message.prototype.id = "";

        /**
         * Message nickname.
         * @member {string} nickname
         * @memberof game.Message
         * @instance
         */
        Message.prototype.nickname = "";

        /**
         * Message data.
         * @member {string} data
         * @memberof game.Message
         * @instance
         */
        Message.prototype.data = "";

        /**
         * Creates a new Message instance using the specified properties.
         * @function create
         * @memberof game.Message
         * @static
         * @param {game.IMessage=} [properties] Properties to set
         * @returns {game.Message} Message instance
         */
        Message.create = function create(properties) {
            return new Message(properties);
        };

        /**
         * Encodes the specified Message message. Does not implicitly {@link game.Message.verify|verify} messages.
         * @function encode
         * @memberof game.Message
         * @static
         * @param {game.IMessage} message Message message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Message.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
            if (message.nickname != null && Object.hasOwnProperty.call(message, "nickname"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.nickname);
            if (message.data != null && Object.hasOwnProperty.call(message, "data"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.data);
            return writer;
        };

        /**
         * Encodes the specified Message message, length delimited. Does not implicitly {@link game.Message.verify|verify} messages.
         * @function encodeDelimited
         * @memberof game.Message
         * @static
         * @param {game.IMessage} message Message message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Message.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Message message from the specified reader or buffer.
         * @function decode
         * @memberof game.Message
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {game.Message} Message
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Message.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.game.Message();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.id = reader.string();
                    break;
                case 2:
                    message.nickname = reader.string();
                    break;
                case 3:
                    message.data = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Message message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof game.Message
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {game.Message} Message
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Message.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Message message.
         * @function verify
         * @memberof game.Message
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Message.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isString(message.id))
                    return "id: string expected";
            if (message.nickname != null && message.hasOwnProperty("nickname"))
                if (!$util.isString(message.nickname))
                    return "nickname: string expected";
            if (message.data != null && message.hasOwnProperty("data"))
                if (!$util.isString(message.data))
                    return "data: string expected";
            return null;
        };

        /**
         * Creates a Message message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof game.Message
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {game.Message} Message
         */
        Message.fromObject = function fromObject(object) {
            if (object instanceof $root.game.Message)
                return object;
            var message = new $root.game.Message();
            if (object.id != null)
                message.id = String(object.id);
            if (object.nickname != null)
                message.nickname = String(object.nickname);
            if (object.data != null)
                message.data = String(object.data);
            return message;
        };

        /**
         * Creates a plain object from a Message message. Also converts values to other types if specified.
         * @function toObject
         * @memberof game.Message
         * @static
         * @param {game.Message} message Message
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Message.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.id = "";
                object.nickname = "";
                object.data = "";
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.nickname != null && message.hasOwnProperty("nickname"))
                object.nickname = message.nickname;
            if (message.data != null && message.hasOwnProperty("data"))
                object.data = message.data;
            return object;
        };

        /**
         * Converts this Message to JSON.
         * @function toJSON
         * @memberof game.Message
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Message.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Message;
    })();

    game.Messages = (function() {

        /**
         * Properties of a Messages.
         * @memberof game
         * @interface IMessages
         * @property {Array.<game.IMessage>|null} [result] Messages result
         */

        /**
         * Constructs a new Messages.
         * @memberof game
         * @classdesc Represents a Messages.
         * @implements IMessages
         * @constructor
         * @param {game.IMessages=} [properties] Properties to set
         */
        function Messages(properties) {
            this.result = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Messages result.
         * @member {Array.<game.IMessage>} result
         * @memberof game.Messages
         * @instance
         */
        Messages.prototype.result = $util.emptyArray;

        /**
         * Creates a new Messages instance using the specified properties.
         * @function create
         * @memberof game.Messages
         * @static
         * @param {game.IMessages=} [properties] Properties to set
         * @returns {game.Messages} Messages instance
         */
        Messages.create = function create(properties) {
            return new Messages(properties);
        };

        /**
         * Encodes the specified Messages message. Does not implicitly {@link game.Messages.verify|verify} messages.
         * @function encode
         * @memberof game.Messages
         * @static
         * @param {game.IMessages} message Messages message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Messages.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.result != null && message.result.length)
                for (var i = 0; i < message.result.length; ++i)
                    $root.game.Message.encode(message.result[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified Messages message, length delimited. Does not implicitly {@link game.Messages.verify|verify} messages.
         * @function encodeDelimited
         * @memberof game.Messages
         * @static
         * @param {game.IMessages} message Messages message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Messages.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Messages message from the specified reader or buffer.
         * @function decode
         * @memberof game.Messages
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {game.Messages} Messages
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Messages.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.game.Messages();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.result && message.result.length))
                        message.result = [];
                    message.result.push($root.game.Message.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Messages message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof game.Messages
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {game.Messages} Messages
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Messages.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Messages message.
         * @function verify
         * @memberof game.Messages
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Messages.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.result != null && message.hasOwnProperty("result")) {
                if (!Array.isArray(message.result))
                    return "result: array expected";
                for (var i = 0; i < message.result.length; ++i) {
                    var error = $root.game.Message.verify(message.result[i]);
                    if (error)
                        return "result." + error;
                }
            }
            return null;
        };

        /**
         * Creates a Messages message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof game.Messages
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {game.Messages} Messages
         */
        Messages.fromObject = function fromObject(object) {
            if (object instanceof $root.game.Messages)
                return object;
            var message = new $root.game.Messages();
            if (object.result) {
                if (!Array.isArray(object.result))
                    throw TypeError(".game.Messages.result: array expected");
                message.result = [];
                for (var i = 0; i < object.result.length; ++i) {
                    if (typeof object.result[i] !== "object")
                        throw TypeError(".game.Messages.result: object expected");
                    message.result[i] = $root.game.Message.fromObject(object.result[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a Messages message. Also converts values to other types if specified.
         * @function toObject
         * @memberof game.Messages
         * @static
         * @param {game.Messages} message Messages
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Messages.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.result = [];
            if (message.result && message.result.length) {
                object.result = [];
                for (var j = 0; j < message.result.length; ++j)
                    object.result[j] = $root.game.Message.toObject(message.result[j], options);
            }
            return object;
        };

        /**
         * Converts this Messages to JSON.
         * @function toJSON
         * @memberof game.Messages
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Messages.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Messages;
    })();

    game.Response = (function() {

        /**
         * Properties of a Response.
         * @memberof game
         * @interface IResponse
         * @property {number|null} [code] Response code
         * @property {string|null} [message] Response message
         * @property {google.protobuf.IAny|null} [data] Response data
         */

        /**
         * Constructs a new Response.
         * @memberof game
         * @classdesc Represents a Response.
         * @implements IResponse
         * @constructor
         * @param {game.IResponse=} [properties] Properties to set
         */
        function Response(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Response code.
         * @member {number} code
         * @memberof game.Response
         * @instance
         */
        Response.prototype.code = 0;

        /**
         * Response message.
         * @member {string} message
         * @memberof game.Response
         * @instance
         */
        Response.prototype.message = "";

        /**
         * Response data.
         * @member {google.protobuf.IAny|null|undefined} data
         * @memberof game.Response
         * @instance
         */
        Response.prototype.data = null;

        /**
         * Creates a new Response instance using the specified properties.
         * @function create
         * @memberof game.Response
         * @static
         * @param {game.IResponse=} [properties] Properties to set
         * @returns {game.Response} Response instance
         */
        Response.create = function create(properties) {
            return new Response(properties);
        };

        /**
         * Encodes the specified Response message. Does not implicitly {@link game.Response.verify|verify} messages.
         * @function encode
         * @memberof game.Response
         * @static
         * @param {game.IResponse} message Response message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Response.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.code != null && Object.hasOwnProperty.call(message, "code"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.code);
            if (message.message != null && Object.hasOwnProperty.call(message, "message"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.message);
            if (message.data != null && Object.hasOwnProperty.call(message, "data"))
                $root.google.protobuf.Any.encode(message.data, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified Response message, length delimited. Does not implicitly {@link game.Response.verify|verify} messages.
         * @function encodeDelimited
         * @memberof game.Response
         * @static
         * @param {game.IResponse} message Response message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Response.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Response message from the specified reader or buffer.
         * @function decode
         * @memberof game.Response
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {game.Response} Response
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Response.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.game.Response();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.code = reader.uint32();
                    break;
                case 2:
                    message.message = reader.string();
                    break;
                case 3:
                    message.data = $root.google.protobuf.Any.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Response message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof game.Response
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {game.Response} Response
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Response.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Response message.
         * @function verify
         * @memberof game.Response
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Response.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.code != null && message.hasOwnProperty("code"))
                if (!$util.isInteger(message.code))
                    return "code: integer expected";
            if (message.message != null && message.hasOwnProperty("message"))
                if (!$util.isString(message.message))
                    return "message: string expected";
            if (message.data != null && message.hasOwnProperty("data")) {
                var error = $root.google.protobuf.Any.verify(message.data);
                if (error)
                    return "data." + error;
            }
            return null;
        };

        /**
         * Creates a Response message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof game.Response
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {game.Response} Response
         */
        Response.fromObject = function fromObject(object) {
            if (object instanceof $root.game.Response)
                return object;
            var message = new $root.game.Response();
            if (object.code != null)
                message.code = object.code >>> 0;
            if (object.message != null)
                message.message = String(object.message);
            if (object.data != null) {
                if (typeof object.data !== "object")
                    throw TypeError(".game.Response.data: object expected");
                message.data = $root.google.protobuf.Any.fromObject(object.data);
            }
            return message;
        };

        /**
         * Creates a plain object from a Response message. Also converts values to other types if specified.
         * @function toObject
         * @memberof game.Response
         * @static
         * @param {game.Response} message Response
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Response.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.code = 0;
                object.message = "";
                object.data = null;
            }
            if (message.code != null && message.hasOwnProperty("code"))
                object.code = message.code;
            if (message.message != null && message.hasOwnProperty("message"))
                object.message = message.message;
            if (message.data != null && message.hasOwnProperty("data"))
                object.data = $root.google.protobuf.Any.toObject(message.data, options);
            return object;
        };

        /**
         * Converts this Response to JSON.
         * @function toJSON
         * @memberof game.Response
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Response.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Response;
    })();

    return game;
})();

$root.google = (function() {

    /**
     * Namespace google.
     * @exports google
     * @namespace
     */
    var google = {};

    google.protobuf = (function() {

        /**
         * Namespace protobuf.
         * @memberof google
         * @namespace
         */
        var protobuf = {};

        protobuf.Any = (function() {

            /**
             * Properties of an Any.
             * @memberof google.protobuf
             * @interface IAny
             * @property {string|null} [type_url] Any type_url
             * @property {Uint8Array|null} [value] Any value
             */

            /**
             * Constructs a new Any.
             * @memberof google.protobuf
             * @classdesc Represents an Any.
             * @implements IAny
             * @constructor
             * @param {google.protobuf.IAny=} [properties] Properties to set
             */
            function Any(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Any type_url.
             * @member {string} type_url
             * @memberof google.protobuf.Any
             * @instance
             */
            Any.prototype.type_url = "";

            /**
             * Any value.
             * @member {Uint8Array} value
             * @memberof google.protobuf.Any
             * @instance
             */
            Any.prototype.value = $util.newBuffer([]);

            /**
             * Creates a new Any instance using the specified properties.
             * @function create
             * @memberof google.protobuf.Any
             * @static
             * @param {google.protobuf.IAny=} [properties] Properties to set
             * @returns {google.protobuf.Any} Any instance
             */
            Any.create = function create(properties) {
                return new Any(properties);
            };

            /**
             * Encodes the specified Any message. Does not implicitly {@link google.protobuf.Any.verify|verify} messages.
             * @function encode
             * @memberof google.protobuf.Any
             * @static
             * @param {google.protobuf.IAny} message Any message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Any.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.type_url != null && Object.hasOwnProperty.call(message, "type_url"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.type_url);
                if (message.value != null && Object.hasOwnProperty.call(message, "value"))
                    writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.value);
                return writer;
            };

            /**
             * Encodes the specified Any message, length delimited. Does not implicitly {@link google.protobuf.Any.verify|verify} messages.
             * @function encodeDelimited
             * @memberof google.protobuf.Any
             * @static
             * @param {google.protobuf.IAny} message Any message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Any.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an Any message from the specified reader or buffer.
             * @function decode
             * @memberof google.protobuf.Any
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.Any} Any
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Any.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.google.protobuf.Any();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.type_url = reader.string();
                        break;
                    case 2:
                        message.value = reader.bytes();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes an Any message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof google.protobuf.Any
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {google.protobuf.Any} Any
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Any.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies an Any message.
             * @function verify
             * @memberof google.protobuf.Any
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Any.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.type_url != null && message.hasOwnProperty("type_url"))
                    if (!$util.isString(message.type_url))
                        return "type_url: string expected";
                if (message.value != null && message.hasOwnProperty("value"))
                    if (!(message.value && typeof message.value.length === "number" || $util.isString(message.value)))
                        return "value: buffer expected";
                return null;
            };

            /**
             * Creates an Any message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof google.protobuf.Any
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {google.protobuf.Any} Any
             */
            Any.fromObject = function fromObject(object) {
                if (object instanceof $root.google.protobuf.Any)
                    return object;
                var message = new $root.google.protobuf.Any();
                if (object.type_url != null)
                    message.type_url = String(object.type_url);
                if (object.value != null)
                    if (typeof object.value === "string")
                        $util.base64.decode(object.value, message.value = $util.newBuffer($util.base64.length(object.value)), 0);
                    else if (object.value.length)
                        message.value = object.value;
                return message;
            };

            /**
             * Creates a plain object from an Any message. Also converts values to other types if specified.
             * @function toObject
             * @memberof google.protobuf.Any
             * @static
             * @param {google.protobuf.Any} message Any
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Any.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.type_url = "";
                    if (options.bytes === String)
                        object.value = "";
                    else {
                        object.value = [];
                        if (options.bytes !== Array)
                            object.value = $util.newBuffer(object.value);
                    }
                }
                if (message.type_url != null && message.hasOwnProperty("type_url"))
                    object.type_url = message.type_url;
                if (message.value != null && message.hasOwnProperty("value"))
                    object.value = options.bytes === String ? $util.base64.encode(message.value, 0, message.value.length) : options.bytes === Array ? Array.prototype.slice.call(message.value) : message.value;
                return object;
            };

            /**
             * Converts this Any to JSON.
             * @function toJSON
             * @memberof google.protobuf.Any
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Any.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Any;
        })();

        return protobuf;
    })();

    return google;
})();

module.exports = $root;
