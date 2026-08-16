import * as $protobuf from "protobufjs";
import Long from "long";

/** Namespace fns. */
export namespace fns {

    /** Namespace v3. */
    namespace v3 {

        /**
         * Properties of a WSMessage.
         * @deprecated Use fns.v3.WSMessage.$Properties instead.
         */
        type IWSMessage = fns.v3.WSMessage.$Properties;

        /** Represents a WSMessage. */
        class WSMessage {

            /**
             * Constructs a new WSMessage.
             * @param [properties] Properties to set
             */
            constructor(properties?: fns.v3.WSMessage.$Properties);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];

            /** WSMessage type. */
            type: string;

            /** WSMessage data. */
            data: Uint8Array;

            /**
             * Creates a new WSMessage instance using the specified properties.
             * @param [properties] Properties to set
             * @returns WSMessage instance
             */
            static create(properties: fns.v3.WSMessage.$Shape): fns.v3.WSMessage & fns.v3.WSMessage.$Shape;
            static create(properties?: fns.v3.WSMessage.$Properties): fns.v3.WSMessage;

            /**
             * Encodes the specified WSMessage message. Does not implicitly {@link fns.v3.WSMessage.verify|verify} messages.
             * @param message WSMessage message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encode(message: fns.v3.WSMessage.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified WSMessage message, length delimited. Does not implicitly {@link fns.v3.WSMessage.verify|verify} messages.
             * @param message WSMessage message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encodeDelimited(message: fns.v3.WSMessage.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a WSMessage message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns {fns.v3.WSMessage & fns.v3.WSMessage.$Shape} WSMessage
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): fns.v3.WSMessage & fns.v3.WSMessage.$Shape;

            /**
             * Decodes a WSMessage message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns {fns.v3.WSMessage & fns.v3.WSMessage.$Shape} WSMessage
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): fns.v3.WSMessage & fns.v3.WSMessage.$Shape;

            /**
             * Verifies a WSMessage message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            static verify(message: { [k: string]: unknown }): (string|null);

            /**
             * Creates a WSMessage message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns WSMessage
             */
            static fromObject(object: { [k: string]: unknown }): fns.v3.WSMessage;

            /**
             * Creates a plain object from a WSMessage message. Also converts values to other types if specified.
             * @param message WSMessage
             * @param [options] Conversion options
             * @returns Plain object
             */
            static toObject(message: fns.v3.WSMessage, options?: $protobuf.IConversionOptions): { [k: string]: unknown };

            /**
             * Converts this WSMessage to JSON.
             * @returns JSON object
             */
            toJSON(): { [k: string]: unknown };

            /**
             * Gets the type url for WSMessage
             * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
             * @returns The type url
             */
            static getTypeUrl(prefix?: string): string;
        }

        namespace WSMessage {

            /** Properties of a WSMessage. */
            interface $Properties {

                /** WSMessage type */
                type?: (string|null);

                /** WSMessage data */
                data?: (Uint8Array|null);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];
            }

