var Ut = (A, R) => () => (R || (A((R = { exports: {} }).exports, R), A = null), R.exports), sd = /* @__PURE__ */ Ut(((A) => {
  var R = /* @__PURE__ */ Symbol.for("react.transitional.element"), x = /* @__PURE__ */ Symbol.for("react.portal"), I = /* @__PURE__ */ Symbol.for("react.fragment"), s = /* @__PURE__ */ Symbol.for("react.strict_mode"), Ml = /* @__PURE__ */ Symbol.for("react.profiler"), sl = /* @__PURE__ */ Symbol.for("react.consumer"), Yl = /* @__PURE__ */ Symbol.for("react.context"), vl = /* @__PURE__ */ Symbol.for("react.forward_ref"), Y = /* @__PURE__ */ Symbol.for("react.suspense"), E = /* @__PURE__ */ Symbol.for("react.memo"), j = /* @__PURE__ */ Symbol.for("react.lazy"), B = /* @__PURE__ */ Symbol.for("react.activity"), st = Symbol.iterator;
  function Bl(v) {
    return v === null || typeof v != "object" ? null : (v = st && v[st] || v["@@iterator"], typeof v == "function" ? v : null);
  }
  var pl = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, Jl = Object.assign, Wt = {};
  function xl(v, T, O) {
    this.props = v, this.context = T, this.refs = Wt, this.updater = O || pl;
  }
  xl.prototype.isReactComponent = {}, xl.prototype.setState = function(v, T) {
    if (typeof v != "object" && typeof v != "function" && v != null) throw Error("takes an object of state variables to update or a function which returns an object of state variables.");
    this.updater.enqueueSetState(this, v, T, "setState");
  }, xl.prototype.forceUpdate = function(v) {
    this.updater.enqueueForceUpdate(this, v, "forceUpdate");
  };
  function wt() {
  }
  wt.prototype = xl.prototype;
  function El(v, T, O) {
    this.props = v, this.context = T, this.refs = Wt, this.updater = O || pl;
  }
  var ot = El.prototype = new wt();
  ot.constructor = El, Jl(ot, xl.prototype), ot.isPureReactComponent = !0;
  var rl = Array.isArray;
  function Wl() {
  }
  var r = {
    H: null,
    A: null,
    T: null,
    S: null
  }, jl = Object.prototype.hasOwnProperty;
  function Et(v, T, O) {
    var H = O.ref;
    return {
      $$typeof: R,
      type: v,
      key: T,
      ref: H !== void 0 ? H : null,
      props: O
    };
  }
  function bu(v, T) {
    return Et(v.type, T, v.props);
  }
  function wl(v) {
    return typeof v == "object" && v !== null && v.$$typeof === R;
  }
  function _t(v) {
    var T = {
      "=": "=0",
      ":": "=2"
    };
    return "$" + v.replace(/[=:]/g, function(O) {
      return T[O];
    });
  }
  var Zu = /\/+/g;
  function bt(v, T) {
    return typeof v == "object" && v !== null && v.key != null ? _t("" + v.key) : T.toString(36);
  }
  function D(v) {
    switch (v.status) {
      case "fulfilled":
        return v.value;
      case "rejected":
        throw v.reason;
      default:
        switch (typeof v.status == "string" ? v.then(Wl, Wl) : (v.status = "pending", v.then(function(T) {
          v.status === "pending" && (v.status = "fulfilled", v.value = T);
        }, function(T) {
          v.status === "pending" && (v.status = "rejected", v.reason = T);
        })), v.status) {
          case "fulfilled":
            return v.value;
          case "rejected":
            throw v.reason;
        }
    }
    throw v;
  }
  function _(v, T, O, H, X) {
    var Q = typeof v;
    (Q === "undefined" || Q === "boolean") && (v = null);
    var k = !1;
    if (v === null) k = !0;
    else switch (Q) {
      case "bigint":
      case "string":
      case "number":
        k = !0;
        break;
      case "object":
        switch (v.$$typeof) {
          case R:
          case x:
            k = !0;
            break;
          case j:
            return k = v._init, _(k(v._payload), T, O, H, X);
        }
    }
    if (k) return X = X(v), k = H === "" ? "." + bt(v, 0) : H, rl(X) ? (O = "", k != null && (O = k.replace(Zu, "$&/") + "/"), _(X, T, O, "", function(Oa) {
      return Oa;
    })) : X != null && (wl(X) && (X = bu(X, O + (X.key == null || v && v.key === X.key ? "" : ("" + X.key).replace(Zu, "$&/") + "/") + k)), T.push(X)), 1;
    k = 0;
    var Cl = H === "" ? "." : H + ":";
    if (rl(v)) for (var hl = 0; hl < v.length; hl++) H = v[hl], Q = Cl + bt(H, hl), k += _(H, T, O, Q, X);
    else if (hl = Bl(v), typeof hl == "function") for (v = hl.call(v), hl = 0; !(H = v.next()).done; ) H = H.value, Q = Cl + bt(H, hl++), k += _(H, T, O, Q, X);
    else if (Q === "object") {
      if (typeof v.then == "function") return _(D(v), T, O, H, X);
      throw T = String(v), Error("Objects are not valid as a React child (found: " + (T === "[object Object]" ? "object with keys {" + Object.keys(v).join(", ") + "}" : T) + "). If you meant to render a collection of children, use an array instead.");
    }
    return k;
  }
  function M(v, T, O) {
    if (v == null) return v;
    var H = [], X = 0;
    return _(v, H, "", "", function(Q) {
      return T.call(O, Q, X++);
    }), H;
  }
  function $(v) {
    if (v._status === -1) {
      var T = v._result;
      T = T(), T.then(function(O) {
        (v._status === 0 || v._status === -1) && (v._status = 1, v._result = O);
      }, function(O) {
        (v._status === 0 || v._status === -1) && (v._status = 2, v._result = O);
      }), v._status === -1 && (v._status = 0, v._result = T);
    }
    if (v._status === 1) return v._result.default;
    throw v._result;
  }
  var fl = typeof reportError == "function" ? reportError : function(v) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var T = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof v == "object" && v !== null && typeof v.message == "string" ? String(v.message) : String(v),
        error: v
      });
      if (!window.dispatchEvent(T)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", v);
      return;
    }
    console.error(v);
  }, $l = {
    map: M,
    forEach: function(v, T, O) {
      M(v, function() {
        T.apply(this, arguments);
      }, O);
    },
    count: function(v) {
      var T = 0;
      return M(v, function() {
        T++;
      }), T;
    },
    toArray: function(v) {
      return M(v, function(T) {
        return T;
      }) || [];
    },
    only: function(v) {
      if (!wl(v)) throw Error("React.Children.only expected to receive a single React element child.");
      return v;
    }
  };
  A.Activity = B, A.Children = $l, A.Component = xl, A.Fragment = I, A.Profiler = Ml, A.PureComponent = El, A.StrictMode = s, A.Suspense = Y, A.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = r, A.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(v) {
      return r.H.useMemoCache(v);
    }
  }, A.cache = function(v) {
    return function() {
      return v.apply(null, arguments);
    };
  }, A.cacheSignal = function() {
    return null;
  }, A.cloneElement = function(v, T, O) {
    if (v == null) throw Error("The argument must be a React element, but you passed " + v + ".");
    var H = Jl({}, v.props), X = v.key;
    if (T != null) for (Q in T.key !== void 0 && (X = "" + T.key), T) !jl.call(T, Q) || Q === "key" || Q === "__self" || Q === "__source" || Q === "ref" && T.ref === void 0 || (H[Q] = T[Q]);
    var Q = arguments.length - 2;
    if (Q === 1) H.children = O;
    else if (1 < Q) {
      for (var k = Array(Q), Cl = 0; Cl < Q; Cl++) k[Cl] = arguments[Cl + 2];
      H.children = k;
    }
    return Et(v.type, X, H);
  }, A.createContext = function(v) {
    return v = {
      $$typeof: Yl,
      _currentValue: v,
      _currentValue2: v,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, v.Provider = v, v.Consumer = {
      $$typeof: sl,
      _context: v
    }, v;
  }, A.createElement = function(v, T, O) {
    var H, X = {}, Q = null;
    if (T != null) for (H in T.key !== void 0 && (Q = "" + T.key), T) jl.call(T, H) && H !== "key" && H !== "__self" && H !== "__source" && (X[H] = T[H]);
    var k = arguments.length - 2;
    if (k === 1) X.children = O;
    else if (1 < k) {
      for (var Cl = Array(k), hl = 0; hl < k; hl++) Cl[hl] = arguments[hl + 2];
      X.children = Cl;
    }
    if (v && v.defaultProps) for (H in k = v.defaultProps, k) X[H] === void 0 && (X[H] = k[H]);
    return Et(v, Q, X);
  }, A.createRef = function() {
    return { current: null };
  }, A.forwardRef = function(v) {
    return {
      $$typeof: vl,
      render: v
    };
  }, A.isValidElement = wl, A.lazy = function(v) {
    return {
      $$typeof: j,
      _payload: {
        _status: -1,
        _result: v
      },
      _init: $
    };
  }, A.memo = function(v, T) {
    return {
      $$typeof: E,
      type: v,
      compare: T === void 0 ? null : T
    };
  }, A.startTransition = function(v) {
    var T = r.T, O = {};
    r.T = O;
    try {
      var H = v(), X = r.S;
      X !== null && X(O, H), typeof H == "object" && H !== null && typeof H.then == "function" && H.then(Wl, fl);
    } catch (Q) {
      fl(Q);
    } finally {
      T !== null && O.types !== null && (T.types = O.types), r.T = T;
    }
  }, A.unstable_useCacheRefresh = function() {
    return r.H.useCacheRefresh();
  }, A.use = function(v) {
    return r.H.use(v);
  }, A.useActionState = function(v, T, O) {
    return r.H.useActionState(v, T, O);
  }, A.useCallback = function(v, T) {
    return r.H.useCallback(v, T);
  }, A.useContext = function(v) {
    return r.H.useContext(v);
  }, A.useDebugValue = function() {
  }, A.useDeferredValue = function(v, T) {
    return r.H.useDeferredValue(v, T);
  }, A.useEffect = function(v, T) {
    return r.H.useEffect(v, T);
  }, A.useEffectEvent = function(v) {
    return r.H.useEffectEvent(v);
  }, A.useId = function() {
    return r.H.useId();
  }, A.useImperativeHandle = function(v, T, O) {
    return r.H.useImperativeHandle(v, T, O);
  }, A.useInsertionEffect = function(v, T) {
    return r.H.useInsertionEffect(v, T);
  }, A.useLayoutEffect = function(v, T) {
    return r.H.useLayoutEffect(v, T);
  }, A.useMemo = function(v, T) {
    return r.H.useMemo(v, T);
  }, A.useOptimistic = function(v, T) {
    return r.H.useOptimistic(v, T);
  }, A.useReducer = function(v, T, O) {
    return r.H.useReducer(v, T, O);
  }, A.useRef = function(v) {
    return r.H.useRef(v);
  }, A.useState = function(v) {
    return r.H.useState(v);
  }, A.useSyncExternalStore = function(v, T, O) {
    return r.H.useSyncExternalStore(v, T, O);
  }, A.useTransition = function() {
    return r.H.useTransition();
  }, A.version = "19.2.6";
})), ti = /* @__PURE__ */ Ut(((A, R) => {
  R.exports = sd();
})), od = /* @__PURE__ */ Ut(((A) => {
  function R(D, _) {
    var M = D.length;
    D.push(_);
    l: for (; 0 < M; ) {
      var $ = M - 1 >>> 1, fl = D[$];
      if (0 < s(fl, _)) D[$] = _, D[M] = fl, M = $;
      else break l;
    }
  }
  function x(D) {
    return D.length === 0 ? null : D[0];
  }
  function I(D) {
    if (D.length === 0) return null;
    var _ = D[0], M = D.pop();
    if (M !== _) {
      D[0] = M;
      l: for (var $ = 0, fl = D.length, $l = fl >>> 1; $ < $l; ) {
        var v = 2 * ($ + 1) - 1, T = D[v], O = v + 1, H = D[O];
        if (0 > s(T, M)) O < fl && 0 > s(H, T) ? (D[$] = H, D[O] = M, $ = O) : (D[$] = T, D[v] = M, $ = v);
        else if (O < fl && 0 > s(H, M)) D[$] = H, D[O] = M, $ = O;
        else break l;
      }
    }
    return _;
  }
  function s(D, _) {
    var M = D.sortIndex - _.sortIndex;
    return M !== 0 ? M : D.id - _.id;
  }
  if (A.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
    var Ml = performance;
    A.unstable_now = function() {
      return Ml.now();
    };
  } else {
    var sl = Date, Yl = sl.now();
    A.unstable_now = function() {
      return sl.now() - Yl;
    };
  }
  var vl = [], Y = [], E = 1, j = null, B = 3, st = !1, Bl = !1, pl = !1, Jl = !1, Wt = typeof setTimeout == "function" ? setTimeout : null, xl = typeof clearTimeout == "function" ? clearTimeout : null, wt = typeof setImmediate < "u" ? setImmediate : null;
  function El(D) {
    for (var _ = x(Y); _ !== null; ) {
      if (_.callback === null) I(Y);
      else if (_.startTime <= D) I(Y), _.sortIndex = _.expirationTime, R(vl, _);
      else break;
      _ = x(Y);
    }
  }
  function ot(D) {
    if (pl = !1, El(D), !Bl) if (x(vl) !== null) Bl = !0, rl || (rl = !0, wl());
    else {
      var _ = x(Y);
      _ !== null && bt(ot, _.startTime - D);
    }
  }
  var rl = !1, Wl = -1, r = 5, jl = -1;
  function Et() {
    return Jl ? !0 : !(A.unstable_now() - jl < r);
  }
  function bu() {
    if (Jl = !1, rl) {
      var D = A.unstable_now();
      jl = D;
      var _ = !0;
      try {
        l: {
          Bl = !1, pl && (pl = !1, xl(Wl), Wl = -1), st = !0;
          var M = B;
          try {
            t: {
              for (El(D), j = x(vl); j !== null && !(j.expirationTime > D && Et()); ) {
                var $ = j.callback;
                if (typeof $ == "function") {
                  j.callback = null, B = j.priorityLevel;
                  var fl = $(j.expirationTime <= D);
                  if (D = A.unstable_now(), typeof fl == "function") {
                    j.callback = fl, El(D), _ = !0;
                    break t;
                  }
                  j === x(vl) && I(vl), El(D);
                } else I(vl);
                j = x(vl);
              }
              if (j !== null) _ = !0;
              else {
                var $l = x(Y);
                $l !== null && bt(ot, $l.startTime - D), _ = !1;
              }
            }
            break l;
          } finally {
            j = null, B = M, st = !1;
          }
          _ = void 0;
        }
      } finally {
        _ ? wl() : rl = !1;
      }
    }
  }
  var wl;
  if (typeof wt == "function") wl = function() {
    wt(bu);
  };
  else if (typeof MessageChannel < "u") {
    var _t = new MessageChannel(), Zu = _t.port2;
    _t.port1.onmessage = bu, wl = function() {
      Zu.postMessage(null);
    };
  } else wl = function() {
    Wt(bu, 0);
  };
  function bt(D, _) {
    Wl = Wt(function() {
      D(A.unstable_now());
    }, _);
  }
  A.unstable_IdlePriority = 5, A.unstable_ImmediatePriority = 1, A.unstable_LowPriority = 4, A.unstable_NormalPriority = 3, A.unstable_Profiling = null, A.unstable_UserBlockingPriority = 2, A.unstable_cancelCallback = function(D) {
    D.callback = null;
  }, A.unstable_forceFrameRate = function(D) {
    0 > D || 125 < D ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : r = 0 < D ? Math.floor(1e3 / D) : 5;
  }, A.unstable_getCurrentPriorityLevel = function() {
    return B;
  }, A.unstable_next = function(D) {
    switch (B) {
      case 1:
      case 2:
      case 3:
        var _ = 3;
        break;
      default:
        _ = B;
    }
    var M = B;
    B = _;
    try {
      return D();
    } finally {
      B = M;
    }
  }, A.unstable_requestPaint = function() {
    Jl = !0;
  }, A.unstable_runWithPriority = function(D, _) {
    switch (D) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        break;
      default:
        D = 3;
    }
    var M = B;
    B = D;
    try {
      return _();
    } finally {
      B = M;
    }
  }, A.unstable_scheduleCallback = function(D, _, M) {
    var $ = A.unstable_now();
    switch (typeof M == "object" && M !== null ? (M = M.delay, M = typeof M == "number" && 0 < M ? $ + M : $) : M = $, D) {
      case 1:
        var fl = -1;
        break;
      case 2:
        fl = 250;
        break;
      case 5:
        fl = 1073741823;
        break;
      case 4:
        fl = 1e4;
        break;
      default:
        fl = 5e3;
    }
    return fl = M + fl, D = {
      id: E++,
      callback: _,
      priorityLevel: D,
      startTime: M,
      expirationTime: fl,
      sortIndex: -1
    }, M > $ ? (D.sortIndex = M, R(Y, D), x(vl) === null && D === x(Y) && (pl ? (xl(Wl), Wl = -1) : pl = !0, bt(ot, M - $))) : (D.sortIndex = fl, R(vl, D), Bl || st || (Bl = !0, rl || (rl = !0, wl()))), D;
  }, A.unstable_shouldYield = Et, A.unstable_wrapCallback = function(D) {
    var _ = B;
    return function() {
      var M = B;
      B = _;
      try {
        return D.apply(this, arguments);
      } finally {
        B = M;
      }
    };
  };
})), bd = /* @__PURE__ */ Ut(((A, R) => {
  R.exports = od();
})), zd = /* @__PURE__ */ Ut(((A) => {
  var R = ti();
  function x(Y) {
    var E = "https://react.dev/errors/" + Y;
    if (1 < arguments.length) {
      E += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var j = 2; j < arguments.length; j++) E += "&args[]=" + encodeURIComponent(arguments[j]);
    }
    return "Minified React error #" + Y + "; visit " + E + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function I() {
  }
  var s = {
    d: {
      f: I,
      r: function() {
        throw Error(x(522));
      },
      D: I,
      C: I,
      L: I,
      m: I,
      X: I,
      S: I,
      M: I
    },
    p: 0,
    findDOMNode: null
  }, Ml = /* @__PURE__ */ Symbol.for("react.portal");
  function sl(Y, E, j) {
    var B = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: Ml,
      key: B == null ? null : "" + B,
      children: Y,
      containerInfo: E,
      implementation: j
    };
  }
  var Yl = R.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function vl(Y, E) {
    if (Y === "font") return "";
    if (typeof E == "string") return E === "use-credentials" ? E : "";
  }
  A.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = s, A.createPortal = function(Y, E) {
    var j = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!E || E.nodeType !== 1 && E.nodeType !== 9 && E.nodeType !== 11) throw Error(x(299));
    return sl(Y, E, null, j);
  }, A.flushSync = function(Y) {
    var E = Yl.T, j = s.p;
    try {
      if (Yl.T = null, s.p = 2, Y) return Y();
    } finally {
      Yl.T = E, s.p = j, s.d.f();
    }
  }, A.preconnect = function(Y, E) {
    typeof Y == "string" && (E ? (E = E.crossOrigin, E = typeof E == "string" ? E === "use-credentials" ? E : "" : void 0) : E = null, s.d.C(Y, E));
  }, A.prefetchDNS = function(Y) {
    typeof Y == "string" && s.d.D(Y);
  }, A.preinit = function(Y, E) {
    if (typeof Y == "string" && E && typeof E.as == "string") {
      var j = E.as, B = vl(j, E.crossOrigin), st = typeof E.integrity == "string" ? E.integrity : void 0, Bl = typeof E.fetchPriority == "string" ? E.fetchPriority : void 0;
      j === "style" ? s.d.S(Y, typeof E.precedence == "string" ? E.precedence : void 0, {
        crossOrigin: B,
        integrity: st,
        fetchPriority: Bl
      }) : j === "script" && s.d.X(Y, {
        crossOrigin: B,
        integrity: st,
        fetchPriority: Bl,
        nonce: typeof E.nonce == "string" ? E.nonce : void 0
      });
    }
  }, A.preinitModule = function(Y, E) {
    if (typeof Y == "string") if (typeof E == "object" && E !== null) {
      if (E.as == null || E.as === "script") {
        var j = vl(E.as, E.crossOrigin);
        s.d.M(Y, {
          crossOrigin: j,
          integrity: typeof E.integrity == "string" ? E.integrity : void 0,
          nonce: typeof E.nonce == "string" ? E.nonce : void 0
        });
      }
    } else E ?? s.d.M(Y);
  }, A.preload = function(Y, E) {
    if (typeof Y == "string" && typeof E == "object" && E !== null && typeof E.as == "string") {
      var j = E.as, B = vl(j, E.crossOrigin);
      s.d.L(Y, j, {
        crossOrigin: B,
        integrity: typeof E.integrity == "string" ? E.integrity : void 0,
        nonce: typeof E.nonce == "string" ? E.nonce : void 0,
        type: typeof E.type == "string" ? E.type : void 0,
        fetchPriority: typeof E.fetchPriority == "string" ? E.fetchPriority : void 0,
        referrerPolicy: typeof E.referrerPolicy == "string" ? E.referrerPolicy : void 0,
        imageSrcSet: typeof E.imageSrcSet == "string" ? E.imageSrcSet : void 0,
        imageSizes: typeof E.imageSizes == "string" ? E.imageSizes : void 0,
        media: typeof E.media == "string" ? E.media : void 0
      });
    }
  }, A.preloadModule = function(Y, E) {
    if (typeof Y == "string") if (E) {
      var j = vl(E.as, E.crossOrigin);
      s.d.m(Y, {
        as: typeof E.as == "string" && E.as !== "script" ? E.as : void 0,
        crossOrigin: j,
        integrity: typeof E.integrity == "string" ? E.integrity : void 0
      });
    } else s.d.m(Y);
  }, A.requestFormReset = function(Y) {
    s.d.r(Y);
  }, A.unstable_batchedUpdates = function(Y, E) {
    return Y(E);
  }, A.useFormState = function(Y, E, j) {
    return Yl.H.useFormState(Y, E, j);
  }, A.useFormStatus = function() {
    return Yl.H.useHostTransitionStatus();
  }, A.version = "19.2.6";
})), Td = /* @__PURE__ */ Ut(((A, R) => {
  function x() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(x);
      } catch (I) {
        console.error(I);
      }
  }
  x(), R.exports = zd();
})), Ad = /* @__PURE__ */ Ut(((A) => {
  var R = bd(), x = ti(), I = Td();
  function s(l) {
    var t = "https://react.dev/errors/" + l;
    if (1 < arguments.length) {
      t += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var u = 2; u < arguments.length; u++) t += "&args[]=" + encodeURIComponent(arguments[u]);
    }
    return "Minified React error #" + l + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function Ml(l) {
    return !(!l || l.nodeType !== 1 && l.nodeType !== 9 && l.nodeType !== 11);
  }
  function sl(l) {
    var t = l, u = l;
    if (l.alternate) for (; t.return; ) t = t.return;
    else {
      l = t;
      do
        t = l, (t.flags & 4098) !== 0 && (u = t.return), l = t.return;
      while (l);
    }
    return t.tag === 3 ? u : null;
  }
  function Yl(l) {
    if (l.tag === 13) {
      var t = l.memoizedState;
      if (t === null && (l = l.alternate, l !== null && (t = l.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function vl(l) {
    if (l.tag === 31) {
      var t = l.memoizedState;
      if (t === null && (l = l.alternate, l !== null && (t = l.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function Y(l) {
    if (sl(l) !== l) throw Error(s(188));
  }
  function E(l) {
    var t = l.alternate;
    if (!t) {
      if (t = sl(l), t === null) throw Error(s(188));
      return t !== l ? null : l;
    }
    for (var u = l, a = t; ; ) {
      var n = u.return;
      if (n === null) break;
      var e = n.alternate;
      if (e === null) {
        if (a = n.return, a !== null) {
          u = a;
          continue;
        }
        break;
      }
      if (n.child === e.child) {
        for (e = n.child; e; ) {
          if (e === u) return Y(n), l;
          if (e === a) return Y(n), t;
          e = e.sibling;
        }
        throw Error(s(188));
      }
      if (u.return !== a.return) u = n, a = e;
      else {
        for (var f = !1, c = n.child; c; ) {
          if (c === u) {
            f = !0, u = n, a = e;
            break;
          }
          if (c === a) {
            f = !0, a = n, u = e;
            break;
          }
          c = c.sibling;
        }
        if (!f) {
          for (c = e.child; c; ) {
            if (c === u) {
              f = !0, u = e, a = n;
              break;
            }
            if (c === a) {
              f = !0, a = e, u = n;
              break;
            }
            c = c.sibling;
          }
          if (!f) throw Error(s(189));
        }
      }
      if (u.alternate !== a) throw Error(s(190));
    }
    if (u.tag !== 3) throw Error(s(188));
    return u.stateNode.current === u ? l : t;
  }
  function j(l) {
    var t = l.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return l;
    for (l = l.child; l !== null; ) {
      if (t = j(l), t !== null) return t;
      l = l.sibling;
    }
    return null;
  }
  var B = Object.assign, st = /* @__PURE__ */ Symbol.for("react.element"), Bl = /* @__PURE__ */ Symbol.for("react.transitional.element"), pl = /* @__PURE__ */ Symbol.for("react.portal"), Jl = /* @__PURE__ */ Symbol.for("react.fragment"), Wt = /* @__PURE__ */ Symbol.for("react.strict_mode"), xl = /* @__PURE__ */ Symbol.for("react.profiler"), wt = /* @__PURE__ */ Symbol.for("react.consumer"), El = /* @__PURE__ */ Symbol.for("react.context"), ot = /* @__PURE__ */ Symbol.for("react.forward_ref"), rl = /* @__PURE__ */ Symbol.for("react.suspense"), Wl = /* @__PURE__ */ Symbol.for("react.suspense_list"), r = /* @__PURE__ */ Symbol.for("react.memo"), jl = /* @__PURE__ */ Symbol.for("react.lazy"), Et = /* @__PURE__ */ Symbol.for("react.activity"), bu = /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel"), wl = Symbol.iterator;
  function _t(l) {
    return l === null || typeof l != "object" ? null : (l = wl && l[wl] || l["@@iterator"], typeof l == "function" ? l : null);
  }
  var Zu = /* @__PURE__ */ Symbol.for("react.client.reference");
  function bt(l) {
    if (l == null) return null;
    if (typeof l == "function") return l.$$typeof === Zu ? null : l.displayName || l.name || null;
    if (typeof l == "string") return l;
    switch (l) {
      case Jl:
        return "Fragment";
      case xl:
        return "Profiler";
      case Wt:
        return "StrictMode";
      case rl:
        return "Suspense";
      case Wl:
        return "SuspenseList";
      case Et:
        return "Activity";
    }
    if (typeof l == "object") switch (l.$$typeof) {
      case pl:
        return "Portal";
      case El:
        return l.displayName || "Context";
      case wt:
        return (l._context.displayName || "Context") + ".Consumer";
      case ot:
        var t = l.render;
        return l = l.displayName, l || (l = t.displayName || t.name || "", l = l !== "" ? "ForwardRef(" + l + ")" : "ForwardRef"), l;
      case r:
        return t = l.displayName || null, t !== null ? t : bt(l.type) || "Memo";
      case jl:
        t = l._payload, l = l._init;
        try {
          return bt(l(t));
        } catch {
        }
    }
    return null;
  }
  var D = Array.isArray, _ = x.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, M = I.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, $ = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, fl = [], $l = -1;
  function v(l) {
    return { current: l };
  }
  function T(l) {
    0 > $l || (l.current = fl[$l], fl[$l] = null, $l--);
  }
  function O(l, t) {
    $l++, fl[$l] = l.current, l.current = t;
  }
  var H = v(null), X = v(null), Q = v(null), k = v(null);
  function Cl(l, t) {
    switch (O(Q, t), O(X, l), O(H, null), t.nodeType) {
      case 9:
      case 11:
        l = (l = t.documentElement) && (l = l.namespaceURI) ? My(l) : 0;
        break;
      default:
        if (l = t.tagName, t = t.namespaceURI) t = My(t), l = Dy(t, l);
        else switch (l) {
          case "svg":
            l = 1;
            break;
          case "math":
            l = 2;
            break;
          default:
            l = 0;
        }
    }
    T(H), O(H, l);
  }
  function hl() {
    T(H), T(X), T(Q);
  }
  function Oa(l) {
    l.memoizedState !== null && O(k, l);
    var t = H.current, u = Dy(t, l.type);
    t !== u && (O(X, l), O(H, u));
  }
  function bn(l) {
    X.current === l && (T(H), T(X)), k.current === l && (T(k), Sn._currentValue = $);
  }
  var je, ui;
  function zu(l) {
    if (je === void 0) try {
      throw Error();
    } catch (u) {
      var t = u.stack.trim().match(/\n( *(at )?)/);
      je = t && t[1] || "", ui = -1 < u.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < u.stack.indexOf("@") ? "@unknown:0:0" : "";
    }
    return `
` + je + l + ui;
  }
  var Ge = !1;
  function Xe(l, t) {
    if (!l || Ge) return "";
    Ge = !0;
    var u = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var a = { DetermineComponentFrameRoot: function() {
        try {
          if (t) {
            var z = function() {
              throw Error();
            };
            if (Object.defineProperty(z.prototype, "props", { set: function() {
              throw Error();
            } }), typeof Reflect == "object" && Reflect.construct) {
              try {
                Reflect.construct(z, []);
              } catch (g) {
                var S = g;
              }
              Reflect.construct(l, [], z);
            } else {
              try {
                z.call();
              } catch (g) {
                S = g;
              }
              l.call(z.prototype);
            }
          } else {
            try {
              throw Error();
            } catch (g) {
              S = g;
            }
            (z = l()) && typeof z.catch == "function" && z.catch(function() {
            });
          }
        } catch (g) {
          if (g && S && typeof g.stack == "string") return [g.stack, S.stack];
        }
        return [null, null];
      } };
      a.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var n = Object.getOwnPropertyDescriptor(a.DetermineComponentFrameRoot, "name");
      n && n.configurable && Object.defineProperty(a.DetermineComponentFrameRoot, "name", { value: "DetermineComponentFrameRoot" });
      var e = a.DetermineComponentFrameRoot(), f = e[0], c = e[1];
      if (f && c) {
        var i = f.split(`
`), h = c.split(`
`);
        for (n = a = 0; a < i.length && !i[a].includes("DetermineComponentFrameRoot"); ) a++;
        for (; n < h.length && !h[n].includes("DetermineComponentFrameRoot"); ) n++;
        if (a === i.length || n === h.length) for (a = i.length - 1, n = h.length - 1; 1 <= a && 0 <= n && i[a] !== h[n]; ) n--;
        for (; 1 <= a && 0 <= n; a--, n--) if (i[a] !== h[n]) {
          if (a !== 1 || n !== 1) do
            if (a--, n--, 0 > n || i[a] !== h[n]) {
              var o = `
` + i[a].replace(" at new ", " at ");
              return l.displayName && o.includes("<anonymous>") && (o = o.replace("<anonymous>", l.displayName)), o;
            }
          while (1 <= a && 0 <= n);
          break;
        }
      }
    } finally {
      Ge = !1, Error.prepareStackTrace = u;
    }
    return (u = l ? l.displayName || l.name : "") ? zu(u) : "";
  }
  function lv(l, t) {
    switch (l.tag) {
      case 26:
      case 27:
      case 5:
        return zu(l.type);
      case 16:
        return zu("Lazy");
      case 13:
        return l.child !== t && t !== null ? zu("Suspense Fallback") : zu("Suspense");
      case 19:
        return zu("SuspenseList");
      case 0:
      case 15:
        return Xe(l.type, !1);
      case 11:
        return Xe(l.type.render, !1);
      case 1:
        return Xe(l.type, !0);
      case 31:
        return zu("Activity");
      default:
        return "";
    }
  }
  function ai(l) {
    try {
      var t = "", u = null;
      do
        t += lv(l, u), u = l, l = l.return;
      while (l);
      return t;
    } catch (a) {
      return `
Error generating stack: ` + a.message + `
` + a.stack;
    }
  }
  var Qe = Object.prototype.hasOwnProperty, Ze = R.unstable_scheduleCallback, Ve = R.unstable_cancelCallback, tv = R.unstable_shouldYield, uv = R.unstable_requestPaint, Fl = R.unstable_now, av = R.unstable_getCurrentPriorityLevel, ni = R.unstable_ImmediatePriority, ei = R.unstable_UserBlockingPriority, zn = R.unstable_NormalPriority, nv = R.unstable_LowPriority, fi = R.unstable_IdlePriority, ev = R.log, fv = R.unstable_setDisableYieldValue, Ma = null, kl = null;
  function $t(l) {
    if (typeof ev == "function" && fv(l), kl && typeof kl.setStrictMode == "function") try {
      kl.setStrictMode(Ma, l);
    } catch {
    }
  }
  var Il = Math.clz32 ? Math.clz32 : yv, cv = Math.log, iv = Math.LN2;
  function yv(l) {
    return l >>>= 0, l === 0 ? 32 : 31 - (cv(l) / iv | 0) | 0;
  }
  var Tn = 256, An = 262144, En = 4194304;
  function Tu(l) {
    var t = l & 42;
    if (t !== 0) return t;
    switch (l & -l) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
        return 64;
      case 128:
        return 128;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
        return l & 261888;
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return l & 3932160;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return l & 62914560;
      case 67108864:
        return 67108864;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 0;
      default:
        return l;
    }
  }
  function _n(l, t, u) {
    var a = l.pendingLanes;
    if (a === 0) return 0;
    var n = 0, e = l.suspendedLanes, f = l.pingedLanes;
    l = l.warmLanes;
    var c = a & 134217727;
    return c !== 0 ? (a = c & ~e, a !== 0 ? n = Tu(a) : (f &= c, f !== 0 ? n = Tu(f) : u || (u = c & ~l, u !== 0 && (n = Tu(u))))) : (c = a & ~e, c !== 0 ? n = Tu(c) : f !== 0 ? n = Tu(f) : u || (u = a & ~l, u !== 0 && (n = Tu(u)))), n === 0 ? 0 : t !== 0 && t !== n && (t & e) === 0 && (e = n & -n, u = t & -t, e >= u || e === 32 && (u & 4194048) !== 0) ? t : n;
  }
  function Da(l, t) {
    return (l.pendingLanes & ~(l.suspendedLanes & ~l.pingedLanes) & t) === 0;
  }
  function vv(l, t) {
    switch (l) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return t + 250;
      case 16:
      case 32:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return -1;
      case 67108864:
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function ci() {
    var l = En;
    return En <<= 1, (En & 62914560) === 0 && (En = 4194304), l;
  }
  function Le(l) {
    for (var t = [], u = 0; 31 > u; u++) t.push(l);
    return t;
  }
  function On(l, t) {
    l.pendingLanes |= t, t !== 268435456 && (l.suspendedLanes = 0, l.pingedLanes = 0, l.warmLanes = 0);
  }
  function mv(l, t, u, a, n, e) {
    var f = l.pendingLanes;
    l.pendingLanes = u, l.suspendedLanes = 0, l.pingedLanes = 0, l.warmLanes = 0, l.expiredLanes &= u, l.entangledLanes &= u, l.errorRecoveryDisabledLanes &= u, l.shellSuspendCounter = 0;
    var c = l.entanglements, i = l.expirationTimes, h = l.hiddenUpdates;
    for (u = f & ~u; 0 < u; ) {
      var o = 31 - Il(u), z = 1 << o;
      c[o] = 0, i[o] = -1;
      var S = h[o];
      if (S !== null) for (h[o] = null, o = 0; o < S.length; o++) {
        var g = S[o];
        g !== null && (g.lane &= -536870913);
      }
      u &= ~z;
    }
    a !== 0 && ii(l, a, 0), e !== 0 && n === 0 && l.tag !== 0 && (l.suspendedLanes |= e & ~(f & ~t));
  }
  function ii(l, t, u) {
    l.pendingLanes |= t, l.suspendedLanes &= ~t;
    var a = 31 - Il(t);
    l.entangledLanes |= t, l.entanglements[a] = l.entanglements[a] | 1073741824 | u & 261930;
  }
  function yi(l, t) {
    var u = l.entangledLanes |= t;
    for (l = l.entanglements; u; ) {
      var a = 31 - Il(u), n = 1 << a;
      n & t | l[a] & t && (l[a] |= t), u &= ~n;
    }
  }
  function vi(l, t) {
    var u = t & -t;
    return u = (u & 42) !== 0 ? 1 : mi(u), (u & (l.suspendedLanes | t)) !== 0 ? 0 : u;
  }
  function mi(l) {
    switch (l) {
      case 2:
        l = 1;
        break;
      case 8:
        l = 4;
        break;
      case 32:
        l = 16;
        break;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        l = 128;
        break;
      case 268435456:
        l = 134217728;
        break;
      default:
        l = 0;
    }
    return l;
  }
  function Ke(l) {
    return l &= -l, 2 < l ? 8 < l ? (l & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function di() {
    var l = M.p;
    return l !== 0 ? l : (l = window.event, l === void 0 ? 32 : Wy(l.type));
  }
  function hi(l, t) {
    var u = M.p;
    try {
      return M.p = l, t();
    } finally {
      M.p = u;
    }
  }
  var Ft = Math.random().toString(36).slice(2), Dl = "__reactFiber$" + Ft, Gl = "__reactProps$" + Ft, Ua = "__reactContainer$" + Ft, Je = "__reactEvents$" + Ft, dv = "__reactListeners$" + Ft, hv = "__reactHandles$" + Ft, Si = "__reactResources$" + Ft, Na = "__reactMarker$" + Ft;
  function xe(l) {
    delete l[Dl], delete l[Gl], delete l[Je], delete l[dv], delete l[hv];
  }
  function Vu(l) {
    var t = l[Dl];
    if (t) return t;
    for (var u = l.parentNode; u; ) {
      if (t = u[Ua] || u[Dl]) {
        if (u = t.alternate, t.child !== null || u !== null && u.child !== null) for (l = Cy(l); l !== null; ) {
          if (u = l[Dl]) return u;
          l = Cy(l);
        }
        return t;
      }
      l = u, u = l.parentNode;
    }
    return null;
  }
  function Lu(l) {
    if (l = l[Dl] || l[Ua]) {
      var t = l.tag;
      if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3) return l;
    }
    return null;
  }
  function Ha(l) {
    var t = l.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return l.stateNode;
    throw Error(s(33));
  }
  function Ku(l) {
    var t = l[Si];
    return t || (t = l[Si] = {
      hoistableStyles: /* @__PURE__ */ new Map(),
      hoistableScripts: /* @__PURE__ */ new Map()
    }), t;
  }
  function _l(l) {
    l[Na] = !0;
  }
  var gi = /* @__PURE__ */ new Set(), si = {};
  function Au(l, t) {
    Ju(l, t), Ju(l + "Capture", t);
  }
  function Ju(l, t) {
    for (si[l] = t, l = 0; l < t.length; l++) gi.add(t[l]);
  }
  var Sv = RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"), oi = {}, bi = {};
  function gv(l) {
    return Qe.call(bi, l) ? !0 : Qe.call(oi, l) ? !1 : Sv.test(l) ? bi[l] = !0 : (oi[l] = !0, !1);
  }
  function Mn(l, t, u) {
    if (gv(t)) if (u === null) l.removeAttribute(t);
    else {
      switch (typeof u) {
        case "undefined":
        case "function":
        case "symbol":
          l.removeAttribute(t);
          return;
        case "boolean":
          var a = t.toLowerCase().slice(0, 5);
          if (a !== "data-" && a !== "aria-") {
            l.removeAttribute(t);
            return;
          }
      }
      l.setAttribute(t, "" + u);
    }
  }
  function Dn(l, t, u) {
    if (u === null) l.removeAttribute(t);
    else {
      switch (typeof u) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          l.removeAttribute(t);
          return;
      }
      l.setAttribute(t, "" + u);
    }
  }
  function Nt(l, t, u, a) {
    if (a === null) l.removeAttribute(u);
    else {
      switch (typeof a) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          l.removeAttribute(u);
          return;
      }
      l.setAttributeNS(t, u, "" + a);
    }
  }
  function et(l) {
    switch (typeof l) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return l;
      case "object":
        return l;
      default:
        return "";
    }
  }
  function zi(l) {
    var t = l.type;
    return (l = l.nodeName) && l.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
  }
  function sv(l, t, u) {
    var a = Object.getOwnPropertyDescriptor(l.constructor.prototype, t);
    if (!l.hasOwnProperty(t) && typeof a < "u" && typeof a.get == "function" && typeof a.set == "function") {
      var n = a.get, e = a.set;
      return Object.defineProperty(l, t, {
        configurable: !0,
        get: function() {
          return n.call(this);
        },
        set: function(f) {
          u = "" + f, e.call(this, f);
        }
      }), Object.defineProperty(l, t, { enumerable: a.enumerable }), {
        getValue: function() {
          return u;
        },
        setValue: function(f) {
          u = "" + f;
        },
        stopTracking: function() {
          l._valueTracker = null, delete l[t];
        }
      };
    }
  }
  function re(l) {
    if (!l._valueTracker) {
      var t = zi(l) ? "checked" : "value";
      l._valueTracker = sv(l, t, "" + l[t]);
    }
  }
  function Ti(l) {
    if (!l) return !1;
    var t = l._valueTracker;
    if (!t) return !0;
    var u = t.getValue(), a = "";
    return l && (a = zi(l) ? l.checked ? "true" : "false" : l.value), l = a, l !== u ? (t.setValue(l), !0) : !1;
  }
  function Un(l) {
    if (l = l || (typeof document < "u" ? document : void 0), typeof l > "u") return null;
    try {
      return l.activeElement || l.body;
    } catch {
      return l.body;
    }
  }
  var ov = /[\n"\\]/g;
  function ft(l) {
    return l.replace(ov, function(t) {
      return "\\" + t.charCodeAt(0).toString(16) + " ";
    });
  }
  function We(l, t, u, a, n, e, f, c) {
    l.name = "", f != null && typeof f != "function" && typeof f != "symbol" && typeof f != "boolean" ? l.type = f : l.removeAttribute("type"), t != null ? f === "number" ? (t === 0 && l.value === "" || l.value != t) && (l.value = "" + et(t)) : l.value !== "" + et(t) && (l.value = "" + et(t)) : f !== "submit" && f !== "reset" || l.removeAttribute("value"), t != null ? we(l, f, et(t)) : u != null ? we(l, f, et(u)) : a != null && l.removeAttribute("value"), n == null && e != null && (l.defaultChecked = !!e), n != null && (l.checked = n && typeof n != "function" && typeof n != "symbol"), c != null && typeof c != "function" && typeof c != "symbol" && typeof c != "boolean" ? l.name = "" + et(c) : l.removeAttribute("name");
  }
  function Ai(l, t, u, a, n, e, f, c) {
    if (e != null && typeof e != "function" && typeof e != "symbol" && typeof e != "boolean" && (l.type = e), t != null || u != null) {
      if (!(e !== "submit" && e !== "reset" || t != null)) {
        re(l);
        return;
      }
      u = u != null ? "" + et(u) : "", t = t != null ? "" + et(t) : u, c || t === l.value || (l.value = t), l.defaultValue = t;
    }
    a = a ?? n, a = typeof a != "function" && typeof a != "symbol" && !!a, l.checked = c ? l.checked : !!a, l.defaultChecked = !!a, f != null && typeof f != "function" && typeof f != "symbol" && typeof f != "boolean" && (l.name = f), re(l);
  }
  function we(l, t, u) {
    t === "number" && Un(l.ownerDocument) === l || l.defaultValue === "" + u || (l.defaultValue = "" + u);
  }
  function xu(l, t, u, a) {
    if (l = l.options, t) {
      t = {};
      for (var n = 0; n < u.length; n++) t["$" + u[n]] = !0;
      for (u = 0; u < l.length; u++) n = t.hasOwnProperty("$" + l[u].value), l[u].selected !== n && (l[u].selected = n), n && a && (l[u].defaultSelected = !0);
    } else {
      for (u = "" + et(u), t = null, n = 0; n < l.length; n++) {
        if (l[n].value === u) {
          l[n].selected = !0, a && (l[n].defaultSelected = !0);
          return;
        }
        t !== null || l[n].disabled || (t = l[n]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function Ei(l, t, u) {
    if (t != null && (t = "" + et(t), t !== l.value && (l.value = t), u == null)) {
      l.defaultValue !== t && (l.defaultValue = t);
      return;
    }
    l.defaultValue = u != null ? "" + et(u) : "";
  }
  function _i(l, t, u, a) {
    if (t == null) {
      if (a != null) {
        if (u != null) throw Error(s(92));
        if (D(a)) {
          if (1 < a.length) throw Error(s(93));
          a = a[0];
        }
        u = a;
      }
      u ??= "", t = u;
    }
    u = et(t), l.defaultValue = u, a = l.textContent, a === u && a !== "" && a !== null && (l.value = a), re(l);
  }
  function ru(l, t) {
    if (t) {
      var u = l.firstChild;
      if (u && u === l.lastChild && u.nodeType === 3) {
        u.nodeValue = t;
        return;
      }
    }
    l.textContent = t;
  }
  var bv = new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));
  function Oi(l, t, u) {
    var a = t.indexOf("--") === 0;
    u == null || typeof u == "boolean" || u === "" ? a ? l.setProperty(t, "") : t === "float" ? l.cssFloat = "" : l[t] = "" : a ? l.setProperty(t, u) : typeof u != "number" || u === 0 || bv.has(t) ? t === "float" ? l.cssFloat = u : l[t] = ("" + u).trim() : l[t] = u + "px";
  }
  function Mi(l, t, u) {
    if (t != null && typeof t != "object") throw Error(s(62));
    if (l = l.style, u != null) {
      for (var a in u) !u.hasOwnProperty(a) || t != null && t.hasOwnProperty(a) || (a.indexOf("--") === 0 ? l.setProperty(a, "") : a === "float" ? l.cssFloat = "" : l[a] = "");
      for (var n in t) a = t[n], t.hasOwnProperty(n) && u[n] !== a && Oi(l, n, a);
    } else for (var e in t) t.hasOwnProperty(e) && Oi(l, e, t[e]);
  }
  function $e(l) {
    if (l.indexOf("-") === -1) return !1;
    switch (l) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var zv = /* @__PURE__ */ new Map([
    ["acceptCharset", "accept-charset"],
    ["htmlFor", "for"],
    ["httpEquiv", "http-equiv"],
    ["crossOrigin", "crossorigin"],
    ["accentHeight", "accent-height"],
    ["alignmentBaseline", "alignment-baseline"],
    ["arabicForm", "arabic-form"],
    ["baselineShift", "baseline-shift"],
    ["capHeight", "cap-height"],
    ["clipPath", "clip-path"],
    ["clipRule", "clip-rule"],
    ["colorInterpolation", "color-interpolation"],
    ["colorInterpolationFilters", "color-interpolation-filters"],
    ["colorProfile", "color-profile"],
    ["colorRendering", "color-rendering"],
    ["dominantBaseline", "dominant-baseline"],
    ["enableBackground", "enable-background"],
    ["fillOpacity", "fill-opacity"],
    ["fillRule", "fill-rule"],
    ["floodColor", "flood-color"],
    ["floodOpacity", "flood-opacity"],
    ["fontFamily", "font-family"],
    ["fontSize", "font-size"],
    ["fontSizeAdjust", "font-size-adjust"],
    ["fontStretch", "font-stretch"],
    ["fontStyle", "font-style"],
    ["fontVariant", "font-variant"],
    ["fontWeight", "font-weight"],
    ["glyphName", "glyph-name"],
    ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
    ["glyphOrientationVertical", "glyph-orientation-vertical"],
    ["horizAdvX", "horiz-adv-x"],
    ["horizOriginX", "horiz-origin-x"],
    ["imageRendering", "image-rendering"],
    ["letterSpacing", "letter-spacing"],
    ["lightingColor", "lighting-color"],
    ["markerEnd", "marker-end"],
    ["markerMid", "marker-mid"],
    ["markerStart", "marker-start"],
    ["overlinePosition", "overline-position"],
    ["overlineThickness", "overline-thickness"],
    ["paintOrder", "paint-order"],
    ["panose-1", "panose-1"],
    ["pointerEvents", "pointer-events"],
    ["renderingIntent", "rendering-intent"],
    ["shapeRendering", "shape-rendering"],
    ["stopColor", "stop-color"],
    ["stopOpacity", "stop-opacity"],
    ["strikethroughPosition", "strikethrough-position"],
    ["strikethroughThickness", "strikethrough-thickness"],
    ["strokeDasharray", "stroke-dasharray"],
    ["strokeDashoffset", "stroke-dashoffset"],
    ["strokeLinecap", "stroke-linecap"],
    ["strokeLinejoin", "stroke-linejoin"],
    ["strokeMiterlimit", "stroke-miterlimit"],
    ["strokeOpacity", "stroke-opacity"],
    ["strokeWidth", "stroke-width"],
    ["textAnchor", "text-anchor"],
    ["textDecoration", "text-decoration"],
    ["textRendering", "text-rendering"],
    ["transformOrigin", "transform-origin"],
    ["underlinePosition", "underline-position"],
    ["underlineThickness", "underline-thickness"],
    ["unicodeBidi", "unicode-bidi"],
    ["unicodeRange", "unicode-range"],
    ["unitsPerEm", "units-per-em"],
    ["vAlphabetic", "v-alphabetic"],
    ["vHanging", "v-hanging"],
    ["vIdeographic", "v-ideographic"],
    ["vMathematical", "v-mathematical"],
    ["vectorEffect", "vector-effect"],
    ["vertAdvY", "vert-adv-y"],
    ["vertOriginX", "vert-origin-x"],
    ["vertOriginY", "vert-origin-y"],
    ["wordSpacing", "word-spacing"],
    ["writingMode", "writing-mode"],
    ["xmlnsXlink", "xmlns:xlink"],
    ["xHeight", "x-height"]
  ]), Tv = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Nn(l) {
    return Tv.test("" + l) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : l;
  }
  function Ht() {
  }
  var Fe = null;
  function ke(l) {
    return l = l.target || l.srcElement || window, l.correspondingUseElement && (l = l.correspondingUseElement), l.nodeType === 3 ? l.parentNode : l;
  }
  var Wu = null, wu = null;
  function Di(l) {
    var t = Lu(l);
    if (t && (l = t.stateNode)) {
      var u = l[Gl] || null;
      l: switch (l = t.stateNode, t.type) {
        case "input":
          if (We(l, u.value, u.defaultValue, u.defaultValue, u.checked, u.defaultChecked, u.type, u.name), t = u.name, u.type === "radio" && t != null) {
            for (u = l; u.parentNode; ) u = u.parentNode;
            for (u = u.querySelectorAll('input[name="' + ft("" + t) + '"][type="radio"]'), t = 0; t < u.length; t++) {
              var a = u[t];
              if (a !== l && a.form === l.form) {
                var n = a[Gl] || null;
                if (!n) throw Error(s(90));
                We(a, n.value, n.defaultValue, n.defaultValue, n.checked, n.defaultChecked, n.type, n.name);
              }
            }
            for (t = 0; t < u.length; t++) a = u[t], a.form === l.form && Ti(a);
          }
          break l;
        case "textarea":
          Ei(l, u.value, u.defaultValue);
          break l;
        case "select":
          t = u.value, t != null && xu(l, !!u.multiple, t, !1);
      }
    }
  }
  var Ie = !1;
  function Ui(l, t, u) {
    if (Ie) return l(t, u);
    Ie = !0;
    try {
      return l(t);
    } finally {
      if (Ie = !1, (Wu !== null || wu !== null) && (ge(), Wu && (t = Wu, l = wu, wu = Wu = null, Di(t), l)))
        for (t = 0; t < l.length; t++) Di(l[t]);
    }
  }
  function qa(l, t) {
    var u = l.stateNode;
    if (u === null) return null;
    var a = u[Gl] || null;
    if (a === null) return null;
    u = a[t];
    l: switch (t) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (a = !a.disabled) || (l = l.type, a = !(l === "button" || l === "input" || l === "select" || l === "textarea")), l = !a;
        break l;
      default:
        l = !1;
    }
    if (l) return null;
    if (u && typeof u != "function") throw Error(s(231, t, typeof u));
    return u;
  }
  var qt = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Pe = !1;
  if (qt) try {
    var Ya = {};
    Object.defineProperty(Ya, "passive", { get: function() {
      Pe = !0;
    } }), window.addEventListener("test", Ya, Ya), window.removeEventListener("test", Ya, Ya);
  } catch {
    Pe = !1;
  }
  var kt = null, lf = null, Hn = null;
  function Ni() {
    if (Hn) return Hn;
    var l, t = lf, u = t.length, a, n = "value" in kt ? kt.value : kt.textContent, e = n.length;
    for (l = 0; l < u && t[l] === n[l]; l++) ;
    var f = u - l;
    for (a = 1; a <= f && t[u - a] === n[e - a]; a++) ;
    return Hn = n.slice(l, 1 < a ? 1 - a : void 0);
  }
  function qn(l) {
    var t = l.keyCode;
    return "charCode" in l ? (l = l.charCode, l === 0 && t === 13 && (l = 13)) : l = t, l === 10 && (l = 13), 32 <= l || l === 13 ? l : 0;
  }
  function Yn() {
    return !0;
  }
  function Hi() {
    return !1;
  }
  function Xl(l) {
    function t(u, a, n, e, f) {
      this._reactName = u, this._targetInst = n, this.type = a, this.nativeEvent = e, this.target = f, this.currentTarget = null;
      for (var c in l) l.hasOwnProperty(c) && (u = l[c], this[c] = u ? u(e) : e[c]);
      return this.isDefaultPrevented = (e.defaultPrevented != null ? e.defaultPrevented : e.returnValue === !1) ? Yn : Hi, this.isPropagationStopped = Hi, this;
    }
    return B(t.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var u = this.nativeEvent;
        u && (u.preventDefault ? u.preventDefault() : typeof u.returnValue != "unknown" && (u.returnValue = !1), this.isDefaultPrevented = Yn);
      },
      stopPropagation: function() {
        var u = this.nativeEvent;
        u && (u.stopPropagation ? u.stopPropagation() : typeof u.cancelBubble != "unknown" && (u.cancelBubble = !0), this.isPropagationStopped = Yn);
      },
      persist: function() {
      },
      isPersistent: Yn
    }), t;
  }
  var Eu = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(l) {
      return l.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, Bn = Xl(Eu), Ba = B({}, Eu, {
    view: 0,
    detail: 0
  }), Av = Xl(Ba), tf, uf, Ca, Cn = B({}, Ba, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: nf,
    button: 0,
    buttons: 0,
    relatedTarget: function(l) {
      return l.relatedTarget === void 0 ? l.fromElement === l.srcElement ? l.toElement : l.fromElement : l.relatedTarget;
    },
    movementX: function(l) {
      return "movementX" in l ? l.movementX : (l !== Ca && (Ca && l.type === "mousemove" ? (tf = l.screenX - Ca.screenX, uf = l.screenY - Ca.screenY) : uf = tf = 0, Ca = l), tf);
    },
    movementY: function(l) {
      return "movementY" in l ? l.movementY : uf;
    }
  }), qi = Xl(Cn), Ev = Xl(B({}, Cn, { dataTransfer: 0 })), af = Xl(B({}, Ba, { relatedTarget: 0 })), _v = Xl(B({}, Eu, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  })), Ov = Xl(B({}, Eu, { clipboardData: function(l) {
    return "clipboardData" in l ? l.clipboardData : window.clipboardData;
  } })), Yi = Xl(B({}, Eu, { data: 0 })), Mv = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified"
  }, Dv = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta"
  }, Uv = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function Nv(l) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(l) : (l = Uv[l]) ? !!t[l] : !1;
  }
  function nf() {
    return Nv;
  }
  var Hv = Xl(B({}, Ba, {
    key: function(l) {
      if (l.key) {
        var t = Mv[l.key] || l.key;
        if (t !== "Unidentified") return t;
      }
      return l.type === "keypress" ? (l = qn(l), l === 13 ? "Enter" : String.fromCharCode(l)) : l.type === "keydown" || l.type === "keyup" ? Dv[l.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: nf,
    charCode: function(l) {
      return l.type === "keypress" ? qn(l) : 0;
    },
    keyCode: function(l) {
      return l.type === "keydown" || l.type === "keyup" ? l.keyCode : 0;
    },
    which: function(l) {
      return l.type === "keypress" ? qn(l) : l.type === "keydown" || l.type === "keyup" ? l.keyCode : 0;
    }
  })), Bi = Xl(B({}, Cn, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0
  })), qv = Xl(B({}, Ba, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: nf
  })), Yv = Xl(B({}, Eu, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  })), Bv = Xl(B({}, Cn, {
    deltaX: function(l) {
      return "deltaX" in l ? l.deltaX : "wheelDeltaX" in l ? -l.wheelDeltaX : 0;
    },
    deltaY: function(l) {
      return "deltaY" in l ? l.deltaY : "wheelDeltaY" in l ? -l.wheelDeltaY : "wheelDelta" in l ? -l.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  })), Cv = Xl(B({}, Eu, {
    newState: 0,
    oldState: 0
  })), Rv = [
    9,
    13,
    27,
    32
  ], ef = qt && "CompositionEvent" in window, Ra = null;
  qt && "documentMode" in document && (Ra = document.documentMode);
  var pv = qt && "TextEvent" in window && !Ra, Ci = qt && (!ef || Ra && 8 < Ra && 11 >= Ra), Ri = " ", pi = !1;
  function ji(l, t) {
    switch (l) {
      case "keyup":
        return Rv.indexOf(t.keyCode) !== -1;
      case "keydown":
        return t.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function Gi(l) {
    return l = l.detail, typeof l == "object" && "data" in l ? l.data : null;
  }
  var $u = !1;
  function jv(l, t) {
    switch (l) {
      case "compositionend":
        return Gi(t);
      case "keypress":
        return t.which !== 32 ? null : (pi = !0, Ri);
      case "textInput":
        return l = t.data, l === Ri && pi ? null : l;
      default:
        return null;
    }
  }
  function Gv(l, t) {
    if ($u) return l === "compositionend" || !ef && ji(l, t) ? (l = Ni(), Hn = lf = kt = null, $u = !1, l) : null;
    switch (l) {
      case "paste":
        return null;
      case "keypress":
        if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
          if (t.char && 1 < t.char.length) return t.char;
          if (t.which) return String.fromCharCode(t.which);
        }
        return null;
      case "compositionend":
        return Ci && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var Xv = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0
  };
  function Xi(l) {
    var t = l && l.nodeName && l.nodeName.toLowerCase();
    return t === "input" ? !!Xv[l.type] : t === "textarea";
  }
  function Qi(l, t, u, a) {
    Wu ? wu ? wu.push(a) : wu = [a] : Wu = a, t = Ee(t, "onChange"), 0 < t.length && (u = new Bn("onChange", "change", null, u, a), l.push({
      event: u,
      listeners: t
    }));
  }
  var pa = null, ja = null;
  function Qv(l) {
    by(l, 0);
  }
  function Rn(l) {
    if (Ti(Ha(l))) return l;
  }
  function Zi(l, t) {
    if (l === "change") return t;
  }
  var Vi = !1;
  if (qt) {
    var ff;
    if (qt) {
      var cf = "oninput" in document;
      if (!cf) {
        var Li = document.createElement("div");
        Li.setAttribute("oninput", "return;"), cf = typeof Li.oninput == "function";
      }
      ff = cf;
    } else ff = !1;
    Vi = ff && (!document.documentMode || 9 < document.documentMode);
  }
  function Ki() {
    pa && (pa.detachEvent("onpropertychange", Ji), ja = pa = null);
  }
  function Ji(l) {
    if (l.propertyName === "value" && Rn(ja)) {
      var t = [];
      Qi(t, ja, l, ke(l)), Ui(Qv, t);
    }
  }
  function Zv(l, t, u) {
    l === "focusin" ? (Ki(), pa = t, ja = u, pa.attachEvent("onpropertychange", Ji)) : l === "focusout" && Ki();
  }
  function Vv(l) {
    if (l === "selectionchange" || l === "keyup" || l === "keydown") return Rn(ja);
  }
  function Lv(l, t) {
    if (l === "click") return Rn(t);
  }
  function Kv(l, t) {
    if (l === "input" || l === "change") return Rn(t);
  }
  function Jv(l, t) {
    return l === t && (l !== 0 || 1 / l === 1 / t) || l !== l && t !== t;
  }
  var Pl = typeof Object.is == "function" ? Object.is : Jv;
  function Ga(l, t) {
    if (Pl(l, t)) return !0;
    if (typeof l != "object" || l === null || typeof t != "object" || t === null) return !1;
    var u = Object.keys(l), a = Object.keys(t);
    if (u.length !== a.length) return !1;
    for (a = 0; a < u.length; a++) {
      var n = u[a];
      if (!Qe.call(t, n) || !Pl(l[n], t[n])) return !1;
    }
    return !0;
  }
  function xi(l) {
    for (; l && l.firstChild; ) l = l.firstChild;
    return l;
  }
  function ri(l, t) {
    var u = xi(l);
    l = 0;
    for (var a; u; ) {
      if (u.nodeType === 3) {
        if (a = l + u.textContent.length, l <= t && a >= t) return {
          node: u,
          offset: t - l
        };
        l = a;
      }
      l: {
        for (; u; ) {
          if (u.nextSibling) {
            u = u.nextSibling;
            break l;
          }
          u = u.parentNode;
        }
        u = void 0;
      }
      u = xi(u);
    }
  }
  function Wi(l, t) {
    return l && t ? l === t ? !0 : l && l.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Wi(l, t.parentNode) : "contains" in l ? l.contains(t) : l.compareDocumentPosition ? !!(l.compareDocumentPosition(t) & 16) : !1 : !1;
  }
  function wi(l) {
    l = l != null && l.ownerDocument != null && l.ownerDocument.defaultView != null ? l.ownerDocument.defaultView : window;
    for (var t = Un(l.document); t instanceof l.HTMLIFrameElement; ) {
      try {
        var u = typeof t.contentWindow.location.href == "string";
      } catch {
        u = !1;
      }
      if (u) l = t.contentWindow;
      else break;
      t = Un(l.document);
    }
    return t;
  }
  function yf(l) {
    var t = l && l.nodeName && l.nodeName.toLowerCase();
    return t && (t === "input" && (l.type === "text" || l.type === "search" || l.type === "tel" || l.type === "url" || l.type === "password") || t === "textarea" || l.contentEditable === "true");
  }
  var xv = qt && "documentMode" in document && 11 >= document.documentMode, Fu = null, vf = null, Xa = null, mf = !1;
  function $i(l, t, u) {
    var a = u.window === u ? u.document : u.nodeType === 9 ? u : u.ownerDocument;
    mf || Fu == null || Fu !== Un(a) || (a = Fu, "selectionStart" in a && yf(a) ? a = {
      start: a.selectionStart,
      end: a.selectionEnd
    } : (a = (a.ownerDocument && a.ownerDocument.defaultView || window).getSelection(), a = {
      anchorNode: a.anchorNode,
      anchorOffset: a.anchorOffset,
      focusNode: a.focusNode,
      focusOffset: a.focusOffset
    }), Xa && Ga(Xa, a) || (Xa = a, a = Ee(vf, "onSelect"), 0 < a.length && (t = new Bn("onSelect", "select", null, t, u), l.push({
      event: t,
      listeners: a
    }), t.target = Fu)));
  }
  function _u(l, t) {
    var u = {};
    return u[l.toLowerCase()] = t.toLowerCase(), u["Webkit" + l] = "webkit" + t, u["Moz" + l] = "moz" + t, u;
  }
  var ku = {
    animationend: _u("Animation", "AnimationEnd"),
    animationiteration: _u("Animation", "AnimationIteration"),
    animationstart: _u("Animation", "AnimationStart"),
    transitionrun: _u("Transition", "TransitionRun"),
    transitionstart: _u("Transition", "TransitionStart"),
    transitioncancel: _u("Transition", "TransitionCancel"),
    transitionend: _u("Transition", "TransitionEnd")
  }, df = {}, Fi = {};
  qt && (Fi = document.createElement("div").style, "AnimationEvent" in window || (delete ku.animationend.animation, delete ku.animationiteration.animation, delete ku.animationstart.animation), "TransitionEvent" in window || delete ku.transitionend.transition);
  function Ou(l) {
    if (df[l]) return df[l];
    if (!ku[l]) return l;
    var t = ku[l], u;
    for (u in t) if (t.hasOwnProperty(u) && u in Fi) return df[l] = t[u];
    return l;
  }
  var ki = Ou("animationend"), Ii = Ou("animationiteration"), Pi = Ou("animationstart"), rv = Ou("transitionrun"), Wv = Ou("transitionstart"), wv = Ou("transitioncancel"), l0 = Ou("transitionend"), t0 = /* @__PURE__ */ new Map(), hf = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
  hf.push("scrollEnd");
  function zt(l, t) {
    t0.set(l, t), Au(t, [l]);
  }
  var pn = typeof reportError == "function" ? reportError : function(l) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var t = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof l == "object" && l !== null && typeof l.message == "string" ? String(l.message) : String(l),
        error: l
      });
      if (!window.dispatchEvent(t)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", l);
      return;
    }
    console.error(l);
  }, ct = [], Iu = 0, Sf = 0;
  function jn() {
    for (var l = Iu, t = Sf = Iu = 0; t < l; ) {
      var u = ct[t];
      ct[t++] = null;
      var a = ct[t];
      ct[t++] = null;
      var n = ct[t];
      ct[t++] = null;
      var e = ct[t];
      if (ct[t++] = null, a !== null && n !== null) {
        var f = a.pending;
        f === null ? n.next = n : (n.next = f.next, f.next = n), a.pending = n;
      }
      e !== 0 && u0(u, n, e);
    }
  }
  function Gn(l, t, u, a) {
    ct[Iu++] = l, ct[Iu++] = t, ct[Iu++] = u, ct[Iu++] = a, Sf |= a, l.lanes |= a, l = l.alternate, l !== null && (l.lanes |= a);
  }
  function gf(l, t, u, a) {
    return Gn(l, t, u, a), Xn(l);
  }
  function Mu(l, t) {
    return Gn(l, null, null, t), Xn(l);
  }
  function u0(l, t, u) {
    l.lanes |= u;
    var a = l.alternate;
    a !== null && (a.lanes |= u);
    for (var n = !1, e = l.return; e !== null; ) e.childLanes |= u, a = e.alternate, a !== null && (a.childLanes |= u), e.tag === 22 && (l = e.stateNode, l === null || l._visibility & 1 || (n = !0)), l = e, e = e.return;
    return l.tag === 3 ? (e = l.stateNode, n && t !== null && (n = 31 - Il(u), l = e.hiddenUpdates, a = l[n], a === null ? l[n] = [t] : a.push(t), t.lane = u | 536870912), e) : null;
  }
  function Xn(l) {
    if (50 < fn) throw fn = 0, Oc = null, Error(s(185));
    for (var t = l.return; t !== null; ) l = t, t = l.return;
    return l.tag === 3 ? l.stateNode : null;
  }
  var Pu = {};
  function $v(l, t, u, a) {
    this.tag = l, this.key = u, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = a, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function lt(l, t, u, a) {
    return new $v(l, t, u, a);
  }
  function sf(l) {
    return l = l.prototype, !(!l || !l.isReactComponent);
  }
  function Yt(l, t) {
    var u = l.alternate;
    return u === null ? (u = lt(l.tag, t, l.key, l.mode), u.elementType = l.elementType, u.type = l.type, u.stateNode = l.stateNode, u.alternate = l, l.alternate = u) : (u.pendingProps = t, u.type = l.type, u.flags = 0, u.subtreeFlags = 0, u.deletions = null), u.flags = l.flags & 65011712, u.childLanes = l.childLanes, u.lanes = l.lanes, u.child = l.child, u.memoizedProps = l.memoizedProps, u.memoizedState = l.memoizedState, u.updateQueue = l.updateQueue, t = l.dependencies, u.dependencies = t === null ? null : {
      lanes: t.lanes,
      firstContext: t.firstContext
    }, u.sibling = l.sibling, u.index = l.index, u.ref = l.ref, u.refCleanup = l.refCleanup, u;
  }
  function a0(l, t) {
    l.flags &= 65011714;
    var u = l.alternate;
    return u === null ? (l.childLanes = 0, l.lanes = t, l.child = null, l.subtreeFlags = 0, l.memoizedProps = null, l.memoizedState = null, l.updateQueue = null, l.dependencies = null, l.stateNode = null) : (l.childLanes = u.childLanes, l.lanes = u.lanes, l.child = u.child, l.subtreeFlags = 0, l.deletions = null, l.memoizedProps = u.memoizedProps, l.memoizedState = u.memoizedState, l.updateQueue = u.updateQueue, l.type = u.type, t = u.dependencies, l.dependencies = t === null ? null : {
      lanes: t.lanes,
      firstContext: t.firstContext
    }), l;
  }
  function Qn(l, t, u, a, n, e) {
    var f = 0;
    if (a = l, typeof l == "function") sf(l) && (f = 1);
    else if (typeof l == "string") f = td(l, u, H.current) ? 26 : l === "html" || l === "head" || l === "body" ? 27 : 5;
    else l: switch (l) {
      case Et:
        return l = lt(31, u, t, n), l.elementType = Et, l.lanes = e, l;
      case Jl:
        return Du(u.children, n, e, t);
      case Wt:
        f = 8, n |= 24;
        break;
      case xl:
        return l = lt(12, u, t, n | 2), l.elementType = xl, l.lanes = e, l;
      case rl:
        return l = lt(13, u, t, n), l.elementType = rl, l.lanes = e, l;
      case Wl:
        return l = lt(19, u, t, n), l.elementType = Wl, l.lanes = e, l;
      default:
        if (typeof l == "object" && l !== null) switch (l.$$typeof) {
          case El:
            f = 10;
            break l;
          case wt:
            f = 9;
            break l;
          case ot:
            f = 11;
            break l;
          case r:
            f = 14;
            break l;
          case jl:
            f = 16, a = null;
            break l;
        }
        f = 29, u = Error(s(130, l === null ? "null" : typeof l, "")), a = null;
    }
    return t = lt(f, u, t, n), t.elementType = l, t.type = a, t.lanes = e, t;
  }
  function Du(l, t, u, a) {
    return l = lt(7, l, a, t), l.lanes = u, l;
  }
  function of(l, t, u) {
    return l = lt(6, l, null, t), l.lanes = u, l;
  }
  function n0(l) {
    var t = lt(18, null, null, 0);
    return t.stateNode = l, t;
  }
  function bf(l, t, u) {
    return t = lt(4, l.children !== null ? l.children : [], l.key, t), t.lanes = u, t.stateNode = {
      containerInfo: l.containerInfo,
      pendingChildren: null,
      implementation: l.implementation
    }, t;
  }
  var e0 = /* @__PURE__ */ new WeakMap();
  function it(l, t) {
    if (typeof l == "object" && l !== null) {
      var u = e0.get(l);
      return u !== void 0 ? u : (t = {
        value: l,
        source: t,
        stack: ai(t)
      }, e0.set(l, t), t);
    }
    return {
      value: l,
      source: t,
      stack: ai(t)
    };
  }
  var la = [], ta = 0, Zn = null, Qa = 0, yt = [], vt = 0, It = null, Ot = 1, Mt = "";
  function Bt(l, t) {
    la[ta++] = Qa, la[ta++] = Zn, Zn = l, Qa = t;
  }
  function f0(l, t, u) {
    yt[vt++] = Ot, yt[vt++] = Mt, yt[vt++] = It, It = l;
    var a = Ot;
    l = Mt;
    var n = 32 - Il(a) - 1;
    a &= ~(1 << n), u += 1;
    var e = 32 - Il(t) + n;
    if (30 < e) {
      var f = n - n % 5;
      e = (a & (1 << f) - 1).toString(32), a >>= f, n -= f, Ot = 1 << 32 - Il(t) + n | u << n | a, Mt = e + l;
    } else Ot = 1 << e | u << n | a, Mt = l;
  }
  function zf(l) {
    l.return !== null && (Bt(l, 1), f0(l, 1, 0));
  }
  function Tf(l) {
    for (; l === Zn; ) Zn = la[--ta], la[ta] = null, Qa = la[--ta], la[ta] = null;
    for (; l === It; ) It = yt[--vt], yt[vt] = null, Mt = yt[--vt], yt[vt] = null, Ot = yt[--vt], yt[vt] = null;
  }
  function c0(l, t) {
    yt[vt++] = Ot, yt[vt++] = Mt, yt[vt++] = It, Ot = t.id, Mt = t.overflow, It = l;
  }
  var Ul = null, cl = null, J = !1, Pt = null, mt = !1, Af = Error(s(519));
  function lu(l) {
    throw Za(it(Error(s(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML", "")), l)), Af;
  }
  function i0(l) {
    var t = l.stateNode, u = l.type, a = l.memoizedProps;
    switch (t[Dl] = l, t[Gl] = a, u) {
      case "dialog":
        V("cancel", t), V("close", t);
        break;
      case "iframe":
      case "object":
      case "embed":
        V("load", t);
        break;
      case "video":
      case "audio":
        for (u = 0; u < yn.length; u++) V(yn[u], t);
        break;
      case "source":
        V("error", t);
        break;
      case "img":
      case "image":
      case "link":
        V("error", t), V("load", t);
        break;
      case "details":
        V("toggle", t);
        break;
      case "input":
        V("invalid", t), Ai(t, a.value, a.defaultValue, a.checked, a.defaultChecked, a.type, a.name, !0);
        break;
      case "select":
        V("invalid", t);
        break;
      case "textarea":
        V("invalid", t), _i(t, a.value, a.defaultValue, a.children);
    }
    u = a.children, typeof u != "string" && typeof u != "number" && typeof u != "bigint" || t.textContent === "" + u || a.suppressHydrationWarning === !0 || _y(t.textContent, u) ? (a.popover != null && (V("beforetoggle", t), V("toggle", t)), a.onScroll != null && V("scroll", t), a.onScrollEnd != null && V("scrollend", t), a.onClick != null && (t.onclick = Ht), t = !0) : t = !1, t || lu(l, !0);
  }
  function y0(l) {
    for (Ul = l.return; Ul; ) switch (Ul.tag) {
      case 5:
      case 31:
      case 13:
        mt = !1;
        return;
      case 27:
      case 3:
        mt = !0;
        return;
      default:
        Ul = Ul.return;
    }
  }
  function ua(l) {
    if (l !== Ul) return !1;
    if (!J) return y0(l), J = !0, !1;
    var t = l.tag, u;
    if ((u = t !== 3 && t !== 27) && ((u = t === 5) && (u = l.type, u = !(u !== "form" && u !== "button") || Xc(l.type, l.memoizedProps)), u = !u), u && cl && lu(l), y0(l), t === 13) {
      if (l = l.memoizedState, l = l !== null ? l.dehydrated : null, !l) throw Error(s(317));
      cl = By(l);
    } else if (t === 31) {
      if (l = l.memoizedState, l = l !== null ? l.dehydrated : null, !l) throw Error(s(317));
      cl = By(l);
    } else t === 27 ? (t = cl, du(l.type) ? (l = Kc, Kc = null, cl = l) : cl = t) : cl = Ul ? St(l.stateNode.nextSibling) : null;
    return !0;
  }
  function Uu() {
    cl = Ul = null, J = !1;
  }
  function Ef() {
    var l = Pt;
    return l !== null && (Ll === null ? Ll = l : Ll.push.apply(Ll, l), Pt = null), l;
  }
  function Za(l) {
    Pt === null ? Pt = [l] : Pt.push(l);
  }
  var _f = v(null), Nu = null, Ct = null;
  function tu(l, t, u) {
    O(_f, t._currentValue), t._currentValue = u;
  }
  function Rt(l) {
    l._currentValue = _f.current, T(_f);
  }
  function Of(l, t, u) {
    for (; l !== null; ) {
      var a = l.alternate;
      if ((l.childLanes & t) !== t ? (l.childLanes |= t, a !== null && (a.childLanes |= t)) : a !== null && (a.childLanes & t) !== t && (a.childLanes |= t), l === u) break;
      l = l.return;
    }
  }
  function Mf(l, t, u, a) {
    var n = l.child;
    for (n !== null && (n.return = l); n !== null; ) {
      var e = n.dependencies;
      if (e !== null) {
        var f = n.child;
        e = e.firstContext;
        l: for (; e !== null; ) {
          var c = e;
          e = n;
          for (var i = 0; i < t.length; i++) if (c.context === t[i]) {
            e.lanes |= u, c = e.alternate, c !== null && (c.lanes |= u), Of(e.return, u, l), a || (f = null);
            break l;
          }
          e = c.next;
        }
      } else if (n.tag === 18) {
        if (f = n.return, f === null) throw Error(s(341));
        f.lanes |= u, e = f.alternate, e !== null && (e.lanes |= u), Of(f, u, l), f = null;
      } else f = n.child;
      if (f !== null) f.return = n;
      else for (f = n; f !== null; ) {
        if (f === l) {
          f = null;
          break;
        }
        if (n = f.sibling, n !== null) {
          n.return = f.return, f = n;
          break;
        }
        f = f.return;
      }
      n = f;
    }
  }
  function aa(l, t, u, a) {
    l = null;
    for (var n = t, e = !1; n !== null; ) {
      if (!e) {
        if ((n.flags & 524288) !== 0) e = !0;
        else if ((n.flags & 262144) !== 0) break;
      }
      if (n.tag === 10) {
        var f = n.alternate;
        if (f === null) throw Error(s(387));
        if (f = f.memoizedProps, f !== null) {
          var c = n.type;
          Pl(n.pendingProps.value, f.value) || (l !== null ? l.push(c) : l = [c]);
        }
      } else if (n === k.current) {
        if (f = n.alternate, f === null) throw Error(s(387));
        f.memoizedState.memoizedState !== n.memoizedState.memoizedState && (l !== null ? l.push(Sn) : l = [Sn]);
      }
      n = n.return;
    }
    l !== null && Mf(t, l, u, a), t.flags |= 262144;
  }
  function Vn(l) {
    for (l = l.firstContext; l !== null; ) {
      if (!Pl(l.context._currentValue, l.memoizedValue)) return !0;
      l = l.next;
    }
    return !1;
  }
  function Hu(l) {
    Nu = l, Ct = null, l = l.dependencies, l !== null && (l.firstContext = null);
  }
  function Nl(l) {
    return v0(Nu, l);
  }
  function Ln(l, t) {
    return Nu === null && Hu(l), v0(l, t);
  }
  function v0(l, t) {
    var u = t._currentValue;
    if (t = {
      context: t,
      memoizedValue: u,
      next: null
    }, Ct === null) {
      if (l === null) throw Error(s(308));
      Ct = t, l.dependencies = {
        lanes: 0,
        firstContext: t
      }, l.flags |= 524288;
    } else Ct = Ct.next = t;
    return u;
  }
  var Fv = typeof AbortController < "u" ? AbortController : function() {
    var l = [], t = this.signal = {
      aborted: !1,
      addEventListener: function(u, a) {
        l.push(a);
      }
    };
    this.abort = function() {
      t.aborted = !0, l.forEach(function(u) {
        return u();
      });
    };
  }, kv = R.unstable_scheduleCallback, Iv = R.unstable_NormalPriority, ol = {
    $$typeof: El,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function Df() {
    return {
      controller: new Fv(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function Va(l) {
    l.refCount--, l.refCount === 0 && kv(Iv, function() {
      l.controller.abort();
    });
  }
  var La = null, Uf = 0, na = 0, ea = null;
  function Pv(l, t) {
    if (La === null) {
      var u = La = [];
      Uf = 0, na = qc(), ea = {
        status: "pending",
        value: void 0,
        then: function(a) {
          u.push(a);
        }
      };
    }
    return Uf++, t.then(m0, m0), t;
  }
  function m0() {
    if (--Uf === 0 && La !== null) {
      ea !== null && (ea.status = "fulfilled");
      var l = La;
      La = null, na = 0, ea = null;
      for (var t = 0; t < l.length; t++) (0, l[t])();
    }
  }
  function lm(l, t) {
    var u = [], a = {
      status: "pending",
      value: null,
      reason: null,
      then: function(n) {
        u.push(n);
      }
    };
    return l.then(function() {
      a.status = "fulfilled", a.value = t;
      for (var n = 0; n < u.length; n++) (0, u[n])(t);
    }, function(n) {
      for (a.status = "rejected", a.reason = n, n = 0; n < u.length; n++) (0, u[n])(void 0);
    }), a;
  }
  var d0 = _.S;
  _.S = function(l, t) {
    r1 = Fl(), typeof t == "object" && t !== null && typeof t.then == "function" && Pv(l, t), d0 !== null && d0(l, t);
  };
  var qu = v(null);
  function Nf() {
    var l = qu.current;
    return l !== null ? l : nl.pooledCache;
  }
  function Kn(l, t) {
    t === null ? O(qu, qu.current) : O(qu, t.pool);
  }
  function h0() {
    var l = Nf();
    return l === null ? null : {
      parent: ol._currentValue,
      pool: l
    };
  }
  var fa = Error(s(460)), Hf = Error(s(474)), Jn = Error(s(542)), xn = { then: function() {
  } };
  function S0(l) {
    return l = l.status, l === "fulfilled" || l === "rejected";
  }
  function g0(l, t, u) {
    switch (u = l[u], u === void 0 ? l.push(t) : u !== t && (t.then(Ht, Ht), t = u), t.status) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw l = t.reason, o0(l), l;
      default:
        if (typeof t.status == "string") t.then(Ht, Ht);
        else {
          if (l = nl, l !== null && 100 < l.shellSuspendCounter) throw Error(s(482));
          l = t, l.status = "pending", l.then(function(a) {
            if (t.status === "pending") {
              var n = t;
              n.status = "fulfilled", n.value = a;
            }
          }, function(a) {
            if (t.status === "pending") {
              var n = t;
              n.status = "rejected", n.reason = a;
            }
          });
        }
        switch (t.status) {
          case "fulfilled":
            return t.value;
          case "rejected":
            throw l = t.reason, o0(l), l;
        }
        throw Bu = t, fa;
    }
  }
  function Yu(l) {
    try {
      var t = l._init;
      return t(l._payload);
    } catch (u) {
      throw u !== null && typeof u == "object" && typeof u.then == "function" ? (Bu = u, fa) : u;
    }
  }
  var Bu = null;
  function s0() {
    if (Bu === null) throw Error(s(459));
    var l = Bu;
    return Bu = null, l;
  }
  function o0(l) {
    if (l === fa || l === Jn) throw Error(s(483));
  }
  var ca = null, Ka = 0;
  function rn(l) {
    var t = Ka;
    return Ka += 1, ca === null && (ca = []), g0(ca, l, t);
  }
  function Ja(l, t) {
    t = t.props.ref, l.ref = t !== void 0 ? t : null;
  }
  function Wn(l, t) {
    throw t.$$typeof === st ? Error(s(525)) : (l = Object.prototype.toString.call(t), Error(s(31, l === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : l)));
  }
  function b0(l) {
    function t(m, y) {
      if (l) {
        var d = m.deletions;
        d === null ? (m.deletions = [y], m.flags |= 16) : d.push(y);
      }
    }
    function u(m, y) {
      if (!l) return null;
      for (; y !== null; ) t(m, y), y = y.sibling;
      return null;
    }
    function a(m) {
      for (var y = /* @__PURE__ */ new Map(); m !== null; ) m.key !== null ? y.set(m.key, m) : y.set(m.index, m), m = m.sibling;
      return y;
    }
    function n(m, y) {
      return m = Yt(m, y), m.index = 0, m.sibling = null, m;
    }
    function e(m, y, d) {
      return m.index = d, l ? (d = m.alternate, d !== null ? (d = d.index, d < y ? (m.flags |= 67108866, y) : d) : (m.flags |= 67108866, y)) : (m.flags |= 1048576, y);
    }
    function f(m) {
      return l && m.alternate === null && (m.flags |= 67108866), m;
    }
    function c(m, y, d, b) {
      return y === null || y.tag !== 6 ? (y = of(d, m.mode, b), y.return = m, y) : (y = n(y, d), y.return = m, y);
    }
    function i(m, y, d, b) {
      var q = d.type;
      return q === Jl ? o(m, y, d.props.children, b, d.key) : y !== null && (y.elementType === q || typeof q == "object" && q !== null && q.$$typeof === jl && Yu(q) === y.type) ? (y = n(y, d.props), Ja(y, d), y.return = m, y) : (y = Qn(d.type, d.key, d.props, null, m.mode, b), Ja(y, d), y.return = m, y);
    }
    function h(m, y, d, b) {
      return y === null || y.tag !== 4 || y.stateNode.containerInfo !== d.containerInfo || y.stateNode.implementation !== d.implementation ? (y = bf(d, m.mode, b), y.return = m, y) : (y = n(y, d.children || []), y.return = m, y);
    }
    function o(m, y, d, b, q) {
      return y === null || y.tag !== 7 ? (y = Du(d, m.mode, b, q), y.return = m, y) : (y = n(y, d), y.return = m, y);
    }
    function z(m, y, d) {
      if (typeof y == "string" && y !== "" || typeof y == "number" || typeof y == "bigint") return y = of("" + y, m.mode, d), y.return = m, y;
      if (typeof y == "object" && y !== null) {
        switch (y.$$typeof) {
          case Bl:
            return d = Qn(y.type, y.key, y.props, null, m.mode, d), Ja(d, y), d.return = m, d;
          case pl:
            return y = bf(y, m.mode, d), y.return = m, y;
          case jl:
            return y = Yu(y), z(m, y, d);
        }
        if (D(y) || _t(y)) return y = Du(y, m.mode, d, null), y.return = m, y;
        if (typeof y.then == "function") return z(m, rn(y), d);
        if (y.$$typeof === El) return z(m, Ln(m, y), d);
        Wn(m, y);
      }
      return null;
    }
    function S(m, y, d, b) {
      var q = y !== null ? y.key : null;
      if (typeof d == "string" && d !== "" || typeof d == "number" || typeof d == "bigint") return q !== null ? null : c(m, y, "" + d, b);
      if (typeof d == "object" && d !== null) {
        switch (d.$$typeof) {
          case Bl:
            return d.key === q ? i(m, y, d, b) : null;
          case pl:
            return d.key === q ? h(m, y, d, b) : null;
          case jl:
            return d = Yu(d), S(m, y, d, b);
        }
        if (D(d) || _t(d)) return q !== null ? null : o(m, y, d, b, null);
        if (typeof d.then == "function") return S(m, y, rn(d), b);
        if (d.$$typeof === El) return S(m, y, Ln(m, d), b);
        Wn(m, d);
      }
      return null;
    }
    function g(m, y, d, b, q) {
      if (typeof b == "string" && b !== "" || typeof b == "number" || typeof b == "bigint") return m = m.get(d) || null, c(y, m, "" + b, q);
      if (typeof b == "object" && b !== null) {
        switch (b.$$typeof) {
          case Bl:
            return m = m.get(b.key === null ? d : b.key) || null, i(y, m, b, q);
          case pl:
            return m = m.get(b.key === null ? d : b.key) || null, h(y, m, b, q);
          case jl:
            return b = Yu(b), g(m, y, d, b, q);
        }
        if (D(b) || _t(b)) return m = m.get(d) || null, o(y, m, b, q, null);
        if (typeof b.then == "function") return g(m, y, d, rn(b), q);
        if (b.$$typeof === El) return g(m, y, d, Ln(y, b), q);
        Wn(y, b);
      }
      return null;
    }
    function U(m, y, d, b) {
      for (var q = null, W = null, N = y, G = y = 0, K = null; N !== null && G < d.length; G++) {
        N.index > G ? (K = N, N = null) : K = N.sibling;
        var w = S(m, N, d[G], b);
        if (w === null) {
          N === null && (N = K);
          break;
        }
        l && N && w.alternate === null && t(m, N), y = e(w, y, G), W === null ? q = w : W.sibling = w, W = w, N = K;
      }
      if (G === d.length) return u(m, N), J && Bt(m, G), q;
      if (N === null) {
        for (; G < d.length; G++) N = z(m, d[G], b), N !== null && (y = e(N, y, G), W === null ? q = N : W.sibling = N, W = N);
        return J && Bt(m, G), q;
      }
      for (N = a(N); G < d.length; G++) K = g(N, m, G, d[G], b), K !== null && (l && K.alternate !== null && N.delete(K.key === null ? G : K.key), y = e(K, y, G), W === null ? q = K : W.sibling = K, W = K);
      return l && N.forEach(function(ou) {
        return t(m, ou);
      }), J && Bt(m, G), q;
    }
    function C(m, y, d, b) {
      if (d == null) throw Error(s(151));
      for (var q = null, W = null, N = y, G = y = 0, K = null, w = d.next(); N !== null && !w.done; G++, w = d.next()) {
        N.index > G ? (K = N, N = null) : K = N.sibling;
        var ou = S(m, N, w.value, b);
        if (ou === null) {
          N === null && (N = K);
          break;
        }
        l && N && ou.alternate === null && t(m, N), y = e(ou, y, G), W === null ? q = ou : W.sibling = ou, W = ou, N = K;
      }
      if (w.done) return u(m, N), J && Bt(m, G), q;
      if (N === null) {
        for (; !w.done; G++, w = d.next()) w = z(m, w.value, b), w !== null && (y = e(w, y, G), W === null ? q = w : W.sibling = w, W = w);
        return J && Bt(m, G), q;
      }
      for (N = a(N); !w.done; G++, w = d.next()) w = g(N, m, G, w.value, b), w !== null && (l && w.alternate !== null && N.delete(w.key === null ? G : w.key), y = e(w, y, G), W === null ? q = w : W.sibling = w, W = w);
      return l && N.forEach(function(gd) {
        return t(m, gd);
      }), J && Bt(m, G), q;
    }
    function al(m, y, d, b) {
      if (typeof d == "object" && d !== null && d.type === Jl && d.key === null && (d = d.props.children), typeof d == "object" && d !== null) {
        switch (d.$$typeof) {
          case Bl:
            l: {
              for (var q = d.key; y !== null; ) {
                if (y.key === q) {
                  if (q = d.type, q === Jl) {
                    if (y.tag === 7) {
                      u(m, y.sibling), b = n(y, d.props.children), b.return = m, m = b;
                      break l;
                    }
                  } else if (y.elementType === q || typeof q == "object" && q !== null && q.$$typeof === jl && Yu(q) === y.type) {
                    u(m, y.sibling), b = n(y, d.props), Ja(b, d), b.return = m, m = b;
                    break l;
                  }
                  u(m, y);
                  break;
                } else t(m, y);
                y = y.sibling;
              }
              d.type === Jl ? (b = Du(d.props.children, m.mode, b, d.key), b.return = m, m = b) : (b = Qn(d.type, d.key, d.props, null, m.mode, b), Ja(b, d), b.return = m, m = b);
            }
            return f(m);
          case pl:
            l: {
              for (q = d.key; y !== null; ) {
                if (y.key === q) if (y.tag === 4 && y.stateNode.containerInfo === d.containerInfo && y.stateNode.implementation === d.implementation) {
                  u(m, y.sibling), b = n(y, d.children || []), b.return = m, m = b;
                  break l;
                } else {
                  u(m, y);
                  break;
                }
                else t(m, y);
                y = y.sibling;
              }
              b = bf(d, m.mode, b), b.return = m, m = b;
            }
            return f(m);
          case jl:
            return d = Yu(d), al(m, y, d, b);
        }
        if (D(d)) return U(m, y, d, b);
        if (_t(d)) {
          if (q = _t(d), typeof q != "function") throw Error(s(150));
          return d = q.call(d), C(m, y, d, b);
        }
        if (typeof d.then == "function") return al(m, y, rn(d), b);
        if (d.$$typeof === El) return al(m, y, Ln(m, d), b);
        Wn(m, d);
      }
      return typeof d == "string" && d !== "" || typeof d == "number" || typeof d == "bigint" ? (d = "" + d, y !== null && y.tag === 6 ? (u(m, y.sibling), b = n(y, d), b.return = m, m = b) : (u(m, y), b = of(d, m.mode, b), b.return = m, m = b), f(m)) : u(m, y);
    }
    return function(m, y, d, b) {
      try {
        Ka = 0;
        var q = al(m, y, d, b);
        return ca = null, q;
      } catch (N) {
        if (N === fa || N === Jn) throw N;
        var W = lt(29, N, null, m.mode);
        return W.lanes = b, W.return = m, W;
      }
    };
  }
  var Cu = b0(!0), z0 = b0(!1), uu = !1;
  function qf(l) {
    l.updateQueue = {
      baseState: l.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: {
        pending: null,
        lanes: 0,
        hiddenCallbacks: null
      },
      callbacks: null
    };
  }
  function Yf(l, t) {
    l = l.updateQueue, t.updateQueue === l && (t.updateQueue = {
      baseState: l.baseState,
      firstBaseUpdate: l.firstBaseUpdate,
      lastBaseUpdate: l.lastBaseUpdate,
      shared: l.shared,
      callbacks: null
    });
  }
  function Ru(l) {
    return {
      lane: l,
      tag: 0,
      payload: null,
      callback: null,
      next: null
    };
  }
  function pu(l, t, u) {
    var a = l.updateQueue;
    if (a === null) return null;
    if (a = a.shared, (F & 2) !== 0) {
      var n = a.pending;
      return n === null ? t.next = t : (t.next = n.next, n.next = t), a.pending = t, t = Xn(l), u0(l, null, u), t;
    }
    return Gn(l, a, t, u), Xn(l);
  }
  function xa(l, t, u) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (u & 4194048) !== 0)) {
      var a = t.lanes;
      a &= l.pendingLanes, u |= a, t.lanes = u, yi(l, u);
    }
  }
  function Bf(l, t) {
    var u = l.updateQueue, a = l.alternate;
    if (a !== null && (a = a.updateQueue, u === a)) {
      var n = null, e = null;
      if (u = u.firstBaseUpdate, u !== null) {
        do {
          var f = {
            lane: u.lane,
            tag: u.tag,
            payload: u.payload,
            callback: null,
            next: null
          };
          e === null ? n = e = f : e = e.next = f, u = u.next;
        } while (u !== null);
        e === null ? n = e = t : e = e.next = t;
      } else n = e = t;
      u = {
        baseState: a.baseState,
        firstBaseUpdate: n,
        lastBaseUpdate: e,
        shared: a.shared,
        callbacks: a.callbacks
      }, l.updateQueue = u;
      return;
    }
    l = u.lastBaseUpdate, l === null ? u.firstBaseUpdate = t : l.next = t, u.lastBaseUpdate = t;
  }
  var Cf = !1;
  function ra() {
    if (Cf) {
      var l = ea;
      if (l !== null) throw l;
    }
  }
  function Wa(l, t, u, a) {
    Cf = !1;
    var n = l.updateQueue;
    uu = !1;
    var e = n.firstBaseUpdate, f = n.lastBaseUpdate, c = n.shared.pending;
    if (c !== null) {
      n.shared.pending = null;
      var i = c, h = i.next;
      i.next = null, f === null ? e = h : f.next = h, f = i;
      var o = l.alternate;
      o !== null && (o = o.updateQueue, c = o.lastBaseUpdate, c !== f && (c === null ? o.firstBaseUpdate = h : c.next = h, o.lastBaseUpdate = i));
    }
    if (e !== null) {
      var z = n.baseState;
      f = 0, o = h = i = null, c = e;
      do {
        var S = c.lane & -536870913, g = S !== c.lane;
        if (g ? (L & S) === S : (a & S) === S) {
          S !== 0 && S === na && (Cf = !0), o !== null && (o = o.next = {
            lane: 0,
            tag: c.tag,
            payload: c.payload,
            callback: null,
            next: null
          });
          l: {
            var U = l, C = c;
            S = t;
            var al = u;
            switch (C.tag) {
              case 1:
                if (U = C.payload, typeof U == "function") {
                  z = U.call(al, z, S);
                  break l;
                }
                z = U;
                break l;
              case 3:
                U.flags = U.flags & -65537 | 128;
              case 0:
                if (U = C.payload, S = typeof U == "function" ? U.call(al, z, S) : U, S == null) break l;
                z = B({}, z, S);
                break l;
              case 2:
                uu = !0;
            }
          }
          S = c.callback, S !== null && (l.flags |= 64, g && (l.flags |= 8192), g = n.callbacks, g === null ? n.callbacks = [S] : g.push(S));
        } else g = {
          lane: S,
          tag: c.tag,
          payload: c.payload,
          callback: c.callback,
          next: null
        }, o === null ? (h = o = g, i = z) : o = o.next = g, f |= S;
        if (c = c.next, c === null) {
          if (c = n.shared.pending, c === null) break;
          g = c, c = g.next, g.next = null, n.lastBaseUpdate = g, n.shared.pending = null;
        }
      } while (!0);
      o === null && (i = z), n.baseState = i, n.firstBaseUpdate = h, n.lastBaseUpdate = o, e === null && (n.shared.lanes = 0), cu |= f, l.lanes = f, l.memoizedState = z;
    }
  }
  function T0(l, t) {
    if (typeof l != "function") throw Error(s(191, l));
    l.call(t);
  }
  function A0(l, t) {
    var u = l.callbacks;
    if (u !== null) for (l.callbacks = null, l = 0; l < u.length; l++) T0(u[l], t);
  }
  var ia = v(null), wn = v(0);
  function E0(l, t) {
    l = Kt, O(wn, l), O(ia, t), Kt = l | t.baseLanes;
  }
  function Rf() {
    O(wn, Kt), O(ia, ia.current);
  }
  function pf() {
    Kt = wn.current, T(ia), T(wn);
  }
  var tt = v(null), dt = null;
  function au(l) {
    var t = l.alternate;
    O(Sl, Sl.current & 1), O(tt, l), dt === null && (t === null || ia.current !== null || t.memoizedState !== null) && (dt = l);
  }
  function jf(l) {
    O(Sl, Sl.current), O(tt, l), dt === null && (dt = l);
  }
  function _0(l) {
    l.tag === 22 ? (O(Sl, Sl.current), O(tt, l), dt === null && (dt = l)) : nu(l);
  }
  function nu() {
    O(Sl, Sl.current), O(tt, tt.current);
  }
  function ut(l) {
    T(tt), dt === l && (dt = null), T(Sl);
  }
  var Sl = v(0);
  function $n(l) {
    for (var t = l; t !== null; ) {
      if (t.tag === 13) {
        var u = t.memoizedState;
        if (u !== null && (u = u.dehydrated, u === null || Vc(u) || Lc(u))) return t;
      } else if (t.tag === 19 && (t.memoizedProps.revealOrder === "forwards" || t.memoizedProps.revealOrder === "backwards" || t.memoizedProps.revealOrder === "unstable_legacy-backwards" || t.memoizedProps.revealOrder === "together")) {
        if ((t.flags & 128) !== 0) return t;
      } else if (t.child !== null) {
        t.child.return = t, t = t.child;
        continue;
      }
      if (t === l) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === l) return null;
        t = t.return;
      }
      t.sibling.return = t.return, t = t.sibling;
    }
    return null;
  }
  var pt = 0, p = null, tl = null, bl = null, Fn = !1, ya = !1, ju = !1, kn = 0, wa = 0, va = null, tm = 0;
  function ml() {
    throw Error(s(321));
  }
  function Gf(l, t) {
    if (t === null) return !1;
    for (var u = 0; u < t.length && u < l.length; u++) if (!Pl(l[u], t[u])) return !1;
    return !0;
  }
  function Xf(l, t, u, a, n, e) {
    return pt = e, p = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, _.H = l === null || l.memoizedState === null ? f1 : Pf, ju = !1, e = u(a, n), ju = !1, ya && (e = M0(t, u, a, n)), O0(l), e;
  }
  function O0(l) {
    _.H = ka;
    var t = tl !== null && tl.next !== null;
    if (pt = 0, bl = tl = p = null, Fn = !1, wa = 0, va = null, t) throw Error(s(300));
    l === null || zl || (l = l.dependencies, l !== null && Vn(l) && (zl = !0));
  }
  function M0(l, t, u, a) {
    p = l;
    var n = 0;
    do {
      if (ya && (va = null), wa = 0, ya = !1, 25 <= n) throw Error(s(301));
      if (n += 1, bl = tl = null, l.updateQueue != null) {
        var e = l.updateQueue;
        e.lastEffect = null, e.events = null, e.stores = null, e.memoCache != null && (e.memoCache.index = 0);
      }
      _.H = c1, e = t(u, a);
    } while (ya);
    return e;
  }
  function um() {
    var l = _.H, t = l.useState()[0];
    return t = typeof t.then == "function" ? $a(t) : t, l = l.useState()[0], (tl !== null ? tl.memoizedState : null) !== l && (p.flags |= 1024), t;
  }
  function Qf() {
    var l = kn !== 0;
    return kn = 0, l;
  }
  function Zf(l, t, u) {
    t.updateQueue = l.updateQueue, t.flags &= -2053, l.lanes &= ~u;
  }
  function Vf(l) {
    if (Fn) {
      for (l = l.memoizedState; l !== null; ) {
        var t = l.queue;
        t !== null && (t.pending = null), l = l.next;
      }
      Fn = !1;
    }
    pt = 0, bl = tl = p = null, ya = !1, wa = kn = 0, va = null;
  }
  function Rl() {
    var l = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return bl === null ? p.memoizedState = bl = l : bl = bl.next = l, bl;
  }
  function gl() {
    if (tl === null) {
      var l = p.alternate;
      l = l !== null ? l.memoizedState : null;
    } else l = tl.next;
    var t = bl === null ? p.memoizedState : bl.next;
    if (t !== null) bl = t, tl = l;
    else {
      if (l === null)
        throw p.alternate === null ? Error(s(467)) : Error(s(310));
      tl = l, l = {
        memoizedState: tl.memoizedState,
        baseState: tl.baseState,
        baseQueue: tl.baseQueue,
        queue: tl.queue,
        next: null
      }, bl === null ? p.memoizedState = bl = l : bl = bl.next = l;
    }
    return bl;
  }
  function In() {
    return {
      lastEffect: null,
      events: null,
      stores: null,
      memoCache: null
    };
  }
  function $a(l) {
    var t = wa;
    return wa += 1, va === null && (va = []), l = g0(va, l, t), t = p, (bl === null ? t.memoizedState : bl.next) === null && (t = t.alternate, _.H = t === null || t.memoizedState === null ? f1 : Pf), l;
  }
  function Pn(l) {
    if (l !== null && typeof l == "object") {
      if (typeof l.then == "function") return $a(l);
      if (l.$$typeof === El) return Nl(l);
    }
    throw Error(s(438, String(l)));
  }
  function Lf(l) {
    var t = null, u = p.updateQueue;
    if (u !== null && (t = u.memoCache), t == null) {
      var a = p.alternate;
      a !== null && (a = a.updateQueue, a !== null && (a = a.memoCache, a != null && (t = {
        data: a.data.map(function(n) {
          return n.slice();
        }),
        index: 0
      })));
    }
    if (t ??= {
      data: [],
      index: 0
    }, u === null && (u = In(), p.updateQueue = u), u.memoCache = t, u = t.data[t.index], u === void 0) for (u = t.data[t.index] = Array(l), a = 0; a < l; a++) u[a] = bu;
    return t.index++, u;
  }
  function jt(l, t) {
    return typeof t == "function" ? t(l) : t;
  }
  function le(l) {
    return Kf(gl(), tl, l);
  }
  function Kf(l, t, u) {
    var a = l.queue;
    if (a === null) throw Error(s(311));
    a.lastRenderedReducer = u;
    var n = l.baseQueue, e = a.pending;
    if (e !== null) {
      if (n !== null) {
        var f = n.next;
        n.next = e.next, e.next = f;
      }
      t.baseQueue = n = e, a.pending = null;
    }
    if (e = l.baseState, n === null) l.memoizedState = e;
    else {
      t = n.next;
      var c = f = null, i = null, h = t, o = !1;
      do {
        var z = h.lane & -536870913;
        if (z !== h.lane ? (L & z) === z : (pt & z) === z) {
          var S = h.revertLane;
          if (S === 0) i !== null && (i = i.next = {
            lane: 0,
            revertLane: 0,
            gesture: null,
            action: h.action,
            hasEagerState: h.hasEagerState,
            eagerState: h.eagerState,
            next: null
          }), z === na && (o = !0);
          else if ((pt & S) === S) {
            h = h.next, S === na && (o = !0);
            continue;
          } else z = {
            lane: 0,
            revertLane: h.revertLane,
            gesture: null,
            action: h.action,
            hasEagerState: h.hasEagerState,
            eagerState: h.eagerState,
            next: null
          }, i === null ? (c = i = z, f = e) : i = i.next = z, p.lanes |= S, cu |= S;
          z = h.action, ju && u(e, z), e = h.hasEagerState ? h.eagerState : u(e, z);
        } else S = {
          lane: z,
          revertLane: h.revertLane,
          gesture: h.gesture,
          action: h.action,
          hasEagerState: h.hasEagerState,
          eagerState: h.eagerState,
          next: null
        }, i === null ? (c = i = S, f = e) : i = i.next = S, p.lanes |= z, cu |= z;
        h = h.next;
      } while (h !== null && h !== t);
      if (i === null ? f = e : i.next = c, !Pl(e, l.memoizedState) && (zl = !0, o && (u = ea, u !== null))) throw u;
      l.memoizedState = e, l.baseState = f, l.baseQueue = i, a.lastRenderedState = e;
    }
    return n === null && (a.lanes = 0), [l.memoizedState, a.dispatch];
  }
  function Jf(l) {
    var t = gl(), u = t.queue;
    if (u === null) throw Error(s(311));
    u.lastRenderedReducer = l;
    var a = u.dispatch, n = u.pending, e = t.memoizedState;
    if (n !== null) {
      u.pending = null;
      var f = n = n.next;
      do
        e = l(e, f.action), f = f.next;
      while (f !== n);
      Pl(e, t.memoizedState) || (zl = !0), t.memoizedState = e, t.baseQueue === null && (t.baseState = e), u.lastRenderedState = e;
    }
    return [e, a];
  }
  function D0(l, t, u) {
    var a = p, n = gl(), e = J;
    if (e) {
      if (u === void 0) throw Error(s(407));
      u = u();
    } else u = t();
    var f = !Pl((tl || n).memoizedState, u);
    if (f && (n.memoizedState = u, zl = !0), n = n.queue, Wf(H0.bind(null, a, n, l), [l]), n.getSnapshot !== t || f || bl !== null && bl.memoizedState.tag & 1) {
      if (a.flags |= 2048, ma(9, { destroy: void 0 }, N0.bind(null, a, n, u, t), null), nl === null) throw Error(s(349));
      e || (pt & 127) !== 0 || U0(a, t, u);
    }
    return u;
  }
  function U0(l, t, u) {
    l.flags |= 16384, l = {
      getSnapshot: t,
      value: u
    }, t = p.updateQueue, t === null ? (t = In(), p.updateQueue = t, t.stores = [l]) : (u = t.stores, u === null ? t.stores = [l] : u.push(l));
  }
  function N0(l, t, u, a) {
    t.value = u, t.getSnapshot = a, q0(t) && Y0(l);
  }
  function H0(l, t, u) {
    return u(function() {
      q0(t) && Y0(l);
    });
  }
  function q0(l) {
    var t = l.getSnapshot;
    l = l.value;
    try {
      var u = t();
      return !Pl(l, u);
    } catch {
      return !0;
    }
  }
  function Y0(l) {
    var t = Mu(l, 2);
    t !== null && Kl(t, l, 2);
  }
  function xf(l) {
    var t = Rl();
    if (typeof l == "function") {
      var u = l;
      if (l = u(), ju) {
        $t(!0);
        try {
          u();
        } finally {
          $t(!1);
        }
      }
    }
    return t.memoizedState = t.baseState = l, t.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: jt,
      lastRenderedState: l
    }, t;
  }
  function B0(l, t, u, a) {
    return l.baseState = u, Kf(l, tl, typeof a == "function" ? a : jt);
  }
  function am(l, t, u, a, n) {
    if (ae(l)) throw Error(s(485));
    if (l = t.action, l !== null) {
      var e = {
        payload: n,
        action: l,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function(f) {
          e.listeners.push(f);
        }
      };
      _.T !== null ? u(!0) : e.isTransition = !1, a(e), u = t.pending, u === null ? (e.next = t.pending = e, C0(t, e)) : (e.next = u.next, t.pending = u.next = e);
    }
  }
  function C0(l, t) {
    var u = t.action, a = t.payload, n = l.state;
    if (t.isTransition) {
      var e = _.T, f = {};
      _.T = f;
      try {
        var c = u(n, a), i = _.S;
        i !== null && i(f, c), R0(l, t, c);
      } catch (h) {
        rf(l, t, h);
      } finally {
        e !== null && f.types !== null && (e.types = f.types), _.T = e;
      }
    } else try {
      e = u(n, a), R0(l, t, e);
    } catch (h) {
      rf(l, t, h);
    }
  }
  function R0(l, t, u) {
    u !== null && typeof u == "object" && typeof u.then == "function" ? u.then(function(a) {
      p0(l, t, a);
    }, function(a) {
      return rf(l, t, a);
    }) : p0(l, t, u);
  }
  function p0(l, t, u) {
    t.status = "fulfilled", t.value = u, j0(t), l.state = u, t = l.pending, t !== null && (u = t.next, u === t ? l.pending = null : (u = u.next, t.next = u, C0(l, u)));
  }
  function rf(l, t, u) {
    var a = l.pending;
    if (l.pending = null, a !== null) {
      a = a.next;
      do
        t.status = "rejected", t.reason = u, j0(t), t = t.next;
      while (t !== a);
    }
    l.action = null;
  }
  function j0(l) {
    l = l.listeners;
    for (var t = 0; t < l.length; t++) (0, l[t])();
  }
  function G0(l, t) {
    return t;
  }
  function X0(l, t) {
    if (J) {
      var u = nl.formState;
      if (u !== null) {
        l: {
          var a = p;
          if (J) {
            if (cl) {
              t: {
                for (var n = cl, e = mt; n.nodeType !== 8; ) {
                  if (!e) {
                    n = null;
                    break t;
                  }
                  if (n = St(n.nextSibling), n === null) {
                    n = null;
                    break t;
                  }
                }
                e = n.data, n = e === "F!" || e === "F" ? n : null;
              }
              if (n) {
                cl = St(n.nextSibling), a = n.data === "F!";
                break l;
              }
            }
            lu(a);
          }
          a = !1;
        }
        a && (t = u[0]);
      }
    }
    return u = Rl(), u.memoizedState = u.baseState = t, a = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: G0,
      lastRenderedState: t
    }, u.queue = a, u = a1.bind(null, p, a), a.dispatch = u, a = xf(!1), e = If.bind(null, p, !1, a.queue), a = Rl(), n = {
      state: t,
      dispatch: null,
      action: l,
      pending: null
    }, a.queue = n, u = am.bind(null, p, n, e, u), n.dispatch = u, a.memoizedState = l, [
      t,
      u,
      !1
    ];
  }
  function Q0(l) {
    return Z0(gl(), tl, l);
  }
  function Z0(l, t, u) {
    if (t = Kf(l, t, G0)[0], l = le(jt)[0], typeof t == "object" && t !== null && typeof t.then == "function") try {
      var a = $a(t);
    } catch (f) {
      throw f === fa ? Jn : f;
    }
    else a = t;
    t = gl();
    var n = t.queue, e = n.dispatch;
    return u !== t.memoizedState && (p.flags |= 2048, ma(9, { destroy: void 0 }, nm.bind(null, n, u), null)), [
      a,
      e,
      l
    ];
  }
  function nm(l, t) {
    l.action = t;
  }
  function V0(l) {
    var t = gl(), u = tl;
    if (u !== null) return Z0(t, u, l);
    gl(), t = t.memoizedState, u = gl();
    var a = u.queue.dispatch;
    return u.memoizedState = l, [
      t,
      a,
      !1
    ];
  }
  function ma(l, t, u, a) {
    return l = {
      tag: l,
      create: u,
      deps: a,
      inst: t,
      next: null
    }, t = p.updateQueue, t === null && (t = In(), p.updateQueue = t), u = t.lastEffect, u === null ? t.lastEffect = l.next = l : (a = u.next, u.next = l, l.next = a, t.lastEffect = l), l;
  }
  function L0() {
    return gl().memoizedState;
  }
  function te(l, t, u, a) {
    var n = Rl();
    p.flags |= l, n.memoizedState = ma(1 | t, { destroy: void 0 }, u, a === void 0 ? null : a);
  }
  function ue(l, t, u, a) {
    var n = gl();
    a = a === void 0 ? null : a;
    var e = n.memoizedState.inst;
    tl !== null && a !== null && Gf(a, tl.memoizedState.deps) ? n.memoizedState = ma(t, e, u, a) : (p.flags |= l, n.memoizedState = ma(1 | t, e, u, a));
  }
  function K0(l, t) {
    te(8390656, 8, l, t);
  }
  function Wf(l, t) {
    ue(2048, 8, l, t);
  }
  function em(l) {
    p.flags |= 4;
    var t = p.updateQueue;
    if (t === null) t = In(), p.updateQueue = t, t.events = [l];
    else {
      var u = t.events;
      u === null ? t.events = [l] : u.push(l);
    }
  }
  function J0(l) {
    var t = gl().memoizedState;
    return em({
      ref: t,
      nextImpl: l
    }), function() {
      if ((F & 2) !== 0) throw Error(s(440));
      return t.impl.apply(void 0, arguments);
    };
  }
  function x0(l, t) {
    return ue(4, 2, l, t);
  }
  function r0(l, t) {
    return ue(4, 4, l, t);
  }
  function W0(l, t) {
    if (typeof t == "function") {
      l = l();
      var u = t(l);
      return function() {
        typeof u == "function" ? u() : t(null);
      };
    }
    if (t != null) return l = l(), t.current = l, function() {
      t.current = null;
    };
  }
  function w0(l, t, u) {
    u = u != null ? u.concat([l]) : null, ue(4, 4, W0.bind(null, t, l), u);
  }
  function wf() {
  }
  function $0(l, t) {
    var u = gl();
    t = t === void 0 ? null : t;
    var a = u.memoizedState;
    return t !== null && Gf(t, a[1]) ? a[0] : (u.memoizedState = [l, t], l);
  }
  function F0(l, t) {
    var u = gl();
    t = t === void 0 ? null : t;
    var a = u.memoizedState;
    if (t !== null && Gf(t, a[1])) return a[0];
    if (a = l(), ju) {
      $t(!0);
      try {
        l();
      } finally {
        $t(!1);
      }
    }
    return u.memoizedState = [a, t], a;
  }
  function $f(l, t, u) {
    return u === void 0 || (pt & 1073741824) !== 0 && (L & 261930) === 0 ? l.memoizedState = t : (l.memoizedState = u, l = w1(), p.lanes |= l, cu |= l, u);
  }
  function k0(l, t, u, a) {
    return Pl(u, t) ? u : ia.current !== null ? (l = $f(l, u, a), Pl(l, t) || (zl = !0), l) : (pt & 42) === 0 || (pt & 1073741824) !== 0 && (L & 261930) === 0 ? (zl = !0, l.memoizedState = u) : (l = w1(), p.lanes |= l, cu |= l, t);
  }
  function I0(l, t, u, a, n) {
    var e = M.p;
    M.p = e !== 0 && 8 > e ? e : 8;
    var f = _.T, c = {};
    _.T = c, If(l, !1, t, u);
    try {
      var i = n(), h = _.S;
      h !== null && h(c, i), i !== null && typeof i == "object" && typeof i.then == "function" ? Fa(l, t, lm(i, a), ht(l)) : Fa(l, t, a, ht(l));
    } catch (o) {
      Fa(l, t, {
        then: function() {
        },
        status: "rejected",
        reason: o
      }, ht());
    } finally {
      M.p = e, f !== null && c.types !== null && (f.types = c.types), _.T = f;
    }
  }
  function fm() {
  }
  function Ff(l, t, u, a) {
    if (l.tag !== 5) throw Error(s(476));
    var n = P0(l).queue;
    I0(l, n, t, $, u === null ? fm : function() {
      return l1(l), u(a);
    });
  }
  function P0(l) {
    var t = l.memoizedState;
    if (t !== null) return t;
    t = {
      memoizedState: $,
      baseState: $,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: jt,
        lastRenderedState: $
      },
      next: null
    };
    var u = {};
    return t.next = {
      memoizedState: u,
      baseState: u,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: jt,
        lastRenderedState: u
      },
      next: null
    }, l.memoizedState = t, l = l.alternate, l !== null && (l.memoizedState = t), t;
  }
  function l1(l) {
    var t = P0(l);
    t.next === null && (t = l.alternate.memoizedState), Fa(l, t.next.queue, {}, ht());
  }
  function kf() {
    return Nl(Sn);
  }
  function t1() {
    return gl().memoizedState;
  }
  function u1() {
    return gl().memoizedState;
  }
  function cm(l) {
    for (var t = l.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var u = ht();
          l = Ru(u);
          var a = pu(t, l, u);
          a !== null && (Kl(a, t, u), xa(a, t, u)), t = { cache: Df() }, l.payload = t;
          return;
      }
      t = t.return;
    }
  }
  function im(l, t, u) {
    var a = ht();
    u = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: u,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, ae(l) ? n1(t, u) : (u = gf(l, t, u, a), u !== null && (Kl(u, l, a), e1(u, t, a)));
  }
  function a1(l, t, u) {
    Fa(l, t, u, ht());
  }
  function Fa(l, t, u, a) {
    var n = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: u,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (ae(l)) n1(t, n);
    else {
      var e = l.alternate;
      if (l.lanes === 0 && (e === null || e.lanes === 0) && (e = t.lastRenderedReducer, e !== null)) try {
        var f = t.lastRenderedState, c = e(f, u);
        if (n.hasEagerState = !0, n.eagerState = c, Pl(c, f)) return Gn(l, t, n, 0), nl === null && jn(), !1;
      } catch {
      }
      if (u = gf(l, t, n, a), u !== null) return Kl(u, l, a), e1(u, t, a), !0;
    }
    return !1;
  }
  function If(l, t, u, a) {
    if (a = {
      lane: 2,
      revertLane: qc(),
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, ae(l)) {
      if (t) throw Error(s(479));
    } else t = gf(l, u, a, 2), t !== null && Kl(t, l, 2);
  }
  function ae(l) {
    var t = l.alternate;
    return l === p || t !== null && t === p;
  }
  function n1(l, t) {
    ya = Fn = !0;
    var u = l.pending;
    u === null ? t.next = t : (t.next = u.next, u.next = t), l.pending = t;
  }
  function e1(l, t, u) {
    if ((u & 4194048) !== 0) {
      var a = t.lanes;
      a &= l.pendingLanes, u |= a, t.lanes = u, yi(l, u);
    }
  }
  var ka = {
    readContext: Nl,
    use: Pn,
    useCallback: ml,
    useContext: ml,
    useEffect: ml,
    useImperativeHandle: ml,
    useLayoutEffect: ml,
    useInsertionEffect: ml,
    useMemo: ml,
    useReducer: ml,
    useRef: ml,
    useState: ml,
    useDebugValue: ml,
    useDeferredValue: ml,
    useTransition: ml,
    useSyncExternalStore: ml,
    useId: ml,
    useHostTransitionStatus: ml,
    useFormState: ml,
    useActionState: ml,
    useOptimistic: ml,
    useMemoCache: ml,
    useCacheRefresh: ml
  };
  ka.useEffectEvent = ml;
  var f1 = {
    readContext: Nl,
    use: Pn,
    useCallback: function(l, t) {
      return Rl().memoizedState = [l, t === void 0 ? null : t], l;
    },
    useContext: Nl,
    useEffect: K0,
    useImperativeHandle: function(l, t, u) {
      u = u != null ? u.concat([l]) : null, te(4194308, 4, W0.bind(null, t, l), u);
    },
    useLayoutEffect: function(l, t) {
      return te(4194308, 4, l, t);
    },
    useInsertionEffect: function(l, t) {
      te(4, 2, l, t);
    },
    useMemo: function(l, t) {
      var u = Rl();
      t = t === void 0 ? null : t;
      var a = l();
      if (ju) {
        $t(!0);
        try {
          l();
        } finally {
          $t(!1);
        }
      }
      return u.memoizedState = [a, t], a;
    },
    useReducer: function(l, t, u) {
      var a = Rl();
      if (u !== void 0) {
        var n = u(t);
        if (ju) {
          $t(!0);
          try {
            u(t);
          } finally {
            $t(!1);
          }
        }
      } else n = t;
      return a.memoizedState = a.baseState = n, l = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: l,
        lastRenderedState: n
      }, a.queue = l, l = l.dispatch = im.bind(null, p, l), [a.memoizedState, l];
    },
    useRef: function(l) {
      var t = Rl();
      return l = { current: l }, t.memoizedState = l;
    },
    useState: function(l) {
      l = xf(l);
      var t = l.queue, u = a1.bind(null, p, t);
      return t.dispatch = u, [l.memoizedState, u];
    },
    useDebugValue: wf,
    useDeferredValue: function(l, t) {
      return $f(Rl(), l, t);
    },
    useTransition: function() {
      var l = xf(!1);
      return l = I0.bind(null, p, l.queue, !0, !1), Rl().memoizedState = l, [!1, l];
    },
    useSyncExternalStore: function(l, t, u) {
      var a = p, n = Rl();
      if (J) {
        if (u === void 0) throw Error(s(407));
        u = u();
      } else {
        if (u = t(), nl === null) throw Error(s(349));
        (L & 127) !== 0 || U0(a, t, u);
      }
      n.memoizedState = u;
      var e = {
        value: u,
        getSnapshot: t
      };
      return n.queue = e, K0(H0.bind(null, a, e, l), [l]), a.flags |= 2048, ma(9, { destroy: void 0 }, N0.bind(null, a, e, u, t), null), u;
    },
    useId: function() {
      var l = Rl(), t = nl.identifierPrefix;
      if (J) {
        var u = Mt, a = Ot;
        u = (a & ~(1 << 32 - Il(a) - 1)).toString(32) + u, t = "_" + t + "R_" + u, u = kn++, 0 < u && (t += "H" + u.toString(32)), t += "_";
      } else u = tm++, t = "_" + t + "r_" + u.toString(32) + "_";
      return l.memoizedState = t;
    },
    useHostTransitionStatus: kf,
    useFormState: X0,
    useActionState: X0,
    useOptimistic: function(l) {
      var t = Rl();
      t.memoizedState = t.baseState = l;
      var u = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return t.queue = u, t = If.bind(null, p, !0, u), u.dispatch = t, [l, t];
    },
    useMemoCache: Lf,
    useCacheRefresh: function() {
      return Rl().memoizedState = cm.bind(null, p);
    },
    useEffectEvent: function(l) {
      var t = Rl(), u = { impl: l };
      return t.memoizedState = u, function() {
        if ((F & 2) !== 0) throw Error(s(440));
        return u.impl.apply(void 0, arguments);
      };
    }
  }, Pf = {
    readContext: Nl,
    use: Pn,
    useCallback: $0,
    useContext: Nl,
    useEffect: Wf,
    useImperativeHandle: w0,
    useInsertionEffect: x0,
    useLayoutEffect: r0,
    useMemo: F0,
    useReducer: le,
    useRef: L0,
    useState: function() {
      return le(jt);
    },
    useDebugValue: wf,
    useDeferredValue: function(l, t) {
      return k0(gl(), tl.memoizedState, l, t);
    },
    useTransition: function() {
      var l = le(jt)[0], t = gl().memoizedState;
      return [typeof l == "boolean" ? l : $a(l), t];
    },
    useSyncExternalStore: D0,
    useId: t1,
    useHostTransitionStatus: kf,
    useFormState: Q0,
    useActionState: Q0,
    useOptimistic: function(l, t) {
      return B0(gl(), tl, l, t);
    },
    useMemoCache: Lf,
    useCacheRefresh: u1
  };
  Pf.useEffectEvent = J0;
  var c1 = {
    readContext: Nl,
    use: Pn,
    useCallback: $0,
    useContext: Nl,
    useEffect: Wf,
    useImperativeHandle: w0,
    useInsertionEffect: x0,
    useLayoutEffect: r0,
    useMemo: F0,
    useReducer: Jf,
    useRef: L0,
    useState: function() {
      return Jf(jt);
    },
    useDebugValue: wf,
    useDeferredValue: function(l, t) {
      var u = gl();
      return tl === null ? $f(u, l, t) : k0(u, tl.memoizedState, l, t);
    },
    useTransition: function() {
      var l = Jf(jt)[0], t = gl().memoizedState;
      return [typeof l == "boolean" ? l : $a(l), t];
    },
    useSyncExternalStore: D0,
    useId: t1,
    useHostTransitionStatus: kf,
    useFormState: V0,
    useActionState: V0,
    useOptimistic: function(l, t) {
      var u = gl();
      return tl !== null ? B0(u, tl, l, t) : (u.baseState = l, [l, u.queue.dispatch]);
    },
    useMemoCache: Lf,
    useCacheRefresh: u1
  };
  c1.useEffectEvent = J0;
  function lc(l, t, u, a) {
    t = l.memoizedState, u = u(a, t), u = u == null ? t : B({}, t, u), l.memoizedState = u, l.lanes === 0 && (l.updateQueue.baseState = u);
  }
  var tc = {
    enqueueSetState: function(l, t, u) {
      l = l._reactInternals;
      var a = ht(), n = Ru(a);
      n.payload = t, u != null && (n.callback = u), t = pu(l, n, a), t !== null && (Kl(t, l, a), xa(t, l, a));
    },
    enqueueReplaceState: function(l, t, u) {
      l = l._reactInternals;
      var a = ht(), n = Ru(a);
      n.tag = 1, n.payload = t, u != null && (n.callback = u), t = pu(l, n, a), t !== null && (Kl(t, l, a), xa(t, l, a));
    },
    enqueueForceUpdate: function(l, t) {
      l = l._reactInternals;
      var u = ht(), a = Ru(u);
      a.tag = 2, t != null && (a.callback = t), t = pu(l, a, u), t !== null && (Kl(t, l, u), xa(t, l, u));
    }
  };
  function i1(l, t, u, a, n, e, f) {
    return l = l.stateNode, typeof l.shouldComponentUpdate == "function" ? l.shouldComponentUpdate(a, e, f) : t.prototype && t.prototype.isPureReactComponent ? !Ga(u, a) || !Ga(n, e) : !0;
  }
  function y1(l, t, u, a) {
    l = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(u, a), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(u, a), t.state !== l && tc.enqueueReplaceState(t, t.state, null);
  }
  function Gu(l, t) {
    var u = t;
    if ("ref" in t) {
      u = {};
      for (var a in t) a !== "ref" && (u[a] = t[a]);
    }
    if (l = l.defaultProps) {
      u === t && (u = B({}, u));
      for (var n in l) u[n] === void 0 && (u[n] = l[n]);
    }
    return u;
  }
  function ym(l) {
    pn(l);
  }
  function vm(l) {
    console.error(l);
  }
  function mm(l) {
    pn(l);
  }
  function ne(l, t) {
    try {
      var u = l.onUncaughtError;
      u(t.value, { componentStack: t.stack });
    } catch (a) {
      setTimeout(function() {
        throw a;
      });
    }
  }
  function v1(l, t, u) {
    try {
      var a = l.onCaughtError;
      a(u.value, {
        componentStack: u.stack,
        errorBoundary: t.tag === 1 ? t.stateNode : null
      });
    } catch (n) {
      setTimeout(function() {
        throw n;
      });
    }
  }
  function uc(l, t, u) {
    return u = Ru(u), u.tag = 3, u.payload = { element: null }, u.callback = function() {
      ne(l, t);
    }, u;
  }
  function m1(l) {
    return l = Ru(l), l.tag = 3, l;
  }
  function d1(l, t, u, a) {
    var n = u.type.getDerivedStateFromError;
    if (typeof n == "function") {
      var e = a.value;
      l.payload = function() {
        return n(e);
      }, l.callback = function() {
        v1(t, u, a);
      };
    }
    var f = u.stateNode;
    f !== null && typeof f.componentDidCatch == "function" && (l.callback = function() {
      v1(t, u, a), typeof n != "function" && (iu === null ? iu = /* @__PURE__ */ new Set([this]) : iu.add(this));
      var c = a.stack;
      this.componentDidCatch(a.value, { componentStack: c !== null ? c : "" });
    });
  }
  function dm(l, t, u, a, n) {
    if (u.flags |= 32768, a !== null && typeof a == "object" && typeof a.then == "function") {
      if (t = u.alternate, t !== null && aa(t, u, n, !0), u = tt.current, u !== null) {
        switch (u.tag) {
          case 31:
          case 13:
            return dt === null ? se() : u.alternate === null && dl === 0 && (dl = 3), u.flags &= -257, u.flags |= 65536, u.lanes = n, a === xn ? u.flags |= 16384 : (t = u.updateQueue, t === null ? u.updateQueue = /* @__PURE__ */ new Set([a]) : t.add(a), Uc(l, a, n)), !1;
          case 22:
            return u.flags |= 65536, a === xn ? u.flags |= 16384 : (t = u.updateQueue, t === null ? (t = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([a])
            }, u.updateQueue = t) : (u = t.retryQueue, u === null ? t.retryQueue = /* @__PURE__ */ new Set([a]) : u.add(a)), Uc(l, a, n)), !1;
        }
        throw Error(s(435, u.tag));
      }
      return Uc(l, a, n), se(), !1;
    }
    if (J) return t = tt.current, t !== null ? ((t.flags & 65536) === 0 && (t.flags |= 256), t.flags |= 65536, t.lanes = n, a !== Af && (l = Error(s(422), { cause: a }), Za(it(l, u)))) : (a !== Af && (t = Error(s(423), { cause: a }), Za(it(t, u))), l = l.current.alternate, l.flags |= 65536, n &= -n, l.lanes |= n, a = it(a, u), n = uc(l.stateNode, a, n), Bf(l, n), dl !== 4 && (dl = 2)), !1;
    var e = Error(s(520), { cause: a });
    if (e = it(e, u), en === null ? en = [e] : en.push(e), dl !== 4 && (dl = 2), t === null) return !0;
    a = it(a, u), u = t;
    do {
      switch (u.tag) {
        case 3:
          return u.flags |= 65536, l = n & -n, u.lanes |= l, l = uc(u.stateNode, a, l), Bf(u, l), !1;
        case 1:
          if (t = u.type, e = u.stateNode, (u.flags & 128) === 0 && (typeof t.getDerivedStateFromError == "function" || e !== null && typeof e.componentDidCatch == "function" && (iu === null || !iu.has(e)))) return u.flags |= 65536, n &= -n, u.lanes |= n, n = m1(n), d1(n, l, u, a), Bf(u, n), !1;
      }
      u = u.return;
    } while (u !== null);
    return !1;
  }
  var ac = Error(s(461)), zl = !1;
  function Hl(l, t, u, a) {
    t.child = l === null ? z0(t, null, u, a) : Cu(t, l.child, u, a);
  }
  function h1(l, t, u, a, n) {
    u = u.render;
    var e = t.ref;
    if ("ref" in a) {
      var f = {};
      for (var c in a) c !== "ref" && (f[c] = a[c]);
    } else f = a;
    return Hu(t), a = Xf(l, t, u, f, e, n), c = Qf(), l !== null && !zl ? (Zf(l, t, n), Gt(l, t, n)) : (J && c && zf(t), t.flags |= 1, Hl(l, t, a, n), t.child);
  }
  function S1(l, t, u, a, n) {
    if (l === null) {
      var e = u.type;
      return typeof e == "function" && !sf(e) && e.defaultProps === void 0 && u.compare === null ? (t.tag = 15, t.type = e, g1(l, t, e, a, n)) : (l = Qn(u.type, null, a, t, t.mode, n), l.ref = t.ref, l.return = t, t.child = l);
    }
    if (e = l.child, !mc(l, n)) {
      var f = e.memoizedProps;
      if (u = u.compare, u = u !== null ? u : Ga, u(f, a) && l.ref === t.ref) return Gt(l, t, n);
    }
    return t.flags |= 1, l = Yt(e, a), l.ref = t.ref, l.return = t, t.child = l;
  }
  function g1(l, t, u, a, n) {
    if (l !== null) {
      var e = l.memoizedProps;
      if (Ga(e, a) && l.ref === t.ref) if (zl = !1, t.pendingProps = a = e, mc(l, n)) (l.flags & 131072) !== 0 && (zl = !0);
      else return t.lanes = l.lanes, Gt(l, t, n);
    }
    return nc(l, t, u, a, n);
  }
  function s1(l, t, u, a) {
    var n = a.children, e = l !== null ? l.memoizedState : null;
    if (l === null && t.stateNode === null && (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), a.mode === "hidden") {
      if ((t.flags & 128) !== 0) {
        if (e = e !== null ? e.baseLanes | u : u, l !== null) {
          for (a = t.child = l.child, n = 0; a !== null; ) n = n | a.lanes | a.childLanes, a = a.sibling;
          a = n & ~e;
        } else a = 0, t.child = null;
        return o1(l, t, e, u, a);
      }
      if ((u & 536870912) !== 0) t.memoizedState = {
        baseLanes: 0,
        cachePool: null
      }, l !== null && Kn(t, e !== null ? e.cachePool : null), e !== null ? E0(t, e) : Rf(), _0(t);
      else return a = t.lanes = 536870912, o1(l, t, e !== null ? e.baseLanes | u : u, u, a);
    } else e !== null ? (Kn(t, e.cachePool), E0(t, e), nu(t), t.memoizedState = null) : (l !== null && Kn(t, null), Rf(), nu(t));
    return Hl(l, t, n, u), t.child;
  }
  function Ia(l, t) {
    return l !== null && l.tag === 22 || t.stateNode !== null || (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), t.sibling;
  }
  function o1(l, t, u, a, n) {
    var e = Nf();
    return e = e === null ? null : {
      parent: ol._currentValue,
      pool: e
    }, t.memoizedState = {
      baseLanes: u,
      cachePool: e
    }, l !== null && Kn(t, null), Rf(), _0(t), l !== null && aa(l, t, a, !0), t.childLanes = n, null;
  }
  function ee(l, t) {
    return t = ce({
      mode: t.mode,
      children: t.children
    }, l.mode), t.ref = l.ref, l.child = t, t.return = l, t;
  }
  function b1(l, t, u) {
    return Cu(t, l.child, null, u), l = ee(t, t.pendingProps), l.flags |= 2, ut(t), t.memoizedState = null, l;
  }
  function hm(l, t, u) {
    var a = t.pendingProps, n = (t.flags & 128) !== 0;
    if (t.flags &= -129, l === null) {
      if (J) {
        if (a.mode === "hidden") return l = ee(t, a), t.lanes = 536870912, Ia(null, l);
        if (jf(t), (l = cl) ? (l = Yy(l, mt), l = l !== null && l.data === "&" ? l : null, l !== null && (t.memoizedState = {
          dehydrated: l,
          treeContext: It !== null ? {
            id: Ot,
            overflow: Mt
          } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, u = n0(l), u.return = t, t.child = u, Ul = t, cl = null)) : l = null, l === null) throw lu(t);
        return t.lanes = 536870912, null;
      }
      return ee(t, a);
    }
    var e = l.memoizedState;
    if (e !== null) {
      var f = e.dehydrated;
      if (jf(t), n) if (t.flags & 256) t.flags &= -257, t = b1(l, t, u);
      else if (t.memoizedState !== null) t.child = l.child, t.flags |= 128, t = null;
      else throw Error(s(558));
      else if (zl || aa(l, t, u, !1), n = (u & l.childLanes) !== 0, zl || n) {
        if (a = nl, a !== null && (f = vi(a, u), f !== 0 && f !== e.retryLane)) throw e.retryLane = f, Mu(l, f), Kl(a, l, f), ac;
        se(), t = b1(l, t, u);
      } else l = e.treeContext, cl = St(f.nextSibling), Ul = t, J = !0, Pt = null, mt = !1, l !== null && c0(t, l), t = ee(t, a), t.flags |= 4096;
      return t;
    }
    return l = Yt(l.child, {
      mode: a.mode,
      children: a.children
    }), l.ref = t.ref, t.child = l, l.return = t, l;
  }
  function fe(l, t) {
    var u = t.ref;
    if (u === null) l !== null && l.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof u != "function" && typeof u != "object") throw Error(s(284));
      (l === null || l.ref !== u) && (t.flags |= 4194816);
    }
  }
  function nc(l, t, u, a, n) {
    return Hu(t), u = Xf(l, t, u, a, void 0, n), a = Qf(), l !== null && !zl ? (Zf(l, t, n), Gt(l, t, n)) : (J && a && zf(t), t.flags |= 1, Hl(l, t, u, n), t.child);
  }
  function z1(l, t, u, a, n, e) {
    return Hu(t), t.updateQueue = null, u = M0(t, a, u, n), O0(l), a = Qf(), l !== null && !zl ? (Zf(l, t, e), Gt(l, t, e)) : (J && a && zf(t), t.flags |= 1, Hl(l, t, u, e), t.child);
  }
  function T1(l, t, u, a, n) {
    if (Hu(t), t.stateNode === null) {
      var e = Pu, f = u.contextType;
      typeof f == "object" && f !== null && (e = Nl(f)), e = new u(a, e), t.memoizedState = e.state !== null && e.state !== void 0 ? e.state : null, e.updater = tc, t.stateNode = e, e._reactInternals = t, e = t.stateNode, e.props = a, e.state = t.memoizedState, e.refs = {}, qf(t), f = u.contextType, e.context = typeof f == "object" && f !== null ? Nl(f) : Pu, e.state = t.memoizedState, f = u.getDerivedStateFromProps, typeof f == "function" && (lc(t, u, f, a), e.state = t.memoizedState), typeof u.getDerivedStateFromProps == "function" || typeof e.getSnapshotBeforeUpdate == "function" || typeof e.UNSAFE_componentWillMount != "function" && typeof e.componentWillMount != "function" || (f = e.state, typeof e.componentWillMount == "function" && e.componentWillMount(), typeof e.UNSAFE_componentWillMount == "function" && e.UNSAFE_componentWillMount(), f !== e.state && tc.enqueueReplaceState(e, e.state, null), Wa(t, a, e, n), ra(), e.state = t.memoizedState), typeof e.componentDidMount == "function" && (t.flags |= 4194308), a = !0;
    } else if (l === null) {
      e = t.stateNode;
      var c = t.memoizedProps, i = Gu(u, c);
      e.props = i;
      var h = e.context, o = u.contextType;
      f = Pu, typeof o == "object" && o !== null && (f = Nl(o));
      var z = u.getDerivedStateFromProps;
      o = typeof z == "function" || typeof e.getSnapshotBeforeUpdate == "function", c = t.pendingProps !== c, o || typeof e.UNSAFE_componentWillReceiveProps != "function" && typeof e.componentWillReceiveProps != "function" || (c || h !== f) && y1(t, e, a, f), uu = !1;
      var S = t.memoizedState;
      e.state = S, Wa(t, a, e, n), ra(), h = t.memoizedState, c || S !== h || uu ? (typeof z == "function" && (lc(t, u, z, a), h = t.memoizedState), (i = uu || i1(t, u, i, a, S, h, f)) ? (o || typeof e.UNSAFE_componentWillMount != "function" && typeof e.componentWillMount != "function" || (typeof e.componentWillMount == "function" && e.componentWillMount(), typeof e.UNSAFE_componentWillMount == "function" && e.UNSAFE_componentWillMount()), typeof e.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof e.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = a, t.memoizedState = h), e.props = a, e.state = h, e.context = f, a = i) : (typeof e.componentDidMount == "function" && (t.flags |= 4194308), a = !1);
    } else {
      e = t.stateNode, Yf(l, t), f = t.memoizedProps, o = Gu(u, f), e.props = o, z = t.pendingProps, S = e.context, h = u.contextType, i = Pu, typeof h == "object" && h !== null && (i = Nl(h)), c = u.getDerivedStateFromProps, (h = typeof c == "function" || typeof e.getSnapshotBeforeUpdate == "function") || typeof e.UNSAFE_componentWillReceiveProps != "function" && typeof e.componentWillReceiveProps != "function" || (f !== z || S !== i) && y1(t, e, a, i), uu = !1, S = t.memoizedState, e.state = S, Wa(t, a, e, n), ra();
      var g = t.memoizedState;
      f !== z || S !== g || uu || l !== null && l.dependencies !== null && Vn(l.dependencies) ? (typeof c == "function" && (lc(t, u, c, a), g = t.memoizedState), (o = uu || i1(t, u, o, a, S, g, i) || l !== null && l.dependencies !== null && Vn(l.dependencies)) ? (h || typeof e.UNSAFE_componentWillUpdate != "function" && typeof e.componentWillUpdate != "function" || (typeof e.componentWillUpdate == "function" && e.componentWillUpdate(a, g, i), typeof e.UNSAFE_componentWillUpdate == "function" && e.UNSAFE_componentWillUpdate(a, g, i)), typeof e.componentDidUpdate == "function" && (t.flags |= 4), typeof e.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof e.componentDidUpdate != "function" || f === l.memoizedProps && S === l.memoizedState || (t.flags |= 4), typeof e.getSnapshotBeforeUpdate != "function" || f === l.memoizedProps && S === l.memoizedState || (t.flags |= 1024), t.memoizedProps = a, t.memoizedState = g), e.props = a, e.state = g, e.context = i, a = o) : (typeof e.componentDidUpdate != "function" || f === l.memoizedProps && S === l.memoizedState || (t.flags |= 4), typeof e.getSnapshotBeforeUpdate != "function" || f === l.memoizedProps && S === l.memoizedState || (t.flags |= 1024), a = !1);
    }
    return e = a, fe(l, t), a = (t.flags & 128) !== 0, e || a ? (e = t.stateNode, u = a && typeof u.getDerivedStateFromError != "function" ? null : e.render(), t.flags |= 1, l !== null && a ? (t.child = Cu(t, l.child, null, n), t.child = Cu(t, null, u, n)) : Hl(l, t, u, n), t.memoizedState = e.state, l = t.child) : l = Gt(l, t, n), l;
  }
  function A1(l, t, u, a) {
    return Uu(), t.flags |= 256, Hl(l, t, u, a), t.child;
  }
  var ec = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function fc(l) {
    return {
      baseLanes: l,
      cachePool: h0()
    };
  }
  function cc(l, t, u) {
    return l = l !== null ? l.childLanes & ~u : 0, t && (l |= nt), l;
  }
  function E1(l, t, u) {
    var a = t.pendingProps, n = !1, e = (t.flags & 128) !== 0, f;
    if ((f = e) || (f = l !== null && l.memoizedState === null ? !1 : (Sl.current & 2) !== 0), f && (n = !0, t.flags &= -129), f = (t.flags & 32) !== 0, t.flags &= -33, l === null) {
      if (J) {
        if (n ? au(t) : nu(t), (l = cl) ? (l = Yy(l, mt), l = l !== null && l.data !== "&" ? l : null, l !== null && (t.memoizedState = {
          dehydrated: l,
          treeContext: It !== null ? {
            id: Ot,
            overflow: Mt
          } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, u = n0(l), u.return = t, t.child = u, Ul = t, cl = null)) : l = null, l === null) throw lu(t);
        return Lc(l) ? t.lanes = 32 : t.lanes = 536870912, null;
      }
      var c = a.children;
      return a = a.fallback, n ? (nu(t), n = t.mode, c = ce({
        mode: "hidden",
        children: c
      }, n), a = Du(a, n, u, null), c.return = t, a.return = t, c.sibling = a, t.child = c, a = t.child, a.memoizedState = fc(u), a.childLanes = cc(l, f, u), t.memoizedState = ec, Ia(null, a)) : (au(t), ic(t, c));
    }
    var i = l.memoizedState;
    if (i !== null && (c = i.dehydrated, c !== null)) {
      if (e) t.flags & 256 ? (au(t), t.flags &= -257, t = yc(l, t, u)) : t.memoizedState !== null ? (nu(t), t.child = l.child, t.flags |= 128, t = null) : (nu(t), c = a.fallback, n = t.mode, a = ce({
        mode: "visible",
        children: a.children
      }, n), c = Du(c, n, u, null), c.flags |= 2, a.return = t, c.return = t, a.sibling = c, t.child = a, Cu(t, l.child, null, u), a = t.child, a.memoizedState = fc(u), a.childLanes = cc(l, f, u), t.memoizedState = ec, t = Ia(null, a));
      else if (au(t), Lc(c)) {
        if (f = c.nextSibling && c.nextSibling.dataset, f) var h = f.dgst;
        f = h, a = Error(s(419)), a.stack = "", a.digest = f, Za({
          value: a,
          source: null,
          stack: null
        }), t = yc(l, t, u);
      } else if (zl || aa(l, t, u, !1), f = (u & l.childLanes) !== 0, zl || f) {
        if (f = nl, f !== null && (a = vi(f, u), a !== 0 && a !== i.retryLane)) throw i.retryLane = a, Mu(l, a), Kl(f, l, a), ac;
        Vc(c) || se(), t = yc(l, t, u);
      } else Vc(c) ? (t.flags |= 192, t.child = l.child, t = null) : (l = i.treeContext, cl = St(c.nextSibling), Ul = t, J = !0, Pt = null, mt = !1, l !== null && c0(t, l), t = ic(t, a.children), t.flags |= 4096);
      return t;
    }
    return n ? (nu(t), c = a.fallback, n = t.mode, i = l.child, h = i.sibling, a = Yt(i, {
      mode: "hidden",
      children: a.children
    }), a.subtreeFlags = i.subtreeFlags & 65011712, h !== null ? c = Yt(h, c) : (c = Du(c, n, u, null), c.flags |= 2), c.return = t, a.return = t, a.sibling = c, t.child = a, Ia(null, a), a = t.child, c = l.child.memoizedState, c === null ? c = fc(u) : (n = c.cachePool, n !== null ? (i = ol._currentValue, n = n.parent !== i ? {
      parent: i,
      pool: i
    } : n) : n = h0(), c = {
      baseLanes: c.baseLanes | u,
      cachePool: n
    }), a.memoizedState = c, a.childLanes = cc(l, f, u), t.memoizedState = ec, Ia(l.child, a)) : (au(t), u = l.child, l = u.sibling, u = Yt(u, {
      mode: "visible",
      children: a.children
    }), u.return = t, u.sibling = null, l !== null && (f = t.deletions, f === null ? (t.deletions = [l], t.flags |= 16) : f.push(l)), t.child = u, t.memoizedState = null, u);
  }
  function ic(l, t) {
    return t = ce({
      mode: "visible",
      children: t
    }, l.mode), t.return = l, l.child = t;
  }
  function ce(l, t) {
    return l = lt(22, l, null, t), l.lanes = 0, l;
  }
  function yc(l, t, u) {
    return Cu(t, l.child, null, u), l = ic(t, t.pendingProps.children), l.flags |= 2, t.memoizedState = null, l;
  }
  function _1(l, t, u) {
    l.lanes |= t;
    var a = l.alternate;
    a !== null && (a.lanes |= t), Of(l.return, t, u);
  }
  function vc(l, t, u, a, n, e) {
    var f = l.memoizedState;
    f === null ? l.memoizedState = {
      isBackwards: t,
      rendering: null,
      renderingStartTime: 0,
      last: a,
      tail: u,
      tailMode: n,
      treeForkCount: e
    } : (f.isBackwards = t, f.rendering = null, f.renderingStartTime = 0, f.last = a, f.tail = u, f.tailMode = n, f.treeForkCount = e);
  }
  function O1(l, t, u) {
    var a = t.pendingProps, n = a.revealOrder, e = a.tail;
    a = a.children;
    var f = Sl.current, c = (f & 2) !== 0;
    if (c ? (f = f & 1 | 2, t.flags |= 128) : f &= 1, O(Sl, f), Hl(l, t, a, u), a = J ? Qa : 0, !c && l !== null && (l.flags & 128) !== 0) l: for (l = t.child; l !== null; ) {
      if (l.tag === 13) l.memoizedState !== null && _1(l, u, t);
      else if (l.tag === 19) _1(l, u, t);
      else if (l.child !== null) {
        l.child.return = l, l = l.child;
        continue;
      }
      if (l === t) break l;
      for (; l.sibling === null; ) {
        if (l.return === null || l.return === t) break l;
        l = l.return;
      }
      l.sibling.return = l.return, l = l.sibling;
    }
    switch (n) {
      case "forwards":
        for (u = t.child, n = null; u !== null; ) l = u.alternate, l !== null && $n(l) === null && (n = u), u = u.sibling;
        u = n, u === null ? (n = t.child, t.child = null) : (n = u.sibling, u.sibling = null), vc(t, !1, n, u, e, a);
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        for (u = null, n = t.child, t.child = null; n !== null; ) {
          if (l = n.alternate, l !== null && $n(l) === null) {
            t.child = n;
            break;
          }
          l = n.sibling, n.sibling = u, u = n, n = l;
        }
        vc(t, !0, u, null, e, a);
        break;
      case "together":
        vc(t, !1, null, null, void 0, a);
        break;
      default:
        t.memoizedState = null;
    }
    return t.child;
  }
  function Gt(l, t, u) {
    if (l !== null && (t.dependencies = l.dependencies), cu |= t.lanes, (u & t.childLanes) === 0) if (l !== null) {
      if (aa(l, t, u, !1), (u & t.childLanes) === 0) return null;
    } else return null;
    if (l !== null && t.child !== l.child) throw Error(s(153));
    if (t.child !== null) {
      for (l = t.child, u = Yt(l, l.pendingProps), t.child = u, u.return = t; l.sibling !== null; ) l = l.sibling, u = u.sibling = Yt(l, l.pendingProps), u.return = t;
      u.sibling = null;
    }
    return t.child;
  }
  function mc(l, t) {
    return (l.lanes & t) !== 0 ? !0 : (l = l.dependencies, !!(l !== null && Vn(l)));
  }
  function Sm(l, t, u) {
    switch (t.tag) {
      case 3:
        Cl(t, t.stateNode.containerInfo), tu(t, ol, l.memoizedState.cache), Uu();
        break;
      case 27:
      case 5:
        Oa(t);
        break;
      case 4:
        Cl(t, t.stateNode.containerInfo);
        break;
      case 10:
        tu(t, t.type, t.memoizedProps.value);
        break;
      case 31:
        if (t.memoizedState !== null) return t.flags |= 128, jf(t), null;
        break;
      case 13:
        var a = t.memoizedState;
        if (a !== null)
          return a.dehydrated !== null ? (au(t), t.flags |= 128, null) : (u & t.child.childLanes) !== 0 ? E1(l, t, u) : (au(t), l = Gt(l, t, u), l !== null ? l.sibling : null);
        au(t);
        break;
      case 19:
        var n = (l.flags & 128) !== 0;
        if (a = (u & t.childLanes) !== 0, a || (aa(l, t, u, !1), a = (u & t.childLanes) !== 0), n) {
          if (a) return O1(l, t, u);
          t.flags |= 128;
        }
        if (n = t.memoizedState, n !== null && (n.rendering = null, n.tail = null, n.lastEffect = null), O(Sl, Sl.current), a) break;
        return null;
      case 22:
        return t.lanes = 0, s1(l, t, u, t.pendingProps);
      case 24:
        tu(t, ol, l.memoizedState.cache);
    }
    return Gt(l, t, u);
  }
  function M1(l, t, u) {
    if (l !== null) if (l.memoizedProps !== t.pendingProps) zl = !0;
    else {
      if (!mc(l, u) && (t.flags & 128) === 0) return zl = !1, Sm(l, t, u);
      zl = (l.flags & 131072) !== 0;
    }
    else zl = !1, J && (t.flags & 1048576) !== 0 && f0(t, Qa, t.index);
    switch (t.lanes = 0, t.tag) {
      case 16:
        l: {
          var a = t.pendingProps;
          if (l = Yu(t.elementType), t.type = l, typeof l == "function") sf(l) ? (a = Gu(l, a), t.tag = 1, t = T1(null, t, l, a, u)) : (t.tag = 0, t = nc(null, t, l, a, u));
          else {
            if (l != null) {
              var n = l.$$typeof;
              if (n === ot) {
                t.tag = 11, t = h1(null, t, l, a, u);
                break l;
              } else if (n === r) {
                t.tag = 14, t = S1(null, t, l, a, u);
                break l;
              }
            }
            throw t = bt(l) || l, Error(s(306, t, ""));
          }
        }
        return t;
      case 0:
        return nc(l, t, t.type, t.pendingProps, u);
      case 1:
        return a = t.type, n = Gu(a, t.pendingProps), T1(l, t, a, n, u);
      case 3:
        l: {
          if (Cl(t, t.stateNode.containerInfo), l === null) throw Error(s(387));
          a = t.pendingProps;
          var e = t.memoizedState;
          n = e.element, Yf(l, t), Wa(t, a, null, u);
          var f = t.memoizedState;
          if (a = f.cache, tu(t, ol, a), a !== e.cache && Mf(t, [ol], u, !0), ra(), a = f.element, e.isDehydrated) if (e = {
            element: a,
            isDehydrated: !1,
            cache: f.cache
          }, t.updateQueue.baseState = e, t.memoizedState = e, t.flags & 256) {
            t = A1(l, t, a, u);
            break l;
          } else if (a !== n) {
            n = it(Error(s(424)), t), Za(n), t = A1(l, t, a, u);
            break l;
          } else
            for (l = t.stateNode.containerInfo, l.nodeType === 9 ? l = l.body : l = l.nodeName === "HTML" ? l.ownerDocument.body : l, cl = St(l.firstChild), Ul = t, J = !0, Pt = null, mt = !0, u = z0(t, null, a, u), t.child = u; u; ) u.flags = u.flags & -3 | 4096, u = u.sibling;
          else {
            if (Uu(), a === n) {
              t = Gt(l, t, u);
              break l;
            }
            Hl(l, t, a, u);
          }
          t = t.child;
        }
        return t;
      case 26:
        return fe(l, t), l === null ? (u = Gy(t.type, null, t.pendingProps, null)) ? t.memoizedState = u : J || (u = t.type, l = t.pendingProps, a = _e(Q.current).createElement(u), a[Dl] = t, a[Gl] = l, ql(a, u, l), _l(a), t.stateNode = a) : t.memoizedState = Gy(t.type, l.memoizedProps, t.pendingProps, l.memoizedState), null;
      case 27:
        return Oa(t), l === null && J && (a = t.stateNode = Ry(t.type, t.pendingProps, Q.current), Ul = t, mt = !0, n = cl, du(t.type) ? (Kc = n, cl = St(a.firstChild)) : cl = n), Hl(l, t, t.pendingProps.children, u), fe(l, t), l === null && (t.flags |= 4194304), t.child;
      case 5:
        return l === null && J && ((n = a = cl) && (a = Lm(a, t.type, t.pendingProps, mt), a !== null ? (t.stateNode = a, Ul = t, cl = St(a.firstChild), mt = !1, n = !0) : n = !1), n || lu(t)), Oa(t), n = t.type, e = t.pendingProps, f = l !== null ? l.memoizedProps : null, a = e.children, Xc(n, e) ? a = null : f !== null && Xc(n, f) && (t.flags |= 32), t.memoizedState !== null && (n = Xf(l, t, um, null, null, u), Sn._currentValue = n), fe(l, t), Hl(l, t, a, u), t.child;
      case 6:
        return l === null && J && ((l = u = cl) && (u = Km(u, t.pendingProps, mt), u !== null ? (t.stateNode = u, Ul = t, cl = null, l = !0) : l = !1), l || lu(t)), null;
      case 13:
        return E1(l, t, u);
      case 4:
        return Cl(t, t.stateNode.containerInfo), a = t.pendingProps, l === null ? t.child = Cu(t, null, a, u) : Hl(l, t, a, u), t.child;
      case 11:
        return h1(l, t, t.type, t.pendingProps, u);
      case 7:
        return Hl(l, t, t.pendingProps, u), t.child;
      case 8:
        return Hl(l, t, t.pendingProps.children, u), t.child;
      case 12:
        return Hl(l, t, t.pendingProps.children, u), t.child;
      case 10:
        return a = t.pendingProps, tu(t, t.type, a.value), Hl(l, t, a.children, u), t.child;
      case 9:
        return n = t.type._context, a = t.pendingProps.children, Hu(t), n = Nl(n), a = a(n), t.flags |= 1, Hl(l, t, a, u), t.child;
      case 14:
        return S1(l, t, t.type, t.pendingProps, u);
      case 15:
        return g1(l, t, t.type, t.pendingProps, u);
      case 19:
        return O1(l, t, u);
      case 31:
        return hm(l, t, u);
      case 22:
        return s1(l, t, u, t.pendingProps);
      case 24:
        return Hu(t), a = Nl(ol), l === null ? (n = Nf(), n === null && (n = nl, e = Df(), n.pooledCache = e, e.refCount++, e !== null && (n.pooledCacheLanes |= u), n = e), t.memoizedState = {
          parent: a,
          cache: n
        }, qf(t), tu(t, ol, n)) : ((l.lanes & u) !== 0 && (Yf(l, t), Wa(t, null, null, u), ra()), n = l.memoizedState, e = t.memoizedState, n.parent !== a ? (n = {
          parent: a,
          cache: a
        }, t.memoizedState = n, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = n), tu(t, ol, a)) : (a = e.cache, tu(t, ol, a), a !== n.cache && Mf(t, [ol], u, !0))), Hl(l, t, t.pendingProps.children, u), t.child;
      case 29:
        throw t.pendingProps;
    }
    throw Error(s(156, t.tag));
  }
  function Xt(l) {
    l.flags |= 4;
  }
  function dc(l, t, u, a, n) {
    if ((t = (l.mode & 32) !== 0) && (t = !1), t) {
      if (l.flags |= 16777216, (n & 335544128) === n) if (l.stateNode.complete) l.flags |= 8192;
      else if (I1()) l.flags |= 8192;
      else throw Bu = xn, Hf;
    } else l.flags &= -16777217;
  }
  function D1(l, t) {
    if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0) l.flags &= -16777217;
    else if (l.flags |= 16777216, !Ly(t)) if (I1()) l.flags |= 8192;
    else throw Bu = xn, Hf;
  }
  function ie(l, t) {
    t !== null && (l.flags |= 4), l.flags & 16384 && (t = l.tag !== 22 ? ci() : 536870912, l.lanes |= t, ga |= t);
  }
  function Pa(l, t) {
    if (!J) switch (l.tailMode) {
      case "hidden":
        t = l.tail;
        for (var u = null; t !== null; ) t.alternate !== null && (u = t), t = t.sibling;
        u === null ? l.tail = null : u.sibling = null;
        break;
      case "collapsed":
        u = l.tail;
        for (var a = null; u !== null; ) u.alternate !== null && (a = u), u = u.sibling;
        a === null ? t || l.tail === null ? l.tail = null : l.tail.sibling = null : a.sibling = null;
    }
  }
  function il(l) {
    var t = l.alternate !== null && l.alternate.child === l.child, u = 0, a = 0;
    if (t) for (var n = l.child; n !== null; ) u |= n.lanes | n.childLanes, a |= n.subtreeFlags & 65011712, a |= n.flags & 65011712, n.return = l, n = n.sibling;
    else for (n = l.child; n !== null; ) u |= n.lanes | n.childLanes, a |= n.subtreeFlags, a |= n.flags, n.return = l, n = n.sibling;
    return l.subtreeFlags |= a, l.childLanes = u, t;
  }
  function gm(l, t, u) {
    var a = t.pendingProps;
    switch (Tf(t), t.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return il(t), null;
      case 1:
        return il(t), null;
      case 3:
        return u = t.stateNode, a = null, l !== null && (a = l.memoizedState.cache), t.memoizedState.cache !== a && (t.flags |= 2048), Rt(ol), hl(), u.pendingContext && (u.context = u.pendingContext, u.pendingContext = null), (l === null || l.child === null) && (ua(t) ? Xt(t) : l === null || l.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, Ef())), il(t), null;
      case 26:
        var n = t.type, e = t.memoizedState;
        return l === null ? (Xt(t), e !== null ? (il(t), D1(t, e)) : (il(t), dc(t, n, null, a, u))) : e ? e !== l.memoizedState ? (Xt(t), il(t), D1(t, e)) : (il(t), t.flags &= -16777217) : (l = l.memoizedProps, l !== a && Xt(t), il(t), dc(t, n, l, a, u)), null;
      case 27:
        if (bn(t), u = Q.current, n = t.type, l !== null && t.stateNode != null) l.memoizedProps !== a && Xt(t);
        else {
          if (!a) {
            if (t.stateNode === null) throw Error(s(166));
            return il(t), null;
          }
          l = H.current, ua(t) ? i0(t, l) : (l = Ry(n, a, u), t.stateNode = l, Xt(t));
        }
        return il(t), null;
      case 5:
        if (bn(t), n = t.type, l !== null && t.stateNode != null) l.memoizedProps !== a && Xt(t);
        else {
          if (!a) {
            if (t.stateNode === null) throw Error(s(166));
            return il(t), null;
          }
          if (e = H.current, ua(t)) i0(t, e);
          else {
            var f = _e(Q.current);
            switch (e) {
              case 1:
                e = f.createElementNS("http://www.w3.org/2000/svg", n);
                break;
              case 2:
                e = f.createElementNS("http://www.w3.org/1998/Math/MathML", n);
                break;
              default:
                switch (n) {
                  case "svg":
                    e = f.createElementNS("http://www.w3.org/2000/svg", n);
                    break;
                  case "math":
                    e = f.createElementNS("http://www.w3.org/1998/Math/MathML", n);
                    break;
                  case "script":
                    e = f.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild);
                    break;
                  case "select":
                    e = typeof a.is == "string" ? f.createElement("select", { is: a.is }) : f.createElement("select"), a.multiple ? e.multiple = !0 : a.size && (e.size = a.size);
                    break;
                  default:
                    e = typeof a.is == "string" ? f.createElement(n, { is: a.is }) : f.createElement(n);
                }
            }
            e[Dl] = t, e[Gl] = a;
            l: for (f = t.child; f !== null; ) {
              if (f.tag === 5 || f.tag === 6) e.appendChild(f.stateNode);
              else if (f.tag !== 4 && f.tag !== 27 && f.child !== null) {
                f.child.return = f, f = f.child;
                continue;
              }
              if (f === t) break l;
              for (; f.sibling === null; ) {
                if (f.return === null || f.return === t) break l;
                f = f.return;
              }
              f.sibling.return = f.return, f = f.sibling;
            }
            t.stateNode = e;
            l: switch (ql(e, n, a), n) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                a = !!a.autoFocus;
                break l;
              case "img":
                a = !0;
                break l;
              default:
                a = !1;
            }
            a && Xt(t);
          }
        }
        return il(t), dc(t, t.type, l === null ? null : l.memoizedProps, t.pendingProps, u), null;
      case 6:
        if (l && t.stateNode != null) l.memoizedProps !== a && Xt(t);
        else {
          if (typeof a != "string" && t.stateNode === null) throw Error(s(166));
          if (l = Q.current, ua(t)) {
            if (l = t.stateNode, u = t.memoizedProps, a = null, n = Ul, n !== null) switch (n.tag) {
              case 27:
              case 5:
                a = n.memoizedProps;
            }
            l[Dl] = t, l = !!(l.nodeValue === u || a !== null && a.suppressHydrationWarning === !0 || _y(l.nodeValue, u)), l || lu(t, !0);
          } else l = _e(l).createTextNode(a), l[Dl] = t, t.stateNode = l;
        }
        return il(t), null;
      case 31:
        if (u = t.memoizedState, l === null || l.memoizedState !== null) {
          if (a = ua(t), u !== null) {
            if (l === null) {
              if (!a) throw Error(s(318));
              if (l = t.memoizedState, l = l !== null ? l.dehydrated : null, !l) throw Error(s(557));
              l[Dl] = t;
            } else Uu(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            il(t), l = !1;
          } else u = Ef(), l !== null && l.memoizedState !== null && (l.memoizedState.hydrationErrors = u), l = !0;
          if (!l)
            return t.flags & 256 ? (ut(t), t) : (ut(t), null);
          if ((t.flags & 128) !== 0) throw Error(s(558));
        }
        return il(t), null;
      case 13:
        if (a = t.memoizedState, l === null || l.memoizedState !== null && l.memoizedState.dehydrated !== null) {
          if (n = ua(t), a !== null && a.dehydrated !== null) {
            if (l === null) {
              if (!n) throw Error(s(318));
              if (n = t.memoizedState, n = n !== null ? n.dehydrated : null, !n) throw Error(s(317));
              n[Dl] = t;
            } else Uu(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            il(t), n = !1;
          } else n = Ef(), l !== null && l.memoizedState !== null && (l.memoizedState.hydrationErrors = n), n = !0;
          if (!n)
            return t.flags & 256 ? (ut(t), t) : (ut(t), null);
        }
        return ut(t), (t.flags & 128) !== 0 ? (t.lanes = u, t) : (u = a !== null, l = l !== null && l.memoizedState !== null, u && (a = t.child, n = null, a.alternate !== null && a.alternate.memoizedState !== null && a.alternate.memoizedState.cachePool !== null && (n = a.alternate.memoizedState.cachePool.pool), e = null, a.memoizedState !== null && a.memoizedState.cachePool !== null && (e = a.memoizedState.cachePool.pool), e !== n && (a.flags |= 2048)), u !== l && u && (t.child.flags |= 8192), ie(t, t.updateQueue), il(t), null);
      case 4:
        return hl(), l === null && zy(t.stateNode.containerInfo), il(t), null;
      case 10:
        return Rt(t.type), il(t), null;
      case 19:
        if (T(Sl), a = t.memoizedState, a === null) return il(t), null;
        if (n = (t.flags & 128) !== 0, e = a.rendering, e === null) if (n) Pa(a, !1);
        else {
          if (dl !== 0 || l !== null && (l.flags & 128) !== 0) for (l = t.child; l !== null; ) {
            if (e = $n(l), e !== null) {
              for (t.flags |= 128, Pa(a, !1), l = e.updateQueue, t.updateQueue = l, ie(t, l), t.subtreeFlags = 0, l = u, u = t.child; u !== null; ) a0(u, l), u = u.sibling;
              return O(Sl, Sl.current & 1 | 2), J && Bt(t, a.treeForkCount), t.child;
            }
            l = l.sibling;
          }
          a.tail !== null && Fl() > he && (t.flags |= 128, n = !0, Pa(a, !1), t.lanes = 4194304);
        }
        else {
          if (!n) if (l = $n(e), l !== null) {
            if (t.flags |= 128, n = !0, l = l.updateQueue, t.updateQueue = l, ie(t, l), Pa(a, !0), a.tail === null && a.tailMode === "hidden" && !e.alternate && !J) return il(t), null;
          } else 2 * Fl() - a.renderingStartTime > he && u !== 536870912 && (t.flags |= 128, n = !0, Pa(a, !1), t.lanes = 4194304);
          a.isBackwards ? (e.sibling = t.child, t.child = e) : (l = a.last, l !== null ? l.sibling = e : t.child = e, a.last = e);
        }
        return a.tail !== null ? (l = a.tail, a.rendering = l, a.tail = l.sibling, a.renderingStartTime = Fl(), l.sibling = null, u = Sl.current, O(Sl, n ? u & 1 | 2 : u & 1), J && Bt(t, a.treeForkCount), l) : (il(t), null);
      case 22:
      case 23:
        return ut(t), pf(), a = t.memoizedState !== null, l !== null ? l.memoizedState !== null !== a && (t.flags |= 8192) : a && (t.flags |= 8192), a ? (u & 536870912) !== 0 && (t.flags & 128) === 0 && (il(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : il(t), u = t.updateQueue, u !== null && ie(t, u.retryQueue), u = null, l !== null && l.memoizedState !== null && l.memoizedState.cachePool !== null && (u = l.memoizedState.cachePool.pool), a = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (a = t.memoizedState.cachePool.pool), a !== u && (t.flags |= 2048), l !== null && T(qu), null;
      case 24:
        return u = null, l !== null && (u = l.memoizedState.cache), t.memoizedState.cache !== u && (t.flags |= 2048), Rt(ol), il(t), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(s(156, t.tag));
  }
  function sm(l, t) {
    switch (Tf(t), t.tag) {
      case 1:
        return l = t.flags, l & 65536 ? (t.flags = l & -65537 | 128, t) : null;
      case 3:
        return Rt(ol), hl(), l = t.flags, (l & 65536) !== 0 && (l & 128) === 0 ? (t.flags = l & -65537 | 128, t) : null;
      case 26:
      case 27:
      case 5:
        return bn(t), null;
      case 31:
        if (t.memoizedState !== null) {
          if (ut(t), t.alternate === null) throw Error(s(340));
          Uu();
        }
        return l = t.flags, l & 65536 ? (t.flags = l & -65537 | 128, t) : null;
      case 13:
        if (ut(t), l = t.memoizedState, l !== null && l.dehydrated !== null) {
          if (t.alternate === null) throw Error(s(340));
          Uu();
        }
        return l = t.flags, l & 65536 ? (t.flags = l & -65537 | 128, t) : null;
      case 19:
        return T(Sl), null;
      case 4:
        return hl(), null;
      case 10:
        return Rt(t.type), null;
      case 22:
      case 23:
        return ut(t), pf(), l !== null && T(qu), l = t.flags, l & 65536 ? (t.flags = l & -65537 | 128, t) : null;
      case 24:
        return Rt(ol), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function U1(l, t) {
    switch (Tf(t), t.tag) {
      case 3:
        Rt(ol), hl();
        break;
      case 26:
      case 27:
      case 5:
        bn(t);
        break;
      case 4:
        hl();
        break;
      case 31:
        t.memoizedState !== null && ut(t);
        break;
      case 13:
        ut(t);
        break;
      case 19:
        T(Sl);
        break;
      case 10:
        Rt(t.type);
        break;
      case 22:
      case 23:
        ut(t), pf(), l !== null && T(qu);
        break;
      case 24:
        Rt(ol);
    }
  }
  function ln(l, t) {
    try {
      var u = t.updateQueue, a = u !== null ? u.lastEffect : null;
      if (a !== null) {
        var n = a.next;
        u = n;
        do {
          if ((u.tag & l) === l) {
            a = void 0;
            var e = u.create, f = u.inst;
            a = e(), f.destroy = a;
          }
          u = u.next;
        } while (u !== n);
      }
    } catch (c) {
      ll(t, t.return, c);
    }
  }
  function eu(l, t, u) {
    try {
      var a = t.updateQueue, n = a !== null ? a.lastEffect : null;
      if (n !== null) {
        var e = n.next;
        a = e;
        do {
          if ((a.tag & l) === l) {
            var f = a.inst, c = f.destroy;
            if (c !== void 0) {
              f.destroy = void 0, n = t;
              var i = u, h = c;
              try {
                h();
              } catch (o) {
                ll(n, i, o);
              }
            }
          }
          a = a.next;
        } while (a !== e);
      }
    } catch (o) {
      ll(t, t.return, o);
    }
  }
  function N1(l) {
    var t = l.updateQueue;
    if (t !== null) {
      var u = l.stateNode;
      try {
        A0(t, u);
      } catch (a) {
        ll(l, l.return, a);
      }
    }
  }
  function H1(l, t, u) {
    u.props = Gu(l.type, l.memoizedProps), u.state = l.memoizedState;
    try {
      u.componentWillUnmount();
    } catch (a) {
      ll(l, t, a);
    }
  }
  function tn(l, t) {
    try {
      var u = l.ref;
      if (u !== null) {
        switch (l.tag) {
          case 26:
          case 27:
          case 5:
            var a = l.stateNode;
            break;
          case 30:
            a = l.stateNode;
            break;
          default:
            a = l.stateNode;
        }
        typeof u == "function" ? l.refCleanup = u(a) : u.current = a;
      }
    } catch (n) {
      ll(l, t, n);
    }
  }
  function Dt(l, t) {
    var u = l.ref, a = l.refCleanup;
    if (u !== null) if (typeof a == "function") try {
      a();
    } catch (n) {
      ll(l, t, n);
    } finally {
      l.refCleanup = null, l = l.alternate, l != null && (l.refCleanup = null);
    }
    else if (typeof u == "function") try {
      u(null);
    } catch (n) {
      ll(l, t, n);
    }
    else u.current = null;
  }
  function q1(l) {
    var t = l.type, u = l.memoizedProps, a = l.stateNode;
    try {
      l: switch (t) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          u.autoFocus && a.focus();
          break l;
        case "img":
          u.src ? a.src = u.src : u.srcSet && (a.srcset = u.srcSet);
      }
    } catch (n) {
      ll(l, l.return, n);
    }
  }
  function hc(l, t, u) {
    try {
      var a = l.stateNode;
      jm(a, l.type, u, t), a[Gl] = t;
    } catch (n) {
      ll(l, l.return, n);
    }
  }
  function Y1(l) {
    return l.tag === 5 || l.tag === 3 || l.tag === 26 || l.tag === 27 && du(l.type) || l.tag === 4;
  }
  function Sc(l) {
    l: for (; ; ) {
      for (; l.sibling === null; ) {
        if (l.return === null || Y1(l.return)) return null;
        l = l.return;
      }
      for (l.sibling.return = l.return, l = l.sibling; l.tag !== 5 && l.tag !== 6 && l.tag !== 18; ) {
        if (l.tag === 27 && du(l.type) || l.flags & 2 || l.child === null || l.tag === 4) continue l;
        l.child.return = l, l = l.child;
      }
      if (!(l.flags & 2)) return l.stateNode;
    }
  }
  function gc(l, t, u) {
    var a = l.tag;
    if (a === 5 || a === 6) l = l.stateNode, t ? (u.nodeType === 9 ? u.body : u.nodeName === "HTML" ? u.ownerDocument.body : u).insertBefore(l, t) : (t = u.nodeType === 9 ? u.body : u.nodeName === "HTML" ? u.ownerDocument.body : u, t.appendChild(l), u = u._reactRootContainer, u != null || t.onclick !== null || (t.onclick = Ht));
    else if (a !== 4 && (a === 27 && du(l.type) && (u = l.stateNode, t = null), l = l.child, l !== null)) for (gc(l, t, u), l = l.sibling; l !== null; ) gc(l, t, u), l = l.sibling;
  }
  function ye(l, t, u) {
    var a = l.tag;
    if (a === 5 || a === 6) l = l.stateNode, t ? u.insertBefore(l, t) : u.appendChild(l);
    else if (a !== 4 && (a === 27 && du(l.type) && (u = l.stateNode), l = l.child, l !== null)) for (ye(l, t, u), l = l.sibling; l !== null; ) ye(l, t, u), l = l.sibling;
  }
  function B1(l) {
    var t = l.stateNode, u = l.memoizedProps;
    try {
      for (var a = l.type, n = t.attributes; n.length; ) t.removeAttributeNode(n[0]);
      ql(t, a, u), t[Dl] = l, t[Gl] = u;
    } catch (e) {
      ll(l, l.return, e);
    }
  }
  var Qt = !1, Tl = !1, sc = !1, C1 = typeof WeakSet == "function" ? WeakSet : Set, Ol = null;
  function om(l, t) {
    if (l = l.containerInfo, jc = qe, l = wi(l), yf(l)) {
      if ("selectionStart" in l) var u = {
        start: l.selectionStart,
        end: l.selectionEnd
      };
      else l: {
        u = (u = l.ownerDocument) && u.defaultView || window;
        var a = u.getSelection && u.getSelection();
        if (a && a.rangeCount !== 0) {
          u = a.anchorNode;
          var n = a.anchorOffset, e = a.focusNode;
          a = a.focusOffset;
          try {
            u.nodeType, e.nodeType;
          } catch {
            u = null;
            break l;
          }
          var f = 0, c = -1, i = -1, h = 0, o = 0, z = l, S = null;
          t: for (; ; ) {
            for (var g; z !== u || n !== 0 && z.nodeType !== 3 || (c = f + n), z !== e || a !== 0 && z.nodeType !== 3 || (i = f + a), z.nodeType === 3 && (f += z.nodeValue.length), (g = z.firstChild) !== null; )
              S = z, z = g;
            for (; ; ) {
              if (z === l) break t;
              if (S === u && ++h === n && (c = f), S === e && ++o === a && (i = f), (g = z.nextSibling) !== null) break;
              z = S, S = z.parentNode;
            }
            z = g;
          }
          u = c === -1 || i === -1 ? null : {
            start: c,
            end: i
          };
        } else u = null;
      }
      u = u || {
        start: 0,
        end: 0
      };
    } else u = null;
    for (Gc = {
      focusedElem: l,
      selectionRange: u
    }, qe = !1, Ol = t; Ol !== null; ) if (t = Ol, l = t.child, (t.subtreeFlags & 1028) !== 0 && l !== null) l.return = t, Ol = l;
    else for (; Ol !== null; ) {
      switch (t = Ol, e = t.alternate, l = t.flags, t.tag) {
        case 0:
          if ((l & 4) !== 0 && (l = t.updateQueue, l = l !== null ? l.events : null, l !== null)) for (u = 0; u < l.length; u++) n = l[u], n.ref.impl = n.nextImpl;
          break;
        case 11:
        case 15:
          break;
        case 1:
          if ((l & 1024) !== 0 && e !== null) {
            l = void 0, u = t, n = e.memoizedProps, e = e.memoizedState, a = u.stateNode;
            try {
              var U = Gu(u.type, n);
              l = a.getSnapshotBeforeUpdate(U, e), a.__reactInternalSnapshotBeforeUpdate = l;
            } catch (C) {
              ll(u, u.return, C);
            }
          }
          break;
        case 3:
          if ((l & 1024) !== 0) {
            if (l = t.stateNode.containerInfo, u = l.nodeType, u === 9) Zc(l);
            else if (u === 1) switch (l.nodeName) {
              case "HEAD":
              case "HTML":
              case "BODY":
                Zc(l);
                break;
              default:
                l.textContent = "";
            }
          }
          break;
        case 5:
        case 26:
        case 27:
        case 6:
        case 4:
        case 17:
          break;
        default:
          if ((l & 1024) !== 0) throw Error(s(163));
      }
      if (l = t.sibling, l !== null) {
        l.return = t.return, Ol = l;
        break;
      }
      Ol = t.return;
    }
  }
  function R1(l, t, u) {
    var a = u.flags;
    switch (u.tag) {
      case 0:
      case 11:
      case 15:
        Vt(l, u), a & 4 && ln(5, u);
        break;
      case 1:
        if (Vt(l, u), a & 4) if (l = u.stateNode, t === null) try {
          l.componentDidMount();
        } catch (f) {
          ll(u, u.return, f);
        }
        else {
          var n = Gu(u.type, t.memoizedProps);
          t = t.memoizedState;
          try {
            l.componentDidUpdate(n, t, l.__reactInternalSnapshotBeforeUpdate);
          } catch (f) {
            ll(u, u.return, f);
          }
        }
        a & 64 && N1(u), a & 512 && tn(u, u.return);
        break;
      case 3:
        if (Vt(l, u), a & 64 && (l = u.updateQueue, l !== null)) {
          if (t = null, u.child !== null) switch (u.child.tag) {
            case 27:
            case 5:
              t = u.child.stateNode;
              break;
            case 1:
              t = u.child.stateNode;
          }
          try {
            A0(l, t);
          } catch (f) {
            ll(u, u.return, f);
          }
        }
        break;
      case 27:
        t === null && a & 4 && B1(u);
      case 26:
      case 5:
        Vt(l, u), t === null && a & 4 && q1(u), a & 512 && tn(u, u.return);
        break;
      case 12:
        Vt(l, u);
        break;
      case 31:
        Vt(l, u), a & 4 && G1(l, u);
        break;
      case 13:
        Vt(l, u), a & 4 && X1(l, u), a & 64 && (l = u.memoizedState, l !== null && (l = l.dehydrated, l !== null && (u = Dm.bind(null, u), Jm(l, u))));
        break;
      case 22:
        if (a = u.memoizedState !== null || Qt, !a) {
          t = t !== null && t.memoizedState !== null || Tl, n = Qt;
          var e = Tl;
          Qt = a, (Tl = t) && !e ? Lt(l, u, (u.subtreeFlags & 8772) !== 0) : Vt(l, u), Qt = n, Tl = e;
        }
        break;
      case 30:
        break;
      default:
        Vt(l, u);
    }
  }
  function p1(l) {
    var t = l.alternate;
    t !== null && (l.alternate = null, p1(t)), l.child = null, l.deletions = null, l.sibling = null, l.tag === 5 && (t = l.stateNode, t !== null && xe(t)), l.stateNode = null, l.return = null, l.dependencies = null, l.memoizedProps = null, l.memoizedState = null, l.pendingProps = null, l.stateNode = null, l.updateQueue = null;
  }
  var yl = null, Ql = !1;
  function Zt(l, t, u) {
    for (u = u.child; u !== null; ) j1(l, t, u), u = u.sibling;
  }
  function j1(l, t, u) {
    if (kl && typeof kl.onCommitFiberUnmount == "function") try {
      kl.onCommitFiberUnmount(Ma, u);
    } catch {
    }
    switch (u.tag) {
      case 26:
        Tl || Dt(u, t), Zt(l, t, u), u.memoizedState ? u.memoizedState.count-- : u.stateNode && (u = u.stateNode, u.parentNode.removeChild(u));
        break;
      case 27:
        Tl || Dt(u, t);
        var a = yl, n = Ql;
        du(u.type) && (yl = u.stateNode, Ql = !1), Zt(l, t, u), mn(u.stateNode), yl = a, Ql = n;
        break;
      case 5:
        Tl || Dt(u, t);
      case 6:
        if (a = yl, n = Ql, yl = null, Zt(l, t, u), yl = a, Ql = n, yl !== null) if (Ql) try {
          (yl.nodeType === 9 ? yl.body : yl.nodeName === "HTML" ? yl.ownerDocument.body : yl).removeChild(u.stateNode);
        } catch (e) {
          ll(u, t, e);
        }
        else try {
          yl.removeChild(u.stateNode);
        } catch (e) {
          ll(u, t, e);
        }
        break;
      case 18:
        yl !== null && (Ql ? (l = yl, Hy(l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l, u.stateNode), _a(l)) : Hy(yl, u.stateNode));
        break;
      case 4:
        a = yl, n = Ql, yl = u.stateNode.containerInfo, Ql = !0, Zt(l, t, u), yl = a, Ql = n;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        eu(2, u, t), Tl || eu(4, u, t), Zt(l, t, u);
        break;
      case 1:
        Tl || (Dt(u, t), a = u.stateNode, typeof a.componentWillUnmount == "function" && H1(u, t, a)), Zt(l, t, u);
        break;
      case 21:
        Zt(l, t, u);
        break;
      case 22:
        Tl = (a = Tl) || u.memoizedState !== null, Zt(l, t, u), Tl = a;
        break;
      default:
        Zt(l, t, u);
    }
  }
  function G1(l, t) {
    if (t.memoizedState === null && (l = t.alternate, l !== null && (l = l.memoizedState, l !== null))) {
      l = l.dehydrated;
      try {
        _a(l);
      } catch (u) {
        ll(t, t.return, u);
      }
    }
  }
  function X1(l, t) {
    if (t.memoizedState === null && (l = t.alternate, l !== null && (l = l.memoizedState, l !== null && (l = l.dehydrated, l !== null)))) try {
      _a(l);
    } catch (u) {
      ll(t, t.return, u);
    }
  }
  function bm(l) {
    switch (l.tag) {
      case 31:
      case 13:
      case 19:
        var t = l.stateNode;
        return t === null && (t = l.stateNode = new C1()), t;
      case 22:
        return l = l.stateNode, t = l._retryCache, t === null && (t = l._retryCache = new C1()), t;
      default:
        throw Error(s(435, l.tag));
    }
  }
  function ve(l, t) {
    var u = bm(l);
    t.forEach(function(a) {
      if (!u.has(a)) {
        u.add(a);
        var n = Um.bind(null, l, a);
        a.then(n, n);
      }
    });
  }
  function Zl(l, t) {
    var u = t.deletions;
    if (u !== null) for (var a = 0; a < u.length; a++) {
      var n = u[a], e = l, f = t, c = f;
      l: for (; c !== null; ) {
        switch (c.tag) {
          case 27:
            if (du(c.type)) {
              yl = c.stateNode, Ql = !1;
              break l;
            }
            break;
          case 5:
            yl = c.stateNode, Ql = !1;
            break l;
          case 3:
          case 4:
            yl = c.stateNode.containerInfo, Ql = !0;
            break l;
        }
        c = c.return;
      }
      if (yl === null) throw Error(s(160));
      j1(e, f, n), yl = null, Ql = !1, e = n.alternate, e !== null && (e.return = null), n.return = null;
    }
    if (t.subtreeFlags & 13886) for (t = t.child; t !== null; ) Q1(t, l), t = t.sibling;
  }
  var Tt = null;
  function Q1(l, t) {
    var u = l.alternate, a = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        Zl(t, l), Vl(l), a & 4 && (eu(3, l, l.return), ln(3, l), eu(5, l, l.return));
        break;
      case 1:
        Zl(t, l), Vl(l), a & 512 && (Tl || u === null || Dt(u, u.return)), a & 64 && Qt && (l = l.updateQueue, l !== null && (a = l.callbacks, a !== null && (u = l.shared.hiddenCallbacks, l.shared.hiddenCallbacks = u === null ? a : u.concat(a))));
        break;
      case 26:
        var n = Tt;
        if (Zl(t, l), Vl(l), a & 512 && (Tl || u === null || Dt(u, u.return)), a & 4) {
          var e = u !== null ? u.memoizedState : null;
          if (a = l.memoizedState, u === null) if (a === null) if (l.stateNode === null) {
            l: {
              a = l.type, u = l.memoizedProps, n = n.ownerDocument || n;
              t: switch (a) {
                case "title":
                  e = n.getElementsByTagName("title")[0], (!e || e[Na] || e[Dl] || e.namespaceURI === "http://www.w3.org/2000/svg" || e.hasAttribute("itemprop")) && (e = n.createElement(a), n.head.insertBefore(e, n.querySelector("head > title"))), ql(e, a, u), e[Dl] = l, _l(e), a = e;
                  break l;
                case "link":
                  var f = Zy("link", "href", n).get(a + (u.href || ""));
                  if (f) {
                    for (var c = 0; c < f.length; c++) if (e = f[c], e.getAttribute("href") === (u.href == null || u.href === "" ? null : u.href) && e.getAttribute("rel") === (u.rel == null ? null : u.rel) && e.getAttribute("title") === (u.title == null ? null : u.title) && e.getAttribute("crossorigin") === (u.crossOrigin == null ? null : u.crossOrigin)) {
                      f.splice(c, 1);
                      break t;
                    }
                  }
                  e = n.createElement(a), ql(e, a, u), n.head.appendChild(e);
                  break;
                case "meta":
                  if (f = Zy("meta", "content", n).get(a + (u.content || ""))) {
                    for (c = 0; c < f.length; c++) if (e = f[c], e.getAttribute("content") === (u.content == null ? null : "" + u.content) && e.getAttribute("name") === (u.name == null ? null : u.name) && e.getAttribute("property") === (u.property == null ? null : u.property) && e.getAttribute("http-equiv") === (u.httpEquiv == null ? null : u.httpEquiv) && e.getAttribute("charset") === (u.charSet == null ? null : u.charSet)) {
                      f.splice(c, 1);
                      break t;
                    }
                  }
                  e = n.createElement(a), ql(e, a, u), n.head.appendChild(e);
                  break;
                default:
                  throw Error(s(468, a));
              }
              e[Dl] = l, _l(e), a = e;
            }
            l.stateNode = a;
          } else Vy(n, l.type, l.stateNode);
          else l.stateNode = Qy(n, a, l.memoizedProps);
          else e !== a ? (e === null ? u.stateNode !== null && (u = u.stateNode, u.parentNode.removeChild(u)) : e.count--, a === null ? Vy(n, l.type, l.stateNode) : Qy(n, a, l.memoizedProps)) : a === null && l.stateNode !== null && hc(l, l.memoizedProps, u.memoizedProps);
        }
        break;
      case 27:
        Zl(t, l), Vl(l), a & 512 && (Tl || u === null || Dt(u, u.return)), u !== null && a & 4 && hc(l, l.memoizedProps, u.memoizedProps);
        break;
      case 5:
        if (Zl(t, l), Vl(l), a & 512 && (Tl || u === null || Dt(u, u.return)), l.flags & 32) {
          n = l.stateNode;
          try {
            ru(n, "");
          } catch (U) {
            ll(l, l.return, U);
          }
        }
        a & 4 && l.stateNode != null && (n = l.memoizedProps, hc(l, n, u !== null ? u.memoizedProps : n)), a & 1024 && (sc = !0);
        break;
      case 6:
        if (Zl(t, l), Vl(l), a & 4) {
          if (l.stateNode === null) throw Error(s(162));
          a = l.memoizedProps, u = l.stateNode;
          try {
            u.nodeValue = a;
          } catch (U) {
            ll(l, l.return, U);
          }
        }
        break;
      case 3:
        if (De = null, n = Tt, Tt = Oe(t.containerInfo), Zl(t, l), Tt = n, Vl(l), a & 4 && u !== null && u.memoizedState.isDehydrated) try {
          _a(t.containerInfo);
        } catch (U) {
          ll(l, l.return, U);
        }
        sc && (sc = !1, Z1(l));
        break;
      case 4:
        a = Tt, Tt = Oe(l.stateNode.containerInfo), Zl(t, l), Vl(l), Tt = a;
        break;
      case 12:
        Zl(t, l), Vl(l);
        break;
      case 31:
        Zl(t, l), Vl(l), a & 4 && (a = l.updateQueue, a !== null && (l.updateQueue = null, ve(l, a)));
        break;
      case 13:
        Zl(t, l), Vl(l), l.child.flags & 8192 && l.memoizedState !== null != (u !== null && u.memoizedState !== null) && (de = Fl()), a & 4 && (a = l.updateQueue, a !== null && (l.updateQueue = null, ve(l, a)));
        break;
      case 22:
        n = l.memoizedState !== null;
        var i = u !== null && u.memoizedState !== null, h = Qt, o = Tl;
        if (Qt = h || n, Tl = o || i, Zl(t, l), Tl = o, Qt = h, Vl(l), a & 8192) l: for (t = l.stateNode, t._visibility = n ? t._visibility & -2 : t._visibility | 1, n && (u === null || i || Qt || Tl || Xu(l)), u = null, t = l; ; ) {
          if (t.tag === 5 || t.tag === 26) {
            if (u === null) {
              i = u = t;
              try {
                if (e = i.stateNode, n) f = e.style, typeof f.setProperty == "function" ? f.setProperty("display", "none", "important") : f.display = "none";
                else {
                  c = i.stateNode;
                  var z = i.memoizedProps.style, S = z != null && z.hasOwnProperty("display") ? z.display : null;
                  c.style.display = S == null || typeof S == "boolean" ? "" : ("" + S).trim();
                }
              } catch (U) {
                ll(i, i.return, U);
              }
            }
          } else if (t.tag === 6) {
            if (u === null) {
              i = t;
              try {
                i.stateNode.nodeValue = n ? "" : i.memoizedProps;
              } catch (U) {
                ll(i, i.return, U);
              }
            }
          } else if (t.tag === 18) {
            if (u === null) {
              i = t;
              try {
                var g = i.stateNode;
                n ? qy(g, !0) : qy(i.stateNode, !1);
              } catch (U) {
                ll(i, i.return, U);
              }
            }
          } else if ((t.tag !== 22 && t.tag !== 23 || t.memoizedState === null || t === l) && t.child !== null) {
            t.child.return = t, t = t.child;
            continue;
          }
          if (t === l) break l;
          for (; t.sibling === null; ) {
            if (t.return === null || t.return === l) break l;
            u === t && (u = null), t = t.return;
          }
          u === t && (u = null), t.sibling.return = t.return, t = t.sibling;
        }
        a & 4 && (a = l.updateQueue, a !== null && (u = a.retryQueue, u !== null && (a.retryQueue = null, ve(l, u))));
        break;
      case 19:
        Zl(t, l), Vl(l), a & 4 && (a = l.updateQueue, a !== null && (l.updateQueue = null, ve(l, a)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        Zl(t, l), Vl(l);
    }
  }
  function Vl(l) {
    var t = l.flags;
    if (t & 2) {
      try {
        for (var u, a = l.return; a !== null; ) {
          if (Y1(a)) {
            u = a;
            break;
          }
          a = a.return;
        }
        if (u == null) throw Error(s(160));
        switch (u.tag) {
          case 27:
            var n = u.stateNode;
            ye(l, Sc(l), n);
            break;
          case 5:
            var e = u.stateNode;
            u.flags & 32 && (ru(e, ""), u.flags &= -33), ye(l, Sc(l), e);
            break;
          case 3:
          case 4:
            var f = u.stateNode.containerInfo;
            gc(l, Sc(l), f);
            break;
          default:
            throw Error(s(161));
        }
      } catch (c) {
        ll(l, l.return, c);
      }
      l.flags &= -3;
    }
    t & 4096 && (l.flags &= -4097);
  }
  function Z1(l) {
    if (l.subtreeFlags & 1024) for (l = l.child; l !== null; ) {
      var t = l;
      Z1(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), l = l.sibling;
    }
  }
  function Vt(l, t) {
    if (t.subtreeFlags & 8772) for (t = t.child; t !== null; ) R1(l, t.alternate, t), t = t.sibling;
  }
  function Xu(l) {
    for (l = l.child; l !== null; ) {
      var t = l;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          eu(4, t, t.return), Xu(t);
          break;
        case 1:
          Dt(t, t.return);
          var u = t.stateNode;
          typeof u.componentWillUnmount == "function" && H1(t, t.return, u), Xu(t);
          break;
        case 27:
          mn(t.stateNode);
        case 26:
        case 5:
          Dt(t, t.return), Xu(t);
          break;
        case 22:
          t.memoizedState === null && Xu(t);
          break;
        case 30:
          Xu(t);
          break;
        default:
          Xu(t);
      }
      l = l.sibling;
    }
  }
  function Lt(l, t, u) {
    for (u = u && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
      var a = t.alternate, n = l, e = t, f = e.flags;
      switch (e.tag) {
        case 0:
        case 11:
        case 15:
          Lt(n, e, u), ln(4, e);
          break;
        case 1:
          if (Lt(n, e, u), a = e, n = a.stateNode, typeof n.componentDidMount == "function") try {
            n.componentDidMount();
          } catch (h) {
            ll(a, a.return, h);
          }
          if (a = e, n = a.updateQueue, n !== null) {
            var c = a.stateNode;
            try {
              var i = n.shared.hiddenCallbacks;
              if (i !== null) for (n.shared.hiddenCallbacks = null, n = 0; n < i.length; n++) T0(i[n], c);
            } catch (h) {
              ll(a, a.return, h);
            }
          }
          u && f & 64 && N1(e), tn(e, e.return);
          break;
        case 27:
          B1(e);
        case 26:
        case 5:
          Lt(n, e, u), u && a === null && f & 4 && q1(e), tn(e, e.return);
          break;
        case 12:
          Lt(n, e, u);
          break;
        case 31:
          Lt(n, e, u), u && f & 4 && G1(n, e);
          break;
        case 13:
          Lt(n, e, u), u && f & 4 && X1(n, e);
          break;
        case 22:
          e.memoizedState === null && Lt(n, e, u), tn(e, e.return);
          break;
        case 30:
          break;
        default:
          Lt(n, e, u);
      }
      t = t.sibling;
    }
  }
  function oc(l, t) {
    var u = null;
    l !== null && l.memoizedState !== null && l.memoizedState.cachePool !== null && (u = l.memoizedState.cachePool.pool), l = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (l = t.memoizedState.cachePool.pool), l !== u && (l != null && l.refCount++, u != null && Va(u));
  }
  function bc(l, t) {
    l = null, t.alternate !== null && (l = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== l && (t.refCount++, l != null && Va(l));
  }
  function At(l, t, u, a) {
    if (t.subtreeFlags & 10256) for (t = t.child; t !== null; ) V1(l, t, u, a), t = t.sibling;
  }
  function V1(l, t, u, a) {
    var n = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        At(l, t, u, a), n & 2048 && ln(9, t);
        break;
      case 1:
        At(l, t, u, a);
        break;
      case 3:
        At(l, t, u, a), n & 2048 && (l = null, t.alternate !== null && (l = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== l && (t.refCount++, l != null && Va(l)));
        break;
      case 12:
        if (n & 2048) {
          At(l, t, u, a), l = t.stateNode;
          try {
            var e = t.memoizedProps, f = e.id, c = e.onPostCommit;
            typeof c == "function" && c(f, t.alternate === null ? "mount" : "update", l.passiveEffectDuration, -0);
          } catch (i) {
            ll(t, t.return, i);
          }
        } else At(l, t, u, a);
        break;
      case 31:
        At(l, t, u, a);
        break;
      case 13:
        At(l, t, u, a);
        break;
      case 23:
        break;
      case 22:
        e = t.stateNode, f = t.alternate, t.memoizedState !== null ? e._visibility & 2 ? At(l, t, u, a) : un(l, t) : e._visibility & 2 ? At(l, t, u, a) : (e._visibility |= 2, da(l, t, u, a, (t.subtreeFlags & 10256) !== 0 || !1)), n & 2048 && oc(f, t);
        break;
      case 24:
        At(l, t, u, a), n & 2048 && bc(t.alternate, t);
        break;
      default:
        At(l, t, u, a);
    }
  }
  function da(l, t, u, a, n) {
    for (n = n && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child; t !== null; ) {
      var e = l, f = t, c = u, i = a, h = f.flags;
      switch (f.tag) {
        case 0:
        case 11:
        case 15:
          da(e, f, c, i, n), ln(8, f);
          break;
        case 23:
          break;
        case 22:
          var o = f.stateNode;
          f.memoizedState !== null ? o._visibility & 2 ? da(e, f, c, i, n) : un(e, f) : (o._visibility |= 2, da(e, f, c, i, n)), n && h & 2048 && oc(f.alternate, f);
          break;
        case 24:
          da(e, f, c, i, n), n && h & 2048 && bc(f.alternate, f);
          break;
        default:
          da(e, f, c, i, n);
      }
      t = t.sibling;
    }
  }
  function un(l, t) {
    if (t.subtreeFlags & 10256) for (t = t.child; t !== null; ) {
      var u = l, a = t, n = a.flags;
      switch (a.tag) {
        case 22:
          un(u, a), n & 2048 && oc(a.alternate, a);
          break;
        case 24:
          un(u, a), n & 2048 && bc(a.alternate, a);
          break;
        default:
          un(u, a);
      }
      t = t.sibling;
    }
  }
  var an = 8192;
  function ha(l, t, u) {
    if (l.subtreeFlags & an) for (l = l.child; l !== null; ) L1(l, t, u), l = l.sibling;
  }
  function L1(l, t, u) {
    switch (l.tag) {
      case 26:
        ha(l, t, u), l.flags & an && l.memoizedState !== null && ud(u, Tt, l.memoizedState, l.memoizedProps);
        break;
      case 5:
        ha(l, t, u);
        break;
      case 3:
      case 4:
        var a = Tt;
        Tt = Oe(l.stateNode.containerInfo), ha(l, t, u), Tt = a;
        break;
      case 22:
        l.memoizedState === null && (a = l.alternate, a !== null && a.memoizedState !== null ? (a = an, an = 16777216, ha(l, t, u), an = a) : ha(l, t, u));
        break;
      default:
        ha(l, t, u);
    }
  }
  function K1(l) {
    var t = l.alternate;
    if (t !== null && (l = t.child, l !== null)) {
      t.child = null;
      do
        t = l.sibling, l.sibling = null, l = t;
      while (l !== null);
    }
  }
  function nn(l) {
    var t = l.deletions;
    if ((l.flags & 16) !== 0) {
      if (t !== null) for (var u = 0; u < t.length; u++) {
        var a = t[u];
        Ol = a, x1(a, l);
      }
      K1(l);
    }
    if (l.subtreeFlags & 10256) for (l = l.child; l !== null; ) J1(l), l = l.sibling;
  }
  function J1(l) {
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        nn(l), l.flags & 2048 && eu(9, l, l.return);
        break;
      case 3:
        nn(l);
        break;
      case 12:
        nn(l);
        break;
      case 22:
        var t = l.stateNode;
        l.memoizedState !== null && t._visibility & 2 && (l.return === null || l.return.tag !== 13) ? (t._visibility &= -3, me(l)) : nn(l);
        break;
      default:
        nn(l);
    }
  }
  function me(l) {
    var t = l.deletions;
    if ((l.flags & 16) !== 0) {
      if (t !== null) for (var u = 0; u < t.length; u++) {
        var a = t[u];
        Ol = a, x1(a, l);
      }
      K1(l);
    }
    for (l = l.child; l !== null; ) {
      switch (t = l, t.tag) {
        case 0:
        case 11:
        case 15:
          eu(8, t, t.return), me(t);
          break;
        case 22:
          u = t.stateNode, u._visibility & 2 && (u._visibility &= -3, me(t));
          break;
        default:
          me(t);
      }
      l = l.sibling;
    }
  }
  function x1(l, t) {
    for (; Ol !== null; ) {
      var u = Ol;
      switch (u.tag) {
        case 0:
        case 11:
        case 15:
          eu(8, u, t);
          break;
        case 23:
        case 22:
          if (u.memoizedState !== null && u.memoizedState.cachePool !== null) {
            var a = u.memoizedState.cachePool.pool;
            a != null && a.refCount++;
          }
          break;
        case 24:
          Va(u.memoizedState.cache);
      }
      if (a = u.child, a !== null) a.return = u, Ol = a;
      else l: for (u = l; Ol !== null; ) {
        a = Ol;
        var n = a.sibling, e = a.return;
        if (p1(a), a === u) {
          Ol = null;
          break l;
        }
        if (n !== null) {
          n.return = e, Ol = n;
          break l;
        }
        Ol = e;
      }
    }
  }
  var zm = {
    getCacheForType: function(l) {
      var t = Nl(ol), u = t.data.get(l);
      return u === void 0 && (u = l(), t.data.set(l, u)), u;
    },
    cacheSignal: function() {
      return Nl(ol).controller.signal;
    }
  }, Tm = typeof WeakMap == "function" ? WeakMap : Map, F = 0, nl = null, Z = null, L = 0, P = 0, at = null, fu = !1, Sa = !1, zc = !1, Kt = 0, dl = 0, cu = 0, Qu = 0, Tc = 0, nt = 0, ga = 0, en = null, Ll = null, Ac = !1, de = 0, r1 = 0, he = 1 / 0, Se = null, iu = null, Al = 0, yu = null, sa = null, Jt = 0, Ec = 0, _c = null, W1 = null, fn = 0, Oc = null;
  function ht() {
    return (F & 2) !== 0 && L !== 0 ? L & -L : _.T !== null ? qc() : di();
  }
  function w1() {
    if (nt === 0) if ((L & 536870912) === 0 || J) {
      var l = An;
      An <<= 1, (An & 3932160) === 0 && (An = 262144), nt = l;
    } else nt = 536870912;
    return l = tt.current, l !== null && (l.flags |= 32), nt;
  }
  function Kl(l, t, u) {
    (l === nl && (P === 2 || P === 9) || l.cancelPendingCommit !== null) && (oa(l, 0), vu(l, L, nt, !1)), On(l, u), ((F & 2) === 0 || l !== nl) && (l === nl && ((F & 2) === 0 && (Qu |= u), dl === 4 && vu(l, L, nt, !1)), xt(l));
  }
  function $1(l, t, u) {
    if ((F & 6) !== 0) throw Error(s(327));
    var a = !u && (t & 127) === 0 && (t & l.expiredLanes) === 0 || Da(l, t), n = a ? _m(l, t) : Dc(l, t, !0), e = a;
    do {
      if (n === 0) {
        Sa && !a && vu(l, t, 0, !1);
        break;
      } else {
        if (u = l.current.alternate, e && !Am(u)) {
          n = Dc(l, t, !1), e = !1;
          continue;
        }
        if (n === 2) {
          if (e = t, l.errorRecoveryDisabledLanes & e) var f = 0;
          else f = l.pendingLanes & -536870913, f = f !== 0 ? f : f & 536870912 ? 536870912 : 0;
          if (f !== 0) {
            t = f;
            l: {
              var c = l;
              n = en;
              var i = c.current.memoizedState.isDehydrated;
              if (i && (oa(c, f).flags |= 256), f = Dc(c, f, !1), f !== 2) {
                if (zc && !i) {
                  c.errorRecoveryDisabledLanes |= e, Qu |= e, n = 4;
                  break l;
                }
                e = Ll, Ll = n, e !== null && (Ll === null ? Ll = e : Ll.push.apply(Ll, e));
              }
              n = f;
            }
            if (e = !1, n !== 2) continue;
          }
        }
        if (n === 1) {
          oa(l, 0), vu(l, t, 0, !0);
          break;
        }
        l: {
          switch (a = l, e = n, e) {
            case 0:
            case 1:
              throw Error(s(345));
            case 4:
              if ((t & 4194048) !== t) break;
            case 6:
              vu(a, t, nt, !fu);
              break l;
            case 2:
              Ll = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(s(329));
          }
          if ((t & 62914560) === t && (n = de + 300 - Fl(), 10 < n)) {
            if (vu(a, t, nt, !fu), _n(a, 0, !0) !== 0) break l;
            Jt = t, a.timeoutHandle = Uy(F1.bind(null, a, u, Ll, Se, Ac, t, nt, Qu, ga, fu, e, "Throttled", -0, 0), n);
            break l;
          }
          F1(a, u, Ll, Se, Ac, t, nt, Qu, ga, fu, e, null, -0, 0);
        }
      }
      break;
    } while (!0);
    xt(l);
  }
  function F1(l, t, u, a, n, e, f, c, i, h, o, z, S, g) {
    if (l.timeoutHandle = -1, z = t.subtreeFlags, z & 8192 || (z & 16785408) === 16785408) {
      z = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: Ht
      }, L1(t, e, z);
      var U = (e & 62914560) === e ? de - Fl() : (e & 4194048) === e ? r1 - Fl() : 0;
      if (U = ad(z, U), U !== null) {
        Jt = e, l.cancelPendingCommit = U(ny.bind(null, l, t, e, u, a, n, f, c, i, o, z, null, S, g)), vu(l, e, f, !h);
        return;
      }
    }
    ny(l, t, e, u, a, n, f, c, i);
  }
  function Am(l) {
    for (var t = l; ; ) {
      var u = t.tag;
      if ((u === 0 || u === 11 || u === 15) && t.flags & 16384 && (u = t.updateQueue, u !== null && (u = u.stores, u !== null))) for (var a = 0; a < u.length; a++) {
        var n = u[a], e = n.getSnapshot;
        n = n.value;
        try {
          if (!Pl(e(), n)) return !1;
        } catch {
          return !1;
        }
      }
      if (u = t.child, t.subtreeFlags & 16384 && u !== null) u.return = t, t = u;
      else {
        if (t === l) break;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === l) return !0;
          t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
      }
    }
    return !0;
  }
  function vu(l, t, u, a) {
    t &= ~Tc, t &= ~Qu, l.suspendedLanes |= t, l.pingedLanes &= ~t, a && (l.warmLanes |= t), a = l.expirationTimes;
    for (var n = t; 0 < n; ) {
      var e = 31 - Il(n), f = 1 << e;
      a[e] = -1, n &= ~f;
    }
    u !== 0 && ii(l, u, t);
  }
  function ge() {
    return (F & 6) === 0 ? (cn(0, !1), !1) : !0;
  }
  function Mc() {
    if (Z !== null) {
      if (P === 0) var l = Z.return;
      else l = Z, Ct = Nu = null, Vf(l), ca = null, Ka = 0, l = Z;
      for (; l !== null; ) U1(l.alternate, l), l = l.return;
      Z = null;
    }
  }
  function oa(l, t) {
    var u = l.timeoutHandle;
    u !== -1 && (l.timeoutHandle = -1, Qm(u)), u = l.cancelPendingCommit, u !== null && (l.cancelPendingCommit = null, u()), Jt = 0, Mc(), nl = l, Z = u = Yt(l.current, null), L = t, P = 0, at = null, fu = !1, Sa = Da(l, t), zc = !1, ga = nt = Tc = Qu = cu = dl = 0, Ll = en = null, Ac = !1, (t & 8) !== 0 && (t |= t & 32);
    var a = l.entangledLanes;
    if (a !== 0) for (l = l.entanglements, a &= t; 0 < a; ) {
      var n = 31 - Il(a), e = 1 << n;
      t |= l[n], a &= ~e;
    }
    return Kt = t, jn(), u;
  }
  function k1(l, t) {
    p = null, _.H = ka, t === fa || t === Jn ? (t = s0(), P = 3) : t === Hf ? (t = s0(), P = 4) : P = t === ac ? 8 : t !== null && typeof t == "object" && typeof t.then == "function" ? 6 : 1, at = t, Z === null && (dl = 1, ne(l, it(t, l.current)));
  }
  function I1() {
    var l = tt.current;
    return l === null ? !0 : (L & 4194048) === L ? dt === null : (L & 62914560) === L || (L & 536870912) !== 0 ? l === dt : !1;
  }
  function P1() {
    var l = _.H;
    return _.H = ka, l === null ? ka : l;
  }
  function ly() {
    var l = _.A;
    return _.A = zm, l;
  }
  function se() {
    dl = 4, fu || (L & 4194048) !== L && tt.current !== null || (Sa = !0), (cu & 134217727) === 0 && (Qu & 134217727) === 0 || nl === null || vu(nl, L, nt, !1);
  }
  function Dc(l, t, u) {
    var a = F;
    F |= 2;
    var n = P1(), e = ly();
    (nl !== l || L !== t) && (Se = null, oa(l, t)), t = !1;
    var f = dl;
    l: do
      try {
        if (P !== 0 && Z !== null) {
          var c = Z, i = at;
          switch (P) {
            case 8:
              Mc(), f = 6;
              break l;
            case 3:
            case 2:
            case 9:
            case 6:
              tt.current === null && (t = !0);
              var h = P;
              if (P = 0, at = null, ba(l, c, i, h), u && Sa) {
                f = 0;
                break l;
              }
              break;
            default:
              h = P, P = 0, at = null, ba(l, c, i, h);
          }
        }
        Em(), f = dl;
        break;
      } catch (o) {
        k1(l, o);
      }
    while (!0);
    return t && l.shellSuspendCounter++, Ct = Nu = null, F = a, _.H = n, _.A = e, Z === null && (nl = null, L = 0, jn()), f;
  }
  function Em() {
    for (; Z !== null; ) ty(Z);
  }
  function _m(l, t) {
    var u = F;
    F |= 2;
    var a = P1(), n = ly();
    nl !== l || L !== t ? (Se = null, he = Fl() + 500, oa(l, t)) : Sa = Da(l, t);
    l: do
      try {
        if (P !== 0 && Z !== null) {
          t = Z;
          var e = at;
          t: switch (P) {
            case 1:
              P = 0, at = null, ba(l, t, e, 1);
              break;
            case 2:
            case 9:
              if (S0(e)) {
                P = 0, at = null, uy(t);
                break;
              }
              t = function() {
                P !== 2 && P !== 9 || nl !== l || (P = 7), xt(l);
              }, e.then(t, t);
              break l;
            case 3:
              P = 7;
              break l;
            case 4:
              P = 5;
              break l;
            case 7:
              S0(e) ? (P = 0, at = null, uy(t)) : (P = 0, at = null, ba(l, t, e, 7));
              break;
            case 5:
              var f = null;
              switch (Z.tag) {
                case 26:
                  f = Z.memoizedState;
                case 5:
                case 27:
                  var c = Z;
                  if (f ? Ly(f) : c.stateNode.complete) {
                    P = 0, at = null;
                    var i = c.sibling;
                    if (i !== null) Z = i;
                    else {
                      var h = c.return;
                      h !== null ? (Z = h, oe(h)) : Z = null;
                    }
                    break t;
                  }
              }
              P = 0, at = null, ba(l, t, e, 5);
              break;
            case 6:
              P = 0, at = null, ba(l, t, e, 6);
              break;
            case 8:
              Mc(), dl = 6;
              break l;
            default:
              throw Error(s(462));
          }
        }
        Om();
        break;
      } catch (o) {
        k1(l, o);
      }
    while (!0);
    return Ct = Nu = null, _.H = a, _.A = n, F = u, Z !== null ? 0 : (nl = null, L = 0, jn(), dl);
  }
  function Om() {
    for (; Z !== null && !tv(); ) ty(Z);
  }
  function ty(l) {
    var t = M1(l.alternate, l, Kt);
    l.memoizedProps = l.pendingProps, t === null ? oe(l) : Z = t;
  }
  function uy(l) {
    var t = l, u = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = z1(u, t, t.pendingProps, t.type, void 0, L);
        break;
      case 11:
        t = z1(u, t, t.pendingProps, t.type.render, t.ref, L);
        break;
      case 5:
        Vf(t);
      default:
        U1(u, t), t = Z = a0(t, Kt), t = M1(u, t, Kt);
    }
    l.memoizedProps = l.pendingProps, t === null ? oe(l) : Z = t;
  }
  function ba(l, t, u, a) {
    Ct = Nu = null, Vf(t), ca = null, Ka = 0;
    var n = t.return;
    try {
      if (dm(l, n, t, u, L)) {
        dl = 1, ne(l, it(u, l.current)), Z = null;
        return;
      }
    } catch (e) {
      if (n !== null) throw Z = n, e;
      dl = 1, ne(l, it(u, l.current)), Z = null;
      return;
    }
    t.flags & 32768 ? (J || a === 1 ? l = !0 : Sa || (L & 536870912) !== 0 ? l = !1 : (fu = l = !0, (a === 2 || a === 9 || a === 3 || a === 6) && (a = tt.current, a !== null && a.tag === 13 && (a.flags |= 16384))), ay(t, l)) : oe(t);
  }
  function oe(l) {
    var t = l;
    do {
      if ((t.flags & 32768) !== 0) {
        ay(t, fu);
        return;
      }
      l = t.return;
      var u = gm(t.alternate, t, Kt);
      if (u !== null) {
        Z = u;
        return;
      }
      if (t = t.sibling, t !== null) {
        Z = t;
        return;
      }
      Z = t = l;
    } while (t !== null);
    dl === 0 && (dl = 5);
  }
  function ay(l, t) {
    do {
      var u = sm(l.alternate, l);
      if (u !== null) {
        u.flags &= 32767, Z = u;
        return;
      }
      if (u = l.return, u !== null && (u.flags |= 32768, u.subtreeFlags = 0, u.deletions = null), !t && (l = l.sibling, l !== null)) {
        Z = l;
        return;
      }
      Z = l = u;
    } while (l !== null);
    dl = 6, Z = null;
  }
  function ny(l, t, u, a, n, e, f, c, i) {
    l.cancelPendingCommit = null;
    do
      be();
    while (Al !== 0);
    if ((F & 6) !== 0) throw Error(s(327));
    if (t !== null) {
      if (t === l.current) throw Error(s(177));
      if (e = t.lanes | t.childLanes, e |= Sf, mv(l, u, e, f, c, i), l === nl && (Z = nl = null, L = 0), sa = t, yu = l, Jt = u, Ec = e, _c = n, W1 = a, (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? (l.callbackNode = null, l.callbackPriority = 0, Nm(zn, function() {
        return yy(), null;
      })) : (l.callbackNode = null, l.callbackPriority = 0), a = (t.flags & 13878) !== 0, (t.subtreeFlags & 13878) !== 0 || a) {
        a = _.T, _.T = null, n = M.p, M.p = 2, f = F, F |= 4;
        try {
          om(l, t, u);
        } finally {
          F = f, M.p = n, _.T = a;
        }
      }
      Al = 1, ey(), fy(), cy();
    }
  }
  function ey() {
    if (Al === 1) {
      Al = 0;
      var l = yu, t = sa, u = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || u) {
        u = _.T, _.T = null;
        var a = M.p;
        M.p = 2;
        var n = F;
        F |= 4;
        try {
          Q1(t, l);
          var e = Gc, f = wi(l.containerInfo), c = e.focusedElem, i = e.selectionRange;
          if (f !== c && c && c.ownerDocument && Wi(c.ownerDocument.documentElement, c)) {
            if (i !== null && yf(c)) {
              var h = i.start, o = i.end;
              if (o === void 0 && (o = h), "selectionStart" in c) c.selectionStart = h, c.selectionEnd = Math.min(o, c.value.length);
              else {
                var z = c.ownerDocument || document, S = z && z.defaultView || window;
                if (S.getSelection) {
                  var g = S.getSelection(), U = c.textContent.length, C = Math.min(i.start, U), al = i.end === void 0 ? C : Math.min(i.end, U);
                  !g.extend && C > al && (f = al, al = C, C = f);
                  var m = ri(c, C), y = ri(c, al);
                  if (m && y && (g.rangeCount !== 1 || g.anchorNode !== m.node || g.anchorOffset !== m.offset || g.focusNode !== y.node || g.focusOffset !== y.offset)) {
                    var d = z.createRange();
                    d.setStart(m.node, m.offset), g.removeAllRanges(), C > al ? (g.addRange(d), g.extend(y.node, y.offset)) : (d.setEnd(y.node, y.offset), g.addRange(d));
                  }
                }
              }
            }
            for (z = [], g = c; g = g.parentNode; ) g.nodeType === 1 && z.push({
              element: g,
              left: g.scrollLeft,
              top: g.scrollTop
            });
            for (typeof c.focus == "function" && c.focus(), c = 0; c < z.length; c++) {
              var b = z[c];
              b.element.scrollLeft = b.left, b.element.scrollTop = b.top;
            }
          }
          qe = !!jc, Gc = jc = null;
        } finally {
          F = n, M.p = a, _.T = u;
        }
      }
      l.current = t, Al = 2;
    }
  }
  function fy() {
    if (Al === 2) {
      Al = 0;
      var l = yu, t = sa, u = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || u) {
        u = _.T, _.T = null;
        var a = M.p;
        M.p = 2;
        var n = F;
        F |= 4;
        try {
          R1(l, t.alternate, t);
        } finally {
          F = n, M.p = a, _.T = u;
        }
      }
      Al = 3;
    }
  }
  function cy() {
    if (Al === 4 || Al === 3) {
      Al = 0, uv();
      var l = yu, t = sa, u = Jt, a = W1;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? Al = 5 : (Al = 0, sa = yu = null, iy(l, l.pendingLanes));
      var n = l.pendingLanes;
      if (n === 0 && (iu = null), Ke(u), t = t.stateNode, kl && typeof kl.onCommitFiberRoot == "function") try {
        kl.onCommitFiberRoot(Ma, t, void 0, (t.current.flags & 128) === 128);
      } catch {
      }
      if (a !== null) {
        t = _.T, n = M.p, M.p = 2, _.T = null;
        try {
          for (var e = l.onRecoverableError, f = 0; f < a.length; f++) {
            var c = a[f];
            e(c.value, { componentStack: c.stack });
          }
        } finally {
          _.T = t, M.p = n;
        }
      }
      (Jt & 3) !== 0 && be(), xt(l), n = l.pendingLanes, (u & 261930) !== 0 && (n & 42) !== 0 ? l === Oc ? fn++ : (fn = 0, Oc = l) : fn = 0, cn(0, !1);
    }
  }
  function iy(l, t) {
    (l.pooledCacheLanes &= t) === 0 && (t = l.pooledCache, t != null && (l.pooledCache = null, Va(t)));
  }
  function be() {
    return ey(), fy(), cy(), yy();
  }
  function yy() {
    if (Al !== 5) return !1;
    var l = yu, t = Ec;
    Ec = 0;
    var u = Ke(Jt), a = _.T, n = M.p;
    try {
      M.p = 32 > u ? 32 : u, _.T = null, u = _c, _c = null;
      var e = yu, f = Jt;
      if (Al = 0, sa = yu = null, Jt = 0, (F & 6) !== 0) throw Error(s(331));
      var c = F;
      if (F |= 4, J1(e.current), V1(e, e.current, f, u), F = c, cn(0, !1), kl && typeof kl.onPostCommitFiberRoot == "function") try {
        kl.onPostCommitFiberRoot(Ma, e);
      } catch {
      }
      return !0;
    } finally {
      M.p = n, _.T = a, iy(l, t);
    }
  }
  function vy(l, t, u) {
    t = it(u, t), t = uc(l.stateNode, t, 2), l = pu(l, t, 2), l !== null && (On(l, 2), xt(l));
  }
  function ll(l, t, u) {
    if (l.tag === 3) vy(l, l, u);
    else for (; t !== null; ) {
      if (t.tag === 3) {
        vy(t, l, u);
        break;
      } else if (t.tag === 1) {
        var a = t.stateNode;
        if (typeof t.type.getDerivedStateFromError == "function" || typeof a.componentDidCatch == "function" && (iu === null || !iu.has(a))) {
          l = it(u, l), u = m1(2), a = pu(t, u, 2), a !== null && (d1(u, a, t, l), On(a, 2), xt(a));
          break;
        }
      }
      t = t.return;
    }
  }
  function Uc(l, t, u) {
    var a = l.pingCache;
    if (a === null) {
      a = l.pingCache = new Tm();
      var n = /* @__PURE__ */ new Set();
      a.set(t, n);
    } else n = a.get(t), n === void 0 && (n = /* @__PURE__ */ new Set(), a.set(t, n));
    n.has(u) || (zc = !0, n.add(u), l = Mm.bind(null, l, t, u), t.then(l, l));
  }
  function Mm(l, t, u) {
    var a = l.pingCache;
    a !== null && a.delete(t), l.pingedLanes |= l.suspendedLanes & u, l.warmLanes &= ~u, nl === l && (L & u) === u && (dl === 4 || dl === 3 && (L & 62914560) === L && 300 > Fl() - de ? (F & 2) === 0 && oa(l, 0) : Tc |= u, ga === L && (ga = 0)), xt(l);
  }
  function my(l, t) {
    t === 0 && (t = ci()), l = Mu(l, t), l !== null && (On(l, t), xt(l));
  }
  function Dm(l) {
    var t = l.memoizedState, u = 0;
    t !== null && (u = t.retryLane), my(l, u);
  }
  function Um(l, t) {
    var u = 0;
    switch (l.tag) {
      case 31:
      case 13:
        var a = l.stateNode, n = l.memoizedState;
        n !== null && (u = n.retryLane);
        break;
      case 19:
        a = l.stateNode;
        break;
      case 22:
        a = l.stateNode._retryCache;
        break;
      default:
        throw Error(s(314));
    }
    a !== null && a.delete(t), my(l, u);
  }
  function Nm(l, t) {
    return Ze(l, t);
  }
  var ze = null, za = null, Nc = !1, Te = !1, Hc = !1, mu = 0;
  function xt(l) {
    l !== za && l.next === null && (za === null ? ze = za = l : za = za.next = l), Te = !0, Nc || (Nc = !0, qm());
  }
  function cn(l, t) {
    if (!Hc && Te) {
      Hc = !0;
      do
        for (var u = !1, a = ze; a !== null; ) {
          if (!t) if (l !== 0) {
            var n = a.pendingLanes;
            if (n === 0) var e = 0;
            else {
              var f = a.suspendedLanes, c = a.pingedLanes;
              e = (1 << 31 - Il(42 | l) + 1) - 1, e &= n & ~(f & ~c), e = e & 201326741 ? e & 201326741 | 1 : e ? e | 2 : 0;
            }
            e !== 0 && (u = !0, gy(a, e));
          } else e = L, e = _n(a, a === nl ? e : 0, a.cancelPendingCommit !== null || a.timeoutHandle !== -1), (e & 3) === 0 || Da(a, e) || (u = !0, gy(a, e));
          a = a.next;
        }
      while (u);
      Hc = !1;
    }
  }
  function Hm() {
    dy();
  }
  function dy() {
    Te = Nc = !1;
    var l = 0;
    mu !== 0 && Xm() && (l = mu);
    for (var t = Fl(), u = null, a = ze; a !== null; ) {
      var n = a.next, e = hy(a, t);
      e === 0 ? (a.next = null, u === null ? ze = n : u.next = n, n === null && (za = u)) : (u = a, (l !== 0 || (e & 3) !== 0) && (Te = !0)), a = n;
    }
    Al !== 0 && Al !== 5 || cn(l, !1), mu !== 0 && (mu = 0);
  }
  function hy(l, t) {
    for (var u = l.suspendedLanes, a = l.pingedLanes, n = l.expirationTimes, e = l.pendingLanes & -62914561; 0 < e; ) {
      var f = 31 - Il(e), c = 1 << f, i = n[f];
      i === -1 ? ((c & u) === 0 || (c & a) !== 0) && (n[f] = vv(c, t)) : i <= t && (l.expiredLanes |= c), e &= ~c;
    }
    if (t = nl, u = L, u = _n(l, l === t ? u : 0, l.cancelPendingCommit !== null || l.timeoutHandle !== -1), a = l.callbackNode, u === 0 || l === t && (P === 2 || P === 9) || l.cancelPendingCommit !== null) return a !== null && a !== null && Ve(a), l.callbackNode = null, l.callbackPriority = 0;
    if ((u & 3) === 0 || Da(l, u)) {
      if (t = u & -u, t === l.callbackPriority) return t;
      switch (a !== null && Ve(a), Ke(u)) {
        case 2:
        case 8:
          u = ei;
          break;
        case 32:
          u = zn;
          break;
        case 268435456:
          u = fi;
          break;
        default:
          u = zn;
      }
      return a = Sy.bind(null, l), u = Ze(u, a), l.callbackPriority = t, l.callbackNode = u, t;
    }
    return a !== null && a !== null && Ve(a), l.callbackPriority = 2, l.callbackNode = null, 2;
  }
  function Sy(l, t) {
    if (Al !== 0 && Al !== 5) return l.callbackNode = null, l.callbackPriority = 0, null;
    var u = l.callbackNode;
    if (be() && l.callbackNode !== u) return null;
    var a = L;
    return a = _n(l, l === nl ? a : 0, l.cancelPendingCommit !== null || l.timeoutHandle !== -1), a === 0 ? null : ($1(l, a, t), hy(l, Fl()), l.callbackNode != null && l.callbackNode === u ? Sy.bind(null, l) : null);
  }
  function gy(l, t) {
    if (be()) return null;
    $1(l, t, !0);
  }
  function qm() {
    Zm(function() {
      (F & 6) !== 0 ? Ze(ni, Hm) : dy();
    });
  }
  function qc() {
    if (mu === 0) {
      var l = na;
      l === 0 && (l = Tn, Tn <<= 1, (Tn & 261888) === 0 && (Tn = 256)), mu = l;
    }
    return mu;
  }
  function sy(l) {
    return l == null || typeof l == "symbol" || typeof l == "boolean" ? null : typeof l == "function" ? l : Nn("" + l);
  }
  function oy(l, t) {
    var u = t.ownerDocument.createElement("input");
    return u.name = t.name, u.value = t.value, l.id && u.setAttribute("form", l.id), t.parentNode.insertBefore(u, t), l = new FormData(l), u.parentNode.removeChild(u), l;
  }
  function Ym(l, t, u, a, n) {
    if (t === "submit" && u && u.stateNode === n) {
      var e = sy((n[Gl] || null).action), f = a.submitter;
      f && (t = (t = f[Gl] || null) ? sy(t.formAction) : f.getAttribute("formAction"), t !== null && (e = t, f = null));
      var c = new Bn("action", "action", null, a, n);
      l.push({
        event: c,
        listeners: [{
          instance: null,
          listener: function() {
            if (a.defaultPrevented) {
              if (mu !== 0) {
                var i = f ? oy(n, f) : new FormData(n);
                Ff(u, {
                  pending: !0,
                  data: i,
                  method: n.method,
                  action: e
                }, null, i);
              }
            } else typeof e == "function" && (c.preventDefault(), i = f ? oy(n, f) : new FormData(n), Ff(u, {
              pending: !0,
              data: i,
              method: n.method,
              action: e
            }, e, i));
          },
          currentTarget: n
        }]
      });
    }
  }
  for (var Yc = 0; Yc < hf.length; Yc++) {
    var Bc = hf[Yc];
    zt(Bc.toLowerCase(), "on" + (Bc[0].toUpperCase() + Bc.slice(1)));
  }
  zt(ki, "onAnimationEnd"), zt(Ii, "onAnimationIteration"), zt(Pi, "onAnimationStart"), zt("dblclick", "onDoubleClick"), zt("focusin", "onFocus"), zt("focusout", "onBlur"), zt(rv, "onTransitionRun"), zt(Wv, "onTransitionStart"), zt(wv, "onTransitionCancel"), zt(l0, "onTransitionEnd"), Ju("onMouseEnter", ["mouseout", "mouseover"]), Ju("onMouseLeave", ["mouseout", "mouseover"]), Ju("onPointerEnter", ["pointerout", "pointerover"]), Ju("onPointerLeave", ["pointerout", "pointerover"]), Au("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), Au("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), Au("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), Au("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), Au("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), Au("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
  var yn = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), Bm = new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(yn));
  function by(l, t) {
    t = (t & 4) !== 0;
    for (var u = 0; u < l.length; u++) {
      var a = l[u], n = a.event;
      a = a.listeners;
      l: {
        var e = void 0;
        if (t) for (var f = a.length - 1; 0 <= f; f--) {
          var c = a[f], i = c.instance, h = c.currentTarget;
          if (c = c.listener, i !== e && n.isPropagationStopped()) break l;
          e = c, n.currentTarget = h;
          try {
            e(n);
          } catch (o) {
            pn(o);
          }
          n.currentTarget = null, e = i;
        }
        else for (f = 0; f < a.length; f++) {
          if (c = a[f], i = c.instance, h = c.currentTarget, c = c.listener, i !== e && n.isPropagationStopped()) break l;
          e = c, n.currentTarget = h;
          try {
            e(n);
          } catch (o) {
            pn(o);
          }
          n.currentTarget = null, e = i;
        }
      }
    }
  }
  function V(l, t) {
    var u = t[Je];
    u === void 0 && (u = t[Je] = /* @__PURE__ */ new Set());
    var a = l + "__bubble";
    u.has(a) || (Ty(t, l, 2, !1), u.add(a));
  }
  function Cc(l, t, u) {
    var a = 0;
    t && (a |= 4), Ty(u, l, a, t);
  }
  var Ae = "_reactListening" + Math.random().toString(36).slice(2);
  function zy(l) {
    if (!l[Ae]) {
      l[Ae] = !0, gi.forEach(function(u) {
        u !== "selectionchange" && (Bm.has(u) || Cc(u, !1, l), Cc(u, !0, l));
      });
      var t = l.nodeType === 9 ? l : l.ownerDocument;
      t === null || t[Ae] || (t[Ae] = !0, Cc("selectionchange", !1, t));
    }
  }
  function Ty(l, t, u, a) {
    switch (Wy(t)) {
      case 2:
        var n = id;
        break;
      case 8:
        n = yd;
        break;
      default:
        n = wc;
    }
    u = n.bind(null, t, u, l), n = void 0, !Pe || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (n = !0), a ? n !== void 0 ? l.addEventListener(t, u, {
      capture: !0,
      passive: n
    }) : l.addEventListener(t, u, !0) : n !== void 0 ? l.addEventListener(t, u, { passive: n }) : l.addEventListener(t, u, !1);
  }
  function Rc(l, t, u, a, n) {
    var e = a;
    if ((t & 1) === 0 && (t & 2) === 0 && a !== null) l: for (; ; ) {
      if (a === null) return;
      var f = a.tag;
      if (f === 3 || f === 4) {
        var c = a.stateNode.containerInfo;
        if (c === n) break;
        if (f === 4) for (f = a.return; f !== null; ) {
          var i = f.tag;
          if ((i === 3 || i === 4) && f.stateNode.containerInfo === n) return;
          f = f.return;
        }
        for (; c !== null; ) {
          if (f = Vu(c), f === null) return;
          if (i = f.tag, i === 5 || i === 6 || i === 26 || i === 27) {
            a = e = f;
            continue l;
          }
          c = c.parentNode;
        }
      }
      a = a.return;
    }
    Ui(function() {
      var h = e, o = ke(u), z = [];
      l: {
        var S = t0.get(l);
        if (S !== void 0) {
          var g = Bn, U = l;
          switch (l) {
            case "keypress":
              if (qn(u) === 0) break l;
            case "keydown":
            case "keyup":
              g = Hv;
              break;
            case "focusin":
              U = "focus", g = af;
              break;
            case "focusout":
              U = "blur", g = af;
              break;
            case "beforeblur":
            case "afterblur":
              g = af;
              break;
            case "click":
              if (u.button === 2) break l;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              g = qi;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              g = Ev;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              g = qv;
              break;
            case ki:
            case Ii:
            case Pi:
              g = _v;
              break;
            case l0:
              g = Yv;
              break;
            case "scroll":
            case "scrollend":
              g = Av;
              break;
            case "wheel":
              g = Bv;
              break;
            case "copy":
            case "cut":
            case "paste":
              g = Ov;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              g = Bi;
              break;
            case "toggle":
            case "beforetoggle":
              g = Cv;
          }
          var C = (t & 4) !== 0, al = !C && (l === "scroll" || l === "scrollend"), m = C ? S !== null ? S + "Capture" : null : S;
          C = [];
          for (var y = h, d; y !== null; ) {
            var b = y;
            if (d = b.stateNode, b = b.tag, b !== 5 && b !== 26 && b !== 27 || d === null || m === null || (b = qa(y, m), b != null && C.push(vn(y, b, d))), al) break;
            y = y.return;
          }
          0 < C.length && (S = new g(S, U, null, u, o), z.push({
            event: S,
            listeners: C
          }));
        }
      }
      if ((t & 7) === 0) {
        l: {
          if (S = l === "mouseover" || l === "pointerover", g = l === "mouseout" || l === "pointerout", S && u !== Fe && (U = u.relatedTarget || u.fromElement) && (Vu(U) || U[Ua])) break l;
          if ((g || S) && (S = o.window === o ? o : (S = o.ownerDocument) ? S.defaultView || S.parentWindow : window, g ? (U = u.relatedTarget || u.toElement, g = h, U = U ? Vu(U) : null, U !== null && (al = sl(U), C = U.tag, U !== al || C !== 5 && C !== 27 && C !== 6) && (U = null)) : (g = null, U = h), g !== U)) {
            if (C = qi, b = "onMouseLeave", m = "onMouseEnter", y = "mouse", (l === "pointerout" || l === "pointerover") && (C = Bi, b = "onPointerLeave", m = "onPointerEnter", y = "pointer"), al = g == null ? S : Ha(g), d = U == null ? S : Ha(U), S = new C(b, y + "leave", g, u, o), S.target = al, S.relatedTarget = d, b = null, Vu(o) === h && (C = new C(m, y + "enter", U, u, o), C.target = d, C.relatedTarget = al, b = C), al = b, g && U) t: {
              for (C = Cm, m = g, y = U, d = 0, b = m; b; b = C(b)) d++;
              b = 0;
              for (var q = y; q; q = C(q)) b++;
              for (; 0 < d - b; ) m = C(m), d--;
              for (; 0 < b - d; ) y = C(y), b--;
              for (; d--; ) {
                if (m === y || y !== null && m === y.alternate) {
                  C = m;
                  break t;
                }
                m = C(m), y = C(y);
              }
              C = null;
            }
            else C = null;
            g !== null && Ay(z, S, g, C, !1), U !== null && al !== null && Ay(z, al, U, C, !0);
          }
        }
        l: {
          if (S = h ? Ha(h) : window, g = S.nodeName && S.nodeName.toLowerCase(), g === "select" || g === "input" && S.type === "file") var W = Zi;
          else if (Xi(S)) if (Vi) W = Kv;
          else {
            W = Vv;
            var N = Zv;
          }
          else g = S.nodeName, !g || g.toLowerCase() !== "input" || S.type !== "checkbox" && S.type !== "radio" ? h && $e(h.elementType) && (W = Zi) : W = Lv;
          if (W && (W = W(l, h))) {
            Qi(z, W, u, o);
            break l;
          }
          N && N(l, S, h), l === "focusout" && h && S.type === "number" && h.memoizedProps.value != null && we(S, "number", S.value);
        }
        switch (N = h ? Ha(h) : window, l) {
          case "focusin":
            (Xi(N) || N.contentEditable === "true") && (Fu = N, vf = h, Xa = null);
            break;
          case "focusout":
            Xa = vf = Fu = null;
            break;
          case "mousedown":
            mf = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            mf = !1, $i(z, u, o);
            break;
          case "selectionchange":
            if (xv) break;
          case "keydown":
          case "keyup":
            $i(z, u, o);
        }
        var G;
        if (ef) l: {
          switch (l) {
            case "compositionstart":
              var K = "onCompositionStart";
              break l;
            case "compositionend":
              K = "onCompositionEnd";
              break l;
            case "compositionupdate":
              K = "onCompositionUpdate";
              break l;
          }
          K = void 0;
        }
        else $u ? ji(l, u) && (K = "onCompositionEnd") : l === "keydown" && u.keyCode === 229 && (K = "onCompositionStart");
        K && (Ci && u.locale !== "ko" && ($u || K !== "onCompositionStart" ? K === "onCompositionEnd" && $u && (G = Ni()) : (kt = o, lf = "value" in kt ? kt.value : kt.textContent, $u = !0)), N = Ee(h, K), 0 < N.length && (K = new Yi(K, l, null, u, o), z.push({
          event: K,
          listeners: N
        }), G ? K.data = G : (G = Gi(u), G !== null && (K.data = G)))), (G = pv ? jv(l, u) : Gv(l, u)) && (K = Ee(h, "onBeforeInput"), 0 < K.length && (N = new Yi("onBeforeInput", "beforeinput", null, u, o), z.push({
          event: N,
          listeners: K
        }), N.data = G)), Ym(z, l, h, u, o);
      }
      by(z, t);
    });
  }
  function vn(l, t, u) {
    return {
      instance: l,
      listener: t,
      currentTarget: u
    };
  }
  function Ee(l, t) {
    for (var u = t + "Capture", a = []; l !== null; ) {
      var n = l, e = n.stateNode;
      if (n = n.tag, n !== 5 && n !== 26 && n !== 27 || e === null || (n = qa(l, u), n != null && a.unshift(vn(l, n, e)), n = qa(l, t), n != null && a.push(vn(l, n, e))), l.tag === 3) return a;
      l = l.return;
    }
    return [];
  }
  function Cm(l) {
    if (l === null) return null;
    do
      l = l.return;
    while (l && l.tag !== 5 && l.tag !== 27);
    return l || null;
  }
  function Ay(l, t, u, a, n) {
    for (var e = t._reactName, f = []; u !== null && u !== a; ) {
      var c = u, i = c.alternate, h = c.stateNode;
      if (c = c.tag, i !== null && i === a) break;
      c !== 5 && c !== 26 && c !== 27 || h === null || (i = h, n ? (h = qa(u, e), h != null && f.unshift(vn(u, h, i))) : n || (h = qa(u, e), h != null && f.push(vn(u, h, i)))), u = u.return;
    }
    f.length !== 0 && l.push({
      event: t,
      listeners: f
    });
  }
  var Rm = /\r\n?/g, pm = /\u0000|\uFFFD/g;
  function Ey(l) {
    return (typeof l == "string" ? l : "" + l).replace(Rm, `
`).replace(pm, "");
  }
  function _y(l, t) {
    return t = Ey(t), Ey(l) === t;
  }
  function ul(l, t, u, a, n, e) {
    switch (u) {
      case "children":
        typeof a == "string" ? t === "body" || t === "textarea" && a === "" || ru(l, a) : (typeof a == "number" || typeof a == "bigint") && t !== "body" && ru(l, "" + a);
        break;
      case "className":
        Dn(l, "class", a);
        break;
      case "tabIndex":
        Dn(l, "tabindex", a);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        Dn(l, u, a);
        break;
      case "style":
        Mi(l, a, e);
        break;
      case "data":
        if (t !== "object") {
          Dn(l, "data", a);
          break;
        }
      case "src":
      case "href":
        if (a === "" && (t !== "a" || u !== "href")) {
          l.removeAttribute(u);
          break;
        }
        if (a == null || typeof a == "function" || typeof a == "symbol" || typeof a == "boolean") {
          l.removeAttribute(u);
          break;
        }
        a = Nn("" + a), l.setAttribute(u, a);
        break;
      case "action":
      case "formAction":
        if (typeof a == "function") {
          l.setAttribute(u, "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");
          break;
        } else typeof e == "function" && (u === "formAction" ? (t !== "input" && ul(l, t, "name", n.name, n, null), ul(l, t, "formEncType", n.formEncType, n, null), ul(l, t, "formMethod", n.formMethod, n, null), ul(l, t, "formTarget", n.formTarget, n, null)) : (ul(l, t, "encType", n.encType, n, null), ul(l, t, "method", n.method, n, null), ul(l, t, "target", n.target, n, null)));
        if (a == null || typeof a == "symbol" || typeof a == "boolean") {
          l.removeAttribute(u);
          break;
        }
        a = Nn("" + a), l.setAttribute(u, a);
        break;
      case "onClick":
        a != null && (l.onclick = Ht);
        break;
      case "onScroll":
        a != null && V("scroll", l);
        break;
      case "onScrollEnd":
        a != null && V("scrollend", l);
        break;
      case "dangerouslySetInnerHTML":
        if (a != null) {
          if (typeof a != "object" || !("__html" in a)) throw Error(s(61));
          if (u = a.__html, u != null) {
            if (n.children != null) throw Error(s(60));
            l.innerHTML = u;
          }
        }
        break;
      case "multiple":
        l.multiple = a && typeof a != "function" && typeof a != "symbol";
        break;
      case "muted":
        l.muted = a && typeof a != "function" && typeof a != "symbol";
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "ref":
        break;
      case "autoFocus":
        break;
      case "xlinkHref":
        if (a == null || typeof a == "function" || typeof a == "boolean" || typeof a == "symbol") {
          l.removeAttribute("xlink:href");
          break;
        }
        u = Nn("" + a), l.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", u);
        break;
      case "contentEditable":
      case "spellCheck":
      case "draggable":
      case "value":
      case "autoReverse":
      case "externalResourcesRequired":
      case "focusable":
      case "preserveAlpha":
        a != null && typeof a != "function" && typeof a != "symbol" ? l.setAttribute(u, "" + a) : l.removeAttribute(u);
        break;
      case "inert":
      case "allowFullScreen":
      case "async":
      case "autoPlay":
      case "controls":
      case "default":
      case "defer":
      case "disabled":
      case "disablePictureInPicture":
      case "disableRemotePlayback":
      case "formNoValidate":
      case "hidden":
      case "loop":
      case "noModule":
      case "noValidate":
      case "open":
      case "playsInline":
      case "readOnly":
      case "required":
      case "reversed":
      case "scoped":
      case "seamless":
      case "itemScope":
        a && typeof a != "function" && typeof a != "symbol" ? l.setAttribute(u, "") : l.removeAttribute(u);
        break;
      case "capture":
      case "download":
        a === !0 ? l.setAttribute(u, "") : a !== !1 && a != null && typeof a != "function" && typeof a != "symbol" ? l.setAttribute(u, a) : l.removeAttribute(u);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        a != null && typeof a != "function" && typeof a != "symbol" && !isNaN(a) && 1 <= a ? l.setAttribute(u, a) : l.removeAttribute(u);
        break;
      case "rowSpan":
      case "start":
        a == null || typeof a == "function" || typeof a == "symbol" || isNaN(a) ? l.removeAttribute(u) : l.setAttribute(u, a);
        break;
      case "popover":
        V("beforetoggle", l), V("toggle", l), Mn(l, "popover", a);
        break;
      case "xlinkActuate":
        Nt(l, "http://www.w3.org/1999/xlink", "xlink:actuate", a);
        break;
      case "xlinkArcrole":
        Nt(l, "http://www.w3.org/1999/xlink", "xlink:arcrole", a);
        break;
      case "xlinkRole":
        Nt(l, "http://www.w3.org/1999/xlink", "xlink:role", a);
        break;
      case "xlinkShow":
        Nt(l, "http://www.w3.org/1999/xlink", "xlink:show", a);
        break;
      case "xlinkTitle":
        Nt(l, "http://www.w3.org/1999/xlink", "xlink:title", a);
        break;
      case "xlinkType":
        Nt(l, "http://www.w3.org/1999/xlink", "xlink:type", a);
        break;
      case "xmlBase":
        Nt(l, "http://www.w3.org/XML/1998/namespace", "xml:base", a);
        break;
      case "xmlLang":
        Nt(l, "http://www.w3.org/XML/1998/namespace", "xml:lang", a);
        break;
      case "xmlSpace":
        Nt(l, "http://www.w3.org/XML/1998/namespace", "xml:space", a);
        break;
      case "is":
        Mn(l, "is", a);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < u.length) || u[0] !== "o" && u[0] !== "O" || u[1] !== "n" && u[1] !== "N") && (u = zv.get(u) || u, Mn(l, u, a));
    }
  }
  function pc(l, t, u, a, n, e) {
    switch (u) {
      case "style":
        Mi(l, a, e);
        break;
      case "dangerouslySetInnerHTML":
        if (a != null) {
          if (typeof a != "object" || !("__html" in a)) throw Error(s(61));
          if (u = a.__html, u != null) {
            if (n.children != null) throw Error(s(60));
            l.innerHTML = u;
          }
        }
        break;
      case "children":
        typeof a == "string" ? ru(l, a) : (typeof a == "number" || typeof a == "bigint") && ru(l, "" + a);
        break;
      case "onScroll":
        a != null && V("scroll", l);
        break;
      case "onScrollEnd":
        a != null && V("scrollend", l);
        break;
      case "onClick":
        a != null && (l.onclick = Ht);
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "innerHTML":
      case "ref":
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        if (!si.hasOwnProperty(u)) l: {
          if (u[0] === "o" && u[1] === "n" && (n = u.endsWith("Capture"), t = u.slice(2, n ? u.length - 7 : void 0), e = l[Gl] || null, e = e != null ? e[u] : null, typeof e == "function" && l.removeEventListener(t, e, n), typeof a == "function")) {
            typeof e != "function" && e !== null && (u in l ? l[u] = null : l.hasAttribute(u) && l.removeAttribute(u)), l.addEventListener(t, a, n);
            break l;
          }
          u in l ? l[u] = a : a === !0 ? l.setAttribute(u, "") : Mn(l, u, a);
        }
    }
  }
  function ql(l, t, u) {
    switch (t) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "img":
        V("error", l), V("load", l);
        var a = !1, n = !1, e;
        for (e in u) if (u.hasOwnProperty(e)) {
          var f = u[e];
          if (f != null) switch (e) {
            case "src":
              a = !0;
              break;
            case "srcSet":
              n = !0;
              break;
            case "children":
            case "dangerouslySetInnerHTML":
              throw Error(s(137, t));
            default:
              ul(l, t, e, f, u, null);
          }
        }
        n && ul(l, t, "srcSet", u.srcSet, u, null), a && ul(l, t, "src", u.src, u, null);
        return;
      case "input":
        V("invalid", l);
        var c = e = f = n = null, i = null, h = null;
        for (a in u) if (u.hasOwnProperty(a)) {
          var o = u[a];
          if (o != null) switch (a) {
            case "name":
              n = o;
              break;
            case "type":
              f = o;
              break;
            case "checked":
              i = o;
              break;
            case "defaultChecked":
              h = o;
              break;
            case "value":
              e = o;
              break;
            case "defaultValue":
              c = o;
              break;
            case "children":
            case "dangerouslySetInnerHTML":
              if (o != null) throw Error(s(137, t));
              break;
            default:
              ul(l, t, a, o, u, null);
          }
        }
        Ai(l, e, c, i, h, f, n, !1);
        return;
      case "select":
        V("invalid", l), a = f = e = null;
        for (n in u) if (u.hasOwnProperty(n) && (c = u[n], c != null)) switch (n) {
          case "value":
            e = c;
            break;
          case "defaultValue":
            f = c;
            break;
          case "multiple":
            a = c;
          default:
            ul(l, t, n, c, u, null);
        }
        t = e, u = f, l.multiple = !!a, t != null ? xu(l, !!a, t, !1) : u != null && xu(l, !!a, u, !0);
        return;
      case "textarea":
        V("invalid", l), e = n = a = null;
        for (f in u) if (u.hasOwnProperty(f) && (c = u[f], c != null)) switch (f) {
          case "value":
            a = c;
            break;
          case "defaultValue":
            n = c;
            break;
          case "children":
            e = c;
            break;
          case "dangerouslySetInnerHTML":
            if (c != null) throw Error(s(91));
            break;
          default:
            ul(l, t, f, c, u, null);
        }
        _i(l, a, n, e);
        return;
      case "option":
        for (i in u) u.hasOwnProperty(i) && (a = u[i], a != null) && (i === "selected" ? l.selected = a && typeof a != "function" && typeof a != "symbol" : ul(l, t, i, a, u, null));
        return;
      case "dialog":
        V("beforetoggle", l), V("toggle", l), V("cancel", l), V("close", l);
        break;
      case "iframe":
      case "object":
        V("load", l);
        break;
      case "video":
      case "audio":
        for (a = 0; a < yn.length; a++) V(yn[a], l);
        break;
      case "image":
        V("error", l), V("load", l);
        break;
      case "details":
        V("toggle", l);
        break;
      case "embed":
      case "source":
      case "link":
        V("error", l), V("load", l);
      case "area":
      case "base":
      case "br":
      case "col":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "track":
      case "wbr":
      case "menuitem":
        for (h in u) if (u.hasOwnProperty(h) && (a = u[h], a != null)) switch (h) {
          case "children":
          case "dangerouslySetInnerHTML":
            throw Error(s(137, t));
          default:
            ul(l, t, h, a, u, null);
        }
        return;
      default:
        if ($e(t)) {
          for (o in u) u.hasOwnProperty(o) && (a = u[o], a !== void 0 && pc(l, t, o, a, u, void 0));
          return;
        }
    }
    for (c in u) u.hasOwnProperty(c) && (a = u[c], a != null && ul(l, t, c, a, u, null));
  }
  function jm(l, t, u, a) {
    switch (t) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "input":
        var n = null, e = null, f = null, c = null, i = null, h = null, o = null;
        for (g in u) {
          var z = u[g];
          if (u.hasOwnProperty(g) && z != null) switch (g) {
            case "checked":
              break;
            case "value":
              break;
            case "defaultValue":
              i = z;
            default:
              a.hasOwnProperty(g) || ul(l, t, g, null, a, z);
          }
        }
        for (var S in a) {
          var g = a[S];
          if (z = u[S], a.hasOwnProperty(S) && (g != null || z != null)) switch (S) {
            case "type":
              e = g;
              break;
            case "name":
              n = g;
              break;
            case "checked":
              h = g;
              break;
            case "defaultChecked":
              o = g;
              break;
            case "value":
              f = g;
              break;
            case "defaultValue":
              c = g;
              break;
            case "children":
            case "dangerouslySetInnerHTML":
              if (g != null) throw Error(s(137, t));
              break;
            default:
              g !== z && ul(l, t, S, g, a, z);
          }
        }
        We(l, f, c, i, h, o, e, n);
        return;
      case "select":
        g = f = c = S = null;
        for (e in u) if (i = u[e], u.hasOwnProperty(e) && i != null) switch (e) {
          case "value":
            break;
          case "multiple":
            g = i;
          default:
            a.hasOwnProperty(e) || ul(l, t, e, null, a, i);
        }
        for (n in a) if (e = a[n], i = u[n], a.hasOwnProperty(n) && (e != null || i != null)) switch (n) {
          case "value":
            S = e;
            break;
          case "defaultValue":
            c = e;
            break;
          case "multiple":
            f = e;
          default:
            e !== i && ul(l, t, n, e, a, i);
        }
        t = c, u = f, a = g, S != null ? xu(l, !!u, S, !1) : !!a != !!u && (t != null ? xu(l, !!u, t, !0) : xu(l, !!u, u ? [] : "", !1));
        return;
      case "textarea":
        g = S = null;
        for (c in u) if (n = u[c], u.hasOwnProperty(c) && n != null && !a.hasOwnProperty(c)) switch (c) {
          case "value":
            break;
          case "children":
            break;
          default:
            ul(l, t, c, null, a, n);
        }
        for (f in a) if (n = a[f], e = u[f], a.hasOwnProperty(f) && (n != null || e != null)) switch (f) {
          case "value":
            S = n;
            break;
          case "defaultValue":
            g = n;
            break;
          case "children":
            break;
          case "dangerouslySetInnerHTML":
            if (n != null) throw Error(s(91));
            break;
          default:
            n !== e && ul(l, t, f, n, a, e);
        }
        Ei(l, S, g);
        return;
      case "option":
        for (var U in u) S = u[U], u.hasOwnProperty(U) && S != null && !a.hasOwnProperty(U) && (U === "selected" ? l.selected = !1 : ul(l, t, U, null, a, S));
        for (i in a) S = a[i], g = u[i], a.hasOwnProperty(i) && S !== g && (S != null || g != null) && (i === "selected" ? l.selected = S && typeof S != "function" && typeof S != "symbol" : ul(l, t, i, S, a, g));
        return;
      case "img":
      case "link":
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
      case "menuitem":
        for (var C in u) S = u[C], u.hasOwnProperty(C) && S != null && !a.hasOwnProperty(C) && ul(l, t, C, null, a, S);
        for (h in a) if (S = a[h], g = u[h], a.hasOwnProperty(h) && S !== g && (S != null || g != null)) switch (h) {
          case "children":
          case "dangerouslySetInnerHTML":
            if (S != null) throw Error(s(137, t));
            break;
          default:
            ul(l, t, h, S, a, g);
        }
        return;
      default:
        if ($e(t)) {
          for (var al in u) S = u[al], u.hasOwnProperty(al) && S !== void 0 && !a.hasOwnProperty(al) && pc(l, t, al, void 0, a, S);
          for (o in a) S = a[o], g = u[o], !a.hasOwnProperty(o) || S === g || S === void 0 && g === void 0 || pc(l, t, o, S, a, g);
          return;
        }
    }
    for (var m in u) S = u[m], u.hasOwnProperty(m) && S != null && !a.hasOwnProperty(m) && ul(l, t, m, null, a, S);
    for (z in a) S = a[z], g = u[z], !a.hasOwnProperty(z) || S === g || S == null && g == null || ul(l, t, z, S, a, g);
  }
  function Oy(l) {
    switch (l) {
      case "css":
      case "script":
      case "font":
      case "img":
      case "image":
      case "input":
      case "link":
        return !0;
      default:
        return !1;
    }
  }
  function Gm() {
    if (typeof performance.getEntriesByType == "function") {
      for (var l = 0, t = 0, u = performance.getEntriesByType("resource"), a = 0; a < u.length; a++) {
        var n = u[a], e = n.transferSize, f = n.initiatorType, c = n.duration;
        if (e && c && Oy(f)) {
          for (f = 0, c = n.responseEnd, a += 1; a < u.length; a++) {
            var i = u[a], h = i.startTime;
            if (h > c) break;
            var o = i.transferSize, z = i.initiatorType;
            o && Oy(z) && (i = i.responseEnd, f += o * (i < c ? 1 : (c - h) / (i - h)));
          }
          if (--a, t += 8 * (e + f) / (n.duration / 1e3), l++, 10 < l) break;
        }
      }
      if (0 < l) return t / l / 1e6;
    }
    return navigator.connection && (l = navigator.connection.downlink, typeof l == "number") ? l : 5;
  }
  var jc = null, Gc = null;
  function _e(l) {
    return l.nodeType === 9 ? l : l.ownerDocument;
  }
  function My(l) {
    switch (l) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function Dy(l, t) {
    if (l === 0) switch (t) {
      case "svg":
        return 1;
      case "math":
        return 2;
      default:
        return 0;
    }
    return l === 1 && t === "foreignObject" ? 0 : l;
  }
  function Xc(l, t) {
    return l === "textarea" || l === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  var Qc = null;
  function Xm() {
    var l = window.event;
    return l && l.type === "popstate" ? l === Qc ? !1 : (Qc = l, !0) : (Qc = null, !1);
  }
  var Uy = typeof setTimeout == "function" ? setTimeout : void 0, Qm = typeof clearTimeout == "function" ? clearTimeout : void 0, Ny = typeof Promise == "function" ? Promise : void 0, Zm = typeof queueMicrotask == "function" ? queueMicrotask : typeof Ny < "u" ? function(l) {
    return Ny.resolve(null).then(l).catch(Vm);
  } : Uy;
  function Vm(l) {
    setTimeout(function() {
      throw l;
    });
  }
  function du(l) {
    return l === "head";
  }
  function Hy(l, t) {
    var u = t, a = 0;
    do {
      var n = u.nextSibling;
      if (l.removeChild(u), n && n.nodeType === 8) if (u = n.data, u === "/$" || u === "/&") {
        if (a === 0) {
          l.removeChild(n), _a(t);
          return;
        }
        a--;
      } else if (u === "$" || u === "$?" || u === "$~" || u === "$!" || u === "&") a++;
      else if (u === "html") mn(l.ownerDocument.documentElement);
      else if (u === "head") {
        u = l.ownerDocument.head, mn(u);
        for (var e = u.firstChild; e; ) {
          var f = e.nextSibling, c = e.nodeName;
          e[Na] || c === "SCRIPT" || c === "STYLE" || c === "LINK" && e.rel.toLowerCase() === "stylesheet" || u.removeChild(e), e = f;
        }
      } else u === "body" && mn(l.ownerDocument.body);
      u = n;
    } while (u);
    _a(t);
  }
  function qy(l, t) {
    var u = l;
    l = 0;
    do {
      var a = u.nextSibling;
      if (u.nodeType === 1 ? t ? (u._stashedDisplay = u.style.display, u.style.display = "none") : (u.style.display = u._stashedDisplay || "", u.getAttribute("style") === "" && u.removeAttribute("style")) : u.nodeType === 3 && (t ? (u._stashedText = u.nodeValue, u.nodeValue = "") : u.nodeValue = u._stashedText || ""), a && a.nodeType === 8) if (u = a.data, u === "/$") {
        if (l === 0) break;
        l--;
      } else u !== "$" && u !== "$?" && u !== "$~" && u !== "$!" || l++;
      u = a;
    } while (u);
  }
  function Zc(l) {
    var t = l.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var u = t;
      switch (t = t.nextSibling, u.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          Zc(u), xe(u);
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (u.rel.toLowerCase() === "stylesheet") continue;
      }
      l.removeChild(u);
    }
  }
  function Lm(l, t, u, a) {
    for (; l.nodeType === 1; ) {
      var n = u;
      if (l.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!a && (l.nodeName !== "INPUT" || l.type !== "hidden")) break;
      } else if (a) {
        if (!l[Na]) switch (t) {
          case "meta":
            if (!l.hasAttribute("itemprop")) break;
            return l;
          case "link":
            if (e = l.getAttribute("rel"), e === "stylesheet" && l.hasAttribute("data-precedence")) break;
            if (e !== n.rel || l.getAttribute("href") !== (n.href == null || n.href === "" ? null : n.href) || l.getAttribute("crossorigin") !== (n.crossOrigin == null ? null : n.crossOrigin) || l.getAttribute("title") !== (n.title == null ? null : n.title)) break;
            return l;
          case "style":
            if (l.hasAttribute("data-precedence")) break;
            return l;
          case "script":
            if (e = l.getAttribute("src"), (e !== (n.src == null ? null : n.src) || l.getAttribute("type") !== (n.type == null ? null : n.type) || l.getAttribute("crossorigin") !== (n.crossOrigin == null ? null : n.crossOrigin)) && e && l.hasAttribute("async") && !l.hasAttribute("itemprop")) break;
            return l;
          default:
            return l;
        }
      } else if (t === "input" && l.type === "hidden") {
        var e = n.name == null ? null : "" + n.name;
        if (n.type === "hidden" && l.getAttribute("name") === e) return l;
      } else return l;
      if (l = St(l.nextSibling), l === null) break;
    }
    return null;
  }
  function Km(l, t, u) {
    if (t === "") return null;
    for (; l.nodeType !== 3; )
      if ((l.nodeType !== 1 || l.nodeName !== "INPUT" || l.type !== "hidden") && !u || (l = St(l.nextSibling), l === null)) return null;
    return l;
  }
  function Yy(l, t) {
    for (; l.nodeType !== 8; )
      if ((l.nodeType !== 1 || l.nodeName !== "INPUT" || l.type !== "hidden") && !t || (l = St(l.nextSibling), l === null)) return null;
    return l;
  }
  function Vc(l) {
    return l.data === "$?" || l.data === "$~";
  }
  function Lc(l) {
    return l.data === "$!" || l.data === "$?" && l.ownerDocument.readyState !== "loading";
  }
  function Jm(l, t) {
    var u = l.ownerDocument;
    if (l.data === "$~") l._reactRetry = t;
    else if (l.data !== "$?" || u.readyState !== "loading") t();
    else {
      var a = function() {
        t(), u.removeEventListener("DOMContentLoaded", a);
      };
      u.addEventListener("DOMContentLoaded", a), l._reactRetry = a;
    }
  }
  function St(l) {
    for (; l != null; l = l.nextSibling) {
      var t = l.nodeType;
      if (t === 1 || t === 3) break;
      if (t === 8) {
        if (t = l.data, t === "$" || t === "$!" || t === "$?" || t === "$~" || t === "&" || t === "F!" || t === "F") break;
        if (t === "/$" || t === "/&") return null;
      }
    }
    return l;
  }
  var Kc = null;
  function By(l) {
    l = l.nextSibling;
    for (var t = 0; l; ) {
      if (l.nodeType === 8) {
        var u = l.data;
        if (u === "/$" || u === "/&") {
          if (t === 0) return St(l.nextSibling);
          t--;
        } else u !== "$" && u !== "$!" && u !== "$?" && u !== "$~" && u !== "&" || t++;
      }
      l = l.nextSibling;
    }
    return null;
  }
  function Cy(l) {
    l = l.previousSibling;
    for (var t = 0; l; ) {
      if (l.nodeType === 8) {
        var u = l.data;
        if (u === "$" || u === "$!" || u === "$?" || u === "$~" || u === "&") {
          if (t === 0) return l;
          t--;
        } else u !== "/$" && u !== "/&" || t++;
      }
      l = l.previousSibling;
    }
    return null;
  }
  function Ry(l, t, u) {
    switch (t = _e(u), l) {
      case "html":
        if (l = t.documentElement, !l) throw Error(s(452));
        return l;
      case "head":
        if (l = t.head, !l) throw Error(s(453));
        return l;
      case "body":
        if (l = t.body, !l) throw Error(s(454));
        return l;
      default:
        throw Error(s(451));
    }
  }
  function mn(l) {
    for (var t = l.attributes; t.length; ) l.removeAttributeNode(t[0]);
    xe(l);
  }
  var gt = /* @__PURE__ */ new Map(), py = /* @__PURE__ */ new Set();
  function Oe(l) {
    return typeof l.getRootNode == "function" ? l.getRootNode() : l.nodeType === 9 ? l : l.ownerDocument;
  }
  var rt = M.d;
  M.d = {
    f: xm,
    r: rm,
    D: Wm,
    C: wm,
    L: $m,
    m: Fm,
    X: Im,
    S: km,
    M: Pm
  };
  function xm() {
    var l = rt.f(), t = ge();
    return l || t;
  }
  function rm(l) {
    var t = Lu(l);
    t !== null && t.tag === 5 && t.type === "form" ? l1(t) : rt.r(l);
  }
  var Ta = typeof document > "u" ? null : document;
  function jy(l, t, u) {
    var a = Ta;
    if (a && typeof t == "string" && t) {
      var n = ft(t);
      n = 'link[rel="' + l + '"][href="' + n + '"]', typeof u == "string" && (n += '[crossorigin="' + u + '"]'), py.has(n) || (py.add(n), l = {
        rel: l,
        crossOrigin: u,
        href: t
      }, a.querySelector(n) === null && (t = a.createElement("link"), ql(t, "link", l), _l(t), a.head.appendChild(t)));
    }
  }
  function Wm(l) {
    rt.D(l), jy("dns-prefetch", l, null);
  }
  function wm(l, t) {
    rt.C(l, t), jy("preconnect", l, t);
  }
  function $m(l, t, u) {
    rt.L(l, t, u);
    var a = Ta;
    if (a && l && t) {
      var n = 'link[rel="preload"][as="' + ft(t) + '"]';
      t === "image" && u && u.imageSrcSet ? (n += '[imagesrcset="' + ft(u.imageSrcSet) + '"]', typeof u.imageSizes == "string" && (n += '[imagesizes="' + ft(u.imageSizes) + '"]')) : n += '[href="' + ft(l) + '"]';
      var e = n;
      switch (t) {
        case "style":
          e = Aa(l);
          break;
        case "script":
          e = Ea(l);
      }
      gt.has(e) || (l = B({
        rel: "preload",
        href: t === "image" && u && u.imageSrcSet ? void 0 : l,
        as: t
      }, u), gt.set(e, l), a.querySelector(n) !== null || t === "style" && a.querySelector(dn(e)) || t === "script" && a.querySelector(hn(e)) || (t = a.createElement("link"), ql(t, "link", l), _l(t), a.head.appendChild(t)));
    }
  }
  function Fm(l, t) {
    rt.m(l, t);
    var u = Ta;
    if (u && l) {
      var a = t && typeof t.as == "string" ? t.as : "script", n = 'link[rel="modulepreload"][as="' + ft(a) + '"][href="' + ft(l) + '"]', e = n;
      switch (a) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          e = Ea(l);
      }
      if (!gt.has(e) && (l = B({
        rel: "modulepreload",
        href: l
      }, t), gt.set(e, l), u.querySelector(n) === null)) {
        switch (a) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (u.querySelector(hn(e))) return;
        }
        a = u.createElement("link"), ql(a, "link", l), _l(a), u.head.appendChild(a);
      }
    }
  }
  function km(l, t, u) {
    rt.S(l, t, u);
    var a = Ta;
    if (a && l) {
      var n = Ku(a).hoistableStyles, e = Aa(l);
      t = t || "default";
      var f = n.get(e);
      if (!f) {
        var c = {
          loading: 0,
          preload: null
        };
        if (f = a.querySelector(dn(e))) c.loading = 5;
        else {
          l = B({
            rel: "stylesheet",
            href: l,
            "data-precedence": t
          }, u), (u = gt.get(e)) && Jc(l, u);
          var i = f = a.createElement("link");
          _l(i), ql(i, "link", l), i._p = new Promise(function(h, o) {
            i.onload = h, i.onerror = o;
          }), i.addEventListener("load", function() {
            c.loading |= 1;
          }), i.addEventListener("error", function() {
            c.loading |= 2;
          }), c.loading |= 4, Me(f, t, a);
        }
        f = {
          type: "stylesheet",
          instance: f,
          count: 1,
          state: c
        }, n.set(e, f);
      }
    }
  }
  function Im(l, t) {
    rt.X(l, t);
    var u = Ta;
    if (u && l) {
      var a = Ku(u).hoistableScripts, n = Ea(l), e = a.get(n);
      e || (e = u.querySelector(hn(n)), e || (l = B({
        src: l,
        async: !0
      }, t), (t = gt.get(n)) && xc(l, t), e = u.createElement("script"), _l(e), ql(e, "link", l), u.head.appendChild(e)), e = {
        type: "script",
        instance: e,
        count: 1,
        state: null
      }, a.set(n, e));
    }
  }
  function Pm(l, t) {
    rt.M(l, t);
    var u = Ta;
    if (u && l) {
      var a = Ku(u).hoistableScripts, n = Ea(l), e = a.get(n);
      e || (e = u.querySelector(hn(n)), e || (l = B({
        src: l,
        async: !0,
        type: "module"
      }, t), (t = gt.get(n)) && xc(l, t), e = u.createElement("script"), _l(e), ql(e, "link", l), u.head.appendChild(e)), e = {
        type: "script",
        instance: e,
        count: 1,
        state: null
      }, a.set(n, e));
    }
  }
  function Gy(l, t, u, a) {
    var n = (n = Q.current) ? Oe(n) : null;
    if (!n) throw Error(s(446));
    switch (l) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof u.precedence == "string" && typeof u.href == "string" ? (t = Aa(u.href), u = Ku(n).hoistableStyles, a = u.get(t), a || (a = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, u.set(t, a)), a) : {
          type: "void",
          instance: null,
          count: 0,
          state: null
        };
      case "link":
        if (u.rel === "stylesheet" && typeof u.href == "string" && typeof u.precedence == "string") {
          l = Aa(u.href);
          var e = Ku(n).hoistableStyles, f = e.get(l);
          if (f || (n = n.ownerDocument || n, f = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: {
              loading: 0,
              preload: null
            }
          }, e.set(l, f), (e = n.querySelector(dn(l))) && !e._p && (f.instance = e, f.state.loading = 5), gt.has(l) || (u = {
            rel: "preload",
            as: "style",
            href: u.href,
            crossOrigin: u.crossOrigin,
            integrity: u.integrity,
            media: u.media,
            hrefLang: u.hrefLang,
            referrerPolicy: u.referrerPolicy
          }, gt.set(l, u), e || ld(n, l, u, f.state))), t && a === null) throw Error(s(528, ""));
          return f;
        }
        if (t && a !== null) throw Error(s(529, ""));
        return null;
      case "script":
        return t = u.async, u = u.src, typeof u == "string" && t && typeof t != "function" && typeof t != "symbol" ? (t = Ea(u), u = Ku(n).hoistableScripts, a = u.get(t), a || (a = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, u.set(t, a)), a) : {
          type: "void",
          instance: null,
          count: 0,
          state: null
        };
      default:
        throw Error(s(444, l));
    }
  }
  function Aa(l) {
    return 'href="' + ft(l) + '"';
  }
  function dn(l) {
    return 'link[rel="stylesheet"][' + l + "]";
  }
  function Xy(l) {
    return B({}, l, {
      "data-precedence": l.precedence,
      precedence: null
    });
  }
  function ld(l, t, u, a) {
    l.querySelector('link[rel="preload"][as="style"][' + t + "]") ? a.loading = 1 : (t = l.createElement("link"), a.preload = t, t.addEventListener("load", function() {
      return a.loading |= 1;
    }), t.addEventListener("error", function() {
      return a.loading |= 2;
    }), ql(t, "link", u), _l(t), l.head.appendChild(t));
  }
  function Ea(l) {
    return '[src="' + ft(l) + '"]';
  }
  function hn(l) {
    return "script[async]" + l;
  }
  function Qy(l, t, u) {
    if (t.count++, t.instance === null) switch (t.type) {
      case "style":
        var a = l.querySelector('style[data-href~="' + ft(u.href) + '"]');
        if (a) return t.instance = a, _l(a), a;
        var n = B({}, u, {
          "data-href": u.href,
          "data-precedence": u.precedence,
          href: null,
          precedence: null
        });
        return a = (l.ownerDocument || l).createElement("style"), _l(a), ql(a, "style", n), Me(a, u.precedence, l), t.instance = a;
      case "stylesheet":
        n = Aa(u.href);
        var e = l.querySelector(dn(n));
        if (e) return t.state.loading |= 4, t.instance = e, _l(e), e;
        a = Xy(u), (n = gt.get(n)) && Jc(a, n), e = (l.ownerDocument || l).createElement("link"), _l(e);
        var f = e;
        return f._p = new Promise(function(c, i) {
          f.onload = c, f.onerror = i;
        }), ql(e, "link", a), t.state.loading |= 4, Me(e, u.precedence, l), t.instance = e;
      case "script":
        return e = Ea(u.src), (n = l.querySelector(hn(e))) ? (t.instance = n, _l(n), n) : (a = u, (n = gt.get(e)) && (a = B({}, u), xc(a, n)), l = l.ownerDocument || l, n = l.createElement("script"), _l(n), ql(n, "link", a), l.head.appendChild(n), t.instance = n);
      case "void":
        return null;
      default:
        throw Error(s(443, t.type));
    }
    else t.type === "stylesheet" && (t.state.loading & 4) === 0 && (a = t.instance, t.state.loading |= 4, Me(a, u.precedence, l));
    return t.instance;
  }
  function Me(l, t, u) {
    for (var a = u.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'), n = a.length ? a[a.length - 1] : null, e = n, f = 0; f < a.length; f++) {
      var c = a[f];
      if (c.dataset.precedence === t) e = c;
      else if (e !== n) break;
    }
    e ? e.parentNode.insertBefore(l, e.nextSibling) : (t = u.nodeType === 9 ? u.head : u, t.insertBefore(l, t.firstChild));
  }
  function Jc(l, t) {
    l.crossOrigin ??= t.crossOrigin, l.referrerPolicy ??= t.referrerPolicy, l.title ??= t.title;
  }
  function xc(l, t) {
    l.crossOrigin ??= t.crossOrigin, l.referrerPolicy ??= t.referrerPolicy, l.integrity ??= t.integrity;
  }
  var De = null;
  function Zy(l, t, u) {
    if (De === null) {
      var a = /* @__PURE__ */ new Map(), n = De = /* @__PURE__ */ new Map();
      n.set(u, a);
    } else n = De, a = n.get(u), a || (a = /* @__PURE__ */ new Map(), n.set(u, a));
    if (a.has(l)) return a;
    for (a.set(l, null), u = u.getElementsByTagName(l), n = 0; n < u.length; n++) {
      var e = u[n];
      if (!(e[Na] || e[Dl] || l === "link" && e.getAttribute("rel") === "stylesheet") && e.namespaceURI !== "http://www.w3.org/2000/svg") {
        var f = e.getAttribute(t) || "";
        f = l + f;
        var c = a.get(f);
        c ? c.push(e) : a.set(f, [e]);
      }
    }
    return a;
  }
  function Vy(l, t, u) {
    l = l.ownerDocument || l, l.head.insertBefore(u, t === "title" ? l.querySelector("head > title") : null);
  }
  function td(l, t, u) {
    if (u === 1 || t.itemProp != null) return !1;
    switch (l) {
      case "meta":
      case "title":
        return !0;
      case "style":
        if (typeof t.precedence != "string" || typeof t.href != "string" || t.href === "") break;
        return !0;
      case "link":
        if (typeof t.rel != "string" || typeof t.href != "string" || t.href === "" || t.onLoad || t.onError) break;
        return t.rel === "stylesheet" ? (l = t.disabled, typeof t.precedence == "string" && l == null) : !0;
      case "script":
        if (t.async && typeof t.async != "function" && typeof t.async != "symbol" && !t.onLoad && !t.onError && t.src && typeof t.src == "string") return !0;
    }
    return !1;
  }
  function Ly(l) {
    return !(l.type === "stylesheet" && (l.state.loading & 3) === 0);
  }
  function ud(l, t, u, a) {
    if (u.type === "stylesheet" && (typeof a.media != "string" || matchMedia(a.media).matches !== !1) && (u.state.loading & 4) === 0) {
      if (u.instance === null) {
        var n = Aa(a.href), e = t.querySelector(dn(n));
        if (e) {
          t = e._p, t !== null && typeof t == "object" && typeof t.then == "function" && (l.count++, l = Ue.bind(l), t.then(l, l)), u.state.loading |= 4, u.instance = e, _l(e);
          return;
        }
        e = t.ownerDocument || t, a = Xy(a), (n = gt.get(n)) && Jc(a, n), e = e.createElement("link"), _l(e);
        var f = e;
        f._p = new Promise(function(c, i) {
          f.onload = c, f.onerror = i;
        }), ql(e, "link", a), u.instance = e;
      }
      l.stylesheets === null && (l.stylesheets = /* @__PURE__ */ new Map()), l.stylesheets.set(u, t), (t = u.state.preload) && (u.state.loading & 3) === 0 && (l.count++, u = Ue.bind(l), t.addEventListener("load", u), t.addEventListener("error", u));
    }
  }
  var rc = 0;
  function ad(l, t) {
    return l.stylesheets && l.count === 0 && He(l, l.stylesheets), 0 < l.count || 0 < l.imgCount ? function(u) {
      var a = setTimeout(function() {
        if (l.stylesheets && He(l, l.stylesheets), l.unsuspend) {
          var e = l.unsuspend;
          l.unsuspend = null, e();
        }
      }, 6e4 + t);
      0 < l.imgBytes && rc === 0 && (rc = 62500 * Gm());
      var n = setTimeout(function() {
        if (l.waitingForImages = !1, l.count === 0 && (l.stylesheets && He(l, l.stylesheets), l.unsuspend)) {
          var e = l.unsuspend;
          l.unsuspend = null, e();
        }
      }, (l.imgBytes > rc ? 50 : 800) + t);
      return l.unsuspend = u, function() {
        l.unsuspend = null, clearTimeout(a), clearTimeout(n);
      };
    } : null;
  }
  function Ue() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) He(this, this.stylesheets);
      else if (this.unsuspend) {
        var l = this.unsuspend;
        this.unsuspend = null, l();
      }
    }
  }
  var Ne = null;
  function He(l, t) {
    l.stylesheets = null, l.unsuspend !== null && (l.count++, Ne = /* @__PURE__ */ new Map(), t.forEach(nd, l), Ne = null, Ue.call(l));
  }
  function nd(l, t) {
    if (!(t.state.loading & 4)) {
      var u = Ne.get(l);
      if (u) var a = u.get(null);
      else {
        u = /* @__PURE__ */ new Map(), Ne.set(l, u);
        for (var n = l.querySelectorAll("link[data-precedence],style[data-precedence]"), e = 0; e < n.length; e++) {
          var f = n[e];
          (f.nodeName === "LINK" || f.getAttribute("media") !== "not all") && (u.set(f.dataset.precedence, f), a = f);
        }
        a && u.set(null, a);
      }
      n = t.instance, f = n.getAttribute("data-precedence"), e = u.get(f) || a, e === a && u.set(null, n), u.set(f, n), this.count++, a = Ue.bind(this), n.addEventListener("load", a), n.addEventListener("error", a), e ? e.parentNode.insertBefore(n, e.nextSibling) : (l = l.nodeType === 9 ? l.head : l, l.insertBefore(n, l.firstChild)), t.state.loading |= 4;
    }
  }
  var Sn = {
    $$typeof: El,
    Provider: null,
    Consumer: null,
    _currentValue: $,
    _currentValue2: $,
    _threadCount: 0
  };
  function ed(l, t, u, a, n, e, f, c, i) {
    this.tag = 1, this.containerInfo = l, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Le(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Le(0), this.hiddenUpdates = Le(null), this.identifierPrefix = a, this.onUncaughtError = n, this.onCaughtError = e, this.onRecoverableError = f, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = i, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function fd(l, t, u, a, n, e, f, c, i, h, o, z) {
    return l = new ed(l, t, u, f, i, h, o, z, c), t = 1, e === !0 && (t |= 24), e = lt(3, null, null, t), l.current = e, e.stateNode = l, t = Df(), t.refCount++, l.pooledCache = t, t.refCount++, e.memoizedState = {
      element: a,
      isDehydrated: u,
      cache: t
    }, qf(e), l;
  }
  function cd(l) {
    return l ? (l = Pu, l) : Pu;
  }
  function Ky(l, t, u, a, n, e) {
    n = cd(n), a.context === null ? a.context = n : a.pendingContext = n, a = Ru(t), a.payload = { element: u }, e = e === void 0 ? null : e, e !== null && (a.callback = e), u = pu(l, a, t), u !== null && (Kl(u, l, t), xa(u, l, t));
  }
  function Jy(l, t) {
    if (l = l.memoizedState, l !== null && l.dehydrated !== null) {
      var u = l.retryLane;
      l.retryLane = u !== 0 && u < t ? u : t;
    }
  }
  function Wc(l, t) {
    Jy(l, t), (l = l.alternate) && Jy(l, t);
  }
  function xy(l) {
    if (l.tag === 13 || l.tag === 31) {
      var t = Mu(l, 67108864);
      t !== null && Kl(t, l, 67108864), Wc(l, 67108864);
    }
  }
  function ry(l) {
    if (l.tag === 13 || l.tag === 31) {
      var t = ht();
      t = mi(t);
      var u = Mu(l, t);
      u !== null && Kl(u, l, t), Wc(l, t);
    }
  }
  var qe = !0;
  function id(l, t, u, a) {
    var n = _.T;
    _.T = null;
    var e = M.p;
    try {
      M.p = 2, wc(l, t, u, a);
    } finally {
      M.p = e, _.T = n;
    }
  }
  function yd(l, t, u, a) {
    var n = _.T;
    _.T = null;
    var e = M.p;
    try {
      M.p = 8, wc(l, t, u, a);
    } finally {
      M.p = e, _.T = n;
    }
  }
  function wc(l, t, u, a) {
    if (qe) {
      var n = $c(a);
      if (n === null) Rc(l, t, a, Ye, u), wy(l, a);
      else if (md(n, l, t, u, a)) a.stopPropagation();
      else if (wy(l, a), t & 4 && -1 < vd.indexOf(l)) {
        for (; n !== null; ) {
          var e = Lu(n);
          if (e !== null) switch (e.tag) {
            case 3:
              if (e = e.stateNode, e.current.memoizedState.isDehydrated) {
                var f = Tu(e.pendingLanes);
                if (f !== 0) {
                  var c = e;
                  for (c.pendingLanes |= 2, c.entangledLanes |= 2; f; ) {
                    var i = 1 << 31 - Il(f);
                    c.entanglements[1] |= i, f &= ~i;
                  }
                  xt(e), (F & 6) === 0 && (he = Fl() + 500, cn(0, !1));
                }
              }
              break;
            case 31:
            case 13:
              c = Mu(e, 2), c !== null && Kl(c, e, 2), ge(), Wc(e, 2);
          }
          if (e = $c(a), e === null && Rc(l, t, a, Ye, u), e === n) break;
          n = e;
        }
        n !== null && a.stopPropagation();
      } else Rc(l, t, a, null, u);
    }
  }
  function $c(l) {
    return l = ke(l), Fc(l);
  }
  var Ye = null;
  function Fc(l) {
    if (Ye = null, l = Vu(l), l !== null) {
      var t = sl(l);
      if (t === null) l = null;
      else {
        var u = t.tag;
        if (u === 13) {
          if (l = Yl(t), l !== null) return l;
          l = null;
        } else if (u === 31) {
          if (l = vl(t), l !== null) return l;
          l = null;
        } else if (u === 3) {
          if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
          l = null;
        } else t !== l && (l = null);
      }
    }
    return Ye = l, null;
  }
  function Wy(l) {
    switch (l) {
      case "beforetoggle":
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "toggle":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 2;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 8;
      case "message":
        switch (av()) {
          case ni:
            return 2;
          case ei:
            return 8;
          case zn:
          case nv:
            return 32;
          case fi:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var kc = !1, hu = null, Su = null, gu = null, gn = /* @__PURE__ */ new Map(), sn = /* @__PURE__ */ new Map(), su = [], vd = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");
  function wy(l, t) {
    switch (l) {
      case "focusin":
      case "focusout":
        hu = null;
        break;
      case "dragenter":
      case "dragleave":
        Su = null;
        break;
      case "mouseover":
      case "mouseout":
        gu = null;
        break;
      case "pointerover":
      case "pointerout":
        gn.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        sn.delete(t.pointerId);
    }
  }
  function on(l, t, u, a, n, e) {
    return l === null || l.nativeEvent !== e ? (l = {
      blockedOn: t,
      domEventName: u,
      eventSystemFlags: a,
      nativeEvent: e,
      targetContainers: [n]
    }, t !== null && (t = Lu(t), t !== null && xy(t)), l) : (l.eventSystemFlags |= a, t = l.targetContainers, n !== null && t.indexOf(n) === -1 && t.push(n), l);
  }
  function md(l, t, u, a, n) {
    switch (t) {
      case "focusin":
        return hu = on(hu, l, t, u, a, n), !0;
      case "dragenter":
        return Su = on(Su, l, t, u, a, n), !0;
      case "mouseover":
        return gu = on(gu, l, t, u, a, n), !0;
      case "pointerover":
        var e = n.pointerId;
        return gn.set(e, on(gn.get(e) || null, l, t, u, a, n)), !0;
      case "gotpointercapture":
        return e = n.pointerId, sn.set(e, on(sn.get(e) || null, l, t, u, a, n)), !0;
    }
    return !1;
  }
  function $y(l) {
    var t = Vu(l.target);
    if (t !== null) {
      var u = sl(t);
      if (u !== null) {
        if (t = u.tag, t === 13) {
          if (t = Yl(u), t !== null) {
            l.blockedOn = t, hi(l.priority, function() {
              ry(u);
            });
            return;
          }
        } else if (t === 31) {
          if (t = vl(u), t !== null) {
            l.blockedOn = t, hi(l.priority, function() {
              ry(u);
            });
            return;
          }
        } else if (t === 3 && u.stateNode.current.memoizedState.isDehydrated) {
          l.blockedOn = u.tag === 3 ? u.stateNode.containerInfo : null;
          return;
        }
      }
    }
    l.blockedOn = null;
  }
  function Be(l) {
    if (l.blockedOn !== null) return !1;
    for (var t = l.targetContainers; 0 < t.length; ) {
      var u = $c(l.nativeEvent);
      if (u === null) {
        u = l.nativeEvent;
        var a = new u.constructor(u.type, u);
        Fe = a, u.target.dispatchEvent(a), Fe = null;
      } else return t = Lu(u), t !== null && xy(t), l.blockedOn = u, !1;
      t.shift();
    }
    return !0;
  }
  function Fy(l, t, u) {
    Be(l) && u.delete(t);
  }
  function dd() {
    kc = !1, hu !== null && Be(hu) && (hu = null), Su !== null && Be(Su) && (Su = null), gu !== null && Be(gu) && (gu = null), gn.forEach(Fy), sn.forEach(Fy);
  }
  function Ce(l, t) {
    l.blockedOn === t && (l.blockedOn = null, kc || (kc = !0, R.unstable_scheduleCallback(R.unstable_NormalPriority, dd)));
  }
  var Re = null;
  function ky(l) {
    Re !== l && (Re = l, R.unstable_scheduleCallback(R.unstable_NormalPriority, function() {
      Re === l && (Re = null);
      for (var t = 0; t < l.length; t += 3) {
        var u = l[t], a = l[t + 1], n = l[t + 2];
        if (typeof a != "function") {
          if (Fc(a || u) === null) continue;
          break;
        }
        var e = Lu(u);
        e !== null && (l.splice(t, 3), t -= 3, Ff(e, {
          pending: !0,
          data: n,
          method: u.method,
          action: a
        }, a, n));
      }
    }));
  }
  function _a(l) {
    function t(i) {
      return Ce(i, l);
    }
    hu !== null && Ce(hu, l), Su !== null && Ce(Su, l), gu !== null && Ce(gu, l), gn.forEach(t), sn.forEach(t);
    for (var u = 0; u < su.length; u++) {
      var a = su[u];
      a.blockedOn === l && (a.blockedOn = null);
    }
    for (; 0 < su.length && (u = su[0], u.blockedOn === null); ) $y(u), u.blockedOn === null && su.shift();
    if (u = (l.ownerDocument || l).$$reactFormReplay, u != null) for (a = 0; a < u.length; a += 3) {
      var n = u[a], e = u[a + 1], f = n[Gl] || null;
      if (typeof e == "function") f || ky(u);
      else if (f) {
        var c = null;
        if (e && e.hasAttribute("formAction")) {
          if (n = e, f = e[Gl] || null) c = f.formAction;
          else if (Fc(n) !== null) continue;
        } else c = f.action;
        typeof c == "function" ? u[a + 1] = c : (u.splice(a, 3), a -= 3), ky(u);
      }
    }
  }
  function hd() {
    function l(e) {
      e.canIntercept && e.info === "react-transition" && e.intercept({
        handler: function() {
          return new Promise(function(f) {
            return n = f;
          });
        },
        focusReset: "manual",
        scroll: "manual"
      });
    }
    function t() {
      n !== null && (n(), n = null), a || setTimeout(u, 20);
    }
    function u() {
      if (!a && !navigation.transition) {
        var e = navigation.currentEntry;
        e && e.url != null && navigation.navigate(e.url, {
          state: e.getState(),
          info: "react-transition",
          history: "replace"
        });
      }
    }
    if (typeof navigation == "object") {
      var a = !1, n = null;
      return navigation.addEventListener("navigate", l), navigation.addEventListener("navigatesuccess", t), navigation.addEventListener("navigateerror", t), setTimeout(u, 100), function() {
        a = !0, navigation.removeEventListener("navigate", l), navigation.removeEventListener("navigatesuccess", t), navigation.removeEventListener("navigateerror", t), n !== null && (n(), n = null);
      };
    }
  }
  function Ic(l) {
    this._internalRoot = l;
  }
  Pc.prototype.render = Ic.prototype.render = function(l) {
    var t = this._internalRoot;
    if (t === null) throw Error(s(409));
    var u = t.current;
    Ky(u, ht(), l, t, null, null);
  }, Pc.prototype.unmount = Ic.prototype.unmount = function() {
    var l = this._internalRoot;
    if (l !== null) {
      this._internalRoot = null;
      var t = l.containerInfo;
      Ky(l.current, 2, null, l, null, null), ge(), t[Ua] = null;
    }
  };
  function Pc(l) {
    this._internalRoot = l;
  }
  Pc.prototype.unstable_scheduleHydration = function(l) {
    if (l) {
      var t = di();
      l = {
        blockedOn: null,
        target: l,
        priority: t
      };
      for (var u = 0; u < su.length && t !== 0 && t < su[u].priority; u++) ;
      su.splice(u, 0, l), u === 0 && $y(l);
    }
  };
  var Iy = x.version;
  if (Iy !== "19.2.6") throw Error(s(527, Iy, "19.2.6"));
  M.findDOMNode = function(l) {
    var t = l._reactInternals;
    if (t === void 0)
      throw typeof l.render == "function" ? Error(s(188)) : (l = Object.keys(l).join(","), Error(s(268, l)));
    return l = E(t), l = l !== null ? j(l) : null, l = l === null ? null : l.stateNode, l;
  };
  var Sd = {
    bundleType: 0,
    version: "19.2.6",
    rendererPackageName: "react-dom",
    currentDispatcherRef: _,
    reconcilerVersion: "19.2.6"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var pe = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!pe.isDisabled && pe.supportsFiber) try {
      Ma = pe.inject(Sd), kl = pe;
    } catch {
    }
  }
  A.createRoot = function(l, t) {
    if (!Ml(l)) throw Error(s(299));
    var u = !1, a = "", n = ym, e = vm, f = mm;
    return t != null && (t.unstable_strictMode === !0 && (u = !0), t.identifierPrefix !== void 0 && (a = t.identifierPrefix), t.onUncaughtError !== void 0 && (n = t.onUncaughtError), t.onCaughtError !== void 0 && (e = t.onCaughtError), t.onRecoverableError !== void 0 && (f = t.onRecoverableError)), t = fd(l, 1, !1, null, null, u, a, null, n, e, f, hd), l[Ua] = t.current, zy(l), new Ic(t);
  };
})), Ed = /* @__PURE__ */ Ut(((A, R) => {
  function x() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(x);
      } catch (I) {
        console.error(I);
      }
  }
  x(), R.exports = Ad();
})), _d = /* @__PURE__ */ Ut(((A) => {
  var R = /* @__PURE__ */ Symbol.for("react.transitional.element"), x = /* @__PURE__ */ Symbol.for("react.fragment");
  function I(s, Ml, sl) {
    var Yl = null;
    if (sl !== void 0 && (Yl = "" + sl), Ml.key !== void 0 && (Yl = "" + Ml.key), "key" in Ml) {
      sl = {};
      for (var vl in Ml) vl !== "key" && (sl[vl] = Ml[vl]);
    } else sl = Ml;
    return Ml = sl.ref, {
      $$typeof: R,
      type: s,
      key: Yl,
      ref: Ml !== void 0 ? Ml : null,
      props: sl
    };
  }
  A.jsx = I, A.jsxs = I;
})), Od = /* @__PURE__ */ Ut(((A, R) => {
  R.exports = _d();
})), Md = ti(), Dd = Ed(), el = Od(), li = {
  stage: {
    name: "Stage",
    label: "Condition recipe loaded",
    primary: "± 4 mm",
    primaryNote: "target pose tolerance",
    secondary: "6 / 6",
    secondaryNote: "required objects present",
    footer: "Scene recipe / PRS-047"
  },
  verify: {
    name: "Verify",
    label: "Start state verified",
    primary: "99.2%",
    primaryNote: "condition match",
    secondary: "Clear",
    secondaryNote: "occlusion gate",
    footer: "Vision gate / frame 1842"
  },
  compare: {
    name: "Compare",
    label: "Policy delta isolated",
    primary: "+12 pts",
    primaryNote: "success-rate change",
    secondary: "3",
    secondaryNote: "failure surfaces found",
    footer: "v0.19.3 / versus v0.18.7"
  }
};
function Ud() {
  const [A, R] = (0, Md.useState)("stage"), x = li[A];
  return /* @__PURE__ */ (0, el.jsxs)("div", {
    className: "eval-console",
    children: [
      /* @__PURE__ */ (0, el.jsxs)("div", {
        className: "eval-toolbar",
        children: [/* @__PURE__ */ (0, el.jsx)("span", { children: "Prism station 02" }), /* @__PURE__ */ (0, el.jsx)("strong", { children: "Evaluation 047" })]
      }),
      /* @__PURE__ */ (0, el.jsx)("div", {
        className: "eval-tabs",
        role: "tablist",
        "aria-label": "Evaluation phases",
        children: Object.keys(li).map((I) => /* @__PURE__ */ (0, el.jsx)("button", {
          className: "eval-tab",
          type: "button",
          role: "tab",
          "aria-selected": A === I,
          onClick: () => R(I),
          children: li[I].name
        }, I))
      }),
      /* @__PURE__ */ (0, el.jsxs)("section", {
        className: "eval-stage",
        role: "tabpanel",
        "aria-live": "polite",
        children: [/* @__PURE__ */ (0, el.jsxs)("div", {
          className: "eval-visual",
          "aria-hidden": "true",
          children: [
            /* @__PURE__ */ (0, el.jsx)("div", { className: "eval-axis" }),
            /* @__PURE__ */ (0, el.jsx)("div", { className: "eval-object" }),
            /* @__PURE__ */ (0, el.jsx)("div", { className: "eval-scan" }),
            /* @__PURE__ */ (0, el.jsxs)("div", {
              className: "eval-stage-label",
              children: [/* @__PURE__ */ (0, el.jsx)("i", {}), x.label]
            })
          ]
        }), /* @__PURE__ */ (0, el.jsxs)("div", {
          className: "eval-detail",
          children: [/* @__PURE__ */ (0, el.jsxs)("div", { children: [
            /* @__PURE__ */ (0, el.jsx)("label", { children: x.primaryNote }),
            /* @__PURE__ */ (0, el.jsx)("strong", { children: x.primary }),
            /* @__PURE__ */ (0, el.jsx)("p", { children: "Measured against the registered physical condition." })
          ] }), /* @__PURE__ */ (0, el.jsxs)("div", { children: [
            /* @__PURE__ */ (0, el.jsx)("label", { children: x.secondaryNote }),
            /* @__PURE__ */ (0, el.jsx)("strong", { children: x.secondary }),
            /* @__PURE__ */ (0, el.jsx)("p", { children: "Stored with the run for policy-to-policy comparison." })
          ] })]
        })]
      }),
      /* @__PURE__ */ (0, el.jsxs)("div", {
        className: "eval-footer",
        children: [/* @__PURE__ */ (0, el.jsx)("span", { children: x.footer }), /* @__PURE__ */ (0, el.jsx)("strong", { children: "World state valid" })]
      })
    ]
  });
}
var Py = document.getElementById("prism-console");
Py && (0, Dd.createRoot)(Py).render(/* @__PURE__ */ (0, el.jsx)(Ud, {}));
