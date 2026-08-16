/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-mixed-operators, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars, default-case, jsdoc/require-param*/
import $protobuf from "protobufjs/minimal.js";

// Common aliases
const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;
const $Object = $util.global.Object, $undefined = $util.global.undefined, $Error = $util.global.Error, $TypeError = $util.global.TypeError, $String = $util.global.String, $Array = $util.global.Array, $Number = $util.global.Number, $Boolean = $util.global.Boolean, $parseInt = $util.global.parseInt, $BigInt = $util.global.BigInt;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const fns = $root.fns = (() => {

    /**
     * Namespace fns.
     * @exports fns
     * @namespace
     */
    const fns = {};

    fns.v3 = (function() {

        /**
         * Namespace v3.
         * @memberof fns
         * @namespace
         */
        const v3 = {};

        v3.WSMessage = (function() {

            /**
             * Properties of a WSMessage.
             * @typedef {Object} fns.v3.WSMessage.$Properties
             * @property {string|null} [type] WSMessage type
             * @property {Uint8Array|null} [data] WSMessage data
             * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
             */

            /**
             * Properties of a WSMessage.
             * @memberof fns.v3
             * @interface IWSMessage
             * @augments fns.v3.WSMessage.$Properties
             * @deprecated Use fns.v3.WSMessage.$Properties instead.
             */

            /**
             * Shape of a WSMessage.
             * @typedef {fns.v3.WSMessage.$Properties} fns.v3.WSMessage.$Shape
             */

            /**
             * Constructs a new WSMessage.
             * @memberof fns.v3
             * @classdesc Represents a WSMessage.
             * @constructor
             * @param {fns.v3.WSMessage.$Properties=} [properties] Properties to set
             * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
             */
            const WSMessage = function (properties) {
                if (properties)
                    for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            };

            /**
             * WSMessage type.
             * @member {string} type
             * @memberof fns.v3.WSMessage
             * @instance
             */
            WSMessage.prototype.type = "";

            /**
             * WSMessage data.
             * @member {Uint8Array} data
             * @memberof fns.v3.WSMessage
             * @instance
             */
            WSMessage.prototype.data = $util.newBuffer([]);

            /**
             * Creates a new WSMessage instance using the specified properties.
             * @function create
             * @memberof fns.v3.WSMessage
             * @static
             * @param {fns.v3.WSMessage.$Properties=} [properties] Properties to set
             * @returns {fns.v3.WSMessage} WSMessage instance
             * @type {{
             *   (properties: fns.v3.WSMessage.$Shape): fns.v3.WSMessage & fns.v3.WSMessage.$Shape;
             *   (properties?: fns.v3.WSMessage.$Properties): fns.v3.WSMessage;
             * }}
             */
            WSMessage.create = function(properties) {
                return new WSMessage(properties);
            };

            /**
             * Encodes the specified WSMessage message. Does not implicitly {@link fns.v3.WSMessage.verify|verify} messages.
             * @function encode
             * @memberof fns.v3.WSMessage
             * @static
             * @param {fns.v3.WSMessage.$Properties} message WSMessage message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            WSMessage.encode = function (message, writer, _depth) {
                if (!writer)
                    writer = $Writer.create();
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                if (message.type != null && $Object.hasOwnProperty.call(message, "type") && message.type !== "")
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.type);
                if (message.data != null && $Object.hasOwnProperty.call(message, "data") && message.data.length)
                    writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.data);
                if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                    for (let i = 0; i < message.$unknowns.length; ++i)
                        writer.raw(message.$unknowns[i]);
                return writer;
            };

            /**
             * Encodes the specified WSMessage message, length delimited. Does not implicitly {@link fns.v3.WSMessage.verify|verify} messages.
             * @function encodeDelimited
             * @memberof fns.v3.WSMessage
             * @static
             * @param {fns.v3.WSMessage.$Properties} message WSMessage message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            WSMessage.encodeDelimited = function(message, writer) {
                return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
            };

            /**
             * Decodes a WSMessage message from the specified reader or buffer.
             * @function decode
             * @memberof fns.v3.WSMessage
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {fns.v3.WSMessage & fns.v3.WSMessage.$Shape} WSMessage
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            WSMessage.decode = function (reader, length, _end, _depth, _target) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $Reader.recursionLimit)
                    throw $Error("max depth exceeded");
                let end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.fns.v3.WSMessage(), value;
                while (reader.pos < end) {
                    let start = reader.pos;
                    let tag = reader.tag();
                    if (tag === _end) {
                        _end = $undefined;
                        break;
                    }
                    let wireType = tag & 7;
                    switch (tag >>>= 3) {
                    case 1: {
                            if (wireType !== 2)
                                break;
                            if ((value = reader.stringVerify()).length)
                                message.type = value;
                            else
                                delete message.type;
                            continue;
                        }
                    case 2: {
                            if (wireType !== 2)
                                break;
                            if ((value = reader.bytes()).length)
                                message.data = value;
                            else
                                delete message.data;
                            continue;
                        }
                    }
                    reader.skipType(wireType, _depth, tag);
                    if (!reader.discardUnknown) {
                        $util.makeProp(message, "$unknowns", false);
                        (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                    }
                }
                if (_end !== $undefined)
                    throw $Error("missing end group");
                return message;
            };

            /**
             * Decodes a WSMessage message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof fns.v3.WSMessage
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {fns.v3.WSMessage & fns.v3.WSMessage.$Shape} WSMessage
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            WSMessage.decodeDelimited = function(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a WSMessage message.
             * @function verify
             * @memberof fns.v3.WSMessage
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            WSMessage.verify = function (message, _depth) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    return "max depth exceeded";
                if (message.type != null && $Object.hasOwnProperty.call(message, "type"))
                    if (!$util.isString(message.type))
                        return "type: string expected";
                if (message.data != null && $Object.hasOwnProperty.call(message, "data"))
                    if (!(message.data && typeof message.data.length === "number" || $util.isString(message.data)))
                        return "data: buffer expected";
                return null;
            };

            /**
             * Creates a WSMessage message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof fns.v3.WSMessage
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {fns.v3.WSMessage} WSMessage
             */
            WSMessage.fromObject = function (object, _depth) {
                if (object instanceof $root.fns.v3.WSMessage)
                    return object;
                if (!$util.isObject(object))
                    throw $TypeError(".fns.v3.WSMessage: object expected");
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                let message = new $root.fns.v3.WSMessage();
                if (object.type != null)
                    if (typeof object.type !== "string" || object.type.length)
                        message.type = $String(object.type);
                if (object.data != null)
                    if (object.data.length)
                        if (typeof object.data === "string")
                            $util.base64.decode(object.data, message.data = $util.newBuffer($util.base64.length(object.data)), 0);
                        else if (object.data.length >= 0)
                            message.data = object.data;
                return message;
            };

            /**
             * Creates a plain object from a WSMessage message. Also converts values to other types if specified.
             * @function toObject
             * @memberof fns.v3.WSMessage
             * @static
             * @param {fns.v3.WSMessage} message WSMessage
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            WSMessage.toObject = function (message, options, _depth) {
                if (!options)
                    options = {};
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                let object = {};
                if (options.defaults) {
                    object.type = "";
                    if (options.bytes === $String)
                        object.data = "";
                    else {
                        object.data = [];
                        if (options.bytes !== $Array)
                            object.data = $util.newBuffer(object.data);
                    }
                }
                if (message.type != null && $Object.hasOwnProperty.call(message, "type"))
                    object.type = message.type;
                if (message.data != null && $Object.hasOwnProperty.call(message, "data"))
                    object.data = options.bytes === $String ? $util.base64.encode(message.data, 0, message.data.length) : options.bytes === $Array ? $Array.prototype.slice.call(message.data) : message.data;
                return object;
            };

            /**
             * Converts this WSMessage to JSON.
             * @function toJSON
             * @memberof fns.v3.WSMessage
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            WSMessage.prototype.toJSON = function() {
                return WSMessage.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the type url for WSMessage
             * @function getTypeUrl
             * @memberof fns.v3.WSMessage
             * @static
             * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
             * @returns {string} The type url
             */
            WSMessage.getTypeUrl = function(prefix) {
                if (prefix === $undefined)
                    prefix = "type.googleapis.com";
                return prefix + "/fns.v3.WSMessage";
            };

            return WSMessage;
        })();

        v3.WSResponse = (function() {

            /**
             * Properties of a WSResponse.
             * @typedef {Object} fns.v3.WSResponse.$Properties
             * @property {number|null} [code] WSResponse code
             * @property {boolean|null} [status] WSResponse status
             * @property {string|null} [message] WSResponse message
             * @property {Uint8Array|null} [data] WSResponse data
             * @property {string|null} [details] WSResponse details
             * @property {string|null} [vault] WSResponse vault
             * @property {string|null} [context] WSResponse context
             * @property {number|null} [pageIndex] WSResponse pageIndex
             * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
             */

            /**
             * Properties of a WSResponse.
             * @memberof fns.v3
             * @interface IWSResponse
             * @augments fns.v3.WSResponse.$Properties
             * @deprecated Use fns.v3.WSResponse.$Properties instead.
             */

            /**
             * Shape of a WSResponse.
             * @typedef {fns.v3.WSResponse.$Properties} fns.v3.WSResponse.$Shape
             */

            /**
             * Constructs a new WSResponse.
             * @memberof fns.v3
             * @classdesc Represents a WSResponse.
             * @constructor
             * @param {fns.v3.WSResponse.$Properties=} [properties] Properties to set
             * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
             */
            const WSResponse = function (properties) {
                if (properties)
                    for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            };

            /**
             * WSResponse code.
             * @member {number} code
             * @memberof fns.v3.WSResponse
             * @instance
             */
            WSResponse.prototype.code = 0;

            /**
             * WSResponse status.
             * @member {boolean} status
             * @memberof fns.v3.WSResponse
             * @instance
             */
            WSResponse.prototype.status = false;

            /**
             * WSResponse message.
             * @member {string} message
             * @memberof fns.v3.WSResponse
             * @instance
             */
            WSResponse.prototype.message = "";

            /**
             * WSResponse data.
             * @member {Uint8Array} data
             * @memberof fns.v3.WSResponse
             * @instance
             */
            WSResponse.prototype.data = $util.newBuffer([]);

            /**
             * WSResponse details.
             * @member {string} details
             * @memberof fns.v3.WSResponse
             * @instance
             */
            WSResponse.prototype.details = "";

            /**
             * WSResponse vault.
             * @member {string} vault
             * @memberof fns.v3.WSResponse
             * @instance
             */
            WSResponse.prototype.vault = "";

            /**
             * WSResponse context.
             * @member {string} context
             * @memberof fns.v3.WSResponse
             * @instance
             */
            WSResponse.prototype.context = "";

            /**
             * WSResponse pageIndex.
             * @member {number} pageIndex
             * @memberof fns.v3.WSResponse
             * @instance
             */
            WSResponse.prototype.pageIndex = 0;

            /**
             * Creates a new WSResponse instance using the specified properties.
             * @function create
             * @memberof fns.v3.WSResponse
             * @static
             * @param {fns.v3.WSResponse.$Properties=} [properties] Properties to set
             * @returns {fns.v3.WSResponse} WSResponse instance
             * @type {{
             *   (properties: fns.v3.WSResponse.$Shape): fns.v3.WSResponse & fns.v3.WSResponse.$Shape;
             *   (properties?: fns.v3.WSResponse.$Properties): fns.v3.WSResponse;
             * }}
             */
            WSResponse.create = function(properties) {
                return new WSResponse(properties);
            };

            /**
             * Encodes the specified WSResponse message. Does not implicitly {@link fns.v3.WSResponse.verify|verify} messages.
             * @function encode
             * @memberof fns.v3.WSResponse
             * @static
             * @param {fns.v3.WSResponse.$Properties} message WSResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            WSResponse.encode = function (message, writer, _depth) {
                if (!writer)
                    writer = $Writer.create();
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                if (message.code != null && $Object.hasOwnProperty.call(message, "code") && message.code !== 0)
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.code);
                if (message.status != null && $Object.hasOwnProperty.call(message, "status") && message.status !== false)
                    writer.uint32(/* id 2, wireType 0 =*/16).bool(message.status);
                if (message.message != null && $Object.hasOwnProperty.call(message, "message") && message.message !== "")
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.message);
                if (message.data != null && $Object.hasOwnProperty.call(message, "data") && message.data.length)
                    writer.uint32(/* id 4, wireType 2 =*/34).bytes(message.data);
                if (message.details != null && $Object.hasOwnProperty.call(message, "details") && message.details !== "")
                    writer.uint32(/* id 5, wireType 2 =*/42).string(message.details);
                if (message.vault != null && $Object.hasOwnProperty.call(message, "vault") && message.vault !== "")
                    writer.uint32(/* id 6, wireType 2 =*/50).string(message.vault);
                if (message.context != null && $Object.hasOwnProperty.call(message, "context") && message.context !== "")
                    writer.uint32(/* id 7, wireType 2 =*/58).string(message.context);
                if (message.pageIndex != null && $Object.hasOwnProperty.call(message, "pageIndex") && message.pageIndex !== 0)
                    writer.uint32(/* id 8, wireType 0 =*/64).int32(message.pageIndex);
                if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                    for (let i = 0; i < message.$unknowns.length; ++i)
                        writer.raw(message.$unknowns[i]);
                return writer;
            };

            /**
             * Encodes the specified WSResponse message, length delimited. Does not implicitly {@link fns.v3.WSResponse.verify|verify} messages.
             * @function encodeDelimited
             * @memberof fns.v3.WSResponse
             * @static
             * @param {fns.v3.WSResponse.$Properties} message WSResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            WSResponse.encodeDelimited = function(message, writer) {
                return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
            };

            /**
             * Decodes a WSResponse message from the specified reader or buffer.
             * @function decode
             * @memberof fns.v3.WSResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {fns.v3.WSResponse & fns.v3.WSResponse.$Shape} WSResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            WSResponse.decode = function (reader, length, _end, _depth, _target) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $Reader.recursionLimit)
                    throw $Error("max depth exceeded");
                let end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.fns.v3.WSResponse(), value;
                while (reader.pos < end) {
                    let start = reader.pos;
                    let tag = reader.tag();
                    if (tag === _end) {
                        _end = $undefined;
                        break;
                    }
                    let wireType = tag & 7;
                    switch (tag >>>= 3) {
                    case 1: {
                            if (wireType !== 0)
                                break;
                            if (value = reader.int32())
                                message.code = value;
                            else
                                delete message.code;
                            continue;
                        }
                    case 2: {
                            if (wireType !== 0)
                                break;
                            if (value = reader.bool())
                                message.status = value;
                            else
                                delete message.status;
                            continue;
                        }
                    case 3: {
                            if (wireType !== 2)
                                break;
                            if ((value = reader.stringVerify()).length)
                                message.message = value;
                            else
                                delete message.message;
                            continue;
                        }
                    case 4: {
                            if (wireType !== 2)
                                break;
                            if ((value = reader.bytes()).length)
                                message.data = value;
                            else
                                delete message.data;
                            continue;
                        }
                    case 5: {
                            if (wireType !== 2)
                                break;
                            if ((value = reader.stringVerify()).length)
                                message.details = value;
                            else
                                delete message.details;
                            continue;
                        }
                    case 6: {
                            if (wireType !== 2)
                                break;
                            if ((value = reader.stringVerify()).length)
                                message.vault = value;
                            else
                                delete message.vault;
                            continue;
                        }
                    case 7: {
                            if (wireType !== 2)
                                break;
                            if ((value = reader.stringVerify()).length)
                                message.context = value;
                            else
                                delete message.context;
                            continue;
                        }
                    case 8: {
                            if (wireType !== 0)
                                break;
                            if (value = reader.int32())
                                message.pageIndex = value;
                            else
                                delete message.pageIndex;
                            continue;
                        }
                    }
                    reader.skipType(wireType, _depth, tag);
                    if (!reader.discardUnknown) {
                        $util.makeProp(message, "$unknowns", false);
                        (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                    }
                }
                if (_end !== $undefined)
                    throw $Error("missing end group");
                return message;
            };

            /**
             * Decodes a WSResponse message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof fns.v3.WSResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {fns.v3.WSResponse & fns.v3.WSResponse.$Shape} WSResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            WSResponse.decodeDelimited = function(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a WSResponse message.
             * @function verify
             * @memberof fns.v3.WSResponse
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            WSResponse.verify = function (message, _depth) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    return "max depth exceeded";
                if (message.code != null && $Object.hasOwnProperty.call(message, "code"))
                    if (!$util.isInteger(message.code))
                        return "code: integer expected";
                if (message.status != null && $Object.hasOwnProperty.call(message, "status"))
                    if (typeof message.status !== "boolean")
                        return "status: boolean expected";
                if (message.message != null && $Object.hasOwnProperty.call(message, "message"))
                    if (!$util.isString(message.message))
                        return "message: string expected";
                if (message.data != null && $Object.hasOwnProperty.call(message, "data"))
                    if (!(message.data && typeof message.data.length === "number" || $util.isString(message.data)))
                        return "data: buffer expected";
                if (message.details != null && $Object.hasOwnProperty.call(message, "details"))
                    if (!$util.isString(message.details))
                        return "details: string expected";
                if (message.vault != null && $Object.hasOwnProperty.call(message, "vault"))
                    if (!$util.isString(message.vault))
                        return "vault: string expected";
                if (message.context != null && $Object.hasOwnProperty.call(message, "context"))
                    if (!$util.isString(message.context))
                        return "context: string expected";
                if (message.pageIndex != null && $Object.hasOwnProperty.call(message, "pageIndex"))
                    if (!$util.isInteger(message.pageIndex))
                        return "pageIndex: integer expected";
                return null;
            };

            /**
             * Creates a WSResponse message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof fns.v3.WSResponse
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {fns.v3.WSResponse} WSResponse
             */
            WSResponse.fromObject = function (object, _depth) {
                if (object instanceof $root.fns.v3.WSResponse)
                    return object;
                if (!$util.isObject(object))
                    throw $TypeError(".fns.v3.WSResponse: object expected");
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                let message = new $root.fns.v3.WSResponse();
                if (object.code != null)
                    if ($Number(object.code) !== 0)
                        message.code = object.code | 0;
                if (object.status != null)
                    if (object.status)
                        message.status = $Boolean(object.status);
                if (object.message != null)
                    if (typeof object.message !== "string" || object.message.length)
                        message.message = $String(object.message);
                if (object.data != null)
                    if (object.data.length)
                        if (typeof object.data === "string")
                            $util.base64.decode(object.data, message.data = $util.newBuffer($util.base64.length(object.data)), 0);
                        else if (object.data.length >= 0)
                            message.data = object.data;
                if (object.details != null)
                    if (typeof object.details !== "string" || object.details.length)
                        message.details = $String(object.details);
                if (object.vault != null)
                    if (typeof object.vault !== "string" || object.vault.length)
                        message.vault = $String(object.vault);
                if (object.context != null)
                    if (typeof object.context !== "string" || object.context.length)
                        message.context = $String(object.context);
                if (object.pageIndex != null)
                    if ($Number(object.pageIndex) !== 0)
                        message.pageIndex = object.pageIndex | 0;
                return message;
            };

            /**
             * Creates a plain object from a WSResponse message. Also converts values to other types if specified.
             * @function toObject
             * @memberof fns.v3.WSResponse
             * @static
             * @param {fns.v3.WSResponse} message WSResponse
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            WSResponse.toObject = function (message, options, _depth) {
                if (!options)
                    options = {};
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                let object = {};
                if (options.defaults) {
                    object.code = 0;
                    object.status = false;
                    object.message = "";
                    if (options.bytes === $String)
                        object.data = "";
                    else {
                        object.data = [];
                        if (options.bytes !== $Array)
                            object.data = $util.newBuffer(object.data);
                    }
                    object.details = "";
                    object.vault = "";
                    object.context = "";
                    object.pageIndex = 0;
                }
                if (message.code != null && $Object.hasOwnProperty.call(message, "code"))
                    object.code = message.code;
                if (message.status != null && $Object.hasOwnProperty.call(message, "status"))
                    object.status = message.status;
                if (message.message != null && $Object.hasOwnProperty.call(message, "message"))
                    object.message = message.message;
                if (message.data != null && $Object.hasOwnProperty.call(message, "data"))
                    object.data = options.bytes === $String ? $util.base64.encode(message.data, 0, message.data.length) : options.bytes === $Array ? $Array.prototype.slice.call(message.data) : message.data;
                if (message.details != null && $Object.hasOwnProperty.call(message, "details"))
                    object.details = message.details;
                if (message.vault != null && $Object.hasOwnProperty.call(message, "vault"))
                    object.vault = message.vault;
                if (message.context != null && $Object.hasOwnProperty.call(message, "context"))
                    object.context = message.context;
                if (message.pageIndex != null && $Object.hasOwnProperty.call(message, "pageIndex"))
                    object.pageIndex = message.pageIndex;
                return object;
            };

            /**
             * Converts this WSResponse to JSON.
             * @function toJSON
             * @memberof fns.v3.WSResponse
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            WSResponse.prototype.toJSON = function() {
                return WSResponse.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the type url for WSResponse
             * @function getTypeUrl
             * @memberof fns.v3.WSResponse
             * @static
             * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
             * @returns {string} The type url
             */
            WSResponse.getTypeUrl = function(prefix) {
                if (prefix === $undefined)
                    prefix = "type.googleapis.com";
                return prefix + "/fns.v3.WSResponse";
            };

            return WSResponse;
        })();

        v3.ClientInfoMessage = (function() {

            /**
             * Properties of a ClientInfoMessage.
             * @typedef {Object} fns.v3.ClientInfoMessage.$Properties
             * @property {string|null} [name] ClientInfoMessage name
             * @property {string|null} [version] ClientInfoMessage version
             * @property {string|null} [type] ClientInfoMessage type
             * @property {boolean|null} [isDesktop] ClientInfoMessage isDesktop
             * @property {boolean|null} [isMobile] ClientInfoMessage isMobile
             * @property {boolean|null} [isPhone] ClientInfoMessage isPhone
             * @property {boolean|null} [isTablet] ClientInfoMessage isTablet
             * @property {boolean|null} [isMacOs] ClientInfoMessage isMacOs
             * @property {boolean|null} [isWin] ClientInfoMessage isWin
             * @property {boolean|null} [isLinux] ClientInfoMessage isLinux
             * @property {string|null} [offlineSyncStrategy] ClientInfoMessage offlineSyncStrategy
             * @property {boolean|null} [protobuf] ClientInfoMessage protobuf
             * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
             */

            /**
             * Properties of a ClientInfoMessage.
             * @memberof fns.v3
             * @interface IClientInfoMessage
             * @augments fns.v3.ClientInfoMessage.$Properties
             * @deprecated Use fns.v3.ClientInfoMessage.$Properties instead.
             */

            /**
             * Shape of a ClientInfoMessage.
             * @typedef {fns.v3.ClientInfoMessage.$Properties} fns.v3.ClientInfoMessage.$Shape
             */

            /**
             * Constructs a new ClientInfoMessage.
             * @memberof fns.v3
             * @classdesc Represents a ClientInfoMessage.
             * @constructor
             * @param {fns.v3.ClientInfoMessage.$Properties=} [properties] Properties to set
             * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
             */
            const ClientInfoMessage = function (properties) {
                if (properties)
                    for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            };

            /**
             * ClientInfoMessage name.
             * @member {string} name
             * @memberof fns.v3.ClientInfoMessage
             * @instance
             */
            ClientInfoMessage.prototype.name = "";

            /**
             * ClientInfoMessage version.
             * @member {string} version
             * @memberof fns.v3.ClientInfoMessage
             * @instance
             */
            ClientInfoMessage.prototype.version = "";

            /**
             * ClientInfoMessage type.
             * @member {string} type
             * @memberof fns.v3.ClientInfoMessage
             * @instance
             */
            ClientInfoMessage.prototype.type = "";

            /**
             * ClientInfoMessage isDesktop.
             * @member {boolean} isDesktop
             * @memberof fns.v3.ClientInfoMessage
             * @instance
             */
            ClientInfoMessage.prototype.isDesktop = false;

            /**
             * ClientInfoMessage isMobile.
             * @member {boolean} isMobile
             * @memberof fns.v3.ClientInfoMessage
             * @instance
             */
            ClientInfoMessage.prototype.isMobile = false;

            /**
             * ClientInfoMessage isPhone.
             * @member {boolean} isPhone
             * @memberof fns.v3.ClientInfoMessage
             * @instance
             */
            ClientInfoMessage.prototype.isPhone = false;

            /**
             * ClientInfoMessage isTablet.
             * @member {boolean} isTablet
             * @memberof fns.v3.ClientInfoMessage
             * @instance
             */
            ClientInfoMessage.prototype.isTablet = false;

            /**
             * ClientInfoMessage isMacOs.
             * @member {boolean} isMacOs
             * @memberof fns.v3.ClientInfoMessage
             * @instance
             */
            ClientInfoMessage.prototype.isMacOs = false;

            /**
             * ClientInfoMessage isWin.
             * @member {boolean} isWin
             * @memberof fns.v3.ClientInfoMessage
             * @instance
             */
            ClientInfoMessage.prototype.isWin = false;

            /**
             * ClientInfoMessage isLinux.
             * @member {boolean} isLinux
             * @memberof fns.v3.ClientInfoMessage
             * @instance
             */
            ClientInfoMessage.prototype.isLinux = false;

            /**
             * ClientInfoMessage offlineSyncStrategy.
             * @member {string} offlineSyncStrategy
             * @memberof fns.v3.ClientInfoMessage
             * @instance
             */
            ClientInfoMessage.prototype.offlineSyncStrategy = "";

            /**
             * ClientInfoMessage protobuf.
             * @member {boolean} protobuf
             * @memberof fns.v3.ClientInfoMessage
             * @instance
             */
            ClientInfoMessage.prototype.protobuf = false;

            /**
             * Creates a new ClientInfoMessage instance using the specified properties.
             * @function create
             * @memberof fns.v3.ClientInfoMessage
             * @static
             * @param {fns.v3.ClientInfoMessage.$Properties=} [properties] Properties to set
             * @returns {fns.v3.ClientInfoMessage} ClientInfoMessage instance
             * @type {{
             *   (properties: fns.v3.ClientInfoMessage.$Shape): fns.v3.ClientInfoMessage & fns.v3.ClientInfoMessage.$Shape;
             *   (properties?: fns.v3.ClientInfoMessage.$Properties): fns.v3.ClientInfoMessage;
             * }}
             */
            ClientInfoMessage.create = function(properties) {
                return new ClientInfoMessage(properties);
            };

            /**
             * Encodes the specified ClientInfoMessage message. Does not implicitly {@link fns.v3.ClientInfoMessage.verify|verify} messages.
             * @function encode
             * @memberof fns.v3.ClientInfoMessage
             * @static
             * @param {fns.v3.ClientInfoMessage.$Properties} message ClientInfoMessage message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ClientInfoMessage.encode = function (message, writer, _depth) {
                if (!writer)
                    writer = $Writer.create();
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                if (message.name != null && $Object.hasOwnProperty.call(message, "name") && message.name !== "")
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.name);
                if (message.version != null && $Object.hasOwnProperty.call(message, "version") && message.version !== "")
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.version);
                if (message.type != null && $Object.hasOwnProperty.call(message, "type") && message.type !== "")
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.type);
                if (message.isDesktop != null && $Object.hasOwnProperty.call(message, "isDesktop") && message.isDesktop !== false)
                    writer.uint32(/* id 4, wireType 0 =*/32).bool(message.isDesktop);
                if (message.isMobile != null && $Object.hasOwnProperty.call(message, "isMobile") && message.isMobile !== false)
                    writer.uint32(/* id 5, wireType 0 =*/40).bool(message.isMobile);
                if (message.isPhone != null && $Object.hasOwnProperty.call(message, "isPhone") && message.isPhone !== false)
                    writer.uint32(/* id 6, wireType 0 =*/48).bool(message.isPhone);
                if (message.isTablet != null && $Object.hasOwnProperty.call(message, "isTablet") && message.isTablet !== false)
                    writer.uint32(/* id 7, wireType 0 =*/56).bool(message.isTablet);
                if (message.isMacOs != null && $Object.hasOwnProperty.call(message, "isMacOs") && message.isMacOs !== false)
                    writer.uint32(/* id 8, wireType 0 =*/64).bool(message.isMacOs);
                if (message.isWin != null && $Object.hasOwnProperty.call(message, "isWin") && message.isWin !== false)
                    writer.uint32(/* id 9, wireType 0 =*/72).bool(message.isWin);
                if (message.isLinux != null && $Object.hasOwnProperty.call(message, "isLinux") && message.isLinux !== false)
                    writer.uint32(/* id 10, wireType 0 =*/80).bool(message.isLinux);
                if (message.offlineSyncStrategy != null && $Object.hasOwnProperty.call(message, "offlineSyncStrategy") && message.offlineSyncStrategy !== "")
                    writer.uint32(/* id 11, wireType 2 =*/90).string(message.offlineSyncStrategy);
                if (message.protobuf != null && $Object.hasOwnProperty.call(message, "protobuf") && message.protobuf !== false)
                    writer.uint32(/* id 12, wireType 0 =*/96).bool(message.protobuf);
                if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                    for (let i = 0; i < message.$unknowns.length; ++i)
                        writer.raw(message.$unknowns[i]);
                return writer;
            };

            /**
             * Encodes the specified ClientInfoMessage message, length delimited. Does not implicitly {@link fns.v3.ClientInfoMessage.verify|verify} messages.
             * @function encodeDelimited
             * @memberof fns.v3.ClientInfoMessage
             * @static
             * @param {fns.v3.ClientInfoMessage.$Properties} message ClientInfoMessage message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ClientInfoMessage.encodeDelimited = function(message, writer) {
                return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
            };

            /**
             * Decodes a ClientInfoMessage message from the specified reader or buffer.
             * @function decode
             * @memberof fns.v3.ClientInfoMessage
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {fns.v3.ClientInfoMessage & fns.v3.ClientInfoMessage.$Shape} ClientInfoMessage
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ClientInfoMessage.decode = function (reader, length, _end, _depth, _target) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $Reader.recursionLimit)
                    throw $Error("max depth exceeded");
                let end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.fns.v3.ClientInfoMessage(), value;
                while (reader.pos < end) {
                    let start = reader.pos;
                    let tag = reader.tag();
                    if (tag === _end) {
                        _end = $undefined;
                        break;
                    }
                    let wireType = tag & 7;
                    switch (tag >>>= 3) {
                    case 1: {
                            if (wireType !== 2)
                                break;
                            if ((value = reader.stringVerify()).length)
                                message.name = value;
                            else
                                delete message.name;
                            continue;
                        }
                    case 2: {
                            if (wireType !== 2)
                                break;
                            if ((value = reader.stringVerify()).length)
                                message.version = value;
                            else
                                delete message.version;
                            continue;
                        }
                    case 3: {
                            if (wireType !== 2)
                                break;
                            if ((value = reader.stringVerify()).length)
                                message.type = value;
                            else
                                delete message.type;
                            continue;
                        }
                    case 4: {
                            if (wireType !== 0)
                                break;
                            if (value = reader.bool())
                                message.isDesktop = value;
                            else
                                delete message.isDesktop;
                            continue;
                        }
                    case 5: {
                            if (wireType !== 0)
                                break;
                            if (value = reader.bool())
                                message.isMobile = value;
                            else
                                delete message.isMobile;
                            continue;
                        }
                    case 6: {
                            if (wireType !== 0)
                                break;
                            if (value = reader.bool())
                                message.isPhone = value;
                            else
                                delete message.isPhone;
                            continue;
                        }
                    case 7: {
                            if (wireType !== 0)
                                break;
                            if (value = reader.bool())
                                message.isTablet = value;
                            else
                                delete message.isTablet;
                            continue;
                        }
                    case 8: {
                            if (wireType !== 0)
                                break;
                            if (value = reader.bool())
                                message.isMacOs = value;
                            else
                                delete message.isMacOs;
                            continue;
                        }
                    case 9: {
                            if (wireType !== 0)
                                break;
                            if (value = reader.bool())
                                message.isWin = value;
                            else
                                delete message.isWin;
                            continue;
                        }
                    case 10: {
                            if (wireType !== 0)
                                break;
                            if (value = reader.bool())
                                message.isLinux = value;
                            else
                                delete message.isLinux;
                            continue;
                        }
                    case 11: {
                            if (wireType !== 2)
                                break;
                            if ((value = reader.stringVerify()).length)
                                message.offlineSyncStrategy = value;
                            else
                                delete message.offlineSyncStrategy;
                            continue;
                        }
                    case 12: {
                            if (wireType !== 0)
                                break;
                            if (value = reader.bool())
                                message.protobuf = value;
                            else
                                delete message.protobuf;
                            continue;
                        }
                    }
                    reader.skipType(wireType, _depth, tag);
                    if (!reader.discardUnknown) {
                        $util.makeProp(message, "$unknowns", false);
                        (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                    }
                }
                if (_end !== $undefined)
                    throw $Error("missing end group");
                return message;
            };

            /**
             * Decodes a ClientInfoMessage message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof fns.v3.ClientInfoMessage
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {fns.v3.ClientInfoMessage & fns.v3.ClientInfoMessage.$Shape} ClientInfoMessage
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ClientInfoMessage.decodeDelimited = function(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a ClientInfoMessage message.
             * @function verify
             * @memberof fns.v3.ClientInfoMessage
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ClientInfoMessage.verify = function (message, _depth) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    return "max depth exceeded";
                if (message.name != null && $Object.hasOwnProperty.call(message, "name"))
                    if (!$util.isString(message.name))
                        return "name: string expected";
                if (message.version != null && $Object.hasOwnProperty.call(message, "version"))
                    if (!$util.isString(message.version))
                        return "version: string expected";
                if (message.type != null && $Object.hasOwnProperty.call(message, "type"))
                    if (!$util.isString(message.type))
                        return "type: string expected";
                if (message.isDesktop != null && $Object.hasOwnProperty.call(message, "isDesktop"))
                    if (typeof message.isDesktop !== "boolean")
                        return "isDesktop: boolean expected";
                if (message.isMobile != null && $Object.hasOwnProperty.call(message, "isMobile"))
                    if (typeof message.isMobile !== "boolean")
                        return "isMobile: boolean expected";
                if (message.isPhone != null && $Object.hasOwnProperty.call(message, "isPhone"))
                    if (typeof message.isPhone !== "boolean")
                        return "isPhone: boolean expected";
                if (message.isTablet != null && $Object.hasOwnProperty.call(message, "isTablet"))
                    if (typeof message.isTablet !== "boolean")
                        return "isTablet: boolean expected";
                if (message.isMacOs != null && $Object.hasOwnProperty.call(message, "isMacOs"))
                    if (typeof message.isMacOs !== "boolean")
                        return "isMacOs: boolean expected";
                if (message.isWin != null && $Object.hasOwnProperty.call(message, "isWin"))
                    if (typeof message.isWin !== "boolean")
                        return "isWin: boolean expected";
                if (message.isLinux != null && $Object.hasOwnProperty.call(message, "isLinux"))
                    if (typeof message.isLinux !== "boolean")
                        return "isLinux: boolean expected";
                if (message.offlineSyncStrategy != null && $Object.hasOwnProperty.call(message, "offlineSyncStrategy"))
                    if (!$util.isString(message.offlineSyncStrategy))
                        return "offlineSyncStrategy: string expected";
                if (message.protobuf != null && $Object.hasOwnProperty.call(message, "protobuf"))
                    if (typeof message.protobuf !== "boolean")
                        return "protobuf: boolean expected";
                return null;
            };

            /**
             * Creates a ClientInfoMessage message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof fns.v3.ClientInfoMessage
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {fns.v3.ClientInfoMessage} ClientInfoMessage
             */
            ClientInfoMessage.fromObject = function (object, _depth) {
                if (object instanceof $root.fns.v3.ClientInfoMessage)
                    return object;
                if (!$util.isObject(object))
                    throw $TypeError(".fns.v3.ClientInfoMessage: object expected");
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                let message = new $root.fns.v3.ClientInfoMessage();
                if (object.name != null)
                    if (typeof object.name !== "string" || object.name.length)
                        message.name = $String(object.name);
                if (object.version != null)
                    if (typeof object.version !== "string" || object.version.length)
                        message.version = $String(object.version);
                if (object.type != null)
                    if (typeof object.type !== "string" || object.type.length)
                        message.type = $String(object.type);
                if (object.isDesktop != null)
                    if (object.isDesktop)
                        message.isDesktop = $Boolean(object.isDesktop);
                if (object.isMobile != null)
                    if (object.isMobile)
                        message.isMobile = $Boolean(object.isMobile);
                if (object.isPhone != null)
                    if (object.isPhone)
                        message.isPhone = $Boolean(object.isPhone);
                if (object.isTablet != null)
                    if (object.isTablet)
                        message.isTablet = $Boolean(object.isTablet);
                if (object.isMacOs != null)
                    if (object.isMacOs)
                        message.isMacOs = $Boolean(object.isMacOs);
                if (object.isWin != null)
                    if (object.isWin)
                        message.isWin = $Boolean(object.isWin);
                if (object.isLinux != null)
                    if (object.isLinux)
                        message.isLinux = $Boolean(object.isLinux);
                if (object.offlineSyncStrategy != null)
                    if (typeof object.offlineSyncStrategy !== "string" || object.offlineSyncStrategy.length)
                        message.offlineSyncStrategy = $String(object.offlineSyncStrategy);
                if (object.protobuf != null)
                    if (object.protobuf)
                        message.protobuf = $Boolean(object.protobuf);
                return message;
            };

            /**
             * Creates a plain object from a ClientInfoMessage message. Also converts values to other types if specified.
             * @function toObject
             * @memberof fns.v3.ClientInfoMessage
             * @static
             * @param {fns.v3.ClientInfoMessage} message ClientInfoMessage
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ClientInfoMessage.toObject = function (message, options, _depth) {
                if (!options)
                    options = {};
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                let object = {};
                if (options.defaults) {
                    object.name = "";
                    object.version = "";
                    object.type = "";
                    object.isDesktop = false;
                    object.isMobile = false;
                    object.isPhone = false;
                    object.isTablet = false;
                    object.isMacOs = false;
                    object.isWin = false;
                    object.isLinux = false;
                    object.offlineSyncStrategy = "";
                    object.protobuf = false;
                }
                if (message.name != null && $Object.hasOwnProperty.call(message, "name"))
                    object.name = message.name;
                if (message.version != null && $Object.hasOwnProperty.call(message, "version"))
                    object.version = message.version;
                if (message.type != null && $Object.hasOwnProperty.call(message, "type"))
                    object.type = message.type;
                if (message.isDesktop != null && $Object.hasOwnProperty.call(message, "isDesktop"))
                    object.isDesktop = message.isDesktop;
                if (message.isMobile != null && $Object.hasOwnProperty.call(message, "isMobile"))
                    object.isMobile = message.isMobile;
                if (message.isPhone != null && $Object.hasOwnProperty.call(message, "isPhone"))
                    object.isPhone = message.isPhone;
                if (message.isTablet != null && $Object.hasOwnProperty.call(message, "isTablet"))
                    object.isTablet = message.isTablet;
                if (message.isMacOs != null && $Object.hasOwnProperty.call(message, "isMacOs"))
                    object.isMacOs = message.isMacOs;
                if (message.isWin != null && $Object.hasOwnProperty.call(message, "isWin"))
                    object.isWin = message.isWin;
                if (message.isLinux != null && $Object.hasOwnProperty.call(message, "isLinux"))
                    object.isLinux = message.isLinux;
                if (message.offlineSyncStrategy != null && $Object.hasOwnProperty.call(message, "offlineSyncStrategy"))
                    object.offlineSyncStrategy = message.offlineSyncStrategy;
                if (message.protobuf != null && $Object.hasOwnProperty.call(message, "protobuf"))
                    object.protobuf = message.protobuf;
                return object;
            };

            /**
             * Converts this ClientInfoMessage to JSON.
             * @function toJSON
             * @memberof fns.v3.ClientInfoMessage
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ClientInfoMessage.prototype.toJSON = function() {
                return ClientInfoMessage.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the type url for ClientInfoMessage
             * @function getTypeUrl
             * @memberof fns.v3.ClientInfoMessage
             * @static
             * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
             * @returns {string} The type url
             */
            ClientInfoMessage.getTypeUrl = function(prefix) {
                if (prefix === $undefined)
                    prefix = "type.googleapis.com";
                return prefix + "/fns.v3.ClientInfoMessage";
            };

            return ClientInfoMessage;
        })();

        v3.ManifestItem = (function() {

            /**
             * Properties of a ManifestItem.
             * @typedef {Object} fns.v3.ManifestItem.$Properties
             * @property {string|null} [id] ManifestItem id
             * @property {string|null} [path] ManifestItem path
             * @property {string|null} [hash] ManifestItem hash
             * @property {boolean|null} [isNote] ManifestItem isNote
             * @property {number|Long|null} [size] ManifestItem size
             * @property {number|Long|null} [mtime] ManifestItem mtime
             * @property {number|Long|null} [ctime] ManifestItem ctime
             * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
             */

            /**
             * Properties of a ManifestItem.
             * @memberof fns.v3
             * @interface IManifestItem
             * @augments fns.v3.ManifestItem.$Properties
             * @deprecated Use fns.v3.ManifestItem.$Properties instead.
             */

            /**
             * Shape of a ManifestItem.
             * @typedef {fns.v3.ManifestItem.$Properties} fns.v3.ManifestItem.$Shape
             */

            /**
             * Constructs a new ManifestItem.
             * @memberof fns.v3
             * @classdesc Represents a ManifestItem.
             * @constructor
             * @param {fns.v3.ManifestItem.$Properties=} [properties] Properties to set
             * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
             */
            const ManifestItem = function (properties) {
                if (properties)
                    for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            };

            /**
             * ManifestItem id.
             * @member {string} id
             * @memberof fns.v3.ManifestItem
             * @instance
             */
            ManifestItem.prototype.id = "";

            /**
             * ManifestItem path.
             * @member {string} path
             * @memberof fns.v3.ManifestItem
             * @instance
             */
            ManifestItem.prototype.path = "";

            /**
             * ManifestItem hash.
             * @member {string} hash
             * @memberof fns.v3.ManifestItem
             * @instance
             */
            ManifestItem.prototype.hash = "";

            /**
             * ManifestItem isNote.
             * @member {boolean} isNote
             * @memberof fns.v3.ManifestItem
             * @instance
             */
            ManifestItem.prototype.isNote = false;

            /**
             * ManifestItem size.
             * @member {number|Long} size
             * @memberof fns.v3.ManifestItem
             * @instance
             */
            ManifestItem.prototype.size = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * ManifestItem mtime.
             * @member {number|Long} mtime
             * @memberof fns.v3.ManifestItem
             * @instance
             */
            ManifestItem.prototype.mtime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * ManifestItem ctime.
             * @member {number|Long} ctime
             * @memberof fns.v3.ManifestItem
             * @instance
             */
            ManifestItem.prototype.ctime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * Creates a new ManifestItem instance using the specified properties.
             * @function create
             * @memberof fns.v3.ManifestItem
             * @static
             * @param {fns.v3.ManifestItem.$Properties=} [properties] Properties to set
             * @returns {fns.v3.ManifestItem} ManifestItem instance
             * @type {{
             *   (properties: fns.v3.ManifestItem.$Shape): fns.v3.ManifestItem & fns.v3.ManifestItem.$Shape;
             *   (properties?: fns.v3.ManifestItem.$Properties): fns.v3.ManifestItem;
             * }}
             */
            ManifestItem.create = function(properties) {
                return new ManifestItem(properties);
            };

            /**
             * Encodes the specified ManifestItem message. Does not implicitly {@link fns.v3.ManifestItem.verify|verify} messages.
             * @function encode
             * @memberof fns.v3.ManifestItem
             * @static
             * @param {fns.v3.ManifestItem.$Properties} message ManifestItem message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ManifestItem.encode = function (message, writer, _depth) {
                if (!writer)
                    writer = $Writer.create();
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                if (message.id != null && $Object.hasOwnProperty.call(message, "id") && message.id !== "")
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
                if (message.path != null && $Object.hasOwnProperty.call(message, "path") && message.path !== "")
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.path);
                if (message.hash != null && $Object.hasOwnProperty.call(message, "hash") && message.hash !== "")
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.hash);
                if (message.isNote != null && $Object.hasOwnProperty.call(message, "isNote") && message.isNote !== false)
                    writer.uint32(/* id 4, wireType 0 =*/32).bool(message.isNote);
                if (message.size != null && $Object.hasOwnProperty.call(message, "size") && (typeof message.size === "object" ? message.size.low || message.size.high : message.size !== 0))
                    writer.uint32(/* id 5, wireType 0 =*/40).int64(message.size);
                if (message.mtime != null && $Object.hasOwnProperty.call(message, "mtime") && (typeof message.mtime === "object" ? message.mtime.low || message.mtime.high : message.mtime !== 0))
                    writer.uint32(/* id 6, wireType 0 =*/48).int64(message.mtime);
                if (message.ctime != null && $Object.hasOwnProperty.call(message, "ctime") && (typeof message.ctime === "object" ? message.ctime.low || message.ctime.high : message.ctime !== 0))
                    writer.uint32(/* id 7, wireType 0 =*/56).int64(message.ctime);
                if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                    for (let i = 0; i < message.$unknowns.length; ++i)
                        writer.raw(message.$unknowns[i]);
                return writer;
            };

            /**
             * Encodes the specified ManifestItem message, length delimited. Does not implicitly {@link fns.v3.ManifestItem.verify|verify} messages.
             * @function encodeDelimited
             * @memberof fns.v3.ManifestItem
             * @static
             * @param {fns.v3.ManifestItem.$Properties} message ManifestItem message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ManifestItem.encodeDelimited = function(message, writer) {
                return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
            };

            /**
             * Decodes a ManifestItem message from the specified reader or buffer.
             * @function decode
             * @memberof fns.v3.ManifestItem
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {fns.v3.ManifestItem & fns.v3.ManifestItem.$Shape} ManifestItem
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ManifestItem.decode = function (reader, length, _end, _depth, _target) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $Reader.recursionLimit)
                    throw $Error("max depth exceeded");
                let end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.fns.v3.ManifestItem(), value;
                while (reader.pos < end) {
                    let start = reader.pos;
                    let tag = reader.tag();
                    if (tag === _end) {
                        _end = $undefined;
                        break;
                    }
                    let wireType = tag & 7;
                    switch (tag >>>= 3) {
                    case 1: {
                            if (wireType !== 2)
                                break;
                            if ((value = reader.stringVerify()).length)
                                message.id = value;
                            else
                                delete message.id;
                            continue;
                        }
                    case 2: {
                            if (wireType !== 2)
                                break;
                            if ((value = reader.stringVerify()).length)
                                message.path = value;
                            else
                                delete message.path;
                            continue;
                        }
                    case 3: {
                            if (wireType !== 2)
                                break;
                            if ((value = reader.stringVerify()).length)
                                message.hash = value;
                            else
                                delete message.hash;
                            continue;
                        }
                    case 4: {
                            if (wireType !== 0)
                                break;
                            if (value = reader.bool())
                                message.isNote = value;
                            else
                                delete message.isNote;
                            continue;
                        }
                    case 5: {
                            if (wireType !== 0)
                                break;
                            if (typeof (value = reader.int64()) === "object" ? value.low || value.high : value !== 0)
                                message.size = value;
                            else
                                delete message.size;
                            continue;
                        }
                    case 6: {
                            if (wireType !== 0)
                                break;
                            if (typeof (value = reader.int64()) === "object" ? value.low || value.high : value !== 0)
                                message.mtime = value;
                            else
                                delete message.mtime;
                            continue;
                        }
                    case 7: {
                            if (wireType !== 0)
                                break;
                            if (typeof (value = reader.int64()) === "object" ? value.low || value.high : value !== 0)
                                message.ctime = value;
                            else
                                delete message.ctime;
                            continue;
                        }
                    }
                    reader.skipType(wireType, _depth, tag);
                    if (!reader.discardUnknown) {
                        $util.makeProp(message, "$unknowns", false);
                        (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                    }
                }
                if (_end !== $undefined)
                    throw $Error("missing end group");
                return message;
            };

            /**
             * Decodes a ManifestItem message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof fns.v3.ManifestItem
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {fns.v3.ManifestItem & fns.v3.ManifestItem.$Shape} ManifestItem
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ManifestItem.decodeDelimited = function(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a ManifestItem message.
             * @function verify
             * @memberof fns.v3.ManifestItem
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ManifestItem.verify = function (message, _depth) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    return "max depth exceeded";
                if (message.id != null && $Object.hasOwnProperty.call(message, "id"))
                    if (!$util.isString(message.id))
                        return "id: string expected";
                if (message.path != null && $Object.hasOwnProperty.call(message, "path"))
                    if (!$util.isString(message.path))
                        return "path: string expected";
                if (message.hash != null && $Object.hasOwnProperty.call(message, "hash"))
                    if (!$util.isString(message.hash))
                        return "hash: string expected";
                if (message.isNote != null && $Object.hasOwnProperty.call(message, "isNote"))
                    if (typeof message.isNote !== "boolean")
                        return "isNote: boolean expected";
                if (message.size != null && $Object.hasOwnProperty.call(message, "size"))
                    if (!$util.isInteger(message.size) && !(message.size && $util.isInteger(message.size.low) && $util.isInteger(message.size.high)))
                        return "size: integer|Long expected";
                if (message.mtime != null && $Object.hasOwnProperty.call(message, "mtime"))
                    if (!$util.isInteger(message.mtime) && !(message.mtime && $util.isInteger(message.mtime.low) && $util.isInteger(message.mtime.high)))
                        return "mtime: integer|Long expected";
                if (message.ctime != null && $Object.hasOwnProperty.call(message, "ctime"))
                    if (!$util.isInteger(message.ctime) && !(message.ctime && $util.isInteger(message.ctime.low) && $util.isInteger(message.ctime.high)))
                        return "ctime: integer|Long expected";
                return null;
            };

            /**
             * Creates a ManifestItem message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof fns.v3.ManifestItem
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {fns.v3.ManifestItem} ManifestItem
             */
            ManifestItem.fromObject = function (object, _depth) {
                if (object instanceof $root.fns.v3.ManifestItem)
                    return object;
                if (!$util.isObject(object))
                    throw $TypeError(".fns.v3.ManifestItem: object expected");
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                let message = new $root.fns.v3.ManifestItem();
                if (object.id != null)
                    if (typeof object.id !== "string" || object.id.length)
                        message.id = $String(object.id);
                if (object.path != null)
                    if (typeof object.path !== "string" || object.path.length)
                        message.path = $String(object.path);
                if (object.hash != null)
                    if (typeof object.hash !== "string" || object.hash.length)
                        message.hash = $String(object.hash);
                if (object.isNote != null)
                    if (object.isNote)
                        message.isNote = $Boolean(object.isNote);
                if (object.size != null)
                    if (typeof object.size === "object" ? object.size.low || object.size.high : $Number(object.size) !== 0)
                        if ($util.Long)
                            message.size = $util.Long.fromValue(object.size, false);
                        else if (typeof object.size === "string")
                            message.size = $parseInt(object.size, 10);
                        else if (typeof object.size === "number")
                            message.size = object.size;
                        else if (typeof object.size === "object")
                            message.size = new $util.LongBits(object.size.low >>> 0, object.size.high >>> 0).toNumber();
                if (object.mtime != null)
                    if (typeof object.mtime === "object" ? object.mtime.low || object.mtime.high : $Number(object.mtime) !== 0)
                        if ($util.Long)
                            message.mtime = $util.Long.fromValue(object.mtime, false);
                        else if (typeof object.mtime === "string")
                            message.mtime = $parseInt(object.mtime, 10);
                        else if (typeof object.mtime === "number")
                            message.mtime = object.mtime;
                        else if (typeof object.mtime === "object")
                            message.mtime = new $util.LongBits(object.mtime.low >>> 0, object.mtime.high >>> 0).toNumber();
                if (object.ctime != null)
                    if (typeof object.ctime === "object" ? object.ctime.low || object.ctime.high : $Number(object.ctime) !== 0)
                        if ($util.Long)
                            message.ctime = $util.Long.fromValue(object.ctime, false);
                        else if (typeof object.ctime === "string")
                            message.ctime = $parseInt(object.ctime, 10);
                        else if (typeof object.ctime === "number")
                            message.ctime = object.ctime;
                        else if (typeof object.ctime === "object")
                            message.ctime = new $util.LongBits(object.ctime.low >>> 0, object.ctime.high >>> 0).toNumber();
                return message;
            };

            /**
             * Creates a plain object from a ManifestItem message. Also converts values to other types if specified.
             * @function toObject
             * @memberof fns.v3.ManifestItem
             * @static
             * @param {fns.v3.ManifestItem} message ManifestItem
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ManifestItem.toObject = function (message, options, _depth) {
                if (!options)
                    options = {};
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                let object = {};
                if (options.defaults) {
                    object.id = "";
                    object.path = "";
                    object.hash = "";
                    object.isNote = false;
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, false);
                        object.size = options.longs === $String ? long.toString() : options.longs === $Number ? long.toNumber() : typeof $BigInt !== "undefined" && options.longs === $BigInt ? long.toBigInt() : long;
                    } else
                        object.size = options.longs === $String ? "0" : typeof $BigInt !== "undefined" && options.longs === $BigInt ? $BigInt("0") : 0;
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, false);
                        object.mtime = options.longs === $String ? long.toString() : options.longs === $Number ? long.toNumber() : typeof $BigInt !== "undefined" && options.longs === $BigInt ? long.toBigInt() : long;
                    } else
                        object.mtime = options.longs === $String ? "0" : typeof $BigInt !== "undefined" && options.longs === $BigInt ? $BigInt("0") : 0;
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, false);
                        object.ctime = options.longs === $String ? long.toString() : options.longs === $Number ? long.toNumber() : typeof $BigInt !== "undefined" && options.longs === $BigInt ? long.toBigInt() : long;
                    } else
                        object.ctime = options.longs === $String ? "0" : typeof $BigInt !== "undefined" && options.longs === $BigInt ? $BigInt("0") : 0;
                }
                if (message.id != null && $Object.hasOwnProperty.call(message, "id"))
                    object.id = message.id;
                if (message.path != null && $Object.hasOwnProperty.call(message, "path"))
                    object.path = message.path;
                if (message.hash != null && $Object.hasOwnProperty.call(message, "hash"))
                    object.hash = message.hash;
                if (message.isNote != null && $Object.hasOwnProperty.call(message, "isNote"))
                    object.isNote = message.isNote;
                if (message.size != null && $Object.hasOwnProperty.call(message, "size"))
                    if (typeof $BigInt !== "undefined" && options.longs === $BigInt)
                        object.size = typeof message.size === "number" ? $BigInt(message.size) : $util.Long.fromBits(message.size.low >>> 0, message.size.high >>> 0, false).toBigInt();
                    else if (typeof message.size === "number")
                        object.size = options.longs === $String ? $String(message.size) : message.size;
                    else
                        object.size = options.longs === $String ? $util.Long.prototype.toString.call(message.size) : options.longs === $Number ? new $util.LongBits(message.size.low >>> 0, message.size.high >>> 0).toNumber() : message.size;
                if (message.mtime != null && $Object.hasOwnProperty.call(message, "mtime"))
                    if (typeof $BigInt !== "undefined" && options.longs === $BigInt)
                        object.mtime = typeof message.mtime === "number" ? $BigInt(message.mtime) : $util.Long.fromBits(message.mtime.low >>> 0, message.mtime.high >>> 0, false).toBigInt();
                    else if (typeof message.mtime === "number")
                        object.mtime = options.longs === $String ? $String(message.mtime) : message.mtime;
                    else
                        object.mtime = options.longs === $String ? $util.Long.prototype.toString.call(message.mtime) : options.longs === $Number ? new $util.LongBits(message.mtime.low >>> 0, message.mtime.high >>> 0).toNumber() : message.mtime;
                if (message.ctime != null && $Object.hasOwnProperty.call(message, "ctime"))
                    if (typeof $BigInt !== "undefined" && options.longs === $BigInt)
                        object.ctime = typeof message.ctime === "number" ? $BigInt(message.ctime) : $util.Long.fromBits(message.ctime.low >>> 0, message.ctime.high >>> 0, false).toBigInt();
                    else if (typeof message.ctime === "number")
                        object.ctime = options.longs === $String ? $String(message.ctime) : message.ctime;
                    else
                        object.ctime = options.longs === $String ? $util.Long.prototype.toString.call(message.ctime) : options.longs === $Number ? new $util.LongBits(message.ctime.low >>> 0, message.ctime.high >>> 0).toNumber() : message.ctime;
                return object;
            };

            /**
             * Converts this ManifestItem to JSON.
             * @function toJSON
             * @memberof fns.v3.ManifestItem
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ManifestItem.prototype.toJSON = function() {
                return ManifestItem.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the type url for ManifestItem
             * @function getTypeUrl
             * @memberof fns.v3.ManifestItem
             * @static
             * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
             * @returns {string} The type url
             */
            ManifestItem.getTypeUrl = function(prefix) {
                if (prefix === $undefined)
                    prefix = "type.googleapis.com";
                return prefix + "/fns.v3.ManifestItem";
            };

            return ManifestItem;
        })();

        v3.Tombstone = (function() {

            /**
             * Properties of a Tombstone.
             * @typedef {Object} fns.v3.Tombstone.$Properties
             * @property {string|null} [path] Tombstone path
             * @property {string|null} [id] Tombstone id
             * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
             */

            /**
             * Properties of a Tombstone.
             * @memberof fns.v3
             * @interface ITombstone
             * @augments fns.v3.Tombstone.$Properties
             * @deprecated Use fns.v3.Tombstone.$Properties instead.
             */

            /**
             * Shape of a Tombstone.
             * @typedef {fns.v3.Tombstone.$Properties} fns.v3.Tombstone.$Shape
             */

            /**
             * Constructs a new Tombstone.
             * @memberof fns.v3
             * @classdesc Represents a Tombstone.
             * @constructor
             * @param {fns.v3.Tombstone.$Properties=} [properties] Properties to set
             * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
             */
            const Tombstone = function (properties) {
                if (properties)
                    for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            };

            /**
             * Tombstone path.
             * @member {string} path
             * @memberof fns.v3.Tombstone
             * @instance
             */
            Tombstone.prototype.path = "";

            /**
             * Tombstone id.
             * @member {string} id
             * @memberof fns.v3.Tombstone
             * @instance
             */
            Tombstone.prototype.id = "";

            /**
             * Creates a new Tombstone instance using the specified properties.
             * @function create
             * @memberof fns.v3.Tombstone
             * @static
             * @param {fns.v3.Tombstone.$Properties=} [properties] Properties to set
             * @returns {fns.v3.Tombstone} Tombstone instance
             * @type {{
             *   (properties: fns.v3.Tombstone.$Shape): fns.v3.Tombstone & fns.v3.Tombstone.$Shape;
             *   (properties?: fns.v3.Tombstone.$Properties): fns.v3.Tombstone;
             * }}
             */
            Tombstone.create = function(properties) {
                return new Tombstone(properties);
            };

            /**
             * Encodes the specified Tombstone message. Does not implicitly {@link fns.v3.Tombstone.verify|verify} messages.
             * @function encode
             * @memberof fns.v3.Tombstone
             * @static
             * @param {fns.v3.Tombstone.$Properties} message Tombstone message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Tombstone.encode = function (message, writer, _depth) {
                if (!writer)
                    writer = $Writer.create();
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                if (message.path != null && $Object.hasOwnProperty.call(message, "path") && message.path !== "")
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.path);
                if (message.id != null && $Object.hasOwnProperty.call(message, "id") && message.id !== "")
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.id);
                if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                    for (let i = 0; i < message.$unknowns.length; ++i)
                        writer.raw(message.$unknowns[i]);
                return writer;
            };

            /**
             * Encodes the specified Tombstone message, length delimited. Does not implicitly {@link fns.v3.Tombstone.verify|verify} messages.
             * @function encodeDelimited
             * @memberof fns.v3.Tombstone
             * @static
             * @param {fns.v3.Tombstone.$Properties} message Tombstone message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Tombstone.encodeDelimited = function(message, writer) {
                return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
            };

            /**
             * Decodes a Tombstone message from the specified reader or buffer.
             * @function decode
             * @memberof fns.v3.Tombstone
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {fns.v3.Tombstone & fns.v3.Tombstone.$Shape} Tombstone
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Tombstone.decode = function (reader, length, _end, _depth, _target) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $Reader.recursionLimit)
                    throw $Error("max depth exceeded");
                let end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.fns.v3.Tombstone(), value;
                while (reader.pos < end) {
                    let start = reader.pos;
                    let tag = reader.tag();
                    if (tag === _end) {
                        _end = $undefined;
                        break;
                    }
                    let wireType = tag & 7;
                    switch (tag >>>= 3) {
                    case 1: {
                            if (wireType !== 2)
                                break;
                            if ((value = reader.stringVerify()).length)
                                message.path = value;
                            else
                                delete message.path;
                            continue;
                        }
                    case 2: {
                            if (wireType !== 2)
                                break;
                            if ((value = reader.stringVerify()).length)
                                message.id = value;
                            else
                                delete message.id;
                            continue;
                        }
                    }
                    reader.skipType(wireType, _depth, tag);
                    if (!reader.discardUnknown) {
                        $util.makeProp(message, "$unknowns", false);
                        (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                    }
                }
                if (_end !== $undefined)
                    throw $Error("missing end group");
                return message;
            };

            /**
             * Decodes a Tombstone message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof fns.v3.Tombstone
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {fns.v3.Tombstone & fns.v3.Tombstone.$Shape} Tombstone
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Tombstone.decodeDelimited = function(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Tombstone message.
             * @function verify
             * @memberof fns.v3.Tombstone
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Tombstone.verify = function (message, _depth) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    return "max depth exceeded";
                if (message.path != null && $Object.hasOwnProperty.call(message, "path"))
                    if (!$util.isString(message.path))
                        return "path: string expected";
                if (message.id != null && $Object.hasOwnProperty.call(message, "id"))
                    if (!$util.isString(message.id))
                        return "id: string expected";
                return null;
            };

            /**
             * Creates a Tombstone message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof fns.v3.Tombstone
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {fns.v3.Tombstone} Tombstone
             */
            Tombstone.fromObject = function (object, _depth) {
                if (object instanceof $root.fns.v3.Tombstone)
                    return object;
                if (!$util.isObject(object))
                    throw $TypeError(".fns.v3.Tombstone: object expected");
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                let message = new $root.fns.v3.Tombstone();
                if (object.path != null)
                    if (typeof object.path !== "string" || object.path.length)
                        message.path = $String(object.path);
                if (object.id != null)
                    if (typeof object.id !== "string" || object.id.length)
                        message.id = $String(object.id);
                return message;
            };

            /**
             * Creates a plain object from a Tombstone message. Also converts values to other types if specified.
             * @function toObject
             * @memberof fns.v3.Tombstone
             * @static
             * @param {fns.v3.Tombstone} message Tombstone
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Tombstone.toObject = function (message, options, _depth) {
                if (!options)
                    options = {};
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                let object = {};
                if (options.defaults) {
                    object.path = "";
                    object.id = "";
                }
                if (message.path != null && $Object.hasOwnProperty.call(message, "path"))
                    object.path = message.path;
                if (message.id != null && $Object.hasOwnProperty.call(message, "id"))
                    object.id = message.id;
                return object;
            };

            /**
             * Converts this Tombstone to JSON.
             * @function toJSON
             * @memberof fns.v3.Tombstone
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Tombstone.prototype.toJSON = function() {
                return Tombstone.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the type url for Tombstone
             * @function getTypeUrl
             * @memberof fns.v3.Tombstone
             * @static
             * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
             * @returns {string} The type url
             */
            Tombstone.getTypeUrl = function(prefix) {
                if (prefix === $undefined)
                    prefix = "type.googleapis.com";
                return prefix + "/fns.v3.Tombstone";
            };

            return Tombstone;
        })();

        v3.Scope = (function() {

            /**
             * Properties of a Scope.
             * @typedef {Object} fns.v3.Scope.$Properties
             * @property {Array.<string>|null} [include] Scope include
             * @property {Array.<string>|null} [exclude] Scope exclude
             * @property {Array.<string>|null} [types] Scope types
             * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
             */

            /**
             * Properties of a Scope.
             * @memberof fns.v3
             * @interface IScope
             * @augments fns.v3.Scope.$Properties
             * @deprecated Use fns.v3.Scope.$Properties instead.
             */

            /**
             * Shape of a Scope.
             * @typedef {fns.v3.Scope.$Properties} fns.v3.Scope.$Shape
             */

            /**
             * Constructs a new Scope.
             * @memberof fns.v3
             * @classdesc Represents a Scope.
             * @constructor
             * @param {fns.v3.Scope.$Properties=} [properties] Properties to set
             * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
             */
            const Scope = function (properties) {
                this.include = [];
                this.exclude = [];
                this.types = [];
                if (properties)
                    for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            };

            /**
             * Scope include.
             * @member {Array.<string>} include
             * @memberof fns.v3.Scope
             * @instance
             */
            Scope.prototype.include = $util.emptyArray;

            /**
             * Scope exclude.
             * @member {Array.<string>} exclude
             * @memberof fns.v3.Scope
             * @instance
             */
            Scope.prototype.exclude = $util.emptyArray;

            /**
             * Scope types.
             * @member {Array.<string>} types
             * @memberof fns.v3.Scope
             * @instance
             */
            Scope.prototype.types = $util.emptyArray;

            /**
             * Creates a new Scope instance using the specified properties.
             * @function create
             * @memberof fns.v3.Scope
             * @static
             * @param {fns.v3.Scope.$Properties=} [properties] Properties to set
             * @returns {fns.v3.Scope} Scope instance
             * @type {{
             *   (properties: fns.v3.Scope.$Shape): fns.v3.Scope & fns.v3.Scope.$Shape;
             *   (properties?: fns.v3.Scope.$Properties): fns.v3.Scope;
             * }}
             */
            Scope.create = function(properties) {
                return new Scope(properties);
            };

            /**
             * Encodes the specified Scope message. Does not implicitly {@link fns.v3.Scope.verify|verify} messages.
             * @function encode
             * @memberof fns.v3.Scope
             * @static
             * @param {fns.v3.Scope.$Properties} message Scope message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Scope.encode = function (message, writer, _depth) {
                if (!writer)
                    writer = $Writer.create();
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                if (message.include != null && message.include.length)
                    for (let i = 0; i < message.include.length; ++i)
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.include[i]);
                if (message.exclude != null && message.exclude.length)
                    for (let i = 0; i < message.exclude.length; ++i)
                        writer.uint32(/* id 2, wireType 2 =*/18).string(message.exclude[i]);
                if (message.types != null && message.types.length)
                    for (let i = 0; i < message.types.length; ++i)
                        writer.uint32(/* id 3, wireType 2 =*/26).string(message.types[i]);
                if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                    for (let i = 0; i < message.$unknowns.length; ++i)
                        writer.raw(message.$unknowns[i]);
                return writer;
            };

            /**
             * Encodes the specified Scope message, length delimited. Does not implicitly {@link fns.v3.Scope.verify|verify} messages.
             * @function encodeDelimited
             * @memberof fns.v3.Scope
             * @static
             * @param {fns.v3.Scope.$Properties} message Scope message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Scope.encodeDelimited = function(message, writer) {
                return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
            };

            /**
             * Decodes a Scope message from the specified reader or buffer.
             * @function decode
             * @memberof fns.v3.Scope
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {fns.v3.Scope & fns.v3.Scope.$Shape} Scope
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Scope.decode = function (reader, length, _end, _depth, _target) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $Reader.recursionLimit)
                    throw $Error("max depth exceeded");
                let end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.fns.v3.Scope();
                while (reader.pos < end) {
                    let start = reader.pos;
                    let tag = reader.tag();
                    if (tag === _end) {
                        _end = $undefined;
                        break;
                    }
                    let wireType = tag & 7;
                    switch (tag >>>= 3) {
                    case 1: {
                            if (wireType !== 2)
                                break;
                            if (!(message.include && message.include.length))
                                message.include = [];
                            message.include.push(reader.stringVerify());
                            continue;
                        }
                    case 2: {
                            if (wireType !== 2)
                                break;
                            if (!(message.exclude && message.exclude.length))
                                message.exclude = [];
                            message.exclude.push(reader.stringVerify());
                            continue;
                        }
                    case 3: {
                            if (wireType !== 2)
                                break;
                            if (!(message.types && message.types.length))
                                message.types = [];
                            message.types.push(reader.stringVerify());
                            continue;
                        }
                    }
                    reader.skipType(wireType, _depth, tag);
                    if (!reader.discardUnknown) {
                        $util.makeProp(message, "$unknowns", false);
                        (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                    }
                }
                if (_end !== $undefined)
                    throw $Error("missing end group");
                return message;
            };

            /**
             * Decodes a Scope message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof fns.v3.Scope
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {fns.v3.Scope & fns.v3.Scope.$Shape} Scope
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Scope.decodeDelimited = function(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Scope message.
             * @function verify
             * @memberof fns.v3.Scope
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Scope.verify = function (message, _depth) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    return "max depth exceeded";
                if (message.include != null && $Object.hasOwnProperty.call(message, "include")) {
                    if (!$Array.isArray(message.include))
                        return "include: array expected";
                    for (let i = 0; i < message.include.length; ++i)
                        if (!$util.isString(message.include[i]))
                            return "include: string[] expected";
                }
                if (message.exclude != null && $Object.hasOwnProperty.call(message, "exclude")) {
                    if (!$Array.isArray(message.exclude))
                        return "exclude: array expected";
                    for (let i = 0; i < message.exclude.length; ++i)
                        if (!$util.isString(message.exclude[i]))
                            return "exclude: string[] expected";
                }
                if (message.types != null && $Object.hasOwnProperty.call(message, "types")) {
                    if (!$Array.isArray(message.types))
                        return "types: array expected";
                    for (let i = 0; i < message.types.length; ++i)
                        if (!$util.isString(message.types[i]))
                            return "types: string[] expected";
                }
                return null;
            };

            /**
             * Creates a Scope message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof fns.v3.Scope
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {fns.v3.Scope} Scope
             */
            Scope.fromObject = function (object, _depth) {
                if (object instanceof $root.fns.v3.Scope)
                    return object;
                if (!$util.isObject(object))
                    throw $TypeError(".fns.v3.Scope: object expected");
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                let message = new $root.fns.v3.Scope();
                if (object.include) {
                    if (!$Array.isArray(object.include))
                        throw $TypeError(".fns.v3.Scope.include: array expected");
                    message.include = $Array(object.include.length);
                    for (let i = 0; i < object.include.length; ++i)
                        message.include[i] = $String(object.include[i]);
                }
                if (object.exclude) {
                    if (!$Array.isArray(object.exclude))
                        throw $TypeError(".fns.v3.Scope.exclude: array expected");
                    message.exclude = $Array(object.exclude.length);
                    for (let i = 0; i < object.exclude.length; ++i)
                        message.exclude[i] = $String(object.exclude[i]);
                }
                if (object.types) {
                    if (!$Array.isArray(object.types))
                        throw $TypeError(".fns.v3.Scope.types: array expected");
                    message.types = $Array(object.types.length);
                    for (let i = 0; i < object.types.length; ++i)
                        message.types[i] = $String(object.types[i]);
                }
                return message;
            };

            /**
             * Creates a plain object from a Scope message. Also converts values to other types if specified.
             * @function toObject
             * @memberof fns.v3.Scope
             * @static
             * @param {fns.v3.Scope} message Scope
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Scope.toObject = function (message, options, _depth) {
                if (!options)
                    options = {};
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                let object = {};
                if (options.arrays || options.defaults) {
                    object.include = [];
                    object.exclude = [];
                    object.types = [];
                }
                if (message.include && message.include.length) {
                    object.include = $Array(message.include.length);
                    for (let j = 0; j < message.include.length; ++j)
                        object.include[j] = message.include[j];
                }
                if (message.exclude && message.exclude.length) {
                    object.exclude = $Array(message.exclude.length);
                    for (let j = 0; j < message.exclude.length; ++j)
                        object.exclude[j] = message.exclude[j];
                }
                if (message.types && message.types.length) {
                    object.types = $Array(message.types.length);
                    for (let j = 0; j < message.types.length; ++j)
                        object.types[j] = message.types[j];
                }
                return object;
            };

            /**
             * Converts this Scope to JSON.
             * @function toJSON
             * @memberof fns.v3.Scope
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Scope.prototype.toJSON = function() {
                return Scope.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the type url for Scope
             * @function getTypeUrl
             * @memberof fns.v3.Scope
             * @static
             * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
             * @returns {string} The type url
             */
            Scope.getTypeUrl = function(prefix) {
                if (prefix === $undefined)
                    prefix = "type.googleapis.com";
                return prefix + "/fns.v3.Scope";
            };

            return Scope;
        })();

        v3.Op = (function() {

            /**
             * Properties of an Op.
             * @typedef {Object} fns.v3.Op.$Properties
             * @property {string|null} [op] Op op
             * @property {fns.v3.ManifestItem.$Properties|null} [item] Op item
             * @property {string|null} [from] Op from
             * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
             */

            /**
             * Properties of an Op.
             * @memberof fns.v3
             * @interface IOp
             * @augments fns.v3.Op.$Properties
             * @deprecated Use fns.v3.Op.$Properties instead.
             */

            /**
             * Shape of an Op.
             * @typedef {fns.v3.Op.$Properties} fns.v3.Op.$Shape
             */

            /**
             * Constructs a new Op.
             * @memberof fns.v3
             * @classdesc Represents an Op.
             * @constructor
             * @param {fns.v3.Op.$Properties=} [properties] Properties to set
             * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
             */
            const Op = function (properties) {
                if (properties)
                    for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            };

            /**
             * Op op.
             * @member {string} op
             * @memberof fns.v3.Op
             * @instance
             */
            Op.prototype.op = "";

            /**
             * Op item.
             * @member {fns.v3.ManifestItem.$Properties|null|undefined} item
             * @memberof fns.v3.Op
             * @instance
             */
            Op.prototype.item = null;

            /**
             * Op from.
             * @member {string} from
             * @memberof fns.v3.Op
             * @instance
             */
            Op.prototype.from = "";

            /**
             * Creates a new Op instance using the specified properties.
             * @function create
             * @memberof fns.v3.Op
             * @static
             * @param {fns.v3.Op.$Properties=} [properties] Properties to set
             * @returns {fns.v3.Op} Op instance
             * @type {{
             *   (properties: fns.v3.Op.$Shape): fns.v3.Op & fns.v3.Op.$Shape;
             *   (properties?: fns.v3.Op.$Properties): fns.v3.Op;
             * }}
             */
            Op.create = function(properties) {
                return new Op(properties);
            };

            /**
             * Encodes the specified Op message. Does not implicitly {@link fns.v3.Op.verify|verify} messages.
             * @function encode
             * @memberof fns.v3.Op
             * @static
             * @param {fns.v3.Op.$Properties} message Op message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Op.encode = function (message, writer, _depth) {
                if (!writer)
                    writer = $Writer.create();
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                if (message.op != null && $Object.hasOwnProperty.call(message, "op") && message.op !== "")
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.op);
                if (message.item != null && $Object.hasOwnProperty.call(message, "item"))
                    $root.fns.v3.ManifestItem.encode(message.item, writer.uint32(/* id 2, wireType 2 =*/18).fork(), _depth + 1).ldelim();
                if (message.from != null && $Object.hasOwnProperty.call(message, "from") && message.from !== "")
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.from);
                if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                    for (let i = 0; i < message.$unknowns.length; ++i)
                        writer.raw(message.$unknowns[i]);
                return writer;
            };

            /**
             * Encodes the specified Op message, length delimited. Does not implicitly {@link fns.v3.Op.verify|verify} messages.
             * @function encodeDelimited
             * @memberof fns.v3.Op
             * @static
             * @param {fns.v3.Op.$Properties} message Op message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Op.encodeDelimited = function(message, writer) {
                return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
            };

            /**
             * Decodes an Op message from the specified reader or buffer.
             * @function decode
             * @memberof fns.v3.Op
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {fns.v3.Op & fns.v3.Op.$Shape} Op
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Op.decode = function (reader, length, _end, _depth, _target) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $Reader.recursionLimit)
                    throw $Error("max depth exceeded");
                let end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.fns.v3.Op(), value;
                while (reader.pos < end) {
                    let start = reader.pos;
                    let tag = reader.tag();
                    if (tag === _end) {
                        _end = $undefined;
                        break;
                    }
                    let wireType = tag & 7;
                    switch (tag >>>= 3) {
                    case 1: {
                            if (wireType !== 2)
                                break;
                            if ((value = reader.stringVerify()).length)
                                message.op = value;
                            else
                                delete message.op;
                            continue;
                        }
                    case 2: {
                            if (wireType !== 2)
                                break;
                            message.item = $root.fns.v3.ManifestItem.decode(reader, reader.uint32(), $undefined, _depth + 1, message.item);
                            continue;
                        }
                    case 3: {
                            if (wireType !== 2)
                                break;
                            if ((value = reader.stringVerify()).length)
                                message.from = value;
                            else
                                delete message.from;
                            continue;
                        }
                    }
                    reader.skipType(wireType, _depth, tag);
                    if (!reader.discardUnknown) {
                        $util.makeProp(message, "$unknowns", false);
                        (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                    }
                }
                if (_end !== $undefined)
                    throw $Error("missing end group");
                return message;
            };

            /**
             * Decodes an Op message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof fns.v3.Op
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {fns.v3.Op & fns.v3.Op.$Shape} Op
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Op.decodeDelimited = function(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies an Op message.
             * @function verify
             * @memberof fns.v3.Op
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Op.verify = function (message, _depth) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    return "max depth exceeded";
                if (message.op != null && $Object.hasOwnProperty.call(message, "op"))
                    if (!$util.isString(message.op))
                        return "op: string expected";
                if (message.item != null && $Object.hasOwnProperty.call(message, "item")) {
                    let error = $root.fns.v3.ManifestItem.verify(message.item, _depth + 1);
                    if (error)
                        return "item." + error;
                }
                if (message.from != null && $Object.hasOwnProperty.call(message, "from"))
                    if (!$util.isString(message.from))
                        return "from: string expected";
                return null;
            };

            /**
             * Creates an Op message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof fns.v3.Op
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {fns.v3.Op} Op
             */
            Op.fromObject = function (object, _depth) {
                if (object instanceof $root.fns.v3.Op)
                    return object;
                if (!$util.isObject(object))
                    throw $TypeError(".fns.v3.Op: object expected");
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                let message = new $root.fns.v3.Op();
                if (object.op != null)
                    if (typeof object.op !== "string" || object.op.length)
                        message.op = $String(object.op);
                if (object.item != null) {
                    if (!$util.isObject(object.item))
                        throw $TypeError(".fns.v3.Op.item: object expected");
                    message.item = $root.fns.v3.ManifestItem.fromObject(object.item, _depth + 1);
                }
                if (object.from != null)
                    if (typeof object.from !== "string" || object.from.length)
                        message.from = $String(object.from);
                return message;
            };

            /**
             * Creates a plain object from an Op message. Also converts values to other types if specified.
             * @function toObject
             * @memberof fns.v3.Op
             * @static
             * @param {fns.v3.Op} message Op
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Op.toObject = function (message, options, _depth) {
                if (!options)
                    options = {};
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                let object = {};
                if (options.defaults) {
                    object.op = "";
                    object.item = null;
                    object.from = "";
                }
                if (message.op != null && $Object.hasOwnProperty.call(message, "op"))
                    object.op = message.op;
                if (message.item != null && $Object.hasOwnProperty.call(message, "item"))
                    object.item = $root.fns.v3.ManifestItem.toObject(message.item, options, _depth + 1);
                if (message.from != null && $Object.hasOwnProperty.call(message, "from"))
                    object.from = message.from;
                return object;
            };

            /**
             * Converts this Op to JSON.
             * @function toJSON
             * @memberof fns.v3.Op
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Op.prototype.toJSON = function() {
                return Op.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the type url for Op
             * @function getTypeUrl
             * @memberof fns.v3.Op
             * @static
             * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
             * @returns {string} The type url
             */
            Op.getTypeUrl = function(prefix) {
                if (prefix === $undefined)
                    prefix = "type.googleapis.com";
                return prefix + "/fns.v3.Op";
            };

            return Op;
        })();

        v3.Conflict = (function() {

            /**
             * Properties of a Conflict.
             * @typedef {Object} fns.v3.Conflict.$Properties
             * @property {string|null} [path] Conflict path
             * @property {string|null} [kind] Conflict kind
             * @property {string|null} [id] Conflict id
             * @property {string|null} [baseHash] Conflict baseHash
             * @property {string|null} [serverHash] Conflict serverHash
             * @property {number|Long|null} [serverMtime] Conflict serverMtime
             * @property {string|null} [localHash] Conflict localHash
             * @property {boolean|null} [isNote] Conflict isNote
             * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
             */

            /**
             * Properties of a Conflict.
             * @memberof fns.v3
             * @interface IConflict
             * @augments fns.v3.Conflict.$Properties
             * @deprecated Use fns.v3.Conflict.$Properties instead.
             */

            /**
             * Shape of a Conflict.
             * @typedef {fns.v3.Conflict.$Properties} fns.v3.Conflict.$Shape
             */

            /**
             * Constructs a new Conflict.
             * @memberof fns.v3
             * @classdesc Represents a Conflict.
             * @constructor
             * @param {fns.v3.Conflict.$Properties=} [properties] Properties to set
             * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
             */
            const Conflict = function (properties) {
                if (properties)
                    for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            };

            /**
             * Conflict path.
             * @member {string} path
             * @memberof fns.v3.Conflict
             * @instance
             */
            Conflict.prototype.path = "";

            /**
             * Conflict kind.
             * @member {string} kind
             * @memberof fns.v3.Conflict
             * @instance
             */
            Conflict.prototype.kind = "";

            /**
             * Conflict id.
             * @member {string} id
             * @memberof fns.v3.Conflict
             * @instance
             */
            Conflict.prototype.id = "";

            /**
             * Conflict baseHash.
             * @member {string} baseHash
             * @memberof fns.v3.Conflict
             * @instance
             */
            Conflict.prototype.baseHash = "";

            /**
             * Conflict serverHash.
             * @member {string} serverHash
             * @memberof fns.v3.Conflict
             * @instance
             */
            Conflict.prototype.serverHash = "";

            /**
             * Conflict serverMtime.
             * @member {number|Long} serverMtime
             * @memberof fns.v3.Conflict
             * @instance
             */
            Conflict.prototype.serverMtime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * Conflict localHash.
             * @member {string} localHash
             * @memberof fns.v3.Conflict
             * @instance
             */
            Conflict.prototype.localHash = "";

            /**
             * Conflict isNote.
             * @member {boolean} isNote
             * @memberof fns.v3.Conflict
             * @instance
             */
            Conflict.prototype.isNote = false;

            /**
             * Creates a new Conflict instance using the specified properties.
             * @function create
             * @memberof fns.v3.Conflict
             * @static
             * @param {fns.v3.Conflict.$Properties=} [properties] Properties to set
             * @returns {fns.v3.Conflict} Conflict instance
             * @type {{
             *   (properties: fns.v3.Conflict.$Shape): fns.v3.Conflict & fns.v3.Conflict.$Shape;
             *   (properties?: fns.v3.Conflict.$Properties): fns.v3.Conflict;
             * }}
             */
            Conflict.create = function(properties) {
                return new Conflict(properties);
            };

            /**
             * Encodes the specified Conflict message. Does not implicitly {@link fns.v3.Conflict.verify|verify} messages.
             * @function encode
             * @memberof fns.v3.Conflict
             * @static
             * @param {fns.v3.Conflict.$Properties} message Conflict message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Conflict.encode = function (message, writer, _depth) {
                if (!writer)
                    writer = $Writer.create();
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                if (message.path != null && $Object.hasOwnProperty.call(message, "path") && message.path !== "")
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.path);
                if (message.kind != null && $Object.hasOwnProperty.call(message, "kind") && message.kind !== "")
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.kind);
                if (message.id != null && $Object.hasOwnProperty.call(message, "id") && message.id !== "")
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.id);
                if (message.baseHash != null && $Object.hasOwnProperty.call(message, "baseHash") && message.baseHash !== "")
                    writer.uint32(/* id 4, wireType 2 =*/34).string(message.baseHash);
                if (message.serverHash != null && $Object.hasOwnProperty.call(message, "serverHash") && message.serverHash !== "")
                    writer.uint32(/* id 5, wireType 2 =*/42).string(message.serverHash);
                if (message.serverMtime != null && $Object.hasOwnProperty.call(message, "serverMtime") && (typeof message.serverMtime === "object" ? message.serverMtime.low || message.serverMtime.high : message.serverMtime !== 0))
                    writer.uint32(/* id 6, wireType 0 =*/48).int64(message.serverMtime);
                if (message.localHash != null && $Object.hasOwnProperty.call(message, "localHash") && message.localHash !== "")
                    writer.uint32(/* id 7, wireType 2 =*/58).string(message.localHash);
                if (message.isNote != null && $Object.hasOwnProperty.call(message, "isNote") && message.isNote !== false)
                    writer.uint32(/* id 8, wireType 0 =*/64).bool(message.isNote);
                if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                    for (let i = 0; i < message.$unknowns.length; ++i)
                        writer.raw(message.$unknowns[i]);
                return writer;
            };

            /**
             * Encodes the specified Conflict message, length delimited. Does not implicitly {@link fns.v3.Conflict.verify|verify} messages.
             * @function encodeDelimited
             * @memberof fns.v3.Conflict
             * @static
             * @param {fns.v3.Conflict.$Properties} message Conflict message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Conflict.encodeDelimited = function(message, writer) {
                return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
            };

            /**
             * Decodes a Conflict message from the specified reader or buffer.
             * @function decode
             * @memberof fns.v3.Conflict
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {fns.v3.Conflict & fns.v3.Conflict.$Shape} Conflict
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Conflict.decode = function (reader, length, _end, _depth, _target) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $Reader.recursionLimit)
                    throw $Error("max depth exceeded");
                let end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.fns.v3.Conflict(), value;
                while (reader.pos < end) {
                    let start = reader.pos;
                    let tag = reader.tag();
                    if (tag === _end) {
                        _end = $undefined;
                        break;
                    }
                    let wireType = tag & 7;
                    switch (tag >>>= 3) {
                    case 1: {
                            if (wireType !== 2)
                                break;
                            if ((value = reader.stringVerify()).length)
                                message.path = value;
                            else
                                delete message.path;
                            continue;
                        }
                    case 2: {
                            if (wireType !== 2)
                                break;
                            if ((value = reader.stringVerify()).length)
                                message.kind = value;
                            else
                                delete message.kind;
                            continue;
                        }
                    case 3: {
                            if (wireType !== 2)
                                break;
                            if ((value = reader.stringVerify()).length)
                                message.id = value;
                            else
                                delete message.id;
                            continue;
                        }
                    case 4: {
                            if (wireType !== 2)
                                break;
                            if ((value = reader.stringVerify()).length)
                                message.baseHash = value;
                            else
                                delete message.baseHash;
                            continue;
                        }
                    case 5: {
                            if (wireType !== 2)
                                break;
                            if ((value = reader.stringVerify()).length)
                                message.serverHash = value;
                            else
                                delete message.serverHash;
                            continue;
                        }
                    case 6: {
                            if (wireType !== 0)
                                break;
                            if (typeof (value = reader.int64()) === "object" ? value.low || value.high : value !== 0)
                                message.serverMtime = value;
                            else
                                delete message.serverMtime;
                            continue;
                        }
                    case 7: {
                            if (wireType !== 2)
                                break;
                            if ((value = reader.stringVerify()).length)
                                message.localHash = value;
                            else
                                delete message.localHash;
                            continue;
                        }
                    case 8: {
                            if (wireType !== 0)
                                break;
                            if (value = reader.bool())
                                message.isNote = value;
                            else
                                delete message.isNote;
                            continue;
                        }
                    }
                    reader.skipType(wireType, _depth, tag);
                    if (!reader.discardUnknown) {
                        $util.makeProp(message, "$unknowns", false);
                        (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                    }
                }
                if (_end !== $undefined)
                    throw $Error("missing end group");
                return message;
            };

            /**
             * Decodes a Conflict message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof fns.v3.Conflict
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {fns.v3.Conflict & fns.v3.Conflict.$Shape} Conflict
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Conflict.decodeDelimited = function(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Conflict message.
             * @function verify
             * @memberof fns.v3.Conflict
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Conflict.verify = function (message, _depth) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    return "max depth exceeded";
                if (message.path != null && $Object.hasOwnProperty.call(message, "path"))
                    if (!$util.isString(message.path))
                        return "path: string expected";
                if (message.kind != null && $Object.hasOwnProperty.call(message, "kind"))
                    if (!$util.isString(message.kind))
                        return "kind: string expected";
                if (message.id != null && $Object.hasOwnProperty.call(message, "id"))
                    if (!$util.isString(message.id))
                        return "id: string expected";
                if (message.baseHash != null && $Object.hasOwnProperty.call(message, "baseHash"))
                    if (!$util.isString(message.baseHash))
                        return "baseHash: string expected";
                if (message.serverHash != null && $Object.hasOwnProperty.call(message, "serverHash"))
                    if (!$util.isString(message.serverHash))
                        return "serverHash: string expected";
                if (message.serverMtime != null && $Object.hasOwnProperty.call(message, "serverMtime"))
                    if (!$util.isInteger(message.serverMtime) && !(message.serverMtime && $util.isInteger(message.serverMtime.low) && $util.isInteger(message.serverMtime.high)))
                        return "serverMtime: integer|Long expected";
                if (message.localHash != null && $Object.hasOwnProperty.call(message, "localHash"))
                    if (!$util.isString(message.localHash))
                        return "localHash: string expected";
                if (message.isNote != null && $Object.hasOwnProperty.call(message, "isNote"))
                    if (typeof message.isNote !== "boolean")
                        return "isNote: boolean expected";
                return null;
            };

            /**
             * Creates a Conflict message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof fns.v3.Conflict
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {fns.v3.Conflict} Conflict
             */
            Conflict.fromObject = function (object, _depth) {
                if (object instanceof $root.fns.v3.Conflict)
                    return object;
                if (!$util.isObject(object))
                    throw $TypeError(".fns.v3.Conflict: object expected");
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                let message = new $root.fns.v3.Conflict();
                if (object.path != null)
                    if (typeof object.path !== "string" || object.path.length)
                        message.path = $String(object.path);
                if (object.kind != null)
                    if (typeof object.kind !== "string" || object.kind.length)
                        message.kind = $String(object.kind);
                if (object.id != null)
                    if (typeof object.id !== "string" || object.id.length)
                        message.id = $String(object.id);
                if (object.baseHash != null)
                    if (typeof object.baseHash !== "string" || object.baseHash.length)
                        message.baseHash = $String(object.baseHash);
                if (object.serverHash != null)
                    if (typeof object.serverHash !== "string" || object.serverHash.length)
                        message.serverHash = $String(object.serverHash);
                if (object.serverMtime != null)
                    if (typeof object.serverMtime === "object" ? object.serverMtime.low || object.serverMtime.high : $Number(object.serverMtime) !== 0)
                        if ($util.Long)
                            message.serverMtime = $util.Long.fromValue(object.serverMtime, false);
                        else if (typeof object.serverMtime === "string")
                            message.serverMtime = $parseInt(object.serverMtime, 10);
                        else if (typeof object.serverMtime === "number")
                            message.serverMtime = object.serverMtime;
                        else if (typeof object.serverMtime === "object")
                            message.serverMtime = new $util.LongBits(object.serverMtime.low >>> 0, object.serverMtime.high >>> 0).toNumber();
                if (object.localHash != null)
                    if (typeof object.localHash !== "string" || object.localHash.length)
                        message.localHash = $String(object.localHash);
                if (object.isNote != null)
                    if (object.isNote)
                        message.isNote = $Boolean(object.isNote);
                return message;
            };

            /**
             * Creates a plain object from a Conflict message. Also converts values to other types if specified.
             * @function toObject
             * @memberof fns.v3.Conflict
             * @static
             * @param {fns.v3.Conflict} message Conflict
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Conflict.toObject = function (message, options, _depth) {
                if (!options)
                    options = {};
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                let object = {};
                if (options.defaults) {
                    object.path = "";
                    object.kind = "";
                    object.id = "";
                    object.baseHash = "";
                    object.serverHash = "";
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, false);
                        object.serverMtime = options.longs === $String ? long.toString() : options.longs === $Number ? long.toNumber() : typeof $BigInt !== "undefined" && options.longs === $BigInt ? long.toBigInt() : long;
                    } else
                        object.serverMtime = options.longs === $String ? "0" : typeof $BigInt !== "undefined" && options.longs === $BigInt ? $BigInt("0") : 0;
                    object.localHash = "";
                    object.isNote = false;
                }
                if (message.path != null && $Object.hasOwnProperty.call(message, "path"))
                    object.path = message.path;
                if (message.kind != null && $Object.hasOwnProperty.call(message, "kind"))
                    object.kind = message.kind;
                if (message.id != null && $Object.hasOwnProperty.call(message, "id"))
                    object.id = message.id;
                if (message.baseHash != null && $Object.hasOwnProperty.call(message, "baseHash"))
                    object.baseHash = message.baseHash;
                if (message.serverHash != null && $Object.hasOwnProperty.call(message, "serverHash"))
                    object.serverHash = message.serverHash;
                if (message.serverMtime != null && $Object.hasOwnProperty.call(message, "serverMtime"))
                    if (typeof $BigInt !== "undefined" && options.longs === $BigInt)
                        object.serverMtime = typeof message.serverMtime === "number" ? $BigInt(message.serverMtime) : $util.Long.fromBits(message.serverMtime.low >>> 0, message.serverMtime.high >>> 0, false).toBigInt();
                    else if (typeof message.serverMtime === "number")
                        object.serverMtime = options.longs === $String ? $String(message.serverMtime) : message.serverMtime;
                    else
                        object.serverMtime = options.longs === $String ? $util.Long.prototype.toString.call(message.serverMtime) : options.longs === $Number ? new $util.LongBits(message.serverMtime.low >>> 0, message.serverMtime.high >>> 0).toNumber() : message.serverMtime;
                if (message.localHash != null && $Object.hasOwnProperty.call(message, "localHash"))
                    object.localHash = message.localHash;
                if (message.isNote != null && $Object.hasOwnProperty.call(message, "isNote"))
                    object.isNote = message.isNote;
                return object;
            };

            /**
             * Converts this Conflict to JSON.
             * @function toJSON
             * @memberof fns.v3.Conflict
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Conflict.prototype.toJSON = function() {
                return Conflict.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the type url for Conflict
             * @function getTypeUrl
             * @memberof fns.v3.Conflict
             * @static
             * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
             * @returns {string} The type url
             */
            Conflict.getTypeUrl = function(prefix) {
                if (prefix === $undefined)
                    prefix = "type.googleapis.com";
                return prefix + "/fns.v3.Conflict";
            };

            return Conflict;
        })();

        v3.Change = (function() {

            /**
             * Properties of a Change.
             * @typedef {Object} fns.v3.Change.$Properties
             * @property {string|null} [op] Change op
             * @property {string|null} [oldPath] Change oldPath
             * @property {fns.v3.ManifestItem.$Properties|null} [item] Change item
             * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
             */

            /**
             * Properties of a Change.
             * @memberof fns.v3
             * @interface IChange
             * @augments fns.v3.Change.$Properties
             * @deprecated Use fns.v3.Change.$Properties instead.
             */

            /**
             * Shape of a Change.
             * @typedef {fns.v3.Change.$Properties} fns.v3.Change.$Shape
             */

            /**
             * Constructs a new Change.
             * @memberof fns.v3
             * @classdesc Represents a Change.
             * @constructor
             * @param {fns.v3.Change.$Properties=} [properties] Properties to set
             * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
             */
            const Change = function (properties) {
                if (properties)
                    for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            };

            /**
             * Change op.
             * @member {string} op
             * @memberof fns.v3.Change
             * @instance
             */
            Change.prototype.op = "";

            /**
             * Change oldPath.
             * @member {string} oldPath
             * @memberof fns.v3.Change
             * @instance
             */
            Change.prototype.oldPath = "";

            /**
             * Change item.
             * @member {fns.v3.ManifestItem.$Properties|null|undefined} item
             * @memberof fns.v3.Change
             * @instance
             */
            Change.prototype.item = null;

            /**
             * Creates a new Change instance using the specified properties.
             * @function create
             * @memberof fns.v3.Change
             * @static
             * @param {fns.v3.Change.$Properties=} [properties] Properties to set
             * @returns {fns.v3.Change} Change instance
             * @type {{
             *   (properties: fns.v3.Change.$Shape): fns.v3.Change & fns.v3.Change.$Shape;
             *   (properties?: fns.v3.Change.$Properties): fns.v3.Change;
             * }}
             */
            Change.create = function(properties) {
                return new Change(properties);
            };

            /**
             * Encodes the specified Change message. Does not implicitly {@link fns.v3.Change.verify|verify} messages.
             * @function encode
             * @memberof fns.v3.Change
             * @static
             * @param {fns.v3.Change.$Properties} message Change message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Change.encode = function (message, writer, _depth) {
                if (!writer)
                    writer = $Writer.create();
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                if (message.op != null && $Object.hasOwnProperty.call(message, "op") && message.op !== "")
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.op);
                if (message.oldPath != null && $Object.hasOwnProperty.call(message, "oldPath") && message.oldPath !== "")
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.oldPath);
                if (message.item != null && $Object.hasOwnProperty.call(message, "item"))
                    $root.fns.v3.ManifestItem.encode(message.item, writer.uint32(/* id 3, wireType 2 =*/26).fork(), _depth + 1).ldelim();
                if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                    for (let i = 0; i < message.$unknowns.length; ++i)
                        writer.raw(message.$unknowns[i]);
                return writer;
            };

            /**
             * Encodes the specified Change message, length delimited. Does not implicitly {@link fns.v3.Change.verify|verify} messages.
             * @function encodeDelimited
             * @memberof fns.v3.Change
             * @static
             * @param {fns.v3.Change.$Properties} message Change message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Change.encodeDelimited = function(message, writer) {
                return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
            };

            /**
             * Decodes a Change message from the specified reader or buffer.
             * @function decode
             * @memberof fns.v3.Change
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {fns.v3.Change & fns.v3.Change.$Shape} Change
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Change.decode = function (reader, length, _end, _depth, _target) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $Reader.recursionLimit)
                    throw $Error("max depth exceeded");
                let end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.fns.v3.Change(), value;
                while (reader.pos < end) {
                    let start = reader.pos;
                    let tag = reader.tag();
                    if (tag === _end) {
                        _end = $undefined;
                        break;
                    }
                    let wireType = tag & 7;
                    switch (tag >>>= 3) {
                    case 1: {
                            if (wireType !== 2)
                                break;
                            if ((value = reader.stringVerify()).length)
                                message.op = value;
                            else
                                delete message.op;
                            continue;
                        }
                    case 2: {
                            if (wireType !== 2)
                                break;
                            if ((value = reader.stringVerify()).length)
                                message.oldPath = value;
                            else
                                delete message.oldPath;
                            continue;
                        }
                    case 3: {
                            if (wireType !== 2)
                                break;
                            message.item = $root.fns.v3.ManifestItem.decode(reader, reader.uint32(), $undefined, _depth + 1, message.item);
                            continue;
                        }
                    }
                    reader.skipType(wireType, _depth, tag);
                    if (!reader.discardUnknown) {
                        $util.makeProp(message, "$unknowns", false);
                        (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                    }
                }
                if (_end !== $undefined)
                    throw $Error("missing end group");
                return message;
            };

            /**
             * Decodes a Change message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof fns.v3.Change
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {fns.v3.Change & fns.v3.Change.$Shape} Change
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Change.decodeDelimited = function(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Change message.
             * @function verify
             * @memberof fns.v3.Change
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Change.verify = function (message, _depth) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    return "max depth exceeded";
                if (message.op != null && $Object.hasOwnProperty.call(message, "op"))
                    if (!$util.isString(message.op))
                        return "op: string expected";
                if (message.oldPath != null && $Object.hasOwnProperty.call(message, "oldPath"))
                    if (!$util.isString(message.oldPath))
                        return "oldPath: string expected";
                if (message.item != null && $Object.hasOwnProperty.call(message, "item")) {
                    let error = $root.fns.v3.ManifestItem.verify(message.item, _depth + 1);
                    if (error)
                        return "item." + error;
                }
                return null;
            };

            /**
             * Creates a Change message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof fns.v3.Change
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {fns.v3.Change} Change
             */
            Change.fromObject = function (object, _depth) {
                if (object instanceof $root.fns.v3.Change)
                    return object;
                if (!$util.isObject(object))
                    throw $TypeError(".fns.v3.Change: object expected");
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                let message = new $root.fns.v3.Change();
                if (object.op != null)
                    if (typeof object.op !== "string" || object.op.length)
                        message.op = $String(object.op);
                if (object.oldPath != null)
                    if (typeof object.oldPath !== "string" || object.oldPath.length)
                        message.oldPath = $String(object.oldPath);
                if (object.item != null) {
                    if (!$util.isObject(object.item))
                        throw $TypeError(".fns.v3.Change.item: object expected");
                    message.item = $root.fns.v3.ManifestItem.fromObject(object.item, _depth + 1);
                }
                return message;
            };

            /**
             * Creates a plain object from a Change message. Also converts values to other types if specified.
             * @function toObject
             * @memberof fns.v3.Change
             * @static
             * @param {fns.v3.Change} message Change
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Change.toObject = function (message, options, _depth) {
                if (!options)
                    options = {};
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                let object = {};
                if (options.defaults) {
                    object.op = "";
                    object.oldPath = "";
                    object.item = null;
                }
                if (message.op != null && $Object.hasOwnProperty.call(message, "op"))
                    object.op = message.op;
                if (message.oldPath != null && $Object.hasOwnProperty.call(message, "oldPath"))
                    object.oldPath = message.oldPath;
                if (message.item != null && $Object.hasOwnProperty.call(message, "item"))
                    object.item = $root.fns.v3.ManifestItem.toObject(message.item, options, _depth + 1);
                return object;
            };

            /**
             * Converts this Change to JSON.
             * @function toJSON
             * @memberof fns.v3.Change
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Change.prototype.toJSON = function() {
                return Change.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the type url for Change
             * @function getTypeUrl
             * @memberof fns.v3.Change
             * @static
             * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
             * @returns {string} The type url
             */
            Change.getTypeUrl = function(prefix) {
                if (prefix === $undefined)
                    prefix = "type.googleapis.com";
                return prefix + "/fns.v3.Change";
            };

            return Change;
        })();

        v3.V3SyncRequest = (function() {

            /**
             * Properties of a V3SyncRequest.
             * @typedef {Object} fns.v3.V3SyncRequest.$Properties
             * @property {string|null} [vault] V3SyncRequest vault
             * @property {number|Long|null} [baseEpoch] V3SyncRequest baseEpoch
             * @property {Array.<fns.v3.ManifestItem.$Properties>|null} [manifest] V3SyncRequest manifest
             * @property {Array.<fns.v3.Tombstone.$Properties>|null} [tombstones] V3SyncRequest tombstones
             * @property {fns.v3.Scope.$Properties|null} [scope] V3SyncRequest scope
             * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
             */

            /**
             * Properties of a V3SyncRequest.
             * @memberof fns.v3
             * @interface IV3SyncRequest
             * @augments fns.v3.V3SyncRequest.$Properties
             * @deprecated Use fns.v3.V3SyncRequest.$Properties instead.
             */

            /**
             * Shape of a V3SyncRequest.
             * @typedef {fns.v3.V3SyncRequest.$Properties} fns.v3.V3SyncRequest.$Shape
             */

            /**
             * Constructs a new V3SyncRequest.
             * @memberof fns.v3
             * @classdesc Represents a V3SyncRequest.
             * @constructor
             * @param {fns.v3.V3SyncRequest.$Properties=} [properties] Properties to set
             * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
             */
            const V3SyncRequest = function (properties) {
                this.manifest = [];
                this.tombstones = [];
                if (properties)
                    for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            };

            /**
             * V3SyncRequest vault.
             * @member {string} vault
             * @memberof fns.v3.V3SyncRequest
             * @instance
             */
            V3SyncRequest.prototype.vault = "";

            /**
             * V3SyncRequest baseEpoch.
             * @member {number|Long} baseEpoch
             * @memberof fns.v3.V3SyncRequest
             * @instance
             */
            V3SyncRequest.prototype.baseEpoch = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * V3SyncRequest manifest.
             * @member {Array.<fns.v3.ManifestItem.$Properties>} manifest
             * @memberof fns.v3.V3SyncRequest
             * @instance
             */
            V3SyncRequest.prototype.manifest = $util.emptyArray;

            /**
             * V3SyncRequest tombstones.
             * @member {Array.<fns.v3.Tombstone.$Properties>} tombstones
             * @memberof fns.v3.V3SyncRequest
             * @instance
             */
            V3SyncRequest.prototype.tombstones = $util.emptyArray;

            /**
             * V3SyncRequest scope.
             * @member {fns.v3.Scope.$Properties|null|undefined} scope
             * @memberof fns.v3.V3SyncRequest
             * @instance
             */
            V3SyncRequest.prototype.scope = null;

            /**
             * Creates a new V3SyncRequest instance using the specified properties.
             * @function create
             * @memberof fns.v3.V3SyncRequest
             * @static
             * @param {fns.v3.V3SyncRequest.$Properties=} [properties] Properties to set
             * @returns {fns.v3.V3SyncRequest} V3SyncRequest instance
             * @type {{
             *   (properties: fns.v3.V3SyncRequest.$Shape): fns.v3.V3SyncRequest & fns.v3.V3SyncRequest.$Shape;
             *   (properties?: fns.v3.V3SyncRequest.$Properties): fns.v3.V3SyncRequest;
             * }}
             */
            V3SyncRequest.create = function(properties) {
                return new V3SyncRequest(properties);
            };

            /**
             * Encodes the specified V3SyncRequest message. Does not implicitly {@link fns.v3.V3SyncRequest.verify|verify} messages.
             * @function encode
             * @memberof fns.v3.V3SyncRequest
             * @static
             * @param {fns.v3.V3SyncRequest.$Properties} message V3SyncRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            V3SyncRequest.encode = function (message, writer, _depth) {
                if (!writer)
                    writer = $Writer.create();
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                if (message.vault != null && $Object.hasOwnProperty.call(message, "vault") && message.vault !== "")
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.vault);
                if (message.baseEpoch != null && $Object.hasOwnProperty.call(message, "baseEpoch") && (typeof message.baseEpoch === "object" ? message.baseEpoch.low || message.baseEpoch.high : message.baseEpoch !== 0))
                    writer.uint32(/* id 2, wireType 0 =*/16).int64(message.baseEpoch);
                if (message.manifest != null && message.manifest.length)
                    for (let i = 0; i < message.manifest.length; ++i)
                        $root.fns.v3.ManifestItem.encode(message.manifest[i], writer.uint32(/* id 3, wireType 2 =*/26).fork(), _depth + 1).ldelim();
                if (message.tombstones != null && message.tombstones.length)
                    for (let i = 0; i < message.tombstones.length; ++i)
                        $root.fns.v3.Tombstone.encode(message.tombstones[i], writer.uint32(/* id 4, wireType 2 =*/34).fork(), _depth + 1).ldelim();
                if (message.scope != null && $Object.hasOwnProperty.call(message, "scope"))
                    $root.fns.v3.Scope.encode(message.scope, writer.uint32(/* id 5, wireType 2 =*/42).fork(), _depth + 1).ldelim();
                if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                    for (let i = 0; i < message.$unknowns.length; ++i)
                        writer.raw(message.$unknowns[i]);
                return writer;
            };

            /**
             * Encodes the specified V3SyncRequest message, length delimited. Does not implicitly {@link fns.v3.V3SyncRequest.verify|verify} messages.
             * @function encodeDelimited
             * @memberof fns.v3.V3SyncRequest
             * @static
             * @param {fns.v3.V3SyncRequest.$Properties} message V3SyncRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            V3SyncRequest.encodeDelimited = function(message, writer) {
                return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
            };

            /**
             * Decodes a V3SyncRequest message from the specified reader or buffer.
             * @function decode
             * @memberof fns.v3.V3SyncRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {fns.v3.V3SyncRequest & fns.v3.V3SyncRequest.$Shape} V3SyncRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            V3SyncRequest.decode = function (reader, length, _end, _depth, _target) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $Reader.recursionLimit)
                    throw $Error("max depth exceeded");
                let end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.fns.v3.V3SyncRequest(), value;
                while (reader.pos < end) {
                    let start = reader.pos;
                    let tag = reader.tag();
                    if (tag === _end) {
                        _end = $undefined;
                        break;
                    }
                    let wireType = tag & 7;
                    switch (tag >>>= 3) {
                    case 1: {
                            if (wireType !== 2)
                                break;
                            if ((value = reader.stringVerify()).length)
                                message.vault = value;
                            else
                                delete message.vault;
                            continue;
                        }
                    case 2: {
                            if (wireType !== 0)
                                break;
                            if (typeof (value = reader.int64()) === "object" ? value.low || value.high : value !== 0)
                                message.baseEpoch = value;
                            else
                                delete message.baseEpoch;
                            continue;
                        }
                    case 3: {
                            if (wireType !== 2)
                                break;
                            if (!(message.manifest && message.manifest.length))
                                message.manifest = [];
                            message.manifest.push($root.fns.v3.ManifestItem.decode(reader, reader.uint32(), $undefined, _depth + 1));
                            continue;
                        }
                    case 4: {
                            if (wireType !== 2)
                                break;
                            if (!(message.tombstones && message.tombstones.length))
                                message.tombstones = [];
                            message.tombstones.push($root.fns.v3.Tombstone.decode(reader, reader.uint32(), $undefined, _depth + 1));
                            continue;
                        }
                    case 5: {
                            if (wireType !== 2)
                                break;
                            message.scope = $root.fns.v3.Scope.decode(reader, reader.uint32(), $undefined, _depth + 1, message.scope);
                            continue;
                        }
                    }
                    reader.skipType(wireType, _depth, tag);
                    if (!reader.discardUnknown) {
                        $util.makeProp(message, "$unknowns", false);
                        (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                    }
                }
                if (_end !== $undefined)
                    throw $Error("missing end group");
                return message;
            };

            /**
             * Decodes a V3SyncRequest message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof fns.v3.V3SyncRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {fns.v3.V3SyncRequest & fns.v3.V3SyncRequest.$Shape} V3SyncRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            V3SyncRequest.decodeDelimited = function(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a V3SyncRequest message.
             * @function verify
             * @memberof fns.v3.V3SyncRequest
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            V3SyncRequest.verify = function (message, _depth) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    return "max depth exceeded";
                if (message.vault != null && $Object.hasOwnProperty.call(message, "vault"))
                    if (!$util.isString(message.vault))
                        return "vault: string expected";
                if (message.baseEpoch != null && $Object.hasOwnProperty.call(message, "baseEpoch"))
                    if (!$util.isInteger(message.baseEpoch) && !(message.baseEpoch && $util.isInteger(message.baseEpoch.low) && $util.isInteger(message.baseEpoch.high)))
                        return "baseEpoch: integer|Long expected";
                if (message.manifest != null && $Object.hasOwnProperty.call(message, "manifest")) {
                    if (!$Array.isArray(message.manifest))
                        return "manifest: array expected";
                    for (let i = 0; i < message.manifest.length; ++i) {
                        let error = $root.fns.v3.ManifestItem.verify(message.manifest[i], _depth + 1);
                        if (error)
                            return "manifest." + error;
                    }
                }
                if (message.tombstones != null && $Object.hasOwnProperty.call(message, "tombstones")) {
                    if (!$Array.isArray(message.tombstones))
                        return "tombstones: array expected";
                    for (let i = 0; i < message.tombstones.length; ++i) {
                        let error = $root.fns.v3.Tombstone.verify(message.tombstones[i], _depth + 1);
                        if (error)
                            return "tombstones." + error;
                    }
                }
                if (message.scope != null && $Object.hasOwnProperty.call(message, "scope")) {
                    let error = $root.fns.v3.Scope.verify(message.scope, _depth + 1);
                    if (error)
                        return "scope." + error;
                }
                return null;
            };

            /**
             * Creates a V3SyncRequest message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof fns.v3.V3SyncRequest
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {fns.v3.V3SyncRequest} V3SyncRequest
             */
            V3SyncRequest.fromObject = function (object, _depth) {
                if (object instanceof $root.fns.v3.V3SyncRequest)
                    return object;
                if (!$util.isObject(object))
                    throw $TypeError(".fns.v3.V3SyncRequest: object expected");
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                let message = new $root.fns.v3.V3SyncRequest();
                if (object.vault != null)
                    if (typeof object.vault !== "string" || object.vault.length)
                        message.vault = $String(object.vault);
                if (object.baseEpoch != null)
                    if (typeof object.baseEpoch === "object" ? object.baseEpoch.low || object.baseEpoch.high : $Number(object.baseEpoch) !== 0)
                        if ($util.Long)
                            message.baseEpoch = $util.Long.fromValue(object.baseEpoch, false);
                        else if (typeof object.baseEpoch === "string")
                            message.baseEpoch = $parseInt(object.baseEpoch, 10);
                        else if (typeof object.baseEpoch === "number")
                            message.baseEpoch = object.baseEpoch;
                        else if (typeof object.baseEpoch === "object")
                            message.baseEpoch = new $util.LongBits(object.baseEpoch.low >>> 0, object.baseEpoch.high >>> 0).toNumber();
                if (object.manifest) {
                    if (!$Array.isArray(object.manifest))
                        throw $TypeError(".fns.v3.V3SyncRequest.manifest: array expected");
                    message.manifest = $Array(object.manifest.length);
                    for (let i = 0; i < object.manifest.length; ++i) {
                        if (!$util.isObject(object.manifest[i]))
                            throw $TypeError(".fns.v3.V3SyncRequest.manifest: object expected");
                        message.manifest[i] = $root.fns.v3.ManifestItem.fromObject(object.manifest[i], _depth + 1);
                    }
                }
                if (object.tombstones) {
                    if (!$Array.isArray(object.tombstones))
                        throw $TypeError(".fns.v3.V3SyncRequest.tombstones: array expected");
                    message.tombstones = $Array(object.tombstones.length);
                    for (let i = 0; i < object.tombstones.length; ++i) {
                        if (!$util.isObject(object.tombstones[i]))
                            throw $TypeError(".fns.v3.V3SyncRequest.tombstones: object expected");
                        message.tombstones[i] = $root.fns.v3.Tombstone.fromObject(object.tombstones[i], _depth + 1);
                    }
                }
                if (object.scope != null) {
                    if (!$util.isObject(object.scope))
                        throw $TypeError(".fns.v3.V3SyncRequest.scope: object expected");
                    message.scope = $root.fns.v3.Scope.fromObject(object.scope, _depth + 1);
                }
                return message;
            };

            /**
             * Creates a plain object from a V3SyncRequest message. Also converts values to other types if specified.
             * @function toObject
             * @memberof fns.v3.V3SyncRequest
             * @static
             * @param {fns.v3.V3SyncRequest} message V3SyncRequest
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            V3SyncRequest.toObject = function (message, options, _depth) {
                if (!options)
                    options = {};
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                let object = {};
                if (options.arrays || options.defaults) {
                    object.manifest = [];
                    object.tombstones = [];
                }
                if (options.defaults) {
                    object.vault = "";
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, false);
                        object.baseEpoch = options.longs === $String ? long.toString() : options.longs === $Number ? long.toNumber() : typeof $BigInt !== "undefined" && options.longs === $BigInt ? long.toBigInt() : long;
                    } else
                        object.baseEpoch = options.longs === $String ? "0" : typeof $BigInt !== "undefined" && options.longs === $BigInt ? $BigInt("0") : 0;
                    object.scope = null;
                }
                if (message.vault != null && $Object.hasOwnProperty.call(message, "vault"))
                    object.vault = message.vault;
                if (message.baseEpoch != null && $Object.hasOwnProperty.call(message, "baseEpoch"))
                    if (typeof $BigInt !== "undefined" && options.longs === $BigInt)
                        object.baseEpoch = typeof message.baseEpoch === "number" ? $BigInt(message.baseEpoch) : $util.Long.fromBits(message.baseEpoch.low >>> 0, message.baseEpoch.high >>> 0, false).toBigInt();
                    else if (typeof message.baseEpoch === "number")
                        object.baseEpoch = options.longs === $String ? $String(message.baseEpoch) : message.baseEpoch;
                    else
                        object.baseEpoch = options.longs === $String ? $util.Long.prototype.toString.call(message.baseEpoch) : options.longs === $Number ? new $util.LongBits(message.baseEpoch.low >>> 0, message.baseEpoch.high >>> 0).toNumber() : message.baseEpoch;
                if (message.manifest && message.manifest.length) {
                    object.manifest = $Array(message.manifest.length);
                    for (let j = 0; j < message.manifest.length; ++j)
                        object.manifest[j] = $root.fns.v3.ManifestItem.toObject(message.manifest[j], options, _depth + 1);
                }
                if (message.tombstones && message.tombstones.length) {
                    object.tombstones = $Array(message.tombstones.length);
                    for (let j = 0; j < message.tombstones.length; ++j)
                        object.tombstones[j] = $root.fns.v3.Tombstone.toObject(message.tombstones[j], options, _depth + 1);
                }
                if (message.scope != null && $Object.hasOwnProperty.call(message, "scope"))
                    object.scope = $root.fns.v3.Scope.toObject(message.scope, options, _depth + 1);
                return object;
            };

            /**
             * Converts this V3SyncRequest to JSON.
             * @function toJSON
             * @memberof fns.v3.V3SyncRequest
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            V3SyncRequest.prototype.toJSON = function() {
                return V3SyncRequest.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the type url for V3SyncRequest
             * @function getTypeUrl
             * @memberof fns.v3.V3SyncRequest
             * @static
             * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
             * @returns {string} The type url
             */
            V3SyncRequest.getTypeUrl = function(prefix) {
                if (prefix === $undefined)
                    prefix = "type.googleapis.com";
                return prefix + "/fns.v3.V3SyncRequest";
            };

            return V3SyncRequest;
        })();

        v3.V3SyncPlanMessage = (function() {

            /**
             * Properties of a V3SyncPlanMessage.
             * @typedef {Object} fns.v3.V3SyncPlanMessage.$Properties
             * @property {string|null} [vault] V3SyncPlanMessage vault
             * @property {number|Long|null} [serverEpoch] V3SyncPlanMessage serverEpoch
             * @property {number|Long|null} [baseEpoch] V3SyncPlanMessage baseEpoch
             * @property {Array.<fns.v3.Op.$Properties>|null} [ops] V3SyncPlanMessage ops
             * @property {Array.<fns.v3.Conflict.$Properties>|null} [conflicts] V3SyncPlanMessage conflicts
             * @property {Array.<fns.v3.Change.$Properties>|null} [expected] V3SyncPlanMessage expected
             * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
             */

            /**
             * Properties of a V3SyncPlanMessage.
             * @memberof fns.v3
             * @interface IV3SyncPlanMessage
             * @augments fns.v3.V3SyncPlanMessage.$Properties
             * @deprecated Use fns.v3.V3SyncPlanMessage.$Properties instead.
             */

            /**
             * Shape of a V3SyncPlanMessage.
             * @typedef {fns.v3.V3SyncPlanMessage.$Properties} fns.v3.V3SyncPlanMessage.$Shape
             */

            /**
             * Constructs a new V3SyncPlanMessage.
             * @memberof fns.v3
             * @classdesc Represents a V3SyncPlanMessage.
             * @constructor
             * @param {fns.v3.V3SyncPlanMessage.$Properties=} [properties] Properties to set
             * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
             */
            const V3SyncPlanMessage = function (properties) {
                this.ops = [];
                this.conflicts = [];
                this.expected = [];
                if (properties)
                    for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            };

            /**
             * V3SyncPlanMessage vault.
             * @member {string} vault
             * @memberof fns.v3.V3SyncPlanMessage
             * @instance
             */
            V3SyncPlanMessage.prototype.vault = "";

            /**
             * V3SyncPlanMessage serverEpoch.
             * @member {number|Long} serverEpoch
             * @memberof fns.v3.V3SyncPlanMessage
             * @instance
             */
            V3SyncPlanMessage.prototype.serverEpoch = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * V3SyncPlanMessage baseEpoch.
             * @member {number|Long} baseEpoch
             * @memberof fns.v3.V3SyncPlanMessage
             * @instance
             */
            V3SyncPlanMessage.prototype.baseEpoch = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * V3SyncPlanMessage ops.
             * @member {Array.<fns.v3.Op.$Properties>} ops
             * @memberof fns.v3.V3SyncPlanMessage
             * @instance
             */
            V3SyncPlanMessage.prototype.ops = $util.emptyArray;

            /**
             * V3SyncPlanMessage conflicts.
             * @member {Array.<fns.v3.Conflict.$Properties>} conflicts
             * @memberof fns.v3.V3SyncPlanMessage
             * @instance
             */
            V3SyncPlanMessage.prototype.conflicts = $util.emptyArray;

            /**
             * V3SyncPlanMessage expected.
             * @member {Array.<fns.v3.Change.$Properties>} expected
             * @memberof fns.v3.V3SyncPlanMessage
             * @instance
             */
            V3SyncPlanMessage.prototype.expected = $util.emptyArray;

            /**
             * Creates a new V3SyncPlanMessage instance using the specified properties.
             * @function create
             * @memberof fns.v3.V3SyncPlanMessage
             * @static
             * @param {fns.v3.V3SyncPlanMessage.$Properties=} [properties] Properties to set
             * @returns {fns.v3.V3SyncPlanMessage} V3SyncPlanMessage instance
             * @type {{
             *   (properties: fns.v3.V3SyncPlanMessage.$Shape): fns.v3.V3SyncPlanMessage & fns.v3.V3SyncPlanMessage.$Shape;
             *   (properties?: fns.v3.V3SyncPlanMessage.$Properties): fns.v3.V3SyncPlanMessage;
             * }}
             */
            V3SyncPlanMessage.create = function(properties) {
                return new V3SyncPlanMessage(properties);
            };

            /**
             * Encodes the specified V3SyncPlanMessage message. Does not implicitly {@link fns.v3.V3SyncPlanMessage.verify|verify} messages.
             * @function encode
             * @memberof fns.v3.V3SyncPlanMessage
             * @static
             * @param {fns.v3.V3SyncPlanMessage.$Properties} message V3SyncPlanMessage message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            V3SyncPlanMessage.encode = function (message, writer, _depth) {
                if (!writer)
                    writer = $Writer.create();
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                if (message.vault != null && $Object.hasOwnProperty.call(message, "vault") && message.vault !== "")
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.vault);
                if (message.serverEpoch != null && $Object.hasOwnProperty.call(message, "serverEpoch") && (typeof message.serverEpoch === "object" ? message.serverEpoch.low || message.serverEpoch.high : message.serverEpoch !== 0))
                    writer.uint32(/* id 2, wireType 0 =*/16).int64(message.serverEpoch);
                if (message.baseEpoch != null && $Object.hasOwnProperty.call(message, "baseEpoch") && (typeof message.baseEpoch === "object" ? message.baseEpoch.low || message.baseEpoch.high : message.baseEpoch !== 0))
                    writer.uint32(/* id 3, wireType 0 =*/24).int64(message.baseEpoch);
                if (message.ops != null && message.ops.length)
                    for (let i = 0; i < message.ops.length; ++i)
                        $root.fns.v3.Op.encode(message.ops[i], writer.uint32(/* id 4, wireType 2 =*/34).fork(), _depth + 1).ldelim();
                if (message.conflicts != null && message.conflicts.length)
                    for (let i = 0; i < message.conflicts.length; ++i)
                        $root.fns.v3.Conflict.encode(message.conflicts[i], writer.uint32(/* id 5, wireType 2 =*/42).fork(), _depth + 1).ldelim();
                if (message.expected != null && message.expected.length)
                    for (let i = 0; i < message.expected.length; ++i)
                        $root.fns.v3.Change.encode(message.expected[i], writer.uint32(/* id 6, wireType 2 =*/50).fork(), _depth + 1).ldelim();
                if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                    for (let i = 0; i < message.$unknowns.length; ++i)
                        writer.raw(message.$unknowns[i]);
                return writer;
            };

            /**
             * Encodes the specified V3SyncPlanMessage message, length delimited. Does not implicitly {@link fns.v3.V3SyncPlanMessage.verify|verify} messages.
             * @function encodeDelimited
             * @memberof fns.v3.V3SyncPlanMessage
             * @static
             * @param {fns.v3.V3SyncPlanMessage.$Properties} message V3SyncPlanMessage message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            V3SyncPlanMessage.encodeDelimited = function(message, writer) {
                return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
            };

            /**
             * Decodes a V3SyncPlanMessage message from the specified reader or buffer.
             * @function decode
             * @memberof fns.v3.V3SyncPlanMessage
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {fns.v3.V3SyncPlanMessage & fns.v3.V3SyncPlanMessage.$Shape} V3SyncPlanMessage
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            V3SyncPlanMessage.decode = function (reader, length, _end, _depth, _target) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $Reader.recursionLimit)
                    throw $Error("max depth exceeded");
                let end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.fns.v3.V3SyncPlanMessage(), value;
                while (reader.pos < end) {
                    let start = reader.pos;
                    let tag = reader.tag();
                    if (tag === _end) {
                        _end = $undefined;
                        break;
                    }
                    let wireType = tag & 7;
                    switch (tag >>>= 3) {
                    case 1: {
                            if (wireType !== 2)
                                break;
                            if ((value = reader.stringVerify()).length)
                                message.vault = value;
                            else
                                delete message.vault;
                            continue;
                        }
                    case 2: {
                            if (wireType !== 0)
                                break;
                            if (typeof (value = reader.int64()) === "object" ? value.low || value.high : value !== 0)
                                message.serverEpoch = value;
                            else
                                delete message.serverEpoch;
                            continue;
                        }
                    case 3: {
                            if (wireType !== 0)
                                break;
                            if (typeof (value = reader.int64()) === "object" ? value.low || value.high : value !== 0)
                                message.baseEpoch = value;
                            else
                                delete message.baseEpoch;
                            continue;
                        }
                    case 4: {
                            if (wireType !== 2)
                                break;
                            if (!(message.ops && message.ops.length))
                                message.ops = [];
                            message.ops.push($root.fns.v3.Op.decode(reader, reader.uint32(), $undefined, _depth + 1));
                            continue;
                        }
                    case 5: {
                            if (wireType !== 2)
                                break;
                            if (!(message.conflicts && message.conflicts.length))
                                message.conflicts = [];
                            message.conflicts.push($root.fns.v3.Conflict.decode(reader, reader.uint32(), $undefined, _depth + 1));
                            continue;
                        }
                    case 6: {
                            if (wireType !== 2)
                                break;
                            if (!(message.expected && message.expected.length))
                                message.expected = [];
                            message.expected.push($root.fns.v3.Change.decode(reader, reader.uint32(), $undefined, _depth + 1));
                            continue;
                        }
                    }
                    reader.skipType(wireType, _depth, tag);
                    if (!reader.discardUnknown) {
                        $util.makeProp(message, "$unknowns", false);
                        (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                    }
                }
                if (_end !== $undefined)
                    throw $Error("missing end group");
                return message;
            };

            /**
             * Decodes a V3SyncPlanMessage message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof fns.v3.V3SyncPlanMessage
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {fns.v3.V3SyncPlanMessage & fns.v3.V3SyncPlanMessage.$Shape} V3SyncPlanMessage
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            V3SyncPlanMessage.decodeDelimited = function(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a V3SyncPlanMessage message.
             * @function verify
             * @memberof fns.v3.V3SyncPlanMessage
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            V3SyncPlanMessage.verify = function (message, _depth) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    return "max depth exceeded";
                if (message.vault != null && $Object.hasOwnProperty.call(message, "vault"))
                    if (!$util.isString(message.vault))
                        return "vault: string expected";
                if (message.serverEpoch != null && $Object.hasOwnProperty.call(message, "serverEpoch"))
                    if (!$util.isInteger(message.serverEpoch) && !(message.serverEpoch && $util.isInteger(message.serverEpoch.low) && $util.isInteger(message.serverEpoch.high)))
                        return "serverEpoch: integer|Long expected";
                if (message.baseEpoch != null && $Object.hasOwnProperty.call(message, "baseEpoch"))
                    if (!$util.isInteger(message.baseEpoch) && !(message.baseEpoch && $util.isInteger(message.baseEpoch.low) && $util.isInteger(message.baseEpoch.high)))
                        return "baseEpoch: integer|Long expected";
                if (message.ops != null && $Object.hasOwnProperty.call(message, "ops")) {
                    if (!$Array.isArray(message.ops))
                        return "ops: array expected";
                    for (let i = 0; i < message.ops.length; ++i) {
                        let error = $root.fns.v3.Op.verify(message.ops[i], _depth + 1);
                        if (error)
                            return "ops." + error;
                    }
                }
                if (message.conflicts != null && $Object.hasOwnProperty.call(message, "conflicts")) {
                    if (!$Array.isArray(message.conflicts))
                        return "conflicts: array expected";
                    for (let i = 0; i < message.conflicts.length; ++i) {
                        let error = $root.fns.v3.Conflict.verify(message.conflicts[i], _depth + 1);
                        if (error)
                            return "conflicts." + error;
                    }
                }
                if (message.expected != null && $Object.hasOwnProperty.call(message, "expected")) {
                    if (!$Array.isArray(message.expected))
                        return "expected: array expected";
                    for (let i = 0; i < message.expected.length; ++i) {
                        let error = $root.fns.v3.Change.verify(message.expected[i], _depth + 1);
                        if (error)
                            return "expected." + error;
                    }
                }
                return null;
            };

            /**
             * Creates a V3SyncPlanMessage message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof fns.v3.V3SyncPlanMessage
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {fns.v3.V3SyncPlanMessage} V3SyncPlanMessage
             */
            V3SyncPlanMessage.fromObject = function (object, _depth) {
                if (object instanceof $root.fns.v3.V3SyncPlanMessage)
                    return object;
                if (!$util.isObject(object))
                    throw $TypeError(".fns.v3.V3SyncPlanMessage: object expected");
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                let message = new $root.fns.v3.V3SyncPlanMessage();
                if (object.vault != null)
                    if (typeof object.vault !== "string" || object.vault.length)
                        message.vault = $String(object.vault);
                if (object.serverEpoch != null)
                    if (typeof object.serverEpoch === "object" ? object.serverEpoch.low || object.serverEpoch.high : $Number(object.serverEpoch) !== 0)
                        if ($util.Long)
                            message.serverEpoch = $util.Long.fromValue(object.serverEpoch, false);
                        else if (typeof object.serverEpoch === "string")
                            message.serverEpoch = $parseInt(object.serverEpoch, 10);
                        else if (typeof object.serverEpoch === "number")
                            message.serverEpoch = object.serverEpoch;
                        else if (typeof object.serverEpoch === "object")
                            message.serverEpoch = new $util.LongBits(object.serverEpoch.low >>> 0, object.serverEpoch.high >>> 0).toNumber();
                if (object.baseEpoch != null)
                    if (typeof object.baseEpoch === "object" ? object.baseEpoch.low || object.baseEpoch.high : $Number(object.baseEpoch) !== 0)
                        if ($util.Long)
                            message.baseEpoch = $util.Long.fromValue(object.baseEpoch, false);
                        else if (typeof object.baseEpoch === "string")
                            message.baseEpoch = $parseInt(object.baseEpoch, 10);
                        else if (typeof object.baseEpoch === "number")
                            message.baseEpoch = object.baseEpoch;
                        else if (typeof object.baseEpoch === "object")
                            message.baseEpoch = new $util.LongBits(object.baseEpoch.low >>> 0, object.baseEpoch.high >>> 0).toNumber();
                if (object.ops) {
                    if (!$Array.isArray(object.ops))
                        throw $TypeError(".fns.v3.V3SyncPlanMessage.ops: array expected");
                    message.ops = $Array(object.ops.length);
                    for (let i = 0; i < object.ops.length; ++i) {
                        if (!$util.isObject(object.ops[i]))
                            throw $TypeError(".fns.v3.V3SyncPlanMessage.ops: object expected");
                        message.ops[i] = $root.fns.v3.Op.fromObject(object.ops[i], _depth + 1);
                    }
                }
                if (object.conflicts) {
                    if (!$Array.isArray(object.conflicts))
                        throw $TypeError(".fns.v3.V3SyncPlanMessage.conflicts: array expected");
                    message.conflicts = $Array(object.conflicts.length);
                    for (let i = 0; i < object.conflicts.length; ++i) {
                        if (!$util.isObject(object.conflicts[i]))
                            throw $TypeError(".fns.v3.V3SyncPlanMessage.conflicts: object expected");
                        message.conflicts[i] = $root.fns.v3.Conflict.fromObject(object.conflicts[i], _depth + 1);
                    }
                }
                if (object.expected) {
                    if (!$Array.isArray(object.expected))
                        throw $TypeError(".fns.v3.V3SyncPlanMessage.expected: array expected");
                    message.expected = $Array(object.expected.length);
                    for (let i = 0; i < object.expected.length; ++i) {
                        if (!$util.isObject(object.expected[i]))
                            throw $TypeError(".fns.v3.V3SyncPlanMessage.expected: object expected");
                        message.expected[i] = $root.fns.v3.Change.fromObject(object.expected[i], _depth + 1);
                    }
                }
                return message;
            };

            /**
             * Creates a plain object from a V3SyncPlanMessage message. Also converts values to other types if specified.
             * @function toObject
             * @memberof fns.v3.V3SyncPlanMessage
             * @static
             * @param {fns.v3.V3SyncPlanMessage} message V3SyncPlanMessage
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            V3SyncPlanMessage.toObject = function (message, options, _depth) {
                if (!options)
                    options = {};
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                let object = {};
                if (options.arrays || options.defaults) {
                    object.ops = [];
                    object.conflicts = [];
                    object.expected = [];
                }
                if (options.defaults) {
                    object.vault = "";
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, false);
                        object.serverEpoch = options.longs === $String ? long.toString() : options.longs === $Number ? long.toNumber() : typeof $BigInt !== "undefined" && options.longs === $BigInt ? long.toBigInt() : long;
                    } else
                        object.serverEpoch = options.longs === $String ? "0" : typeof $BigInt !== "undefined" && options.longs === $BigInt ? $BigInt("0") : 0;
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, false);
                        object.baseEpoch = options.longs === $String ? long.toString() : options.longs === $Number ? long.toNumber() : typeof $BigInt !== "undefined" && options.longs === $BigInt ? long.toBigInt() : long;
                    } else
                        object.baseEpoch = options.longs === $String ? "0" : typeof $BigInt !== "undefined" && options.longs === $BigInt ? $BigInt("0") : 0;
                }
                if (message.vault != null && $Object.hasOwnProperty.call(message, "vault"))
                    object.vault = message.vault;
                if (message.serverEpoch != null && $Object.hasOwnProperty.call(message, "serverEpoch"))
                    if (typeof $BigInt !== "undefined" && options.longs === $BigInt)
                        object.serverEpoch = typeof message.serverEpoch === "number" ? $BigInt(message.serverEpoch) : $util.Long.fromBits(message.serverEpoch.low >>> 0, message.serverEpoch.high >>> 0, false).toBigInt();
                    else if (typeof message.serverEpoch === "number")
                        object.serverEpoch = options.longs === $String ? $String(message.serverEpoch) : message.serverEpoch;
                    else
                        object.serverEpoch = options.longs === $String ? $util.Long.prototype.toString.call(message.serverEpoch) : options.longs === $Number ? new $util.LongBits(message.serverEpoch.low >>> 0, message.serverEpoch.high >>> 0).toNumber() : message.serverEpoch;
                if (message.baseEpoch != null && $Object.hasOwnProperty.call(message, "baseEpoch"))
                    if (typeof $BigInt !== "undefined" && options.longs === $BigInt)
                        object.baseEpoch = typeof message.baseEpoch === "number" ? $BigInt(message.baseEpoch) : $util.Long.fromBits(message.baseEpoch.low >>> 0, message.baseEpoch.high >>> 0, false).toBigInt();
                    else if (typeof message.baseEpoch === "number")
                        object.baseEpoch = options.longs === $String ? $String(message.baseEpoch) : message.baseEpoch;
                    else
                        object.baseEpoch = options.longs === $String ? $util.Long.prototype.toString.call(message.baseEpoch) : options.longs === $Number ? new $util.LongBits(message.baseEpoch.low >>> 0, message.baseEpoch.high >>> 0).toNumber() : message.baseEpoch;
                if (message.ops && message.ops.length) {
                    object.ops = $Array(message.ops.length);
                    for (let j = 0; j < message.ops.length; ++j)
                        object.ops[j] = $root.fns.v3.Op.toObject(message.ops[j], options, _depth + 1);
                }
                if (message.conflicts && message.conflicts.length) {
                    object.conflicts = $Array(message.conflicts.length);
                    for (let j = 0; j < message.conflicts.length; ++j)
                        object.conflicts[j] = $root.fns.v3.Conflict.toObject(message.conflicts[j], options, _depth + 1);
                }
                if (message.expected && message.expected.length) {
                    object.expected = $Array(message.expected.length);
                    for (let j = 0; j < message.expected.length; ++j)
                        object.expected[j] = $root.fns.v3.Change.toObject(message.expected[j], options, _depth + 1);
                }
                return object;
            };

            /**
             * Converts this V3SyncPlanMessage to JSON.
             * @function toJSON
             * @memberof fns.v3.V3SyncPlanMessage
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            V3SyncPlanMessage.prototype.toJSON = function() {
                return V3SyncPlanMessage.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the type url for V3SyncPlanMessage
             * @function getTypeUrl
             * @memberof fns.v3.V3SyncPlanMessage
             * @static
             * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
             * @returns {string} The type url
             */
            V3SyncPlanMessage.getTypeUrl = function(prefix) {
                if (prefix === $undefined)
                    prefix = "type.googleapis.com";
                return prefix + "/fns.v3.V3SyncPlanMessage";
            };

            return V3SyncPlanMessage;
        })();

        v3.V3BlobNeedMessage = (function() {

            /**
             * Properties of a V3BlobNeedMessage.
             * @typedef {Object} fns.v3.V3BlobNeedMessage.$Properties
             * @property {string|null} [vault] V3BlobNeedMessage vault
             * @property {string|null} [path] V3BlobNeedMessage path
             * @property {string|null} [hash] V3BlobNeedMessage hash
             * @property {number|Long|null} [size] V3BlobNeedMessage size
             * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
             */

            /**
             * Properties of a V3BlobNeedMessage.
             * @memberof fns.v3
             * @interface IV3BlobNeedMessage
             * @augments fns.v3.V3BlobNeedMessage.$Properties
             * @deprecated Use fns.v3.V3BlobNeedMessage.$Properties instead.
             */

            /**
             * Shape of a V3BlobNeedMessage.
             * @typedef {fns.v3.V3BlobNeedMessage.$Properties} fns.v3.V3BlobNeedMessage.$Shape
             */

            /**
             * Constructs a new V3BlobNeedMessage.
             * @memberof fns.v3
             * @classdesc Represents a V3BlobNeedMessage.
             * @constructor
             * @param {fns.v3.V3BlobNeedMessage.$Properties=} [properties] Properties to set
             * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
             */
            const V3BlobNeedMessage = function (properties) {
                if (properties)
                    for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            };

            /**
             * V3BlobNeedMessage vault.
             * @member {string} vault
             * @memberof fns.v3.V3BlobNeedMessage
             * @instance
             */
            V3BlobNeedMessage.prototype.vault = "";

            /**
             * V3BlobNeedMessage path.
             * @member {string} path
             * @memberof fns.v3.V3BlobNeedMessage
             * @instance
             */
            V3BlobNeedMessage.prototype.path = "";

            /**
             * V3BlobNeedMessage hash.
             * @member {string} hash
             * @memberof fns.v3.V3BlobNeedMessage
             * @instance
             */
            V3BlobNeedMessage.prototype.hash = "";

            /**
             * V3BlobNeedMessage size.
             * @member {number|Long} size
             * @memberof fns.v3.V3BlobNeedMessage
             * @instance
             */
            V3BlobNeedMessage.prototype.size = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * Creates a new V3BlobNeedMessage instance using the specified properties.
             * @function create
             * @memberof fns.v3.V3BlobNeedMessage
             * @static
             * @param {fns.v3.V3BlobNeedMessage.$Properties=} [properties] Properties to set
             * @returns {fns.v3.V3BlobNeedMessage} V3BlobNeedMessage instance
             * @type {{
             *   (properties: fns.v3.V3BlobNeedMessage.$Shape): fns.v3.V3BlobNeedMessage & fns.v3.V3BlobNeedMessage.$Shape;
             *   (properties?: fns.v3.V3BlobNeedMessage.$Properties): fns.v3.V3BlobNeedMessage;
             * }}
             */
            V3BlobNeedMessage.create = function(properties) {
                return new V3BlobNeedMessage(properties);
            };

            /**
             * Encodes the specified V3BlobNeedMessage message. Does not implicitly {@link fns.v3.V3BlobNeedMessage.verify|verify} messages.
             * @function encode
             * @memberof fns.v3.V3BlobNeedMessage
             * @static
             * @param {fns.v3.V3BlobNeedMessage.$Properties} message V3BlobNeedMessage message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            V3BlobNeedMessage.encode = function (message, writer, _depth) {
                if (!writer)
                    writer = $Writer.create();
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                if (message.vault != null && $Object.hasOwnProperty.call(message, "vault") && message.vault !== "")
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.vault);
                if (message.path != null && $Object.hasOwnProperty.call(message, "path") && message.path !== "")
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.path);
                if (message.hash != null && $Object.hasOwnProperty.call(message, "hash") && message.hash !== "")
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.hash);
                if (message.size != null && $Object.hasOwnProperty.call(message, "size") && (typeof message.size === "object" ? message.size.low || message.size.high : message.size !== 0))
                    writer.uint32(/* id 4, wireType 0 =*/32).int64(message.size);
                if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                    for (let i = 0; i < message.$unknowns.length; ++i)
                        writer.raw(message.$unknowns[i]);
                return writer;
            };

            /**
             * Encodes the specified V3BlobNeedMessage message, length delimited. Does not implicitly {@link fns.v3.V3BlobNeedMessage.verify|verify} messages.
             * @function encodeDelimited
             * @memberof fns.v3.V3BlobNeedMessage
             * @static
             * @param {fns.v3.V3BlobNeedMessage.$Properties} message V3BlobNeedMessage message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            V3BlobNeedMessage.encodeDelimited = function(message, writer) {
                return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
            };

            /**
             * Decodes a V3BlobNeedMessage message from the specified reader or buffer.
             * @function decode
             * @memberof fns.v3.V3BlobNeedMessage
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {fns.v3.V3BlobNeedMessage & fns.v3.V3BlobNeedMessage.$Shape} V3BlobNeedMessage
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            V3BlobNeedMessage.decode = function (reader, length, _end, _depth, _target) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $Reader.recursionLimit)
                    throw $Error("max depth exceeded");
                let end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.fns.v3.V3BlobNeedMessage(), value;
                while (reader.pos < end) {
                    let start = reader.pos;
                    let tag = reader.tag();
                    if (tag === _end) {
                        _end = $undefined;
                        break;
                    }
                    let wireType = tag & 7;
                    switch (tag >>>= 3) {
                    case 1: {
                            if (wireType !== 2)
                                break;
                            if ((value = reader.stringVerify()).length)
                                message.vault = value;
                            else
                                delete message.vault;
                            continue;
                        }
                    case 2: {
                            if (wireType !== 2)
                                break;
                            if ((value = reader.stringVerify()).length)
                                message.path = value;
                            else
                                delete message.path;
                            continue;
                        }
                    case 3: {
                            if (wireType !== 2)
                                break;
                            if ((value = reader.stringVerify()).length)
                                message.hash = value;
                            else
                                delete message.hash;
                            continue;
                        }
                    case 4: {
                            if (wireType !== 0)
                                break;
                            if (typeof (value = reader.int64()) === "object" ? value.low || value.high : value !== 0)
                                message.size = value;
                            else
                                delete message.size;
                            continue;
                        }
                    }
                    reader.skipType(wireType, _depth, tag);
                    if (!reader.discardUnknown) {
                        $util.makeProp(message, "$unknowns", false);
                        (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                    }
                }
                if (_end !== $undefined)
                    throw $Error("missing end group");
                return message;
            };

            /**
             * Decodes a V3BlobNeedMessage message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof fns.v3.V3BlobNeedMessage
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {fns.v3.V3BlobNeedMessage & fns.v3.V3BlobNeedMessage.$Shape} V3BlobNeedMessage
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            V3BlobNeedMessage.decodeDelimited = function(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a V3BlobNeedMessage message.
             * @function verify
             * @memberof fns.v3.V3BlobNeedMessage
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            V3BlobNeedMessage.verify = function (message, _depth) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    return "max depth exceeded";
                if (message.vault != null && $Object.hasOwnProperty.call(message, "vault"))
                    if (!$util.isString(message.vault))
                        return "vault: string expected";
                if (message.path != null && $Object.hasOwnProperty.call(message, "path"))
                    if (!$util.isString(message.path))
                        return "path: string expected";
                if (message.hash != null && $Object.hasOwnProperty.call(message, "hash"))
                    if (!$util.isString(message.hash))
                        return "hash: string expected";
                if (message.size != null && $Object.hasOwnProperty.call(message, "size"))
                    if (!$util.isInteger(message.size) && !(message.size && $util.isInteger(message.size.low) && $util.isInteger(message.size.high)))
                        return "size: integer|Long expected";
                return null;
            };

            /**
             * Creates a V3BlobNeedMessage message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof fns.v3.V3BlobNeedMessage
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {fns.v3.V3BlobNeedMessage} V3BlobNeedMessage
             */
            V3BlobNeedMessage.fromObject = function (object, _depth) {
                if (object instanceof $root.fns.v3.V3BlobNeedMessage)
                    return object;
                if (!$util.isObject(object))
                    throw $TypeError(".fns.v3.V3BlobNeedMessage: object expected");
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                let message = new $root.fns.v3.V3BlobNeedMessage();
                if (object.vault != null)
                    if (typeof object.vault !== "string" || object.vault.length)
                        message.vault = $String(object.vault);
                if (object.path != null)
                    if (typeof object.path !== "string" || object.path.length)
                        message.path = $String(object.path);
                if (object.hash != null)
                    if (typeof object.hash !== "string" || object.hash.length)
                        message.hash = $String(object.hash);
                if (object.size != null)
                    if (typeof object.size === "object" ? object.size.low || object.size.high : $Number(object.size) !== 0)
                        if ($util.Long)
                            message.size = $util.Long.fromValue(object.size, false);
                        else if (typeof object.size === "string")
                            message.size = $parseInt(object.size, 10);
                        else if (typeof object.size === "number")
                            message.size = object.size;
                        else if (typeof object.size === "object")
                            message.size = new $util.LongBits(object.size.low >>> 0, object.size.high >>> 0).toNumber();
                return message;
            };

            /**
             * Creates a plain object from a V3BlobNeedMessage message. Also converts values to other types if specified.
             * @function toObject
             * @memberof fns.v3.V3BlobNeedMessage
             * @static
             * @param {fns.v3.V3BlobNeedMessage} message V3BlobNeedMessage
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            V3BlobNeedMessage.toObject = function (message, options, _depth) {
                if (!options)
                    options = {};
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                let object = {};
                if (options.defaults) {
                    object.vault = "";
                    object.path = "";
                    object.hash = "";
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, false);
                        object.size = options.longs === $String ? long.toString() : options.longs === $Number ? long.toNumber() : typeof $BigInt !== "undefined" && options.longs === $BigInt ? long.toBigInt() : long;
                    } else
                        object.size = options.longs === $String ? "0" : typeof $BigInt !== "undefined" && options.longs === $BigInt ? $BigInt("0") : 0;
                }
                if (message.vault != null && $Object.hasOwnProperty.call(message, "vault"))
                    object.vault = message.vault;
                if (message.path != null && $Object.hasOwnProperty.call(message, "path"))
                    object.path = message.path;
                if (message.hash != null && $Object.hasOwnProperty.call(message, "hash"))
                    object.hash = message.hash;
                if (message.size != null && $Object.hasOwnProperty.call(message, "size"))
                    if (typeof $BigInt !== "undefined" && options.longs === $BigInt)
                        object.size = typeof message.size === "number" ? $BigInt(message.size) : $util.Long.fromBits(message.size.low >>> 0, message.size.high >>> 0, false).toBigInt();
                    else if (typeof message.size === "number")
                        object.size = options.longs === $String ? $String(message.size) : message.size;
                    else
                        object.size = options.longs === $String ? $util.Long.prototype.toString.call(message.size) : options.longs === $Number ? new $util.LongBits(message.size.low >>> 0, message.size.high >>> 0).toNumber() : message.size;
                return object;
            };

            /**
             * Converts this V3BlobNeedMessage to JSON.
             * @function toJSON
             * @memberof fns.v3.V3BlobNeedMessage
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            V3BlobNeedMessage.prototype.toJSON = function() {
                return V3BlobNeedMessage.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the type url for V3BlobNeedMessage
             * @function getTypeUrl
             * @memberof fns.v3.V3BlobNeedMessage
             * @static
             * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
             * @returns {string} The type url
             */
            V3BlobNeedMessage.getTypeUrl = function(prefix) {
                if (prefix === $undefined)
                    prefix = "type.googleapis.com";
                return prefix + "/fns.v3.V3BlobNeedMessage";
            };

            return V3BlobNeedMessage;
        })();

        v3.V3BlobPageMessage = (function() {

            /**
             * Properties of a V3BlobPageMessage.
             * @typedef {Object} fns.v3.V3BlobPageMessage.$Properties
             * @property {string|null} [vault] V3BlobPageMessage vault
             * @property {string|null} [path] V3BlobPageMessage path
             * @property {string|null} [hash] V3BlobPageMessage hash
             * @property {number|Long|null} [size] V3BlobPageMessage size
             * @property {boolean|null} [isNote] V3BlobPageMessage isNote
             * @property {string|null} [content] V3BlobPageMessage content
             * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
             */

            /**
             * Properties of a V3BlobPageMessage.
             * @memberof fns.v3
             * @interface IV3BlobPageMessage
             * @augments fns.v3.V3BlobPageMessage.$Properties
             * @deprecated Use fns.v3.V3BlobPageMessage.$Properties instead.
             */

            /**
             * Shape of a V3BlobPageMessage.
             * @typedef {fns.v3.V3BlobPageMessage.$Properties} fns.v3.V3BlobPageMessage.$Shape
             */

            /**
             * Constructs a new V3BlobPageMessage.
             * @memberof fns.v3
             * @classdesc Represents a V3BlobPageMessage.
             * @constructor
             * @param {fns.v3.V3BlobPageMessage.$Properties=} [properties] Properties to set
             * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
             */
            const V3BlobPageMessage = function (properties) {
                if (properties)
                    for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            };

            /**
             * V3BlobPageMessage vault.
             * @member {string} vault
             * @memberof fns.v3.V3BlobPageMessage
             * @instance
             */
            V3BlobPageMessage.prototype.vault = "";

            /**
             * V3BlobPageMessage path.
             * @member {string} path
             * @memberof fns.v3.V3BlobPageMessage
             * @instance
             */
            V3BlobPageMessage.prototype.path = "";

            /**
             * V3BlobPageMessage hash.
             * @member {string} hash
             * @memberof fns.v3.V3BlobPageMessage
             * @instance
             */
            V3BlobPageMessage.prototype.hash = "";

            /**
             * V3BlobPageMessage size.
             * @member {number|Long} size
             * @memberof fns.v3.V3BlobPageMessage
             * @instance
             */
            V3BlobPageMessage.prototype.size = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * V3BlobPageMessage isNote.
             * @member {boolean} isNote
             * @memberof fns.v3.V3BlobPageMessage
             * @instance
             */
            V3BlobPageMessage.prototype.isNote = false;

            /**
             * V3BlobPageMessage content.
             * @member {string} content
             * @memberof fns.v3.V3BlobPageMessage
             * @instance
             */
            V3BlobPageMessage.prototype.content = "";

            /**
             * Creates a new V3BlobPageMessage instance using the specified properties.
             * @function create
             * @memberof fns.v3.V3BlobPageMessage
             * @static
             * @param {fns.v3.V3BlobPageMessage.$Properties=} [properties] Properties to set
             * @returns {fns.v3.V3BlobPageMessage} V3BlobPageMessage instance
             * @type {{
             *   (properties: fns.v3.V3BlobPageMessage.$Shape): fns.v3.V3BlobPageMessage & fns.v3.V3BlobPageMessage.$Shape;
             *   (properties?: fns.v3.V3BlobPageMessage.$Properties): fns.v3.V3BlobPageMessage;
             * }}
             */
            V3BlobPageMessage.create = function(properties) {
                return new V3BlobPageMessage(properties);
            };

            /**
             * Encodes the specified V3BlobPageMessage message. Does not implicitly {@link fns.v3.V3BlobPageMessage.verify|verify} messages.
             * @function encode
             * @memberof fns.v3.V3BlobPageMessage
             * @static
             * @param {fns.v3.V3BlobPageMessage.$Properties} message V3BlobPageMessage message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            V3BlobPageMessage.encode = function (message, writer, _depth) {
                if (!writer)
                    writer = $Writer.create();
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                if (message.vault != null && $Object.hasOwnProperty.call(message, "vault") && message.vault !== "")
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.vault);
                if (message.path != null && $Object.hasOwnProperty.call(message, "path") && message.path !== "")
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.path);
                if (message.hash != null && $Object.hasOwnProperty.call(message, "hash") && message.hash !== "")
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.hash);
                if (message.size != null && $Object.hasOwnProperty.call(message, "size") && (typeof message.size === "object" ? message.size.low || message.size.high : message.size !== 0))
                    writer.uint32(/* id 4, wireType 0 =*/32).int64(message.size);
                if (message.isNote != null && $Object.hasOwnProperty.call(message, "isNote") && message.isNote !== false)
                    writer.uint32(/* id 5, wireType 0 =*/40).bool(message.isNote);
                if (message.content != null && $Object.hasOwnProperty.call(message, "content") && message.content !== "")
                    writer.uint32(/* id 6, wireType 2 =*/50).string(message.content);
                if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                    for (let i = 0; i < message.$unknowns.length; ++i)
                        writer.raw(message.$unknowns[i]);
                return writer;
            };

            /**
             * Encodes the specified V3BlobPageMessage message, length delimited. Does not implicitly {@link fns.v3.V3BlobPageMessage.verify|verify} messages.
             * @function encodeDelimited
             * @memberof fns.v3.V3BlobPageMessage
             * @static
             * @param {fns.v3.V3BlobPageMessage.$Properties} message V3BlobPageMessage message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            V3BlobPageMessage.encodeDelimited = function(message, writer) {
                return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
            };

            /**
             * Decodes a V3BlobPageMessage message from the specified reader or buffer.
             * @function decode
             * @memberof fns.v3.V3BlobPageMessage
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {fns.v3.V3BlobPageMessage & fns.v3.V3BlobPageMessage.$Shape} V3BlobPageMessage
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            V3BlobPageMessage.decode = function (reader, length, _end, _depth, _target) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $Reader.recursionLimit)
                    throw $Error("max depth exceeded");
                let end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.fns.v3.V3BlobPageMessage(), value;
                while (reader.pos < end) {
                    let start = reader.pos;
                    let tag = reader.tag();
                    if (tag === _end) {
                        _end = $undefined;
                        break;
                    }
                    let wireType = tag & 7;
                    switch (tag >>>= 3) {
                    case 1: {
                            if (wireType !== 2)
                                break;
                            if ((value = reader.stringVerify()).length)
                                message.vault = value;
                            else
                                delete message.vault;
                            continue;
                        }
                    case 2: {
                            if (wireType !== 2)
                                break;
                            if ((value = reader.stringVerify()).length)
                                message.path = value;
                            else
                                delete message.path;
                            continue;
                        }
                    case 3: {
                            if (wireType !== 2)
                                break;
                            if ((value = reader.stringVerify()).length)
                                message.hash = value;
                            else
                                delete message.hash;
                            continue;
                        }
                    case 4: {
                            if (wireType !== 0)
                                break;
                            if (typeof (value = reader.int64()) === "object" ? value.low || value.high : value !== 0)
                                message.size = value;
                            else
                                delete message.size;
                            continue;
                        }
                    case 5: {
                            if (wireType !== 0)
                                break;
                            if (value = reader.bool())
                                message.isNote = value;
                            else
                                delete message.isNote;
                            continue;
                        }
                    case 6: {
                            if (wireType !== 2)
                                break;
                            if ((value = reader.stringVerify()).length)
                                message.content = value;
                            else
                                delete message.content;
                            continue;
                        }
                    }
                    reader.skipType(wireType, _depth, tag);
                    if (!reader.discardUnknown) {
                        $util.makeProp(message, "$unknowns", false);
                        (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                    }
                }
                if (_end !== $undefined)
                    throw $Error("missing end group");
                return message;
            };

            /**
             * Decodes a V3BlobPageMessage message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof fns.v3.V3BlobPageMessage
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {fns.v3.V3BlobPageMessage & fns.v3.V3BlobPageMessage.$Shape} V3BlobPageMessage
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            V3BlobPageMessage.decodeDelimited = function(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a V3BlobPageMessage message.
             * @function verify
             * @memberof fns.v3.V3BlobPageMessage
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            V3BlobPageMessage.verify = function (message, _depth) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    return "max depth exceeded";
                if (message.vault != null && $Object.hasOwnProperty.call(message, "vault"))
                    if (!$util.isString(message.vault))
                        return "vault: string expected";
                if (message.path != null && $Object.hasOwnProperty.call(message, "path"))
                    if (!$util.isString(message.path))
                        return "path: string expected";
                if (message.hash != null && $Object.hasOwnProperty.call(message, "hash"))
                    if (!$util.isString(message.hash))
                        return "hash: string expected";
                if (message.size != null && $Object.hasOwnProperty.call(message, "size"))
                    if (!$util.isInteger(message.size) && !(message.size && $util.isInteger(message.size.low) && $util.isInteger(message.size.high)))
                        return "size: integer|Long expected";
                if (message.isNote != null && $Object.hasOwnProperty.call(message, "isNote"))
                    if (typeof message.isNote !== "boolean")
                        return "isNote: boolean expected";
                if (message.content != null && $Object.hasOwnProperty.call(message, "content"))
                    if (!$util.isString(message.content))
                        return "content: string expected";
                return null;
            };

            /**
             * Creates a V3BlobPageMessage message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof fns.v3.V3BlobPageMessage
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {fns.v3.V3BlobPageMessage} V3BlobPageMessage
             */
            V3BlobPageMessage.fromObject = function (object, _depth) {
                if (object instanceof $root.fns.v3.V3BlobPageMessage)
                    return object;
                if (!$util.isObject(object))
                    throw $TypeError(".fns.v3.V3BlobPageMessage: object expected");
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                let message = new $root.fns.v3.V3BlobPageMessage();
                if (object.vault != null)
                    if (typeof object.vault !== "string" || object.vault.length)
                        message.vault = $String(object.vault);
                if (object.path != null)
                    if (typeof object.path !== "string" || object.path.length)
                        message.path = $String(object.path);
                if (object.hash != null)
                    if (typeof object.hash !== "string" || object.hash.length)
                        message.hash = $String(object.hash);
                if (object.size != null)
                    if (typeof object.size === "object" ? object.size.low || object.size.high : $Number(object.size) !== 0)
                        if ($util.Long)
                            message.size = $util.Long.fromValue(object.size, false);
                        else if (typeof object.size === "string")
                            message.size = $parseInt(object.size, 10);
                        else if (typeof object.size === "number")
                            message.size = object.size;
                        else if (typeof object.size === "object")
                            message.size = new $util.LongBits(object.size.low >>> 0, object.size.high >>> 0).toNumber();
                if (object.isNote != null)
                    if (object.isNote)
                        message.isNote = $Boolean(object.isNote);
                if (object.content != null)
                    if (typeof object.content !== "string" || object.content.length)
                        message.content = $String(object.content);
                return message;
            };

            /**
             * Creates a plain object from a V3BlobPageMessage message. Also converts values to other types if specified.
             * @function toObject
             * @memberof fns.v3.V3BlobPageMessage
             * @static
             * @param {fns.v3.V3BlobPageMessage} message V3BlobPageMessage
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            V3BlobPageMessage.toObject = function (message, options, _depth) {
                if (!options)
                    options = {};
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                let object = {};
                if (options.defaults) {
                    object.vault = "";
                    object.path = "";
                    object.hash = "";
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, false);
                        object.size = options.longs === $String ? long.toString() : options.longs === $Number ? long.toNumber() : typeof $BigInt !== "undefined" && options.longs === $BigInt ? long.toBigInt() : long;
                    } else
                        object.size = options.longs === $String ? "0" : typeof $BigInt !== "undefined" && options.longs === $BigInt ? $BigInt("0") : 0;
                    object.isNote = false;
                    object.content = "";
                }
                if (message.vault != null && $Object.hasOwnProperty.call(message, "vault"))
                    object.vault = message.vault;
                if (message.path != null && $Object.hasOwnProperty.call(message, "path"))
                    object.path = message.path;
                if (message.hash != null && $Object.hasOwnProperty.call(message, "hash"))
                    object.hash = message.hash;
                if (message.size != null && $Object.hasOwnProperty.call(message, "size"))
                    if (typeof $BigInt !== "undefined" && options.longs === $BigInt)
                        object.size = typeof message.size === "number" ? $BigInt(message.size) : $util.Long.fromBits(message.size.low >>> 0, message.size.high >>> 0, false).toBigInt();
                    else if (typeof message.size === "number")
                        object.size = options.longs === $String ? $String(message.size) : message.size;
                    else
                        object.size = options.longs === $String ? $util.Long.prototype.toString.call(message.size) : options.longs === $Number ? new $util.LongBits(message.size.low >>> 0, message.size.high >>> 0).toNumber() : message.size;
                if (message.isNote != null && $Object.hasOwnProperty.call(message, "isNote"))
                    object.isNote = message.isNote;
                if (message.content != null && $Object.hasOwnProperty.call(message, "content"))
                    object.content = message.content;
                return object;
            };

            /**
             * Converts this V3BlobPageMessage to JSON.
             * @function toJSON
             * @memberof fns.v3.V3BlobPageMessage
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            V3BlobPageMessage.prototype.toJSON = function() {
                return V3BlobPageMessage.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the type url for V3BlobPageMessage
             * @function getTypeUrl
             * @memberof fns.v3.V3BlobPageMessage
             * @static
             * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
             * @returns {string} The type url
             */
            V3BlobPageMessage.getTypeUrl = function(prefix) {
                if (prefix === $undefined)
                    prefix = "type.googleapis.com";
                return prefix + "/fns.v3.V3BlobPageMessage";
            };

            return V3BlobPageMessage;
        })();

        v3.V3ManifestCommitRequest = (function() {

            /**
             * Properties of a V3ManifestCommitRequest.
             * @typedef {Object} fns.v3.V3ManifestCommitRequest.$Properties
             * @property {string|null} [vault] V3ManifestCommitRequest vault
             * @property {number|Long|null} [baseEpoch] V3ManifestCommitRequest baseEpoch
             * @property {Array.<fns.v3.Change.$Properties>|null} [changes] V3ManifestCommitRequest changes
             * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
             */

            /**
             * Properties of a V3ManifestCommitRequest.
             * @memberof fns.v3
             * @interface IV3ManifestCommitRequest
             * @augments fns.v3.V3ManifestCommitRequest.$Properties
             * @deprecated Use fns.v3.V3ManifestCommitRequest.$Properties instead.
             */

            /**
             * Shape of a V3ManifestCommitRequest.
             * @typedef {fns.v3.V3ManifestCommitRequest.$Properties} fns.v3.V3ManifestCommitRequest.$Shape
             */

            /**
             * Constructs a new V3ManifestCommitRequest.
             * @memberof fns.v3
             * @classdesc Represents a V3ManifestCommitRequest.
             * @constructor
             * @param {fns.v3.V3ManifestCommitRequest.$Properties=} [properties] Properties to set
             * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
             */
            const V3ManifestCommitRequest = function (properties) {
                this.changes = [];
                if (properties)
                    for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            };

            /**
             * V3ManifestCommitRequest vault.
             * @member {string} vault
             * @memberof fns.v3.V3ManifestCommitRequest
             * @instance
             */
            V3ManifestCommitRequest.prototype.vault = "";

            /**
             * V3ManifestCommitRequest baseEpoch.
             * @member {number|Long} baseEpoch
             * @memberof fns.v3.V3ManifestCommitRequest
             * @instance
             */
            V3ManifestCommitRequest.prototype.baseEpoch = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * V3ManifestCommitRequest changes.
             * @member {Array.<fns.v3.Change.$Properties>} changes
             * @memberof fns.v3.V3ManifestCommitRequest
             * @instance
             */
            V3ManifestCommitRequest.prototype.changes = $util.emptyArray;

            /**
             * Creates a new V3ManifestCommitRequest instance using the specified properties.
             * @function create
             * @memberof fns.v3.V3ManifestCommitRequest
             * @static
             * @param {fns.v3.V3ManifestCommitRequest.$Properties=} [properties] Properties to set
             * @returns {fns.v3.V3ManifestCommitRequest} V3ManifestCommitRequest instance
             * @type {{
             *   (properties: fns.v3.V3ManifestCommitRequest.$Shape): fns.v3.V3ManifestCommitRequest & fns.v3.V3ManifestCommitRequest.$Shape;
             *   (properties?: fns.v3.V3ManifestCommitRequest.$Properties): fns.v3.V3ManifestCommitRequest;
             * }}
             */
            V3ManifestCommitRequest.create = function(properties) {
                return new V3ManifestCommitRequest(properties);
            };

            /**
             * Encodes the specified V3ManifestCommitRequest message. Does not implicitly {@link fns.v3.V3ManifestCommitRequest.verify|verify} messages.
             * @function encode
             * @memberof fns.v3.V3ManifestCommitRequest
             * @static
             * @param {fns.v3.V3ManifestCommitRequest.$Properties} message V3ManifestCommitRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            V3ManifestCommitRequest.encode = function (message, writer, _depth) {
                if (!writer)
                    writer = $Writer.create();
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                if (message.vault != null && $Object.hasOwnProperty.call(message, "vault") && message.vault !== "")
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.vault);
                if (message.baseEpoch != null && $Object.hasOwnProperty.call(message, "baseEpoch") && (typeof message.baseEpoch === "object" ? message.baseEpoch.low || message.baseEpoch.high : message.baseEpoch !== 0))
                    writer.uint32(/* id 2, wireType 0 =*/16).int64(message.baseEpoch);
                if (message.changes != null && message.changes.length)
                    for (let i = 0; i < message.changes.length; ++i)
                        $root.fns.v3.Change.encode(message.changes[i], writer.uint32(/* id 3, wireType 2 =*/26).fork(), _depth + 1).ldelim();
                if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                    for (let i = 0; i < message.$unknowns.length; ++i)
                        writer.raw(message.$unknowns[i]);
                return writer;
            };

            /**
             * Encodes the specified V3ManifestCommitRequest message, length delimited. Does not implicitly {@link fns.v3.V3ManifestCommitRequest.verify|verify} messages.
             * @function encodeDelimited
             * @memberof fns.v3.V3ManifestCommitRequest
             * @static
             * @param {fns.v3.V3ManifestCommitRequest.$Properties} message V3ManifestCommitRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            V3ManifestCommitRequest.encodeDelimited = function(message, writer) {
                return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
            };

            /**
             * Decodes a V3ManifestCommitRequest message from the specified reader or buffer.
             * @function decode
             * @memberof fns.v3.V3ManifestCommitRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {fns.v3.V3ManifestCommitRequest & fns.v3.V3ManifestCommitRequest.$Shape} V3ManifestCommitRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            V3ManifestCommitRequest.decode = function (reader, length, _end, _depth, _target) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $Reader.recursionLimit)
                    throw $Error("max depth exceeded");
                let end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.fns.v3.V3ManifestCommitRequest(), value;
                while (reader.pos < end) {
                    let start = reader.pos;
                    let tag = reader.tag();
                    if (tag === _end) {
                        _end = $undefined;
                        break;
                    }
                    let wireType = tag & 7;
                    switch (tag >>>= 3) {
                    case 1: {
                            if (wireType !== 2)
                                break;
                            if ((value = reader.stringVerify()).length)
                                message.vault = value;
                            else
                                delete message.vault;
                            continue;
                        }
                    case 2: {
                            if (wireType !== 0)
                                break;
                            if (typeof (value = reader.int64()) === "object" ? value.low || value.high : value !== 0)
                                message.baseEpoch = value;
                            else
                                delete message.baseEpoch;
                            continue;
                        }
                    case 3: {
                            if (wireType !== 2)
                                break;
                            if (!(message.changes && message.changes.length))
                                message.changes = [];
                            message.changes.push($root.fns.v3.Change.decode(reader, reader.uint32(), $undefined, _depth + 1));
                            continue;
                        }
                    }
                    reader.skipType(wireType, _depth, tag);
                    if (!reader.discardUnknown) {
                        $util.makeProp(message, "$unknowns", false);
                        (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                    }
                }
                if (_end !== $undefined)
                    throw $Error("missing end group");
                return message;
            };

            /**
             * Decodes a V3ManifestCommitRequest message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof fns.v3.V3ManifestCommitRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {fns.v3.V3ManifestCommitRequest & fns.v3.V3ManifestCommitRequest.$Shape} V3ManifestCommitRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            V3ManifestCommitRequest.decodeDelimited = function(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a V3ManifestCommitRequest message.
             * @function verify
             * @memberof fns.v3.V3ManifestCommitRequest
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            V3ManifestCommitRequest.verify = function (message, _depth) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    return "max depth exceeded";
                if (message.vault != null && $Object.hasOwnProperty.call(message, "vault"))
                    if (!$util.isString(message.vault))
                        return "vault: string expected";
                if (message.baseEpoch != null && $Object.hasOwnProperty.call(message, "baseEpoch"))
                    if (!$util.isInteger(message.baseEpoch) && !(message.baseEpoch && $util.isInteger(message.baseEpoch.low) && $util.isInteger(message.baseEpoch.high)))
                        return "baseEpoch: integer|Long expected";
                if (message.changes != null && $Object.hasOwnProperty.call(message, "changes")) {
                    if (!$Array.isArray(message.changes))
                        return "changes: array expected";
                    for (let i = 0; i < message.changes.length; ++i) {
                        let error = $root.fns.v3.Change.verify(message.changes[i], _depth + 1);
                        if (error)
                            return "changes." + error;
                    }
                }
                return null;
            };

            /**
             * Creates a V3ManifestCommitRequest message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof fns.v3.V3ManifestCommitRequest
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {fns.v3.V3ManifestCommitRequest} V3ManifestCommitRequest
             */
            V3ManifestCommitRequest.fromObject = function (object, _depth) {
                if (object instanceof $root.fns.v3.V3ManifestCommitRequest)
                    return object;
                if (!$util.isObject(object))
                    throw $TypeError(".fns.v3.V3ManifestCommitRequest: object expected");
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                let message = new $root.fns.v3.V3ManifestCommitRequest();
                if (object.vault != null)
                    if (typeof object.vault !== "string" || object.vault.length)
                        message.vault = $String(object.vault);
                if (object.baseEpoch != null)
                    if (typeof object.baseEpoch === "object" ? object.baseEpoch.low || object.baseEpoch.high : $Number(object.baseEpoch) !== 0)
                        if ($util.Long)
                            message.baseEpoch = $util.Long.fromValue(object.baseEpoch, false);
                        else if (typeof object.baseEpoch === "string")
                            message.baseEpoch = $parseInt(object.baseEpoch, 10);
                        else if (typeof object.baseEpoch === "number")
                            message.baseEpoch = object.baseEpoch;
                        else if (typeof object.baseEpoch === "object")
                            message.baseEpoch = new $util.LongBits(object.baseEpoch.low >>> 0, object.baseEpoch.high >>> 0).toNumber();
                if (object.changes) {
                    if (!$Array.isArray(object.changes))
                        throw $TypeError(".fns.v3.V3ManifestCommitRequest.changes: array expected");
                    message.changes = $Array(object.changes.length);
                    for (let i = 0; i < object.changes.length; ++i) {
                        if (!$util.isObject(object.changes[i]))
                            throw $TypeError(".fns.v3.V3ManifestCommitRequest.changes: object expected");
                        message.changes[i] = $root.fns.v3.Change.fromObject(object.changes[i], _depth + 1);
                    }
                }
                return message;
            };

            /**
             * Creates a plain object from a V3ManifestCommitRequest message. Also converts values to other types if specified.
             * @function toObject
             * @memberof fns.v3.V3ManifestCommitRequest
             * @static
             * @param {fns.v3.V3ManifestCommitRequest} message V3ManifestCommitRequest
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            V3ManifestCommitRequest.toObject = function (message, options, _depth) {
                if (!options)
                    options = {};
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                let object = {};
                if (options.arrays || options.defaults)
                    object.changes = [];
                if (options.defaults) {
                    object.vault = "";
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, false);
                        object.baseEpoch = options.longs === $String ? long.toString() : options.longs === $Number ? long.toNumber() : typeof $BigInt !== "undefined" && options.longs === $BigInt ? long.toBigInt() : long;
                    } else
                        object.baseEpoch = options.longs === $String ? "0" : typeof $BigInt !== "undefined" && options.longs === $BigInt ? $BigInt("0") : 0;
                }
                if (message.vault != null && $Object.hasOwnProperty.call(message, "vault"))
                    object.vault = message.vault;
                if (message.baseEpoch != null && $Object.hasOwnProperty.call(message, "baseEpoch"))
                    if (typeof $BigInt !== "undefined" && options.longs === $BigInt)
                        object.baseEpoch = typeof message.baseEpoch === "number" ? $BigInt(message.baseEpoch) : $util.Long.fromBits(message.baseEpoch.low >>> 0, message.baseEpoch.high >>> 0, false).toBigInt();
                    else if (typeof message.baseEpoch === "number")
                        object.baseEpoch = options.longs === $String ? $String(message.baseEpoch) : message.baseEpoch;
                    else
                        object.baseEpoch = options.longs === $String ? $util.Long.prototype.toString.call(message.baseEpoch) : options.longs === $Number ? new $util.LongBits(message.baseEpoch.low >>> 0, message.baseEpoch.high >>> 0).toNumber() : message.baseEpoch;
                if (message.changes && message.changes.length) {
                    object.changes = $Array(message.changes.length);
                    for (let j = 0; j < message.changes.length; ++j)
                        object.changes[j] = $root.fns.v3.Change.toObject(message.changes[j], options, _depth + 1);
                }
                return object;
            };

            /**
             * Converts this V3ManifestCommitRequest to JSON.
             * @function toJSON
             * @memberof fns.v3.V3ManifestCommitRequest
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            V3ManifestCommitRequest.prototype.toJSON = function() {
                return V3ManifestCommitRequest.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the type url for V3ManifestCommitRequest
             * @function getTypeUrl
             * @memberof fns.v3.V3ManifestCommitRequest
             * @static
             * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
             * @returns {string} The type url
             */
            V3ManifestCommitRequest.getTypeUrl = function(prefix) {
                if (prefix === $undefined)
                    prefix = "type.googleapis.com";
                return prefix + "/fns.v3.V3ManifestCommitRequest";
            };

            return V3ManifestCommitRequest;
        })();

        v3.V3CommitAckItem = (function() {

            /**
             * Properties of a V3CommitAckItem.
             * @typedef {Object} fns.v3.V3CommitAckItem.$Properties
             * @property {string|null} [path] V3CommitAckItem path
             * @property {string|null} [id] V3CommitAckItem id
             * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
             */

            /**
             * Properties of a V3CommitAckItem.
             * @memberof fns.v3
             * @interface IV3CommitAckItem
             * @augments fns.v3.V3CommitAckItem.$Properties
             * @deprecated Use fns.v3.V3CommitAckItem.$Properties instead.
             */

            /**
             * Shape of a V3CommitAckItem.
             * @typedef {fns.v3.V3CommitAckItem.$Properties} fns.v3.V3CommitAckItem.$Shape
             */

            /**
             * Constructs a new V3CommitAckItem.
             * @memberof fns.v3
             * @classdesc Represents a V3CommitAckItem.
             * @constructor
             * @param {fns.v3.V3CommitAckItem.$Properties=} [properties] Properties to set
             * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
             */
            const V3CommitAckItem = function (properties) {
                if (properties)
                    for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            };

            /**
             * V3CommitAckItem path.
             * @member {string} path
             * @memberof fns.v3.V3CommitAckItem
             * @instance
             */
            V3CommitAckItem.prototype.path = "";

            /**
             * V3CommitAckItem id.
             * @member {string} id
             * @memberof fns.v3.V3CommitAckItem
             * @instance
             */
            V3CommitAckItem.prototype.id = "";

            /**
             * Creates a new V3CommitAckItem instance using the specified properties.
             * @function create
             * @memberof fns.v3.V3CommitAckItem
             * @static
             * @param {fns.v3.V3CommitAckItem.$Properties=} [properties] Properties to set
             * @returns {fns.v3.V3CommitAckItem} V3CommitAckItem instance
             * @type {{
             *   (properties: fns.v3.V3CommitAckItem.$Shape): fns.v3.V3CommitAckItem & fns.v3.V3CommitAckItem.$Shape;
             *   (properties?: fns.v3.V3CommitAckItem.$Properties): fns.v3.V3CommitAckItem;
             * }}
             */
            V3CommitAckItem.create = function(properties) {
                return new V3CommitAckItem(properties);
            };

            /**
             * Encodes the specified V3CommitAckItem message. Does not implicitly {@link fns.v3.V3CommitAckItem.verify|verify} messages.
             * @function encode
             * @memberof fns.v3.V3CommitAckItem
             * @static
             * @param {fns.v3.V3CommitAckItem.$Properties} message V3CommitAckItem message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            V3CommitAckItem.encode = function (message, writer, _depth) {
                if (!writer)
                    writer = $Writer.create();
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                if (message.path != null && $Object.hasOwnProperty.call(message, "path") && message.path !== "")
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.path);
                if (message.id != null && $Object.hasOwnProperty.call(message, "id") && message.id !== "")
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.id);
                if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                    for (let i = 0; i < message.$unknowns.length; ++i)
                        writer.raw(message.$unknowns[i]);
                return writer;
            };

            /**
             * Encodes the specified V3CommitAckItem message, length delimited. Does not implicitly {@link fns.v3.V3CommitAckItem.verify|verify} messages.
             * @function encodeDelimited
             * @memberof fns.v3.V3CommitAckItem
             * @static
             * @param {fns.v3.V3CommitAckItem.$Properties} message V3CommitAckItem message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            V3CommitAckItem.encodeDelimited = function(message, writer) {
                return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
            };

            /**
             * Decodes a V3CommitAckItem message from the specified reader or buffer.
             * @function decode
             * @memberof fns.v3.V3CommitAckItem
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {fns.v3.V3CommitAckItem & fns.v3.V3CommitAckItem.$Shape} V3CommitAckItem
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            V3CommitAckItem.decode = function (reader, length, _end, _depth, _target) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $Reader.recursionLimit)
                    throw $Error("max depth exceeded");
                let end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.fns.v3.V3CommitAckItem(), value;
                while (reader.pos < end) {
                    let start = reader.pos;
                    let tag = reader.tag();
                    if (tag === _end) {
                        _end = $undefined;
                        break;
                    }
                    let wireType = tag & 7;
                    switch (tag >>>= 3) {
                    case 1: {
                            if (wireType !== 2)
                                break;
                            if ((value = reader.stringVerify()).length)
                                message.path = value;
                            else
                                delete message.path;
                            continue;
                        }
                    case 2: {
                            if (wireType !== 2)
                                break;
                            if ((value = reader.stringVerify()).length)
                                message.id = value;
                            else
                                delete message.id;
                            continue;
                        }
                    }
                    reader.skipType(wireType, _depth, tag);
                    if (!reader.discardUnknown) {
                        $util.makeProp(message, "$unknowns", false);
                        (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                    }
                }
                if (_end !== $undefined)
                    throw $Error("missing end group");
                return message;
            };

            /**
             * Decodes a V3CommitAckItem message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof fns.v3.V3CommitAckItem
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {fns.v3.V3CommitAckItem & fns.v3.V3CommitAckItem.$Shape} V3CommitAckItem
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            V3CommitAckItem.decodeDelimited = function(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a V3CommitAckItem message.
             * @function verify
             * @memberof fns.v3.V3CommitAckItem
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            V3CommitAckItem.verify = function (message, _depth) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    return "max depth exceeded";
                if (message.path != null && $Object.hasOwnProperty.call(message, "path"))
                    if (!$util.isString(message.path))
                        return "path: string expected";
                if (message.id != null && $Object.hasOwnProperty.call(message, "id"))
                    if (!$util.isString(message.id))
                        return "id: string expected";
                return null;
            };

            /**
             * Creates a V3CommitAckItem message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof fns.v3.V3CommitAckItem
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {fns.v3.V3CommitAckItem} V3CommitAckItem
             */
            V3CommitAckItem.fromObject = function (object, _depth) {
                if (object instanceof $root.fns.v3.V3CommitAckItem)
                    return object;
                if (!$util.isObject(object))
                    throw $TypeError(".fns.v3.V3CommitAckItem: object expected");
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                let message = new $root.fns.v3.V3CommitAckItem();
                if (object.path != null)
                    if (typeof object.path !== "string" || object.path.length)
                        message.path = $String(object.path);
                if (object.id != null)
                    if (typeof object.id !== "string" || object.id.length)
                        message.id = $String(object.id);
                return message;
            };

            /**
             * Creates a plain object from a V3CommitAckItem message. Also converts values to other types if specified.
             * @function toObject
             * @memberof fns.v3.V3CommitAckItem
             * @static
             * @param {fns.v3.V3CommitAckItem} message V3CommitAckItem
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            V3CommitAckItem.toObject = function (message, options, _depth) {
                if (!options)
                    options = {};
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                let object = {};
                if (options.defaults) {
                    object.path = "";
                    object.id = "";
                }
                if (message.path != null && $Object.hasOwnProperty.call(message, "path"))
                    object.path = message.path;
                if (message.id != null && $Object.hasOwnProperty.call(message, "id"))
                    object.id = message.id;
                return object;
            };

            /**
             * Converts this V3CommitAckItem to JSON.
             * @function toJSON
             * @memberof fns.v3.V3CommitAckItem
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            V3CommitAckItem.prototype.toJSON = function() {
                return V3CommitAckItem.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the type url for V3CommitAckItem
             * @function getTypeUrl
             * @memberof fns.v3.V3CommitAckItem
             * @static
             * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
             * @returns {string} The type url
             */
            V3CommitAckItem.getTypeUrl = function(prefix) {
                if (prefix === $undefined)
                    prefix = "type.googleapis.com";
                return prefix + "/fns.v3.V3CommitAckItem";
            };

            return V3CommitAckItem;
        })();

        v3.V3ManifestCommitAckMessage = (function() {

            /**
             * Properties of a V3ManifestCommitAckMessage.
             * @typedef {Object} fns.v3.V3ManifestCommitAckMessage.$Properties
             * @property {string|null} [vault] V3ManifestCommitAckMessage vault
             * @property {number|Long|null} [newEpoch] V3ManifestCommitAckMessage newEpoch
             * @property {Array.<fns.v3.V3CommitAckItem.$Properties>|null} [items] V3ManifestCommitAckMessage items
             * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
             */

            /**
             * Properties of a V3ManifestCommitAckMessage.
             * @memberof fns.v3
             * @interface IV3ManifestCommitAckMessage
             * @augments fns.v3.V3ManifestCommitAckMessage.$Properties
             * @deprecated Use fns.v3.V3ManifestCommitAckMessage.$Properties instead.
             */

            /**
             * Shape of a V3ManifestCommitAckMessage.
             * @typedef {fns.v3.V3ManifestCommitAckMessage.$Properties} fns.v3.V3ManifestCommitAckMessage.$Shape
             */

            /**
             * Constructs a new V3ManifestCommitAckMessage.
             * @memberof fns.v3
             * @classdesc Represents a V3ManifestCommitAckMessage.
             * @constructor
             * @param {fns.v3.V3ManifestCommitAckMessage.$Properties=} [properties] Properties to set
             * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
             */
            const V3ManifestCommitAckMessage = function (properties) {
                this.items = [];
                if (properties)
                    for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            };

            /**
             * V3ManifestCommitAckMessage vault.
             * @member {string} vault
             * @memberof fns.v3.V3ManifestCommitAckMessage
             * @instance
             */
            V3ManifestCommitAckMessage.prototype.vault = "";

            /**
             * V3ManifestCommitAckMessage newEpoch.
             * @member {number|Long} newEpoch
             * @memberof fns.v3.V3ManifestCommitAckMessage
             * @instance
             */
            V3ManifestCommitAckMessage.prototype.newEpoch = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * V3ManifestCommitAckMessage items.
             * @member {Array.<fns.v3.V3CommitAckItem.$Properties>} items
             * @memberof fns.v3.V3ManifestCommitAckMessage
             * @instance
             */
            V3ManifestCommitAckMessage.prototype.items = $util.emptyArray;

            /**
             * Creates a new V3ManifestCommitAckMessage instance using the specified properties.
             * @function create
             * @memberof fns.v3.V3ManifestCommitAckMessage
             * @static
             * @param {fns.v3.V3ManifestCommitAckMessage.$Properties=} [properties] Properties to set
             * @returns {fns.v3.V3ManifestCommitAckMessage} V3ManifestCommitAckMessage instance
             * @type {{
             *   (properties: fns.v3.V3ManifestCommitAckMessage.$Shape): fns.v3.V3ManifestCommitAckMessage & fns.v3.V3ManifestCommitAckMessage.$Shape;
             *   (properties?: fns.v3.V3ManifestCommitAckMessage.$Properties): fns.v3.V3ManifestCommitAckMessage;
             * }}
             */
            V3ManifestCommitAckMessage.create = function(properties) {
                return new V3ManifestCommitAckMessage(properties);
            };

            /**
             * Encodes the specified V3ManifestCommitAckMessage message. Does not implicitly {@link fns.v3.V3ManifestCommitAckMessage.verify|verify} messages.
             * @function encode
             * @memberof fns.v3.V3ManifestCommitAckMessage
             * @static
             * @param {fns.v3.V3ManifestCommitAckMessage.$Properties} message V3ManifestCommitAckMessage message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            V3ManifestCommitAckMessage.encode = function (message, writer, _depth) {
                if (!writer)
                    writer = $Writer.create();
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                if (message.vault != null && $Object.hasOwnProperty.call(message, "vault") && message.vault !== "")
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.vault);
                if (message.newEpoch != null && $Object.hasOwnProperty.call(message, "newEpoch") && (typeof message.newEpoch === "object" ? message.newEpoch.low || message.newEpoch.high : message.newEpoch !== 0))
                    writer.uint32(/* id 2, wireType 0 =*/16).int64(message.newEpoch);
                if (message.items != null && message.items.length)
                    for (let i = 0; i < message.items.length; ++i)
                        $root.fns.v3.V3CommitAckItem.encode(message.items[i], writer.uint32(/* id 3, wireType 2 =*/26).fork(), _depth + 1).ldelim();
                if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                    for (let i = 0; i < message.$unknowns.length; ++i)
                        writer.raw(message.$unknowns[i]);
                return writer;
            };

            /**
             * Encodes the specified V3ManifestCommitAckMessage message, length delimited. Does not implicitly {@link fns.v3.V3ManifestCommitAckMessage.verify|verify} messages.
             * @function encodeDelimited
             * @memberof fns.v3.V3ManifestCommitAckMessage
             * @static
             * @param {fns.v3.V3ManifestCommitAckMessage.$Properties} message V3ManifestCommitAckMessage message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            V3ManifestCommitAckMessage.encodeDelimited = function(message, writer) {
                return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
            };

            /**
             * Decodes a V3ManifestCommitAckMessage message from the specified reader or buffer.
             * @function decode
             * @memberof fns.v3.V3ManifestCommitAckMessage
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {fns.v3.V3ManifestCommitAckMessage & fns.v3.V3ManifestCommitAckMessage.$Shape} V3ManifestCommitAckMessage
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            V3ManifestCommitAckMessage.decode = function (reader, length, _end, _depth, _target) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $Reader.recursionLimit)
                    throw $Error("max depth exceeded");
                let end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.fns.v3.V3ManifestCommitAckMessage(), value;
                while (reader.pos < end) {
                    let start = reader.pos;
                    let tag = reader.tag();
                    if (tag === _end) {
                        _end = $undefined;
                        break;
                    }
                    let wireType = tag & 7;
                    switch (tag >>>= 3) {
                    case 1: {
                            if (wireType !== 2)
                                break;
                            if ((value = reader.stringVerify()).length)
                                message.vault = value;
                            else
                                delete message.vault;
                            continue;
                        }
                    case 2: {
                            if (wireType !== 0)
                                break;
                            if (typeof (value = reader.int64()) === "object" ? value.low || value.high : value !== 0)
                                message.newEpoch = value;
                            else
                                delete message.newEpoch;
                            continue;
                        }
                    case 3: {
                            if (wireType !== 2)
                                break;
                            if (!(message.items && message.items.length))
                                message.items = [];
                            message.items.push($root.fns.v3.V3CommitAckItem.decode(reader, reader.uint32(), $undefined, _depth + 1));
                            continue;
                        }
                    }
                    reader.skipType(wireType, _depth, tag);
                    if (!reader.discardUnknown) {
                        $util.makeProp(message, "$unknowns", false);
                        (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                    }
                }
                if (_end !== $undefined)
                    throw $Error("missing end group");
                return message;
            };

            /**
             * Decodes a V3ManifestCommitAckMessage message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof fns.v3.V3ManifestCommitAckMessage
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {fns.v3.V3ManifestCommitAckMessage & fns.v3.V3ManifestCommitAckMessage.$Shape} V3ManifestCommitAckMessage
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            V3ManifestCommitAckMessage.decodeDelimited = function(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a V3ManifestCommitAckMessage message.
             * @function verify
             * @memberof fns.v3.V3ManifestCommitAckMessage
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            V3ManifestCommitAckMessage.verify = function (message, _depth) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    return "max depth exceeded";
                if (message.vault != null && $Object.hasOwnProperty.call(message, "vault"))
                    if (!$util.isString(message.vault))
                        return "vault: string expected";
                if (message.newEpoch != null && $Object.hasOwnProperty.call(message, "newEpoch"))
                    if (!$util.isInteger(message.newEpoch) && !(message.newEpoch && $util.isInteger(message.newEpoch.low) && $util.isInteger(message.newEpoch.high)))
                        return "newEpoch: integer|Long expected";
                if (message.items != null && $Object.hasOwnProperty.call(message, "items")) {
                    if (!$Array.isArray(message.items))
                        return "items: array expected";
                    for (let i = 0; i < message.items.length; ++i) {
                        let error = $root.fns.v3.V3CommitAckItem.verify(message.items[i], _depth + 1);
                        if (error)
                            return "items." + error;
                    }
                }
                return null;
            };

            /**
             * Creates a V3ManifestCommitAckMessage message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof fns.v3.V3ManifestCommitAckMessage
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {fns.v3.V3ManifestCommitAckMessage} V3ManifestCommitAckMessage
             */
            V3ManifestCommitAckMessage.fromObject = function (object, _depth) {
                if (object instanceof $root.fns.v3.V3ManifestCommitAckMessage)
                    return object;
                if (!$util.isObject(object))
                    throw $TypeError(".fns.v3.V3ManifestCommitAckMessage: object expected");
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                let message = new $root.fns.v3.V3ManifestCommitAckMessage();
                if (object.vault != null)
                    if (typeof object.vault !== "string" || object.vault.length)
                        message.vault = $String(object.vault);
                if (object.newEpoch != null)
                    if (typeof object.newEpoch === "object" ? object.newEpoch.low || object.newEpoch.high : $Number(object.newEpoch) !== 0)
                        if ($util.Long)
                            message.newEpoch = $util.Long.fromValue(object.newEpoch, false);
                        else if (typeof object.newEpoch === "string")
                            message.newEpoch = $parseInt(object.newEpoch, 10);
                        else if (typeof object.newEpoch === "number")
                            message.newEpoch = object.newEpoch;
                        else if (typeof object.newEpoch === "object")
                            message.newEpoch = new $util.LongBits(object.newEpoch.low >>> 0, object.newEpoch.high >>> 0).toNumber();
                if (object.items) {
                    if (!$Array.isArray(object.items))
                        throw $TypeError(".fns.v3.V3ManifestCommitAckMessage.items: array expected");
                    message.items = $Array(object.items.length);
                    for (let i = 0; i < object.items.length; ++i) {
                        if (!$util.isObject(object.items[i]))
                            throw $TypeError(".fns.v3.V3ManifestCommitAckMessage.items: object expected");
                        message.items[i] = $root.fns.v3.V3CommitAckItem.fromObject(object.items[i], _depth + 1);
                    }
                }
                return message;
            };

            /**
             * Creates a plain object from a V3ManifestCommitAckMessage message. Also converts values to other types if specified.
             * @function toObject
             * @memberof fns.v3.V3ManifestCommitAckMessage
             * @static
             * @param {fns.v3.V3ManifestCommitAckMessage} message V3ManifestCommitAckMessage
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            V3ManifestCommitAckMessage.toObject = function (message, options, _depth) {
                if (!options)
                    options = {};
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                let object = {};
                if (options.arrays || options.defaults)
                    object.items = [];
                if (options.defaults) {
                    object.vault = "";
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, false);
                        object.newEpoch = options.longs === $String ? long.toString() : options.longs === $Number ? long.toNumber() : typeof $BigInt !== "undefined" && options.longs === $BigInt ? long.toBigInt() : long;
                    } else
                        object.newEpoch = options.longs === $String ? "0" : typeof $BigInt !== "undefined" && options.longs === $BigInt ? $BigInt("0") : 0;
                }
                if (message.vault != null && $Object.hasOwnProperty.call(message, "vault"))
                    object.vault = message.vault;
                if (message.newEpoch != null && $Object.hasOwnProperty.call(message, "newEpoch"))
                    if (typeof $BigInt !== "undefined" && options.longs === $BigInt)
                        object.newEpoch = typeof message.newEpoch === "number" ? $BigInt(message.newEpoch) : $util.Long.fromBits(message.newEpoch.low >>> 0, message.newEpoch.high >>> 0, false).toBigInt();
                    else if (typeof message.newEpoch === "number")
                        object.newEpoch = options.longs === $String ? $String(message.newEpoch) : message.newEpoch;
                    else
                        object.newEpoch = options.longs === $String ? $util.Long.prototype.toString.call(message.newEpoch) : options.longs === $Number ? new $util.LongBits(message.newEpoch.low >>> 0, message.newEpoch.high >>> 0).toNumber() : message.newEpoch;
                if (message.items && message.items.length) {
                    object.items = $Array(message.items.length);
                    for (let j = 0; j < message.items.length; ++j)
                        object.items[j] = $root.fns.v3.V3CommitAckItem.toObject(message.items[j], options, _depth + 1);
                }
                return object;
            };

            /**
             * Converts this V3ManifestCommitAckMessage to JSON.
             * @function toJSON
             * @memberof fns.v3.V3ManifestCommitAckMessage
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            V3ManifestCommitAckMessage.prototype.toJSON = function() {
                return V3ManifestCommitAckMessage.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the type url for V3ManifestCommitAckMessage
             * @function getTypeUrl
             * @memberof fns.v3.V3ManifestCommitAckMessage
             * @static
             * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
             * @returns {string} The type url
             */
            V3ManifestCommitAckMessage.getTypeUrl = function(prefix) {
                if (prefix === $undefined)
                    prefix = "type.googleapis.com";
                return prefix + "/fns.v3.V3ManifestCommitAckMessage";
            };

            return V3ManifestCommitAckMessage;
        })();

        v3.V3NotifyManifestMessage = (function() {

            /**
             * Properties of a V3NotifyManifestMessage.
             * @typedef {Object} fns.v3.V3NotifyManifestMessage.$Properties
             * @property {string|null} [vault] V3NotifyManifestMessage vault
             * @property {number|Long|null} [newEpoch] V3NotifyManifestMessage newEpoch
             * @property {Array.<fns.v3.Op.$Properties>|null} [ops] V3NotifyManifestMessage ops
             * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
             */

            /**
             * Properties of a V3NotifyManifestMessage.
             * @memberof fns.v3
             * @interface IV3NotifyManifestMessage
             * @augments fns.v3.V3NotifyManifestMessage.$Properties
             * @deprecated Use fns.v3.V3NotifyManifestMessage.$Properties instead.
             */

            /**
             * Shape of a V3NotifyManifestMessage.
             * @typedef {fns.v3.V3NotifyManifestMessage.$Properties} fns.v3.V3NotifyManifestMessage.$Shape
             */

            /**
             * Constructs a new V3NotifyManifestMessage.
             * @memberof fns.v3
             * @classdesc Represents a V3NotifyManifestMessage.
             * @constructor
             * @param {fns.v3.V3NotifyManifestMessage.$Properties=} [properties] Properties to set
             * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
             */
            const V3NotifyManifestMessage = function (properties) {
                this.ops = [];
                if (properties)
                    for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            };

            /**
             * V3NotifyManifestMessage vault.
             * @member {string} vault
             * @memberof fns.v3.V3NotifyManifestMessage
             * @instance
             */
            V3NotifyManifestMessage.prototype.vault = "";

            /**
             * V3NotifyManifestMessage newEpoch.
             * @member {number|Long} newEpoch
             * @memberof fns.v3.V3NotifyManifestMessage
             * @instance
             */
            V3NotifyManifestMessage.prototype.newEpoch = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * V3NotifyManifestMessage ops.
             * @member {Array.<fns.v3.Op.$Properties>} ops
             * @memberof fns.v3.V3NotifyManifestMessage
             * @instance
             */
            V3NotifyManifestMessage.prototype.ops = $util.emptyArray;

            /**
             * Creates a new V3NotifyManifestMessage instance using the specified properties.
             * @function create
             * @memberof fns.v3.V3NotifyManifestMessage
             * @static
             * @param {fns.v3.V3NotifyManifestMessage.$Properties=} [properties] Properties to set
             * @returns {fns.v3.V3NotifyManifestMessage} V3NotifyManifestMessage instance
             * @type {{
             *   (properties: fns.v3.V3NotifyManifestMessage.$Shape): fns.v3.V3NotifyManifestMessage & fns.v3.V3NotifyManifestMessage.$Shape;
             *   (properties?: fns.v3.V3NotifyManifestMessage.$Properties): fns.v3.V3NotifyManifestMessage;
             * }}
             */
            V3NotifyManifestMessage.create = function(properties) {
                return new V3NotifyManifestMessage(properties);
            };

            /**
             * Encodes the specified V3NotifyManifestMessage message. Does not implicitly {@link fns.v3.V3NotifyManifestMessage.verify|verify} messages.
             * @function encode
             * @memberof fns.v3.V3NotifyManifestMessage
             * @static
             * @param {fns.v3.V3NotifyManifestMessage.$Properties} message V3NotifyManifestMessage message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            V3NotifyManifestMessage.encode = function (message, writer, _depth) {
                if (!writer)
                    writer = $Writer.create();
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                if (message.vault != null && $Object.hasOwnProperty.call(message, "vault") && message.vault !== "")
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.vault);
                if (message.newEpoch != null && $Object.hasOwnProperty.call(message, "newEpoch") && (typeof message.newEpoch === "object" ? message.newEpoch.low || message.newEpoch.high : message.newEpoch !== 0))
                    writer.uint32(/* id 2, wireType 0 =*/16).int64(message.newEpoch);
                if (message.ops != null && message.ops.length)
                    for (let i = 0; i < message.ops.length; ++i)
                        $root.fns.v3.Op.encode(message.ops[i], writer.uint32(/* id 3, wireType 2 =*/26).fork(), _depth + 1).ldelim();
                if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                    for (let i = 0; i < message.$unknowns.length; ++i)
                        writer.raw(message.$unknowns[i]);
                return writer;
            };

            /**
             * Encodes the specified V3NotifyManifestMessage message, length delimited. Does not implicitly {@link fns.v3.V3NotifyManifestMessage.verify|verify} messages.
             * @function encodeDelimited
             * @memberof fns.v3.V3NotifyManifestMessage
             * @static
             * @param {fns.v3.V3NotifyManifestMessage.$Properties} message V3NotifyManifestMessage message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            V3NotifyManifestMessage.encodeDelimited = function(message, writer) {
                return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
            };

            /**
             * Decodes a V3NotifyManifestMessage message from the specified reader or buffer.
             * @function decode
             * @memberof fns.v3.V3NotifyManifestMessage
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {fns.v3.V3NotifyManifestMessage & fns.v3.V3NotifyManifestMessage.$Shape} V3NotifyManifestMessage
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            V3NotifyManifestMessage.decode = function (reader, length, _end, _depth, _target) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $Reader.recursionLimit)
                    throw $Error("max depth exceeded");
                let end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.fns.v3.V3NotifyManifestMessage(), value;
                while (reader.pos < end) {
                    let start = reader.pos;
                    let tag = reader.tag();
                    if (tag === _end) {
                        _end = $undefined;
                        break;
                    }
                    let wireType = tag & 7;
                    switch (tag >>>= 3) {
                    case 1: {
                            if (wireType !== 2)
                                break;
                            if ((value = reader.stringVerify()).length)
                                message.vault = value;
                            else
                                delete message.vault;
                            continue;
                        }
                    case 2: {
                            if (wireType !== 0)
                                break;
                            if (typeof (value = reader.int64()) === "object" ? value.low || value.high : value !== 0)
                                message.newEpoch = value;
                            else
                                delete message.newEpoch;
                            continue;
                        }
                    case 3: {
                            if (wireType !== 2)
                                break;
                            if (!(message.ops && message.ops.length))
                                message.ops = [];
                            message.ops.push($root.fns.v3.Op.decode(reader, reader.uint32(), $undefined, _depth + 1));
                            continue;
                        }
                    }
                    reader.skipType(wireType, _depth, tag);
                    if (!reader.discardUnknown) {
                        $util.makeProp(message, "$unknowns", false);
                        (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                    }
                }
                if (_end !== $undefined)
                    throw $Error("missing end group");
                return message;
            };

            /**
             * Decodes a V3NotifyManifestMessage message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof fns.v3.V3NotifyManifestMessage
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {fns.v3.V3NotifyManifestMessage & fns.v3.V3NotifyManifestMessage.$Shape} V3NotifyManifestMessage
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            V3NotifyManifestMessage.decodeDelimited = function(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a V3NotifyManifestMessage message.
             * @function verify
             * @memberof fns.v3.V3NotifyManifestMessage
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            V3NotifyManifestMessage.verify = function (message, _depth) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    return "max depth exceeded";
                if (message.vault != null && $Object.hasOwnProperty.call(message, "vault"))
                    if (!$util.isString(message.vault))
                        return "vault: string expected";
                if (message.newEpoch != null && $Object.hasOwnProperty.call(message, "newEpoch"))
                    if (!$util.isInteger(message.newEpoch) && !(message.newEpoch && $util.isInteger(message.newEpoch.low) && $util.isInteger(message.newEpoch.high)))
                        return "newEpoch: integer|Long expected";
                if (message.ops != null && $Object.hasOwnProperty.call(message, "ops")) {
                    if (!$Array.isArray(message.ops))
                        return "ops: array expected";
                    for (let i = 0; i < message.ops.length; ++i) {
                        let error = $root.fns.v3.Op.verify(message.ops[i], _depth + 1);
                        if (error)
                            return "ops." + error;
                    }
                }
                return null;
            };

            /**
             * Creates a V3NotifyManifestMessage message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof fns.v3.V3NotifyManifestMessage
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {fns.v3.V3NotifyManifestMessage} V3NotifyManifestMessage
             */
            V3NotifyManifestMessage.fromObject = function (object, _depth) {
                if (object instanceof $root.fns.v3.V3NotifyManifestMessage)
                    return object;
                if (!$util.isObject(object))
                    throw $TypeError(".fns.v3.V3NotifyManifestMessage: object expected");
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                let message = new $root.fns.v3.V3NotifyManifestMessage();
                if (object.vault != null)
                    if (typeof object.vault !== "string" || object.vault.length)
                        message.vault = $String(object.vault);
                if (object.newEpoch != null)
                    if (typeof object.newEpoch === "object" ? object.newEpoch.low || object.newEpoch.high : $Number(object.newEpoch) !== 0)
                        if ($util.Long)
                            message.newEpoch = $util.Long.fromValue(object.newEpoch, false);
                        else if (typeof object.newEpoch === "string")
                            message.newEpoch = $parseInt(object.newEpoch, 10);
                        else if (typeof object.newEpoch === "number")
                            message.newEpoch = object.newEpoch;
                        else if (typeof object.newEpoch === "object")
                            message.newEpoch = new $util.LongBits(object.newEpoch.low >>> 0, object.newEpoch.high >>> 0).toNumber();
                if (object.ops) {
                    if (!$Array.isArray(object.ops))
                        throw $TypeError(".fns.v3.V3NotifyManifestMessage.ops: array expected");
                    message.ops = $Array(object.ops.length);
                    for (let i = 0; i < object.ops.length; ++i) {
                        if (!$util.isObject(object.ops[i]))
                            throw $TypeError(".fns.v3.V3NotifyManifestMessage.ops: object expected");
                        message.ops[i] = $root.fns.v3.Op.fromObject(object.ops[i], _depth + 1);
                    }
                }
                return message;
            };

            /**
             * Creates a plain object from a V3NotifyManifestMessage message. Also converts values to other types if specified.
             * @function toObject
             * @memberof fns.v3.V3NotifyManifestMessage
             * @static
             * @param {fns.v3.V3NotifyManifestMessage} message V3NotifyManifestMessage
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            V3NotifyManifestMessage.toObject = function (message, options, _depth) {
                if (!options)
                    options = {};
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                let object = {};
                if (options.arrays || options.defaults)
                    object.ops = [];
                if (options.defaults) {
                    object.vault = "";
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, false);
                        object.newEpoch = options.longs === $String ? long.toString() : options.longs === $Number ? long.toNumber() : typeof $BigInt !== "undefined" && options.longs === $BigInt ? long.toBigInt() : long;
                    } else
                        object.newEpoch = options.longs === $String ? "0" : typeof $BigInt !== "undefined" && options.longs === $BigInt ? $BigInt("0") : 0;
                }
                if (message.vault != null && $Object.hasOwnProperty.call(message, "vault"))
                    object.vault = message.vault;
                if (message.newEpoch != null && $Object.hasOwnProperty.call(message, "newEpoch"))
                    if (typeof $BigInt !== "undefined" && options.longs === $BigInt)
                        object.newEpoch = typeof message.newEpoch === "number" ? $BigInt(message.newEpoch) : $util.Long.fromBits(message.newEpoch.low >>> 0, message.newEpoch.high >>> 0, false).toBigInt();
                    else if (typeof message.newEpoch === "number")
                        object.newEpoch = options.longs === $String ? $String(message.newEpoch) : message.newEpoch;
                    else
                        object.newEpoch = options.longs === $String ? $util.Long.prototype.toString.call(message.newEpoch) : options.longs === $Number ? new $util.LongBits(message.newEpoch.low >>> 0, message.newEpoch.high >>> 0).toNumber() : message.newEpoch;
                if (message.ops && message.ops.length) {
                    object.ops = $Array(message.ops.length);
                    for (let j = 0; j < message.ops.length; ++j)
                        object.ops[j] = $root.fns.v3.Op.toObject(message.ops[j], options, _depth + 1);
                }
                return object;
            };

            /**
             * Converts this V3NotifyManifestMessage to JSON.
             * @function toJSON
             * @memberof fns.v3.V3NotifyManifestMessage
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            V3NotifyManifestMessage.prototype.toJSON = function() {
                return V3NotifyManifestMessage.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the type url for V3NotifyManifestMessage
             * @function getTypeUrl
             * @memberof fns.v3.V3NotifyManifestMessage
             * @static
             * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
             * @returns {string} The type url
             */
            V3NotifyManifestMessage.getTypeUrl = function(prefix) {
                if (prefix === $undefined)
                    prefix = "type.googleapis.com";
                return prefix + "/fns.v3.V3NotifyManifestMessage";
            };

            return V3NotifyManifestMessage;
        })();

        v3.V3BlobUploadOpenRequest = (function() {

            /**
             * Properties of a V3BlobUploadOpenRequest.
             * @typedef {Object} fns.v3.V3BlobUploadOpenRequest.$Properties
             * @property {string|null} [vault] V3BlobUploadOpenRequest vault
             * @property {string|null} [hash] V3BlobUploadOpenRequest hash
             * @property {number|Long|null} [size] V3BlobUploadOpenRequest size
             * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
             */

            /**
             * Properties of a V3BlobUploadOpenRequest.
             * @memberof fns.v3
             * @interface IV3BlobUploadOpenRequest
             * @augments fns.v3.V3BlobUploadOpenRequest.$Properties
             * @deprecated Use fns.v3.V3BlobUploadOpenRequest.$Properties instead.
             */

            /**
             * Shape of a V3BlobUploadOpenRequest.
             * @typedef {fns.v3.V3BlobUploadOpenRequest.$Properties} fns.v3.V3BlobUploadOpenRequest.$Shape
             */

            /**
             * Constructs a new V3BlobUploadOpenRequest.
             * @memberof fns.v3
             * @classdesc Represents a V3BlobUploadOpenRequest.
             * @constructor
             * @param {fns.v3.V3BlobUploadOpenRequest.$Properties=} [properties] Properties to set
             * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
             */
            const V3BlobUploadOpenRequest = function (properties) {
                if (properties)
                    for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            };

            /**
             * V3BlobUploadOpenRequest vault.
             * @member {string} vault
             * @memberof fns.v3.V3BlobUploadOpenRequest
             * @instance
             */
            V3BlobUploadOpenRequest.prototype.vault = "";

            /**
             * V3BlobUploadOpenRequest hash.
             * @member {string} hash
             * @memberof fns.v3.V3BlobUploadOpenRequest
             * @instance
             */
            V3BlobUploadOpenRequest.prototype.hash = "";

            /**
             * V3BlobUploadOpenRequest size.
             * @member {number|Long} size
             * @memberof fns.v3.V3BlobUploadOpenRequest
             * @instance
             */
            V3BlobUploadOpenRequest.prototype.size = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * Creates a new V3BlobUploadOpenRequest instance using the specified properties.
             * @function create
             * @memberof fns.v3.V3BlobUploadOpenRequest
             * @static
             * @param {fns.v3.V3BlobUploadOpenRequest.$Properties=} [properties] Properties to set
             * @returns {fns.v3.V3BlobUploadOpenRequest} V3BlobUploadOpenRequest instance
             * @type {{
             *   (properties: fns.v3.V3BlobUploadOpenRequest.$Shape): fns.v3.V3BlobUploadOpenRequest & fns.v3.V3BlobUploadOpenRequest.$Shape;
             *   (properties?: fns.v3.V3BlobUploadOpenRequest.$Properties): fns.v3.V3BlobUploadOpenRequest;
             * }}
             */
            V3BlobUploadOpenRequest.create = function(properties) {
                return new V3BlobUploadOpenRequest(properties);
            };

            /**
             * Encodes the specified V3BlobUploadOpenRequest message. Does not implicitly {@link fns.v3.V3BlobUploadOpenRequest.verify|verify} messages.
             * @function encode
             * @memberof fns.v3.V3BlobUploadOpenRequest
             * @static
             * @param {fns.v3.V3BlobUploadOpenRequest.$Properties} message V3BlobUploadOpenRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            V3BlobUploadOpenRequest.encode = function (message, writer, _depth) {
                if (!writer)
                    writer = $Writer.create();
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                if (message.vault != null && $Object.hasOwnProperty.call(message, "vault") && message.vault !== "")
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.vault);
                if (message.hash != null && $Object.hasOwnProperty.call(message, "hash") && message.hash !== "")
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.hash);
                if (message.size != null && $Object.hasOwnProperty.call(message, "size") && (typeof message.size === "object" ? message.size.low || message.size.high : message.size !== 0))
                    writer.uint32(/* id 3, wireType 0 =*/24).int64(message.size);
                if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                    for (let i = 0; i < message.$unknowns.length; ++i)
                        writer.raw(message.$unknowns[i]);
                return writer;
            };

            /**
             * Encodes the specified V3BlobUploadOpenRequest message, length delimited. Does not implicitly {@link fns.v3.V3BlobUploadOpenRequest.verify|verify} messages.
             * @function encodeDelimited
             * @memberof fns.v3.V3BlobUploadOpenRequest
             * @static
             * @param {fns.v3.V3BlobUploadOpenRequest.$Properties} message V3BlobUploadOpenRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            V3BlobUploadOpenRequest.encodeDelimited = function(message, writer) {
                return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
            };

            /**
             * Decodes a V3BlobUploadOpenRequest message from the specified reader or buffer.
             * @function decode
             * @memberof fns.v3.V3BlobUploadOpenRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {fns.v3.V3BlobUploadOpenRequest & fns.v3.V3BlobUploadOpenRequest.$Shape} V3BlobUploadOpenRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            V3BlobUploadOpenRequest.decode = function (reader, length, _end, _depth, _target) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $Reader.recursionLimit)
                    throw $Error("max depth exceeded");
                let end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.fns.v3.V3BlobUploadOpenRequest(), value;
                while (reader.pos < end) {
                    let start = reader.pos;
                    let tag = reader.tag();
                    if (tag === _end) {
                        _end = $undefined;
                        break;
                    }
                    let wireType = tag & 7;
                    switch (tag >>>= 3) {
                    case 1: {
                            if (wireType !== 2)
                                break;
                            if ((value = reader.stringVerify()).length)
                                message.vault = value;
                            else
                                delete message.vault;
                            continue;
                        }
                    case 2: {
                            if (wireType !== 2)
                                break;
                            if ((value = reader.stringVerify()).length)
                                message.hash = value;
                            else
                                delete message.hash;
                            continue;
                        }
                    case 3: {
                            if (wireType !== 0)
                                break;
                            if (typeof (value = reader.int64()) === "object" ? value.low || value.high : value !== 0)
                                message.size = value;
                            else
                                delete message.size;
                            continue;
                        }
                    }
                    reader.skipType(wireType, _depth, tag);
                    if (!reader.discardUnknown) {
                        $util.makeProp(message, "$unknowns", false);
                        (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                    }
                }
                if (_end !== $undefined)
                    throw $Error("missing end group");
                return message;
            };

            /**
             * Decodes a V3BlobUploadOpenRequest message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof fns.v3.V3BlobUploadOpenRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {fns.v3.V3BlobUploadOpenRequest & fns.v3.V3BlobUploadOpenRequest.$Shape} V3BlobUploadOpenRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            V3BlobUploadOpenRequest.decodeDelimited = function(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a V3BlobUploadOpenRequest message.
             * @function verify
             * @memberof fns.v3.V3BlobUploadOpenRequest
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            V3BlobUploadOpenRequest.verify = function (message, _depth) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    return "max depth exceeded";
                if (message.vault != null && $Object.hasOwnProperty.call(message, "vault"))
                    if (!$util.isString(message.vault))
                        return "vault: string expected";
                if (message.hash != null && $Object.hasOwnProperty.call(message, "hash"))
                    if (!$util.isString(message.hash))
                        return "hash: string expected";
                if (message.size != null && $Object.hasOwnProperty.call(message, "size"))
                    if (!$util.isInteger(message.size) && !(message.size && $util.isInteger(message.size.low) && $util.isInteger(message.size.high)))
                        return "size: integer|Long expected";
                return null;
            };

            /**
             * Creates a V3BlobUploadOpenRequest message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof fns.v3.V3BlobUploadOpenRequest
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {fns.v3.V3BlobUploadOpenRequest} V3BlobUploadOpenRequest
             */
            V3BlobUploadOpenRequest.fromObject = function (object, _depth) {
                if (object instanceof $root.fns.v3.V3BlobUploadOpenRequest)
                    return object;
                if (!$util.isObject(object))
                    throw $TypeError(".fns.v3.V3BlobUploadOpenRequest: object expected");
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                let message = new $root.fns.v3.V3BlobUploadOpenRequest();
                if (object.vault != null)
                    if (typeof object.vault !== "string" || object.vault.length)
                        message.vault = $String(object.vault);
                if (object.hash != null)
                    if (typeof object.hash !== "string" || object.hash.length)
                        message.hash = $String(object.hash);
                if (object.size != null)
                    if (typeof object.size === "object" ? object.size.low || object.size.high : $Number(object.size) !== 0)
                        if ($util.Long)
                            message.size = $util.Long.fromValue(object.size, false);
                        else if (typeof object.size === "string")
                            message.size = $parseInt(object.size, 10);
                        else if (typeof object.size === "number")
                            message.size = object.size;
                        else if (typeof object.size === "object")
                            message.size = new $util.LongBits(object.size.low >>> 0, object.size.high >>> 0).toNumber();
                return message;
            };

            /**
             * Creates a plain object from a V3BlobUploadOpenRequest message. Also converts values to other types if specified.
             * @function toObject
             * @memberof fns.v3.V3BlobUploadOpenRequest
             * @static
             * @param {fns.v3.V3BlobUploadOpenRequest} message V3BlobUploadOpenRequest
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            V3BlobUploadOpenRequest.toObject = function (message, options, _depth) {
                if (!options)
                    options = {};
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                let object = {};
                if (options.defaults) {
                    object.vault = "";
                    object.hash = "";
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, false);
                        object.size = options.longs === $String ? long.toString() : options.longs === $Number ? long.toNumber() : typeof $BigInt !== "undefined" && options.longs === $BigInt ? long.toBigInt() : long;
                    } else
                        object.size = options.longs === $String ? "0" : typeof $BigInt !== "undefined" && options.longs === $BigInt ? $BigInt("0") : 0;
                }
                if (message.vault != null && $Object.hasOwnProperty.call(message, "vault"))
                    object.vault = message.vault;
                if (message.hash != null && $Object.hasOwnProperty.call(message, "hash"))
                    object.hash = message.hash;
                if (message.size != null && $Object.hasOwnProperty.call(message, "size"))
                    if (typeof $BigInt !== "undefined" && options.longs === $BigInt)
                        object.size = typeof message.size === "number" ? $BigInt(message.size) : $util.Long.fromBits(message.size.low >>> 0, message.size.high >>> 0, false).toBigInt();
                    else if (typeof message.size === "number")
                        object.size = options.longs === $String ? $String(message.size) : message.size;
                    else
                        object.size = options.longs === $String ? $util.Long.prototype.toString.call(message.size) : options.longs === $Number ? new $util.LongBits(message.size.low >>> 0, message.size.high >>> 0).toNumber() : message.size;
                return object;
            };

            /**
             * Converts this V3BlobUploadOpenRequest to JSON.
             * @function toJSON
             * @memberof fns.v3.V3BlobUploadOpenRequest
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            V3BlobUploadOpenRequest.prototype.toJSON = function() {
                return V3BlobUploadOpenRequest.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the type url for V3BlobUploadOpenRequest
             * @function getTypeUrl
             * @memberof fns.v3.V3BlobUploadOpenRequest
             * @static
             * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
             * @returns {string} The type url
             */
            V3BlobUploadOpenRequest.getTypeUrl = function(prefix) {
                if (prefix === $undefined)
                    prefix = "type.googleapis.com";
                return prefix + "/fns.v3.V3BlobUploadOpenRequest";
            };

            return V3BlobUploadOpenRequest;
        })();

        v3.V3BlobUploadOpenMessage = (function() {

            /**
             * Properties of a V3BlobUploadOpenMessage.
             * @typedef {Object} fns.v3.V3BlobUploadOpenMessage.$Properties
             * @property {string|null} [vault] V3BlobUploadOpenMessage vault
             * @property {string|null} [hash] V3BlobUploadOpenMessage hash
             * @property {string|null} [sessionId] V3BlobUploadOpenMessage sessionId
             * @property {number|Long|null} [chunkSize] V3BlobUploadOpenMessage chunkSize
             * @property {number|Long|null} [totalChunks] V3BlobUploadOpenMessage totalChunks
             * @property {boolean|null} [exists] V3BlobUploadOpenMessage exists
             * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
             */

            /**
             * Properties of a V3BlobUploadOpenMessage.
             * @memberof fns.v3
             * @interface IV3BlobUploadOpenMessage
             * @augments fns.v3.V3BlobUploadOpenMessage.$Properties
             * @deprecated Use fns.v3.V3BlobUploadOpenMessage.$Properties instead.
             */

            /**
             * Shape of a V3BlobUploadOpenMessage.
             * @typedef {fns.v3.V3BlobUploadOpenMessage.$Properties} fns.v3.V3BlobUploadOpenMessage.$Shape
             */

            /**
             * Constructs a new V3BlobUploadOpenMessage.
             * @memberof fns.v3
             * @classdesc Represents a V3BlobUploadOpenMessage.
             * @constructor
             * @param {fns.v3.V3BlobUploadOpenMessage.$Properties=} [properties] Properties to set
             * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
             */
            const V3BlobUploadOpenMessage = function (properties) {
                if (properties)
                    for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            };

            /**
             * V3BlobUploadOpenMessage vault.
             * @member {string} vault
             * @memberof fns.v3.V3BlobUploadOpenMessage
             * @instance
             */
            V3BlobUploadOpenMessage.prototype.vault = "";

            /**
             * V3BlobUploadOpenMessage hash.
             * @member {string} hash
             * @memberof fns.v3.V3BlobUploadOpenMessage
             * @instance
             */
            V3BlobUploadOpenMessage.prototype.hash = "";

            /**
             * V3BlobUploadOpenMessage sessionId.
             * @member {string} sessionId
             * @memberof fns.v3.V3BlobUploadOpenMessage
             * @instance
             */
            V3BlobUploadOpenMessage.prototype.sessionId = "";

            /**
             * V3BlobUploadOpenMessage chunkSize.
             * @member {number|Long} chunkSize
             * @memberof fns.v3.V3BlobUploadOpenMessage
             * @instance
             */
            V3BlobUploadOpenMessage.prototype.chunkSize = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * V3BlobUploadOpenMessage totalChunks.
             * @member {number|Long} totalChunks
             * @memberof fns.v3.V3BlobUploadOpenMessage
             * @instance
             */
            V3BlobUploadOpenMessage.prototype.totalChunks = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * V3BlobUploadOpenMessage exists.
             * @member {boolean} exists
             * @memberof fns.v3.V3BlobUploadOpenMessage
             * @instance
             */
            V3BlobUploadOpenMessage.prototype.exists = false;

            /**
             * Creates a new V3BlobUploadOpenMessage instance using the specified properties.
             * @function create
             * @memberof fns.v3.V3BlobUploadOpenMessage
             * @static
             * @param {fns.v3.V3BlobUploadOpenMessage.$Properties=} [properties] Properties to set
             * @returns {fns.v3.V3BlobUploadOpenMessage} V3BlobUploadOpenMessage instance
             * @type {{
             *   (properties: fns.v3.V3BlobUploadOpenMessage.$Shape): fns.v3.V3BlobUploadOpenMessage & fns.v3.V3BlobUploadOpenMessage.$Shape;
             *   (properties?: fns.v3.V3BlobUploadOpenMessage.$Properties): fns.v3.V3BlobUploadOpenMessage;
             * }}
             */
            V3BlobUploadOpenMessage.create = function(properties) {
                return new V3BlobUploadOpenMessage(properties);
            };

            /**
             * Encodes the specified V3BlobUploadOpenMessage message. Does not implicitly {@link fns.v3.V3BlobUploadOpenMessage.verify|verify} messages.
             * @function encode
             * @memberof fns.v3.V3BlobUploadOpenMessage
             * @static
             * @param {fns.v3.V3BlobUploadOpenMessage.$Properties} message V3BlobUploadOpenMessage message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            V3BlobUploadOpenMessage.encode = function (message, writer, _depth) {
                if (!writer)
                    writer = $Writer.create();
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                if (message.vault != null && $Object.hasOwnProperty.call(message, "vault") && message.vault !== "")
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.vault);
                if (message.hash != null && $Object.hasOwnProperty.call(message, "hash") && message.hash !== "")
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.hash);
                if (message.sessionId != null && $Object.hasOwnProperty.call(message, "sessionId") && message.sessionId !== "")
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.sessionId);
                if (message.chunkSize != null && $Object.hasOwnProperty.call(message, "chunkSize") && (typeof message.chunkSize === "object" ? message.chunkSize.low || message.chunkSize.high : message.chunkSize !== 0))
                    writer.uint32(/* id 4, wireType 0 =*/32).int64(message.chunkSize);
                if (message.totalChunks != null && $Object.hasOwnProperty.call(message, "totalChunks") && (typeof message.totalChunks === "object" ? message.totalChunks.low || message.totalChunks.high : message.totalChunks !== 0))
                    writer.uint32(/* id 5, wireType 0 =*/40).int64(message.totalChunks);
                if (message.exists != null && $Object.hasOwnProperty.call(message, "exists") && message.exists !== false)
                    writer.uint32(/* id 6, wireType 0 =*/48).bool(message.exists);
                if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                    for (let i = 0; i < message.$unknowns.length; ++i)
                        writer.raw(message.$unknowns[i]);
                return writer;
            };

            /**
             * Encodes the specified V3BlobUploadOpenMessage message, length delimited. Does not implicitly {@link fns.v3.V3BlobUploadOpenMessage.verify|verify} messages.
             * @function encodeDelimited
             * @memberof fns.v3.V3BlobUploadOpenMessage
             * @static
             * @param {fns.v3.V3BlobUploadOpenMessage.$Properties} message V3BlobUploadOpenMessage message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            V3BlobUploadOpenMessage.encodeDelimited = function(message, writer) {
                return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
            };

            /**
             * Decodes a V3BlobUploadOpenMessage message from the specified reader or buffer.
             * @function decode
             * @memberof fns.v3.V3BlobUploadOpenMessage
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {fns.v3.V3BlobUploadOpenMessage & fns.v3.V3BlobUploadOpenMessage.$Shape} V3BlobUploadOpenMessage
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            V3BlobUploadOpenMessage.decode = function (reader, length, _end, _depth, _target) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $Reader.recursionLimit)
                    throw $Error("max depth exceeded");
                let end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.fns.v3.V3BlobUploadOpenMessage(), value;
                while (reader.pos < end) {
                    let start = reader.pos;
                    let tag = reader.tag();
                    if (tag === _end) {
                        _end = $undefined;
                        break;
                    }
                    let wireType = tag & 7;
                    switch (tag >>>= 3) {
                    case 1: {
                            if (wireType !== 2)
                                break;
                            if ((value = reader.stringVerify()).length)
                                message.vault = value;
                            else
                                delete message.vault;
                            continue;
                        }
                    case 2: {
                            if (wireType !== 2)
                                break;
                            if ((value = reader.stringVerify()).length)
                                message.hash = value;
                            else
                                delete message.hash;
                            continue;
                        }
                    case 3: {
                            if (wireType !== 2)
                                break;
                            if ((value = reader.stringVerify()).length)
                                message.sessionId = value;
                            else
                                delete message.sessionId;
                            continue;
                        }
                    case 4: {
                            if (wireType !== 0)
                                break;
                            if (typeof (value = reader.int64()) === "object" ? value.low || value.high : value !== 0)
                                message.chunkSize = value;
                            else
                                delete message.chunkSize;
                            continue;
                        }
                    case 5: {
                            if (wireType !== 0)
                                break;
                            if (typeof (value = reader.int64()) === "object" ? value.low || value.high : value !== 0)
                                message.totalChunks = value;
                            else
                                delete message.totalChunks;
                            continue;
                        }
                    case 6: {
                            if (wireType !== 0)
                                break;
                            if (value = reader.bool())
                                message.exists = value;
                            else
                                delete message.exists;
                            continue;
                        }
                    }
                    reader.skipType(wireType, _depth, tag);
                    if (!reader.discardUnknown) {
                        $util.makeProp(message, "$unknowns", false);
                        (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                    }
                }
                if (_end !== $undefined)
                    throw $Error("missing end group");
                return message;
            };

            /**
             * Decodes a V3BlobUploadOpenMessage message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof fns.v3.V3BlobUploadOpenMessage
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {fns.v3.V3BlobUploadOpenMessage & fns.v3.V3BlobUploadOpenMessage.$Shape} V3BlobUploadOpenMessage
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            V3BlobUploadOpenMessage.decodeDelimited = function(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a V3BlobUploadOpenMessage message.
             * @function verify
             * @memberof fns.v3.V3BlobUploadOpenMessage
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            V3BlobUploadOpenMessage.verify = function (message, _depth) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    return "max depth exceeded";
                if (message.vault != null && $Object.hasOwnProperty.call(message, "vault"))
                    if (!$util.isString(message.vault))
                        return "vault: string expected";
                if (message.hash != null && $Object.hasOwnProperty.call(message, "hash"))
                    if (!$util.isString(message.hash))
                        return "hash: string expected";
                if (message.sessionId != null && $Object.hasOwnProperty.call(message, "sessionId"))
                    if (!$util.isString(message.sessionId))
                        return "sessionId: string expected";
                if (message.chunkSize != null && $Object.hasOwnProperty.call(message, "chunkSize"))
                    if (!$util.isInteger(message.chunkSize) && !(message.chunkSize && $util.isInteger(message.chunkSize.low) && $util.isInteger(message.chunkSize.high)))
                        return "chunkSize: integer|Long expected";
                if (message.totalChunks != null && $Object.hasOwnProperty.call(message, "totalChunks"))
                    if (!$util.isInteger(message.totalChunks) && !(message.totalChunks && $util.isInteger(message.totalChunks.low) && $util.isInteger(message.totalChunks.high)))
                        return "totalChunks: integer|Long expected";
                if (message.exists != null && $Object.hasOwnProperty.call(message, "exists"))
                    if (typeof message.exists !== "boolean")
                        return "exists: boolean expected";
                return null;
            };

            /**
             * Creates a V3BlobUploadOpenMessage message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof fns.v3.V3BlobUploadOpenMessage
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {fns.v3.V3BlobUploadOpenMessage} V3BlobUploadOpenMessage
             */
            V3BlobUploadOpenMessage.fromObject = function (object, _depth) {
                if (object instanceof $root.fns.v3.V3BlobUploadOpenMessage)
                    return object;
                if (!$util.isObject(object))
                    throw $TypeError(".fns.v3.V3BlobUploadOpenMessage: object expected");
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                let message = new $root.fns.v3.V3BlobUploadOpenMessage();
                if (object.vault != null)
                    if (typeof object.vault !== "string" || object.vault.length)
                        message.vault = $String(object.vault);
                if (object.hash != null)
                    if (typeof object.hash !== "string" || object.hash.length)
                        message.hash = $String(object.hash);
                if (object.sessionId != null)
                    if (typeof object.sessionId !== "string" || object.sessionId.length)
                        message.sessionId = $String(object.sessionId);
                if (object.chunkSize != null)
                    if (typeof object.chunkSize === "object" ? object.chunkSize.low || object.chunkSize.high : $Number(object.chunkSize) !== 0)
                        if ($util.Long)
                            message.chunkSize = $util.Long.fromValue(object.chunkSize, false);
                        else if (typeof object.chunkSize === "string")
                            message.chunkSize = $parseInt(object.chunkSize, 10);
                        else if (typeof object.chunkSize === "number")
                            message.chunkSize = object.chunkSize;
                        else if (typeof object.chunkSize === "object")
                            message.chunkSize = new $util.LongBits(object.chunkSize.low >>> 0, object.chunkSize.high >>> 0).toNumber();
                if (object.totalChunks != null)
                    if (typeof object.totalChunks === "object" ? object.totalChunks.low || object.totalChunks.high : $Number(object.totalChunks) !== 0)
                        if ($util.Long)
                            message.totalChunks = $util.Long.fromValue(object.totalChunks, false);
                        else if (typeof object.totalChunks === "string")
                            message.totalChunks = $parseInt(object.totalChunks, 10);
                        else if (typeof object.totalChunks === "number")
                            message.totalChunks = object.totalChunks;
                        else if (typeof object.totalChunks === "object")
                            message.totalChunks = new $util.LongBits(object.totalChunks.low >>> 0, object.totalChunks.high >>> 0).toNumber();
                if (object.exists != null)
                    if (object.exists)
                        message.exists = $Boolean(object.exists);
                return message;
            };

            /**
             * Creates a plain object from a V3BlobUploadOpenMessage message. Also converts values to other types if specified.
             * @function toObject
             * @memberof fns.v3.V3BlobUploadOpenMessage
             * @static
             * @param {fns.v3.V3BlobUploadOpenMessage} message V3BlobUploadOpenMessage
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            V3BlobUploadOpenMessage.toObject = function (message, options, _depth) {
                if (!options)
                    options = {};
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                let object = {};
                if (options.defaults) {
                    object.vault = "";
                    object.hash = "";
                    object.sessionId = "";
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, false);
                        object.chunkSize = options.longs === $String ? long.toString() : options.longs === $Number ? long.toNumber() : typeof $BigInt !== "undefined" && options.longs === $BigInt ? long.toBigInt() : long;
                    } else
                        object.chunkSize = options.longs === $String ? "0" : typeof $BigInt !== "undefined" && options.longs === $BigInt ? $BigInt("0") : 0;
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, false);
                        object.totalChunks = options.longs === $String ? long.toString() : options.longs === $Number ? long.toNumber() : typeof $BigInt !== "undefined" && options.longs === $BigInt ? long.toBigInt() : long;
                    } else
                        object.totalChunks = options.longs === $String ? "0" : typeof $BigInt !== "undefined" && options.longs === $BigInt ? $BigInt("0") : 0;
                    object.exists = false;
                }
                if (message.vault != null && $Object.hasOwnProperty.call(message, "vault"))
                    object.vault = message.vault;
                if (message.hash != null && $Object.hasOwnProperty.call(message, "hash"))
                    object.hash = message.hash;
                if (message.sessionId != null && $Object.hasOwnProperty.call(message, "sessionId"))
                    object.sessionId = message.sessionId;
                if (message.chunkSize != null && $Object.hasOwnProperty.call(message, "chunkSize"))
                    if (typeof $BigInt !== "undefined" && options.longs === $BigInt)
                        object.chunkSize = typeof message.chunkSize === "number" ? $BigInt(message.chunkSize) : $util.Long.fromBits(message.chunkSize.low >>> 0, message.chunkSize.high >>> 0, false).toBigInt();
                    else if (typeof message.chunkSize === "number")
                        object.chunkSize = options.longs === $String ? $String(message.chunkSize) : message.chunkSize;
                    else
                        object.chunkSize = options.longs === $String ? $util.Long.prototype.toString.call(message.chunkSize) : options.longs === $Number ? new $util.LongBits(message.chunkSize.low >>> 0, message.chunkSize.high >>> 0).toNumber() : message.chunkSize;
                if (message.totalChunks != null && $Object.hasOwnProperty.call(message, "totalChunks"))
                    if (typeof $BigInt !== "undefined" && options.longs === $BigInt)
                        object.totalChunks = typeof message.totalChunks === "number" ? $BigInt(message.totalChunks) : $util.Long.fromBits(message.totalChunks.low >>> 0, message.totalChunks.high >>> 0, false).toBigInt();
                    else if (typeof message.totalChunks === "number")
                        object.totalChunks = options.longs === $String ? $String(message.totalChunks) : message.totalChunks;
                    else
                        object.totalChunks = options.longs === $String ? $util.Long.prototype.toString.call(message.totalChunks) : options.longs === $Number ? new $util.LongBits(message.totalChunks.low >>> 0, message.totalChunks.high >>> 0).toNumber() : message.totalChunks;
                if (message.exists != null && $Object.hasOwnProperty.call(message, "exists"))
                    object.exists = message.exists;
                return object;
            };

            /**
             * Converts this V3BlobUploadOpenMessage to JSON.
             * @function toJSON
             * @memberof fns.v3.V3BlobUploadOpenMessage
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            V3BlobUploadOpenMessage.prototype.toJSON = function() {
                return V3BlobUploadOpenMessage.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the type url for V3BlobUploadOpenMessage
             * @function getTypeUrl
             * @memberof fns.v3.V3BlobUploadOpenMessage
             * @static
             * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
             * @returns {string} The type url
             */
            V3BlobUploadOpenMessage.getTypeUrl = function(prefix) {
                if (prefix === $undefined)
                    prefix = "type.googleapis.com";
                return prefix + "/fns.v3.V3BlobUploadOpenMessage";
            };

            return V3BlobUploadOpenMessage;
        })();

        v3.V3BlobUploadAckMessage = (function() {

            /**
             * Properties of a V3BlobUploadAckMessage.
             * @typedef {Object} fns.v3.V3BlobUploadAckMessage.$Properties
             * @property {string|null} [vault] V3BlobUploadAckMessage vault
             * @property {string|null} [hash] V3BlobUploadAckMessage hash
             * @property {number|Long|null} [size] V3BlobUploadAckMessage size
             * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
             */

            /**
             * Properties of a V3BlobUploadAckMessage.
             * @memberof fns.v3
             * @interface IV3BlobUploadAckMessage
             * @augments fns.v3.V3BlobUploadAckMessage.$Properties
             * @deprecated Use fns.v3.V3BlobUploadAckMessage.$Properties instead.
             */

            /**
             * Shape of a V3BlobUploadAckMessage.
             * @typedef {fns.v3.V3BlobUploadAckMessage.$Properties} fns.v3.V3BlobUploadAckMessage.$Shape
             */

            /**
             * Constructs a new V3BlobUploadAckMessage.
             * @memberof fns.v3
             * @classdesc Represents a V3BlobUploadAckMessage.
             * @constructor
             * @param {fns.v3.V3BlobUploadAckMessage.$Properties=} [properties] Properties to set
             * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
             */
            const V3BlobUploadAckMessage = function (properties) {
                if (properties)
                    for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            };

            /**
             * V3BlobUploadAckMessage vault.
             * @member {string} vault
             * @memberof fns.v3.V3BlobUploadAckMessage
             * @instance
             */
            V3BlobUploadAckMessage.prototype.vault = "";

            /**
             * V3BlobUploadAckMessage hash.
             * @member {string} hash
             * @memberof fns.v3.V3BlobUploadAckMessage
             * @instance
             */
            V3BlobUploadAckMessage.prototype.hash = "";

            /**
             * V3BlobUploadAckMessage size.
             * @member {number|Long} size
             * @memberof fns.v3.V3BlobUploadAckMessage
             * @instance
             */
            V3BlobUploadAckMessage.prototype.size = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * Creates a new V3BlobUploadAckMessage instance using the specified properties.
             * @function create
             * @memberof fns.v3.V3BlobUploadAckMessage
             * @static
             * @param {fns.v3.V3BlobUploadAckMessage.$Properties=} [properties] Properties to set
             * @returns {fns.v3.V3BlobUploadAckMessage} V3BlobUploadAckMessage instance
             * @type {{
             *   (properties: fns.v3.V3BlobUploadAckMessage.$Shape): fns.v3.V3BlobUploadAckMessage & fns.v3.V3BlobUploadAckMessage.$Shape;
             *   (properties?: fns.v3.V3BlobUploadAckMessage.$Properties): fns.v3.V3BlobUploadAckMessage;
             * }}
             */
            V3BlobUploadAckMessage.create = function(properties) {
                return new V3BlobUploadAckMessage(properties);
            };

            /**
             * Encodes the specified V3BlobUploadAckMessage message. Does not implicitly {@link fns.v3.V3BlobUploadAckMessage.verify|verify} messages.
             * @function encode
             * @memberof fns.v3.V3BlobUploadAckMessage
             * @static
             * @param {fns.v3.V3BlobUploadAckMessage.$Properties} message V3BlobUploadAckMessage message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            V3BlobUploadAckMessage.encode = function (message, writer, _depth) {
                if (!writer)
                    writer = $Writer.create();
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                if (message.vault != null && $Object.hasOwnProperty.call(message, "vault") && message.vault !== "")
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.vault);
                if (message.hash != null && $Object.hasOwnProperty.call(message, "hash") && message.hash !== "")
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.hash);
                if (message.size != null && $Object.hasOwnProperty.call(message, "size") && (typeof message.size === "object" ? message.size.low || message.size.high : message.size !== 0))
                    writer.uint32(/* id 3, wireType 0 =*/24).int64(message.size);
                if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                    for (let i = 0; i < message.$unknowns.length; ++i)
                        writer.raw(message.$unknowns[i]);
                return writer;
            };

            /**
             * Encodes the specified V3BlobUploadAckMessage message, length delimited. Does not implicitly {@link fns.v3.V3BlobUploadAckMessage.verify|verify} messages.
             * @function encodeDelimited
             * @memberof fns.v3.V3BlobUploadAckMessage
             * @static
             * @param {fns.v3.V3BlobUploadAckMessage.$Properties} message V3BlobUploadAckMessage message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            V3BlobUploadAckMessage.encodeDelimited = function(message, writer) {
                return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
            };

            /**
             * Decodes a V3BlobUploadAckMessage message from the specified reader or buffer.
             * @function decode
             * @memberof fns.v3.V3BlobUploadAckMessage
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {fns.v3.V3BlobUploadAckMessage & fns.v3.V3BlobUploadAckMessage.$Shape} V3BlobUploadAckMessage
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            V3BlobUploadAckMessage.decode = function (reader, length, _end, _depth, _target) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $Reader.recursionLimit)
                    throw $Error("max depth exceeded");
                let end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.fns.v3.V3BlobUploadAckMessage(), value;
                while (reader.pos < end) {
                    let start = reader.pos;
                    let tag = reader.tag();
                    if (tag === _end) {
                        _end = $undefined;
                        break;
                    }
                    let wireType = tag & 7;
                    switch (tag >>>= 3) {
                    case 1: {
                            if (wireType !== 2)
                                break;
                            if ((value = reader.stringVerify()).length)
                                message.vault = value;
                            else
                                delete message.vault;
                            continue;
                        }
                    case 2: {
                            if (wireType !== 2)
                                break;
                            if ((value = reader.stringVerify()).length)
                                message.hash = value;
                            else
                                delete message.hash;
                            continue;
                        }
                    case 3: {
                            if (wireType !== 0)
                                break;
                            if (typeof (value = reader.int64()) === "object" ? value.low || value.high : value !== 0)
                                message.size = value;
                            else
                                delete message.size;
                            continue;
                        }
                    }
                    reader.skipType(wireType, _depth, tag);
                    if (!reader.discardUnknown) {
                        $util.makeProp(message, "$unknowns", false);
                        (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                    }
                }
                if (_end !== $undefined)
                    throw $Error("missing end group");
                return message;
            };

            /**
             * Decodes a V3BlobUploadAckMessage message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof fns.v3.V3BlobUploadAckMessage
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {fns.v3.V3BlobUploadAckMessage & fns.v3.V3BlobUploadAckMessage.$Shape} V3BlobUploadAckMessage
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            V3BlobUploadAckMessage.decodeDelimited = function(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a V3BlobUploadAckMessage message.
             * @function verify
             * @memberof fns.v3.V3BlobUploadAckMessage
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            V3BlobUploadAckMessage.verify = function (message, _depth) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    return "max depth exceeded";
                if (message.vault != null && $Object.hasOwnProperty.call(message, "vault"))
                    if (!$util.isString(message.vault))
                        return "vault: string expected";
                if (message.hash != null && $Object.hasOwnProperty.call(message, "hash"))
                    if (!$util.isString(message.hash))
                        return "hash: string expected";
                if (message.size != null && $Object.hasOwnProperty.call(message, "size"))
                    if (!$util.isInteger(message.size) && !(message.size && $util.isInteger(message.size.low) && $util.isInteger(message.size.high)))
                        return "size: integer|Long expected";
                return null;
            };

            /**
             * Creates a V3BlobUploadAckMessage message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof fns.v3.V3BlobUploadAckMessage
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {fns.v3.V3BlobUploadAckMessage} V3BlobUploadAckMessage
             */
            V3BlobUploadAckMessage.fromObject = function (object, _depth) {
                if (object instanceof $root.fns.v3.V3BlobUploadAckMessage)
                    return object;
                if (!$util.isObject(object))
                    throw $TypeError(".fns.v3.V3BlobUploadAckMessage: object expected");
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                let message = new $root.fns.v3.V3BlobUploadAckMessage();
                if (object.vault != null)
                    if (typeof object.vault !== "string" || object.vault.length)
                        message.vault = $String(object.vault);
                if (object.hash != null)
                    if (typeof object.hash !== "string" || object.hash.length)
                        message.hash = $String(object.hash);
                if (object.size != null)
                    if (typeof object.size === "object" ? object.size.low || object.size.high : $Number(object.size) !== 0)
                        if ($util.Long)
                            message.size = $util.Long.fromValue(object.size, false);
                        else if (typeof object.size === "string")
                            message.size = $parseInt(object.size, 10);
                        else if (typeof object.size === "number")
                            message.size = object.size;
                        else if (typeof object.size === "object")
                            message.size = new $util.LongBits(object.size.low >>> 0, object.size.high >>> 0).toNumber();
                return message;
            };

            /**
             * Creates a plain object from a V3BlobUploadAckMessage message. Also converts values to other types if specified.
             * @function toObject
             * @memberof fns.v3.V3BlobUploadAckMessage
             * @static
             * @param {fns.v3.V3BlobUploadAckMessage} message V3BlobUploadAckMessage
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            V3BlobUploadAckMessage.toObject = function (message, options, _depth) {
                if (!options)
                    options = {};
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                let object = {};
                if (options.defaults) {
                    object.vault = "";
                    object.hash = "";
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, false);
                        object.size = options.longs === $String ? long.toString() : options.longs === $Number ? long.toNumber() : typeof $BigInt !== "undefined" && options.longs === $BigInt ? long.toBigInt() : long;
                    } else
                        object.size = options.longs === $String ? "0" : typeof $BigInt !== "undefined" && options.longs === $BigInt ? $BigInt("0") : 0;
                }
                if (message.vault != null && $Object.hasOwnProperty.call(message, "vault"))
                    object.vault = message.vault;
                if (message.hash != null && $Object.hasOwnProperty.call(message, "hash"))
                    object.hash = message.hash;
                if (message.size != null && $Object.hasOwnProperty.call(message, "size"))
                    if (typeof $BigInt !== "undefined" && options.longs === $BigInt)
                        object.size = typeof message.size === "number" ? $BigInt(message.size) : $util.Long.fromBits(message.size.low >>> 0, message.size.high >>> 0, false).toBigInt();
                    else if (typeof message.size === "number")
                        object.size = options.longs === $String ? $String(message.size) : message.size;
                    else
                        object.size = options.longs === $String ? $util.Long.prototype.toString.call(message.size) : options.longs === $Number ? new $util.LongBits(message.size.low >>> 0, message.size.high >>> 0).toNumber() : message.size;
                return object;
            };

            /**
             * Converts this V3BlobUploadAckMessage to JSON.
             * @function toJSON
             * @memberof fns.v3.V3BlobUploadAckMessage
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            V3BlobUploadAckMessage.prototype.toJSON = function() {
                return V3BlobUploadAckMessage.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the type url for V3BlobUploadAckMessage
             * @function getTypeUrl
             * @memberof fns.v3.V3BlobUploadAckMessage
             * @static
             * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
             * @returns {string} The type url
             */
            V3BlobUploadAckMessage.getTypeUrl = function(prefix) {
                if (prefix === $undefined)
                    prefix = "type.googleapis.com";
                return prefix + "/fns.v3.V3BlobUploadAckMessage";
            };

            return V3BlobUploadAckMessage;
        })();

        v3.V3BlobDownloadRequest = (function() {

            /**
             * Properties of a V3BlobDownloadRequest.
             * @typedef {Object} fns.v3.V3BlobDownloadRequest.$Properties
             * @property {string|null} [vault] V3BlobDownloadRequest vault
             * @property {string|null} [hash] V3BlobDownloadRequest hash
             * @property {number|null} [chunkIndex] V3BlobDownloadRequest chunkIndex
             * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
             */

            /**
             * Properties of a V3BlobDownloadRequest.
             * @memberof fns.v3
             * @interface IV3BlobDownloadRequest
             * @augments fns.v3.V3BlobDownloadRequest.$Properties
             * @deprecated Use fns.v3.V3BlobDownloadRequest.$Properties instead.
             */

            /**
             * Shape of a V3BlobDownloadRequest.
             * @typedef {fns.v3.V3BlobDownloadRequest.$Properties} fns.v3.V3BlobDownloadRequest.$Shape
             */

            /**
             * Constructs a new V3BlobDownloadRequest.
             * @memberof fns.v3
             * @classdesc Represents a V3BlobDownloadRequest.
             * @constructor
             * @param {fns.v3.V3BlobDownloadRequest.$Properties=} [properties] Properties to set
             * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
             */
            const V3BlobDownloadRequest = function (properties) {
                if (properties)
                    for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            };

            /**
             * V3BlobDownloadRequest vault.
             * @member {string} vault
             * @memberof fns.v3.V3BlobDownloadRequest
             * @instance
             */
            V3BlobDownloadRequest.prototype.vault = "";

            /**
             * V3BlobDownloadRequest hash.
             * @member {string} hash
             * @memberof fns.v3.V3BlobDownloadRequest
             * @instance
             */
            V3BlobDownloadRequest.prototype.hash = "";

            /**
             * V3BlobDownloadRequest chunkIndex.
             * @member {number} chunkIndex
             * @memberof fns.v3.V3BlobDownloadRequest
             * @instance
             */
            V3BlobDownloadRequest.prototype.chunkIndex = 0;

            /**
             * Creates a new V3BlobDownloadRequest instance using the specified properties.
             * @function create
             * @memberof fns.v3.V3BlobDownloadRequest
             * @static
             * @param {fns.v3.V3BlobDownloadRequest.$Properties=} [properties] Properties to set
             * @returns {fns.v3.V3BlobDownloadRequest} V3BlobDownloadRequest instance
             * @type {{
             *   (properties: fns.v3.V3BlobDownloadRequest.$Shape): fns.v3.V3BlobDownloadRequest & fns.v3.V3BlobDownloadRequest.$Shape;
             *   (properties?: fns.v3.V3BlobDownloadRequest.$Properties): fns.v3.V3BlobDownloadRequest;
             * }}
             */
            V3BlobDownloadRequest.create = function(properties) {
                return new V3BlobDownloadRequest(properties);
            };

            /**
             * Encodes the specified V3BlobDownloadRequest message. Does not implicitly {@link fns.v3.V3BlobDownloadRequest.verify|verify} messages.
             * @function encode
             * @memberof fns.v3.V3BlobDownloadRequest
             * @static
             * @param {fns.v3.V3BlobDownloadRequest.$Properties} message V3BlobDownloadRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            V3BlobDownloadRequest.encode = function (message, writer, _depth) {
                if (!writer)
                    writer = $Writer.create();
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                if (message.vault != null && $Object.hasOwnProperty.call(message, "vault") && message.vault !== "")
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.vault);
                if (message.hash != null && $Object.hasOwnProperty.call(message, "hash") && message.hash !== "")
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.hash);
                if (message.chunkIndex != null && $Object.hasOwnProperty.call(message, "chunkIndex") && message.chunkIndex !== 0)
                    writer.uint32(/* id 3, wireType 0 =*/24).uint32(message.chunkIndex);
                if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                    for (let i = 0; i < message.$unknowns.length; ++i)
                        writer.raw(message.$unknowns[i]);
                return writer;
            };

            /**
             * Encodes the specified V3BlobDownloadRequest message, length delimited. Does not implicitly {@link fns.v3.V3BlobDownloadRequest.verify|verify} messages.
             * @function encodeDelimited
             * @memberof fns.v3.V3BlobDownloadRequest
             * @static
             * @param {fns.v3.V3BlobDownloadRequest.$Properties} message V3BlobDownloadRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            V3BlobDownloadRequest.encodeDelimited = function(message, writer) {
                return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
            };

            /**
             * Decodes a V3BlobDownloadRequest message from the specified reader or buffer.
             * @function decode
             * @memberof fns.v3.V3BlobDownloadRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {fns.v3.V3BlobDownloadRequest & fns.v3.V3BlobDownloadRequest.$Shape} V3BlobDownloadRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            V3BlobDownloadRequest.decode = function (reader, length, _end, _depth, _target) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $Reader.recursionLimit)
                    throw $Error("max depth exceeded");
                let end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.fns.v3.V3BlobDownloadRequest(), value;
                while (reader.pos < end) {
                    let start = reader.pos;
                    let tag = reader.tag();
                    if (tag === _end) {
                        _end = $undefined;
                        break;
                    }
                    let wireType = tag & 7;
                    switch (tag >>>= 3) {
                    case 1: {
                            if (wireType !== 2)
                                break;
                            if ((value = reader.stringVerify()).length)
                                message.vault = value;
                            else
                                delete message.vault;
                            continue;
                        }
                    case 2: {
                            if (wireType !== 2)
                                break;
                            if ((value = reader.stringVerify()).length)
                                message.hash = value;
                            else
                                delete message.hash;
                            continue;
                        }
                    case 3: {
                            if (wireType !== 0)
                                break;
                            if (value = reader.uint32())
                                message.chunkIndex = value;
                            else
                                delete message.chunkIndex;
                            continue;
                        }
                    }
                    reader.skipType(wireType, _depth, tag);
                    if (!reader.discardUnknown) {
                        $util.makeProp(message, "$unknowns", false);
                        (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                    }
                }
                if (_end !== $undefined)
                    throw $Error("missing end group");
                return message;
            };

            /**
             * Decodes a V3BlobDownloadRequest message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof fns.v3.V3BlobDownloadRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {fns.v3.V3BlobDownloadRequest & fns.v3.V3BlobDownloadRequest.$Shape} V3BlobDownloadRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            V3BlobDownloadRequest.decodeDelimited = function(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a V3BlobDownloadRequest message.
             * @function verify
             * @memberof fns.v3.V3BlobDownloadRequest
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            V3BlobDownloadRequest.verify = function (message, _depth) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    return "max depth exceeded";
                if (message.vault != null && $Object.hasOwnProperty.call(message, "vault"))
                    if (!$util.isString(message.vault))
                        return "vault: string expected";
                if (message.hash != null && $Object.hasOwnProperty.call(message, "hash"))
                    if (!$util.isString(message.hash))
                        return "hash: string expected";
                if (message.chunkIndex != null && $Object.hasOwnProperty.call(message, "chunkIndex"))
                    if (!$util.isInteger(message.chunkIndex))
                        return "chunkIndex: integer expected";
                return null;
            };

            /**
             * Creates a V3BlobDownloadRequest message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof fns.v3.V3BlobDownloadRequest
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {fns.v3.V3BlobDownloadRequest} V3BlobDownloadRequest
             */
            V3BlobDownloadRequest.fromObject = function (object, _depth) {
                if (object instanceof $root.fns.v3.V3BlobDownloadRequest)
                    return object;
                if (!$util.isObject(object))
                    throw $TypeError(".fns.v3.V3BlobDownloadRequest: object expected");
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                let message = new $root.fns.v3.V3BlobDownloadRequest();
                if (object.vault != null)
                    if (typeof object.vault !== "string" || object.vault.length)
                        message.vault = $String(object.vault);
                if (object.hash != null)
                    if (typeof object.hash !== "string" || object.hash.length)
                        message.hash = $String(object.hash);
                if (object.chunkIndex != null)
                    if ($Number(object.chunkIndex) !== 0)
                        message.chunkIndex = object.chunkIndex >>> 0;
                return message;
            };

            /**
             * Creates a plain object from a V3BlobDownloadRequest message. Also converts values to other types if specified.
             * @function toObject
             * @memberof fns.v3.V3BlobDownloadRequest
             * @static
             * @param {fns.v3.V3BlobDownloadRequest} message V3BlobDownloadRequest
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            V3BlobDownloadRequest.toObject = function (message, options, _depth) {
                if (!options)
                    options = {};
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                let object = {};
                if (options.defaults) {
                    object.vault = "";
                    object.hash = "";
                    object.chunkIndex = 0;
                }
                if (message.vault != null && $Object.hasOwnProperty.call(message, "vault"))
                    object.vault = message.vault;
                if (message.hash != null && $Object.hasOwnProperty.call(message, "hash"))
                    object.hash = message.hash;
                if (message.chunkIndex != null && $Object.hasOwnProperty.call(message, "chunkIndex"))
                    object.chunkIndex = message.chunkIndex;
                return object;
            };

            /**
             * Converts this V3BlobDownloadRequest to JSON.
             * @function toJSON
             * @memberof fns.v3.V3BlobDownloadRequest
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            V3BlobDownloadRequest.prototype.toJSON = function() {
                return V3BlobDownloadRequest.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the type url for V3BlobDownloadRequest
             * @function getTypeUrl
             * @memberof fns.v3.V3BlobDownloadRequest
             * @static
             * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
             * @returns {string} The type url
             */
            V3BlobDownloadRequest.getTypeUrl = function(prefix) {
                if (prefix === $undefined)
                    prefix = "type.googleapis.com";
                return prefix + "/fns.v3.V3BlobDownloadRequest";
            };

            return V3BlobDownloadRequest;
        })();

        v3.V3BlobChunkMessage = (function() {

            /**
             * Properties of a V3BlobChunkMessage.
             * @typedef {Object} fns.v3.V3BlobChunkMessage.$Properties
             * @property {string|null} [vault] V3BlobChunkMessage vault
             * @property {string|null} [hash] V3BlobChunkMessage hash
             * @property {number|null} [chunkIndex] V3BlobChunkMessage chunkIndex
             * @property {number|Long|null} [totalChunks] V3BlobChunkMessage totalChunks
             * @property {number|Long|null} [chunkSize] V3BlobChunkMessage chunkSize
             * @property {number|Long|null} [size] V3BlobChunkMessage size
             * @property {string|null} [data] V3BlobChunkMessage data
             * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
             */

            /**
             * Properties of a V3BlobChunkMessage.
             * @memberof fns.v3
             * @interface IV3BlobChunkMessage
             * @augments fns.v3.V3BlobChunkMessage.$Properties
             * @deprecated Use fns.v3.V3BlobChunkMessage.$Properties instead.
             */

            /**
             * Shape of a V3BlobChunkMessage.
             * @typedef {fns.v3.V3BlobChunkMessage.$Properties} fns.v3.V3BlobChunkMessage.$Shape
             */

            /**
             * Constructs a new V3BlobChunkMessage.
             * @memberof fns.v3
             * @classdesc Represents a V3BlobChunkMessage.
             * @constructor
             * @param {fns.v3.V3BlobChunkMessage.$Properties=} [properties] Properties to set
             * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
             */
            const V3BlobChunkMessage = function (properties) {
                if (properties)
                    for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            };

            /**
             * V3BlobChunkMessage vault.
             * @member {string} vault
             * @memberof fns.v3.V3BlobChunkMessage
             * @instance
             */
            V3BlobChunkMessage.prototype.vault = "";

            /**
             * V3BlobChunkMessage hash.
             * @member {string} hash
             * @memberof fns.v3.V3BlobChunkMessage
             * @instance
             */
            V3BlobChunkMessage.prototype.hash = "";

            /**
             * V3BlobChunkMessage chunkIndex.
             * @member {number} chunkIndex
             * @memberof fns.v3.V3BlobChunkMessage
             * @instance
             */
            V3BlobChunkMessage.prototype.chunkIndex = 0;

            /**
             * V3BlobChunkMessage totalChunks.
             * @member {number|Long} totalChunks
             * @memberof fns.v3.V3BlobChunkMessage
             * @instance
             */
            V3BlobChunkMessage.prototype.totalChunks = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * V3BlobChunkMessage chunkSize.
             * @member {number|Long} chunkSize
             * @memberof fns.v3.V3BlobChunkMessage
             * @instance
             */
            V3BlobChunkMessage.prototype.chunkSize = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * V3BlobChunkMessage size.
             * @member {number|Long} size
             * @memberof fns.v3.V3BlobChunkMessage
             * @instance
             */
            V3BlobChunkMessage.prototype.size = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * V3BlobChunkMessage data.
             * @member {string} data
             * @memberof fns.v3.V3BlobChunkMessage
             * @instance
             */
            V3BlobChunkMessage.prototype.data = "";

            /**
             * Creates a new V3BlobChunkMessage instance using the specified properties.
             * @function create
             * @memberof fns.v3.V3BlobChunkMessage
             * @static
             * @param {fns.v3.V3BlobChunkMessage.$Properties=} [properties] Properties to set
             * @returns {fns.v3.V3BlobChunkMessage} V3BlobChunkMessage instance
             * @type {{
             *   (properties: fns.v3.V3BlobChunkMessage.$Shape): fns.v3.V3BlobChunkMessage & fns.v3.V3BlobChunkMessage.$Shape;
             *   (properties?: fns.v3.V3BlobChunkMessage.$Properties): fns.v3.V3BlobChunkMessage;
             * }}
             */
            V3BlobChunkMessage.create = function(properties) {
                return new V3BlobChunkMessage(properties);
            };

            /**
             * Encodes the specified V3BlobChunkMessage message. Does not implicitly {@link fns.v3.V3BlobChunkMessage.verify|verify} messages.
             * @function encode
             * @memberof fns.v3.V3BlobChunkMessage
             * @static
             * @param {fns.v3.V3BlobChunkMessage.$Properties} message V3BlobChunkMessage message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            V3BlobChunkMessage.encode = function (message, writer, _depth) {
                if (!writer)
                    writer = $Writer.create();
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                if (message.vault != null && $Object.hasOwnProperty.call(message, "vault") && message.vault !== "")
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.vault);
                if (message.hash != null && $Object.hasOwnProperty.call(message, "hash") && message.hash !== "")
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.hash);
                if (message.chunkIndex != null && $Object.hasOwnProperty.call(message, "chunkIndex") && message.chunkIndex !== 0)
                    writer.uint32(/* id 3, wireType 0 =*/24).uint32(message.chunkIndex);
                if (message.totalChunks != null && $Object.hasOwnProperty.call(message, "totalChunks") && (typeof message.totalChunks === "object" ? message.totalChunks.low || message.totalChunks.high : message.totalChunks !== 0))
                    writer.uint32(/* id 4, wireType 0 =*/32).int64(message.totalChunks);
                if (message.chunkSize != null && $Object.hasOwnProperty.call(message, "chunkSize") && (typeof message.chunkSize === "object" ? message.chunkSize.low || message.chunkSize.high : message.chunkSize !== 0))
                    writer.uint32(/* id 5, wireType 0 =*/40).int64(message.chunkSize);
                if (message.size != null && $Object.hasOwnProperty.call(message, "size") && (typeof message.size === "object" ? message.size.low || message.size.high : message.size !== 0))
                    writer.uint32(/* id 6, wireType 0 =*/48).int64(message.size);
                if (message.data != null && $Object.hasOwnProperty.call(message, "data") && message.data !== "")
                    writer.uint32(/* id 7, wireType 2 =*/58).string(message.data);
                if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                    for (let i = 0; i < message.$unknowns.length; ++i)
                        writer.raw(message.$unknowns[i]);
                return writer;
            };

            /**
             * Encodes the specified V3BlobChunkMessage message, length delimited. Does not implicitly {@link fns.v3.V3BlobChunkMessage.verify|verify} messages.
             * @function encodeDelimited
             * @memberof fns.v3.V3BlobChunkMessage
             * @static
             * @param {fns.v3.V3BlobChunkMessage.$Properties} message V3BlobChunkMessage message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            V3BlobChunkMessage.encodeDelimited = function(message, writer) {
                return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
            };

            /**
             * Decodes a V3BlobChunkMessage message from the specified reader or buffer.
             * @function decode
             * @memberof fns.v3.V3BlobChunkMessage
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {fns.v3.V3BlobChunkMessage & fns.v3.V3BlobChunkMessage.$Shape} V3BlobChunkMessage
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            V3BlobChunkMessage.decode = function (reader, length, _end, _depth, _target) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $Reader.recursionLimit)
                    throw $Error("max depth exceeded");
                let end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.fns.v3.V3BlobChunkMessage(), value;
                while (reader.pos < end) {
                    let start = reader.pos;
                    let tag = reader.tag();
                    if (tag === _end) {
                        _end = $undefined;
                        break;
                    }
                    let wireType = tag & 7;
                    switch (tag >>>= 3) {
                    case 1: {
                            if (wireType !== 2)
                                break;
                            if ((value = reader.stringVerify()).length)
                                message.vault = value;
                            else
                                delete message.vault;
                            continue;
                        }
                    case 2: {
                            if (wireType !== 2)
                                break;
                            if ((value = reader.stringVerify()).length)
                                message.hash = value;
                            else
                                delete message.hash;
                            continue;
                        }
                    case 3: {
                            if (wireType !== 0)
                                break;
                            if (value = reader.uint32())
                                message.chunkIndex = value;
                            else
                                delete message.chunkIndex;
                            continue;
                        }
                    case 4: {
                            if (wireType !== 0)
                                break;
                            if (typeof (value = reader.int64()) === "object" ? value.low || value.high : value !== 0)
                                message.totalChunks = value;
                            else
                                delete message.totalChunks;
                            continue;
                        }
                    case 5: {
                            if (wireType !== 0)
                                break;
                            if (typeof (value = reader.int64()) === "object" ? value.low || value.high : value !== 0)
                                message.chunkSize = value;
                            else
                                delete message.chunkSize;
                            continue;
                        }
                    case 6: {
                            if (wireType !== 0)
                                break;
                            if (typeof (value = reader.int64()) === "object" ? value.low || value.high : value !== 0)
                                message.size = value;
                            else
                                delete message.size;
                            continue;
                        }
                    case 7: {
                            if (wireType !== 2)
                                break;
                            if ((value = reader.stringVerify()).length)
                                message.data = value;
                            else
                                delete message.data;
                            continue;
                        }
                    }
                    reader.skipType(wireType, _depth, tag);
                    if (!reader.discardUnknown) {
                        $util.makeProp(message, "$unknowns", false);
                        (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                    }
                }
                if (_end !== $undefined)
                    throw $Error("missing end group");
                return message;
            };

            /**
             * Decodes a V3BlobChunkMessage message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof fns.v3.V3BlobChunkMessage
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {fns.v3.V3BlobChunkMessage & fns.v3.V3BlobChunkMessage.$Shape} V3BlobChunkMessage
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            V3BlobChunkMessage.decodeDelimited = function(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a V3BlobChunkMessage message.
             * @function verify
             * @memberof fns.v3.V3BlobChunkMessage
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            V3BlobChunkMessage.verify = function (message, _depth) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    return "max depth exceeded";
                if (message.vault != null && $Object.hasOwnProperty.call(message, "vault"))
                    if (!$util.isString(message.vault))
                        return "vault: string expected";
                if (message.hash != null && $Object.hasOwnProperty.call(message, "hash"))
                    if (!$util.isString(message.hash))
                        return "hash: string expected";
                if (message.chunkIndex != null && $Object.hasOwnProperty.call(message, "chunkIndex"))
                    if (!$util.isInteger(message.chunkIndex))
                        return "chunkIndex: integer expected";
                if (message.totalChunks != null && $Object.hasOwnProperty.call(message, "totalChunks"))
                    if (!$util.isInteger(message.totalChunks) && !(message.totalChunks && $util.isInteger(message.totalChunks.low) && $util.isInteger(message.totalChunks.high)))
                        return "totalChunks: integer|Long expected";
                if (message.chunkSize != null && $Object.hasOwnProperty.call(message, "chunkSize"))
                    if (!$util.isInteger(message.chunkSize) && !(message.chunkSize && $util.isInteger(message.chunkSize.low) && $util.isInteger(message.chunkSize.high)))
                        return "chunkSize: integer|Long expected";
                if (message.size != null && $Object.hasOwnProperty.call(message, "size"))
                    if (!$util.isInteger(message.size) && !(message.size && $util.isInteger(message.size.low) && $util.isInteger(message.size.high)))
                        return "size: integer|Long expected";
                if (message.data != null && $Object.hasOwnProperty.call(message, "data"))
                    if (!$util.isString(message.data))
                        return "data: string expected";
                return null;
            };

            /**
             * Creates a V3BlobChunkMessage message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof fns.v3.V3BlobChunkMessage
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {fns.v3.V3BlobChunkMessage} V3BlobChunkMessage
             */
            V3BlobChunkMessage.fromObject = function (object, _depth) {
                if (object instanceof $root.fns.v3.V3BlobChunkMessage)
                    return object;
                if (!$util.isObject(object))
                    throw $TypeError(".fns.v3.V3BlobChunkMessage: object expected");
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                let message = new $root.fns.v3.V3BlobChunkMessage();
                if (object.vault != null)
                    if (typeof object.vault !== "string" || object.vault.length)
                        message.vault = $String(object.vault);
                if (object.hash != null)
                    if (typeof object.hash !== "string" || object.hash.length)
                        message.hash = $String(object.hash);
                if (object.chunkIndex != null)
                    if ($Number(object.chunkIndex) !== 0)
                        message.chunkIndex = object.chunkIndex >>> 0;
                if (object.totalChunks != null)
                    if (typeof object.totalChunks === "object" ? object.totalChunks.low || object.totalChunks.high : $Number(object.totalChunks) !== 0)
                        if ($util.Long)
                            message.totalChunks = $util.Long.fromValue(object.totalChunks, false);
                        else if (typeof object.totalChunks === "string")
                            message.totalChunks = $parseInt(object.totalChunks, 10);
                        else if (typeof object.totalChunks === "number")
                            message.totalChunks = object.totalChunks;
                        else if (typeof object.totalChunks === "object")
                            message.totalChunks = new $util.LongBits(object.totalChunks.low >>> 0, object.totalChunks.high >>> 0).toNumber();
                if (object.chunkSize != null)
                    if (typeof object.chunkSize === "object" ? object.chunkSize.low || object.chunkSize.high : $Number(object.chunkSize) !== 0)
                        if ($util.Long)
                            message.chunkSize = $util.Long.fromValue(object.chunkSize, false);
                        else if (typeof object.chunkSize === "string")
                            message.chunkSize = $parseInt(object.chunkSize, 10);
                        else if (typeof object.chunkSize === "number")
                            message.chunkSize = object.chunkSize;
                        else if (typeof object.chunkSize === "object")
                            message.chunkSize = new $util.LongBits(object.chunkSize.low >>> 0, object.chunkSize.high >>> 0).toNumber();
                if (object.size != null)
                    if (typeof object.size === "object" ? object.size.low || object.size.high : $Number(object.size) !== 0)
                        if ($util.Long)
                            message.size = $util.Long.fromValue(object.size, false);
                        else if (typeof object.size === "string")
                            message.size = $parseInt(object.size, 10);
                        else if (typeof object.size === "number")
                            message.size = object.size;
                        else if (typeof object.size === "object")
                            message.size = new $util.LongBits(object.size.low >>> 0, object.size.high >>> 0).toNumber();
                if (object.data != null)
                    if (typeof object.data !== "string" || object.data.length)
                        message.data = $String(object.data);
                return message;
            };

            /**
             * Creates a plain object from a V3BlobChunkMessage message. Also converts values to other types if specified.
             * @function toObject
             * @memberof fns.v3.V3BlobChunkMessage
             * @static
             * @param {fns.v3.V3BlobChunkMessage} message V3BlobChunkMessage
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            V3BlobChunkMessage.toObject = function (message, options, _depth) {
                if (!options)
                    options = {};
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                let object = {};
                if (options.defaults) {
                    object.vault = "";
                    object.hash = "";
                    object.chunkIndex = 0;
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, false);
                        object.totalChunks = options.longs === $String ? long.toString() : options.longs === $Number ? long.toNumber() : typeof $BigInt !== "undefined" && options.longs === $BigInt ? long.toBigInt() : long;
                    } else
                        object.totalChunks = options.longs === $String ? "0" : typeof $BigInt !== "undefined" && options.longs === $BigInt ? $BigInt("0") : 0;
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, false);
                        object.chunkSize = options.longs === $String ? long.toString() : options.longs === $Number ? long.toNumber() : typeof $BigInt !== "undefined" && options.longs === $BigInt ? long.toBigInt() : long;
                    } else
                        object.chunkSize = options.longs === $String ? "0" : typeof $BigInt !== "undefined" && options.longs === $BigInt ? $BigInt("0") : 0;
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, false);
                        object.size = options.longs === $String ? long.toString() : options.longs === $Number ? long.toNumber() : typeof $BigInt !== "undefined" && options.longs === $BigInt ? long.toBigInt() : long;
                    } else
                        object.size = options.longs === $String ? "0" : typeof $BigInt !== "undefined" && options.longs === $BigInt ? $BigInt("0") : 0;
                    object.data = "";
                }
                if (message.vault != null && $Object.hasOwnProperty.call(message, "vault"))
                    object.vault = message.vault;
                if (message.hash != null && $Object.hasOwnProperty.call(message, "hash"))
                    object.hash = message.hash;
                if (message.chunkIndex != null && $Object.hasOwnProperty.call(message, "chunkIndex"))
                    object.chunkIndex = message.chunkIndex;
                if (message.totalChunks != null && $Object.hasOwnProperty.call(message, "totalChunks"))
                    if (typeof $BigInt !== "undefined" && options.longs === $BigInt)
                        object.totalChunks = typeof message.totalChunks === "number" ? $BigInt(message.totalChunks) : $util.Long.fromBits(message.totalChunks.low >>> 0, message.totalChunks.high >>> 0, false).toBigInt();
                    else if (typeof message.totalChunks === "number")
                        object.totalChunks = options.longs === $String ? $String(message.totalChunks) : message.totalChunks;
                    else
                        object.totalChunks = options.longs === $String ? $util.Long.prototype.toString.call(message.totalChunks) : options.longs === $Number ? new $util.LongBits(message.totalChunks.low >>> 0, message.totalChunks.high >>> 0).toNumber() : message.totalChunks;
                if (message.chunkSize != null && $Object.hasOwnProperty.call(message, "chunkSize"))
                    if (typeof $BigInt !== "undefined" && options.longs === $BigInt)
                        object.chunkSize = typeof message.chunkSize === "number" ? $BigInt(message.chunkSize) : $util.Long.fromBits(message.chunkSize.low >>> 0, message.chunkSize.high >>> 0, false).toBigInt();
                    else if (typeof message.chunkSize === "number")
                        object.chunkSize = options.longs === $String ? $String(message.chunkSize) : message.chunkSize;
                    else
                        object.chunkSize = options.longs === $String ? $util.Long.prototype.toString.call(message.chunkSize) : options.longs === $Number ? new $util.LongBits(message.chunkSize.low >>> 0, message.chunkSize.high >>> 0).toNumber() : message.chunkSize;
                if (message.size != null && $Object.hasOwnProperty.call(message, "size"))
                    if (typeof $BigInt !== "undefined" && options.longs === $BigInt)
                        object.size = typeof message.size === "number" ? $BigInt(message.size) : $util.Long.fromBits(message.size.low >>> 0, message.size.high >>> 0, false).toBigInt();
                    else if (typeof message.size === "number")
                        object.size = options.longs === $String ? $String(message.size) : message.size;
                    else
                        object.size = options.longs === $String ? $util.Long.prototype.toString.call(message.size) : options.longs === $Number ? new $util.LongBits(message.size.low >>> 0, message.size.high >>> 0).toNumber() : message.size;
                if (message.data != null && $Object.hasOwnProperty.call(message, "data"))
                    object.data = message.data;
                return object;
            };

            /**
             * Converts this V3BlobChunkMessage to JSON.
             * @function toJSON
             * @memberof fns.v3.V3BlobChunkMessage
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            V3BlobChunkMessage.prototype.toJSON = function() {
                return V3BlobChunkMessage.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the type url for V3BlobChunkMessage
             * @function getTypeUrl
             * @memberof fns.v3.V3BlobChunkMessage
             * @static
             * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
             * @returns {string} The type url
             */
            V3BlobChunkMessage.getTypeUrl = function(prefix) {
                if (prefix === $undefined)
                    prefix = "type.googleapis.com";
                return prefix + "/fns.v3.V3BlobChunkMessage";
            };

            return V3BlobChunkMessage;
        })();

        return v3;
    })();

    return fns;
})();

export {
  $root as default
};
