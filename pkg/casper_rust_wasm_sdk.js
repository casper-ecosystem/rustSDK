let wasm;

const heap = new Array(128).fill(undefined);

heap.push(undefined, null, true, false);

function getObject(idx) { return heap[idx]; }

let heap_next = heap.length;

function dropObject(idx) {
    if (idx < 132) return;
    heap[idx] = heap_next;
    heap_next = idx;
}

function takeObject(idx) {
    const ret = getObject(idx);
    dropObject(idx);
    return ret;
}

const cachedTextDecoder = (typeof TextDecoder !== 'undefined' ? new TextDecoder('utf-8', { ignoreBOM: true, fatal: true }) : { decode: () => { throw Error('TextDecoder not available') } } );

if (typeof TextDecoder !== 'undefined') { cachedTextDecoder.decode(); };

let cachedUint8Memory0 = null;

function getUint8Memory0() {
    if (cachedUint8Memory0 === null || cachedUint8Memory0.byteLength === 0) {
        cachedUint8Memory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8Memory0;
}

function getStringFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}

function addHeapObject(obj) {
    if (heap_next === heap.length) heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];

    heap[idx] = obj;
    return idx;
}

let WASM_VECTOR_LEN = 0;

const cachedTextEncoder = (typeof TextEncoder !== 'undefined' ? new TextEncoder('utf-8') : { encode: () => { throw Error('TextEncoder not available') } } );

const encodeString = (typeof cachedTextEncoder.encodeInto === 'function'
    ? function (arg, view) {
    return cachedTextEncoder.encodeInto(arg, view);
}
    : function (arg, view) {
    const buf = cachedTextEncoder.encode(arg);
    view.set(buf);
    return {
        read: arg.length,
        written: buf.length
    };
});

function passStringToWasm0(arg, malloc, realloc) {

    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length, 1) >>> 0;
        getUint8Memory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len, 1) >>> 0;

    const mem = getUint8Memory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }

    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
        const view = getUint8Memory0().subarray(ptr + offset, ptr + len);
        const ret = encodeString(arg, view);

        offset += ret.written;
        ptr = realloc(ptr, len, offset, 1) >>> 0;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}

function isLikeNone(x) {
    return x === undefined || x === null;
}

let cachedInt32Memory0 = null;

function getInt32Memory0() {
    if (cachedInt32Memory0 === null || cachedInt32Memory0.byteLength === 0) {
        cachedInt32Memory0 = new Int32Array(wasm.memory.buffer);
    }
    return cachedInt32Memory0;
}

function debugString(val) {
    // primitive types
    const type = typeof val;
    if (type == 'number' || type == 'boolean' || val == null) {
        return  `${val}`;
    }
    if (type == 'string') {
        return `"${val}"`;
    }
    if (type == 'symbol') {
        const description = val.description;
        if (description == null) {
            return 'Symbol';
        } else {
            return `Symbol(${description})`;
        }
    }
    if (type == 'function') {
        const name = val.name;
        if (typeof name == 'string' && name.length > 0) {
            return `Function(${name})`;
        } else {
            return 'Function';
        }
    }
    // objects
    if (Array.isArray(val)) {
        const length = val.length;
        let debug = '[';
        if (length > 0) {
            debug += debugString(val[0]);
        }
        for(let i = 1; i < length; i++) {
            debug += ', ' + debugString(val[i]);
        }
        debug += ']';
        return debug;
    }
    // Test for built-in
    const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
    let className;
    if (builtInMatches.length > 1) {
        className = builtInMatches[1];
    } else {
        // Failed to match the standard '[object ClassName]'
        return toString.call(val);
    }
    if (className == 'Object') {
        // we're a user defined class or Object
        // JSON.stringify avoids problems with cycles, and is generally much
        // easier than looping through ownProperties of `val`.
        try {
            return 'Object(' + JSON.stringify(val) + ')';
        } catch (_) {
            return 'Object';
        }
    }
    // errors
    if (val instanceof Error) {
        return `${val.name}: ${val.message}\n${val.stack}`;
    }
    // TODO we could test for more things here, like `Set`s and `Map`s.
    return className;
}

const CLOSURE_DTORS = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(state => {
    wasm.__wbindgen_export_2.get(state.dtor)(state.a, state.b)
});

function makeMutClosure(arg0, arg1, dtor, f) {
    const state = { a: arg0, b: arg1, cnt: 1, dtor };
    const real = (...args) => {
        // First up with a closure we increment the internal reference
        // count. This ensures that the Rust closure environment won't
        // be deallocated while we're invoking it.
        state.cnt++;
        const a = state.a;
        state.a = 0;
        try {
            return f(a, state.b, ...args);
        } finally {
            if (--state.cnt === 0) {
                wasm.__wbindgen_export_2.get(state.dtor)(a, state.b);
                CLOSURE_DTORS.unregister(state);
            } else {
                state.a = a;
            }
        }
    };
    real.original = state;
    CLOSURE_DTORS.register(real, state, state);
    return real;
}
function __wbg_adapter_32(arg0, arg1, arg2) {
    wasm._dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__hd85a22a4c3a67bc6(arg0, arg1, addHeapObject(arg2));
}

function __wbg_adapter_35(arg0, arg1, arg2) {
    wasm._dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h90d8dcd331796d53(arg0, arg1, addHeapObject(arg2));
}

function _assertClass(instance, klass) {
    if (!(instance instanceof klass)) {
        throw new Error(`expected instance of ${klass.name}`);
    }
    return instance.ptr;
}

function passArray8ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 1, 1) >>> 0;
    getUint8Memory0().set(arg, ptr / 1);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}

let cachedUint32Memory0 = null;

function getUint32Memory0() {
    if (cachedUint32Memory0 === null || cachedUint32Memory0.byteLength === 0) {
        cachedUint32Memory0 = new Uint32Array(wasm.memory.buffer);
    }
    return cachedUint32Memory0;
}

function passArrayJsValueToWasm0(array, malloc) {
    const ptr = malloc(array.length * 4, 4) >>> 0;
    const mem = getUint32Memory0();
    for (let i = 0; i < array.length; i++) {
        mem[ptr / 4 + i] = addHeapObject(array[i]);
    }
    WASM_VECTOR_LEN = array.length;
    return ptr;
}
/**
* @param {Uint8Array} key
* @returns {TransferAddr}
*/
export function fromTransfer(key) {
    const ptr0 = passArray8ToWasm0(key, wasm.__wbindgen_malloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.fromTransfer(ptr0, len0);
    return TransferAddr.__wrap(ret);
}

function getArrayJsValueFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    const mem = getUint32Memory0();
    const slice = mem.subarray(ptr / 4, ptr / 4 + len);
    const result = [];
    for (let i = 0; i < slice.length; i++) {
        result.push(takeObject(slice[i]));
    }
    return result;
}
/**
* Converts a hexadecimal string to a regular string.
*
* # Arguments
*
* * `hex_string` - The hexadecimal string to convert.
*
* # Returns
*
* A regular string containing the converted value.
* @param {string} hex_string
* @returns {string}
*/
export function hexToString(hex_string) {
    let deferred2_0;
    let deferred2_1;
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        const ptr0 = passStringToWasm0(hex_string, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.hexToString(retptr, ptr0, len0);
        var r0 = getInt32Memory0()[retptr / 4 + 0];
        var r1 = getInt32Memory0()[retptr / 4 + 1];
        deferred2_0 = r0;
        deferred2_1 = r1;
        return getStringFromWasm0(r0, r1);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
    }
}

function getArrayU8FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getUint8Memory0().subarray(ptr / 1, ptr / 1 + len);
}
/**
* Converts a hexadecimal string to a Uint8Array.
*
* # Arguments
*
* * `hex_string` - The hexadecimal string to convert.
*
* # Returns
*
* A Uint8Array containing the converted value.
* @param {string} hex_string
* @returns {Uint8Array}
*/
export function hexToUint8Array(hex_string) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        const ptr0 = passStringToWasm0(hex_string, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.hexToUint8Array(retptr, ptr0, len0);
        var r0 = getInt32Memory0()[retptr / 4 + 0];
        var r1 = getInt32Memory0()[retptr / 4 + 1];
        var v2 = getArrayU8FromWasm0(r0, r1).slice();
        wasm.__wbindgen_free(r0, r1 * 1, 1);
        return v2;
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
    }
}

/**
* Converts a Uint8Array to a `Bytes` object.
*
* # Arguments
*
* * `uint8_array` - The Uint8Array to convert.
*
* # Returns
*
* A `Bytes` object containing the converted value.
* @param {Uint8Array} uint8_array
* @returns {Bytes}
*/
export function uint8ArrayToBytes(uint8_array) {
    const ret = wasm.uint8ArrayToBytes(addHeapObject(uint8_array));
    return Bytes.__wrap(ret);
}

/**
* Converts motes to CSPR (Casper tokens).
*
* # Arguments
*
* * `motes` - The motes value to convert.
*
* # Returns
*
* A string representing the CSPR amount.
* @param {string} motes
* @returns {string}
*/
export function motesToCSPR(motes) {
    let deferred2_0;
    let deferred2_1;
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        const ptr0 = passStringToWasm0(motes, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.motesToCSPR(retptr, ptr0, len0);
        var r0 = getInt32Memory0()[retptr / 4 + 0];
        var r1 = getInt32Memory0()[retptr / 4 + 1];
        deferred2_0 = r0;
        deferred2_1 = r1;
        return getStringFromWasm0(r0, r1);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
    }
}

/**
* Pretty prints a JSON value.
*
* # Arguments
*
* * `value` - The JSON value to pretty print.
* * `verbosity` - An optional verbosity level for pretty printing.
*
* # Returns
*
* A pretty printed JSON value as a JsValue.
* @param {any} value
* @param {Verbosity | undefined} [verbosity]
* @returns {any}
*/
export function jsonPrettyPrint(value, verbosity) {
    const ret = wasm.jsonPrettyPrint(addHeapObject(value), isLikeNone(verbosity) ? 3 : verbosity);
    return takeObject(ret);
}

/**
* Converts a secret key to a corresponding public key.
*
* # Arguments
*
* * `secret_key` - The secret key in PEM format.
*
* # Returns
*
* A JsValue containing the corresponding public key.
* If an error occurs during the conversion, JavaScript error is returned.
* @param {string} secret_key
* @returns {any}
*/
export function privateToPublicKey(secret_key) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        const ptr0 = passStringToWasm0(secret_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.privateToPublicKey(retptr, ptr0, len0);
        var r0 = getInt32Memory0()[retptr / 4 + 0];
        var r1 = getInt32Memory0()[retptr / 4 + 1];
        var r2 = getInt32Memory0()[retptr / 4 + 2];
        if (r2) {
            throw takeObject(r1);
        }
        return takeObject(r0);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
    }
}

/**
* Generates a secret key using the Ed25519 algorithm and returns it as a PEM-encoded string.
*
* # Returns
*
* A `JsValue` containing the PEM-encoded secret key or a JavaScript error if an error occurs.
*
* # Errors
*
* Returns an error if the secret key generation or serialization fails.
* @returns {any}
*/
export function generatePrivateKey() {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        wasm.generatePrivateKey(retptr);
        var r0 = getInt32Memory0()[retptr / 4 + 0];
        var r1 = getInt32Memory0()[retptr / 4 + 1];
        var r2 = getInt32Memory0()[retptr / 4 + 2];
        if (r2) {
            throw takeObject(r1);
        }
        return takeObject(r0);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
    }
}

/**
* Generates a secret key using the secp256k1 algorithm and returns it as a PEM-encoded string.
*
* # Returns
*
* A `JsValue` containing the PEM-encoded secret key or a JavaScript error if an error occurs.
*
* # Errors
*
* Returns an error if the secret key generation or serialization fails.
* @returns {any}
*/
export function generatePrivateKey_secp256k1() {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        wasm.generatePrivateKey_secp256k1(retptr);
        var r0 = getInt32Memory0()[retptr / 4 + 0];
        var r1 = getInt32Memory0()[retptr / 4 + 1];
        var r2 = getInt32Memory0()[retptr / 4 + 2];
        if (r2) {
            throw takeObject(r1);
        }
        return takeObject(r0);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
    }
}

/**
* Converts a formatted account hash to a base64-encoded string (cep-18 key encoding).
*
*
* # Arguments
*
* * `formatted_account_hash` - A hex-formatted string representing the account hash.
* Example: "account-hash-b485c074cef7ccaccd0302949d2043ab7133abdb14cfa87e8392945c0bd80a5f"
*
* # Returns
*
* Returns the base64-encoded string.
* Example: "ALSFwHTO98yszQMClJ0gQ6txM6vbFM+ofoOSlFwL2Apf"
* @param {string} formatted_account_hash
* @returns {string}
*/
export function accountHashToBase64(formatted_account_hash) {
    let deferred2_0;
    let deferred2_1;
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        const ptr0 = passStringToWasm0(formatted_account_hash, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.accountHashToBase64(retptr, ptr0, len0);
        var r0 = getInt32Memory0()[retptr / 4 + 0];
        var r1 = getInt32Memory0()[retptr / 4 + 1];
        deferred2_0 = r0;
        deferred2_1 = r1;
        return getStringFromWasm0(r0, r1);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
    }
}

/**
* Gets the current timestamp.
*
* # Returns
*
* A JsValue containing the current timestamp.
* @returns {any}
*/
export function getTimestamp() {
    const ret = wasm.getTimestamp();
    return takeObject(ret);
}