            /** Shape of a WSMessage. */
            type $Shape = fns.v3.WSMessage.$Properties;
        }

        /**
         * Properties of a WSResponse.
         * @deprecated Use fns.v3.WSResponse.$Properties instead.
         */
        type IWSResponse = fns.v3.WSResponse.$Properties;

        /** Represents a WSResponse. */
        class WSResponse {

            /**
             * Constructs a new WSResponse.
             * @param [properties] Properties to set
             */
            constructor(properties?: fns.v3.WSResponse.$Properties);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];

            /** WSResponse code. */
            code: number;

            /** WSResponse status. */
            status: boolean;

            /** WSResponse message. */
            message: string;

            /** WSResponse data. */
            data: Uint8Array;

            /** WSResponse details. */
            details: string;

            /** WSResponse vault. */
            vault: string;

            /** WSResponse context. */
            context: string;

            /** WSResponse pageIndex. */
            pageIndex: number;

            /**
             * Creates a new WSResponse instance using the specified properties.
             * @param [properties] Properties to set
             * @returns WSResponse instance
             */
            static create(properties: fns.v3.WSResponse.$Shape): fns.v3.WSResponse & fns.v3.WSResponse.$Shape;
            static create(properties?: fns.v3.WSResponse.$Properties): fns.v3.WSResponse;

            /**
             * Encodes the specified WSResponse message. Does not implicitly {@link fns.v3.WSResponse.verify|verify} messages.
             * @param message WSResponse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encode(message: fns.v3.WSResponse.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified WSResponse message, length delimited. Does not implicitly {@link fns.v3.WSResponse.verify|verify} messages.
             * @param message WSResponse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encodeDelimited(message: fns.v3.WSResponse.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a WSResponse message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns {fns.v3.WSResponse & fns.v3.WSResponse.$Shape} WSResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): fns.v3.WSResponse & fns.v3.WSResponse.$Shape;

            /**
             * Decodes a WSResponse message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns {fns.v3.WSResponse & fns.v3.WSResponse.$Shape} WSResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): fns.v3.WSResponse & fns.v3.WSResponse.$Shape;

            /**
             * Verifies a WSResponse message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            static verify(message: { [k: string]: unknown }): (string|null);

            /**
             * Creates a WSResponse message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns WSResponse
             */
            static fromObject(object: { [k: string]: unknown }): fns.v3.WSResponse;

            /**
             * Creates a plain object from a WSResponse message. Also converts values to other types if specified.
             * @param message WSResponse
             * @param [options] Conversion options
             * @returns Plain object
             */
            static toObject(message: fns.v3.WSResponse, options?: $protobuf.IConversionOptions): { [k: string]: unknown };

            /**
             * Converts this WSResponse to JSON.
             * @returns JSON object
             */
            toJSON(): { [k: string]: unknown };

            /**
             * Gets the type url for WSResponse
             * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
             * @returns The type url
             */
            static getTypeUrl(prefix?: string): string;
        }

        namespace WSResponse {

            /** Properties of a WSResponse. */
            interface $Properties {

                /** WSResponse code */
                code?: (number|null);

                /** WSResponse status */
                status?: (boolean|null);

                /** WSResponse message */
                message?: (string|null);

                /** WSResponse data */
                data?: (Uint8Array|null);

                /** WSResponse details */
                details?: (string|null);

                /** WSResponse vault */
                vault?: (string|null);

                /** WSResponse context */
                context?: (string|null);

                /** WSResponse pageIndex */
                pageIndex?: (number|null);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];
            }

            /** Shape of a WSResponse. */
            type $Shape = fns.v3.WSResponse.$Properties;
        }

        /**
         * Properties of a ClientInfoMessage.
         * @deprecated Use fns.v3.ClientInfoMessage.$Properties instead.
         */
        type IClientInfoMessage = fns.v3.ClientInfoMessage.$Properties;

        /** Represents a ClientInfoMessage. */
        class ClientInfoMessage {

            /**
             * Constructs a new ClientInfoMessage.
             * @param [properties] Properties to set
             */
            constructor(properties?: fns.v3.ClientInfoMessage.$Properties);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];

            /** ClientInfoMessage name. */
            name: string;

            /** ClientInfoMessage version. */
            version: string;

            /** ClientInfoMessage type. */
            type: string;

            /** ClientInfoMessage isDesktop. */
            isDesktop: boolean;

            /** ClientInfoMessage isMobile. */
            isMobile: boolean;

            /** ClientInfoMessage isPhone. */
            isPhone: boolean;

            /** ClientInfoMessage isTablet. */
            isTablet: boolean;

            /** ClientInfoMessage isMacOs. */
            isMacOs: boolean;

            /** ClientInfoMessage isWin. */
            isWin: boolean;

            /** ClientInfoMessage isLinux. */
            isLinux: boolean;

            /** ClientInfoMessage offlineSyncStrategy. */
            offlineSyncStrategy: string;

            /** ClientInfoMessage protobuf. */
            protobuf: boolean;

            /**
             * Creates a new ClientInfoMessage instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ClientInfoMessage instance
             */
            static create(properties: fns.v3.ClientInfoMessage.$Shape): fns.v3.ClientInfoMessage & fns.v3.ClientInfoMessage.$Shape;
            static create(properties?: fns.v3.ClientInfoMessage.$Properties): fns.v3.ClientInfoMessage;

            /**
             * Encodes the specified ClientInfoMessage message. Does not implicitly {@link fns.v3.ClientInfoMessage.verify|verify} messages.
             * @param message ClientInfoMessage message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encode(message: fns.v3.ClientInfoMessage.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ClientInfoMessage message, length delimited. Does not implicitly {@link fns.v3.ClientInfoMessage.verify|verify} messages.
             * @param message ClientInfoMessage message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encodeDelimited(message: fns.v3.ClientInfoMessage.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ClientInfoMessage message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns {fns.v3.ClientInfoMessage & fns.v3.ClientInfoMessage.$Shape} ClientInfoMessage
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): fns.v3.ClientInfoMessage & fns.v3.ClientInfoMessage.$Shape;

            /**
             * Decodes a ClientInfoMessage message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns {fns.v3.ClientInfoMessage & fns.v3.ClientInfoMessage.$Shape} ClientInfoMessage
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): fns.v3.ClientInfoMessage & fns.v3.ClientInfoMessage.$Shape;

            /**
             * Verifies a ClientInfoMessage message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            static verify(message: { [k: string]: unknown }): (string|null);

            /**
             * Creates a ClientInfoMessage message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ClientInfoMessage
             */
            static fromObject(object: { [k: string]: unknown }): fns.v3.ClientInfoMessage;

            /**
             * Creates a plain object from a ClientInfoMessage message. Also converts values to other types if specified.
             * @param message ClientInfoMessage
             * @param [options] Conversion options
             * @returns Plain object
             */
            static toObject(message: fns.v3.ClientInfoMessage, options?: $protobuf.IConversionOptions): { [k: string]: unknown };

            /**
             * Converts this ClientInfoMessage to JSON.
             * @returns JSON object
             */
            toJSON(): { [k: string]: unknown };

            /**
             * Gets the type url for ClientInfoMessage
             * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
             * @returns The type url
             */
            static getTypeUrl(prefix?: string): string;
        }

        namespace ClientInfoMessage {

            /** Properties of a ClientInfoMessage. */
            interface $Properties {

                /** ClientInfoMessage name */
                name?: (string|null);

                /** ClientInfoMessage version */
                version?: (string|null);

                /** ClientInfoMessage type */
                type?: (string|null);

                /** ClientInfoMessage isDesktop */
                isDesktop?: (boolean|null);

                /** ClientInfoMessage isMobile */
                isMobile?: (boolean|null);

                /** ClientInfoMessage isPhone */
                isPhone?: (boolean|null);

                /** ClientInfoMessage isTablet */
                isTablet?: (boolean|null);

                /** ClientInfoMessage isMacOs */
                isMacOs?: (boolean|null);

                /** ClientInfoMessage isWin */
                isWin?: (boolean|null);

                /** ClientInfoMessage isLinux */
                isLinux?: (boolean|null);

                /** ClientInfoMessage offlineSyncStrategy */
                offlineSyncStrategy?: (string|null);

                /** ClientInfoMessage protobuf */
                protobuf?: (boolean|null);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];
            }

            /** Shape of a ClientInfoMessage. */
            type $Shape = fns.v3.ClientInfoMessage.$Properties;
        }

        /**
         * Properties of a ManifestItem.
         * @deprecated Use fns.v3.ManifestItem.$Properties instead.
         */
        type IManifestItem = fns.v3.ManifestItem.$Properties;

        /** Represents a ManifestItem. */
        class ManifestItem {

            /**
             * Constructs a new ManifestItem.
             * @param [properties] Properties to set
             */
            constructor(properties?: fns.v3.ManifestItem.$Properties);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];

            /** ManifestItem id. */
            id: string;

            /** ManifestItem path. */
            path: string;

            /** ManifestItem hash. */
            hash: string;

            /** ManifestItem isNote. */
            isNote: boolean;

            /** ManifestItem size. */
            size: (number|Long);

            /** ManifestItem mtime. */
            mtime: (number|Long);

            /** ManifestItem ctime. */
            ctime: (number|Long);

            /**
             * Creates a new ManifestItem instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ManifestItem instance
             */
            static create(properties: fns.v3.ManifestItem.$Shape): fns.v3.ManifestItem & fns.v3.ManifestItem.$Shape;
            static create(properties?: fns.v3.ManifestItem.$Properties): fns.v3.ManifestItem;

            /**
             * Encodes the specified ManifestItem message. Does not implicitly {@link fns.v3.ManifestItem.verify|verify} messages.
             * @param message ManifestItem message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encode(message: fns.v3.ManifestItem.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ManifestItem message, length delimited. Does not implicitly {@link fns.v3.ManifestItem.verify|verify} messages.
             * @param message ManifestItem message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encodeDelimited(message: fns.v3.ManifestItem.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ManifestItem message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns {fns.v3.ManifestItem & fns.v3.ManifestItem.$Shape} ManifestItem
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): fns.v3.ManifestItem & fns.v3.ManifestItem.$Shape;

            /**
             * Decodes a ManifestItem message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns {fns.v3.ManifestItem & fns.v3.ManifestItem.$Shape} ManifestItem
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): fns.v3.ManifestItem & fns.v3.ManifestItem.$Shape;

            /**
             * Verifies a ManifestItem message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            static verify(message: { [k: string]: unknown }): (string|null);

            /**
             * Creates a ManifestItem message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ManifestItem
             */
            static fromObject(object: { [k: string]: unknown }): fns.v3.ManifestItem;

            /**
             * Creates a plain object from a ManifestItem message. Also converts values to other types if specified.
             * @param message ManifestItem
             * @param [options] Conversion options
             * @returns Plain object
             */
            static toObject(message: fns.v3.ManifestItem, options?: $protobuf.IConversionOptions): { [k: string]: unknown };

            /**
             * Converts this ManifestItem to JSON.
             * @returns JSON object
             */
            toJSON(): { [k: string]: unknown };

            /**
             * Gets the type url for ManifestItem
             * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
             * @returns The type url
             */
            static getTypeUrl(prefix?: string): string;
        }

        namespace ManifestItem {

            /** Properties of a ManifestItem. */
            interface $Properties {

                /** ManifestItem id */
                id?: (string|null);

                /** ManifestItem path */
                path?: (string|null);

                /** ManifestItem hash */
                hash?: (string|null);

                /** ManifestItem isNote */
                isNote?: (boolean|null);

                /** ManifestItem size */
                size?: (number|Long|null);

                /** ManifestItem mtime */
                mtime?: (number|Long|null);

                /** ManifestItem ctime */
                ctime?: (number|Long|null);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];
            }

            /** Shape of a ManifestItem. */
            type $Shape = fns.v3.ManifestItem.$Properties;
        }

        /**
         * Properties of a Tombstone.
         * @deprecated Use fns.v3.Tombstone.$Properties instead.
         */
        type ITombstone = fns.v3.Tombstone.$Properties;

        /** Represents a Tombstone. */
        class Tombstone {

            /**
             * Constructs a new Tombstone.
             * @param [properties] Properties to set
             */
            constructor(properties?: fns.v3.Tombstone.$Properties);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];

            /** Tombstone path. */
            path: string;

            /** Tombstone id. */
            id: string;

            /**
             * Creates a new Tombstone instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Tombstone instance
             */
            static create(properties: fns.v3.Tombstone.$Shape): fns.v3.Tombstone & fns.v3.Tombstone.$Shape;
            static create(properties?: fns.v3.Tombstone.$Properties): fns.v3.Tombstone;

            /**
             * Encodes the specified Tombstone message. Does not implicitly {@link fns.v3.Tombstone.verify|verify} messages.
             * @param message Tombstone message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encode(message: fns.v3.Tombstone.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Tombstone message, length delimited. Does not implicitly {@link fns.v3.Tombstone.verify|verify} messages.
             * @param message Tombstone message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encodeDelimited(message: fns.v3.Tombstone.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Tombstone message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns {fns.v3.Tombstone & fns.v3.Tombstone.$Shape} Tombstone
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): fns.v3.Tombstone & fns.v3.Tombstone.$Shape;

            /**
             * Decodes a Tombstone message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns {fns.v3.Tombstone & fns.v3.Tombstone.$Shape} Tombstone
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): fns.v3.Tombstone & fns.v3.Tombstone.$Shape;

            /**
             * Verifies a Tombstone message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            static verify(message: { [k: string]: unknown }): (string|null);

            /**
             * Creates a Tombstone message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Tombstone
             */
            static fromObject(object: { [k: string]: unknown }): fns.v3.Tombstone;

            /**
             * Creates a plain object from a Tombstone message. Also converts values to other types if specified.
             * @param message Tombstone
             * @param [options] Conversion options
             * @returns Plain object
             */
            static toObject(message: fns.v3.Tombstone, options?: $protobuf.IConversionOptions): { [k: string]: unknown };

            /**
             * Converts this Tombstone to JSON.
             * @returns JSON object
             */
            toJSON(): { [k: string]: unknown };

            /**
             * Gets the type url for Tombstone
             * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
             * @returns The type url
             */
            static getTypeUrl(prefix?: string): string;
        }

        namespace Tombstone {

            /** Properties of a Tombstone. */
            interface $Properties {

                /** Tombstone path */
                path?: (string|null);

                /** Tombstone id */
                id?: (string|null);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];
            }

            /** Shape of a Tombstone. */
            type $Shape = fns.v3.Tombstone.$Properties;
        }

        /**
         * Properties of a Scope.
         * @deprecated Use fns.v3.Scope.$Properties instead.
         */
        type IScope = fns.v3.Scope.$Properties;

        /** Represents a Scope. */
        class Scope {

            /**
             * Constructs a new Scope.
             * @param [properties] Properties to set
             */
            constructor(properties?: fns.v3.Scope.$Properties);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];

            /** Scope include. */
            include: string[];

            /** Scope exclude. */
            exclude: string[];

            /** Scope types. */
            types: string[];

            /**
             * Creates a new Scope instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Scope instance
             */
            static create(properties: fns.v3.Scope.$Shape): fns.v3.Scope & fns.v3.Scope.$Shape;
            static create(properties?: fns.v3.Scope.$Properties): fns.v3.Scope;

            /**
             * Encodes the specified Scope message. Does not implicitly {@link fns.v3.Scope.verify|verify} messages.
             * @param message Scope message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encode(message: fns.v3.Scope.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Scope message, length delimited. Does not implicitly {@link fns.v3.Scope.verify|verify} messages.
             * @param message Scope message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encodeDelimited(message: fns.v3.Scope.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Scope message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns {fns.v3.Scope & fns.v3.Scope.$Shape} Scope
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): fns.v3.Scope & fns.v3.Scope.$Shape;

            /**
             * Decodes a Scope message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns {fns.v3.Scope & fns.v3.Scope.$Shape} Scope
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): fns.v3.Scope & fns.v3.Scope.$Shape;

            /**
             * Verifies a Scope message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            static verify(message: { [k: string]: unknown }): (string|null);

            /**
             * Creates a Scope message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Scope
             */
            static fromObject(object: { [k: string]: unknown }): fns.v3.Scope;

            /**
             * Creates a plain object from a Scope message. Also converts values to other types if specified.
             * @param message Scope
             * @param [options] Conversion options
             * @returns Plain object
             */
            static toObject(message: fns.v3.Scope, options?: $protobuf.IConversionOptions): { [k: string]: unknown };

            /**
             * Converts this Scope to JSON.
             * @returns JSON object
             */
            toJSON(): { [k: string]: unknown };

            /**
             * Gets the type url for Scope
             * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
             * @returns The type url
             */
            static getTypeUrl(prefix?: string): string;
        }

        namespace Scope {

            /** Properties of a Scope. */
            interface $Properties {

                /** Scope include */
                include?: (string[]|null);

                /** Scope exclude */
                exclude?: (string[]|null);

                /** Scope types */
                types?: (string[]|null);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];
            }

            /** Shape of a Scope. */
            type $Shape = fns.v3.Scope.$Properties;
        }

        /**
         * Properties of an Op.
         * @deprecated Use fns.v3.Op.$Properties instead.
         */
        type IOp = fns.v3.Op.$Properties;

        /** Represents an Op. */
        class Op {

            /**
             * Constructs a new Op.
             * @param [properties] Properties to set
             */
            constructor(properties?: fns.v3.Op.$Properties);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];

            /** Op op. */
            op: string;

            /** Op item. */
            item?: (fns.v3.ManifestItem.$Properties|null);

            /** Op from. */
            from: string;

            /**
             * Creates a new Op instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Op instance
             */
            static create(properties: fns.v3.Op.$Shape): fns.v3.Op & fns.v3.Op.$Shape;
            static create(properties?: fns.v3.Op.$Properties): fns.v3.Op;

            /**
             * Encodes the specified Op message. Does not implicitly {@link fns.v3.Op.verify|verify} messages.
             * @param message Op message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encode(message: fns.v3.Op.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Op message, length delimited. Does not implicitly {@link fns.v3.Op.verify|verify} messages.
             * @param message Op message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encodeDelimited(message: fns.v3.Op.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an Op message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns {fns.v3.Op & fns.v3.Op.$Shape} Op
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): fns.v3.Op & fns.v3.Op.$Shape;

            /**
             * Decodes an Op message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns {fns.v3.Op & fns.v3.Op.$Shape} Op
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): fns.v3.Op & fns.v3.Op.$Shape;

            /**
             * Verifies an Op message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            static verify(message: { [k: string]: unknown }): (string|null);

            /**
             * Creates an Op message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Op
             */
            static fromObject(object: { [k: string]: unknown }): fns.v3.Op;

            /**
             * Creates a plain object from an Op message. Also converts values to other types if specified.
             * @param message Op
             * @param [options] Conversion options
             * @returns Plain object
             */
            static toObject(message: fns.v3.Op, options?: $protobuf.IConversionOptions): { [k: string]: unknown };

            /**
             * Converts this Op to JSON.
             * @returns JSON object
             */
            toJSON(): { [k: string]: unknown };

            /**
             * Gets the type url for Op
             * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
             * @returns The type url
             */
            static getTypeUrl(prefix?: string): string;
        }

        namespace Op {

            /** Properties of an Op. */
            interface $Properties {

                /** Op op */
                op?: (string|null);

                /** Op item */
                item?: (fns.v3.ManifestItem.$Properties|null);

                /** Op from */
                from?: (string|null);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];
            }

            /** Shape of an Op. */
            type $Shape = fns.v3.Op.$Properties;
        }

        /**
         * Properties of a Conflict.
         * @deprecated Use fns.v3.Conflict.$Properties instead.
         */
        type IConflict = fns.v3.Conflict.$Properties;

        /** Represents a Conflict. */
        class Conflict {

            /**
             * Constructs a new Conflict.
             * @param [properties] Properties to set
             */
            constructor(properties?: fns.v3.Conflict.$Properties);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];

            /** Conflict path. */
            path: string;

            /** Conflict kind. */
            kind: string;

            /** Conflict id. */
            id: string;

            /** Conflict baseHash. */
            baseHash: string;

            /** Conflict serverHash. */
            serverHash: string;

            /** Conflict serverMtime. */
            serverMtime: (number|Long);

            /** Conflict localHash. */
            localHash: string;

            /** Conflict isNote. */
            isNote: boolean;

            /**
             * Creates a new Conflict instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Conflict instance
             */
            static create(properties: fns.v3.Conflict.$Shape): fns.v3.Conflict & fns.v3.Conflict.$Shape;
            static create(properties?: fns.v3.Conflict.$Properties): fns.v3.Conflict;

            /**
             * Encodes the specified Conflict message. Does not implicitly {@link fns.v3.Conflict.verify|verify} messages.
             * @param message Conflict message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encode(message: fns.v3.Conflict.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Conflict message, length delimited. Does not implicitly {@link fns.v3.Conflict.verify|verify} messages.
             * @param message Conflict message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encodeDelimited(message: fns.v3.Conflict.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Conflict message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns {fns.v3.Conflict & fns.v3.Conflict.$Shape} Conflict
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): fns.v3.Conflict & fns.v3.Conflict.$Shape;

            /**
             * Decodes a Conflict message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns {fns.v3.Conflict & fns.v3.Conflict.$Shape} Conflict
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): fns.v3.Conflict & fns.v3.Conflict.$Shape;

            /**
             * Verifies a Conflict message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            static verify(message: { [k: string]: unknown }): (string|null);

            /**
             * Creates a Conflict message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Conflict
             */
            static fromObject(object: { [k: string]: unknown }): fns.v3.Conflict;

            /**
             * Creates a plain object from a Conflict message. Also converts values to other types if specified.
             * @param message Conflict
             * @param [options] Conversion options
             * @returns Plain object
             */
            static toObject(message: fns.v3.Conflict, options?: $protobuf.IConversionOptions): { [k: string]: unknown };

            /**
             * Converts this Conflict to JSON.
             * @returns JSON object
             */
            toJSON(): { [k: string]: unknown };

            /**
             * Gets the type url for Conflict
             * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
             * @returns The type url
             */
            static getTypeUrl(prefix?: string): string;
        }

        namespace Conflict {

            /** Properties of a Conflict. */
            interface $Properties {

                /** Conflict path */
                path?: (string|null);

                /** Conflict kind */
                kind?: (string|null);

                /** Conflict id */
                id?: (string|null);

                /** Conflict baseHash */
                baseHash?: (string|null);

                /** Conflict serverHash */
                serverHash?: (string|null);

                /** Conflict serverMtime */
                serverMtime?: (number|Long|null);

                /** Conflict localHash */
                localHash?: (string|null);

                /** Conflict isNote */
                isNote?: (boolean|null);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];
            }

            /** Shape of a Conflict. */
            type $Shape = fns.v3.Conflict.$Properties;
        }

        /**
         * Properties of a Change.
         * @deprecated Use fns.v3.Change.$Properties instead.
         */
        type IChange = fns.v3.Change.$Properties;

        /** Represents a Change. */
        class Change {

            /**
             * Constructs a new Change.
             * @param [properties] Properties to set
             */
            constructor(properties?: fns.v3.Change.$Properties);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];

            /** Change op. */
            op: string;

            /** Change oldPath. */
            oldPath: string;

            /** Change item. */
            item?: (fns.v3.ManifestItem.$Properties|null);

            /**
             * Creates a new Change instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Change instance
             */
            static create(properties: fns.v3.Change.$Shape): fns.v3.Change & fns.v3.Change.$Shape;
            static create(properties?: fns.v3.Change.$Properties): fns.v3.Change;

            /**
             * Encodes the specified Change message. Does not implicitly {@link fns.v3.Change.verify|verify} messages.
             * @param message Change message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encode(message: fns.v3.Change.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Change message, length delimited. Does not implicitly {@link fns.v3.Change.verify|verify} messages.
             * @param message Change message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encodeDelimited(message: fns.v3.Change.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Change message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns {fns.v3.Change & fns.v3.Change.$Shape} Change
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): fns.v3.Change & fns.v3.Change.$Shape;

            /**
             * Decodes a Change message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns {fns.v3.Change & fns.v3.Change.$Shape} Change
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): fns.v3.Change & fns.v3.Change.$Shape;

            /**
             * Verifies a Change message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            static verify(message: { [k: string]: unknown }): (string|null);

            /**
             * Creates a Change message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Change
             */
            static fromObject(object: { [k: string]: unknown }): fns.v3.Change;

            /**
             * Creates a plain object from a Change message. Also converts values to other types if specified.
             * @param message Change
             * @param [options] Conversion options
             * @returns Plain object
             */
            static toObject(message: fns.v3.Change, options?: $protobuf.IConversionOptions): { [k: string]: unknown };

            /**
             * Converts this Change to JSON.
             * @returns JSON object
             */
            toJSON(): { [k: string]: unknown };

            /**
             * Gets the type url for Change
             * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
             * @returns The type url
             */
            static getTypeUrl(prefix?: string): string;
        }

        namespace Change {

            /** Properties of a Change. */
            interface $Properties {

                /** Change op */
                op?: (string|null);

                /** Change oldPath */
                oldPath?: (string|null);

                /** Change item */
                item?: (fns.v3.ManifestItem.$Properties|null);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];
            }

            /** Shape of a Change. */
            type $Shape = fns.v3.Change.$Properties;
        }

        /**
         * Properties of a V3SyncRequest.
         * @deprecated Use fns.v3.V3SyncRequest.$Properties instead.
         */
        type IV3SyncRequest = fns.v3.V3SyncRequest.$Properties;

        /** Represents a V3SyncRequest. */
        class V3SyncRequest {

            /**
             * Constructs a new V3SyncRequest.
             * @param [properties] Properties to set
             */
            constructor(properties?: fns.v3.V3SyncRequest.$Properties);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];

            /** V3SyncRequest vault. */
            vault: string;

            /** V3SyncRequest baseEpoch. */
            baseEpoch: (number|Long);

            /** V3SyncRequest manifest. */
            manifest: fns.v3.ManifestItem.$Properties[];

            /** V3SyncRequest tombstones. */
            tombstones: fns.v3.Tombstone.$Properties[];

            /** V3SyncRequest scope. */
            scope?: (fns.v3.Scope.$Properties|null);

            /**
             * Creates a new V3SyncRequest instance using the specified properties.
             * @param [properties] Properties to set
             * @returns V3SyncRequest instance
             */
            static create(properties: fns.v3.V3SyncRequest.$Shape): fns.v3.V3SyncRequest & fns.v3.V3SyncRequest.$Shape;
            static create(properties?: fns.v3.V3SyncRequest.$Properties): fns.v3.V3SyncRequest;

            /**
             * Encodes the specified V3SyncRequest message. Does not implicitly {@link fns.v3.V3SyncRequest.verify|verify} messages.
             * @param message V3SyncRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encode(message: fns.v3.V3SyncRequest.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified V3SyncRequest message, length delimited. Does not implicitly {@link fns.v3.V3SyncRequest.verify|verify} messages.
             * @param message V3SyncRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encodeDelimited(message: fns.v3.V3SyncRequest.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a V3SyncRequest message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns {fns.v3.V3SyncRequest & fns.v3.V3SyncRequest.$Shape} V3SyncRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): fns.v3.V3SyncRequest & fns.v3.V3SyncRequest.$Shape;

            /**
             * Decodes a V3SyncRequest message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns {fns.v3.V3SyncRequest & fns.v3.V3SyncRequest.$Shape} V3SyncRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): fns.v3.V3SyncRequest & fns.v3.V3SyncRequest.$Shape;

            /**
             * Verifies a V3SyncRequest message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            static verify(message: { [k: string]: unknown }): (string|null);

            /**
             * Creates a V3SyncRequest message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns V3SyncRequest
             */
            static fromObject(object: { [k: string]: unknown }): fns.v3.V3SyncRequest;

            /**
             * Creates a plain object from a V3SyncRequest message. Also converts values to other types if specified.
             * @param message V3SyncRequest
             * @param [options] Conversion options
             * @returns Plain object
             */
            static toObject(message: fns.v3.V3SyncRequest, options?: $protobuf.IConversionOptions): { [k: string]: unknown };

            /**
             * Converts this V3SyncRequest to JSON.
             * @returns JSON object
             */
            toJSON(): { [k: string]: unknown };

            /**
             * Gets the type url for V3SyncRequest
             * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
             * @returns The type url
             */
            static getTypeUrl(prefix?: string): string;
        }

        namespace V3SyncRequest {

            /** Properties of a V3SyncRequest. */
            interface $Properties {

                /** V3SyncRequest vault */
                vault?: (string|null);

                /** V3SyncRequest baseEpoch */
                baseEpoch?: (number|Long|null);

                /** V3SyncRequest manifest */
                manifest?: (fns.v3.ManifestItem.$Properties[]|null);

                /** V3SyncRequest tombstones */
                tombstones?: (fns.v3.Tombstone.$Properties[]|null);

                /** V3SyncRequest scope */
                scope?: (fns.v3.Scope.$Properties|null);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];
            }

            /** Shape of a V3SyncRequest. */
            type $Shape = fns.v3.V3SyncRequest.$Properties;
        }

        /**
         * Properties of a V3SyncPlanMessage.
         * @deprecated Use fns.v3.V3SyncPlanMessage.$Properties instead.
         */
        type IV3SyncPlanMessage = fns.v3.V3SyncPlanMessage.$Properties;

        /** Represents a V3SyncPlanMessage. */
        class V3SyncPlanMessage {

            /**
             * Constructs a new V3SyncPlanMessage.
             * @param [properties] Properties to set
             */
            constructor(properties?: fns.v3.V3SyncPlanMessage.$Properties);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];

            /** V3SyncPlanMessage vault. */
            vault: string;

            /** V3SyncPlanMessage serverEpoch. */
            serverEpoch: (number|Long);

            /** V3SyncPlanMessage baseEpoch. */
            baseEpoch: (number|Long);

            /** V3SyncPlanMessage ops. */
            ops: fns.v3.Op.$Properties[];

            /** V3SyncPlanMessage conflicts. */
            conflicts: fns.v3.Conflict.$Properties[];

            /** V3SyncPlanMessage expected. */
            expected: fns.v3.Change.$Properties[];

            /**
             * Creates a new V3SyncPlanMessage instance using the specified properties.
             * @param [properties] Properties to set
             * @returns V3SyncPlanMessage instance
             */
            static create(properties: fns.v3.V3SyncPlanMessage.$Shape): fns.v3.V3SyncPlanMessage & fns.v3.V3SyncPlanMessage.$Shape;
            static create(properties?: fns.v3.V3SyncPlanMessage.$Properties): fns.v3.V3SyncPlanMessage;

            /**
             * Encodes the specified V3SyncPlanMessage message. Does not implicitly {@link fns.v3.V3SyncPlanMessage.verify|verify} messages.
             * @param message V3SyncPlanMessage message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encode(message: fns.v3.V3SyncPlanMessage.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified V3SyncPlanMessage message, length delimited. Does not implicitly {@link fns.v3.V3SyncPlanMessage.verify|verify} messages.
             * @param message V3SyncPlanMessage message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encodeDelimited(message: fns.v3.V3SyncPlanMessage.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a V3SyncPlanMessage message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns {fns.v3.V3SyncPlanMessage & fns.v3.V3SyncPlanMessage.$Shape} V3SyncPlanMessage
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): fns.v3.V3SyncPlanMessage & fns.v3.V3SyncPlanMessage.$Shape;

            /**
             * Decodes a V3SyncPlanMessage message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns {fns.v3.V3SyncPlanMessage & fns.v3.V3SyncPlanMessage.$Shape} V3SyncPlanMessage
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): fns.v3.V3SyncPlanMessage & fns.v3.V3SyncPlanMessage.$Shape;

            /**
             * Verifies a V3SyncPlanMessage message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            static verify(message: { [k: string]: unknown }): (string|null);

            /**
             * Creates a V3SyncPlanMessage message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns V3SyncPlanMessage
             */
            static fromObject(object: { [k: string]: unknown }): fns.v3.V3SyncPlanMessage;

            /**
             * Creates a plain object from a V3SyncPlanMessage message. Also converts values to other types if specified.
             * @param message V3SyncPlanMessage
             * @param [options] Conversion options
             * @returns Plain object
             */
            static toObject(message: fns.v3.V3SyncPlanMessage, options?: $protobuf.IConversionOptions): { [k: string]: unknown };

            /**
             * Converts this V3SyncPlanMessage to JSON.
             * @returns JSON object
             */
            toJSON(): { [k: string]: unknown };

            /**
             * Gets the type url for V3SyncPlanMessage
             * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
             * @returns The type url
             */
            static getTypeUrl(prefix?: string): string;
        }

        namespace V3SyncPlanMessage {

            /** Properties of a V3SyncPlanMessage. */
            interface $Properties {

                /** V3SyncPlanMessage vault */
                vault?: (string|null);

                /** V3SyncPlanMessage serverEpoch */
                serverEpoch?: (number|Long|null);

                /** V3SyncPlanMessage baseEpoch */
                baseEpoch?: (number|Long|null);

                /** V3SyncPlanMessage ops */
                ops?: (fns.v3.Op.$Properties[]|null);

                /** V3SyncPlanMessage conflicts */
                conflicts?: (fns.v3.Conflict.$Properties[]|null);

                /** V3SyncPlanMessage expected */
                expected?: (fns.v3.Change.$Properties[]|null);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];
            }

            /** Shape of a V3SyncPlanMessage. */
            type $Shape = fns.v3.V3SyncPlanMessage.$Properties;
        }

        /**
         * Properties of a V3BlobNeedMessage.
         * @deprecated Use fns.v3.V3BlobNeedMessage.$Properties instead.
         */
        type IV3BlobNeedMessage = fns.v3.V3BlobNeedMessage.$Properties;

        /** Represents a V3BlobNeedMessage. */
        class V3BlobNeedMessage {

            /**
             * Constructs a new V3BlobNeedMessage.
             * @param [properties] Properties to set
             */
            constructor(properties?: fns.v3.V3BlobNeedMessage.$Properties);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];

            /** V3BlobNeedMessage vault. */
            vault: string;

            /** V3BlobNeedMessage path. */
            path: string;

            /** V3BlobNeedMessage hash. */
            hash: string;

            /** V3BlobNeedMessage size. */
            size: (number|Long);

            /**
             * Creates a new V3BlobNeedMessage instance using the specified properties.
             * @param [properties] Properties to set
             * @returns V3BlobNeedMessage instance
             */
            static create(properties: fns.v3.V3BlobNeedMessage.$Shape): fns.v3.V3BlobNeedMessage & fns.v3.V3BlobNeedMessage.$Shape;
            static create(properties?: fns.v3.V3BlobNeedMessage.$Properties): fns.v3.V3BlobNeedMessage;

            /**
             * Encodes the specified V3BlobNeedMessage message. Does not implicitly {@link fns.v3.V3BlobNeedMessage.verify|verify} messages.
             * @param message V3BlobNeedMessage message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encode(message: fns.v3.V3BlobNeedMessage.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified V3BlobNeedMessage message, length delimited. Does not implicitly {@link fns.v3.V3BlobNeedMessage.verify|verify} messages.
             * @param message V3BlobNeedMessage message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encodeDelimited(message: fns.v3.V3BlobNeedMessage.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a V3BlobNeedMessage message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns {fns.v3.V3BlobNeedMessage & fns.v3.V3BlobNeedMessage.$Shape} V3BlobNeedMessage
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): fns.v3.V3BlobNeedMessage & fns.v3.V3BlobNeedMessage.$Shape;

            /**
             * Decodes a V3BlobNeedMessage message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns {fns.v3.V3BlobNeedMessage & fns.v3.V3BlobNeedMessage.$Shape} V3BlobNeedMessage
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): fns.v3.V3BlobNeedMessage & fns.v3.V3BlobNeedMessage.$Shape;

            /**
             * Verifies a V3BlobNeedMessage message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            static verify(message: { [k: string]: unknown }): (string|null);

            /**
             * Creates a V3BlobNeedMessage message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns V3BlobNeedMessage
             */
            static fromObject(object: { [k: string]: unknown }): fns.v3.V3BlobNeedMessage;

            /**
             * Creates a plain object from a V3BlobNeedMessage message. Also converts values to other types if specified.
             * @param message V3BlobNeedMessage
             * @param [options] Conversion options
             * @returns Plain object
             */
            static toObject(message: fns.v3.V3BlobNeedMessage, options?: $protobuf.IConversionOptions): { [k: string]: unknown };

            /**
             * Converts this V3BlobNeedMessage to JSON.
             * @returns JSON object
             */
            toJSON(): { [k: string]: unknown };

            /**
             * Gets the type url for V3BlobNeedMessage
             * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
             * @returns The type url
             */
            static getTypeUrl(prefix?: string): string;
        }

        namespace V3BlobNeedMessage {

            /** Properties of a V3BlobNeedMessage. */
            interface $Properties {

                /** V3BlobNeedMessage vault */
                vault?: (string|null);

                /** V3BlobNeedMessage path */
                path?: (string|null);

                /** V3BlobNeedMessage hash */
                hash?: (string|null);

                /** V3BlobNeedMessage size */
                size?: (number|Long|null);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];
            }

            /** Shape of a V3BlobNeedMessage. */
            type $Shape = fns.v3.V3BlobNeedMessage.$Properties;
        }

        /**
         * Properties of a V3BlobPageMessage.
         * @deprecated Use fns.v3.V3BlobPageMessage.$Properties instead.
         */
        type IV3BlobPageMessage = fns.v3.V3BlobPageMessage.$Properties;

        /** Represents a V3BlobPageMessage. */
        class V3BlobPageMessage {

            /**
             * Constructs a new V3BlobPageMessage.
             * @param [properties] Properties to set
             */
            constructor(properties?: fns.v3.V3BlobPageMessage.$Properties);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];

            /** V3BlobPageMessage vault. */
            vault: string;

            /** V3BlobPageMessage path. */
            path: string;

            /** V3BlobPageMessage hash. */
            hash: string;

            /** V3BlobPageMessage size. */
            size: (number|Long);

            /** V3BlobPageMessage isNote. */
            isNote: boolean;

            /** V3BlobPageMessage content. */
            content: string;

            /**
             * Creates a new V3BlobPageMessage instance using the specified properties.
             * @param [properties] Properties to set
             * @returns V3BlobPageMessage instance
             */
            static create(properties: fns.v3.V3BlobPageMessage.$Shape): fns.v3.V3BlobPageMessage & fns.v3.V3BlobPageMessage.$Shape;
            static create(properties?: fns.v3.V3BlobPageMessage.$Properties): fns.v3.V3BlobPageMessage;

            /**
             * Encodes the specified V3BlobPageMessage message. Does not implicitly {@link fns.v3.V3BlobPageMessage.verify|verify} messages.
             * @param message V3BlobPageMessage message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encode(message: fns.v3.V3BlobPageMessage.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified V3BlobPageMessage message, length delimited. Does not implicitly {@link fns.v3.V3BlobPageMessage.verify|verify} messages.
             * @param message V3BlobPageMessage message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encodeDelimited(message: fns.v3.V3BlobPageMessage.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a V3BlobPageMessage message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns {fns.v3.V3BlobPageMessage & fns.v3.V3BlobPageMessage.$Shape} V3BlobPageMessage
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): fns.v3.V3BlobPageMessage & fns.v3.V3BlobPageMessage.$Shape;

            /**
             * Decodes a V3BlobPageMessage message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns {fns.v3.V3BlobPageMessage & fns.v3.V3BlobPageMessage.$Shape} V3BlobPageMessage
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): fns.v3.V3BlobPageMessage & fns.v3.V3BlobPageMessage.$Shape;

            /**
             * Verifies a V3BlobPageMessage message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            static verify(message: { [k: string]: unknown }): (string|null);

            /**
             * Creates a V3BlobPageMessage message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns V3BlobPageMessage
             */
            static fromObject(object: { [k: string]: unknown }): fns.v3.V3BlobPageMessage;

            /**
             * Creates a plain object from a V3BlobPageMessage message. Also converts values to other types if specified.
             * @param message V3BlobPageMessage
             * @param [options] Conversion options
             * @returns Plain object
             */
            static toObject(message: fns.v3.V3BlobPageMessage, options?: $protobuf.IConversionOptions): { [k: string]: unknown };

            /**
             * Converts this V3BlobPageMessage to JSON.
             * @returns JSON object
             */
            toJSON(): { [k: string]: unknown };

            /**
             * Gets the type url for V3BlobPageMessage
             * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
             * @returns The type url
             */
            static getTypeUrl(prefix?: string): string;
        }

        namespace V3BlobPageMessage {

            /** Properties of a V3BlobPageMessage. */
            interface $Properties {

                /** V3BlobPageMessage vault */
                vault?: (string|null);

                /** V3BlobPageMessage path */
                path?: (string|null);

                /** V3BlobPageMessage hash */
                hash?: (string|null);

                /** V3BlobPageMessage size */
                size?: (number|Long|null);

                /** V3BlobPageMessage isNote */
                isNote?: (boolean|null);

                /** V3BlobPageMessage content */
                content?: (string|null);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];
            }

            /** Shape of a V3BlobPageMessage. */
            type $Shape = fns.v3.V3BlobPageMessage.$Properties;
        }

        /**
         * Properties of a V3ManifestCommitRequest.
         * @deprecated Use fns.v3.V3ManifestCommitRequest.$Properties instead.
         */
        type IV3ManifestCommitRequest = fns.v3.V3ManifestCommitRequest.$Properties;

        /** Represents a V3ManifestCommitRequest. */
        class V3ManifestCommitRequest {

            /**
             * Constructs a new V3ManifestCommitRequest.
             * @param [properties] Properties to set
             */
            constructor(properties?: fns.v3.V3ManifestCommitRequest.$Properties);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];

            /** V3ManifestCommitRequest vault. */
            vault: string;

            /** V3ManifestCommitRequest baseEpoch. */
            baseEpoch: (number|Long);

            /** V3ManifestCommitRequest changes. */
            changes: fns.v3.Change.$Properties[];

            /**
             * Creates a new V3ManifestCommitRequest instance using the specified properties.
             * @param [properties] Properties to set
             * @returns V3ManifestCommitRequest instance
             */
            static create(properties: fns.v3.V3ManifestCommitRequest.$Shape): fns.v3.V3ManifestCommitRequest & fns.v3.V3ManifestCommitRequest.$Shape;
            static create(properties?: fns.v3.V3ManifestCommitRequest.$Properties): fns.v3.V3ManifestCommitRequest;

            /**
             * Encodes the specified V3ManifestCommitRequest message. Does not implicitly {@link fns.v3.V3ManifestCommitRequest.verify|verify} messages.
             * @param message V3ManifestCommitRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encode(message: fns.v3.V3ManifestCommitRequest.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified V3ManifestCommitRequest message, length delimited. Does not implicitly {@link fns.v3.V3ManifestCommitRequest.verify|verify} messages.
             * @param message V3ManifestCommitRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encodeDelimited(message: fns.v3.V3ManifestCommitRequest.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a V3ManifestCommitRequest message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns {fns.v3.V3ManifestCommitRequest & fns.v3.V3ManifestCommitRequest.$Shape} V3ManifestCommitRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): fns.v3.V3ManifestCommitRequest & fns.v3.V3ManifestCommitRequest.$Shape;

            /**
             * Decodes a V3ManifestCommitRequest message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns {fns.v3.V3ManifestCommitRequest & fns.v3.V3ManifestCommitRequest.$Shape} V3ManifestCommitRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): fns.v3.V3ManifestCommitRequest & fns.v3.V3ManifestCommitRequest.$Shape;

            /**
             * Verifies a V3ManifestCommitRequest message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            static verify(message: { [k: string]: unknown }): (string|null);

            /**
             * Creates a V3ManifestCommitRequest message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns V3ManifestCommitRequest
             */
            static fromObject(object: { [k: string]: unknown }): fns.v3.V3ManifestCommitRequest;

            /**
             * Creates a plain object from a V3ManifestCommitRequest message. Also converts values to other types if specified.
             * @param message V3ManifestCommitRequest
             * @param [options] Conversion options
             * @returns Plain object
             */
            static toObject(message: fns.v3.V3ManifestCommitRequest, options?: $protobuf.IConversionOptions): { [k: string]: unknown };

            /**
             * Converts this V3ManifestCommitRequest to JSON.
             * @returns JSON object
             */
            toJSON(): { [k: string]: unknown };

            /**
             * Gets the type url for V3ManifestCommitRequest
             * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
             * @returns The type url
             */
            static getTypeUrl(prefix?: string): string;
        }

        namespace V3ManifestCommitRequest {

            /** Properties of a V3ManifestCommitRequest. */
            interface $Properties {

                /** V3ManifestCommitRequest vault */
                vault?: (string|null);

                /** V3ManifestCommitRequest baseEpoch */
                baseEpoch?: (number|Long|null);

                /** V3ManifestCommitRequest changes */
                changes?: (fns.v3.Change.$Properties[]|null);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];
            }

            /** Shape of a V3ManifestCommitRequest. */
            type $Shape = fns.v3.V3ManifestCommitRequest.$Properties;
        }

        /**
         * Properties of a V3CommitAckItem.
         * @deprecated Use fns.v3.V3CommitAckItem.$Properties instead.
         */
        type IV3CommitAckItem = fns.v3.V3CommitAckItem.$Properties;

        /** Represents a V3CommitAckItem. */
        class V3CommitAckItem {

            /**
             * Constructs a new V3CommitAckItem.
             * @param [properties] Properties to set
             */
            constructor(properties?: fns.v3.V3CommitAckItem.$Properties);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];

            /** V3CommitAckItem path. */
            path: string;

            /** V3CommitAckItem id. */
            id: string;

            /**
             * Creates a new V3CommitAckItem instance using the specified properties.
             * @param [properties] Properties to set
             * @returns V3CommitAckItem instance
             */
            static create(properties: fns.v3.V3CommitAckItem.$Shape): fns.v3.V3CommitAckItem & fns.v3.V3CommitAckItem.$Shape;
            static create(properties?: fns.v3.V3CommitAckItem.$Properties): fns.v3.V3CommitAckItem;

            /**
             * Encodes the specified V3CommitAckItem message. Does not implicitly {@link fns.v3.V3CommitAckItem.verify|verify} messages.
             * @param message V3CommitAckItem message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encode(message: fns.v3.V3CommitAckItem.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified V3CommitAckItem message, length delimited. Does not implicitly {@link fns.v3.V3CommitAckItem.verify|verify} messages.
             * @param message V3CommitAckItem message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encodeDelimited(message: fns.v3.V3CommitAckItem.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a V3CommitAckItem message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns {fns.v3.V3CommitAckItem & fns.v3.V3CommitAckItem.$Shape} V3CommitAckItem
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): fns.v3.V3CommitAckItem & fns.v3.V3CommitAckItem.$Shape;

            /**
             * Decodes a V3CommitAckItem message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns {fns.v3.V3CommitAckItem & fns.v3.V3CommitAckItem.$Shape} V3CommitAckItem
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): fns.v3.V3CommitAckItem & fns.v3.V3CommitAckItem.$Shape;

            /**
             * Verifies a V3CommitAckItem message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            static verify(message: { [k: string]: unknown }): (string|null);

            /**
             * Creates a V3CommitAckItem message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns V3CommitAckItem
             */
            static fromObject(object: { [k: string]: unknown }): fns.v3.V3CommitAckItem;

            /**
             * Creates a plain object from a V3CommitAckItem message. Also converts values to other types if specified.
             * @param message V3CommitAckItem
             * @param [options] Conversion options
             * @returns Plain object
             */
            static toObject(message: fns.v3.V3CommitAckItem, options?: $protobuf.IConversionOptions): { [k: string]: unknown };

            /**
             * Converts this V3CommitAckItem to JSON.
             * @returns JSON object
             */
            toJSON(): { [k: string]: unknown };

            /**
             * Gets the type url for V3CommitAckItem
             * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
             * @returns The type url
             */
            static getTypeUrl(prefix?: string): string;
        }

        namespace V3CommitAckItem {

            /** Properties of a V3CommitAckItem. */
            interface $Properties {

                /** V3CommitAckItem path */
                path?: (string|null);

                /** V3CommitAckItem id */
                id?: (string|null);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];
            }

            /** Shape of a V3CommitAckItem. */
            type $Shape = fns.v3.V3CommitAckItem.$Properties;
        }

        /**
         * Properties of a V3ManifestCommitAckMessage.
         * @deprecated Use fns.v3.V3ManifestCommitAckMessage.$Properties instead.
         */
        type IV3ManifestCommitAckMessage = fns.v3.V3ManifestCommitAckMessage.$Properties;

        /** Represents a V3ManifestCommitAckMessage. */
        class V3ManifestCommitAckMessage {

            /**
             * Constructs a new V3ManifestCommitAckMessage.
             * @param [properties] Properties to set
             */
            constructor(properties?: fns.v3.V3ManifestCommitAckMessage.$Properties);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];

            /** V3ManifestCommitAckMessage vault. */
            vault: string;

            /** V3ManifestCommitAckMessage newEpoch. */
            newEpoch: (number|Long);

            /** V3ManifestCommitAckMessage items. */
            items: fns.v3.V3CommitAckItem.$Properties[];

            /**
             * Creates a new V3ManifestCommitAckMessage instance using the specified properties.
             * @param [properties] Properties to set
             * @returns V3ManifestCommitAckMessage instance
             */
            static create(properties: fns.v3.V3ManifestCommitAckMessage.$Shape): fns.v3.V3ManifestCommitAckMessage & fns.v3.V3ManifestCommitAckMessage.$Shape;
            static create(properties?: fns.v3.V3ManifestCommitAckMessage.$Properties): fns.v3.V3ManifestCommitAckMessage;

            /**
             * Encodes the specified V3ManifestCommitAckMessage message. Does not implicitly {@link fns.v3.V3ManifestCommitAckMessage.verify|verify} messages.
             * @param message V3ManifestCommitAckMessage message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encode(message: fns.v3.V3ManifestCommitAckMessage.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified V3ManifestCommitAckMessage message, length delimited. Does not implicitly {@link fns.v3.V3ManifestCommitAckMessage.verify|verify} messages.
             * @param message V3ManifestCommitAckMessage message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encodeDelimited(message: fns.v3.V3ManifestCommitAckMessage.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a V3ManifestCommitAckMessage message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns {fns.v3.V3ManifestCommitAckMessage & fns.v3.V3ManifestCommitAckMessage.$Shape} V3ManifestCommitAckMessage
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): fns.v3.V3ManifestCommitAckMessage & fns.v3.V3ManifestCommitAckMessage.$Shape;

            /**
             * Decodes a V3ManifestCommitAckMessage message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns {fns.v3.V3ManifestCommitAckMessage & fns.v3.V3ManifestCommitAckMessage.$Shape} V3ManifestCommitAckMessage
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): fns.v3.V3ManifestCommitAckMessage & fns.v3.V3ManifestCommitAckMessage.$Shape;

            /**
             * Verifies a V3ManifestCommitAckMessage message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            static verify(message: { [k: string]: unknown }): (string|null);

            /**
             * Creates a V3ManifestCommitAckMessage message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns V3ManifestCommitAckMessage
             */
            static fromObject(object: { [k: string]: unknown }): fns.v3.V3ManifestCommitAckMessage;

            /**
             * Creates a plain object from a V3ManifestCommitAckMessage message. Also converts values to other types if specified.
             * @param message V3ManifestCommitAckMessage
             * @param [options] Conversion options
             * @returns Plain object
             */
            static toObject(message: fns.v3.V3ManifestCommitAckMessage, options?: $protobuf.IConversionOptions): { [k: string]: unknown };

            /**
             * Converts this V3ManifestCommitAckMessage to JSON.
             * @returns JSON object
             */
            toJSON(): { [k: string]: unknown };

            /**
             * Gets the type url for V3ManifestCommitAckMessage
             * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
             * @returns The type url
             */
            static getTypeUrl(prefix?: string): string;
        }

        namespace V3ManifestCommitAckMessage {

            /** Properties of a V3ManifestCommitAckMessage. */
            interface $Properties {

                /** V3ManifestCommitAckMessage vault */
                vault?: (string|null);

                /** V3ManifestCommitAckMessage newEpoch */
                newEpoch?: (number|Long|null);

                /** V3ManifestCommitAckMessage items */
                items?: (fns.v3.V3CommitAckItem.$Properties[]|null);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];
            }

            /** Shape of a V3ManifestCommitAckMessage. */
            type $Shape = fns.v3.V3ManifestCommitAckMessage.$Properties;
        }

        /**
         * Properties of a V3NotifyManifestMessage.
         * @deprecated Use fns.v3.V3NotifyManifestMessage.$Properties instead.
         */
        type IV3NotifyManifestMessage = fns.v3.V3NotifyManifestMessage.$Properties;

        /** Represents a V3NotifyManifestMessage. */
        class V3NotifyManifestMessage {

            /**
             * Constructs a new V3NotifyManifestMessage.
             * @param [properties] Properties to set
             */
            constructor(properties?: fns.v3.V3NotifyManifestMessage.$Properties);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];

            /** V3NotifyManifestMessage vault. */
            vault: string;

            /** V3NotifyManifestMessage newEpoch. */
            newEpoch: (number|Long);

            /** V3NotifyManifestMessage ops. */
            ops: fns.v3.Op.$Properties[];

            /**
             * Creates a new V3NotifyManifestMessage instance using the specified properties.
             * @param [properties] Properties to set
             * @returns V3NotifyManifestMessage instance
             */
            static create(properties: fns.v3.V3NotifyManifestMessage.$Shape): fns.v3.V3NotifyManifestMessage & fns.v3.V3NotifyManifestMessage.$Shape;
            static create(properties?: fns.v3.V3NotifyManifestMessage.$Properties): fns.v3.V3NotifyManifestMessage;

            /**
             * Encodes the specified V3NotifyManifestMessage message. Does not implicitly {@link fns.v3.V3NotifyManifestMessage.verify|verify} messages.
             * @param message V3NotifyManifestMessage message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encode(message: fns.v3.V3NotifyManifestMessage.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified V3NotifyManifestMessage message, length delimited. Does not implicitly {@link fns.v3.V3NotifyManifestMessage.verify|verify} messages.
             * @param message V3NotifyManifestMessage message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encodeDelimited(message: fns.v3.V3NotifyManifestMessage.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a V3NotifyManifestMessage message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns {fns.v3.V3NotifyManifestMessage & fns.v3.V3NotifyManifestMessage.$Shape} V3NotifyManifestMessage
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): fns.v3.V3NotifyManifestMessage & fns.v3.V3NotifyManifestMessage.$Shape;

            /**
             * Decodes a V3NotifyManifestMessage message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns {fns.v3.V3NotifyManifestMessage & fns.v3.V3NotifyManifestMessage.$Shape} V3NotifyManifestMessage
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): fns.v3.V3NotifyManifestMessage & fns.v3.V3NotifyManifestMessage.$Shape;

            /**
             * Verifies a V3NotifyManifestMessage message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            static verify(message: { [k: string]: unknown }): (string|null);

            /**
             * Creates a V3NotifyManifestMessage message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns V3NotifyManifestMessage
             */
            static fromObject(object: { [k: string]: unknown }): fns.v3.V3NotifyManifestMessage;

            /**
             * Creates a plain object from a V3NotifyManifestMessage message. Also converts values to other types if specified.
             * @param message V3NotifyManifestMessage
             * @param [options] Conversion options
             * @returns Plain object
             */
            static toObject(message: fns.v3.V3NotifyManifestMessage, options?: $protobuf.IConversionOptions): { [k: string]: unknown };

            /**
             * Converts this V3NotifyManifestMessage to JSON.
             * @returns JSON object
             */
            toJSON(): { [k: string]: unknown };

            /**
             * Gets the type url for V3NotifyManifestMessage
             * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
             * @returns The type url
             */
            static getTypeUrl(prefix?: string): string;
        }

        namespace V3NotifyManifestMessage {

            /** Properties of a V3NotifyManifestMessage. */
            interface $Properties {

                /** V3NotifyManifestMessage vault */
                vault?: (string|null);

                /** V3NotifyManifestMessage newEpoch */
                newEpoch?: (number|Long|null);

                /** V3NotifyManifestMessage ops */
                ops?: (fns.v3.Op.$Properties[]|null);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];
            }

            /** Shape of a V3NotifyManifestMessage. */
            type $Shape = fns.v3.V3NotifyManifestMessage.$Properties;
        }

        /**
         * Properties of a V3BlobUploadOpenRequest.
         * @deprecated Use fns.v3.V3BlobUploadOpenRequest.$Properties instead.
         */
        type IV3BlobUploadOpenRequest = fns.v3.V3BlobUploadOpenRequest.$Properties;

        /** Represents a V3BlobUploadOpenRequest. */
        class V3BlobUploadOpenRequest {

            /**
             * Constructs a new V3BlobUploadOpenRequest.
             * @param [properties] Properties to set
             */
            constructor(properties?: fns.v3.V3BlobUploadOpenRequest.$Properties);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];

            /** V3BlobUploadOpenRequest vault. */
            vault: string;

            /** V3BlobUploadOpenRequest hash. */
            hash: string;

            /** V3BlobUploadOpenRequest size. */
            size: (number|Long);

            /**
             * Creates a new V3BlobUploadOpenRequest instance using the specified properties.
             * @param [properties] Properties to set
             * @returns V3BlobUploadOpenRequest instance
             */
            static create(properties: fns.v3.V3BlobUploadOpenRequest.$Shape): fns.v3.V3BlobUploadOpenRequest & fns.v3.V3BlobUploadOpenRequest.$Shape;
            static create(properties?: fns.v3.V3BlobUploadOpenRequest.$Properties): fns.v3.V3BlobUploadOpenRequest;

            /**
             * Encodes the specified V3BlobUploadOpenRequest message. Does not implicitly {@link fns.v3.V3BlobUploadOpenRequest.verify|verify} messages.
             * @param message V3BlobUploadOpenRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encode(message: fns.v3.V3BlobUploadOpenRequest.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified V3BlobUploadOpenRequest message, length delimited. Does not implicitly {@link fns.v3.V3BlobUploadOpenRequest.verify|verify} messages.
             * @param message V3BlobUploadOpenRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encodeDelimited(message: fns.v3.V3BlobUploadOpenRequest.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a V3BlobUploadOpenRequest message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns {fns.v3.V3BlobUploadOpenRequest & fns.v3.V3BlobUploadOpenRequest.$Shape} V3BlobUploadOpenRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): fns.v3.V3BlobUploadOpenRequest & fns.v3.V3BlobUploadOpenRequest.$Shape;

            /**
             * Decodes a V3BlobUploadOpenRequest message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns {fns.v3.V3BlobUploadOpenRequest & fns.v3.V3BlobUploadOpenRequest.$Shape} V3BlobUploadOpenRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): fns.v3.V3BlobUploadOpenRequest & fns.v3.V3BlobUploadOpenRequest.$Shape;

            /**
             * Verifies a V3BlobUploadOpenRequest message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            static verify(message: { [k: string]: unknown }): (string|null);

            /**
             * Creates a V3BlobUploadOpenRequest message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns V3BlobUploadOpenRequest
             */
            static fromObject(object: { [k: string]: unknown }): fns.v3.V3BlobUploadOpenRequest;

            /**
             * Creates a plain object from a V3BlobUploadOpenRequest message. Also converts values to other types if specified.
             * @param message V3BlobUploadOpenRequest
             * @param [options] Conversion options
             * @returns Plain object
             */
            static toObject(message: fns.v3.V3BlobUploadOpenRequest, options?: $protobuf.IConversionOptions): { [k: string]: unknown };

            /**
             * Converts this V3BlobUploadOpenRequest to JSON.
             * @returns JSON object
             */
            toJSON(): { [k: string]: unknown };

            /**
             * Gets the type url for V3BlobUploadOpenRequest
             * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
             * @returns The type url
             */
            static getTypeUrl(prefix?: string): string;
        }

        namespace V3BlobUploadOpenRequest {

            /** Properties of a V3BlobUploadOpenRequest. */
            interface $Properties {

                /** V3BlobUploadOpenRequest vault */
                vault?: (string|null);

                /** V3BlobUploadOpenRequest hash */
                hash?: (string|null);

                /** V3BlobUploadOpenRequest size */
                size?: (number|Long|null);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];
            }

            /** Shape of a V3BlobUploadOpenRequest. */
            type $Shape = fns.v3.V3BlobUploadOpenRequest.$Properties;
        }

        /**
         * Properties of a V3BlobUploadOpenMessage.
         * @deprecated Use fns.v3.V3BlobUploadOpenMessage.$Properties instead.
         */
        type IV3BlobUploadOpenMessage = fns.v3.V3BlobUploadOpenMessage.$Properties;

        /** Represents a V3BlobUploadOpenMessage. */
        class V3BlobUploadOpenMessage {

            /**
             * Constructs a new V3BlobUploadOpenMessage.
             * @param [properties] Properties to set
             */
            constructor(properties?: fns.v3.V3BlobUploadOpenMessage.$Properties);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];

            /** V3BlobUploadOpenMessage vault. */
            vault: string;

            /** V3BlobUploadOpenMessage hash. */
            hash: string;

            /** V3BlobUploadOpenMessage sessionId. */
            sessionId: string;

            /** V3BlobUploadOpenMessage chunkSize. */
            chunkSize: (number|Long);

            /** V3BlobUploadOpenMessage totalChunks. */
            totalChunks: (number|Long);

            /** V3BlobUploadOpenMessage exists. */
            exists: boolean;

            /**
             * Creates a new V3BlobUploadOpenMessage instance using the specified properties.
             * @param [properties] Properties to set
             * @returns V3BlobUploadOpenMessage instance
             */
            static create(properties: fns.v3.V3BlobUploadOpenMessage.$Shape): fns.v3.V3BlobUploadOpenMessage & fns.v3.V3BlobUploadOpenMessage.$Shape;
            static create(properties?: fns.v3.V3BlobUploadOpenMessage.$Properties): fns.v3.V3BlobUploadOpenMessage;

            /**
             * Encodes the specified V3BlobUploadOpenMessage message. Does not implicitly {@link fns.v3.V3BlobUploadOpenMessage.verify|verify} messages.
             * @param message V3BlobUploadOpenMessage message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encode(message: fns.v3.V3BlobUploadOpenMessage.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified V3BlobUploadOpenMessage message, length delimited. Does not implicitly {@link fns.v3.V3BlobUploadOpenMessage.verify|verify} messages.
             * @param message V3BlobUploadOpenMessage message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encodeDelimited(message: fns.v3.V3BlobUploadOpenMessage.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a V3BlobUploadOpenMessage message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns {fns.v3.V3BlobUploadOpenMessage & fns.v3.V3BlobUploadOpenMessage.$Shape} V3BlobUploadOpenMessage
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): fns.v3.V3BlobUploadOpenMessage & fns.v3.V3BlobUploadOpenMessage.$Shape;

            /**
             * Decodes a V3BlobUploadOpenMessage message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns {fns.v3.V3BlobUploadOpenMessage & fns.v3.V3BlobUploadOpenMessage.$Shape} V3BlobUploadOpenMessage
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): fns.v3.V3BlobUploadOpenMessage & fns.v3.V3BlobUploadOpenMessage.$Shape;

            /**
             * Verifies a V3BlobUploadOpenMessage message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            static verify(message: { [k: string]: unknown }): (string|null);

            /**
             * Creates a V3BlobUploadOpenMessage message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns V3BlobUploadOpenMessage
             */
            static fromObject(object: { [k: string]: unknown }): fns.v3.V3BlobUploadOpenMessage;

            /**
             * Creates a plain object from a V3BlobUploadOpenMessage message. Also converts values to other types if specified.
             * @param message V3BlobUploadOpenMessage
             * @param [options] Conversion options
             * @returns Plain object
             */
            static toObject(message: fns.v3.V3BlobUploadOpenMessage, options?: $protobuf.IConversionOptions): { [k: string]: unknown };

            /**
             * Converts this V3BlobUploadOpenMessage to JSON.
             * @returns JSON object
             */
            toJSON(): { [k: string]: unknown };

            /**
             * Gets the type url for V3BlobUploadOpenMessage
             * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
             * @returns The type url
             */
            static getTypeUrl(prefix?: string): string;
        }

        namespace V3BlobUploadOpenMessage {

            /** Properties of a V3BlobUploadOpenMessage. */
            interface $Properties {

                /** V3BlobUploadOpenMessage vault */
                vault?: (string|null);

                /** V3BlobUploadOpenMessage hash */
                hash?: (string|null);

                /** V3BlobUploadOpenMessage sessionId */
                sessionId?: (string|null);

                /** V3BlobUploadOpenMessage chunkSize */
                chunkSize?: (number|Long|null);

                /** V3BlobUploadOpenMessage totalChunks */
                totalChunks?: (number|Long|null);

                /** V3BlobUploadOpenMessage exists */
                exists?: (boolean|null);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];
            }

            /** Shape of a V3BlobUploadOpenMessage. */
            type $Shape = fns.v3.V3BlobUploadOpenMessage.$Properties;
        }

        /**
         * Properties of a V3BlobUploadAckMessage.
         * @deprecated Use fns.v3.V3BlobUploadAckMessage.$Properties instead.
         */
        type IV3BlobUploadAckMessage = fns.v3.V3BlobUploadAckMessage.$Properties;

        /** Represents a V3BlobUploadAckMessage. */
        class V3BlobUploadAckMessage {

            /**
             * Constructs a new V3BlobUploadAckMessage.
             * @param [properties] Properties to set
             */
            constructor(properties?: fns.v3.V3BlobUploadAckMessage.$Properties);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];

            /** V3BlobUploadAckMessage vault. */
            vault: string;

            /** V3BlobUploadAckMessage hash. */
            hash: string;

            /** V3BlobUploadAckMessage size. */
            size: (number|Long);

            /**
             * Creates a new V3BlobUploadAckMessage instance using the specified properties.
             * @param [properties] Properties to set
             * @returns V3BlobUploadAckMessage instance
             */
            static create(properties: fns.v3.V3BlobUploadAckMessage.$Shape): fns.v3.V3BlobUploadAckMessage & fns.v3.V3BlobUploadAckMessage.$Shape;
            static create(properties?: fns.v3.V3BlobUploadAckMessage.$Properties): fns.v3.V3BlobUploadAckMessage;

            /**
             * Encodes the specified V3BlobUploadAckMessage message. Does not implicitly {@link fns.v3.V3BlobUploadAckMessage.verify|verify} messages.
             * @param message V3BlobUploadAckMessage message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encode(message: fns.v3.V3BlobUploadAckMessage.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified V3BlobUploadAckMessage message, length delimited. Does not implicitly {@link fns.v3.V3BlobUploadAckMessage.verify|verify} messages.
             * @param message V3BlobUploadAckMessage message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encodeDelimited(message: fns.v3.V3BlobUploadAckMessage.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a V3BlobUploadAckMessage message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns {fns.v3.V3BlobUploadAckMessage & fns.v3.V3BlobUploadAckMessage.$Shape} V3BlobUploadAckMessage
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): fns.v3.V3BlobUploadAckMessage & fns.v3.V3BlobUploadAckMessage.$Shape;

            /**
             * Decodes a V3BlobUploadAckMessage message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns {fns.v3.V3BlobUploadAckMessage & fns.v3.V3BlobUploadAckMessage.$Shape} V3BlobUploadAckMessage
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): fns.v3.V3BlobUploadAckMessage & fns.v3.V3BlobUploadAckMessage.$Shape;

            /**
             * Verifies a V3BlobUploadAckMessage message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            static verify(message: { [k: string]: unknown }): (string|null);

            /**
             * Creates a V3BlobUploadAckMessage message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns V3BlobUploadAckMessage
             */
            static fromObject(object: { [k: string]: unknown }): fns.v3.V3BlobUploadAckMessage;

            /**
             * Creates a plain object from a V3BlobUploadAckMessage message. Also converts values to other types if specified.
             * @param message V3BlobUploadAckMessage
             * @param [options] Conversion options
             * @returns Plain object
             */
            static toObject(message: fns.v3.V3BlobUploadAckMessage, options?: $protobuf.IConversionOptions): { [k: string]: unknown };

            /**
             * Converts this V3BlobUploadAckMessage to JSON.
             * @returns JSON object
             */
            toJSON(): { [k: string]: unknown };

            /**
             * Gets the type url for V3BlobUploadAckMessage
             * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
             * @returns The type url
             */
            static getTypeUrl(prefix?: string): string;
        }

        namespace V3BlobUploadAckMessage {

            /** Properties of a V3BlobUploadAckMessage. */
            interface $Properties {

                /** V3BlobUploadAckMessage vault */
                vault?: (string|null);

                /** V3BlobUploadAckMessage hash */
                hash?: (string|null);

                /** V3BlobUploadAckMessage size */
                size?: (number|Long|null);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];
            }

            /** Shape of a V3BlobUploadAckMessage. */
            type $Shape = fns.v3.V3BlobUploadAckMessage.$Properties;
        }

        /**
         * Properties of a V3BlobDownloadRequest.
         * @deprecated Use fns.v3.V3BlobDownloadRequest.$Properties instead.
         */
        type IV3BlobDownloadRequest = fns.v3.V3BlobDownloadRequest.$Properties;

        /** Represents a V3BlobDownloadRequest. */
        class V3BlobDownloadRequest {

            /**
             * Constructs a new V3BlobDownloadRequest.
             * @param [properties] Properties to set
             */
            constructor(properties?: fns.v3.V3BlobDownloadRequest.$Properties);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];

            /** V3BlobDownloadRequest vault. */
            vault: string;

            /** V3BlobDownloadRequest hash. */
            hash: string;

            /** V3BlobDownloadRequest chunkIndex. */
            chunkIndex: number;

            /**
             * Creates a new V3BlobDownloadRequest instance using the specified properties.
             * @param [properties] Properties to set
             * @returns V3BlobDownloadRequest instance
             */
            static create(properties: fns.v3.V3BlobDownloadRequest.$Shape): fns.v3.V3BlobDownloadRequest & fns.v3.V3BlobDownloadRequest.$Shape;
            static create(properties?: fns.v3.V3BlobDownloadRequest.$Properties): fns.v3.V3BlobDownloadRequest;

            /**
             * Encodes the specified V3BlobDownloadRequest message. Does not implicitly {@link fns.v3.V3BlobDownloadRequest.verify|verify} messages.
             * @param message V3BlobDownloadRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encode(message: fns.v3.V3BlobDownloadRequest.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified V3BlobDownloadRequest message, length delimited. Does not implicitly {@link fns.v3.V3BlobDownloadRequest.verify|verify} messages.
             * @param message V3BlobDownloadRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encodeDelimited(message: fns.v3.V3BlobDownloadRequest.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a V3BlobDownloadRequest message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns {fns.v3.V3BlobDownloadRequest & fns.v3.V3BlobDownloadRequest.$Shape} V3BlobDownloadRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): fns.v3.V3BlobDownloadRequest & fns.v3.V3BlobDownloadRequest.$Shape;

            /**
             * Decodes a V3BlobDownloadRequest message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns {fns.v3.V3BlobDownloadRequest & fns.v3.V3BlobDownloadRequest.$Shape} V3BlobDownloadRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): fns.v3.V3BlobDownloadRequest & fns.v3.V3BlobDownloadRequest.$Shape;

            /**
             * Verifies a V3BlobDownloadRequest message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            static verify(message: { [k: string]: unknown }): (string|null);

            /**
             * Creates a V3BlobDownloadRequest message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns V3BlobDownloadRequest
             */
            static fromObject(object: { [k: string]: unknown }): fns.v3.V3BlobDownloadRequest;

            /**
             * Creates a plain object from a V3BlobDownloadRequest message. Also converts values to other types if specified.
             * @param message V3BlobDownloadRequest
             * @param [options] Conversion options
             * @returns Plain object
             */
            static toObject(message: fns.v3.V3BlobDownloadRequest, options?: $protobuf.IConversionOptions): { [k: string]: unknown };

            /**
             * Converts this V3BlobDownloadRequest to JSON.
             * @returns JSON object
             */
            toJSON(): { [k: string]: unknown };

            /**
             * Gets the type url for V3BlobDownloadRequest
             * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
             * @returns The type url
             */
            static getTypeUrl(prefix?: string): string;
        }

        namespace V3BlobDownloadRequest {

            /** Properties of a V3BlobDownloadRequest. */
            interface $Properties {

                /** V3BlobDownloadRequest vault */
                vault?: (string|null);

                /** V3BlobDownloadRequest hash */
                hash?: (string|null);

                /** V3BlobDownloadRequest chunkIndex */
                chunkIndex?: (number|null);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];
            }

            /** Shape of a V3BlobDownloadRequest. */
            type $Shape = fns.v3.V3BlobDownloadRequest.$Properties;
        }

        /**
         * Properties of a V3BlobChunkMessage.
         * @deprecated Use fns.v3.V3BlobChunkMessage.$Properties instead.
         */
        type IV3BlobChunkMessage = fns.v3.V3BlobChunkMessage.$Properties;

        /** Represents a V3BlobChunkMessage. */
        class V3BlobChunkMessage {

            /**
             * Constructs a new V3BlobChunkMessage.
             * @param [properties] Properties to set
             */
            constructor(properties?: fns.v3.V3BlobChunkMessage.$Properties);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];

            /** V3BlobChunkMessage vault. */
            vault: string;

            /** V3BlobChunkMessage hash. */
            hash: string;

            /** V3BlobChunkMessage chunkIndex. */
            chunkIndex: number;

            /** V3BlobChunkMessage totalChunks. */
            totalChunks: (number|Long);

            /** V3BlobChunkMessage chunkSize. */
            chunkSize: (number|Long);

            /** V3BlobChunkMessage size. */
            size: (number|Long);

            /** V3BlobChunkMessage data. */
            data: string;

            /**
             * Creates a new V3BlobChunkMessage instance using the specified properties.
             * @param [properties] Properties to set
             * @returns V3BlobChunkMessage instance
             */
            static create(properties: fns.v3.V3BlobChunkMessage.$Shape): fns.v3.V3BlobChunkMessage & fns.v3.V3BlobChunkMessage.$Shape;
            static create(properties?: fns.v3.V3BlobChunkMessage.$Properties): fns.v3.V3BlobChunkMessage;

            /**
             * Encodes the specified V3BlobChunkMessage message. Does not implicitly {@link fns.v3.V3BlobChunkMessage.verify|verify} messages.
             * @param message V3BlobChunkMessage message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encode(message: fns.v3.V3BlobChunkMessage.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified V3BlobChunkMessage message, length delimited. Does not implicitly {@link fns.v3.V3BlobChunkMessage.verify|verify} messages.
             * @param message V3BlobChunkMessage message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encodeDelimited(message: fns.v3.V3BlobChunkMessage.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a V3BlobChunkMessage message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns {fns.v3.V3BlobChunkMessage & fns.v3.V3BlobChunkMessage.$Shape} V3BlobChunkMessage
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): fns.v3.V3BlobChunkMessage & fns.v3.V3BlobChunkMessage.$Shape;

            /**
             * Decodes a V3BlobChunkMessage message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns {fns.v3.V3BlobChunkMessage & fns.v3.V3BlobChunkMessage.$Shape} V3BlobChunkMessage
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): fns.v3.V3BlobChunkMessage & fns.v3.V3BlobChunkMessage.$Shape;

            /**
             * Verifies a V3BlobChunkMessage message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            static verify(message: { [k: string]: unknown }): (string|null);

            /**
             * Creates a V3BlobChunkMessage message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns V3BlobChunkMessage
             */
            static fromObject(object: { [k: string]: unknown }): fns.v3.V3BlobChunkMessage;

            /**
             * Creates a plain object from a V3BlobChunkMessage message. Also converts values to other types if specified.
             * @param message V3BlobChunkMessage
             * @param [options] Conversion options
             * @returns Plain object
             */
            static toObject(message: fns.v3.V3BlobChunkMessage, options?: $protobuf.IConversionOptions): { [k: string]: unknown };

            /**
             * Converts this V3BlobChunkMessage to JSON.
             * @returns JSON object
             */
            toJSON(): { [k: string]: unknown };

            /**
             * Gets the type url for V3BlobChunkMessage
             * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
             * @returns The type url
             */
            static getTypeUrl(prefix?: string): string;
        }

        namespace V3BlobChunkMessage {

            /** Properties of a V3BlobChunkMessage. */
            interface $Properties {

                /** V3BlobChunkMessage vault */
                vault?: (string|null);

                /** V3BlobChunkMessage hash */
                hash?: (string|null);

                /** V3BlobChunkMessage chunkIndex */
                chunkIndex?: (number|null);

                /** V3BlobChunkMessage totalChunks */
                totalChunks?: (number|Long|null);

                /** V3BlobChunkMessage chunkSize */
                chunkSize?: (number|Long|null);

                /** V3BlobChunkMessage size */
                size?: (number|Long|null);

                /** V3BlobChunkMessage data */
                data?: (string|null);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];
            }

            /** Shape of a V3BlobChunkMessage. */
            type $Shape = fns.v3.V3BlobChunkMessage.$Properties;
        }
    }
}
