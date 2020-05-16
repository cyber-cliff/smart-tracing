/*!
 * Tabler v1.0.0-alpha.4 (https://tabler.io)
 * Copyright 2018-2020 codecalm
 * Licensed under MIT (https://github.com/tabler/tabler/blob/master/LICENSE)
 */ 'use strict';
var __assign =
    (window && window.__assign) ||
    function () {
      return (__assign =
        Object.assign ||
        function (e) {
          for (var t, r = 1, o = arguments.length; r < o; r++)
            for (var s in (t = arguments[r]))
              Object.prototype.hasOwnProperty.call(t, s) && (e[s] = t[s]);
          return e;
        }).apply(this, arguments);
    },
  CountUp = (function () {
    var p = Math.abs;
    function e(e, t, r) {
      var n = Math.pow,
        d = this;
      (this.target = e),
        (this.endVal = t),
        (this.options = r),
        (this.version = '2.0.4'),
        (this.defaults = {
          startVal: 0,
          decimalPlaces: 0,
          duration: 2,
          useEasing: !0,
          useGrouping: !0,
          smartEasingThreshold: 999,
          smartEasingAmount: 333,
          separator: ',',
          decimal: '.',
          prefix: '',
          suffix: '',
        }),
        (this.finalEndVal = null),
        (this.useEasing = !0),
        (this.countDown = !1),
        (this.error = ''),
        (this.startVal = 0),
        (this.paused = !0),
        (this.count = function (e) {
          d.startTime || (d.startTime = e);
          var t = e - d.startTime;
          (d.remaining = d.duration - t),
            (d.frameVal = d.useEasing
              ? d.countDown
                ? d.startVal -
                  d.easingFn(t, 0, d.startVal - d.endVal, d.duration)
                : d.easingFn(t, d.startVal, d.endVal - d.startVal, d.duration)
              : d.countDown
              ? d.startVal - (d.startVal - d.endVal) * (t / d.duration)
              : d.startVal + (d.endVal - d.startVal) * (t / d.duration)),
            (d.frameVal = d.countDown
              ? d.frameVal < d.endVal
                ? d.endVal
                : d.frameVal
              : d.frameVal > d.endVal
              ? d.endVal
              : d.frameVal),
            (d.frameVal =
              Math.round(d.frameVal * d.decimalMult) / d.decimalMult),
            d.printValue(d.frameVal),
            t < d.duration
              ? (d.rAF = requestAnimationFrame(d.count))
              : null === d.finalEndVal
              ? d.callback && d.callback()
              : d.update(d.finalEndVal);
        }),
        (this.formatNumber = function (s) {
          var t,
            u,
            m,
            c,
            g,
            f = 0 > s ? '-' : '';
          if (
            ((t = p(s).toFixed(d.options.decimalPlaces)),
            (m = (u = (t += '').split('.'))[0]),
            (c = 1 < u.length ? d.options.decimal + u[1] : ''),
            d.options.useGrouping)
          ) {
            g = '';
            for (var o = 0, b = m.length; o < b; ++o)
              0 != o && 0 == o % 3 && (g = d.options.separator + g),
                (g = m[b - o - 1] + g);
            m = g;
          }
          return (
            d.options.numerals &&
              d.options.numerals.length &&
              ((m = m.replace(/[0-9]/g, function (e) {
                return d.options.numerals[+e];
              })),
              (c = c.replace(/[0-9]/g, function (e) {
                return d.options.numerals[+e];
              }))),
            f + d.options.prefix + m + c + d.options.suffix
          );
        }),
        (this.easeOutExpo = function (e, t, r, a) {
          return (1024 * (r * (1 - n(2, (-10 * e) / a)))) / 1023 + t;
        }),
        (this.options = __assign({}, this.defaults, r)),
        (this.formattingFn = this.options.formattingFn
          ? this.options.formattingFn
          : this.formatNumber),
        (this.easingFn = this.options.easingFn
          ? this.options.easingFn
          : this.easeOutExpo),
        (this.startVal = this.validateValue(this.options.startVal)),
        (this.frameVal = this.startVal),
        (this.endVal = this.validateValue(t)),
        (this.options.decimalPlaces = Math.max(this.options.decimalPlaces)),
        (this.decimalMult = n(10, this.options.decimalPlaces)),
        this.resetDuration(),
        (this.options.separator = this.options.separator + ''),
        (this.useEasing = this.options.useEasing),
        '' === this.options.separator && (this.options.useGrouping = !1),
        (this.el = 'string' == typeof e ? document.getElementById(e) : e),
        this.el
          ? this.printValue(this.startVal)
          : (this.error = '[CountUp] target is null or undefined');
    }
    return (
      (e.prototype.determineDirectionAndSmartEasing = function () {
        var e = this.finalEndVal ? this.finalEndVal : this.endVal;
        this.countDown = this.startVal > e;
        var t = e - this.startVal;
        if (p(t) > this.options.smartEasingThreshold) {
          this.finalEndVal = e;
          var s = this.countDown ? 1 : -1;
          (this.endVal = e + s * this.options.smartEasingAmount),
            (this.duration /= 2);
        } else (this.endVal = e), (this.finalEndVal = null);
        this.useEasing = !this.finalEndVal && this.options.useEasing;
      }),
      (e.prototype.start = function (e) {
        this.error ||
          ((this.callback = e),
          0 < this.duration
            ? (this.determineDirectionAndSmartEasing(),
              (this.paused = !1),
              (this.rAF = requestAnimationFrame(this.count)))
            : this.printValue(this.endVal));
      }),
      (e.prototype.pauseResume = function () {
        this.paused
          ? ((this.startTime = null),
            (this.duration = this.remaining),
            (this.startVal = this.frameVal),
            this.determineDirectionAndSmartEasing(),
            (this.rAF = requestAnimationFrame(this.count)))
          : cancelAnimationFrame(this.rAF),
          (this.paused = !this.paused);
      }),
      (e.prototype.reset = function () {
        cancelAnimationFrame(this.rAF),
          (this.paused = !0),
          this.resetDuration(),
          (this.startVal = this.validateValue(this.options.startVal)),
          (this.frameVal = this.startVal),
          this.printValue(this.startVal);
      }),
      (e.prototype.update = function (e) {
        cancelAnimationFrame(this.rAF),
          (this.startTime = null),
          (this.endVal = this.validateValue(e)),
          this.endVal !== this.frameVal &&
            ((this.startVal = this.frameVal),
            this.finalEndVal || this.resetDuration(),
            this.determineDirectionAndSmartEasing(),
            (this.rAF = requestAnimationFrame(this.count)));
      }),
      (e.prototype.printValue = function (e) {
        var t = this.formattingFn(e);
        'INPUT' === this.el.tagName
          ? (this.el.value = t)
          : 'text' === this.el.tagName || 'tspan' === this.el.tagName
          ? (this.el.textContent = t)
          : (this.el.innerHTML = t);
      }),
      (e.prototype.ensureNumber = function (e) {
        return 'number' == typeof e && !isNaN(e);
      }),
      (e.prototype.validateValue = function (e) {
        var t = +e;
        return this.ensureNumber(t)
          ? t
          : ((this.error = '[CountUp] invalid start or end value: ' + e), null);
      }),
      (e.prototype.resetDuration = function () {
        (this.startTime = null),
          (this.duration = 1e3 * +this.options.duration),
          (this.remaining = this.duration);
      }),
      e
    );
  })();
