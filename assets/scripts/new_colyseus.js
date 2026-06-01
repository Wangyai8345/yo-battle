function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n80 = 0, F = function F() {}; return { s: F, n: function n() { return _n80 >= r.length ? { done: !0 } : { done: !1, value: r[_n80++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _wrapNativeSuper(t) { var r = "function" == typeof Map ? new Map() : void 0; return _wrapNativeSuper = function _wrapNativeSuper(t) { if (null === t || !_isNativeFunction(t)) return t; if ("function" != typeof t) throw new TypeError("Super expression must either be null or a function"); if (void 0 !== r) { if (r.has(t)) return r.get(t); r.set(t, Wrapper); } function Wrapper() { return _construct(t, arguments, _getPrototypeOf(this).constructor); } return Wrapper.prototype = Object.create(t.prototype, { constructor: { value: Wrapper, enumerable: !1, writable: !0, configurable: !0 } }), _setPrototypeOf(Wrapper, t); }, _wrapNativeSuper(t); }
function _construct(t, e, r) { if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments); var o = [null]; o.push.apply(o, e); var p = new (t.bind.apply(t, o))(); return r && _setPrototypeOf(p, r.prototype), p; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _isNativeFunction(t) { try { return -1 !== Function.toString.call(t).indexOf("[native code]"); } catch (n) { return "function" == typeof t; } }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
/**
 * Minified by jsDelivr using Terser v5.39.0.
 * Original file: /npm/@colyseus/sdk@0.17.42/dist/colyseus.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
!function (e, t) {
  "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) && "undefined" != typeof module ? t(exports) : "function" == typeof define && define.amd ? define("@colyseus/sdk", ["exports"], t) : t((e = "undefined" != typeof globalThis ? globalThis : e || self).Colyseus = {});
}(this, function (e) {
  "use strict";

  function t(e, t, n, s) {
    return new (n || (n = Promise))(function (r, i) {
      function o(e) {
        try {
          c(s.next(e));
        } catch (e) {
          i(e);
        }
      }
      function a(e) {
        try {
          c(s.throw(e));
        } catch (e) {
          i(e);
        }
      }
      function c(e) {
        var t;
        e.done ? r(e.value) : (t = e.value, t instanceof n ? t : new n(function (e) {
          e(t);
        })).then(o, a);
      }
      c((s = s.apply(e, t || [])).next());
    });
  }
  function n(e, t, n, s) {
    if ("a" === n && !s) throw new TypeError("Private accessor was defined without a getter");
    if ("function" == typeof t ? e !== t || !s : !t.has(e)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return "m" === n ? s : "a" === n ? s.call(e) : s ? s.value : t.get(e);
  }
  function s(e, t, n, s, r) {
    if ("m" === s) throw new TypeError("Private method is not writable");
    if ("a" === s && !r) throw new TypeError("Private accessor was defined without a setter");
    if ("function" == typeof t ? e !== t || !r : !t.has(e)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return "a" === s ? r.call(e, n) : r ? r.value = n : t.set(e, n), n;
  }
  ArrayBuffer.isView || (ArrayBuffer.isView = function (e) {
    return null !== e && "object" == _typeof(e) && e.buffer instanceof ArrayBuffer;
  }), "undefined" == typeof globalThis && "undefined" != typeof window && (window.globalThis = window), "undefined" == typeof FormData && (globalThis.FormData = /*#__PURE__*/_createClass(function _class() {
    _classCallCheck(this, _class);
  })), "function" == typeof SuppressedError && SuppressedError;
  var r = {
      JOIN_ROOM: 10,
      ERROR: 11,
      LEAVE_ROOM: 12,
      ROOM_DATA: 13,
      ROOM_STATE: 14,
      ROOM_STATE_PATCH: 15,
      ROOM_DATA_SCHEMA: 16,
      ROOM_DATA_BYTES: 17,
      PING: 18
    },
    i = {
      NORMAL_CLOSURE: 1e3,
      GOING_AWAY: 1001,
      NO_STATUS_RECEIVED: 1005,
      ABNORMAL_CLOSURE: 1006,
      CONSENTED: 4e3,
      SERVER_SHUTDOWN: 4001,
      WITH_ERROR: 4002,
      FAILED_TO_RECONNECT: 4003,
      MAY_TRY_RECONNECT: 4010
    };
  var o = /*#__PURE__*/function (_Error) {
    function o(e, t, n) {
      var _this;
      _classCallCheck(this, o);
      _this = _callSuper(this, o, [t]), _this.name = "ServerError", _this.code = e, n && (_this.headers = n.headers, _this.status = n.status, _this.response = n.response, _this.data = n.data);
      return _this;
    }
    _inherits(o, _Error);
    return _createClass(o);
  }(/*#__PURE__*/_wrapNativeSuper(Error));
  var a = /*#__PURE__*/function (_Error2) {
    function a(e) {
      var _this2;
      _classCallCheck(this, a);
      _this2 = _callSuper(this, a, [e]), _this2.name = "AbortError";
      return _this2;
    }
    _inherits(a, _Error2);
    return _createClass(a);
  }(/*#__PURE__*/_wrapNativeSuper(Error));
  var c = /*#__PURE__*/function (_Error3) {
    function c(e, t) {
      var _this3;
      _classCallCheck(this, c);
      _this3 = _callSuper(this, c, [e]), _this3.code = t, _this3.name = "MatchMakeError", Object.setPrototypeOf(_assertThisInitialized(_this3), c.prototype);
      return _this3;
    }
    _inherits(c, _Error3);
    return _createClass(c);
  }(/*#__PURE__*/_wrapNativeSuper(Error));
  function l(e) {
    return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
  }
  var h,
    d = {
      exports: {}
    };
  var u,
    f,
    g,
    p = (h || (h = 1, function (e, _Symbol$metadata) {
      var t = 255,
        n = 213;
      var s;
      e.OPERATION = void 0, (s = e.OPERATION || (e.OPERATION = {}))[s.ADD = 128] = "ADD", s[s.REPLACE = 0] = "REPLACE", s[s.DELETE = 64] = "DELETE", s[s.DELETE_AND_MOVE = 96] = "DELETE_AND_MOVE", s[s.MOVE_AND_ADD = 160] = "MOVE_AND_ADD", s[s.DELETE_AND_ADD = 192] = "DELETE_AND_ADD", s[s.CLEAR = 10] = "CLEAR", s[s.REVERSE = 15] = "REVERSE", s[s.MOVE = 32] = "MOVE", s[s.DELETE_BY_REFID = 33] = "DELETE_BY_REFID", s[s.ADD_BY_REFID = 129] = "ADD_BY_REFID", (_Symbol$metadata = Symbol.metadata) !== null && _Symbol$metadata !== void 0 ? _Symbol$metadata : Symbol.metadata = Symbol.for("Symbol.metadata");
      var r = "~refId",
        i = "~track",
        o = "~encoder",
        a = "~decoder",
        c = "~filter",
        l = "~getByIndex",
        h = "~deleteByIndex",
        d = "~changes",
        u = "~childType",
        f = "~onEncodeEnd",
        g = "~onDecodeEnd",
        p = "~descriptors",
        m = "~__numFields",
        y = "~__refTypeFieldIndexes",
        b = "~__viewFieldIndexes",
        v = "$__fieldIndexesByViewTag";
      var E;
      try {
        E = new TextEncoder();
      } catch (e) {}
      var O = new ArrayBuffer(8),
        w = new Int32Array(O),
        A = new Float32Array(O),
        I = new Float64Array(O),
        T = new BigInt64Array(O),
        C = "undefined" != typeof Buffer && Buffer.byteLength ? Buffer.byteLength : function (e, t) {
          for (var n = 0, s = 0, r = 0, i = e.length; r < i; r++) (n = e.charCodeAt(r)) < 128 ? s += 1 : n < 2048 ? s += 2 : n < 55296 || n >= 57344 ? s += 3 : (r++, s += 4);
          return s;
        };
      function R(e, t, n) {
        for (var s = 0, r = 0, i = t.length; r < i; r++) (s = t.charCodeAt(r)) < 128 ? e[n.offset++] = s : s < 2048 ? (e[n.offset] = 192 | s >> 6, e[n.offset + 1] = 128 | 63 & s, n.offset += 2) : s < 55296 || s >= 57344 ? (e[n.offset] = 224 | s >> 12, e[n.offset + 1] = 128 | s >> 6 & 63, e[n.offset + 2] = 128 | 63 & s, n.offset += 3) : (r++, s = 65536 + ((1023 & s) << 10 | 1023 & t.charCodeAt(r)), e[n.offset] = 240 | s >> 18, e[n.offset + 1] = 128 | s >> 12 & 63, e[n.offset + 2] = 128 | s >> 6 & 63, e[n.offset + 3] = 128 | 63 & s, n.offset += 4);
      }
      function x(e, t, n) {
        e[n.offset++] = 255 & t;
      }
      function S(e, t, n) {
        e[n.offset++] = 255 & t;
      }
      function P(e, t, n) {
        e[n.offset++] = 255 & t, e[n.offset++] = t >> 8 & 255;
      }
      function N(e, t, n) {
        e[n.offset++] = 255 & t, e[n.offset++] = t >> 8 & 255;
      }
      function k(e, t, n) {
        e[n.offset++] = 255 & t, e[n.offset++] = t >> 8 & 255, e[n.offset++] = t >> 16 & 255, e[n.offset++] = t >> 24 & 255;
      }
      function D(e, t, n) {
        var s = t >> 24,
          r = t >> 16,
          i = t >> 8,
          o = t;
        e[n.offset++] = 255 & o, e[n.offset++] = 255 & i, e[n.offset++] = 255 & r, e[n.offset++] = 255 & s;
      }
      function $(e, t, n) {
        var s = Math.floor(t / Math.pow(2, 32));
        D(e, t >>> 0, n), D(e, s, n);
      }
      function _(e, t, n) {
        var s = t / Math.pow(2, 32) | 0;
        D(e, t >>> 0, n), D(e, s, n);
      }
      function L(e, t, n) {
        T[0] = BigInt.asIntN(64, t), k(e, w[0], n), k(e, w[1], n);
      }
      function M(e, t, n) {
        T[0] = BigInt.asIntN(64, t), k(e, w[0], n), k(e, w[1], n);
      }
      function j(e, t, n) {
        A[0] = t, k(e, w[0], n);
      }
      function B(e, t, n) {
        I[0] = t, k(e, w[0], n), k(e, w[1], n);
      }
      function U(e, t, n) {
        e[n.offset++] = t ? 1 : 0;
      }
      function F(e, t, n) {
        t || (t = "");
        var s = C(t, "utf8"),
          r = 0;
        if (s < 32) e[n.offset++] = 160 | s, r = 1;else if (s < 256) e[n.offset++] = 217, e[n.offset++] = s, r = 2;else if (s < 65536) e[n.offset++] = 218, N(e, s, n), r = 3;else {
          if (!(s < 4294967296)) throw new Error("String too long");
          e[n.offset++] = 219, D(e, s, n), r = 5;
        }
        return R(e, t, n), r + s;
      }
      function V(e, t, n) {
        return isNaN(t) ? V(e, 0, n) : isFinite(t) ? t !== (0 | t) ? Math.abs(t) <= 34028235e31 && (A[0] = t, Math.abs(Math.abs(A[0]) - Math.abs(t)) < 1e-4) ? (e[n.offset++] = 202, j(e, t, n), 5) : (e[n.offset++] = 203, B(e, t, n), 9) : t >= 0 ? t < 128 ? (e[n.offset++] = 255 & t, 1) : t < 256 ? (e[n.offset++] = 204, e[n.offset++] = 255 & t, 2) : t < 65536 ? (e[n.offset++] = 205, N(e, t, n), 3) : t < 4294967296 ? (e[n.offset++] = 206, D(e, t, n), 5) : (e[n.offset++] = 207, _(e, t, n), 9) : t >= -32 ? (e[n.offset++] = 224 | t + 32, 1) : t >= -128 ? (e[n.offset++] = 208, x(e, t, n), 2) : t >= -32768 ? (e[n.offset++] = 209, P(e, t, n), 3) : t >= -2147483648 ? (e[n.offset++] = 210, k(e, t, n), 5) : (e[n.offset++] = 211, $(e, t, n), 9) : V(e, t > 0 ? Number.MAX_SAFE_INTEGER : -Number.MAX_SAFE_INTEGER, n);
      }
      var z = {
          int8: x,
          uint8: S,
          int16: P,
          uint16: N,
          int32: k,
          uint32: D,
          int64: $,
          uint64: _,
          bigint64: L,
          biguint64: M,
          float32: j,
          float64: B,
          boolean: U,
          string: F,
          number: V,
          utf8Write: R,
          utf8Length: C
        },
        q = new ArrayBuffer(8),
        W = new Int32Array(q),
        H = new Float32Array(q),
        J = new Float64Array(q),
        Y = new BigUint64Array(q),
        K = new BigInt64Array(q);
      function G(e, t, n) {
        n > e.length - t.offset && (n = e.length - t.offset);
        for (var s = "", r = 0, i = t.offset, o = t.offset + n; i < o; i++) {
          var a = e[i];
          if (128 & a) {
            if (192 != (224 & a)) {
              if (224 != (240 & a)) {
                if (240 != (248 & a)) {
                  console.error("decode.utf8Read(): Invalid byte " + a + " at offset " + i + ". Skip to end of string: " + (t.offset + n));
                  break;
                }
                (r = (7 & a) << 18 | (63 & e[++i]) << 12 | (63 & e[++i]) << 6 | 63 & e[++i]) >= 65536 ? (r -= 65536, s += String.fromCharCode(55296 + (r >>> 10), 56320 + (1023 & r))) : s += String.fromCharCode(r);
              } else s += String.fromCharCode((15 & a) << 12 | (63 & e[++i]) << 6 | 63 & e[++i]);
            } else s += String.fromCharCode((31 & a) << 6 | 63 & e[++i]);
          } else s += String.fromCharCode(a);
        }
        return t.offset += n, s;
      }
      function Z(e, t) {
        return X(e, t) << 24 >> 24;
      }
      function X(e, t) {
        return e[t.offset++];
      }
      function Q(e, t) {
        return ee(e, t) << 16 >> 16;
      }
      function ee(e, t) {
        return e[t.offset++] | e[t.offset++] << 8;
      }
      function te(e, t) {
        return e[t.offset++] | e[t.offset++] << 8 | e[t.offset++] << 16 | e[t.offset++] << 24;
      }
      function ne(e, t) {
        return te(e, t) >>> 0;
      }
      function se(e, t) {
        return W[0] = te(e, t), H[0];
      }
      function re(e, t) {
        return W[0] = te(e, t), W[1] = te(e, t), J[0];
      }
      function ie(e, t) {
        var n = ne(e, t);
        return te(e, t) * Math.pow(2, 32) + n;
      }
      function oe(e, t) {
        var n = ne(e, t);
        return ne(e, t) * Math.pow(2, 32) + n;
      }
      function ae(e, t) {
        return W[0] = te(e, t), W[1] = te(e, t), K[0];
      }
      function ce(e, t) {
        return W[0] = te(e, t), W[1] = te(e, t), Y[0];
      }
      function le(e, t) {
        return X(e, t) > 0;
      }
      function he(e, t) {
        var n = e[t.offset++];
        var s;
        return n < 192 ? s = 31 & n : 217 === n ? s = X(e, t) : 218 === n ? s = ee(e, t) : 219 === n && (s = ne(e, t)), G(e, t, s);
      }
      function de(e, t) {
        var n = e[t.offset++];
        return n < 128 ? n : 202 === n ? se(e, t) : 203 === n ? re(e, t) : 204 === n ? X(e, t) : 205 === n ? ee(e, t) : 206 === n ? ne(e, t) : 207 === n ? oe(e, t) : 208 === n ? Z(e, t) : 209 === n ? Q(e, t) : 210 === n ? te(e, t) : 211 === n ? ie(e, t) : n > 223 ? -1 * (255 - n + 1) : void 0;
      }
      function ue(e, t) {
        var n = e[t.offset];
        return n < 192 && n > 160 || 217 === n || 218 === n || 219 === n;
      }
      var fe = {
          utf8Read: G,
          int8: Z,
          uint8: X,
          int16: Q,
          uint16: ee,
          int32: te,
          uint32: ne,
          float32: se,
          float64: re,
          int64: ie,
          uint64: oe,
          bigint64: ae,
          biguint64: ce,
          boolean: le,
          string: he,
          number: de,
          stringCheck: ue
        },
        ge = {},
        pe = new Map();
      function me(e, t) {
        t.constructor && (pe.set(t.constructor, e), ge[e] = t), t.encode && (z[e] = t.encode), t.decode && (fe[e] = t.decode);
      }
      function ye(e) {
        return ge[e];
      }
      function be(e) {
        for (var _t in e) me(_t, e[_t]);
        return function (e) {
          return Ye(e);
        };
      }
      var ve = /*#__PURE__*/function () {
        function ve(e) {
          _classCallCheck(this, ve);
          _defineProperty(this, "types", {});
          _defineProperty(this, "schemas", new Map());
          _defineProperty(this, "hasFilters", !1);
          _defineProperty(this, "parentFiltered", {});
          e && this.discoverTypes(e);
        }
        return _createClass(ve, [{
          key: "has",
          value: function has(e) {
            return this.schemas.has(e);
          }
        }, {
          key: "get",
          value: function get(e) {
            return this.types[e];
          }
        }, {
          key: "add",
          value: function add(e) {
            var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.schemas.size;
            return !this.schemas.has(e) && (this.types[t] = e, void 0 === e[Symbol.metadata] && we.initialize(e), this.schemas.set(e, t), !0);
          }
        }, {
          key: "getTypeId",
          value: function getTypeId(e) {
            return this.schemas.get(e);
          }
        }, {
          key: "discoverTypes",
          value: function discoverTypes(e, t, n, s) {
            var _ve$inheritedTypes$ge,
              _this4 = this,
              _Symbol$metadata2,
              _e$_Symbol$metadata;
            if (s && this.registerFilteredByParent(e, t, n), !this.add(e)) return;
            (_ve$inheritedTypes$ge = ve.inheritedTypes.get(e)) === null || _ve$inheritedTypes$ge === void 0 || _ve$inheritedTypes$ge.forEach(function (e) {
              _this4.discoverTypes(e, t, n, s);
            });
            var r = e;
            for (; (r = Object.getPrototypeOf(r)) && r !== tt && r !== Function.prototype;) this.discoverTypes(r);
            var i = (_e$_Symbol$metadata = e[_Symbol$metadata2 = Symbol.metadata]) !== null && _e$_Symbol$metadata !== void 0 ? _e$_Symbol$metadata : e[_Symbol$metadata2] = {};
            i[b] && (this.hasFilters = !0);
            for (var _t2 in i) {
              var _n = _t2,
                _r = i[_n].type,
                _o = void 0 !== i[_n].tag;
              if ("string" != typeof _r) if ("function" == typeof _r) this.discoverTypes(_r, e, _n, s || _o);else {
                var _t3 = Object.values(_r)[0];
                if ("string" == typeof _t3) continue;
                this.discoverTypes(_t3, e, _n, s || _o);
              }
            }
          }
        }, {
          key: "registerFilteredByParent",
          value: function registerFilteredByParent(e, t, n) {
            var _this$schemas$get;
            var s = "".concat((_this$schemas$get = this.schemas.get(e)) !== null && _this$schemas$get !== void 0 ? _this$schemas$get : this.schemas.size);
            t && (s += "-".concat(this.schemas.get(t))), s += "-".concat(n), this.parentFiltered[s] = !0;
          }
        }, {
          key: "debug",
          value: function debug() {
            var _this5 = this;
            var e = "";
            var _loop = function _loop() {
              var n = _t4.split("-").map(Number),
                s = n.pop();
              e += "\n\t\t", e += "".concat(_t4, ": ").concat(n.reverse().map(function (e, t) {
                var n = _this5.types[e],
                  r = n[Symbol.metadata];
                var i = n.name;
                return 0 === t && (i += "[".concat(r[s].name, "]")), "".concat(i);
              }).join(" -> "));
            };
            for (var _t4 in this.parentFiltered) {
              _loop();
            }
            return "TypeContext ->\n\tSchema types: ".concat(this.schemas.size, "\n\thasFilters: ").concat(this.hasFilters, "\n\tparentFiltered:").concat(e);
          }
        }], [{
          key: "register",
          value: function register(e) {
            var t = Object.getPrototypeOf(e);
            if (t !== tt) {
              var _n2 = ve.inheritedTypes.get(t);
              _n2 || (_n2 = new Set(), ve.inheritedTypes.set(t, _n2)), _n2.add(e);
            }
          }
        }, {
          key: "cache",
          value: function cache(e) {
            var t = ve.cachedContexts.get(e);
            return t || (t = new ve(e), ve.cachedContexts.set(e, t)), t;
          }
        }]);
      }();
      _defineProperty(ve, "inheritedTypes", new Map());
      _defineProperty(ve, "cachedContexts", new Map());
      function Ee(e) {
        if (Array.isArray(e)) return {
          array: Ee(e[0])
        };
        if (void 0 !== e.type) return e.type;
        if (Oe(e)) return Object.keys(e).every(function (t) {
          return "string" == typeof e[t];
        }) ? "string" : "number";
        if ("object" == _typeof(e) && null !== e) {
          var _t5 = Object.keys(e).find(function (e) {
            return void 0 !== ge[e];
          });
          if (_t5) return e[_t5] = Ee(e[_t5]), e;
        }
        return e;
      }
      function Oe(e) {
        if ("function" == typeof e && e[Symbol.metadata]) return !1;
        var t = Object.keys(e),
          n = t.filter(function (e) {
            return /\d+/.test(e);
          });
        return n.length > 0 && n.length === t.length / 2 && e[e[n[0]]] == n[0] || !!(t.length > 0 && t.every(function (t) {
          return "string" == typeof e[t] && e[t] === t;
        }));
      }
      var we = {
        addField: function addField(e, t, n, s, r) {
          if (t > 64) throw new Error("Can't define field '".concat(n, "'.\nSchema instances may only have up to 64 fields."));
          e[t] = Object.assign(e[t] || {}, {
            type: Ee(s),
            index: t,
            name: n
          }), Object.defineProperty(e, p, {
            value: e[p] || {},
            enumerable: !1,
            configurable: !0
          }), r ? (e[p][n] = r, e[p]["_".concat(n)] = {
            value: void 0,
            writable: !0,
            enumerable: !1,
            configurable: !0
          }) : e[p][n] = {
            value: void 0,
            writable: !0,
            enumerable: !0,
            configurable: !0
          }, Object.defineProperty(e, m, {
            value: t,
            enumerable: !1,
            configurable: !0
          }), Object.defineProperty(e, n, {
            value: t,
            enumerable: !1,
            configurable: !0
          }), "string" != typeof e[t].type && (void 0 === e[y] && Object.defineProperty(e, y, {
            value: [],
            enumerable: !1,
            configurable: !0
          }), e[y].push(t));
        },
        setTag: function setTag(e, t, n) {
          var s = e[t];
          e[s].tag = n, e[b] || (Object.defineProperty(e, b, {
            value: [],
            enumerable: !1,
            configurable: !0
          }), Object.defineProperty(e, v, {
            value: {},
            enumerable: !1,
            configurable: !0
          })), e[b].push(s), e[v][n] || (e[v][n] = []), e[v][n].push(s);
        },
        setFields: function setFields(e, t) {
          var _ref, _c$m;
          var n = e.prototype.constructor;
          ve.register(n);
          var s = Object.getPrototypeOf(n),
            r = s && s[Symbol.metadata],
            c = we.initialize(n);
          n[i] || (n[i] = tt[i]), n[o] || (n[o] = tt[o]), n[a] || (n[a] = tt[a]), n.prototype.toJSON || (n.prototype.toJSON = tt.prototype.toJSON);
          var l = (_ref = (_c$m = c[m]) !== null && _c$m !== void 0 ? _c$m : r && r[m]) !== null && _ref !== void 0 ? _ref : -1;
          l++;
          for (var _e2 in t) {
            var _n3 = Ee(t[_e2]),
              _s = "string" == typeof Object.keys(_n3)[0] && ye(Object.keys(_n3)[0]),
              _r2 = _s ? Object.values(_n3)[0] : _n3;
            we.addField(c, l, _e2, _n3, Ke("_".concat(_e2), l, _r2, _s)), l++;
          }
          return e;
        },
        isDeprecated: function isDeprecated(e, t) {
          return !0 === e[t].deprecated;
        },
        init: function init(e) {
          var t = {};
          e[Symbol.metadata] = t, Object.defineProperty(t, m, {
            value: 0,
            enumerable: !1,
            configurable: !0
          });
        },
        initialize: function initialize(e) {
          var _e$Symbol$metadata;
          var t = Object.getPrototypeOf(e),
            n = t[Symbol.metadata];
          var s = (_e$Symbol$metadata = e[Symbol.metadata]) !== null && _e$Symbol$metadata !== void 0 ? _e$Symbol$metadata : Object.create(null);
          return t !== tt && s === n && (s = Object.create(null), n && (Object.setPrototypeOf(s, n), Object.defineProperty(s, m, {
            value: n[m],
            enumerable: !1,
            configurable: !0,
            writable: !0
          }), void 0 !== n[b] && (Object.defineProperty(s, b, {
            value: _toConsumableArray(n[b]),
            enumerable: !1,
            configurable: !0,
            writable: !0
          }), Object.defineProperty(s, v, {
            value: _objectSpread({}, n[v]),
            enumerable: !1,
            configurable: !0,
            writable: !0
          })), void 0 !== n[y] && Object.defineProperty(s, y, {
            value: _toConsumableArray(n[y]),
            enumerable: !1,
            configurable: !0,
            writable: !0
          }), Object.defineProperty(s, p, {
            value: _objectSpread({}, n[p]),
            enumerable: !1,
            configurable: !0,
            writable: !0
          }))), Object.defineProperty(e, Symbol.metadata, {
            value: s,
            writable: !1,
            configurable: !0
          }), s;
        },
        isValidInstance: function isValidInstance(e) {
          return e.constructor[Symbol.metadata] && Object.prototype.hasOwnProperty.call(e.constructor[Symbol.metadata], m);
        },
        getFields: function getFields(e) {
          var t = e[Symbol.metadata],
            n = {};
          for (var _e3 = 0; _e3 <= t[m]; _e3++) n[t[_e3].name] = t[_e3].type;
          return n;
        },
        hasViewTagAtIndex: function hasViewTagAtIndex(e, t) {
          var _e$b;
          return e === null || e === void 0 || (_e$b = e[b]) === null || _e$b === void 0 ? void 0 : _e$b.includes(t);
        }
      };
      function Ae(e) {
        return {
          indexes: {},
          operations: [],
          queueRootNode: e
        };
      }
      function Ie() {
        return {
          next: void 0,
          tail: void 0
        };
      }
      function Te(e, t) {
        var n = e.indexes[t];
        void 0 === n ? e.indexes[t] = e.operations.push(t) - 1 : e.operations[n] = t;
      }
      function Ce(e, t) {
        var _Object$entries$find;
        var n = e.indexes[t];
        void 0 === n && (n = Object.values(e.indexes).at(-1), t = (_Object$entries$find = Object.entries(e.indexes).find(function (_ref2) {
          var _ref3 = _slicedToArray(_ref2, 2),
            e = _ref3[0],
            t = _ref3[1];
          return t === n;
        })) === null || _Object$entries$find === void 0 ? void 0 : _Object$entries$find[0]), e.operations[n] = void 0, delete e.indexes[t];
      }
      var Re = /*#__PURE__*/function () {
        function Re(e) {
          var _this$metadata;
          _classCallCheck(this, Re);
          _defineProperty(this, "ref", void 0);
          _defineProperty(this, "metadata", void 0);
          _defineProperty(this, "root", void 0);
          _defineProperty(this, "parentChain", void 0);
          _defineProperty(this, "isFiltered", !1);
          _defineProperty(this, "isVisibilitySharedWithParent", void 0);
          _defineProperty(this, "indexedOperations", {});
          _defineProperty(this, "changes", {
            indexes: {},
            operations: []
          });
          _defineProperty(this, "allChanges", {
            indexes: {},
            operations: []
          });
          _defineProperty(this, "filteredChanges", void 0);
          _defineProperty(this, "allFilteredChanges", void 0);
          _defineProperty(this, "indexes", void 0);
          _defineProperty(this, "isNew", !0);
          this.ref = e, this.metadata = e.constructor[Symbol.metadata], ((_this$metadata = this.metadata) === null || _this$metadata === void 0 ? void 0 : _this$metadata[b]) && (this.allFilteredChanges = {
            indexes: {},
            operations: []
          }, this.filteredChanges = {
            indexes: {},
            operations: []
          });
        }
        return _createClass(Re, [{
          key: "setRoot",
          value: function setRoot(e) {
            this.root = e;
            var t = this.root.add(this);
            this.checkIsFiltered(this.parent, this.parentIndex, t), t && this.forEachChild(function (t, n) {
              t.root !== e ? t.setRoot(e) : e.add(t);
            });
          }
        }, {
          key: "setParent",
          value: function setParent(e, t, n) {
            var _this6 = this;
            if (this.addParent(e, n), !t) return;
            var s = t.add(this);
            t !== this.root && (this.root = t, this.checkIsFiltered(e, n, s)), s && this.forEachChild(function (e, n) {
              if (e.root === t) return t.add(e), void t.moveNextToParent(e);
              e.setParent(_this6.ref, t, n);
            });
          }
        }, {
          key: "forEachChild",
          value: function forEachChild(e) {
            if (this.ref[u]) {
              if ("string" != typeof this.ref[u]) {
                var _iterator = _createForOfIteratorHelper(this.ref.entries()),
                  _step;
                try {
                  for (_iterator.s(); !(_step = _iterator.n()).done;) {
                    var _this$indexes$_t, _this$indexes;
                    var _step$value = _slicedToArray(_step.value, 2),
                      _t6 = _step$value[0],
                      _n4 = _step$value[1];
                    _n4 && e(_n4[d], (_this$indexes$_t = (_this$indexes = this.indexes) === null || _this$indexes === void 0 ? void 0 : _this$indexes[_t6]) !== null && _this$indexes$_t !== void 0 ? _this$indexes$_t : _t6);
                  }
                } catch (err) {
                  _iterator.e(err);
                } finally {
                  _iterator.f();
                }
              }
            } else {
              var _this$metadata$y, _this$metadata2;
              var _iterator2 = _createForOfIteratorHelper((_this$metadata$y = (_this$metadata2 = this.metadata) === null || _this$metadata2 === void 0 ? void 0 : _this$metadata2[y]) !== null && _this$metadata$y !== void 0 ? _this$metadata$y : []),
                _step2;
              try {
                for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                  var _t7 = _step2.value;
                  var _n5 = this.metadata[_t7],
                    _s2 = this.ref[_n5.name];
                  _s2 && e(_s2[d], _t7);
                }
              } catch (err) {
                _iterator2.e(err);
              } finally {
                _iterator2.f();
              }
            }
          }
        }, {
          key: "operation",
          value: function operation(e) {
            var _this$root, _this$root2;
            void 0 !== this.filteredChanges ? (this.filteredChanges.operations.push(-e), (_this$root = this.root) === null || _this$root === void 0 ? void 0 : _this$root.enqueueChangeTree(this, "filteredChanges")) : (this.changes.operations.push(-e), (_this$root2 = this.root) === null || _this$root2 === void 0 ? void 0 : _this$root2.enqueueChangeTree(this, "changes"));
          }
        }, {
          key: "change",
          value: function change(t) {
            var _this$metadata3, _this$root3;
            var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : e.OPERATION.ADD;
            var s = this.isFiltered || void 0 !== ((_this$metadata3 = this.metadata) === null || _this$metadata3 === void 0 || (_this$metadata3 = _this$metadata3[t]) === null || _this$metadata3 === void 0 ? void 0 : _this$metadata3.tag),
              r = s ? this.filteredChanges : this.changes,
              i = this.indexedOperations[t];
            if (!i || i === e.OPERATION.DELETE) {
              var _s3 = i && i === e.OPERATION.DELETE ? e.OPERATION.DELETE_AND_ADD : n;
              this.indexedOperations[t] = _s3;
            }
            Te(r, t), s ? (Te(this.allFilteredChanges, t), this.root && (this.root.enqueueChangeTree(this, "filteredChanges"), this.root.enqueueChangeTree(this, "allFilteredChanges"))) : (Te(this.allChanges, t), (_this$root3 = this.root) === null || _this$root3 === void 0 ? void 0 : _this$root3.enqueueChangeTree(this, "changes"));
          }
        }, {
          key: "shiftChangeIndexes",
          value: function shiftChangeIndexes(e) {
            var t = this.isFiltered ? this.filteredChanges : this.changes,
              n = {},
              s = {};
            for (var _r3 in this.indexedOperations) n[Number(_r3) + e] = this.indexedOperations[_r3], s[Number(_r3) + e] = t.indexes[_r3];
            this.indexedOperations = n, t.indexes = s, t.operations = t.operations.map(function (t) {
              return t + e;
            });
          }
        }, {
          key: "shiftAllChangeIndexes",
          value: function shiftAllChangeIndexes(e) {
            var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
            void 0 !== this.filteredChanges ? (this._shiftAllChangeIndexes(e, t, this.allFilteredChanges), this._shiftAllChangeIndexes(e, t, this.allChanges)) : this._shiftAllChangeIndexes(e, t, this.allChanges);
          }
        }, {
          key: "_shiftAllChangeIndexes",
          value: function _shiftAllChangeIndexes(e) {
            var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
            var n = arguments.length > 2 ? arguments[2] : undefined;
            var s = {};
            var r = 0;
            for (var _e4 in n.indexes) s[r++] = n.indexes[_e4];
            n.indexes = s;
            for (var _s4 = 0; _s4 < n.operations.length; _s4++) {
              var _r4 = n.operations[_s4];
              _r4 > t && (n.operations[_s4] = _r4 + e);
            }
          }
        }, {
          key: "indexedOperation",
          value: function indexedOperation(e, t) {
            var _this$root4, _this$root5;
            var n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : e;
            this.indexedOperations[e] = t, void 0 !== this.filteredChanges ? (Te(this.allFilteredChanges, n), Te(this.filteredChanges, e), (_this$root4 = this.root) === null || _this$root4 === void 0 ? void 0 : _this$root4.enqueueChangeTree(this, "filteredChanges")) : (Te(this.allChanges, n), Te(this.changes, e), (_this$root5 = this.root) === null || _this$root5 === void 0 ? void 0 : _this$root5.enqueueChangeTree(this, "changes"));
          }
        }, {
          key: "getType",
          value: function getType(e) {
            return this.ref[u] || this.metadata[e].type;
          }
        }, {
          key: "getChange",
          value: function getChange(e) {
            return this.indexedOperations[e];
          }
        }, {
          key: "getValue",
          value: function getValue(e) {
            var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !1;
            return this.ref[l](e, t);
          }
        }, {
          key: "delete",
          value: function _delete(t, n) {
            var _this$root6, _this$root7, _this$root8;
            var s = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : t;
            if (void 0 === t) {
              try {
                throw new Error("@colyseus/schema ".concat(this.ref.constructor.name, ": trying to delete non-existing index '").concat(t, "'"));
              } catch (e) {
                console.warn(e);
              }
              return;
            }
            var r = void 0 !== this.filteredChanges ? this.filteredChanges : this.changes;
            this.indexedOperations[t] = n !== null && n !== void 0 ? n : e.OPERATION.DELETE, Te(r, t), Ce(this.allChanges, s);
            var i = this.getValue(t);
            return i && i[d] && (_this$root6 = this.root) !== null && _this$root6 !== void 0 && _this$root6.remove(i[d]), void 0 !== this.filteredChanges ? (Ce(this.allFilteredChanges, s), (_this$root7 = this.root) === null || _this$root7 === void 0 ? void 0 : _this$root7.enqueueChangeTree(this, "filteredChanges")) : (_this$root8 = this.root) === null || _this$root8 === void 0 ? void 0 : _this$root8.enqueueChangeTree(this, "changes"), i;
          }
        }, {
          key: "endEncode",
          value: function endEncode(e) {
            var _this$ref$f, _this$ref;
            this.indexedOperations = {}, this[e] = Ae(), (_this$ref$f = (_this$ref = this.ref)[f]) !== null && _this$ref$f !== void 0 && _this$ref$f.call(_this$ref), this.isNew = !1;
          }
        }, {
          key: "discard",
          value: function discard() {
            var _this$ref$f2, _this$ref2;
            var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : !1;
            (_this$ref$f2 = (_this$ref2 = this.ref)[f]) !== null && _this$ref$f2 !== void 0 && _this$ref$f2.call(_this$ref2), this.indexedOperations = {}, this.changes = Ae(this.changes.queueRootNode), void 0 !== this.filteredChanges && (this.filteredChanges = Ae(this.filteredChanges.queueRootNode)), e && (this.allChanges = Ae(this.allChanges.queueRootNode), void 0 !== this.allFilteredChanges && (this.allFilteredChanges = Ae(this.allFilteredChanges.queueRootNode)));
          }
        }, {
          key: "discardAll",
          value: function discardAll() {
            var e = Object.keys(this.indexedOperations);
            for (var _t8 = 0, _n6 = e.length; _t8 < _n6; _t8++) {
              var _n7 = this.getValue(Number(e[_t8]));
              _n7 && _n7[d] && _n7[d].discardAll();
            }
            this.discard();
          }
        }, {
          key: "changed",
          get: function get() {
            return Object.entries(this.indexedOperations).length > 0;
          }
        }, {
          key: "checkIsFiltered",
          value: function checkIsFiltered(e, t, n) {
            var _this$root9, _this$root0, _this$root1, _this$root10;
            this.root.types.hasFilters && (this._checkFilteredByParent(e, t), void 0 !== this.filteredChanges && ((_this$root9 = this.root) !== null && _this$root9 !== void 0 && _this$root9.enqueueChangeTree(this, "filteredChanges"), n && (_this$root0 = this.root) !== null && _this$root0 !== void 0 && _this$root0.enqueueChangeTree(this, "allFilteredChanges"))), this.isFiltered || ((_this$root1 = this.root) !== null && _this$root1 !== void 0 && _this$root1.enqueueChangeTree(this, "changes"), n && ((_this$root10 = this.root) === null || _this$root10 === void 0 ? void 0 : _this$root10.enqueueChangeTree(this, "allChanges")));
          }
        }, {
          key: "_checkFilteredByParent",
          value: function _checkFilteredByParent(e, t) {
            var _this7 = this;
            if (!e) return;
            var n = we.isValidInstance(this.ref) ? this.ref.constructor : this.ref[u];
            var s,
              r = !we.isValidInstance(e);
            r ? (s = e[d], e = s.parent, t = s.parentIndex) : s = e[d];
            var i = e.constructor;
            var o = "".concat(this.root.types.getTypeId(n));
            i && (o += "-".concat(this.root.types.schemas.get(i))), o += "-".concat(t);
            var a = we.hasViewTagAtIndex(i === null || i === void 0 ? void 0 : i[Symbol.metadata], t);
            this.isFiltered = e[d].isFiltered || this.root.types.parentFiltered[o] || a, this.isFiltered && (this.isVisibilitySharedWithParent = s.isFiltered && "string" != typeof n && !a && r, this.filteredChanges || (this.filteredChanges = Ae(), this.allFilteredChanges = Ae()), this.changes.operations.length > 0 && (this.changes.operations.forEach(function (e) {
              return Te(_this7.filteredChanges, e);
            }), this.allChanges.operations.forEach(function (e) {
              return Te(_this7.allFilteredChanges, e);
            }), this.changes = Ae(), this.allChanges = Ae()));
          }
        }, {
          key: "parent",
          get: function get() {
            var _this$parentChain;
            return (_this$parentChain = this.parentChain) === null || _this$parentChain === void 0 ? void 0 : _this$parentChain.ref;
          }
        }, {
          key: "parentIndex",
          get: function get() {
            var _this$parentChain2;
            return (_this$parentChain2 = this.parentChain) === null || _this$parentChain2 === void 0 ? void 0 : _this$parentChain2.index;
          }
        }, {
          key: "addParent",
          value: function addParent(e, t) {
            this.hasParent(function (t, n) {
              return t[d] === e[d];
            }) ? this.parentChain.index = t : this.parentChain = {
              ref: e,
              index: t,
              next: this.parentChain
            };
          }
        }, {
          key: "removeParent",
          value: function removeParent() {
            var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.parent;
            var t = this.parentChain,
              n = null;
            for (; t;) {
              if (t.ref[d] === e[d]) return n ? n.next = t.next : this.parentChain = t.next, !0;
              n = t, t = t.next;
            }
            return void 0 === this.parentChain;
          }
        }, {
          key: "findParent",
          value: function findParent(e) {
            var t = this.parentChain;
            for (; t;) {
              if (e(t.ref, t.index)) return t;
              t = t.next;
            }
          }
        }, {
          key: "hasParent",
          value: function hasParent(e) {
            return void 0 !== this.findParent(e);
          }
        }, {
          key: "getAllParents",
          value: function getAllParents() {
            var e = [];
            var t = this.parentChain;
            for (; t;) e.push({
              ref: t.ref,
              index: t.index
            }), t = t.next;
            return e;
          }
        }]);
      }();
      function xe(t, n, s, i, o, a) {
        var _z$s;
        "string" == typeof s ? (_z$s = z[s]) === null || _z$s === void 0 ? void 0 : _z$s.call(z, n, i, a) : void 0 !== s[Symbol.metadata] ? (z.number(n, i[r], a), (o & e.OPERATION.ADD) === e.OPERATION.ADD && t.tryEncodeTypeId(n, s, i.constructor, a)) : z.number(n, i[r], a);
      }
      var Se = function Se(t, n, s, r, i, o, a, c, l) {
          if (n[o.offset++] = 255 & (r | i), i === e.OPERATION.DELETE) return;
          var h = s.ref,
            d = l[r];
          xe(t, n, l[r].type, h[d.name], i, o);
        },
        Pe = function Pe(t, n, s, r, i, o) {
          if (n[o.offset++] = 255 & i, z.number(n, r, o), i === e.OPERATION.DELETE) return;
          var a = s.ref;
          if ((i & e.OPERATION.ADD) === e.OPERATION.ADD && "function" == typeof a.set) {
            var _e5 = s.ref.$indexes.get(r);
            z.string(n, _e5, o);
          }
          xe(t, n, a[u], a[l](r), i, o);
        },
        Ne = function Ne(t, n, s, i, o, a, c, l) {
          var h = s.ref;
          var d;
          if (l && s.isFiltered && "string" != typeof s.getType(i)) {
            var _t9 = h.tmpItems[i];
            if (!_t9) return;
            d = _t9[r], o === e.OPERATION.DELETE ? o = e.OPERATION.DELETE_BY_REFID : o === e.OPERATION.ADD && (o = e.OPERATION.ADD_BY_REFID);
          } else d = i;
          n[a.offset++] = 255 & o, z.number(n, d, a), o !== e.OPERATION.DELETE && o !== e.OPERATION.DELETE_BY_REFID && xe(t, n, s.getType(i), s.getValue(i, c), o, a);
        },
        ke = -1;
      function De(t, n, s, i, o, a, c, d) {
        var f = t.root,
          g = s[l](i);
        var p;
        if ((n & e.OPERATION.DELETE) === e.OPERATION.DELETE) {
          var _t0 = g === null || g === void 0 ? void 0 : g[r];
          void 0 !== _t0 && f.removeRef(_t0), n !== e.OPERATION.DELETE_AND_ADD && s[h](i), p = void 0;
        }
        if (n === e.OPERATION.DELETE) ;else if (tt.is(o)) {
          var _s5 = fe.number(a, c);
          if (p = f.refs.get(_s5), (n & e.OPERATION.ADD) === e.OPERATION.ADD) {
            var _r5 = t.getInstanceType(a, c, o);
            p || (p = t.createInstanceOfType(_r5)), f.addRef(_s5, p, p !== g || n === e.OPERATION.DELETE_AND_ADD && p === g);
          }
        } else if ("string" == typeof o) p = fe[o](a, c);else {
          var _t1 = ye(Object.keys(o)[0]),
            _s6 = fe.number(a, c),
            _i = f.refs.has(_s6) ? g || f.refs.get(_s6) : new _t1.constructor();
          if (p = _i.clone(!0), p[u] = Object.values(o)[0], g) {
            var _t10 = g[r];
            if (void 0 !== _t10 && _s6 !== _t10) {
              var _n8 = g.entries();
              var _s7;
              for (; (_s7 = _n8.next()) && !_s7.done;) {
                var _s7$value = _slicedToArray(_s7.value, 2),
                  _n9 = _s7$value[0],
                  _i2 = _s7$value[1];
                "object" == _typeof(_i2) && (_t10 = _i2[r], f.removeRef(_t10)), d.push({
                  ref: g,
                  refId: _t10,
                  op: e.OPERATION.DELETE,
                  field: _n9,
                  value: void 0,
                  previousValue: _i2
                });
              }
            }
          }
          f.addRef(_s6, p, _i !== g || n === e.OPERATION.DELETE_AND_ADD && _i === g);
        }
        return {
          value: p,
          previousValue: g
        };
      }
      var $e = function $e(e, t, n, s, r) {
          var i = t[n.offset++],
            o = s.constructor[Symbol.metadata],
            a = i >> 6 << 6,
            c = i % (a || 255),
            l = o[c];
          if (void 0 === l) return console.warn("@colyseus/schema: field not defined at", {
            index: c,
            ref: s.constructor.name,
            metadata: o
          }), ke;
          var _De = De(e, a, s, c, l.type, t, n, r),
            h = _De.value,
            d = _De.previousValue;
          null != h && (s[l.name] = h), d !== h && r.push({
            ref: s,
            refId: e.currentRefId,
            op: a,
            field: l.name,
            value: h,
            previousValue: d
          });
        },
        _e = function _e(t, n, s, r, i) {
          var o = n[s.offset++];
          if (o === e.OPERATION.CLEAR) return t.removeChildRefs(r, i), void r.clear();
          var a = fe.number(n, s),
            c = r[u];
          var l;
          (o & e.OPERATION.ADD) === e.OPERATION.ADD ? "function" == typeof r.set ? (l = fe.string(n, s), r.setIndex(a, l)) : l = a : l = r.getIndex(a);
          var _De2 = De(t, o, r, a, c, n, s, i),
            h = _De2.value,
            d = _De2.previousValue;
          if (null != h) if ("function" == typeof r.set) r.$items.set(l, h);else if ("function" == typeof r.$setAt) r.$setAt(a, h, o);else if ("function" == typeof r.add) {
            var _e6 = r.add(h);
            "number" == typeof _e6 && r.setIndex(_e6, _e6);
          }
          d !== h && i.push({
            ref: r,
            refId: t.currentRefId,
            op: o,
            field: "",
            dynamicIndex: l,
            value: h,
            previousValue: d
          });
        },
        Le = function Le(t, n, s, r, i) {
          var o,
            a = n[s.offset++];
          if (a === e.OPERATION.CLEAR) return t.removeChildRefs(r, i), void r.clear();
          if (a === e.OPERATION.REVERSE) return void r.reverse();
          if (a === e.OPERATION.DELETE_BY_REFID) {
            var _a = fe.number(n, s),
              _c = t.root.refs.get(_a);
            return o = r.findIndex(function (e) {
              return e === _c;
            }), r[h](o), void i.push({
              ref: r,
              refId: t.currentRefId,
              op: e.OPERATION.DELETE,
              field: "",
              dynamicIndex: o,
              value: void 0,
              previousValue: _c
            });
          }
          if (a === e.OPERATION.ADD_BY_REFID) {
            var _e7 = fe.number(n, s),
              _i3 = t.root.refs.get(_e7);
            _i3 && (o = r.findIndex(function (e) {
              return e === _i3;
            })), -1 !== o && void 0 !== o || (o = r.length);
          } else o = fe.number(n, s);
          var c = r[u];
          var l = o;
          var _De3 = De(t, a, r, o, c, n, s, i),
            d = _De3.value,
            f = _De3.previousValue;
          null != d && d !== f && r.$setAt(o, d, a), f !== d && i.push({
            ref: r,
            refId: t.currentRefId,
            op: a,
            field: "",
            dynamicIndex: l,
            value: d,
            previousValue: f
          });
        };
      var Me = /*#__PURE__*/function (_Error4) {
        function Me() {
          _classCallCheck(this, Me);
          return _callSuper(this, Me, arguments);
        }
        _inherits(Me, _Error4);
        return _createClass(Me);
      }(/*#__PURE__*/_wrapNativeSuper(Error));
      function je(e, t, n, s) {
        var r,
          i = !1;
        switch (t) {
          case "number":
          case "int8":
          case "uint8":
          case "int16":
          case "uint16":
          case "int32":
          case "uint32":
          case "int64":
          case "uint64":
          case "float32":
          case "float64":
            r = "number", isNaN(e) && console.log("trying to encode \"NaN\" in ".concat(n.constructor.name, "#").concat(s));
            break;
          case "bigint64":
          case "biguint64":
            r = "bigint";
            break;
          case "string":
            r = "string", i = !0;
            break;
          default:
            return;
        }
        if (_typeof(e) !== r && (!i || i && null !== e)) {
          var _t11 = "'".concat(JSON.stringify(e), "'").concat(e && e.constructor && " (".concat(e.constructor.name, ")") || "");
          throw new Me("a '".concat(r, "' was expected, but ").concat(_t11, " was provided in ").concat(n.constructor.name, "#").concat(s));
        }
      }
      function Be(e, t, n, s) {
        if (!(e instanceof t)) throw new Me("a '".concat(t.name, "' was expected, but '").concat(e && e.constructor.name, "' was provided in ").concat(n.constructor.name, "#").concat(s));
      }
      var Ue = function Ue(e, t) {
        var n = e.toString(),
          s = t.toString();
        return n < s ? -1 : n > s ? 1 : 0;
      };
      var Fe = /*#__PURE__*/function () {
        function Fe() {
          var _this8 = this;
          _classCallCheck(this, Fe);
          _defineProperty(this, d, void 0);
          _defineProperty(this, r, void 0);
          _defineProperty(this, u, void 0);
          _defineProperty(this, "items", []);
          _defineProperty(this, "tmpItems", []);
          _defineProperty(this, "deletedIndexes", {});
          _defineProperty(this, "isMovingItems", !1);
          _defineProperty(this, Symbol.unscopables, void 0);
          Object.defineProperty(this, u, {
            value: void 0,
            enumerable: !1,
            writable: !0,
            configurable: !0
          });
          var n = new Proxy(this, {
            get: function get(e, t) {
              return "symbol" == _typeof(t) || isNaN(t) ? Reflect.get(e, t) : _this8.items[t];
            },
            set: function set(t, n, s) {
              if ("symbol" == _typeof(n) || isNaN(n)) return Reflect.set(t, n, s);
              if (null == s) t.$deleteAt(n);else {
                if (s[d]) {
                  var _r6$d$root;
                  Be(s, t[u], t, n);
                  var _r6 = t.items[n];
                  t.isMovingItems ? (void 0 !== _r6 ? s[d].isNew ? t[d].indexedOperation(Number(n), e.OPERATION.MOVE_AND_ADD) : (t[d].getChange(Number(n)) & e.OPERATION.DELETE) === e.OPERATION.DELETE ? t[d].indexedOperation(Number(n), e.OPERATION.DELETE_AND_MOVE) : t[d].indexedOperation(Number(n), e.OPERATION.MOVE) : s[d].isNew && t[d].indexedOperation(Number(n), e.OPERATION.ADD), s[d].setParent(_this8, t[d].root, n)) : t.$changeAt(Number(n), s), void 0 !== _r6 && ((_r6$d$root = _r6[d].root) === null || _r6$d$root === void 0 ? void 0 : _r6$d$root.remove(_r6[d]));
                } else t.$changeAt(Number(n), s);
                t.items[n] = s, t.tmpItems[n] = s;
              }
              return !0;
            },
            deleteProperty: function deleteProperty(e, t) {
              return "number" == typeof t ? e.$deleteAt(t) : delete e[t], !0;
            },
            has: function has(e, t) {
              return "symbol" == _typeof(t) || isNaN(Number(t)) ? Reflect.has(e, t) : Reflect.has(_this8.items, t);
            }
          });
          return Object.defineProperty(this, d, {
            value: new Re(n),
            enumerable: !1,
            writable: !0
          }), arguments.length > 0 && this.push.apply(this, arguments), n;
        }
        return _createClass(Fe, [{
          key: "length",
          get: function get() {
            return this.items.length;
          },
          set: function set(e) {
            0 === e ? this.clear() : e < this.items.length ? this.splice(e, this.length - e) : console.warn("ArraySchema: can't set .length to a higher value than its length.");
          }
        }, {
          key: "push",
          value: function push() {
            var n = this.tmpItems.length;
            var s = this[d];
            for (var _r7 = 0, _i4 = arguments.length; _r7 < _i4; _r7++, n++) {
              var _i5$d;
              var _i5 = _r7 < 0 || arguments.length <= _r7 ? undefined : arguments[_r7];
              if (null == _i5) return;
              "object" == _typeof(_i5) && this[u] && Be(_i5, this[u], this, _r7), s.indexedOperation(n, e.OPERATION.ADD, this.items.length), this.items.push(_i5), this.tmpItems.push(_i5), (_i5$d = _i5[d]) === null || _i5$d === void 0 ? void 0 : _i5$d.setParent(this, s.root, n);
            }
            return n;
          }
        }, {
          key: "pop",
          value: function pop() {
            var e = -1;
            for (var _t12 = this.tmpItems.length - 1; _t12 >= 0; _t12--) if (!0 !== this.deletedIndexes[_t12]) {
              e = _t12;
              break;
            }
            if (!(e < 0)) return this[d].delete(e, void 0, this.items.length - 1), this.deletedIndexes[e] = !0, this.items.pop();
          }
        }, {
          key: "at",
          value: function at(e) {
            return e < 0 && (e += this.length), this.items[e];
          }
        }, {
          key: "$changeAt",
          value: function $changeAt(t, n) {
            var _n$d;
            if (null == n) return void console.error("ArraySchema items cannot be null nor undefined; Use `deleteAt(index)` instead.");
            if (this.items[t] === n) return;
            var s = void 0 !== this.items[t] ? "object" == _typeof(n) ? e.OPERATION.DELETE_AND_ADD : e.OPERATION.REPLACE : e.OPERATION.ADD,
              r = this[d];
            r.change(t, s), (_n$d = n[d]) === null || _n$d === void 0 ? void 0 : _n$d.setParent(this, r.root, t);
          }
        }, {
          key: "$deleteAt",
          value: function $deleteAt(e, t) {
            this[d].delete(e, t);
          }
        }, {
          key: "$setAt",
          value: function $setAt(t, n, s) {
            0 === t && s === e.OPERATION.ADD && void 0 !== this.items[t] ? this.items.unshift(n) : s === e.OPERATION.DELETE_AND_MOVE ? (this.items.splice(t, 1), this.items[t] = n) : this.items[t] = n;
          }
        }, {
          key: "clear",
          value: function clear() {
            if (0 === this.items.length) return;
            var t = this[d];
            t.forEachChild(function (e, n) {
              var _t$root;
              (_t$root = t.root) === null || _t$root === void 0 || _t$root.remove(e);
            }), t.discard(!0), t.operation(e.OPERATION.CLEAR), this.items.length = 0, this.tmpItems.length = 0;
          }
        }, {
          key: "concat",
          value: function concat() {
            var _this$items;
            return _construct(Fe, _toConsumableArray((_this$items = this.items).concat.apply(_this$items, arguments)));
          }
        }, {
          key: "join",
          value: function join(e) {
            return this.items.join(e);
          }
        }, {
          key: "reverse",
          value: function reverse() {
            return this[d].operation(e.OPERATION.REVERSE), this.items.reverse(), this.tmpItems.reverse(), this;
          }
        }, {
          key: "shift",
          value: function shift() {
            var _this9 = this;
            if (0 === this.items.length) return;
            var t = this[d],
              n = this.tmpItems.findIndex(function (e) {
                return e === _this9.items[0];
              }),
              s = this.items.findIndex(function (e) {
                return e === _this9.items[0];
              });
            return t.delete(n, e.OPERATION.DELETE, s), t.shiftAllChangeIndexes(-1, s), this.deletedIndexes[n] = !0, this.items.shift();
          }
        }, {
          key: "slice",
          value: function slice(e, t) {
            var n = new Fe();
            return n.push.apply(n, _toConsumableArray(this.items.slice(e, t))), n;
          }
        }, {
          key: "sort",
          value: function sort() {
            var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Ue;
            this.isMovingItems = !0;
            var n = this[d];
            return this.items.sort(t).forEach(function (t, s) {
              return n.change(s, e.OPERATION.REPLACE);
            }), this.tmpItems.sort(t), this.isMovingItems = !1, this;
          }
        }, {
          key: "splice",
          value: function splice(t, n) {
            var _r$root, _r$root2, _this$items2;
            for (var _len = arguments.length, s = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
              s[_key - 2] = arguments[_key];
            }
            var r = this[d],
              i = this.items.length,
              o = this.tmpItems.length,
              a = s.length,
              c = [];
            for (var _e8 = 0; _e8 < o; _e8++) !0 !== this.deletedIndexes[_e8] && c.push(_e8);
            if (i > t) {
              void 0 === n && (n = i - t);
              for (var _s8 = t; _s8 < t + n; _s8++) {
                var _t13 = c[_s8];
                r.delete(_t13, e.OPERATION.DELETE), this.deletedIndexes[_t13] = !0;
              }
            } else n = 0;
            if (a > 0) {
              if (a > n) throw console.error("Inserting more elements than deleting during ArraySchema#splice()"), new Error("ArraySchema#splice(): insertCount must be equal or lower than deleteCount.");
              for (var _n0 = 0; _n0 < a; _n0++) {
                var _c$t, _s$_n0$d;
                var _o2 = ((_c$t = c[t]) !== null && _c$t !== void 0 ? _c$t : i) + _n0;
                r.indexedOperation(_o2, this.deletedIndexes[_o2] ? e.OPERATION.DELETE_AND_ADD : e.OPERATION.ADD), (_s$_n0$d = s[_n0][d]) === null || _s$_n0$d === void 0 ? void 0 : _s$_n0$d.setParent(this, r.root, _o2);
              }
            }
            return n > a && r.shiftAllChangeIndexes(-(n - a), c[t + a]), void 0 !== r.filteredChanges ? (_r$root = r.root) === null || _r$root === void 0 ? void 0 : _r$root.enqueueChangeTree(r, "filteredChanges") : (_r$root2 = r.root) === null || _r$root2 === void 0 ? void 0 : _r$root2.enqueueChangeTree(r, "changes"), (_this$items2 = this.items).splice.apply(_this$items2, [t, n].concat(s));
          }
        }, {
          key: "unshift",
          value: function unshift() {
            var _this$tmpItems, _this$items3;
            var n = this[d];
            for (var _len2 = arguments.length, t = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
              t[_key2] = arguments[_key2];
            }
            return n.shiftChangeIndexes(t.length), n.isFiltered ? Te(n.filteredChanges, this.items.length) : Te(n.allChanges, this.items.length), t.forEach(function (t, s) {
              n.change(s, e.OPERATION.ADD);
            }), (_this$tmpItems = this.tmpItems).unshift.apply(_this$tmpItems, t), (_this$items3 = this.items).unshift.apply(_this$items3, t);
          }
        }, {
          key: "indexOf",
          value: function indexOf(e, t) {
            return this.items.indexOf(e, t);
          }
        }, {
          key: "lastIndexOf",
          value: function lastIndexOf(e) {
            var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.length - 1;
            return this.items.lastIndexOf(e, t);
          }
        }, {
          key: "every",
          value: function every(e, t) {
            return this.items.every(e, t);
          }
        }, {
          key: "some",
          value: function some(e, t) {
            return this.items.some(e, t);
          }
        }, {
          key: "forEach",
          value: function forEach(e, t) {
            return this.items.forEach(e, t);
          }
        }, {
          key: "map",
          value: function map(e, t) {
            return this.items.map(e, t);
          }
        }, {
          key: "filter",
          value: function filter(e, t) {
            return this.items.filter(e, t);
          }
        }, {
          key: "reduce",
          value: function reduce(e, t) {
            return this.items.reduce(e, t);
          }
        }, {
          key: "reduceRight",
          value: function reduceRight(e, t) {
            return this.items.reduceRight(e, t);
          }
        }, {
          key: "find",
          value: function find(e, t) {
            return this.items.find(e, t);
          }
        }, {
          key: "findIndex",
          value: function findIndex(e, t) {
            return this.items.findIndex(e, t);
          }
        }, {
          key: "fill",
          value: function fill(e, t, n) {
            throw new Error("ArraySchema#fill() not implemented");
          }
        }, {
          key: "copyWithin",
          value: function copyWithin(e, t, n) {
            throw new Error("ArraySchema#copyWithin() not implemented");
          }
        }, {
          key: "toString",
          value: function toString() {
            return this.items.toString();
          }
        }, {
          key: "toLocaleString",
          value: function toLocaleString() {
            return this.items.toLocaleString();
          }
        }, {
          key: Symbol.iterator,
          value: function value() {
            return this.items[Symbol.iterator]();
          }
        }, {
          key: "entries",
          value: function entries() {
            return this.items.entries();
          }
        }, {
          key: "keys",
          value: function keys() {
            return this.items.keys();
          }
        }, {
          key: "values",
          value: function values() {
            return this.items.values();
          }
        }, {
          key: "includes",
          value: function includes(e, t) {
            return this.items.includes(e, t);
          }
        }, {
          key: "flatMap",
          value: function flatMap(e, t) {
            throw new Error("ArraySchema#flatMap() is not supported.");
          }
        }, {
          key: "flat",
          value: function flat(e) {
            throw new Error("ArraySchema#flat() is not supported.");
          }
        }, {
          key: "findLast",
          value: function findLast() {
            return this.items.findLast.apply(this.items, arguments);
          }
        }, {
          key: "findLastIndex",
          value: function findLastIndex() {
            for (var _len3 = arguments.length, e = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
              e[_key3] = arguments[_key3];
            }
            return this.items.findLastIndex.apply(this.items, arguments);
          }
        }, {
          key: "with",
          value: function _with(e, t) {
            var n = this.items.slice();
            return e < 0 && (e += this.length), n[e] = t, _construct(Fe, _toConsumableArray(n));
          }
        }, {
          key: "toReversed",
          value: function toReversed() {
            return this.items.slice().reverse();
          }
        }, {
          key: "toSorted",
          value: function toSorted(e) {
            return this.items.slice().sort(e);
          }
        }, {
          key: "toSpliced",
          value: function toSpliced(e, t) {
            for (var _len4 = arguments.length, n = new Array(_len4 > 2 ? _len4 - 2 : 0), _key4 = 2; _key4 < _len4; _key4++) {
              n[_key4 - 2] = arguments[_key4];
            }
            return this.items.toSpliced.apply(copy, arguments);
          }
        }, {
          key: "shuffle",
          value: function shuffle() {
            var _this0 = this;
            return this.move(function (e) {
              var t = _this0.items.length;
              for (; 0 != t;) {
                var _ref4;
                var _e9 = Math.floor(Math.random() * t);
                t--, _ref4 = [_this0[_e9], _this0[t]], _this0[t] = _ref4[0], _this0[_e9] = _ref4[1];
              }
            });
          }
        }, {
          key: "move",
          value: function move(e) {
            return this.isMovingItems = !0, e(this), this.isMovingItems = !1, this;
          }
        }, {
          key: l,
          value: function value(e) {
            var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !1;
            return t || this.deletedIndexes[e] ? this.items[e] : this.tmpItems[e] || this.items[e];
          }
        }, {
          key: h,
          value: function value(e) {
            this.items[e] = void 0, this.tmpItems[e] = void 0;
          }
        }, {
          key: f,
          value: function value() {
            this.tmpItems = this.items.slice(), this.deletedIndexes = {};
          }
        }, {
          key: g,
          value: function value() {
            this.items = this.items.filter(function (e) {
              return void 0 !== e;
            }), this.tmpItems = this.items.slice();
          }
        }, {
          key: "toArray",
          value: function toArray() {
            return this.items.slice(0);
          }
        }, {
          key: "toJSON",
          value: function toJSON() {
            return this.toArray().map(function (e) {
              return "function" == typeof e.toJSON ? e.toJSON() : e;
            });
          }
        }, {
          key: "clone",
          value: function clone(e) {
            var _t14;
            var t;
            return e ? (t = new Fe(), (_t14 = t).push.apply(_t14, _toConsumableArray(this.items))) : t = _construct(Fe, _toConsumableArray(this.map(function (e) {
              return e[d] ? e.clone() : e;
            }))), t;
          }
        }], [{
          key: c,
          value: function value(e, t, n) {
            var _e$tmpItems$t;
            return !n || "string" == typeof e[u] || n.isChangeTreeVisible((_e$tmpItems$t = e.tmpItems[t]) === null || _e$tmpItems$t === void 0 ? void 0 : _e$tmpItems$t[d]);
          }
        }, {
          key: "is",
          value: function is(e) {
            return Array.isArray(e) || void 0 !== e.array;
          }
        }, {
          key: "from",
          value: function from(e) {
            return _construct(Fe, _toConsumableArray(Array.from(e)));
          }
        }, {
          key: Symbol.species,
          get: function get() {
            return Fe;
          }
        }]);
      }();
      _defineProperty(Fe, o, Ne);
      _defineProperty(Fe, a, Le);
      me("array", {
        constructor: Fe
      });
      var Ve = /*#__PURE__*/function () {
        function Ve(e) {
          var _this1 = this;
          _classCallCheck(this, Ve);
          _defineProperty(this, d, void 0);
          _defineProperty(this, r, void 0);
          _defineProperty(this, "childType", void 0);
          _defineProperty(this, u, void 0);
          _defineProperty(this, "$items", new Map());
          _defineProperty(this, "$indexes", new Map());
          _defineProperty(this, "deletedItems", {});
          var t = new Re(this);
          if (t.indexes = {}, Object.defineProperty(this, d, {
            value: t,
            enumerable: !1,
            writable: !0
          }), e) if (e instanceof Map || e instanceof Ve) e.forEach(function (e, t) {
            return _this1.set(t, e);
          });else for (var _t15 in e) this.set(_t15, e[_t15]);
          Object.defineProperty(this, u, {
            value: void 0,
            enumerable: !1,
            writable: !0,
            configurable: !0
          });
        }
        return _createClass(Ve, [{
          key: Symbol.iterator,
          value: function value() {
            return this.$items[Symbol.iterator]();
          }
        }, {
          key: Symbol.toStringTag,
          get: function get() {
            return this.$items[Symbol.toStringTag];
          }
        }, {
          key: "set",
          value: function set(t, n) {
            var _s$indexes$m;
            if (null == n) throw new Error("MapSchema#set('".concat(t, "', ").concat(n, "): trying to set ").concat(n, " value on '").concat(t, "'."));
            "object" == _typeof(n) && this[u] && Be(n, this[u], this, t), t = t.toString();
            var s = this[d],
              r = void 0 !== n[d];
            var i, o;
            if (void 0 !== s.indexes[t]) {
              var _a2$d$root;
              i = s.indexes[t], o = e.OPERATION.REPLACE;
              var _a2 = this.$items.get(t);
              if (_a2 === n) return;
              r && (o = e.OPERATION.DELETE_AND_ADD, void 0 !== _a2 && (_a2$d$root = _a2[d].root) !== null && _a2$d$root !== void 0 && _a2$d$root.remove(_a2[d])), this.deletedItems[i] && delete this.deletedItems[i];
            } else i = (_s$indexes$m = s.indexes[m]) !== null && _s$indexes$m !== void 0 ? _s$indexes$m : 0, o = e.OPERATION.ADD, this.$indexes.set(i, t), s.indexes[t] = i, s.indexes[m] = i + 1;
            return this.$items.set(t, n), s.change(i, o), r && n[d].setParent(this, s.root, i), this;
          }
        }, {
          key: "get",
          value: function get(e) {
            return this.$items.get(e);
          }
        }, {
          key: "delete",
          value: function _delete(e) {
            if (!this.$items.has(e)) return !1;
            var t = this[d].indexes[e];
            return this.deletedItems[t] = this[d].delete(t), this.$items.delete(e);
          }
        }, {
          key: "clear",
          value: function clear() {
            var t = this[d];
            t.discard(!0), t.indexes = {}, t.forEachChild(function (e, n) {
              var _t$root2;
              (_t$root2 = t.root) === null || _t$root2 === void 0 || _t$root2.remove(e);
            }), this.$indexes.clear(), this.$items.clear(), t.operation(e.OPERATION.CLEAR);
          }
        }, {
          key: "has",
          value: function has(e) {
            return this.$items.has(e);
          }
        }, {
          key: "forEach",
          value: function forEach(e) {
            this.$items.forEach(e);
          }
        }, {
          key: "entries",
          value: function entries() {
            return this.$items.entries();
          }
        }, {
          key: "keys",
          value: function keys() {
            return this.$items.keys();
          }
        }, {
          key: "values",
          value: function values() {
            return this.$items.values();
          }
        }, {
          key: "size",
          get: function get() {
            return this.$items.size;
          }
        }, {
          key: "setIndex",
          value: function setIndex(e, t) {
            this.$indexes.set(e, t);
          }
        }, {
          key: "getIndex",
          value: function getIndex(e) {
            return this.$indexes.get(e);
          }
        }, {
          key: l,
          value: function value(e) {
            return this.$items.get(this.$indexes.get(e));
          }
        }, {
          key: h,
          value: function value(e) {
            var t = this.$indexes.get(e);
            this.$items.delete(t), this.$indexes.delete(e);
          }
        }, {
          key: f,
          value: function value() {
            var e = this[d];
            for (var _t16 in this.deletedItems) {
              var _n1 = parseInt(_t16),
                _s9 = this.$indexes.get(_n1);
              delete e.indexes[_s9], this.$indexes.delete(_n1);
            }
            this.deletedItems = {};
          }
        }, {
          key: "toJSON",
          value: function toJSON() {
            var e = {};
            return this.forEach(function (t, n) {
              e[n] = "function" == typeof t.toJSON ? t.toJSON() : t;
            }), e;
          }
        }, {
          key: "clone",
          value: function clone(e) {
            var t;
            return e ? t = Object.assign(new Ve(), this) : (t = new Ve(), this.forEach(function (e, n) {
              e[d] ? t.set(n, e.clone()) : t.set(n, e);
            })), t;
          }
        }], [{
          key: c,
          value: function value(e, t, n) {
            var _e$l;
            return !n || "string" == typeof e[u] || n.isChangeTreeVisible(((_e$l = e[l](t)) !== null && _e$l !== void 0 ? _e$l : e.deletedItems[t])[d]);
          }
        }, {
          key: "is",
          value: function is(e) {
            return void 0 !== e.map;
          }
        }, {
          key: Symbol.species,
          get: function get() {
            return Ve;
          }
        }]);
      }();
      _defineProperty(Ve, o, Pe);
      _defineProperty(Ve, a, _e);
      me("map", {
        constructor: Ve
      });
      var ze = /*#__PURE__*/function () {
        function ze(e) {
          var _this10 = this;
          _classCallCheck(this, ze);
          _defineProperty(this, d, void 0);
          _defineProperty(this, r, void 0);
          _defineProperty(this, u, void 0);
          _defineProperty(this, "$items", new Map());
          _defineProperty(this, "$indexes", new Map());
          _defineProperty(this, "deletedItems", {});
          _defineProperty(this, "$refId", 0);
          this[d] = new Re(this), this[d].indexes = {}, e && e.forEach(function (e) {
            return _this10.add(e);
          }), Object.defineProperty(this, u, {
            value: void 0,
            enumerable: !1,
            writable: !0,
            configurable: !0
          });
        }
        return _createClass(ze, [{
          key: "add",
          value: function add(e) {
            var t = this.$refId++;
            return void 0 !== e[d] && e[d].setParent(this, this[d].root, t), this[d].indexes[t] = t, this.$indexes.set(t, t), this.$items.set(t, e), this[d].change(t), t;
          }
        }, {
          key: "at",
          value: function at(e) {
            var t = Array.from(this.$items.keys())[e];
            return this.$items.get(t);
          }
        }, {
          key: "entries",
          value: function entries() {
            return this.$items.entries();
          }
        }, {
          key: "delete",
          value: function _delete(e) {
            var t = this.$items.entries();
            var n, s;
            for (; (s = t.next()) && !s.done;) if (e === s.value[1]) {
              n = s.value[0];
              break;
            }
            return void 0 !== n && (this.deletedItems[n] = this[d].delete(n), this.$indexes.delete(n), this.$items.delete(n));
          }
        }, {
          key: "clear",
          value: function clear() {
            var t = this[d];
            t.discard(!0), t.indexes = {}, t.forEachChild(function (e, n) {
              var _t$root3;
              (_t$root3 = t.root) === null || _t$root3 === void 0 || _t$root3.remove(e);
            }), this.$indexes.clear(), this.$items.clear(), t.operation(e.OPERATION.CLEAR);
          }
        }, {
          key: "has",
          value: function has(e) {
            return Array.from(this.$items.values()).some(function (t) {
              return t === e;
            });
          }
        }, {
          key: "forEach",
          value: function forEach(e) {
            var _this11 = this;
            this.$items.forEach(function (t, n, s) {
              return e(t, n, _this11);
            });
          }
        }, {
          key: "values",
          value: function values() {
            return this.$items.values();
          }
        }, {
          key: "size",
          get: function get() {
            return this.$items.size;
          }
        }, {
          key: Symbol.iterator,
          value: function value() {
            return this.$items.values();
          }
        }, {
          key: "setIndex",
          value: function setIndex(e, t) {
            this.$indexes.set(e, t);
          }
        }, {
          key: "getIndex",
          value: function getIndex(e) {
            return this.$indexes.get(e);
          }
        }, {
          key: l,
          value: function value(e) {
            return this.$items.get(this.$indexes.get(e));
          }
        }, {
          key: h,
          value: function value(e) {
            var t = this.$indexes.get(e);
            this.$items.delete(t), this.$indexes.delete(e);
          }
        }, {
          key: f,
          value: function value() {
            this.deletedItems = {};
          }
        }, {
          key: "toArray",
          value: function toArray() {
            return Array.from(this.$items.values());
          }
        }, {
          key: "toJSON",
          value: function toJSON() {
            var e = [];
            return this.forEach(function (t, n) {
              e.push("function" == typeof t.toJSON ? t.toJSON() : t);
            }), e;
          }
        }, {
          key: "clone",
          value: function clone(e) {
            var t;
            return e ? t = Object.assign(new ze(), this) : (t = new ze(), this.forEach(function (e) {
              e[d] ? t.add(e.clone()) : t.add(e);
            })), t;
          }
        }], [{
          key: c,
          value: function value(e, t, n) {
            var _e$l2;
            return !n || "string" == typeof e[u] || n.isChangeTreeVisible(((_e$l2 = e[l](t)) !== null && _e$l2 !== void 0 ? _e$l2 : e.deletedItems[t])[d]);
          }
        }, {
          key: "is",
          value: function is(e) {
            return void 0 !== e.collection;
          }
        }]);
      }();
      _defineProperty(ze, o, Pe);
      _defineProperty(ze, a, _e);
      me("collection", {
        constructor: ze
      });
      var qe = /*#__PURE__*/function () {
        function qe(e) {
          var _this12 = this;
          _classCallCheck(this, qe);
          _defineProperty(this, d, void 0);
          _defineProperty(this, r, void 0);
          _defineProperty(this, u, void 0);
          _defineProperty(this, "$items", new Map());
          _defineProperty(this, "$indexes", new Map());
          _defineProperty(this, "deletedItems", {});
          _defineProperty(this, "$refId", 0);
          this[d] = new Re(this), this[d].indexes = {}, e && e.forEach(function (e) {
            return _this12.add(e);
          }), Object.defineProperty(this, u, {
            value: void 0,
            enumerable: !1,
            writable: !0,
            configurable: !0
          });
        }
        return _createClass(qe, [{
          key: "add",
          value: function add(t) {
            var _this$d$indexes$n$op, _this$d$indexes$n;
            if (this.has(t)) return !1;
            var n = this.$refId++;
            void 0 !== t[d] && t[d].setParent(this, this[d].root, n);
            var s = (_this$d$indexes$n$op = (_this$d$indexes$n = this[d].indexes[n]) === null || _this$d$indexes$n === void 0 ? void 0 : _this$d$indexes$n.op) !== null && _this$d$indexes$n$op !== void 0 ? _this$d$indexes$n$op : e.OPERATION.ADD;
            return this[d].indexes[n] = n, this.$indexes.set(n, n), this.$items.set(n, t), this[d].change(n, s), n;
          }
        }, {
          key: "entries",
          value: function entries() {
            return this.$items.entries();
          }
        }, {
          key: "delete",
          value: function _delete(e) {
            var t = this.$items.entries();
            var n, s;
            for (; (s = t.next()) && !s.done;) if (e === s.value[1]) {
              n = s.value[0];
              break;
            }
            return void 0 !== n && (this.deletedItems[n] = this[d].delete(n), this.$indexes.delete(n), this.$items.delete(n));
          }
        }, {
          key: "clear",
          value: function clear() {
            var t = this[d];
            t.discard(!0), t.indexes = {}, this.$indexes.clear(), this.$items.clear(), t.operation(e.OPERATION.CLEAR);
          }
        }, {
          key: "has",
          value: function has(e) {
            var t = this.$items.values();
            var n,
              s = !1;
            for (; (n = t.next()) && !n.done;) if (e === n.value) {
              s = !0;
              break;
            }
            return s;
          }
        }, {
          key: "forEach",
          value: function forEach(e) {
            var _this13 = this;
            this.$items.forEach(function (t, n, s) {
              return e(t, n, _this13);
            });
          }
        }, {
          key: "values",
          value: function values() {
            return this.$items.values();
          }
        }, {
          key: "size",
          get: function get() {
            return this.$items.size;
          }
        }, {
          key: Symbol.iterator,
          value: function value() {
            return this.$items.values();
          }
        }, {
          key: "setIndex",
          value: function setIndex(e, t) {
            this.$indexes.set(e, t);
          }
        }, {
          key: "getIndex",
          value: function getIndex(e) {
            return this.$indexes.get(e);
          }
        }, {
          key: l,
          value: function value(e) {
            return this.$items.get(this.$indexes.get(e));
          }
        }, {
          key: h,
          value: function value(e) {
            var t = this.$indexes.get(e);
            this.$items.delete(t), this.$indexes.delete(e);
          }
        }, {
          key: f,
          value: function value() {
            this.deletedItems = {};
          }
        }, {
          key: "toArray",
          value: function toArray() {
            return Array.from(this.$items.values());
          }
        }, {
          key: "toJSON",
          value: function toJSON() {
            var e = [];
            return this.forEach(function (t, n) {
              e.push("function" == typeof t.toJSON ? t.toJSON() : t);
            }), e;
          }
        }, {
          key: "clone",
          value: function clone(e) {
            var t;
            return e ? t = Object.assign(new qe(), this) : (t = new qe(), this.forEach(function (e) {
              e[d] ? t.add(e.clone()) : t.add(e);
            })), t;
          }
        }], [{
          key: c,
          value: function value(e, t, n) {
            var _e$l3;
            return !n || "string" == typeof e[u] || n.visible.has(((_e$l3 = e[l](t)) !== null && _e$l3 !== void 0 ? _e$l3 : e.deletedItems[t])[d]);
          }
        }, {
          key: "is",
          value: function is(e) {
            return void 0 !== e.set;
          }
        }]);
      }();
      _defineProperty(qe, o, Pe);
      _defineProperty(qe, a, _e);
      me("set", {
        constructor: qe
      });
      var We = -1;
      function He(e) {
        return ve.register(e), e;
      }
      function Je() {
        var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : We;
        return function (t, n) {
          var _Symbol$metadata3, _s$_Symbol$metadata;
          var s = t.constructor,
            r = Object.getPrototypeOf(s)[Symbol.metadata],
            i = (_s$_Symbol$metadata = s[_Symbol$metadata3 = Symbol.metadata]) !== null && _s$_Symbol$metadata !== void 0 ? _s$_Symbol$metadata : s[_Symbol$metadata3] = Object.assign({}, s[Symbol.metadata], r !== null && r !== void 0 ? r : Object.create(null));
          we.setTag(i, n, e);
        };
      }
      function Ye(e, t) {
        return function (n, s) {
          var _ref5, _o$m;
          var r = n.constructor;
          if (!e) throw new Error("".concat(r.name, ": @type() reference provided for \"").concat(s, "\" is undefined. Make sure you don't have any circular dependencies."));
          e = Ee(e), ve.register(r);
          var i = Object.getPrototypeOf(r)[Symbol.metadata],
            o = we.initialize(r);
          var a = o[s];
          if (void 0 !== o[a]) {
            if (o[a].deprecated) return;
            if (void 0 !== o[a].type) try {
              throw new Error("@colyseus/schema: Duplicate '".concat(s, "' definition on '").concat(r.name, "'.\nCheck @type() annotation"));
            } catch (e) {
              var _t17 = e.stack.split("\n")[4].trim();
              throw new Error("".concat(e.message, " ").concat(_t17));
            }
          } else a = (_ref5 = (_o$m = o[m]) !== null && _o$m !== void 0 ? _o$m : i && i[m]) !== null && _ref5 !== void 0 ? _ref5 : -1, a++;
          if (t && t.manual) we.addField(o, a, s, e, {
            enumerable: !0,
            configurable: !0,
            writable: !0
          });else {
            var _t18 = "string" == typeof Object.keys(e)[0] && ye(Object.keys(e)[0]),
              _n10 = _t18 ? Object.values(e)[0] : e;
            we.addField(o, a, s, e, Ke("_".concat(s), a, _n10, _t18));
          }
        };
      }
      function Ke(t, n, s, r) {
        return {
          get: function get() {
            return this[t];
          },
          set: function set(o) {
            var _this$t;
            var a = (_this$t = this[t]) !== null && _this$t !== void 0 ? _this$t : void 0;
            if (o !== a) {
              if (null != o) {
                var _c2$root, _o$d;
                r ? (r.constructor !== Fe || o instanceof Fe || (o = _construct(Fe, _toConsumableArray(o))), r.constructor !== Ve || o instanceof Ve || (o = new Ve(o)), o[u] = s) : "string" != typeof s ? Be(o, s, this, t.substring(1)) : je(o, s, this, t.substring(1));
                var _c2 = this[d];
                void 0 !== a && a[d] ? ((_c2$root = _c2.root) !== null && _c2$root !== void 0 && _c2$root.remove(a[d]), this.constructor[i](_c2, n, e.OPERATION.DELETE_AND_ADD)) : this.constructor[i](_c2, n, e.OPERATION.ADD), (_o$d = o[d]) === null || _o$d === void 0 ? void 0 : _o$d.setParent(this, _c2.root, n);
              } else void 0 !== a && this[d].delete(n);
              this[t] = o;
            }
          },
          enumerable: !0,
          configurable: !0
        };
      }
      function Ge() {
        var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : !0;
        return function (t, n) {
          var _Symbol$metadata4, _s$_Symbol$metadata2, _i$p;
          var s = t.constructor,
            r = Object.getPrototypeOf(s)[Symbol.metadata],
            i = (_s$_Symbol$metadata2 = s[_Symbol$metadata4 = Symbol.metadata]) !== null && _s$_Symbol$metadata2 !== void 0 ? _s$_Symbol$metadata2 : s[_Symbol$metadata4] = Object.assign({}, s[Symbol.metadata], r !== null && r !== void 0 ? r : Object.create(null)),
            o = i[n];
          i[o].deprecated = !0, e && ((_i$p = i[p]) !== null && _i$p !== void 0 ? _i$p : i[p] = {}, i[p][n] = {
            get: function get() {
              throw new Error("".concat(n, " is deprecated."));
            },
            set: function set(e) {},
            enumerable: !1,
            configurable: !0
          }), Object.defineProperty(i, o, {
            value: i[o],
            enumerable: !1,
            configurable: !0
          });
        };
      }
      function Ze(e, t, n) {
        for (var _s0 in t) Ye(t[_s0], n)(e.prototype, _s0);
        return e;
      }
      function Xe(e, t) {
        var n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : tt;
        var s = {},
          r = {},
          i = {},
          o = {};
        for (var _t19 in e) {
          var _n11 = e[_t19];
          "object" == _typeof(_n11) ? (void 0 !== _n11.view && (o[_t19] = "boolean" == typeof _n11.view ? We : _n11.view), !1 !== _n11.sync && (s[_t19] = Ee(_n11)), Object.prototype.hasOwnProperty.call(_n11, "default") ? i[_t19] = _n11.default : Array.isArray(_n11) || void 0 !== _n11.array ? i[_t19] = new Fe() : void 0 !== _n11.map ? i[_t19] = new Ve() : void 0 !== _n11.collection ? i[_t19] = new ze() : void 0 !== _n11.set ? i[_t19] = new qe() : void 0 !== _n11.type && tt.is(_n11.type) && (_n11.type.prototype.initialize && 0 !== _n11.type.prototype.initialize.length || (i[_t19] = new _n11.type()))) : "function" == typeof _n11 ? tt.is(_n11) ? (_n11.prototype.initialize && 0 !== _n11.prototype.initialize.length || (i[_t19] = new _n11()), s[_t19] = Ee(_n11)) : r[_t19] = _n11 : s[_t19] = Ee(_n11);
        }
        var a = function a() {
            var e = {};
            for (var _t20 in i) {
              var _n12 = i[_t20];
              _n12 && "function" == typeof _n12.clone ? e[_t20] = _n12.clone() : e[_t20] = _n12;
            }
            return e;
          },
          c = function c(e) {
            var t = Object.keys(s),
              n = {};
            for (var _s1 in e) t.includes(_s1) || (n[_s1] = e[_s1]);
            return n;
          },
          l = we.setFields(/*#__PURE__*/function (_n13) {
            function _class2() {
              var _this14;
              _classCallCheck(this, _class2);
              for (var _len5 = arguments.length, e = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
                e[_key5] = arguments[_key5];
              }
              r.initialize && "function" == typeof r.initialize ? (_this14 = _callSuper(this, _class2, [Object.assign({}, a(), c(e[0] || {}))]), (this instanceof _class2 ? this.constructor : void 0) === l && r.initialize.apply(_assertThisInitialized(_this14), e)) : _this14 = _callSuper(this, _class2, [Object.assign({}, a(), e[0] || {})]);
              return _assertThisInitialized(_this14);
            }
            _inherits(_class2, _n13);
            return _createClass(_class2);
          }(n), s);
        l._getDefaultValues = a, Object.assign(l.prototype, r);
        for (var _e0 in o) Je(o[_e0])(l.prototype, _e0);
        return t && Object.defineProperty(l, "name", {
          value: t
        }), l.extends = function (e, t) {
          return Xe(e, t, l);
        }, l;
      }
      function Qe(e) {
        return new Array(e).fill(0).map(function (t, n) {
          return n === e - 1 ? "└─ " : "   ";
        }).join("");
      }
      function et(t) {
        var n = {
          ops: {},
          refs: []
        };
        var s = t[d].root.changes.next;
        for (; s;) {
          var _t21 = s.changeTree;
          if (void 0 === _t21) {
            s = s.next;
            continue;
          }
          var _i6 = _t21.indexedOperations;
          n.refs.push("refId#".concat(_t21.ref[r]));
          for (var _t22 in _i6) {
            var _s10 = _i6[_t22],
              _r8 = e.OPERATION[_s10];
            n.ops[_r8] || (n.ops[_r8] = 0), n.ops[e.OPERATION[_s10]]++;
          }
          s = s.next;
        }
        return n;
      }
      var tt = /*#__PURE__*/function () {
        function tt(e) {
          _classCallCheck(this, tt);
          _defineProperty(this, r, void 0);
          tt.initialize(this), e && Object.assign(this, e);
        }
        return _createClass(tt, [{
          key: "assign",
          value: function assign(e) {
            return Object.assign(this, e), this;
          }
        }, {
          key: "restore",
          value: function restore(e) {
            var t = this.constructor[Symbol.metadata];
            for (var _n14 in t) {
              var _s11 = t[_n14],
                _r9 = _s11.name,
                _i7 = _s11.type,
                _o3 = e[_r9];
              if (null != _o3) if ("string" == typeof _i7) this[_r9] = _o3;else if (tt.is(_i7)) {
                var _e1 = new _i7();
                _e1.restore(_o3), this[_r9] = _e1;
              } else if ("object" == _typeof(_i7)) {
                var _e10 = Object.keys(_i7)[0],
                  _t23 = _i7[_e10];
                if ("map" === _e10) {
                  var _e11 = this[_r9];
                  for (var _n15 in _o3) if (tt.is(_t23)) {
                    var _s12 = new _t23();
                    _s12.restore(_o3[_n15]), _e11.set(_n15, _s12);
                  } else _e11.set(_n15, _o3[_n15]);
                } else if ("array" === _e10) {
                  var _e12 = this[_r9];
                  for (var _n16 = 0; _n16 < _o3.length; _n16++) if (tt.is(_t23)) {
                    var _s13 = new _t23();
                    _s13.restore(_o3[_n16]), _e12.push(_s13);
                  } else _e12.push(_o3[_n16]);
                }
              }
            }
            return this;
          }
        }, {
          key: "setDirty",
          value: function setDirty(e, t) {
            var n = this.constructor[Symbol.metadata];
            this[d].change(n[n[e]].index, t);
          }
        }, {
          key: "clone",
          value: function clone() {
            var e = Object.create(this.constructor.prototype);
            tt.initialize(e);
            var t = this.constructor[Symbol.metadata];
            for (var _n17 in t) {
              var _this$_s;
              var _s14 = t[_n17].name;
              "object" == _typeof(this[_s14]) && "function" == typeof ((_this$_s = this[_s14]) === null || _this$_s === void 0 ? void 0 : _this$_s.clone) ? e[_s14] = this[_s14].clone() : e[_s14] = this[_s14];
            }
            return e;
          }
        }, {
          key: "toJSON",
          value: function toJSON() {
            var e = {},
              t = this.constructor[Symbol.metadata];
            for (var _n18 in t) {
              var _s15 = t[_n18],
                _r0 = _s15.name;
              _s15.deprecated || null === this[_r0] || void 0 === this[_r0] || (e[_r0] = "function" == typeof this[_r0].toJSON ? this[_r0].toJSON() : this[_r0]);
            }
            return e;
          }
        }, {
          key: "discardAllChanges",
          value: function discardAllChanges() {
            this[d].discardAll();
          }
        }, {
          key: l,
          value: function value(e) {
            return this[this.constructor[Symbol.metadata][e].name];
          }
        }, {
          key: h,
          value: function value(e) {
            this[this.constructor[Symbol.metadata][e].name] = void 0;
          }
        }], [{
          key: "initialize",
          value: function initialize(e) {
            var _e$constructor$Symbol;
            Object.defineProperty(e, d, {
              value: new Re(e),
              enumerable: !1,
              writable: !0
            }), Object.defineProperties(e, ((_e$constructor$Symbol = e.constructor[Symbol.metadata]) === null || _e$constructor$Symbol === void 0 ? void 0 : _e$constructor$Symbol[p]) || {});
          }
        }, {
          key: "is",
          value: function is(e) {
            return "object" == _typeof(e[Symbol.metadata]);
          }
        }, {
          key: "isSchema",
          value: function isSchema(e) {
            return "function" == typeof (e === null || e === void 0 ? void 0 : e.assign);
          }
        }, {
          key: i,
          value: function value(t, n) {
            var s = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : e.OPERATION.ADD;
            t.change(n, s);
          }
        }, {
          key: c,
          value: function value(e, t, n) {
            var _s$t;
            var s = e.constructor[Symbol.metadata],
              r = (_s$t = s[t]) === null || _s$t === void 0 ? void 0 : _s$t.tag;
            if (void 0 === n) return void 0 === r;
            if (void 0 === r) return !0;
            if (r === We) return n.isChangeTreeVisible(e[d]);
            {
              var _n$tags;
              var _t24 = (_n$tags = n.tags) === null || _n$tags === void 0 ? void 0 : _n$tags.get(e[d]);
              return _t24 && _t24.has(r);
            }
          }
        }, {
          key: "debugRefIds",
          value: function debugRefIds(e) {
            var _l$refCount,
              _this15 = this;
            var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !1;
            var n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
            var s = arguments.length > 3 ? arguments[3] : undefined;
            var i = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "";
            var o = t ? " - ".concat(JSON.stringify(e.toJSON())) : "",
              a = e[d],
              c = e[r],
              l = s ? s.root : a.root,
              h = (l === null || l === void 0 || (_l$refCount = l.refCount) === null || _l$refCount === void 0 ? void 0 : _l$refCount[c]) > 1 ? " [\xD7".concat(l.refCount[c], "]") : "";
            var u = "".concat(Qe(n)).concat(i).concat(e.constructor.name, " (refId: ").concat(c, ")").concat(h).concat(o, "\n");
            return a.forEachChild(function (r, i) {
              var _e$$indexes$get;
              var o = i;
              "number" == typeof i && e.$indexes && (o = (_e$$indexes$get = e.$indexes.get(i)) !== null && _e$$indexes$get !== void 0 ? _e$$indexes$get : i);
              var a = void 0 !== e.forEach && void 0 !== o ? "[\"".concat(o, "\"]: ") : "";
              u += _this15.debugRefIds(r.ref, t, n + 1, s, a);
            }), u;
          }
        }, {
          key: "debugRefIdEncodingOrder",
          value: function debugRefIdEncodingOrder(e) {
            var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "allChanges";
            var n = [],
              s = e[d].root[t].next;
            for (; s;) s.changeTree && n.push(s.changeTree.ref[r]), s = s.next;
            return n;
          }
        }, {
          key: "debugRefIdsFromDecoder",
          value: function debugRefIdsFromDecoder(e) {
            return this.debugRefIds(e.state, !1, 0, e);
          }
        }, {
          key: "debugChanges",
          value: function debugChanges(t) {
            var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !1;
            var s = t[d],
              i = n ? s.allChanges : s.changes,
              o = n ? "allChanges" : "changes";
            var a = "".concat(t.constructor.name, " (").concat(t[r], ") -> .").concat(o, ":\n");
            function c(t) {
              t.operations.filter(function (e) {
                return e;
              }).forEach(function (t) {
                var r = s.indexedOperations[t];
                a += "- [".concat(t, "]: ").concat(e.OPERATION[r], " (").concat(JSON.stringify(s.getValue(Number(t), n)), ")\n");
              });
            }
            return c(i), !n && s.filteredChanges && s.filteredChanges.operations.filter(function (e) {
              return e;
            }).length > 0 && (a += "".concat(t.constructor.name, " (").concat(t[r], ") -> .filteredChanges:\n"), c(s.filteredChanges)), n && s.allFilteredChanges && s.allFilteredChanges.operations.filter(function (e) {
              return e;
            }).length > 0 && (a += "".concat(t.constructor.name, " (").concat(t[r], ") -> .allFilteredChanges:\n"), c(s.allFilteredChanges)), a;
          }
        }, {
          key: "debugChangesDeep",
          value: function debugChangesDeep(t) {
            var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "changes";
            var s = "";
            var i = t[d],
              o = i.root,
              a = new Map(),
              c = [];
            var l = 0;
            for (var _i8 = 0, _Object$entries = Object.entries(o[n]); _i8 < _Object$entries.length; _i8++) {
              var _n19$parent;
              var _Object$entries$_i = _slicedToArray(_Object$entries[_i8], 2),
                _e13 = _Object$entries$_i[0],
                _s16 = _Object$entries$_i[1];
              var _n19 = o.changeTrees[_e13];
              if (!_n19) continue;
              var _h = !1,
                _u = [],
                _f = (_n19$parent = _n19.parent) === null || _n19$parent === void 0 ? void 0 : _n19$parent[d];
              if (_n19 === i) _h = !0;else for (; void 0 !== _f;) {
                var _f$parent;
                if (_u.push(_f), _f.ref === t) {
                  _h = !0;
                  break;
                }
                _f = (_f$parent = _f.parent) === null || _f$parent === void 0 ? void 0 : _f$parent[d];
              }
              _h && (c.push(_n19.ref[r]), l += Object.keys(_s16).length, a.set(_n19, _u.reverse()));
            }
            s += "---\n", s += "root refId: ".concat(i.ref[r], "\n"), s += "Total instances: ".concat(c.length, " (refIds: ").concat(c.join(", "), ")\n"), s += "Total changes: ".concat(l, "\n"), s += "---\n";
            var h = new WeakSet();
            var _iterator3 = _createForOfIteratorHelper(a.entries()),
              _step3;
            try {
              for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                var _step3$value = _slicedToArray(_step3.value, 2),
                  _t25 = _step3$value[0],
                  _n20 = _step3$value[1];
                _n20.forEach(function (e, t) {
                  h.has(e) || (s += "".concat(Qe(t)).concat(e.ref.constructor.name, " (refId: ").concat(e.ref[r], ")\n"), h.add(e));
                });
                var _i9 = _t25.indexedOperations,
                  _o4 = _n20.length,
                  _a3 = Qe(_o4),
                  _c3 = _o4 > 0 ? "(".concat(_t25.parentIndex, ") ") : "";
                s += "".concat(_a3).concat(_c3).concat(_t25.ref.constructor.name, " (refId: ").concat(_t25.ref[r], ") - changes: ").concat(Object.keys(_i9).length, "\n");
                for (var _t26 in _i9) {
                  var _n21 = _i9[_t26];
                  s += "".concat(Qe(_o4 + 1)).concat(e.OPERATION[_n21], ": ").concat(_t26, "\n");
                }
              }
            } catch (err) {
              _iterator3.e(err);
            } finally {
              _iterator3.f();
            }
            return "".concat(s);
          }
        }]);
      }();
      _defineProperty(tt, Symbol.metadata, void 0);
      _defineProperty(tt, o, Se);
      _defineProperty(tt, a, $e);
      var nt = /*#__PURE__*/function () {
        function nt(e) {
          _classCallCheck(this, nt);
          _defineProperty(this, "types", void 0);
          _defineProperty(this, "nextUniqueId", 0);
          _defineProperty(this, "refCount", {});
          _defineProperty(this, "changeTrees", {});
          _defineProperty(this, "allChanges", Ie());
          _defineProperty(this, "allFilteredChanges", Ie());
          _defineProperty(this, "changes", Ie());
          _defineProperty(this, "filteredChanges", Ie());
          this.types = e;
        }
        return _createClass(nt, [{
          key: "getNextUniqueId",
          value: function getNextUniqueId() {
            return this.nextUniqueId++;
          }
        }, {
          key: "add",
          value: function add(t) {
            var n = t.ref;
            void 0 === n[r] && Object.defineProperty(n, r, {
              value: this.getNextUniqueId(),
              enumerable: !1,
              writable: !0
            });
            var s = n[r],
              i = void 0 === this.changeTrees[s];
            i && (this.changeTrees[s] = t);
            var o = this.refCount[s];
            if (0 === o) {
              var _n22 = t.allChanges.operations;
              var _s17 = _n22.length;
              for (; _s17--;) t.indexedOperations[_n22[_s17]] = e.OPERATION.ADD, Te(t.changes, _s17);
            }
            return this.refCount[s] = (o || 0) + 1, i;
          }
        }, {
          key: "remove",
          value: function remove(e) {
            var _this16 = this;
            var t = e.ref[r],
              n = this.refCount[t] - 1;
            return n <= 0 ? (e.root = void 0, delete this.changeTrees[t], this.removeChangeFromChangeSet("allChanges", e), this.removeChangeFromChangeSet("changes", e), e.filteredChanges && (this.removeChangeFromChangeSet("allFilteredChanges", e), this.removeChangeFromChangeSet("filteredChanges", e)), this.refCount[t] = 0, e.forEachChild(function (t, n) {
              t.removeParent(e.ref) && (void 0 === t.parentChain || t.parentChain && _this16.refCount[t.ref[r]] > 0 ? _this16.remove(t) : t.parentChain && _this16.moveNextToParent(t));
            })) : (this.refCount[t] = n, this.recursivelyMoveNextToParent(e)), n;
          }
        }, {
          key: "recursivelyMoveNextToParent",
          value: function recursivelyMoveNextToParent(e) {
            var _this17 = this;
            this.moveNextToParent(e), e.forEachChild(function (e, t) {
              return _this17.recursivelyMoveNextToParent(e);
            });
          }
        }, {
          key: "moveNextToParent",
          value: function moveNextToParent(e) {
            e.filteredChanges ? (this.moveNextToParentInChangeTreeList("filteredChanges", e), this.moveNextToParentInChangeTreeList("allFilteredChanges", e)) : (this.moveNextToParentInChangeTreeList("changes", e), this.moveNextToParentInChangeTreeList("allChanges", e));
          }
        }, {
          key: "moveNextToParentInChangeTreeList",
          value: function moveNextToParentInChangeTreeList(e, t) {
            var _r$d$e;
            var n = this[e],
              s = t[e].queueRootNode;
            if (!s) return;
            var r = t.parent;
            if (!r || !r[d]) return;
            var i = (_r$d$e = r[d][e]) === null || _r$d$e === void 0 ? void 0 : _r$d$e.queueRootNode;
            if (!i || i === s) return;
            var o = i.position;
            s.position > o || (s.prev ? s.prev.next = s.next : n.next = s.next, s.next ? s.next.prev = s.prev : n.tail = s.prev, s.prev = i, s.next = i.next, i.next ? i.next.prev = s : n.tail = s, i.next = s, this.updatePositionsAfterMove(n, s, o + 1));
          }
        }, {
          key: "enqueueChangeTree",
          value: function enqueueChangeTree(e, t) {
            var n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : e[t].queueRootNode;
            n || (e[t].queueRootNode = this.addToChangeTreeList(this[t], e));
          }
        }, {
          key: "addToChangeTreeList",
          value: function addToChangeTreeList(e, t) {
            var n = {
              changeTree: t,
              next: void 0,
              prev: void 0,
              position: e.tail ? e.tail.position + 1 : 0
            };
            return e.next ? (n.prev = e.tail, e.tail.next = n, e.tail = n) : (e.next = n, e.tail = n), n;
          }
        }, {
          key: "updatePositionsAfterRemoval",
          value: function updatePositionsAfterRemoval(e, t) {
            var n = e.next,
              s = 0;
            for (; n;) s >= t && (n.position = s), n = n.next, s++;
          }
        }, {
          key: "updatePositionsAfterMove",
          value: function updatePositionsAfterMove(e, t, n) {
            var s = e.next,
              r = 0;
            for (; s;) s.position = r, s = s.next, r++;
          }
        }, {
          key: "removeChangeFromChangeSet",
          value: function removeChangeFromChangeSet(e, t) {
            var n = this[e],
              s = t[e].queueRootNode;
            if (s && s.changeTree === t) {
              var _r1 = s.position;
              return s.prev ? s.prev.next = s.next : n.next = s.next, s.next ? s.next.prev = s.prev : n.tail = s.prev, this.updatePositionsAfterRemoval(n, _r1), t[e].queueRootNode = void 0, !0;
            }
            return !1;
          }
        }]);
      }();
      function st(e, t) {
        var n = new Uint8Array(e.length + t.length);
        return n.set(e, 0), n.set(t, e.length), n;
      }
      var rt = /*#__PURE__*/function () {
        function rt(e) {
          _classCallCheck(this, rt);
          _defineProperty(this, "sharedBuffer", new Uint8Array(rt.BUFFER_SIZE));
          _defineProperty(this, "context", void 0);
          _defineProperty(this, "state", void 0);
          _defineProperty(this, "root", void 0);
          this.context = ve.cache(e.constructor), this.root = new nt(this.context), this.setState(e);
        }
        return _createClass(rt, [{
          key: "setState",
          value: function setState(e) {
            this.state = e, this.state[d].setRoot(this.root);
          }
        }, {
          key: "encode",
          value: function encode() {
            var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
              offset: 0
            };
            var s = arguments.length > 1 ? arguments[1] : undefined;
            var i = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.sharedBuffer;
            var a = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "changes";
            var l = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "allChanges" === a;
            var h = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : n.offset;
            var u = void 0 !== s,
              f = this.state[d];
            var g = this.root[a];
            for (; g = g.next;) {
              var _d = g.changeTree;
              if (u) {
                if (!s.isChangeTreeVisible(_d)) {
                  s.invisible.add(_d);
                  continue;
                }
                s.invisible.delete(_d);
              }
              var _p = _d[a],
                _m = _d.ref,
                _y = _p.operations.length;
              if (0 === _y) continue;
              var _b = _m.constructor,
                _v = _b[o],
                _E = _b[c],
                _O = _b[Symbol.metadata];
              (u || n.offset > h || _d !== f) && (i[n.offset++] = 255 & t, z.number(i, _m[r], n));
              for (var _t27 = 0; _t27 < _y; _t27++) {
                var _r10 = _p.operations[_t27];
                if (_r10 < 0) {
                  i[n.offset++] = 255 & Math.abs(_r10);
                  continue;
                }
                var _o5 = l ? e.OPERATION.ADD : _d.indexedOperations[_r10];
                void 0 === _r10 || void 0 === _o5 || _E && !_E(_m, _r10, s) || _v(this, i, _d, _r10, _o5, n, l, u, _O);
              }
            }
            if (n.offset > i.byteLength) {
              var _e14 = Math.ceil(n.offset / rt.BUFFER_SIZE) * rt.BUFFER_SIZE;
              console.warn("@colyseus/schema buffer overflow. Encoded state is higher than default BUFFER_SIZE. Use the following to increase default BUFFER_SIZE:\n\n    import { Encoder } from \"@colyseus/schema\";\n    Encoder.BUFFER_SIZE = ".concat(Math.round(_e14 / 1024), " * 1024; // ").concat(Math.round(_e14 / 1024), " KB\n"));
              var _t28 = new Uint8Array(_e14);
              return _t28.set(i), (i = _t28) === this.sharedBuffer && (this.sharedBuffer = i), this.encode({
                offset: h
              }, s, i, a, l);
            }
            return i.subarray(0, n.offset);
          }
        }, {
          key: "encodeAll",
          value: function encodeAll() {
            var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
              offset: 0
            };
            var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.sharedBuffer;
            return this.encode(e, void 0, t, "allChanges", !0);
          }
        }, {
          key: "encodeAllView",
          value: function encodeAllView(e, t, n) {
            var s = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : this.sharedBuffer;
            var r = n.offset;
            return this.encode(n, e, s, "allFilteredChanges", !0, r), st(s.subarray(0, t), s.subarray(r, n.offset));
          }
        }, {
          key: "encodeView",
          value: function encodeView(n, s, i) {
            var a = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : this.sharedBuffer;
            var c = i.offset;
            var _iterator4 = _createForOfIteratorHelper(n.changes),
              _step4;
            try {
              for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
                var _step4$value = _slicedToArray(_step4.value, 2),
                  _s18 = _step4$value[0],
                  _c4 = _step4$value[1];
                var _h2 = this.root.changeTrees[_s18];
                if (void 0 === _h2) {
                  n.changes.delete(_s18);
                  continue;
                }
                var _d2 = Object.keys(_c4);
                if (0 === _d2.length) continue;
                var _u2 = _h2.ref,
                  _f2 = _u2.constructor,
                  _g = _f2[o],
                  _p2 = _f2[Symbol.metadata];
                a[i.offset++] = 255 & t, z.number(a, _u2[r], i);
                for (var _t29 = 0, _n23 = _d2.length; _t29 < _n23; _t29++) {
                  var _n24 = Number(_d2[_t29]),
                    _s19 = _h2.ref[l](_n24);
                  _g(this, a, _h2, _n24, void 0 !== _s19 && _c4[_n24] || e.OPERATION.DELETE, i, !1, !0, _p2);
                }
              }
            } catch (err) {
              _iterator4.e(err);
            } finally {
              _iterator4.f();
            }
            return n.changes.clear(), this.encode(i, n, a, "filteredChanges", !1, c), st(a.subarray(0, s), a.subarray(c, i.offset));
          }
        }, {
          key: "discardChanges",
          value: function discardChanges() {
            var e = this.root.changes.next;
            for (; e;) e.changeTree.endEncode("changes"), e = e.next;
            for (this.root.changes = Ie(), e = this.root.filteredChanges.next; e;) e.changeTree.endEncode("filteredChanges"), e = e.next;
            this.root.filteredChanges = Ie();
          }
        }, {
          key: "tryEncodeTypeId",
          value: function tryEncodeTypeId(e, t, s, r) {
            var i = this.context.getTypeId(t),
              o = this.context.getTypeId(s);
            void 0 !== o ? i !== o && (e[r.offset++] = 255 & n, z.number(e, o, r)) : console.warn("@colyseus/schema WARNING: Class \"".concat(s.name, "\" is not registered on TypeRegistry - Please either tag the class with @entity or define a @type() field."));
          }
        }, {
          key: "hasChanges",
          get: function get() {
            return void 0 !== this.root.changes.next || void 0 !== this.root.filteredChanges.next;
          }
        }]);
      }();
      _defineProperty(rt, "BUFFER_SIZE", 8192);
      function it(e, t) {
        if (-1 === t || t >= e.length) return !1;
        var n = e.length - 1;
        for (var _s20 = t; _s20 < n; _s20++) e[_s20] = e[_s20 + 1];
        return e.length = n, !0;
      }
      var ot = /*#__PURE__*/function (_Error5) {
        function ot(e) {
          var _this18;
          _classCallCheck(this, ot);
          _this18 = _callSuper(this, ot, [e]), _this18.name = "DecodingWarning";
          return _this18;
        }
        _inherits(ot, _Error5);
        return _createClass(ot);
      }(/*#__PURE__*/_wrapNativeSuper(Error));
      var at = /*#__PURE__*/function () {
        function at() {
          _classCallCheck(this, at);
          _defineProperty(this, "refs", new Map());
          _defineProperty(this, "refCount", {});
          _defineProperty(this, "deletedRefs", new Set());
          _defineProperty(this, "callbacks", {});
          _defineProperty(this, "nextUniqueId", 0);
        }
        return _createClass(at, [{
          key: "getNextUniqueId",
          value: function getNextUniqueId() {
            return this.nextUniqueId++;
          }
        }, {
          key: "addRef",
          value: function addRef(e, t) {
            var n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : !0;
            this.refs.set(e, t), Object.defineProperty(t, r, {
              value: e,
              enumerable: !1,
              writable: !0
            }), n && (this.refCount[e] = (this.refCount[e] || 0) + 1), this.deletedRefs.has(e) && this.deletedRefs.delete(e);
          }
        }, {
          key: "removeRef",
          value: function removeRef(e) {
            var t = this.refCount[e];
            if (void 0 !== t) {
              if (0 !== t) (this.refCount[e] = t - 1) <= 0 && this.deletedRefs.add(e);else try {
                var _t30 = this.refs.get(e);
                throw new ot("trying to remove refId '".concat(e, "' with 0 refCount (").concat(_t30.constructor.name, ": ").concat(JSON.stringify(_t30), ")"));
              } catch (e) {
                console.warn(e);
              }
            } else try {
              throw new ot("trying to remove refId that doesn't exist: " + e);
            } catch (e) {
              console.warn(e);
            }
          }
        }, {
          key: "clearRefs",
          value: function clearRefs() {
            this.refs.clear(), this.deletedRefs.clear(), this.callbacks = {}, this.refCount = {};
          }
        }, {
          key: "garbageCollectDeletedRefs",
          value: function garbageCollectDeletedRefs() {
            var _this19 = this;
            this.deletedRefs.forEach(function (e) {
              if (_this19.refCount[e] > 0) return;
              var t = _this19.refs.get(e);
              if (void 0 !== t.constructor[Symbol.metadata]) {
                var _e15 = t.constructor[Symbol.metadata];
                for (var _n25 in _e15) {
                  var _s21 = t[_e15[_n25].name];
                  if ("object" == _typeof(_s21) && _s21) {
                    var _e16 = _s21[r];
                    void 0 === _e16 || _this19.deletedRefs.has(_e16) || _this19.removeRef(_e16);
                  }
                }
              } else "function" == typeof t[u] && Array.from(t.values()).forEach(function (e) {
                var t = e[r];
                void 0 === t || _this19.deletedRefs.has(t) || _this19.removeRef(t);
              });
              _this19.refs.delete(e), delete _this19.refCount[e], delete _this19.callbacks[e];
            }), this.deletedRefs.clear();
          }
        }, {
          key: "addCallback",
          value: function addCallback(t, n, s) {
            var _this20 = this;
            if (void 0 === t) {
              var _t31 = "number" == typeof n ? e.OPERATION[n] : n;
              throw new Error("Can't addCallback on '".concat(_t31, "' (refId is undefined)"));
            }
            return this.callbacks[t] || (this.callbacks[t] = {}), this.callbacks[t][n] || (this.callbacks[t][n] = []), this.callbacks[t][n].push(s), function () {
              return _this20.removeCallback(t, n, s);
            };
          }
        }, {
          key: "removeCallback",
          value: function removeCallback(e, t, n) {
            var _this$callbacks;
            var s = (_this$callbacks = this.callbacks) === null || _this$callbacks === void 0 || (_this$callbacks = _this$callbacks[e]) === null || _this$callbacks === void 0 || (_this$callbacks = _this$callbacks[t]) === null || _this$callbacks === void 0 ? void 0 : _this$callbacks.indexOf(n);
            void 0 !== s && -1 !== s && it(this.callbacks[e][t], s);
          }
        }]);
      }();
      var ct = /*#__PURE__*/function () {
        function ct(e, t) {
          _classCallCheck(this, ct);
          _defineProperty(this, "context", void 0);
          _defineProperty(this, "state", void 0);
          _defineProperty(this, "root", void 0);
          _defineProperty(this, "currentRefId", 0);
          _defineProperty(this, "triggerChanges", void 0);
          this.setState(e), this.context = t || new ve(e.constructor);
        }
        return _createClass(ct, [{
          key: "setState",
          value: function setState(e) {
            this.state = e, this.root = new at(), this.root.addRef(0, e);
          }
        }, {
          key: "decode",
          value: function decode(e) {
            var _s$g2, _s23, _this$triggerChanges;
            var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
              offset: 0
            };
            var s = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.state;
            var r = [],
              i = this.root,
              o = e.byteLength;
            var c = s.constructor[a];
            for (this.currentRefId = 0; n.offset < o;) if (e[n.offset] != t) c(this, e, n, s, r) !== ke || (console.warn("@colyseus/schema: definition mismatch"), this.skipCurrentStructure(e, n, o));else {
              var _s$g, _s22;
              n.offset++, (_s$g = (_s22 = s)[g]) === null || _s$g === void 0 ? void 0 : _s$g.call(_s22);
              var _t32 = fe.number(e, n),
                _r11 = i.refs.get(_t32);
              _r11 ? (c = (s = _r11).constructor[a], this.currentRefId = _t32) : (console.error("\"refId\" not found: ".concat(_t32), {
                previousRef: s,
                previousRefId: this.currentRefId
              }), console.warn("Please report this issue to the developers."), this.skipCurrentStructure(e, n, o));
            }
            return (_s$g2 = (_s23 = s)[g]) !== null && _s$g2 !== void 0 && _s$g2.call(_s23), (_this$triggerChanges = this.triggerChanges) !== null && _this$triggerChanges !== void 0 && _this$triggerChanges.call(this, r), i.garbageCollectDeletedRefs(), r;
          }
        }, {
          key: "skipCurrentStructure",
          value: function skipCurrentStructure(e, n, s) {
            var r = {
              offset: n.offset
            };
            for (; n.offset < s && (e[n.offset] !== t || (r.offset = n.offset + 1, !this.root.refs.has(fe.number(e, r))));) n.offset++;
          }
        }, {
          key: "getInstanceType",
          value: function getInstanceType(e, t, s) {
            var r;
            if (e[t.offset] === n) {
              t.offset++;
              var _n26 = fe.number(e, t);
              r = this.context.get(_n26);
            }
            return r || s;
          }
        }, {
          key: "createInstanceOfType",
          value: function createInstanceOfType(e) {
            return new e();
          }
        }, {
          key: "removeChildRefs",
          value: function removeChildRefs(t, n) {
            var _this21 = this;
            var s = "string" != typeof t[u],
              i = t[r];
            t.forEach(function (o, a) {
              n.push({
                ref: t,
                refId: i,
                op: e.OPERATION.DELETE,
                field: a,
                value: void 0,
                previousValue: o
              }), s && _this21.root.removeRef(o[r]);
            });
          }
        }]);
      }();
      var lt = Xe({
          name: "string",
          type: "string",
          referencedType: "number"
        }),
        ht = Xe({
          id: "number",
          extendsId: "number",
          fields: [lt]
        }),
        dt = Xe({
          types: [ht],
          rootType: "number"
        });
      function ut(t) {
        var n = t.root,
          s = n.callbacks,
          i = new WeakMap();
        var o;
        function a(t, s) {
          var _s$instance;
          var l = ((_s$instance = s.instance) === null || _s$instance === void 0 ? void 0 : _s$instance.constructor[Symbol.metadata]) || t,
            h = s.instance && "function" == typeof s.instance.forEach || t && void 0 === t[Symbol.metadata];
          if (l && !h) {
            var _t33 = function _t33(e, t, a, c) {
              return c && void 0 !== s.instance[t] && !i.has(o) && a(s.instance[t], void 0), n.addCallback(e[r], t, a);
            };
            return new Proxy({
              listen: function listen(e, n) {
                var r = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : !0;
                if (s.instance) return _t33(s.instance, e, n, r);
                {
                  var _a4 = function _a4() {};
                  return s.onInstanceAvailable(function (s, c) {
                    _a4 = _t33(s, e, n, r && c && !i.has(o));
                  }), function () {
                    return _a4();
                  };
                }
              },
              onChange: function onChange(t) {
                return n.addCallback(s.instance[r], e.OPERATION.REPLACE, t);
              },
              bindTo: function bindTo(t, i) {
                return i || (i = Object.keys(l).map(function (e) {
                  return l[e].name;
                })), n.addCallback(s.instance[r], e.OPERATION.REPLACE, function () {
                  i.forEach(function (e) {
                    return t[e] = s.instance[e];
                  });
                });
              }
            }, {
              get: function get(e, t) {
                var n = l[l[t]];
                if (n) {
                  var _s$instance2;
                  var _e17 = (_s$instance2 = s.instance) === null || _s$instance2 === void 0 ? void 0 : _s$instance2[t],
                    _i0 = function _i0(n) {
                      var i = c(s.instance).listen(t, function (e, t) {
                        n(e, !1), i === null || i === void 0 ? void 0 : i();
                      }, !1);
                      void 0 !== (_e17 === null || _e17 === void 0 ? void 0 : _e17[r]) && n(_e17, !0);
                    };
                  return a(n.type, {
                    instance: void 0 !== (_e17 === null || _e17 === void 0 ? void 0 : _e17[r]) && _e17,
                    parentInstance: s.instance,
                    onInstanceAvailable: _i0
                  });
                }
                return e[t];
              },
              has: function has(e, t) {
                return void 0 !== l[t];
              },
              set: function set(e, t, n) {
                throw new Error("not allowed");
              },
              deleteProperty: function deleteProperty(e, t) {
                throw new Error("not allowed");
              }
            });
          }
          {
            var _t34 = function _t34(t, s, a) {
                return a && t.forEach(function (e, t) {
                  return s(e, t);
                }), n.addCallback(t[r], e.OPERATION.ADD, function (e, t) {
                  i.set(s, !0), o = s, s(e, t), i.delete(s), o = void 0;
                });
              },
              _a5 = function _a5(t, s) {
                return n.addCallback(t[r], e.OPERATION.DELETE, s);
              },
              _c5 = function _c5(t, s) {
                return n.addCallback(t[r], e.OPERATION.REPLACE, s);
              };
            return new Proxy({
              onAdd: function onAdd(e) {
                var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !0;
                if (s.instance) return _t34(s.instance, e, n && !i.has(o));
                if (s.onInstanceAvailable) {
                  var _r12 = function _r12() {};
                  return s.onInstanceAvailable(function (s, a) {
                    _r12 = _t34(s, e, n && a && !i.has(o));
                  }), function () {
                    return _r12();
                  };
                }
              },
              onRemove: function onRemove(e) {
                if (s.instance) return _a5(s.instance, e);
                if (s.onInstanceAvailable) {
                  var _t35 = function _t35() {};
                  return s.onInstanceAvailable(function (n) {
                    _t35 = _a5(n, e);
                  }), function () {
                    return _t35();
                  };
                }
              },
              onChange: function onChange(e) {
                if (s.instance) return _c5(s.instance, e);
                if (s.onInstanceAvailable) {
                  var _t36 = function _t36() {};
                  return s.onInstanceAvailable(function (n) {
                    _t36 = _c5(n, e);
                  }), function () {
                    return _t36();
                  };
                }
              }
            }, {
              get: function get(e, t) {
                if (!e[t]) throw new Error("Can't access '".concat(t, "' through callback proxy. access the instance directly."));
                return e[t];
              },
              has: function has(e, t) {
                return void 0 !== e[t];
              },
              set: function set(e, t, n) {
                throw new Error("not allowed");
              },
              deleteProperty: function deleteProperty(e, t) {
                throw new Error("not allowed");
              }
            });
          }
        }
        function c(e) {
          return a(void 0, {
            instance: e
          });
        }
        return t.triggerChanges = function (t) {
          var n = new Set();
          for (var _i1 = 0, _o6 = t.length; _i1 < _o6; _i1++) {
            var _o7 = t[_i1],
              _a6 = _o7.refId,
              _c6 = _o7.ref,
              _l = s[_a6];
            if (_l) {
              if ((_o7.op & e.OPERATION.DELETE) === e.OPERATION.DELETE && tt.isSchema(_o7.previousValue)) {
                var _s$_o7$previousValue$;
                var _t37 = (_s$_o7$previousValue$ = s[_o7.previousValue[r]]) === null || _s$_o7$previousValue$ === void 0 ? void 0 : _s$_o7$previousValue$[e.OPERATION.DELETE];
                for (var _e18 = (_t37 === null || _t37 === void 0 ? void 0 : _t37.length) - 1; _e18 >= 0; _e18--) _t37[_e18]();
              }
              if (tt.isSchema(_c6)) {
                if (!n.has(_a6)) {
                  var _t38 = _l === null || _l === void 0 ? void 0 : _l[e.OPERATION.REPLACE];
                  for (var _e19 = (_t38 === null || _t38 === void 0 ? void 0 : _t38.length) - 1; _e19 >= 0; _e19--) _t38[_e19]();
                }
                if (_l.hasOwnProperty(_o7.field)) {
                  var _e20 = _l[_o7.field];
                  for (var _t39 = (_e20 === null || _e20 === void 0 ? void 0 : _e20.length) - 1; _t39 >= 0; _t39--) _e20[_t39](_o7.value, _o7.previousValue);
                }
              } else {
                if ((_o7.op & e.OPERATION.DELETE) === e.OPERATION.DELETE) {
                  if (void 0 !== _o7.previousValue) {
                    var _t40 = _l[e.OPERATION.DELETE];
                    for (var _e21 = (_t40 === null || _t40 === void 0 ? void 0 : _t40.length) - 1; _e21 >= 0; _e21--) {
                      var _o7$dynamicIndex;
                      _t40[_e21](_o7.previousValue, (_o7$dynamicIndex = _o7.dynamicIndex) !== null && _o7$dynamicIndex !== void 0 ? _o7$dynamicIndex : _o7.field);
                    }
                  }
                  if ((_o7.op & e.OPERATION.ADD) === e.OPERATION.ADD) {
                    var _t41 = _l[e.OPERATION.ADD];
                    for (var _e22 = (_t41 === null || _t41 === void 0 ? void 0 : _t41.length) - 1; _e22 >= 0; _e22--) {
                      var _o7$dynamicIndex2;
                      _t41[_e22](_o7.value, (_o7$dynamicIndex2 = _o7.dynamicIndex) !== null && _o7$dynamicIndex2 !== void 0 ? _o7$dynamicIndex2 : _o7.field);
                    }
                  }
                } else if ((_o7.op & e.OPERATION.ADD) === e.OPERATION.ADD && _o7.previousValue !== _o7.value) {
                  var _t42 = _l[e.OPERATION.ADD];
                  for (var _e23 = (_t42 === null || _t42 === void 0 ? void 0 : _t42.length) - 1; _e23 >= 0; _e23--) {
                    var _o7$dynamicIndex3;
                    _t42[_e23](_o7.value, (_o7$dynamicIndex3 = _o7.dynamicIndex) !== null && _o7$dynamicIndex3 !== void 0 ? _o7$dynamicIndex3 : _o7.field);
                  }
                }
                if (_o7.value !== _o7.previousValue && (void 0 !== _o7.value || void 0 !== _o7.previousValue)) {
                  var _t43 = _l[e.OPERATION.REPLACE];
                  for (var _e24 = (_t43 === null || _t43 === void 0 ? void 0 : _t43.length) - 1; _e24 >= 0; _e24--) {
                    var _o7$dynamicIndex4;
                    _t43[_e24](_o7.value, (_o7$dynamicIndex4 = _o7.dynamicIndex) !== null && _o7$dynamicIndex4 !== void 0 ? _o7$dynamicIndex4 : _o7.field);
                  }
                }
              }
              n.add(_a6);
            }
          }
        }, c;
      }
      function ft(e, t) {
        e.triggerChanges = t;
      }
      dt.encode = function (e) {
        var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
          offset: 0
        };
        var n = e.context,
          s = new dt(),
          r = new rt(s),
          i = n.schemas.get(e.state.constructor);
        i > 0 && (s.rootType = i);
        var o = new Set(),
          a = {},
          _c7 = function c(e) {
            if (void 0 === e.extendsId || o.has(e.extendsId)) {
              o.add(e.id), s.types.push(e);
              var _t44 = a[e.id];
              void 0 !== _t44 && (delete a[e.id], _t44.forEach(function (e) {
                return _c7(e);
              }));
            } else void 0 === a[e.extendsId] && (a[e.extendsId] = []), a[e.extendsId].push(e);
          };
        n.schemas.forEach(function (e, t) {
          var s = new ht();
          s.id = Number(e);
          var r = Object.getPrototypeOf(t);
          r !== tt && (s.extendsId = n.schemas.get(r));
          var i = t[Symbol.metadata];
          if (i !== r[Symbol.metadata]) for (var _e25 in i) {
            var _t45 = Number(_e25),
              _r13 = i[_t45].name;
            if (!Object.prototype.hasOwnProperty.call(i, _r13)) continue;
            var _o8 = new lt();
            var _a7 = void 0;
            _o8.name = _r13;
            var _c8 = i[_t45];
            if ("string" == typeof _c8.type) _a7 = _c8.type;else {
              var _e26 = void 0;
              tt.is(_c8.type) ? (_a7 = "ref", _e26 = _c8.type) : (_a7 = Object.keys(_c8.type)[0], "string" == typeof _c8.type[_a7] ? _a7 += ":" + _c8.type[_a7] : _e26 = _c8.type[_a7]), _o8.referencedType = _e26 ? n.getTypeId(_e26) : -1;
            }
            _o8.type = _a7, s.fields.push(_o8);
          }
          _c7(s);
        });
        for (var _e27 in a) a[_e27].forEach(function (e) {
          return s.types.push(e);
        });
        return r.encodeAll(t).slice(0, t.offset);
      }, dt.decode = function (e, t) {
        var n = new dt();
        new ct(n).decode(e, t);
        var s = new ve();
        n.types.forEach(function (e) {
          var _s$get;
          var t = (_s$get = s.get(e.extendsId)) !== null && _s$get !== void 0 ? _s$get : tt,
            n = /*#__PURE__*/function (_t46) {
              function n() {
                _classCallCheck(this, n);
                return _callSuper(this, n, arguments);
              }
              _inherits(n, _t46);
              return _createClass(n);
            }(t);
          ve.register(n), s.add(n, e.id);
        }, {});
        var r = function r(e, t, n) {
          t.fields.forEach(function (t, r) {
            var i = n + r;
            if (void 0 !== t.referencedType) {
              var _n27 = t.type,
                _r14 = s.get(t.referencedType);
              if (!_r14) {
                var _e28 = t.type.split(":");
                _n27 = _e28[0], _r14 = _e28[1];
              }
              "ref" === _n27 ? we.addField(e, i, t.name, _r14) : we.addField(e, i, t.name, _defineProperty({}, _n27, _r14));
            } else we.addField(e, i, t.name, t.type);
          });
        };
        n.types.forEach(function (e) {
          var t = s.get(e.id),
            i = we.initialize(t),
            o = [];
          var a = e;
          do {
            o.push(a), a = n.types.find(function (e) {
              return e.id === a.extendsId;
            });
          } while (a);
          var c = 0;
          o.reverse().forEach(function (e) {
            r(i, e, c), c += e.fields.length;
          });
        });
        var i = new (s.get(n.rootType || 0))();
        return new ct(i, s);
      };
      var gt = /*#__PURE__*/function () {
        function gt(e) {
          _classCallCheck(this, gt);
          _defineProperty(this, "decoder", void 0);
          _defineProperty(this, "uniqueRefIds", new Set());
          _defineProperty(this, "isTriggering", !1);
          this.decoder = e, this.decoder.triggerChanges = this.triggerChanges.bind(this);
        }
        return _createClass(gt, [{
          key: "callbacks",
          get: function get() {
            return this.decoder.root.callbacks;
          }
        }, {
          key: "state",
          get: function get() {
            return this.decoder.state;
          }
        }, {
          key: "addCallback",
          value: function addCallback(e, t, n) {
            return this.decoder.root.addCallback(e, t, n);
          }
        }, {
          key: "addCallbackOrWaitCollectionAvailable",
          value: function addCallbackOrWaitCollectionAvailable(t, n, s, i) {
            var _this22 = this;
            var o = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : !0;
            var a = function a() {};
            var c = function c() {
                return a();
              },
              l = t[n];
            if (l && void 0 !== l[r]) return o = o && !1 === this.isTriggering, s === e.OPERATION.ADD && o && l.forEach(function (e, t) {
              i(e, t);
            }), this.addCallback(l[r], s, i);
            {
              var _e29;
              return _e29 = this.addCallback(t[r], n, function (t, n) {
                null != t && (_e29(), a = _this22.addCallback(t[r], s, i));
              }), a = _e29, c;
            }
          }
        }, {
          key: "listen",
          value: function listen() {
            return "string" == typeof (arguments.length <= 0 ? undefined : arguments[0]) ? this.listenInstance(this.state, arguments.length <= 0 ? undefined : arguments[0], arguments.length <= 1 ? undefined : arguments[1], arguments.length <= 2 ? undefined : arguments[2]) : this.listenInstance(arguments.length <= 0 ? undefined : arguments[0], arguments.length <= 1 ? undefined : arguments[1], arguments.length <= 2 ? undefined : arguments[2], arguments.length <= 3 ? undefined : arguments[3]);
          }
        }, {
          key: "listenInstance",
          value: function listenInstance(e, t, n) {
            var s = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : !0;
            s = s && !1 === this.isTriggering;
            var i = e[t];
            return s && null != i && n(i, void 0), this.addCallback(e[r], t, n);
          }
        }, {
          key: "onChange",
          value: function onChange() {
            if (2 === arguments.length && "string" != typeof (arguments.length <= 0 ? undefined : arguments[0])) {
              var _n28 = arguments.length <= 0 ? undefined : arguments[0],
                _s24 = arguments.length <= 1 ? undefined : arguments[1];
              return this.addCallback(_n28[r], e.OPERATION.REPLACE, _s24);
            }
            return "string" == typeof (arguments.length <= 0 ? undefined : arguments[0]) ? this.addCallbackOrWaitCollectionAvailable(this.state, arguments.length <= 0 ? undefined : arguments[0], e.OPERATION.REPLACE, arguments.length <= 1 ? undefined : arguments[1]) : this.addCallbackOrWaitCollectionAvailable(arguments.length <= 0 ? undefined : arguments[0], arguments.length <= 1 ? undefined : arguments[1], e.OPERATION.REPLACE, arguments.length <= 2 ? undefined : arguments[2]);
          }
        }, {
          key: "onAdd",
          value: function onAdd() {
            return "string" == typeof (arguments.length <= 0 ? undefined : arguments[0]) ? this.addCallbackOrWaitCollectionAvailable(this.state, arguments.length <= 0 ? undefined : arguments[0], e.OPERATION.ADD, arguments.length <= 1 ? undefined : arguments[1], !1 !== (arguments.length <= 2 ? undefined : arguments[2])) : this.addCallbackOrWaitCollectionAvailable(arguments.length <= 0 ? undefined : arguments[0], arguments.length <= 1 ? undefined : arguments[1], e.OPERATION.ADD, arguments.length <= 2 ? undefined : arguments[2], !1 !== (arguments.length <= 3 ? undefined : arguments[3]));
          }
        }, {
          key: "onRemove",
          value: function onRemove() {
            return "string" == typeof (arguments.length <= 0 ? undefined : arguments[0]) ? this.addCallbackOrWaitCollectionAvailable(this.state, arguments.length <= 0 ? undefined : arguments[0], e.OPERATION.DELETE, arguments.length <= 1 ? undefined : arguments[1]) : this.addCallbackOrWaitCollectionAvailable(arguments.length <= 0 ? undefined : arguments[0], arguments.length <= 1 ? undefined : arguments[1], e.OPERATION.DELETE, arguments.length <= 2 ? undefined : arguments[2]);
          }
        }, {
          key: "bindTo",
          value: function bindTo(t, n, s) {
            var i = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : !0;
            var o = t.constructor[Symbol.metadata];
            s || (s = Object.keys(o).filter(function (e) {
              return !isNaN(Number(e));
            }).map(function (e) {
              return o[e].name;
            }));
            var a = function a() {
              var _iterator5 = _createForOfIteratorHelper(s),
                _step5;
              try {
                for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
                  var _e30 = _step5.value;
                  var _s25 = t[_e30];
                  void 0 !== _s25 && (n[_e30] = _s25);
                }
              } catch (err) {
                _iterator5.e(err);
              } finally {
                _iterator5.f();
              }
            };
            return i && a(), this.addCallback(t[r], e.OPERATION.REPLACE, a);
          }
        }, {
          key: "triggerChanges",
          value: function triggerChanges(t) {
            this.uniqueRefIds.clear();
            for (var _n29 = 0, _s26 = t.length; _n29 < _s26; _n29++) {
              var _s27 = t[_n29],
                _i10 = _s27.refId,
                _o9 = _s27.ref,
                _a8 = this.callbacks[_i10];
              if (_a8) {
                if ((_s27.op & e.OPERATION.DELETE) === e.OPERATION.DELETE && tt.isSchema(_s27.previousValue)) {
                  var _this$callbacks$_t;
                  var _t47 = _s27.previousValue[r],
                    _n30 = (_this$callbacks$_t = this.callbacks[_t47]) === null || _this$callbacks$_t === void 0 ? void 0 : _this$callbacks$_t[e.OPERATION.DELETE];
                  if (_n30) for (var _e31 = _n30.length - 1; _e31 >= 0; _e31--) _n30[_e31]();
                }
                if (tt.isSchema(_o9)) {
                  if (!this.uniqueRefIds.has(_i10)) {
                    var _t48 = _a8[e.OPERATION.REPLACE];
                    if (_t48) for (var _e32 = _t48.length - 1; _e32 >= 0; _e32--) try {
                      _t48[_e32]();
                    } catch (e) {
                      console.error(e);
                    }
                  }
                  var _t49 = _a8[_s27.field];
                  if (_t49) for (var _e33 = _t49.length - 1; _e33 >= 0; _e33--) try {
                    this.isTriggering = !0, _t49[_e33](_s27.value, _s27.previousValue);
                  } catch (e) {
                    console.error(e);
                  } finally {
                    this.isTriggering = !1;
                  }
                } else {
                  var _s27$dynamicIndex;
                  var _t50 = (_s27$dynamicIndex = _s27.dynamicIndex) !== null && _s27$dynamicIndex !== void 0 ? _s27$dynamicIndex : _s27.field;
                  if ((_s27.op & e.OPERATION.DELETE) === e.OPERATION.DELETE) {
                    if (void 0 !== _s27.previousValue) {
                      var _n31 = _a8[e.OPERATION.DELETE];
                      if (_n31) for (var _e34 = _n31.length - 1; _e34 >= 0; _e34--) _n31[_e34](_s27.previousValue, _t50);
                    }
                    if ((_s27.op & e.OPERATION.ADD) === e.OPERATION.ADD) {
                      var _n32 = _a8[e.OPERATION.ADD];
                      if (_n32) {
                        this.isTriggering = !0;
                        for (var _e35 = _n32.length - 1; _e35 >= 0; _e35--) _n32[_e35](_s27.value, _t50);
                        this.isTriggering = !1;
                      }
                    }
                  } else if ((_s27.op & e.OPERATION.ADD) === e.OPERATION.ADD && _s27.previousValue !== _s27.value) {
                    var _n33 = _a8[e.OPERATION.ADD];
                    if (_n33) {
                      this.isTriggering = !0;
                      for (var _e36 = _n33.length - 1; _e36 >= 0; _e36--) _n33[_e36](_s27.value, _t50);
                      this.isTriggering = !1;
                    }
                  }
                  if (_s27.value !== _s27.previousValue) {
                    var _n34 = _a8[e.OPERATION.REPLACE];
                    if (_n34) for (var _e37 = _n34.length - 1; _e37 >= 0; _e37--) _n34[_e37](_t50, _s27.value);
                  }
                }
                this.uniqueRefIds.add(_i10);
              }
            }
          }
        }]);
      }();
      var pt = {
        get: function get(e) {
          if (e instanceof ct) return new gt(e);
          if ("decoder" in e.serializer) return new gt(e.serializer.decoder);
          throw new Error("Invalid room or decoder");
        },
        getLegacy: function getLegacy(e) {
          return e instanceof ct ? ut(e) : "decoder" in e.serializer ? ut(e.serializer.decoder) : void 0;
        },
        getRawChanges: function getRawChanges(e, t) {
          return ft(e, t);
        }
      };
      var mt = /*#__PURE__*/function () {
        function mt() {
          var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : !1;
          _classCallCheck(this, mt);
          _defineProperty(this, "iterable", void 0);
          _defineProperty(this, "items", void 0);
          _defineProperty(this, "visible", new WeakSet());
          _defineProperty(this, "invisible", new WeakSet());
          _defineProperty(this, "tags", void 0);
          _defineProperty(this, "changes", new Map());
          this.iterable = e, e && (this.items = []);
        }
        return _createClass(mt, [{
          key: "add",
          value: function add(t) {
            var _this23 = this;
            var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : We;
            var s = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : !0;
            var i = t === null || t === void 0 ? void 0 : t[d],
              o = i.parent;
            if (!i) return console.warn("StateView#add(), invalid object:", t), !1;
            if (!o && 0 !== t[r]) throw new Error("Cannot add a detached instance to the StateView. Make sure to assign the \"".concat(i.ref.constructor.name, "\" instance to the state before calling view.add()"));
            var a = t.constructor[Symbol.metadata];
            this.visible.add(i), this.iterable && s && this.items.push(t), s && o && this.addParentOf(i, n);
            var c = this.changes.get(t[r]);
            void 0 === c && (c = {}, this.changes.set(t[r], c));
            var l = !1;
            if (i.forEachChild(function (e, t) {
              a && void 0 !== a[t].tag && a[t].tag !== n || _this23.add(e.ref, n, !1) && (l = !0);
            }), n !== We) {
              var _a$v;
              var _t51;
              this.tags || (this.tags = new WeakMap()), this.tags.has(i) ? _t51 = this.tags.get(i) : (_t51 = new Set(), this.tags.set(i, _t51)), _t51.add(n), a === null || a === void 0 || (_a$v = a[v]) === null || _a$v === void 0 || (_a$v = _a$v[n]) === null || _a$v === void 0 ? void 0 : _a$v.forEach(function (t) {
                i.getChange(t) !== e.OPERATION.DELETE && (c[t] = e.OPERATION.ADD);
              });
            } else if (!i.isNew || l) {
              var _t52 = void 0 !== i.filteredChanges ? i.allFilteredChanges : i.allChanges,
                _s28 = this.invisible.has(i);
              for (var _r15 = 0, _o0 = _t52.operations.length; _r15 < _o0; _r15++) {
                var _i$indexedOperations$;
                var _o1 = _t52.operations[_r15];
                if (void 0 === _o1) continue;
                var _h3 = (_i$indexedOperations$ = i.indexedOperations[_o1]) !== null && _i$indexedOperations$ !== void 0 ? _i$indexedOperations$ : e.OPERATION.ADD,
                  _d3 = a === null || a === void 0 ? void 0 : a[_o1].tag;
                _h3 === e.OPERATION.DELETE || !_s28 && void 0 !== _d3 && _d3 !== n || (c[_o1] = _h3, l = !0);
              }
            }
            return l;
          }
        }, {
          key: "addParentOf",
          value: function addParentOf(t, n) {
            var s = t.parent[d],
              i = t.parentIndex;
            if (!this.visible.has(s)) {
              var _s$parent;
              this.visible.add(s);
              var _e38 = (_s$parent = s.parent) === null || _s$parent === void 0 ? void 0 : _s$parent[d];
              _e38 && void 0 !== _e38.filteredChanges && this.addParentOf(s, n);
            }
            if (s.getChange(i) !== e.OPERATION.DELETE) {
              var _t53,
                _o10 = this.changes.get(s.ref[r]);
              void 0 === _o10 && (_o10 = {}, this.changes.set(s.ref[r], _o10)), this.tags || (this.tags = new WeakMap()), this.tags.has(s) ? _t53 = this.tags.get(s) : (_t53 = new Set(), this.tags.set(s, _t53)), _t53.add(n), _o10[i] = e.OPERATION.ADD;
            }
          }
        }, {
          key: "remove",
          value: function remove(t) {
            var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : We;
            var s = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : !1;
            var i = t[d];
            if (!i) return console.warn("StateView#remove(), invalid object:", t), this;
            this.visible.delete(i), this.iterable && !s && it(this.items, this.items.indexOf(t));
            var o = i.ref,
              a = o.constructor[Symbol.metadata],
              c = o[r];
            var l = this.changes.get(c);
            if (void 0 === l && (l = {}, this.changes.set(c, l)), n === We) {
              var _a$b;
              var _t54 = i.parent;
              if (_t54 && !we.isValidInstance(_t54) && i.isFiltered) {
                var _n35 = _t54[r];
                var _s29 = this.changes.get(_n35);
                void 0 === _s29 ? (_s29 = {}, this.changes.set(_n35, _s29)) : _s29[i.parentIndex] === e.OPERATION.ADD && this.changes.delete(c), _s29[i.parentIndex] = e.OPERATION.DELETE, this._recursiveDeleteVisibleChangeTree(i);
              } else a === null || a === void 0 || (_a$b = a[b]) === null || _a$b === void 0 || _a$b.forEach(function (t) {
                return l[t] = e.OPERATION.DELETE;
              });
            } else a === null || a === void 0 || a[v][n].forEach(function (t) {
              return l[t] = e.OPERATION.DELETE;
            });
            if (this.tags && this.tags.has(i)) {
              var _e39 = this.tags.get(i);
              void 0 === n ? this.tags.delete(i) : (_e39.delete(n), 0 === _e39.size && this.tags.delete(i));
            }
            return this;
          }
        }, {
          key: "has",
          value: function has(e) {
            return this.visible.has(e[d]);
          }
        }, {
          key: "hasTag",
          value: function hasTag(e) {
            var _this$tags, _n$has;
            var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : We;
            var n = (_this$tags = this.tags) === null || _this$tags === void 0 ? void 0 : _this$tags.get(e[d]);
            return (_n$has = n === null || n === void 0 ? void 0 : n.has(t)) !== null && _n$has !== void 0 ? _n$has : !1;
          }
        }, {
          key: "clear",
          value: function clear() {
            if (!this.iterable) throw new Error("StateView#clear() is only available for iterable StateView's. Use StateView(iterable: true) constructor.");
            for (var _e40 = 0, _t55 = this.items.length; _e40 < _t55; _e40++) this.remove(this.items[_e40], We, !0);
            this.items.length = 0;
          }
        }, {
          key: "isChangeTreeVisible",
          value: function isChangeTreeVisible(e) {
            var t = this.visible.has(e);
            return !t && e.isVisibilitySharedWithParent && this.visible.has(e.parent[d]) && (this.visible.add(e), t = !0), t;
          }
        }, {
          key: "_recursiveDeleteVisibleChangeTree",
          value: function _recursiveDeleteVisibleChangeTree(e) {
            var _this24 = this;
            e.forEachChild(function (e) {
              _this24.visible.delete(e), _this24._recursiveDeleteVisibleChangeTree(e);
            });
          }
        }]);
      }();
      me("map", {
        constructor: Ve
      }), me("array", {
        constructor: Fe
      }), me("set", {
        constructor: qe
      }), me("collection", {
        constructor: ze
      }), e.$changes = d, e.$childType = u, e.$decoder = a, e.$deleteByIndex = h, e.$encoder = o, e.$filter = c, e.$getByIndex = l, e.$refId = r, e.$track = i, e.ArraySchema = Fe, e.Callbacks = pt, e.ChangeTree = Re, e.CollectionSchema = ze, e.Decoder = ct, e.Encoder = rt, e.MapSchema = Ve, e.Metadata = we, e.Reflection = dt, e.ReflectionField = lt, e.ReflectionType = ht, e.Schema = tt, e.SetSchema = qe, e.StateCallbackStrategy = gt, e.StateView = mt, e.TypeContext = ve, e.decode = fe, e.decodeKeyValueOperation = _e, e.decodeSchemaOperation = $e, e.defineCustomTypes = be, e.defineTypes = Ze, e.deprecated = Ge, e.dumpChanges = et, e.encode = z, e.encodeArray = Ne, e.encodeKeyValueOperation = Pe, e.encodeSchemaOperation = Se, e.entity = He, e.getDecoderStateCallbacks = ut, e.getRawChangesCallback = ft, e.registerType = me, e.schema = Xe, e.type = Ye, e.view = Je;
    }(d.exports)), d.exports);
  try {
    u = new TextDecoder();
  } catch (e) {}
  var m,
    y,
    b,
    v,
    E,
    O = 0,
    w = {},
    A = 0,
    I = 0,
    T = [],
    C = {
      useRecords: !1,
      mapsAsObjects: !0
    };
  var R = /*#__PURE__*/_createClass(function R() {
    _classCallCheck(this, R);
  });
  var x = new R();
  x.name = "MessagePack 0xC1";
  var S = !1,
    P = 2;
  try {
    new Function("");
  } catch (e) {
    P = 1 / 0;
  }
  var N = /*#__PURE__*/function () {
    function N(e) {
      _classCallCheck(this, N);
      e && (!1 === e.useRecords && void 0 === e.mapsAsObjects && (e.mapsAsObjects = !0), e.sequential && !1 !== e.trusted && (e.trusted = !0, e.structures || 0 == e.useRecords || (e.structures = [], e.maxSharedStructures || (e.maxSharedStructures = 0))), e.structures ? e.structures.sharedLength = e.structures.length : e.getStructures && ((e.structures = []).uninitialized = !0, e.structures.sharedLength = 0), e.int64AsNumber && (e.int64AsType = "number")), Object.assign(this, e);
    }
    return _createClass(N, [{
      key: "unpack",
      value: function unpack(e, t) {
        var _this25 = this;
        if (f) return oe(function () {
          return ae(), _this25 ? _this25.unpack(e, t) : N.prototype.unpack.call(C, e, t);
        });
        e.buffer || e.constructor !== ArrayBuffer || (e = "undefined" != typeof Buffer ? Buffer.from(e) : new Uint8Array(e)), "object" == _typeof(t) ? (g = t.end || e.length, O = t.start || 0) : (O = 0, g = t > -1 ? t : e.length), I = 0, y = null, b = null, f = e;
        try {
          E = e.dataView || (e.dataView = new DataView(e.buffer, e.byteOffset, e.byteLength));
        } catch (t) {
          if (f = null, e instanceof Uint8Array) throw t;
          throw new Error("Source must be a Uint8Array or Buffer but was a " + (e && "object" == _typeof(e) ? e.constructor.name : _typeof(e)));
        }
        if (this instanceof N) {
          if (w = this, this.structures) return m = this.structures, k(t);
          (!m || m.length > 0) && (m = []);
        } else w = C, (!m || m.length > 0) && (m = []);
        return k(t);
      }
    }, {
      key: "unpackMultiple",
      value: function unpackMultiple(e, t) {
        var n,
          s = 0;
        try {
          S = !0;
          var _r16 = e.length,
            _i11 = this ? this.unpack(e, _r16) : le.unpack(e, _r16);
          if (!t) {
            for (n = [_i11]; O < _r16;) s = O, n.push(k());
            return n;
          }
          if (!1 === t(_i11, s, O)) return;
          for (; O < _r16;) if (s = O, !1 === t(k(), s, O)) return;
        } catch (e) {
          throw e.lastPosition = s, e.values = n, e;
        } finally {
          S = !1, ae();
        }
      }
    }, {
      key: "_mergeStructures",
      value: function _mergeStructures(e, t) {
        e = e || [], Object.isFrozen(e) && (e = e.map(function (e) {
          return e.slice(0);
        }));
        for (var _t56 = 0, _n36 = e.length; _t56 < _n36; _t56++) {
          var _n37 = e[_t56];
          _n37 && (_n37.isShared = !0, _t56 >= 32 && (_n37.highByte = _t56 - 32 >> 5));
        }
        e.sharedLength = e.length;
        for (var _n38 in t || []) if (_n38 >= 0) {
          var _s30 = e[_n38],
            _r17 = t[_n38];
          _r17 && (_s30 && ((e.restoreStructures || (e.restoreStructures = []))[_n38] = _s30), e[_n38] = _r17);
        }
        return this.structures = e;
      }
    }, {
      key: "decode",
      value: function decode(e, t) {
        return this.unpack(e, t);
      }
    }]);
  }();
  function k(e) {
    try {
      if (!w.trusted && !S) {
        var _e41 = m.sharedLength || 0;
        _e41 < m.length && (m.length = _e41);
      }
      var _e42;
      if (w.randomAccessStructure && f[O] < 64 && f[O], _e42 = $(), b && (O = b.postBundlePosition, b = null), S && (m.restoreStructures = null), O == g) m && m.restoreStructures && D(), m = null, f = null, v && (v = null);else {
        if (O > g) throw new Error("Unexpected end of MessagePack data");
        if (!S) {
          var _t57;
          try {
            _t57 = JSON.stringify(_e42, function (e, t) {
              return "bigint" == typeof t ? "".concat(t, "n") : t;
            }).slice(0, 100);
          } catch (e) {
            _t57 = "(JSON view not available " + e + ")";
          }
          throw new Error("Data read, but end of buffer not reached " + _t57);
        }
      }
      return _e42;
    } catch (e) {
      throw m && m.restoreStructures && D(), ae(), (e instanceof RangeError || e.message.startsWith("Unexpected end of buffer") || O > g) && (e.incomplete = !0), e;
    }
  }
  function D() {
    for (var _e43 in m.restoreStructures) m[_e43] = m.restoreStructures[_e43];
    m.restoreStructures = null;
  }
  function $() {
    var e = f[O++];
    if (e < 160) {
      if (e < 128) {
        if (e < 64) return e;
        {
          var _t58 = m[63 & e] || w.getStructures && j()[63 & e];
          return _t58 ? (_t58.read || (_t58.read = L(_t58, 63 & e)), _t58.read()) : e;
        }
      }
      if (e < 144) {
        if (e -= 128, w.mapsAsObjects) {
          var _t59 = {};
          for (var _n39 = 0; _n39 < e; _n39++) {
            var _e44 = Q();
            "__proto__" === _e44 && (_e44 = "__proto_"), _t59[_e44] = $();
          }
          return _t59;
        }
        {
          var _t60 = new Map();
          for (var _n40 = 0; _n40 < e; _n40++) _t60.set($(), $());
          return _t60;
        }
      }
      {
        e -= 144;
        var _t61 = new Array(e);
        for (var _n41 = 0; _n41 < e; _n41++) _t61[_n41] = $();
        return w.freezeData ? Object.freeze(_t61) : _t61;
      }
    }
    if (e < 192) {
      var _t62 = e - 160;
      if (I >= O) return y.slice(O - A, (O += _t62) - A);
      if (0 == I && g < 140) {
        var _e45 = _t62 < 16 ? Y(_t62) : J(_t62);
        if (null != _e45) return _e45;
      }
      return B(_t62);
    }
    {
      var _t63;
      switch (e) {
        case 192:
          return null;
        case 193:
          return b ? (_t63 = $(), _t63 > 0 ? b[1].slice(b.position1, b.position1 += _t63) : b[0].slice(b.position0, b.position0 -= _t63)) : x;
        case 194:
          return !1;
        case 195:
          return !0;
        case 196:
          if (_t63 = f[O++], void 0 === _t63) throw new Error("Unexpected end of buffer");
          return G(_t63);
        case 197:
          return _t63 = E.getUint16(O), O += 2, G(_t63);
        case 198:
          return _t63 = E.getUint32(O), O += 4, G(_t63);
        case 199:
          return Z(f[O++]);
        case 200:
          return _t63 = E.getUint16(O), O += 2, Z(_t63);
        case 201:
          return _t63 = E.getUint32(O), O += 4, Z(_t63);
        case 202:
          if (_t63 = E.getFloat32(O), w.useFloat32 > 2) {
            var _e46 = ce[(127 & f[O]) << 1 | f[O + 1] >> 7];
            return O += 4, (_e46 * _t63 + (_t63 > 0 ? .5 : -.5) | 0) / _e46;
          }
          return O += 4, _t63;
        case 203:
          return _t63 = E.getFloat64(O), O += 8, _t63;
        case 204:
          return f[O++];
        case 205:
          return _t63 = E.getUint16(O), O += 2, _t63;
        case 206:
          return _t63 = E.getUint32(O), O += 4, _t63;
        case 207:
          return "number" === w.int64AsType ? (_t63 = 4294967296 * E.getUint32(O), _t63 += E.getUint32(O + 4)) : "string" === w.int64AsType ? _t63 = E.getBigUint64(O).toString() : "auto" === w.int64AsType ? (_t63 = E.getBigUint64(O), _t63 <= BigInt(2) << BigInt(52) && (_t63 = Number(_t63))) : _t63 = E.getBigUint64(O), O += 8, _t63;
        case 208:
          return E.getInt8(O++);
        case 209:
          return _t63 = E.getInt16(O), O += 2, _t63;
        case 210:
          return _t63 = E.getInt32(O), O += 4, _t63;
        case 211:
          return "number" === w.int64AsType ? (_t63 = 4294967296 * E.getInt32(O), _t63 += E.getUint32(O + 4)) : "string" === w.int64AsType ? _t63 = E.getBigInt64(O).toString() : "auto" === w.int64AsType ? (_t63 = E.getBigInt64(O), _t63 >= BigInt(-2) << BigInt(52) && _t63 <= BigInt(2) << BigInt(52) && (_t63 = Number(_t63))) : _t63 = E.getBigInt64(O), O += 8, _t63;
        case 212:
          if (_t63 = f[O++], 114 == _t63) return te(63 & f[O++]);
          {
            var _e47 = T[_t63];
            if (_e47) return _e47.read ? (O++, _e47.read($())) : _e47.noBuffer ? (O++, _e47()) : _e47(f.subarray(O, ++O));
            throw new Error("Unknown extension " + _t63);
          }
        case 213:
          return _t63 = f[O], 114 == _t63 ? (O++, te(63 & f[O++], f[O++])) : Z(2);
        case 214:
          return Z(4);
        case 215:
          return Z(8);
        case 216:
          return Z(16);
        case 217:
          return _t63 = f[O++], I >= O ? y.slice(O - A, (O += _t63) - A) : U(_t63);
        case 218:
          return _t63 = E.getUint16(O), I >= (O += 2) ? y.slice(O - A, (O += _t63) - A) : F(_t63);
        case 219:
          return _t63 = E.getUint32(O), I >= (O += 4) ? y.slice(O - A, (O += _t63) - A) : V(_t63);
        case 220:
          return _t63 = E.getUint16(O), O += 2, q(_t63);
        case 221:
          return _t63 = E.getUint32(O), O += 4, q(_t63);
        case 222:
          return _t63 = E.getUint16(O), O += 2, W(_t63);
        case 223:
          return _t63 = E.getUint32(O), O += 4, W(_t63);
        default:
          if (e >= 224) return e - 256;
          if (void 0 === e) {
            var _e48 = new Error("Unexpected end of MessagePack data");
            throw _e48.incomplete = !0, _e48;
          }
          throw new Error("Unknown MessagePack token " + e);
      }
    }
  }
  var _ = /^[a-zA-Z_$][a-zA-Z\d_$]*$/;
  function L(e, t) {
    function n() {
      if (n.count++ > P) {
        var _n42 = e.read = new Function("r", "return function(){return " + (w.freezeData ? "Object.freeze" : "") + "({" + e.map(function (e) {
          return "__proto__" === e ? "__proto_:r()" : _.test(e) ? e + ":r()" : "[" + JSON.stringify(e) + "]:r()";
        }).join(",") + "})}")($);
        return 0 === e.highByte && (e.read = M(t, e.read)), _n42();
      }
      var s = {};
      for (var _t64 = 0, _n43 = e.length; _t64 < _n43; _t64++) {
        var _n44 = e[_t64];
        "__proto__" === _n44 && (_n44 = "__proto_"), s[_n44] = $();
      }
      return w.freezeData ? Object.freeze(s) : s;
    }
    return n.count = 0, 0 === e.highByte ? M(t, n) : n;
  }
  var M = function M(e, t) {
    return function () {
      var n = f[O++];
      if (0 === n) return t();
      var s = e < 32 ? -(e + (n << 5)) : e + (n << 5),
        r = m[s] || j()[s];
      if (!r) throw new Error("Record id is not defined for " + s);
      return r.read || (r.read = L(r, e)), r.read();
    };
  };
  function j() {
    var e = oe(function () {
      return f = null, w.getStructures();
    });
    return m = w._mergeStructures(e, m);
  }
  var B = z,
    U = z,
    F = z,
    V = z;
  function z(e) {
    var t;
    if (e < 16 && (t = Y(e))) return t;
    if (e > 64 && u) return u.decode(f.subarray(O, O += e));
    var n = O + e,
      s = [];
    for (t = ""; O < n;) {
      var _e49 = f[O++];
      if (128 & _e49) {
        if (192 == (224 & _e49)) {
          var _t65 = 63 & f[O++];
          s.push((31 & _e49) << 6 | _t65);
        } else if (224 == (240 & _e49)) {
          var _t66 = 63 & f[O++],
            _n45 = 63 & f[O++];
          s.push((31 & _e49) << 12 | _t66 << 6 | _n45);
        } else if (240 == (248 & _e49)) {
          var _t67 = (7 & _e49) << 18 | (63 & f[O++]) << 12 | (63 & f[O++]) << 6 | 63 & f[O++];
          _t67 > 65535 && (_t67 -= 65536, s.push(_t67 >>> 10 & 1023 | 55296), _t67 = 56320 | 1023 & _t67), s.push(_t67);
        } else s.push(_e49);
      } else s.push(_e49);
      s.length >= 4096 && (t += H.apply(String, s), s.length = 0);
    }
    return s.length > 0 && (t += H.apply(String, s)), t;
  }
  function q(e) {
    var t = new Array(e);
    for (var _n46 = 0; _n46 < e; _n46++) t[_n46] = $();
    return w.freezeData ? Object.freeze(t) : t;
  }
  function W(e) {
    if (w.mapsAsObjects) {
      var _t68 = {};
      for (var _n47 = 0; _n47 < e; _n47++) {
        var _e50 = Q();
        "__proto__" === _e50 && (_e50 = "__proto_"), _t68[_e50] = $();
      }
      return _t68;
    }
    {
      var _t69 = new Map();
      for (var _n48 = 0; _n48 < e; _n48++) _t69.set($(), $());
      return _t69;
    }
  }
  var H = String.fromCharCode;
  function J(e) {
    var t = O,
      n = new Array(e);
    for (var _s31 = 0; _s31 < e; _s31++) {
      var _e51 = f[O++];
      if ((128 & _e51) > 0) return void (O = t);
      n[_s31] = _e51;
    }
    return H.apply(String, n);
  }
  function Y(e) {
    if (e < 4) {
      if (e < 2) {
        if (0 === e) return "";
        {
          var _e52 = f[O++];
          return (128 & _e52) > 1 ? void (O -= 1) : H(_e52);
        }
      }
      {
        var _t70 = f[O++],
          _n49 = f[O++];
        if ((128 & _t70) > 0 || (128 & _n49) > 0) return void (O -= 2);
        if (e < 3) return H(_t70, _n49);
        var _s32 = f[O++];
        return (128 & _s32) > 0 ? void (O -= 3) : H(_t70, _n49, _s32);
      }
    }
    {
      var _t71 = f[O++],
        _n50 = f[O++],
        _s33 = f[O++],
        _r18 = f[O++];
      if ((128 & _t71) > 0 || (128 & _n50) > 0 || (128 & _s33) > 0 || (128 & _r18) > 0) return void (O -= 4);
      if (e < 6) {
        if (4 === e) return H(_t71, _n50, _s33, _r18);
        {
          var _e53 = f[O++];
          return (128 & _e53) > 0 ? void (O -= 5) : H(_t71, _n50, _s33, _r18, _e53);
        }
      }
      if (e < 8) {
        var _i12 = f[O++],
          _o11 = f[O++];
        if ((128 & _i12) > 0 || (128 & _o11) > 0) return void (O -= 6);
        if (e < 7) return H(_t71, _n50, _s33, _r18, _i12, _o11);
        var _a9 = f[O++];
        return (128 & _a9) > 0 ? void (O -= 7) : H(_t71, _n50, _s33, _r18, _i12, _o11, _a9);
      }
      {
        var _i13 = f[O++],
          _o12 = f[O++],
          _a0 = f[O++],
          _c9 = f[O++];
        if ((128 & _i13) > 0 || (128 & _o12) > 0 || (128 & _a0) > 0 || (128 & _c9) > 0) return void (O -= 8);
        if (e < 10) {
          if (8 === e) return H(_t71, _n50, _s33, _r18, _i13, _o12, _a0, _c9);
          {
            var _e54 = f[O++];
            return (128 & _e54) > 0 ? void (O -= 9) : H(_t71, _n50, _s33, _r18, _i13, _o12, _a0, _c9, _e54);
          }
        }
        if (e < 12) {
          var _l2 = f[O++],
            _h4 = f[O++];
          if ((128 & _l2) > 0 || (128 & _h4) > 0) return void (O -= 10);
          if (e < 11) return H(_t71, _n50, _s33, _r18, _i13, _o12, _a0, _c9, _l2, _h4);
          var _d4 = f[O++];
          return (128 & _d4) > 0 ? void (O -= 11) : H(_t71, _n50, _s33, _r18, _i13, _o12, _a0, _c9, _l2, _h4, _d4);
        }
        {
          var _l3 = f[O++],
            _h5 = f[O++],
            _d5 = f[O++],
            _u3 = f[O++];
          if ((128 & _l3) > 0 || (128 & _h5) > 0 || (128 & _d5) > 0 || (128 & _u3) > 0) return void (O -= 12);
          if (e < 14) {
            if (12 === e) return H(_t71, _n50, _s33, _r18, _i13, _o12, _a0, _c9, _l3, _h5, _d5, _u3);
            {
              var _e55 = f[O++];
              return (128 & _e55) > 0 ? void (O -= 13) : H(_t71, _n50, _s33, _r18, _i13, _o12, _a0, _c9, _l3, _h5, _d5, _u3, _e55);
            }
          }
          {
            var _g2 = f[O++],
              _p3 = f[O++];
            if ((128 & _g2) > 0 || (128 & _p3) > 0) return void (O -= 14);
            if (e < 15) return H(_t71, _n50, _s33, _r18, _i13, _o12, _a0, _c9, _l3, _h5, _d5, _u3, _g2, _p3);
            var _m2 = f[O++];
            return (128 & _m2) > 0 ? void (O -= 15) : H(_t71, _n50, _s33, _r18, _i13, _o12, _a0, _c9, _l3, _h5, _d5, _u3, _g2, _p3, _m2);
          }
        }
      }
    }
  }
  function K() {
    var e,
      t = f[O++];
    if (t < 192) e = t - 160;else switch (t) {
      case 217:
        e = f[O++];
        break;
      case 218:
        e = E.getUint16(O), O += 2;
        break;
      case 219:
        e = E.getUint32(O), O += 4;
        break;
      default:
        throw new Error("Expected string");
    }
    return z(e);
  }
  function G(e) {
    return w.copyBuffers ? Uint8Array.prototype.slice.call(f, O, O += e) : f.subarray(O, O += e);
  }
  function Z(e) {
    var t = f[O++];
    if (T[t]) {
      var _n51;
      return T[t](f.subarray(O, _n51 = O += e), function (e) {
        O = e;
        try {
          return $();
        } finally {
          O = _n51;
        }
      });
    }
    throw new Error("Unknown extension type " + t);
  }
  var X = new Array(4096);
  function Q() {
    var e = f[O++];
    if (!(e >= 160 && e < 192)) return O--, ee($());
    if (e -= 160, I >= O) return y.slice(O - A, (O += e) - A);
    if (!(0 == I && g < 180)) return B(e);
    var t,
      n = 4095 & (e << 5 ^ (e > 1 ? E.getUint16(O) : e > 0 ? f[O] : 0)),
      s = X[n],
      r = O,
      i = O + e - 3,
      o = 0;
    if (s && s.bytes == e) {
      for (; r < i;) {
        if (t = E.getUint32(r), t != s[o++]) {
          r = 1879048192;
          break;
        }
        r += 4;
      }
      for (i += 3; r < i;) if (t = f[r++], t != s[o++]) {
        r = 1879048192;
        break;
      }
      if (r === i) return O = r, s.string;
      i -= 3, r = O;
    }
    for (s = [], X[n] = s, s.bytes = e; r < i;) t = E.getUint32(r), s.push(t), r += 4;
    for (i += 3; r < i;) t = f[r++], s.push(t);
    var a = e < 16 ? Y(e) : J(e);
    return s.string = null != a ? a : B(e);
  }
  function ee(e) {
    if ("string" == typeof e) return e;
    if ("number" == typeof e || "boolean" == typeof e || "bigint" == typeof e) return e.toString();
    if (null == e) return e + "";
    if (w.allowArraysInMapKeys && Array.isArray(e) && e.flat().every(function (e) {
      return ["string", "number", "boolean", "bigint"].includes(_typeof(e));
    })) return e.flat().toString();
    throw new Error("Invalid property type for record: " + _typeof(e));
  }
  var te = function te(e, t) {
    var n = $().map(ee),
      s = e;
    void 0 !== t && (e = e < 32 ? -((t << 5) + e) : (t << 5) + e, n.highByte = t);
    var r = m[e];
    return r && (r.isShared || S) && ((m.restoreStructures || (m.restoreStructures = []))[e] = r), m[e] = n, n.read = L(n, s), n.read();
  };
  T[0] = function () {}, T[0].noBuffer = !0, T[66] = function (e) {
    var t = e.length,
      n = BigInt(128 & e[0] ? e[0] - 256 : e[0]);
    for (var _s34 = 1; _s34 < t; _s34++) n <<= BigInt(8), n += BigInt(e[_s34]);
    return n;
  };
  var ne = {
    Error: Error,
    TypeError: TypeError,
    ReferenceError: ReferenceError
  };
  T[101] = function () {
    var e = $();
    return (ne[e[0]] || Error)(e[1], {
      cause: e[2]
    });
  }, T[105] = function (e) {
    if (!1 === w.structuredClone) throw new Error("Structured clone extension is disabled");
    var t = E.getUint32(O - 4);
    v || (v = new Map());
    var n,
      s = f[O];
    n = s >= 144 && s < 160 || 220 == s || 221 == s ? [] : {};
    var r = {
      target: n
    };
    v.set(t, r);
    var i = $();
    return r.used ? Object.assign(n, i) : (r.target = i, i);
  }, T[112] = function (e) {
    if (!1 === w.structuredClone) throw new Error("Structured clone extension is disabled");
    var t = E.getUint32(O - 4),
      n = v.get(t);
    return n.used = !0, n.target;
  }, T[115] = function () {
    return new Set($());
  };
  var se = ["Int8", "Uint8", "Uint8Clamped", "Int16", "Uint16", "Int32", "Uint32", "Float32", "Float64", "BigInt64", "BigUint64"].map(function (e) {
    return e + "Array";
  });
  var re = "object" == (typeof globalThis === "undefined" ? "undefined" : _typeof(globalThis)) ? globalThis : window;
  T[116] = function (e) {
    var t = e[0],
      n = se[t];
    if (!n) {
      if (16 === t) {
        var _t72 = new ArrayBuffer(e.length - 1);
        return new Uint8Array(_t72).set(e.subarray(1)), _t72;
      }
      throw new Error("Could not find typed array for code " + t);
    }
    return new re[n](Uint8Array.prototype.slice.call(e, 1).buffer);
  }, T[120] = function () {
    var e = $();
    return new RegExp(e[0], e[1]);
  };
  var ie = [];
  function oe(e) {
    var _m3;
    var t = g,
      n = O,
      s = A,
      r = I,
      i = y,
      o = v,
      a = b,
      c = new Uint8Array(f.slice(0, g)),
      l = m,
      h = m.slice(0, m.length),
      d = w,
      u = S,
      p = e();
    return g = t, O = n, A = s, I = r, y = i, v = o, b = a, f = c, S = u, (_m3 = m = l).splice.apply(_m3, [0, m.length].concat(_toConsumableArray(h))), w = d, E = new DataView(f.buffer, f.byteOffset, f.byteLength), p;
  }
  function ae() {
    f = null, v = null, m = null;
  }
  T[98] = function (e) {
    var t = (e[0] << 24) + (e[1] << 16) + (e[2] << 8) + e[3],
      n = O;
    return O += t - e.length, b = ie, (b = [K(), K()]).position0 = 0, b.position1 = 0, b.postBundlePosition = O, O = n, $();
  }, T[255] = function (e) {
    return 4 == e.length ? new Date(1e3 * (16777216 * e[0] + (e[1] << 16) + (e[2] << 8) + e[3])) : 8 == e.length ? new Date(((e[0] << 22) + (e[1] << 14) + (e[2] << 6) + (e[3] >> 2)) / 1e6 + 1e3 * (4294967296 * (3 & e[3]) + 16777216 * e[4] + (e[5] << 16) + (e[6] << 8) + e[7])) : 12 == e.length ? new Date(((e[0] << 24) + (e[1] << 16) + (e[2] << 8) + e[3]) / 1e6 + 1e3 * ((128 & e[4] ? -281474976710656 : 0) + 1099511627776 * e[6] + 4294967296 * e[7] + 16777216 * e[8] + (e[9] << 16) + (e[10] << 8) + e[11])) : new Date("invalid");
  };
  var ce = new Array(147);
  for (var _e56 = 0; _e56 < 256; _e56++) ce[_e56] = +("1e" + Math.floor(45.15 - .30103 * _e56));
  var le = new N({
    useRecords: !1
  });
  var he = le.unpack;
  le.unpackMultiple, le.unpack;
  var de,
    ue,
    fe,
    ge = new Float32Array(1);
  new Uint8Array(ge.buffer, 0, 4);
  try {
    de = new TextEncoder();
  } catch (e) {}
  var pe = "undefined" != typeof Buffer,
    me = pe ? function (e) {
      return Buffer.allocUnsafeSlow(e);
    } : Uint8Array,
    ye = pe ? Buffer : Uint8Array,
    be = pe ? 4294967296 : 2144337920;
  var ve,
    Ee,
    Oe,
    we,
    Ae = 0,
    Ie = null;
  var Te = /[\u0080-\uFFFF]/,
    Ce = Symbol("record-id");
  var Re = /*#__PURE__*/function (_N) {
    function Re(e) {
      var _this26;
      _classCallCheck(this, Re);
      var t, n, s, r;
      _this26 = _callSuper(this, Re, [e]), _this26.offset = 0;
      var i = ye.prototype.utf8Write ? function (e, t) {
          return ve.utf8Write(e, t, ve.byteLength - t);
        } : !(!de || !de.encodeInto) && function (e, t) {
          return de.encodeInto(e, ve.subarray(t)).written;
        },
        o = _this26;
      e || (e = {});
      var a = e && e.sequential,
        c = e.structures || e.saveStructures,
        l = e.maxSharedStructures;
      if (null == l && (l = c ? 32 : 0), l > 8160) throw new Error("Maximum maxSharedStructure is 8160");
      e.structuredClone && null == e.moreTypes && (_this26.moreTypes = !0);
      var h = e.maxOwnStructures;
      null == h && (h = c ? 32 : 64), _this26.structures || 0 == e.useRecords || (_this26.structures = []);
      var d = l > 32 || h + l > 64,
        u = l + 64,
        f = l + h + 64;
      if (f > 8256) throw new Error("Maximum maxSharedStructure + maxOwnStructure is 8192");
      var g = [],
        p = 0,
        m = 0;
      _this26.pack = _this26.encode = function (e, i) {
        if (ve || (ve = new me(8192), Oe = ve.dataView || (ve.dataView = new DataView(ve.buffer, 0, 8192)), Ae = 0), we = ve.length - 10, we - Ae < 2048 ? (ve = new me(ve.length), Oe = ve.dataView || (ve.dataView = new DataView(ve.buffer, 0, ve.length)), we = ve.length - 10, Ae = 0) : Ae = Ae + 7 & 2147483640, t = Ae, i & _e && (Ae += 255 & i), r = o.structuredClone ? new Map() : null, o.bundleStrings && "string" != typeof e ? (Ie = [], Ie.size = 1 / 0) : Ie = null, s = o.structures, s) {
          s.uninitialized && (s = o._mergeStructures(o.getStructures()));
          var _e57 = s.sharedLength || 0;
          if (_e57 > l) throw new Error("Shared structures is larger than maximum shared structures, try increasing maxSharedStructures to " + s.sharedLength);
          if (!s.transitions) {
            s.transitions = Object.create(null);
            for (var _t73 = 0; _t73 < _e57; _t73++) {
              var _e58 = s[_t73];
              if (!_e58) continue;
              var _n52 = void 0,
                _r19 = s.transitions;
              for (var _t74 = 0, _s35 = _e58.length; _t74 < _s35; _t74++) {
                var _s36 = _e58[_t74];
                _n52 = _r19[_s36], _n52 || (_n52 = _r19[_s36] = Object.create(null)), _r19 = _n52;
              }
              _r19[Ce] = _t73 + 64;
            }
            this.lastNamedStructuresLength = _e57;
          }
          a || (s.nextId = _e57 + 64);
        }
        var c;
        n && (n = !1);
        try {
          o.randomAccessStructure && e && e.constructor && e.constructor === Object ? R(e) : _v2(e);
          var _n53 = Ie;
          if (Ie && Ne(t, _v2, 0), r && r.idsToInsert) {
            var _e59 = r.idsToInsert.sort(function (e, t) {
                return e.offset > t.offset ? 1 : -1;
              }),
              _s37 = _e59.length,
              _i14 = -1;
            for (; _n53 && _s37 > 0;) {
              var _r20 = _e59[--_s37].offset + t;
              _r20 < _n53.stringsPosition + t && -1 === _i14 && (_i14 = 0), _r20 > _n53.position + t ? _i14 >= 0 && (_i14 += 6) : (_i14 >= 0 && (Oe.setUint32(_n53.position + t, Oe.getUint32(_n53.position + t) + _i14), _i14 = -1), _n53 = _n53.previous, _s37++);
            }
            _i14 >= 0 && _n53 && Oe.setUint32(_n53.position + t, Oe.getUint32(_n53.position + t) + _i14), Ae += 6 * _e59.length, Ae > we && I(Ae), o.offset = Ae;
            var _a1 = function (e, t) {
              var n,
                s = 6 * t.length,
                r = e.length - s;
              for (; n = t.pop();) {
                var _t75 = n.offset,
                  _i15 = n.id;
                e.copyWithin(_t75 + s, _t75, r), s -= 6;
                var _o13 = _t75 + s;
                e[_o13++] = 214, e[_o13++] = 105, e[_o13++] = _i15 >> 24, e[_o13++] = _i15 >> 16 & 255, e[_o13++] = _i15 >> 8 & 255, e[_o13++] = 255 & _i15, r = _t75;
              }
              return e;
            }(ve.subarray(t, Ae), _e59);
            return r = null, _a1;
          }
          return o.offset = Ae, i & De ? (ve.start = t, ve.end = Ae, ve) : ve.subarray(t, Ae);
        } catch (e) {
          throw c = e, e;
        } finally {
          if (s && (y(), n && o.saveStructures)) {
            var _n54 = s.sharedLength || 0,
              _r21 = ve.subarray(t, Ae),
              _a10 = function (e, t) {
                return e.isCompatible = function (e) {
                  var n = !e || (t.lastNamedStructuresLength || 0) === e.length;
                  return n || t._mergeStructures(e), n;
                }, e;
              }(s, o);
            if (!c) return !1 === o.saveStructures(_a10, _a10.isCompatible) ? o.pack(e, i) : (o.lastNamedStructuresLength = _n54, ve.length > 1073741824 && (ve = null), _r21);
          }
          ve.length > 1073741824 && (ve = null), i & $e && (Ae = t);
        }
      };
      var y = function y() {
          m < 10 && m++;
          var e = s.sharedLength || 0;
          if (s.length > e && !a && (s.length = e), p > 1e4) s.transitions = null, m = 0, p = 0, g.length > 0 && (g = []);else if (g.length > 0 && !a) {
            for (var _e60 = 0, _t76 = g.length; _e60 < _t76; _e60++) g[_e60][Ce] = 0;
            g = [];
          }
        },
        b = function b(e) {
          var t = e.length;
          t < 16 ? ve[Ae++] = 144 | t : t < 65536 ? (ve[Ae++] = 220, ve[Ae++] = t >> 8, ve[Ae++] = 255 & t) : (ve[Ae++] = 221, Oe.setUint32(Ae, t), Ae += 4);
          for (var _n55 = 0; _n55 < t; _n55++) _v2(e[_n55]);
        },
        _v2 = function v(e) {
          Ae > we && (ve = I(Ae));
          var n,
            s = _typeof(e);
          if ("string" === s) {
            var _s38,
              _r22 = e.length;
            if (Ie && _r22 >= 4 && _r22 < 4096) {
              if ((Ie.size += _r22) > 21760) {
                var _e61,
                  _n56,
                  _s39 = (Ie[0] ? 3 * Ie[0].length + Ie[1].length : 0) + 10;
                Ae + _s39 > we && (ve = I(Ae + _s39)), Ie.position ? (_n56 = Ie, ve[Ae] = 200, Ae += 3, ve[Ae++] = 98, _e61 = Ae - t, Ae += 4, Ne(t, _v2, 0), Oe.setUint16(_e61 + t - 3, Ae - t - _e61)) : (ve[Ae++] = 214, ve[Ae++] = 98, _e61 = Ae - t, Ae += 4), Ie = ["", ""], Ie.previous = _n56, Ie.size = 0, Ie.position = _e61;
              }
              var _n57 = Te.test(e);
              return Ie[_n57 ? 0 : 1] += e, ve[Ae++] = 193, void _v2(_n57 ? -_r22 : _r22);
            }
            _s38 = _r22 < 32 ? 1 : _r22 < 256 ? 2 : _r22 < 65536 ? 3 : 5;
            var _o14 = 3 * _r22;
            if (Ae + _o14 > we && (ve = I(Ae + _o14)), _r22 < 64 || !i) {
              var _t77,
                _i16,
                _o15,
                _a11 = Ae + _s38;
              for (_t77 = 0; _t77 < _r22; _t77++) _i16 = e.charCodeAt(_t77), _i16 < 128 ? ve[_a11++] = _i16 : _i16 < 2048 ? (ve[_a11++] = _i16 >> 6 | 192, ve[_a11++] = 63 & _i16 | 128) : 55296 == (64512 & _i16) && 56320 == (64512 & (_o15 = e.charCodeAt(_t77 + 1))) ? (_i16 = 65536 + ((1023 & _i16) << 10) + (1023 & _o15), _t77++, ve[_a11++] = _i16 >> 18 | 240, ve[_a11++] = _i16 >> 12 & 63 | 128, ve[_a11++] = _i16 >> 6 & 63 | 128, ve[_a11++] = 63 & _i16 | 128) : (ve[_a11++] = _i16 >> 12 | 224, ve[_a11++] = _i16 >> 6 & 63 | 128, ve[_a11++] = 63 & _i16 | 128);
              n = _a11 - Ae - _s38;
            } else n = i(e, Ae + _s38);
            n < 32 ? ve[Ae++] = 160 | n : n < 256 ? (_s38 < 2 && ve.copyWithin(Ae + 2, Ae + 1, Ae + 1 + n), ve[Ae++] = 217, ve[Ae++] = n) : n < 65536 ? (_s38 < 3 && ve.copyWithin(Ae + 3, Ae + 2, Ae + 2 + n), ve[Ae++] = 218, ve[Ae++] = n >> 8, ve[Ae++] = 255 & n) : (_s38 < 5 && ve.copyWithin(Ae + 5, Ae + 3, Ae + 3 + n), ve[Ae++] = 219, Oe.setUint32(Ae, n), Ae += 4), Ae += n;
          } else if ("number" === s) {
            if (e >>> 0 === e) e < 32 || e < 128 && !1 === _this26.useRecords || e < 64 && !_this26.randomAccessStructure ? ve[Ae++] = e : e < 256 ? (ve[Ae++] = 204, ve[Ae++] = e) : e < 65536 ? (ve[Ae++] = 205, ve[Ae++] = e >> 8, ve[Ae++] = 255 & e) : (ve[Ae++] = 206, Oe.setUint32(Ae, e), Ae += 4);else if ((e | 0) === e) e >= -32 ? ve[Ae++] = 256 + e : e >= -128 ? (ve[Ae++] = 208, ve[Ae++] = e + 256) : e >= -32768 ? (ve[Ae++] = 209, Oe.setInt16(Ae, e), Ae += 2) : (ve[Ae++] = 210, Oe.setInt32(Ae, e), Ae += 4);else {
              var _t78;
              if ((_t78 = _this26.useFloat32) > 0 && e < 4294967296 && e >= -2147483648) {
                var _n58;
                if (ve[Ae++] = 202, Oe.setFloat32(Ae, e), _t78 < 4 || ((_n58 = e * ce[(127 & ve[Ae]) << 1 | ve[Ae + 1] >> 7]) | 0) === _n58) return void (Ae += 4);
                Ae--;
              }
              ve[Ae++] = 203, Oe.setFloat64(Ae, e), Ae += 8;
            }
          } else if ("object" === s || "function" === s) {
            if (e) {
              if (r) {
                var _n59 = r.get(e);
                if (_n59) {
                  if (!_n59.id) {
                    var _e62 = r.idsToInsert || (r.idsToInsert = []);
                    _n59.id = _e62.push(_n59);
                  }
                  return ve[Ae++] = 214, ve[Ae++] = 112, Oe.setUint32(Ae, _n59.id), void (Ae += 4);
                }
                r.set(e, {
                  offset: Ae - t
                });
              }
              var _i17 = e.constructor;
              if (_i17 === Object) A(e);else if (_i17 === Array) b(e);else if (_i17 === Map) {
                if (_this26.mapAsEmptyObject) ve[Ae++] = 128;else {
                  (n = e.size) < 16 ? ve[Ae++] = 128 | n : n < 65536 ? (ve[Ae++] = 222, ve[Ae++] = n >> 8, ve[Ae++] = 255 & n) : (ve[Ae++] = 223, Oe.setUint32(Ae, n), Ae += 4);
                  var _iterator6 = _createForOfIteratorHelper(e),
                    _step6;
                  try {
                    for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
                      var _step6$value = _slicedToArray(_step6.value, 2),
                        _t79 = _step6$value[0],
                        _n60 = _step6$value[1];
                      _v2(_t79), _v2(_n60);
                    }
                  } catch (err) {
                    _iterator6.e(err);
                  } finally {
                    _iterator6.f();
                  }
                }
              } else {
                var _loop2 = function _loop2() {
                    if (e instanceof fe[_t80]) {
                      var _n62 = ue[_t80];
                      if (_n62.write) {
                        _n62.type && (ve[Ae++] = 212, ve[Ae++] = _n62.type, ve[Ae++] = 0);
                        var _t82 = _n62.write.call(_this26, e);
                        return {
                          v: void (_t82 === e ? Array.isArray(e) ? b(e) : A(e) : _v2(_t82))
                        };
                      }
                      var _s40,
                        _r23 = ve,
                        _i18 = Oe,
                        _o16 = Ae;
                      ve = null;
                      try {
                        _s40 = _n62.pack.call(_this26, e, function (e) {
                          return ve = _r23, _r23 = null, Ae += e, Ae > we && I(Ae), {
                            target: ve,
                            targetView: Oe,
                            position: Ae - e
                          };
                        }, _v2);
                      } finally {
                        _r23 && (ve = _r23, Oe = _i18, Ae = _o16, we = ve.length - 10);
                      }
                      return {
                        v: void (_s40 && (_s40.length + Ae > we && I(_s40.length + Ae), Ae = Pe(_s40, ve, Ae, _n62.type)))
                      };
                    }
                  },
                  _ret;
                for (var _t80 = 0, _n61 = ue.length; _t80 < _n61; _t80++) {
                  _ret = _loop2();
                  if (_ret) return _ret.v;
                }
                if (Array.isArray(e)) b(e);else {
                  if (e.toJSON) {
                    var _t81 = e.toJSON();
                    if (_t81 !== e) return _v2(_t81);
                  }
                  if ("function" === s) return _v2(_this26.writeFunction && _this26.writeFunction(e));
                  A(e);
                }
              }
            } else ve[Ae++] = 192;
          } else if ("boolean" === s) ve[Ae++] = e ? 195 : 194;else if ("bigint" === s) {
            if (e < BigInt(1) << BigInt(63) && e >= -(BigInt(1) << BigInt(63))) ve[Ae++] = 211, Oe.setBigInt64(Ae, e);else if (e < BigInt(1) << BigInt(64) && e > 0) ve[Ae++] = 207, Oe.setBigUint64(Ae, e);else {
              if (!_this26.largeBigIntToFloat) {
                if (_this26.largeBigIntToString) return _v2(e.toString());
                if (_this26.useBigIntExtension && e < Math.pow(BigInt(2), BigInt(1023)) && e > -Math.pow(BigInt(2), BigInt(1023))) {
                  ve[Ae++] = 199, Ae++, ve[Ae++] = 66;
                  var _t83,
                    _n63 = [];
                  do {
                    var _s41 = e & BigInt(255);
                    _t83 = (_s41 & BigInt(128)) === (e < BigInt(0) ? BigInt(128) : BigInt(0)), _n63.push(_s41), e >>= BigInt(8);
                  } while (e !== BigInt(0) && e !== BigInt(-1) || !_t83);
                  ve[Ae - 2] = _n63.length;
                  for (var _e63 = _n63.length; _e63 > 0;) ve[Ae++] = Number(_n63[--_e63]);
                  return;
                }
                throw new RangeError(e + " was too large to fit in MessagePack 64-bit integer format, use useBigIntExtension, or set largeBigIntToFloat to convert to float-64, or set largeBigIntToString to convert to string");
              }
              ve[Ae++] = 203, Oe.setFloat64(Ae, Number(e));
            }
            Ae += 8;
          } else {
            if ("undefined" !== s) throw new Error("Unknown type: " + s);
            _this26.encodeUndefinedAsNil ? ve[Ae++] = 192 : (ve[Ae++] = 212, ve[Ae++] = 0, ve[Ae++] = 0);
          }
        },
        E = _this26.variableMapSize || _this26.coercibleKeyAsNumber || _this26.skipValues ? function (e) {
          var t;
          if (_this26.skipValues) {
            t = [];
            for (var _n64 in e) "function" == typeof e.hasOwnProperty && !e.hasOwnProperty(_n64) || _this26.skipValues.includes(e[_n64]) || t.push(_n64);
          } else t = Object.keys(e);
          var n,
            s = t.length;
          if (s < 16 ? ve[Ae++] = 128 | s : s < 65536 ? (ve[Ae++] = 222, ve[Ae++] = s >> 8, ve[Ae++] = 255 & s) : (ve[Ae++] = 223, Oe.setUint32(Ae, s), Ae += 4), _this26.coercibleKeyAsNumber) for (var _r24 = 0; _r24 < s; _r24++) {
            n = t[_r24];
            var _s42 = Number(n);
            _v2(isNaN(_s42) ? n : _s42), _v2(e[n]);
          } else for (var _r25 = 0; _r25 < s; _r25++) _v2(n = t[_r25]), _v2(e[n]);
        } : function (e) {
          ve[Ae++] = 222;
          var n = Ae - t;
          Ae += 2;
          var s = 0;
          for (var _t84 in e) ("function" != typeof e.hasOwnProperty || e.hasOwnProperty(_t84)) && (_v2(_t84), _v2(e[_t84]), s++);
          if (s > 65535) throw new Error('Object is too large to serialize with fast 16-bit map size, use the "variableMapSize" option to serialize this object');
          ve[n++ + t] = s >> 8, ve[n + t] = 255 & s;
        },
        O = !1 === _this26.useRecords ? E : e.progressiveRecords && !d ? function (e) {
          var n,
            r,
            i = s.transitions || (s.transitions = Object.create(null)),
            o = Ae++ - t;
          for (var _a12 in e) if ("function" != typeof e.hasOwnProperty || e.hasOwnProperty(_a12)) {
            if (n = i[_a12], n) i = n;else {
              var _c0 = Object.keys(e),
                _l4 = i;
              i = s.transitions;
              var _h6 = 0;
              for (var _e64 = 0, _t85 = _c0.length; _e64 < _t85; _e64++) {
                var _t86 = _c0[_e64];
                n = i[_t86], n || (n = i[_t86] = Object.create(null), _h6++), i = n;
              }
              o + t + 1 == Ae ? (Ae--, T(i, _c0, _h6)) : C(i, _c0, o, _h6), r = !0, i = _l4[_a12];
            }
            _v2(e[_a12]);
          }
          if (!r) {
            var _n65 = i[Ce];
            _n65 ? ve[o + t] = _n65 : C(i, Object.keys(e), o, 0);
          }
        } : function (e) {
          var t,
            n = s.transitions || (s.transitions = Object.create(null)),
            r = 0;
          for (var _s43 in e) ("function" != typeof e.hasOwnProperty || e.hasOwnProperty(_s43)) && (t = n[_s43], t || (t = n[_s43] = Object.create(null), r++), n = t);
          var i = n[Ce];
          i ? i >= 96 && d ? (ve[Ae++] = 96 + (31 & (i -= 96)), ve[Ae++] = i >> 5) : ve[Ae++] = i : T(n, n.__keys__ || Object.keys(e), r);
          for (var _t87 in e) ("function" != typeof e.hasOwnProperty || e.hasOwnProperty(_t87)) && _v2(e[_t87]);
        },
        w = "function" == typeof _this26.useRecords && _this26.useRecords,
        A = w ? function (e) {
          w(e) ? O(e) : E(e);
        } : O,
        I = function I(e) {
          var n;
          if (e > 16777216) {
            if (e - t > be) throw new Error("Packed buffer would be larger than maximum buffer size");
            n = Math.min(be, 4096 * Math.round(Math.max((e - t) * (e > 67108864 ? 1.25 : 2), 4194304) / 4096));
          } else n = 1 + (Math.max(e - t << 2, ve.length - 1) >> 12) << 12;
          var s = new me(n);
          return Oe = s.dataView || (s.dataView = new DataView(s.buffer, 0, n)), e = Math.min(e, ve.length), ve.copy ? ve.copy(s, 0, t, e) : s.set(ve.slice(t, e)), Ae -= t, t = 0, we = s.length - 10, ve = s;
        },
        T = function T(e, t, r) {
          var i = s.nextId;
          i || (i = 64), i < u && _this26.shouldShareStructure && !_this26.shouldShareStructure(t) ? (i = s.nextOwnId, i < f || (i = u), s.nextOwnId = i + 1) : (i >= f && (i = u), s.nextId = i + 1);
          var o = t.highByte = i >= 96 && d ? i - 96 >> 5 : -1;
          e[Ce] = i, e.__keys__ = t, s[i - 64] = t, i < u ? (t.isShared = !0, s.sharedLength = i - 63, n = !0, o >= 0 ? (ve[Ae++] = 96 + (31 & i), ve[Ae++] = o) : ve[Ae++] = i) : (o >= 0 ? (ve[Ae++] = 213, ve[Ae++] = 114, ve[Ae++] = 96 + (31 & i), ve[Ae++] = o) : (ve[Ae++] = 212, ve[Ae++] = 114, ve[Ae++] = i), r && (p += m * r), g.length >= h && (g.shift()[Ce] = 0), g.push(e), _v2(t));
        },
        C = function C(e, n, s, r) {
          var i = ve,
            o = Ae,
            a = we,
            c = t;
          ve = Ee, Ae = 0, t = 0, ve || (Ee = ve = new me(8192)), we = ve.length - 10, T(e, n, r), Ee = ve;
          var l = Ae;
          if (ve = i, Ae = o, we = a, t = c, l > 1) {
            var _e65 = Ae + l - 1;
            _e65 > we && I(_e65);
            var _n66 = s + t;
            ve.copyWithin(_n66 + l, _n66 + 1, Ae), ve.set(Ee.slice(0, l), _n66), Ae = _e65;
          } else ve[s + t] = Ee[0];
        },
        R = function R(e) {
          var r = undefined(e, ve, t, Ae, s, I, function (e, t, s) {
            if (s) return n = !0;
            Ae = t;
            var r = ve;
            return _v2(e), y(), r !== ve ? {
              position: Ae,
              targetView: Oe,
              target: ve
            } : Ae;
          }, _this26);
          if (0 === r) return A(e);
          Ae = r;
        };
      return _this26;
    }
    _inherits(Re, _N);
    return _createClass(Re, [{
      key: "useBuffer",
      value: function useBuffer(e) {
        ve = e, ve.dataView || (ve.dataView = new DataView(ve.buffer, ve.byteOffset, ve.byteLength)), Ae = 0;
      }
    }, {
      key: "position",
      get: function get() {
        return Ae;
      },
      set: function set(e) {
        Ae = e;
      }
    }, {
      key: "buffer",
      get: function get() {
        return ve;
      },
      set: function set(e) {
        ve = e;
      }
    }, {
      key: "clearSharedData",
      value: function clearSharedData() {
        this.structures && (this.structures = []), this.typedStructs && (this.typedStructs = []);
      }
    }]);
  }(N);
  function xe(e, t, n, s) {
    var r = e.byteLength;
    if (r + 1 < 256) {
      var _n67 = n(4 + r),
        i = _n67.target,
        o = _n67.position;
      i[o++] = 199, i[o++] = r + 1;
    } else if (r + 1 < 65536) {
      var _n68 = n(5 + r),
        i = _n68.target,
        o = _n68.position;
      i[o++] = 200, i[o++] = r + 1 >> 8, i[o++] = r + 1 & 255;
    } else {
      var _n69 = n(7 + r),
        i = _n69.target,
        o = _n69.position,
        a = _n69.targetView;
      i[o++] = 201, a.setUint32(o, r + 1), o += 4;
    }
    i[o++] = 116, i[o++] = t, e.buffer || (e = new Uint8Array(e)), i.set(new Uint8Array(e.buffer, e.byteOffset, e.byteLength), o);
  }
  function Se(e, t) {
    var n = e.byteLength;
    var s, r;
    if (n < 256) {
      var _t88 = t(n + 2),
        s = _t88.target,
        r = _t88.position;
      s[r++] = 196, s[r++] = n;
    } else if (n < 65536) {
      var _t89 = t(n + 3),
        s = _t89.target,
        r = _t89.position;
      s[r++] = 197, s[r++] = n >> 8, s[r++] = 255 & n;
    } else {
      var _t90 = t(n + 5),
        s = _t90.target,
        r = _t90.position,
        i = _t90.targetView;
      s[r++] = 198, i.setUint32(r, n), r += 4;
    }
    s.set(e, r);
  }
  function Pe(e, t, n, s) {
    var r = e.length;
    switch (r) {
      case 1:
        t[n++] = 212;
        break;
      case 2:
        t[n++] = 213;
        break;
      case 4:
        t[n++] = 214;
        break;
      case 8:
        t[n++] = 215;
        break;
      case 16:
        t[n++] = 216;
        break;
      default:
        r < 256 ? (t[n++] = 199, t[n++] = r) : r < 65536 ? (t[n++] = 200, t[n++] = r >> 8, t[n++] = 255 & r) : (t[n++] = 201, t[n++] = r >> 24, t[n++] = r >> 16 & 255, t[n++] = r >> 8 & 255, t[n++] = 255 & r);
    }
    return t[n++] = s, t.set(e, n), n += r;
  }
  function Ne(e, t, n) {
    if (Ie.length > 0) {
      Oe.setUint32(Ie.position + e, Ae + n - Ie.position - e), Ie.stringsPosition = Ae - e;
      var _s44 = Ie;
      Ie = null, t(_s44[0]), t(_s44[1]);
    }
  }
  fe = [Date, Set, Error, RegExp, ArrayBuffer, Object.getPrototypeOf(Uint8Array.prototype).constructor, R], ue = [{
    pack: function pack(e, t, n) {
      var s = e.getTime() / 1e3;
      if ((this.useTimestamp32 || 0 === e.getMilliseconds()) && s >= 0 && s < 4294967296) {
        var _t91 = t(6),
          _e66 = _t91.target,
          _n70 = _t91.targetView,
          _r26 = _t91.position;
        _e66[_r26++] = 214, _e66[_r26++] = 255, _n70.setUint32(_r26, s);
      } else if (s > 0 && s < 4294967296) {
        var _t92 = t(10),
          _n71 = _t92.target,
          _r27 = _t92.targetView,
          _i19 = _t92.position;
        _n71[_i19++] = 215, _n71[_i19++] = 255, _r27.setUint32(_i19, 4e6 * e.getMilliseconds() + (s / 1e3 / 4294967296 | 0)), _r27.setUint32(_i19 + 4, s);
      } else if (isNaN(s)) {
        if (this.onInvalidDate) return t(0), n(this.onInvalidDate());
        var _t93 = t(3),
          _e67 = _t93.target,
          _s45 = _t93.targetView,
          _r28 = _t93.position;
        _e67[_r28++] = 212, _e67[_r28++] = 255, _e67[_r28++] = 255;
      } else {
        var _t94 = t(15),
          _n72 = _t94.target,
          _r29 = _t94.targetView,
          _i20 = _t94.position;
        _n72[_i20++] = 199, _n72[_i20++] = 12, _n72[_i20++] = 255, _r29.setUint32(_i20, 1e6 * e.getMilliseconds()), _r29.setBigInt64(_i20 + 4, BigInt(Math.floor(s)));
      }
    }
  }, {
    pack: function pack(e, t, n) {
      if (this.setAsEmptyObject) return t(0), n({});
      var s = Array.from(e),
        _t95 = t(this.moreTypes ? 3 : 0),
        r = _t95.target,
        i = _t95.position;
      this.moreTypes && (r[i++] = 212, r[i++] = 115, r[i++] = 0), n(s);
    }
  }, {
    pack: function pack(e, t, n) {
      var _t96 = t(this.moreTypes ? 3 : 0),
        s = _t96.target,
        r = _t96.position;
      this.moreTypes && (s[r++] = 212, s[r++] = 101, s[r++] = 0), n([e.name, e.message, e.cause]);
    }
  }, {
    pack: function pack(e, t, n) {
      var _t97 = t(this.moreTypes ? 3 : 0),
        s = _t97.target,
        r = _t97.position;
      this.moreTypes && (s[r++] = 212, s[r++] = 120, s[r++] = 0), n([e.source, e.flags]);
    }
  }, {
    pack: function pack(e, t) {
      this.moreTypes ? xe(e, 16, t) : Se(pe ? Buffer.from(e) : new Uint8Array(e), t);
    }
  }, {
    pack: function pack(e, t) {
      var n = e.constructor;
      n !== ye && this.moreTypes ? xe(e, se.indexOf(n.name), t) : Se(e, t);
    }
  }, {
    pack: function pack(e, t) {
      var _t98 = t(1),
        n = _t98.target,
        s = _t98.position;
      n[s] = 193;
    }
  }];
  var ke = new Re({
    useRecords: !1
  });
  ke.pack, ke.pack;
  var De = 512,
    $e = 1024,
    _e = 2048;
  var Le = /*#__PURE__*/function () {
    function Le() {
      _classCallCheck(this, Le);
      this.pending = new Uint8Array(0);
    }
    return _createClass(Le, [{
      key: "push",
      value: function push(e) {
        if (!e || 0 === e.byteLength) return [];
        var t = 0 === this.pending.byteLength ? e : function (e, t) {
            var n = new Uint8Array(e.byteLength + t.byteLength);
            return n.set(e, 0), n.set(t, e.byteLength), n;
          }(this.pending, e),
          n = [];
        var s = 0;
        for (; s < t.byteLength;) {
          var _e68 = {
            offset: s
          };
          var _r30 = void 0;
          try {
            _r30 = p.decode.number(t, _e68);
          } catch (e) {
            if (t.byteLength - s <= 9) break;
            throw e;
          }
          var _i21 = _e68.offset + _r30;
          if (_i21 > t.byteLength) break;
          n.push(t.subarray(_e68.offset, _i21)), s = _i21;
        }
        return this.pending = s < t.byteLength ? t.slice(s) : new Uint8Array(0), n;
      }
    }]);
  }();
  var Me = /*#__PURE__*/function () {
    function Me(e) {
      _classCallCheck(this, Me);
      this.isOpen = !1, this.lengthPrefixBuffer = new Uint8Array(9), this.reliableReassembler = new Le(), this.unreliableReassembler = new Le(), this.events = e;
    }
    return _createClass(Me, [{
      key: "connect",
      value: function connect(e) {
        var _this27 = this;
        var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var n = t.fingerprint && {
          serverCertificateHashes: [{
            algorithm: "sha-256",
            value: new Uint8Array(t.fingerprint).buffer
          }]
        } || void 0;
        this.wt = new WebTransport(e, n), this.wt.ready.then(function (e) {
          console.log("WebTransport ready!", e), _this27.isOpen = !0, _this27.unreliableReader = _this27.wt.datagrams.readable.getReader(), _this27.unreliableWriter = _this27.wt.datagrams.writable.getWriter();
          _this27.wt.incomingBidirectionalStreams.getReader().read().then(function (e) {
            _this27.reader = e.value.readable.getReader(), _this27.writer = e.value.writable.getWriter(), _this27.sendSeatReservation(t.roomId, t.sessionId, t.reconnectionToken, t.skipHandshake), _this27.readIncomingData(), _this27.readIncomingUnreliableData();
          }).catch(function (e) {
            console.error("failed to read incoming stream", e), console.error("TODO: close the connection");
          });
        }).catch(function (e) {
          console.log("WebTransport not ready!", e), _this27._close();
        }), this.wt.closed.then(function (e) {
          console.log("WebTransport closed w/ success", e), _this27.events.onclose({
            code: e.closeCode,
            reason: e.reason
          });
        }).catch(function (e) {
          console.log("WebTransport closed w/ error", e), _this27.events.onerror(e), _this27.events.onclose({
            code: e.closeCode,
            reason: e.reason
          });
        }).finally(function () {
          _this27._close();
        });
      }
    }, {
      key: "send",
      value: function send(e) {
        var t = p.encode.number(this.lengthPrefixBuffer, e.length, {
            offset: 0
          }),
          n = new Uint8Array(t + e.length);
        n.set(this.lengthPrefixBuffer.subarray(0, t), 0), n.set(e, t), this.writer.write(n);
      }
    }, {
      key: "sendUnreliable",
      value: function sendUnreliable(e) {
        var t = p.encode.number(this.lengthPrefixBuffer, e.length, {
            offset: 0
          }),
          n = new Uint8Array(t + e.length);
        n.set(this.lengthPrefixBuffer.subarray(0, t), 0), n.set(e, t), this.unreliableWriter.write(n);
      }
    }, {
      key: "close",
      value: function close(e, t) {
        try {
          this.wt.close({
            closeCode: e,
            reason: t
          });
        } catch (e) {
          console.error(e);
        }
      }
    }, {
      key: "readIncomingData",
      value: function readIncomingData() {
        return t(this, void 0, void 0, /*#__PURE__*/_regenerator().m(function _callee() {
          var e, _iterator7, _step7, _t99, _t100;
          return _regenerator().w(function (_context) {
            while (1) switch (_context.p = _context.n) {
              case 0:
                if (!this.isOpen) {
                  _context.n = 6;
                  break;
                }
                _context.p = 1;
                _context.n = 2;
                return this.reader.read();
              case 2:
                e = _context.v;
                _iterator7 = _createForOfIteratorHelper(this.reliableReassembler.push(e.value));
                try {
                  for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
                    _t99 = _step7.value;
                    this.events.onmessage({
                      data: _t99
                    });
                  }
                } catch (err) {
                  _iterator7.e(err);
                } finally {
                  _iterator7.f();
                }
                _context.n = 4;
                break;
              case 3:
                _context.p = 3;
                _t100 = _context.v;
                -1 === _t100.message.indexOf("session is closed") && console.error("H3Transport: failed to read incoming data", _t100);
                return _context.a(3, 6);
              case 4:
                if (!e.done) {
                  _context.n = 5;
                  break;
                }
                return _context.a(3, 6);
              case 5:
                _context.n = 0;
                break;
              case 6:
                return _context.a(2);
            }
          }, _callee, this, [[1, 3]]);
        }));
      }
    }, {
      key: "readIncomingUnreliableData",
      value: function readIncomingUnreliableData() {
        return t(this, void 0, void 0, /*#__PURE__*/_regenerator().m(function _callee2() {
          var e, _iterator8, _step8, _t101, _t102;
          return _regenerator().w(function (_context2) {
            while (1) switch (_context2.p = _context2.n) {
              case 0:
                if (!this.isOpen) {
                  _context2.n = 6;
                  break;
                }
                _context2.p = 1;
                _context2.n = 2;
                return this.unreliableReader.read();
              case 2:
                e = _context2.v;
                _iterator8 = _createForOfIteratorHelper(this.unreliableReassembler.push(e.value));
                try {
                  for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
                    _t101 = _step8.value;
                    this.events.onmessage({
                      data: _t101
                    });
                  }
                } catch (err) {
                  _iterator8.e(err);
                } finally {
                  _iterator8.f();
                }
                _context2.n = 4;
                break;
              case 3:
                _context2.p = 3;
                _t102 = _context2.v;
                -1 === _t102.message.indexOf("session is closed") && console.error("H3Transport: failed to read incoming data", _t102);
                return _context2.a(3, 6);
              case 4:
                if (!e.done) {
                  _context2.n = 5;
                  break;
                }
                return _context2.a(3, 6);
              case 5:
                _context2.n = 0;
                break;
              case 6:
                return _context2.a(2);
            }
          }, _callee2, this, [[1, 3]]);
        }));
      }
    }, {
      key: "sendSeatReservation",
      value: function sendSeatReservation(e, t, n, s) {
        var r = {
            offset: 0
          },
          i = [];
        p.encode.string(i, e, r), p.encode.string(i, t, r), n && p.encode.string(i, n, r), s && p.encode.boolean(i, 1, r), this.writer.write(new Uint8Array(i).buffer);
      }
    }, {
      key: "_close",
      value: function _close() {
        this.isOpen = !1;
      }
    }]);
  }();
  var je, Be;
  var Ue = l(Be ? je : (Be = 1, je = function je() {
    throw new Error("ws does not work in the browser. Browser clients must use the native WebSocket object");
  }));
  var Fe = globalThis.WebSocket || Ue;
  var Ve = /*#__PURE__*/function () {
    function Ve(e) {
      _classCallCheck(this, Ve);
      this.events = e;
    }
    return _createClass(Ve, [{
      key: "send",
      value: function send(e) {
        this.ws.send(e);
      }
    }, {
      key: "sendUnreliable",
      value: function sendUnreliable(e) {
        console.warn("@colyseus/sdk: The WebSocket transport does not support unreliable messages");
      }
    }, {
      key: "connect",
      value: function connect(e, t) {
        var _this28 = this;
        try {
          this.ws = new Fe(e, {
            headers: t,
            protocols: this.protocols
          });
        } catch (t) {
          this.ws = new Fe(e, this.protocols);
        }
        this.ws.binaryType = "arraybuffer", this.ws.onopen = function (e) {
          var t, n;
          return null === (n = (t = _this28.events).onopen) || void 0 === n ? void 0 : n.call(t, e);
        }, this.ws.onmessage = function (e) {
          var t, n;
          return null === (n = (t = _this28.events).onmessage) || void 0 === n ? void 0 : n.call(t, e);
        }, this.ws.onclose = function (e) {
          var t, n;
          return null === (n = (t = _this28.events).onclose) || void 0 === n ? void 0 : n.call(t, e);
        }, this.ws.onerror = function (e) {
          var t, n;
          return null === (n = (t = _this28.events).onerror) || void 0 === n ? void 0 : n.call(t, e);
        };
      }
    }, {
      key: "close",
      value: function close(e, t) {
        e === i.MAY_TRY_RECONNECT && this.events.onclose && (this.ws.onclose = null, this.events.onclose({
          code: e,
          reason: t
        })), this.ws.close(e, t);
      }
    }, {
      key: "isOpen",
      get: function get() {
        return this.ws.readyState === Fe.OPEN;
      }
    }]);
  }();
  var ze;
  var qe = [],
    We = "function" == typeof addEventListener && "function" == typeof removeEventListener;
  We && addEventListener("offline", function () {
    console.warn("@colyseus/sdk: \uD83D\uDED1 Network offline. Closing ".concat(qe.length, " connection(s)")), qe.forEach(function (e) {
      return e();
    });
  }, !1);
  var He = /*#__PURE__*/function () {
    function He(e) {
      var _this29 = this;
      _classCallCheck(this, He);
      if (this.events = {}, ze.set(this, We ? function () {
        return _this29.close(i.MAY_TRY_RECONNECT);
      } : null), "h3" === e) this.transport = new Me(this.events);else this.transport = new Ve(this.events);
    }
    return _createClass(He, [{
      key: "connect",
      value: function connect(e, t) {
        var _this30 = this;
        if (We) {
          var _e69 = this.events.onopen;
          this.events.onopen = function (t) {
            qe.push(n(_this30, ze, "f")), null == _e69 || _e69(t);
          };
          var _t103 = this.events.onclose;
          this.events.onclose = function (e) {
            qe.splice(qe.indexOf(n(_this30, ze, "f")), 1), null == _t103 || _t103(e);
          };
        }
        this.url = e, this.options = t, this.transport.connect(e, t);
      }
    }, {
      key: "send",
      value: function send(e) {
        this.transport.send(e);
      }
    }, {
      key: "sendUnreliable",
      value: function sendUnreliable(e) {
        this.transport.sendUnreliable(e);
      }
    }, {
      key: "reconnect",
      value: function reconnect(e) {
        var t = new URL(this.url);
        for (var _n73 in e) t.searchParams.set(_n73, e[_n73]);
        this.transport.connect(t.toString(), this.options);
      }
    }, {
      key: "close",
      value: function close(e, t) {
        this.transport.close(e, t);
      }
    }, {
      key: "isOpen",
      get: function get() {
        return this.transport.isOpen;
      }
    }]);
  }();
  ze = new WeakMap();
  var Je = {};
  function Ye(e, t) {
    Je[e] = t;
  }
  function Ke(e) {
    var t = Je[e];
    if (!t) throw new Error("missing serializer: " + e);
    return t;
  }
  var Ge = function Ge() {
    return {
      emit: function emit(e) {
        var n = this.events[e] || [];
        for (var _len6 = arguments.length, t = new Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
          t[_key6 - 1] = arguments[_key6];
        }
        for (var _e70 = 0, _s46 = n.length; _e70 < _s46; _e70++) n[_e70].apply(n, t);
      },
      events: {},
      on: function on(e, t) {
        var _this31 = this;
        var n;
        return (null === (n = this.events[e]) || void 0 === n ? void 0 : n.push(t)) || (this.events[e] = [t]), function () {
          var n;
          _this31.events[e] = null === (n = _this31.events[e]) || void 0 === n ? void 0 : n.filter(function (e) {
            return t !== e;
          });
        };
      }
    };
  };
  var Ze = /*#__PURE__*/function () {
    function Ze() {
      _classCallCheck(this, Ze);
      this.handlers = [];
    }
    return _createClass(Ze, [{
      key: "register",
      value: function register(e) {
        var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !1;
        return this.handlers.push(e), this;
      }
    }, {
      key: "invoke",
      value: function invoke() {
        var _this32 = this;
        for (var _len7 = arguments.length, e = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
          e[_key7] = arguments[_key7];
        }
        this.handlers.forEach(function (t) {
          return t.apply(_this32, e);
        });
      }
    }, {
      key: "invokeAsync",
      value: function invokeAsync() {
        var _this33 = this;
        for (var _len8 = arguments.length, e = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
          e[_key8] = arguments[_key8];
        }
        return Promise.all(this.handlers.map(function (t) {
          return t.apply(_this33, e);
        }));
      }
    }, {
      key: "remove",
      value: function remove(e) {
        var t = this.handlers.indexOf(e);
        this.handlers[t] = this.handlers[this.handlers.length - 1], this.handlers.pop();
      }
    }, {
      key: "clear",
      value: function clear() {
        this.handlers = [];
      }
    }]);
  }();
  function Xe() {
    var e = new Ze();
    function t(t) {
      return e.register(t, null === this);
    }
    return t.once = function (t) {
      var _n74 = function n() {
        for (var _len9 = arguments.length, s = new Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
          s[_key9] = arguments[_key9];
        }
        t.apply(this, s), e.remove(_n74);
      };
      e.register(_n74);
    }, t.remove = function (t) {
      return e.remove(t);
    }, t.invoke = function () {
      return e.invoke.apply(e, arguments);
    }, t.invokeAsync = function () {
      return e.invokeAsync.apply(e, arguments);
    }, t.clear = function () {
      return e.clear();
    }, t;
  }
  var Qe = /*#__PURE__*/function () {
    function Qe() {
      _classCallCheck(this, Qe);
    }
    return _createClass(Qe, [{
      key: "setState",
      value: function setState(e, t) {
        this.decoder.decode(e, t);
      }
    }, {
      key: "getState",
      value: function getState() {
        return this.state;
      }
    }, {
      key: "patch",
      value: function patch(e, t) {
        return this.decoder.decode(e, t);
      }
    }, {
      key: "teardown",
      value: function teardown() {
        this.decoder.root.clearRefs();
      }
    }, {
      key: "handshake",
      value: function handshake(e, t) {
        this.state ? (p.Reflection.decode(e, t), this.decoder = new p.Decoder(this.state)) : (this.decoder = p.Reflection.decode(e, t), this.state = this.decoder.state);
      }
    }]);
  }();
  function et() {
    return "undefined" != typeof performance ? performance.now() : Date.now();
  }
  var tt, nt;
  var st = /*#__PURE__*/function () {
    function st(e, t) {
      var _this34 = this;
      _classCallCheck(this, st);
      if (this.onStateChange = Xe(), this.onError = Xe(), this.onLeave = Xe(), this.onReconnect = Xe(), this.onDrop = Xe(), this.onJoin = Xe(), this.reconnection = {
        enabled: !0,
        retryCount: 0,
        maxRetries: 15,
        delay: 100,
        minDelay: 100,
        maxDelay: 5e3,
        minUptime: 5e3,
        backoff: rt,
        maxEnqueuedMessages: 10,
        enqueuedMessages: [],
        isReconnecting: !1
      }, this.joinedAtTime = 0, this.onMessageHandlers = Ge(), tt.set(this, 0), nt.set(this, void 0), this.name = e, this.packr = new Re(), this.packr.encode(void 0), t) {
        var _e71 = new (Ke("schema"))();
        this.serializer = _e71;
        var _n75 = new t();
        _e71.state = _n75, _e71.decoder = new p.Decoder(_n75);
      }
      this.onLeave(function () {
        _this34.removeAllListeners(), _this34.destroy();
      });
    }
    return _createClass(st, [{
      key: "connect",
      value: function connect(e, t, n) {
        var _this35 = this;
        var s;
        this.connection = new He(t.protocol), this.connection.events.onmessage = this.onMessageCallback.bind(this), this.connection.events.onclose = function (e) {
          var t;
          if (0 === _this35.joinedAtTime) return null === (t = console.warn) || void 0 === t || t.call(console, "Room connection was closed unexpectedly (".concat(e.code, "): ").concat(e.reason)), void _this35.onError.invoke(e.code, e.reason);
          e.code === i.NO_STATUS_RECEIVED || e.code === i.ABNORMAL_CLOSURE || e.code === i.GOING_AWAY || e.code === i.MAY_TRY_RECONNECT ? (_this35.onDrop.invoke(e.code, e.reason), _this35.handleReconnection(e.code, e.reason)) : _this35.onLeave.invoke(e.code, e.reason);
        }, this.connection.events.onerror = function (e) {
          _this35.onError.invoke(e.code, e.reason);
        };
        var r = void 0 !== (null === (s = this.serializer) || void 0 === s ? void 0 : s.getState());
        if ("h3" === t.protocol) {
          var _n76 = new URL(e);
          this.connection.connect(_n76.origin, Object.assign(Object.assign({}, t), {
            skipHandshake: r
          }));
        } else this.connection.connect("".concat(e).concat(r ? "&skipHandshake=1" : ""), n);
      }
    }, {
      key: "leave",
      value: function leave() {
        var _this36 = this;
        var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : !0;
        return new Promise(function (t) {
          _this36.onLeave(function (e) {
            return t(e);
          }), _this36.connection ? e ? (_this36.packr.buffer[0] = r.LEAVE_ROOM, _this36.connection.send(_this36.packr.buffer.subarray(0, 1))) : _this36.connection.close() : _this36.onLeave.invoke(i.CONSENTED);
        });
      }
    }, {
      key: "onMessage",
      value: function onMessage(e, t) {
        return this.onMessageHandlers.on(this.getMessageHandlerKey(e), t);
      }
    }, {
      key: "ping",
      value: function ping(e) {
        var t;
        (null === (t = this.connection) || void 0 === t ? void 0 : t.isOpen) && (s(this, tt, et(), "f"), s(this, nt, e, "f"), this.packr.buffer[0] = r.PING, this.connection.send(this.packr.buffer.subarray(0, 1)));
      }
    }, {
      key: "send",
      value: function send(e, t) {
        var n = {
          offset: 1
        };
        this.packr.buffer[0] = r.ROOM_DATA, "string" == typeof e ? p.encode.string(this.packr.buffer, e, n) : p.encode.number(this.packr.buffer, e, n), this.packr.position = 0;
        var s = void 0 !== t ? this.packr.pack(t, 2048 + n.offset) : this.packr.buffer.subarray(0, n.offset);
        this.connection.isOpen ? this.connection.send(s) : it(this, new Uint8Array(s));
      }
    }, {
      key: "sendUnreliable",
      value: function sendUnreliable(e, t) {
        if (!this.connection.isOpen) return;
        var n = {
          offset: 1
        };
        this.packr.buffer[0] = r.ROOM_DATA, "string" == typeof e ? p.encode.string(this.packr.buffer, e, n) : p.encode.number(this.packr.buffer, e, n), this.packr.position = 0;
        var s = void 0 !== t ? this.packr.pack(t, 2048 + n.offset) : this.packr.buffer.subarray(0, n.offset);
        this.connection.sendUnreliable(s);
      }
    }, {
      key: "sendBytes",
      value: function sendBytes(e, t) {
        var n = {
          offset: 1
        };
        if (this.packr.buffer[0] = r.ROOM_DATA_BYTES, "string" == typeof e ? p.encode.string(this.packr.buffer, e, n) : p.encode.number(this.packr.buffer, e, n), t.byteLength + n.offset > this.packr.buffer.byteLength) {
          var _e72 = new Uint8Array(n.offset + t.byteLength);
          _e72.set(this.packr.buffer), this.packr.useBuffer(_e72);
        }
        this.packr.buffer.set(t, n.offset), this.connection.isOpen ? this.connection.send(this.packr.buffer.subarray(0, n.offset + t.byteLength)) : it(this, this.packr.buffer.subarray(0, n.offset + t.byteLength));
      }
    }, {
      key: "state",
      get: function get() {
        return this.serializer.getState();
      }
    }, {
      key: "removeAllListeners",
      value: function removeAllListeners() {
        this.onJoin.clear(), this.onStateChange.clear(), this.onError.clear(), this.onLeave.clear(), this.onReconnect.clear(), this.onDrop.clear(), this.onMessageHandlers.events = {}, this.serializer instanceof Qe && (this.serializer.decoder.root.callbacks = {});
      }
    }, {
      key: "onMessageCallback",
      value: function onMessageCallback(e) {
        var t;
        var i = new Uint8Array(e.data),
          o = {
            offset: 1
          },
          a = i[0];
        if (a === r.JOIN_ROOM) {
          var _e73 = p.decode.utf8Read(i, o, i[o.offset++]);
          if (this.serializerId = p.decode.utf8Read(i, o, i[o.offset++]), !this.serializer) {
            var _e74 = Ke(this.serializerId);
            this.serializer = new _e74();
          }
          if (i.byteLength > o.offset && this.serializer.handshake && this.serializer.handshake(i, o), 0 === this.joinedAtTime ? (this.joinedAtTime = Date.now(), this.onJoin.invoke()) : (console.info("[Colyseus reconnection]: ".concat(String.fromCodePoint(9989), " reconnection successful!")), this.reconnection.isReconnecting = !1, this.onReconnect.invoke()), this.reconnectionToken = "".concat(this.roomId, ":").concat(_e73), this.packr.buffer[0] = r.JOIN_ROOM, this.connection.send(this.packr.buffer.subarray(0, 1)), this.reconnection.enqueuedMessages.length > 0) {
            var _iterator9 = _createForOfIteratorHelper(this.reconnection.enqueuedMessages),
              _step9;
            try {
              for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
                var _e75 = _step9.value;
                this.connection.send(_e75.data);
              }
            } catch (err) {
              _iterator9.e(err);
            } finally {
              _iterator9.f();
            }
            this.reconnection.enqueuedMessages = [];
          }
        } else if (a === r.ERROR) {
          var _e76 = p.decode.number(i, o),
            _t104 = p.decode.string(i, o);
          this.onError.invoke(_e76, _t104);
        } else if (a === r.LEAVE_ROOM) this.leave();else if (a === r.ROOM_STATE) this.serializer.setState(i, o), this.onStateChange.invoke(this.serializer.getState());else if (a === r.ROOM_STATE_PATCH) this.serializer.patch(i, o), this.onStateChange.invoke(this.serializer.getState());else if (a === r.ROOM_DATA) {
          var _e77 = p.decode.stringCheck(i, o) ? p.decode.string(i, o) : p.decode.number(i, o),
            _t105 = i.byteLength > o.offset ? he(i, {
              start: o.offset
            }) : void 0;
          this.dispatchMessage(_e77, _t105);
        } else if (a === r.ROOM_DATA_BYTES) {
          var _e78 = p.decode.stringCheck(i, o) ? p.decode.string(i, o) : p.decode.number(i, o);
          this.dispatchMessage(_e78, i.subarray(o.offset));
        } else a === r.PING && (null === (t = n(this, nt, "f")) || void 0 === t || t.call(this, Math.round(et() - n(this, tt, "f"))), s(this, nt, void 0, "f"));
      }
    }, {
      key: "dispatchMessage",
      value: function dispatchMessage(e, t) {
        var n;
        var s = this.getMessageHandlerKey(e);
        this.onMessageHandlers.events[s] ? this.onMessageHandlers.emit(s, t) : this.onMessageHandlers.events["*"] ? this.onMessageHandlers.emit("*", e, t) : s.startsWith("__") || null === (n = console.warn) || void 0 === n || n.call(console, "@colyseus/sdk: onMessage() not registered for type '".concat(e, "'."));
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this.serializer && this.serializer.teardown();
      }
    }, {
      key: "getMessageHandlerKey",
      value: function getMessageHandlerKey(e) {
        switch (_typeof(e)) {
          case "string":
            return e;
          case "number":
            return "i".concat(e);
          default:
            throw new Error("invalid message type.");
        }
      }
    }, {
      key: "handleReconnection",
      value: function handleReconnection(e, t) {
        if (this.reconnection.enabled) {
          if (Date.now() - this.joinedAtTime < this.reconnection.minUptime) return console.info("[Colyseus reconnection]: ".concat(String.fromCodePoint(10060), " Room has not been up for long enough for automatic reconnection. (min uptime: ").concat(this.reconnection.minUptime, "ms)")), void this.onLeave.invoke(i.ABNORMAL_CLOSURE, "Room uptime too short for reconnection.");
          this.reconnection.isReconnecting || (this.reconnection.retryCount = 0, this.reconnection.isReconnecting = !0), this.retryReconnection();
        } else this.onLeave.invoke(e, t);
      }
    }, {
      key: "retryReconnection",
      value: function retryReconnection() {
        var _this37 = this;
        if (this.reconnection.retryCount >= this.reconnection.maxRetries) return console.info("[Colyseus reconnection]: ".concat(String.fromCodePoint(10060), " \u274C Reconnection failed after ").concat(this.reconnection.maxRetries, " attempts.")), this.reconnection.isReconnecting = !1, void this.onLeave.invoke(i.FAILED_TO_RECONNECT, "No more retries. Reconnection failed.");
        this.reconnection.retryCount++;
        var e = Math.min(this.reconnection.maxDelay, Math.max(this.reconnection.minDelay, this.reconnection.backoff(this.reconnection.retryCount, this.reconnection.delay)));
        console.info("[Colyseus reconnection]: ".concat(String.fromCodePoint(9203), " will retry in ").concat((e / 1e3).toFixed(1), " seconds...")), setTimeout(function () {
          try {
            console.info("[Colyseus reconnection]: ".concat(String.fromCodePoint(128260), " Re-establishing sessionId '").concat(_this37.sessionId, "' with roomId '").concat(_this37.roomId, "'... (attempt ").concat(_this37.reconnection.retryCount, " of ").concat(_this37.reconnection.maxRetries, ")")), _this37.connection.reconnect({
              reconnectionToken: _this37.reconnectionToken.split(":")[1],
              skipHandshake: !0
            });
          } catch (e) {
            _this37.retryReconnection();
          }
        }, e);
      }
    }]);
  }();
  tt = new WeakMap(), nt = new WeakMap();
  var rt = function rt(e, t) {
    return Math.floor(Math.pow(2, e) * t);
  };
  function it(e, t) {
    e.reconnection.enqueuedMessages.push({
      data: t
    }), e.reconnection.enqueuedMessages.length > e.reconnection.maxEnqueuedMessages && e.reconnection.enqueuedMessages.shift();
  }
  function ot(e, t) {
    return new Promise(function (n, s) {
      var r;
      var i = new XMLHttpRequest(),
        o = (null == t ? void 0 : t.method) || "GET";
      if (i.open(o, e.toString()), i.withCredentials = "include" === (null == t ? void 0 : t.credentials), null == t ? void 0 : t.headers) {
        (t.headers instanceof Headers ? t.headers : new Headers(t.headers)).forEach(function (e, t) {
          i.setRequestHeader(t, e);
        });
      }
      i.onload = function () {
        var e;
        var t = new Headers(),
          s = i.getAllResponseHeaders().trim();
        if (s) {
          var _iterator0 = _createForOfIteratorHelper(s.split(/[\r\n]+/)),
            _step0;
          try {
            for (_iterator0.s(); !(_step0 = _iterator0.n()).done;) {
              var _e79 = _step0.value;
              var _n77 = _e79.indexOf(": ");
              _n77 > 0 && t.append(_e79.substring(0, _n77), _e79.substring(_n77 + 2));
            }
          } catch (err) {
            _iterator0.e(err);
          } finally {
            _iterator0.f();
          }
        }
        var r = null !== (e = i.response) && void 0 !== e ? e : i.responseText;
        n(new at(r, {
          status: i.status,
          statusText: i.statusText,
          headers: t
        }));
      }, i.onerror = function () {
        return s(new TypeError("Network request failed"));
      }, i.ontimeout = function () {
        return s(new TypeError("Network request timed out"));
      }, i.send(null !== (r = null == t ? void 0 : t.body) && void 0 !== r ? r : null);
    });
  }
  var at = /*#__PURE__*/function () {
    function at(e, t) {
      _classCallCheck(this, at);
      this.body = e, this.status = t.status, this.statusText = t.statusText, this.headers = t.headers, this.ok = t.status >= 200 && t.status < 300;
    }
    return _createClass(at, [{
      key: "json",
      value: function json() {
        return t(this, void 0, void 0, /*#__PURE__*/_regenerator().m(function _callee3() {
          return _regenerator().w(function (_context3) {
            while (1) switch (_context3.n) {
              case 0:
                return _context3.a(2, "string" == typeof this.body ? JSON.parse(this.body) : this.body);
            }
          }, _callee3, this);
        }));
      }
    }, {
      key: "text",
      value: function text() {
        return t(this, void 0, void 0, /*#__PURE__*/_regenerator().m(function _callee4() {
          return _regenerator().w(function (_context4) {
            while (1) switch (_context4.n) {
              case 0:
                return _context4.a(2, "string" == typeof this.body ? this.body : JSON.stringify(this.body));
            }
          }, _callee4, this);
        }));
      }
    }, {
      key: "blob",
      value: function blob() {
        return t(this, void 0, void 0, /*#__PURE__*/_regenerator().m(function _callee5() {
          return _regenerator().w(function (_context5) {
            while (1) switch (_context5.n) {
              case 0:
                return _context5.a(2, new Blob([this.body]));
            }
          }, _callee5, this);
        }));
      }
    }]);
  }();
  var ct = /*#__PURE__*/function () {
    function ct(e, t, n) {
      _classCallCheck(this, ct);
      this.del = this.delete, this.sdk = e, this.options = t, this._fetchFn = n;
    }
    return _createClass(ct, [{
      key: "fetchFn",
      get: function get() {
        return this._fetchFn || (this._fetchFn = void 0 !== globalThis.fetch ? globalThis.fetch.bind(globalThis) : ot), this._fetchFn;
      }
    }, {
      key: "request",
      value: function request(e, n, s) {
        return t(this, void 0, void 0, /*#__PURE__*/_regenerator().m(function _callee6() {
          return _regenerator().w(function (_context6) {
            while (1) switch (_context6.n) {
              case 0:
                return _context6.a(2, this.executeRequest(e, n, s));
            }
          }, _callee6, this);
        }));
      }
    }, {
      key: "get",
      value: function get(e, t) {
        return this.request("GET", e, t);
      }
    }, {
      key: "post",
      value: function post(e, t) {
        return this.request("POST", e, t);
      }
    }, {
      key: "delete",
      value: function _delete(e, t) {
        return this.request("DELETE", e, t);
      }
    }, {
      key: "patch",
      value: function patch(e, t) {
        return this.request("PATCH", e, t);
      }
    }, {
      key: "put",
      value: function put(e, t) {
        return this.request("PUT", e, t);
      }
    }, {
      key: "executeRequest",
      value: function executeRequest(e, n, s) {
        return t(this, void 0, void 0, /*#__PURE__*/_regenerator().m(function _callee7() {
          var t, r, i, a, c, l, h, _i22, _Object$entries2, _Object$entries2$_i, _e80, _t106, d, u, f, _n78, g, p, _t110, _t111, _t112;
          return _regenerator().w(function (_context7) {
            while (1) switch (_context7.p = _context7.n) {
              case 0:
                a = this.options.body ? Object.assign(Object.assign({}, this.options.body), (null == s ? void 0 : s.body) || {}) : null == s ? void 0 : s.body;
                c = this.options.query ? Object.assign(Object.assign({}, this.options.query), (null == s ? void 0 : s.query) || {}) : null == s ? void 0 : s.query, l = this.options.params ? Object.assign(Object.assign({}, this.options.params), (null == s ? void 0 : s.params) || {}) : null == s ? void 0 : s.params, h = new Headers(this.options.headers ? Object.assign(Object.assign({}, this.options.headers), (null == s ? void 0 : s.headers) || {}) : null == s ? void 0 : s.headers);
                if (this.authToken && !h.has("authorization") && h.set("authorization", "Bearer ".concat(this.authToken)), function (e) {
                  if (void 0 === e) return !1;
                  var t = _typeof(e);
                  return "string" === t || "number" === t || "boolean" === t || null === t || "object" === t && (!!Array.isArray(e) || !e.buffer && (e.constructor && "Object" === e.constructor.name || "function" == typeof e.toJSON));
                }(a) && "object" == _typeof(a) && null !== a) {
                  h.has("content-type") || h.set("content-type", "application/json");
                  for (_i22 = 0, _Object$entries2 = Object.entries(a); _i22 < _Object$entries2.length; _i22++) {
                    _Object$entries2$_i = _slicedToArray(_Object$entries2[_i22], 2), _e80 = _Object$entries2$_i[0], _t106 = _Object$entries2$_i[1];
                    _t106 instanceof Date && (a[_e80] = _t106.toISOString());
                  }
                  a = JSON.stringify(a);
                }
                d = Object.assign(Object.assign(Object.assign({
                  credentials: (null == s ? void 0 : s.credentials) || "include"
                }, this.options), s), {
                  query: c,
                  params: l,
                  headers: h,
                  body: a,
                  method: e
                }), u = function (e, t) {
                  var _ref6 = t || {},
                    n = _ref6.params,
                    s = _ref6.query,
                    _e$split = e.split("?"),
                    _e$split2 = _slicedToArray(_e$split, 2),
                    r = _e$split2[0],
                    i = _e$split2[1];
                  var o = r;
                  if (n) if (Array.isArray(n)) {
                    var _e81 = o.split("/").filter(function (e) {
                      return e.startsWith(":");
                    });
                    var _iterator1 = _createForOfIteratorHelper(_e81.entries()),
                      _step1;
                    try {
                      for (_iterator1.s(); !(_step1 = _iterator1.n()).done;) {
                        var _step1$value = _slicedToArray(_step1.value, 2),
                          _t107 = _step1$value[0],
                          _s47 = _step1$value[1];
                        var _e82 = n[_t107];
                        o = o.replace(_s47, _e82);
                      }
                    } catch (err) {
                      _iterator1.e(err);
                    } finally {
                      _iterator1.f();
                    }
                  } else for (var _i23 = 0, _Object$entries3 = Object.entries(n); _i23 < _Object$entries3.length; _i23++) {
                    var _Object$entries3$_i = _slicedToArray(_Object$entries3[_i23], 2),
                      _e83 = _Object$entries3$_i[0],
                      _t108 = _Object$entries3$_i[1];
                    o = o.replace(":".concat(_e83), String(_t108));
                  }
                  var a = new URLSearchParams(i);
                  if (s) for (var _i24 = 0, _Object$entries4 = Object.entries(s); _i24 < _Object$entries4.length; _i24++) {
                    var _Object$entries4$_i = _slicedToArray(_Object$entries4[_i24], 2),
                      _e84 = _Object$entries4$_i[0],
                      _t109 = _Object$entries4$_i[1];
                    null != _t109 && a.set(_e84, String(_t109));
                  }
                  var c = a.toString();
                  return c = c.length > 0 ? "?".concat(c).replace(/\+/g, "%20") : "", "".concat(o).concat(c);
                }(this.sdk.getHttpEndpoint(n.toString()), d);
                _context7.p = 1;
                _context7.n = 2;
                return this.fetchFn(u, d);
              case 2:
                f = _context7.v;
                _context7.n = 5;
                break;
              case 3:
                _context7.p = 3;
                _t110 = _context7.v;
                if (!("AbortError" === _t110.name)) {
                  _context7.n = 4;
                  break;
                }
                throw _t110;
              case 4:
                _n78 = new o((null === (t = _t110.cause) || void 0 === t ? void 0 : t.code) || _t110.code, _t110.message);
                throw _n78.response = f, _n78.cause = _t110.cause, _n78;
              case 5:
                g = f.headers.get("content-type");
                if (!(null == g ? void 0 : g.includes("json"))) {
                  _context7.n = 7;
                  break;
                }
                _context7.n = 6;
                return f.json();
              case 6:
                _t111 = _context7.v;
                _context7.n = 12;
                break;
              case 7:
                if (!(null == g ? void 0 : g.includes("text"))) {
                  _context7.n = 9;
                  break;
                }
                _context7.n = 8;
                return f.text();
              case 8:
                _t112 = _context7.v;
                _context7.n = 11;
                break;
              case 9:
                _context7.n = 10;
                return f.blob();
              case 10:
                _t112 = _context7.v;
              case 11:
                _t111 = _t112;
              case 12:
                p = _t111;
                if (f.ok) {
                  _context7.n = 13;
                  break;
                }
                throw new o(f.status, null !== (i = null !== (r = p.message) && void 0 !== r ? r : p.error) && void 0 !== i ? i : f.statusText, {
                  headers: f.headers,
                  status: f.status,
                  response: f,
                  data: p
                });
              case 13:
                return _context7.a(2, {
                  raw: f,
                  data: p,
                  headers: f.headers,
                  status: f.status,
                  statusText: f.statusText
                });
            }
          }, _callee7, this, [[1, 3]]);
        }));
      }
    }]);
  }();
  var lt;
  function ht() {
    if (!lt) try {
      lt = "undefined" != typeof cc && cc.sys && cc.sys.localStorage ? cc.sys.localStorage : window.localStorage;
    } catch (e) {}
    return lt || void 0 === globalThis.indexedDB || (lt = new dt()), lt || (lt = {
      cache: {},
      setItem: function setItem(e, t) {
        this.cache[e] = t;
      },
      getItem: function getItem(e) {
        this.cache[e];
      },
      removeItem: function removeItem(e) {
        delete this.cache[e];
      }
    }), lt;
  }
  var dt = /*#__PURE__*/function () {
    function dt() {
      _classCallCheck(this, dt);
      this.dbPromise = new Promise(function (e) {
        var t = indexedDB.open("_colyseus_storage", 1);
        t.onupgradeneeded = function () {
          return t.result.createObjectStore("store");
        }, t.onsuccess = function () {
          return e(t.result);
        };
      });
    }
    return _createClass(dt, [{
      key: "tx",
      value: function tx(e, n) {
        return t(this, void 0, void 0, /*#__PURE__*/_regenerator().m(function _callee8() {
          var t;
          return _regenerator().w(function (_context8) {
            while (1) switch (_context8.n) {
              case 0:
                _context8.n = 1;
                return this.dbPromise;
              case 1:
                t = _context8.v.transaction("store", e).objectStore("store");
                return _context8.a(2, n(t));
            }
          }, _callee8, this);
        }));
      }
    }, {
      key: "setItem",
      value: function setItem(e, t) {
        return this.tx("readwrite", function (n) {
          return n.put(t, e);
        }).then();
      }
    }, {
      key: "getItem",
      value: function getItem(e) {
        return t(this, void 0, void 0, /*#__PURE__*/_regenerator().m(function _callee9() {
          var t;
          return _regenerator().w(function (_context9) {
            while (1) switch (_context9.n) {
              case 0:
                _context9.n = 1;
                return this.tx("readonly", function (t) {
                  return t.get(e);
                });
              case 1:
                t = _context9.v;
                return _context9.a(2, new Promise(function (e) {
                  t.onsuccess = function () {
                    return e(t.result);
                  };
                }));
            }
          }, _callee9, this);
        }));
      }
    }, {
      key: "removeItem",
      value: function removeItem(e) {
        return this.tx("readwrite", function (t) {
          return t.delete(e);
        }).then();
      }
    }]);
  }();
  var ut, ft, gt, pt;
  var mt = /*#__PURE__*/function () {
    function mt(e) {
      var _this38 = this;
      _classCallCheck(this, mt);
      this.settings = {
        path: "/auth",
        key: "colyseus-auth-token"
      }, ut.set(this, !1), ft.set(this, null), gt.set(this, Ge()), this.http = e, function (e, t) {
        var n = ht().getItem(e);
        "undefined" != typeof Promise && n instanceof Promise ? n.then(function (e) {
          return t(e);
        }) : t(n);
      }(this.settings.key, function (e) {
        return _this38.token = e;
      });
    }
    return _createClass(mt, [{
      key: "token",
      get: function get() {
        return this.http.authToken;
      },
      set: function set(e) {
        this.http.authToken = e;
      }
    }, {
      key: "onChange",
      value: function onChange(e) {
        var _this39 = this;
        var t = n(this, gt, "f").on("change", e);
        return n(this, ut, "f") || this.getUserData().then(function (e) {
          _this39.emitChange(Object.assign(Object.assign({}, e), {
            token: _this39.token
          }));
        }).catch(function (e) {
          _this39.emitChange({
            user: null,
            token: void 0
          });
        }), s(this, ut, !0, "f"), t;
      }
    }, {
      key: "getUserData",
      value: function getUserData() {
        return t(this, void 0, void 0, /*#__PURE__*/_regenerator().m(function _callee0() {
          return _regenerator().w(function (_context0) {
            while (1) switch (_context0.n) {
              case 0:
                if (!this.token) {
                  _context0.n = 2;
                  break;
                }
                _context0.n = 1;
                return this.http.get("".concat(this.settings.path, "/userdata"));
              case 1:
                return _context0.a(2, _context0.v.data);
              case 2:
                throw new Error("missing auth.token");
              case 3:
                return _context0.a(2);
            }
          }, _callee0, this);
        }));
      }
    }, {
      key: "registerWithEmailAndPassword",
      value: function registerWithEmailAndPassword(e, n, s) {
        return t(this, void 0, void 0, /*#__PURE__*/_regenerator().m(function _callee1() {
          var t;
          return _regenerator().w(function (_context1) {
            while (1) switch (_context1.n) {
              case 0:
                _context1.n = 1;
                return this.http.post("".concat(this.settings.path, "/register"), {
                  body: {
                    email: e,
                    password: n,
                    options: s
                  }
                });
              case 1:
                t = _context1.v.data;
                return _context1.a(2, (this.emitChange(t), t));
            }
          }, _callee1, this);
        }));
      }
    }, {
      key: "signInWithEmailAndPassword",
      value: function signInWithEmailAndPassword(e, n) {
        return t(this, void 0, void 0, /*#__PURE__*/_regenerator().m(function _callee10() {
          var t;
          return _regenerator().w(function (_context10) {
            while (1) switch (_context10.n) {
              case 0:
                _context10.n = 1;
                return this.http.post("".concat(this.settings.path, "/login"), {
                  body: {
                    email: e,
                    password: n
                  }
                });
              case 1:
                t = _context10.v.data;
                return _context10.a(2, (this.emitChange(t), t));
            }
          }, _callee10, this);
        }));
      }
    }, {
      key: "signInAnonymously",
      value: function signInAnonymously(e) {
        return t(this, void 0, void 0, /*#__PURE__*/_regenerator().m(function _callee11() {
          var t;
          return _regenerator().w(function (_context11) {
            while (1) switch (_context11.n) {
              case 0:
                _context11.n = 1;
                return this.http.post("".concat(this.settings.path, "/anonymous"), {
                  body: {
                    options: e
                  }
                });
              case 1:
                t = _context11.v.data;
                return _context11.a(2, (this.emitChange(t), t));
            }
          }, _callee11, this);
        }));
      }
    }, {
      key: "sendPasswordResetEmail",
      value: function sendPasswordResetEmail(e) {
        return t(this, void 0, void 0, /*#__PURE__*/_regenerator().m(function _callee12() {
          return _regenerator().w(function (_context12) {
            while (1) switch (_context12.n) {
              case 0:
                _context12.n = 1;
                return this.http.post("".concat(this.settings.path, "/forgot-password"), {
                  body: {
                    email: e
                  }
                });
              case 1:
                return _context12.a(2, _context12.v.data);
            }
          }, _callee12, this);
        }));
      }
    }, {
      key: "signInWithProvider",
      value: function signInWithProvider(e) {
        return t(this, arguments, void 0, function (e) {
          var _this40 = this;
          var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
          return /*#__PURE__*/_regenerator().m(function _callee13() {
            return _regenerator().w(function (_context13) {
              while (1) switch (_context13.n) {
                case 0:
                  return _context13.a(2, new Promise(function (r, i) {
                    var o = t.width || 480,
                      a = t.height || 768,
                      c = _this40.token ? "?token=".concat(_this40.token) : "",
                      l = "Login with ".concat(e[0].toUpperCase() + e.substring(1)),
                      h = _this40.http.sdk.getHttpEndpoint("".concat(t.prefix || "".concat(_this40.settings.path, "/provider"), "/").concat(e).concat(c)),
                      d = screen.width / 2 - o / 2,
                      u = screen.height / 2 - a / 2;
                    s(_this40, ft, window.open(h, l, "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=" + o + ", height=" + a + ", top=" + u + ", left=" + d), "f");
                    var _f3 = function f(e) {
                        var t;
                        void 0 === e.data.user && void 0 === e.data.token || (clearInterval(g), null === (t = n(_this40, ft, "f")) || void 0 === t || t.close(), s(_this40, ft, null, "f"), window.removeEventListener("message", _f3), void 0 !== e.data.error ? i(e.data.error) : (r(e.data), _this40.emitChange(e.data)));
                      },
                      g = setInterval(function () {
                        n(_this40, ft, "f") && !n(_this40, ft, "f").closed || (s(_this40, ft, null, "f"), i("cancelled"), window.removeEventListener("message", _f3));
                      }, 200);
                    window.addEventListener("message", _f3);
                  }));
              }
            }, _callee13);
          })();
        });
      }
    }, {
      key: "signOut",
      value: function signOut() {
        return t(this, void 0, void 0, /*#__PURE__*/_regenerator().m(function _callee14() {
          return _regenerator().w(function (_context14) {
            while (1) switch (_context14.n) {
              case 0:
                this.emitChange({
                  user: null,
                  token: null
                });
              case 1:
                return _context14.a(2);
            }
          }, _callee14, this);
        }));
      }
    }, {
      key: "emitChange",
      value: function emitChange(e) {
        var t;
        void 0 !== e.token && (this.token = e.token, null === e.token ? (t = this.settings.key, ht().removeItem(t)) : function (e, t) {
          ht().setItem(e, t);
        }(this.settings.key, e.token)), n(this, gt, "f").emit("change", e);
      }
    }]);
  }();
  function yt(e) {
    var t;
    var n = (null === (t = null === window || void 0 === window ? void 0 : window.location) || void 0 === t ? void 0 : t.hostname) || "localhost",
      s = e.hostname.split("."),
      r = !e.hostname.includes("trycloudflare.com") && !e.hostname.includes("discordsays.com") && s.length > 2 ? "/".concat(s[0]) : "";
    return e.pathname.startsWith("/.proxy") ? "".concat(e.protocol, "//").concat(n).concat(r).concat(e.pathname).concat(e.search) : "".concat(e.protocol, "//").concat(n, "/.proxy/colyseus").concat(r).concat(e.pathname).concat(e.search);
  }
  ut = new WeakMap(), ft = new WeakMap(), gt = new WeakMap();
  var bt = "undefined" != typeof window && void 0 !== (null === (pt = null === window || void 0 === window ? void 0 : window.location) || void 0 === pt ? void 0 : pt.hostname) ? "".concat(window.location.protocol.replace("http", "ws"), "//").concat(window.location.hostname).concat(window.location.port && ":".concat(window.location.port)) : "ws://127.0.0.1:2567";
  var vt = /*#__PURE__*/function () {
    function vt() {
      var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : bt;
      var t = arguments.length > 1 ? arguments[1] : undefined;
      _classCallCheck(this, vt);
      var n, s;
      if ("string" == typeof e) {
        var _t113 = e.startsWith("/") ? new URL(e, bt) : new URL(e),
          _n79 = "https:" === _t113.protocol || "wss:" === _t113.protocol,
          _s48 = Number(_t113.port || (_n79 ? 443 : 80));
        this.settings = {
          hostname: _t113.hostname,
          pathname: _t113.pathname,
          port: _s48,
          secure: _n79,
          searchParams: _t113.searchParams.toString() || void 0
        };
      } else void 0 === e.port && (e.port = e.secure ? 443 : 80), void 0 === e.pathname && (e.pathname = ""), this.settings = e;
      this.settings.pathname.endsWith("/") && (this.settings.pathname = this.settings.pathname.slice(0, -1)), (null == t ? void 0 : t.protocol) && (this.settings.protocol = t.protocol), this.http = new ct(this, {
        headers: (null == t ? void 0 : t.headers) || {}
      }, null == t ? void 0 : t.fetchFn), this.auth = new mt(this.http), this.urlBuilder = null == t ? void 0 : t.urlBuilder, !this.urlBuilder && "undefined" != typeof window && (null === (s = null === (n = null === window || void 0 === window ? void 0 : window.location) || void 0 === n ? void 0 : n.hostname) || void 0 === s ? void 0 : s.includes("discordsays.com")) && (this.urlBuilder = yt, console.log("Colyseus SDK: Discord Embedded SDK detected. Using custom URL builder."));
    }
    return _createClass(vt, [{
      key: "joinOrCreate",
      value: function joinOrCreate(e) {
        return t(this, arguments, void 0, function (e) {
          var _this41 = this;
          var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
          var n = arguments.length > 2 ? arguments[2] : undefined;
          return /*#__PURE__*/_regenerator().m(function _callee15() {
            return _regenerator().w(function (_context15) {
              while (1) switch (_context15.n) {
                case 0:
                  _context15.n = 1;
                  return _this41.createMatchMakeRequest("joinOrCreate", e, t, n);
                case 1:
                  return _context15.a(2, _context15.v);
              }
            }, _callee15);
          })();
        });
      }
    }, {
      key: "create",
      value: function create(e) {
        return t(this, arguments, void 0, function (e) {
          var _this42 = this;
          var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
          var n = arguments.length > 2 ? arguments[2] : undefined;
          return /*#__PURE__*/_regenerator().m(function _callee16() {
            return _regenerator().w(function (_context16) {
              while (1) switch (_context16.n) {
                case 0:
                  _context16.n = 1;
                  return _this42.createMatchMakeRequest("create", e, t, n);
                case 1:
                  return _context16.a(2, _context16.v);
              }
            }, _callee16);
          })();
        });
      }
    }, {
      key: "join",
      value: function join(e) {
        return t(this, arguments, void 0, function (e) {
          var _this43 = this;
          var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
          var n = arguments.length > 2 ? arguments[2] : undefined;
          return /*#__PURE__*/_regenerator().m(function _callee17() {
            return _regenerator().w(function (_context17) {
              while (1) switch (_context17.n) {
                case 0:
                  _context17.n = 1;
                  return _this43.createMatchMakeRequest("join", e, t, n);
                case 1:
                  return _context17.a(2, _context17.v);
              }
            }, _callee17);
          })();
        });
      }
    }, {
      key: "joinById",
      value: function joinById(e) {
        return t(this, arguments, void 0, function (e) {
          var _this44 = this;
          var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
          var n = arguments.length > 2 ? arguments[2] : undefined;
          return /*#__PURE__*/_regenerator().m(function _callee18() {
            return _regenerator().w(function (_context18) {
              while (1) switch (_context18.n) {
                case 0:
                  _context18.n = 1;
                  return _this44.createMatchMakeRequest("joinById", e, t, n);
                case 1:
                  return _context18.a(2, _context18.v);
              }
            }, _callee18);
          })();
        });
      }
    }, {
      key: "reconnect",
      value: function reconnect(e, n) {
        return t(this, void 0, void 0, /*#__PURE__*/_regenerator().m(function _callee19() {
          var _e$split3, _e$split4, t, s;
          return _regenerator().w(function (_context19) {
            while (1) switch (_context19.n) {
              case 0:
                if (!("string" == typeof e && "string" == typeof n)) {
                  _context19.n = 1;
                  break;
                }
                throw new Error("DEPRECATED: .reconnect() now only accepts 'reconnectionToken' as argument.\nYou can get this token from previously connected `room.reconnectionToken`");
              case 1:
                _e$split3 = e.split(":"), _e$split4 = _slicedToArray(_e$split3, 2), t = _e$split4[0], s = _e$split4[1];
                if (!(!t || !s)) {
                  _context19.n = 2;
                  break;
                }
                throw new Error("Invalid reconnection token format.\nThe format should be roomId:reconnectionToken");
              case 2:
                _context19.n = 3;
                return this.createMatchMakeRequest("reconnect", t, {
                  reconnectionToken: s
                }, n);
              case 3:
                return _context19.a(2, _context19.v);
            }
          }, _callee19, this);
        }));
      }
    }, {
      key: "consumeSeatReservation",
      value: function consumeSeatReservation(e, n) {
        return t(this, void 0, void 0, /*#__PURE__*/_regenerator().m(function _callee20() {
          var t, s;
          return _regenerator().w(function (_context20) {
            while (1) switch (_context20.n) {
              case 0:
                t = this.createRoom(e.name, n);
                t.roomId = e.roomId, t.sessionId = e.sessionId;
                s = {
                  sessionId: t.sessionId
                };
                return _context20.a(2, (e.reconnectionToken && (s.reconnectionToken = e.reconnectionToken), t.connect(this.buildEndpoint(e, s), e, this.http.options.headers), new Promise(function (e, n) {
                  var s = function s(e, t) {
                    return n(new o(e, t));
                  };
                  t.onError.once(s), t.onJoin.once(function () {
                    t.onError.remove(s), e(t);
                  });
                })));
            }
          }, _callee20, this);
        }));
      }
    }, {
      key: "getLatency",
      value: function getLatency() {
        var _this45 = this;
        var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var t, n;
        var s = null !== (t = e.protocol) && void 0 !== t ? t : "ws",
          a = null !== (n = e.pingCount) && void 0 !== n ? n : 1;
        return new Promise(function (e, t) {
          var n = new He(s),
            c = [];
          var l = 0;
          n.events.onopen = function () {
            l = Date.now(), n.send(new Uint8Array([r.PING]));
          }, n.events.onmessage = function (t) {
            if (c.push(Date.now() - l), c.length < a) l = Date.now(), n.send(new Uint8Array([r.PING]));else {
              n.close();
              var _t114 = c.reduce(function (e, t) {
                return e + t;
              }, 0) / c.length;
              e(_t114);
            }
          }, n.events.onerror = function (e) {
            t(new o(i.ABNORMAL_CLOSURE, "Failed to get latency: ".concat(e.message)));
          }, n.connect(_this45.getHttpEndpoint());
        });
      }
    }, {
      key: "createMatchMakeRequest",
      value: function createMatchMakeRequest(e, n) {
        return t(this, arguments, void 0, function (e, t) {
          var _this46 = this;
          var n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
          var s = arguments.length > 3 ? arguments[3] : undefined;
          return /*#__PURE__*/_regenerator().m(function _callee21() {
            var _r31, _t115;
            return _regenerator().w(function (_context21) {
              while (1) switch (_context21.p = _context21.n) {
                case 0:
                  _context21.p = 0;
                  if (t) {
                    _context21.n = 1;
                    break;
                  }
                  throw new Error("Must provide a room name");
                case 1:
                  _context21.n = 2;
                  return _this46.http.post("/matchmake/".concat(e, "/").concat(t), {
                    headers: {
                      Accept: "application/json",
                      "Content-Type": "application/json"
                    },
                    body: n
                  });
                case 2:
                  _r31 = _context21.v.data;
                  "reconnect" === e && (_r31.reconnectionToken = n.reconnectionToken);
                  _context21.n = 3;
                  return _this46.consumeSeatReservation(_r31, s);
                case 3:
                  return _context21.a(2, _context21.v);
                case 4:
                  _context21.p = 4;
                  _t115 = _context21.v;
                  if (!(_t115 instanceof o)) {
                    _context21.n = 5;
                    break;
                  }
                  throw new c(_t115.message, _t115.code);
                case 5:
                  throw _t115;
                case 6:
                  return _context21.a(2);
              }
            }, _callee21, null, [[0, 4]]);
          })();
        });
      }
    }, {
      key: "createRoom",
      value: function createRoom(e, t) {
        return new st(e, t);
      }
    }, {
      key: "buildEndpoint",
      value: function buildEndpoint(e) {
        var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var n = this.settings.protocol || "ws",
          s = this.settings.searchParams || "";
        this.http.authToken && (t._authToken = this.http.authToken);
        for (var _e85 in t) t.hasOwnProperty(_e85) && (s += (s ? "&" : "") + "".concat(_e85, "=").concat(t[_e85]));
        "h3" === n && (n = "http");
        var r = this.settings.secure ? "".concat(n, "s://") : "".concat(n, "://");
        e.publicAddress ? r += "".concat(e.publicAddress) : r += "".concat(this.settings.hostname).concat(this.getEndpointPort()).concat(this.settings.pathname);
        var i = "".concat(r, "/").concat(e.processId, "/").concat(e.roomId, "?").concat(s);
        return this.urlBuilder ? this.urlBuilder(new URL(i)) : i;
      }
    }, {
      key: "getHttpEndpoint",
      value: function getHttpEndpoint() {
        var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
        var t = e.startsWith("/") ? e : "/".concat(e);
        var n = "".concat(this.settings.secure ? "https" : "http", "://").concat(this.settings.hostname).concat(this.getEndpointPort()).concat(this.settings.pathname).concat(t);
        return this.settings.searchParams && (n += "?".concat(this.settings.searchParams)), this.urlBuilder ? this.urlBuilder(new URL(n)) : n;
      }
    }, {
      key: "getEndpointPort",
      value: function getEndpointPort() {
        return 80 !== this.settings.port && 443 !== this.settings.port ? ":".concat(this.settings.port) : "";
      }
    }], [{
      key: "selectByLatency",
      value: function selectByLatency(e, n) {
        return t(this, arguments, void 0, function (e, t) {
          var n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
          return /*#__PURE__*/_regenerator().m(function _callee22() {
            var s, r;
            return _regenerator().w(function (_context22) {
              while (1) switch (_context22.n) {
                case 0:
                  s = e.map(function (e) {
                    return new vt(e, t);
                  });
                  _context22.n = 1;
                  return Promise.allSettled(s.map(function (e, t) {
                    return e.getLatency(n).then(function (e) {
                      var n = s[t].settings;
                      return console.log("\uD83D\uDEDC Endpoint Latency: ".concat(e, "ms - ").concat(n.hostname, ":").concat(n.port).concat(n.pathname)), [t, e];
                    });
                  }));
                case 1:
                  r = _context22.v.filter(function (e) {
                    return "fulfilled" === e.status;
                  }).map(function (e) {
                    return e.value;
                  });
                  if (!(0 === r.length)) {
                    _context22.n = 2;
                    break;
                  }
                  throw new Error("All endpoints failed to respond");
                case 2:
                  return _context22.a(2, s[r.sort(function (e, t) {
                    return e[1] - t[1];
                  })[0][0]]);
              }
            }, _callee22);
          })();
        });
      }
    }]);
  }();
  vt.VERSION = "0.17";
  var Et = vt;
  Ye("schema", Qe), Ye("none", /*#__PURE__*/function () {
    function _class3() {
      _classCallCheck(this, _class3);
    }
    return _createClass(_class3, [{
      key: "setState",
      value: function setState(e) {}
    }, {
      key: "getState",
      value: function getState() {
        return null;
      }
    }, {
      key: "patch",
      value: function patch(e) {}
    }, {
      key: "teardown",
      value: function teardown() {}
    }, {
      key: "handshake",
      value: function handshake(e) {}
    }]);
  }()), e.AbortError = a, e.Auth = mt, e.Callbacks = p.Callbacks, e.Client = Et, e.CloseCode = i, e.ColyseusSDK = vt, e.ErrorCode = {
    MATCHMAKE_NO_HANDLER: 520,
    MATCHMAKE_INVALID_CRITERIA: 521,
    MATCHMAKE_INVALID_ROOM_ID: 522,
    MATCHMAKE_UNHANDLED: 523,
    MATCHMAKE_EXPIRED: 524,
    AUTH_FAILED: 525,
    APPLICATION_ERROR: 526,
    INVALID_PAYLOAD: 4217
  }, e.MatchMakeError = c, e.Protocol = r, e.Room = st, e.SchemaSerializer = Qe, e.ServerError = o, e.getStateCallbacks = function (e) {
    try {
      return p.getDecoderStateCallbacks(e.serializer.decoder);
    } catch (e) {
      return;
    }
  }, e.registerSerializer = Ye;
});