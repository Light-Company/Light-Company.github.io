var Ut = (A, C) => () => (C || (A((C = { exports: {} }).exports, C), A = null), C.exports), gd = /* @__PURE__ */ Ut(((A) => {
  function C(D, _) {
    var M = D.length;
    D.push(_);
    l: for (; 0 < M; ) {
      var $ = M - 1 >>> 1, nl = D[$];
      if (0 < s(nl, _)) D[$] = _, D[M] = nl, M = $;
      else break l;
    }
  }
  function al(D) {
    return D.length === 0 ? null : D[0];
  }
  function cl(D) {
    if (D.length === 0) return null;
    var _ = D[0], M = D.pop();
    if (M !== _) {
      D[0] = M;
      l: for (var $ = 0, nl = D.length, rl = nl >>> 1; $ < rl; ) {
        var v = 2 * ($ + 1) - 1, T = D[v], O = v + 1, N = D[O];
        if (0 > s(T, M)) O < nl && 0 > s(N, T) ? (D[$] = N, D[O] = M, $ = O) : (D[$] = T, D[v] = M, $ = v);
        else if (O < nl && 0 > s(N, M)) D[$] = N, D[O] = M, $ = O;
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
  var yl = [], Y = [], E = 1, j = null, B = 3, st = !1, Bl = !1, pl = !1, Jl = !1, wt = typeof setTimeout == "function" ? setTimeout : null, xl = typeof clearTimeout == "function" ? clearTimeout : null, $t = typeof setImmediate < "u" ? setImmediate : null;
  function El(D) {
    for (var _ = al(Y); _ !== null; ) {
      if (_.callback === null) cl(Y);
      else if (_.startTime <= D) cl(Y), _.sortIndex = _.expirationTime, C(yl, _);
      else break;
      _ = al(Y);
    }
  }
  function bt(D) {
    if (pl = !1, El(D), !Bl) if (al(yl) !== null) Bl = !0, Wl || (Wl = !0, $l());
    else {
      var _ = al(Y);
      _ !== null && ot(bt, _.startTime - D);
    }
  }
  var Wl = !1, wl = -1, x = 5, jl = -1;
  function Et() {
    return Jl ? !0 : !(A.unstable_now() - jl < x);
  }
  function ou() {
    if (Jl = !1, Wl) {
      var D = A.unstable_now();
      jl = D;
      var _ = !0;
      try {
        l: {
          Bl = !1, pl && (pl = !1, xl(wl), wl = -1), st = !0;
          var M = B;
          try {
            t: {
              for (El(D), j = al(yl); j !== null && !(j.expirationTime > D && Et()); ) {
                var $ = j.callback;
                if (typeof $ == "function") {
                  j.callback = null, B = j.priorityLevel;
                  var nl = $(j.expirationTime <= D);
                  if (D = A.unstable_now(), typeof nl == "function") {
                    j.callback = nl, El(D), _ = !0;
                    break t;
                  }
                  j === al(yl) && cl(yl), El(D);
                } else cl(yl);
                j = al(yl);
              }
              if (j !== null) _ = !0;
              else {
                var rl = al(Y);
                rl !== null && ot(bt, rl.startTime - D), _ = !1;
              }
            }
            break l;
          } finally {
            j = null, B = M, st = !1;
          }
          _ = void 0;
        }
      } finally {
        _ ? $l() : Wl = !1;
      }
    }
  }
  var $l;
  if (typeof $t == "function") $l = function() {
    $t(ou);
  };
  else if (typeof MessageChannel < "u") {
    var _t = new MessageChannel(), Zu = _t.port2;
    _t.port1.onmessage = ou, $l = function() {
      Zu.postMessage(null);
    };
  } else $l = function() {
    wt(ou, 0);
  };
  function ot(D, _) {
    wl = wt(function() {
      D(A.unstable_now());
    }, _);
  }
  A.unstable_IdlePriority = 5, A.unstable_ImmediatePriority = 1, A.unstable_LowPriority = 4, A.unstable_NormalPriority = 3, A.unstable_Profiling = null, A.unstable_UserBlockingPriority = 2, A.unstable_cancelCallback = function(D) {
    D.callback = null;
  }, A.unstable_forceFrameRate = function(D) {
    0 > D || 125 < D ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : x = 0 < D ? Math.floor(1e3 / D) : 5;
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
        var nl = -1;
        break;
      case 2:
        nl = 250;
        break;
      case 5:
        nl = 1073741823;
        break;
      case 4:
        nl = 1e4;
        break;
      default:
        nl = 5e3;
    }
    return nl = M + nl, D = {
      id: E++,
      callback: _,
      priorityLevel: D,
      startTime: M,
      expirationTime: nl,
      sortIndex: -1
    }, M > $ ? (D.sortIndex = M, C(Y, D), al(yl) === null && D === al(Y) && (pl ? (xl(wl), wl = -1) : pl = !0, ot(bt, M - $))) : (D.sortIndex = nl, C(yl, D), Bl || st || (Bl = !0, Wl || (Wl = !0, $l()))), D;
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
})), sd = /* @__PURE__ */ Ut(((A, C) => {
  C.exports = gd();
})), bd = /* @__PURE__ */ Ut(((A) => {
  var C = /* @__PURE__ */ Symbol.for("react.transitional.element"), al = /* @__PURE__ */ Symbol.for("react.portal"), cl = /* @__PURE__ */ Symbol.for("react.fragment"), s = /* @__PURE__ */ Symbol.for("react.strict_mode"), Ml = /* @__PURE__ */ Symbol.for("react.profiler"), sl = /* @__PURE__ */ Symbol.for("react.consumer"), Yl = /* @__PURE__ */ Symbol.for("react.context"), yl = /* @__PURE__ */ Symbol.for("react.forward_ref"), Y = /* @__PURE__ */ Symbol.for("react.suspense"), E = /* @__PURE__ */ Symbol.for("react.memo"), j = /* @__PURE__ */ Symbol.for("react.lazy"), B = /* @__PURE__ */ Symbol.for("react.activity"), st = Symbol.iterator;
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
  }, Jl = Object.assign, wt = {};
  function xl(v, T, O) {
    this.props = v, this.context = T, this.refs = wt, this.updater = O || pl;
  }
  xl.prototype.isReactComponent = {}, xl.prototype.setState = function(v, T) {
    if (typeof v != "object" && typeof v != "function" && v != null) throw Error("takes an object of state variables to update or a function which returns an object of state variables.");
    this.updater.enqueueSetState(this, v, T, "setState");
  }, xl.prototype.forceUpdate = function(v) {
    this.updater.enqueueForceUpdate(this, v, "forceUpdate");
  };
  function $t() {
  }
  $t.prototype = xl.prototype;
  function El(v, T, O) {
    this.props = v, this.context = T, this.refs = wt, this.updater = O || pl;
  }
  var bt = El.prototype = new $t();
  bt.constructor = El, Jl(bt, xl.prototype), bt.isPureReactComponent = !0;
  var Wl = Array.isArray;
  function wl() {
  }
  var x = {
    H: null,
    A: null,
    T: null,
    S: null
  }, jl = Object.prototype.hasOwnProperty;
  function Et(v, T, O) {
    var N = O.ref;
    return {
      $$typeof: C,
      type: v,
      key: T,
      ref: N !== void 0 ? N : null,
      props: O
    };
  }
  function ou(v, T) {
    return Et(v.type, T, v.props);
  }
  function $l(v) {
    return typeof v == "object" && v !== null && v.$$typeof === C;
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
  function ot(v, T) {
    return typeof v == "object" && v !== null && v.key != null ? _t("" + v.key) : T.toString(36);
  }
  function D(v) {
    switch (v.status) {
      case "fulfilled":
        return v.value;
      case "rejected":
        throw v.reason;
      default:
        switch (typeof v.status == "string" ? v.then(wl, wl) : (v.status = "pending", v.then(function(T) {
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
  function _(v, T, O, N, X) {
    var Q = typeof v;
    (Q === "undefined" || Q === "boolean") && (v = null);
    var F = !1;
    if (v === null) F = !0;
    else switch (Q) {
      case "bigint":
      case "string":
      case "number":
        F = !0;
        break;
      case "object":
        switch (v.$$typeof) {
          case C:
          case al:
            F = !0;
            break;
          case j:
            return F = v._init, _(F(v._payload), T, O, N, X);
        }
    }
    if (F) return X = X(v), F = N === "" ? "." + ot(v, 0) : N, Wl(X) ? (O = "", F != null && (O = F.replace(Zu, "$&/") + "/"), _(X, T, O, "", function(Oa) {
      return Oa;
    })) : X != null && ($l(X) && (X = ou(X, O + (X.key == null || v && v.key === X.key ? "" : ("" + X.key).replace(Zu, "$&/") + "/") + F)), T.push(X)), 1;
    F = 0;
    var Rl = N === "" ? "." : N + ":";
    if (Wl(v)) for (var dl = 0; dl < v.length; dl++) N = v[dl], Q = Rl + ot(N, dl), F += _(N, T, O, Q, X);
    else if (dl = Bl(v), typeof dl == "function") for (v = dl.call(v), dl = 0; !(N = v.next()).done; ) N = N.value, Q = Rl + ot(N, dl++), F += _(N, T, O, Q, X);
    else if (Q === "object") {
      if (typeof v.then == "function") return _(D(v), T, O, N, X);
      throw T = String(v), Error("Objects are not valid as a React child (found: " + (T === "[object Object]" ? "object with keys {" + Object.keys(v).join(", ") + "}" : T) + "). If you meant to render a collection of children, use an array instead.");
    }
    return F;
  }
  function M(v, T, O) {
    if (v == null) return v;
    var N = [], X = 0;
    return _(v, N, "", "", function(Q) {
      return T.call(O, Q, X++);
    }), N;
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
  var nl = typeof reportError == "function" ? reportError : function(v) {
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
  }, rl = {
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
      if (!$l(v)) throw Error("React.Children.only expected to receive a single React element child.");
      return v;
    }
  };
  A.Activity = B, A.Children = rl, A.Component = xl, A.Fragment = cl, A.Profiler = Ml, A.PureComponent = El, A.StrictMode = s, A.Suspense = Y, A.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = x, A.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(v) {
      return x.H.useMemoCache(v);
    }
  }, A.cache = function(v) {
    return function() {
      return v.apply(null, arguments);
    };
  }, A.cacheSignal = function() {
    return null;
  }, A.cloneElement = function(v, T, O) {
    if (v == null) throw Error("The argument must be a React element, but you passed " + v + ".");
    var N = Jl({}, v.props), X = v.key;
    if (T != null) for (Q in T.key !== void 0 && (X = "" + T.key), T) !jl.call(T, Q) || Q === "key" || Q === "__self" || Q === "__source" || Q === "ref" && T.ref === void 0 || (N[Q] = T[Q]);
    var Q = arguments.length - 2;
    if (Q === 1) N.children = O;
    else if (1 < Q) {
      for (var F = Array(Q), Rl = 0; Rl < Q; Rl++) F[Rl] = arguments[Rl + 2];
      N.children = F;
    }
    return Et(v.type, X, N);
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
    var N, X = {}, Q = null;
    if (T != null) for (N in T.key !== void 0 && (Q = "" + T.key), T) jl.call(T, N) && N !== "key" && N !== "__self" && N !== "__source" && (X[N] = T[N]);
    var F = arguments.length - 2;
    if (F === 1) X.children = O;
    else if (1 < F) {
      for (var Rl = Array(F), dl = 0; dl < F; dl++) Rl[dl] = arguments[dl + 2];
      X.children = Rl;
    }
    if (v && v.defaultProps) for (N in F = v.defaultProps, F) X[N] === void 0 && (X[N] = F[N]);
    return Et(v, Q, X);
  }, A.createRef = function() {
    return { current: null };
  }, A.forwardRef = function(v) {
    return {
      $$typeof: yl,
      render: v
    };
  }, A.isValidElement = $l, A.lazy = function(v) {
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
    var T = x.T, O = {};
    x.T = O;
    try {
      var N = v(), X = x.S;
      X !== null && X(O, N), typeof N == "object" && N !== null && typeof N.then == "function" && N.then(wl, nl);
    } catch (Q) {
      nl(Q);
    } finally {
      T !== null && O.types !== null && (T.types = O.types), x.T = T;
    }
  }, A.unstable_useCacheRefresh = function() {
    return x.H.useCacheRefresh();
  }, A.use = function(v) {
    return x.H.use(v);
  }, A.useActionState = function(v, T, O) {
    return x.H.useActionState(v, T, O);
  }, A.useCallback = function(v, T) {
    return x.H.useCallback(v, T);
  }, A.useContext = function(v) {
    return x.H.useContext(v);
  }, A.useDebugValue = function() {
  }, A.useDeferredValue = function(v, T) {
    return x.H.useDeferredValue(v, T);
  }, A.useEffect = function(v, T) {
    return x.H.useEffect(v, T);
  }, A.useEffectEvent = function(v) {
    return x.H.useEffectEvent(v);
  }, A.useId = function() {
    return x.H.useId();
  }, A.useImperativeHandle = function(v, T, O) {
    return x.H.useImperativeHandle(v, T, O);
  }, A.useInsertionEffect = function(v, T) {
    return x.H.useInsertionEffect(v, T);
  }, A.useLayoutEffect = function(v, T) {
    return x.H.useLayoutEffect(v, T);
  }, A.useMemo = function(v, T) {
    return x.H.useMemo(v, T);
  }, A.useOptimistic = function(v, T) {
    return x.H.useOptimistic(v, T);
  }, A.useReducer = function(v, T, O) {
    return x.H.useReducer(v, T, O);
  }, A.useRef = function(v) {
    return x.H.useRef(v);
  }, A.useState = function(v) {
    return x.H.useState(v);
  }, A.useSyncExternalStore = function(v, T, O) {
    return x.H.useSyncExternalStore(v, T, O);
  }, A.useTransition = function() {
    return x.H.useTransition();
  }, A.version = "19.2.6";
})), Iy = /* @__PURE__ */ Ut(((A, C) => {
  C.exports = bd();
})), od = /* @__PURE__ */ Ut(((A) => {
  var C = Iy();
  function al(Y) {
    var E = "https://react.dev/errors/" + Y;
    if (1 < arguments.length) {
      E += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var j = 2; j < arguments.length; j++) E += "&args[]=" + encodeURIComponent(arguments[j]);
    }
    return "Minified React error #" + Y + "; visit " + E + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function cl() {
  }
  var s = {
    d: {
      f: cl,
      r: function() {
        throw Error(al(522));
      },
      D: cl,
      C: cl,
      L: cl,
      m: cl,
      X: cl,
      S: cl,
      M: cl
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
  var Yl = C.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function yl(Y, E) {
    if (Y === "font") return "";
    if (typeof E == "string") return E === "use-credentials" ? E : "";
  }
  A.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = s, A.createPortal = function(Y, E) {
    var j = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!E || E.nodeType !== 1 && E.nodeType !== 9 && E.nodeType !== 11) throw Error(al(299));
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
      var j = E.as, B = yl(j, E.crossOrigin), st = typeof E.integrity == "string" ? E.integrity : void 0, Bl = typeof E.fetchPriority == "string" ? E.fetchPriority : void 0;
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
        var j = yl(E.as, E.crossOrigin);
        s.d.M(Y, {
          crossOrigin: j,
          integrity: typeof E.integrity == "string" ? E.integrity : void 0,
          nonce: typeof E.nonce == "string" ? E.nonce : void 0
        });
      }
    } else E ?? s.d.M(Y);
  }, A.preload = function(Y, E) {
    if (typeof Y == "string" && typeof E == "object" && E !== null && typeof E.as == "string") {
      var j = E.as, B = yl(j, E.crossOrigin);
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
      var j = yl(E.as, E.crossOrigin);
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
})), zd = /* @__PURE__ */ Ut(((A, C) => {
  function al() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(al);
      } catch (cl) {
        console.error(cl);
      }
  }
  al(), C.exports = od();
})), Td = /* @__PURE__ */ Ut(((A) => {
  var C = sd(), al = Iy(), cl = zd();
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
  function yl(l) {
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
  var B = Object.assign, st = /* @__PURE__ */ Symbol.for("react.element"), Bl = /* @__PURE__ */ Symbol.for("react.transitional.element"), pl = /* @__PURE__ */ Symbol.for("react.portal"), Jl = /* @__PURE__ */ Symbol.for("react.fragment"), wt = /* @__PURE__ */ Symbol.for("react.strict_mode"), xl = /* @__PURE__ */ Symbol.for("react.profiler"), $t = /* @__PURE__ */ Symbol.for("react.consumer"), El = /* @__PURE__ */ Symbol.for("react.context"), bt = /* @__PURE__ */ Symbol.for("react.forward_ref"), Wl = /* @__PURE__ */ Symbol.for("react.suspense"), wl = /* @__PURE__ */ Symbol.for("react.suspense_list"), x = /* @__PURE__ */ Symbol.for("react.memo"), jl = /* @__PURE__ */ Symbol.for("react.lazy"), Et = /* @__PURE__ */ Symbol.for("react.activity"), ou = /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel"), $l = Symbol.iterator;
  function _t(l) {
    return l === null || typeof l != "object" ? null : (l = $l && l[$l] || l["@@iterator"], typeof l == "function" ? l : null);
  }
  var Zu = /* @__PURE__ */ Symbol.for("react.client.reference");
  function ot(l) {
    if (l == null) return null;
    if (typeof l == "function") return l.$$typeof === Zu ? null : l.displayName || l.name || null;
    if (typeof l == "string") return l;
    switch (l) {
      case Jl:
        return "Fragment";
      case xl:
        return "Profiler";
      case wt:
        return "StrictMode";
      case Wl:
        return "Suspense";
      case wl:
        return "SuspenseList";
      case Et:
        return "Activity";
    }
    if (typeof l == "object") switch (l.$$typeof) {
      case pl:
        return "Portal";
      case El:
        return l.displayName || "Context";
      case $t:
        return (l._context.displayName || "Context") + ".Consumer";
      case bt:
        var t = l.render;
        return l = l.displayName, l || (l = t.displayName || t.name || "", l = l !== "" ? "ForwardRef(" + l + ")" : "ForwardRef"), l;
      case x:
        return t = l.displayName || null, t !== null ? t : ot(l.type) || "Memo";
      case jl:
        t = l._payload, l = l._init;
        try {
          return ot(l(t));
        } catch {
        }
    }
    return null;
  }
  var D = Array.isArray, _ = al.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, M = cl.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, $ = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, nl = [], rl = -1;
  function v(l) {
    return { current: l };
  }
  function T(l) {
    0 > rl || (l.current = nl[rl], nl[rl] = null, rl--);
  }
  function O(l, t) {
    rl++, nl[rl] = l.current, l.current = t;
  }
  var N = v(null), X = v(null), Q = v(null), F = v(null);
  function Rl(l, t) {
    switch (O(Q, t), O(X, l), O(N, null), t.nodeType) {
      case 9:
      case 11:
        l = (l = t.documentElement) && (l = l.namespaceURI) ? _y(l) : 0;
        break;
      default:
        if (l = t.tagName, t = t.namespaceURI) t = _y(t), l = Oy(t, l);
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
    T(N), O(N, l);
  }
  function dl() {
    T(N), T(X), T(Q);
  }
  function Oa(l) {
    l.memoizedState !== null && O(F, l);
    var t = N.current, u = Oy(t, l.type);
    t !== u && (O(X, l), O(N, u));
  }
  function on(l) {
    X.current === l && (T(N), T(X)), F.current === l && (T(F), Sn._currentValue = $);
  }
  var je, li;
  function zu(l) {
    if (je === void 0) try {
      throw Error();
    } catch (u) {
      var t = u.stack.trim().match(/\n( *(at )?)/);
      je = t && t[1] || "", li = -1 < u.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < u.stack.indexOf("@") ? "@unknown:0:0" : "";
    }
    return `
` + je + l + li;
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
              var b = `
` + i[a].replace(" at new ", " at ");
              return l.displayName && b.includes("<anonymous>") && (b = b.replace("<anonymous>", l.displayName)), b;
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
  function Py(l, t) {
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
  function ti(l) {
    try {
      var t = "", u = null;
      do
        t += Py(l, u), u = l, l = l.return;
      while (l);
      return t;
    } catch (a) {
      return `
Error generating stack: ` + a.message + `
` + a.stack;
    }
  }
  var Qe = Object.prototype.hasOwnProperty, Ze = C.unstable_scheduleCallback, Ve = C.unstable_cancelCallback, lv = C.unstable_shouldYield, tv = C.unstable_requestPaint, Fl = C.unstable_now, uv = C.unstable_getCurrentPriorityLevel, ui = C.unstable_ImmediatePriority, ai = C.unstable_UserBlockingPriority, zn = C.unstable_NormalPriority, av = C.unstable_LowPriority, ni = C.unstable_IdlePriority, nv = C.log, ev = C.unstable_setDisableYieldValue, Ma = null, kl = null;
  function rt(l) {
    if (typeof nv == "function" && ev(l), kl && typeof kl.setStrictMode == "function") try {
      kl.setStrictMode(Ma, l);
    } catch {
    }
  }
  var Il = Math.clz32 ? Math.clz32 : iv, fv = Math.log, cv = Math.LN2;
  function iv(l) {
    return l >>>= 0, l === 0 ? 32 : 31 - (fv(l) / cv | 0) | 0;
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
  function yv(l, t) {
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
  function ei() {
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
  function vv(l, t, u, a, n, e) {
    var f = l.pendingLanes;
    l.pendingLanes = u, l.suspendedLanes = 0, l.pingedLanes = 0, l.warmLanes = 0, l.expiredLanes &= u, l.entangledLanes &= u, l.errorRecoveryDisabledLanes &= u, l.shellSuspendCounter = 0;
    var c = l.entanglements, i = l.expirationTimes, h = l.hiddenUpdates;
    for (u = f & ~u; 0 < u; ) {
      var b = 31 - Il(u), z = 1 << b;
      c[b] = 0, i[b] = -1;
      var S = h[b];
      if (S !== null) for (h[b] = null, b = 0; b < S.length; b++) {
        var g = S[b];
        g !== null && (g.lane &= -536870913);
      }
      u &= ~z;
    }
    a !== 0 && fi(l, a, 0), e !== 0 && n === 0 && l.tag !== 0 && (l.suspendedLanes |= e & ~(f & ~t));
  }
  function fi(l, t, u) {
    l.pendingLanes |= t, l.suspendedLanes &= ~t;
    var a = 31 - Il(t);
    l.entangledLanes |= t, l.entanglements[a] = l.entanglements[a] | 1073741824 | u & 261930;
  }
  function ci(l, t) {
    var u = l.entangledLanes |= t;
    for (l = l.entanglements; u; ) {
      var a = 31 - Il(u), n = 1 << a;
      n & t | l[a] & t && (l[a] |= t), u &= ~n;
    }
  }
  function ii(l, t) {
    var u = t & -t;
    return u = (u & 42) !== 0 ? 1 : yi(u), (u & (l.suspendedLanes | t)) !== 0 ? 0 : u;
  }
  function yi(l) {
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
  function vi() {
    var l = M.p;
    return l !== 0 ? l : (l = window.event, l === void 0 ? 32 : xy(l.type));
  }
  function mi(l, t) {
    var u = M.p;
    try {
      return M.p = l, t();
    } finally {
      M.p = u;
    }
  }
  var Ft = Math.random().toString(36).slice(2), Dl = "__reactFiber$" + Ft, Gl = "__reactProps$" + Ft, Ua = "__reactContainer$" + Ft, Je = "__reactEvents$" + Ft, mv = "__reactListeners$" + Ft, dv = "__reactHandles$" + Ft, di = "__reactResources$" + Ft, Ha = "__reactMarker$" + Ft;
  function xe(l) {
    delete l[Dl], delete l[Gl], delete l[Je], delete l[mv], delete l[dv];
  }
  function Vu(l) {
    var t = l[Dl];
    if (t) return t;
    for (var u = l.parentNode; u; ) {
      if (t = u[Ua] || u[Dl]) {
        if (u = t.alternate, t.child !== null || u !== null && u.child !== null) for (l = Yy(l); l !== null; ) {
          if (u = l[Dl]) return u;
          l = Yy(l);
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
  function Na(l) {
    var t = l.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return l.stateNode;
    throw Error(s(33));
  }
  function Ku(l) {
    var t = l[di];
    return t || (t = l[di] = {
      hoistableStyles: /* @__PURE__ */ new Map(),
      hoistableScripts: /* @__PURE__ */ new Map()
    }), t;
  }
  function _l(l) {
    l[Ha] = !0;
  }
  var hi = /* @__PURE__ */ new Set(), Si = {};
  function Au(l, t) {
    Ju(l, t), Ju(l + "Capture", t);
  }
  function Ju(l, t) {
    for (Si[l] = t, l = 0; l < t.length; l++) hi.add(t[l]);
  }
  var hv = RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"), gi = {}, si = {};
  function Sv(l) {
    return Qe.call(si, l) ? !0 : Qe.call(gi, l) ? !1 : hv.test(l) ? si[l] = !0 : (gi[l] = !0, !1);
  }
  function Mn(l, t, u) {
    if (Sv(t)) if (u === null) l.removeAttribute(t);
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
  function Ht(l, t, u, a) {
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
  function bi(l) {
    var t = l.type;
    return (l = l.nodeName) && l.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
  }
  function gv(l, t, u) {
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
  function We(l) {
    if (!l._valueTracker) {
      var t = bi(l) ? "checked" : "value";
      l._valueTracker = gv(l, t, "" + l[t]);
    }
  }
  function oi(l) {
    if (!l) return !1;
    var t = l._valueTracker;
    if (!t) return !0;
    var u = t.getValue(), a = "";
    return l && (a = bi(l) ? l.checked ? "true" : "false" : l.value), l = a, l !== u ? (t.setValue(l), !0) : !1;
  }
  function Un(l) {
    if (l = l || (typeof document < "u" ? document : void 0), typeof l > "u") return null;
    try {
      return l.activeElement || l.body;
    } catch {
      return l.body;
    }
  }
  var sv = /[\n"\\]/g;
  function ft(l) {
    return l.replace(sv, function(t) {
      return "\\" + t.charCodeAt(0).toString(16) + " ";
    });
  }
  function we(l, t, u, a, n, e, f, c) {
    l.name = "", f != null && typeof f != "function" && typeof f != "symbol" && typeof f != "boolean" ? l.type = f : l.removeAttribute("type"), t != null ? f === "number" ? (t === 0 && l.value === "" || l.value != t) && (l.value = "" + et(t)) : l.value !== "" + et(t) && (l.value = "" + et(t)) : f !== "submit" && f !== "reset" || l.removeAttribute("value"), t != null ? $e(l, f, et(t)) : u != null ? $e(l, f, et(u)) : a != null && l.removeAttribute("value"), n == null && e != null && (l.defaultChecked = !!e), n != null && (l.checked = n && typeof n != "function" && typeof n != "symbol"), c != null && typeof c != "function" && typeof c != "symbol" && typeof c != "boolean" ? l.name = "" + et(c) : l.removeAttribute("name");
  }
  function zi(l, t, u, a, n, e, f, c) {
    if (e != null && typeof e != "function" && typeof e != "symbol" && typeof e != "boolean" && (l.type = e), t != null || u != null) {
      if (!(e !== "submit" && e !== "reset" || t != null)) {
        We(l);
        return;
      }
      u = u != null ? "" + et(u) : "", t = t != null ? "" + et(t) : u, c || t === l.value || (l.value = t), l.defaultValue = t;
    }
    a = a ?? n, a = typeof a != "function" && typeof a != "symbol" && !!a, l.checked = c ? l.checked : !!a, l.defaultChecked = !!a, f != null && typeof f != "function" && typeof f != "symbol" && typeof f != "boolean" && (l.name = f), We(l);
  }
  function $e(l, t, u) {
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
  function Ti(l, t, u) {
    if (t != null && (t = "" + et(t), t !== l.value && (l.value = t), u == null)) {
      l.defaultValue !== t && (l.defaultValue = t);
      return;
    }
    l.defaultValue = u != null ? "" + et(u) : "";
  }
  function Ai(l, t, u, a) {
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
    u = et(t), l.defaultValue = u, a = l.textContent, a === u && a !== "" && a !== null && (l.value = a), We(l);
  }
  function Wu(l, t) {
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
  function Ei(l, t, u) {
    var a = t.indexOf("--") === 0;
    u == null || typeof u == "boolean" || u === "" ? a ? l.setProperty(t, "") : t === "float" ? l.cssFloat = "" : l[t] = "" : a ? l.setProperty(t, u) : typeof u != "number" || u === 0 || bv.has(t) ? t === "float" ? l.cssFloat = u : l[t] = ("" + u).trim() : l[t] = u + "px";
  }
  function _i(l, t, u) {
    if (t != null && typeof t != "object") throw Error(s(62));
    if (l = l.style, u != null) {
      for (var a in u) !u.hasOwnProperty(a) || t != null && t.hasOwnProperty(a) || (a.indexOf("--") === 0 ? l.setProperty(a, "") : a === "float" ? l.cssFloat = "" : l[a] = "");
      for (var n in t) a = t[n], t.hasOwnProperty(n) && u[n] !== a && Ei(l, n, a);
    } else for (var e in t) t.hasOwnProperty(e) && Ei(l, e, t[e]);
  }
  function re(l) {
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
  var ov = /* @__PURE__ */ new Map([
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
  ]), zv = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Hn(l) {
    return zv.test("" + l) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : l;
  }
  function Nt() {
  }
  var Fe = null;
  function ke(l) {
    return l = l.target || l.srcElement || window, l.correspondingUseElement && (l = l.correspondingUseElement), l.nodeType === 3 ? l.parentNode : l;
  }
  var wu = null, $u = null;
  function Oi(l) {
    var t = Lu(l);
    if (t && (l = t.stateNode)) {
      var u = l[Gl] || null;
      l: switch (l = t.stateNode, t.type) {
        case "input":
          if (we(l, u.value, u.defaultValue, u.defaultValue, u.checked, u.defaultChecked, u.type, u.name), t = u.name, u.type === "radio" && t != null) {
            for (u = l; u.parentNode; ) u = u.parentNode;
            for (u = u.querySelectorAll('input[name="' + ft("" + t) + '"][type="radio"]'), t = 0; t < u.length; t++) {
              var a = u[t];
              if (a !== l && a.form === l.form) {
                var n = a[Gl] || null;
                if (!n) throw Error(s(90));
                we(a, n.value, n.defaultValue, n.defaultValue, n.checked, n.defaultChecked, n.type, n.name);
              }
            }
            for (t = 0; t < u.length; t++) a = u[t], a.form === l.form && oi(a);
          }
          break l;
        case "textarea":
          Ti(l, u.value, u.defaultValue);
          break l;
        case "select":
          t = u.value, t != null && xu(l, !!u.multiple, t, !1);
      }
    }
  }
  var Ie = !1;
  function Mi(l, t, u) {
    if (Ie) return l(t, u);
    Ie = !0;
    try {
      return l(t);
    } finally {
      if (Ie = !1, (wu !== null || $u !== null) && (ge(), wu && (t = wu, l = $u, $u = wu = null, Oi(t), l)))
        for (t = 0; t < l.length; t++) Oi(l[t]);
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
  var kt = null, lf = null, Nn = null;
  function Di() {
    if (Nn) return Nn;
    var l, t = lf, u = t.length, a, n = "value" in kt ? kt.value : kt.textContent, e = n.length;
    for (l = 0; l < u && t[l] === n[l]; l++) ;
    var f = u - l;
    for (a = 1; a <= f && t[u - a] === n[e - a]; a++) ;
    return Nn = n.slice(l, 1 < a ? 1 - a : void 0);
  }
  function qn(l) {
    var t = l.keyCode;
    return "charCode" in l ? (l = l.charCode, l === 0 && t === 13 && (l = 13)) : l = t, l === 10 && (l = 13), 32 <= l || l === 13 ? l : 0;
  }
  function Yn() {
    return !0;
  }
  function Ui() {
    return !1;
  }
  function Xl(l) {
    function t(u, a, n, e, f) {
      this._reactName = u, this._targetInst = n, this.type = a, this.nativeEvent = e, this.target = f, this.currentTarget = null;
      for (var c in l) l.hasOwnProperty(c) && (u = l[c], this[c] = u ? u(e) : e[c]);
      return this.isDefaultPrevented = (e.defaultPrevented != null ? e.defaultPrevented : e.returnValue === !1) ? Yn : Ui, this.isPropagationStopped = Ui, this;
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
  }), Tv = Xl(Ba), tf, uf, Ra, Rn = B({}, Ba, {
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
      return "movementX" in l ? l.movementX : (l !== Ra && (Ra && l.type === "mousemove" ? (tf = l.screenX - Ra.screenX, uf = l.screenY - Ra.screenY) : uf = tf = 0, Ra = l), tf);
    },
    movementY: function(l) {
      return "movementY" in l ? l.movementY : uf;
    }
  }), Hi = Xl(Rn), Av = Xl(B({}, Rn, { dataTransfer: 0 })), af = Xl(B({}, Ba, { relatedTarget: 0 })), Ev = Xl(B({}, Eu, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  })), _v = Xl(B({}, Eu, { clipboardData: function(l) {
    return "clipboardData" in l ? l.clipboardData : window.clipboardData;
  } })), Ni = Xl(B({}, Eu, { data: 0 })), Ov = {
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
  }, Mv = {
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
  }, Dv = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function Uv(l) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(l) : (l = Dv[l]) ? !!t[l] : !1;
  }
  function nf() {
    return Uv;
  }
  var Hv = Xl(B({}, Ba, {
    key: function(l) {
      if (l.key) {
        var t = Ov[l.key] || l.key;
        if (t !== "Unidentified") return t;
      }
      return l.type === "keypress" ? (l = qn(l), l === 13 ? "Enter" : String.fromCharCode(l)) : l.type === "keydown" || l.type === "keyup" ? Mv[l.keyCode] || "Unidentified" : "";
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
  })), qi = Xl(B({}, Rn, {
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
  })), Nv = Xl(B({}, Ba, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: nf
  })), qv = Xl(B({}, Eu, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  })), Yv = Xl(B({}, Rn, {
    deltaX: function(l) {
      return "deltaX" in l ? l.deltaX : "wheelDeltaX" in l ? -l.wheelDeltaX : 0;
    },
    deltaY: function(l) {
      return "deltaY" in l ? l.deltaY : "wheelDeltaY" in l ? -l.wheelDeltaY : "wheelDelta" in l ? -l.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  })), Bv = Xl(B({}, Eu, {
    newState: 0,
    oldState: 0
  })), Rv = [
    9,
    13,
    27,
    32
  ], ef = qt && "CompositionEvent" in window, Ca = null;
  qt && "documentMode" in document && (Ca = document.documentMode);
  var Cv = qt && "TextEvent" in window && !Ca, Yi = qt && (!ef || Ca && 8 < Ca && 11 >= Ca), Bi = " ", Ri = !1;
  function Ci(l, t) {
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
  function pi(l) {
    return l = l.detail, typeof l == "object" && "data" in l ? l.data : null;
  }
  var ru = !1;
  function pv(l, t) {
    switch (l) {
      case "compositionend":
        return pi(t);
      case "keypress":
        return t.which !== 32 ? null : (Ri = !0, Bi);
      case "textInput":
        return l = t.data, l === Bi && Ri ? null : l;
      default:
        return null;
    }
  }
  function jv(l, t) {
    if (ru) return l === "compositionend" || !ef && Ci(l, t) ? (l = Di(), Nn = lf = kt = null, ru = !1, l) : null;
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
        return Yi && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var Gv = {
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
  function ji(l) {
    var t = l && l.nodeName && l.nodeName.toLowerCase();
    return t === "input" ? !!Gv[l.type] : t === "textarea";
  }
  function Gi(l, t, u, a) {
    wu ? $u ? $u.push(a) : $u = [a] : wu = a, t = Ee(t, "onChange"), 0 < t.length && (u = new Bn("onChange", "change", null, u, a), l.push({
      event: u,
      listeners: t
    }));
  }
  var pa = null, ja = null;
  function Xv(l) {
    sy(l, 0);
  }
  function Cn(l) {
    if (oi(Na(l))) return l;
  }
  function Xi(l, t) {
    if (l === "change") return t;
  }
  var Qi = !1;
  if (qt) {
    var ff;
    if (qt) {
      var cf = "oninput" in document;
      if (!cf) {
        var Zi = document.createElement("div");
        Zi.setAttribute("oninput", "return;"), cf = typeof Zi.oninput == "function";
      }
      ff = cf;
    } else ff = !1;
    Qi = ff && (!document.documentMode || 9 < document.documentMode);
  }
  function Vi() {
    pa && (pa.detachEvent("onpropertychange", Li), ja = pa = null);
  }
  function Li(l) {
    if (l.propertyName === "value" && Cn(ja)) {
      var t = [];
      Gi(t, ja, l, ke(l)), Mi(Xv, t);
    }
  }
  function Qv(l, t, u) {
    l === "focusin" ? (Vi(), pa = t, ja = u, pa.attachEvent("onpropertychange", Li)) : l === "focusout" && Vi();
  }
  function Zv(l) {
    if (l === "selectionchange" || l === "keyup" || l === "keydown") return Cn(ja);
  }
  function Vv(l, t) {
    if (l === "click") return Cn(t);
  }
  function Lv(l, t) {
    if (l === "input" || l === "change") return Cn(t);
  }
  function Kv(l, t) {
    return l === t && (l !== 0 || 1 / l === 1 / t) || l !== l && t !== t;
  }
  var Pl = typeof Object.is == "function" ? Object.is : Kv;
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
  function Ki(l) {
    for (; l && l.firstChild; ) l = l.firstChild;
    return l;
  }
  function Ji(l, t) {
    var u = Ki(l);
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
      u = Ki(u);
    }
  }
  function xi(l, t) {
    return l && t ? l === t ? !0 : l && l.nodeType === 3 ? !1 : t && t.nodeType === 3 ? xi(l, t.parentNode) : "contains" in l ? l.contains(t) : l.compareDocumentPosition ? !!(l.compareDocumentPosition(t) & 16) : !1 : !1;
  }
  function Wi(l) {
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
  var Jv = qt && "documentMode" in document && 11 >= document.documentMode, Fu = null, vf = null, Xa = null, mf = !1;
  function wi(l, t, u) {
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
  }, df = {}, $i = {};
  qt && ($i = document.createElement("div").style, "AnimationEvent" in window || (delete ku.animationend.animation, delete ku.animationiteration.animation, delete ku.animationstart.animation), "TransitionEvent" in window || delete ku.transitionend.transition);
  function Ou(l) {
    if (df[l]) return df[l];
    if (!ku[l]) return l;
    var t = ku[l], u;
    for (u in t) if (t.hasOwnProperty(u) && u in $i) return df[l] = t[u];
    return l;
  }
  var ri = Ou("animationend"), Fi = Ou("animationiteration"), ki = Ou("animationstart"), xv = Ou("transitionrun"), Wv = Ou("transitionstart"), wv = Ou("transitioncancel"), Ii = Ou("transitionend"), Pi = /* @__PURE__ */ new Map(), hf = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
  hf.push("scrollEnd");
  function zt(l, t) {
    Pi.set(l, t), Au(t, [l]);
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
      e !== 0 && l0(u, n, e);
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
  function l0(l, t, u) {
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
  function t0(l, t) {
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
    else if (typeof l == "string") f = ld(l, u, N.current) ? 26 : l === "html" || l === "head" || l === "body" ? 27 : 5;
    else l: switch (l) {
      case Et:
        return l = lt(31, u, t, n), l.elementType = Et, l.lanes = e, l;
      case Jl:
        return Du(u.children, n, e, t);
      case wt:
        f = 8, n |= 24;
        break;
      case xl:
        return l = lt(12, u, t, n | 2), l.elementType = xl, l.lanes = e, l;
      case Wl:
        return l = lt(13, u, t, n), l.elementType = Wl, l.lanes = e, l;
      case wl:
        return l = lt(19, u, t, n), l.elementType = wl, l.lanes = e, l;
      default:
        if (typeof l == "object" && l !== null) switch (l.$$typeof) {
          case El:
            f = 10;
            break l;
          case $t:
            f = 9;
            break l;
          case bt:
            f = 11;
            break l;
          case x:
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
  function bf(l, t, u) {
    return l = lt(6, l, null, t), l.lanes = u, l;
  }
  function u0(l) {
    var t = lt(18, null, null, 0);
    return t.stateNode = l, t;
  }
  function of(l, t, u) {
    return t = lt(4, l.children !== null ? l.children : [], l.key, t), t.lanes = u, t.stateNode = {
      containerInfo: l.containerInfo,
      pendingChildren: null,
      implementation: l.implementation
    }, t;
  }
  var a0 = /* @__PURE__ */ new WeakMap();
  function it(l, t) {
    if (typeof l == "object" && l !== null) {
      var u = a0.get(l);
      return u !== void 0 ? u : (t = {
        value: l,
        source: t,
        stack: ti(t)
      }, a0.set(l, t), t);
    }
    return {
      value: l,
      source: t,
      stack: ti(t)
    };
  }
  var la = [], ta = 0, Zn = null, Qa = 0, yt = [], vt = 0, It = null, Ot = 1, Mt = "";
  function Bt(l, t) {
    la[ta++] = Qa, la[ta++] = Zn, Zn = l, Qa = t;
  }
  function n0(l, t, u) {
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
    l.return !== null && (Bt(l, 1), n0(l, 1, 0));
  }
  function Tf(l) {
    for (; l === Zn; ) Zn = la[--ta], la[ta] = null, Qa = la[--ta], la[ta] = null;
    for (; l === It; ) It = yt[--vt], yt[vt] = null, Mt = yt[--vt], yt[vt] = null, Ot = yt[--vt], yt[vt] = null;
  }
  function e0(l, t) {
    yt[vt++] = Ot, yt[vt++] = Mt, yt[vt++] = It, Ot = t.id, Mt = t.overflow, It = l;
  }
  var Ul = null, el = null, J = !1, Pt = null, mt = !1, Af = Error(s(519));
  function lu(l) {
    throw Za(it(Error(s(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML", "")), l)), Af;
  }
  function f0(l) {
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
        V("invalid", t), zi(t, a.value, a.defaultValue, a.checked, a.defaultChecked, a.type, a.name, !0);
        break;
      case "select":
        V("invalid", t);
        break;
      case "textarea":
        V("invalid", t), Ai(t, a.value, a.defaultValue, a.children);
    }
    u = a.children, typeof u != "string" && typeof u != "number" && typeof u != "bigint" || t.textContent === "" + u || a.suppressHydrationWarning === !0 || Ay(t.textContent, u) ? (a.popover != null && (V("beforetoggle", t), V("toggle", t)), a.onScroll != null && V("scroll", t), a.onScrollEnd != null && V("scrollend", t), a.onClick != null && (t.onclick = Nt), t = !0) : t = !1, t || lu(l, !0);
  }
  function c0(l) {
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
    if (!J) return c0(l), J = !0, !1;
    var t = l.tag, u;
    if ((u = t !== 3 && t !== 27) && ((u = t === 5) && (u = l.type, u = !(u !== "form" && u !== "button") || Xc(l.type, l.memoizedProps)), u = !u), u && el && lu(l), c0(l), t === 13) {
      if (l = l.memoizedState, l = l !== null ? l.dehydrated : null, !l) throw Error(s(317));
      el = qy(l);
    } else if (t === 31) {
      if (l = l.memoizedState, l = l !== null ? l.dehydrated : null, !l) throw Error(s(317));
      el = qy(l);
    } else t === 27 ? (t = el, du(l.type) ? (l = Kc, Kc = null, el = l) : el = t) : el = Ul ? St(l.stateNode.nextSibling) : null;
    return !0;
  }
  function Uu() {
    el = Ul = null, J = !1;
  }
  function Ef() {
    var l = Pt;
    return l !== null && (Ll === null ? Ll = l : Ll.push.apply(Ll, l), Pt = null), l;
  }
  function Za(l) {
    Pt === null ? Pt = [l] : Pt.push(l);
  }
  var _f = v(null), Hu = null, Rt = null;
  function tu(l, t, u) {
    O(_f, t._currentValue), t._currentValue = u;
  }
  function Ct(l) {
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
      } else if (n === F.current) {
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
  function Nu(l) {
    Hu = l, Rt = null, l = l.dependencies, l !== null && (l.firstContext = null);
  }
  function Hl(l) {
    return i0(Hu, l);
  }
  function Ln(l, t) {
    return Hu === null && Nu(l), i0(l, t);
  }
  function i0(l, t) {
    var u = t._currentValue;
    if (t = {
      context: t,
      memoizedValue: u,
      next: null
    }, Rt === null) {
      if (l === null) throw Error(s(308));
      Rt = t, l.dependencies = {
        lanes: 0,
        firstContext: t
      }, l.flags |= 524288;
    } else Rt = Rt.next = t;
    return u;
  }
  var rv = typeof AbortController < "u" ? AbortController : function() {
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
  }, Fv = C.unstable_scheduleCallback, kv = C.unstable_NormalPriority, bl = {
    $$typeof: El,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function Df() {
    return {
      controller: new rv(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function Va(l) {
    l.refCount--, l.refCount === 0 && Fv(kv, function() {
      l.controller.abort();
    });
  }
  var La = null, Uf = 0, na = 0, ea = null;
  function Iv(l, t) {
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
    return Uf++, t.then(y0, y0), t;
  }
  function y0() {
    if (--Uf === 0 && La !== null) {
      ea !== null && (ea.status = "fulfilled");
      var l = La;
      La = null, na = 0, ea = null;
      for (var t = 0; t < l.length; t++) (0, l[t])();
    }
  }
  function Pv(l, t) {
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
  var v0 = _.S;
  _.S = function(l, t) {
    J1 = Fl(), typeof t == "object" && t !== null && typeof t.then == "function" && Iv(l, t), v0 !== null && v0(l, t);
  };
  var qu = v(null);
  function Hf() {
    var l = qu.current;
    return l !== null ? l : ul.pooledCache;
  }
  function Kn(l, t) {
    t === null ? O(qu, qu.current) : O(qu, t.pool);
  }
  function m0() {
    var l = Hf();
    return l === null ? null : {
      parent: bl._currentValue,
      pool: l
    };
  }
  var fa = Error(s(460)), Nf = Error(s(474)), Jn = Error(s(542)), xn = { then: function() {
  } };
  function d0(l) {
    return l = l.status, l === "fulfilled" || l === "rejected";
  }
  function h0(l, t, u) {
    switch (u = l[u], u === void 0 ? l.push(t) : u !== t && (t.then(Nt, Nt), t = u), t.status) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw l = t.reason, g0(l), l;
      default:
        if (typeof t.status == "string") t.then(Nt, Nt);
        else {
          if (l = ul, l !== null && 100 < l.shellSuspendCounter) throw Error(s(482));
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
            throw l = t.reason, g0(l), l;
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
  function S0() {
    if (Bu === null) throw Error(s(459));
    var l = Bu;
    return Bu = null, l;
  }
  function g0(l) {
    if (l === fa || l === Jn) throw Error(s(483));
  }
  var ca = null, Ka = 0;
  function Wn(l) {
    var t = Ka;
    return Ka += 1, ca === null && (ca = []), h0(ca, l, t);
  }
  function Ja(l, t) {
    t = t.props.ref, l.ref = t !== void 0 ? t : null;
  }
  function wn(l, t) {
    throw t.$$typeof === st ? Error(s(525)) : (l = Object.prototype.toString.call(t), Error(s(31, l === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : l)));
  }
  function s0(l) {
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
    function c(m, y, d, o) {
      return y === null || y.tag !== 6 ? (y = bf(d, m.mode, o), y.return = m, y) : (y = n(y, d), y.return = m, y);
    }
    function i(m, y, d, o) {
      var q = d.type;
      return q === Jl ? b(m, y, d.props.children, o, d.key) : y !== null && (y.elementType === q || typeof q == "object" && q !== null && q.$$typeof === jl && Yu(q) === y.type) ? (y = n(y, d.props), Ja(y, d), y.return = m, y) : (y = Qn(d.type, d.key, d.props, null, m.mode, o), Ja(y, d), y.return = m, y);
    }
    function h(m, y, d, o) {
      return y === null || y.tag !== 4 || y.stateNode.containerInfo !== d.containerInfo || y.stateNode.implementation !== d.implementation ? (y = of(d, m.mode, o), y.return = m, y) : (y = n(y, d.children || []), y.return = m, y);
    }
    function b(m, y, d, o, q) {
      return y === null || y.tag !== 7 ? (y = Du(d, m.mode, o, q), y.return = m, y) : (y = n(y, d), y.return = m, y);
    }
    function z(m, y, d) {
      if (typeof y == "string" && y !== "" || typeof y == "number" || typeof y == "bigint") return y = bf("" + y, m.mode, d), y.return = m, y;
      if (typeof y == "object" && y !== null) {
        switch (y.$$typeof) {
          case Bl:
            return d = Qn(y.type, y.key, y.props, null, m.mode, d), Ja(d, y), d.return = m, d;
          case pl:
            return y = of(y, m.mode, d), y.return = m, y;
          case jl:
            return y = Yu(y), z(m, y, d);
        }
        if (D(y) || _t(y)) return y = Du(y, m.mode, d, null), y.return = m, y;
        if (typeof y.then == "function") return z(m, Wn(y), d);
        if (y.$$typeof === El) return z(m, Ln(m, y), d);
        wn(m, y);
      }
      return null;
    }
    function S(m, y, d, o) {
      var q = y !== null ? y.key : null;
      if (typeof d == "string" && d !== "" || typeof d == "number" || typeof d == "bigint") return q !== null ? null : c(m, y, "" + d, o);
      if (typeof d == "object" && d !== null) {
        switch (d.$$typeof) {
          case Bl:
            return d.key === q ? i(m, y, d, o) : null;
          case pl:
            return d.key === q ? h(m, y, d, o) : null;
          case jl:
            return d = Yu(d), S(m, y, d, o);
        }
        if (D(d) || _t(d)) return q !== null ? null : b(m, y, d, o, null);
        if (typeof d.then == "function") return S(m, y, Wn(d), o);
        if (d.$$typeof === El) return S(m, y, Ln(m, d), o);
        wn(m, d);
      }
      return null;
    }
    function g(m, y, d, o, q) {
      if (typeof o == "string" && o !== "" || typeof o == "number" || typeof o == "bigint") return m = m.get(d) || null, c(y, m, "" + o, q);
      if (typeof o == "object" && o !== null) {
        switch (o.$$typeof) {
          case Bl:
            return m = m.get(o.key === null ? d : o.key) || null, i(y, m, o, q);
          case pl:
            return m = m.get(o.key === null ? d : o.key) || null, h(y, m, o, q);
          case jl:
            return o = Yu(o), g(m, y, d, o, q);
        }
        if (D(o) || _t(o)) return m = m.get(d) || null, b(y, m, o, q, null);
        if (typeof o.then == "function") return g(m, y, d, Wn(o), q);
        if (o.$$typeof === El) return g(m, y, d, Ln(y, o), q);
        wn(y, o);
      }
      return null;
    }
    function U(m, y, d, o) {
      for (var q = null, W = null, H = y, G = y = 0, K = null; H !== null && G < d.length; G++) {
        H.index > G ? (K = H, H = null) : K = H.sibling;
        var w = S(m, H, d[G], o);
        if (w === null) {
          H === null && (H = K);
          break;
        }
        l && H && w.alternate === null && t(m, H), y = e(w, y, G), W === null ? q = w : W.sibling = w, W = w, H = K;
      }
      if (G === d.length) return u(m, H), J && Bt(m, G), q;
      if (H === null) {
        for (; G < d.length; G++) H = z(m, d[G], o), H !== null && (y = e(H, y, G), W === null ? q = H : W.sibling = H, W = H);
        return J && Bt(m, G), q;
      }
      for (H = a(H); G < d.length; G++) K = g(H, m, G, d[G], o), K !== null && (l && K.alternate !== null && H.delete(K.key === null ? G : K.key), y = e(K, y, G), W === null ? q = K : W.sibling = K, W = K);
      return l && H.forEach(function(bu) {
        return t(m, bu);
      }), J && Bt(m, G), q;
    }
    function R(m, y, d, o) {
      if (d == null) throw Error(s(151));
      for (var q = null, W = null, H = y, G = y = 0, K = null, w = d.next(); H !== null && !w.done; G++, w = d.next()) {
        H.index > G ? (K = H, H = null) : K = H.sibling;
        var bu = S(m, H, w.value, o);
        if (bu === null) {
          H === null && (H = K);
          break;
        }
        l && H && bu.alternate === null && t(m, H), y = e(bu, y, G), W === null ? q = bu : W.sibling = bu, W = bu, H = K;
      }
      if (w.done) return u(m, H), J && Bt(m, G), q;
      if (H === null) {
        for (; !w.done; G++, w = d.next()) w = z(m, w.value, o), w !== null && (y = e(w, y, G), W === null ? q = w : W.sibling = w, W = w);
        return J && Bt(m, G), q;
      }
      for (H = a(H); !w.done; G++, w = d.next()) w = g(H, m, G, w.value, o), w !== null && (l && w.alternate !== null && H.delete(w.key === null ? G : w.key), y = e(w, y, G), W === null ? q = w : W.sibling = w, W = w);
      return l && H.forEach(function(Sd) {
        return t(m, Sd);
      }), J && Bt(m, G), q;
    }
    function tl(m, y, d, o) {
      if (typeof d == "object" && d !== null && d.type === Jl && d.key === null && (d = d.props.children), typeof d == "object" && d !== null) {
        switch (d.$$typeof) {
          case Bl:
            l: {
              for (var q = d.key; y !== null; ) {
                if (y.key === q) {
                  if (q = d.type, q === Jl) {
                    if (y.tag === 7) {
                      u(m, y.sibling), o = n(y, d.props.children), o.return = m, m = o;
                      break l;
                    }
                  } else if (y.elementType === q || typeof q == "object" && q !== null && q.$$typeof === jl && Yu(q) === y.type) {
                    u(m, y.sibling), o = n(y, d.props), Ja(o, d), o.return = m, m = o;
                    break l;
                  }
                  u(m, y);
                  break;
                } else t(m, y);
                y = y.sibling;
              }
              d.type === Jl ? (o = Du(d.props.children, m.mode, o, d.key), o.return = m, m = o) : (o = Qn(d.type, d.key, d.props, null, m.mode, o), Ja(o, d), o.return = m, m = o);
            }
            return f(m);
          case pl:
            l: {
              for (q = d.key; y !== null; ) {
                if (y.key === q) if (y.tag === 4 && y.stateNode.containerInfo === d.containerInfo && y.stateNode.implementation === d.implementation) {
                  u(m, y.sibling), o = n(y, d.children || []), o.return = m, m = o;
                  break l;
                } else {
                  u(m, y);
                  break;
                }
                else t(m, y);
                y = y.sibling;
              }
              o = of(d, m.mode, o), o.return = m, m = o;
            }
            return f(m);
          case jl:
            return d = Yu(d), tl(m, y, d, o);
        }
        if (D(d)) return U(m, y, d, o);
        if (_t(d)) {
          if (q = _t(d), typeof q != "function") throw Error(s(150));
          return d = q.call(d), R(m, y, d, o);
        }
        if (typeof d.then == "function") return tl(m, y, Wn(d), o);
        if (d.$$typeof === El) return tl(m, y, Ln(m, d), o);
        wn(m, d);
      }
      return typeof d == "string" && d !== "" || typeof d == "number" || typeof d == "bigint" ? (d = "" + d, y !== null && y.tag === 6 ? (u(m, y.sibling), o = n(y, d), o.return = m, m = o) : (u(m, y), o = bf(d, m.mode, o), o.return = m, m = o), f(m)) : u(m, y);
    }
    return function(m, y, d, o) {
      try {
        Ka = 0;
        var q = tl(m, y, d, o);
        return ca = null, q;
      } catch (H) {
        if (H === fa || H === Jn) throw H;
        var W = lt(29, H, null, m.mode);
        return W.lanes = o, W.return = m, W;
      }
    };
  }
  var Ru = s0(!0), b0 = s0(!1), uu = !1;
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
  function Cu(l) {
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
    if (a = a.shared, (r & 2) !== 0) {
      var n = a.pending;
      return n === null ? t.next = t : (t.next = n.next, n.next = t), a.pending = t, t = Xn(l), l0(l, null, u), t;
    }
    return Gn(l, a, t, u), Xn(l);
  }
  function xa(l, t, u) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (u & 4194048) !== 0)) {
      var a = t.lanes;
      a &= l.pendingLanes, u |= a, t.lanes = u, ci(l, u);
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
  var Rf = !1;
  function Wa() {
    if (Rf) {
      var l = ea;
      if (l !== null) throw l;
    }
  }
  function wa(l, t, u, a) {
    Rf = !1;
    var n = l.updateQueue;
    uu = !1;
    var e = n.firstBaseUpdate, f = n.lastBaseUpdate, c = n.shared.pending;
    if (c !== null) {
      n.shared.pending = null;
      var i = c, h = i.next;
      i.next = null, f === null ? e = h : f.next = h, f = i;
      var b = l.alternate;
      b !== null && (b = b.updateQueue, c = b.lastBaseUpdate, c !== f && (c === null ? b.firstBaseUpdate = h : c.next = h, b.lastBaseUpdate = i));
    }
    if (e !== null) {
      var z = n.baseState;
      f = 0, b = h = i = null, c = e;
      do {
        var S = c.lane & -536870913, g = S !== c.lane;
        if (g ? (L & S) === S : (a & S) === S) {
          S !== 0 && S === na && (Rf = !0), b !== null && (b = b.next = {
            lane: 0,
            tag: c.tag,
            payload: c.payload,
            callback: null,
            next: null
          });
          l: {
            var U = l, R = c;
            S = t;
            var tl = u;
            switch (R.tag) {
              case 1:
                if (U = R.payload, typeof U == "function") {
                  z = U.call(tl, z, S);
                  break l;
                }
                z = U;
                break l;
              case 3:
                U.flags = U.flags & -65537 | 128;
              case 0:
                if (U = R.payload, S = typeof U == "function" ? U.call(tl, z, S) : U, S == null) break l;
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
        }, b === null ? (h = b = g, i = z) : b = b.next = g, f |= S;
        if (c = c.next, c === null) {
          if (c = n.shared.pending, c === null) break;
          g = c, c = g.next, g.next = null, n.lastBaseUpdate = g, n.shared.pending = null;
        }
      } while (!0);
      b === null && (i = z), n.baseState = i, n.firstBaseUpdate = h, n.lastBaseUpdate = b, e === null && (n.shared.lanes = 0), cu |= f, l.lanes = f, l.memoizedState = z;
    }
  }
  function o0(l, t) {
    if (typeof l != "function") throw Error(s(191, l));
    l.call(t);
  }
  function z0(l, t) {
    var u = l.callbacks;
    if (u !== null) for (l.callbacks = null, l = 0; l < u.length; l++) o0(u[l], t);
  }
  var ia = v(null), $n = v(0);
  function T0(l, t) {
    l = Kt, O($n, l), O(ia, t), Kt = l | t.baseLanes;
  }
  function Cf() {
    O($n, Kt), O(ia, ia.current);
  }
  function pf() {
    Kt = $n.current, T(ia), T($n);
  }
  var tt = v(null), dt = null;
  function au(l) {
    var t = l.alternate;
    O(hl, hl.current & 1), O(tt, l), dt === null && (t === null || ia.current !== null || t.memoizedState !== null) && (dt = l);
  }
  function jf(l) {
    O(hl, hl.current), O(tt, l), dt === null && (dt = l);
  }
  function A0(l) {
    l.tag === 22 ? (O(hl, hl.current), O(tt, l), dt === null && (dt = l)) : nu(l);
  }
  function nu() {
    O(hl, hl.current), O(tt, tt.current);
  }
  function ut(l) {
    T(tt), dt === l && (dt = null), T(hl);
  }
  var hl = v(0);
  function rn(l) {
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
  var pt = 0, p = null, P = null, ol = null, Fn = !1, ya = !1, ju = !1, kn = 0, $a = 0, va = null, lm = 0;
  function vl() {
    throw Error(s(321));
  }
  function Gf(l, t) {
    if (t === null) return !1;
    for (var u = 0; u < t.length && u < l.length; u++) if (!Pl(l[u], t[u])) return !1;
    return !0;
  }
  function Xf(l, t, u, a, n, e) {
    return pt = e, p = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, _.H = l === null || l.memoizedState === null ? n1 : Pf, ju = !1, e = u(a, n), ju = !1, ya && (e = _0(t, u, a, n)), E0(l), e;
  }
  function E0(l) {
    _.H = ka;
    var t = P !== null && P.next !== null;
    if (pt = 0, ol = P = p = null, Fn = !1, $a = 0, va = null, t) throw Error(s(300));
    l === null || zl || (l = l.dependencies, l !== null && Vn(l) && (zl = !0));
  }
  function _0(l, t, u, a) {
    p = l;
    var n = 0;
    do {
      if (ya && (va = null), $a = 0, ya = !1, 25 <= n) throw Error(s(301));
      if (n += 1, ol = P = null, l.updateQueue != null) {
        var e = l.updateQueue;
        e.lastEffect = null, e.events = null, e.stores = null, e.memoCache != null && (e.memoCache.index = 0);
      }
      _.H = e1, e = t(u, a);
    } while (ya);
    return e;
  }
  function tm() {
    var l = _.H, t = l.useState()[0];
    return t = typeof t.then == "function" ? ra(t) : t, l = l.useState()[0], (P !== null ? P.memoizedState : null) !== l && (p.flags |= 1024), t;
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
    pt = 0, ol = P = p = null, ya = !1, $a = kn = 0, va = null;
  }
  function Cl() {
    var l = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return ol === null ? p.memoizedState = ol = l : ol = ol.next = l, ol;
  }
  function Sl() {
    if (P === null) {
      var l = p.alternate;
      l = l !== null ? l.memoizedState : null;
    } else l = P.next;
    var t = ol === null ? p.memoizedState : ol.next;
    if (t !== null) ol = t, P = l;
    else {
      if (l === null)
        throw p.alternate === null ? Error(s(467)) : Error(s(310));
      P = l, l = {
        memoizedState: P.memoizedState,
        baseState: P.baseState,
        baseQueue: P.baseQueue,
        queue: P.queue,
        next: null
      }, ol === null ? p.memoizedState = ol = l : ol = ol.next = l;
    }
    return ol;
  }
  function In() {
    return {
      lastEffect: null,
      events: null,
      stores: null,
      memoCache: null
    };
  }
  function ra(l) {
    var t = $a;
    return $a += 1, va === null && (va = []), l = h0(va, l, t), t = p, (ol === null ? t.memoizedState : ol.next) === null && (t = t.alternate, _.H = t === null || t.memoizedState === null ? n1 : Pf), l;
  }
  function Pn(l) {
    if (l !== null && typeof l == "object") {
      if (typeof l.then == "function") return ra(l);
      if (l.$$typeof === El) return Hl(l);
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
    }, u === null && (u = In(), p.updateQueue = u), u.memoCache = t, u = t.data[t.index], u === void 0) for (u = t.data[t.index] = Array(l), a = 0; a < l; a++) u[a] = ou;
    return t.index++, u;
  }
  function jt(l, t) {
    return typeof t == "function" ? t(l) : t;
  }
  function le(l) {
    return Kf(Sl(), P, l);
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
      var c = f = null, i = null, h = t, b = !1;
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
          }), z === na && (b = !0);
          else if ((pt & S) === S) {
            h = h.next, S === na && (b = !0);
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
      if (i === null ? f = e : i.next = c, !Pl(e, l.memoizedState) && (zl = !0, b && (u = ea, u !== null))) throw u;
      l.memoizedState = e, l.baseState = f, l.baseQueue = i, a.lastRenderedState = e;
    }
    return n === null && (a.lanes = 0), [l.memoizedState, a.dispatch];
  }
  function Jf(l) {
    var t = Sl(), u = t.queue;
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
  function O0(l, t, u) {
    var a = p, n = Sl(), e = J;
    if (e) {
      if (u === void 0) throw Error(s(407));
      u = u();
    } else u = t();
    var f = !Pl((P || n).memoizedState, u);
    if (f && (n.memoizedState = u, zl = !0), n = n.queue, wf(U0.bind(null, a, n, l), [l]), n.getSnapshot !== t || f || ol !== null && ol.memoizedState.tag & 1) {
      if (a.flags |= 2048, ma(9, { destroy: void 0 }, D0.bind(null, a, n, u, t), null), ul === null) throw Error(s(349));
      e || (pt & 127) !== 0 || M0(a, t, u);
    }
    return u;
  }
  function M0(l, t, u) {
    l.flags |= 16384, l = {
      getSnapshot: t,
      value: u
    }, t = p.updateQueue, t === null ? (t = In(), p.updateQueue = t, t.stores = [l]) : (u = t.stores, u === null ? t.stores = [l] : u.push(l));
  }
  function D0(l, t, u, a) {
    t.value = u, t.getSnapshot = a, H0(t) && N0(l);
  }
  function U0(l, t, u) {
    return u(function() {
      H0(t) && N0(l);
    });
  }
  function H0(l) {
    var t = l.getSnapshot;
    l = l.value;
    try {
      var u = t();
      return !Pl(l, u);
    } catch {
      return !0;
    }
  }
  function N0(l) {
    var t = Mu(l, 2);
    t !== null && Kl(t, l, 2);
  }
  function xf(l) {
    var t = Cl();
    if (typeof l == "function") {
      var u = l;
      if (l = u(), ju) {
        rt(!0);
        try {
          u();
        } finally {
          rt(!1);
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
  function q0(l, t, u, a) {
    return l.baseState = u, Kf(l, P, typeof a == "function" ? a : jt);
  }
  function um(l, t, u, a, n) {
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
      _.T !== null ? u(!0) : e.isTransition = !1, a(e), u = t.pending, u === null ? (e.next = t.pending = e, Y0(t, e)) : (e.next = u.next, t.pending = u.next = e);
    }
  }
  function Y0(l, t) {
    var u = t.action, a = t.payload, n = l.state;
    if (t.isTransition) {
      var e = _.T, f = {};
      _.T = f;
      try {
        var c = u(n, a), i = _.S;
        i !== null && i(f, c), B0(l, t, c);
      } catch (h) {
        Wf(l, t, h);
      } finally {
        e !== null && f.types !== null && (e.types = f.types), _.T = e;
      }
    } else try {
      e = u(n, a), B0(l, t, e);
    } catch (h) {
      Wf(l, t, h);
    }
  }
  function B0(l, t, u) {
    u !== null && typeof u == "object" && typeof u.then == "function" ? u.then(function(a) {
      R0(l, t, a);
    }, function(a) {
      return Wf(l, t, a);
    }) : R0(l, t, u);
  }
  function R0(l, t, u) {
    t.status = "fulfilled", t.value = u, C0(t), l.state = u, t = l.pending, t !== null && (u = t.next, u === t ? l.pending = null : (u = u.next, t.next = u, Y0(l, u)));
  }
  function Wf(l, t, u) {
    var a = l.pending;
    if (l.pending = null, a !== null) {
      a = a.next;
      do
        t.status = "rejected", t.reason = u, C0(t), t = t.next;
      while (t !== a);
    }
    l.action = null;
  }
  function C0(l) {
    l = l.listeners;
    for (var t = 0; t < l.length; t++) (0, l[t])();
  }
  function p0(l, t) {
    return t;
  }
  function j0(l, t) {
    if (J) {
      var u = ul.formState;
      if (u !== null) {
        l: {
          var a = p;
          if (J) {
            if (el) {
              t: {
                for (var n = el, e = mt; n.nodeType !== 8; ) {
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
                el = St(n.nextSibling), a = n.data === "F!";
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
    return u = Cl(), u.memoizedState = u.baseState = t, a = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: p0,
      lastRenderedState: t
    }, u.queue = a, u = t1.bind(null, p, a), a.dispatch = u, a = xf(!1), e = If.bind(null, p, !1, a.queue), a = Cl(), n = {
      state: t,
      dispatch: null,
      action: l,
      pending: null
    }, a.queue = n, u = um.bind(null, p, n, e, u), n.dispatch = u, a.memoizedState = l, [
      t,
      u,
      !1
    ];
  }
  function G0(l) {
    return X0(Sl(), P, l);
  }
  function X0(l, t, u) {
    if (t = Kf(l, t, p0)[0], l = le(jt)[0], typeof t == "object" && t !== null && typeof t.then == "function") try {
      var a = ra(t);
    } catch (f) {
      throw f === fa ? Jn : f;
    }
    else a = t;
    t = Sl();
    var n = t.queue, e = n.dispatch;
    return u !== t.memoizedState && (p.flags |= 2048, ma(9, { destroy: void 0 }, am.bind(null, n, u), null)), [
      a,
      e,
      l
    ];
  }
  function am(l, t) {
    l.action = t;
  }
  function Q0(l) {
    var t = Sl(), u = P;
    if (u !== null) return X0(t, u, l);
    Sl(), t = t.memoizedState, u = Sl();
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
  function Z0() {
    return Sl().memoizedState;
  }
  function te(l, t, u, a) {
    var n = Cl();
    p.flags |= l, n.memoizedState = ma(1 | t, { destroy: void 0 }, u, a === void 0 ? null : a);
  }
  function ue(l, t, u, a) {
    var n = Sl();
    a = a === void 0 ? null : a;
    var e = n.memoizedState.inst;
    P !== null && a !== null && Gf(a, P.memoizedState.deps) ? n.memoizedState = ma(t, e, u, a) : (p.flags |= l, n.memoizedState = ma(1 | t, e, u, a));
  }
  function V0(l, t) {
    te(8390656, 8, l, t);
  }
  function wf(l, t) {
    ue(2048, 8, l, t);
  }
  function nm(l) {
    p.flags |= 4;
    var t = p.updateQueue;
    if (t === null) t = In(), p.updateQueue = t, t.events = [l];
    else {
      var u = t.events;
      u === null ? t.events = [l] : u.push(l);
    }
  }
  function L0(l) {
    var t = Sl().memoizedState;
    return nm({
      ref: t,
      nextImpl: l
    }), function() {
      if ((r & 2) !== 0) throw Error(s(440));
      return t.impl.apply(void 0, arguments);
    };
  }
  function K0(l, t) {
    return ue(4, 2, l, t);
  }
  function J0(l, t) {
    return ue(4, 4, l, t);
  }
  function x0(l, t) {
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
  function W0(l, t, u) {
    u = u != null ? u.concat([l]) : null, ue(4, 4, x0.bind(null, t, l), u);
  }
  function $f() {
  }
  function w0(l, t) {
    var u = Sl();
    t = t === void 0 ? null : t;
    var a = u.memoizedState;
    return t !== null && Gf(t, a[1]) ? a[0] : (u.memoizedState = [l, t], l);
  }
  function $0(l, t) {
    var u = Sl();
    t = t === void 0 ? null : t;
    var a = u.memoizedState;
    if (t !== null && Gf(t, a[1])) return a[0];
    if (a = l(), ju) {
      rt(!0);
      try {
        l();
      } finally {
        rt(!1);
      }
    }
    return u.memoizedState = [a, t], a;
  }
  function rf(l, t, u) {
    return u === void 0 || (pt & 1073741824) !== 0 && (L & 261930) === 0 ? l.memoizedState = t : (l.memoizedState = u, l = W1(), p.lanes |= l, cu |= l, u);
  }
  function r0(l, t, u, a) {
    return Pl(u, t) ? u : ia.current !== null ? (l = rf(l, u, a), Pl(l, t) || (zl = !0), l) : (pt & 42) === 0 || (pt & 1073741824) !== 0 && (L & 261930) === 0 ? (zl = !0, l.memoizedState = u) : (l = W1(), p.lanes |= l, cu |= l, t);
  }
  function F0(l, t, u, a, n) {
    var e = M.p;
    M.p = e !== 0 && 8 > e ? e : 8;
    var f = _.T, c = {};
    _.T = c, If(l, !1, t, u);
    try {
      var i = n(), h = _.S;
      h !== null && h(c, i), i !== null && typeof i == "object" && typeof i.then == "function" ? Fa(l, t, Pv(i, a), ht(l)) : Fa(l, t, a, ht(l));
    } catch (b) {
      Fa(l, t, {
        then: function() {
        },
        status: "rejected",
        reason: b
      }, ht());
    } finally {
      M.p = e, f !== null && c.types !== null && (f.types = c.types), _.T = f;
    }
  }
  function em() {
  }
  function Ff(l, t, u, a) {
    if (l.tag !== 5) throw Error(s(476));
    var n = k0(l).queue;
    F0(l, n, t, $, u === null ? em : function() {
      return I0(l), u(a);
    });
  }
  function k0(l) {
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
  function I0(l) {
    var t = k0(l);
    t.next === null && (t = l.alternate.memoizedState), Fa(l, t.next.queue, {}, ht());
  }
  function kf() {
    return Hl(Sn);
  }
  function P0() {
    return Sl().memoizedState;
  }
  function l1() {
    return Sl().memoizedState;
  }
  function fm(l) {
    for (var t = l.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var u = ht();
          l = Cu(u);
          var a = pu(t, l, u);
          a !== null && (Kl(a, t, u), xa(a, t, u)), t = { cache: Df() }, l.payload = t;
          return;
      }
      t = t.return;
    }
  }
  function cm(l, t, u) {
    var a = ht();
    u = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: u,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, ae(l) ? u1(t, u) : (u = gf(l, t, u, a), u !== null && (Kl(u, l, a), a1(u, t, a)));
  }
  function t1(l, t, u) {
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
    if (ae(l)) u1(t, n);
    else {
      var e = l.alternate;
      if (l.lanes === 0 && (e === null || e.lanes === 0) && (e = t.lastRenderedReducer, e !== null)) try {
        var f = t.lastRenderedState, c = e(f, u);
        if (n.hasEagerState = !0, n.eagerState = c, Pl(c, f)) return Gn(l, t, n, 0), ul === null && jn(), !1;
      } catch {
      }
      if (u = gf(l, t, n, a), u !== null) return Kl(u, l, a), a1(u, t, a), !0;
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
  function u1(l, t) {
    ya = Fn = !0;
    var u = l.pending;
    u === null ? t.next = t : (t.next = u.next, u.next = t), l.pending = t;
  }
  function a1(l, t, u) {
    if ((u & 4194048) !== 0) {
      var a = t.lanes;
      a &= l.pendingLanes, u |= a, t.lanes = u, ci(l, u);
    }
  }
  var ka = {
    readContext: Hl,
    use: Pn,
    useCallback: vl,
    useContext: vl,
    useEffect: vl,
    useImperativeHandle: vl,
    useLayoutEffect: vl,
    useInsertionEffect: vl,
    useMemo: vl,
    useReducer: vl,
    useRef: vl,
    useState: vl,
    useDebugValue: vl,
    useDeferredValue: vl,
    useTransition: vl,
    useSyncExternalStore: vl,
    useId: vl,
    useHostTransitionStatus: vl,
    useFormState: vl,
    useActionState: vl,
    useOptimistic: vl,
    useMemoCache: vl,
    useCacheRefresh: vl
  };
  ka.useEffectEvent = vl;
  var n1 = {
    readContext: Hl,
    use: Pn,
    useCallback: function(l, t) {
      return Cl().memoizedState = [l, t === void 0 ? null : t], l;
    },
    useContext: Hl,
    useEffect: V0,
    useImperativeHandle: function(l, t, u) {
      u = u != null ? u.concat([l]) : null, te(4194308, 4, x0.bind(null, t, l), u);
    },
    useLayoutEffect: function(l, t) {
      return te(4194308, 4, l, t);
    },
    useInsertionEffect: function(l, t) {
      te(4, 2, l, t);
    },
    useMemo: function(l, t) {
      var u = Cl();
      t = t === void 0 ? null : t;
      var a = l();
      if (ju) {
        rt(!0);
        try {
          l();
        } finally {
          rt(!1);
        }
      }
      return u.memoizedState = [a, t], a;
    },
    useReducer: function(l, t, u) {
      var a = Cl();
      if (u !== void 0) {
        var n = u(t);
        if (ju) {
          rt(!0);
          try {
            u(t);
          } finally {
            rt(!1);
          }
        }
      } else n = t;
      return a.memoizedState = a.baseState = n, l = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: l,
        lastRenderedState: n
      }, a.queue = l, l = l.dispatch = cm.bind(null, p, l), [a.memoizedState, l];
    },
    useRef: function(l) {
      var t = Cl();
      return l = { current: l }, t.memoizedState = l;
    },
    useState: function(l) {
      l = xf(l);
      var t = l.queue, u = t1.bind(null, p, t);
      return t.dispatch = u, [l.memoizedState, u];
    },
    useDebugValue: $f,
    useDeferredValue: function(l, t) {
      return rf(Cl(), l, t);
    },
    useTransition: function() {
      var l = xf(!1);
      return l = F0.bind(null, p, l.queue, !0, !1), Cl().memoizedState = l, [!1, l];
    },
    useSyncExternalStore: function(l, t, u) {
      var a = p, n = Cl();
      if (J) {
        if (u === void 0) throw Error(s(407));
        u = u();
      } else {
        if (u = t(), ul === null) throw Error(s(349));
        (L & 127) !== 0 || M0(a, t, u);
      }
      n.memoizedState = u;
      var e = {
        value: u,
        getSnapshot: t
      };
      return n.queue = e, V0(U0.bind(null, a, e, l), [l]), a.flags |= 2048, ma(9, { destroy: void 0 }, D0.bind(null, a, e, u, t), null), u;
    },
    useId: function() {
      var l = Cl(), t = ul.identifierPrefix;
      if (J) {
        var u = Mt, a = Ot;
        u = (a & ~(1 << 32 - Il(a) - 1)).toString(32) + u, t = "_" + t + "R_" + u, u = kn++, 0 < u && (t += "H" + u.toString(32)), t += "_";
      } else u = lm++, t = "_" + t + "r_" + u.toString(32) + "_";
      return l.memoizedState = t;
    },
    useHostTransitionStatus: kf,
    useFormState: j0,
    useActionState: j0,
    useOptimistic: function(l) {
      var t = Cl();
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
      return Cl().memoizedState = fm.bind(null, p);
    },
    useEffectEvent: function(l) {
      var t = Cl(), u = { impl: l };
      return t.memoizedState = u, function() {
        if ((r & 2) !== 0) throw Error(s(440));
        return u.impl.apply(void 0, arguments);
      };
    }
  }, Pf = {
    readContext: Hl,
    use: Pn,
    useCallback: w0,
    useContext: Hl,
    useEffect: wf,
    useImperativeHandle: W0,
    useInsertionEffect: K0,
    useLayoutEffect: J0,
    useMemo: $0,
    useReducer: le,
    useRef: Z0,
    useState: function() {
      return le(jt);
    },
    useDebugValue: $f,
    useDeferredValue: function(l, t) {
      return r0(Sl(), P.memoizedState, l, t);
    },
    useTransition: function() {
      var l = le(jt)[0], t = Sl().memoizedState;
      return [typeof l == "boolean" ? l : ra(l), t];
    },
    useSyncExternalStore: O0,
    useId: P0,
    useHostTransitionStatus: kf,
    useFormState: G0,
    useActionState: G0,
    useOptimistic: function(l, t) {
      return q0(Sl(), P, l, t);
    },
    useMemoCache: Lf,
    useCacheRefresh: l1
  };
  Pf.useEffectEvent = L0;
  var e1 = {
    readContext: Hl,
    use: Pn,
    useCallback: w0,
    useContext: Hl,
    useEffect: wf,
    useImperativeHandle: W0,
    useInsertionEffect: K0,
    useLayoutEffect: J0,
    useMemo: $0,
    useReducer: Jf,
    useRef: Z0,
    useState: function() {
      return Jf(jt);
    },
    useDebugValue: $f,
    useDeferredValue: function(l, t) {
      var u = Sl();
      return P === null ? rf(u, l, t) : r0(u, P.memoizedState, l, t);
    },
    useTransition: function() {
      var l = Jf(jt)[0], t = Sl().memoizedState;
      return [typeof l == "boolean" ? l : ra(l), t];
    },
    useSyncExternalStore: O0,
    useId: P0,
    useHostTransitionStatus: kf,
    useFormState: Q0,
    useActionState: Q0,
    useOptimistic: function(l, t) {
      var u = Sl();
      return P !== null ? q0(u, P, l, t) : (u.baseState = l, [l, u.queue.dispatch]);
    },
    useMemoCache: Lf,
    useCacheRefresh: l1
  };
  e1.useEffectEvent = L0;
  function lc(l, t, u, a) {
    t = l.memoizedState, u = u(a, t), u = u == null ? t : B({}, t, u), l.memoizedState = u, l.lanes === 0 && (l.updateQueue.baseState = u);
  }
  var tc = {
    enqueueSetState: function(l, t, u) {
      l = l._reactInternals;
      var a = ht(), n = Cu(a);
      n.payload = t, u != null && (n.callback = u), t = pu(l, n, a), t !== null && (Kl(t, l, a), xa(t, l, a));
    },
    enqueueReplaceState: function(l, t, u) {
      l = l._reactInternals;
      var a = ht(), n = Cu(a);
      n.tag = 1, n.payload = t, u != null && (n.callback = u), t = pu(l, n, a), t !== null && (Kl(t, l, a), xa(t, l, a));
    },
    enqueueForceUpdate: function(l, t) {
      l = l._reactInternals;
      var u = ht(), a = Cu(u);
      a.tag = 2, t != null && (a.callback = t), t = pu(l, a, u), t !== null && (Kl(t, l, u), xa(t, l, u));
    }
  };
  function f1(l, t, u, a, n, e, f) {
    return l = l.stateNode, typeof l.shouldComponentUpdate == "function" ? l.shouldComponentUpdate(a, e, f) : t.prototype && t.prototype.isPureReactComponent ? !Ga(u, a) || !Ga(n, e) : !0;
  }
  function c1(l, t, u, a) {
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
  function im(l) {
    pn(l);
  }
  function ym(l) {
    console.error(l);
  }
  function vm(l) {
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
  function i1(l, t, u) {
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
    return u = Cu(u), u.tag = 3, u.payload = { element: null }, u.callback = function() {
      ne(l, t);
    }, u;
  }
  function y1(l) {
    return l = Cu(l), l.tag = 3, l;
  }
  function v1(l, t, u, a) {
    var n = u.type.getDerivedStateFromError;
    if (typeof n == "function") {
      var e = a.value;
      l.payload = function() {
        return n(e);
      }, l.callback = function() {
        i1(t, u, a);
      };
    }
    var f = u.stateNode;
    f !== null && typeof f.componentDidCatch == "function" && (l.callback = function() {
      i1(t, u, a), typeof n != "function" && (iu === null ? iu = /* @__PURE__ */ new Set([this]) : iu.add(this));
      var c = a.stack;
      this.componentDidCatch(a.value, { componentStack: c !== null ? c : "" });
    });
  }
  function mm(l, t, u, a, n) {
    if (u.flags |= 32768, a !== null && typeof a == "object" && typeof a.then == "function") {
      if (t = u.alternate, t !== null && aa(t, u, n, !0), u = tt.current, u !== null) {
        switch (u.tag) {
          case 31:
          case 13:
            return dt === null ? se() : u.alternate === null && ml === 0 && (ml = 3), u.flags &= -257, u.flags |= 65536, u.lanes = n, a === xn ? u.flags |= 16384 : (t = u.updateQueue, t === null ? u.updateQueue = /* @__PURE__ */ new Set([a]) : t.add(a), Uc(l, a, n)), !1;
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
    if (J) return t = tt.current, t !== null ? ((t.flags & 65536) === 0 && (t.flags |= 256), t.flags |= 65536, t.lanes = n, a !== Af && (l = Error(s(422), { cause: a }), Za(it(l, u)))) : (a !== Af && (t = Error(s(423), { cause: a }), Za(it(t, u))), l = l.current.alternate, l.flags |= 65536, n &= -n, l.lanes |= n, a = it(a, u), n = uc(l.stateNode, a, n), Bf(l, n), ml !== 4 && (ml = 2)), !1;
    var e = Error(s(520), { cause: a });
    if (e = it(e, u), en === null ? en = [e] : en.push(e), ml !== 4 && (ml = 2), t === null) return !0;
    a = it(a, u), u = t;
    do {
      switch (u.tag) {
        case 3:
          return u.flags |= 65536, l = n & -n, u.lanes |= l, l = uc(u.stateNode, a, l), Bf(u, l), !1;
        case 1:
          if (t = u.type, e = u.stateNode, (u.flags & 128) === 0 && (typeof t.getDerivedStateFromError == "function" || e !== null && typeof e.componentDidCatch == "function" && (iu === null || !iu.has(e)))) return u.flags |= 65536, n &= -n, u.lanes |= n, n = y1(n), v1(n, l, u, a), Bf(u, n), !1;
      }
      u = u.return;
    } while (u !== null);
    return !1;
  }
  var ac = Error(s(461)), zl = !1;
  function Nl(l, t, u, a) {
    t.child = l === null ? b0(t, null, u, a) : Ru(t, l.child, u, a);
  }
  function m1(l, t, u, a, n) {
    u = u.render;
    var e = t.ref;
    if ("ref" in a) {
      var f = {};
      for (var c in a) c !== "ref" && (f[c] = a[c]);
    } else f = a;
    return Nu(t), a = Xf(l, t, u, f, e, n), c = Qf(), l !== null && !zl ? (Zf(l, t, n), Gt(l, t, n)) : (J && c && zf(t), t.flags |= 1, Nl(l, t, a, n), t.child);
  }
  function d1(l, t, u, a, n) {
    if (l === null) {
      var e = u.type;
      return typeof e == "function" && !sf(e) && e.defaultProps === void 0 && u.compare === null ? (t.tag = 15, t.type = e, h1(l, t, e, a, n)) : (l = Qn(u.type, null, a, t, t.mode, n), l.ref = t.ref, l.return = t, t.child = l);
    }
    if (e = l.child, !mc(l, n)) {
      var f = e.memoizedProps;
      if (u = u.compare, u = u !== null ? u : Ga, u(f, a) && l.ref === t.ref) return Gt(l, t, n);
    }
    return t.flags |= 1, l = Yt(e, a), l.ref = t.ref, l.return = t, t.child = l;
  }
  function h1(l, t, u, a, n) {
    if (l !== null) {
      var e = l.memoizedProps;
      if (Ga(e, a) && l.ref === t.ref) if (zl = !1, t.pendingProps = a = e, mc(l, n)) (l.flags & 131072) !== 0 && (zl = !0);
      else return t.lanes = l.lanes, Gt(l, t, n);
    }
    return nc(l, t, u, a, n);
  }
  function S1(l, t, u, a) {
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
        return g1(l, t, e, u, a);
      }
      if ((u & 536870912) !== 0) t.memoizedState = {
        baseLanes: 0,
        cachePool: null
      }, l !== null && Kn(t, e !== null ? e.cachePool : null), e !== null ? T0(t, e) : Cf(), A0(t);
      else return a = t.lanes = 536870912, g1(l, t, e !== null ? e.baseLanes | u : u, u, a);
    } else e !== null ? (Kn(t, e.cachePool), T0(t, e), nu(t), t.memoizedState = null) : (l !== null && Kn(t, null), Cf(), nu(t));
    return Nl(l, t, n, u), t.child;
  }
  function Ia(l, t) {
    return l !== null && l.tag === 22 || t.stateNode !== null || (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), t.sibling;
  }
  function g1(l, t, u, a, n) {
    var e = Hf();
    return e = e === null ? null : {
      parent: bl._currentValue,
      pool: e
    }, t.memoizedState = {
      baseLanes: u,
      cachePool: e
    }, l !== null && Kn(t, null), Cf(), A0(t), l !== null && aa(l, t, a, !0), t.childLanes = n, null;
  }
  function ee(l, t) {
    return t = ce({
      mode: t.mode,
      children: t.children
    }, l.mode), t.ref = l.ref, l.child = t, t.return = l, t;
  }
  function s1(l, t, u) {
    return Ru(t, l.child, null, u), l = ee(t, t.pendingProps), l.flags |= 2, ut(t), t.memoizedState = null, l;
  }
  function dm(l, t, u) {
    var a = t.pendingProps, n = (t.flags & 128) !== 0;
    if (t.flags &= -129, l === null) {
      if (J) {
        if (a.mode === "hidden") return l = ee(t, a), t.lanes = 536870912, Ia(null, l);
        if (jf(t), (l = el) ? (l = Ny(l, mt), l = l !== null && l.data === "&" ? l : null, l !== null && (t.memoizedState = {
          dehydrated: l,
          treeContext: It !== null ? {
            id: Ot,
            overflow: Mt
          } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, u = u0(l), u.return = t, t.child = u, Ul = t, el = null)) : l = null, l === null) throw lu(t);
        return t.lanes = 536870912, null;
      }
      return ee(t, a);
    }
    var e = l.memoizedState;
    if (e !== null) {
      var f = e.dehydrated;
      if (jf(t), n) if (t.flags & 256) t.flags &= -257, t = s1(l, t, u);
      else if (t.memoizedState !== null) t.child = l.child, t.flags |= 128, t = null;
      else throw Error(s(558));
      else if (zl || aa(l, t, u, !1), n = (u & l.childLanes) !== 0, zl || n) {
        if (a = ul, a !== null && (f = ii(a, u), f !== 0 && f !== e.retryLane)) throw e.retryLane = f, Mu(l, f), Kl(a, l, f), ac;
        se(), t = s1(l, t, u);
      } else l = e.treeContext, el = St(f.nextSibling), Ul = t, J = !0, Pt = null, mt = !1, l !== null && e0(t, l), t = ee(t, a), t.flags |= 4096;
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
    return Nu(t), u = Xf(l, t, u, a, void 0, n), a = Qf(), l !== null && !zl ? (Zf(l, t, n), Gt(l, t, n)) : (J && a && zf(t), t.flags |= 1, Nl(l, t, u, n), t.child);
  }
  function b1(l, t, u, a, n, e) {
    return Nu(t), t.updateQueue = null, u = _0(t, a, u, n), E0(l), a = Qf(), l !== null && !zl ? (Zf(l, t, e), Gt(l, t, e)) : (J && a && zf(t), t.flags |= 1, Nl(l, t, u, e), t.child);
  }
  function o1(l, t, u, a, n) {
    if (Nu(t), t.stateNode === null) {
      var e = Pu, f = u.contextType;
      typeof f == "object" && f !== null && (e = Hl(f)), e = new u(a, e), t.memoizedState = e.state !== null && e.state !== void 0 ? e.state : null, e.updater = tc, t.stateNode = e, e._reactInternals = t, e = t.stateNode, e.props = a, e.state = t.memoizedState, e.refs = {}, qf(t), f = u.contextType, e.context = typeof f == "object" && f !== null ? Hl(f) : Pu, e.state = t.memoizedState, f = u.getDerivedStateFromProps, typeof f == "function" && (lc(t, u, f, a), e.state = t.memoizedState), typeof u.getDerivedStateFromProps == "function" || typeof e.getSnapshotBeforeUpdate == "function" || typeof e.UNSAFE_componentWillMount != "function" && typeof e.componentWillMount != "function" || (f = e.state, typeof e.componentWillMount == "function" && e.componentWillMount(), typeof e.UNSAFE_componentWillMount == "function" && e.UNSAFE_componentWillMount(), f !== e.state && tc.enqueueReplaceState(e, e.state, null), wa(t, a, e, n), Wa(), e.state = t.memoizedState), typeof e.componentDidMount == "function" && (t.flags |= 4194308), a = !0;
    } else if (l === null) {
      e = t.stateNode;
      var c = t.memoizedProps, i = Gu(u, c);
      e.props = i;
      var h = e.context, b = u.contextType;
      f = Pu, typeof b == "object" && b !== null && (f = Hl(b));
      var z = u.getDerivedStateFromProps;
      b = typeof z == "function" || typeof e.getSnapshotBeforeUpdate == "function", c = t.pendingProps !== c, b || typeof e.UNSAFE_componentWillReceiveProps != "function" && typeof e.componentWillReceiveProps != "function" || (c || h !== f) && c1(t, e, a, f), uu = !1;
      var S = t.memoizedState;
      e.state = S, wa(t, a, e, n), Wa(), h = t.memoizedState, c || S !== h || uu ? (typeof z == "function" && (lc(t, u, z, a), h = t.memoizedState), (i = uu || f1(t, u, i, a, S, h, f)) ? (b || typeof e.UNSAFE_componentWillMount != "function" && typeof e.componentWillMount != "function" || (typeof e.componentWillMount == "function" && e.componentWillMount(), typeof e.UNSAFE_componentWillMount == "function" && e.UNSAFE_componentWillMount()), typeof e.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof e.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = a, t.memoizedState = h), e.props = a, e.state = h, e.context = f, a = i) : (typeof e.componentDidMount == "function" && (t.flags |= 4194308), a = !1);
    } else {
      e = t.stateNode, Yf(l, t), f = t.memoizedProps, b = Gu(u, f), e.props = b, z = t.pendingProps, S = e.context, h = u.contextType, i = Pu, typeof h == "object" && h !== null && (i = Hl(h)), c = u.getDerivedStateFromProps, (h = typeof c == "function" || typeof e.getSnapshotBeforeUpdate == "function") || typeof e.UNSAFE_componentWillReceiveProps != "function" && typeof e.componentWillReceiveProps != "function" || (f !== z || S !== i) && c1(t, e, a, i), uu = !1, S = t.memoizedState, e.state = S, wa(t, a, e, n), Wa();
      var g = t.memoizedState;
      f !== z || S !== g || uu || l !== null && l.dependencies !== null && Vn(l.dependencies) ? (typeof c == "function" && (lc(t, u, c, a), g = t.memoizedState), (b = uu || f1(t, u, b, a, S, g, i) || l !== null && l.dependencies !== null && Vn(l.dependencies)) ? (h || typeof e.UNSAFE_componentWillUpdate != "function" && typeof e.componentWillUpdate != "function" || (typeof e.componentWillUpdate == "function" && e.componentWillUpdate(a, g, i), typeof e.UNSAFE_componentWillUpdate == "function" && e.UNSAFE_componentWillUpdate(a, g, i)), typeof e.componentDidUpdate == "function" && (t.flags |= 4), typeof e.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof e.componentDidUpdate != "function" || f === l.memoizedProps && S === l.memoizedState || (t.flags |= 4), typeof e.getSnapshotBeforeUpdate != "function" || f === l.memoizedProps && S === l.memoizedState || (t.flags |= 1024), t.memoizedProps = a, t.memoizedState = g), e.props = a, e.state = g, e.context = i, a = b) : (typeof e.componentDidUpdate != "function" || f === l.memoizedProps && S === l.memoizedState || (t.flags |= 4), typeof e.getSnapshotBeforeUpdate != "function" || f === l.memoizedProps && S === l.memoizedState || (t.flags |= 1024), a = !1);
    }
    return e = a, fe(l, t), a = (t.flags & 128) !== 0, e || a ? (e = t.stateNode, u = a && typeof u.getDerivedStateFromError != "function" ? null : e.render(), t.flags |= 1, l !== null && a ? (t.child = Ru(t, l.child, null, n), t.child = Ru(t, null, u, n)) : Nl(l, t, u, n), t.memoizedState = e.state, l = t.child) : l = Gt(l, t, n), l;
  }
  function z1(l, t, u, a) {
    return Uu(), t.flags |= 256, Nl(l, t, u, a), t.child;
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
      cachePool: m0()
    };
  }
  function cc(l, t, u) {
    return l = l !== null ? l.childLanes & ~u : 0, t && (l |= nt), l;
  }
  function T1(l, t, u) {
    var a = t.pendingProps, n = !1, e = (t.flags & 128) !== 0, f;
    if ((f = e) || (f = l !== null && l.memoizedState === null ? !1 : (hl.current & 2) !== 0), f && (n = !0, t.flags &= -129), f = (t.flags & 32) !== 0, t.flags &= -33, l === null) {
      if (J) {
        if (n ? au(t) : nu(t), (l = el) ? (l = Ny(l, mt), l = l !== null && l.data !== "&" ? l : null, l !== null && (t.memoizedState = {
          dehydrated: l,
          treeContext: It !== null ? {
            id: Ot,
            overflow: Mt
          } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, u = u0(l), u.return = t, t.child = u, Ul = t, el = null)) : l = null, l === null) throw lu(t);
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
      }, n), c = Du(c, n, u, null), c.flags |= 2, a.return = t, c.return = t, a.sibling = c, t.child = a, Ru(t, l.child, null, u), a = t.child, a.memoizedState = fc(u), a.childLanes = cc(l, f, u), t.memoizedState = ec, t = Ia(null, a));
      else if (au(t), Lc(c)) {
        if (f = c.nextSibling && c.nextSibling.dataset, f) var h = f.dgst;
        f = h, a = Error(s(419)), a.stack = "", a.digest = f, Za({
          value: a,
          source: null,
          stack: null
        }), t = yc(l, t, u);
      } else if (zl || aa(l, t, u, !1), f = (u & l.childLanes) !== 0, zl || f) {
        if (f = ul, f !== null && (a = ii(f, u), a !== 0 && a !== i.retryLane)) throw i.retryLane = a, Mu(l, a), Kl(f, l, a), ac;
        Vc(c) || se(), t = yc(l, t, u);
      } else Vc(c) ? (t.flags |= 192, t.child = l.child, t = null) : (l = i.treeContext, el = St(c.nextSibling), Ul = t, J = !0, Pt = null, mt = !1, l !== null && e0(t, l), t = ic(t, a.children), t.flags |= 4096);
      return t;
    }
    return n ? (nu(t), c = a.fallback, n = t.mode, i = l.child, h = i.sibling, a = Yt(i, {
      mode: "hidden",
      children: a.children
    }), a.subtreeFlags = i.subtreeFlags & 65011712, h !== null ? c = Yt(h, c) : (c = Du(c, n, u, null), c.flags |= 2), c.return = t, a.return = t, a.sibling = c, t.child = a, Ia(null, a), a = t.child, c = l.child.memoizedState, c === null ? c = fc(u) : (n = c.cachePool, n !== null ? (i = bl._currentValue, n = n.parent !== i ? {
      parent: i,
      pool: i
    } : n) : n = m0(), c = {
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
    return Ru(t, l.child, null, u), l = ic(t, t.pendingProps.children), l.flags |= 2, t.memoizedState = null, l;
  }
  function A1(l, t, u) {
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
  function E1(l, t, u) {
    var a = t.pendingProps, n = a.revealOrder, e = a.tail;
    a = a.children;
    var f = hl.current, c = (f & 2) !== 0;
    if (c ? (f = f & 1 | 2, t.flags |= 128) : f &= 1, O(hl, f), Nl(l, t, a, u), a = J ? Qa : 0, !c && l !== null && (l.flags & 128) !== 0) l: for (l = t.child; l !== null; ) {
      if (l.tag === 13) l.memoizedState !== null && A1(l, u, t);
      else if (l.tag === 19) A1(l, u, t);
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
        for (u = t.child, n = null; u !== null; ) l = u.alternate, l !== null && rn(l) === null && (n = u), u = u.sibling;
        u = n, u === null ? (n = t.child, t.child = null) : (n = u.sibling, u.sibling = null), vc(t, !1, n, u, e, a);
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        for (u = null, n = t.child, t.child = null; n !== null; ) {
          if (l = n.alternate, l !== null && rn(l) === null) {
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
  function hm(l, t, u) {
    switch (t.tag) {
      case 3:
        Rl(t, t.stateNode.containerInfo), tu(t, bl, l.memoizedState.cache), Uu();
        break;
      case 27:
      case 5:
        Oa(t);
        break;
      case 4:
        Rl(t, t.stateNode.containerInfo);
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
          return a.dehydrated !== null ? (au(t), t.flags |= 128, null) : (u & t.child.childLanes) !== 0 ? T1(l, t, u) : (au(t), l = Gt(l, t, u), l !== null ? l.sibling : null);
        au(t);
        break;
      case 19:
        var n = (l.flags & 128) !== 0;
        if (a = (u & t.childLanes) !== 0, a || (aa(l, t, u, !1), a = (u & t.childLanes) !== 0), n) {
          if (a) return E1(l, t, u);
          t.flags |= 128;
        }
        if (n = t.memoizedState, n !== null && (n.rendering = null, n.tail = null, n.lastEffect = null), O(hl, hl.current), a) break;
        return null;
      case 22:
        return t.lanes = 0, S1(l, t, u, t.pendingProps);
      case 24:
        tu(t, bl, l.memoizedState.cache);
    }
    return Gt(l, t, u);
  }
  function _1(l, t, u) {
    if (l !== null) if (l.memoizedProps !== t.pendingProps) zl = !0;
    else {
      if (!mc(l, u) && (t.flags & 128) === 0) return zl = !1, hm(l, t, u);
      zl = (l.flags & 131072) !== 0;
    }
    else zl = !1, J && (t.flags & 1048576) !== 0 && n0(t, Qa, t.index);
    switch (t.lanes = 0, t.tag) {
      case 16:
        l: {
          var a = t.pendingProps;
          if (l = Yu(t.elementType), t.type = l, typeof l == "function") sf(l) ? (a = Gu(l, a), t.tag = 1, t = o1(null, t, l, a, u)) : (t.tag = 0, t = nc(null, t, l, a, u));
          else {
            if (l != null) {
              var n = l.$$typeof;
              if (n === bt) {
                t.tag = 11, t = m1(null, t, l, a, u);
                break l;
              } else if (n === x) {
                t.tag = 14, t = d1(null, t, l, a, u);
                break l;
              }
            }
            throw t = ot(l) || l, Error(s(306, t, ""));
          }
        }
        return t;
      case 0:
        return nc(l, t, t.type, t.pendingProps, u);
      case 1:
        return a = t.type, n = Gu(a, t.pendingProps), o1(l, t, a, n, u);
      case 3:
        l: {
          if (Rl(t, t.stateNode.containerInfo), l === null) throw Error(s(387));
          a = t.pendingProps;
          var e = t.memoizedState;
          n = e.element, Yf(l, t), wa(t, a, null, u);
          var f = t.memoizedState;
          if (a = f.cache, tu(t, bl, a), a !== e.cache && Mf(t, [bl], u, !0), Wa(), a = f.element, e.isDehydrated) if (e = {
            element: a,
            isDehydrated: !1,
            cache: f.cache
          }, t.updateQueue.baseState = e, t.memoizedState = e, t.flags & 256) {
            t = z1(l, t, a, u);
            break l;
          } else if (a !== n) {
            n = it(Error(s(424)), t), Za(n), t = z1(l, t, a, u);
            break l;
          } else
            for (l = t.stateNode.containerInfo, l.nodeType === 9 ? l = l.body : l = l.nodeName === "HTML" ? l.ownerDocument.body : l, el = St(l.firstChild), Ul = t, J = !0, Pt = null, mt = !0, u = b0(t, null, a, u), t.child = u; u; ) u.flags = u.flags & -3 | 4096, u = u.sibling;
          else {
            if (Uu(), a === n) {
              t = Gt(l, t, u);
              break l;
            }
            Nl(l, t, a, u);
          }
          t = t.child;
        }
        return t;
      case 26:
        return fe(l, t), l === null ? (u = py(t.type, null, t.pendingProps, null)) ? t.memoizedState = u : J || (u = t.type, l = t.pendingProps, a = _e(Q.current).createElement(u), a[Dl] = t, a[Gl] = l, ql(a, u, l), _l(a), t.stateNode = a) : t.memoizedState = py(t.type, l.memoizedProps, t.pendingProps, l.memoizedState), null;
      case 27:
        return Oa(t), l === null && J && (a = t.stateNode = By(t.type, t.pendingProps, Q.current), Ul = t, mt = !0, n = el, du(t.type) ? (Kc = n, el = St(a.firstChild)) : el = n), Nl(l, t, t.pendingProps.children, u), fe(l, t), l === null && (t.flags |= 4194304), t.child;
      case 5:
        return l === null && J && ((n = a = el) && (a = Vm(a, t.type, t.pendingProps, mt), a !== null ? (t.stateNode = a, Ul = t, el = St(a.firstChild), mt = !1, n = !0) : n = !1), n || lu(t)), Oa(t), n = t.type, e = t.pendingProps, f = l !== null ? l.memoizedProps : null, a = e.children, Xc(n, e) ? a = null : f !== null && Xc(n, f) && (t.flags |= 32), t.memoizedState !== null && (n = Xf(l, t, tm, null, null, u), Sn._currentValue = n), fe(l, t), Nl(l, t, a, u), t.child;
      case 6:
        return l === null && J && ((l = u = el) && (u = Lm(u, t.pendingProps, mt), u !== null ? (t.stateNode = u, Ul = t, el = null, l = !0) : l = !1), l || lu(t)), null;
      case 13:
        return T1(l, t, u);
      case 4:
        return Rl(t, t.stateNode.containerInfo), a = t.pendingProps, l === null ? t.child = Ru(t, null, a, u) : Nl(l, t, a, u), t.child;
      case 11:
        return m1(l, t, t.type, t.pendingProps, u);
      case 7:
        return Nl(l, t, t.pendingProps, u), t.child;
      case 8:
        return Nl(l, t, t.pendingProps.children, u), t.child;
      case 12:
        return Nl(l, t, t.pendingProps.children, u), t.child;
      case 10:
        return a = t.pendingProps, tu(t, t.type, a.value), Nl(l, t, a.children, u), t.child;
      case 9:
        return n = t.type._context, a = t.pendingProps.children, Nu(t), n = Hl(n), a = a(n), t.flags |= 1, Nl(l, t, a, u), t.child;
      case 14:
        return d1(l, t, t.type, t.pendingProps, u);
      case 15:
        return h1(l, t, t.type, t.pendingProps, u);
      case 19:
        return E1(l, t, u);
      case 31:
        return dm(l, t, u);
      case 22:
        return S1(l, t, u, t.pendingProps);
      case 24:
        return Nu(t), a = Hl(bl), l === null ? (n = Hf(), n === null && (n = ul, e = Df(), n.pooledCache = e, e.refCount++, e !== null && (n.pooledCacheLanes |= u), n = e), t.memoizedState = {
          parent: a,
          cache: n
        }, qf(t), tu(t, bl, n)) : ((l.lanes & u) !== 0 && (Yf(l, t), wa(t, null, null, u), Wa()), n = l.memoizedState, e = t.memoizedState, n.parent !== a ? (n = {
          parent: a,
          cache: a
        }, t.memoizedState = n, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = n), tu(t, bl, a)) : (a = e.cache, tu(t, bl, a), a !== n.cache && Mf(t, [bl], u, !0))), Nl(l, t, t.pendingProps.children, u), t.child;
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
      else if (F1()) l.flags |= 8192;
      else throw Bu = xn, Nf;
    } else l.flags &= -16777217;
  }
  function O1(l, t) {
    if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0) l.flags &= -16777217;
    else if (l.flags |= 16777216, !Zy(t)) if (F1()) l.flags |= 8192;
    else throw Bu = xn, Nf;
  }
  function ie(l, t) {
    t !== null && (l.flags |= 4), l.flags & 16384 && (t = l.tag !== 22 ? ei() : 536870912, l.lanes |= t, ga |= t);
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
  function fl(l) {
    var t = l.alternate !== null && l.alternate.child === l.child, u = 0, a = 0;
    if (t) for (var n = l.child; n !== null; ) u |= n.lanes | n.childLanes, a |= n.subtreeFlags & 65011712, a |= n.flags & 65011712, n.return = l, n = n.sibling;
    else for (n = l.child; n !== null; ) u |= n.lanes | n.childLanes, a |= n.subtreeFlags, a |= n.flags, n.return = l, n = n.sibling;
    return l.subtreeFlags |= a, l.childLanes = u, t;
  }
  function Sm(l, t, u) {
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
        return fl(t), null;
      case 1:
        return fl(t), null;
      case 3:
        return u = t.stateNode, a = null, l !== null && (a = l.memoizedState.cache), t.memoizedState.cache !== a && (t.flags |= 2048), Ct(bl), dl(), u.pendingContext && (u.context = u.pendingContext, u.pendingContext = null), (l === null || l.child === null) && (ua(t) ? Xt(t) : l === null || l.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, Ef())), fl(t), null;
      case 26:
        var n = t.type, e = t.memoizedState;
        return l === null ? (Xt(t), e !== null ? (fl(t), O1(t, e)) : (fl(t), dc(t, n, null, a, u))) : e ? e !== l.memoizedState ? (Xt(t), fl(t), O1(t, e)) : (fl(t), t.flags &= -16777217) : (l = l.memoizedProps, l !== a && Xt(t), fl(t), dc(t, n, l, a, u)), null;
      case 27:
        if (on(t), u = Q.current, n = t.type, l !== null && t.stateNode != null) l.memoizedProps !== a && Xt(t);
        else {
          if (!a) {
            if (t.stateNode === null) throw Error(s(166));
            return fl(t), null;
          }
          l = N.current, ua(t) ? f0(t, l) : (l = By(n, a, u), t.stateNode = l, Xt(t));
        }
        return fl(t), null;
      case 5:
        if (on(t), n = t.type, l !== null && t.stateNode != null) l.memoizedProps !== a && Xt(t);
        else {
          if (!a) {
            if (t.stateNode === null) throw Error(s(166));
            return fl(t), null;
          }
          if (e = N.current, ua(t)) f0(t, e);
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
        return fl(t), dc(t, t.type, l === null ? null : l.memoizedProps, t.pendingProps, u), null;
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
            l[Dl] = t, l = !!(l.nodeValue === u || a !== null && a.suppressHydrationWarning === !0 || Ay(l.nodeValue, u)), l || lu(t, !0);
          } else l = _e(l).createTextNode(a), l[Dl] = t, t.stateNode = l;
        }
        return fl(t), null;
      case 31:
        if (u = t.memoizedState, l === null || l.memoizedState !== null) {
          if (a = ua(t), u !== null) {
            if (l === null) {
              if (!a) throw Error(s(318));
              if (l = t.memoizedState, l = l !== null ? l.dehydrated : null, !l) throw Error(s(557));
              l[Dl] = t;
            } else Uu(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            fl(t), l = !1;
          } else u = Ef(), l !== null && l.memoizedState !== null && (l.memoizedState.hydrationErrors = u), l = !0;
          if (!l)
            return t.flags & 256 ? (ut(t), t) : (ut(t), null);
          if ((t.flags & 128) !== 0) throw Error(s(558));
        }
        return fl(t), null;
      case 13:
        if (a = t.memoizedState, l === null || l.memoizedState !== null && l.memoizedState.dehydrated !== null) {
          if (n = ua(t), a !== null && a.dehydrated !== null) {
            if (l === null) {
              if (!n) throw Error(s(318));
              if (n = t.memoizedState, n = n !== null ? n.dehydrated : null, !n) throw Error(s(317));
              n[Dl] = t;
            } else Uu(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            fl(t), n = !1;
          } else n = Ef(), l !== null && l.memoizedState !== null && (l.memoizedState.hydrationErrors = n), n = !0;
          if (!n)
            return t.flags & 256 ? (ut(t), t) : (ut(t), null);
        }
        return ut(t), (t.flags & 128) !== 0 ? (t.lanes = u, t) : (u = a !== null, l = l !== null && l.memoizedState !== null, u && (a = t.child, n = null, a.alternate !== null && a.alternate.memoizedState !== null && a.alternate.memoizedState.cachePool !== null && (n = a.alternate.memoizedState.cachePool.pool), e = null, a.memoizedState !== null && a.memoizedState.cachePool !== null && (e = a.memoizedState.cachePool.pool), e !== n && (a.flags |= 2048)), u !== l && u && (t.child.flags |= 8192), ie(t, t.updateQueue), fl(t), null);
      case 4:
        return dl(), l === null && by(t.stateNode.containerInfo), fl(t), null;
      case 10:
        return Ct(t.type), fl(t), null;
      case 19:
        if (T(hl), a = t.memoizedState, a === null) return fl(t), null;
        if (n = (t.flags & 128) !== 0, e = a.rendering, e === null) if (n) Pa(a, !1);
        else {
          if (ml !== 0 || l !== null && (l.flags & 128) !== 0) for (l = t.child; l !== null; ) {
            if (e = rn(l), e !== null) {
              for (t.flags |= 128, Pa(a, !1), l = e.updateQueue, t.updateQueue = l, ie(t, l), t.subtreeFlags = 0, l = u, u = t.child; u !== null; ) t0(u, l), u = u.sibling;
              return O(hl, hl.current & 1 | 2), J && Bt(t, a.treeForkCount), t.child;
            }
            l = l.sibling;
          }
          a.tail !== null && Fl() > he && (t.flags |= 128, n = !0, Pa(a, !1), t.lanes = 4194304);
        }
        else {
          if (!n) if (l = rn(e), l !== null) {
            if (t.flags |= 128, n = !0, l = l.updateQueue, t.updateQueue = l, ie(t, l), Pa(a, !0), a.tail === null && a.tailMode === "hidden" && !e.alternate && !J) return fl(t), null;
          } else 2 * Fl() - a.renderingStartTime > he && u !== 536870912 && (t.flags |= 128, n = !0, Pa(a, !1), t.lanes = 4194304);
          a.isBackwards ? (e.sibling = t.child, t.child = e) : (l = a.last, l !== null ? l.sibling = e : t.child = e, a.last = e);
        }
        return a.tail !== null ? (l = a.tail, a.rendering = l, a.tail = l.sibling, a.renderingStartTime = Fl(), l.sibling = null, u = hl.current, O(hl, n ? u & 1 | 2 : u & 1), J && Bt(t, a.treeForkCount), l) : (fl(t), null);
      case 22:
      case 23:
        return ut(t), pf(), a = t.memoizedState !== null, l !== null ? l.memoizedState !== null !== a && (t.flags |= 8192) : a && (t.flags |= 8192), a ? (u & 536870912) !== 0 && (t.flags & 128) === 0 && (fl(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : fl(t), u = t.updateQueue, u !== null && ie(t, u.retryQueue), u = null, l !== null && l.memoizedState !== null && l.memoizedState.cachePool !== null && (u = l.memoizedState.cachePool.pool), a = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (a = t.memoizedState.cachePool.pool), a !== u && (t.flags |= 2048), l !== null && T(qu), null;
      case 24:
        return u = null, l !== null && (u = l.memoizedState.cache), t.memoizedState.cache !== u && (t.flags |= 2048), Ct(bl), fl(t), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(s(156, t.tag));
  }
  function gm(l, t) {
    switch (Tf(t), t.tag) {
      case 1:
        return l = t.flags, l & 65536 ? (t.flags = l & -65537 | 128, t) : null;
      case 3:
        return Ct(bl), dl(), l = t.flags, (l & 65536) !== 0 && (l & 128) === 0 ? (t.flags = l & -65537 | 128, t) : null;
      case 26:
      case 27:
      case 5:
        return on(t), null;
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
        return T(hl), null;
      case 4:
        return dl(), null;
      case 10:
        return Ct(t.type), null;
      case 22:
      case 23:
        return ut(t), pf(), l !== null && T(qu), l = t.flags, l & 65536 ? (t.flags = l & -65537 | 128, t) : null;
      case 24:
        return Ct(bl), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function M1(l, t) {
    switch (Tf(t), t.tag) {
      case 3:
        Ct(bl), dl();
        break;
      case 26:
      case 27:
      case 5:
        on(t);
        break;
      case 4:
        dl();
        break;
      case 31:
        t.memoizedState !== null && ut(t);
        break;
      case 13:
        ut(t);
        break;
      case 19:
        T(hl);
        break;
      case 10:
        Ct(t.type);
        break;
      case 22:
      case 23:
        ut(t), pf(), l !== null && T(qu);
        break;
      case 24:
        Ct(bl);
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
      I(t, t.return, c);
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
              } catch (b) {
                I(n, i, b);
              }
            }
          }
          a = a.next;
        } while (a !== e);
      }
    } catch (b) {
      I(t, t.return, b);
    }
  }
  function D1(l) {
    var t = l.updateQueue;
    if (t !== null) {
      var u = l.stateNode;
      try {
        z0(t, u);
      } catch (a) {
        I(l, l.return, a);
      }
    }
  }
  function U1(l, t, u) {
    u.props = Gu(l.type, l.memoizedProps), u.state = l.memoizedState;
    try {
      u.componentWillUnmount();
    } catch (a) {
      I(l, t, a);
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
      I(l, t, n);
    }
  }
  function Dt(l, t) {
    var u = l.ref, a = l.refCleanup;
    if (u !== null) if (typeof a == "function") try {
      a();
    } catch (n) {
      I(l, t, n);
    } finally {
      l.refCleanup = null, l = l.alternate, l != null && (l.refCleanup = null);
    }
    else if (typeof u == "function") try {
      u(null);
    } catch (n) {
      I(l, t, n);
    }
    else u.current = null;
  }
  function H1(l) {
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
      I(l, l.return, n);
    }
  }
  function hc(l, t, u) {
    try {
      var a = l.stateNode;
      pm(a, l.type, u, t), a[Gl] = t;
    } catch (n) {
      I(l, l.return, n);
    }
  }
  function N1(l) {
    return l.tag === 5 || l.tag === 3 || l.tag === 26 || l.tag === 27 && du(l.type) || l.tag === 4;
  }
  function Sc(l) {
    l: for (; ; ) {
      for (; l.sibling === null; ) {
        if (l.return === null || N1(l.return)) return null;
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
    if (a === 5 || a === 6) l = l.stateNode, t ? (u.nodeType === 9 ? u.body : u.nodeName === "HTML" ? u.ownerDocument.body : u).insertBefore(l, t) : (t = u.nodeType === 9 ? u.body : u.nodeName === "HTML" ? u.ownerDocument.body : u, t.appendChild(l), u = u._reactRootContainer, u != null || t.onclick !== null || (t.onclick = Nt));
    else if (a !== 4 && (a === 27 && du(l.type) && (u = l.stateNode, t = null), l = l.child, l !== null)) for (gc(l, t, u), l = l.sibling; l !== null; ) gc(l, t, u), l = l.sibling;
  }
  function ye(l, t, u) {
    var a = l.tag;
    if (a === 5 || a === 6) l = l.stateNode, t ? u.insertBefore(l, t) : u.appendChild(l);
    else if (a !== 4 && (a === 27 && du(l.type) && (u = l.stateNode), l = l.child, l !== null)) for (ye(l, t, u), l = l.sibling; l !== null; ) ye(l, t, u), l = l.sibling;
  }
  function q1(l) {
    var t = l.stateNode, u = l.memoizedProps;
    try {
      for (var a = l.type, n = t.attributes; n.length; ) t.removeAttributeNode(n[0]);
      ql(t, a, u), t[Dl] = l, t[Gl] = u;
    } catch (e) {
      I(l, l.return, e);
    }
  }
  var Qt = !1, Tl = !1, sc = !1, Y1 = typeof WeakSet == "function" ? WeakSet : Set, Ol = null;
  function sm(l, t) {
    if (l = l.containerInfo, jc = qe, l = Wi(l), yf(l)) {
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
          var f = 0, c = -1, i = -1, h = 0, b = 0, z = l, S = null;
          t: for (; ; ) {
            for (var g; z !== u || n !== 0 && z.nodeType !== 3 || (c = f + n), z !== e || a !== 0 && z.nodeType !== 3 || (i = f + a), z.nodeType === 3 && (f += z.nodeValue.length), (g = z.firstChild) !== null; )
              S = z, z = g;
            for (; ; ) {
              if (z === l) break t;
              if (S === u && ++h === n && (c = f), S === e && ++b === a && (i = f), (g = z.nextSibling) !== null) break;
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
            } catch (R) {
              I(u, u.return, R);
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
  function B1(l, t, u) {
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
          I(u, u.return, f);
        }
        else {
          var n = Gu(u.type, t.memoizedProps);
          t = t.memoizedState;
          try {
            l.componentDidUpdate(n, t, l.__reactInternalSnapshotBeforeUpdate);
          } catch (f) {
            I(u, u.return, f);
          }
        }
        a & 64 && D1(u), a & 512 && tn(u, u.return);
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
            z0(l, t);
          } catch (f) {
            I(u, u.return, f);
          }
        }
        break;
      case 27:
        t === null && a & 4 && q1(u);
      case 26:
      case 5:
        Vt(l, u), t === null && a & 4 && H1(u), a & 512 && tn(u, u.return);
        break;
      case 12:
        Vt(l, u);
        break;
      case 31:
        Vt(l, u), a & 4 && p1(l, u);
        break;
      case 13:
        Vt(l, u), a & 4 && j1(l, u), a & 64 && (l = u.memoizedState, l !== null && (l = l.dehydrated, l !== null && (u = Mm.bind(null, u), Km(l, u))));
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
  function R1(l) {
    var t = l.alternate;
    t !== null && (l.alternate = null, R1(t)), l.child = null, l.deletions = null, l.sibling = null, l.tag === 5 && (t = l.stateNode, t !== null && xe(t)), l.stateNode = null, l.return = null, l.dependencies = null, l.memoizedProps = null, l.memoizedState = null, l.pendingProps = null, l.stateNode = null, l.updateQueue = null;
  }
  var il = null, Ql = !1;
  function Zt(l, t, u) {
    for (u = u.child; u !== null; ) C1(l, t, u), u = u.sibling;
  }
  function C1(l, t, u) {
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
        var a = il, n = Ql;
        du(u.type) && (il = u.stateNode, Ql = !1), Zt(l, t, u), mn(u.stateNode), il = a, Ql = n;
        break;
      case 5:
        Tl || Dt(u, t);
      case 6:
        if (a = il, n = Ql, il = null, Zt(l, t, u), il = a, Ql = n, il !== null) if (Ql) try {
          (il.nodeType === 9 ? il.body : il.nodeName === "HTML" ? il.ownerDocument.body : il).removeChild(u.stateNode);
        } catch (e) {
          I(u, t, e);
        }
        else try {
          il.removeChild(u.stateNode);
        } catch (e) {
          I(u, t, e);
        }
        break;
      case 18:
        il !== null && (Ql ? (l = il, Uy(l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l, u.stateNode), _a(l)) : Uy(il, u.stateNode));
        break;
      case 4:
        a = il, n = Ql, il = u.stateNode.containerInfo, Ql = !0, Zt(l, t, u), il = a, Ql = n;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        eu(2, u, t), Tl || eu(4, u, t), Zt(l, t, u);
        break;
      case 1:
        Tl || (Dt(u, t), a = u.stateNode, typeof a.componentWillUnmount == "function" && U1(u, t, a)), Zt(l, t, u);
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
  function p1(l, t) {
    if (t.memoizedState === null && (l = t.alternate, l !== null && (l = l.memoizedState, l !== null))) {
      l = l.dehydrated;
      try {
        _a(l);
      } catch (u) {
        I(t, t.return, u);
      }
    }
  }
  function j1(l, t) {
    if (t.memoizedState === null && (l = t.alternate, l !== null && (l = l.memoizedState, l !== null && (l = l.dehydrated, l !== null)))) try {
      _a(l);
    } catch (u) {
      I(t, t.return, u);
    }
  }
  function bm(l) {
    switch (l.tag) {
      case 31:
      case 13:
      case 19:
        var t = l.stateNode;
        return t === null && (t = l.stateNode = new Y1()), t;
      case 22:
        return l = l.stateNode, t = l._retryCache, t === null && (t = l._retryCache = new Y1()), t;
      default:
        throw Error(s(435, l.tag));
    }
  }
  function ve(l, t) {
    var u = bm(l);
    t.forEach(function(a) {
      if (!u.has(a)) {
        u.add(a);
        var n = Dm.bind(null, l, a);
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
              il = c.stateNode, Ql = !1;
              break l;
            }
            break;
          case 5:
            il = c.stateNode, Ql = !1;
            break l;
          case 3:
          case 4:
            il = c.stateNode.containerInfo, Ql = !0;
            break l;
        }
        c = c.return;
      }
      if (il === null) throw Error(s(160));
      C1(e, f, n), il = null, Ql = !1, e = n.alternate, e !== null && (e.return = null), n.return = null;
    }
    if (t.subtreeFlags & 13886) for (t = t.child; t !== null; ) G1(t, l), t = t.sibling;
  }
  var Tt = null;
  function G1(l, t) {
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
                  e = n.getElementsByTagName("title")[0], (!e || e[Ha] || e[Dl] || e.namespaceURI === "http://www.w3.org/2000/svg" || e.hasAttribute("itemprop")) && (e = n.createElement(a), n.head.insertBefore(e, n.querySelector("head > title"))), ql(e, a, u), e[Dl] = l, _l(e), a = e;
                  break l;
                case "link":
                  var f = Xy("link", "href", n).get(a + (u.href || ""));
                  if (f) {
                    for (var c = 0; c < f.length; c++) if (e = f[c], e.getAttribute("href") === (u.href == null || u.href === "" ? null : u.href) && e.getAttribute("rel") === (u.rel == null ? null : u.rel) && e.getAttribute("title") === (u.title == null ? null : u.title) && e.getAttribute("crossorigin") === (u.crossOrigin == null ? null : u.crossOrigin)) {
                      f.splice(c, 1);
                      break t;
                    }
                  }
                  e = n.createElement(a), ql(e, a, u), n.head.appendChild(e);
                  break;
                case "meta":
                  if (f = Xy("meta", "content", n).get(a + (u.content || ""))) {
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
          } else Qy(n, l.type, l.stateNode);
          else l.stateNode = Gy(n, a, l.memoizedProps);
          else e !== a ? (e === null ? u.stateNode !== null && (u = u.stateNode, u.parentNode.removeChild(u)) : e.count--, a === null ? Qy(n, l.type, l.stateNode) : Gy(n, a, l.memoizedProps)) : a === null && l.stateNode !== null && hc(l, l.memoizedProps, u.memoizedProps);
        }
        break;
      case 27:
        Zl(t, l), Vl(l), a & 512 && (Tl || u === null || Dt(u, u.return)), u !== null && a & 4 && hc(l, l.memoizedProps, u.memoizedProps);
        break;
      case 5:
        if (Zl(t, l), Vl(l), a & 512 && (Tl || u === null || Dt(u, u.return)), l.flags & 32) {
          n = l.stateNode;
          try {
            Wu(n, "");
          } catch (U) {
            I(l, l.return, U);
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
            I(l, l.return, U);
          }
        }
        break;
      case 3:
        if (De = null, n = Tt, Tt = Oe(t.containerInfo), Zl(t, l), Tt = n, Vl(l), a & 4 && u !== null && u.memoizedState.isDehydrated) try {
          _a(t.containerInfo);
        } catch (U) {
          I(l, l.return, U);
        }
        sc && (sc = !1, X1(l));
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
        var i = u !== null && u.memoizedState !== null, h = Qt, b = Tl;
        if (Qt = h || n, Tl = b || i, Zl(t, l), Tl = b, Qt = h, Vl(l), a & 8192) l: for (t = l.stateNode, t._visibility = n ? t._visibility & -2 : t._visibility | 1, n && (u === null || i || Qt || Tl || Xu(l)), u = null, t = l; ; ) {
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
                I(i, i.return, U);
              }
            }
          } else if (t.tag === 6) {
            if (u === null) {
              i = t;
              try {
                i.stateNode.nodeValue = n ? "" : i.memoizedProps;
              } catch (U) {
                I(i, i.return, U);
              }
            }
          } else if (t.tag === 18) {
            if (u === null) {
              i = t;
              try {
                var g = i.stateNode;
                n ? Hy(g, !0) : Hy(i.stateNode, !1);
              } catch (U) {
                I(i, i.return, U);
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
          if (N1(a)) {
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
            u.flags & 32 && (Wu(e, ""), u.flags &= -33), ye(l, Sc(l), e);
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
        I(l, l.return, c);
      }
      l.flags &= -3;
    }
    t & 4096 && (l.flags &= -4097);
  }
  function X1(l) {
    if (l.subtreeFlags & 1024) for (l = l.child; l !== null; ) {
      var t = l;
      X1(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), l = l.sibling;
    }
  }
  function Vt(l, t) {
    if (t.subtreeFlags & 8772) for (t = t.child; t !== null; ) B1(l, t.alternate, t), t = t.sibling;
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
          typeof u.componentWillUnmount == "function" && U1(t, t.return, u), Xu(t);
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
            I(a, a.return, h);
          }
          if (a = e, n = a.updateQueue, n !== null) {
            var c = a.stateNode;
            try {
              var i = n.shared.hiddenCallbacks;
              if (i !== null) for (n.shared.hiddenCallbacks = null, n = 0; n < i.length; n++) o0(i[n], c);
            } catch (h) {
              I(a, a.return, h);
            }
          }
          u && f & 64 && D1(e), tn(e, e.return);
          break;
        case 27:
          q1(e);
        case 26:
        case 5:
          Lt(n, e, u), u && a === null && f & 4 && H1(e), tn(e, e.return);
          break;
        case 12:
          Lt(n, e, u);
          break;
        case 31:
          Lt(n, e, u), u && f & 4 && p1(n, e);
          break;
        case 13:
          Lt(n, e, u), u && f & 4 && j1(n, e);
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
  function bc(l, t) {
    var u = null;
    l !== null && l.memoizedState !== null && l.memoizedState.cachePool !== null && (u = l.memoizedState.cachePool.pool), l = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (l = t.memoizedState.cachePool.pool), l !== u && (l != null && l.refCount++, u != null && Va(u));
  }
  function oc(l, t) {
    l = null, t.alternate !== null && (l = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== l && (t.refCount++, l != null && Va(l));
  }
  function At(l, t, u, a) {
    if (t.subtreeFlags & 10256) for (t = t.child; t !== null; ) Q1(l, t, u, a), t = t.sibling;
  }
  function Q1(l, t, u, a) {
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
            I(t, t.return, i);
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
        e = t.stateNode, f = t.alternate, t.memoizedState !== null ? e._visibility & 2 ? At(l, t, u, a) : un(l, t) : e._visibility & 2 ? At(l, t, u, a) : (e._visibility |= 2, da(l, t, u, a, (t.subtreeFlags & 10256) !== 0 || !1)), n & 2048 && bc(f, t);
        break;
      case 24:
        At(l, t, u, a), n & 2048 && oc(t.alternate, t);
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
          var b = f.stateNode;
          f.memoizedState !== null ? b._visibility & 2 ? da(e, f, c, i, n) : un(e, f) : (b._visibility |= 2, da(e, f, c, i, n)), n && h & 2048 && bc(f.alternate, f);
          break;
        case 24:
          da(e, f, c, i, n), n && h & 2048 && oc(f.alternate, f);
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
          un(u, a), n & 2048 && bc(a.alternate, a);
          break;
        case 24:
          un(u, a), n & 2048 && oc(a.alternate, a);
          break;
        default:
          un(u, a);
      }
      t = t.sibling;
    }
  }
  var an = 8192;
  function ha(l, t, u) {
    if (l.subtreeFlags & an) for (l = l.child; l !== null; ) Z1(l, t, u), l = l.sibling;
  }
  function Z1(l, t, u) {
    switch (l.tag) {
      case 26:
        ha(l, t, u), l.flags & an && l.memoizedState !== null && td(u, Tt, l.memoizedState, l.memoizedProps);
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
  function V1(l) {
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
        Ol = a, K1(a, l);
      }
      V1(l);
    }
    if (l.subtreeFlags & 10256) for (l = l.child; l !== null; ) L1(l), l = l.sibling;
  }
  function L1(l) {
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
        Ol = a, K1(a, l);
      }
      V1(l);
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
  function K1(l, t) {
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
        if (R1(a), a === u) {
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
  var om = {
    getCacheForType: function(l) {
      var t = Hl(bl), u = t.data.get(l);
      return u === void 0 && (u = l(), t.data.set(l, u)), u;
    },
    cacheSignal: function() {
      return Hl(bl).controller.signal;
    }
  }, zm = typeof WeakMap == "function" ? WeakMap : Map, r = 0, ul = null, Z = null, L = 0, k = 0, at = null, fu = !1, Sa = !1, zc = !1, Kt = 0, ml = 0, cu = 0, Qu = 0, Tc = 0, nt = 0, ga = 0, en = null, Ll = null, Ac = !1, de = 0, J1 = 0, he = 1 / 0, Se = null, iu = null, Al = 0, yu = null, sa = null, Jt = 0, Ec = 0, _c = null, x1 = null, fn = 0, Oc = null;
  function ht() {
    return (r & 2) !== 0 && L !== 0 ? L & -L : _.T !== null ? qc() : vi();
  }
  function W1() {
    if (nt === 0) if ((L & 536870912) === 0 || J) {
      var l = An;
      An <<= 1, (An & 3932160) === 0 && (An = 262144), nt = l;
    } else nt = 536870912;
    return l = tt.current, l !== null && (l.flags |= 32), nt;
  }
  function Kl(l, t, u) {
    (l === ul && (k === 2 || k === 9) || l.cancelPendingCommit !== null) && (ba(l, 0), vu(l, L, nt, !1)), On(l, u), ((r & 2) === 0 || l !== ul) && (l === ul && ((r & 2) === 0 && (Qu |= u), ml === 4 && vu(l, L, nt, !1)), xt(l));
  }
  function w1(l, t, u) {
    if ((r & 6) !== 0) throw Error(s(327));
    var a = !u && (t & 127) === 0 && (t & l.expiredLanes) === 0 || Da(l, t), n = a ? Em(l, t) : Dc(l, t, !0), e = a;
    do {
      if (n === 0) {
        Sa && !a && vu(l, t, 0, !1);
        break;
      } else {
        if (u = l.current.alternate, e && !Tm(u)) {
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
              if (i && (ba(c, f).flags |= 256), f = Dc(c, f, !1), f !== 2) {
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
          ba(l, 0), vu(l, t, 0, !0);
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
            Jt = t, a.timeoutHandle = My($1.bind(null, a, u, Ll, Se, Ac, t, nt, Qu, ga, fu, e, "Throttled", -0, 0), n);
            break l;
          }
          $1(a, u, Ll, Se, Ac, t, nt, Qu, ga, fu, e, null, -0, 0);
        }
      }
      break;
    } while (!0);
    xt(l);
  }
  function $1(l, t, u, a, n, e, f, c, i, h, b, z, S, g) {
    if (l.timeoutHandle = -1, z = t.subtreeFlags, z & 8192 || (z & 16785408) === 16785408) {
      z = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: Nt
      }, Z1(t, e, z);
      var U = (e & 62914560) === e ? de - Fl() : (e & 4194048) === e ? J1 - Fl() : 0;
      if (U = ud(z, U), U !== null) {
        Jt = e, l.cancelPendingCommit = U(uy.bind(null, l, t, e, u, a, n, f, c, i, b, z, null, S, g)), vu(l, e, f, !h);
        return;
      }
    }
    uy(l, t, e, u, a, n, f, c, i);
  }
  function Tm(l) {
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
    u !== 0 && fi(l, u, t);
  }
  function ge() {
    return (r & 6) === 0 ? (cn(0, !1), !1) : !0;
  }
  function Mc() {
    if (Z !== null) {
      if (k === 0) var l = Z.return;
      else l = Z, Rt = Hu = null, Vf(l), ca = null, Ka = 0, l = Z;
      for (; l !== null; ) M1(l.alternate, l), l = l.return;
      Z = null;
    }
  }
  function ba(l, t) {
    var u = l.timeoutHandle;
    u !== -1 && (l.timeoutHandle = -1, Xm(u)), u = l.cancelPendingCommit, u !== null && (l.cancelPendingCommit = null, u()), Jt = 0, Mc(), ul = l, Z = u = Yt(l.current, null), L = t, k = 0, at = null, fu = !1, Sa = Da(l, t), zc = !1, ga = nt = Tc = Qu = cu = ml = 0, Ll = en = null, Ac = !1, (t & 8) !== 0 && (t |= t & 32);
    var a = l.entangledLanes;
    if (a !== 0) for (l = l.entanglements, a &= t; 0 < a; ) {
      var n = 31 - Il(a), e = 1 << n;
      t |= l[n], a &= ~e;
    }
    return Kt = t, jn(), u;
  }
  function r1(l, t) {
    p = null, _.H = ka, t === fa || t === Jn ? (t = S0(), k = 3) : t === Nf ? (t = S0(), k = 4) : k = t === ac ? 8 : t !== null && typeof t == "object" && typeof t.then == "function" ? 6 : 1, at = t, Z === null && (ml = 1, ne(l, it(t, l.current)));
  }
  function F1() {
    var l = tt.current;
    return l === null ? !0 : (L & 4194048) === L ? dt === null : (L & 62914560) === L || (L & 536870912) !== 0 ? l === dt : !1;
  }
  function k1() {
    var l = _.H;
    return _.H = ka, l === null ? ka : l;
  }
  function I1() {
    var l = _.A;
    return _.A = om, l;
  }
  function se() {
    ml = 4, fu || (L & 4194048) !== L && tt.current !== null || (Sa = !0), (cu & 134217727) === 0 && (Qu & 134217727) === 0 || ul === null || vu(ul, L, nt, !1);
  }
  function Dc(l, t, u) {
    var a = r;
    r |= 2;
    var n = k1(), e = I1();
    (ul !== l || L !== t) && (Se = null, ba(l, t)), t = !1;
    var f = ml;
    l: do
      try {
        if (k !== 0 && Z !== null) {
          var c = Z, i = at;
          switch (k) {
            case 8:
              Mc(), f = 6;
              break l;
            case 3:
            case 2:
            case 9:
            case 6:
              tt.current === null && (t = !0);
              var h = k;
              if (k = 0, at = null, oa(l, c, i, h), u && Sa) {
                f = 0;
                break l;
              }
              break;
            default:
              h = k, k = 0, at = null, oa(l, c, i, h);
          }
        }
        Am(), f = ml;
        break;
      } catch (b) {
        r1(l, b);
      }
    while (!0);
    return t && l.shellSuspendCounter++, Rt = Hu = null, r = a, _.H = n, _.A = e, Z === null && (ul = null, L = 0, jn()), f;
  }
  function Am() {
    for (; Z !== null; ) P1(Z);
  }
  function Em(l, t) {
    var u = r;
    r |= 2;
    var a = k1(), n = I1();
    ul !== l || L !== t ? (Se = null, he = Fl() + 500, ba(l, t)) : Sa = Da(l, t);
    l: do
      try {
        if (k !== 0 && Z !== null) {
          t = Z;
          var e = at;
          t: switch (k) {
            case 1:
              k = 0, at = null, oa(l, t, e, 1);
              break;
            case 2:
            case 9:
              if (d0(e)) {
                k = 0, at = null, ly(t);
                break;
              }
              t = function() {
                k !== 2 && k !== 9 || ul !== l || (k = 7), xt(l);
              }, e.then(t, t);
              break l;
            case 3:
              k = 7;
              break l;
            case 4:
              k = 5;
              break l;
            case 7:
              d0(e) ? (k = 0, at = null, ly(t)) : (k = 0, at = null, oa(l, t, e, 7));
              break;
            case 5:
              var f = null;
              switch (Z.tag) {
                case 26:
                  f = Z.memoizedState;
                case 5:
                case 27:
                  var c = Z;
                  if (f ? Zy(f) : c.stateNode.complete) {
                    k = 0, at = null;
                    var i = c.sibling;
                    if (i !== null) Z = i;
                    else {
                      var h = c.return;
                      h !== null ? (Z = h, be(h)) : Z = null;
                    }
                    break t;
                  }
              }
              k = 0, at = null, oa(l, t, e, 5);
              break;
            case 6:
              k = 0, at = null, oa(l, t, e, 6);
              break;
            case 8:
              Mc(), ml = 6;
              break l;
            default:
              throw Error(s(462));
          }
        }
        _m();
        break;
      } catch (b) {
        r1(l, b);
      }
    while (!0);
    return Rt = Hu = null, _.H = a, _.A = n, r = u, Z !== null ? 0 : (ul = null, L = 0, jn(), ml);
  }
  function _m() {
    for (; Z !== null && !lv(); ) P1(Z);
  }
  function P1(l) {
    var t = _1(l.alternate, l, Kt);
    l.memoizedProps = l.pendingProps, t === null ? be(l) : Z = t;
  }
  function ly(l) {
    var t = l, u = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = b1(u, t, t.pendingProps, t.type, void 0, L);
        break;
      case 11:
        t = b1(u, t, t.pendingProps, t.type.render, t.ref, L);
        break;
      case 5:
        Vf(t);
      default:
        M1(u, t), t = Z = t0(t, Kt), t = _1(u, t, Kt);
    }
    l.memoizedProps = l.pendingProps, t === null ? be(l) : Z = t;
  }
  function oa(l, t, u, a) {
    Rt = Hu = null, Vf(t), ca = null, Ka = 0;
    var n = t.return;
    try {
      if (mm(l, n, t, u, L)) {
        ml = 1, ne(l, it(u, l.current)), Z = null;
        return;
      }
    } catch (e) {
      if (n !== null) throw Z = n, e;
      ml = 1, ne(l, it(u, l.current)), Z = null;
      return;
    }
    t.flags & 32768 ? (J || a === 1 ? l = !0 : Sa || (L & 536870912) !== 0 ? l = !1 : (fu = l = !0, (a === 2 || a === 9 || a === 3 || a === 6) && (a = tt.current, a !== null && a.tag === 13 && (a.flags |= 16384))), ty(t, l)) : be(t);
  }
  function be(l) {
    var t = l;
    do {
      if ((t.flags & 32768) !== 0) {
        ty(t, fu);
        return;
      }
      l = t.return;
      var u = Sm(t.alternate, t, Kt);
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
    ml === 0 && (ml = 5);
  }
  function ty(l, t) {
    do {
      var u = gm(l.alternate, l);
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
    ml = 6, Z = null;
  }
  function uy(l, t, u, a, n, e, f, c, i) {
    l.cancelPendingCommit = null;
    do
      oe();
    while (Al !== 0);
    if ((r & 6) !== 0) throw Error(s(327));
    if (t !== null) {
      if (t === l.current) throw Error(s(177));
      if (e = t.lanes | t.childLanes, e |= Sf, vv(l, u, e, f, c, i), l === ul && (Z = ul = null, L = 0), sa = t, yu = l, Jt = u, Ec = e, _c = n, x1 = a, (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? (l.callbackNode = null, l.callbackPriority = 0, Um(zn, function() {
        return cy(), null;
      })) : (l.callbackNode = null, l.callbackPriority = 0), a = (t.flags & 13878) !== 0, (t.subtreeFlags & 13878) !== 0 || a) {
        a = _.T, _.T = null, n = M.p, M.p = 2, f = r, r |= 4;
        try {
          sm(l, t, u);
        } finally {
          r = f, M.p = n, _.T = a;
        }
      }
      Al = 1, ay(), ny(), ey();
    }
  }
  function ay() {
    if (Al === 1) {
      Al = 0;
      var l = yu, t = sa, u = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || u) {
        u = _.T, _.T = null;
        var a = M.p;
        M.p = 2;
        var n = r;
        r |= 4;
        try {
          G1(t, l);
          var e = Gc, f = Wi(l.containerInfo), c = e.focusedElem, i = e.selectionRange;
          if (f !== c && c && c.ownerDocument && xi(c.ownerDocument.documentElement, c)) {
            if (i !== null && yf(c)) {
              var h = i.start, b = i.end;
              if (b === void 0 && (b = h), "selectionStart" in c) c.selectionStart = h, c.selectionEnd = Math.min(b, c.value.length);
              else {
                var z = c.ownerDocument || document, S = z && z.defaultView || window;
                if (S.getSelection) {
                  var g = S.getSelection(), U = c.textContent.length, R = Math.min(i.start, U), tl = i.end === void 0 ? R : Math.min(i.end, U);
                  !g.extend && R > tl && (f = tl, tl = R, R = f);
                  var m = Ji(c, R), y = Ji(c, tl);
                  if (m && y && (g.rangeCount !== 1 || g.anchorNode !== m.node || g.anchorOffset !== m.offset || g.focusNode !== y.node || g.focusOffset !== y.offset)) {
                    var d = z.createRange();
                    d.setStart(m.node, m.offset), g.removeAllRanges(), R > tl ? (g.addRange(d), g.extend(y.node, y.offset)) : (d.setEnd(y.node, y.offset), g.addRange(d));
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
              var o = z[c];
              o.element.scrollLeft = o.left, o.element.scrollTop = o.top;
            }
          }
          qe = !!jc, Gc = jc = null;
        } finally {
          r = n, M.p = a, _.T = u;
        }
      }
      l.current = t, Al = 2;
    }
  }
  function ny() {
    if (Al === 2) {
      Al = 0;
      var l = yu, t = sa, u = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || u) {
        u = _.T, _.T = null;
        var a = M.p;
        M.p = 2;
        var n = r;
        r |= 4;
        try {
          B1(l, t.alternate, t);
        } finally {
          r = n, M.p = a, _.T = u;
        }
      }
      Al = 3;
    }
  }
  function ey() {
    if (Al === 4 || Al === 3) {
      Al = 0, tv();
      var l = yu, t = sa, u = Jt, a = x1;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? Al = 5 : (Al = 0, sa = yu = null, fy(l, l.pendingLanes));
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
      (Jt & 3) !== 0 && oe(), xt(l), n = l.pendingLanes, (u & 261930) !== 0 && (n & 42) !== 0 ? l === Oc ? fn++ : (fn = 0, Oc = l) : fn = 0, cn(0, !1);
    }
  }
  function fy(l, t) {
    (l.pooledCacheLanes &= t) === 0 && (t = l.pooledCache, t != null && (l.pooledCache = null, Va(t)));
  }
  function oe() {
    return ay(), ny(), ey(), cy();
  }
  function cy() {
    if (Al !== 5) return !1;
    var l = yu, t = Ec;
    Ec = 0;
    var u = Ke(Jt), a = _.T, n = M.p;
    try {
      M.p = 32 > u ? 32 : u, _.T = null, u = _c, _c = null;
      var e = yu, f = Jt;
      if (Al = 0, sa = yu = null, Jt = 0, (r & 6) !== 0) throw Error(s(331));
      var c = r;
      if (r |= 4, L1(e.current), Q1(e, e.current, f, u), r = c, cn(0, !1), kl && typeof kl.onPostCommitFiberRoot == "function") try {
        kl.onPostCommitFiberRoot(Ma, e);
      } catch {
      }
      return !0;
    } finally {
      M.p = n, _.T = a, fy(l, t);
    }
  }
  function iy(l, t, u) {
    t = it(u, t), t = uc(l.stateNode, t, 2), l = pu(l, t, 2), l !== null && (On(l, 2), xt(l));
  }
  function I(l, t, u) {
    if (l.tag === 3) iy(l, l, u);
    else for (; t !== null; ) {
      if (t.tag === 3) {
        iy(t, l, u);
        break;
      } else if (t.tag === 1) {
        var a = t.stateNode;
        if (typeof t.type.getDerivedStateFromError == "function" || typeof a.componentDidCatch == "function" && (iu === null || !iu.has(a))) {
          l = it(u, l), u = y1(2), a = pu(t, u, 2), a !== null && (v1(u, a, t, l), On(a, 2), xt(a));
          break;
        }
      }
      t = t.return;
    }
  }
  function Uc(l, t, u) {
    var a = l.pingCache;
    if (a === null) {
      a = l.pingCache = new zm();
      var n = /* @__PURE__ */ new Set();
      a.set(t, n);
    } else n = a.get(t), n === void 0 && (n = /* @__PURE__ */ new Set(), a.set(t, n));
    n.has(u) || (zc = !0, n.add(u), l = Om.bind(null, l, t, u), t.then(l, l));
  }
  function Om(l, t, u) {
    var a = l.pingCache;
    a !== null && a.delete(t), l.pingedLanes |= l.suspendedLanes & u, l.warmLanes &= ~u, ul === l && (L & u) === u && (ml === 4 || ml === 3 && (L & 62914560) === L && 300 > Fl() - de ? (r & 2) === 0 && ba(l, 0) : Tc |= u, ga === L && (ga = 0)), xt(l);
  }
  function yy(l, t) {
    t === 0 && (t = ei()), l = Mu(l, t), l !== null && (On(l, t), xt(l));
  }
  function Mm(l) {
    var t = l.memoizedState, u = 0;
    t !== null && (u = t.retryLane), yy(l, u);
  }
  function Dm(l, t) {
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
    a !== null && a.delete(t), yy(l, u);
  }
  function Um(l, t) {
    return Ze(l, t);
  }
  var ze = null, za = null, Hc = !1, Te = !1, Nc = !1, mu = 0;
  function xt(l) {
    l !== za && l.next === null && (za === null ? ze = za = l : za = za.next = l), Te = !0, Hc || (Hc = !0, Nm());
  }
  function cn(l, t) {
    if (!Nc && Te) {
      Nc = !0;
      do
        for (var u = !1, a = ze; a !== null; ) {
          if (!t) if (l !== 0) {
            var n = a.pendingLanes;
            if (n === 0) var e = 0;
            else {
              var f = a.suspendedLanes, c = a.pingedLanes;
              e = (1 << 31 - Il(42 | l) + 1) - 1, e &= n & ~(f & ~c), e = e & 201326741 ? e & 201326741 | 1 : e ? e | 2 : 0;
            }
            e !== 0 && (u = !0, hy(a, e));
          } else e = L, e = _n(a, a === ul ? e : 0, a.cancelPendingCommit !== null || a.timeoutHandle !== -1), (e & 3) === 0 || Da(a, e) || (u = !0, hy(a, e));
          a = a.next;
        }
      while (u);
      Nc = !1;
    }
  }
  function Hm() {
    vy();
  }
  function vy() {
    Te = Hc = !1;
    var l = 0;
    mu !== 0 && Gm() && (l = mu);
    for (var t = Fl(), u = null, a = ze; a !== null; ) {
      var n = a.next, e = my(a, t);
      e === 0 ? (a.next = null, u === null ? ze = n : u.next = n, n === null && (za = u)) : (u = a, (l !== 0 || (e & 3) !== 0) && (Te = !0)), a = n;
    }
    Al !== 0 && Al !== 5 || cn(l, !1), mu !== 0 && (mu = 0);
  }
  function my(l, t) {
    for (var u = l.suspendedLanes, a = l.pingedLanes, n = l.expirationTimes, e = l.pendingLanes & -62914561; 0 < e; ) {
      var f = 31 - Il(e), c = 1 << f, i = n[f];
      i === -1 ? ((c & u) === 0 || (c & a) !== 0) && (n[f] = yv(c, t)) : i <= t && (l.expiredLanes |= c), e &= ~c;
    }
    if (t = ul, u = L, u = _n(l, l === t ? u : 0, l.cancelPendingCommit !== null || l.timeoutHandle !== -1), a = l.callbackNode, u === 0 || l === t && (k === 2 || k === 9) || l.cancelPendingCommit !== null) return a !== null && a !== null && Ve(a), l.callbackNode = null, l.callbackPriority = 0;
    if ((u & 3) === 0 || Da(l, u)) {
      if (t = u & -u, t === l.callbackPriority) return t;
      switch (a !== null && Ve(a), Ke(u)) {
        case 2:
        case 8:
          u = ai;
          break;
        case 32:
          u = zn;
          break;
        case 268435456:
          u = ni;
          break;
        default:
          u = zn;
      }
      return a = dy.bind(null, l), u = Ze(u, a), l.callbackPriority = t, l.callbackNode = u, t;
    }
    return a !== null && a !== null && Ve(a), l.callbackPriority = 2, l.callbackNode = null, 2;
  }
  function dy(l, t) {
    if (Al !== 0 && Al !== 5) return l.callbackNode = null, l.callbackPriority = 0, null;
    var u = l.callbackNode;
    if (oe() && l.callbackNode !== u) return null;
    var a = L;
    return a = _n(l, l === ul ? a : 0, l.cancelPendingCommit !== null || l.timeoutHandle !== -1), a === 0 ? null : (w1(l, a, t), my(l, Fl()), l.callbackNode != null && l.callbackNode === u ? dy.bind(null, l) : null);
  }
  function hy(l, t) {
    if (oe()) return null;
    w1(l, t, !0);
  }
  function Nm() {
    Qm(function() {
      (r & 6) !== 0 ? Ze(ui, Hm) : vy();
    });
  }
  function qc() {
    if (mu === 0) {
      var l = na;
      l === 0 && (l = Tn, Tn <<= 1, (Tn & 261888) === 0 && (Tn = 256)), mu = l;
    }
    return mu;
  }
  function Sy(l) {
    return l == null || typeof l == "symbol" || typeof l == "boolean" ? null : typeof l == "function" ? l : Hn("" + l);
  }
  function gy(l, t) {
    var u = t.ownerDocument.createElement("input");
    return u.name = t.name, u.value = t.value, l.id && u.setAttribute("form", l.id), t.parentNode.insertBefore(u, t), l = new FormData(l), u.parentNode.removeChild(u), l;
  }
  function qm(l, t, u, a, n) {
    if (t === "submit" && u && u.stateNode === n) {
      var e = Sy((n[Gl] || null).action), f = a.submitter;
      f && (t = (t = f[Gl] || null) ? Sy(t.formAction) : f.getAttribute("formAction"), t !== null && (e = t, f = null));
      var c = new Bn("action", "action", null, a, n);
      l.push({
        event: c,
        listeners: [{
          instance: null,
          listener: function() {
            if (a.defaultPrevented) {
              if (mu !== 0) {
                var i = f ? gy(n, f) : new FormData(n);
                Ff(u, {
                  pending: !0,
                  data: i,
                  method: n.method,
                  action: e
                }, null, i);
              }
            } else typeof e == "function" && (c.preventDefault(), i = f ? gy(n, f) : new FormData(n), Ff(u, {
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
  zt(ri, "onAnimationEnd"), zt(Fi, "onAnimationIteration"), zt(ki, "onAnimationStart"), zt("dblclick", "onDoubleClick"), zt("focusin", "onFocus"), zt("focusout", "onBlur"), zt(xv, "onTransitionRun"), zt(Wv, "onTransitionStart"), zt(wv, "onTransitionCancel"), zt(Ii, "onTransitionEnd"), Ju("onMouseEnter", ["mouseout", "mouseover"]), Ju("onMouseLeave", ["mouseout", "mouseover"]), Ju("onPointerEnter", ["pointerout", "pointerover"]), Ju("onPointerLeave", ["pointerout", "pointerover"]), Au("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), Au("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), Au("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), Au("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), Au("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), Au("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
  var yn = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), Ym = new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(yn));
  function sy(l, t) {
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
          } catch (b) {
            pn(b);
          }
          n.currentTarget = null, e = i;
        }
        else for (f = 0; f < a.length; f++) {
          if (c = a[f], i = c.instance, h = c.currentTarget, c = c.listener, i !== e && n.isPropagationStopped()) break l;
          e = c, n.currentTarget = h;
          try {
            e(n);
          } catch (b) {
            pn(b);
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
    u.has(a) || (oy(t, l, 2, !1), u.add(a));
  }
  function Rc(l, t, u) {
    var a = 0;
    t && (a |= 4), oy(u, l, a, t);
  }
  var Ae = "_reactListening" + Math.random().toString(36).slice(2);
  function by(l) {
    if (!l[Ae]) {
      l[Ae] = !0, hi.forEach(function(u) {
        u !== "selectionchange" && (Ym.has(u) || Rc(u, !1, l), Rc(u, !0, l));
      });
      var t = l.nodeType === 9 ? l : l.ownerDocument;
      t === null || t[Ae] || (t[Ae] = !0, Rc("selectionchange", !1, t));
    }
  }
  function oy(l, t, u, a) {
    switch (xy(t)) {
      case 2:
        var n = cd;
        break;
      case 8:
        n = id;
        break;
      default:
        n = $c;
    }
    u = n.bind(null, t, u, l), n = void 0, !Pe || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (n = !0), a ? n !== void 0 ? l.addEventListener(t, u, {
      capture: !0,
      passive: n
    }) : l.addEventListener(t, u, !0) : n !== void 0 ? l.addEventListener(t, u, { passive: n }) : l.addEventListener(t, u, !1);
  }
  function Cc(l, t, u, a, n) {
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
    Mi(function() {
      var h = e, b = ke(u), z = [];
      l: {
        var S = Pi.get(l);
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
              g = Hi;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              g = Av;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              g = Nv;
              break;
            case ri:
            case Fi:
            case ki:
              g = Ev;
              break;
            case Ii:
              g = qv;
              break;
            case "scroll":
            case "scrollend":
              g = Tv;
              break;
            case "wheel":
              g = Yv;
              break;
            case "copy":
            case "cut":
            case "paste":
              g = _v;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              g = qi;
              break;
            case "toggle":
            case "beforetoggle":
              g = Bv;
          }
          var R = (t & 4) !== 0, tl = !R && (l === "scroll" || l === "scrollend"), m = R ? S !== null ? S + "Capture" : null : S;
          R = [];
          for (var y = h, d; y !== null; ) {
            var o = y;
            if (d = o.stateNode, o = o.tag, o !== 5 && o !== 26 && o !== 27 || d === null || m === null || (o = qa(y, m), o != null && R.push(vn(y, o, d))), tl) break;
            y = y.return;
          }
          0 < R.length && (S = new g(S, U, null, u, b), z.push({
            event: S,
            listeners: R
          }));
        }
      }
      if ((t & 7) === 0) {
        l: {
          if (S = l === "mouseover" || l === "pointerover", g = l === "mouseout" || l === "pointerout", S && u !== Fe && (U = u.relatedTarget || u.fromElement) && (Vu(U) || U[Ua])) break l;
          if ((g || S) && (S = b.window === b ? b : (S = b.ownerDocument) ? S.defaultView || S.parentWindow : window, g ? (U = u.relatedTarget || u.toElement, g = h, U = U ? Vu(U) : null, U !== null && (tl = sl(U), R = U.tag, U !== tl || R !== 5 && R !== 27 && R !== 6) && (U = null)) : (g = null, U = h), g !== U)) {
            if (R = Hi, o = "onMouseLeave", m = "onMouseEnter", y = "mouse", (l === "pointerout" || l === "pointerover") && (R = qi, o = "onPointerLeave", m = "onPointerEnter", y = "pointer"), tl = g == null ? S : Na(g), d = U == null ? S : Na(U), S = new R(o, y + "leave", g, u, b), S.target = tl, S.relatedTarget = d, o = null, Vu(b) === h && (R = new R(m, y + "enter", U, u, b), R.target = d, R.relatedTarget = tl, o = R), tl = o, g && U) t: {
              for (R = Bm, m = g, y = U, d = 0, o = m; o; o = R(o)) d++;
              o = 0;
              for (var q = y; q; q = R(q)) o++;
              for (; 0 < d - o; ) m = R(m), d--;
              for (; 0 < o - d; ) y = R(y), o--;
              for (; d--; ) {
                if (m === y || y !== null && m === y.alternate) {
                  R = m;
                  break t;
                }
                m = R(m), y = R(y);
              }
              R = null;
            }
            else R = null;
            g !== null && zy(z, S, g, R, !1), U !== null && tl !== null && zy(z, tl, U, R, !0);
          }
        }
        l: {
          if (S = h ? Na(h) : window, g = S.nodeName && S.nodeName.toLowerCase(), g === "select" || g === "input" && S.type === "file") var W = Xi;
          else if (ji(S)) if (Qi) W = Lv;
          else {
            W = Zv;
            var H = Qv;
          }
          else g = S.nodeName, !g || g.toLowerCase() !== "input" || S.type !== "checkbox" && S.type !== "radio" ? h && re(h.elementType) && (W = Xi) : W = Vv;
          if (W && (W = W(l, h))) {
            Gi(z, W, u, b);
            break l;
          }
          H && H(l, S, h), l === "focusout" && h && S.type === "number" && h.memoizedProps.value != null && $e(S, "number", S.value);
        }
        switch (H = h ? Na(h) : window, l) {
          case "focusin":
            (ji(H) || H.contentEditable === "true") && (Fu = H, vf = h, Xa = null);
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
            mf = !1, wi(z, u, b);
            break;
          case "selectionchange":
            if (Jv) break;
          case "keydown":
          case "keyup":
            wi(z, u, b);
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
        else ru ? Ci(l, u) && (K = "onCompositionEnd") : l === "keydown" && u.keyCode === 229 && (K = "onCompositionStart");
        K && (Yi && u.locale !== "ko" && (ru || K !== "onCompositionStart" ? K === "onCompositionEnd" && ru && (G = Di()) : (kt = b, lf = "value" in kt ? kt.value : kt.textContent, ru = !0)), H = Ee(h, K), 0 < H.length && (K = new Ni(K, l, null, u, b), z.push({
          event: K,
          listeners: H
        }), G ? K.data = G : (G = pi(u), G !== null && (K.data = G)))), (G = Cv ? pv(l, u) : jv(l, u)) && (K = Ee(h, "onBeforeInput"), 0 < K.length && (H = new Ni("onBeforeInput", "beforeinput", null, u, b), z.push({
          event: H,
          listeners: K
        }), H.data = G)), qm(z, l, h, u, b);
      }
      sy(z, t);
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
  function Bm(l) {
    if (l === null) return null;
    do
      l = l.return;
    while (l && l.tag !== 5 && l.tag !== 27);
    return l || null;
  }
  function zy(l, t, u, a, n) {
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
  var Rm = /\r\n?/g, Cm = /\u0000|\uFFFD/g;
  function Ty(l) {
    return (typeof l == "string" ? l : "" + l).replace(Rm, `
`).replace(Cm, "");
  }
  function Ay(l, t) {
    return t = Ty(t), Ty(l) === t;
  }
  function ll(l, t, u, a, n, e) {
    switch (u) {
      case "children":
        typeof a == "string" ? t === "body" || t === "textarea" && a === "" || Wu(l, a) : (typeof a == "number" || typeof a == "bigint") && t !== "body" && Wu(l, "" + a);
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
        _i(l, a, e);
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
        a = Hn("" + a), l.setAttribute(u, a);
        break;
      case "action":
      case "formAction":
        if (typeof a == "function") {
          l.setAttribute(u, "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");
          break;
        } else typeof e == "function" && (u === "formAction" ? (t !== "input" && ll(l, t, "name", n.name, n, null), ll(l, t, "formEncType", n.formEncType, n, null), ll(l, t, "formMethod", n.formMethod, n, null), ll(l, t, "formTarget", n.formTarget, n, null)) : (ll(l, t, "encType", n.encType, n, null), ll(l, t, "method", n.method, n, null), ll(l, t, "target", n.target, n, null)));
        if (a == null || typeof a == "symbol" || typeof a == "boolean") {
          l.removeAttribute(u);
          break;
        }
        a = Hn("" + a), l.setAttribute(u, a);
        break;
      case "onClick":
        a != null && (l.onclick = Nt);
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
        u = Hn("" + a), l.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", u);
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
        Ht(l, "http://www.w3.org/1999/xlink", "xlink:actuate", a);
        break;
      case "xlinkArcrole":
        Ht(l, "http://www.w3.org/1999/xlink", "xlink:arcrole", a);
        break;
      case "xlinkRole":
        Ht(l, "http://www.w3.org/1999/xlink", "xlink:role", a);
        break;
      case "xlinkShow":
        Ht(l, "http://www.w3.org/1999/xlink", "xlink:show", a);
        break;
      case "xlinkTitle":
        Ht(l, "http://www.w3.org/1999/xlink", "xlink:title", a);
        break;
      case "xlinkType":
        Ht(l, "http://www.w3.org/1999/xlink", "xlink:type", a);
        break;
      case "xmlBase":
        Ht(l, "http://www.w3.org/XML/1998/namespace", "xml:base", a);
        break;
      case "xmlLang":
        Ht(l, "http://www.w3.org/XML/1998/namespace", "xml:lang", a);
        break;
      case "xmlSpace":
        Ht(l, "http://www.w3.org/XML/1998/namespace", "xml:space", a);
        break;
      case "is":
        Mn(l, "is", a);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < u.length) || u[0] !== "o" && u[0] !== "O" || u[1] !== "n" && u[1] !== "N") && (u = ov.get(u) || u, Mn(l, u, a));
    }
  }
  function pc(l, t, u, a, n, e) {
    switch (u) {
      case "style":
        _i(l, a, e);
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
        typeof a == "string" ? Wu(l, a) : (typeof a == "number" || typeof a == "bigint") && Wu(l, "" + a);
        break;
      case "onScroll":
        a != null && V("scroll", l);
        break;
      case "onScrollEnd":
        a != null && V("scrollend", l);
        break;
      case "onClick":
        a != null && (l.onclick = Nt);
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
        if (!Si.hasOwnProperty(u)) l: {
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
              ll(l, t, e, f, u, null);
          }
        }
        n && ll(l, t, "srcSet", u.srcSet, u, null), a && ll(l, t, "src", u.src, u, null);
        return;
      case "input":
        V("invalid", l);
        var c = e = f = n = null, i = null, h = null;
        for (a in u) if (u.hasOwnProperty(a)) {
          var b = u[a];
          if (b != null) switch (a) {
            case "name":
              n = b;
              break;
            case "type":
              f = b;
              break;
            case "checked":
              i = b;
              break;
            case "defaultChecked":
              h = b;
              break;
            case "value":
              e = b;
              break;
            case "defaultValue":
              c = b;
              break;
            case "children":
            case "dangerouslySetInnerHTML":
              if (b != null) throw Error(s(137, t));
              break;
            default:
              ll(l, t, a, b, u, null);
          }
        }
        zi(l, e, c, i, h, f, n, !1);
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
            ll(l, t, n, c, u, null);
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
            ll(l, t, f, c, u, null);
        }
        Ai(l, a, n, e);
        return;
      case "option":
        for (i in u) u.hasOwnProperty(i) && (a = u[i], a != null) && (i === "selected" ? l.selected = a && typeof a != "function" && typeof a != "symbol" : ll(l, t, i, a, u, null));
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
            ll(l, t, h, a, u, null);
        }
        return;
      default:
        if (re(t)) {
          for (b in u) u.hasOwnProperty(b) && (a = u[b], a !== void 0 && pc(l, t, b, a, u, void 0));
          return;
        }
    }
    for (c in u) u.hasOwnProperty(c) && (a = u[c], a != null && ll(l, t, c, a, u, null));
  }
  function pm(l, t, u, a) {
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
        var n = null, e = null, f = null, c = null, i = null, h = null, b = null;
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
              a.hasOwnProperty(g) || ll(l, t, g, null, a, z);
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
              b = g;
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
              g !== z && ll(l, t, S, g, a, z);
          }
        }
        we(l, f, c, i, h, b, e, n);
        return;
      case "select":
        g = f = c = S = null;
        for (e in u) if (i = u[e], u.hasOwnProperty(e) && i != null) switch (e) {
          case "value":
            break;
          case "multiple":
            g = i;
          default:
            a.hasOwnProperty(e) || ll(l, t, e, null, a, i);
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
            e !== i && ll(l, t, n, e, a, i);
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
            ll(l, t, c, null, a, n);
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
            n !== e && ll(l, t, f, n, a, e);
        }
        Ti(l, S, g);
        return;
      case "option":
        for (var U in u) S = u[U], u.hasOwnProperty(U) && S != null && !a.hasOwnProperty(U) && (U === "selected" ? l.selected = !1 : ll(l, t, U, null, a, S));
        for (i in a) S = a[i], g = u[i], a.hasOwnProperty(i) && S !== g && (S != null || g != null) && (i === "selected" ? l.selected = S && typeof S != "function" && typeof S != "symbol" : ll(l, t, i, S, a, g));
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
        for (var R in u) S = u[R], u.hasOwnProperty(R) && S != null && !a.hasOwnProperty(R) && ll(l, t, R, null, a, S);
        for (h in a) if (S = a[h], g = u[h], a.hasOwnProperty(h) && S !== g && (S != null || g != null)) switch (h) {
          case "children":
          case "dangerouslySetInnerHTML":
            if (S != null) throw Error(s(137, t));
            break;
          default:
            ll(l, t, h, S, a, g);
        }
        return;
      default:
        if (re(t)) {
          for (var tl in u) S = u[tl], u.hasOwnProperty(tl) && S !== void 0 && !a.hasOwnProperty(tl) && pc(l, t, tl, void 0, a, S);
          for (b in a) S = a[b], g = u[b], !a.hasOwnProperty(b) || S === g || S === void 0 && g === void 0 || pc(l, t, b, S, a, g);
          return;
        }
    }
    for (var m in u) S = u[m], u.hasOwnProperty(m) && S != null && !a.hasOwnProperty(m) && ll(l, t, m, null, a, S);
    for (z in a) S = a[z], g = u[z], !a.hasOwnProperty(z) || S === g || S == null && g == null || ll(l, t, z, S, a, g);
  }
  function Ey(l) {
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
  function jm() {
    if (typeof performance.getEntriesByType == "function") {
      for (var l = 0, t = 0, u = performance.getEntriesByType("resource"), a = 0; a < u.length; a++) {
        var n = u[a], e = n.transferSize, f = n.initiatorType, c = n.duration;
        if (e && c && Ey(f)) {
          for (f = 0, c = n.responseEnd, a += 1; a < u.length; a++) {
            var i = u[a], h = i.startTime;
            if (h > c) break;
            var b = i.transferSize, z = i.initiatorType;
            b && Ey(z) && (i = i.responseEnd, f += b * (i < c ? 1 : (c - h) / (i - h)));
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
  function _y(l) {
    switch (l) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function Oy(l, t) {
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
  function Gm() {
    var l = window.event;
    return l && l.type === "popstate" ? l === Qc ? !1 : (Qc = l, !0) : (Qc = null, !1);
  }
  var My = typeof setTimeout == "function" ? setTimeout : void 0, Xm = typeof clearTimeout == "function" ? clearTimeout : void 0, Dy = typeof Promise == "function" ? Promise : void 0, Qm = typeof queueMicrotask == "function" ? queueMicrotask : typeof Dy < "u" ? function(l) {
    return Dy.resolve(null).then(l).catch(Zm);
  } : My;
  function Zm(l) {
    setTimeout(function() {
      throw l;
    });
  }
  function du(l) {
    return l === "head";
  }
  function Uy(l, t) {
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
          e[Ha] || c === "SCRIPT" || c === "STYLE" || c === "LINK" && e.rel.toLowerCase() === "stylesheet" || u.removeChild(e), e = f;
        }
      } else u === "body" && mn(l.ownerDocument.body);
      u = n;
    } while (u);
    _a(t);
  }
  function Hy(l, t) {
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
  function Vm(l, t, u, a) {
    for (; l.nodeType === 1; ) {
      var n = u;
      if (l.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!a && (l.nodeName !== "INPUT" || l.type !== "hidden")) break;
      } else if (a) {
        if (!l[Ha]) switch (t) {
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
  function Lm(l, t, u) {
    if (t === "") return null;
    for (; l.nodeType !== 3; )
      if ((l.nodeType !== 1 || l.nodeName !== "INPUT" || l.type !== "hidden") && !u || (l = St(l.nextSibling), l === null)) return null;
    return l;
  }
  function Ny(l, t) {
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
  function Km(l, t) {
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
  function qy(l) {
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
  function Yy(l) {
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
  function By(l, t, u) {
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
  var gt = /* @__PURE__ */ new Map(), Ry = /* @__PURE__ */ new Set();
  function Oe(l) {
    return typeof l.getRootNode == "function" ? l.getRootNode() : l.nodeType === 9 ? l : l.ownerDocument;
  }
  var Wt = M.d;
  M.d = {
    f: Jm,
    r: xm,
    D: Wm,
    C: wm,
    L: $m,
    m: rm,
    X: km,
    S: Fm,
    M: Im
  };
  function Jm() {
    var l = Wt.f(), t = ge();
    return l || t;
  }
  function xm(l) {
    var t = Lu(l);
    t !== null && t.tag === 5 && t.type === "form" ? I0(t) : Wt.r(l);
  }
  var Ta = typeof document > "u" ? null : document;
  function Cy(l, t, u) {
    var a = Ta;
    if (a && typeof t == "string" && t) {
      var n = ft(t);
      n = 'link[rel="' + l + '"][href="' + n + '"]', typeof u == "string" && (n += '[crossorigin="' + u + '"]'), Ry.has(n) || (Ry.add(n), l = {
        rel: l,
        crossOrigin: u,
        href: t
      }, a.querySelector(n) === null && (t = a.createElement("link"), ql(t, "link", l), _l(t), a.head.appendChild(t)));
    }
  }
  function Wm(l) {
    Wt.D(l), Cy("dns-prefetch", l, null);
  }
  function wm(l, t) {
    Wt.C(l, t), Cy("preconnect", l, t);
  }
  function $m(l, t, u) {
    Wt.L(l, t, u);
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
  function rm(l, t) {
    Wt.m(l, t);
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
  function Fm(l, t, u) {
    Wt.S(l, t, u);
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
          _l(i), ql(i, "link", l), i._p = new Promise(function(h, b) {
            i.onload = h, i.onerror = b;
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
  function km(l, t) {
    Wt.X(l, t);
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
  function Im(l, t) {
    Wt.M(l, t);
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
  function py(l, t, u, a) {
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
          }, gt.set(l, u), e || Pm(n, l, u, f.state))), t && a === null) throw Error(s(528, ""));
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
  function jy(l) {
    return B({}, l, {
      "data-precedence": l.precedence,
      precedence: null
    });
  }
  function Pm(l, t, u, a) {
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
  function Gy(l, t, u) {
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
        a = jy(u), (n = gt.get(n)) && Jc(a, n), e = (l.ownerDocument || l).createElement("link"), _l(e);
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
  function Xy(l, t, u) {
    if (De === null) {
      var a = /* @__PURE__ */ new Map(), n = De = /* @__PURE__ */ new Map();
      n.set(u, a);
    } else n = De, a = n.get(u), a || (a = /* @__PURE__ */ new Map(), n.set(u, a));
    if (a.has(l)) return a;
    for (a.set(l, null), u = u.getElementsByTagName(l), n = 0; n < u.length; n++) {
      var e = u[n];
      if (!(e[Ha] || e[Dl] || l === "link" && e.getAttribute("rel") === "stylesheet") && e.namespaceURI !== "http://www.w3.org/2000/svg") {
        var f = e.getAttribute(t) || "";
        f = l + f;
        var c = a.get(f);
        c ? c.push(e) : a.set(f, [e]);
      }
    }
    return a;
  }
  function Qy(l, t, u) {
    l = l.ownerDocument || l, l.head.insertBefore(u, t === "title" ? l.querySelector("head > title") : null);
  }
  function ld(l, t, u) {
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
  function Zy(l) {
    return !(l.type === "stylesheet" && (l.state.loading & 3) === 0);
  }
  function td(l, t, u, a) {
    if (u.type === "stylesheet" && (typeof a.media != "string" || matchMedia(a.media).matches !== !1) && (u.state.loading & 4) === 0) {
      if (u.instance === null) {
        var n = Aa(a.href), e = t.querySelector(dn(n));
        if (e) {
          t = e._p, t !== null && typeof t == "object" && typeof t.then == "function" && (l.count++, l = Ue.bind(l), t.then(l, l)), u.state.loading |= 4, u.instance = e, _l(e);
          return;
        }
        e = t.ownerDocument || t, a = jy(a), (n = gt.get(n)) && Jc(a, n), e = e.createElement("link"), _l(e);
        var f = e;
        f._p = new Promise(function(c, i) {
          f.onload = c, f.onerror = i;
        }), ql(e, "link", a), u.instance = e;
      }
      l.stylesheets === null && (l.stylesheets = /* @__PURE__ */ new Map()), l.stylesheets.set(u, t), (t = u.state.preload) && (u.state.loading & 3) === 0 && (l.count++, u = Ue.bind(l), t.addEventListener("load", u), t.addEventListener("error", u));
    }
  }
  var Wc = 0;
  function ud(l, t) {
    return l.stylesheets && l.count === 0 && Ne(l, l.stylesheets), 0 < l.count || 0 < l.imgCount ? function(u) {
      var a = setTimeout(function() {
        if (l.stylesheets && Ne(l, l.stylesheets), l.unsuspend) {
          var e = l.unsuspend;
          l.unsuspend = null, e();
        }
      }, 6e4 + t);
      0 < l.imgBytes && Wc === 0 && (Wc = 62500 * jm());
      var n = setTimeout(function() {
        if (l.waitingForImages = !1, l.count === 0 && (l.stylesheets && Ne(l, l.stylesheets), l.unsuspend)) {
          var e = l.unsuspend;
          l.unsuspend = null, e();
        }
      }, (l.imgBytes > Wc ? 50 : 800) + t);
      return l.unsuspend = u, function() {
        l.unsuspend = null, clearTimeout(a), clearTimeout(n);
      };
    } : null;
  }
  function Ue() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) Ne(this, this.stylesheets);
      else if (this.unsuspend) {
        var l = this.unsuspend;
        this.unsuspend = null, l();
      }
    }
  }
  var He = null;
  function Ne(l, t) {
    l.stylesheets = null, l.unsuspend !== null && (l.count++, He = /* @__PURE__ */ new Map(), t.forEach(ad, l), He = null, Ue.call(l));
  }
  function ad(l, t) {
    if (!(t.state.loading & 4)) {
      var u = He.get(l);
      if (u) var a = u.get(null);
      else {
        u = /* @__PURE__ */ new Map(), He.set(l, u);
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
  function nd(l, t, u, a, n, e, f, c, i) {
    this.tag = 1, this.containerInfo = l, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Le(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Le(0), this.hiddenUpdates = Le(null), this.identifierPrefix = a, this.onUncaughtError = n, this.onCaughtError = e, this.onRecoverableError = f, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = i, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function ed(l, t, u, a, n, e, f, c, i, h, b, z) {
    return l = new nd(l, t, u, f, i, h, b, z, c), t = 1, e === !0 && (t |= 24), e = lt(3, null, null, t), l.current = e, e.stateNode = l, t = Df(), t.refCount++, l.pooledCache = t, t.refCount++, e.memoizedState = {
      element: a,
      isDehydrated: u,
      cache: t
    }, qf(e), l;
  }
  function fd(l) {
    return l ? (l = Pu, l) : Pu;
  }
  function Vy(l, t, u, a, n, e) {
    n = fd(n), a.context === null ? a.context = n : a.pendingContext = n, a = Cu(t), a.payload = { element: u }, e = e === void 0 ? null : e, e !== null && (a.callback = e), u = pu(l, a, t), u !== null && (Kl(u, l, t), xa(u, l, t));
  }
  function Ly(l, t) {
    if (l = l.memoizedState, l !== null && l.dehydrated !== null) {
      var u = l.retryLane;
      l.retryLane = u !== 0 && u < t ? u : t;
    }
  }
  function wc(l, t) {
    Ly(l, t), (l = l.alternate) && Ly(l, t);
  }
  function Ky(l) {
    if (l.tag === 13 || l.tag === 31) {
      var t = Mu(l, 67108864);
      t !== null && Kl(t, l, 67108864), wc(l, 67108864);
    }
  }
  function Jy(l) {
    if (l.tag === 13 || l.tag === 31) {
      var t = ht();
      t = yi(t);
      var u = Mu(l, t);
      u !== null && Kl(u, l, t), wc(l, t);
    }
  }
  var qe = !0;
  function cd(l, t, u, a) {
    var n = _.T;
    _.T = null;
    var e = M.p;
    try {
      M.p = 2, $c(l, t, u, a);
    } finally {
      M.p = e, _.T = n;
    }
  }
  function id(l, t, u, a) {
    var n = _.T;
    _.T = null;
    var e = M.p;
    try {
      M.p = 8, $c(l, t, u, a);
    } finally {
      M.p = e, _.T = n;
    }
  }
  function $c(l, t, u, a) {
    if (qe) {
      var n = rc(a);
      if (n === null) Cc(l, t, a, Ye, u), Wy(l, a);
      else if (vd(n, l, t, u, a)) a.stopPropagation();
      else if (Wy(l, a), t & 4 && -1 < yd.indexOf(l)) {
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
                  xt(e), (r & 6) === 0 && (he = Fl() + 500, cn(0, !1));
                }
              }
              break;
            case 31:
            case 13:
              c = Mu(e, 2), c !== null && Kl(c, e, 2), ge(), wc(e, 2);
          }
          if (e = rc(a), e === null && Cc(l, t, a, Ye, u), e === n) break;
          n = e;
        }
        n !== null && a.stopPropagation();
      } else Cc(l, t, a, null, u);
    }
  }
  function rc(l) {
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
          if (l = yl(t), l !== null) return l;
          l = null;
        } else if (u === 3) {
          if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
          l = null;
        } else t !== l && (l = null);
      }
    }
    return Ye = l, null;
  }
  function xy(l) {
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
        switch (uv()) {
          case ui:
            return 2;
          case ai:
            return 8;
          case zn:
          case av:
            return 32;
          case ni:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var kc = !1, hu = null, Su = null, gu = null, gn = /* @__PURE__ */ new Map(), sn = /* @__PURE__ */ new Map(), su = [], yd = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");
  function Wy(l, t) {
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
  function bn(l, t, u, a, n, e) {
    return l === null || l.nativeEvent !== e ? (l = {
      blockedOn: t,
      domEventName: u,
      eventSystemFlags: a,
      nativeEvent: e,
      targetContainers: [n]
    }, t !== null && (t = Lu(t), t !== null && Ky(t)), l) : (l.eventSystemFlags |= a, t = l.targetContainers, n !== null && t.indexOf(n) === -1 && t.push(n), l);
  }
  function vd(l, t, u, a, n) {
    switch (t) {
      case "focusin":
        return hu = bn(hu, l, t, u, a, n), !0;
      case "dragenter":
        return Su = bn(Su, l, t, u, a, n), !0;
      case "mouseover":
        return gu = bn(gu, l, t, u, a, n), !0;
      case "pointerover":
        var e = n.pointerId;
        return gn.set(e, bn(gn.get(e) || null, l, t, u, a, n)), !0;
      case "gotpointercapture":
        return e = n.pointerId, sn.set(e, bn(sn.get(e) || null, l, t, u, a, n)), !0;
    }
    return !1;
  }
  function wy(l) {
    var t = Vu(l.target);
    if (t !== null) {
      var u = sl(t);
      if (u !== null) {
        if (t = u.tag, t === 13) {
          if (t = Yl(u), t !== null) {
            l.blockedOn = t, mi(l.priority, function() {
              Jy(u);
            });
            return;
          }
        } else if (t === 31) {
          if (t = yl(u), t !== null) {
            l.blockedOn = t, mi(l.priority, function() {
              Jy(u);
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
      var u = rc(l.nativeEvent);
      if (u === null) {
        u = l.nativeEvent;
        var a = new u.constructor(u.type, u);
        Fe = a, u.target.dispatchEvent(a), Fe = null;
      } else return t = Lu(u), t !== null && Ky(t), l.blockedOn = u, !1;
      t.shift();
    }
    return !0;
  }
  function $y(l, t, u) {
    Be(l) && u.delete(t);
  }
  function md() {
    kc = !1, hu !== null && Be(hu) && (hu = null), Su !== null && Be(Su) && (Su = null), gu !== null && Be(gu) && (gu = null), gn.forEach($y), sn.forEach($y);
  }
  function Re(l, t) {
    l.blockedOn === t && (l.blockedOn = null, kc || (kc = !0, C.unstable_scheduleCallback(C.unstable_NormalPriority, md)));
  }
  var Ce = null;
  function ry(l) {
    Ce !== l && (Ce = l, C.unstable_scheduleCallback(C.unstable_NormalPriority, function() {
      Ce === l && (Ce = null);
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
      return Re(i, l);
    }
    hu !== null && Re(hu, l), Su !== null && Re(Su, l), gu !== null && Re(gu, l), gn.forEach(t), sn.forEach(t);
    for (var u = 0; u < su.length; u++) {
      var a = su[u];
      a.blockedOn === l && (a.blockedOn = null);
    }
    for (; 0 < su.length && (u = su[0], u.blockedOn === null); ) wy(u), u.blockedOn === null && su.shift();
    if (u = (l.ownerDocument || l).$$reactFormReplay, u != null) for (a = 0; a < u.length; a += 3) {
      var n = u[a], e = u[a + 1], f = n[Gl] || null;
      if (typeof e == "function") f || ry(u);
      else if (f) {
        var c = null;
        if (e && e.hasAttribute("formAction")) {
          if (n = e, f = e[Gl] || null) c = f.formAction;
          else if (Fc(n) !== null) continue;
        } else c = f.action;
        typeof c == "function" ? u[a + 1] = c : (u.splice(a, 3), a -= 3), ry(u);
      }
    }
  }
  function dd() {
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
    Vy(u, ht(), l, t, null, null);
  }, Pc.prototype.unmount = Ic.prototype.unmount = function() {
    var l = this._internalRoot;
    if (l !== null) {
      this._internalRoot = null;
      var t = l.containerInfo;
      Vy(l.current, 2, null, l, null, null), ge(), t[Ua] = null;
    }
  };
  function Pc(l) {
    this._internalRoot = l;
  }
  Pc.prototype.unstable_scheduleHydration = function(l) {
    if (l) {
      var t = vi();
      l = {
        blockedOn: null,
        target: l,
        priority: t
      };
      for (var u = 0; u < su.length && t !== 0 && t < su[u].priority; u++) ;
      su.splice(u, 0, l), u === 0 && wy(l);
    }
  };
  var Fy = al.version;
  if (Fy !== "19.2.6") throw Error(s(527, Fy, "19.2.6"));
  M.findDOMNode = function(l) {
    var t = l._reactInternals;
    if (t === void 0)
      throw typeof l.render == "function" ? Error(s(188)) : (l = Object.keys(l).join(","), Error(s(268, l)));
    return l = E(t), l = l !== null ? j(l) : null, l = l === null ? null : l.stateNode, l;
  };
  var hd = {
    bundleType: 0,
    version: "19.2.6",
    rendererPackageName: "react-dom",
    currentDispatcherRef: _,
    reconcilerVersion: "19.2.6"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var pe = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!pe.isDisabled && pe.supportsFiber) try {
      Ma = pe.inject(hd), kl = pe;
    } catch {
    }
  }
  A.createRoot = function(l, t) {
    if (!Ml(l)) throw Error(s(299));
    var u = !1, a = "", n = im, e = ym, f = vm;
    return t != null && (t.unstable_strictMode === !0 && (u = !0), t.identifierPrefix !== void 0 && (a = t.identifierPrefix), t.onUncaughtError !== void 0 && (n = t.onUncaughtError), t.onCaughtError !== void 0 && (e = t.onCaughtError), t.onRecoverableError !== void 0 && (f = t.onRecoverableError)), t = ed(l, 1, !1, null, null, u, a, null, n, e, f, dd), l[Ua] = t.current, by(l), new Ic(t);
  };
})), Ad = /* @__PURE__ */ Ut(((A, C) => {
  function al() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(al);
      } catch (cl) {
        console.error(cl);
      }
  }
  al(), C.exports = Td();
})), Ed = /* @__PURE__ */ Ut(((A) => {
  var C = /* @__PURE__ */ Symbol.for("react.transitional.element"), al = /* @__PURE__ */ Symbol.for("react.fragment");
  function cl(s, Ml, sl) {
    var Yl = null;
    if (sl !== void 0 && (Yl = "" + sl), Ml.key !== void 0 && (Yl = "" + Ml.key), "key" in Ml) {
      sl = {};
      for (var yl in Ml) yl !== "key" && (sl[yl] = Ml[yl]);
    } else sl = Ml;
    return Ml = sl.ref, {
      $$typeof: C,
      type: s,
      key: Yl,
      ref: Ml !== void 0 ? Ml : null,
      props: sl
    };
  }
  A.jsx = cl, A.jsxs = cl;
})), _d = /* @__PURE__ */ Ut(((A, C) => {
  C.exports = Ed();
})), Od = Ad(), gl = _d(), Md = [
  {
    label: "Tests per policy evaluation",
    value: "30",
    note: "From 300"
  },
  {
    label: "Physical test variability",
    value: "3%",
    note: "From 40%"
  },
  {
    label: "Engineering time saved",
    value: "20,000 hr",
    note: "Pilot estimate to date"
  }
];
function Dd() {
  return /* @__PURE__ */ (0, gl.jsxs)("article", {
    className: "data-sheet",
    "aria-labelledby": "data-sheet-title",
    children: [
      /* @__PURE__ */ (0, gl.jsxs)("header", {
        className: "data-sheet-header",
        children: [/* @__PURE__ */ (0, gl.jsxs)("div", { children: [/* @__PURE__ */ (0, gl.jsx)("p", { children: "Policy evaluation outcomes" }), /* @__PURE__ */ (0, gl.jsx)("h3", {
          id: "data-sheet-title",
          children: "Pilot customer estimates"
        })] }), /* @__PURE__ */ (0, gl.jsx)("span", { children: "Pilot estimates" })]
      }),
      /* @__PURE__ */ (0, gl.jsxs)("div", {
        className: "data-sheet-summary",
        children: [
          /* @__PURE__ */ (0, gl.jsx)("p", { children: "Measured impact" }),
          /* @__PURE__ */ (0, gl.jsxs)("strong", { children: [/* @__PURE__ */ (0, gl.jsx)("b", { children: "10×" }), /* @__PURE__ */ (0, gl.jsx)("span", { children: "faster evaluation cycles" })] }),
          /* @__PURE__ */ (0, gl.jsx)("span", { children: "Reduce a 300-test loop to 30 controlled evaluations." })
        ]
      }),
      /* @__PURE__ */ (0, gl.jsx)("dl", {
        className: "data-sheet-grid",
        children: Md.map((A) => /* @__PURE__ */ (0, gl.jsxs)("div", { children: [
          /* @__PURE__ */ (0, gl.jsx)("dt", { children: A.label }),
          /* @__PURE__ */ (0, gl.jsx)("dd", { children: A.value }),
          /* @__PURE__ */ (0, gl.jsx)("p", { children: A.note })
        ] }, A.label))
      }),
      /* @__PURE__ */ (0, gl.jsxs)("div", {
        className: "data-sheet-footer",
        children: [/* @__PURE__ */ (0, gl.jsx)("span", { children: "Source" }), /* @__PURE__ */ (0, gl.jsx)("strong", { children: "Evaluation estimates from pilot customers" })]
      })
    ]
  });
}
var ky = document.getElementById("prism-console");
ky && (0, Od.createRoot)(ky).render(/* @__PURE__ */ (0, gl.jsx)(Dd, {}));
