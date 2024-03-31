!(function (e, t) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = t())
    : "function" == typeof define && define.amd
    ? define(t)
    : ((e = e || self).Swiper = t());
})(this, function () {
  "use strict";
  var m =
      "undefined" == typeof document
        ? {
            body: {},
            addEventListener: function () {},
            removeEventListener: function () {},
            activeElement: { blur: function () {}, nodeName: "" },
            querySelector: function () {
              return null;
            },
            querySelectorAll: function () {
              return [];
            },
            getElementById: function () {
              return null;
            },
            createEvent: function () {
              return { initEvent: function () {} };
            },
            createElement: function () {
              return {
                children: [],
                childNodes: [],
                style: {},
                setAttribute: function () {},
                getElementsByTagName: function () {
                  return [];
                },
              };
            },
            location: { hash: "" },
          }
        : document,
    J =
      "undefined" == typeof window
        ? {
            document: m,
            navigator: { userAgent: "" },
            location: {},
            history: {},
            CustomEvent: function () {
              return this;
            },
            addEventListener: function () {},
            removeEventListener: function () {},
            getComputedStyle: function () {
              return {
                getPropertyValue: function () {
                  return "";
                },
              };
            },
            Image: function () {},
            Date: function () {},
            screen: {},
            setTimeout: function () {},
            clearTimeout: function () {},
          }
        : window,
    l = function (e) {
      for (var t = 0; t < e.length; t += 1) this[t] = e[t];
      return (this.length = e.length), this;
    };
  function L(e, t) {
    var i = [],
      n = 0;
    if (e && !t && e instanceof l) return e;
    if (e)
      if ("string" == typeof e) {
        var s,
          o,
          a = e.trim();
        if (0 <= a.indexOf("<") && 0 <= a.indexOf(">")) {
          var r = "div";
          for (
            0 === a.indexOf("<li") && (r = "ul"),
              0 === a.indexOf("<tr") && (r = "tbody"),
              (0 !== a.indexOf("<td") && 0 !== a.indexOf("<th")) || (r = "tr"),
              0 === a.indexOf("<tbody") && (r = "table"),
              0 === a.indexOf("<option") && (r = "select"),
              (o = m.createElement(r)).innerHTML = a,
              n = 0;
            n < o.childNodes.length;
            n += 1
          )
            i.push(o.childNodes[n]);
        } else
          for (
            s =
              t || "#" !== e[0] || e.match(/[ .<>:~]/)
                ? (t || m).querySelectorAll(e.trim())
                : [m.getElementById(e.trim().split("#")[1])],
              n = 0;
            n < s.length;
            n += 1
          )
            s[n] && i.push(s[n]);
      } else if (e.nodeType || e === J || e === m) i.push(e);
      else if (0 < e.length && e[0].nodeType)
        for (n = 0; n < e.length; n += 1) i.push(e[n]);
    return new l(i);
  }
  function o(e) {
    for (var t = [], i = 0; i < e.length; i += 1)
      -1 === t.indexOf(e[i]) && t.push(e[i]);
    return t;
  }
  (L.fn = l.prototype), (L.Class = l), (L.Dom7 = l);
  var t = {
    addClass: function (e) {
      if (void 0 === e) return this;
      for (var t = e.split(" "), i = 0; i < t.length; i += 1)
        for (var n = 0; n < this.length; n += 1)
          void 0 !== this[n] &&
            void 0 !== this[n].classList &&
            this[n].classList.add(t[i]);
      return this;
    },
    removeClass: function (e) {
      for (var t = e.split(" "), i = 0; i < t.length; i += 1)
        for (var n = 0; n < this.length; n += 1)
          void 0 !== this[n] &&
            void 0 !== this[n].classList &&
            this[n].classList.remove(t[i]);
      return this;
    },
    hasClass: function (e) {
      return !!this[0] && this[0].classList.contains(e);
    },
    toggleClass: function (e) {
      for (var t = e.split(" "), i = 0; i < t.length; i += 1)
        for (var n = 0; n < this.length; n += 1)
          void 0 !== this[n] &&
            void 0 !== this[n].classList &&
            this[n].classList.toggle(t[i]);
      return this;
    },
    attr: function (e, t) {
      var i = arguments;
      if (1 === arguments.length && "string" == typeof e)
        return this[0] ? this[0].getAttribute(e) : void 0;
      for (var n = 0; n < this.length; n += 1)
        if (2 === i.length) this[n].setAttribute(e, t);
        else
          for (var s in e) (this[n][s] = e[s]), this[n].setAttribute(s, e[s]);
      return this;
    },
    removeAttr: function (e) {
      for (var t = 0; t < this.length; t += 1) this[t].removeAttribute(e);
      return this;
    },
    data: function (e, t) {
      var i;
      if (void 0 !== t) {
        for (var n = 0; n < this.length; n += 1)
          (i = this[n]).dom7ElementDataStorage ||
            (i.dom7ElementDataStorage = {}),
            (i.dom7ElementDataStorage[e] = t);
        return this;
      }
      if ((i = this[0])) {
        if (i.dom7ElementDataStorage && e in i.dom7ElementDataStorage)
          return i.dom7ElementDataStorage[e];
        var s = i.getAttribute("data-" + e);
        return s || void 0;
      }
    },
    transform: function (e) {
      for (var t = 0; t < this.length; t += 1) {
        var i = this[t].style;
        (i.webkitTransform = e), (i.transform = e);
      }
      return this;
    },
    transition: function (e) {
      "string" != typeof e && (e += "ms");
      for (var t = 0; t < this.length; t += 1) {
        var i = this[t].style;
        (i.webkitTransitionDuration = e), (i.transitionDuration = e);
      }
      return this;
    },
    on: function () {
      for (var e, t = [], i = arguments.length; i--; ) t[i] = arguments[i];
      var n = t[0],
        o = t[1],
        a = t[2],
        s = t[3];
      function r(e) {
        var t = e.target;
        if (t) {
          var i = e.target.dom7EventData || [];
          if ((i.indexOf(e) < 0 && i.unshift(e), L(t).is(o))) a.apply(t, i);
          else
            for (var n = L(t).parents(), s = 0; s < n.length; s += 1)
              L(n[s]).is(o) && a.apply(n[s], i);
        }
      }
      function l(e) {
        var t = (e && e.target && e.target.dom7EventData) || [];
        t.indexOf(e) < 0 && t.unshift(e), a.apply(this, t);
      }
      "function" == typeof t[1] &&
        ((n = (e = t)[0]), (a = e[1]), (s = e[2]), (o = void 0)),
        (s = s || !1);
      for (var d, c = n.split(" "), h = 0; h < this.length; h += 1) {
        var p = this[h];
        if (o)
          for (d = 0; d < c.length; d += 1) {
            var u = c[d];
            p.dom7LiveListeners || (p.dom7LiveListeners = {}),
              p.dom7LiveListeners[u] || (p.dom7LiveListeners[u] = []),
              p.dom7LiveListeners[u].push({ listener: a, proxyListener: r }),
              p.addEventListener(u, r, s);
          }
        else
          for (d = 0; d < c.length; d += 1) {
            var f = c[d];
            p.dom7Listeners || (p.dom7Listeners = {}),
              p.dom7Listeners[f] || (p.dom7Listeners[f] = []),
              p.dom7Listeners[f].push({ listener: a, proxyListener: l }),
              p.addEventListener(f, l, s);
          }
      }
      return this;
    },
    off: function () {
      for (var e, t = [], i = arguments.length; i--; ) t[i] = arguments[i];
      var n = t[0],
        s = t[1],
        o = t[2],
        a = t[3];
      "function" == typeof t[1] &&
        ((n = (e = t)[0]), (o = e[1]), (a = e[2]), (s = void 0)),
        (a = a || !1);
      for (var r = n.split(" "), l = 0; l < r.length; l += 1)
        for (var d = r[l], c = 0; c < this.length; c += 1) {
          var h = this[c],
            p = void 0;
          if (
            (!s && h.dom7Listeners
              ? (p = h.dom7Listeners[d])
              : s && h.dom7LiveListeners && (p = h.dom7LiveListeners[d]),
            p && p.length)
          )
            for (var u = p.length - 1; 0 <= u; u -= 1) {
              var f = p[u];
              o && f.listener === o
                ? (h.removeEventListener(d, f.proxyListener, a), p.splice(u, 1))
                : o &&
                  f.listener &&
                  f.listener.dom7proxy &&
                  f.listener.dom7proxy === o
                ? (h.removeEventListener(d, f.proxyListener, a), p.splice(u, 1))
                : o ||
                  (h.removeEventListener(d, f.proxyListener, a),
                  p.splice(u, 1));
            }
        }
      return this;
    },
    trigger: function () {
      for (var e = [], t = arguments.length; t--; ) e[t] = arguments[t];
      for (var i = e[0].split(" "), n = e[1], s = 0; s < i.length; s += 1)
        for (var o = i[s], a = 0; a < this.length; a += 1) {
          var r = this[a],
            l = void 0;
          try {
            l = new J.CustomEvent(o, {
              detail: n,
              bubbles: !0,
              cancelable: !0,
            });
          } catch (e) {
            (l = m.createEvent("Event")).initEvent(o, !0, !0), (l.detail = n);
          }
          (r.dom7EventData = e.filter(function (e, t) {
            return 0 < t;
          })),
            r.dispatchEvent(l),
            (r.dom7EventData = []),
            delete r.dom7EventData;
        }
      return this;
    },
    transitionEnd: function (t) {
      var i,
        n = ["webkitTransitionEnd", "transitionend"],
        s = this;
      function o(e) {
        if (e.target === this)
          for (t.call(this, e), i = 0; i < n.length; i += 1) s.off(n[i], o);
      }
      if (t) for (i = 0; i < n.length; i += 1) s.on(n[i], o);
      return this;
    },
    outerWidth: function (e) {
      if (0 < this.length) {
        if (e) {
          var t = this.styles();
          return (
            this[0].offsetWidth +
            parseFloat(t.getPropertyValue("margin-right")) +
            parseFloat(t.getPropertyValue("margin-left"))
          );
        }
        return this[0].offsetWidth;
      }
      return null;
    },
    outerHeight: function (e) {
      if (0 < this.length) {
        if (e) {
          var t = this.styles();
          return (
            this[0].offsetHeight +
            parseFloat(t.getPropertyValue("margin-top")) +
            parseFloat(t.getPropertyValue("margin-bottom"))
          );
        }
        return this[0].offsetHeight;
      }
      return null;
    },
    offset: function () {
      if (0 < this.length) {
        var e = this[0],
          t = e.getBoundingClientRect(),
          i = m.body,
          n = e.clientTop || i.clientTop || 0,
          s = e.clientLeft || i.clientLeft || 0,
          o = e === J ? J.scrollY : e.scrollTop,
          a = e === J ? J.scrollX : e.scrollLeft;
        return { top: t.top + o - n, left: t.left + a - s };
      }
      return null;
    },
    css: function (e, t) {
      var i;
      if (1 === arguments.length) {
        if ("string" != typeof e) {
          for (i = 0; i < this.length; i += 1)
            for (var n in e) this[i].style[n] = e[n];
          return this;
        }
        if (this[0])
          return J.getComputedStyle(this[0], null).getPropertyValue(e);
      }
      if (2 !== arguments.length || "string" != typeof e) return this;
      for (i = 0; i < this.length; i += 1) this[i].style[e] = t;
      return this;
    },
    each: function (e) {
      if (!e) return this;
      for (var t = 0; t < this.length; t += 1)
        if (!1 === e.call(this[t], t, this[t])) return this;
      return this;
    },
    html: function (e) {
      if (void 0 === e) return this[0] ? this[0].innerHTML : void 0;
      for (var t = 0; t < this.length; t += 1) this[t].innerHTML = e;
      return this;
    },
    text: function (e) {
      if (void 0 === e) return this[0] ? this[0].textContent.trim() : null;
      for (var t = 0; t < this.length; t += 1) this[t].textContent = e;
      return this;
    },
    is: function (e) {
      var t,
        i,
        n = this[0];
      if (!n || void 0 === e) return !1;
      if ("string" == typeof e) {
        if (n.matches) return n.matches(e);
        if (n.webkitMatchesSelector) return n.webkitMatchesSelector(e);
        if (n.msMatchesSelector) return n.msMatchesSelector(e);
        for (t = L(e), i = 0; i < t.length; i += 1) if (t[i] === n) return !0;
        return !1;
      }
      if (e === m) return n === m;
      if (e === J) return n === J;
      if (e.nodeType || e instanceof l) {
        for (t = e.nodeType ? [e] : e, i = 0; i < t.length; i += 1)
          if (t[i] === n) return !0;
        return !1;
      }
      return !1;
    },
    index: function () {
      var e,
        t = this[0];
      if (t) {
        for (e = 0; null !== (t = t.previousSibling); )
          1 === t.nodeType && (e += 1);
        return e;
      }
    },
    eq: function (e) {
      if (void 0 === e) return this;
      var t,
        i = this.length;
      return new l(
        i - 1 < e ? [] : e < 0 ? ((t = i + e) < 0 ? [] : [this[t]]) : [this[e]]
      );
    },
    append: function () {
      for (var e, t = [], i = arguments.length; i--; ) t[i] = arguments[i];
      for (var n = 0; n < t.length; n += 1) {
        e = t[n];
        for (var s = 0; s < this.length; s += 1)
          if ("string" == typeof e) {
            var o = m.createElement("div");
            for (o.innerHTML = e; o.firstChild; )
              this[s].appendChild(o.firstChild);
          } else if (e instanceof l)
            for (var a = 0; a < e.length; a += 1) this[s].appendChild(e[a]);
          else this[s].appendChild(e);
      }
      return this;
    },
    prepend: function (e) {
      var t, i;
      for (t = 0; t < this.length; t += 1)
        if ("string" == typeof e) {
          var n = m.createElement("div");
          for (n.innerHTML = e, i = n.childNodes.length - 1; 0 <= i; i -= 1)
            this[t].insertBefore(n.childNodes[i], this[t].childNodes[0]);
        } else if (e instanceof l)
          for (i = 0; i < e.length; i += 1)
            this[t].insertBefore(e[i], this[t].childNodes[0]);
        else this[t].insertBefore(e, this[t].childNodes[0]);
      return this;
    },
    next: function (e) {
      return 0 < this.length
        ? e
          ? this[0].nextElementSibling && L(this[0].nextElementSibling).is(e)
            ? new l([this[0].nextElementSibling])
            : new l([])
          : this[0].nextElementSibling
          ? new l([this[0].nextElementSibling])
          : new l([])
        : new l([]);
    },
    nextAll: function (e) {
      var t = [],
        i = this[0];
      if (!i) return new l([]);
      for (; i.nextElementSibling; ) {
        var n = i.nextElementSibling;
        e ? L(n).is(e) && t.push(n) : t.push(n), (i = n);
      }
      return new l(t);
    },
    prev: function (e) {
      if (0 < this.length) {
        var t = this[0];
        return e
          ? t.previousElementSibling && L(t.previousElementSibling).is(e)
            ? new l([t.previousElementSibling])
            : new l([])
          : t.previousElementSibling
          ? new l([t.previousElementSibling])
          : new l([]);
      }
      return new l([]);
    },
    prevAll: function (e) {
      var t = [],
        i = this[0];
      if (!i) return new l([]);
      for (; i.previousElementSibling; ) {
        var n = i.previousElementSibling;
        e ? L(n).is(e) && t.push(n) : t.push(n), (i = n);
      }
      return new l(t);
    },
    parent: function (e) {
      for (var t = [], i = 0; i < this.length; i += 1)
        null !== this[i].parentNode &&
          (e
            ? L(this[i].parentNode).is(e) && t.push(this[i].parentNode)
            : t.push(this[i].parentNode));
      return L(o(t));
    },
    parents: function (e) {
      for (var t = [], i = 0; i < this.length; i += 1)
        for (var n = this[i].parentNode; n; )
          e ? L(n).is(e) && t.push(n) : t.push(n), (n = n.parentNode);
      return L(o(t));
    },
    closest: function (e) {
      var t = this;
      return void 0 === e
        ? new l([])
        : (t.is(e) || (t = t.parents(e).eq(0)), t);
    },
    find: function (e) {
      for (var t = [], i = 0; i < this.length; i += 1)
        for (var n = this[i].querySelectorAll(e), s = 0; s < n.length; s += 1)
          t.push(n[s]);
      return new l(t);
    },
    children: function (e) {
      for (var t = [], i = 0; i < this.length; i += 1)
        for (var n = this[i].childNodes, s = 0; s < n.length; s += 1)
          e
            ? 1 === n[s].nodeType && L(n[s]).is(e) && t.push(n[s])
            : 1 === n[s].nodeType && t.push(n[s]);
      return new l(o(t));
    },
    remove: function () {
      for (var e = 0; e < this.length; e += 1)
        this[e].parentNode && this[e].parentNode.removeChild(this[e]);
      return this;
    },
    add: function () {
      for (var e = [], t = arguments.length; t--; ) e[t] = arguments[t];
      var i, n;
      for (i = 0; i < e.length; i += 1) {
        var s = L(e[i]);
        for (n = 0; n < s.length; n += 1)
          (this[this.length] = s[n]), (this.length += 1);
      }
      return this;
    },
    styles: function () {
      return this[0] ? J.getComputedStyle(this[0], null) : {};
    },
  };
  Object.keys(t).forEach(function (e) {
    L.fn[e] = t[e];
  });
  function e(e) {
    void 0 === e && (e = {});
    var t = this;
    (t.params = e),
      (t.eventsListeners = {}),
      t.params &&
        t.params.on &&
        Object.keys(t.params.on).forEach(function (e) {
          t.on(e, t.params.on[e]);
        });
  }
  var i,
    n,
    s,
    a,
    ee = {
      deleteProps: function (e) {
        var t = e;
        Object.keys(t).forEach(function (e) {
          try {
            t[e] = null;
          } catch (e) {}
          try {
            delete t[e];
          } catch (e) {}
        });
      },
      nextTick: function (e, t) {
        return void 0 === t && (t = 0), setTimeout(e, t);
      },
      now: function () {
        return Date.now();
      },
      getTranslate: function (e, t) {
        var i, n, s;
        void 0 === t && (t = "x");
        var o = J.getComputedStyle(e, null);
        return (
          J.WebKitCSSMatrix
            ? (6 < (n = o.transform || o.webkitTransform).split(",").length &&
                (n = n
                  .split(", ")
                  .map(function (e) {
                    return e.replace(",", ".");
                  })
                  .join(", ")),
              (s = new J.WebKitCSSMatrix("none" === n ? "" : n)))
            : (i = (s =
                o.MozTransform ||
                o.OTransform ||
                o.MsTransform ||
                o.msTransform ||
                o.transform ||
                o
                  .getPropertyValue("transform")
                  .replace("translate(", "matrix(1, 0, 0, 1,"))
                .toString()
                .split(",")),
          "x" === t &&
            (n = J.WebKitCSSMatrix
              ? s.m41
              : 16 === i.length
              ? parseFloat(i[12])
              : parseFloat(i[4])),
          "y" === t &&
            (n = J.WebKitCSSMatrix
              ? s.m42
              : 16 === i.length
              ? parseFloat(i[13])
              : parseFloat(i[5])),
          n || 0
        );
      },
      parseUrlQuery: function (e) {
        var t,
          i,
          n,
          s,
          o = {},
          a = e || J.location.href;
        if ("string" == typeof a && a.length)
          for (
            s = (i = (a = -1 < a.indexOf("?") ? a.replace(/\S*\?/, "") : "")
              .split("&")
              .filter(function (e) {
                return "" !== e;
              })).length,
              t = 0;
            t < s;
            t += 1
          )
            (n = i[t].replace(/#\S+/g, "").split("=")),
              (o[decodeURIComponent(n[0])] =
                void 0 === n[1] ? void 0 : decodeURIComponent(n[1]) || "");
        return o;
      },
      isObject: function (e) {
        return (
          "object" == typeof e &&
          null !== e &&
          e.constructor &&
          e.constructor === Object
        );
      },
      extend: function () {
        for (var e = [], t = arguments.length; t--; ) e[t] = arguments[t];
        for (var i = Object(e[0]), n = 1; n < e.length; n += 1) {
          var s = e[n];
          if (null != s)
            for (
              var o = Object.keys(Object(s)), a = 0, r = o.length;
              a < r;
              a += 1
            ) {
              var l = o[a],
                d = Object.getOwnPropertyDescriptor(s, l);
              void 0 !== d &&
                d.enumerable &&
                (ee.isObject(i[l]) && ee.isObject(s[l])
                  ? ee.extend(i[l], s[l])
                  : !ee.isObject(i[l]) && ee.isObject(s[l])
                  ? ((i[l] = {}), ee.extend(i[l], s[l]))
                  : (i[l] = s[l]));
            }
        }
        return i;
      },
    },
    te =
      ((s = m.createElement("div")),
      {
        touch:
          (J.Modernizr && !0 === J.Modernizr.touch) ||
          !!(
            0 < J.navigator.maxTouchPoints ||
            "ontouchstart" in J ||
            (J.DocumentTouch && m instanceof J.DocumentTouch)
          ),
        pointerEvents: !!(
          J.navigator.pointerEnabled ||
          J.PointerEvent ||
          ("maxTouchPoints" in J.navigator && 0 < J.navigator.maxTouchPoints)
        ),
        prefixedPointerEvents: !!J.navigator.msPointerEnabled,
        transition:
          ((n = s.style),
          "transition" in n || "webkitTransition" in n || "MozTransition" in n),
        transforms3d:
          (J.Modernizr && !0 === J.Modernizr.csstransforms3d) ||
          ((i = s.style),
          "webkitPerspective" in i ||
            "MozPerspective" in i ||
            "OPerspective" in i ||
            "MsPerspective" in i ||
            "perspective" in i),
        flexbox: (function () {
          for (
            var e = s.style,
              t =
                "alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient".split(
                  " "
                ),
              i = 0;
            i < t.length;
            i += 1
          )
            if (t[i] in e) return !0;
          return !1;
        })(),
        observer: "MutationObserver" in J || "WebkitMutationObserver" in J,
        passiveListener: (function () {
          var e = !1;
          try {
            var t = Object.defineProperty({}, "passive", {
              get: function () {
                e = !0;
              },
            });
            J.addEventListener("testPassiveListener", null, t);
          } catch (e) {}
          return e;
        })(),
        gestures: "ongesturestart" in J,
      }),
    I = {
      isIE:
        !!J.navigator.userAgent.match(/Trident/g) ||
        !!J.navigator.userAgent.match(/MSIE/g),
      isEdge: !!J.navigator.userAgent.match(/Edge/g),
      isSafari:
        ((a = J.navigator.userAgent.toLowerCase()),
        0 <= a.indexOf("safari") &&
          a.indexOf("chrome") < 0 &&
          a.indexOf("android") < 0),
      isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(
        J.navigator.userAgent
      ),
    },
    r = { components: { configurable: !0 } };
  (e.prototype.on = function (e, t, i) {
    var n = this;
    if ("function" != typeof t) return n;
    var s = i ? "unshift" : "push";
    return (
      e.split(" ").forEach(function (e) {
        n.eventsListeners[e] || (n.eventsListeners[e] = []),
          n.eventsListeners[e][s](t);
      }),
      n
    );
  }),
    (e.prototype.once = function (i, n, e) {
      var s = this;
      if ("function" != typeof n) return s;
      function o() {
        for (var e = [], t = arguments.length; t--; ) e[t] = arguments[t];
        n.apply(s, e), s.off(i, o), o.f7proxy && delete o.f7proxy;
      }
      return (o.f7proxy = n), s.on(i, o, e);
    }),
    (e.prototype.off = function (e, n) {
      var s = this;
      return (
        s.eventsListeners &&
          e.split(" ").forEach(function (i) {
            void 0 === n
              ? (s.eventsListeners[i] = [])
              : s.eventsListeners[i] &&
                s.eventsListeners[i].length &&
                s.eventsListeners[i].forEach(function (e, t) {
                  (e === n || (e.f7proxy && e.f7proxy === n)) &&
                    s.eventsListeners[i].splice(t, 1);
                });
          }),
        s
      );
    }),
    (e.prototype.emit = function () {
      for (var e = [], t = arguments.length; t--; ) e[t] = arguments[t];
      var i,
        n,
        s,
        o = this;
      return (
        o.eventsListeners &&
          ((s =
            "string" == typeof e[0] || Array.isArray(e[0])
              ? ((i = e[0]), (n = e.slice(1, e.length)), o)
              : ((i = e[0].events), (n = e[0].data), e[0].context || o)),
          (Array.isArray(i) ? i : i.split(" ")).forEach(function (e) {
            if (o.eventsListeners && o.eventsListeners[e]) {
              var t = [];
              o.eventsListeners[e].forEach(function (e) {
                t.push(e);
              }),
                t.forEach(function (e) {
                  e.apply(s, n);
                });
            }
          })),
        o
      );
    }),
    (e.prototype.useModulesParams = function (i) {
      var n = this;
      n.modules &&
        Object.keys(n.modules).forEach(function (e) {
          var t = n.modules[e];
          t.params && ee.extend(i, t.params);
        });
    }),
    (e.prototype.useModules = function (n) {
      void 0 === n && (n = {});
      var s = this;
      s.modules &&
        Object.keys(s.modules).forEach(function (e) {
          var i = s.modules[e],
            t = n[e] || {};
          i.instance &&
            Object.keys(i.instance).forEach(function (e) {
              var t = i.instance[e];
              s[e] = "function" == typeof t ? t.bind(s) : t;
            }),
            i.on &&
              s.on &&
              Object.keys(i.on).forEach(function (e) {
                s.on(e, i.on[e]);
              }),
            i.create && i.create.bind(s)(t);
        });
    }),
    (r.components.set = function (e) {
      this.use && this.use(e);
    }),
    (e.installModule = function (t) {
      for (var e = [], i = arguments.length - 1; 0 < i--; )
        e[i] = arguments[i + 1];
      var n = this;
      n.prototype.modules || (n.prototype.modules = {});
      var s =
        t.name || Object.keys(n.prototype.modules).length + "_" + ee.now();
      return (
        (n.prototype.modules[s] = t).proto &&
          Object.keys(t.proto).forEach(function (e) {
            n.prototype[e] = t.proto[e];
          }),
        t.static &&
          Object.keys(t.static).forEach(function (e) {
            n[e] = t.static[e];
          }),
        t.install && t.install.apply(n, e),
        n
      );
    }),
    (e.use = function (e) {
      for (var t = [], i = arguments.length - 1; 0 < i--; )
        t[i] = arguments[i + 1];
      var n = this;
      return Array.isArray(e)
        ? (e.forEach(function (e) {
            return n.installModule(e);
          }),
          n)
        : n.installModule.apply(n, [e].concat(t));
    }),
    Object.defineProperties(e, r);
  var d = {
    updateSize: function () {
      var e,
        t,
        i = this,
        n = i.$el;
      (e = void 0 !== i.params.width ? i.params.width : n[0].clientWidth),
        (t = void 0 !== i.params.height ? i.params.height : n[0].clientHeight),
        (0 === e && i.isHorizontal()) ||
          (0 === t && i.isVertical()) ||
          ((e =
            e -
            parseInt(n.css("padding-left"), 10) -
            parseInt(n.css("padding-right"), 10)),
          (t =
            t -
            parseInt(n.css("padding-top"), 10) -
            parseInt(n.css("padding-bottom"), 10)),
          ee.extend(i, {
            width: e,
            height: t,
            size: i.isHorizontal() ? e : t,
          }));
    },
    updateSlides: function () {
      var e = this,
        t = e.params,
        i = e.$wrapperEl,
        n = e.size,
        s = e.rtlTranslate,
        o = e.wrongRTL,
        a = e.virtual && t.virtual.enabled,
        r = a ? e.virtual.slides.length : e.slides.length,
        l = i.children("." + e.params.slideClass),
        d = a ? e.virtual.slides.length : l.length,
        c = [],
        h = [],
        p = [],
        u = t.slidesOffsetBefore;
      "function" == typeof u && (u = t.slidesOffsetBefore.call(e));
      var f = t.slidesOffsetAfter;
      "function" == typeof f && (f = t.slidesOffsetAfter.call(e));
      var m = e.snapGrid.length,
        g = e.snapGrid.length,
        v = t.spaceBetween,
        w = -u,
        b = 0,
        y = 0;
      if (void 0 !== n) {
        var x, T;
        "string" == typeof v &&
          0 <= v.indexOf("%") &&
          (v = (parseFloat(v.replace("%", "")) / 100) * n),
          (e.virtualSize = -v),
          s
            ? l.css({ marginLeft: "", marginTop: "" })
            : l.css({ marginRight: "", marginBottom: "" }),
          1 < t.slidesPerColumn &&
            ((x =
              Math.floor(d / t.slidesPerColumn) === d / e.params.slidesPerColumn
                ? d
                : Math.ceil(d / t.slidesPerColumn) * t.slidesPerColumn),
            "auto" !== t.slidesPerView &&
              "row" === t.slidesPerColumnFill &&
              (x = Math.max(x, t.slidesPerView * t.slidesPerColumn)));
        for (
          var C,
            z = t.slidesPerColumn,
            S = x / z,
            E = Math.floor(d / t.slidesPerColumn),
            k = 0;
          k < d;
          k += 1
        ) {
          T = 0;
          var M = l.eq(k);
          if (1 < t.slidesPerColumn) {
            var P = void 0,
              $ = void 0,
              L = void 0;
            "column" === t.slidesPerColumnFill
              ? ((L = k - ($ = Math.floor(k / z)) * z),
                (E < $ || ($ === E && L === z - 1)) &&
                  z <= (L += 1) &&
                  ((L = 0), ($ += 1)),
                (P = $ + (L * x) / z),
                M.css({
                  "-webkit-box-ordinal-group": P,
                  "-moz-box-ordinal-group": P,
                  "-ms-flex-order": P,
                  "-webkit-order": P,
                  order: P,
                }))
              : ($ = k - (L = Math.floor(k / S)) * S),
              M.css(
                "margin-" + (e.isHorizontal() ? "top" : "left"),
                0 !== L && t.spaceBetween && t.spaceBetween + "px"
              )
                .attr("data-swiper-column", $)
                .attr("data-swiper-row", L);
          }
          if ("none" !== M.css("display")) {
            if ("auto" === t.slidesPerView) {
              var I = J.getComputedStyle(M[0], null),
                W = M[0].style.transform,
                O = M[0].style.webkitTransform;
              if (
                (W && (M[0].style.transform = "none"),
                O && (M[0].style.webkitTransform = "none"),
                t.roundLengths)
              )
                T = e.isHorizontal() ? M.outerWidth(!0) : M.outerHeight(!0);
              else if (e.isHorizontal()) {
                var _ = parseFloat(I.getPropertyValue("width")),
                  H = parseFloat(I.getPropertyValue("padding-left")),
                  D = parseFloat(I.getPropertyValue("padding-right")),
                  A = parseFloat(I.getPropertyValue("margin-left")),
                  F = parseFloat(I.getPropertyValue("margin-right")),
                  B = I.getPropertyValue("box-sizing");
                T = B && "border-box" === B ? _ + A + F : _ + H + D + A + F;
              } else {
                var N = parseFloat(I.getPropertyValue("height")),
                  R = parseFloat(I.getPropertyValue("padding-top")),
                  Y = parseFloat(I.getPropertyValue("padding-bottom")),
                  V = parseFloat(I.getPropertyValue("margin-top")),
                  X = parseFloat(I.getPropertyValue("margin-bottom")),
                  j = I.getPropertyValue("box-sizing");
                T = j && "border-box" === j ? N + V + X : N + R + Y + V + X;
              }
              W && (M[0].style.transform = W),
                O && (M[0].style.webkitTransform = O),
                t.roundLengths && (T = Math.floor(T));
            } else
              (T = (n - (t.slidesPerView - 1) * v) / t.slidesPerView),
                t.roundLengths && (T = Math.floor(T)),
                l[k] &&
                  (e.isHorizontal()
                    ? (l[k].style.width = T + "px")
                    : (l[k].style.height = T + "px"));
            l[k] && (l[k].swiperSlideSize = T),
              p.push(T),
              t.centeredSlides
                ? ((w = w + T / 2 + b / 2 + v),
                  0 === b && 0 !== k && (w = w - n / 2 - v),
                  0 === k && (w = w - n / 2 - v),
                  Math.abs(w) < 0.001 && (w = 0),
                  t.roundLengths && (w = Math.floor(w)),
                  y % t.slidesPerGroup == 0 && c.push(w),
                  h.push(w))
                : (t.roundLengths && (w = Math.floor(w)),
                  y % t.slidesPerGroup == 0 && c.push(w),
                  h.push(w),
                  (w = w + T + v)),
              (e.virtualSize += T + v),
              (b = T),
              (y += 1);
          }
        }
        if (
          ((e.virtualSize = Math.max(e.virtualSize, n) + f),
          s &&
            o &&
            ("slide" === t.effect || "coverflow" === t.effect) &&
            i.css({ width: e.virtualSize + t.spaceBetween + "px" }),
          (te.flexbox && !t.setWrapperSize) ||
            (e.isHorizontal()
              ? i.css({ width: e.virtualSize + t.spaceBetween + "px" })
              : i.css({ height: e.virtualSize + t.spaceBetween + "px" })),
          1 < t.slidesPerColumn &&
            ((e.virtualSize = (T + t.spaceBetween) * x),
            (e.virtualSize =
              Math.ceil(e.virtualSize / t.slidesPerColumn) - t.spaceBetween),
            e.isHorizontal()
              ? i.css({ width: e.virtualSize + t.spaceBetween + "px" })
              : i.css({ height: e.virtualSize + t.spaceBetween + "px" }),
            t.centeredSlides))
        ) {
          C = [];
          for (var q = 0; q < c.length; q += 1) {
            var G = c[q];
            t.roundLengths && (G = Math.floor(G)),
              c[q] < e.virtualSize + c[0] && C.push(G);
          }
          c = C;
        }
        if (!t.centeredSlides) {
          C = [];
          for (var Z = 0; Z < c.length; Z += 1) {
            var U = c[Z];
            t.roundLengths && (U = Math.floor(U)),
              c[Z] <= e.virtualSize - n && C.push(U);
          }
          (c = C),
            1 < Math.floor(e.virtualSize - n) - Math.floor(c[c.length - 1]) &&
              c.push(e.virtualSize - n);
        }
        if (
          (0 === c.length && (c = [0]),
          0 !== t.spaceBetween &&
            (e.isHorizontal()
              ? s
                ? l.css({ marginLeft: v + "px" })
                : l.css({ marginRight: v + "px" })
              : l.css({ marginBottom: v + "px" })),
          t.centerInsufficientSlides)
        ) {
          var K = 0;
          if (
            (p.forEach(function (e) {
              K += e + (t.spaceBetween ? t.spaceBetween : 0);
            }),
            (K -= t.spaceBetween) < n)
          ) {
            var Q = (n - K) / 2;
            c.forEach(function (e, t) {
              c[t] = e - Q;
            }),
              h.forEach(function (e, t) {
                h[t] = e + Q;
              });
          }
        }
        ee.extend(e, {
          slides: l,
          snapGrid: c,
          slidesGrid: h,
          slidesSizesGrid: p,
        }),
          d !== r && e.emit("slidesLengthChange"),
          c.length !== m &&
            (e.params.watchOverflow && e.checkOverflow(),
            e.emit("snapGridLengthChange")),
          h.length !== g && e.emit("slidesGridLengthChange"),
          (t.watchSlidesProgress || t.watchSlidesVisibility) &&
            e.updateSlidesOffset();
      }
    },
    updateAutoHeight: function (e) {
      var t,
        i = this,
        n = [],
        s = 0;
      if (
        ("number" == typeof e
          ? i.setTransition(e)
          : !0 === e && i.setTransition(i.params.speed),
        "auto" !== i.params.slidesPerView && 1 < i.params.slidesPerView)
      )
        for (t = 0; t < Math.ceil(i.params.slidesPerView); t += 1) {
          var o = i.activeIndex + t;
          if (o > i.slides.length) break;
          n.push(i.slides.eq(o)[0]);
        }
      else n.push(i.slides.eq(i.activeIndex)[0]);
      for (t = 0; t < n.length; t += 1)
        if (void 0 !== n[t]) {
          var a = n[t].offsetHeight;
          s = s < a ? a : s;
        }
      s && i.$wrapperEl.css("height", s + "px");
    },
    updateSlidesOffset: function () {
      for (var e = this.slides, t = 0; t < e.length; t += 1)
        e[t].swiperSlideOffset = this.isHorizontal()
          ? e[t].offsetLeft
          : e[t].offsetTop;
    },
    updateSlidesProgress: function (e) {
      void 0 === e && (e = (this && this.translate) || 0);
      var t = this,
        i = t.params,
        n = t.slides,
        s = t.rtlTranslate;
      if (0 !== n.length) {
        void 0 === n[0].swiperSlideOffset && t.updateSlidesOffset();
        var o = -e;
        s && (o = e),
          n.removeClass(i.slideVisibleClass),
          (t.visibleSlidesIndexes = []),
          (t.visibleSlides = []);
        for (var a = 0; a < n.length; a += 1) {
          var r = n[a],
            l =
              (o +
                (i.centeredSlides ? t.minTranslate() : 0) -
                r.swiperSlideOffset) /
              (r.swiperSlideSize + i.spaceBetween);
          if (i.watchSlidesVisibility) {
            var d = -(o - r.swiperSlideOffset),
              c = d + t.slidesSizesGrid[a];
            ((0 <= d && d < t.size) ||
              (0 < c && c <= t.size) ||
              (d <= 0 && c >= t.size)) &&
              (t.visibleSlides.push(r),
              t.visibleSlidesIndexes.push(a),
              n.eq(a).addClass(i.slideVisibleClass));
          }
          r.progress = s ? -l : l;
        }
        t.visibleSlides = L(t.visibleSlides);
      }
    },
    updateProgress: function (e) {
      void 0 === e && (e = (this && this.translate) || 0);
      var t = this,
        i = t.params,
        n = t.maxTranslate() - t.minTranslate(),
        s = t.progress,
        o = t.isBeginning,
        a = t.isEnd,
        r = o,
        l = a;
      (a =
        0 == n
          ? (o = !(s = 0))
          : ((o = (s = (e - t.minTranslate()) / n) <= 0), 1 <= s)),
        ee.extend(t, { progress: s, isBeginning: o, isEnd: a }),
        (i.watchSlidesProgress || i.watchSlidesVisibility) &&
          t.updateSlidesProgress(e),
        o && !r && t.emit("reachBeginning toEdge"),
        a && !l && t.emit("reachEnd toEdge"),
        ((r && !o) || (l && !a)) && t.emit("fromEdge"),
        t.emit("progress", s);
    },
    updateSlidesClasses: function () {
      var e,
        t = this,
        i = t.slides,
        n = t.params,
        s = t.$wrapperEl,
        o = t.activeIndex,
        a = t.realIndex,
        r = t.virtual && n.virtual.enabled;
      i.removeClass(
        n.slideActiveClass +
          " " +
          n.slideNextClass +
          " " +
          n.slidePrevClass +
          " " +
          n.slideDuplicateActiveClass +
          " " +
          n.slideDuplicateNextClass +
          " " +
          n.slideDuplicatePrevClass
      ),
        (e = r
          ? t.$wrapperEl.find(
              "." + n.slideClass + '[data-swiper-slide-index="' + o + '"]'
            )
          : i.eq(o)).addClass(n.slideActiveClass),
        n.loop &&
          (e.hasClass(n.slideDuplicateClass)
            ? s
                .children(
                  "." +
                    n.slideClass +
                    ":not(." +
                    n.slideDuplicateClass +
                    ')[data-swiper-slide-index="' +
                    a +
                    '"]'
                )
                .addClass(n.slideDuplicateActiveClass)
            : s
                .children(
                  "." +
                    n.slideClass +
                    "." +
                    n.slideDuplicateClass +
                    '[data-swiper-slide-index="' +
                    a +
                    '"]'
                )
                .addClass(n.slideDuplicateActiveClass));
      var l = e
        .nextAll("." + n.slideClass)
        .eq(0)
        .addClass(n.slideNextClass);
      n.loop && 0 === l.length && (l = i.eq(0)).addClass(n.slideNextClass);
      var d = e
        .prevAll("." + n.slideClass)
        .eq(0)
        .addClass(n.slidePrevClass);
      n.loop && 0 === d.length && (d = i.eq(-1)).addClass(n.slidePrevClass),
        n.loop &&
          (l.hasClass(n.slideDuplicateClass)
            ? s
                .children(
                  "." +
                    n.slideClass +
                    ":not(." +
                    n.slideDuplicateClass +
                    ')[data-swiper-slide-index="' +
                    l.attr("data-swiper-slide-index") +
                    '"]'
                )
                .addClass(n.slideDuplicateNextClass)
            : s
                .children(
                  "." +
                    n.slideClass +
                    "." +
                    n.slideDuplicateClass +
                    '[data-swiper-slide-index="' +
                    l.attr("data-swiper-slide-index") +
                    '"]'
                )
                .addClass(n.slideDuplicateNextClass),
          d.hasClass(n.slideDuplicateClass)
            ? s
                .children(
                  "." +
                    n.slideClass +
                    ":not(." +
                    n.slideDuplicateClass +
                    ')[data-swiper-slide-index="' +
                    d.attr("data-swiper-slide-index") +
                    '"]'
                )
                .addClass(n.slideDuplicatePrevClass)
            : s
                .children(
                  "." +
                    n.slideClass +
                    "." +
                    n.slideDuplicateClass +
                    '[data-swiper-slide-index="' +
                    d.attr("data-swiper-slide-index") +
                    '"]'
                )
                .addClass(n.slideDuplicatePrevClass));
    },
    updateActiveIndex: function (e) {
      var t,
        i = this,
        n = i.rtlTranslate ? i.translate : -i.translate,
        s = i.slidesGrid,
        o = i.snapGrid,
        a = i.params,
        r = i.activeIndex,
        l = i.realIndex,
        d = i.snapIndex,
        c = e;
      if (void 0 === c) {
        for (var h = 0; h < s.length; h += 1)
          void 0 !== s[h + 1]
            ? n >= s[h] && n < s[h + 1] - (s[h + 1] - s[h]) / 2
              ? (c = h)
              : n >= s[h] && n < s[h + 1] && (c = h + 1)
            : n >= s[h] && (c = h);
        a.normalizeSlideIndex && (c < 0 || void 0 === c) && (c = 0);
      }
      if (
        ((t =
          0 <= o.indexOf(n)
            ? o.indexOf(n)
            : Math.floor(c / a.slidesPerGroup)) >= o.length &&
          (t = o.length - 1),
        c !== r)
      ) {
        var p = parseInt(
          i.slides.eq(c).attr("data-swiper-slide-index") || c,
          10
        );
        ee.extend(i, {
          snapIndex: t,
          realIndex: p,
          previousIndex: r,
          activeIndex: c,
        }),
          i.emit("activeIndexChange"),
          i.emit("snapIndexChange"),
          l !== p && i.emit("realIndexChange"),
          i.emit("slideChange");
      } else t !== d && ((i.snapIndex = t), i.emit("snapIndexChange"));
    },
    updateClickedSlide: function (e) {
      var t = this,
        i = t.params,
        n = L(e.target).closest("." + i.slideClass)[0],
        s = !1;
      if (n)
        for (var o = 0; o < t.slides.length; o += 1)
          t.slides[o] === n && (s = !0);
      if (!n || !s)
        return (t.clickedSlide = void 0), void (t.clickedIndex = void 0);
      (t.clickedSlide = n),
        t.virtual && t.params.virtual.enabled
          ? (t.clickedIndex = parseInt(
              L(n).attr("data-swiper-slide-index"),
              10
            ))
          : (t.clickedIndex = L(n).index()),
        i.slideToClickedSlide &&
          void 0 !== t.clickedIndex &&
          t.clickedIndex !== t.activeIndex &&
          t.slideToClickedSlide();
    },
  };
  var c = {
    getTranslate: function (e) {
      void 0 === e && (e = this.isHorizontal() ? "x" : "y");
      var t = this.params,
        i = this.rtlTranslate,
        n = this.translate,
        s = this.$wrapperEl;
      if (t.virtualTranslate) return i ? -n : n;
      var o = ee.getTranslate(s[0], e);
      return i && (o = -o), o || 0;
    },
    setTranslate: function (e, t) {
      var i = this,
        n = i.rtlTranslate,
        s = i.params,
        o = i.$wrapperEl,
        a = i.progress,
        r = 0,
        l = 0;
      i.isHorizontal() ? (r = n ? -e : e) : (l = e),
        s.roundLengths && ((r = Math.floor(r)), (l = Math.floor(l))),
        s.virtualTranslate ||
          (te.transforms3d
            ? o.transform("translate3d(" + r + "px, " + l + "px, 0px)")
            : o.transform("translate(" + r + "px, " + l + "px)")),
        (i.previousTranslate = i.translate),
        (i.translate = i.isHorizontal() ? r : l);
      var d = i.maxTranslate() - i.minTranslate();
      (0 == d ? 0 : (e - i.minTranslate()) / d) !== a && i.updateProgress(e),
        i.emit("setTranslate", i.translate, t);
    },
    minTranslate: function () {
      return -this.snapGrid[0];
    },
    maxTranslate: function () {
      return -this.snapGrid[this.snapGrid.length - 1];
    },
  };
  var h = {
    setTransition: function (e, t) {
      this.$wrapperEl.transition(e), this.emit("setTransition", e, t);
    },
    transitionStart: function (e, t) {
      void 0 === e && (e = !0);
      var i = this,
        n = i.activeIndex,
        s = i.params,
        o = i.previousIndex;
      s.autoHeight && i.updateAutoHeight();
      var a = t;
      if (
        ((a = a || (o < n ? "next" : n < o ? "prev" : "reset")),
        i.emit("transitionStart"),
        e && n !== o)
      ) {
        if ("reset" === a) return void i.emit("slideResetTransitionStart");
        i.emit("slideChangeTransitionStart"),
          "next" === a
            ? i.emit("slideNextTransitionStart")
            : i.emit("slidePrevTransitionStart");
      }
    },
    transitionEnd: function (e, t) {
      void 0 === e && (e = !0);
      var i = this,
        n = i.activeIndex,
        s = i.previousIndex;
      (i.animating = !1), i.setTransition(0);
      var o = t;
      if (
        ((o = o || (s < n ? "next" : n < s ? "prev" : "reset")),
        i.emit("transitionEnd"),
        e && n !== s)
      ) {
        if ("reset" === o) return void i.emit("slideResetTransitionEnd");
        i.emit("slideChangeTransitionEnd"),
          "next" === o
            ? i.emit("slideNextTransitionEnd")
            : i.emit("slidePrevTransitionEnd");
      }
    },
  };
  var p = {
    slideTo: function (e, t, i, n) {
      void 0 === e && (e = 0),
        void 0 === t && (t = this.params.speed),
        void 0 === i && (i = !0);
      var s = this,
        o = e;
      o < 0 && (o = 0);
      var a = s.params,
        r = s.snapGrid,
        l = s.slidesGrid,
        d = s.previousIndex,
        c = s.activeIndex,
        h = s.rtlTranslate;
      if (s.animating && a.preventInteractionOnTransition) return !1;
      var p = Math.floor(o / a.slidesPerGroup);
      p >= r.length && (p = r.length - 1),
        (c || a.initialSlide || 0) === (d || 0) &&
          i &&
          s.emit("beforeSlideChangeStart");
      var u,
        f = -r[p];
      if ((s.updateProgress(f), a.normalizeSlideIndex))
        for (var m = 0; m < l.length; m += 1)
          -Math.floor(100 * f) >= Math.floor(100 * l[m]) && (o = m);
      if (s.initialized && o !== c) {
        if (!s.allowSlideNext && f < s.translate && f < s.minTranslate())
          return !1;
        if (
          !s.allowSlidePrev &&
          f > s.translate &&
          f > s.maxTranslate() &&
          (c || 0) !== o
        )
          return !1;
      }
      return (
        (u = c < o ? "next" : o < c ? "prev" : "reset"),
        (h && -f === s.translate) || (!h && f === s.translate)
          ? (s.updateActiveIndex(o),
            a.autoHeight && s.updateAutoHeight(),
            s.updateSlidesClasses(),
            "slide" !== a.effect && s.setTranslate(f),
            "reset" !== u && (s.transitionStart(i, u), s.transitionEnd(i, u)),
            !1)
          : (0 !== t && te.transition
              ? (s.setTransition(t),
                s.setTranslate(f),
                s.updateActiveIndex(o),
                s.updateSlidesClasses(),
                s.emit("beforeTransitionStart", t, n),
                s.transitionStart(i, u),
                s.animating ||
                  ((s.animating = !0),
                  s.onSlideToWrapperTransitionEnd ||
                    (s.onSlideToWrapperTransitionEnd = function (e) {
                      s &&
                        !s.destroyed &&
                        e.target === this &&
                        (s.$wrapperEl[0].removeEventListener(
                          "transitionend",
                          s.onSlideToWrapperTransitionEnd
                        ),
                        s.$wrapperEl[0].removeEventListener(
                          "webkitTransitionEnd",
                          s.onSlideToWrapperTransitionEnd
                        ),
                        (s.onSlideToWrapperTransitionEnd = null),
                        delete s.onSlideToWrapperTransitionEnd,
                        s.transitionEnd(i, u));
                    }),
                  s.$wrapperEl[0].addEventListener(
                    "transitionend",
                    s.onSlideToWrapperTransitionEnd
                  ),
                  s.$wrapperEl[0].addEventListener(
                    "webkitTransitionEnd",
                    s.onSlideToWrapperTransitionEnd
                  )))
              : (s.setTransition(0),
                s.setTranslate(f),
                s.updateActiveIndex(o),
                s.updateSlidesClasses(),
                s.emit("beforeTransitionStart", t, n),
                s.transitionStart(i, u),
                s.transitionEnd(i, u)),
            !0)
      );
    },
    slideToLoop: function (e, t, i, n) {
      void 0 === e && (e = 0),
        void 0 === t && (t = this.params.speed),
        void 0 === i && (i = !0);
      var s = e;
      return (
        this.params.loop && (s += this.loopedSlides), this.slideTo(s, t, i, n)
      );
    },
    slideNext: function (e, t, i) {
      void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
      var n = this,
        s = n.params,
        o = n.animating;
      return s.loop
        ? !o &&
            (n.loopFix(),
            (n._clientLeft = n.$wrapperEl[0].clientLeft),
            n.slideTo(n.activeIndex + s.slidesPerGroup, e, t, i))
        : n.slideTo(n.activeIndex + s.slidesPerGroup, e, t, i);
    },
    slidePrev: function (e, t, i) {
      void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
      var n = this,
        s = n.params,
        o = n.animating,
        a = n.snapGrid,
        r = n.slidesGrid,
        l = n.rtlTranslate;
      if (s.loop) {
        if (o) return !1;
        n.loopFix(), (n._clientLeft = n.$wrapperEl[0].clientLeft);
      }
      function d(e) {
        return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e);
      }
      var c,
        h = d(l ? n.translate : -n.translate),
        p = a.map(function (e) {
          return d(e);
        }),
        u =
          (r.map(function (e) {
            return d(e);
          }),
          a[p.indexOf(h)],
          a[p.indexOf(h) - 1]);
      return (
        void 0 !== u && (c = r.indexOf(u)) < 0 && (c = n.activeIndex - 1),
        n.slideTo(c, e, t, i)
      );
    },
    slideReset: function (e, t, i) {
      return (
        void 0 === e && (e = this.params.speed),
        void 0 === t && (t = !0),
        this.slideTo(this.activeIndex, e, t, i)
      );
    },
    slideToClosest: function (e, t, i) {
      void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
      var n = this,
        s = n.activeIndex,
        o = Math.floor(s / n.params.slidesPerGroup);
      if (o < n.snapGrid.length - 1) {
        var a = n.rtlTranslate ? n.translate : -n.translate,
          r = n.snapGrid[o];
        (n.snapGrid[o + 1] - r) / 2 < a - r && (s = n.params.slidesPerGroup);
      }
      return n.slideTo(s, e, t, i);
    },
    slideToClickedSlide: function () {
      var e,
        t = this,
        i = t.params,
        n = t.$wrapperEl,
        s =
          "auto" === i.slidesPerView
            ? t.slidesPerViewDynamic()
            : i.slidesPerView,
        o = t.clickedIndex;
      if (i.loop) {
        if (t.animating) return;
        (e = parseInt(L(t.clickedSlide).attr("data-swiper-slide-index"), 10)),
          i.centeredSlides
            ? o < t.loopedSlides - s / 2 ||
              o > t.slides.length - t.loopedSlides + s / 2
              ? (t.loopFix(),
                (o = n
                  .children(
                    "." +
                      i.slideClass +
                      '[data-swiper-slide-index="' +
                      e +
                      '"]:not(.' +
                      i.slideDuplicateClass +
                      ")"
                  )
                  .eq(0)
                  .index()),
                ee.nextTick(function () {
                  t.slideTo(o);
                }))
              : t.slideTo(o)
            : o > t.slides.length - s
            ? (t.loopFix(),
              (o = n
                .children(
                  "." +
                    i.slideClass +
                    '[data-swiper-slide-index="' +
                    e +
                    '"]:not(.' +
                    i.slideDuplicateClass +
                    ")"
                )
                .eq(0)
                .index()),
              ee.nextTick(function () {
                t.slideTo(o);
              }))
            : t.slideTo(o);
      } else t.slideTo(o);
    },
  };
  var u = {
    loopCreate: function () {
      var n = this,
        e = n.params,
        t = n.$wrapperEl;
      t.children("." + e.slideClass + "." + e.slideDuplicateClass).remove();
      var s = t.children("." + e.slideClass);
      if (e.loopFillGroupWithBlank) {
        var i = e.slidesPerGroup - (s.length % e.slidesPerGroup);
        if (i !== e.slidesPerGroup) {
          for (var o = 0; o < i; o += 1) {
            var a = L(m.createElement("div")).addClass(
              e.slideClass + " " + e.slideBlankClass
            );
            t.append(a);
          }
          s = t.children("." + e.slideClass);
        }
      }
      "auto" !== e.slidesPerView ||
        e.loopedSlides ||
        (e.loopedSlides = s.length),
        (n.loopedSlides = parseInt(e.loopedSlides || e.slidesPerView, 10)),
        (n.loopedSlides += e.loopAdditionalSlides),
        n.loopedSlides > s.length && (n.loopedSlides = s.length);
      var r = [],
        l = [];
      s.each(function (e, t) {
        var i = L(t);
        e < n.loopedSlides && l.push(t),
          e < s.length && e >= s.length - n.loopedSlides && r.push(t),
          i.attr("data-swiper-slide-index", e);
      });
      for (var d = 0; d < l.length; d += 1)
        t.append(L(l[d].cloneNode(!0)).addClass(e.slideDuplicateClass));
      for (var c = r.length - 1; 0 <= c; c -= 1)
        t.prepend(L(r[c].cloneNode(!0)).addClass(e.slideDuplicateClass));
    },
    loopFix: function () {
      var e,
        t = this,
        i = t.params,
        n = t.activeIndex,
        s = t.slides,
        o = t.loopedSlides,
        a = t.allowSlidePrev,
        r = t.allowSlideNext,
        l = t.snapGrid,
        d = t.rtlTranslate;
      (t.allowSlidePrev = !0), (t.allowSlideNext = !0);
      var c = -l[n] - t.getTranslate();
      if (n < o)
        (e = s.length - 3 * o + n),
          (e += o),
          t.slideTo(e, 0, !1, !0) &&
            0 != c &&
            t.setTranslate((d ? -t.translate : t.translate) - c);
      else if (
        ("auto" === i.slidesPerView && 2 * o <= n) ||
        n >= s.length - o
      ) {
        (e = -s.length + n + o),
          (e += o),
          t.slideTo(e, 0, !1, !0) &&
            0 != c &&
            t.setTranslate((d ? -t.translate : t.translate) - c);
      }
      (t.allowSlidePrev = a), (t.allowSlideNext = r);
    },
    loopDestroy: function () {
      var e = this.$wrapperEl,
        t = this.params,
        i = this.slides;
      e
        .children(
          "." +
            t.slideClass +
            "." +
            t.slideDuplicateClass +
            ",." +
            t.slideClass +
            "." +
            t.slideBlankClass
        )
        .remove(),
        i.removeAttr("data-swiper-slide-index");
    },
  };
  var f = {
    setGrabCursor: function (e) {
      if (
        !(
          te.touch ||
          !this.params.simulateTouch ||
          (this.params.watchOverflow && this.isLocked)
        )
      ) {
        var t = this.el;
        (t.style.cursor = "move"),
          (t.style.cursor = e ? "-webkit-grabbing" : "-webkit-grab"),
          (t.style.cursor = e ? "-moz-grabbin" : "-moz-grab"),
          (t.style.cursor = e ? "grabbing" : "grab");
      }
    },
    unsetGrabCursor: function () {
      te.touch ||
        (this.params.watchOverflow && this.isLocked) ||
        (this.el.style.cursor = "");
    },
  };
  var g = {
      appendSlide: function (e) {
        var t = this,
          i = t.$wrapperEl,
          n = t.params;
        if ((n.loop && t.loopDestroy(), "object" == typeof e && "length" in e))
          for (var s = 0; s < e.length; s += 1) e[s] && i.append(e[s]);
        else i.append(e);
        n.loop && t.loopCreate(), (n.observer && te.observer) || t.update();
      },
      prependSlide: function (e) {
        var t = this,
          i = t.params,
          n = t.$wrapperEl,
          s = t.activeIndex;
        i.loop && t.loopDestroy();
        var o = s + 1;
        if ("object" == typeof e && "length" in e) {
          for (var a = 0; a < e.length; a += 1) e[a] && n.prepend(e[a]);
          o = s + e.length;
        } else n.prepend(e);
        i.loop && t.loopCreate(),
          (i.observer && te.observer) || t.update(),
          t.slideTo(o, 0, !1);
      },
      addSlide: function (e, t) {
        var i = this,
          n = i.$wrapperEl,
          s = i.params,
          o = i.activeIndex;
        s.loop &&
          ((o -= i.loopedSlides),
          i.loopDestroy(),
          (i.slides = n.children("." + s.slideClass)));
        var a = i.slides.length;
        if (e <= 0) i.prependSlide(t);
        else if (a <= e) i.appendSlide(t);
        else {
          for (var r = e < o ? o + 1 : o, l = [], d = a - 1; e <= d; d -= 1) {
            var c = i.slides.eq(d);
            c.remove(), l.unshift(c);
          }
          if ("object" == typeof t && "length" in t) {
            for (var h = 0; h < t.length; h += 1) t[h] && n.append(t[h]);
            r = e < o ? o + t.length : o;
          } else n.append(t);
          for (var p = 0; p < l.length; p += 1) n.append(l[p]);
          s.loop && i.loopCreate(),
            (s.observer && te.observer) || i.update(),
            s.loop ? i.slideTo(r + i.loopedSlides, 0, !1) : i.slideTo(r, 0, !1);
        }
      },
      removeSlide: function (e) {
        var t = this,
          i = t.params,
          n = t.$wrapperEl,
          s = t.activeIndex;
        i.loop &&
          ((s -= t.loopedSlides),
          t.loopDestroy(),
          (t.slides = n.children("." + i.slideClass)));
        var o,
          a = s;
        if ("object" == typeof e && "length" in e) {
          for (var r = 0; r < e.length; r += 1)
            (o = e[r]),
              t.slides[o] && t.slides.eq(o).remove(),
              o < a && (a -= 1);
          a = Math.max(a, 0);
        } else
          (o = e),
            t.slides[o] && t.slides.eq(o).remove(),
            o < a && (a -= 1),
            (a = Math.max(a, 0));
        i.loop && t.loopCreate(),
          (i.observer && te.observer) || t.update(),
          i.loop ? t.slideTo(a + t.loopedSlides, 0, !1) : t.slideTo(a, 0, !1);
      },
      removeAllSlides: function () {
        for (var e = [], t = 0; t < this.slides.length; t += 1) e.push(t);
        this.removeSlide(e);
      },
    },
    v = (function () {
      var e = J.navigator.userAgent,
        t = {
          ios: !1,
          android: !1,
          androidChrome: !1,
          desktop: !1,
          windows: !1,
          iphone: !1,
          ipod: !1,
          ipad: !1,
          cordova: J.cordova || J.phonegap,
          phonegap: J.cordova || J.phonegap,
        },
        i = e.match(/(Windows Phone);?[\s\/]+([\d.]+)?/),
        n = e.match(/(Android);?[\s\/]+([\d.]+)?/),
        s = e.match(/(iPad).*OS\s([\d_]+)/),
        o = e.match(/(iPod)(.*OS\s([\d_]+))?/),
        a = !s && e.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
      if (
        (i && ((t.os = "windows"), (t.osVersion = i[2]), (t.windows = !0)),
        n &&
          !i &&
          ((t.os = "android"),
          (t.osVersion = n[2]),
          (t.android = !0),
          (t.androidChrome = 0 <= e.toLowerCase().indexOf("chrome"))),
        (s || a || o) && ((t.os = "ios"), (t.ios = !0)),
        a && !o && ((t.osVersion = a[2].replace(/_/g, ".")), (t.iphone = !0)),
        s && ((t.osVersion = s[2].replace(/_/g, ".")), (t.ipad = !0)),
        o &&
          ((t.osVersion = o[3] ? o[3].replace(/_/g, ".") : null),
          (t.iphone = !0)),
        t.ios &&
          t.osVersion &&
          0 <= e.indexOf("Version/") &&
          "10" === t.osVersion.split(".")[0] &&
          (t.osVersion = e.toLowerCase().split("version/")[1].split(" ")[0]),
        (t.desktop = !(t.os || t.android || t.webView)),
        (t.webView = (a || s || o) && e.match(/.*AppleWebKit(?!.*Safari)/i)),
        t.os && "ios" === t.os)
      ) {
        var r = t.osVersion.split("."),
          l = m.querySelector('meta[name="viewport"]');
        t.minimalUi =
          !t.webView &&
          (o || a) &&
          (1 * r[0] == 7 ? 1 <= 1 * r[1] : 7 < 1 * r[0]) &&
          l &&
          0 <= l.getAttribute("content").indexOf("minimal-ui");
      }
      return (t.pixelRatio = J.devicePixelRatio || 1), t;
    })();
  function w() {
    var e = this,
      t = e.params,
      i = e.el;
    if (!i || 0 !== i.offsetWidth) {
      t.breakpoints && e.setBreakpoint();
      var n = e.allowSlideNext,
        s = e.allowSlidePrev,
        o = e.snapGrid;
      if (
        ((e.allowSlideNext = !0),
        (e.allowSlidePrev = !0),
        e.updateSize(),
        e.updateSlides(),
        t.freeMode)
      ) {
        var a = Math.min(
          Math.max(e.translate, e.maxTranslate()),
          e.minTranslate()
        );
        e.setTranslate(a),
          e.updateActiveIndex(),
          e.updateSlidesClasses(),
          t.autoHeight && e.updateAutoHeight();
      } else
        e.updateSlidesClasses(),
          ("auto" === t.slidesPerView || 1 < t.slidesPerView) &&
          e.isEnd &&
          !e.params.centeredSlides
            ? e.slideTo(e.slides.length - 1, 0, !1, !0)
            : e.slideTo(e.activeIndex, 0, !1, !0);
      (e.allowSlidePrev = s),
        (e.allowSlideNext = n),
        e.params.watchOverflow && o !== e.snapGrid && e.checkOverflow();
    }
  }
  var b = {
      init: !0,
      direction: "horizontal",
      touchEventsTarget: "container",
      initialSlide: 0,
      speed: 300,
      preventInteractionOnTransition: !1,
      edgeSwipeDetection: !1,
      edgeSwipeThreshold: 20,
      freeMode: !1,
      freeModeMomentum: !0,
      freeModeMomentumRatio: 1,
      freeModeMomentumBounce: !0,
      freeModeMomentumBounceRatio: 1,
      freeModeMomentumVelocityRatio: 1,
      freeModeSticky: !1,
      freeModeMinimumVelocity: 0.02,
      autoHeight: !1,
      setWrapperSize: !1,
      virtualTranslate: !1,
      effect: "slide",
      breakpoints: void 0,
      breakpointsInverse: !1,
      spaceBetween: 0,
      slidesPerView: 1,
      slidesPerColumn: 1,
      slidesPerColumnFill: "column",
      slidesPerGroup: 1,
      centeredSlides: !1,
      slidesOffsetBefore: 0,
      slidesOffsetAfter: 0,
      normalizeSlideIndex: !0,
      centerInsufficientSlides: !1,
      watchOverflow: !1,
      roundLengths: !1,
      touchRatio: 1,
      touchAngle: 45,
      simulateTouch: !0,
      shortSwipes: !0,
      longSwipes: !0,
      longSwipesRatio: 0.5,
      longSwipesMs: 300,
      followFinger: !0,
      allowTouchMove: !0,
      threshold: 0,
      touchMoveStopPropagation: !0,
      touchStartPreventDefault: !0,
      touchStartForcePreventDefault: !1,
      touchReleaseOnEdges: !1,
      uniqueNavElements: !0,
      resistance: !0,
      resistanceRatio: 0.85,
      watchSlidesProgress: !1,
      watchSlidesVisibility: !1,
      grabCursor: !1,
      preventClicks: !0,
      preventClicksPropagation: !0,
      slideToClickedSlide: !1,
      preloadImages: !0,
      updateOnImagesReady: !0,
      loop: !1,
      loopAdditionalSlides: 0,
      loopedSlides: null,
      loopFillGroupWithBlank: !1,
      allowSlidePrev: !0,
      allowSlideNext: !0,
      swipeHandler: null,
      noSwiping: !0,
      noSwipingClass: "swiper-no-swiping",
      noSwipingSelector: null,
      passiveListeners: !0,
      containerModifierClass: "swiper-container-",
      slideClass: "swiper-slide",
      slideBlankClass: "swiper-slide-invisible-blank",
      slideActiveClass: "swiper-slide-active",
      slideDuplicateActiveClass: "swiper-slide-duplicate-active",
      slideVisibleClass: "swiper-slide-visible",
      slideDuplicateClass: "swiper-slide-duplicate",
      slideNextClass: "swiper-slide-next",
      slideDuplicateNextClass: "swiper-slide-duplicate-next",
      slidePrevClass: "swiper-slide-prev",
      slideDuplicatePrevClass: "swiper-slide-duplicate-prev",
      wrapperClass: "swiper-wrapper",
      runCallbacksOnInit: !0,
    },
    y = {
      update: d,
      translate: c,
      transition: h,
      slide: p,
      loop: u,
      grabCursor: f,
      manipulation: g,
      events: {
        attachEvents: function () {
          var e = this,
            t = e.params,
            i = e.touchEvents,
            n = e.el,
            s = e.wrapperEl;
          (e.onTouchStart = function (e) {
            var t = this,
              i = t.touchEventsData,
              n = t.params,
              s = t.touches;
            if (!t.animating || !n.preventInteractionOnTransition) {
              var o = e;
              if (
                (o.originalEvent && (o = o.originalEvent),
                (i.isTouchEvent = "touchstart" === o.type),
                (i.isTouchEvent || !("which" in o) || 3 !== o.which) &&
                  !(
                    (!i.isTouchEvent && "button" in o && 0 < o.button) ||
                    (i.isTouched && i.isMoved)
                  ))
              )
                if (
                  n.noSwiping &&
                  L(o.target).closest(
                    n.noSwipingSelector
                      ? n.noSwipingSelector
                      : "." + n.noSwipingClass
                  )[0]
                )
                  t.allowClick = !0;
                else if (!n.swipeHandler || L(o).closest(n.swipeHandler)[0]) {
                  (s.currentX =
                    "touchstart" === o.type
                      ? o.targetTouches[0].pageX
                      : o.pageX),
                    (s.currentY =
                      "touchstart" === o.type
                        ? o.targetTouches[0].pageY
                        : o.pageY);
                  var a = s.currentX,
                    r = s.currentY,
                    l = n.edgeSwipeDetection || n.iOSEdgeSwipeDetection,
                    d = n.edgeSwipeThreshold || n.iOSEdgeSwipeThreshold;
                  if (!l || !(a <= d || a >= J.screen.width - d)) {
                    if (
                      (ee.extend(i, {
                        isTouched: !0,
                        isMoved: !1,
                        allowTouchCallbacks: !0,
                        isScrolling: void 0,
                        startMoving: void 0,
                      }),
                      (s.startX = a),
                      (s.startY = r),
                      (i.touchStartTime = ee.now()),
                      (t.allowClick = !0),
                      t.updateSize(),
                      (t.swipeDirection = void 0),
                      0 < n.threshold && (i.allowThresholdMove = !1),
                      "touchstart" !== o.type)
                    ) {
                      var c = !0;
                      L(o.target).is(i.formElements) && (c = !1),
                        m.activeElement &&
                          L(m.activeElement).is(i.formElements) &&
                          m.activeElement !== o.target &&
                          m.activeElement.blur();
                      var h =
                        c && t.allowTouchMove && n.touchStartPreventDefault;
                      (n.touchStartForcePreventDefault || h) &&
                        o.preventDefault();
                    }
                    t.emit("touchStart", o);
                  }
                }
            }
          }.bind(e)),
            (e.onTouchMove = function (e) {
              var t = this,
                i = t.touchEventsData,
                n = t.params,
                s = t.touches,
                o = t.rtlTranslate,
                a = e;
              if ((a.originalEvent && (a = a.originalEvent), i.isTouched)) {
                if (!i.isTouchEvent || "mousemove" !== a.type) {
                  var r =
                      "touchmove" === a.type
                        ? a.targetTouches[0].pageX
                        : a.pageX,
                    l =
                      "touchmove" === a.type
                        ? a.targetTouches[0].pageY
                        : a.pageY;
                  if (a.preventedByNestedSwiper)
                    return (s.startX = r), void (s.startY = l);
                  if (!t.allowTouchMove)
                    return (
                      (t.allowClick = !1),
                      void (
                        i.isTouched &&
                        (ee.extend(s, {
                          startX: r,
                          startY: l,
                          currentX: r,
                          currentY: l,
                        }),
                        (i.touchStartTime = ee.now()))
                      )
                    );
                  if (i.isTouchEvent && n.touchReleaseOnEdges && !n.loop)
                    if (t.isVertical()) {
                      if (
                        (l < s.startY && t.translate <= t.maxTranslate()) ||
                        (l > s.startY && t.translate >= t.minTranslate())
                      )
                        return (i.isTouched = !1), void (i.isMoved = !1);
                    } else if (
                      (r < s.startX && t.translate <= t.maxTranslate()) ||
                      (r > s.startX && t.translate >= t.minTranslate())
                    )
                      return;
                  if (
                    i.isTouchEvent &&
                    m.activeElement &&
                    a.target === m.activeElement &&
                    L(a.target).is(i.formElements)
                  )
                    return (i.isMoved = !0), void (t.allowClick = !1);
                  if (
                    (i.allowTouchCallbacks && t.emit("touchMove", a),
                    !(a.targetTouches && 1 < a.targetTouches.length))
                  ) {
                    (s.currentX = r), (s.currentY = l);
                    var d = s.currentX - s.startX,
                      c = s.currentY - s.startY;
                    if (
                      !(
                        t.params.threshold &&
                        Math.sqrt(Math.pow(d, 2) + Math.pow(c, 2)) <
                          t.params.threshold
                      )
                    ) {
                      var h;
                      if (void 0 === i.isScrolling)
                        (t.isHorizontal() && s.currentY === s.startY) ||
                        (t.isVertical() && s.currentX === s.startX)
                          ? (i.isScrolling = !1)
                          : 25 <= d * d + c * c &&
                            ((h =
                              (180 * Math.atan2(Math.abs(c), Math.abs(d))) /
                              Math.PI),
                            (i.isScrolling = t.isHorizontal()
                              ? h > n.touchAngle
                              : 90 - h > n.touchAngle));
                      if (
                        (i.isScrolling && t.emit("touchMoveOpposite", a),
                        void 0 === i.startMoving &&
                          ((s.currentX === s.startX &&
                            s.currentY === s.startY) ||
                            (i.startMoving = !0)),
                        i.isScrolling)
                      )
                        i.isTouched = !1;
                      else if (i.startMoving) {
                        (t.allowClick = !1),
                          a.preventDefault(),
                          n.touchMoveStopPropagation &&
                            !n.nested &&
                            a.stopPropagation(),
                          i.isMoved ||
                            (n.loop && t.loopFix(),
                            (i.startTranslate = t.getTranslate()),
                            t.setTransition(0),
                            t.animating &&
                              t.$wrapperEl.trigger(
                                "webkitTransitionEnd transitionend"
                              ),
                            (i.allowMomentumBounce = !1),
                            !n.grabCursor ||
                              (!0 !== t.allowSlideNext &&
                                !0 !== t.allowSlidePrev) ||
                              t.setGrabCursor(!0),
                            t.emit("sliderFirstMove", a)),
                          t.emit("sliderMove", a),
                          (i.isMoved = !0);
                        var p = t.isHorizontal() ? d : c;
                        (s.diff = p),
                          (p *= n.touchRatio),
                          o && (p = -p),
                          (t.swipeDirection = 0 < p ? "prev" : "next"),
                          (i.currentTranslate = p + i.startTranslate);
                        var u = !0,
                          f = n.resistanceRatio;
                        if (
                          (n.touchReleaseOnEdges && (f = 0),
                          0 < p && i.currentTranslate > t.minTranslate()
                            ? ((u = !1),
                              n.resistance &&
                                (i.currentTranslate =
                                  t.minTranslate() -
                                  1 +
                                  Math.pow(
                                    -t.minTranslate() + i.startTranslate + p,
                                    f
                                  )))
                            : p < 0 &&
                              i.currentTranslate < t.maxTranslate() &&
                              ((u = !1),
                              n.resistance &&
                                (i.currentTranslate =
                                  t.maxTranslate() +
                                  1 -
                                  Math.pow(
                                    t.maxTranslate() - i.startTranslate - p,
                                    f
                                  ))),
                          u && (a.preventedByNestedSwiper = !0),
                          !t.allowSlideNext &&
                            "next" === t.swipeDirection &&
                            i.currentTranslate < i.startTranslate &&
                            (i.currentTranslate = i.startTranslate),
                          !t.allowSlidePrev &&
                            "prev" === t.swipeDirection &&
                            i.currentTranslate > i.startTranslate &&
                            (i.currentTranslate = i.startTranslate),
                          0 < n.threshold)
                        ) {
                          if (
                            !(Math.abs(p) > n.threshold || i.allowThresholdMove)
                          )
                            return void (i.currentTranslate = i.startTranslate);
                          if (!i.allowThresholdMove)
                            return (
                              (i.allowThresholdMove = !0),
                              (s.startX = s.currentX),
                              (s.startY = s.currentY),
                              (i.currentTranslate = i.startTranslate),
                              void (s.diff = t.isHorizontal()
                                ? s.currentX - s.startX
                                : s.currentY - s.startY)
                            );
                        }
                        n.followFinger &&
                          ((n.freeMode ||
                            n.watchSlidesProgress ||
                            n.watchSlidesVisibility) &&
                            (t.updateActiveIndex(), t.updateSlidesClasses()),
                          n.freeMode &&
                            (0 === i.velocities.length &&
                              i.velocities.push({
                                position:
                                  s[t.isHorizontal() ? "startX" : "startY"],
                                time: i.touchStartTime,
                              }),
                            i.velocities.push({
                              position:
                                s[t.isHorizontal() ? "currentX" : "currentY"],
                              time: ee.now(),
                            })),
                          t.updateProgress(i.currentTranslate),
                          t.setTranslate(i.currentTranslate));
                      }
                    }
                  }
                }
              } else
                i.startMoving &&
                  i.isScrolling &&
                  t.emit("touchMoveOpposite", a);
            }.bind(e)),
            (e.onTouchEnd = function (e) {
              var t = this,
                i = t.touchEventsData,
                n = t.params,
                s = t.touches,
                o = t.rtlTranslate,
                a = t.$wrapperEl,
                r = t.slidesGrid,
                l = t.snapGrid,
                d = e;
              if (
                (d.originalEvent && (d = d.originalEvent),
                i.allowTouchCallbacks && t.emit("touchEnd", d),
                (i.allowTouchCallbacks = !1),
                !i.isTouched)
              )
                return (
                  i.isMoved && n.grabCursor && t.setGrabCursor(!1),
                  (i.isMoved = !1),
                  void (i.startMoving = !1)
                );
              n.grabCursor &&
                i.isMoved &&
                i.isTouched &&
                (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) &&
                t.setGrabCursor(!1);
              var c,
                h = ee.now(),
                p = h - i.touchStartTime;
              if (
                (t.allowClick &&
                  (t.updateClickedSlide(d),
                  t.emit("tap", d),
                  p < 300 &&
                    300 < h - i.lastClickTime &&
                    (i.clickTimeout && clearTimeout(i.clickTimeout),
                    (i.clickTimeout = ee.nextTick(function () {
                      t && !t.destroyed && t.emit("click", d);
                    }, 300))),
                  p < 300 &&
                    h - i.lastClickTime < 300 &&
                    (i.clickTimeout && clearTimeout(i.clickTimeout),
                    t.emit("doubleTap", d))),
                (i.lastClickTime = ee.now()),
                ee.nextTick(function () {
                  t.destroyed || (t.allowClick = !0);
                }),
                !i.isTouched ||
                  !i.isMoved ||
                  !t.swipeDirection ||
                  0 === s.diff ||
                  i.currentTranslate === i.startTranslate)
              )
                return (
                  (i.isTouched = !1),
                  (i.isMoved = !1),
                  void (i.startMoving = !1)
                );
              if (
                ((i.isTouched = !1),
                (i.isMoved = !1),
                (i.startMoving = !1),
                (c = n.followFinger
                  ? o
                    ? t.translate
                    : -t.translate
                  : -i.currentTranslate),
                n.freeMode)
              ) {
                if (c < -t.minTranslate()) return void t.slideTo(t.activeIndex);
                if (c > -t.maxTranslate())
                  return void (t.slides.length < l.length
                    ? t.slideTo(l.length - 1)
                    : t.slideTo(t.slides.length - 1));
                if (n.freeModeMomentum) {
                  if (1 < i.velocities.length) {
                    var u = i.velocities.pop(),
                      f = i.velocities.pop(),
                      m = u.position - f.position,
                      g = u.time - f.time;
                    (t.velocity = m / g),
                      (t.velocity /= 2),
                      Math.abs(t.velocity) < n.freeModeMinimumVelocity &&
                        (t.velocity = 0),
                      (150 < g || 300 < ee.now() - u.time) && (t.velocity = 0);
                  } else t.velocity = 0;
                  (t.velocity *= n.freeModeMomentumVelocityRatio),
                    (i.velocities.length = 0);
                  var v = 1e3 * n.freeModeMomentumRatio,
                    w = t.velocity * v,
                    b = t.translate + w;
                  o && (b = -b);
                  var y,
                    x,
                    T = !1,
                    C =
                      20 * Math.abs(t.velocity) * n.freeModeMomentumBounceRatio;
                  if (b < t.maxTranslate())
                    n.freeModeMomentumBounce
                      ? (b + t.maxTranslate() < -C &&
                          (b = t.maxTranslate() - C),
                        (y = t.maxTranslate()),
                        (T = !0),
                        (i.allowMomentumBounce = !0))
                      : (b = t.maxTranslate()),
                      n.loop && n.centeredSlides && (x = !0);
                  else if (b > t.minTranslate())
                    n.freeModeMomentumBounce
                      ? (b - t.minTranslate() > C && (b = t.minTranslate() + C),
                        (y = t.minTranslate()),
                        (T = !0),
                        (i.allowMomentumBounce = !0))
                      : (b = t.minTranslate()),
                      n.loop && n.centeredSlides && (x = !0);
                  else if (n.freeModeSticky) {
                    for (var z, S = 0; S < l.length; S += 1)
                      if (l[S] > -b) {
                        z = S;
                        break;
                      }
                    b = -(b =
                      Math.abs(l[z] - b) < Math.abs(l[z - 1] - b) ||
                      "next" === t.swipeDirection
                        ? l[z]
                        : l[z - 1]);
                  }
                  if (
                    (x &&
                      t.once("transitionEnd", function () {
                        t.loopFix();
                      }),
                    0 !== t.velocity)
                  )
                    v = o
                      ? Math.abs((-b - t.translate) / t.velocity)
                      : Math.abs((b - t.translate) / t.velocity);
                  else if (n.freeModeSticky) return void t.slideToClosest();
                  n.freeModeMomentumBounce && T
                    ? (t.updateProgress(y),
                      t.setTransition(v),
                      t.setTranslate(b),
                      t.transitionStart(!0, t.swipeDirection),
                      (t.animating = !0),
                      a.transitionEnd(function () {
                        t &&
                          !t.destroyed &&
                          i.allowMomentumBounce &&
                          (t.emit("momentumBounce"),
                          t.setTransition(n.speed),
                          t.setTranslate(y),
                          a.transitionEnd(function () {
                            t && !t.destroyed && t.transitionEnd();
                          }));
                      }))
                    : t.velocity
                    ? (t.updateProgress(b),
                      t.setTransition(v),
                      t.setTranslate(b),
                      t.transitionStart(!0, t.swipeDirection),
                      t.animating ||
                        ((t.animating = !0),
                        a.transitionEnd(function () {
                          t && !t.destroyed && t.transitionEnd();
                        })))
                    : t.updateProgress(b),
                    t.updateActiveIndex(),
                    t.updateSlidesClasses();
                } else if (n.freeModeSticky) return void t.slideToClosest();
                (!n.freeModeMomentum || p >= n.longSwipesMs) &&
                  (t.updateProgress(),
                  t.updateActiveIndex(),
                  t.updateSlidesClasses());
              } else {
                for (
                  var E = 0, k = t.slidesSizesGrid[0], M = 0;
                  M < r.length;
                  M += n.slidesPerGroup
                )
                  void 0 !== r[M + n.slidesPerGroup]
                    ? c >= r[M] &&
                      c < r[M + n.slidesPerGroup] &&
                      (k = r[(E = M) + n.slidesPerGroup] - r[M])
                    : c >= r[M] &&
                      ((E = M), (k = r[r.length - 1] - r[r.length - 2]));
                var P = (c - r[E]) / k;
                if (p > n.longSwipesMs) {
                  if (!n.longSwipes) return void t.slideTo(t.activeIndex);
                  "next" === t.swipeDirection &&
                    (P >= n.longSwipesRatio
                      ? t.slideTo(E + n.slidesPerGroup)
                      : t.slideTo(E)),
                    "prev" === t.swipeDirection &&
                      (P > 1 - n.longSwipesRatio
                        ? t.slideTo(E + n.slidesPerGroup)
                        : t.slideTo(E));
                } else {
                  if (!n.shortSwipes) return void t.slideTo(t.activeIndex);
                  "next" === t.swipeDirection &&
                    t.slideTo(E + n.slidesPerGroup),
                    "prev" === t.swipeDirection && t.slideTo(E);
                }
              }
            }.bind(e)),
            (e.onClick = function (e) {
              this.allowClick ||
                (this.params.preventClicks && e.preventDefault(),
                this.params.preventClicksPropagation &&
                  this.animating &&
                  (e.stopPropagation(), e.stopImmediatePropagation()));
            }.bind(e));
          var o = "container" === t.touchEventsTarget ? n : s,
            a = !!t.nested;
          if (te.touch || (!te.pointerEvents && !te.prefixedPointerEvents)) {
            if (te.touch) {
              var r = !(
                "touchstart" !== i.start ||
                !te.passiveListener ||
                !t.passiveListeners
              ) && { passive: !0, capture: !1 };
              o.addEventListener(i.start, e.onTouchStart, r),
                o.addEventListener(
                  i.move,
                  e.onTouchMove,
                  te.passiveListener ? { passive: !1, capture: a } : a
                ),
                o.addEventListener(i.end, e.onTouchEnd, r);
            }
            ((t.simulateTouch && !v.ios && !v.android) ||
              (t.simulateTouch && !te.touch && v.ios)) &&
              (o.addEventListener("mousedown", e.onTouchStart, !1),
              m.addEventListener("mousemove", e.onTouchMove, a),
              m.addEventListener("mouseup", e.onTouchEnd, !1));
          } else
            o.addEventListener(i.start, e.onTouchStart, !1),
              m.addEventListener(i.move, e.onTouchMove, a),
              m.addEventListener(i.end, e.onTouchEnd, !1);
          (t.preventClicks || t.preventClicksPropagation) &&
            o.addEventListener("click", e.onClick, !0),
            e.on(
              v.ios || v.android
                ? "resize orientationchange observerUpdate"
                : "resize observerUpdate",
              w,
              !0
            );
        },
        detachEvents: function () {
          var e = this,
            t = e.params,
            i = e.touchEvents,
            n = e.el,
            s = e.wrapperEl,
            o = "container" === t.touchEventsTarget ? n : s,
            a = !!t.nested;
          if (te.touch || (!te.pointerEvents && !te.prefixedPointerEvents)) {
            if (te.touch) {
              var r = !(
                "onTouchStart" !== i.start ||
                !te.passiveListener ||
                !t.passiveListeners
              ) && { passive: !0, capture: !1 };
              o.removeEventListener(i.start, e.onTouchStart, r),
                o.removeEventListener(i.move, e.onTouchMove, a),
                o.removeEventListener(i.end, e.onTouchEnd, r);
            }
            ((t.simulateTouch && !v.ios && !v.android) ||
              (t.simulateTouch && !te.touch && v.ios)) &&
              (o.removeEventListener("mousedown", e.onTouchStart, !1),
              m.removeEventListener("mousemove", e.onTouchMove, a),
              m.removeEventListener("mouseup", e.onTouchEnd, !1));
          } else
            o.removeEventListener(i.start, e.onTouchStart, !1),
              m.removeEventListener(i.move, e.onTouchMove, a),
              m.removeEventListener(i.end, e.onTouchEnd, !1);
          (t.preventClicks || t.preventClicksPropagation) &&
            o.removeEventListener("click", e.onClick, !0),
            e.off(
              v.ios || v.android
                ? "resize orientationchange observerUpdate"
                : "resize observerUpdate",
              w
            );
        },
      },
      breakpoints: {
        setBreakpoint: function () {
          var e = this,
            t = e.activeIndex,
            i = e.initialized,
            n = e.loopedSlides;
          void 0 === n && (n = 0);
          var s = e.params,
            o = s.breakpoints;
          if (o && (!o || 0 !== Object.keys(o).length)) {
            var a = e.getBreakpoint(o);
            if (a && e.currentBreakpoint !== a) {
              var r = a in o ? o[a] : void 0;
              r &&
                ["slidesPerView", "spaceBetween", "slidesPerGroup"].forEach(
                  function (e) {
                    var t = r[e];
                    void 0 !== t &&
                      (r[e] =
                        "slidesPerView" !== e || ("AUTO" !== t && "auto" !== t)
                          ? "slidesPerView" === e
                            ? parseFloat(t)
                            : parseInt(t, 10)
                          : "auto");
                  }
                );
              var l = r || e.originalParams,
                d = l.direction && l.direction !== s.direction,
                c = s.loop && (l.slidesPerView !== s.slidesPerView || d);
              d && i && e.changeDirection(),
                ee.extend(e.params, l),
                ee.extend(e, {
                  allowTouchMove: e.params.allowTouchMove,
                  allowSlideNext: e.params.allowSlideNext,
                  allowSlidePrev: e.params.allowSlidePrev,
                }),
                (e.currentBreakpoint = a),
                c &&
                  i &&
                  (e.loopDestroy(),
                  e.loopCreate(),
                  e.updateSlides(),
                  e.slideTo(t - n + e.loopedSlides, 0, !1)),
                e.emit("breakpoint", l);
            }
          }
        },
        getBreakpoint: function (e) {
          if (e) {
            var t = !1,
              i = [];
            Object.keys(e).forEach(function (e) {
              i.push(e);
            }),
              i.sort(function (e, t) {
                return parseInt(e, 10) - parseInt(t, 10);
              });
            for (var n = 0; n < i.length; n += 1) {
              var s = i[n];
              this.params.breakpointsInverse
                ? s <= J.innerWidth && (t = s)
                : s >= J.innerWidth && !t && (t = s);
            }
            return t || "max";
          }
        },
      },
      checkOverflow: {
        checkOverflow: function () {
          var e = this,
            t = e.isLocked;
          (e.isLocked = 1 === e.snapGrid.length),
            (e.allowSlideNext = !e.isLocked),
            (e.allowSlidePrev = !e.isLocked),
            t !== e.isLocked && e.emit(e.isLocked ? "lock" : "unlock"),
            t && t !== e.isLocked && ((e.isEnd = !1), e.navigation.update());
        },
      },
      classes: {
        addClasses: function () {
          var t = this.classNames,
            i = this.params,
            e = this.rtl,
            n = this.$el,
            s = [];
          s.push("initialized"),
            s.push(i.direction),
            i.freeMode && s.push("free-mode"),
            te.flexbox || s.push("no-flexbox"),
            i.autoHeight && s.push("autoheight"),
            e && s.push("rtl"),
            1 < i.slidesPerColumn && s.push("multirow"),
            v.android && s.push("android"),
            v.ios && s.push("ios"),
            (I.isIE || I.isEdge) &&
              (te.pointerEvents || te.prefixedPointerEvents) &&
              s.push("wp8-" + i.direction),
            s.forEach(function (e) {
              t.push(i.containerModifierClass + e);
            }),
            n.addClass(t.join(" "));
        },
        removeClasses: function () {
          var e = this.$el,
            t = this.classNames;
          e.removeClass(t.join(" "));
        },
      },
      images: {
        loadImage: function (e, t, i, n, s, o) {
          var a;
          function r() {
            o && o();
          }
          e.complete && s
            ? r()
            : t
            ? (((a = new J.Image()).onload = r),
              (a.onerror = r),
              n && (a.sizes = n),
              i && (a.srcset = i),
              t && (a.src = t))
            : r();
        },
        preloadImages: function () {
          var e = this;
          function t() {
            null != e &&
              e &&
              !e.destroyed &&
              (void 0 !== e.imagesLoaded && (e.imagesLoaded += 1),
              e.imagesLoaded === e.imagesToLoad.length &&
                (e.params.updateOnImagesReady && e.update(),
                e.emit("imagesReady")));
          }
          e.imagesToLoad = e.$el.find("img");
          for (var i = 0; i < e.imagesToLoad.length; i += 1) {
            var n = e.imagesToLoad[i];
            e.loadImage(
              n,
              n.currentSrc || n.getAttribute("src"),
              n.srcset || n.getAttribute("srcset"),
              n.sizes || n.getAttribute("sizes"),
              !0,
              t
            );
          }
        },
      },
    },
    x = {},
    T = (function (p) {
      function u() {
        for (var e, t, s, i = [], n = arguments.length; n--; )
          i[n] = arguments[n];
        (s =
          (s =
            1 === i.length && i[0].constructor && i[0].constructor === Object
              ? i[0]
              : ((t = (e = i)[0]), e[1])) || {}),
          (s = ee.extend({}, s)),
          t && !s.el && (s.el = t),
          p.call(this, s),
          Object.keys(y).forEach(function (t) {
            Object.keys(y[t]).forEach(function (e) {
              u.prototype[e] || (u.prototype[e] = y[t][e]);
            });
          });
        var o = this;
        void 0 === o.modules && (o.modules = {}),
          Object.keys(o.modules).forEach(function (e) {
            var t = o.modules[e];
            if (t.params) {
              var i = Object.keys(t.params)[0],
                n = t.params[i];
              if ("object" != typeof n || null === n) return;
              if (!(i in s && "enabled" in n)) return;
              !0 === s[i] && (s[i] = { enabled: !0 }),
                "object" != typeof s[i] ||
                  "enabled" in s[i] ||
                  (s[i].enabled = !0),
                s[i] || (s[i] = { enabled: !1 });
            }
          });
        var a = ee.extend({}, b);
        o.useModulesParams(a),
          (o.params = ee.extend({}, a, x, s)),
          (o.originalParams = ee.extend({}, o.params)),
          (o.passedParams = ee.extend({}, s));
        var r = (o.$ = L)(o.params.el);
        if ((t = r[0])) {
          if (1 < r.length) {
            var l = [];
            return (
              r.each(function (e, t) {
                var i = ee.extend({}, s, { el: t });
                l.push(new u(i));
              }),
              l
            );
          }
          (t.swiper = o), r.data("swiper", o);
          var d,
            c,
            h = r.children("." + o.params.wrapperClass);
          return (
            ee.extend(o, {
              $el: r,
              el: t,
              $wrapperEl: h,
              wrapperEl: h[0],
              classNames: [],
              slides: L(),
              slidesGrid: [],
              snapGrid: [],
              slidesSizesGrid: [],
              isHorizontal: function () {
                return "horizontal" === o.params.direction;
              },
              isVertical: function () {
                return "vertical" === o.params.direction;
              },
              rtl:
                "rtl" === t.dir.toLowerCase() || "rtl" === r.css("direction"),
              rtlTranslate:
                "horizontal" === o.params.direction &&
                ("rtl" === t.dir.toLowerCase() || "rtl" === r.css("direction")),
              wrongRTL: "-webkit-box" === h.css("display"),
              activeIndex: 0,
              realIndex: 0,
              isBeginning: !0,
              isEnd: !1,
              translate: 0,
              previousTranslate: 0,
              progress: 0,
              velocity: 0,
              animating: !1,
              allowSlideNext: o.params.allowSlideNext,
              allowSlidePrev: o.params.allowSlidePrev,
              touchEvents:
                ((d = ["touchstart", "touchmove", "touchend"]),
                (c = ["mousedown", "mousemove", "mouseup"]),
                te.pointerEvents
                  ? (c = ["pointerdown", "pointermove", "pointerup"])
                  : te.prefixedPointerEvents &&
                    (c = ["MSPointerDown", "MSPointerMove", "MSPointerUp"]),
                (o.touchEventsTouch = { start: d[0], move: d[1], end: d[2] }),
                (o.touchEventsDesktop = { start: c[0], move: c[1], end: c[2] }),
                te.touch || !o.params.simulateTouch
                  ? o.touchEventsTouch
                  : o.touchEventsDesktop),
              touchEventsData: {
                isTouched: void 0,
                isMoved: void 0,
                allowTouchCallbacks: void 0,
                touchStartTime: void 0,
                isScrolling: void 0,
                currentTranslate: void 0,
                startTranslate: void 0,
                allowThresholdMove: void 0,
                formElements: "input, select, option, textarea, button, video",
                lastClickTime: ee.now(),
                clickTimeout: void 0,
                velocities: [],
                allowMomentumBounce: void 0,
                isTouchEvent: void 0,
                startMoving: void 0,
              },
              allowClick: !0,
              allowTouchMove: o.params.allowTouchMove,
              touches: {
                startX: 0,
                startY: 0,
                currentX: 0,
                currentY: 0,
                diff: 0,
              },
              imagesToLoad: [],
              imagesLoaded: 0,
            }),
            o.useModules(),
            o.params.init && o.init(),
            o
          );
        }
      }
      p && (u.__proto__ = p);
      var e = {
        extendedDefaults: { configurable: !0 },
        defaults: { configurable: !0 },
        Class: { configurable: !0 },
        $: { configurable: !0 },
      };
      return (
        (((u.prototype = Object.create(p && p.prototype)).constructor =
          u).prototype.slidesPerViewDynamic = function () {
          var e = this,
            t = e.params,
            i = e.slides,
            n = e.slidesGrid,
            s = e.size,
            o = e.activeIndex,
            a = 1;
          if (t.centeredSlides) {
            for (
              var r, l = i[o].swiperSlideSize, d = o + 1;
              d < i.length;
              d += 1
            )
              i[d] &&
                !r &&
                ((a += 1), s < (l += i[d].swiperSlideSize) && (r = !0));
            for (var c = o - 1; 0 <= c; c -= 1)
              i[c] &&
                !r &&
                ((a += 1), s < (l += i[c].swiperSlideSize) && (r = !0));
          } else
            for (var h = o + 1; h < i.length; h += 1)
              n[h] - n[o] < s && (a += 1);
          return a;
        }),
        (u.prototype.update = function () {
          var i = this;
          if (i && !i.destroyed) {
            var e = i.snapGrid,
              t = i.params;
            t.breakpoints && i.setBreakpoint(),
              i.updateSize(),
              i.updateSlides(),
              i.updateProgress(),
              i.updateSlidesClasses(),
              i.params.freeMode
                ? (n(), i.params.autoHeight && i.updateAutoHeight())
                : (("auto" === i.params.slidesPerView ||
                    1 < i.params.slidesPerView) &&
                  i.isEnd &&
                  !i.params.centeredSlides
                    ? i.slideTo(i.slides.length - 1, 0, !1, !0)
                    : i.slideTo(i.activeIndex, 0, !1, !0)) || n(),
              t.watchOverflow && e !== i.snapGrid && i.checkOverflow(),
              i.emit("update");
          }
          function n() {
            var e = i.rtlTranslate ? -1 * i.translate : i.translate,
              t = Math.min(Math.max(e, i.maxTranslate()), i.minTranslate());
            i.setTranslate(t), i.updateActiveIndex(), i.updateSlidesClasses();
          }
        }),
        (u.prototype.changeDirection = function (i, e) {
          void 0 === e && (e = !0);
          var t = this,
            n = t.params.direction;
          return (
            (i = i || ("horizontal" === n ? "vertical" : "horizontal")) === n ||
              ("horizontal" !== i && "vertical" !== i) ||
              ("vertical" === n &&
                (t.$el
                  .removeClass(
                    t.params.containerModifierClass + "vertical wp8-vertical"
                  )
                  .addClass("" + t.params.containerModifierClass + i),
                (I.isIE || I.isEdge) &&
                  (te.pointerEvents || te.prefixedPointerEvents) &&
                  t.$el.addClass(t.params.containerModifierClass + "wp8-" + i)),
              "horizontal" === n &&
                (t.$el
                  .removeClass(
                    t.params.containerModifierClass +
                      "horizontal wp8-horizontal"
                  )
                  .addClass("" + t.params.containerModifierClass + i),
                (I.isIE || I.isEdge) &&
                  (te.pointerEvents || te.prefixedPointerEvents) &&
                  t.$el.addClass(t.params.containerModifierClass + "wp8-" + i)),
              (t.params.direction = i),
              t.slides.each(function (e, t) {
                "vertical" === i ? (t.style.width = "") : (t.style.height = "");
              }),
              t.emit("changeDirection"),
              e && t.update()),
            t
          );
        }),
        (u.prototype.init = function () {
          var e = this;
          e.initialized ||
            (e.emit("beforeInit"),
            e.params.breakpoints && e.setBreakpoint(),
            e.addClasses(),
            e.params.loop && e.loopCreate(),
            e.updateSize(),
            e.updateSlides(),
            e.params.watchOverflow && e.checkOverflow(),
            e.params.grabCursor && e.setGrabCursor(),
            e.params.preloadImages && e.preloadImages(),
            e.params.loop
              ? e.slideTo(
                  e.params.initialSlide + e.loopedSlides,
                  0,
                  e.params.runCallbacksOnInit
                )
              : e.slideTo(
                  e.params.initialSlide,
                  0,
                  e.params.runCallbacksOnInit
                ),
            e.attachEvents(),
            (e.initialized = !0),
            e.emit("init"));
        }),
        (u.prototype.destroy = function (e, t) {
          void 0 === e && (e = !0), void 0 === t && (t = !0);
          var i = this,
            n = i.params,
            s = i.$el,
            o = i.$wrapperEl,
            a = i.slides;
          return (
            void 0 === i.params ||
              i.destroyed ||
              (i.emit("beforeDestroy"),
              (i.initialized = !1),
              i.detachEvents(),
              n.loop && i.loopDestroy(),
              t &&
                (i.removeClasses(),
                s.removeAttr("style"),
                o.removeAttr("style"),
                a &&
                  a.length &&
                  a
                    .removeClass(
                      [
                        n.slideVisibleClass,
                        n.slideActiveClass,
                        n.slideNextClass,
                        n.slidePrevClass,
                      ].join(" ")
                    )
                    .removeAttr("style")
                    .removeAttr("data-swiper-slide-index")
                    .removeAttr("data-swiper-column")
                    .removeAttr("data-swiper-row")),
              i.emit("destroy"),
              Object.keys(i.eventsListeners).forEach(function (e) {
                i.off(e);
              }),
              !1 !== e &&
                ((i.$el[0].swiper = null),
                i.$el.data("swiper", null),
                ee.deleteProps(i)),
              (i.destroyed = !0)),
            null
          );
        }),
        (u.extendDefaults = function (e) {
          ee.extend(x, e);
        }),
        (e.extendedDefaults.get = function () {
          return x;
        }),
        (e.defaults.get = function () {
          return b;
        }),
        (e.Class.get = function () {
          return p;
        }),
        (e.$.get = function () {
          return L;
        }),
        Object.defineProperties(u, e),
        u
      );
    })(e),
    C = { name: "device", proto: { device: v }, static: { device: v } },
    z = { name: "support", proto: { support: te }, static: { support: te } },
    S = { name: "browser", proto: { browser: I }, static: { browser: I } },
    E = {
      name: "resize",
      create: function () {
        var e = this;
        ee.extend(e, {
          resize: {
            resizeHandler: function () {
              e &&
                !e.destroyed &&
                e.initialized &&
                (e.emit("beforeResize"), e.emit("resize"));
            },
            orientationChangeHandler: function () {
              e && !e.destroyed && e.initialized && e.emit("orientationchange");
            },
          },
        });
      },
      on: {
        init: function () {
          J.addEventListener("resize", this.resize.resizeHandler),
            J.addEventListener(
              "orientationchange",
              this.resize.orientationChangeHandler
            );
        },
        destroy: function () {
          J.removeEventListener("resize", this.resize.resizeHandler),
            J.removeEventListener(
              "orientationchange",
              this.resize.orientationChangeHandler
            );
        },
      },
    },
    k = {
      func: J.MutationObserver || J.WebkitMutationObserver,
      attach: function (e, t) {
        void 0 === t && (t = {});
        var i = this,
          n = new k.func(function (e) {
            if (1 !== e.length) {
              var t = function () {
                i.emit("observerUpdate", e[0]);
              };
              J.requestAnimationFrame
                ? J.requestAnimationFrame(t)
                : J.setTimeout(t, 0);
            } else i.emit("observerUpdate", e[0]);
          });
        n.observe(e, {
          attributes: void 0 === t.attributes || t.attributes,
          childList: void 0 === t.childList || t.childList,
          characterData: void 0 === t.characterData || t.characterData,
        }),
          i.observer.observers.push(n);
      },
      init: function () {
        var e = this;
        if (te.observer && e.params.observer) {
          if (e.params.observeParents)
            for (var t = e.$el.parents(), i = 0; i < t.length; i += 1)
              e.observer.attach(t[i]);
          e.observer.attach(e.$el[0], {
            childList: e.params.observeSlideChildren,
          }),
            e.observer.attach(e.$wrapperEl[0], { attributes: !1 });
        }
      },
      destroy: function () {
        this.observer.observers.forEach(function (e) {
          e.disconnect();
        }),
          (this.observer.observers = []);
      },
    },
    M = {
      name: "observer",
      params: { observer: !1, observeParents: !1, observeSlideChildren: !1 },
      create: function () {
        ee.extend(this, {
          observer: {
            init: k.init.bind(this),
            attach: k.attach.bind(this),
            destroy: k.destroy.bind(this),
            observers: [],
          },
        });
      },
      on: {
        init: function () {
          this.observer.init();
        },
        destroy: function () {
          this.observer.destroy();
        },
      },
    },
    P = {
      update: function (e) {
        var t = this,
          i = t.params,
          n = i.slidesPerView,
          s = i.slidesPerGroup,
          o = i.centeredSlides,
          a = t.params.virtual,
          r = a.addSlidesBefore,
          l = a.addSlidesAfter,
          d = t.virtual,
          c = d.from,
          h = d.to,
          p = d.slides,
          u = d.slidesGrid,
          f = d.renderSlide,
          m = d.offset;
        t.updateActiveIndex();
        var g,
          v,
          w,
          b = t.activeIndex || 0;
        (g = t.rtlTranslate ? "right" : t.isHorizontal() ? "left" : "top"),
          (w = o
            ? ((v = Math.floor(n / 2) + s + r), Math.floor(n / 2) + s + l)
            : ((v = n + (s - 1) + r), s + l));
        var y = Math.max((b || 0) - w, 0),
          x = Math.min((b || 0) + v, p.length - 1),
          T = (t.slidesGrid[y] || 0) - (t.slidesGrid[0] || 0);
        function C() {
          t.updateSlides(),
            t.updateProgress(),
            t.updateSlidesClasses(),
            t.lazy && t.params.lazy.enabled && t.lazy.load();
        }
        if (
          (ee.extend(t.virtual, {
            from: y,
            to: x,
            offset: T,
            slidesGrid: t.slidesGrid,
          }),
          c === y && h === x && !e)
        )
          return (
            t.slidesGrid !== u && T !== m && t.slides.css(g, T + "px"),
            void t.updateProgress()
          );
        if (t.params.virtual.renderExternal)
          return (
            t.params.virtual.renderExternal.call(t, {
              offset: T,
              from: y,
              to: x,
              slides: (function () {
                for (var e = [], t = y; t <= x; t += 1) e.push(p[t]);
                return e;
              })(),
            }),
            void C()
          );
        var z = [],
          S = [];
        if (e) t.$wrapperEl.find("." + t.params.slideClass).remove();
        else
          for (var E = c; E <= h; E += 1)
            (E < y || x < E) &&
              t.$wrapperEl
                .find(
                  "." +
                    t.params.slideClass +
                    '[data-swiper-slide-index="' +
                    E +
                    '"]'
                )
                .remove();
        for (var k = 0; k < p.length; k += 1)
          y <= k &&
            k <= x &&
            (void 0 === h || e
              ? S.push(k)
              : (h < k && S.push(k), k < c && z.push(k)));
        S.forEach(function (e) {
          t.$wrapperEl.append(f(p[e], e));
        }),
          z
            .sort(function (e, t) {
              return t - e;
            })
            .forEach(function (e) {
              t.$wrapperEl.prepend(f(p[e], e));
            }),
          t.$wrapperEl.children(".swiper-slide").css(g, T + "px"),
          C();
      },
      renderSlide: function (e, t) {
        var i = this,
          n = i.params.virtual;
        if (n.cache && i.virtual.cache[t]) return i.virtual.cache[t];
        var s = n.renderSlide
          ? L(n.renderSlide.call(i, e, t))
          : L(
              '<div class="' +
                i.params.slideClass +
                '" data-swiper-slide-index="' +
                t +
                '">' +
                e +
                "</div>"
            );
        return (
          s.attr("data-swiper-slide-index") ||
            s.attr("data-swiper-slide-index", t),
          n.cache && (i.virtual.cache[t] = s),
          s
        );
      },
      appendSlide: function (e) {
        if ("object" == typeof e && "length" in e)
          for (var t = 0; t < e.length; t += 1)
            e[t] && this.virtual.slides.push(e[t]);
        else this.virtual.slides.push(e);
        this.virtual.update(!0);
      },
      prependSlide: function (e) {
        var t = this,
          i = t.activeIndex,
          n = i + 1,
          s = 1;
        if (Array.isArray(e)) {
          for (var o = 0; o < e.length; o += 1)
            e[o] && t.virtual.slides.unshift(e[o]);
          (n = i + e.length), (s = e.length);
        } else t.virtual.slides.unshift(e);
        if (t.params.virtual.cache) {
          var a = t.virtual.cache,
            r = {};
          Object.keys(a).forEach(function (e) {
            r[parseInt(e, 10) + s] = a[e];
          }),
            (t.virtual.cache = r);
        }
        t.virtual.update(!0), t.slideTo(n, 0);
      },
      removeSlide: function (e) {
        var t = this;
        if (null != e) {
          var i = t.activeIndex;
          if (Array.isArray(e))
            for (var n = e.length - 1; 0 <= n; n -= 1)
              t.virtual.slides.splice(e[n], 1),
                t.params.virtual.cache && delete t.virtual.cache[e[n]],
                e[n] < i && (i -= 1),
                (i = Math.max(i, 0));
          else
            t.virtual.slides.splice(e, 1),
              t.params.virtual.cache && delete t.virtual.cache[e],
              e < i && (i -= 1),
              (i = Math.max(i, 0));
          t.virtual.update(!0), t.slideTo(i, 0);
        }
      },
      removeAllSlides: function () {
        var e = this;
        (e.virtual.slides = []),
          e.params.virtual.cache && (e.virtual.cache = {}),
          e.virtual.update(!0),
          e.slideTo(0, 0);
      },
    },
    $ = {
      name: "virtual",
      params: {
        virtual: {
          enabled: !1,
          slides: [],
          cache: !0,
          renderSlide: null,
          renderExternal: null,
          addSlidesBefore: 0,
          addSlidesAfter: 0,
        },
      },
      create: function () {
        var e = this;
        ee.extend(e, {
          virtual: {
            update: P.update.bind(e),
            appendSlide: P.appendSlide.bind(e),
            prependSlide: P.prependSlide.bind(e),
            removeSlide: P.removeSlide.bind(e),
            removeAllSlides: P.removeAllSlides.bind(e),
            renderSlide: P.renderSlide.bind(e),
            slides: e.params.virtual.slides,
            cache: {},
          },
        });
      },
      on: {
        beforeInit: function () {
          var e = this;
          if (e.params.virtual.enabled) {
            e.classNames.push(e.params.containerModifierClass + "virtual");
            var t = { watchSlidesProgress: !0 };
            ee.extend(e.params, t),
              ee.extend(e.originalParams, t),
              e.params.initialSlide || e.virtual.update();
          }
        },
        setTranslate: function () {
          this.params.virtual.enabled && this.virtual.update();
        },
      },
    },
    W = {
      handle: function (e) {
        var t = this,
          i = t.rtlTranslate,
          n = e;
        n.originalEvent && (n = n.originalEvent);
        var s = n.keyCode || n.charCode;
        if (
          !t.allowSlideNext &&
          ((t.isHorizontal() && 39 === s) || (t.isVertical() && 40 === s))
        )
          return !1;
        if (
          !t.allowSlidePrev &&
          ((t.isHorizontal() && 37 === s) || (t.isVertical() && 38 === s))
        )
          return !1;
        if (
          !(
            n.shiftKey ||
            n.altKey ||
            n.ctrlKey ||
            n.metaKey ||
            (m.activeElement &&
              m.activeElement.nodeName &&
              ("input" === m.activeElement.nodeName.toLowerCase() ||
                "textarea" === m.activeElement.nodeName.toLowerCase()))
          )
        ) {
          if (
            t.params.keyboard.onlyInViewport &&
            (37 === s || 39 === s || 38 === s || 40 === s)
          ) {
            var o = !1;
            if (
              0 < t.$el.parents("." + t.params.slideClass).length &&
              0 === t.$el.parents("." + t.params.slideActiveClass).length
            )
              return;
            var a = J.innerWidth,
              r = J.innerHeight,
              l = t.$el.offset();
            i && (l.left -= t.$el[0].scrollLeft);
            for (
              var d = [
                  [l.left, l.top],
                  [l.left + t.width, l.top],
                  [l.left, l.top + t.height],
                  [l.left + t.width, l.top + t.height],
                ],
                c = 0;
              c < d.length;
              c += 1
            ) {
              var h = d[c];
              0 <= h[0] && h[0] <= a && 0 <= h[1] && h[1] <= r && (o = !0);
            }
            if (!o) return;
          }
          t.isHorizontal()
            ? ((37 !== s && 39 !== s) ||
                (n.preventDefault ? n.preventDefault() : (n.returnValue = !1)),
              ((39 === s && !i) || (37 === s && i)) && t.slideNext(),
              ((37 === s && !i) || (39 === s && i)) && t.slidePrev())
            : ((38 !== s && 40 !== s) ||
                (n.preventDefault ? n.preventDefault() : (n.returnValue = !1)),
              40 === s && t.slideNext(),
              38 === s && t.slidePrev()),
            t.emit("keyPress", s);
        }
      },
      enable: function () {
        this.keyboard.enabled ||
          (L(m).on("keydown", this.keyboard.handle),
          (this.keyboard.enabled = !0));
      },
      disable: function () {
        this.keyboard.enabled &&
          (L(m).off("keydown", this.keyboard.handle),
          (this.keyboard.enabled = !1));
      },
    },
    O = {
      name: "keyboard",
      params: { keyboard: { enabled: !1, onlyInViewport: !0 } },
      create: function () {
        ee.extend(this, {
          keyboard: {
            enabled: !1,
            enable: W.enable.bind(this),
            disable: W.disable.bind(this),
            handle: W.handle.bind(this),
          },
        });
      },
      on: {
        init: function () {
          this.params.keyboard.enabled && this.keyboard.enable();
        },
        destroy: function () {
          this.keyboard.enabled && this.keyboard.disable();
        },
      },
    };
  var _ = {
      lastScrollTime: ee.now(),
      event:
        -1 < J.navigator.userAgent.indexOf("firefox")
          ? "DOMMouseScroll"
          : (function () {
              var e = "onwheel",
                t = e in m;
              if (!t) {
                var i = m.createElement("div");
                i.setAttribute(e, "return;"), (t = "function" == typeof i[e]);
              }
              return (
                !t &&
                  m.implementation &&
                  m.implementation.hasFeature &&
                  !0 !== m.implementation.hasFeature("", "") &&
                  (t = m.implementation.hasFeature("Events.wheel", "3.0")),
                t
              );
            })()
          ? "wheel"
          : "mousewheel",
      normalize: function (e) {
        var t = 0,
          i = 0,
          n = 0,
          s = 0;
        return (
          "detail" in e && (i = e.detail),
          "wheelDelta" in e && (i = -e.wheelDelta / 120),
          "wheelDeltaY" in e && (i = -e.wheelDeltaY / 120),
          "wheelDeltaX" in e && (t = -e.wheelDeltaX / 120),
          "axis" in e && e.axis === e.HORIZONTAL_AXIS && ((t = i), (i = 0)),
          (n = 10 * t),
          (s = 10 * i),
          "deltaY" in e && (s = e.deltaY),
          "deltaX" in e && (n = e.deltaX),
          (n || s) &&
            e.deltaMode &&
            (1 === e.deltaMode
              ? ((n *= 40), (s *= 40))
              : ((n *= 800), (s *= 800))),
          n && !t && (t = n < 1 ? -1 : 1),
          s && !i && (i = s < 1 ? -1 : 1),
          { spinX: t, spinY: i, pixelX: n, pixelY: s }
        );
      },
      handleMouseEnter: function () {
        this.mouseEntered = !0;
      },
      handleMouseLeave: function () {
        this.mouseEntered = !1;
      },
      handle: function (e) {
        var t = e,
          i = this,
          n = i.params.mousewheel;
        if (!i.mouseEntered && !n.releaseOnEdges) return !0;
        t.originalEvent && (t = t.originalEvent);
        var s = 0,
          o = i.rtlTranslate ? -1 : 1,
          a = _.normalize(t);
        if (n.forceToAxis)
          if (i.isHorizontal()) {
            if (!(Math.abs(a.pixelX) > Math.abs(a.pixelY))) return !0;
            s = a.pixelX * o;
          } else {
            if (!(Math.abs(a.pixelY) > Math.abs(a.pixelX))) return !0;
            s = a.pixelY;
          }
        else
          s =
            Math.abs(a.pixelX) > Math.abs(a.pixelY) ? -a.pixelX * o : -a.pixelY;
        if (0 === s) return !0;
        if ((n.invert && (s = -s), i.params.freeMode)) {
          i.params.loop && i.loopFix();
          var r = i.getTranslate() + s * n.sensitivity,
            l = i.isBeginning,
            d = i.isEnd;
          if (
            (r >= i.minTranslate() && (r = i.minTranslate()),
            r <= i.maxTranslate() && (r = i.maxTranslate()),
            i.setTransition(0),
            i.setTranslate(r),
            i.updateProgress(),
            i.updateActiveIndex(),
            i.updateSlidesClasses(),
            ((!l && i.isBeginning) || (!d && i.isEnd)) &&
              i.updateSlidesClasses(),
            i.params.freeModeSticky &&
              (clearTimeout(i.mousewheel.timeout),
              (i.mousewheel.timeout = ee.nextTick(function () {
                i.slideToClosest();
              }, 300))),
            i.emit("scroll", t),
            i.params.autoplay &&
              i.params.autoplayDisableOnInteraction &&
              i.autoplay.stop(),
            r === i.minTranslate() || r === i.maxTranslate())
          )
            return !0;
        } else {
          if (60 < ee.now() - i.mousewheel.lastScrollTime)
            if (s < 0)
              if ((i.isEnd && !i.params.loop) || i.animating) {
                if (n.releaseOnEdges) return !0;
              } else i.slideNext(), i.emit("scroll", t);
            else if ((i.isBeginning && !i.params.loop) || i.animating) {
              if (n.releaseOnEdges) return !0;
            } else i.slidePrev(), i.emit("scroll", t);
          i.mousewheel.lastScrollTime = new J.Date().getTime();
        }
        return t.preventDefault ? t.preventDefault() : (t.returnValue = !1), !1;
      },
      enable: function () {
        var e = this;
        if (!_.event) return !1;
        if (e.mousewheel.enabled) return !1;
        var t = e.$el;
        return (
          "container" !== e.params.mousewheel.eventsTarged &&
            (t = L(e.params.mousewheel.eventsTarged)),
          t.on("mouseenter", e.mousewheel.handleMouseEnter),
          t.on("mouseleave", e.mousewheel.handleMouseLeave),
          t.on(_.event, e.mousewheel.handle),
          (e.mousewheel.enabled = !0)
        );
      },
      disable: function () {
        var e = this;
        if (!_.event) return !1;
        if (!e.mousewheel.enabled) return !1;
        var t = e.$el;
        return (
          "container" !== e.params.mousewheel.eventsTarged &&
            (t = L(e.params.mousewheel.eventsTarged)),
          t.off(_.event, e.mousewheel.handle),
          !(e.mousewheel.enabled = !1)
        );
      },
    },
    H = {
      update: function () {
        var e = this,
          t = e.params.navigation;
        if (!e.params.loop) {
          var i = e.navigation,
            n = i.$nextEl,
            s = i.$prevEl;
          s &&
            0 < s.length &&
            (e.isBeginning
              ? s.addClass(t.disabledClass)
              : s.removeClass(t.disabledClass),
            s[
              e.params.watchOverflow && e.isLocked ? "addClass" : "removeClass"
            ](t.lockClass)),
            n &&
              0 < n.length &&
              (e.isEnd
                ? n.addClass(t.disabledClass)
                : n.removeClass(t.disabledClass),
              n[
                e.params.watchOverflow && e.isLocked
                  ? "addClass"
                  : "removeClass"
              ](t.lockClass));
        }
      },
      onPrevClick: function (e) {
        e.preventDefault(),
          (this.isBeginning && !this.params.loop) || this.slidePrev();
      },
      onNextClick: function (e) {
        e.preventDefault(),
          (this.isEnd && !this.params.loop) || this.slideNext();
      },
      init: function () {
        var e,
          t,
          i = this,
          n = i.params.navigation;
        (n.nextEl || n.prevEl) &&
          (n.nextEl &&
            ((e = L(n.nextEl)),
            i.params.uniqueNavElements &&
              "string" == typeof n.nextEl &&
              1 < e.length &&
              1 === i.$el.find(n.nextEl).length &&
              (e = i.$el.find(n.nextEl))),
          n.prevEl &&
            ((t = L(n.prevEl)),
            i.params.uniqueNavElements &&
              "string" == typeof n.prevEl &&
              1 < t.length &&
              1 === i.$el.find(n.prevEl).length &&
              (t = i.$el.find(n.prevEl))),
          e && 0 < e.length && e.on("click", i.navigation.onNextClick),
          t && 0 < t.length && t.on("click", i.navigation.onPrevClick),
          ee.extend(i.navigation, {
            $nextEl: e,
            nextEl: e && e[0],
            $prevEl: t,
            prevEl: t && t[0],
          }));
      },
      destroy: function () {
        var e = this,
          t = e.navigation,
          i = t.$nextEl,
          n = t.$prevEl;
        i &&
          i.length &&
          (i.off("click", e.navigation.onNextClick),
          i.removeClass(e.params.navigation.disabledClass)),
          n &&
            n.length &&
            (n.off("click", e.navigation.onPrevClick),
            n.removeClass(e.params.navigation.disabledClass));
      },
    },
    D = {
      update: function () {
        var e = this,
          t = e.rtl,
          s = e.params.pagination;
        if (
          s.el &&
          e.pagination.el &&
          e.pagination.$el &&
          0 !== e.pagination.$el.length
        ) {
          var o,
            i =
              e.virtual && e.params.virtual.enabled
                ? e.virtual.slides.length
                : e.slides.length,
            n = e.pagination.$el,
            a = e.params.loop
              ? Math.ceil((i - 2 * e.loopedSlides) / e.params.slidesPerGroup)
              : e.snapGrid.length;
          if (
            (e.params.loop
              ? ((o = Math.ceil(
                  (e.activeIndex - e.loopedSlides) / e.params.slidesPerGroup
                )) >
                  i - 1 - 2 * e.loopedSlides && (o -= i - 2 * e.loopedSlides),
                a - 1 < o && (o -= a),
                o < 0 && "bullets" !== e.params.paginationType && (o = a + o))
              : (o = void 0 !== e.snapIndex ? e.snapIndex : e.activeIndex || 0),
            "bullets" === s.type &&
              e.pagination.bullets &&
              0 < e.pagination.bullets.length)
          ) {
            var r,
              l,
              d,
              c = e.pagination.bullets;
            if (
              (s.dynamicBullets &&
                ((e.pagination.bulletSize = c
                  .eq(0)
                  [e.isHorizontal() ? "outerWidth" : "outerHeight"](!0)),
                n.css(
                  e.isHorizontal() ? "width" : "height",
                  e.pagination.bulletSize * (s.dynamicMainBullets + 4) + "px"
                ),
                1 < s.dynamicMainBullets &&
                  void 0 !== e.previousIndex &&
                  ((e.pagination.dynamicBulletIndex += o - e.previousIndex),
                  e.pagination.dynamicBulletIndex > s.dynamicMainBullets - 1
                    ? (e.pagination.dynamicBulletIndex =
                        s.dynamicMainBullets - 1)
                    : e.pagination.dynamicBulletIndex < 0 &&
                      (e.pagination.dynamicBulletIndex = 0)),
                (r = o - e.pagination.dynamicBulletIndex),
                (d =
                  ((l = r + (Math.min(c.length, s.dynamicMainBullets) - 1)) +
                    r) /
                  2)),
              c.removeClass(
                s.bulletActiveClass +
                  " " +
                  s.bulletActiveClass +
                  "-next " +
                  s.bulletActiveClass +
                  "-next-next " +
                  s.bulletActiveClass +
                  "-prev " +
                  s.bulletActiveClass +
                  "-prev-prev " +
                  s.bulletActiveClass +
                  "-main"
              ),
              1 < n.length)
            )
              c.each(function (e, t) {
                var i = L(t),
                  n = i.index();
                n === o && i.addClass(s.bulletActiveClass),
                  s.dynamicBullets &&
                    (r <= n &&
                      n <= l &&
                      i.addClass(s.bulletActiveClass + "-main"),
                    n === r &&
                      i
                        .prev()
                        .addClass(s.bulletActiveClass + "-prev")
                        .prev()
                        .addClass(s.bulletActiveClass + "-prev-prev"),
                    n === l &&
                      i
                        .next()
                        .addClass(s.bulletActiveClass + "-next")
                        .next()
                        .addClass(s.bulletActiveClass + "-next-next"));
              });
            else if (
              (c.eq(o).addClass(s.bulletActiveClass), s.dynamicBullets)
            ) {
              for (var h = c.eq(r), p = c.eq(l), u = r; u <= l; u += 1)
                c.eq(u).addClass(s.bulletActiveClass + "-main");
              h
                .prev()
                .addClass(s.bulletActiveClass + "-prev")
                .prev()
                .addClass(s.bulletActiveClass + "-prev-prev"),
                p
                  .next()
                  .addClass(s.bulletActiveClass + "-next")
                  .next()
                  .addClass(s.bulletActiveClass + "-next-next");
            }
            if (s.dynamicBullets) {
              var f = Math.min(c.length, s.dynamicMainBullets + 4),
                m =
                  (e.pagination.bulletSize * f - e.pagination.bulletSize) / 2 -
                  d * e.pagination.bulletSize,
                g = t ? "right" : "left";
              c.css(e.isHorizontal() ? g : "top", m + "px");
            }
          }
          if (
            ("fraction" === s.type &&
              (n
                .find("." + s.currentClass)
                .text(s.formatFractionCurrent(o + 1)),
              n.find("." + s.totalClass).text(s.formatFractionTotal(a))),
            "progressbar" === s.type)
          ) {
            var v;
            v = s.progressbarOpposite
              ? e.isHorizontal()
                ? "vertical"
                : "horizontal"
              : e.isHorizontal()
              ? "horizontal"
              : "vertical";
            var w = (o + 1) / a,
              b = 1,
              y = 1;
            "horizontal" === v ? (b = w) : (y = w),
              n
                .find("." + s.progressbarFillClass)
                .transform(
                  "translate3d(0,0,0) scaleX(" + b + ") scaleY(" + y + ")"
                )
                .transition(e.params.speed);
          }
          "custom" === s.type && s.renderCustom
            ? (n.html(s.renderCustom(e, o + 1, a)),
              e.emit("paginationRender", e, n[0]))
            : e.emit("paginationUpdate", e, n[0]),
            n[
              e.params.watchOverflow && e.isLocked ? "addClass" : "removeClass"
            ](s.lockClass);
        }
      },
      render: function () {
        var e = this,
          t = e.params.pagination;
        if (
          t.el &&
          e.pagination.el &&
          e.pagination.$el &&
          0 !== e.pagination.$el.length
        ) {
          var i =
              e.virtual && e.params.virtual.enabled
                ? e.virtual.slides.length
                : e.slides.length,
            n = e.pagination.$el,
            s = "";
          if ("bullets" === t.type) {
            for (
              var o = e.params.loop
                  ? Math.ceil(
                      (i - 2 * e.loopedSlides) / e.params.slidesPerGroup
                    )
                  : e.snapGrid.length,
                a = 0;
              a < o;
              a += 1
            )
              t.renderBullet
                ? (s += t.renderBullet.call(e, a, t.bulletClass))
                : (s +=
                    "<" +
                    t.bulletElement +
                    ' class="' +
                    t.bulletClass +
                    '"></' +
                    t.bulletElement +
                    ">");
            n.html(s), (e.pagination.bullets = n.find("." + t.bulletClass));
          }
          "fraction" === t.type &&
            ((s = t.renderFraction
              ? t.renderFraction.call(e, t.currentClass, t.totalClass)
              : '<span class="' +
                t.currentClass +
                '"></span> / <span class="' +
                t.totalClass +
                '"></span>'),
            n.html(s)),
            "progressbar" === t.type &&
              ((s = t.renderProgressbar
                ? t.renderProgressbar.call(e, t.progressbarFillClass)
                : '<span class="' + t.progressbarFillClass + '"></span>'),
              n.html(s)),
            "custom" !== t.type &&
              e.emit("paginationRender", e.pagination.$el[0]);
        }
      },
      init: function () {
        var i = this,
          e = i.params.pagination;
        if (e.el) {
          var t = L(e.el);
          0 !== t.length &&
            (i.params.uniqueNavElements &&
              "string" == typeof e.el &&
              1 < t.length &&
              1 === i.$el.find(e.el).length &&
              (t = i.$el.find(e.el)),
            "bullets" === e.type && e.clickable && t.addClass(e.clickableClass),
            t.addClass(e.modifierClass + e.type),
            "bullets" === e.type &&
              e.dynamicBullets &&
              (t.addClass("" + e.modifierClass + e.type + "-dynamic"),
              (i.pagination.dynamicBulletIndex = 0),
              e.dynamicMainBullets < 1 && (e.dynamicMainBullets = 1)),
            "progressbar" === e.type &&
              e.progressbarOpposite &&
              t.addClass(e.progressbarOppositeClass),
            e.clickable &&
              t.on("click", "." + e.bulletClass, function (e) {
                e.preventDefault();
                var t = L(this).index() * i.params.slidesPerGroup;
                i.params.loop && (t += i.loopedSlides), i.slideTo(t);
              }),
            ee.extend(i.pagination, { $el: t, el: t[0] }));
        }
      },
      destroy: function () {
        var e = this,
          t = e.params.pagination;
        if (
          t.el &&
          e.pagination.el &&
          e.pagination.$el &&
          0 !== e.pagination.$el.length
        ) {
          var i = e.pagination.$el;
          i.removeClass(t.hiddenClass),
            i.removeClass(t.modifierClass + t.type),
            e.pagination.bullets &&
              e.pagination.bullets.removeClass(t.bulletActiveClass),
            t.clickable && i.off("click", "." + t.bulletClass);
        }
      },
    },
    A = {
      setTranslate: function () {
        var e = this;
        if (e.params.scrollbar.el && e.scrollbar.el) {
          var t = e.scrollbar,
            i = e.rtlTranslate,
            n = e.progress,
            s = t.dragSize,
            o = t.trackSize,
            a = t.$dragEl,
            r = t.$el,
            l = e.params.scrollbar,
            d = s,
            c = (o - s) * n;
          i
            ? 0 < (c = -c)
              ? ((d = s - c), (c = 0))
              : o < -c + s && (d = o + c)
            : c < 0
            ? ((d = s + c), (c = 0))
            : o < c + s && (d = o - c),
            e.isHorizontal()
              ? (te.transforms3d
                  ? a.transform("translate3d(" + c + "px, 0, 0)")
                  : a.transform("translateX(" + c + "px)"),
                (a[0].style.width = d + "px"))
              : (te.transforms3d
                  ? a.transform("translate3d(0px, " + c + "px, 0)")
                  : a.transform("translateY(" + c + "px)"),
                (a[0].style.height = d + "px")),
            l.hide &&
              (clearTimeout(e.scrollbar.timeout),
              (r[0].style.opacity = 1),
              (e.scrollbar.timeout = setTimeout(function () {
                (r[0].style.opacity = 0), r.transition(400);
              }, 1e3)));
        }
      },
      setTransition: function (e) {
        this.params.scrollbar.el &&
          this.scrollbar.el &&
          this.scrollbar.$dragEl.transition(e);
      },
      updateSize: function () {
        var e = this;
        if (e.params.scrollbar.el && e.scrollbar.el) {
          var t = e.scrollbar,
            i = t.$dragEl,
            n = t.$el;
          (i[0].style.width = ""), (i[0].style.height = "");
          var s,
            o = e.isHorizontal() ? n[0].offsetWidth : n[0].offsetHeight,
            a = e.size / e.virtualSize,
            r = a * (o / e.size);
          (s =
            "auto" === e.params.scrollbar.dragSize
              ? o * a
              : parseInt(e.params.scrollbar.dragSize, 10)),
            e.isHorizontal()
              ? (i[0].style.width = s + "px")
              : (i[0].style.height = s + "px"),
            (n[0].style.display = 1 <= a ? "none" : ""),
            e.params.scrollbar.hide && (n[0].style.opacity = 0),
            ee.extend(t, {
              trackSize: o,
              divider: a,
              moveDivider: r,
              dragSize: s,
            }),
            t.$el[
              e.params.watchOverflow && e.isLocked ? "addClass" : "removeClass"
            ](e.params.scrollbar.lockClass);
        }
      },
      setDragPosition: function (e) {
        var t,
          i = this,
          n = i.scrollbar,
          s = i.rtlTranslate,
          o = n.$el,
          a = n.dragSize,
          r = n.trackSize;
        (t =
          ((i.isHorizontal()
            ? "touchstart" === e.type || "touchmove" === e.type
              ? e.targetTouches[0].pageX
              : e.pageX || e.clientX
            : "touchstart" === e.type || "touchmove" === e.type
            ? e.targetTouches[0].pageY
            : e.pageY || e.clientY) -
            o.offset()[i.isHorizontal() ? "left" : "top"] -
            a / 2) /
          (r - a)),
          (t = Math.max(Math.min(t, 1), 0)),
          s && (t = 1 - t);
        var l = i.minTranslate() + (i.maxTranslate() - i.minTranslate()) * t;
        i.updateProgress(l),
          i.setTranslate(l),
          i.updateActiveIndex(),
          i.updateSlidesClasses();
      },
      onDragStart: function (e) {
        var t = this,
          i = t.params.scrollbar,
          n = t.scrollbar,
          s = t.$wrapperEl,
          o = n.$el,
          a = n.$dragEl;
        (t.scrollbar.isTouched = !0),
          e.preventDefault(),
          e.stopPropagation(),
          s.transition(100),
          a.transition(100),
          n.setDragPosition(e),
          clearTimeout(t.scrollbar.dragTimeout),
          o.transition(0),
          i.hide && o.css("opacity", 1),
          t.emit("scrollbarDragStart", e);
      },
      onDragMove: function (e) {
        var t = this.scrollbar,
          i = this.$wrapperEl,
          n = t.$el,
          s = t.$dragEl;
        this.scrollbar.isTouched &&
          (e.preventDefault ? e.preventDefault() : (e.returnValue = !1),
          t.setDragPosition(e),
          i.transition(0),
          n.transition(0),
          s.transition(0),
          this.emit("scrollbarDragMove", e));
      },
      onDragEnd: function (e) {
        var t = this,
          i = t.params.scrollbar,
          n = t.scrollbar.$el;
        t.scrollbar.isTouched &&
          ((t.scrollbar.isTouched = !1),
          i.hide &&
            (clearTimeout(t.scrollbar.dragTimeout),
            (t.scrollbar.dragTimeout = ee.nextTick(function () {
              n.css("opacity", 0), n.transition(400);
            }, 1e3))),
          t.emit("scrollbarDragEnd", e),
          i.snapOnRelease && t.slideToClosest());
      },
      enableDraggable: function () {
        var e = this;
        if (e.params.scrollbar.el) {
          var t = e.scrollbar,
            i = e.touchEventsTouch,
            n = e.touchEventsDesktop,
            s = e.params,
            o = t.$el[0],
            a = !(!te.passiveListener || !s.passiveListeners) && {
              passive: !1,
              capture: !1,
            },
            r = !(!te.passiveListener || !s.passiveListeners) && {
              passive: !0,
              capture: !1,
            };
          te.touch
            ? (o.addEventListener(i.start, e.scrollbar.onDragStart, a),
              o.addEventListener(i.move, e.scrollbar.onDragMove, a),
              o.addEventListener(i.end, e.scrollbar.onDragEnd, r))
            : (o.addEventListener(n.start, e.scrollbar.onDragStart, a),
              m.addEventListener(n.move, e.scrollbar.onDragMove, a),
              m.addEventListener(n.end, e.scrollbar.onDragEnd, r));
        }
      },
      disableDraggable: function () {
        var e = this;
        if (e.params.scrollbar.el) {
          var t = e.scrollbar,
            i = e.touchEventsTouch,
            n = e.touchEventsDesktop,
            s = e.params,
            o = t.$el[0],
            a = !(!te.passiveListener || !s.passiveListeners) && {
              passive: !1,
              capture: !1,
            },
            r = !(!te.passiveListener || !s.passiveListeners) && {
              passive: !0,
              capture: !1,
            };
          te.touch
            ? (o.removeEventListener(i.start, e.scrollbar.onDragStart, a),
              o.removeEventListener(i.move, e.scrollbar.onDragMove, a),
              o.removeEventListener(i.end, e.scrollbar.onDragEnd, r))
            : (o.removeEventListener(n.start, e.scrollbar.onDragStart, a),
              m.removeEventListener(n.move, e.scrollbar.onDragMove, a),
              m.removeEventListener(n.end, e.scrollbar.onDragEnd, r));
        }
      },
      init: function () {
        var e = this;
        if (e.params.scrollbar.el) {
          var t = e.scrollbar,
            i = e.$el,
            n = e.params.scrollbar,
            s = L(n.el);
          e.params.uniqueNavElements &&
            "string" == typeof n.el &&
            1 < s.length &&
            1 === i.find(n.el).length &&
            (s = i.find(n.el));
          var o = s.find("." + e.params.scrollbar.dragClass);
          0 === o.length &&
            ((o = L(
              '<div class="' + e.params.scrollbar.dragClass + '"></div>'
            )),
            s.append(o)),
            ee.extend(t, { $el: s, el: s[0], $dragEl: o, dragEl: o[0] }),
            n.draggable && t.enableDraggable();
        }
      },
      destroy: function () {
        this.scrollbar.disableDraggable();
      },
    },
    F = {
      setTransform: function (e, t) {
        var i = this.rtl,
          n = L(e),
          s = i ? -1 : 1,
          o = n.attr("data-swiper-parallax") || "0",
          a = n.attr("data-swiper-parallax-x"),
          r = n.attr("data-swiper-parallax-y"),
          l = n.attr("data-swiper-parallax-scale"),
          d = n.attr("data-swiper-parallax-opacity");
        if (
          (a || r
            ? ((a = a || "0"), (r = r || "0"))
            : this.isHorizontal()
            ? ((a = o), (r = "0"))
            : ((r = o), (a = "0")),
          (a =
            0 <= a.indexOf("%")
              ? parseInt(a, 10) * t * s + "%"
              : a * t * s + "px"),
          (r = 0 <= r.indexOf("%") ? parseInt(r, 10) * t + "%" : r * t + "px"),
          null != d)
        ) {
          var c = d - (d - 1) * (1 - Math.abs(t));
          n[0].style.opacity = c;
        }
        if (null == l) n.transform("translate3d(" + a + ", " + r + ", 0px)");
        else {
          var h = l - (l - 1) * (1 - Math.abs(t));
          n.transform(
            "translate3d(" + a + ", " + r + ", 0px) scale(" + h + ")"
          );
        }
      },
      setTranslate: function () {
        var n = this,
          e = n.$el,
          t = n.slides,
          s = n.progress,
          o = n.snapGrid;
        e
          .children(
            "[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]"
          )
          .each(function (e, t) {
            n.parallax.setTransform(t, s);
          }),
          t.each(function (e, t) {
            var i = t.progress;
            1 < n.params.slidesPerGroup &&
              "auto" !== n.params.slidesPerView &&
              (i += Math.ceil(e / 2) - s * (o.length - 1)),
              (i = Math.min(Math.max(i, -1), 1)),
              L(t)
                .find(
                  "[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]"
                )
                .each(function (e, t) {
                  n.parallax.setTransform(t, i);
                });
          });
      },
      setTransition: function (s) {
        void 0 === s && (s = this.params.speed);
        this.$el
          .find(
            "[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]"
          )
          .each(function (e, t) {
            var i = L(t),
              n = parseInt(i.attr("data-swiper-parallax-duration"), 10) || s;
            0 === s && (n = 0), i.transition(n);
          });
      },
    },
    B = {
      getDistanceBetweenTouches: function (e) {
        if (e.targetTouches.length < 2) return 1;
        var t = e.targetTouches[0].pageX,
          i = e.targetTouches[0].pageY,
          n = e.targetTouches[1].pageX,
          s = e.targetTouches[1].pageY;
        return Math.sqrt(Math.pow(n - t, 2) + Math.pow(s - i, 2));
      },
      onGestureStart: function (e) {
        var t = this,
          i = t.params.zoom,
          n = t.zoom,
          s = n.gesture;
        if (
          ((n.fakeGestureTouched = !1), (n.fakeGestureMoved = !1), !te.gestures)
        ) {
          if (
            "touchstart" !== e.type ||
            ("touchstart" === e.type && e.targetTouches.length < 2)
          )
            return;
          (n.fakeGestureTouched = !0),
            (s.scaleStart = B.getDistanceBetweenTouches(e));
        }
        (s.$slideEl && s.$slideEl.length) ||
        ((s.$slideEl = L(e.target).closest(".swiper-slide")),
        0 === s.$slideEl.length && (s.$slideEl = t.slides.eq(t.activeIndex)),
        (s.$imageEl = s.$slideEl.find("img, svg, canvas")),
        (s.$imageWrapEl = s.$imageEl.parent("." + i.containerClass)),
        (s.maxRatio = s.$imageWrapEl.attr("data-swiper-zoom") || i.maxRatio),
        0 !== s.$imageWrapEl.length)
          ? (s.$imageEl.transition(0), (t.zoom.isScaling = !0))
          : (s.$imageEl = void 0);
      },
      onGestureChange: function (e) {
        var t = this.params.zoom,
          i = this.zoom,
          n = i.gesture;
        if (!te.gestures) {
          if (
            "touchmove" !== e.type ||
            ("touchmove" === e.type && e.targetTouches.length < 2)
          )
            return;
          (i.fakeGestureMoved = !0),
            (n.scaleMove = B.getDistanceBetweenTouches(e));
        }
        n.$imageEl &&
          0 !== n.$imageEl.length &&
          ((i.scale = te.gestures
            ? e.scale * i.currentScale
            : (n.scaleMove / n.scaleStart) * i.currentScale),
          i.scale > n.maxRatio &&
            (i.scale =
              n.maxRatio - 1 + Math.pow(i.scale - n.maxRatio + 1, 0.5)),
          i.scale < t.minRatio &&
            (i.scale =
              t.minRatio + 1 - Math.pow(t.minRatio - i.scale + 1, 0.5)),
          n.$imageEl.transform("translate3d(0,0,0) scale(" + i.scale + ")"));
      },
      onGestureEnd: function (e) {
        var t = this.params.zoom,
          i = this.zoom,
          n = i.gesture;
        if (!te.gestures) {
          if (!i.fakeGestureTouched || !i.fakeGestureMoved) return;
          if (
            "touchend" !== e.type ||
            ("touchend" === e.type && e.changedTouches.length < 2 && !v.android)
          )
            return;
          (i.fakeGestureTouched = !1), (i.fakeGestureMoved = !1);
        }
        n.$imageEl &&
          0 !== n.$imageEl.length &&
          ((i.scale = Math.max(Math.min(i.scale, n.maxRatio), t.minRatio)),
          n.$imageEl
            .transition(this.params.speed)
            .transform("translate3d(0,0,0) scale(" + i.scale + ")"),
          (i.currentScale = i.scale),
          (i.isScaling = !1),
          1 === i.scale && (n.$slideEl = void 0));
      },
      onTouchStart: function (e) {
        var t = this.zoom,
          i = t.gesture,
          n = t.image;
        i.$imageEl &&
          0 !== i.$imageEl.length &&
          (n.isTouched ||
            (v.android && e.preventDefault(),
            (n.isTouched = !0),
            (n.touchesStart.x =
              "touchstart" === e.type ? e.targetTouches[0].pageX : e.pageX),
            (n.touchesStart.y =
              "touchstart" === e.type ? e.targetTouches[0].pageY : e.pageY)));
      },
      onTouchMove: function (e) {
        var t = this,
          i = t.zoom,
          n = i.gesture,
          s = i.image,
          o = i.velocity;
        if (
          n.$imageEl &&
          0 !== n.$imageEl.length &&
          ((t.allowClick = !1), s.isTouched && n.$slideEl)
        ) {
          s.isMoved ||
            ((s.width = n.$imageEl[0].offsetWidth),
            (s.height = n.$imageEl[0].offsetHeight),
            (s.startX = ee.getTranslate(n.$imageWrapEl[0], "x") || 0),
            (s.startY = ee.getTranslate(n.$imageWrapEl[0], "y") || 0),
            (n.slideWidth = n.$slideEl[0].offsetWidth),
            (n.slideHeight = n.$slideEl[0].offsetHeight),
            n.$imageWrapEl.transition(0),
            t.rtl && ((s.startX = -s.startX), (s.startY = -s.startY)));
          var a = s.width * i.scale,
            r = s.height * i.scale;
          if (!(a < n.slideWidth && r < n.slideHeight)) {
            if (
              ((s.minX = Math.min(n.slideWidth / 2 - a / 2, 0)),
              (s.maxX = -s.minX),
              (s.minY = Math.min(n.slideHeight / 2 - r / 2, 0)),
              (s.maxY = -s.minY),
              (s.touchesCurrent.x =
                "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX),
              (s.touchesCurrent.y =
                "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY),
              !s.isMoved && !i.isScaling)
            ) {
              if (
                t.isHorizontal() &&
                ((Math.floor(s.minX) === Math.floor(s.startX) &&
                  s.touchesCurrent.x < s.touchesStart.x) ||
                  (Math.floor(s.maxX) === Math.floor(s.startX) &&
                    s.touchesCurrent.x > s.touchesStart.x))
              )
                return void (s.isTouched = !1);
              if (
                !t.isHorizontal() &&
                ((Math.floor(s.minY) === Math.floor(s.startY) &&
                  s.touchesCurrent.y < s.touchesStart.y) ||
                  (Math.floor(s.maxY) === Math.floor(s.startY) &&
                    s.touchesCurrent.y > s.touchesStart.y))
              )
                return void (s.isTouched = !1);
            }
            e.preventDefault(),
              e.stopPropagation(),
              (s.isMoved = !0),
              (s.currentX = s.touchesCurrent.x - s.touchesStart.x + s.startX),
              (s.currentY = s.touchesCurrent.y - s.touchesStart.y + s.startY),
              s.currentX < s.minX &&
                (s.currentX =
                  s.minX + 1 - Math.pow(s.minX - s.currentX + 1, 0.8)),
              s.currentX > s.maxX &&
                (s.currentX =
                  s.maxX - 1 + Math.pow(s.currentX - s.maxX + 1, 0.8)),
              s.currentY < s.minY &&
                (s.currentY =
                  s.minY + 1 - Math.pow(s.minY - s.currentY + 1, 0.8)),
              s.currentY > s.maxY &&
                (s.currentY =
                  s.maxY - 1 + Math.pow(s.currentY - s.maxY + 1, 0.8)),
              o.prevPositionX || (o.prevPositionX = s.touchesCurrent.x),
              o.prevPositionY || (o.prevPositionY = s.touchesCurrent.y),
              o.prevTime || (o.prevTime = Date.now()),
              (o.x =
                (s.touchesCurrent.x - o.prevPositionX) /
                (Date.now() - o.prevTime) /
                2),
              (o.y =
                (s.touchesCurrent.y - o.prevPositionY) /
                (Date.now() - o.prevTime) /
                2),
              Math.abs(s.touchesCurrent.x - o.prevPositionX) < 2 && (o.x = 0),
              Math.abs(s.touchesCurrent.y - o.prevPositionY) < 2 && (o.y = 0),
              (o.prevPositionX = s.touchesCurrent.x),
              (o.prevPositionY = s.touchesCurrent.y),
              (o.prevTime = Date.now()),
              n.$imageWrapEl.transform(
                "translate3d(" + s.currentX + "px, " + s.currentY + "px,0)"
              );
          }
        }
      },
      onTouchEnd: function () {
        var e = this.zoom,
          t = e.gesture,
          i = e.image,
          n = e.velocity;
        if (t.$imageEl && 0 !== t.$imageEl.length) {
          if (!i.isTouched || !i.isMoved)
            return (i.isTouched = !1), void (i.isMoved = !1);
          (i.isTouched = !1), (i.isMoved = !1);
          var s = 300,
            o = 300,
            a = n.x * s,
            r = i.currentX + a,
            l = n.y * o,
            d = i.currentY + l;
          0 !== n.x && (s = Math.abs((r - i.currentX) / n.x)),
            0 !== n.y && (o = Math.abs((d - i.currentY) / n.y));
          var c = Math.max(s, o);
          (i.currentX = r), (i.currentY = d);
          var h = i.width * e.scale,
            p = i.height * e.scale;
          (i.minX = Math.min(t.slideWidth / 2 - h / 2, 0)),
            (i.maxX = -i.minX),
            (i.minY = Math.min(t.slideHeight / 2 - p / 2, 0)),
            (i.maxY = -i.minY),
            (i.currentX = Math.max(Math.min(i.currentX, i.maxX), i.minX)),
            (i.currentY = Math.max(Math.min(i.currentY, i.maxY), i.minY)),
            t.$imageWrapEl
              .transition(c)
              .transform(
                "translate3d(" + i.currentX + "px, " + i.currentY + "px,0)"
              );
        }
      },
      onTransitionEnd: function () {
        var e = this.zoom,
          t = e.gesture;
        t.$slideEl &&
          this.previousIndex !== this.activeIndex &&
          (t.$imageEl.transform("translate3d(0,0,0) scale(1)"),
          t.$imageWrapEl.transform("translate3d(0,0,0)"),
          (e.scale = 1),
          (e.currentScale = 1),
          (t.$slideEl = void 0),
          (t.$imageEl = void 0),
          (t.$imageWrapEl = void 0));
      },
      toggle: function (e) {
        var t = this.zoom;
        t.scale && 1 !== t.scale ? t.out() : t.in(e);
      },
      in: function (e) {
        var t,
          i,
          n,
          s,
          o,
          a,
          r,
          l,
          d,
          c,
          h,
          p,
          u,
          f,
          m,
          g,
          v = this,
          w = v.zoom,
          b = v.params.zoom,
          y = w.gesture,
          x = w.image;
        y.$slideEl ||
          ((y.$slideEl = v.clickedSlide
            ? L(v.clickedSlide)
            : v.slides.eq(v.activeIndex)),
          (y.$imageEl = y.$slideEl.find("img, svg, canvas")),
          (y.$imageWrapEl = y.$imageEl.parent("." + b.containerClass))),
          y.$imageEl &&
            0 !== y.$imageEl.length &&
            (y.$slideEl.addClass("" + b.zoomedSlideClass),
            (i =
              void 0 === x.touchesStart.x && e
                ? ((t =
                    "touchend" === e.type
                      ? e.changedTouches[0].pageX
                      : e.pageX),
                  "touchend" === e.type ? e.changedTouches[0].pageY : e.pageY)
                : ((t = x.touchesStart.x), x.touchesStart.y)),
            (w.scale = y.$imageWrapEl.attr("data-swiper-zoom") || b.maxRatio),
            (w.currentScale =
              y.$imageWrapEl.attr("data-swiper-zoom") || b.maxRatio),
            e
              ? ((m = y.$slideEl[0].offsetWidth),
                (g = y.$slideEl[0].offsetHeight),
                (n = y.$slideEl.offset().left + m / 2 - t),
                (s = y.$slideEl.offset().top + g / 2 - i),
                (r = y.$imageEl[0].offsetWidth),
                (l = y.$imageEl[0].offsetHeight),
                (d = r * w.scale),
                (c = l * w.scale),
                (u = -(h = Math.min(m / 2 - d / 2, 0))),
                (f = -(p = Math.min(g / 2 - c / 2, 0))),
                (o = n * w.scale) < h && (o = h),
                u < o && (o = u),
                (a = s * w.scale) < p && (a = p),
                f < a && (a = f))
              : (a = o = 0),
            y.$imageWrapEl
              .transition(300)
              .transform("translate3d(" + o + "px, " + a + "px,0)"),
            y.$imageEl
              .transition(300)
              .transform("translate3d(0,0,0) scale(" + w.scale + ")"));
      },
      out: function () {
        var e = this,
          t = e.zoom,
          i = e.params.zoom,
          n = t.gesture;
        n.$slideEl ||
          ((n.$slideEl = e.clickedSlide
            ? L(e.clickedSlide)
            : e.slides.eq(e.activeIndex)),
          (n.$imageEl = n.$slideEl.find("img, svg, canvas")),
          (n.$imageWrapEl = n.$imageEl.parent("." + i.containerClass))),
          n.$imageEl &&
            0 !== n.$imageEl.length &&
            ((t.scale = 1),
            (t.currentScale = 1),
            n.$imageWrapEl.transition(300).transform("translate3d(0,0,0)"),
            n.$imageEl.transition(300).transform("translate3d(0,0,0) scale(1)"),
            n.$slideEl.removeClass("" + i.zoomedSlideClass),
            (n.$slideEl = void 0));
      },
      enable: function () {
        var e = this,
          t = e.zoom;
        if (!t.enabled) {
          t.enabled = !0;
          var i = !(
            "touchstart" !== e.touchEvents.start ||
            !te.passiveListener ||
            !e.params.passiveListeners
          ) && { passive: !0, capture: !1 };
          te.gestures
            ? (e.$wrapperEl.on(
                "gesturestart",
                ".swiper-slide",
                t.onGestureStart,
                i
              ),
              e.$wrapperEl.on(
                "gesturechange",
                ".swiper-slide",
                t.onGestureChange,
                i
              ),
              e.$wrapperEl.on("gestureend", ".swiper-slide", t.onGestureEnd, i))
            : "touchstart" === e.touchEvents.start &&
              (e.$wrapperEl.on(
                e.touchEvents.start,
                ".swiper-slide",
                t.onGestureStart,
                i
              ),
              e.$wrapperEl.on(
                e.touchEvents.move,
                ".swiper-slide",
                t.onGestureChange,
                i
              ),
              e.$wrapperEl.on(
                e.touchEvents.end,
                ".swiper-slide",
                t.onGestureEnd,
                i
              )),
            e.$wrapperEl.on(
              e.touchEvents.move,
              "." + e.params.zoom.containerClass,
              t.onTouchMove
            );
        }
      },
      disable: function () {
        var e = this,
          t = e.zoom;
        if (t.enabled) {
          e.zoom.enabled = !1;
          var i = !(
            "touchstart" !== e.touchEvents.start ||
            !te.passiveListener ||
            !e.params.passiveListeners
          ) && { passive: !0, capture: !1 };
          te.gestures
            ? (e.$wrapperEl.off(
                "gesturestart",
                ".swiper-slide",
                t.onGestureStart,
                i
              ),
              e.$wrapperEl.off(
                "gesturechange",
                ".swiper-slide",
                t.onGestureChange,
                i
              ),
              e.$wrapperEl.off(
                "gestureend",
                ".swiper-slide",
                t.onGestureEnd,
                i
              ))
            : "touchstart" === e.touchEvents.start &&
              (e.$wrapperEl.off(
                e.touchEvents.start,
                ".swiper-slide",
                t.onGestureStart,
                i
              ),
              e.$wrapperEl.off(
                e.touchEvents.move,
                ".swiper-slide",
                t.onGestureChange,
                i
              ),
              e.$wrapperEl.off(
                e.touchEvents.end,
                ".swiper-slide",
                t.onGestureEnd,
                i
              )),
            e.$wrapperEl.off(
              e.touchEvents.move,
              "." + e.params.zoom.containerClass,
              t.onTouchMove
            );
        }
      },
    },
    N = {
      loadInSlide: function (e, l) {
        void 0 === l && (l = !0);
        var d = this,
          c = d.params.lazy;
        if (void 0 !== e && 0 !== d.slides.length) {
          var h =
              d.virtual && d.params.virtual.enabled
                ? d.$wrapperEl.children(
                    "." +
                      d.params.slideClass +
                      '[data-swiper-slide-index="' +
                      e +
                      '"]'
                  )
                : d.slides.eq(e),
            t = h.find(
              "." +
                c.elementClass +
                ":not(." +
                c.loadedClass +
                "):not(." +
                c.loadingClass +
                ")"
            );
          !h.hasClass(c.elementClass) ||
            h.hasClass(c.loadedClass) ||
            h.hasClass(c.loadingClass) ||
            (t = t.add(h[0])),
            0 !== t.length &&
              t.each(function (e, t) {
                var n = L(t);
                n.addClass(c.loadingClass);
                var s = n.attr("data-background"),
                  o = n.attr("data-src"),
                  a = n.attr("data-srcset"),
                  r = n.attr("data-sizes");
                d.loadImage(n[0], o || s, a, r, !1, function () {
                  if (null != d && d && (!d || d.params) && !d.destroyed) {
                    if (
                      (s
                        ? (n.css("background-image", 'url("' + s + '")'),
                          n.removeAttr("data-background"))
                        : (a &&
                            (n.attr("srcset", a), n.removeAttr("data-srcset")),
                          r && (n.attr("sizes", r), n.removeAttr("data-sizes")),
                          o && (n.attr("src", o), n.removeAttr("data-src"))),
                      n.addClass(c.loadedClass).removeClass(c.loadingClass),
                      h.find("." + c.preloaderClass).remove(),
                      d.params.loop && l)
                    ) {
                      var e = h.attr("data-swiper-slide-index");
                      if (h.hasClass(d.params.slideDuplicateClass)) {
                        var t = d.$wrapperEl.children(
                          '[data-swiper-slide-index="' +
                            e +
                            '"]:not(.' +
                            d.params.slideDuplicateClass +
                            ")"
                        );
                        d.lazy.loadInSlide(t.index(), !1);
                      } else {
                        var i = d.$wrapperEl.children(
                          "." +
                            d.params.slideDuplicateClass +
                            '[data-swiper-slide-index="' +
                            e +
                            '"]'
                        );
                        d.lazy.loadInSlide(i.index(), !1);
                      }
                    }
                    d.emit("lazyImageReady", h[0], n[0]);
                  }
                }),
                  d.emit("lazyImageLoad", h[0], n[0]);
              });
        }
      },
      load: function () {
        var n = this,
          t = n.$wrapperEl,
          i = n.params,
          s = n.slides,
          e = n.activeIndex,
          o = n.virtual && i.virtual.enabled,
          a = i.lazy,
          r = i.slidesPerView;
        function l(e) {
          if (o) {
            if (
              t.children(
                "." + i.slideClass + '[data-swiper-slide-index="' + e + '"]'
              ).length
            )
              return !0;
          } else if (s[e]) return !0;
          return !1;
        }
        function d(e) {
          return o ? L(e).attr("data-swiper-slide-index") : L(e).index();
        }
        if (
          ("auto" === r && (r = 0),
          n.lazy.initialImageLoaded || (n.lazy.initialImageLoaded = !0),
          n.params.watchSlidesVisibility)
        )
          t.children("." + i.slideVisibleClass).each(function (e, t) {
            var i = o ? L(t).attr("data-swiper-slide-index") : L(t).index();
            n.lazy.loadInSlide(i);
          });
        else if (1 < r)
          for (var c = e; c < e + r; c += 1) l(c) && n.lazy.loadInSlide(c);
        else n.lazy.loadInSlide(e);
        if (a.loadPrevNext)
          if (1 < r || (a.loadPrevNextAmount && 1 < a.loadPrevNextAmount)) {
            for (
              var h = a.loadPrevNextAmount,
                p = r,
                u = Math.min(e + p + Math.max(h, p), s.length),
                f = Math.max(e - Math.max(p, h), 0),
                m = e + r;
              m < u;
              m += 1
            )
              l(m) && n.lazy.loadInSlide(m);
            for (var g = f; g < e; g += 1) l(g) && n.lazy.loadInSlide(g);
          } else {
            var v = t.children("." + i.slideNextClass);
            0 < v.length && n.lazy.loadInSlide(d(v));
            var w = t.children("." + i.slidePrevClass);
            0 < w.length && n.lazy.loadInSlide(d(w));
          }
      },
    },
    R = {
      LinearSpline: function (e, t) {
        var i,
          n,
          s,
          o,
          a,
          r = function (e, t) {
            for (n = -1, i = e.length; 1 < i - n; )
              e[(s = (i + n) >> 1)] <= t ? (n = s) : (i = s);
            return i;
          };
        return (
          (this.x = e),
          (this.y = t),
          (this.lastIndex = e.length - 1),
          (this.interpolate = function (e) {
            return e
              ? ((a = r(this.x, e)),
                (o = a - 1),
                ((e - this.x[o]) * (this.y[a] - this.y[o])) /
                  (this.x[a] - this.x[o]) +
                  this.y[o])
              : 0;
          }),
          this
        );
      },
      getInterpolateFunction: function (e) {
        var t = this;
        t.controller.spline ||
          (t.controller.spline = t.params.loop
            ? new R.LinearSpline(t.slidesGrid, e.slidesGrid)
            : new R.LinearSpline(t.snapGrid, e.snapGrid));
      },
      setTranslate: function (e, t) {
        var i,
          n,
          s = this,
          o = s.controller.control;
        function a(e) {
          var t = s.rtlTranslate ? -s.translate : s.translate;
          "slide" === s.params.controller.by &&
            (s.controller.getInterpolateFunction(e),
            (n = -s.controller.spline.interpolate(-t))),
            (n && "container" !== s.params.controller.by) ||
              ((i =
                (e.maxTranslate() - e.minTranslate()) /
                (s.maxTranslate() - s.minTranslate())),
              (n = (t - s.minTranslate()) * i + e.minTranslate())),
            s.params.controller.inverse && (n = e.maxTranslate() - n),
            e.updateProgress(n),
            e.setTranslate(n, s),
            e.updateActiveIndex(),
            e.updateSlidesClasses();
        }
        if (Array.isArray(o))
          for (var r = 0; r < o.length; r += 1)
            o[r] !== t && o[r] instanceof T && a(o[r]);
        else o instanceof T && t !== o && a(o);
      },
      setTransition: function (t, e) {
        var i,
          n = this,
          s = n.controller.control;
        function o(e) {
          e.setTransition(t, n),
            0 !== t &&
              (e.transitionStart(),
              e.params.autoHeight &&
                ee.nextTick(function () {
                  e.updateAutoHeight();
                }),
              e.$wrapperEl.transitionEnd(function () {
                s &&
                  (e.params.loop &&
                    "slide" === n.params.controller.by &&
                    e.loopFix(),
                  e.transitionEnd());
              }));
        }
        if (Array.isArray(s))
          for (i = 0; i < s.length; i += 1)
            s[i] !== e && s[i] instanceof T && o(s[i]);
        else s instanceof T && e !== s && o(s);
      },
    },
    Y = {
      makeElFocusable: function (e) {
        return e.attr("tabIndex", "0"), e;
      },
      addElRole: function (e, t) {
        return e.attr("role", t), e;
      },
      addElLabel: function (e, t) {
        return e.attr("aria-label", t), e;
      },
      disableEl: function (e) {
        return e.attr("aria-disabled", !0), e;
      },
      enableEl: function (e) {
        return e.attr("aria-disabled", !1), e;
      },
      onEnterKey: function (e) {
        var t = this,
          i = t.params.a11y;
        if (13 === e.keyCode) {
          var n = L(e.target);
          t.navigation &&
            t.navigation.$nextEl &&
            n.is(t.navigation.$nextEl) &&
            ((t.isEnd && !t.params.loop) || t.slideNext(),
            t.isEnd
              ? t.a11y.notify(i.lastSlideMessage)
              : t.a11y.notify(i.nextSlideMessage)),
            t.navigation &&
              t.navigation.$prevEl &&
              n.is(t.navigation.$prevEl) &&
              ((t.isBeginning && !t.params.loop) || t.slidePrev(),
              t.isBeginning
                ? t.a11y.notify(i.firstSlideMessage)
                : t.a11y.notify(i.prevSlideMessage)),
            t.pagination &&
              n.is("." + t.params.pagination.bulletClass) &&
              n[0].click();
        }
      },
      notify: function (e) {
        var t = this.a11y.liveRegion;
        0 !== t.length && (t.html(""), t.html(e));
      },
      updateNavigation: function () {
        var e = this;
        if (!e.params.loop) {
          var t = e.navigation,
            i = t.$nextEl,
            n = t.$prevEl;
          n &&
            0 < n.length &&
            (e.isBeginning ? e.a11y.disableEl(n) : e.a11y.enableEl(n)),
            i &&
              0 < i.length &&
              (e.isEnd ? e.a11y.disableEl(i) : e.a11y.enableEl(i));
        }
      },
      updatePagination: function () {
        var n = this,
          s = n.params.a11y;
        n.pagination &&
          n.params.pagination.clickable &&
          n.pagination.bullets &&
          n.pagination.bullets.length &&
          n.pagination.bullets.each(function (e, t) {
            var i = L(t);
            n.a11y.makeElFocusable(i),
              n.a11y.addElRole(i, "button"),
              n.a11y.addElLabel(
                i,
                s.paginationBulletMessage.replace(/{{index}}/, i.index() + 1)
              );
          });
      },
      init: function () {
        var e = this;
        e.$el.append(e.a11y.liveRegion);
        var t,
          i,
          n = e.params.a11y;
        e.navigation && e.navigation.$nextEl && (t = e.navigation.$nextEl),
          e.navigation && e.navigation.$prevEl && (i = e.navigation.$prevEl),
          t &&
            (e.a11y.makeElFocusable(t),
            e.a11y.addElRole(t, "button"),
            e.a11y.addElLabel(t, n.nextSlideMessage),
            t.on("keydown", e.a11y.onEnterKey)),
          i &&
            (e.a11y.makeElFocusable(i),
            e.a11y.addElRole(i, "button"),
            e.a11y.addElLabel(i, n.prevSlideMessage),
            i.on("keydown", e.a11y.onEnterKey)),
          e.pagination &&
            e.params.pagination.clickable &&
            e.pagination.bullets &&
            e.pagination.bullets.length &&
            e.pagination.$el.on(
              "keydown",
              "." + e.params.pagination.bulletClass,
              e.a11y.onEnterKey
            );
      },
      destroy: function () {
        var e,
          t,
          i = this;
        i.a11y.liveRegion &&
          0 < i.a11y.liveRegion.length &&
          i.a11y.liveRegion.remove(),
          i.navigation && i.navigation.$nextEl && (e = i.navigation.$nextEl),
          i.navigation && i.navigation.$prevEl && (t = i.navigation.$prevEl),
          e && e.off("keydown", i.a11y.onEnterKey),
          t && t.off("keydown", i.a11y.onEnterKey),
          i.pagination &&
            i.params.pagination.clickable &&
            i.pagination.bullets &&
            i.pagination.bullets.length &&
            i.pagination.$el.off(
              "keydown",
              "." + i.params.pagination.bulletClass,
              i.a11y.onEnterKey
            );
      },
    },
    V = {
      init: function () {
        var e = this;
        if (e.params.history) {
          if (!J.history || !J.history.pushState)
            return (
              (e.params.history.enabled = !1),
              void (e.params.hashNavigation.enabled = !0)
            );
          var t = e.history;
          (t.initialized = !0),
            (t.paths = V.getPathValues()),
            (t.paths.key || t.paths.value) &&
              (t.scrollToSlide(0, t.paths.value, e.params.runCallbacksOnInit),
              e.params.history.replaceState ||
                J.addEventListener("popstate", e.history.setHistoryPopState));
        }
      },
      destroy: function () {
        this.params.history.replaceState ||
          J.removeEventListener("popstate", this.history.setHistoryPopState);
      },
      setHistoryPopState: function () {
        (this.history.paths = V.getPathValues()),
          this.history.scrollToSlide(
            this.params.speed,
            this.history.paths.value,
            !1
          );
      },
      getPathValues: function () {
        var e = J.location.pathname
            .slice(1)
            .split("/")
            .filter(function (e) {
              return "" !== e;
            }),
          t = e.length;
        return { key: e[t - 2], value: e[t - 1] };
      },
      setHistory: function (e, t) {
        if (this.history.initialized && this.params.history.enabled) {
          var i = this.slides.eq(t),
            n = V.slugify(i.attr("data-history"));
          J.location.pathname.includes(e) || (n = e + "/" + n);
          var s = J.history.state;
          (s && s.value === n) ||
            (this.params.history.replaceState
              ? J.history.replaceState({ value: n }, null, n)
              : J.history.pushState({ value: n }, null, n));
        }
      },
      slugify: function (e) {
        return e
          .toString()
          .replace(/\s+/g, "-")
          .replace(/[^\w-]+/g, "")
          .replace(/--+/g, "-")
          .replace(/^-+/, "")
          .replace(/-+$/, "");
      },
      scrollToSlide: function (e, t, i) {
        var n = this;
        if (t)
          for (var s = 0, o = n.slides.length; s < o; s += 1) {
            var a = n.slides.eq(s);
            if (
              V.slugify(a.attr("data-history")) === t &&
              !a.hasClass(n.params.slideDuplicateClass)
            ) {
              var r = a.index();
              n.slideTo(r, e, i);
            }
          }
        else n.slideTo(0, e, i);
      },
    },
    X = {
      onHashCange: function () {
        var e = this,
          t = m.location.hash.replace("#", "");
        if (t !== e.slides.eq(e.activeIndex).attr("data-hash")) {
          var i = e.$wrapperEl
            .children("." + e.params.slideClass + '[data-hash="' + t + '"]')
            .index();
          if (void 0 === i) return;
          e.slideTo(i);
        }
      },
      setHash: function () {
        var e = this;
        if (e.hashNavigation.initialized && e.params.hashNavigation.enabled)
          if (
            e.params.hashNavigation.replaceState &&
            J.history &&
            J.history.replaceState
          )
            J.history.replaceState(
              null,
              null,
              "#" + e.slides.eq(e.activeIndex).attr("data-hash") || ""
            );
          else {
            var t = e.slides.eq(e.activeIndex),
              i = t.attr("data-hash") || t.attr("data-history");
            m.location.hash = i || "";
          }
      },
      init: function () {
        var e = this;
        if (
          !(
            !e.params.hashNavigation.enabled ||
            (e.params.history && e.params.history.enabled)
          )
        ) {
          e.hashNavigation.initialized = !0;
          var t = m.location.hash.replace("#", "");
          if (t)
            for (var i = 0, n = e.slides.length; i < n; i += 1) {
              var s = e.slides.eq(i);
              if (
                (s.attr("data-hash") || s.attr("data-history")) === t &&
                !s.hasClass(e.params.slideDuplicateClass)
              ) {
                var o = s.index();
                e.slideTo(o, 0, e.params.runCallbacksOnInit, !0);
              }
            }
          e.params.hashNavigation.watchState &&
            L(J).on("hashchange", e.hashNavigation.onHashCange);
        }
      },
      destroy: function () {
        this.params.hashNavigation.watchState &&
          L(J).off("hashchange", this.hashNavigation.onHashCange);
      },
    },
    j = {
      run: function () {
        var e = this,
          t = e.slides.eq(e.activeIndex),
          i = e.params.autoplay.delay;
        t.attr("data-swiper-autoplay") &&
          (i = t.attr("data-swiper-autoplay") || e.params.autoplay.delay),
          (e.autoplay.timeout = ee.nextTick(function () {
            e.params.autoplay.reverseDirection
              ? e.params.loop
                ? (e.loopFix(),
                  e.slidePrev(e.params.speed, !0, !0),
                  e.emit("autoplay"))
                : e.isBeginning
                ? e.params.autoplay.stopOnLastSlide
                  ? e.autoplay.stop()
                  : (e.slideTo(e.slides.length - 1, e.params.speed, !0, !0),
                    e.emit("autoplay"))
                : (e.slidePrev(e.params.speed, !0, !0), e.emit("autoplay"))
              : e.params.loop
              ? (e.loopFix(),
                e.slideNext(e.params.speed, !0, !0),
                e.emit("autoplay"))
              : e.isEnd
              ? e.params.autoplay.stopOnLastSlide
                ? e.autoplay.stop()
                : (e.slideTo(0, e.params.speed, !0, !0), e.emit("autoplay"))
              : (e.slideNext(e.params.speed, !0, !0), e.emit("autoplay"));
          }, i));
      },
      start: function () {
        var e = this;
        return (
          void 0 === e.autoplay.timeout &&
          !e.autoplay.running &&
          ((e.autoplay.running = !0),
          e.emit("autoplayStart"),
          e.autoplay.run(),
          !0)
        );
      },
      stop: function () {
        var e = this;
        return (
          !!e.autoplay.running &&
          void 0 !== e.autoplay.timeout &&
          (e.autoplay.timeout &&
            (clearTimeout(e.autoplay.timeout), (e.autoplay.timeout = void 0)),
          (e.autoplay.running = !1),
          e.emit("autoplayStop"),
          !0)
        );
      },
      pause: function (e) {
        var t = this;
        t.autoplay.running &&
          (t.autoplay.paused ||
            (t.autoplay.timeout && clearTimeout(t.autoplay.timeout),
            (t.autoplay.paused = !0),
            0 !== e && t.params.autoplay.waitForTransition
              ? (t.$wrapperEl[0].addEventListener(
                  "transitionend",
                  t.autoplay.onTransitionEnd
                ),
                t.$wrapperEl[0].addEventListener(
                  "webkitTransitionEnd",
                  t.autoplay.onTransitionEnd
                ))
              : ((t.autoplay.paused = !1), t.autoplay.run())));
      },
    },
    q = {
      setTranslate: function () {
        for (var e = this, t = e.slides, i = 0; i < t.length; i += 1) {
          var n = e.slides.eq(i),
            s = -n[0].swiperSlideOffset;
          e.params.virtualTranslate || (s -= e.translate);
          var o = 0;
          e.isHorizontal() || ((o = s), (s = 0));
          var a = e.params.fadeEffect.crossFade
            ? Math.max(1 - Math.abs(n[0].progress), 0)
            : 1 + Math.min(Math.max(n[0].progress, -1), 0);
          n.css({ opacity: a }).transform(
            "translate3d(" + s + "px, " + o + "px, 0px)"
          );
        }
      },
      setTransition: function (e) {
        var i = this,
          t = i.slides,
          n = i.$wrapperEl;
        if ((t.transition(e), i.params.virtualTranslate && 0 !== e)) {
          var s = !1;
          t.transitionEnd(function () {
            if (!s && i && !i.destroyed) {
              (s = !0), (i.animating = !1);
              for (
                var e = ["webkitTransitionEnd", "transitionend"], t = 0;
                t < e.length;
                t += 1
              )
                n.trigger(e[t]);
            }
          });
        }
      },
    },
    G = {
      setTranslate: function () {
        var e,
          t = this,
          i = t.$el,
          n = t.$wrapperEl,
          s = t.slides,
          o = t.width,
          a = t.height,
          r = t.rtlTranslate,
          l = t.size,
          d = t.params.cubeEffect,
          c = t.isHorizontal(),
          h = t.virtual && t.params.virtual.enabled,
          p = 0;
        d.shadow &&
          (c
            ? (0 === (e = n.find(".swiper-cube-shadow")).length &&
                ((e = L('<div class="swiper-cube-shadow"></div>')),
                n.append(e)),
              e.css({ height: o + "px" }))
            : 0 === (e = i.find(".swiper-cube-shadow")).length &&
              ((e = L('<div class="swiper-cube-shadow"></div>')), i.append(e)));
        for (var u = 0; u < s.length; u += 1) {
          var f = s.eq(u),
            m = u;
          h && (m = parseInt(f.attr("data-swiper-slide-index"), 10));
          var g = 90 * m,
            v = Math.floor(g / 360);
          r && ((g = -g), (v = Math.floor(-g / 360)));
          var w = Math.max(Math.min(f[0].progress, 1), -1),
            b = 0,
            y = 0,
            x = 0;
          m % 4 == 0
            ? ((b = 4 * -v * l), (x = 0))
            : (m - 1) % 4 == 0
            ? ((b = 0), (x = 4 * -v * l))
            : (m - 2) % 4 == 0
            ? ((b = l + 4 * v * l), (x = l))
            : (m - 3) % 4 == 0 && ((b = -l), (x = 3 * l + 4 * l * v)),
            r && (b = -b),
            c || ((y = b), (b = 0));
          var T =
            "rotateX(" +
            (c ? 0 : -g) +
            "deg) rotateY(" +
            (c ? g : 0) +
            "deg) translate3d(" +
            b +
            "px, " +
            y +
            "px, " +
            x +
            "px)";
          if (
            (w <= 1 &&
              -1 < w &&
              ((p = 90 * m + 90 * w), r && (p = 90 * -m - 90 * w)),
            f.transform(T),
            d.slideShadows)
          ) {
            var C = c
                ? f.find(".swiper-slide-shadow-left")
                : f.find(".swiper-slide-shadow-top"),
              z = c
                ? f.find(".swiper-slide-shadow-right")
                : f.find(".swiper-slide-shadow-bottom");
            0 === C.length &&
              ((C = L(
                '<div class="swiper-slide-shadow-' +
                  (c ? "left" : "top") +
                  '"></div>'
              )),
              f.append(C)),
              0 === z.length &&
                ((z = L(
                  '<div class="swiper-slide-shadow-' +
                    (c ? "right" : "bottom") +
                    '"></div>'
                )),
                f.append(z)),
              C.length && (C[0].style.opacity = Math.max(-w, 0)),
              z.length && (z[0].style.opacity = Math.max(w, 0));
          }
        }
        if (
          (n.css({
            "-webkit-transform-origin": "50% 50% -" + l / 2 + "px",
            "-moz-transform-origin": "50% 50% -" + l / 2 + "px",
            "-ms-transform-origin": "50% 50% -" + l / 2 + "px",
            "transform-origin": "50% 50% -" + l / 2 + "px",
          }),
          d.shadow)
        )
          if (c)
            e.transform(
              "translate3d(0px, " +
                (o / 2 + d.shadowOffset) +
                "px, " +
                -o / 2 +
                "px) rotateX(90deg) rotateZ(0deg) scale(" +
                d.shadowScale +
                ")"
            );
          else {
            var S = Math.abs(p) - 90 * Math.floor(Math.abs(p) / 90),
              E =
                1.5 -
                (Math.sin((2 * S * Math.PI) / 360) / 2 +
                  Math.cos((2 * S * Math.PI) / 360) / 2),
              k = d.shadowScale,
              M = d.shadowScale / E,
              P = d.shadowOffset;
            e.transform(
              "scale3d(" +
                k +
                ", 1, " +
                M +
                ") translate3d(0px, " +
                (a / 2 + P) +
                "px, " +
                -a / 2 / M +
                "px) rotateX(-90deg)"
            );
          }
        var $ = I.isSafari || I.isUiWebView ? -l / 2 : 0;
        n.transform(
          "translate3d(0px,0," +
            $ +
            "px) rotateX(" +
            (t.isHorizontal() ? 0 : p) +
            "deg) rotateY(" +
            (t.isHorizontal() ? -p : 0) +
            "deg)"
        );
      },
      setTransition: function (e) {
        var t = this.$el;
        this.slides
          .transition(e)
          .find(
            ".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left"
          )
          .transition(e),
          this.params.cubeEffect.shadow &&
            !this.isHorizontal() &&
            t.find(".swiper-cube-shadow").transition(e);
      },
    },
    Z = {
      setTranslate: function () {
        for (
          var e = this, t = e.slides, i = e.rtlTranslate, n = 0;
          n < t.length;
          n += 1
        ) {
          var s = t.eq(n),
            o = s[0].progress;
          e.params.flipEffect.limitRotation &&
            (o = Math.max(Math.min(s[0].progress, 1), -1));
          var a = -180 * o,
            r = 0,
            l = -s[0].swiperSlideOffset,
            d = 0;
          if (
            (e.isHorizontal()
              ? i && (a = -a)
              : ((d = l), (r = -a), (a = l = 0)),
            (s[0].style.zIndex = -Math.abs(Math.round(o)) + t.length),
            e.params.flipEffect.slideShadows)
          ) {
            var c = e.isHorizontal()
                ? s.find(".swiper-slide-shadow-left")
                : s.find(".swiper-slide-shadow-top"),
              h = e.isHorizontal()
                ? s.find(".swiper-slide-shadow-right")
                : s.find(".swiper-slide-shadow-bottom");
            0 === c.length &&
              ((c = L(
                '<div class="swiper-slide-shadow-' +
                  (e.isHorizontal() ? "left" : "top") +
                  '"></div>'
              )),
              s.append(c)),
              0 === h.length &&
                ((h = L(
                  '<div class="swiper-slide-shadow-' +
                    (e.isHorizontal() ? "right" : "bottom") +
                    '"></div>'
                )),
                s.append(h)),
              c.length && (c[0].style.opacity = Math.max(-o, 0)),
              h.length && (h[0].style.opacity = Math.max(o, 0));
          }
          s.transform(
            "translate3d(" +
              l +
              "px, " +
              d +
              "px, 0px) rotateX(" +
              r +
              "deg) rotateY(" +
              a +
              "deg)"
          );
        }
      },
      setTransition: function (e) {
        var i = this,
          t = i.slides,
          n = i.activeIndex,
          s = i.$wrapperEl;
        if (
          (t
            .transition(e)
            .find(
              ".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left"
            )
            .transition(e),
          i.params.virtualTranslate && 0 !== e)
        ) {
          var o = !1;
          t.eq(n).transitionEnd(function () {
            if (!o && i && !i.destroyed) {
              (o = !0), (i.animating = !1);
              for (
                var e = ["webkitTransitionEnd", "transitionend"], t = 0;
                t < e.length;
                t += 1
              )
                s.trigger(e[t]);
            }
          });
        }
      },
    },
    U = {
      setTranslate: function () {
        for (
          var e = this,
            t = e.width,
            i = e.height,
            n = e.slides,
            s = e.$wrapperEl,
            o = e.slidesSizesGrid,
            a = e.params.coverflowEffect,
            r = e.isHorizontal(),
            l = e.translate,
            d = r ? t / 2 - l : i / 2 - l,
            c = r ? a.rotate : -a.rotate,
            h = a.depth,
            p = 0,
            u = n.length;
          p < u;
          p += 1
        ) {
          var f = n.eq(p),
            m = o[p],
            g = ((d - f[0].swiperSlideOffset - m / 2) / m) * a.modifier,
            v = r ? c * g : 0,
            w = r ? 0 : c * g,
            b = -h * Math.abs(g),
            y = r ? 0 : a.stretch * g,
            x = r ? a.stretch * g : 0;
          Math.abs(x) < 0.001 && (x = 0),
            Math.abs(y) < 0.001 && (y = 0),
            Math.abs(b) < 0.001 && (b = 0),
            Math.abs(v) < 0.001 && (v = 0),
            Math.abs(w) < 0.001 && (w = 0);
          var T =
            "translate3d(" +
            x +
            "px," +
            y +
            "px," +
            b +
            "px)  rotateX(" +
            w +
            "deg) rotateY(" +
            v +
            "deg)";
          if (
            (f.transform(T),
            (f[0].style.zIndex = 1 - Math.abs(Math.round(g))),
            a.slideShadows)
          ) {
            var C = r
                ? f.find(".swiper-slide-shadow-left")
                : f.find(".swiper-slide-shadow-top"),
              z = r
                ? f.find(".swiper-slide-shadow-right")
                : f.find(".swiper-slide-shadow-bottom");
            0 === C.length &&
              ((C = L(
                '<div class="swiper-slide-shadow-' +
                  (r ? "left" : "top") +
                  '"></div>'
              )),
              f.append(C)),
              0 === z.length &&
                ((z = L(
                  '<div class="swiper-slide-shadow-' +
                    (r ? "right" : "bottom") +
                    '"></div>'
                )),
                f.append(z)),
              C.length && (C[0].style.opacity = 0 < g ? g : 0),
              z.length && (z[0].style.opacity = 0 < -g ? -g : 0);
          }
        }
        (te.pointerEvents || te.prefixedPointerEvents) &&
          (s[0].style.perspectiveOrigin = d + "px 50%");
      },
      setTransition: function (e) {
        this.slides
          .transition(e)
          .find(
            ".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left"
          )
          .transition(e);
      },
    },
    K = {
      init: function () {
        var e = this,
          t = e.params.thumbs,
          i = e.constructor;
        t.swiper instanceof i
          ? ((e.thumbs.swiper = t.swiper),
            ee.extend(e.thumbs.swiper.originalParams, {
              watchSlidesProgress: !0,
              slideToClickedSlide: !1,
            }),
            ee.extend(e.thumbs.swiper.params, {
              watchSlidesProgress: !0,
              slideToClickedSlide: !1,
            }))
          : ee.isObject(t.swiper) &&
            ((e.thumbs.swiper = new i(
              ee.extend({}, t.swiper, {
                watchSlidesVisibility: !0,
                watchSlidesProgress: !0,
                slideToClickedSlide: !1,
              })
            )),
            (e.thumbs.swiperCreated = !0)),
          e.thumbs.swiper.$el.addClass(e.params.thumbs.thumbsContainerClass),
          e.thumbs.swiper.on("tap", e.thumbs.onThumbClick);
      },
      onThumbClick: function () {
        var e = this,
          t = e.thumbs.swiper;
        if (t) {
          var i = t.clickedIndex,
            n = t.clickedSlide;
          if (
            !(
              (n && L(n).hasClass(e.params.thumbs.slideThumbActiveClass)) ||
              null == i
            )
          ) {
            var s;
            if (
              ((s = t.params.loop
                ? parseInt(
                    L(t.clickedSlide).attr("data-swiper-slide-index"),
                    10
                  )
                : i),
              e.params.loop)
            ) {
              var o = e.activeIndex;
              e.slides.eq(o).hasClass(e.params.slideDuplicateClass) &&
                (e.loopFix(),
                (e._clientLeft = e.$wrapperEl[0].clientLeft),
                (o = e.activeIndex));
              var a = e.slides
                  .eq(o)
                  .prevAll('[data-swiper-slide-index="' + s + '"]')
                  .eq(0)
                  .index(),
                r = e.slides
                  .eq(o)
                  .nextAll('[data-swiper-slide-index="' + s + '"]')
                  .eq(0)
                  .index();
              s = void 0 === a ? r : void 0 === r ? a : r - o < o - a ? r : a;
            }
            e.slideTo(s);
          }
        }
      },
      update: function (e) {
        var t = this,
          i = t.thumbs.swiper;
        if (i) {
          var n =
            "auto" === i.params.slidesPerView
              ? i.slidesPerViewDynamic()
              : i.params.slidesPerView;
          if (t.realIndex !== i.realIndex) {
            var s,
              o = i.activeIndex;
            if (i.params.loop) {
              i.slides.eq(o).hasClass(i.params.slideDuplicateClass) &&
                (i.loopFix(),
                (i._clientLeft = i.$wrapperEl[0].clientLeft),
                (o = i.activeIndex));
              var a = i.slides
                  .eq(o)
                  .prevAll('[data-swiper-slide-index="' + t.realIndex + '"]')
                  .eq(0)
                  .index(),
                r = i.slides
                  .eq(o)
                  .nextAll('[data-swiper-slide-index="' + t.realIndex + '"]')
                  .eq(0)
                  .index();
              s =
                void 0 === a
                  ? r
                  : void 0 === r
                  ? a
                  : r - o == o - a
                  ? o
                  : r - o < o - a
                  ? r
                  : a;
            } else s = t.realIndex;
            i.visibleSlidesIndexes.indexOf(s) < 0 &&
              (i.params.centeredSlides
                ? (s =
                    o < s
                      ? s - Math.floor(n / 2) + 1
                      : s + Math.floor(n / 2) - 1)
                : o < s && (s = s - n + 1),
              i.slideTo(s, e ? 0 : void 0));
          }
          var l = 1,
            d = t.params.thumbs.slideThumbActiveClass;
          if (
            (1 < t.params.slidesPerView &&
              !t.params.centeredSlides &&
              (l = t.params.slidesPerView),
            i.slides.removeClass(d),
            i.params.loop)
          )
            for (var c = 0; c < l; c += 1)
              i.$wrapperEl
                .children(
                  '[data-swiper-slide-index="' + (t.realIndex + c) + '"]'
                )
                .addClass(d);
          else
            for (var h = 0; h < l; h += 1)
              i.slides.eq(t.realIndex + h).addClass(d);
        }
      },
    },
    Q = [
      C,
      z,
      S,
      E,
      M,
      $,
      O,
      {
        name: "mousewheel",
        params: {
          mousewheel: {
            enabled: !1,
            releaseOnEdges: !1,
            invert: !1,
            forceToAxis: !1,
            sensitivity: 1,
            eventsTarged: "container",
          },
        },
        create: function () {
          var e = this;
          ee.extend(e, {
            mousewheel: {
              enabled: !1,
              enable: _.enable.bind(e),
              disable: _.disable.bind(e),
              handle: _.handle.bind(e),
              handleMouseEnter: _.handleMouseEnter.bind(e),
              handleMouseLeave: _.handleMouseLeave.bind(e),
              lastScrollTime: ee.now(),
            },
          });
        },
        on: {
          init: function () {
            this.params.mousewheel.enabled && this.mousewheel.enable();
          },
          destroy: function () {
            this.mousewheel.enabled && this.mousewheel.disable();
          },
        },
      },
      {
        name: "navigation",
        params: {
          navigation: {
            nextEl: null,
            prevEl: null,
            hideOnClick: !1,
            disabledClass: "swiper-button-disabled",
            hiddenClass: "swiper-button-hidden",
            lockClass: "swiper-button-lock",
          },
        },
        create: function () {
          var e = this;
          ee.extend(e, {
            navigation: {
              init: H.init.bind(e),
              update: H.update.bind(e),
              destroy: H.destroy.bind(e),
              onNextClick: H.onNextClick.bind(e),
              onPrevClick: H.onPrevClick.bind(e),
            },
          });
        },
        on: {
          init: function () {
            this.navigation.init(), this.navigation.update();
          },
          toEdge: function () {
            this.navigation.update();
          },
          fromEdge: function () {
            this.navigation.update();
          },
          destroy: function () {
            this.navigation.destroy();
          },
          click: function (e) {
            var t,
              i = this,
              n = i.navigation,
              s = n.$nextEl,
              o = n.$prevEl;
            !i.params.navigation.hideOnClick ||
              L(e.target).is(o) ||
              L(e.target).is(s) ||
              (s
                ? (t = s.hasClass(i.params.navigation.hiddenClass))
                : o && (t = o.hasClass(i.params.navigation.hiddenClass)),
              !0 === t
                ? i.emit("navigationShow", i)
                : i.emit("navigationHide", i),
              s && s.toggleClass(i.params.navigation.hiddenClass),
              o && o.toggleClass(i.params.navigation.hiddenClass));
          },
        },
      },
      {
        name: "pagination",
        params: {
          pagination: {
            el: null,
            bulletElement: "span",
            clickable: !1,
            hideOnClick: !1,
            renderBullet: null,
            renderProgressbar: null,
            renderFraction: null,
            renderCustom: null,
            progressbarOpposite: !1,
            type: "bullets",
            dynamicBullets: !1,
            dynamicMainBullets: 1,
            formatFractionCurrent: function (e) {
              return e;
            },
            formatFractionTotal: function (e) {
              return e;
            },
            bulletClass: "swiper-pagination-bullet",
            bulletActiveClass: "swiper-pagination-bullet-active",
            modifierClass: "swiper-pagination-",
            currentClass: "swiper-pagination-current",
            totalClass: "swiper-pagination-total",
            hiddenClass: "swiper-pagination-hidden",
            progressbarFillClass: "swiper-pagination-progressbar-fill",
            progressbarOppositeClass: "swiper-pagination-progressbar-opposite",
            clickableClass: "swiper-pagination-clickable",
            lockClass: "swiper-pagination-lock",
          },
        },
        create: function () {
          var e = this;
          ee.extend(e, {
            pagination: {
              init: D.init.bind(e),
              render: D.render.bind(e),
              update: D.update.bind(e),
              destroy: D.destroy.bind(e),
              dynamicBulletIndex: 0,
            },
          });
        },
        on: {
          init: function () {
            this.pagination.init(),
              this.pagination.render(),
              this.pagination.update();
          },
          activeIndexChange: function () {
            this.params.loop
              ? this.pagination.update()
              : void 0 === this.snapIndex && this.pagination.update();
          },
          snapIndexChange: function () {
            this.params.loop || this.pagination.update();
          },
          slidesLengthChange: function () {
            this.params.loop &&
              (this.pagination.render(), this.pagination.update());
          },
          snapGridLengthChange: function () {
            this.params.loop ||
              (this.pagination.render(), this.pagination.update());
          },
          destroy: function () {
            this.pagination.destroy();
          },
          click: function (e) {
            var t = this;
            t.params.pagination.el &&
              t.params.pagination.hideOnClick &&
              0 < t.pagination.$el.length &&
              !L(e.target).hasClass(t.params.pagination.bulletClass) &&
              (!0 === t.pagination.$el.hasClass(t.params.pagination.hiddenClass)
                ? t.emit("paginationShow", t)
                : t.emit("paginationHide", t),
              t.pagination.$el.toggleClass(t.params.pagination.hiddenClass));
          },
        },
      },
      {
        name: "scrollbar",
        params: {
          scrollbar: {
            el: null,
            dragSize: "auto",
            hide: !1,
            draggable: !1,
            snapOnRelease: !0,
            lockClass: "swiper-scrollbar-lock",
            dragClass: "swiper-scrollbar-drag",
          },
        },
        create: function () {
          var e = this;
          ee.extend(e, {
            scrollbar: {
              init: A.init.bind(e),
              destroy: A.destroy.bind(e),
              updateSize: A.updateSize.bind(e),
              setTranslate: A.setTranslate.bind(e),
              setTransition: A.setTransition.bind(e),
              enableDraggable: A.enableDraggable.bind(e),
              disableDraggable: A.disableDraggable.bind(e),
              setDragPosition: A.setDragPosition.bind(e),
              onDragStart: A.onDragStart.bind(e),
              onDragMove: A.onDragMove.bind(e),
              onDragEnd: A.onDragEnd.bind(e),
              isTouched: !1,
              timeout: null,
              dragTimeout: null,
            },
          });
        },
        on: {
          init: function () {
            this.scrollbar.init(),
              this.scrollbar.updateSize(),
              this.scrollbar.setTranslate();
          },
          update: function () {
            this.scrollbar.updateSize();
          },
          resize: function () {
            this.scrollbar.updateSize();
          },
          observerUpdate: function () {
            this.scrollbar.updateSize();
          },
          setTranslate: function () {
            this.scrollbar.setTranslate();
          },
          setTransition: function (e) {
            this.scrollbar.setTransition(e);
          },
          destroy: function () {
            this.scrollbar.destroy();
          },
        },
      },
      {
        name: "parallax",
        params: { parallax: { enabled: !1 } },
        create: function () {
          ee.extend(this, {
            parallax: {
              setTransform: F.setTransform.bind(this),
              setTranslate: F.setTranslate.bind(this),
              setTransition: F.setTransition.bind(this),
            },
          });
        },
        on: {
          beforeInit: function () {
            this.params.parallax.enabled &&
              ((this.params.watchSlidesProgress = !0),
              (this.originalParams.watchSlidesProgress = !0));
          },
          init: function () {
            this.params.parallax.enabled && this.parallax.setTranslate();
          },
          setTranslate: function () {
            this.params.parallax.enabled && this.parallax.setTranslate();
          },
          setTransition: function (e) {
            this.params.parallax.enabled && this.parallax.setTransition(e);
          },
        },
      },
      {
        name: "zoom",
        params: {
          zoom: {
            enabled: !1,
            maxRatio: 3,
            minRatio: 1,
            toggle: !0,
            containerClass: "swiper-zoom-container",
            zoomedSlideClass: "swiper-slide-zoomed",
          },
        },
        create: function () {
          var n = this,
            t = {
              enabled: !1,
              scale: 1,
              currentScale: 1,
              isScaling: !1,
              gesture: {
                $slideEl: void 0,
                slideWidth: void 0,
                slideHeight: void 0,
                $imageEl: void 0,
                $imageWrapEl: void 0,
                maxRatio: 3,
              },
              image: {
                isTouched: void 0,
                isMoved: void 0,
                currentX: void 0,
                currentY: void 0,
                minX: void 0,
                minY: void 0,
                maxX: void 0,
                maxY: void 0,
                width: void 0,
                height: void 0,
                startX: void 0,
                startY: void 0,
                touchesStart: {},
                touchesCurrent: {},
              },
              velocity: {
                x: void 0,
                y: void 0,
                prevPositionX: void 0,
                prevPositionY: void 0,
                prevTime: void 0,
              },
            };
          "onGestureStart onGestureChange onGestureEnd onTouchStart onTouchMove onTouchEnd onTransitionEnd toggle enable disable in out"
            .split(" ")
            .forEach(function (e) {
              t[e] = B[e].bind(n);
            }),
            ee.extend(n, { zoom: t });
          var s = 1;
          Object.defineProperty(n.zoom, "scale", {
            get: function () {
              return s;
            },
            set: function (e) {
              if (s !== e) {
                var t = n.zoom.gesture.$imageEl
                    ? n.zoom.gesture.$imageEl[0]
                    : void 0,
                  i = n.zoom.gesture.$slideEl
                    ? n.zoom.gesture.$slideEl[0]
                    : void 0;
                n.emit("zoomChange", e, t, i);
              }
              s = e;
            },
          });
        },
        on: {
          init: function () {
            this.params.zoom.enabled && this.zoom.enable();
          },
          destroy: function () {
            this.zoom.disable();
          },
          touchStart: function (e) {
            this.zoom.enabled && this.zoom.onTouchStart(e);
          },
          touchEnd: function (e) {
            this.zoom.enabled && this.zoom.onTouchEnd(e);
          },
          doubleTap: function (e) {
            this.params.zoom.enabled &&
              this.zoom.enabled &&
              this.params.zoom.toggle &&
              this.zoom.toggle(e);
          },
          transitionEnd: function () {
            this.zoom.enabled &&
              this.params.zoom.enabled &&
              this.zoom.onTransitionEnd();
          },
        },
      },
      {
        name: "lazy",
        params: {
          lazy: {
            enabled: !1,
            loadPrevNext: !1,
            loadPrevNextAmount: 1,
            loadOnTransitionStart: !1,
            elementClass: "swiper-lazy",
            loadingClass: "swiper-lazy-loading",
            loadedClass: "swiper-lazy-loaded",
            preloaderClass: "swiper-lazy-preloader",
          },
        },
        create: function () {
          ee.extend(this, {
            lazy: {
              initialImageLoaded: !1,
              load: N.load.bind(this),
              loadInSlide: N.loadInSlide.bind(this),
            },
          });
        },
        on: {
          beforeInit: function () {
            this.params.lazy.enabled &&
              this.params.preloadImages &&
              (this.params.preloadImages = !1);
          },
          init: function () {
            this.params.lazy.enabled &&
              !this.params.loop &&
              0 === this.params.initialSlide &&
              this.lazy.load();
          },
          scroll: function () {
            this.params.freeMode &&
              !this.params.freeModeSticky &&
              this.lazy.load();
          },
          resize: function () {
            this.params.lazy.enabled && this.lazy.load();
          },
          scrollbarDragMove: function () {
            this.params.lazy.enabled && this.lazy.load();
          },
          transitionStart: function () {
            var e = this;
            e.params.lazy.enabled &&
              ((!e.params.lazy.loadOnTransitionStart &&
                (e.params.lazy.loadOnTransitionStart ||
                  e.lazy.initialImageLoaded)) ||
                e.lazy.load());
          },
          transitionEnd: function () {
            this.params.lazy.enabled &&
              !this.params.lazy.loadOnTransitionStart &&
              this.lazy.load();
          },
        },
      },
      {
        name: "controller",
        params: { controller: { control: void 0, inverse: !1, by: "slide" } },
        create: function () {
          var e = this;
          ee.extend(e, {
            controller: {
              control: e.params.controller.control,
              getInterpolateFunction: R.getInterpolateFunction.bind(e),
              setTranslate: R.setTranslate.bind(e),
              setTransition: R.setTransition.bind(e),
            },
          });
        },
        on: {
          update: function () {
            this.controller.control &&
              this.controller.spline &&
              ((this.controller.spline = void 0),
              delete this.controller.spline);
          },
          resize: function () {
            this.controller.control &&
              this.controller.spline &&
              ((this.controller.spline = void 0),
              delete this.controller.spline);
          },
          observerUpdate: function () {
            this.controller.control &&
              this.controller.spline &&
              ((this.controller.spline = void 0),
              delete this.controller.spline);
          },
          setTranslate: function (e, t) {
            this.controller.control && this.controller.setTranslate(e, t);
          },
          setTransition: function (e, t) {
            this.controller.control && this.controller.setTransition(e, t);
          },
        },
      },
      {
        name: "a11y",
        params: {
          a11y: {
            enabled: !0,
            notificationClass: "swiper-notification",
            prevSlideMessage: "Previous slide",
            nextSlideMessage: "Next slide",
            firstSlideMessage: "This is the first slide",
            lastSlideMessage: "This is the last slide",
            paginationBulletMessage: "Go to slide {{index}}",
          },
        },
        create: function () {
          var t = this;
          ee.extend(t, {
            a11y: {
              liveRegion: L(
                '<span class="' +
                  t.params.a11y.notificationClass +
                  '" aria-live="assertive" aria-atomic="true"></span>'
              ),
            },
          }),
            Object.keys(Y).forEach(function (e) {
              t.a11y[e] = Y[e].bind(t);
            });
        },
        on: {
          init: function () {
            this.params.a11y.enabled &&
              (this.a11y.init(), this.a11y.updateNavigation());
          },
          toEdge: function () {
            this.params.a11y.enabled && this.a11y.updateNavigation();
          },
          fromEdge: function () {
            this.params.a11y.enabled && this.a11y.updateNavigation();
          },
          paginationUpdate: function () {
            this.params.a11y.enabled && this.a11y.updatePagination();
          },
          destroy: function () {
            this.params.a11y.enabled && this.a11y.destroy();
          },
        },
      },
      {
        name: "history",
        params: { history: { enabled: !1, replaceState: !1, key: "slides" } },
        create: function () {
          var e = this;
          ee.extend(e, {
            history: {
              init: V.init.bind(e),
              setHistory: V.setHistory.bind(e),
              setHistoryPopState: V.setHistoryPopState.bind(e),
              scrollToSlide: V.scrollToSlide.bind(e),
              destroy: V.destroy.bind(e),
            },
          });
        },
        on: {
          init: function () {
            this.params.history.enabled && this.history.init();
          },
          destroy: function () {
            this.params.history.enabled && this.history.destroy();
          },
          transitionEnd: function () {
            this.history.initialized &&
              this.history.setHistory(
                this.params.history.key,
                this.activeIndex
              );
          },
        },
      },
      {
        name: "hash-navigation",
        params: {
          hashNavigation: { enabled: !1, replaceState: !1, watchState: !1 },
        },
        create: function () {
          var e = this;
          ee.extend(e, {
            hashNavigation: {
              initialized: !1,
              init: X.init.bind(e),
              destroy: X.destroy.bind(e),
              setHash: X.setHash.bind(e),
              onHashCange: X.onHashCange.bind(e),
            },
          });
        },
        on: {
          init: function () {
            this.params.hashNavigation.enabled && this.hashNavigation.init();
          },
          destroy: function () {
            this.params.hashNavigation.enabled && this.hashNavigation.destroy();
          },
          transitionEnd: function () {
            this.hashNavigation.initialized && this.hashNavigation.setHash();
          },
        },
      },
      {
        name: "autoplay",
        params: {
          autoplay: {
            enabled: !1,
            delay: 3e3,
            waitForTransition: !0,
            disableOnInteraction: !0,
            stopOnLastSlide: !1,
            reverseDirection: !1,
          },
        },
        create: function () {
          var t = this;
          ee.extend(t, {
            autoplay: {
              running: !1,
              paused: !1,
              run: j.run.bind(t),
              start: j.start.bind(t),
              stop: j.stop.bind(t),
              pause: j.pause.bind(t),
              onTransitionEnd: function (e) {
                t &&
                  !t.destroyed &&
                  t.$wrapperEl &&
                  e.target === this &&
                  (t.$wrapperEl[0].removeEventListener(
                    "transitionend",
                    t.autoplay.onTransitionEnd
                  ),
                  t.$wrapperEl[0].removeEventListener(
                    "webkitTransitionEnd",
                    t.autoplay.onTransitionEnd
                  ),
                  (t.autoplay.paused = !1),
                  t.autoplay.running ? t.autoplay.run() : t.autoplay.stop());
              },
            },
          });
        },
        on: {
          init: function () {
            this.params.autoplay.enabled && this.autoplay.start();
          },
          beforeTransitionStart: function (e, t) {
            this.autoplay.running &&
              (t || !this.params.autoplay.disableOnInteraction
                ? this.autoplay.pause(e)
                : this.autoplay.stop());
          },
          sliderFirstMove: function () {
            this.autoplay.running &&
              (this.params.autoplay.disableOnInteraction
                ? this.autoplay.stop()
                : this.autoplay.pause());
          },
          destroy: function () {
            this.autoplay.running && this.autoplay.stop();
          },
        },
      },
      {
        name: "effect-fade",
        params: { fadeEffect: { crossFade: !1 } },
        create: function () {
          ee.extend(this, {
            fadeEffect: {
              setTranslate: q.setTranslate.bind(this),
              setTransition: q.setTransition.bind(this),
            },
          });
        },
        on: {
          beforeInit: function () {
            var e = this;
            if ("fade" === e.params.effect) {
              e.classNames.push(e.params.containerModifierClass + "fade");
              var t = {
                slidesPerView: 1,
                slidesPerColumn: 1,
                slidesPerGroup: 1,
                watchSlidesProgress: !0,
                spaceBetween: 0,
                virtualTranslate: !0,
              };
              ee.extend(e.params, t), ee.extend(e.originalParams, t);
            }
          },
          setTranslate: function () {
            "fade" === this.params.effect && this.fadeEffect.setTranslate();
          },
          setTransition: function (e) {
            "fade" === this.params.effect && this.fadeEffect.setTransition(e);
          },
        },
      },
      {
        name: "effect-cube",
        params: {
          cubeEffect: {
            slideShadows: !0,
            shadow: !0,
            shadowOffset: 20,
            shadowScale: 0.94,
          },
        },
        create: function () {
          ee.extend(this, {
            cubeEffect: {
              setTranslate: G.setTranslate.bind(this),
              setTransition: G.setTransition.bind(this),
            },
          });
        },
        on: {
          beforeInit: function () {
            var e = this;
            if ("cube" === e.params.effect) {
              e.classNames.push(e.params.containerModifierClass + "cube"),
                e.classNames.push(e.params.containerModifierClass + "3d");
              var t = {
                slidesPerView: 1,
                slidesPerColumn: 1,
                slidesPerGroup: 1,
                watchSlidesProgress: !0,
                resistanceRatio: 0,
                spaceBetween: 0,
                centeredSlides: !1,
                virtualTranslate: !0,
              };
              ee.extend(e.params, t), ee.extend(e.originalParams, t);
            }
          },
          setTranslate: function () {
            "cube" === this.params.effect && this.cubeEffect.setTranslate();
          },
          setTransition: function (e) {
            "cube" === this.params.effect && this.cubeEffect.setTransition(e);
          },
        },
      },
      {
        name: "effect-flip",
        params: { flipEffect: { slideShadows: !0, limitRotation: !0 } },
        create: function () {
          ee.extend(this, {
            flipEffect: {
              setTranslate: Z.setTranslate.bind(this),
              setTransition: Z.setTransition.bind(this),
            },
          });
        },
        on: {
          beforeInit: function () {
            var e = this;
            if ("flip" === e.params.effect) {
              e.classNames.push(e.params.containerModifierClass + "flip"),
                e.classNames.push(e.params.containerModifierClass + "3d");
              var t = {
                slidesPerView: 1,
                slidesPerColumn: 1,
                slidesPerGroup: 1,
                watchSlidesProgress: !0,
                spaceBetween: 0,
                virtualTranslate: !0,
              };
              ee.extend(e.params, t), ee.extend(e.originalParams, t);
            }
          },
          setTranslate: function () {
            "flip" === this.params.effect && this.flipEffect.setTranslate();
          },
          setTransition: function (e) {
            "flip" === this.params.effect && this.flipEffect.setTransition(e);
          },
        },
      },
      {
        name: "effect-coverflow",
        params: {
          coverflowEffect: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: !0,
          },
        },
        create: function () {
          ee.extend(this, {
            coverflowEffect: {
              setTranslate: U.setTranslate.bind(this),
              setTransition: U.setTransition.bind(this),
            },
          });
        },
        on: {
          beforeInit: function () {
            var e = this;
            "coverflow" === e.params.effect &&
              (e.classNames.push(e.params.containerModifierClass + "coverflow"),
              e.classNames.push(e.params.containerModifierClass + "3d"),
              (e.params.watchSlidesProgress = !0),
              (e.originalParams.watchSlidesProgress = !0));
          },
          setTranslate: function () {
            "coverflow" === this.params.effect &&
              this.coverflowEffect.setTranslate();
          },
          setTransition: function (e) {
            "coverflow" === this.params.effect &&
              this.coverflowEffect.setTransition(e);
          },
        },
      },
      {
        name: "thumbs",
        params: {
          thumbs: {
            swiper: null,
            slideThumbActiveClass: "swiper-slide-thumb-active",
            thumbsContainerClass: "swiper-container-thumbs",
          },
        },
        create: function () {
          ee.extend(this, {
            thumbs: {
              swiper: null,
              init: K.init.bind(this),
              update: K.update.bind(this),
              onThumbClick: K.onThumbClick.bind(this),
            },
          });
        },
        on: {
          beforeInit: function () {
            var e = this.params.thumbs;
            e && e.swiper && (this.thumbs.init(), this.thumbs.update(!0));
          },
          slideChange: function () {
            this.thumbs.swiper && this.thumbs.update();
          },
          update: function () {
            this.thumbs.swiper && this.thumbs.update();
          },
          resize: function () {
            this.thumbs.swiper && this.thumbs.update();
          },
          observerUpdate: function () {
            this.thumbs.swiper && this.thumbs.update();
          },
          setTransition: function (e) {
            var t = this.thumbs.swiper;
            t && t.setTransition(e);
          },
          beforeDestroy: function () {
            var e = this.thumbs.swiper;
            e && this.thumbs.swiperCreated && e && e.destroy();
          },
        },
      },
    ];
  return (
    void 0 === T.use &&
      ((T.use = T.Class.use), (T.installModule = T.Class.installModule)),
    T.use(Q),
    T
  );
}),
  (function (e, t) {
    "function" == typeof define && define.amd
      ? define(t)
      : "object" == typeof exports
      ? (module.exports = t())
      : (e.Blazy = t());
  })(this, function () {
    "use strict";
    var u,
      d,
      f,
      c,
      m = "srcset";
    return function (e) {
      if (!document.querySelectorAll) {
        var o = document.createStyleSheet();
        document.querySelectorAll = function (e, t, i, n, s) {
          for (
            s = document.all,
              t = [],
              i = (e = e.replace(/\[for\b/gi, "[htmlFor").split(",")).length;
            i--;

          ) {
            for (o.addRule(e[i], "k:v"), n = s.length; n--; )
              s[n].currentStyle.k && t.push(s[n]);
            o.removeRule(0);
          }
          return t;
        };
      }
      var i = this,
        t = (i._util = {});
      (t.elements = []),
        (t.destroyed = !0),
        (i.options = e || {}),
        (i.options.error = i.options.error || !1),
        (i.options.offset = i.options.offset || 100),
        (i.options.root = i.options.root || document),
        (i.options.success = i.options.success || !1),
        (i.options.selector = i.options.selector || ".b-lazy"),
        (i.options.separator = i.options.separator || "|"),
        (i.options.containerClass = i.options.container),
        (i.options.container =
          !!i.options.containerClass &&
          document.querySelectorAll(i.options.containerClass)),
        (i.options.errorClass = i.options.errorClass || "b-error"),
        (i.options.breakpoints = i.options.breakpoints || !1),
        (i.options.loadInvisible = i.options.loadInvisible || !1),
        (i.options.successClass = i.options.successClass || "b-loaded"),
        (i.options.validateDelay = i.options.validateDelay || 25),
        (i.options.saveViewportOffsetDelay =
          i.options.saveViewportOffsetDelay || 50),
        (i.options.srcset = i.options.srcset || "data-srcset"),
        (i.options.src = u = i.options.src || "data-src"),
        (c = Element.prototype.closest),
        (f = 1 < window.devicePixelRatio),
        ((d = {}).top = 0 - i.options.offset),
        (d.left = 0 - i.options.offset),
        (i.revalidate = function () {
          n(i);
        }),
        (i.load = function (e, t) {
          var i = this.options;
          e && void 0 === e.length
            ? a(e, t, i)
            : S(e, function (e) {
                a(e, t, i);
              });
        }),
        (i.destroy = function () {
          var t = i._util;
          i.options.container &&
            S(i.options.container, function (e) {
              z(e, "scroll", t.validateT);
            }),
            z(window, "scroll", t.validateT),
            z(window, "resize", t.validateT),
            z(window, "resize", t.saveViewportOffsetT),
            (t.count = 0),
            (t.elements.length = 0),
            (t.destroyed = !0);
        }),
        (t.validateT = E(
          function () {
            s(i);
          },
          i.options.validateDelay,
          i
        )),
        (t.saveViewportOffsetT = E(
          function () {
            p(i.options.offset);
          },
          i.options.saveViewportOffsetDelay,
          i
        )),
        p(i.options.offset),
        S(i.options.breakpoints, function (e) {
          if (e.width >= window.innerWidth) return (u = e.src), !1;
        }),
        setTimeout(function () {
          n(i);
        });
    };
    function n(e) {
      var t = e._util;
      (t.elements = (function (e) {
        for (
          var t = [], i = e.root.querySelectorAll(e.selector), n = i.length;
          n--;
          t.unshift(i[n])
        );
        return t;
      })(e.options)),
        (t.count = t.elements.length),
        t.destroyed &&
          ((t.destroyed = !1),
          e.options.container &&
            S(e.options.container, function (e) {
              C(e, "scroll", t.validateT);
            }),
          C(window, "resize", t.saveViewportOffsetT),
          C(window, "resize", t.validateT),
          C(window, "scroll", t.validateT)),
        s(e);
    }
    function s(e) {
      for (var t = e._util, i = 0; i < t.count; i++) {
        var n = t.elements[i];
        (o(n, e.options) || x(n, e.options.successClass)) &&
          (e.load(n), t.elements.splice(i, 1), t.count--, i--);
      }
      0 === t.count && e.destroy();
    }
    function o(e, t) {
      var i = e.getBoundingClientRect();
      if (t.container && c) {
        var n = e.closest(t.containerClass);
        if (n) {
          var s = n.getBoundingClientRect();
          if (h(s, d)) {
            var o = s.top - t.offset,
              a = s.right + t.offset,
              r = s.bottom + t.offset,
              l = s.left - t.offset;
            return h(i, {
              top: o > d.top ? o : d.top,
              right: a < d.right ? a : d.right,
              bottom: r < d.bottom ? r : d.bottom,
              left: l > d.left ? l : d.left,
            });
          }
          return !1;
        }
      }
      return h(i, d);
    }
    function h(e, t) {
      return (
        e.right >= t.left &&
        e.bottom >= t.top &&
        e.left <= t.right &&
        e.top <= t.bottom
      );
    }
    function a(e, t, i) {
      if (
        !x(e, i.successClass) &&
        (t || i.loadInvisible || (0 < e.offsetWidth && 0 < e.offsetHeight))
      ) {
        var n = b(e, u) || b(e, i.src);
        if (n) {
          var s = n.split(i.separator),
            o = s[f && 1 < s.length ? 1 : 0],
            a = b(e, i.srcset),
            r = y(e, "img"),
            l = e.parentNode,
            d = l && y(l, "picture");
          if (r || void 0 === e.src) {
            var c = new Image(),
              h = function () {
                i.error && i.error(e, "invalid"),
                  T(e, i.errorClass),
                  z(c, "error", h),
                  z(c, "load", p);
              },
              p = function () {
                r
                  ? d || w(e, o, a)
                  : (e.style.backgroundImage = 'url("' + o + '")'),
                  g(e, i),
                  z(c, "load", p),
                  z(c, "error", h);
              };
            d &&
              ((c = e),
              S(l.getElementsByTagName("source"), function (e) {
                v(e, m, i.srcset);
              })),
              C(c, "error", h),
              C(c, "load", p),
              w(c, o, a);
          } else (e.src = o), g(e, i);
        } else
          y(e, "video")
            ? (S(e.getElementsByTagName("source"), function (e) {
                v(e, "src", i.src);
              }),
              e.load(),
              g(e, i))
            : (i.error && i.error(e, "missing"), T(e, i.errorClass));
      }
    }
    function g(t, e) {
      T(t, e.successClass),
        e.success && e.success(t),
        l(t, e.src),
        l(t, e.srcset),
        S(e.breakpoints, function (e) {
          l(t, e.src);
        });
    }
    function v(e, t, i) {
      var n = b(e, i);
      n && (r(e, t, n), l(e, i));
    }
    function w(e, t, i) {
      i && r(e, m, i), (e.src = t);
    }
    function r(e, t, i) {
      e.setAttribute(t, i);
    }
    function b(e, t) {
      return e.getAttribute(t);
    }
    function l(e, t) {
      e.removeAttribute(t);
    }
    function y(e, t) {
      return e.nodeName.toLowerCase() === t;
    }
    function x(e, t) {
      return -1 !== (" " + e.className + " ").indexOf(" " + t + " ");
    }
    function T(e, t) {
      x(e, t) || (e.className += " " + t);
    }
    function p(e) {
      (d.bottom =
        (window.innerHeight || document.documentElement.clientHeight) + e),
        (d.right =
          (window.innerWidth || document.documentElement.clientWidth) + e);
    }
    function C(e, t, i) {
      e.attachEvent
        ? e.attachEvent && e.attachEvent("on" + t, i)
        : e.addEventListener(t, i, { capture: !1, passive: !0 });
    }
    function z(e, t, i) {
      e.detachEvent
        ? e.detachEvent && e.detachEvent("on" + t, i)
        : e.removeEventListener(t, i, { capture: !1, passive: !0 });
    }
    function S(e, t) {
      if (e && t)
        for (var i = e.length, n = 0; n < i && !1 !== t(e[n], n); n++);
    }
    function E(t, i, n) {
      var s = 0;
      return function () {
        var e = +new Date();
        e - s < i || ((s = e), t.apply(n, arguments));
      };
    }
  }),
  (function (e, t) {
    "function" == typeof define && define.amd
      ? define([], function () {
          return t(e);
        })
      : "object" == typeof exports
      ? (module.exports = t(e))
      : (e.Mapping = t(e));
  })(
    "undefined" != typeof global
      ? global
      : "undefined" != typeof window
      ? window
      : this,
    function (e) {
      var t = {};
      return (
        (t.mapElements = {
          html: "",
          department: "",
          destination: "",
          from: function (e) {
            try {
              return (
                (this.department = document.querySelector(e)),
                (this.html = (function (e) {
                  if (document.body.contains(e))
                    return e.parentElement.removeChild(e);
                  throw "Element is not found";
                })(this.department)),
                this
              );
            } catch (e) {}
          },
          to: function (e) {
            try {
              return (this.destination = document.querySelector(e)), this;
            } catch (e) {}
          },
          use: function (e) {
            try {
              switch (e) {
                case "appendTo":
                  this.destination.append(this.html);
                  break;
                case "prependTo":
                  this.destination.prepend(this.html);
                  break;
                case "insertBefore":
                  this.destination.parentElement.insertBefore(
                    this.html,
                    this.destination
                  );
                  break;
                case "insertAfter":
                  (t = this.html),
                    (i = this.destination).parentNode.insertBefore(
                      t,
                      i.nextSibling
                    );
              }
            } catch (e) {}
            var t, i;
          },
        }),
        t
      );
    }
  ),
  (function (e, t) {
    "function" == typeof define && define.amd
      ? define([], function () {
          return t(e);
        })
      : "object" == typeof exports
      ? (module.exports = t(e))
      : (e.MappingListener = t(e));
  })(
    "undefined" != typeof global
      ? global
      : "undefined" != typeof window
      ? window
      : this,
    function (n) {
      "use strict";
      var s;
      s = { breakpoint: 1025 };
      var o = function () {
        var i = {},
          n = !1,
          e = 0;
        "[object Boolean]" === Object.prototype.toString.call(arguments[0]) &&
          ((n = arguments[0]), e++);
        for (
          var t = function (e) {
            for (var t in e)
              e.hasOwnProperty(t) &&
                (n && "[object Object]" === Object.prototype.toString.call(e[t])
                  ? (i[t] = o(i[t], e[t]))
                  : (i[t] = e[t]));
          };
          e < arguments.length;
          e++
        )
          t(arguments[e]);
        return i;
      };
      return function (e) {
        var t,
          i = {
            switch: function () {
              n.matchMedia("(min-width:" + t.breakpoint + "px)").matches
                ? Mapping.mapElements
                    .from(t.selector)
                    .to(t.desktopWrapper)
                    .use(t.desktopMethod)
                : Mapping.mapElements
                    .from(t.selector)
                    .to(t.mobileWrapper)
                    .use(t.mobileMethod);
            },
            watch: function () {
              this.switch(),
                n
                  .matchMedia("(min-width:" + t.breakpoint + "px)")
                  .addListener(i.switch);
            },
            init: function (e) {
              t = (function (e) {
                switch (e.breakpoint) {
                  case "sm":
                    e.breakpoint = 576;
                    break;
                  case "md":
                    e.breakpoint = 768;
                    break;
                  case "lg":
                    e.breakpoint = 1025;
                    break;
                  case "xl":
                    e.breakpoint = 1200;
                }
                return e;
              })((t = o(s, e || {})));
            },
          };
        return i.init(e), i;
      };
    }
  ),
  (function (l, d, m, g) {
    "use strict";
    if (((l.console = l.console || { info: function (e) {} }), m))
      if (m.fn.fancybox) console.info("fancyBox already initialized");
      else {
        var e,
          t,
          i,
          n,
          s = {
            closeExisting: !1,
            loop: !1,
            gutter: 50,
            keyboard: !0,
            preventCaptionOverlap: !0,
            arrows: !0,
            infobar: !0,
            smallBtn: "auto",
            toolbar: "auto",
            buttons: ["zoom", "slideShow", "thumbs", "close"],
            idleTime: 3,
            protect: !1,
            modal: !1,
            image: { preload: !1 },
            ajax: { settings: { data: { fancybox: !0 } } },
            iframe: {
              tpl: '<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" allowfullscreen="allowfullscreen" allow="autoplay; fullscreen" src=""></iframe>',
              preload: !0,
              css: {},
              attr: { scrolling: "auto" },
            },
            video: {
              tpl: '<video class="fancybox-video" controls controlsList="nodownload" poster="{{poster}}"><source src="{{src}}" type="{{format}}" />Sorry, your browser doesn\'t support embedded videos, <a href="{{src}}">download</a> and watch with your favorite video player!</video>',
              format: "",
              autoStart: !0,
            },
            defaultType: "image",
            animationEffect: "zoom",
            animationDuration: 366,
            zoomOpacity: "auto",
            transitionEffect: "fade",
            transitionDuration: 366,
            slideClass: "",
            baseClass: "",
            baseTpl:
              '<div class="fancybox-container" role="dialog" tabindex="-1"><div class="fancybox-bg"></div><div class="fancybox-inner"><div class="fancybox-infobar"><span data-fancybox-index></span>&nbsp;/&nbsp;<span data-fancybox-count></span></div><div class="fancybox-toolbar">{{buttons}}</div><div class="fancybox-navigation">{{arrows}}</div><div class="fancybox-stage"></div><div class="fancybox-caption"><div class="fancybox-caption__body"></div></div></div></div>',
            spinnerTpl: '<div class="fancybox-loading"></div>',
            errorTpl: '<div class="fancybox-error"><p>{{ERROR}}</p></div>',
            btnTpl: {
              download:
                '<a download data-fancybox-download class="fancybox-button fancybox-button--download" title="{{DOWNLOAD}}" href="javascript:;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18.62 17.09V19H5.38v-1.91zm-2.97-6.96L17 11.45l-5 4.87-5-4.87 1.36-1.32 2.68 2.64V5h1.92v7.77z"/></svg></a>',
              zoom: '<button data-fancybox-zoom class="fancybox-button fancybox-button--zoom" title="{{ZOOM}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18.7 17.3l-3-3a5.9 5.9 0 0 0-.6-7.6 5.9 5.9 0 0 0-8.4 0 5.9 5.9 0 0 0 0 8.4 5.9 5.9 0 0 0 7.7.7l3 3a1 1 0 0 0 1.3 0c.4-.5.4-1 0-1.5zM8.1 13.8a4 4 0 0 1 0-5.7 4 4 0 0 1 5.7 0 4 4 0 0 1 0 5.7 4 4 0 0 1-5.7 0z"/></svg></button>',
              close:
                '<button data-fancybox-close class="fancybox-button fancybox-button--close" title="{{CLOSE}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 10.6L6.6 5.2 5.2 6.6l5.4 5.4-5.4 5.4 1.4 1.4 5.4-5.4 5.4 5.4 1.4-1.4-5.4-5.4 5.4-5.4-1.4-1.4-5.4 5.4z"/></svg></button>',
              arrowLeft:
                '<button data-fancybox-prev class="fancybox-button fancybox-button--arrow_left" title="{{PREV}}"><div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M11.28 15.7l-1.34 1.37L5 12l4.94-5.07 1.34 1.38-2.68 2.72H19v1.94H8.6z"/></svg></div></button>',
              arrowRight:
                '<button data-fancybox-next class="fancybox-button fancybox-button--arrow_right" title="{{NEXT}}"><div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15.4 12.97l-2.68 2.72 1.34 1.38L19 12l-4.94-5.07-1.34 1.38 2.68 2.72H5v1.94z"/></svg></div></button>',
              smallBtn:
                '<button type="button" data-fancybox-close class="fancybox-button fancybox-close-small" title="{{CLOSE}}"><svg xmlns="http://www.w3.org/2000/svg" version="1" viewBox="0 0 24 24"><path d="M13 12l5-5-1-1-5 5-5-5-1 1 5 5-5 5 1 1 5-5 5 5 1-1z"/></svg></button>',
            },
            parentEl: "body",
            hideScrollbar: !0,
            autoFocus: !0,
            backFocus: !0,
            trapFocus: !0,
            fullScreen: { autoStart: !1 },
            touch: { vertical: !0, momentum: !0 },
            hash: null,
            media: {},
            slideShow: { autoStart: !1, speed: 3e3 },
            thumbs: {
              autoStart: !1,
              hideOnClose: !0,
              parentEl: ".fancybox-container",
              axis: "y",
            },
            wheel: "auto",
            onInit: m.noop,
            beforeLoad: m.noop,
            afterLoad: m.noop,
            beforeShow: m.noop,
            afterShow: m.noop,
            beforeClose: m.noop,
            afterClose: m.noop,
            onActivate: m.noop,
            onDeactivate: m.noop,
            clickContent: function (e, t) {
              return "image" === e.type && "zoom";
            },
            clickSlide: "close",
            clickOutside: "close",
            dblclickContent: !1,
            dblclickSlide: !1,
            dblclickOutside: !1,
            mobile: {
              preventCaptionOverlap: !1,
              idleTime: !1,
              clickContent: function (e, t) {
                return "image" === e.type && "toggleControls";
              },
              clickSlide: function (e, t) {
                return "image" === e.type ? "toggleControls" : "close";
              },
              dblclickContent: function (e, t) {
                return "image" === e.type && "zoom";
              },
              dblclickSlide: function (e, t) {
                return "image" === e.type && "zoom";
              },
            },
            lang: "en",
            i18n: {
              en: {
                CLOSE: "Close",
                NEXT: "Next",
                PREV: "Previous",
                ERROR:
                  "The requested content cannot be loaded. <br/> Please try again later.",
                PLAY_START: "Start slideshow",
                PLAY_STOP: "Pause slideshow",
                FULL_SCREEN: "Full screen",
                THUMBS: "Thumbnails",
                DOWNLOAD: "Download",
                SHARE: "Share",
                ZOOM: "Zoom",
              },
              de: {
                CLOSE: "Schlie&szlig;en",
                NEXT: "Weiter",
                PREV: "Zur&uuml;ck",
                ERROR:
                  "Die angeforderten Daten konnten nicht geladen werden. <br/> Bitte versuchen Sie es sp&auml;ter nochmal.",
                PLAY_START: "Diaschau starten",
                PLAY_STOP: "Diaschau beenden",
                FULL_SCREEN: "Vollbild",
                THUMBS: "Vorschaubilder",
                DOWNLOAD: "Herunterladen",
                SHARE: "Teilen",
                ZOOM: "Vergr&ouml;&szlig;ern",
              },
            },
          },
          o = m(l),
          a = m(d),
          r = 0,
          p =
            l.requestAnimationFrame ||
            l.webkitRequestAnimationFrame ||
            l.mozRequestAnimationFrame ||
            l.oRequestAnimationFrame ||
            function (e) {
              return l.setTimeout(e, 1e3 / 60);
            },
          c =
            l.cancelAnimationFrame ||
            l.webkitCancelAnimationFrame ||
            l.mozCancelAnimationFrame ||
            l.oCancelAnimationFrame ||
            function (e) {
              l.clearTimeout(e);
            },
          h = (function () {
            var e,
              t = d.createElement("fakeelement"),
              i = {
                transition: "transitionend",
                OTransition: "oTransitionEnd",
                MozTransition: "transitionend",
                WebkitTransition: "webkitTransitionEnd",
              };
            for (e in i) if (t.style[e] !== g) return i[e];
            return "transitionend";
          })(),
          u = function (e) {
            return e && e.length && e[0].offsetHeight;
          },
          f = function (e, t) {
            var i = m.extend(!0, {}, e, t);
            return (
              m.each(t, function (e, t) {
                m.isArray(t) && (i[e] = t);
              }),
              i
            );
          },
          v = function (e, t, i) {
            var n = this;
            (n.opts = f({ index: i }, m.fancybox.defaults)),
              m.isPlainObject(t) && (n.opts = f(n.opts, t)),
              m.fancybox.isMobile && (n.opts = f(n.opts, n.opts.mobile)),
              (n.id = n.opts.id || ++r),
              (n.currIndex = parseInt(n.opts.index, 10) || 0),
              (n.prevIndex = null),
              (n.prevPos = null),
              (n.currPos = 0),
              (n.firstRun = !0),
              (n.group = []),
              (n.slides = {}),
              n.addContent(e),
              n.group.length && n.init();
          };
        m.extend(v.prototype, {
          init: function () {
            var t,
              i,
              n = this,
              s = n.group[n.currIndex].opts;
            s.closeExisting && m.fancybox.close(!0),
              m("body").addClass("fancybox-active"),
              !m.fancybox.getInstance() &&
                !1 !== s.hideScrollbar &&
                !m.fancybox.isMobile &&
                d.body.scrollHeight > l.innerHeight &&
                (m("head").append(
                  '<style id="fancybox-style-noscroll" type="text/css">.compensate-for-scrollbar{margin-right:' +
                    (l.innerWidth - d.documentElement.clientWidth) +
                    "px;}</style>"
                ),
                m("body").addClass("compensate-for-scrollbar")),
              (i = ""),
              m.each(s.buttons, function (e, t) {
                i += s.btnTpl[t] || "";
              }),
              (t = m(
                n.translate(
                  n,
                  s.baseTpl
                    .replace("{{buttons}}", i)
                    .replace(
                      "{{arrows}}",
                      s.btnTpl.arrowLeft + s.btnTpl.arrowRight
                    )
                )
              )
                .attr("id", "fancybox-container-" + n.id)
                .addClass(s.baseClass)
                .data("FancyBox", n)
                .appendTo(s.parentEl)),
              (n.$refs = { container: t }),
              [
                "bg",
                "inner",
                "infobar",
                "toolbar",
                "stage",
                "caption",
                "navigation",
              ].forEach(function (e) {
                n.$refs[e] = t.find(".fancybox-" + e);
              }),
              n.trigger("onInit"),
              n.activate(),
              n.jumpTo(n.currIndex);
          },
          translate: function (e, t) {
            var i = e.opts.i18n[e.opts.lang] || e.opts.i18n.en;
            return t.replace(/\{\{(\w+)\}\}/g, function (e, t) {
              return i[t] === g ? e : i[t];
            });
          },
          addContent: function (e) {
            var t,
              d = this,
              i = m.makeArray(e);
            m.each(i, function (e, t) {
              var i,
                n,
                s,
                o,
                a,
                r = {},
                l = {};
              m.isPlainObject(t)
                ? (l = (r = t).opts || t)
                : "object" === m.type(t) && m(t).length
                ? ((l = (i = m(t)).data() || {}),
                  ((l = m.extend(!0, {}, l, l.options)).$orig = i),
                  (r.src = d.opts.src || l.src || i.attr("href")),
                  r.type || r.src || ((r.type = "inline"), (r.src = t)))
                : (r = { type: "html", src: t + "" }),
                (r.opts = m.extend(!0, {}, d.opts, l)),
                m.isArray(l.buttons) && (r.opts.buttons = l.buttons),
                m.fancybox.isMobile &&
                  r.opts.mobile &&
                  (r.opts = f(r.opts, r.opts.mobile)),
                (n = r.type || r.opts.type),
                (o = r.src || ""),
                !n &&
                  o &&
                  ((s = o.match(/\.(mp4|mov|ogv|webm)((\?|#).*)?$/i))
                    ? ((n = "video"),
                      r.opts.video.format ||
                        (r.opts.video.format =
                          "video/" + ("ogv" === s[1] ? "ogg" : s[1])))
                    : o.match(
                        /(^data:image\/[a-z0-9+\/=]*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg|ico)((\?|#).*)?$)/i
                      )
                    ? (n = "image")
                    : o.match(/\.(pdf)((\?|#).*)?$/i)
                    ? ((n = "iframe"),
                      (r = m.extend(!0, r, {
                        contentType: "pdf",
                        opts: { iframe: { preload: !1 } },
                      })))
                    : "#" === o.charAt(0) && (n = "inline")),
                n ? (r.type = n) : d.trigger("objectNeedsType", r),
                r.contentType ||
                  (r.contentType =
                    -1 < m.inArray(r.type, ["html", "inline", "ajax"])
                      ? "html"
                      : r.type),
                (r.index = d.group.length),
                "auto" == r.opts.smallBtn &&
                  (r.opts.smallBtn =
                    -1 < m.inArray(r.type, ["html", "inline", "ajax"])),
                "auto" === r.opts.toolbar &&
                  (r.opts.toolbar = !r.opts.smallBtn),
                (r.$thumb = r.opts.$thumb || null),
                r.opts.$trigger &&
                  r.index === d.opts.index &&
                  ((r.$thumb = r.opts.$trigger.find("img:first")),
                  r.$thumb.length && (r.opts.$orig = r.opts.$trigger)),
                (r.$thumb && r.$thumb.length) ||
                  !r.opts.$orig ||
                  (r.$thumb = r.opts.$orig.find("img:first")),
                r.$thumb && !r.$thumb.length && (r.$thumb = null),
                (r.thumb = r.opts.thumb || (r.$thumb ? r.$thumb[0].src : null)),
                "function" === m.type(r.opts.caption) &&
                  (r.opts.caption = r.opts.caption.apply(t, [d, r])),
                "function" === m.type(d.opts.caption) &&
                  (r.opts.caption = d.opts.caption.apply(t, [d, r])),
                r.opts.caption instanceof m ||
                  (r.opts.caption =
                    r.opts.caption === g ? "" : r.opts.caption + ""),
                "ajax" === r.type &&
                  1 < (a = o.split(/\s+/, 2)).length &&
                  ((r.src = a.shift()), (r.opts.filter = a.shift())),
                r.opts.modal &&
                  (r.opts = m.extend(!0, r.opts, {
                    trapFocus: !0,
                    infobar: 0,
                    toolbar: 0,
                    smallBtn: 0,
                    keyboard: 0,
                    slideShow: 0,
                    fullScreen: 0,
                    thumbs: 0,
                    touch: 0,
                    clickContent: !1,
                    clickSlide: !1,
                    clickOutside: !1,
                    dblclickContent: !1,
                    dblclickSlide: !1,
                    dblclickOutside: !1,
                  })),
                d.group.push(r);
            }),
              Object.keys(d.slides).length &&
                (d.updateControls(),
                (t = d.Thumbs) && t.isActive && (t.create(), t.focus()));
          },
          addEvents: function () {
            var n = this;
            n.removeEvents(),
              n.$refs.container
                .on("click.fb-close", "[data-fancybox-close]", function (e) {
                  e.stopPropagation(), e.preventDefault(), n.close(e);
                })
                .on(
                  "touchstart.fb-prev click.fb-prev",
                  "[data-fancybox-prev]",
                  function (e) {
                    e.stopPropagation(), e.preventDefault(), n.previous();
                  }
                )
                .on(
                  "touchstart.fb-next click.fb-next",
                  "[data-fancybox-next]",
                  function (e) {
                    e.stopPropagation(), e.preventDefault(), n.next();
                  }
                )
                .on("click.fb", "[data-fancybox-zoom]", function (e) {
                  n[n.isScaledDown() ? "scaleToActual" : "scaleToFit"]();
                }),
              o.on("orientationchange.fb resize.fb", function (e) {
                e && e.originalEvent && "resize" === e.originalEvent.type
                  ? (n.requestId && c(n.requestId),
                    (n.requestId = p(function () {
                      n.update(e);
                    })))
                  : (n.current &&
                      "iframe" === n.current.type &&
                      n.$refs.stage.hide(),
                    setTimeout(
                      function () {
                        n.$refs.stage.show(), n.update(e);
                      },
                      m.fancybox.isMobile ? 600 : 250
                    ));
              }),
              a.on("keydown.fb", function (e) {
                var t = (m.fancybox ? m.fancybox.getInstance() : null).current,
                  i = e.keyCode || e.which;
                if (9 != i) {
                  if (
                    !(
                      !t.opts.keyboard ||
                      e.ctrlKey ||
                      e.altKey ||
                      e.shiftKey ||
                      m(e.target).is("input,textarea,video,audio,select")
                    )
                  )
                    return 8 === i || 27 === i
                      ? (e.preventDefault(), void n.close(e))
                      : 37 === i || 38 === i
                      ? (e.preventDefault(), void n.previous())
                      : 39 === i || 40 === i
                      ? (e.preventDefault(), void n.next())
                      : void n.trigger("afterKeydown", e, i);
                } else t.opts.trapFocus && n.focus(e);
              }),
              n.group[n.currIndex].opts.idleTime &&
                ((n.idleSecondsCounter = 0),
                a.on(
                  "mousemove.fb-idle mouseleave.fb-idle mousedown.fb-idle touchstart.fb-idle touchmove.fb-idle scroll.fb-idle keydown.fb-idle",
                  function (e) {
                    (n.idleSecondsCounter = 0),
                      n.isIdle && n.showControls(),
                      (n.isIdle = !1);
                  }
                ),
                (n.idleInterval = l.setInterval(function () {
                  n.idleSecondsCounter++,
                    n.idleSecondsCounter >=
                      n.group[n.currIndex].opts.idleTime &&
                      !n.isDragging &&
                      ((n.isIdle = !0),
                      (n.idleSecondsCounter = 0),
                      n.hideControls());
                }, 1e3)));
          },
          removeEvents: function () {
            o.off("orientationchange.fb resize.fb"),
              a.off("keydown.fb .fb-idle"),
              this.$refs.container.off(".fb-close .fb-prev .fb-next"),
              this.idleInterval &&
                (l.clearInterval(this.idleInterval),
                (this.idleInterval = null));
          },
          previous: function (e) {
            return this.jumpTo(this.currPos - 1, e);
          },
          next: function (e) {
            return this.jumpTo(this.currPos + 1, e);
          },
          jumpTo: function (e, n) {
            var t,
              i,
              s,
              o,
              a,
              r,
              l,
              d,
              c,
              h = this,
              p = h.group.length;
            if (
              !(h.isDragging || h.isClosing || (h.isAnimating && h.firstRun))
            ) {
              if (
                ((e = parseInt(e, 10)),
                !(s = h.current ? h.current.opts.loop : h.opts.loop) &&
                  (e < 0 || p <= e))
              )
                return !1;
              if (
                ((t = h.firstRun = !Object.keys(h.slides).length),
                (a = h.current),
                (h.prevIndex = h.currIndex),
                (h.prevPos = h.currPos),
                (o = h.createSlide(e)),
                1 < p &&
                  ((s || o.index < p - 1) && h.createSlide(e + 1),
                  (s || 0 < o.index) && h.createSlide(e - 1)),
                (h.current = o),
                (h.currIndex = o.index),
                (h.currPos = o.pos),
                h.trigger("beforeShow", t),
                h.updateControls(),
                (o.forcedDuration = g),
                m.isNumeric(n)
                  ? (o.forcedDuration = n)
                  : (n =
                      o.opts[t ? "animationDuration" : "transitionDuration"]),
                (n = parseInt(n, 10)),
                (i = h.isMoved(o)),
                o.$slide.addClass("fancybox-slide--current"),
                t)
              )
                return (
                  o.opts.animationEffect &&
                    n &&
                    h.$refs.container.css("transition-duration", n + "ms"),
                  h.$refs.container
                    .addClass("fancybox-is-open")
                    .trigger("focus"),
                  h.loadSlide(o),
                  void h.preload("image")
                );
              (r = m.fancybox.getTranslate(a.$slide)),
                (l = m.fancybox.getTranslate(h.$refs.stage)),
                m.each(h.slides, function (e, t) {
                  m.fancybox.stop(t.$slide, !0);
                }),
                a.pos !== o.pos && (a.isComplete = !1),
                a.$slide.removeClass(
                  "fancybox-slide--complete fancybox-slide--current"
                ),
                i
                  ? ((c = r.left - (a.pos * r.width + a.pos * a.opts.gutter)),
                    m.each(h.slides, function (e, t) {
                      t.$slide
                        .removeClass("fancybox-animated")
                        .removeClass(function (e, t) {
                          return (t.match(/(^|\s)fancybox-fx-\S+/g) || []).join(
                            " "
                          );
                        });
                      var i = t.pos * r.width + t.pos * t.opts.gutter;
                      m.fancybox.setTranslate(t.$slide, {
                        top: 0,
                        left: i - l.left + c,
                      }),
                        t.pos !== o.pos &&
                          t.$slide.addClass(
                            "fancybox-slide--" +
                              (t.pos > o.pos ? "next" : "previous")
                          ),
                        u(t.$slide),
                        m.fancybox.animate(
                          t.$slide,
                          {
                            top: 0,
                            left:
                              (t.pos - o.pos) * r.width +
                              (t.pos - o.pos) * t.opts.gutter,
                          },
                          n,
                          function () {
                            t.$slide
                              .css({ transform: "", opacity: "" })
                              .removeClass(
                                "fancybox-slide--next fancybox-slide--previous"
                              ),
                              t.pos === h.currPos && h.complete();
                          }
                        );
                    }))
                  : n &&
                    o.opts.transitionEffect &&
                    ((d =
                      "fancybox-animated fancybox-fx-" +
                      o.opts.transitionEffect),
                    a.$slide.addClass(
                      "fancybox-slide--" + (a.pos > o.pos ? "next" : "previous")
                    ),
                    m.fancybox.animate(
                      a.$slide,
                      d,
                      n,
                      function () {
                        a.$slide
                          .removeClass(d)
                          .removeClass(
                            "fancybox-slide--next fancybox-slide--previous"
                          );
                      },
                      !1
                    )),
                o.isLoaded ? h.revealContent(o) : h.loadSlide(o),
                h.preload("image");
            }
          },
          createSlide: function (e) {
            var t,
              i,
              n = this;
            return (
              (i = (i = e % n.group.length) < 0 ? n.group.length + i : i),
              !n.slides[e] &&
                n.group[i] &&
                ((t = m('<div class="fancybox-slide"></div>').appendTo(
                  n.$refs.stage
                )),
                (n.slides[e] = m.extend(!0, {}, n.group[i], {
                  pos: e,
                  $slide: t,
                  isLoaded: !1,
                })),
                n.updateSlide(n.slides[e])),
              n.slides[e]
            );
          },
          scaleToActual: function (e, t, i) {
            var n,
              s,
              o,
              a,
              r,
              l = this,
              d = l.current,
              c = d.$content,
              h = m.fancybox.getTranslate(d.$slide).width,
              p = m.fancybox.getTranslate(d.$slide).height,
              u = d.width,
              f = d.height;
            l.isAnimating ||
              l.isMoved() ||
              !c ||
              "image" != d.type ||
              !d.isLoaded ||
              d.hasError ||
              ((l.isAnimating = !0),
              m.fancybox.stop(c),
              (e = e === g ? 0.5 * h : e),
              (t = t === g ? 0.5 * p : t),
              ((n = m.fancybox.getTranslate(c)).top -= m.fancybox.getTranslate(
                d.$slide
              ).top),
              (n.left -= m.fancybox.getTranslate(d.$slide).left),
              (a = u / n.width),
              (r = f / n.height),
              (s = 0.5 * h - 0.5 * u),
              (o = 0.5 * p - 0.5 * f),
              h < u &&
                (0 < (s = n.left * a - (e * a - e)) && (s = 0),
                s < h - u && (s = h - u)),
              p < f &&
                (0 < (o = n.top * r - (t * r - t)) && (o = 0),
                o < p - f && (o = p - f)),
              l.updateCursor(u, f),
              m.fancybox.animate(
                c,
                { top: o, left: s, scaleX: a, scaleY: r },
                i || 366,
                function () {
                  l.isAnimating = !1;
                }
              ),
              l.SlideShow && l.SlideShow.isActive && l.SlideShow.stop());
          },
          scaleToFit: function (e) {
            var t,
              i = this,
              n = i.current,
              s = n.$content;
            i.isAnimating ||
              i.isMoved() ||
              !s ||
              "image" != n.type ||
              !n.isLoaded ||
              n.hasError ||
              ((i.isAnimating = !0),
              m.fancybox.stop(s),
              (t = i.getFitPos(n)),
              i.updateCursor(t.width, t.height),
              m.fancybox.animate(
                s,
                {
                  top: t.top,
                  left: t.left,
                  scaleX: t.width / s.width(),
                  scaleY: t.height / s.height(),
                },
                e || 366,
                function () {
                  i.isAnimating = !1;
                }
              ));
          },
          getFitPos: function (e) {
            var t,
              i,
              n,
              s,
              o = e.$content,
              a = e.$slide,
              r = e.width || e.opts.width,
              l = e.height || e.opts.height,
              d = {};
            return (
              !!(e.isLoaded && o && o.length) &&
              ((t = m.fancybox.getTranslate(this.$refs.stage).width),
              (i = m.fancybox.getTranslate(this.$refs.stage).height),
              (t -=
                parseFloat(a.css("paddingLeft")) +
                parseFloat(a.css("paddingRight")) +
                parseFloat(o.css("marginLeft")) +
                parseFloat(o.css("marginRight"))),
              (i -=
                parseFloat(a.css("paddingTop")) +
                parseFloat(a.css("paddingBottom")) +
                parseFloat(o.css("marginTop")) +
                parseFloat(o.css("marginBottom"))),
              (r && l) || ((r = t), (l = i)),
              t - 0.5 < (r *= n = Math.min(1, t / r, i / l)) && (r = t),
              i - 0.5 < (l *= n) && (l = i),
              "image" === e.type
                ? ((d.top =
                    Math.floor(0.5 * (i - l)) +
                    parseFloat(a.css("paddingTop"))),
                  (d.left =
                    Math.floor(0.5 * (t - r)) +
                    parseFloat(a.css("paddingLeft"))))
                : "video" === e.contentType &&
                  (r /
                    (s =
                      e.opts.width && e.opts.height
                        ? r / l
                        : e.opts.ratio || 16 / 9) <
                  l
                    ? (l = r / s)
                    : l * s < r && (r = l * s)),
              (d.width = r),
              (d.height = l),
              d)
            );
          },
          update: function (i) {
            var n = this;
            m.each(n.slides, function (e, t) {
              n.updateSlide(t, i);
            });
          },
          updateSlide: function (e, t) {
            var i = this,
              n = e && e.$content,
              s = e.width || e.opts.width,
              o = e.height || e.opts.height,
              a = e.$slide;
            i.adjustCaption(e),
              n &&
                (s || o || "video" === e.contentType) &&
                !e.hasError &&
                (m.fancybox.stop(n),
                m.fancybox.setTranslate(n, i.getFitPos(e)),
                e.pos === i.currPos &&
                  ((i.isAnimating = !1), i.updateCursor())),
              i.adjustLayout(e),
              a.length &&
                (a.trigger("refresh"),
                e.pos === i.currPos &&
                  i.$refs.toolbar
                    .add(
                      i.$refs.navigation.find(".fancybox-button--arrow_right")
                    )
                    .toggleClass(
                      "compensate-for-scrollbar",
                      a.get(0).scrollHeight > a.get(0).clientHeight
                    )),
              i.trigger("onUpdate", e, t);
          },
          centerSlide: function (e) {
            var t = this,
              i = t.current,
              n = i.$slide;
            !t.isClosing &&
              i &&
              (n.siblings().css({ transform: "", opacity: "" }),
              n
                .parent()
                .children()
                .removeClass("fancybox-slide--previous fancybox-slide--next"),
              m.fancybox.animate(
                n,
                { top: 0, left: 0, opacity: 1 },
                e === g ? 0 : e,
                function () {
                  n.css({ transform: "", opacity: "" }),
                    i.isComplete || t.complete();
                },
                !1
              ));
          },
          isMoved: function (e) {
            var t,
              i,
              n = e || this.current;
            return (
              !!n &&
              ((i = m.fancybox.getTranslate(this.$refs.stage)),
              (t = m.fancybox.getTranslate(n.$slide)),
              !n.$slide.hasClass("fancybox-animated") &&
                (0.5 < Math.abs(t.top - i.top) ||
                  0.5 < Math.abs(t.left - i.left)))
            );
          },
          updateCursor: function (e, t) {
            var i,
              n,
              s = this,
              o = s.current,
              a = s.$refs.container;
            o &&
              !s.isClosing &&
              s.Guestures &&
              (a.removeClass(
                "fancybox-is-zoomable fancybox-can-zoomIn fancybox-can-zoomOut fancybox-can-swipe fancybox-can-pan"
              ),
              (n = !!(i = s.canPan(e, t)) || s.isZoomable()),
              a.toggleClass("fancybox-is-zoomable", n),
              m("[data-fancybox-zoom]").prop("disabled", !n),
              i
                ? a.addClass("fancybox-can-pan")
                : n &&
                  ("zoom" === o.opts.clickContent ||
                    (m.isFunction(o.opts.clickContent) &&
                      "zoom" == o.opts.clickContent(o)))
                ? a.addClass("fancybox-can-zoomIn")
                : o.opts.touch &&
                  (o.opts.touch.vertical || 1 < s.group.length) &&
                  "video" !== o.contentType &&
                  a.addClass("fancybox-can-swipe"));
          },
          isZoomable: function () {
            var e,
              t = this.current;
            if (t && !this.isClosing && "image" === t.type && !t.hasError) {
              if (!t.isLoaded) return !0;
              if (
                (e = this.getFitPos(t)) &&
                (t.width > e.width || t.height > e.height)
              )
                return !0;
            }
            return !1;
          },
          isScaledDown: function (e, t) {
            var i = !1,
              n = this.current,
              s = n.$content;
            return (
              e !== g && t !== g
                ? (i = e < n.width && t < n.height)
                : s &&
                  (i =
                    (i = m.fancybox.getTranslate(s)).width < n.width &&
                    i.height < n.height),
              i
            );
          },
          canPan: function (e, t) {
            var i = this.current,
              n = null,
              s = !1;
            return (
              "image" === i.type &&
                (i.isComplete || (e && t)) &&
                !i.hasError &&
                ((s = this.getFitPos(i)),
                e !== g && t !== g
                  ? (n = { width: e, height: t })
                  : i.isComplete && (n = m.fancybox.getTranslate(i.$content)),
                n &&
                  s &&
                  (s =
                    1.5 < Math.abs(n.width - s.width) ||
                    1.5 < Math.abs(n.height - s.height))),
              s
            );
          },
          loadSlide: function (i) {
            var e,
              t,
              n,
              s = this;
            if (!i.isLoading && !i.isLoaded) {
              if (!(i.isLoading = !0) === s.trigger("beforeLoad", i))
                return (i.isLoading = !1);
              switch (
                ((e = i.type),
                (t = i.$slide)
                  .off("refresh")
                  .trigger("onReset")
                  .addClass(i.opts.slideClass),
                e)
              ) {
                case "image":
                  s.setImage(i);
                  break;
                case "iframe":
                  s.setIframe(i);
                  break;
                case "html":
                  s.setContent(i, i.src || i.content);
                  break;
                case "video":
                  s.setContent(
                    i,
                    i.opts.video.tpl
                      .replace(/\{\{src\}\}/gi, i.src)
                      .replace(
                        "{{format}}",
                        i.opts.videoFormat || i.opts.video.format || ""
                      )
                      .replace("{{poster}}", i.thumb || "")
                  );
                  break;
                case "inline":
                  m(i.src).length ? s.setContent(i, m(i.src)) : s.setError(i);
                  break;
                case "ajax":
                  s.showLoading(i),
                    (n = m.ajax(
                      m.extend({}, i.opts.ajax.settings, {
                        url: i.src,
                        success: function (e, t) {
                          "success" === t && s.setContent(i, e);
                        },
                        error: function (e, t) {
                          e && "abort" !== t && s.setError(i);
                        },
                      })
                    )),
                    t.one("onReset", function () {
                      n.abort();
                    });
                  break;
                default:
                  s.setError(i);
              }
              return !0;
            }
          },
          setImage: function (t) {
            var e,
              i = this;
            setTimeout(function () {
              var e = t.$image;
              i.isClosing ||
                !t.isLoading ||
                (e && e.length && e[0].complete) ||
                t.hasError ||
                i.showLoading(t);
            }, 50),
              i.checkSrcset(t),
              (t.$content = m('<div class="fancybox-content"></div>')
                .addClass("fancybox-is-hidden")
                .appendTo(t.$slide.addClass("fancybox-slide--image"))),
              !1 !== t.opts.preload &&
                t.opts.width &&
                t.opts.height &&
                t.thumb &&
                ((t.width = t.opts.width),
                (t.height = t.opts.height),
                ((e = d.createElement("img")).onerror = function () {
                  m(this).remove(), (t.$ghost = null);
                }),
                (e.onload = function () {
                  i.afterLoad(t);
                }),
                (t.$ghost = m(e)
                  .addClass("fancybox-image")
                  .appendTo(t.$content)
                  .attr("src", t.thumb))),
              i.setBigImage(t);
          },
          checkSrcset: function (e) {
            var t,
              i,
              n,
              s,
              o = e.opts.srcset || e.opts.image.srcset;
            if (o) {
              (n = l.devicePixelRatio || 1),
                (s = l.innerWidth * n),
                (i = o.split(",").map(function (e) {
                  var n = {};
                  return (
                    e
                      .trim()
                      .split(/\s+/)
                      .forEach(function (e, t) {
                        var i = parseInt(e.substring(0, e.length - 1), 10);
                        if (0 === t) return (n.url = e);
                        i && ((n.value = i), (n.postfix = e[e.length - 1]));
                      }),
                    n
                  );
                })).sort(function (e, t) {
                  return e.value - t.value;
                });
              for (var a = 0; a < i.length; a++) {
                var r = i[a];
                if (
                  ("w" === r.postfix && r.value >= s) ||
                  ("x" === r.postfix && r.value >= n)
                ) {
                  t = r;
                  break;
                }
              }
              !t && i.length && (t = i[i.length - 1]),
                t &&
                  ((e.src = t.url),
                  e.width &&
                    e.height &&
                    "w" == t.postfix &&
                    ((e.height = (e.width / e.height) * t.value),
                    (e.width = t.value)),
                  (e.opts.srcset = o));
            }
          },
          setBigImage: function (t) {
            var i = this,
              e = d.createElement("img"),
              n = m(e);
            (t.$image = n
              .one("error", function () {
                i.setError(t);
              })
              .one("load", function () {
                var e;
                t.$ghost ||
                  (i.resolveImageSlideSize(
                    t,
                    this.naturalWidth,
                    this.naturalHeight
                  ),
                  i.afterLoad(t)),
                  i.isClosing ||
                    (t.opts.srcset &&
                      (((e = t.opts.sizes) && "auto" !== e) ||
                        (e =
                          (1 < t.width / t.height && 1 < o.width() / o.height()
                            ? "100"
                            : Math.round((t.width / t.height) * 100)) + "vw"),
                      n.attr("sizes", e).attr("srcset", t.opts.srcset)),
                    t.$ghost &&
                      setTimeout(function () {
                        t.$ghost && !i.isClosing && t.$ghost.hide();
                      }, Math.min(300, Math.max(1e3, t.height / 1600))),
                    i.hideLoading(t));
              })
              .addClass("fancybox-image")
              .attr("src", t.src)
              .appendTo(t.$content)),
              (e.complete || "complete" == e.readyState) &&
              n.naturalWidth &&
              n.naturalHeight
                ? n.trigger("load")
                : e.error && n.trigger("error");
          },
          resolveImageSlideSize: function (e, t, i) {
            var n = parseInt(e.opts.width, 10),
              s = parseInt(e.opts.height, 10);
            (e.width = t),
              (e.height = i),
              0 < n && ((e.width = n), (e.height = Math.floor((n * i) / t))),
              0 < s && ((e.width = Math.floor((s * t) / i)), (e.height = s));
          },
          setIframe: function (s) {
            var o,
              t = this,
              a = s.opts.iframe,
              r = s.$slide;
            (s.$content = m(
              '<div class="fancybox-content' +
                (a.preload ? " fancybox-is-hidden" : "") +
                '"></div>'
            )
              .css(a.css)
              .appendTo(r)),
              r.addClass("fancybox-slide--" + s.contentType),
              (s.$iframe = o =
                m(a.tpl.replace(/\{rnd\}/g, new Date().getTime()))
                  .attr(a.attr)
                  .appendTo(s.$content)),
              a.preload
                ? (t.showLoading(s),
                  o.on("load.fb error.fb", function (e) {
                    (this.isReady = 1),
                      s.$slide.trigger("refresh"),
                      t.afterLoad(s);
                  }),
                  r.on("refresh.fb", function () {
                    var e,
                      t = s.$content,
                      i = a.css.width,
                      n = a.css.height;
                    if (1 === o[0].isReady) {
                      try {
                        e = o.contents().find("body");
                      } catch (e) {}
                      e &&
                        e.length &&
                        e.children().length &&
                        (r.css("overflow", "visible"),
                        t.css({
                          width: "100%",
                          "max-width": "100%",
                          height: "9999px",
                        }),
                        i === g &&
                          (i = Math.ceil(
                            Math.max(e[0].clientWidth, e.outerWidth(!0))
                          )),
                        t.css("width", i || "").css("max-width", ""),
                        n === g &&
                          (n = Math.ceil(
                            Math.max(e[0].clientHeight, e.outerHeight(!0))
                          )),
                        t.css("height", n || ""),
                        r.css("overflow", "auto")),
                        t.removeClass("fancybox-is-hidden");
                    }
                  }))
                : t.afterLoad(s),
              o.attr("src", s.src),
              r.one("onReset", function () {
                try {
                  m(this)
                    .find("iframe")
                    .hide()
                    .unbind()
                    .attr("src", "//about:blank");
                } catch (e) {}
                m(this).off("refresh.fb").empty(),
                  (s.isLoaded = !1),
                  (s.isRevealed = !1);
              });
          },
          setContent: function (e, t) {
            this.isClosing ||
              (this.hideLoading(e),
              e.$content && m.fancybox.stop(e.$content),
              e.$slide.empty(),
              (function (e) {
                return e && e.hasOwnProperty && e instanceof m;
              })(t) && t.parent().length
                ? ((t.hasClass("fancybox-content") ||
                    t.parent().hasClass("fancybox-content")) &&
                    t.parents(".fancybox-slide").trigger("onReset"),
                  (e.$placeholder = m("<div>").hide().insertAfter(t)),
                  t.css("display", "inline-block"))
                : e.hasError ||
                  ("string" === m.type(t) &&
                    (t = m("<div>").append(m.trim(t)).contents()),
                  e.opts.filter &&
                    (t = m("<div>").html(t).find(e.opts.filter))),
              e.$slide.one("onReset", function () {
                m(this).find("video,audio").trigger("pause"),
                  e.$placeholder &&
                    (e.$placeholder
                      .after(t.removeClass("fancybox-content").hide())
                      .remove(),
                    (e.$placeholder = null)),
                  e.$smallBtn && (e.$smallBtn.remove(), (e.$smallBtn = null)),
                  e.hasError ||
                    (m(this).empty(), (e.isLoaded = !1), (e.isRevealed = !1));
              }),
              m(t).appendTo(e.$slide),
              m(t).is("video,audio") &&
                (m(t).addClass("fancybox-video"),
                m(t).wrap("<div></div>"),
                (e.contentType = "video"),
                (e.opts.width = e.opts.width || m(t).attr("width")),
                (e.opts.height = e.opts.height || m(t).attr("height"))),
              (e.$content = e.$slide
                .children()
                .filter("div,form,main,video,audio,article,.fancybox-content")
                .first()),
              e.$content.siblings().hide(),
              e.$content.length ||
                (e.$content = e.$slide
                  .wrapInner("<div></div>")
                  .children()
                  .first()),
              e.$content.addClass("fancybox-content"),
              e.$slide.addClass("fancybox-slide--" + e.contentType),
              this.afterLoad(e));
          },
          setError: function (e) {
            (e.hasError = !0),
              e.$slide
                .trigger("onReset")
                .removeClass("fancybox-slide--" + e.contentType)
                .addClass("fancybox-slide--error"),
              (e.contentType = "html"),
              this.setContent(e, this.translate(e, e.opts.errorTpl)),
              e.pos === this.currPos && (this.isAnimating = !1);
          },
          showLoading: function (e) {
            (e = e || this.current) &&
              !e.$spinner &&
              (e.$spinner = m(this.translate(this, this.opts.spinnerTpl))
                .appendTo(e.$slide)
                .hide()
                .fadeIn("fast"));
          },
          hideLoading: function (e) {
            (e = e || this.current) &&
              e.$spinner &&
              (e.$spinner.stop().remove(), delete e.$spinner);
          },
          afterLoad: function (e) {
            var t = this;
            t.isClosing ||
              ((e.isLoading = !1),
              (e.isLoaded = !0),
              t.trigger("afterLoad", e),
              t.hideLoading(e),
              !e.opts.smallBtn ||
                (e.$smallBtn && e.$smallBtn.length) ||
                (e.$smallBtn = m(
                  t.translate(e, e.opts.btnTpl.smallBtn)
                ).appendTo(e.$content)),
              e.opts.protect &&
                e.$content &&
                !e.hasError &&
                (e.$content.on("contextmenu.fb", function (e) {
                  return 2 == e.button && e.preventDefault(), !0;
                }),
                "image" === e.type &&
                  m('<div class="fancybox-spaceball"></div>').appendTo(
                    e.$content
                  )),
              t.adjustCaption(e),
              t.adjustLayout(e),
              e.pos === t.currPos && t.updateCursor(),
              t.revealContent(e));
          },
          adjustCaption: function (e) {
            var t,
              i = this,
              n = e || i.current,
              s = n.opts.caption,
              o = n.opts.preventCaptionOverlap,
              a = i.$refs.caption,
              r = !1;
            a.toggleClass("fancybox-caption--separate", o),
              o &&
                s &&
                s.length &&
                (n.pos !== i.currPos
                  ? ((t = a.clone().appendTo(a.parent()))
                      .children()
                      .eq(0)
                      .empty()
                      .html(s),
                    (r = t.outerHeight(!0)),
                    t.empty().remove())
                  : i.$caption && (r = i.$caption.outerHeight(!0)),
                n.$slide.css("padding-bottom", r || ""));
          },
          adjustLayout: function (e) {
            var t,
              i,
              n,
              s,
              o = e || this.current;
            o.isLoaded &&
              !0 !== o.opts.disableLayoutFix &&
              (o.$content.css("margin-bottom", ""),
              o.$content.outerHeight() > o.$slide.height() + 0.5 &&
                ((n = o.$slide[0].style["padding-bottom"]),
                (s = o.$slide.css("padding-bottom")),
                0 < parseFloat(s) &&
                  ((t = o.$slide[0].scrollHeight),
                  o.$slide.css("padding-bottom", 0),
                  Math.abs(t - o.$slide[0].scrollHeight) < 1 && (i = s),
                  o.$slide.css("padding-bottom", n))),
              o.$content.css("margin-bottom", i));
          },
          revealContent: function (e) {
            var t,
              i,
              n,
              s,
              o = this,
              a = e.$slide,
              r = !1,
              l = !1,
              d = o.isMoved(e),
              c = e.isRevealed;
            return (
              (e.isRevealed = !0),
              (t = e.opts[o.firstRun ? "animationEffect" : "transitionEffect"]),
              (n =
                e.opts[
                  o.firstRun ? "animationDuration" : "transitionDuration"
                ]),
              (n = parseInt(e.forcedDuration === g ? n : e.forcedDuration, 10)),
              (!d && e.pos === o.currPos && n) || (t = !1),
              "zoom" === t &&
                (e.pos === o.currPos &&
                n &&
                "image" === e.type &&
                !e.hasError &&
                (l = o.getThumbPos(e))
                  ? (r = o.getFitPos(e))
                  : (t = "fade")),
              "zoom" === t
                ? ((o.isAnimating = !0),
                  (r.scaleX = r.width / l.width),
                  (r.scaleY = r.height / l.height),
                  "auto" == (s = e.opts.zoomOpacity) &&
                    (s =
                      0.1 < Math.abs(e.width / e.height - l.width / l.height)),
                  s && ((l.opacity = 0.1), (r.opacity = 1)),
                  m.fancybox.setTranslate(
                    e.$content.removeClass("fancybox-is-hidden"),
                    l
                  ),
                  u(e.$content),
                  void m.fancybox.animate(e.$content, r, n, function () {
                    (o.isAnimating = !1), o.complete();
                  }))
                : (o.updateSlide(e),
                  t
                    ? (m.fancybox.stop(a),
                      (i =
                        "fancybox-slide--" +
                        (e.pos >= o.prevPos ? "next" : "previous") +
                        " fancybox-animated fancybox-fx-" +
                        t),
                      a.addClass(i).removeClass("fancybox-slide--current"),
                      e.$content.removeClass("fancybox-is-hidden"),
                      u(a),
                      "image" !== e.type && e.$content.hide().show(0),
                      void m.fancybox.animate(
                        a,
                        "fancybox-slide--current",
                        n,
                        function () {
                          a.removeClass(i).css({ transform: "", opacity: "" }),
                            e.pos === o.currPos && o.complete();
                        },
                        !0
                      ))
                    : (e.$content.removeClass("fancybox-is-hidden"),
                      c ||
                        !d ||
                        "image" !== e.type ||
                        e.hasError ||
                        e.$content.hide().fadeIn("fast"),
                      void (e.pos === o.currPos && o.complete())))
            );
          },
          getThumbPos: function (e) {
            var t,
              i,
              n,
              s,
              o,
              a,
              r = e.$thumb;
            return (
              !(
                !r ||
                !(function (e) {
                  var t, i;
                  return (
                    !(!e || e.ownerDocument !== d) &&
                    (m(".fancybox-container").css("pointer-events", "none"),
                    (t = {
                      x: e.getBoundingClientRect().left + e.offsetWidth / 2,
                      y: e.getBoundingClientRect().top + e.offsetHeight / 2,
                    }),
                    (i = d.elementFromPoint(t.x, t.y) === e),
                    m(".fancybox-container").css("pointer-events", ""),
                    i)
                  );
                })(r[0])
              ) &&
              ((i = m.fancybox.getTranslate(r)),
              (n = parseFloat(r.css("border-top-width") || 0)),
              (s = parseFloat(r.css("border-right-width") || 0)),
              (o = parseFloat(r.css("border-bottom-width") || 0)),
              (a = parseFloat(r.css("border-left-width") || 0)),
              (t = {
                top: i.top + n,
                left: i.left + a,
                width: i.width - s - a,
                height: i.height - n - o,
                scaleX: 1,
                scaleY: 1,
              }),
              0 < i.width && 0 < i.height && t)
            );
          },
          complete: function () {
            var e,
              i = this,
              t = i.current,
              n = {};
            !i.isMoved() &&
              t.isLoaded &&
              (t.isComplete ||
                ((t.isComplete = !0),
                t.$slide.siblings().trigger("onReset"),
                i.preload("inline"),
                u(t.$slide),
                t.$slide.addClass("fancybox-slide--complete"),
                m.each(i.slides, function (e, t) {
                  t.pos >= i.currPos - 1 && t.pos <= i.currPos + 1
                    ? (n[t.pos] = t)
                    : t && (m.fancybox.stop(t.$slide), t.$slide.off().remove());
                }),
                (i.slides = n)),
              (i.isAnimating = !1),
              i.updateCursor(),
              i.trigger("afterShow"),
              t.opts.video.autoStart &&
                t.$slide
                  .find("video,audio")
                  .filter(":visible:first")
                  .trigger("play")
                  .one("ended", function () {
                    Document.exitFullscreen
                      ? Document.exitFullscreen()
                      : this.webkitExitFullscreen &&
                        this.webkitExitFullscreen(),
                      i.next();
                  }),
              t.opts.autoFocus &&
                "html" === t.contentType &&
                ((e = t.$content.find("input[autofocus]:enabled:visible:first"))
                  .length
                  ? e.trigger("focus")
                  : i.focus(null, !0)),
              t.$slide.scrollTop(0).scrollLeft(0));
          },
          preload: function (e) {
            var t,
              i,
              n = this;
            n.group.length < 2 ||
              ((i = n.slides[n.currPos + 1]),
              (t = n.slides[n.currPos - 1]) && t.type === e && n.loadSlide(t),
              i && i.type === e && n.loadSlide(i));
          },
          focus: function (e, t) {
            var i,
              n,
              s = this,
              o = [
                "a[href]",
                "area[href]",
                'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
                "select:not([disabled]):not([aria-hidden])",
                "textarea:not([disabled]):not([aria-hidden])",
                "button:not([disabled]):not([aria-hidden])",
                "iframe",
                "object",
                "embed",
                "video",
                "audio",
                "[contenteditable]",
                '[tabindex]:not([tabindex^="-"])',
              ].join(",");
            s.isClosing ||
              ((i = (i =
                !e && s.current && s.current.isComplete
                  ? s.current.$slide.find(
                      "*:visible" + (t ? ":not(.fancybox-close-small)" : "")
                    )
                  : s.$refs.container.find("*:visible"))
                .filter(o)
                .filter(function () {
                  return (
                    "hidden" !== m(this).css("visibility") &&
                    !m(this).hasClass("disabled")
                  );
                })).length
                ? ((n = i.index(d.activeElement)),
                  e && e.shiftKey
                    ? (n < 0 || 0 == n) &&
                      (e.preventDefault(), i.eq(i.length - 1).trigger("focus"))
                    : (n < 0 || n == i.length - 1) &&
                      (e && e.preventDefault(), i.eq(0).trigger("focus")))
                : s.$refs.container.trigger("focus"));
          },
          activate: function () {
            var t = this;
            m(".fancybox-container").each(function () {
              var e = m(this).data("FancyBox");
              e &&
                e.id !== t.id &&
                !e.isClosing &&
                (e.trigger("onDeactivate"),
                e.removeEvents(),
                (e.isVisible = !1));
            }),
              (t.isVisible = !0),
              (t.current || t.isIdle) && (t.update(), t.updateControls()),
              t.trigger("onActivate"),
              t.addEvents();
          },
          close: function (e, t) {
            function i() {
              c.cleanUp(e);
            }
            var n,
              s,
              o,
              a,
              r,
              l,
              d,
              c = this,
              h = c.current;
            return (
              !c.isClosing &&
              (!(c.isClosing = !0) === c.trigger("beforeClose", e)
                ? ((c.isClosing = !1),
                  p(function () {
                    c.update();
                  }),
                  !1)
                : (c.removeEvents(),
                  (o = h.$content),
                  (n = h.opts.animationEffect),
                  (s = m.isNumeric(t) ? t : n ? h.opts.animationDuration : 0),
                  h.$slide.removeClass(
                    "fancybox-slide--complete fancybox-slide--next fancybox-slide--previous fancybox-animated"
                  ),
                  !0 !== e ? m.fancybox.stop(h.$slide) : (n = !1),
                  h.$slide.siblings().trigger("onReset").remove(),
                  s &&
                    c.$refs.container
                      .removeClass("fancybox-is-open")
                      .addClass("fancybox-is-closing")
                      .css("transition-duration", s + "ms"),
                  c.hideLoading(h),
                  c.hideControls(!0),
                  c.updateCursor(),
                  "zoom" !== n ||
                    (o &&
                      s &&
                      "image" === h.type &&
                      !c.isMoved() &&
                      !h.hasError &&
                      (d = c.getThumbPos(h))) ||
                    (n = "fade"),
                  "zoom" === n
                    ? (m.fancybox.stop(o),
                      (l = {
                        top: (a = m.fancybox.getTranslate(o)).top,
                        left: a.left,
                        scaleX: a.width / d.width,
                        scaleY: a.height / d.height,
                        width: d.width,
                        height: d.height,
                      }),
                      "auto" == (r = h.opts.zoomOpacity) &&
                        (r =
                          0.1 <
                          Math.abs(h.width / h.height - d.width / d.height)),
                      r && (d.opacity = 0),
                      m.fancybox.setTranslate(o, l),
                      u(o),
                      m.fancybox.animate(o, d, s, i))
                    : n && s
                    ? m.fancybox.animate(
                        h.$slide
                          .addClass("fancybox-slide--previous")
                          .removeClass("fancybox-slide--current"),
                        "fancybox-animated fancybox-fx-" + n,
                        s,
                        i
                      )
                    : !0 === e
                    ? setTimeout(i, s)
                    : i(),
                  !0))
            );
          },
          cleanUp: function (e) {
            var t,
              i,
              n,
              s = this,
              o = s.current.opts.$orig;
            s.current.$slide.trigger("onReset"),
              s.$refs.container.empty().remove(),
              s.trigger("afterClose", e),
              s.current.opts.backFocus &&
                ((o && o.length && o.is(":visible")) || (o = s.$trigger),
                o &&
                  o.length &&
                  ((i = l.scrollX),
                  (n = l.scrollY),
                  o.trigger("focus"),
                  m("html, body").scrollTop(n).scrollLeft(i))),
              (s.current = null),
              (t = m.fancybox.getInstance())
                ? t.activate()
                : (m("body").removeClass(
                    "fancybox-active compensate-for-scrollbar"
                  ),
                  m("#fancybox-style-noscroll").remove());
          },
          trigger: function (e, t) {
            var i,
              n = Array.prototype.slice.call(arguments, 1),
              s = this,
              o = t && t.opts ? t : s.current;
            if (
              (o ? n.unshift(o) : (o = s),
              n.unshift(s),
              m.isFunction(o.opts[e]) && (i = o.opts[e].apply(o, n)),
              !1 === i)
            )
              return i;
            "afterClose" !== e && s.$refs
              ? s.$refs.container.trigger(e + ".fb", n)
              : a.trigger(e + ".fb", n);
          },
          updateControls: function () {
            var e = this,
              t = e.current,
              i = t.index,
              n = e.$refs.container,
              s = e.$refs.caption,
              o = t.opts.caption;
            t.$slide.trigger("refresh"),
              o && o.length
                ? (e.$caption = s).children().eq(0).html(o)
                : (e.$caption = null),
              e.hasHiddenControls || e.isIdle || e.showControls(),
              n.find("[data-fancybox-count]").html(e.group.length),
              n.find("[data-fancybox-index]").html(i + 1),
              n
                .find("[data-fancybox-prev]")
                .prop("disabled", !t.opts.loop && i <= 0),
              n
                .find("[data-fancybox-next]")
                .prop("disabled", !t.opts.loop && i >= e.group.length - 1),
              "image" === t.type
                ? n
                    .find("[data-fancybox-zoom]")
                    .show()
                    .end()
                    .find("[data-fancybox-download]")
                    .attr("href", t.opts.image.src || t.src)
                    .show()
                : t.opts.toolbar &&
                  n
                    .find("[data-fancybox-download],[data-fancybox-zoom]")
                    .hide(),
              m(d.activeElement).is(":hidden,[disabled]") &&
                e.$refs.container.trigger("focus");
          },
          hideControls: function (e) {
            var t = ["infobar", "toolbar", "nav"];
            (!e && this.current.opts.preventCaptionOverlap) ||
              t.push("caption"),
              this.$refs.container.removeClass(
                t
                  .map(function (e) {
                    return "fancybox-show-" + e;
                  })
                  .join(" ")
              ),
              (this.hasHiddenControls = !0);
          },
          showControls: function () {
            var e = this,
              t = e.current ? e.current.opts : e.opts,
              i = e.$refs.container;
            (e.hasHiddenControls = !1),
              (e.idleSecondsCounter = 0),
              i
                .toggleClass(
                  "fancybox-show-toolbar",
                  !(!t.toolbar || !t.buttons)
                )
                .toggleClass(
                  "fancybox-show-infobar",
                  !!(t.infobar && 1 < e.group.length)
                )
                .toggleClass("fancybox-show-caption", !!e.$caption)
                .toggleClass(
                  "fancybox-show-nav",
                  !!(t.arrows && 1 < e.group.length)
                )
                .toggleClass("fancybox-is-modal", !!t.modal);
          },
          toggleControls: function () {
            this.hasHiddenControls ? this.showControls() : this.hideControls();
          },
        }),
          (m.fancybox = {
            version: "3.5.7",
            defaults: s,
            getInstance: function (e) {
              var t = m(
                  '.fancybox-container:not(".fancybox-is-closing"):last'
                ).data("FancyBox"),
                i = Array.prototype.slice.call(arguments, 1);
              return (
                t instanceof v &&
                ("string" === m.type(e)
                  ? t[e].apply(t, i)
                  : "function" === m.type(e) && e.apply(t, i),
                t)
              );
            },
            open: function (e, t, i) {
              return new v(e, t, i);
            },
            close: function (e) {
              var t = this.getInstance();
              t && (t.close(), !0 === e && this.close(e));
            },
            destroy: function () {
              this.close(!0), a.add("body").off("click.fb-start", "**");
            },
            isMobile:
              /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                navigator.userAgent
              ),
            use3d:
              ((e = d.createElement("div")),
              l.getComputedStyle &&
                l.getComputedStyle(e) &&
                l.getComputedStyle(e).getPropertyValue("transform") &&
                !(d.documentMode && d.documentMode < 11)),
            getTranslate: function (e) {
              var t;
              return (
                !(!e || !e.length) && {
                  top: (t = e[0].getBoundingClientRect()).top || 0,
                  left: t.left || 0,
                  width: t.width,
                  height: t.height,
                  opacity: parseFloat(e.css("opacity")),
                }
              );
            },
            setTranslate: function (e, t) {
              var i = "",
                n = {};
              if (e && t)
                return (
                  (t.left === g && t.top === g) ||
                    ((i =
                      (t.left === g ? e.position().left : t.left) +
                      "px, " +
                      (t.top === g ? e.position().top : t.top) +
                      "px"),
                    (i = this.use3d
                      ? "translate3d(" + i + ", 0px)"
                      : "translate(" + i + ")")),
                  t.scaleX !== g && t.scaleY !== g
                    ? (i += " scale(" + t.scaleX + ", " + t.scaleY + ")")
                    : t.scaleX !== g && (i += " scaleX(" + t.scaleX + ")"),
                  i.length && (n.transform = i),
                  t.opacity !== g && (n.opacity = t.opacity),
                  t.width !== g && (n.width = t.width),
                  t.height !== g && (n.height = t.height),
                  e.css(n)
                );
            },
            animate: function (t, i, n, s, o) {
              var a,
                r = this;
              m.isFunction(n) && ((s = n), (n = null)),
                r.stop(t),
                (a = r.getTranslate(t)),
                t.on(h, function (e) {
                  (e &&
                    e.originalEvent &&
                    (!t.is(e.originalEvent.target) ||
                      "z-index" == e.originalEvent.propertyName)) ||
                    (r.stop(t),
                    m.isNumeric(n) && t.css("transition-duration", ""),
                    m.isPlainObject(i)
                      ? i.scaleX !== g &&
                        i.scaleY !== g &&
                        r.setTranslate(t, {
                          top: i.top,
                          left: i.left,
                          width: a.width * i.scaleX,
                          height: a.height * i.scaleY,
                          scaleX: 1,
                          scaleY: 1,
                        })
                      : !0 !== o && t.removeClass(i),
                    m.isFunction(s) && s(e));
                }),
                m.isNumeric(n) && t.css("transition-duration", n + "ms"),
                m.isPlainObject(i)
                  ? (i.scaleX !== g &&
                      i.scaleY !== g &&
                      (delete i.width,
                      delete i.height,
                      t.parent().hasClass("fancybox-slide--image") &&
                        t.parent().addClass("fancybox-is-scaling")),
                    m.fancybox.setTranslate(t, i))
                  : t.addClass(i),
                t.data(
                  "timer",
                  setTimeout(function () {
                    t.trigger(h);
                  }, n + 33)
                );
            },
            stop: function (e, t) {
              e &&
                e.length &&
                (clearTimeout(e.data("timer")),
                t && e.trigger(h),
                e.off(h).css("transition-duration", ""),
                e.parent().removeClass("fancybox-is-scaling"));
            },
          }),
          (m.fn.fancybox = function (e) {
            var t;
            return (
              (t = (e = e || {}).selector || !1)
                ? m("body")
                    .off("click.fb-start", t)
                    .on("click.fb-start", t, { options: e }, w)
                : this.off("click.fb-start").on(
                    "click.fb-start",
                    { items: this, options: e },
                    w
                  ),
              this
            );
          }),
          a.on("click.fb-start", "[data-fancybox]", w),
          a.on("click.fb-start", "[data-fancybox-trigger]", function (e) {
            m('[data-fancybox="' + m(this).attr("data-fancybox-trigger") + '"]')
              .eq(m(this).attr("data-fancybox-index") || 0)
              .trigger("click.fb-start", { $trigger: m(this) });
          }),
          (t = ".fancybox-button"),
          (i = "fancybox-focus"),
          (n = null),
          a.on("mousedown mouseup focus blur", t, function (e) {
            switch (e.type) {
              case "mousedown":
                n = m(this);
                break;
              case "mouseup":
                n = null;
                break;
              case "focusin":
                m(t).removeClass(i),
                  m(this).is(n) ||
                    m(this).is("[disabled]") ||
                    m(this).addClass(i);
                break;
              case "focusout":
                m(t).removeClass(i);
            }
          });
      }
    function w(e, t) {
      var i,
        n,
        s,
        o = [],
        a = 0;
      (e && e.isDefaultPrevented()) ||
        (e.preventDefault(),
        (t = t || {}),
        e && e.data && (t = f(e.data.options, t)),
        (i = t.$target || m(e.currentTarget).trigger("blur")),
        ((s = m.fancybox.getInstance()) && s.$trigger && s.$trigger.is(i)) ||
          ((o = t.selector
            ? m(t.selector)
            : (n = i.attr("data-fancybox") || "")
            ? (o = e.data ? e.data.items : []).length
              ? o.filter('[data-fancybox="' + n + '"]')
              : m('[data-fancybox="' + n + '"]')
            : [i]),
          (a = m(o).index(i)) < 0 && (a = 0),
          ((s = m.fancybox.open(o, t, a)).$trigger = i)));
    }
  })(window, document, jQuery),
  (function (u) {
    "use strict";
    function f(i, e, t) {
      if (i)
        return (
          (t = t || ""),
          "object" === u.type(t) && (t = u.param(t, !0)),
          u.each(e, function (e, t) {
            i = i.replace("$" + e, t || "");
          }),
          t.length && (i += (0 < i.indexOf("?") ? "&" : "?") + t),
          i
        );
    }
    var n = {
      youtube: {
        matcher:
          /(youtube\.com|youtu\.be|youtube\-nocookie\.com)\/(watch\?(.*&)?v=|v\/|u\/|embed\/?)?(videoseries\?list=(.*)|[\w-]{11}|\?listType=(.*)&list=(.*))(.*)/i,
        params: {
          autoplay: 1,
          autohide: 1,
          fs: 1,
          rel: 0,
          hd: 1,
          wmode: "transparent",
          enablejsapi: 1,
          html5: 1,
        },
        paramPlace: 8,
        type: "iframe",
        url: "https://www.youtube-nocookie.com/embed/$4",
        thumb: "https://img.youtube.com/vi/$4/hqdefault.jpg",
      },
      vimeo: {
        matcher: /^.+vimeo.com\/(.*\/)?([\d]+)(.*)?/,
        params: {
          autoplay: 1,
          hd: 1,
          show_title: 1,
          show_byline: 1,
          show_portrait: 0,
          fullscreen: 1,
        },
        paramPlace: 3,
        type: "iframe",
        url: "//player.vimeo.com/video/$2",
      },
      instagram: {
        matcher: /(instagr\.am|instagram\.com)\/p\/([a-zA-Z0-9_\-]+)\/?/i,
        type: "image",
        url: "//$1/p/$2/media/?size=l",
      },
      gmap_place: {
        matcher:
          /(maps\.)?google\.([a-z]{2,3}(\.[a-z]{2})?)\/(((maps\/(place\/(.*)\/)?\@(.*),(\d+.?\d+?)z))|(\?ll=))(.*)?/i,
        type: "iframe",
        url: function (e) {
          return (
            "//maps.google." +
            e[2] +
            "/?ll=" +
            (e[9]
              ? e[9] +
                "&z=" +
                Math.floor(e[10]) +
                (e[12] ? e[12].replace(/^\//, "&") : "")
              : e[12] + ""
            ).replace(/\?/, "&") +
            "&output=" +
            (e[12] && 0 < e[12].indexOf("layer=c") ? "svembed" : "embed")
          );
        },
      },
      gmap_search: {
        matcher:
          /(maps\.)?google\.([a-z]{2,3}(\.[a-z]{2})?)\/(maps\/search\/)(.*)/i,
        type: "iframe",
        url: function (e) {
          return (
            "//maps.google." +
            e[2] +
            "/maps?q=" +
            e[5].replace("query=", "q=").replace("api=1", "") +
            "&output=embed"
          );
        },
      },
    };
    u(document).on("objectNeedsType.fb", function (e, t, s) {
      var i,
        o,
        a,
        r,
        l,
        d,
        c,
        h = s.src || "",
        p = !1;
      (i = u.extend(!0, {}, n, s.opts.media)),
        u.each(i, function (e, t) {
          if ((a = h.match(t.matcher))) {
            if (
              ((p = t.type), (c = e), (d = {}), t.paramPlace && a[t.paramPlace])
            ) {
              "?" == (l = a[t.paramPlace])[0] && (l = l.substring(1)),
                (l = l.split("&"));
              for (var i = 0; i < l.length; ++i) {
                var n = l[i].split("=", 2);
                2 == n.length &&
                  (d[n[0]] = decodeURIComponent(n[1].replace(/\+/g, " ")));
              }
            }
            return (
              (r = u.extend(!0, {}, t.params, s.opts[e], d)),
              (h =
                "function" === u.type(t.url)
                  ? t.url.call(this, a, r, s)
                  : f(t.url, a, r)),
              (o =
                "function" === u.type(t.thumb)
                  ? t.thumb.call(this, a, r, s)
                  : f(t.thumb, a)),
              "youtube" === e
                ? (h = h.replace(/&t=((\d+)m)?(\d+)s/, function (e, t, i, n) {
                    return (
                      "&start=" +
                      ((i ? 60 * parseInt(i, 10) : 0) + parseInt(n, 10))
                    );
                  }))
                : "vimeo" === e && (h = h.replace("&%23", "#")),
              !1
            );
          }
        }),
        p
          ? (s.opts.thumb ||
              (s.opts.$thumb && s.opts.$thumb.length) ||
              (s.opts.thumb = o),
            "iframe" === p &&
              (s.opts = u.extend(!0, s.opts, {
                iframe: { preload: !1, attr: { scrolling: "no" } },
              })),
            u.extend(s, {
              type: p,
              src: h,
              origSrc: s.src,
              contentSource: c,
              contentType:
                "image" === p
                  ? "image"
                  : "gmap_place" == c || "gmap_search" == c
                  ? "map"
                  : "video",
            }))
          : h && (s.type = s.opts.defaultType);
    });
    var s = {
      youtube: {
        src: "https://www.youtube.com/@iframe_api",
        class: "YT",
        loading: !1,
        loaded: !1,
      },
      vimeo: {
        src: "https://player.vimeo.com/api/player.js",
        class: "Vimeo",
        loading: !1,
        loaded: !1,
      },
      load: function (e) {
        var t,
          i = this;
        this[e].loaded
          ? setTimeout(function () {
              i.done(e);
            })
          : this[e].loading ||
            ((this[e].loading = !0),
            ((t = document.createElement("script")).type = "text/javascript"),
            (t.src = this[e].src),
            "youtube" === e
              ? (window.onYouTubeIframeAPIReady = function () {
                  (i[e].loaded = !0), i.done(e);
                })
              : (t.onload = function () {
                  (i[e].loaded = !0), i.done(e);
                }),
            document.body.appendChild(t));
      },
      done: function (e) {
        var t, i;
        "youtube" === e && delete window.onYouTubeIframeAPIReady,
          (t = u.fancybox.getInstance()) &&
            ((i = t.current.$content.find("iframe")),
            "youtube" === e && void 0 !== YT && YT
              ? new YT.Player(i.attr("id"), {
                  events: {
                    onStateChange: function (e) {
                      0 == e.data && t.next();
                    },
                  },
                })
              : "vimeo" === e &&
                void 0 !== Vimeo &&
                Vimeo &&
                new Vimeo.Player(i).on("ended", function () {
                  t.next();
                }));
      },
    };
    u(document).on({
      "afterShow.fb": function (e, t, i) {
        1 < t.group.length &&
          ("youtube" === i.contentSource || "vimeo" === i.contentSource) &&
          s.load(i.contentSource);
      },
    });
  })(jQuery),
  (function (m, l, g) {
    "use strict";
    function c(e) {
      var t = [];
      for (var i in (e =
        (e = e.originalEvent || e || m.e).touches && e.touches.length
          ? e.touches
          : e.changedTouches && e.changedTouches.length
          ? e.changedTouches
          : [e]))
        e[i].pageX
          ? t.push({ x: e[i].pageX, y: e[i].pageY })
          : e[i].clientX && t.push({ x: e[i].clientX, y: e[i].clientY });
      return t;
    }
    function v(e, t, i) {
      return t && e
        ? "x" === i
          ? e.x - t.x
          : "y" === i
          ? e.y - t.y
          : Math.sqrt(Math.pow(e.x - t.x, 2) + Math.pow(e.y - t.y, 2))
        : 0;
    }
    function d(e) {
      if (
        e.is(
          'a,area,button,[role="button"],input,label,select,summary,textarea,video,audio,iframe'
        ) ||
        g.isFunction(e.get(0).onclick) ||
        e.data("selectable")
      )
        return !0;
      for (var t = 0, i = e[0].attributes, n = i.length; t < n; t++)
        if ("data-fancybox-" === i[t].nodeName.substr(0, 14)) return !0;
      return !1;
    }
    function h(e) {
      for (
        var t, i, n, s, o, a = !1;
        (t = e.get(0)),
          void 0,
          (i = m.getComputedStyle(t)["overflow-y"]),
          (n = m.getComputedStyle(t)["overflow-x"]),
          (s =
            ("scroll" === i || "auto" === i) &&
            t.scrollHeight > t.clientHeight),
          (o =
            ("scroll" === n || "auto" === n) && t.scrollWidth > t.clientWidth),
          !(a = s || o) &&
            (e = e.parent()).length &&
            !e.hasClass("fancybox-stage") &&
            !e.is("body");

      );
      return a;
    }
    function i(e) {
      var t = this;
      (t.instance = e),
        (t.$bg = e.$refs.bg),
        (t.$stage = e.$refs.stage),
        (t.$container = e.$refs.container),
        t.destroy(),
        t.$container.on(
          "touchstart.fb.touch mousedown.fb.touch",
          g.proxy(t, "ontouchstart")
        );
    }
    var w =
        m.requestAnimationFrame ||
        m.webkitRequestAnimationFrame ||
        m.mozRequestAnimationFrame ||
        m.oRequestAnimationFrame ||
        function (e) {
          return m.setTimeout(e, 1e3 / 60);
        },
      b =
        m.cancelAnimationFrame ||
        m.webkitCancelAnimationFrame ||
        m.mozCancelAnimationFrame ||
        m.oCancelAnimationFrame ||
        function (e) {
          m.clearTimeout(e);
        };
    (i.prototype.destroy = function () {
      var e = this;
      e.$container.off(".fb.touch"),
        g(l).off(".fb.touch"),
        e.requestId && (b(e.requestId), (e.requestId = null)),
        e.tapped && (clearTimeout(e.tapped), (e.tapped = null));
    }),
      (i.prototype.ontouchstart = function (e) {
        var t = this,
          i = g(e.target),
          n = t.instance,
          s = n.current,
          o = s.$slide,
          a = s.$content,
          r = "touchstart" == e.type;
        if (
          (r && t.$container.off("mousedown.fb.touch"),
          (!e.originalEvent || 2 != e.originalEvent.button) &&
            o.length &&
            i.length &&
            !d(i) &&
            !d(i.parent()) &&
            (i.is("img") ||
              !(e.originalEvent.clientX > i[0].clientWidth + i.offset().left)))
        ) {
          if (!s || n.isAnimating || s.$slide.hasClass("fancybox-animated"))
            return e.stopPropagation(), void e.preventDefault();
          (t.realPoints = t.startPoints = c(e)),
            t.startPoints.length &&
              (s.touch && e.stopPropagation(),
              (t.startEvent = e),
              (t.canTap = !0),
              (t.$target = i),
              (t.$content = a),
              (t.opts = s.opts.touch),
              (t.isPanning = !1),
              (t.isSwiping = !1),
              (t.isZooming = !1),
              (t.isScrolling = !1),
              (t.canPan = n.canPan()),
              (t.startTime = new Date().getTime()),
              (t.distanceX = t.distanceY = t.distance = 0),
              (t.canvasWidth = Math.round(o[0].clientWidth)),
              (t.canvasHeight = Math.round(o[0].clientHeight)),
              (t.contentLastPos = null),
              (t.contentStartPos = g.fancybox.getTranslate(t.$content) || {
                top: 0,
                left: 0,
              }),
              (t.sliderStartPos = g.fancybox.getTranslate(o)),
              (t.stagePos = g.fancybox.getTranslate(n.$refs.stage)),
              (t.sliderStartPos.top -= t.stagePos.top),
              (t.sliderStartPos.left -= t.stagePos.left),
              (t.contentStartPos.top -= t.stagePos.top),
              (t.contentStartPos.left -= t.stagePos.left),
              g(l)
                .off(".fb.touch")
                .on(
                  r
                    ? "touchend.fb.touch touchcancel.fb.touch"
                    : "mouseup.fb.touch mouseleave.fb.touch",
                  g.proxy(t, "ontouchend")
                )
                .on(
                  r ? "touchmove.fb.touch" : "mousemove.fb.touch",
                  g.proxy(t, "ontouchmove")
                ),
              g.fancybox.isMobile &&
                l.addEventListener("scroll", t.onscroll, !0),
              (((t.opts || t.canPan) &&
                (i.is(t.$stage) || t.$stage.find(i).length)) ||
                (i.is(".fancybox-image") && e.preventDefault(),
                g.fancybox.isMobile &&
                  i.parents(".fancybox-caption").length)) &&
                ((t.isScrollable = h(i) || h(i.parent())),
                (g.fancybox.isMobile && t.isScrollable) || e.preventDefault(),
                (1 !== t.startPoints.length && !s.hasError) ||
                  (t.canPan
                    ? (g.fancybox.stop(t.$content), (t.isPanning = !0))
                    : (t.isSwiping = !0),
                  t.$container.addClass("fancybox-is-grabbing")),
                2 === t.startPoints.length &&
                  "image" === s.type &&
                  (s.isLoaded || s.$ghost) &&
                  ((t.canTap = !1),
                  (t.isSwiping = !1),
                  (t.isPanning = !1),
                  (t.isZooming = !0),
                  g.fancybox.stop(t.$content),
                  (t.centerPointStartX =
                    0.5 * (t.startPoints[0].x + t.startPoints[1].x) -
                    g(m).scrollLeft()),
                  (t.centerPointStartY =
                    0.5 * (t.startPoints[0].y + t.startPoints[1].y) -
                    g(m).scrollTop()),
                  (t.percentageOfImageAtPinchPointX =
                    (t.centerPointStartX - t.contentStartPos.left) /
                    t.contentStartPos.width),
                  (t.percentageOfImageAtPinchPointY =
                    (t.centerPointStartY - t.contentStartPos.top) /
                    t.contentStartPos.height),
                  (t.startDistanceBetweenFingers = v(
                    t.startPoints[0],
                    t.startPoints[1]
                  )))));
        }
      }),
      (i.prototype.onscroll = function (e) {
        (this.isScrolling = !0),
          l.removeEventListener("scroll", this.onscroll, !0);
      }),
      (i.prototype.ontouchmove = function (e) {
        var t = this;
        void 0 === e.originalEvent.buttons || 0 !== e.originalEvent.buttons
          ? t.isScrolling
            ? (t.canTap = !1)
            : ((t.newPoints = c(e)),
              (t.opts || t.canPan) &&
                t.newPoints.length &&
                t.newPoints.length &&
                ((t.isSwiping && !0 === t.isSwiping) || e.preventDefault(),
                (t.distanceX = v(t.newPoints[0], t.startPoints[0], "x")),
                (t.distanceY = v(t.newPoints[0], t.startPoints[0], "y")),
                (t.distance = v(t.newPoints[0], t.startPoints[0])),
                0 < t.distance &&
                  (t.isSwiping
                    ? t.onSwipe(e)
                    : t.isPanning
                    ? t.onPan()
                    : t.isZooming && t.onZoom())))
          : t.ontouchend(e);
      }),
      (i.prototype.onSwipe = function (e) {
        var t,
          s = this,
          o = s.instance,
          i = s.isSwiping,
          n = s.sliderStartPos.left || 0;
        if (!0 !== i)
          "x" == i &&
            (0 < s.distanceX &&
            (s.instance.group.length < 2 ||
              (0 === s.instance.current.index && !s.instance.current.opts.loop))
              ? (n += Math.pow(s.distanceX, 0.8))
              : s.distanceX < 0 &&
                (s.instance.group.length < 2 ||
                  (s.instance.current.index === s.instance.group.length - 1 &&
                    !s.instance.current.opts.loop))
              ? (n -= Math.pow(-s.distanceX, 0.8))
              : (n += s.distanceX)),
            (s.sliderLastPos = {
              top: "x" == i ? 0 : s.sliderStartPos.top + s.distanceY,
              left: n,
            }),
            s.requestId && (b(s.requestId), (s.requestId = null)),
            (s.requestId = w(function () {
              s.sliderLastPos &&
                (g.each(s.instance.slides, function (e, t) {
                  var i = t.pos - s.instance.currPos;
                  g.fancybox.setTranslate(t.$slide, {
                    top: s.sliderLastPos.top,
                    left:
                      s.sliderLastPos.left +
                      i * s.canvasWidth +
                      i * t.opts.gutter,
                  });
                }),
                s.$container.addClass("fancybox-is-sliding"));
            }));
        else if (10 < Math.abs(s.distance)) {
          if (
            ((s.canTap = !1),
            o.group.length < 2 && s.opts.vertical
              ? (s.isSwiping = "y")
              : o.isDragging ||
                !1 === s.opts.vertical ||
                ("auto" === s.opts.vertical && 800 < g(m).width())
              ? (s.isSwiping = "x")
              : ((t = Math.abs(
                  (180 * Math.atan2(s.distanceY, s.distanceX)) / Math.PI
                )),
                (s.isSwiping = 45 < t && t < 135 ? "y" : "x")),
            "y" === s.isSwiping && g.fancybox.isMobile && s.isScrollable)
          )
            return void (s.isScrolling = !0);
          (o.isDragging = s.isSwiping),
            (s.startPoints = s.newPoints),
            g.each(o.slides, function (e, t) {
              var i, n;
              g.fancybox.stop(t.$slide),
                (i = g.fancybox.getTranslate(t.$slide)),
                (n = g.fancybox.getTranslate(o.$refs.stage)),
                t.$slide
                  .css({
                    transform: "",
                    opacity: "",
                    "transition-duration": "",
                  })
                  .removeClass("fancybox-animated")
                  .removeClass(function (e, t) {
                    return (t.match(/(^|\s)fancybox-fx-\S+/g) || []).join(" ");
                  }),
                t.pos === o.current.pos &&
                  ((s.sliderStartPos.top = i.top - n.top),
                  (s.sliderStartPos.left = i.left - n.left)),
                g.fancybox.setTranslate(t.$slide, {
                  top: i.top - n.top,
                  left: i.left - n.left,
                });
            }),
            o.SlideShow && o.SlideShow.isActive && o.SlideShow.stop();
        }
      }),
      (i.prototype.onPan = function () {
        var e = this;
        v(e.newPoints[0], e.realPoints[0]) < (g.fancybox.isMobile ? 10 : 5)
          ? (e.startPoints = e.newPoints)
          : ((e.canTap = !1),
            (e.contentLastPos = e.limitMovement()),
            e.requestId && b(e.requestId),
            (e.requestId = w(function () {
              g.fancybox.setTranslate(e.$content, e.contentLastPos);
            })));
      }),
      (i.prototype.limitMovement = function () {
        var e,
          t,
          i,
          n,
          s,
          o,
          a = this,
          r = a.canvasWidth,
          l = a.canvasHeight,
          d = a.distanceX,
          c = a.distanceY,
          h = a.contentStartPos,
          p = h.left,
          u = h.top,
          f = h.width,
          m = h.height;
        return (
          (s = r < f ? p + d : p),
          (o = u + c),
          (e = Math.max(0, 0.5 * r - 0.5 * f)),
          (t = Math.max(0, 0.5 * l - 0.5 * m)),
          (i = Math.min(r - f, 0.5 * r - 0.5 * f)),
          (n = Math.min(l - m, 0.5 * l - 0.5 * m)),
          0 < d && e < s && (s = e - 1 + Math.pow(-e + p + d, 0.8) || 0),
          d < 0 && s < i && (s = i + 1 - Math.pow(i - p - d, 0.8) || 0),
          0 < c && t < o && (o = t - 1 + Math.pow(-t + u + c, 0.8) || 0),
          c < 0 && o < n && (o = n + 1 - Math.pow(n - u - c, 0.8) || 0),
          { top: o, left: s }
        );
      }),
      (i.prototype.limitPosition = function (e, t, i, n) {
        var s = this.canvasWidth,
          o = this.canvasHeight;
        return (
          (e =
            s < i
              ? (e = 0 < e ? 0 : e) < s - i
                ? s - i
                : e
              : Math.max(0, s / 2 - i / 2)),
          {
            top: (t =
              o < n
                ? (t = 0 < t ? 0 : t) < o - n
                  ? o - n
                  : t
                : Math.max(0, o / 2 - n / 2)),
            left: e,
          }
        );
      }),
      (i.prototype.onZoom = function () {
        var e = this,
          t = e.contentStartPos,
          i = t.width,
          n = t.height,
          s = t.left,
          o = t.top,
          a = v(e.newPoints[0], e.newPoints[1]) / e.startDistanceBetweenFingers,
          r = Math.floor(i * a),
          l = Math.floor(n * a),
          d = (i - r) * e.percentageOfImageAtPinchPointX,
          c = (n - l) * e.percentageOfImageAtPinchPointY,
          h = (e.newPoints[0].x + e.newPoints[1].x) / 2 - g(m).scrollLeft(),
          p = (e.newPoints[0].y + e.newPoints[1].y) / 2 - g(m).scrollTop(),
          u = h - e.centerPointStartX,
          f = {
            top: o + (c + (p - e.centerPointStartY)),
            left: s + (d + u),
            scaleX: a,
            scaleY: a,
          };
        (e.canTap = !1),
          (e.newWidth = r),
          (e.newHeight = l),
          (e.contentLastPos = f),
          e.requestId && b(e.requestId),
          (e.requestId = w(function () {
            g.fancybox.setTranslate(e.$content, e.contentLastPos);
          }));
      }),
      (i.prototype.ontouchend = function (e) {
        var t = this,
          i = t.isSwiping,
          n = t.isPanning,
          s = t.isZooming,
          o = t.isScrolling;
        if (
          ((t.endPoints = c(e)),
          (t.dMs = Math.max(new Date().getTime() - t.startTime, 1)),
          t.$container.removeClass("fancybox-is-grabbing"),
          g(l).off(".fb.touch"),
          l.removeEventListener("scroll", t.onscroll, !0),
          t.requestId && (b(t.requestId), (t.requestId = null)),
          (t.isSwiping = !1),
          (t.isPanning = !1),
          (t.isZooming = !1),
          (t.isScrolling = !1),
          (t.instance.isDragging = !1),
          t.canTap)
        )
          return t.onTap(e);
        (t.speed = 100),
          (t.velocityX = (t.distanceX / t.dMs) * 0.5),
          (t.velocityY = (t.distanceY / t.dMs) * 0.5),
          n ? t.endPanning() : s ? t.endZooming() : t.endSwiping(i, o);
      }),
      (i.prototype.endSwiping = function (e, t) {
        var i = this,
          n = !1,
          s = i.instance.group.length,
          o = Math.abs(i.distanceX),
          a = "x" == e && 1 < s && ((130 < i.dMs && 10 < o) || 50 < o);
        (i.sliderLastPos = null),
          "y" == e && !t && 50 < Math.abs(i.distanceY)
            ? (g.fancybox.animate(
                i.instance.current.$slide,
                {
                  top: i.sliderStartPos.top + i.distanceY + 150 * i.velocityY,
                  opacity: 0,
                },
                200
              ),
              (n = i.instance.close(!0, 250)))
            : a && 0 < i.distanceX
            ? (n = i.instance.previous(300))
            : a && i.distanceX < 0 && (n = i.instance.next(300)),
          !1 !== n || ("x" != e && "y" != e) || i.instance.centerSlide(200),
          i.$container.removeClass("fancybox-is-sliding");
      }),
      (i.prototype.endPanning = function () {
        var e,
          t,
          i,
          n = this;
        n.contentLastPos &&
          ((t =
            !1 === n.opts.momentum || 350 < n.dMs
              ? ((e = n.contentLastPos.left), n.contentLastPos.top)
              : ((e = n.contentLastPos.left + 500 * n.velocityX),
                n.contentLastPos.top + 500 * n.velocityY)),
          ((i = n.limitPosition(
            e,
            t,
            n.contentStartPos.width,
            n.contentStartPos.height
          )).width = n.contentStartPos.width),
          (i.height = n.contentStartPos.height),
          g.fancybox.animate(n.$content, i, 366));
      }),
      (i.prototype.endZooming = function () {
        var e,
          t,
          i,
          n,
          s = this,
          o = s.instance.current,
          a = s.newWidth,
          r = s.newHeight;
        s.contentLastPos &&
          ((e = s.contentLastPos.left),
          (n = {
            top: (t = s.contentLastPos.top),
            left: e,
            width: a,
            height: r,
            scaleX: 1,
            scaleY: 1,
          }),
          g.fancybox.setTranslate(s.$content, n),
          a < s.canvasWidth && r < s.canvasHeight
            ? s.instance.scaleToFit(150)
            : a > o.width || r > o.height
            ? s.instance.scaleToActual(
                s.centerPointStartX,
                s.centerPointStartY,
                150
              )
            : ((i = s.limitPosition(e, t, a, r)),
              g.fancybox.animate(s.$content, i, 150)));
      }),
      (i.prototype.onTap = function (i) {
        function e(e) {
          var t = a.opts[e];
          if ((g.isFunction(t) && (t = t.apply(o, [a, i])), t))
            switch (t) {
              case "close":
                o.close(n.startEvent);
                break;
              case "toggleControls":
                o.toggleControls();
                break;
              case "next":
                o.next();
                break;
              case "nextOrClose":
                1 < o.group.length ? o.next() : o.close(n.startEvent);
                break;
              case "zoom":
                "image" == a.type &&
                  (a.isLoaded || a.$ghost) &&
                  (o.canPan()
                    ? o.scaleToFit()
                    : o.isScaledDown()
                    ? o.scaleToActual(l, d)
                    : o.group.length < 2 && o.close(n.startEvent));
            }
        }
        var t,
          n = this,
          s = g(i.target),
          o = n.instance,
          a = o.current,
          r = (i && c(i)) || n.startPoints,
          l = r[0] ? r[0].x - g(m).scrollLeft() - n.stagePos.left : 0,
          d = r[0] ? r[0].y - g(m).scrollTop() - n.stagePos.top : 0;
        if (
          (!i.originalEvent || 2 != i.originalEvent.button) &&
          (s.is("img") || !(l > s[0].clientWidth + s.offset().left))
        ) {
          if (
            s.is(
              ".fancybox-bg,.fancybox-inner,.fancybox-outer,.fancybox-container"
            )
          )
            t = "Outside";
          else if (s.is(".fancybox-slide")) t = "Slide";
          else {
            if (
              !o.current.$content ||
              !o.current.$content.find(s).addBack().filter(s).length
            )
              return;
            t = "Content";
          }
          if (n.tapped) {
            if (
              (clearTimeout(n.tapped),
              (n.tapped = null),
              50 < Math.abs(l - n.tapX) || 50 < Math.abs(d - n.tapY))
            )
              return this;
            e("dblclick" + t);
          } else
            (n.tapX = l),
              (n.tapY = d),
              a.opts["dblclick" + t] &&
              a.opts["dblclick" + t] !== a.opts["click" + t]
                ? (n.tapped = setTimeout(function () {
                    (n.tapped = null), o.isAnimating || e("click" + t);
                  }, 500))
                : e("click" + t);
          return this;
        }
      }),
      g(l)
        .on("onActivate.fb", function (e, t) {
          t && !t.Guestures && (t.Guestures = new i(t));
        })
        .on("beforeClose.fb", function (e, t) {
          t && t.Guestures && t.Guestures.destroy();
        });
  })(window, document, jQuery),
  (function (a, r) {
    "use strict";
    r.extend(!0, r.fancybox.defaults, {
      btnTpl: {
        slideShow:
          '<button data-fancybox-play class="fancybox-button fancybox-button--play" title="{{PLAY_START}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M6.5 5.4v13.2l11-6.6z"/></svg><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M8.33 5.75h2.2v12.5h-2.2V5.75zm5.15 0h2.2v12.5h-2.2V5.75z"/></svg></button>',
      },
      slideShow: { autoStart: !1, speed: 3e3, progress: !0 },
    });
    function i(e) {
      (this.instance = e), this.init();
    }
    r.extend(i.prototype, {
      timer: null,
      isActive: !1,
      $button: null,
      init: function () {
        var e = this,
          t = e.instance,
          i = t.group[t.currIndex].opts.slideShow;
        (e.$button = t.$refs.toolbar
          .find("[data-fancybox-play]")
          .on("click", function () {
            e.toggle();
          })),
          t.group.length < 2 || !i
            ? e.$button.hide()
            : i.progress &&
              (e.$progress = r(
                '<div class="fancybox-progress"></div>'
              ).appendTo(t.$refs.inner));
      },
      set: function (e) {
        var t = this,
          i = t.instance,
          n = i.current;
        n && (!0 === e || n.opts.loop || i.currIndex < i.group.length - 1)
          ? t.isActive &&
            "video" !== n.contentType &&
            (t.$progress &&
              r.fancybox.animate(
                t.$progress.show(),
                { scaleX: 1 },
                n.opts.slideShow.speed
              ),
            (t.timer = setTimeout(function () {
              i.current.opts.loop || i.current.index != i.group.length - 1
                ? i.next()
                : i.jumpTo(0);
            }, n.opts.slideShow.speed)))
          : (t.stop(), (i.idleSecondsCounter = 0), i.showControls());
      },
      clear: function () {
        clearTimeout(this.timer),
          (this.timer = null),
          this.$progress && this.$progress.removeAttr("style").hide();
      },
      start: function () {
        var e = this,
          t = e.instance.current;
        t &&
          (e.$button
            .attr(
              "title",
              (t.opts.i18n[t.opts.lang] || t.opts.i18n.en).PLAY_STOP
            )
            .removeClass("fancybox-button--play")
            .addClass("fancybox-button--pause"),
          (e.isActive = !0),
          t.isComplete && e.set(!0),
          e.instance.trigger("onSlideShowChange", !0));
      },
      stop: function () {
        var e = this,
          t = e.instance.current;
        e.clear(),
          e.$button
            .attr(
              "title",
              (t.opts.i18n[t.opts.lang] || t.opts.i18n.en).PLAY_START
            )
            .removeClass("fancybox-button--pause")
            .addClass("fancybox-button--play"),
          (e.isActive = !1),
          e.instance.trigger("onSlideShowChange", !1),
          e.$progress && e.$progress.removeAttr("style").hide();
      },
      toggle: function () {
        this.isActive ? this.stop() : this.start();
      },
    }),
      r(a).on({
        "onInit.fb": function (e, t) {
          t && !t.SlideShow && (t.SlideShow = new i(t));
        },
        "beforeShow.fb": function (e, t, i, n) {
          var s = t && t.SlideShow;
          n
            ? s && i.opts.slideShow.autoStart && s.start()
            : s && s.isActive && s.clear();
        },
        "afterShow.fb": function (e, t, i) {
          var n = t && t.SlideShow;
          n && n.isActive && n.set();
        },
        "afterKeydown.fb": function (e, t, i, n, s) {
          var o = t && t.SlideShow;
          !o ||
            !i.opts.slideShow ||
            (80 !== s && 32 !== s) ||
            r(a.activeElement).is("button,a,input") ||
            (n.preventDefault(), o.toggle());
        },
        "beforeClose.fb onDeactivate.fb": function (e, t) {
          var i = t && t.SlideShow;
          i && i.stop();
        },
      }),
      r(a).on("visibilitychange", function () {
        var e = r.fancybox.getInstance(),
          t = e && e.SlideShow;
        t && t.isActive && (a.hidden ? t.clear() : t.set());
      });
  })(document, jQuery),
  (function (o, i) {
    "use strict";
    var n = (function () {
      for (
        var e = [
            [
              "requestFullscreen",
              "exitFullscreen",
              "fullscreenElement",
              "fullscreenEnabled",
              "fullscreenchange",
              "fullscreenerror",
            ],
            [
              "webkitRequestFullscreen",
              "webkitExitFullscreen",
              "webkitFullscreenElement",
              "webkitFullscreenEnabled",
              "webkitfullscreenchange",
              "webkitfullscreenerror",
            ],
            [
              "webkitRequestFullScreen",
              "webkitCancelFullScreen",
              "webkitCurrentFullScreenElement",
              "webkitCancelFullScreen",
              "webkitfullscreenchange",
              "webkitfullscreenerror",
            ],
            [
              "mozRequestFullScreen",
              "mozCancelFullScreen",
              "mozFullScreenElement",
              "mozFullScreenEnabled",
              "mozfullscreenchange",
              "mozfullscreenerror",
            ],
            [
              "msRequestFullscreen",
              "msExitFullscreen",
              "msFullscreenElement",
              "msFullscreenEnabled",
              "MSFullscreenChange",
              "MSFullscreenError",
            ],
          ],
          t = {},
          i = 0;
        i < e.length;
        i++
      ) {
        var n = e[i];
        if (n && n[1] in o) {
          for (var s = 0; s < n.length; s++) t[e[0][s]] = n[s];
          return t;
        }
      }
      return !1;
    })();
    if (n) {
      var s = {
        request: function (e) {
          (e = e || o.documentElement)[n.requestFullscreen](
            e.ALLOW_KEYBOARD_INPUT
          );
        },
        exit: function () {
          o[n.exitFullscreen]();
        },
        toggle: function (e) {
          (e = e || o.documentElement),
            this.isFullscreen() ? this.exit() : this.request(e);
        },
        isFullscreen: function () {
          return Boolean(o[n.fullscreenElement]);
        },
        enabled: function () {
          return Boolean(o[n.fullscreenEnabled]);
        },
      };
      i.extend(!0, i.fancybox.defaults, {
        btnTpl: {
          fullScreen:
            '<button data-fancybox-fullscreen class="fancybox-button fancybox-button--fsenter" title="{{FULL_SCREEN}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5 16h3v3h2v-5H5zm3-8H5v2h5V5H8zm6 11h2v-3h3v-2h-5zm2-11V5h-2v5h5V8z"/></svg></button>',
        },
        fullScreen: { autoStart: !1 },
      }),
        i(o).on(n.fullscreenchange, function () {
          var e = s.isFullscreen(),
            t = i.fancybox.getInstance();
          t &&
            (t.current &&
              "image" === t.current.type &&
              t.isAnimating &&
              ((t.isAnimating = !1),
              t.update(!0, !0, 0),
              t.isComplete || t.complete()),
            t.trigger("onFullscreenChange", e),
            t.$refs.container.toggleClass("fancybox-is-fullscreen", e),
            t.$refs.toolbar
              .find("[data-fancybox-fullscreen]")
              .toggleClass("fancybox-button--fsenter", !e)
              .toggleClass("fancybox-button--fsexit", e));
        });
    }
    i(o).on({
      "onInit.fb": function (e, t) {
        n
          ? t && t.group[t.currIndex].opts.fullScreen
            ? (t.$refs.container.on(
                "click.fb-fullscreen",
                "[data-fancybox-fullscreen]",
                function (e) {
                  e.stopPropagation(), e.preventDefault(), s.toggle();
                }
              ),
              t.opts.fullScreen &&
                !0 === t.opts.fullScreen.autoStart &&
                s.request(),
              (t.FullScreen = s))
            : t && t.$refs.toolbar.find("[data-fancybox-fullscreen]").hide()
          : t.$refs.toolbar.find("[data-fancybox-fullscreen]").remove();
      },
      "afterKeydown.fb": function (e, t, i, n, s) {
        t &&
          t.FullScreen &&
          70 === s &&
          (n.preventDefault(), t.FullScreen.toggle());
      },
      "beforeClose.fb": function (e, t) {
        t &&
          t.FullScreen &&
          t.$refs.container.hasClass("fancybox-is-fullscreen") &&
          s.exit();
      },
    });
  })(document, jQuery),
  (function (e, o) {
    "use strict";
    var a = "fancybox-thumbs",
      r = a + "-active";
    o.fancybox.defaults = o.extend(
      !0,
      {
        btnTpl: {
          thumbs:
            '<button data-fancybox-thumbs class="fancybox-button fancybox-button--thumbs" title="{{THUMBS}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M14.59 14.59h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76H5.65v-3.76zm8.94-4.47h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76H5.65v-3.76zm8.94-4.47h3.76v3.76h-3.76V5.65zm-4.47 0h3.76v3.76h-3.76V5.65zm-4.47 0h3.76v3.76H5.65V5.65z"/></svg></button>',
        },
        thumbs: {
          autoStart: !1,
          hideOnClose: !0,
          parentEl: ".fancybox-container",
          axis: "y",
        },
      },
      o.fancybox.defaults
    );
    function n(e) {
      this.init(e);
    }
    o.extend(n.prototype, {
      $button: null,
      $grid: null,
      $list: null,
      isVisible: !1,
      isActive: !1,
      init: function (e) {
        var t = this,
          i = e.group,
          n = 0;
        (t.instance = e),
          (t.opts = i[e.currIndex].opts.thumbs),
          ((e.Thumbs = t).$button = e.$refs.toolbar.find(
            "[data-fancybox-thumbs]"
          ));
        for (
          var s = 0, o = i.length;
          s < o && (i[s].thumb && n++, !(1 < n));
          s++
        );
        1 < n && t.opts
          ? (t.$button.removeAttr("style").on("click", function () {
              t.toggle();
            }),
            (t.isActive = !0))
          : t.$button.hide();
      },
      create: function () {
        var i,
          e = this,
          t = e.instance,
          n = e.opts.parentEl,
          s = [];
        e.$grid ||
          ((e.$grid = o(
            '<div class="' + a + " " + a + "-" + e.opts.axis + '"></div>'
          ).appendTo(t.$refs.container.find(n).addBack().filter(n))),
          e.$grid.on("click", "a", function () {
            t.jumpTo(o(this).attr("data-index"));
          })),
          e.$list ||
            (e.$list = o('<div class="' + a + '__list">').appendTo(e.$grid)),
          o.each(t.group, function (e, t) {
            (i = t.thumb) || "image" !== t.type || (i = t.src),
              s.push(
                '<a href="javascript:;" tabindex="0" data-index="' +
                  e +
                  '"' +
                  (i && i.length
                    ? ' style="background-image:url(' + i + ')"'
                    : 'class="fancybox-thumbs-missing"') +
                  "></a>"
              );
          }),
          (e.$list[0].innerHTML = s.join("")),
          "x" === e.opts.axis &&
            e.$list.width(
              parseInt(e.$grid.css("padding-right"), 10) +
                t.group.length * e.$list.children().eq(0).outerWidth(!0)
            );
      },
      focus: function (e) {
        var t,
          i,
          n = this,
          s = n.$list,
          o = n.$grid;
        n.instance.current &&
          ((i = (t = s
            .children()
            .removeClass(r)
            .filter('[data-index="' + n.instance.current.index + '"]')
            .addClass(r)).position()),
          "y" === n.opts.axis &&
          (i.top < 0 || i.top > s.height() - t.outerHeight())
            ? s.stop().animate({ scrollTop: s.scrollTop() + i.top }, e)
            : "x" === n.opts.axis &&
              (i.left < o.scrollLeft() ||
                i.left > o.scrollLeft() + (o.width() - t.outerWidth())) &&
              s.parent().stop().animate({ scrollLeft: i.left }, e));
      },
      update: function () {
        var e = this;
        e.instance.$refs.container.toggleClass(
          "fancybox-show-thumbs",
          this.isVisible
        ),
          e.isVisible
            ? (e.$grid || e.create(),
              e.instance.trigger("onThumbsShow"),
              e.focus(0))
            : e.$grid && e.instance.trigger("onThumbsHide"),
          e.instance.update();
      },
      hide: function () {
        (this.isVisible = !1), this.update();
      },
      show: function () {
        (this.isVisible = !0), this.update();
      },
      toggle: function () {
        (this.isVisible = !this.isVisible), this.update();
      },
    }),
      o(e).on({
        "onInit.fb": function (e, t) {
          var i;
          t &&
            !t.Thumbs &&
            (i = new n(t)).isActive &&
            !0 === i.opts.autoStart &&
            i.show();
        },
        "beforeShow.fb": function (e, t, i, n) {
          var s = t && t.Thumbs;
          s && s.isVisible && s.focus(n ? 0 : 250);
        },
        "afterKeydown.fb": function (e, t, i, n, s) {
          var o = t && t.Thumbs;
          o && o.isActive && 71 === s && (n.preventDefault(), o.toggle());
        },
        "beforeClose.fb": function (e, t) {
          var i = t && t.Thumbs;
          i && i.isVisible && !1 !== i.opts.hideOnClose && i.$grid.hide();
        },
      });
  })(document, jQuery),
  (function (e, s) {
    "use strict";
    s.extend(!0, s.fancybox.defaults, {
      btnTpl: {
        share:
          '<button data-fancybox-share class="fancybox-button fancybox-button--share" title="{{SHARE}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M2.55 19c1.4-8.4 9.1-9.8 11.9-9.8V5l7 7-7 6.3v-3.5c-2.8 0-10.5 2.1-11.9 4.2z"/></svg></button>',
      },
      share: {
        url: function (e, t) {
          return (
            (!e.currentHash &&
              "inline" !== t.type &&
              "html" !== t.type &&
              (t.origSrc || t.src)) ||
            window.location
          );
        },
        tpl: '<div class="fancybox-share"><h1>{{SHARE}}</h1><p><a class="fancybox-share__button fancybox-share__button--fb" href="https://www.facebook.com/sharer/sharer.php?u={{url}}"><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m287 456v-299c0-21 6-35 35-35h38v-63c-7-1-29-3-55-3-54 0-91 33-91 94v306m143-254h-205v72h196" /></svg><span>Facebook</span></a><a class="fancybox-share__button fancybox-share__button--tw" href="https://twitter.com/intent/tweet?url={{url}}&text={{descr}}"><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m456 133c-14 7-31 11-47 13 17-10 30-27 37-46-15 10-34 16-52 20-61-62-157-7-141 75-68-3-129-35-169-85-22 37-11 86 26 109-13 0-26-4-37-9 0 39 28 72 65 80-12 3-25 4-37 2 10 33 41 57 77 57-42 30-77 38-122 34 170 111 378-32 359-208 16-11 30-25 41-42z" /></svg><span>Twitter</span></a><a class="fancybox-share__button fancybox-share__button--pt" href="https://www.pinterest.com/pin/create/button/?url={{url}}&description={{descr}}&media={{media}}"><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m265 56c-109 0-164 78-164 144 0 39 15 74 47 87 5 2 10 0 12-5l4-19c2-6 1-8-3-13-9-11-15-25-15-45 0-58 43-110 113-110 62 0 96 38 96 88 0 67-30 122-73 122-24 0-42-19-36-44 6-29 20-60 20-81 0-19-10-35-31-35-25 0-44 26-44 60 0 21 7 36 7 36l-30 125c-8 37-1 83 0 87 0 3 4 4 5 2 2-3 32-39 42-75l16-64c8 16 31 29 56 29 74 0 124-67 124-157 0-69-58-132-146-132z" fill="#fff"/></svg><span>Pinterest</span></a></p><p><input class="fancybox-share__input" type="text" value="{{url_raw}}" onclick="select()" /></p></div>',
      },
    }),
      s(e).on("click", "[data-fancybox-share]", function () {
        var e,
          t,
          i = s.fancybox.getInstance(),
          n = i.current || null;
        n &&
          ("function" === s.type(n.opts.share.url) &&
            (e = n.opts.share.url.apply(n, [i, n])),
          (t = n.opts.share.tpl
            .replace(
              /\{\{media\}\}/g,
              "image" === n.type ? encodeURIComponent(n.src) : ""
            )
            .replace(/\{\{url\}\}/g, encodeURIComponent(e))
            .replace(
              /\{\{url_raw\}\}/g,
              (function (e) {
                var t = {
                  "&": "&amp;",
                  "<": "&lt;",
                  ">": "&gt;",
                  '"': "&quot;",
                  "'": "&#39;",
                  "/": "&#x2F;",
                  "`": "&#x60;",
                  "=": "&#x3D;",
                };
                return String(e).replace(/[&<>"'`=\/]/g, function (e) {
                  return t[e];
                });
              })(e)
            )
            .replace(
              /\{\{descr\}\}/g,
              i.$caption ? encodeURIComponent(i.$caption.text()) : ""
            )),
          s.fancybox.open({
            src: i.translate(i, t),
            type: "html",
            opts: {
              touch: !1,
              animationEffect: !1,
              afterLoad: function (e, t) {
                i.$refs.container.one("beforeClose.fb", function () {
                  e.close(null, 0);
                }),
                  t.$content.find(".fancybox-share__button").click(function () {
                    return (
                      window.open(this.href, "Share", "width=550, height=450"),
                      !1
                    );
                  });
              },
              mobile: { autoFocus: !1 },
            },
          }));
      });
  })(document, jQuery),
  (function (o, a, s) {
    "use strict";
    function r() {
      var e = o.location.hash.substr(1),
        t = e.split("-"),
        i =
          (1 < t.length &&
            /^\+?\d+$/.test(t[t.length - 1]) &&
            parseInt(t.pop(-1), 10)) ||
          1;
      return { hash: e, index: i < 1 ? 1 : i, gallery: t.join("-") };
    }
    function t(e) {
      "" !== e.gallery &&
        s("[data-fancybox='" + s.escapeSelector(e.gallery) + "']")
          .eq(e.index - 1)
          .focus()
          .trigger("click.fb-start");
    }
    function l(e) {
      var t, i;
      return (
        !!e &&
        "" !==
          (i =
            (t = e.current ? e.current.opts : e.opts).hash ||
            (t.$orig
              ? t.$orig.data("fancybox") || t.$orig.data("fancybox-trigger")
              : "")) &&
        i
      );
    }
    s.escapeSelector ||
      (s.escapeSelector = function (e) {
        return (e + "").replace(
          /([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g,
          function (e, t) {
            return t
              ? "\0" === e
                ? "�"
                : e.slice(0, -1) +
                  "\\" +
                  e.charCodeAt(e.length - 1).toString(16) +
                  " "
              : "\\" + e;
          }
        );
      }),
      s(function () {
        !1 !== s.fancybox.defaults.hash &&
          (s(a).on({
            "onInit.fb": function (e, t) {
              var i, n;
              !1 !== t.group[t.currIndex].opts.hash &&
                ((i = r()),
                (n = l(t)) &&
                  i.gallery &&
                  n == i.gallery &&
                  (t.currIndex = i.index - 1));
            },
            "beforeShow.fb": function (e, t, i, n) {
              var s;
              i &&
                !1 !== i.opts.hash &&
                (s = l(t)) &&
                ((t.currentHash =
                  s + (1 < t.group.length ? "-" + (i.index + 1) : "")),
                o.location.hash !== "#" + t.currentHash &&
                  (n && !t.origHash && (t.origHash = o.location.hash),
                  t.hashTimer && clearTimeout(t.hashTimer),
                  (t.hashTimer = setTimeout(function () {
                    "replaceState" in o.history
                      ? (o.history[n ? "pushState" : "replaceState"](
                          {},
                          a.title,
                          o.location.pathname +
                            o.location.search +
                            "#" +
                            t.currentHash
                        ),
                        n && (t.hasCreatedHistory = !0))
                      : (o.location.hash = t.currentHash),
                      (t.hashTimer = null);
                  }, 300))));
            },
            "beforeClose.fb": function (e, t, i) {
              i &&
                !1 !== i.opts.hash &&
                (clearTimeout(t.hashTimer),
                t.currentHash && t.hasCreatedHistory
                  ? o.history.back()
                  : t.currentHash &&
                    ("replaceState" in o.history
                      ? o.history.replaceState(
                          {},
                          a.title,
                          o.location.pathname +
                            o.location.search +
                            (t.origHash || "")
                        )
                      : (o.location.hash = t.origHash)),
                (t.currentHash = null));
            },
          }),
          s(o).on("hashchange.fb", function () {
            var e = r(),
              n = null;
            s.each(s(".fancybox-container").get().reverse(), function (e, t) {
              var i = s(t).data("FancyBox");
              if (i && i.currentHash) return (n = i), !1;
            }),
              n
                ? n.currentHash === e.gallery + "-" + e.index ||
                  (1 === e.index && n.currentHash == e.gallery) ||
                  ((n.currentHash = null), n.close())
                : "" !== e.gallery && t(e);
          }),
          setTimeout(function () {
            s.fancybox.getInstance() || t(r());
          }, 50));
      });
  })(window, document, jQuery),
  (function (e, t) {
    "use strict";
    var s = new Date().getTime();
    t(e).on({
      "onInit.fb": function (e, n, t) {
        n.$refs.stage.on(
          "mousewheel DOMMouseScroll wheel MozMousePixelScroll",
          function (e) {
            var t = n.current,
              i = new Date().getTime();
            n.group.length < 2 ||
              !1 === t.opts.wheel ||
              ("auto" === t.opts.wheel && "image" !== t.type) ||
              (e.preventDefault(),
              e.stopPropagation(),
              t.$slide.hasClass("fancybox-animated") ||
                ((e = e.originalEvent || e),
                i - s < 250 ||
                  ((s = i),
                  n[
                    (-e.deltaY || -e.deltaX || e.wheelDelta || -e.detail) < 0
                      ? "next"
                      : "previous"
                  ]())));
          }
        );
      },
    });
  })(document, jQuery),
  (function (e) {
    "function" == typeof define && define.amd
      ? define(["jquery"], e)
      : "object" == typeof module && module.exports
      ? (module.exports = e(require("jquery")))
      : e(jQuery);
  })(function (h) {
    function e() {
      for (
        var e = p.scrollTop(),
          t = u.height(),
          i = t - m,
          n = i < e ? i - e : 0,
          s = 0,
          o = f.length;
        s < o;
        s++
      ) {
        var a = f[s],
          r = a.stickyWrapper.offset().top - a.topSpacing - n;
        if (
          (a.stickyWrapper.css("height", a.stickyElement.outerHeight()), e <= r)
        )
          null !== a.currentTop &&
            (a.stickyElement.css({
              width: "",
              position: "",
              top: "",
              "z-index": "",
            }),
            a.stickyElement.parent().removeClass(a.className),
            a.stickyElement.trigger("sticky-end", [a]),
            (a.currentTop = null));
        else {
          var l,
            d =
              t -
              a.stickyElement.outerHeight() -
              a.topSpacing -
              a.bottomSpacing -
              e -
              n;
          if (
            (d < 0 ? (d += a.topSpacing) : (d = a.topSpacing),
            a.currentTop !== d)
          )
            a.getWidthFrom
              ? ((padding =
                  a.stickyElement.innerWidth() - a.stickyElement.width()),
                (l = h(a.getWidthFrom).width() - padding || null))
              : a.widthFromWrapper && (l = a.stickyWrapper.width()),
              null == l && (l = a.stickyElement.width()),
              a.stickyElement
                .css("width", l)
                .css("position", "fixed")
                .css("top", d)
                .css("z-index", a.zIndex),
              a.stickyElement.parent().addClass(a.className),
              null === a.currentTop
                ? a.stickyElement.trigger("sticky-start", [a])
                : a.stickyElement.trigger("sticky-update", [a]),
              (a.currentTop === a.topSpacing && a.currentTop > d) ||
              (null === a.currentTop && d < a.topSpacing)
                ? a.stickyElement.trigger("sticky-bottom-reached", [a])
                : null !== a.currentTop &&
                  d === a.topSpacing &&
                  a.currentTop < d &&
                  a.stickyElement.trigger("sticky-bottom-unreached", [a]),
              (a.currentTop = d);
          var c = a.stickyWrapper.parent();
          a.stickyElement.offset().top + a.stickyElement.outerHeight() >=
            c.offset().top + c.outerHeight() &&
          a.stickyElement.offset().top <= a.topSpacing
            ? a.stickyElement
                .css("position", "absolute")
                .css("top", "")
                .css("bottom", 0)
                .css("z-index", "")
            : a.stickyElement
                .css("position", "fixed")
                .css("top", d)
                .css("bottom", "")
                .css("z-index", a.zIndex);
        }
      }
    }
    function t() {
      m = p.height();
      for (var e = 0, t = f.length; e < t; e++) {
        var i = f[e],
          n = null;
        i.getWidthFrom
          ? i.responsiveWidth && (n = h(i.getWidthFrom).width())
          : i.widthFromWrapper && (n = i.stickyWrapper.width()),
          null != n && i.stickyElement.css("width", n);
      }
    }
    var i = Array.prototype.slice,
      n = Array.prototype.splice,
      r = {
        topSpacing: 0,
        bottomSpacing: 0,
        className: "is-sticky",
        wrapperClassName: "sticky-wrapper",
        center: !1,
        getWidthFrom: "",
        widthFromWrapper: !0,
        responsiveWidth: !1,
        zIndex: "inherit",
      },
      p = h(window),
      u = h(document),
      f = [],
      m = p.height(),
      l = {
        init: function (a) {
          return this.each(function () {
            var e = h.extend({}, r, a),
              t = h(this),
              i = t.attr("id"),
              n = i ? i + "-" + r.wrapperClassName : r.wrapperClassName,
              s = h("<div></div>").attr("id", n).addClass(e.wrapperClassName);
            t.wrapAll(function () {
              if (0 == h(this).parent("#" + n).length) return s;
            });
            var o = t.parent();
            e.center &&
              o.css({
                width: t.outerWidth(),
                marginLeft: "auto",
                marginRight: "auto",
              }),
              "right" === t.css("float") &&
                t.css({ float: "none" }).parent().css({ float: "right" }),
              (e.stickyElement = t),
              (e.stickyWrapper = o),
              (e.currentTop = null),
              f.push(e),
              l.setWrapperHeight(this),
              l.setupChangeListeners(this);
          });
        },
        setWrapperHeight: function (e) {
          var t = h(e),
            i = t.parent();
          i && i.css("height", t.outerHeight());
        },
        setupChangeListeners: function (t) {
          window.MutationObserver
            ? new window.MutationObserver(function (e) {
                (e[0].addedNodes.length || e[0].removedNodes.length) &&
                  l.setWrapperHeight(t);
              }).observe(t, { subtree: !0, childList: !0 })
            : window.addEventListener
            ? (t.addEventListener(
                "DOMNodeInserted",
                function () {
                  l.setWrapperHeight(t);
                },
                !1
              ),
              t.addEventListener(
                "DOMNodeRemoved",
                function () {
                  l.setWrapperHeight(t);
                },
                !1
              ))
            : window.attachEvent &&
              (t.attachEvent("onDOMNodeInserted", function () {
                l.setWrapperHeight(t);
              }),
              t.attachEvent("onDOMNodeRemoved", function () {
                l.setWrapperHeight(t);
              }));
        },
        update: e,
        unstick: function (e) {
          return this.each(function () {
            for (var e = h(this), t = -1, i = f.length; 0 < i--; )
              f[i].stickyElement.get(0) === this && (n.call(f, i, 1), (t = i));
            -1 !== t &&
              (e.unwrap(),
              e.css({
                width: "",
                position: "",
                top: "",
                float: "",
                "z-index": "",
              }));
          });
        },
      };
    window.addEventListener
      ? (window.addEventListener("scroll", e, !1),
        window.addEventListener("resize", t, !1))
      : window.attachEvent &&
        (window.attachEvent("onscroll", e), window.attachEvent("onresize", t)),
      (h.fn.sticky = function (e) {
        return l[e]
          ? l[e].apply(this, i.call(arguments, 1))
          : "object" != typeof e && e
          ? void h.error("Method " + e + " does not exist on jQuery.sticky")
          : l.init.apply(this, arguments);
      }),
      (h.fn.unstick = function (e) {
        return l[e]
          ? l[e].apply(this, i.call(arguments, 1))
          : "object" != typeof e && e
          ? void h.error("Method " + e + " does not exist on jQuery.sticky")
          : l.unstick.apply(this, arguments);
      }),
      h(function () {
        setTimeout(e, 0);
      });
  }),
  (function (e) {
    "use strict";
    "function" == typeof define && define.amd
      ? define(["jquery"], e)
      : e(jQuery);
  })(function (s) {
    "use strict";
    var o = [],
      t = [],
      n = { precision: 100, elapse: !1, defer: !1 };
    t.push(/^[0-9]*$/.source),
      t.push(/([0-9]{1,2}\/){2}[0-9]{4}( [0-9]{1,2}(:[0-9]{2}){2})?/.source),
      t.push(
        /[0-9]{4}([\/\-][0-9]{1,2}){2}( [0-9]{1,2}(:[0-9]{2}){2})?/.source
      ),
      (t = new RegExp(t.join("|")));
    var p = {
      Y: "years",
      m: "months",
      n: "daysToMonth",
      d: "daysToWeek",
      w: "weeks",
      W: "weeksToMonth",
      H: "hours",
      M: "minutes",
      S: "seconds",
      D: "totalDays",
      I: "totalHours",
      N: "totalMinutes",
      T: "totalSeconds",
    };
    function u(e, t) {
      var i = "s",
        n = "";
      return (
        e &&
          (i =
            1 === (e = e.replace(/(:|;|\s)/gi, "").split(/\,/)).length
              ? e[0]
              : ((n = e[0]), e[1])),
        1 < Math.abs(t) ? i : n
      );
    }
    function a(e, t, i) {
      (this.el = e),
        (this.$el = s(e)),
        (this.interval = null),
        (this.offset = {}),
        (this.options = s.extend({}, n)),
        (this.instanceNumber = o.length),
        o.push(this),
        this.$el.data("countdown-instance", this.instanceNumber),
        i &&
          ("function" == typeof i
            ? (this.$el.on("update.countdown", i),
              this.$el.on("stoped.countdown", i),
              this.$el.on("finish.countdown", i))
            : (this.options = s.extend({}, n, i))),
        this.setFinalDate(t),
        !1 === this.options.defer && this.start();
    }
    s.extend(a.prototype, {
      start: function () {
        null !== this.interval && clearInterval(this.interval);
        var e = this;
        this.update(),
          (this.interval = setInterval(function () {
            e.update.call(e);
          }, this.options.precision));
      },
      stop: function () {
        clearInterval(this.interval),
          (this.interval = null),
          this.dispatchEvent("stoped");
      },
      toggle: function () {
        this.interval ? this.stop() : this.start();
      },
      pause: function () {
        this.stop();
      },
      resume: function () {
        this.start();
      },
      remove: function () {
        this.stop.call(this),
          (o[this.instanceNumber] = null),
          delete this.$el.data().countdownInstance;
      },
      setFinalDate: function (e) {
        this.finalDate = (function (e) {
          if (e instanceof Date) return e;
          if (String(e).match(t))
            return (
              String(e).match(/^[0-9]*$/) && (e = Number(e)),
              String(e).match(/\-/) && (e = String(e).replace(/\-/g, "/")),
              new Date(e)
            );
          throw new Error("Couldn't cast `" + e + "` to a date object.");
        })(e);
      },
      update: function () {
        if (0 !== this.$el.closest("html").length) {
          var e,
            t = void 0 !== s._data(this.el, "events"),
            i = new Date();
          (e = this.finalDate.getTime() - i.getTime()),
            (e = Math.ceil(e / 1e3)),
            (e = !this.options.elapse && e < 0 ? 0 : Math.abs(e)),
            this.totalSecsLeft !== e &&
              t &&
              ((this.totalSecsLeft = e),
              (this.elapsed = i >= this.finalDate),
              (this.offset = {
                seconds: this.totalSecsLeft % 60,
                minutes: Math.floor(this.totalSecsLeft / 60) % 60,
                hours: Math.floor(this.totalSecsLeft / 60 / 60) % 24,
                days: Math.floor(this.totalSecsLeft / 60 / 60 / 24) % 7,
                daysToWeek: Math.floor(this.totalSecsLeft / 60 / 60 / 24) % 7,
                daysToMonth: Math.floor(
                  (this.totalSecsLeft / 60 / 60 / 24) % 30.4368
                ),
                weeks: Math.floor(this.totalSecsLeft / 60 / 60 / 24 / 7),
                weeksToMonth:
                  Math.floor(this.totalSecsLeft / 60 / 60 / 24 / 7) % 4,
                months: Math.floor(this.totalSecsLeft / 60 / 60 / 24 / 30.4368),
                years: Math.abs(this.finalDate.getFullYear() - i.getFullYear()),
                totalDays: Math.floor(this.totalSecsLeft / 60 / 60 / 24),
                totalHours: Math.floor(this.totalSecsLeft / 60 / 60),
                totalMinutes: Math.floor(this.totalSecsLeft / 60),
                totalSeconds: this.totalSecsLeft,
              }),
              this.options.elapse || 0 !== this.totalSecsLeft
                ? this.dispatchEvent("update")
                : (this.stop(), this.dispatchEvent("finish")));
        } else this.remove();
      },
      dispatchEvent: function (e) {
        var t = s.Event(e + ".countdown");
        (t.finalDate = this.finalDate),
          (t.elapsed = this.elapsed),
          (t.offset = s.extend({}, this.offset)),
          (t.strftime = (function (h) {
            return function (e) {
              var t,
                i,
                n = e.match(/%(-|!)?[A-Z]{1}(:[^;]+;)?/gi);
              if (n)
                for (var s = 0, o = n.length; s < o; ++s) {
                  var a = n[s].match(/%(-|!)?([a-zA-Z]{1})(:[^;]+;)?/),
                    r =
                      ((t = a[0]),
                      void 0,
                      (i = t
                        .toString()
                        .replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1")),
                      new RegExp(i)),
                    l = a[1] || "",
                    d = a[3] || "",
                    c = null;
                  (a = a[2]),
                    p.hasOwnProperty(a) && ((c = p[a]), (c = Number(h[c]))),
                    null !== c &&
                      ("!" === l && (c = u(d, c)),
                      "" === l && c < 10 && (c = "0" + c.toString()),
                      (e = e.replace(r, c.toString())));
                }
              return (e = e.replace(/%%/, "%"));
            };
          })(this.offset)),
          this.$el.trigger(t);
      },
    }),
      (s.fn.countdown = function () {
        var n = Array.prototype.slice.call(arguments, 0);
        return this.each(function () {
          var e = s(this).data("countdown-instance");
          if (void 0 !== e) {
            var t = o[e],
              i = n[0];
            a.prototype.hasOwnProperty(i)
              ? t[i].apply(t, n.slice(1))
              : null === String(i).match(/^[$A-Z_][0-9A-Z_$]*$/i)
              ? (t.setFinalDate.call(t, i), t.start())
              : s.error(
                  "Method %s does not exist on jQuery.countdown".replace(
                    /\%s/gi,
                    i
                  )
                );
          } else new a(this, n[0], n[1]);
        });
      });
  }),
  "function" != typeof Object.create &&
    (Object.create = function (e) {
      function t() {}
      return (t.prototype = e), new t();
    }),
  (function (f, n) {
    var i = {
      init: function (e, t) {
        var i = this;
        if (
          ((i.elem = t),
          (i.$elem = f(t)),
          (i.options = f.extend(
            {},
            f.fn.ezPlus.options,
            i.responsiveConfig(e || {})
          )),
          (i.imageSrc = i.$elem.attr("data-" + i.options.attrImageZoomSrc)
            ? i.$elem.attr("data-" + i.options.attrImageZoomSrc)
            : i.$elem.attr("src")),
          i.options.enabled)
        ) {
          var n;
          i.options.tint &&
            ((i.options.lensColour = "transparent"),
            (i.options.lensOpacity = "1")),
            "inner" === i.options.zoomType && (i.options.showLens = !1),
            "lens" === i.options.zoomType && (i.options.zoomWindowWidth = 0),
            -1 === i.options.zoomId &&
              (i.options.zoomId =
                ((n = new Date().getTime()),
                "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
                  /[xy]/g,
                  function (e) {
                    var t = (n + 16 * Math.random()) % 16 | 0;
                    return (
                      (n = Math.floor(n / 16)),
                      ("x" === e ? t : (3 & t) | 8).toString(16)
                    );
                  }
                ))),
            i.$elem.parent().removeAttr("title").removeAttr("alt"),
            (i.zoomImage = i.imageSrc),
            i.refresh(1);
          var s = i.options.galleryEvent + ".ezpspace";
          (s += i.options.touchEnabled ? " touchend.ezpspace" : ""),
            (i.$galleries = f(
              i.options.gallery
                ? "#" + i.options.gallery
                : i.options.gallerySelector
            )),
            i.$galleries.on(s, i.options.galleryItem, function (e) {
              if (
                (i.options.galleryActiveClass &&
                  (f(i.options.galleryItem, i.$galleries).removeClass(
                    i.options.galleryActiveClass
                  ),
                  f(this).addClass(i.options.galleryActiveClass)),
                "A" === this.tagName && e.preventDefault(),
                f(this).data(i.options.attrImageZoomSrc)
                  ? (i.zoomImagePre = f(this).data(i.options.attrImageZoomSrc))
                  : (i.zoomImagePre = f(this).data("image")),
                i.swaptheimage(f(this).data("image"), i.zoomImagePre),
                "A" === this.tagName)
              )
                return !1;
            });
        }
      },
      refresh: function (e) {
        var t = this;
        setTimeout(function () {
          t.fetch(t.imageSrc, t.$elem, t.options.minZoomLevel);
        }, e || t.options.refresh);
      },
      fetch: function (e, t, i) {
        var n = this,
          s = new Image();
        (s.onload = function () {
          s.width / t.width() <= i
            ? (n.largeWidth = t.width() * i)
            : (n.largeWidth = s.width),
            s.height / t.height() <= i
              ? (n.largeHeight = t.height() * i)
              : (n.largeHeight = s.height),
            n.startZoom(),
            (n.currentImage = n.imageSrc),
            n.options.onZoomedImageLoaded(n.$elem);
        }),
          n.setImageSource(s, e);
      },
      setImageSource: function (e, t) {
        e.src = t;
      },
      startZoom: function () {
        var e,
          n = this;
        if (
          ((n.nzWidth = n.$elem.width()),
          (n.nzHeight = n.$elem.height()),
          (n.isWindowActive = !1),
          (n.isLensActive = !1),
          (n.isTintActive = !1),
          (n.overWindow = !1),
          n.options.imageCrossfade)
        ) {
          var t = f('<div class="zoomWrapper"/>').css({
            height: n.nzHeight,
            width: n.nzWidth,
          });
          n.$elem.parent().hasClass("zoomWrapper") && n.$elem.unwrap(),
            (n.zoomWrap = n.$elem.wrap(t)),
            n.$elem.css({ position: "absolute" });
        }
        (n.zoomLock = 1),
          (n.scrollingLock = !1),
          (n.changeBgSize = !1),
          (n.currentZoomLevel = n.options.zoomLevel),
          n.updateOffset(n),
          (n.widthRatio = n.largeWidth / n.currentZoomLevel / n.nzWidth),
          (n.heightRatio = n.largeHeight / n.currentZoomLevel / n.nzHeight),
          "window" === n.options.zoomType &&
            (n.zoomWindowStyle = {
              display: "none",
              position: "absolute",
              height: n.options.zoomWindowHeight,
              width: n.options.zoomWindowWidth,
              border:
                n.options.borderSize + "px solid " + n.options.borderColour,
              backgroundSize:
                n.largeWidth / n.currentZoomLevel +
                "px " +
                n.largeHeight / n.currentZoomLevel +
                "px",
              backgroundPosition: "0px 0px",
              backgroundRepeat: "no-repeat",
              backgroundColor: "" + n.options.zoomWindowBgColour,
              overflow: "hidden",
              zIndex: 100,
            }),
          "inner" === n.options.zoomType &&
            (n.zoomWindowStyle =
              ((e = n.$elem.css("border-left-width")),
              n.options.scrollZoom &&
                (n.zoomLens = f('<div class="zoomLens"/>')),
              {
                display: "none",
                position: "absolute",
                height: n.nzHeight,
                width: n.nzWidth,
                marginTop: e,
                marginLeft: e,
                border:
                  n.options.borderSize + "px solid " + n.options.borderColour,
                backgroundPosition: "0px 0px",
                backgroundRepeat: "no-repeat",
                cursor: n.options.cursor,
                overflow: "hidden",
                zIndex: n.options.zIndex,
              })),
          "window" === n.options.zoomType &&
            (n.lensStyle =
              (n.nzHeight < n.options.zoomWindowHeight / n.heightRatio
                ? (n.lensHeight = n.nzHeight)
                : (n.lensHeight = n.options.zoomWindowHeight / n.heightRatio),
              n.largeWidth < n.options.zoomWindowWidth
                ? (n.lensWidth = n.nzWidth)
                : (n.lensWidth = n.options.zoomWindowWidth / n.widthRatio),
              {
                display: "none",
                position: "absolute",
                height: n.lensHeight,
                width: n.lensWidth,
                border:
                  n.options.lensBorderSize +
                  "px solid " +
                  n.options.lensBorderColour,
                backgroundPosition: "0px 0px",
                backgroundRepeat: "no-repeat",
                backgroundColor: n.options.lensColour,
                opacity: n.options.lensOpacity,
                cursor: n.options.cursor,
                zIndex: 999,
                overflow: "hidden",
              })),
          (n.tintStyle = {
            display: "block",
            position: "absolute",
            height: n.nzHeight,
            width: n.nzWidth,
            backgroundColor: n.options.tintColour,
            opacity: 0,
          }),
          (n.lensRound = {}),
          "lens" === n.options.zoomType &&
            (n.lensStyle = {
              display: "none",
              position: "absolute",
              float: "left",
              height: n.options.lensSize,
              width: n.options.lensSize,
              border:
                n.options.borderSize + "px solid " + n.options.borderColour,
              backgroundPosition: "0px 0px",
              backgroundRepeat: "no-repeat",
              backgroundColor: n.options.lensColour,
              cursor: n.options.cursor,
            }),
          "round" === n.options.lensShape &&
            (n.lensRound = {
              borderRadius: n.options.lensSize / 2 + n.options.borderSize,
            }),
          (n.zoomContainer = f(
            '<div class="' +
              n.options.container +
              '" uuid="' +
              n.options.zoomId +
              '"/>'
          )),
          n.zoomContainer.css({
            position: "absolute",
            top: n.nzOffset.top,
            left: n.nzOffset.left,
            height: n.nzHeight,
            width: n.nzWidth,
            zIndex: n.options.zIndex,
          }),
          n.$elem.attr("id") &&
            n.zoomContainer.attr(
              "id",
              n.$elem.attr("id") + "-" + n.options.container
            ),
          f(
            "." + n.options.container + '[uuid="' + n.options.zoomId + '"]'
          ).remove(),
          f(n.options.zoomContainerAppendTo).append(n.zoomContainer),
          n.options.containLensZoom &&
            "lens" === n.options.zoomType &&
            n.zoomContainer.css("overflow", "hidden"),
          "inner" !== n.options.zoomType &&
            ((n.zoomLens = f('<div class="zoomLens"/>')
              .css(f.extend({}, n.lensStyle, n.lensRound))
              .appendTo(n.zoomContainer)
              .click(function () {
                n.$elem.trigger("click");
              })),
            n.options.tint &&
              ((n.tintContainer = f('<div class="tintContainer"/>')),
              (n.zoomTint = f('<div class="zoomTint"/>').css(n.tintStyle)),
              n.zoomLens.wrap(n.tintContainer),
              (n.zoomTintcss = n.zoomLens.after(n.zoomTint)),
              (n.zoomTintImage = f('<img src="' + n.$elem.attr("src") + '">')
                .css({
                  position: "absolute",
                  top: 0,
                  left: 0,
                  height: n.nzHeight,
                  width: n.nzWidth,
                  maxWidth: "none",
                })
                .appendTo(n.zoomLens)
                .click(function () {
                  n.$elem.trigger("click");
                }))));
        var i = isNaN(n.options.zoomWindowPosition) ? "body" : n.zoomContainer;
        function s(e) {
          (n.lastX === e.clientX && n.lastY === e.clientY) ||
            (n.setPosition(e), (n.currentLoc = e)),
            (n.lastX = e.clientX),
            (n.lastY = e.clientY);
        }
        (n.zoomWindow = f('<div class="zoomWindow"/>')
          .css(
            f.extend(
              { zIndex: 999, top: n.windowOffsetTop, left: n.windowOffsetLeft },
              n.zoomWindowStyle
            )
          )
          .appendTo(i)
          .click(function () {
            n.$elem.trigger("click");
          })),
          (n.zoomWindowContainer = f('<div class="zoomWindowContainer" />').css(
            { width: n.options.zoomWindowWidth }
          )),
          n.zoomWindow.wrap(n.zoomWindowContainer),
          "lens" === n.options.zoomType &&
            (n.zoomContainer.css("display", "none"),
            n.zoomLens.css({ backgroundImage: 'url("' + n.imageSrc + '")' })),
          "window" === n.options.zoomType &&
            n.zoomWindow.css({ backgroundImage: 'url("' + n.imageSrc + '")' }),
          "inner" === n.options.zoomType &&
            n.zoomWindow.css({ backgroundImage: 'url("' + n.imageSrc + '")' }),
          n.options.touchEnabled &&
            (n.$elem.on("touchmove.ezpspace", function (e) {
              e.preventDefault();
              var t =
                e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
              n.setPosition(t);
            }),
            n.zoomContainer.on("touchmove.ezpspace", function (e) {
              n.setElements("show"), e.preventDefault();
              var t =
                e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
              n.setPosition(t);
            }),
            n.zoomContainer.add(n.$elem).on("touchend.ezpspace", function (e) {
              n.showHideWindow("hide"),
                n.options.showLens && n.showHideLens("hide"),
                n.options.tint &&
                  "inner" !== n.options.zoomType &&
                  n.showHideTint("hide");
            }),
            n.options.showLens &&
              (n.zoomLens.on("touchmove.ezpspace", function (e) {
                e.preventDefault();
                var t =
                  e.originalEvent.touches[0] ||
                  e.originalEvent.changedTouches[0];
                n.setPosition(t);
              }),
              n.zoomLens.on("touchend.ezpspace", function (e) {
                n.showHideWindow("hide"),
                  n.options.showLens && n.showHideLens("hide"),
                  n.options.tint &&
                    "inner" !== n.options.zoomType &&
                    n.showHideTint("hide");
              }))),
          n.zoomContainer.on(
            "click.ezpspace touchstart.ezpspace",
            n.options.onImageClick
          ),
          n.zoomContainer.add(n.$elem).on("mousemove.ezpspace", function (e) {
            !1 === n.overWindow && n.setElements("show"), s(e);
          });
        var o = null;
        "inner" !== n.options.zoomType && (o = n.zoomLens),
          n.options.tint && "inner" !== n.options.zoomType && (o = n.zoomTint),
          "inner" === n.options.zoomType && (o = n.zoomWindow),
          o && o.on("mousemove.ezpspace", s),
          n.zoomContainer.add(n.$elem).hover(
            function () {
              !1 === n.overWindow && n.setElements("show");
            },
            function () {
              n.scrollLock ||
                (n.setElements("hide"), n.options.onDestroy(n.$elem));
            }
          ),
          "inner" !== n.options.zoomType &&
            n.zoomWindow.hover(
              function () {
                (n.overWindow = !0), n.setElements("hide");
              },
              function () {
                n.overWindow = !1;
              }
            ),
          n.options.minZoomLevel
            ? (n.minZoomLevel = n.options.minZoomLevel)
            : (n.minZoomLevel = 2 * n.options.scrollZoomIncrement),
          n.options.scrollZoom &&
            n.zoomContainer
              .add(n.$elem)
              .on("wheel DOMMouseScroll MozMousePixelScroll", function (e) {
                (n.scrollLock = !0),
                  clearTimeout(f.data(this, "timer")),
                  f.data(
                    this,
                    "timer",
                    setTimeout(function () {
                      n.scrollLock = !1;
                    }, 250)
                  );
                var t,
                  i = e.originalEvent.deltaY || -1 * e.originalEvent.detail;
                return (
                  e.stopImmediatePropagation(),
                  e.stopPropagation(),
                  e.preventDefault(),
                  0 === i ||
                    (0 < i / 120
                      ? (t =
                          parseFloat(n.currentZoomLevel) -
                          n.options.scrollZoomIncrement) >=
                          parseFloat(n.minZoomLevel) && n.changeZoomLevel(t)
                      : ((n.fullheight || n.fullwidth) &&
                          n.options.mantainZoomAspectRatio) ||
                        ((t =
                          parseFloat(n.currentZoomLevel) +
                          n.options.scrollZoomIncrement),
                        n.options.maxZoomLevel
                          ? t <= n.options.maxZoomLevel && n.changeZoomLevel(t)
                          : n.changeZoomLevel(t))),
                  !1
                );
              });
      },
      destroy: function () {
        var e = this;
        e.$elem.off(".ezpspace"),
          e.$galleries.off(".ezpspace"),
          f(e.zoomContainer).remove(),
          e.options.loadingIcon &&
            e.spinner &&
            e.spinner.length &&
            (e.spinner.remove(), delete e.spinner);
      },
      getIdentifier: function () {
        return this.options.zoomId;
      },
      setElements: function (e) {
        var t = this;
        if (!t.options.zoomEnabled) return !1;
        "show" === e &&
          t.isWindowSet &&
          ("inner" === t.options.zoomType && t.showHideWindow("show"),
          "window" === t.options.zoomType && t.showHideWindow("show"),
          t.options.showLens &&
            (t.showHideZoomContainer("show"), t.showHideLens("show")),
          t.options.tint &&
            "inner" !== t.options.zoomType &&
            t.showHideTint("show")),
          "hide" === e &&
            ("window" === t.options.zoomType && t.showHideWindow("hide"),
            t.options.tint || t.showHideWindow("hide"),
            t.options.showLens &&
              (t.showHideZoomContainer("hide"), t.showHideLens("hide")),
            t.options.tint && t.showHideTint("hide"));
      },
      setPosition: function (e) {
        var t = this;
        if (!t.options.zoomEnabled || void 0 === e) return !1;
        (t.nzHeight = t.$elem.height()),
          (t.nzWidth = t.$elem.width()),
          t.updateOffset(t),
          t.options.tint &&
            "inner" !== t.options.zoomType &&
            t.zoomTint.css({ top: 0, left: 0 }),
          !t.options.responsive ||
            t.options.scrollZoom ||
            (t.options.showLens &&
              (t.nzHeight < t.options.zoomWindowWidth / t.widthRatio
                ? (t.lensHeight = t.nzHeight)
                : (t.lensHeight = t.options.zoomWindowHeight / t.heightRatio),
              t.largeWidth < t.options.zoomWindowWidth
                ? (t.lensWidth = t.nzWidth)
                : (t.lensWidth = t.options.zoomWindowWidth / t.widthRatio),
              (t.widthRatio = t.largeWidth / t.nzWidth),
              (t.heightRatio = t.largeHeight / t.nzHeight),
              "lens" !== t.options.zoomType &&
                (t.nzHeight < t.options.zoomWindowWidth / t.widthRatio
                  ? (t.lensHeight = t.nzHeight)
                  : (t.lensHeight = t.options.zoomWindowHeight / t.heightRatio),
                t.nzWidth < t.options.zoomWindowHeight / t.heightRatio
                  ? (t.lensWidth = t.nzWidth)
                  : (t.lensWidth = t.options.zoomWindowWidth / t.widthRatio),
                t.zoomLens.css({ width: t.lensWidth, height: t.lensHeight }),
                t.options.tint &&
                  t.zoomTintImage.css({
                    width: t.nzWidth,
                    height: t.nzHeight,
                  })),
              "lens" === t.options.zoomType &&
                t.zoomLens.css({
                  width: t.options.lensSize,
                  height: t.options.lensSize,
                })));
        if (
          (t.zoomContainer.css({
            top: t.nzOffset.top,
            left: t.nzOffset.left,
            width: t.nzWidth,
            height: t.nzHeight,
          }),
          (t.mouseLeft = parseInt(e.pageX - t.pageOffsetX - t.nzOffset.left)),
          (t.mouseTop = parseInt(e.pageY - t.pageOffsetY - t.nzOffset.top)),
          "window" === t.options.zoomType)
        ) {
          var i = t.zoomLens.height() / 2,
            n = t.zoomLens.width() / 2;
          (t.Etoppos = t.mouseTop < 0 + i),
            (t.Eboppos =
              t.mouseTop > t.nzHeight - i - 2 * t.options.lensBorderSize),
            (t.Eloppos = t.mouseLeft < 0 + n),
            (t.Eroppos =
              t.mouseLeft > t.nzWidth - n - 2 * t.options.lensBorderSize);
        }
        "inner" === t.options.zoomType &&
          ((t.Etoppos = t.mouseTop < t.nzHeight / 2 / t.heightRatio),
          (t.Eboppos =
            t.mouseTop > t.nzHeight - t.nzHeight / 2 / t.heightRatio),
          (t.Eloppos = t.mouseLeft < 0 + t.nzWidth / 2 / t.widthRatio),
          (t.Eroppos =
            t.mouseLeft >
            t.nzWidth -
              t.nzWidth / 2 / t.widthRatio -
              2 * t.options.lensBorderSize)),
          t.mouseLeft < 0 ||
          t.mouseTop < 0 ||
          t.mouseLeft > t.nzWidth ||
          t.mouseTop > t.nzHeight
            ? t.setElements("hide")
            : (t.options.showLens &&
                ((t.lensLeftPos = Math.floor(
                  t.mouseLeft - t.zoomLens.width() / 2
                )),
                (t.lensTopPos = Math.floor(
                  t.mouseTop - t.zoomLens.height() / 2
                ))),
              t.Etoppos && (t.lensTopPos = 0),
              t.Eloppos &&
                ((t.windowLeftPos = 0), (t.lensLeftPos = 0), (t.tintpos = 0)),
              "window" === t.options.zoomType &&
                (t.Eboppos &&
                  (t.lensTopPos = Math.max(
                    t.nzHeight -
                      t.zoomLens.height() -
                      2 * t.options.lensBorderSize,
                    0
                  )),
                t.Eroppos &&
                  (t.lensLeftPos =
                    t.nzWidth -
                    t.zoomLens.width() -
                    2 * t.options.lensBorderSize)),
              "inner" === t.options.zoomType &&
                (t.Eboppos &&
                  (t.lensTopPos = Math.max(
                    t.nzHeight - 2 * t.options.lensBorderSize,
                    0
                  )),
                t.Eroppos &&
                  (t.lensLeftPos =
                    t.nzWidth - t.nzWidth - 2 * t.options.lensBorderSize)),
              "lens" === t.options.zoomType &&
                ((t.windowLeftPos =
                  -1 *
                  ((e.pageX - t.pageOffsetX - t.nzOffset.left) * t.widthRatio -
                    t.zoomLens.width() / 2)),
                (t.windowTopPos =
                  -1 *
                  ((e.pageY - t.pageOffsetY - t.nzOffset.top) * t.heightRatio -
                    t.zoomLens.height() / 2)),
                t.zoomLens.css({
                  backgroundPosition:
                    t.windowLeftPos + "px " + t.windowTopPos + "px",
                }),
                t.changeBgSize &&
                  (t.nzHeight > t.nzWidth
                    ? ("lens" === t.options.zoomType &&
                        t.zoomLens.css({
                          backgroundSize:
                            t.largeWidth / t.newvalueheight +
                            "px " +
                            t.largeHeight / t.newvalueheight +
                            "px",
                        }),
                      t.zoomWindow.css({
                        backgroundSize:
                          t.largeWidth / t.newvalueheight +
                          "px " +
                          t.largeHeight / t.newvalueheight +
                          "px",
                      }))
                    : ("lens" === t.options.zoomType &&
                        t.zoomLens.css({
                          backgroundSize:
                            t.largeWidth / t.newvaluewidth +
                            "px " +
                            t.largeHeight / t.newvaluewidth +
                            "px",
                        }),
                      t.zoomWindow.css({
                        backgroundSize:
                          t.largeWidth / t.newvaluewidth +
                          "px " +
                          t.largeHeight / t.newvaluewidth +
                          "px",
                      })),
                  (t.changeBgSize = !1)),
                t.setWindowPosition(e)),
              t.options.tint &&
                "inner" !== t.options.zoomType &&
                t.setTintPosition(e),
              "window" === t.options.zoomType && t.setWindowPosition(e),
              "inner" === t.options.zoomType && t.setWindowPosition(e),
              t.options.showLens &&
                (t.fullwidth &&
                  "lens" !== t.options.zoomType &&
                  (t.lensLeftPos = 0),
                t.zoomLens.css({ left: t.lensLeftPos, top: t.lensTopPos })));
      },
      showHideZoomContainer: function (e) {
        "show" === e && this.zoomContainer && this.zoomContainer.show(),
          "hide" === e && this.zoomContainer && this.zoomContainer.hide();
      },
      showHideWindow: function (e) {
        var t = this;
        "show" === e &&
          !t.isWindowActive &&
          t.zoomWindow &&
          (t.options.onShow(t),
          t.options.zoomWindowFadeIn
            ? t.zoomWindow.stop(!0, !0, !1).fadeIn(t.options.zoomWindowFadeIn)
            : t.zoomWindow.show(),
          (t.isWindowActive = !0)),
          "hide" === e &&
            t.isWindowActive &&
            (t.options.zoomWindowFadeOut
              ? t.zoomWindow
                  .stop(!0, !0)
                  .fadeOut(t.options.zoomWindowFadeOut, function () {
                    t.loop && (clearInterval(t.loop), (t.loop = !1));
                  })
              : t.zoomWindow.hide(),
            t.options.onHide(t),
            (t.isWindowActive = !1));
      },
      showHideLens: function (e) {
        var t = this;
        "show" === e &&
          (t.isLensActive ||
            (t.zoomLens &&
              (t.options.lensFadeIn
                ? t.zoomLens.stop(!0, !0, !1).fadeIn(t.options.lensFadeIn)
                : t.zoomLens.show()),
            (t.isLensActive = !0))),
          "hide" === e &&
            t.isLensActive &&
            (t.zoomLens &&
              (t.options.lensFadeOut
                ? t.zoomLens.stop(!0, !0).fadeOut(t.options.lensFadeOut)
                : t.zoomLens.hide()),
            (t.isLensActive = !1));
      },
      showHideTint: function (e) {
        var t = this;
        "show" === e &&
          !t.isTintActive &&
          t.zoomTint &&
          (t.options.zoomTintFadeIn
            ? t.zoomTint
                .css("opacity", t.options.tintOpacity)
                .animate()
                .stop(!0, !0)
                .fadeIn("slow")
            : (t.zoomTint.css("opacity", t.options.tintOpacity).animate(),
              t.zoomTint.show()),
          (t.isTintActive = !0)),
          "hide" === e &&
            t.isTintActive &&
            (t.options.zoomTintFadeOut
              ? t.zoomTint.stop(!0, !0).fadeOut(t.options.zoomTintFadeOut)
              : t.zoomTint.hide(),
            (t.isTintActive = !1));
      },
      setLensPosition: function (e) {},
      setWindowPosition: function (e) {
        var t = this;
        if (isNaN(t.options.zoomWindowPosition))
          (t.externalContainer = f(t.options.zoomWindowPosition)),
            t.externalContainer.length ||
              (t.externalContainer = f("#" + t.options.zoomWindowPosition)),
            (t.externalContainerWidth = t.externalContainer.width()),
            (t.externalContainerHeight = t.externalContainer.height()),
            (t.externalContainerOffset = t.externalContainer.offset()),
            (t.windowOffsetTop = t.externalContainerOffset.top),
            (t.windowOffsetLeft = t.externalContainerOffset.left);
        else
          switch (t.options.zoomWindowPosition) {
            case 1:
              (t.windowOffsetTop = t.options.zoomWindowOffsetY),
                (t.windowOffsetLeft = +t.nzWidth);
              break;
            case 2:
              t.options.zoomWindowHeight > t.nzHeight
                ? ((t.windowOffsetTop =
                    -1 * (t.options.zoomWindowHeight / 2 - t.nzHeight / 2)),
                  (t.windowOffsetLeft = t.nzWidth))
                : f.noop();
              break;
            case 3:
              (t.windowOffsetTop =
                t.nzHeight - t.zoomWindow.height() - 2 * t.options.borderSize),
                (t.windowOffsetLeft = t.nzWidth);
              break;
            case 4:
              (t.windowOffsetTop = t.nzHeight),
                (t.windowOffsetLeft = t.nzWidth);
              break;
            case 5:
              (t.windowOffsetTop = t.nzHeight),
                (t.windowOffsetLeft =
                  t.nzWidth - t.zoomWindow.width() - 2 * t.options.borderSize);
              break;
            case 6:
              t.options.zoomWindowHeight > t.nzHeight
                ? ((t.windowOffsetTop = t.nzHeight),
                  (t.windowOffsetLeft =
                    -1 *
                    (t.options.zoomWindowWidth / 2 -
                      t.nzWidth / 2 +
                      2 * t.options.borderSize)))
                : f.noop();
              break;
            case 7:
              (t.windowOffsetTop = t.nzHeight), (t.windowOffsetLeft = 0);
              break;
            case 8:
              (t.windowOffsetTop = t.nzHeight),
                (t.windowOffsetLeft =
                  -1 * (t.zoomWindow.width() + 2 * t.options.borderSize));
              break;
            case 9:
              (t.windowOffsetTop =
                t.nzHeight - t.zoomWindow.height() - 2 * t.options.borderSize),
                (t.windowOffsetLeft =
                  -1 * (t.zoomWindow.width() + 2 * t.options.borderSize));
              break;
            case 10:
              t.options.zoomWindowHeight > t.nzHeight
                ? ((t.windowOffsetTop =
                    -1 * (t.options.zoomWindowHeight / 2 - t.nzHeight / 2)),
                  (t.windowOffsetLeft =
                    -1 * (t.zoomWindow.width() + 2 * t.options.borderSize)))
                : f.noop();
              break;
            case 11:
              (t.windowOffsetTop = t.options.zoomWindowOffsetY),
                (t.windowOffsetLeft =
                  -1 * (t.zoomWindow.width() + 2 * t.options.borderSize));
              break;
            case 12:
              (t.windowOffsetTop =
                -1 * (t.zoomWindow.height() + 2 * t.options.borderSize)),
                (t.windowOffsetLeft =
                  -1 * (t.zoomWindow.width() + 2 * t.options.borderSize));
              break;
            case 13:
              (t.windowOffsetTop =
                -1 * (t.zoomWindow.height() + 2 * t.options.borderSize)),
                (t.windowOffsetLeft = 0);
              break;
            case 14:
              t.options.zoomWindowHeight > t.nzHeight
                ? ((t.windowOffsetTop =
                    -1 * (t.zoomWindow.height() + 2 * t.options.borderSize)),
                  (t.windowOffsetLeft =
                    -1 *
                    (t.options.zoomWindowWidth / 2 -
                      t.nzWidth / 2 +
                      2 * t.options.borderSize)))
                : f.noop();
              break;
            case 15:
              (t.windowOffsetTop =
                -1 * (t.zoomWindow.height() + 2 * t.options.borderSize)),
                (t.windowOffsetLeft =
                  t.nzWidth - t.zoomWindow.width() - 2 * t.options.borderSize);
              break;
            case 16:
              (t.windowOffsetTop =
                -1 * (t.zoomWindow.height() + 2 * t.options.borderSize)),
                (t.windowOffsetLeft = t.nzWidth);
              break;
            default:
              (t.windowOffsetTop = t.options.zoomWindowOffsetY),
                (t.windowOffsetLeft = t.nzWidth);
          }
        if (
          ((t.isWindowSet = !0),
          (t.windowOffsetTop = t.windowOffsetTop + t.options.zoomWindowOffsetY),
          (t.windowOffsetLeft =
            t.windowOffsetLeft + t.options.zoomWindowOffsetX),
          t.zoomWindow.css({
            top: t.windowOffsetTop,
            left: t.windowOffsetLeft,
          }),
          "inner" === t.options.zoomType &&
            t.zoomWindow.css({ top: 0, left: 0 }),
          (t.windowLeftPos =
            -1 *
            ((e.pageX - t.pageOffsetX - t.nzOffset.left) * t.widthRatio -
              t.zoomWindow.width() / 2)),
          (t.windowTopPos =
            -1 *
            ((e.pageY - t.pageOffsetY - t.nzOffset.top) * t.heightRatio -
              t.zoomWindow.height() / 2)),
          t.Etoppos && (t.windowTopPos = 0),
          t.Eloppos && (t.windowLeftPos = 0),
          t.Eboppos &&
            (t.windowTopPos =
              -1 *
              (t.largeHeight / t.currentZoomLevel - t.zoomWindow.height())),
          t.Eroppos &&
            (t.windowLeftPos =
              -1 * (t.largeWidth / t.currentZoomLevel - t.zoomWindow.width())),
          t.fullheight && (t.windowTopPos = 0),
          t.fullwidth && (t.windowLeftPos = 0),
          "window" === t.options.zoomType || "inner" === t.options.zoomType)
        )
          if (
            (1 === t.zoomLock &&
              (t.widthRatio <= 1 && (t.windowLeftPos = 0),
              t.heightRatio <= 1 && (t.windowTopPos = 0)),
            t.options.easing)
          ) {
            t.xp || (t.xp = 0), t.yp || (t.yp = 0);
            var i = 16,
              n = parseInt(t.options.easing);
            "number" == typeof n &&
              isFinite(n) &&
              Math.floor(n) === n &&
              (i = n),
              t.loop ||
                (t.loop = setInterval(function () {
                  (t.xp += (t.windowLeftPos - t.xp) / t.options.easingAmount),
                    (t.yp += (t.windowTopPos - t.yp) / t.options.easingAmount),
                    t.scrollingLock
                      ? (clearInterval(t.loop),
                        (t.xp = t.windowLeftPos),
                        (t.yp = t.windowTopPos),
                        (t.xp =
                          -1 *
                          ((e.pageX - t.pageOffsetX - t.nzOffset.left) *
                            t.widthRatio -
                            t.zoomWindow.width() / 2)),
                        (t.yp =
                          -1 *
                          ((e.pageY - t.pageOffsetY - t.nzOffset.top) *
                            t.heightRatio -
                            t.zoomWindow.height() / 2)),
                        t.changeBgSize &&
                          (t.nzHeight > t.nzWidth
                            ? ("lens" === t.options.zoomType &&
                                t.zoomLens.css({
                                  backgroundSize:
                                    t.largeWidth / t.newvalueheight +
                                    "px " +
                                    t.largeHeight / t.newvalueheight +
                                    "px",
                                }),
                              t.zoomWindow.css({
                                backgroundSize:
                                  t.largeWidth / t.newvalueheight +
                                  "px " +
                                  t.largeHeight / t.newvalueheight +
                                  "px",
                              }))
                            : ("lens" !== t.options.zoomType &&
                                t.zoomLens.css({
                                  backgroundSize:
                                    t.largeWidth / t.newvaluewidth +
                                    "px " +
                                    t.largeHeight / t.newvalueheight +
                                    "px",
                                }),
                              t.zoomWindow.css({
                                backgroundSize:
                                  t.largeWidth / t.newvaluewidth +
                                  "px " +
                                  t.largeHeight / t.newvaluewidth +
                                  "px",
                              })),
                          (t.changeBgSize = !1)),
                        t.zoomWindow.css({
                          backgroundPosition:
                            t.windowLeftPos + "px " + t.windowTopPos + "px",
                        }),
                        (t.scrollingLock = !1),
                        (t.loop = !1))
                      : Math.round(
                          Math.abs(t.xp - t.windowLeftPos) +
                            Math.abs(t.yp - t.windowTopPos)
                        ) < 1
                      ? (clearInterval(t.loop),
                        t.zoomWindow.css({
                          backgroundPosition:
                            t.windowLeftPos + "px " + t.windowTopPos + "px",
                        }),
                        (t.loop = !1))
                      : (t.changeBgSize &&
                          (t.nzHeight > t.nzWidth
                            ? ("lens" === t.options.zoomType &&
                                t.zoomLens.css({
                                  backgroundSize:
                                    t.largeWidth / t.newvalueheight +
                                    "px " +
                                    t.largeHeight / t.newvalueheight +
                                    "px",
                                }),
                              t.zoomWindow.css({
                                backgroundSize:
                                  t.largeWidth / t.newvalueheight +
                                  "px " +
                                  t.largeHeight / t.newvalueheight +
                                  "px",
                              }))
                            : ("lens" !== t.options.zoomType &&
                                t.zoomLens.css({
                                  backgroundSize:
                                    t.largeWidth / t.newvaluewidth +
                                    "px " +
                                    t.largeHeight / t.newvaluewidth +
                                    "px",
                                }),
                              t.zoomWindow.css({
                                backgroundSize:
                                  t.largeWidth / t.newvaluewidth +
                                  "px " +
                                  t.largeHeight / t.newvaluewidth +
                                  "px",
                              })),
                          (t.changeBgSize = !1)),
                        t.zoomWindow.css({
                          backgroundPosition: t.xp + "px " + t.yp + "px",
                        }));
                }, i));
          } else
            t.changeBgSize &&
              (t.nzHeight > t.nzWidth
                ? ("lens" === t.options.zoomType &&
                    t.zoomLens.css({
                      backgroundSize:
                        t.largeWidth / t.newvalueheight +
                        "px " +
                        t.largeHeight / t.newvalueheight +
                        "px",
                    }),
                  t.zoomWindow.css({
                    backgroundSize:
                      t.largeWidth / t.newvalueheight +
                      "px " +
                      t.largeHeight / t.newvalueheight +
                      "px",
                  }))
                : ("lens" === t.options.zoomType &&
                    t.zoomLens.css({
                      backgroundSize:
                        t.largeWidth / t.newvaluewidth +
                        "px " +
                        t.largeHeight / t.newvaluewidth +
                        "px",
                    }),
                  t.largeHeight / t.newvaluewidth < t.options.zoomWindowHeight
                    ? t.zoomWindow.css({
                        backgroundSize:
                          t.largeWidth / t.newvaluewidth +
                          "px " +
                          t.largeHeight / t.newvaluewidth +
                          "px",
                      })
                    : t.zoomWindow.css({
                        backgroundSize:
                          t.largeWidth / t.newvalueheight +
                          "px " +
                          t.largeHeight / t.newvalueheight +
                          "px",
                      })),
              (t.changeBgSize = !1)),
              t.zoomWindow.css({
                backgroundPosition:
                  t.windowLeftPos + "px " + t.windowTopPos + "px",
              });
      },
      setTintPosition: function (e) {
        var t = this,
          i = t.zoomLens.width(),
          n = t.zoomLens.height();
        t.updateOffset(t),
          (t.tintpos =
            -1 * (e.pageX - t.pageOffsetX - t.nzOffset.left - i / 2)),
          (t.tintposy =
            -1 * (e.pageY - t.pageOffsetY - t.nzOffset.top - n / 2)),
          t.Etoppos && (t.tintposy = 0),
          t.Eloppos && (t.tintpos = 0),
          t.Eboppos &&
            (t.tintposy = -1 * (t.nzHeight - n - 2 * t.options.lensBorderSize)),
          t.Eroppos &&
            (t.tintpos = -1 * (t.nzWidth - i - 2 * t.options.lensBorderSize)),
          t.options.tint &&
            (t.fullheight && (t.tintposy = 0),
            t.fullwidth && (t.tintpos = 0),
            t.zoomTintImage.css({ left: t.tintpos, top: t.tintposy }));
      },
      swaptheimage: function (e, t) {
        var i = this,
          n = new Image();
        if (i.options.loadingIcon && !i.spinner) {
          var s = {
            background: 'url("' + i.options.loadingIcon + '") no-repeat',
            height: i.nzHeight,
            width: i.nzWidth,
            zIndex: 2e3,
            position: "absolute",
            backgroundPosition: "center center",
          };
          "inner" === i.options.zoomType && s.setProperty("top", 0),
            (i.spinner = f('<div class="ezp-spinner"></div>').css(s)),
            i.$elem.after(i.spinner);
        } else i.spinner && i.spinner.show();
        i.options.onImageSwap(i.$elem),
          (n.onload = function () {
            (i.largeWidth = n.width),
              (i.largeHeight = n.height),
              (i.zoomImage = t),
              i.zoomWindow.css({
                backgroundSize: i.largeWidth + "px " + i.largeHeight + "px",
              }),
              i.swapAction(e, t);
          }),
          i.setImageSource(n, t);
      },
      swapAction: function (e, t) {
        var i = this,
          n = i.$elem.width(),
          s = i.$elem.height(),
          o = new Image();
        if (
          ((o.onload = function () {
            (i.nzHeight = o.height),
              (i.nzWidth = o.width),
              i.options.onImageSwapComplete(i.$elem),
              i.doneCallback();
          }),
          i.setImageSource(o, e),
          (i.currentZoomLevel = i.options.zoomLevel),
          (i.options.maxZoomLevel = !1),
          "lens" === i.options.zoomType &&
            i.zoomLens.css("background-image", 'url("' + t + '")'),
          "window" === i.options.zoomType &&
            i.zoomWindow.css("background-image", 'url("' + t + '")'),
          "inner" === i.options.zoomType &&
            i.zoomWindow.css("background-image", 'url("' + t + '")'),
          (i.currentImage = t),
          i.options.imageCrossfade)
        ) {
          var a = i.$elem,
            r = a.clone();
          if (
            (i.$elem.attr("src", e),
            i.$elem.after(r),
            r.stop(!0).fadeOut(i.options.imageCrossfade, function () {
              f(this).remove();
            }),
            i.$elem.width("auto").removeAttr("width"),
            i.$elem.height("auto").removeAttr("height"),
            a.fadeIn(i.options.imageCrossfade),
            i.options.tint && "inner" !== i.options.zoomType)
          ) {
            var l = i.zoomTintImage,
              d = l.clone();
            i.zoomTintImage.attr("src", t),
              i.zoomTintImage.after(d),
              d.stop(!0).fadeOut(i.options.imageCrossfade, function () {
                f(this).remove();
              }),
              l.fadeIn(i.options.imageCrossfade),
              i.zoomTint.css({ height: s, width: n });
          }
          i.zoomContainer.css({ height: s, width: n }),
            "inner" === i.options.zoomType &&
              (i.options.constrainType ||
                (i.zoomWrap.parent().css({ height: s, width: n }),
                i.zoomWindow.css({ height: s, width: n }))),
            i.options.imageCrossfade && i.zoomWrap.css({ height: s, width: n });
        } else
          i.$elem.attr("src", e),
            i.options.tint &&
              (i.zoomTintImage.attr("src", t),
              i.zoomTintImage.attr("height", s),
              i.zoomTintImage.css("height", s),
              i.zoomTint.css("height", s)),
            i.zoomContainer.css({ height: s, width: n }),
            i.options.imageCrossfade && i.zoomWrap.css({ height: s, width: n });
        if (i.options.constrainType) {
          if ("height" === i.options.constrainType) {
            var c = { height: i.options.constrainSize, width: "auto" };
            i.zoomContainer.css(c),
              i.options.imageCrossfade
                ? (i.zoomWrap.css(c), (i.constwidth = i.zoomWrap.width()))
                : (i.$elem.css(c), (i.constwidth = n));
            var h = { height: i.options.constrainSize, width: i.constwidth };
            "inner" === i.options.zoomType &&
              (i.zoomWrap.parent().css(h), i.zoomWindow.css(h)),
              i.options.tint &&
                (i.tintContainer.css(h),
                i.zoomTint.css(h),
                i.zoomTintImage.css(h));
          }
          if ("width" === i.options.constrainType) {
            var p = { height: "auto", width: i.options.constrainSize };
            i.zoomContainer.css(p),
              i.options.imageCrossfade
                ? (i.zoomWrap.css(p), (i.constheight = i.zoomWrap.height()))
                : (i.$elem.css(p), (i.constheight = s));
            var u = { height: i.constheight, width: i.options.constrainSize };
            "inner" === i.options.zoomType &&
              (i.zoomWrap.parent().css(u), i.zoomWindow.css(u)),
              i.options.tint &&
                (i.tintContainer.css(u),
                i.zoomTint.css(u),
                i.zoomTintImage.css(u));
          }
        }
      },
      doneCallback: function () {
        var e = this;
        e.options.loadingIcon &&
          e.spinner &&
          e.spinner.length &&
          e.spinner.hide(),
          e.updateOffset(e),
          (e.nzWidth = e.$elem.width()),
          (e.nzHeight = e.$elem.height()),
          (e.currentZoomLevel = e.options.zoomLevel),
          (e.widthRatio = e.largeWidth / e.nzWidth),
          (e.heightRatio = e.largeHeight / e.nzHeight),
          "window" === e.options.zoomType &&
            (e.nzHeight < e.options.zoomWindowHeight / e.heightRatio
              ? (e.lensHeight = e.nzHeight)
              : (e.lensHeight = e.options.zoomWindowHeight / e.heightRatio),
            e.nzWidth < e.options.zoomWindowWidth
              ? (e.lensWidth = e.nzWidth)
              : (e.lensWidth = e.options.zoomWindowWidth / e.widthRatio),
            e.zoomLens &&
              e.zoomLens.css({ width: e.lensWidth, height: e.lensHeight }));
      },
      getCurrentImage: function () {
        return this.zoomImage;
      },
      getGalleryList: function () {
        var t = this;
        return (
          (t.gallerylist = []),
          t.options.gallery
            ? f("#" + t.options.gallery + " a").each(function () {
                var e = "";
                f(this).data(t.options.attrImageZoomSrc)
                  ? (e = f(this).data(t.options.attrImageZoomSrc))
                  : f(this).data("image") && (e = f(this).data("image")),
                  e === t.zoomImage
                    ? t.gallerylist.unshift({
                        href: "" + e,
                        title: f(this).find("img").attr("title"),
                      })
                    : t.gallerylist.push({
                        href: "" + e,
                        title: f(this).find("img").attr("title"),
                      });
              })
            : t.gallerylist.push({
                href: "" + t.zoomImage,
                title: f(this).find("img").attr("title"),
              }),
          t.gallerylist
        );
      },
      changeZoomLevel: function (e) {
        var t = this;
        (t.scrollingLock = !0), (t.newvalue = parseFloat(e).toFixed(2));
        var i = t.newvalue,
          n =
            t.largeHeight /
            ((t.options.zoomWindowHeight / t.nzHeight) * t.nzHeight),
          s =
            t.largeWidth /
            ((t.options.zoomWindowWidth / t.nzWidth) * t.nzWidth);
        "inner" !== t.options.zoomType &&
          (n <= i
            ? ((t.heightRatio = t.largeHeight / n / t.nzHeight),
              (t.newvalueheight = n),
              (t.fullheight = !0))
            : ((t.heightRatio = t.largeHeight / i / t.nzHeight),
              (t.newvalueheight = i),
              (t.fullheight = !1)),
          s <= i
            ? ((t.widthRatio = t.largeWidth / s / t.nzWidth),
              (t.newvaluewidth = s),
              (t.fullwidth = !0))
            : ((t.widthRatio = t.largeWidth / i / t.nzWidth),
              (t.newvaluewidth = i),
              (t.fullwidth = !1)),
          "lens" === t.options.zoomType &&
            (n <= i
              ? ((t.fullwidth = !0), (t.newvaluewidth = n))
              : ((t.widthRatio = t.largeWidth / i / t.nzWidth),
                (t.newvaluewidth = i),
                (t.fullwidth = !1)))),
          "inner" === t.options.zoomType &&
            ((n = parseFloat(t.largeHeight / t.nzHeight).toFixed(2)) < i &&
              (i = n),
            (s = parseFloat(t.largeWidth / t.nzWidth).toFixed(2)) < i &&
              (i = s),
            n <= i
              ? ((t.heightRatio = t.largeHeight / i / t.nzHeight),
                (t.newvalueheight = n < i ? n : i),
                (t.fullheight = !0))
              : ((t.heightRatio = t.largeHeight / i / t.nzHeight),
                (t.newvalueheight = n < i ? n : i),
                (t.fullheight = !1)),
            s <= i
              ? ((t.widthRatio = t.largeWidth / i / t.nzWidth),
                (t.newvaluewidth = s < i ? s : i),
                (t.fullwidth = !0))
              : ((t.widthRatio = t.largeWidth / i / t.nzWidth),
                (t.newvaluewidth = i),
                (t.fullwidth = !1)));
        var o = !1;
        "inner" === t.options.zoomType &&
          (t.nzWidth >= t.nzHeight &&
            (t.newvaluewidth <= s
              ? (o = !0)
              : ((o = !1), (t.fullheight = !0), (t.fullwidth = !0))),
          t.nzHeight > t.nzWidth &&
            (t.newvaluewidth <= s
              ? (o = !0)
              : ((o = !1), (t.fullheight = !0), (t.fullwidth = !0)))),
          "inner" !== t.options.zoomType && (o = !0),
          o &&
            ((t.zoomLock = 0),
            (t.changeZoom = !0),
            t.options.zoomWindowHeight / t.heightRatio <= t.nzHeight &&
              ((t.currentZoomLevel = t.newvalueheight),
              "lens" !== t.options.zoomType &&
                "inner" !== t.options.zoomType &&
                ((t.changeBgSize = !0),
                t.zoomLens.css({
                  height: t.options.zoomWindowHeight / t.heightRatio,
                })),
              ("lens" !== t.options.zoomType &&
                "inner" !== t.options.zoomType) ||
                (t.changeBgSize = !0)),
            t.options.zoomWindowWidth / t.widthRatio <= t.nzWidth &&
              ("inner" !== t.options.zoomType &&
                t.newvaluewidth > t.newvalueheight &&
                (t.currentZoomLevel = t.newvaluewidth),
              "lens" !== t.options.zoomType &&
                "inner" !== t.options.zoomType &&
                ((t.changeBgSize = !0),
                t.zoomLens.css({
                  width: t.options.zoomWindowWidth / t.widthRatio,
                })),
              ("lens" !== t.options.zoomType &&
                "inner" !== t.options.zoomType) ||
                (t.changeBgSize = !0)),
            "inner" === t.options.zoomType &&
              ((t.changeBgSize = !0),
              t.nzWidth > t.nzHeight
                ? (t.currentZoomLevel = t.newvaluewidth)
                : t.nzHeight >= t.nzWidth &&
                  (t.currentZoomLevel = t.newvaluewidth))),
          t.setPosition(t.currentLoc);
      },
      closeAll: function () {
        var e = this;
        e.zoomWindow && e.zoomWindow.hide(),
          e.zoomLens && e.zoomLens.hide(),
          e.zoomTint && e.zoomTint.hide();
      },
      updateOffset: function (e) {
        if ("body" !== e.options.zoomContainerAppendTo) {
          e.nzOffset = e.$elem.offset();
          var t = f(e.options.zoomContainerAppendTo).offset();
          (e.nzOffset.top = e.$elem.offset().top - t.top),
            (e.nzOffset.left = e.$elem.offset().left - t.left),
            (e.pageOffsetX = t.left),
            (e.pageOffsetY = t.top);
        } else
          (e.nzOffset = e.$elem.offset()),
            (e.pageOffsetX = 0),
            (e.pageOffsetY = 0);
      },
      changeState: function (e) {
        "enable" === e && (this.options.zoomEnabled = !0),
          "disable" === e && (this.options.zoomEnabled = !1);
      },
      responsiveConfig: function (e) {
        return e.respond && 0 < e.respond.length
          ? f.extend({}, e, this.configByScreenWidth(e))
          : e;
      },
      configByScreenWidth: function (e) {
        var i = f(n).width(),
          t = f.grep(e.respond, function (e) {
            var t = e.range.split("-");
            return i >= t[0] && i <= t[1];
          });
        return 0 < t.length ? t[0] : e;
      },
    };
    (f.fn.ezPlus = function (t) {
      return this.each(function () {
        var e = Object.create(i);
        e.init(t, this), f.data(this, "ezPlus", e);
      });
    }),
      (f.fn.ezPlus.options = {
        container: "ZoomContainer",
        attrImageZoomSrc: "zoom-image",
        borderColour: "#888",
        borderSize: 4,
        constrainSize: !1,
        constrainType: !1,
        containLensZoom: !1,
        cursor: "inherit",
        debug: !1,
        easing: !1,
        easingAmount: 12,
        enabled: !0,
        gallery: !1,
        galleryActiveClass: "zoomGalleryActive",
        gallerySelector: !1,
        galleryItem: "a",
        galleryEvent: "click",
        imageCrossfade: !1,
        lensBorderColour: "#000",
        lensBorderSize: 1,
        lensColour: "white",
        lensFadeIn: !1,
        lensFadeOut: !1,
        lensOpacity: 0.4,
        lensShape: "square",
        lensSize: 200,
        lenszoom: !1,
        loadingIcon: !1,
        mantainZoomAspectRatio: !1,
        maxZoomLevel: !1,
        minZoomLevel: 1.01,
        onComplete: f.noop,
        onDestroy: f.noop,
        onImageClick: f.noop,
        onImageSwap: f.noop,
        onImageSwapComplete: f.noop,
        onShow: f.noop,
        onHide: f.noop,
        onZoomedImageLoaded: f.noop,
        preloading: 1,
        respond: [],
        responsive: !0,
        scrollZoom: !1,
        scrollZoomIncrement: 0.1,
        showLens: !0,
        tint: !1,
        tintColour: "#333",
        tintOpacity: 0.4,
        touchEnabled: !0,
        zoomActivation: "hover",
        zoomContainerAppendTo: "body",
        zoomId: -1,
        zoomLevel: 1,
        zoomTintFadeIn: !1,
        zoomTintFadeOut: !1,
        zoomType: "window",
        zoomWindowAlwaysShow: !1,
        zoomWindowBgColour: "#fff",
        zoomWindowFadeIn: !1,
        zoomWindowFadeOut: !1,
        zoomWindowHeight: 400,
        zoomWindowOffsetX: 0,
        zoomWindowOffsetY: 0,
        zoomWindowPosition: 1,
        zoomWindowWidth: 400,
        zoomEnabled: !0,
        zIndex: 999,
      });
  })(window.jQuery, window, document),
  (function (e) {
    "function" == typeof define && define.amd
      ? define(["jquery"], e)
      : e(jQuery);
  })(function (c) {
    c.ui = c.ui || {};
    (c.ui.version = "1.12.1"),
      (c.ui.keyCode = {
        BACKSPACE: 8,
        COMMA: 188,
        DELETE: 46,
        DOWN: 40,
        END: 35,
        ENTER: 13,
        ESCAPE: 27,
        HOME: 36,
        LEFT: 37,
        PAGE_DOWN: 34,
        PAGE_UP: 33,
        PERIOD: 190,
        RIGHT: 39,
        SPACE: 32,
        TAB: 9,
        UP: 38,
      });
    var s,
      i = 0,
      r = Array.prototype.slice;
    (c.cleanData =
      ((s = c.cleanData),
      function (e) {
        var t, i, n;
        for (n = 0; null != (i = e[n]); n++)
          try {
            (t = c._data(i, "events")) &&
              t.remove &&
              c(i).triggerHandler("remove");
          } catch (e) {}
        s(e);
      })),
      (c.widget = function (e, i, t) {
        var n,
          s,
          o,
          a = {},
          r = e.split(".")[0],
          l = r + "-" + (e = e.split(".")[1]);
        return (
          t || ((t = i), (i = c.Widget)),
          c.isArray(t) && (t = c.extend.apply(null, [{}].concat(t))),
          (c.expr[":"][l.toLowerCase()] = function (e) {
            return !!c.data(e, l);
          }),
          (c[r] = c[r] || {}),
          (n = c[r][e]),
          (s = c[r][e] =
            function (e, t) {
              if (!this._createWidget) return new s(e, t);
              arguments.length && this._createWidget(e, t);
            }),
          c.extend(s, n, {
            version: t.version,
            _proto: c.extend({}, t),
            _childConstructors: [],
          }),
          ((o = new i()).options = c.widget.extend({}, o.options)),
          c.each(t, function (t, n) {
            function s() {
              return i.prototype[t].apply(this, arguments);
            }
            function o(e) {
              return i.prototype[t].apply(this, e);
            }
            c.isFunction(n)
              ? (a[t] = function () {
                  var e,
                    t = this._super,
                    i = this._superApply;
                  return (
                    (this._super = s),
                    (this._superApply = o),
                    (e = n.apply(this, arguments)),
                    (this._super = t),
                    (this._superApply = i),
                    e
                  );
                })
              : (a[t] = n);
          }),
          (s.prototype = c.widget.extend(
            o,
            { widgetEventPrefix: (n && o.widgetEventPrefix) || e },
            a,
            { constructor: s, namespace: r, widgetName: e, widgetFullName: l }
          )),
          n
            ? (c.each(n._childConstructors, function (e, t) {
                var i = t.prototype;
                c.widget(i.namespace + "." + i.widgetName, s, t._proto);
              }),
              delete n._childConstructors)
            : i._childConstructors.push(s),
          c.widget.bridge(e, s),
          s
        );
      }),
      (c.widget.extend = function (e) {
        for (
          var t, i, n = r.call(arguments, 1), s = 0, o = n.length;
          s < o;
          s++
        )
          for (t in n[s])
            (i = n[s][t]),
              n[s].hasOwnProperty(t) &&
                void 0 !== i &&
                (c.isPlainObject(i)
                  ? (e[t] = c.isPlainObject(e[t])
                      ? c.widget.extend({}, e[t], i)
                      : c.widget.extend({}, i))
                  : (e[t] = i));
        return e;
      }),
      (c.widget.bridge = function (o, t) {
        var a = t.prototype.widgetFullName || o;
        c.fn[o] = function (i) {
          var e = "string" == typeof i,
            n = r.call(arguments, 1),
            s = this;
          return (
            e
              ? this.length || "instance" !== i
                ? this.each(function () {
                    var e,
                      t = c.data(this, a);
                    return "instance" === i
                      ? ((s = t), !1)
                      : t
                      ? c.isFunction(t[i]) && "_" !== i.charAt(0)
                        ? (e = t[i].apply(t, n)) !== t && void 0 !== e
                          ? ((s = e && e.jquery ? s.pushStack(e.get()) : e), !1)
                          : void 0
                        : c.error(
                            "no such method '" +
                              i +
                              "' for " +
                              o +
                              " widget instance"
                          )
                      : c.error(
                          "cannot call methods on " +
                            o +
                            " prior to initialization; attempted to call method '" +
                            i +
                            "'"
                        );
                  })
                : (s = void 0)
              : (n.length && (i = c.widget.extend.apply(null, [i].concat(n))),
                this.each(function () {
                  var e = c.data(this, a);
                  e
                    ? (e.option(i || {}), e._init && e._init())
                    : c.data(this, a, new t(i, this));
                })),
            s
          );
        };
      }),
      (c.Widget = function () {}),
      (c.Widget._childConstructors = []),
      (c.Widget.prototype = {
        widgetName: "widget",
        widgetEventPrefix: "",
        defaultElement: "<div>",
        options: { classes: {}, disabled: !1, create: null },
        _createWidget: function (e, t) {
          (t = c(t || this.defaultElement || this)[0]),
            (this.element = c(t)),
            (this.uuid = i++),
            (this.eventNamespace = "." + this.widgetName + this.uuid),
            (this.bindings = c()),
            (this.hoverable = c()),
            (this.focusable = c()),
            (this.classesElementLookup = {}),
            t !== this &&
              (c.data(t, this.widgetFullName, this),
              this._on(!0, this.element, {
                remove: function (e) {
                  e.target === t && this.destroy();
                },
              }),
              (this.document = c(t.style ? t.ownerDocument : t.document || t)),
              (this.window = c(
                this.document[0].defaultView || this.document[0].parentWindow
              ))),
            (this.options = c.widget.extend(
              {},
              this.options,
              this._getCreateOptions(),
              e
            )),
            this._create(),
            this.options.disabled &&
              this._setOptionDisabled(this.options.disabled),
            this._trigger("create", null, this._getCreateEventData()),
            this._init();
        },
        _getCreateOptions: function () {
          return {};
        },
        _getCreateEventData: c.noop,
        _create: c.noop,
        _init: c.noop,
        destroy: function () {
          var i = this;
          this._destroy(),
            c.each(this.classesElementLookup, function (e, t) {
              i._removeClass(t, e);
            }),
            this.element
              .off(this.eventNamespace)
              .removeData(this.widgetFullName),
            this.widget().off(this.eventNamespace).removeAttr("aria-disabled"),
            this.bindings.off(this.eventNamespace);
        },
        _destroy: c.noop,
        widget: function () {
          return this.element;
        },
        option: function (e, t) {
          var i,
            n,
            s,
            o = e;
          if (0 === arguments.length) return c.widget.extend({}, this.options);
          if ("string" == typeof e)
            if (((o = {}), (e = (i = e.split(".")).shift()), i.length)) {
              for (
                n = o[e] = c.widget.extend({}, this.options[e]), s = 0;
                s < i.length - 1;
                s++
              )
                (n[i[s]] = n[i[s]] || {}), (n = n[i[s]]);
              if (((e = i.pop()), 1 === arguments.length))
                return void 0 === n[e] ? null : n[e];
              n[e] = t;
            } else {
              if (1 === arguments.length)
                return void 0 === this.options[e] ? null : this.options[e];
              o[e] = t;
            }
          return this._setOptions(o), this;
        },
        _setOptions: function (e) {
          var t;
          for (t in e) this._setOption(t, e[t]);
          return this;
        },
        _setOption: function (e, t) {
          return (
            "classes" === e && this._setOptionClasses(t),
            (this.options[e] = t),
            "disabled" === e && this._setOptionDisabled(t),
            this
          );
        },
        _setOptionClasses: function (e) {
          var t, i, n;
          for (t in e)
            (n = this.classesElementLookup[t]),
              e[t] !== this.options.classes[t] &&
                n &&
                n.length &&
                ((i = c(n.get())),
                this._removeClass(n, t),
                i.addClass(
                  this._classes({ element: i, keys: t, classes: e, add: !0 })
                ));
        },
        _setOptionDisabled: function (e) {
          this._toggleClass(
            this.widget(),
            this.widgetFullName + "-disabled",
            null,
            !!e
          ),
            e &&
              (this._removeClass(this.hoverable, null, "ui-state-hover"),
              this._removeClass(this.focusable, null, "ui-state-focus"));
        },
        enable: function () {
          return this._setOptions({ disabled: !1 });
        },
        disable: function () {
          return this._setOptions({ disabled: !0 });
        },
        _classes: function (s) {
          var o = [],
            a = this;
          function e(e, t) {
            var i, n;
            for (n = 0; n < e.length; n++)
              (i = a.classesElementLookup[e[n]] || c()),
                (i = s.add
                  ? c(c.unique(i.get().concat(s.element.get())))
                  : c(i.not(s.element).get())),
                (a.classesElementLookup[e[n]] = i),
                o.push(e[n]),
                t && s.classes[e[n]] && o.push(s.classes[e[n]]);
          }
          return (
            (s = c.extend(
              { element: this.element, classes: this.options.classes || {} },
              s
            )),
            this._on(s.element, { remove: "_untrackClassesElement" }),
            s.keys && e(s.keys.match(/\S+/g) || [], !0),
            s.extra && e(s.extra.match(/\S+/g) || []),
            o.join(" ")
          );
        },
        _untrackClassesElement: function (i) {
          var n = this;
          c.each(n.classesElementLookup, function (e, t) {
            -1 !== c.inArray(i.target, t) &&
              (n.classesElementLookup[e] = c(t.not(i.target).get()));
          });
        },
        _removeClass: function (e, t, i) {
          return this._toggleClass(e, t, i, !1);
        },
        _addClass: function (e, t, i) {
          return this._toggleClass(e, t, i, !0);
        },
        _toggleClass: function (e, t, i, n) {
          n = "boolean" == typeof n ? n : i;
          var s = "string" == typeof e || null === e,
            o = {
              extra: s ? t : i,
              keys: s ? e : t,
              element: s ? this.element : e,
              add: n,
            };
          return o.element.toggleClass(this._classes(o), n), this;
        },
        _on: function (a, r, e) {
          var l,
            d = this;
          "boolean" != typeof a && ((e = r), (r = a), (a = !1)),
            e
              ? ((r = l = c(r)), (this.bindings = this.bindings.add(r)))
              : ((e = r), (r = this.element), (l = this.widget())),
            c.each(e, function (e, t) {
              function i() {
                if (
                  a ||
                  (!0 !== d.options.disabled &&
                    !c(this).hasClass("ui-state-disabled"))
                )
                  return ("string" == typeof t ? d[t] : t).apply(d, arguments);
              }
              "string" != typeof t &&
                (i.guid = t.guid = t.guid || i.guid || c.guid++);
              var n = e.match(/^([\w:-]*)\s*(.*)$/),
                s = n[1] + d.eventNamespace,
                o = n[2];
              o ? l.on(s, o, i) : r.on(s, i);
            });
        },
        _off: function (e, t) {
          (t =
            (t || "").split(" ").join(this.eventNamespace + " ") +
            this.eventNamespace),
            e.off(t).off(t),
            (this.bindings = c(this.bindings.not(e).get())),
            (this.focusable = c(this.focusable.not(e).get())),
            (this.hoverable = c(this.hoverable.not(e).get()));
        },
        _delay: function (e, t) {
          var i = this;
          return setTimeout(function () {
            return ("string" == typeof e ? i[e] : e).apply(i, arguments);
          }, t || 0);
        },
        _hoverable: function (e) {
          (this.hoverable = this.hoverable.add(e)),
            this._on(e, {
              mouseenter: function (e) {
                this._addClass(c(e.currentTarget), null, "ui-state-hover");
              },
              mouseleave: function (e) {
                this._removeClass(c(e.currentTarget), null, "ui-state-hover");
              },
            });
        },
        _focusable: function (e) {
          (this.focusable = this.focusable.add(e)),
            this._on(e, {
              focusin: function (e) {
                this._addClass(c(e.currentTarget), null, "ui-state-focus");
              },
              focusout: function (e) {
                this._removeClass(c(e.currentTarget), null, "ui-state-focus");
              },
            });
        },
        _trigger: function (e, t, i) {
          var n,
            s,
            o = this.options[e];
          if (
            ((i = i || {}),
            ((t = c.Event(t)).type = (
              e === this.widgetEventPrefix ? e : this.widgetEventPrefix + e
            ).toLowerCase()),
            (t.target = this.element[0]),
            (s = t.originalEvent))
          )
            for (n in s) n in t || (t[n] = s[n]);
          return (
            this.element.trigger(t, i),
            !(
              (c.isFunction(o) &&
                !1 === o.apply(this.element[0], [t].concat(i))) ||
              t.isDefaultPrevented()
            )
          );
        },
      }),
      c.each({ show: "fadeIn", hide: "fadeOut" }, function (o, a) {
        c.Widget.prototype["_" + o] = function (t, e, i) {
          var n;
          "string" == typeof e && (e = { effect: e });
          var s = e
            ? !0 === e || "number" == typeof e
              ? a
              : e.effect || a
            : o;
          "number" == typeof (e = e || {}) && (e = { duration: e }),
            (n = !c.isEmptyObject(e)),
            (e.complete = i),
            e.delay && t.delay(e.delay),
            n && c.effects && c.effects.effect[s]
              ? t[o](e)
              : s !== o && t[s]
              ? t[s](e.duration, e.easing, i)
              : t.queue(function (e) {
                  c(this)[o](), i && i.call(t[0]), e();
                });
        };
      });
    c.widget,
      (c.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()));
    var o = !1;
    c(document).on("mouseup", function () {
      o = !1;
    });
    c.widget("ui.mouse", {
      version: "1.12.1",
      options: {
        cancel: "input, textarea, button, select, option",
        distance: 1,
        delay: 0,
      },
      _mouseInit: function () {
        var t = this;
        this.element
          .on("mousedown." + this.widgetName, function (e) {
            return t._mouseDown(e);
          })
          .on("click." + this.widgetName, function (e) {
            if (!0 === c.data(e.target, t.widgetName + ".preventClickEvent"))
              return (
                c.removeData(e.target, t.widgetName + ".preventClickEvent"),
                e.stopImmediatePropagation(),
                !1
              );
          }),
          (this.started = !1);
      },
      _mouseDestroy: function () {
        this.element.off("." + this.widgetName),
          this._mouseMoveDelegate &&
            this.document
              .off("mousemove." + this.widgetName, this._mouseMoveDelegate)
              .off("mouseup." + this.widgetName, this._mouseUpDelegate);
      },
      _mouseDown: function (e) {
        if (!o) {
          (this._mouseMoved = !1),
            this._mouseStarted && this._mouseUp(e),
            (this._mouseDownEvent = e);
          var t = this,
            i = 1 === e.which,
            n =
              !("string" != typeof this.options.cancel || !e.target.nodeName) &&
              c(e.target).closest(this.options.cancel).length;
          return (
            !(i && !n && this._mouseCapture(e)) ||
            ((this.mouseDelayMet = !this.options.delay),
            this.mouseDelayMet ||
              (this._mouseDelayTimer = setTimeout(function () {
                t.mouseDelayMet = !0;
              }, this.options.delay)),
            this._mouseDistanceMet(e) &&
            this._mouseDelayMet(e) &&
            ((this._mouseStarted = !1 !== this._mouseStart(e)),
            !this._mouseStarted)
              ? (e.preventDefault(), !0)
              : (!0 ===
                  c.data(e.target, this.widgetName + ".preventClickEvent") &&
                  c.removeData(
                    e.target,
                    this.widgetName + ".preventClickEvent"
                  ),
                (this._mouseMoveDelegate = function (e) {
                  return t._mouseMove(e);
                }),
                (this._mouseUpDelegate = function (e) {
                  return t._mouseUp(e);
                }),
                this.document
                  .on("mousemove." + this.widgetName, this._mouseMoveDelegate)
                  .on("mouseup." + this.widgetName, this._mouseUpDelegate),
                e.preventDefault(),
                (o = !0)))
          );
        }
      },
      _mouseMove: function (e) {
        if (this._mouseMoved) {
          if (
            c.ui.ie &&
            (!document.documentMode || document.documentMode < 9) &&
            !e.button
          )
            return this._mouseUp(e);
          if (!e.which)
            if (
              e.originalEvent.altKey ||
              e.originalEvent.ctrlKey ||
              e.originalEvent.metaKey ||
              e.originalEvent.shiftKey
            )
              this.ignoreMissingWhich = !0;
            else if (!this.ignoreMissingWhich) return this._mouseUp(e);
        }
        return (
          (e.which || e.button) && (this._mouseMoved = !0),
          this._mouseStarted
            ? (this._mouseDrag(e), e.preventDefault())
            : (this._mouseDistanceMet(e) &&
                this._mouseDelayMet(e) &&
                ((this._mouseStarted =
                  !1 !== this._mouseStart(this._mouseDownEvent, e)),
                this._mouseStarted ? this._mouseDrag(e) : this._mouseUp(e)),
              !this._mouseStarted)
        );
      },
      _mouseUp: function (e) {
        this.document
          .off("mousemove." + this.widgetName, this._mouseMoveDelegate)
          .off("mouseup." + this.widgetName, this._mouseUpDelegate),
          this._mouseStarted &&
            ((this._mouseStarted = !1),
            e.target === this._mouseDownEvent.target &&
              c.data(e.target, this.widgetName + ".preventClickEvent", !0),
            this._mouseStop(e)),
          this._mouseDelayTimer &&
            (clearTimeout(this._mouseDelayTimer), delete this._mouseDelayTimer),
          (this.ignoreMissingWhich = !1),
          (o = !1),
          e.preventDefault();
      },
      _mouseDistanceMet: function (e) {
        return (
          Math.max(
            Math.abs(this._mouseDownEvent.pageX - e.pageX),
            Math.abs(this._mouseDownEvent.pageY - e.pageY)
          ) >= this.options.distance
        );
      },
      _mouseDelayMet: function () {
        return this.mouseDelayMet;
      },
      _mouseStart: function () {},
      _mouseDrag: function () {},
      _mouseStop: function () {},
      _mouseCapture: function () {
        return !0;
      },
    }),
      c.widget("ui.slider", c.ui.mouse, {
        version: "1.12.1",
        widgetEventPrefix: "slide",
        options: {
          animate: !1,
          classes: {
            "ui-slider": "ui-corner-all",
            "ui-slider-handle": "ui-corner-all",
            "ui-slider-range": "ui-corner-all ui-widget-header",
          },
          distance: 0,
          max: 100,
          min: 0,
          orientation: "horizontal",
          range: !1,
          step: 1,
          value: 0,
          values: null,
          change: null,
          slide: null,
          start: null,
          stop: null,
        },
        numPages: 5,
        _create: function () {
          (this._keySliding = !1),
            (this._mouseSliding = !1),
            (this._animateOff = !0),
            (this._handleIndex = null),
            this._detectOrientation(),
            this._mouseInit(),
            this._calculateNewMax(),
            this._addClass(
              "ui-slider ui-slider-" + this.orientation,
              "ui-widget ui-widget-content"
            ),
            this._refresh(),
            (this._animateOff = !1);
        },
        _refresh: function () {
          this._createRange(),
            this._createHandles(),
            this._setupEvents(),
            this._refreshValue();
        },
        _createHandles: function () {
          var e,
            t,
            i = this.options,
            n = this.element.find(".ui-slider-handle"),
            s = [];
          for (
            t = (i.values && i.values.length) || 1,
              n.length > t && (n.slice(t).remove(), (n = n.slice(0, t))),
              e = n.length;
            e < t;
            e++
          )
            s.push("<span tabindex='0'></span>");
          (this.handles = n.add(c(s.join("")).appendTo(this.element))),
            this._addClass(
              this.handles,
              "ui-slider-handle",
              "ui-state-default"
            ),
            (this.handle = this.handles.eq(0)),
            this.handles.each(function (e) {
              c(this).data("ui-slider-handle-index", e).attr("tabIndex", 0);
            });
        },
        _createRange: function () {
          var e = this.options;
          e.range
            ? (!0 === e.range &&
                (e.values
                  ? e.values.length && 2 !== e.values.length
                    ? (e.values = [e.values[0], e.values[0]])
                    : c.isArray(e.values) && (e.values = e.values.slice(0))
                  : (e.values = [this._valueMin(), this._valueMin()])),
              this.range && this.range.length
                ? (this._removeClass(
                    this.range,
                    "ui-slider-range-min ui-slider-range-max"
                  ),
                  this.range.css({ left: "", bottom: "" }))
                : ((this.range = c("<div>").appendTo(this.element)),
                  this._addClass(this.range, "ui-slider-range")),
              ("min" !== e.range && "max" !== e.range) ||
                this._addClass(this.range, "ui-slider-range-" + e.range))
            : (this.range && this.range.remove(), (this.range = null));
        },
        _setupEvents: function () {
          this._off(this.handles),
            this._on(this.handles, this._handleEvents),
            this._hoverable(this.handles),
            this._focusable(this.handles);
        },
        _destroy: function () {
          this.handles.remove(),
            this.range && this.range.remove(),
            this._mouseDestroy();
        },
        _mouseCapture: function (e) {
          var t,
            i,
            n,
            s,
            o,
            a,
            r,
            l = this,
            d = this.options;
          return (
            !d.disabled &&
            ((this.elementSize = {
              width: this.element.outerWidth(),
              height: this.element.outerHeight(),
            }),
            (this.elementOffset = this.element.offset()),
            (t = { x: e.pageX, y: e.pageY }),
            (i = this._normValueFromMouse(t)),
            (n = this._valueMax() - this._valueMin() + 1),
            this.handles.each(function (e) {
              var t = Math.abs(i - l.values(e));
              (t < n ||
                (n === t &&
                  (e === l._lastChangedValue || l.values(e) === d.min))) &&
                ((n = t), (s = c(this)), (o = e));
            }),
            !1 !== this._start(e, o) &&
              ((this._mouseSliding = !0),
              (this._handleIndex = o),
              this._addClass(s, null, "ui-state-active"),
              s.trigger("focus"),
              (a = s.offset()),
              (r = !c(e.target).parents().addBack().is(".ui-slider-handle")),
              (this._clickOffset = r
                ? { left: 0, top: 0 }
                : {
                    left: e.pageX - a.left - s.width() / 2,
                    top:
                      e.pageY -
                      a.top -
                      s.height() / 2 -
                      (parseInt(s.css("borderTopWidth"), 10) || 0) -
                      (parseInt(s.css("borderBottomWidth"), 10) || 0) +
                      (parseInt(s.css("marginTop"), 10) || 0),
                  }),
              this.handles.hasClass("ui-state-hover") || this._slide(e, o, i),
              (this._animateOff = !0)))
          );
        },
        _mouseStart: function () {
          return !0;
        },
        _mouseDrag: function (e) {
          var t = { x: e.pageX, y: e.pageY },
            i = this._normValueFromMouse(t);
          return this._slide(e, this._handleIndex, i), !1;
        },
        _mouseStop: function (e) {
          return (
            this._removeClass(this.handles, null, "ui-state-active"),
            (this._mouseSliding = !1),
            this._stop(e, this._handleIndex),
            this._change(e, this._handleIndex),
            (this._handleIndex = null),
            (this._clickOffset = null),
            (this._animateOff = !1)
          );
        },
        _detectOrientation: function () {
          this.orientation =
            "vertical" === this.options.orientation ? "vertical" : "horizontal";
        },
        _normValueFromMouse: function (e) {
          var t, i, n, s;
          return (
            1 <
              (i =
                ("horizontal" === this.orientation
                  ? ((t = this.elementSize.width),
                    e.x -
                      this.elementOffset.left -
                      (this._clickOffset ? this._clickOffset.left : 0))
                  : ((t = this.elementSize.height),
                    e.y -
                      this.elementOffset.top -
                      (this._clickOffset ? this._clickOffset.top : 0))) / t) &&
              (i = 1),
            i < 0 && (i = 0),
            "vertical" === this.orientation && (i = 1 - i),
            (n = this._valueMax() - this._valueMin()),
            (s = this._valueMin() + i * n),
            this._trimAlignValue(s)
          );
        },
        _uiHash: function (e, t, i) {
          var n = {
            handle: this.handles[e],
            handleIndex: e,
            value: void 0 !== t ? t : this.value(),
          };
          return (
            this._hasMultipleValues() &&
              ((n.value = void 0 !== t ? t : this.values(e)),
              (n.values = i || this.values())),
            n
          );
        },
        _hasMultipleValues: function () {
          return this.options.values && this.options.values.length;
        },
        _start: function (e, t) {
          return this._trigger("start", e, this._uiHash(t));
        },
        _slide: function (e, t, i) {
          var n,
            s = this.value(),
            o = this.values();
          this._hasMultipleValues() &&
            ((n = this.values(t ? 0 : 1)),
            (s = this.values(t)),
            2 === this.options.values.length &&
              !0 === this.options.range &&
              (i = 0 === t ? Math.min(n, i) : Math.max(n, i)),
            (o[t] = i)),
            i !== s &&
              !1 !== this._trigger("slide", e, this._uiHash(t, i, o)) &&
              (this._hasMultipleValues() ? this.values(t, i) : this.value(i));
        },
        _stop: function (e, t) {
          this._trigger("stop", e, this._uiHash(t));
        },
        _change: function (e, t) {
          this._keySliding ||
            this._mouseSliding ||
            ((this._lastChangedValue = t),
            this._trigger("change", e, this._uiHash(t)));
        },
        value: function (e) {
          return arguments.length
            ? ((this.options.value = this._trimAlignValue(e)),
              this._refreshValue(),
              void this._change(null, 0))
            : this._value();
        },
        values: function (e, t) {
          var i, n, s;
          if (1 < arguments.length)
            return (
              (this.options.values[e] = this._trimAlignValue(t)),
              this._refreshValue(),
              void this._change(null, e)
            );
          if (!arguments.length) return this._values();
          if (!c.isArray(e))
            return this._hasMultipleValues() ? this._values(e) : this.value();
          for (i = this.options.values, n = e, s = 0; s < i.length; s += 1)
            (i[s] = this._trimAlignValue(n[s])), this._change(null, s);
          this._refreshValue();
        },
        _setOption: function (e, t) {
          var i,
            n = 0;
          switch (
            ("range" === e &&
              !0 === this.options.range &&
              ("min" === t
                ? ((this.options.value = this._values(0)),
                  (this.options.values = null))
                : "max" === t &&
                  ((this.options.value = this._values(
                    this.options.values.length - 1
                  )),
                  (this.options.values = null))),
            c.isArray(this.options.values) && (n = this.options.values.length),
            this._super(e, t),
            e)
          ) {
            case "orientation":
              this._detectOrientation(),
                this._removeClass(
                  "ui-slider-horizontal ui-slider-vertical"
                )._addClass("ui-slider-" + this.orientation),
                this._refreshValue(),
                this.options.range && this._refreshRange(t),
                this.handles.css("horizontal" === t ? "bottom" : "left", "");
              break;
            case "value":
              (this._animateOff = !0),
                this._refreshValue(),
                this._change(null, 0),
                (this._animateOff = !1);
              break;
            case "values":
              for (
                this._animateOff = !0, this._refreshValue(), i = n - 1;
                0 <= i;
                i--
              )
                this._change(null, i);
              this._animateOff = !1;
              break;
            case "step":
            case "min":
            case "max":
              (this._animateOff = !0),
                this._calculateNewMax(),
                this._refreshValue(),
                (this._animateOff = !1);
              break;
            case "range":
              (this._animateOff = !0), this._refresh(), (this._animateOff = !1);
          }
        },
        _setOptionDisabled: function (e) {
          this._super(e), this._toggleClass(null, "ui-state-disabled", !!e);
        },
        _value: function () {
          var e = this.options.value;
          return (e = this._trimAlignValue(e));
        },
        _values: function (e) {
          var t, i, n;
          if (arguments.length)
            return (t = this.options.values[e]), (t = this._trimAlignValue(t));
          if (this._hasMultipleValues()) {
            for (i = this.options.values.slice(), n = 0; n < i.length; n += 1)
              i[n] = this._trimAlignValue(i[n]);
            return i;
          }
          return [];
        },
        _trimAlignValue: function (e) {
          if (e <= this._valueMin()) return this._valueMin();
          if (e >= this._valueMax()) return this._valueMax();
          var t = 0 < this.options.step ? this.options.step : 1,
            i = (e - this._valueMin()) % t,
            n = e - i;
          return (
            2 * Math.abs(i) >= t && (n += 0 < i ? t : -t),
            parseFloat(n.toFixed(5))
          );
        },
        _calculateNewMax: function () {
          var e = this.options.max,
            t = this._valueMin(),
            i = this.options.step;
          (e = Math.round((e - t) / i) * i + t) > this.options.max && (e -= i),
            (this.max = parseFloat(e.toFixed(this._precision())));
        },
        _precision: function () {
          var e = this._precisionOf(this.options.step);
          return (
            null !== this.options.min &&
              (e = Math.max(e, this._precisionOf(this.options.min))),
            e
          );
        },
        _precisionOf: function (e) {
          var t = e.toString(),
            i = t.indexOf(".");
          return -1 === i ? 0 : t.length - i - 1;
        },
        _valueMin: function () {
          return this.options.min;
        },
        _valueMax: function () {
          return this.max;
        },
        _refreshRange: function (e) {
          "vertical" === e && this.range.css({ width: "", left: "" }),
            "horizontal" === e && this.range.css({ height: "", bottom: "" });
        },
        _refreshValue: function () {
          var t,
            i,
            e,
            n,
            s,
            o = this.options.range,
            a = this.options,
            r = this,
            l = !this._animateOff && a.animate,
            d = {};
          this._hasMultipleValues()
            ? this.handles.each(function (e) {
                (i =
                  ((r.values(e) - r._valueMin()) /
                    (r._valueMax() - r._valueMin())) *
                  100),
                  (d["horizontal" === r.orientation ? "left" : "bottom"] =
                    i + "%"),
                  c(this).stop(1, 1)[l ? "animate" : "css"](d, a.animate),
                  !0 === r.options.range &&
                    ("horizontal" === r.orientation
                      ? (0 === e &&
                          r.range
                            .stop(1, 1)
                            [l ? "animate" : "css"](
                              { left: i + "%" },
                              a.animate
                            ),
                        1 === e &&
                          r.range[l ? "animate" : "css"](
                            { width: i - t + "%" },
                            { queue: !1, duration: a.animate }
                          ))
                      : (0 === e &&
                          r.range
                            .stop(1, 1)
                            [l ? "animate" : "css"](
                              { bottom: i + "%" },
                              a.animate
                            ),
                        1 === e &&
                          r.range[l ? "animate" : "css"](
                            { height: i - t + "%" },
                            { queue: !1, duration: a.animate }
                          ))),
                  (t = i);
              })
            : ((e = this.value()),
              (n = this._valueMin()),
              (s = this._valueMax()),
              (i = s !== n ? ((e - n) / (s - n)) * 100 : 0),
              (d["horizontal" === this.orientation ? "left" : "bottom"] =
                i + "%"),
              this.handle.stop(1, 1)[l ? "animate" : "css"](d, a.animate),
              "min" === o &&
                "horizontal" === this.orientation &&
                this.range
                  .stop(1, 1)
                  [l ? "animate" : "css"]({ width: i + "%" }, a.animate),
              "max" === o &&
                "horizontal" === this.orientation &&
                this.range
                  .stop(1, 1)
                  [l ? "animate" : "css"]({ width: 100 - i + "%" }, a.animate),
              "min" === o &&
                "vertical" === this.orientation &&
                this.range
                  .stop(1, 1)
                  [l ? "animate" : "css"]({ height: i + "%" }, a.animate),
              "max" === o &&
                "vertical" === this.orientation &&
                this.range
                  .stop(1, 1)
                  [l ? "animate" : "css"](
                    { height: 100 - i + "%" },
                    a.animate
                  ));
        },
        _handleEvents: {
          keydown: function (e) {
            var t,
              i,
              n,
              s = c(e.target).data("ui-slider-handle-index");
            switch (e.keyCode) {
              case c.ui.keyCode.HOME:
              case c.ui.keyCode.END:
              case c.ui.keyCode.PAGE_UP:
              case c.ui.keyCode.PAGE_DOWN:
              case c.ui.keyCode.UP:
              case c.ui.keyCode.RIGHT:
              case c.ui.keyCode.DOWN:
              case c.ui.keyCode.LEFT:
                if (
                  (e.preventDefault(),
                  !this._keySliding &&
                    ((this._keySliding = !0),
                    this._addClass(c(e.target), null, "ui-state-active"),
                    !1 === this._start(e, s)))
                )
                  return;
            }
            switch (
              ((n = this.options.step),
              (t = i =
                this._hasMultipleValues() ? this.values(s) : this.value()),
              e.keyCode)
            ) {
              case c.ui.keyCode.HOME:
                i = this._valueMin();
                break;
              case c.ui.keyCode.END:
                i = this._valueMax();
                break;
              case c.ui.keyCode.PAGE_UP:
                i = this._trimAlignValue(
                  t + (this._valueMax() - this._valueMin()) / this.numPages
                );
                break;
              case c.ui.keyCode.PAGE_DOWN:
                i = this._trimAlignValue(
                  t - (this._valueMax() - this._valueMin()) / this.numPages
                );
                break;
              case c.ui.keyCode.UP:
              case c.ui.keyCode.RIGHT:
                if (t === this._valueMax()) return;
                i = this._trimAlignValue(t + n);
                break;
              case c.ui.keyCode.DOWN:
              case c.ui.keyCode.LEFT:
                if (t === this._valueMin()) return;
                i = this._trimAlignValue(t - n);
            }
            this._slide(e, s, i);
          },
          keyup: function (e) {
            var t = c(e.target).data("ui-slider-handle-index");
            this._keySliding &&
              ((this._keySliding = !1),
              this._stop(e, t),
              this._change(e, t),
              this._removeClass(c(e.target), null, "ui-state-active"));
          },
        },
      });
  }),
  (function (o) {
    o.fn.niceSelect = function (e) {
      if ("string" == typeof e)
        return (
          "update" == e
            ? this.each(function () {
                var e = o(this),
                  t = o(this).next(".nice-select"),
                  i = t.hasClass("open");
                t.length && (t.remove(), n(e), i && e.next().trigger("click"));
              })
            : "destroy" == e
            ? (this.each(function () {
                var e = o(this),
                  t = o(this).next(".nice-select");
                t.length && (t.remove(), e.css("display", ""));
              }),
              0 == o(".nice-select").length && o(document).off(".nice_select"))
            : console.log('Method "' + e + '" does not exist.'),
          this
        );
      function n(e) {
        e.after(
          o("<div></div>")
            .addClass("nice-select")
            .addClass(e.attr("class") || "")
            .addClass(e.attr("disabled") ? "disabled" : "")
            .attr("tabindex", e.attr("disabled") ? null : "0")
            .html('<span class="current"></span><ul class="list"></ul>')
        );
        var n = e.next(),
          t = e.find("option"),
          i = e.find("option:selected");
        n.find(".current").html(i.data("display") || i.text()),
          t.each(function (e) {
            var t = o(this),
              i = t.data("display");
            n.find("ul").append(
              o("<li></li>")
                .attr("data-value", t.val())
                .attr("data-display", i || null)
                .addClass(
                  "option" +
                    (t.is(":selected") ? " selected" : "") +
                    (t.is(":disabled") ? " disabled" : "")
                )
                .html(t.text())
            );
          });
      }
      this.hide(),
        this.each(function () {
          var e = o(this);
          e.next().hasClass("nice-select") || n(e);
        }),
        o(document).off(".nice_select"),
        o(document).on("click.nice_select", ".nice-select", function (e) {
          var t = o(this);
          o(".nice-select").not(t).removeClass("open"),
            t.toggleClass("open"),
            t.hasClass("open")
              ? (t.find(".option"),
                t.find(".focus").removeClass("focus"),
                t.find(".selected").addClass("focus"))
              : t.focus();
        }),
        o(document).on("click.nice_select", function (e) {
          0 === o(e.target).closest(".nice-select").length &&
            o(".nice-select").removeClass("open").find(".option");
        }),
        o(document).on(
          "click.nice_select",
          ".nice-select .option:not(.disabled)",
          function (e) {
            var t = o(this),
              i = t.closest(".nice-select");
            i.find(".selected").removeClass("selected"), t.addClass("selected");
            var n = t.data("display") || t.text();
            i.find(".current").text(n),
              i.prev("select").val(t.data("value")).trigger("change");
          }
        ),
        o(document).on("keydown.nice_select", ".nice-select", function (e) {
          var t = o(this),
            i = o(t.find(".focus") || t.find(".list .option.selected"));
          if (32 == e.keyCode || 13 == e.keyCode)
            return (
              t.hasClass("open") ? i.trigger("click") : t.trigger("click"), !1
            );
          if (40 == e.keyCode) {
            if (t.hasClass("open")) {
              var n = i.nextAll(".option:not(.disabled)").first();
              0 < n.length &&
                (t.find(".focus").removeClass("focus"), n.addClass("focus"));
            } else t.trigger("click");
            return !1;
          }
          if (38 == e.keyCode) {
            if (t.hasClass("open")) {
              var s = i.prevAll(".option:not(.disabled)").first();
              0 < s.length &&
                (t.find(".focus").removeClass("focus"), s.addClass("focus"));
            } else t.trigger("click");
            return !1;
          }
          if (27 == e.keyCode) t.hasClass("open") && t.trigger("click");
          else if (9 == e.keyCode && t.hasClass("open")) return !1;
        });
      var t = document.createElement("a").style;
      return (
        (t.cssText = "pointer-events:auto"),
        "auto" !== t.pointerEvents && o("html").addClass("no-csspointerevents"),
        this
      );
    };
  })(jQuery),
  (function (l) {
    "use strict";
    function e(r) {
      return this.each(function () {
        var e,
          n,
          t = l(this),
          i = t.data(),
          s = [t],
          o = this.tagName,
          a = 0;
        (e = l.extend(
          { content: "body", headings: "h1,h2,h3" },
          { content: i.toc || void 0, headings: i.tocHeadings || void 0 },
          r
        )),
          (n = e.headings.split(",")),
          l(e.content)
            .find(e.headings)
            .attr("id", function (e, t) {
              return (
                t ||
                (function (e) {
                  0 === e.length && (e = "?");
                  for (
                    var t = e.replace(/\s+/g, "_"), i = "", n = 1;
                    null !== document.getElementById(t + i);

                  )
                    i = "_" + n++;
                  return t + i;
                })(l(this).text())
              );
            })
            .each(function () {
              var i = l(this),
                e = l.map(n, function (e, t) {
                  return i.is(e) ? t : void 0;
                })[0];
              if (a < e) {
                var t = s[0].children("li:last")[0];
                t && s.unshift(l("<" + o + "/>").appendTo(t));
              } else s.splice(0, Math.min(a - e, Math.max(s.length - 1, 0)));
              l("<li/>")
                .appendTo(s[0])
                .append(
                  l("<a/>")
                    .text(i.text())
                    .attr("href", "#" + i.attr("id"))
                ),
                (a = e);
            });
      });
    }
    var t = l.fn.toc;
    (l.fn.toc = e),
      (l.fn.toc.noConflict = function () {
        return (l.fn.toc = t), this;
      }),
      l(function () {
        e.call(l("[data-toc]"));
      });
  })(window.jQuery);
