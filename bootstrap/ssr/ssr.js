import { createSSRApp, h as h$1 } from "vue";
import { renderToString } from "@vue/server-renderer";
import { createInertiaApp } from "@inertiajs/vue3";
import createServer from "@inertiajs/vue3/server";
import { createI18n } from "vue-i18n";
async function resolvePageComponent(path, pages) {
  for (const p2 of Array.isArray(path) ? path : [path]) {
    const page = pages[p2];
    if (typeof page === "undefined") {
      continue;
    }
    return typeof page === "function" ? page() : page;
  }
  throw new Error(`Page not found: ${path}`);
}
function t() {
  return t = Object.assign ? Object.assign.bind() : function(t3) {
    for (var e2 = 1; e2 < arguments.length; e2++) {
      var o2 = arguments[e2];
      for (var n2 in o2) ({}).hasOwnProperty.call(o2, n2) && (t3[n2] = o2[n2]);
    }
    return t3;
  }, t.apply(null, arguments);
}
const e = String.prototype.replace, o = /%20/g, n = { RFC1738: function(t3) {
  return e.call(t3, o, "+");
}, RFC3986: function(t3) {
  return String(t3);
} };
var r = "RFC3986";
const i = Object.prototype.hasOwnProperty, s = Array.isArray, u = /* @__PURE__ */ new WeakMap();
var l = function(t3, e2) {
  return u.set(t3, e2), t3;
};
function c(t3) {
  return u.has(t3);
}
var a = function(t3) {
  return u.get(t3);
}, f = function(t3, e2) {
  u.set(t3, e2);
};
const p = function() {
  const t3 = [];
  for (let e2 = 0; e2 < 256; ++e2) t3.push("%" + ((e2 < 16 ? "0" : "") + e2.toString(16)).toUpperCase());
  return t3;
}(), y = function(t3, e2) {
  const o2 = e2 && e2.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
  for (let e3 = 0; e3 < t3.length; ++e3) void 0 !== t3[e3] && (o2[e3] = t3[e3]);
  return o2;
}, d = function t2(e2, o2, n2) {
  if (!o2) return e2;
  if ("object" != typeof o2) {
    if (s(e2)) e2.push(o2);
    else {
      if (!e2 || "object" != typeof e2) return [e2, o2];
      if (c(e2)) {
        var r2 = a(e2) + 1;
        e2[r2] = o2, f(e2, r2);
      } else (n2 && (n2.plainObjects || n2.allowPrototypes) || !i.call(Object.prototype, o2)) && (e2[o2] = true);
    }
    return e2;
  }
  if (!e2 || "object" != typeof e2) {
    if (c(o2)) {
      for (var u2 = Object.keys(o2), p2 = n2 && n2.plainObjects ? { __proto__: null, 0: e2 } : { 0: e2 }, d2 = 0; d2 < u2.length; d2++) p2[parseInt(u2[d2], 10) + 1] = o2[u2[d2]];
      return l(p2, a(o2) + 1);
    }
    return [e2].concat(o2);
  }
  let h2 = e2;
  return s(e2) && !s(o2) && (h2 = y(e2, n2)), s(e2) && s(o2) ? (o2.forEach(function(o3, r3) {
    if (i.call(e2, r3)) {
      const i2 = e2[r3];
      i2 && "object" == typeof i2 && o3 && "object" == typeof o3 ? e2[r3] = t2(i2, o3, n2) : e2.push(o3);
    } else e2[r3] = o3;
  }), e2) : Object.keys(o2).reduce(function(e3, r3) {
    const s2 = o2[r3];
    return e3[r3] = i.call(e3, r3) ? t2(e3[r3], s2, n2) : s2, e3;
  }, h2);
}, h = 1024, b = function(t3, e2, o2, n2) {
  if (c(t3)) {
    var r2 = a(t3) + 1;
    return t3[r2] = e2, f(t3, r2), t3;
  }
  var i2 = [].concat(t3, e2);
  return i2.length > o2 ? l(y(i2, { plainObjects: n2 }), i2.length - 1) : i2;
}, m = function(t3, e2) {
  if (s(t3)) {
    const o2 = [];
    for (let n2 = 0; n2 < t3.length; n2 += 1) o2.push(e2(t3[n2]));
    return o2;
  }
  return e2(t3);
}, g = Object.prototype.hasOwnProperty, w = { brackets: function(t3) {
  return t3 + "[]";
}, comma: "comma", indices: function(t3, e2) {
  return t3 + "[" + e2 + "]";
}, repeat: function(t3) {
  return t3;
} }, v = Array.isArray, j = Array.prototype.push, $ = function(t3, e2) {
  j.apply(t3, v(e2) ? e2 : [e2]);
}, E = Date.prototype.toISOString, O = { addQueryPrefix: false, allowDots: false, allowEmptyArrays: false, arrayFormat: "indices", charset: "utf-8", charsetSentinel: false, delimiter: "&", encode: true, encodeDotInKeys: false, encoder: function(t3, e2, o2, n2, r2) {
  if (0 === t3.length) return t3;
  let i2 = t3;
  if ("symbol" == typeof t3 ? i2 = Symbol.prototype.toString.call(t3) : "string" != typeof t3 && (i2 = String(t3)), "iso-8859-1" === o2) return escape(i2).replace(/%u[0-9a-f]{4}/gi, function(t4) {
    return "%26%23" + parseInt(t4.slice(2), 16) + "%3B";
  });
  let s2 = "";
  for (let t4 = 0; t4 < i2.length; t4 += h) {
    const e3 = i2.length >= h ? i2.slice(t4, t4 + h) : i2, o3 = [];
    for (let t5 = 0; t5 < e3.length; ++t5) {
      let n3 = e3.charCodeAt(t5);
      45 === n3 || 46 === n3 || 95 === n3 || 126 === n3 || n3 >= 48 && n3 <= 57 || n3 >= 65 && n3 <= 90 || n3 >= 97 && n3 <= 122 || "RFC1738" === r2 && (40 === n3 || 41 === n3) ? o3[o3.length] = e3.charAt(t5) : n3 < 128 ? o3[o3.length] = p[n3] : n3 < 2048 ? o3[o3.length] = p[192 | n3 >> 6] + p[128 | 63 & n3] : n3 < 55296 || n3 >= 57344 ? o3[o3.length] = p[224 | n3 >> 12] + p[128 | n3 >> 6 & 63] + p[128 | 63 & n3] : (t5 += 1, n3 = 65536 + ((1023 & n3) << 10 | 1023 & e3.charCodeAt(t5)), o3[o3.length] = p[240 | n3 >> 18] + p[128 | n3 >> 12 & 63] + p[128 | n3 >> 6 & 63] + p[128 | 63 & n3]);
    }
    s2 += o3.join("");
  }
  return s2;
}, encodeValuesOnly: false, format: r, formatter: n[r], indices: false, serializeDate: function(t3) {
  return E.call(t3);
}, skipNulls: false, strictNullHandling: false }, T = {}, R = function(t3, e2, o2, n2, r2, i2, s2, u2, l2, c2, a2, f2, p2, y2, d2, h2, b2, g2) {
  let w2 = t3, j2 = g2, E2 = 0, _2 = false;
  for (; void 0 !== (j2 = j2.get(T)) && !_2; ) {
    const e3 = j2.get(t3);
    if (E2 += 1, void 0 !== e3) {
      if (e3 === E2) throw new RangeError("Cyclic object value");
      _2 = true;
    }
    void 0 === j2.get(T) && (E2 = 0);
  }
  if ("function" == typeof c2 ? w2 = c2(e2, w2) : w2 instanceof Date ? w2 = p2(w2) : "comma" === o2 && v(w2) && (w2 = m(w2, function(t4) {
    return t4 instanceof Date ? p2(t4) : t4;
  })), null === w2) {
    if (i2) return l2 && !h2 ? l2(e2, O.encoder, b2, "key", y2) : e2;
    w2 = "";
  }
  if ("string" == typeof (I2 = w2) || "number" == typeof I2 || "boolean" == typeof I2 || "symbol" == typeof I2 || "bigint" == typeof I2 || function(t4) {
    return !(!t4 || "object" != typeof t4 || !(t4.constructor && t4.constructor.isBuffer && t4.constructor.isBuffer(t4)));
  }(w2)) return l2 ? [d2(h2 ? e2 : l2(e2, O.encoder, b2, "key", y2)) + "=" + d2(l2(w2, O.encoder, b2, "value", y2))] : [d2(e2) + "=" + d2(String(w2))];
  var I2;
  const S2 = [];
  if (void 0 === w2) return S2;
  let A2;
  if ("comma" === o2 && v(w2)) h2 && l2 && (w2 = m(w2, l2)), A2 = [{ value: w2.length > 0 ? w2.join(",") || null : void 0 }];
  else if (v(c2)) A2 = c2;
  else {
    const t4 = Object.keys(w2);
    A2 = a2 ? t4.sort(a2) : t4;
  }
  const D2 = u2 ? e2.replace(/\./g, "%2E") : e2, k2 = n2 && v(w2) && 1 === w2.length ? D2 + "[]" : D2;
  if (r2 && v(w2) && 0 === w2.length) return k2 + "[]";
  for (let e3 = 0; e3 < A2.length; ++e3) {
    const m2 = A2[e3], j3 = "object" == typeof m2 && void 0 !== m2.value ? m2.value : w2[m2];
    if (s2 && null === j3) continue;
    const O2 = f2 && u2 ? m2.replace(/\./g, "%2E") : m2, _3 = v(w2) ? "function" == typeof o2 ? o2(k2, O2) : k2 : k2 + (f2 ? "." + O2 : "[" + O2 + "]");
    g2.set(t3, E2);
    const I3 = /* @__PURE__ */ new WeakMap();
    I3.set(T, g2), $(S2, R(j3, _3, o2, n2, r2, i2, s2, u2, "comma" === o2 && h2 && v(w2) ? null : l2, c2, a2, f2, p2, y2, d2, h2, b2, I3));
  }
  return S2;
}, _ = Object.prototype.hasOwnProperty, I = Array.isArray, S = { allowDots: false, allowEmptyArrays: false, allowPrototypes: false, allowSparse: false, arrayLimit: 20, charset: "utf-8", charsetSentinel: false, comma: false, decodeDotInKeys: false, decoder: function(t3, e2, o2) {
  const n2 = t3.replace(/\+/g, " ");
  if ("iso-8859-1" === o2) return n2.replace(/%[0-9a-f]{2}/gi, unescape);
  try {
    return decodeURIComponent(n2);
  } catch (t4) {
    return n2;
  }
}, delimiter: "&", depth: 5, duplicates: "combine", ignoreQueryPrefix: false, interpretNumericEntities: false, parameterLimit: 1e3, parseArrays: true, plainObjects: false, strictNullHandling: false }, A = function(t3) {
  return t3.replace(/&#(\d+);/g, function(t4, e2) {
    return String.fromCharCode(parseInt(e2, 10));
  });
}, D = function(t3, e2) {
  return t3 && "string" == typeof t3 && e2.comma && t3.indexOf(",") > -1 ? t3.split(",") : t3;
}, k = function(t3, e2, o2, n2) {
  if (!t3) return;
  const r2 = o2.allowDots ? t3.replace(/\.([^.[]+)/g, "[$1]") : t3, i2 = /(\[[^[\]]*])/g;
  let s2 = o2.depth > 0 && /(\[[^[\]]*])/.exec(r2);
  const u2 = s2 ? r2.slice(0, s2.index) : r2, l2 = [];
  if (u2) {
    if (!o2.plainObjects && _.call(Object.prototype, u2) && !o2.allowPrototypes) return;
    l2.push(u2);
  }
  let a2 = 0;
  for (; o2.depth > 0 && null !== (s2 = i2.exec(r2)) && a2 < o2.depth; ) {
    if (a2 += 1, !o2.plainObjects && _.call(Object.prototype, s2[1].slice(1, -1)) && !o2.allowPrototypes) return;
    l2.push(s2[1]);
  }
  return s2 && l2.push("[" + r2.slice(s2.index) + "]"), function(t4, e3, o3, n3) {
    let r3 = n3 ? e3 : D(e3, o3);
    for (let e4 = t4.length - 1; e4 >= 0; --e4) {
      let n4;
      const i3 = t4[e4];
      if ("[]" === i3 && o3.parseArrays) n4 = c(r3) ? r3 : o3.allowEmptyArrays && ("" === r3 || o3.strictNullHandling && null === r3) ? [] : b([], r3, o3.arrayLimit, o3.plainObjects);
      else {
        n4 = o3.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
        const t5 = "[" === i3.charAt(0) && "]" === i3.charAt(i3.length - 1) ? i3.slice(1, -1) : i3, e5 = o3.decodeDotInKeys ? t5.replace(/%2E/g, ".") : t5, s3 = parseInt(e5, 10);
        o3.parseArrays || "" !== e5 ? !isNaN(s3) && i3 !== e5 && String(s3) === e5 && s3 >= 0 && o3.parseArrays && s3 <= o3.arrayLimit ? (n4 = [], n4[s3] = r3) : "__proto__" !== e5 && (n4[e5] = r3) : n4 = { 0: r3 };
      }
      r3 = n4;
    }
    return r3;
  }(l2, e2, o2, n2);
};
function N(t3, e2) {
  const o2 = /* @__PURE__ */ function(t4) {
    return S;
  }();
  if ("" === t3 || null == t3) return o2.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
  const n2 = "string" == typeof t3 ? function(t4, e3) {
    const o3 = { __proto__: null }, n3 = (e3.ignoreQueryPrefix ? t4.replace(/^\?/, "") : t4).split(e3.delimiter, Infinity === e3.parameterLimit ? void 0 : e3.parameterLimit);
    let r3, i3 = -1, s2 = e3.charset;
    if (e3.charsetSentinel) for (r3 = 0; r3 < n3.length; ++r3) 0 === n3[r3].indexOf("utf8=") && ("utf8=%E2%9C%93" === n3[r3] ? s2 = "utf-8" : "utf8=%26%2310003%3B" === n3[r3] && (s2 = "iso-8859-1"), i3 = r3, r3 = n3.length);
    for (r3 = 0; r3 < n3.length; ++r3) {
      if (r3 === i3) continue;
      const t5 = n3[r3], u2 = t5.indexOf("]="), l2 = -1 === u2 ? t5.indexOf("=") : u2 + 1;
      let c2, a2;
      -1 === l2 ? (c2 = e3.decoder(t5, S.decoder, s2, "key"), a2 = e3.strictNullHandling ? null : "") : (c2 = e3.decoder(t5.slice(0, l2), S.decoder, s2, "key"), a2 = m(D(t5.slice(l2 + 1), e3), function(t6) {
        return e3.decoder(t6, S.decoder, s2, "value");
      })), a2 && e3.interpretNumericEntities && "iso-8859-1" === s2 && (a2 = A(a2)), t5.indexOf("[]=") > -1 && (a2 = I(a2) ? [a2] : a2);
      const f2 = _.call(o3, c2);
      f2 && "combine" === e3.duplicates ? o3[c2] = b(o3[c2], a2, e3.arrayLimit, e3.plainObjects) : f2 && "last" !== e3.duplicates || (o3[c2] = a2);
    }
    return o3;
  }(t3, o2) : t3;
  let r2 = o2.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
  const i2 = Object.keys(n2);
  for (let e3 = 0; e3 < i2.length; ++e3) {
    const s2 = i2[e3], u2 = k(s2, n2[s2], o2, "string" == typeof t3);
    r2 = d(r2, u2, o2);
  }
  return true === o2.allowSparse ? r2 : function(t4) {
    const e3 = [{ obj: { o: t4 }, prop: "o" }], o3 = [];
    for (let t5 = 0; t5 < e3.length; ++t5) {
      const n3 = e3[t5], r3 = n3.obj[n3.prop], i3 = Object.keys(r3);
      for (let t6 = 0; t6 < i3.length; ++t6) {
        const n4 = i3[t6], s2 = r3[n4];
        "object" == typeof s2 && null !== s2 && -1 === o3.indexOf(s2) && (e3.push({ obj: r3, prop: n4 }), o3.push(s2));
      }
    }
    return function(t5) {
      for (; t5.length > 1; ) {
        const e4 = t5.pop(), o4 = e4.obj[e4.prop];
        if (s(o4)) {
          const t6 = [];
          for (let e5 = 0; e5 < o4.length; ++e5) void 0 !== o4[e5] && t6.push(o4[e5]);
          e4.obj[e4.prop] = t6;
        }
      }
    }(e3), t4;
  }(r2);
}
class x {
  constructor(t3, e2, o2) {
    var n2, r2;
    this.name = t3, this.definition = e2, this.bindings = null != (n2 = e2.bindings) ? n2 : {}, this.wheres = null != (r2 = e2.wheres) ? r2 : {}, this.config = o2;
  }
  get template() {
    const t3 = `${this.origin}/${this.definition.uri}`.replace(/\/+$/, "");
    return "" === t3 ? "/" : t3;
  }
  get origin() {
    return this.config.absolute ? this.definition.domain ? `${this.config.url.match(/^\w+:\/\//)[0]}${this.definition.domain}${this.config.port ? `:${this.config.port}` : ""}` : this.config.url : "";
  }
  get parameterSegments() {
    var t3, e2;
    return null != (t3 = null == (e2 = this.template.match(/{[^}?]+\??}/g)) ? void 0 : e2.map((t4) => ({ name: t4.replace(/{|\??}/g, ""), required: !/\?}$/.test(t4) }))) ? t3 : [];
  }
  matchesUrl(t3) {
    var e2;
    if (!this.definition.methods.includes("GET")) return false;
    const o2 = this.template.replace(/[.*+$()[\]]/g, "\\$&").replace(/(\/?){([^}?]*)(\??)}/g, (t4, e3, o3, n3) => {
      var r3;
      const i3 = `(?<${o3}>${(null == (r3 = this.wheres[o3]) ? void 0 : r3.replace(/(^\^)|(\$$)/g, "")) || "[^/?]+"})`;
      return n3 ? `(${e3}${i3})?` : `${e3}${i3}`;
    }).replace(/^\w+:\/\//, ""), [n2, r2] = t3.replace(/^\w+:\/\//, "").split("?"), i2 = null != (e2 = new RegExp(`^${o2}/?$`).exec(n2)) ? e2 : new RegExp(`^${o2}/?$`).exec(decodeURI(n2));
    if (i2) {
      for (const t4 in i2.groups) i2.groups[t4] = "string" == typeof i2.groups[t4] ? decodeURIComponent(i2.groups[t4]) : i2.groups[t4];
      return { params: i2.groups, query: N(r2) };
    }
    return false;
  }
  compile(t3) {
    return this.parameterSegments.length ? this.template.replace(/{([^}?]+)(\??)}/g, (e2, o2, n2) => {
      var r2, i2;
      if (!n2 && [null, void 0].includes(t3[o2])) throw new Error(`Ziggy error: '${o2}' parameter is required for route '${this.name}'.`);
      if (this.wheres[o2] && !new RegExp(`^${n2 ? `(${this.wheres[o2]})?` : this.wheres[o2]}$`).test(null != (i2 = t3[o2]) ? i2 : "")) throw new Error(`Ziggy error: '${o2}' parameter '${t3[o2]}' does not match required format '${this.wheres[o2]}' for route '${this.name}'.`);
      return encodeURI(null != (r2 = t3[o2]) ? r2 : "").replace(/%7C/g, "|").replace(/%25/g, "%").replace(/\$/g, "%24");
    }).replace(this.config.absolute ? /(\.[^/]+?)(\/\/)/ : /(^)(\/\/)/, "$1/").replace(/\/+$/, "") : this.template;
  }
}
class C extends String {
  constructor(e2, o2, n2 = true, r2) {
    if (super(), this.t = null != r2 ? r2 : "undefined" != typeof Ziggy ? Ziggy : null == globalThis ? void 0 : globalThis.Ziggy, !this.t && "undefined" != typeof document && document.getElementById("ziggy-routes-json") && (globalThis.Ziggy = JSON.parse(document.getElementById("ziggy-routes-json").textContent), this.t = globalThis.Ziggy), this.t = t({}, this.t, { absolute: n2 }), e2) {
      if (!this.t.routes[e2]) throw new Error(`Ziggy error: route '${e2}' is not in the route list.`);
      this.i = new x(e2, this.t.routes[e2], this.t), this.u = this.l(o2);
    }
  }
  toString() {
    const e2 = Object.keys(this.u).filter((t3) => !this.i.parameterSegments.some(({ name: e3 }) => e3 === t3)).filter((t3) => "_query" !== t3).reduce((e3, o2) => t({}, e3, { [o2]: this.u[o2] }), {});
    return this.i.compile(this.u) + function(t3, e3) {
      let o2 = t3;
      const i2 = function(t4) {
        if (!t4) return O;
        if (void 0 !== t4.allowEmptyArrays && "boolean" != typeof t4.allowEmptyArrays) throw new TypeError("`allowEmptyArrays` option can only be `true` or `false`, when provided");
        if (void 0 !== t4.encodeDotInKeys && "boolean" != typeof t4.encodeDotInKeys) throw new TypeError("`encodeDotInKeys` option can only be `true` or `false`, when provided");
        if (null != t4.encoder && "function" != typeof t4.encoder) throw new TypeError("Encoder has to be a function.");
        const e4 = t4.charset || O.charset;
        if (void 0 !== t4.charset && "utf-8" !== t4.charset && "iso-8859-1" !== t4.charset) throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
        let o3 = r;
        if (void 0 !== t4.format) {
          if (!g.call(n, t4.format)) throw new TypeError("Unknown format option provided.");
          o3 = t4.format;
        }
        const i3 = n[o3];
        let s3, u3 = O.filter;
        if (("function" == typeof t4.filter || v(t4.filter)) && (u3 = t4.filter), s3 = t4.arrayFormat in w ? t4.arrayFormat : "indices" in t4 ? t4.indices ? "indices" : "repeat" : O.arrayFormat, "commaRoundTrip" in t4 && "boolean" != typeof t4.commaRoundTrip) throw new TypeError("`commaRoundTrip` must be a boolean, or absent");
        return { addQueryPrefix: "boolean" == typeof t4.addQueryPrefix ? t4.addQueryPrefix : O.addQueryPrefix, allowDots: void 0 === t4.allowDots ? true === t4.encodeDotInKeys || O.allowDots : !!t4.allowDots, allowEmptyArrays: "boolean" == typeof t4.allowEmptyArrays ? !!t4.allowEmptyArrays : O.allowEmptyArrays, arrayFormat: s3, charset: e4, charsetSentinel: "boolean" == typeof t4.charsetSentinel ? t4.charsetSentinel : O.charsetSentinel, commaRoundTrip: t4.commaRoundTrip, delimiter: void 0 === t4.delimiter ? O.delimiter : t4.delimiter, encode: "boolean" == typeof t4.encode ? t4.encode : O.encode, encodeDotInKeys: "boolean" == typeof t4.encodeDotInKeys ? t4.encodeDotInKeys : O.encodeDotInKeys, encoder: "function" == typeof t4.encoder ? t4.encoder : O.encoder, encodeValuesOnly: "boolean" == typeof t4.encodeValuesOnly ? t4.encodeValuesOnly : O.encodeValuesOnly, filter: u3, format: o3, formatter: i3, serializeDate: "function" == typeof t4.serializeDate ? t4.serializeDate : O.serializeDate, skipNulls: "boolean" == typeof t4.skipNulls ? t4.skipNulls : O.skipNulls, sort: "function" == typeof t4.sort ? t4.sort : null, strictNullHandling: "boolean" == typeof t4.strictNullHandling ? t4.strictNullHandling : O.strictNullHandling };
      }(e3);
      let s2, u2;
      "function" == typeof i2.filter ? (u2 = i2.filter, o2 = u2("", o2)) : v(i2.filter) && (u2 = i2.filter, s2 = u2);
      const l2 = [];
      if ("object" != typeof o2 || null === o2) return "";
      const c2 = w[i2.arrayFormat], a2 = "comma" === c2 && i2.commaRoundTrip;
      s2 || (s2 = Object.keys(o2)), i2.sort && s2.sort(i2.sort);
      const f2 = /* @__PURE__ */ new WeakMap();
      for (let t4 = 0; t4 < s2.length; ++t4) {
        const e4 = s2[t4];
        i2.skipNulls && null === o2[e4] || $(l2, R(o2[e4], e4, c2, a2, i2.allowEmptyArrays, i2.strictNullHandling, i2.skipNulls, i2.encodeDotInKeys, i2.encode ? i2.encoder : null, i2.filter, i2.sort, i2.allowDots, i2.serializeDate, i2.format, i2.formatter, i2.encodeValuesOnly, i2.charset, f2));
      }
      const p2 = l2.join(i2.delimiter);
      let y2 = true === i2.addQueryPrefix ? "?" : "";
      return i2.charsetSentinel && (y2 += "iso-8859-1" === i2.charset ? "utf8=%26%2310003%3B&" : "utf8=%E2%9C%93&"), p2.length > 0 ? y2 + p2 : "";
    }(t({}, e2, this.u._query), { addQueryPrefix: true, arrayFormat: "indices", encodeValuesOnly: true, skipNulls: true, encoder: (t3, e3) => "boolean" == typeof t3 ? Number(t3) : e3(t3) });
  }
  p(e2) {
    e2 ? this.t.absolute && e2.startsWith("/") && (e2 = this.h().host + e2) : e2 = this.m();
    let o2 = {};
    const [n2, r2] = Object.entries(this.t.routes).find(([t3, n3]) => o2 = new x(t3, n3, this.t).matchesUrl(e2)) || [void 0, void 0];
    return t({ name: n2 }, o2, { route: r2 });
  }
  m() {
    const { host: t3, pathname: e2, search: o2 } = this.h();
    return (this.t.absolute ? t3 + e2 : e2.replace(this.t.url.replace(/^\w*:\/\/[^/]+/, ""), "").replace(/^\/+/, "/")) + o2;
  }
  current(e2, o2) {
    const { name: n2, params: r2, query: i2, route: s2 } = this.p();
    if (!e2) return n2;
    const u2 = new RegExp(`^${e2.replace(/\./g, "\\.").replace(/\*/g, ".*")}$`).test(n2);
    if ([null, void 0].includes(o2) || !u2) return u2;
    const l2 = new x(n2, s2, this.t);
    o2 = this.l(o2, l2);
    const c2 = t({}, r2, i2);
    if (Object.values(o2).every((t3) => !t3) && !Object.values(c2).some((t3) => void 0 !== t3)) return true;
    const a2 = (t3, e3) => Object.entries(t3).every(([t4, o3]) => Array.isArray(o3) && Array.isArray(e3[t4]) ? o3.every((o4) => e3[t4].includes(o4) || e3[t4].includes(decodeURIComponent(o4))) : "object" == typeof o3 && "object" == typeof e3[t4] && null !== o3 && null !== e3[t4] ? a2(o3, e3[t4]) : e3[t4] == o3 || e3[t4] == decodeURIComponent(o3));
    return a2(o2, c2);
  }
  h() {
    var t3, e2, o2, n2, r2, i2;
    const { host: s2 = "", pathname: u2 = "", search: l2 = "" } = "undefined" != typeof window ? window.location : {};
    return { host: null != (t3 = null == (e2 = this.t.location) ? void 0 : e2.host) ? t3 : s2, pathname: null != (o2 = null == (n2 = this.t.location) ? void 0 : n2.pathname) ? o2 : u2, search: null != (r2 = null == (i2 = this.t.location) ? void 0 : i2.search) ? r2 : l2 };
  }
  get params() {
    const { params: e2, query: o2 } = this.p();
    return t({}, e2, o2);
  }
  get routeParams() {
    return this.p().params;
  }
  get queryParams() {
    return this.p().query;
  }
  has(t3) {
    return this.t.routes.hasOwnProperty(t3);
  }
  l(e2 = {}, o2 = this.i) {
    null != e2 || (e2 = {}), e2 = ["string", "number"].includes(typeof e2) ? [e2] : e2;
    const n2 = o2.parameterSegments.filter(({ name: t3 }) => !this.t.defaults[t3]);
    return Array.isArray(e2) ? e2 = e2.reduce((e3, o3, r2) => t({}, e3, n2[r2] ? { [n2[r2].name]: o3 } : "object" == typeof o3 ? o3 : { [o3]: "" }), {}) : 1 !== n2.length || e2.hasOwnProperty(n2[0].name) || !e2.hasOwnProperty(Object.values(o2.bindings)[0]) && !e2.hasOwnProperty("id") || (e2 = { [n2[0].name]: e2 }), t({}, this.v(o2), this.j(e2, o2));
  }
  v(e2) {
    return e2.parameterSegments.filter(({ name: t3 }) => this.t.defaults[t3]).reduce((e3, { name: o2 }, n2) => t({}, e3, { [o2]: this.t.defaults[o2] }), {});
  }
  j(e2, { bindings: o2, parameterSegments: n2 }) {
    return Object.entries(e2).reduce((e3, [r2, i2]) => {
      if (!i2 || "object" != typeof i2 || Array.isArray(i2) || !n2.some(({ name: t3 }) => t3 === r2)) return t({}, e3, { [r2]: i2 });
      const s2 = i2.hasOwnProperty(o2[r2]) ? o2[r2] : i2.hasOwnProperty("id") ? "id" : void 0;
      if (void 0 === s2) throw new Error(`Ziggy error: object passed as '${r2}' parameter is missing route model binding key '${o2[r2]}'.`);
      return t({}, e3, { [r2]: i2[s2] });
    }, {});
  }
  valueOf() {
    return this.toString();
  }
}
function P(t3, e2, o2, n2) {
  const r2 = new C(t3, e2, o2, n2);
  return t3 ? r2.toString() : r2;
}
const U = { install(t3, e2) {
  const o2 = (t4, o3, n2, r2 = e2) => P(t4, o3, n2, r2);
  parseInt(t3.version) > 2 ? (t3.config.globalProperties.route = o2, t3.provide("route", o2)) : t3.mixin({ methods: { route: o2 } });
} };
const nav$1 = {
  home: "Home",
  dashboard: "Dashboard",
  organizations: "Organizations",
  roles: "Roles",
  persons: "Persons",
  orgChart: "Org Chart",
  profile: "Profile",
  login: "Log In",
  register: "Register",
  logout: "Log Out",
  activity_log: "Activity Log"
};
const landing$1 = {
  hero_title: "Visualize & Strengthen Your Organization",
  hero_subtitle: "OrgMatrix helps you map roles, assign people, plan succession, and identify risks — all in one powerful platform.",
  cta_start: "Get Started Free",
  cta_demo: "See How It Works",
  feature1_title: "Org Chart Visualization",
  feature1_desc: "Interactive, hierarchical org charts that update in real-time as you build your team structure.",
  feature2_title: "Role & People Management",
  feature2_desc: "Full CRUD for roles and persons with departments, criticality levels, and assignment tracking.",
  feature3_title: "Succession Planning",
  feature3_desc: "Identify critical roles, assign backups, and track readiness to ensure organizational continuity.",
  feature4_title: "Risk Analysis",
  feature4_desc: "Color-coded indicators highlight roles without backups and critical knowledge gaps.",
  feature5_title: "Multi-Language",
  feature5_desc: "Full support for English and German with easy language switching.",
  feature6_title: "Scenario Simulation",
  feature6_desc: "Simulate vacancies and analyze impact across your organization before decisions are made.",
  trusted_by: "Trusted by forward-thinking organizations",
  phase_label: "Roadmap",
  phase1: "Core MVP",
  phase1_desc: "Organization setup, role & people management, org chart visualization.",
  phase2: "Continuity Logic",
  phase2_desc: "Succession planning, readiness scoring, risk indicators.",
  phase3: "Scenario & Insight",
  phase3_desc: "Vacancy simulation, impact analysis, executive dashboards.",
  phase4: "Intelligence Layer",
  phase4_desc: "AI-powered suggestions, pattern detection, org health scoring.",
  phase5: "Enterprise Ready",
  phase5_desc: "RBAC, audit logs, multi-org support, HR system APIs.",
  footer_tagline: "Built by Allocore — organizational intelligence for modern leaders."
};
const auth$1 = {
  login_title: "Welcome Back",
  login_subtitle: "Sign in to your OrgMatrix account",
  register_title: "Create Account",
  register_subtitle: "Start organizing your team today",
  email: "Email",
  password: "Password",
  confirm_password: "Confirm Password",
  name: "Full Name",
  remember_me: "Remember me",
  forgot_password: "Forgot your password?",
  no_account: "Don't have an account?",
  has_account: "Already have an account?",
  sign_in: "Sign In",
  sign_up: "Sign Up",
  forgot_title: "Reset Password",
  forgot_subtitle: "Enter your email and we'll send a reset link",
  send_reset_link: "Send Reset Link"
};
const dashboard$1 = {
  title: "Dashboard",
  welcome: "Welcome back",
  no_orgs: "You haven't created any organizations yet.",
  create_first: "Create Your First Organization",
  total_roles: "Total Roles",
  total_people: "Total People",
  total_organizations: "Organizations",
  total_assignments: "Assignments",
  view_chart: "View Org Chart",
  manage: "Manage",
  analytics: "Analytics Overview",
  criticality_chart: "Roles by Criticality",
  department_chart: "Roles by Department",
  coverage_chart: "Role Coverage",
  recent_activity: "Recent Activity",
  risk_roles: "At-Risk Roles",
  risk_roles_desc: "High/critical roles without assignments",
  filled: "Filled",
  vacant: "Vacant",
  no_activity: "No activity yet"
};
const organizations$1 = {
  title: "Organizations",
  create: "New Organization",
  edit: "Edit Organization",
  name: "Organization Name",
  description: "Description",
  industry: "Industry",
  roles_count: "Roles",
  people_count: "People",
  no_orgs: "No organizations yet. Create one to get started.",
  delete_confirm: "Are you sure you want to delete this organization? This action cannot be undone.",
  stats: "Statistics",
  active_roles: "Active Roles",
  unassigned: "Unassigned Roles"
};
const roles$1 = {
  title: "Roles",
  create: "New Role",
  edit: "Edit Role",
  name: "Role Name",
  description: "Description",
  department: "Department",
  parent_role: "Reports To",
  none: "None (Top Level)",
  criticality: "Criticality",
  low: "Low",
  medium: "Medium",
  high: "High",
  critical: "Critical",
  is_active: "Active",
  assigned_to: "Assigned To",
  no_roles: "No roles defined yet.",
  assign_person: "Assign Person",
  primary: "Primary",
  delete_confirm: "Are you sure you want to delete this role?",
  coverage: "Coverage",
  no_backup: "No Backup",
  at_risk: "At Risk"
};
const persons$1 = {
  title: "People",
  create: "Add Person",
  edit: "Edit Person",
  first_name: "First Name",
  last_name: "Last Name",
  email: "Email",
  phone: "Phone",
  job_title: "Job Title",
  department: "Department",
  notes: "Notes",
  no_persons: "No people added yet.",
  assigned_roles: "Assigned Roles",
  delete_confirm: "Are you sure you want to remove this person?",
  avatar: "Profile Photo",
  upload_avatar: "Upload Photo"
};
const assignments$1 = {
  title: "Assign Person to Role",
  select_person: "Select Person",
  is_primary: "Primary Representative",
  start_date: "Start Date",
  end_date: "End Date",
  notes: "Notes",
  no_people: "No available people. Add people first.",
  current: "Current Assignments"
};
const chart$1 = {
  title: "Organization Chart",
  empty: "No roles defined. Add roles to see the org chart.",
  zoom_in: "Zoom In",
  zoom_out: "Zoom Out",
  reset: "Reset View",
  vacant: "Vacant",
  fullscreen: "Fullscreen",
  exit_fullscreen: "Exit Fullscreen",
  click_to_edit: "Click to edit"
};
const import_export$1 = {
  export_roles: "Export Roles CSV",
  export_people: "Export People CSV",
  import_roles: "Import Roles CSV",
  import_people: "Import People CSV",
  select_file: "Select CSV File",
  "import": "Import",
  "export": "Export"
};
const activity$1 = {
  title: "Activity Log",
  created: "Created",
  updated: "Updated",
  deleted: "Deleted",
  assigned: "Assigned",
  unassigned: "Unassigned",
  imported: "Imported",
  no_activity: "No activity recorded yet."
};
const common$1 = {
  save: "Save",
  cancel: "Cancel",
  "delete": "Delete",
  edit: "Edit",
  create: "Create",
  back: "Back",
  actions: "Actions",
  search: "Search...",
  loading: "Loading...",
  confirm: "Confirm",
  yes: "Yes",
  no: "No",
  filter: "Filter",
  all: "All",
  clear_filters: "Clear Filters",
  no_results: "No results found",
  dark_mode: "Dark Mode",
  light_mode: "Light Mode"
};
const en = {
  nav: nav$1,
  landing: landing$1,
  auth: auth$1,
  dashboard: dashboard$1,
  organizations: organizations$1,
  roles: roles$1,
  persons: persons$1,
  assignments: assignments$1,
  chart: chart$1,
  import_export: import_export$1,
  activity: activity$1,
  common: common$1
};
const nav = {
  home: "Startseite",
  dashboard: "Dashboard",
  organizations: "Organisationen",
  roles: "Rollen",
  persons: "Personen",
  orgChart: "Organigramm",
  profile: "Profil",
  login: "Anmelden",
  register: "Registrieren",
  logout: "Abmelden",
  activity_log: "Aktivitätsprotokoll"
};
const landing = {
  hero_title: "Ihre Organisation visualisieren & stärken",
  hero_subtitle: "OrgMatrix hilft Ihnen, Rollen zu strukturieren, Personen zuzuweisen, Nachfolge zu planen und Risiken zu erkennen — alles in einer leistungsstarken Plattform.",
  cta_start: "Kostenlos starten",
  cta_demo: "So funktioniert es",
  feature1_title: "Organigramm-Visualisierung",
  feature1_desc: "Interaktive, hierarchische Organigramme, die sich in Echtzeit aktualisieren.",
  feature2_title: "Rollen- & Personenverwaltung",
  feature2_desc: "Vollständige Verwaltung von Rollen und Personen mit Abteilungen, Kritikalitätsstufen und Zuweisungen.",
  feature3_title: "Nachfolgeplanung",
  feature3_desc: "Kritische Rollen identifizieren, Vertretungen zuweisen und Bereitschaft sicherstellen.",
  feature4_title: "Risikoanalyse",
  feature4_desc: "Farbcodierte Indikatoren zeigen Rollen ohne Vertretung und kritische Wissenslücken.",
  feature5_title: "Mehrsprachig",
  feature5_desc: "Vollständige Unterstützung für Englisch und Deutsch mit einfacher Sprachumschaltung.",
  feature6_title: "Szenario-Simulation",
  feature6_desc: "Simulieren Sie Vakanzen und analysieren Sie Auswirkungen, bevor Entscheidungen getroffen werden.",
  trusted_by: "Vertraut von zukunftsorientierten Organisationen",
  phase_label: "Roadmap",
  phase1: "Kern-MVP",
  phase1_desc: "Organisationseinrichtung, Rollen- und Personenverwaltung, Organigramm.",
  phase2: "Kontinuitätslogik",
  phase2_desc: "Nachfolgeplanung, Bereitschaftsbewertung, Risikoindikatoren.",
  phase3: "Szenario & Einblick",
  phase3_desc: "Vakanzsimulation, Auswirkungsanalyse, Führungskräfte-Dashboards.",
  phase4: "Intelligenz-Ebene",
  phase4_desc: "KI-gestützte Vorschläge, Mustererkennung, Org-Gesundheitsbewertung.",
  phase5: "Enterprise-fähig",
  phase5_desc: "RBAC, Audit-Logs, Multi-Org-Unterstützung, HR-System-APIs.",
  footer_tagline: "Entwickelt von Allocore — Organisationsintelligenz für moderne Führungskräfte."
};
const auth = {
  login_title: "Willkommen zurück",
  login_subtitle: "Melden Sie sich bei Ihrem OrgMatrix-Konto an",
  register_title: "Konto erstellen",
  register_subtitle: "Starten Sie noch heute mit der Organisation Ihres Teams",
  email: "E-Mail",
  password: "Passwort",
  confirm_password: "Passwort bestätigen",
  name: "Vollständiger Name",
  remember_me: "Angemeldet bleiben",
  forgot_password: "Passwort vergessen?",
  no_account: "Noch kein Konto?",
  has_account: "Bereits ein Konto?",
  sign_in: "Anmelden",
  sign_up: "Registrieren",
  forgot_title: "Passwort zurücksetzen",
  forgot_subtitle: "Geben Sie Ihre E-Mail ein und wir senden Ihnen einen Link",
  send_reset_link: "Link senden"
};
const dashboard = {
  title: "Dashboard",
  welcome: "Willkommen zurück",
  no_orgs: "Sie haben noch keine Organisationen erstellt.",
  create_first: "Erste Organisation erstellen",
  total_roles: "Gesamtrollen",
  total_people: "Gesamtpersonen",
  total_organizations: "Organisationen",
  total_assignments: "Zuweisungen",
  view_chart: "Organigramm anzeigen",
  manage: "Verwalten",
  analytics: "Analytik-Übersicht",
  criticality_chart: "Rollen nach Kritikalität",
  department_chart: "Rollen nach Abteilung",
  coverage_chart: "Rollenabdeckung",
  recent_activity: "Letzte Aktivitäten",
  risk_roles: "Gefährdete Rollen",
  risk_roles_desc: "Hohe/kritische Rollen ohne Zuweisungen",
  filled: "Besetzt",
  vacant: "Vakant",
  no_activity: "Noch keine Aktivitäten"
};
const organizations = {
  title: "Organisationen",
  create: "Neue Organisation",
  edit: "Organisation bearbeiten",
  name: "Organisationsname",
  description: "Beschreibung",
  industry: "Branche",
  roles_count: "Rollen",
  people_count: "Personen",
  no_orgs: "Noch keine Organisationen. Erstellen Sie eine, um zu beginnen.",
  delete_confirm: "Sind Sie sicher, dass Sie diese Organisation löschen möchten? Diese Aktion kann nicht rückgängig gemacht werden.",
  stats: "Statistiken",
  active_roles: "Aktive Rollen",
  unassigned: "Nicht zugewiesene Rollen"
};
const roles = {
  title: "Rollen",
  create: "Neue Rolle",
  edit: "Rolle bearbeiten",
  name: "Rollenname",
  description: "Beschreibung",
  department: "Abteilung",
  parent_role: "Berichtet an",
  none: "Keine (Oberste Ebene)",
  criticality: "Kritikalität",
  low: "Niedrig",
  medium: "Mittel",
  high: "Hoch",
  critical: "Kritisch",
  is_active: "Aktiv",
  assigned_to: "Zugewiesen an",
  no_roles: "Noch keine Rollen definiert.",
  assign_person: "Person zuweisen",
  primary: "Primär",
  delete_confirm: "Sind Sie sicher, dass Sie diese Rolle löschen möchten?",
  coverage: "Abdeckung",
  no_backup: "Keine Vertretung",
  at_risk: "Gefährdet"
};
const persons = {
  title: "Personen",
  create: "Person hinzufügen",
  edit: "Person bearbeiten",
  first_name: "Vorname",
  last_name: "Nachname",
  email: "E-Mail",
  phone: "Telefon",
  job_title: "Berufsbezeichnung",
  department: "Abteilung",
  notes: "Notizen",
  no_persons: "Noch keine Personen hinzugefügt.",
  assigned_roles: "Zugewiesene Rollen",
  delete_confirm: "Sind Sie sicher, dass Sie diese Person entfernen möchten?",
  avatar: "Profilfoto",
  upload_avatar: "Foto hochladen"
};
const assignments = {
  title: "Person einer Rolle zuweisen",
  select_person: "Person auswählen",
  is_primary: "Primäre Vertretung",
  start_date: "Startdatum",
  end_date: "Enddatum",
  notes: "Notizen",
  no_people: "Keine verfügbaren Personen. Fügen Sie zuerst Personen hinzu.",
  current: "Aktuelle Zuweisungen"
};
const chart = {
  title: "Organigramm",
  empty: "Keine Rollen definiert. Fügen Sie Rollen hinzu, um das Organigramm zu sehen.",
  zoom_in: "Vergrößern",
  zoom_out: "Verkleinern",
  reset: "Ansicht zurücksetzen",
  vacant: "Vakant",
  fullscreen: "Vollbild",
  exit_fullscreen: "Vollbild beenden",
  click_to_edit: "Klicken zum Bearbeiten"
};
const import_export = {
  export_roles: "Rollen CSV exportieren",
  export_people: "Personen CSV exportieren",
  import_roles: "Rollen CSV importieren",
  import_people: "Personen CSV importieren",
  select_file: "CSV-Datei auswählen",
  "import": "Importieren",
  "export": "Exportieren"
};
const activity = {
  title: "Aktivitätsprotokoll",
  created: "Erstellt",
  updated: "Aktualisiert",
  deleted: "Gelöscht",
  assigned: "Zugewiesen",
  unassigned: "Zuweisung entfernt",
  imported: "Importiert",
  no_activity: "Noch keine Aktivitäten aufgezeichnet."
};
const common = {
  save: "Speichern",
  cancel: "Abbrechen",
  "delete": "Löschen",
  edit: "Bearbeiten",
  create: "Erstellen",
  back: "Zurück",
  actions: "Aktionen",
  search: "Suchen...",
  loading: "Laden...",
  confirm: "Bestätigen",
  yes: "Ja",
  no: "Nein",
  filter: "Filter",
  all: "Alle",
  clear_filters: "Filter löschen",
  no_results: "Keine Ergebnisse gefunden",
  dark_mode: "Dunkelmodus",
  light_mode: "Hellmodus"
};
const de = {
  nav,
  landing,
  auth,
  dashboard,
  organizations,
  roles,
  persons,
  assignments,
  chart,
  import_export,
  activity,
  common
};
const i18n = createI18n({
  legacy: false,
  locale: "en",
  fallbackLocale: "en",
  messages: { en, de }
});
const appName = "OrgMatrix";
createServer(
  (page) => createInertiaApp({
    page,
    render: renderToString,
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.vue`, /* @__PURE__ */ Object.assign({ "./Pages/ActivityLog/Index.vue": () => import("./assets/Index-6rZgvOe1.js"), "./Pages/Assignments/Create.vue": () => import("./assets/Create-D7eOzpNM.js"), "./Pages/Auth/ConfirmPassword.vue": () => import("./assets/ConfirmPassword-CEOaFOKq.js"), "./Pages/Auth/ForgotPassword.vue": () => import("./assets/ForgotPassword-C4oexJkq.js"), "./Pages/Auth/Login.vue": () => import("./assets/Login-2SUo1cb1.js"), "./Pages/Auth/Register.vue": () => import("./assets/Register-CwZd1h6G.js"), "./Pages/Auth/ResetPassword.vue": () => import("./assets/ResetPassword-58H4tbyg.js"), "./Pages/Auth/VerifyEmail.vue": () => import("./assets/VerifyEmail-Sh_cV20p.js"), "./Pages/Dashboard.vue": () => import("./assets/Dashboard-Ci18P7DJ.js"), "./Pages/OrgChart/Index.vue": () => import("./assets/Index-fENg3r-o.js"), "./Pages/Organizations/Create.vue": () => import("./assets/Create-ChNv_2fR.js"), "./Pages/Organizations/Edit.vue": () => import("./assets/Edit-DRY4C4t7.js"), "./Pages/Organizations/Index.vue": () => import("./assets/Index-B_ryUUnr.js"), "./Pages/Organizations/Show.vue": () => import("./assets/Show-DqeM5nGC.js"), "./Pages/Persons/Create.vue": () => import("./assets/Create-BqY_TaEF.js"), "./Pages/Persons/Edit.vue": () => import("./assets/Edit-i-oZx8OC.js"), "./Pages/Persons/Index.vue": () => import("./assets/Index-Ml0ffeNF.js"), "./Pages/Profile/Edit.vue": () => import("./assets/Edit-CqYdFhwe.js"), "./Pages/Profile/Partials/DeleteUserForm.vue": () => import("./assets/DeleteUserForm-BjKvmK82.js"), "./Pages/Profile/Partials/UpdatePasswordForm.vue": () => import("./assets/UpdatePasswordForm-Dit84Uro.js"), "./Pages/Profile/Partials/UpdateProfileInformationForm.vue": () => import("./assets/UpdateProfileInformationForm-BnkjDMej.js"), "./Pages/Roles/Create.vue": () => import("./assets/Create-UnooNnFZ.js"), "./Pages/Roles/Edit.vue": () => import("./assets/Edit-BBPk_OzI.js"), "./Pages/Roles/Index.vue": () => import("./assets/Index-Dg4sFK63.js"), "./Pages/Welcome.vue": () => import("./assets/Welcome-DCWiwsZV.js") })),
    setup({ App, props, plugin }) {
      const locale = page.props.locale || "en";
      i18n.global.locale.value = locale;
      return createSSRApp({ render: () => h$1(App, props) }).use(plugin).use(U, {
        ...page.props.ziggy,
        location: new URL(page.props.ziggy.location)
      }).use(i18n);
    }
  })
);