/**
* Encodes the given metadata using the lower-level Blake2b hashing algorithm.
*
* # Arguments
*
* * `meta_data` - A string containing the metadata to be hashed.
*
* # Returns
*
* A JsValue containing the hash generated using the Blake2b algorithm.
* @param {string} meta_data
* @returns {any}
*/
export function encodeLowerBlake2b(meta_data) {
    const ptr0 = passStringToWasm0(meta_data, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.encodeLowerBlake2b(ptr0, len0);
    return takeObject(ret);
}

/**
* Converts a key and value into a formatted dictionary item key for ditionaries queries.
*
* # Arguments
*
* * `key` - A string representation of a account/contract hash as a Key.
* * `value` - A string representation of the value, for now restricted to parse as U256 or Key
*
* # Returns
*
* A string representing the formatted dictionary item key.
* @param {Key} key
* @param {string} value
* @returns {string}
*/
export function makeDictionaryItemKey(key, value) {
    let deferred3_0;
    let deferred3_1;
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        _assertClass(key, Key);
        var ptr0 = key.__destroy_into_raw();
        const ptr1 = passStringToWasm0(value, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        wasm.makeDictionaryItemKey(retptr, ptr0, ptr1, len1);
        var r0 = getInt32Memory0()[retptr / 4 + 0];
        var r1 = getInt32Memory0()[retptr / 4 + 1];
        deferred3_0 = r0;
        deferred3_1 = r1;
        return getStringFromWasm0(r0, r1);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        wasm.__wbindgen_free(deferred3_0, deferred3_1, 1);
    }
}

function handleError(f, args) {
    try {
        return f.apply(this, args);
    } catch (e) {
        wasm.__wbindgen_exn_store(addHeapObject(e));
    }
}
function __wbg_adapter_1028(arg0, arg1, arg2, arg3) {
    wasm.wasm_bindgen__convert__closures__invoke2_mut__h36bc72dc022e6a31(arg0, arg1, addHeapObject(arg2), addHeapObject(arg3));
}

/**
*/
export const TransferTargetKind = Object.freeze({ PublicKey:0,"0":"PublicKey",AccountHash:1,"1":"AccountHash",URef:2,"2":"URef", });
/**
*/
export const Verbosity = Object.freeze({ Low:0,"0":"Low",Medium:1,"1":"Medium",High:2,"2":"High", });
/**
*/
export const TransactionKind = Object.freeze({ InvocableEntity:0,"0":"InvocableEntity",InvocableEntityAlias:1,"1":"InvocableEntityAlias",Package:2,"2":"Package",PackageAlias:3,"3":"PackageAlias",Session:4,"4":"Session",Transfer:5,"5":"Transfer",AddBid:6,"6":"AddBid",Delegate:7,"7":"Delegate",Undelegate:8,"8":"Undelegate",Redelegate:9,"9":"Redelegate",WithdrawBid:10,"10":"WithdrawBid", });

const AccessRightsFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_accessrights_free(ptr >>> 0));
/**
*/
export class AccessRights {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(AccessRights.prototype);
        obj.__wbg_ptr = ptr;
        AccessRightsFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        AccessRightsFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_accessrights_free(ptr);
    }
    /**
    * @returns {number}
    */
    static NONE() {
        const ret = wasm.accessrights_NONE();
        return ret;
    }
    /**
    * @returns {number}
    */
    static READ() {
        const ret = wasm.accessrights_READ();
        return ret;
    }
    /**
    * @returns {number}
    */
    static WRITE() {
        const ret = wasm.accessrights_WRITE();
        return ret;
    }
    /**
    * @returns {number}
    */
    static ADD() {
        const ret = wasm.accessrights_ADD();
        return ret;
    }
    /**
    * @returns {number}
    */
    static READ_ADD() {
        const ret = wasm.accessrights_READ_ADD();
        return ret;
    }
    /**
    * @returns {number}
    */
    static READ_WRITE() {
        const ret = wasm.accessrights_READ_WRITE();
        return ret;
    }
    /**
    * @returns {number}
    */
    static ADD_WRITE() {
        const ret = wasm.accessrights_ADD_WRITE();
        return ret;
    }
    /**
    * @returns {number}
    */
    static READ_ADD_WRITE() {
        const ret = wasm.accessrights_READ_ADD_WRITE();
        return ret;
    }
    /**
    * @param {number} access_rights
    */
    constructor(access_rights) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.accessrights_new(retptr, access_rights);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            this.__wbg_ptr = r0 >>> 0;
            return this;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {boolean} read
    * @param {boolean} write
    * @param {boolean} add
    * @returns {AccessRights}
    */
    static from_bits(read, write, add) {
        const ret = wasm.accessrights_from_bits(read, write, add);
        return AccessRights.__wrap(ret);
    }
    /**
    * @returns {boolean}
    */
    is_readable() {
        const ret = wasm.accessrights_is_readable(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
    * @returns {boolean}
    */
    is_writeable() {
        const ret = wasm.accessrights_is_writeable(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
    * @returns {boolean}
    */
    is_addable() {
        const ret = wasm.accessrights_is_addable(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
    * @returns {boolean}
    */
    is_none() {
        const ret = wasm.accessrights_is_none(this.__wbg_ptr);
        return ret !== 0;
    }
}

const AccountHashFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_accounthash_free(ptr >>> 0));
/**
*/
export class AccountHash {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(AccountHash.prototype);
        obj.__wbg_ptr = ptr;
        AccountHashFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        AccountHashFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_accounthash_free(ptr);
    }
    /**
    * @param {string} account_hash_hex_str
    */
    constructor(account_hash_hex_str) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passStringToWasm0(account_hash_hex_str, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.accounthash_new_js_alias(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            this.__wbg_ptr = r0 >>> 0;
            return this;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string} formatted_str
    * @returns {AccountHash}
    */
    static fromFormattedStr(formatted_str) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passStringToWasm0(formatted_str, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.accounthash_fromFormattedStr(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return AccountHash.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {PublicKey} public_key
    * @returns {AccountHash}
    */
    static fromPublicKey(public_key) {
        _assertClass(public_key, PublicKey);
        var ptr0 = public_key.__destroy_into_raw();
        const ret = wasm.accounthash_fromPublicKey(ptr0);
        return AccountHash.__wrap(ret);
    }
    /**
    * @returns {string}
    */
    toFormattedString() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.accounthash_toFormattedString(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
    * @returns {string}
    */
    toHexString() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.accounthash_toHexString(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
    * @param {Uint8Array} bytes
    * @returns {AccountHash}
    */
    static fromUint8Array(bytes) {
        const ptr0 = passArray8ToWasm0(bytes, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.accounthash_fromUint8Array(ptr0, len0);
        return AccountHash.__wrap(ret);
    }
    /**
    * @returns {any}
    */
    toJson() {
        const ret = wasm.accounthash_toJson(this.__wbg_ptr);
        return takeObject(ret);
    }
}

const AccountIdentifierFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_accountidentifier_free(ptr >>> 0));
/**
*/
export class AccountIdentifier {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(AccountIdentifier.prototype);
        obj.__wbg_ptr = ptr;
        AccountIdentifierFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        AccountIdentifierFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_accountidentifier_free(ptr);
    }
    /**
    * @param {string} formatted_str
    */
    constructor(formatted_str) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passStringToWasm0(formatted_str, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.accountidentifier_fromFormattedStr(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            this.__wbg_ptr = r0 >>> 0;
            return this;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string} formatted_str
    * @returns {AccountIdentifier}
    */
    static fromFormattedStr(formatted_str) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passStringToWasm0(formatted_str, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.accountidentifier_fromFormattedStr(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return AccountIdentifier.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {PublicKey} key
    * @returns {AccountIdentifier}
    */
    static fromPublicKey(key) {
        _assertClass(key, PublicKey);
        var ptr0 = key.__destroy_into_raw();
        const ret = wasm.accountidentifier_fromPublicKey(ptr0);
        return AccountIdentifier.__wrap(ret);
    }
    /**
    * @param {AccountHash} account_hash
    * @returns {AccountIdentifier}
    */
    static fromAccountHash(account_hash) {
        _assertClass(account_hash, AccountHash);
        var ptr0 = account_hash.__destroy_into_raw();
        const ret = wasm.accountidentifier_fromAccountHash(ptr0);
        return AccountIdentifier.__wrap(ret);
    }
    /**
    * @returns {any}
    */
    toJson() {
        const ret = wasm.accountidentifier_toJson(this.__wbg_ptr);
        return takeObject(ret);
    }
}

const AddressableEntityHashFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_addressableentityhash_free(ptr >>> 0));
/**
*/
export class AddressableEntityHash {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(AddressableEntityHash.prototype);
        obj.__wbg_ptr = ptr;
        AddressableEntityHashFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        AddressableEntityHashFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_addressableentityhash_free(ptr);
    }
    /**
    * @param {string} input
    */
    constructor(input) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passStringToWasm0(input, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.addressableentityhash_fromString(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            this.__wbg_ptr = r0 >>> 0;
            return this;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string} input
    * @returns {AddressableEntityHash}
    */
    static fromFormattedStr(input) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passStringToWasm0(input, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.addressableentityhash_fromFormattedStr(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return AddressableEntityHash.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {string}
    */
    toFormattedString() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.addressableentityhash_toFormattedString(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
    * @param {Uint8Array} bytes
    * @returns {AddressableEntityHash}
    */
    static fromUint8Array(bytes) {
        const ptr0 = passArray8ToWasm0(bytes, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.addressableentityhash_fromUint8Array(ptr0, len0);
        return AddressableEntityHash.__wrap(ret);
    }
}

const ArgsSimpleFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_argssimple_free(ptr >>> 0));
/**
*/
export class ArgsSimple {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(ArgsSimple.prototype);
        obj.__wbg_ptr = ptr;
        ArgsSimpleFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        ArgsSimpleFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_argssimple_free(ptr);
    }
}

const BlockHashFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_blockhash_free(ptr >>> 0));
/**
*/
export class BlockHash {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(BlockHash.prototype);
        obj.__wbg_ptr = ptr;
        BlockHashFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        BlockHashFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_blockhash_free(ptr);
    }
    /**
    * @param {string} block_hash_hex_str
    */
    constructor(block_hash_hex_str) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passStringToWasm0(block_hash_hex_str, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.blockhash_new(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            this.__wbg_ptr = r0 >>> 0;
            return this;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Digest} digest
    * @returns {BlockHash}
    */
    static fromDigest(digest) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(digest, Digest);
            var ptr0 = digest.__destroy_into_raw();
            wasm.blockhash_fromDigest(retptr, ptr0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return BlockHash.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {any}
    */
    toJson() {
        const ret = wasm.blockhash_toJson(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * @returns {string}
    */
    toString() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.blockhash_toString(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
}

const BlockIdentifierFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_blockidentifier_free(ptr >>> 0));
/**
*/
export class BlockIdentifier {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(BlockIdentifier.prototype);
        obj.__wbg_ptr = ptr;
        BlockIdentifierFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        BlockIdentifierFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_blockidentifier_free(ptr);
    }
    /**
    * @param {BlockIdentifier} block_identifier
    */
    constructor(block_identifier) {
        _assertClass(block_identifier, BlockIdentifier);
        var ptr0 = block_identifier.__destroy_into_raw();
        const ret = wasm.blockidentifier_new(ptr0);
        this.__wbg_ptr = ret >>> 0;
        return this;
    }
    /**
    * @param {BlockHash} hash
    * @returns {BlockIdentifier}
    */
    static from_hash(hash) {
        _assertClass(hash, BlockHash);
        var ptr0 = hash.__destroy_into_raw();
        const ret = wasm.blockidentifier_from_hash(ptr0);
        return BlockIdentifier.__wrap(ret);
    }
    /**
    * @param {bigint} height
    * @returns {BlockIdentifier}
    */
    static fromHeight(height) {
        const ret = wasm.blockidentifier_fromHeight(height);
        return BlockIdentifier.__wrap(ret);
    }
    /**
    * @returns {any}
    */
    toJson() {
        const ret = wasm.blockidentifier_toJson(this.__wbg_ptr);
        return takeObject(ret);
    }
}

const BodyFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_body_free(ptr >>> 0));
/**
* Represents the body of an event, containing processed deploy information.
*/
export class Body {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Body.prototype);
        obj.__wbg_ptr = ptr;
        BodyFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        BodyFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_body_free(ptr);
    }
    /**
    * @returns {TransactionProcessed | undefined}
    */
    get TransactionProcessed() {
        const ret = wasm.__wbg_get_body_TransactionProcessed(this.__wbg_ptr);
        return ret === 0 ? undefined : TransactionProcessed.__wrap(ret);
    }
    /**
    * @param {TransactionProcessed | undefined} [arg0]
    */
    set TransactionProcessed(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, TransactionProcessed);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_body_TransactionProcessed(this.__wbg_ptr, ptr0);
    }
}

const BytesFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_bytes_free(ptr >>> 0));
/**
*/
export class Bytes {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Bytes.prototype);
        obj.__wbg_ptr = ptr;
        BytesFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        BytesFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_bytes_free(ptr);
    }
    /**
    */
    constructor() {
        const ret = wasm.bytes_new();
        this.__wbg_ptr = ret >>> 0;
        return this;
    }
    /**
    * @param {Uint8Array} uint8_array
    * @returns {Bytes}
    */
    static fromUint8Array(uint8_array) {
        const ret = wasm.bytes_fromUint8Array(addHeapObject(uint8_array));
        return Bytes.__wrap(ret);
    }
}

const ContractHashFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_contracthash_free(ptr >>> 0));
/**
*/
export class ContractHash {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(ContractHash.prototype);
        obj.__wbg_ptr = ptr;
        ContractHashFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        ContractHashFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_contracthash_free(ptr);
    }
    /**
    * @param {string} input
    */
    constructor(input) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passStringToWasm0(input, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.contracthash_fromString(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            this.__wbg_ptr = r0 >>> 0;
            return this;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string} input
    * @returns {ContractHash}
    */
    static fromFormattedStr(input) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passStringToWasm0(input, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.contracthash_fromFormattedStr(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return ContractHash.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {string}
    */
    toFormattedString() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.contracthash_toFormattedString(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
    * @param {Uint8Array} bytes
    * @returns {ContractHash}
    */
    static fromUint8Array(bytes) {
        const ptr0 = passArray8ToWasm0(bytes, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.contracthash_fromUint8Array(ptr0, len0);
        return ContractHash.__wrap(ret);
    }
}

const ContractPackageHashFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_contractpackagehash_free(ptr >>> 0));
/**
*/
export class ContractPackageHash {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(ContractPackageHash.prototype);
        obj.__wbg_ptr = ptr;
        ContractPackageHashFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        ContractPackageHashFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_contractpackagehash_free(ptr);
    }
    /**
    * @param {string} input
    */
    constructor(input) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passStringToWasm0(input, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.contractpackagehash_fromString(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            this.__wbg_ptr = r0 >>> 0;
            return this;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string} input
    * @returns {ContractPackageHash}
    */
    static fromFormattedStr(input) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passStringToWasm0(input, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.contractpackagehash_fromFormattedStr(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return ContractPackageHash.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {string}
    */
    toFormattedString() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.contractpackagehash_toFormattedString(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
    * @param {Uint8Array} bytes
    * @returns {ContractPackageHash}
    */
    static fromUint8Array(bytes) {
        const ptr0 = passArray8ToWasm0(bytes, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.contractpackagehash_fromUint8Array(ptr0, len0);
        return ContractPackageHash.__wrap(ret);
    }
}

const DeployFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_deploy_free(ptr >>> 0));
/**
*/
export class Deploy {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Deploy.prototype);
        obj.__wbg_ptr = ptr;
        DeployFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        DeployFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_deploy_free(ptr);
    }
    /**
    * @param {any} deploy
    */
    constructor(deploy) {
        const ret = wasm.deploy_new(addHeapObject(deploy));
        this.__wbg_ptr = ret >>> 0;
        return this;
    }
    /**
    * @returns {any}
    */
    toJson() {
        const ret = wasm.deploy_toJson(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * @param {DeployStrParams} deploy_params
    * @param {SessionStrParams} session_params
    * @param {PaymentStrParams} payment_params
    * @returns {Deploy}
    */
    static withPaymentAndSession(deploy_params, session_params, payment_params) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(deploy_params, DeployStrParams);
            var ptr0 = deploy_params.__destroy_into_raw();
            _assertClass(session_params, SessionStrParams);
            var ptr1 = session_params.__destroy_into_raw();
            _assertClass(payment_params, PaymentStrParams);
            var ptr2 = payment_params.__destroy_into_raw();
            wasm.deploy_withPaymentAndSession(retptr, ptr0, ptr1, ptr2);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return Deploy.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string} amount
    * @param {string} target_account
    * @param {string | undefined} transfer_id
    * @param {DeployStrParams} deploy_params
    * @param {PaymentStrParams} payment_params
    * @returns {Deploy}
    */
    static withTransfer(amount, target_account, transfer_id, deploy_params, payment_params) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passStringToWasm0(amount, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            const ptr1 = passStringToWasm0(target_account, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            var ptr2 = isLikeNone(transfer_id) ? 0 : passStringToWasm0(transfer_id, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            var len2 = WASM_VECTOR_LEN;
            _assertClass(deploy_params, DeployStrParams);
            var ptr3 = deploy_params.__destroy_into_raw();
            _assertClass(payment_params, PaymentStrParams);
            var ptr4 = payment_params.__destroy_into_raw();
            wasm.deploy_withTransfer(retptr, ptr0, len0, ptr1, len1, ptr2, len2, ptr3, ptr4);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return Deploy.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string} ttl
    * @param {string | undefined} [secret_key]
    * @returns {Deploy}
    */
    withTTL(ttl, secret_key) {
        const ptr0 = passStringToWasm0(ttl, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        var ptr1 = isLikeNone(secret_key) ? 0 : passStringToWasm0(secret_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        const ret = wasm.deploy_withTTL(this.__wbg_ptr, ptr0, len0, ptr1, len1);
        return Deploy.__wrap(ret);
    }
    /**
    * @param {string} timestamp
    * @param {string | undefined} [secret_key]
    * @returns {Deploy}
    */
    withTimestamp(timestamp, secret_key) {
        const ptr0 = passStringToWasm0(timestamp, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        var ptr1 = isLikeNone(secret_key) ? 0 : passStringToWasm0(secret_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        const ret = wasm.deploy_withTimestamp(this.__wbg_ptr, ptr0, len0, ptr1, len1);
        return Deploy.__wrap(ret);
    }
    /**
    * @param {string} chain_name
    * @param {string | undefined} [secret_key]
    * @returns {Deploy}
    */
    withChainName(chain_name, secret_key) {
        const ptr0 = passStringToWasm0(chain_name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        var ptr1 = isLikeNone(secret_key) ? 0 : passStringToWasm0(secret_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        const ret = wasm.deploy_withChainName(this.__wbg_ptr, ptr0, len0, ptr1, len1);
        return Deploy.__wrap(ret);
    }
    /**
    * @param {PublicKey} account
    * @param {string | undefined} [secret_key]
    * @returns {Deploy}
    */
    withAccount(account, secret_key) {
        _assertClass(account, PublicKey);
        var ptr0 = account.__destroy_into_raw();
        var ptr1 = isLikeNone(secret_key) ? 0 : passStringToWasm0(secret_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        const ret = wasm.deploy_withAccount(this.__wbg_ptr, ptr0, ptr1, len1);
        return Deploy.__wrap(ret);
    }
    /**
    * @param {string} entry_point_name
    * @param {string | undefined} [secret_key]
    * @returns {Deploy}
    */
    withEntryPointName(entry_point_name, secret_key) {
        const ptr0 = passStringToWasm0(entry_point_name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        var ptr1 = isLikeNone(secret_key) ? 0 : passStringToWasm0(secret_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        const ret = wasm.deploy_withEntryPointName(this.__wbg_ptr, ptr0, len0, ptr1, len1);
        return Deploy.__wrap(ret);
    }
    /**
    * @param {ContractHash} hash
    * @param {string | undefined} [secret_key]
    * @returns {Deploy}
    */
    withHash(hash, secret_key) {
        _assertClass(hash, ContractHash);
        var ptr0 = hash.__destroy_into_raw();
        var ptr1 = isLikeNone(secret_key) ? 0 : passStringToWasm0(secret_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        const ret = wasm.deploy_withHash(this.__wbg_ptr, ptr0, ptr1, len1);
        return Deploy.__wrap(ret);
    }
    /**
    * @param {ContractPackageHash} package_hash
    * @param {string | undefined} [secret_key]
    * @returns {Deploy}
    */
    withPackageHash(package_hash, secret_key) {
        _assertClass(package_hash, ContractPackageHash);
        var ptr0 = package_hash.__destroy_into_raw();
        var ptr1 = isLikeNone(secret_key) ? 0 : passStringToWasm0(secret_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        const ret = wasm.deploy_withPackageHash(this.__wbg_ptr, ptr0, ptr1, len1);
        return Deploy.__wrap(ret);
    }
    /**
    * @param {Bytes} module_bytes
    * @param {string | undefined} [secret_key]
    * @returns {Deploy}
    */
    withModuleBytes(module_bytes, secret_key) {
        _assertClass(module_bytes, Bytes);
        var ptr0 = module_bytes.__destroy_into_raw();
        var ptr1 = isLikeNone(secret_key) ? 0 : passStringToWasm0(secret_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        const ret = wasm.deploy_withModuleBytes(this.__wbg_ptr, ptr0, ptr1, len1);
        return Deploy.__wrap(ret);
    }
    /**
    * @param {string | undefined} [secret_key]
    * @returns {Deploy}
    */
    withSecretKey(secret_key) {
        var ptr0 = isLikeNone(secret_key) ? 0 : passStringToWasm0(secret_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        const ret = wasm.deploy_withSecretKey(this.__wbg_ptr, ptr0, len0);
        return Deploy.__wrap(ret);
    }
    /**
    * @param {string} amount
    * @param {string | undefined} [secret_key]
    * @returns {Deploy}
    */
    withStandardPayment(amount, secret_key) {
        const ptr0 = passStringToWasm0(amount, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        var ptr1 = isLikeNone(secret_key) ? 0 : passStringToWasm0(secret_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        const ret = wasm.deploy_withStandardPayment(this.__wbg_ptr, ptr0, len0, ptr1, len1);
        return Deploy.__wrap(ret);
    }
    /**
    * @param {any} payment
    * @param {string | undefined} [secret_key]
    * @returns {Deploy}
    */
    withPayment(payment, secret_key) {
        var ptr0 = isLikeNone(secret_key) ? 0 : passStringToWasm0(secret_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        const ret = wasm.deploy_withPayment(this.__wbg_ptr, addHeapObject(payment), ptr0, len0);
        return Deploy.__wrap(ret);
    }
    /**
    * @param {any} session
    * @param {string | undefined} [secret_key]
    * @returns {Deploy}
    */
    withSession(session, secret_key) {
        var ptr0 = isLikeNone(secret_key) ? 0 : passStringToWasm0(secret_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        const ret = wasm.deploy_withSession(this.__wbg_ptr, addHeapObject(session), ptr0, len0);
        return Deploy.__wrap(ret);
    }
    /**
    * @returns {boolean}
    */
    validateDeploySize() {
        const ret = wasm.deploy_validateDeploySize(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
    * @returns {boolean}
    */
    isValid() {
        const ret = wasm.deploy_isValid(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
    * @returns {DeployHash}
    */
    get hash() {
        const ret = wasm.deploy_hash(this.__wbg_ptr);
        return DeployHash.__wrap(ret);
    }
    /**
    * @returns {boolean}
    */
    hasValidHash() {
        const ret = wasm.deploy_hasValidHash(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
    * @returns {boolean}
    */
    isExpired() {
        const ret = wasm.deploy_isExpired(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
    * @param {string} secret_key
    * @returns {Deploy}
    */
    sign(secret_key) {
        const ptr0 = passStringToWasm0(secret_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.deploy_sign(this.__wbg_ptr, ptr0, len0);
        return Deploy.__wrap(ret);
    }
    /**
    * @returns {any}
    */
    approvalsHash() {
        const ret = wasm.deploy_approvalsHash(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * @returns {boolean}
    */
    isTransfer() {
        const ret = wasm.deploy_isTransfer(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
    * @param {number} phase
    * @returns {boolean}
    */
    isStandardPayment(phase) {
        const ret = wasm.deploy_isStandardPayment(this.__wbg_ptr, phase);
        return ret !== 0;
    }
    /**
    * @returns {boolean}
    */
    isStoredContract() {
        const ret = wasm.deploy_isStoredContract(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
    * @returns {boolean}
    */
    isStoredContractPackage() {
        const ret = wasm.deploy_isStoredContractPackage(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
    * @returns {boolean}
    */
    isModuleBytes() {
        const ret = wasm.deploy_isModuleBytes(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
    * @returns {boolean}
    */
    isByName() {
        const ret = wasm.deploy_isByName(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
    * @returns {string | undefined}
    */
    byName() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.deploy_byName(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {string}
    */
    entryPointName() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.deploy_entryPointName(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
    * @param {string} public_key
    * @param {string} signature
    * @returns {Deploy}
    */
    addSignature(public_key, signature) {
        const ptr0 = passStringToWasm0(public_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(signature, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ret = wasm.deploy_addSignature(this.__wbg_ptr, ptr0, len0, ptr1, len1);
        return Deploy.__wrap(ret);
    }
    /**
    * @returns {string}
    */
    TTL() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.deploy_TTL(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
    * @returns {string}
    */
    timestamp() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.deploy_timestamp(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
    * @returns {string}
    */
    chainName() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.deploy_chainName(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
    * @returns {string}
    */
    account() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.deploy_account(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
    * @param {number} conv_rate
    * @returns {string}
    */
    paymentAmount(conv_rate) {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.deploy_paymentAmount(retptr, this.__wbg_ptr, conv_rate);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
    * @returns {any}
    */
    args() {
        const ret = wasm.deploy_args(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * @param {any} js_value_arg
    * @param {string | undefined} [secret_key]
    * @returns {Deploy}
    */
    addArg(js_value_arg, secret_key) {
        var ptr0 = isLikeNone(secret_key) ? 0 : passStringToWasm0(secret_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        const ret = wasm.deploy_addArg(this.__wbg_ptr, addHeapObject(js_value_arg), ptr0, len0);
        return Deploy.__wrap(ret);
    }
}

const DeployHashFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_deployhash_free(ptr >>> 0));
/**
*/
export class DeployHash {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(DeployHash.prototype);
        obj.__wbg_ptr = ptr;
        DeployHashFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        DeployHashFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_deployhash_free(ptr);
    }
    /**
    * @param {string} deploy_hash_hex_str
    */
    constructor(deploy_hash_hex_str) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passStringToWasm0(deploy_hash_hex_str, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.deployhash_new(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            this.__wbg_ptr = r0 >>> 0;
            return this;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Digest} digest
    * @returns {DeployHash}
    */
    static fromDigest(digest) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(digest, Digest);
            var ptr0 = digest.__destroy_into_raw();
            wasm.deployhash_fromDigest(retptr, ptr0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return DeployHash.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {any}
    */
    toJson() {
        const ret = wasm.deployhash_toJson(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * @returns {string}
    */
    toString() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.deployhash_toString(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
}

const DeployStrParamsFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_deploystrparams_free(ptr >>> 0));
/**
*/
export class DeployStrParams {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        DeployStrParamsFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_deploystrparams_free(ptr);
    }
    /**
    * @param {string} chain_name
    * @param {string} session_account
    * @param {string | undefined} [secret_key]
    * @param {string | undefined} [timestamp]
    * @param {string | undefined} [ttl]
    * @param {string | undefined} [gas_price_tolerance]
    */
    constructor(chain_name, session_account, secret_key, timestamp, ttl, gas_price_tolerance) {
        const ptr0 = passStringToWasm0(chain_name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(session_account, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        var ptr2 = isLikeNone(secret_key) ? 0 : passStringToWasm0(secret_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len2 = WASM_VECTOR_LEN;
        var ptr3 = isLikeNone(timestamp) ? 0 : passStringToWasm0(timestamp, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len3 = WASM_VECTOR_LEN;
        var ptr4 = isLikeNone(ttl) ? 0 : passStringToWasm0(ttl, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len4 = WASM_VECTOR_LEN;
        var ptr5 = isLikeNone(gas_price_tolerance) ? 0 : passStringToWasm0(gas_price_tolerance, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len5 = WASM_VECTOR_LEN;
        const ret = wasm.deploystrparams_new(ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, ptr4, len4, ptr5, len5);
        this.__wbg_ptr = ret >>> 0;
        return this;
    }
    /**
    * @returns {string | undefined}
    */
    get secret_key() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.deploystrparams_secret_key(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string} secret_key
    */
    set secret_key(secret_key) {
        const ptr0 = passStringToWasm0(secret_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.deploystrparams_set_secret_key(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {string | undefined}
    */
    get timestamp() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.deploystrparams_timestamp(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string | undefined} [timestamp]
    */
    set timestamp(timestamp) {
        var ptr0 = isLikeNone(timestamp) ? 0 : passStringToWasm0(timestamp, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.deploystrparams_set_timestamp(this.__wbg_ptr, ptr0, len0);
    }
    /**
    */
    setDefaultTimestamp() {
        wasm.deploystrparams_setDefaultTimestamp(this.__wbg_ptr);
    }
    /**
    * @returns {string | undefined}
    */
    get ttl() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.deploystrparams_ttl(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string | undefined} [ttl]
    */
    set ttl(ttl) {
        var ptr0 = isLikeNone(ttl) ? 0 : passStringToWasm0(ttl, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.deploystrparams_set_ttl(this.__wbg_ptr, ptr0, len0);
    }
    /**
    */
    setDefaultTTL() {
        wasm.deploystrparams_setDefaultTTL(this.__wbg_ptr);
    }
    /**
    * @returns {string | undefined}
    */
    get chain_name() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.deploystrparams_chain_name(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string} chain_name
    */
    set chain_name(chain_name) {
        const ptr0 = passStringToWasm0(chain_name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.deploystrparams_set_chain_name(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {string | undefined}
    */
    get session_account() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.deploystrparams_session_account(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string} session_account
    */
    set session_account(session_account) {
        const ptr0 = passStringToWasm0(session_account, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.deploystrparams_set_session_account(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {string | undefined}
    */
    get gas_price_tolerance() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.deploystrparams_gas_price_tolerance(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string} gas_price_tolerance
    */
    set gas_price_tolerance(gas_price_tolerance) {
        const ptr0 = passStringToWasm0(gas_price_tolerance, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.deploystrparams_set_gas_price_tolerance(this.__wbg_ptr, ptr0, len0);
    }
}

const DeployStringFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_deploystring_free(ptr >>> 0));
/**
*/
export class DeployString {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(DeployString.prototype);
        obj.__wbg_ptr = ptr;
        DeployStringFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        DeployStringFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_deploystring_free(ptr);
    }
    /**
    * @returns {string}
    */
    get Deploy() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_deploystring_Deploy(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
    * @param {string} arg0
    */
    set Deploy(arg0) {
        const ptr0 = passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_deploystring_Deploy(this.__wbg_ptr, ptr0, len0);
    }
}

const DeploySubscriptionFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_deploysubscription_free(ptr >>> 0));
/**
* Represents a subscription to deploy events for wasm32 target architecture.
*/
export class DeploySubscription {

    static __unwrap(jsValue) {
        if (!(jsValue instanceof DeploySubscription)) {
            return 0;
        }
        return jsValue.__destroy_into_raw();
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        DeploySubscriptionFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_deploysubscription_free(ptr);
    }
    /**
    * Deploy hash to identify the subscription.
    * @returns {string}
    */
    get deployHash() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_deploystring_Deploy(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
    * Deploy hash to identify the subscription.
    * @param {string} arg0
    */
    set deployHash(arg0) {
        const ptr0 = passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_deploystring_Deploy(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * Handler function for deploy events.
    * @returns {Function}
    */
    get eventHandlerFn() {
        const ret = wasm.__wbg_get_deploysubscription_eventHandlerFn(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * Handler function for deploy events.
    * @param {Function} arg0
    */
    set eventHandlerFn(arg0) {
        wasm.__wbg_set_deploysubscription_eventHandlerFn(this.__wbg_ptr, addHeapObject(arg0));
    }
    /**
    * Constructor for DeploySubscription for wasm32 target architecture.
    *
    * # Arguments
    *
    * * `deploy_hash` - Deploy hash to identify the subscription.
    * * `event_handler_fn` - Handler function for deploy events.
    * @param {string} deploy_hash
    * @param {Function} event_handler_fn
    */
    constructor(deploy_hash, event_handler_fn) {
        const ptr0 = passStringToWasm0(deploy_hash, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.deploysubscription_new(ptr0, len0, addHeapObject(event_handler_fn));
        this.__wbg_ptr = ret >>> 0;
        return this;
    }
}

const DeployWatcherFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_deploywatcher_free(ptr >>> 0));
/**
* Represents a deploy watcher responsible for monitoring deploy events.
*
* This struct allows clients to subscribe to deploy events, start watching for events,
* or wait for an event and handle the received deploy event data.
*
* # Fields
*
* * `events_url` - The URL for deploy events.
* * `deploy_subscriptions` - Vector containing deploy subscriptions.
* * `active` - Reference-counted cell indicating whether the deploy watcher is active.
* * `timeout_duration` - Duration representing the optional timeout for watching events.
*/
export class DeployWatcher {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(DeployWatcher.prototype);
        obj.__wbg_ptr = ptr;
        DeployWatcherFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        DeployWatcherFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_deploywatcher_free(ptr);
    }
    /**
    * Creates a new `DeployWatcher` instance.
    *
    * # Arguments
    *
    * * `events_url` - The URL for deploy events.
    * * `timeout_duration` - Optional duration in milliseconds for watching events. If not provided,
    *   a default timeout of 60,000 milliseconds (1 minute) is used.
    *
    * # Returns
    *
    * A new `DeployWatcher` instance.
    * @param {string} events_url
    * @param {bigint | undefined} [timeout_duration]
    */
    constructor(events_url, timeout_duration) {
        const ptr0 = passStringToWasm0(events_url, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.deploywatcher_new(ptr0, len0, !isLikeNone(timeout_duration), isLikeNone(timeout_duration) ? BigInt(0) : timeout_duration);
        this.__wbg_ptr = ret >>> 0;
        return this;
    }
    /**
    * Subscribes to deploy events.
    *
    * # Arguments
    *
    * * `deploy_subscriptions` - Vector of deploy subscriptions to be added.
    *
    * # Returns
    *
    * Result indicating success or an error message.
    * @param {(DeploySubscription)[]} deploy_subscriptions
    */
    subscribe(deploy_subscriptions) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArrayJsValueToWasm0(deploy_subscriptions, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.deploywatcher_subscribe(retptr, this.__wbg_ptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            if (r1) {
                throw takeObject(r0);
            }
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * Unsubscribes from deploy events based on the provided deploy hash.
    *
    * # Arguments
    *
    * * `deploy_hash` - The deploy hash to unsubscribe.
    *
    * This method removes the deploy subscription associated with the provided deploy hash.
    * @param {string} deploy_hash
    */
    unsubscribe(deploy_hash) {
        const ptr0 = passStringToWasm0(deploy_hash, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.deploywatcher_unsubscribe(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * Starts watching for deploy events (JavaScript-friendly).
    *
    * # Returns
    *
    * Result containing the serialized deploy events data or an error message.
    * @returns {Promise<any>}
    */
    start() {
        const ret = wasm.deploywatcher_start(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * Stops watching for deploy events.
    *
    * This method sets the deploy watcher as inactive and stops the event listener if it exists.
    */
    stop() {
        wasm.deploywatcher_stop(this.__wbg_ptr);
    }
}

const DictionaryAddrFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_dictionaryaddr_free(ptr >>> 0));
/**
*/
export class DictionaryAddr {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(DictionaryAddr.prototype);
        obj.__wbg_ptr = ptr;
        DictionaryAddrFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        DictionaryAddrFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_dictionaryaddr_free(ptr);
    }
    /**
    * @param {Uint8Array} bytes
    */
    constructor(bytes) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(bytes, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.dictionaryaddr_new(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            this.__wbg_ptr = r0 >>> 0;
            return this;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}

const DictionaryItemIdentifierFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_dictionaryitemidentifier_free(ptr >>> 0));
/**
*/
export class DictionaryItemIdentifier {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(DictionaryItemIdentifier.prototype);
        obj.__wbg_ptr = ptr;
        DictionaryItemIdentifierFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        DictionaryItemIdentifierFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_dictionaryitemidentifier_free(ptr);
    }
    /**
    * @param {string} account_hash
    * @param {string} dictionary_name
    * @param {string} dictionary_item_key
    * @returns {DictionaryItemIdentifier}
    */
    static newFromAccountInfo(account_hash, dictionary_name, dictionary_item_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passStringToWasm0(account_hash, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            const ptr1 = passStringToWasm0(dictionary_name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            const ptr2 = passStringToWasm0(dictionary_item_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len2 = WASM_VECTOR_LEN;
            wasm.dictionaryitemidentifier_newFromAccountInfo(retptr, ptr0, len0, ptr1, len1, ptr2, len2);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return DictionaryItemIdentifier.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string} contract_addr
    * @param {string} dictionary_name
    * @param {string} dictionary_item_key
    * @returns {DictionaryItemIdentifier}
    */
    static newFromContractInfo(contract_addr, dictionary_name, dictionary_item_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passStringToWasm0(contract_addr, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            const ptr1 = passStringToWasm0(dictionary_name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            const ptr2 = passStringToWasm0(dictionary_item_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len2 = WASM_VECTOR_LEN;
            wasm.dictionaryitemidentifier_newFromContractInfo(retptr, ptr0, len0, ptr1, len1, ptr2, len2);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return DictionaryItemIdentifier.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string} seed_uref
    * @param {string} dictionary_item_key
    * @returns {DictionaryItemIdentifier}
    */
    static newFromSeedUref(seed_uref, dictionary_item_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passStringToWasm0(seed_uref, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            const ptr1 = passStringToWasm0(dictionary_item_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            wasm.dictionaryitemidentifier_newFromSeedUref(retptr, ptr0, len0, ptr1, len1);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return DictionaryItemIdentifier.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string} dictionary_key
    * @returns {DictionaryItemIdentifier}
    */
    static newFromDictionaryKey(dictionary_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passStringToWasm0(dictionary_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.dictionaryitemidentifier_newFromDictionaryKey(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return DictionaryItemIdentifier.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {any}
    */
    toJson() {
        const ret = wasm.dictionaryitemidentifier_toJson(this.__wbg_ptr);
        return takeObject(ret);
    }
}

const DictionaryItemStrParamsFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_dictionaryitemstrparams_free(ptr >>> 0));
/**
*/
export class DictionaryItemStrParams {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(DictionaryItemStrParams.prototype);
        obj.__wbg_ptr = ptr;
        DictionaryItemStrParamsFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        DictionaryItemStrParamsFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_dictionaryitemstrparams_free(ptr);
    }
    /**
    */
    constructor() {
        const ret = wasm.dictionaryitemstrparams_new();
        this.__wbg_ptr = ret >>> 0;
        return this;
    }
    /**
    * @param {string} key
    * @param {string} dictionary_name
    * @param {string} dictionary_item_key
    */
    setAccountNamedKey(key, dictionary_name, dictionary_item_key) {
        const ptr0 = passStringToWasm0(key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(dictionary_name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(dictionary_item_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        wasm.dictionaryitemstrparams_setAccountNamedKey(this.__wbg_ptr, ptr0, len0, ptr1, len1, ptr2, len2);
    }
    /**
    * @param {string} key
    * @param {string} dictionary_name
    * @param {string} dictionary_item_key
    */
    setContractNamedKey(key, dictionary_name, dictionary_item_key) {
        const ptr0 = passStringToWasm0(key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(dictionary_name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(dictionary_item_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        wasm.dictionaryitemstrparams_setContractNamedKey(this.__wbg_ptr, ptr0, len0, ptr1, len1, ptr2, len2);
    }
    /**
    * @param {string} seed_uref
    * @param {string} dictionary_item_key
    */
    setUref(seed_uref, dictionary_item_key) {
        const ptr0 = passStringToWasm0(seed_uref, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(dictionary_item_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        wasm.dictionaryitemstrparams_setUref(this.__wbg_ptr, ptr0, len0, ptr1, len1);
    }
    /**
    * @param {string} value
    */
    setDictionary(value) {
        const ptr0 = passStringToWasm0(value, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.dictionaryitemstrparams_setDictionary(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {any}
    */
    toJson() {
        const ret = wasm.dictionaryitemstrparams_toJson(this.__wbg_ptr);
        return takeObject(ret);
    }
}

const DigestFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_digest_free(ptr >>> 0));
/**
*/
export class Digest {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Digest.prototype);
        obj.__wbg_ptr = ptr;
        DigestFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        DigestFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_digest_free(ptr);
    }
    /**
    * @param {string} digest_hex_str
    */
    constructor(digest_hex_str) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passStringToWasm0(digest_hex_str, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.digest__new(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            this.__wbg_ptr = r0 >>> 0;
            return this;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string} digest_hex_str
    * @returns {Digest}
    */
    static fromString(digest_hex_str) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passStringToWasm0(digest_hex_str, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.digest__new(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return Digest.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} bytes
    * @returns {Digest}
    */
    static fromDigest(bytes) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(bytes, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.digest_fromDigest(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return Digest.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {any}
    */
    toJson() {
        const ret = wasm.digest_toJson(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * @returns {string}
    */
    toString() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.digest_toString(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
}

const EntityAddrFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_entityaddr_free(ptr >>> 0));
/**
*/
export class EntityAddr {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(EntityAddr.prototype);
        obj.__wbg_ptr = ptr;
        EntityAddrFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        EntityAddrFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_entityaddr_free(ptr);
    }
    /**
    * @param {string} formatted_str
    * @returns {EntityAddr}
    */
    static fromFormattedStr(formatted_str) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passStringToWasm0(formatted_str, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.entityaddr_fromFormattedStr(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return EntityAddr.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {string}
    */
    toFormattedString() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.entityaddr_toFormattedString(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
    * @returns {string}
    */
    toHexString() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.entityaddr_toHexString(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
    * @returns {any}
    */
    toJson() {
        const ret = wasm.entityaddr_toJson(this.__wbg_ptr);
        return takeObject(ret);
    }
}

const EntityIdentifierFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_entityidentifier_free(ptr >>> 0));
/**
*/
export class EntityIdentifier {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(EntityIdentifier.prototype);
        obj.__wbg_ptr = ptr;
        EntityIdentifierFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        EntityIdentifierFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_entityidentifier_free(ptr);
    }
    /**
    * @param {string} formatted_str
    */
    constructor(formatted_str) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passStringToWasm0(formatted_str, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.entityidentifier_fromFormattedStr(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            this.__wbg_ptr = r0 >>> 0;
            return this;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string} formatted_str
    * @returns {EntityIdentifier}
    */
    static fromFormattedStr(formatted_str) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passStringToWasm0(formatted_str, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.entityidentifier_fromFormattedStr(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return EntityIdentifier.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {PublicKey} key
    * @returns {EntityIdentifier}
    */
    static fromPublicKey(key) {
        _assertClass(key, PublicKey);
        var ptr0 = key.__destroy_into_raw();
        const ret = wasm.accountidentifier_fromPublicKey(ptr0);
        return EntityIdentifier.__wrap(ret);
    }
    /**
    * @param {AccountHash} account_hash
    * @returns {EntityIdentifier}
    */
    static fromAccountHash(account_hash) {
        _assertClass(account_hash, AccountHash);
        var ptr0 = account_hash.__destroy_into_raw();
        const ret = wasm.accountidentifier_fromAccountHash(ptr0);
        return EntityIdentifier.__wrap(ret);
    }
    /**
    * @param {EntityAddr} entity_addr
    * @returns {EntityIdentifier}
    */
    static fromEntityAddr(entity_addr) {
        _assertClass(entity_addr, EntityAddr);
        var ptr0 = entity_addr.__destroy_into_raw();
        const ret = wasm.entityidentifier_fromEntityAddr(ptr0);
        return EntityIdentifier.__wrap(ret);
    }
    /**
    * @returns {any}
    */
    toJson() {
        const ret = wasm.entityidentifier_toJson(this.__wbg_ptr);
        return takeObject(ret);
    }
}

const EraIdFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_eraid_free(ptr >>> 0));
/**
*/
export class EraId {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        EraIdFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_eraid_free(ptr);
    }
    /**
    * @param {bigint} value
    */
    constructor(value) {
        const ret = wasm.eraid_new(value);
        this.__wbg_ptr = ret >>> 0;
        return this;
    }
    /**
    * @returns {bigint}
    */
    value() {
        const ret = wasm.eraid_value(this.__wbg_ptr);
        return BigInt.asUintN(64, ret);
    }
}

const EventParseResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_eventparseresult_free(ptr >>> 0));
/**
* Represents the result of parsing an event, containing error information and the event body.
*/
export class EventParseResult {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        EventParseResultFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_eventparseresult_free(ptr);
    }
    /**
    * @returns {string | undefined}
    */
    get err() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_eventparseresult_err(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string | undefined} [arg0]
    */
    set err(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_eventparseresult_err(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {Body | undefined}
    */
    get body() {
        const ret = wasm.__wbg_get_eventparseresult_body(this.__wbg_ptr);
        return ret === 0 ? undefined : Body.__wrap(ret);
    }
    /**
    * @param {Body | undefined} [arg0]
    */
    set body(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, Body);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_eventparseresult_body(this.__wbg_ptr, ptr0);
    }
}

const ExecutionResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_executionresult_free(ptr >>> 0));
/**
* Represents the result of an execution, either Success or Failure.
*/
export class ExecutionResult {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(ExecutionResult.prototype);
        obj.__wbg_ptr = ptr;
        ExecutionResultFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        ExecutionResultFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_executionresult_free(ptr);
    }
    /**
    * Optional Success information.
    * @returns {Version2 | undefined}
    */
    get Success() {
        const ret = wasm.__wbg_get_executionresult_Success(this.__wbg_ptr);
        return ret === 0 ? undefined : Version2.__wrap(ret);
    }
    /**
    * Optional Success information.
    * @param {Version2 | undefined} [arg0]
    */
    set Success(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, Version2);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_executionresult_Success(this.__wbg_ptr, ptr0);
    }
    /**
    * Optional Failure information.
    * @returns {Failure | undefined}
    */
    get Failure() {
        const ret = wasm.__wbg_get_executionresult_Failure(this.__wbg_ptr);
        return ret === 0 ? undefined : Failure.__wrap(ret);
    }
    /**
    * Optional Failure information.
    * @param {Failure | undefined} [arg0]
    */
    set Failure(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, Failure);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_executionresult_Failure(this.__wbg_ptr, ptr0);
    }
}

const FailureFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_failure_free(ptr >>> 0));
/**
* Represents a failure response containing an error message.
*/
export class Failure {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Failure.prototype);
        obj.__wbg_ptr = ptr;
        FailureFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        FailureFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_failure_free(ptr);
    }
    /**
    * @returns {string}
    */
    get cost() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_deploystring_Deploy(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
    * @param {string} arg0
    */
    set cost(arg0) {
        const ptr0 = passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_deploystring_Deploy(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {string}
    */
    get error_message() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_failure_error_message(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
    * @param {string} arg0
    */
    set error_message(arg0) {
        const ptr0 = passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_failure_error_message(this.__wbg_ptr, ptr0, len0);
    }
}

const GetAccountResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_getaccountresult_free(ptr >>> 0));
/**
*/
export class GetAccountResult {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(GetAccountResult.prototype);
        obj.__wbg_ptr = ptr;
        GetAccountResultFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        GetAccountResultFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_getaccountresult_free(ptr);
    }
    /**
    * @returns {any}
    */
    get api_version() {
        const ret = wasm.getaccountresult_api_version(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * @returns {any}
    */
    get account() {
        const ret = wasm.getaccountresult_account(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * @returns {string}
    */
    get merkle_proof() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.getaccountresult_merkle_proof(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
    * @returns {any}
    */
    toJson() {
        const ret = wasm.getaccountresult_toJson(this.__wbg_ptr);
        return takeObject(ret);
    }
}

const GetAddressableEntityResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_getaddressableentityresult_free(ptr >>> 0));
/**
*/
export class GetAddressableEntityResult {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(GetAddressableEntityResult.prototype);
        obj.__wbg_ptr = ptr;
        GetAddressableEntityResultFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        GetAddressableEntityResultFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_getaddressableentityresult_free(ptr);
    }
    /**
    * @returns {any}
    */
    get api_version() {
        const ret = wasm.getaddressableentityresult_api_version(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * @returns {any}
    */
    get entity_result() {
        const ret = wasm.getaddressableentityresult_entity_result(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * @returns {string}
    */
    get merkle_proof() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.getaccountresult_merkle_proof(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
    * @returns {any}
    */
    toJson() {
        const ret = wasm.getaddressableentityresult_toJson(this.__wbg_ptr);
        return takeObject(ret);
    }
}

const GetAuctionInfoResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_getauctioninforesult_free(ptr >>> 0));
/**
*/
export class GetAuctionInfoResult {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(GetAuctionInfoResult.prototype);
        obj.__wbg_ptr = ptr;
        GetAuctionInfoResultFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        GetAuctionInfoResultFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_getauctioninforesult_free(ptr);
    }
    /**
    * Gets the API version as a JsValue.
    * @returns {any}
    */
    get api_version() {
        const ret = wasm.getauctioninforesult_api_version(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * Gets the auction state as a JsValue.
    * @returns {any}
    */
    get auction_state() {
        const ret = wasm.getauctioninforesult_auction_state(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * Converts the GetAuctionInfoResult to a JsValue.
    * @returns {any}
    */
    toJson() {
        const ret = wasm.getauctioninforesult_toJson(this.__wbg_ptr);
        return takeObject(ret);
    }
}

const GetBalanceResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_getbalanceresult_free(ptr >>> 0));
/**
*/
export class GetBalanceResult {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(GetBalanceResult.prototype);
        obj.__wbg_ptr = ptr;
        GetBalanceResultFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        GetBalanceResultFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_getbalanceresult_free(ptr);
    }
    /**
    * Gets the API version as a JsValue.
    * @returns {any}
    */
    get api_version() {
        const ret = wasm.getbalanceresult_api_version(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * Gets the balance value as a JsValue.
    * @returns {any}
    */
    get balance_value() {
        const ret = wasm.getbalanceresult_balance_value(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * Gets the Merkle proof as a string.
    * @returns {string}
    */
    get merkle_proof() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.getbalanceresult_merkle_proof(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
    * Converts the GetBalanceResult to a JsValue.
    * @returns {any}
    */
    toJson() {
        const ret = wasm.getbalanceresult_toJson(this.__wbg_ptr);
        return takeObject(ret);
    }
}

const GetBlockResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_getblockresult_free(ptr >>> 0));
/**
*/
export class GetBlockResult {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(GetBlockResult.prototype);
        obj.__wbg_ptr = ptr;
        GetBlockResultFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        GetBlockResultFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_getblockresult_free(ptr);
    }
    /**
    * Gets the API version as a JsValue.
    * @returns {any}
    */
    get api_version() {
        const ret = wasm.getblockresult_api_version(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * Gets the block information as a JsValue.
    * @returns {any}
    */
    get block() {
        const ret = wasm.getblockresult_block(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * Converts the GetBlockResult to a JsValue.
    * @returns {any}
    */
    toJson() {
        const ret = wasm.getblockresult_toJson(this.__wbg_ptr);
        return takeObject(ret);
    }
}

const GetBlockTransfersResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_getblocktransfersresult_free(ptr >>> 0));
/**
*/
export class GetBlockTransfersResult {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(GetBlockTransfersResult.prototype);
        obj.__wbg_ptr = ptr;
        GetBlockTransfersResultFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        GetBlockTransfersResultFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_getblocktransfersresult_free(ptr);
    }
    /**
    * Gets the API version as a JsValue.
    * @returns {any}
    */
    get api_version() {
        const ret = wasm.getblocktransfersresult_api_version(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * Gets the block hash as an Option<BlockHash>.
    * @returns {BlockHash | undefined}
    */
    get block_hash() {
        const ret = wasm.getblocktransfersresult_block_hash(this.__wbg_ptr);
        return ret === 0 ? undefined : BlockHash.__wrap(ret);
    }
    /**
    * Gets the transfers as a JsValue.
    * @returns {any}
    */
    get transfers() {
        const ret = wasm.getblocktransfersresult_transfers(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * Converts the GetBlockTransfersResult to a JsValue.
    * @returns {any}
    */
    toJson() {
        const ret = wasm.getblocktransfersresult_toJson(this.__wbg_ptr);
        return takeObject(ret);
    }
}

const GetChainspecResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_getchainspecresult_free(ptr >>> 0));
/**
* A struct representing the result of the `get_chainspec` function.
*/
export class GetChainspecResult {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(GetChainspecResult.prototype);
        obj.__wbg_ptr = ptr;
        GetChainspecResultFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        GetChainspecResultFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_getchainspecresult_free(ptr);
    }
    /**
    * Gets the API version as a JsValue.
    * @returns {any}
    */
    get api_version() {
        const ret = wasm.getchainspecresult_api_version(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * Gets the chainspec bytes as a JsValue.
    * @returns {any}
    */
    get chainspec_bytes() {
        const ret = wasm.getchainspecresult_chainspec_bytes(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * Converts the `GetChainspecResult` to a JsValue.
    * @returns {any}
    */
    toJson() {
        const ret = wasm.getchainspecresult_toJson(this.__wbg_ptr);
        return takeObject(ret);
    }
}

const GetDeployResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_getdeployresult_free(ptr >>> 0));
/**
*/
export class GetDeployResult {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(GetDeployResult.prototype);
        obj.__wbg_ptr = ptr;
        GetDeployResultFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        GetDeployResultFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_getdeployresult_free(ptr);
    }
    /**
    * Gets the API version as a JavaScript value.
    * @returns {any}
    */
    get api_version() {
        const ret = wasm.getdeployresult_api_version(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * Gets the deploy information.
    * @returns {Deploy}
    */
    get deploy() {
        const ret = wasm.getdeployresult_deploy(this.__wbg_ptr);
        return Deploy.__wrap(ret);
    }
    /**
    * Gets the execution info as a JavaScript value.
    * @returns {any}
    */
    get execution_info() {
        const ret = wasm.getdeployresult_execution_info(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * Converts the result to a JSON JavaScript value.
    * @returns {any}
    */
    toJson() {
        const ret = wasm.getdeployresult_toJson(this.__wbg_ptr);
        return takeObject(ret);
    }
}

const GetDictionaryItemResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_getdictionaryitemresult_free(ptr >>> 0));
/**
*/
export class GetDictionaryItemResult {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(GetDictionaryItemResult.prototype);
        obj.__wbg_ptr = ptr;
        GetDictionaryItemResultFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        GetDictionaryItemResultFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_getdictionaryitemresult_free(ptr);
    }
    /**
    * Gets the API version as a JsValue.
    * @returns {any}
    */
    get api_version() {
        const ret = wasm.getdictionaryitemresult_api_version(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * Gets the dictionary key as a String.
    * @returns {string}
    */
    get dictionary_key() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.getdictionaryitemresult_dictionary_key(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
    * Gets the stored value as a JsValue.
    * @returns {any}
    */
    get stored_value() {
        const ret = wasm.getdictionaryitemresult_stored_value(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * Gets the merkle proof as a String.
    * @returns {string}
    */
    get merkle_proof() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.getdictionaryitemresult_merkle_proof(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
    * Converts the GetDictionaryItemResult to a JsValue.
    * @returns {any}
    */
    toJson() {
        const ret = wasm.getdictionaryitemresult_toJson(this.__wbg_ptr);
        return takeObject(ret);
    }
}

const GetEraInfoResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_geterainforesult_free(ptr >>> 0));
/**
*/
export class GetEraInfoResult {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(GetEraInfoResult.prototype);
        obj.__wbg_ptr = ptr;
        GetEraInfoResultFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        GetEraInfoResultFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_geterainforesult_free(ptr);
    }
    /**
    * @returns {any}
    */
    get api_version() {
        const ret = wasm.geterainforesult_api_version(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * @returns {any}
    */
    get era_summary() {
        const ret = wasm.geterainforesult_era_summary(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * @returns {any}
    */
    toJson() {
        const ret = wasm.geterainforesult_toJson(this.__wbg_ptr);
        return takeObject(ret);
    }
}

const GetEraSummaryResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_geterasummaryresult_free(ptr >>> 0));
/**
* Wrapper struct for the `GetEraSummaryResult` from casper_client.
*/
export class GetEraSummaryResult {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(GetEraSummaryResult.prototype);
        obj.__wbg_ptr = ptr;
        GetEraSummaryResultFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        GetEraSummaryResultFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_geterasummaryresult_free(ptr);
    }
    /**
    * Gets the API version as a JsValue.
    * @returns {any}
    */
    get api_version() {
        const ret = wasm.geterasummaryresult_api_version(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * Gets the era summary as a JsValue.
    * @returns {any}
    */
    get era_summary() {
        const ret = wasm.geterasummaryresult_era_summary(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * Converts the GetEraSummaryResult to a JsValue.
    * @returns {any}
    */
    toJson() {
        const ret = wasm.geterasummaryresult_toJson(this.__wbg_ptr);
        return takeObject(ret);
    }
}

const GetNodeStatusResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_getnodestatusresult_free(ptr >>> 0));
/**
* Wrapper struct for the `GetNodeStatusResult` from casper_client.
*/
export class GetNodeStatusResult {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(GetNodeStatusResult.prototype);
        obj.__wbg_ptr = ptr;
        GetNodeStatusResultFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        GetNodeStatusResultFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_getnodestatusresult_free(ptr);
    }
    /**
    * Gets the API version as a JsValue.
    * @returns {any}
    */
    get api_version() {
        const ret = wasm.getnodestatusresult_api_version(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * Gets the chainspec name as a String.
    * @returns {string}
    */
    get chainspec_name() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.getnodestatusresult_chainspec_name(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
    * Gets the starting state root hash as a Digest.
    * @returns {Digest}
    */
    get starting_state_root_hash() {
        const ret = wasm.getnodestatusresult_starting_state_root_hash(this.__wbg_ptr);
        return Digest.__wrap(ret);
    }
    /**
    * Gets the list of peers as a JsValue.
    * @returns {any}
    */
    get peers() {
        const ret = wasm.getnodestatusresult_peers(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * Gets information about the last added block as a JsValue.
    * @returns {any}
    */
    get last_added_block_info() {
        const ret = wasm.getnodestatusresult_last_added_block_info(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * Gets the public signing key as an Option<PublicKey>.
    * @returns {PublicKey | undefined}
    */
    get our_public_signing_key() {
        const ret = wasm.getnodestatusresult_our_public_signing_key(this.__wbg_ptr);
        return ret === 0 ? undefined : PublicKey.__wrap(ret);
    }
    /**
    * Gets the round length as a JsValue.
    * @returns {any}
    */
    get round_length() {
        const ret = wasm.getnodestatusresult_round_length(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * Gets information about the next upgrade as a JsValue.
    * @returns {any}
    */
    get next_upgrade() {
        const ret = wasm.getnodestatusresult_next_upgrade(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * Gets the build version as a String.
    * @returns {string}
    */
    get build_version() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.getnodestatusresult_build_version(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
    * Gets the uptime information as a JsValue.
    * @returns {any}
    */
    get uptime() {
        const ret = wasm.getnodestatusresult_uptime(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * Gets the reactor state information as a JsValue.
    * @returns {any}
    */
    get reactor_state() {
        const ret = wasm.getnodestatusresult_reactor_state(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * Gets the last progress information as a JsValue.
    * @returns {any}
    */
    get last_progress() {
        const ret = wasm.getnodestatusresult_last_progress(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * Gets the available block range as a JsValue.
    * @returns {any}
    */
    get available_block_range() {
        const ret = wasm.getnodestatusresult_available_block_range(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * Gets the block sync information as a JsValue.
    * @returns {any}
    */
    get block_sync() {
        const ret = wasm.getnodestatusresult_block_sync(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * Converts the GetNodeStatusResult to a JsValue.
    * @returns {any}
    */
    toJson() {
        const ret = wasm.getnodestatusresult_toJson(this.__wbg_ptr);
        return takeObject(ret);
    }
}

const GetPeersResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_getpeersresult_free(ptr >>> 0));
/**
* A wrapper for the `GetPeersResult` type from the Casper client.
*/
export class GetPeersResult {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(GetPeersResult.prototype);
        obj.__wbg_ptr = ptr;
        GetPeersResultFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        GetPeersResultFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_getpeersresult_free(ptr);
    }
    /**
    * Gets the API version as a JSON value.
    * @returns {any}
    */
    get api_version() {
        const ret = wasm.getpeersresult_api_version(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * Gets the peers as a JSON value.
    * @returns {any}
    */
    get peers() {
        const ret = wasm.getpeersresult_peers(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * Converts the result to JSON format as a JavaScript value.
    * @returns {any}
    */
    toJson() {
        const ret = wasm.getpeersresult_toJson(this.__wbg_ptr);
        return takeObject(ret);
    }
}

const GetStateRootHashResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_getstateroothashresult_free(ptr >>> 0));
/**
* Wrapper struct for the `GetStateRootHashResult` from casper_client.
*/
export class GetStateRootHashResult {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(GetStateRootHashResult.prototype);
        obj.__wbg_ptr = ptr;
        GetStateRootHashResultFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        GetStateRootHashResultFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_getstateroothashresult_free(ptr);
    }
    /**
    * Gets the API version as a JsValue.
    * @returns {any}
    */
    get api_version() {
        const ret = wasm.getstateroothashresult_api_version(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * Gets the state root hash as an Option<Digest>.
    * @returns {Digest | undefined}
    */
    get state_root_hash() {
        const ret = wasm.getstateroothashresult_state_root_hash(this.__wbg_ptr);
        return ret === 0 ? undefined : Digest.__wrap(ret);
    }
    /**
    * Gets the state root hash as a String.
    * @returns {string}
    */
    get state_root_hash_as_string() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.getstateroothashresult_state_root_hash_as_string(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
    * Alias for state_root_hash_as_string
    * @returns {string}
    */
    toString() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.getstateroothashresult_toString(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
    * Converts the GetStateRootHashResult to a JsValue.
    * @returns {any}
    */
    toJson() {
        const ret = wasm.getstateroothashresult_toJson(this.__wbg_ptr);
        return takeObject(ret);
    }
}

const GetTransactionResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_gettransactionresult_free(ptr >>> 0));
/**
*/
export class GetTransactionResult {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(GetTransactionResult.prototype);
        obj.__wbg_ptr = ptr;
        GetTransactionResultFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        GetTransactionResultFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_gettransactionresult_free(ptr);
    }
    /**
    * Gets the API version as a JavaScript value.
    * @returns {any}
    */
    get api_version() {
        const ret = wasm.gettransactionresult_api_version(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * Gets the transaction information.
    * @returns {Transaction}
    */
    get transaction() {
        const ret = wasm.gettransactionresult_transaction(this.__wbg_ptr);
        return Transaction.__wrap(ret);
    }
    /**
    * Gets the execution info as a JavaScript value.
    * @returns {any}
    */
    get execution_info() {
        const ret = wasm.gettransactionresult_execution_info(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * Converts the result to a JSON JavaScript value.
    * @returns {any}
    */
    toJson() {
        const ret = wasm.gettransactionresult_toJson(this.__wbg_ptr);
        return takeObject(ret);
    }
}

const GetValidatorChangesResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_getvalidatorchangesresult_free(ptr >>> 0));
/**
* Wrapper struct for the `GetValidatorChangesResult` from casper_client.
*/
export class GetValidatorChangesResult {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(GetValidatorChangesResult.prototype);
        obj.__wbg_ptr = ptr;
        GetValidatorChangesResultFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        GetValidatorChangesResultFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_getvalidatorchangesresult_free(ptr);
    }
    /**
    * Gets the API version as a JsValue.
    * @returns {any}
    */
    get api_version() {
        const ret = wasm.getvalidatorchangesresult_api_version(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * Gets the validator changes as a JsValue.
    * @returns {any}
    */
    get changes() {
        const ret = wasm.getvalidatorchangesresult_changes(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * Converts the GetValidatorChangesResult to a JsValue.
    * @returns {any}
    */
    toJson() {
        const ret = wasm.getvalidatorchangesresult_toJson(this.__wbg_ptr);
        return takeObject(ret);
    }
}

const GlobalStateIdentifierFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_globalstateidentifier_free(ptr >>> 0));
/**
*/
export class GlobalStateIdentifier {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(GlobalStateIdentifier.prototype);
        obj.__wbg_ptr = ptr;
        GlobalStateIdentifierFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        GlobalStateIdentifierFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_globalstateidentifier_free(ptr);
    }
    /**
    * @param {GlobalStateIdentifier} global_state_identifier
    */
    constructor(global_state_identifier) {
        _assertClass(global_state_identifier, GlobalStateIdentifier);
        var ptr0 = global_state_identifier.__destroy_into_raw();
        const ret = wasm.globalstateidentifier_new(ptr0);
        this.__wbg_ptr = ret >>> 0;
        return this;
    }
    /**
    * @param {BlockHash} block_hash
    * @returns {GlobalStateIdentifier}
    */
    static fromBlockHash(block_hash) {
        _assertClass(block_hash, BlockHash);
        var ptr0 = block_hash.__destroy_into_raw();
        const ret = wasm.globalstateidentifier_fromBlockHash(ptr0);
        return GlobalStateIdentifier.__wrap(ret);
    }
    /**
    * @param {bigint} block_height
    * @returns {GlobalStateIdentifier}
    */
    static fromBlockHeight(block_height) {
        const ret = wasm.globalstateidentifier_fromBlockHeight(block_height);
        return GlobalStateIdentifier.__wrap(ret);
    }
    /**
    * @param {Digest} state_root_hash
    * @returns {GlobalStateIdentifier}
    */
    static fromStateRootHash(state_root_hash) {
        _assertClass(state_root_hash, Digest);
        var ptr0 = state_root_hash.__destroy_into_raw();
        const ret = wasm.globalstateidentifier_fromStateRootHash(ptr0);
        return GlobalStateIdentifier.__wrap(ret);
    }
    /**
    * @returns {any}
    */
    toJson() {
        const ret = wasm.globalstateidentifier_toJson(this.__wbg_ptr);
        return takeObject(ret);
    }
}

const HashAddrFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_hashaddr_free(ptr >>> 0));
/**
*/
export class HashAddr {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(HashAddr.prototype);
        obj.__wbg_ptr = ptr;
        HashAddrFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        HashAddrFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_hashaddr_free(ptr);
    }
    /**
    * @param {Uint8Array} bytes
    */
    constructor(bytes) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(bytes, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.hashaddr_new(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            this.__wbg_ptr = r0 >>> 0;
            return this;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}

const IntoUnderlyingByteSourceFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_intounderlyingbytesource_free(ptr >>> 0));
/**
*/
export class IntoUnderlyingByteSource {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        IntoUnderlyingByteSourceFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_intounderlyingbytesource_free(ptr);
    }
    /**
    * @returns {string}
    */
    get type() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.intounderlyingbytesource_type(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
    * @returns {number}
    */
    get autoAllocateChunkSize() {
        const ret = wasm.intounderlyingbytesource_autoAllocateChunkSize(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
    * @param {ReadableByteStreamController} controller
    */
    start(controller) {
        wasm.intounderlyingbytesource_start(this.__wbg_ptr, addHeapObject(controller));
    }
    /**
    * @param {ReadableByteStreamController} controller
    * @returns {Promise<any>}
    */
    pull(controller) {
        const ret = wasm.intounderlyingbytesource_pull(this.__wbg_ptr, addHeapObject(controller));
        return takeObject(ret);
    }
    /**
    */
    cancel() {
        const ptr = this.__destroy_into_raw();
        wasm.intounderlyingbytesource_cancel(ptr);
    }
}

const IntoUnderlyingSinkFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_intounderlyingsink_free(ptr >>> 0));
/**
*/
export class IntoUnderlyingSink {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        IntoUnderlyingSinkFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_intounderlyingsink_free(ptr);
    }
    /**
    * @param {any} chunk
    * @returns {Promise<any>}
    */
    write(chunk) {
        const ret = wasm.intounderlyingsink_write(this.__wbg_ptr, addHeapObject(chunk));
        return takeObject(ret);
    }
    /**
    * @returns {Promise<any>}
    */
    close() {
        const ptr = this.__destroy_into_raw();
        const ret = wasm.intounderlyingsink_close(ptr);
        return takeObject(ret);
    }
    /**
    * @param {any} reason
    * @returns {Promise<any>}
    */
    abort(reason) {
        const ptr = this.__destroy_into_raw();
        const ret = wasm.intounderlyingsink_abort(ptr, addHeapObject(reason));
        return takeObject(ret);
    }
}

const IntoUnderlyingSourceFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_intounderlyingsource_free(ptr >>> 0));
/**
*/
export class IntoUnderlyingSource {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        IntoUnderlyingSourceFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_intounderlyingsource_free(ptr);
    }
    /**
    * @param {ReadableStreamDefaultController} controller
    * @returns {Promise<any>}
    */
    pull(controller) {
        const ret = wasm.intounderlyingsource_pull(this.__wbg_ptr, addHeapObject(controller));
        return takeObject(ret);
    }
    /**
    */
    cancel() {
        const ptr = this.__destroy_into_raw();
        wasm.intounderlyingsource_cancel(ptr);
    }
}

const KeyFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_key_free(ptr >>> 0));
/**
*/
export class Key {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Key.prototype);
        obj.__wbg_ptr = ptr;
        KeyFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        KeyFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_key_free(ptr);
    }
    /**
    * @param {Key} key
    */
    constructor(key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(key, Key);
            var ptr0 = key.__destroy_into_raw();
            wasm.key_new(retptr, ptr0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            this.__wbg_ptr = r0 >>> 0;
            return this;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {any}
    */
    toJson() {
        const ret = wasm.key_toJson(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * @param {URef} key
    * @returns {Key}
    */
    static fromURef(key) {
        _assertClass(key, URef);
        var ptr0 = key.__destroy_into_raw();
        const ret = wasm.key_fromURef(ptr0);
        return Key.__wrap(ret);
    }
    /**
    * @param {DeployHash} key
    * @returns {Key}
    */
    static fromDeployInfo(key) {
        _assertClass(key, DeployHash);
        var ptr0 = key.__destroy_into_raw();
        const ret = wasm.key_fromDeployInfo(ptr0);
        return Key.__wrap(ret);
    }
    /**
    * @param {AccountHash} key
    * @returns {Key}
    */
    static fromAccount(key) {
        _assertClass(key, AccountHash);
        var ptr0 = key.__destroy_into_raw();
        const ret = wasm.key_fromAccount(ptr0);
        return Key.__wrap(ret);
    }
    /**
    * @param {HashAddr} key
    * @returns {Key}
    */
    static fromHash(key) {
        _assertClass(key, HashAddr);
        var ptr0 = key.__destroy_into_raw();
        const ret = wasm.key_fromHash(ptr0);
        return Key.__wrap(ret);
    }
    /**
    * @param {Uint8Array} key
    * @returns {TransferAddr}
    */
    static fromTransfer(key) {
        const ptr0 = passArray8ToWasm0(key, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.key_fromTransfer(ptr0, len0);
        return TransferAddr.__wrap(ret);
    }
    /**
    * @param {EraId} key
    * @returns {Key}
    */
    static fromEraInfo(key) {
        _assertClass(key, EraId);
        var ptr0 = key.__destroy_into_raw();
        const ret = wasm.key_fromEraInfo(ptr0);
        return Key.__wrap(ret);
    }
    /**
    * @param {URefAddr} key
    * @returns {Key}
    */
    static fromBalance(key) {
        _assertClass(key, URefAddr);
        var ptr0 = key.__destroy_into_raw();
        const ret = wasm.key_fromBalance(ptr0);
        return Key.__wrap(ret);
    }
    /**
    * @param {AccountHash} key
    * @returns {Key}
    */
    static fromBid(key) {
        _assertClass(key, AccountHash);
        var ptr0 = key.__destroy_into_raw();
        const ret = wasm.key_fromBid(ptr0);
        return Key.__wrap(ret);
    }
    /**
    * @param {AccountHash} key
    * @returns {Key}
    */
    static fromWithdraw(key) {
        _assertClass(key, AccountHash);
        var ptr0 = key.__destroy_into_raw();
        const ret = wasm.key_fromWithdraw(ptr0);
        return Key.__wrap(ret);
    }
    /**
    * @param {DictionaryAddr} key
    * @returns {Key}
    */
    static fromDictionaryAddr(key) {
        _assertClass(key, DictionaryAddr);
        var ptr0 = key.__destroy_into_raw();
        const ret = wasm.key_fromDictionaryAddr(ptr0);
        return Key.__wrap(ret);
    }
    /**
    * @returns {DictionaryAddr | undefined}
    */
    asDictionaryAddr() {
        const ret = wasm.key_asDictionaryAddr(this.__wbg_ptr);
        return ret === 0 ? undefined : DictionaryAddr.__wrap(ret);
    }
    /**
    * @returns {Key}
    */
    static fromSystemEntityRegistry() {
        const ret = wasm.key_fromSystemEntityRegistry();
        return Key.__wrap(ret);
    }
    /**
    * @returns {Key}
    */
    static fromEraSummary() {
        const ret = wasm.key_fromEraSummary();
        return Key.__wrap(ret);
    }
    /**
    * @param {AccountHash} key
    * @returns {Key}
    */
    static fromUnbond(key) {
        _assertClass(key, AccountHash);
        var ptr0 = key.__destroy_into_raw();
        const ret = wasm.key_fromUnbond(ptr0);
        return Key.__wrap(ret);
    }
    /**
    * @returns {Key}
    */
    static fromChainspecRegistry() {
        const ret = wasm.key_fromChainspecRegistry();
        return Key.__wrap(ret);
    }
    /**
    * @returns {Key}
    */
    static fromChecksumRegistry() {
        const ret = wasm.key_fromChecksumRegistry();
        return Key.__wrap(ret);
    }
    /**
    * @returns {string}
    */
    toFormattedString() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.key_toFormattedString(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
    * @param {any} input
    * @returns {Key}
    */
    static fromFormattedString(input) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.key_fromFormattedString(retptr, addHeapObject(input));
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return Key.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {URef} seed_uref
    * @param {Uint8Array} dictionary_item_key
    * @returns {Key}
    */
    static fromDictionaryKey(seed_uref, dictionary_item_key) {
        _assertClass(seed_uref, URef);
        var ptr0 = seed_uref.__destroy_into_raw();
        const ptr1 = passArray8ToWasm0(dictionary_item_key, wasm.__wbindgen_malloc);
        const len1 = WASM_VECTOR_LEN;
        const ret = wasm.key_fromDictionaryKey(ptr0, ptr1, len1);
        return Key.__wrap(ret);
    }
    /**
    * @returns {boolean}
    */
    isDictionaryKey() {
        const ret = wasm.key_isDictionaryKey(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
    * @returns {AccountHash | undefined}
    */
    intoAccount() {
        const ptr = this.__destroy_into_raw();
        const ret = wasm.key_intoAccount(ptr);
        return ret === 0 ? undefined : AccountHash.__wrap(ret);
    }
    /**
    * @returns {HashAddr | undefined}
    */
    intoHash() {
        const ptr = this.__destroy_into_raw();
        const ret = wasm.key_intoHash(ptr);
        return ret === 0 ? undefined : HashAddr.__wrap(ret);
    }
    /**
    * @returns {URefAddr | undefined}
    */
    asBalance() {
        const ret = wasm.key_asBalance(this.__wbg_ptr);
        return ret === 0 ? undefined : URefAddr.__wrap(ret);
    }
    /**
    * @returns {URef | undefined}
    */
    intoURef() {
        const ptr = this.__destroy_into_raw();
        const ret = wasm.key_intoURef(ptr);
        return ret === 0 ? undefined : URef.__wrap(ret);
    }
    /**
    * @returns {Key | undefined}
    */
    urefToHash() {
        const ret = wasm.key_urefToHash(this.__wbg_ptr);
        return ret === 0 ? undefined : Key.__wrap(ret);
    }
    /**
    * @returns {Key | undefined}
    */
    withdrawToUnbond() {
        const ret = wasm.key_withdrawToUnbond(this.__wbg_ptr);
        return ret === 0 ? undefined : Key.__wrap(ret);
    }
}

const ListRpcsResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_listrpcsresult_free(ptr >>> 0));
/**
* Wrapper struct for the `ListRpcsResult` from casper_client.
*/
export class ListRpcsResult {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(ListRpcsResult.prototype);
        obj.__wbg_ptr = ptr;
        ListRpcsResultFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        ListRpcsResultFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_listrpcsresult_free(ptr);
    }
    /**
    * Gets the API version as a JsValue.
    * @returns {any}
    */
    get api_version() {
        const ret = wasm.listrpcsresult_api_version(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * Gets the name of the RPC.
    * @returns {string}
    */
    get name() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.listrpcsresult_name(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
    * Gets the schema of the RPC as a JsValue.
    * @returns {any}
    */
    get schema() {
        const ret = wasm.listrpcsresult_schema(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * Converts the ListRpcsResult to a JsValue.
    * @returns {any}
    */
    toJson() {
        const ret = wasm.listrpcsresult_toJson(this.__wbg_ptr);
        return takeObject(ret);
    }
}

const MessageFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_message_free(ptr >>> 0));
/**
*/
export class Message {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Message.prototype);
        obj.__wbg_ptr = ptr;
        MessageFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        MessageFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_message_free(ptr);
    }
    /**
    * @returns {string}
    */
    get String() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_deploystring_Deploy(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
    * @param {string} arg0
    */
    set String(arg0) {
        const ptr0 = passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_deploystring_Deploy(this.__wbg_ptr, ptr0, len0);
    }
}

const MessagesFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_messages_free(ptr >>> 0));
/**
*/
export class Messages {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Messages.prototype);
        obj.__wbg_ptr = ptr;
        MessagesFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    static __unwrap(jsValue) {
        if (!(jsValue instanceof Messages)) {
            return 0;
        }
        return jsValue.__destroy_into_raw();
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        MessagesFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_messages_free(ptr);
    }
    /**
    * @returns {string}
    */
    get entity_hash() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_failure_error_message(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
    * @param {string} arg0
    */
    set entity_hash(arg0) {
        const ptr0 = passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_messages_entity_hash(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {Message}
    */
    get message() {
        const ret = wasm.__wbg_get_messages_message(this.__wbg_ptr);
        return Message.__wrap(ret);
    }
    /**
    * @param {Message} arg0
    */
    set message(arg0) {
        _assertClass(arg0, Message);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_messages_message(this.__wbg_ptr, ptr0);
    }
    /**
    * @returns {string}
    */
    get topic_name() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_messages_topic_name(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
    * @param {string} arg0
    */
    set topic_name(arg0) {
        const ptr0 = passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_messages_topic_name(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {string}
    */
    get topic_name_hash() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_messages_topic_name_hash(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
    * @param {string} arg0
    */
    set topic_name_hash(arg0) {
        const ptr0 = passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_messages_topic_name_hash(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {number}
    */
    get topic_index() {
        const ret = wasm.__wbg_get_messages_topic_index(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
    * @param {number} arg0
    */
    set topic_index(arg0) {
        wasm.__wbg_set_messages_topic_index(this.__wbg_ptr, arg0);
    }
    /**
    * @returns {bigint}
    */
    get block_index() {
        const ret = wasm.__wbg_get_messages_block_index(this.__wbg_ptr);
        return BigInt.asUintN(64, ret);
    }
    /**
    * @param {bigint} arg0
    */
    set block_index(arg0) {
        wasm.__wbg_set_messages_block_index(this.__wbg_ptr, arg0);
    }
}

const PackageHashFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_packagehash_free(ptr >>> 0));
/**
*/
export class PackageHash {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(PackageHash.prototype);
        obj.__wbg_ptr = ptr;
        PackageHashFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        PackageHashFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_packagehash_free(ptr);
    }
    /**
    * @param {string} input
    */
    constructor(input) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passStringToWasm0(input, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.packagehash_fromString(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            this.__wbg_ptr = r0 >>> 0;
            return this;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string} input
    * @returns {PackageHash}
    */
    static fromFormattedStr(input) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passStringToWasm0(input, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.packagehash_fromFormattedStr(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return PackageHash.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {string}
    */
    toFormattedString() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.packagehash_toFormattedString(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
    * @param {Uint8Array} bytes
    * @returns {PackageHash}
    */
    static fromUint8Array(bytes) {
        const ptr0 = passArray8ToWasm0(bytes, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.packagehash_fromUint8Array(ptr0, len0);
        return PackageHash.__wrap(ret);
    }
}

const PathFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_path_free(ptr >>> 0));
/**
*/
export class Path {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Path.prototype);
        obj.__wbg_ptr = ptr;
        PathFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        PathFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_path_free(ptr);
    }
    /**
    * @param {any} path
    */
    constructor(path) {
        const ret = wasm.path_new(addHeapObject(path));
        this.__wbg_ptr = ret >>> 0;
        return this;
    }
    /**
    * @param {any} path
    * @returns {Path}
    */
    static fromArray(path) {
        const ret = wasm.path_fromArray(addHeapObject(path));
        return Path.__wrap(ret);
    }
    /**
    * @returns {any}
    */
    toJson() {
        const ret = wasm.path_toJson(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * @returns {string}
    */
    toString() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.path_toString(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
    * @returns {boolean}
    */
    is_empty() {
        const ret = wasm.path_is_empty(this.__wbg_ptr);
        return ret !== 0;
    }
}

const PaymentFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_payment_free(ptr >>> 0));
/**
*/
export class Payment {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        PaymentFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_payment_free(ptr);
    }
    /**
    * @returns {string}
    */
    get source() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_deploystring_Deploy(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
    * @param {string} arg0
    */
    set source(arg0) {
        const ptr0 = passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_deploystring_Deploy(this.__wbg_ptr, ptr0, len0);
    }
}

const PaymentStrParamsFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_paymentstrparams_free(ptr >>> 0));
/**
*/
export class PaymentStrParams {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        PaymentStrParamsFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_paymentstrparams_free(ptr);
    }
    /**
    * @param {string | undefined} [payment_amount]
    * @param {string | undefined} [payment_hash]
    * @param {string | undefined} [payment_name]
    * @param {string | undefined} [payment_package_hash]
    * @param {string | undefined} [payment_package_name]
    * @param {string | undefined} [payment_path]
    * @param {Array<any> | undefined} [payment_args_simple]
    * @param {string | undefined} [payment_args_json]
    * @param {string | undefined} [payment_version]
    * @param {string | undefined} [payment_entry_point]
    */
    constructor(payment_amount, payment_hash, payment_name, payment_package_hash, payment_package_name, payment_path, payment_args_simple, payment_args_json, payment_version, payment_entry_point) {
        var ptr0 = isLikeNone(payment_amount) ? 0 : passStringToWasm0(payment_amount, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        var ptr1 = isLikeNone(payment_hash) ? 0 : passStringToWasm0(payment_hash, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        var ptr2 = isLikeNone(payment_name) ? 0 : passStringToWasm0(payment_name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len2 = WASM_VECTOR_LEN;
        var ptr3 = isLikeNone(payment_package_hash) ? 0 : passStringToWasm0(payment_package_hash, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len3 = WASM_VECTOR_LEN;
        var ptr4 = isLikeNone(payment_package_name) ? 0 : passStringToWasm0(payment_package_name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len4 = WASM_VECTOR_LEN;
        var ptr5 = isLikeNone(payment_path) ? 0 : passStringToWasm0(payment_path, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len5 = WASM_VECTOR_LEN;
        var ptr6 = isLikeNone(payment_args_json) ? 0 : passStringToWasm0(payment_args_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len6 = WASM_VECTOR_LEN;
        var ptr7 = isLikeNone(payment_version) ? 0 : passStringToWasm0(payment_version, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len7 = WASM_VECTOR_LEN;
        var ptr8 = isLikeNone(payment_entry_point) ? 0 : passStringToWasm0(payment_entry_point, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len8 = WASM_VECTOR_LEN;
        const ret = wasm.paymentstrparams_new(ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, ptr4, len4, ptr5, len5, isLikeNone(payment_args_simple) ? 0 : addHeapObject(payment_args_simple), ptr6, len6, ptr7, len7, ptr8, len8);
        this.__wbg_ptr = ret >>> 0;
        return this;
    }
    /**
    * @returns {string | undefined}
    */
    get payment_amount() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.paymentstrparams_payment_amount(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string} payment_amount
    */
    set payment_amount(payment_amount) {
        const ptr0 = passStringToWasm0(payment_amount, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.paymentstrparams_set_payment_amount(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {string | undefined}
    */
    get payment_hash() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.paymentstrparams_payment_hash(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string} payment_hash
    */
    set payment_hash(payment_hash) {
        const ptr0 = passStringToWasm0(payment_hash, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.paymentstrparams_set_payment_hash(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {string | undefined}
    */
    get payment_name() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.paymentstrparams_payment_name(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string} payment_name
    */
    set payment_name(payment_name) {
        const ptr0 = passStringToWasm0(payment_name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.paymentstrparams_set_payment_name(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {string | undefined}
    */
    get payment_package_hash() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.paymentstrparams_payment_package_hash(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string} payment_package_hash
    */
    set payment_package_hash(payment_package_hash) {
        const ptr0 = passStringToWasm0(payment_package_hash, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.paymentstrparams_set_payment_package_hash(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {string | undefined}
    */
    get payment_package_name() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.paymentstrparams_payment_package_name(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string} payment_package_name
    */
    set payment_package_name(payment_package_name) {
        const ptr0 = passStringToWasm0(payment_package_name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.paymentstrparams_set_payment_package_name(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {string | undefined}
    */
    get payment_path() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.paymentstrparams_payment_path(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string} payment_path
    */
    set payment_path(payment_path) {
        const ptr0 = passStringToWasm0(payment_path, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.paymentstrparams_set_payment_path(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {Array<any> | undefined}
    */
    get payment_args_simple() {
        const ret = wasm.paymentstrparams_payment_args_simple(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * @param {Array<any>} payment_args_simple
    */
    set payment_args_simple(payment_args_simple) {
        wasm.paymentstrparams_set_payment_args_simple(this.__wbg_ptr, addHeapObject(payment_args_simple));
    }
    /**
    * @returns {string | undefined}
    */
    get payment_args_json() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.paymentstrparams_payment_args_json(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string} payment_args_json
    */
    set payment_args_json(payment_args_json) {
        const ptr0 = passStringToWasm0(payment_args_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.paymentstrparams_set_payment_args_json(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {string | undefined}
    */
    get payment_version() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.paymentstrparams_payment_version(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string} payment_version
    */
    set payment_version(payment_version) {
        const ptr0 = passStringToWasm0(payment_version, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.paymentstrparams_set_payment_version(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {string | undefined}
    */
    get payment_entry_point() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.paymentstrparams_payment_entry_point(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string} payment_entry_point
    */
    set payment_entry_point(payment_entry_point) {
        const ptr0 = passStringToWasm0(payment_entry_point, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.paymentstrparams_set_payment_entry_point(this.__wbg_ptr, ptr0, len0);
    }
}

const PeerEntryFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_peerentry_free(ptr >>> 0));
/**
*/
export class PeerEntry {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        PeerEntryFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_peerentry_free(ptr);
    }
    /**
    * @returns {string}
    */
    get node_id() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.peerentry_node_id(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
    * @returns {string}
    */
    get address() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.peerentry_address(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
}

const PublicKeyFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_publickey_free(ptr >>> 0));
/**
*/
export class PublicKey {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(PublicKey.prototype);
        obj.__wbg_ptr = ptr;
        PublicKeyFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        PublicKeyFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_publickey_free(ptr);
    }
    /**
    * @param {string} public_key_hex_str
    */
    constructor(public_key_hex_str) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passStringToWasm0(public_key_hex_str, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.publickey_new_js_alias(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            this.__wbg_ptr = r0 >>> 0;
            return this;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} bytes
    * @returns {PublicKey}
    */
    static fromUint8Array(bytes) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(bytes, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.publickey_fromUint8Array(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return PublicKey.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {AccountHash}
    */
    toAccountHash() {
        const ret = wasm.publickey_toAccountHash(this.__wbg_ptr);
        return AccountHash.__wrap(ret);
    }
    /**
    * @returns {URef}
    */
    toPurseUref() {
        const ret = wasm.publickey_toPurseUref(this.__wbg_ptr);
        return URef.__wrap(ret);
    }
    /**
    * @returns {any}
    */
    toJson() {
        const ret = wasm.publickey_toJson(this.__wbg_ptr);
        return takeObject(ret);
    }
}

const PublicKeyStringFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_publickeystring_free(ptr >>> 0));
/**
*/
export class PublicKeyString {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(PublicKeyString.prototype);
        obj.__wbg_ptr = ptr;
        PublicKeyStringFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        PublicKeyStringFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_publickeystring_free(ptr);
    }
    /**
    * @returns {string}
    */
    get PublicKey() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_deploystring_Deploy(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
    * @param {string} arg0
    */
    set PublicKey(arg0) {
        const ptr0 = passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_deploystring_Deploy(this.__wbg_ptr, ptr0, len0);
    }
}

const PurseIdentifierFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_purseidentifier_free(ptr >>> 0));
/**
*/
export class PurseIdentifier {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(PurseIdentifier.prototype);
        obj.__wbg_ptr = ptr;
        PurseIdentifierFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        PurseIdentifierFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_purseidentifier_free(ptr);
    }
    /**
    * @param {PublicKey} key
    */
    constructor(key) {
        _assertClass(key, PublicKey);
        var ptr0 = key.__destroy_into_raw();
        const ret = wasm.purseidentifier_fromPublicKey(ptr0);
        this.__wbg_ptr = ret >>> 0;
        return this;
    }
    /**
    * @param {AccountHash} account_hash
    * @returns {PurseIdentifier}
    */
    static fromAccountHash(account_hash) {
        _assertClass(account_hash, AccountHash);
        var ptr0 = account_hash.__destroy_into_raw();
        const ret = wasm.purseidentifier_fromAccountHash(ptr0);
        return PurseIdentifier.__wrap(ret);
    }
    /**
    * @param {URef} uref
    * @returns {PurseIdentifier}
    */
    static fromURef(uref) {
        _assertClass(uref, URef);
        var ptr0 = uref.__destroy_into_raw();
        const ret = wasm.purseidentifier_fromURef(ptr0);
        return PurseIdentifier.__wrap(ret);
    }
    /**
    * @returns {any}
    */
    toJson() {
        const ret = wasm.purseidentifier_toJson(this.__wbg_ptr);
        return takeObject(ret);
    }
}

const PutDeployResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_putdeployresult_free(ptr >>> 0));
/**
*/
export class PutDeployResult {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(PutDeployResult.prototype);
        obj.__wbg_ptr = ptr;
        PutDeployResultFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        PutDeployResultFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_putdeployresult_free(ptr);
    }
    /**
    * Gets the API version as a JavaScript value.
    * @returns {any}
    */
    get api_version() {
        const ret = wasm.putdeployresult_api_version(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * Gets the deploy hash associated with this result.
    * @returns {DeployHash}
    */
    get deploy_hash() {
        const ret = wasm.putdeployresult_deploy_hash(this.__wbg_ptr);
        return DeployHash.__wrap(ret);
    }
    /**
    * Converts PutDeployResult to a JavaScript object.
    * @returns {any}
    */
    toJson() {
        const ret = wasm.putdeployresult_toJson(this.__wbg_ptr);
        return takeObject(ret);
    }
}

const PutTransactionResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_puttransactionresult_free(ptr >>> 0));
/**
*/
export class PutTransactionResult {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(PutTransactionResult.prototype);
        obj.__wbg_ptr = ptr;
        PutTransactionResultFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        PutTransactionResultFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_puttransactionresult_free(ptr);
    }
    /**
    * Gets the API version as a JavaScript value.
    * @returns {any}
    */
    get api_version() {
        const ret = wasm.puttransactionresult_api_version(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * Converts PutTransactionResult to a JavaScript object.
    * @returns {any}
    */
    toJson() {
        const ret = wasm.puttransactionresult_toJson(this.__wbg_ptr);
        return takeObject(ret);
    }
}

const QueryBalanceDetailsResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_querybalancedetailsresult_free(ptr >>> 0));
/**
*/
export class QueryBalanceDetailsResult {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(QueryBalanceDetailsResult.prototype);
        obj.__wbg_ptr = ptr;
        QueryBalanceDetailsResultFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        QueryBalanceDetailsResultFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_querybalancedetailsresult_free(ptr);
    }
    /**
    * Gets the API version as a JsValue.
    * @returns {any}
    */
    get api_version() {
        const ret = wasm.querybalancedetailsresult_api_version(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * @returns {any}
    */
    get total_balance() {
        const ret = wasm.querybalancedetailsresult_total_balance(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * @returns {any}
    */
    get available_balance() {
        const ret = wasm.querybalancedetailsresult_available_balance(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * @returns {any}
    */
    get total_balance_proof() {
        const ret = wasm.querybalancedetailsresult_total_balance_proof(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * @returns {any}
    */
    get holds() {
        const ret = wasm.querybalancedetailsresult_holds(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * Converts the QueryBalanceDetailsResult to a JsValue.
    * @returns {any}
    */
    toJson() {
        const ret = wasm.querybalancedetailsresult_toJson(this.__wbg_ptr);
        return takeObject(ret);
    }
}

const QueryBalanceResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_querybalanceresult_free(ptr >>> 0));
/**
*/
export class QueryBalanceResult {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(QueryBalanceResult.prototype);
        obj.__wbg_ptr = ptr;
        QueryBalanceResultFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        QueryBalanceResultFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_querybalanceresult_free(ptr);
    }
    /**
    * Gets the API version as a JsValue.
    * @returns {any}
    */
    get api_version() {
        const ret = wasm.querybalanceresult_api_version(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * Gets the balance as a JsValue.
    * @returns {any}
    */
    get balance() {
        const ret = wasm.querybalanceresult_balance(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * Converts the QueryBalanceResult to a JsValue.
    * @returns {any}
    */
    toJson() {
        const ret = wasm.querybalanceresult_toJson(this.__wbg_ptr);
        return takeObject(ret);
    }
}

const QueryGlobalStateResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_queryglobalstateresult_free(ptr >>> 0));
/**
*/
export class QueryGlobalStateResult {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(QueryGlobalStateResult.prototype);
        obj.__wbg_ptr = ptr;
        QueryGlobalStateResultFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        QueryGlobalStateResultFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_queryglobalstateresult_free(ptr);
    }
    /**
    * Gets the API version as a JsValue.
    * @returns {any}
    */
    get api_version() {
        const ret = wasm.queryglobalstateresult_api_version(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * Gets the block header as a JsValue.
    * @returns {any}
    */
    get block_header() {
        const ret = wasm.queryglobalstateresult_block_header(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * Gets the stored value as a JsValue.
    * @returns {any}
    */
    get stored_value() {
        const ret = wasm.queryglobalstateresult_stored_value(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * Gets the Merkle proof as a string.
    * @returns {string}
    */
    get merkle_proof() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.queryglobalstateresult_merkle_proof(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
    * Converts the QueryGlobalStateResult to a JsValue.
    * @returns {any}
    */
    toJson() {
        const ret = wasm.queryglobalstateresult_toJson(this.__wbg_ptr);
        return takeObject(ret);
    }
}

const SDKFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_sdk_free(ptr >>> 0));
/**
*/
export class SDK {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        SDKFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_sdk_free(ptr);
    }
    /**
    * JavaScript function for deploying with deserialized parameters.
    *
    * # Arguments
    *
    * * `deploy_params` - Deploy parameters.
    * * `session_params` - Session parameters.
    * * `payment_params` - Payment parameters.
    * * `verbosity` - An optional verbosity level.
    * * `node_address` - An optional node address.
    *
    * # Returns
    *
    * A result containing PutDeployResult or a JsError.
    * @param {DeployStrParams} deploy_params
    * @param {SessionStrParams} session_params
    * @param {PaymentStrParams} payment_params
    * @param {Verbosity | undefined} [verbosity]
    * @param {string | undefined} [node_address]
    * @returns {Promise<PutDeployResult>}
    */
    deploy(deploy_params, session_params, payment_params, verbosity, node_address) {
        _assertClass(deploy_params, DeployStrParams);
        var ptr0 = deploy_params.__destroy_into_raw();
        _assertClass(session_params, SessionStrParams);
        var ptr1 = session_params.__destroy_into_raw();
        _assertClass(payment_params, PaymentStrParams);
        var ptr2 = payment_params.__destroy_into_raw();
        var ptr3 = isLikeNone(node_address) ? 0 : passStringToWasm0(node_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len3 = WASM_VECTOR_LEN;
        const ret = wasm.sdk_deploy(this.__wbg_ptr, ptr0, ptr1, ptr2, isLikeNone(verbosity) ? 3 : verbosity, ptr3, len3);
        return takeObject(ret);
    }
    /**
    * Asynchronously retrieves the chainspec.
    *
    * # Arguments
    *
    * * `verbosity` - An optional `Verbosity` parameter.
    * * `node_address` - An optional node address as a string.
    *
    * # Returns
    *
    * A `Result` containing either a `GetChainspecResult` or a `JsError` in case of an error.
    * @param {Verbosity | undefined} [verbosity]
    * @param {string | undefined} [node_address]
    * @returns {Promise<GetChainspecResult>}
    */
    get_chainspec(verbosity, node_address) {
        var ptr0 = isLikeNone(node_address) ? 0 : passStringToWasm0(node_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        const ret = wasm.sdk_get_chainspec(this.__wbg_ptr, isLikeNone(verbosity) ? 3 : verbosity, ptr0, len0);
        return takeObject(ret);
    }
    /**
    * @param {Verbosity | undefined} [verbosity]
    * @param {string | undefined} [node_address]
    * @returns {Promise<GetChainspecResult>}
    */
    info_get_chainspec(verbosity, node_address) {
        var ptr0 = isLikeNone(node_address) ? 0 : passStringToWasm0(node_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        const ret = wasm.sdk_info_get_chainspec(this.__wbg_ptr, isLikeNone(verbosity) ? 3 : verbosity, ptr0, len0);
        return takeObject(ret);
    }
    /**
    * JS function for `make_deploy`.
    *
    * # Arguments
    *
    * * `deploy_params` - The deploy parameters.
    * * `session_params` - The session parameters.
    * * `payment_params` - The payment parameters.
    *
    * # Returns
    *
    * A `Result` containing the created `Deploy` or a `JsError` in case of an error.
    * @param {DeployStrParams} deploy_params
    * @param {SessionStrParams} session_params
    * @param {PaymentStrParams} payment_params
    * @returns {Deploy}
    */
    make_deploy(deploy_params, session_params, payment_params) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(deploy_params, DeployStrParams);
            var ptr0 = deploy_params.__destroy_into_raw();
            _assertClass(session_params, SessionStrParams);
            var ptr1 = session_params.__destroy_into_raw();
            _assertClass(payment_params, PaymentStrParams);
            var ptr2 = payment_params.__destroy_into_raw();
            wasm.sdk_make_deploy(retptr, this.__wbg_ptr, ptr0, ptr1, ptr2);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return Deploy.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * JS function for `make_transfer`.
    *
    * # Arguments
    *
    * * `amount` - The transfer amount.
    * * `target_account` - The target account.
    * * `transfer_id` - Optional transfer identifier.
    * * `deploy_params` - The deploy parameters.
    * * `payment_params` - The payment parameters.
    *
    * # Returns
    *
    * A `Result` containing the created `Deploy` or a `JsError` in case of an error.
    * @param {string} amount
    * @param {string} target_account
    * @param {string | undefined} transfer_id
    * @param {DeployStrParams} deploy_params
    * @param {PaymentStrParams} payment_params
    * @returns {Deploy}
    */
    make_transfer(amount, target_account, transfer_id, deploy_params, payment_params) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passStringToWasm0(amount, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            const ptr1 = passStringToWasm0(target_account, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            var ptr2 = isLikeNone(transfer_id) ? 0 : passStringToWasm0(transfer_id, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            var len2 = WASM_VECTOR_LEN;
            _assertClass(deploy_params, DeployStrParams);
            var ptr3 = deploy_params.__destroy_into_raw();
            _assertClass(payment_params, PaymentStrParams);
            var ptr4 = payment_params.__destroy_into_raw();
            wasm.sdk_make_transfer(retptr, this.__wbg_ptr, ptr0, len0, ptr1, len1, ptr2, len2, ptr3, ptr4);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return Deploy.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * JS function for `make_transaction`.
    *
    * # Arguments
    *
    * * `builder_params` - Transaction Builder parameters.
    * * `transaction_params` - The transaction parameters.
    *
    * # Returns
    *
    * A `Result` containing the created `Transaction` or a `JsError` in case of an error.
    * @param {TransactionBuilderParams} builder_params
    * @param {TransactionStrParams} transaction_params
    * @returns {Transaction}
    */
    make_transaction(builder_params, transaction_params) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(builder_params, TransactionBuilderParams);
            var ptr0 = builder_params.__destroy_into_raw();
            _assertClass(transaction_params, TransactionStrParams);
            var ptr1 = transaction_params.__destroy_into_raw();
            wasm.sdk_make_transaction(retptr, this.__wbg_ptr, ptr0, ptr1);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return Transaction.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * JS function for `make_transfer_transaction`.
    *
    * # Arguments
    *
    * * `maybe_source` - Optional transfer source uref.
    * * `amount` - The transfer amount.
    * * `target` - The target account.
    * * `transaction_params` - The transaction parameters.
    * * `maybe_id` - Optional transfer identifier.
    *
    * # Returns
    *
    * A `Result` containing the created `Transaction` or a `JsError` in case of an error.
    * @param {URef | undefined} maybe_source
    * @param {string} target
    * @param {string} amount
    * @param {TransactionStrParams} transaction_params
    * @param {string | undefined} [maybe_id]
    * @returns {Transaction}
    */
    make_transfer_transaction(maybe_source, target, amount, transaction_params, maybe_id) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            let ptr0 = 0;
            if (!isLikeNone(maybe_source)) {
                _assertClass(maybe_source, URef);
                ptr0 = maybe_source.__destroy_into_raw();
            }
            const ptr1 = passStringToWasm0(target, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            const ptr2 = passStringToWasm0(amount, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len2 = WASM_VECTOR_LEN;
            _assertClass(transaction_params, TransactionStrParams);
            var ptr3 = transaction_params.__destroy_into_raw();
            var ptr4 = isLikeNone(maybe_id) ? 0 : passStringToWasm0(maybe_id, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            var len4 = WASM_VECTOR_LEN;
            wasm.sdk_make_transfer_transaction(retptr, this.__wbg_ptr, ptr0, ptr1, len1, ptr2, len2, ptr3, ptr4, len4);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return Transaction.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * Parses auction info options from a JsValue.
    *
    * # Arguments
    *
    * * `options` - A JsValue containing auction info options to be parsed.
    *
    * # Returns
    *
    * Parsed auction info options as a `GetAuctionInfoOptions` struct.
    * @param {any} options
    * @returns {getAuctionInfoOptions}
    */
    get_auction_info_options(options) {
        const ret = wasm.sdk_get_auction_info_options(this.__wbg_ptr, addHeapObject(options));
        return getAuctionInfoOptions.__wrap(ret);
    }
    /**
    * Retrieves auction information using the provided options.
    *
    * # Arguments
    *
    * * `options` - An optional `GetAuctionInfoOptions` struct containing retrieval options.
    *
    * # Returns
    *
    * A `Result` containing either a `GetAuctionInfoResult` or a `JsError` in case of an error.
    *
    * # Errors
    *
    * Returns a `JsError` if there is an error during the retrieval process.
    * @param {getAuctionInfoOptions | undefined} [options]
    * @returns {Promise<GetAuctionInfoResult>}
    */
    get_auction_info(options) {
        let ptr0 = 0;
        if (!isLikeNone(options)) {
            _assertClass(options, getAuctionInfoOptions);
            ptr0 = options.__destroy_into_raw();
        }
        const ret = wasm.sdk_get_auction_info(this.__wbg_ptr, ptr0);
        return takeObject(ret);
    }
    /**
    * @param {getAuctionInfoOptions | undefined} [options]
    * @returns {Promise<GetAuctionInfoResult>}
    */
    state_get_auction_info_js_alias(options) {
        let ptr0 = 0;
        if (!isLikeNone(options)) {
            _assertClass(options, getAuctionInfoOptions);
            ptr0 = options.__destroy_into_raw();
        }
        const ret = wasm.sdk_state_get_auction_info_js_alias(this.__wbg_ptr, ptr0);
        return takeObject(ret);
    }
    /**
    * Parses dictionary item options from a JsValue.
    *
    * # Arguments
    *
    * * `options` - A JsValue containing dictionary item options to be parsed.
    *
    * # Returns
    *
    * Parsed dictionary item options as a `GetDictionaryItemOptions` struct.
    * @param {any} options
    * @returns {getDictionaryItemOptions}
    */
    get_dictionary_item_options(options) {
        const ret = wasm.sdk_get_dictionary_item_options(this.__wbg_ptr, addHeapObject(options));
        return getDictionaryItemOptions.__wrap(ret);
    }
    /**
    * Retrieves dictionary item information using the provided options.
    *
    * # Arguments
    *
    * * `options` - An optional `GetDictionaryItemOptions` struct containing retrieval options.
    *
    * # Returns
    *
    * A `Result` containing either a `GetDictionaryItemResult` or a `JsError` in case of an error.
    *
    * # Errors
    *
    * Returns a `JsError` if there is an error during the retrieval process.
    * @param {getDictionaryItemOptions | undefined} [options]
    * @returns {Promise<GetDictionaryItemResult>}
    */
    get_dictionary_item(options) {
        let ptr0 = 0;
        if (!isLikeNone(options)) {
            _assertClass(options, getDictionaryItemOptions);
            ptr0 = options.__destroy_into_raw();
        }
        const ret = wasm.sdk_get_dictionary_item(this.__wbg_ptr, ptr0);
        return takeObject(ret);
    }
    /**
    * JavaScript Alias for `get_dictionary_item`
    * @param {getDictionaryItemOptions | undefined} [options]
    * @returns {Promise<GetDictionaryItemResult>}
    */
    state_get_dictionary_item(options) {
        let ptr0 = 0;
        if (!isLikeNone(options)) {
            _assertClass(options, getDictionaryItemOptions);
            ptr0 = options.__destroy_into_raw();
        }
        const ret = wasm.sdk_state_get_dictionary_item(this.__wbg_ptr, ptr0);
        return takeObject(ret);
    }
    /**
    * Retrieves node status information using the provided options.
    *
    * # Arguments
    *
    * * `verbosity` - An optional `Verbosity` level for controlling the output verbosity.
    * * `node_address` - An optional string specifying the node address to use for the request.
    *
    * # Returns
    *
    * A `Result` containing either a `GetNodeStatusResult` or a `JsError` in case of an error.
    *
    * # Errors
    *
    * Returns a `JsError` if there is an error during the retrieval process.
    * @param {Verbosity | undefined} [verbosity]
    * @param {string | undefined} [node_address]
    * @returns {Promise<GetNodeStatusResult>}
    */
    get_node_status(verbosity, node_address) {
        var ptr0 = isLikeNone(node_address) ? 0 : passStringToWasm0(node_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        const ret = wasm.sdk_get_node_status(this.__wbg_ptr, isLikeNone(verbosity) ? 3 : verbosity, ptr0, len0);
        return takeObject(ret);
    }
    /**
    * @param {Verbosity | undefined} [verbosity]
    * @param {string | undefined} [node_address]
    * @returns {Promise<GetNodeStatusResult>}
    */
    info_get_status(verbosity, node_address) {
        var ptr0 = isLikeNone(node_address) ? 0 : passStringToWasm0(node_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        const ret = wasm.sdk_info_get_status(this.__wbg_ptr, isLikeNone(verbosity) ? 3 : verbosity, ptr0, len0);
        return takeObject(ret);
    }
    /**
    * Retrieves validator changes using the provided options.
    *
    * # Arguments
    *
    * * `verbosity` - An optional `Verbosity` level for controlling the output verbosity.
    * * `node_address` - An optional string specifying the node address to use for the request.
    *
    * # Returns
    *
    * A `Result` containing either a `GetValidatorChangesResult` or a `JsError` in case of an error.
    *
    * # Errors
    *
    * Returns a `JsError` if there is an error during the retrieval process.
    * @param {Verbosity | undefined} [verbosity]
    * @param {string | undefined} [node_address]
    * @returns {Promise<GetValidatorChangesResult>}
    */
    get_validator_changes(verbosity, node_address) {
        var ptr0 = isLikeNone(node_address) ? 0 : passStringToWasm0(node_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        const ret = wasm.sdk_get_validator_changes(this.__wbg_ptr, isLikeNone(verbosity) ? 3 : verbosity, ptr0, len0);
        return takeObject(ret);
    }
    /**
    * @param {Verbosity | undefined} [verbosity]
    * @param {string | undefined} [node_address]
    * @returns {Promise<GetValidatorChangesResult>}
    */
    info_get_validator_change(verbosity, node_address) {
        var ptr0 = isLikeNone(node_address) ? 0 : passStringToWasm0(node_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        const ret = wasm.sdk_info_get_validator_change(this.__wbg_ptr, isLikeNone(verbosity) ? 3 : verbosity, ptr0, len0);
        return takeObject(ret);
    }
    /**
    * Lists available RPCs using the provided options.
    *
    * # Arguments
    *
    * * `verbosity` - An optional `Verbosity` level for controlling the output verbosity.
    * * `node_address` - An optional string specifying the node address to use for the request.
    *
    * # Returns
    *
    * A `Result` containing either a `ListRpcsResult` or a `JsError` in case of an error.
    *
    * # Errors
    *
    * Returns a `JsError` if there is an error during the listing process.
    * @param {Verbosity | undefined} [verbosity]
    * @param {string | undefined} [node_address]
    * @returns {Promise<ListRpcsResult>}
    */
    list_rpcs(verbosity, node_address) {
        var ptr0 = isLikeNone(node_address) ? 0 : passStringToWasm0(node_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        const ret = wasm.sdk_list_rpcs(this.__wbg_ptr, isLikeNone(verbosity) ? 3 : verbosity, ptr0, len0);
        return takeObject(ret);
    }
    /**
    * Parses query balance options from a JsValue.
    *
    * # Arguments
    *
    * * `options` - A JsValue containing query balance options to be parsed.
    *
    * # Returns
    *
    * Parsed query balance options as a `QueryBalanceOptions` struct.
    * @param {any} options
    * @returns {queryBalanceOptions}
    */
    query_balance_options(options) {
        const ret = wasm.sdk_query_balance_options(this.__wbg_ptr, addHeapObject(options));
        return queryBalanceOptions.__wrap(ret);
    }
    /**
    * Retrieves balance information using the provided options.
    *
    * # Arguments
    *
    * * `options` - An optional `QueryBalanceOptions` struct containing retrieval options.
    *
    * # Returns
    *
    * A `Result` containing either a `QueryBalanceResult` or a `JsError` in case of an error.
    *
    * # Errors
    *
    * Returns a `JsError` if there is an error during the retrieval process.
    * @param {queryBalanceOptions | undefined} [options]
    * @returns {Promise<QueryBalanceResult>}
    */
    query_balance(options) {
        let ptr0 = 0;
        if (!isLikeNone(options)) {
            _assertClass(options, queryBalanceOptions);
            ptr0 = options.__destroy_into_raw();
        }
        const ret = wasm.sdk_query_balance(this.__wbg_ptr, ptr0);
        return takeObject(ret);
    }
    /**
    * Deserialize query_contract_dict_options from a JavaScript object.
    * @param {any} options
    * @returns {queryContractDictOptions}
    */
    query_contract_dict_options(options) {
        const ret = wasm.sdk_query_contract_dict_options(this.__wbg_ptr, addHeapObject(options));
        return queryContractDictOptions.__wrap(ret);
    }
    /**
    * JavaScript function for query_contract_dict with deserialized options.
    * @param {queryContractDictOptions | undefined} [options]
    * @returns {Promise<GetDictionaryItemResult>}
    */
    query_contract_dict(options) {
        let ptr0 = 0;
        if (!isLikeNone(options)) {
            _assertClass(options, queryContractDictOptions);
            ptr0 = options.__destroy_into_raw();
        }
        const ret = wasm.sdk_query_contract_dict(this.__wbg_ptr, ptr0);
        return takeObject(ret);
    }
    /**
    * Deserialize query_contract_key_options from a JavaScript object.
    * @param {any} options
    * @returns {queryContractKeyOptions}
    */
    query_contract_key_options(options) {
        const ret = wasm.sdk_query_contract_key_options(this.__wbg_ptr, addHeapObject(options));
        return queryContractKeyOptions.__wrap(ret);
    }
    /**
    * JavaScript function for query_contract_key with deserialized options.
    * @param {queryContractKeyOptions | undefined} [options]
    * @returns {Promise<QueryGlobalStateResult>}
    */
    query_contract_key(options) {
        let ptr0 = 0;
        if (!isLikeNone(options)) {
            _assertClass(options, queryContractKeyOptions);
            ptr0 = options.__destroy_into_raw();
        }
        const ret = wasm.sdk_query_contract_key(this.__wbg_ptr, ptr0);
        return takeObject(ret);
    }
    /**
    * Parses era summary options from a JsValue.
    *
    * # Arguments
    *
    * * `options` - A JsValue containing era summary options to be parsed.
    *
    * # Returns
    *
    * Parsed era summary options as a `GetEraSummaryOptions` struct.
    * @param {any} options
    * @returns {getEraSummaryOptions}
    */
    get_era_summary_options(options) {
        const ret = wasm.sdk_get_era_summary_options(this.__wbg_ptr, addHeapObject(options));
        return getEraSummaryOptions.__wrap(ret);
    }
    /**
    * Retrieves era summary information using the provided options.
    *
    * # Arguments
    *
    * * `options` - An optional `GetEraSummaryOptions` struct containing retrieval options.
    *
    * # Returns
    *
    * A `Result` containing either a `GetEraSummaryResult` or a `JsError` in case of an error.
    *
    * # Errors
    *
    * Returns a `JsError` if there is an error during the retrieval process.
    * @param {getEraSummaryOptions | undefined} [options]
    * @returns {Promise<GetEraSummaryResult>}
    */
    get_era_summary(options) {
        let ptr0 = 0;
        if (!isLikeNone(options)) {
            _assertClass(options, getEraSummaryOptions);
            ptr0 = options.__destroy_into_raw();
        }
        const ret = wasm.sdk_get_era_summary(this.__wbg_ptr, ptr0);
        return takeObject(ret);
    }
    /**
    * @param {getEraSummaryOptions | undefined} [options]
    * @returns {Promise<GetEraSummaryResult>}
    */
    chain_get_era_summary(options) {
        let ptr0 = 0;
        if (!isLikeNone(options)) {
            _assertClass(options, getEraSummaryOptions);
            ptr0 = options.__destroy_into_raw();
        }
        const ret = wasm.sdk_chain_get_era_summary(this.__wbg_ptr, ptr0);
        return takeObject(ret);
    }
    /**
    * @param {any} options
    * @returns {getAccountOptions}
    */
    get_account_options(options) {
        const ret = wasm.sdk_get_account_options(this.__wbg_ptr, addHeapObject(options));
        return getAccountOptions.__wrap(ret);
    }
    /**
    * Retrieves account information using the provided options.
    *
    * This function is an asynchronous JavaScript binding for the Rust `get_account` method.
    *
    * # Arguments
    *
    * * `options` - An optional `GetAccountOptions` struct containing retrieval options, such as:
    *   - `account_identifier`: Identifier for the account.
    *   - `account_identifier_as_string`: String representation of the account identifier.
    *   - `maybe_block_id_as_string`: Optional string representation of the block ID.
    *   - `maybe_block_identifier`: Optional `BlockIdentifierInput` for specifying the block.
    *   - `verbosity`: Verbosity level for the output.
    *   - `node_address`: Address of the node to query.
    *
    * # Returns
    *
    * A `Result` containing either a `GetAccountResult` on success or a `JsError` on failure.
    *
    * # Errors
    *
    * Returns a `JsError` if there is an error during the retrieval process, such as issues with the provided options or network errors.
    * ```
    * @param {getAccountOptions | undefined} [options]
    * @returns {Promise<GetAccountResult>}
    */
    get_account(options) {
        let ptr0 = 0;
        if (!isLikeNone(options)) {
            _assertClass(options, getAccountOptions);
            ptr0 = options.__destroy_into_raw();
        }
        const ret = wasm.sdk_get_account(this.__wbg_ptr, ptr0);
        return takeObject(ret);
    }
    /**
    * @param {getAccountOptions | undefined} [options]
    * @returns {Promise<GetAccountResult>}
    */
    state_get_account_info(options) {
        let ptr0 = 0;
        if (!isLikeNone(options)) {
            _assertClass(options, getAccountOptions);
            ptr0 = options.__destroy_into_raw();
        }
        const ret = wasm.sdk_state_get_account_info(this.__wbg_ptr, ptr0);
        return takeObject(ret);
    }
    /**
    * Parses balance options from a JsValue.
    *
    * # Arguments
    *
    * * `options` - A JsValue containing balance options to be parsed.
    *
    * # Returns
    *
    * Parsed balance options as a `GetBalanceOptions` struct.
    * @param {any} options
    * @returns {getBalanceOptions}
    */
    get_balance_options(options) {
        const ret = wasm.sdk_get_balance_options(this.__wbg_ptr, addHeapObject(options));
        return getBalanceOptions.__wrap(ret);
    }
    /**
    * Retrieves balance information using the provided options.
    *
    * # Arguments
    *
    * * `options` - An optional `GetBalanceOptions` struct containing retrieval options.
    *
    * # Returns
    *
    * A `Result` containing either a `GetBalanceResult` or a `JsError` in case of an error.
    *
    * # Errors
    *
    * Returns a `JsError` if there is an error during the retrieval process.
    * @param {getBalanceOptions | undefined} [options]
    * @returns {Promise<GetBalanceResult>}
    */
    get_balance(options) {
        let ptr0 = 0;
        if (!isLikeNone(options)) {
            _assertClass(options, getBalanceOptions);
            ptr0 = options.__destroy_into_raw();
        }
        const ret = wasm.sdk_get_balance(this.__wbg_ptr, ptr0);
        return takeObject(ret);
    }
    /**
    * JavaScript Alias for `get_balance`.
    *
    * # Arguments
    *
    * * `options` - An optional `GetBalanceOptions` struct containing retrieval options.
    *
    * # Returns
    *
    * A `Result` containing either a `GetBalanceResult` or a `JsError` in case of an error.
    * @param {getBalanceOptions | undefined} [options]
    * @returns {Promise<GetBalanceResult>}
    */
    state_get_balance(options) {
        let ptr0 = 0;
        if (!isLikeNone(options)) {
            _assertClass(options, getBalanceOptions);
            ptr0 = options.__destroy_into_raw();
        }
        const ret = wasm.sdk_state_get_balance(this.__wbg_ptr, ptr0);
        return takeObject(ret);
    }
    /**
    * @param {any} options
    * @returns {getEntityOptions}
    */
    get_entity_options(options) {
        const ret = wasm.sdk_get_entity_options(this.__wbg_ptr, addHeapObject(options));
        return getEntityOptions.__wrap(ret);
    }
    /**
    * Retrieves entity information using the provided options.
    *
    * This function is an asynchronous JavaScript binding for the Rust `get_entity` method.
    *
    * # Arguments
    *
    * * `options` - An optional `GetEntityOptions` struct containing retrieval options, such as:
    *   - `entity_identifier`: Identifier for the entity.
    *   - `entity_identifier_as_string`: String representation of the entity identifier.
    *   - `maybe_block_id_as_string`: Optional string representation of the block ID.
    *   - `maybe_block_identifier`: Optional `BlockIdentifierInput` for specifying the block.
    *   - `verbosity`: Verbosity level for the output.
    *   - `node_address`: Address of the node to query.
    *
    * # Returns
    *
    * A `Result` containing either a `GetAddressableEntityResult` on success or a `JsError` on failure.
    *
    * # Errors
    *
    * Returns a `JsError` if there is an error during the retrieval process, such as issues with the provided options or network errors.
    * ```
    * @param {getEntityOptions | undefined} [options]
    * @returns {Promise<GetAddressableEntityResult>}
    */
    get_entity(options) {
        let ptr0 = 0;
        if (!isLikeNone(options)) {
            _assertClass(options, getEntityOptions);
            ptr0 = options.__destroy_into_raw();
        }
        const ret = wasm.sdk_get_entity(this.__wbg_ptr, ptr0);
        return takeObject(ret);
    }
    /**
    * @param {getEntityOptions | undefined} [options]
    * @returns {Promise<GetAddressableEntityResult>}
    */
    state_get_entity(options) {
        let ptr0 = 0;
        if (!isLikeNone(options)) {
            _assertClass(options, getEntityOptions);
            ptr0 = options.__destroy_into_raw();
        }
        const ret = wasm.sdk_state_get_entity(this.__wbg_ptr, ptr0);
        return takeObject(ret);
    }
    /**
    * @param {any} options
    * @returns {getEraInfoOptions}
    */
    get_era_info_options(options) {
        const ret = wasm.sdk_get_era_info_options(this.__wbg_ptr, addHeapObject(options));
        return getEraInfoOptions.__wrap(ret);
    }
    /**
    * @param {getEraInfoOptions | undefined} [options]
    * @returns {Promise<GetEraInfoResult>}
    */
    get_era_info(options) {
        let ptr0 = 0;
        if (!isLikeNone(options)) {
            _assertClass(options, getEraInfoOptions);
            ptr0 = options.__destroy_into_raw();
        }
        const ret = wasm.sdk_get_era_info(this.__wbg_ptr, ptr0);
        return takeObject(ret);
    }
    /**
    * @param {getEraInfoOptions | undefined} [options]
    * @returns {Promise<GetEraInfoResult>}
    */
    chain_get_era_info_by_switch_block(options) {
        let ptr0 = 0;
        if (!isLikeNone(options)) {
            _assertClass(options, getEraInfoOptions);
            ptr0 = options.__destroy_into_raw();
        }
        const ret = wasm.sdk_chain_get_era_info_by_switch_block(this.__wbg_ptr, ptr0);
        return takeObject(ret);
    }
    /**
    * Parses query global state options from a JsValue.
    *
    * # Arguments
    *
    * * `options` - A JsValue containing query global state options to be parsed.
    *
    * # Returns
    *
    * Parsed query global state options as a `QueryGlobalStateOptions` struct.
    * @param {any} options
    * @returns {queryGlobalStateOptions}
    */
    query_global_state_options(options) {
        const ret = wasm.sdk_query_global_state_options(this.__wbg_ptr, addHeapObject(options));
        return queryGlobalStateOptions.__wrap(ret);
    }
    /**
    * Retrieves global state information using the provided options.
    *
    * # Arguments
    *
    * * `options` - An optional `QueryGlobalStateOptions` struct containing retrieval options.
    *
    * # Returns
    *
    * A `Result` containing either a `QueryGlobalStateResult` or a `JsError` in case of an error.
    *
    * # Errors
    *
    * Returns a `JsError` if there is an error during the retrieval process.
    * @param {queryGlobalStateOptions | undefined} [options]
    * @returns {Promise<QueryGlobalStateResult>}
    */
    query_global_state(options) {
        let ptr0 = 0;
        if (!isLikeNone(options)) {
            _assertClass(options, queryGlobalStateOptions);
            ptr0 = options.__destroy_into_raw();
        }
        const ret = wasm.sdk_query_global_state(this.__wbg_ptr, ptr0);
        return takeObject(ret);
    }
    /**
    * Get options for speculative execution from a JavaScript value.
    * @param {any} options
    * @returns {getSpeculativeExecDeployOptions}
    */
    speculative_exec_deploy_options(options) {
        const ret = wasm.sdk_speculative_exec_deploy_options(this.__wbg_ptr, addHeapObject(options));
        return getSpeculativeExecDeployOptions.__wrap(ret);
    }
    /**
    * JS function for speculative execution.
    *
    * # Arguments
    *
    * * `options` - The options for speculative execution.
    *
    * # Returns
    *
    * A `Result` containing the result of the speculative execution or a `JsError` in case of an error.
    * @param {getSpeculativeExecDeployOptions | undefined} [options]
    * @returns {Promise<SpeculativeExecResult>}
    */
    speculative_exec_deploy(options) {
        let ptr0 = 0;
        if (!isLikeNone(options)) {
            _assertClass(options, getSpeculativeExecDeployOptions);
            ptr0 = options.__destroy_into_raw();
        }
        const ret = wasm.sdk_speculative_exec_deploy(this.__wbg_ptr, ptr0);
        return takeObject(ret);
    }
    /**
    * JS function for `sign_transaction`.
    *
    * # Arguments
    *
    * * `transaction` - The transaction to sign.
    * * `secret_key` - The secret key for signing.
    *
    * # Returns
    *
    * The signed `Transaction`.
    * @param {Transaction} transaction
    * @param {string} secret_key
    * @returns {Transaction}
    */
    sign_transaction(transaction, secret_key) {
        _assertClass(transaction, Transaction);
        var ptr0 = transaction.__destroy_into_raw();
        const ptr1 = passStringToWasm0(secret_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ret = wasm.sdk_sign_transaction(this.__wbg_ptr, ptr0, ptr1, len1);
        return Transaction.__wrap(ret);
    }
    /**
    * Parses state root hash options from a JsValue.
    *
    * # Arguments
    *
    * * `options` - A JsValue containing state root hash options to be parsed.
    *
    * # Returns
    *
    * Parsed state root hash options as a `GetStateRootHashOptions` struct.
    * @param {any} options
    * @returns {getStateRootHashOptions}
    */
    get_state_root_hash_options(options) {
        const ret = wasm.sdk_get_state_root_hash_options(this.__wbg_ptr, addHeapObject(options));
        return getStateRootHashOptions.__wrap(ret);
    }
    /**
    * Retrieves state root hash information using the provided options.
    *
    * # Arguments
    *
    * * `options` - An optional `GetStateRootHashOptions` struct containing retrieval options.
    *
    * # Returns
    *
    * A `Result` containing either a `GetStateRootHashResult` or a `JsError` in case of an error.
    *
    * # Errors
    *
    * Returns a `JsError` if there is an error during the retrieval process.
    * @param {getStateRootHashOptions | undefined} [options]
    * @returns {Promise<GetStateRootHashResult>}
    */
    get_state_root_hash(options) {
        let ptr0 = 0;
        if (!isLikeNone(options)) {
            _assertClass(options, getStateRootHashOptions);
            ptr0 = options.__destroy_into_raw();
        }
        const ret = wasm.sdk_get_state_root_hash(this.__wbg_ptr, ptr0);
        return takeObject(ret);
    }
    /**
    * Retrieves state root hash information using the provided options (alias for `get_state_root_hash`).
    *
    * # Arguments
    *
    * * `options` - An optional `GetStateRootHashOptions` struct containing retrieval options.
    *
    * # Returns
    *
    * A `Result` containing either a `GetStateRootHashResult` or a `JsError` in case of an error.
    *
    * # Errors
    *
    * Returns a `JsError` if there is an error during the retrieval process.
    * @param {getStateRootHashOptions | undefined} [options]
    * @returns {Promise<GetStateRootHashResult>}
    */
    chain_get_state_root_hash(options) {
        let ptr0 = 0;
        if (!isLikeNone(options)) {
            _assertClass(options, getStateRootHashOptions);
            ptr0 = options.__destroy_into_raw();
        }
        const ret = wasm.sdk_chain_get_state_root_hash(this.__wbg_ptr, ptr0);
        return takeObject(ret);
    }
    /**
    * Parses query balance options from a JsValue.
    *
    * # Arguments
    *
    * * `options` - A JsValue containing query balance options to be parsed.
    *
    * # Returns
    *
    * Parsed query balance options as a `QueryBalanceDetailsOptions` struct.
    * @param {any} options
    * @returns {queryBalanceDetailsOptions}
    */
    query_balance_details_options(options) {
        const ret = wasm.sdk_query_balance_details_options(this.__wbg_ptr, addHeapObject(options));
        return queryBalanceDetailsOptions.__wrap(ret);
    }
    /**
    * Retrieves balance information using the provided options.
    *
    * # Arguments
    *
    * * `options` - An optional `QueryBalanceDetailsOptions` struct containing retrieval options.
    *
    * # Returns
    *
    * A `Result` containing either a `QueryBalanceDetailsResult` or a `JsError` in case of an error.
    *
    * # Errors
    *
    * Returns a `JsError` if there is an error during the retrieval process.
    * @param {queryBalanceDetailsOptions | undefined} [options]
    * @returns {Promise<QueryBalanceDetailsResult>}
    */
    query_balance_details(options) {
        let ptr0 = 0;
        if (!isLikeNone(options)) {
            _assertClass(options, queryBalanceDetailsOptions);
            ptr0 = options.__destroy_into_raw();
        }
        const ret = wasm.sdk_query_balance_details(this.__wbg_ptr, ptr0);
        return takeObject(ret);
    }
    /**
    * JavaScript function for transactioning with deserialized parameters.
    *
    * # Arguments
    *
    * * `transaction_params` - Transaction parameters.
    * * `builder_params` - Session parameters.
    * * `verbosity` - An optional verbosity level.
    * * `node_address` - An optional node address.
    *
    * # Returns
    *
    * A result containing PutTransactionResult or a JsError.
    * @param {TransactionBuilderParams} builder_params
    * @param {TransactionStrParams} transaction_params
    * @param {Verbosity | undefined} [verbosity]
    * @param {string | undefined} [node_address]
    * @returns {Promise<PutTransactionResult>}
    */
    transaction(builder_params, transaction_params, verbosity, node_address) {
        _assertClass(builder_params, TransactionBuilderParams);
        var ptr0 = builder_params.__destroy_into_raw();
        _assertClass(transaction_params, TransactionStrParams);
        var ptr1 = transaction_params.__destroy_into_raw();
        var ptr2 = isLikeNone(node_address) ? 0 : passStringToWasm0(node_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len2 = WASM_VECTOR_LEN;
        const ret = wasm.sdk_transaction(this.__wbg_ptr, ptr0, ptr1, isLikeNone(verbosity) ? 3 : verbosity, ptr2, len2);
        return takeObject(ret);
    }
    /**
    * This function allows executing a deploy speculatively.
    *
    * # Arguments
    *
    * * `deploy_params` - Deployment parameters for the deploy.
    * * `session_params` - Session parameters for the deploy.
    * * `payment_params` - Payment parameters for the deploy.
    * * `maybe_block_id_as_string` - An optional block ID as a string.
    * * `maybe_block_identifier` - Optional block identifier.
    * * `verbosity` - Optional verbosity level.
    * * `node_address` - Optional node address.
    *
    * # Returns
    *
    * A `Result` containing either a `SpeculativeExecResult` or a `JsError` in case of an error.
    * @param {DeployStrParams} deploy_params
    * @param {SessionStrParams} session_params
    * @param {PaymentStrParams} payment_params
    * @param {string | undefined} [maybe_block_id_as_string]
    * @param {BlockIdentifier | undefined} [maybe_block_identifier]
    * @param {Verbosity | undefined} [verbosity]
    * @param {string | undefined} [node_address]
    * @returns {Promise<SpeculativeExecResult>}
    */
    speculative_deploy(deploy_params, session_params, payment_params, maybe_block_id_as_string, maybe_block_identifier, verbosity, node_address) {
        _assertClass(deploy_params, DeployStrParams);
        var ptr0 = deploy_params.__destroy_into_raw();
        _assertClass(session_params, SessionStrParams);
        var ptr1 = session_params.__destroy_into_raw();
        _assertClass(payment_params, PaymentStrParams);
        var ptr2 = payment_params.__destroy_into_raw();
        var ptr3 = isLikeNone(maybe_block_id_as_string) ? 0 : passStringToWasm0(maybe_block_id_as_string, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len3 = WASM_VECTOR_LEN;
        let ptr4 = 0;
        if (!isLikeNone(maybe_block_identifier)) {
            _assertClass(maybe_block_identifier, BlockIdentifier);
            ptr4 = maybe_block_identifier.__destroy_into_raw();
        }
        var ptr5 = isLikeNone(node_address) ? 0 : passStringToWasm0(node_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len5 = WASM_VECTOR_LEN;
        const ret = wasm.sdk_speculative_deploy(this.__wbg_ptr, ptr0, ptr1, ptr2, ptr3, len3, ptr4, isLikeNone(verbosity) ? 3 : verbosity, ptr5, len5);
        return takeObject(ret);
    }
    /**
    * Parses block options from a JsValue.
    *
    * # Arguments
    *
    * * `options` - A JsValue containing block options to be parsed.
    *
    * # Returns
    *
    * Parsed block options as a `GetBlockOptions` struct.
    * @param {any} options
    * @returns {getBlockOptions}
    */
    get_block_options(options) {
        const ret = wasm.sdk_get_block_options(this.__wbg_ptr, addHeapObject(options));
        return getBlockOptions.__wrap(ret);
    }
    /**
    * Retrieves block information using the provided options.
    *
    * # Arguments
    *
    * * `options` - An optional `GetBlockOptions` struct containing retrieval options.
    *
    * # Returns
    *
    * A `Result` containing either a `GetBlockResult` or a `JsError` in case of an error.
    *
    * # Errors
    *
    * Returns a `JsError` if there is an error during the retrieval process.
    * @param {getBlockOptions | undefined} [options]
    * @returns {Promise<GetBlockResult>}
    */
    get_block(options) {
        let ptr0 = 0;
        if (!isLikeNone(options)) {
            _assertClass(options, getBlockOptions);
            ptr0 = options.__destroy_into_raw();
        }
        const ret = wasm.sdk_get_block(this.__wbg_ptr, ptr0);
        return takeObject(ret);
    }
    /**
    * JavaScript Alias for the `get_block`.
    *
    * # Arguments
    *
    * * `options` - An optional `GetBlockOptions` struct containing retrieval options.
    *
    * # Returns
    *
    * A `Result` containing either a `GetBlockResult` or a `JsError` in case of an error.
    *
    * # Errors
    *
    * Returns a `JsError` if there is an error during the retrieval process.
    * @param {getBlockOptions | undefined} [options]
    * @returns {Promise<GetBlockResult>}
    */
    chain_get_block(options) {
        let ptr0 = 0;
        if (!isLikeNone(options)) {
            _assertClass(options, getBlockOptions);
            ptr0 = options.__destroy_into_raw();
        }
        const ret = wasm.sdk_chain_get_block(this.__wbg_ptr, ptr0);
        return takeObject(ret);
    }
    /**
    * Parses block transfers options from a JsValue.
    *
    * # Arguments
    *
    * * `options` - A JsValue containing block transfers options to be parsed.
    *
    * # Returns
    *
    * Parsed block transfers options as a `GetBlockTransfersOptions` struct.
    * @param {any} options
    * @returns {getBlockTransfersOptions}
    */
    get_block_transfers_options(options) {
        const ret = wasm.sdk_get_block_transfers_options(this.__wbg_ptr, addHeapObject(options));
        return getBlockTransfersOptions.__wrap(ret);
    }
    /**
    * Retrieves block transfers information using the provided options.
    *
    * # Arguments
    *
    * * `options` - An optional `GetBlockTransfersOptions` struct containing retrieval options.
    *
    * # Returns
    *
    * A `Result` containing either a `GetBlockTransfersResult` or a `JsError` in case of an error.
    *
    * # Errors
    *
    * Returns a `JsError` if there is an error during the retrieval process.
    * @param {getBlockTransfersOptions | undefined} [options]
    * @returns {Promise<GetBlockTransfersResult>}
    */
    get_block_transfers(options) {
        let ptr0 = 0;
        if (!isLikeNone(options)) {
            _assertClass(options, getBlockTransfersOptions);
            ptr0 = options.__destroy_into_raw();
        }
        const ret = wasm.sdk_get_block_transfers(this.__wbg_ptr, ptr0);
        return takeObject(ret);
    }
    /**
    * @param {getBlockTransfersOptions | undefined} [options]
    * @returns {Promise<GetBlockTransfersResult>}
    */
    chain_get_block_transfers(options) {
        let ptr0 = 0;
        if (!isLikeNone(options)) {
            _assertClass(options, getBlockTransfersOptions);
            ptr0 = options.__destroy_into_raw();
        }
        const ret = wasm.sdk_chain_get_block_transfers(this.__wbg_ptr, ptr0);
        return takeObject(ret);
    }
    /**
    * Parses deploy options from a JsValue.
    *
    * # Arguments
    *
    * * `options` - A JsValue containing deploy options to be parsed.
    *
    * # Returns
    *
    * Parsed deploy options as a `GetDeployOptions` struct.
    * @param {any} options
    * @returns {getDeployOptions}
    */
    get_deploy_options(options) {
        const ret = wasm.sdk_get_deploy_options(this.__wbg_ptr, addHeapObject(options));
        return getDeployOptions.__wrap(ret);
    }
    /**
    * Retrieves deploy information using the provided options.
    *
    * # Arguments
    *
    * * `options` - An optional `GetDeployOptions` struct containing retrieval options.
    *
    * # Returns
    *
    * A `Result` containing either a `GetDeployResult` or an error.
    * @param {getDeployOptions | undefined} [options]
    * @returns {Promise<GetDeployResult>}
    */
    get_deploy(options) {
        let ptr0 = 0;
        if (!isLikeNone(options)) {
            _assertClass(options, getDeployOptions);
            ptr0 = options.__destroy_into_raw();
        }
        const ret = wasm.sdk_get_deploy(this.__wbg_ptr, ptr0);
        return takeObject(ret);
    }
    /**
    * Retrieves deploy information using the provided options, alias for `get_deploy`.
    * @param {getDeployOptions | undefined} [options]
    * @returns {Promise<GetDeployResult>}
    */
    info_get_deploy(options) {
        let ptr0 = 0;
        if (!isLikeNone(options)) {
            _assertClass(options, getDeployOptions);
            ptr0 = options.__destroy_into_raw();
        }
        const ret = wasm.sdk_info_get_deploy(this.__wbg_ptr, ptr0);
        return takeObject(ret);
    }
    /**
    * Retrieves peers asynchronously.
    *
    * # Arguments
    *
    * * `verbosity` - Optional verbosity level.
    * * `node_address` - Optional node address.
    *
    * # Returns
    *
    * A `Result` containing `GetPeersResult` or a `JsError` if an error occurs.
    * @param {Verbosity | undefined} [verbosity]
    * @param {string | undefined} [node_address]
    * @returns {Promise<GetPeersResult>}
    */
    get_peers(verbosity, node_address) {
        var ptr0 = isLikeNone(node_address) ? 0 : passStringToWasm0(node_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        const ret = wasm.sdk_get_peers(this.__wbg_ptr, isLikeNone(verbosity) ? 3 : verbosity, ptr0, len0);
        return takeObject(ret);
    }
    /**
    * @param {Verbosity | undefined} [verbosity]
    * @param {string | undefined} [node_address]
    * @returns {Promise<GetPeersResult>}
    */
    info_get_peers(verbosity, node_address) {
        var ptr0 = isLikeNone(node_address) ? 0 : passStringToWasm0(node_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        const ret = wasm.sdk_info_get_peers(this.__wbg_ptr, isLikeNone(verbosity) ? 3 : verbosity, ptr0, len0);
        return takeObject(ret);
    }
    /**
    * Parses transaction options from a JsValue.
    *
    * # Arguments
    *
    * * `options` - A JsValue containing transaction options to be parsed.
    *
    * # Returns
    *
    * Parsed transaction options as a `GetTransactionOptions` struct.
    * @param {any} options
    * @returns {getTransactionOptions}
    */
    get_transaction_options(options) {
        const ret = wasm.sdk_get_transaction_options(this.__wbg_ptr, addHeapObject(options));
        return getTransactionOptions.__wrap(ret);
    }
    /**
    * Retrieves transaction information using the provided options.
    *
    * # Arguments
    *
    * * `options` - An optional `GetTransactionOptions` struct containing retrieval options.
    *
    * # Returns
    *
    * A `Result` containing either a `GetTransactionResult` or an error.
    * @param {getTransactionOptions | undefined} [options]
    * @returns {Promise<GetTransactionResult>}
    */
    get_transaction(options) {
        let ptr0 = 0;
        if (!isLikeNone(options)) {
            _assertClass(options, getTransactionOptions);
            ptr0 = options.__destroy_into_raw();
        }
        const ret = wasm.sdk_get_transaction(this.__wbg_ptr, ptr0);
        return takeObject(ret);
    }
    /**
    * Retrieves transaction information using the provided options, alias for `get_transaction`.
    * @param {getTransactionOptions | undefined} [options]
    * @returns {Promise<GetTransactionResult>}
    */
    info_get_transaction(options) {
        let ptr0 = 0;
        if (!isLikeNone(options)) {
            _assertClass(options, getTransactionOptions);
            ptr0 = options.__destroy_into_raw();
        }
        const ret = wasm.sdk_info_get_transaction(this.__wbg_ptr, ptr0);
        return takeObject(ret);
    }
    /**
    * Get options for speculative execution from a JavaScript value.
    * @param {any} options
    * @returns {getSpeculativeExecTxnOptions}
    */
    speculative_exec_transaction_options(options) {
        const ret = wasm.sdk_speculative_exec_transaction_options(this.__wbg_ptr, addHeapObject(options));
        return getSpeculativeExecTxnOptions.__wrap(ret);
    }
    /**
    * JS function for speculative execution.
    *
    * # Arguments
    *
    * * `options` - The options for speculative execution.
    *
    * # Returns
    *
    * A `Result` containing the result of the speculative execution or a `JsError` in case of an error.
    * @param {getSpeculativeExecTxnOptions | undefined} [options]
    * @returns {Promise<SpeculativeExecTxnResult>}
    */
    speculative_exec_transaction(options) {
        let ptr0 = 0;
        if (!isLikeNone(options)) {
            _assertClass(options, getSpeculativeExecTxnOptions);
            ptr0 = options.__destroy_into_raw();
        }
        const ret = wasm.sdk_speculative_exec_transaction(this.__wbg_ptr, ptr0);
        return takeObject(ret);
    }
    /**
    * JS function for `sign_deploy`.
    *
    * # Arguments
    *
    * * `deploy` - The deploy to sign.
    * * `secret_key` - The secret key for signing.
    *
    * # Returns
    *
    * The signed `Deploy`.
    * @param {Deploy} deploy
    * @param {string} secret_key
    * @returns {Deploy}
    */
    sign_deploy(deploy, secret_key) {
        _assertClass(deploy, Deploy);
        var ptr0 = deploy.__destroy_into_raw();
        const ptr1 = passStringToWasm0(secret_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ret = wasm.sdk_sign_deploy(this.__wbg_ptr, ptr0, ptr1, len1);
        return Deploy.__wrap(ret);
    }
    /**
    * Calls a smart contract entry point with the specified parameters and returns the result.
    *
    * # Arguments
    *
    * * `transaction_params` - Transaction parameters.
    * * `builder_params` - Transaction Builder parameters.
    * * `node_address` - An optional node address to send the request to.
    *
    * # Returns
    *
    * A `Result` containing either a `PutTransactionResult` or a `JsError` in case of an error.
    *
    * # Errors
    *
    * Returns a `JsError` if there is an error during the call.
    * @param {TransactionBuilderParams} builder_params
    * @param {TransactionStrParams} transaction_params
    * @param {string | undefined} [node_address]
    * @returns {Promise<PutTransactionResult>}
    */
    call_entrypoint(builder_params, transaction_params, node_address) {
        _assertClass(builder_params, TransactionBuilderParams);
        var ptr0 = builder_params.__destroy_into_raw();
        _assertClass(transaction_params, TransactionStrParams);
        var ptr1 = transaction_params.__destroy_into_raw();
        var ptr2 = isLikeNone(node_address) ? 0 : passStringToWasm0(node_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len2 = WASM_VECTOR_LEN;
        const ret = wasm.sdk_call_entrypoint(this.__wbg_ptr, ptr0, ptr1, ptr2, len2);
        return takeObject(ret);
    }
    /**
    * @param {string | undefined} [node_address]
    * @param {Verbosity | undefined} [verbosity]
    */
    constructor(node_address, verbosity) {
        var ptr0 = isLikeNone(node_address) ? 0 : passStringToWasm0(node_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        const ret = wasm.sdk_new(ptr0, len0, isLikeNone(verbosity) ? 3 : verbosity);
        this.__wbg_ptr = ret >>> 0;
        return this;
    }
    /**
    * @param {string | undefined} [node_address]
    * @returns {string}
    */
    getNodeAddress(node_address) {
        let deferred2_0;
        let deferred2_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            var ptr0 = isLikeNone(node_address) ? 0 : passStringToWasm0(node_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            var len0 = WASM_VECTOR_LEN;
            wasm.sdk_getNodeAddress(retptr, this.__wbg_ptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred2_0 = r0;
            deferred2_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
        }
    }
    /**
    * @param {string | undefined} [node_address]
    */
    setNodeAddress(node_address) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            var ptr0 = isLikeNone(node_address) ? 0 : passStringToWasm0(node_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            var len0 = WASM_VECTOR_LEN;
            wasm.sdk_setNodeAddress(retptr, this.__wbg_ptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            if (r1) {
                throw takeObject(r0);
            }
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Verbosity | undefined} [verbosity]
    * @returns {Verbosity}
    */
    getVerbosity(verbosity) {
        const ret = wasm.sdk_getVerbosity(this.__wbg_ptr, isLikeNone(verbosity) ? 3 : verbosity);
        return ret;
    }
    /**
    * @param {Verbosity | undefined} [verbosity]
    */
    setVerbosity(verbosity) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.sdk_setVerbosity(retptr, this.__wbg_ptr, isLikeNone(verbosity) ? 3 : verbosity);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            if (r1) {
                throw takeObject(r0);
            }
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * Puts a transaction using the provided options.
    *
    * # Arguments
    *
    * * `transaction` - The `Transaction` object to be sent.
    * * `verbosity` - An optional `Verbosity` level for controlling the output verbosity.
    * * `node_address` - An optional string specifying the node address to use for the request.
    *
    * # Returns
    *
    * A `Result` containing either a `PutTransactionResult` or a `JsError` in case of an error.
    *
    * # Errors
    *
    * Returns a `JsError` if there is an error during the transaction process.
    * @param {Transaction} transaction
    * @param {Verbosity | undefined} [verbosity]
    * @param {string | undefined} [node_address]
    * @returns {Promise<PutTransactionResult>}
    */
    put_transaction(transaction, verbosity, node_address) {
        _assertClass(transaction, Transaction);
        var ptr0 = transaction.__destroy_into_raw();
        var ptr1 = isLikeNone(node_address) ? 0 : passStringToWasm0(node_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        const ret = wasm.sdk_put_transaction(this.__wbg_ptr, ptr0, isLikeNone(verbosity) ? 3 : verbosity, ptr1, len1);
        return takeObject(ret);
    }
    /**
    * JavaScript Alias for `put_transaction`.
    * @param {Transaction} transaction
    * @param {Verbosity | undefined} [verbosity]
    * @param {string | undefined} [node_address]
    * @returns {Promise<PutTransactionResult>}
    */
    account_put_transaction(transaction, verbosity, node_address) {
        _assertClass(transaction, Transaction);
        var ptr0 = transaction.__destroy_into_raw();
        var ptr1 = isLikeNone(node_address) ? 0 : passStringToWasm0(node_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        const ret = wasm.sdk_account_put_transaction(this.__wbg_ptr, ptr0, isLikeNone(verbosity) ? 3 : verbosity, ptr1, len1);
        return takeObject(ret);
    }
    /**
    * JS function for speculative transfer transaction.
    *
    * # Arguments
    *
    * * `maybe_source` - Optional transfer source uref.
    * * `target_account` - The target account.
    * * `amount` - The amount to transfer.
    * * `maybe_id` - An optional transfer ID (defaults to a random number).
    * * `transaction_params` - The transactionment parameters.
    * * `maybe_block_id_as_string` - An optional block ID as a string.
    * * `maybe_block_identifier` - An optional block identifier.
    * * `verbosity` - The verbosity level for logging (optional).
    * * `node_address` - The address of the node to connect to (optional).
    *
    * # Returns
    *
    * A `Result` containing the result of the speculative transfer or a `JsError` in case of an error.
    * @param {URef | undefined} maybe_source
    * @param {string} target_account
    * @param {string} amount
    * @param {TransactionStrParams} transaction_params
    * @param {string | undefined} [maybe_id]
    * @param {string | undefined} [maybe_block_id_as_string]
    * @param {BlockIdentifier | undefined} [maybe_block_identifier]
    * @param {Verbosity | undefined} [verbosity]
    * @param {string | undefined} [node_address]
    * @returns {Promise<SpeculativeExecTxnResult>}
    */
    speculative_transfer_transaction(maybe_source, target_account, amount, transaction_params, maybe_id, maybe_block_id_as_string, maybe_block_identifier, verbosity, node_address) {
        let ptr0 = 0;
        if (!isLikeNone(maybe_source)) {
            _assertClass(maybe_source, URef);
            ptr0 = maybe_source.__destroy_into_raw();
        }
        const ptr1 = passStringToWasm0(target_account, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(amount, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        _assertClass(transaction_params, TransactionStrParams);
        var ptr3 = transaction_params.__destroy_into_raw();
        var ptr4 = isLikeNone(maybe_id) ? 0 : passStringToWasm0(maybe_id, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len4 = WASM_VECTOR_LEN;
        var ptr5 = isLikeNone(maybe_block_id_as_string) ? 0 : passStringToWasm0(maybe_block_id_as_string, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len5 = WASM_VECTOR_LEN;
        let ptr6 = 0;
        if (!isLikeNone(maybe_block_identifier)) {
            _assertClass(maybe_block_identifier, BlockIdentifier);
            ptr6 = maybe_block_identifier.__destroy_into_raw();
        }
        var ptr7 = isLikeNone(node_address) ? 0 : passStringToWasm0(node_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len7 = WASM_VECTOR_LEN;
        const ret = wasm.sdk_speculative_transfer_transaction(this.__wbg_ptr, ptr0, ptr1, len1, ptr2, len2, ptr3, ptr4, len4, ptr5, len5, ptr6, isLikeNone(verbosity) ? 3 : verbosity, ptr7, len7);
        return takeObject(ret);
    }
    /**
    * Creates a new DeployWatcher instance to watch deploys (JavaScript-friendly).
    *
    * # Arguments
    *
    * * `events_url` - The URL to monitor for deploy events.
    * * `timeout_duration` - An optional timeout duration in seconds.
    *
    * # Returns
    *
    * A `DeployWatcher` instance.
    * @param {string} events_url
    * @param {number | undefined} [timeout_duration]
    * @returns {DeployWatcher}
    */
    watchDeploy(events_url, timeout_duration) {
        const ptr0 = passStringToWasm0(events_url, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.sdk_watchDeploy(this.__wbg_ptr, ptr0, len0, !isLikeNone(timeout_duration), isLikeNone(timeout_duration) ? 0 : timeout_duration);
        return DeployWatcher.__wrap(ret);
    }
    /**
    * Waits for a deploy event to be processed asynchronously (JavaScript-friendly).
    *
    * # Arguments
    *
    * * `events_url` - The URL to monitor for deploy events.
    * * `deploy_hash` - The deploy hash to wait for.
    * * `timeout_duration` - An optional timeout duration in seconds.
    *
    * # Returns
    *
    * A JavaScript `Promise` resolving to either the processed `EventParseResult` or an error message.
    * @param {string} events_url
    * @param {string} deploy_hash
    * @param {number | undefined} [timeout_duration]
    * @returns {Promise<Promise<any>>}
    */
    waitDeploy(events_url, deploy_hash, timeout_duration) {
        const ptr0 = passStringToWasm0(events_url, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(deploy_hash, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ret = wasm.sdk_waitDeploy(this.__wbg_ptr, ptr0, len0, ptr1, len1, !isLikeNone(timeout_duration), isLikeNone(timeout_duration) ? 0 : timeout_duration);
        return takeObject(ret);
    }
    /**
    * Installs a smart contract with the specified parameters and returns the result.
    *
    * # Arguments
    *
    * * `deploy_params` - The deploy parameters.
    * * `session_params` - The session parameters.
    * * `payment_amount` - The payment amount as a string.
    * * `node_address` - An optional node address to send the request to.
    *
    * # Returns
    *
    * A `Result` containing either a `PutDeployResult` or a `JsError` in case of an error.
    *
    * # Errors
    *
    * Returns a `JsError` if there is an error during the installation.
    * @param {DeployStrParams} deploy_params
    * @param {SessionStrParams} session_params
    * @param {string} payment_amount
    * @param {string | undefined} [node_address]
    * @returns {Promise<PutDeployResult>}
    */
    install_deploy(deploy_params, session_params, payment_amount, node_address) {
        _assertClass(deploy_params, DeployStrParams);
        var ptr0 = deploy_params.__destroy_into_raw();
        _assertClass(session_params, SessionStrParams);
        var ptr1 = session_params.__destroy_into_raw();
        const ptr2 = passStringToWasm0(payment_amount, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        var ptr3 = isLikeNone(node_address) ? 0 : passStringToWasm0(node_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len3 = WASM_VECTOR_LEN;
        const ret = wasm.sdk_install_deploy(this.__wbg_ptr, ptr0, ptr1, ptr2, len2, ptr3, len3);
        return takeObject(ret);
    }
    /**
    * JS function for speculative transfer.
    *
    * # Arguments
    *
    * * `amount` - The amount to transfer.
    * * `target_account` - The target account.
    * * `transfer_id` - An optional transfer ID (defaults to a random number).
    * * `deploy_params` - The deployment parameters.
    * * `payment_params` - The payment parameters.
    * * `maybe_block_id_as_string` - An optional block ID as a string.
    * * `maybe_block_identifier` - An optional block identifier.
    * * `verbosity` - The verbosity level for logging (optional).
    * * `node_address` - The address of the node to connect to (optional).
    *
    * # Returns
    *
    * A `Result` containing the result of the speculative transfer or a `JsError` in case of an error.
    * @param {string} amount
    * @param {string} target_account
    * @param {string | undefined} transfer_id
    * @param {DeployStrParams} deploy_params
    * @param {PaymentStrParams} payment_params
    * @param {string | undefined} [maybe_block_id_as_string]
    * @param {BlockIdentifier | undefined} [maybe_block_identifier]
    * @param {Verbosity | undefined} [verbosity]
    * @param {string | undefined} [node_address]
    * @returns {Promise<SpeculativeExecResult>}
    */
    speculative_transfer(amount, target_account, transfer_id, deploy_params, payment_params, maybe_block_id_as_string, maybe_block_identifier, verbosity, node_address) {
        const ptr0 = passStringToWasm0(amount, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(target_account, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        var ptr2 = isLikeNone(transfer_id) ? 0 : passStringToWasm0(transfer_id, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len2 = WASM_VECTOR_LEN;
        _assertClass(deploy_params, DeployStrParams);
        var ptr3 = deploy_params.__destroy_into_raw();
        _assertClass(payment_params, PaymentStrParams);
        var ptr4 = payment_params.__destroy_into_raw();
        var ptr5 = isLikeNone(maybe_block_id_as_string) ? 0 : passStringToWasm0(maybe_block_id_as_string, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len5 = WASM_VECTOR_LEN;
        let ptr6 = 0;
        if (!isLikeNone(maybe_block_identifier)) {
            _assertClass(maybe_block_identifier, BlockIdentifier);
            ptr6 = maybe_block_identifier.__destroy_into_raw();
        }
        var ptr7 = isLikeNone(node_address) ? 0 : passStringToWasm0(node_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len7 = WASM_VECTOR_LEN;
        const ret = wasm.sdk_speculative_transfer(this.__wbg_ptr, ptr0, len0, ptr1, len1, ptr2, len2, ptr3, ptr4, ptr5, len5, ptr6, isLikeNone(verbosity) ? 3 : verbosity, ptr7, len7);
        return takeObject(ret);
    }
    /**
    * Puts a deploy using the provided options.
    *
    * # Arguments
    *
    * * `deploy` - The `Deploy` object to be sent.
    * * `verbosity` - An optional `Verbosity` level for controlling the output verbosity.
    * * `node_address` - An optional string specifying the node address to use for the request.
    *
    * # Returns
    *
    * A `Result` containing either a `PutDeployResult` or a `JsError` in case of an error.
    *
    * # Errors
    *
    * Returns a `JsError` if there is an error during the deploy process.
    * @param {Deploy} deploy
    * @param {Verbosity | undefined} [verbosity]
    * @param {string | undefined} [node_address]
    * @returns {Promise<PutDeployResult>}
    */
    put_deploy(deploy, verbosity, node_address) {
        _assertClass(deploy, Deploy);
        var ptr0 = deploy.__destroy_into_raw();
        var ptr1 = isLikeNone(node_address) ? 0 : passStringToWasm0(node_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        const ret = wasm.sdk_put_deploy(this.__wbg_ptr, ptr0, isLikeNone(verbosity) ? 3 : verbosity, ptr1, len1);
        return takeObject(ret);
    }
    /**
    * JavaScript Alias for `put_deploy`.
    * @param {Deploy} deploy
    * @param {Verbosity | undefined} [verbosity]
    * @param {string | undefined} [node_address]
    * @returns {Promise<PutDeployResult>}
    */
    account_put_deploy(deploy, verbosity, node_address) {
        _assertClass(deploy, Deploy);
        var ptr0 = deploy.__destroy_into_raw();
        var ptr1 = isLikeNone(node_address) ? 0 : passStringToWasm0(node_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        const ret = wasm.sdk_account_put_deploy(this.__wbg_ptr, ptr0, isLikeNone(verbosity) ? 3 : verbosity, ptr1, len1);
        return takeObject(ret);
    }
    /**
    * JS function for transaction transferring funds.
    *
    * # Arguments
    *
    * * `maybe_source` - Optional transfer source uref.
    * * `target_account` - The target account.
    * * `amount` - The amount to transfer.
    * * `transaction_params` - The transaction parameters.
    * * `maybe_id` - An optional transfer ID (defaults to a random number).
    * * `verbosity` - The verbosity level for logging (optional).
    * * `node_address` - The address of the node to connect to (optional).
    *
    * # Returns
    *
    * A `Result` containing the result of the transfer or a `JsError` in case of an error.
    * @param {URef | undefined} maybe_source
    * @param {string} target_account
    * @param {string} amount
    * @param {TransactionStrParams} transaction_params
    * @param {string | undefined} [maybe_id]
    * @param {Verbosity | undefined} [verbosity]
    * @param {string | undefined} [node_address]
    * @returns {Promise<PutTransactionResult>}
    */
    transfer_transaction(maybe_source, target_account, amount, transaction_params, maybe_id, verbosity, node_address) {
        let ptr0 = 0;
        if (!isLikeNone(maybe_source)) {
            _assertClass(maybe_source, URef);
            ptr0 = maybe_source.__destroy_into_raw();
        }
        const ptr1 = passStringToWasm0(target_account, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(amount, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        _assertClass(transaction_params, TransactionStrParams);
        var ptr3 = transaction_params.__destroy_into_raw();
        var ptr4 = isLikeNone(maybe_id) ? 0 : passStringToWasm0(maybe_id, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len4 = WASM_VECTOR_LEN;
        var ptr5 = isLikeNone(node_address) ? 0 : passStringToWasm0(node_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len5 = WASM_VECTOR_LEN;
        const ret = wasm.sdk_transfer_transaction(this.__wbg_ptr, ptr0, ptr1, len1, ptr2, len2, ptr3, ptr4, len4, isLikeNone(verbosity) ? 3 : verbosity, ptr5, len5);
        return takeObject(ret);
    }
    /**
    * Calls a smart contract entry point with the specified parameters and returns the result.
    *
    * # Arguments
    *
    * * `deploy_params` - The deploy parameters.
    * * `session_params` - The session parameters.
    * * `payment_amount` - The payment amount as a string.
    * * `node_address` - An optional node address to send the request to.
    *
    * # Returns
    *
    * A `Result` containing either a `PutDeployResult` or a `JsError` in case of an error.
    *
    * # Errors
    *
    * Returns a `JsError` if there is an error during the call.
    * @param {DeployStrParams} deploy_params
    * @param {SessionStrParams} session_params
    * @param {string} payment_amount
    * @param {string | undefined} [node_address]
    * @returns {Promise<PutDeployResult>}
    */
    call_entrypoint_deploy(deploy_params, session_params, payment_amount, node_address) {
        _assertClass(deploy_params, DeployStrParams);
        var ptr0 = deploy_params.__destroy_into_raw();
        _assertClass(session_params, SessionStrParams);
        var ptr1 = session_params.__destroy_into_raw();
        const ptr2 = passStringToWasm0(payment_amount, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        var ptr3 = isLikeNone(node_address) ? 0 : passStringToWasm0(node_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len3 = WASM_VECTOR_LEN;
        const ret = wasm.sdk_call_entrypoint_deploy(this.__wbg_ptr, ptr0, ptr1, ptr2, len2, ptr3, len3);
        return takeObject(ret);
    }
    /**
    * JS function for transferring funds.
    *
    * # Arguments
    *
    * * `amount` - The amount to transfer.
    * * `target_account` - The target account.
    * * `transfer_id` - An optional transfer ID (defaults to a random number).
    * * `deploy_params` - The deployment parameters.
    * * `payment_params` - The payment parameters.
    * * `verbosity` - The verbosity level for logging (optional).
    * * `node_address` - The address of the node to connect to (optional).
    *
    * # Returns
    *
    * A `Result` containing the result of the transfer or a `JsError` in case of an error.
    * @param {string} amount
    * @param {string} target_account
    * @param {string | undefined} transfer_id
    * @param {DeployStrParams} deploy_params
    * @param {PaymentStrParams} payment_params
    * @param {Verbosity | undefined} [verbosity]
    * @param {string | undefined} [node_address]
    * @returns {Promise<PutDeployResult>}
    */
    transfer(amount, target_account, transfer_id, deploy_params, payment_params, verbosity, node_address) {
        const ptr0 = passStringToWasm0(amount, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(target_account, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        var ptr2 = isLikeNone(transfer_id) ? 0 : passStringToWasm0(transfer_id, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len2 = WASM_VECTOR_LEN;
        _assertClass(deploy_params, DeployStrParams);
        var ptr3 = deploy_params.__destroy_into_raw();
        _assertClass(payment_params, PaymentStrParams);
        var ptr4 = payment_params.__destroy_into_raw();
        var ptr5 = isLikeNone(node_address) ? 0 : passStringToWasm0(node_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len5 = WASM_VECTOR_LEN;
        const ret = wasm.sdk_transfer(this.__wbg_ptr, ptr0, len0, ptr1, len1, ptr2, len2, ptr3, ptr4, isLikeNone(verbosity) ? 3 : verbosity, ptr5, len5);
        return takeObject(ret);
    }
    /**
    * This function allows executing a transaction speculatively.
    *
    * # Arguments
    *
    * * `builder_params` - Transaction Builder parameters.
    * * `transaction_params` - Transactionment parameters for the transaction.
    * * `maybe_block_id_as_string` - An optional block ID as a string.
    * * `maybe_block_identifier` - Optional block identifier.
    * * `verbosity` - Optional verbosity level.
    * * `node_address` - Optional node address.
    *
    * # Returns
    *
    * A `Result` containing either a `SpeculativeExecTxnResult` or a `JsError` in case of an error.
    * @param {TransactionBuilderParams} builder_params
    * @param {TransactionStrParams} transaction_params
    * @param {string | undefined} [maybe_block_id_as_string]
    * @param {BlockIdentifier | undefined} [maybe_block_identifier]
    * @param {Verbosity | undefined} [verbosity]
    * @param {string | undefined} [node_address]
    * @returns {Promise<SpeculativeExecTxnResult>}
    */
    speculative_transaction(builder_params, transaction_params, maybe_block_id_as_string, maybe_block_identifier, verbosity, node_address) {
        _assertClass(builder_params, TransactionBuilderParams);
        var ptr0 = builder_params.__destroy_into_raw();
        _assertClass(transaction_params, TransactionStrParams);
        var ptr1 = transaction_params.__destroy_into_raw();
        var ptr2 = isLikeNone(maybe_block_id_as_string) ? 0 : passStringToWasm0(maybe_block_id_as_string, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len2 = WASM_VECTOR_LEN;
        let ptr3 = 0;
        if (!isLikeNone(maybe_block_identifier)) {
            _assertClass(maybe_block_identifier, BlockIdentifier);
            ptr3 = maybe_block_identifier.__destroy_into_raw();
        }
        var ptr4 = isLikeNone(node_address) ? 0 : passStringToWasm0(node_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len4 = WASM_VECTOR_LEN;
        const ret = wasm.sdk_speculative_transaction(this.__wbg_ptr, ptr0, ptr1, ptr2, len2, ptr3, isLikeNone(verbosity) ? 3 : verbosity, ptr4, len4);
        return takeObject(ret);
    }
    /**
    * Installs a smart contract with the specified parameters and returns the result.
    *
    * # Arguments
    *.
    * * `transaction_params` - Transaction parameters.
    * * `transaction_bytes` - Transaction Bytes to install
    * * `node_address` - An optional node address to send the request to.
    *
    * # Returns
    *
    * A `Result` containing either a `PutTransactionResult` or a `JsError` in case of an error.
    *
    * # Errors
    *
    * Returns a `JsError` if there is an error during the installation.
    * @param {TransactionStrParams} transaction_params
    * @param {Bytes} transaction_bytes
    * @param {string | undefined} [node_address]
    * @returns {Promise<PutTransactionResult>}
    */
    install(transaction_params, transaction_bytes, node_address) {
        _assertClass(transaction_params, TransactionStrParams);
        var ptr0 = transaction_params.__destroy_into_raw();
        _assertClass(transaction_bytes, Bytes);
        var ptr1 = transaction_bytes.__destroy_into_raw();
        var ptr2 = isLikeNone(node_address) ? 0 : passStringToWasm0(node_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len2 = WASM_VECTOR_LEN;
        const ret = wasm.sdk_install(this.__wbg_ptr, ptr0, ptr1, ptr2, len2);
        return takeObject(ret);
    }
}

const SessionStrParamsFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_sessionstrparams_free(ptr >>> 0));
/**
*/
export class SessionStrParams {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        SessionStrParamsFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_sessionstrparams_free(ptr);
    }
    /**
    * @param {string | undefined} [session_hash]
    * @param {string | undefined} [session_name]
    * @param {string | undefined} [session_package_hash]
    * @param {string | undefined} [session_package_name]
    * @param {string | undefined} [session_path]
    * @param {Bytes | undefined} [session_bytes]
    * @param {Array<any> | undefined} [session_args_simple]
    * @param {string | undefined} [session_args_json]
    * @param {string | undefined} [session_version]
    * @param {string | undefined} [session_entry_point]
    * @param {boolean | undefined} [is_session_transfer]
    */
    constructor(session_hash, session_name, session_package_hash, session_package_name, session_path, session_bytes, session_args_simple, session_args_json, session_version, session_entry_point, is_session_transfer) {
        var ptr0 = isLikeNone(session_hash) ? 0 : passStringToWasm0(session_hash, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        var ptr1 = isLikeNone(session_name) ? 0 : passStringToWasm0(session_name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        var ptr2 = isLikeNone(session_package_hash) ? 0 : passStringToWasm0(session_package_hash, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len2 = WASM_VECTOR_LEN;
        var ptr3 = isLikeNone(session_package_name) ? 0 : passStringToWasm0(session_package_name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len3 = WASM_VECTOR_LEN;
        var ptr4 = isLikeNone(session_path) ? 0 : passStringToWasm0(session_path, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len4 = WASM_VECTOR_LEN;
        let ptr5 = 0;
        if (!isLikeNone(session_bytes)) {
            _assertClass(session_bytes, Bytes);
            ptr5 = session_bytes.__destroy_into_raw();
        }
        var ptr6 = isLikeNone(session_args_json) ? 0 : passStringToWasm0(session_args_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len6 = WASM_VECTOR_LEN;
        var ptr7 = isLikeNone(session_version) ? 0 : passStringToWasm0(session_version, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len7 = WASM_VECTOR_LEN;
        var ptr8 = isLikeNone(session_entry_point) ? 0 : passStringToWasm0(session_entry_point, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len8 = WASM_VECTOR_LEN;
        const ret = wasm.sessionstrparams_new(ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, ptr4, len4, ptr5, isLikeNone(session_args_simple) ? 0 : addHeapObject(session_args_simple), ptr6, len6, ptr7, len7, ptr8, len8, isLikeNone(is_session_transfer) ? 0xFFFFFF : is_session_transfer ? 1 : 0);
        this.__wbg_ptr = ret >>> 0;
        return this;
    }
    /**
    * @returns {string | undefined}
    */
    get session_hash() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.sessionstrparams_session_hash(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string} session_hash
    */
    set session_hash(session_hash) {
        const ptr0 = passStringToWasm0(session_hash, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.sessionstrparams_set_session_hash(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {string | undefined}
    */
    get session_name() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.sessionstrparams_session_name(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string} session_name
    */
    set session_name(session_name) {
        const ptr0 = passStringToWasm0(session_name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.sessionstrparams_set_session_name(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {string | undefined}
    */
    get session_package_hash() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.sessionstrparams_session_package_hash(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string} session_package_hash
    */
    set session_package_hash(session_package_hash) {
        const ptr0 = passStringToWasm0(session_package_hash, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.sessionstrparams_set_session_package_hash(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {string | undefined}
    */
    get session_package_name() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.sessionstrparams_session_package_name(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string} session_package_name
    */
    set session_package_name(session_package_name) {
        const ptr0 = passStringToWasm0(session_package_name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.sessionstrparams_set_session_package_name(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {string | undefined}
    */
    get session_path() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.sessionstrparams_session_path(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string} session_path
    */
    set session_path(session_path) {
        const ptr0 = passStringToWasm0(session_path, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.sessionstrparams_set_session_path(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {Bytes | undefined}
    */
    get session_bytes() {
        const ret = wasm.sessionstrparams_session_bytes(this.__wbg_ptr);
        return ret === 0 ? undefined : Bytes.__wrap(ret);
    }
    /**
    * @param {Bytes} session_bytes
    */
    set session_bytes(session_bytes) {
        _assertClass(session_bytes, Bytes);
        var ptr0 = session_bytes.__destroy_into_raw();
        wasm.sessionstrparams_set_session_bytes(this.__wbg_ptr, ptr0);
    }
    /**
    * @returns {ArgsSimple | undefined}
    */
    get session_args_simple() {
        const ret = wasm.sessionstrparams_session_args_simple(this.__wbg_ptr);
        return ret === 0 ? undefined : ArgsSimple.__wrap(ret);
    }
    /**
    * @param {Array<any>} session_args_simple
    */
    set session_args_simple(session_args_simple) {
        wasm.sessionstrparams_set_session_args_simple(this.__wbg_ptr, addHeapObject(session_args_simple));
    }
    /**
    * @returns {string | undefined}
    */
    get session_args_json() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.sessionstrparams_session_args_json(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string} session_args_json
    */
    set session_args_json(session_args_json) {
        const ptr0 = passStringToWasm0(session_args_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.sessionstrparams_set_session_args_json(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {string | undefined}
    */
    get session_version() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.sessionstrparams_session_version(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string} session_version
    */
    set session_version(session_version) {
        const ptr0 = passStringToWasm0(session_version, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.sessionstrparams_set_session_version(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {string | undefined}
    */
    get session_entry_point() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.sessionstrparams_session_entry_point(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string} session_entry_point
    */
    set session_entry_point(session_entry_point) {
        const ptr0 = passStringToWasm0(session_entry_point, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.sessionstrparams_set_session_entry_point(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {boolean | undefined}
    */
    get is_session_transfer() {
        const ret = wasm.sessionstrparams_is_session_transfer(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
    * @param {boolean} is_session_transfer
    */
    set is_session_transfer(is_session_transfer) {
        wasm.sessionstrparams_set_is_session_transfer(this.__wbg_ptr, is_session_transfer);
    }
}

const SpeculativeExecResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_speculativeexecresult_free(ptr >>> 0));
/**
*/
export class SpeculativeExecResult {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(SpeculativeExecResult.prototype);
        obj.__wbg_ptr = ptr;
        SpeculativeExecResultFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        SpeculativeExecResultFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_speculativeexecresult_free(ptr);
    }
    /**
    * Get the API version of the result.
    * @returns {any}
    */
    get api_version() {
        const ret = wasm.speculativeexecresult_api_version(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * Get the block hash.
    * @returns {BlockHash}
    */
    get block_hash() {
        const ret = wasm.speculativeexecresult_block_hash(this.__wbg_ptr);
        return BlockHash.__wrap(ret);
    }
    /**
    * Get the execution result.
    * @returns {any}
    */
    get execution_result() {
        const ret = wasm.speculativeexecresult_execution_result(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * Convert the result to JSON format.
    * @returns {any}
    */
    toJson() {
        const ret = wasm.speculativeexecresult_toJson(this.__wbg_ptr);
        return takeObject(ret);
    }
}

const SpeculativeExecTxnResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_speculativeexectxnresult_free(ptr >>> 0));
/**
*/
export class SpeculativeExecTxnResult {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(SpeculativeExecTxnResult.prototype);
        obj.__wbg_ptr = ptr;
        SpeculativeExecTxnResultFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        SpeculativeExecTxnResultFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_speculativeexectxnresult_free(ptr);
    }
    /**
    * Get the API version of the result.
    * @returns {any}
    */
    get api_version() {
        const ret = wasm.speculativeexectxnresult_api_version(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * Get the block hash.
    * @returns {BlockHash}
    */
    get block_hash() {
        const ret = wasm.speculativeexectxnresult_block_hash(this.__wbg_ptr);
        return BlockHash.__wrap(ret);
    }
    /**
    * Get the execution result.
    * @returns {any}
    */
    get execution_result() {
        const ret = wasm.speculativeexectxnresult_execution_result(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * Convert the result to JSON format.
    * @returns {any}
    */
    toJson() {
        const ret = wasm.speculativeexectxnresult_toJson(this.__wbg_ptr);
        return takeObject(ret);
    }
}

const TransactionFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_transaction_free(ptr >>> 0));
/**
*/
export class Transaction {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Transaction.prototype);
        obj.__wbg_ptr = ptr;
        TransactionFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        TransactionFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_transaction_free(ptr);
    }
    /**
    * @param {any} transaction
    */
    constructor(transaction) {
        const ret = wasm.transaction_new(addHeapObject(transaction));
        this.__wbg_ptr = ret >>> 0;
        return this;
    }
    /**
    * @returns {any}
    */
    toJson() {
        const ret = wasm.transaction_toJson(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * @param {TransactionBuilderParams} builder_params
    * @param {TransactionStrParams} transaction_params
    * @returns {Transaction}
    */
    static newSession(builder_params, transaction_params) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(builder_params, TransactionBuilderParams);
            var ptr0 = builder_params.__destroy_into_raw();
            _assertClass(transaction_params, TransactionStrParams);
            var ptr1 = transaction_params.__destroy_into_raw();
            wasm.transaction_newSession(retptr, ptr0, ptr1);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return Transaction.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {URef | undefined} maybe_source
    * @param {string} target_account
    * @param {string} amount
    * @param {string | undefined} maybe_id
    * @param {TransactionStrParams} transaction_params
    * @returns {Transaction}
    */
    static newTransfer(maybe_source, target_account, amount, maybe_id, transaction_params) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            let ptr0 = 0;
            if (!isLikeNone(maybe_source)) {
                _assertClass(maybe_source, URef);
                ptr0 = maybe_source.__destroy_into_raw();
            }
            const ptr1 = passStringToWasm0(target_account, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            const ptr2 = passStringToWasm0(amount, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len2 = WASM_VECTOR_LEN;
            var ptr3 = isLikeNone(maybe_id) ? 0 : passStringToWasm0(maybe_id, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            var len3 = WASM_VECTOR_LEN;
            _assertClass(transaction_params, TransactionStrParams);
            var ptr4 = transaction_params.__destroy_into_raw();
            wasm.transaction_newTransfer(retptr, ptr0, ptr1, len1, ptr2, len2, ptr3, len3, ptr4);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return Transaction.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string} ttl
    * @param {string | undefined} [secret_key]
    * @returns {Transaction}
    */
    withTTL(ttl, secret_key) {
        const ptr0 = passStringToWasm0(ttl, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        var ptr1 = isLikeNone(secret_key) ? 0 : passStringToWasm0(secret_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        const ret = wasm.transaction_withTTL(this.__wbg_ptr, ptr0, len0, ptr1, len1);
        return Transaction.__wrap(ret);
    }
    /**
    * @param {string} timestamp
    * @param {string | undefined} [secret_key]
    * @returns {Transaction}
    */
    withTimestamp(timestamp, secret_key) {
        const ptr0 = passStringToWasm0(timestamp, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        var ptr1 = isLikeNone(secret_key) ? 0 : passStringToWasm0(secret_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        const ret = wasm.transaction_withTimestamp(this.__wbg_ptr, ptr0, len0, ptr1, len1);
        return Transaction.__wrap(ret);
    }
    /**
    * @param {string} chain_name
    * @param {string | undefined} [secret_key]
    * @returns {Transaction}
    */
    withChainName(chain_name, secret_key) {
        const ptr0 = passStringToWasm0(chain_name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        var ptr1 = isLikeNone(secret_key) ? 0 : passStringToWasm0(secret_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        const ret = wasm.transaction_withChainName(this.__wbg_ptr, ptr0, len0, ptr1, len1);
        return Transaction.__wrap(ret);
    }
    /**
    * @param {PublicKey} public_key
    * @param {string | undefined} [secret_key]
    * @returns {Transaction}
    */
    withPublicKey(public_key, secret_key) {
        _assertClass(public_key, PublicKey);
        var ptr0 = public_key.__destroy_into_raw();
        var ptr1 = isLikeNone(secret_key) ? 0 : passStringToWasm0(secret_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        const ret = wasm.transaction_withPublicKey(this.__wbg_ptr, ptr0, ptr1, len1);
        return Transaction.__wrap(ret);
    }
    /**
    * @param {AccountHash} account_hash
    * @param {string | undefined} [secret_key]
    * @returns {Transaction}
    */
    withAccountHash(account_hash, secret_key) {
        _assertClass(account_hash, AccountHash);
        var ptr0 = account_hash.__destroy_into_raw();
        var ptr1 = isLikeNone(secret_key) ? 0 : passStringToWasm0(secret_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        const ret = wasm.transaction_withAccountHash(this.__wbg_ptr, ptr0, ptr1, len1);
        return Transaction.__wrap(ret);
    }
    /**
    * @param {string} entry_point
    * @param {string | undefined} [secret_key]
    * @returns {Transaction}
    */
    withEntryPoint(entry_point, secret_key) {
        const ptr0 = passStringToWasm0(entry_point, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        var ptr1 = isLikeNone(secret_key) ? 0 : passStringToWasm0(secret_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        const ret = wasm.transaction_withEntryPoint(this.__wbg_ptr, ptr0, len0, ptr1, len1);
        return Transaction.__wrap(ret);
    }
    /**
    * @param {AddressableEntityHash} hash
    * @param {string | undefined} [secret_key]
    * @returns {Transaction}
    */
    withHash(hash, secret_key) {
        _assertClass(hash, AddressableEntityHash);
        var ptr0 = hash.__destroy_into_raw();
        var ptr1 = isLikeNone(secret_key) ? 0 : passStringToWasm0(secret_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        const ret = wasm.transaction_withHash(this.__wbg_ptr, ptr0, ptr1, len1);
        return Transaction.__wrap(ret);
    }
    /**
    * @param {PackageHash} package_hash
    * @param {string | undefined} [secret_key]
    * @returns {Transaction}
    */
    withPackageHash(package_hash, secret_key) {
        _assertClass(package_hash, PackageHash);
        var ptr0 = package_hash.__destroy_into_raw();
        var ptr1 = isLikeNone(secret_key) ? 0 : passStringToWasm0(secret_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        const ret = wasm.transaction_withPackageHash(this.__wbg_ptr, ptr0, ptr1, len1);
        return Transaction.__wrap(ret);
    }
    /**
    * @param {Bytes} module_bytes
    * @param {string | undefined} [secret_key]
    * @returns {Transaction}
    */
    withModuleBytes(module_bytes, secret_key) {
        _assertClass(module_bytes, Bytes);
        var ptr0 = module_bytes.__destroy_into_raw();
        var ptr1 = isLikeNone(secret_key) ? 0 : passStringToWasm0(secret_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        const ret = wasm.transaction_withModuleBytes(this.__wbg_ptr, ptr0, ptr1, len1);
        return Transaction.__wrap(ret);
    }
    /**
    * @param {string | undefined} [secret_key]
    * @returns {Transaction}
    */
    withSecretKey(secret_key) {
        var ptr0 = isLikeNone(secret_key) ? 0 : passStringToWasm0(secret_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        const ret = wasm.transaction_withSecretKey(this.__wbg_ptr, ptr0, len0);
        return Transaction.__wrap(ret);
    }
    /**
    * @param {any} body
    * @param {string | undefined} [secret_key]
    * @returns {Transaction}
    */
    withBody(body, secret_key) {
        var ptr0 = isLikeNone(secret_key) ? 0 : passStringToWasm0(secret_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        const ret = wasm.transaction_withBody(this.__wbg_ptr, addHeapObject(body), ptr0, len0);
        return Transaction.__wrap(ret);
    }
    /**
    * @returns {boolean}
    */
    verify() {
        const ret = wasm.transaction_verify(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
    * @returns {TransactionHash}
    */
    get hash() {
        const ret = wasm.transaction_hash(this.__wbg_ptr);
        return TransactionHash.__wrap(ret);
    }
    /**
    * @returns {boolean}
    */
    expired() {
        const ret = wasm.transaction_expired(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
    * @returns {any}
    */
    expires() {
        const ret = wasm.transaction_expires(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * @returns {any}
    */
    signers() {
        const ret = wasm.transaction_signers(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * @returns {any}
    */
    authorization_keys() {
        const ret = wasm.transaction_authorization_keys(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * @param {string} secret_key
    * @returns {Transaction}
    */
    sign(secret_key) {
        const ptr0 = passStringToWasm0(secret_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.transaction_sign(this.__wbg_ptr, ptr0, len0);
        return Transaction.__wrap(ret);
    }
    /**
    * @returns {any}
    */
    approvalsHash() {
        const ret = wasm.transaction_approvalsHash(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * @returns {any}
    */
    approvals() {
        const ret = wasm.transaction_approvals(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * @returns {any}
    */
    header() {
        const ret = wasm.transaction_header(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * @returns {boolean}
    */
    isNative() {
        const ret = wasm.transaction_isNative(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
    * @returns {boolean}
    */
    isStandardPayment() {
        const ret = wasm.transaction_isStandardPayment(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
    * @returns {any}
    */
    session_args() {
        const ret = wasm.transaction_session_args(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * @param {string} public_key
    * @param {string} signature
    * @returns {Transaction}
    */
    addSignature(public_key, signature) {
        const ptr0 = passStringToWasm0(public_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(signature, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ret = wasm.transaction_addSignature(this.__wbg_ptr, ptr0, len0, ptr1, len1);
        return Transaction.__wrap(ret);
    }
    /**
    * @returns {string}
    */
    entryPoint() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.transaction_entryPoint(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
    * @returns {string}
    */
    TTL() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.transaction_TTL(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
    * @returns {string}
    */
    timestamp() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.transaction_timestamp(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
    * @returns {number}
    */
    size_estimate() {
        const ret = wasm.transaction_size_estimate(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
    * @returns {string}
    */
    chain_name() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.transaction_chain_name(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
    * @returns {string}
    */
    initiator_addr() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.transaction_initiator_addr(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
    * @returns {AccountHash}
    */
    account_hash() {
        const ret = wasm.transaction_account_hash(this.__wbg_ptr);
        return AccountHash.__wrap(ret);
    }
    /**
    * @param {any} js_value_arg
    * @param {string | undefined} [secret_key]
    * @returns {Transaction}
    */
    addArg(js_value_arg, secret_key) {
        var ptr0 = isLikeNone(secret_key) ? 0 : passStringToWasm0(secret_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        const ret = wasm.transaction_addArg(this.__wbg_ptr, addHeapObject(js_value_arg), ptr0, len0);
        return Transaction.__wrap(ret);
    }
}

const TransactionBuilderParamsFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_transactionbuilderparams_free(ptr >>> 0));
/**
*/
export class TransactionBuilderParams {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(TransactionBuilderParams.prototype);
        obj.__wbg_ptr = ptr;
        TransactionBuilderParamsFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        TransactionBuilderParamsFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_transactionbuilderparams_free(ptr);
    }
    /**
    * @param {Bytes | undefined} [transaction_bytes]
    * @returns {TransactionBuilderParams}
    */
    static newSession(transaction_bytes) {
        let ptr0 = 0;
        if (!isLikeNone(transaction_bytes)) {
            _assertClass(transaction_bytes, Bytes);
            ptr0 = transaction_bytes.__destroy_into_raw();
        }
        const ret = wasm.transactionbuilderparams_newSession(ptr0);
        return TransactionBuilderParams.__wrap(ret);
    }
    /**
    * @param {TransferTarget} target
    * @param {string} amount
    * @param {URef | undefined} [maybe_source]
    * @param {bigint | undefined} [maybe_id]
    * @returns {TransactionBuilderParams}
    */
    static newTransfer(target, amount, maybe_source, maybe_id) {
        _assertClass(target, TransferTarget);
        var ptr0 = target.__destroy_into_raw();
        const ptr1 = passStringToWasm0(amount, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        let ptr2 = 0;
        if (!isLikeNone(maybe_source)) {
            _assertClass(maybe_source, URef);
            ptr2 = maybe_source.__destroy_into_raw();
        }
        const ret = wasm.transactionbuilderparams_newTransfer(ptr0, ptr1, len1, ptr2, !isLikeNone(maybe_id), isLikeNone(maybe_id) ? BigInt(0) : maybe_id);
        return TransactionBuilderParams.__wrap(ret);
    }
    /**
    * @param {string} entity_hash
    * @param {string} entry_point
    * @returns {TransactionBuilderParams}
    */
    static newInvocableEntity(entity_hash, entry_point) {
        const ptr0 = passStringToWasm0(entity_hash, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(entry_point, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ret = wasm.transactionbuilderparams_newInvocableEntity(ptr0, len0, ptr1, len1);
        return TransactionBuilderParams.__wrap(ret);
    }
    /**
    * @param {string} entity_alias
    * @param {string} entry_point
    * @returns {TransactionBuilderParams}
    */
    static newInvocableEntityAlias(entity_alias, entry_point) {
        const ptr0 = passStringToWasm0(entity_alias, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(entry_point, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ret = wasm.transactionbuilderparams_newInvocableEntityAlias(ptr0, len0, ptr1, len1);
        return TransactionBuilderParams.__wrap(ret);
    }
    /**
    * @param {string} package_hash
    * @param {string} entry_point
    * @param {string | undefined} [maybe_entity_version]
    * @returns {TransactionBuilderParams}
    */
    static newPackage(package_hash, entry_point, maybe_entity_version) {
        const ptr0 = passStringToWasm0(package_hash, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(entry_point, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        var ptr2 = isLikeNone(maybe_entity_version) ? 0 : passStringToWasm0(maybe_entity_version, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len2 = WASM_VECTOR_LEN;
        const ret = wasm.transactionbuilderparams_newPackage(ptr0, len0, ptr1, len1, ptr2, len2);
        return TransactionBuilderParams.__wrap(ret);
    }
    /**
    * @param {string} package_alias
    * @param {string} entry_point
    * @param {string | undefined} [maybe_entity_version]
    * @returns {TransactionBuilderParams}
    */
    static newPackageAlias(package_alias, entry_point, maybe_entity_version) {
        const ptr0 = passStringToWasm0(package_alias, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(entry_point, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        var ptr2 = isLikeNone(maybe_entity_version) ? 0 : passStringToWasm0(maybe_entity_version, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len2 = WASM_VECTOR_LEN;
        const ret = wasm.transactionbuilderparams_newPackageAlias(ptr0, len0, ptr1, len1, ptr2, len2);
        return TransactionBuilderParams.__wrap(ret);
    }
    /**
    * @param {PublicKey} public_key
    * @param {number} delegation_rate
    * @param {string} amount
    * @returns {TransactionBuilderParams}
    */
    static newAddBid(public_key, delegation_rate, amount) {
        _assertClass(public_key, PublicKey);
        var ptr0 = public_key.__destroy_into_raw();
        const ptr1 = passStringToWasm0(amount, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ret = wasm.transactionbuilderparams_newAddBid(ptr0, delegation_rate, ptr1, len1);
        return TransactionBuilderParams.__wrap(ret);
    }
    /**
    * @param {PublicKey} delegator
    * @param {PublicKey} validator
    * @param {string} amount
    * @returns {TransactionBuilderParams}
    */
    static newDelegate(delegator, validator, amount) {
        _assertClass(delegator, PublicKey);
        var ptr0 = delegator.__destroy_into_raw();
        _assertClass(validator, PublicKey);
        var ptr1 = validator.__destroy_into_raw();
        const ptr2 = passStringToWasm0(amount, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        const ret = wasm.transactionbuilderparams_newDelegate(ptr0, ptr1, ptr2, len2);
        return TransactionBuilderParams.__wrap(ret);
    }
    /**
    * @param {PublicKey} delegator
    * @param {PublicKey} validator
    * @param {string} amount
    * @returns {TransactionBuilderParams}
    */
    static newUndelegate(delegator, validator, amount) {
        _assertClass(delegator, PublicKey);
        var ptr0 = delegator.__destroy_into_raw();
        _assertClass(validator, PublicKey);
        var ptr1 = validator.__destroy_into_raw();
        const ptr2 = passStringToWasm0(amount, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        const ret = wasm.transactionbuilderparams_newUndelegate(ptr0, ptr1, ptr2, len2);
        return TransactionBuilderParams.__wrap(ret);
    }
    /**
    * @param {PublicKey} delegator
    * @param {PublicKey} validator
    * @param {PublicKey} new_validator
    * @param {string} amount
    * @returns {TransactionBuilderParams}
    */
    static newRedelegate(delegator, validator, new_validator, amount) {
        _assertClass(delegator, PublicKey);
        var ptr0 = delegator.__destroy_into_raw();
        _assertClass(validator, PublicKey);
        var ptr1 = validator.__destroy_into_raw();
        _assertClass(new_validator, PublicKey);
        var ptr2 = new_validator.__destroy_into_raw();
        const ptr3 = passStringToWasm0(amount, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len3 = WASM_VECTOR_LEN;
        const ret = wasm.transactionbuilderparams_newRedelegate(ptr0, ptr1, ptr2, ptr3, len3);
        return TransactionBuilderParams.__wrap(ret);
    }
    /**
    * @param {PublicKey} public_key
    * @param {string} amount
    * @returns {TransactionBuilderParams}
    */
    static newWithdrawBid(public_key, amount) {
        _assertClass(public_key, PublicKey);
        var ptr0 = public_key.__destroy_into_raw();
        const ptr1 = passStringToWasm0(amount, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ret = wasm.transactionbuilderparams_newWithdrawBid(ptr0, ptr1, len1);
        return TransactionBuilderParams.__wrap(ret);
    }
}

const TransactionHashFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_transactionhash_free(ptr >>> 0));
/**
*/
export class TransactionHash {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(TransactionHash.prototype);
        obj.__wbg_ptr = ptr;
        TransactionHashFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        TransactionHashFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_transactionhash_free(ptr);
    }
    /**
    * @param {string} transaction_hash_hex_str
    */
    constructor(transaction_hash_hex_str) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passStringToWasm0(transaction_hash_hex_str, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.transactionhash_new(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            this.__wbg_ptr = r0 >>> 0;
            return this;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} bytes
    * @returns {TransactionHash}
    */
    static fromRaw(bytes) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(bytes, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.transactionhash_fromRaw(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return TransactionHash.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Digest} digest
    * @returns {TransactionHash}
    */
    static fromDigest(digest) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(digest, Digest);
            var ptr0 = digest.__destroy_into_raw();
            wasm.transactionhash_fromDigest(retptr, ptr0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return TransactionHash.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Digest}
    */
    digest() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.transactionhash_digest(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return Digest.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {any}
    */
    toJson() {
        const ret = wasm.transactionhash_toJson(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * @returns {string}
    */
    toString() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.transactionhash_toString(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
}

const TransactionProcessedFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_transactionprocessed_free(ptr >>> 0));
/**
* Represents processed deploy information.
*/
export class TransactionProcessed {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(TransactionProcessed.prototype);
        obj.__wbg_ptr = ptr;
        TransactionProcessedFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        TransactionProcessedFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_transactionprocessed_free(ptr);
    }
    /**
    * @returns {DeployString}
    */
    get transaction_hash() {
        const ret = wasm.__wbg_get_transactionprocessed_transaction_hash(this.__wbg_ptr);
        return DeployString.__wrap(ret);
    }
    /**
    * @param {DeployString} arg0
    */
    set transaction_hash(arg0) {
        _assertClass(arg0, DeployString);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_transactionprocessed_transaction_hash(this.__wbg_ptr, ptr0);
    }
    /**
    * @returns {PublicKeyString}
    */
    get initiator_addr() {
        const ret = wasm.__wbg_get_transactionprocessed_initiator_addr(this.__wbg_ptr);
        return PublicKeyString.__wrap(ret);
    }
    /**
    * @param {PublicKeyString} arg0
    */
    set initiator_addr(arg0) {
        _assertClass(arg0, PublicKeyString);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_transactionprocessed_initiator_addr(this.__wbg_ptr, ptr0);
    }
    /**
    * @returns {string}
    */
    get timestamp() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_transactionprocessed_timestamp(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
    * @param {string} arg0
    */
    set timestamp(arg0) {
        const ptr0 = passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_transactionprocessed_timestamp(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {string}
    */
    get ttl() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_messages_topic_name(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
    * @param {string} arg0
    */
    set ttl(arg0) {
        const ptr0 = passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_transactionprocessed_ttl(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {string}
    */
    get block_hash() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_messages_topic_name_hash(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
    * @param {string} arg0
    */
    set block_hash(arg0) {
        const ptr0 = passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_messages_topic_name_hash(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * Result of the execution, either Success or Failure.
    * @returns {ExecutionResult}
    */
    get execution_result() {
        const ret = wasm.__wbg_get_transactionprocessed_execution_result(this.__wbg_ptr);
        return ExecutionResult.__wrap(ret);
    }
    /**
    * Result of the execution, either Success or Failure.
    * @param {ExecutionResult} arg0
    */
    set execution_result(arg0) {
        _assertClass(arg0, ExecutionResult);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_transactionprocessed_execution_result(this.__wbg_ptr, ptr0);
    }
    /**
    * @returns {(Messages)[]}
    */
    get messages() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_transactionprocessed_messages(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var v1 = getArrayJsValueFromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 4, 4);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {(Messages)[]} arg0
    */
    set messages(arg0) {
        const ptr0 = passArrayJsValueToWasm0(arg0, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_transactionprocessed_messages(this.__wbg_ptr, ptr0, len0);
    }
}

const TransactionStrParamsFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_transactionstrparams_free(ptr >>> 0));
/**
*/
export class TransactionStrParams {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        TransactionStrParamsFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_transactionstrparams_free(ptr);
    }
    /**
    * @param {string} chain_name
    * @param {string | undefined} [initiator_addr]
    * @param {string | undefined} [secret_key]
    * @param {string | undefined} [timestamp]
    * @param {string | undefined} [ttl]
    * @param {(string)[] | undefined} [session_args_simple]
    * @param {string | undefined} [session_args_json]
    * @param {string | undefined} [pricing_mode]
    * @param {string | undefined} [payment_amount]
    * @param {string | undefined} [gas_price_tolerance]
    * @param {string | undefined} [receipt]
    * @param {boolean | undefined} [standard_payment]
    */
    constructor(chain_name, initiator_addr, secret_key, timestamp, ttl, session_args_simple, session_args_json, pricing_mode, payment_amount, gas_price_tolerance, receipt, standard_payment) {
        const ptr0 = passStringToWasm0(chain_name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        var ptr1 = isLikeNone(initiator_addr) ? 0 : passStringToWasm0(initiator_addr, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        var ptr2 = isLikeNone(secret_key) ? 0 : passStringToWasm0(secret_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len2 = WASM_VECTOR_LEN;
        var ptr3 = isLikeNone(timestamp) ? 0 : passStringToWasm0(timestamp, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len3 = WASM_VECTOR_LEN;
        var ptr4 = isLikeNone(ttl) ? 0 : passStringToWasm0(ttl, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len4 = WASM_VECTOR_LEN;
        var ptr5 = isLikeNone(session_args_simple) ? 0 : passArrayJsValueToWasm0(session_args_simple, wasm.__wbindgen_malloc);
        var len5 = WASM_VECTOR_LEN;
        var ptr6 = isLikeNone(session_args_json) ? 0 : passStringToWasm0(session_args_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len6 = WASM_VECTOR_LEN;
        var ptr7 = isLikeNone(pricing_mode) ? 0 : passStringToWasm0(pricing_mode, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len7 = WASM_VECTOR_LEN;
        var ptr8 = isLikeNone(payment_amount) ? 0 : passStringToWasm0(payment_amount, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len8 = WASM_VECTOR_LEN;
        var ptr9 = isLikeNone(gas_price_tolerance) ? 0 : passStringToWasm0(gas_price_tolerance, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len9 = WASM_VECTOR_LEN;
        var ptr10 = isLikeNone(receipt) ? 0 : passStringToWasm0(receipt, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len10 = WASM_VECTOR_LEN;
        const ret = wasm.transactionstrparams_new(ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, ptr4, len4, ptr5, len5, ptr6, len6, ptr7, len7, ptr8, len8, ptr9, len9, ptr10, len10, isLikeNone(standard_payment) ? 0xFFFFFF : standard_payment ? 1 : 0);
        this.__wbg_ptr = ret >>> 0;
        return this;
    }
    /**
    * @returns {string | undefined}
    */
    get secret_key() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.paymentstrparams_payment_amount(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string} secret_key
    */
    set secret_key(secret_key) {
        const ptr0 = passStringToWasm0(secret_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.transactionstrparams_set_secret_key(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {string | undefined}
    */
    get timestamp() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.paymentstrparams_payment_hash(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string | undefined} [timestamp]
    */
    set timestamp(timestamp) {
        var ptr0 = isLikeNone(timestamp) ? 0 : passStringToWasm0(timestamp, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.transactionstrparams_set_timestamp(this.__wbg_ptr, ptr0, len0);
    }
    /**
    */
    setDefaultTimestamp() {
        wasm.transactionstrparams_setDefaultTimestamp(this.__wbg_ptr);
    }
    /**
    * @returns {string | undefined}
    */
    get ttl() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.paymentstrparams_payment_name(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string | undefined} [ttl]
    */
    set ttl(ttl) {
        var ptr0 = isLikeNone(ttl) ? 0 : passStringToWasm0(ttl, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.transactionstrparams_set_ttl(this.__wbg_ptr, ptr0, len0);
    }
    /**
    */
    setDefaultTTL() {
        wasm.transactionstrparams_setDefaultTTL(this.__wbg_ptr);
    }
    /**
    * @returns {string | undefined}
    */
    get chain_name() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.paymentstrparams_payment_package_hash(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string} chain_name
    */
    set chain_name(chain_name) {
        const ptr0 = passStringToWasm0(chain_name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.transactionstrparams_set_chain_name(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {string | undefined}
    */
    get initiator_addr() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.paymentstrparams_payment_package_name(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string} initiator_addr
    */
    set initiator_addr(initiator_addr) {
        const ptr0 = passStringToWasm0(initiator_addr, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.transactionstrparams_set_initiator_addr(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {ArgsSimple | undefined}
    */
    get session_args_simple() {
        const ret = wasm.transactionstrparams_session_args_simple(this.__wbg_ptr);
        return ret === 0 ? undefined : ArgsSimple.__wrap(ret);
    }
    /**
    * @param {(string)[]} session_args_simple
    */
    set session_args_simple(session_args_simple) {
        const ptr0 = passArrayJsValueToWasm0(session_args_simple, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.transactionstrparams_set_session_args_simple(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {string | undefined}
    */
    get session_args_json() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.transactionstrparams_session_args_json(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string} session_args_json
    */
    set session_args_json(session_args_json) {
        const ptr0 = passStringToWasm0(session_args_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.transactionstrparams_set_session_args_json(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {string | undefined}
    */
    get pricing_mode() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.paymentstrparams_payment_args_json(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string} pricing_mode
    */
    set pricing_mode(pricing_mode) {
        const ptr0 = passStringToWasm0(pricing_mode, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.transactionstrparams_set_pricing_mode(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {string | undefined}
    */
    get payment_amount() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.paymentstrparams_payment_version(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string} payment_amount
    */
    set payment_amount(payment_amount) {
        const ptr0 = passStringToWasm0(payment_amount, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.transactionstrparams_set_payment_amount(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {string | undefined}
    */
    get gas_price_tolerance() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.paymentstrparams_payment_entry_point(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string} gas_price_tolerance
    */
    set gas_price_tolerance(gas_price_tolerance) {
        const ptr0 = passStringToWasm0(gas_price_tolerance, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.transactionstrparams_set_gas_price_tolerance(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {string | undefined}
    */
    get receipt() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.transactionstrparams_receipt(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string} receipt
    */
    set receipt(receipt) {
        const ptr0 = passStringToWasm0(receipt, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.transactionstrparams_set_receipt(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {boolean | undefined}
    */
    get standard_payment() {
        const ret = wasm.transactionstrparams_standard_payment(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
    * @param {boolean} standard_payment
    */
    set standard_payment(standard_payment) {
        wasm.transactionstrparams_set_standard_payment(this.__wbg_ptr, standard_payment);
    }
}

const TransferAddrFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_transferaddr_free(ptr >>> 0));
/**
*/
export class TransferAddr {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(TransferAddr.prototype);
        obj.__wbg_ptr = ptr;
        TransferAddrFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        TransferAddrFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_transferaddr_free(ptr);
    }
    /**
    * @param {Uint8Array} bytes
    */
    constructor(bytes) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(bytes, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.transferaddr_new(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            this.__wbg_ptr = r0 >>> 0;
            return this;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}

const TransferTargetFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_transfertarget_free(ptr >>> 0));
/**
*/
export class TransferTarget {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        TransferTargetFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_transfertarget_free(ptr);
    }
}

const URefFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_uref_free(ptr >>> 0));
/**
*/
export class URef {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(URef.prototype);
        obj.__wbg_ptr = ptr;
        URefFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        URefFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_uref_free(ptr);
    }
    /**
    * @param {string} uref_hex_str
    * @param {number} access_rights
    */
    constructor(uref_hex_str, access_rights) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passStringToWasm0(uref_hex_str, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.uref_new(retptr, ptr0, len0, access_rights);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            this.__wbg_ptr = r0 >>> 0;
            return this;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} bytes
    * @param {number} access_rights
    * @returns {URef}
    */
    static fromUint8Array(bytes, access_rights) {
        const ptr0 = passArray8ToWasm0(bytes, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.uref_fromUint8Array(ptr0, len0, access_rights);
        return URef.__wrap(ret);
    }
    /**
    * @returns {string}
    */
    toFormattedString() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.uref_toFormattedString(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
    * @returns {any}
    */
    toJson() {
        const ret = wasm.uref_toJson(this.__wbg_ptr);
        return takeObject(ret);
    }
}

const URefAddrFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_urefaddr_free(ptr >>> 0));
/**
*/
export class URefAddr {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(URefAddr.prototype);
        obj.__wbg_ptr = ptr;
        URefAddrFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        URefAddrFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_urefaddr_free(ptr);
    }
    /**
    * @param {Uint8Array} bytes
    */
    constructor(bytes) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(bytes, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.urefaddr_new(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            this.__wbg_ptr = r0 >>> 0;
            return this;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}

const Version2Finalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_version2_free(ptr >>> 0));
/**
* Represents a success response containing a cost value.
*/
export class Version2 {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Version2.prototype);
        obj.__wbg_ptr = ptr;
        Version2Finalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        Version2Finalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_version2_free(ptr);
    }
    /**
    * @returns {PublicKeyString}
    */
    get initiator() {
        const ret = wasm.__wbg_get_transactionprocessed_transaction_hash(this.__wbg_ptr);
        return PublicKeyString.__wrap(ret);
    }
    /**
    * @param {PublicKeyString} arg0
    */
    set initiator(arg0) {
        _assertClass(arg0, PublicKeyString);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_transactionprocessed_transaction_hash(this.__wbg_ptr, ptr0);
    }
    /**
    * @returns {string | undefined}
    */
    get error_message() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_version2_error_message(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string | undefined} [arg0]
    */
    set error_message(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_version2_error_message(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {string}
    */
    get limit() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_failure_error_message(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
    * @param {string} arg0
    */
    set limit(arg0) {
        const ptr0 = passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_failure_error_message(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {string}
    */
    get consumed() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_transactionprocessed_timestamp(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
    * @param {string} arg0
    */
    set consumed(arg0) {
        const ptr0 = passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_transactionprocessed_timestamp(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {string}
    */
    get cost() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_messages_topic_name(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
    * @param {string} arg0
    */
    set cost(arg0) {
        const ptr0 = passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_transactionprocessed_ttl(this.__wbg_ptr, ptr0, len0);
    }
}

const getAccountOptionsFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_getaccountoptions_free(ptr >>> 0));
/**
*/
export class getAccountOptions {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(getAccountOptions.prototype);
        obj.__wbg_ptr = ptr;
        getAccountOptionsFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        getAccountOptionsFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_getaccountoptions_free(ptr);
    }
    /**
    * @returns {AccountIdentifier | undefined}
    */
    get account_identifier() {
        const ret = wasm.__wbg_get_getaccountoptions_account_identifier(this.__wbg_ptr);
        return ret === 0 ? undefined : AccountIdentifier.__wrap(ret);
    }
    /**
    * @param {AccountIdentifier | undefined} [arg0]
    */
    set account_identifier(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, AccountIdentifier);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_getaccountoptions_account_identifier(this.__wbg_ptr, ptr0);
    }
    /**
    * @returns {string | undefined}
    */
    get account_identifier_as_string() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_getaccountoptions_account_identifier_as_string(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string | undefined} [arg0]
    */
    set account_identifier_as_string(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_getaccountoptions_account_identifier_as_string(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {string | undefined}
    */
    get maybe_block_id_as_string() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_getaccountoptions_maybe_block_id_as_string(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string | undefined} [arg0]
    */
    set maybe_block_id_as_string(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_getaccountoptions_maybe_block_id_as_string(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {BlockIdentifier | undefined}
    */
    get maybe_block_identifier() {
        const ret = wasm.__wbg_get_getaccountoptions_maybe_block_identifier(this.__wbg_ptr);
        return ret === 0 ? undefined : BlockIdentifier.__wrap(ret);
    }
    /**
    * @param {BlockIdentifier | undefined} [arg0]
    */
    set maybe_block_identifier(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, BlockIdentifier);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_getaccountoptions_maybe_block_identifier(this.__wbg_ptr, ptr0);
    }
    /**
    * @returns {string | undefined}
    */
    get node_address() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_getaccountoptions_node_address(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string | undefined} [arg0]
    */
    set node_address(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_getaccountoptions_node_address(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {Verbosity | undefined}
    */
    get verbosity() {
        const ret = wasm.__wbg_get_getaccountoptions_verbosity(this.__wbg_ptr);
        return ret === 3 ? undefined : ret;
    }
    /**
    * @param {Verbosity | undefined} [arg0]
    */
    set verbosity(arg0) {
        wasm.__wbg_set_getaccountoptions_verbosity(this.__wbg_ptr, isLikeNone(arg0) ? 3 : arg0);
    }
}

const getAuctionInfoOptionsFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_getauctioninfooptions_free(ptr >>> 0));
/**
* Options for the `get_auction_info` method.
*/
export class getAuctionInfoOptions {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(getAuctionInfoOptions.prototype);
        obj.__wbg_ptr = ptr;
        getAuctionInfoOptionsFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        getAuctionInfoOptionsFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_getauctioninfooptions_free(ptr);
    }
    /**
    * @returns {string | undefined}
    */
    get maybe_block_id_as_string() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_getauctioninfooptions_maybe_block_id_as_string(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string | undefined} [arg0]
    */
    set maybe_block_id_as_string(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_getauctioninfooptions_maybe_block_id_as_string(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {BlockIdentifier | undefined}
    */
    get maybe_block_identifier() {
        const ret = wasm.__wbg_get_getauctioninfooptions_maybe_block_identifier(this.__wbg_ptr);
        return ret === 0 ? undefined : BlockIdentifier.__wrap(ret);
    }
    /**
    * @param {BlockIdentifier | undefined} [arg0]
    */
    set maybe_block_identifier(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, BlockIdentifier);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_getauctioninfooptions_maybe_block_identifier(this.__wbg_ptr, ptr0);
    }
    /**
    * @returns {string | undefined}
    */
    get node_address() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_getauctioninfooptions_node_address(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string | undefined} [arg0]
    */
    set node_address(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_getauctioninfooptions_node_address(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {Verbosity | undefined}
    */
    get verbosity() {
        const ret = wasm.__wbg_get_getauctioninfooptions_verbosity(this.__wbg_ptr);
        return ret === 3 ? undefined : ret;
    }
    /**
    * @param {Verbosity | undefined} [arg0]
    */
    set verbosity(arg0) {
        wasm.__wbg_set_getauctioninfooptions_verbosity(this.__wbg_ptr, isLikeNone(arg0) ? 3 : arg0);
    }
}

const getBalanceOptionsFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_getbalanceoptions_free(ptr >>> 0));
/**
* Options for the `get_balance` method.
*/
export class getBalanceOptions {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(getBalanceOptions.prototype);
        obj.__wbg_ptr = ptr;
        getBalanceOptionsFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        getBalanceOptionsFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_getbalanceoptions_free(ptr);
    }
    /**
    * @returns {string | undefined}
    */
    get state_root_hash_as_string() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_getbalanceoptions_state_root_hash_as_string(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string | undefined} [arg0]
    */
    set state_root_hash_as_string(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_getbalanceoptions_state_root_hash_as_string(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {Digest | undefined}
    */
    get state_root_hash() {
        const ret = wasm.__wbg_get_getbalanceoptions_state_root_hash(this.__wbg_ptr);
        return ret === 0 ? undefined : Digest.__wrap(ret);
    }
    /**
    * @param {Digest | undefined} [arg0]
    */
    set state_root_hash(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, Digest);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_getbalanceoptions_state_root_hash(this.__wbg_ptr, ptr0);
    }
    /**
    * @returns {string | undefined}
    */
    get purse_uref_as_string() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_getbalanceoptions_purse_uref_as_string(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string | undefined} [arg0]
    */
    set purse_uref_as_string(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_getbalanceoptions_purse_uref_as_string(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {URef | undefined}
    */
    get purse_uref() {
        const ret = wasm.__wbg_get_getbalanceoptions_purse_uref(this.__wbg_ptr);
        return ret === 0 ? undefined : URef.__wrap(ret);
    }
    /**
    * @param {URef | undefined} [arg0]
    */
    set purse_uref(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, URef);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_getbalanceoptions_purse_uref(this.__wbg_ptr, ptr0);
    }
    /**
    * @returns {string | undefined}
    */
    get node_address() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_getbalanceoptions_node_address(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string | undefined} [arg0]
    */
    set node_address(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_getbalanceoptions_node_address(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {Verbosity | undefined}
    */
    get verbosity() {
        const ret = wasm.__wbg_get_getbalanceoptions_verbosity(this.__wbg_ptr);
        return ret === 3 ? undefined : ret;
    }
    /**
    * @param {Verbosity | undefined} [arg0]
    */
    set verbosity(arg0) {
        wasm.__wbg_set_getbalanceoptions_verbosity(this.__wbg_ptr, isLikeNone(arg0) ? 3 : arg0);
    }
}

const getBlockOptionsFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_getblockoptions_free(ptr >>> 0));
/**
* Options for the `get_block` method.
*/
export class getBlockOptions {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(getBlockOptions.prototype);
        obj.__wbg_ptr = ptr;
        getBlockOptionsFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        getBlockOptionsFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_getblockoptions_free(ptr);
    }
    /**
    * @returns {string | undefined}
    */
    get maybe_block_id_as_string() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_getblockoptions_maybe_block_id_as_string(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string | undefined} [arg0]
    */
    set maybe_block_id_as_string(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_getblockoptions_maybe_block_id_as_string(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {BlockIdentifier | undefined}
    */
    get maybe_block_identifier() {
        const ret = wasm.__wbg_get_getblockoptions_maybe_block_identifier(this.__wbg_ptr);
        return ret === 0 ? undefined : BlockIdentifier.__wrap(ret);
    }
    /**
    * @param {BlockIdentifier | undefined} [arg0]
    */
    set maybe_block_identifier(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, BlockIdentifier);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_getblockoptions_maybe_block_identifier(this.__wbg_ptr, ptr0);
    }
    /**
    * @returns {string | undefined}
    */
    get node_address() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_getblockoptions_node_address(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string | undefined} [arg0]
    */
    set node_address(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_getblockoptions_node_address(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {Verbosity | undefined}
    */
    get verbosity() {
        const ret = wasm.__wbg_get_getblockoptions_verbosity(this.__wbg_ptr);
        return ret === 3 ? undefined : ret;
    }
    /**
    * @param {Verbosity | undefined} [arg0]
    */
    set verbosity(arg0) {
        wasm.__wbg_set_getblockoptions_verbosity(this.__wbg_ptr, isLikeNone(arg0) ? 3 : arg0);
    }
}

const getBlockTransfersOptionsFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_getblocktransfersoptions_free(ptr >>> 0));
/**
* Options for the `get_block_transfers` method.
*/
export class getBlockTransfersOptions {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(getBlockTransfersOptions.prototype);
        obj.__wbg_ptr = ptr;
        getBlockTransfersOptionsFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        getBlockTransfersOptionsFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_getblocktransfersoptions_free(ptr);
    }
    /**
    * @returns {string | undefined}
    */
    get maybe_block_id_as_string() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_getblockoptions_maybe_block_id_as_string(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string | undefined} [arg0]
    */
    set maybe_block_id_as_string(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_getblockoptions_maybe_block_id_as_string(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {BlockIdentifier | undefined}
    */
    get maybe_block_identifier() {
        const ret = wasm.__wbg_get_getblockoptions_maybe_block_identifier(this.__wbg_ptr);
        return ret === 0 ? undefined : BlockIdentifier.__wrap(ret);
    }
    /**
    * @param {BlockIdentifier | undefined} [arg0]
    */
    set maybe_block_identifier(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, BlockIdentifier);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_getblockoptions_maybe_block_identifier(this.__wbg_ptr, ptr0);
    }
    /**
    * @returns {Verbosity | undefined}
    */
    get verbosity() {
        const ret = wasm.__wbg_get_getblockoptions_verbosity(this.__wbg_ptr);
        return ret === 3 ? undefined : ret;
    }
    /**
    * @param {Verbosity | undefined} [arg0]
    */
    set verbosity(arg0) {
        wasm.__wbg_set_getblockoptions_verbosity(this.__wbg_ptr, isLikeNone(arg0) ? 3 : arg0);
    }
    /**
    * @returns {string | undefined}
    */
    get node_address() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_getblockoptions_node_address(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string | undefined} [arg0]
    */
    set node_address(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_getblockoptions_node_address(this.__wbg_ptr, ptr0, len0);
    }
}

const getDeployOptionsFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_getdeployoptions_free(ptr >>> 0));
/**
* Options for the `get_deploy` method.
*/
export class getDeployOptions {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(getDeployOptions.prototype);
        obj.__wbg_ptr = ptr;
        getDeployOptionsFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        getDeployOptionsFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_getdeployoptions_free(ptr);
    }
    /**
    * @returns {string | undefined}
    */
    get deploy_hash_as_string() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_getdeployoptions_deploy_hash_as_string(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string | undefined} [arg0]
    */
    set deploy_hash_as_string(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_getdeployoptions_deploy_hash_as_string(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {DeployHash | undefined}
    */
    get deploy_hash() {
        const ret = wasm.__wbg_get_getdeployoptions_deploy_hash(this.__wbg_ptr);
        return ret === 0 ? undefined : DeployHash.__wrap(ret);
    }
    /**
    * @param {DeployHash | undefined} [arg0]
    */
    set deploy_hash(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, DeployHash);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_getdeployoptions_deploy_hash(this.__wbg_ptr, ptr0);
    }
    /**
    * @returns {boolean | undefined}
    */
    get finalized_approvals() {
        const ret = wasm.__wbg_get_getdeployoptions_finalized_approvals(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
    * @param {boolean | undefined} [arg0]
    */
    set finalized_approvals(arg0) {
        wasm.__wbg_set_getdeployoptions_finalized_approvals(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
    * @returns {string | undefined}
    */
    get node_address() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_getdeployoptions_node_address(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string | undefined} [arg0]
    */
    set node_address(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_getdeployoptions_node_address(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {Verbosity | undefined}
    */
    get verbosity() {
        const ret = wasm.__wbg_get_getdeployoptions_verbosity(this.__wbg_ptr);
        return ret === 3 ? undefined : ret;
    }
    /**
    * @param {Verbosity | undefined} [arg0]
    */
    set verbosity(arg0) {
        wasm.__wbg_set_getdeployoptions_verbosity(this.__wbg_ptr, isLikeNone(arg0) ? 3 : arg0);
    }
}

const getDictionaryItemOptionsFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_getdictionaryitemoptions_free(ptr >>> 0));
/**
* Options for the `get_dictionary_item` method.
*/
export class getDictionaryItemOptions {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(getDictionaryItemOptions.prototype);
        obj.__wbg_ptr = ptr;
        getDictionaryItemOptionsFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        getDictionaryItemOptionsFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_getdictionaryitemoptions_free(ptr);
    }
    /**
    * @returns {string | undefined}
    */
    get state_root_hash_as_string() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_getdictionaryitemoptions_state_root_hash_as_string(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string | undefined} [arg0]
    */
    set state_root_hash_as_string(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_getdictionaryitemoptions_state_root_hash_as_string(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {Digest | undefined}
    */
    get state_root_hash() {
        const ret = wasm.__wbg_get_getdictionaryitemoptions_state_root_hash(this.__wbg_ptr);
        return ret === 0 ? undefined : Digest.__wrap(ret);
    }
    /**
    * @param {Digest | undefined} [arg0]
    */
    set state_root_hash(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, Digest);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_getdictionaryitemoptions_state_root_hash(this.__wbg_ptr, ptr0);
    }
    /**
    * @returns {DictionaryItemStrParams | undefined}
    */
    get dictionary_item_params() {
        const ret = wasm.__wbg_get_getdictionaryitemoptions_dictionary_item_params(this.__wbg_ptr);
        return ret === 0 ? undefined : DictionaryItemStrParams.__wrap(ret);
    }
    /**
    * @param {DictionaryItemStrParams | undefined} [arg0]
    */
    set dictionary_item_params(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, DictionaryItemStrParams);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_getdictionaryitemoptions_dictionary_item_params(this.__wbg_ptr, ptr0);
    }
    /**
    * @returns {DictionaryItemIdentifier | undefined}
    */
    get dictionary_item_identifier() {
        const ret = wasm.__wbg_get_getdictionaryitemoptions_dictionary_item_identifier(this.__wbg_ptr);
        return ret === 0 ? undefined : DictionaryItemIdentifier.__wrap(ret);
    }
    /**
    * @param {DictionaryItemIdentifier | undefined} [arg0]
    */
    set dictionary_item_identifier(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, DictionaryItemIdentifier);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_getdictionaryitemoptions_dictionary_item_identifier(this.__wbg_ptr, ptr0);
    }
    /**
    * @returns {string | undefined}
    */
    get node_address() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_getdictionaryitemoptions_node_address(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string | undefined} [arg0]
    */
    set node_address(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_getdictionaryitemoptions_node_address(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {Verbosity | undefined}
    */
    get verbosity() {
        const ret = wasm.__wbg_get_getdictionaryitemoptions_verbosity(this.__wbg_ptr);
        return ret === 3 ? undefined : ret;
    }
    /**
    * @param {Verbosity | undefined} [arg0]
    */
    set verbosity(arg0) {
        wasm.__wbg_set_getdictionaryitemoptions_verbosity(this.__wbg_ptr, isLikeNone(arg0) ? 3 : arg0);
    }
}

const getEntityOptionsFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_getentityoptions_free(ptr >>> 0));
/**
*/
export class getEntityOptions {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(getEntityOptions.prototype);
        obj.__wbg_ptr = ptr;
        getEntityOptionsFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        getEntityOptionsFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_getentityoptions_free(ptr);
    }
    /**
    * @returns {EntityIdentifier | undefined}
    */
    get entity_identifier() {
        const ret = wasm.__wbg_get_getentityoptions_entity_identifier(this.__wbg_ptr);
        return ret === 0 ? undefined : EntityIdentifier.__wrap(ret);
    }
    /**
    * @param {EntityIdentifier | undefined} [arg0]
    */
    set entity_identifier(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, EntityIdentifier);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_getentityoptions_entity_identifier(this.__wbg_ptr, ptr0);
    }
    /**
    * @returns {string | undefined}
    */
    get entity_identifier_as_string() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_getaccountoptions_account_identifier_as_string(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string | undefined} [arg0]
    */
    set entity_identifier_as_string(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_getaccountoptions_account_identifier_as_string(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {string | undefined}
    */
    get maybe_block_id_as_string() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_getaccountoptions_maybe_block_id_as_string(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string | undefined} [arg0]
    */
    set maybe_block_id_as_string(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_getaccountoptions_maybe_block_id_as_string(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {BlockIdentifier | undefined}
    */
    get maybe_block_identifier() {
        const ret = wasm.__wbg_get_getaccountoptions_maybe_block_identifier(this.__wbg_ptr);
        return ret === 0 ? undefined : BlockIdentifier.__wrap(ret);
    }
    /**
    * @param {BlockIdentifier | undefined} [arg0]
    */
    set maybe_block_identifier(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, BlockIdentifier);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_getaccountoptions_maybe_block_identifier(this.__wbg_ptr, ptr0);
    }
    /**
    * @returns {string | undefined}
    */
    get node_address() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_getaccountoptions_node_address(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string | undefined} [arg0]
    */
    set node_address(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_getaccountoptions_node_address(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {Verbosity | undefined}
    */
    get verbosity() {
        const ret = wasm.__wbg_get_getaccountoptions_verbosity(this.__wbg_ptr);
        return ret === 3 ? undefined : ret;
    }
    /**
    * @param {Verbosity | undefined} [arg0]
    */
    set verbosity(arg0) {
        wasm.__wbg_set_getaccountoptions_verbosity(this.__wbg_ptr, isLikeNone(arg0) ? 3 : arg0);
    }
}

const getEraInfoOptionsFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_geterainfooptions_free(ptr >>> 0));
/**
*/
export class getEraInfoOptions {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(getEraInfoOptions.prototype);
        obj.__wbg_ptr = ptr;
        getEraInfoOptionsFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        getEraInfoOptionsFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_geterainfooptions_free(ptr);
    }
    /**
    * @returns {string | undefined}
    */
    get maybe_block_id_as_string() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_geterainfooptions_maybe_block_id_as_string(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string | undefined} [arg0]
    */
    set maybe_block_id_as_string(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_geterainfooptions_maybe_block_id_as_string(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {BlockIdentifier | undefined}
    */
    get maybe_block_identifier() {
        const ret = wasm.__wbg_get_getaccountoptions_maybe_block_identifier(this.__wbg_ptr);
        return ret === 0 ? undefined : BlockIdentifier.__wrap(ret);
    }
    /**
    * @param {BlockIdentifier | undefined} [arg0]
    */
    set maybe_block_identifier(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, BlockIdentifier);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_getaccountoptions_maybe_block_identifier(this.__wbg_ptr, ptr0);
    }
    /**
    * @returns {string | undefined}
    */
    get node_address() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_geterainfooptions_node_address(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string | undefined} [arg0]
    */
    set node_address(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_geterainfooptions_node_address(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {Verbosity | undefined}
    */
    get verbosity() {
        const ret = wasm.__wbg_get_geterainfooptions_verbosity(this.__wbg_ptr);
        return ret === 3 ? undefined : ret;
    }
    /**
    * @param {Verbosity | undefined} [arg0]
    */
    set verbosity(arg0) {
        wasm.__wbg_set_geterainfooptions_verbosity(this.__wbg_ptr, isLikeNone(arg0) ? 3 : arg0);
    }
}

const getEraSummaryOptionsFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_geterasummaryoptions_free(ptr >>> 0));
/**
* Options for the `get_era_summary` method.
*/
export class getEraSummaryOptions {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(getEraSummaryOptions.prototype);
        obj.__wbg_ptr = ptr;
        getEraSummaryOptionsFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        getEraSummaryOptionsFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_geterasummaryoptions_free(ptr);
    }
    /**
    * @returns {string | undefined}
    */
    get maybe_block_id_as_string() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_geterasummaryoptions_maybe_block_id_as_string(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string | undefined} [arg0]
    */
    set maybe_block_id_as_string(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_geterasummaryoptions_maybe_block_id_as_string(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {BlockIdentifier | undefined}
    */
    get maybe_block_identifier() {
        const ret = wasm.__wbg_get_geterasummaryoptions_maybe_block_identifier(this.__wbg_ptr);
        return ret === 0 ? undefined : BlockIdentifier.__wrap(ret);
    }
    /**
    * @param {BlockIdentifier | undefined} [arg0]
    */
    set maybe_block_identifier(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, BlockIdentifier);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_geterasummaryoptions_maybe_block_identifier(this.__wbg_ptr, ptr0);
    }
    /**
    * @returns {string | undefined}
    */
    get node_address() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_geterasummaryoptions_node_address(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string | undefined} [arg0]
    */
    set node_address(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_geterasummaryoptions_node_address(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {Verbosity | undefined}
    */
    get verbosity() {
        const ret = wasm.__wbg_get_geterasummaryoptions_verbosity(this.__wbg_ptr);
        return ret === 3 ? undefined : ret;
    }
    /**
    * @param {Verbosity | undefined} [arg0]
    */
    set verbosity(arg0) {
        wasm.__wbg_set_geterasummaryoptions_verbosity(this.__wbg_ptr, isLikeNone(arg0) ? 3 : arg0);
    }
}

const getSpeculativeExecDeployOptionsFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_getspeculativeexecdeployoptions_free(ptr >>> 0));
/**
* Options for speculative execution.
*/
export class getSpeculativeExecDeployOptions {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(getSpeculativeExecDeployOptions.prototype);
        obj.__wbg_ptr = ptr;
        getSpeculativeExecDeployOptionsFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        getSpeculativeExecDeployOptionsFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_getspeculativeexecdeployoptions_free(ptr);
    }
    /**
    * The deploy as a JSON string.
    * @returns {string | undefined}
    */
    get deploy_as_string() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_getspeculativeexecdeployoptions_deploy_as_string(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * The deploy as a JSON string.
    * @param {string | undefined} [arg0]
    */
    set deploy_as_string(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_getspeculativeexecdeployoptions_deploy_as_string(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * The deploy to execute.
    * @returns {Deploy | undefined}
    */
    get deploy() {
        const ret = wasm.__wbg_get_getspeculativeexecdeployoptions_deploy(this.__wbg_ptr);
        return ret === 0 ? undefined : Deploy.__wrap(ret);
    }
    /**
    * The deploy to execute.
    * @param {Deploy | undefined} [arg0]
    */
    set deploy(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, Deploy);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_getspeculativeexecdeployoptions_deploy(this.__wbg_ptr, ptr0);
    }
    /**
    * The block identifier as a string.
    * @returns {string | undefined}
    */
    get maybe_block_id_as_string() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_getspeculativeexecdeployoptions_maybe_block_id_as_string(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * The block identifier as a string.
    * @param {string | undefined} [arg0]
    */
    set maybe_block_id_as_string(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_getspeculativeexecdeployoptions_maybe_block_id_as_string(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * The block identifier.
    * @returns {BlockIdentifier | undefined}
    */
    get maybe_block_identifier() {
        const ret = wasm.__wbg_get_getspeculativeexecdeployoptions_maybe_block_identifier(this.__wbg_ptr);
        return ret === 0 ? undefined : BlockIdentifier.__wrap(ret);
    }
    /**
    * The block identifier.
    * @param {BlockIdentifier | undefined} [arg0]
    */
    set maybe_block_identifier(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, BlockIdentifier);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_getspeculativeexecdeployoptions_maybe_block_identifier(this.__wbg_ptr, ptr0);
    }
    /**
    * The node address.
    * @returns {string | undefined}
    */
    get node_address() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_getspeculativeexecdeployoptions_node_address(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * The node address.
    * @param {string | undefined} [arg0]
    */
    set node_address(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_getspeculativeexecdeployoptions_node_address(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * The verbosity level for logging.
    * @returns {Verbosity | undefined}
    */
    get verbosity() {
        const ret = wasm.__wbg_get_getspeculativeexecdeployoptions_verbosity(this.__wbg_ptr);
        return ret === 3 ? undefined : ret;
    }
    /**
    * The verbosity level for logging.
    * @param {Verbosity | undefined} [arg0]
    */
    set verbosity(arg0) {
        wasm.__wbg_set_getspeculativeexecdeployoptions_verbosity(this.__wbg_ptr, isLikeNone(arg0) ? 3 : arg0);
    }
}

const getSpeculativeExecTxnOptionsFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_getspeculativeexectxnoptions_free(ptr >>> 0));
/**
* Options for speculative execution.
*/
export class getSpeculativeExecTxnOptions {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(getSpeculativeExecTxnOptions.prototype);
        obj.__wbg_ptr = ptr;
        getSpeculativeExecTxnOptionsFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        getSpeculativeExecTxnOptionsFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_getspeculativeexectxnoptions_free(ptr);
    }
    /**
    * The transaction as a JSON string.
    * @returns {string | undefined}
    */
    get transaction_as_string() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_getspeculativeexectxnoptions_transaction_as_string(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * The transaction as a JSON string.
    * @param {string | undefined} [arg0]
    */
    set transaction_as_string(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_getspeculativeexectxnoptions_transaction_as_string(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * The transaction to execute.
    * @returns {Transaction | undefined}
    */
    get transaction() {
        const ret = wasm.__wbg_get_getspeculativeexectxnoptions_transaction(this.__wbg_ptr);
        return ret === 0 ? undefined : Transaction.__wrap(ret);
    }
    /**
    * The transaction to execute.
    * @param {Transaction | undefined} [arg0]
    */
    set transaction(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, Transaction);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_getspeculativeexectxnoptions_transaction(this.__wbg_ptr, ptr0);
    }
    /**
    * The block identifier as a string.
    * @returns {string | undefined}
    */
    get maybe_block_id_as_string() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_getspeculativeexectxnoptions_maybe_block_id_as_string(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * The block identifier as a string.
    * @param {string | undefined} [arg0]
    */
    set maybe_block_id_as_string(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_getspeculativeexectxnoptions_maybe_block_id_as_string(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * The block identifier.
    * @returns {BlockIdentifier | undefined}
    */
    get maybe_block_identifier() {
        const ret = wasm.__wbg_get_getspeculativeexectxnoptions_maybe_block_identifier(this.__wbg_ptr);
        return ret === 0 ? undefined : BlockIdentifier.__wrap(ret);
    }
    /**
    * The block identifier.
    * @param {BlockIdentifier | undefined} [arg0]
    */
    set maybe_block_identifier(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, BlockIdentifier);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_getspeculativeexectxnoptions_maybe_block_identifier(this.__wbg_ptr, ptr0);
    }
    /**
    * The node address.
    * @returns {string | undefined}
    */
    get node_address() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_getspeculativeexectxnoptions_node_address(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * The node address.
    * @param {string | undefined} [arg0]
    */
    set node_address(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_getspeculativeexectxnoptions_node_address(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * The verbosity level for logging.
    * @returns {Verbosity | undefined}
    */
    get verbosity() {
        const ret = wasm.__wbg_get_getspeculativeexectxnoptions_verbosity(this.__wbg_ptr);
        return ret === 3 ? undefined : ret;
    }
    /**
    * The verbosity level for logging.
    * @param {Verbosity | undefined} [arg0]
    */
    set verbosity(arg0) {
        wasm.__wbg_set_getspeculativeexectxnoptions_verbosity(this.__wbg_ptr, isLikeNone(arg0) ? 3 : arg0);
    }
}

const getStateRootHashOptionsFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_getstateroothashoptions_free(ptr >>> 0));
/**
* Options for the `get_state_root_hash` method.
*/
export class getStateRootHashOptions {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(getStateRootHashOptions.prototype);
        obj.__wbg_ptr = ptr;
        getStateRootHashOptionsFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        getStateRootHashOptionsFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_getstateroothashoptions_free(ptr);
    }
    /**
    * @returns {string | undefined}
    */
    get maybe_block_id_as_string() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_getstateroothashoptions_maybe_block_id_as_string(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string | undefined} [arg0]
    */
    set maybe_block_id_as_string(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_getstateroothashoptions_maybe_block_id_as_string(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {BlockIdentifier | undefined}
    */
    get maybe_block_identifier() {
        const ret = wasm.__wbg_get_getstateroothashoptions_maybe_block_identifier(this.__wbg_ptr);
        return ret === 0 ? undefined : BlockIdentifier.__wrap(ret);
    }
    /**
    * @param {BlockIdentifier | undefined} [arg0]
    */
    set maybe_block_identifier(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, BlockIdentifier);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_getstateroothashoptions_maybe_block_identifier(this.__wbg_ptr, ptr0);
    }
    /**
    * @returns {string | undefined}
    */
    get node_address() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_getstateroothashoptions_node_address(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string | undefined} [arg0]
    */
    set node_address(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_getstateroothashoptions_node_address(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {Verbosity | undefined}
    */
    get verbosity() {
        const ret = wasm.__wbg_get_getstateroothashoptions_verbosity(this.__wbg_ptr);
        return ret === 3 ? undefined : ret;
    }
    /**
    * @param {Verbosity | undefined} [arg0]
    */
    set verbosity(arg0) {
        wasm.__wbg_set_getstateroothashoptions_verbosity(this.__wbg_ptr, isLikeNone(arg0) ? 3 : arg0);
    }
}

const getTransactionOptionsFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_gettransactionoptions_free(ptr >>> 0));
/**
* Options for the `get_transaction` method.
*/
export class getTransactionOptions {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(getTransactionOptions.prototype);
        obj.__wbg_ptr = ptr;
        getTransactionOptionsFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        getTransactionOptionsFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_gettransactionoptions_free(ptr);
    }
    /**
    * @returns {string | undefined}
    */
    get transaction_hash_as_string() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_getdeployoptions_deploy_hash_as_string(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string | undefined} [arg0]
    */
    set transaction_hash_as_string(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_getdeployoptions_deploy_hash_as_string(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {TransactionHash | undefined}
    */
    get transaction_hash() {
        const ret = wasm.__wbg_get_gettransactionoptions_transaction_hash(this.__wbg_ptr);
        return ret === 0 ? undefined : TransactionHash.__wrap(ret);
    }
    /**
    * @param {TransactionHash | undefined} [arg0]
    */
    set transaction_hash(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, TransactionHash);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_gettransactionoptions_transaction_hash(this.__wbg_ptr, ptr0);
    }
    /**
    * @returns {boolean | undefined}
    */
    get finalized_approvals() {
        const ret = wasm.__wbg_get_getdeployoptions_finalized_approvals(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
    * @param {boolean | undefined} [arg0]
    */
    set finalized_approvals(arg0) {
        wasm.__wbg_set_getdeployoptions_finalized_approvals(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
    * @returns {string | undefined}
    */
    get node_address() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_getdeployoptions_node_address(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string | undefined} [arg0]
    */
    set node_address(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_getdeployoptions_node_address(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {Verbosity | undefined}
    */
    get verbosity() {
        const ret = wasm.__wbg_get_getdeployoptions_verbosity(this.__wbg_ptr);
        return ret === 3 ? undefined : ret;
    }
    /**
    * @param {Verbosity | undefined} [arg0]
    */
    set verbosity(arg0) {
        wasm.__wbg_set_getdeployoptions_verbosity(this.__wbg_ptr, isLikeNone(arg0) ? 3 : arg0);
    }
}

const queryBalanceDetailsOptionsFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_querybalancedetailsoptions_free(ptr >>> 0));
/**
* Options for the `query_balance` method.
*/
export class queryBalanceDetailsOptions {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(queryBalanceDetailsOptions.prototype);
        obj.__wbg_ptr = ptr;
        queryBalanceDetailsOptionsFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        queryBalanceDetailsOptionsFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_querybalancedetailsoptions_free(ptr);
    }
    /**
    * @returns {string | undefined}
    */
    get purse_identifier_as_string() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_querybalancedetailsoptions_purse_identifier_as_string(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string | undefined} [arg0]
    */
    set purse_identifier_as_string(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_querybalancedetailsoptions_purse_identifier_as_string(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {PurseIdentifier | undefined}
    */
    get purse_identifier() {
        const ret = wasm.__wbg_get_querybalancedetailsoptions_purse_identifier(this.__wbg_ptr);
        return ret === 0 ? undefined : PurseIdentifier.__wrap(ret);
    }
    /**
    * @param {PurseIdentifier | undefined} [arg0]
    */
    set purse_identifier(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, PurseIdentifier);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_querybalancedetailsoptions_purse_identifier(this.__wbg_ptr, ptr0);
    }
    /**
    * @returns {GlobalStateIdentifier | undefined}
    */
    get global_state_identifier() {
        const ret = wasm.__wbg_get_querybalancedetailsoptions_global_state_identifier(this.__wbg_ptr);
        return ret === 0 ? undefined : GlobalStateIdentifier.__wrap(ret);
    }
    /**
    * @param {GlobalStateIdentifier | undefined} [arg0]
    */
    set global_state_identifier(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, GlobalStateIdentifier);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_querybalancedetailsoptions_global_state_identifier(this.__wbg_ptr, ptr0);
    }
    /**
    * @returns {string | undefined}
    */
    get state_root_hash_as_string() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_querybalancedetailsoptions_state_root_hash_as_string(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string | undefined} [arg0]
    */
    set state_root_hash_as_string(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_querybalancedetailsoptions_state_root_hash_as_string(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {Digest | undefined}
    */
    get state_root_hash() {
        const ret = wasm.__wbg_get_querybalancedetailsoptions_state_root_hash(this.__wbg_ptr);
        return ret === 0 ? undefined : Digest.__wrap(ret);
    }
    /**
    * @param {Digest | undefined} [arg0]
    */
    set state_root_hash(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, Digest);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_querybalancedetailsoptions_state_root_hash(this.__wbg_ptr, ptr0);
    }
    /**
    * @returns {string | undefined}
    */
    get maybe_block_id_as_string() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_querybalancedetailsoptions_maybe_block_id_as_string(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string | undefined} [arg0]
    */
    set maybe_block_id_as_string(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_querybalancedetailsoptions_maybe_block_id_as_string(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {string | undefined}
    */
    get node_address() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_querybalancedetailsoptions_node_address(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string | undefined} [arg0]
    */
    set node_address(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_querybalancedetailsoptions_node_address(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {Verbosity | undefined}
    */
    get verbosity() {
        const ret = wasm.__wbg_get_querybalancedetailsoptions_verbosity(this.__wbg_ptr);
        return ret === 3 ? undefined : ret;
    }
    /**
    * @param {Verbosity | undefined} [arg0]
    */
    set verbosity(arg0) {
        wasm.__wbg_set_querybalancedetailsoptions_verbosity(this.__wbg_ptr, isLikeNone(arg0) ? 3 : arg0);
    }
}

const queryBalanceOptionsFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_querybalanceoptions_free(ptr >>> 0));
/**
* Options for the `query_balance` method.
*/
export class queryBalanceOptions {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(queryBalanceOptions.prototype);
        obj.__wbg_ptr = ptr;
        queryBalanceOptionsFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        queryBalanceOptionsFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_querybalanceoptions_free(ptr);
    }
    /**
    * @returns {string | undefined}
    */
    get purse_identifier_as_string() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_querybalanceoptions_purse_identifier_as_string(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string | undefined} [arg0]
    */
    set purse_identifier_as_string(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_querybalanceoptions_purse_identifier_as_string(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {PurseIdentifier | undefined}
    */
    get purse_identifier() {
        const ret = wasm.__wbg_get_querybalanceoptions_purse_identifier(this.__wbg_ptr);
        return ret === 0 ? undefined : PurseIdentifier.__wrap(ret);
    }
    /**
    * @param {PurseIdentifier | undefined} [arg0]
    */
    set purse_identifier(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, PurseIdentifier);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_querybalanceoptions_purse_identifier(this.__wbg_ptr, ptr0);
    }
    /**
    * @returns {GlobalStateIdentifier | undefined}
    */
    get global_state_identifier() {
        const ret = wasm.__wbg_get_querybalanceoptions_global_state_identifier(this.__wbg_ptr);
        return ret === 0 ? undefined : GlobalStateIdentifier.__wrap(ret);
    }
    /**
    * @param {GlobalStateIdentifier | undefined} [arg0]
    */
    set global_state_identifier(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, GlobalStateIdentifier);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_querybalanceoptions_global_state_identifier(this.__wbg_ptr, ptr0);
    }
    /**
    * @returns {string | undefined}
    */
    get state_root_hash_as_string() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_querybalanceoptions_state_root_hash_as_string(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string | undefined} [arg0]
    */
    set state_root_hash_as_string(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_querybalanceoptions_state_root_hash_as_string(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {Digest | undefined}
    */
    get state_root_hash() {
        const ret = wasm.__wbg_get_querybalanceoptions_state_root_hash(this.__wbg_ptr);
        return ret === 0 ? undefined : Digest.__wrap(ret);
    }
    /**
    * @param {Digest | undefined} [arg0]
    */
    set state_root_hash(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, Digest);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_querybalanceoptions_state_root_hash(this.__wbg_ptr, ptr0);
    }
    /**
    * @returns {string | undefined}
    */
    get maybe_block_id_as_string() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_querybalanceoptions_maybe_block_id_as_string(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string | undefined} [arg0]
    */
    set maybe_block_id_as_string(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_querybalanceoptions_maybe_block_id_as_string(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {string | undefined}
    */
    get node_address() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_querybalanceoptions_node_address(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string | undefined} [arg0]
    */
    set node_address(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_querybalanceoptions_node_address(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {Verbosity | undefined}
    */
    get verbosity() {
        const ret = wasm.__wbg_get_querybalanceoptions_verbosity(this.__wbg_ptr);
        return ret === 3 ? undefined : ret;
    }
    /**
    * @param {Verbosity | undefined} [arg0]
    */
    set verbosity(arg0) {
        wasm.__wbg_set_querybalanceoptions_verbosity(this.__wbg_ptr, isLikeNone(arg0) ? 3 : arg0);
    }
}

const queryContractDictOptionsFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_querycontractdictoptions_free(ptr >>> 0));
/**
*/
export class queryContractDictOptions {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(queryContractDictOptions.prototype);
        obj.__wbg_ptr = ptr;
        queryContractDictOptionsFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        queryContractDictOptionsFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_querycontractdictoptions_free(ptr);
    }
    /**
    * @returns {string | undefined}
    */
    get state_root_hash_as_string() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_getdictionaryitemoptions_state_root_hash_as_string(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string | undefined} [arg0]
    */
    set state_root_hash_as_string(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_getdictionaryitemoptions_state_root_hash_as_string(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {Digest | undefined}
    */
    get state_root_hash() {
        const ret = wasm.__wbg_get_getdictionaryitemoptions_state_root_hash(this.__wbg_ptr);
        return ret === 0 ? undefined : Digest.__wrap(ret);
    }
    /**
    * @param {Digest | undefined} [arg0]
    */
    set state_root_hash(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, Digest);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_getdictionaryitemoptions_state_root_hash(this.__wbg_ptr, ptr0);
    }
    /**
    * @returns {DictionaryItemStrParams | undefined}
    */
    get dictionary_item_params() {
        const ret = wasm.__wbg_get_getdictionaryitemoptions_dictionary_item_params(this.__wbg_ptr);
        return ret === 0 ? undefined : DictionaryItemStrParams.__wrap(ret);
    }
    /**
    * @param {DictionaryItemStrParams | undefined} [arg0]
    */
    set dictionary_item_params(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, DictionaryItemStrParams);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_getdictionaryitemoptions_dictionary_item_params(this.__wbg_ptr, ptr0);
    }
    /**
    * @returns {DictionaryItemIdentifier | undefined}
    */
    get dictionary_item_identifier() {
        const ret = wasm.__wbg_get_getdictionaryitemoptions_dictionary_item_identifier(this.__wbg_ptr);
        return ret === 0 ? undefined : DictionaryItemIdentifier.__wrap(ret);
    }
    /**
    * @param {DictionaryItemIdentifier | undefined} [arg0]
    */
    set dictionary_item_identifier(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, DictionaryItemIdentifier);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_getdictionaryitemoptions_dictionary_item_identifier(this.__wbg_ptr, ptr0);
    }
    /**
    * @returns {string | undefined}
    */
    get node_address() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_getdictionaryitemoptions_node_address(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string | undefined} [arg0]
    */
    set node_address(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_getdictionaryitemoptions_node_address(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {Verbosity | undefined}
    */
    get verbosity() {
        const ret = wasm.__wbg_get_getdictionaryitemoptions_verbosity(this.__wbg_ptr);
        return ret === 3 ? undefined : ret;
    }
    /**
    * @param {Verbosity | undefined} [arg0]
    */
    set verbosity(arg0) {
        wasm.__wbg_set_getdictionaryitemoptions_verbosity(this.__wbg_ptr, isLikeNone(arg0) ? 3 : arg0);
    }
}

const queryContractKeyOptionsFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_querycontractkeyoptions_free(ptr >>> 0));
/**
*/
export class queryContractKeyOptions {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(queryContractKeyOptions.prototype);
        obj.__wbg_ptr = ptr;
        queryContractKeyOptionsFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        queryContractKeyOptionsFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_querycontractkeyoptions_free(ptr);
    }
    /**
    * @returns {GlobalStateIdentifier | undefined}
    */
    get global_state_identifier() {
        const ret = wasm.__wbg_get_querycontractkeyoptions_global_state_identifier(this.__wbg_ptr);
        return ret === 0 ? undefined : GlobalStateIdentifier.__wrap(ret);
    }
    /**
    * @param {GlobalStateIdentifier | undefined} [arg0]
    */
    set global_state_identifier(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, GlobalStateIdentifier);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_querycontractkeyoptions_global_state_identifier(this.__wbg_ptr, ptr0);
    }
    /**
    * @returns {string | undefined}
    */
    get state_root_hash_as_string() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_querycontractkeyoptions_state_root_hash_as_string(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string | undefined} [arg0]
    */
    set state_root_hash_as_string(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_querycontractkeyoptions_state_root_hash_as_string(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {Digest | undefined}
    */
    get state_root_hash() {
        const ret = wasm.__wbg_get_querycontractkeyoptions_state_root_hash(this.__wbg_ptr);
        return ret === 0 ? undefined : Digest.__wrap(ret);
    }
    /**
    * @param {Digest | undefined} [arg0]
    */
    set state_root_hash(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, Digest);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_querycontractkeyoptions_state_root_hash(this.__wbg_ptr, ptr0);
    }
    /**
    * @returns {string | undefined}
    */
    get maybe_block_id_as_string() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_querycontractkeyoptions_maybe_block_id_as_string(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string | undefined} [arg0]
    */
    set maybe_block_id_as_string(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_querycontractkeyoptions_maybe_block_id_as_string(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {string | undefined}
    */
    get contract_key_as_string() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_querycontractkeyoptions_contract_key_as_string(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string | undefined} [arg0]
    */
    set contract_key_as_string(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_querycontractkeyoptions_contract_key_as_string(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {Key | undefined}
    */
    get contract_key() {
        const ret = wasm.__wbg_get_querycontractkeyoptions_contract_key(this.__wbg_ptr);
        return ret === 0 ? undefined : Key.__wrap(ret);
    }
    /**
    * @param {Key | undefined} [arg0]
    */
    set contract_key(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, Key);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_querycontractkeyoptions_contract_key(this.__wbg_ptr, ptr0);
    }
    /**
    * @returns {string | undefined}
    */
    get path_as_string() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_querycontractkeyoptions_path_as_string(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string | undefined} [arg0]
    */
    set path_as_string(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_querycontractkeyoptions_path_as_string(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {Path | undefined}
    */
    get path() {
        const ret = wasm.__wbg_get_querycontractkeyoptions_path(this.__wbg_ptr);
        return ret === 0 ? undefined : Path.__wrap(ret);
    }
    /**
    * @param {Path | undefined} [arg0]
    */
    set path(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, Path);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_querycontractkeyoptions_path(this.__wbg_ptr, ptr0);
    }
    /**
    * @returns {string | undefined}
    */
    get node_address() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_querycontractkeyoptions_node_address(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string | undefined} [arg0]
    */
    set node_address(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_querycontractkeyoptions_node_address(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {Verbosity | undefined}
    */
    get verbosity() {
        const ret = wasm.__wbg_get_querycontractkeyoptions_verbosity(this.__wbg_ptr);
        return ret === 3 ? undefined : ret;
    }
    /**
    * @param {Verbosity | undefined} [arg0]
    */
    set verbosity(arg0) {
        wasm.__wbg_set_querycontractkeyoptions_verbosity(this.__wbg_ptr, isLikeNone(arg0) ? 3 : arg0);
    }
}

const queryGlobalStateOptionsFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_queryglobalstateoptions_free(ptr >>> 0));
/**
* Options for the `query_global_state` method.
*/
export class queryGlobalStateOptions {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(queryGlobalStateOptions.prototype);
        obj.__wbg_ptr = ptr;
        queryGlobalStateOptionsFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        queryGlobalStateOptionsFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_queryglobalstateoptions_free(ptr);
    }
    /**
    * @returns {GlobalStateIdentifier | undefined}
    */
    get global_state_identifier() {
        const ret = wasm.__wbg_get_queryglobalstateoptions_global_state_identifier(this.__wbg_ptr);
        return ret === 0 ? undefined : GlobalStateIdentifier.__wrap(ret);
    }
    /**
    * @param {GlobalStateIdentifier | undefined} [arg0]
    */
    set global_state_identifier(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, GlobalStateIdentifier);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_queryglobalstateoptions_global_state_identifier(this.__wbg_ptr, ptr0);
    }
    /**
    * @returns {string | undefined}
    */
    get state_root_hash_as_string() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_queryglobalstateoptions_state_root_hash_as_string(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string | undefined} [arg0]
    */
    set state_root_hash_as_string(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_queryglobalstateoptions_state_root_hash_as_string(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {Digest | undefined}
    */
    get state_root_hash() {
        const ret = wasm.__wbg_get_queryglobalstateoptions_state_root_hash(this.__wbg_ptr);
        return ret === 0 ? undefined : Digest.__wrap(ret);
    }
    /**
    * @param {Digest | undefined} [arg0]
    */
    set state_root_hash(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, Digest);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_queryglobalstateoptions_state_root_hash(this.__wbg_ptr, ptr0);
    }
    /**
    * @returns {string | undefined}
    */
    get maybe_block_id_as_string() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_queryglobalstateoptions_maybe_block_id_as_string(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string | undefined} [arg0]
    */
    set maybe_block_id_as_string(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_queryglobalstateoptions_maybe_block_id_as_string(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {string | undefined}
    */
    get key_as_string() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_queryglobalstateoptions_key_as_string(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string | undefined} [arg0]
    */
    set key_as_string(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_queryglobalstateoptions_key_as_string(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {Key | undefined}
    */
    get key() {
        const ret = wasm.__wbg_get_queryglobalstateoptions_key(this.__wbg_ptr);
        return ret === 0 ? undefined : Key.__wrap(ret);
    }
    /**
    * @param {Key | undefined} [arg0]
    */
    set key(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, Key);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_queryglobalstateoptions_key(this.__wbg_ptr, ptr0);
    }
    /**
    * @returns {string | undefined}
    */
    get path_as_string() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_queryglobalstateoptions_path_as_string(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string | undefined} [arg0]
    */
    set path_as_string(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_queryglobalstateoptions_path_as_string(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {Path | undefined}
    */
    get path() {
        const ret = wasm.__wbg_get_queryglobalstateoptions_path(this.__wbg_ptr);
        return ret === 0 ? undefined : Path.__wrap(ret);
    }
    /**
    * @param {Path | undefined} [arg0]
    */
    set path(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, Path);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_queryglobalstateoptions_path(this.__wbg_ptr, ptr0);
    }
    /**
    * @returns {string | undefined}
    */
    get node_address() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_queryglobalstateoptions_node_address(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string | undefined} [arg0]
    */
    set node_address(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_queryglobalstateoptions_node_address(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {Verbosity | undefined}
    */
    get verbosity() {
        const ret = wasm.__wbg_get_queryglobalstateoptions_verbosity(this.__wbg_ptr);
        return ret === 3 ? undefined : ret;
    }
    /**
    * @param {Verbosity | undefined} [arg0]
    */
    set verbosity(arg0) {
        wasm.__wbg_set_queryglobalstateoptions_verbosity(this.__wbg_ptr, isLikeNone(arg0) ? 3 : arg0);
    }
}

async function __wbg_load(module, imports) {
    if (typeof Response === 'function' && module instanceof Response) {
        if (typeof WebAssembly.instantiateStreaming === 'function') {
            try {
                return await WebAssembly.instantiateStreaming(module, imports);

            } catch (e) {
                if (module.headers.get('Content-Type') != 'application/wasm') {
                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

                } else {
                    throw e;
                }
            }
        }

        const bytes = await module.arrayBuffer();
        return await WebAssembly.instantiate(bytes, imports);

    } else {
        const instance = await WebAssembly.instantiate(module, imports);

        if (instance instanceof WebAssembly.Instance) {
            return { instance, module };

        } else {
            return instance;
        }
    }
}

function __wbg_get_imports() {
    const imports = {};
    imports.wbg = {};
    imports.wbg.__wbindgen_object_drop_ref = function(arg0) {
        takeObject(arg0);
    };
    imports.wbg.__wbindgen_string_new = function(arg0, arg1) {
        const ret = getStringFromWasm0(arg0, arg1);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_error_d52bf4e1868fa715 = function(arg0, arg1) {
        console.error(getStringFromWasm0(arg0, arg1));
    };
    imports.wbg.__wbindgen_error_new = function(arg0, arg1) {
        const ret = new Error(getStringFromWasm0(arg0, arg1));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_speculativeexectxnresult_new = function(arg0) {
        const ret = SpeculativeExecTxnResult.__wrap(arg0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_getchainspecresult_new = function(arg0) {
        const ret = GetChainspecResult.__wrap(arg0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_speculativeexecresult_new = function(arg0) {
        const ret = SpeculativeExecResult.__wrap(arg0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_geterasummaryresult_new = function(arg0) {
        const ret = GetEraSummaryResult.__wrap(arg0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_queryglobalstateresult_new = function(arg0) {
        const ret = QueryGlobalStateResult.__wrap(arg0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_putdeployresult_new = function(arg0) {
        const ret = PutDeployResult.__wrap(arg0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_object_clone_ref = function(arg0) {
        const ret = getObject(arg0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_getauctioninforesult_new = function(arg0) {
        const ret = GetAuctionInfoResult.__wrap(arg0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_getblocktransfersresult_new = function(arg0) {
        const ret = GetBlockTransfersResult.__wrap(arg0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_getbalanceresult_new = function(arg0) {
        const ret = GetBalanceResult.__wrap(arg0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_getaddressableentityresult_new = function(arg0) {
        const ret = GetAddressableEntityResult.__wrap(arg0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_getnodestatusresult_new = function(arg0) {
        const ret = GetNodeStatusResult.__wrap(arg0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_puttransactionresult_new = function(arg0) {
        const ret = PutTransactionResult.__wrap(arg0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_gettransactionresult_new = function(arg0) {
        const ret = GetTransactionResult.__wrap(arg0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_querybalancedetailsresult_new = function(arg0) {
        const ret = QueryBalanceDetailsResult.__wrap(arg0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_getstateroothashresult_new = function(arg0) {
        const ret = GetStateRootHashResult.__wrap(arg0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_getaccountresult_new = function(arg0) {
        const ret = GetAccountResult.__wrap(arg0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_getblockresult_new = function(arg0) {
        const ret = GetBlockResult.__wrap(arg0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_geterainforesult_new = function(arg0) {
        const ret = GetEraInfoResult.__wrap(arg0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_getdictionaryitemresult_new = function(arg0) {
        const ret = GetDictionaryItemResult.__wrap(arg0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_getvalidatorchangesresult_new = function(arg0) {
        const ret = GetValidatorChangesResult.__wrap(arg0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_getdeployresult_new = function(arg0) {
        const ret = GetDeployResult.__wrap(arg0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_listrpcsresult_new = function(arg0) {
        const ret = ListRpcsResult.__wrap(arg0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_getpeersresult_new = function(arg0) {
        const ret = GetPeersResult.__wrap(arg0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_querybalanceresult_new = function(arg0) {
        const ret = QueryBalanceResult.__wrap(arg0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_string_get = function(arg0, arg1) {
        const obj = getObject(arg1);
        const ret = typeof(obj) === 'string' ? obj : undefined;
        var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len1;
        getInt32Memory0()[arg0 / 4 + 0] = ptr1;
    };
    imports.wbg.__wbg_messages_new = function(arg0) {
        const ret = Messages.__wrap(arg0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_cb_drop = function(arg0) {
        const obj = takeObject(arg0).original;
        if (obj.cnt-- == 1) {
            obj.a = 0;
            return true;
        }
        const ret = false;
        return ret;
    };
    imports.wbg.__wbindgen_is_null = function(arg0) {
        const ret = getObject(arg0) === null;
        return ret;
    };
    imports.wbg.__wbg_messages_unwrap = function(arg0) {
        const ret = Messages.__unwrap(takeObject(arg0));
        return ret;
    };
    imports.wbg.__wbg_deploysubscription_unwrap = function(arg0) {
        const ret = DeploySubscription.__unwrap(takeObject(arg0));
        return ret;
    };
    imports.wbg.__wbg_log_5199e4d2d51afa95 = function(arg0, arg1) {
        console.log(getStringFromWasm0(arg0, arg1));
    };
    imports.wbg.__wbindgen_jsval_eq = function(arg0, arg1) {
        const ret = getObject(arg0) === getObject(arg1);
        return ret;
    };
    imports.wbg.__wbindgen_is_undefined = function(arg0) {
        const ret = getObject(arg0) === undefined;
        return ret;
    };
    imports.wbg.__wbg_fetch_bc7c8e27076a5c84 = function(arg0) {
        const ret = fetch(getObject(arg0));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_getReader_ab94afcb5cb7689a = function() { return handleError(function (arg0) {
        const ret = getObject(arg0).getReader();
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_done_2ffa852272310e47 = function(arg0) {
        const ret = getObject(arg0).done;
        return ret;
    };
    imports.wbg.__wbg_value_9f6eeb1e2aab8d96 = function(arg0) {
        const ret = getObject(arg0).value;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_fetch_eadcbc7351113537 = function(arg0) {
        const ret = fetch(getObject(arg0));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_queueMicrotask_481971b0d87f3dd4 = function(arg0) {
        queueMicrotask(getObject(arg0));
    };
    imports.wbg.__wbg_queueMicrotask_3cbae2ec6b6cd3d6 = function(arg0) {
        const ret = getObject(arg0).queueMicrotask;
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_is_function = function(arg0) {
        const ret = typeof(getObject(arg0)) === 'function';
        return ret;
    };
    imports.wbg.__wbg_fetch_921fad6ef9e883dd = function(arg0, arg1) {
        const ret = getObject(arg0).fetch(getObject(arg1));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_new_ab6fd82b10560829 = function() { return handleError(function () {
        const ret = new Headers();
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_append_7bfcb4937d1d5e29 = function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
        getObject(arg0).append(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
    }, arguments) };
    imports.wbg.__wbg_instanceof_Response_849eb93e75734b6e = function(arg0) {
        let result;
        try {
            result = getObject(arg0) instanceof Response;
        } catch (_) {
            result = false;
        }
        const ret = result;
        return ret;
    };
    imports.wbg.__wbg_url_5f6dc4009ac5f99d = function(arg0, arg1) {
        const ret = getObject(arg1).url;
        const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len1;
        getInt32Memory0()[arg0 / 4 + 0] = ptr1;
    };
    imports.wbg.__wbg_status_61a01141acd3cf74 = function(arg0) {
        const ret = getObject(arg0).status;
        return ret;
    };
    imports.wbg.__wbg_headers_9620bfada380764a = function(arg0) {
        const ret = getObject(arg0).headers;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_body_9545a94f397829db = function(arg0) {
        const ret = getObject(arg0).body;
        return isLikeNone(ret) ? 0 : addHeapObject(ret);
    };
    imports.wbg.__wbg_arrayBuffer_29931d52c7206b02 = function() { return handleError(function (arg0) {
        const ret = getObject(arg0).arrayBuffer();
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_byobRequest_72fca99f9c32c193 = function(arg0) {
        const ret = getObject(arg0).byobRequest;
        return isLikeNone(ret) ? 0 : addHeapObject(ret);
    };
    imports.wbg.__wbg_close_184931724d961ccc = function() { return handleError(function (arg0) {
        getObject(arg0).close();
    }, arguments) };
    imports.wbg.__wbg_read_e7d0f8a49be01d86 = function(arg0) {
        const ret = getObject(arg0).read();
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_releaseLock_5c49db976c08b864 = function(arg0) {
        getObject(arg0).releaseLock();
    };
    imports.wbg.__wbg_cancel_6ee33d4006737aef = function(arg0) {
        const ret = getObject(arg0).cancel();
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_newwithstrandinit_3fd6fba4083ff2d0 = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = new Request(getStringFromWasm0(arg0, arg1), getObject(arg2));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_signal_a61f78a3478fd9bc = function(arg0) {
        const ret = getObject(arg0).signal;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_new_0d76b0581eca6298 = function() { return handleError(function () {
        const ret = new AbortController();
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_abort_2aa7521d5690750e = function(arg0) {
        getObject(arg0).abort();
    };
    imports.wbg.__wbg_view_7f0ce470793a340f = function(arg0) {
        const ret = getObject(arg0).view;
        return isLikeNone(ret) ? 0 : addHeapObject(ret);
    };
    imports.wbg.__wbg_respond_b1a43b2e3a06d525 = function() { return handleError(function (arg0, arg1) {
        getObject(arg0).respond(arg1 >>> 0);
    }, arguments) };
    imports.wbg.__wbg_close_a994f9425dab445c = function() { return handleError(function (arg0) {
        getObject(arg0).close();
    }, arguments) };
    imports.wbg.__wbg_enqueue_ea194723156c0cc2 = function() { return handleError(function (arg0, arg1) {
        getObject(arg0).enqueue(getObject(arg1));
    }, arguments) };
    imports.wbg.__wbg_crypto_1d1f22824a6a080c = function(arg0) {
        const ret = getObject(arg0).crypto;
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_is_object = function(arg0) {
        const val = getObject(arg0);
        const ret = typeof(val) === 'object' && val !== null;
        return ret;
    };
    imports.wbg.__wbg_process_4a72847cc503995b = function(arg0) {
        const ret = getObject(arg0).process;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_versions_f686565e586dd935 = function(arg0) {
        const ret = getObject(arg0).versions;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_node_104a2ff8d6ea03a2 = function(arg0) {
        const ret = getObject(arg0).node;
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_is_string = function(arg0) {
        const ret = typeof(getObject(arg0)) === 'string';
        return ret;
    };
    imports.wbg.__wbg_require_cca90b1a94a0255b = function() { return handleError(function () {
        const ret = module.require;
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_msCrypto_eb05e62b530a1508 = function(arg0) {
        const ret = getObject(arg0).msCrypto;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_randomFillSync_5c9c955aa56b6049 = function() { return handleError(function (arg0, arg1) {
        getObject(arg0).randomFillSync(takeObject(arg1));
    }, arguments) };
    imports.wbg.__wbg_getRandomValues_3aa56aa6edec874c = function() { return handleError(function (arg0, arg1) {
        getObject(arg0).getRandomValues(getObject(arg1));
    }, arguments) };
    imports.wbg.__wbg_get_bd8e338fbd5f5cc8 = function(arg0, arg1) {
        const ret = getObject(arg0)[arg1 >>> 0];
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_length_cd7af8117672b8b8 = function(arg0) {
        const ret = getObject(arg0).length;
        return ret;
    };
    imports.wbg.__wbg_new_16b304a2cfa7ff4a = function() {
        const ret = new Array();
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_newnoargs_e258087cd0daa0ea = function(arg0, arg1) {
        const ret = new Function(getStringFromWasm0(arg0, arg1));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_next_40fc327bfc8770e6 = function(arg0) {
        const ret = getObject(arg0).next;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_next_196c84450b364254 = function() { return handleError(function (arg0) {
        const ret = getObject(arg0).next();
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_done_298b57d23c0fc80c = function(arg0) {
        const ret = getObject(arg0).done;
        return ret;
    };
    imports.wbg.__wbg_value_d93c65011f51a456 = function(arg0) {
        const ret = getObject(arg0).value;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_iterator_2cee6dadfd956dfa = function() {
        const ret = Symbol.iterator;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_get_e3c254076557e348 = function() { return handleError(function (arg0, arg1) {
        const ret = Reflect.get(getObject(arg0), getObject(arg1));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_call_27c0f87801dedf93 = function() { return handleError(function (arg0, arg1) {
        const ret = getObject(arg0).call(getObject(arg1));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_new_72fb9a18b5ae2624 = function() {
        const ret = new Object();
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_self_ce0dbfc45cf2f5be = function() { return handleError(function () {
        const ret = self.self;
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_window_c6fb939a7f436783 = function() { return handleError(function () {
        const ret = window.window;
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_globalThis_d1e6af4856ba331b = function() { return handleError(function () {
        const ret = globalThis.globalThis;
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_global_207b558942527489 = function() { return handleError(function () {
        const ret = global.global;
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_push_a5b05aedc7234f9f = function(arg0, arg1) {
        const ret = getObject(arg0).push(getObject(arg1));
        return ret;
    };
    imports.wbg.__wbg_new_28c511d9baebfa89 = function(arg0, arg1) {
        const ret = new Error(getStringFromWasm0(arg0, arg1));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_apply_6d0b9cd50eb480c3 = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = getObject(arg0).apply(getObject(arg1), getObject(arg2));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_call_b3ca7c6051f9bec1 = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = getObject(arg0).call(getObject(arg1), getObject(arg2));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_getTime_2bc4375165f02d15 = function(arg0) {
        const ret = getObject(arg0).getTime();
        return ret;
    };
    imports.wbg.__wbg_new0_7d84e5b2cd9fdc73 = function() {
        const ret = new Date();
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_instanceof_Object_71ca3c0a59266746 = function(arg0) {
        let result;
        try {
            result = getObject(arg0) instanceof Object;
        } catch (_) {
            result = false;
        }
        const ret = result;
        return ret;
    };
    imports.wbg.__wbg_new_81740750da40724f = function(arg0, arg1) {
        try {
            var state0 = {a: arg0, b: arg1};
            var cb0 = (arg0, arg1) => {
                const a = state0.a;
                state0.a = 0;
                try {
                    return __wbg_adapter_1028(a, state0.b, arg0, arg1);
                } finally {
                    state0.a = a;
                }
            };
            const ret = new Promise(cb0);
            return addHeapObject(ret);
        } finally {
            state0.a = state0.b = 0;
        }
    };
    imports.wbg.__wbg_resolve_b0083a7967828ec8 = function(arg0) {
        const ret = Promise.resolve(getObject(arg0));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_catch_0260e338d10f79ae = function(arg0, arg1) {
        const ret = getObject(arg0).catch(getObject(arg1));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_then_0c86a60e8fcfe9f6 = function(arg0, arg1) {
        const ret = getObject(arg0).then(getObject(arg1));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_then_a73caa9a87991566 = function(arg0, arg1, arg2) {
        const ret = getObject(arg0).then(getObject(arg1), getObject(arg2));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_buffer_12d079cc21e14bdb = function(arg0) {
        const ret = getObject(arg0).buffer;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_newwithbyteoffsetandlength_aa4a17c33a06e5cb = function(arg0, arg1, arg2) {
        const ret = new Uint8Array(getObject(arg0), arg1 >>> 0, arg2 >>> 0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_new_63b92bc8671ed464 = function(arg0) {
        const ret = new Uint8Array(getObject(arg0));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_set_a47bac70306a19a7 = function(arg0, arg1, arg2) {
        getObject(arg0).set(getObject(arg1), arg2 >>> 0);
    };
    imports.wbg.__wbg_length_c20a40f15020d68a = function(arg0) {
        const ret = getObject(arg0).length;
        return ret;
    };
    imports.wbg.__wbg_newwithlength_e9b4878cebadb3d3 = function(arg0) {
        const ret = new Uint8Array(arg0 >>> 0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_buffer_dd7f74bc60f1faab = function(arg0) {
        const ret = getObject(arg0).buffer;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_subarray_a1f73cd4b5b42fe1 = function(arg0, arg1, arg2) {
        const ret = getObject(arg0).subarray(arg1 >>> 0, arg2 >>> 0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_byteLength_58f7b4fab1919d44 = function(arg0) {
        const ret = getObject(arg0).byteLength;
        return ret;
    };
    imports.wbg.__wbg_byteOffset_81d60f7392524f62 = function(arg0) {
        const ret = getObject(arg0).byteOffset;
        return ret;
    };
    imports.wbg.__wbg_getindex_03d06b4e7ea3475e = function(arg0, arg1) {
        const ret = getObject(arg0)[arg1 >>> 0];
        return ret;
    };
    imports.wbg.__wbg_has_0af94d20077affa2 = function() { return handleError(function (arg0, arg1) {
        const ret = Reflect.has(getObject(arg0), getObject(arg1));
        return ret;
    }, arguments) };
    imports.wbg.__wbg_set_1f9b04f170055d33 = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = Reflect.set(getObject(arg0), getObject(arg1), getObject(arg2));
        return ret;
    }, arguments) };
    imports.wbg.__wbg_parse_66d1801634e099ac = function() { return handleError(function (arg0, arg1) {
        const ret = JSON.parse(getStringFromWasm0(arg0, arg1));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_stringify_8887fe74e1c50d81 = function() { return handleError(function (arg0) {
        const ret = JSON.stringify(getObject(arg0));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbindgen_debug_string = function(arg0, arg1) {
        const ret = debugString(getObject(arg1));
        const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len1;
        getInt32Memory0()[arg0 / 4 + 0] = ptr1;
    };
    imports.wbg.__wbindgen_throw = function(arg0, arg1) {
        throw new Error(getStringFromWasm0(arg0, arg1));
    };
    imports.wbg.__wbindgen_memory = function() {
        const ret = wasm.memory;
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_closure_wrapper4914 = function(arg0, arg1, arg2) {
        const ret = makeMutClosure(arg0, arg1, 859, __wbg_adapter_32);
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_closure_wrapper5667 = function(arg0, arg1, arg2) {
        const ret = makeMutClosure(arg0, arg1, 1133, __wbg_adapter_35);
        return addHeapObject(ret);
    };

    return imports;
}

function __wbg_init_memory(imports, maybe_memory) {

}

function __wbg_finalize_init(instance, module) {
    wasm = instance.exports;
    __wbg_init.__wbindgen_wasm_module = module;
    cachedInt32Memory0 = null;
    cachedUint32Memory0 = null;
    cachedUint8Memory0 = null;


    return wasm;
}

function initSync(module) {
    if (wasm !== undefined) return wasm;

    const imports = __wbg_get_imports();

    __wbg_init_memory(imports);

    if (!(module instanceof WebAssembly.Module)) {
        module = new WebAssembly.Module(module);
    }

    const instance = new WebAssembly.Instance(module, imports);

    return __wbg_finalize_init(instance, module);
}

async function __wbg_init(input) {
    if (wasm !== undefined) return wasm;

    if (typeof input === 'undefined') {
        input = new URL('casper_rust_wasm_sdk_bg.wasm', import.meta.url);
    }
    const imports = __wbg_get_imports();

    if (typeof input === 'string' || (typeof Request === 'function' && input instanceof Request) || (typeof URL === 'function' && input instanceof URL)) {
        input = fetch(input);
    }

    __wbg_init_memory(imports);

    const { instance, module } = await __wbg_load(await input, imports);

    return __wbg_finalize_init(instance, module);
}

export { initSync }
export default __wbg_init;