function createCommonjsModule(e, t) {
  return (t = { exports: {} }), e(t, t.exports), t.exports;
}
var nouislider = createCommonjsModule(function (e) {
  var t = Math.max,
    a = Math.abs,
    s = Math.round;
  (function (t) {
    e.exports = t();
  })(function () {
    var se = Math.min;
    function e(e) {
      return (
        'object' == typeof e &&
        'function' == typeof e.to &&
        'function' == typeof e.from
      );
    }
    function r(e) {
      e.parentElement.removeChild(e);
    }
    function n(e) {
      return null !== e && e !== void 0;
    }
    function i(t) {
      t.preventDefault();
    }
    function o(e) {
      return e.filter(function (e) {
        return !this[e] && (this[e] = !0);
      }, {});
    }
    function l(e, t) {
      return s(e / t) * t;
    }
    function p(e, t) {
      var a = e.getBoundingClientRect(),
        s = e.ownerDocument,
        r = s.documentElement,
        n = S(s);
      return (
        /webkit.*Chrome.*Mobile/i.test(navigator.userAgent) && (n.x = 0),
        t ? a.top + n.y - r.clientTop : a.left + n.x - r.clientLeft
      );
    }
    function d(e) {
      return 'number' == typeof e && !isNaN(e) && isFinite(e);
    }
    function u(e, t, a) {
      0 < a &&
        (h(e, t),
        setTimeout(function () {
          f(e, t);
        }, a));
    }
    function m(e) {
      return t(se(e, 100), 0);
    }
    function c(e) {
      return Array.isArray(e) ? e : [e];
    }
    function g(e) {
      e = e + '';
      var t = e.split('.');
      return 1 < t.length ? t[1].length : 0;
    }
    function h(e, t) {
      e.classList ? e.classList.add(t) : (e.className += ' ' + t);
    }
    function f(e, t) {
      e.classList
        ? e.classList.remove(t)
        : (e.className = e.className.replace(
            new RegExp('(^|\\b)' + t.split(' ').join('|') + '(\\b|$)', 'gi'),
            ' ',
          ));
    }
    function b(e, t) {
      return e.classList
        ? e.classList.contains(t)
        : new RegExp('\\b' + t + '\\b').test(e.className);
    }
    function S(e) {
      var t = window.pageXOffset !== void 0,
        a = 'CSS1Compat' === (e.compatMode || ''),
        s = t
          ? window.pageXOffset
          : a
          ? e.documentElement.scrollLeft
          : e.body.scrollLeft,
        r = t
          ? window.pageYOffset
          : a
          ? e.documentElement.scrollTop
          : e.body.scrollTop;
      return { x: s, y: r };
    }
    function v() {
      return window.navigator.pointerEnabled
        ? { start: 'pointerdown', move: 'pointermove', end: 'pointerup' }
        : window.navigator.msPointerEnabled
        ? { start: 'MSPointerDown', move: 'MSPointerMove', end: 'MSPointerUp' }
        : {
            start: 'mousedown touchstart',
            move: 'mousemove touchmove',
            end: 'mouseup touchend',
          };
    }
    function V() {
      var e = !1;
      try {
        var t = Object.defineProperty({}, 'passive', {
          get: function () {
            e = !0;
          },
        });
        window.addEventListener('test', null, t);
      } catch (t) {}
      return e;
    }
    function y() {
      return window.CSS && CSS.supports && CSS.supports('touch-action', 'none');
    }
    function E(e, t) {
      return 100 / (t - e);
    }
    function N(e, t) {
      return (100 * t) / (e[1] - e[0]);
    }
    function C(e, t) {
      return N(e, 0 > e[0] ? t + a(e[0]) : t - e[0]);
    }
    function A(e, t) {
      return (t * (e[1] - e[0])) / 100 + e[0];
    }
    function U(e, t) {
      for (var a = 1; e >= t[a]; ) a += 1;
      return a;
    }
    function P(e, t, a) {
      if (a >= e.slice(-1)[0]) return 100;
      var s = U(a, e),
        r = e[s - 1],
        n = e[s],
        i = t[s - 1],
        o = t[s];
      return i + C([r, n], a) / E(i, o);
    }
    function k(e, t, a) {
      if (100 <= a) return e.slice(-1)[0];
      var s = U(a, t),
        r = e[s - 1],
        n = e[s],
        i = t[s - 1],
        o = t[s];
      return A([r, n], (a - i) * E(i, o));
    }
    function D(e, t, s, r) {
      if (100 === r) return r;
      var n = U(r, e),
        i = e[n - 1],
        a = e[n];
      return s
        ? r - i > (a - i) / 2
          ? a
          : i
        : t[n - 1]
        ? e[n - 1] + l(r - e[n - 1], t[n - 1])
        : r;
    }
    function w(e, t, a) {
      var s;
      if (('number' == typeof t && (t = [t]), !Array.isArray(t)))
        throw new Error("noUiSlider (14.1.1): 'range' contains invalid value.");
      if (
        ((s = 'min' === e ? 0 : 'max' === e ? 100 : parseFloat(e)),
        !d(s) || !d(t[0]))
      )
        throw new Error("noUiSlider (14.1.1): 'range' value isn't numeric.");
      a.xPct.push(s),
        a.xVal.push(t[0]),
        s
          ? a.xSteps.push(!isNaN(t[1]) && t[1])
          : !isNaN(t[1]) && (a.xSteps[0] = t[1]),
        a.xHighestCompleteStep.push(0);
    }
    function F(e, t, a) {
      var s = Math.ceil;
      if (t) {
        if (a.xVal[e] === a.xVal[e + 1])
          return void (a.xSteps[e] = a.xHighestCompleteStep[e] = a.xVal[e]);
        a.xSteps[e] =
          N([a.xVal[e], a.xVal[e + 1]], t) / E(a.xPct[e], a.xPct[e + 1]);
        var r = (a.xVal[e + 1] - a.xVal[e]) / a.xNumSteps[e],
          n = s(+r.toFixed(3) - 1),
          i = a.xVal[e] + a.xNumSteps[e] * n;
        a.xHighestCompleteStep[e] = i;
      }
    }
    function L(e, t, a) {
      (this.xPct = []),
        (this.xVal = []),
        (this.xSteps = [a || !1]),
        (this.xNumSteps = [!1]),
        (this.xHighestCompleteStep = []),
        (this.snap = t);
      var s,
        r = [];
      for (s in e) e.hasOwnProperty(s) && r.push([e[s], s]);
      for (
        r.length && 'object' == typeof r[0][0]
          ? r.sort(function (e, t) {
              return e[0][0] - t[0][0];
            })
          : r.sort(function (e, t) {
              return e[0] - t[0];
            }),
          s = 0;
        s < r.length;
        s++
      )
        w(r[s][1], r[s][0], this);
      for (
        this.xNumSteps = this.xSteps.slice(0), s = 0;
        s < this.xNumSteps.length;
        s++
      )
        F(s, this.xNumSteps[s], this);
    }
    function O(t) {
      if (e(t)) return !0;
      throw new Error(
        "noUiSlider (14.1.1): 'format' requires 'to' and 'from' methods.",
      );
    }
    function T(e, t) {
      if (!d(t)) throw new Error("noUiSlider (14.1.1): 'step' is not numeric.");
      e.singleStep = t;
    }
    function j(e, t) {
      if ('object' != typeof t || Array.isArray(t))
        throw new Error("noUiSlider (14.1.1): 'range' is not an object.");
      if (void 0 === t.min || void 0 === t.max)
        throw new Error(
          "noUiSlider (14.1.1): Missing 'min' or 'max' in 'range'.",
        );
      if (t.min === t.max)
        throw new Error(
          "noUiSlider (14.1.1): 'range' 'min' and 'max' cannot be equal.",
        );
      e.spectrum = new L(t, e.snap, e.singleStep);
    }
    function H(e, t) {
      if (((t = c(t)), !Array.isArray(t) || !t.length))
        throw new Error("noUiSlider (14.1.1): 'start' option is incorrect.");
      (e.handles = t.length), (e.start = t);
    }
    function z(e, t) {
      if (((e.snap = t), 'boolean' != typeof t))
        throw new Error(
          "noUiSlider (14.1.1): 'snap' option must be a boolean.",
        );
    }
    function M(e, t) {
      if (((e.animate = t), 'boolean' != typeof t))
        throw new Error(
          "noUiSlider (14.1.1): 'animate' option must be a boolean.",
        );
    }
    function R(e, t) {
      if (((e.animationDuration = t), 'number' != typeof t))
        throw new Error(
          "noUiSlider (14.1.1): 'animationDuration' option must be a number.",
        );
    }
    function q(e, t) {
      var a,
        s = [!1];
      if (
        ('lower' === t ? (t = [!0, !1]) : 'upper' == t && (t = [!1, !0]),
        !0 === t || !1 === t)
      ) {
        for (a = 1; a < e.handles; a++) s.push(t);
        s.push(!1);
      } else if (!Array.isArray(t) || !t.length || t.length !== e.handles + 1)
        throw new Error(
          "noUiSlider (14.1.1): 'connect' option doesn't match handle count.",
        );
      else s = t;
      e.connect = s;
    }
    function B(e, t) {
      switch (t) {
        case 'horizontal':
          e.ort = 0;
          break;
        case 'vertical':
          e.ort = 1;
          break;
        default:
          throw new Error(
            "noUiSlider (14.1.1): 'orientation' option is invalid.",
          );
      }
    }
    function _(e, t) {
      if (!d(t))
        throw new Error(
          "noUiSlider (14.1.1): 'margin' option must be numeric.",
        );
      if (0 !== t && ((e.margin = e.spectrum.getMargin(t)), !e.margin))
        throw new Error(
          "noUiSlider (14.1.1): 'margin' option is only supported on linear sliders.",
        );
    }
    function X(e, t) {
      if (!d(t))
        throw new Error("noUiSlider (14.1.1): 'limit' option must be numeric.");
      if (((e.limit = e.spectrum.getMargin(t)), !e.limit || 2 > e.handles))
        throw new Error(
          "noUiSlider (14.1.1): 'limit' option is only supported on linear sliders with 2 or more handles.",
        );
    }
    function I(e, t) {
      if (!d(t) && !Array.isArray(t))
        throw new Error(
          "noUiSlider (14.1.1): 'padding' option must be numeric or array of exactly 2 numbers.",
        );
      if (Array.isArray(t) && !(2 === t.length || d(t[0]) || d(t[1])))
        throw new Error(
          "noUiSlider (14.1.1): 'padding' option must be numeric or array of exactly 2 numbers.",
        );
      if (0 !== t) {
        if (
          (Array.isArray(t) || (t = [t, t]),
          (e.padding = [
            e.spectrum.getMargin(t[0]),
            e.spectrum.getMargin(t[1]),
          ]),
          !1 === e.padding[0] || !1 === e.padding[1])
        )
          throw new Error(
            "noUiSlider (14.1.1): 'padding' option is only supported on linear sliders.",
          );
        if (0 > e.padding[0] || 0 > e.padding[1])
          throw new Error(
            "noUiSlider (14.1.1): 'padding' option must be a positive number(s).",
          );
        if (100 < e.padding[0] + e.padding[1])
          throw new Error(
            "noUiSlider (14.1.1): 'padding' option must not exceed 100% of the range.",
          );
      }
    }
    function Y(e, t) {
      switch (t) {
        case 'ltr':
          e.dir = 0;
          break;
        case 'rtl':
          e.dir = 1;
          break;
        default:
          throw new Error(
            "noUiSlider (14.1.1): 'direction' option was not recognized.",
          );
      }
    }
    function G(e, t) {
      if ('string' != typeof t)
        throw new Error(
          "noUiSlider (14.1.1): 'behaviour' must be a string containing options.",
        );
      var a = 0 <= t.indexOf('tap'),
        s = 0 <= t.indexOf('drag'),
        r = 0 <= t.indexOf('fixed'),
        n = 0 <= t.indexOf('snap'),
        i = 0 <= t.indexOf('hover'),
        o = 0 <= t.indexOf('unconstrained');
      if (r) {
        if (2 !== e.handles)
          throw new Error(
            "noUiSlider (14.1.1): 'fixed' behaviour must be used with 2 handles",
          );
        _(e, e.start[1] - e.start[0]);
      }
      if (o && (e.margin || e.limit))
        throw new Error(
          "noUiSlider (14.1.1): 'unconstrained' behaviour cannot be used with margin or limit",
        );
      e.events = {
        tap: a || n,
        drag: s,
        fixed: r,
        snap: n,
        hover: i,
        unconstrained: o,
      };
    }
    function W(e, t) {
      if (!1 !== t)
        if (!0 === t) {
          e.tooltips = [];
          for (var a = 0; a < e.handles; a++) e.tooltips.push(!0);
        } else {
          if (((e.tooltips = c(t)), e.tooltips.length !== e.handles))
            throw new Error(
              'noUiSlider (14.1.1): must pass a formatter for all handles.',
            );
          e.tooltips.forEach(function (e) {
            if (
              'boolean' != typeof e &&
              ('object' != typeof e || 'function' != typeof e.to)
            )
              throw new Error(
                "noUiSlider (14.1.1): 'tooltips' must be passed a formatter or 'false'.",
              );
          });
        }
    }
    function $(e, t) {
      (e.ariaFormat = t), O(t);
    }
    function K(e, t) {
      (e.format = t), O(t);
    }
    function Z(e, t) {
      if (((e.keyboardSupport = t), 'boolean' != typeof t))
        throw new Error(
          "noUiSlider (14.1.1): 'keyboardSupport' option must be a boolean.",
        );
    }
    function J(e, t) {
      e.documentElement = t;
    }
    function Q(e, t) {
      if ('string' != typeof t && !1 !== t)
        throw new Error(
          "noUiSlider (14.1.1): 'cssPrefix' must be a string or `false`.",
        );
      e.cssPrefix = t;
    }
    function ee(e, t) {
      if ('object' != typeof t)
        throw new Error("noUiSlider (14.1.1): 'cssClasses' must be an object.");
      if ('string' == typeof e.cssPrefix)
        for (var a in ((e.cssClasses = {}), t))
          t.hasOwnProperty(a) && (e.cssClasses[a] = e.cssPrefix + t[a]);
      else e.cssClasses = t;
    }
    function te(e) {
      var t = {
          margin: 0,
          limit: 0,
          padding: 0,
          animate: !0,
          animationDuration: 300,
          ariaFormat: re,
          format: re,
        },
        a = {
          step: { r: !1, t: T },
          start: { r: !0, t: H },
          connect: { r: !0, t: q },
          direction: { r: !0, t: Y },
          snap: { r: !1, t: z },
          animate: { r: !1, t: M },
          animationDuration: { r: !1, t: R },
          range: { r: !0, t: j },
          orientation: { r: !1, t: B },
          margin: { r: !1, t: _ },
          limit: { r: !1, t: X },
          padding: { r: !1, t: I },
          behaviour: { r: !0, t: G },
          ariaFormat: { r: !1, t: $ },
          format: { r: !1, t: K },
          tooltips: { r: !1, t: W },
          keyboardSupport: { r: !0, t: Z },
          documentElement: { r: !1, t: J },
          cssPrefix: { r: !0, t: Q },
          cssClasses: { r: !0, t: ee },
        },
        s = {
          connect: !1,
          direction: 'ltr',
          behaviour: 'tap',
          orientation: 'horizontal',
          keyboardSupport: !0,
          cssPrefix: 'noUi-',
          cssClasses: {
            target: 'target',
            base: 'base',
            origin: 'origin',
            handle: 'handle',
            handleLower: 'handle-lower',
            handleUpper: 'handle-upper',
            touchArea: 'touch-area',
            horizontal: 'horizontal',
            vertical: 'vertical',
            background: 'background',
            connect: 'connect',
            connects: 'connects',
            ltr: 'ltr',
            rtl: 'rtl',
            textDirectionLtr: 'txt-dir-ltr',
            textDirectionRtl: 'txt-dir-rtl',
            draggable: 'draggable',
            drag: 'state-drag',
            tap: 'state-tap',
            active: 'active',
            tooltip: 'tooltip',
            pips: 'pips',
            pipsHorizontal: 'pips-horizontal',
            pipsVertical: 'pips-vertical',
            marker: 'marker',
            markerHorizontal: 'marker-horizontal',
            markerVertical: 'marker-vertical',
            markerNormal: 'marker-normal',
            markerLarge: 'marker-large',
            markerSub: 'marker-sub',
            value: 'value',
            valueHorizontal: 'value-horizontal',
            valueVertical: 'value-vertical',
            valueNormal: 'value-normal',
            valueLarge: 'value-large',
            valueSub: 'value-sub',
          },
        };
      e.format && !e.ariaFormat && (e.ariaFormat = e.format),
        Object.keys(a).forEach(function (r) {
          if (!n(e[r]) && void 0 === s[r]) {
            if (a[r].r)
              throw new Error("noUiSlider (14.1.1): '" + r + "' is required.");
            return !0;
          }
          a[r].t(t, n(e[r]) ? e[r] : s[r]);
        }),
        (t.pips = e.pips);
      var r = document.createElement('div'),
        i = void 0 !== r.style.msTransform,
        o = void 0 !== r.style.transform;
      t.transformRule = o ? 'transform' : i ? 'msTransform' : 'webkitTransform';
      return (
        (t.style = [
          ['left', 'top'],
          ['right', 'bottom'],
        ][t.dir][t.ort]),
        t
      );
    }
    function ae(e, n, l) {
      function d(e, t) {
        var a = ke.createElement('div');
        return t && h(a, t), e.appendChild(a), a;
      }
      function g(e, t) {
        var a = d(e, n.cssClasses.origin),
          s = d(a, n.cssClasses.handle);
        return (
          d(s, n.cssClasses.touchArea),
          s.setAttribute('data-handle', t),
          n.keyboardSupport &&
            (s.setAttribute('tabindex', '0'),
            s.addEventListener('keydown', function (e) {
              return G(e, t);
            })),
          s.setAttribute('role', 'slider'),
          s.setAttribute('aria-orientation', n.ort ? 'vertical' : 'horizontal'),
          0 === t
            ? h(s, n.cssClasses.handleLower)
            : t == n.handles - 1 && h(s, n.cssClasses.handleUpper),
          a
        );
      }
      function x(e, t) {
        return !!t && d(e, n.cssClasses.connect);
      }
      function E(e, t) {
        var a = d(t, n.cssClasses.connects);
        (ge = []), (he = []), he.push(x(a, e[0]));
        for (var s = 0; s < n.handles; s++)
          ge.push(g(t, s)), (Ae[s] = s), he.push(x(a, e[s + 1]));
      }
      function N(e) {
        h(e, n.cssClasses.target),
          0 === n.dir ? h(e, n.cssClasses.ltr) : h(e, n.cssClasses.rtl),
          0 === n.ort
            ? h(e, n.cssClasses.horizontal)
            : h(e, n.cssClasses.vertical);
        var t = getComputedStyle(e).direction;
        return (
          'rtl' === t
            ? h(e, n.cssClasses.textDirectionRtl)
            : h(e, n.cssClasses.textDirectionLtr),
          d(e, n.cssClasses.base)
        );
      }
      function C(e, t) {
        return !!n.tooltips[t] && d(e.firstChild, n.cssClasses.tooltip);
      }
      function A() {
        return ye.hasAttribute('disabled');
      }
      function U(e) {
        var t = ge[e];
        return t.hasAttribute('disabled');
      }
      function P() {
        be &&
          (K('update.tooltips'),
          be.forEach(function (e) {
            e && r(e);
          }),
          (be = null));
      }
      function k() {
        P(),
          (be = ge.map(C)),
          $('update.tooltips', function (e, t, a) {
            if (be[t]) {
              var s = e[t];
              !0 !== n.tooltips[t] && (s = n.tooltips[t].to(a[t])),
                (be[t].innerHTML = s);
            }
          });
      }
      function D() {
        $('update', function (e, t, a, s, r) {
          Ae.forEach(function (e) {
            var t = ge[e],
              s = J(Ce, e, 0, !0, !0, !0),
              i = J(Ce, e, 100, !0, !0, !0),
              o = r[e],
              l = n.ariaFormat.to(a[e]);
            (s = Ee.fromStepping(s).toFixed(1)),
              (i = Ee.fromStepping(i).toFixed(1)),
              (o = Ee.fromStepping(o).toFixed(1)),
              t.children[0].setAttribute('aria-valuemin', s),
              t.children[0].setAttribute('aria-valuemax', i),
              t.children[0].setAttribute('aria-valuenow', o),
              t.children[0].setAttribute('aria-valuetext', l);
          });
        });
      }
      function w(e, t, a) {
        if ('range' === e || 'steps' === e) return Ee.xVal;
        if ('count' === e) {
          if (2 > t)
            throw new Error(
              "noUiSlider (14.1.1): 'values' (>= 2) required for mode 'count'.",
            );
          var s = t - 1,
            r = 100 / s;
          for (t = []; s--; ) t[s] = s * r;
          t.push(100), (e = 'positions');
        }
        return 'positions' === e
          ? t.map(function (e) {
              return Ee.fromStepping(a ? Ee.getStep(e) : e);
            })
          : 'values' === e
          ? a
            ? t.map(function (e) {
                return Ee.fromStepping(Ee.getStep(Ee.toStepping(e)));
              })
            : t
          : void 0;
      }
      function F(e, a, r) {
        function n(e, t) {
          return (e + t).toFixed(7) / 1;
        }
        var l = {},
          p = Ee.xVal[0],
          d = Ee.xVal[Ee.xVal.length - 1],
          u = !1,
          m = !1,
          c = 0;
        return (
          (r = o(
            r.slice().sort(function (e, t) {
              return e - t;
            }),
          )),
          r[0] !== p && (r.unshift(p), (u = !0)),
          r[r.length - 1] !== d && (r.push(d), (m = !0)),
          r.forEach(function (o, p) {
            var d,
              g,
              h,
              f,
              b,
              x,
              S,
              v,
              V,
              y,
              E = o,
              N = r[p + 1],
              C = 'steps' === a;
            if (
              (C && (d = Ee.xNumSteps[p]),
              d || (d = N - E),
              !1 !== E && void 0 !== N)
            )
              for (d = t(d, 1e-7), g = E; g <= N; g = n(g, d)) {
                for (
                  f = Ee.toStepping(g),
                    b = f - c,
                    v = b / e,
                    V = s(v),
                    y = b / V,
                    h = 1;
                  h <= V;
                  h += 1
                )
                  (x = c + h * y), (l[x.toFixed(5)] = [Ee.fromStepping(x), 0]);
                (S = -1 < r.indexOf(g) ? 1 : C ? 2 : 0),
                  !p && u && (S = 0),
                  (g === N && m) || (l[f.toFixed(5)] = [g, S]),
                  (c = f);
              }
          }),
          l
        );
      }
      function L(e, t, a) {
        function s(e, t) {
          var s = t === n.cssClasses.value,
            a = s ? p : u,
            r = s ? o : l;
          return t + ' ' + a[n.ort] + ' ' + r[e];
        }
        function r(e, r, o) {
          if (((o = t ? t(r, o) : o), -1 !== o)) {
            var l = d(i, !1);
            (l.className = s(o, n.cssClasses.marker)),
              (l.style[n.style] = e + '%'),
              0 < o &&
                ((l = d(i, !1)),
                (l.className = s(o, n.cssClasses.value)),
                l.setAttribute('data-value', r),
                (l.style[n.style] = e + '%'),
                (l.innerHTML = a.to(r)));
          }
        }
        var i = ke.createElement('div'),
          o = [];
        (o[0] = n.cssClasses.valueNormal),
          (o[1] = n.cssClasses.valueLarge),
          (o[2] = n.cssClasses.valueSub);
        var l = [];
        (l[0] = n.cssClasses.markerNormal),
          (l[1] = n.cssClasses.markerLarge),
          (l[2] = n.cssClasses.markerSub);
        var p = [n.cssClasses.valueHorizontal, n.cssClasses.valueVertical],
          u = [n.cssClasses.markerHorizontal, n.cssClasses.markerVertical];
        return (
          h(i, n.cssClasses.pips),
          h(
            i,
            0 === n.ort
              ? n.cssClasses.pipsHorizontal
              : n.cssClasses.pipsVertical,
          ),
          Object.keys(e).forEach(function (t) {
            r(t, e[t][0], e[t][1]);
          }),
          i
        );
      }
      function O() {
        fe && (r(fe), (fe = null));
      }
      function T(e) {
        O();
        var t = e.mode,
          a = e.density || 1,
          r = e.filter || !1,
          n = e.values || !1,
          i = e.stepped || !1,
          o = w(t, n, i),
          l = F(a, t, o),
          p = e.format || { to: s };
        return (fe = ye.appendChild(L(l, r, p))), fe;
      }
      function j() {
        var e = ce.getBoundingClientRect(),
          t = 'offset' + ['Width', 'Height'][n.ort];
        return 0 === n.ort ? e.width || ce[t] : e.height || ce[t];
      }
      function H(t, a, s, r) {
        var i = function (i) {
            return (
              (i = z(i, r.pageOffset, r.target || a)),
              !!i &&
                (!A() || r.doNotReject) &&
                (!b(ye, n.cssClasses.tap) || r.doNotReject) &&
                !(t === Se.start && void 0 !== i.buttons && 1 < i.buttons) &&
                !(r.hover && i.buttons) &&
                void (!Ve && i.preventDefault(),
                (i.calcPoint = i.points[n.ort]),
                s(i, r))
            );
          },
          o = [];
        return (
          t.split(' ').forEach(function (e) {
            a.addEventListener(e, i, !!Ve && { passive: !0 }), o.push([e, i]);
          }),
          o
        );
      }
      function z(t, e, a) {
        var s,
          r,
          n = 0 === t.type.indexOf('touch'),
          i = 0 === t.type.indexOf('mouse'),
          o = 0 === t.type.indexOf('pointer');
        if ((0 === t.type.indexOf('MSPointer') && (o = !0), n)) {
          var l = function (e) {
            return e.target === a || a.contains(e.target);
          };
          if ('touchstart' === t.type) {
            var p = Array.prototype.filter.call(t.touches, l);
            if (1 < p.length) return !1;
            (s = p[0].pageX), (r = p[0].pageY);
          } else {
            var d = Array.prototype.find.call(t.changedTouches, l);
            if (!d) return !1;
            (s = d.pageX), (r = d.pageY);
          }
        }
        return (
          (e = e || S(ke)),
          (i || o) && ((s = t.clientX + e.x), (r = t.clientY + e.y)),
          (t.pageOffset = e),
          (t.points = [s, r]),
          (t.cursor = i || o),
          t
        );
      }
      function M(e) {
        var t = e - p(ce, n.ort),
          a = (100 * t) / j();
        return (a = m(a)), n.dir ? 100 - a : a;
      }
      function R(e) {
        var t = 100,
          s = !1;
        return (
          ge.forEach(function (r, n) {
            if (!U(n)) {
              var i = Ce[n],
                o = a(i - e),
                l = 100 === o && 100 === t,
                p = o < t,
                d = o <= t && e > i;
              (p || d || l) && ((s = n), (t = o));
            }
          }),
          s
        );
      }
      function q(e, t) {
        'mouseout' === e.type &&
          'HTML' === e.target.nodeName &&
          null === e.relatedTarget &&
          _(e, t);
      }
      function B(e, t) {
        if (
          -1 === navigator.appVersion.indexOf('MSIE 9') &&
          0 === e.buttons &&
          0 !== t.buttonsProperty
        )
          return _(e, t);
        var a = (n.dir ? -1 : 1) * (e.calcPoint - t.startCalcPoint),
          s = (100 * a) / t.baseSize;
        ee(0 < a, s, t.locations, t.handleNumbers);
      }
      function _(e, t) {
        t.handle && (f(t.handle, n.cssClasses.active), (Ue -= 1)),
          t.listeners.forEach(function (e) {
            De.removeEventListener(e[0], e[1]);
          }),
          0 === Ue &&
            (f(ye, n.cssClasses.drag),
            ne(),
            e.cursor &&
              ((we.style.cursor = ''),
              we.removeEventListener('selectstart', i))),
          t.handleNumbers.forEach(function (e) {
            Z('change', e), Z('set', e), Z('end', e);
          });
      }
      function X(e, t) {
        if (t.handleNumbers.some(U)) return !1;
        var a;
        if (1 === t.handleNumbers.length) {
          var s = ge[t.handleNumbers[0]];
          (a = s.children[0]), (Ue += 1), h(a, n.cssClasses.active);
        }
        e.stopPropagation();
        var r = [],
          o = H(Se.move, De, B, {
            target: e.target,
            handle: a,
            listeners: r,
            startCalcPoint: e.calcPoint,
            baseSize: j(),
            pageOffset: e.pageOffset,
            handleNumbers: t.handleNumbers,
            buttonsProperty: e.buttons,
            locations: Ce.slice(),
          }),
          l = H(Se.end, De, _, {
            target: e.target,
            handle: a,
            listeners: r,
            doNotReject: !0,
            handleNumbers: t.handleNumbers,
          }),
          p = H('mouseout', De, q, {
            target: e.target,
            handle: a,
            listeners: r,
            doNotReject: !0,
            handleNumbers: t.handleNumbers,
          });
        r.push.apply(r, o.concat(l, p)),
          e.cursor &&
            ((we.style.cursor = getComputedStyle(e.target).cursor),
            1 < ge.length && h(ye, n.cssClasses.drag),
            we.addEventListener('selectstart', i, !1)),
          t.handleNumbers.forEach(function (e) {
            Z('start', e);
          });
      }
      function I(e) {
        e.stopPropagation();
        var t = M(e.calcPoint),
          a = R(t);
        return (
          !1 !== a &&
          void (!n.events.snap && u(ye, n.cssClasses.tap, n.animationDuration),
          ie(a, t, !0, !0),
          ne(),
          Z('slide', a, !0),
          Z('update', a, !0),
          Z('change', a, !0),
          Z('set', a, !0),
          n.events.snap && X(e, { handleNumbers: [a] }))
        );
      }
      function Y(e) {
        var t = M(e.calcPoint),
          a = Ee.getStep(t),
          s = Ee.fromStepping(a);
        Object.keys(Pe).forEach(function (e) {
          'hover' === e.split('.')[0] &&
            Pe[e].forEach(function (e) {
              e.call(xe, s);
            });
        });
      }
      function G(e, a) {
        if (A() || U(a)) return !1;
        var s = ['Left', 'Right'],
          r = ['Down', 'Up'],
          i = ['PageDown', 'PageUp'],
          o = ['Home', 'End'];
        n.dir && !n.ort
          ? s.reverse()
          : n.ort && !n.dir && (r.reverse(), i.reverse());
        var l = e.key.replace('Arrow', ''),
          p = l === i[0],
          d = l === i[1],
          u = l === r[0] || l === s[0] || p,
          m = l === r[1] || l === s[1] || d,
          c = l === o[0],
          g = l === o[1];
        if (!u && !m && !c && !g) return !0;
        e.preventDefault();
        var h;
        if (m || u) {
          var f = u ? 0 : 1,
            b = ue(a),
            x = b[f];
          if (null === x) return !1;
          !1 === x && (x = Ee.getDefaultStep(Ce[a], u, 10)),
            (d || p) && (x *= 5),
            (x = t(x, 1e-7)),
            (x = (u ? -1 : 1) * x),
            (h = Ne[a] + x);
        } else h = g ? n.spectrum.xVal[n.spectrum.xVal.length - 1] : n.spectrum.xVal[0];
        return (
          ie(a, Ee.toStepping(h), !0, !0),
          Z('slide', a),
          Z('update', a),
          Z('change', a),
          Z('set', a),
          !1
        );
      }
      function W(e) {
        e.fixed ||
          ge.forEach(function (e, t) {
            H(Se.start, e.children[0], X, { handleNumbers: [t] });
          }),
          e.tap && H(Se.start, ce, I, {}),
          e.hover && H(Se.move, ce, Y, { hover: !0 }),
          e.drag &&
            he.forEach(function (t, a) {
              if (!1 !== t && 0 !== a && a !== he.length - 1) {
                var s = ge[a - 1],
                  r = ge[a],
                  i = [t];
                h(t, n.cssClasses.draggable),
                  e.fixed && (i.push(s.children[0]), i.push(r.children[0])),
                  i.forEach(function (e) {
                    H(Se.start, e, X, {
                      handles: [s, r],
                      handleNumbers: [a - 1, a],
                    });
                  });
              }
            });
      }
      function $(e, t) {
        (Pe[e] = Pe[e] || []),
          Pe[e].push(t),
          'update' === e.split('.')[0] &&
            ge.forEach(function (e, t) {
              Z('update', t);
            });
      }
      function K(e) {
        var t = e && e.split('.')[0],
          a = t && e.substring(t.length);
        Object.keys(Pe).forEach(function (e) {
          var s = e.split('.')[0],
            r = e.substring(s.length);
          (t && t !== s) || (a && a !== r) || delete Pe[e];
        });
      }
      function Z(e, t, a) {
        Object.keys(Pe).forEach(function (s) {
          var r = s.split('.')[0];
          e === r &&
            Pe[s].forEach(function (e) {
              e.call(
                xe,
                Ne.map(n.format.to),
                t,
                Ne.slice(),
                a || !1,
                Ce.slice(),
              );
            });
        });
      }
      function J(e, a, s, r, i, o) {
        return (
          1 < ge.length &&
            !n.events.unconstrained &&
            (r && 0 < a && (s = t(s, e[a - 1] + n.margin)),
            i && a < ge.length - 1 && (s = se(s, e[a + 1] - n.margin))),
          1 < ge.length &&
            n.limit &&
            (r && 0 < a && (s = se(s, e[a - 1] + n.limit)),
            i && a < ge.length - 1 && (s = t(s, e[a + 1] - n.limit))),
          n.padding &&
            (0 === a && (s = t(s, n.padding[0])),
            a === ge.length - 1 && (s = se(s, 100 - n.padding[1]))),
          (s = Ee.getStep(s)),
          (s = m(s)),
          !!(s !== e[a] || o) && s
        );
      }
      function Q(e, t) {
        var a = n.ort;
        return (a ? t : e) + ', ' + (a ? e : t);
      }
      function ee(e, t, a, s) {
        var r = a.slice(),
          n = [!e, e],
          i = [e, !e];
        (s = s.slice()),
          e && s.reverse(),
          1 < s.length
            ? s.forEach(function (e, a) {
                var s = J(r, e, r[e] + t, n[a], i[a], !1);
                !1 === s ? (t = 0) : ((t = s - r[e]), (r[e] = s));
              })
            : (n = i = [!0]);
        var l = !1;
        s.forEach(function (e, s) {
          l = ie(e, a[e] + t, n[s], i[s]) || l;
        }),
          l &&
            s.forEach(function (e) {
              Z('update', e), Z('slide', e);
            });
      }
      function ae(e, t) {
        return n.dir ? 100 - e - t : e;
      }
      function re(e, t) {
        (Ce[e] = t), (Ne[e] = Ee.fromStepping(t));
        var a = 10 * (ae(t, 0) - Fe),
          s = 'translate(' + Q(a + '%', '0') + ')';
        (ge[e].style[n.transformRule] = s), oe(e), oe(e + 1);
      }
      function ne() {
        Ae.forEach(function (e) {
          var t = 50 < Ce[e] ? -1 : 1,
            a = 3 + (ge.length + t * e);
          ge[e].style.zIndex = a;
        });
      }
      function ie(e, t, a, s) {
        return ((t = J(Ce, e, t, a, s, !1)), !1 !== t) && (re(e, t), !0);
      }
      function oe(e) {
        if (he[e]) {
          var t = 0,
            a = 100;
          0 !== e && (t = Ce[e - 1]), e !== he.length - 1 && (a = Ce[e]);
          var s = a - t,
            r = 'translate(' + Q(ae(t, s) + '%', '0') + ')',
            i = 'scale(' + Q(s / 100, '1') + ')';
          he[e].style[n.transformRule] = r + ' ' + i;
        }
      }
      function le(e, t) {
        return null === e || !1 === e || void 0 === e
          ? Ce[t]
          : ('number' == typeof e && (e += ''),
            (e = n.format.from(e)),
            (e = Ee.toStepping(e)),
            !1 === e || isNaN(e) ? Ce[t] : e);
      }
      function pe(e, t) {
        var a = c(e),
          s = void 0 === Ce[0];
        (t = void 0 === t || !!t),
          n.animate && !s && u(ye, n.cssClasses.tap, n.animationDuration),
          Ae.forEach(function (e) {
            ie(e, le(a[e], e), !0, !1);
          });
        for (var r = 1 === Ae.length ? 0 : 1; r < Ae.length; ++r)
          Ae.forEach(function (e) {
            ie(e, Ce[e], !0, !0);
          });
        ne(),
          Ae.forEach(function (e) {
            Z('update', e), null !== a[e] && t && Z('set', e);
          });
      }
      function de() {
        var e = Ne.map(n.format.to);
        return 1 === e.length ? e[0] : e;
      }
      function ue(e) {
        var t = Ce[e],
          a = Ee.getNearbySteps(t),
          s = Ne[e],
          r = a.thisStep.step,
          i = null;
        if (n.snap)
          return [
            s - a.stepBefore.startValue || null,
            a.stepAfter.startValue - s || null,
          ];
        !1 !== r &&
          s + r > a.stepAfter.startValue &&
          (r = a.stepAfter.startValue - s),
          (i =
            s > a.thisStep.startValue
              ? a.thisStep.step
              : !1 !== a.stepBefore.step && s - a.stepBefore.highestStep),
          100 === t ? (r = null) : 0 === t && (i = null);
        var o = Ee.countStepDecimals();
        return (
          null !== r && !1 !== r && (r = +r.toFixed(o)),
          null !== i && !1 !== i && (i = +i.toFixed(o)),
          [i, r]
        );
      }
      function me() {
        (ce = N(ye)),
          E(n.connect, ce),
          W(n.events),
          pe(n.start),
          n.pips && T(n.pips),
          n.tooltips && k(),
          D();
      }
      var ce,
        ge,
        he,
        fe,
        be,
        xe,
        Se = v(),
        ve = y(),
        Ve = ve && V(),
        ye = e,
        Ee = n.spectrum,
        Ne = [],
        Ce = [],
        Ae = [],
        Ue = 0,
        Pe = {},
        ke = e.ownerDocument,
        De = n.documentElement || ke.documentElement,
        we = ke.body,
        Fe = 'rtl' === ke.dir || 1 === n.ort ? 0 : 100;
      return (
        me(),
        (xe = {
          destroy: function () {
            for (var e in n.cssClasses)
              n.cssClasses.hasOwnProperty(e) && f(ye, n.cssClasses[e]);
            for (; ye.firstChild; ) ye.removeChild(ye.firstChild);
            delete ye.noUiSlider;
          },
          steps: function () {
            return Ae.map(ue);
          },
          on: $,
          off: K,
          get: de,
          set: pe,
          setHandle: function (e, t, a) {
            if (((e = +e), !(0 <= e && e < Ae.length)))
              throw new Error(
                'noUiSlider (14.1.1): invalid handle number, got: ' + e,
              );
            ie(e, le(t, e), !0, !0), Z('update', e), a && Z('set', e);
          },
          reset: function (e) {
            pe(n.start, e);
          },
          __moveHandles: function (e, t, a) {
            ee(e, t, Ce, a);
          },
          options: l,
          updateOptions: function (e, t) {
            var a = de(),
              s = [
                'margin',
                'limit',
                'padding',
                'range',
                'animate',
                'snap',
                'step',
                'format',
                'pips',
                'tooltips',
              ];
            s.forEach(function (t) {
              void 0 !== e[t] && (l[t] = e[t]);
            });
            var r = te(l);
            s.forEach(function (t) {
              void 0 !== e[t] && (n[t] = r[t]);
            }),
              (Ee = r.spectrum),
              (n.margin = r.margin),
              (n.limit = r.limit),
              (n.padding = r.padding),
              n.pips ? T(n.pips) : O(),
              n.tooltips ? k() : P(),
              (Ce = []),
              pe(e.start || a, t);
          },
          target: ye,
          removePips: O,
          removeTooltips: P,
          pips: T,
        }),
        xe
      );
    }
    (L.prototype.getMargin = function (e) {
      var t = this.xNumSteps[0];
      if (t && 0 != (e / t) % 1)
        throw new Error(
          "noUiSlider (14.1.1): 'limit', 'margin' and 'padding' must be divisible by step.",
        );
      return !(2 !== this.xPct.length) && N(this.xVal, e);
    }),
      (L.prototype.toStepping = function (e) {
        return (e = P(this.xVal, this.xPct, e)), e;
      }),
      (L.prototype.fromStepping = function (e) {
        return k(this.xVal, this.xPct, e);
      }),
      (L.prototype.getStep = function (e) {
        return (e = D(this.xPct, this.xSteps, this.snap, e)), e;
      }),
      (L.prototype.getDefaultStep = function (e, a, s) {
        var r = U(e, this.xPct);
        return (
          (100 === e || (a && e === this.xPct[r - 1])) && (r = t(r - 1, 1)),
          (this.xVal[r] - this.xVal[r - 1]) / s
        );
      }),
      (L.prototype.getNearbySteps = function (e) {
        var t = U(e, this.xPct);
        return {
          stepBefore: {
            startValue: this.xVal[t - 2],
            step: this.xNumSteps[t - 2],
            highestStep: this.xHighestCompleteStep[t - 2],
          },
          thisStep: {
            startValue: this.xVal[t - 1],
            step: this.xNumSteps[t - 1],
            highestStep: this.xHighestCompleteStep[t - 1],
          },
          stepAfter: {
            startValue: this.xVal[t],
            step: this.xNumSteps[t],
            highestStep: this.xHighestCompleteStep[t],
          },
        };
      }),
      (L.prototype.countStepDecimals = function () {
        var e = this.xNumSteps.map(g);
        return t.apply(null, e);
      }),
      (L.prototype.convert = function (e) {
        return this.getStep(this.toStepping(e));
      });
    var re = {
      to: function (e) {
        return e !== void 0 && e.toFixed(2);
      },
      from: Number,
    };
    return {
      __spectrum: L,
      version: '14.1.1',
      create: function (e, t) {
        if (!e || !e.nodeName)
          throw new Error(
            'noUiSlider (14.1.1): create requires a single element, got: ' + e,
          );
        if (e.noUiSlider)
          throw new Error(
            'noUiSlider (14.1.1): Slider was already initialized.',
          );
        var a = te(t),
          s = ae(e, a, t);
        return (e.noUiSlider = s), s;
      },
    };
  });
});
(function () {
  var e = [].slice.call(document.querySelectorAll('[data-toggle="dropdown"]'));
  e.map(function (e) {
    return new bootstrap.Dropdown(e, {});
  });
  var t = [].slice.call(document.querySelectorAll('[data-toggle="tooltip"]'));
  t.map(function (e) {
    return new bootstrap.Tooltip(e, {});
  });
  var a = [].slice.call(document.querySelectorAll('[data-toggle="popover"]'));
  a.map(function (e) {
    return new bootstrap.Popover(e, { autoHide: !0 });
  });
  var s = [].slice.call(document.querySelectorAll('[data-slider]'));
  s.map(function (e) {
    var t;
    e.getAttribute('data-slider') &&
      (t = JSON.parse(e.getAttribute('data-slider')));
    var a = nouislider.create(e, t);
    t['js-name'] && (window[t['js-name']] = a);
  });
  var r = [].slice.call(document.querySelectorAll('[data-countup]'));
  r.map(function (e) {
    var t;
    return (
      '' !== e.getAttribute('data-countup') &&
        (t = JSON.parse(e.getAttribute('data-countup'))),
      new CountUp(e, parseFloat(e.innerText), t).start()
    );
  });
})();
//# sourceMappingURL=tabler.min.js.map
