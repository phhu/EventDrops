(function(global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined'
        ? (module.exports = factory())
        : typeof define === 'function' && define.amd
            ? define(factory)
            : (global.eventDrops = factory());
})(this, function() {
    'use strict';

    var commonjsGlobal =
        typeof window !== 'undefined'
            ? window
            : typeof global !== 'undefined'
                ? global
                : typeof self !== 'undefined' ? self : {};

    function createCommonjsModule(fn, module) {
        return (
            (module = { exports: {} }),
            fn(module, module.exports),
            module.exports
        );
    }

    var index$1 = createCommonjsModule(function(module, exports) {
        /**
         * lodash (Custom Build) <https://lodash.com/>
         * Build: `lodash modularize exports="npm" -o ./`
         * Copyright jQuery Foundation and other contributors <https://jquery.org/>
         * Released under MIT license <https://lodash.com/license>
         * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
         * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
         */

        /** Used as the size to enable large array optimizations. */
        var LARGE_ARRAY_SIZE = 200;

        /** Used to stand-in for `undefined` hash values. */
        var HASH_UNDEFINED = '__lodash_hash_undefined__';

        /** Used as references for various `Number` constants. */
        var MAX_SAFE_INTEGER = 9007199254740991;

        /** `Object#toString` result references. */
        var argsTag = '[object Arguments]',
            arrayTag = '[object Array]',
            boolTag = '[object Boolean]',
            dateTag = '[object Date]',
            errorTag = '[object Error]',
            funcTag = '[object Function]',
            genTag = '[object GeneratorFunction]',
            mapTag = '[object Map]',
            numberTag = '[object Number]',
            objectTag = '[object Object]',
            promiseTag = '[object Promise]',
            regexpTag = '[object RegExp]',
            setTag = '[object Set]',
            stringTag = '[object String]',
            symbolTag = '[object Symbol]',
            weakMapTag = '[object WeakMap]';

        var arrayBufferTag = '[object ArrayBuffer]',
            dataViewTag = '[object DataView]',
            float32Tag = '[object Float32Array]',
            float64Tag = '[object Float64Array]',
            int8Tag = '[object Int8Array]',
            int16Tag = '[object Int16Array]',
            int32Tag = '[object Int32Array]',
            uint8Tag = '[object Uint8Array]',
            uint8ClampedTag = '[object Uint8ClampedArray]',
            uint16Tag = '[object Uint16Array]',
            uint32Tag = '[object Uint32Array]';

        /**
         * Used to match `RegExp`
         * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
         */
        var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

        /** Used to match `RegExp` flags from their coerced string values. */
        var reFlags = /\w*$/;

        /** Used to detect host constructors (Safari). */
        var reIsHostCtor = /^\[object .+?Constructor\]$/;

        /** Used to detect unsigned integer values. */
        var reIsUint = /^(?:0|[1-9]\d*)$/;

        /** Used to identify `toStringTag` values of typed arrays. */
        var typedArrayTags = {};
        typedArrayTags[float32Tag] = typedArrayTags[
            float64Tag
        ] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[
            int32Tag
        ] = typedArrayTags[uint8Tag] = typedArrayTags[
            uint8ClampedTag
        ] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
        typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[
            arrayBufferTag
        ] = typedArrayTags[boolTag] = typedArrayTags[
            dataViewTag
        ] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[
            funcTag
        ] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[
            objectTag
        ] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[
            stringTag
        ] = typedArrayTags[weakMapTag] = false;

        /** Used to identify `toStringTag` values supported by `_.clone`. */
        var cloneableTags = {};
        cloneableTags[argsTag] = cloneableTags[arrayTag] = cloneableTags[
            arrayBufferTag
        ] = cloneableTags[dataViewTag] = cloneableTags[boolTag] = cloneableTags[
            dateTag
        ] = cloneableTags[float32Tag] = cloneableTags[
            float64Tag
        ] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[
            int32Tag
        ] = cloneableTags[mapTag] = cloneableTags[numberTag] = cloneableTags[
            objectTag
        ] = cloneableTags[regexpTag] = cloneableTags[setTag] = cloneableTags[
            stringTag
        ] = cloneableTags[symbolTag] = cloneableTags[uint8Tag] = cloneableTags[
            uint8ClampedTag
        ] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
        cloneableTags[errorTag] = cloneableTags[funcTag] = cloneableTags[
            weakMapTag
        ] = false;

        /** Detect free variable `global` from Node.js. */
        var freeGlobal =
            typeof commonjsGlobal == 'object' &&
            commonjsGlobal &&
            commonjsGlobal.Object === Object &&
            commonjsGlobal;

        /** Detect free variable `self`. */
        var freeSelf =
            typeof self == 'object' && self && self.Object === Object && self;

        /** Used as a reference to the global object. */
        var root = freeGlobal || freeSelf || Function('return this')();

        /** Detect free variable `exports`. */
        var freeExports =
            'object' == 'object' && exports && !exports.nodeType && exports;

        /** Detect free variable `module`. */
        var freeModule =
            freeExports &&
            'object' == 'object' &&
            module &&
            !module.nodeType &&
            module;

        /** Detect the popular CommonJS extension `module.exports`. */
        var moduleExports = freeModule && freeModule.exports === freeExports;

        /** Detect free variable `process` from Node.js. */
        var freeProcess = moduleExports && freeGlobal.process;

        /** Used to access faster Node.js helpers. */
        var nodeUtil = (function() {
            try {
                return freeProcess && freeProcess.binding('util');
            } catch (e) {}
        })();

        /* Node.js helper references. */
        var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

        /**
         * Adds the key-value `pair` to `map`.
         *
         * @private
         * @param {Object} map The map to modify.
         * @param {Array} pair The key-value pair to add.
         * @returns {Object} Returns `map`.
         */
        function addMapEntry(map, pair) {
            // Don't return `map.set` because it's not chainable in IE 11.
            map.set(pair[0], pair[1]);
            return map;
        }

        /**
         * Adds `value` to `set`.
         *
         * @private
         * @param {Object} set The set to modify.
         * @param {*} value The value to add.
         * @returns {Object} Returns `set`.
         */
        function addSetEntry(set, value) {
            // Don't return `set.add` because it's not chainable in IE 11.
            set.add(value);
            return set;
        }

        /**
         * A faster alternative to `Function#apply`, this function invokes `func`
         * with the `this` binding of `thisArg` and the arguments of `args`.
         *
         * @private
         * @param {Function} func The function to invoke.
         * @param {*} thisArg The `this` binding of `func`.
         * @param {Array} args The arguments to invoke `func` with.
         * @returns {*} Returns the result of `func`.
         */
        function apply(func, thisArg, args) {
            switch (args.length) {
                case 0:
                    return func.call(thisArg);
                case 1:
                    return func.call(thisArg, args[0]);
                case 2:
                    return func.call(thisArg, args[0], args[1]);
                case 3:
                    return func.call(thisArg, args[0], args[1], args[2]);
            }
            return func.apply(thisArg, args);
        }

        /**
         * A specialized version of `_.forEach` for arrays without support for
         * iteratee shorthands.
         *
         * @private
         * @param {Array} [array] The array to iterate over.
         * @param {Function} iteratee The function invoked per iteration.
         * @returns {Array} Returns `array`.
         */
        function arrayEach(array, iteratee) {
            var index = -1,
                length = array ? array.length : 0;

            while (++index < length) {
                if (iteratee(array[index], index, array) === false) {
                    break;
                }
            }
            return array;
        }

        /**
         * Appends the elements of `values` to `array`.
         *
         * @private
         * @param {Array} array The array to modify.
         * @param {Array} values The values to append.
         * @returns {Array} Returns `array`.
         */
        function arrayPush(array, values) {
            var index = -1,
                length = values.length,
                offset = array.length;

            while (++index < length) {
                array[offset + index] = values[index];
            }
            return array;
        }

        /**
         * A specialized version of `_.reduce` for arrays without support for
         * iteratee shorthands.
         *
         * @private
         * @param {Array} [array] The array to iterate over.
         * @param {Function} iteratee The function invoked per iteration.
         * @param {*} [accumulator] The initial value.
         * @param {boolean} [initAccum] Specify using the first element of `array` as
         *  the initial value.
         * @returns {*} Returns the accumulated value.
         */
        function arrayReduce(array, iteratee, accumulator, initAccum) {
            var index = -1,
                length = array ? array.length : 0;

            if (initAccum && length) {
                accumulator = array[++index];
            }
            while (++index < length) {
                accumulator = iteratee(accumulator, array[index], index, array);
            }
            return accumulator;
        }

        /**
         * The base implementation of `_.times` without support for iteratee shorthands
         * or max array length checks.
         *
         * @private
         * @param {number} n The number of times to invoke `iteratee`.
         * @param {Function} iteratee The function invoked per iteration.
         * @returns {Array} Returns the array of results.
         */
        function baseTimes(n, iteratee) {
            var index = -1,
                result = Array(n);

            while (++index < n) {
                result[index] = iteratee(index);
            }
            return result;
        }

        /**
         * The base implementation of `_.unary` without support for storing metadata.
         *
         * @private
         * @param {Function} func The function to cap arguments for.
         * @returns {Function} Returns the new capped function.
         */
        function baseUnary(func) {
            return function(value) {
                return func(value);
            };
        }

        /**
         * Gets the value at `key` of `object`.
         *
         * @private
         * @param {Object} [object] The object to query.
         * @param {string} key The key of the property to get.
         * @returns {*} Returns the property value.
         */
        function getValue(object, key) {
            return object == null ? undefined : object[key];
        }

        /**
         * Checks if `value` is a host object in IE < 9.
         *
         * @private
         * @param {*} value The value to check.
         * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
         */
        function isHostObject(value) {
            // Many host objects are `Object` objects that can coerce to strings
            // despite having improperly defined `toString` methods.
            var result = false;
            if (value != null && typeof value.toString != 'function') {
                try {
                    result = !!(value + '');
                } catch (e) {}
            }
            return result;
        }

        /**
         * Converts `map` to its key-value pairs.
         *
         * @private
         * @param {Object} map The map to convert.
         * @returns {Array} Returns the key-value pairs.
         */
        function mapToArray(map) {
            var index = -1,
                result = Array(map.size);

            map.forEach(function(value, key) {
                result[++index] = [key, value];
            });
            return result;
        }

        /**
         * Creates a unary function that invokes `func` with its argument transformed.
         *
         * @private
         * @param {Function} func The function to wrap.
         * @param {Function} transform The argument transform.
         * @returns {Function} Returns the new function.
         */
        function overArg(func, transform) {
            return function(arg) {
                return func(transform(arg));
            };
        }

        /**
         * Converts `set` to an array of its values.
         *
         * @private
         * @param {Object} set The set to convert.
         * @returns {Array} Returns the values.
         */
        function setToArray(set) {
            var index = -1,
                result = Array(set.size);

            set.forEach(function(value) {
                result[++index] = value;
            });
            return result;
        }

        /** Used for built-in method references. */
        var arrayProto = Array.prototype,
            funcProto = Function.prototype,
            objectProto = Object.prototype;

        /** Used to detect overreaching core-js shims. */
        var coreJsData = root['__core-js_shared__'];

        /** Used to detect methods masquerading as native. */
        var maskSrcKey = (function() {
            var uid = /[^.]+$/.exec(
                (coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO) ||
                    ''
            );
            return uid ? 'Symbol(src)_1.' + uid : '';
        })();

        /** Used to resolve the decompiled source of functions. */
        var funcToString = funcProto.toString;

        /** Used to check objects for own properties. */
        var hasOwnProperty = objectProto.hasOwnProperty;

        /** Used to infer the `Object` constructor. */
        var objectCtorString = funcToString.call(Object);

        /**
         * Used to resolve the
         * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
         * of values.
         */
        var objectToString = objectProto.toString;

        /** Used to detect if a method is native. */
        var reIsNative = RegExp(
            '^' +
                funcToString
                    .call(hasOwnProperty)
                    .replace(reRegExpChar, '\\$&')
                    .replace(
                        /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
                        '$1.*?'
                    ) +
                '$'
        );

        /** Built-in value references. */
        var Buffer = moduleExports ? root.Buffer : undefined,
            Symbol = root.Symbol,
            Uint8Array = root.Uint8Array,
            getPrototype = overArg(Object.getPrototypeOf, Object),
            objectCreate = Object.create,
            propertyIsEnumerable = objectProto.propertyIsEnumerable,
            splice = arrayProto.splice;

        /* Built-in method references for those with the same name as other `lodash` methods. */
        var nativeGetSymbols = Object.getOwnPropertySymbols,
            nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined,
            nativeKeys = overArg(Object.keys, Object),
            nativeMax = Math.max;

        /* Built-in method references that are verified to be native. */
        var DataView = getNative(root, 'DataView'),
            Map = getNative(root, 'Map'),
            Promise = getNative(root, 'Promise'),
            Set = getNative(root, 'Set'),
            WeakMap = getNative(root, 'WeakMap'),
            nativeCreate = getNative(Object, 'create');

        /** Used to detect maps, sets, and weakmaps. */
        var dataViewCtorString = toSource(DataView),
            mapCtorString = toSource(Map),
            promiseCtorString = toSource(Promise),
            setCtorString = toSource(Set),
            weakMapCtorString = toSource(WeakMap);

        /** Used to convert symbols to primitives and strings. */
        var symbolProto = Symbol ? Symbol.prototype : undefined,
            symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

        /**
         * Creates a hash object.
         *
         * @private
         * @constructor
         * @param {Array} [entries] The key-value pairs to cache.
         */
        function Hash(entries) {
            var index = -1,
                length = entries ? entries.length : 0;

            this.clear();
            while (++index < length) {
                var entry = entries[index];
                this.set(entry[0], entry[1]);
            }
        }

        /**
         * Removes all key-value entries from the hash.
         *
         * @private
         * @name clear
         * @memberOf Hash
         */
        function hashClear() {
            this.__data__ = nativeCreate ? nativeCreate(null) : {};
        }

        /**
         * Removes `key` and its value from the hash.
         *
         * @private
         * @name delete
         * @memberOf Hash
         * @param {Object} hash The hash to modify.
         * @param {string} key The key of the value to remove.
         * @returns {boolean} Returns `true` if the entry was removed, else `false`.
         */
        function hashDelete(key) {
            return this.has(key) && delete this.__data__[key];
        }

        /**
         * Gets the hash value for `key`.
         *
         * @private
         * @name get
         * @memberOf Hash
         * @param {string} key The key of the value to get.
         * @returns {*} Returns the entry value.
         */
        function hashGet(key) {
            var data = this.__data__;
            if (nativeCreate) {
                var result = data[key];
                return result === HASH_UNDEFINED ? undefined : result;
            }
            return hasOwnProperty.call(data, key) ? data[key] : undefined;
        }

        /**
         * Checks if a hash value for `key` exists.
         *
         * @private
         * @name has
         * @memberOf Hash
         * @param {string} key The key of the entry to check.
         * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
         */
        function hashHas(key) {
            var data = this.__data__;
            return nativeCreate
                ? data[key] !== undefined
                : hasOwnProperty.call(data, key);
        }

        /**
         * Sets the hash `key` to `value`.
         *
         * @private
         * @name set
         * @memberOf Hash
         * @param {string} key The key of the value to set.
         * @param {*} value The value to set.
         * @returns {Object} Returns the hash instance.
         */
        function hashSet(key, value) {
            var data = this.__data__;
            data[key] =
                nativeCreate && value === undefined ? HASH_UNDEFINED : value;
            return this;
        }

        // Add methods to `Hash`.
        Hash.prototype.clear = hashClear;
        Hash.prototype['delete'] = hashDelete;
        Hash.prototype.get = hashGet;
        Hash.prototype.has = hashHas;
        Hash.prototype.set = hashSet;

        /**
         * Creates an list cache object.
         *
         * @private
         * @constructor
         * @param {Array} [entries] The key-value pairs to cache.
         */
        function ListCache(entries) {
            var index = -1,
                length = entries ? entries.length : 0;

            this.clear();
            while (++index < length) {
                var entry = entries[index];
                this.set(entry[0], entry[1]);
            }
        }

        /**
         * Removes all key-value entries from the list cache.
         *
         * @private
         * @name clear
         * @memberOf ListCache
         */
        function listCacheClear() {
            this.__data__ = [];
        }

        /**
         * Removes `key` and its value from the list cache.
         *
         * @private
         * @name delete
         * @memberOf ListCache
         * @param {string} key The key of the value to remove.
         * @returns {boolean} Returns `true` if the entry was removed, else `false`.
         */
        function listCacheDelete(key) {
            var data = this.__data__,
                index = assocIndexOf(data, key);

            if (index < 0) {
                return false;
            }
            var lastIndex = data.length - 1;
            if (index == lastIndex) {
                data.pop();
            } else {
                splice.call(data, index, 1);
            }
            return true;
        }

        /**
         * Gets the list cache value for `key`.
         *
         * @private
         * @name get
         * @memberOf ListCache
         * @param {string} key The key of the value to get.
         * @returns {*} Returns the entry value.
         */
        function listCacheGet(key) {
            var data = this.__data__,
                index = assocIndexOf(data, key);

            return index < 0 ? undefined : data[index][1];
        }

        /**
         * Checks if a list cache value for `key` exists.
         *
         * @private
         * @name has
         * @memberOf ListCache
         * @param {string} key The key of the entry to check.
         * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
         */
        function listCacheHas(key) {
            return assocIndexOf(this.__data__, key) > -1;
        }

        /**
         * Sets the list cache `key` to `value`.
         *
         * @private
         * @name set
         * @memberOf ListCache
         * @param {string} key The key of the value to set.
         * @param {*} value The value to set.
         * @returns {Object} Returns the list cache instance.
         */
        function listCacheSet(key, value) {
            var data = this.__data__,
                index = assocIndexOf(data, key);

            if (index < 0) {
                data.push([key, value]);
            } else {
                data[index][1] = value;
            }
            return this;
        }

        // Add methods to `ListCache`.
        ListCache.prototype.clear = listCacheClear;
        ListCache.prototype['delete'] = listCacheDelete;
        ListCache.prototype.get = listCacheGet;
        ListCache.prototype.has = listCacheHas;
        ListCache.prototype.set = listCacheSet;

        /**
         * Creates a map cache object to store key-value pairs.
         *
         * @private
         * @constructor
         * @param {Array} [entries] The key-value pairs to cache.
         */
        function MapCache(entries) {
            var index = -1,
                length = entries ? entries.length : 0;

            this.clear();
            while (++index < length) {
                var entry = entries[index];
                this.set(entry[0], entry[1]);
            }
        }

        /**
         * Removes all key-value entries from the map.
         *
         * @private
         * @name clear
         * @memberOf MapCache
         */
        function mapCacheClear() {
            this.__data__ = {
                hash: new Hash(),
                map: new (Map || ListCache)(),
                string: new Hash(),
            };
        }

        /**
         * Removes `key` and its value from the map.
         *
         * @private
         * @name delete
         * @memberOf MapCache
         * @param {string} key The key of the value to remove.
         * @returns {boolean} Returns `true` if the entry was removed, else `false`.
         */
        function mapCacheDelete(key) {
            return getMapData(this, key)['delete'](key);
        }

        /**
         * Gets the map value for `key`.
         *
         * @private
         * @name get
         * @memberOf MapCache
         * @param {string} key The key of the value to get.
         * @returns {*} Returns the entry value.
         */
        function mapCacheGet(key) {
            return getMapData(this, key).get(key);
        }

        /**
         * Checks if a map value for `key` exists.
         *
         * @private
         * @name has
         * @memberOf MapCache
         * @param {string} key The key of the entry to check.
         * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
         */
        function mapCacheHas(key) {
            return getMapData(this, key).has(key);
        }

        /**
         * Sets the map `key` to `value`.
         *
         * @private
         * @name set
         * @memberOf MapCache
         * @param {string} key The key of the value to set.
         * @param {*} value The value to set.
         * @returns {Object} Returns the map cache instance.
         */
        function mapCacheSet(key, value) {
            getMapData(this, key).set(key, value);
            return this;
        }

        // Add methods to `MapCache`.
        MapCache.prototype.clear = mapCacheClear;
        MapCache.prototype['delete'] = mapCacheDelete;
        MapCache.prototype.get = mapCacheGet;
        MapCache.prototype.has = mapCacheHas;
        MapCache.prototype.set = mapCacheSet;

        /**
         * Creates a stack cache object to store key-value pairs.
         *
         * @private
         * @constructor
         * @param {Array} [entries] The key-value pairs to cache.
         */
        function Stack(entries) {
            this.__data__ = new ListCache(entries);
        }

        /**
         * Removes all key-value entries from the stack.
         *
         * @private
         * @name clear
         * @memberOf Stack
         */
        function stackClear() {
            this.__data__ = new ListCache();
        }

        /**
         * Removes `key` and its value from the stack.
         *
         * @private
         * @name delete
         * @memberOf Stack
         * @param {string} key The key of the value to remove.
         * @returns {boolean} Returns `true` if the entry was removed, else `false`.
         */
        function stackDelete(key) {
            return this.__data__['delete'](key);
        }

        /**
         * Gets the stack value for `key`.
         *
         * @private
         * @name get
         * @memberOf Stack
         * @param {string} key The key of the value to get.
         * @returns {*} Returns the entry value.
         */
        function stackGet(key) {
            return this.__data__.get(key);
        }

        /**
         * Checks if a stack value for `key` exists.
         *
         * @private
         * @name has
         * @memberOf Stack
         * @param {string} key The key of the entry to check.
         * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
         */
        function stackHas(key) {
            return this.__data__.has(key);
        }

        /**
         * Sets the stack `key` to `value`.
         *
         * @private
         * @name set
         * @memberOf Stack
         * @param {string} key The key of the value to set.
         * @param {*} value The value to set.
         * @returns {Object} Returns the stack cache instance.
         */
        function stackSet(key, value) {
            var cache = this.__data__;
            if (cache instanceof ListCache) {
                var pairs = cache.__data__;
                if (!Map || pairs.length < LARGE_ARRAY_SIZE - 1) {
                    pairs.push([key, value]);
                    return this;
                }
                cache = this.__data__ = new MapCache(pairs);
            }
            cache.set(key, value);
            return this;
        }

        // Add methods to `Stack`.
        Stack.prototype.clear = stackClear;
        Stack.prototype['delete'] = stackDelete;
        Stack.prototype.get = stackGet;
        Stack.prototype.has = stackHas;
        Stack.prototype.set = stackSet;

        /**
         * Creates an array of the enumerable property names of the array-like `value`.
         *
         * @private
         * @param {*} value The value to query.
         * @param {boolean} inherited Specify returning inherited property names.
         * @returns {Array} Returns the array of property names.
         */
        function arrayLikeKeys(value, inherited) {
            // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
            // Safari 9 makes `arguments.length` enumerable in strict mode.
            var result =
                isArray(value) || isArguments(value)
                    ? baseTimes(value.length, String)
                    : [];

            var length = result.length,
                skipIndexes = !!length;

            for (var key in value) {
                if (
                    (inherited || hasOwnProperty.call(value, key)) &&
                    !(skipIndexes && (key == 'length' || isIndex(key, length)))
                ) {
                    result.push(key);
                }
            }
            return result;
        }

        /**
         * This function is like `assignValue` except that it doesn't assign
         * `undefined` values.
         *
         * @private
         * @param {Object} object The object to modify.
         * @param {string} key The key of the property to assign.
         * @param {*} value The value to assign.
         */
        function assignMergeValue(object, key, value) {
            if (
                (value !== undefined && !eq(object[key], value)) ||
                (typeof key == 'number' &&
                    value === undefined &&
                    !(key in object))
            ) {
                object[key] = value;
            }
        }

        /**
         * Assigns `value` to `key` of `object` if the existing value is not equivalent
         * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
         * for equality comparisons.
         *
         * @private
         * @param {Object} object The object to modify.
         * @param {string} key The key of the property to assign.
         * @param {*} value The value to assign.
         */
        function assignValue(object, key, value) {
            var objValue = object[key];
            if (
                !(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
                (value === undefined && !(key in object))
            ) {
                object[key] = value;
            }
        }

        /**
         * Gets the index at which the `key` is found in `array` of key-value pairs.
         *
         * @private
         * @param {Array} array The array to inspect.
         * @param {*} key The key to search for.
         * @returns {number} Returns the index of the matched value, else `-1`.
         */
        function assocIndexOf(array, key) {
            var length = array.length;
            while (length--) {
                if (eq(array[length][0], key)) {
                    return length;
                }
            }
            return -1;
        }

        /**
         * The base implementation of `_.assign` without support for multiple sources
         * or `customizer` functions.
         *
         * @private
         * @param {Object} object The destination object.
         * @param {Object} source The source object.
         * @returns {Object} Returns `object`.
         */
        function baseAssign(object, source) {
            return object && copyObject(source, keys(source), object);
        }

        /**
         * The base implementation of `_.clone` and `_.cloneDeep` which tracks
         * traversed objects.
         *
         * @private
         * @param {*} value The value to clone.
         * @param {boolean} [isDeep] Specify a deep clone.
         * @param {boolean} [isFull] Specify a clone including symbols.
         * @param {Function} [customizer] The function to customize cloning.
         * @param {string} [key] The key of `value`.
         * @param {Object} [object] The parent object of `value`.
         * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
         * @returns {*} Returns the cloned value.
         */
        function baseClone(
            value,
            isDeep,
            isFull,
            customizer,
            key,
            object,
            stack
        ) {
            var result;
            if (customizer) {
                result = object
                    ? customizer(value, key, object, stack)
                    : customizer(value);
            }
            if (result !== undefined) {
                return result;
            }
            if (!isObject(value)) {
                return value;
            }
            var isArr = isArray(value);
            if (isArr) {
                result = initCloneArray(value);
                if (!isDeep) {
                    return copyArray(value, result);
                }
            } else {
                var tag = getTag(value),
                    isFunc = tag == funcTag || tag == genTag;

                if (isBuffer(value)) {
                    return cloneBuffer(value, isDeep);
                }
                if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
                    if (isHostObject(value)) {
                        return object ? value : {};
                    }
                    result = initCloneObject(isFunc ? {} : value);
                    if (!isDeep) {
                        return copySymbols(value, baseAssign(result, value));
                    }
                } else {
                    if (!cloneableTags[tag]) {
                        return object ? value : {};
                    }
                    result = initCloneByTag(value, tag, baseClone, isDeep);
                }
            }
            // Check for circular references and return its corresponding clone.
            stack || (stack = new Stack());
            var stacked = stack.get(value);
            if (stacked) {
                return stacked;
            }
            stack.set(value, result);

            if (!isArr) {
                var props = isFull ? getAllKeys(value) : keys(value);
            }
            arrayEach(props || value, function(subValue, key) {
                if (props) {
                    key = subValue;
                    subValue = value[key];
                }
                // Recursively populate clone (susceptible to call stack limits).
                assignValue(
                    result,
                    key,
                    baseClone(
                        subValue,
                        isDeep,
                        isFull,
                        customizer,
                        key,
                        value,
                        stack
                    )
                );
            });
            return result;
        }

        /**
         * The base implementation of `_.create` without support for assigning
         * properties to the created object.
         *
         * @private
         * @param {Object} prototype The object to inherit from.
         * @returns {Object} Returns the new object.
         */
        function baseCreate(proto) {
            return isObject(proto) ? objectCreate(proto) : {};
        }

        /**
         * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
         * `keysFunc` and `symbolsFunc` to get the enumerable property names and
         * symbols of `object`.
         *
         * @private
         * @param {Object} object The object to query.
         * @param {Function} keysFunc The function to get the keys of `object`.
         * @param {Function} symbolsFunc The function to get the symbols of `object`.
         * @returns {Array} Returns the array of property names and symbols.
         */
        function baseGetAllKeys(object, keysFunc, symbolsFunc) {
            var result = keysFunc(object);
            return isArray(object)
                ? result
                : arrayPush(result, symbolsFunc(object));
        }

        /**
         * The base implementation of `getTag`.
         *
         * @private
         * @param {*} value The value to query.
         * @returns {string} Returns the `toStringTag`.
         */
        function baseGetTag(value) {
            return objectToString.call(value);
        }

        /**
         * The base implementation of `_.isNative` without bad shim checks.
         *
         * @private
         * @param {*} value The value to check.
         * @returns {boolean} Returns `true` if `value` is a native function,
         *  else `false`.
         */
        function baseIsNative(value) {
            if (!isObject(value) || isMasked(value)) {
                return false;
            }
            var pattern =
                isFunction(value) || isHostObject(value)
                    ? reIsNative
                    : reIsHostCtor;
            return pattern.test(toSource(value));
        }

        /**
         * The base implementation of `_.isTypedArray` without Node.js optimizations.
         *
         * @private
         * @param {*} value The value to check.
         * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
         */
        function baseIsTypedArray(value) {
            return (
                isObjectLike(value) &&
                isLength(value.length) &&
                !!typedArrayTags[objectToString.call(value)]
            );
        }

        /**
         * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
         *
         * @private
         * @param {Object} object The object to query.
         * @returns {Array} Returns the array of property names.
         */
        function baseKeys(object) {
            if (!isPrototype(object)) {
                return nativeKeys(object);
            }
            var result = [];
            for (var key in Object(object)) {
                if (hasOwnProperty.call(object, key) && key != 'constructor') {
                    result.push(key);
                }
            }
            return result;
        }

        /**
         * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
         *
         * @private
         * @param {Object} object The object to query.
         * @returns {Array} Returns the array of property names.
         */
        function baseKeysIn(object) {
            if (!isObject(object)) {
                return nativeKeysIn(object);
            }
            var isProto = isPrototype(object),
                result = [];

            for (var key in object) {
                if (
                    !(
                        key == 'constructor' &&
                        (isProto || !hasOwnProperty.call(object, key))
                    )
                ) {
                    result.push(key);
                }
            }
            return result;
        }

        /**
         * The base implementation of `_.merge` without support for multiple sources.
         *
         * @private
         * @param {Object} object The destination object.
         * @param {Object} source The source object.
         * @param {number} srcIndex The index of `source`.
         * @param {Function} [customizer] The function to customize merged values.
         * @param {Object} [stack] Tracks traversed source values and their merged
         *  counterparts.
         */
        function baseMerge(object, source, srcIndex, customizer, stack) {
            if (object === source) {
                return;
            }
            if (!(isArray(source) || isTypedArray(source))) {
                var props = baseKeysIn(source);
            }
            arrayEach(props || source, function(srcValue, key) {
                if (props) {
                    key = srcValue;
                    srcValue = source[key];
                }
                if (isObject(srcValue)) {
                    stack || (stack = new Stack());
                    baseMergeDeep(
                        object,
                        source,
                        key,
                        srcIndex,
                        baseMerge,
                        customizer,
                        stack
                    );
                } else {
                    var newValue = customizer
                        ? customizer(
                              object[key],
                              srcValue,
                              key + '',
                              object,
                              source,
                              stack
                          )
                        : undefined;

                    if (newValue === undefined) {
                        newValue = srcValue;
                    }
                    assignMergeValue(object, key, newValue);
                }
            });
        }

        /**
         * A specialized version of `baseMerge` for arrays and objects which performs
         * deep merges and tracks traversed objects enabling objects with circular
         * references to be merged.
         *
         * @private
         * @param {Object} object The destination object.
         * @param {Object} source The source object.
         * @param {string} key The key of the value to merge.
         * @param {number} srcIndex The index of `source`.
         * @param {Function} mergeFunc The function to merge values.
         * @param {Function} [customizer] The function to customize assigned values.
         * @param {Object} [stack] Tracks traversed source values and their merged
         *  counterparts.
         */
        function baseMergeDeep(
            object,
            source,
            key,
            srcIndex,
            mergeFunc,
            customizer,
            stack
        ) {
            var objValue = object[key],
                srcValue = source[key],
                stacked = stack.get(srcValue);

            if (stacked) {
                assignMergeValue(object, key, stacked);
                return;
            }
            var newValue = customizer
                ? customizer(
                      objValue,
                      srcValue,
                      key + '',
                      object,
                      source,
                      stack
                  )
                : undefined;

            var isCommon = newValue === undefined;

            if (isCommon) {
                newValue = srcValue;
                if (isArray(srcValue) || isTypedArray(srcValue)) {
                    if (isArray(objValue)) {
                        newValue = objValue;
                    } else if (isArrayLikeObject(objValue)) {
                        newValue = copyArray(objValue);
                    } else {
                        isCommon = false;
                        newValue = baseClone(srcValue, true);
                    }
                } else if (isPlainObject(srcValue) || isArguments(srcValue)) {
                    if (isArguments(objValue)) {
                        newValue = toPlainObject(objValue);
                    } else if (
                        !isObject(objValue) ||
                        (srcIndex && isFunction(objValue))
                    ) {
                        isCommon = false;
                        newValue = baseClone(srcValue, true);
                    } else {
                        newValue = objValue;
                    }
                } else {
                    isCommon = false;
                }
            }
            if (isCommon) {
                // Recursively merge objects and arrays (susceptible to call stack limits).
                stack.set(srcValue, newValue);
                mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
                stack['delete'](srcValue);
            }
            assignMergeValue(object, key, newValue);
        }

        /**
         * The base implementation of `_.rest` which doesn't validate or coerce arguments.
         *
         * @private
         * @param {Function} func The function to apply a rest parameter to.
         * @param {number} [start=func.length-1] The start position of the rest parameter.
         * @returns {Function} Returns the new function.
         */
        function baseRest(func, start) {
            start = nativeMax(start === undefined ? func.length - 1 : start, 0);
            return function() {
                var args = arguments,
                    index = -1,
                    length = nativeMax(args.length - start, 0),
                    array = Array(length);

                while (++index < length) {
                    array[index] = args[start + index];
                }
                index = -1;
                var otherArgs = Array(start + 1);
                while (++index < start) {
                    otherArgs[index] = args[index];
                }
                otherArgs[start] = array;
                return apply(func, this, otherArgs);
            };
        }

        /**
         * Creates a clone of  `buffer`.
         *
         * @private
         * @param {Buffer} buffer The buffer to clone.
         * @param {boolean} [isDeep] Specify a deep clone.
         * @returns {Buffer} Returns the cloned buffer.
         */
        function cloneBuffer(buffer, isDeep) {
            if (isDeep) {
                return buffer.slice();
            }
            var result = new buffer.constructor(buffer.length);
            buffer.copy(result);
            return result;
        }

        /**
         * Creates a clone of `arrayBuffer`.
         *
         * @private
         * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
         * @returns {ArrayBuffer} Returns the cloned array buffer.
         */
        function cloneArrayBuffer(arrayBuffer) {
            var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
            new Uint8Array(result).set(new Uint8Array(arrayBuffer));
            return result;
        }

        /**
         * Creates a clone of `dataView`.
         *
         * @private
         * @param {Object} dataView The data view to clone.
         * @param {boolean} [isDeep] Specify a deep clone.
         * @returns {Object} Returns the cloned data view.
         */
        function cloneDataView(dataView, isDeep) {
            var buffer = isDeep
                ? cloneArrayBuffer(dataView.buffer)
                : dataView.buffer;
            return new dataView.constructor(
                buffer,
                dataView.byteOffset,
                dataView.byteLength
            );
        }

        /**
         * Creates a clone of `map`.
         *
         * @private
         * @param {Object} map The map to clone.
         * @param {Function} cloneFunc The function to clone values.
         * @param {boolean} [isDeep] Specify a deep clone.
         * @returns {Object} Returns the cloned map.
         */
        function cloneMap(map, isDeep, cloneFunc) {
            var array = isDeep
                ? cloneFunc(mapToArray(map), true)
                : mapToArray(map);
            return arrayReduce(array, addMapEntry, new map.constructor());
        }

        /**
         * Creates a clone of `regexp`.
         *
         * @private
         * @param {Object} regexp The regexp to clone.
         * @returns {Object} Returns the cloned regexp.
         */
        function cloneRegExp(regexp) {
            var result = new regexp.constructor(
                regexp.source,
                reFlags.exec(regexp)
            );
            result.lastIndex = regexp.lastIndex;
            return result;
        }

        /**
         * Creates a clone of `set`.
         *
         * @private
         * @param {Object} set The set to clone.
         * @param {Function} cloneFunc The function to clone values.
         * @param {boolean} [isDeep] Specify a deep clone.
         * @returns {Object} Returns the cloned set.
         */
        function cloneSet(set, isDeep, cloneFunc) {
            var array = isDeep
                ? cloneFunc(setToArray(set), true)
                : setToArray(set);
            return arrayReduce(array, addSetEntry, new set.constructor());
        }

        /**
         * Creates a clone of the `symbol` object.
         *
         * @private
         * @param {Object} symbol The symbol object to clone.
         * @returns {Object} Returns the cloned symbol object.
         */
        function cloneSymbol(symbol) {
            return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
        }

        /**
         * Creates a clone of `typedArray`.
         *
         * @private
         * @param {Object} typedArray The typed array to clone.
         * @param {boolean} [isDeep] Specify a deep clone.
         * @returns {Object} Returns the cloned typed array.
         */
        function cloneTypedArray(typedArray, isDeep) {
            var buffer = isDeep
                ? cloneArrayBuffer(typedArray.buffer)
                : typedArray.buffer;
            return new typedArray.constructor(
                buffer,
                typedArray.byteOffset,
                typedArray.length
            );
        }

        /**
         * Copies the values of `source` to `array`.
         *
         * @private
         * @param {Array} source The array to copy values from.
         * @param {Array} [array=[]] The array to copy values to.
         * @returns {Array} Returns `array`.
         */
        function copyArray(source, array) {
            var index = -1,
                length = source.length;

            array || (array = Array(length));
            while (++index < length) {
                array[index] = source[index];
            }
            return array;
        }

        /**
         * Copies properties of `source` to `object`.
         *
         * @private
         * @param {Object} source The object to copy properties from.
         * @param {Array} props The property identifiers to copy.
         * @param {Object} [object={}] The object to copy properties to.
         * @param {Function} [customizer] The function to customize copied values.
         * @returns {Object} Returns `object`.
         */
        function copyObject(source, props, object, customizer) {
            object || (object = {});

            var index = -1,
                length = props.length;

            while (++index < length) {
                var key = props[index];

                var newValue = customizer
                    ? customizer(object[key], source[key], key, object, source)
                    : undefined;

                assignValue(
                    object,
                    key,
                    newValue === undefined ? source[key] : newValue
                );
            }
            return object;
        }

        /**
         * Copies own symbol properties of `source` to `object`.
         *
         * @private
         * @param {Object} source The object to copy symbols from.
         * @param {Object} [object={}] The object to copy symbols to.
         * @returns {Object} Returns `object`.
         */
        function copySymbols(source, object) {
            return copyObject(source, getSymbols(source), object);
        }

        /**
         * Creates a function like `_.assign`.
         *
         * @private
         * @param {Function} assigner The function to assign values.
         * @returns {Function} Returns the new assigner function.
         */
        function createAssigner(assigner) {
            return baseRest(function(object, sources) {
                var index = -1,
                    length = sources.length,
                    customizer = length > 1 ? sources[length - 1] : undefined,
                    guard = length > 2 ? sources[2] : undefined;

                customizer =
                    assigner.length > 3 && typeof customizer == 'function'
                        ? (length--, customizer)
                        : undefined;

                if (guard && isIterateeCall(sources[0], sources[1], guard)) {
                    customizer = length < 3 ? undefined : customizer;
                    length = 1;
                }
                object = Object(object);
                while (++index < length) {
                    var source = sources[index];
                    if (source) {
                        assigner(object, source, index, customizer);
                    }
                }
                return object;
            });
        }

        /**
         * Creates an array of own enumerable property names and symbols of `object`.
         *
         * @private
         * @param {Object} object The object to query.
         * @returns {Array} Returns the array of property names and symbols.
         */
        function getAllKeys(object) {
            return baseGetAllKeys(object, keys, getSymbols);
        }

        /**
         * Gets the data for `map`.
         *
         * @private
         * @param {Object} map The map to query.
         * @param {string} key The reference key.
         * @returns {*} Returns the map data.
         */
        function getMapData(map, key) {
            var data = map.__data__;
            return isKeyable(key)
                ? data[typeof key == 'string' ? 'string' : 'hash']
                : data.map;
        }

        /**
         * Gets the native function at `key` of `object`.
         *
         * @private
         * @param {Object} object The object to query.
         * @param {string} key The key of the method to get.
         * @returns {*} Returns the function if it's native, else `undefined`.
         */
        function getNative(object, key) {
            var value = getValue(object, key);
            return baseIsNative(value) ? value : undefined;
        }

        /**
         * Creates an array of the own enumerable symbol properties of `object`.
         *
         * @private
         * @param {Object} object The object to query.
         * @returns {Array} Returns the array of symbols.
         */
        var getSymbols = nativeGetSymbols
            ? overArg(nativeGetSymbols, Object)
            : stubArray;

        /**
         * Gets the `toStringTag` of `value`.
         *
         * @private
         * @param {*} value The value to query.
         * @returns {string} Returns the `toStringTag`.
         */
        var getTag = baseGetTag;

        // Fallback for data views, maps, sets, and weak maps in IE 11,
        // for data views in Edge < 14, and promises in Node.js.
        if (
            (DataView &&
                getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
            (Map && getTag(new Map()) != mapTag) ||
            (Promise && getTag(Promise.resolve()) != promiseTag) ||
            (Set && getTag(new Set()) != setTag) ||
            (WeakMap && getTag(new WeakMap()) != weakMapTag)
        ) {
            getTag = function(value) {
                var result = objectToString.call(value),
                    Ctor = result == objectTag ? value.constructor : undefined,
                    ctorString = Ctor ? toSource(Ctor) : undefined;

                if (ctorString) {
                    switch (ctorString) {
                        case dataViewCtorString:
                            return dataViewTag;
                        case mapCtorString:
                            return mapTag;
                        case promiseCtorString:
                            return promiseTag;
                        case setCtorString:
                            return setTag;
                        case weakMapCtorString:
                            return weakMapTag;
                    }
                }
                return result;
            };
        }

        /**
         * Initializes an array clone.
         *
         * @private
         * @param {Array} array The array to clone.
         * @returns {Array} Returns the initialized clone.
         */
        function initCloneArray(array) {
            var length = array.length,
                result = array.constructor(length);

            // Add properties assigned by `RegExp#exec`.
            if (
                length &&
                typeof array[0] == 'string' &&
                hasOwnProperty.call(array, 'index')
            ) {
                result.index = array.index;
                result.input = array.input;
            }
            return result;
        }

        /**
         * Initializes an object clone.
         *
         * @private
         * @param {Object} object The object to clone.
         * @returns {Object} Returns the initialized clone.
         */
        function initCloneObject(object) {
            return typeof object.constructor == 'function' &&
                !isPrototype(object)
                ? baseCreate(getPrototype(object))
                : {};
        }

        /**
         * Initializes an object clone based on its `toStringTag`.
         *
         * **Note:** This function only supports cloning values with tags of
         * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
         *
         * @private
         * @param {Object} object The object to clone.
         * @param {string} tag The `toStringTag` of the object to clone.
         * @param {Function} cloneFunc The function to clone values.
         * @param {boolean} [isDeep] Specify a deep clone.
         * @returns {Object} Returns the initialized clone.
         */
        function initCloneByTag(object, tag, cloneFunc, isDeep) {
            var Ctor = object.constructor;
            switch (tag) {
                case arrayBufferTag:
                    return cloneArrayBuffer(object);

                case boolTag:
                case dateTag:
                    return new Ctor(+object);

                case dataViewTag:
                    return cloneDataView(object, isDeep);

                case float32Tag:
                case float64Tag:
                case int8Tag:
                case int16Tag:
                case int32Tag:
                case uint8Tag:
                case uint8ClampedTag:
                case uint16Tag:
                case uint32Tag:
                    return cloneTypedArray(object, isDeep);

                case mapTag:
                    return cloneMap(object, isDeep, cloneFunc);

                case numberTag:
                case stringTag:
                    return new Ctor(object);

                case regexpTag:
                    return cloneRegExp(object);

                case setTag:
                    return cloneSet(object, isDeep, cloneFunc);

                case symbolTag:
                    return cloneSymbol(object);
            }
        }

        /**
         * Checks if `value` is a valid array-like index.
         *
         * @private
         * @param {*} value The value to check.
         * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
         * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
         */
        function isIndex(value, length) {
            length = length == null ? MAX_SAFE_INTEGER : length;
            return (
                !!length &&
                (typeof value == 'number' || reIsUint.test(value)) &&
                (value > -1 && value % 1 == 0 && value < length)
            );
        }

        /**
         * Checks if the given arguments are from an iteratee call.
         *
         * @private
         * @param {*} value The potential iteratee value argument.
         * @param {*} index The potential iteratee index or key argument.
         * @param {*} object The potential iteratee object argument.
         * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
         *  else `false`.
         */
        function isIterateeCall(value, index, object) {
            if (!isObject(object)) {
                return false;
            }
            var type = typeof index;
            if (
                type == 'number'
                    ? isArrayLike(object) && isIndex(index, object.length)
                    : type == 'string' && index in object
            ) {
                return eq(object[index], value);
            }
            return false;
        }

        /**
         * Checks if `value` is suitable for use as unique object key.
         *
         * @private
         * @param {*} value The value to check.
         * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
         */
        function isKeyable(value) {
            var type = typeof value;
            return type == 'string' ||
                type == 'number' ||
                type == 'symbol' ||
                type == 'boolean'
                ? value !== '__proto__'
                : value === null;
        }

        /**
         * Checks if `func` has its source masked.
         *
         * @private
         * @param {Function} func The function to check.
         * @returns {boolean} Returns `true` if `func` is masked, else `false`.
         */
        function isMasked(func) {
            return !!maskSrcKey && maskSrcKey in func;
        }

        /**
         * Checks if `value` is likely a prototype object.
         *
         * @private
         * @param {*} value The value to check.
         * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
         */
        function isPrototype(value) {
            var Ctor = value && value.constructor,
                proto =
                    (typeof Ctor == 'function' && Ctor.prototype) ||
                    objectProto;

            return value === proto;
        }

        /**
         * Used by `_.defaultsDeep` to customize its `_.merge` use.
         *
         * @private
         * @param {*} objValue The destination value.
         * @param {*} srcValue The source value.
         * @param {string} key The key of the property to merge.
         * @param {Object} object The parent object of `objValue`.
         * @param {Object} source The parent object of `srcValue`.
         * @param {Object} [stack] Tracks traversed source values and their merged
         *  counterparts.
         * @returns {*} Returns the value to assign.
         */
        function mergeDefaults(objValue, srcValue, key, object, source, stack) {
            if (isObject(objValue) && isObject(srcValue)) {
                // Recursively merge objects and arrays (susceptible to call stack limits).
                stack.set(srcValue, objValue);
                baseMerge(objValue, srcValue, undefined, mergeDefaults, stack);
                stack['delete'](srcValue);
            }
            return objValue;
        }

        /**
         * This function is like
         * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
         * except that it includes inherited enumerable properties.
         *
         * @private
         * @param {Object} object The object to query.
         * @returns {Array} Returns the array of property names.
         */
        function nativeKeysIn(object) {
            var result = [];
            if (object != null) {
                for (var key in Object(object)) {
                    result.push(key);
                }
            }
            return result;
        }

        /**
         * Converts `func` to its source code.
         *
         * @private
         * @param {Function} func The function to process.
         * @returns {string} Returns the source code.
         */
        function toSource(func) {
            if (func != null) {
                try {
                    return funcToString.call(func);
                } catch (e) {}
                try {
                    return func + '';
                } catch (e) {}
            }
            return '';
        }

        /**
         * Performs a
         * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
         * comparison between two values to determine if they are equivalent.
         *
         * @static
         * @memberOf _
         * @since 4.0.0
         * @category Lang
         * @param {*} value The value to compare.
         * @param {*} other The other value to compare.
         * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
         * @example
         *
         * var object = { 'a': 1 };
         * var other = { 'a': 1 };
         *
         * _.eq(object, object);
         * // => true
         *
         * _.eq(object, other);
         * // => false
         *
         * _.eq('a', 'a');
         * // => true
         *
         * _.eq('a', Object('a'));
         * // => false
         *
         * _.eq(NaN, NaN);
         * // => true
         */
        function eq(value, other) {
            return value === other || (value !== value && other !== other);
        }

        /**
         * Checks if `value` is likely an `arguments` object.
         *
         * @static
         * @memberOf _
         * @since 0.1.0
         * @category Lang
         * @param {*} value The value to check.
         * @returns {boolean} Returns `true` if `value` is an `arguments` object,
         *  else `false`.
         * @example
         *
         * _.isArguments(function() { return arguments; }());
         * // => true
         *
         * _.isArguments([1, 2, 3]);
         * // => false
         */
        function isArguments(value) {
            // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
            return (
                isArrayLikeObject(value) &&
                hasOwnProperty.call(value, 'callee') &&
                (!propertyIsEnumerable.call(value, 'callee') ||
                    objectToString.call(value) == argsTag)
            );
        }

        /**
         * Checks if `value` is classified as an `Array` object.
         *
         * @static
         * @memberOf _
         * @since 0.1.0
         * @category Lang
         * @param {*} value The value to check.
         * @returns {boolean} Returns `true` if `value` is an array, else `false`.
         * @example
         *
         * _.isArray([1, 2, 3]);
         * // => true
         *
         * _.isArray(document.body.children);
         * // => false
         *
         * _.isArray('abc');
         * // => false
         *
         * _.isArray(_.noop);
         * // => false
         */
        var isArray = Array.isArray;

        /**
         * Checks if `value` is array-like. A value is considered array-like if it's
         * not a function and has a `value.length` that's an integer greater than or
         * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
         *
         * @static
         * @memberOf _
         * @since 4.0.0
         * @category Lang
         * @param {*} value The value to check.
         * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
         * @example
         *
         * _.isArrayLike([1, 2, 3]);
         * // => true
         *
         * _.isArrayLike(document.body.children);
         * // => true
         *
         * _.isArrayLike('abc');
         * // => true
         *
         * _.isArrayLike(_.noop);
         * // => false
         */
        function isArrayLike(value) {
            return (
                value != null && isLength(value.length) && !isFunction(value)
            );
        }

        /**
         * This method is like `_.isArrayLike` except that it also checks if `value`
         * is an object.
         *
         * @static
         * @memberOf _
         * @since 4.0.0
         * @category Lang
         * @param {*} value The value to check.
         * @returns {boolean} Returns `true` if `value` is an array-like object,
         *  else `false`.
         * @example
         *
         * _.isArrayLikeObject([1, 2, 3]);
         * // => true
         *
         * _.isArrayLikeObject(document.body.children);
         * // => true
         *
         * _.isArrayLikeObject('abc');
         * // => false
         *
         * _.isArrayLikeObject(_.noop);
         * // => false
         */
        function isArrayLikeObject(value) {
            return isObjectLike(value) && isArrayLike(value);
        }

        /**
         * Checks if `value` is a buffer.
         *
         * @static
         * @memberOf _
         * @since 4.3.0
         * @category Lang
         * @param {*} value The value to check.
         * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
         * @example
         *
         * _.isBuffer(new Buffer(2));
         * // => true
         *
         * _.isBuffer(new Uint8Array(2));
         * // => false
         */
        var isBuffer = nativeIsBuffer || stubFalse;

        /**
         * Checks if `value` is classified as a `Function` object.
         *
         * @static
         * @memberOf _
         * @since 0.1.0
         * @category Lang
         * @param {*} value The value to check.
         * @returns {boolean} Returns `true` if `value` is a function, else `false`.
         * @example
         *
         * _.isFunction(_);
         * // => true
         *
         * _.isFunction(/abc/);
         * // => false
         */
        function isFunction(value) {
            // The use of `Object#toString` avoids issues with the `typeof` operator
            // in Safari 8-9 which returns 'object' for typed array and other constructors.
            var tag = isObject(value) ? objectToString.call(value) : '';
            return tag == funcTag || tag == genTag;
        }

        /**
         * Checks if `value` is a valid array-like length.
         *
         * **Note:** This method is loosely based on
         * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
         *
         * @static
         * @memberOf _
         * @since 4.0.0
         * @category Lang
         * @param {*} value The value to check.
         * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
         * @example
         *
         * _.isLength(3);
         * // => true
         *
         * _.isLength(Number.MIN_VALUE);
         * // => false
         *
         * _.isLength(Infinity);
         * // => false
         *
         * _.isLength('3');
         * // => false
         */
        function isLength(value) {
            return (
                typeof value == 'number' &&
                value > -1 &&
                value % 1 == 0 &&
                value <= MAX_SAFE_INTEGER
            );
        }

        /**
         * Checks if `value` is the
         * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
         * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
         *
         * @static
         * @memberOf _
         * @since 0.1.0
         * @category Lang
         * @param {*} value The value to check.
         * @returns {boolean} Returns `true` if `value` is an object, else `false`.
         * @example
         *
         * _.isObject({});
         * // => true
         *
         * _.isObject([1, 2, 3]);
         * // => true
         *
         * _.isObject(_.noop);
         * // => true
         *
         * _.isObject(null);
         * // => false
         */
        function isObject(value) {
            var type = typeof value;
            return !!value && (type == 'object' || type == 'function');
        }

        /**
         * Checks if `value` is object-like. A value is object-like if it's not `null`
         * and has a `typeof` result of "object".
         *
         * @static
         * @memberOf _
         * @since 4.0.0
         * @category Lang
         * @param {*} value The value to check.
         * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
         * @example
         *
         * _.isObjectLike({});
         * // => true
         *
         * _.isObjectLike([1, 2, 3]);
         * // => true
         *
         * _.isObjectLike(_.noop);
         * // => false
         *
         * _.isObjectLike(null);
         * // => false
         */
        function isObjectLike(value) {
            return !!value && typeof value == 'object';
        }

        /**
         * Checks if `value` is a plain object, that is, an object created by the
         * `Object` constructor or one with a `[[Prototype]]` of `null`.
         *
         * @static
         * @memberOf _
         * @since 0.8.0
         * @category Lang
         * @param {*} value The value to check.
         * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
         * @example
         *
         * function Foo() {
         *   this.a = 1;
         * }
         *
         * _.isPlainObject(new Foo);
         * // => false
         *
         * _.isPlainObject([1, 2, 3]);
         * // => false
         *
         * _.isPlainObject({ 'x': 0, 'y': 0 });
         * // => true
         *
         * _.isPlainObject(Object.create(null));
         * // => true
         */
        function isPlainObject(value) {
            if (
                !isObjectLike(value) ||
                objectToString.call(value) != objectTag ||
                isHostObject(value)
            ) {
                return false;
            }
            var proto = getPrototype(value);
            if (proto === null) {
                return true;
            }
            var Ctor =
                hasOwnProperty.call(proto, 'constructor') && proto.constructor;
            return (
                typeof Ctor == 'function' &&
                Ctor instanceof Ctor &&
                funcToString.call(Ctor) == objectCtorString
            );
        }

        /**
         * Checks if `value` is classified as a typed array.
         *
         * @static
         * @memberOf _
         * @since 3.0.0
         * @category Lang
         * @param {*} value The value to check.
         * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
         * @example
         *
         * _.isTypedArray(new Uint8Array);
         * // => true
         *
         * _.isTypedArray([]);
         * // => false
         */
        var isTypedArray = nodeIsTypedArray
            ? baseUnary(nodeIsTypedArray)
            : baseIsTypedArray;

        /**
         * Converts `value` to a plain object flattening inherited enumerable string
         * keyed properties of `value` to own properties of the plain object.
         *
         * @static
         * @memberOf _
         * @since 3.0.0
         * @category Lang
         * @param {*} value The value to convert.
         * @returns {Object} Returns the converted plain object.
         * @example
         *
         * function Foo() {
         *   this.b = 2;
         * }
         *
         * Foo.prototype.c = 3;
         *
         * _.assign({ 'a': 1 }, new Foo);
         * // => { 'a': 1, 'b': 2 }
         *
         * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
         * // => { 'a': 1, 'b': 2, 'c': 3 }
         */
        function toPlainObject(value) {
            return copyObject(value, keysIn(value));
        }

        /**
         * This method is like `_.defaults` except that it recursively assigns
         * default properties.
         *
         * **Note:** This method mutates `object`.
         *
         * @static
         * @memberOf _
         * @since 3.10.0
         * @category Object
         * @param {Object} object The destination object.
         * @param {...Object} [sources] The source objects.
         * @returns {Object} Returns `object`.
         * @see _.defaults
         * @example
         *
         * _.defaultsDeep({ 'a': { 'b': 2 } }, { 'a': { 'b': 1, 'c': 3 } });
         * // => { 'a': { 'b': 2, 'c': 3 } }
         */
        var defaultsDeep = baseRest(function(args) {
            args.push(undefined, mergeDefaults);
            return apply(mergeWith, undefined, args);
        });

        /**
         * Creates an array of the own enumerable property names of `object`.
         *
         * **Note:** Non-object values are coerced to objects. See the
         * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
         * for more details.
         *
         * @static
         * @since 0.1.0
         * @memberOf _
         * @category Object
         * @param {Object} object The object to query.
         * @returns {Array} Returns the array of property names.
         * @example
         *
         * function Foo() {
         *   this.a = 1;
         *   this.b = 2;
         * }
         *
         * Foo.prototype.c = 3;
         *
         * _.keys(new Foo);
         * // => ['a', 'b'] (iteration order is not guaranteed)
         *
         * _.keys('hi');
         * // => ['0', '1']
         */
        function keys(object) {
            return isArrayLike(object)
                ? arrayLikeKeys(object)
                : baseKeys(object);
        }

        /**
         * Creates an array of the own and inherited enumerable property names of `object`.
         *
         * **Note:** Non-object values are coerced to objects.
         *
         * @static
         * @memberOf _
         * @since 3.0.0
         * @category Object
         * @param {Object} object The object to query.
         * @returns {Array} Returns the array of property names.
         * @example
         *
         * function Foo() {
         *   this.a = 1;
         *   this.b = 2;
         * }
         *
         * Foo.prototype.c = 3;
         *
         * _.keysIn(new Foo);
         * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
         */
        function keysIn(object) {
            return isArrayLike(object)
                ? arrayLikeKeys(object, true)
                : baseKeysIn(object);
        }

        /**
         * This method is like `_.merge` except that it accepts `customizer` which
         * is invoked to produce the merged values of the destination and source
         * properties. If `customizer` returns `undefined`, merging is handled by the
         * method instead. The `customizer` is invoked with seven arguments:
         * (objValue, srcValue, key, object, source, stack).
         *
         * **Note:** This method mutates `object`.
         *
         * @static
         * @memberOf _
         * @since 4.0.0
         * @category Object
         * @param {Object} object The destination object.
         * @param {...Object} sources The source objects.
         * @param {Function} customizer The function to customize assigned values.
         * @returns {Object} Returns `object`.
         * @example
         *
         * function customizer(objValue, srcValue) {
         *   if (_.isArray(objValue)) {
         *     return objValue.concat(srcValue);
         *   }
         * }
         *
         * var object = { 'a': [1], 'b': [2] };
         * var other = { 'a': [3], 'b': [4] };
         *
         * _.mergeWith(object, other, customizer);
         * // => { 'a': [1, 3], 'b': [2, 4] }
         */
        var mergeWith = createAssigner(function(
            object,
            source,
            srcIndex,
            customizer
        ) {
            baseMerge(object, source, srcIndex, customizer);
        });

        /**
         * This method returns a new empty array.
         *
         * @static
         * @memberOf _
         * @since 4.13.0
         * @category Util
         * @returns {Array} Returns the new empty array.
         * @example
         *
         * var arrays = _.times(2, _.stubArray);
         *
         * console.log(arrays);
         * // => [[], []]
         *
         * console.log(arrays[0] === arrays[1]);
         * // => false
         */
        function stubArray() {
            return [];
        }

        /**
         * This method returns `false`.
         *
         * @static
         * @memberOf _
         * @since 4.13.0
         * @category Util
         * @returns {boolean} Returns `false`.
         * @example
         *
         * _.times(2, _.stubFalse);
         * // => [false, false]
         */
        function stubFalse() {
            return false;
        }

        module.exports = defaultsDeep;
    });

    var t0 = new Date();
    var t1 = new Date();

    function newInterval(floori, offseti, count, field) {
        function interval(date) {
            return floori((date = new Date(+date))), date;
        }

        interval.floor = interval;

        interval.ceil = function(date) {
            return (
                floori((date = new Date(date - 1))),
                offseti(date, 1),
                floori(date),
                date
            );
        };

        interval.round = function(date) {
            var d0 = interval(date),
                d1 = interval.ceil(date);
            return date - d0 < d1 - date ? d0 : d1;
        };

        interval.offset = function(date, step) {
            return (
                offseti(
                    (date = new Date(+date)),
                    step == null ? 1 : Math.floor(step)
                ),
                date
            );
        };

        interval.range = function(start, stop, step) {
            var range = [],
                previous;
            start = interval.ceil(start);
            step = step == null ? 1 : Math.floor(step);
            if (!(start < stop) || !(step > 0)) return range; // also handles Invalid Date
            do
                range.push((previous = new Date(+start))),
                    offseti(start, step),
                    floori(start);
            while (previous < start && start < stop);
            return range;
        };

        interval.filter = function(test) {
            return newInterval(
                function(date) {
                    if (date >= date)
                        while ((floori(date), !test(date)))
                            date.setTime(date - 1);
                },
                function(date, step) {
                    if (date >= date) {
                        if (step < 0)
                            while (++step <= 0) {
                                while ((offseti(date, -1), !test(date))) {} // eslint-disable-line no-empty
                            }
                        else
                            while (--step >= 0) {
                                while ((offseti(date, +1), !test(date))) {} // eslint-disable-line no-empty
                            }
                    }
                }
            );
        };

        if (count) {
            interval.count = function(start, end) {
                t0.setTime(+start), t1.setTime(+end);
                floori(t0), floori(t1);
                return Math.floor(count(t0, t1));
            };

            interval.every = function(step) {
                step = Math.floor(step);
                return !isFinite(step) || !(step > 0)
                    ? null
                    : !(step > 1)
                        ? interval
                        : interval.filter(
                              field
                                  ? function(d) {
                                        return field(d) % step === 0;
                                    }
                                  : function(d) {
                                        return (
                                            interval.count(0, d) % step === 0
                                        );
                                    }
                          );
            };
        }

        return interval;
    }

    var millisecond = newInterval(
        function() {
            // noop
        },
        function(date, step) {
            date.setTime(+date + step);
        },
        function(start, end) {
            return end - start;
        }
    );

    // An optimized implementation for this simple case.
    millisecond.every = function(k) {
        k = Math.floor(k);
        if (!isFinite(k) || !(k > 0)) return null;
        if (!(k > 1)) return millisecond;
        return newInterval(
            function(date) {
                date.setTime(Math.floor(date / k) * k);
            },
            function(date, step) {
                date.setTime(+date + step * k);
            },
            function(start, end) {
                return (end - start) / k;
            }
        );
    };

    var durationSecond = 1e3;
    var durationMinute = 6e4;
    var durationHour = 36e5;
    var durationDay = 864e5;
    var durationWeek = 6048e5;

    var second = newInterval(
        function(date) {
            date.setTime(Math.floor(date / durationSecond) * durationSecond);
        },
        function(date, step) {
            date.setTime(+date + step * durationSecond);
        },
        function(start, end) {
            return (end - start) / durationSecond;
        },
        function(date) {
            return date.getUTCSeconds();
        }
    );

    var minute = newInterval(
        function(date) {
            date.setTime(Math.floor(date / durationMinute) * durationMinute);
        },
        function(date, step) {
            date.setTime(+date + step * durationMinute);
        },
        function(start, end) {
            return (end - start) / durationMinute;
        },
        function(date) {
            return date.getMinutes();
        }
    );

    var hour = newInterval(
        function(date) {
            var offset =
                (date.getTimezoneOffset() * durationMinute) % durationHour;
            if (offset < 0) offset += durationHour;
            date.setTime(
                Math.floor((+date - offset) / durationHour) * durationHour +
                    offset
            );
        },
        function(date, step) {
            date.setTime(+date + step * durationHour);
        },
        function(start, end) {
            return (end - start) / durationHour;
        },
        function(date) {
            return date.getHours();
        }
    );

    var day = newInterval(
        function(date) {
            date.setHours(0, 0, 0, 0);
        },
        function(date, step) {
            date.setDate(date.getDate() + step);
        },
        function(start, end) {
            return (
                (end -
                    start -
                    (end.getTimezoneOffset() - start.getTimezoneOffset()) *
                        durationMinute) /
                durationDay
            );
        },
        function(date) {
            return date.getDate() - 1;
        }
    );

    function weekday(i) {
        return newInterval(
            function(date) {
                date.setDate(date.getDate() - (date.getDay() + 7 - i) % 7);
                date.setHours(0, 0, 0, 0);
            },
            function(date, step) {
                date.setDate(date.getDate() + step * 7);
            },
            function(start, end) {
                return (
                    (end -
                        start -
                        (end.getTimezoneOffset() - start.getTimezoneOffset()) *
                            durationMinute) /
                    durationWeek
                );
            }
        );
    }

    var sunday = weekday(0);
    var monday = weekday(1);
    var tuesday = weekday(2);
    var wednesday = weekday(3);
    var thursday = weekday(4);
    var friday = weekday(5);
    var saturday = weekday(6);

    var month = newInterval(
        function(date) {
            date.setDate(1);
            date.setHours(0, 0, 0, 0);
        },
        function(date, step) {
            date.setMonth(date.getMonth() + step);
        },
        function(start, end) {
            return (
                end.getMonth() -
                start.getMonth() +
                (end.getFullYear() - start.getFullYear()) * 12
            );
        },
        function(date) {
            return date.getMonth();
        }
    );

    var year = newInterval(
        function(date) {
            date.setMonth(0, 1);
            date.setHours(0, 0, 0, 0);
        },
        function(date, step) {
            date.setFullYear(date.getFullYear() + step);
        },
        function(start, end) {
            return end.getFullYear() - start.getFullYear();
        },
        function(date) {
            return date.getFullYear();
        }
    );

    // An optimized implementation for this simple case.
    year.every = function(k) {
        return !isFinite((k = Math.floor(k))) || !(k > 0)
            ? null
            : newInterval(
                  function(date) {
                      date.setFullYear(Math.floor(date.getFullYear() / k) * k);
                      date.setMonth(0, 1);
                      date.setHours(0, 0, 0, 0);
                  },
                  function(date, step) {
                      date.setFullYear(date.getFullYear() + step * k);
                  }
              );
    };

    var utcMinute = newInterval(
        function(date) {
            date.setUTCSeconds(0, 0);
        },
        function(date, step) {
            date.setTime(+date + step * durationMinute);
        },
        function(start, end) {
            return (end - start) / durationMinute;
        },
        function(date) {
            return date.getUTCMinutes();
        }
    );

    var utcHour = newInterval(
        function(date) {
            date.setUTCMinutes(0, 0, 0);
        },
        function(date, step) {
            date.setTime(+date + step * durationHour);
        },
        function(start, end) {
            return (end - start) / durationHour;
        },
        function(date) {
            return date.getUTCHours();
        }
    );

    var utcDay = newInterval(
        function(date) {
            date.setUTCHours(0, 0, 0, 0);
        },
        function(date, step) {
            date.setUTCDate(date.getUTCDate() + step);
        },
        function(start, end) {
            return (end - start) / durationDay;
        },
        function(date) {
            return date.getUTCDate() - 1;
        }
    );

    function utcWeekday(i) {
        return newInterval(
            function(date) {
                date.setUTCDate(
                    date.getUTCDate() - (date.getUTCDay() + 7 - i) % 7
                );
                date.setUTCHours(0, 0, 0, 0);
            },
            function(date, step) {
                date.setUTCDate(date.getUTCDate() + step * 7);
            },
            function(start, end) {
                return (end - start) / durationWeek;
            }
        );
    }

    var utcSunday = utcWeekday(0);
    var utcMonday = utcWeekday(1);
    var utcTuesday = utcWeekday(2);
    var utcWednesday = utcWeekday(3);
    var utcThursday = utcWeekday(4);
    var utcFriday = utcWeekday(5);
    var utcSaturday = utcWeekday(6);

    var utcMonth = newInterval(
        function(date) {
            date.setUTCDate(1);
            date.setUTCHours(0, 0, 0, 0);
        },
        function(date, step) {
            date.setUTCMonth(date.getUTCMonth() + step);
        },
        function(start, end) {
            return (
                end.getUTCMonth() -
                start.getUTCMonth() +
                (end.getUTCFullYear() - start.getUTCFullYear()) * 12
            );
        },
        function(date) {
            return date.getUTCMonth();
        }
    );

    var utcYear = newInterval(
        function(date) {
            date.setUTCMonth(0, 1);
            date.setUTCHours(0, 0, 0, 0);
        },
        function(date, step) {
            date.setUTCFullYear(date.getUTCFullYear() + step);
        },
        function(start, end) {
            return end.getUTCFullYear() - start.getUTCFullYear();
        },
        function(date) {
            return date.getUTCFullYear();
        }
    );

    // An optimized implementation for this simple case.
    utcYear.every = function(k) {
        return !isFinite((k = Math.floor(k))) || !(k > 0)
            ? null
            : newInterval(
                  function(date) {
                      date.setUTCFullYear(
                          Math.floor(date.getUTCFullYear() / k) * k
                      );
                      date.setUTCMonth(0, 1);
                      date.setUTCHours(0, 0, 0, 0);
                  },
                  function(date, step) {
                      date.setUTCFullYear(date.getUTCFullYear() + step * k);
                  }
              );
    };

    function localDate(d) {
        if (0 <= d.y && d.y < 100) {
            var date = new Date(-1, d.m, d.d, d.H, d.M, d.S, d.L);
            date.setFullYear(d.y);
            return date;
        }
        return new Date(d.y, d.m, d.d, d.H, d.M, d.S, d.L);
    }

    function utcDate(d) {
        if (0 <= d.y && d.y < 100) {
            var date = new Date(Date.UTC(-1, d.m, d.d, d.H, d.M, d.S, d.L));
            date.setUTCFullYear(d.y);
            return date;
        }
        return new Date(Date.UTC(d.y, d.m, d.d, d.H, d.M, d.S, d.L));
    }

    function newYear(y) {
        return { y: y, m: 0, d: 1, H: 0, M: 0, S: 0, L: 0 };
    }

    function formatLocale(locale) {
        var locale_dateTime = locale.dateTime,
            locale_date = locale.date,
            locale_time = locale.time,
            locale_periods = locale.periods,
            locale_weekdays = locale.days,
            locale_shortWeekdays = locale.shortDays,
            locale_months = locale.months,
            locale_shortMonths = locale.shortMonths;

        var periodRe = formatRe(locale_periods),
            periodLookup = formatLookup(locale_periods),
            weekdayRe = formatRe(locale_weekdays),
            weekdayLookup = formatLookup(locale_weekdays),
            shortWeekdayRe = formatRe(locale_shortWeekdays),
            shortWeekdayLookup = formatLookup(locale_shortWeekdays),
            monthRe = formatRe(locale_months),
            monthLookup = formatLookup(locale_months),
            shortMonthRe = formatRe(locale_shortMonths),
            shortMonthLookup = formatLookup(locale_shortMonths);

        var formats = {
            a: formatShortWeekday,
            A: formatWeekday,
            b: formatShortMonth,
            B: formatMonth,
            c: null,
            d: formatDayOfMonth,
            e: formatDayOfMonth,
            f: formatMicroseconds,
            H: formatHour24,
            I: formatHour12,
            j: formatDayOfYear,
            L: formatMilliseconds,
            m: formatMonthNumber,
            M: formatMinutes,
            p: formatPeriod,
            Q: formatUnixTimestamp,
            s: formatUnixTimestampSeconds,
            S: formatSeconds,
            u: formatWeekdayNumberMonday,
            U: formatWeekNumberSunday,
            V: formatWeekNumberISO,
            w: formatWeekdayNumberSunday,
            W: formatWeekNumberMonday,
            x: null,
            X: null,
            y: formatYear,
            Y: formatFullYear,
            Z: formatZone,
            '%': formatLiteralPercent,
        };

        var utcFormats = {
            a: formatUTCShortWeekday,
            A: formatUTCWeekday,
            b: formatUTCShortMonth,
            B: formatUTCMonth,
            c: null,
            d: formatUTCDayOfMonth,
            e: formatUTCDayOfMonth,
            f: formatUTCMicroseconds,
            H: formatUTCHour24,
            I: formatUTCHour12,
            j: formatUTCDayOfYear,
            L: formatUTCMilliseconds,
            m: formatUTCMonthNumber,
            M: formatUTCMinutes,
            p: formatUTCPeriod,
            Q: formatUnixTimestamp,
            s: formatUnixTimestampSeconds,
            S: formatUTCSeconds,
            u: formatUTCWeekdayNumberMonday,
            U: formatUTCWeekNumberSunday,
            V: formatUTCWeekNumberISO,
            w: formatUTCWeekdayNumberSunday,
            W: formatUTCWeekNumberMonday,
            x: null,
            X: null,
            y: formatUTCYear,
            Y: formatUTCFullYear,
            Z: formatUTCZone,
            '%': formatLiteralPercent,
        };

        var parses = {
            a: parseShortWeekday,
            A: parseWeekday,
            b: parseShortMonth,
            B: parseMonth,
            c: parseLocaleDateTime,
            d: parseDayOfMonth,
            e: parseDayOfMonth,
            f: parseMicroseconds,
            H: parseHour24,
            I: parseHour24,
            j: parseDayOfYear,
            L: parseMilliseconds,
            m: parseMonthNumber,
            M: parseMinutes,
            p: parsePeriod,
            Q: parseUnixTimestamp,
            s: parseUnixTimestampSeconds,
            S: parseSeconds,
            u: parseWeekdayNumberMonday,
            U: parseWeekNumberSunday,
            V: parseWeekNumberISO,
            w: parseWeekdayNumberSunday,
            W: parseWeekNumberMonday,
            x: parseLocaleDate,
            X: parseLocaleTime,
            y: parseYear,
            Y: parseFullYear,
            Z: parseZone,
            '%': parseLiteralPercent,
        };

        // These recursive directive definitions must be deferred.
        formats.x = newFormat(locale_date, formats);
        formats.X = newFormat(locale_time, formats);
        formats.c = newFormat(locale_dateTime, formats);
        utcFormats.x = newFormat(locale_date, utcFormats);
        utcFormats.X = newFormat(locale_time, utcFormats);
        utcFormats.c = newFormat(locale_dateTime, utcFormats);

        function newFormat(specifier, formats) {
            return function(date) {
                var string = [],
                    i = -1,
                    j = 0,
                    n = specifier.length,
                    c,
                    pad,
                    format;

                if (!(date instanceof Date)) date = new Date(+date);

                while (++i < n) {
                    if (specifier.charCodeAt(i) === 37) {
                        string.push(specifier.slice(j, i));
                        if ((pad = pads[(c = specifier.charAt(++i))]) != null)
                            c = specifier.charAt(++i);
                        else pad = c === 'e' ? ' ' : '0';
                        if ((format = formats[c])) c = format(date, pad);
                        string.push(c);
                        j = i + 1;
                    }
                }

                string.push(specifier.slice(j, i));
                return string.join('');
            };
        }

        function newParse(specifier, newDate) {
            return function(string) {
                var d = newYear(1900),
                    i = parseSpecifier(d, specifier, (string += ''), 0),
                    week,
                    day$$1;
                if (i != string.length) return null;

                // If a UNIX timestamp is specified, return it.
                if ('Q' in d) return new Date(d.Q);

                // The am-pm flag is 0 for AM, and 1 for PM.
                if ('p' in d) d.H = d.H % 12 + d.p * 12;

                // Convert day-of-week and week-of-year to day-of-year.
                if ('V' in d) {
                    if (d.V < 1 || d.V > 53) return null;
                    if (!('w' in d)) d.w = 1;
                    if ('Z' in d) {
                        (week = utcDate(newYear(d.y))),
                            (day$$1 = week.getUTCDay());
                        week =
                            day$$1 > 4 || day$$1 === 0
                                ? utcMonday.ceil(week)
                                : utcMonday(week);
                        week = utcDay.offset(week, (d.V - 1) * 7);
                        d.y = week.getUTCFullYear();
                        d.m = week.getUTCMonth();
                        d.d = week.getUTCDate() + (d.w + 6) % 7;
                    } else {
                        (week = newDate(newYear(d.y))),
                            (day$$1 = week.getDay());
                        week =
                            day$$1 > 4 || day$$1 === 0
                                ? monday.ceil(week)
                                : monday(week);
                        week = day.offset(week, (d.V - 1) * 7);
                        d.y = week.getFullYear();
                        d.m = week.getMonth();
                        d.d = week.getDate() + (d.w + 6) % 7;
                    }
                } else if ('W' in d || 'U' in d) {
                    if (!('w' in d))
                        d.w = 'u' in d ? d.u % 7 : 'W' in d ? 1 : 0;
                    day$$1 =
                        'Z' in d
                            ? utcDate(newYear(d.y)).getUTCDay()
                            : newDate(newYear(d.y)).getDay();
                    d.m = 0;
                    d.d =
                        'W' in d
                            ? (d.w + 6) % 7 + d.W * 7 - (day$$1 + 5) % 7
                            : d.w + d.U * 7 - (day$$1 + 6) % 7;
                }

                // If a time zone is specified, all fields are interpreted as UTC and then
                // offset according to the specified time zone.
                if ('Z' in d) {
                    d.H += (d.Z / 100) | 0;
                    d.M += d.Z % 100;
                    return utcDate(d);
                }

                // Otherwise, all fields are in local time.
                return newDate(d);
            };
        }

        function parseSpecifier(d, specifier, string, j) {
            var i = 0,
                n = specifier.length,
                m = string.length,
                c,
                parse;

            while (i < n) {
                if (j >= m) return -1;
                c = specifier.charCodeAt(i++);
                if (c === 37) {
                    c = specifier.charAt(i++);
                    parse = parses[c in pads ? specifier.charAt(i++) : c];
                    if (!parse || (j = parse(d, string, j)) < 0) return -1;
                } else if (c != string.charCodeAt(j++)) {
                    return -1;
                }
            }

            return j;
        }

        function parsePeriod(d, string, i) {
            var n = periodRe.exec(string.slice(i));
            return n
                ? ((d.p = periodLookup[n[0].toLowerCase()]), i + n[0].length)
                : -1;
        }

        function parseShortWeekday(d, string, i) {
            var n = shortWeekdayRe.exec(string.slice(i));
            return n
                ? ((d.w = shortWeekdayLookup[n[0].toLowerCase()]),
                  i + n[0].length)
                : -1;
        }

        function parseWeekday(d, string, i) {
            var n = weekdayRe.exec(string.slice(i));
            return n
                ? ((d.w = weekdayLookup[n[0].toLowerCase()]), i + n[0].length)
                : -1;
        }

        function parseShortMonth(d, string, i) {
            var n = shortMonthRe.exec(string.slice(i));
            return n
                ? ((d.m = shortMonthLookup[n[0].toLowerCase()]),
                  i + n[0].length)
                : -1;
        }

        function parseMonth(d, string, i) {
            var n = monthRe.exec(string.slice(i));
            return n
                ? ((d.m = monthLookup[n[0].toLowerCase()]), i + n[0].length)
                : -1;
        }

        function parseLocaleDateTime(d, string, i) {
            return parseSpecifier(d, locale_dateTime, string, i);
        }

        function parseLocaleDate(d, string, i) {
            return parseSpecifier(d, locale_date, string, i);
        }

        function parseLocaleTime(d, string, i) {
            return parseSpecifier(d, locale_time, string, i);
        }

        function formatShortWeekday(d) {
            return locale_shortWeekdays[d.getDay()];
        }

        function formatWeekday(d) {
            return locale_weekdays[d.getDay()];
        }

        function formatShortMonth(d) {
            return locale_shortMonths[d.getMonth()];
        }

        function formatMonth(d) {
            return locale_months[d.getMonth()];
        }

        function formatPeriod(d) {
            return locale_periods[+(d.getHours() >= 12)];
        }

        function formatUTCShortWeekday(d) {
            return locale_shortWeekdays[d.getUTCDay()];
        }

        function formatUTCWeekday(d) {
            return locale_weekdays[d.getUTCDay()];
        }

        function formatUTCShortMonth(d) {
            return locale_shortMonths[d.getUTCMonth()];
        }

        function formatUTCMonth(d) {
            return locale_months[d.getUTCMonth()];
        }

        function formatUTCPeriod(d) {
            return locale_periods[+(d.getUTCHours() >= 12)];
        }

        return {
            format: function(specifier) {
                var f = newFormat((specifier += ''), formats);
                f.toString = function() {
                    return specifier;
                };
                return f;
            },
            parse: function(specifier) {
                var p = newParse((specifier += ''), localDate);
                p.toString = function() {
                    return specifier;
                };
                return p;
            },
            utcFormat: function(specifier) {
                var f = newFormat((specifier += ''), utcFormats);
                f.toString = function() {
                    return specifier;
                };
                return f;
            },
            utcParse: function(specifier) {
                var p = newParse(specifier, utcDate);
                p.toString = function() {
                    return specifier;
                };
                return p;
            },
        };
    }

    var pads = { '-': '', _: ' ', '0': '0' };
    var numberRe = /^\s*\d+/;
    var percentRe = /^%/;
    var requoteRe = /[\\^$*+?|[\]().{}]/g;

    function pad(value, fill, width) {
        var sign = value < 0 ? '-' : '',
            string = (sign ? -value : value) + '',
            length = string.length;
        return (
            sign +
            (length < width
                ? new Array(width - length + 1).join(fill) + string
                : string)
        );
    }

    function requote(s) {
        return s.replace(requoteRe, '\\$&');
    }

    function formatRe(names) {
        return new RegExp('^(?:' + names.map(requote).join('|') + ')', 'i');
    }

    function formatLookup(names) {
        var map = {},
            i = -1,
            n = names.length;
        while (++i < n) map[names[i].toLowerCase()] = i;
        return map;
    }

    function parseWeekdayNumberSunday(d, string, i) {
        var n = numberRe.exec(string.slice(i, i + 1));
        return n ? ((d.w = +n[0]), i + n[0].length) : -1;
    }

    function parseWeekdayNumberMonday(d, string, i) {
        var n = numberRe.exec(string.slice(i, i + 1));
        return n ? ((d.u = +n[0]), i + n[0].length) : -1;
    }

    function parseWeekNumberSunday(d, string, i) {
        var n = numberRe.exec(string.slice(i, i + 2));
        return n ? ((d.U = +n[0]), i + n[0].length) : -1;
    }

    function parseWeekNumberISO(d, string, i) {
        var n = numberRe.exec(string.slice(i, i + 2));
        return n ? ((d.V = +n[0]), i + n[0].length) : -1;
    }

    function parseWeekNumberMonday(d, string, i) {
        var n = numberRe.exec(string.slice(i, i + 2));
        return n ? ((d.W = +n[0]), i + n[0].length) : -1;
    }

    function parseFullYear(d, string, i) {
        var n = numberRe.exec(string.slice(i, i + 4));
        return n ? ((d.y = +n[0]), i + n[0].length) : -1;
    }

    function parseYear(d, string, i) {
        var n = numberRe.exec(string.slice(i, i + 2));
        return n
            ? ((d.y = +n[0] + (+n[0] > 68 ? 1900 : 2000)), i + n[0].length)
            : -1;
    }

    function parseZone(d, string, i) {
        var n = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(string.slice(i, i + 6));
        return n
            ? ((d.Z = n[1] ? 0 : -(n[2] + (n[3] || '00'))), i + n[0].length)
            : -1;
    }

    function parseMonthNumber(d, string, i) {
        var n = numberRe.exec(string.slice(i, i + 2));
        return n ? ((d.m = n[0] - 1), i + n[0].length) : -1;
    }

    function parseDayOfMonth(d, string, i) {
        var n = numberRe.exec(string.slice(i, i + 2));
        return n ? ((d.d = +n[0]), i + n[0].length) : -1;
    }

    function parseDayOfYear(d, string, i) {
        var n = numberRe.exec(string.slice(i, i + 3));
        return n ? ((d.m = 0), (d.d = +n[0]), i + n[0].length) : -1;
    }

    function parseHour24(d, string, i) {
        var n = numberRe.exec(string.slice(i, i + 2));
        return n ? ((d.H = +n[0]), i + n[0].length) : -1;
    }

    function parseMinutes(d, string, i) {
        var n = numberRe.exec(string.slice(i, i + 2));
        return n ? ((d.M = +n[0]), i + n[0].length) : -1;
    }

    function parseSeconds(d, string, i) {
        var n = numberRe.exec(string.slice(i, i + 2));
        return n ? ((d.S = +n[0]), i + n[0].length) : -1;
    }

    function parseMilliseconds(d, string, i) {
        var n = numberRe.exec(string.slice(i, i + 3));
        return n ? ((d.L = +n[0]), i + n[0].length) : -1;
    }

    function parseMicroseconds(d, string, i) {
        var n = numberRe.exec(string.slice(i, i + 6));
        return n ? ((d.L = Math.floor(n[0] / 1000)), i + n[0].length) : -1;
    }

    function parseLiteralPercent(d, string, i) {
        var n = percentRe.exec(string.slice(i, i + 1));
        return n ? i + n[0].length : -1;
    }

    function parseUnixTimestamp(d, string, i) {
        var n = numberRe.exec(string.slice(i));
        return n ? ((d.Q = +n[0]), i + n[0].length) : -1;
    }

    function parseUnixTimestampSeconds(d, string, i) {
        var n = numberRe.exec(string.slice(i));
        return n ? ((d.Q = +n[0] * 1000), i + n[0].length) : -1;
    }

    function formatDayOfMonth(d, p) {
        return pad(d.getDate(), p, 2);
    }

    function formatHour24(d, p) {
        return pad(d.getHours(), p, 2);
    }

    function formatHour12(d, p) {
        return pad(d.getHours() % 12 || 12, p, 2);
    }

    function formatDayOfYear(d, p) {
        return pad(1 + day.count(year(d), d), p, 3);
    }

    function formatMilliseconds(d, p) {
        return pad(d.getMilliseconds(), p, 3);
    }

    function formatMicroseconds(d, p) {
        return formatMilliseconds(d, p) + '000';
    }

    function formatMonthNumber(d, p) {
        return pad(d.getMonth() + 1, p, 2);
    }

    function formatMinutes(d, p) {
        return pad(d.getMinutes(), p, 2);
    }

    function formatSeconds(d, p) {
        return pad(d.getSeconds(), p, 2);
    }

    function formatWeekdayNumberMonday(d) {
        var day$$1 = d.getDay();
        return day$$1 === 0 ? 7 : day$$1;
    }

    function formatWeekNumberSunday(d, p) {
        return pad(sunday.count(year(d), d), p, 2);
    }

    function formatWeekNumberISO(d, p) {
        var day$$1 = d.getDay();
        d = day$$1 >= 4 || day$$1 === 0 ? thursday(d) : thursday.ceil(d);
        return pad(thursday.count(year(d), d) + (year(d).getDay() === 4), p, 2);
    }

    function formatWeekdayNumberSunday(d) {
        return d.getDay();
    }

    function formatWeekNumberMonday(d, p) {
        return pad(monday.count(year(d), d), p, 2);
    }

    function formatYear(d, p) {
        return pad(d.getFullYear() % 100, p, 2);
    }

    function formatFullYear(d, p) {
        return pad(d.getFullYear() % 10000, p, 4);
    }

    function formatZone(d) {
        var z = d.getTimezoneOffset();
        return (
            (z > 0 ? '-' : ((z *= -1), '+')) +
            pad((z / 60) | 0, '0', 2) +
            pad(z % 60, '0', 2)
        );
    }

    function formatUTCDayOfMonth(d, p) {
        return pad(d.getUTCDate(), p, 2);
    }

    function formatUTCHour24(d, p) {
        return pad(d.getUTCHours(), p, 2);
    }

    function formatUTCHour12(d, p) {
        return pad(d.getUTCHours() % 12 || 12, p, 2);
    }

    function formatUTCDayOfYear(d, p) {
        return pad(1 + utcDay.count(utcYear(d), d), p, 3);
    }

    function formatUTCMilliseconds(d, p) {
        return pad(d.getUTCMilliseconds(), p, 3);
    }

    function formatUTCMicroseconds(d, p) {
        return formatUTCMilliseconds(d, p) + '000';
    }

    function formatUTCMonthNumber(d, p) {
        return pad(d.getUTCMonth() + 1, p, 2);
    }

    function formatUTCMinutes(d, p) {
        return pad(d.getUTCMinutes(), p, 2);
    }

    function formatUTCSeconds(d, p) {
        return pad(d.getUTCSeconds(), p, 2);
    }

    function formatUTCWeekdayNumberMonday(d) {
        var dow = d.getUTCDay();
        return dow === 0 ? 7 : dow;
    }

    function formatUTCWeekNumberSunday(d, p) {
        return pad(utcSunday.count(utcYear(d), d), p, 2);
    }

    function formatUTCWeekNumberISO(d, p) {
        var day$$1 = d.getUTCDay();
        d = day$$1 >= 4 || day$$1 === 0 ? utcThursday(d) : utcThursday.ceil(d);
        return pad(
            utcThursday.count(utcYear(d), d) + (utcYear(d).getUTCDay() === 4),
            p,
            2
        );
    }

    function formatUTCWeekdayNumberSunday(d) {
        return d.getUTCDay();
    }

    function formatUTCWeekNumberMonday(d, p) {
        return pad(utcMonday.count(utcYear(d), d), p, 2);
    }

    function formatUTCYear(d, p) {
        return pad(d.getUTCFullYear() % 100, p, 2);
    }

    function formatUTCFullYear(d, p) {
        return pad(d.getUTCFullYear() % 10000, p, 4);
    }

    function formatUTCZone() {
        return '+0000';
    }

    function formatLiteralPercent() {
        return '%';
    }

    function formatUnixTimestamp(d) {
        return +d;
    }

    function formatUnixTimestampSeconds(d) {
        return Math.floor(+d / 1000);
    }

    var locale$1;
    var timeFormat;
    var timeParse;
    var utcFormat;
    var utcParse;

    defaultLocale({
        dateTime: '%x, %X',
        date: '%-m/%-d/%Y',
        time: '%-I:%M:%S %p',
        periods: ['AM', 'PM'],
        days: [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
        ],
        shortDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        months: [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ],
        shortMonths: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
        ],
    });

    function defaultLocale(definition) {
        locale$1 = formatLocale(definition);
        timeFormat = locale$1.format;
        timeParse = locale$1.parse;
        utcFormat = locale$1.utcFormat;
        utcParse = locale$1.utcParse;
        return locale$1;
    }

    var isoSpecifier = '%Y-%m-%dT%H:%M:%S.%LZ';

    function formatIsoNative(date) {
        return date.toISOString();
    }

    var formatIso = Date.prototype.toISOString
        ? formatIsoNative
        : utcFormat(isoSpecifier);

    function parseIsoNative(string) {
        var date = new Date(string);
        return isNaN(date) ? null : date;
    }

    var parseIso = +new Date('2000-01-01T00:00:00.000Z')
        ? parseIsoNative
        : utcParse(isoSpecifier);

    var tickFormat = function tickFormat(date, formats, d3) {
        if (d3.timeSecond(date) < date) {
            return d3.timeFormat(formats.milliseconds)(date);
        }

        if (d3.timeMinute(date) < date) {
            return d3.timeFormat(formats.seconds)(date);
        }

        if (d3.timeHour(date) < date) {
            return d3.timeFormat(formats.minutes)(date);
        }

        if (d3.timeDay(date) < date) {
            return d3.timeFormat(formats.hours)(date);
        }

        if (d3.timeMonth(date) < date) {
            if (d3.timeWeek(date) < date) {
                return d3.timeFormat(formats.days)(date);
            }

            return d3.timeFormat(formats.weeks)(date);
        }

        if (d3.timeYear(date) < date) {
            return d3.timeFormat(formats.months)(date);
        }

        return d3.timeFormat(formats.year)(date);
    };

    var axis = function(d3, config, xScale) {
        var labelWidth = config.label.width,
            formats = config.axis.formats,
            locale = config.locale;

        d3.timeFormatDefaultLocale(locale);
        return function(selection) {
            var axis = selection.selectAll('.axis').data(function(d) {
                return d;
            });

            axis.exit().remove();

            var axisTop = d3.axisTop(xScale).tickFormat(function(d) {
                return tickFormat(d, formats, d3);
            });

            axis
                .enter()
                .filter(function(_, i) {
                    return !i;
                })
                .append('g')
                .classed('axis', true)
                .attr('transform', 'translate(' + labelWidth + ',0)')
                .call(axisTop);

            axis.call(axisTop);
        };
    };

    var bounds = function(config, xScale) {
        return function(selection) {
            var margin = config.margin,
                dateFormat = config.bound.format,
                labelWidth = config.label.width,
                lineHeight = config.line.height;

            var bounds = selection.selectAll('.bound').data(function(d) {
                return d;
            });
            var numberRows = selection.data()[0].length;

            bounds.exit().remove();

            bounds
                .enter()
                .filter(function(_, i) {
                    return !i;
                })
                .append('g')
                .classed('bound', true)
                .classed('start', true)
                .attr(
                    'transform',
                    'translate(' +
                        labelWidth +
                        ', ' +
                        (lineHeight * numberRows + margin.top) +
                        ')'
                )
                .append('text')
                .text(dateFormat(xScale.domain()[0]));

            bounds
                .enter()
                .filter(function(_, i) {
                    return !i;
                })
                .append('g')
                .classed('bound', true)
                .classed('end', true)
                .attr(
                    'transform',
                    'translate(' +
                        labelWidth +
                        ', ' +
                        (lineHeight * numberRows + margin.top) +
                        ')'
                )
                .append('text')
                .attr('x', xScale.range()[1] - margin.right)
                .attr('text-anchor', 'end')
                .text(dateFormat(xScale.domain()[1]));

            bounds
                .selectAll('.bound.start text')
                .text(dateFormat(xScale.domain()[0]));
            bounds
                .selectAll('.bound.end text')
                .text(dateFormat(xScale.domain()[1]));
        };
    };

    var dateTime = '%x, %X';
    var date = '%-m/%-d/%Y';
    var time = '%-I:%M:%S %p';
    var periods = ['AM', 'PM'];
    var days$1 = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
    ];
    var shortDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var months$1 = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];
    var shortMonths = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
    ];
    var enLocale = {
        dateTime: dateTime,
        date: date,
        time: time,
        periods: periods,
        days: days$1,
        shortDays: shortDays,
        months: months$1,
        shortMonths: shortMonths,
    };

    var defaultConfiguration = function(d3) {
        return {
            locale: enLocale,
            metaballs: {
                blurDeviation: 10,
                colorMatrix: '1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 50 -10',
            },
            bound: {
                format: d3.timeFormat('%d %B %Y'),
            },
            axis: {
                formats: {
                    milliseconds: '%L',
                    seconds: ':%S',
                    minutes: '%I:%M',
                    hours: '%I %p',
                    days: '%a %d',
                    weeks: '%b %d',
                    months: '%B',
                    year: '%Y',
                },
            },
            drops: function drops(row) {
                return row.data;
            },
            drop: {
                color: null,
                radius: 5,
                date: function date$$1(d) {
                    return new Date(d);
                },
                onClick: function onClick() {},
                onMouseOver: function onMouseOver() {},
                onMouseOut: function onMouseOut() {},
            },
            label: {
                padding: 20,
                text: function text(d) {
                    return d.name + ' (' + d.data.length + ')';
                },
                width: 200,
            },
            line: {
                color: function color(_, index) {
                    return d3.schemeCategory10[index];
                },
                height: 40,
            },
            margin: {
                top: 20,
                right: 10,
                bottom: 20,
                left: 10,
            },
            range: {
                start: new Date(new Date().getTime() - 3600000 * 24 * 365), // one year ago
                end: new Date(),
            },
            zoom: {
                onZoomStart: null,
                onZoom: null,
                onZoomEnd: null,
                minimumScale: 0,
                maximumScale: Infinity,
            },
        };
    };

    var index$2 = createCommonjsModule(function(module, exports) {
        /**
         * lodash (Custom Build) <https://lodash.com/>
         * Build: `lodash modularize exports="npm" -o ./`
         * Copyright jQuery Foundation and other contributors <https://jquery.org/>
         * Released under MIT license <https://lodash.com/license>
         * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
         * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
         */

        /** Used as the size to enable large array optimizations. */
        var LARGE_ARRAY_SIZE = 200;

        /** Used as the `TypeError` message for "Functions" methods. */
        var FUNC_ERROR_TEXT = 'Expected a function';

        /** Used to stand-in for `undefined` hash values. */
        var HASH_UNDEFINED = '__lodash_hash_undefined__';

        /** Used to compose bitmasks for comparison styles. */
        var UNORDERED_COMPARE_FLAG = 1,
            PARTIAL_COMPARE_FLAG = 2;

        /** Used as references for various `Number` constants. */
        var INFINITY = 1 / 0,
            MAX_SAFE_INTEGER = 9007199254740991;

        /** `Object#toString` result references. */
        var argsTag = '[object Arguments]',
            arrayTag = '[object Array]',
            boolTag = '[object Boolean]',
            dateTag = '[object Date]',
            errorTag = '[object Error]',
            funcTag = '[object Function]',
            genTag = '[object GeneratorFunction]',
            mapTag = '[object Map]',
            numberTag = '[object Number]',
            objectTag = '[object Object]',
            promiseTag = '[object Promise]',
            regexpTag = '[object RegExp]',
            setTag = '[object Set]',
            stringTag = '[object String]',
            symbolTag = '[object Symbol]',
            weakMapTag = '[object WeakMap]';

        var arrayBufferTag = '[object ArrayBuffer]',
            dataViewTag = '[object DataView]',
            float32Tag = '[object Float32Array]',
            float64Tag = '[object Float64Array]',
            int8Tag = '[object Int8Array]',
            int16Tag = '[object Int16Array]',
            int32Tag = '[object Int32Array]',
            uint8Tag = '[object Uint8Array]',
            uint8ClampedTag = '[object Uint8ClampedArray]',
            uint16Tag = '[object Uint16Array]',
            uint32Tag = '[object Uint32Array]';

        /** Used to match property names within property paths. */
        var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
            reIsPlainProp = /^\w*$/,
            reLeadingDot = /^\./,
            rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

        /**
         * Used to match `RegExp`
         * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
         */
        var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

        /** Used to match backslashes in property paths. */
        var reEscapeChar = /\\(\\)?/g;

        /** Used to detect host constructors (Safari). */
        var reIsHostCtor = /^\[object .+?Constructor\]$/;

        /** Used to detect unsigned integer values. */
        var reIsUint = /^(?:0|[1-9]\d*)$/;

        /** Used to identify `toStringTag` values of typed arrays. */
        var typedArrayTags = {};
        typedArrayTags[float32Tag] = typedArrayTags[
            float64Tag
        ] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[
            int32Tag
        ] = typedArrayTags[uint8Tag] = typedArrayTags[
            uint8ClampedTag
        ] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
        typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[
            arrayBufferTag
        ] = typedArrayTags[boolTag] = typedArrayTags[
            dataViewTag
        ] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[
            funcTag
        ] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[
            objectTag
        ] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[
            stringTag
        ] = typedArrayTags[weakMapTag] = false;

        /** Detect free variable `global` from Node.js. */
        var freeGlobal =
            typeof commonjsGlobal == 'object' &&
            commonjsGlobal &&
            commonjsGlobal.Object === Object &&
            commonjsGlobal;

        /** Detect free variable `self`. */
        var freeSelf =
            typeof self == 'object' && self && self.Object === Object && self;

        /** Used as a reference to the global object. */
        var root = freeGlobal || freeSelf || Function('return this')();

        /** Detect free variable `exports`. */
        var freeExports =
            'object' == 'object' && exports && !exports.nodeType && exports;

        /** Detect free variable `module`. */
        var freeModule =
            freeExports &&
            'object' == 'object' &&
            module &&
            !module.nodeType &&
            module;

        /** Detect the popular CommonJS extension `module.exports`. */
        var moduleExports = freeModule && freeModule.exports === freeExports;

        /** Detect free variable `process` from Node.js. */
        var freeProcess = moduleExports && freeGlobal.process;

        /** Used to access faster Node.js helpers. */
        var nodeUtil = (function() {
            try {
                return freeProcess && freeProcess.binding('util');
            } catch (e) {}
        })();

        /* Node.js helper references. */
        var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

        /**
         * A specialized version of `_.includes` for arrays without support for
         * specifying an index to search from.
         *
         * @private
         * @param {Array} [array] The array to inspect.
         * @param {*} target The value to search for.
         * @returns {boolean} Returns `true` if `target` is found, else `false`.
         */
        function arrayIncludes(array, value) {
            var length = array ? array.length : 0;
            return !!length && baseIndexOf(array, value, 0) > -1;
        }

        /**
         * This function is like `arrayIncludes` except that it accepts a comparator.
         *
         * @private
         * @param {Array} [array] The array to inspect.
         * @param {*} target The value to search for.
         * @param {Function} comparator The comparator invoked per element.
         * @returns {boolean} Returns `true` if `target` is found, else `false`.
         */
        function arrayIncludesWith(array, value, comparator) {
            var index = -1,
                length = array ? array.length : 0;

            while (++index < length) {
                if (comparator(value, array[index])) {
                    return true;
                }
            }
            return false;
        }

        /**
         * A specialized version of `_.some` for arrays without support for iteratee
         * shorthands.
         *
         * @private
         * @param {Array} [array] The array to iterate over.
         * @param {Function} predicate The function invoked per iteration.
         * @returns {boolean} Returns `true` if any element passes the predicate check,
         *  else `false`.
         */
        function arraySome(array, predicate) {
            var index = -1,
                length = array ? array.length : 0;

            while (++index < length) {
                if (predicate(array[index], index, array)) {
                    return true;
                }
            }
            return false;
        }

        /**
         * The base implementation of `_.findIndex` and `_.findLastIndex` without
         * support for iteratee shorthands.
         *
         * @private
         * @param {Array} array The array to inspect.
         * @param {Function} predicate The function invoked per iteration.
         * @param {number} fromIndex The index to search from.
         * @param {boolean} [fromRight] Specify iterating from right to left.
         * @returns {number} Returns the index of the matched value, else `-1`.
         */
        function baseFindIndex(array, predicate, fromIndex, fromRight) {
            var length = array.length,
                index = fromIndex + (fromRight ? 1 : -1);

            while (fromRight ? index-- : ++index < length) {
                if (predicate(array[index], index, array)) {
                    return index;
                }
            }
            return -1;
        }

        /**
         * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
         *
         * @private
         * @param {Array} array The array to inspect.
         * @param {*} value The value to search for.
         * @param {number} fromIndex The index to search from.
         * @returns {number} Returns the index of the matched value, else `-1`.
         */
        function baseIndexOf(array, value, fromIndex) {
            if (value !== value) {
                return baseFindIndex(array, baseIsNaN, fromIndex);
            }
            var index = fromIndex - 1,
                length = array.length;

            while (++index < length) {
                if (array[index] === value) {
                    return index;
                }
            }
            return -1;
        }

        /**
         * The base implementation of `_.isNaN` without support for number objects.
         *
         * @private
         * @param {*} value The value to check.
         * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
         */
        function baseIsNaN(value) {
            return value !== value;
        }

        /**
         * The base implementation of `_.property` without support for deep paths.
         *
         * @private
         * @param {string} key The key of the property to get.
         * @returns {Function} Returns the new accessor function.
         */
        function baseProperty(key) {
            return function(object) {
                return object == null ? undefined : object[key];
            };
        }

        /**
         * The base implementation of `_.times` without support for iteratee shorthands
         * or max array length checks.
         *
         * @private
         * @param {number} n The number of times to invoke `iteratee`.
         * @param {Function} iteratee The function invoked per iteration.
         * @returns {Array} Returns the array of results.
         */
        function baseTimes(n, iteratee) {
            var index = -1,
                result = Array(n);

            while (++index < n) {
                result[index] = iteratee(index);
            }
            return result;
        }

        /**
         * The base implementation of `_.unary` without support for storing metadata.
         *
         * @private
         * @param {Function} func The function to cap arguments for.
         * @returns {Function} Returns the new capped function.
         */
        function baseUnary(func) {
            return function(value) {
                return func(value);
            };
        }

        /**
         * Checks if a cache value for `key` exists.
         *
         * @private
         * @param {Object} cache The cache to query.
         * @param {string} key The key of the entry to check.
         * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
         */
        function cacheHas(cache, key) {
            return cache.has(key);
        }

        /**
         * Gets the value at `key` of `object`.
         *
         * @private
         * @param {Object} [object] The object to query.
         * @param {string} key The key of the property to get.
         * @returns {*} Returns the property value.
         */
        function getValue(object, key) {
            return object == null ? undefined : object[key];
        }

        /**
         * Checks if `value` is a host object in IE < 9.
         *
         * @private
         * @param {*} value The value to check.
         * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
         */
        function isHostObject(value) {
            // Many host objects are `Object` objects that can coerce to strings
            // despite having improperly defined `toString` methods.
            var result = false;
            if (value != null && typeof value.toString != 'function') {
                try {
                    result = !!(value + '');
                } catch (e) {}
            }
            return result;
        }

        /**
         * Converts `map` to its key-value pairs.
         *
         * @private
         * @param {Object} map The map to convert.
         * @returns {Array} Returns the key-value pairs.
         */
        function mapToArray(map) {
            var index = -1,
                result = Array(map.size);

            map.forEach(function(value, key) {
                result[++index] = [key, value];
            });
            return result;
        }

        /**
         * Creates a unary function that invokes `func` with its argument transformed.
         *
         * @private
         * @param {Function} func The function to wrap.
         * @param {Function} transform The argument transform.
         * @returns {Function} Returns the new function.
         */
        function overArg(func, transform) {
            return function(arg) {
                return func(transform(arg));
            };
        }

        /**
         * Converts `set` to an array of its values.
         *
         * @private
         * @param {Object} set The set to convert.
         * @returns {Array} Returns the values.
         */
        function setToArray(set) {
            var index = -1,
                result = Array(set.size);

            set.forEach(function(value) {
                result[++index] = value;
            });
            return result;
        }

        /** Used for built-in method references. */
        var arrayProto = Array.prototype,
            funcProto = Function.prototype,
            objectProto = Object.prototype;

        /** Used to detect overreaching core-js shims. */
        var coreJsData = root['__core-js_shared__'];

        /** Used to detect methods masquerading as native. */
        var maskSrcKey = (function() {
            var uid = /[^.]+$/.exec(
                (coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO) ||
                    ''
            );
            return uid ? 'Symbol(src)_1.' + uid : '';
        })();

        /** Used to resolve the decompiled source of functions. */
        var funcToString = funcProto.toString;

        /** Used to check objects for own properties. */
        var hasOwnProperty = objectProto.hasOwnProperty;

        /**
         * Used to resolve the
         * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
         * of values.
         */
        var objectToString = objectProto.toString;

        /** Used to detect if a method is native. */
        var reIsNative = RegExp(
            '^' +
                funcToString
                    .call(hasOwnProperty)
                    .replace(reRegExpChar, '\\$&')
                    .replace(
                        /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
                        '$1.*?'
                    ) +
                '$'
        );

        /** Built-in value references. */
        var Symbol = root.Symbol,
            Uint8Array = root.Uint8Array,
            propertyIsEnumerable = objectProto.propertyIsEnumerable,
            splice = arrayProto.splice;

        /* Built-in method references for those with the same name as other `lodash` methods. */
        var nativeKeys = overArg(Object.keys, Object);

        /* Built-in method references that are verified to be native. */
        var DataView = getNative(root, 'DataView'),
            Map = getNative(root, 'Map'),
            Promise = getNative(root, 'Promise'),
            Set = getNative(root, 'Set'),
            WeakMap = getNative(root, 'WeakMap'),
            nativeCreate = getNative(Object, 'create');

        /** Used to detect maps, sets, and weakmaps. */
        var dataViewCtorString = toSource(DataView),
            mapCtorString = toSource(Map),
            promiseCtorString = toSource(Promise),
            setCtorString = toSource(Set),
            weakMapCtorString = toSource(WeakMap);

        /** Used to convert symbols to primitives and strings. */
        var symbolProto = Symbol ? Symbol.prototype : undefined,
            symbolValueOf = symbolProto ? symbolProto.valueOf : undefined,
            symbolToString = symbolProto ? symbolProto.toString : undefined;

        /**
         * Creates a hash object.
         *
         * @private
         * @constructor
         * @param {Array} [entries] The key-value pairs to cache.
         */
        function Hash(entries) {
            var index = -1,
                length = entries ? entries.length : 0;

            this.clear();
            while (++index < length) {
                var entry = entries[index];
                this.set(entry[0], entry[1]);
            }
        }

        /**
         * Removes all key-value entries from the hash.
         *
         * @private
         * @name clear
         * @memberOf Hash
         */
        function hashClear() {
            this.__data__ = nativeCreate ? nativeCreate(null) : {};
        }

        /**
         * Removes `key` and its value from the hash.
         *
         * @private
         * @name delete
         * @memberOf Hash
         * @param {Object} hash The hash to modify.
         * @param {string} key The key of the value to remove.
         * @returns {boolean} Returns `true` if the entry was removed, else `false`.
         */
        function hashDelete(key) {
            return this.has(key) && delete this.__data__[key];
        }

        /**
         * Gets the hash value for `key`.
         *
         * @private
         * @name get
         * @memberOf Hash
         * @param {string} key The key of the value to get.
         * @returns {*} Returns the entry value.
         */
        function hashGet(key) {
            var data = this.__data__;
            if (nativeCreate) {
                var result = data[key];
                return result === HASH_UNDEFINED ? undefined : result;
            }
            return hasOwnProperty.call(data, key) ? data[key] : undefined;
        }

        /**
         * Checks if a hash value for `key` exists.
         *
         * @private
         * @name has
         * @memberOf Hash
         * @param {string} key The key of the entry to check.
         * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
         */
        function hashHas(key) {
            var data = this.__data__;
            return nativeCreate
                ? data[key] !== undefined
                : hasOwnProperty.call(data, key);
        }

        /**
         * Sets the hash `key` to `value`.
         *
         * @private
         * @name set
         * @memberOf Hash
         * @param {string} key The key of the value to set.
         * @param {*} value The value to set.
         * @returns {Object} Returns the hash instance.
         */
        function hashSet(key, value) {
            var data = this.__data__;
            data[key] =
                nativeCreate && value === undefined ? HASH_UNDEFINED : value;
            return this;
        }

        // Add methods to `Hash`.
        Hash.prototype.clear = hashClear;
        Hash.prototype['delete'] = hashDelete;
        Hash.prototype.get = hashGet;
        Hash.prototype.has = hashHas;
        Hash.prototype.set = hashSet;

        /**
         * Creates an list cache object.
         *
         * @private
         * @constructor
         * @param {Array} [entries] The key-value pairs to cache.
         */
        function ListCache(entries) {
            var index = -1,
                length = entries ? entries.length : 0;

            this.clear();
            while (++index < length) {
                var entry = entries[index];
                this.set(entry[0], entry[1]);
            }
        }

        /**
         * Removes all key-value entries from the list cache.
         *
         * @private
         * @name clear
         * @memberOf ListCache
         */
        function listCacheClear() {
            this.__data__ = [];
        }

        /**
         * Removes `key` and its value from the list cache.
         *
         * @private
         * @name delete
         * @memberOf ListCache
         * @param {string} key The key of the value to remove.
         * @returns {boolean} Returns `true` if the entry was removed, else `false`.
         */
        function listCacheDelete(key) {
            var data = this.__data__,
                index = assocIndexOf(data, key);

            if (index < 0) {
                return false;
            }
            var lastIndex = data.length - 1;
            if (index == lastIndex) {
                data.pop();
            } else {
                splice.call(data, index, 1);
            }
            return true;
        }

        /**
         * Gets the list cache value for `key`.
         *
         * @private
         * @name get
         * @memberOf ListCache
         * @param {string} key The key of the value to get.
         * @returns {*} Returns the entry value.
         */
        function listCacheGet(key) {
            var data = this.__data__,
                index = assocIndexOf(data, key);

            return index < 0 ? undefined : data[index][1];
        }

        /**
         * Checks if a list cache value for `key` exists.
         *
         * @private
         * @name has
         * @memberOf ListCache
         * @param {string} key The key of the entry to check.
         * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
         */
        function listCacheHas(key) {
            return assocIndexOf(this.__data__, key) > -1;
        }

        /**
         * Sets the list cache `key` to `value`.
         *
         * @private
         * @name set
         * @memberOf ListCache
         * @param {string} key The key of the value to set.
         * @param {*} value The value to set.
         * @returns {Object} Returns the list cache instance.
         */
        function listCacheSet(key, value) {
            var data = this.__data__,
                index = assocIndexOf(data, key);

            if (index < 0) {
                data.push([key, value]);
            } else {
                data[index][1] = value;
            }
            return this;
        }

        // Add methods to `ListCache`.
        ListCache.prototype.clear = listCacheClear;
        ListCache.prototype['delete'] = listCacheDelete;
        ListCache.prototype.get = listCacheGet;
        ListCache.prototype.has = listCacheHas;
        ListCache.prototype.set = listCacheSet;

        /**
         * Creates a map cache object to store key-value pairs.
         *
         * @private
         * @constructor
         * @param {Array} [entries] The key-value pairs to cache.
         */
        function MapCache(entries) {
            var index = -1,
                length = entries ? entries.length : 0;

            this.clear();
            while (++index < length) {
                var entry = entries[index];
                this.set(entry[0], entry[1]);
            }
        }

        /**
         * Removes all key-value entries from the map.
         *
         * @private
         * @name clear
         * @memberOf MapCache
         */
        function mapCacheClear() {
            this.__data__ = {
                hash: new Hash(),
                map: new (Map || ListCache)(),
                string: new Hash(),
            };
        }

        /**
         * Removes `key` and its value from the map.
         *
         * @private
         * @name delete
         * @memberOf MapCache
         * @param {string} key The key of the value to remove.
         * @returns {boolean} Returns `true` if the entry was removed, else `false`.
         */
        function mapCacheDelete(key) {
            return getMapData(this, key)['delete'](key);
        }

        /**
         * Gets the map value for `key`.
         *
         * @private
         * @name get
         * @memberOf MapCache
         * @param {string} key The key of the value to get.
         * @returns {*} Returns the entry value.
         */
        function mapCacheGet(key) {
            return getMapData(this, key).get(key);
        }

        /**
         * Checks if a map value for `key` exists.
         *
         * @private
         * @name has
         * @memberOf MapCache
         * @param {string} key The key of the entry to check.
         * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
         */
        function mapCacheHas(key) {
            return getMapData(this, key).has(key);
        }

        /**
         * Sets the map `key` to `value`.
         *
         * @private
         * @name set
         * @memberOf MapCache
         * @param {string} key The key of the value to set.
         * @param {*} value The value to set.
         * @returns {Object} Returns the map cache instance.
         */
        function mapCacheSet(key, value) {
            getMapData(this, key).set(key, value);
            return this;
        }

        // Add methods to `MapCache`.
        MapCache.prototype.clear = mapCacheClear;
        MapCache.prototype['delete'] = mapCacheDelete;
        MapCache.prototype.get = mapCacheGet;
        MapCache.prototype.has = mapCacheHas;
        MapCache.prototype.set = mapCacheSet;

        /**
         *
         * Creates an array cache object to store unique values.
         *
         * @private
         * @constructor
         * @param {Array} [values] The values to cache.
         */
        function SetCache(values) {
            var index = -1,
                length = values ? values.length : 0;

            this.__data__ = new MapCache();
            while (++index < length) {
                this.add(values[index]);
            }
        }

        /**
         * Adds `value` to the array cache.
         *
         * @private
         * @name add
         * @memberOf SetCache
         * @alias push
         * @param {*} value The value to cache.
         * @returns {Object} Returns the cache instance.
         */
        function setCacheAdd(value) {
            this.__data__.set(value, HASH_UNDEFINED);
            return this;
        }

        /**
         * Checks if `value` is in the array cache.
         *
         * @private
         * @name has
         * @memberOf SetCache
         * @param {*} value The value to search for.
         * @returns {number} Returns `true` if `value` is found, else `false`.
         */
        function setCacheHas(value) {
            return this.__data__.has(value);
        }

        // Add methods to `SetCache`.
        SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
        SetCache.prototype.has = setCacheHas;

        /**
         * Creates a stack cache object to store key-value pairs.
         *
         * @private
         * @constructor
         * @param {Array} [entries] The key-value pairs to cache.
         */
        function Stack(entries) {
            this.__data__ = new ListCache(entries);
        }

        /**
         * Removes all key-value entries from the stack.
         *
         * @private
         * @name clear
         * @memberOf Stack
         */
        function stackClear() {
            this.__data__ = new ListCache();
        }

        /**
         * Removes `key` and its value from the stack.
         *
         * @private
         * @name delete
         * @memberOf Stack
         * @param {string} key The key of the value to remove.
         * @returns {boolean} Returns `true` if the entry was removed, else `false`.
         */
        function stackDelete(key) {
            return this.__data__['delete'](key);
        }

        /**
         * Gets the stack value for `key`.
         *
         * @private
         * @name get
         * @memberOf Stack
         * @param {string} key The key of the value to get.
         * @returns {*} Returns the entry value.
         */
        function stackGet(key) {
            return this.__data__.get(key);
        }

        /**
         * Checks if a stack value for `key` exists.
         *
         * @private
         * @name has
         * @memberOf Stack
         * @param {string} key The key of the entry to check.
         * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
         */
        function stackHas(key) {
            return this.__data__.has(key);
        }

        /**
         * Sets the stack `key` to `value`.
         *
         * @private
         * @name set
         * @memberOf Stack
         * @param {string} key The key of the value to set.
         * @param {*} value The value to set.
         * @returns {Object} Returns the stack cache instance.
         */
        function stackSet(key, value) {
            var cache = this.__data__;
            if (cache instanceof ListCache) {
                var pairs = cache.__data__;
                if (!Map || pairs.length < LARGE_ARRAY_SIZE - 1) {
                    pairs.push([key, value]);
                    return this;
                }
                cache = this.__data__ = new MapCache(pairs);
            }
            cache.set(key, value);
            return this;
        }

        // Add methods to `Stack`.
        Stack.prototype.clear = stackClear;
        Stack.prototype['delete'] = stackDelete;
        Stack.prototype.get = stackGet;
        Stack.prototype.has = stackHas;
        Stack.prototype.set = stackSet;

        /**
         * Creates an array of the enumerable property names of the array-like `value`.
         *
         * @private
         * @param {*} value The value to query.
         * @param {boolean} inherited Specify returning inherited property names.
         * @returns {Array} Returns the array of property names.
         */
        function arrayLikeKeys(value, inherited) {
            // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
            // Safari 9 makes `arguments.length` enumerable in strict mode.
            var result =
                isArray(value) || isArguments(value)
                    ? baseTimes(value.length, String)
                    : [];

            var length = result.length,
                skipIndexes = !!length;

            for (var key in value) {
                if (
                    (inherited || hasOwnProperty.call(value, key)) &&
                    !(skipIndexes && (key == 'length' || isIndex(key, length)))
                ) {
                    result.push(key);
                }
            }
            return result;
        }

        /**
         * Gets the index at which the `key` is found in `array` of key-value pairs.
         *
         * @private
         * @param {Array} array The array to inspect.
         * @param {*} key The key to search for.
         * @returns {number} Returns the index of the matched value, else `-1`.
         */
        function assocIndexOf(array, key) {
            var length = array.length;
            while (length--) {
                if (eq(array[length][0], key)) {
                    return length;
                }
            }
            return -1;
        }

        /**
         * The base implementation of `_.get` without support for default values.
         *
         * @private
         * @param {Object} object The object to query.
         * @param {Array|string} path The path of the property to get.
         * @returns {*} Returns the resolved value.
         */
        function baseGet(object, path) {
            path = isKey(path, object) ? [path] : castPath(path);

            var index = 0,
                length = path.length;

            while (object != null && index < length) {
                object = object[toKey(path[index++])];
            }
            return index && index == length ? object : undefined;
        }

        /**
         * The base implementation of `getTag`.
         *
         * @private
         * @param {*} value The value to query.
         * @returns {string} Returns the `toStringTag`.
         */
        function baseGetTag(value) {
            return objectToString.call(value);
        }

        /**
         * The base implementation of `_.hasIn` without support for deep paths.
         *
         * @private
         * @param {Object} [object] The object to query.
         * @param {Array|string} key The key to check.
         * @returns {boolean} Returns `true` if `key` exists, else `false`.
         */
        function baseHasIn(object, key) {
            return object != null && key in Object(object);
        }

        /**
         * The base implementation of `_.isEqual` which supports partial comparisons
         * and tracks traversed objects.
         *
         * @private
         * @param {*} value The value to compare.
         * @param {*} other The other value to compare.
         * @param {Function} [customizer] The function to customize comparisons.
         * @param {boolean} [bitmask] The bitmask of comparison flags.
         *  The bitmask may be composed of the following flags:
         *     1 - Unordered comparison
         *     2 - Partial comparison
         * @param {Object} [stack] Tracks traversed `value` and `other` objects.
         * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
         */
        function baseIsEqual(value, other, customizer, bitmask, stack) {
            if (value === other) {
                return true;
            }
            if (
                value == null ||
                other == null ||
                (!isObject(value) && !isObjectLike(other))
            ) {
                return value !== value && other !== other;
            }
            return baseIsEqualDeep(
                value,
                other,
                baseIsEqual,
                customizer,
                bitmask,
                stack
            );
        }

        /**
         * A specialized version of `baseIsEqual` for arrays and objects which performs
         * deep comparisons and tracks traversed objects enabling objects with circular
         * references to be compared.
         *
         * @private
         * @param {Object} object The object to compare.
         * @param {Object} other The other object to compare.
         * @param {Function} equalFunc The function to determine equivalents of values.
         * @param {Function} [customizer] The function to customize comparisons.
         * @param {number} [bitmask] The bitmask of comparison flags. See `baseIsEqual`
         *  for more details.
         * @param {Object} [stack] Tracks traversed `object` and `other` objects.
         * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
         */
        function baseIsEqualDeep(
            object,
            other,
            equalFunc,
            customizer,
            bitmask,
            stack
        ) {
            var objIsArr = isArray(object),
                othIsArr = isArray(other),
                objTag = arrayTag,
                othTag = arrayTag;

            if (!objIsArr) {
                objTag = getTag(object);
                objTag = objTag == argsTag ? objectTag : objTag;
            }
            if (!othIsArr) {
                othTag = getTag(other);
                othTag = othTag == argsTag ? objectTag : othTag;
            }
            var objIsObj = objTag == objectTag && !isHostObject(object),
                othIsObj = othTag == objectTag && !isHostObject(other),
                isSameTag = objTag == othTag;

            if (isSameTag && !objIsObj) {
                stack || (stack = new Stack());
                return objIsArr || isTypedArray(object)
                    ? equalArrays(
                          object,
                          other,
                          equalFunc,
                          customizer,
                          bitmask,
                          stack
                      )
                    : equalByTag(
                          object,
                          other,
                          objTag,
                          equalFunc,
                          customizer,
                          bitmask,
                          stack
                      );
            }
            if (!(bitmask & PARTIAL_COMPARE_FLAG)) {
                var objIsWrapped =
                        objIsObj && hasOwnProperty.call(object, '__wrapped__'),
                    othIsWrapped =
                        othIsObj && hasOwnProperty.call(other, '__wrapped__');

                if (objIsWrapped || othIsWrapped) {
                    var objUnwrapped = objIsWrapped ? object.value() : object,
                        othUnwrapped = othIsWrapped ? other.value() : other;

                    stack || (stack = new Stack());
                    return equalFunc(
                        objUnwrapped,
                        othUnwrapped,
                        customizer,
                        bitmask,
                        stack
                    );
                }
            }
            if (!isSameTag) {
                return false;
            }
            stack || (stack = new Stack());
            return equalObjects(
                object,
                other,
                equalFunc,
                customizer,
                bitmask,
                stack
            );
        }

        /**
         * The base implementation of `_.isMatch` without support for iteratee shorthands.
         *
         * @private
         * @param {Object} object The object to inspect.
         * @param {Object} source The object of property values to match.
         * @param {Array} matchData The property names, values, and compare flags to match.
         * @param {Function} [customizer] The function to customize comparisons.
         * @returns {boolean} Returns `true` if `object` is a match, else `false`.
         */
        function baseIsMatch(object, source, matchData, customizer) {
            var index = matchData.length,
                length = index,
                noCustomizer = !customizer;

            if (object == null) {
                return !length;
            }
            object = Object(object);
            while (index--) {
                var data = matchData[index];
                if (
                    noCustomizer && data[2]
                        ? data[1] !== object[data[0]]
                        : !(data[0] in object)
                ) {
                    return false;
                }
            }
            while (++index < length) {
                data = matchData[index];
                var key = data[0],
                    objValue = object[key],
                    srcValue = data[1];

                if (noCustomizer && data[2]) {
                    if (objValue === undefined && !(key in object)) {
                        return false;
                    }
                } else {
                    var stack = new Stack();
                    if (customizer) {
                        var result = customizer(
                            objValue,
                            srcValue,
                            key,
                            object,
                            source,
                            stack
                        );
                    }
                    if (
                        !(result === undefined
                            ? baseIsEqual(
                                  srcValue,
                                  objValue,
                                  customizer,
                                  UNORDERED_COMPARE_FLAG | PARTIAL_COMPARE_FLAG,
                                  stack
                              )
                            : result)
                    ) {
                        return false;
                    }
                }
            }
            return true;
        }

        /**
         * The base implementation of `_.isNative` without bad shim checks.
         *
         * @private
         * @param {*} value The value to check.
         * @returns {boolean} Returns `true` if `value` is a native function,
         *  else `false`.
         */
        function baseIsNative(value) {
            if (!isObject(value) || isMasked(value)) {
                return false;
            }
            var pattern =
                isFunction(value) || isHostObject(value)
                    ? reIsNative
                    : reIsHostCtor;
            return pattern.test(toSource(value));
        }

        /**
         * The base implementation of `_.isTypedArray` without Node.js optimizations.
         *
         * @private
         * @param {*} value The value to check.
         * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
         */
        function baseIsTypedArray(value) {
            return (
                isObjectLike(value) &&
                isLength(value.length) &&
                !!typedArrayTags[objectToString.call(value)]
            );
        }

        /**
         * The base implementation of `_.iteratee`.
         *
         * @private
         * @param {*} [value=_.identity] The value to convert to an iteratee.
         * @returns {Function} Returns the iteratee.
         */
        function baseIteratee(value) {
            // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
            // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
            if (typeof value == 'function') {
                return value;
            }
            if (value == null) {
                return identity;
            }
            if (typeof value == 'object') {
                return isArray(value)
                    ? baseMatchesProperty(value[0], value[1])
                    : baseMatches(value);
            }
            return property(value);
        }

        /**
         * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
         *
         * @private
         * @param {Object} object The object to query.
         * @returns {Array} Returns the array of property names.
         */
        function baseKeys(object) {
            if (!isPrototype(object)) {
                return nativeKeys(object);
            }
            var result = [];
            for (var key in Object(object)) {
                if (hasOwnProperty.call(object, key) && key != 'constructor') {
                    result.push(key);
                }
            }
            return result;
        }

        /**
         * The base implementation of `_.matches` which doesn't clone `source`.
         *
         * @private
         * @param {Object} source The object of property values to match.
         * @returns {Function} Returns the new spec function.
         */
        function baseMatches(source) {
            var matchData = getMatchData(source);
            if (matchData.length == 1 && matchData[0][2]) {
                return matchesStrictComparable(
                    matchData[0][0],
                    matchData[0][1]
                );
            }
            return function(object) {
                return (
                    object === source || baseIsMatch(object, source, matchData)
                );
            };
        }

        /**
         * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
         *
         * @private
         * @param {string} path The path of the property to get.
         * @param {*} srcValue The value to match.
         * @returns {Function} Returns the new spec function.
         */
        function baseMatchesProperty(path, srcValue) {
            if (isKey(path) && isStrictComparable(srcValue)) {
                return matchesStrictComparable(toKey(path), srcValue);
            }
            return function(object) {
                var objValue = get(object, path);
                return objValue === undefined && objValue === srcValue
                    ? hasIn(object, path)
                    : baseIsEqual(
                          srcValue,
                          objValue,
                          undefined,
                          UNORDERED_COMPARE_FLAG | PARTIAL_COMPARE_FLAG
                      );
            };
        }

        /**
         * A specialized version of `baseProperty` which supports deep paths.
         *
         * @private
         * @param {Array|string} path The path of the property to get.
         * @returns {Function} Returns the new accessor function.
         */
        function basePropertyDeep(path) {
            return function(object) {
                return baseGet(object, path);
            };
        }

        /**
         * The base implementation of `_.toString` which doesn't convert nullish
         * values to empty strings.
         *
         * @private
         * @param {*} value The value to process.
         * @returns {string} Returns the string.
         */
        function baseToString(value) {
            // Exit early for strings to avoid a performance hit in some environments.
            if (typeof value == 'string') {
                return value;
            }
            if (isSymbol(value)) {
                return symbolToString ? symbolToString.call(value) : '';
            }
            var result = value + '';
            return result == '0' && 1 / value == -INFINITY ? '-0' : result;
        }

        /**
         * The base implementation of `_.uniqBy` without support for iteratee shorthands.
         *
         * @private
         * @param {Array} array The array to inspect.
         * @param {Function} [iteratee] The iteratee invoked per element.
         * @param {Function} [comparator] The comparator invoked per element.
         * @returns {Array} Returns the new duplicate free array.
         */
        function baseUniq(array, iteratee, comparator) {
            var index = -1,
                includes = arrayIncludes,
                length = array.length,
                isCommon = true,
                result = [],
                seen = result;

            if (comparator) {
                isCommon = false;
                includes = arrayIncludesWith;
            } else if (length >= LARGE_ARRAY_SIZE) {
                var set = iteratee ? null : createSet(array);
                if (set) {
                    return setToArray(set);
                }
                isCommon = false;
                includes = cacheHas;
                seen = new SetCache();
            } else {
                seen = iteratee ? [] : result;
            }
            outer: while (++index < length) {
                var value = array[index],
                    computed = iteratee ? iteratee(value) : value;

                value = comparator || value !== 0 ? value : 0;
                if (isCommon && computed === computed) {
                    var seenIndex = seen.length;
                    while (seenIndex--) {
                        if (seen[seenIndex] === computed) {
                            continue outer;
                        }
                    }
                    if (iteratee) {
                        seen.push(computed);
                    }
                    result.push(value);
                } else if (!includes(seen, computed, comparator)) {
                    if (seen !== result) {
                        seen.push(computed);
                    }
                    result.push(value);
                }
            }
            return result;
        }

        /**
         * Casts `value` to a path array if it's not one.
         *
         * @private
         * @param {*} value The value to inspect.
         * @returns {Array} Returns the cast property path array.
         */
        function castPath(value) {
            return isArray(value) ? value : stringToPath(value);
        }

        /**
         * Creates a set object of `values`.
         *
         * @private
         * @param {Array} values The values to add to the set.
         * @returns {Object} Returns the new set.
         */
        var createSet = !(Set && 1 / setToArray(new Set([, -0]))[1] == INFINITY)
            ? noop
            : function(values) {
                  return new Set(values);
              };

        /**
         * A specialized version of `baseIsEqualDeep` for arrays with support for
         * partial deep comparisons.
         *
         * @private
         * @param {Array} array The array to compare.
         * @param {Array} other The other array to compare.
         * @param {Function} equalFunc The function to determine equivalents of values.
         * @param {Function} customizer The function to customize comparisons.
         * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
         *  for more details.
         * @param {Object} stack Tracks traversed `array` and `other` objects.
         * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
         */
        function equalArrays(
            array,
            other,
            equalFunc,
            customizer,
            bitmask,
            stack
        ) {
            var isPartial = bitmask & PARTIAL_COMPARE_FLAG,
                arrLength = array.length,
                othLength = other.length;

            if (
                arrLength != othLength &&
                !(isPartial && othLength > arrLength)
            ) {
                return false;
            }
            // Assume cyclic values are equal.
            var stacked = stack.get(array);
            if (stacked && stack.get(other)) {
                return stacked == other;
            }
            var index = -1,
                result = true,
                seen =
                    bitmask & UNORDERED_COMPARE_FLAG
                        ? new SetCache()
                        : undefined;

            stack.set(array, other);
            stack.set(other, array);

            // Ignore non-index properties.
            while (++index < arrLength) {
                var arrValue = array[index],
                    othValue = other[index];

                if (customizer) {
                    var compared = isPartial
                        ? customizer(
                              othValue,
                              arrValue,
                              index,
                              other,
                              array,
                              stack
                          )
                        : customizer(
                              arrValue,
                              othValue,
                              index,
                              array,
                              other,
                              stack
                          );
                }
                if (compared !== undefined) {
                    if (compared) {
                        continue;
                    }
                    result = false;
                    break;
                }
                // Recursively compare arrays (susceptible to call stack limits).
                if (seen) {
                    if (
                        !arraySome(other, function(othValue, othIndex) {
                            if (
                                !seen.has(othIndex) &&
                                (arrValue === othValue ||
                                    equalFunc(
                                        arrValue,
                                        othValue,
                                        customizer,
                                        bitmask,
                                        stack
                                    ))
                            ) {
                                return seen.add(othIndex);
                            }
                        })
                    ) {
                        result = false;
                        break;
                    }
                } else if (
                    !(
                        arrValue === othValue ||
                        equalFunc(
                            arrValue,
                            othValue,
                            customizer,
                            bitmask,
                            stack
                        )
                    )
                ) {
                    result = false;
                    break;
                }
            }
            stack['delete'](array);
            stack['delete'](other);
            return result;
        }

        /**
         * A specialized version of `baseIsEqualDeep` for comparing objects of
         * the same `toStringTag`.
         *
         * **Note:** This function only supports comparing values with tags of
         * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
         *
         * @private
         * @param {Object} object The object to compare.
         * @param {Object} other The other object to compare.
         * @param {string} tag The `toStringTag` of the objects to compare.
         * @param {Function} equalFunc The function to determine equivalents of values.
         * @param {Function} customizer The function to customize comparisons.
         * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
         *  for more details.
         * @param {Object} stack Tracks traversed `object` and `other` objects.
         * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
         */
        function equalByTag(
            object,
            other,
            tag,
            equalFunc,
            customizer,
            bitmask,
            stack
        ) {
            switch (tag) {
                case dataViewTag:
                    if (
                        object.byteLength != other.byteLength ||
                        object.byteOffset != other.byteOffset
                    ) {
                        return false;
                    }
                    object = object.buffer;
                    other = other.buffer;

                case arrayBufferTag:
                    if (
                        object.byteLength != other.byteLength ||
                        !equalFunc(
                            new Uint8Array(object),
                            new Uint8Array(other)
                        )
                    ) {
                        return false;
                    }
                    return true;

                case boolTag:
                case dateTag:
                case numberTag:
                    // Coerce booleans to `1` or `0` and dates to milliseconds.
                    // Invalid dates are coerced to `NaN`.
                    return eq(+object, +other);

                case errorTag:
                    return (
                        object.name == other.name &&
                        object.message == other.message
                    );

                case regexpTag:
                case stringTag:
                    // Coerce regexes to strings and treat strings, primitives and objects,
                    // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
                    // for more details.
                    return object == other + '';

                case mapTag:
                    var convert = mapToArray;

                case setTag:
                    var isPartial = bitmask & PARTIAL_COMPARE_FLAG;
                    convert || (convert = setToArray);

                    if (object.size != other.size && !isPartial) {
                        return false;
                    }
                    // Assume cyclic values are equal.
                    var stacked = stack.get(object);
                    if (stacked) {
                        return stacked == other;
                    }
                    bitmask |= UNORDERED_COMPARE_FLAG;

                    // Recursively compare objects (susceptible to call stack limits).
                    stack.set(object, other);
                    var result = equalArrays(
                        convert(object),
                        convert(other),
                        equalFunc,
                        customizer,
                        bitmask,
                        stack
                    );
                    stack['delete'](object);
                    return result;

                case symbolTag:
                    if (symbolValueOf) {
                        return (
                            symbolValueOf.call(object) ==
                            symbolValueOf.call(other)
                        );
                    }
            }
            return false;
        }

        /**
         * A specialized version of `baseIsEqualDeep` for objects with support for
         * partial deep comparisons.
         *
         * @private
         * @param {Object} object The object to compare.
         * @param {Object} other The other object to compare.
         * @param {Function} equalFunc The function to determine equivalents of values.
         * @param {Function} customizer The function to customize comparisons.
         * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
         *  for more details.
         * @param {Object} stack Tracks traversed `object` and `other` objects.
         * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
         */
        function equalObjects(
            object,
            other,
            equalFunc,
            customizer,
            bitmask,
            stack
        ) {
            var isPartial = bitmask & PARTIAL_COMPARE_FLAG,
                objProps = keys(object),
                objLength = objProps.length,
                othProps = keys(other),
                othLength = othProps.length;

            if (objLength != othLength && !isPartial) {
                return false;
            }
            var index = objLength;
            while (index--) {
                var key = objProps[index];
                if (
                    !(isPartial
                        ? key in other
                        : hasOwnProperty.call(other, key))
                ) {
                    return false;
                }
            }
            // Assume cyclic values are equal.
            var stacked = stack.get(object);
            if (stacked && stack.get(other)) {
                return stacked == other;
            }
            var result = true;
            stack.set(object, other);
            stack.set(other, object);

            var skipCtor = isPartial;
            while (++index < objLength) {
                key = objProps[index];
                var objValue = object[key],
                    othValue = other[key];

                if (customizer) {
                    var compared = isPartial
                        ? customizer(
                              othValue,
                              objValue,
                              key,
                              other,
                              object,
                              stack
                          )
                        : customizer(
                              objValue,
                              othValue,
                              key,
                              object,
                              other,
                              stack
                          );
                }
                // Recursively compare objects (susceptible to call stack limits).
                if (
                    !(compared === undefined
                        ? objValue === othValue ||
                          equalFunc(
                              objValue,
                              othValue,
                              customizer,
                              bitmask,
                              stack
                          )
                        : compared)
                ) {
                    result = false;
                    break;
                }
                skipCtor || (skipCtor = key == 'constructor');
            }
            if (result && !skipCtor) {
                var objCtor = object.constructor,
                    othCtor = other.constructor;

                // Non `Object` object instances with different constructors are not equal.
                if (
                    objCtor != othCtor &&
                    ('constructor' in object && 'constructor' in other) &&
                    !(
                        typeof objCtor == 'function' &&
                        objCtor instanceof objCtor &&
                        typeof othCtor == 'function' &&
                        othCtor instanceof othCtor
                    )
                ) {
                    result = false;
                }
            }
            stack['delete'](object);
            stack['delete'](other);
            return result;
        }

        /**
         * Gets the data for `map`.
         *
         * @private
         * @param {Object} map The map to query.
         * @param {string} key The reference key.
         * @returns {*} Returns the map data.
         */
        function getMapData(map, key) {
            var data = map.__data__;
            return isKeyable(key)
                ? data[typeof key == 'string' ? 'string' : 'hash']
                : data.map;
        }

        /**
         * Gets the property names, values, and compare flags of `object`.
         *
         * @private
         * @param {Object} object The object to query.
         * @returns {Array} Returns the match data of `object`.
         */
        function getMatchData(object) {
            var result = keys(object),
                length = result.length;

            while (length--) {
                var key = result[length],
                    value = object[key];

                result[length] = [key, value, isStrictComparable(value)];
            }
            return result;
        }

        /**
         * Gets the native function at `key` of `object`.
         *
         * @private
         * @param {Object} object The object to query.
         * @param {string} key The key of the method to get.
         * @returns {*} Returns the function if it's native, else `undefined`.
         */
        function getNative(object, key) {
            var value = getValue(object, key);
            return baseIsNative(value) ? value : undefined;
        }

        /**
         * Gets the `toStringTag` of `value`.
         *
         * @private
         * @param {*} value The value to query.
         * @returns {string} Returns the `toStringTag`.
         */
        var getTag = baseGetTag;

        // Fallback for data views, maps, sets, and weak maps in IE 11,
        // for data views in Edge < 14, and promises in Node.js.
        if (
            (DataView &&
                getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
            (Map && getTag(new Map()) != mapTag) ||
            (Promise && getTag(Promise.resolve()) != promiseTag) ||
            (Set && getTag(new Set()) != setTag) ||
            (WeakMap && getTag(new WeakMap()) != weakMapTag)
        ) {
            getTag = function(value) {
                var result = objectToString.call(value),
                    Ctor = result == objectTag ? value.constructor : undefined,
                    ctorString = Ctor ? toSource(Ctor) : undefined;

                if (ctorString) {
                    switch (ctorString) {
                        case dataViewCtorString:
                            return dataViewTag;
                        case mapCtorString:
                            return mapTag;
                        case promiseCtorString:
                            return promiseTag;
                        case setCtorString:
                            return setTag;
                        case weakMapCtorString:
                            return weakMapTag;
                    }
                }
                return result;
            };
        }

        /**
         * Checks if `path` exists on `object`.
         *
         * @private
         * @param {Object} object The object to query.
         * @param {Array|string} path The path to check.
         * @param {Function} hasFunc The function to check properties.
         * @returns {boolean} Returns `true` if `path` exists, else `false`.
         */
        function hasPath(object, path, hasFunc) {
            path = isKey(path, object) ? [path] : castPath(path);

            var result,
                index = -1,
                length = path.length;

            while (++index < length) {
                var key = toKey(path[index]);
                if (!(result = object != null && hasFunc(object, key))) {
                    break;
                }
                object = object[key];
            }
            if (result) {
                return result;
            }
            var length = object ? object.length : 0;
            return (
                !!length &&
                isLength(length) &&
                isIndex(key, length) &&
                (isArray(object) || isArguments(object))
            );
        }

        /**
         * Checks if `value` is a valid array-like index.
         *
         * @private
         * @param {*} value The value to check.
         * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
         * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
         */
        function isIndex(value, length) {
            length = length == null ? MAX_SAFE_INTEGER : length;
            return (
                !!length &&
                (typeof value == 'number' || reIsUint.test(value)) &&
                (value > -1 && value % 1 == 0 && value < length)
            );
        }

        /**
         * Checks if `value` is a property name and not a property path.
         *
         * @private
         * @param {*} value The value to check.
         * @param {Object} [object] The object to query keys on.
         * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
         */
        function isKey(value, object) {
            if (isArray(value)) {
                return false;
            }
            var type = typeof value;
            if (
                type == 'number' ||
                type == 'symbol' ||
                type == 'boolean' ||
                value == null ||
                isSymbol(value)
            ) {
                return true;
            }
            return (
                reIsPlainProp.test(value) ||
                !reIsDeepProp.test(value) ||
                (object != null && value in Object(object))
            );
        }

        /**
         * Checks if `value` is suitable for use as unique object key.
         *
         * @private
         * @param {*} value The value to check.
         * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
         */
        function isKeyable(value) {
            var type = typeof value;
            return type == 'string' ||
                type == 'number' ||
                type == 'symbol' ||
                type == 'boolean'
                ? value !== '__proto__'
                : value === null;
        }

        /**
         * Checks if `func` has its source masked.
         *
         * @private
         * @param {Function} func The function to check.
         * @returns {boolean} Returns `true` if `func` is masked, else `false`.
         */
        function isMasked(func) {
            return !!maskSrcKey && maskSrcKey in func;
        }

        /**
         * Checks if `value` is likely a prototype object.
         *
         * @private
         * @param {*} value The value to check.
         * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
         */
        function isPrototype(value) {
            var Ctor = value && value.constructor,
                proto =
                    (typeof Ctor == 'function' && Ctor.prototype) ||
                    objectProto;

            return value === proto;
        }

        /**
         * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
         *
         * @private
         * @param {*} value The value to check.
         * @returns {boolean} Returns `true` if `value` if suitable for strict
         *  equality comparisons, else `false`.
         */
        function isStrictComparable(value) {
            return value === value && !isObject(value);
        }

        /**
         * A specialized version of `matchesProperty` for source values suitable
         * for strict equality comparisons, i.e. `===`.
         *
         * @private
         * @param {string} key The key of the property to get.
         * @param {*} srcValue The value to match.
         * @returns {Function} Returns the new spec function.
         */
        function matchesStrictComparable(key, srcValue) {
            return function(object) {
                if (object == null) {
                    return false;
                }
                return (
                    object[key] === srcValue &&
                    (srcValue !== undefined || key in Object(object))
                );
            };
        }

        /**
         * Converts `string` to a property path array.
         *
         * @private
         * @param {string} string The string to convert.
         * @returns {Array} Returns the property path array.
         */
        var stringToPath = memoize(function(string) {
            string = toString(string);

            var result = [];
            if (reLeadingDot.test(string)) {
                result.push('');
            }
            string.replace(rePropName, function(match, number, quote, string) {
                result.push(
                    quote ? string.replace(reEscapeChar, '$1') : number || match
                );
            });
            return result;
        });

        /**
         * Converts `value` to a string key if it's not a string or symbol.
         *
         * @private
         * @param {*} value The value to inspect.
         * @returns {string|symbol} Returns the key.
         */
        function toKey(value) {
            if (typeof value == 'string' || isSymbol(value)) {
                return value;
            }
            var result = value + '';
            return result == '0' && 1 / value == -INFINITY ? '-0' : result;
        }

        /**
         * Converts `func` to its source code.
         *
         * @private
         * @param {Function} func The function to process.
         * @returns {string} Returns the source code.
         */
        function toSource(func) {
            if (func != null) {
                try {
                    return funcToString.call(func);
                } catch (e) {}
                try {
                    return func + '';
                } catch (e) {}
            }
            return '';
        }

        /**
         * This method is like `_.uniq` except that it accepts `iteratee` which is
         * invoked for each element in `array` to generate the criterion by which
         * uniqueness is computed. The iteratee is invoked with one argument: (value).
         *
         * @static
         * @memberOf _
         * @since 4.0.0
         * @category Array
         * @param {Array} array The array to inspect.
         * @param {Function} [iteratee=_.identity]
         *  The iteratee invoked per element.
         * @returns {Array} Returns the new duplicate free array.
         * @example
         *
         * _.uniqBy([2.1, 1.2, 2.3], Math.floor);
         * // => [2.1, 1.2]
         *
         * // The `_.property` iteratee shorthand.
         * _.uniqBy([{ 'x': 1 }, { 'x': 2 }, { 'x': 1 }], 'x');
         * // => [{ 'x': 1 }, { 'x': 2 }]
         */
        function uniqBy(array, iteratee) {
            return array && array.length
                ? baseUniq(array, baseIteratee(iteratee, 2))
                : [];
        }

        /**
         * Creates a function that memoizes the result of `func`. If `resolver` is
         * provided, it determines the cache key for storing the result based on the
         * arguments provided to the memoized function. By default, the first argument
         * provided to the memoized function is used as the map cache key. The `func`
         * is invoked with the `this` binding of the memoized function.
         *
         * **Note:** The cache is exposed as the `cache` property on the memoized
         * function. Its creation may be customized by replacing the `_.memoize.Cache`
         * constructor with one whose instances implement the
         * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
         * method interface of `delete`, `get`, `has`, and `set`.
         *
         * @static
         * @memberOf _
         * @since 0.1.0
         * @category Function
         * @param {Function} func The function to have its output memoized.
         * @param {Function} [resolver] The function to resolve the cache key.
         * @returns {Function} Returns the new memoized function.
         * @example
         *
         * var object = { 'a': 1, 'b': 2 };
         * var other = { 'c': 3, 'd': 4 };
         *
         * var values = _.memoize(_.values);
         * values(object);
         * // => [1, 2]
         *
         * values(other);
         * // => [3, 4]
         *
         * object.a = 2;
         * values(object);
         * // => [1, 2]
         *
         * // Modify the result cache.
         * values.cache.set(object, ['a', 'b']);
         * values(object);
         * // => ['a', 'b']
         *
         * // Replace `_.memoize.Cache`.
         * _.memoize.Cache = WeakMap;
         */
        function memoize(func, resolver) {
            if (
                typeof func != 'function' ||
                (resolver && typeof resolver != 'function')
            ) {
                throw new TypeError(FUNC_ERROR_TEXT);
            }
            var memoized = function() {
                var args = arguments,
                    key = resolver ? resolver.apply(this, args) : args[0],
                    cache = memoized.cache;

                if (cache.has(key)) {
                    return cache.get(key);
                }
                var result = func.apply(this, args);
                memoized.cache = cache.set(key, result);
                return result;
            };
            memoized.cache = new (memoize.Cache || MapCache)();
            return memoized;
        }

        // Assign cache to `_.memoize`.
        memoize.Cache = MapCache;

        /**
         * Performs a
         * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
         * comparison between two values to determine if they are equivalent.
         *
         * @static
         * @memberOf _
         * @since 4.0.0
         * @category Lang
         * @param {*} value The value to compare.
         * @param {*} other The other value to compare.
         * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
         * @example
         *
         * var object = { 'a': 1 };
         * var other = { 'a': 1 };
         *
         * _.eq(object, object);
         * // => true
         *
         * _.eq(object, other);
         * // => false
         *
         * _.eq('a', 'a');
         * // => true
         *
         * _.eq('a', Object('a'));
         * // => false
         *
         * _.eq(NaN, NaN);
         * // => true
         */
        function eq(value, other) {
            return value === other || (value !== value && other !== other);
        }

        /**
         * Checks if `value` is likely an `arguments` object.
         *
         * @static
         * @memberOf _
         * @since 0.1.0
         * @category Lang
         * @param {*} value The value to check.
         * @returns {boolean} Returns `true` if `value` is an `arguments` object,
         *  else `false`.
         * @example
         *
         * _.isArguments(function() { return arguments; }());
         * // => true
         *
         * _.isArguments([1, 2, 3]);
         * // => false
         */
        function isArguments(value) {
            // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
            return (
                isArrayLikeObject(value) &&
                hasOwnProperty.call(value, 'callee') &&
                (!propertyIsEnumerable.call(value, 'callee') ||
                    objectToString.call(value) == argsTag)
            );
        }

        /**
         * Checks if `value` is classified as an `Array` object.
         *
         * @static
         * @memberOf _
         * @since 0.1.0
         * @category Lang
         * @param {*} value The value to check.
         * @returns {boolean} Returns `true` if `value` is an array, else `false`.
         * @example
         *
         * _.isArray([1, 2, 3]);
         * // => true
         *
         * _.isArray(document.body.children);
         * // => false
         *
         * _.isArray('abc');
         * // => false
         *
         * _.isArray(_.noop);
         * // => false
         */
        var isArray = Array.isArray;

        /**
         * Checks if `value` is array-like. A value is considered array-like if it's
         * not a function and has a `value.length` that's an integer greater than or
         * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
         *
         * @static
         * @memberOf _
         * @since 4.0.0
         * @category Lang
         * @param {*} value The value to check.
         * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
         * @example
         *
         * _.isArrayLike([1, 2, 3]);
         * // => true
         *
         * _.isArrayLike(document.body.children);
         * // => true
         *
         * _.isArrayLike('abc');
         * // => true
         *
         * _.isArrayLike(_.noop);
         * // => false
         */
        function isArrayLike(value) {
            return (
                value != null && isLength(value.length) && !isFunction(value)
            );
        }

        /**
         * This method is like `_.isArrayLike` except that it also checks if `value`
         * is an object.
         *
         * @static
         * @memberOf _
         * @since 4.0.0
         * @category Lang
         * @param {*} value The value to check.
         * @returns {boolean} Returns `true` if `value` is an array-like object,
         *  else `false`.
         * @example
         *
         * _.isArrayLikeObject([1, 2, 3]);
         * // => true
         *
         * _.isArrayLikeObject(document.body.children);
         * // => true
         *
         * _.isArrayLikeObject('abc');
         * // => false
         *
         * _.isArrayLikeObject(_.noop);
         * // => false
         */
        function isArrayLikeObject(value) {
            return isObjectLike(value) && isArrayLike(value);
        }

        /**
         * Checks if `value` is classified as a `Function` object.
         *
         * @static
         * @memberOf _
         * @since 0.1.0
         * @category Lang
         * @param {*} value The value to check.
         * @returns {boolean} Returns `true` if `value` is a function, else `false`.
         * @example
         *
         * _.isFunction(_);
         * // => true
         *
         * _.isFunction(/abc/);
         * // => false
         */
        function isFunction(value) {
            // The use of `Object#toString` avoids issues with the `typeof` operator
            // in Safari 8-9 which returns 'object' for typed array and other constructors.
            var tag = isObject(value) ? objectToString.call(value) : '';
            return tag == funcTag || tag == genTag;
        }

        /**
         * Checks if `value` is a valid array-like length.
         *
         * **Note:** This method is loosely based on
         * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
         *
         * @static
         * @memberOf _
         * @since 4.0.0
         * @category Lang
         * @param {*} value The value to check.
         * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
         * @example
         *
         * _.isLength(3);
         * // => true
         *
         * _.isLength(Number.MIN_VALUE);
         * // => false
         *
         * _.isLength(Infinity);
         * // => false
         *
         * _.isLength('3');
         * // => false
         */
        function isLength(value) {
            return (
                typeof value == 'number' &&
                value > -1 &&
                value % 1 == 0 &&
                value <= MAX_SAFE_INTEGER
            );
        }

        /**
         * Checks if `value` is the
         * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
         * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
         *
         * @static
         * @memberOf _
         * @since 0.1.0
         * @category Lang
         * @param {*} value The value to check.
         * @returns {boolean} Returns `true` if `value` is an object, else `false`.
         * @example
         *
         * _.isObject({});
         * // => true
         *
         * _.isObject([1, 2, 3]);
         * // => true
         *
         * _.isObject(_.noop);
         * // => true
         *
         * _.isObject(null);
         * // => false
         */
        function isObject(value) {
            var type = typeof value;
            return !!value && (type == 'object' || type == 'function');
        }

        /**
         * Checks if `value` is object-like. A value is object-like if it's not `null`
         * and has a `typeof` result of "object".
         *
         * @static
         * @memberOf _
         * @since 4.0.0
         * @category Lang
         * @param {*} value The value to check.
         * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
         * @example
         *
         * _.isObjectLike({});
         * // => true
         *
         * _.isObjectLike([1, 2, 3]);
         * // => true
         *
         * _.isObjectLike(_.noop);
         * // => false
         *
         * _.isObjectLike(null);
         * // => false
         */
        function isObjectLike(value) {
            return !!value && typeof value == 'object';
        }

        /**
         * Checks if `value` is classified as a `Symbol` primitive or object.
         *
         * @static
         * @memberOf _
         * @since 4.0.0
         * @category Lang
         * @param {*} value The value to check.
         * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
         * @example
         *
         * _.isSymbol(Symbol.iterator);
         * // => true
         *
         * _.isSymbol('abc');
         * // => false
         */
        function isSymbol(value) {
            return (
                typeof value == 'symbol' ||
                (isObjectLike(value) && objectToString.call(value) == symbolTag)
            );
        }

        /**
         * Checks if `value` is classified as a typed array.
         *
         * @static
         * @memberOf _
         * @since 3.0.0
         * @category Lang
         * @param {*} value The value to check.
         * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
         * @example
         *
         * _.isTypedArray(new Uint8Array);
         * // => true
         *
         * _.isTypedArray([]);
         * // => false
         */
        var isTypedArray = nodeIsTypedArray
            ? baseUnary(nodeIsTypedArray)
            : baseIsTypedArray;

        /**
         * Converts `value` to a string. An empty string is returned for `null`
         * and `undefined` values. The sign of `-0` is preserved.
         *
         * @static
         * @memberOf _
         * @since 4.0.0
         * @category Lang
         * @param {*} value The value to process.
         * @returns {string} Returns the string.
         * @example
         *
         * _.toString(null);
         * // => ''
         *
         * _.toString(-0);
         * // => '-0'
         *
         * _.toString([1, 2, 3]);
         * // => '1,2,3'
         */
        function toString(value) {
            return value == null ? '' : baseToString(value);
        }

        /**
         * Gets the value at `path` of `object`. If the resolved value is
         * `undefined`, the `defaultValue` is returned in its place.
         *
         * @static
         * @memberOf _
         * @since 3.7.0
         * @category Object
         * @param {Object} object The object to query.
         * @param {Array|string} path The path of the property to get.
         * @param {*} [defaultValue] The value returned for `undefined` resolved values.
         * @returns {*} Returns the resolved value.
         * @example
         *
         * var object = { 'a': [{ 'b': { 'c': 3 } }] };
         *
         * _.get(object, 'a[0].b.c');
         * // => 3
         *
         * _.get(object, ['a', '0', 'b', 'c']);
         * // => 3
         *
         * _.get(object, 'a.b.c', 'default');
         * // => 'default'
         */
        function get(object, path, defaultValue) {
            var result = object == null ? undefined : baseGet(object, path);
            return result === undefined ? defaultValue : result;
        }

        /**
         * Checks if `path` is a direct or inherited property of `object`.
         *
         * @static
         * @memberOf _
         * @since 4.0.0
         * @category Object
         * @param {Object} object The object to query.
         * @param {Array|string} path The path to check.
         * @returns {boolean} Returns `true` if `path` exists, else `false`.
         * @example
         *
         * var object = _.create({ 'a': _.create({ 'b': 2 }) });
         *
         * _.hasIn(object, 'a');
         * // => true
         *
         * _.hasIn(object, 'a.b');
         * // => true
         *
         * _.hasIn(object, ['a', 'b']);
         * // => true
         *
         * _.hasIn(object, 'b');
         * // => false
         */
        function hasIn(object, path) {
            return object != null && hasPath(object, path, baseHasIn);
        }

        /**
         * Creates an array of the own enumerable property names of `object`.
         *
         * **Note:** Non-object values are coerced to objects. See the
         * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
         * for more details.
         *
         * @static
         * @since 0.1.0
         * @memberOf _
         * @category Object
         * @param {Object} object The object to query.
         * @returns {Array} Returns the array of property names.
         * @example
         *
         * function Foo() {
         *   this.a = 1;
         *   this.b = 2;
         * }
         *
         * Foo.prototype.c = 3;
         *
         * _.keys(new Foo);
         * // => ['a', 'b'] (iteration order is not guaranteed)
         *
         * _.keys('hi');
         * // => ['0', '1']
         */
        function keys(object) {
            return isArrayLike(object)
                ? arrayLikeKeys(object)
                : baseKeys(object);
        }

        /**
         * This method returns the first argument it receives.
         *
         * @static
         * @since 0.1.0
         * @memberOf _
         * @category Util
         * @param {*} value Any value.
         * @returns {*} Returns `value`.
         * @example
         *
         * var object = { 'a': 1 };
         *
         * console.log(_.identity(object) === object);
         * // => true
         */
        function identity(value) {
            return value;
        }

        /**
         * This method returns `undefined`.
         *
         * @static
         * @memberOf _
         * @since 2.3.0
         * @category Util
         * @example
         *
         * _.times(2, _.noop);
         * // => [undefined, undefined]
         */
        function noop() {
            // No operation performed.
        }

        /**
         * Creates a function that returns the value at `path` of a given object.
         *
         * @static
         * @memberOf _
         * @since 2.4.0
         * @category Util
         * @param {Array|string} path The path of the property to get.
         * @returns {Function} Returns the new accessor function.
         * @example
         *
         * var objects = [
         *   { 'a': { 'b': 2 } },
         *   { 'a': { 'b': 1 } }
         * ];
         *
         * _.map(objects, _.property('a.b'));
         * // => [2, 1]
         *
         * _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
         * // => [1, 2]
         */
        function property(path) {
            return isKey(path)
                ? baseProperty(toKey(path))
                : basePropertyDeep(path);
        }

        module.exports = uniqBy;
    });

    var index$3 = createCommonjsModule(function(module, exports) {
        /**
         * lodash (Custom Build) <https://lodash.com/>
         * Build: `lodash modularize exports="npm" -o ./`
         * Copyright jQuery Foundation and other contributors <https://jquery.org/>
         * Released under MIT license <https://lodash.com/license>
         * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
         * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
         */

        /** Used as the size to enable large array optimizations. */
        var LARGE_ARRAY_SIZE = 200;

        /** Used as the `TypeError` message for "Functions" methods. */
        var FUNC_ERROR_TEXT = 'Expected a function';

        /** Used to stand-in for `undefined` hash values. */
        var HASH_UNDEFINED = '__lodash_hash_undefined__';

        /** Used to compose bitmasks for comparison styles. */
        var UNORDERED_COMPARE_FLAG = 1,
            PARTIAL_COMPARE_FLAG = 2;

        /** Used as references for various `Number` constants. */
        var INFINITY = 1 / 0,
            MAX_SAFE_INTEGER = 9007199254740991;

        /** `Object#toString` result references. */
        var argsTag = '[object Arguments]',
            arrayTag = '[object Array]',
            boolTag = '[object Boolean]',
            dateTag = '[object Date]',
            errorTag = '[object Error]',
            funcTag = '[object Function]',
            genTag = '[object GeneratorFunction]',
            mapTag = '[object Map]',
            numberTag = '[object Number]',
            objectTag = '[object Object]',
            promiseTag = '[object Promise]',
            regexpTag = '[object RegExp]',
            setTag = '[object Set]',
            stringTag = '[object String]',
            symbolTag = '[object Symbol]',
            weakMapTag = '[object WeakMap]';

        var arrayBufferTag = '[object ArrayBuffer]',
            dataViewTag = '[object DataView]',
            float32Tag = '[object Float32Array]',
            float64Tag = '[object Float64Array]',
            int8Tag = '[object Int8Array]',
            int16Tag = '[object Int16Array]',
            int32Tag = '[object Int32Array]',
            uint8Tag = '[object Uint8Array]',
            uint8ClampedTag = '[object Uint8ClampedArray]',
            uint16Tag = '[object Uint16Array]',
            uint32Tag = '[object Uint32Array]';

        /** Used to match property names within property paths. */
        var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
            reIsPlainProp = /^\w*$/,
            reLeadingDot = /^\./,
            rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

        /**
         * Used to match `RegExp`
         * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
         */
        var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

        /** Used to match backslashes in property paths. */
        var reEscapeChar = /\\(\\)?/g;

        /** Used to detect host constructors (Safari). */
        var reIsHostCtor = /^\[object .+?Constructor\]$/;

        /** Used to detect unsigned integer values. */
        var reIsUint = /^(?:0|[1-9]\d*)$/;

        /** Used to identify `toStringTag` values of typed arrays. */
        var typedArrayTags = {};
        typedArrayTags[float32Tag] = typedArrayTags[
            float64Tag
        ] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[
            int32Tag
        ] = typedArrayTags[uint8Tag] = typedArrayTags[
            uint8ClampedTag
        ] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
        typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[
            arrayBufferTag
        ] = typedArrayTags[boolTag] = typedArrayTags[
            dataViewTag
        ] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[
            funcTag
        ] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[
            objectTag
        ] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[
            stringTag
        ] = typedArrayTags[weakMapTag] = false;

        /** Detect free variable `global` from Node.js. */
        var freeGlobal =
            typeof commonjsGlobal == 'object' &&
            commonjsGlobal &&
            commonjsGlobal.Object === Object &&
            commonjsGlobal;

        /** Detect free variable `self`. */
        var freeSelf =
            typeof self == 'object' && self && self.Object === Object && self;

        /** Used as a reference to the global object. */
        var root = freeGlobal || freeSelf || Function('return this')();

        /** Detect free variable `exports`. */
        var freeExports =
            'object' == 'object' && exports && !exports.nodeType && exports;

        /** Detect free variable `module`. */
        var freeModule =
            freeExports &&
            'object' == 'object' &&
            module &&
            !module.nodeType &&
            module;

        /** Detect the popular CommonJS extension `module.exports`. */
        var moduleExports = freeModule && freeModule.exports === freeExports;

        /** Detect free variable `process` from Node.js. */
        var freeProcess = moduleExports && freeGlobal.process;

        /** Used to access faster Node.js helpers. */
        var nodeUtil = (function() {
            try {
                return freeProcess && freeProcess.binding('util');
            } catch (e) {}
        })();

        /* Node.js helper references. */
        var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

        /**
         * A specialized version of `baseAggregator` for arrays.
         *
         * @private
         * @param {Array} [array] The array to iterate over.
         * @param {Function} setter The function to set `accumulator` values.
         * @param {Function} iteratee The iteratee to transform keys.
         * @param {Object} accumulator The initial aggregated object.
         * @returns {Function} Returns `accumulator`.
         */
        function arrayAggregator(array, setter, iteratee, accumulator) {
            var index = -1,
                length = array ? array.length : 0;

            while (++index < length) {
                var value = array[index];
                setter(accumulator, value, iteratee(value), array);
            }
            return accumulator;
        }

        /**
         * A specialized version of `_.some` for arrays without support for iteratee
         * shorthands.
         *
         * @private
         * @param {Array} [array] The array to iterate over.
         * @param {Function} predicate The function invoked per iteration.
         * @returns {boolean} Returns `true` if any element passes the predicate check,
         *  else `false`.
         */
        function arraySome(array, predicate) {
            var index = -1,
                length = array ? array.length : 0;

            while (++index < length) {
                if (predicate(array[index], index, array)) {
                    return true;
                }
            }
            return false;
        }

        /**
         * The base implementation of `_.property` without support for deep paths.
         *
         * @private
         * @param {string} key The key of the property to get.
         * @returns {Function} Returns the new accessor function.
         */
        function baseProperty(key) {
            return function(object) {
                return object == null ? undefined : object[key];
            };
        }

        /**
         * The base implementation of `_.times` without support for iteratee shorthands
         * or max array length checks.
         *
         * @private
         * @param {number} n The number of times to invoke `iteratee`.
         * @param {Function} iteratee The function invoked per iteration.
         * @returns {Array} Returns the array of results.
         */
        function baseTimes(n, iteratee) {
            var index = -1,
                result = Array(n);

            while (++index < n) {
                result[index] = iteratee(index);
            }
            return result;
        }

        /**
         * The base implementation of `_.unary` without support for storing metadata.
         *
         * @private
         * @param {Function} func The function to cap arguments for.
         * @returns {Function} Returns the new capped function.
         */
        function baseUnary(func) {
            return function(value) {
                return func(value);
            };
        }

        /**
         * Gets the value at `key` of `object`.
         *
         * @private
         * @param {Object} [object] The object to query.
         * @param {string} key The key of the property to get.
         * @returns {*} Returns the property value.
         */
        function getValue(object, key) {
            return object == null ? undefined : object[key];
        }

        /**
         * Checks if `value` is a host object in IE < 9.
         *
         * @private
         * @param {*} value The value to check.
         * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
         */
        function isHostObject(value) {
            // Many host objects are `Object` objects that can coerce to strings
            // despite having improperly defined `toString` methods.
            var result = false;
            if (value != null && typeof value.toString != 'function') {
                try {
                    result = !!(value + '');
                } catch (e) {}
            }
            return result;
        }

        /**
         * Converts `map` to its key-value pairs.
         *
         * @private
         * @param {Object} map The map to convert.
         * @returns {Array} Returns the key-value pairs.
         */
        function mapToArray(map) {
            var index = -1,
                result = Array(map.size);

            map.forEach(function(value, key) {
                result[++index] = [key, value];
            });
            return result;
        }

        /**
         * Creates a unary function that invokes `func` with its argument transformed.
         *
         * @private
         * @param {Function} func The function to wrap.
         * @param {Function} transform The argument transform.
         * @returns {Function} Returns the new function.
         */
        function overArg(func, transform) {
            return function(arg) {
                return func(transform(arg));
            };
        }

        /**
         * Converts `set` to an array of its values.
         *
         * @private
         * @param {Object} set The set to convert.
         * @returns {Array} Returns the values.
         */
        function setToArray(set) {
            var index = -1,
                result = Array(set.size);

            set.forEach(function(value) {
                result[++index] = value;
            });
            return result;
        }

        /** Used for built-in method references. */
        var arrayProto = Array.prototype,
            funcProto = Function.prototype,
            objectProto = Object.prototype;

        /** Used to detect overreaching core-js shims. */
        var coreJsData = root['__core-js_shared__'];

        /** Used to detect methods masquerading as native. */
        var maskSrcKey = (function() {
            var uid = /[^.]+$/.exec(
                (coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO) ||
                    ''
            );
            return uid ? 'Symbol(src)_1.' + uid : '';
        })();

        /** Used to resolve the decompiled source of functions. */
        var funcToString = funcProto.toString;

        /** Used to check objects for own properties. */
        var hasOwnProperty = objectProto.hasOwnProperty;

        /**
         * Used to resolve the
         * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
         * of values.
         */
        var objectToString = objectProto.toString;

        /** Used to detect if a method is native. */
        var reIsNative = RegExp(
            '^' +
                funcToString
                    .call(hasOwnProperty)
                    .replace(reRegExpChar, '\\$&')
                    .replace(
                        /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
                        '$1.*?'
                    ) +
                '$'
        );

        /** Built-in value references. */
        var Symbol = root.Symbol,
            Uint8Array = root.Uint8Array,
            propertyIsEnumerable = objectProto.propertyIsEnumerable,
            splice = arrayProto.splice;

        /* Built-in method references for those with the same name as other `lodash` methods. */
        var nativeKeys = overArg(Object.keys, Object);

        /* Built-in method references that are verified to be native. */
        var DataView = getNative(root, 'DataView'),
            Map = getNative(root, 'Map'),
            Promise = getNative(root, 'Promise'),
            Set = getNative(root, 'Set'),
            WeakMap = getNative(root, 'WeakMap'),
            nativeCreate = getNative(Object, 'create');

        /** Used to detect maps, sets, and weakmaps. */
        var dataViewCtorString = toSource(DataView),
            mapCtorString = toSource(Map),
            promiseCtorString = toSource(Promise),
            setCtorString = toSource(Set),
            weakMapCtorString = toSource(WeakMap);

        /** Used to convert symbols to primitives and strings. */
        var symbolProto = Symbol ? Symbol.prototype : undefined,
            symbolValueOf = symbolProto ? symbolProto.valueOf : undefined,
            symbolToString = symbolProto ? symbolProto.toString : undefined;

        /**
         * Creates a hash object.
         *
         * @private
         * @constructor
         * @param {Array} [entries] The key-value pairs to cache.
         */
        function Hash(entries) {
            var index = -1,
                length = entries ? entries.length : 0;

            this.clear();
            while (++index < length) {
                var entry = entries[index];
                this.set(entry[0], entry[1]);
            }
        }

        /**
         * Removes all key-value entries from the hash.
         *
         * @private
         * @name clear
         * @memberOf Hash
         */
        function hashClear() {
            this.__data__ = nativeCreate ? nativeCreate(null) : {};
        }

        /**
         * Removes `key` and its value from the hash.
         *
         * @private
         * @name delete
         * @memberOf Hash
         * @param {Object} hash The hash to modify.
         * @param {string} key The key of the value to remove.
         * @returns {boolean} Returns `true` if the entry was removed, else `false`.
         */
        function hashDelete(key) {
            return this.has(key) && delete this.__data__[key];
        }

        /**
         * Gets the hash value for `key`.
         *
         * @private
         * @name get
         * @memberOf Hash
         * @param {string} key The key of the value to get.
         * @returns {*} Returns the entry value.
         */
        function hashGet(key) {
            var data = this.__data__;
            if (nativeCreate) {
                var result = data[key];
                return result === HASH_UNDEFINED ? undefined : result;
            }
            return hasOwnProperty.call(data, key) ? data[key] : undefined;
        }

        /**
         * Checks if a hash value for `key` exists.
         *
         * @private
         * @name has
         * @memberOf Hash
         * @param {string} key The key of the entry to check.
         * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
         */
        function hashHas(key) {
            var data = this.__data__;
            return nativeCreate
                ? data[key] !== undefined
                : hasOwnProperty.call(data, key);
        }

        /**
         * Sets the hash `key` to `value`.
         *
         * @private
         * @name set
         * @memberOf Hash
         * @param {string} key The key of the value to set.
         * @param {*} value The value to set.
         * @returns {Object} Returns the hash instance.
         */
        function hashSet(key, value) {
            var data = this.__data__;
            data[key] =
                nativeCreate && value === undefined ? HASH_UNDEFINED : value;
            return this;
        }

        // Add methods to `Hash`.
        Hash.prototype.clear = hashClear;
        Hash.prototype['delete'] = hashDelete;
        Hash.prototype.get = hashGet;
        Hash.prototype.has = hashHas;
        Hash.prototype.set = hashSet;

        /**
         * Creates an list cache object.
         *
         * @private
         * @constructor
         * @param {Array} [entries] The key-value pairs to cache.
         */
        function ListCache(entries) {
            var index = -1,
                length = entries ? entries.length : 0;

            this.clear();
            while (++index < length) {
                var entry = entries[index];
                this.set(entry[0], entry[1]);
            }
        }

        /**
         * Removes all key-value entries from the list cache.
         *
         * @private
         * @name clear
         * @memberOf ListCache
         */
        function listCacheClear() {
            this.__data__ = [];
        }

        /**
         * Removes `key` and its value from the list cache.
         *
         * @private
         * @name delete
         * @memberOf ListCache
         * @param {string} key The key of the value to remove.
         * @returns {boolean} Returns `true` if the entry was removed, else `false`.
         */
        function listCacheDelete(key) {
            var data = this.__data__,
                index = assocIndexOf(data, key);

            if (index < 0) {
                return false;
            }
            var lastIndex = data.length - 1;
            if (index == lastIndex) {
                data.pop();
            } else {
                splice.call(data, index, 1);
            }
            return true;
        }

        /**
         * Gets the list cache value for `key`.
         *
         * @private
         * @name get
         * @memberOf ListCache
         * @param {string} key The key of the value to get.
         * @returns {*} Returns the entry value.
         */
        function listCacheGet(key) {
            var data = this.__data__,
                index = assocIndexOf(data, key);

            return index < 0 ? undefined : data[index][1];
        }

        /**
         * Checks if a list cache value for `key` exists.
         *
         * @private
         * @name has
         * @memberOf ListCache
         * @param {string} key The key of the entry to check.
         * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
         */
        function listCacheHas(key) {
            return assocIndexOf(this.__data__, key) > -1;
        }

        /**
         * Sets the list cache `key` to `value`.
         *
         * @private
         * @name set
         * @memberOf ListCache
         * @param {string} key The key of the value to set.
         * @param {*} value The value to set.
         * @returns {Object} Returns the list cache instance.
         */
        function listCacheSet(key, value) {
            var data = this.__data__,
                index = assocIndexOf(data, key);

            if (index < 0) {
                data.push([key, value]);
            } else {
                data[index][1] = value;
            }
            return this;
        }

        // Add methods to `ListCache`.
        ListCache.prototype.clear = listCacheClear;
        ListCache.prototype['delete'] = listCacheDelete;
        ListCache.prototype.get = listCacheGet;
        ListCache.prototype.has = listCacheHas;
        ListCache.prototype.set = listCacheSet;

        /**
         * Creates a map cache object to store key-value pairs.
         *
         * @private
         * @constructor
         * @param {Array} [entries] The key-value pairs to cache.
         */
        function MapCache(entries) {
            var index = -1,
                length = entries ? entries.length : 0;

            this.clear();
            while (++index < length) {
                var entry = entries[index];
                this.set(entry[0], entry[1]);
            }
        }

        /**
         * Removes all key-value entries from the map.
         *
         * @private
         * @name clear
         * @memberOf MapCache
         */
        function mapCacheClear() {
            this.__data__ = {
                hash: new Hash(),
                map: new (Map || ListCache)(),
                string: new Hash(),
            };
        }

        /**
         * Removes `key` and its value from the map.
         *
         * @private
         * @name delete
         * @memberOf MapCache
         * @param {string} key The key of the value to remove.
         * @returns {boolean} Returns `true` if the entry was removed, else `false`.
         */
        function mapCacheDelete(key) {
            return getMapData(this, key)['delete'](key);
        }

        /**
         * Gets the map value for `key`.
         *
         * @private
         * @name get
         * @memberOf MapCache
         * @param {string} key The key of the value to get.
         * @returns {*} Returns the entry value.
         */
        function mapCacheGet(key) {
            return getMapData(this, key).get(key);
        }

        /**
         * Checks if a map value for `key` exists.
         *
         * @private
         * @name has
         * @memberOf MapCache
         * @param {string} key The key of the entry to check.
         * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
         */
        function mapCacheHas(key) {
            return getMapData(this, key).has(key);
        }

        /**
         * Sets the map `key` to `value`.
         *
         * @private
         * @name set
         * @memberOf MapCache
         * @param {string} key The key of the value to set.
         * @param {*} value The value to set.
         * @returns {Object} Returns the map cache instance.
         */
        function mapCacheSet(key, value) {
            getMapData(this, key).set(key, value);
            return this;
        }

        // Add methods to `MapCache`.
        MapCache.prototype.clear = mapCacheClear;
        MapCache.prototype['delete'] = mapCacheDelete;
        MapCache.prototype.get = mapCacheGet;
        MapCache.prototype.has = mapCacheHas;
        MapCache.prototype.set = mapCacheSet;

        /**
         *
         * Creates an array cache object to store unique values.
         *
         * @private
         * @constructor
         * @param {Array} [values] The values to cache.
         */
        function SetCache(values) {
            var index = -1,
                length = values ? values.length : 0;

            this.__data__ = new MapCache();
            while (++index < length) {
                this.add(values[index]);
            }
        }

        /**
         * Adds `value` to the array cache.
         *
         * @private
         * @name add
         * @memberOf SetCache
         * @alias push
         * @param {*} value The value to cache.
         * @returns {Object} Returns the cache instance.
         */
        function setCacheAdd(value) {
            this.__data__.set(value, HASH_UNDEFINED);
            return this;
        }

        /**
         * Checks if `value` is in the array cache.
         *
         * @private
         * @name has
         * @memberOf SetCache
         * @param {*} value The value to search for.
         * @returns {number} Returns `true` if `value` is found, else `false`.
         */
        function setCacheHas(value) {
            return this.__data__.has(value);
        }

        // Add methods to `SetCache`.
        SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
        SetCache.prototype.has = setCacheHas;

        /**
         * Creates a stack cache object to store key-value pairs.
         *
         * @private
         * @constructor
         * @param {Array} [entries] The key-value pairs to cache.
         */
        function Stack(entries) {
            this.__data__ = new ListCache(entries);
        }

        /**
         * Removes all key-value entries from the stack.
         *
         * @private
         * @name clear
         * @memberOf Stack
         */
        function stackClear() {
            this.__data__ = new ListCache();
        }

        /**
         * Removes `key` and its value from the stack.
         *
         * @private
         * @name delete
         * @memberOf Stack
         * @param {string} key The key of the value to remove.
         * @returns {boolean} Returns `true` if the entry was removed, else `false`.
         */
        function stackDelete(key) {
            return this.__data__['delete'](key);
        }

        /**
         * Gets the stack value for `key`.
         *
         * @private
         * @name get
         * @memberOf Stack
         * @param {string} key The key of the value to get.
         * @returns {*} Returns the entry value.
         */
        function stackGet(key) {
            return this.__data__.get(key);
        }

        /**
         * Checks if a stack value for `key` exists.
         *
         * @private
         * @name has
         * @memberOf Stack
         * @param {string} key The key of the entry to check.
         * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
         */
        function stackHas(key) {
            return this.__data__.has(key);
        }

        /**
         * Sets the stack `key` to `value`.
         *
         * @private
         * @name set
         * @memberOf Stack
         * @param {string} key The key of the value to set.
         * @param {*} value The value to set.
         * @returns {Object} Returns the stack cache instance.
         */
        function stackSet(key, value) {
            var cache = this.__data__;
            if (cache instanceof ListCache) {
                var pairs = cache.__data__;
                if (!Map || pairs.length < LARGE_ARRAY_SIZE - 1) {
                    pairs.push([key, value]);
                    return this;
                }
                cache = this.__data__ = new MapCache(pairs);
            }
            cache.set(key, value);
            return this;
        }

        // Add methods to `Stack`.
        Stack.prototype.clear = stackClear;
        Stack.prototype['delete'] = stackDelete;
        Stack.prototype.get = stackGet;
        Stack.prototype.has = stackHas;
        Stack.prototype.set = stackSet;

        /**
         * Creates an array of the enumerable property names of the array-like `value`.
         *
         * @private
         * @param {*} value The value to query.
         * @param {boolean} inherited Specify returning inherited property names.
         * @returns {Array} Returns the array of property names.
         */
        function arrayLikeKeys(value, inherited) {
            // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
            // Safari 9 makes `arguments.length` enumerable in strict mode.
            var result =
                isArray(value) || isArguments(value)
                    ? baseTimes(value.length, String)
                    : [];

            var length = result.length,
                skipIndexes = !!length;

            for (var key in value) {
                if (
                    (inherited || hasOwnProperty.call(value, key)) &&
                    !(skipIndexes && (key == 'length' || isIndex(key, length)))
                ) {
                    result.push(key);
                }
            }
            return result;
        }

        /**
         * Gets the index at which the `key` is found in `array` of key-value pairs.
         *
         * @private
         * @param {Array} array The array to inspect.
         * @param {*} key The key to search for.
         * @returns {number} Returns the index of the matched value, else `-1`.
         */
        function assocIndexOf(array, key) {
            var length = array.length;
            while (length--) {
                if (eq(array[length][0], key)) {
                    return length;
                }
            }
            return -1;
        }

        /**
         * Aggregates elements of `collection` on `accumulator` with keys transformed
         * by `iteratee` and values set by `setter`.
         *
         * @private
         * @param {Array|Object} collection The collection to iterate over.
         * @param {Function} setter The function to set `accumulator` values.
         * @param {Function} iteratee The iteratee to transform keys.
         * @param {Object} accumulator The initial aggregated object.
         * @returns {Function} Returns `accumulator`.
         */
        function baseAggregator(collection, setter, iteratee, accumulator) {
            baseEach(collection, function(value, key, collection) {
                setter(accumulator, value, iteratee(value), collection);
            });
            return accumulator;
        }

        /**
         * The base implementation of `_.forEach` without support for iteratee shorthands.
         *
         * @private
         * @param {Array|Object} collection The collection to iterate over.
         * @param {Function} iteratee The function invoked per iteration.
         * @returns {Array|Object} Returns `collection`.
         */
        var baseEach = createBaseEach(baseForOwn);

        /**
         * The base implementation of `baseForOwn` which iterates over `object`
         * properties returned by `keysFunc` and invokes `iteratee` for each property.
         * Iteratee functions may exit iteration early by explicitly returning `false`.
         *
         * @private
         * @param {Object} object The object to iterate over.
         * @param {Function} iteratee The function invoked per iteration.
         * @param {Function} keysFunc The function to get the keys of `object`.
         * @returns {Object} Returns `object`.
         */
        var baseFor = createBaseFor();

        /**
         * The base implementation of `_.forOwn` without support for iteratee shorthands.
         *
         * @private
         * @param {Object} object The object to iterate over.
         * @param {Function} iteratee The function invoked per iteration.
         * @returns {Object} Returns `object`.
         */
        function baseForOwn(object, iteratee) {
            return object && baseFor(object, iteratee, keys);
        }

        /**
         * The base implementation of `_.get` without support for default values.
         *
         * @private
         * @param {Object} object The object to query.
         * @param {Array|string} path The path of the property to get.
         * @returns {*} Returns the resolved value.
         */
        function baseGet(object, path) {
            path = isKey(path, object) ? [path] : castPath(path);

            var index = 0,
                length = path.length;

            while (object != null && index < length) {
                object = object[toKey(path[index++])];
            }
            return index && index == length ? object : undefined;
        }

        /**
         * The base implementation of `getTag`.
         *
         * @private
         * @param {*} value The value to query.
         * @returns {string} Returns the `toStringTag`.
         */
        function baseGetTag(value) {
            return objectToString.call(value);
        }

        /**
         * The base implementation of `_.hasIn` without support for deep paths.
         *
         * @private
         * @param {Object} [object] The object to query.
         * @param {Array|string} key The key to check.
         * @returns {boolean} Returns `true` if `key` exists, else `false`.
         */
        function baseHasIn(object, key) {
            return object != null && key in Object(object);
        }

        /**
         * The base implementation of `_.isEqual` which supports partial comparisons
         * and tracks traversed objects.
         *
         * @private
         * @param {*} value The value to compare.
         * @param {*} other The other value to compare.
         * @param {Function} [customizer] The function to customize comparisons.
         * @param {boolean} [bitmask] The bitmask of comparison flags.
         *  The bitmask may be composed of the following flags:
         *     1 - Unordered comparison
         *     2 - Partial comparison
         * @param {Object} [stack] Tracks traversed `value` and `other` objects.
         * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
         */
        function baseIsEqual(value, other, customizer, bitmask, stack) {
            if (value === other) {
                return true;
            }
            if (
                value == null ||
                other == null ||
                (!isObject(value) && !isObjectLike(other))
            ) {
                return value !== value && other !== other;
            }
            return baseIsEqualDeep(
                value,
                other,
                baseIsEqual,
                customizer,
                bitmask,
                stack
            );
        }

        /**
         * A specialized version of `baseIsEqual` for arrays and objects which performs
         * deep comparisons and tracks traversed objects enabling objects with circular
         * references to be compared.
         *
         * @private
         * @param {Object} object The object to compare.
         * @param {Object} other The other object to compare.
         * @param {Function} equalFunc The function to determine equivalents of values.
         * @param {Function} [customizer] The function to customize comparisons.
         * @param {number} [bitmask] The bitmask of comparison flags. See `baseIsEqual`
         *  for more details.
         * @param {Object} [stack] Tracks traversed `object` and `other` objects.
         * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
         */
        function baseIsEqualDeep(
            object,
            other,
            equalFunc,
            customizer,
            bitmask,
            stack
        ) {
            var objIsArr = isArray(object),
                othIsArr = isArray(other),
                objTag = arrayTag,
                othTag = arrayTag;

            if (!objIsArr) {
                objTag = getTag(object);
                objTag = objTag == argsTag ? objectTag : objTag;
            }
            if (!othIsArr) {
                othTag = getTag(other);
                othTag = othTag == argsTag ? objectTag : othTag;
            }
            var objIsObj = objTag == objectTag && !isHostObject(object),
                othIsObj = othTag == objectTag && !isHostObject(other),
                isSameTag = objTag == othTag;

            if (isSameTag && !objIsObj) {
                stack || (stack = new Stack());
                return objIsArr || isTypedArray(object)
                    ? equalArrays(
                          object,
                          other,
                          equalFunc,
                          customizer,
                          bitmask,
                          stack
                      )
                    : equalByTag(
                          object,
                          other,
                          objTag,
                          equalFunc,
                          customizer,
                          bitmask,
                          stack
                      );
            }
            if (!(bitmask & PARTIAL_COMPARE_FLAG)) {
                var objIsWrapped =
                        objIsObj && hasOwnProperty.call(object, '__wrapped__'),
                    othIsWrapped =
                        othIsObj && hasOwnProperty.call(other, '__wrapped__');

                if (objIsWrapped || othIsWrapped) {
                    var objUnwrapped = objIsWrapped ? object.value() : object,
                        othUnwrapped = othIsWrapped ? other.value() : other;

                    stack || (stack = new Stack());
                    return equalFunc(
                        objUnwrapped,
                        othUnwrapped,
                        customizer,
                        bitmask,
                        stack
                    );
                }
            }
            if (!isSameTag) {
                return false;
            }
            stack || (stack = new Stack());
            return equalObjects(
                object,
                other,
                equalFunc,
                customizer,
                bitmask,
                stack
            );
        }

        /**
         * The base implementation of `_.isMatch` without support for iteratee shorthands.
         *
         * @private
         * @param {Object} object The object to inspect.
         * @param {Object} source The object of property values to match.
         * @param {Array} matchData The property names, values, and compare flags to match.
         * @param {Function} [customizer] The function to customize comparisons.
         * @returns {boolean} Returns `true` if `object` is a match, else `false`.
         */
        function baseIsMatch(object, source, matchData, customizer) {
            var index = matchData.length,
                length = index,
                noCustomizer = !customizer;

            if (object == null) {
                return !length;
            }
            object = Object(object);
            while (index--) {
                var data = matchData[index];
                if (
                    noCustomizer && data[2]
                        ? data[1] !== object[data[0]]
                        : !(data[0] in object)
                ) {
                    return false;
                }
            }
            while (++index < length) {
                data = matchData[index];
                var key = data[0],
                    objValue = object[key],
                    srcValue = data[1];

                if (noCustomizer && data[2]) {
                    if (objValue === undefined && !(key in object)) {
                        return false;
                    }
                } else {
                    var stack = new Stack();
                    if (customizer) {
                        var result = customizer(
                            objValue,
                            srcValue,
                            key,
                            object,
                            source,
                            stack
                        );
                    }
                    if (
                        !(result === undefined
                            ? baseIsEqual(
                                  srcValue,
                                  objValue,
                                  customizer,
                                  UNORDERED_COMPARE_FLAG | PARTIAL_COMPARE_FLAG,
                                  stack
                              )
                            : result)
                    ) {
                        return false;
                    }
                }
            }
            return true;
        }

        /**
         * The base implementation of `_.isNative` without bad shim checks.
         *
         * @private
         * @param {*} value The value to check.
         * @returns {boolean} Returns `true` if `value` is a native function,
         *  else `false`.
         */
        function baseIsNative(value) {
            if (!isObject(value) || isMasked(value)) {
                return false;
            }
            var pattern =
                isFunction(value) || isHostObject(value)
                    ? reIsNative
                    : reIsHostCtor;
            return pattern.test(toSource(value));
        }

        /**
         * The base implementation of `_.isTypedArray` without Node.js optimizations.
         *
         * @private
         * @param {*} value The value to check.
         * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
         */
        function baseIsTypedArray(value) {
            return (
                isObjectLike(value) &&
                isLength(value.length) &&
                !!typedArrayTags[objectToString.call(value)]
            );
        }

        /**
         * The base implementation of `_.iteratee`.
         *
         * @private
         * @param {*} [value=_.identity] The value to convert to an iteratee.
         * @returns {Function} Returns the iteratee.
         */
        function baseIteratee(value) {
            // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
            // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
            if (typeof value == 'function') {
                return value;
            }
            if (value == null) {
                return identity;
            }
            if (typeof value == 'object') {
                return isArray(value)
                    ? baseMatchesProperty(value[0], value[1])
                    : baseMatches(value);
            }
            return property(value);
        }

        /**
         * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
         *
         * @private
         * @param {Object} object The object to query.
         * @returns {Array} Returns the array of property names.
         */
        function baseKeys(object) {
            if (!isPrototype(object)) {
                return nativeKeys(object);
            }
            var result = [];
            for (var key in Object(object)) {
                if (hasOwnProperty.call(object, key) && key != 'constructor') {
                    result.push(key);
                }
            }
            return result;
        }

        /**
         * The base implementation of `_.matches` which doesn't clone `source`.
         *
         * @private
         * @param {Object} source The object of property values to match.
         * @returns {Function} Returns the new spec function.
         */
        function baseMatches(source) {
            var matchData = getMatchData(source);
            if (matchData.length == 1 && matchData[0][2]) {
                return matchesStrictComparable(
                    matchData[0][0],
                    matchData[0][1]
                );
            }
            return function(object) {
                return (
                    object === source || baseIsMatch(object, source, matchData)
                );
            };
        }

        /**
         * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
         *
         * @private
         * @param {string} path The path of the property to get.
         * @param {*} srcValue The value to match.
         * @returns {Function} Returns the new spec function.
         */
        function baseMatchesProperty(path, srcValue) {
            if (isKey(path) && isStrictComparable(srcValue)) {
                return matchesStrictComparable(toKey(path), srcValue);
            }
            return function(object) {
                var objValue = get(object, path);
                return objValue === undefined && objValue === srcValue
                    ? hasIn(object, path)
                    : baseIsEqual(
                          srcValue,
                          objValue,
                          undefined,
                          UNORDERED_COMPARE_FLAG | PARTIAL_COMPARE_FLAG
                      );
            };
        }

        /**
         * A specialized version of `baseProperty` which supports deep paths.
         *
         * @private
         * @param {Array|string} path The path of the property to get.
         * @returns {Function} Returns the new accessor function.
         */
        function basePropertyDeep(path) {
            return function(object) {
                return baseGet(object, path);
            };
        }

        /**
         * The base implementation of `_.toString` which doesn't convert nullish
         * values to empty strings.
         *
         * @private
         * @param {*} value The value to process.
         * @returns {string} Returns the string.
         */
        function baseToString(value) {
            // Exit early for strings to avoid a performance hit in some environments.
            if (typeof value == 'string') {
                return value;
            }
            if (isSymbol(value)) {
                return symbolToString ? symbolToString.call(value) : '';
            }
            var result = value + '';
            return result == '0' && 1 / value == -INFINITY ? '-0' : result;
        }

        /**
         * Casts `value` to a path array if it's not one.
         *
         * @private
         * @param {*} value The value to inspect.
         * @returns {Array} Returns the cast property path array.
         */
        function castPath(value) {
            return isArray(value) ? value : stringToPath(value);
        }

        /**
         * Creates a function like `_.groupBy`.
         *
         * @private
         * @param {Function} setter The function to set accumulator values.
         * @param {Function} [initializer] The accumulator object initializer.
         * @returns {Function} Returns the new aggregator function.
         */
        function createAggregator(setter, initializer) {
            return function(collection, iteratee) {
                var func = isArray(collection)
                        ? arrayAggregator
                        : baseAggregator,
                    accumulator = initializer ? initializer() : {};

                return func(
                    collection,
                    setter,
                    baseIteratee(iteratee, 2),
                    accumulator
                );
            };
        }

        /**
         * Creates a `baseEach` or `baseEachRight` function.
         *
         * @private
         * @param {Function} eachFunc The function to iterate over a collection.
         * @param {boolean} [fromRight] Specify iterating from right to left.
         * @returns {Function} Returns the new base function.
         */
        function createBaseEach(eachFunc, fromRight) {
            return function(collection, iteratee) {
                if (collection == null) {
                    return collection;
                }
                if (!isArrayLike(collection)) {
                    return eachFunc(collection, iteratee);
                }
                var length = collection.length,
                    index = fromRight ? length : -1,
                    iterable = Object(collection);

                while (fromRight ? index-- : ++index < length) {
                    if (iteratee(iterable[index], index, iterable) === false) {
                        break;
                    }
                }
                return collection;
            };
        }

        /**
         * Creates a base function for methods like `_.forIn` and `_.forOwn`.
         *
         * @private
         * @param {boolean} [fromRight] Specify iterating from right to left.
         * @returns {Function} Returns the new base function.
         */
        function createBaseFor(fromRight) {
            return function(object, iteratee, keysFunc) {
                var index = -1,
                    iterable = Object(object),
                    props = keysFunc(object),
                    length = props.length;

                while (length--) {
                    var key = props[fromRight ? length : ++index];
                    if (iteratee(iterable[key], key, iterable) === false) {
                        break;
                    }
                }
                return object;
            };
        }

        /**
         * A specialized version of `baseIsEqualDeep` for arrays with support for
         * partial deep comparisons.
         *
         * @private
         * @param {Array} array The array to compare.
         * @param {Array} other The other array to compare.
         * @param {Function} equalFunc The function to determine equivalents of values.
         * @param {Function} customizer The function to customize comparisons.
         * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
         *  for more details.
         * @param {Object} stack Tracks traversed `array` and `other` objects.
         * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
         */
        function equalArrays(
            array,
            other,
            equalFunc,
            customizer,
            bitmask,
            stack
        ) {
            var isPartial = bitmask & PARTIAL_COMPARE_FLAG,
                arrLength = array.length,
                othLength = other.length;

            if (
                arrLength != othLength &&
                !(isPartial && othLength > arrLength)
            ) {
                return false;
            }
            // Assume cyclic values are equal.
            var stacked = stack.get(array);
            if (stacked && stack.get(other)) {
                return stacked == other;
            }
            var index = -1,
                result = true,
                seen =
                    bitmask & UNORDERED_COMPARE_FLAG
                        ? new SetCache()
                        : undefined;

            stack.set(array, other);
            stack.set(other, array);

            // Ignore non-index properties.
            while (++index < arrLength) {
                var arrValue = array[index],
                    othValue = other[index];

                if (customizer) {
                    var compared = isPartial
                        ? customizer(
                              othValue,
                              arrValue,
                              index,
                              other,
                              array,
                              stack
                          )
                        : customizer(
                              arrValue,
                              othValue,
                              index,
                              array,
                              other,
                              stack
                          );
                }
                if (compared !== undefined) {
                    if (compared) {
                        continue;
                    }
                    result = false;
                    break;
                }
                // Recursively compare arrays (susceptible to call stack limits).
                if (seen) {
                    if (
                        !arraySome(other, function(othValue, othIndex) {
                            if (
                                !seen.has(othIndex) &&
                                (arrValue === othValue ||
                                    equalFunc(
                                        arrValue,
                                        othValue,
                                        customizer,
                                        bitmask,
                                        stack
                                    ))
                            ) {
                                return seen.add(othIndex);
                            }
                        })
                    ) {
                        result = false;
                        break;
                    }
                } else if (
                    !(
                        arrValue === othValue ||
                        equalFunc(
                            arrValue,
                            othValue,
                            customizer,
                            bitmask,
                            stack
                        )
                    )
                ) {
                    result = false;
                    break;
                }
            }
            stack['delete'](array);
            stack['delete'](other);
            return result;
        }

        /**
         * A specialized version of `baseIsEqualDeep` for comparing objects of
         * the same `toStringTag`.
         *
         * **Note:** This function only supports comparing values with tags of
         * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
         *
         * @private
         * @param {Object} object The object to compare.
         * @param {Object} other The other object to compare.
         * @param {string} tag The `toStringTag` of the objects to compare.
         * @param {Function} equalFunc The function to determine equivalents of values.
         * @param {Function} customizer The function to customize comparisons.
         * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
         *  for more details.
         * @param {Object} stack Tracks traversed `object` and `other` objects.
         * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
         */
        function equalByTag(
            object,
            other,
            tag,
            equalFunc,
            customizer,
            bitmask,
            stack
        ) {
            switch (tag) {
                case dataViewTag:
                    if (
                        object.byteLength != other.byteLength ||
                        object.byteOffset != other.byteOffset
                    ) {
                        return false;
                    }
                    object = object.buffer;
                    other = other.buffer;

                case arrayBufferTag:
                    if (
                        object.byteLength != other.byteLength ||
                        !equalFunc(
                            new Uint8Array(object),
                            new Uint8Array(other)
                        )
                    ) {
                        return false;
                    }
                    return true;

                case boolTag:
                case dateTag:
                case numberTag:
                    // Coerce booleans to `1` or `0` and dates to milliseconds.
                    // Invalid dates are coerced to `NaN`.
                    return eq(+object, +other);

                case errorTag:
                    return (
                        object.name == other.name &&
                        object.message == other.message
                    );

                case regexpTag:
                case stringTag:
                    // Coerce regexes to strings and treat strings, primitives and objects,
                    // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
                    // for more details.
                    return object == other + '';

                case mapTag:
                    var convert = mapToArray;

                case setTag:
                    var isPartial = bitmask & PARTIAL_COMPARE_FLAG;
                    convert || (convert = setToArray);

                    if (object.size != other.size && !isPartial) {
                        return false;
                    }
                    // Assume cyclic values are equal.
                    var stacked = stack.get(object);
                    if (stacked) {
                        return stacked == other;
                    }
                    bitmask |= UNORDERED_COMPARE_FLAG;

                    // Recursively compare objects (susceptible to call stack limits).
                    stack.set(object, other);
                    var result = equalArrays(
                        convert(object),
                        convert(other),
                        equalFunc,
                        customizer,
                        bitmask,
                        stack
                    );
                    stack['delete'](object);
                    return result;

                case symbolTag:
                    if (symbolValueOf) {
                        return (
                            symbolValueOf.call(object) ==
                            symbolValueOf.call(other)
                        );
                    }
            }
            return false;
        }

        /**
         * A specialized version of `baseIsEqualDeep` for objects with support for
         * partial deep comparisons.
         *
         * @private
         * @param {Object} object The object to compare.
         * @param {Object} other The other object to compare.
         * @param {Function} equalFunc The function to determine equivalents of values.
         * @param {Function} customizer The function to customize comparisons.
         * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
         *  for more details.
         * @param {Object} stack Tracks traversed `object` and `other` objects.
         * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
         */
        function equalObjects(
            object,
            other,
            equalFunc,
            customizer,
            bitmask,
            stack
        ) {
            var isPartial = bitmask & PARTIAL_COMPARE_FLAG,
                objProps = keys(object),
                objLength = objProps.length,
                othProps = keys(other),
                othLength = othProps.length;

            if (objLength != othLength && !isPartial) {
                return false;
            }
            var index = objLength;
            while (index--) {
                var key = objProps[index];
                if (
                    !(isPartial
                        ? key in other
                        : hasOwnProperty.call(other, key))
                ) {
                    return false;
                }
            }
            // Assume cyclic values are equal.
            var stacked = stack.get(object);
            if (stacked && stack.get(other)) {
                return stacked == other;
            }
            var result = true;
            stack.set(object, other);
            stack.set(other, object);

            var skipCtor = isPartial;
            while (++index < objLength) {
                key = objProps[index];
                var objValue = object[key],
                    othValue = other[key];

                if (customizer) {
                    var compared = isPartial
                        ? customizer(
                              othValue,
                              objValue,
                              key,
                              other,
                              object,
                              stack
                          )
                        : customizer(
                              objValue,
                              othValue,
                              key,
                              object,
                              other,
                              stack
                          );
                }
                // Recursively compare objects (susceptible to call stack limits).
                if (
                    !(compared === undefined
                        ? objValue === othValue ||
                          equalFunc(
                              objValue,
                              othValue,
                              customizer,
                              bitmask,
                              stack
                          )
                        : compared)
                ) {
                    result = false;
                    break;
                }
                skipCtor || (skipCtor = key == 'constructor');
            }
            if (result && !skipCtor) {
                var objCtor = object.constructor,
                    othCtor = other.constructor;

                // Non `Object` object instances with different constructors are not equal.
                if (
                    objCtor != othCtor &&
                    ('constructor' in object && 'constructor' in other) &&
                    !(
                        typeof objCtor == 'function' &&
                        objCtor instanceof objCtor &&
                        typeof othCtor == 'function' &&
                        othCtor instanceof othCtor
                    )
                ) {
                    result = false;
                }
            }
            stack['delete'](object);
            stack['delete'](other);
            return result;
        }

        /**
         * Gets the data for `map`.
         *
         * @private
         * @param {Object} map The map to query.
         * @param {string} key The reference key.
         * @returns {*} Returns the map data.
         */
        function getMapData(map, key) {
            var data = map.__data__;
            return isKeyable(key)
                ? data[typeof key == 'string' ? 'string' : 'hash']
                : data.map;
        }

        /**
         * Gets the property names, values, and compare flags of `object`.
         *
         * @private
         * @param {Object} object The object to query.
         * @returns {Array} Returns the match data of `object`.
         */
        function getMatchData(object) {
            var result = keys(object),
                length = result.length;

            while (length--) {
                var key = result[length],
                    value = object[key];

                result[length] = [key, value, isStrictComparable(value)];
            }
            return result;
        }

        /**
         * Gets the native function at `key` of `object`.
         *
         * @private
         * @param {Object} object The object to query.
         * @param {string} key The key of the method to get.
         * @returns {*} Returns the function if it's native, else `undefined`.
         */
        function getNative(object, key) {
            var value = getValue(object, key);
            return baseIsNative(value) ? value : undefined;
        }

        /**
         * Gets the `toStringTag` of `value`.
         *
         * @private
         * @param {*} value The value to query.
         * @returns {string} Returns the `toStringTag`.
         */
        var getTag = baseGetTag;

        // Fallback for data views, maps, sets, and weak maps in IE 11,
        // for data views in Edge < 14, and promises in Node.js.
        if (
            (DataView &&
                getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
            (Map && getTag(new Map()) != mapTag) ||
            (Promise && getTag(Promise.resolve()) != promiseTag) ||
            (Set && getTag(new Set()) != setTag) ||
            (WeakMap && getTag(new WeakMap()) != weakMapTag)
        ) {
            getTag = function(value) {
                var result = objectToString.call(value),
                    Ctor = result == objectTag ? value.constructor : undefined,
                    ctorString = Ctor ? toSource(Ctor) : undefined;

                if (ctorString) {
                    switch (ctorString) {
                        case dataViewCtorString:
                            return dataViewTag;
                        case mapCtorString:
                            return mapTag;
                        case promiseCtorString:
                            return promiseTag;
                        case setCtorString:
                            return setTag;
                        case weakMapCtorString:
                            return weakMapTag;
                    }
                }
                return result;
            };
        }

        /**
         * Checks if `path` exists on `object`.
         *
         * @private
         * @param {Object} object The object to query.
         * @param {Array|string} path The path to check.
         * @param {Function} hasFunc The function to check properties.
         * @returns {boolean} Returns `true` if `path` exists, else `false`.
         */
        function hasPath(object, path, hasFunc) {
            path = isKey(path, object) ? [path] : castPath(path);

            var result,
                index = -1,
                length = path.length;

            while (++index < length) {
                var key = toKey(path[index]);
                if (!(result = object != null && hasFunc(object, key))) {
                    break;
                }
                object = object[key];
            }
            if (result) {
                return result;
            }
            var length = object ? object.length : 0;
            return (
                !!length &&
                isLength(length) &&
                isIndex(key, length) &&
                (isArray(object) || isArguments(object))
            );
        }

        /**
         * Checks if `value` is a valid array-like index.
         *
         * @private
         * @param {*} value The value to check.
         * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
         * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
         */
        function isIndex(value, length) {
            length = length == null ? MAX_SAFE_INTEGER : length;
            return (
                !!length &&
                (typeof value == 'number' || reIsUint.test(value)) &&
                (value > -1 && value % 1 == 0 && value < length)
            );
        }

        /**
         * Checks if `value` is a property name and not a property path.
         *
         * @private
         * @param {*} value The value to check.
         * @param {Object} [object] The object to query keys on.
         * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
         */
        function isKey(value, object) {
            if (isArray(value)) {
                return false;
            }
            var type = typeof value;
            if (
                type == 'number' ||
                type == 'symbol' ||
                type == 'boolean' ||
                value == null ||
                isSymbol(value)
            ) {
                return true;
            }
            return (
                reIsPlainProp.test(value) ||
                !reIsDeepProp.test(value) ||
                (object != null && value in Object(object))
            );
        }

        /**
         * Checks if `value` is suitable for use as unique object key.
         *
         * @private
         * @param {*} value The value to check.
         * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
         */
        function isKeyable(value) {
            var type = typeof value;
            return type == 'string' ||
                type == 'number' ||
                type == 'symbol' ||
                type == 'boolean'
                ? value !== '__proto__'
                : value === null;
        }

        /**
         * Checks if `func` has its source masked.
         *
         * @private
         * @param {Function} func The function to check.
         * @returns {boolean} Returns `true` if `func` is masked, else `false`.
         */
        function isMasked(func) {
            return !!maskSrcKey && maskSrcKey in func;
        }

        /**
         * Checks if `value` is likely a prototype object.
         *
         * @private
         * @param {*} value The value to check.
         * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
         */
        function isPrototype(value) {
            var Ctor = value && value.constructor,
                proto =
                    (typeof Ctor == 'function' && Ctor.prototype) ||
                    objectProto;

            return value === proto;
        }

        /**
         * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
         *
         * @private
         * @param {*} value The value to check.
         * @returns {boolean} Returns `true` if `value` if suitable for strict
         *  equality comparisons, else `false`.
         */
        function isStrictComparable(value) {
            return value === value && !isObject(value);
        }

        /**
         * A specialized version of `matchesProperty` for source values suitable
         * for strict equality comparisons, i.e. `===`.
         *
         * @private
         * @param {string} key The key of the property to get.
         * @param {*} srcValue The value to match.
         * @returns {Function} Returns the new spec function.
         */
        function matchesStrictComparable(key, srcValue) {
            return function(object) {
                if (object == null) {
                    return false;
                }
                return (
                    object[key] === srcValue &&
                    (srcValue !== undefined || key in Object(object))
                );
            };
        }

        /**
         * Converts `string` to a property path array.
         *
         * @private
         * @param {string} string The string to convert.
         * @returns {Array} Returns the property path array.
         */
        var stringToPath = memoize(function(string) {
            string = toString(string);

            var result = [];
            if (reLeadingDot.test(string)) {
                result.push('');
            }
            string.replace(rePropName, function(match, number, quote, string) {
                result.push(
                    quote ? string.replace(reEscapeChar, '$1') : number || match
                );
            });
            return result;
        });

        /**
         * Converts `value` to a string key if it's not a string or symbol.
         *
         * @private
         * @param {*} value The value to inspect.
         * @returns {string|symbol} Returns the key.
         */
        function toKey(value) {
            if (typeof value == 'string' || isSymbol(value)) {
                return value;
            }
            var result = value + '';
            return result == '0' && 1 / value == -INFINITY ? '-0' : result;
        }

        /**
         * Converts `func` to its source code.
         *
         * @private
         * @param {Function} func The function to process.
         * @returns {string} Returns the source code.
         */
        function toSource(func) {
            if (func != null) {
                try {
                    return funcToString.call(func);
                } catch (e) {}
                try {
                    return func + '';
                } catch (e) {}
            }
            return '';
        }

        /**
         * Creates an object composed of keys generated from the results of running
         * each element of `collection` thru `iteratee`. The order of grouped values
         * is determined by the order they occur in `collection`. The corresponding
         * value of each key is an array of elements responsible for generating the
         * key. The iteratee is invoked with one argument: (value).
         *
         * @static
         * @memberOf _
         * @since 0.1.0
         * @category Collection
         * @param {Array|Object} collection The collection to iterate over.
         * @param {Function} [iteratee=_.identity]
         *  The iteratee to transform keys.
         * @returns {Object} Returns the composed aggregate object.
         * @example
         *
         * _.groupBy([6.1, 4.2, 6.3], Math.floor);
         * // => { '4': [4.2], '6': [6.1, 6.3] }
         *
         * // The `_.property` iteratee shorthand.
         * _.groupBy(['one', 'two', 'three'], 'length');
         * // => { '3': ['one', 'two'], '5': ['three'] }
         */
        var groupBy = createAggregator(function(result, value, key) {
            if (hasOwnProperty.call(result, key)) {
                result[key].push(value);
            } else {
                result[key] = [value];
            }
        });

        /**
         * Creates a function that memoizes the result of `func`. If `resolver` is
         * provided, it determines the cache key for storing the result based on the
         * arguments provided to the memoized function. By default, the first argument
         * provided to the memoized function is used as the map cache key. The `func`
         * is invoked with the `this` binding of the memoized function.
         *
         * **Note:** The cache is exposed as the `cache` property on the memoized
         * function. Its creation may be customized by replacing the `_.memoize.Cache`
         * constructor with one whose instances implement the
         * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
         * method interface of `delete`, `get`, `has`, and `set`.
         *
         * @static
         * @memberOf _
         * @since 0.1.0
         * @category Function
         * @param {Function} func The function to have its output memoized.
         * @param {Function} [resolver] The function to resolve the cache key.
         * @returns {Function} Returns the new memoized function.
         * @example
         *
         * var object = { 'a': 1, 'b': 2 };
         * var other = { 'c': 3, 'd': 4 };
         *
         * var values = _.memoize(_.values);
         * values(object);
         * // => [1, 2]
         *
         * values(other);
         * // => [3, 4]
         *
         * object.a = 2;
         * values(object);
         * // => [1, 2]
         *
         * // Modify the result cache.
         * values.cache.set(object, ['a', 'b']);
         * values(object);
         * // => ['a', 'b']
         *
         * // Replace `_.memoize.Cache`.
         * _.memoize.Cache = WeakMap;
         */
        function memoize(func, resolver) {
            if (
                typeof func != 'function' ||
                (resolver && typeof resolver != 'function')
            ) {
                throw new TypeError(FUNC_ERROR_TEXT);
            }
            var memoized = function() {
                var args = arguments,
                    key = resolver ? resolver.apply(this, args) : args[0],
                    cache = memoized.cache;

                if (cache.has(key)) {
                    return cache.get(key);
                }
                var result = func.apply(this, args);
                memoized.cache = cache.set(key, result);
                return result;
            };
            memoized.cache = new (memoize.Cache || MapCache)();
            return memoized;
        }

        // Assign cache to `_.memoize`.
        memoize.Cache = MapCache;

        /**
         * Performs a
         * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
         * comparison between two values to determine if they are equivalent.
         *
         * @static
         * @memberOf _
         * @since 4.0.0
         * @category Lang
         * @param {*} value The value to compare.
         * @param {*} other The other value to compare.
         * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
         * @example
         *
         * var object = { 'a': 1 };
         * var other = { 'a': 1 };
         *
         * _.eq(object, object);
         * // => true
         *
         * _.eq(object, other);
         * // => false
         *
         * _.eq('a', 'a');
         * // => true
         *
         * _.eq('a', Object('a'));
         * // => false
         *
         * _.eq(NaN, NaN);
         * // => true
         */
        function eq(value, other) {
            return value === other || (value !== value && other !== other);
        }

        /**
         * Checks if `value` is likely an `arguments` object.
         *
         * @static
         * @memberOf _
         * @since 0.1.0
         * @category Lang
         * @param {*} value The value to check.
         * @returns {boolean} Returns `true` if `value` is an `arguments` object,
         *  else `false`.
         * @example
         *
         * _.isArguments(function() { return arguments; }());
         * // => true
         *
         * _.isArguments([1, 2, 3]);
         * // => false
         */
        function isArguments(value) {
            // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
            return (
                isArrayLikeObject(value) &&
                hasOwnProperty.call(value, 'callee') &&
                (!propertyIsEnumerable.call(value, 'callee') ||
                    objectToString.call(value) == argsTag)
            );
        }

        /**
         * Checks if `value` is classified as an `Array` object.
         *
         * @static
         * @memberOf _
         * @since 0.1.0
         * @category Lang
         * @param {*} value The value to check.
         * @returns {boolean} Returns `true` if `value` is an array, else `false`.
         * @example
         *
         * _.isArray([1, 2, 3]);
         * // => true
         *
         * _.isArray(document.body.children);
         * // => false
         *
         * _.isArray('abc');
         * // => false
         *
         * _.isArray(_.noop);
         * // => false
         */
        var isArray = Array.isArray;

        /**
         * Checks if `value` is array-like. A value is considered array-like if it's
         * not a function and has a `value.length` that's an integer greater than or
         * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
         *
         * @static
         * @memberOf _
         * @since 4.0.0
         * @category Lang
         * @param {*} value The value to check.
         * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
         * @example
         *
         * _.isArrayLike([1, 2, 3]);
         * // => true
         *
         * _.isArrayLike(document.body.children);
         * // => true
         *
         * _.isArrayLike('abc');
         * // => true
         *
         * _.isArrayLike(_.noop);
         * // => false
         */
        function isArrayLike(value) {
            return (
                value != null && isLength(value.length) && !isFunction(value)
            );
        }

        /**
         * This method is like `_.isArrayLike` except that it also checks if `value`
         * is an object.
         *
         * @static
         * @memberOf _
         * @since 4.0.0
         * @category Lang
         * @param {*} value The value to check.
         * @returns {boolean} Returns `true` if `value` is an array-like object,
         *  else `false`.
         * @example
         *
         * _.isArrayLikeObject([1, 2, 3]);
         * // => true
         *
         * _.isArrayLikeObject(document.body.children);
         * // => true
         *
         * _.isArrayLikeObject('abc');
         * // => false
         *
         * _.isArrayLikeObject(_.noop);
         * // => false
         */
        function isArrayLikeObject(value) {
            return isObjectLike(value) && isArrayLike(value);
        }

        /**
         * Checks if `value` is classified as a `Function` object.
         *
         * @static
         * @memberOf _
         * @since 0.1.0
         * @category Lang
         * @param {*} value The value to check.
         * @returns {boolean} Returns `true` if `value` is a function, else `false`.
         * @example
         *
         * _.isFunction(_);
         * // => true
         *
         * _.isFunction(/abc/);
         * // => false
         */
        function isFunction(value) {
            // The use of `Object#toString` avoids issues with the `typeof` operator
            // in Safari 8-9 which returns 'object' for typed array and other constructors.
            var tag = isObject(value) ? objectToString.call(value) : '';
            return tag == funcTag || tag == genTag;
        }

        /**
         * Checks if `value` is a valid array-like length.
         *
         * **Note:** This method is loosely based on
         * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
         *
         * @static
         * @memberOf _
         * @since 4.0.0
         * @category Lang
         * @param {*} value The value to check.
         * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
         * @example
         *
         * _.isLength(3);
         * // => true
         *
         * _.isLength(Number.MIN_VALUE);
         * // => false
         *
         * _.isLength(Infinity);
         * // => false
         *
         * _.isLength('3');
         * // => false
         */
        function isLength(value) {
            return (
                typeof value == 'number' &&
                value > -1 &&
                value % 1 == 0 &&
                value <= MAX_SAFE_INTEGER
            );
        }

        /**
         * Checks if `value` is the
         * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
         * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
         *
         * @static
         * @memberOf _
         * @since 0.1.0
         * @category Lang
         * @param {*} value The value to check.
         * @returns {boolean} Returns `true` if `value` is an object, else `false`.
         * @example
         *
         * _.isObject({});
         * // => true
         *
         * _.isObject([1, 2, 3]);
         * // => true
         *
         * _.isObject(_.noop);
         * // => true
         *
         * _.isObject(null);
         * // => false
         */
        function isObject(value) {
            var type = typeof value;
            return !!value && (type == 'object' || type == 'function');
        }

        /**
         * Checks if `value` is object-like. A value is object-like if it's not `null`
         * and has a `typeof` result of "object".
         *
         * @static
         * @memberOf _
         * @since 4.0.0
         * @category Lang
         * @param {*} value The value to check.
         * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
         * @example
         *
         * _.isObjectLike({});
         * // => true
         *
         * _.isObjectLike([1, 2, 3]);
         * // => true
         *
         * _.isObjectLike(_.noop);
         * // => false
         *
         * _.isObjectLike(null);
         * // => false
         */
        function isObjectLike(value) {
            return !!value && typeof value == 'object';
        }

        /**
         * Checks if `value` is classified as a `Symbol` primitive or object.
         *
         * @static
         * @memberOf _
         * @since 4.0.0
         * @category Lang
         * @param {*} value The value to check.
         * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
         * @example
         *
         * _.isSymbol(Symbol.iterator);
         * // => true
         *
         * _.isSymbol('abc');
         * // => false
         */
        function isSymbol(value) {
            return (
                typeof value == 'symbol' ||
                (isObjectLike(value) && objectToString.call(value) == symbolTag)
            );
        }

        /**
         * Checks if `value` is classified as a typed array.
         *
         * @static
         * @memberOf _
         * @since 3.0.0
         * @category Lang
         * @param {*} value The value to check.
         * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
         * @example
         *
         * _.isTypedArray(new Uint8Array);
         * // => true
         *
         * _.isTypedArray([]);
         * // => false
         */
        var isTypedArray = nodeIsTypedArray
            ? baseUnary(nodeIsTypedArray)
            : baseIsTypedArray;

        /**
         * Converts `value` to a string. An empty string is returned for `null`
         * and `undefined` values. The sign of `-0` is preserved.
         *
         * @static
         * @memberOf _
         * @since 4.0.0
         * @category Lang
         * @param {*} value The value to process.
         * @returns {string} Returns the string.
         * @example
         *
         * _.toString(null);
         * // => ''
         *
         * _.toString(-0);
         * // => '-0'
         *
         * _.toString([1, 2, 3]);
         * // => '1,2,3'
         */
        function toString(value) {
            return value == null ? '' : baseToString(value);
        }

        /**
         * Gets the value at `path` of `object`. If the resolved value is
         * `undefined`, the `defaultValue` is returned in its place.
         *
         * @static
         * @memberOf _
         * @since 3.7.0
         * @category Object
         * @param {Object} object The object to query.
         * @param {Array|string} path The path of the property to get.
         * @param {*} [defaultValue] The value returned for `undefined` resolved values.
         * @returns {*} Returns the resolved value.
         * @example
         *
         * var object = { 'a': [{ 'b': { 'c': 3 } }] };
         *
         * _.get(object, 'a[0].b.c');
         * // => 3
         *
         * _.get(object, ['a', '0', 'b', 'c']);
         * // => 3
         *
         * _.get(object, 'a.b.c', 'default');
         * // => 'default'
         */
        function get(object, path, defaultValue) {
            var result = object == null ? undefined : baseGet(object, path);
            return result === undefined ? defaultValue : result;
        }

        /**
         * Checks if `path` is a direct or inherited property of `object`.
         *
         * @static
         * @memberOf _
         * @since 4.0.0
         * @category Object
         * @param {Object} object The object to query.
         * @param {Array|string} path The path to check.
         * @returns {boolean} Returns `true` if `path` exists, else `false`.
         * @example
         *
         * var object = _.create({ 'a': _.create({ 'b': 2 }) });
         *
         * _.hasIn(object, 'a');
         * // => true
         *
         * _.hasIn(object, 'a.b');
         * // => true
         *
         * _.hasIn(object, ['a', 'b']);
         * // => true
         *
         * _.hasIn(object, 'b');
         * // => false
         */
        function hasIn(object, path) {
            return object != null && hasPath(object, path, baseHasIn);
        }

        /**
         * Creates an array of the own enumerable property names of `object`.
         *
         * **Note:** Non-object values are coerced to objects. See the
         * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
         * for more details.
         *
         * @static
         * @since 0.1.0
         * @memberOf _
         * @category Object
         * @param {Object} object The object to query.
         * @returns {Array} Returns the array of property names.
         * @example
         *
         * function Foo() {
         *   this.a = 1;
         *   this.b = 2;
         * }
         *
         * Foo.prototype.c = 3;
         *
         * _.keys(new Foo);
         * // => ['a', 'b'] (iteration order is not guaranteed)
         *
         * _.keys('hi');
         * // => ['0', '1']
         */
        function keys(object) {
            return isArrayLike(object)
                ? arrayLikeKeys(object)
                : baseKeys(object);
        }

        /**
         * This method returns the first argument it receives.
         *
         * @static
         * @since 0.1.0
         * @memberOf _
         * @category Util
         * @param {*} value Any value.
         * @returns {*} Returns `value`.
         * @example
         *
         * var object = { 'a': 1 };
         *
         * console.log(_.identity(object) === object);
         * // => true
         */
        function identity(value) {
            return value;
        }

        /**
         * Creates a function that returns the value at `path` of a given object.
         *
         * @static
         * @memberOf _
         * @since 2.4.0
         * @category Util
         * @param {Array|string} path The path of the property to get.
         * @returns {Function} Returns the new accessor function.
         * @example
         *
         * var objects = [
         *   { 'a': { 'b': 2 } },
         *   { 'a': { 'b': 1 } }
         * ];
         *
         * _.map(objects, _.property('a.b'));
         * // => [2, 1]
         *
         * _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
         * // => [1, 2]
         */
        function property(path) {
            return isKey(path)
                ? baseProperty(toKey(path))
                : basePropertyDeep(path);
        }

        module.exports = groupBy;
    });

    var groupOverlappingDrop = function groupOverlappingDrop(xScale, dropDate) {
        return function(d) {
            return Object.values(
                index$3(d.data, function(data) {
                    return Math.round(xScale(dropDate(data)));
                })
            ).reduce(function(acc, i) {
                i.sort(function(a, b) {
                    return dropDate(a) - dropDate(b);
                });
                i[0]['_allEvents'] = i;
                return acc.concat(i[0]);
            }, []);
        };
    };

    var drop = function(config, xScale) {
        return function(selection) {
            var _config$drop = config.drop,
                dropColor = _config$drop.color,
                dropRadius = _config$drop.radius,
                dropDate = _config$drop.date,
                onClick = _config$drop.onClick,
                onMouseOver = _config$drop.onMouseOver,
                onMouseOut = _config$drop.onMouseOut;

            var drops = selection
                .selectAll('.drop')
                //.data(filterOverlappingDrop(xScale, dropDate));
                .data(groupOverlappingDrop(xScale, dropDate));

            drops
                .enter()
                .append('ellipse')
                .classed('drop', true)
                .attr('ry', dropRadius)
                .attr('rx', 5)
                .attr('fill', dropColor)
                .on('click', onClick)
                .on('mouseover', onMouseOver)
                .on('mouseout', onMouseOut)
                .merge(drops)
                .attr('cx', function(d) {
                    return xScale(dropDate(d));
                });

            drops
                .attr('ry', dropRadius)
                .attr('rx', 5)
                .attr('fill', dropColor);

            drops
                .exit()
                .on('click', null)
                .on('mouseover', null)
                .on('mouseout', null)
                .remove();
        };
    };

    var dropLine = function(config, xScale) {
        return function(selection) {
            var metaballs = config.metaballs,
                _config$label = config.label,
                labelText = _config$label.text,
                labelPadding = _config$label.padding,
                labelWidth = _config$label.width,
                _config$line = config.line,
                lineColor = _config$line.color,
                lineHeight = _config$line.height;

            var lines = selection.selectAll('.drop-line').data(function(d) {
                return d;
            });

            var g = lines
                .enter()
                .append('g')
                .classed('drop-line', true)
                .attr('fill', lineColor)
                .attr('transform', function(_, index) {
                    return 'translate(0, ' + index * lineHeight + ')';
                });

            g
                .append('line')
                .classed('line-separator', true)
                .attr('x1', labelWidth)
                .attr('x2', '100%')
                .attr('y1', function() {
                    return lineHeight;
                })
                .attr('y2', function() {
                    return lineHeight;
                });

            var drops = g
                .append('g')
                .classed('drops', true)
                .attr('transform', function() {
                    return (
                        'translate(' + labelWidth + ', ' + lineHeight / 2 + ')'
                    );
                })
                .call(drop(config, xScale));

            drops
                .append('rect') // The rect allow us to size the drops g element
                .attr('x', 0)
                .attr('y', -config.line.height / 2)
                .attr('width', 1) // For the rect to impact its parent size it must have a non zero width
                .attr('height', config.line.height)
                .attr('fill', 'transparent');

            if (metaballs) {
                drops.style('filter', 'url(#metaballs)');
            }

            g
                .append('text')
                .attr('x', labelWidth - labelPadding)
                .attr('y', lineHeight / 2)
                .attr('dy', '0.25em')
                .attr('text-anchor', 'end')
                .text(labelText);

            lines.selectAll('text').text(labelText);
            lines.selectAll('.drops').call(drop(config, xScale));

            lines.exit().remove();
        };
    };

    var getShiftedTransform = function getShiftedTransform(
        originalTransform,
        labelsWidth,
        labelsPadding,
        d3
    ) {
        var fullLabelWidth = labelsWidth + labelsPadding;

        var x = originalTransform.x,
            y = originalTransform.y,
            k = originalTransform.k;

        return d3.zoomIdentity
            .translate(-fullLabelWidth, 0) // move origin as if there were no labels
            .translate(x, y) // apply zoom transformation panning
            .scale(k) // apply zoom transformation scaling
            .translate(labelsWidth + labelsPadding, 0); // put origin at its original position
    };

    var zoom = function(d3, svg, config, xScale, draw, getEvent) {
        var _config$label = config.label,
            labelsWidth = _config$label.width,
            labelsPadding = _config$label.padding,
            _config$zoom = config.zoom,
            onZoomStart = _config$zoom.onZoomStart,
            onZoom = _config$zoom.onZoom,
            onZoomEnd = _config$zoom.onZoomEnd,
            minimumScale = _config$zoom.minimumScale,
            maximumScale = _config$zoom.maximumScale;

        var zoom = d3.zoom().scaleExtent([minimumScale, maximumScale]);

        zoom.on('zoom.start', onZoomStart).on('zoom.end', onZoomEnd);

        zoom.on('zoom', function(args) {
            var transform = getShiftedTransform(
                getEvent().transform,
                labelsWidth,
                labelsPadding,
                d3
            );

            var newScale = transform.rescaleX(xScale);

            svg.call(draw(config, newScale));

            if (onZoom) {
                onZoom(args);
            }
        });

        return zoom;
    };

    var METABALL_DEF_ID = 'metaballs';

    var addMetaballsDefs = function addMetaballsDefs(config) {
        return function(selection) {
            var _config$metaballs = config.metaballs,
                blurDeviation = _config$metaballs.blurDeviation,
                colorMatrix = _config$metaballs.colorMatrix;

            var defs = selection.append('defs');
            var filter = defs.append('filter').attr('id', METABALL_DEF_ID);

            filter
                .append('feGaussianBlur')
                .attr('in', 'SourceGraphic')
                .attr('stdDeviation', blurDeviation)
                .attr('result', 'blur');

            filter
                .append('feColorMatrix')
                .attr('in', 'blur')
                .attr('mode', 'matrix')
                .attr('values', colorMatrix)
                .attr('result', 'contrast');

            filter
                .append('feBlend')
                .attr('in', 'SourceGraphic')
                .attr('in2', 'contrast');
        };
    };

    function _toConsumableArray(arr) {
        if (Array.isArray(arr)) {
            for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
                arr2[i] = arr[i];
            }
            return arr2;
        } else {
            return Array.from(arr);
        }
    }

    var withinRange = function withinRange(date, dateBounds) {
        var startingDate = Math.min.apply(Math, _toConsumableArray(dateBounds));
        var endingDate = Math.max.apply(Math, _toConsumableArray(dateBounds));

        // @TODO: remove the `new Date()` constructor in the next major version: we need to force it at configuration level.
        return new Date(date) >= startingDate && new Date(date) <= endingDate;
    };

    function _objectWithoutProperties(obj, keys) {
        var target = {};
        for (var i in obj) {
            if (keys.indexOf(i) >= 0) continue;
            if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
            target[i] = obj[i];
        }
        return target;
    }

    // do not export anything else here to keep window.eventDrops as a function
    var index = function(_ref) {
        var _ref$d = _ref.d3,
            d3 = _ref$d === undefined ? window.d3 : _ref$d,
            customConfiguration = _objectWithoutProperties(_ref, ['d3']);

        var chart = function chart(selection) {
            var config = index$1(
                customConfiguration || {},
                defaultConfiguration(d3)
            );

            var drops = config.drops,
                zoomConfig = config.zoom,
                _config$drop = config.drop,
                onClick = _config$drop.onClick,
                onMouseOut = _config$drop.onMouseOut,
                onMouseOver = _config$drop.onMouseOver,
                metaballs = config.metaballs,
                labelWidth = config.label.width,
                lineHeight = config.line.height,
                _config$range = config.range,
                rangeStart = _config$range.start,
                rangeEnd = _config$range.end,
                margin = config.margin;

            var getEvent = function getEvent() {
                return d3.event;
            }; // keep d3.event mutable see https://github.com/d3/d3/issues/2733

            // Follow margins conventions (https://bl.ocks.org/mbostock/3019563)
            var width =
                selection.node().clientWidth - margin.left - margin.right;

            var xScale = d3
                .scaleTime()
                .domain([rangeStart, rangeEnd])
                .range([0, width - labelWidth]);

            chart._scale = xScale;

            var root = selection.selectAll('svg').data(selection.data());

            root.exit().remove();

            var svg = root
                .enter()
                .append('svg')
                .attr('width', width)
                .classed('event-drop-chart', true);

            if (zoomConfig) {
                svg.call(zoom(d3, svg, config, xScale, draw, getEvent));
            }

            if (metaballs) {
                svg.call(addMetaballsDefs(config));
            }

            svg.merge(root).attr('height', function(d) {
                return (d.length + 1) * lineHeight + margin.top + margin.bottom;
            });

            svg
                .append('g')
                .classed('viewport', true)
                .attr(
                    'transform',
                    'translate(' + margin.left + ',' + margin.top + ')'
                )
                .call(draw(config, xScale));
        };

        chart.scale = function() {
            return chart._scale;
        };
        chart.filteredData = function() {
            return chart._filteredData;
        };

        var draw = function draw(config, scale) {
            return function(selection) {
                var dropDate = config.drop.date;

                var dateBounds = scale.domain().map(function(d) {
                    return new Date(d);
                });
                var filteredData = selection.data().map(function(dataSet) {
                    if (!Array.isArray(dataSet)) {
                        throw new Error(
                            'Selection data is not an array. Are you sure you provided an array of arrays to `data` function?'
                        );
                    }

                    return dataSet.map(function(row) {
                        if (!row.fullData) {
                            row.fullData = config.drops(row);
                            if (!row.fullData) {
                                throw new Error(
                                    'No drops data has been found. It looks by default in the `data` property. You can use the `drops` configuration parameter to tune it.'
                                );
                            }
                        }

                        row.data = row.fullData.filter(function(d) {
                            return withinRange(dropDate(d), dateBounds);
                        });

                        return row;
                    });
                });

                chart._scale = scale;
                chart._filteredData = filteredData[0];

                selection
                    .data(filteredData)
                    .call(dropLine(config, scale))
                    .call(bounds(config, scale))
                    .call(axis(d3, config, scale));
            };
        };

        chart.draw = draw;

        return chart;
    };

    return index;
});
//# sourceMappingURL=index.js.map
