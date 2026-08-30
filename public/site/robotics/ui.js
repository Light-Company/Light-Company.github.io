var Ut = (E, R) => () => (R || (E((R = { exports: {} }).exports, R), E = null), R.exports), gd = /* @__PURE__ */ Ut(((E) => {
  function R(D, _) {
    var M = D.length;
    D.push(_);
    l: for (; 0 < M; ) {
      var w = M - 1 >>> 1, el = D[w];
      if (0 < g(el, _)) D[w] = _, D[M] = el, M = w;
      else break l;
    }
  }
  function al(D) {
    return D.length === 0 ? null : D[0];
  }
  function il(D) {
    if (D.length === 0) return null;
    var _ = D[0], M = D.pop();
    if (M !== _) {
      D[0] = M;
      l: for (var w = 0, el = D.length, $l = el >>> 1; w < $l; ) {
        var v = 2 * (w + 1) - 1, T = D[v], O = v + 1, N = D[O];
        if (0 > g(T, M)) O < el && 0 > g(N, T) ? (D[w] = N, D[O] = M, w = O) : (D[w] = T, D[v] = M, w = v);
        else if (O < el && 0 > g(N, M)) D[w] = N, D[O] = M, w = O;
        else break l;
      }
    }
    return _;
  }
  function g(D, _) {
    var M = D.sortIndex - _.sortIndex;
    return M !== 0 ? M : D.id - _.id;
  }
  if (E.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
    var Ml = performance;
    E.unstable_now = function() {
      return Ml.now();
    };
  } else {
    var gl = Date, Yl = gl.now();
    E.unstable_now = function() {
      return gl.now() - Yl;
    };
  }
  var vl = [], Y = [], A = 1, j = null, B = 3, gt = !1, Bl = !1, Cl = !1, Jl = !1, Wt = typeof setTimeout == "function" ? setTimeout : null, xl = typeof clearTimeout == "function" ? clearTimeout : null, wt = typeof setImmediate < "u" ? setImmediate : null;
  function Al(D) {
    for (var _ = al(Y); _ !== null; ) {
      if (_.callback === null) il(Y);
      else if (_.startTime <= D) il(Y), _.sortIndex = _.expirationTime, R(vl, _);
      else break;
      _ = al(Y);
    }
  }
  function ot(D) {
    if (Cl = !1, Al(D), !Bl) if (al(vl) !== null) Bl = !0, rl || (rl = !0, wl());
    else {
      var _ = al(Y);
      _ !== null && bt(ot, _.startTime - D);
    }
  }
  var rl = !1, Wl = -1, x = 5, jl = -1;
  function At() {
    return Jl ? !0 : !(E.unstable_now() - jl < x);
  }
  function bu() {
    if (Jl = !1, rl) {
      var D = E.unstable_now();
      jl = D;
      var _ = !0;
      try {
        l: {
          Bl = !1, Cl && (Cl = !1, xl(Wl), Wl = -1), gt = !0;
          var M = B;
          try {
            t: {
              for (Al(D), j = al(vl); j !== null && !(j.expirationTime > D && At()); ) {
                var w = j.callback;
                if (typeof w == "function") {
                  j.callback = null, B = j.priorityLevel;
                  var el = w(j.expirationTime <= D);
                  if (D = E.unstable_now(), typeof el == "function") {
                    j.callback = el, Al(D), _ = !0;
                    break t;
                  }
                  j === al(vl) && il(vl), Al(D);
                } else il(vl);
                j = al(vl);
              }
              if (j !== null) _ = !0;
              else {
                var $l = al(Y);
                $l !== null && bt(ot, $l.startTime - D), _ = !1;
              }
            }
            break l;
          } finally {
            j = null, B = M, gt = !1;
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
      D(E.unstable_now());
    }, _);
  }
  E.unstable_IdlePriority = 5, E.unstable_ImmediatePriority = 1, E.unstable_LowPriority = 4, E.unstable_NormalPriority = 3, E.unstable_Profiling = null, E.unstable_UserBlockingPriority = 2, E.unstable_cancelCallback = function(D) {
    D.callback = null;
  }, E.unstable_forceFrameRate = function(D) {
    0 > D || 125 < D ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : x = 0 < D ? Math.floor(1e3 / D) : 5;
  }, E.unstable_getCurrentPriorityLevel = function() {
    return B;
  }, E.unstable_next = function(D) {
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
  }, E.unstable_requestPaint = function() {
    Jl = !0;
  }, E.unstable_runWithPriority = function(D, _) {
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
  }, E.unstable_scheduleCallback = function(D, _, M) {
    var w = E.unstable_now();
    switch (typeof M == "object" && M !== null ? (M = M.delay, M = typeof M == "number" && 0 < M ? w + M : w) : M = w, D) {
      case 1:
        var el = -1;
        break;
      case 2:
        el = 250;
        break;
      case 5:
        el = 1073741823;
        break;
      case 4:
        el = 1e4;
        break;
      default:
        el = 5e3;
    }
    return el = M + el, D = {
      id: A++,
      callback: _,
      priorityLevel: D,
      startTime: M,
      expirationTime: el,
      sortIndex: -1
    }, M > w ? (D.sortIndex = M, R(Y, D), al(vl) === null && D === al(Y) && (Cl ? (xl(Wl), Wl = -1) : Cl = !0, bt(ot, M - w))) : (D.sortIndex = el, R(vl, D), Bl || gt || (Bl = !0, rl || (rl = !0, wl()))), D;
  }, E.unstable_shouldYield = At, E.unstable_wrapCallback = function(D) {
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
})), od = /* @__PURE__ */ Ut(((E, R) => {
  R.exports = gd();
})), bd = /* @__PURE__ */ Ut(((E) => {
  var R = /* @__PURE__ */ Symbol.for("react.transitional.element"), al = /* @__PURE__ */ Symbol.for("react.portal"), il = /* @__PURE__ */ Symbol.for("react.fragment"), g = /* @__PURE__ */ Symbol.for("react.strict_mode"), Ml = /* @__PURE__ */ Symbol.for("react.profiler"), gl = /* @__PURE__ */ Symbol.for("react.consumer"), Yl = /* @__PURE__ */ Symbol.for("react.context"), vl = /* @__PURE__ */ Symbol.for("react.forward_ref"), Y = /* @__PURE__ */ Symbol.for("react.suspense"), A = /* @__PURE__ */ Symbol.for("react.memo"), j = /* @__PURE__ */ Symbol.for("react.lazy"), B = /* @__PURE__ */ Symbol.for("react.activity"), gt = Symbol.iterator;
  function Bl(v) {
    return v === null || typeof v != "object" ? null : (v = gt && v[gt] || v["@@iterator"], typeof v == "function" ? v : null);
  }
  var Cl = {
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
    this.props = v, this.context = T, this.refs = Wt, this.updater = O || Cl;
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
  function Al(v, T, O) {
    this.props = v, this.context = T, this.refs = Wt, this.updater = O || Cl;
  }
  var ot = Al.prototype = new wt();
  ot.constructor = Al, Jl(ot, xl.prototype), ot.isPureReactComponent = !0;
  var rl = Array.isArray;
  function Wl() {
  }
  var x = {
    H: null,
    A: null,
    T: null,
    S: null
  }, jl = Object.prototype.hasOwnProperty;
  function At(v, T, O) {
    var N = O.ref;
    return {
      $$typeof: R,
      type: v,
      key: T,
      ref: N !== void 0 ? N : null,
      props: O
    };
  }
  function bu(v, T) {
    return At(v.type, T, v.props);
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
          case R:
          case al:
            F = !0;
            break;
          case j:
            return F = v._init, _(F(v._payload), T, O, N, X);
        }
    }
    if (F) return X = X(v), F = N === "" ? "." + bt(v, 0) : N, rl(X) ? (O = "", F != null && (O = F.replace(Zu, "$&/") + "/"), _(X, T, O, "", function(Oa) {
      return Oa;
    })) : X != null && (wl(X) && (X = bu(X, O + (X.key == null || v && v.key === X.key ? "" : ("" + X.key).replace(Zu, "$&/") + "/") + F)), T.push(X)), 1;
    F = 0;
    var pl = N === "" ? "." : N + ":";
    if (rl(v)) for (var hl = 0; hl < v.length; hl++) N = v[hl], Q = pl + bt(N, hl), F += _(N, T, O, Q, X);
    else if (hl = Bl(v), typeof hl == "function") for (v = hl.call(v), hl = 0; !(N = v.next()).done; ) N = N.value, Q = pl + bt(N, hl++), F += _(N, T, O, Q, X);
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
  function w(v) {
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
  var el = typeof reportError == "function" ? reportError : function(v) {
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
  E.Activity = B, E.Children = $l, E.Component = xl, E.Fragment = il, E.Profiler = Ml, E.PureComponent = Al, E.StrictMode = g, E.Suspense = Y, E.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = x, E.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(v) {
      return x.H.useMemoCache(v);
    }
  }, E.cache = function(v) {
    return function() {
      return v.apply(null, arguments);
    };
  }, E.cacheSignal = function() {
    return null;
  }, E.cloneElement = function(v, T, O) {
    if (v == null) throw Error("The argument must be a React element, but you passed " + v + ".");
    var N = Jl({}, v.props), X = v.key;
    if (T != null) for (Q in T.key !== void 0 && (X = "" + T.key), T) !jl.call(T, Q) || Q === "key" || Q === "__self" || Q === "__source" || Q === "ref" && T.ref === void 0 || (N[Q] = T[Q]);
    var Q = arguments.length - 2;
    if (Q === 1) N.children = O;
    else if (1 < Q) {
      for (var F = Array(Q), pl = 0; pl < Q; pl++) F[pl] = arguments[pl + 2];
      N.children = F;
    }
    return At(v.type, X, N);
  }, E.createContext = function(v) {
    return v = {
      $$typeof: Yl,
      _currentValue: v,
      _currentValue2: v,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, v.Provider = v, v.Consumer = {
      $$typeof: gl,
      _context: v
    }, v;
  }, E.createElement = function(v, T, O) {
    var N, X = {}, Q = null;
    if (T != null) for (N in T.key !== void 0 && (Q = "" + T.key), T) jl.call(T, N) && N !== "key" && N !== "__self" && N !== "__source" && (X[N] = T[N]);
    var F = arguments.length - 2;
    if (F === 1) X.children = O;
    else if (1 < F) {
      for (var pl = Array(F), hl = 0; hl < F; hl++) pl[hl] = arguments[hl + 2];
      X.children = pl;
    }
    if (v && v.defaultProps) for (N in F = v.defaultProps, F) X[N] === void 0 && (X[N] = F[N]);
    return At(v, Q, X);
  }, E.createRef = function() {
    return { current: null };
  }, E.forwardRef = function(v) {
    return {
      $$typeof: vl,
      render: v
    };
  }, E.isValidElement = wl, E.lazy = function(v) {
    return {
      $$typeof: j,
      _payload: {
        _status: -1,
        _result: v
      },
      _init: w
    };
  }, E.memo = function(v, T) {
    return {
      $$typeof: A,
      type: v,
      compare: T === void 0 ? null : T
    };
  }, E.startTransition = function(v) {
    var T = x.T, O = {};
    x.T = O;
    try {
      var N = v(), X = x.S;
      X !== null && X(O, N), typeof N == "object" && N !== null && typeof N.then == "function" && N.then(Wl, el);
    } catch (Q) {
      el(Q);
    } finally {
      T !== null && O.types !== null && (T.types = O.types), x.T = T;
    }
  }, E.unstable_useCacheRefresh = function() {
    return x.H.useCacheRefresh();
  }, E.use = function(v) {
    return x.H.use(v);
  }, E.useActionState = function(v, T, O) {
    return x.H.useActionState(v, T, O);
  }, E.useCallback = function(v, T) {
    return x.H.useCallback(v, T);
  }, E.useContext = function(v) {
    return x.H.useContext(v);
  }, E.useDebugValue = function() {
  }, E.useDeferredValue = function(v, T) {
    return x.H.useDeferredValue(v, T);
  }, E.useEffect = function(v, T) {
    return x.H.useEffect(v, T);
  }, E.useEffectEvent = function(v) {
    return x.H.useEffectEvent(v);
  }, E.useId = function() {
    return x.H.useId();
  }, E.useImperativeHandle = function(v, T, O) {
    return x.H.useImperativeHandle(v, T, O);
  }, E.useInsertionEffect = function(v, T) {
    return x.H.useInsertionEffect(v, T);
  }, E.useLayoutEffect = function(v, T) {
    return x.H.useLayoutEffect(v, T);
  }, E.useMemo = function(v, T) {
    return x.H.useMemo(v, T);
  }, E.useOptimistic = function(v, T) {
    return x.H.useOptimistic(v, T);
  }, E.useReducer = function(v, T, O) {
    return x.H.useReducer(v, T, O);
  }, E.useRef = function(v) {
    return x.H.useRef(v);
  }, E.useState = function(v) {
    return x.H.useState(v);
  }, E.useSyncExternalStore = function(v, T, O) {
    return x.H.useSyncExternalStore(v, T, O);
  }, E.useTransition = function() {
    return x.H.useTransition();
  }, E.version = "19.2.6";
})), Py = /* @__PURE__ */ Ut(((E, R) => {
  R.exports = bd();
})), zd = /* @__PURE__ */ Ut(((E) => {
  var R = Py();
  function al(Y) {
    var A = "https://react.dev/errors/" + Y;
    if (1 < arguments.length) {
      A += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var j = 2; j < arguments.length; j++) A += "&args[]=" + encodeURIComponent(arguments[j]);
    }
    return "Minified React error #" + Y + "; visit " + A + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function il() {
  }
  var g = {
    d: {
      f: il,
      r: function() {
        throw Error(al(522));
      },
      D: il,
      C: il,
      L: il,
      m: il,
      X: il,
      S: il,
      M: il
    },
    p: 0,
    findDOMNode: null
  }, Ml = /* @__PURE__ */ Symbol.for("react.portal");
  function gl(Y, A, j) {
    var B = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: Ml,
      key: B == null ? null : "" + B,
      children: Y,
      containerInfo: A,
      implementation: j
    };
  }
  var Yl = R.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function vl(Y, A) {
    if (Y === "font") return "";
    if (typeof A == "string") return A === "use-credentials" ? A : "";
  }
  E.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = g, E.createPortal = function(Y, A) {
    var j = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!A || A.nodeType !== 1 && A.nodeType !== 9 && A.nodeType !== 11) throw Error(al(299));
    return gl(Y, A, null, j);
  }, E.flushSync = function(Y) {
    var A = Yl.T, j = g.p;
    try {
      if (Yl.T = null, g.p = 2, Y) return Y();
    } finally {
      Yl.T = A, g.p = j, g.d.f();
    }
  }, E.preconnect = function(Y, A) {
    typeof Y == "string" && (A ? (A = A.crossOrigin, A = typeof A == "string" ? A === "use-credentials" ? A : "" : void 0) : A = null, g.d.C(Y, A));
  }, E.prefetchDNS = function(Y) {
    typeof Y == "string" && g.d.D(Y);
  }, E.preinit = function(Y, A) {
    if (typeof Y == "string" && A && typeof A.as == "string") {
      var j = A.as, B = vl(j, A.crossOrigin), gt = typeof A.integrity == "string" ? A.integrity : void 0, Bl = typeof A.fetchPriority == "string" ? A.fetchPriority : void 0;
      j === "style" ? g.d.S(Y, typeof A.precedence == "string" ? A.precedence : void 0, {
        crossOrigin: B,
        integrity: gt,
        fetchPriority: Bl
      }) : j === "script" && g.d.X(Y, {
        crossOrigin: B,
        integrity: gt,
        fetchPriority: Bl,
        nonce: typeof A.nonce == "string" ? A.nonce : void 0
      });
    }
  }, E.preinitModule = function(Y, A) {
    if (typeof Y == "string") if (typeof A == "object" && A !== null) {
      if (A.as == null || A.as === "script") {
        var j = vl(A.as, A.crossOrigin);
        g.d.M(Y, {
          crossOrigin: j,
          integrity: typeof A.integrity == "string" ? A.integrity : void 0,
          nonce: typeof A.nonce == "string" ? A.nonce : void 0
        });
      }
    } else A ?? g.d.M(Y);
  }, E.preload = function(Y, A) {
    if (typeof Y == "string" && typeof A == "object" && A !== null && typeof A.as == "string") {
      var j = A.as, B = vl(j, A.crossOrigin);
      g.d.L(Y, j, {
        crossOrigin: B,
        integrity: typeof A.integrity == "string" ? A.integrity : void 0,
        nonce: typeof A.nonce == "string" ? A.nonce : void 0,
        type: typeof A.type == "string" ? A.type : void 0,
        fetchPriority: typeof A.fetchPriority == "string" ? A.fetchPriority : void 0,
        referrerPolicy: typeof A.referrerPolicy == "string" ? A.referrerPolicy : void 0,
        imageSrcSet: typeof A.imageSrcSet == "string" ? A.imageSrcSet : void 0,
        imageSizes: typeof A.imageSizes == "string" ? A.imageSizes : void 0,
        media: typeof A.media == "string" ? A.media : void 0
      });
    }
  }, E.preloadModule = function(Y, A) {
    if (typeof Y == "string") if (A) {
      var j = vl(A.as, A.crossOrigin);
      g.d.m(Y, {
        as: typeof A.as == "string" && A.as !== "script" ? A.as : void 0,
        crossOrigin: j,
        integrity: typeof A.integrity == "string" ? A.integrity : void 0
      });
    } else g.d.m(Y);
  }, E.requestFormReset = function(Y) {
    g.d.r(Y);
  }, E.unstable_batchedUpdates = function(Y, A) {
    return Y(A);
  }, E.useFormState = function(Y, A, j) {
    return Yl.H.useFormState(Y, A, j);
  }, E.useFormStatus = function() {
    return Yl.H.useHostTransitionStatus();
  }, E.version = "19.2.6";
})), Td = /* @__PURE__ */ Ut(((E, R) => {
  function al() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(al);
      } catch (il) {
        console.error(il);
      }
  }
  al(), R.exports = zd();
})), Ed = /* @__PURE__ */ Ut(((E) => {
  var R = od(), al = Py(), il = Td();
  function g(l) {
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
  function gl(l) {
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
    if (gl(l) !== l) throw Error(g(188));
  }
  function A(l) {
    var t = l.alternate;
    if (!t) {
      if (t = gl(l), t === null) throw Error(g(188));
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
        throw Error(g(188));
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
          if (!f) throw Error(g(189));
        }
      }
      if (u.alternate !== a) throw Error(g(190));
    }
    if (u.tag !== 3) throw Error(g(188));
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
  var B = Object.assign, gt = /* @__PURE__ */ Symbol.for("react.element"), Bl = /* @__PURE__ */ Symbol.for("react.transitional.element"), Cl = /* @__PURE__ */ Symbol.for("react.portal"), Jl = /* @__PURE__ */ Symbol.for("react.fragment"), Wt = /* @__PURE__ */ Symbol.for("react.strict_mode"), xl = /* @__PURE__ */ Symbol.for("react.profiler"), wt = /* @__PURE__ */ Symbol.for("react.consumer"), Al = /* @__PURE__ */ Symbol.for("react.context"), ot = /* @__PURE__ */ Symbol.for("react.forward_ref"), rl = /* @__PURE__ */ Symbol.for("react.suspense"), Wl = /* @__PURE__ */ Symbol.for("react.suspense_list"), x = /* @__PURE__ */ Symbol.for("react.memo"), jl = /* @__PURE__ */ Symbol.for("react.lazy"), At = /* @__PURE__ */ Symbol.for("react.activity"), bu = /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel"), wl = Symbol.iterator;
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
      case At:
        return "Activity";
    }
    if (typeof l == "object") switch (l.$$typeof) {
      case Cl:
        return "Portal";
      case Al:
        return l.displayName || "Context";
      case wt:
        return (l._context.displayName || "Context") + ".Consumer";
      case ot:
        var t = l.render;
        return l = l.displayName, l || (l = t.displayName || t.name || "", l = l !== "" ? "ForwardRef(" + l + ")" : "ForwardRef"), l;
      case x:
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
  var D = Array.isArray, _ = al.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, M = il.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, w = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, el = [], $l = -1;
  function v(l) {
    return { current: l };
  }
  function T(l) {
    0 > $l || (l.current = el[$l], el[$l] = null, $l--);
  }
  function O(l, t) {
    $l++, el[$l] = l.current, l.current = t;
  }
  var N = v(null), X = v(null), Q = v(null), F = v(null);
  function pl(l, t) {
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
  function hl() {
    T(N), T(X), T(Q);
  }
  function Oa(l) {
    l.memoizedState !== null && O(F, l);
    var t = N.current, u = Oy(t, l.type);
    t !== u && (O(X, l), O(N, u));
  }
  function bn(l) {
    X.current === l && (T(N), T(X)), F.current === l && (T(F), Sn._currentValue = w);
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
              } catch (s) {
                var S = s;
              }
              Reflect.construct(l, [], z);
            } else {
              try {
                z.call();
              } catch (s) {
                S = s;
              }
              l.call(z.prototype);
            }
          } else {
            try {
              throw Error();
            } catch (s) {
              S = s;
            }
            (z = l()) && typeof z.catch == "function" && z.catch(function() {
            });
          }
        } catch (s) {
          if (s && S && typeof s.stack == "string") return [s.stack, S.stack];
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
  function ti(l) {
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
  var Qe = Object.prototype.hasOwnProperty, Ze = R.unstable_scheduleCallback, Ve = R.unstable_cancelCallback, tv = R.unstable_shouldYield, uv = R.unstable_requestPaint, Fl = R.unstable_now, av = R.unstable_getCurrentPriorityLevel, ui = R.unstable_ImmediatePriority, ai = R.unstable_UserBlockingPriority, zn = R.unstable_NormalPriority, nv = R.unstable_LowPriority, ni = R.unstable_IdlePriority, ev = R.log, fv = R.unstable_setDisableYieldValue, Ma = null, kl = null;
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
  var Tn = 256, En = 262144, An = 4194304;
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
  function ei() {
    var l = An;
    return An <<= 1, (An & 62914560) === 0 && (An = 4194304), l;
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
        var s = S[o];
        s !== null && (s.lane &= -536870913);
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
  var Ft = Math.random().toString(36).slice(2), Dl = "__reactFiber$" + Ft, Gl = "__reactProps$" + Ft, Ua = "__reactContainer$" + Ft, Je = "__reactEvents$" + Ft, dv = "__reactListeners$" + Ft, hv = "__reactHandles$" + Ft, di = "__reactResources$" + Ft, Ha = "__reactMarker$" + Ft;
  function xe(l) {
    delete l[Dl], delete l[Gl], delete l[Je], delete l[dv], delete l[hv];
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
    throw Error(g(33));
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
  function Eu(l, t) {
    Ju(l, t), Ju(l + "Capture", t);
  }
  function Ju(l, t) {
    for (Si[l] = t, l = 0; l < t.length; l++) hi.add(t[l]);
  }
  var Sv = RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"), si = {}, gi = {};
  function sv(l) {
    return Qe.call(gi, l) ? !0 : Qe.call(si, l) ? !1 : Sv.test(l) ? gi[l] = !0 : (si[l] = !0, !1);
  }
  function Mn(l, t, u) {
    if (sv(t)) if (u === null) l.removeAttribute(t);
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
  function oi(l) {
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
  function re(l) {
    if (!l._valueTracker) {
      var t = oi(l) ? "checked" : "value";
      l._valueTracker = gv(l, t, "" + l[t]);
    }
  }
  function bi(l) {
    if (!l) return !1;
    var t = l._valueTracker;
    if (!t) return !0;
    var u = t.getValue(), a = "";
    return l && (a = oi(l) ? l.checked ? "true" : "false" : l.value), l = a, l !== u ? (t.setValue(l), !0) : !1;
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
  function zi(l, t, u, a, n, e, f, c) {
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
  function Ti(l, t, u) {
    if (t != null && (t = "" + et(t), t !== l.value && (l.value = t), u == null)) {
      l.defaultValue !== t && (l.defaultValue = t);
      return;
    }
    l.defaultValue = u != null ? "" + et(u) : "";
  }
  function Ei(l, t, u, a) {
    if (t == null) {
      if (a != null) {
        if (u != null) throw Error(g(92));
        if (D(a)) {
          if (1 < a.length) throw Error(g(93));
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
  function Ai(l, t, u) {
    var a = t.indexOf("--") === 0;
    u == null || typeof u == "boolean" || u === "" ? a ? l.setProperty(t, "") : t === "float" ? l.cssFloat = "" : l[t] = "" : a ? l.setProperty(t, u) : typeof u != "number" || u === 0 || bv.has(t) ? t === "float" ? l.cssFloat = u : l[t] = ("" + u).trim() : l[t] = u + "px";
  }
  function _i(l, t, u) {
    if (t != null && typeof t != "object") throw Error(g(62));
    if (l = l.style, u != null) {
      for (var a in u) !u.hasOwnProperty(a) || t != null && t.hasOwnProperty(a) || (a.indexOf("--") === 0 ? l.setProperty(a, "") : a === "float" ? l.cssFloat = "" : l[a] = "");
      for (var n in t) a = t[n], t.hasOwnProperty(n) && u[n] !== a && Ai(l, n, a);
    } else for (var e in t) t.hasOwnProperty(e) && Ai(l, e, t[e]);
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
  function Hn(l) {
    return Tv.test("" + l) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : l;
  }
  function Nt() {
  }
  var Fe = null;
  function ke(l) {
    return l = l.target || l.srcElement || window, l.correspondingUseElement && (l = l.correspondingUseElement), l.nodeType === 3 ? l.parentNode : l;
  }
  var Wu = null, wu = null;
  function Oi(l) {
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
                if (!n) throw Error(g(90));
                We(a, n.value, n.defaultValue, n.defaultValue, n.checked, n.defaultChecked, n.type, n.name);
              }
            }
            for (t = 0; t < u.length; t++) a = u[t], a.form === l.form && bi(a);
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
      if (Ie = !1, (Wu !== null || wu !== null) && (se(), Wu && (t = Wu, l = wu, wu = Wu = null, Oi(t), l)))
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
    if (u && typeof u != "function") throw Error(g(231, t, typeof u));
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
  var Au = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(l) {
      return l.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, Bn = Xl(Au), Ba = B({}, Au, {
    view: 0,
    detail: 0
  }), Ev = Xl(Ba), tf, uf, pa, pn = B({}, Ba, {
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
      return "movementX" in l ? l.movementX : (l !== pa && (pa && l.type === "mousemove" ? (tf = l.screenX - pa.screenX, uf = l.screenY - pa.screenY) : uf = tf = 0, pa = l), tf);
    },
    movementY: function(l) {
      return "movementY" in l ? l.movementY : uf;
    }
  }), Hi = Xl(pn), Av = Xl(B({}, pn, { dataTransfer: 0 })), af = Xl(B({}, Ba, { relatedTarget: 0 })), _v = Xl(B({}, Au, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  })), Ov = Xl(B({}, Au, { clipboardData: function(l) {
    return "clipboardData" in l ? l.clipboardData : window.clipboardData;
  } })), Ni = Xl(B({}, Au, { data: 0 })), Mv = {
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
  function Hv(l) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(l) : (l = Uv[l]) ? !!t[l] : !1;
  }
  function nf() {
    return Hv;
  }
  var Nv = Xl(B({}, Ba, {
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
  })), qi = Xl(B({}, pn, {
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
  })), Yv = Xl(B({}, Au, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  })), Bv = Xl(B({}, pn, {
    deltaX: function(l) {
      return "deltaX" in l ? l.deltaX : "wheelDeltaX" in l ? -l.wheelDeltaX : 0;
    },
    deltaY: function(l) {
      return "deltaY" in l ? l.deltaY : "wheelDeltaY" in l ? -l.wheelDeltaY : "wheelDelta" in l ? -l.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  })), pv = Xl(B({}, Au, {
    newState: 0,
    oldState: 0
  })), Rv = [
    9,
    13,
    27,
    32
  ], ef = qt && "CompositionEvent" in window, Ra = null;
  qt && "documentMode" in document && (Ra = document.documentMode);
  var Cv = qt && "TextEvent" in window && !Ra, Yi = qt && (!ef || Ra && 8 < Ra && 11 >= Ra), Bi = " ", pi = !1;
  function Ri(l, t) {
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
  function Ci(l) {
    return l = l.detail, typeof l == "object" && "data" in l ? l.data : null;
  }
  var $u = !1;
  function jv(l, t) {
    switch (l) {
      case "compositionend":
        return Ci(t);
      case "keypress":
        return t.which !== 32 ? null : (pi = !0, Bi);
      case "textInput":
        return l = t.data, l === Bi && pi ? null : l;
      default:
        return null;
    }
  }
  function Gv(l, t) {
    if ($u) return l === "compositionend" || !ef && Ri(l, t) ? (l = Di(), Nn = lf = kt = null, $u = !1, l) : null;
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
  function ji(l) {
    var t = l && l.nodeName && l.nodeName.toLowerCase();
    return t === "input" ? !!Xv[l.type] : t === "textarea";
  }
  function Gi(l, t, u, a) {
    Wu ? wu ? wu.push(a) : wu = [a] : Wu = a, t = Ae(t, "onChange"), 0 < t.length && (u = new Bn("onChange", "change", null, u, a), l.push({
      event: u,
      listeners: t
    }));
  }
  var Ca = null, ja = null;
  function Qv(l) {
    gy(l, 0);
  }
  function Rn(l) {
    if (bi(Na(l))) return l;
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
    Ca && (Ca.detachEvent("onpropertychange", Li), ja = Ca = null);
  }
  function Li(l) {
    if (l.propertyName === "value" && Rn(ja)) {
      var t = [];
      Gi(t, ja, l, ke(l)), Mi(Qv, t);
    }
  }
  function Zv(l, t, u) {
    l === "focusin" ? (Vi(), Ca = t, ja = u, Ca.attachEvent("onpropertychange", Li)) : l === "focusout" && Vi();
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
  function ri(l) {
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
  function Wi(l, t, u) {
    var a = u.window === u ? u.document : u.nodeType === 9 ? u : u.ownerDocument;
    mf || Fu == null || Fu !== Un(a) || (a = Fu, "selectionStart" in a && yf(a) ? a = {
      start: a.selectionStart,
      end: a.selectionEnd
    } : (a = (a.ownerDocument && a.ownerDocument.defaultView || window).getSelection(), a = {
      anchorNode: a.anchorNode,
      anchorOffset: a.anchorOffset,
      focusNode: a.focusNode,
      focusOffset: a.focusOffset
    }), Xa && Ga(Xa, a) || (Xa = a, a = Ae(vf, "onSelect"), 0 < a.length && (t = new Bn("onSelect", "select", null, t, u), l.push({
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
  }, df = {}, wi = {};
  qt && (wi = document.createElement("div").style, "AnimationEvent" in window || (delete ku.animationend.animation, delete ku.animationiteration.animation, delete ku.animationstart.animation), "TransitionEvent" in window || delete ku.transitionend.transition);
  function Ou(l) {
    if (df[l]) return df[l];
    if (!ku[l]) return l;
    var t = ku[l], u;
    for (u in t) if (t.hasOwnProperty(u) && u in wi) return df[l] = t[u];
    return l;
  }
  var $i = Ou("animationend"), Fi = Ou("animationiteration"), ki = Ou("animationstart"), rv = Ou("transitionrun"), Wv = Ou("transitionstart"), wv = Ou("transitioncancel"), Ii = Ou("transitionend"), Pi = /* @__PURE__ */ new Map(), hf = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
  hf.push("scrollEnd");
  function zt(l, t) {
    Pi.set(l, t), Eu(t, [l]);
  }
  var Cn = typeof reportError == "function" ? reportError : function(l) {
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
  function sf(l, t, u, a) {
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
    if (50 < fn) throw fn = 0, Oc = null, Error(g(185));
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
  function gf(l) {
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
    if (a = l, typeof l == "function") gf(l) && (f = 1);
    else if (typeof l == "string") f = td(l, u, N.current) ? 26 : l === "html" || l === "head" || l === "body" ? 27 : 5;
    else l: switch (l) {
      case At:
        return l = lt(31, u, t, n), l.elementType = At, l.lanes = e, l;
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
          case Al:
            f = 10;
            break l;
          case wt:
            f = 9;
            break l;
          case ot:
            f = 11;
            break l;
          case x:
            f = 14;
            break l;
          case jl:
            f = 16, a = null;
            break l;
        }
        f = 29, u = Error(g(130, l === null ? "null" : typeof l, "")), a = null;
    }
    return t = lt(f, u, t, n), t.elementType = l, t.type = a, t.lanes = e, t;
  }
  function Du(l, t, u, a) {
    return l = lt(7, l, a, t), l.lanes = u, l;
  }
  function of(l, t, u) {
    return l = lt(6, l, null, t), l.lanes = u, l;
  }
  function u0(l) {
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
  var Ul = null, fl = null, J = !1, Pt = null, mt = !1, Ef = Error(g(519));
  function lu(l) {
    throw Za(it(Error(g(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML", "")), l)), Ef;
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
        V("invalid", t), Ei(t, a.value, a.defaultValue, a.children);
    }
    u = a.children, typeof u != "string" && typeof u != "number" && typeof u != "bigint" || t.textContent === "" + u || a.suppressHydrationWarning === !0 || Ey(t.textContent, u) ? (a.popover != null && (V("beforetoggle", t), V("toggle", t)), a.onScroll != null && V("scroll", t), a.onScrollEnd != null && V("scrollend", t), a.onClick != null && (t.onclick = Nt), t = !0) : t = !1, t || lu(l, !0);
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
    if ((u = t !== 3 && t !== 27) && ((u = t === 5) && (u = l.type, u = !(u !== "form" && u !== "button") || Xc(l.type, l.memoizedProps)), u = !u), u && fl && lu(l), c0(l), t === 13) {
      if (l = l.memoizedState, l = l !== null ? l.dehydrated : null, !l) throw Error(g(317));
      fl = qy(l);
    } else if (t === 31) {
      if (l = l.memoizedState, l = l !== null ? l.dehydrated : null, !l) throw Error(g(317));
      fl = qy(l);
    } else t === 27 ? (t = fl, du(l.type) ? (l = Kc, Kc = null, fl = l) : fl = t) : fl = Ul ? St(l.stateNode.nextSibling) : null;
    return !0;
  }
  function Uu() {
    fl = Ul = null, J = !1;
  }
  function Af() {
    var l = Pt;
    return l !== null && (Ll === null ? Ll = l : Ll.push.apply(Ll, l), Pt = null), l;
  }
  function Za(l) {
    Pt === null ? Pt = [l] : Pt.push(l);
  }
  var _f = v(null), Hu = null, pt = null;
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
        if (f = n.return, f === null) throw Error(g(341));
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
        if (f === null) throw Error(g(387));
        if (f = f.memoizedProps, f !== null) {
          var c = n.type;
          Pl(n.pendingProps.value, f.value) || (l !== null ? l.push(c) : l = [c]);
        }
      } else if (n === F.current) {
        if (f = n.alternate, f === null) throw Error(g(387));
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
    Hu = l, pt = null, l = l.dependencies, l !== null && (l.firstContext = null);
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
    }, pt === null) {
      if (l === null) throw Error(g(308));
      pt = t, l.dependencies = {
        lanes: 0,
        firstContext: t
      }, l.flags |= 524288;
    } else pt = pt.next = t;
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
    $$typeof: Al,
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
  var v0 = _.S;
  _.S = function(l, t) {
    J1 = Fl(), typeof t == "object" && t !== null && typeof t.then == "function" && Pv(l, t), v0 !== null && v0(l, t);
  };
  var qu = v(null);
  function Hf() {
    var l = qu.current;
    return l !== null ? l : nl.pooledCache;
  }
  function Kn(l, t) {
    t === null ? O(qu, qu.current) : O(qu, t.pool);
  }
  function m0() {
    var l = Hf();
    return l === null ? null : {
      parent: ol._currentValue,
      pool: l
    };
  }
  var fa = Error(g(460)), Nf = Error(g(474)), Jn = Error(g(542)), xn = { then: function() {
  } };
  function d0(l) {
    return l = l.status, l === "fulfilled" || l === "rejected";
  }
  function h0(l, t, u) {
    switch (u = l[u], u === void 0 ? l.push(t) : u !== t && (t.then(Nt, Nt), t = u), t.status) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw l = t.reason, s0(l), l;
      default:
        if (typeof t.status == "string") t.then(Nt, Nt);
        else {
          if (l = nl, l !== null && 100 < l.shellSuspendCounter) throw Error(g(482));
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
            throw l = t.reason, s0(l), l;
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
    if (Bu === null) throw Error(g(459));
    var l = Bu;
    return Bu = null, l;
  }
  function s0(l) {
    if (l === fa || l === Jn) throw Error(g(483));
  }
  var ca = null, Ka = 0;
  function rn(l) {
    var t = Ka;
    return Ka += 1, ca === null && (ca = []), h0(ca, l, t);
  }
  function Ja(l, t) {
    t = t.props.ref, l.ref = t !== void 0 ? t : null;
  }
  function Wn(l, t) {
    throw t.$$typeof === gt ? Error(g(525)) : (l = Object.prototype.toString.call(t), Error(g(31, l === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : l)));
  }
  function g0(l) {
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
          case Cl:
            return y = bf(y, m.mode, d), y.return = m, y;
          case jl:
            return y = Yu(y), z(m, y, d);
        }
        if (D(y) || _t(y)) return y = Du(y, m.mode, d, null), y.return = m, y;
        if (typeof y.then == "function") return z(m, rn(y), d);
        if (y.$$typeof === Al) return z(m, Ln(m, y), d);
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
          case Cl:
            return d.key === q ? h(m, y, d, b) : null;
          case jl:
            return d = Yu(d), S(m, y, d, b);
        }
        if (D(d) || _t(d)) return q !== null ? null : o(m, y, d, b, null);
        if (typeof d.then == "function") return S(m, y, rn(d), b);
        if (d.$$typeof === Al) return S(m, y, Ln(m, d), b);
        Wn(m, d);
      }
      return null;
    }
    function s(m, y, d, b, q) {
      if (typeof b == "string" && b !== "" || typeof b == "number" || typeof b == "bigint") return m = m.get(d) || null, c(y, m, "" + b, q);
      if (typeof b == "object" && b !== null) {
        switch (b.$$typeof) {
          case Bl:
            return m = m.get(b.key === null ? d : b.key) || null, i(y, m, b, q);
          case Cl:
            return m = m.get(b.key === null ? d : b.key) || null, h(y, m, b, q);
          case jl:
            return b = Yu(b), s(m, y, d, b, q);
        }
        if (D(b) || _t(b)) return m = m.get(d) || null, o(y, m, b, q, null);
        if (typeof b.then == "function") return s(m, y, d, rn(b), q);
        if (b.$$typeof === Al) return s(m, y, d, Ln(y, b), q);
        Wn(y, b);
      }
      return null;
    }
    function U(m, y, d, b) {
      for (var q = null, r = null, H = y, G = y = 0, K = null; H !== null && G < d.length; G++) {
        H.index > G ? (K = H, H = null) : K = H.sibling;
        var W = S(m, H, d[G], b);
        if (W === null) {
          H === null && (H = K);
          break;
        }
        l && H && W.alternate === null && t(m, H), y = e(W, y, G), r === null ? q = W : r.sibling = W, r = W, H = K;
      }
      if (G === d.length) return u(m, H), J && Bt(m, G), q;
      if (H === null) {
        for (; G < d.length; G++) H = z(m, d[G], b), H !== null && (y = e(H, y, G), r === null ? q = H : r.sibling = H, r = H);
        return J && Bt(m, G), q;
      }
      for (H = a(H); G < d.length; G++) K = s(H, m, G, d[G], b), K !== null && (l && K.alternate !== null && H.delete(K.key === null ? G : K.key), y = e(K, y, G), r === null ? q = K : r.sibling = K, r = K);
      return l && H.forEach(function(ou) {
        return t(m, ou);
      }), J && Bt(m, G), q;
    }
    function p(m, y, d, b) {
      if (d == null) throw Error(g(151));
      for (var q = null, r = null, H = y, G = y = 0, K = null, W = d.next(); H !== null && !W.done; G++, W = d.next()) {
        H.index > G ? (K = H, H = null) : K = H.sibling;
        var ou = S(m, H, W.value, b);
        if (ou === null) {
          H === null && (H = K);
          break;
        }
        l && H && ou.alternate === null && t(m, H), y = e(ou, y, G), r === null ? q = ou : r.sibling = ou, r = ou, H = K;
      }
      if (W.done) return u(m, H), J && Bt(m, G), q;
      if (H === null) {
        for (; !W.done; G++, W = d.next()) W = z(m, W.value, b), W !== null && (y = e(W, y, G), r === null ? q = W : r.sibling = W, r = W);
        return J && Bt(m, G), q;
      }
      for (H = a(H); !W.done; G++, W = d.next()) W = s(H, m, G, W.value, b), W !== null && (l && W.alternate !== null && H.delete(W.key === null ? G : W.key), y = e(W, y, G), r === null ? q = W : r.sibling = W, r = W);
      return l && H.forEach(function(sd) {
        return t(m, sd);
      }), J && Bt(m, G), q;
    }
    function tl(m, y, d, b) {
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
          case Cl:
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
            return d = Yu(d), tl(m, y, d, b);
        }
        if (D(d)) return U(m, y, d, b);
        if (_t(d)) {
          if (q = _t(d), typeof q != "function") throw Error(g(150));
          return d = q.call(d), p(m, y, d, b);
        }
        if (typeof d.then == "function") return tl(m, y, rn(d), b);
        if (d.$$typeof === Al) return tl(m, y, Ln(m, d), b);
        Wn(m, d);
      }
      return typeof d == "string" && d !== "" || typeof d == "number" || typeof d == "bigint" ? (d = "" + d, y !== null && y.tag === 6 ? (u(m, y.sibling), b = n(y, d), b.return = m, m = b) : (u(m, y), b = of(d, m.mode, b), b.return = m, m = b), f(m)) : u(m, y);
    }
    return function(m, y, d, b) {
      try {
        Ka = 0;
        var q = tl(m, y, d, b);
        return ca = null, q;
      } catch (H) {
        if (H === fa || H === Jn) throw H;
        var r = lt(29, H, null, m.mode);
        return r.lanes = b, r.return = m, r;
      }
    };
  }
  var pu = g0(!0), o0 = g0(!1), uu = !1;
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
  function Cu(l, t, u) {
    var a = l.updateQueue;
    if (a === null) return null;
    if (a = a.shared, ($ & 2) !== 0) {
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
  var pf = !1;
  function ra() {
    if (pf) {
      var l = ea;
      if (l !== null) throw l;
    }
  }
  function Wa(l, t, u, a) {
    pf = !1;
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
        var S = c.lane & -536870913, s = S !== c.lane;
        if (s ? (L & S) === S : (a & S) === S) {
          S !== 0 && S === na && (pf = !0), o !== null && (o = o.next = {
            lane: 0,
            tag: c.tag,
            payload: c.payload,
            callback: null,
            next: null
          });
          l: {
            var U = l, p = c;
            S = t;
            var tl = u;
            switch (p.tag) {
              case 1:
                if (U = p.payload, typeof U == "function") {
                  z = U.call(tl, z, S);
                  break l;
                }
                z = U;
                break l;
              case 3:
                U.flags = U.flags & -65537 | 128;
              case 0:
                if (U = p.payload, S = typeof U == "function" ? U.call(tl, z, S) : U, S == null) break l;
                z = B({}, z, S);
                break l;
              case 2:
                uu = !0;
            }
          }
          S = c.callback, S !== null && (l.flags |= 64, s && (l.flags |= 8192), s = n.callbacks, s === null ? n.callbacks = [S] : s.push(S));
        } else s = {
          lane: S,
          tag: c.tag,
          payload: c.payload,
          callback: c.callback,
          next: null
        }, o === null ? (h = o = s, i = z) : o = o.next = s, f |= S;
        if (c = c.next, c === null) {
          if (c = n.shared.pending, c === null) break;
          s = c, c = s.next, s.next = null, n.lastBaseUpdate = s, n.shared.pending = null;
        }
      } while (!0);
      o === null && (i = z), n.baseState = i, n.firstBaseUpdate = h, n.lastBaseUpdate = o, e === null && (n.shared.lanes = 0), cu |= f, l.lanes = f, l.memoizedState = z;
    }
  }
  function b0(l, t) {
    if (typeof l != "function") throw Error(g(191, l));
    l.call(t);
  }
  function z0(l, t) {
    var u = l.callbacks;
    if (u !== null) for (l.callbacks = null, l = 0; l < u.length; l++) b0(u[l], t);
  }
  var ia = v(null), wn = v(0);
  function T0(l, t) {
    l = Kt, O(wn, l), O(ia, t), Kt = l | t.baseLanes;
  }
  function Rf() {
    O(wn, Kt), O(ia, ia.current);
  }
  function Cf() {
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
  function E0(l) {
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
  var Ct = 0, C = null, P = null, bl = null, Fn = !1, ya = !1, ju = !1, kn = 0, wa = 0, va = null, tm = 0;
  function ml() {
    throw Error(g(321));
  }
  function Gf(l, t) {
    if (t === null) return !1;
    for (var u = 0; u < t.length && u < l.length; u++) if (!Pl(l[u], t[u])) return !1;
    return !0;
  }
  function Xf(l, t, u, a, n, e) {
    return Ct = e, C = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, _.H = l === null || l.memoizedState === null ? n1 : Pf, ju = !1, e = u(a, n), ju = !1, ya && (e = _0(t, u, a, n)), A0(l), e;
  }
  function A0(l) {
    _.H = ka;
    var t = P !== null && P.next !== null;
    if (Ct = 0, bl = P = C = null, Fn = !1, wa = 0, va = null, t) throw Error(g(300));
    l === null || zl || (l = l.dependencies, l !== null && Vn(l) && (zl = !0));
  }
  function _0(l, t, u, a) {
    C = l;
    var n = 0;
    do {
      if (ya && (va = null), wa = 0, ya = !1, 25 <= n) throw Error(g(301));
      if (n += 1, bl = P = null, l.updateQueue != null) {
        var e = l.updateQueue;
        e.lastEffect = null, e.events = null, e.stores = null, e.memoCache != null && (e.memoCache.index = 0);
      }
      _.H = e1, e = t(u, a);
    } while (ya);
    return e;
  }
  function um() {
    var l = _.H, t = l.useState()[0];
    return t = typeof t.then == "function" ? $a(t) : t, l = l.useState()[0], (P !== null ? P.memoizedState : null) !== l && (C.flags |= 1024), t;
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
    Ct = 0, bl = P = C = null, ya = !1, wa = kn = 0, va = null;
  }
  function Rl() {
    var l = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return bl === null ? C.memoizedState = bl = l : bl = bl.next = l, bl;
  }
  function sl() {
    if (P === null) {
      var l = C.alternate;
      l = l !== null ? l.memoizedState : null;
    } else l = P.next;
    var t = bl === null ? C.memoizedState : bl.next;
    if (t !== null) bl = t, P = l;
    else {
      if (l === null)
        throw C.alternate === null ? Error(g(467)) : Error(g(310));
      P = l, l = {
        memoizedState: P.memoizedState,
        baseState: P.baseState,
        baseQueue: P.baseQueue,
        queue: P.queue,
        next: null
      }, bl === null ? C.memoizedState = bl = l : bl = bl.next = l;
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
    return wa += 1, va === null && (va = []), l = h0(va, l, t), t = C, (bl === null ? t.memoizedState : bl.next) === null && (t = t.alternate, _.H = t === null || t.memoizedState === null ? n1 : Pf), l;
  }
  function Pn(l) {
    if (l !== null && typeof l == "object") {
      if (typeof l.then == "function") return $a(l);
      if (l.$$typeof === Al) return Hl(l);
    }
    throw Error(g(438, String(l)));
  }
  function Lf(l) {
    var t = null, u = C.updateQueue;
    if (u !== null && (t = u.memoCache), t == null) {
      var a = C.alternate;
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
    }, u === null && (u = In(), C.updateQueue = u), u.memoCache = t, u = t.data[t.index], u === void 0) for (u = t.data[t.index] = Array(l), a = 0; a < l; a++) u[a] = bu;
    return t.index++, u;
  }
  function jt(l, t) {
    return typeof t == "function" ? t(l) : t;
  }
  function le(l) {
    return Kf(sl(), P, l);
  }
  function Kf(l, t, u) {
    var a = l.queue;
    if (a === null) throw Error(g(311));
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
        if (z !== h.lane ? (L & z) === z : (Ct & z) === z) {
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
          else if ((Ct & S) === S) {
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
          }, i === null ? (c = i = z, f = e) : i = i.next = z, C.lanes |= S, cu |= S;
          z = h.action, ju && u(e, z), e = h.hasEagerState ? h.eagerState : u(e, z);
        } else S = {
          lane: z,
          revertLane: h.revertLane,
          gesture: h.gesture,
          action: h.action,
          hasEagerState: h.hasEagerState,
          eagerState: h.eagerState,
          next: null
        }, i === null ? (c = i = S, f = e) : i = i.next = S, C.lanes |= z, cu |= z;
        h = h.next;
      } while (h !== null && h !== t);
      if (i === null ? f = e : i.next = c, !Pl(e, l.memoizedState) && (zl = !0, o && (u = ea, u !== null))) throw u;
      l.memoizedState = e, l.baseState = f, l.baseQueue = i, a.lastRenderedState = e;
    }
    return n === null && (a.lanes = 0), [l.memoizedState, a.dispatch];
  }
  function Jf(l) {
    var t = sl(), u = t.queue;
    if (u === null) throw Error(g(311));
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
    var a = C, n = sl(), e = J;
    if (e) {
      if (u === void 0) throw Error(g(407));
      u = u();
    } else u = t();
    var f = !Pl((P || n).memoizedState, u);
    if (f && (n.memoizedState = u, zl = !0), n = n.queue, Wf(U0.bind(null, a, n, l), [l]), n.getSnapshot !== t || f || bl !== null && bl.memoizedState.tag & 1) {
      if (a.flags |= 2048, ma(9, { destroy: void 0 }, D0.bind(null, a, n, u, t), null), nl === null) throw Error(g(349));
      e || (Ct & 127) !== 0 || M0(a, t, u);
    }
    return u;
  }
  function M0(l, t, u) {
    l.flags |= 16384, l = {
      getSnapshot: t,
      value: u
    }, t = C.updateQueue, t === null ? (t = In(), C.updateQueue = t, t.stores = [l]) : (u = t.stores, u === null ? t.stores = [l] : u.push(l));
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
  function q0(l, t, u, a) {
    return l.baseState = u, Kf(l, P, typeof a == "function" ? a : jt);
  }
  function am(l, t, u, a, n) {
    if (ae(l)) throw Error(g(485));
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
        rf(l, t, h);
      } finally {
        e !== null && f.types !== null && (e.types = f.types), _.T = e;
      }
    } else try {
      e = u(n, a), B0(l, t, e);
    } catch (h) {
      rf(l, t, h);
    }
  }
  function B0(l, t, u) {
    u !== null && typeof u == "object" && typeof u.then == "function" ? u.then(function(a) {
      p0(l, t, a);
    }, function(a) {
      return rf(l, t, a);
    }) : p0(l, t, u);
  }
  function p0(l, t, u) {
    t.status = "fulfilled", t.value = u, R0(t), l.state = u, t = l.pending, t !== null && (u = t.next, u === t ? l.pending = null : (u = u.next, t.next = u, Y0(l, u)));
  }
  function rf(l, t, u) {
    var a = l.pending;
    if (l.pending = null, a !== null) {
      a = a.next;
      do
        t.status = "rejected", t.reason = u, R0(t), t = t.next;
      while (t !== a);
    }
    l.action = null;
  }
  function R0(l) {
    l = l.listeners;
    for (var t = 0; t < l.length; t++) (0, l[t])();
  }
  function C0(l, t) {
    return t;
  }
  function j0(l, t) {
    if (J) {
      var u = nl.formState;
      if (u !== null) {
        l: {
          var a = C;
          if (J) {
            if (fl) {
              t: {
                for (var n = fl, e = mt; n.nodeType !== 8; ) {
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
                fl = St(n.nextSibling), a = n.data === "F!";
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
      lastRenderedReducer: C0,
      lastRenderedState: t
    }, u.queue = a, u = t1.bind(null, C, a), a.dispatch = u, a = xf(!1), e = If.bind(null, C, !1, a.queue), a = Rl(), n = {
      state: t,
      dispatch: null,
      action: l,
      pending: null
    }, a.queue = n, u = am.bind(null, C, n, e, u), n.dispatch = u, a.memoizedState = l, [
      t,
      u,
      !1
    ];
  }
  function G0(l) {
    return X0(sl(), P, l);
  }
  function X0(l, t, u) {
    if (t = Kf(l, t, C0)[0], l = le(jt)[0], typeof t == "object" && t !== null && typeof t.then == "function") try {
      var a = $a(t);
    } catch (f) {
      throw f === fa ? Jn : f;
    }
    else a = t;
    t = sl();
    var n = t.queue, e = n.dispatch;
    return u !== t.memoizedState && (C.flags |= 2048, ma(9, { destroy: void 0 }, nm.bind(null, n, u), null)), [
      a,
      e,
      l
    ];
  }
  function nm(l, t) {
    l.action = t;
  }
  function Q0(l) {
    var t = sl(), u = P;
    if (u !== null) return X0(t, u, l);
    sl(), t = t.memoizedState, u = sl();
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
    }, t = C.updateQueue, t === null && (t = In(), C.updateQueue = t), u = t.lastEffect, u === null ? t.lastEffect = l.next = l : (a = u.next, u.next = l, l.next = a, t.lastEffect = l), l;
  }
  function Z0() {
    return sl().memoizedState;
  }
  function te(l, t, u, a) {
    var n = Rl();
    C.flags |= l, n.memoizedState = ma(1 | t, { destroy: void 0 }, u, a === void 0 ? null : a);
  }
  function ue(l, t, u, a) {
    var n = sl();
    a = a === void 0 ? null : a;
    var e = n.memoizedState.inst;
    P !== null && a !== null && Gf(a, P.memoizedState.deps) ? n.memoizedState = ma(t, e, u, a) : (C.flags |= l, n.memoizedState = ma(1 | t, e, u, a));
  }
  function V0(l, t) {
    te(8390656, 8, l, t);
  }
  function Wf(l, t) {
    ue(2048, 8, l, t);
  }
  function em(l) {
    C.flags |= 4;
    var t = C.updateQueue;
    if (t === null) t = In(), C.updateQueue = t, t.events = [l];
    else {
      var u = t.events;
      u === null ? t.events = [l] : u.push(l);
    }
  }
  function L0(l) {
    var t = sl().memoizedState;
    return em({
      ref: t,
      nextImpl: l
    }), function() {
      if (($ & 2) !== 0) throw Error(g(440));
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
  function r0(l, t, u) {
    u = u != null ? u.concat([l]) : null, ue(4, 4, x0.bind(null, t, l), u);
  }
  function wf() {
  }
  function W0(l, t) {
    var u = sl();
    t = t === void 0 ? null : t;
    var a = u.memoizedState;
    return t !== null && Gf(t, a[1]) ? a[0] : (u.memoizedState = [l, t], l);
  }
  function w0(l, t) {
    var u = sl();
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
    return u === void 0 || (Ct & 1073741824) !== 0 && (L & 261930) === 0 ? l.memoizedState = t : (l.memoizedState = u, l = r1(), C.lanes |= l, cu |= l, u);
  }
  function $0(l, t, u, a) {
    return Pl(u, t) ? u : ia.current !== null ? (l = $f(l, u, a), Pl(l, t) || (zl = !0), l) : (Ct & 42) === 0 || (Ct & 1073741824) !== 0 && (L & 261930) === 0 ? (zl = !0, l.memoizedState = u) : (l = r1(), C.lanes |= l, cu |= l, t);
  }
  function F0(l, t, u, a, n) {
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
    if (l.tag !== 5) throw Error(g(476));
    var n = k0(l).queue;
    F0(l, n, t, w, u === null ? fm : function() {
      return I0(l), u(a);
    });
  }
  function k0(l) {
    var t = l.memoizedState;
    if (t !== null) return t;
    t = {
      memoizedState: w,
      baseState: w,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: jt,
        lastRenderedState: w
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
    return sl().memoizedState;
  }
  function l1() {
    return sl().memoizedState;
  }
  function cm(l) {
    for (var t = l.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var u = ht();
          l = Ru(u);
          var a = Cu(t, l, u);
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
    }, ae(l) ? u1(t, u) : (u = sf(l, t, u, a), u !== null && (Kl(u, l, a), a1(u, t, a)));
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
        if (n.hasEagerState = !0, n.eagerState = c, Pl(c, f)) return Gn(l, t, n, 0), nl === null && jn(), !1;
      } catch {
      }
      if (u = sf(l, t, n, a), u !== null) return Kl(u, l, a), a1(u, t, a), !0;
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
      if (t) throw Error(g(479));
    } else t = sf(l, u, a, 2), t !== null && Kl(t, l, 2);
  }
  function ae(l) {
    var t = l.alternate;
    return l === C || t !== null && t === C;
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
  var n1 = {
    readContext: Hl,
    use: Pn,
    useCallback: function(l, t) {
      return Rl().memoizedState = [l, t === void 0 ? null : t], l;
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
      }, a.queue = l, l = l.dispatch = im.bind(null, C, l), [a.memoizedState, l];
    },
    useRef: function(l) {
      var t = Rl();
      return l = { current: l }, t.memoizedState = l;
    },
    useState: function(l) {
      l = xf(l);
      var t = l.queue, u = t1.bind(null, C, t);
      return t.dispatch = u, [l.memoizedState, u];
    },
    useDebugValue: wf,
    useDeferredValue: function(l, t) {
      return $f(Rl(), l, t);
    },
    useTransition: function() {
      var l = xf(!1);
      return l = F0.bind(null, C, l.queue, !0, !1), Rl().memoizedState = l, [!1, l];
    },
    useSyncExternalStore: function(l, t, u) {
      var a = C, n = Rl();
      if (J) {
        if (u === void 0) throw Error(g(407));
        u = u();
      } else {
        if (u = t(), nl === null) throw Error(g(349));
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
      var l = Rl(), t = nl.identifierPrefix;
      if (J) {
        var u = Mt, a = Ot;
        u = (a & ~(1 << 32 - Il(a) - 1)).toString(32) + u, t = "_" + t + "R_" + u, u = kn++, 0 < u && (t += "H" + u.toString(32)), t += "_";
      } else u = tm++, t = "_" + t + "r_" + u.toString(32) + "_";
      return l.memoizedState = t;
    },
    useHostTransitionStatus: kf,
    useFormState: j0,
    useActionState: j0,
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
      return t.queue = u, t = If.bind(null, C, !0, u), u.dispatch = t, [l, t];
    },
    useMemoCache: Lf,
    useCacheRefresh: function() {
      return Rl().memoizedState = cm.bind(null, C);
    },
    useEffectEvent: function(l) {
      var t = Rl(), u = { impl: l };
      return t.memoizedState = u, function() {
        if (($ & 2) !== 0) throw Error(g(440));
        return u.impl.apply(void 0, arguments);
      };
    }
  }, Pf = {
    readContext: Hl,
    use: Pn,
    useCallback: W0,
    useContext: Hl,
    useEffect: Wf,
    useImperativeHandle: r0,
    useInsertionEffect: K0,
    useLayoutEffect: J0,
    useMemo: w0,
    useReducer: le,
    useRef: Z0,
    useState: function() {
      return le(jt);
    },
    useDebugValue: wf,
    useDeferredValue: function(l, t) {
      return $0(sl(), P.memoizedState, l, t);
    },
    useTransition: function() {
      var l = le(jt)[0], t = sl().memoizedState;
      return [typeof l == "boolean" ? l : $a(l), t];
    },
    useSyncExternalStore: O0,
    useId: P0,
    useHostTransitionStatus: kf,
    useFormState: G0,
    useActionState: G0,
    useOptimistic: function(l, t) {
      return q0(sl(), P, l, t);
    },
    useMemoCache: Lf,
    useCacheRefresh: l1
  };
  Pf.useEffectEvent = L0;
  var e1 = {
    readContext: Hl,
    use: Pn,
    useCallback: W0,
    useContext: Hl,
    useEffect: Wf,
    useImperativeHandle: r0,
    useInsertionEffect: K0,
    useLayoutEffect: J0,
    useMemo: w0,
    useReducer: Jf,
    useRef: Z0,
    useState: function() {
      return Jf(jt);
    },
    useDebugValue: wf,
    useDeferredValue: function(l, t) {
      var u = sl();
      return P === null ? $f(u, l, t) : $0(u, P.memoizedState, l, t);
    },
    useTransition: function() {
      var l = Jf(jt)[0], t = sl().memoizedState;
      return [typeof l == "boolean" ? l : $a(l), t];
    },
    useSyncExternalStore: O0,
    useId: P0,
    useHostTransitionStatus: kf,
    useFormState: Q0,
    useActionState: Q0,
    useOptimistic: function(l, t) {
      var u = sl();
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
      var a = ht(), n = Ru(a);
      n.payload = t, u != null && (n.callback = u), t = Cu(l, n, a), t !== null && (Kl(t, l, a), xa(t, l, a));
    },
    enqueueReplaceState: function(l, t, u) {
      l = l._reactInternals;
      var a = ht(), n = Ru(a);
      n.tag = 1, n.payload = t, u != null && (n.callback = u), t = Cu(l, n, a), t !== null && (Kl(t, l, a), xa(t, l, a));
    },
    enqueueForceUpdate: function(l, t) {
      l = l._reactInternals;
      var u = ht(), a = Ru(u);
      a.tag = 2, t != null && (a.callback = t), t = Cu(l, a, u), t !== null && (Kl(t, l, u), xa(t, l, u));
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
  function ym(l) {
    Cn(l);
  }
  function vm(l) {
    console.error(l);
  }
  function mm(l) {
    Cn(l);
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
    return u = Ru(u), u.tag = 3, u.payload = { element: null }, u.callback = function() {
      ne(l, t);
    }, u;
  }
  function y1(l) {
    return l = Ru(l), l.tag = 3, l;
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
  function dm(l, t, u, a, n) {
    if (u.flags |= 32768, a !== null && typeof a == "object" && typeof a.then == "function") {
      if (t = u.alternate, t !== null && aa(t, u, n, !0), u = tt.current, u !== null) {
        switch (u.tag) {
          case 31:
          case 13:
            return dt === null ? ge() : u.alternate === null && dl === 0 && (dl = 3), u.flags &= -257, u.flags |= 65536, u.lanes = n, a === xn ? u.flags |= 16384 : (t = u.updateQueue, t === null ? u.updateQueue = /* @__PURE__ */ new Set([a]) : t.add(a), Uc(l, a, n)), !1;
          case 22:
            return u.flags |= 65536, a === xn ? u.flags |= 16384 : (t = u.updateQueue, t === null ? (t = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([a])
            }, u.updateQueue = t) : (u = t.retryQueue, u === null ? t.retryQueue = /* @__PURE__ */ new Set([a]) : u.add(a)), Uc(l, a, n)), !1;
        }
        throw Error(g(435, u.tag));
      }
      return Uc(l, a, n), ge(), !1;
    }
    if (J) return t = tt.current, t !== null ? ((t.flags & 65536) === 0 && (t.flags |= 256), t.flags |= 65536, t.lanes = n, a !== Ef && (l = Error(g(422), { cause: a }), Za(it(l, u)))) : (a !== Ef && (t = Error(g(423), { cause: a }), Za(it(t, u))), l = l.current.alternate, l.flags |= 65536, n &= -n, l.lanes |= n, a = it(a, u), n = uc(l.stateNode, a, n), Bf(l, n), dl !== 4 && (dl = 2)), !1;
    var e = Error(g(520), { cause: a });
    if (e = it(e, u), en === null ? en = [e] : en.push(e), dl !== 4 && (dl = 2), t === null) return !0;
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
  var ac = Error(g(461)), zl = !1;
  function Nl(l, t, u, a) {
    t.child = l === null ? o0(t, null, u, a) : pu(t, l.child, u, a);
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
      return typeof e == "function" && !gf(e) && e.defaultProps === void 0 && u.compare === null ? (t.tag = 15, t.type = e, h1(l, t, e, a, n)) : (l = Qn(u.type, null, a, t, t.mode, n), l.ref = t.ref, l.return = t, t.child = l);
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
        return s1(l, t, e, u, a);
      }
      if ((u & 536870912) !== 0) t.memoizedState = {
        baseLanes: 0,
        cachePool: null
      }, l !== null && Kn(t, e !== null ? e.cachePool : null), e !== null ? T0(t, e) : Rf(), E0(t);
      else return a = t.lanes = 536870912, s1(l, t, e !== null ? e.baseLanes | u : u, u, a);
    } else e !== null ? (Kn(t, e.cachePool), T0(t, e), nu(t), t.memoizedState = null) : (l !== null && Kn(t, null), Rf(), nu(t));
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
  function s1(l, t, u, a, n) {
    var e = Hf();
    return e = e === null ? null : {
      parent: ol._currentValue,
      pool: e
    }, t.memoizedState = {
      baseLanes: u,
      cachePool: e
    }, l !== null && Kn(t, null), Rf(), E0(t), l !== null && aa(l, t, a, !0), t.childLanes = n, null;
  }
  function ee(l, t) {
    return t = ce({
      mode: t.mode,
      children: t.children
    }, l.mode), t.ref = l.ref, l.child = t, t.return = l, t;
  }
  function g1(l, t, u) {
    return pu(t, l.child, null, u), l = ee(t, t.pendingProps), l.flags |= 2, ut(t), t.memoizedState = null, l;
  }
  function hm(l, t, u) {
    var a = t.pendingProps, n = (t.flags & 128) !== 0;
    if (t.flags &= -129, l === null) {
      if (J) {
        if (a.mode === "hidden") return l = ee(t, a), t.lanes = 536870912, Ia(null, l);
        if (jf(t), (l = fl) ? (l = Ny(l, mt), l = l !== null && l.data === "&" ? l : null, l !== null && (t.memoizedState = {
          dehydrated: l,
          treeContext: It !== null ? {
            id: Ot,
            overflow: Mt
          } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, u = u0(l), u.return = t, t.child = u, Ul = t, fl = null)) : l = null, l === null) throw lu(t);
        return t.lanes = 536870912, null;
      }
      return ee(t, a);
    }
    var e = l.memoizedState;
    if (e !== null) {
      var f = e.dehydrated;
      if (jf(t), n) if (t.flags & 256) t.flags &= -257, t = g1(l, t, u);
      else if (t.memoizedState !== null) t.child = l.child, t.flags |= 128, t = null;
      else throw Error(g(558));
      else if (zl || aa(l, t, u, !1), n = (u & l.childLanes) !== 0, zl || n) {
        if (a = nl, a !== null && (f = ii(a, u), f !== 0 && f !== e.retryLane)) throw e.retryLane = f, Mu(l, f), Kl(a, l, f), ac;
        ge(), t = g1(l, t, u);
      } else l = e.treeContext, fl = St(f.nextSibling), Ul = t, J = !0, Pt = null, mt = !1, l !== null && e0(t, l), t = ee(t, a), t.flags |= 4096;
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
      if (typeof u != "function" && typeof u != "object") throw Error(g(284));
      (l === null || l.ref !== u) && (t.flags |= 4194816);
    }
  }
  function nc(l, t, u, a, n) {
    return Nu(t), u = Xf(l, t, u, a, void 0, n), a = Qf(), l !== null && !zl ? (Zf(l, t, n), Gt(l, t, n)) : (J && a && zf(t), t.flags |= 1, Nl(l, t, u, n), t.child);
  }
  function o1(l, t, u, a, n, e) {
    return Nu(t), t.updateQueue = null, u = _0(t, a, u, n), A0(l), a = Qf(), l !== null && !zl ? (Zf(l, t, e), Gt(l, t, e)) : (J && a && zf(t), t.flags |= 1, Nl(l, t, u, e), t.child);
  }
  function b1(l, t, u, a, n) {
    if (Nu(t), t.stateNode === null) {
      var e = Pu, f = u.contextType;
      typeof f == "object" && f !== null && (e = Hl(f)), e = new u(a, e), t.memoizedState = e.state !== null && e.state !== void 0 ? e.state : null, e.updater = tc, t.stateNode = e, e._reactInternals = t, e = t.stateNode, e.props = a, e.state = t.memoizedState, e.refs = {}, qf(t), f = u.contextType, e.context = typeof f == "object" && f !== null ? Hl(f) : Pu, e.state = t.memoizedState, f = u.getDerivedStateFromProps, typeof f == "function" && (lc(t, u, f, a), e.state = t.memoizedState), typeof u.getDerivedStateFromProps == "function" || typeof e.getSnapshotBeforeUpdate == "function" || typeof e.UNSAFE_componentWillMount != "function" && typeof e.componentWillMount != "function" || (f = e.state, typeof e.componentWillMount == "function" && e.componentWillMount(), typeof e.UNSAFE_componentWillMount == "function" && e.UNSAFE_componentWillMount(), f !== e.state && tc.enqueueReplaceState(e, e.state, null), Wa(t, a, e, n), ra(), e.state = t.memoizedState), typeof e.componentDidMount == "function" && (t.flags |= 4194308), a = !0;
    } else if (l === null) {
      e = t.stateNode;
      var c = t.memoizedProps, i = Gu(u, c);
      e.props = i;
      var h = e.context, o = u.contextType;
      f = Pu, typeof o == "object" && o !== null && (f = Hl(o));
      var z = u.getDerivedStateFromProps;
      o = typeof z == "function" || typeof e.getSnapshotBeforeUpdate == "function", c = t.pendingProps !== c, o || typeof e.UNSAFE_componentWillReceiveProps != "function" && typeof e.componentWillReceiveProps != "function" || (c || h !== f) && c1(t, e, a, f), uu = !1;
      var S = t.memoizedState;
      e.state = S, Wa(t, a, e, n), ra(), h = t.memoizedState, c || S !== h || uu ? (typeof z == "function" && (lc(t, u, z, a), h = t.memoizedState), (i = uu || f1(t, u, i, a, S, h, f)) ? (o || typeof e.UNSAFE_componentWillMount != "function" && typeof e.componentWillMount != "function" || (typeof e.componentWillMount == "function" && e.componentWillMount(), typeof e.UNSAFE_componentWillMount == "function" && e.UNSAFE_componentWillMount()), typeof e.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof e.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = a, t.memoizedState = h), e.props = a, e.state = h, e.context = f, a = i) : (typeof e.componentDidMount == "function" && (t.flags |= 4194308), a = !1);
    } else {
      e = t.stateNode, Yf(l, t), f = t.memoizedProps, o = Gu(u, f), e.props = o, z = t.pendingProps, S = e.context, h = u.contextType, i = Pu, typeof h == "object" && h !== null && (i = Hl(h)), c = u.getDerivedStateFromProps, (h = typeof c == "function" || typeof e.getSnapshotBeforeUpdate == "function") || typeof e.UNSAFE_componentWillReceiveProps != "function" && typeof e.componentWillReceiveProps != "function" || (f !== z || S !== i) && c1(t, e, a, i), uu = !1, S = t.memoizedState, e.state = S, Wa(t, a, e, n), ra();
      var s = t.memoizedState;
      f !== z || S !== s || uu || l !== null && l.dependencies !== null && Vn(l.dependencies) ? (typeof c == "function" && (lc(t, u, c, a), s = t.memoizedState), (o = uu || f1(t, u, o, a, S, s, i) || l !== null && l.dependencies !== null && Vn(l.dependencies)) ? (h || typeof e.UNSAFE_componentWillUpdate != "function" && typeof e.componentWillUpdate != "function" || (typeof e.componentWillUpdate == "function" && e.componentWillUpdate(a, s, i), typeof e.UNSAFE_componentWillUpdate == "function" && e.UNSAFE_componentWillUpdate(a, s, i)), typeof e.componentDidUpdate == "function" && (t.flags |= 4), typeof e.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof e.componentDidUpdate != "function" || f === l.memoizedProps && S === l.memoizedState || (t.flags |= 4), typeof e.getSnapshotBeforeUpdate != "function" || f === l.memoizedProps && S === l.memoizedState || (t.flags |= 1024), t.memoizedProps = a, t.memoizedState = s), e.props = a, e.state = s, e.context = i, a = o) : (typeof e.componentDidUpdate != "function" || f === l.memoizedProps && S === l.memoizedState || (t.flags |= 4), typeof e.getSnapshotBeforeUpdate != "function" || f === l.memoizedProps && S === l.memoizedState || (t.flags |= 1024), a = !1);
    }
    return e = a, fe(l, t), a = (t.flags & 128) !== 0, e || a ? (e = t.stateNode, u = a && typeof u.getDerivedStateFromError != "function" ? null : e.render(), t.flags |= 1, l !== null && a ? (t.child = pu(t, l.child, null, n), t.child = pu(t, null, u, n)) : Nl(l, t, u, n), t.memoizedState = e.state, l = t.child) : l = Gt(l, t, n), l;
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
    if ((f = e) || (f = l !== null && l.memoizedState === null ? !1 : (Sl.current & 2) !== 0), f && (n = !0, t.flags &= -129), f = (t.flags & 32) !== 0, t.flags &= -33, l === null) {
      if (J) {
        if (n ? au(t) : nu(t), (l = fl) ? (l = Ny(l, mt), l = l !== null && l.data !== "&" ? l : null, l !== null && (t.memoizedState = {
          dehydrated: l,
          treeContext: It !== null ? {
            id: Ot,
            overflow: Mt
          } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, u = u0(l), u.return = t, t.child = u, Ul = t, fl = null)) : l = null, l === null) throw lu(t);
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
      }, n), c = Du(c, n, u, null), c.flags |= 2, a.return = t, c.return = t, a.sibling = c, t.child = a, pu(t, l.child, null, u), a = t.child, a.memoizedState = fc(u), a.childLanes = cc(l, f, u), t.memoizedState = ec, t = Ia(null, a));
      else if (au(t), Lc(c)) {
        if (f = c.nextSibling && c.nextSibling.dataset, f) var h = f.dgst;
        f = h, a = Error(g(419)), a.stack = "", a.digest = f, Za({
          value: a,
          source: null,
          stack: null
        }), t = yc(l, t, u);
      } else if (zl || aa(l, t, u, !1), f = (u & l.childLanes) !== 0, zl || f) {
        if (f = nl, f !== null && (a = ii(f, u), a !== 0 && a !== i.retryLane)) throw i.retryLane = a, Mu(l, a), Kl(f, l, a), ac;
        Vc(c) || ge(), t = yc(l, t, u);
      } else Vc(c) ? (t.flags |= 192, t.child = l.child, t = null) : (l = i.treeContext, fl = St(c.nextSibling), Ul = t, J = !0, Pt = null, mt = !1, l !== null && e0(t, l), t = ic(t, a.children), t.flags |= 4096);
      return t;
    }
    return n ? (nu(t), c = a.fallback, n = t.mode, i = l.child, h = i.sibling, a = Yt(i, {
      mode: "hidden",
      children: a.children
    }), a.subtreeFlags = i.subtreeFlags & 65011712, h !== null ? c = Yt(h, c) : (c = Du(c, n, u, null), c.flags |= 2), c.return = t, a.return = t, a.sibling = c, t.child = a, Ia(null, a), a = t.child, c = l.child.memoizedState, c === null ? c = fc(u) : (n = c.cachePool, n !== null ? (i = ol._currentValue, n = n.parent !== i ? {
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
    return pu(t, l.child, null, u), l = ic(t, t.pendingProps.children), l.flags |= 2, t.memoizedState = null, l;
  }
  function E1(l, t, u) {
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
  function A1(l, t, u) {
    var a = t.pendingProps, n = a.revealOrder, e = a.tail;
    a = a.children;
    var f = Sl.current, c = (f & 2) !== 0;
    if (c ? (f = f & 1 | 2, t.flags |= 128) : f &= 1, O(Sl, f), Nl(l, t, a, u), a = J ? Qa : 0, !c && l !== null && (l.flags & 128) !== 0) l: for (l = t.child; l !== null; ) {
      if (l.tag === 13) l.memoizedState !== null && E1(l, u, t);
      else if (l.tag === 19) E1(l, u, t);
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
    if (l !== null && t.child !== l.child) throw Error(g(153));
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
        pl(t, t.stateNode.containerInfo), tu(t, ol, l.memoizedState.cache), Uu();
        break;
      case 27:
      case 5:
        Oa(t);
        break;
      case 4:
        pl(t, t.stateNode.containerInfo);
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
          if (a) return A1(l, t, u);
          t.flags |= 128;
        }
        if (n = t.memoizedState, n !== null && (n.rendering = null, n.tail = null, n.lastEffect = null), O(Sl, Sl.current), a) break;
        return null;
      case 22:
        return t.lanes = 0, S1(l, t, u, t.pendingProps);
      case 24:
        tu(t, ol, l.memoizedState.cache);
    }
    return Gt(l, t, u);
  }
  function _1(l, t, u) {
    if (l !== null) if (l.memoizedProps !== t.pendingProps) zl = !0;
    else {
      if (!mc(l, u) && (t.flags & 128) === 0) return zl = !1, Sm(l, t, u);
      zl = (l.flags & 131072) !== 0;
    }
    else zl = !1, J && (t.flags & 1048576) !== 0 && n0(t, Qa, t.index);
    switch (t.lanes = 0, t.tag) {
      case 16:
        l: {
          var a = t.pendingProps;
          if (l = Yu(t.elementType), t.type = l, typeof l == "function") gf(l) ? (a = Gu(l, a), t.tag = 1, t = b1(null, t, l, a, u)) : (t.tag = 0, t = nc(null, t, l, a, u));
          else {
            if (l != null) {
              var n = l.$$typeof;
              if (n === ot) {
                t.tag = 11, t = m1(null, t, l, a, u);
                break l;
              } else if (n === x) {
                t.tag = 14, t = d1(null, t, l, a, u);
                break l;
              }
            }
            throw t = bt(l) || l, Error(g(306, t, ""));
          }
        }
        return t;
      case 0:
        return nc(l, t, t.type, t.pendingProps, u);
      case 1:
        return a = t.type, n = Gu(a, t.pendingProps), b1(l, t, a, n, u);
      case 3:
        l: {
          if (pl(t, t.stateNode.containerInfo), l === null) throw Error(g(387));
          a = t.pendingProps;
          var e = t.memoizedState;
          n = e.element, Yf(l, t), Wa(t, a, null, u);
          var f = t.memoizedState;
          if (a = f.cache, tu(t, ol, a), a !== e.cache && Mf(t, [ol], u, !0), ra(), a = f.element, e.isDehydrated) if (e = {
            element: a,
            isDehydrated: !1,
            cache: f.cache
          }, t.updateQueue.baseState = e, t.memoizedState = e, t.flags & 256) {
            t = z1(l, t, a, u);
            break l;
          } else if (a !== n) {
            n = it(Error(g(424)), t), Za(n), t = z1(l, t, a, u);
            break l;
          } else
            for (l = t.stateNode.containerInfo, l.nodeType === 9 ? l = l.body : l = l.nodeName === "HTML" ? l.ownerDocument.body : l, fl = St(l.firstChild), Ul = t, J = !0, Pt = null, mt = !0, u = o0(t, null, a, u), t.child = u; u; ) u.flags = u.flags & -3 | 4096, u = u.sibling;
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
        return fe(l, t), l === null ? (u = Cy(t.type, null, t.pendingProps, null)) ? t.memoizedState = u : J || (u = t.type, l = t.pendingProps, a = _e(Q.current).createElement(u), a[Dl] = t, a[Gl] = l, ql(a, u, l), _l(a), t.stateNode = a) : t.memoizedState = Cy(t.type, l.memoizedProps, t.pendingProps, l.memoizedState), null;
      case 27:
        return Oa(t), l === null && J && (a = t.stateNode = By(t.type, t.pendingProps, Q.current), Ul = t, mt = !0, n = fl, du(t.type) ? (Kc = n, fl = St(a.firstChild)) : fl = n), Nl(l, t, t.pendingProps.children, u), fe(l, t), l === null && (t.flags |= 4194304), t.child;
      case 5:
        return l === null && J && ((n = a = fl) && (a = Lm(a, t.type, t.pendingProps, mt), a !== null ? (t.stateNode = a, Ul = t, fl = St(a.firstChild), mt = !1, n = !0) : n = !1), n || lu(t)), Oa(t), n = t.type, e = t.pendingProps, f = l !== null ? l.memoizedProps : null, a = e.children, Xc(n, e) ? a = null : f !== null && Xc(n, f) && (t.flags |= 32), t.memoizedState !== null && (n = Xf(l, t, um, null, null, u), Sn._currentValue = n), fe(l, t), Nl(l, t, a, u), t.child;
      case 6:
        return l === null && J && ((l = u = fl) && (u = Km(u, t.pendingProps, mt), u !== null ? (t.stateNode = u, Ul = t, fl = null, l = !0) : l = !1), l || lu(t)), null;
      case 13:
        return T1(l, t, u);
      case 4:
        return pl(t, t.stateNode.containerInfo), a = t.pendingProps, l === null ? t.child = pu(t, null, a, u) : Nl(l, t, a, u), t.child;
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
        return A1(l, t, u);
      case 31:
        return hm(l, t, u);
      case 22:
        return S1(l, t, u, t.pendingProps);
      case 24:
        return Nu(t), a = Hl(ol), l === null ? (n = Hf(), n === null && (n = nl, e = Df(), n.pooledCache = e, e.refCount++, e !== null && (n.pooledCacheLanes |= u), n = e), t.memoizedState = {
          parent: a,
          cache: n
        }, qf(t), tu(t, ol, n)) : ((l.lanes & u) !== 0 && (Yf(l, t), Wa(t, null, null, u), ra()), n = l.memoizedState, e = t.memoizedState, n.parent !== a ? (n = {
          parent: a,
          cache: a
        }, t.memoizedState = n, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = n), tu(t, ol, a)) : (a = e.cache, tu(t, ol, a), a !== n.cache && Mf(t, [ol], u, !0))), Nl(l, t, t.pendingProps.children, u), t.child;
      case 29:
        throw t.pendingProps;
    }
    throw Error(g(156, t.tag));
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
    t !== null && (l.flags |= 4), l.flags & 16384 && (t = l.tag !== 22 ? ei() : 536870912, l.lanes |= t, sa |= t);
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
  function cl(l) {
    var t = l.alternate !== null && l.alternate.child === l.child, u = 0, a = 0;
    if (t) for (var n = l.child; n !== null; ) u |= n.lanes | n.childLanes, a |= n.subtreeFlags & 65011712, a |= n.flags & 65011712, n.return = l, n = n.sibling;
    else for (n = l.child; n !== null; ) u |= n.lanes | n.childLanes, a |= n.subtreeFlags, a |= n.flags, n.return = l, n = n.sibling;
    return l.subtreeFlags |= a, l.childLanes = u, t;
  }
  function sm(l, t, u) {
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
        return cl(t), null;
      case 1:
        return cl(t), null;
      case 3:
        return u = t.stateNode, a = null, l !== null && (a = l.memoizedState.cache), t.memoizedState.cache !== a && (t.flags |= 2048), Rt(ol), hl(), u.pendingContext && (u.context = u.pendingContext, u.pendingContext = null), (l === null || l.child === null) && (ua(t) ? Xt(t) : l === null || l.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, Af())), cl(t), null;
      case 26:
        var n = t.type, e = t.memoizedState;
        return l === null ? (Xt(t), e !== null ? (cl(t), O1(t, e)) : (cl(t), dc(t, n, null, a, u))) : e ? e !== l.memoizedState ? (Xt(t), cl(t), O1(t, e)) : (cl(t), t.flags &= -16777217) : (l = l.memoizedProps, l !== a && Xt(t), cl(t), dc(t, n, l, a, u)), null;
      case 27:
        if (bn(t), u = Q.current, n = t.type, l !== null && t.stateNode != null) l.memoizedProps !== a && Xt(t);
        else {
          if (!a) {
            if (t.stateNode === null) throw Error(g(166));
            return cl(t), null;
          }
          l = N.current, ua(t) ? f0(t, l) : (l = By(n, a, u), t.stateNode = l, Xt(t));
        }
        return cl(t), null;
      case 5:
        if (bn(t), n = t.type, l !== null && t.stateNode != null) l.memoizedProps !== a && Xt(t);
        else {
          if (!a) {
            if (t.stateNode === null) throw Error(g(166));
            return cl(t), null;
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
        return cl(t), dc(t, t.type, l === null ? null : l.memoizedProps, t.pendingProps, u), null;
      case 6:
        if (l && t.stateNode != null) l.memoizedProps !== a && Xt(t);
        else {
          if (typeof a != "string" && t.stateNode === null) throw Error(g(166));
          if (l = Q.current, ua(t)) {
            if (l = t.stateNode, u = t.memoizedProps, a = null, n = Ul, n !== null) switch (n.tag) {
              case 27:
              case 5:
                a = n.memoizedProps;
            }
            l[Dl] = t, l = !!(l.nodeValue === u || a !== null && a.suppressHydrationWarning === !0 || Ey(l.nodeValue, u)), l || lu(t, !0);
          } else l = _e(l).createTextNode(a), l[Dl] = t, t.stateNode = l;
        }
        return cl(t), null;
      case 31:
        if (u = t.memoizedState, l === null || l.memoizedState !== null) {
          if (a = ua(t), u !== null) {
            if (l === null) {
              if (!a) throw Error(g(318));
              if (l = t.memoizedState, l = l !== null ? l.dehydrated : null, !l) throw Error(g(557));
              l[Dl] = t;
            } else Uu(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            cl(t), l = !1;
          } else u = Af(), l !== null && l.memoizedState !== null && (l.memoizedState.hydrationErrors = u), l = !0;
          if (!l)
            return t.flags & 256 ? (ut(t), t) : (ut(t), null);
          if ((t.flags & 128) !== 0) throw Error(g(558));
        }
        return cl(t), null;
      case 13:
        if (a = t.memoizedState, l === null || l.memoizedState !== null && l.memoizedState.dehydrated !== null) {
          if (n = ua(t), a !== null && a.dehydrated !== null) {
            if (l === null) {
              if (!n) throw Error(g(318));
              if (n = t.memoizedState, n = n !== null ? n.dehydrated : null, !n) throw Error(g(317));
              n[Dl] = t;
            } else Uu(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            cl(t), n = !1;
          } else n = Af(), l !== null && l.memoizedState !== null && (l.memoizedState.hydrationErrors = n), n = !0;
          if (!n)
            return t.flags & 256 ? (ut(t), t) : (ut(t), null);
        }
        return ut(t), (t.flags & 128) !== 0 ? (t.lanes = u, t) : (u = a !== null, l = l !== null && l.memoizedState !== null, u && (a = t.child, n = null, a.alternate !== null && a.alternate.memoizedState !== null && a.alternate.memoizedState.cachePool !== null && (n = a.alternate.memoizedState.cachePool.pool), e = null, a.memoizedState !== null && a.memoizedState.cachePool !== null && (e = a.memoizedState.cachePool.pool), e !== n && (a.flags |= 2048)), u !== l && u && (t.child.flags |= 8192), ie(t, t.updateQueue), cl(t), null);
      case 4:
        return hl(), l === null && oy(t.stateNode.containerInfo), cl(t), null;
      case 10:
        return Rt(t.type), cl(t), null;
      case 19:
        if (T(Sl), a = t.memoizedState, a === null) return cl(t), null;
        if (n = (t.flags & 128) !== 0, e = a.rendering, e === null) if (n) Pa(a, !1);
        else {
          if (dl !== 0 || l !== null && (l.flags & 128) !== 0) for (l = t.child; l !== null; ) {
            if (e = $n(l), e !== null) {
              for (t.flags |= 128, Pa(a, !1), l = e.updateQueue, t.updateQueue = l, ie(t, l), t.subtreeFlags = 0, l = u, u = t.child; u !== null; ) t0(u, l), u = u.sibling;
              return O(Sl, Sl.current & 1 | 2), J && Bt(t, a.treeForkCount), t.child;
            }
            l = l.sibling;
          }
          a.tail !== null && Fl() > he && (t.flags |= 128, n = !0, Pa(a, !1), t.lanes = 4194304);
        }
        else {
          if (!n) if (l = $n(e), l !== null) {
            if (t.flags |= 128, n = !0, l = l.updateQueue, t.updateQueue = l, ie(t, l), Pa(a, !0), a.tail === null && a.tailMode === "hidden" && !e.alternate && !J) return cl(t), null;
          } else 2 * Fl() - a.renderingStartTime > he && u !== 536870912 && (t.flags |= 128, n = !0, Pa(a, !1), t.lanes = 4194304);
          a.isBackwards ? (e.sibling = t.child, t.child = e) : (l = a.last, l !== null ? l.sibling = e : t.child = e, a.last = e);
        }
        return a.tail !== null ? (l = a.tail, a.rendering = l, a.tail = l.sibling, a.renderingStartTime = Fl(), l.sibling = null, u = Sl.current, O(Sl, n ? u & 1 | 2 : u & 1), J && Bt(t, a.treeForkCount), l) : (cl(t), null);
      case 22:
      case 23:
        return ut(t), Cf(), a = t.memoizedState !== null, l !== null ? l.memoizedState !== null !== a && (t.flags |= 8192) : a && (t.flags |= 8192), a ? (u & 536870912) !== 0 && (t.flags & 128) === 0 && (cl(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : cl(t), u = t.updateQueue, u !== null && ie(t, u.retryQueue), u = null, l !== null && l.memoizedState !== null && l.memoizedState.cachePool !== null && (u = l.memoizedState.cachePool.pool), a = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (a = t.memoizedState.cachePool.pool), a !== u && (t.flags |= 2048), l !== null && T(qu), null;
      case 24:
        return u = null, l !== null && (u = l.memoizedState.cache), t.memoizedState.cache !== u && (t.flags |= 2048), Rt(ol), cl(t), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(g(156, t.tag));
  }
  function gm(l, t) {
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
          if (ut(t), t.alternate === null) throw Error(g(340));
          Uu();
        }
        return l = t.flags, l & 65536 ? (t.flags = l & -65537 | 128, t) : null;
      case 13:
        if (ut(t), l = t.memoizedState, l !== null && l.dehydrated !== null) {
          if (t.alternate === null) throw Error(g(340));
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
        return ut(t), Cf(), l !== null && T(qu), l = t.flags, l & 65536 ? (t.flags = l & -65537 | 128, t) : null;
      case 24:
        return Rt(ol), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function M1(l, t) {
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
        ut(t), Cf(), l !== null && T(qu);
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
              } catch (o) {
                I(n, i, o);
              }
            }
          }
          a = a.next;
        } while (a !== e);
      }
    } catch (o) {
      I(t, t.return, o);
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
      jm(a, l.type, u, t), a[Gl] = t;
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
  function sc(l, t, u) {
    var a = l.tag;
    if (a === 5 || a === 6) l = l.stateNode, t ? (u.nodeType === 9 ? u.body : u.nodeName === "HTML" ? u.ownerDocument.body : u).insertBefore(l, t) : (t = u.nodeType === 9 ? u.body : u.nodeName === "HTML" ? u.ownerDocument.body : u, t.appendChild(l), u = u._reactRootContainer, u != null || t.onclick !== null || (t.onclick = Nt));
    else if (a !== 4 && (a === 27 && du(l.type) && (u = l.stateNode, t = null), l = l.child, l !== null)) for (sc(l, t, u), l = l.sibling; l !== null; ) sc(l, t, u), l = l.sibling;
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
  var Qt = !1, Tl = !1, gc = !1, Y1 = typeof WeakSet == "function" ? WeakSet : Set, Ol = null;
  function om(l, t) {
    if (l = l.containerInfo, jc = qe, l = ri(l), yf(l)) {
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
            for (var s; z !== u || n !== 0 && z.nodeType !== 3 || (c = f + n), z !== e || a !== 0 && z.nodeType !== 3 || (i = f + a), z.nodeType === 3 && (f += z.nodeValue.length), (s = z.firstChild) !== null; )
              S = z, z = s;
            for (; ; ) {
              if (z === l) break t;
              if (S === u && ++h === n && (c = f), S === e && ++o === a && (i = f), (s = z.nextSibling) !== null) break;
              z = S, S = z.parentNode;
            }
            z = s;
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
            } catch (p) {
              I(u, u.return, p);
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
          if ((l & 1024) !== 0) throw Error(g(163));
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
        Vt(l, u), a & 4 && C1(l, u);
        break;
      case 13:
        Vt(l, u), a & 4 && j1(l, u), a & 64 && (l = u.memoizedState, l !== null && (l = l.dehydrated, l !== null && (u = Dm.bind(null, u), Jm(l, u))));
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
    for (u = u.child; u !== null; ) R1(l, t, u), u = u.sibling;
  }
  function R1(l, t, u) {
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
          I(u, t, e);
        }
        else try {
          yl.removeChild(u.stateNode);
        } catch (e) {
          I(u, t, e);
        }
        break;
      case 18:
        yl !== null && (Ql ? (l = yl, Uy(l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l, u.stateNode), _a(l)) : Uy(yl, u.stateNode));
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
  function C1(l, t) {
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
        throw Error(g(435, l.tag));
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
      if (yl === null) throw Error(g(160));
      R1(e, f, n), yl = null, Ql = !1, e = n.alternate, e !== null && (e.return = null), n.return = null;
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
                  throw Error(g(468, a));
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
            ru(n, "");
          } catch (U) {
            I(l, l.return, U);
          }
        }
        a & 4 && l.stateNode != null && (n = l.memoizedProps, hc(l, n, u !== null ? u.memoizedProps : n)), a & 1024 && (gc = !0);
        break;
      case 6:
        if (Zl(t, l), Vl(l), a & 4) {
          if (l.stateNode === null) throw Error(g(162));
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
        gc && (gc = !1, X1(l));
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
                var s = i.stateNode;
                n ? Hy(s, !0) : Hy(i.stateNode, !1);
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
        if (u == null) throw Error(g(160));
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
            sc(l, Sc(l), f);
            break;
          default:
            throw Error(g(161));
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
              if (i !== null) for (n.shared.hiddenCallbacks = null, n = 0; n < i.length; n++) b0(i[n], c);
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
          Lt(n, e, u), u && f & 4 && C1(n, e);
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
  function oc(l, t) {
    var u = null;
    l !== null && l.memoizedState !== null && l.memoizedState.cachePool !== null && (u = l.memoizedState.cachePool.pool), l = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (l = t.memoizedState.cachePool.pool), l !== u && (l != null && l.refCount++, u != null && Va(u));
  }
  function bc(l, t) {
    l = null, t.alternate !== null && (l = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== l && (t.refCount++, l != null && Va(l));
  }
  function Et(l, t, u, a) {
    if (t.subtreeFlags & 10256) for (t = t.child; t !== null; ) Q1(l, t, u, a), t = t.sibling;
  }
  function Q1(l, t, u, a) {
    var n = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        Et(l, t, u, a), n & 2048 && ln(9, t);
        break;
      case 1:
        Et(l, t, u, a);
        break;
      case 3:
        Et(l, t, u, a), n & 2048 && (l = null, t.alternate !== null && (l = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== l && (t.refCount++, l != null && Va(l)));
        break;
      case 12:
        if (n & 2048) {
          Et(l, t, u, a), l = t.stateNode;
          try {
            var e = t.memoizedProps, f = e.id, c = e.onPostCommit;
            typeof c == "function" && c(f, t.alternate === null ? "mount" : "update", l.passiveEffectDuration, -0);
          } catch (i) {
            I(t, t.return, i);
          }
        } else Et(l, t, u, a);
        break;
      case 31:
        Et(l, t, u, a);
        break;
      case 13:
        Et(l, t, u, a);
        break;
      case 23:
        break;
      case 22:
        e = t.stateNode, f = t.alternate, t.memoizedState !== null ? e._visibility & 2 ? Et(l, t, u, a) : un(l, t) : e._visibility & 2 ? Et(l, t, u, a) : (e._visibility |= 2, da(l, t, u, a, (t.subtreeFlags & 10256) !== 0 || !1)), n & 2048 && oc(f, t);
        break;
      case 24:
        Et(l, t, u, a), n & 2048 && bc(t.alternate, t);
        break;
      default:
        Et(l, t, u, a);
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
    if (l.subtreeFlags & an) for (l = l.child; l !== null; ) Z1(l, t, u), l = l.sibling;
  }
  function Z1(l, t, u) {
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
      var t = Hl(ol), u = t.data.get(l);
      return u === void 0 && (u = l(), t.data.set(l, u)), u;
    },
    cacheSignal: function() {
      return Hl(ol).controller.signal;
    }
  }, Tm = typeof WeakMap == "function" ? WeakMap : Map, $ = 0, nl = null, Z = null, L = 0, k = 0, at = null, fu = !1, Sa = !1, zc = !1, Kt = 0, dl = 0, cu = 0, Qu = 0, Tc = 0, nt = 0, sa = 0, en = null, Ll = null, Ec = !1, de = 0, J1 = 0, he = 1 / 0, Se = null, iu = null, El = 0, yu = null, ga = null, Jt = 0, Ac = 0, _c = null, x1 = null, fn = 0, Oc = null;
  function ht() {
    return ($ & 2) !== 0 && L !== 0 ? L & -L : _.T !== null ? qc() : vi();
  }
  function r1() {
    if (nt === 0) if ((L & 536870912) === 0 || J) {
      var l = En;
      En <<= 1, (En & 3932160) === 0 && (En = 262144), nt = l;
    } else nt = 536870912;
    return l = tt.current, l !== null && (l.flags |= 32), nt;
  }
  function Kl(l, t, u) {
    (l === nl && (k === 2 || k === 9) || l.cancelPendingCommit !== null) && (oa(l, 0), vu(l, L, nt, !1)), On(l, u), (($ & 2) === 0 || l !== nl) && (l === nl && (($ & 2) === 0 && (Qu |= u), dl === 4 && vu(l, L, nt, !1)), xt(l));
  }
  function W1(l, t, u) {
    if (($ & 6) !== 0) throw Error(g(327));
    var a = !u && (t & 127) === 0 && (t & l.expiredLanes) === 0 || Da(l, t), n = a ? _m(l, t) : Dc(l, t, !0), e = a;
    do {
      if (n === 0) {
        Sa && !a && vu(l, t, 0, !1);
        break;
      } else {
        if (u = l.current.alternate, e && !Em(u)) {
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
              throw Error(g(345));
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
              throw Error(g(329));
          }
          if ((t & 62914560) === t && (n = de + 300 - Fl(), 10 < n)) {
            if (vu(a, t, nt, !fu), _n(a, 0, !0) !== 0) break l;
            Jt = t, a.timeoutHandle = My(w1.bind(null, a, u, Ll, Se, Ec, t, nt, Qu, sa, fu, e, "Throttled", -0, 0), n);
            break l;
          }
          w1(a, u, Ll, Se, Ec, t, nt, Qu, sa, fu, e, null, -0, 0);
        }
      }
      break;
    } while (!0);
    xt(l);
  }
  function w1(l, t, u, a, n, e, f, c, i, h, o, z, S, s) {
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
      if (U = ad(z, U), U !== null) {
        Jt = e, l.cancelPendingCommit = U(uy.bind(null, l, t, e, u, a, n, f, c, i, o, z, null, S, s)), vu(l, e, f, !h);
        return;
      }
    }
    uy(l, t, e, u, a, n, f, c, i);
  }
  function Em(l) {
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
  function se() {
    return ($ & 6) === 0 ? (cn(0, !1), !1) : !0;
  }
  function Mc() {
    if (Z !== null) {
      if (k === 0) var l = Z.return;
      else l = Z, pt = Hu = null, Vf(l), ca = null, Ka = 0, l = Z;
      for (; l !== null; ) M1(l.alternate, l), l = l.return;
      Z = null;
    }
  }
  function oa(l, t) {
    var u = l.timeoutHandle;
    u !== -1 && (l.timeoutHandle = -1, Qm(u)), u = l.cancelPendingCommit, u !== null && (l.cancelPendingCommit = null, u()), Jt = 0, Mc(), nl = l, Z = u = Yt(l.current, null), L = t, k = 0, at = null, fu = !1, Sa = Da(l, t), zc = !1, sa = nt = Tc = Qu = cu = dl = 0, Ll = en = null, Ec = !1, (t & 8) !== 0 && (t |= t & 32);
    var a = l.entangledLanes;
    if (a !== 0) for (l = l.entanglements, a &= t; 0 < a; ) {
      var n = 31 - Il(a), e = 1 << n;
      t |= l[n], a &= ~e;
    }
    return Kt = t, jn(), u;
  }
  function $1(l, t) {
    C = null, _.H = ka, t === fa || t === Jn ? (t = S0(), k = 3) : t === Nf ? (t = S0(), k = 4) : k = t === ac ? 8 : t !== null && typeof t == "object" && typeof t.then == "function" ? 6 : 1, at = t, Z === null && (dl = 1, ne(l, it(t, l.current)));
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
    return _.A = zm, l;
  }
  function ge() {
    dl = 4, fu || (L & 4194048) !== L && tt.current !== null || (Sa = !0), (cu & 134217727) === 0 && (Qu & 134217727) === 0 || nl === null || vu(nl, L, nt, !1);
  }
  function Dc(l, t, u) {
    var a = $;
    $ |= 2;
    var n = k1(), e = I1();
    (nl !== l || L !== t) && (Se = null, oa(l, t)), t = !1;
    var f = dl;
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
              if (k = 0, at = null, ba(l, c, i, h), u && Sa) {
                f = 0;
                break l;
              }
              break;
            default:
              h = k, k = 0, at = null, ba(l, c, i, h);
          }
        }
        Am(), f = dl;
        break;
      } catch (o) {
        $1(l, o);
      }
    while (!0);
    return t && l.shellSuspendCounter++, pt = Hu = null, $ = a, _.H = n, _.A = e, Z === null && (nl = null, L = 0, jn()), f;
  }
  function Am() {
    for (; Z !== null; ) P1(Z);
  }
  function _m(l, t) {
    var u = $;
    $ |= 2;
    var a = k1(), n = I1();
    nl !== l || L !== t ? (Se = null, he = Fl() + 500, oa(l, t)) : Sa = Da(l, t);
    l: do
      try {
        if (k !== 0 && Z !== null) {
          t = Z;
          var e = at;
          t: switch (k) {
            case 1:
              k = 0, at = null, ba(l, t, e, 1);
              break;
            case 2:
            case 9:
              if (d0(e)) {
                k = 0, at = null, ly(t);
                break;
              }
              t = function() {
                k !== 2 && k !== 9 || nl !== l || (k = 7), xt(l);
              }, e.then(t, t);
              break l;
            case 3:
              k = 7;
              break l;
            case 4:
              k = 5;
              break l;
            case 7:
              d0(e) ? (k = 0, at = null, ly(t)) : (k = 0, at = null, ba(l, t, e, 7));
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
                      h !== null ? (Z = h, oe(h)) : Z = null;
                    }
                    break t;
                  }
              }
              k = 0, at = null, ba(l, t, e, 5);
              break;
            case 6:
              k = 0, at = null, ba(l, t, e, 6);
              break;
            case 8:
              Mc(), dl = 6;
              break l;
            default:
              throw Error(g(462));
          }
        }
        Om();
        break;
      } catch (o) {
        $1(l, o);
      }
    while (!0);
    return pt = Hu = null, _.H = a, _.A = n, $ = u, Z !== null ? 0 : (nl = null, L = 0, jn(), dl);
  }
  function Om() {
    for (; Z !== null && !tv(); ) P1(Z);
  }
  function P1(l) {
    var t = _1(l.alternate, l, Kt);
    l.memoizedProps = l.pendingProps, t === null ? oe(l) : Z = t;
  }
  function ly(l) {
    var t = l, u = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = o1(u, t, t.pendingProps, t.type, void 0, L);
        break;
      case 11:
        t = o1(u, t, t.pendingProps, t.type.render, t.ref, L);
        break;
      case 5:
        Vf(t);
      default:
        M1(u, t), t = Z = t0(t, Kt), t = _1(u, t, Kt);
    }
    l.memoizedProps = l.pendingProps, t === null ? oe(l) : Z = t;
  }
  function ba(l, t, u, a) {
    pt = Hu = null, Vf(t), ca = null, Ka = 0;
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
    t.flags & 32768 ? (J || a === 1 ? l = !0 : Sa || (L & 536870912) !== 0 ? l = !1 : (fu = l = !0, (a === 2 || a === 9 || a === 3 || a === 6) && (a = tt.current, a !== null && a.tag === 13 && (a.flags |= 16384))), ty(t, l)) : oe(t);
  }
  function oe(l) {
    var t = l;
    do {
      if ((t.flags & 32768) !== 0) {
        ty(t, fu);
        return;
      }
      l = t.return;
      var u = sm(t.alternate, t, Kt);
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
    dl = 6, Z = null;
  }
  function uy(l, t, u, a, n, e, f, c, i) {
    l.cancelPendingCommit = null;
    do
      be();
    while (El !== 0);
    if (($ & 6) !== 0) throw Error(g(327));
    if (t !== null) {
      if (t === l.current) throw Error(g(177));
      if (e = t.lanes | t.childLanes, e |= Sf, mv(l, u, e, f, c, i), l === nl && (Z = nl = null, L = 0), ga = t, yu = l, Jt = u, Ac = e, _c = n, x1 = a, (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? (l.callbackNode = null, l.callbackPriority = 0, Hm(zn, function() {
        return cy(), null;
      })) : (l.callbackNode = null, l.callbackPriority = 0), a = (t.flags & 13878) !== 0, (t.subtreeFlags & 13878) !== 0 || a) {
        a = _.T, _.T = null, n = M.p, M.p = 2, f = $, $ |= 4;
        try {
          om(l, t, u);
        } finally {
          $ = f, M.p = n, _.T = a;
        }
      }
      El = 1, ay(), ny(), ey();
    }
  }
  function ay() {
    if (El === 1) {
      El = 0;
      var l = yu, t = ga, u = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || u) {
        u = _.T, _.T = null;
        var a = M.p;
        M.p = 2;
        var n = $;
        $ |= 4;
        try {
          G1(t, l);
          var e = Gc, f = ri(l.containerInfo), c = e.focusedElem, i = e.selectionRange;
          if (f !== c && c && c.ownerDocument && xi(c.ownerDocument.documentElement, c)) {
            if (i !== null && yf(c)) {
              var h = i.start, o = i.end;
              if (o === void 0 && (o = h), "selectionStart" in c) c.selectionStart = h, c.selectionEnd = Math.min(o, c.value.length);
              else {
                var z = c.ownerDocument || document, S = z && z.defaultView || window;
                if (S.getSelection) {
                  var s = S.getSelection(), U = c.textContent.length, p = Math.min(i.start, U), tl = i.end === void 0 ? p : Math.min(i.end, U);
                  !s.extend && p > tl && (f = tl, tl = p, p = f);
                  var m = Ji(c, p), y = Ji(c, tl);
                  if (m && y && (s.rangeCount !== 1 || s.anchorNode !== m.node || s.anchorOffset !== m.offset || s.focusNode !== y.node || s.focusOffset !== y.offset)) {
                    var d = z.createRange();
                    d.setStart(m.node, m.offset), s.removeAllRanges(), p > tl ? (s.addRange(d), s.extend(y.node, y.offset)) : (d.setEnd(y.node, y.offset), s.addRange(d));
                  }
                }
              }
            }
            for (z = [], s = c; s = s.parentNode; ) s.nodeType === 1 && z.push({
              element: s,
              left: s.scrollLeft,
              top: s.scrollTop
            });
            for (typeof c.focus == "function" && c.focus(), c = 0; c < z.length; c++) {
              var b = z[c];
              b.element.scrollLeft = b.left, b.element.scrollTop = b.top;
            }
          }
          qe = !!jc, Gc = jc = null;
        } finally {
          $ = n, M.p = a, _.T = u;
        }
      }
      l.current = t, El = 2;
    }
  }
  function ny() {
    if (El === 2) {
      El = 0;
      var l = yu, t = ga, u = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || u) {
        u = _.T, _.T = null;
        var a = M.p;
        M.p = 2;
        var n = $;
        $ |= 4;
        try {
          B1(l, t.alternate, t);
        } finally {
          $ = n, M.p = a, _.T = u;
        }
      }
      El = 3;
    }
  }
  function ey() {
    if (El === 4 || El === 3) {
      El = 0, uv();
      var l = yu, t = ga, u = Jt, a = x1;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? El = 5 : (El = 0, ga = yu = null, fy(l, l.pendingLanes));
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
  function fy(l, t) {
    (l.pooledCacheLanes &= t) === 0 && (t = l.pooledCache, t != null && (l.pooledCache = null, Va(t)));
  }
  function be() {
    return ay(), ny(), ey(), cy();
  }
  function cy() {
    if (El !== 5) return !1;
    var l = yu, t = Ac;
    Ac = 0;
    var u = Ke(Jt), a = _.T, n = M.p;
    try {
      M.p = 32 > u ? 32 : u, _.T = null, u = _c, _c = null;
      var e = yu, f = Jt;
      if (El = 0, ga = yu = null, Jt = 0, ($ & 6) !== 0) throw Error(g(331));
      var c = $;
      if ($ |= 4, L1(e.current), Q1(e, e.current, f, u), $ = c, cn(0, !1), kl && typeof kl.onPostCommitFiberRoot == "function") try {
        kl.onPostCommitFiberRoot(Ma, e);
      } catch {
      }
      return !0;
    } finally {
      M.p = n, _.T = a, fy(l, t);
    }
  }
  function iy(l, t, u) {
    t = it(u, t), t = uc(l.stateNode, t, 2), l = Cu(l, t, 2), l !== null && (On(l, 2), xt(l));
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
          l = it(u, l), u = y1(2), a = Cu(t, u, 2), a !== null && (v1(u, a, t, l), On(a, 2), xt(a));
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
    a !== null && a.delete(t), l.pingedLanes |= l.suspendedLanes & u, l.warmLanes &= ~u, nl === l && (L & u) === u && (dl === 4 || dl === 3 && (L & 62914560) === L && 300 > Fl() - de ? ($ & 2) === 0 && oa(l, 0) : Tc |= u, sa === L && (sa = 0)), xt(l);
  }
  function yy(l, t) {
    t === 0 && (t = ei()), l = Mu(l, t), l !== null && (On(l, t), xt(l));
  }
  function Dm(l) {
    var t = l.memoizedState, u = 0;
    t !== null && (u = t.retryLane), yy(l, u);
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
        throw Error(g(314));
    }
    a !== null && a.delete(t), yy(l, u);
  }
  function Hm(l, t) {
    return Ze(l, t);
  }
  var ze = null, za = null, Hc = !1, Te = !1, Nc = !1, mu = 0;
  function xt(l) {
    l !== za && l.next === null && (za === null ? ze = za = l : za = za.next = l), Te = !0, Hc || (Hc = !0, qm());
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
          } else e = L, e = _n(a, a === nl ? e : 0, a.cancelPendingCommit !== null || a.timeoutHandle !== -1), (e & 3) === 0 || Da(a, e) || (u = !0, hy(a, e));
          a = a.next;
        }
      while (u);
      Nc = !1;
    }
  }
  function Nm() {
    vy();
  }
  function vy() {
    Te = Hc = !1;
    var l = 0;
    mu !== 0 && Xm() && (l = mu);
    for (var t = Fl(), u = null, a = ze; a !== null; ) {
      var n = a.next, e = my(a, t);
      e === 0 ? (a.next = null, u === null ? ze = n : u.next = n, n === null && (za = u)) : (u = a, (l !== 0 || (e & 3) !== 0) && (Te = !0)), a = n;
    }
    El !== 0 && El !== 5 || cn(l, !1), mu !== 0 && (mu = 0);
  }
  function my(l, t) {
    for (var u = l.suspendedLanes, a = l.pingedLanes, n = l.expirationTimes, e = l.pendingLanes & -62914561; 0 < e; ) {
      var f = 31 - Il(e), c = 1 << f, i = n[f];
      i === -1 ? ((c & u) === 0 || (c & a) !== 0) && (n[f] = vv(c, t)) : i <= t && (l.expiredLanes |= c), e &= ~c;
    }
    if (t = nl, u = L, u = _n(l, l === t ? u : 0, l.cancelPendingCommit !== null || l.timeoutHandle !== -1), a = l.callbackNode, u === 0 || l === t && (k === 2 || k === 9) || l.cancelPendingCommit !== null) return a !== null && a !== null && Ve(a), l.callbackNode = null, l.callbackPriority = 0;
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
    if (El !== 0 && El !== 5) return l.callbackNode = null, l.callbackPriority = 0, null;
    var u = l.callbackNode;
    if (be() && l.callbackNode !== u) return null;
    var a = L;
    return a = _n(l, l === nl ? a : 0, l.cancelPendingCommit !== null || l.timeoutHandle !== -1), a === 0 ? null : (W1(l, a, t), my(l, Fl()), l.callbackNode != null && l.callbackNode === u ? dy.bind(null, l) : null);
  }
  function hy(l, t) {
    if (be()) return null;
    W1(l, t, !0);
  }
  function qm() {
    Zm(function() {
      ($ & 6) !== 0 ? Ze(ui, Nm) : vy();
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
  function sy(l, t) {
    var u = t.ownerDocument.createElement("input");
    return u.name = t.name, u.value = t.value, l.id && u.setAttribute("form", l.id), t.parentNode.insertBefore(u, t), l = new FormData(l), u.parentNode.removeChild(u), l;
  }
  function Ym(l, t, u, a, n) {
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
                var i = f ? sy(n, f) : new FormData(n);
                Ff(u, {
                  pending: !0,
                  data: i,
                  method: n.method,
                  action: e
                }, null, i);
              }
            } else typeof e == "function" && (c.preventDefault(), i = f ? sy(n, f) : new FormData(n), Ff(u, {
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
  zt($i, "onAnimationEnd"), zt(Fi, "onAnimationIteration"), zt(ki, "onAnimationStart"), zt("dblclick", "onDoubleClick"), zt("focusin", "onFocus"), zt("focusout", "onBlur"), zt(rv, "onTransitionRun"), zt(Wv, "onTransitionStart"), zt(wv, "onTransitionCancel"), zt(Ii, "onTransitionEnd"), Ju("onMouseEnter", ["mouseout", "mouseover"]), Ju("onMouseLeave", ["mouseout", "mouseover"]), Ju("onPointerEnter", ["pointerout", "pointerover"]), Ju("onPointerLeave", ["pointerout", "pointerover"]), Eu("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), Eu("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), Eu("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), Eu("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), Eu("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), Eu("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
  var yn = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), Bm = new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(yn));
  function gy(l, t) {
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
            Cn(o);
          }
          n.currentTarget = null, e = i;
        }
        else for (f = 0; f < a.length; f++) {
          if (c = a[f], i = c.instance, h = c.currentTarget, c = c.listener, i !== e && n.isPropagationStopped()) break l;
          e = c, n.currentTarget = h;
          try {
            e(n);
          } catch (o) {
            Cn(o);
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
    u.has(a) || (by(t, l, 2, !1), u.add(a));
  }
  function pc(l, t, u) {
    var a = 0;
    t && (a |= 4), by(u, l, a, t);
  }
  var Ee = "_reactListening" + Math.random().toString(36).slice(2);
  function oy(l) {
    if (!l[Ee]) {
      l[Ee] = !0, hi.forEach(function(u) {
        u !== "selectionchange" && (Bm.has(u) || pc(u, !1, l), pc(u, !0, l));
      });
      var t = l.nodeType === 9 ? l : l.ownerDocument;
      t === null || t[Ee] || (t[Ee] = !0, pc("selectionchange", !1, t));
    }
  }
  function by(l, t, u, a) {
    switch (xy(t)) {
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
    Mi(function() {
      var h = e, o = ke(u), z = [];
      l: {
        var S = Pi.get(l);
        if (S !== void 0) {
          var s = Bn, U = l;
          switch (l) {
            case "keypress":
              if (qn(u) === 0) break l;
            case "keydown":
            case "keyup":
              s = Nv;
              break;
            case "focusin":
              U = "focus", s = af;
              break;
            case "focusout":
              U = "blur", s = af;
              break;
            case "beforeblur":
            case "afterblur":
              s = af;
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
              s = Hi;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              s = Av;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              s = qv;
              break;
            case $i:
            case Fi:
            case ki:
              s = _v;
              break;
            case Ii:
              s = Yv;
              break;
            case "scroll":
            case "scrollend":
              s = Ev;
              break;
            case "wheel":
              s = Bv;
              break;
            case "copy":
            case "cut":
            case "paste":
              s = Ov;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              s = qi;
              break;
            case "toggle":
            case "beforetoggle":
              s = pv;
          }
          var p = (t & 4) !== 0, tl = !p && (l === "scroll" || l === "scrollend"), m = p ? S !== null ? S + "Capture" : null : S;
          p = [];
          for (var y = h, d; y !== null; ) {
            var b = y;
            if (d = b.stateNode, b = b.tag, b !== 5 && b !== 26 && b !== 27 || d === null || m === null || (b = qa(y, m), b != null && p.push(vn(y, b, d))), tl) break;
            y = y.return;
          }
          0 < p.length && (S = new s(S, U, null, u, o), z.push({
            event: S,
            listeners: p
          }));
        }
      }
      if ((t & 7) === 0) {
        l: {
          if (S = l === "mouseover" || l === "pointerover", s = l === "mouseout" || l === "pointerout", S && u !== Fe && (U = u.relatedTarget || u.fromElement) && (Vu(U) || U[Ua])) break l;
          if ((s || S) && (S = o.window === o ? o : (S = o.ownerDocument) ? S.defaultView || S.parentWindow : window, s ? (U = u.relatedTarget || u.toElement, s = h, U = U ? Vu(U) : null, U !== null && (tl = gl(U), p = U.tag, U !== tl || p !== 5 && p !== 27 && p !== 6) && (U = null)) : (s = null, U = h), s !== U)) {
            if (p = Hi, b = "onMouseLeave", m = "onMouseEnter", y = "mouse", (l === "pointerout" || l === "pointerover") && (p = qi, b = "onPointerLeave", m = "onPointerEnter", y = "pointer"), tl = s == null ? S : Na(s), d = U == null ? S : Na(U), S = new p(b, y + "leave", s, u, o), S.target = tl, S.relatedTarget = d, b = null, Vu(o) === h && (p = new p(m, y + "enter", U, u, o), p.target = d, p.relatedTarget = tl, b = p), tl = b, s && U) t: {
              for (p = pm, m = s, y = U, d = 0, b = m; b; b = p(b)) d++;
              b = 0;
              for (var q = y; q; q = p(q)) b++;
              for (; 0 < d - b; ) m = p(m), d--;
              for (; 0 < b - d; ) y = p(y), b--;
              for (; d--; ) {
                if (m === y || y !== null && m === y.alternate) {
                  p = m;
                  break t;
                }
                m = p(m), y = p(y);
              }
              p = null;
            }
            else p = null;
            s !== null && zy(z, S, s, p, !1), U !== null && tl !== null && zy(z, tl, U, p, !0);
          }
        }
        l: {
          if (S = h ? Na(h) : window, s = S.nodeName && S.nodeName.toLowerCase(), s === "select" || s === "input" && S.type === "file") var r = Xi;
          else if (ji(S)) if (Qi) r = Kv;
          else {
            r = Vv;
            var H = Zv;
          }
          else s = S.nodeName, !s || s.toLowerCase() !== "input" || S.type !== "checkbox" && S.type !== "radio" ? h && $e(h.elementType) && (r = Xi) : r = Lv;
          if (r && (r = r(l, h))) {
            Gi(z, r, u, o);
            break l;
          }
          H && H(l, S, h), l === "focusout" && h && S.type === "number" && h.memoizedProps.value != null && we(S, "number", S.value);
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
            mf = !1, Wi(z, u, o);
            break;
          case "selectionchange":
            if (xv) break;
          case "keydown":
          case "keyup":
            Wi(z, u, o);
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
        else $u ? Ri(l, u) && (K = "onCompositionEnd") : l === "keydown" && u.keyCode === 229 && (K = "onCompositionStart");
        K && (Yi && u.locale !== "ko" && ($u || K !== "onCompositionStart" ? K === "onCompositionEnd" && $u && (G = Di()) : (kt = o, lf = "value" in kt ? kt.value : kt.textContent, $u = !0)), H = Ae(h, K), 0 < H.length && (K = new Ni(K, l, null, u, o), z.push({
          event: K,
          listeners: H
        }), G ? K.data = G : (G = Ci(u), G !== null && (K.data = G)))), (G = Cv ? jv(l, u) : Gv(l, u)) && (K = Ae(h, "onBeforeInput"), 0 < K.length && (H = new Ni("onBeforeInput", "beforeinput", null, u, o), z.push({
          event: H,
          listeners: K
        }), H.data = G)), Ym(z, l, h, u, o);
      }
      gy(z, t);
    });
  }
  function vn(l, t, u) {
    return {
      instance: l,
      listener: t,
      currentTarget: u
    };
  }
  function Ae(l, t) {
    for (var u = t + "Capture", a = []; l !== null; ) {
      var n = l, e = n.stateNode;
      if (n = n.tag, n !== 5 && n !== 26 && n !== 27 || e === null || (n = qa(l, u), n != null && a.unshift(vn(l, n, e)), n = qa(l, t), n != null && a.push(vn(l, n, e))), l.tag === 3) return a;
      l = l.return;
    }
    return [];
  }
  function pm(l) {
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
  function Ey(l, t) {
    return t = Ty(t), Ty(l) === t;
  }
  function ll(l, t, u, a, n, e) {
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
          if (typeof a != "object" || !("__html" in a)) throw Error(g(61));
          if (u = a.__html, u != null) {
            if (n.children != null) throw Error(g(60));
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
        (!(2 < u.length) || u[0] !== "o" && u[0] !== "O" || u[1] !== "n" && u[1] !== "N") && (u = zv.get(u) || u, Mn(l, u, a));
    }
  }
  function Cc(l, t, u, a, n, e) {
    switch (u) {
      case "style":
        _i(l, a, e);
        break;
      case "dangerouslySetInnerHTML":
        if (a != null) {
          if (typeof a != "object" || !("__html" in a)) throw Error(g(61));
          if (u = a.__html, u != null) {
            if (n.children != null) throw Error(g(60));
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
              throw Error(g(137, t));
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
              if (o != null) throw Error(g(137, t));
              break;
            default:
              ll(l, t, a, o, u, null);
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
            if (c != null) throw Error(g(91));
            break;
          default:
            ll(l, t, f, c, u, null);
        }
        Ei(l, a, n, e);
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
            throw Error(g(137, t));
          default:
            ll(l, t, h, a, u, null);
        }
        return;
      default:
        if ($e(t)) {
          for (o in u) u.hasOwnProperty(o) && (a = u[o], a !== void 0 && Cc(l, t, o, a, u, void 0));
          return;
        }
    }
    for (c in u) u.hasOwnProperty(c) && (a = u[c], a != null && ll(l, t, c, a, u, null));
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
        for (s in u) {
          var z = u[s];
          if (u.hasOwnProperty(s) && z != null) switch (s) {
            case "checked":
              break;
            case "value":
              break;
            case "defaultValue":
              i = z;
            default:
              a.hasOwnProperty(s) || ll(l, t, s, null, a, z);
          }
        }
        for (var S in a) {
          var s = a[S];
          if (z = u[S], a.hasOwnProperty(S) && (s != null || z != null)) switch (S) {
            case "type":
              e = s;
              break;
            case "name":
              n = s;
              break;
            case "checked":
              h = s;
              break;
            case "defaultChecked":
              o = s;
              break;
            case "value":
              f = s;
              break;
            case "defaultValue":
              c = s;
              break;
            case "children":
            case "dangerouslySetInnerHTML":
              if (s != null) throw Error(g(137, t));
              break;
            default:
              s !== z && ll(l, t, S, s, a, z);
          }
        }
        We(l, f, c, i, h, o, e, n);
        return;
      case "select":
        s = f = c = S = null;
        for (e in u) if (i = u[e], u.hasOwnProperty(e) && i != null) switch (e) {
          case "value":
            break;
          case "multiple":
            s = i;
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
        t = c, u = f, a = s, S != null ? xu(l, !!u, S, !1) : !!a != !!u && (t != null ? xu(l, !!u, t, !0) : xu(l, !!u, u ? [] : "", !1));
        return;
      case "textarea":
        s = S = null;
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
            s = n;
            break;
          case "children":
            break;
          case "dangerouslySetInnerHTML":
            if (n != null) throw Error(g(91));
            break;
          default:
            n !== e && ll(l, t, f, n, a, e);
        }
        Ti(l, S, s);
        return;
      case "option":
        for (var U in u) S = u[U], u.hasOwnProperty(U) && S != null && !a.hasOwnProperty(U) && (U === "selected" ? l.selected = !1 : ll(l, t, U, null, a, S));
        for (i in a) S = a[i], s = u[i], a.hasOwnProperty(i) && S !== s && (S != null || s != null) && (i === "selected" ? l.selected = S && typeof S != "function" && typeof S != "symbol" : ll(l, t, i, S, a, s));
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
        for (var p in u) S = u[p], u.hasOwnProperty(p) && S != null && !a.hasOwnProperty(p) && ll(l, t, p, null, a, S);
        for (h in a) if (S = a[h], s = u[h], a.hasOwnProperty(h) && S !== s && (S != null || s != null)) switch (h) {
          case "children":
          case "dangerouslySetInnerHTML":
            if (S != null) throw Error(g(137, t));
            break;
          default:
            ll(l, t, h, S, a, s);
        }
        return;
      default:
        if ($e(t)) {
          for (var tl in u) S = u[tl], u.hasOwnProperty(tl) && S !== void 0 && !a.hasOwnProperty(tl) && Cc(l, t, tl, void 0, a, S);
          for (o in a) S = a[o], s = u[o], !a.hasOwnProperty(o) || S === s || S === void 0 && s === void 0 || Cc(l, t, o, S, a, s);
          return;
        }
    }
    for (var m in u) S = u[m], u.hasOwnProperty(m) && S != null && !a.hasOwnProperty(m) && ll(l, t, m, null, a, S);
    for (z in a) S = a[z], s = u[z], !a.hasOwnProperty(z) || S === s || S == null && s == null || ll(l, t, z, S, a, s);
  }
  function Ay(l) {
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
        if (e && c && Ay(f)) {
          for (f = 0, c = n.responseEnd, a += 1; a < u.length; a++) {
            var i = u[a], h = i.startTime;
            if (h > c) break;
            var o = i.transferSize, z = i.initiatorType;
            o && Ay(z) && (i = i.responseEnd, f += o * (i < c ? 1 : (c - h) / (i - h)));
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
  function Xm() {
    var l = window.event;
    return l && l.type === "popstate" ? l === Qc ? !1 : (Qc = l, !0) : (Qc = null, !1);
  }
  var My = typeof setTimeout == "function" ? setTimeout : void 0, Qm = typeof clearTimeout == "function" ? clearTimeout : void 0, Dy = typeof Promise == "function" ? Promise : void 0, Zm = typeof queueMicrotask == "function" ? queueMicrotask : typeof Dy < "u" ? function(l) {
    return Dy.resolve(null).then(l).catch(Vm);
  } : My;
  function Vm(l) {
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
  function Lm(l, t, u, a) {
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
  function Km(l, t, u) {
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
        if (l = t.documentElement, !l) throw Error(g(452));
        return l;
      case "head":
        if (l = t.head, !l) throw Error(g(453));
        return l;
      case "body":
        if (l = t.body, !l) throw Error(g(454));
        return l;
      default:
        throw Error(g(451));
    }
  }
  function mn(l) {
    for (var t = l.attributes; t.length; ) l.removeAttributeNode(t[0]);
    xe(l);
  }
  var st = /* @__PURE__ */ new Map(), py = /* @__PURE__ */ new Set();
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
    var l = rt.f(), t = se();
    return l || t;
  }
  function rm(l) {
    var t = Lu(l);
    t !== null && t.tag === 5 && t.type === "form" ? I0(t) : rt.r(l);
  }
  var Ta = typeof document > "u" ? null : document;
  function Ry(l, t, u) {
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
    rt.D(l), Ry("dns-prefetch", l, null);
  }
  function wm(l, t) {
    rt.C(l, t), Ry("preconnect", l, t);
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
          e = Ea(l);
          break;
        case "script":
          e = Aa(l);
      }
      st.has(e) || (l = B({
        rel: "preload",
        href: t === "image" && u && u.imageSrcSet ? void 0 : l,
        as: t
      }, u), st.set(e, l), a.querySelector(n) !== null || t === "style" && a.querySelector(dn(e)) || t === "script" && a.querySelector(hn(e)) || (t = a.createElement("link"), ql(t, "link", l), _l(t), a.head.appendChild(t)));
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
          e = Aa(l);
      }
      if (!st.has(e) && (l = B({
        rel: "modulepreload",
        href: l
      }, t), st.set(e, l), u.querySelector(n) === null)) {
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
      var n = Ku(a).hoistableStyles, e = Ea(l);
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
          }, u), (u = st.get(e)) && Jc(l, u);
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
      var a = Ku(u).hoistableScripts, n = Aa(l), e = a.get(n);
      e || (e = u.querySelector(hn(n)), e || (l = B({
        src: l,
        async: !0
      }, t), (t = st.get(n)) && xc(l, t), e = u.createElement("script"), _l(e), ql(e, "link", l), u.head.appendChild(e)), e = {
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
      var a = Ku(u).hoistableScripts, n = Aa(l), e = a.get(n);
      e || (e = u.querySelector(hn(n)), e || (l = B({
        src: l,
        async: !0,
        type: "module"
      }, t), (t = st.get(n)) && xc(l, t), e = u.createElement("script"), _l(e), ql(e, "link", l), u.head.appendChild(e)), e = {
        type: "script",
        instance: e,
        count: 1,
        state: null
      }, a.set(n, e));
    }
  }
  function Cy(l, t, u, a) {
    var n = (n = Q.current) ? Oe(n) : null;
    if (!n) throw Error(g(446));
    switch (l) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof u.precedence == "string" && typeof u.href == "string" ? (t = Ea(u.href), u = Ku(n).hoistableStyles, a = u.get(t), a || (a = {
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
          l = Ea(u.href);
          var e = Ku(n).hoistableStyles, f = e.get(l);
          if (f || (n = n.ownerDocument || n, f = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: {
              loading: 0,
              preload: null
            }
          }, e.set(l, f), (e = n.querySelector(dn(l))) && !e._p && (f.instance = e, f.state.loading = 5), st.has(l) || (u = {
            rel: "preload",
            as: "style",
            href: u.href,
            crossOrigin: u.crossOrigin,
            integrity: u.integrity,
            media: u.media,
            hrefLang: u.hrefLang,
            referrerPolicy: u.referrerPolicy
          }, st.set(l, u), e || ld(n, l, u, f.state))), t && a === null) throw Error(g(528, ""));
          return f;
        }
        if (t && a !== null) throw Error(g(529, ""));
        return null;
      case "script":
        return t = u.async, u = u.src, typeof u == "string" && t && typeof t != "function" && typeof t != "symbol" ? (t = Aa(u), u = Ku(n).hoistableScripts, a = u.get(t), a || (a = {
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
        throw Error(g(444, l));
    }
  }
  function Ea(l) {
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
  function ld(l, t, u, a) {
    l.querySelector('link[rel="preload"][as="style"][' + t + "]") ? a.loading = 1 : (t = l.createElement("link"), a.preload = t, t.addEventListener("load", function() {
      return a.loading |= 1;
    }), t.addEventListener("error", function() {
      return a.loading |= 2;
    }), ql(t, "link", u), _l(t), l.head.appendChild(t));
  }
  function Aa(l) {
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
        n = Ea(u.href);
        var e = l.querySelector(dn(n));
        if (e) return t.state.loading |= 4, t.instance = e, _l(e), e;
        a = jy(u), (n = st.get(n)) && Jc(a, n), e = (l.ownerDocument || l).createElement("link"), _l(e);
        var f = e;
        return f._p = new Promise(function(c, i) {
          f.onload = c, f.onerror = i;
        }), ql(e, "link", a), t.state.loading |= 4, Me(e, u.precedence, l), t.instance = e;
      case "script":
        return e = Aa(u.src), (n = l.querySelector(hn(e))) ? (t.instance = n, _l(n), n) : (a = u, (n = st.get(e)) && (a = B({}, u), xc(a, n)), l = l.ownerDocument || l, n = l.createElement("script"), _l(n), ql(n, "link", a), l.head.appendChild(n), t.instance = n);
      case "void":
        return null;
      default:
        throw Error(g(443, t.type));
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
  function Zy(l) {
    return !(l.type === "stylesheet" && (l.state.loading & 3) === 0);
  }
  function ud(l, t, u, a) {
    if (u.type === "stylesheet" && (typeof a.media != "string" || matchMedia(a.media).matches !== !1) && (u.state.loading & 4) === 0) {
      if (u.instance === null) {
        var n = Ea(a.href), e = t.querySelector(dn(n));
        if (e) {
          t = e._p, t !== null && typeof t == "object" && typeof t.then == "function" && (l.count++, l = Ue.bind(l), t.then(l, l)), u.state.loading |= 4, u.instance = e, _l(e);
          return;
        }
        e = t.ownerDocument || t, a = jy(a), (n = st.get(n)) && Jc(a, n), e = e.createElement("link"), _l(e);
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
    return l.stylesheets && l.count === 0 && Ne(l, l.stylesheets), 0 < l.count || 0 < l.imgCount ? function(u) {
      var a = setTimeout(function() {
        if (l.stylesheets && Ne(l, l.stylesheets), l.unsuspend) {
          var e = l.unsuspend;
          l.unsuspend = null, e();
        }
      }, 6e4 + t);
      0 < l.imgBytes && rc === 0 && (rc = 62500 * Gm());
      var n = setTimeout(function() {
        if (l.waitingForImages = !1, l.count === 0 && (l.stylesheets && Ne(l, l.stylesheets), l.unsuspend)) {
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
      if (this.stylesheets) Ne(this, this.stylesheets);
      else if (this.unsuspend) {
        var l = this.unsuspend;
        this.unsuspend = null, l();
      }
    }
  }
  var He = null;
  function Ne(l, t) {
    l.stylesheets = null, l.unsuspend !== null && (l.count++, He = /* @__PURE__ */ new Map(), t.forEach(nd, l), He = null, Ue.call(l));
  }
  function nd(l, t) {
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
    $$typeof: Al,
    Provider: null,
    Consumer: null,
    _currentValue: w,
    _currentValue2: w,
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
  function Vy(l, t, u, a, n, e) {
    n = cd(n), a.context === null ? a.context = n : a.pendingContext = n, a = Ru(t), a.payload = { element: u }, e = e === void 0 ? null : e, e !== null && (a.callback = e), u = Cu(l, a, t), u !== null && (Kl(u, l, t), xa(u, l, t));
  }
  function Ly(l, t) {
    if (l = l.memoizedState, l !== null && l.dehydrated !== null) {
      var u = l.retryLane;
      l.retryLane = u !== 0 && u < t ? u : t;
    }
  }
  function Wc(l, t) {
    Ly(l, t), (l = l.alternate) && Ly(l, t);
  }
  function Ky(l) {
    if (l.tag === 13 || l.tag === 31) {
      var t = Mu(l, 67108864);
      t !== null && Kl(t, l, 67108864), Wc(l, 67108864);
    }
  }
  function Jy(l) {
    if (l.tag === 13 || l.tag === 31) {
      var t = ht();
      t = yi(t);
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
      if (n === null) Rc(l, t, a, Ye, u), ry(l, a);
      else if (md(n, l, t, u, a)) a.stopPropagation();
      else if (ry(l, a), t & 4 && -1 < vd.indexOf(l)) {
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
                  xt(e), ($ & 6) === 0 && (he = Fl() + 500, cn(0, !1));
                }
              }
              break;
            case 31:
            case 13:
              c = Mu(e, 2), c !== null && Kl(c, e, 2), se(), Wc(e, 2);
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
      var t = gl(l);
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
        switch (av()) {
          case ui:
            return 2;
          case ai:
            return 8;
          case zn:
          case nv:
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
  var kc = !1, hu = null, Su = null, su = null, sn = /* @__PURE__ */ new Map(), gn = /* @__PURE__ */ new Map(), gu = [], vd = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");
  function ry(l, t) {
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
        su = null;
        break;
      case "pointerover":
      case "pointerout":
        sn.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        gn.delete(t.pointerId);
    }
  }
  function on(l, t, u, a, n, e) {
    return l === null || l.nativeEvent !== e ? (l = {
      blockedOn: t,
      domEventName: u,
      eventSystemFlags: a,
      nativeEvent: e,
      targetContainers: [n]
    }, t !== null && (t = Lu(t), t !== null && Ky(t)), l) : (l.eventSystemFlags |= a, t = l.targetContainers, n !== null && t.indexOf(n) === -1 && t.push(n), l);
  }
  function md(l, t, u, a, n) {
    switch (t) {
      case "focusin":
        return hu = on(hu, l, t, u, a, n), !0;
      case "dragenter":
        return Su = on(Su, l, t, u, a, n), !0;
      case "mouseover":
        return su = on(su, l, t, u, a, n), !0;
      case "pointerover":
        var e = n.pointerId;
        return sn.set(e, on(sn.get(e) || null, l, t, u, a, n)), !0;
      case "gotpointercapture":
        return e = n.pointerId, gn.set(e, on(gn.get(e) || null, l, t, u, a, n)), !0;
    }
    return !1;
  }
  function Wy(l) {
    var t = Vu(l.target);
    if (t !== null) {
      var u = gl(t);
      if (u !== null) {
        if (t = u.tag, t === 13) {
          if (t = Yl(u), t !== null) {
            l.blockedOn = t, mi(l.priority, function() {
              Jy(u);
            });
            return;
          }
        } else if (t === 31) {
          if (t = vl(u), t !== null) {
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
      var u = $c(l.nativeEvent);
      if (u === null) {
        u = l.nativeEvent;
        var a = new u.constructor(u.type, u);
        Fe = a, u.target.dispatchEvent(a), Fe = null;
      } else return t = Lu(u), t !== null && Ky(t), l.blockedOn = u, !1;
      t.shift();
    }
    return !0;
  }
  function wy(l, t, u) {
    Be(l) && u.delete(t);
  }
  function dd() {
    kc = !1, hu !== null && Be(hu) && (hu = null), Su !== null && Be(Su) && (Su = null), su !== null && Be(su) && (su = null), sn.forEach(wy), gn.forEach(wy);
  }
  function pe(l, t) {
    l.blockedOn === t && (l.blockedOn = null, kc || (kc = !0, R.unstable_scheduleCallback(R.unstable_NormalPriority, dd)));
  }
  var Re = null;
  function $y(l) {
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
      return pe(i, l);
    }
    hu !== null && pe(hu, l), Su !== null && pe(Su, l), su !== null && pe(su, l), sn.forEach(t), gn.forEach(t);
    for (var u = 0; u < gu.length; u++) {
      var a = gu[u];
      a.blockedOn === l && (a.blockedOn = null);
    }
    for (; 0 < gu.length && (u = gu[0], u.blockedOn === null); ) Wy(u), u.blockedOn === null && gu.shift();
    if (u = (l.ownerDocument || l).$$reactFormReplay, u != null) for (a = 0; a < u.length; a += 3) {
      var n = u[a], e = u[a + 1], f = n[Gl] || null;
      if (typeof e == "function") f || $y(u);
      else if (f) {
        var c = null;
        if (e && e.hasAttribute("formAction")) {
          if (n = e, f = e[Gl] || null) c = f.formAction;
          else if (Fc(n) !== null) continue;
        } else c = f.action;
        typeof c == "function" ? u[a + 1] = c : (u.splice(a, 3), a -= 3), $y(u);
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
    if (t === null) throw Error(g(409));
    var u = t.current;
    Vy(u, ht(), l, t, null, null);
  }, Pc.prototype.unmount = Ic.prototype.unmount = function() {
    var l = this._internalRoot;
    if (l !== null) {
      this._internalRoot = null;
      var t = l.containerInfo;
      Vy(l.current, 2, null, l, null, null), se(), t[Ua] = null;
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
      for (var u = 0; u < gu.length && t !== 0 && t < gu[u].priority; u++) ;
      gu.splice(u, 0, l), u === 0 && Wy(l);
    }
  };
  var Fy = al.version;
  if (Fy !== "19.2.6") throw Error(g(527, Fy, "19.2.6"));
  M.findDOMNode = function(l) {
    var t = l._reactInternals;
    if (t === void 0)
      throw typeof l.render == "function" ? Error(g(188)) : (l = Object.keys(l).join(","), Error(g(268, l)));
    return l = A(t), l = l !== null ? j(l) : null, l = l === null ? null : l.stateNode, l;
  };
  var Sd = {
    bundleType: 0,
    version: "19.2.6",
    rendererPackageName: "react-dom",
    currentDispatcherRef: _,
    reconcilerVersion: "19.2.6"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Ce = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Ce.isDisabled && Ce.supportsFiber) try {
      Ma = Ce.inject(Sd), kl = Ce;
    } catch {
    }
  }
  E.createRoot = function(l, t) {
    if (!Ml(l)) throw Error(g(299));
    var u = !1, a = "", n = ym, e = vm, f = mm;
    return t != null && (t.unstable_strictMode === !0 && (u = !0), t.identifierPrefix !== void 0 && (a = t.identifierPrefix), t.onUncaughtError !== void 0 && (n = t.onUncaughtError), t.onCaughtError !== void 0 && (e = t.onCaughtError), t.onRecoverableError !== void 0 && (f = t.onRecoverableError)), t = fd(l, 1, !1, null, null, u, a, null, n, e, f, hd), l[Ua] = t.current, oy(l), new Ic(t);
  };
})), Ad = /* @__PURE__ */ Ut(((E, R) => {
  function al() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(al);
      } catch (il) {
        console.error(il);
      }
  }
  al(), R.exports = Ed();
})), _d = /* @__PURE__ */ Ut(((E) => {
  var R = /* @__PURE__ */ Symbol.for("react.transitional.element"), al = /* @__PURE__ */ Symbol.for("react.fragment");
  function il(g, Ml, gl) {
    var Yl = null;
    if (gl !== void 0 && (Yl = "" + gl), Ml.key !== void 0 && (Yl = "" + Ml.key), "key" in Ml) {
      gl = {};
      for (var vl in Ml) vl !== "key" && (gl[vl] = Ml[vl]);
    } else gl = Ml;
    return Ml = gl.ref, {
      $$typeof: R,
      type: g,
      key: Yl,
      ref: Ml !== void 0 ? Ml : null,
      props: gl
    };
  }
  E.jsx = il, E.jsxs = il;
})), Od = /* @__PURE__ */ Ut(((E, R) => {
  R.exports = _d();
})), Md = Ad(), ul = Od(), Dd = [{
  label: "Physical test variability",
  value: "3%",
  note: "From 40%",
  detail: "The estimated change in results between repeated runs of the same staged test condition."
}, {
  label: "Engineering time saved",
  value: "20,000 hr",
  note: "Pilot estimate to date",
  detail: "Estimated time not spent on manual resets, repeated runs, and result cleanup across pilot evaluations."
}];
function ky({ id: E, label: R, children: al }) {
  return /* @__PURE__ */ (0, ul.jsxs)("span", {
    className: "metric-help",
    children: [/* @__PURE__ */ (0, ul.jsx)("button", {
      type: "button",
      "aria-label": `Explain ${R}`,
      "aria-describedby": E,
      children: "i"
    }), /* @__PURE__ */ (0, ul.jsx)("span", {
      className: "metric-tooltip",
      id: E,
      role: "tooltip",
      children: al
    })]
  });
}
function Ud() {
  return /* @__PURE__ */ (0, ul.jsxs)("article", {
    className: "data-sheet",
    "aria-labelledby": "data-sheet-title",
    children: [
      /* @__PURE__ */ (0, ul.jsxs)("header", {
        className: "data-sheet-header",
        children: [/* @__PURE__ */ (0, ul.jsxs)("div", { children: [/* @__PURE__ */ (0, ul.jsx)("p", { children: "Policy evaluation outcomes" }), /* @__PURE__ */ (0, ul.jsx)("h3", {
          id: "data-sheet-title",
          children: "Pilot customer estimates"
        })] }), /* @__PURE__ */ (0, ul.jsx)("span", { children: "Pilot estimates" })]
      }),
      /* @__PURE__ */ (0, ul.jsxs)("div", {
        className: "data-sheet-summary",
        children: [
          /* @__PURE__ */ (0, ul.jsxs)("p", {
            className: "metric-label",
            children: [/* @__PURE__ */ (0, ul.jsx)("span", { children: "Measured impact" }), /* @__PURE__ */ (0, ul.jsx)(ky, {
              id: "evaluation-cycle-help",
              label: "faster evaluation cycles",
              children: "Projection stages the required scene and vision verifies it before every run. With less variation between runs, teams need fewer evaluations to compare policy versions."
            })]
          }),
          /* @__PURE__ */ (0, ul.jsxs)("strong", { children: [/* @__PURE__ */ (0, ul.jsx)("b", { children: "10×" }), /* @__PURE__ */ (0, ul.jsx)("span", { children: "faster evaluation cycles" })] }),
          /* @__PURE__ */ (0, ul.jsx)("span", { children: "Projection stages the same scene. Vision verifies it before each run. Less scene-to-scene noise lets teams compare policies in 30 controlled runs instead of 300 brute-force runs." })
        ]
      }),
      /* @__PURE__ */ (0, ul.jsx)("dl", {
        className: "data-sheet-grid",
        children: Dd.map((E, R) => /* @__PURE__ */ (0, ul.jsxs)("div", { children: [
          /* @__PURE__ */ (0, ul.jsxs)("dt", { children: [/* @__PURE__ */ (0, ul.jsx)("span", { children: E.label }), /* @__PURE__ */ (0, ul.jsx)(ky, {
            id: `metric-help-${R}`,
            label: E.label,
            children: E.detail
          })] }),
          /* @__PURE__ */ (0, ul.jsx)("dd", { children: E.value }),
          /* @__PURE__ */ (0, ul.jsx)("p", { children: E.note })
        ] }, E.label))
      }),
      /* @__PURE__ */ (0, ul.jsxs)("div", {
        className: "data-sheet-footer",
        children: [/* @__PURE__ */ (0, ul.jsx)("span", { children: "Source" }), /* @__PURE__ */ (0, ul.jsx)("strong", { children: "Evaluation estimates from pilot customers" })]
      })
    ]
  });
}
var Iy = document.getElementById("prism-console");
Iy && (0, Md.createRoot)(Iy).render(/* @__PURE__ */ (0, ul.jsx)(Ud, {}));
