'use strict';
(self.webpackChunkcasper = self.webpackChunkcasper || []).push([
  [179],
  {
    6551: (En, cr, ot) => {
      ot.d(cr, {
        B$: () => Wt,
        Bq: () => Or,
        CG: () => mt,
        GD: () => Vi,
        HE: () => Tr,
        HJ: () => Hi,
        Jf: () => Ft,
        Jj: () => gt,
        Q6: () => st,
        Tz: () => rn,
        Wf: () => fn,
        ZP: () => zi,
        _R: () => Un,
        c: () => Re,
        g1: () => be,
        hZ: () => ht,
        rR: () => qc,
        u3: () => zc,
        vj: () => ct,
        zZ: () => Ue,
      });
      var Ie = ot(9671);
      let c;
      En = ot.hmd(En);
      const Ae = new Array(128).fill(void 0);
      function B(v) {
        return Ae[v];
      }
      Ae.push(void 0, null, !0, !1);
      let Le = Ae.length;
      function I(v) {
        const s = B(v);
        return (
          (function zt(v) {
            v < 132 || ((Ae[v] = Le), (Le = v));
          })(v),
          s
        );
      }
      const ft =
        typeof TextDecoder < 'u'
          ? new TextDecoder('utf-8', { ignoreBOM: !0, fatal: !0 })
          : {
              decode: () => {
                throw Error('TextDecoder not available');
              },
            };
      typeof TextDecoder < 'u' && ft.decode();
      let $e = null;
      function et() {
        return (
          (null === $e || 0 === $e.byteLength) &&
            ($e = new Uint8Array(c.memory.buffer)),
          $e
        );
      }
      function O(v, s) {
        return (v >>>= 0), ft.decode(et().subarray(v, v + s));
      }
      function H(v) {
        Le === Ae.length && Ae.push(Ae.length + 1);
        const s = Le;
        return (Le = Ae[s]), (Ae[s] = v), s;
      }
      let D = 0;
      const co =
          typeof TextEncoder < 'u'
            ? new TextEncoder('utf-8')
            : {
                encode: () => {
                  throw Error('TextEncoder not available');
                },
              },
        $c =
          'function' == typeof co.encodeInto
            ? function (v, s) {
                return co.encodeInto(v, s);
              }
            : function (v, s) {
                const l = co.encode(v);
                return s.set(l), { read: v.length, written: l.length };
              };
      function E(v, s, l) {
        if (void 0 === l) {
          const x = co.encode(v),
            W = s(x.length, 1) >>> 0;
          return (
            et()
              .subarray(W, W + x.length)
              .set(x),
            (D = x.length),
            W
          );
        }
        let _ = v.length,
          g = s(_, 1) >>> 0;
        const h = et();
        let S = 0;
        for (; S < _; S++) {
          const x = v.charCodeAt(S);
          if (x > 127) break;
          h[g + S] = x;
        }
        if (S !== _) {
          0 !== S && (v = v.slice(S)),
            (g = l(g, _, (_ = S + 3 * v.length), 1) >>> 0);
          const x = et().subarray(g + S, g + _);
          S += $c(v, x).written;
        }
        return (D = S), g;
      }
      function k(v) {
        return null == v;
      }
      let Cn = null;
      function y() {
        return (
          (null === Cn || 0 === Cn.byteLength) &&
            (Cn = new Int32Array(c.memory.buffer)),
          Cn
        );
      }
      function kr(v) {
        const s = typeof v;
        if ('number' == s || 'boolean' == s || null == v) return `${v}`;
        if ('string' == s) return `"${v}"`;
        if ('symbol' == s) {
          const g = v.description;
          return null == g ? 'Symbol' : `Symbol(${g})`;
        }
        if ('function' == s) {
          const g = v.name;
          return 'string' == typeof g && g.length > 0
            ? `Function(${g})`
            : 'Function';
        }
        if (Array.isArray(v)) {
          const g = v.length;
          let h = '[';
          g > 0 && (h += kr(v[0]));
          for (let S = 1; S < g; S++) h += ', ' + kr(v[S]);
          return (h += ']'), h;
        }
        const l = /\[object ([^\]]+)\]/.exec(toString.call(v));
        let _;
        if (!(l.length > 1)) return toString.call(v);
        if (((_ = l[1]), 'Object' == _))
          try {
            return 'Object(' + JSON.stringify(v) + ')';
          } catch {
            return 'Object';
          }
        return v instanceof Error ? `${v.name}: ${v.message}\n${v.stack}` : _;
      }
      function ys(v, s, l) {
        c._dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h85cf310ee8e1f41c(
          v,
          s,
          H(l)
        );
      }
      function Ct(v, s) {
        const l = s(1 * v.length, 1) >>> 0;
        return et().set(v, l / 1), (D = v.length), l;
      }
      function P(v, s) {
        if (!(v instanceof s))
          throw new Error(`expected instance of ${s.name}`);
        return v.ptr;
      }
      function qc(v) {
        let s, l;
        try {
          const h = c.__wbindgen_add_to_stack_pointer(-16),
            S = E(v, c.__wbindgen_malloc, c.__wbindgen_realloc);
          c.hexToString(h, S, D);
          var _ = y()[h / 4 + 0],
            g = y()[h / 4 + 1];
          return (s = _), (l = g), O(_, g);
        } finally {
          c.__wbindgen_add_to_stack_pointer(16), c.__wbindgen_free(s, l, 1);
        }
      }
      function Hi(v) {
        let s, l;
        try {
          const h = c.__wbindgen_add_to_stack_pointer(-16),
            S = E(v, c.__wbindgen_malloc, c.__wbindgen_realloc);
          c.motesToCSPR(h, S, D);
          var _ = y()[h / 4 + 0],
            g = y()[h / 4 + 1];
          return (s = _), (l = g), O(_, g);
        } finally {
          c.__wbindgen_add_to_stack_pointer(16), c.__wbindgen_free(s, l, 1);
        }
      }
      function ct(v, s) {
        return I(c.jsonPrettyPrint(H(v), k(s) ? 3 : s));
      }
      function Vi(v) {
        const s = E(v, c.__wbindgen_malloc, c.__wbindgen_realloc);
        return I(c.privateToPublicKey(s, D));
      }
      function zc() {
        return I(c.getTimestamp());
      }
      function Ge(v, s) {
        try {
          return v.apply(this, s);
        } catch (l) {
          c.__wbindgen_exn_store(H(l));
        }
      }
      const Tr = Object.freeze({
        Low: 0,
        0: 'Low',
        Medium: 1,
        1: 'Medium',
        High: 2,
        2: 'High',
      });
      class pt {
        static __wrap(s) {
          s >>>= 0;
          const l = Object.create(pt.prototype);
          return (l.__wbg_ptr = s), l;
        }
        __destroy_into_raw() {
          const s = this.__wbg_ptr;
          return (this.__wbg_ptr = 0), s;
        }
        free() {
          const s = this.__destroy_into_raw();
          c.__wbg_accounthash_free(s);
        }
        constructor(s) {
          try {
            const h = c.__wbindgen_add_to_stack_pointer(-16),
              S = E(s, c.__wbindgen_malloc, c.__wbindgen_realloc);
            c.accounthash_new(h, S, D);
            var l = y()[h / 4 + 0],
              _ = y()[h / 4 + 1];
            if (y()[h / 4 + 2]) throw I(_);
            return pt.__wrap(l);
          } finally {
            c.__wbindgen_add_to_stack_pointer(16);
          }
        }
        static fromFormattedStr(s) {
          try {
            const h = c.__wbindgen_add_to_stack_pointer(-16),
              S = E(s, c.__wbindgen_malloc, c.__wbindgen_realloc);
            c.accounthash_fromFormattedStr(h, S, D);
            var l = y()[h / 4 + 0],
              _ = y()[h / 4 + 1];
            if (y()[h / 4 + 2]) throw I(_);
            return pt.__wrap(l);
          } finally {
            c.__wbindgen_add_to_stack_pointer(16);
          }
        }
        static fromPublicKey(s) {
          P(s, pn);
          var l = s.__destroy_into_raw();
          const _ = c.accounthash_fromPublicKey(l);
          return pt.__wrap(_);
        }
        toFormattedString() {
          let s, l;
          try {
            const h = c.__wbindgen_add_to_stack_pointer(-16);
            c.accounthash_toFormattedString(h, this.__wbg_ptr);
            var _ = y()[h / 4 + 0],
              g = y()[h / 4 + 1];
            return (s = _), (l = g), O(_, g);
          } finally {
            c.__wbindgen_add_to_stack_pointer(16), c.__wbindgen_free(s, l, 1);
          }
        }
        static fromUint8Array(s) {
          const l = Ct(s, c.__wbindgen_malloc),
            g = c.accounthash_fromUint8Array(l, D);
          return pt.__wrap(g);
        }
        toJson() {
          return I(c.accounthash_toJson(this.__wbg_ptr));
        }
      }
      class lr {
        static __wrap(s) {
          s >>>= 0;
          const l = Object.create(lr.prototype);
          return (l.__wbg_ptr = s), l;
        }
        __destroy_into_raw() {
          const s = this.__wbg_ptr;
          return (this.__wbg_ptr = 0), s;
        }
        free() {
          const s = this.__destroy_into_raw();
          c.__wbg_accountidentifier_free(s);
        }
        constructor(s) {
          P(s, pn);
          var l = s.__destroy_into_raw();
          const _ = c.accountidentifier_fromPublicKey(l);
          return lr.__wrap(_);
        }
        static fromAccountHash(s) {
          P(s, pt);
          var l = s.__destroy_into_raw();
          const _ = c.accountidentifier_fromAccountHash(l);
          return lr.__wrap(_);
        }
      }
      class Gt {
        static __wrap(s) {
          s >>>= 0;
          const l = Object.create(Gt.prototype);
          return (l.__wbg_ptr = s), l;
        }
        __destroy_into_raw() {
          const s = this.__wbg_ptr;
          return (this.__wbg_ptr = 0), s;
        }
        free() {
          const s = this.__destroy_into_raw();
          c.__wbg_argssimple_free(s);
        }
      }
      class st {
        static __wrap(s) {
          s >>>= 0;
          const l = Object.create(st.prototype);
          return (l.__wbg_ptr = s), l;
        }
        __destroy_into_raw() {
          const s = this.__wbg_ptr;
          return (this.__wbg_ptr = 0), s;
        }
        free() {
          const s = this.__destroy_into_raw();
          c.__wbg_blockhash_free(s);
        }
        constructor(s) {
          try {
            const h = c.__wbindgen_add_to_stack_pointer(-16),
              S = E(s, c.__wbindgen_malloc, c.__wbindgen_realloc);
            c.blockhash_new(h, S, D);
            var l = y()[h / 4 + 0],
              _ = y()[h / 4 + 1];
            if (y()[h / 4 + 2]) throw I(_);
            return st.__wrap(l);
          } finally {
            c.__wbindgen_add_to_stack_pointer(16);
          }
        }
        static fromDigest(s) {
          try {
            const S = c.__wbindgen_add_to_stack_pointer(-16);
            P(s, Ue);
            var l = s.__destroy_into_raw();
            c.blockhash_fromDigest(S, l);
            var _ = y()[S / 4 + 0],
              g = y()[S / 4 + 1];
            if (y()[S / 4 + 2]) throw I(g);
            return st.__wrap(_);
          } finally {
            c.__wbindgen_add_to_stack_pointer(16);
          }
        }
        toJson() {
          return I(c.blockhash_toJson(this.__wbg_ptr));
        }
        toString() {
          let s, l;
          try {
            const h = c.__wbindgen_add_to_stack_pointer(-16);
            c.blockhash_toString(h, this.__wbg_ptr);
            var _ = y()[h / 4 + 0],
              g = y()[h / 4 + 1];
            return (s = _), (l = g), O(_, g);
          } finally {
            c.__wbindgen_add_to_stack_pointer(16), c.__wbindgen_free(s, l, 1);
          }
        }
      }
      class Re {
        static __wrap(s) {
          s >>>= 0;
          const l = Object.create(Re.prototype);
          return (l.__wbg_ptr = s), l;
        }
        __destroy_into_raw() {
          const s = this.__wbg_ptr;
          return (this.__wbg_ptr = 0), s;
        }
        free() {
          const s = this.__destroy_into_raw();
          c.__wbg_blockidentifier_free(s);
        }
        constructor(s) {
          P(s, Re);
          var l = s.__destroy_into_raw();
          const _ = c.blockidentifier_new(l);
          return Re.__wrap(_);
        }
        static from_hash(s) {
          P(s, st);
          var l = s.__destroy_into_raw();
          const _ = c.blockidentifier_from_hash(l);
          return Re.__wrap(_);
        }
        static fromHeight(s) {
          const l = c.blockidentifier_fromHeight(s);
          return Re.__wrap(l);
        }
        toJson() {
          return I(c.blockidentifier_toJson(this.__wbg_ptr));
        }
      }
      class gt {
        static __wrap(s) {
          s >>>= 0;
          const l = Object.create(gt.prototype);
          return (l.__wbg_ptr = s), l;
        }
        __destroy_into_raw() {
          const s = this.__wbg_ptr;
          return (this.__wbg_ptr = 0), s;
        }
        free() {
          const s = this.__destroy_into_raw();
          c.__wbg_bytes_free(s);
        }
        constructor() {
          const s = c.bytes_new();
          return gt.__wrap(s);
        }
        static fromUint8Array(s) {
          const l = c.bytes_fromUint8Array(H(s));
          return gt.__wrap(l);
        }
      }
      class In {
        static __wrap(s) {
          s >>>= 0;
          const l = Object.create(In.prototype);
          return (l.__wbg_ptr = s), l;
        }
        __destroy_into_raw() {
          const s = this.__wbg_ptr;
          return (this.__wbg_ptr = 0), s;
        }
        free() {
          const s = this.__destroy_into_raw();
          c.__wbg_contracthash_free(s);
        }
        constructor(s) {
          try {
            const h = c.__wbindgen_add_to_stack_pointer(-16),
              S = E(s, c.__wbindgen_malloc, c.__wbindgen_realloc);
            c.contracthash_fromString(h, S, D);
            var l = y()[h / 4 + 0],
              _ = y()[h / 4 + 1];
            if (y()[h / 4 + 2]) throw I(_);
            return In.__wrap(l);
          } finally {
            c.__wbindgen_add_to_stack_pointer(16);
          }
        }
        static fromFormattedStr(s) {
          try {
            const h = c.__wbindgen_add_to_stack_pointer(-16),
              S = E(s, c.__wbindgen_malloc, c.__wbindgen_realloc);
            c.contracthash_fromFormattedStr(h, S, D);
            var l = y()[h / 4 + 0],
              _ = y()[h / 4 + 1];
            if (y()[h / 4 + 2]) throw I(_);
            return In.__wrap(l);
          } finally {
            c.__wbindgen_add_to_stack_pointer(16);
          }
        }
        toFormattedString() {
          let s, l;
          try {
            const h = c.__wbindgen_add_to_stack_pointer(-16);
            c.contracthash_toFormattedString(h, this.__wbg_ptr);
            var _ = y()[h / 4 + 0],
              g = y()[h / 4 + 1];
            return (s = _), (l = g), O(_, g);
          } finally {
            c.__wbindgen_add_to_stack_pointer(16), c.__wbindgen_free(s, l, 1);
          }
        }
        static fromUint8Array(s) {
          const l = Ct(s, c.__wbindgen_malloc),
            g = c.contracthash_fromUint8Array(l, D);
          return In.__wrap(g);
        }
      }
      class ur {
        static __wrap(s) {
          s >>>= 0;
          const l = Object.create(ur.prototype);
          return (l.__wbg_ptr = s), l;
        }
        __destroy_into_raw() {
          const s = this.__wbg_ptr;
          return (this.__wbg_ptr = 0), s;
        }
        free() {
          const s = this.__destroy_into_raw();
          c.__wbg_contractpackagehash_free(s);
        }
        constructor(s) {
          try {
            const h = c.__wbindgen_add_to_stack_pointer(-16),
              S = E(s, c.__wbindgen_malloc, c.__wbindgen_realloc);
            c.contractpackagehash_fromString(h, S, D);
            var l = y()[h / 4 + 0],
              _ = y()[h / 4 + 1];
            if (y()[h / 4 + 2]) throw I(_);
            return ur.__wrap(l);
          } finally {
            c.__wbindgen_add_to_stack_pointer(16);
          }
        }
        static fromFormattedStr(s) {
          try {
            const h = c.__wbindgen_add_to_stack_pointer(-16),
              S = E(s, c.__wbindgen_malloc, c.__wbindgen_realloc);
            c.contractpackagehash_fromFormattedStr(h, S, D);
            var l = y()[h / 4 + 0],
              _ = y()[h / 4 + 1];
            if (y()[h / 4 + 2]) throw I(_);
            return ur.__wrap(l);
          } finally {
            c.__wbindgen_add_to_stack_pointer(16);
          }
        }
        toFormattedString() {
          let s, l;
          try {
            const h = c.__wbindgen_add_to_stack_pointer(-16);
            c.contractpackagehash_toFormattedString(h, this.__wbg_ptr);
            var _ = y()[h / 4 + 0],
              g = y()[h / 4 + 1];
            return (s = _), (l = g), O(_, g);
          } finally {
            c.__wbindgen_add_to_stack_pointer(16), c.__wbindgen_free(s, l, 1);
          }
        }
        static fromUint8Array(s) {
          const l = Ct(s, c.__wbindgen_malloc),
            g = c.contractpackagehash_fromUint8Array(l, D);
          return ur.__wrap(g);
        }
      }
      class be {
        static __wrap(s) {
          s >>>= 0;
          const l = Object.create(be.prototype);
          return (l.__wbg_ptr = s), l;
        }
        __destroy_into_raw() {
          const s = this.__wbg_ptr;
          return (this.__wbg_ptr = 0), s;
        }
        free() {
          const s = this.__destroy_into_raw();
          c.__wbg_deploy_free(s);
        }
        constructor(s) {
          const l = c.deploy_new(H(s));
          return be.__wrap(l);
        }
        toJson() {
          return I(c.deploy_toJson(this.__wbg_ptr));
        }
        to_json() {
          let s, l;
          try {
            const te = c.__wbindgen_add_to_stack_pointer(-16);
            c.deploy_to_json(te, this.__wbg_ptr);
            var _ = y()[te / 4 + 0],
              g = y()[te / 4 + 1],
              h = y()[te / 4 + 2],
              S = y()[te / 4 + 3],
              x = _,
              W = g;
            if (S) throw ((x = 0), (W = 0), I(h));
            return (s = x), (l = W), O(x, W);
          } finally {
            c.__wbindgen_add_to_stack_pointer(16), c.__wbindgen_free(s, l, 1);
          }
        }
        static withPaymentAndSession(s, l, _) {
          try {
            const ae = c.__wbindgen_add_to_stack_pointer(-16);
            P(s, ht);
            var g = s.__destroy_into_raw();
            P(l, Wt);
            var h = l.__destroy_into_raw();
            P(_, Ft);
            var S = _.__destroy_into_raw();
            c.deploy_withPaymentAndSession(ae, g, h, S);
            var x = y()[ae / 4 + 0],
              W = y()[ae / 4 + 1];
            if (y()[ae / 4 + 2]) throw I(W);
            return be.__wrap(x);
          } finally {
            c.__wbindgen_add_to_stack_pointer(16);
          }
        }
        static withTransfer(s, l, _, g, h) {
          try {
            const xe = c.__wbindgen_add_to_stack_pointer(-16),
              St = E(s, c.__wbindgen_malloc, c.__wbindgen_realloc),
              Mt = D,
              ce = E(l, c.__wbindgen_malloc, c.__wbindgen_realloc),
              wt = D;
            var S = k(_) ? 0 : E(_, c.__wbindgen_malloc, c.__wbindgen_realloc),
              x = D;
            P(g, ht);
            var W = g.__destroy_into_raw();
            P(h, Ft);
            var te = h.__destroy_into_raw();
            c.deploy_withTransfer(xe, St, Mt, ce, wt, S, x, W, te);
            var ae = y()[xe / 4 + 0],
              Te = y()[xe / 4 + 1];
            if (y()[xe / 4 + 2]) throw I(Te);
            return be.__wrap(ae);
          } finally {
            c.__wbindgen_add_to_stack_pointer(16);
          }
        }
        withTTL(s, l) {
          const _ = E(s, c.__wbindgen_malloc, c.__wbindgen_realloc),
            g = D;
          var h = k(l) ? 0 : E(l, c.__wbindgen_malloc, c.__wbindgen_realloc);
          const x = c.deploy_withTTL(this.__wbg_ptr, _, g, h, D);
          return be.__wrap(x);
        }
        withTimestamp(s, l) {
          const _ = E(s, c.__wbindgen_malloc, c.__wbindgen_realloc),
            g = D;
          var h = k(l) ? 0 : E(l, c.__wbindgen_malloc, c.__wbindgen_realloc);
          const x = c.deploy_withTimestamp(this.__wbg_ptr, _, g, h, D);
          return be.__wrap(x);
        }
        withChainName(s, l) {
          const _ = E(s, c.__wbindgen_malloc, c.__wbindgen_realloc),
            g = D;
          var h = k(l) ? 0 : E(l, c.__wbindgen_malloc, c.__wbindgen_realloc);
          const x = c.deploy_withChainName(this.__wbg_ptr, _, g, h, D);
          return be.__wrap(x);
        }
        withAccount(s, l) {
          P(s, pn);
          var _ = s.__destroy_into_raw(),
            g = k(l) ? 0 : E(l, c.__wbindgen_malloc, c.__wbindgen_realloc);
          const S = c.deploy_withAccount(this.__wbg_ptr, _, g, D);
          return be.__wrap(S);
        }
        withEntryPointName(s, l) {
          const _ = E(s, c.__wbindgen_malloc, c.__wbindgen_realloc),
            g = D;
          var h = k(l) ? 0 : E(l, c.__wbindgen_malloc, c.__wbindgen_realloc);
          const x = c.deploy_withEntryPointName(this.__wbg_ptr, _, g, h, D);
          return be.__wrap(x);
        }
        withHash(s, l) {
          P(s, In);
          var _ = s.__destroy_into_raw(),
            g = k(l) ? 0 : E(l, c.__wbindgen_malloc, c.__wbindgen_realloc);
          const S = c.deploy_withHash(this.__wbg_ptr, _, g, D);
          return be.__wrap(S);
        }
        withPackageHash(s, l) {
          P(s, ur);
          var _ = s.__destroy_into_raw(),
            g = k(l) ? 0 : E(l, c.__wbindgen_malloc, c.__wbindgen_realloc);
          const S = c.deploy_withPackageHash(this.__wbg_ptr, _, g, D);
          return be.__wrap(S);
        }
        withModuleBytes(s, l) {
          P(s, gt);
          var _ = s.__destroy_into_raw(),
            g = k(l) ? 0 : E(l, c.__wbindgen_malloc, c.__wbindgen_realloc);
          const S = c.deploy_withModuleBytes(this.__wbg_ptr, _, g, D);
          return be.__wrap(S);
        }
        withSecretKey(s) {
          var l = k(s) ? 0 : E(s, c.__wbindgen_malloc, c.__wbindgen_realloc);
          const g = c.deploy_withSecretKey(this.__wbg_ptr, l, D);
          return be.__wrap(g);
        }
        withStandardPayment(s, l) {
          const _ = E(s, c.__wbindgen_malloc, c.__wbindgen_realloc),
            g = D;
          var h = k(l) ? 0 : E(l, c.__wbindgen_malloc, c.__wbindgen_realloc);
          const x = c.deploy_withStandardPayment(this.__wbg_ptr, _, g, h, D);
          return be.__wrap(x);
        }
        withPayment(s, l) {
          var _ = k(l) ? 0 : E(l, c.__wbindgen_malloc, c.__wbindgen_realloc),
            g = D;
          const h = c.deploy_withPayment(this.__wbg_ptr, H(s), _, g);
          return be.__wrap(h);
        }
        withSession(s, l) {
          var _ = k(l) ? 0 : E(l, c.__wbindgen_malloc, c.__wbindgen_realloc),
            g = D;
          const h = c.deploy_withSession(this.__wbg_ptr, H(s), _, g);
          return be.__wrap(h);
        }
        validateDeploySize() {
          return 0 !== c.deploy_validateDeploySize(this.__wbg_ptr);
        }
        isValid() {
          return 0 !== c.deploy_isValid(this.__wbg_ptr);
        }
        hasValidHash() {
          return 0 !== c.deploy_hasValidHash(this.__wbg_ptr);
        }
        isExpired() {
          return 0 !== c.deploy_isExpired(this.__wbg_ptr);
        }
        sign(s) {
          const l = E(s, c.__wbindgen_malloc, c.__wbindgen_realloc),
            g = c.deploy_sign(this.__wbg_ptr, l, D);
          return be.__wrap(g);
        }
        footprint() {
          return I(c.deploy_footprint(this.__wbg_ptr));
        }
        approvalsHash() {
          return I(c.deploy_approvalsHash(this.__wbg_ptr));
        }
        isTransfer() {
          return 0 !== c.deploy_isTransfer(this.__wbg_ptr);
        }
        isStandardPayment(s) {
          return 0 !== c.deploy_isStandardPayment(this.__wbg_ptr, s);
        }
        isStoredContract() {
          return 0 !== c.deploy_isStoredContract(this.__wbg_ptr);
        }
        isStoredContractPackage() {
          return 0 !== c.deploy_isStoredContractPackage(this.__wbg_ptr);
        }
        isModuleBytes() {
          return 0 !== c.deploy_isModuleBytes(this.__wbg_ptr);
        }
        isByName() {
          return 0 !== c.deploy_isByName(this.__wbg_ptr);
        }
        byName() {
          try {
            const _ = c.__wbindgen_add_to_stack_pointer(-16);
            c.deploy_byName(_, this.__wbg_ptr);
            var s = y()[_ / 4 + 0],
              l = y()[_ / 4 + 1];
            let g;
            return (
              0 !== s && ((g = O(s, l).slice()), c.__wbindgen_free(s, 1 * l)), g
            );
          } finally {
            c.__wbindgen_add_to_stack_pointer(16);
          }
        }
        entryPointName() {
          let s, l;
          try {
            const h = c.__wbindgen_add_to_stack_pointer(-16);
            c.deploy_entryPointName(h, this.__wbg_ptr);
            var _ = y()[h / 4 + 0],
              g = y()[h / 4 + 1];
            return (s = _), (l = g), O(_, g);
          } finally {
            c.__wbindgen_add_to_stack_pointer(16), c.__wbindgen_free(s, l, 1);
          }
        }
        TTL() {
          let s, l;
          try {
            const h = c.__wbindgen_add_to_stack_pointer(-16);
            c.deploy_TTL(h, this.__wbg_ptr);
            var _ = y()[h / 4 + 0],
              g = y()[h / 4 + 1];
            return (s = _), (l = g), O(_, g);
          } finally {
            c.__wbindgen_add_to_stack_pointer(16), c.__wbindgen_free(s, l, 1);
          }
        }
        Timestamp() {
          let s, l;
          try {
            const h = c.__wbindgen_add_to_stack_pointer(-16);
            c.deploy_Timestamp(h, this.__wbg_ptr);
            var _ = y()[h / 4 + 0],
              g = y()[h / 4 + 1];
            return (s = _), (l = g), O(_, g);
          } finally {
            c.__wbindgen_add_to_stack_pointer(16), c.__wbindgen_free(s, l, 1);
          }
        }
        chainName() {
          let s, l;
          try {
            const h = c.__wbindgen_add_to_stack_pointer(-16);
            c.deploy_chainName(h, this.__wbg_ptr);
            var _ = y()[h / 4 + 0],
              g = y()[h / 4 + 1];
            return (s = _), (l = g), O(_, g);
          } finally {
            c.__wbindgen_add_to_stack_pointer(16), c.__wbindgen_free(s, l, 1);
          }
        }
        account() {
          let s, l;
          try {
            const h = c.__wbindgen_add_to_stack_pointer(-16);
            c.deploy_account(h, this.__wbg_ptr);
            var _ = y()[h / 4 + 0],
              g = y()[h / 4 + 1];
            return (s = _), (l = g), O(_, g);
          } finally {
            c.__wbindgen_add_to_stack_pointer(16), c.__wbindgen_free(s, l, 1);
          }
        }
        paymentAmount(s) {
          let l, _;
          try {
            const S = c.__wbindgen_add_to_stack_pointer(-16);
            c.deploy_paymentAmount(S, this.__wbg_ptr, s);
            var g = y()[S / 4 + 0],
              h = y()[S / 4 + 1];
            return (l = g), (_ = h), O(g, h);
          } finally {
            c.__wbindgen_add_to_stack_pointer(16), c.__wbindgen_free(l, _, 1);
          }
        }
        args() {
          return I(c.deploy_args(this.__wbg_ptr));
        }
        addArg(s, l) {
          var _ = k(l) ? 0 : E(l, c.__wbindgen_malloc, c.__wbindgen_realloc),
            g = D;
          const h = c.deploy_addArg(this.__wbg_ptr, H(s), _, g);
          return be.__wrap(h);
        }
      }
      class fn {
        static __wrap(s) {
          s >>>= 0;
          const l = Object.create(fn.prototype);
          return (l.__wbg_ptr = s), l;
        }
        __destroy_into_raw() {
          const s = this.__wbg_ptr;
          return (this.__wbg_ptr = 0), s;
        }
        free() {
          const s = this.__destroy_into_raw();
          c.__wbg_deployhash_free(s);
        }
        constructor(s) {
          try {
            const h = c.__wbindgen_add_to_stack_pointer(-16),
              S = E(s, c.__wbindgen_malloc, c.__wbindgen_realloc);
            c.deployhash_new(h, S, D);
            var l = y()[h / 4 + 0],
              _ = y()[h / 4 + 1];
            if (y()[h / 4 + 2]) throw I(_);
            return fn.__wrap(l);
          } finally {
            c.__wbindgen_add_to_stack_pointer(16);
          }
        }
        static fromDigest(s) {
          try {
            const S = c.__wbindgen_add_to_stack_pointer(-16);
            P(s, Ue);
            var l = s.__destroy_into_raw();
            c.deployhash_fromDigest(S, l);
            var _ = y()[S / 4 + 0],
              g = y()[S / 4 + 1];
            if (y()[S / 4 + 2]) throw I(g);
            return fn.__wrap(_);
          } finally {
            c.__wbindgen_add_to_stack_pointer(16);
          }
        }
        toJson() {
          return I(c.deployhash_toJson(this.__wbg_ptr));
        }
        toString() {
          let s, l;
          try {
            const h = c.__wbindgen_add_to_stack_pointer(-16);
            c.deployhash_toString(h, this.__wbg_ptr);
            var _ = y()[h / 4 + 0],
              g = y()[h / 4 + 1];
            return (s = _), (l = g), O(_, g);
          } finally {
            c.__wbindgen_add_to_stack_pointer(16), c.__wbindgen_free(s, l, 1);
          }
        }
      }
      class ht {
        static __wrap(s) {
          s >>>= 0;
          const l = Object.create(ht.prototype);
          return (l.__wbg_ptr = s), l;
        }
        __destroy_into_raw() {
          const s = this.__wbg_ptr;
          return (this.__wbg_ptr = 0), s;
        }
        free() {
          const s = this.__destroy_into_raw();
          c.__wbg_deploystrparams_free(s);
        }
        constructor(s, l, _, g, h) {
          const S = E(s, c.__wbindgen_malloc, c.__wbindgen_realloc),
            x = D,
            W = E(l, c.__wbindgen_malloc, c.__wbindgen_realloc),
            te = D;
          var ae = k(_) ? 0 : E(_, c.__wbindgen_malloc, c.__wbindgen_realloc),
            Te = D,
            Be = k(g) ? 0 : E(g, c.__wbindgen_malloc, c.__wbindgen_realloc),
            xe = D,
            St = k(h) ? 0 : E(h, c.__wbindgen_malloc, c.__wbindgen_realloc);
          const ce = c.deploystrparams_new(S, x, W, te, ae, Te, Be, xe, St, D);
          return ht.__wrap(ce);
        }
        get secret_key() {
          try {
            const _ = c.__wbindgen_add_to_stack_pointer(-16);
            c.deploystrparams_secret_key(_, this.__wbg_ptr);
            var s = y()[_ / 4 + 0],
              l = y()[_ / 4 + 1];
            let g;
            return (
              0 !== s && ((g = O(s, l).slice()), c.__wbindgen_free(s, 1 * l)), g
            );
          } finally {
            c.__wbindgen_add_to_stack_pointer(16);
          }
        }
        set secret_key(s) {
          const l = E(s, c.__wbindgen_malloc, c.__wbindgen_realloc);
          c.deploystrparams_set_secret_key(this.__wbg_ptr, l, D);
        }
        get timestamp() {
          try {
            const _ = c.__wbindgen_add_to_stack_pointer(-16);
            c.deploystrparams_timestamp(_, this.__wbg_ptr);
            var s = y()[_ / 4 + 0],
              l = y()[_ / 4 + 1];
            let g;
            return (
              0 !== s && ((g = O(s, l).slice()), c.__wbindgen_free(s, 1 * l)), g
            );
          } finally {
            c.__wbindgen_add_to_stack_pointer(16);
          }
        }
        set timestamp(s) {
          var l = k(s) ? 0 : E(s, c.__wbindgen_malloc, c.__wbindgen_realloc);
          c.deploystrparams_set_timestamp(this.__wbg_ptr, l, D);
        }
        setDefaultTimestamp() {
          c.deploystrparams_setDefaultTimestamp(this.__wbg_ptr);
        }
        get ttl() {
          try {
            const _ = c.__wbindgen_add_to_stack_pointer(-16);
            c.deploystrparams_ttl(_, this.__wbg_ptr);
            var s = y()[_ / 4 + 0],
              l = y()[_ / 4 + 1];
            let g;
            return (
              0 !== s && ((g = O(s, l).slice()), c.__wbindgen_free(s, 1 * l)), g
            );
          } finally {
            c.__wbindgen_add_to_stack_pointer(16);
          }
        }
        set ttl(s) {
          var l = k(s) ? 0 : E(s, c.__wbindgen_malloc, c.__wbindgen_realloc);
          c.deploystrparams_set_ttl(this.__wbg_ptr, l, D);
        }
        setDefaultTTL() {
          c.deploystrparams_setDefaultTTL(this.__wbg_ptr);
        }
        get chain_name() {
          try {
            const _ = c.__wbindgen_add_to_stack_pointer(-16);
            c.deploystrparams_chain_name(_, this.__wbg_ptr);
            var s = y()[_ / 4 + 0],
              l = y()[_ / 4 + 1];
            let g;
            return (
              0 !== s && ((g = O(s, l).slice()), c.__wbindgen_free(s, 1 * l)), g
            );
          } finally {
            c.__wbindgen_add_to_stack_pointer(16);
          }
        }
        set chain_name(s) {
          const l = E(s, c.__wbindgen_malloc, c.__wbindgen_realloc);
          c.deploystrparams_set_chain_name(this.__wbg_ptr, l, D);
        }
        get session_account() {
          try {
            const _ = c.__wbindgen_add_to_stack_pointer(-16);
            c.deploystrparams_session_account(_, this.__wbg_ptr);
            var s = y()[_ / 4 + 0],
              l = y()[_ / 4 + 1];
            let g;
            return (
              0 !== s && ((g = O(s, l).slice()), c.__wbindgen_free(s, 1 * l)), g
            );
          } finally {
            c.__wbindgen_add_to_stack_pointer(16);
          }
        }
        set session_account(s) {
          const l = E(s, c.__wbindgen_malloc, c.__wbindgen_realloc);
          c.deploystrparams_set_session_account(this.__wbg_ptr, l, D);
        }
      }
      class Nr {
        static __wrap(s) {
          s >>>= 0;
          const l = Object.create(Nr.prototype);
          return (l.__wbg_ptr = s), l;
        }
        __destroy_into_raw() {
          const s = this.__wbg_ptr;
          return (this.__wbg_ptr = 0), s;
        }
        free() {
          const s = this.__destroy_into_raw();
          c.__wbg_dictionaryaddr_free(s);
        }
        constructor(s) {
          try {
            const h = c.__wbindgen_add_to_stack_pointer(-16),
              S = Ct(s, c.__wbindgen_malloc);
            c.dictionaryaddr_new(h, S, D);
            var l = y()[h / 4 + 0],
              _ = y()[h / 4 + 1];
            if (y()[h / 4 + 2]) throw I(_);
            return Nr.__wrap(l);
          } finally {
            c.__wbindgen_add_to_stack_pointer(16);
          }
        }
      }
      class rn {
        static __wrap(s) {
          s >>>= 0;
          const l = Object.create(rn.prototype);
          return (l.__wbg_ptr = s), l;
        }
        __destroy_into_raw() {
          const s = this.__wbg_ptr;
          return (this.__wbg_ptr = 0), s;
        }
        free() {
          const s = this.__destroy_into_raw();
          c.__wbg_dictionaryitemidentifier_free(s);
        }
        static newFromAccountInfo(s, l, _) {
          try {
            const x = c.__wbindgen_add_to_stack_pointer(-16),
              W = E(s, c.__wbindgen_malloc, c.__wbindgen_realloc),
              te = D,
              ae = E(l, c.__wbindgen_malloc, c.__wbindgen_realloc),
              Te = D,
              Be = E(_, c.__wbindgen_malloc, c.__wbindgen_realloc);
            c.dictionaryitemidentifier_newFromAccountInfo(
              x,
              W,
              te,
              ae,
              Te,
              Be,
              D
            );
            var g = y()[x / 4 + 0],
              h = y()[x / 4 + 1];
            if (y()[x / 4 + 2]) throw I(h);
            return rn.__wrap(g);
          } finally {
            c.__wbindgen_add_to_stack_pointer(16);
          }
        }
        static newFromContractInfo(s, l, _) {
          try {
            const x = c.__wbindgen_add_to_stack_pointer(-16),
              W = E(s, c.__wbindgen_malloc, c.__wbindgen_realloc),
              te = D,
              ae = E(l, c.__wbindgen_malloc, c.__wbindgen_realloc),
              Te = D,
              Be = E(_, c.__wbindgen_malloc, c.__wbindgen_realloc);
            c.dictionaryitemidentifier_newFromContractInfo(
              x,
              W,
              te,
              ae,
              Te,
              Be,
              D
            );
            var g = y()[x / 4 + 0],
              h = y()[x / 4 + 1];
            if (y()[x / 4 + 2]) throw I(h);
            return rn.__wrap(g);
          } finally {
            c.__wbindgen_add_to_stack_pointer(16);
          }
        }
        static newFromSeedUref(s, l) {
          try {
            const S = c.__wbindgen_add_to_stack_pointer(-16),
              x = E(s, c.__wbindgen_malloc, c.__wbindgen_realloc),
              W = D,
              te = E(l, c.__wbindgen_malloc, c.__wbindgen_realloc);
            c.dictionaryitemidentifier_newFromSeedUref(S, x, W, te, D);
            var _ = y()[S / 4 + 0],
              g = y()[S / 4 + 1];
            if (y()[S / 4 + 2]) throw I(g);
            return rn.__wrap(_);
          } finally {
            c.__wbindgen_add_to_stack_pointer(16);
          }
        }
        static newFromDictionaryKey(s) {
          try {
            const h = c.__wbindgen_add_to_stack_pointer(-16),
              S = E(s, c.__wbindgen_malloc, c.__wbindgen_realloc);
            c.dictionaryitemidentifier_newFromDictionaryKey(h, S, D);
            var l = y()[h / 4 + 0],
              _ = y()[h / 4 + 1];
            if (y()[h / 4 + 2]) throw I(_);
            return rn.__wrap(l);
          } finally {
            c.__wbindgen_add_to_stack_pointer(16);
          }
        }
        toJson() {
          return I(c.dictionaryitemidentifier_toJson(this.__wbg_ptr));
        }
      }
      class Un {
        static __wrap(s) {
          s >>>= 0;
          const l = Object.create(Un.prototype);
          return (l.__wbg_ptr = s), l;
        }
        __destroy_into_raw() {
          const s = this.__wbg_ptr;
          return (this.__wbg_ptr = 0), s;
        }
        free() {
          const s = this.__destroy_into_raw();
          c.__wbg_dictionaryitemstrparams_free(s);
        }
        constructor() {
          const s = c.dictionaryitemstrparams_new();
          return Un.__wrap(s);
        }
        setAccountNamedKey(s, l, _) {
          const g = E(s, c.__wbindgen_malloc, c.__wbindgen_realloc),
            h = D,
            S = E(l, c.__wbindgen_malloc, c.__wbindgen_realloc),
            x = D,
            W = E(_, c.__wbindgen_malloc, c.__wbindgen_realloc);
          c.dictionaryitemstrparams_setAccountNamedKey(
            this.__wbg_ptr,
            g,
            h,
            S,
            x,
            W,
            D
          );
        }
        setContractNamedKey(s, l, _) {
          const g = E(s, c.__wbindgen_malloc, c.__wbindgen_realloc),
            h = D,
            S = E(l, c.__wbindgen_malloc, c.__wbindgen_realloc),
            x = D,
            W = E(_, c.__wbindgen_malloc, c.__wbindgen_realloc);
          c.dictionaryitemstrparams_setContractNamedKey(
            this.__wbg_ptr,
            g,
            h,
            S,
            x,
            W,
            D
          );
        }
        setUref(s, l) {
          const _ = E(s, c.__wbindgen_malloc, c.__wbindgen_realloc),
            g = D,
            h = E(l, c.__wbindgen_malloc, c.__wbindgen_realloc);
          c.dictionaryitemstrparams_setUref(this.__wbg_ptr, _, g, h, D);
        }
        setDictionary(s) {
          const l = E(s, c.__wbindgen_malloc, c.__wbindgen_realloc);
          c.dictionaryitemstrparams_setDictionary(this.__wbg_ptr, l, D);
        }
        toJson() {
          return I(c.dictionaryitemstrparams_toJson(this.__wbg_ptr));
        }
      }
      class Ue {
        static __wrap(s) {
          s >>>= 0;
          const l = Object.create(Ue.prototype);
          return (l.__wbg_ptr = s), l;
        }
        __destroy_into_raw() {
          const s = this.__wbg_ptr;
          return (this.__wbg_ptr = 0), s;
        }
        free() {
          const s = this.__destroy_into_raw();
          c.__wbg_digest_free(s);
        }
        constructor(s) {
          try {
            const h = c.__wbindgen_add_to_stack_pointer(-16),
              S = E(s, c.__wbindgen_malloc, c.__wbindgen_realloc);
            c.digest__new(h, S, D);
            var l = y()[h / 4 + 0],
              _ = y()[h / 4 + 1];
            if (y()[h / 4 + 2]) throw I(_);
            return Ue.__wrap(l);
          } finally {
            c.__wbindgen_add_to_stack_pointer(16);
          }
        }
        static fromString(s) {
          try {
            const h = c.__wbindgen_add_to_stack_pointer(-16),
              S = E(s, c.__wbindgen_malloc, c.__wbindgen_realloc);
            c.digest__new(h, S, D);
            var l = y()[h / 4 + 0],
              _ = y()[h / 4 + 1];
            if (y()[h / 4 + 2]) throw I(_);
            return Ue.__wrap(l);
          } finally {
            c.__wbindgen_add_to_stack_pointer(16);
          }
        }
        static fromDigest(s) {
          try {
            const h = c.__wbindgen_add_to_stack_pointer(-16),
              S = Ct(s, c.__wbindgen_malloc);
            c.digest_fromDigest(h, S, D);
            var l = y()[h / 4 + 0],
              _ = y()[h / 4 + 1];
            if (y()[h / 4 + 2]) throw I(_);
            return Ue.__wrap(l);
          } finally {
            c.__wbindgen_add_to_stack_pointer(16);
          }
        }
        toJson() {
          return I(c.digest_toJson(this.__wbg_ptr));
        }
        toString() {
          let s, l;
          try {
            const h = c.__wbindgen_add_to_stack_pointer(-16);
            c.digest_toString(h, this.__wbg_ptr);
            var _ = y()[h / 4 + 0],
              g = y()[h / 4 + 1];
            return (s = _), (l = g), O(_, g);
          } finally {
            c.__wbindgen_add_to_stack_pointer(16), c.__wbindgen_free(s, l, 1);
          }
        }
      }
      class vs {
        static __wrap(s) {
          s >>>= 0;
          const l = Object.create(vs.prototype);
          return (l.__wbg_ptr = s), l;
        }
        __destroy_into_raw() {
          const s = this.__wbg_ptr;
          return (this.__wbg_ptr = 0), s;
        }
        free() {
          const s = this.__destroy_into_raw();
          c.__wbg_eraid_free(s);
        }
        constructor(s) {
          const l = c.eraid_new(s);
          return vs.__wrap(l);
        }
        value() {
          const s = c.eraid_value(this.__wbg_ptr);
          return BigInt.asUintN(64, s);
        }
      }
      class Ds {
        static __wrap(s) {
          s >>>= 0;
          const l = Object.create(Ds.prototype);
          return (l.__wbg_ptr = s), l;
        }
        __destroy_into_raw() {
          const s = this.__wbg_ptr;
          return (this.__wbg_ptr = 0), s;
        }
        free() {
          const s = this.__destroy_into_raw();
          c.__wbg_getaccountresult_free(s);
        }
        get api_version() {
          return I(c.getaccountresult_api_version(this.__wbg_ptr));
        }
        get account() {
          return I(c.getaccountresult_account(this.__wbg_ptr));
        }
        get merkle_proof() {
          let s, l;
          try {
            const h = c.__wbindgen_add_to_stack_pointer(-16);
            c.getaccountresult_merkle_proof(h, this.__wbg_ptr);
            var _ = y()[h / 4 + 0],
              g = y()[h / 4 + 1];
            return (s = _), (l = g), O(_, g);
          } finally {
            c.__wbindgen_add_to_stack_pointer(16), c.__wbindgen_free(s, l, 1);
          }
        }
        toJson() {
          return I(c.getaccountresult_toJson(this.__wbg_ptr));
        }
      }
      class uo {
        static __wrap(s) {
          s >>>= 0;
          const l = Object.create(uo.prototype);
          return (l.__wbg_ptr = s), l;
        }
        __destroy_into_raw() {
          const s = this.__wbg_ptr;
          return (this.__wbg_ptr = 0), s;
        }
        free() {
          const s = this.__destroy_into_raw();
          c.__wbg_getauctioninforesult_free(s);
        }
        get api_version() {
          return I(c.getauctioninforesult_api_version(this.__wbg_ptr));
        }
        get auction_state() {
          return I(c.getauctioninforesult_auction_state(this.__wbg_ptr));
        }
        toJson() {
          return I(c.getauctioninforesult_toJson(this.__wbg_ptr));
        }
      }
      class Es {
        static __wrap(s) {
          s >>>= 0;
          const l = Object.create(Es.prototype);
          return (l.__wbg_ptr = s), l;
        }
        __destroy_into_raw() {
          const s = this.__wbg_ptr;
          return (this.__wbg_ptr = 0), s;
        }
        free() {
          const s = this.__destroy_into_raw();
          c.__wbg_getbalanceresult_free(s);
        }
        get api_version() {
          return I(c.getbalanceresult_api_version(this.__wbg_ptr));
        }
        get balance_value() {
          return I(c.getbalanceresult_balance_value(this.__wbg_ptr));
        }
        get merkle_proof() {
          let s, l;
          try {
            const h = c.__wbindgen_add_to_stack_pointer(-16);
            c.getbalanceresult_merkle_proof(h, this.__wbg_ptr);
            var _ = y()[h / 4 + 0],
              g = y()[h / 4 + 1];
            return (s = _), (l = g), O(_, g);
          } finally {
            c.__wbindgen_add_to_stack_pointer(16), c.__wbindgen_free(s, l, 1);
          }
        }
        toJson() {
          return I(c.getbalanceresult_toJson(this.__wbg_ptr));
        }
      }
      class xr {
        static __wrap(s) {
          s >>>= 0;
          const l = Object.create(xr.prototype);
          return (l.__wbg_ptr = s), l;
        }
        __destroy_into_raw() {
          const s = this.__wbg_ptr;
          return (this.__wbg_ptr = 0), s;
        }
        free() {
          const s = this.__destroy_into_raw();
          c.__wbg_getblockresult_free(s);
        }
        get api_version() {
          return I(c.getblockresult_api_version(this.__wbg_ptr));
        }
        get block() {
          return I(c.getblockresult_block(this.__wbg_ptr));
        }
        toJson() {
          return I(c.getblockresult_toJson(this.__wbg_ptr));
        }
      }
      class Cs {
        static __wrap(s) {
          s >>>= 0;
          const l = Object.create(Cs.prototype);
          return (l.__wbg_ptr = s), l;
        }
        __destroy_into_raw() {
          const s = this.__wbg_ptr;
          return (this.__wbg_ptr = 0), s;
        }
        free() {
          const s = this.__destroy_into_raw();
          c.__wbg_getblocktransfersresult_free(s);
        }
        get api_version() {
          return I(c.getblocktransfersresult_api_version(this.__wbg_ptr));
        }
        get block_hash() {
          const s = c.getblocktransfersresult_block_hash(this.__wbg_ptr);
          return 0 === s ? void 0 : st.__wrap(s);
        }
        get transfers() {
          return I(c.getblocktransfersresult_transfers(this.__wbg_ptr));
        }
        toJson() {
          return I(c.getblocktransfersresult_toJson(this.__wbg_ptr));
        }
      }
      class Rr {
        static __wrap(s) {
          s >>>= 0;
          const l = Object.create(Rr.prototype);
          return (l.__wbg_ptr = s), l;
        }
        __destroy_into_raw() {
          const s = this.__wbg_ptr;
          return (this.__wbg_ptr = 0), s;
        }
        free() {
          const s = this.__destroy_into_raw();
          c.__wbg_getchainspecresult_free(s);
        }
        get api_version() {
          return I(c.getchainspecresult_api_version(this.__wbg_ptr));
        }
        get chainspec_bytes() {
          return I(c.getchainspecresult_chainspec_bytes(this.__wbg_ptr));
        }
        toJson() {
          return I(c.getchainspecresult_toJson(this.__wbg_ptr));
        }
      }
      class _o {
        static __wrap(s) {
          s >>>= 0;
          const l = Object.create(_o.prototype);
          return (l.__wbg_ptr = s), l;
        }
        __destroy_into_raw() {
          const s = this.__wbg_ptr;
          return (this.__wbg_ptr = 0), s;
        }
        free() {
          const s = this.__destroy_into_raw();
          c.__wbg_getdeployresult_free(s);
        }
        get api_version() {
          return I(c.getdeployresult_api_version(this.__wbg_ptr));
        }
        get deploy() {
          const s = c.getdeployresult_deploy(this.__wbg_ptr);
          return be.__wrap(s);
        }
        get execution_info() {
          return I(c.getdeployresult_execution_info(this.__wbg_ptr));
        }
        toJson() {
          return I(c.getdeployresult_toJson(this.__wbg_ptr));
        }
      }
      class Is {
        static __wrap(s) {
          s >>>= 0;
          const l = Object.create(Is.prototype);
          return (l.__wbg_ptr = s), l;
        }
        __destroy_into_raw() {
          const s = this.__wbg_ptr;
          return (this.__wbg_ptr = 0), s;
        }
        free() {
          const s = this.__destroy_into_raw();
          c.__wbg_getdictionaryitemresult_free(s);
        }
        get api_version() {
          return I(c.getdictionaryitemresult_api_version(this.__wbg_ptr));
        }
        get dictionary_key() {
          let s, l;
          try {
            const h = c.__wbindgen_add_to_stack_pointer(-16);
            c.getdictionaryitemresult_dictionary_key(h, this.__wbg_ptr);
            var _ = y()[h / 4 + 0],
              g = y()[h / 4 + 1];
            return (s = _), (l = g), O(_, g);
          } finally {
            c.__wbindgen_add_to_stack_pointer(16), c.__wbindgen_free(s, l, 1);
          }
        }
        get stored_value() {
          return I(c.getdictionaryitemresult_stored_value(this.__wbg_ptr));
        }
        get merkle_proof() {
          let s, l;
          try {
            const h = c.__wbindgen_add_to_stack_pointer(-16);
            c.getdictionaryitemresult_merkle_proof(h, this.__wbg_ptr);
            var _ = y()[h / 4 + 0],
              g = y()[h / 4 + 1];
            return (s = _), (l = g), O(_, g);
          } finally {
            c.__wbindgen_add_to_stack_pointer(16), c.__wbindgen_free(s, l, 1);
          }
        }
        toJson() {
          return I(c.getdictionaryitemresult_toJson(this.__wbg_ptr));
        }
      }
      class Ss {
        static __wrap(s) {
          s >>>= 0;
          const l = Object.create(Ss.prototype);
          return (l.__wbg_ptr = s), l;
        }
        __destroy_into_raw() {
          const s = this.__wbg_ptr;
          return (this.__wbg_ptr = 0), s;
        }
        free() {
          const s = this.__destroy_into_raw();
          c.__wbg_geterainforesult_free(s);
        }
        get api_version() {
          return I(c.geterainforesult_api_version(this.__wbg_ptr));
        }
        get era_summary() {
          return I(c.geterainforesult_era_summary(this.__wbg_ptr));
        }
        toJson() {
          return I(c.geterainforesult_toJson(this.__wbg_ptr));
        }
      }
      class Ms {
        static __wrap(s) {
          s >>>= 0;
          const l = Object.create(Ms.prototype);
          return (l.__wbg_ptr = s), l;
        }
        __destroy_into_raw() {
          const s = this.__wbg_ptr;
          return (this.__wbg_ptr = 0), s;
        }
        free() {
          const s = this.__destroy_into_raw();
          c.__wbg_geterasummaryresult_free(s);
        }
        get api_version() {
          return I(c.geterasummaryresult_api_version(this.__wbg_ptr));
        }
        get era_summary() {
          return I(c.geterasummaryresult_era_summary(this.__wbg_ptr));
        }
        toJson() {
          return I(c.geterasummaryresult_toJson(this.__wbg_ptr));
        }
      }
      class on {
        static __wrap(s) {
          s >>>= 0;
          const l = Object.create(on.prototype);
          return (l.__wbg_ptr = s), l;
        }
        __destroy_into_raw() {
          const s = this.__wbg_ptr;
          return (this.__wbg_ptr = 0), s;
        }
        free() {
          const s = this.__destroy_into_raw();
          c.__wbg_getnodestatusresult_free(s);
        }
        get api_version() {
          return I(c.getnodestatusresult_api_version(this.__wbg_ptr));
        }
        get chainspec_name() {
          let s, l;
          try {
            const h = c.__wbindgen_add_to_stack_pointer(-16);
            c.getnodestatusresult_chainspec_name(h, this.__wbg_ptr);
            var _ = y()[h / 4 + 0],
              g = y()[h / 4 + 1];
            return (s = _), (l = g), O(_, g);
          } finally {
            c.__wbindgen_add_to_stack_pointer(16), c.__wbindgen_free(s, l, 1);
          }
        }
        get starting_state_root_hash() {
          const s = c.getnodestatusresult_starting_state_root_hash(
            this.__wbg_ptr
          );
          return Ue.__wrap(s);
        }
        get peers() {
          return I(c.getnodestatusresult_peers(this.__wbg_ptr));
        }
        get last_added_block_info() {
          return I(c.getnodestatusresult_last_added_block_info(this.__wbg_ptr));
        }
        get our_public_signing_key() {
          const s = c.getnodestatusresult_our_public_signing_key(
            this.__wbg_ptr
          );
          return 0 === s ? void 0 : pn.__wrap(s);
        }
        get round_length() {
          return I(c.getnodestatusresult_round_length(this.__wbg_ptr));
        }
        get next_upgrade() {
          return I(c.getnodestatusresult_next_upgrade(this.__wbg_ptr));
        }
        get build_version() {
          let s, l;
          try {
            const h = c.__wbindgen_add_to_stack_pointer(-16);
            c.getnodestatusresult_build_version(h, this.__wbg_ptr);
            var _ = y()[h / 4 + 0],
              g = y()[h / 4 + 1];
            return (s = _), (l = g), O(_, g);
          } finally {
            c.__wbindgen_add_to_stack_pointer(16), c.__wbindgen_free(s, l, 1);
          }
        }
        get uptime() {
          return I(c.getnodestatusresult_uptime(this.__wbg_ptr));
        }
        get reactor_state() {
          return I(c.getnodestatusresult_reactor_state(this.__wbg_ptr));
        }
        get last_progress() {
          return I(c.getnodestatusresult_last_progress(this.__wbg_ptr));
        }
        get available_block_range() {
          return I(c.getnodestatusresult_available_block_range(this.__wbg_ptr));
        }
        get block_sync() {
          return I(c.getnodestatusresult_block_sync(this.__wbg_ptr));
        }
        toJson() {
          return I(c.getnodestatusresult_toJson(this.__wbg_ptr));
        }
      }
      class fo {
        static __wrap(s) {
          s >>>= 0;
          const l = Object.create(fo.prototype);
          return (l.__wbg_ptr = s), l;
        }
        __destroy_into_raw() {
          const s = this.__wbg_ptr;
          return (this.__wbg_ptr = 0), s;
        }
        free() {
          const s = this.__destroy_into_raw();
          c.__wbg_getpeersresult_free(s);
        }
        get api_version() {
          return I(c.getpeersresult_api_version(this.__wbg_ptr));
        }
        get peers() {
          return I(c.getpeersresult_peers(this.__wbg_ptr));
        }
        toJson() {
          return I(c.getpeersresult_toJson(this.__wbg_ptr));
        }
      }
      class ks {
        static __wrap(s) {
          s >>>= 0;
          const l = Object.create(ks.prototype);
          return (l.__wbg_ptr = s), l;
        }
        __destroy_into_raw() {
          const s = this.__wbg_ptr;
          return (this.__wbg_ptr = 0), s;
        }
        free() {
          const s = this.__destroy_into_raw();
          c.__wbg_getstateroothashresult_free(s);
        }
        get api_version() {
          return I(c.getstateroothashresult_api_version(this.__wbg_ptr));
        }
        get state_root_hash() {
          const s = c.getstateroothashresult_state_root_hash(this.__wbg_ptr);
          return 0 === s ? void 0 : Ue.__wrap(s);
        }
        get state_root_hash_as_string() {
          let s, l;
          try {
            const h = c.__wbindgen_add_to_stack_pointer(-16);
            c.getstateroothashresult_state_root_hash_as_string(
              h,
              this.__wbg_ptr
            );
            var _ = y()[h / 4 + 0],
              g = y()[h / 4 + 1];
            return (s = _), (l = g), O(_, g);
          } finally {
            c.__wbindgen_add_to_stack_pointer(16), c.__wbindgen_free(s, l, 1);
          }
        }
        toJson() {
          return I(c.getstateroothashresult_toJson(this.__wbg_ptr));
        }
      }
      class po {
        static __wrap(s) {
          s >>>= 0;
          const l = Object.create(po.prototype);
          return (l.__wbg_ptr = s), l;
        }
        __destroy_into_raw() {
          const s = this.__wbg_ptr;
          return (this.__wbg_ptr = 0), s;
        }
        free() {
          const s = this.__destroy_into_raw();
          c.__wbg_getvalidatorchangesresult_free(s);
        }
        get api_version() {
          return I(c.getvalidatorchangesresult_api_version(this.__wbg_ptr));
        }
        get changes() {
          return I(c.getvalidatorchangesresult_changes(this.__wbg_ptr));
        }
        toJson() {
          return I(c.getvalidatorchangesresult_toJson(this.__wbg_ptr));
        }
      }
      class mt {
        static __wrap(s) {
          s >>>= 0;
          const l = Object.create(mt.prototype);
          return (l.__wbg_ptr = s), l;
        }
        __destroy_into_raw() {
          const s = this.__wbg_ptr;
          return (this.__wbg_ptr = 0), s;
        }
        free() {
          const s = this.__destroy_into_raw();
          c.__wbg_globalstateidentifier_free(s);
        }
        constructor(s) {
          P(s, mt);
          var l = s.__destroy_into_raw();
          const _ = c.blockidentifier_new(l);
          return mt.__wrap(_);
        }
        static fromBlockHash(s) {
          P(s, st);
          var l = s.__destroy_into_raw();
          const _ = c.blockidentifier_from_hash(l);
          return mt.__wrap(_);
        }
        static fromBlockHeight(s) {
          const l = c.blockidentifier_fromHeight(s);
          return mt.__wrap(l);
        }
        static fromStateRootHash(s) {
          P(s, Ue);
          var l = s.__destroy_into_raw();
          const _ = c.globalstateidentifier_fromStateRootHash(l);
          return mt.__wrap(_);
        }
        toJson() {
          return I(c.globalstateidentifier_toJson(this.__wbg_ptr));
        }
      }
      class Pr {
        static __wrap(s) {
          s >>>= 0;
          const l = Object.create(Pr.prototype);
          return (l.__wbg_ptr = s), l;
        }
        __destroy_into_raw() {
          const s = this.__wbg_ptr;
          return (this.__wbg_ptr = 0), s;
        }
        free() {
          const s = this.__destroy_into_raw();
          c.__wbg_hashaddr_free(s);
        }
        constructor(s) {
          try {
            const h = c.__wbindgen_add_to_stack_pointer(-16),
              S = Ct(s, c.__wbindgen_malloc);
            c.hashaddr_new(h, S, D);
            var l = y()[h / 4 + 0],
              _ = y()[h / 4 + 1];
            if (y()[h / 4 + 2]) throw I(_);
            return Pr.__wrap(l);
          } finally {
            c.__wbindgen_add_to_stack_pointer(16);
          }
        }
      }
      class Ne {
        static __wrap(s) {
          s >>>= 0;
          const l = Object.create(Ne.prototype);
          return (l.__wbg_ptr = s), l;
        }
        __destroy_into_raw() {
          const s = this.__wbg_ptr;
          return (this.__wbg_ptr = 0), s;
        }
        free() {
          const s = this.__destroy_into_raw();
          c.__wbg_key_free(s);
        }
        constructor(s) {
          try {
            const S = c.__wbindgen_add_to_stack_pointer(-16);
            P(s, Ne);
            var l = s.__destroy_into_raw();
            c.key_new(S, l);
            var _ = y()[S / 4 + 0],
              g = y()[S / 4 + 1];
            if (y()[S / 4 + 2]) throw I(g);
            return Ne.__wrap(_);
          } finally {
            c.__wbindgen_add_to_stack_pointer(16);
          }
        }
        toJson() {
          return I(c.key_toJson(this.__wbg_ptr));
        }
        static fromURef(s) {
          P(s, Jt);
          var l = s.__destroy_into_raw();
          const _ = c.key_fromURef(l);
          return Ne.__wrap(_);
        }
        static fromDeployInfo(s) {
          P(s, fn);
          var l = s.__destroy_into_raw();
          const _ = c.key_fromDeployInfo(l);
          return Ne.__wrap(_);
        }
        static fromAccount(s) {
          P(s, pt);
          var l = s.__destroy_into_raw();
          const _ = c.key_fromAccount(l);
          return Ne.__wrap(_);
        }
        static fromHash(s) {
          P(s, Pr);
          var l = s.__destroy_into_raw();
          const _ = c.key_fromHash(l);
          return Ne.__wrap(_);
        }
        static fromTransfer(s) {
          const l = Ct(s, c.__wbindgen_malloc),
            g = c.key_fromTransfer(l, D);
          return dr.__wrap(g);
        }
        static fromEraInfo(s) {
          P(s, vs);
          var l = s.__destroy_into_raw();
          const _ = c.key_fromEraInfo(l);
          return Ne.__wrap(_);
        }
        static fromBalance(s) {
          P(s, _r);
          var l = s.__destroy_into_raw();
          const _ = c.key_fromBalance(l);
          return Ne.__wrap(_);
        }
        static fromBid(s) {
          P(s, pt);
          var l = s.__destroy_into_raw();
          const _ = c.key_fromBid(l);
          return Ne.__wrap(_);
        }
        static fromWithdraw(s) {
          P(s, pt);
          var l = s.__destroy_into_raw();
          const _ = c.key_fromWithdraw(l);
          return Ne.__wrap(_);
        }
        static fromDictionaryAddr(s) {
          P(s, Nr);
          var l = s.__destroy_into_raw();
          const _ = c.key_fromDictionaryAddr(l);
          return Ne.__wrap(_);
        }
        asDictionaryAddr() {
          const s = c.key_asDictionaryAddr(this.__wbg_ptr);
          return 0 === s ? void 0 : Nr.__wrap(s);
        }
        static fromSystemContractRegistry() {
          const s = c.key_fromSystemContractRegistry();
          return Ne.__wrap(s);
        }
        static fromEraSummary() {
          const s = c.key_fromEraSummary();
          return Ne.__wrap(s);
        }
        static fromUnbond(s) {
          P(s, pt);
          var l = s.__destroy_into_raw();
          const _ = c.key_fromUnbond(l);
          return Ne.__wrap(_);
        }
        static fromChainspecRegistry() {
          const s = c.key_fromChainspecRegistry();
          return Ne.__wrap(s);
        }
        static fromChecksumRegistry() {
          const s = c.key_fromChecksumRegistry();
          return Ne.__wrap(s);
        }
        toFormattedString() {
          let s, l;
          try {
            const h = c.__wbindgen_add_to_stack_pointer(-16);
            c.key_toFormattedString(h, this.__wbg_ptr);
            var _ = y()[h / 4 + 0],
              g = y()[h / 4 + 1];
            return (s = _), (l = g), O(_, g);
          } finally {
            c.__wbindgen_add_to_stack_pointer(16), c.__wbindgen_free(s, l, 1);
          }
        }
        static fromFormattedString(s) {
          try {
            const h = c.__wbindgen_add_to_stack_pointer(-16);
            c.key_fromFormattedString(h, H(s));
            var l = y()[h / 4 + 0],
              _ = y()[h / 4 + 1];
            if (y()[h / 4 + 2]) throw I(_);
            return Ne.__wrap(l);
          } finally {
            c.__wbindgen_add_to_stack_pointer(16);
          }
        }
        static fromDictionaryKey(s, l) {
          P(s, Jt);
          var _ = s.__destroy_into_raw();
          const g = Ct(l, c.__wbindgen_malloc),
            S = c.key_fromDictionaryKey(_, g, D);
          return Ne.__wrap(S);
        }
        isDictionaryKey() {
          return 0 !== c.key_isDictionaryKey(this.__wbg_ptr);
        }
        intoAccount() {
          const s = this.__destroy_into_raw(),
            l = c.key_intoAccount(s);
          return 0 === l ? void 0 : pt.__wrap(l);
        }
        intoHash() {
          const s = this.__destroy_into_raw(),
            l = c.key_intoHash(s);
          return 0 === l ? void 0 : Pr.__wrap(l);
        }
        asBalance() {
          const s = c.key_asBalance(this.__wbg_ptr);
          return 0 === s ? void 0 : _r.__wrap(s);
        }
        intoURef() {
          const s = this.__destroy_into_raw(),
            l = c.key_intoURef(s);
          return 0 === l ? void 0 : Jt.__wrap(l);
        }
        urefToHash() {
          const s = c.key_urefToHash(this.__wbg_ptr);
          return 0 === s ? void 0 : Ne.__wrap(s);
        }
        withdrawToUnbond() {
          const s = c.key_withdrawToUnbond(this.__wbg_ptr);
          return 0 === s ? void 0 : Ne.__wrap(s);
        }
      }
      class Ts {
        static __wrap(s) {
          s >>>= 0;
          const l = Object.create(Ts.prototype);
          return (l.__wbg_ptr = s), l;
        }
        __destroy_into_raw() {
          const s = this.__wbg_ptr;
          return (this.__wbg_ptr = 0), s;
        }
        free() {
          const s = this.__destroy_into_raw();
          c.__wbg_listrpcsresult_free(s);
        }
        get api_version() {
          return I(c.listrpcsresult_api_version(this.__wbg_ptr));
        }
        get name() {
          let s, l;
          try {
            const h = c.__wbindgen_add_to_stack_pointer(-16);
            c.listrpcsresult_name(h, this.__wbg_ptr);
            var _ = y()[h / 4 + 0],
              g = y()[h / 4 + 1];
            return (s = _), (l = g), O(_, g);
          } finally {
            c.__wbindgen_add_to_stack_pointer(16), c.__wbindgen_free(s, l, 1);
          }
        }
        get schema() {
          return I(c.listrpcsresult_schema(this.__wbg_ptr));
        }
        toJson() {
          return I(c.listrpcsresult_toJson(this.__wbg_ptr));
        }
      }
      class Sn {
        static __wrap(s) {
          s >>>= 0;
          const l = Object.create(Sn.prototype);
          return (l.__wbg_ptr = s), l;
        }
        __destroy_into_raw() {
          const s = this.__wbg_ptr;
          return (this.__wbg_ptr = 0), s;
        }
        free() {
          const s = this.__destroy_into_raw();
          c.__wbg_path_free(s);
        }
        constructor(s) {
          const l = c.path_new(H(s));
          return Sn.__wrap(l);
        }
        static fromArray(s) {
          const l = c.path_fromArray(H(s));
          return Sn.__wrap(l);
        }
        toJson() {
          return I(c.path_toJson(this.__wbg_ptr));
        }
        toString() {
          let s, l;
          try {
            const h = c.__wbindgen_add_to_stack_pointer(-16);
            c.path_toString(h, this.__wbg_ptr);
            var _ = y()[h / 4 + 0],
              g = y()[h / 4 + 1];
            return (s = _), (l = g), O(_, g);
          } finally {
            c.__wbindgen_add_to_stack_pointer(16), c.__wbindgen_free(s, l, 1);
          }
        }
        is_empty() {
          return 0 !== c.path_is_empty(this.__wbg_ptr);
        }
      }
      class Ft {
        static __wrap(s) {
          s >>>= 0;
          const l = Object.create(Ft.prototype);
          return (l.__wbg_ptr = s), l;
        }
        __destroy_into_raw() {
          const s = this.__wbg_ptr;
          return (this.__wbg_ptr = 0), s;
        }
        free() {
          const s = this.__destroy_into_raw();
          c.__wbg_paymentstrparams_free(s);
        }
        constructor(s, l, _, g, h, S, x, W, te, ae, Te) {
          var Be = k(s) ? 0 : E(s, c.__wbindgen_malloc, c.__wbindgen_realloc),
            xe = D,
            St = k(l) ? 0 : E(l, c.__wbindgen_malloc, c.__wbindgen_realloc),
            Mt = D,
            ce = k(_) ? 0 : E(_, c.__wbindgen_malloc, c.__wbindgen_realloc),
            wt = D,
            Pe = k(g) ? 0 : E(g, c.__wbindgen_malloc, c.__wbindgen_realloc),
            Gn = D,
            Br = k(h) ? 0 : E(h, c.__wbindgen_malloc, c.__wbindgen_realloc),
            Wn = D,
            K = k(S) ? 0 : E(S, c.__wbindgen_malloc, c.__wbindgen_realloc),
            Mn = D,
            $r = k(W) ? 0 : E(W, c.__wbindgen_malloc, c.__wbindgen_realloc),
            Gi = D,
            Eo = k(te) ? 0 : E(te, c.__wbindgen_malloc, c.__wbindgen_realloc),
            U = D,
            gr = k(ae) ? 0 : E(ae, c.__wbindgen_malloc, c.__wbindgen_realloc),
            Y = D,
            me = k(Te) ? 0 : E(Te, c.__wbindgen_malloc, c.__wbindgen_realloc),
            Rs = D;
          const Wi = c.paymentstrparams_new(
            Be,
            xe,
            St,
            Mt,
            ce,
            wt,
            Pe,
            Gn,
            Br,
            Wn,
            K,
            Mn,
            k(x) ? 0 : H(x),
            $r,
            Gi,
            Eo,
            U,
            gr,
            Y,
            me,
            Rs
          );
          return Ft.__wrap(Wi);
        }
        get payment_amount() {
          try {
            const _ = c.__wbindgen_add_to_stack_pointer(-16);
            c.paymentstrparams_payment_amount(_, this.__wbg_ptr);
            var s = y()[_ / 4 + 0],
              l = y()[_ / 4 + 1];
            let g;
            return (
              0 !== s && ((g = O(s, l).slice()), c.__wbindgen_free(s, 1 * l)), g
            );
          } finally {
            c.__wbindgen_add_to_stack_pointer(16);
          }
        }
        set payment_amount(s) {
          const l = E(s, c.__wbindgen_malloc, c.__wbindgen_realloc);
          c.paymentstrparams_set_payment_amount(this.__wbg_ptr, l, D);
        }
        get payment_hash() {
          try {
            const _ = c.__wbindgen_add_to_stack_pointer(-16);
            c.paymentstrparams_payment_hash(_, this.__wbg_ptr);
            var s = y()[_ / 4 + 0],
              l = y()[_ / 4 + 1];
            let g;
            return (
              0 !== s && ((g = O(s, l).slice()), c.__wbindgen_free(s, 1 * l)), g
            );
          } finally {
            c.__wbindgen_add_to_stack_pointer(16);
          }
        }
        set payment_hash(s) {
          const l = E(s, c.__wbindgen_malloc, c.__wbindgen_realloc);
          c.paymentstrparams_set_payment_hash(this.__wbg_ptr, l, D);
        }
        get payment_name() {
          try {
            const _ = c.__wbindgen_add_to_stack_pointer(-16);
            c.paymentstrparams_payment_name(_, this.__wbg_ptr);
            var s = y()[_ / 4 + 0],
              l = y()[_ / 4 + 1];
            let g;
            return (
              0 !== s && ((g = O(s, l).slice()), c.__wbindgen_free(s, 1 * l)), g
            );
          } finally {
            c.__wbindgen_add_to_stack_pointer(16);
          }
        }
        set payment_name(s) {
          const l = E(s, c.__wbindgen_malloc, c.__wbindgen_realloc);
          c.paymentstrparams_set_payment_name(this.__wbg_ptr, l, D);
        }
        get payment_package_hash() {
          try {
            const _ = c.__wbindgen_add_to_stack_pointer(-16);
            c.paymentstrparams_payment_package_hash(_, this.__wbg_ptr);
            var s = y()[_ / 4 + 0],
              l = y()[_ / 4 + 1];
            let g;
            return (
              0 !== s && ((g = O(s, l).slice()), c.__wbindgen_free(s, 1 * l)), g
            );
          } finally {
            c.__wbindgen_add_to_stack_pointer(16);
          }
        }
        set payment_package_hash(s) {
          const l = E(s, c.__wbindgen_malloc, c.__wbindgen_realloc);
          c.paymentstrparams_set_payment_package_hash(this.__wbg_ptr, l, D);
        }
        get payment_package_name() {
          try {
            const _ = c.__wbindgen_add_to_stack_pointer(-16);
            c.paymentstrparams_payment_package_name(_, this.__wbg_ptr);
            var s = y()[_ / 4 + 0],
              l = y()[_ / 4 + 1];
            let g;
            return (
              0 !== s && ((g = O(s, l).slice()), c.__wbindgen_free(s, 1 * l)), g
            );
          } finally {
            c.__wbindgen_add_to_stack_pointer(16);
          }
        }
        set payment_package_name(s) {
          const l = E(s, c.__wbindgen_malloc, c.__wbindgen_realloc);
          c.paymentstrparams_set_payment_package_name(this.__wbg_ptr, l, D);
        }
        get payment_path() {
          try {
            const _ = c.__wbindgen_add_to_stack_pointer(-16);
            c.paymentstrparams_payment_path(_, this.__wbg_ptr);
            var s = y()[_ / 4 + 0],
              l = y()[_ / 4 + 1];
            let g;
            return (
              0 !== s && ((g = O(s, l).slice()), c.__wbindgen_free(s, 1 * l)), g
            );
          } finally {
            c.__wbindgen_add_to_stack_pointer(16);
          }
        }
        set payment_path(s) {
          const l = E(s, c.__wbindgen_malloc, c.__wbindgen_realloc);
          c.paymentstrparams_set_payment_path(this.__wbg_ptr, l, D);
        }
        get payment_args_simple() {
          return I(c.paymentstrparams_payment_args_simple(this.__wbg_ptr));
        }
        set payment_args_simple(s) {
          c.paymentstrparams_set_payment_args_simple(this.__wbg_ptr, H(s));
        }
        get payment_args_json() {
          try {
            const _ = c.__wbindgen_add_to_stack_pointer(-16);
            c.paymentstrparams_payment_args_json(_, this.__wbg_ptr);
            var s = y()[_ / 4 + 0],
              l = y()[_ / 4 + 1];
            let g;
            return (
              0 !== s && ((g = O(s, l).slice()), c.__wbindgen_free(s, 1 * l)), g
            );
          } finally {
            c.__wbindgen_add_to_stack_pointer(16);
          }
        }
        set payment_args_json(s) {
          const l = E(s, c.__wbindgen_malloc, c.__wbindgen_realloc);
          c.paymentstrparams_set_payment_args_json(this.__wbg_ptr, l, D);
        }
        get payment_args_complex() {
          try {
            const _ = c.__wbindgen_add_to_stack_pointer(-16);
            c.paymentstrparams_payment_args_complex(_, this.__wbg_ptr);
            var s = y()[_ / 4 + 0],
              l = y()[_ / 4 + 1];
            let g;
            return (
              0 !== s && ((g = O(s, l).slice()), c.__wbindgen_free(s, 1 * l)), g
            );
          } finally {
            c.__wbindgen_add_to_stack_pointer(16);
          }
        }
        set payment_args_complex(s) {
          const l = E(s, c.__wbindgen_malloc, c.__wbindgen_realloc);
          c.paymentstrparams_set_payment_args_complex(this.__wbg_ptr, l, D);
        }
        get payment_version() {
          try {
            const _ = c.__wbindgen_add_to_stack_pointer(-16);
            c.paymentstrparams_payment_version(_, this.__wbg_ptr);
            var s = y()[_ / 4 + 0],
              l = y()[_ / 4 + 1];
            let g;
            return (
              0 !== s && ((g = O(s, l).slice()), c.__wbindgen_free(s, 1 * l)), g
            );
          } finally {
            c.__wbindgen_add_to_stack_pointer(16);
          }
        }
        set payment_version(s) {
          const l = E(s, c.__wbindgen_malloc, c.__wbindgen_realloc);
          c.paymentstrparams_set_payment_version(this.__wbg_ptr, l, D);
        }
        get payment_entry_point() {
          try {
            const _ = c.__wbindgen_add_to_stack_pointer(-16);
            c.paymentstrparams_payment_entry_point(_, this.__wbg_ptr);
            var s = y()[_ / 4 + 0],
              l = y()[_ / 4 + 1];
            let g;
            return (
              0 !== s && ((g = O(s, l).slice()), c.__wbindgen_free(s, 1 * l)), g
            );
          } finally {
            c.__wbindgen_add_to_stack_pointer(16);
          }
        }
        set payment_entry_point(s) {
          const l = E(s, c.__wbindgen_malloc, c.__wbindgen_realloc);
          c.paymentstrparams_set_payment_entry_point(this.__wbg_ptr, l, D);
        }
      }
      class pn {
        static __wrap(s) {
          s >>>= 0;
          const l = Object.create(pn.prototype);
          return (l.__wbg_ptr = s), l;
        }
        __destroy_into_raw() {
          const s = this.__wbg_ptr;
          return (this.__wbg_ptr = 0), s;
        }
        free() {
          const s = this.__destroy_into_raw();
          c.__wbg_publickey_free(s);
        }
        constructor(s) {
          try {
            const h = c.__wbindgen_add_to_stack_pointer(-16),
              S = E(s, c.__wbindgen_malloc, c.__wbindgen_realloc);
            c.publickey_new(h, S, D);
            var l = y()[h / 4 + 0],
              _ = y()[h / 4 + 1];
            if (y()[h / 4 + 2]) throw I(_);
            return pn.__wrap(l);
          } finally {
            c.__wbindgen_add_to_stack_pointer(16);
          }
        }
        static fromUint8Array(s) {
          const l = Ct(s, c.__wbindgen_malloc),
            g = c.publickey_fromUint8Array(l, D);
          return pn.__wrap(g);
        }
        toAccountHash() {
          const s = c.publickey_toAccountHash(this.__wbg_ptr);
          return pt.__wrap(s);
        }
        toPurseUref() {
          const s = c.publickey_toPurseUref(this.__wbg_ptr);
          return Jt.__wrap(s);
        }
        toJson() {
          return I(c.publickey_toJson(this.__wbg_ptr));
        }
      }
      class qn {
        static __wrap(s) {
          s >>>= 0;
          const l = Object.create(qn.prototype);
          return (l.__wbg_ptr = s), l;
        }
        __destroy_into_raw() {
          const s = this.__wbg_ptr;
          return (this.__wbg_ptr = 0), s;
        }
        free() {
          const s = this.__destroy_into_raw();
          c.__wbg_purseidentifier_free(s);
        }
        constructor(s) {
          P(s, pn);
          var l = s.__destroy_into_raw();
          const _ = c.accountidentifier_fromPublicKey(l);
          return qn.__wrap(_);
        }
        static fromAccountHash(s) {
          P(s, pt);
          var l = s.__destroy_into_raw();
          const _ = c.accountidentifier_fromAccountHash(l);
          return qn.__wrap(_);
        }
        static fromURef(s) {
          P(s, Jt);
          var l = s.__destroy_into_raw();
          const _ = c.purseidentifier_fromURef(l);
          return qn.__wrap(_);
        }
      }
      class As {
        static __wrap(s) {
          s >>>= 0;
          const l = Object.create(As.prototype);
          return (l.__wbg_ptr = s), l;
        }
        __destroy_into_raw() {
          const s = this.__wbg_ptr;
          return (this.__wbg_ptr = 0), s;
        }
        free() {
          const s = this.__destroy_into_raw();
          c.__wbg_putdeployresult_free(s);
        }
        get api_version() {
          return I(c.putdeployresult_api_version(this.__wbg_ptr));
        }
        get deploy_hash() {
          const s = c.putdeployresult_deploy_hash(this.__wbg_ptr);
          return fn.__wrap(s);
        }
        toJson() {
          return I(c.putdeployresult_toJson(this.__wbg_ptr));
        }
      }
      class Bi {
        static __wrap(s) {
          s >>>= 0;
          const l = Object.create(Bi.prototype);
          return (l.__wbg_ptr = s), l;
        }
        __destroy_into_raw() {
          const s = this.__wbg_ptr;
          return (this.__wbg_ptr = 0), s;
        }
        free() {
          const s = this.__destroy_into_raw();
          c.__wbg_querybalanceresult_free(s);
        }
        get api_version() {
          return I(c.querybalanceresult_api_version(this.__wbg_ptr));
        }
        get balance() {
          return I(c.querybalanceresult_balance(this.__wbg_ptr));
        }
        toJson() {
          return I(c.querybalanceresult_toJson(this.__wbg_ptr));
        }
      }
      class go {
        static __wrap(s) {
          s >>>= 0;
          const l = Object.create(go.prototype);
          return (l.__wbg_ptr = s), l;
        }
        __destroy_into_raw() {
          const s = this.__wbg_ptr;
          return (this.__wbg_ptr = 0), s;
        }
        free() {
          const s = this.__destroy_into_raw();
          c.__wbg_queryglobalstateresult_free(s);
        }
        get api_version() {
          return I(c.queryglobalstateresult_api_version(this.__wbg_ptr));
        }
        get block_header() {
          return I(c.queryglobalstateresult_block_header(this.__wbg_ptr));
        }
        get stored_value() {
          return I(c.queryglobalstateresult_stored_value(this.__wbg_ptr));
        }
        get merkle_proof() {
          let s, l;
          try {
            const h = c.__wbindgen_add_to_stack_pointer(-16);
            c.queryglobalstateresult_merkle_proof(h, this.__wbg_ptr);
            var _ = y()[h / 4 + 0],
              g = y()[h / 4 + 1];
            return (s = _), (l = g), O(_, g);
          } finally {
            c.__wbindgen_add_to_stack_pointer(16), c.__wbindgen_free(s, l, 1);
          }
        }
        toJson() {
          return I(c.queryglobalstateresult_toJson(this.__wbg_ptr));
        }
      }
      class Or {
        static __wrap(s) {
          s >>>= 0;
          const l = Object.create(Or.prototype);
          return (l.__wbg_ptr = s), l;
        }
        __destroy_into_raw() {
          const s = this.__wbg_ptr;
          return (this.__wbg_ptr = 0), s;
        }
        free() {
          const s = this.__destroy_into_raw();
          c.__wbg_sdk_free(s);
        }
        make_deploy(s, l, _) {
          try {
            const ae = c.__wbindgen_add_to_stack_pointer(-16);
            P(s, ht);
            var g = s.__destroy_into_raw();
            P(l, Wt);
            var h = l.__destroy_into_raw();
            P(_, Ft);
            var S = _.__destroy_into_raw();
            c.sdk_make_deploy(ae, this.__wbg_ptr, g, h, S);
            var x = y()[ae / 4 + 0],
              W = y()[ae / 4 + 1];
            if (y()[ae / 4 + 2]) throw I(W);
            return be.__wrap(x);
          } finally {
            c.__wbindgen_add_to_stack_pointer(16);
          }
        }
        deploy(s, l, _, g, h) {
          const S = E(s, c.__wbindgen_malloc, c.__wbindgen_realloc),
            x = D;
          P(l, ht);
          var W = l.__destroy_into_raw();
          P(_, Wt);
          var te = _.__destroy_into_raw();
          P(g, Ft);
          var ae = g.__destroy_into_raw();
          return I(c.sdk_deploy(this.__wbg_ptr, S, x, W, te, ae, k(h) ? 3 : h));
        }
        get_account_options(s) {
          const l = c.sdk_get_account_options(this.__wbg_ptr, H(s));
          return fr.__wrap(l);
        }
        get_account(s) {
          P(s, fr);
          var l = s.__destroy_into_raw();
          return I(c.sdk_get_account(this.__wbg_ptr, l));
        }
        state_get_account_info(s) {
          P(s, fr);
          var l = s.__destroy_into_raw();
          return I(c.sdk_state_get_account_info(this.__wbg_ptr, l));
        }
        get_block_transfers_options(s) {
          const l = c.sdk_get_block_transfers_options(this.__wbg_ptr, H(s));
          return mo.__wrap(l);
        }
        get_block_transfers(s) {
          P(s, mo);
          var l = s.__destroy_into_raw();
          return I(c.sdk_get_block_transfers(this.__wbg_ptr, l));
        }
        get_chainspec(s, l) {
          const _ = E(s, c.__wbindgen_malloc, c.__wbindgen_realloc);
          return I(c.sdk_get_chainspec(this.__wbg_ptr, _, D, k(l) ? 3 : l));
        }
        get_dictionary_item_options(s) {
          const l = c.sdk_get_dictionary_item_options(this.__wbg_ptr, H(s));
          return jr.__wrap(l);
        }
        get_dictionary_item(s) {
          P(s, jr);
          var l = s.__destroy_into_raw();
          return I(c.sdk_get_dictionary_item(this.__wbg_ptr, l));
        }
        state_get_dictionary_item(s) {
          P(s, jr);
          var l = s.__destroy_into_raw();
          return I(c.sdk_state_get_dictionary_item(this.__wbg_ptr, l));
        }
        get_era_info_options(s) {
          const l = c.sdk_get_era_info_options(this.__wbg_ptr, H(s));
          return wo.__wrap(l);
        }
        get_era_info(s) {
          P(s, wo);
          var l = s.__destroy_into_raw();
          return I(c.sdk_get_era_info(this.__wbg_ptr, l));
        }
        get_validator_changes(s, l) {
          const _ = E(s, c.__wbindgen_malloc, c.__wbindgen_realloc);
          return I(
            c.sdk_get_validator_changes(this.__wbg_ptr, _, D, k(l) ? 3 : l)
          );
        }
        speculative_exec_options(s) {
          const l = c.sdk_speculative_exec_options(this.__wbg_ptr, H(s));
          return yo.__wrap(l);
        }
        speculative_exec(s) {
          P(s, yo);
          var l = s.__destroy_into_raw();
          return I(c.sdk_speculative_exec(this.__wbg_ptr, l));
        }
        query_contract_dict_options(s) {
          const l = c.sdk_query_contract_dict_options(this.__wbg_ptr, H(s));
          return bo.__wrap(l);
        }
        query_contract_dict(s) {
          P(s, bo);
          var l = s.__destroy_into_raw();
          return I(c.sdk_query_contract_dict(this.__wbg_ptr, l));
        }
        query_contract_key_options(s) {
          const l = c.sdk_query_contract_key_options(this.__wbg_ptr, H(s));
          return zn.__wrap(l);
        }
        query_contract_key(s) {
          P(s, zn);
          var l = s.__destroy_into_raw();
          return I(c.sdk_query_contract_key(this.__wbg_ptr, l));
        }
        get_auction_info_options(s) {
          const l = c.sdk_get_auction_info_options(this.__wbg_ptr, H(s));
          return Fr.__wrap(l);
        }
        get_auction_info(s) {
          P(s, Fr);
          var l = s.__destroy_into_raw();
          return I(c.sdk_get_auction_info(this.__wbg_ptr, l));
        }
        get_balance_options(s) {
          const l = c.sdk_get_balance_options(this.__wbg_ptr, H(s));
          return pr.__wrap(l);
        }
        get_balance(s) {
          P(s, pr);
          var l = s.__destroy_into_raw();
          return I(c.sdk_get_balance(this.__wbg_ptr, l));
        }
        state_get_balance(s) {
          P(s, pr);
          var l = s.__destroy_into_raw();
          return I(c.sdk_state_get_balance(this.__wbg_ptr, l));
        }
        get_block_options(s) {
          const l = c.sdk_get_block_options(this.__wbg_ptr, H(s));
          return It.__wrap(l);
        }
        get_block(s) {
          P(s, It);
          var l = s.__destroy_into_raw();
          return I(c.sdk_get_block(this.__wbg_ptr, l));
        }
        chain_get_block(s) {
          P(s, It);
          var l = s.__destroy_into_raw();
          return I(c.sdk_chain_get_block(this.__wbg_ptr, l));
        }
        get_era_summary_options(s) {
          const l = c.sdk_get_era_summary_options(this.__wbg_ptr, H(s));
          return Hr.__wrap(l);
        }
        get_era_summary(s) {
          P(s, Hr);
          var l = s.__destroy_into_raw();
          return I(c.sdk_get_era_summary(this.__wbg_ptr, l));
        }
        get_node_status(s, l) {
          const _ = E(s, c.__wbindgen_malloc, c.__wbindgen_realloc);
          return I(c.sdk_get_node_status(this.__wbg_ptr, _, D, k(l) ? 3 : l));
        }
        get_peers(s, l) {
          const _ = E(s, c.__wbindgen_malloc, c.__wbindgen_realloc);
          return I(c.sdk_get_peers(this.__wbg_ptr, _, D, k(l) ? 3 : l));
        }
        list_rpcs(s, l) {
          const _ = E(s, c.__wbindgen_malloc, c.__wbindgen_realloc);
          return I(c.sdk_list_rpcs(this.__wbg_ptr, _, D, k(l) ? 3 : l));
        }
        query_balance_options(s) {
          const l = c.sdk_query_balance_options(this.__wbg_ptr, H(s));
          return Zt.__wrap(l);
        }
        query_balance(s) {
          P(s, Zt);
          var l = s.__destroy_into_raw();
          return I(c.sdk_query_balance(this.__wbg_ptr, l));
        }
        query_global_state_options(s) {
          const l = c.sdk_query_global_state_options(this.__wbg_ptr, H(s));
          return vo.__wrap(l);
        }
        query_global_state(s) {
          P(s, vo);
          var l = s.__destroy_into_raw();
          return I(c.sdk_query_global_state(this.__wbg_ptr, l));
        }
        call_entrypoint(s, l, _, g) {
          const h = E(s, c.__wbindgen_malloc, c.__wbindgen_realloc),
            S = D;
          P(l, ht);
          var x = l.__destroy_into_raw();
          P(_, Wt);
          var W = _.__destroy_into_raw();
          const te = E(g, c.__wbindgen_malloc, c.__wbindgen_realloc);
          return I(c.sdk_call_entrypoint(this.__wbg_ptr, h, S, x, W, te, D));
        }
        speculative_deploy(s, l, _, g, h, S) {
          const x = E(s, c.__wbindgen_malloc, c.__wbindgen_realloc),
            W = D;
          P(l, ht);
          var te = l.__destroy_into_raw();
          P(_, Wt);
          var ae = _.__destroy_into_raw();
          P(g, Ft);
          var Te = g.__destroy_into_raw();
          let Be = 0;
          return (
            k(h) || (P(h, Re), (Be = h.__destroy_into_raw())),
            I(
              c.sdk_speculative_deploy(
                this.__wbg_ptr,
                x,
                W,
                te,
                ae,
                Te,
                Be,
                k(S) ? 3 : S
              )
            )
          );
        }
        get_deploy_options(s) {
          const l = c.sdk_get_deploy_options(this.__wbg_ptr, H(s));
          return Lr.__wrap(l);
        }
        get_deploy(s) {
          P(s, Lr);
          var l = s.__destroy_into_raw();
          return I(c.sdk_get_deploy(this.__wbg_ptr, l));
        }
        info_get_deploy(s) {
          P(s, Lr);
          var l = s.__destroy_into_raw();
          return I(c.sdk_info_get_deploy(this.__wbg_ptr, l));
        }
        get_state_root_hash_options(s) {
          const l = c.sdk_get_state_root_hash_options(this.__wbg_ptr, H(s));
          return Vr.__wrap(l);
        }
        get_state_root_hash(s) {
          P(s, Vr);
          var l = s.__destroy_into_raw();
          return I(c.sdk_get_state_root_hash(this.__wbg_ptr, l));
        }
        chain_get_state_root_hash(s) {
          P(s, Vr);
          var l = s.__destroy_into_raw();
          return I(c.sdk_chain_get_state_root_hash(this.__wbg_ptr, l));
        }
        make_transfer(s, l, _, g, h) {
          try {
            const xe = c.__wbindgen_add_to_stack_pointer(-16),
              St = E(s, c.__wbindgen_malloc, c.__wbindgen_realloc),
              Mt = D,
              ce = E(l, c.__wbindgen_malloc, c.__wbindgen_realloc),
              wt = D;
            var S = k(_) ? 0 : E(_, c.__wbindgen_malloc, c.__wbindgen_realloc),
              x = D;
            P(g, ht);
            var W = g.__destroy_into_raw();
            P(h, Ft);
            var te = h.__destroy_into_raw();
            c.sdk_make_transfer(
              xe,
              this.__wbg_ptr,
              St,
              Mt,
              ce,
              wt,
              S,
              x,
              W,
              te
            );
            var ae = y()[xe / 4 + 0],
              Te = y()[xe / 4 + 1];
            if (y()[xe / 4 + 2]) throw I(Te);
            return be.__wrap(ae);
          } finally {
            c.__wbindgen_add_to_stack_pointer(16);
          }
        }
        sign_deploy(s, l) {
          P(s, be);
          var _ = s.__destroy_into_raw();
          const g = E(l, c.__wbindgen_malloc, c.__wbindgen_realloc),
            S = c.sdk_sign_deploy(this.__wbg_ptr, _, g, D);
          return be.__wrap(S);
        }
        speculative_transfer(s, l, _, g, h, S, x, W, te) {
          const ae = E(s, c.__wbindgen_malloc, c.__wbindgen_realloc),
            Te = D,
            Be = E(l, c.__wbindgen_malloc, c.__wbindgen_realloc),
            xe = D,
            St = E(_, c.__wbindgen_malloc, c.__wbindgen_realloc),
            Mt = D;
          var ce = k(g) ? 0 : E(g, c.__wbindgen_malloc, c.__wbindgen_realloc),
            wt = D;
          P(h, ht);
          var Pe = h.__destroy_into_raw();
          P(S, Ft);
          var Gn = S.__destroy_into_raw(),
            Br = k(x) ? 0 : E(x, c.__wbindgen_malloc, c.__wbindgen_realloc),
            Wn = D;
          let K = 0;
          return (
            k(W) || (P(W, Re), (K = W.__destroy_into_raw())),
            I(
              c.sdk_speculative_transfer(
                this.__wbg_ptr,
                ae,
                Te,
                Be,
                xe,
                St,
                Mt,
                ce,
                wt,
                Pe,
                Gn,
                Br,
                Wn,
                K,
                k(te) ? 3 : te
              )
            )
          );
        }
        put_deploy(s, l, _) {
          const g = E(s, c.__wbindgen_malloc, c.__wbindgen_realloc),
            h = D;
          P(l, be);
          var S = l.__destroy_into_raw();
          return I(c.sdk_put_deploy(this.__wbg_ptr, g, h, S, k(_) ? 3 : _));
        }
        account_put_deploy(s, l, _) {
          const g = E(s, c.__wbindgen_malloc, c.__wbindgen_realloc),
            h = D;
          P(l, be);
          var S = l.__destroy_into_raw();
          return I(
            c.sdk_account_put_deploy(this.__wbg_ptr, g, h, S, k(_) ? 3 : _)
          );
        }
        constructor() {
          const s = c.sdk_new();
          return Or.__wrap(s);
        }
        install(s, l, _, g) {
          const h = E(s, c.__wbindgen_malloc, c.__wbindgen_realloc),
            S = D;
          P(l, ht);
          var x = l.__destroy_into_raw();
          P(_, Wt);
          var W = _.__destroy_into_raw();
          const te = E(g, c.__wbindgen_malloc, c.__wbindgen_realloc);
          return I(c.sdk_install(this.__wbg_ptr, h, S, x, W, te, D));
        }
        transfer(s, l, _, g, h, S, x) {
          const W = E(s, c.__wbindgen_malloc, c.__wbindgen_realloc),
            te = D,
            ae = E(l, c.__wbindgen_malloc, c.__wbindgen_realloc),
            Te = D,
            Be = E(_, c.__wbindgen_malloc, c.__wbindgen_realloc),
            xe = D;
          var St = k(g) ? 0 : E(g, c.__wbindgen_malloc, c.__wbindgen_realloc),
            Mt = D;
          P(h, ht);
          var ce = h.__destroy_into_raw();
          P(S, Ft);
          var wt = S.__destroy_into_raw();
          return I(
            c.sdk_transfer(
              this.__wbg_ptr,
              W,
              te,
              ae,
              Te,
              Be,
              xe,
              St,
              Mt,
              ce,
              wt,
              k(x) ? 3 : x
            )
          );
        }
      }
      class Wt {
        static __wrap(s) {
          s >>>= 0;
          const l = Object.create(Wt.prototype);
          return (l.__wbg_ptr = s), l;
        }
        __destroy_into_raw() {
          const s = this.__wbg_ptr;
          return (this.__wbg_ptr = 0), s;
        }
        free() {
          const s = this.__destroy_into_raw();
          c.__wbg_sessionstrparams_free(s);
        }
        constructor(s, l, _, g, h, S, x, W, te, ae, Te, Be) {
          var xe = k(s) ? 0 : E(s, c.__wbindgen_malloc, c.__wbindgen_realloc),
            St = D,
            Mt = k(l) ? 0 : E(l, c.__wbindgen_malloc, c.__wbindgen_realloc),
            ce = D,
            wt = k(_) ? 0 : E(_, c.__wbindgen_malloc, c.__wbindgen_realloc),
            Pe = D,
            Gn = k(g) ? 0 : E(g, c.__wbindgen_malloc, c.__wbindgen_realloc),
            Br = D,
            Wn = k(h) ? 0 : E(h, c.__wbindgen_malloc, c.__wbindgen_realloc),
            K = D;
          let Mn = 0;
          k(S) || (P(S, gt), (Mn = S.__destroy_into_raw()));
          var $r = k(W) ? 0 : E(W, c.__wbindgen_malloc, c.__wbindgen_realloc),
            Gi = D,
            Eo = k(te) ? 0 : E(te, c.__wbindgen_malloc, c.__wbindgen_realloc),
            U = D,
            gr = k(ae) ? 0 : E(ae, c.__wbindgen_malloc, c.__wbindgen_realloc),
            Y = D,
            me = k(Te) ? 0 : E(Te, c.__wbindgen_malloc, c.__wbindgen_realloc),
            Rs = D;
          const Wi = c.sessionstrparams_new(
            xe,
            St,
            Mt,
            ce,
            wt,
            Pe,
            Gn,
            Br,
            Wn,
            K,
            Mn,
            k(x) ? 0 : H(x),
            $r,
            Gi,
            Eo,
            U,
            gr,
            Y,
            me,
            Rs,
            k(Be) ? 16777215 : Be ? 1 : 0
          );
          return Wt.__wrap(Wi);
        }
        get session_hash() {
          try {
            const _ = c.__wbindgen_add_to_stack_pointer(-16);
            c.sessionstrparams_session_hash(_, this.__wbg_ptr);
            var s = y()[_ / 4 + 0],
              l = y()[_ / 4 + 1];
            let g;
            return (
              0 !== s && ((g = O(s, l).slice()), c.__wbindgen_free(s, 1 * l)), g
            );
          } finally {
            c.__wbindgen_add_to_stack_pointer(16);
          }
        }
        set session_hash(s) {
          const l = E(s, c.__wbindgen_malloc, c.__wbindgen_realloc);
          c.sessionstrparams_set_session_hash(this.__wbg_ptr, l, D);
        }
        get session_name() {
          try {
            const _ = c.__wbindgen_add_to_stack_pointer(-16);
            c.sessionstrparams_session_name(_, this.__wbg_ptr);
            var s = y()[_ / 4 + 0],
              l = y()[_ / 4 + 1];
            let g;
            return (
              0 !== s && ((g = O(s, l).slice()), c.__wbindgen_free(s, 1 * l)), g
            );
          } finally {
            c.__wbindgen_add_to_stack_pointer(16);
          }
        }
        set session_name(s) {
          const l = E(s, c.__wbindgen_malloc, c.__wbindgen_realloc);
          c.sessionstrparams_set_session_name(this.__wbg_ptr, l, D);
        }
        get session_package_hash() {
          try {
            const _ = c.__wbindgen_add_to_stack_pointer(-16);
            c.sessionstrparams_session_package_hash(_, this.__wbg_ptr);
            var s = y()[_ / 4 + 0],
              l = y()[_ / 4 + 1];
            let g;
            return (
              0 !== s && ((g = O(s, l).slice()), c.__wbindgen_free(s, 1 * l)), g
            );
          } finally {
            c.__wbindgen_add_to_stack_pointer(16);
          }
        }
        set session_package_hash(s) {
          const l = E(s, c.__wbindgen_malloc, c.__wbindgen_realloc);
          c.sessionstrparams_set_session_package_hash(this.__wbg_ptr, l, D);
        }
        get session_package_name() {
          try {
            const _ = c.__wbindgen_add_to_stack_pointer(-16);
            c.sessionstrparams_session_package_name(_, this.__wbg_ptr);
            var s = y()[_ / 4 + 0],
              l = y()[_ / 4 + 1];
            let g;
            return (
              0 !== s && ((g = O(s, l).slice()), c.__wbindgen_free(s, 1 * l)), g
            );
          } finally {
            c.__wbindgen_add_to_stack_pointer(16);
          }
        }
        set session_package_name(s) {
          const l = E(s, c.__wbindgen_malloc, c.__wbindgen_realloc);
          c.sessionstrparams_set_session_package_name(this.__wbg_ptr, l, D);
        }
        get session_path() {
          try {
            const _ = c.__wbindgen_add_to_stack_pointer(-16);
            c.sessionstrparams_session_path(_, this.__wbg_ptr);
            var s = y()[_ / 4 + 0],
              l = y()[_ / 4 + 1];
            let g;
            return (
              0 !== s && ((g = O(s, l).slice()), c.__wbindgen_free(s, 1 * l)), g
            );
          } finally {
            c.__wbindgen_add_to_stack_pointer(16);
          }
        }
        set session_path(s) {
          const l = E(s, c.__wbindgen_malloc, c.__wbindgen_realloc);
          c.sessionstrparams_set_session_path(this.__wbg_ptr, l, D);
        }
        get session_bytes() {
          const s = c.sessionstrparams_session_bytes(this.__wbg_ptr);
          return 0 === s ? void 0 : gt.__wrap(s);
        }
        set session_bytes(s) {
          P(s, gt);
          var l = s.__destroy_into_raw();
          c.sessionstrparams_set_session_bytes(this.__wbg_ptr, l);
        }
        get session_args_simple() {
          const s = c.sessionstrparams_session_args_simple(this.__wbg_ptr);
          return 0 === s ? void 0 : Gt.__wrap(s);
        }
        set session_args_simple(s) {
          c.sessionstrparams_set_session_args_simple(this.__wbg_ptr, H(s));
        }
        get session_args_json() {
          try {
            const _ = c.__wbindgen_add_to_stack_pointer(-16);
            c.sessionstrparams_session_args_json(_, this.__wbg_ptr);
            var s = y()[_ / 4 + 0],
              l = y()[_ / 4 + 1];
            let g;
            return (
              0 !== s && ((g = O(s, l).slice()), c.__wbindgen_free(s, 1 * l)), g
            );
          } finally {
            c.__wbindgen_add_to_stack_pointer(16);
          }
        }
        set session_args_json(s) {
          const l = E(s, c.__wbindgen_malloc, c.__wbindgen_realloc);
          c.sessionstrparams_set_session_args_json(this.__wbg_ptr, l, D);
        }
        get session_args_complex() {
          try {
            const _ = c.__wbindgen_add_to_stack_pointer(-16);
            c.sessionstrparams_session_args_complex(_, this.__wbg_ptr);
            var s = y()[_ / 4 + 0],
              l = y()[_ / 4 + 1];
            let g;
            return (
              0 !== s && ((g = O(s, l).slice()), c.__wbindgen_free(s, 1 * l)), g
            );
          } finally {
            c.__wbindgen_add_to_stack_pointer(16);
          }
        }
        set session_args_complex(s) {
          const l = E(s, c.__wbindgen_malloc, c.__wbindgen_realloc);
          c.sessionstrparams_set_session_args_complex(this.__wbg_ptr, l, D);
        }
        get session_version() {
          try {
            const _ = c.__wbindgen_add_to_stack_pointer(-16);
            c.sessionstrparams_session_version(_, this.__wbg_ptr);
            var s = y()[_ / 4 + 0],
              l = y()[_ / 4 + 1];
            let g;
            return (
              0 !== s && ((g = O(s, l).slice()), c.__wbindgen_free(s, 1 * l)), g
            );
          } finally {
            c.__wbindgen_add_to_stack_pointer(16);
          }
        }
        set session_version(s) {
          const l = E(s, c.__wbindgen_malloc, c.__wbindgen_realloc);
          c.sessionstrparams_set_session_version(this.__wbg_ptr, l, D);
        }
        get session_entry_point() {
          try {
            const _ = c.__wbindgen_add_to_stack_pointer(-16);
            c.sessionstrparams_session_entry_point(_, this.__wbg_ptr);
            var s = y()[_ / 4 + 0],
              l = y()[_ / 4 + 1];
            let g;
            return (
              0 !== s && ((g = O(s, l).slice()), c.__wbindgen_free(s, 1 * l)), g
            );
          } finally {
            c.__wbindgen_add_to_stack_pointer(16);
          }
        }
        set session_entry_point(s) {
          const l = E(s, c.__wbindgen_malloc, c.__wbindgen_realloc);
          c.sessionstrparams_set_session_entry_point(this.__wbg_ptr, l, D);
        }
        get is_session_transfer() {
          const s = c.sessionstrparams_is_session_transfer(this.__wbg_ptr);
          return 16777215 === s ? void 0 : 0 !== s;
        }
        set is_session_transfer(s) {
          c.sessionstrparams_set_is_session_transfer(this.__wbg_ptr, s);
        }
      }
      class ho {
        static __wrap(s) {
          s >>>= 0;
          const l = Object.create(ho.prototype);
          return (l.__wbg_ptr = s), l;
        }
        __destroy_into_raw() {
          const s = this.__wbg_ptr;
          return (this.__wbg_ptr = 0), s;
        }
        free() {
          const s = this.__destroy_into_raw();
          c.__wbg_speculativeexecresult_free(s);
        }
        get api_version() {
          return I(c.speculativeexecresult_api_version(this.__wbg_ptr));
        }
        get block_hash() {
          const s = c.speculativeexecresult_block_hash(this.__wbg_ptr);
          return st.__wrap(s);
        }
        get execution_result() {
          return I(c.speculativeexecresult_execution_result(this.__wbg_ptr));
        }
        toJson() {
          return I(c.speculativeexecresult_toJson(this.__wbg_ptr));
        }
      }
      class dr {
        static __wrap(s) {
          s >>>= 0;
          const l = Object.create(dr.prototype);
          return (l.__wbg_ptr = s), l;
        }
        __destroy_into_raw() {
          const s = this.__wbg_ptr;
          return (this.__wbg_ptr = 0), s;
        }
        free() {
          const s = this.__destroy_into_raw();
          c.__wbg_transferaddr_free(s);
        }
        constructor(s) {
          try {
            const h = c.__wbindgen_add_to_stack_pointer(-16),
              S = Ct(s, c.__wbindgen_malloc);
            c.transferaddr_new(h, S, D);
            var l = y()[h / 4 + 0],
              _ = y()[h / 4 + 1];
            if (y()[h / 4 + 2]) throw I(_);
            return dr.__wrap(l);
          } finally {
            c.__wbindgen_add_to_stack_pointer(16);
          }
        }
      }
      class Jt {
        static __wrap(s) {
          s >>>= 0;
          const l = Object.create(Jt.prototype);
          return (l.__wbg_ptr = s), l;
        }
        __destroy_into_raw() {
          const s = this.__wbg_ptr;
          return (this.__wbg_ptr = 0), s;
        }
        free() {
          const s = this.__destroy_into_raw();
          c.__wbg_uref_free(s);
        }
        constructor(s, l) {
          try {
            const S = c.__wbindgen_add_to_stack_pointer(-16),
              x = E(s, c.__wbindgen_malloc, c.__wbindgen_realloc);
            c.uref_new(S, x, D, l);
            var _ = y()[S / 4 + 0],
              g = y()[S / 4 + 1];
            if (y()[S / 4 + 2]) throw I(g);
            return Jt.__wrap(_);
          } finally {
            c.__wbindgen_add_to_stack_pointer(16);
          }
        }
        static fromUint8Array(s, l) {
          const _ = Ct(s, c.__wbindgen_malloc),
            h = c.uref_fromUint8Array(_, D, l);
          return Jt.__wrap(h);
        }
        toFormattedString() {
          let s, l;
          try {
            const h = c.__wbindgen_add_to_stack_pointer(-16);
            c.uref_toFormattedString(h, this.__wbg_ptr);
            var _ = y()[h / 4 + 0],
              g = y()[h / 4 + 1];
            return (s = _), (l = g), O(_, g);
          } finally {
            c.__wbindgen_add_to_stack_pointer(16), c.__wbindgen_free(s, l, 1);
          }
        }
        toJson() {
          return I(c.uref_toJson(this.__wbg_ptr));
        }
      }
      class _r {
        static __wrap(s) {
          s >>>= 0;
          const l = Object.create(_r.prototype);
          return (l.__wbg_ptr = s), l;
        }
        __destroy_into_raw() {
          const s = this.__wbg_ptr;
          return (this.__wbg_ptr = 0), s;
        }
        free() {
          const s = this.__destroy_into_raw();
          c.__wbg_urefaddr_free(s);
        }
        constructor(s) {
          try {
            const h = c.__wbindgen_add_to_stack_pointer(-16),
              S = Ct(s, c.__wbindgen_malloc);
            c.urefaddr_new(h, S, D);
            var l = y()[h / 4 + 0],
              _ = y()[h / 4 + 1];
            if (y()[h / 4 + 2]) throw I(_);
            return _r.__wrap(l);
          } finally {
            c.__wbindgen_add_to_stack_pointer(16);
          }
        }
      }
      class fr {
        static __wrap(s) {
          s >>>= 0;
          const l = Object.create(fr.prototype);
          return (l.__wbg_ptr = s), l;
        }
        __destroy_into_raw() {
          const s = this.__wbg_ptr;
          return (this.__wbg_ptr = 0), s;
        }
        free() {
          const s = this.__destroy_into_raw();
          c.__wbg_getaccountoptions_free(s);
        }
        get node_address() {
          let s, l;
          try {
            const h = c.__wbindgen_add_to_stack_pointer(-16);
            c.__wbg_get_getaccountoptions_node_address(h, this.__wbg_ptr);
            var _ = y()[h / 4 + 0],
              g = y()[h / 4 + 1];
            return (s = _), (l = g), O(_, g);
          } finally {
            c.__wbindgen_add_to_stack_pointer(16), c.__wbindgen_free(s, l, 1);
          }
        }
        set node_address(s) {
          const l = E(s, c.__wbindgen_malloc, c.__wbindgen_realloc);
          c.__wbg_set_getaccountoptions_node_address(this.__wbg_ptr, l, D);
        }
        get account_identifier() {
          const s = c.__wbg_get_getaccountoptions_account_identifier(
            this.__wbg_ptr
          );
          return 0 === s ? void 0 : lr.__wrap(s);
        }
        set account_identifier(s) {
          let l = 0;
          k(s) || (P(s, lr), (l = s.__destroy_into_raw())),
            c.__wbg_set_getaccountoptions_account_identifier(this.__wbg_ptr, l);
        }
        get account_identifier_as_string() {
          try {
            const _ = c.__wbindgen_add_to_stack_pointer(-16);
            c.__wbg_get_getaccountoptions_account_identifier_as_string(
              _,
              this.__wbg_ptr
            );
            var s = y()[_ / 4 + 0],
              l = y()[_ / 4 + 1];
            let g;
            return (
              0 !== s && ((g = O(s, l).slice()), c.__wbindgen_free(s, 1 * l)), g
            );
          } finally {
            c.__wbindgen_add_to_stack_pointer(16);
          }
        }
        set account_identifier_as_string(s) {
          var l = k(s) ? 0 : E(s, c.__wbindgen_malloc, c.__wbindgen_realloc);
          c.__wbg_set_getaccountoptions_account_identifier_as_string(
            this.__wbg_ptr,
            l,
            D
          );
        }
        get maybe_block_id_as_string() {
          try {
            const _ = c.__wbindgen_add_to_stack_pointer(-16);
            c.__wbg_get_getaccountoptions_maybe_block_id_as_string(
              _,
              this.__wbg_ptr
            );
            var s = y()[_ / 4 + 0],
              l = y()[_ / 4 + 1];
            let g;
            return (
              0 !== s && ((g = O(s, l).slice()), c.__wbindgen_free(s, 1 * l)), g
            );
          } finally {
            c.__wbindgen_add_to_stack_pointer(16);
          }
        }
        set maybe_block_id_as_string(s) {
          var l = k(s) ? 0 : E(s, c.__wbindgen_malloc, c.__wbindgen_realloc);
          c.__wbg_set_getaccountoptions_maybe_block_id_as_string(
            this.__wbg_ptr,
            l,
            D
          );
        }
        get maybe_block_identifier() {
          const s = c.__wbg_get_getaccountoptions_maybe_block_identifier(
            this.__wbg_ptr
          );
          return 0 === s ? void 0 : Re.__wrap(s);
        }
        set maybe_block_identifier(s) {
          let l = 0;
          k(s) || (P(s, Re), (l = s.__destroy_into_raw())),
            c.__wbg_set_getaccountoptions_maybe_block_identifier(
              this.__wbg_ptr,
              l
            );
        }
        get verbosity() {
          const s = c.__wbg_get_getaccountoptions_verbosity(this.__wbg_ptr);
          return 3 === s ? void 0 : s;
        }
        set verbosity(s) {
          c.__wbg_set_getaccountoptions_verbosity(this.__wbg_ptr, k(s) ? 3 : s);
        }
      }
      class Fr {
        static __wrap(s) {
          s >>>= 0;
          const l = Object.create(Fr.prototype);
          return (l.__wbg_ptr = s), l;
        }
        __destroy_into_raw() {
          const s = this.__wbg_ptr;
          return (this.__wbg_ptr = 0), s;
        }
        free() {
          const s = this.__destroy_into_raw();
          c.__wbg_getauctioninfooptions_free(s);
        }
        get node_address() {
          let s, l;
          try {
            const h = c.__wbindgen_add_to_stack_pointer(-16);
            c.__wbg_get_getauctioninfooptions_node_address(h, this.__wbg_ptr);
            var _ = y()[h / 4 + 0],
              g = y()[h / 4 + 1];
            return (s = _), (l = g), O(_, g);
          } finally {
            c.__wbindgen_add_to_stack_pointer(16), c.__wbindgen_free(s, l, 1);
          }
        }
        set node_address(s) {
          const l = E(s, c.__wbindgen_malloc, c.__wbindgen_realloc);
          c.__wbg_set_getauctioninfooptions_node_address(this.__wbg_ptr, l, D);
        }
        get maybe_block_id_as_string() {
          try {
            const _ = c.__wbindgen_add_to_stack_pointer(-16);
            c.__wbg_get_getauctioninfooptions_maybe_block_id_as_string(
              _,
              this.__wbg_ptr
            );
            var s = y()[_ / 4 + 0],
              l = y()[_ / 4 + 1];
            let g;
            return (
              0 !== s && ((g = O(s, l).slice()), c.__wbindgen_free(s, 1 * l)), g
            );
          } finally {
            c.__wbindgen_add_to_stack_pointer(16);
          }
        }
        set maybe_block_id_as_string(s) {
          var l = k(s) ? 0 : E(s, c.__wbindgen_malloc, c.__wbindgen_realloc);
          c.__wbg_set_getauctioninfooptions_maybe_block_id_as_string(
            this.__wbg_ptr,
            l,
            D
          );
        }
        get maybe_block_identifier() {
          const s = c.__wbg_get_getauctioninfooptions_maybe_block_identifier(
            this.__wbg_ptr
          );
          return 0 === s ? void 0 : Re.__wrap(s);
        }
        set maybe_block_identifier(s) {
          let l = 0;
          k(s) || (P(s, Re), (l = s.__destroy_into_raw())),
            c.__wbg_set_getauctioninfooptions_maybe_block_identifier(
              this.__wbg_ptr,
              l
            );
        }
        get verbosity() {
          const s = c.__wbg_get_getauctioninfooptions_verbosity(this.__wbg_ptr);
          return 3 === s ? void 0 : s;
        }
        set verbosity(s) {
          c.__wbg_set_getauctioninfooptions_verbosity(
            this.__wbg_ptr,
            k(s) ? 3 : s
          );
        }
      }
      class pr {
        static __wrap(s) {
          s >>>= 0;
          const l = Object.create(pr.prototype);
          return (l.__wbg_ptr = s), l;
        }
        __destroy_into_raw() {
          const s = this.__wbg_ptr;
          return (this.__wbg_ptr = 0), s;
        }
        free() {
          const s = this.__destroy_into_raw();
          c.__wbg_getbalanceoptions_free(s);
        }
        get node_address() {
          let s, l;
          try {
            const h = c.__wbindgen_add_to_stack_pointer(-16);
            c.__wbg_get_getbalanceoptions_node_address(h, this.__wbg_ptr);
            var _ = y()[h / 4 + 0],
              g = y()[h / 4 + 1];
            return (s = _), (l = g), O(_, g);
          } finally {
            c.__wbindgen_add_to_stack_pointer(16), c.__wbindgen_free(s, l, 1);
          }
        }
        set node_address(s) {
          const l = E(s, c.__wbindgen_malloc, c.__wbindgen_realloc);
          c.__wbg_set_getbalanceoptions_node_address(this.__wbg_ptr, l, D);
        }
        get state_root_hash_as_string() {
          try {
            const _ = c.__wbindgen_add_to_stack_pointer(-16);
            c.__wbg_get_getbalanceoptions_state_root_hash_as_string(
              _,
              this.__wbg_ptr
            );
            var s = y()[_ / 4 + 0],
              l = y()[_ / 4 + 1];
            let g;
            return (
              0 !== s && ((g = O(s, l).slice()), c.__wbindgen_free(s, 1 * l)), g
            );
          } finally {
            c.__wbindgen_add_to_stack_pointer(16);
          }
        }
        set state_root_hash_as_string(s) {
          var l = k(s) ? 0 : E(s, c.__wbindgen_malloc, c.__wbindgen_realloc);
          c.__wbg_set_getbalanceoptions_state_root_hash_as_string(
            this.__wbg_ptr,
            l,
            D
          );
        }
        get state_root_hash() {
          const s = c.__wbg_get_getbalanceoptions_state_root_hash(
            this.__wbg_ptr
          );
          return 0 === s ? void 0 : Ue.__wrap(s);
        }
        set state_root_hash(s) {
          let l = 0;
          k(s) || (P(s, Ue), (l = s.__destroy_into_raw())),
            c.__wbg_set_getbalanceoptions_state_root_hash(this.__wbg_ptr, l);
        }
        get purse_uref_as_string() {
          try {
            const _ = c.__wbindgen_add_to_stack_pointer(-16);
            c.__wbg_get_getbalanceoptions_purse_uref_as_string(
              _,
              this.__wbg_ptr
            );
            var s = y()[_ / 4 + 0],
              l = y()[_ / 4 + 1];
            let g;
            return (
              0 !== s && ((g = O(s, l).slice()), c.__wbindgen_free(s, 1 * l)), g
            );
          } finally {
            c.__wbindgen_add_to_stack_pointer(16);
          }
        }
        set purse_uref_as_string(s) {
          var l = k(s) ? 0 : E(s, c.__wbindgen_malloc, c.__wbindgen_realloc);
          c.__wbg_set_getbalanceoptions_purse_uref_as_string(
            this.__wbg_ptr,
            l,
            D
          );
        }
        get purse_uref() {
          const s = c.__wbg_get_getbalanceoptions_purse_uref(this.__wbg_ptr);
          return 0 === s ? void 0 : Jt.__wrap(s);
        }
        set purse_uref(s) {
          let l = 0;
          k(s) || (P(s, Jt), (l = s.__destroy_into_raw())),
            c.__wbg_set_getbalanceoptions_purse_uref(this.__wbg_ptr, l);
        }
        get verbosity() {
          const s = c.__wbg_get_getbalanceoptions_verbosity(this.__wbg_ptr);
          return 3 === s ? void 0 : s;
        }
        set verbosity(s) {
          c.__wbg_set_getbalanceoptions_verbosity(this.__wbg_ptr, k(s) ? 3 : s);
        }
      }
      class It {
        static __wrap(s) {
          s >>>= 0;
          const l = Object.create(It.prototype);
          return (l.__wbg_ptr = s), l;
        }
        __destroy_into_raw() {
          const s = this.__wbg_ptr;
          return (this.__wbg_ptr = 0), s;
        }
        free() {
          const s = this.__destroy_into_raw();
          c.__wbg_getblockoptions_free(s);
        }
        get node_address() {
          let s, l;
          try {
            const h = c.__wbindgen_add_to_stack_pointer(-16);
            c.__wbg_get_getauctioninfooptions_node_address(h, this.__wbg_ptr);
            var _ = y()[h / 4 + 0],
              g = y()[h / 4 + 1];
            return (s = _), (l = g), O(_, g);
          } finally {
            c.__wbindgen_add_to_stack_pointer(16), c.__wbindgen_free(s, l, 1);
          }
        }
        set node_address(s) {
          const l = E(s, c.__wbindgen_malloc, c.__wbindgen_realloc);
          c.__wbg_set_getauctioninfooptions_node_address(this.__wbg_ptr, l, D);
        }
        get maybe_block_id_as_string() {
          try {
            const _ = c.__wbindgen_add_to_stack_pointer(-16);
            c.__wbg_get_getauctioninfooptions_maybe_block_id_as_string(
              _,
              this.__wbg_ptr
            );
            var s = y()[_ / 4 + 0],
              l = y()[_ / 4 + 1];
            let g;
            return (
              0 !== s && ((g = O(s, l).slice()), c.__wbindgen_free(s, 1 * l)), g
            );
          } finally {
            c.__wbindgen_add_to_stack_pointer(16);
          }
        }
        set maybe_block_id_as_string(s) {
          var l = k(s) ? 0 : E(s, c.__wbindgen_malloc, c.__wbindgen_realloc);
          c.__wbg_set_getauctioninfooptions_maybe_block_id_as_string(
            this.__wbg_ptr,
            l,
            D
          );
        }
        get maybe_block_identifier() {
          const s = c.__wbg_get_getauctioninfooptions_maybe_block_identifier(
            this.__wbg_ptr
          );
          return 0 === s ? void 0 : Re.__wrap(s);
        }
        set maybe_block_identifier(s) {
          let l = 0;
          k(s) || (P(s, Re), (l = s.__destroy_into_raw())),
            c.__wbg_set_getauctioninfooptions_maybe_block_identifier(
              this.__wbg_ptr,
              l
            );
        }
        get verbosity() {
          const s = c.__wbg_get_getauctioninfooptions_verbosity(this.__wbg_ptr);
          return 3 === s ? void 0 : s;
        }
        set verbosity(s) {
          c.__wbg_set_getauctioninfooptions_verbosity(
            this.__wbg_ptr,
            k(s) ? 3 : s
          );
        }
      }
      class mo {
        static __wrap(s) {
          s >>>= 0;
          const l = Object.create(mo.prototype);
          return (l.__wbg_ptr = s), l;
        }
        __destroy_into_raw() {
          const s = this.__wbg_ptr;
          return (this.__wbg_ptr = 0), s;
        }
        free() {
          const s = this.__destroy_into_raw();
          c.__wbg_getblocktransfersoptions_free(s);
        }
        get node_address() {
          let s, l;
          try {
            const h = c.__wbindgen_add_to_stack_pointer(-16);
            c.__wbg_get_getblocktransfersoptions_node_address(
              h,
              this.__wbg_ptr
            );
            var _ = y()[h / 4 + 0],
              g = y()[h / 4 + 1];
            return (s = _), (l = g), O(_, g);
          } finally {
            c.__wbindgen_add_to_stack_pointer(16), c.__wbindgen_free(s, l, 1);
          }
        }
        set node_address(s) {
          const l = E(s, c.__wbindgen_malloc, c.__wbindgen_realloc);
          c.__wbg_set_getblocktransfersoptions_node_address(
            this.__wbg_ptr,
            l,
            D
          );
        }
        get maybe_block_id_as_string() {
          try {
            const _ = c.__wbindgen_add_to_stack_pointer(-16);
            c.__wbg_get_getblocktransfersoptions_maybe_block_id_as_string(
              _,
              this.__wbg_ptr
            );
            var s = y()[_ / 4 + 0],
              l = y()[_ / 4 + 1];
            let g;
            return (
              0 !== s && ((g = O(s, l).slice()), c.__wbindgen_free(s, 1 * l)), g
            );
          } finally {
            c.__wbindgen_add_to_stack_pointer(16);
          }
        }
        set maybe_block_id_as_string(s) {
          var l = k(s) ? 0 : E(s, c.__wbindgen_malloc, c.__wbindgen_realloc);
          c.__wbg_set_getblocktransfersoptions_maybe_block_id_as_string(
            this.__wbg_ptr,
            l,
            D
          );
        }
        get maybe_block_identifier() {
          const s = c.__wbg_get_getaccountoptions_maybe_block_identifier(
            this.__wbg_ptr
          );
          return 0 === s ? void 0 : Re.__wrap(s);
        }
        set maybe_block_identifier(s) {
          let l = 0;
          k(s) || (P(s, Re), (l = s.__destroy_into_raw())),
            c.__wbg_set_getaccountoptions_maybe_block_identifier(
              this.__wbg_ptr,
              l
            );
        }
        get verbosity() {
          const s = c.__wbg_get_getblocktransfersoptions_verbosity(
            this.__wbg_ptr
          );
          return 3 === s ? void 0 : s;
        }
        set verbosity(s) {
          c.__wbg_set_getblocktransfersoptions_verbosity(
            this.__wbg_ptr,
            k(s) ? 3 : s
          );
        }
      }
      class Lr {
        static __wrap(s) {
          s >>>= 0;
          const l = Object.create(Lr.prototype);
          return (l.__wbg_ptr = s), l;
        }
        __destroy_into_raw() {
          const s = this.__wbg_ptr;
          return (this.__wbg_ptr = 0), s;
        }
        free() {
          const s = this.__destroy_into_raw();
          c.__wbg_getdeployoptions_free(s);
        }
        get node_address() {
          let s, l;
          try {
            const h = c.__wbindgen_add_to_stack_pointer(-16);
            c.__wbg_get_getdeployoptions_node_address(h, this.__wbg_ptr);
            var _ = y()[h / 4 + 0],
              g = y()[h / 4 + 1];
            return (s = _), (l = g), O(_, g);
          } finally {
            c.__wbindgen_add_to_stack_pointer(16), c.__wbindgen_free(s, l, 1);
          }
        }
        set node_address(s) {
          const l = E(s, c.__wbindgen_malloc, c.__wbindgen_realloc);
          c.__wbg_set_getdeployoptions_node_address(this.__wbg_ptr, l, D);
        }
        get deploy_hash_as_string() {
          try {
            const _ = c.__wbindgen_add_to_stack_pointer(-16);
            c.__wbg_get_getdeployoptions_deploy_hash_as_string(
              _,
              this.__wbg_ptr
            );
            var s = y()[_ / 4 + 0],
              l = y()[_ / 4 + 1];
            let g;
            return (
              0 !== s && ((g = O(s, l).slice()), c.__wbindgen_free(s, 1 * l)), g
            );
          } finally {
            c.__wbindgen_add_to_stack_pointer(16);
          }
        }
        set deploy_hash_as_string(s) {
          var l = k(s) ? 0 : E(s, c.__wbindgen_malloc, c.__wbindgen_realloc);
          c.__wbg_set_getdeployoptions_deploy_hash_as_string(
            this.__wbg_ptr,
            l,
            D
          );
        }
        get deploy_hash() {
          const s = c.__wbg_get_getdeployoptions_deploy_hash(this.__wbg_ptr);
          return 0 === s ? void 0 : fn.__wrap(s);
        }
        set deploy_hash(s) {
          let l = 0;
          k(s) || (P(s, fn), (l = s.__destroy_into_raw())),
            c.__wbg_set_getdeployoptions_deploy_hash(this.__wbg_ptr, l);
        }
        get finalized_approvals() {
          const s = c.__wbg_get_getdeployoptions_finalized_approvals(
            this.__wbg_ptr
          );
          return 16777215 === s ? void 0 : 0 !== s;
        }
        set finalized_approvals(s) {
          c.__wbg_set_getdeployoptions_finalized_approvals(
            this.__wbg_ptr,
            k(s) ? 16777215 : s ? 1 : 0
          );
        }
        get verbosity() {
          const s = c.__wbg_get_getdeployoptions_verbosity(this.__wbg_ptr);
          return 3 === s ? void 0 : s;
        }
        set verbosity(s) {
          c.__wbg_set_getdeployoptions_verbosity(this.__wbg_ptr, k(s) ? 3 : s);
        }
      }
      class jr {
        static __wrap(s) {
          s >>>= 0;
          const l = Object.create(jr.prototype);
          return (l.__wbg_ptr = s), l;
        }
        __destroy_into_raw() {
          const s = this.__wbg_ptr;
          return (this.__wbg_ptr = 0), s;
        }
        free() {
          const s = this.__destroy_into_raw();
          c.__wbg_getdictionaryitemoptions_free(s);
        }
        get node_address() {
          let s, l;
          try {
            const h = c.__wbindgen_add_to_stack_pointer(-16);
            c.__wbg_get_getdictionaryitemoptions_node_address(
              h,
              this.__wbg_ptr
            );
            var _ = y()[h / 4 + 0],
              g = y()[h / 4 + 1];
            return (s = _), (l = g), O(_, g);
          } finally {
            c.__wbindgen_add_to_stack_pointer(16), c.__wbindgen_free(s, l, 1);
          }
        }
        set node_address(s) {
          const l = E(s, c.__wbindgen_malloc, c.__wbindgen_realloc);
          c.__wbg_set_getdictionaryitemoptions_node_address(
            this.__wbg_ptr,
            l,
            D
          );
        }
        get state_root_hash_as_string() {
          try {
            const _ = c.__wbindgen_add_to_stack_pointer(-16);
            c.__wbg_get_getdictionaryitemoptions_state_root_hash_as_string(
              _,
              this.__wbg_ptr
            );
            var s = y()[_ / 4 + 0],
              l = y()[_ / 4 + 1];
            let g;
            return (
              0 !== s && ((g = O(s, l).slice()), c.__wbindgen_free(s, 1 * l)), g
            );
          } finally {
            c.__wbindgen_add_to_stack_pointer(16);
          }
        }
        set state_root_hash_as_string(s) {
          var l = k(s) ? 0 : E(s, c.__wbindgen_malloc, c.__wbindgen_realloc);
          c.__wbg_set_getdictionaryitemoptions_state_root_hash_as_string(
            this.__wbg_ptr,
            l,
            D
          );
        }
        get state_root_hash() {
          const s = c.__wbg_get_getdictionaryitemoptions_state_root_hash(
            this.__wbg_ptr
          );
          return 0 === s ? void 0 : Ue.__wrap(s);
        }
        set state_root_hash(s) {
          let l = 0;
          k(s) || (P(s, Ue), (l = s.__destroy_into_raw())),
            c.__wbg_set_getdictionaryitemoptions_state_root_hash(
              this.__wbg_ptr,
              l
            );
        }
        get dictionary_item_params() {
          const s = c.__wbg_get_getdictionaryitemoptions_dictionary_item_params(
            this.__wbg_ptr
          );
          return 0 === s ? void 0 : Un.__wrap(s);
        }
        set dictionary_item_params(s) {
          let l = 0;
          k(s) || (P(s, Un), (l = s.__destroy_into_raw())),
            c.__wbg_set_getdictionaryitemoptions_dictionary_item_params(
              this.__wbg_ptr,
              l
            );
        }
        get dictionary_item_identifier() {
          const s =
            c.__wbg_get_getdictionaryitemoptions_dictionary_item_identifier(
              this.__wbg_ptr
            );
          return 0 === s ? void 0 : rn.__wrap(s);
        }
        set dictionary_item_identifier(s) {
          let l = 0;
          k(s) || (P(s, rn), (l = s.__destroy_into_raw())),
            c.__wbg_set_getdictionaryitemoptions_dictionary_item_identifier(
              this.__wbg_ptr,
              l
            );
        }
        get verbosity() {
          const s = c.__wbg_get_getdictionaryitemoptions_verbosity(
            this.__wbg_ptr
          );
          return 3 === s ? void 0 : s;
        }
        set verbosity(s) {
          c.__wbg_set_getdictionaryitemoptions_verbosity(
            this.__wbg_ptr,
            k(s) ? 3 : s
          );
        }
      }
      class wo {
        static __wrap(s) {
          s >>>= 0;
          const l = Object.create(wo.prototype);
          return (l.__wbg_ptr = s), l;
        }
        __destroy_into_raw() {
          const s = this.__wbg_ptr;
          return (this.__wbg_ptr = 0), s;
        }
        free() {
          const s = this.__destroy_into_raw();
          c.__wbg_geterainfooptions_free(s);
        }
        get node_address() {
          let s, l;
          try {
            const h = c.__wbindgen_add_to_stack_pointer(-16);
            c.__wbg_get_getblocktransfersoptions_node_address(
              h,
              this.__wbg_ptr
            );
            var _ = y()[h / 4 + 0],
              g = y()[h / 4 + 1];
            return (s = _), (l = g), O(_, g);
          } finally {
            c.__wbindgen_add_to_stack_pointer(16), c.__wbindgen_free(s, l, 1);
          }
        }
        set node_address(s) {
          const l = E(s, c.__wbindgen_malloc, c.__wbindgen_realloc);
          c.__wbg_set_getblocktransfersoptions_node_address(
            this.__wbg_ptr,
            l,
            D
          );
        }
        get maybe_block_id_as_string() {
          try {
            const _ = c.__wbindgen_add_to_stack_pointer(-16);
            c.__wbg_get_getblocktransfersoptions_maybe_block_id_as_string(
              _,
              this.__wbg_ptr
            );
            var s = y()[_ / 4 + 0],
              l = y()[_ / 4 + 1];
            let g;
            return (
              0 !== s && ((g = O(s, l).slice()), c.__wbindgen_free(s, 1 * l)), g
            );
          } finally {
            c.__wbindgen_add_to_stack_pointer(16);
          }
        }
        set maybe_block_id_as_string(s) {
          var l = k(s) ? 0 : E(s, c.__wbindgen_malloc, c.__wbindgen_realloc);
          c.__wbg_set_getblocktransfersoptions_maybe_block_id_as_string(
            this.__wbg_ptr,
            l,
            D
          );
        }
        get maybe_block_identifier() {
          const s = c.__wbg_get_getaccountoptions_maybe_block_identifier(
            this.__wbg_ptr
          );
          return 0 === s ? void 0 : Re.__wrap(s);
        }
        set maybe_block_identifier(s) {
          let l = 0;
          k(s) || (P(s, Re), (l = s.__destroy_into_raw())),
            c.__wbg_set_getaccountoptions_maybe_block_identifier(
              this.__wbg_ptr,
              l
            );
        }
        get verbosity() {
          const s = c.__wbg_get_getblocktransfersoptions_verbosity(
            this.__wbg_ptr
          );
          return 3 === s ? void 0 : s;
        }
        set verbosity(s) {
          c.__wbg_set_getblocktransfersoptions_verbosity(
            this.__wbg_ptr,
            k(s) ? 3 : s
          );
        }
      }
      class Hr {
        static __wrap(s) {
          s >>>= 0;
          const l = Object.create(Hr.prototype);
          return (l.__wbg_ptr = s), l;
        }
        __destroy_into_raw() {
          const s = this.__wbg_ptr;
          return (this.__wbg_ptr = 0), s;
        }
        free() {
          const s = this.__destroy_into_raw();
          c.__wbg_geterasummaryoptions_free(s);
        }
        get node_address() {
          let s, l;
          try {
            const h = c.__wbindgen_add_to_stack_pointer(-16);
            c.__wbg_get_getauctioninfooptions_node_address(h, this.__wbg_ptr);
            var _ = y()[h / 4 + 0],
              g = y()[h / 4 + 1];
            return (s = _), (l = g), O(_, g);
          } finally {
            c.__wbindgen_add_to_stack_pointer(16), c.__wbindgen_free(s, l, 1);
          }
        }
        set node_address(s) {
          const l = E(s, c.__wbindgen_malloc, c.__wbindgen_realloc);
          c.__wbg_set_getauctioninfooptions_node_address(this.__wbg_ptr, l, D);
        }
        get maybe_block_id_as_string() {
          try {
            const _ = c.__wbindgen_add_to_stack_pointer(-16);
            c.__wbg_get_getauctioninfooptions_maybe_block_id_as_string(
              _,
              this.__wbg_ptr
            );
            var s = y()[_ / 4 + 0],
              l = y()[_ / 4 + 1];
            let g;
            return (
              0 !== s && ((g = O(s, l).slice()), c.__wbindgen_free(s, 1 * l)), g
            );
          } finally {
            c.__wbindgen_add_to_stack_pointer(16);
          }
        }
        set maybe_block_id_as_string(s) {
          var l = k(s) ? 0 : E(s, c.__wbindgen_malloc, c.__wbindgen_realloc);
          c.__wbg_set_getauctioninfooptions_maybe_block_id_as_string(
            this.__wbg_ptr,
            l,
            D
          );
        }
        get maybe_block_identifier() {
          const s = c.__wbg_get_getauctioninfooptions_maybe_block_identifier(
            this.__wbg_ptr
          );
          return 0 === s ? void 0 : Re.__wrap(s);
        }
        set maybe_block_identifier(s) {
          let l = 0;
          k(s) || (P(s, Re), (l = s.__destroy_into_raw())),
            c.__wbg_set_getauctioninfooptions_maybe_block_identifier(
              this.__wbg_ptr,
              l
            );
        }
        get verbosity() {
          const s = c.__wbg_get_getauctioninfooptions_verbosity(this.__wbg_ptr);
          return 3 === s ? void 0 : s;
        }
        set verbosity(s) {
          c.__wbg_set_getauctioninfooptions_verbosity(
            this.__wbg_ptr,
            k(s) ? 3 : s
          );
        }
      }
      class yo {
        static __wrap(s) {
          s >>>= 0;
          const l = Object.create(yo.prototype);
          return (l.__wbg_ptr = s), l;
        }
        __destroy_into_raw() {
          const s = this.__wbg_ptr;
          return (this.__wbg_ptr = 0), s;
        }
        free() {
          const s = this.__destroy_into_raw();
          c.__wbg_getspeculativeexecoptions_free(s);
        }
        get node_address() {
          let s, l;
          try {
            const h = c.__wbindgen_add_to_stack_pointer(-16);
            c.__wbg_get_getspeculativeexecoptions_node_address(
              h,
              this.__wbg_ptr
            );
            var _ = y()[h / 4 + 0],
              g = y()[h / 4 + 1];
            return (s = _), (l = g), O(_, g);
          } finally {
            c.__wbindgen_add_to_stack_pointer(16), c.__wbindgen_free(s, l, 1);
          }
        }
        set node_address(s) {
          const l = E(s, c.__wbindgen_malloc, c.__wbindgen_realloc);
          c.__wbg_set_getspeculativeexecoptions_node_address(
            this.__wbg_ptr,
            l,
            D
          );
        }
        get deploy_as_string() {
          try {
            const _ = c.__wbindgen_add_to_stack_pointer(-16);
            c.__wbg_get_getspeculativeexecoptions_deploy_as_string(
              _,
              this.__wbg_ptr
            );
            var s = y()[_ / 4 + 0],
              l = y()[_ / 4 + 1];
            let g;
            return (
              0 !== s && ((g = O(s, l).slice()), c.__wbindgen_free(s, 1 * l)), g
            );
          } finally {
            c.__wbindgen_add_to_stack_pointer(16);
          }
        }
        set deploy_as_string(s) {
          var l = k(s) ? 0 : E(s, c.__wbindgen_malloc, c.__wbindgen_realloc);
          c.__wbg_set_getspeculativeexecoptions_deploy_as_string(
            this.__wbg_ptr,
            l,
            D
          );
        }
        get deploy() {
          const s = c.__wbg_get_getspeculativeexecoptions_deploy(
            this.__wbg_ptr
          );
          return 0 === s ? void 0 : be.__wrap(s);
        }
        set deploy(s) {
          let l = 0;
          k(s) || (P(s, be), (l = s.__destroy_into_raw())),
            c.__wbg_set_getspeculativeexecoptions_deploy(this.__wbg_ptr, l);
        }
        get maybe_block_id_as_string() {
          try {
            const _ = c.__wbindgen_add_to_stack_pointer(-16);
            c.__wbg_get_getspeculativeexecoptions_maybe_block_id_as_string(
              _,
              this.__wbg_ptr
            );
            var s = y()[_ / 4 + 0],
              l = y()[_ / 4 + 1];
            let g;
            return (
              0 !== s && ((g = O(s, l).slice()), c.__wbindgen_free(s, 1 * l)), g
            );
          } finally {
            c.__wbindgen_add_to_stack_pointer(16);
          }
        }
        set maybe_block_id_as_string(s) {
          var l = k(s) ? 0 : E(s, c.__wbindgen_malloc, c.__wbindgen_realloc);
          c.__wbg_set_getspeculativeexecoptions_maybe_block_id_as_string(
            this.__wbg_ptr,
            l,
            D
          );
        }
        get maybe_block_identifier() {
          const s =
            c.__wbg_get_getspeculativeexecoptions_maybe_block_identifier(
              this.__wbg_ptr
            );
          return 0 === s ? void 0 : Re.__wrap(s);
        }
        set maybe_block_identifier(s) {
          let l = 0;
          k(s) || (P(s, Re), (l = s.__destroy_into_raw())),
            c.__wbg_set_getspeculativeexecoptions_maybe_block_identifier(
              this.__wbg_ptr,
              l
            );
        }
        get verbosity() {
          const s = c.__wbg_get_getspeculativeexecoptions_verbosity(
            this.__wbg_ptr
          );
          return 3 === s ? void 0 : s;
        }
        set verbosity(s) {
          c.__wbg_set_getspeculativeexecoptions_verbosity(
            this.__wbg_ptr,
            k(s) ? 3 : s
          );
        }
      }
      class Vr {
        static __wrap(s) {
          s >>>= 0;
          const l = Object.create(Vr.prototype);
          return (l.__wbg_ptr = s), l;
        }
        __destroy_into_raw() {
          const s = this.__wbg_ptr;
          return (this.__wbg_ptr = 0), s;
        }
        free() {
          const s = this.__destroy_into_raw();
          c.__wbg_getstateroothashoptions_free(s);
        }
        get node_address() {
          let s, l;
          try {
            const h = c.__wbindgen_add_to_stack_pointer(-16);
            c.__wbg_get_getstateroothashoptions_node_address(h, this.__wbg_ptr);
            var _ = y()[h / 4 + 0],
              g = y()[h / 4 + 1];
            return (s = _), (l = g), O(_, g);
          } finally {
            c.__wbindgen_add_to_stack_pointer(16), c.__wbindgen_free(s, l, 1);
          }
        }
        set node_address(s) {
          const l = E(s, c.__wbindgen_malloc, c.__wbindgen_realloc);
          c.__wbg_set_getstateroothashoptions_node_address(
            this.__wbg_ptr,
            l,
            D
          );
        }
        get maybe_block_id_as_string() {
          try {
            const _ = c.__wbindgen_add_to_stack_pointer(-16);
            c.__wbg_get_getstateroothashoptions_maybe_block_id_as_string(
              _,
              this.__wbg_ptr
            );
            var s = y()[_ / 4 + 0],
              l = y()[_ / 4 + 1];
            let g;
            return (
              0 !== s && ((g = O(s, l).slice()), c.__wbindgen_free(s, 1 * l)), g
            );
          } finally {
            c.__wbindgen_add_to_stack_pointer(16);
          }
        }
        set maybe_block_id_as_string(s) {
          var l = k(s) ? 0 : E(s, c.__wbindgen_malloc, c.__wbindgen_realloc);
          c.__wbg_set_getstateroothashoptions_maybe_block_id_as_string(
            this.__wbg_ptr,
            l,
            D
          );
        }
        get maybe_block_identifier() {
          const s = c.__wbg_get_getstateroothashoptions_maybe_block_identifier(
            this.__wbg_ptr
          );
          return 0 === s ? void 0 : Re.__wrap(s);
        }
        set maybe_block_identifier(s) {
          let l = 0;
          k(s) || (P(s, Re), (l = s.__destroy_into_raw())),
            c.__wbg_set_getstateroothashoptions_maybe_block_identifier(
              this.__wbg_ptr,
              l
            );
        }
        get verbosity() {
          const s = c.__wbg_get_getstateroothashoptions_verbosity(
            this.__wbg_ptr
          );
          return 3 === s ? void 0 : s;
        }
        set verbosity(s) {
          c.__wbg_set_getstateroothashoptions_verbosity(
            this.__wbg_ptr,
            k(s) ? 3 : s
          );
        }
      }
      class Zt {
        static __wrap(s) {
          s >>>= 0;
          const l = Object.create(Zt.prototype);
          return (l.__wbg_ptr = s), l;
        }
        __destroy_into_raw() {
          const s = this.__wbg_ptr;
          return (this.__wbg_ptr = 0), s;
        }
        free() {
          const s = this.__destroy_into_raw();
          c.__wbg_querybalanceoptions_free(s);
        }
        get node_address() {
          let s, l;
          try {
            const h = c.__wbindgen_add_to_stack_pointer(-16);
            c.__wbg_get_querybalanceoptions_node_address(h, this.__wbg_ptr);
            var _ = y()[h / 4 + 0],
              g = y()[h / 4 + 1];
            return (s = _), (l = g), O(_, g);
          } finally {
            c.__wbindgen_add_to_stack_pointer(16), c.__wbindgen_free(s, l, 1);
          }
        }
        set node_address(s) {
          const l = E(s, c.__wbindgen_malloc, c.__wbindgen_realloc);
          c.__wbg_set_querybalanceoptions_node_address(this.__wbg_ptr, l, D);
        }
        get purse_identifier_as_string() {
          try {
            const _ = c.__wbindgen_add_to_stack_pointer(-16);
            c.__wbg_get_querybalanceoptions_purse_identifier_as_string(
              _,
              this.__wbg_ptr
            );
            var s = y()[_ / 4 + 0],
              l = y()[_ / 4 + 1];
            let g;
            return (
              0 !== s && ((g = O(s, l).slice()), c.__wbindgen_free(s, 1 * l)), g
            );
          } finally {
            c.__wbindgen_add_to_stack_pointer(16);
          }
        }
        set purse_identifier_as_string(s) {
          var l = k(s) ? 0 : E(s, c.__wbindgen_malloc, c.__wbindgen_realloc);
          c.__wbg_set_querybalanceoptions_purse_identifier_as_string(
            this.__wbg_ptr,
            l,
            D
          );
        }
        get purse_identifier() {
          const s = c.__wbg_get_querybalanceoptions_purse_identifier(
            this.__wbg_ptr
          );
          return 0 === s ? void 0 : qn.__wrap(s);
        }
        set purse_identifier(s) {
          let l = 0;
          k(s) || (P(s, qn), (l = s.__destroy_into_raw())),
            c.__wbg_set_querybalanceoptions_purse_identifier(this.__wbg_ptr, l);
        }
        get verbosity() {
          const s = c.__wbg_get_querybalanceoptions_verbosity(this.__wbg_ptr);
          return 3 === s ? void 0 : s;
        }
        set verbosity(s) {
          c.__wbg_set_querybalanceoptions_verbosity(
            this.__wbg_ptr,
            k(s) ? 3 : s
          );
        }
        get global_state_identifier() {
          const s = c.__wbg_get_querybalanceoptions_global_state_identifier(
            this.__wbg_ptr
          );
          return 0 === s ? void 0 : mt.__wrap(s);
        }
        set global_state_identifier(s) {
          let l = 0;
          k(s) || (P(s, mt), (l = s.__destroy_into_raw())),
            c.__wbg_set_querybalanceoptions_global_state_identifier(
              this.__wbg_ptr,
              l
            );
        }
        get state_root_hash_as_string() {
          try {
            const _ = c.__wbindgen_add_to_stack_pointer(-16);
            c.__wbg_get_querybalanceoptions_state_root_hash_as_string(
              _,
              this.__wbg_ptr
            );
            var s = y()[_ / 4 + 0],
              l = y()[_ / 4 + 1];
            let g;
            return (
              0 !== s && ((g = O(s, l).slice()), c.__wbindgen_free(s, 1 * l)), g
            );
          } finally {
            c.__wbindgen_add_to_stack_pointer(16);
          }
        }
        set state_root_hash_as_string(s) {
          var l = k(s) ? 0 : E(s, c.__wbindgen_malloc, c.__wbindgen_realloc);
          c.__wbg_set_querybalanceoptions_state_root_hash_as_string(
            this.__wbg_ptr,
            l,
            D
          );
        }
        get state_root_hash() {
          const s = c.__wbg_get_querybalanceoptions_state_root_hash(
            this.__wbg_ptr
          );
          return 0 === s ? void 0 : Ue.__wrap(s);
        }
        set state_root_hash(s) {
          let l = 0;
          k(s) || (P(s, Ue), (l = s.__destroy_into_raw())),
            c.__wbg_set_querybalanceoptions_state_root_hash(this.__wbg_ptr, l);
        }
        get maybe_block_id_as_string() {
          try {
            const _ = c.__wbindgen_add_to_stack_pointer(-16);
            c.__wbg_get_querybalanceoptions_maybe_block_id_as_string(
              _,
              this.__wbg_ptr
            );
            var s = y()[_ / 4 + 0],
              l = y()[_ / 4 + 1];
            let g;
            return (
              0 !== s && ((g = O(s, l).slice()), c.__wbindgen_free(s, 1 * l)), g
            );
          } finally {
            c.__wbindgen_add_to_stack_pointer(16);
          }
        }
        set maybe_block_id_as_string(s) {
          var l = k(s) ? 0 : E(s, c.__wbindgen_malloc, c.__wbindgen_realloc);
          c.__wbg_set_querybalanceoptions_maybe_block_id_as_string(
            this.__wbg_ptr,
            l,
            D
          );
        }
      }
      class bo {
        static __wrap(s) {
          s >>>= 0;
          const l = Object.create(bo.prototype);
          return (l.__wbg_ptr = s), l;
        }
        __destroy_into_raw() {
          const s = this.__wbg_ptr;
          return (this.__wbg_ptr = 0), s;
        }
        free() {
          const s = this.__destroy_into_raw();
          c.__wbg_querycontractdictoptions_free(s);
        }
        get node_address() {
          let s, l;
          try {
            const h = c.__wbindgen_add_to_stack_pointer(-16);
            c.__wbg_get_getdictionaryitemoptions_node_address(
              h,
              this.__wbg_ptr
            );
            var _ = y()[h / 4 + 0],
              g = y()[h / 4 + 1];
            return (s = _), (l = g), O(_, g);
          } finally {
            c.__wbindgen_add_to_stack_pointer(16), c.__wbindgen_free(s, l, 1);
          }
        }
        set node_address(s) {
          const l = E(s, c.__wbindgen_malloc, c.__wbindgen_realloc);
          c.__wbg_set_getdictionaryitemoptions_node_address(
            this.__wbg_ptr,
            l,
            D
          );
        }
        get state_root_hash_as_string() {
          try {
            const _ = c.__wbindgen_add_to_stack_pointer(-16);
            c.__wbg_get_getdictionaryitemoptions_state_root_hash_as_string(
              _,
              this.__wbg_ptr
            );
            var s = y()[_ / 4 + 0],
              l = y()[_ / 4 + 1];
            let g;
            return (
              0 !== s && ((g = O(s, l).slice()), c.__wbindgen_free(s, 1 * l)), g
            );
          } finally {
            c.__wbindgen_add_to_stack_pointer(16);
          }
        }
        set state_root_hash_as_string(s) {
          var l = k(s) ? 0 : E(s, c.__wbindgen_malloc, c.__wbindgen_realloc);
          c.__wbg_set_getdictionaryitemoptions_state_root_hash_as_string(
            this.__wbg_ptr,
            l,
            D
          );
        }
        get state_root_hash() {
          const s = c.__wbg_get_getdictionaryitemoptions_state_root_hash(
            this.__wbg_ptr
          );
          return 0 === s ? void 0 : Ue.__wrap(s);
        }
        set state_root_hash(s) {
          let l = 0;
          k(s) || (P(s, Ue), (l = s.__destroy_into_raw())),
            c.__wbg_set_getdictionaryitemoptions_state_root_hash(
              this.__wbg_ptr,
              l
            );
        }
        get dictionary_item_params() {
          const s = c.__wbg_get_getdictionaryitemoptions_dictionary_item_params(
            this.__wbg_ptr
          );
          return 0 === s ? void 0 : Un.__wrap(s);
        }
        set dictionary_item_params(s) {
          let l = 0;
          k(s) || (P(s, Un), (l = s.__destroy_into_raw())),
            c.__wbg_set_getdictionaryitemoptions_dictionary_item_params(
              this.__wbg_ptr,
              l
            );
        }
        get dictionary_item_identifier() {
          const s =
            c.__wbg_get_getdictionaryitemoptions_dictionary_item_identifier(
              this.__wbg_ptr
            );
          return 0 === s ? void 0 : rn.__wrap(s);
        }
        set dictionary_item_identifier(s) {
          let l = 0;
          k(s) || (P(s, rn), (l = s.__destroy_into_raw())),
            c.__wbg_set_getdictionaryitemoptions_dictionary_item_identifier(
              this.__wbg_ptr,
              l
            );
        }
        get verbosity() {
          const s = c.__wbg_get_getdictionaryitemoptions_verbosity(
            this.__wbg_ptr
          );
          return 3 === s ? void 0 : s;
        }
        set verbosity(s) {
          c.__wbg_set_getdictionaryitemoptions_verbosity(
            this.__wbg_ptr,
            k(s) ? 3 : s
          );
        }
      }
      class zn {
        static __wrap(s) {
          s >>>= 0;
          const l = Object.create(zn.prototype);
          return (l.__wbg_ptr = s), l;
        }
        __destroy_into_raw() {
          const s = this.__wbg_ptr;
          return (this.__wbg_ptr = 0), s;
        }
        free() {
          const s = this.__destroy_into_raw();
          c.__wbg_querycontractkeyoptions_free(s);
        }
        get node_address() {
          let s, l;
          try {
            const h = c.__wbindgen_add_to_stack_pointer(-16);
            c.__wbg_get_querycontractkeyoptions_node_address(h, this.__wbg_ptr);
            var _ = y()[h / 4 + 0],
              g = y()[h / 4 + 1];
            return (s = _), (l = g), O(_, g);
          } finally {
            c.__wbindgen_add_to_stack_pointer(16), c.__wbindgen_free(s, l, 1);
          }
        }
        set node_address(s) {
          const l = E(s, c.__wbindgen_malloc, c.__wbindgen_realloc);
          c.__wbg_set_querycontractkeyoptions_node_address(
            this.__wbg_ptr,
            l,
            D
          );
        }
        get global_state_identifier() {
          const s = c.__wbg_get_querycontractkeyoptions_global_state_identifier(
            this.__wbg_ptr
          );
          return 0 === s ? void 0 : mt.__wrap(s);
        }
        set global_state_identifier(s) {
          let l = 0;
          k(s) || (P(s, mt), (l = s.__destroy_into_raw())),
            c.__wbg_set_querycontractkeyoptions_global_state_identifier(
              this.__wbg_ptr,
              l
            );
        }
        get state_root_hash_as_string() {
          try {
            const _ = c.__wbindgen_add_to_stack_pointer(-16);
            c.__wbg_get_querycontractkeyoptions_state_root_hash_as_string(
              _,
              this.__wbg_ptr
            );
            var s = y()[_ / 4 + 0],
              l = y()[_ / 4 + 1];
            let g;
            return (
              0 !== s && ((g = O(s, l).slice()), c.__wbindgen_free(s, 1 * l)), g
            );
          } finally {
            c.__wbindgen_add_to_stack_pointer(16);
          }
        }
        set state_root_hash_as_string(s) {
          var l = k(s) ? 0 : E(s, c.__wbindgen_malloc, c.__wbindgen_realloc);
          c.__wbg_set_querycontractkeyoptions_state_root_hash_as_string(
            this.__wbg_ptr,
            l,
            D
          );
        }
        get state_root_hash() {
          const s = c.__wbg_get_querycontractkeyoptions_state_root_hash(
            this.__wbg_ptr
          );
          return 0 === s ? void 0 : Ue.__wrap(s);
        }
        set state_root_hash(s) {
          let l = 0;
          k(s) || (P(s, Ue), (l = s.__destroy_into_raw())),
            c.__wbg_set_querycontractkeyoptions_state_root_hash(
              this.__wbg_ptr,
              l
            );
        }
        get maybe_block_id_as_string() {
          try {
            const _ = c.__wbindgen_add_to_stack_pointer(-16);
            c.__wbg_get_querycontractkeyoptions_maybe_block_id_as_string(
              _,
              this.__wbg_ptr
            );
            var s = y()[_ / 4 + 0],
              l = y()[_ / 4 + 1];
            let g;
            return (
              0 !== s && ((g = O(s, l).slice()), c.__wbindgen_free(s, 1 * l)), g
            );
          } finally {
            c.__wbindgen_add_to_stack_pointer(16);
          }
        }
        set maybe_block_id_as_string(s) {
          var l = k(s) ? 0 : E(s, c.__wbindgen_malloc, c.__wbindgen_realloc);
          c.__wbg_set_querycontractkeyoptions_maybe_block_id_as_string(
            this.__wbg_ptr,
            l,
            D
          );
        }
        get contract_key_as_string() {
          try {
            const _ = c.__wbindgen_add_to_stack_pointer(-16);
            c.__wbg_get_querycontractkeyoptions_contract_key_as_string(
              _,
              this.__wbg_ptr
            );
            var s = y()[_ / 4 + 0],
              l = y()[_ / 4 + 1];
            let g;
            return (
              0 !== s && ((g = O(s, l).slice()), c.__wbindgen_free(s, 1 * l)), g
            );
          } finally {
            c.__wbindgen_add_to_stack_pointer(16);
          }
        }
        set contract_key_as_string(s) {
          var l = k(s) ? 0 : E(s, c.__wbindgen_malloc, c.__wbindgen_realloc);
          c.__wbg_set_querycontractkeyoptions_contract_key_as_string(
            this.__wbg_ptr,
            l,
            D
          );
        }
        get contract_key() {
          const s = c.__wbg_get_querycontractkeyoptions_contract_key(
            this.__wbg_ptr
          );
          return 0 === s ? void 0 : Ne.__wrap(s);
        }
        set contract_key(s) {
          let l = 0;
          k(s) || (P(s, Ne), (l = s.__destroy_into_raw())),
            c.__wbg_set_querycontractkeyoptions_contract_key(this.__wbg_ptr, l);
        }
        get path_as_string() {
          try {
            const _ = c.__wbindgen_add_to_stack_pointer(-16);
            c.__wbg_get_querycontractkeyoptions_path_as_string(
              _,
              this.__wbg_ptr
            );
            var s = y()[_ / 4 + 0],
              l = y()[_ / 4 + 1];
            let g;
            return (
              0 !== s && ((g = O(s, l).slice()), c.__wbindgen_free(s, 1 * l)), g
            );
          } finally {
            c.__wbindgen_add_to_stack_pointer(16);
          }
        }
        set path_as_string(s) {
          var l = k(s) ? 0 : E(s, c.__wbindgen_malloc, c.__wbindgen_realloc);
          c.__wbg_set_querycontractkeyoptions_path_as_string(
            this.__wbg_ptr,
            l,
            D
          );
        }
        get path() {
          const s = c.__wbg_get_querycontractkeyoptions_path(this.__wbg_ptr);
          return 0 === s ? void 0 : Sn.__wrap(s);
        }
        set path(s) {
          let l = 0;
          k(s) || (P(s, Sn), (l = s.__destroy_into_raw())),
            c.__wbg_set_querycontractkeyoptions_path(this.__wbg_ptr, l);
        }
        get verbosity() {
          const s = c.__wbg_get_querycontractkeyoptions_verbosity(
            this.__wbg_ptr
          );
          return 3 === s ? void 0 : s;
        }
        set verbosity(s) {
          c.__wbg_set_querycontractkeyoptions_verbosity(
            this.__wbg_ptr,
            k(s) ? 3 : s
          );
        }
      }
      class vo {
        static __wrap(s) {
          s >>>= 0;
          const l = Object.create(vo.prototype);
          return (l.__wbg_ptr = s), l;
        }
        __destroy_into_raw() {
          const s = this.__wbg_ptr;
          return (this.__wbg_ptr = 0), s;
        }
        free() {
          const s = this.__destroy_into_raw();
          c.__wbg_queryglobalstateoptions_free(s);
        }
        get node_address() {
          let s, l;
          try {
            const h = c.__wbindgen_add_to_stack_pointer(-16);
            c.__wbg_get_queryglobalstateoptions_node_address(h, this.__wbg_ptr);
            var _ = y()[h / 4 + 0],
              g = y()[h / 4 + 1];
            return (s = _), (l = g), O(_, g);
          } finally {
            c.__wbindgen_add_to_stack_pointer(16), c.__wbindgen_free(s, l, 1);
          }
        }
        set node_address(s) {
          const l = E(s, c.__wbindgen_malloc, c.__wbindgen_realloc);
          c.__wbg_set_queryglobalstateoptions_node_address(
            this.__wbg_ptr,
            l,
            D
          );
        }
        get global_state_identifier() {
          const s = c.__wbg_get_queryglobalstateoptions_global_state_identifier(
            this.__wbg_ptr
          );
          return 0 === s ? void 0 : mt.__wrap(s);
        }
        set global_state_identifier(s) {
          let l = 0;
          k(s) || (P(s, mt), (l = s.__destroy_into_raw())),
            c.__wbg_set_queryglobalstateoptions_global_state_identifier(
              this.__wbg_ptr,
              l
            );
        }
        get state_root_hash_as_string() {
          try {
            const _ = c.__wbindgen_add_to_stack_pointer(-16);
            c.__wbg_get_queryglobalstateoptions_state_root_hash_as_string(
              _,
              this.__wbg_ptr
            );
            var s = y()[_ / 4 + 0],
              l = y()[_ / 4 + 1];
            let g;
            return (
              0 !== s && ((g = O(s, l).slice()), c.__wbindgen_free(s, 1 * l)), g
            );
          } finally {
            c.__wbindgen_add_to_stack_pointer(16);
          }
        }
        set state_root_hash_as_string(s) {
          var l = k(s) ? 0 : E(s, c.__wbindgen_malloc, c.__wbindgen_realloc);
          c.__wbg_set_queryglobalstateoptions_state_root_hash_as_string(
            this.__wbg_ptr,
            l,
            D
          );
        }
        get state_root_hash() {
          const s = c.__wbg_get_queryglobalstateoptions_state_root_hash(
            this.__wbg_ptr
          );
          return 0 === s ? void 0 : Ue.__wrap(s);
        }
        set state_root_hash(s) {
          let l = 0;
          k(s) || (P(s, Ue), (l = s.__destroy_into_raw())),
            c.__wbg_set_queryglobalstateoptions_state_root_hash(
              this.__wbg_ptr,
              l
            );
        }
        get maybe_block_id_as_string() {
          try {
            const _ = c.__wbindgen_add_to_stack_pointer(-16);
            c.__wbg_get_queryglobalstateoptions_maybe_block_id_as_string(
              _,
              this.__wbg_ptr
            );
            var s = y()[_ / 4 + 0],
              l = y()[_ / 4 + 1];
            let g;
            return (
              0 !== s && ((g = O(s, l).slice()), c.__wbindgen_free(s, 1 * l)), g
            );
          } finally {
            c.__wbindgen_add_to_stack_pointer(16);
          }
        }
        set maybe_block_id_as_string(s) {
          var l = k(s) ? 0 : E(s, c.__wbindgen_malloc, c.__wbindgen_realloc);
          c.__wbg_set_queryglobalstateoptions_maybe_block_id_as_string(
            this.__wbg_ptr,
            l,
            D
          );
        }
        get key_as_string() {
          try {
            const _ = c.__wbindgen_add_to_stack_pointer(-16);
            c.__wbg_get_queryglobalstateoptions_key_as_string(
              _,
              this.__wbg_ptr
            );
            var s = y()[_ / 4 + 0],
              l = y()[_ / 4 + 1];
            let g;
            return (
              0 !== s && ((g = O(s, l).slice()), c.__wbindgen_free(s, 1 * l)), g
            );
          } finally {
            c.__wbindgen_add_to_stack_pointer(16);
          }
        }
        set key_as_string(s) {
          var l = k(s) ? 0 : E(s, c.__wbindgen_malloc, c.__wbindgen_realloc);
          c.__wbg_set_queryglobalstateoptions_key_as_string(
            this.__wbg_ptr,
            l,
            D
          );
        }
        get key() {
          const s = c.__wbg_get_queryglobalstateoptions_key(this.__wbg_ptr);
          return 0 === s ? void 0 : Ne.__wrap(s);
        }
        set key(s) {
          let l = 0;
          k(s) || (P(s, Ne), (l = s.__destroy_into_raw())),
            c.__wbg_set_queryglobalstateoptions_key(this.__wbg_ptr, l);
        }
        get path_as_string() {
          try {
            const _ = c.__wbindgen_add_to_stack_pointer(-16);
            c.__wbg_get_queryglobalstateoptions_path_as_string(
              _,
              this.__wbg_ptr
            );
            var s = y()[_ / 4 + 0],
              l = y()[_ / 4 + 1];
            let g;
            return (
              0 !== s && ((g = O(s, l).slice()), c.__wbindgen_free(s, 1 * l)), g
            );
          } finally {
            c.__wbindgen_add_to_stack_pointer(16);
          }
        }
        set path_as_string(s) {
          var l = k(s) ? 0 : E(s, c.__wbindgen_malloc, c.__wbindgen_realloc);
          c.__wbg_set_queryglobalstateoptions_path_as_string(
            this.__wbg_ptr,
            l,
            D
          );
        }
        get path() {
          const s = c.__wbg_get_queryglobalstateoptions_path(this.__wbg_ptr);
          return 0 === s ? void 0 : Sn.__wrap(s);
        }
        set path(s) {
          let l = 0;
          k(s) || (P(s, Sn), (l = s.__destroy_into_raw())),
            c.__wbg_set_queryglobalstateoptions_path(this.__wbg_ptr, l);
        }
        get verbosity() {
          const s = c.__wbg_get_queryglobalstateoptions_verbosity(
            this.__wbg_ptr
          );
          return 3 === s ? void 0 : s;
        }
        set verbosity(s) {
          c.__wbg_set_queryglobalstateoptions_verbosity(
            this.__wbg_ptr,
            k(s) ? 3 : s
          );
        }
      }
      function Ui() {
        return (Ui = (0, Ie.Z)(function* (v, s) {
          if ('function' == typeof Response && v instanceof Response) {
            if ('function' == typeof WebAssembly.instantiateStreaming)
              try {
                return yield WebAssembly.instantiateStreaming(v, s);
              } catch (_) {
                if ('application/wasm' == v.headers.get('Content-Type'))
                  throw _;
                console.warn(
                  '`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n',
                  _
                );
              }
            const l = yield v.arrayBuffer();
            return yield WebAssembly.instantiate(l, s);
          }
          {
            const l = yield WebAssembly.instantiate(v, s);
            return l instanceof WebAssembly.Instance
              ? { instance: l, module: v }
              : l;
          }
        })).apply(this, arguments);
      }
      function qi() {
        const v = { wbg: {} };
        return (
          (v.wbg.__wbindgen_object_drop_ref = function (s) {
            I(s);
          }),
          (v.wbg.__wbg_error_1fadbb4f0dff80cb = function (s, l) {
            console.error(O(s, l));
          }),
          (v.wbg.__wbindgen_error_new = function (s, l) {
            return H(new Error(O(s, l)));
          }),
          (v.wbg.__wbg_geterasummaryresult_new = function (s) {
            return H(Ms.__wrap(s));
          }),
          (v.wbg.__wbg_querybalanceresult_new = function (s) {
            return H(Bi.__wrap(s));
          }),
          (v.wbg.__wbg_putdeployresult_new = function (s) {
            return H(As.__wrap(s));
          }),
          (v.wbg.__wbg_getbalanceresult_new = function (s) {
            return H(Es.__wrap(s));
          }),
          (v.wbg.__wbg_getstateroothashresult_new = function (s) {
            return H(ks.__wrap(s));
          }),
          (v.wbg.__wbg_getnodestatusresult_new = function (s) {
            return H(on.__wrap(s));
          }),
          (v.wbg.__wbindgen_string_new = function (s, l) {
            return H(O(s, l));
          }),
          (v.wbg.__wbg_speculativeexecresult_new = function (s) {
            return H(ho.__wrap(s));
          }),
          (v.wbg.__wbg_geterainforesult_new = function (s) {
            return H(Ss.__wrap(s));
          }),
          (v.wbg.__wbg_listrpcsresult_new = function (s) {
            return H(Ts.__wrap(s));
          }),
          (v.wbg.__wbg_getdictionaryitemresult_new = function (s) {
            return H(Is.__wrap(s));
          }),
          (v.wbg.__wbg_getauctioninforesult_new = function (s) {
            return H(uo.__wrap(s));
          }),
          (v.wbg.__wbg_getpeersresult_new = function (s) {
            return H(fo.__wrap(s));
          }),
          (v.wbg.__wbg_getaccountresult_new = function (s) {
            return H(Ds.__wrap(s));
          }),
          (v.wbg.__wbg_getblockresult_new = function (s) {
            return H(xr.__wrap(s));
          }),
          (v.wbg.__wbg_getdeployresult_new = function (s) {
            return H(_o.__wrap(s));
          }),
          (v.wbg.__wbg_queryglobalstateresult_new = function (s) {
            return H(go.__wrap(s));
          }),
          (v.wbg.__wbg_getchainspecresult_new = function (s) {
            return H(Rr.__wrap(s));
          }),
          (v.wbg.__wbg_getblocktransfersresult_new = function (s) {
            return H(Cs.__wrap(s));
          }),
          (v.wbg.__wbg_getvalidatorchangesresult_new = function (s) {
            return H(po.__wrap(s));
          }),
          (v.wbg.__wbindgen_cb_drop = function (s) {
            const l = I(s).original;
            return 1 == l.cnt-- && ((l.a = 0), !0);
          }),
          (v.wbg.__wbg_log_5698f14288623311 = function (s, l) {
            console.log(O(s, l));
          }),
          (v.wbg.__wbindgen_string_get = function (s, l) {
            const _ = B(l),
              g = 'string' == typeof _ ? _ : void 0;
            var h = k(g) ? 0 : E(g, c.__wbindgen_malloc, c.__wbindgen_realloc),
              S = D;
            (y()[s / 4 + 1] = S), (y()[s / 4 + 0] = h);
          }),
          (v.wbg.__wbindgen_is_null = function (s) {
            return null === B(s);
          }),
          (v.wbg.__wbindgen_jsval_eq = function (s, l) {
            return B(s) === B(l);
          }),
          (v.wbg.__wbindgen_is_undefined = function (s) {
            return void 0 === B(s);
          }),
          (v.wbg.__wbindgen_object_clone_ref = function (s) {
            return H(B(s));
          }),
          (v.wbg.__wbg_fetch_57429b87be3dcc33 = function (s) {
            return H(fetch(B(s)));
          }),
          (v.wbg.__wbg_fetch_8eaf01857a5bb21f = function (s, l) {
            return H(B(s).fetch(B(l)));
          }),
          (v.wbg.__wbg_signal_4bd18fb489af2d4c = function (s) {
            return H(B(s).signal);
          }),
          (v.wbg.__wbg_new_55c9955722952374 = function () {
            return Ge(function () {
              return H(new AbortController());
            }, arguments);
          }),
          (v.wbg.__wbg_abort_654b796176d117aa = function (s) {
            B(s).abort();
          }),
          (v.wbg.__wbg_newwithstrandinit_cad5cd6038c7ff5d = function () {
            return Ge(function (s, l, _) {
              return H(new Request(O(s, l), B(_)));
            }, arguments);
          }),
          (v.wbg.__wbg_instanceof_Response_fc4327dbfcdf5ced = function (s) {
            let l;
            try {
              l = B(s) instanceof Response;
            } catch {
              l = !1;
            }
            return l;
          }),
          (v.wbg.__wbg_url_8503de97f69da463 = function (s, l) {
            const g = E(B(l).url, c.__wbindgen_malloc, c.__wbindgen_realloc),
              h = D;
            (y()[s / 4 + 1] = h), (y()[s / 4 + 0] = g);
          }),
          (v.wbg.__wbg_status_ac85a3142a84caa2 = function (s) {
            return B(s).status;
          }),
          (v.wbg.__wbg_headers_b70de86b8e989bc0 = function (s) {
            return H(B(s).headers);
          }),
          (v.wbg.__wbg_arrayBuffer_288fb3538806e85c = function () {
            return Ge(function (s) {
              return H(B(s).arrayBuffer());
            }, arguments);
          }),
          (v.wbg.__wbg_new_1eead62f64ca15ce = function () {
            return Ge(function () {
              return H(new Headers());
            }, arguments);
          }),
          (v.wbg.__wbg_append_fda9e3432e3e88da = function () {
            return Ge(function (s, l, _, g, h) {
              B(s).append(O(l, _), O(g, h));
            }, arguments);
          }),
          (v.wbg.__wbg_crypto_c48a774b022d20ac = function (s) {
            return H(B(s).crypto);
          }),
          (v.wbg.__wbindgen_is_object = function (s) {
            const l = B(s);
            return 'object' == typeof l && null !== l;
          }),
          (v.wbg.__wbg_process_298734cf255a885d = function (s) {
            return H(B(s).process);
          }),
          (v.wbg.__wbg_versions_e2e78e134e3e5d01 = function (s) {
            return H(B(s).versions);
          }),
          (v.wbg.__wbg_node_1cd7a5d853dbea79 = function (s) {
            return H(B(s).node);
          }),
          (v.wbg.__wbindgen_is_string = function (s) {
            return 'string' == typeof B(s);
          }),
          (v.wbg.__wbg_msCrypto_bcb970640f50a1e8 = function (s) {
            return H(B(s).msCrypto);
          }),
          (v.wbg.__wbg_require_8f08ceecec0f4fee = function () {
            return Ge(function () {
              return H(En.require);
            }, arguments);
          }),
          (v.wbg.__wbindgen_is_function = function (s) {
            return 'function' == typeof B(s);
          }),
          (v.wbg.__wbg_randomFillSync_dc1e9a60c158336d = function () {
            return Ge(function (s, l) {
              B(s).randomFillSync(I(l));
            }, arguments);
          }),
          (v.wbg.__wbg_getRandomValues_37fa2ca9e4e07fab = function () {
            return Ge(function (s, l) {
              B(s).getRandomValues(B(l));
            }, arguments);
          }),
          (v.wbg.__wbg_get_44be0491f933a435 = function (s, l) {
            return H(B(s)[l >>> 0]);
          }),
          (v.wbg.__wbg_length_fff51ee6522a1a18 = function (s) {
            return B(s).length;
          }),
          (v.wbg.__wbg_new_898a68150f225f2e = function () {
            return H(new Array());
          }),
          (v.wbg.__wbg_newnoargs_581967eacc0e2604 = function (s, l) {
            return H(new Function(O(s, l)));
          }),
          (v.wbg.__wbg_next_526fc47e980da008 = function (s) {
            return H(B(s).next);
          }),
          (v.wbg.__wbg_next_ddb3312ca1c4e32a = function () {
            return Ge(function (s) {
              return H(B(s).next());
            }, arguments);
          }),
          (v.wbg.__wbg_done_5c1f01fb660d73b5 = function (s) {
            return B(s).done;
          }),
          (v.wbg.__wbg_value_1695675138684bd5 = function (s) {
            return H(B(s).value);
          }),
          (v.wbg.__wbg_iterator_97f0c81209c6c35a = function () {
            return H(Symbol.iterator);
          }),
          (v.wbg.__wbg_get_97b561fb56f034b5 = function () {
            return Ge(function (s, l) {
              return H(Reflect.get(B(s), B(l)));
            }, arguments);
          }),
          (v.wbg.__wbg_call_cb65541d95d71282 = function () {
            return Ge(function (s, l) {
              return H(B(s).call(B(l)));
            }, arguments);
          }),
          (v.wbg.__wbg_new_b51585de1b234aff = function () {
            return H(new Object());
          }),
          (v.wbg.__wbg_self_1ff1d729e9aae938 = function () {
            return Ge(function () {
              return H(self.self);
            }, arguments);
          }),
          (v.wbg.__wbg_window_5f4faef6c12b79ec = function () {
            return Ge(function () {
              return H(window.window);
            }, arguments);
          }),
          (v.wbg.__wbg_globalThis_1d39714405582d3c = function () {
            return Ge(function () {
              return H(globalThis.globalThis);
            }, arguments);
          }),
          (v.wbg.__wbg_global_651f05c6a0944d1c = function () {
            return Ge(function () {
              return H(global.global);
            }, arguments);
          }),
          (v.wbg.__wbg_push_ca1c26067ef907ac = function (s, l) {
            return B(s).push(B(l));
          }),
          (v.wbg.__wbg_call_01734de55d61e11d = function () {
            return Ge(function (s, l, _) {
              return H(B(s).call(B(l), B(_)));
            }, arguments);
          }),
          (v.wbg.__wbg_getTime_5e2054f832d82ec9 = function (s) {
            return B(s).getTime();
          }),
          (v.wbg.__wbg_new0_c0be7df4b6bd481f = function () {
            return H(new Date());
          }),
          (v.wbg.__wbg_instanceof_Object_3daa8298c86298be = function (s) {
            let l;
            try {
              l = B(s) instanceof Object;
            } catch {
              l = !1;
            }
            return l;
          }),
          (v.wbg.__wbg_new_43f1b47c28813cbd = function (s, l) {
            try {
              var _ = { a: s, b: l };
              const h = new Promise((S, x) => {
                const W = _.a;
                _.a = 0;
                try {
                  return (function Gc(v, s, l, _) {
                    c.wasm_bindgen__convert__closures__invoke2_mut__h59ca0b97754bf460(
                      v,
                      s,
                      H(l),
                      H(_)
                    );
                  })(W, _.b, S, x);
                } finally {
                  _.a = W;
                }
              });
              return H(h);
            } finally {
              _.a = _.b = 0;
            }
          }),
          (v.wbg.__wbg_resolve_53698b95aaf7fcf8 = function (s) {
            return H(Promise.resolve(B(s)));
          }),
          (v.wbg.__wbg_then_f7e06ee3c11698eb = function (s, l) {
            return H(B(s).then(B(l)));
          }),
          (v.wbg.__wbg_then_b2267541e2a73865 = function (s, l, _) {
            return H(B(s).then(B(l), B(_)));
          }),
          (v.wbg.__wbg_buffer_085ec1f694018c4f = function (s) {
            return H(B(s).buffer);
          }),
          (v.wbg.__wbg_newwithbyteoffsetandlength_6da8e527659b86aa = function (
            s,
            l,
            _
          ) {
            return H(new Uint8Array(B(s), l >>> 0, _ >>> 0));
          }),
          (v.wbg.__wbg_new_8125e318e6245eed = function (s) {
            return H(new Uint8Array(B(s)));
          }),
          (v.wbg.__wbg_set_5cf90238115182c3 = function (s, l, _) {
            B(s).set(B(l), _ >>> 0);
          }),
          (v.wbg.__wbg_length_72e2208bbc0efc61 = function (s) {
            return B(s).length;
          }),
          (v.wbg.__wbg_newwithlength_e5d69174d6984cd7 = function (s) {
            return H(new Uint8Array(s >>> 0));
          }),
          (v.wbg.__wbg_subarray_13db269f57aa838d = function (s, l, _) {
            return H(B(s).subarray(l >>> 0, _ >>> 0));
          }),
          (v.wbg.__wbg_getindex_961202524f8271d6 = function (s, l) {
            return B(s)[l >>> 0];
          }),
          (v.wbg.__wbg_parse_670c19d4e984792e = function () {
            return Ge(function (s, l) {
              return H(JSON.parse(O(s, l)));
            }, arguments);
          }),
          (v.wbg.__wbg_stringify_e25465938f3f611f = function () {
            return Ge(function (s) {
              return H(JSON.stringify(B(s)));
            }, arguments);
          }),
          (v.wbg.__wbg_has_c5fcd020291e56b8 = function () {
            return Ge(function (s, l) {
              return Reflect.has(B(s), B(l));
            }, arguments);
          }),
          (v.wbg.__wbg_set_092e06b0f9d71865 = function () {
            return Ge(function (s, l, _) {
              return Reflect.set(B(s), B(l), B(_));
            }, arguments);
          }),
          (v.wbg.__wbindgen_debug_string = function (s, l) {
            const g = E(kr(B(l)), c.__wbindgen_malloc, c.__wbindgen_realloc),
              h = D;
            (y()[s / 4 + 1] = h), (y()[s / 4 + 0] = g);
          }),
          (v.wbg.__wbindgen_throw = function (s, l) {
            throw new Error(O(s, l));
          }),
          (v.wbg.__wbindgen_memory = function () {
            return H(c.memory);
          }),
          (v.wbg.__wbindgen_closure_wrapper4275 = function (s, l, _) {
            const g = (function Uc(v, s, l, _) {
              const g = { a: v, b: s, cnt: 1, dtor: l },
                h = (...S) => {
                  g.cnt++;
                  const x = g.a;
                  g.a = 0;
                  try {
                    return _(x, g.b, ...S);
                  } finally {
                    0 == --g.cnt
                      ? c.__wbindgen_export_2.get(g.dtor)(x, g.b)
                      : (g.a = x);
                  }
                };
              return (h.original = g), h;
            })(s, l, 760, ys);
            return H(g);
          }),
          v
        );
      }
      function Ns(v) {
        return xs.apply(this, arguments);
      }
      function xs() {
        return (
          (xs = (0, Ie.Z)(function* (v) {
            if (void 0 !== c) return c;
            typeof v > 'u' &&
              (v = new URL(
                'casper_rust_wasm_sdk_bg.wasm',
                'file:///media/WINKING/opt2/casper/rustSDK/casper-rust-wasm-sdk/pkg/casper_rust_wasm_sdk.js'
              ));
            const s = qi();
            ('string' == typeof v ||
              ('function' == typeof Request && v instanceof Request) ||
              ('function' == typeof URL && v instanceof URL)) &&
              (v = fetch(v));
            const { instance: l, module: _ } = yield (function $i(v, s) {
              return Ui.apply(this, arguments);
            })(yield v, s);
            return (function Do(v, s) {
              return (
                (c = v.exports),
                (Ns.__wbindgen_wasm_module = s),
                (Cn = null),
                ($e = null),
                c
              );
            })(l, _);
          })),
          xs.apply(this, arguments)
        );
      }
      const zi = Ns;
    },
    2311: (En, cr, ot) => {
      function Ie(e) {
        return 'function' == typeof e;
      }
      function c(e) {
        const n = e((r) => {
          Error.call(r), (r.stack = new Error().stack);
        });
        return (
          (n.prototype = Object.create(Error.prototype)),
          (n.prototype.constructor = n),
          n
        );
      }
      const Ae = c(
        (e) =>
          function (n) {
            e(this),
              (this.message = n
                ? `${n.length} errors occurred during unsubscription:\n${n
                    .map((r, o) => `${o + 1}) ${r.toString()}`)
                    .join('\n  ')}`
                : ''),
              (this.name = 'UnsubscriptionError'),
              (this.errors = n);
          }
      );
      function B(e, t) {
        if (e) {
          const n = e.indexOf(t);
          0 <= n && e.splice(n, 1);
        }
      }
      class Le {
        constructor(t) {
          (this.initialTeardown = t),
            (this.closed = !1),
            (this._parentage = null),
            (this._finalizers = null);
        }
        unsubscribe() {
          let t;
          if (!this.closed) {
            this.closed = !0;
            const { _parentage: n } = this;
            if (n)
              if (((this._parentage = null), Array.isArray(n)))
                for (const i of n) i.remove(this);
              else n.remove(this);
            const { initialTeardown: r } = this;
            if (Ie(r))
              try {
                r();
              } catch (i) {
                t = i instanceof Ae ? i.errors : [i];
              }
            const { _finalizers: o } = this;
            if (o) {
              this._finalizers = null;
              for (const i of o)
                try {
                  ft(i);
                } catch (a) {
                  (t = t ?? []),
                    a instanceof Ae ? (t = [...t, ...a.errors]) : t.push(a);
                }
            }
            if (t) throw new Ae(t);
          }
        }
        add(t) {
          var n;
          if (t && t !== this)
            if (this.closed) ft(t);
            else {
              if (t instanceof Le) {
                if (t.closed || t._hasParent(this)) return;
                t._addParent(this);
              }
              (this._finalizers =
                null !== (n = this._finalizers) && void 0 !== n ? n : []).push(
                t
              );
            }
        }
        _hasParent(t) {
          const { _parentage: n } = this;
          return n === t || (Array.isArray(n) && n.includes(t));
        }
        _addParent(t) {
          const { _parentage: n } = this;
          this._parentage = Array.isArray(n) ? (n.push(t), n) : n ? [n, t] : t;
        }
        _removeParent(t) {
          const { _parentage: n } = this;
          n === t ? (this._parentage = null) : Array.isArray(n) && B(n, t);
        }
        remove(t) {
          const { _finalizers: n } = this;
          n && B(n, t), t instanceof Le && t._removeParent(this);
        }
      }
      Le.EMPTY = (() => {
        const e = new Le();
        return (e.closed = !0), e;
      })();
      const zt = Le.EMPTY;
      function I(e) {
        return (
          e instanceof Le ||
          (e && 'closed' in e && Ie(e.remove) && Ie(e.add) && Ie(e.unsubscribe))
        );
      }
      function ft(e) {
        Ie(e) ? e() : e.unsubscribe();
      }
      const $e = {
          onUnhandledError: null,
          onStoppedNotification: null,
          Promise: void 0,
          useDeprecatedSynchronousErrorHandling: !1,
          useDeprecatedNextContext: !1,
        },
        et = {
          setTimeout(e, t, ...n) {
            const { delegate: r } = et;
            return r?.setTimeout
              ? r.setTimeout(e, t, ...n)
              : setTimeout(e, t, ...n);
          },
          clearTimeout(e) {
            const { delegate: t } = et;
            return (t?.clearTimeout || clearTimeout)(e);
          },
          delegate: void 0,
        };
      function O(e) {
        et.setTimeout(() => {
          const { onUnhandledError: t } = $e;
          if (!t) throw e;
          t(e);
        });
      }
      function H() {}
      const D = E('C', void 0, void 0);
      function E(e, t, n) {
        return { kind: e, value: t, error: n };
      }
      let k = null;
      function Cn(e) {
        if ($e.useDeprecatedSynchronousErrorHandling) {
          const t = !k;
          if ((t && (k = { errorThrown: !1, error: null }), e(), t)) {
            const { errorThrown: n, error: r } = k;
            if (((k = null), n)) throw r;
          }
        } else e();
      }
      class kr extends Le {
        constructor(t) {
          super(),
            (this.isStopped = !1),
            t
              ? ((this.destination = t), I(t) && t.add(this))
              : (this.destination = qc);
        }
        static create(t, n, r) {
          return new lo(t, n, r);
        }
        next(t) {
          this.isStopped
            ? Li(
                (function $c(e) {
                  return E('N', e, void 0);
                })(t),
                this
              )
            : this._next(t);
        }
        error(t) {
          this.isStopped
            ? Li(
                (function co(e) {
                  return E('E', void 0, e);
                })(t),
                this
              )
            : ((this.isStopped = !0), this._error(t));
        }
        complete() {
          this.isStopped
            ? Li(D, this)
            : ((this.isStopped = !0), this._complete());
        }
        unsubscribe() {
          this.closed ||
            ((this.isStopped = !0),
            super.unsubscribe(),
            (this.destination = null));
        }
        _next(t) {
          this.destination.next(t);
        }
        _error(t) {
          try {
            this.destination.error(t);
          } finally {
            this.unsubscribe();
          }
        }
        _complete() {
          try {
            this.destination.complete();
          } finally {
            this.unsubscribe();
          }
        }
      }
      const Uc = Function.prototype.bind;
      function ys(e, t) {
        return Uc.call(e, t);
      }
      class Ct {
        constructor(t) {
          this.partialObserver = t;
        }
        next(t) {
          const { partialObserver: n } = this;
          if (n.next)
            try {
              n.next(t);
            } catch (r) {
              P(r);
            }
        }
        error(t) {
          const { partialObserver: n } = this;
          if (n.error)
            try {
              n.error(t);
            } catch (r) {
              P(r);
            }
          else P(t);
        }
        complete() {
          const { partialObserver: t } = this;
          if (t.complete)
            try {
              t.complete();
            } catch (n) {
              P(n);
            }
        }
      }
      class lo extends kr {
        constructor(t, n, r) {
          let o;
          if ((super(), Ie(t) || !t))
            o = {
              next: t ?? void 0,
              error: n ?? void 0,
              complete: r ?? void 0,
            };
          else {
            let i;
            this && $e.useDeprecatedNextContext
              ? ((i = Object.create(t)),
                (i.unsubscribe = () => this.unsubscribe()),
                (o = {
                  next: t.next && ys(t.next, i),
                  error: t.error && ys(t.error, i),
                  complete: t.complete && ys(t.complete, i),
                }))
              : (o = t);
          }
          this.destination = new Ct(o);
        }
      }
      function P(e) {
        $e.useDeprecatedSynchronousErrorHandling
          ? (function y(e) {
              $e.useDeprecatedSynchronousErrorHandling &&
                k &&
                ((k.errorThrown = !0), (k.error = e));
            })(e)
          : O(e);
      }
      function Li(e, t) {
        const { onStoppedNotification: n } = $e;
        n && et.setTimeout(() => n(e, t));
      }
      const qc = {
          closed: !0,
          next: H,
          error: function p_(e) {
            throw e;
          },
          complete: H,
        },
        bs =
          ('function' == typeof Symbol && Symbol.observable) || '@@observable';
      function ji(e) {
        return e;
      }
      let ct = (() => {
        class e {
          constructor(n) {
            n && (this._subscribe = n);
          }
          lift(n) {
            const r = new e();
            return (r.source = this), (r.operator = n), r;
          }
          subscribe(n, r, o) {
            const i = (function Ge(e) {
              return (
                (e && e instanceof kr) ||
                ((function zc(e) {
                  return e && Ie(e.next) && Ie(e.error) && Ie(e.complete);
                })(e) &&
                  I(e))
              );
            })(n)
              ? n
              : new lo(n, r, o);
            return (
              Cn(() => {
                const { operator: a, source: u } = this;
                i.add(
                  a
                    ? a.call(i, u)
                    : u
                    ? this._subscribe(i)
                    : this._trySubscribe(i)
                );
              }),
              i
            );
          }
          _trySubscribe(n) {
            try {
              return this._subscribe(n);
            } catch (r) {
              n.error(r);
            }
          }
          forEach(n, r) {
            return new (r = Vi(r))((o, i) => {
              const a = new lo({
                next: (u) => {
                  try {
                    n(u);
                  } catch (d) {
                    i(d), a.unsubscribe();
                  }
                },
                error: i,
                complete: o,
              });
              this.subscribe(a);
            });
          }
          _subscribe(n) {
            var r;
            return null === (r = this.source) || void 0 === r
              ? void 0
              : r.subscribe(n);
          }
          [bs]() {
            return this;
          }
          pipe(...n) {
            return (function Hi(e) {
              return 0 === e.length
                ? ji
                : 1 === e.length
                ? e[0]
                : function (n) {
                    return e.reduce((r, o) => o(r), n);
                  };
            })(n)(this);
          }
          toPromise(n) {
            return new (n = Vi(n))((r, o) => {
              let i;
              this.subscribe(
                (a) => (i = a),
                (a) => o(a),
                () => r(i)
              );
            });
          }
        }
        return (e.create = (t) => new e(t)), e;
      })();
      function Vi(e) {
        var t;
        return null !== (t = e ?? $e.Promise) && void 0 !== t ? t : Promise;
      }
      const Gc = c(
        (e) =>
          function () {
            e(this),
              (this.name = 'ObjectUnsubscribedError'),
              (this.message = 'object unsubscribed');
          }
      );
      let Tr = (() => {
        class e extends ct {
          constructor() {
            super(),
              (this.closed = !1),
              (this.currentObservers = null),
              (this.observers = []),
              (this.isStopped = !1),
              (this.hasError = !1),
              (this.thrownError = null);
          }
          lift(n) {
            const r = new Ar(this, this);
            return (r.operator = n), r;
          }
          _throwIfClosed() {
            if (this.closed) throw new Gc();
          }
          next(n) {
            Cn(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                this.currentObservers ||
                  (this.currentObservers = Array.from(this.observers));
                for (const r of this.currentObservers) r.next(n);
              }
            });
          }
          error(n) {
            Cn(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                (this.hasError = this.isStopped = !0), (this.thrownError = n);
                const { observers: r } = this;
                for (; r.length; ) r.shift().error(n);
              }
            });
          }
          complete() {
            Cn(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                this.isStopped = !0;
                const { observers: n } = this;
                for (; n.length; ) n.shift().complete();
              }
            });
          }
          unsubscribe() {
            (this.isStopped = this.closed = !0),
              (this.observers = this.currentObservers = null);
          }
          get observed() {
            var n;
            return (
              (null === (n = this.observers) || void 0 === n
                ? void 0
                : n.length) > 0
            );
          }
          _trySubscribe(n) {
            return this._throwIfClosed(), super._trySubscribe(n);
          }
          _subscribe(n) {
            return (
              this._throwIfClosed(),
              this._checkFinalizedStatuses(n),
              this._innerSubscribe(n)
            );
          }
          _innerSubscribe(n) {
            const { hasError: r, isStopped: o, observers: i } = this;
            return r || o
              ? zt
              : ((this.currentObservers = null),
                i.push(n),
                new Le(() => {
                  (this.currentObservers = null), B(i, n);
                }));
          }
          _checkFinalizedStatuses(n) {
            const { hasError: r, thrownError: o, isStopped: i } = this;
            r ? n.error(o) : i && n.complete();
          }
          asObservable() {
            const n = new ct();
            return (n.source = this), n;
          }
        }
        return (e.create = (t, n) => new Ar(t, n)), e;
      })();
      class Ar extends Tr {
        constructor(t, n) {
          super(), (this.destination = t), (this.source = n);
        }
        next(t) {
          var n, r;
          null ===
            (r =
              null === (n = this.destination) || void 0 === n
                ? void 0
                : n.next) ||
            void 0 === r ||
            r.call(n, t);
        }
        error(t) {
          var n, r;
          null ===
            (r =
              null === (n = this.destination) || void 0 === n
                ? void 0
                : n.error) ||
            void 0 === r ||
            r.call(n, t);
        }
        complete() {
          var t, n;
          null ===
            (n =
              null === (t = this.destination) || void 0 === t
                ? void 0
                : t.complete) ||
            void 0 === n ||
            n.call(t);
        }
        _subscribe(t) {
          var n, r;
          return null !==
            (r =
              null === (n = this.source) || void 0 === n
                ? void 0
                : n.subscribe(t)) && void 0 !== r
            ? r
            : zt;
        }
      }
      class pt extends Tr {
        constructor(t) {
          super(), (this._value = t);
        }
        get value() {
          return this.getValue();
        }
        _subscribe(t) {
          const n = super._subscribe(t);
          return !n.closed && t.next(this._value), n;
        }
        getValue() {
          const { hasError: t, thrownError: n, _value: r } = this;
          if (t) throw n;
          return this._throwIfClosed(), r;
        }
        next(t) {
          super.next((this._value = t));
        }
      }
      function Gt(e) {
        return (t) => {
          if (
            (function lr(e) {
              return Ie(e?.lift);
            })(t)
          )
            return t.lift(function (n) {
              try {
                return e(n, this);
              } catch (r) {
                this.error(r);
              }
            });
          throw new TypeError('Unable to lift unknown Observable type');
        };
      }
      function st(e, t, n, r, o) {
        return new Re(e, t, n, r, o);
      }
      class Re extends kr {
        constructor(t, n, r, o, i, a) {
          super(t),
            (this.onFinalize = i),
            (this.shouldUnsubscribe = a),
            (this._next = n
              ? function (u) {
                  try {
                    n(u);
                  } catch (d) {
                    t.error(d);
                  }
                }
              : super._next),
            (this._error = o
              ? function (u) {
                  try {
                    o(u);
                  } catch (d) {
                    t.error(d);
                  } finally {
                    this.unsubscribe();
                  }
                }
              : super._error),
            (this._complete = r
              ? function () {
                  try {
                    r();
                  } catch (u) {
                    t.error(u);
                  } finally {
                    this.unsubscribe();
                  }
                }
              : super._complete);
        }
        unsubscribe() {
          var t;
          if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
            const { closed: n } = this;
            super.unsubscribe(),
              !n &&
                (null === (t = this.onFinalize) ||
                  void 0 === t ||
                  t.call(this));
          }
        }
      }
      function gt(e, t) {
        return Gt((n, r) => {
          let o = 0;
          n.subscribe(
            st(r, (i) => {
              r.next(e.call(t, i, o++));
            })
          );
        });
      }
      function on(e) {
        return this instanceof on ? ((this.v = e), this) : new on(e);
      }
      function po(e) {
        if (!Symbol.asyncIterator)
          throw new TypeError('Symbol.asyncIterator is not defined.');
        var n,
          t = e[Symbol.asyncIterator];
        return t
          ? t.call(e)
          : ((e = (function Rr(e) {
              var t = 'function' == typeof Symbol && Symbol.iterator,
                n = t && e[t],
                r = 0;
              if (n) return n.call(e);
              if (e && 'number' == typeof e.length)
                return {
                  next: function () {
                    return (
                      e && r >= e.length && (e = void 0),
                      { value: e && e[r++], done: !e }
                    );
                  },
                };
              throw new TypeError(
                t
                  ? 'Object is not iterable.'
                  : 'Symbol.iterator is not defined.'
              );
            })(e)),
            (n = {}),
            r('next'),
            r('throw'),
            r('return'),
            (n[Symbol.asyncIterator] = function () {
              return this;
            }),
            n);
        function r(i) {
          n[i] =
            e[i] &&
            function (a) {
              return new Promise(function (u, d) {
                !(function o(i, a, u, d) {
                  Promise.resolve(d).then(function (f) {
                    i({ value: f, done: u });
                  }, a);
                })(u, d, (a = e[i](a)).done, a.value);
              });
            };
        }
      }
      'function' == typeof SuppressedError && SuppressedError;
      const go = (e) =>
        e && 'number' == typeof e.length && 'function' != typeof e;
      function Or(e) {
        return Ie(e?.then);
      }
      function Wt(e) {
        return Ie(e[bs]);
      }
      function ho(e) {
        return Symbol.asyncIterator && Ie(e?.[Symbol.asyncIterator]);
      }
      function dr(e) {
        return new TypeError(
          `You provided ${
            null !== e && 'object' == typeof e ? 'an invalid object' : `'${e}'`
          } where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`
        );
      }
      const _r = (function Jt() {
        return 'function' == typeof Symbol && Symbol.iterator
          ? Symbol.iterator
          : '@@iterator';
      })();
      function fr(e) {
        return Ie(e?.[_r]);
      }
      function Fr(e) {
        return (function fo(e, t, n) {
          if (!Symbol.asyncIterator)
            throw new TypeError('Symbol.asyncIterator is not defined.');
          var o,
            r = n.apply(e, t || []),
            i = [];
          return (
            (o = {}),
            a('next'),
            a('throw'),
            a('return'),
            (o[Symbol.asyncIterator] = function () {
              return this;
            }),
            o
          );
          function a(w) {
            r[w] &&
              (o[w] = function (b) {
                return new Promise(function (C, T) {
                  i.push([w, b, C, T]) > 1 || u(w, b);
                });
              });
          }
          function u(w, b) {
            try {
              !(function d(w) {
                w.value instanceof on
                  ? Promise.resolve(w.value.v).then(f, p)
                  : m(i[0][2], w);
              })(r[w](b));
            } catch (C) {
              m(i[0][3], C);
            }
          }
          function f(w) {
            u('next', w);
          }
          function p(w) {
            u('throw', w);
          }
          function m(w, b) {
            w(b), i.shift(), i.length && u(i[0][0], i[0][1]);
          }
        })(this, arguments, function* () {
          const n = e.getReader();
          try {
            for (;;) {
              const { value: r, done: o } = yield on(n.read());
              if (o) return yield on(void 0);
              yield yield on(r);
            }
          } finally {
            n.releaseLock();
          }
        });
      }
      function pr(e) {
        return Ie(e?.getReader);
      }
      function It(e) {
        if (e instanceof ct) return e;
        if (null != e) {
          if (Wt(e))
            return (function mo(e) {
              return new ct((t) => {
                const n = e[bs]();
                if (Ie(n.subscribe)) return n.subscribe(t);
                throw new TypeError(
                  'Provided object does not correctly implement Symbol.observable'
                );
              });
            })(e);
          if (go(e))
            return (function Lr(e) {
              return new ct((t) => {
                for (let n = 0; n < e.length && !t.closed; n++) t.next(e[n]);
                t.complete();
              });
            })(e);
          if (Or(e))
            return (function jr(e) {
              return new ct((t) => {
                e.then(
                  (n) => {
                    t.closed || (t.next(n), t.complete());
                  },
                  (n) => t.error(n)
                ).then(null, O);
              });
            })(e);
          if (ho(e)) return Hr(e);
          if (fr(e))
            return (function wo(e) {
              return new ct((t) => {
                for (const n of e) if ((t.next(n), t.closed)) return;
                t.complete();
              });
            })(e);
          if (pr(e))
            return (function yo(e) {
              return Hr(Fr(e));
            })(e);
        }
        throw dr(e);
      }
      function Hr(e) {
        return new ct((t) => {
          (function Vr(e, t) {
            var n, r, o, i;
            return (function uo(e, t, n, r) {
              return new (n || (n = Promise))(function (i, a) {
                function u(p) {
                  try {
                    f(r.next(p));
                  } catch (m) {
                    a(m);
                  }
                }
                function d(p) {
                  try {
                    f(r.throw(p));
                  } catch (m) {
                    a(m);
                  }
                }
                function f(p) {
                  p.done
                    ? i(p.value)
                    : (function o(i) {
                        return i instanceof n
                          ? i
                          : new n(function (a) {
                              a(i);
                            });
                      })(p.value).then(u, d);
                }
                f((r = r.apply(e, t || [])).next());
              });
            })(this, void 0, void 0, function* () {
              try {
                for (n = po(e); !(r = yield n.next()).done; )
                  if ((t.next(r.value), t.closed)) return;
              } catch (a) {
                o = { error: a };
              } finally {
                try {
                  r && !r.done && (i = n.return) && (yield i.call(n));
                } finally {
                  if (o) throw o.error;
                }
              }
              t.complete();
            });
          })(e, t).catch((n) => t.error(n));
        });
      }
      function Zt(e, t, n, r = 0, o = !1) {
        const i = t.schedule(function () {
          n(), o ? e.add(this.schedule(null, r)) : this.unsubscribe();
        }, r);
        if ((e.add(i), !o)) return i;
      }
      function zn(e, t, n = 1 / 0) {
        return Ie(t)
          ? zn((r, o) => gt((i, a) => t(r, i, o, a))(It(e(r, o))), n)
          : ('number' == typeof t && (n = t),
            Gt((r, o) =>
              (function bo(e, t, n, r, o, i, a, u) {
                const d = [];
                let f = 0,
                  p = 0,
                  m = !1;
                const w = () => {
                    m && !d.length && !f && t.complete();
                  },
                  b = (T) => (f < r ? C(T) : d.push(T)),
                  C = (T) => {
                    i && t.next(T), f++;
                    let N = !1;
                    It(n(T, p++)).subscribe(
                      st(
                        t,
                        (L) => {
                          o?.(L), i ? b(L) : t.next(L);
                        },
                        () => {
                          N = !0;
                        },
                        void 0,
                        () => {
                          if (N)
                            try {
                              for (f--; d.length && f < r; ) {
                                const L = d.shift();
                                a ? Zt(t, a, () => C(L)) : C(L);
                              }
                              w();
                            } catch (L) {
                              t.error(L);
                            }
                        }
                      )
                    );
                  };
                return (
                  e.subscribe(
                    st(t, b, () => {
                      (m = !0), w();
                    })
                  ),
                  () => {
                    u?.();
                  }
                );
              })(r, o, e, n)
            ));
      }
      const $i = new ct((e) => e.complete());
      function Do(e) {
        return e[e.length - 1];
      }
      function Ns(e) {
        return (function h_(e) {
          return e && Ie(e.schedule);
        })(Do(e))
          ? e.pop()
          : void 0;
      }
      function zi(e, t = 0) {
        return Gt((n, r) => {
          n.subscribe(
            st(
              r,
              (o) => Zt(r, e, () => r.next(o), t),
              () => Zt(r, e, () => r.complete(), t),
              (o) => Zt(r, e, () => r.error(o), t)
            )
          );
        });
      }
      function v(e, t = 0) {
        return Gt((n, r) => {
          r.add(e.schedule(() => n.subscribe(r), t));
        });
      }
      function h(e, t) {
        if (!e) throw new Error('Iterable cannot be null');
        return new ct((n) => {
          Zt(n, t, () => {
            const r = e[Symbol.asyncIterator]();
            Zt(
              n,
              t,
              () => {
                r.next().then((o) => {
                  o.done ? n.complete() : n.next(o.value);
                });
              },
              0,
              !0
            );
          });
        });
      }
      function W(e, t) {
        return t
          ? (function x(e, t) {
              if (null != e) {
                if (Wt(e))
                  return (function s(e, t) {
                    return It(e).pipe(v(t), zi(t));
                  })(e, t);
                if (go(e))
                  return (function _(e, t) {
                    return new ct((n) => {
                      let r = 0;
                      return t.schedule(function () {
                        r === e.length
                          ? n.complete()
                          : (n.next(e[r++]), n.closed || this.schedule());
                      });
                    });
                  })(e, t);
                if (Or(e))
                  return (function l(e, t) {
                    return It(e).pipe(v(t), zi(t));
                  })(e, t);
                if (ho(e)) return h(e, t);
                if (fr(e))
                  return (function g(e, t) {
                    return new ct((n) => {
                      let r;
                      return (
                        Zt(n, t, () => {
                          (r = e[_r]()),
                            Zt(
                              n,
                              t,
                              () => {
                                let o, i;
                                try {
                                  ({ value: o, done: i } = r.next());
                                } catch (a) {
                                  return void n.error(a);
                                }
                                i ? n.complete() : n.next(o);
                              },
                              0,
                              !0
                            );
                        }),
                        () => Ie(r?.return) && r.return()
                      );
                    });
                  })(e, t);
                if (pr(e))
                  return (function S(e, t) {
                    return h(Fr(e), t);
                  })(e, t);
              }
              throw dr(e);
            })(e, t)
          : It(e);
      }
      function ae(...e) {
        return W(e, Ns(e));
      }
      function Te(e = {}) {
        const {
          connector: t = () => new Tr(),
          resetOnError: n = !0,
          resetOnComplete: r = !0,
          resetOnRefCountZero: o = !0,
        } = e;
        return (i) => {
          let a,
            u,
            d,
            f = 0,
            p = !1,
            m = !1;
          const w = () => {
              u?.unsubscribe(), (u = void 0);
            },
            b = () => {
              w(), (a = d = void 0), (p = m = !1);
            },
            C = () => {
              const T = a;
              b(), T?.unsubscribe();
            };
          return Gt((T, N) => {
            f++, !m && !p && w();
            const L = (d = d ?? t());
            N.add(() => {
              f--, 0 === f && !m && !p && (u = Be(C, o));
            }),
              L.subscribe(N),
              !a &&
                f > 0 &&
                ((a = new lo({
                  next: (A) => L.next(A),
                  error: (A) => {
                    (m = !0), w(), (u = Be(b, n, A)), L.error(A);
                  },
                  complete: () => {
                    (p = !0), w(), (u = Be(b, r)), L.complete();
                  },
                })),
                It(T).subscribe(a));
          })(i);
        };
      }
      function Be(e, t, ...n) {
        if (!0 === t) return void e();
        if (!1 === t) return;
        const r = new lo({
          next: () => {
            r.unsubscribe(), e();
          },
        });
        return It(t(...n)).subscribe(r);
      }
      function xe(e, t) {
        return Gt((n, r) => {
          let o = null,
            i = 0,
            a = !1;
          const u = () => a && !o && r.complete();
          n.subscribe(
            st(
              r,
              (d) => {
                o?.unsubscribe();
                let f = 0;
                const p = i++;
                It(e(d, p)).subscribe(
                  (o = st(
                    r,
                    (m) => r.next(t ? t(d, m, p, f++) : m),
                    () => {
                      (o = null), u();
                    }
                  ))
                );
              },
              () => {
                (a = !0), u();
              }
            )
          );
        });
      }
      function Mt(e, t) {
        return e === t;
      }
      function ce(e) {
        for (let t in e) if (e[t] === ce) return t;
        throw Error('Could not find renamed property on target object.');
      }
      function Pe(e) {
        if ('string' == typeof e) return e;
        if (Array.isArray(e)) return '[' + e.map(Pe).join(', ') + ']';
        if (null == e) return '' + e;
        if (e.overriddenName) return `${e.overriddenName}`;
        if (e.name) return `${e.name}`;
        const t = e.toString();
        if (null == t) return '' + t;
        const n = t.indexOf('\n');
        return -1 === n ? t : t.substring(0, n);
      }
      function Gn(e, t) {
        return null == e || '' === e
          ? null === t
            ? ''
            : t
          : null == t || '' === t
          ? e
          : e + ' ' + t;
      }
      const Br = ce({ __forward_ref__: ce });
      function Wn(e) {
        return (
          (e.__forward_ref__ = Wn),
          (e.toString = function () {
            return Pe(this());
          }),
          e
        );
      }
      function K(e) {
        return (function Mn(e) {
          return (
            'function' == typeof e &&
            e.hasOwnProperty(Br) &&
            e.__forward_ref__ === Wn
          );
        })(e)
          ? e()
          : e;
      }
      function $r(e) {
        return e && !!e.ɵproviders;
      }
      const Eo = 'https://g.co/ng/security#xss';
      class U extends Error {
        constructor(t, n) {
          super(
            (function gr(e, t) {
              return `NG0${Math.abs(e)}${t ? ': ' + t : ''}`;
            })(t, n)
          ),
            (this.code = t);
        }
      }
      function Y(e) {
        return 'string' == typeof e ? e : null == e ? '' : String(e);
      }
      function Wc(e, t) {
        throw new U(-201, !1);
      }
      function sn(e, t) {
        null == e &&
          (function Q(e, t, n, r) {
            throw new Error(
              `ASSERTION ERROR: ${e}` +
                (null == r ? '' : ` [Expected=> ${n} ${r} ${t} <=Actual]`)
            );
          })(t, e, null, '!=');
      }
      function ve(e) {
        return {
          token: e.token,
          providedIn: e.providedIn || null,
          factory: e.factory,
          value: void 0,
        };
      }
      function qr(e) {
        return { providers: e.providers || [], imports: e.imports || [] };
      }
      function Ji(e) {
        return m_(e, Ki) || m_(e, w_);
      }
      function m_(e, t) {
        return e.hasOwnProperty(t) ? e[t] : null;
      }
      function Zi(e) {
        return e && (e.hasOwnProperty(Jc) || e.hasOwnProperty(fb))
          ? e[Jc]
          : null;
      }
      const Ki = ce({ ɵprov: ce }),
        Jc = ce({ ɵinj: ce }),
        w_ = ce({ ngInjectableDef: ce }),
        fb = ce({ ngInjectorDef: ce });
      var he = (function (e) {
        return (
          (e[(e.Default = 0)] = 'Default'),
          (e[(e.Host = 1)] = 'Host'),
          (e[(e.Self = 2)] = 'Self'),
          (e[(e.SkipSelf = 4)] = 'SkipSelf'),
          (e[(e.Optional = 8)] = 'Optional'),
          e
        );
      })(he || {});
      let Zc;
      function Lt(e) {
        const t = Zc;
        return (Zc = e), t;
      }
      function b_(e, t, n) {
        const r = Ji(e);
        return r && 'root' == r.providedIn
          ? void 0 === r.value
            ? (r.value = r.factory())
            : r.value
          : n & he.Optional
          ? null
          : void 0 !== t
          ? t
          : void Wc(Pe(e));
      }
      const Oe = globalThis,
        Ps = {},
        el = '__NG_DI_FLAG__',
        Yi = 'ngTempTokenPath',
        hb = /\n/gm,
        D_ = '__source';
      let Co;
      function hr(e) {
        const t = Co;
        return (Co = e), t;
      }
      function yb(e, t = he.Default) {
        if (void 0 === Co) throw new U(-203, !1);
        return null === Co
          ? b_(e, void 0, t)
          : Co.get(e, t & he.Optional ? null : void 0, t);
      }
      function le(e, t = he.Default) {
        return (
          (function y_() {
            return Zc;
          })() || yb
        )(K(e), t);
      }
      function De(e, t = he.Default) {
        return le(e, Qi(t));
      }
      function Qi(e) {
        return typeof e > 'u' || 'number' == typeof e
          ? e
          : 0 |
              (e.optional && 8) |
              (e.host && 1) |
              (e.self && 2) |
              (e.skipSelf && 4);
      }
      function tl(e) {
        const t = [];
        for (let n = 0; n < e.length; n++) {
          const r = K(e[n]);
          if (Array.isArray(r)) {
            if (0 === r.length) throw new U(900, !1);
            let o,
              i = he.Default;
            for (let a = 0; a < r.length; a++) {
              const u = r[a],
                d = bb(u);
              'number' == typeof d
                ? -1 === d
                  ? (o = u.token)
                  : (i |= d)
                : (o = u);
            }
            t.push(le(o, i));
          } else t.push(le(r));
        }
        return t;
      }
      function Os(e, t) {
        return (e[el] = t), (e.prototype[el] = t), e;
      }
      function bb(e) {
        return e[el];
      }
      function Jn(e) {
        return { toString: e }.toString();
      }
      var Xi = (function (e) {
          return (
            (e[(e.OnPush = 0)] = 'OnPush'), (e[(e.Default = 1)] = 'Default'), e
          );
        })(Xi || {}),
        gn = (function (e) {
          return (
            (e[(e.Emulated = 0)] = 'Emulated'),
            (e[(e.None = 2)] = 'None'),
            (e[(e.ShadowDom = 3)] = 'ShadowDom'),
            e
          );
        })(gn || {});
      const kn = {},
        Ee = [],
        ea = ce({ ɵcmp: ce }),
        nl = ce({ ɵdir: ce }),
        rl = ce({ ɵpipe: ce }),
        Zn = ce({ ɵfac: ce }),
        Fs = ce({ __NG_ELEMENT_ID__: ce }),
        I_ = ce({ __NG_ENV_ID__: ce });
      function S_(e, t, n) {
        let r = e.length;
        for (;;) {
          const o = e.indexOf(t, n);
          if (-1 === o) return o;
          if (0 === o || e.charCodeAt(o - 1) <= 32) {
            const i = t.length;
            if (o + i === r || e.charCodeAt(o + i) <= 32) return o;
          }
          n = o + 1;
        }
      }
      function ol(e, t, n) {
        let r = 0;
        for (; r < n.length; ) {
          const o = n[r];
          if ('number' == typeof o) {
            if (0 !== o) break;
            r++;
            const i = n[r++],
              a = n[r++],
              u = n[r++];
            e.setAttribute(t, a, u, i);
          } else {
            const i = o,
              a = n[++r];
            k_(i) ? e.setProperty(t, i, a) : e.setAttribute(t, i, a), r++;
          }
        }
        return r;
      }
      function M_(e) {
        return 3 === e || 4 === e || 6 === e;
      }
      function k_(e) {
        return 64 === e.charCodeAt(0);
      }
      function Ls(e, t) {
        if (null !== t && 0 !== t.length)
          if (null === e || 0 === e.length) e = t.slice();
          else {
            let n = -1;
            for (let r = 0; r < t.length; r++) {
              const o = t[r];
              'number' == typeof o
                ? (n = o)
                : 0 === n ||
                  T_(e, n, o, null, -1 === n || 2 === n ? t[++r] : null);
            }
          }
        return e;
      }
      function T_(e, t, n, r, o) {
        let i = 0,
          a = e.length;
        if (-1 === t) a = -1;
        else
          for (; i < e.length; ) {
            const u = e[i++];
            if ('number' == typeof u) {
              if (u === t) {
                a = -1;
                break;
              }
              if (u > t) {
                a = i - 1;
                break;
              }
            }
          }
        for (; i < e.length; ) {
          const u = e[i];
          if ('number' == typeof u) break;
          if (u === n) {
            if (null === r) return void (null !== o && (e[i + 1] = o));
            if (r === e[i + 1]) return void (e[i + 2] = o);
          }
          i++, null !== r && i++, null !== o && i++;
        }
        -1 !== a && (e.splice(a, 0, t), (i = a + 1)),
          e.splice(i++, 0, n),
          null !== r && e.splice(i++, 0, r),
          null !== o && e.splice(i++, 0, o);
      }
      const A_ = 'ng-template';
      function Eb(e, t, n) {
        let r = 0,
          o = !0;
        for (; r < e.length; ) {
          let i = e[r++];
          if ('string' == typeof i && o) {
            const a = e[r++];
            if (n && 'class' === i && -1 !== S_(a.toLowerCase(), t, 0))
              return !0;
          } else {
            if (1 === i) {
              for (; r < e.length && 'string' == typeof (i = e[r++]); )
                if (i.toLowerCase() === t) return !0;
              return !1;
            }
            'number' == typeof i && (o = !1);
          }
        }
        return !1;
      }
      function N_(e) {
        return 4 === e.type && e.value !== A_;
      }
      function Cb(e, t, n) {
        return t === (4 !== e.type || n ? e.value : A_);
      }
      function Ib(e, t, n) {
        let r = 4;
        const o = e.attrs || [],
          i = (function kb(e) {
            for (let t = 0; t < e.length; t++) if (M_(e[t])) return t;
            return e.length;
          })(o);
        let a = !1;
        for (let u = 0; u < t.length; u++) {
          const d = t[u];
          if ('number' != typeof d) {
            if (!a)
              if (4 & r) {
                if (
                  ((r = 2 | (1 & r)),
                  ('' !== d && !Cb(e, d, n)) || ('' === d && 1 === t.length))
                ) {
                  if (hn(r)) return !1;
                  a = !0;
                }
              } else {
                const f = 8 & r ? d : t[++u];
                if (8 & r && null !== e.attrs) {
                  if (!Eb(e.attrs, f, n)) {
                    if (hn(r)) return !1;
                    a = !0;
                  }
                  continue;
                }
                const m = Sb(8 & r ? 'class' : d, o, N_(e), n);
                if (-1 === m) {
                  if (hn(r)) return !1;
                  a = !0;
                  continue;
                }
                if ('' !== f) {
                  let w;
                  w = m > i ? '' : o[m + 1].toLowerCase();
                  const b = 8 & r ? w : null;
                  if ((b && -1 !== S_(b, f, 0)) || (2 & r && f !== w)) {
                    if (hn(r)) return !1;
                    a = !0;
                  }
                }
              }
          } else {
            if (!a && !hn(r) && !hn(d)) return !1;
            if (a && hn(d)) continue;
            (a = !1), (r = d | (1 & r));
          }
        }
        return hn(r) || a;
      }
      function hn(e) {
        return 0 == (1 & e);
      }
      function Sb(e, t, n, r) {
        if (null === t) return -1;
        let o = 0;
        if (r || !n) {
          let i = !1;
          for (; o < t.length; ) {
            const a = t[o];
            if (a === e) return o;
            if (3 === a || 6 === a) i = !0;
            else {
              if (1 === a || 2 === a) {
                let u = t[++o];
                for (; 'string' == typeof u; ) u = t[++o];
                continue;
              }
              if (4 === a) break;
              if (0 === a) {
                o += 4;
                continue;
              }
            }
            o += i ? 1 : 2;
          }
          return -1;
        }
        return (function Tb(e, t) {
          let n = e.indexOf(4);
          if (n > -1)
            for (n++; n < e.length; ) {
              const r = e[n];
              if ('number' == typeof r) return -1;
              if (r === t) return n;
              n++;
            }
          return -1;
        })(t, e);
      }
      function x_(e, t, n = !1) {
        for (let r = 0; r < t.length; r++) if (Ib(e, t[r], n)) return !0;
        return !1;
      }
      function R_(e, t) {
        return e ? ':not(' + t.trim() + ')' : t;
      }
      function Nb(e) {
        let t = e[0],
          n = 1,
          r = 2,
          o = '',
          i = !1;
        for (; n < e.length; ) {
          let a = e[n];
          if ('string' == typeof a)
            if (2 & r) {
              const u = e[++n];
              o += '[' + a + (u.length > 0 ? '="' + u + '"' : '') + ']';
            } else 8 & r ? (o += '.' + a) : 4 & r && (o += ' ' + a);
          else
            '' !== o && !hn(a) && ((t += R_(i, o)), (o = '')),
              (r = a),
              (i = i || !hn(r));
          n++;
        }
        return '' !== o && (t += R_(i, o)), t;
      }
      function sl(e) {
        return Jn(() => {
          const t = O_(e),
            n = {
              ...t,
              decls: e.decls,
              vars: e.vars,
              template: e.template,
              consts: e.consts || null,
              ngContentSelectors: e.ngContentSelectors,
              onPush: e.changeDetection === Xi.OnPush,
              directiveDefs: null,
              pipeDefs: null,
              dependencies: (t.standalone && e.dependencies) || null,
              getStandaloneInjector: null,
              signals: e.signals ?? !1,
              data: e.data || {},
              encapsulation: e.encapsulation || gn.Emulated,
              styles: e.styles || Ee,
              _: null,
              schemas: e.schemas || null,
              tView: null,
              id: '',
            };
          F_(n);
          const r = e.dependencies;
          return (
            (n.directiveDefs = ta(r, !1)),
            (n.pipeDefs = ta(r, !0)),
            (n.id = (function Hb(e) {
              let t = 0;
              const n = [
                e.selectors,
                e.ngContentSelectors,
                e.hostVars,
                e.hostAttrs,
                e.consts,
                e.vars,
                e.decls,
                e.encapsulation,
                e.standalone,
                e.signals,
                e.exportAs,
                JSON.stringify(e.inputs),
                JSON.stringify(e.outputs),
                Object.getOwnPropertyNames(e.type.prototype),
                !!e.contentQueries,
                !!e.viewQuery,
              ].join('|');
              for (const o of n) t = (Math.imul(31, t) + o.charCodeAt(0)) << 0;
              return (t += 2147483648), 'c' + t;
            })(n)),
            n
          );
        });
      }
      function Ob(e) {
        return we(e) || lt(e);
      }
      function Fb(e) {
        return null !== e;
      }
      function Io(e) {
        return Jn(() => ({
          type: e.type,
          bootstrap: e.bootstrap || Ee,
          declarations: e.declarations || Ee,
          imports: e.imports || Ee,
          exports: e.exports || Ee,
          transitiveCompileScopes: null,
          schemas: e.schemas || null,
          id: e.id || null,
        }));
      }
      function P_(e, t) {
        if (null == e) return kn;
        const n = {};
        for (const r in e)
          if (e.hasOwnProperty(r)) {
            let o = e[r],
              i = o;
            Array.isArray(o) && ((i = o[1]), (o = o[0])),
              (n[o] = r),
              t && (t[o] = i);
          }
        return n;
      }
      function an(e) {
        return Jn(() => {
          const t = O_(e);
          return F_(t), t;
        });
      }
      function we(e) {
        return e[ea] || null;
      }
      function lt(e) {
        return e[nl] || null;
      }
      function kt(e) {
        return e[rl] || null;
      }
      function O_(e) {
        const t = {};
        return {
          type: e.type,
          providersResolver: null,
          factory: null,
          hostBindings: e.hostBindings || null,
          hostVars: e.hostVars || 0,
          hostAttrs: e.hostAttrs || null,
          contentQueries: e.contentQueries || null,
          declaredInputs: t,
          inputTransforms: null,
          inputConfig: e.inputs || kn,
          exportAs: e.exportAs || null,
          standalone: !0 === e.standalone,
          signals: !0 === e.signals,
          selectors: e.selectors || Ee,
          viewQuery: e.viewQuery || null,
          features: e.features || null,
          setInput: null,
          findHostDirectiveDefs: null,
          hostDirectives: null,
          inputs: P_(e.inputs, t),
          outputs: P_(e.outputs),
        };
      }
      function F_(e) {
        e.features?.forEach((t) => t(e));
      }
      function ta(e, t) {
        if (!e) return null;
        const n = t ? kt : Ob;
        return () =>
          ('function' == typeof e ? e() : e).map((r) => n(r)).filter(Fb);
      }
      const Je = 0,
        q = 1,
        se = 2,
        qe = 3,
        mn = 4,
        Hs = 5,
        yt = 6,
        So = 7,
        Ze = 8,
        mr = 9,
        Mo = 10,
        re = 11,
        Vs = 12,
        L_ = 13,
        ko = 14,
        Ke = 15,
        Bs = 16,
        To = 17,
        Tn = 18,
        $s = 19,
        j_ = 20,
        wr = 21,
        Kn = 22,
        na = 23,
        ra = 24,
        ge = 25,
        il = 1,
        H_ = 2,
        An = 7,
        Ao = 9,
        ut = 11;
      function Ht(e) {
        return Array.isArray(e) && 'object' == typeof e[il];
      }
      function Vt(e) {
        return Array.isArray(e) && !0 === e[il];
      }
      function al(e) {
        return 0 != (4 & e.flags);
      }
      function zr(e) {
        return e.componentOffset > -1;
      }
      function sa(e) {
        return 1 == (1 & e.flags);
      }
      function wn(e) {
        return !!e.template;
      }
      function cl(e) {
        return 0 != (512 & e[se]);
      }
      function Gr(e, t) {
        return e.hasOwnProperty(Zn) ? e[Zn] : null;
      }
      let zb =
          Oe.WeakRef ??
          class qb {
            constructor(t) {
              this.ref = t;
            }
            deref() {
              return this.ref;
            }
          },
        Wb = 0,
        Nn = null,
        ia = !1;
      function it(e) {
        const t = Nn;
        return (Nn = e), t;
      }
      class q_ {
        constructor() {
          (this.id = Wb++),
            (this.ref = (function Gb(e) {
              return new zb(e);
            })(this)),
            (this.producers = new Map()),
            (this.consumers = new Map()),
            (this.trackingVersion = 0),
            (this.valueVersion = 0);
        }
        consumerPollProducersForChange() {
          for (const [t, n] of this.producers) {
            const r = n.producerNode.deref();
            if (null != r && n.atTrackingVersion === this.trackingVersion) {
              if (r.producerPollStatus(n.seenValueVersion)) return !0;
            } else this.producers.delete(t), r?.consumers.delete(this.id);
          }
          return !1;
        }
        producerMayHaveChanged() {
          const t = ia;
          ia = !0;
          try {
            for (const [n, r] of this.consumers) {
              const o = r.consumerNode.deref();
              null != o && o.trackingVersion === r.atTrackingVersion
                ? o.onConsumerDependencyMayHaveChanged()
                : (this.consumers.delete(n), o?.producers.delete(this.id));
            }
          } finally {
            ia = t;
          }
        }
        producerAccessed() {
          if (ia) throw new Error('');
          if (null === Nn) return;
          let t = Nn.producers.get(this.id);
          void 0 === t
            ? ((t = {
                consumerNode: Nn.ref,
                producerNode: this.ref,
                seenValueVersion: this.valueVersion,
                atTrackingVersion: Nn.trackingVersion,
              }),
              Nn.producers.set(this.id, t),
              this.consumers.set(Nn.id, t))
            : ((t.seenValueVersion = this.valueVersion),
              (t.atTrackingVersion = Nn.trackingVersion));
        }
        get hasProducers() {
          return this.producers.size > 0;
        }
        get producerUpdatesAllowed() {
          return !1 !== Nn?.consumerAllowSignalWrites;
        }
        producerPollStatus(t) {
          return (
            this.valueVersion !== t ||
            (this.onProducerUpdateValueVersion(), this.valueVersion !== t)
          );
        }
      }
      let z_ = null;
      const W_ = () => {};
      class Yb extends q_ {
        constructor(t, n, r) {
          super(),
            (this.watch = t),
            (this.schedule = n),
            (this.dirty = !1),
            (this.cleanupFn = W_),
            (this.registerOnCleanup = (o) => {
              this.cleanupFn = o;
            }),
            (this.consumerAllowSignalWrites = r);
        }
        notify() {
          this.dirty || this.schedule(this), (this.dirty = !0);
        }
        onConsumerDependencyMayHaveChanged() {
          this.notify();
        }
        onProducerUpdateValueVersion() {}
        run() {
          if (
            ((this.dirty = !1),
            0 !== this.trackingVersion &&
              !this.consumerPollProducersForChange())
          )
            return;
          const t = it(this);
          this.trackingVersion++;
          try {
            this.cleanupFn(),
              (this.cleanupFn = W_),
              this.watch(this.registerOnCleanup);
          } finally {
            it(t);
          }
        }
        cleanup() {
          this.cleanupFn();
        }
      }
      class Qb {
        constructor(t, n, r) {
          (this.previousValue = t),
            (this.currentValue = n),
            (this.firstChange = r);
        }
        isFirstChange() {
          return this.firstChange;
        }
      }
      function J_(e) {
        return e.type.prototype.ngOnChanges && (e.setInput = ev), Xb;
      }
      function Xb() {
        const e = K_(this),
          t = e?.current;
        if (t) {
          const n = e.previous;
          if (n === kn) e.previous = t;
          else for (let r in t) n[r] = t[r];
          (e.current = null), this.ngOnChanges(t);
        }
      }
      function ev(e, t, n, r) {
        const o = this.declaredInputs[n],
          i =
            K_(e) ||
            (function tv(e, t) {
              return (e[Z_] = t);
            })(e, { previous: kn, current: null }),
          a = i.current || (i.current = {}),
          u = i.previous,
          d = u[o];
        (a[o] = new Qb(d && d.currentValue, t, u === kn)), (e[r] = t);
      }
      const Z_ = '__ngSimpleChanges__';
      function K_(e) {
        return e[Z_] || null;
      }
      const xn = function (e, t, n) {},
        Y_ = 'svg';
      function je(e) {
        for (; Array.isArray(e); ) e = e[Je];
        return e;
      }
      function Bt(e, t) {
        return je(t[e.index]);
      }
      function X_(e, t) {
        return e.data[t];
      }
      function Qt(e, t) {
        const n = t[e];
        return Ht(n) ? n : n[Je];
      }
      function yr(e, t) {
        return null == t ? null : e[t];
      }
      function ef(e) {
        e[To] = 0;
      }
      function cv(e) {
        1024 & e[se] || ((e[se] |= 1024), nf(e, 1));
      }
      function tf(e) {
        1024 & e[se] && ((e[se] &= -1025), nf(e, -1));
      }
      function nf(e, t) {
        let n = e[qe];
        if (null === n) return;
        n[Hs] += t;
        let r = n;
        for (
          n = n[qe];
          null !== n && ((1 === t && 1 === r[Hs]) || (-1 === t && 0 === r[Hs]));

        )
          (n[Hs] += t), (r = n), (n = n[qe]);
      }
      const X = {
        lFrame: gf(null),
        bindingsEnabled: !0,
        skipHydrationRootTNode: null,
      };
      function af() {
        return X.bindingsEnabled;
      }
      function F() {
        return X.lFrame.lView;
      }
      function ye() {
        return X.lFrame.tView;
      }
      function bt(e) {
        return (X.lFrame.contextLView = e), e[Ze];
      }
      function vt(e) {
        return (X.lFrame.contextLView = null), e;
      }
      function dt() {
        let e = cf();
        for (; null !== e && 64 === e.type; ) e = e.parent;
        return e;
      }
      function cf() {
        return X.lFrame.currentTNode;
      }
      function Rn(e, t) {
        const n = X.lFrame;
        (n.currentTNode = e), (n.isParent = t);
      }
      function pl() {
        return X.lFrame.isParent;
      }
      function gl() {
        X.lFrame.isParent = !1;
      }
      function Ro() {
        return X.lFrame.bindingIndex++;
      }
      function bv(e, t) {
        const n = X.lFrame;
        (n.bindingIndex = n.bindingRootIndex = e), hl(t);
      }
      function hl(e) {
        X.lFrame.currentDirectiveIndex = e;
      }
      function _f() {
        return X.lFrame.currentQueryIndex;
      }
      function wl(e) {
        X.lFrame.currentQueryIndex = e;
      }
      function Dv(e) {
        const t = e[q];
        return 2 === t.type ? t.declTNode : 1 === t.type ? e[yt] : null;
      }
      function ff(e, t, n) {
        if (n & he.SkipSelf) {
          let o = t,
            i = e;
          for (
            ;
            !((o = o.parent),
            null !== o ||
              n & he.Host ||
              ((o = Dv(i)), null === o || ((i = i[ko]), 10 & o.type)));

          );
          if (null === o) return !1;
          (t = o), (e = i);
        }
        const r = (X.lFrame = pf());
        return (r.currentTNode = t), (r.lView = e), !0;
      }
      function yl(e) {
        const t = pf(),
          n = e[q];
        (X.lFrame = t),
          (t.currentTNode = n.firstChild),
          (t.lView = e),
          (t.tView = n),
          (t.contextLView = e),
          (t.bindingIndex = n.bindingStartIndex),
          (t.inI18n = !1);
      }
      function pf() {
        const e = X.lFrame,
          t = null === e ? null : e.child;
        return null === t ? gf(e) : t;
      }
      function gf(e) {
        const t = {
          currentTNode: null,
          isParent: !0,
          lView: null,
          tView: null,
          selectedIndex: -1,
          contextLView: null,
          elementDepthCount: 0,
          currentNamespace: null,
          currentDirectiveIndex: -1,
          bindingRootIndex: -1,
          bindingIndex: -1,
          currentQueryIndex: 0,
          parent: e,
          child: null,
          inI18n: !1,
        };
        return null !== e && (e.child = t), t;
      }
      function hf() {
        const e = X.lFrame;
        return (
          (X.lFrame = e.parent), (e.currentTNode = null), (e.lView = null), e
        );
      }
      const mf = hf;
      function bl() {
        const e = hf();
        (e.isParent = !0),
          (e.tView = null),
          (e.selectedIndex = -1),
          (e.contextLView = null),
          (e.elementDepthCount = 0),
          (e.currentDirectiveIndex = -1),
          (e.currentNamespace = null),
          (e.bindingRootIndex = -1),
          (e.bindingIndex = -1),
          (e.currentQueryIndex = 0);
      }
      function At() {
        return X.lFrame.selectedIndex;
      }
      function Wr(e) {
        X.lFrame.selectedIndex = e;
      }
      function ze() {
        const e = X.lFrame;
        return X_(e.tView, e.selectedIndex);
      }
      function zs() {
        X.lFrame.currentNamespace = Y_;
      }
      function vl() {
        !(function Sv() {
          X.lFrame.currentNamespace = null;
        })();
      }
      let yf = !0;
      function da() {
        return yf;
      }
      function br(e) {
        yf = e;
      }
      function _a(e, t) {
        for (let n = t.directiveStart, r = t.directiveEnd; n < r; n++) {
          const i = e.data[n].type.prototype,
            {
              ngAfterContentInit: a,
              ngAfterContentChecked: u,
              ngAfterViewInit: d,
              ngAfterViewChecked: f,
              ngOnDestroy: p,
            } = i;
          a && (e.contentHooks ??= []).push(-n, a),
            u &&
              ((e.contentHooks ??= []).push(n, u),
              (e.contentCheckHooks ??= []).push(n, u)),
            d && (e.viewHooks ??= []).push(-n, d),
            f &&
              ((e.viewHooks ??= []).push(n, f),
              (e.viewCheckHooks ??= []).push(n, f)),
            null != p && (e.destroyHooks ??= []).push(n, p);
        }
      }
      function fa(e, t, n) {
        bf(e, t, 3, n);
      }
      function pa(e, t, n, r) {
        (3 & e[se]) === n && bf(e, t, n, r);
      }
      function Dl(e, t) {
        let n = e[se];
        (3 & n) === t && ((n &= 8191), (n += 1), (e[se] = n));
      }
      function bf(e, t, n, r) {
        const i = r ?? -1,
          a = t.length - 1;
        let u = 0;
        for (let d = void 0 !== r ? 65535 & e[To] : 0; d < a; d++)
          if ('number' == typeof t[d + 1]) {
            if (((u = t[d]), null != r && u >= r)) break;
          } else
            t[d] < 0 && (e[To] += 65536),
              (u < i || -1 == i) &&
                (kv(e, n, t, d), (e[To] = (4294901760 & e[To]) + d + 2)),
              d++;
      }
      function vf(e, t) {
        xn(4, e, t);
        const n = it(null);
        try {
          t.call(e);
        } finally {
          it(n), xn(5, e, t);
        }
      }
      function kv(e, t, n, r) {
        const o = n[r] < 0,
          i = n[r + 1],
          u = e[o ? -n[r] : n[r]];
        o
          ? e[se] >> 13 < e[To] >> 16 &&
            (3 & e[se]) === t &&
            ((e[se] += 8192), vf(u, i))
          : vf(u, i);
      }
      const Po = -1;
      class Gs {
        constructor(t, n, r) {
          (this.factory = t),
            (this.resolving = !1),
            (this.canSeeViewProviders = n),
            (this.injectImpl = r);
        }
      }
      function Cl(e) {
        return e !== Po;
      }
      function Ws(e) {
        return 32767 & e;
      }
      function Js(e, t) {
        let n = (function xv(e) {
            return e >> 16;
          })(e),
          r = t;
        for (; n > 0; ) (r = r[ko]), n--;
        return r;
      }
      let Il = !0;
      function ga(e) {
        const t = Il;
        return (Il = e), t;
      }
      const Df = 255,
        Ef = 5;
      let Rv = 0;
      const Pn = {};
      function ha(e, t) {
        const n = Cf(e, t);
        if (-1 !== n) return n;
        const r = t[q];
        r.firstCreatePass &&
          ((e.injectorIndex = t.length),
          Sl(r.data, e),
          Sl(t, null),
          Sl(r.blueprint, null));
        const o = ma(e, t),
          i = e.injectorIndex;
        if (Cl(o)) {
          const a = Ws(o),
            u = Js(o, t),
            d = u[q].data;
          for (let f = 0; f < 8; f++) t[i + f] = u[a + f] | d[a + f];
        }
        return (t[i + 8] = o), i;
      }
      function Sl(e, t) {
        e.push(0, 0, 0, 0, 0, 0, 0, 0, t);
      }
      function Cf(e, t) {
        return -1 === e.injectorIndex ||
          (e.parent && e.parent.injectorIndex === e.injectorIndex) ||
          null === t[e.injectorIndex + 8]
          ? -1
          : e.injectorIndex;
      }
      function ma(e, t) {
        if (e.parent && -1 !== e.parent.injectorIndex)
          return e.parent.injectorIndex;
        let n = 0,
          r = null,
          o = t;
        for (; null !== o; ) {
          if (((r = Nf(o)), null === r)) return Po;
          if ((n++, (o = o[ko]), -1 !== r.injectorIndex))
            return r.injectorIndex | (n << 16);
        }
        return Po;
      }
      function Ml(e, t, n) {
        !(function Pv(e, t, n) {
          let r;
          'string' == typeof n
            ? (r = n.charCodeAt(0) || 0)
            : n.hasOwnProperty(Fs) && (r = n[Fs]),
            null == r && (r = n[Fs] = Rv++);
          const o = r & Df;
          t.data[e + (o >> Ef)] |= 1 << o;
        })(e, t, n);
      }
      function If(e, t, n) {
        if (n & he.Optional || void 0 !== e) return e;
        Wc();
      }
      function Sf(e, t, n, r) {
        if (
          (n & he.Optional && void 0 === r && (r = null),
          !(n & (he.Self | he.Host)))
        ) {
          const o = e[mr],
            i = Lt(void 0);
          try {
            return o ? o.get(t, r, n & he.Optional) : b_(t, r, n & he.Optional);
          } finally {
            Lt(i);
          }
        }
        return If(r, 0, n);
      }
      function Mf(e, t, n, r = he.Default, o) {
        if (null !== e) {
          if (2048 & t[se] && !(r & he.Self)) {
            const a = (function Bv(e, t, n, r, o) {
              let i = e,
                a = t;
              for (
                ;
                null !== i && null !== a && 2048 & a[se] && !(512 & a[se]);

              ) {
                const u = kf(i, a, n, r | he.Self, Pn);
                if (u !== Pn) return u;
                let d = i.parent;
                if (!d) {
                  const f = a[j_];
                  if (f) {
                    const p = f.get(n, Pn, r);
                    if (p !== Pn) return p;
                  }
                  (d = Nf(a)), (a = a[ko]);
                }
                i = d;
              }
              return o;
            })(e, t, n, r, Pn);
            if (a !== Pn) return a;
          }
          const i = kf(e, t, n, r, Pn);
          if (i !== Pn) return i;
        }
        return Sf(t, n, r, o);
      }
      function kf(e, t, n, r, o) {
        const i = (function Lv(e) {
          if ('string' == typeof e) return e.charCodeAt(0) || 0;
          const t = e.hasOwnProperty(Fs) ? e[Fs] : void 0;
          return 'number' == typeof t ? (t >= 0 ? t & Df : Hv) : t;
        })(n);
        if ('function' == typeof i) {
          if (!ff(t, e, r)) return r & he.Host ? If(o, 0, r) : Sf(t, n, r, o);
          try {
            let a;
            if (((a = i(r)), null != a || r & he.Optional)) return a;
            Wc();
          } finally {
            mf();
          }
        } else if ('number' == typeof i) {
          let a = null,
            u = Cf(e, t),
            d = Po,
            f = r & he.Host ? t[Ke][yt] : null;
          for (
            (-1 === u || r & he.SkipSelf) &&
            ((d = -1 === u ? ma(e, t) : t[u + 8]),
            d !== Po && Af(r, !1)
              ? ((a = t[q]), (u = Ws(d)), (t = Js(d, t)))
              : (u = -1));
            -1 !== u;

          ) {
            const p = t[q];
            if (Tf(i, u, p.data)) {
              const m = Fv(u, t, n, a, r, f);
              if (m !== Pn) return m;
            }
            (d = t[u + 8]),
              d !== Po && Af(r, t[q].data[u + 8] === f) && Tf(i, u, t)
                ? ((a = p), (u = Ws(d)), (t = Js(d, t)))
                : (u = -1);
          }
        }
        return o;
      }
      function Fv(e, t, n, r, o, i) {
        const a = t[q],
          u = a.data[e + 8],
          p = wa(
            u,
            a,
            n,
            null == r ? zr(u) && Il : r != a && 0 != (3 & u.type),
            o & he.Host && i === u
          );
        return null !== p ? Jr(t, a, p, u) : Pn;
      }
      function wa(e, t, n, r, o) {
        const i = e.providerIndexes,
          a = t.data,
          u = 1048575 & i,
          d = e.directiveStart,
          p = i >> 20,
          w = o ? u + p : e.directiveEnd;
        for (let b = r ? u : u + p; b < w; b++) {
          const C = a[b];
          if ((b < d && n === C) || (b >= d && C.type === n)) return b;
        }
        if (o) {
          const b = a[d];
          if (b && wn(b) && b.type === n) return d;
        }
        return null;
      }
      function Jr(e, t, n, r) {
        let o = e[n];
        const i = t.data;
        if (
          (function Tv(e) {
            return e instanceof Gs;
          })(o)
        ) {
          const a = o;
          a.resolving &&
            (function Rs(e, t) {
              const n = t ? `. Dependency path: ${t.join(' > ')} > ${e}` : '';
              throw new U(
                -200,
                `Circular dependency in DI detected for ${e}${n}`
              );
            })(
              (function me(e) {
                return 'function' == typeof e
                  ? e.name || e.toString()
                  : 'object' == typeof e &&
                    null != e &&
                    'function' == typeof e.type
                  ? e.type.name || e.type.toString()
                  : Y(e);
              })(i[n])
            );
          const u = ga(a.canSeeViewProviders);
          a.resolving = !0;
          const f = a.injectImpl ? Lt(a.injectImpl) : null;
          ff(e, r, he.Default);
          try {
            (o = e[n] = a.factory(void 0, i, e, r)),
              t.firstCreatePass &&
                n >= r.directiveStart &&
                (function Mv(e, t, n) {
                  const {
                    ngOnChanges: r,
                    ngOnInit: o,
                    ngDoCheck: i,
                  } = t.type.prototype;
                  if (r) {
                    const a = J_(t);
                    (n.preOrderHooks ??= []).push(e, a),
                      (n.preOrderCheckHooks ??= []).push(e, a);
                  }
                  o && (n.preOrderHooks ??= []).push(0 - e, o),
                    i &&
                      ((n.preOrderHooks ??= []).push(e, i),
                      (n.preOrderCheckHooks ??= []).push(e, i));
                })(n, i[n], t);
          } finally {
            null !== f && Lt(f), ga(u), (a.resolving = !1), mf();
          }
        }
        return o;
      }
      function Tf(e, t, n) {
        return !!(n[t + (e >> Ef)] & (1 << e));
      }
      function Af(e, t) {
        return !(e & he.Self || (e & he.Host && t));
      }
      class Nt {
        constructor(t, n) {
          (this._tNode = t), (this._lView = n);
        }
        get(t, n, r) {
          return Mf(this._tNode, this._lView, t, Qi(r), n);
        }
      }
      function Hv() {
        return new Nt(dt(), F());
      }
      function Nf(e) {
        const t = e[q],
          n = t.type;
        return 2 === n ? t.declTNode : 1 === n ? e[yt] : null;
      }
      const Fo = '__parameters__';
      function jo(e, t, n) {
        return Jn(() => {
          const r = (function Al(e) {
            return function (...n) {
              if (e) {
                const r = e(...n);
                for (const o in r) this[o] = r[o];
              }
            };
          })(t);
          function o(...i) {
            if (this instanceof o) return r.apply(this, i), this;
            const a = new o(...i);
            return (u.annotation = a), u;
            function u(d, f, p) {
              const m = d.hasOwnProperty(Fo)
                ? d[Fo]
                : Object.defineProperty(d, Fo, { value: [] })[Fo];
              for (; m.length <= p; ) m.push(null);
              return (m[p] = m[p] || []).push(a), d;
            }
          }
          return (
            n && (o.prototype = Object.create(n.prototype)),
            (o.prototype.ngMetadataName = e),
            (o.annotationCls = o),
            o
          );
        });
      }
      function Vo(e, t) {
        e.forEach((n) => (Array.isArray(n) ? Vo(n, t) : t(n)));
      }
      function Rf(e, t, n) {
        t >= e.length ? e.push(n) : e.splice(t, 0, n);
      }
      function ya(e, t) {
        return t >= e.length - 1 ? e.pop() : e.splice(t, 1)[0];
      }
      const Rl = Os(jo('Optional'), 8),
        Pl = Os(jo('SkipSelf'), 4);
      function Ia(e) {
        return 128 == (128 & e.flags);
      }
      var vr = (function (e) {
        return (
          (e[(e.Important = 1)] = 'Important'),
          (e[(e.DashCase = 2)] = 'DashCase'),
          e
        );
      })(vr || {});
      const gD = /^>|^->|<!--|-->|--!>|<!-$/g,
        hD = /(<|>)/,
        mD = '\u200b$1\u200b';
      const jl = new Map();
      let wD = 0;
      const Vl = '__ngContext__';
      function Dt(e, t) {
        Ht(t)
          ? ((e[Vl] = t[$s]),
            (function bD(e) {
              jl.set(e[$s], e);
            })(t))
          : (e[Vl] = t);
      }
      let Bl;
      function $l(e, t) {
        return Bl(e, t);
      }
      function ei(e) {
        const t = e[qe];
        return Vt(t) ? t[qe] : t;
      }
      function ep(e) {
        return np(e[Vs]);
      }
      function tp(e) {
        return np(e[mn]);
      }
      function np(e) {
        for (; null !== e && !Vt(e); ) e = e[mn];
        return e;
      }
      function qo(e, t, n, r, o) {
        if (null != r) {
          let i,
            a = !1;
          Vt(r) ? (i = r) : Ht(r) && ((a = !0), (r = r[Je]));
          const u = je(r);
          0 === e && null !== n
            ? null == o
              ? ip(t, n, u)
              : Zr(t, n, u, o || null, !0)
            : 1 === e && null !== n
            ? Zr(t, n, u, o || null, !0)
            : 2 === e
            ? (function xa(e, t, n) {
                const r = Aa(e, t);
                r &&
                  (function HD(e, t, n, r) {
                    e.removeChild(t, n, r);
                  })(e, r, t, n);
              })(t, u, a)
            : 3 === e && t.destroyNode(u),
            null != i &&
              (function $D(e, t, n, r, o) {
                const i = n[An];
                i !== je(n) && qo(t, e, r, i, o);
                for (let u = ut; u < n.length; u++) {
                  const d = n[u];
                  ni(d[q], d, e, t, r, i);
                }
              })(t, e, i, n, o);
        }
      }
      function Ul(e, t) {
        return e.createComment(
          (function Gf(e) {
            return e.replace(gD, (t) => t.replace(hD, mD));
          })(t)
        );
      }
      function ka(e, t, n) {
        return e.createElement(t, n);
      }
      function op(e, t) {
        const n = e[Ao],
          r = n.indexOf(t);
        tf(t), n.splice(r, 1);
      }
      function Ta(e, t) {
        if (e.length <= ut) return;
        const n = ut + t,
          r = e[n];
        if (r) {
          const o = r[Bs];
          null !== o && o !== e && op(o, r), t > 0 && (e[n - 1][mn] = r[mn]);
          const i = ya(e, ut + t);
          !(function ND(e, t) {
            ni(e, t, t[re], 2, null, null), (t[Je] = null), (t[yt] = null);
          })(r[q], r);
          const a = i[Tn];
          null !== a && a.detachView(i[q]),
            (r[qe] = null),
            (r[mn] = null),
            (r[se] &= -129);
        }
        return r;
      }
      function ql(e, t) {
        if (!(256 & t[se])) {
          const n = t[re];
          t[na]?.destroy(),
            t[ra]?.destroy(),
            n.destroyNode && ni(e, t, n, 3, null, null),
            (function PD(e) {
              let t = e[Vs];
              if (!t) return zl(e[q], e);
              for (; t; ) {
                let n = null;
                if (Ht(t)) n = t[Vs];
                else {
                  const r = t[ut];
                  r && (n = r);
                }
                if (!n) {
                  for (; t && !t[mn] && t !== e; )
                    Ht(t) && zl(t[q], t), (t = t[qe]);
                  null === t && (t = e), Ht(t) && zl(t[q], t), (n = t && t[mn]);
                }
                t = n;
              }
            })(t);
        }
      }
      function zl(e, t) {
        if (!(256 & t[se])) {
          (t[se] &= -129),
            (t[se] |= 256),
            (function jD(e, t) {
              let n;
              if (null != e && null != (n = e.destroyHooks))
                for (let r = 0; r < n.length; r += 2) {
                  const o = t[n[r]];
                  if (!(o instanceof Gs)) {
                    const i = n[r + 1];
                    if (Array.isArray(i))
                      for (let a = 0; a < i.length; a += 2) {
                        const u = o[i[a]],
                          d = i[a + 1];
                        xn(4, u, d);
                        try {
                          d.call(u);
                        } finally {
                          xn(5, u, d);
                        }
                      }
                    else {
                      xn(4, o, i);
                      try {
                        i.call(o);
                      } finally {
                        xn(5, o, i);
                      }
                    }
                  }
                }
            })(e, t),
            (function LD(e, t) {
              const n = e.cleanup,
                r = t[So];
              if (null !== n)
                for (let i = 0; i < n.length - 1; i += 2)
                  if ('string' == typeof n[i]) {
                    const a = n[i + 3];
                    a >= 0 ? r[a]() : r[-a].unsubscribe(), (i += 2);
                  } else n[i].call(r[n[i + 1]]);
              null !== r && (t[So] = null);
              const o = t[wr];
              if (null !== o) {
                t[wr] = null;
                for (let i = 0; i < o.length; i++) (0, o[i])();
              }
            })(e, t),
            1 === t[q].type && t[re].destroy();
          const n = t[Bs];
          if (null !== n && Vt(t[qe])) {
            n !== t[qe] && op(n, t);
            const r = t[Tn];
            null !== r && r.detachView(e);
          }
          !(function vD(e) {
            jl.delete(e[$s]);
          })(t);
        }
      }
      function Gl(e, t, n) {
        return (function sp(e, t, n) {
          let r = t;
          for (; null !== r && 40 & r.type; ) r = (t = r).parent;
          if (null === r) return n[Je];
          {
            const { componentOffset: o } = r;
            if (o > -1) {
              const { encapsulation: i } = e.data[r.directiveStart + o];
              if (i === gn.None || i === gn.Emulated) return null;
            }
            return Bt(r, n);
          }
        })(e, t.parent, n);
      }
      function Zr(e, t, n, r, o) {
        e.insertBefore(t, n, r, o);
      }
      function ip(e, t, n) {
        e.appendChild(t, n);
      }
      function ap(e, t, n, r, o) {
        null !== r ? Zr(e, t, n, r, o) : ip(e, t, n);
      }
      function Aa(e, t) {
        return e.parentNode(t);
      }
      let Wl,
        Ra,
        Yl,
        Pa,
        up = function lp(e, t, n) {
          return 40 & e.type ? Bt(e, n) : null;
        };
      function Na(e, t, n, r) {
        const o = Gl(e, r, t),
          i = t[re],
          u = (function cp(e, t, n) {
            return up(e, t, n);
          })(r.parent || t[yt], r, t);
        if (null != o)
          if (Array.isArray(n))
            for (let d = 0; d < n.length; d++) ap(i, o, n[d], u, !1);
          else ap(i, o, n, u, !1);
        void 0 !== Wl && Wl(i, r, t, n, o);
      }
      function ti(e, t) {
        if (null !== t) {
          const n = t.type;
          if (3 & n) return Bt(t, e);
          if (4 & n) return Jl(-1, e[t.index]);
          if (8 & n) {
            const r = t.child;
            if (null !== r) return ti(e, r);
            {
              const o = e[t.index];
              return Vt(o) ? Jl(-1, o) : je(o);
            }
          }
          if (32 & n) return $l(t, e)() || je(e[t.index]);
          {
            const r = _p(e, t);
            return null !== r
              ? Array.isArray(r)
                ? r[0]
                : ti(ei(e[Ke]), r)
              : ti(e, t.next);
          }
        }
        return null;
      }
      function _p(e, t) {
        return null !== t ? e[Ke][yt].projection[t.projection] : null;
      }
      function Jl(e, t) {
        const n = ut + e + 1;
        if (n < t.length) {
          const r = t[n],
            o = r[q].firstChild;
          if (null !== o) return ti(r, o);
        }
        return t[An];
      }
      function Zl(e, t, n, r, o, i, a) {
        for (; null != n; ) {
          const u = r[n.index],
            d = n.type;
          if (
            (a && 0 === t && (u && Dt(je(u), r), (n.flags |= 2)),
            32 != (32 & n.flags))
          )
            if (8 & d) Zl(e, t, n.child, r, o, i, !1), qo(t, e, o, u, i);
            else if (32 & d) {
              const f = $l(n, r);
              let p;
              for (; (p = f()); ) qo(t, e, o, p, i);
              qo(t, e, o, u, i);
            } else 16 & d ? pp(e, t, r, n, o, i) : qo(t, e, o, u, i);
          n = a ? n.projectionNext : n.next;
        }
      }
      function ni(e, t, n, r, o, i) {
        Zl(n, r, e.firstChild, t, o, i, !1);
      }
      function pp(e, t, n, r, o, i) {
        const a = n[Ke],
          d = a[yt].projection[r.projection];
        if (Array.isArray(d))
          for (let f = 0; f < d.length; f++) qo(t, e, o, d[f], i);
        else {
          let f = d;
          const p = a[qe];
          Ia(r) && (f.flags |= 128), Zl(e, t, f, p, o, i, !0);
        }
      }
      function gp(e, t, n) {
        '' === n
          ? e.removeAttribute(t, 'class')
          : e.setAttribute(t, 'class', n);
      }
      function hp(e, t, n) {
        const { mergedAttrs: r, classes: o, styles: i } = n;
        null !== r && ol(e, t, r),
          null !== o && gp(e, t, o),
          null !== i &&
            (function qD(e, t, n) {
              e.setAttribute(t, 'style', n);
            })(e, t, i);
      }
      function zo(e) {
        return (
          (function Kl() {
            if (void 0 === Ra && ((Ra = null), Oe.trustedTypes))
              try {
                Ra = Oe.trustedTypes.createPolicy('angular', {
                  createHTML: (e) => e,
                  createScript: (e) => e,
                  createScriptURL: (e) => e,
                });
              } catch {}
            return Ra;
          })()?.createHTML(e) || e
        );
      }
      function Go() {
        if (void 0 !== Yl) return Yl;
        if (typeof document < 'u') return document;
        throw new U(210, !1);
      }
      function mp(e) {
        return (
          (function Ql() {
            if (void 0 === Pa && ((Pa = null), Oe.trustedTypes))
              try {
                Pa = Oe.trustedTypes.createPolicy('angular#unsafe-bypass', {
                  createHTML: (e) => e,
                  createScript: (e) => e,
                  createScriptURL: (e) => e,
                });
              } catch {}
            return Pa;
          })()?.createHTML(e) || e
        );
      }
      class bp {
        constructor(t) {
          this.changingThisBreaksApplicationSecurity = t;
        }
        toString() {
          return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see ${Eo})`;
        }
      }
      class t0 {
        constructor(t) {
          this.inertDocumentHelper = t;
        }
        getInertBodyElement(t) {
          t = '<body><remove></remove>' + t;
          try {
            const n = new window.DOMParser().parseFromString(
              zo(t),
              'text/html'
            ).body;
            return null === n
              ? this.inertDocumentHelper.getInertBodyElement(t)
              : (n.removeChild(n.firstChild), n);
          } catch {
            return null;
          }
        }
      }
      class n0 {
        constructor(t) {
          (this.defaultDoc = t),
            (this.inertDocument =
              this.defaultDoc.implementation.createHTMLDocument(
                'sanitization-inert'
              ));
        }
        getInertBodyElement(t) {
          const n = this.inertDocument.createElement('template');
          return (n.innerHTML = zo(t)), n;
        }
      }
      const o0 = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:\/?#]*(?:[\/?#]|$))/i;
      function Xn(e) {
        const t = {};
        for (const n of e.split(',')) t[n] = !0;
        return t;
      }
      function oi(...e) {
        const t = {};
        for (const n of e)
          for (const r in n) n.hasOwnProperty(r) && (t[r] = !0);
        return t;
      }
      const Dp = Xn('area,br,col,hr,img,wbr'),
        Ep = Xn('colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr'),
        Cp = Xn('rp,rt'),
        eu = oi(
          Dp,
          oi(
            Ep,
            Xn(
              'address,article,aside,blockquote,caption,center,del,details,dialog,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,main,map,menu,nav,ol,pre,section,summary,table,ul'
            )
          ),
          oi(
            Cp,
            Xn(
              'a,abbr,acronym,audio,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,picture,q,ruby,rp,rt,s,samp,small,source,span,strike,strong,sub,sup,time,track,tt,u,var,video'
            )
          ),
          oi(Cp, Ep)
        ),
        tu = Xn('background,cite,href,itemtype,longdesc,poster,src,xlink:href'),
        Ip = oi(
          tu,
          Xn(
            'abbr,accesskey,align,alt,autoplay,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,controls,coords,datetime,default,dir,download,face,headers,height,hidden,hreflang,hspace,ismap,itemscope,itemprop,kind,label,lang,language,loop,media,muted,nohref,nowrap,open,preload,rel,rev,role,rows,rowspan,rules,scope,scrolling,shape,size,sizes,span,srclang,srcset,start,summary,tabindex,target,title,translate,type,usemap,valign,value,vspace,width'
          ),
          Xn(
            'aria-activedescendant,aria-atomic,aria-autocomplete,aria-busy,aria-checked,aria-colcount,aria-colindex,aria-colspan,aria-controls,aria-current,aria-describedby,aria-details,aria-disabled,aria-dropeffect,aria-errormessage,aria-expanded,aria-flowto,aria-grabbed,aria-haspopup,aria-hidden,aria-invalid,aria-keyshortcuts,aria-label,aria-labelledby,aria-level,aria-live,aria-modal,aria-multiline,aria-multiselectable,aria-orientation,aria-owns,aria-placeholder,aria-posinset,aria-pressed,aria-readonly,aria-relevant,aria-required,aria-roledescription,aria-rowcount,aria-rowindex,aria-rowspan,aria-selected,aria-setsize,aria-sort,aria-valuemax,aria-valuemin,aria-valuenow,aria-valuetext'
          )
        ),
        s0 = Xn('script,style,template');
      class a0 {
        constructor() {
          (this.sanitizedSomething = !1), (this.buf = []);
        }
        sanitizeChildren(t) {
          let n = t.firstChild,
            r = !0;
          for (; n; )
            if (
              (n.nodeType === Node.ELEMENT_NODE
                ? (r = this.startElement(n))
                : n.nodeType === Node.TEXT_NODE
                ? this.chars(n.nodeValue)
                : (this.sanitizedSomething = !0),
              r && n.firstChild)
            )
              n = n.firstChild;
            else
              for (; n; ) {
                n.nodeType === Node.ELEMENT_NODE && this.endElement(n);
                let o = this.checkClobberedElement(n, n.nextSibling);
                if (o) {
                  n = o;
                  break;
                }
                n = this.checkClobberedElement(n, n.parentNode);
              }
          return this.buf.join('');
        }
        startElement(t) {
          const n = t.nodeName.toLowerCase();
          if (!eu.hasOwnProperty(n))
            return (this.sanitizedSomething = !0), !s0.hasOwnProperty(n);
          this.buf.push('<'), this.buf.push(n);
          const r = t.attributes;
          for (let o = 0; o < r.length; o++) {
            const i = r.item(o),
              a = i.name,
              u = a.toLowerCase();
            if (!Ip.hasOwnProperty(u)) {
              this.sanitizedSomething = !0;
              continue;
            }
            let d = i.value;
            tu[u] &&
              ((e = d), (d = (e = String(e)).match(o0) ? e : 'unsafe:' + e)),
              this.buf.push(' ', a, '="', Sp(d), '"');
          }
          var e;
          return this.buf.push('>'), !0;
        }
        endElement(t) {
          const n = t.nodeName.toLowerCase();
          eu.hasOwnProperty(n) &&
            !Dp.hasOwnProperty(n) &&
            (this.buf.push('</'), this.buf.push(n), this.buf.push('>'));
        }
        chars(t) {
          this.buf.push(Sp(t));
        }
        checkClobberedElement(t, n) {
          if (
            n &&
            (t.compareDocumentPosition(n) &
              Node.DOCUMENT_POSITION_CONTAINED_BY) ===
              Node.DOCUMENT_POSITION_CONTAINED_BY
          )
            throw new Error(
              `Failed to sanitize html because the element is clobbered: ${t.outerHTML}`
            );
          return n;
        }
      }
      const c0 = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g,
        l0 = /([^\#-~ |!])/g;
      function Sp(e) {
        return e
          .replace(/&/g, '&amp;')
          .replace(c0, function (t) {
            return (
              '&#' +
              (1024 * (t.charCodeAt(0) - 55296) +
                (t.charCodeAt(1) - 56320) +
                65536) +
              ';'
            );
          })
          .replace(l0, function (t) {
            return '&#' + t.charCodeAt(0) + ';';
          })
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;');
      }
      let Oa;
      function nu(e) {
        return 'content' in e &&
          (function d0(e) {
            return (
              e.nodeType === Node.ELEMENT_NODE && 'TEMPLATE' === e.nodeName
            );
          })(e)
          ? e.content
          : null;
      }
      var Wo = (function (e) {
        return (
          (e[(e.NONE = 0)] = 'NONE'),
          (e[(e.HTML = 1)] = 'HTML'),
          (e[(e.STYLE = 2)] = 'STYLE'),
          (e[(e.SCRIPT = 3)] = 'SCRIPT'),
          (e[(e.URL = 4)] = 'URL'),
          (e[(e.RESOURCE_URL = 5)] = 'RESOURCE_URL'),
          e
        );
      })(Wo || {});
      function ru(e) {
        const t = (function si() {
          const e = F();
          return e && e[Mo].sanitizer;
        })();
        return t
          ? mp(t.sanitize(Wo.HTML, e) || '')
          : (function ri(e, t) {
              const n = (function e0(e) {
                return (e instanceof bp && e.getTypeName()) || null;
              })(e);
              if (null != n && n !== t) {
                if ('ResourceURL' === n && 'URL' === t) return !0;
                throw new Error(`Required a safe ${t}, got a ${n} (see ${Eo})`);
              }
              return n === t;
            })(e, 'HTML')
          ? mp(
              (function Dr(e) {
                return e instanceof bp
                  ? e.changingThisBreaksApplicationSecurity
                  : e;
              })(e)
            )
          : (function u0(e, t) {
              let n = null;
              try {
                Oa =
                  Oa ||
                  (function vp(e) {
                    const t = new n0(e);
                    return (function r0() {
                      try {
                        return !!new window.DOMParser().parseFromString(
                          zo(''),
                          'text/html'
                        );
                      } catch {
                        return !1;
                      }
                    })()
                      ? new t0(t)
                      : t;
                  })(e);
                let r = t ? String(t) : '';
                n = Oa.getInertBodyElement(r);
                let o = 5,
                  i = r;
                do {
                  if (0 === o)
                    throw new Error(
                      'Failed to sanitize html because the input is unstable'
                    );
                  o--,
                    (r = i),
                    (i = n.innerHTML),
                    (n = Oa.getInertBodyElement(r));
                } while (r !== i);
                return zo(new a0().sanitizeChildren(nu(n) || n));
              } finally {
                if (n) {
                  const r = nu(n) || n;
                  for (; r.firstChild; ) r.removeChild(r.firstChild);
                }
              }
            })(Go(), Y(e));
      }
      class Z {
        constructor(t, n) {
          (this._desc = t),
            (this.ngMetadataName = 'InjectionToken'),
            (this.ɵprov = void 0),
            'number' == typeof n
              ? (this.__NG_ELEMENT_ID__ = n)
              : void 0 !== n &&
                (this.ɵprov = ve({
                  token: this,
                  providedIn: n.providedIn || 'root',
                  factory: n.factory,
                }));
        }
        get multi() {
          return this;
        }
        toString() {
          return `InjectionToken ${this._desc}`;
        }
      }
      const Fa = new Z('ENVIRONMENT_INITIALIZER'),
        Tp = new Z('INJECTOR', -1),
        Ap = new Z('INJECTOR_DEF_TYPES');
      class ou {
        get(t, n = Ps) {
          if (n === Ps) {
            const r = new Error(`NullInjectorError: No provider for ${Pe(t)}!`);
            throw ((r.name = 'NullInjectorError'), r);
          }
          return n;
        }
      }
      function su(e) {
        return { ɵproviders: e };
      }
      function Np(...e) {
        return { ɵproviders: xp(0, e), ɵfromNgModule: !0 };
      }
      function xp(e, ...t) {
        const n = [],
          r = new Set();
        let o;
        const i = (a) => {
          n.push(a);
        };
        return (
          Vo(t, (a) => {
            const u = a;
            La(u, i, [], r) && ((o ||= []), o.push(u));
          }),
          void 0 !== o && Rp(o, i),
          n
        );
      }
      function Rp(e, t) {
        for (let n = 0; n < e.length; n++) {
          const { ngModule: r, providers: o } = e[n];
          iu(o, (i) => {
            t(i, r);
          });
        }
      }
      function La(e, t, n, r) {
        if (!(e = K(e))) return !1;
        let o = null,
          i = Zi(e);
        const a = !i && we(e);
        if (i || a) {
          if (a && !a.standalone) return !1;
          o = e;
        } else {
          const d = e.ngModule;
          if (((i = Zi(d)), !i)) return !1;
          o = d;
        }
        const u = r.has(o);
        if (a) {
          if (u) return !1;
          if ((r.add(o), a.dependencies)) {
            const d =
              'function' == typeof a.dependencies
                ? a.dependencies()
                : a.dependencies;
            for (const f of d) La(f, t, n, r);
          }
        } else {
          if (!i) return !1;
          {
            if (null != i.imports && !u) {
              let f;
              r.add(o);
              try {
                Vo(i.imports, (p) => {
                  La(p, t, n, r) && ((f ||= []), f.push(p));
                });
              } finally {
              }
              void 0 !== f && Rp(f, t);
            }
            if (!u) {
              const f = Gr(o) || (() => new o());
              t({ provide: o, useFactory: f, deps: Ee }, o),
                t({ provide: Ap, useValue: o, multi: !0 }, o),
                t({ provide: Fa, useValue: () => le(o), multi: !0 }, o);
            }
            const d = i.providers;
            if (null != d && !u) {
              const f = e;
              iu(d, (p) => {
                t(p, f);
              });
            }
          }
        }
        return o !== e && void 0 !== e.providers;
      }
      function iu(e, t) {
        for (let n of e)
          $r(n) && (n = n.ɵproviders), Array.isArray(n) ? iu(n, t) : t(n);
      }
      const w0 = ce({ provide: String, useValue: ce });
      function au(e) {
        return null !== e && 'object' == typeof e && w0 in e;
      }
      function Kr(e) {
        return 'function' == typeof e;
      }
      const cu = new Z('Set Injector scope.'),
        ja = {},
        b0 = {};
      let lu;
      function Ha() {
        return void 0 === lu && (lu = new ou()), lu;
      }
      class On {}
      class Va extends On {
        get destroyed() {
          return this._destroyed;
        }
        constructor(t, n, r, o) {
          super(),
            (this.parent = n),
            (this.source = r),
            (this.scopes = o),
            (this.records = new Map()),
            (this._ngOnDestroyHooks = new Set()),
            (this._onDestroyHooks = []),
            (this._destroyed = !1),
            du(t, (a) => this.processProvider(a)),
            this.records.set(Tp, Jo(void 0, this)),
            o.has('environment') && this.records.set(On, Jo(void 0, this));
          const i = this.records.get(cu);
          null != i && 'string' == typeof i.value && this.scopes.add(i.value),
            (this.injectorDefTypes = new Set(this.get(Ap.multi, Ee, he.Self)));
        }
        destroy() {
          this.assertNotDestroyed(), (this._destroyed = !0);
          try {
            for (const n of this._ngOnDestroyHooks) n.ngOnDestroy();
            const t = this._onDestroyHooks;
            this._onDestroyHooks = [];
            for (const n of t) n();
          } finally {
            this.records.clear(),
              this._ngOnDestroyHooks.clear(),
              this.injectorDefTypes.clear();
          }
        }
        onDestroy(t) {
          return (
            this.assertNotDestroyed(),
            this._onDestroyHooks.push(t),
            () => this.removeOnDestroy(t)
          );
        }
        runInContext(t) {
          this.assertNotDestroyed();
          const n = hr(this),
            r = Lt(void 0);
          try {
            return t();
          } finally {
            hr(n), Lt(r);
          }
        }
        get(t, n = Ps, r = he.Default) {
          if ((this.assertNotDestroyed(), t.hasOwnProperty(I_)))
            return t[I_](this);
          r = Qi(r);
          const i = hr(this),
            a = Lt(void 0);
          try {
            if (!(r & he.SkipSelf)) {
              let d = this.records.get(t);
              if (void 0 === d) {
                const f =
                  (function I0(e) {
                    return (
                      'function' == typeof e ||
                      ('object' == typeof e && e instanceof Z)
                    );
                  })(t) && Ji(t);
                (d = f && this.injectableDefInScope(f) ? Jo(uu(t), ja) : null),
                  this.records.set(t, d);
              }
              if (null != d) return this.hydrate(t, d);
            }
            return (r & he.Self ? Ha() : this.parent).get(
              t,
              (n = r & he.Optional && n === Ps ? null : n)
            );
          } catch (u) {
            if ('NullInjectorError' === u.name) {
              if (((u[Yi] = u[Yi] || []).unshift(Pe(t)), i)) throw u;
              return (function vb(e, t, n, r) {
                const o = e[Yi];
                throw (
                  (t[D_] && o.unshift(t[D_]),
                  (e.message = (function Db(e, t, n, r = null) {
                    e =
                      e && '\n' === e.charAt(0) && '\u0275' == e.charAt(1)
                        ? e.slice(2)
                        : e;
                    let o = Pe(t);
                    if (Array.isArray(t)) o = t.map(Pe).join(' -> ');
                    else if ('object' == typeof t) {
                      let i = [];
                      for (let a in t)
                        if (t.hasOwnProperty(a)) {
                          let u = t[a];
                          i.push(
                            a +
                              ':' +
                              ('string' == typeof u ? JSON.stringify(u) : Pe(u))
                          );
                        }
                      o = `{${i.join(', ')}}`;
                    }
                    return `${n}${r ? '(' + r + ')' : ''}[${o}]: ${e.replace(
                      hb,
                      '\n  '
                    )}`;
                  })('\n' + e.message, o, n, r)),
                  (e.ngTokenPath = o),
                  (e[Yi] = null),
                  e)
                );
              })(u, t, 'R3InjectorError', this.source);
            }
            throw u;
          } finally {
            Lt(a), hr(i);
          }
        }
        resolveInjectorInitializers() {
          const t = hr(this),
            n = Lt(void 0);
          try {
            const o = this.get(Fa.multi, Ee, he.Self);
            for (const i of o) i();
          } finally {
            hr(t), Lt(n);
          }
        }
        toString() {
          const t = [],
            n = this.records;
          for (const r of n.keys()) t.push(Pe(r));
          return `R3Injector[${t.join(', ')}]`;
        }
        assertNotDestroyed() {
          if (this._destroyed) throw new U(205, !1);
        }
        processProvider(t) {
          let n = Kr((t = K(t))) ? t : K(t && t.provide);
          const r = (function D0(e) {
            return au(e) ? Jo(void 0, e.useValue) : Jo(Fp(e), ja);
          })(t);
          if (Kr(t) || !0 !== t.multi) this.records.get(n);
          else {
            let o = this.records.get(n);
            o ||
              ((o = Jo(void 0, ja, !0)),
              (o.factory = () => tl(o.multi)),
              this.records.set(n, o)),
              (n = t),
              o.multi.push(t);
          }
          this.records.set(n, r);
        }
        hydrate(t, n) {
          return (
            n.value === ja && ((n.value = b0), (n.value = n.factory())),
            'object' == typeof n.value &&
              n.value &&
              (function C0(e) {
                return (
                  null !== e &&
                  'object' == typeof e &&
                  'function' == typeof e.ngOnDestroy
                );
              })(n.value) &&
              this._ngOnDestroyHooks.add(n.value),
            n.value
          );
        }
        injectableDefInScope(t) {
          if (!t.providedIn) return !1;
          const n = K(t.providedIn);
          return 'string' == typeof n
            ? 'any' === n || this.scopes.has(n)
            : this.injectorDefTypes.has(n);
        }
        removeOnDestroy(t) {
          const n = this._onDestroyHooks.indexOf(t);
          -1 !== n && this._onDestroyHooks.splice(n, 1);
        }
      }
      function uu(e) {
        const t = Ji(e),
          n = null !== t ? t.factory : Gr(e);
        if (null !== n) return n;
        if (e instanceof Z) throw new U(204, !1);
        if (e instanceof Function)
          return (function v0(e) {
            const t = e.length;
            if (t > 0)
              throw (
                ((function Ys(e, t) {
                  const n = [];
                  for (let r = 0; r < e; r++) n.push(t);
                  return n;
                })(t, '?'),
                new U(204, !1))
              );
            const n = (function _b(e) {
              return (e && (e[Ki] || e[w_])) || null;
            })(e);
            return null !== n ? () => n.factory(e) : () => new e();
          })(e);
        throw new U(204, !1);
      }
      function Fp(e, t, n) {
        let r;
        if (Kr(e)) {
          const o = K(e);
          return Gr(o) || uu(o);
        }
        if (au(e)) r = () => K(e.useValue);
        else if (
          (function Op(e) {
            return !(!e || !e.useFactory);
          })(e)
        )
          r = () => e.useFactory(...tl(e.deps || []));
        else if (
          (function Pp(e) {
            return !(!e || !e.useExisting);
          })(e)
        )
          r = () => le(K(e.useExisting));
        else {
          const o = K(e && (e.useClass || e.provide));
          if (
            !(function E0(e) {
              return !!e.deps;
            })(e)
          )
            return Gr(o) || uu(o);
          r = () => new o(...tl(e.deps));
        }
        return r;
      }
      function Jo(e, t, n = !1) {
        return { factory: e, value: t, multi: n ? [] : void 0 };
      }
      function du(e, t) {
        for (const n of e)
          Array.isArray(n) ? du(n, t) : n && $r(n) ? du(n.ɵproviders, t) : t(n);
      }
      const _u = new Z('AppId', { providedIn: 'root', factory: () => S0 }),
        S0 = 'ng',
        Lp = new Z('Platform Initializer'),
        Yr = new Z('Platform ID', {
          providedIn: 'platform',
          factory: () => 'unknown',
        }),
        jp = new Z('CSP nonce', {
          providedIn: 'root',
          factory: () =>
            Go()
              .body?.querySelector('[ngCspNonce]')
              ?.getAttribute('ngCspNonce') || null,
        });
      let Vp = (e, t, n) => null;
      function yu(e, t, n = !1) {
        return Vp(e, t, n);
      }
      class F0 {}
      class Up {}
      class j0 {
        resolveComponentFactory(t) {
          throw (function L0(e) {
            const t = Error(`No component factory found for ${Pe(e)}.`);
            return (t.ngComponent = e), t;
          })(t);
        }
      }
      let Ga = (() => {
        class t {}
        return (t.NULL = new j0()), t;
      })();
      function H0() {
        return Ko(dt(), F());
      }
      function Ko(e, t) {
        return new Qr(Bt(e, t));
      }
      let Qr = (() => {
        class t {
          constructor(r) {
            this.nativeElement = r;
          }
        }
        return (t.__NG_ELEMENT_ID__ = H0), t;
      })();
      function V0(e) {
        return e instanceof Qr ? e.nativeElement : e;
      }
      class zp {}
      let $0 = (() => {
        var e;
        class t {}
        return (
          ((e = t).ɵprov = ve({
            token: e,
            providedIn: 'root',
            factory: () => null,
          })),
          t
        );
      })();
      class Du {
        constructor(t) {
          (this.full = t),
            (this.major = t.split('.')[0]),
            (this.minor = t.split('.')[1]),
            (this.patch = t.split('.').slice(2).join('.'));
        }
      }
      const U0 = new Du('16.2.2'),
        Eu = {};
      function Kp(e, t = null, n = null, r) {
        const o = (function Yp(e, t = null, n = null, r, o = new Set()) {
          const i = [n || Ee, Np(e)];
          return (
            (r = r || ('object' == typeof e ? void 0 : Pe(e))),
            new Va(i, t || Ha(), r || null, o)
          );
        })(e, t, n, r);
        return o.resolveInjectorInitializers(), o;
      }
      let Fn = (() => {
          var e;
          class t {
            static create(r, o) {
              if (Array.isArray(r)) return Kp({ name: '' }, o, r, '');
              {
                const i = r.name ?? '';
                return Kp({ name: i }, r.parent, r.providers, i);
              }
            }
          }
          return (
            ((e = t).THROW_IF_NOT_FOUND = Ps),
            (e.NULL = new ou()),
            (e.ɵprov = ve({
              token: e,
              providedIn: 'any',
              factory: () => le(Tp),
            })),
            (e.__NG_ELEMENT_ID__ = -1),
            t
          );
        })(),
        Su = (() => {
          var e;
          class t {
            constructor() {
              (this.callbacks = new Set()),
                (this.deferredCallbacks = new Set()),
                (this.renderDepth = 0),
                (this.runningCallbacks = !1);
            }
            begin() {
              if (this.runningCallbacks) throw new U(102, !1);
              this.renderDepth++;
            }
            end() {
              if ((this.renderDepth--, 0 === this.renderDepth))
                try {
                  this.runningCallbacks = !0;
                  for (const r of this.callbacks) r.invoke();
                } finally {
                  this.runningCallbacks = !1;
                  for (const r of this.deferredCallbacks) this.callbacks.add(r);
                  this.deferredCallbacks.clear();
                }
            }
            register(r) {
              (this.runningCallbacks
                ? this.deferredCallbacks
                : this.callbacks
              ).add(r);
            }
            unregister(r) {
              this.callbacks.delete(r), this.deferredCallbacks.delete(r);
            }
            ngOnDestroy() {
              this.callbacks.clear(), this.deferredCallbacks.clear();
            }
          }
          return (
            ((e = t).ɵprov = ve({
              token: e,
              providedIn: 'root',
              factory: () => new e(),
            })),
            t
          );
        })();
      function li(e) {
        for (; e; ) {
          e[se] |= 64;
          const t = ei(e);
          if (cl(e) && !t) return e;
          e = t;
        }
        return null;
      }
      function Mu(e) {
        return e.ngOriginalError;
      }
      class Xr {
        constructor() {
          this._console = console;
        }
        handleError(t) {
          const n = this._findOriginalError(t);
          this._console.error('ERROR', t),
            n && this._console.error('ORIGINAL ERROR', n);
        }
        _findOriginalError(t) {
          let n = t && Mu(t);
          for (; n && Mu(n); ) n = Mu(n);
          return n || null;
        }
      }
      const ng = new Z('', { providedIn: 'root', factory: () => !1 });
      class ig extends q_ {
        constructor() {
          super(...arguments),
            (this.consumerAllowSignalWrites = !1),
            (this._lView = null);
        }
        set lView(t) {
          this._lView = t;
        }
        onConsumerDependencyMayHaveChanged() {
          li(this._lView);
        }
        onProducerUpdateValueVersion() {}
        get hasReadASignal() {
          return this.hasProducers;
        }
        runInContext(t, n, r) {
          const o = it(this);
          this.trackingVersion++;
          try {
            t(n, r);
          } finally {
            it(o);
          }
        }
        destroy() {
          this.trackingVersion++;
        }
      }
      let Ja = null;
      function ag() {
        return (Ja ??= new ig()), Ja;
      }
      function cg(e, t) {
        return e[t] ?? ag();
      }
      function lg(e, t) {
        const n = ag();
        n.hasReadASignal && ((e[t] = Ja), (n.lView = e), (Ja = new ig()));
      }
      const ie = {};
      function j(e) {
        ug(ye(), F(), At() + e, !1);
      }
      function ug(e, t, n, r) {
        if (!r)
          if (3 == (3 & t[se])) {
            const i = e.preOrderCheckHooks;
            null !== i && fa(t, i, n);
          } else {
            const i = e.preOrderHooks;
            null !== i && pa(t, i, 0, n);
          }
        Wr(n);
      }
      function ne(e, t = he.Default) {
        const n = F();
        return null === n ? le(e, t) : Mf(dt(), n, K(e), t);
      }
      function Za(e, t, n, r, o, i, a, u, d, f, p) {
        const m = t.blueprint.slice();
        return (
          (m[Je] = o),
          (m[se] = 140 | r),
          (null !== f || (e && 2048 & e[se])) && (m[se] |= 2048),
          ef(m),
          (m[qe] = m[ko] = e),
          (m[Ze] = n),
          (m[Mo] = a || (e && e[Mo])),
          (m[re] = u || (e && e[re])),
          (m[mr] = d || (e && e[mr]) || null),
          (m[yt] = i),
          (m[$s] = (function yD() {
            return wD++;
          })()),
          (m[Kn] = p),
          (m[j_] = f),
          (m[Ke] = 2 == t.type ? e[Ke] : m),
          m
        );
      }
      function Xo(e, t, n, r, o) {
        let i = e.data[t];
        if (null === i)
          (i = (function ku(e, t, n, r, o) {
            const i = cf(),
              a = pl(),
              d = (e.data[t] = (function fE(e, t, n, r, o, i) {
                let a = t ? t.injectorIndex : -1,
                  u = 0;
                return (
                  (function xo() {
                    return null !== X.skipHydrationRootTNode;
                  })() && (u |= 128),
                  {
                    type: n,
                    index: r,
                    insertBeforeIndex: null,
                    injectorIndex: a,
                    directiveStart: -1,
                    directiveEnd: -1,
                    directiveStylingLast: -1,
                    componentOffset: -1,
                    propertyBindings: null,
                    flags: u,
                    providerIndexes: 0,
                    value: o,
                    attrs: i,
                    mergedAttrs: null,
                    localNames: null,
                    initialInputs: void 0,
                    inputs: null,
                    outputs: null,
                    tView: null,
                    next: null,
                    prev: null,
                    projectionNext: null,
                    child: null,
                    parent: t,
                    projection: null,
                    styles: null,
                    stylesWithoutHost: null,
                    residualStyles: void 0,
                    classes: null,
                    classesWithoutHost: null,
                    residualClasses: void 0,
                    classBindings: 0,
                    styleBindings: 0,
                  }
                );
              })(0, a ? i : i && i.parent, n, t, r, o));
            return (
              null === e.firstChild && (e.firstChild = d),
              null !== i &&
                (a
                  ? null == i.child && null !== d.parent && (i.child = d)
                  : null === i.next && ((i.next = d), (d.prev = i))),
              d
            );
          })(e, t, n, r, o)),
            (function yv() {
              return X.lFrame.inI18n;
            })() && (i.flags |= 32);
        else if (64 & i.type) {
          (i.type = n), (i.value = r), (i.attrs = o);
          const a = (function qs() {
            const e = X.lFrame,
              t = e.currentTNode;
            return e.isParent ? t : t.parent;
          })();
          i.injectorIndex = null === a ? -1 : a.injectorIndex;
        }
        return Rn(i, !0), i;
      }
      function ui(e, t, n, r) {
        if (0 === n) return -1;
        const o = t.length;
        for (let i = 0; i < n; i++)
          t.push(r), e.blueprint.push(r), e.data.push(null);
        return o;
      }
      function dg(e, t, n, r, o) {
        const i = cg(t, na),
          a = At(),
          u = 2 & r;
        try {
          if (
            (Wr(-1),
            u && t.length > ge && ug(e, t, ge, !1),
            xn(u ? 2 : 0, o),
            u)
          )
            i.runInContext(n, r, o);
          else {
            const f = it(null);
            try {
              n(r, o);
            } finally {
              it(f);
            }
          }
        } finally {
          u && null === t[na] && lg(t, na), Wr(a), xn(u ? 3 : 1, o);
        }
      }
      function Tu(e, t, n) {
        if (al(t)) {
          const r = it(null);
          try {
            const i = t.directiveEnd;
            for (let a = t.directiveStart; a < i; a++) {
              const u = e.data[a];
              u.contentQueries && u.contentQueries(1, n[a], a);
            }
          } finally {
            it(r);
          }
        }
      }
      function Au(e, t, n) {
        af() &&
          ((function bE(e, t, n, r) {
            const o = n.directiveStart,
              i = n.directiveEnd;
            zr(n) &&
              (function ME(e, t, n) {
                const r = Bt(t, e),
                  o = _g(n);
                let a = 16;
                n.signals ? (a = 4096) : n.onPush && (a = 64);
                const u = Ka(
                  e,
                  Za(
                    e,
                    o,
                    null,
                    a,
                    r,
                    t,
                    null,
                    e[Mo].rendererFactory.createRenderer(r, n),
                    null,
                    null,
                    null
                  )
                );
                e[t.index] = u;
              })(t, n, e.data[o + n.componentOffset]),
              e.firstCreatePass || ha(n, t),
              Dt(r, t);
            const a = n.initialInputs;
            for (let u = o; u < i; u++) {
              const d = e.data[u],
                f = Jr(t, e, u, n);
              Dt(f, t),
                null !== a && kE(0, u - o, f, d, 0, a),
                wn(d) && (Qt(n.index, t)[Ze] = Jr(t, e, u, n));
            }
          })(e, t, n, Bt(n, t)),
          64 == (64 & n.flags) && mg(e, t, n));
      }
      function Nu(e, t, n = Bt) {
        const r = t.localNames;
        if (null !== r) {
          let o = t.index + 1;
          for (let i = 0; i < r.length; i += 2) {
            const a = r[i + 1],
              u = -1 === a ? n(t, e) : e[a];
            e[o++] = u;
          }
        }
      }
      function _g(e) {
        const t = e.tView;
        return null === t || t.incompleteFirstPass
          ? (e.tView = xu(
              1,
              null,
              e.template,
              e.decls,
              e.vars,
              e.directiveDefs,
              e.pipeDefs,
              e.viewQuery,
              e.schemas,
              e.consts,
              e.id
            ))
          : t;
      }
      function xu(e, t, n, r, o, i, a, u, d, f, p) {
        const m = ge + r,
          w = m + o,
          b = (function aE(e, t) {
            const n = [];
            for (let r = 0; r < t; r++) n.push(r < e ? null : ie);
            return n;
          })(m, w),
          C = 'function' == typeof f ? f() : f;
        return (b[q] = {
          type: e,
          blueprint: b,
          template: n,
          queries: null,
          viewQuery: u,
          declTNode: t,
          data: b.slice().fill(null, m),
          bindingStartIndex: m,
          expandoStartIndex: w,
          hostBindingOpCodes: null,
          firstCreatePass: !0,
          firstUpdatePass: !0,
          staticViewQueries: !1,
          staticContentQueries: !1,
          preOrderHooks: null,
          preOrderCheckHooks: null,
          contentHooks: null,
          contentCheckHooks: null,
          viewHooks: null,
          viewCheckHooks: null,
          destroyHooks: null,
          cleanup: null,
          contentQueries: null,
          components: null,
          directiveRegistry: 'function' == typeof i ? i() : i,
          pipeRegistry: 'function' == typeof a ? a() : a,
          firstChild: null,
          schemas: d,
          consts: C,
          incompleteFirstPass: !1,
          ssrId: p,
        });
      }
      let fg = (e) => null;
      function pg(e, t, n, r) {
        for (let o in e)
          if (e.hasOwnProperty(o)) {
            n = null === n ? {} : n;
            const i = e[o];
            null === r
              ? gg(n, t, o, i)
              : r.hasOwnProperty(o) && gg(n, t, r[o], i);
          }
        return n;
      }
      function gg(e, t, n, r) {
        e.hasOwnProperty(n) ? e[n].push(t, r) : (e[n] = [t, r]);
      }
      function en(e, t, n, r, o, i, a, u) {
        const d = Bt(t, n);
        let p,
          f = t.inputs;
        !u && null != f && (p = f[r])
          ? (Lu(e, n, p, r, o),
            zr(t) &&
              (function hE(e, t) {
                const n = Qt(t, e);
                16 & n[se] || (n[se] |= 64);
              })(n, t.index))
          : 3 & t.type &&
            ((r = (function gE(e) {
              return 'class' === e
                ? 'className'
                : 'for' === e
                ? 'htmlFor'
                : 'formaction' === e
                ? 'formAction'
                : 'innerHtml' === e
                ? 'innerHTML'
                : 'readonly' === e
                ? 'readOnly'
                : 'tabindex' === e
                ? 'tabIndex'
                : e;
            })(r)),
            (o = null != a ? a(o, t.value || '', r) : o),
            i.setProperty(d, r, o));
      }
      function Ru(e, t, n, r) {
        if (af()) {
          const o = null === r ? null : { '': -1 },
            i = (function DE(e, t) {
              const n = e.directiveRegistry;
              let r = null,
                o = null;
              if (n)
                for (let i = 0; i < n.length; i++) {
                  const a = n[i];
                  if (x_(t, a.selectors, !1))
                    if ((r || (r = []), wn(a)))
                      if (null !== a.findHostDirectiveDefs) {
                        const u = [];
                        (o = o || new Map()),
                          a.findHostDirectiveDefs(a, u, o),
                          r.unshift(...u, a),
                          Pu(e, t, u.length);
                      } else r.unshift(a), Pu(e, t, 0);
                    else
                      (o = o || new Map()),
                        a.findHostDirectiveDefs?.(a, r, o),
                        r.push(a);
                }
              return null === r ? null : [r, o];
            })(e, n);
          let a, u;
          null === i ? (a = u = null) : ([a, u] = i),
            null !== a && hg(e, t, n, a, o, u),
            o &&
              (function EE(e, t, n) {
                if (t) {
                  const r = (e.localNames = []);
                  for (let o = 0; o < t.length; o += 2) {
                    const i = n[t[o + 1]];
                    if (null == i) throw new U(-301, !1);
                    r.push(t[o], i);
                  }
                }
              })(n, r, o);
        }
        n.mergedAttrs = Ls(n.mergedAttrs, n.attrs);
      }
      function hg(e, t, n, r, o, i) {
        for (let f = 0; f < r.length; f++) Ml(ha(n, t), e, r[f].type);
        !(function IE(e, t, n) {
          (e.flags |= 1),
            (e.directiveStart = t),
            (e.directiveEnd = t + n),
            (e.providerIndexes = t);
        })(n, e.data.length, r.length);
        for (let f = 0; f < r.length; f++) {
          const p = r[f];
          p.providersResolver && p.providersResolver(p);
        }
        let a = !1,
          u = !1,
          d = ui(e, t, r.length, null);
        for (let f = 0; f < r.length; f++) {
          const p = r[f];
          (n.mergedAttrs = Ls(n.mergedAttrs, p.hostAttrs)),
            SE(e, n, t, d, p),
            CE(d, p, o),
            null !== p.contentQueries && (n.flags |= 4),
            (null !== p.hostBindings ||
              null !== p.hostAttrs ||
              0 !== p.hostVars) &&
              (n.flags |= 64);
          const m = p.type.prototype;
          !a &&
            (m.ngOnChanges || m.ngOnInit || m.ngDoCheck) &&
            ((e.preOrderHooks ??= []).push(n.index), (a = !0)),
            !u &&
              (m.ngOnChanges || m.ngDoCheck) &&
              ((e.preOrderCheckHooks ??= []).push(n.index), (u = !0)),
            d++;
        }
        !(function pE(e, t, n) {
          const o = t.directiveEnd,
            i = e.data,
            a = t.attrs,
            u = [];
          let d = null,
            f = null;
          for (let p = t.directiveStart; p < o; p++) {
            const m = i[p],
              w = n ? n.get(m) : null,
              C = w ? w.outputs : null;
            (d = pg(m.inputs, p, d, w ? w.inputs : null)),
              (f = pg(m.outputs, p, f, C));
            const T = null === d || null === a || N_(t) ? null : TE(d, p, a);
            u.push(T);
          }
          null !== d &&
            (d.hasOwnProperty('class') && (t.flags |= 8),
            d.hasOwnProperty('style') && (t.flags |= 16)),
            (t.initialInputs = u),
            (t.inputs = d),
            (t.outputs = f);
        })(e, n, i);
      }
      function mg(e, t, n) {
        const r = n.directiveStart,
          o = n.directiveEnd,
          i = n.index,
          a = (function vv() {
            return X.lFrame.currentDirectiveIndex;
          })();
        try {
          Wr(i);
          for (let u = r; u < o; u++) {
            const d = e.data[u],
              f = t[u];
            hl(u),
              (null !== d.hostBindings ||
                0 !== d.hostVars ||
                null !== d.hostAttrs) &&
                vE(d, f);
          }
        } finally {
          Wr(-1), hl(a);
        }
      }
      function vE(e, t) {
        null !== e.hostBindings && e.hostBindings(1, t);
      }
      function Pu(e, t, n) {
        (t.componentOffset = n), (e.components ??= []).push(t.index);
      }
      function CE(e, t, n) {
        if (n) {
          if (t.exportAs)
            for (let r = 0; r < t.exportAs.length; r++) n[t.exportAs[r]] = e;
          wn(t) && (n[''] = e);
        }
      }
      function SE(e, t, n, r, o) {
        e.data[r] = o;
        const i = o.factory || (o.factory = Gr(o.type)),
          a = new Gs(i, wn(o), ne);
        (e.blueprint[r] = a),
          (n[r] = a),
          (function wE(e, t, n, r, o) {
            const i = o.hostBindings;
            if (i) {
              let a = e.hostBindingOpCodes;
              null === a && (a = e.hostBindingOpCodes = []);
              const u = ~t.index;
              (function yE(e) {
                let t = e.length;
                for (; t > 0; ) {
                  const n = e[--t];
                  if ('number' == typeof n && n < 0) return n;
                }
                return 0;
              })(a) != u && a.push(u),
                a.push(n, r, i);
            }
          })(e, t, r, ui(e, n, o.hostVars, ie), o);
      }
      function kE(e, t, n, r, o, i) {
        const a = i[t];
        if (null !== a)
          for (let u = 0; u < a.length; ) wg(r, n, a[u++], a[u++], a[u++]);
      }
      function wg(e, t, n, r, o) {
        const i = it(null);
        try {
          const a = e.inputTransforms;
          null !== a && a.hasOwnProperty(r) && (o = a[r].call(t, o)),
            null !== e.setInput ? e.setInput(t, o, n, r) : (t[r] = o);
        } finally {
          it(i);
        }
      }
      function TE(e, t, n) {
        let r = null,
          o = 0;
        for (; o < n.length; ) {
          const i = n[o];
          if (0 !== i)
            if (5 !== i) {
              if ('number' == typeof i) break;
              if (e.hasOwnProperty(i)) {
                null === r && (r = []);
                const a = e[i];
                for (let u = 0; u < a.length; u += 2)
                  if (a[u] === t) {
                    r.push(i, a[u + 1], n[o + 1]);
                    break;
                  }
              }
              o += 2;
            } else o += 2;
          else o += 4;
        }
        return r;
      }
      function yg(e, t, n, r) {
        return [e, !0, !1, t, null, 0, r, n, null, null, null];
      }
      function bg(e, t) {
        const n = e.contentQueries;
        if (null !== n)
          for (let r = 0; r < n.length; r += 2) {
            const i = n[r + 1];
            if (-1 !== i) {
              const a = e.data[i];
              wl(n[r]), a.contentQueries(2, t[i], i);
            }
          }
      }
      function Ka(e, t) {
        return e[Vs] ? (e[L_][mn] = t) : (e[Vs] = t), (e[L_] = t), t;
      }
      function Fu(e, t, n) {
        wl(0);
        const r = it(null);
        try {
          t(e, n);
        } finally {
          it(r);
        }
      }
      function vg(e) {
        return e[So] || (e[So] = []);
      }
      function Dg(e) {
        return e.cleanup || (e.cleanup = []);
      }
      function Cg(e, t) {
        const n = e[mr],
          r = n ? n.get(Xr, null) : null;
        r && r.handleError(t);
      }
      function Lu(e, t, n, r, o) {
        for (let i = 0; i < n.length; ) {
          const a = n[i++],
            u = n[i++];
          wg(e.data[a], t[a], r, u, o);
        }
      }
      function tr(e, t, n) {
        const r = (function ua(e, t) {
          return je(t[e]);
        })(t, e);
        !(function rp(e, t, n) {
          e.setValue(t, n);
        })(e[re], r, n);
      }
      function AE(e, t) {
        const n = Qt(t, e),
          r = n[q];
        !(function NE(e, t) {
          for (let n = t.length; n < e.blueprint.length; n++)
            t.push(e.blueprint[n]);
        })(r, n);
        const o = n[Je];
        null !== o && null === n[Kn] && (n[Kn] = yu(o, n[mr])), ju(r, n, n[Ze]);
      }
      function ju(e, t, n) {
        yl(t);
        try {
          const r = e.viewQuery;
          null !== r && Fu(1, r, n);
          const o = e.template;
          null !== o && dg(e, t, o, 1, n),
            e.firstCreatePass && (e.firstCreatePass = !1),
            e.staticContentQueries && bg(e, t),
            e.staticViewQueries && Fu(2, e.viewQuery, n);
          const i = e.components;
          null !== i &&
            (function xE(e, t) {
              for (let n = 0; n < t.length; n++) AE(e, t[n]);
            })(t, i);
        } catch (r) {
          throw (
            (e.firstCreatePass &&
              ((e.incompleteFirstPass = !0), (e.firstCreatePass = !1)),
            r)
          );
        } finally {
          (t[se] &= -5), bl();
        }
      }
      let Ig = (() => {
        var e;
        class t {
          constructor() {
            (this.all = new Set()), (this.queue = new Map());
          }
          create(r, o, i) {
            const a = typeof Zone > 'u' ? null : Zone.current,
              u = new Yb(
                r,
                (p) => {
                  this.all.has(p) && this.queue.set(p, a);
                },
                i
              );
            let d;
            this.all.add(u), u.notify();
            const f = () => {
              u.cleanup(), d?.(), this.all.delete(u), this.queue.delete(u);
            };
            return (d = o?.onDestroy(f)), { destroy: f };
          }
          flush() {
            if (0 !== this.queue.size)
              for (const [r, o] of this.queue)
                this.queue.delete(r), o ? o.run(() => r.run()) : r.run();
          }
          get isQueueEmpty() {
            return 0 === this.queue.size;
          }
        }
        return (
          ((e = t).ɵprov = ve({
            token: e,
            providedIn: 'root',
            factory: () => new e(),
          })),
          t
        );
      })();
      function Ya(e, t, n) {
        let r = n ? e.styles : null,
          o = n ? e.classes : null,
          i = 0;
        if (null !== t)
          for (let a = 0; a < t.length; a++) {
            const u = t[a];
            'number' == typeof u
              ? (i = u)
              : 1 == i
              ? (o = Gn(o, u))
              : 2 == i && (r = Gn(r, u + ': ' + t[++a] + ';'));
          }
        n ? (e.styles = r) : (e.stylesWithoutHost = r),
          n ? (e.classes = o) : (e.classesWithoutHost = o);
      }
      function di(e, t, n, r, o = !1) {
        for (; null !== n; ) {
          const i = t[n.index];
          if ((null !== i && r.push(je(i)), Vt(i))) {
            for (let u = ut; u < i.length; u++) {
              const d = i[u],
                f = d[q].firstChild;
              null !== f && di(d[q], d, f, r);
            }
            i[An] !== i[Je] && r.push(i[An]);
          }
          const a = n.type;
          if (8 & a) di(e, t, n.child, r);
          else if (32 & a) {
            const u = $l(n, t);
            let d;
            for (; (d = u()); ) r.push(d);
          } else if (16 & a) {
            const u = _p(t, n);
            if (Array.isArray(u)) r.push(...u);
            else {
              const d = ei(t[Ke]);
              di(d[q], d, u, r, !0);
            }
          }
          n = o ? n.projectionNext : n.next;
        }
        return r;
      }
      function Qa(e, t, n, r = !0) {
        const o = t[Mo],
          i = o.rendererFactory,
          a = o.afterRenderEventManager;
        i.begin?.(), a?.begin();
        try {
          Sg(e, t, e.template, n);
        } catch (d) {
          throw (r && Cg(t, d), d);
        } finally {
          i.end?.(), o.effectManager?.flush(), a?.end();
        }
      }
      function Sg(e, t, n, r) {
        const o = t[se];
        if (256 != (256 & o)) {
          t[Mo].effectManager?.flush(), yl(t);
          try {
            ef(t),
              (function uf(e) {
                return (X.lFrame.bindingIndex = e);
              })(e.bindingStartIndex),
              null !== n && dg(e, t, n, 2, r);
            const a = 3 == (3 & o);
            if (a) {
              const f = e.preOrderCheckHooks;
              null !== f && fa(t, f, null);
            } else {
              const f = e.preOrderHooks;
              null !== f && pa(t, f, 0, null), Dl(t, 0);
            }
            if (
              ((function OE(e) {
                for (let t = ep(e); null !== t; t = tp(t)) {
                  if (!t[H_]) continue;
                  const n = t[Ao];
                  for (let r = 0; r < n.length; r++) {
                    cv(n[r]);
                  }
                }
              })(t),
              Mg(t, 2),
              null !== e.contentQueries && bg(e, t),
              a)
            ) {
              const f = e.contentCheckHooks;
              null !== f && fa(t, f);
            } else {
              const f = e.contentHooks;
              null !== f && pa(t, f, 1), Dl(t, 1);
            }
            !(function iE(e, t) {
              const n = e.hostBindingOpCodes;
              if (null === n) return;
              const r = cg(t, ra);
              try {
                for (let o = 0; o < n.length; o++) {
                  const i = n[o];
                  if (i < 0) Wr(~i);
                  else {
                    const a = i,
                      u = n[++o],
                      d = n[++o];
                    bv(u, a), r.runInContext(d, 2, t[a]);
                  }
                }
              } finally {
                null === t[ra] && lg(t, ra), Wr(-1);
              }
            })(e, t);
            const u = e.components;
            null !== u && Tg(t, u, 0);
            const d = e.viewQuery;
            if ((null !== d && Fu(2, d, r), a)) {
              const f = e.viewCheckHooks;
              null !== f && fa(t, f);
            } else {
              const f = e.viewHooks;
              null !== f && pa(t, f, 2), Dl(t, 2);
            }
            !0 === e.firstUpdatePass && (e.firstUpdatePass = !1),
              (t[se] &= -73),
              tf(t);
          } finally {
            bl();
          }
        }
      }
      function Mg(e, t) {
        for (let n = ep(e); null !== n; n = tp(n))
          for (let r = ut; r < n.length; r++) kg(n[r], t);
      }
      function FE(e, t, n) {
        kg(Qt(t, e), n);
      }
      function kg(e, t) {
        if (
          !(function iv(e) {
            return 128 == (128 & e[se]);
          })(e)
        )
          return;
        const n = e[q];
        if ((80 & e[se] && 0 === t) || 1024 & e[se] || 2 === t)
          Sg(n, e, n.template, e[Ze]);
        else if (e[Hs] > 0) {
          Mg(e, 1);
          const o = e[q].components;
          null !== o && Tg(e, o, 1);
        }
      }
      function Tg(e, t, n) {
        for (let r = 0; r < t.length; r++) FE(e, t[r], n);
      }
      class _i {
        get rootNodes() {
          const t = this._lView,
            n = t[q];
          return di(n, t, n.firstChild, []);
        }
        constructor(t, n) {
          (this._lView = t),
            (this._cdRefInjectingView = n),
            (this._appRef = null),
            (this._attachedToViewContainer = !1);
        }
        get context() {
          return this._lView[Ze];
        }
        set context(t) {
          this._lView[Ze] = t;
        }
        get destroyed() {
          return 256 == (256 & this._lView[se]);
        }
        destroy() {
          if (this._appRef) this._appRef.detachView(this);
          else if (this._attachedToViewContainer) {
            const t = this._lView[qe];
            if (Vt(t)) {
              const n = t[8],
                r = n ? n.indexOf(this) : -1;
              r > -1 && (Ta(t, r), ya(n, r));
            }
            this._attachedToViewContainer = !1;
          }
          ql(this._lView[q], this._lView);
        }
        onDestroy(t) {
          !(function rf(e, t) {
            if (256 == (256 & e[se])) throw new U(911, !1);
            null === e[wr] && (e[wr] = []), e[wr].push(t);
          })(this._lView, t);
        }
        markForCheck() {
          li(this._cdRefInjectingView || this._lView);
        }
        detach() {
          this._lView[se] &= -129;
        }
        reattach() {
          this._lView[se] |= 128;
        }
        detectChanges() {
          Qa(this._lView[q], this._lView, this.context);
        }
        checkNoChanges() {}
        attachToViewContainerRef() {
          if (this._appRef) throw new U(902, !1);
          this._attachedToViewContainer = !0;
        }
        detachFromAppRef() {
          (this._appRef = null),
            (function RD(e, t) {
              ni(e, t, t[re], 2, null, null);
            })(this._lView[q], this._lView);
        }
        attachToAppRef(t) {
          if (this._attachedToViewContainer) throw new U(902, !1);
          this._appRef = t;
        }
      }
      class LE extends _i {
        constructor(t) {
          super(t), (this._view = t);
        }
        detectChanges() {
          const t = this._view;
          Qa(t[q], t, t[Ze], !1);
        }
        checkNoChanges() {}
        get context() {
          return null;
        }
      }
      class Ag extends Ga {
        constructor(t) {
          super(), (this.ngModule = t);
        }
        resolveComponentFactory(t) {
          const n = we(t);
          return new fi(n, this.ngModule);
        }
      }
      function Ng(e) {
        const t = [];
        for (let n in e)
          e.hasOwnProperty(n) && t.push({ propName: e[n], templateName: n });
        return t;
      }
      class HE {
        constructor(t, n) {
          (this.injector = t), (this.parentInjector = n);
        }
        get(t, n, r) {
          r = Qi(r);
          const o = this.injector.get(t, Eu, r);
          return o !== Eu || n === Eu ? o : this.parentInjector.get(t, n, r);
        }
      }
      class fi extends Up {
        get inputs() {
          const t = this.componentDef,
            n = t.inputTransforms,
            r = Ng(t.inputs);
          if (null !== n)
            for (const o of r)
              n.hasOwnProperty(o.propName) && (o.transform = n[o.propName]);
          return r;
        }
        get outputs() {
          return Ng(this.componentDef.outputs);
        }
        constructor(t, n) {
          super(),
            (this.componentDef = t),
            (this.ngModule = n),
            (this.componentType = t.type),
            (this.selector = (function xb(e) {
              return e.map(Nb).join(',');
            })(t.selectors)),
            (this.ngContentSelectors = t.ngContentSelectors
              ? t.ngContentSelectors
              : []),
            (this.isBoundToModule = !!n);
        }
        create(t, n, r, o) {
          let i = (o = o || this.ngModule) instanceof On ? o : o?.injector;
          i &&
            null !== this.componentDef.getStandaloneInjector &&
            (i = this.componentDef.getStandaloneInjector(i) || i);
          const a = i ? new HE(t, i) : t,
            u = a.get(zp, null);
          if (null === u) throw new U(407, !1);
          const m = {
              rendererFactory: u,
              sanitizer: a.get($0, null),
              effectManager: a.get(Ig, null),
              afterRenderEventManager: a.get(Su, null),
            },
            w = u.createRenderer(null, this.componentDef),
            b = this.componentDef.selectors[0][0] || 'div',
            C = r
              ? (function cE(e, t, n, r) {
                  const i = r.get(ng, !1) || n === gn.ShadowDom,
                    a = e.selectRootElement(t, i);
                  return (
                    (function lE(e) {
                      fg(e);
                    })(a),
                    a
                  );
                })(w, r, this.componentDef.encapsulation, a)
              : ka(
                  w,
                  b,
                  (function jE(e) {
                    const t = e.toLowerCase();
                    return 'svg' === t ? Y_ : 'math' === t ? 'math' : null;
                  })(b)
                ),
            L = this.componentDef.signals
              ? 4608
              : this.componentDef.onPush
              ? 576
              : 528;
          let A = null;
          null !== C && (A = yu(C, a, !0));
          const G = xu(0, null, null, 1, 0, null, null, null, null, null, null),
            z = Za(null, G, null, L, null, null, m, w, a, null, A);
          let de, _t;
          yl(z);
          try {
            const nn = this.componentDef;
            let ao,
              Bc = null;
            nn.findHostDirectiveDefs
              ? ((ao = []),
                (Bc = new Map()),
                nn.findHostDirectiveDefs(nn, ao, Bc),
                ao.push(nn))
              : (ao = [nn]);
            const Zx = (function BE(e, t) {
                const n = e[q],
                  r = ge;
                return (e[r] = t), Xo(n, r, 2, '#host', null);
              })(z, C),
              Kx = (function $E(e, t, n, r, o, i, a) {
                const u = o[q];
                !(function UE(e, t, n, r) {
                  for (const o of e)
                    t.mergedAttrs = Ls(t.mergedAttrs, o.hostAttrs);
                  null !== t.mergedAttrs &&
                    (Ya(t, t.mergedAttrs, !0), null !== n && hp(r, n, t));
                })(r, e, t, a);
                let d = null;
                null !== t && (d = yu(t, o[mr]));
                const f = i.rendererFactory.createRenderer(t, n);
                let p = 16;
                n.signals ? (p = 4096) : n.onPush && (p = 64);
                const m = Za(
                  o,
                  _g(n),
                  null,
                  p,
                  o[e.index],
                  e,
                  i,
                  f,
                  null,
                  null,
                  d
                );
                return (
                  u.firstCreatePass && Pu(u, e, r.length - 1),
                  Ka(o, m),
                  (o[e.index] = m)
                );
              })(Zx, C, nn, ao, z, m, w);
            (_t = X_(G, ge)),
              C &&
                (function zE(e, t, n, r) {
                  if (r) ol(e, n, ['ng-version', U0.full]);
                  else {
                    const { attrs: o, classes: i } = (function Rb(e) {
                      const t = [],
                        n = [];
                      let r = 1,
                        o = 2;
                      for (; r < e.length; ) {
                        let i = e[r];
                        if ('string' == typeof i)
                          2 === o
                            ? '' !== i && t.push(i, e[++r])
                            : 8 === o && n.push(i);
                        else {
                          if (!hn(o)) break;
                          o = i;
                        }
                        r++;
                      }
                      return { attrs: t, classes: n };
                    })(t.selectors[0]);
                    o && ol(e, n, o),
                      i && i.length > 0 && gp(e, n, i.join(' '));
                  }
                })(w, nn, C, r),
              void 0 !== n &&
                (function GE(e, t, n) {
                  const r = (e.projection = []);
                  for (let o = 0; o < t.length; o++) {
                    const i = n[o];
                    r.push(null != i ? Array.from(i) : null);
                  }
                })(_t, this.ngContentSelectors, n),
              (de = (function qE(e, t, n, r, o, i) {
                const a = dt(),
                  u = o[q],
                  d = Bt(a, o);
                hg(u, o, a, n, null, r);
                for (let p = 0; p < n.length; p++)
                  Dt(Jr(o, u, a.directiveStart + p, a), o);
                mg(u, o, a), d && Dt(d, o);
                const f = Jr(o, u, a.directiveStart + a.componentOffset, a);
                if (((e[Ze] = o[Ze] = f), null !== i))
                  for (const p of i) p(f, t);
                return Tu(u, a, e), f;
              })(Kx, nn, ao, Bc, z, [WE])),
              ju(G, z, null);
          } finally {
            bl();
          }
          return new VE(this.componentType, de, Ko(_t, z), z, _t);
        }
      }
      class VE extends F0 {
        constructor(t, n, r, o, i) {
          super(),
            (this.location = r),
            (this._rootLView = o),
            (this._tNode = i),
            (this.previousInputValues = null),
            (this.instance = n),
            (this.hostView = this.changeDetectorRef = new LE(o)),
            (this.componentType = t);
        }
        setInput(t, n) {
          const r = this._tNode.inputs;
          let o;
          if (null !== r && (o = r[t])) {
            if (
              ((this.previousInputValues ??= new Map()),
              this.previousInputValues.has(t) &&
                Object.is(this.previousInputValues.get(t), n))
            )
              return;
            const i = this._rootLView;
            Lu(i[q], i, o, t, n),
              this.previousInputValues.set(t, n),
              li(Qt(this._tNode.index, i));
          }
        }
        get injector() {
          return new Nt(this._tNode, this._rootLView);
        }
        destroy() {
          this.hostView.destroy();
        }
        onDestroy(t) {
          this.hostView.onDestroy(t);
        }
      }
      function WE() {
        const e = dt();
        _a(F()[q], e);
      }
      function ec(e) {
        return (
          !!(function Hu(e) {
            return (
              null !== e && ('function' == typeof e || 'object' == typeof e)
            );
          })(e) &&
          (Array.isArray(e) || (!(e instanceof Map) && Symbol.iterator in e))
        );
      }
      function Et(e, t, n) {
        return !Object.is(e[t], n) && ((e[t] = n), !0);
      }
      function ts(e, t, n, r) {
        return Et(e, Ro(), n) ? t + Y(n) + r : ie;
      }
      function ns(e, t, n, r, o, i) {
        const u = (function eo(e, t, n, r) {
          const o = Et(e, t, n);
          return Et(e, t + 1, r) || o;
        })(
          e,
          (function Yn() {
            return X.lFrame.bindingIndex;
          })(),
          n,
          o
        );
        return (
          (function Qn(e) {
            const t = X.lFrame,
              n = t.bindingIndex;
            return (t.bindingIndex = t.bindingIndex + e), n;
          })(2),
          u ? t + Y(n) + r + Y(o) + i : ie
        );
      }
      function ee(e, t, n, r, o, i, a, u) {
        const d = F(),
          f = ye(),
          p = e + ge,
          m = f.firstCreatePass
            ? (function E1(e, t, n, r, o, i, a, u, d) {
                const f = t.consts,
                  p = Xo(t, e, 4, a || null, yr(f, u));
                Ru(t, n, p, yr(f, d)), _a(t, p);
                const m = (p.tView = xu(
                  2,
                  p,
                  r,
                  o,
                  i,
                  t.directiveRegistry,
                  t.pipeRegistry,
                  null,
                  t.schemas,
                  f,
                  null
                ));
                return (
                  null !== t.queries &&
                    (t.queries.template(t, p),
                    (m.queries = t.queries.embeddedTView(p))),
                  p
                );
              })(p, f, d, t, n, r, o, i, a)
            : f.data[p];
        Rn(m, !1);
        const w = Kg(f, d, m, e);
        da() && Na(f, d, w, m),
          Dt(w, d),
          Ka(d, (d[p] = yg(w, d, w, m))),
          sa(m) && Au(f, d, m),
          null != a && Nu(d, m, u);
      }
      let Kg = function Yg(e, t, n, r) {
        return br(!0), t[re].createComment('');
      };
      function un(e) {
        return (function No(e, t) {
          return e[t];
        })(
          (function wv() {
            return X.lFrame.contextLView;
          })(),
          ge + e
        );
      }
      function V(e, t, n) {
        const r = F();
        return Et(r, Ro(), t) && en(ye(), ze(), r, e, t, r[re], n, !1), V;
      }
      function zu(e, t, n, r, o) {
        const a = o ? 'class' : 'style';
        Lu(e, n, t.inputs[a], a, r);
      }
      function M(e, t, n, r) {
        const o = F(),
          i = ye(),
          a = ge + e,
          u = o[re],
          d = i.firstCreatePass
            ? (function M1(e, t, n, r, o, i) {
                const a = t.consts,
                  d = Xo(t, e, 2, r, yr(a, o));
                return (
                  Ru(t, n, d, yr(a, i)),
                  null !== d.attrs && Ya(d, d.attrs, !1),
                  null !== d.mergedAttrs && Ya(d, d.mergedAttrs, !0),
                  null !== t.queries && t.queries.elementStart(t, d),
                  d
                );
              })(a, i, o, t, n, r)
            : i.data[a],
          f = Qg(i, o, d, u, t, e);
        o[a] = f;
        const p = sa(d);
        return (
          Rn(d, !0),
          hp(u, f, d),
          32 != (32 & d.flags) && da() && Na(i, o, f, d),
          0 ===
            (function uv() {
              return X.lFrame.elementDepthCount;
            })() && Dt(f, o),
          (function dv() {
            X.lFrame.elementDepthCount++;
          })(),
          p && (Au(i, o, d), Tu(i, d, o)),
          null !== r && Nu(o, d),
          M
        );
      }
      function R() {
        let e = dt();
        pl() ? gl() : ((e = e.parent), Rn(e, !1));
        const t = e;
        (function fv(e) {
          return X.skipHydrationRootTNode === e;
        })(t) &&
          (function mv() {
            X.skipHydrationRootTNode = null;
          })(),
          (function _v() {
            X.lFrame.elementDepthCount--;
          })();
        const n = ye();
        return (
          n.firstCreatePass && (_a(n, e), al(e) && n.queries.elementEnd(e)),
          null != t.classesWithoutHost &&
            (function Av(e) {
              return 0 != (8 & e.flags);
            })(t) &&
            zu(n, t, F(), t.classesWithoutHost, !0),
          null != t.stylesWithoutHost &&
            (function Nv(e) {
              return 0 != (16 & e.flags);
            })(t) &&
            zu(n, t, F(), t.stylesWithoutHost, !1),
          R
        );
      }
      function Se(e, t, n, r) {
        return M(e, t, n, r), R(), Se;
      }
      let Qg = (e, t, n, r, o, i) => (
        br(!0),
        ka(
          r,
          o,
          (function wf() {
            return X.lFrame.currentNamespace;
          })()
        )
      );
      function ls(e, t, n) {
        const r = F(),
          o = ye(),
          i = e + ge,
          a = o.firstCreatePass
            ? (function A1(e, t, n, r, o) {
                const i = t.consts,
                  a = yr(i, r),
                  u = Xo(t, e, 8, 'ng-container', a);
                return (
                  null !== a && Ya(u, a, !0),
                  Ru(t, n, u, yr(i, o)),
                  null !== t.queries && t.queries.elementStart(t, u),
                  u
                );
              })(i, o, r, t, n)
            : o.data[i];
        Rn(a, !0);
        const u = eh(o, r, a, e);
        return (
          (r[i] = u),
          da() && Na(o, r, u, a),
          Dt(u, r),
          sa(a) && (Au(o, r, a), Tu(o, a, r)),
          null != n && Nu(r, a),
          ls
        );
      }
      function us() {
        let e = dt();
        const t = ye();
        return (
          pl() ? gl() : ((e = e.parent), Rn(e, !1)),
          t.firstCreatePass && (_a(t, e), al(e) && t.queries.elementEnd(e)),
          us
        );
      }
      let eh = (e, t, n, r) => (br(!0), Ul(t[re], ''));
      function xt() {
        return F();
      }
      function Gu(e) {
        return !!e && 'function' == typeof e.then;
      }
      function th(e) {
        return !!e && 'function' == typeof e.subscribe;
      }
      function Ce(e, t, n, r) {
        const o = F(),
          i = ye(),
          a = dt();
        return (
          (function rh(e, t, n, r, o, i, a) {
            const u = sa(r),
              f = e.firstCreatePass && Dg(e),
              p = t[Ze],
              m = vg(t);
            let w = !0;
            if (3 & r.type || a) {
              const T = Bt(r, t),
                N = a ? a(T) : T,
                L = m.length,
                A = a ? (z) => a(je(z[r.index])) : r.index;
              let G = null;
              if (
                (!a &&
                  u &&
                  (G = (function R1(e, t, n, r) {
                    const o = e.cleanup;
                    if (null != o)
                      for (let i = 0; i < o.length - 1; i += 2) {
                        const a = o[i];
                        if (a === n && o[i + 1] === r) {
                          const u = t[So],
                            d = o[i + 2];
                          return u.length > d ? u[d] : null;
                        }
                        'string' == typeof a && (i += 2);
                      }
                    return null;
                  })(e, t, o, r.index)),
                null !== G)
              )
                ((G.__ngLastListenerFn__ || G).__ngNextListenerFn__ = i),
                  (G.__ngLastListenerFn__ = i),
                  (w = !1);
              else {
                i = sh(r, t, p, i, !1);
                const z = n.listen(N, o, i);
                m.push(i, z), f && f.push(o, A, L, L + 1);
              }
            } else i = sh(r, t, p, i, !1);
            const b = r.outputs;
            let C;
            if (w && null !== b && (C = b[o])) {
              const T = C.length;
              if (T)
                for (let N = 0; N < T; N += 2) {
                  const de = t[C[N]][C[N + 1]].subscribe(i),
                    _t = m.length;
                  m.push(i, de), f && f.push(o, r.index, _t, -(_t + 1));
                }
            }
          })(i, o, o[re], a, e, t, r),
          Ce
        );
      }
      function oh(e, t, n, r) {
        try {
          return xn(6, t, n), !1 !== n(r);
        } catch (o) {
          return Cg(e, o), !1;
        } finally {
          xn(7, t, n);
        }
      }
      function sh(e, t, n, r, o) {
        return function i(a) {
          if (a === Function) return r;
          li(e.componentOffset > -1 ? Qt(e.index, t) : t);
          let d = oh(t, n, r, a),
            f = i.__ngNextListenerFn__;
          for (; f; ) (d = oh(t, n, f, a) && d), (f = f.__ngNextListenerFn__);
          return o && !1 === d && a.preventDefault(), d;
        };
      }
      function J(e = 1) {
        return (function Ev(e) {
          return (X.lFrame.contextLView = (function Cv(e, t) {
            for (; e > 0; ) (t = t[ko]), e--;
            return t;
          })(e, X.lFrame.contextLView))[Ze];
        })(e);
      }
      function sc(e, t, n, r, o) {
        const i = F(),
          a = ts(i, t, n, r);
        return a !== ie && en(ye(), ze(), i, e, a, i[re], o, !1), sc;
      }
      function $(e, t = '') {
        const n = F(),
          r = ye(),
          o = e + ge,
          i = r.firstCreatePass ? Xo(r, o, 1, t, null) : r.data[o],
          a = Ah(r, n, i, t, e);
        (n[o] = a), da() && Na(r, n, a, i), Rn(i, !1);
      }
      let Ah = (e, t, n, r, o) => (
        br(!0),
        (function Ma(e, t) {
          return e.createText(t);
        })(t[re], r)
      );
      function no(e) {
        return rt('', e, ''), no;
      }
      function rt(e, t, n) {
        const r = F(),
          o = ts(r, e, t, n);
        return o !== ie && tr(r, At(), o), rt;
      }
      function cc(e, t, n, r, o) {
        const i = F(),
          a = ns(i, e, t, n, r, o);
        return a !== ie && tr(i, At(), a), cc;
      }
      const fs = 'en-US';
      let Yh = fs;
      function Xu(e, t, n, r, o) {
        if (((e = K(e)), Array.isArray(e)))
          for (let i = 0; i < e.length; i++) Xu(e[i], t, n, r, o);
        else {
          const i = ye(),
            a = F(),
            u = dt();
          let d = Kr(e) ? e : K(e.provide);
          const f = Fp(e),
            p = 1048575 & u.providerIndexes,
            m = u.directiveStart,
            w = u.providerIndexes >> 20;
          if (Kr(e) || !e.multi) {
            const b = new Gs(f, o, ne),
              C = td(d, t, o ? p : p + w, m);
            -1 === C
              ? (Ml(ha(u, a), i, d),
                ed(i, e, t.length),
                t.push(d),
                u.directiveStart++,
                u.directiveEnd++,
                o && (u.providerIndexes += 1048576),
                n.push(b),
                a.push(b))
              : ((n[C] = b), (a[C] = b));
          } else {
            const b = td(d, t, p + w, m),
              C = td(d, t, p, p + w),
              N = C >= 0 && n[C];
            if ((o && !N) || (!o && !(b >= 0 && n[b]))) {
              Ml(ha(u, a), i, d);
              const L = (function II(e, t, n, r, o) {
                const i = new Gs(e, n, ne);
                return (
                  (i.multi = []),
                  (i.index = t),
                  (i.componentProviders = 0),
                  Dm(i, o, r && !n),
                  i
                );
              })(o ? CI : EI, n.length, o, r, f);
              !o && N && (n[C].providerFactory = L),
                ed(i, e, t.length, 0),
                t.push(d),
                u.directiveStart++,
                u.directiveEnd++,
                o && (u.providerIndexes += 1048576),
                n.push(L),
                a.push(L);
            } else ed(i, e, b > -1 ? b : C, Dm(n[o ? C : b], f, !o && r));
            !o && r && N && n[C].componentProviders++;
          }
        }
      }
      function ed(e, t, n, r) {
        const o = Kr(t),
          i = (function y0(e) {
            return !!e.useClass;
          })(t);
        if (o || i) {
          const d = (i ? K(t.useClass) : t).prototype.ngOnDestroy;
          if (d) {
            const f = e.destroyHooks || (e.destroyHooks = []);
            if (!o && t.multi) {
              const p = f.indexOf(n);
              -1 === p ? f.push(n, [r, d]) : f[p + 1].push(r, d);
            } else f.push(n, d);
          }
        }
      }
      function Dm(e, t, n) {
        return n && e.componentProviders++, e.multi.push(t) - 1;
      }
      function td(e, t, n, r) {
        for (let o = n; o < r; o++) if (t[o] === e) return o;
        return -1;
      }
      function EI(e, t, n, r) {
        return nd(this.multi, []);
      }
      function CI(e, t, n, r) {
        const o = this.multi;
        let i;
        if (this.providerFactory) {
          const a = this.providerFactory.componentProviders,
            u = Jr(n, n[q], this.providerFactory.index, r);
          (i = u.slice(0, a)), nd(o, i);
          for (let d = a; d < u.length; d++) i.push(u[d]);
        } else (i = []), nd(o, i);
        return i;
      }
      function nd(e, t) {
        for (let n = 0; n < e.length; n++) t.push((0, e[n])());
        return t;
      }
      function Em(e, t = []) {
        return (n) => {
          n.providersResolver = (r, o) =>
            (function DI(e, t, n) {
              const r = ye();
              if (r.firstCreatePass) {
                const o = wn(e);
                Xu(n, r.data, r.blueprint, o, !0),
                  Xu(t, r.data, r.blueprint, o, !1);
              }
            })(r, o ? o(e) : e, t);
        };
      }
      class oo {}
      class Cm extends oo {
        constructor(t) {
          super(),
            (this.componentFactoryResolver = new Ag(this)),
            (this.instance = null);
          const n = new Va(
            [
              ...t.providers,
              { provide: oo, useValue: this },
              { provide: Ga, useValue: this.componentFactoryResolver },
            ],
            t.parent || Ha(),
            t.debugName,
            new Set(['environment'])
          );
          (this.injector = n),
            t.runEnvironmentInitializers && n.resolveInjectorInitializers();
        }
        destroy() {
          this.injector.destroy();
        }
        onDestroy(t) {
          this.injector.onDestroy(t);
        }
      }
      let AI = (() => {
        var e;
        class t {
          constructor(r) {
            (this._injector = r), (this.cachedInjectors = new Map());
          }
          getOrCreateStandaloneInjector(r) {
            if (!r.standalone) return null;
            if (!this.cachedInjectors.has(r)) {
              const o = xp(0, r.type),
                i =
                  o.length > 0
                    ? (function TI(e, t, n = null) {
                        return new Cm({
                          providers: e,
                          parent: t,
                          debugName: n,
                          runEnvironmentInitializers: !0,
                        }).injector;
                      })([o], this._injector, `Standalone[${r.type.name}]`)
                    : null;
              this.cachedInjectors.set(r, i);
            }
            return this.cachedInjectors.get(r);
          }
          ngOnDestroy() {
            try {
              for (const r of this.cachedInjectors.values())
                null !== r && r.destroy();
            } finally {
              this.cachedInjectors.clear();
            }
          }
        }
        return (
          ((e = t).ɵprov = ve({
            token: e,
            providedIn: 'environment',
            factory: () => new e(le(On)),
          })),
          t
        );
      })();
      function sd(e) {
        e.getStandaloneInjector = (t) =>
          t.get(AI).getOrCreateStandaloneInjector(e);
      }
      function at(e, t, n) {
        const r =
            (function Tt() {
              const e = X.lFrame;
              let t = e.bindingRootIndex;
              return (
                -1 === t &&
                  (t = e.bindingRootIndex = e.tView.bindingStartIndex),
                t
              );
            })() + e,
          o = F();
        return o[r] === ie
          ? (function jn(e, t, n) {
              return (e[t] = n);
            })(o, r, n ? t.call(n) : t())
          : (function pi(e, t) {
              return e[t];
            })(o, r);
      }
      function ad(e) {
        return (t) => {
          setTimeout(e, void 0, t);
        };
      }
      const nr = class tS extends Tr {
        constructor(t = !1) {
          super(), (this.__isAsync = t);
        }
        emit(t) {
          super.next(t);
        }
        subscribe(t, n, r) {
          let o = t,
            i = n || (() => null),
            a = r;
          if (t && 'object' == typeof t) {
            const d = t;
            (o = d.next?.bind(d)),
              (i = d.error?.bind(d)),
              (a = d.complete?.bind(d));
          }
          this.__isAsync && ((i = ad(i)), o && (o = ad(o)), a && (a = ad(a)));
          const u = super.subscribe({ next: o, error: i, complete: a });
          return t instanceof Le && t.add(u), u;
        }
      };
      function nS() {
        return this._results[Symbol.iterator]();
      }
      class cd {
        get changes() {
          return this._changes || (this._changes = new nr());
        }
        constructor(t = !1) {
          (this._emitDistinctChangesOnly = t),
            (this.dirty = !0),
            (this._results = []),
            (this._changesDetected = !1),
            (this._changes = null),
            (this.length = 0),
            (this.first = void 0),
            (this.last = void 0);
          const n = cd.prototype;
          n[Symbol.iterator] || (n[Symbol.iterator] = nS);
        }
        get(t) {
          return this._results[t];
        }
        map(t) {
          return this._results.map(t);
        }
        filter(t) {
          return this._results.filter(t);
        }
        find(t) {
          return this._results.find(t);
        }
        reduce(t, n) {
          return this._results.reduce(t, n);
        }
        forEach(t) {
          this._results.forEach(t);
        }
        some(t) {
          return this._results.some(t);
        }
        toArray() {
          return this._results.slice();
        }
        toString() {
          return this._results.toString();
        }
        reset(t, n) {
          const r = this;
          r.dirty = !1;
          const o = (function cn(e) {
            return e.flat(Number.POSITIVE_INFINITY);
          })(t);
          (this._changesDetected = !(function Gv(e, t, n) {
            if (e.length !== t.length) return !1;
            for (let r = 0; r < e.length; r++) {
              let o = e[r],
                i = t[r];
              if ((n && ((o = n(o)), (i = n(i))), i !== o)) return !1;
            }
            return !0;
          })(r._results, o, n)) &&
            ((r._results = o),
            (r.length = o.length),
            (r.last = o[this.length - 1]),
            (r.first = o[0]));
        }
        notifyOnChanges() {
          this._changes &&
            (this._changesDetected || !this._emitDistinctChangesOnly) &&
            this._changes.emit(this);
        }
        setDirty() {
          this.dirty = !0;
        }
        destroy() {
          this.changes.complete(), this.changes.unsubscribe();
        }
      }
      function oS(e, t, n, r = !0) {
        const o = t[q];
        if (
          ((function OD(e, t, n, r) {
            const o = ut + r,
              i = n.length;
            r > 0 && (n[o - 1][mn] = t),
              r < i - ut
                ? ((t[mn] = n[o]), Rf(n, ut + r, t))
                : (n.push(t), (t[mn] = null)),
              (t[qe] = n);
            const a = t[Bs];
            null !== a &&
              n !== a &&
              (function FD(e, t) {
                const n = e[Ao];
                t[Ke] !== t[qe][qe][Ke] && (e[H_] = !0),
                  null === n ? (e[Ao] = [t]) : n.push(t);
              })(a, t);
            const u = t[Tn];
            null !== u && u.insertView(e), (t[se] |= 128);
          })(o, t, e, n),
          r)
        ) {
          const i = Jl(n, e),
            a = t[re],
            u = Aa(a, e[An]);
          null !== u &&
            (function xD(e, t, n, r, o, i) {
              (r[Je] = o), (r[yt] = t), ni(e, r, n, 1, o, i);
            })(o, e[yt], a, t, u, i);
        }
      }
      let rr = (() => {
        class t {}
        return (t.__NG_ELEMENT_ID__ = aS), t;
      })();
      const sS = rr,
        iS = class extends sS {
          constructor(t, n, r) {
            super(),
              (this._declarationLView = t),
              (this._declarationTContainer = n),
              (this.elementRef = r);
          }
          get ssrId() {
            return this._declarationTContainer.tView?.ssrId || null;
          }
          createEmbeddedView(t, n) {
            return this.createEmbeddedViewImpl(t, n);
          }
          createEmbeddedViewImpl(t, n, r) {
            const o = (function rS(e, t, n, r) {
              const o = t.tView,
                u = Za(
                  e,
                  o,
                  n,
                  4096 & e[se] ? 4096 : 16,
                  null,
                  t,
                  null,
                  null,
                  null,
                  r?.injector ?? null,
                  r?.hydrationInfo ?? null
                );
              u[Bs] = e[t.index];
              const f = e[Tn];
              return (
                null !== f && (u[Tn] = f.createEmbeddedView(o)), ju(o, u, n), u
              );
            })(this._declarationLView, this._declarationTContainer, t, {
              injector: n,
              hydrationInfo: r,
            });
            return new _i(o);
          }
        };
      function aS() {
        return fc(dt(), F());
      }
      function fc(e, t) {
        return 4 & e.type ? new iS(t, e, Ko(e, t)) : null;
      }
      let Bn = (() => {
        class t {}
        return (t.__NG_ELEMENT_ID__ = fS), t;
      })();
      function fS() {
        return $m(dt(), F());
      }
      const pS = Bn,
        Vm = class extends pS {
          constructor(t, n, r) {
            super(),
              (this._lContainer = t),
              (this._hostTNode = n),
              (this._hostLView = r);
          }
          get element() {
            return Ko(this._hostTNode, this._hostLView);
          }
          get injector() {
            return new Nt(this._hostTNode, this._hostLView);
          }
          get parentInjector() {
            const t = ma(this._hostTNode, this._hostLView);
            if (Cl(t)) {
              const n = Js(t, this._hostLView),
                r = Ws(t);
              return new Nt(n[q].data[r + 8], n);
            }
            return new Nt(null, this._hostLView);
          }
          clear() {
            for (; this.length > 0; ) this.remove(this.length - 1);
          }
          get(t) {
            const n = Bm(this._lContainer);
            return (null !== n && n[t]) || null;
          }
          get length() {
            return this._lContainer.length - ut;
          }
          createEmbeddedView(t, n, r) {
            let o, i;
            'number' == typeof r
              ? (o = r)
              : null != r && ((o = r.index), (i = r.injector));
            const u = t.createEmbeddedViewImpl(n || {}, i, null);
            return this.insertImpl(u, o, false), u;
          }
          createComponent(t, n, r, o, i) {
            const a =
              t &&
              !(function Ks(e) {
                return 'function' == typeof e;
              })(t);
            let u;
            if (a) u = n;
            else {
              const T = n || {};
              (u = T.index),
                (r = T.injector),
                (o = T.projectableNodes),
                (i = T.environmentInjector || T.ngModuleRef);
            }
            const d = a ? t : new fi(we(t)),
              f = r || this.parentInjector;
            if (!i && null == d.ngModule) {
              const N = (a ? f : this.parentInjector).get(On, null);
              N && (i = N);
            }
            we(d.componentType ?? {});
            const b = d.create(f, o, null, i);
            return this.insertImpl(b.hostView, u, false), b;
          }
          insert(t, n) {
            return this.insertImpl(t, n, !1);
          }
          insertImpl(t, n, r) {
            const o = t._lView;
            if (
              (function av(e) {
                return Vt(e[qe]);
              })(o)
            ) {
              const d = this.indexOf(t);
              if (-1 !== d) this.detach(d);
              else {
                const f = o[qe],
                  p = new Vm(f, f[yt], f[qe]);
                p.detach(p.indexOf(t));
              }
            }
            const a = this._adjustIndex(n),
              u = this._lContainer;
            return (
              oS(u, o, a, !r), t.attachToViewContainerRef(), Rf(ld(u), a, t), t
            );
          }
          move(t, n) {
            return this.insert(t, n);
          }
          indexOf(t) {
            const n = Bm(this._lContainer);
            return null !== n ? n.indexOf(t) : -1;
          }
          remove(t) {
            const n = this._adjustIndex(t, -1),
              r = Ta(this._lContainer, n);
            r && (ya(ld(this._lContainer), n), ql(r[q], r));
          }
          detach(t) {
            const n = this._adjustIndex(t, -1),
              r = Ta(this._lContainer, n);
            return r && null != ya(ld(this._lContainer), n) ? new _i(r) : null;
          }
          _adjustIndex(t, n = 0) {
            return t ?? this.length + n;
          }
        };
      function Bm(e) {
        return e[8];
      }
      function ld(e) {
        return e[8] || (e[8] = []);
      }
      function $m(e, t) {
        let n;
        const r = t[e.index];
        return (
          Vt(r)
            ? (n = r)
            : ((n = yg(r, t, null, e)), (t[e.index] = n), Ka(t, n)),
          Um(n, t, e, r),
          new Vm(n, e, t)
        );
      }
      let Um = function qm(e, t, n, r) {
        if (e[An]) return;
        let o;
        (o =
          8 & n.type
            ? je(r)
            : (function gS(e, t) {
                const n = e[re],
                  r = n.createComment(''),
                  o = Bt(t, e);
                return (
                  Zr(
                    n,
                    Aa(n, o),
                    r,
                    (function VD(e, t) {
                      return e.nextSibling(t);
                    })(n, o),
                    !1
                  ),
                  r
                );
              })(t, n)),
          (e[An] = o);
      };
      class ud {
        constructor(t) {
          (this.queryList = t), (this.matches = null);
        }
        clone() {
          return new ud(this.queryList);
        }
        setDirty() {
          this.queryList.setDirty();
        }
      }
      class dd {
        constructor(t = []) {
          this.queries = t;
        }
        createEmbeddedView(t) {
          const n = t.queries;
          if (null !== n) {
            const r =
                null !== t.contentQueries ? t.contentQueries[0] : n.length,
              o = [];
            for (let i = 0; i < r; i++) {
              const a = n.getByIndex(i);
              o.push(this.queries[a.indexInDeclarationView].clone());
            }
            return new dd(o);
          }
          return null;
        }
        insertView(t) {
          this.dirtyQueriesWithMatches(t);
        }
        detachView(t) {
          this.dirtyQueriesWithMatches(t);
        }
        dirtyQueriesWithMatches(t) {
          for (let n = 0; n < this.queries.length; n++)
            null !== Zm(t, n).matches && this.queries[n].setDirty();
        }
      }
      class zm {
        constructor(t, n, r = null) {
          (this.predicate = t), (this.flags = n), (this.read = r);
        }
      }
      class _d {
        constructor(t = []) {
          this.queries = t;
        }
        elementStart(t, n) {
          for (let r = 0; r < this.queries.length; r++)
            this.queries[r].elementStart(t, n);
        }
        elementEnd(t) {
          for (let n = 0; n < this.queries.length; n++)
            this.queries[n].elementEnd(t);
        }
        embeddedTView(t) {
          let n = null;
          for (let r = 0; r < this.length; r++) {
            const o = null !== n ? n.length : 0,
              i = this.getByIndex(r).embeddedTView(t, o);
            i &&
              ((i.indexInDeclarationView = r),
              null !== n ? n.push(i) : (n = [i]));
          }
          return null !== n ? new _d(n) : null;
        }
        template(t, n) {
          for (let r = 0; r < this.queries.length; r++)
            this.queries[r].template(t, n);
        }
        getByIndex(t) {
          return this.queries[t];
        }
        get length() {
          return this.queries.length;
        }
        track(t) {
          this.queries.push(t);
        }
      }
      class fd {
        constructor(t, n = -1) {
          (this.metadata = t),
            (this.matches = null),
            (this.indexInDeclarationView = -1),
            (this.crossesNgTemplate = !1),
            (this._appliesToNextNode = !0),
            (this._declarationNodeIndex = n);
        }
        elementStart(t, n) {
          this.isApplyingToNode(n) && this.matchTNode(t, n);
        }
        elementEnd(t) {
          this._declarationNodeIndex === t.index &&
            (this._appliesToNextNode = !1);
        }
        template(t, n) {
          this.elementStart(t, n);
        }
        embeddedTView(t, n) {
          return this.isApplyingToNode(t)
            ? ((this.crossesNgTemplate = !0),
              this.addMatch(-t.index, n),
              new fd(this.metadata))
            : null;
        }
        isApplyingToNode(t) {
          if (this._appliesToNextNode && 1 != (1 & this.metadata.flags)) {
            const n = this._declarationNodeIndex;
            let r = t.parent;
            for (; null !== r && 8 & r.type && r.index !== n; ) r = r.parent;
            return n === (null !== r ? r.index : -1);
          }
          return this._appliesToNextNode;
        }
        matchTNode(t, n) {
          const r = this.metadata.predicate;
          if (Array.isArray(r))
            for (let o = 0; o < r.length; o++) {
              const i = r[o];
              this.matchTNodeWithReadOption(t, n, wS(n, i)),
                this.matchTNodeWithReadOption(t, n, wa(n, t, i, !1, !1));
            }
          else
            r === rr
              ? 4 & n.type && this.matchTNodeWithReadOption(t, n, -1)
              : this.matchTNodeWithReadOption(t, n, wa(n, t, r, !1, !1));
        }
        matchTNodeWithReadOption(t, n, r) {
          if (null !== r) {
            const o = this.metadata.read;
            if (null !== o)
              if (o === Qr || o === Bn || (o === rr && 4 & n.type))
                this.addMatch(n.index, -2);
              else {
                const i = wa(n, t, o, !1, !1);
                null !== i && this.addMatch(n.index, i);
              }
            else this.addMatch(n.index, r);
          }
        }
        addMatch(t, n) {
          null === this.matches
            ? (this.matches = [t, n])
            : this.matches.push(t, n);
        }
      }
      function wS(e, t) {
        const n = e.localNames;
        if (null !== n)
          for (let r = 0; r < n.length; r += 2) if (n[r] === t) return n[r + 1];
        return null;
      }
      function bS(e, t, n, r) {
        return -1 === n
          ? (function yS(e, t) {
              return 11 & e.type ? Ko(e, t) : 4 & e.type ? fc(e, t) : null;
            })(t, e)
          : -2 === n
          ? (function vS(e, t, n) {
              return n === Qr
                ? Ko(t, e)
                : n === rr
                ? fc(t, e)
                : n === Bn
                ? $m(t, e)
                : void 0;
            })(e, t, r)
          : Jr(e, e[q], n, t);
      }
      function Gm(e, t, n, r) {
        const o = t[Tn].queries[r];
        if (null === o.matches) {
          const i = e.data,
            a = n.matches,
            u = [];
          for (let d = 0; d < a.length; d += 2) {
            const f = a[d];
            u.push(f < 0 ? null : bS(t, i[f], a[d + 1], n.metadata.read));
          }
          o.matches = u;
        }
        return o.matches;
      }
      function pd(e, t, n, r) {
        const o = e.queries.getByIndex(n),
          i = o.matches;
        if (null !== i) {
          const a = Gm(e, t, o, n);
          for (let u = 0; u < i.length; u += 2) {
            const d = i[u];
            if (d > 0) r.push(a[u / 2]);
            else {
              const f = i[u + 1],
                p = t[-d];
              for (let m = ut; m < p.length; m++) {
                const w = p[m];
                w[Bs] === w[qe] && pd(w[q], w, f, r);
              }
              if (null !== p[Ao]) {
                const m = p[Ao];
                for (let w = 0; w < m.length; w++) {
                  const b = m[w];
                  pd(b[q], b, f, r);
                }
              }
            }
          }
        }
        return r;
      }
      function _e(e) {
        const t = F(),
          n = ye(),
          r = _f();
        wl(r + 1);
        const o = Zm(n, r);
        if (
          e.dirty &&
          (function sv(e) {
            return 4 == (4 & e[se]);
          })(t) ===
            (2 == (2 & o.metadata.flags))
        ) {
          if (null === o.matches) e.reset([]);
          else {
            const i = o.crossesNgTemplate ? pd(n, t, r, []) : Gm(n, t, o, r);
            e.reset(i, V0), e.notifyOnChanges();
          }
          return !0;
        }
        return !1;
      }
      function fe(e, t, n) {
        const r = ye();
        r.firstCreatePass &&
          ((function Jm(e, t, n) {
            null === e.queries && (e.queries = new _d()),
              e.queries.track(new fd(t, n));
          })(r, new zm(e, t, n), -1),
          2 == (2 & t) && (r.staticViewQueries = !0)),
          (function Wm(e, t, n) {
            const r = new cd(4 == (4 & n));
            (function _E(e, t, n, r) {
              const o = vg(t);
              o.push(n), e.firstCreatePass && Dg(e).push(r, o.length - 1);
            })(e, t, r, r.destroy),
              null === t[Tn] && (t[Tn] = new dd()),
              t[Tn].queries.push(new ud(r));
          })(r, F(), t);
      }
      function pe() {
        return (function ES(e, t) {
          return e[Tn].queries[t].queryList;
        })(F(), _f());
      }
      function Zm(e, t) {
        return e.queries.getByIndex(t);
      }
      const fw = new Z('Application Initializer');
      let hc = (() => {
        var e;
        class t {
          constructor() {
            (this.initialized = !1),
              (this.done = !1),
              (this.donePromise = new Promise((r, o) => {
                (this.resolve = r), (this.reject = o);
              })),
              (this.appInits = De(fw, { optional: !0 }) ?? []);
          }
          runInitializers() {
            if (this.initialized) return;
            const r = [];
            for (const i of this.appInits) {
              const a = i();
              if (Gu(a)) r.push(a);
              else if (th(a)) {
                const u = new Promise((d, f) => {
                  a.subscribe({ complete: d, error: f });
                });
                r.push(u);
              }
            }
            const o = () => {
              (this.done = !0), this.resolve();
            };
            Promise.all(r)
              .then(() => {
                o();
              })
              .catch((i) => {
                this.reject(i);
              }),
              0 === r.length && o(),
              (this.initialized = !0);
          }
        }
        return (
          ((e = t).ɵfac = function (r) {
            return new (r || e)();
          }),
          (e.ɵprov = ve({ token: e, factory: e.ɵfac, providedIn: 'root' })),
          t
        );
      })();
      const or = new Z('LocaleId', {
        providedIn: 'root',
        factory: () =>
          De(or, he.Optional | he.SkipSelf) ||
          (function WS() {
            return (typeof $localize < 'u' && $localize.locale) || fs;
          })(),
      });
      let yd = (() => {
        var e;
        class t {
          constructor() {
            (this.taskId = 0),
              (this.pendingTasks = new Set()),
              (this.hasPendingTasks = new pt(!1));
          }
          add() {
            this.hasPendingTasks.next(!0);
            const r = this.taskId++;
            return this.pendingTasks.add(r), r;
          }
          remove(r) {
            this.pendingTasks.delete(r),
              0 === this.pendingTasks.size && this.hasPendingTasks.next(!1);
          }
          ngOnDestroy() {
            this.pendingTasks.clear(), this.hasPendingTasks.next(!1);
          }
        }
        return (
          ((e = t).ɵfac = function (r) {
            return new (r || e)();
          }),
          (e.ɵprov = ve({ token: e, factory: e.ɵfac, providedIn: 'root' })),
          t
        );
      })();
      function mw(...e) {}
      class Qe {
        constructor({
          enableLongStackTrace: t = !1,
          shouldCoalesceEventChangeDetection: n = !1,
          shouldCoalesceRunChangeDetection: r = !1,
        }) {
          if (
            ((this.hasPendingMacrotasks = !1),
            (this.hasPendingMicrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new nr(!1)),
            (this.onMicrotaskEmpty = new nr(!1)),
            (this.onStable = new nr(!1)),
            (this.onError = new nr(!1)),
            typeof Zone > 'u')
          )
            throw new U(908, !1);
          Zone.assertZonePatched();
          const o = this;
          (o._nesting = 0),
            (o._outer = o._inner = Zone.current),
            Zone.TaskTrackingZoneSpec &&
              (o._inner = o._inner.fork(new Zone.TaskTrackingZoneSpec())),
            t &&
              Zone.longStackTraceZoneSpec &&
              (o._inner = o._inner.fork(Zone.longStackTraceZoneSpec)),
            (o.shouldCoalesceEventChangeDetection = !r && n),
            (o.shouldCoalesceRunChangeDetection = r),
            (o.lastRequestAnimationFrameId = -1),
            (o.nativeRequestAnimationFrame = (function hM() {
              const e = 'function' == typeof Oe.requestAnimationFrame;
              let t = Oe[e ? 'requestAnimationFrame' : 'setTimeout'],
                n = Oe[e ? 'cancelAnimationFrame' : 'clearTimeout'];
              if (typeof Zone < 'u' && t && n) {
                const r = t[Zone.__symbol__('OriginalDelegate')];
                r && (t = r);
                const o = n[Zone.__symbol__('OriginalDelegate')];
                o && (n = o);
              }
              return {
                nativeRequestAnimationFrame: t,
                nativeCancelAnimationFrame: n,
              };
            })().nativeRequestAnimationFrame),
            (function yM(e) {
              const t = () => {
                !(function wM(e) {
                  e.isCheckStableRunning ||
                    -1 !== e.lastRequestAnimationFrameId ||
                    ((e.lastRequestAnimationFrameId =
                      e.nativeRequestAnimationFrame.call(Oe, () => {
                        e.fakeTopEventTask ||
                          (e.fakeTopEventTask = Zone.root.scheduleEventTask(
                            'fakeTopEventTask',
                            () => {
                              (e.lastRequestAnimationFrameId = -1),
                                Ed(e),
                                (e.isCheckStableRunning = !0),
                                Dd(e),
                                (e.isCheckStableRunning = !1);
                            },
                            void 0,
                            () => {},
                            () => {}
                          )),
                          e.fakeTopEventTask.invoke();
                      })),
                    Ed(e));
                })(e);
              };
              e._inner = e._inner.fork({
                name: 'angular',
                properties: { isAngularZone: !0 },
                onInvokeTask: (n, r, o, i, a, u) => {
                  try {
                    return ww(e), n.invokeTask(o, i, a, u);
                  } finally {
                    ((e.shouldCoalesceEventChangeDetection &&
                      'eventTask' === i.type) ||
                      e.shouldCoalesceRunChangeDetection) &&
                      t(),
                      yw(e);
                  }
                },
                onInvoke: (n, r, o, i, a, u, d) => {
                  try {
                    return ww(e), n.invoke(o, i, a, u, d);
                  } finally {
                    e.shouldCoalesceRunChangeDetection && t(), yw(e);
                  }
                },
                onHasTask: (n, r, o, i) => {
                  n.hasTask(o, i),
                    r === o &&
                      ('microTask' == i.change
                        ? ((e._hasPendingMicrotasks = i.microTask),
                          Ed(e),
                          Dd(e))
                        : 'macroTask' == i.change &&
                          (e.hasPendingMacrotasks = i.macroTask));
                },
                onHandleError: (n, r, o, i) => (
                  n.handleError(o, i),
                  e.runOutsideAngular(() => e.onError.emit(i)),
                  !1
                ),
              });
            })(o);
        }
        static isInAngularZone() {
          return typeof Zone < 'u' && !0 === Zone.current.get('isAngularZone');
        }
        static assertInAngularZone() {
          if (!Qe.isInAngularZone()) throw new U(909, !1);
        }
        static assertNotInAngularZone() {
          if (Qe.isInAngularZone()) throw new U(909, !1);
        }
        run(t, n, r) {
          return this._inner.run(t, n, r);
        }
        runTask(t, n, r, o) {
          const i = this._inner,
            a = i.scheduleEventTask('NgZoneEvent: ' + o, t, mM, mw, mw);
          try {
            return i.runTask(a, n, r);
          } finally {
            i.cancelTask(a);
          }
        }
        runGuarded(t, n, r) {
          return this._inner.runGuarded(t, n, r);
        }
        runOutsideAngular(t) {
          return this._outer.run(t);
        }
      }
      const mM = {};
      function Dd(e) {
        if (0 == e._nesting && !e.hasPendingMicrotasks && !e.isStable)
          try {
            e._nesting++, e.onMicrotaskEmpty.emit(null);
          } finally {
            if ((e._nesting--, !e.hasPendingMicrotasks))
              try {
                e.runOutsideAngular(() => e.onStable.emit(null));
              } finally {
                e.isStable = !0;
              }
          }
      }
      function Ed(e) {
        e.hasPendingMicrotasks = !!(
          e._hasPendingMicrotasks ||
          ((e.shouldCoalesceEventChangeDetection ||
            e.shouldCoalesceRunChangeDetection) &&
            -1 !== e.lastRequestAnimationFrameId)
        );
      }
      function ww(e) {
        e._nesting++,
          e.isStable && ((e.isStable = !1), e.onUnstable.emit(null));
      }
      function yw(e) {
        e._nesting--, Dd(e);
      }
      const bw = new Z('', { providedIn: 'root', factory: vw });
      function vw() {
        const e = De(Qe);
        let t = !0;
        return (function te(...e) {
          const t = Ns(e),
            n = (function xs(e, t) {
              return 'number' == typeof Do(e) ? e.pop() : t;
            })(e, 1 / 0),
            r = e;
          return r.length
            ? 1 === r.length
              ? It(r[0])
              : (function vo(e = 1 / 0) {
                  return zn(ji, e);
                })(n)(W(r, t))
            : $i;
        })(
          new ct((o) => {
            (t =
              e.isStable && !e.hasPendingMacrotasks && !e.hasPendingMicrotasks),
              e.runOutsideAngular(() => {
                o.next(t), o.complete();
              });
          }),
          new ct((o) => {
            let i;
            e.runOutsideAngular(() => {
              i = e.onStable.subscribe(() => {
                Qe.assertNotInAngularZone(),
                  queueMicrotask(() => {
                    !t &&
                      !e.hasPendingMacrotasks &&
                      !e.hasPendingMicrotasks &&
                      ((t = !0), o.next(!0));
                  });
              });
            });
            const a = e.onUnstable.subscribe(() => {
              Qe.assertInAngularZone(),
                t &&
                  ((t = !1),
                  e.runOutsideAngular(() => {
                    o.next(!1);
                  }));
            });
            return () => {
              i.unsubscribe(), a.unsubscribe();
            };
          }).pipe(Te())
        );
      }
      const Dw = new Z('');
      let Cr = null;
      const Md = new Z('PlatformDestroyListeners'),
        Cw = new Z('appBootstrapListener');
      function SM(e) {
        try {
          const { rootComponent: t, appProviders: n, platformProviders: r } = e,
            o = (function IM(e = []) {
              if (Cr) return Cr;
              const t = (function Mw(e = [], t) {
                return Fn.create({
                  name: t,
                  providers: [
                    { provide: cu, useValue: 'platform' },
                    { provide: Md, useValue: new Set([() => (Cr = null)]) },
                    ...e,
                  ],
                });
              })(e);
              return (
                (Cr = t),
                (function Iw() {
                  !(function Zb(e) {
                    z_ = e;
                  })(() => {
                    throw new U(600, !1);
                  });
                })(),
                (function Sw(e) {
                  e.get(Lp, null)?.forEach((n) => n());
                })(t),
                t
              );
            })(r),
            i = [NM(), ...(n || [])],
            u = new Cm({
              providers: i,
              parent: o,
              debugName: '',
              runEnvironmentInitializers: !1,
            }).injector,
            d = u.get(Qe);
          return d.run(() => {
            u.resolveInjectorInitializers();
            const f = u.get(Xr, null);
            let p;
            d.runOutsideAngular(() => {
              p = d.onError.subscribe({
                next: (b) => {
                  f.handleError(b);
                },
              });
            });
            const m = () => u.destroy(),
              w = o.get(Md);
            return (
              w.add(m),
              u.onDestroy(() => {
                p.unsubscribe(), w.delete(m);
              }),
              (function Aw(e, t, n) {
                try {
                  const r = n();
                  return Gu(r)
                    ? r.catch((o) => {
                        throw (t.runOutsideAngular(() => e.handleError(o)), o);
                      })
                    : r;
                } catch (r) {
                  throw (t.runOutsideAngular(() => e.handleError(r)), r);
                }
              })(f, d, () => {
                const b = u.get(hc);
                return (
                  b.runInitializers(),
                  b.donePromise.then(() => {
                    !(function Qh(e) {
                      sn(e, 'Expected localeId to be defined'),
                        'string' == typeof e &&
                          (Yh = e.toLowerCase().replace(/_/g, '-'));
                    })(u.get(or, fs) || fs);
                    const T = u.get(ki);
                    return void 0 !== t && T.bootstrap(t), T;
                  })
                );
              })
            );
          });
        } catch (t) {
          return Promise.reject(t);
        }
      }
      let ki = (() => {
        var e;
        class t {
          constructor() {
            (this._bootstrapListeners = []),
              (this._runningTick = !1),
              (this._destroyed = !1),
              (this._destroyListeners = []),
              (this._views = []),
              (this.internalErrorHandler = De(Rw)),
              (this.zoneIsStable = De(bw)),
              (this.componentTypes = []),
              (this.components = []),
              (this.isStable = De(yd).hasPendingTasks.pipe(
                xe((r) => (r ? ae(!1) : this.zoneIsStable)),
                (function St(e, t = ji) {
                  return (
                    (e = e ?? Mt),
                    Gt((n, r) => {
                      let o,
                        i = !0;
                      n.subscribe(
                        st(r, (a) => {
                          const u = t(a);
                          (i || !e(o, u)) && ((i = !1), (o = u), r.next(a));
                        })
                      );
                    })
                  );
                })(),
                Te()
              )),
              (this._injector = De(On));
          }
          get destroyed() {
            return this._destroyed;
          }
          get injector() {
            return this._injector;
          }
          bootstrap(r, o) {
            const i = r instanceof Up;
            if (!this._injector.get(hc).done)
              throw (
                (!i &&
                  (function js(e) {
                    const t = we(e) || lt(e) || kt(e);
                    return null !== t && t.standalone;
                  })(r),
                new U(405, !1))
              );
            let u;
            (u = i ? r : this._injector.get(Ga).resolveComponentFactory(r)),
              this.componentTypes.push(u.componentType);
            const d = (function EM(e) {
                return e.isBoundToModule;
              })(u)
                ? void 0
                : this._injector.get(oo),
              p = u.create(Fn.NULL, [], o || u.selector, d),
              m = p.location.nativeElement,
              w = p.injector.get(Dw, null);
            return (
              w?.registerApplication(m),
              p.onDestroy(() => {
                this.detachView(p.hostView),
                  yc(this.components, p),
                  w?.unregisterApplication(m);
              }),
              this._loadComponent(p),
              p
            );
          }
          tick() {
            if (this._runningTick) throw new U(101, !1);
            try {
              this._runningTick = !0;
              for (let r of this._views) r.detectChanges();
            } catch (r) {
              this.internalErrorHandler(r);
            } finally {
              this._runningTick = !1;
            }
          }
          attachView(r) {
            const o = r;
            this._views.push(o), o.attachToAppRef(this);
          }
          detachView(r) {
            const o = r;
            yc(this._views, o), o.detachFromAppRef();
          }
          _loadComponent(r) {
            this.attachView(r.hostView), this.tick(), this.components.push(r);
            const o = this._injector.get(Cw, []);
            o.push(...this._bootstrapListeners), o.forEach((i) => i(r));
          }
          ngOnDestroy() {
            if (!this._destroyed)
              try {
                this._destroyListeners.forEach((r) => r()),
                  this._views.slice().forEach((r) => r.destroy());
              } finally {
                (this._destroyed = !0),
                  (this._views = []),
                  (this._bootstrapListeners = []),
                  (this._destroyListeners = []);
              }
          }
          onDestroy(r) {
            return (
              this._destroyListeners.push(r),
              () => yc(this._destroyListeners, r)
            );
          }
          destroy() {
            if (this._destroyed) throw new U(406, !1);
            const r = this._injector;
            r.destroy && !r.destroyed && r.destroy();
          }
          get viewCount() {
            return this._views.length;
          }
          warnIfDestroyed() {}
        }
        return (
          ((e = t).ɵfac = function (r) {
            return new (r || e)();
          }),
          (e.ɵprov = ve({ token: e, factory: e.ɵfac, providedIn: 'root' })),
          t
        );
      })();
      function yc(e, t) {
        const n = e.indexOf(t);
        n > -1 && e.splice(n, 1);
      }
      const Rw = new Z('', {
        providedIn: 'root',
        factory: () => De(Xr).handleError.bind(void 0),
      });
      function TM() {
        const e = De(Qe),
          t = De(Xr);
        return (n) => e.runOutsideAngular(() => t.handleError(n));
      }
      let AM = (() => {
        var e;
        class t {
          constructor() {
            (this.zone = De(Qe)), (this.applicationRef = De(ki));
          }
          initialize() {
            this._onMicrotaskEmptySubscription ||
              (this._onMicrotaskEmptySubscription =
                this.zone.onMicrotaskEmpty.subscribe({
                  next: () => {
                    this.zone.run(() => {
                      this.applicationRef.tick();
                    });
                  },
                }));
          }
          ngOnDestroy() {
            this._onMicrotaskEmptySubscription?.unsubscribe();
          }
        }
        return (
          ((e = t).ɵfac = function (r) {
            return new (r || e)();
          }),
          (e.ɵprov = ve({ token: e, factory: e.ɵfac, providedIn: 'root' })),
          t
        );
      })();
      function Pw(e) {
        return [
          { provide: Qe, useFactory: e },
          {
            provide: Fa,
            multi: !0,
            useFactory: () => {
              const t = De(AM, { optional: !0 });
              return () => t.initialize();
            },
          },
          { provide: Rw, useFactory: TM },
          { provide: bw, useFactory: vw },
        ];
      }
      function NM(e) {
        return su([
          [],
          Pw(
            () =>
              new Qe(
                (function Tw(e) {
                  return {
                    enableLongStackTrace: !1,
                    shouldCoalesceEventChangeDetection:
                      e?.eventCoalescing ?? !1,
                    shouldCoalesceRunChangeDetection: e?.runCoalescing ?? !1,
                  };
                })(e)
              )
          ),
        ]);
      }
      let Td = (() => {
        class t {}
        return (t.__NG_ELEMENT_ID__ = xM), t;
      })();
      function xM(e) {
        return (function RM(e, t, n) {
          if (zr(e) && !n) {
            const r = Qt(e.index, t);
            return new _i(r, r);
          }
          return 47 & e.type ? new _i(t[Ke], t) : null;
        })(dt(), F(), 16 == (16 & e));
      }
      class jw {
        constructor() {}
        supports(t) {
          return ec(t);
        }
        create(t) {
          return new HM(t);
        }
      }
      const jM = (e, t) => t;
      class HM {
        constructor(t) {
          (this.length = 0),
            (this._linkedRecords = null),
            (this._unlinkedRecords = null),
            (this._previousItHead = null),
            (this._itHead = null),
            (this._itTail = null),
            (this._additionsHead = null),
            (this._additionsTail = null),
            (this._movesHead = null),
            (this._movesTail = null),
            (this._removalsHead = null),
            (this._removalsTail = null),
            (this._identityChangesHead = null),
            (this._identityChangesTail = null),
            (this._trackByFn = t || jM);
        }
        forEachItem(t) {
          let n;
          for (n = this._itHead; null !== n; n = n._next) t(n);
        }
        forEachOperation(t) {
          let n = this._itHead,
            r = this._removalsHead,
            o = 0,
            i = null;
          for (; n || r; ) {
            const a = !r || (n && n.currentIndex < Vw(r, o, i)) ? n : r,
              u = Vw(a, o, i),
              d = a.currentIndex;
            if (a === r) o--, (r = r._nextRemoved);
            else if (((n = n._next), null == a.previousIndex)) o++;
            else {
              i || (i = []);
              const f = u - o,
                p = d - o;
              if (f != p) {
                for (let w = 0; w < f; w++) {
                  const b = w < i.length ? i[w] : (i[w] = 0),
                    C = b + w;
                  p <= C && C < f && (i[w] = b + 1);
                }
                i[a.previousIndex] = p - f;
              }
            }
            u !== d && t(a, u, d);
          }
        }
        forEachPreviousItem(t) {
          let n;
          for (n = this._previousItHead; null !== n; n = n._nextPrevious) t(n);
        }
        forEachAddedItem(t) {
          let n;
          for (n = this._additionsHead; null !== n; n = n._nextAdded) t(n);
        }
        forEachMovedItem(t) {
          let n;
          for (n = this._movesHead; null !== n; n = n._nextMoved) t(n);
        }
        forEachRemovedItem(t) {
          let n;
          for (n = this._removalsHead; null !== n; n = n._nextRemoved) t(n);
        }
        forEachIdentityChange(t) {
          let n;
          for (
            n = this._identityChangesHead;
            null !== n;
            n = n._nextIdentityChange
          )
            t(n);
        }
        diff(t) {
          if ((null == t && (t = []), !ec(t))) throw new U(900, !1);
          return this.check(t) ? this : null;
        }
        onDestroy() {}
        check(t) {
          this._reset();
          let o,
            i,
            a,
            n = this._itHead,
            r = !1;
          if (Array.isArray(t)) {
            this.length = t.length;
            for (let u = 0; u < this.length; u++)
              (i = t[u]),
                (a = this._trackByFn(u, i)),
                null !== n && Object.is(n.trackById, a)
                  ? (r && (n = this._verifyReinsertion(n, i, a, u)),
                    Object.is(n.item, i) || this._addIdentityChange(n, i))
                  : ((n = this._mismatch(n, i, a, u)), (r = !0)),
                (n = n._next);
          } else
            (o = 0),
              (function s1(e, t) {
                if (Array.isArray(e))
                  for (let n = 0; n < e.length; n++) t(e[n]);
                else {
                  const n = e[Symbol.iterator]();
                  let r;
                  for (; !(r = n.next()).done; ) t(r.value);
                }
              })(t, (u) => {
                (a = this._trackByFn(o, u)),
                  null !== n && Object.is(n.trackById, a)
                    ? (r && (n = this._verifyReinsertion(n, u, a, o)),
                      Object.is(n.item, u) || this._addIdentityChange(n, u))
                    : ((n = this._mismatch(n, u, a, o)), (r = !0)),
                  (n = n._next),
                  o++;
              }),
              (this.length = o);
          return this._truncate(n), (this.collection = t), this.isDirty;
        }
        get isDirty() {
          return (
            null !== this._additionsHead ||
            null !== this._movesHead ||
            null !== this._removalsHead ||
            null !== this._identityChangesHead
          );
        }
        _reset() {
          if (this.isDirty) {
            let t;
            for (
              t = this._previousItHead = this._itHead;
              null !== t;
              t = t._next
            )
              t._nextPrevious = t._next;
            for (t = this._additionsHead; null !== t; t = t._nextAdded)
              t.previousIndex = t.currentIndex;
            for (
              this._additionsHead = this._additionsTail = null,
                t = this._movesHead;
              null !== t;
              t = t._nextMoved
            )
              t.previousIndex = t.currentIndex;
            (this._movesHead = this._movesTail = null),
              (this._removalsHead = this._removalsTail = null),
              (this._identityChangesHead = this._identityChangesTail = null);
          }
        }
        _mismatch(t, n, r, o) {
          let i;
          return (
            null === t ? (i = this._itTail) : ((i = t._prev), this._remove(t)),
            null !==
            (t =
              null === this._unlinkedRecords
                ? null
                : this._unlinkedRecords.get(r, null))
              ? (Object.is(t.item, n) || this._addIdentityChange(t, n),
                this._reinsertAfter(t, i, o))
              : null !==
                (t =
                  null === this._linkedRecords
                    ? null
                    : this._linkedRecords.get(r, o))
              ? (Object.is(t.item, n) || this._addIdentityChange(t, n),
                this._moveAfter(t, i, o))
              : (t = this._addAfter(new VM(n, r), i, o)),
            t
          );
        }
        _verifyReinsertion(t, n, r, o) {
          let i =
            null === this._unlinkedRecords
              ? null
              : this._unlinkedRecords.get(r, null);
          return (
            null !== i
              ? (t = this._reinsertAfter(i, t._prev, o))
              : t.currentIndex != o &&
                ((t.currentIndex = o), this._addToMoves(t, o)),
            t
          );
        }
        _truncate(t) {
          for (; null !== t; ) {
            const n = t._next;
            this._addToRemovals(this._unlink(t)), (t = n);
          }
          null !== this._unlinkedRecords && this._unlinkedRecords.clear(),
            null !== this._additionsTail &&
              (this._additionsTail._nextAdded = null),
            null !== this._movesTail && (this._movesTail._nextMoved = null),
            null !== this._itTail && (this._itTail._next = null),
            null !== this._removalsTail &&
              (this._removalsTail._nextRemoved = null),
            null !== this._identityChangesTail &&
              (this._identityChangesTail._nextIdentityChange = null);
        }
        _reinsertAfter(t, n, r) {
          null !== this._unlinkedRecords && this._unlinkedRecords.remove(t);
          const o = t._prevRemoved,
            i = t._nextRemoved;
          return (
            null === o ? (this._removalsHead = i) : (o._nextRemoved = i),
            null === i ? (this._removalsTail = o) : (i._prevRemoved = o),
            this._insertAfter(t, n, r),
            this._addToMoves(t, r),
            t
          );
        }
        _moveAfter(t, n, r) {
          return (
            this._unlink(t),
            this._insertAfter(t, n, r),
            this._addToMoves(t, r),
            t
          );
        }
        _addAfter(t, n, r) {
          return (
            this._insertAfter(t, n, r),
            (this._additionsTail =
              null === this._additionsTail
                ? (this._additionsHead = t)
                : (this._additionsTail._nextAdded = t)),
            t
          );
        }
        _insertAfter(t, n, r) {
          const o = null === n ? this._itHead : n._next;
          return (
            (t._next = o),
            (t._prev = n),
            null === o ? (this._itTail = t) : (o._prev = t),
            null === n ? (this._itHead = t) : (n._next = t),
            null === this._linkedRecords && (this._linkedRecords = new Hw()),
            this._linkedRecords.put(t),
            (t.currentIndex = r),
            t
          );
        }
        _remove(t) {
          return this._addToRemovals(this._unlink(t));
        }
        _unlink(t) {
          null !== this._linkedRecords && this._linkedRecords.remove(t);
          const n = t._prev,
            r = t._next;
          return (
            null === n ? (this._itHead = r) : (n._next = r),
            null === r ? (this._itTail = n) : (r._prev = n),
            t
          );
        }
        _addToMoves(t, n) {
          return (
            t.previousIndex === n ||
              (this._movesTail =
                null === this._movesTail
                  ? (this._movesHead = t)
                  : (this._movesTail._nextMoved = t)),
            t
          );
        }
        _addToRemovals(t) {
          return (
            null === this._unlinkedRecords &&
              (this._unlinkedRecords = new Hw()),
            this._unlinkedRecords.put(t),
            (t.currentIndex = null),
            (t._nextRemoved = null),
            null === this._removalsTail
              ? ((this._removalsTail = this._removalsHead = t),
                (t._prevRemoved = null))
              : ((t._prevRemoved = this._removalsTail),
                (this._removalsTail = this._removalsTail._nextRemoved = t)),
            t
          );
        }
        _addIdentityChange(t, n) {
          return (
            (t.item = n),
            (this._identityChangesTail =
              null === this._identityChangesTail
                ? (this._identityChangesHead = t)
                : (this._identityChangesTail._nextIdentityChange = t)),
            t
          );
        }
      }
      class VM {
        constructor(t, n) {
          (this.item = t),
            (this.trackById = n),
            (this.currentIndex = null),
            (this.previousIndex = null),
            (this._nextPrevious = null),
            (this._prev = null),
            (this._next = null),
            (this._prevDup = null),
            (this._nextDup = null),
            (this._prevRemoved = null),
            (this._nextRemoved = null),
            (this._nextAdded = null),
            (this._nextMoved = null),
            (this._nextIdentityChange = null);
        }
      }
      class BM {
        constructor() {
          (this._head = null), (this._tail = null);
        }
        add(t) {
          null === this._head
            ? ((this._head = this._tail = t),
              (t._nextDup = null),
              (t._prevDup = null))
            : ((this._tail._nextDup = t),
              (t._prevDup = this._tail),
              (t._nextDup = null),
              (this._tail = t));
        }
        get(t, n) {
          let r;
          for (r = this._head; null !== r; r = r._nextDup)
            if (
              (null === n || n <= r.currentIndex) &&
              Object.is(r.trackById, t)
            )
              return r;
          return null;
        }
        remove(t) {
          const n = t._prevDup,
            r = t._nextDup;
          return (
            null === n ? (this._head = r) : (n._nextDup = r),
            null === r ? (this._tail = n) : (r._prevDup = n),
            null === this._head
          );
        }
      }
      class Hw {
        constructor() {
          this.map = new Map();
        }
        put(t) {
          const n = t.trackById;
          let r = this.map.get(n);
          r || ((r = new BM()), this.map.set(n, r)), r.add(t);
        }
        get(t, n) {
          const o = this.map.get(t);
          return o ? o.get(t, n) : null;
        }
        remove(t) {
          const n = t.trackById;
          return this.map.get(n).remove(t) && this.map.delete(n), t;
        }
        get isEmpty() {
          return 0 === this.map.size;
        }
        clear() {
          this.map.clear();
        }
      }
      function Vw(e, t, n) {
        const r = e.previousIndex;
        if (null === r) return r;
        let o = 0;
        return n && r < n.length && (o = n[r]), r + t + o;
      }
      function $w() {
        return new Dc([new jw()]);
      }
      let Dc = (() => {
        var e;
        class t {
          constructor(r) {
            this.factories = r;
          }
          static create(r, o) {
            if (null != o) {
              const i = o.factories.slice();
              r = r.concat(i);
            }
            return new t(r);
          }
          static extend(r) {
            return {
              provide: t,
              useFactory: (o) => t.create(r, o || $w()),
              deps: [[t, new Pl(), new Rl()]],
            };
          }
          find(r) {
            const o = this.factories.find((i) => i.supports(r));
            if (null != o) return o;
            throw new U(901, !1);
          }
        }
        return (
          ((e = t).ɵprov = ve({ token: e, providedIn: 'root', factory: $w })), t
        );
      })();
      function Yw(e) {
        return Gt((t, n) => {
          try {
            t.subscribe(n);
          } finally {
            n.add(e);
          }
        });
      }
      let Od = null;
      function Fd() {
        return Od;
      }
      class ik {}
      const sr = new Z('DocumentToken');
      function iy(e, t) {
        t = encodeURIComponent(t);
        for (const n of e.split(';')) {
          const r = n.indexOf('='),
            [o, i] = -1 == r ? [n, ''] : [n.slice(0, r), n.slice(r + 1)];
          if (o.trim() === t) return decodeURIComponent(i);
        }
        return null;
      }
      class Jk {
        constructor(t, n, r, o) {
          (this.$implicit = t),
            (this.ngForOf = n),
            (this.index = r),
            (this.count = o);
        }
        get first() {
          return 0 === this.index;
        }
        get last() {
          return this.index === this.count - 1;
        }
        get even() {
          return this.index % 2 == 0;
        }
        get odd() {
          return !this.even;
        }
      }
      let ly = (() => {
        var e;
        class t {
          set ngForOf(r) {
            (this._ngForOf = r), (this._ngForOfDirty = !0);
          }
          set ngForTrackBy(r) {
            this._trackByFn = r;
          }
          get ngForTrackBy() {
            return this._trackByFn;
          }
          constructor(r, o, i) {
            (this._viewContainer = r),
              (this._template = o),
              (this._differs = i),
              (this._ngForOf = null),
              (this._ngForOfDirty = !0),
              (this._differ = null);
          }
          set ngForTemplate(r) {
            r && (this._template = r);
          }
          ngDoCheck() {
            if (this._ngForOfDirty) {
              this._ngForOfDirty = !1;
              const r = this._ngForOf;
              !this._differ &&
                r &&
                (this._differ = this._differs
                  .find(r)
                  .create(this.ngForTrackBy));
            }
            if (this._differ) {
              const r = this._differ.diff(this._ngForOf);
              r && this._applyChanges(r);
            }
          }
          _applyChanges(r) {
            const o = this._viewContainer;
            r.forEachOperation((i, a, u) => {
              if (null == i.previousIndex)
                o.createEmbeddedView(
                  this._template,
                  new Jk(i.item, this._ngForOf, -1, -1),
                  null === u ? void 0 : u
                );
              else if (null == u) o.remove(null === a ? void 0 : a);
              else if (null !== a) {
                const d = o.get(a);
                o.move(d, u), uy(d, i);
              }
            });
            for (let i = 0, a = o.length; i < a; i++) {
              const d = o.get(i).context;
              (d.index = i), (d.count = a), (d.ngForOf = this._ngForOf);
            }
            r.forEachIdentityChange((i) => {
              uy(o.get(i.currentIndex), i);
            });
          }
          static ngTemplateContextGuard(r, o) {
            return !0;
          }
        }
        return (
          ((e = t).ɵfac = function (r) {
            return new (r || e)(ne(Bn), ne(rr), ne(Dc));
          }),
          (e.ɵdir = an({
            type: e,
            selectors: [['', 'ngFor', '', 'ngForOf', '']],
            inputs: {
              ngForOf: 'ngForOf',
              ngForTrackBy: 'ngForTrackBy',
              ngForTemplate: 'ngForTemplate',
            },
            standalone: !0,
          })),
          t
        );
      })();
      function uy(e, t) {
        e.context.$implicit = t.item;
      }
      let Wd = (() => {
        var e;
        class t {
          constructor(r, o) {
            (this._viewContainer = r),
              (this._context = new Zk()),
              (this._thenTemplateRef = null),
              (this._elseTemplateRef = null),
              (this._thenViewRef = null),
              (this._elseViewRef = null),
              (this._thenTemplateRef = o);
          }
          set ngIf(r) {
            (this._context.$implicit = this._context.ngIf = r),
              this._updateView();
          }
          set ngIfThen(r) {
            dy('ngIfThen', r),
              (this._thenTemplateRef = r),
              (this._thenViewRef = null),
              this._updateView();
          }
          set ngIfElse(r) {
            dy('ngIfElse', r),
              (this._elseTemplateRef = r),
              (this._elseViewRef = null),
              this._updateView();
          }
          _updateView() {
            this._context.$implicit
              ? this._thenViewRef ||
                (this._viewContainer.clear(),
                (this._elseViewRef = null),
                this._thenTemplateRef &&
                  (this._thenViewRef = this._viewContainer.createEmbeddedView(
                    this._thenTemplateRef,
                    this._context
                  )))
              : this._elseViewRef ||
                (this._viewContainer.clear(),
                (this._thenViewRef = null),
                this._elseTemplateRef &&
                  (this._elseViewRef = this._viewContainer.createEmbeddedView(
                    this._elseTemplateRef,
                    this._context
                  )));
          }
          static ngTemplateContextGuard(r, o) {
            return !0;
          }
        }
        return (
          ((e = t).ɵfac = function (r) {
            return new (r || e)(ne(Bn), ne(rr));
          }),
          (e.ɵdir = an({
            type: e,
            selectors: [['', 'ngIf', '']],
            inputs: {
              ngIf: 'ngIf',
              ngIfThen: 'ngIfThen',
              ngIfElse: 'ngIfElse',
            },
            standalone: !0,
          })),
          t
        );
      })();
      class Zk {
        constructor() {
          (this.$implicit = null), (this.ngIf = null);
        }
      }
      function dy(e, t) {
        if (t && !t.createEmbeddedView)
          throw new Error(
            `${e} must be a TemplateRef, but received '${Pe(t)}'.`
          );
      }
      let xi = (() => {
        var e;
        class t {}
        return (
          ((e = t).ɵfac = function (r) {
            return new (r || e)();
          }),
          (e.ɵmod = Io({ type: e })),
          (e.ɵinj = qr({})),
          t
        );
      })();
      function gy(e) {
        return 'server' === e;
      }
      class hy {}
      class Fc {}
      class Lc {}
      class $n {
        constructor(t) {
          (this.normalizedNames = new Map()),
            (this.lazyUpdate = null),
            t
              ? 'string' == typeof t
                ? (this.lazyInit = () => {
                    (this.headers = new Map()),
                      t.split('\n').forEach((n) => {
                        const r = n.indexOf(':');
                        if (r > 0) {
                          const o = n.slice(0, r),
                            i = o.toLowerCase(),
                            a = n.slice(r + 1).trim();
                          this.maybeSetNormalizedName(o, i),
                            this.headers.has(i)
                              ? this.headers.get(i).push(a)
                              : this.headers.set(i, [a]);
                        }
                      });
                  })
                : typeof Headers < 'u' && t instanceof Headers
                ? ((this.headers = new Map()),
                  t.forEach((n, r) => {
                    this.setHeaderEntries(r, n);
                  }))
                : (this.lazyInit = () => {
                    (this.headers = new Map()),
                      Object.entries(t).forEach(([n, r]) => {
                        this.setHeaderEntries(n, r);
                      });
                  })
              : (this.headers = new Map());
        }
        has(t) {
          return this.init(), this.headers.has(t.toLowerCase());
        }
        get(t) {
          this.init();
          const n = this.headers.get(t.toLowerCase());
          return n && n.length > 0 ? n[0] : null;
        }
        keys() {
          return this.init(), Array.from(this.normalizedNames.values());
        }
        getAll(t) {
          return this.init(), this.headers.get(t.toLowerCase()) || null;
        }
        append(t, n) {
          return this.clone({ name: t, value: n, op: 'a' });
        }
        set(t, n) {
          return this.clone({ name: t, value: n, op: 's' });
        }
        delete(t, n) {
          return this.clone({ name: t, value: n, op: 'd' });
        }
        maybeSetNormalizedName(t, n) {
          this.normalizedNames.has(n) || this.normalizedNames.set(n, t);
        }
        init() {
          this.lazyInit &&
            (this.lazyInit instanceof $n
              ? this.copyFrom(this.lazyInit)
              : this.lazyInit(),
            (this.lazyInit = null),
            this.lazyUpdate &&
              (this.lazyUpdate.forEach((t) => this.applyUpdate(t)),
              (this.lazyUpdate = null)));
        }
        copyFrom(t) {
          t.init(),
            Array.from(t.headers.keys()).forEach((n) => {
              this.headers.set(n, t.headers.get(n)),
                this.normalizedNames.set(n, t.normalizedNames.get(n));
            });
        }
        clone(t) {
          const n = new $n();
          return (
            (n.lazyInit =
              this.lazyInit && this.lazyInit instanceof $n
                ? this.lazyInit
                : this),
            (n.lazyUpdate = (this.lazyUpdate || []).concat([t])),
            n
          );
        }
        applyUpdate(t) {
          const n = t.name.toLowerCase();
          switch (t.op) {
            case 'a':
            case 's':
              let r = t.value;
              if (('string' == typeof r && (r = [r]), 0 === r.length)) return;
              this.maybeSetNormalizedName(t.name, n);
              const o = ('a' === t.op ? this.headers.get(n) : void 0) || [];
              o.push(...r), this.headers.set(n, o);
              break;
            case 'd':
              const i = t.value;
              if (i) {
                let a = this.headers.get(n);
                if (!a) return;
                (a = a.filter((u) => -1 === i.indexOf(u))),
                  0 === a.length
                    ? (this.headers.delete(n), this.normalizedNames.delete(n))
                    : this.headers.set(n, a);
              } else this.headers.delete(n), this.normalizedNames.delete(n);
          }
        }
        setHeaderEntries(t, n) {
          const r = (Array.isArray(n) ? n : [n]).map((i) => i.toString()),
            o = t.toLowerCase();
          this.headers.set(o, r), this.maybeSetNormalizedName(t, o);
        }
        forEach(t) {
          this.init(),
            Array.from(this.normalizedNames.keys()).forEach((n) =>
              t(this.normalizedNames.get(n), this.headers.get(n))
            );
        }
      }
      class GT {
        encodeKey(t) {
          return vy(t);
        }
        encodeValue(t) {
          return vy(t);
        }
        decodeKey(t) {
          return decodeURIComponent(t);
        }
        decodeValue(t) {
          return decodeURIComponent(t);
        }
      }
      const JT = /%(\d[a-f0-9])/gi,
        ZT = {
          40: '@',
          '3A': ':',
          24: '$',
          '2C': ',',
          '3B': ';',
          '3D': '=',
          '3F': '?',
          '2F': '/',
        };
      function vy(e) {
        return encodeURIComponent(e).replace(JT, (t, n) => ZT[n] ?? t);
      }
      function jc(e) {
        return `${e}`;
      }
      class Ir {
        constructor(t = {}) {
          if (
            ((this.updates = null),
            (this.cloneFrom = null),
            (this.encoder = t.encoder || new GT()),
            t.fromString)
          ) {
            if (t.fromObject)
              throw new Error('Cannot specify both fromString and fromObject.');
            this.map = (function WT(e, t) {
              const n = new Map();
              return (
                e.length > 0 &&
                  e
                    .replace(/^\?/, '')
                    .split('&')
                    .forEach((o) => {
                      const i = o.indexOf('='),
                        [a, u] =
                          -1 == i
                            ? [t.decodeKey(o), '']
                            : [
                                t.decodeKey(o.slice(0, i)),
                                t.decodeValue(o.slice(i + 1)),
                              ],
                        d = n.get(a) || [];
                      d.push(u), n.set(a, d);
                    }),
                n
              );
            })(t.fromString, this.encoder);
          } else
            t.fromObject
              ? ((this.map = new Map()),
                Object.keys(t.fromObject).forEach((n) => {
                  const r = t.fromObject[n],
                    o = Array.isArray(r) ? r.map(jc) : [jc(r)];
                  this.map.set(n, o);
                }))
              : (this.map = null);
        }
        has(t) {
          return this.init(), this.map.has(t);
        }
        get(t) {
          this.init();
          const n = this.map.get(t);
          return n ? n[0] : null;
        }
        getAll(t) {
          return this.init(), this.map.get(t) || null;
        }
        keys() {
          return this.init(), Array.from(this.map.keys());
        }
        append(t, n) {
          return this.clone({ param: t, value: n, op: 'a' });
        }
        appendAll(t) {
          const n = [];
          return (
            Object.keys(t).forEach((r) => {
              const o = t[r];
              Array.isArray(o)
                ? o.forEach((i) => {
                    n.push({ param: r, value: i, op: 'a' });
                  })
                : n.push({ param: r, value: o, op: 'a' });
            }),
            this.clone(n)
          );
        }
        set(t, n) {
          return this.clone({ param: t, value: n, op: 's' });
        }
        delete(t, n) {
          return this.clone({ param: t, value: n, op: 'd' });
        }
        toString() {
          return (
            this.init(),
            this.keys()
              .map((t) => {
                const n = this.encoder.encodeKey(t);
                return this.map
                  .get(t)
                  .map((r) => n + '=' + this.encoder.encodeValue(r))
                  .join('&');
              })
              .filter((t) => '' !== t)
              .join('&')
          );
        }
        clone(t) {
          const n = new Ir({ encoder: this.encoder });
          return (
            (n.cloneFrom = this.cloneFrom || this),
            (n.updates = (this.updates || []).concat(t)),
            n
          );
        }
        init() {
          null === this.map && (this.map = new Map()),
            null !== this.cloneFrom &&
              (this.cloneFrom.init(),
              this.cloneFrom
                .keys()
                .forEach((t) => this.map.set(t, this.cloneFrom.map.get(t))),
              this.updates.forEach((t) => {
                switch (t.op) {
                  case 'a':
                  case 's':
                    const n =
                      ('a' === t.op ? this.map.get(t.param) : void 0) || [];
                    n.push(jc(t.value)), this.map.set(t.param, n);
                    break;
                  case 'd':
                    if (void 0 === t.value) {
                      this.map.delete(t.param);
                      break;
                    }
                    {
                      let r = this.map.get(t.param) || [];
                      const o = r.indexOf(jc(t.value));
                      -1 !== o && r.splice(o, 1),
                        r.length > 0
                          ? this.map.set(t.param, r)
                          : this.map.delete(t.param);
                    }
                }
              }),
              (this.cloneFrom = this.updates = null));
        }
      }
      class KT {
        constructor() {
          this.map = new Map();
        }
        set(t, n) {
          return this.map.set(t, n), this;
        }
        get(t) {
          return (
            this.map.has(t) || this.map.set(t, t.defaultValue()),
            this.map.get(t)
          );
        }
        delete(t) {
          return this.map.delete(t), this;
        }
        has(t) {
          return this.map.has(t);
        }
        keys() {
          return this.map.keys();
        }
      }
      function Dy(e) {
        return typeof ArrayBuffer < 'u' && e instanceof ArrayBuffer;
      }
      function Ey(e) {
        return typeof Blob < 'u' && e instanceof Blob;
      }
      function Cy(e) {
        return typeof FormData < 'u' && e instanceof FormData;
      }
      class Pi {
        constructor(t, n, r, o) {
          let i;
          if (
            ((this.url = n),
            (this.body = null),
            (this.reportProgress = !1),
            (this.withCredentials = !1),
            (this.responseType = 'json'),
            (this.method = t.toUpperCase()),
            (function YT(e) {
              switch (e) {
                case 'DELETE':
                case 'GET':
                case 'HEAD':
                case 'OPTIONS':
                case 'JSONP':
                  return !1;
                default:
                  return !0;
              }
            })(this.method) || o
              ? ((this.body = void 0 !== r ? r : null), (i = o))
              : (i = r),
            i &&
              ((this.reportProgress = !!i.reportProgress),
              (this.withCredentials = !!i.withCredentials),
              i.responseType && (this.responseType = i.responseType),
              i.headers && (this.headers = i.headers),
              i.context && (this.context = i.context),
              i.params && (this.params = i.params)),
            this.headers || (this.headers = new $n()),
            this.context || (this.context = new KT()),
            this.params)
          ) {
            const a = this.params.toString();
            if (0 === a.length) this.urlWithParams = n;
            else {
              const u = n.indexOf('?');
              this.urlWithParams =
                n + (-1 === u ? '?' : u < n.length - 1 ? '&' : '') + a;
            }
          } else (this.params = new Ir()), (this.urlWithParams = n);
        }
        serializeBody() {
          return null === this.body
            ? null
            : Dy(this.body) ||
              Ey(this.body) ||
              Cy(this.body) ||
              (function QT(e) {
                return (
                  typeof URLSearchParams < 'u' && e instanceof URLSearchParams
                );
              })(this.body) ||
              'string' == typeof this.body
            ? this.body
            : this.body instanceof Ir
            ? this.body.toString()
            : 'object' == typeof this.body ||
              'boolean' == typeof this.body ||
              Array.isArray(this.body)
            ? JSON.stringify(this.body)
            : this.body.toString();
        }
        detectContentTypeHeader() {
          return null === this.body || Cy(this.body)
            ? null
            : Ey(this.body)
            ? this.body.type || null
            : Dy(this.body)
            ? null
            : 'string' == typeof this.body
            ? 'text/plain'
            : this.body instanceof Ir
            ? 'application/x-www-form-urlencoded;charset=UTF-8'
            : 'object' == typeof this.body ||
              'number' == typeof this.body ||
              'boolean' == typeof this.body
            ? 'application/json'
            : null;
        }
        clone(t = {}) {
          const n = t.method || this.method,
            r = t.url || this.url,
            o = t.responseType || this.responseType,
            i = void 0 !== t.body ? t.body : this.body,
            a =
              void 0 !== t.withCredentials
                ? t.withCredentials
                : this.withCredentials,
            u =
              void 0 !== t.reportProgress
                ? t.reportProgress
                : this.reportProgress;
          let d = t.headers || this.headers,
            f = t.params || this.params;
          const p = t.context ?? this.context;
          return (
            void 0 !== t.setHeaders &&
              (d = Object.keys(t.setHeaders).reduce(
                (m, w) => m.set(w, t.setHeaders[w]),
                d
              )),
            t.setParams &&
              (f = Object.keys(t.setParams).reduce(
                (m, w) => m.set(w, t.setParams[w]),
                f
              )),
            new Pi(n, r, i, {
              params: f,
              headers: d,
              context: p,
              reportProgress: u,
              responseType: o,
              withCredentials: a,
            })
          );
        }
      }
      var ms = (function (e) {
        return (
          (e[(e.Sent = 0)] = 'Sent'),
          (e[(e.UploadProgress = 1)] = 'UploadProgress'),
          (e[(e.ResponseHeader = 2)] = 'ResponseHeader'),
          (e[(e.DownloadProgress = 3)] = 'DownloadProgress'),
          (e[(e.Response = 4)] = 'Response'),
          (e[(e.User = 5)] = 'User'),
          e
        );
      })(ms || {});
      class e_ {
        constructor(t, n = 200, r = 'OK') {
          (this.headers = t.headers || new $n()),
            (this.status = void 0 !== t.status ? t.status : n),
            (this.statusText = t.statusText || r),
            (this.url = t.url || null),
            (this.ok = this.status >= 200 && this.status < 300);
        }
      }
      class t_ extends e_ {
        constructor(t = {}) {
          super(t), (this.type = ms.ResponseHeader);
        }
        clone(t = {}) {
          return new t_({
            headers: t.headers || this.headers,
            status: void 0 !== t.status ? t.status : this.status,
            statusText: t.statusText || this.statusText,
            url: t.url || this.url || void 0,
          });
        }
      }
      class ws extends e_ {
        constructor(t = {}) {
          super(t),
            (this.type = ms.Response),
            (this.body = void 0 !== t.body ? t.body : null);
        }
        clone(t = {}) {
          return new ws({
            body: void 0 !== t.body ? t.body : this.body,
            headers: t.headers || this.headers,
            status: void 0 !== t.status ? t.status : this.status,
            statusText: t.statusText || this.statusText,
            url: t.url || this.url || void 0,
          });
        }
      }
      class Iy extends e_ {
        constructor(t) {
          super(t, 0, 'Unknown Error'),
            (this.name = 'HttpErrorResponse'),
            (this.ok = !1),
            (this.message =
              this.status >= 200 && this.status < 300
                ? `Http failure during parsing for ${t.url || '(unknown url)'}`
                : `Http failure response for ${t.url || '(unknown url)'}: ${
                    t.status
                  } ${t.statusText}`),
            (this.error = t.error || null);
        }
      }
      function n_(e, t) {
        return {
          body: t,
          headers: e.headers,
          context: e.context,
          observe: e.observe,
          params: e.params,
          reportProgress: e.reportProgress,
          responseType: e.responseType,
          withCredentials: e.withCredentials,
        };
      }
      let XT = (() => {
        var e;
        class t {
          constructor(r) {
            this.handler = r;
          }
          request(r, o, i = {}) {
            let a;
            if (r instanceof Pi) a = r;
            else {
              let f, p;
              (f = i.headers instanceof $n ? i.headers : new $n(i.headers)),
                i.params &&
                  (p =
                    i.params instanceof Ir
                      ? i.params
                      : new Ir({ fromObject: i.params })),
                (a = new Pi(r, o, void 0 !== i.body ? i.body : null, {
                  headers: f,
                  context: i.context,
                  params: p,
                  reportProgress: i.reportProgress,
                  responseType: i.responseType || 'json',
                  withCredentials: i.withCredentials,
                }));
            }
            const u = ae(a).pipe(
              (function rk(e, t) {
                return Ie(t) ? zn(e, t, 1) : zn(e, 1);
              })((f) => this.handler.handle(f))
            );
            if (r instanceof Pi || 'events' === i.observe) return u;
            const d = u.pipe(
              (function ok(e, t) {
                return Gt((n, r) => {
                  let o = 0;
                  n.subscribe(st(r, (i) => e.call(t, i, o++) && r.next(i)));
                });
              })((f) => f instanceof ws)
            );
            switch (i.observe || 'body') {
              case 'body':
                switch (a.responseType) {
                  case 'arraybuffer':
                    return d.pipe(
                      gt((f) => {
                        if (null !== f.body && !(f.body instanceof ArrayBuffer))
                          throw new Error('Response is not an ArrayBuffer.');
                        return f.body;
                      })
                    );
                  case 'blob':
                    return d.pipe(
                      gt((f) => {
                        if (null !== f.body && !(f.body instanceof Blob))
                          throw new Error('Response is not a Blob.');
                        return f.body;
                      })
                    );
                  case 'text':
                    return d.pipe(
                      gt((f) => {
                        if (null !== f.body && 'string' != typeof f.body)
                          throw new Error('Response is not a string.');
                        return f.body;
                      })
                    );
                  default:
                    return d.pipe(gt((f) => f.body));
                }
              case 'response':
                return d;
              default:
                throw new Error(
                  `Unreachable: unhandled observe type ${i.observe}}`
                );
            }
          }
          delete(r, o = {}) {
            return this.request('DELETE', r, o);
          }
          get(r, o = {}) {
            return this.request('GET', r, o);
          }
          head(r, o = {}) {
            return this.request('HEAD', r, o);
          }
          jsonp(r, o) {
            return this.request('JSONP', r, {
              params: new Ir().append(o, 'JSONP_CALLBACK'),
              observe: 'body',
              responseType: 'json',
            });
          }
          options(r, o = {}) {
            return this.request('OPTIONS', r, o);
          }
          patch(r, o, i = {}) {
            return this.request('PATCH', r, n_(i, o));
          }
          post(r, o, i = {}) {
            return this.request('POST', r, n_(i, o));
          }
          put(r, o, i = {}) {
            return this.request('PUT', r, n_(i, o));
          }
        }
        return (
          ((e = t).ɵfac = function (r) {
            return new (r || e)(le(Fc));
          }),
          (e.ɵprov = ve({ token: e, factory: e.ɵfac })),
          t
        );
      })();
      function ky(e, t) {
        return t(e);
      }
      function tA(e, t) {
        return (n, r) => t.intercept(n, { handle: (o) => e(o, r) });
      }
      const rA = new Z(''),
        Oi = new Z(''),
        Ty = new Z('');
      function oA() {
        let e = null;
        return (t, n) => {
          null === e &&
            (e = (De(rA, { optional: !0 }) ?? []).reduceRight(tA, ky));
          const r = De(yd),
            o = r.add();
          return e(t, n).pipe(Yw(() => r.remove(o)));
        };
      }
      let Ay = (() => {
        var e;
        class t extends Fc {
          constructor(r, o) {
            super(),
              (this.backend = r),
              (this.injector = o),
              (this.chain = null),
              (this.pendingTasks = De(yd));
          }
          handle(r) {
            if (null === this.chain) {
              const i = Array.from(
                new Set([
                  ...this.injector.get(Oi),
                  ...this.injector.get(Ty, []),
                ])
              );
              this.chain = i.reduceRight(
                (a, u) =>
                  (function nA(e, t, n) {
                    return (r, o) => n.runInContext(() => t(r, (i) => e(i, o)));
                  })(a, u, this.injector),
                ky
              );
            }
            const o = this.pendingTasks.add();
            return this.chain(r, (i) => this.backend.handle(i)).pipe(
              Yw(() => this.pendingTasks.remove(o))
            );
          }
        }
        return (
          ((e = t).ɵfac = function (r) {
            return new (r || e)(le(Lc), le(On));
          }),
          (e.ɵprov = ve({ token: e, factory: e.ɵfac })),
          t
        );
      })();
      const cA = /^\)\]\}',?\n/;
      let xy = (() => {
        var e;
        class t {
          constructor(r) {
            this.xhrFactory = r;
          }
          handle(r) {
            if ('JSONP' === r.method) throw new U(-2800, !1);
            const o = this.xhrFactory;
            return (o.ɵloadImpl ? W(o.ɵloadImpl()) : ae(null)).pipe(
              xe(
                () =>
                  new ct((a) => {
                    const u = o.build();
                    if (
                      (u.open(r.method, r.urlWithParams),
                      r.withCredentials && (u.withCredentials = !0),
                      r.headers.forEach((N, L) =>
                        u.setRequestHeader(N, L.join(','))
                      ),
                      r.headers.has('Accept') ||
                        u.setRequestHeader(
                          'Accept',
                          'application/json, text/plain, */*'
                        ),
                      !r.headers.has('Content-Type'))
                    ) {
                      const N = r.detectContentTypeHeader();
                      null !== N && u.setRequestHeader('Content-Type', N);
                    }
                    if (r.responseType) {
                      const N = r.responseType.toLowerCase();
                      u.responseType = 'json' !== N ? N : 'text';
                    }
                    const d = r.serializeBody();
                    let f = null;
                    const p = () => {
                        if (null !== f) return f;
                        const N = u.statusText || 'OK',
                          L = new $n(u.getAllResponseHeaders()),
                          A =
                            (function lA(e) {
                              return 'responseURL' in e && e.responseURL
                                ? e.responseURL
                                : /^X-Request-URL:/m.test(
                                    e.getAllResponseHeaders()
                                  )
                                ? e.getResponseHeader('X-Request-URL')
                                : null;
                            })(u) || r.url;
                        return (
                          (f = new t_({
                            headers: L,
                            status: u.status,
                            statusText: N,
                            url: A,
                          })),
                          f
                        );
                      },
                      m = () => {
                        let {
                            headers: N,
                            status: L,
                            statusText: A,
                            url: G,
                          } = p(),
                          z = null;
                        204 !== L &&
                          (z =
                            typeof u.response > 'u'
                              ? u.responseText
                              : u.response),
                          0 === L && (L = z ? 200 : 0);
                        let de = L >= 200 && L < 300;
                        if ('json' === r.responseType && 'string' == typeof z) {
                          const _t = z;
                          z = z.replace(cA, '');
                          try {
                            z = '' !== z ? JSON.parse(z) : null;
                          } catch (nn) {
                            (z = _t),
                              de && ((de = !1), (z = { error: nn, text: z }));
                          }
                        }
                        de
                          ? (a.next(
                              new ws({
                                body: z,
                                headers: N,
                                status: L,
                                statusText: A,
                                url: G || void 0,
                              })
                            ),
                            a.complete())
                          : a.error(
                              new Iy({
                                error: z,
                                headers: N,
                                status: L,
                                statusText: A,
                                url: G || void 0,
                              })
                            );
                      },
                      w = (N) => {
                        const { url: L } = p(),
                          A = new Iy({
                            error: N,
                            status: u.status || 0,
                            statusText: u.statusText || 'Unknown Error',
                            url: L || void 0,
                          });
                        a.error(A);
                      };
                    let b = !1;
                    const C = (N) => {
                        b || (a.next(p()), (b = !0));
                        let L = { type: ms.DownloadProgress, loaded: N.loaded };
                        N.lengthComputable && (L.total = N.total),
                          'text' === r.responseType &&
                            u.responseText &&
                            (L.partialText = u.responseText),
                          a.next(L);
                      },
                      T = (N) => {
                        let L = { type: ms.UploadProgress, loaded: N.loaded };
                        N.lengthComputable && (L.total = N.total), a.next(L);
                      };
                    return (
                      u.addEventListener('load', m),
                      u.addEventListener('error', w),
                      u.addEventListener('timeout', w),
                      u.addEventListener('abort', w),
                      r.reportProgress &&
                        (u.addEventListener('progress', C),
                        null !== d &&
                          u.upload &&
                          u.upload.addEventListener('progress', T)),
                      u.send(d),
                      a.next({ type: ms.Sent }),
                      () => {
                        u.removeEventListener('error', w),
                          u.removeEventListener('abort', w),
                          u.removeEventListener('load', m),
                          u.removeEventListener('timeout', w),
                          r.reportProgress &&
                            (u.removeEventListener('progress', C),
                            null !== d &&
                              u.upload &&
                              u.upload.removeEventListener('progress', T)),
                          u.readyState !== u.DONE && u.abort();
                      }
                    );
                  })
              )
            );
          }
        }
        return (
          ((e = t).ɵfac = function (r) {
            return new (r || e)(le(hy));
          }),
          (e.ɵprov = ve({ token: e, factory: e.ɵfac })),
          t
        );
      })();
      const r_ = new Z('XSRF_ENABLED'),
        Ry = new Z('XSRF_COOKIE_NAME', {
          providedIn: 'root',
          factory: () => 'XSRF-TOKEN',
        }),
        Py = new Z('XSRF_HEADER_NAME', {
          providedIn: 'root',
          factory: () => 'X-XSRF-TOKEN',
        });
      class Oy {}
      let _A = (() => {
        var e;
        class t {
          constructor(r, o, i) {
            (this.doc = r),
              (this.platform = o),
              (this.cookieName = i),
              (this.lastCookieString = ''),
              (this.lastToken = null),
              (this.parseCount = 0);
          }
          getToken() {
            if ('server' === this.platform) return null;
            const r = this.doc.cookie || '';
            return (
              r !== this.lastCookieString &&
                (this.parseCount++,
                (this.lastToken = iy(r, this.cookieName)),
                (this.lastCookieString = r)),
              this.lastToken
            );
          }
        }
        return (
          ((e = t).ɵfac = function (r) {
            return new (r || e)(le(sr), le(Yr), le(Ry));
          }),
          (e.ɵprov = ve({ token: e, factory: e.ɵfac })),
          t
        );
      })();
      function fA(e, t) {
        const n = e.url.toLowerCase();
        if (
          !De(r_) ||
          'GET' === e.method ||
          'HEAD' === e.method ||
          n.startsWith('http://') ||
          n.startsWith('https://')
        )
          return t(e);
        const r = De(Oy).getToken(),
          o = De(Py);
        return (
          null != r &&
            !e.headers.has(o) &&
            (e = e.clone({ headers: e.headers.set(o, r) })),
          t(e)
        );
      }
      var Sr = (function (e) {
        return (
          (e[(e.Interceptors = 0)] = 'Interceptors'),
          (e[(e.LegacyInterceptors = 1)] = 'LegacyInterceptors'),
          (e[(e.CustomXsrfConfiguration = 2)] = 'CustomXsrfConfiguration'),
          (e[(e.NoXsrfProtection = 3)] = 'NoXsrfProtection'),
          (e[(e.JsonpSupport = 4)] = 'JsonpSupport'),
          (e[(e.RequestsMadeViaParent = 5)] = 'RequestsMadeViaParent'),
          (e[(e.Fetch = 6)] = 'Fetch'),
          e
        );
      })(Sr || {});
      function io(e, t) {
        return { ɵkind: e, ɵproviders: t };
      }
      function pA(...e) {
        const t = [
          XT,
          xy,
          Ay,
          { provide: Fc, useExisting: Ay },
          { provide: Lc, useExisting: xy },
          { provide: Oi, useValue: fA, multi: !0 },
          { provide: r_, useValue: !0 },
          { provide: Oy, useClass: _A },
        ];
        for (const n of e) t.push(...n.ɵproviders);
        return su(t);
      }
      const Fy = new Z('LEGACY_INTERCEPTOR_FN');
      let hA = (() => {
        var e;
        class t {}
        return (
          ((e = t).ɵfac = function (r) {
            return new (r || e)();
          }),
          (e.ɵmod = Io({ type: e })),
          (e.ɵinj = qr({
            providers: [
              pA(
                io(Sr.LegacyInterceptors, [
                  { provide: Fy, useFactory: oA },
                  { provide: Oi, useExisting: Fy, multi: !0 },
                ])
              ),
            ],
          })),
          t
        );
      })();
      class DA extends ik {
        constructor() {
          super(...arguments), (this.supportsDOMEvents = !0);
        }
      }
      class o_ extends DA {
        static makeCurrent() {
          !(function sk(e) {
            Od || (Od = e);
          })(new o_());
        }
        onAndCancel(t, n, r) {
          return (
            t.addEventListener(n, r),
            () => {
              t.removeEventListener(n, r);
            }
          );
        }
        dispatchEvent(t, n) {
          t.dispatchEvent(n);
        }
        remove(t) {
          t.parentNode && t.parentNode.removeChild(t);
        }
        createElement(t, n) {
          return (n = n || this.getDefaultDocument()).createElement(t);
        }
        createHtmlDocument() {
          return document.implementation.createHTMLDocument('fakeTitle');
        }
        getDefaultDocument() {
          return document;
        }
        isElementNode(t) {
          return t.nodeType === Node.ELEMENT_NODE;
        }
        isShadowRoot(t) {
          return t instanceof DocumentFragment;
        }
        getGlobalEventTarget(t, n) {
          return 'window' === n
            ? window
            : 'document' === n
            ? t
            : 'body' === n
            ? t.body
            : null;
        }
        getBaseHref(t) {
          const n = (function EA() {
            return (
              (Fi = Fi || document.querySelector('base')),
              Fi ? Fi.getAttribute('href') : null
            );
          })();
          return null == n
            ? null
            : (function CA(e) {
                (Vc = Vc || document.createElement('a')),
                  Vc.setAttribute('href', e);
                const t = Vc.pathname;
                return '/' === t.charAt(0) ? t : `/${t}`;
              })(n);
        }
        resetBaseElement() {
          Fi = null;
        }
        getUserAgent() {
          return window.navigator.userAgent;
        }
        getCookie(t) {
          return iy(document.cookie, t);
        }
      }
      let Vc,
        Fi = null,
        SA = (() => {
          var e;
          class t {
            build() {
              return new XMLHttpRequest();
            }
          }
          return (
            ((e = t).ɵfac = function (r) {
              return new (r || e)();
            }),
            (e.ɵprov = ve({ token: e, factory: e.ɵfac })),
            t
          );
        })();
      const s_ = new Z('EventManagerPlugins');
      let Ly = (() => {
        var e;
        class t {
          constructor(r, o) {
            (this._zone = o),
              (this._eventNameToPlugin = new Map()),
              r.forEach((i) => {
                i.manager = this;
              }),
              (this._plugins = r.slice().reverse());
          }
          addEventListener(r, o, i) {
            return this._findPluginFor(o).addEventListener(r, o, i);
          }
          getZone() {
            return this._zone;
          }
          _findPluginFor(r) {
            let o = this._eventNameToPlugin.get(r);
            if (o) return o;
            if (((o = this._plugins.find((a) => a.supports(r))), !o))
              throw new U(5101, !1);
            return this._eventNameToPlugin.set(r, o), o;
          }
        }
        return (
          ((e = t).ɵfac = function (r) {
            return new (r || e)(le(s_), le(Qe));
          }),
          (e.ɵprov = ve({ token: e, factory: e.ɵfac })),
          t
        );
      })();
      class jy {
        constructor(t) {
          this._doc = t;
        }
      }
      const i_ = 'ng-app-id';
      let Hy = (() => {
        var e;
        class t {
          constructor(r, o, i, a = {}) {
            (this.doc = r),
              (this.appId = o),
              (this.nonce = i),
              (this.platformId = a),
              (this.styleRef = new Map()),
              (this.hostNodes = new Set()),
              (this.styleNodesInDOM = this.collectServerRenderedStyles()),
              (this.platformIsServer = gy(a)),
              this.resetHostNodes();
          }
          addStyles(r) {
            for (const o of r)
              1 === this.changeUsageCount(o, 1) && this.onStyleAdded(o);
          }
          removeStyles(r) {
            for (const o of r)
              this.changeUsageCount(o, -1) <= 0 && this.onStyleRemoved(o);
          }
          ngOnDestroy() {
            const r = this.styleNodesInDOM;
            r && (r.forEach((o) => o.remove()), r.clear());
            for (const o of this.getAllStyles()) this.onStyleRemoved(o);
            this.resetHostNodes();
          }
          addHost(r) {
            this.hostNodes.add(r);
            for (const o of this.getAllStyles()) this.addStyleToHost(r, o);
          }
          removeHost(r) {
            this.hostNodes.delete(r);
          }
          getAllStyles() {
            return this.styleRef.keys();
          }
          onStyleAdded(r) {
            for (const o of this.hostNodes) this.addStyleToHost(o, r);
          }
          onStyleRemoved(r) {
            const o = this.styleRef;
            o.get(r)?.elements?.forEach((i) => i.remove()), o.delete(r);
          }
          collectServerRenderedStyles() {
            const r = this.doc.head?.querySelectorAll(
              `style[${i_}="${this.appId}"]`
            );
            if (r?.length) {
              const o = new Map();
              return (
                r.forEach((i) => {
                  null != i.textContent && o.set(i.textContent, i);
                }),
                o
              );
            }
            return null;
          }
          changeUsageCount(r, o) {
            const i = this.styleRef;
            if (i.has(r)) {
              const a = i.get(r);
              return (a.usage += o), a.usage;
            }
            return i.set(r, { usage: o, elements: [] }), o;
          }
          getStyleElement(r, o) {
            const i = this.styleNodesInDOM,
              a = i?.get(o);
            if (a?.parentNode === r)
              return i.delete(o), a.removeAttribute(i_), a;
            {
              const u = this.doc.createElement('style');
              return (
                this.nonce && u.setAttribute('nonce', this.nonce),
                (u.textContent = o),
                this.platformIsServer && u.setAttribute(i_, this.appId),
                u
              );
            }
          }
          addStyleToHost(r, o) {
            const i = this.getStyleElement(r, o);
            r.appendChild(i);
            const a = this.styleRef,
              u = a.get(o)?.elements;
            u ? u.push(i) : a.set(o, { elements: [i], usage: 1 });
          }
          resetHostNodes() {
            const r = this.hostNodes;
            r.clear(), r.add(this.doc.head);
          }
        }
        return (
          ((e = t).ɵfac = function (r) {
            return new (r || e)(le(sr), le(_u), le(jp, 8), le(Yr));
          }),
          (e.ɵprov = ve({ token: e, factory: e.ɵfac })),
          t
        );
      })();
      const a_ = {
          svg: 'http://www.w3.org/2000/svg',
          xhtml: 'http://www.w3.org/1999/xhtml',
          xlink: 'http://www.w3.org/1999/xlink',
          xml: 'http://www.w3.org/XML/1998/namespace',
          xmlns: 'http://www.w3.org/2000/xmlns/',
          math: 'http://www.w3.org/1998/MathML/',
        },
        c_ = /%COMP%/g,
        AA = new Z('RemoveStylesOnCompDestroy', {
          providedIn: 'root',
          factory: () => !1,
        });
      function By(e, t) {
        return t.map((n) => n.replace(c_, e));
      }
      let $y = (() => {
        var e;
        class t {
          constructor(r, o, i, a, u, d, f, p = null) {
            (this.eventManager = r),
              (this.sharedStylesHost = o),
              (this.appId = i),
              (this.removeStylesOnCompDestroy = a),
              (this.doc = u),
              (this.platformId = d),
              (this.ngZone = f),
              (this.nonce = p),
              (this.rendererByCompId = new Map()),
              (this.platformIsServer = gy(d)),
              (this.defaultRenderer = new l_(r, u, f, this.platformIsServer));
          }
          createRenderer(r, o) {
            if (!r || !o) return this.defaultRenderer;
            this.platformIsServer &&
              o.encapsulation === gn.ShadowDom &&
              (o = { ...o, encapsulation: gn.Emulated });
            const i = this.getOrCreateRenderer(r, o);
            return (
              i instanceof qy
                ? i.applyToHost(r)
                : i instanceof u_ && i.applyStyles(),
              i
            );
          }
          getOrCreateRenderer(r, o) {
            const i = this.rendererByCompId;
            let a = i.get(o.id);
            if (!a) {
              const u = this.doc,
                d = this.ngZone,
                f = this.eventManager,
                p = this.sharedStylesHost,
                m = this.removeStylesOnCompDestroy,
                w = this.platformIsServer;
              switch (o.encapsulation) {
                case gn.Emulated:
                  a = new qy(f, p, o, this.appId, m, u, d, w);
                  break;
                case gn.ShadowDom:
                  return new PA(f, p, r, o, u, d, this.nonce, w);
                default:
                  a = new u_(f, p, o, m, u, d, w);
              }
              i.set(o.id, a);
            }
            return a;
          }
          ngOnDestroy() {
            this.rendererByCompId.clear();
          }
        }
        return (
          ((e = t).ɵfac = function (r) {
            return new (r || e)(
              le(Ly),
              le(Hy),
              le(_u),
              le(AA),
              le(sr),
              le(Yr),
              le(Qe),
              le(jp)
            );
          }),
          (e.ɵprov = ve({ token: e, factory: e.ɵfac })),
          t
        );
      })();
      class l_ {
        constructor(t, n, r, o) {
          (this.eventManager = t),
            (this.doc = n),
            (this.ngZone = r),
            (this.platformIsServer = o),
            (this.data = Object.create(null)),
            (this.destroyNode = null);
        }
        destroy() {}
        createElement(t, n) {
          return n
            ? this.doc.createElementNS(a_[n] || n, t)
            : this.doc.createElement(t);
        }
        createComment(t) {
          return this.doc.createComment(t);
        }
        createText(t) {
          return this.doc.createTextNode(t);
        }
        appendChild(t, n) {
          (Uy(t) ? t.content : t).appendChild(n);
        }
        insertBefore(t, n, r) {
          t && (Uy(t) ? t.content : t).insertBefore(n, r);
        }
        removeChild(t, n) {
          t && t.removeChild(n);
        }
        selectRootElement(t, n) {
          let r = 'string' == typeof t ? this.doc.querySelector(t) : t;
          if (!r) throw new U(-5104, !1);
          return n || (r.textContent = ''), r;
        }
        parentNode(t) {
          return t.parentNode;
        }
        nextSibling(t) {
          return t.nextSibling;
        }
        setAttribute(t, n, r, o) {
          if (o) {
            n = o + ':' + n;
            const i = a_[o];
            i ? t.setAttributeNS(i, n, r) : t.setAttribute(n, r);
          } else t.setAttribute(n, r);
        }
        removeAttribute(t, n, r) {
          if (r) {
            const o = a_[r];
            o ? t.removeAttributeNS(o, n) : t.removeAttribute(`${r}:${n}`);
          } else t.removeAttribute(n);
        }
        addClass(t, n) {
          t.classList.add(n);
        }
        removeClass(t, n) {
          t.classList.remove(n);
        }
        setStyle(t, n, r, o) {
          o & (vr.DashCase | vr.Important)
            ? t.style.setProperty(n, r, o & vr.Important ? 'important' : '')
            : (t.style[n] = r);
        }
        removeStyle(t, n, r) {
          r & vr.DashCase ? t.style.removeProperty(n) : (t.style[n] = '');
        }
        setProperty(t, n, r) {
          t[n] = r;
        }
        setValue(t, n) {
          t.nodeValue = n;
        }
        listen(t, n, r) {
          if (
            'string' == typeof t &&
            !(t = Fd().getGlobalEventTarget(this.doc, t))
          )
            throw new Error(`Unsupported event target ${t} for event ${n}`);
          return this.eventManager.addEventListener(
            t,
            n,
            this.decoratePreventDefault(r)
          );
        }
        decoratePreventDefault(t) {
          return (n) => {
            if ('__ngUnwrap__' === n) return t;
            !1 ===
              (this.platformIsServer
                ? this.ngZone.runGuarded(() => t(n))
                : t(n)) && n.preventDefault();
          };
        }
      }
      function Uy(e) {
        return 'TEMPLATE' === e.tagName && void 0 !== e.content;
      }
      class PA extends l_ {
        constructor(t, n, r, o, i, a, u, d) {
          super(t, i, a, d),
            (this.sharedStylesHost = n),
            (this.hostEl = r),
            (this.shadowRoot = r.attachShadow({ mode: 'open' })),
            this.sharedStylesHost.addHost(this.shadowRoot);
          const f = By(o.id, o.styles);
          for (const p of f) {
            const m = document.createElement('style');
            u && m.setAttribute('nonce', u),
              (m.textContent = p),
              this.shadowRoot.appendChild(m);
          }
        }
        nodeOrShadowRoot(t) {
          return t === this.hostEl ? this.shadowRoot : t;
        }
        appendChild(t, n) {
          return super.appendChild(this.nodeOrShadowRoot(t), n);
        }
        insertBefore(t, n, r) {
          return super.insertBefore(this.nodeOrShadowRoot(t), n, r);
        }
        removeChild(t, n) {
          return super.removeChild(this.nodeOrShadowRoot(t), n);
        }
        parentNode(t) {
          return this.nodeOrShadowRoot(
            super.parentNode(this.nodeOrShadowRoot(t))
          );
        }
        destroy() {
          this.sharedStylesHost.removeHost(this.shadowRoot);
        }
      }
      class u_ extends l_ {
        constructor(t, n, r, o, i, a, u, d) {
          super(t, i, a, u),
            (this.sharedStylesHost = n),
            (this.removeStylesOnCompDestroy = o),
            (this.styles = d ? By(d, r.styles) : r.styles);
        }
        applyStyles() {
          this.sharedStylesHost.addStyles(this.styles);
        }
        destroy() {
          this.removeStylesOnCompDestroy &&
            this.sharedStylesHost.removeStyles(this.styles);
        }
      }
      class qy extends u_ {
        constructor(t, n, r, o, i, a, u, d) {
          const f = o + '-' + r.id;
          super(t, n, r, i, a, u, d, f),
            (this.contentAttr = (function NA(e) {
              return '_ngcontent-%COMP%'.replace(c_, e);
            })(f)),
            (this.hostAttr = (function xA(e) {
              return '_nghost-%COMP%'.replace(c_, e);
            })(f));
        }
        applyToHost(t) {
          this.applyStyles(), this.setAttribute(t, this.hostAttr, '');
        }
        createElement(t, n) {
          const r = super.createElement(t, n);
          return super.setAttribute(r, this.contentAttr, ''), r;
        }
      }
      const zy = ['alt', 'control', 'meta', 'shift'],
        FA = {
          '\b': 'Backspace',
          '\t': 'Tab',
          '\x7f': 'Delete',
          '\x1b': 'Escape',
          Del: 'Delete',
          Esc: 'Escape',
          Left: 'ArrowLeft',
          Right: 'ArrowRight',
          Up: 'ArrowUp',
          Down: 'ArrowDown',
          Menu: 'ContextMenu',
          Scroll: 'ScrollLock',
          Win: 'OS',
        },
        LA = {
          alt: (e) => e.altKey,
          control: (e) => e.ctrlKey,
          meta: (e) => e.metaKey,
          shift: (e) => e.shiftKey,
        };
      function Gy(e) {
        return {
          appProviders: [...zA, ...(e?.providers ?? [])],
          platformProviders: UA,
        };
      }
      const UA = [
          { provide: Yr, useValue: 'browser' },
          {
            provide: Lp,
            useValue: function VA() {
              o_.makeCurrent();
            },
            multi: !0,
          },
          {
            provide: sr,
            useFactory: function $A() {
              return (
                (function JD(e) {
                  Yl = e;
                })(document),
                document
              );
            },
            deps: [],
          },
        ],
        zA = [
          { provide: cu, useValue: 'root' },
          {
            provide: Xr,
            useFactory: function BA() {
              return new Xr();
            },
            deps: [],
          },
          {
            provide: s_,
            useClass: (() => {
              var e;
              class t extends jy {
                constructor(r) {
                  super(r);
                }
                supports(r) {
                  return !0;
                }
                addEventListener(r, o, i) {
                  return (
                    r.addEventListener(o, i, !1),
                    () => this.removeEventListener(r, o, i)
                  );
                }
                removeEventListener(r, o, i) {
                  return r.removeEventListener(o, i);
                }
              }
              return (
                ((e = t).ɵfac = function (r) {
                  return new (r || e)(le(sr));
                }),
                (e.ɵprov = ve({ token: e, factory: e.ɵfac })),
                t
              );
            })(),
            multi: !0,
            deps: [sr, Qe, Yr],
          },
          {
            provide: s_,
            useClass: (() => {
              var e;
              class t extends jy {
                constructor(r) {
                  super(r);
                }
                supports(r) {
                  return null != t.parseEventName(r);
                }
                addEventListener(r, o, i) {
                  const a = t.parseEventName(o),
                    u = t.eventCallback(a.fullKey, i, this.manager.getZone());
                  return this.manager
                    .getZone()
                    .runOutsideAngular(() =>
                      Fd().onAndCancel(r, a.domEventName, u)
                    );
                }
                static parseEventName(r) {
                  const o = r.toLowerCase().split('.'),
                    i = o.shift();
                  if (0 === o.length || ('keydown' !== i && 'keyup' !== i))
                    return null;
                  const a = t._normalizeKey(o.pop());
                  let u = '',
                    d = o.indexOf('code');
                  if (
                    (d > -1 && (o.splice(d, 1), (u = 'code.')),
                    zy.forEach((p) => {
                      const m = o.indexOf(p);
                      m > -1 && (o.splice(m, 1), (u += p + '.'));
                    }),
                    (u += a),
                    0 != o.length || 0 === a.length)
                  )
                    return null;
                  const f = {};
                  return (f.domEventName = i), (f.fullKey = u), f;
                }
                static matchEventFullKeyCode(r, o) {
                  let i = FA[r.key] || r.key,
                    a = '';
                  return (
                    o.indexOf('code.') > -1 && ((i = r.code), (a = 'code.')),
                    !(null == i || !i) &&
                      ((i = i.toLowerCase()),
                      ' ' === i ? (i = 'space') : '.' === i && (i = 'dot'),
                      zy.forEach((u) => {
                        u !== i && (0, LA[u])(r) && (a += u + '.');
                      }),
                      (a += i),
                      a === o)
                  );
                }
                static eventCallback(r, o, i) {
                  return (a) => {
                    t.matchEventFullKeyCode(a, r) && i.runGuarded(() => o(a));
                  };
                }
                static _normalizeKey(r) {
                  return 'esc' === r ? 'escape' : r;
                }
              }
              return (
                ((e = t).ɵfac = function (r) {
                  return new (r || e)(le(sr));
                }),
                (e.ɵprov = ve({ token: e, factory: e.ɵfac })),
                t
              );
            })(),
            multi: !0,
            deps: [sr],
          },
          $y,
          Hy,
          Ly,
          { provide: zp, useExisting: $y },
          { provide: hy, useClass: SA, deps: [] },
          [],
        ];
      typeof window < 'u' && window;
      var oe = ot(9671),
        ue = ot(6551);
      const Ky = new Z('SDK'),
        eN = (function XA(e, t) {
          const n = { value: void 0 };
          return [
            {
              provide: fw,
              useValue:
                ((r = (0, oe.Z)(function* () {
                  n.value = yield t();
                })),
                function () {
                  return r.apply(this, arguments);
                }),
              multi: !0,
            },
            {
              provide: e,
              useFactory: () => {
                if (!De(hc).done)
                  throw new Error(
                    `Cannot inject ${e} until bootstrap is complete.`
                  );
                return n.value;
              },
            },
          ];
          var r;
        })(
          Ky,
          (function () {
            var e = (0, oe.Z)(function* () {
              return (
                (yield (0, ue.ZP)('assets/casper_rust_wasm_sdk_bg.wasm')) &&
                new ue.Bq()
              );
            });
            return function () {
              return e.apply(this, arguments);
            };
          })()
        );
      let tN = (() => {
        var e;
        class t {}
        return (
          ((e = t).ɵfac = function (r) {
            return new (r || e)();
          }),
          (e.ɵmod = Io({ type: e })),
          (e.ɵinj = qr({ providers: eN, imports: [xi] })),
          t
        );
      })();
      const Yy = new Z('EnvironmentConfig'),
        Qy = new Z('EnvironmentConfig'),
        eb = new Z('highlight');
      var rN = ot(6666),
        oN = ot.n(rN);
      let tb = (() => {
        var e;
        class t {
          constructor(r) {
            this.highlightWebworkerFactory = r;
          }
          highlightMessage(r) {
            var o = this;
            return (0, oe.Z)(function* () {
              o.activateWorker();
              const i =
                o.hightlightWebworker &&
                (yield o.hightlightWebworker.postMessage(r).catch((a) => {
                  console.error(a);
                }));
              return o.terminateWorker(), i;
            })();
          }
          activateWorker() {
            if (this.webworker) return;
            const r = this.highlightWebworkerFactory();
            (this.webworker = r[0]), (this.hightlightWebworker = r[1]);
          }
          terminateWorker() {
            this.webworker &&
              (this.webworker.terminate(), delete this.webworker);
          }
        }
        return (
          ((e = t).ɵfac = function (r) {
            return new (r || e)(le(eb));
          }),
          (e.ɵprov = ve({ token: e, factory: e.ɵfac, providedIn: 'root' })),
          t
        );
      })();
      const sN = {
        provide: eb,
        useValue: function () {
          const e = new Worker(ot.tu(new URL(ot.p + ot.u(434), ot.b)), {
            name: 'highlight.worker',
            type: void 0,
          });
          return [e, new (oN())(e)];
        },
      };
      let iN = (() => {
          var e;
          class t {}
          return (
            ((e = t).ɵfac = function (r) {
              return new (r || e)();
            }),
            (e.ɵmod = Io({ type: e })),
            (e.ɵinj = qr({ providers: [sN, tb], imports: [xi] })),
            t
          );
        })(),
        __ = (() => {
          var e;
          class t {
            constructor(r, o) {
              (this.highlightService = r),
                (this.document = o),
                (this.result = new Tr()),
                (this.window = this.document.defaultView);
            }
            getResult() {
              return this.result.asObservable();
            }
            setResult(r) {
              var o = this;
              return (0, oe.Z)(function* () {
                const i = r,
                  a = yield o.highlightService.highlightMessage(i),
                  u = 'string' == typeof r;
                o.result.next({
                  result: u ? i : JSON.stringify(i),
                  resultHtml: u ? i : a,
                });
              })();
            }
            copyClipboard(r) {
              this.window?.navigator.clipboard
                .writeText(r)
                .catch((o) => console.error(o));
            }
          }
          return (
            ((e = t).ɵfac = function (r) {
              return new (r || e)(le(tb), le(sr));
            }),
            (e.ɵprov = ve({ token: e, factory: e.ɵfac, providedIn: 'root' })),
            t
          );
        })();
      const aN = ['resultElt'],
        cN = ['codeElt'];
      function lN(e, t) {
        if (
          (1 & e &&
            (zs(),
            vl(),
            M(0, 'div', 12, 13)(2, 'div', 14),
            Se(3, 'code', 15, 16),
            R()()),
          2 & e)
        ) {
          const n = J(2);
          j(3), V('innerHtml', n.resultHtml, ru);
        }
      }
      function uN(e, t) {
        if (1 & e) {
          const n = xt();
          M(0, 'div', 1)(1, 'div', 2)(2, 'span'),
            zs(),
            M(3, 'svg', 3),
            Ce('click', function () {
              bt(n);
              const o = J();
              return vt(o.copy(o.result));
            }),
            Se(4, 'rect', 4)(5, 'path', 5),
            R()(),
            vl(),
            M(6, 'span', 6),
            Ce('click', function () {
              return bt(n), vt(J().reset());
            }),
            zs(),
            M(7, 'svg', 7),
            Se(8, 'path', 8)(9, 'path', 9)(10, 'path', 10),
            R()()(),
            ee(11, lN, 5, 1, 'div', 11),
            R();
        }
        if (2 & e) {
          const n = J();
          j(11), V('ngIf', n.resultHtml);
        }
      }
      let nb = (() => {
        var e;
        class t {
          constructor(r, o) {
            (this.resultService = r), (this.changeDetectorRef = o);
          }
          ngAfterViewInit() {
            this.getResultSubscription = this.resultService
              .getResult()
              .subscribe((r) => {
                (this.result = r.result),
                  (this.resultHtml = r.resultHtml),
                  this.changeDetectorRef.markForCheck();
              });
          }
          ngOnDestroy() {
            this.getResultSubscription &&
              this.getResultSubscription.unsubscribe();
          }
          copy(r) {
            this.resultService.copyClipboard((0, ue.vj)(JSON.parse(r), 1));
          }
          reset() {
            (this.result = ''),
              (this.resultHtml = ''),
              this.resultService.setResult('');
          }
        }
        return (
          ((e = t).ɵfac = function (r) {
            return new (r || e)(ne(__), ne(Td));
          }),
          (e.ɵcmp = sl({
            type: e,
            selectors: [['comp-result']],
            viewQuery: function (r, o) {
              if ((1 & r && (fe(aN, 5), fe(cN, 5, Qr)), 2 & r)) {
                let i;
                _e((i = pe())) && (o.resultElt = i.first),
                  _e((i = pe())) && (o.contentChildren = i.first);
              }
            },
            standalone: !0,
            features: [sd],
            decls: 1,
            vars: 1,
            consts: [
              ['class', 'row', 4, 'ngIf'],
              [1, 'row'],
              [
                1,
                'col-xs-12',
                'd-flex',
                'flex-row',
                'justify-content-between',
                'mb-2',
              ],
              [
                'viewBox',
                '0 0 24 24',
                'fill',
                'none',
                'stroke',
                'currentColor',
                'stroke-width',
                '2',
                'stroke-linecap',
                'round',
                'stroke-linejoin',
                'round',
                1,
                'shrink-0',
                'ml-2',
                'w-5',
                'min-w-5',
                'text-gray-500',
                'cursor-pointer',
                3,
                'click',
              ],
              [
                'x',
                '9',
                'y',
                '9',
                'width',
                '13',
                'height',
                '13',
                'rx',
                '2',
                'ry',
                '2',
              ],
              ['d', 'M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1'],
              ['e2e-id', 'clear result', 3, 'click'],
              [
                'xmlns',
                'http://www.w3.org/2000/svg',
                'width',
                '16',
                'height',
                '16',
                'fill',
                'currentColor',
                'viewBox',
                '0 0 16 16',
                1,
                'bi',
                'bi-journal-x',
                'cursor-pointer',
              ],
              [
                'fill-rule',
                'evenodd',
                'd',
                'M6.146 6.146a.5.5 0 0 1 .708 0L8 7.293l1.146-1.147a.5.5 0 1 1 .708.708L8.707 8l1.147 1.146a.5.5 0 0 1-.708.708L8 8.707 6.854 9.854a.5.5 0 0 1-.708-.708L7.293 8 6.146 6.854a.5.5 0 0 1 0-.708z',
              ],
              [
                'd',
                'M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z',
              ],
              [
                'd',
                'M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z',
              ],
              ['class', 'col-xs-12', 4, 'ngIf'],
              [1, 'col-xs-12'],
              ['resultElt', ''],
              [1, 'card'],
              [
                'e2e-id',
                'result',
                1,
                'card-body',
                2,
                'white-space',
                'pre-wrap',
                3,
                'innerHtml',
              ],
              ['codeElt', ''],
            ],
            template: function (r, o) {
              1 & r && ee(0, uN, 12, 1, 'div', 0), 2 & r && V('ngIf', o.result);
            },
            dependencies: [xi, Wd, iN],
            changeDetection: 0,
          })),
          t
        );
      })();
      const dN = ['selectKeyElt'],
        _N = ['blockIdentifierHeightElt'],
        fN = ['blockIdentifierHashElt'],
        pN = ['purseUrefElt'],
        gN = ['stateRootHashElt'],
        hN = ['finalizedApprovalsElt'],
        mN = ['deployHashElt'],
        wN = ['purseIdentifierElt'],
        yN = ['itemKeyElt'],
        bN = ['seedUrefElt'],
        vN = ['seedAccounttHashElt'],
        DN = ['seedContractHashElt'],
        EN = ['seedNameElt'],
        CN = ['seedKeyElt'],
        IN = ['queryKeyElt'],
        SN = ['queryPathElt'],
        MN = ['accountIdentifierElt'],
        kN = ['publicKeyElt'],
        TN = ['privateKeyElt'],
        AN = ['TTLElt'],
        NN = ['transferAmountElt'],
        xN = ['targetAccountElt'],
        RN = ['entryPointElt'],
        PN = ['argsSimpleElt'],
        ON = ['argsJsonElt'],
        FN = ['sessionHashElt'],
        LN = ['sessionNameElt'],
        jN = ['versionElt'],
        HN = ['callPackageElt'],
        VN = ['deployJsonElt'],
        BN = ['paymentAmountElt'],
        $N = ['selectDictIdentifierElt'],
        UN = ['wasmElt'],
        qN = ['deployFileElt'],
        zN = ['selectNetworkElt'];
      function GN(e, t) {
        if ((1 & e && (M(0, 'option', 43), $(1), R()), 2 & e)) {
          const n = t.$implicit,
            r = J();
          V('value', n.name)('selected', n.node_address === r.node_address),
            j(1),
            cc(' ', n.name, ' (', n.node_address, ') ');
        }
      }
      function WN(e, t) {
        if ((1 & e && (M(0, 'option', 43), $(1), R()), 2 & e)) {
          const n = t.$implicit,
            r = J(2);
          V('value', r.changePort(n))(
            'selected',
            r.changePort(n) === r.node_address
          ),
            j(1),
            cc(' ', r.changePort(n), ' (', r.chain_name, ') ');
        }
      }
      function JN(e, t) {
        if (
          (1 & e && (M(0, 'optgroup', 44), ee(1, WN, 2, 4, 'option', 12), R()),
          2 & e)
        ) {
          const n = J();
          j(1), V('ngForOf', n.peers);
        }
      }
      function ZN(e, t) {
        if (1 & e) {
          const n = xt();
          M(0, 'div', 45)(1, 'span', 46),
            $(2),
            R(),
            M(3, 'button', 47),
            Ce('click', function () {
              return bt(n), vt(J().get_state_root_hash(!0));
            }),
            $(4, ' Refresh '),
            R()();
        }
        if (2 & e) {
          const n = J();
          j(2), rt('state root hash is ', n.state_root_hash, '');
        }
      }
      function KN(e, t) {
        if ((1 & e && (M(0, 'div', 48)(1, 'span', 49), $(2), R()()), 2 & e)) {
          const n = J();
          j(2), rt('account hash is ', n.account_hash, '');
        }
      }
      function YN(e, t) {
        if ((1 & e && (M(0, 'div', 48)(1, 'span', 50), $(2), R()()), 2 & e)) {
          const n = J();
          j(2), rt('main purse is ', n.main_purse, '');
        }
      }
      function QN(e, t) {
        if ((1 & e && (M(0, 'option', 43), $(1), R()), 2 & e)) {
          const n = t.$implicit,
            r = J();
          V('value', n)('selected', r.action === n), j(1), rt(' ', n, ' ');
        }
      }
      function XN(e, t) {
        if ((1 & e && (M(0, 'option', 43), $(1), R()), 2 & e)) {
          const n = t.$implicit,
            r = J();
          V('value', n)('selected', r.action === n), j(1), rt(' ', n, ' ');
        }
      }
      function ex(e, t) {
        if ((1 & e && (M(0, 'option', 43), $(1), R()), 2 & e)) {
          const n = t.$implicit,
            r = J();
          V('value', n)('selected', r.action === n), j(1), rt(' ', n, ' ');
        }
      }
      function tx(e, t) {
        if ((1 & e && (M(0, 'option', 51), $(1), R()), 2 & e)) {
          const n = t.$implicit;
          V('value', n), j(1), rt(' ', n, ' ');
        }
      }
      function nx(e, t) {
        if (1 & e) {
          const n = xt();
          M(0, 'button', 52),
            Ce('click', function () {
              bt(n);
              const o = J();
              return vt(o.submitAction(o.action));
            }),
            $(1, ' Go '),
            R();
        }
      }
      function rx(e, t) {
        if (1 & e) {
          const n = xt();
          M(0, 'button', 53),
            Ce('click', function () {
              return bt(n), vt(J().onPrivateKeyClick());
            }),
            $(1, ' Load Private Key '),
            R();
        }
      }
      function ox(e, t) {
        if (1 & e) {
          const n = xt();
          M(0, 'button', 54),
            Ce('click', function () {
              return bt(n), vt(J().onPrivateKeyClick());
            }),
            $(1, ' Private Key Loaded '),
            R();
        }
      }
      function sx(e, t) {
        if (
          (1 & e &&
            (M(0, 'div', 68)(1, 'label', 69),
            $(2, 'Account identifier'),
            R(),
            M(3, 'div', 59),
            Se(4, 'input', 70, 71),
            M(6, 'label', 69),
            $(7, 'e.g. Public Key, AccountHash'),
            R()()()),
          2 & e)
        ) {
          const n = J(2);
          j(4), V('value', n.account_identifier || '');
        }
      }
      function ix(e, t) {
        if (
          (1 & e &&
            (M(0, 'div', 55)(1, 'form', 56),
            Ce('submit', function () {
              return !1;
            }),
            M(2, 'div', 57)(3, 'label', 58),
            $(4, 'Block Height'),
            R(),
            M(5, 'div', 59),
            Se(6, 'input', 60, 61),
            M(8, 'label', 58),
            $(9),
            R()()(),
            M(10, 'div', 62)(11, 'label', 63),
            $(12, 'Block Hash'),
            R(),
            M(13, 'div', 59),
            Se(14, 'input', 64, 65),
            M(16, 'label', 58),
            $(17),
            R()()(),
            M(18, 'div', 66),
            ee(19, sx, 8, 1, 'div', 67),
            R()()()),
          2 & e)
        ) {
          const n = J();
          j(6),
            V('value', n.block_identifier_height || '')(
              'placeholder',
              n.block_identifier_height_default
            ),
            j(3),
            rt('e.g. ', n.block_identifier_height_default, ''),
            j(5),
            V('value', n.block_identifier_hash || '')(
              'placeholder',
              n.block_identifier_hash_default
            ),
            j(3),
            rt('e.g. ', n.block_identifier_hash_default, ''),
            j(2),
            V('ngIf', 'get_account' === n.action);
        }
      }
      function ax(e, t) {
        if (
          (1 & e &&
            (M(0, 'div', 72)(1, 'label', 77),
            $(2, 'Purse Uref '),
            R(),
            M(3, 'div', 59),
            Se(4, 'input', 78, 79),
            M(6, 'label', 77),
            $(7),
            R()()()),
          2 & e)
        ) {
          const n = J(2);
          j(4),
            sc('placeholder', 'e.g. ', n.main_purse || 'uref-0x', ''),
            V('value', n.purse_uref || n.main_purse || ''),
            j(3),
            rt('e.g. ', n.main_purse || 'uref-0x', '');
        }
      }
      function cx(e, t) {
        if (
          (1 & e &&
            (M(0, 'div', 72)(1, 'label', 80),
            $(2, 'Purse Identifier '),
            R(),
            M(3, 'div', 59),
            Se(4, 'input', 81, 82),
            M(6, 'label', 80),
            $(7, 'e.g. Public Key, AccountHash, Purse URef'),
            R()()()),
          2 & e)
        ) {
          const n = J(2);
          j(4),
            V(
              'value',
              n.purse_identifier ||
                n.main_purse ||
                n.public_key ||
                n.account_hash ||
                ''
            );
        }
      }
      function lx(e, t) {
        if (
          (1 & e &&
            (M(0, 'div', 55)(1, 'form', 56),
            Ce('submit', function () {
              return !1;
            }),
            M(2, 'div', 72)(3, 'label', 73),
            $(4, 'State Root Hash '),
            R(),
            M(5, 'div', 59),
            Se(6, 'input', 74, 75),
            M(8, 'label', 73),
            $(9),
            R()()(),
            ee(10, ax, 8, 3, 'div', 76),
            ee(11, cx, 8, 1, 'div', 76),
            R()()),
          2 & e)
        ) {
          const n = J();
          j(6),
            V('placeholder', n.state_root_hash),
            j(3),
            rt('e.g. ', n.state_root_hash, ''),
            j(1),
            V('ngIf', 'get_balance' === n.action),
            j(1),
            V('ngIf', 'query_balance' === n.action);
        }
      }
      function ux(e, t) {
        if (1 & e) {
          const n = xt();
          M(0, 'div', 85)(1, 'div', 14)(2, 'div', 86)(3, 'div', 7)(
            4,
            'label',
            20
          ),
            $(5, 'Dictionary identifier'),
            R(),
            M(6, 'select', 87, 88),
            Ce('change', function () {
              bt(n);
              const o = un(7);
              return vt((J(2).select_dict_identifier = o.value));
            }),
            M(8, 'option', 89),
            $(9, ' From Dictionary Uref '),
            R(),
            M(10, 'option', 90),
            $(11, ' From Contract Info '),
            R(),
            M(12, 'option', 91),
            $(13, ' From Account Info '),
            R(),
            M(14, 'option', 92),
            $(15, ' From Dictionary Key '),
            R()()()()()();
        }
        if (2 & e) {
          const n = J(2);
          j(6),
            V('value', n.select_dict_identifier || ''),
            j(2),
            V('selected', 'newFromSeedUref' === n.select_dict_identifier),
            j(2),
            V('selected', 'newFromContractInfo' === n.select_dict_identifier),
            j(2),
            V('selected', 'newFromAccountInfo' === n.select_dict_identifier),
            j(2),
            V('selected', 'newFromDictionaryKey' === n.select_dict_identifier);
        }
      }
      function dx(e, t) {
        if (
          (1 & e &&
            (M(0, 'div', 72)(1, 'label', 93),
            $(2, 'Dictionary Uref '),
            R(),
            M(3, 'div', 59),
            Se(4, 'input', 94, 95),
            M(6, 'label', 93),
            $(7, 'e.g. uref-0x'),
            R()()()),
          2 & e)
        ) {
          const n = J(3);
          j(4), V('value', n.seed_uref || '');
        }
      }
      function _x(e, t) {
        if (
          (1 & e &&
            (M(0, 'div', 72)(1, 'label', 96),
            $(2, 'Account Hash'),
            R(),
            M(3, 'div', 59),
            Se(4, 'input', 97, 98),
            M(6, 'label', 96),
            $(7, 'e.g. account-hash-0x'),
            R()()()),
          2 & e)
        ) {
          const n = J(3);
          j(4), V('value', n.seed_account_hash || '');
        }
      }
      function fx(e, t) {
        if (
          (1 & e &&
            (M(0, 'div', 72)(1, 'label', 99),
            $(2, 'Contract Hash'),
            R(),
            M(3, 'div', 59),
            Se(4, 'input', 100, 101),
            M(6, 'label', 99),
            $(7, 'e.g. hash-0x'),
            R()()()),
          2 & e)
        ) {
          const n = J(3);
          j(4), V('value', n.seed_contract_hash || '');
        }
      }
      function px(e, t) {
        if (
          (1 & e &&
            (M(0, 'div', 72)(1, 'label', 102),
            $(2, 'Dictionary Key'),
            R(),
            M(3, 'div', 59),
            Se(4, 'input', 103, 104),
            M(6, 'label', 102),
            $(7, 'e.g. dictionary-0x'),
            R()()()),
          2 & e)
        ) {
          const n = J(3);
          j(4), V('value', n.seed_key || '');
        }
      }
      function gx(e, t) {
        if (
          (1 & e &&
            (M(0, 'div', 72)(1, 'label', 105),
            $(2, 'Dictionary Name'),
            R(),
            M(3, 'div', 59),
            Se(4, 'input', 106, 107),
            M(6, 'label', 105),
            $(7, 'e.g. events'),
            R()()()),
          2 & e)
        ) {
          const n = J(3);
          j(4), V('value', n.seed_name || '');
        }
      }
      function hx(e, t) {
        if (
          (1 & e &&
            (M(0, 'div', 72)(1, 'label', 108),
            $(2, 'Dictionary Item key '),
            R(),
            M(3, 'div', 59),
            Se(4, 'input', 109, 110),
            M(6, 'label', 108),
            $(7, 'e.g. Item key string'),
            R()()()),
          2 & e)
        ) {
          const n = J(3);
          j(4), V('value', n.item_key || '')('placeholder', n.item_key);
        }
      }
      const mx = function () {
        return ['newFromContractInfo', 'newFromAccountInfo'];
      };
      function wx(e, t) {
        if (
          (1 & e &&
            (ls(0),
            ee(1, dx, 8, 1, 'div', 76),
            ee(2, _x, 8, 1, 'div', 76),
            ee(3, fx, 8, 1, 'div', 76),
            ee(4, px, 8, 1, 'div', 76),
            ee(5, gx, 8, 1, 'div', 76),
            ee(6, hx, 8, 2, 'div', 76),
            us()),
          2 & e)
        ) {
          const n = J(2);
          j(1),
            V(
              'ngIf',
              !!n.selectDictIdentifierElt &&
                'newFromSeedUref' === n.select_dict_identifier
            ),
            j(1),
            V(
              'ngIf',
              !!n.selectDictIdentifierElt &&
                'newFromAccountInfo' === n.select_dict_identifier
            ),
            j(1),
            V(
              'ngIf',
              'newFromContractInfo' === n.select_dict_identifier ||
                'query_contract_dict' === n.action
            ),
            j(1),
            V(
              'ngIf',
              !!n.selectDictIdentifierElt &&
                'newFromDictionaryKey' === n.select_dict_identifier
            ),
            j(1),
            V(
              'ngIf',
              at(6, mx).includes(n.select_dict_identifier) ||
                'query_contract_dict' === n.action
            ),
            j(1),
            V('ngIf', 'newFromDictionaryKey' !== n.select_dict_identifier);
        }
      }
      function yx(e, t) {
        if (
          (1 & e &&
            (ls(0),
            M(1, 'div', 72)(2, 'label', 111),
            $(3),
            R(),
            M(4, 'div', 59),
            Se(5, 'input', 112, 113),
            M(7, 'label', 111),
            $(8),
            R()()(),
            M(9, 'div', 72)(10, 'label', 114),
            $(11, 'Path'),
            R(),
            M(12, 'div', 59),
            Se(13, 'input', 115, 116),
            M(15, 'label', 114),
            $(16, 'e.g. counter/count'),
            R()()(),
            us()),
          2 & e)
        ) {
          const n = J(2);
          j(3),
            no('query_global_state' === n.action ? 'Key' : 'Contract Hash'),
            j(2),
            V('value', n.query_key || '')(
              'placeholder',
              'query_global_state' === n.action
                ? 'e.g. uref-0x || hash-0x || account-hash-0x'
                : 'e.g. hash-0x'
            ),
            j(3),
            no(
              'query_global_state' === n.action
                ? 'e.g. uref-0x || hash-0x || account-hash-0x'
                : 'e.g. hash-0x'
            ),
            j(5),
            V('value', n.query_path || '');
        }
      }
      const bx = function () {
          return ['get_dictionary_item'];
        },
        vx = function () {
          return ['get_dictionary_item', 'query_contract_dict'];
        },
        Dx = function () {
          return ['query_global_state', 'query_contract_key'];
        };
      function Ex(e, t) {
        if (
          (1 & e &&
            (M(0, 'div', 55)(1, 'form', 56),
            Ce('submit', function () {
              return !1;
            }),
            ee(2, ux, 16, 5, 'div', 83),
            ee(3, wx, 7, 7, 'ng-container', 84),
            ee(4, yx, 17, 5, 'ng-container', 84),
            R()()),
          2 & e)
        ) {
          const n = J();
          j(2),
            V('ngIf', at(3, bx).includes(n.action)),
            j(1),
            V('ngIf', at(4, vx).includes(n.action)),
            j(1),
            V('ngIf', at(5, Dx).includes(n.action));
        }
      }
      function Cx(e, t) {
        if (
          (1 & e &&
            (M(0, 'div', 55)(1, 'form', 56),
            Ce('submit', function () {
              return !1;
            }),
            M(2, 'div', 117)(3, 'label', 118),
            $(4, 'Deploy Hash '),
            R(),
            M(5, 'div', 59),
            Se(6, 'input', 119, 120),
            M(8, 'label', 73),
            $(9, 'e.g. 0x'),
            R()()(),
            M(10, 'div', 121)(11, 'label', 122),
            $(12, 'Finalized approvals'),
            R(),
            M(13, 'div'),
            Se(14, 'input', 123, 124),
            R()()()()),
          2 & e)
        ) {
          const n = J();
          j(6),
            V('value', n.deploy_hash || ''),
            j(8),
            V('checked', n.finalized_approvals)(
              'value',
              n.finalized_approvals || ''
            );
        }
      }
      function Ix(e, t) {
        if (1 & e) {
          const n = xt();
          M(0, 'button', 53),
            Ce('click', function () {
              return bt(n), vt(J(2).deployFileClick());
            }),
            $(1, ' Load deploy file '),
            R();
        }
      }
      function Sx(e, t) {
        if (1 & e) {
          const n = xt();
          M(0, 'div', 55)(1, 'form', 56),
            Ce('submit', function () {
              return !1;
            }),
            M(2, 'div', 121)(3, 'input', 125, 126),
            Ce('change', function (o) {
              return bt(n), vt(J().onDeployFileSelected(o));
            }),
            R(),
            ee(5, Ix, 2, 0, 'button', 37),
            R(),
            M(6, 'div', 15)(7, 'div', 127)(8, 'textarea', 128, 129),
            $(10, '          '),
            R(),
            M(11, 'label', 130),
            $(12, 'Deploy as Json string'),
            R()()()()();
        }
        if (2 & e) {
          const n = J();
          j(5),
            V('ngIf', !n.file_name),
            j(3),
            V('innerHTML', n.deploy_json || '', ru);
        }
      }
      function Mx(e, t) {
        if ((1 & e && (M(0, 'span', 141), $(1), R()), 2 & e)) {
          J();
          const n = un(6),
            r = J(2);
          j(1), rt('(', r.motesToCSPR(n), ' CSPR)');
        }
      }
      function kx(e, t) {
        if (1 & e) {
          const n = xt();
          M(0, 'div', 121)(1, 'label', 136),
            $(2, 'Transfer Amount '),
            ee(3, Mx, 2, 1, 'span', 137),
            R(),
            M(4, 'div', 59)(5, 'input', 138, 139),
            Ce('change', function () {
              bt(n);
              const o = un(6);
              return vt(J(2).motesToCSPR(o));
            }),
            R(),
            M(7, 'label', 140),
            $(8),
            R()()();
        }
        if (2 & e) {
          const n = un(6),
            r = J(2);
          j(3),
            V('ngIf', n.value),
            j(2),
            V('value', r.transfer_amount || '')(
              'placeholder',
              r.config.minimum_transfer
            ),
            j(3),
            rt('e.g. ', r.config.minimum_transfer, '');
        }
      }
      function Tx(e, t) {
        if ((1 & e && (M(0, 'span', 141), $(1), R()), 2 & e)) {
          J();
          const n = un(6),
            r = J(2);
          j(1), rt('(', r.motesToCSPR(n), ' CSPR)');
        }
      }
      function Ax(e, t) {
        if (1 & e) {
          const n = xt();
          M(0, 'div', 142)(1, 'label', 136),
            $(2, 'Payment Amount '),
            ee(3, Tx, 2, 1, 'span', 137),
            R(),
            M(4, 'div', 59)(5, 'input', 143, 144),
            Ce('change', function () {
              bt(n);
              const o = un(6);
              return vt(J(2).motesToCSPR(o));
            }),
            R()()();
        }
        if (2 & e) {
          const n = un(6),
            r = J(2);
          j(3), V('ngIf', n.value), j(2), V('value', r.payment_amount || '');
        }
      }
      function Nx(e, t) {
        if (
          (1 & e &&
            (M(0, 'div', 145)(1, 'label', 146),
            $(2, 'TTL'),
            R(),
            M(3, 'div', 59),
            Se(4, 'input', 147, 148),
            M(6, 'label', 146),
            $(7),
            R()()()),
          2 & e)
        ) {
          const n = J(2);
          j(4),
            V('value', n.ttl || n.config.TTL)('placeholder', n.config.TTL),
            j(3),
            rt('e.g. ', n.config.TTL, '');
        }
      }
      function xx(e, t) {
        if (
          (1 & e &&
            (M(0, 'div', 117)(1, 'label', 149),
            $(2, 'Target Account'),
            R(),
            M(3, 'div', 59),
            Se(4, 'input', 150, 151),
            M(6, 'label', 58),
            $(7, 'e.g. Public Key, AccountHash, Purse URef'),
            R()()()),
          2 & e)
        ) {
          const n = J(2);
          j(4), V('value', n.target_account || '');
        }
      }
      function Rx(e, t) {
        if (1 & e) {
          const n = xt();
          M(0, 'button', 53),
            Ce('click', function () {
              return bt(n), vt(J(3).onWasmClick());
            }),
            $(1, ' Wasm Module Bytes '),
            R();
        }
      }
      function Px(e, t) {
        if (1 & e) {
          const n = xt();
          M(0, 'span', 155),
            Ce('click', function () {
              return bt(n), vt(J(3).resetWasmClick());
            }),
            $(1),
            zs(),
            M(2, 'svg', 156),
            Se(3, 'path', 157),
            R()();
        }
        if (2 & e) {
          const n = J(3);
          j(1), rt(' ', n.file_name, ' ');
        }
      }
      function Ox(e, t) {
        if (1 & e) {
          const n = xt();
          M(0, 'div', 117)(1, 'div', 121)(2, 'input', 152, 153),
            Ce('change', function (o) {
              return bt(n), vt(J(2).onWasmSelected(o));
            }),
            R(),
            ee(4, Rx, 2, 0, 'button', 37),
            ee(5, Px, 4, 1, 'span', 154),
            R()();
        }
        if (2 & e) {
          const n = J(2);
          j(4), V('ngIf', !n.file_name), j(1), V('ngIf', n.file_name);
        }
      }
      function Fx(e, t) {
        if (
          (1 & e &&
            (ls(0),
            M(1, 'div', 72)(2, 'label', 165),
            $(3, 'Smart Contract hash or Package hash'),
            R(),
            M(4, 'div', 59)(5, 'input', 166, 167),
            Ce('change', function () {
              return !0;
            }),
            R(),
            M(7, 'label', 165),
            $(8, 'e.g. Contract Hash or Package Hash'),
            R()()(),
            M(9, 'div', 121)(10, 'label', 168),
            $(11, 'Call Package'),
            R(),
            M(12, 'div'),
            Se(13, 'input', 169, 170),
            R()(),
            M(15, 'div', 171)(16, 'label', 172),
            $(17, 'Version'),
            R(),
            M(18, 'div', 59),
            Se(19, 'input', 173, 174),
            M(21, 'label', 172),
            $(22, 'e.g.1, empty for last version'),
            R()()(),
            M(23, 'div', 72)(24, 'label', 175),
            $(25, 'Smart Contract name or Package name'),
            R(),
            M(26, 'div', 59)(27, 'input', 176, 177),
            Ce('change', function () {
              return !0;
            }),
            R(),
            M(29, 'label', 175),
            $(30, 'e.g. Counter'),
            R()()(),
            M(31, 'div', 86)(32, 'label', 178),
            $(33, 'Entry point'),
            R(),
            M(34, 'div', 59),
            Se(35, 'input', 179, 180),
            M(37, 'label', 178),
            $(38, 'e.g. counter_inc'),
            R()()(),
            us()),
          2 & e)
        ) {
          const n = un(6),
            r = un(28),
            o = J(3);
          j(5),
            V('value', o.session_hash || '')(
              'disabled',
              !!r.value || (o.file_name && 'call_entrypoint' !== o.action)
            ),
            j(8),
            V('checked', o.call_package)('value', o.call_package || '')(
              'disabled',
              o.file_name && 'call_entrypoint' !== o.action
            ),
            j(6),
            V('value', o.version || '')(
              'disabled',
              o.file_name && 'call_entrypoint' !== o.action
            ),
            j(8),
            V('value', o.session_name || '')(
              'disabled',
              !!n.value || (o.file_name && 'call_entrypoint' !== o.action)
            ),
            j(8),
            V('value', o.entry_point || '')(
              'disabled',
              o.file_name && 'call_entrypoint' !== o.action
            );
        }
      }
      function Lx(e, t) {
        if (
          (1 & e &&
            (M(0, 'div', 158),
            ee(1, Fx, 39, 11, 'ng-container', 84),
            M(2, 'div', 72)(3, 'label', 159),
            $(4, 'Args'),
            R(),
            M(5, 'div', 59)(6, 'input', 160, 161),
            Ce('change', function () {
              return !0;
            }),
            R(),
            M(8, 'label', 159),
            $(9, "e.g. foo:Bool='true', bar:String='value'"),
            R()()(),
            M(10, 'div', 72)(11, 'label', 162),
            $(12, 'Args Json'),
            R(),
            M(13, 'div', 59)(14, 'input', 163, 164),
            Ce('change', function () {
              return !0;
            }),
            R(),
            M(16, 'label', 162),
            $(17, 'e.g. [{ "name": "foo", "type": "U256", "value": 1 }]'),
            R()()()()),
          2 & e)
        ) {
          const n = un(7),
            r = un(15),
            o = J(2);
          j(1),
            V(
              'ngIf',
              'install' !== o.action &&
                (!o.file_name || 'call_entrypoint' === o.action)
            ),
            j(5),
            V('value', o.args_simple || '')('disabled', !!r.value),
            j(8),
            V('value', o.args_json || '')('disabled', !!n.value);
        }
      }
      const rb = function () {
          return ['make_transfer', 'transfer', 'speculative_transfer'];
        },
        ob = function () {
          return [
            'make_deploy',
            'deploy',
            'speculative_deploy',
            'call_entrypoint',
            'install',
          ];
        },
        jx = function () {
          return [
            'make_transfer',
            'make_deploy',
            'transfer',
            'deploy',
            'speculative_transfer',
            'speculative_deploy',
            'install',
          ];
        },
        Hx = function () {
          return ['make_deploy', 'deploy', 'install', 'speculative_deploy'];
        };
      function Vx(e, t) {
        if (
          (1 & e &&
            (M(0, 'div', 55)(1, 'form', 56),
            Ce('submit', function () {
              return !1;
            }),
            ee(2, kx, 9, 4, 'div', 131),
            ee(3, Ax, 7, 2, 'div', 132),
            ee(4, Nx, 8, 3, 'div', 133),
            ee(5, xx, 8, 1, 'div', 134),
            ee(6, Ox, 6, 2, 'div', 134),
            ee(7, Lx, 18, 5, 'div', 135),
            R()()),
          2 & e)
        ) {
          const n = J();
          j(2),
            V('ngIf', at(6, rb).includes(n.action)),
            j(1),
            V('ngIf', at(7, ob).includes(n.action)),
            j(1),
            V('ngIf', at(8, jx).includes(n.action)),
            j(1),
            V('ngIf', at(9, rb).includes(n.action)),
            j(1),
            V('ngIf', at(10, Hx).includes(n.action)),
            j(1),
            V('ngIf', at(11, ob).includes(n.action));
        }
      }
      function Bx(e, t) {
        if (1 & e) {
          const n = xt();
          M(0, 'div', 181)(1, 'div', 145)(2, 'button', 182),
            Ce('click', function () {
              bt(n);
              const o = J();
              return vt(o.submitAction(o.action));
            }),
            $(3, ' Sign '),
            R()()();
        }
      }
      function $x(e, t) {
        if (
          (1 & e && (M(0, 'section', 183)(1, 'pre', 184), $(2), R()()), 2 & e)
        ) {
          const n = J();
          j(2), no(n.error);
        }
      }
      const sb = function () {
          return ['sign_deploy'];
        },
        Ux = function () {
          return [
            'get_block',
            'get_block_transfers',
            'get_era_info',
            'get_era_summary',
            'get_account',
            'speculative_exec',
            'speculative_deploy',
            'speculative_transfer',
            'query_balance',
            'query_global_state',
            'get_state_root_hash',
          ];
        },
        qx = function () {
          return [
            'get_balance',
            'query_balance',
            'query_global_state',
            'query_contract_dict',
            'query_contract_key',
            'get_dictionary_item',
          ];
        },
        zx = function () {
          return [
            'get_dictionary_item',
            'query_global_state',
            'query_contract_dict',
            'query_contract_key',
          ];
        },
        Gx = function () {
          return ['put_deploy', 'sign_deploy', 'speculative_exec'];
        },
        Wx = function () {
          return [
            'make_transfer',
            'make_deploy',
            'transfer',
            'deploy',
            'speculative_transfer',
            'speculative_deploy',
            'call_entrypoint',
            'install',
          ];
        };
      let Jx = (() => {
        var e;
        class t {
          constructor(r, o, i, a, u) {
            (this.sdk = r),
              (this.config = o),
              (this.env = i),
              (this.resultService = a),
              (this.changeDetectorRef = u),
              (this.title = 'Casper client'),
              (this.verbosity = ue.HE.High),
              (this.node_address = this.env.node_address.toString()),
              (this.block_identifier_height_default =
                this.config.block_identifier_height_default.toString()),
              (this.block_identifier_hash_default =
                this.config.block_identifier_hash.toString()),
              (this.finalized_approvals = !0),
              (this.select_dict_identifier = 'newFromContractInfo'),
              (this.call_package = !1),
              (this.chain_name = this.env.chain_name.toString()),
              (this.network = {
                name: 'default',
                node_address: this.env.node_address.toString(),
                chain_name: this.env.chain_name.toString(),
              });
          }
          ngOnInit() {
            var r = this;
            return (0, oe.Z)(function* () {
              console.info(r.sdk),
                (r.sdk_methods = Object.getOwnPropertyNames(
                  Object.getPrototypeOf(r.sdk)
                )
                  .filter((o) => 'function' == typeof r.sdk[o])
                  .filter(
                    (o) =>
                      !['free', 'constructor', '__destroy_into_raw'].includes(o)
                  )
                  .filter((o) => !o.endsWith('_options'))
                  .filter((o) => !o.startsWith('chain_'))
                  .filter((o) => !o.startsWith('state_'))
                  .filter((o) => !o.startsWith('info_'))
                  .filter((o) => !o.startsWith('account'))
                  .sort()),
                (r.sdk_deploy_methods = r.sdk_methods.filter((o) =>
                  [
                    'deploy',
                    'speculative_deploy',
                    'speculative_transfer',
                    'transfer',
                  ].includes(o)
                )),
                (r.sdk_deploy_utils_methods = r.sdk_methods.filter((o) =>
                  [
                    'make_deploy',
                    'make_transfer',
                    'sign_deploy',
                    'put_deploy',
                  ].includes(o)
                )),
                (r.sdk_contract_methods = r.sdk_methods.filter((o) =>
                  [
                    'call_entrypoint',
                    'install',
                    'query_contract_dict',
                    'query_contract_key',
                  ].includes(o)
                )),
                (r.sdk_rpc_methods = r.sdk_methods.filter(
                  (o) =>
                    !r.sdk_deploy_methods
                      .concat(
                        r.sdk_deploy_utils_methods,
                        r.sdk_contract_methods
                      )
                      .includes(o)
                ));
            })();
          }
          selectNetwork() {
            let r = this.selectNetworkElt.nativeElement.value;
            if (((r = r && this.networks.find((o) => o.name == r)), !r)) {
              const o = this.selectNetworkElt.nativeElement.value;
              o && (this.node_address = o);
            }
            (this.network = r),
              (this.chain_name = r.chain_name),
              (this.node_address = r.node_address);
          }
          get_peers() {
            var r = this;
            return (0, oe.Z)(function* () {
              try {
                const o = yield r.sdk.get_peers(r.node_address, r.verbosity);
                o && r.resultService.setResult(o.toJson()),
                  o && (r.peers = o.peers);
              } catch (o) {
                o && (r.error = o.toString());
              }
            })();
          }
          get_node_status() {
            var r = this;
            return (0, oe.Z)(function* () {
              const o = yield r.sdk.get_node_status(
                r.node_address,
                r.verbosity
              );
              return o && r.resultService.setResult(o.toJson()), o;
            })();
          }
          get_state_root_hash(r) {
            var o = this;
            return (0, oe.Z)(function* () {
              const i = o.sdk.get_state_root_hash_options({
                node_address: o.node_address,
              });
              if (i)
                if (r) {
                  const a = yield o.sdk.get_state_root_hash(i);
                  (o.state_root_hash = a.state_root_hash_as_string),
                    o.changeDetectorRef.markForCheck();
                } else {
                  o.getIdentifieBlock(i);
                  const a = yield o.sdk.get_state_root_hash(i);
                  o.state_root_hash && o.resultService.setResult(a.toJson());
                }
            })();
          }
          get_account(r) {
            var o = this;
            return (0, oe.Z)(function* () {
              let i;
              if (
                ((i =
                  r ||
                  (o.accountIdentifierElt &&
                    o.accountIdentifierElt.nativeElement.value
                      .toString()
                      .trim())),
                !i)
              )
                return;
              const a = o.sdk.get_account_options({
                node_address: o.node_address,
                verbosity: o.verbosity,
                account_identifier_as_string: i,
              });
              if (!a) return;
              o.getIdentifieBlock(a);
              const u = yield o.sdk.get_account(a);
              return r || (u && o.resultService.setResult(u.toJson())), u;
            })();
          }
          onPublicKeyChange() {
            var r = this;
            return (0, oe.Z)(function* () {
              const o =
                r.publicKeyElt &&
                r.publicKeyElt.nativeElement.value.toString().trim();
              (r.account_hash = ''), (r.main_purse = '');
              const i = yield r.get_account(o);
              o !== r.public_key &&
                ((r.public_key = o),
                (r.private_key = ''),
                (r.has_private_key = !1),
                (r.privateKeyElt.nativeElement.value = '')),
                (r.account_hash = i?.account.account_hash),
                (r.main_purse = i?.account.main_purse),
                r.changeDetectorRef.markForCheck();
            })();
          }
          get_auction_info() {
            var r = this;
            return (0, oe.Z)(function* () {
              try {
                const o = r.sdk.get_auction_info_options({
                  node_address: r.node_address,
                  verbosity: r.verbosity,
                });
                r.getIdentifieBlock(o);
                const i = yield r.sdk.get_auction_info(o);
                i && r.resultService.setResult(i.toJson());
              } catch (o) {
                o && (r.error = o.toString());
              }
            })();
          }
          install() {
            var r = this;
            return (0, oe.Z)(function* () {
              const o =
                r.paymentAmountElt &&
                r.paymentAmountElt.nativeElement.value.toString().trim();
              if (!(o && r.public_key && r.private_key && r._wasm?.buffer))
                return;
              const a = new ue.hZ(r.chain_name, r.public_key, r.private_key),
                u = r.get_session_params();
              try {
                const d = yield r.sdk.install(r.node_address, a, u, o);
                d && r.resultService.setResult(d.toJson());
              } catch (d) {
                console.error(d), d && (r.error = d.toString());
              }
            })();
          }
          get_balance() {
            var r = this;
            return (0, oe.Z)(function* () {
              const o =
                  r.purseUrefElt &&
                  r.purseUrefElt.nativeElement.value.toString().trim(),
                i =
                  r.stateRootHashElt &&
                  r.stateRootHashElt.nativeElement.value.toString().trim();
              if (o)
                try {
                  const a = r.sdk.get_balance_options({
                      node_address: r.node_address,
                      state_root_hash_as_string: i || '',
                      purse_uref_as_string: o,
                      verbosity: r.verbosity,
                    }),
                    u = yield r.sdk.get_balance(a);
                  u && r.resultService.setResult(u.toJson());
                } catch (a) {
                  console.error(a), a && (r.error = a.toString());
                }
            })();
          }
          get_block_transfers() {
            var r = this;
            return (0, oe.Z)(function* () {
              try {
                const o = r.sdk.get_block_transfers_options({
                  node_address: r.node_address,
                  verbosity: r.verbosity,
                });
                r.getIdentifieBlock(o);
                const i = yield r.sdk.get_block_transfers(o);
                i && r.resultService.setResult(i.toJson());
              } catch (o) {
                o && (r.error = o.toString());
              }
            })();
          }
          get_block() {
            var r = this;
            return (0, oe.Z)(function* () {
              try {
                const o = r.sdk.get_block_options({
                  node_address: r.node_address,
                  verbosity: r.verbosity,
                });
                r.getIdentifieBlock(o);
                const i = yield r.sdk.get_block(o);
                i && r.resultService.setResult(i.toJson());
              } catch (o) {
                o && (r.error = o.toString());
              }
            })();
          }
          submitAction(r) {
            var o = this;
            return (0, oe.Z)(function* () {
              yield o.handleAction(r, !0), o.changeDetectorRef.markForCheck();
            })();
          }
          get_chainspec() {
            var r = this;
            return (0, oe.Z)(function* () {
              try {
                const o = yield r.sdk.get_chainspec(
                    r.node_address,
                    r.verbosity
                  ),
                  i = (0, ue.rR)(o?.chainspec_bytes.chainspec_bytes);
                i && r.resultService.setResult(i);
              } catch (o) {
                o && (r.error = o.toString());
              }
            })();
          }
          get_deploy() {
            var r = this;
            return (0, oe.Z)(function* () {
              const o =
                  r.finalizedApprovalsElt &&
                  r.finalizedApprovalsElt.nativeElement.value,
                i =
                  r.deployHashElt &&
                  r.deployHashElt.nativeElement.value.toString().trim();
              if (!i) return;
              const a = r.sdk.get_deploy_options({
                node_address: r.node_address,
                verbosity: r.verbosity,
              });
              (a.deploy_hash = new ue.Wf(i)), (a.finalized_approvals = o);
              try {
                const u = yield r.sdk.get_deploy(a);
                u && r.resultService.setResult(u.toJson());
              } catch (u) {
                u && (r.error = u.toString());
              }
            })();
          }
          get_dictionary_item() {
            var r = this;
            return (0, oe.Z)(function* () {
              const o =
                  r.stateRootHashElt &&
                  r.stateRootHashElt.nativeElement.value.toString().trim(),
                i =
                  r.itemKeyElt &&
                  r.itemKeyElt.nativeElement.value.toString().trim(),
                a =
                  r.seedKeyElt &&
                  r.seedKeyElt.nativeElement.value.toString().trim();
              if (!i && !a) return;
              const u =
                r.seedUrefElt &&
                r.seedUrefElt.nativeElement.value.toString().trim();
              let d;
              if (u && 'newFromSeedUref' === r.select_dict_identifier)
                d = ue.Tz.newFromSeedUref(u, i);
              else if (a && 'newFromDictionaryKey' === r.select_dict_identifier)
                d = ue.Tz.newFromDictionaryKey(a);
              else {
                const p =
                    r.seedContractHashElt &&
                    r.seedContractHashElt.nativeElement.value.toString().trim(),
                  m =
                    r.seedAccounttHashElt &&
                    r.seedAccounttHashElt.nativeElement.value.toString().trim(),
                  w =
                    r.seedNameElt &&
                    r.seedNameElt.nativeElement.value.toString().trim();
                if (!w) return;
                p && 'newFromContractInfo' === r.select_dict_identifier
                  ? (d = ue.Tz.newFromContractInfo(p, w, i))
                  : m &&
                    'newFromAccountInfo' === r.select_dict_identifier &&
                    (d = ue.Tz.newFromAccountInfo(m, w, i));
              }
              if (!d) return;
              const f = r.sdk.get_dictionary_item_options({
                node_address: r.node_address,
                verbosity: r.verbosity,
                state_root_hash_as_string: o || '',
              });
              f.dictionary_item_identifier = d;
              try {
                const p = yield r.sdk.state_get_dictionary_item(f);
                p && r.resultService.setResult(p.toJson());
              } catch (p) {
                p && (r.error = p.toString());
              }
            })();
          }
          get_era_info() {
            var r = this;
            return (0, oe.Z)(function* () {
              const o = r.sdk.get_era_info_options({
                node_address: r.node_address,
                verbosity: r.verbosity,
              });
              r.getIdentifieBlock(o);
              try {
                const i = yield r.sdk.get_era_info(o);
                i && r.resultService.setResult(i.toJson());
              } catch (i) {
                i && (r.error = i.toString());
              }
            })();
          }
          get_era_summary() {
            var r = this;
            return (0, oe.Z)(function* () {
              const o = r.sdk.get_era_summary_options({
                node_address: r.node_address,
                verbosity: r.verbosity,
              });
              r.getIdentifieBlock(o);
              try {
                const i = yield r.sdk.get_era_summary(o);
                i && r.resultService.setResult(i.toJson());
              } catch (i) {
                i && (r.error = i.toString());
              }
            })();
          }
          get_validator_changes() {
            var r = this;
            return (0, oe.Z)(function* () {
              try {
                const o = yield r.sdk.get_validator_changes(
                  r.node_address,
                  r.verbosity
                );
                o && r.resultService.setResult(o.toJson());
              } catch (o) {
                o && (r.error = o.toString());
              }
            })();
          }
          list_rpcs() {
            var r = this;
            return (0, oe.Z)(function* () {
              try {
                const o = yield r.sdk.list_rpcs(r.node_address, r.verbosity);
                o && r.resultService.setResult(o.toJson());
              } catch (o) {
                o && (r.error = o.toString());
              }
            })();
          }
          query_balance() {
            var r = this;
            return (0, oe.Z)(function* () {
              const o =
                r.purseIdentifierElt &&
                r.purseIdentifierElt.nativeElement.value.toString().trim();
              if (!o) return;
              const i = r.sdk.query_balance_options({
                node_address: r.node_address,
                purse_identifier_as_string: o,
                verbosity: r.verbosity,
              });
              r.getGlobalIdentifier(i);
              try {
                const a = yield r.sdk.query_balance(i);
                a && r.resultService.setResult(a.balance);
              } catch (a) {
                a && (r.error = a.toString());
              }
            })();
          }
          query_global_state() {
            var r = this;
            return (0, oe.Z)(function* () {
              const o =
                  r.queryPathElt &&
                  r.queryPathElt.nativeElement.value
                    .toString()
                    .trim()
                    .replace(/^\/+|\/+$/g, ''),
                i =
                  r.queryKeyElt &&
                  r.queryKeyElt.nativeElement.value.toString().trim();
              if (!i) return;
              const a = r.sdk.query_global_state_options({
                node_address: r.node_address,
                key_as_string: i,
                path_as_string: o,
                verbosity: ue.HE.High,
              });
              r.getGlobalIdentifier(a);
              try {
                const u = yield r.sdk.query_global_state(a);
                u && r.resultService.setResult(u.toJson());
              } catch (u) {
                u && (r.error = u.toString());
              }
            })();
          }
          deploy(r = !0, o) {
            var i = this;
            return (0, oe.Z)(function* () {
              const a = (0, ue.u3)(),
                u = i.TTLElt && i.TTLElt.nativeElement.value.toString().trim();
              if (!i.public_key) return;
              const d = new ue.hZ(
                  i.chain_name,
                  i.public_key,
                  i.private_key,
                  a,
                  u
                ),
                f = new ue.Jf(),
                p =
                  i.paymentAmountElt &&
                  i.paymentAmountElt.nativeElement.value.toString().trim();
              if (!p) return;
              f.payment_amount = p;
              const m = i.get_session_params();
              let w;
              if (o) {
                const b = {
                  maybe_block_id_as_string: void 0,
                  maybe_block_identifier: void 0,
                };
                i.getIdentifieBlock(b);
                const {
                  maybe_block_id_as_string: C,
                  maybe_block_identifier: T,
                } = b;
                w = yield i.sdk.speculative_deploy(
                  i.node_address,
                  d,
                  m,
                  f,
                  C,
                  T
                );
              } else w = r ? yield i.sdk.deploy(i.node_address, d, m, f) : i.sdk.make_deploy(d, m, f);
              if (w) {
                const b = w.toJson();
                (i.deploy_json = (0, ue.vj)(b, ue.HE.High)),
                  i.deploy_json && i.resultService.setResult(b);
              }
              return w;
            })();
          }
          transfer(r = !0, o) {
            var i = this;
            return (0, oe.Z)(function* () {
              const a = (0, ue.u3)(),
                u = i.TTLElt && i.TTLElt.nativeElement.value.toString().trim();
              if (!i.public_key) return;
              const d = new ue.hZ(
                  i.chain_name,
                  i.public_key,
                  i.private_key,
                  a,
                  u
                ),
                f = new ue.Jf();
              f.payment_amount = i.config.gas_fee_transfer.toString();
              const p =
                  i.transferAmountElt &&
                  i.transferAmountElt.nativeElement.value.toString().trim(),
                m =
                  i.targetAccountElt &&
                  i.targetAccountElt.nativeElement.value.toString().trim();
              if (!p || !m) return;
              let w;
              if (o) {
                const b = {
                  maybe_block_id_as_string: void 0,
                  maybe_block_identifier: void 0,
                };
                i.getIdentifieBlock(b);
                const {
                  maybe_block_id_as_string: C,
                  maybe_block_identifier: T,
                } = b;
                w = yield i.sdk.speculative_transfer(
                  i.node_address,
                  p,
                  m,
                  void 0,
                  d,
                  f,
                  C,
                  T
                );
              } else w = r ? yield i.sdk.transfer(i.node_address, p, m, void 0, d, f) : yield i.sdk.make_transfer(p, m, void 0, d, f);
              if (w) {
                const b = w.toJson();
                (i.deploy_json = (0, ue.vj)(b, ue.HE.High)),
                  i.deploy_json && i.resultService.setResult(b);
              }
              return w;
            })();
          }
          put_deploy() {
            var r = this;
            return (0, oe.Z)(function* () {
              const o =
                r.deployJsonElt &&
                r.deployJsonElt.nativeElement.value.toString().trim();
              if (!o) return;
              const i = new ue.g1(JSON.parse(o));
              if (!i.isValid())
                return void console.error('Deploy is not valid.');
              if (i.isExpired())
                return void console.error('Deploy is expired.');
              const a = yield r.sdk.put_deploy(r.node_address, i, r.verbosity);
              return a && r.resultService.setResult(a.toJson()), a;
            })();
          }
          speculative_exec() {
            var r = this;
            return (0, oe.Z)(function* () {
              const o =
                r.deployJsonElt &&
                r.deployJsonElt.nativeElement.value.toString().trim();
              if (!o) return;
              const i = new ue.g1(JSON.parse(o));
              if (!i.isValid())
                return void console.error('Deploy is not valid.');
              if (i.isExpired())
                return void console.error('Deploy is expired.');
              const a = r.sdk.speculative_exec_options({
                node_address: r.node_address,
                verbosity: r.verbosity,
                deploy: i.toJson(),
              });
              r.getIdentifieBlock(a);
              const u = yield r.sdk.speculative_exec(a);
              return u && r.resultService.setResult(u.toJson()), u;
            })();
          }
          sign_deploy() {
            var r = this;
            return (0, oe.Z)(function* () {
              if (!r.private_key) return;
              const o =
                r.deployJsonElt &&
                r.deployJsonElt.nativeElement.value.toString().trim();
              if (!o) return;
              let i;
              try {
                i = new ue.g1(JSON.parse(o));
              } catch {
                console.error('Error parsing deploy');
              }
              i &&
                ((i = i.sign(r.private_key)),
                (r.deploy_json = (0, ue.vj)(i.toJson(), ue.HE.High)),
                (r.deployJsonElt.nativeElement.value = r.deploy_json));
            })();
          }
          make_deploy() {
            var r = this;
            return (0, oe.Z)(function* () {
              yield r.deploy(!1);
            })();
          }
          make_transfer() {
            var r = this;
            return (0, oe.Z)(function* () {
              yield r.transfer(!1);
            })();
          }
          speculative_transfer() {
            var r = this;
            return (0, oe.Z)(function* () {
              yield r.transfer(!1, !0);
            })();
          }
          speculative_deploy() {
            var r = this;
            return (0, oe.Z)(function* () {
              yield r.deploy(!1, !0);
            })();
          }
          call_entrypoint() {
            var r = this;
            return (0, oe.Z)(function* () {
              if (!r.public_key || !r.private_key) return;
              const o = new ue.hZ(r.chain_name, r.public_key, r.private_key),
                i = r.get_session_params(),
                a =
                  r.paymentAmountElt &&
                  r.paymentAmountElt.nativeElement.value.toString().trim();
              if (a)
                try {
                  const u = yield r.sdk.call_entrypoint(
                    r.node_address,
                    o,
                    i,
                    a
                  );
                  u && r.resultService.setResult(u.toJson());
                } catch (u) {
                  u && (r.error = u.toString());
                }
            })();
          }
          query_contract_dict() {
            var r = this;
            return (0, oe.Z)(function* () {
              const o =
                  r.stateRootHashElt &&
                  r.stateRootHashElt.nativeElement.value.toString().trim(),
                i =
                  r.itemKeyElt &&
                  r.itemKeyElt.nativeElement.value.toString().trim();
              if (!i) return;
              const a =
                  r.seedContractHashElt &&
                  r.seedContractHashElt.nativeElement.value.toString().trim(),
                u =
                  r.seedNameElt &&
                  r.seedNameElt.nativeElement.value.toString().trim();
              if (!u) return;
              let d;
              if (
                (a && ((d = new ue._R()), d.setContractNamedKey(a, u, i)), !d)
              )
                return;
              const f = r.sdk.query_contract_dict_options({
                node_address: r.node_address,
                verbosity: r.verbosity,
                state_root_hash_as_string: o || '',
              });
              f.dictionary_item_params = d;
              try {
                const p = yield r.sdk.query_contract_dict(f);
                p && r.resultService.setResult(p.toJson());
              } catch (p) {
                p && (r.error = p.toString());
              }
            })();
          }
          query_contract_key() {
            var r = this;
            return (0, oe.Z)(function* () {
              const o =
                  r.stateRootHashElt &&
                  r.stateRootHashElt.nativeElement.value.toString().trim(),
                i =
                  r.queryKeyElt &&
                  r.queryKeyElt.nativeElement.value.toString().trim();
              if (!i) return;
              const a =
                  r.queryPathElt &&
                  r.queryPathElt.nativeElement.value
                    .toString()
                    .trim()
                    .replace(/^\/+|\/+$/g, ''),
                u = r.sdk.query_contract_key_options({
                  node_address: r.node_address,
                  state_root_hash_as_string: o || '',
                  key_as_string: i,
                  path_as_string: a,
                  verbosity: ue.HE.High,
                });
              try {
                const d = yield r.sdk.query_contract_key(u);
                d && r.resultService.setResult(d.toJson());
              } catch (d) {
                d && (r.error = d.toString());
              }
            })();
          }
          ngAfterViewInit() {
            var r = this;
            return (0, oe.Z)(function* () {
              r.networks = Object.entries(r.config.networks).map(([i, a]) => ({
                name: i,
                ...a,
              }));
              try {
                (yield r.get_node_status()) &&
                  (yield r.get_state_root_hash(!0),
                  (r.action = 'get_node_status'));
              } catch (i) {
                console.error(i);
              }
              r.changeDetectorRef.markForCheck();
            })();
          }
          onDeployFileSelected(r) {
            var o = this;
            return (0, oe.Z)(function* () {
              const i = r.target.files?.item(0);
              let a;
              if (i) {
                if (((a = yield i.text()), !a.trim())) return;
                a = a.trim();
                try {
                  const u = JSON.parse(a);
                  o.deploy_json = (0, ue.vj)(new ue.g1(u).toJson(), ue.HE.High);
                } catch {
                  console.error('Error parsing deploy');
                }
              } else o.deploy_json = '';
              o.changeDetectorRef.markForCheck();
            })();
          }
          deployFileClick() {
            this.deployFileElt.nativeElement.click();
          }
          onPrivateKeyClick() {
            this.privateKeyElt.nativeElement.click();
          }
          onWasmClick() {
            this.wasmElt.nativeElement.click();
          }
          resetWasmClick() {
            (this.wasmElt.nativeElement.value = ''),
              (this._wasm = void 0),
              (this.file_name = '');
          }
          cleanResult() {
            (this.error = ''), this.resultService.setResult('');
          }
          selectAction(r) {
            var o = this;
            return (0, oe.Z)(function* () {
              o.cleanResult();
              const i = r.target.value;
              yield o.handleAction(i), o.changeDetectorRef.detectChanges();
            })();
          }
          onWasmSelected(r) {
            var o = this;
            return (0, oe.Z)(function* () {
              o.file_name = o.wasmElt?.nativeElement.value.split('\\').pop();
              const i = r.target.files?.item(0),
                a = yield i?.arrayBuffer();
              (o._wasm = a && new Uint8Array(a)),
                o._wasm?.buffer || o.resetWasmClick();
            })();
          }
          onPemSelected(r) {
            var o = this;
            return (0, oe.Z)(function* () {
              const i = r.target.files?.item(0);
              if (i) {
                let a = yield i.text();
                if (!a.trim()) return;
                (a = a.trim()), (o.public_key = '');
                const u = (0, ue.GD)(a);
                u &&
                  ((o.public_key = u),
                  (o.private_key = a),
                  (o.has_private_key = !0));
              } else (o.private_key = ''), (o.has_private_key = !1), (o.privateKeyElt.nativeElement.value = '');
              o.changeDetectorRef.markForCheck(),
                setTimeout(
                  (0, oe.Z)(function* () {
                    yield o.onPublicKeyChange();
                  }),
                  0
                );
            })();
          }
          handleAction(r, o) {
            var i = this;
            return (0, oe.Z)(function* () {
              const a = i[r];
              'function' == typeof a
                ? (o && (yield a.bind(i).call()), (i.action = r))
                : console.error(`Method ${r} is not defined on the component.`);
            })();
          }
          motesToCSPR(r) {
            let o = r.value;
            if (o)
              return (
                (o = this.parse_commas(o)),
                (r.value = o.toString()),
                (0, ue.HJ)(o)
              );
          }
          parse_commas(r) {
            return r.replace(/[,.]/g, '');
          }
          getGlobalIdentifier(r) {
            const o =
              this.stateRootHashElt &&
              this.stateRootHashElt.nativeElement.value.toString().trim();
            let i;
            if (o) i = ue.CG.fromStateRootHash(new ue.zZ(o));
            else {
              const a =
                  this.blockIdentifierHeightElt &&
                  this.blockIdentifierHeightElt.nativeElement.value
                    .toString()
                    .trim(),
                u =
                  this.blockIdentifierHashElt &&
                  this.blockIdentifierHashElt.nativeElement.value
                    .toString()
                    .trim();
              u
                ? (i = ue.CG.fromBlockHash(new ue.Q6(u)))
                : a && (i = ue.CG.fromBlockHeight(BigInt(a)));
            }
            i && (r.global_state_identifier = i);
          }
          getIdentifieBlock(r) {
            const o =
                this.blockIdentifierHeightElt &&
                this.blockIdentifierHeightElt.nativeElement.value
                  .toString()
                  .trim(),
              i =
                this.blockIdentifierHashElt &&
                this.blockIdentifierHashElt.nativeElement.value
                  .toString()
                  .trim();
            if (i)
              (r.maybe_block_id_as_string = i),
                (r.maybe_block_identifier = void 0);
            else if (o) {
              const a = ue.c.fromHeight(BigInt(o));
              (r.maybe_block_id_as_string = void 0),
                (r.maybe_block_identifier = a);
            } else
              (r.maybe_block_id_as_string = void 0),
                (r.maybe_block_identifier = void 0);
          }
          get_session_params() {
            const r = new ue.B$(),
              o =
                this.entryPointElt &&
                this.entryPointElt.nativeElement.value.toString().trim();
            o && (r.session_entry_point = o);
            const i =
                this.argsSimpleElt &&
                this.argsSimpleElt.nativeElement.value
                  .toString()
                  .trim()
                  .split(',')
                  .map((m) => m.trim())
                  .filter((m) => '' !== m),
              a =
                this.argsJsonElt &&
                this.argsJsonElt.nativeElement.value.toString().trim();
            i?.length
              ? (r.session_args_simple = i)
              : a && (r.session_args_json = a);
            const u =
                this.callPackageElt && this.callPackageElt.nativeElement.value,
              d =
                this.sessionHashElt &&
                this.sessionHashElt.nativeElement.value.toString().trim(),
              f =
                this.sessionNameElt &&
                this.sessionNameElt.nativeElement.value.toString().trim();
            u
              ? d
                ? (r.session_package_hash = d)
                : f && (r.session_package_name = f)
              : d
              ? (r.session_hash = d)
              : f && (r.session_name = f),
              this._wasm &&
                (r.session_bytes = ue.Jj.fromUint8Array(this._wasm));
            const p =
              this.versionElt &&
              this.versionElt.nativeElement.value.toString().trim();
            return p && (r.session_version = p), r;
          }
          changePort(r) {
            return ['http://', r.address.split(':').shift(), ':', '7777'].join(
              ''
            );
          }
          copy(r) {
            var o = this;
            return (0, oe.Z)(function* () {
              o.resultService.copyClipboard(r);
            })();
          }
        }
        return (
          ((e = t).ɵfac = function (r) {
            return new (r || e)(ne(Ky), ne(Yy), ne(Qy), ne(__), ne(Td));
          }),
          (e.ɵcmp = sl({
            type: e,
            selectors: [['app-root']],
            viewQuery: function (r, o) {
              if (
                (1 & r &&
                  (fe(dN, 5),
                  fe(_N, 5),
                  fe(fN, 5),
                  fe(pN, 5),
                  fe(gN, 5),
                  fe(hN, 5),
                  fe(mN, 5),
                  fe(wN, 5),
                  fe(yN, 5),
                  fe(bN, 5),
                  fe(vN, 5),
                  fe(DN, 5),
                  fe(EN, 5),
                  fe(CN, 5),
                  fe(IN, 5),
                  fe(SN, 5),
                  fe(MN, 5),
                  fe(kN, 5),
                  fe(TN, 5),
                  fe(AN, 5),
                  fe(NN, 5),
                  fe(xN, 5),
                  fe(RN, 5),
                  fe(PN, 5),
                  fe(ON, 5),
                  fe(FN, 5),
                  fe(LN, 5),
                  fe(jN, 5),
                  fe(HN, 5),
                  fe(VN, 5),
                  fe(BN, 5),
                  fe($N, 5),
                  fe(UN, 5),
                  fe(qN, 5),
                  fe(zN, 5)),
                2 & r)
              ) {
                let i;
                _e((i = pe())) && (o.selectKeyElt = i.first),
                  _e((i = pe())) && (o.blockIdentifierHeightElt = i.first),
                  _e((i = pe())) && (o.blockIdentifierHashElt = i.first),
                  _e((i = pe())) && (o.purseUrefElt = i.first),
                  _e((i = pe())) && (o.stateRootHashElt = i.first),
                  _e((i = pe())) && (o.finalizedApprovalsElt = i.first),
                  _e((i = pe())) && (o.deployHashElt = i.first),
                  _e((i = pe())) && (o.purseIdentifierElt = i.first),
                  _e((i = pe())) && (o.itemKeyElt = i.first),
                  _e((i = pe())) && (o.seedUrefElt = i.first),
                  _e((i = pe())) && (o.seedAccounttHashElt = i.first),
                  _e((i = pe())) && (o.seedContractHashElt = i.first),
                  _e((i = pe())) && (o.seedNameElt = i.first),
                  _e((i = pe())) && (o.seedKeyElt = i.first),
                  _e((i = pe())) && (o.queryKeyElt = i.first),
                  _e((i = pe())) && (o.queryPathElt = i.first),
                  _e((i = pe())) && (o.accountIdentifierElt = i.first),
                  _e((i = pe())) && (o.publicKeyElt = i.first),
                  _e((i = pe())) && (o.privateKeyElt = i.first),
                  _e((i = pe())) && (o.TTLElt = i.first),
                  _e((i = pe())) && (o.transferAmountElt = i.first),
                  _e((i = pe())) && (o.targetAccountElt = i.first),
                  _e((i = pe())) && (o.entryPointElt = i.first),
                  _e((i = pe())) && (o.argsSimpleElt = i.first),
                  _e((i = pe())) && (o.argsJsonElt = i.first),
                  _e((i = pe())) && (o.sessionHashElt = i.first),
                  _e((i = pe())) && (o.sessionNameElt = i.first),
                  _e((i = pe())) && (o.versionElt = i.first),
                  _e((i = pe())) && (o.callPackageElt = i.first),
                  _e((i = pe())) && (o.deployJsonElt = i.first),
                  _e((i = pe())) && (o.paymentAmountElt = i.first),
                  _e((i = pe())) && (o.selectDictIdentifierElt = i.first),
                  _e((i = pe())) && (o.wasmElt = i.first),
                  _e((i = pe())) && (o.deployFileElt = i.first),
                  _e((i = pe())) && (o.selectNetworkElt = i.first);
              }
            },
            standalone: !0,
            features: [Em([__]), sd],
            decls: 61,
            vars: 32,
            consts: [
              [1, 'container'],
              [1, 'navbar', 'navbar-light'],
              [1, 'navbar-brand'],
              ['src', 'assets/logo.png', 'alt', 'CasperLabs'],
              [
                'e2e-id',
                'chain_name',
                1,
                'badge',
                'rounded-pill',
                'bg-success',
                3,
                'hidden',
              ],
              [
                'e2e-id',
                'node_address',
                1,
                'badge',
                'rounded-pill',
                'bg-success',
                3,
                'hidden',
              ],
              [1, 'form-inline'],
              [1, 'input-group'],
              [
                'for',
                'selectActionElt',
                'for',
                'selectNetworkElt',
                1,
                'input-group-text',
              ],
              [
                'id',
                'selectNetworkElt',
                'e2e-id',
                'selectNetworkElt',
                1,
                'form-select',
                'form-control',
                'form-control-sm',
                3,
                'change',
              ],
              ['selectNetworkElt', ''],
              ['label', 'default'],
              [3, 'value', 'selected', 4, 'ngFor', 'ngForOf'],
              ['label', 'fetched', 4, 'ngIf'],
              [1, 'row'],
              [1, 'col-sm-12'],
              [
                'class',
                'alert alert-success d-flex justify-content-between align-items-center',
                4,
                'ngIf',
              ],
              ['class', 'alert alert-warning', 4, 'ngIf'],
              [1, 'row', 'align-items-start', 3, 'submit'],
              [1, 'col-sm-4', 'd-flex', 'justify-content-between'],
              ['for', 'selectActionElt', 1, 'input-group-text'],
              [
                'id',
                'selectActionElt',
                'e2e-id',
                'selectActionElt',
                1,
                'form-select',
                'form-control',
                'form-control-sm',
                3,
                'change',
              ],
              ['selectActionElt', ''],
              ['label', 'rpc'],
              ['label', 'deploy utils'],
              ['label', 'deploy'],
              ['label', 'contract'],
              [3, 'value', 4, 'ngFor', 'ngForOf'],
              [
                'type',
                'button',
                'class',
                'btn btn-success ms-3',
                'e2e-id',
                'submit',
                3,
                'click',
                4,
                'ngIf',
              ],
              [1, 'col-sm-8', 'ps-0', 'd-flex', 'justify-content-end'],
              [1, 'input-group', 'me-2'],
              ['for', 'publicKeyElt', 1, 'input-group-text'],
              [
                'type',
                'search',
                'name',
                'public_key',
                'placeholder',
                'e.g. 0x',
                'id',
                'publicKeyElt',
                'e2e-id',
                'publicKeyElt',
                1,
                'form-control',
                'form-control-xs',
                3,
                'value',
                'change',
              ],
              ['publicKeyElt', ''],
              [1, 'col-sm-2', 'd-flex', 'justify-content-end', 'ms-3'],
              [
                'name',
                'private_key',
                'type',
                'file',
                'id',
                'privateKeyElt',
                'accept',
                '.pem',
                'e2e-id',
                'privateKeyElt',
                1,
                'visually-hidden',
                3,
                'change',
              ],
              ['privateKeyElt', ''],
              ['class', 'btn btn-secondary', 3, 'click', 4, 'ngIf'],
              ['class', 'btn btn-light', 3, 'click', 4, 'ngIf'],
              ['class', 'row mt-3 d-flex align-items-end', 4, 'ngIf'],
              ['class', 'row d-flex mt-4 justify-content-start', 4, 'ngIf'],
              ['class', 'mt-3', 'e2e-id', 'error', 4, 'ngIf'],
              [1, 'mt-3'],
              [3, 'value', 'selected'],
              ['label', 'fetched'],
              [
                1,
                'alert',
                'alert-success',
                'd-flex',
                'justify-content-between',
                'align-items-center',
              ],
              ['e2e-id', 'state_root_hash'],
              [1, 'btn', 'me-0', 3, 'click'],
              [1, 'alert', 'alert-warning'],
              ['e2e-id', 'account_hash'],
              ['e2e-id', 'main_purse'],
              [3, 'value'],
              [
                'type',
                'button',
                'e2e-id',
                'submit',
                1,
                'btn',
                'btn-success',
                'ms-3',
                3,
                'click',
              ],
              [1, 'btn', 'btn-secondary', 3, 'click'],
              [1, 'btn', 'btn-light', 3, 'click'],
              [1, 'row', 'mt-3', 'd-flex', 'align-items-end'],
              [1, 'row', 'align-items-end', 3, 'submit'],
              [1, 'col-sm-2', 'mb-2'],
              ['for', 'blockIdentifierHeightElt'],
              [1, 'form-floating'],
              [
                'type',
                'search',
                'id',
                'blockIdentifierHeightElt',
                'name',
                'block_identifier_height',
                'e2e-id',
                'blockIdentifierHeightElt',
                1,
                'form-control',
                'form-control-xs',
                3,
                'value',
                'placeholder',
              ],
              ['blockIdentifierHeightElt', ''],
              [1, 'col-sm-6', 'mb-2'],
              ['for', 'blockIdentifierHashElt'],
              [
                'type',
                'search',
                'name',
                'block_identifier_hash',
                'id',
                'blockIdentifierHashElt',
                'e2e-id',
                'blockIdentifierHashElt',
                1,
                'form-control',
                'form-control-xs',
                3,
                'value',
                'placeholder',
              ],
              ['blockIdentifierHashElt', ''],
              [1, 'col-sm-12', 'mb-2'],
              ['class', 'col-sm-7', 4, 'ngIf'],
              [1, 'col-sm-7'],
              ['for', 'accountIdentifierElt'],
              [
                'type',
                'search',
                'name',
                'account_identifier',
                'placeholder',
                'e.g. Public Key, AccountHash, Purse URef',
                'id',
                'accountIdentifierElt',
                'e2e-id',
                'accountIdentifierElt',
                1,
                'form-control',
                'form-control-xs',
                3,
                'value',
              ],
              ['accountIdentifierElt', ''],
              [1, 'col-sm-7', 'mb-2'],
              ['for', 'stateRootHashElt'],
              [
                'type',
                'search',
                'name',
                'state_root_hash',
                'id',
                'stateRootHashElt',
                'e2e-id',
                'stateRootHashElt',
                1,
                'form-control',
                'form-control-xs',
                3,
                'placeholder',
              ],
              ['stateRootHashElt', ''],
              ['class', 'col-sm-7 mb-2', 4, 'ngIf'],
              ['for', 'purseUrefElt'],
              [
                'type',
                'search',
                'name',
                'purse_uref',
                'id',
                'purseUrefElt',
                'e2e-id',
                'purseUrefElt',
                1,
                'form-control',
                'form-control-xs',
                3,
                'value',
                'placeholder',
              ],
              ['purseUrefElt', ''],
              ['for', 'purseIdentifierElt'],
              [
                'type',
                'search',
                'name',
                'purse_identifier',
                'placeholder',
                'e.g. Public Key, AccountHash, Purse URef',
                'id',
                'purseIdentifierElt',
                'e2e-id',
                'purseIdentifierElt',
                1,
                'form-control',
                'form-control-xs',
                3,
                'value',
              ],
              ['purseIdentifierElt', ''],
              ['class', 'col-sm-12 mb-3', 4, 'ngIf'],
              [4, 'ngIf'],
              [1, 'col-sm-12', 'mb-3'],
              [1, 'col-sm-5', 'mb-2'],
              [
                'id',
                'selectDictIdentifierElt',
                'e2e-id',
                'selectDictIdentifierElt',
                1,
                'form-select',
                'form-control',
                'form-control-sm',
                3,
                'value',
                'change',
              ],
              ['selectDictIdentifierElt', ''],
              ['value', 'newFromSeedUref', 3, 'selected'],
              ['value', 'newFromContractInfo', 3, 'selected'],
              ['value', 'newFromAccountInfo', 3, 'selected'],
              ['value', 'newFromDictionaryKey', 3, 'selected'],
              ['for', 'seedUrefElt'],
              [
                'type',
                'search',
                'name',
                'seed_uref',
                'placeholder',
                'uref-0x',
                'id',
                'seedUrefElt',
                'e2e-id',
                'seedUrefElt',
                1,
                'form-control',
                'form-control-xs',
                3,
                'value',
              ],
              ['seedUrefElt', ''],
              ['for', 'seedAccounttHashElt'],
              [
                'type',
                'search',
                'name',
                'seed_account_hash',
                'placeholder',
                'account-hash-0x',
                'id',
                'seedAccounttHashElt',
                'e2e-id',
                'seedAccounttHashElt',
                1,
                'form-control',
                'form-control-xs',
                3,
                'value',
              ],
              ['seedAccounttHashElt', ''],
              ['for', 'seedContractHashElt'],
              [
                'type',
                'search',
                'name',
                'seed_contract_hash',
                'placeholder',
                'hash-0x',
                'id',
                'seedContractHashElt',
                'e2e-id',
                'seedContractHashElt',
                1,
                'form-control',
                'form-control-xs',
                3,
                'value',
              ],
              ['seedContractHashElt', ''],
              ['for', 'seedKeyElt'],
              [
                'type',
                'search',
                'name',
                'seed_key',
                'placeholder',
                'dictionary-0x',
                'id',
                'seedKeyElt',
                'e2e-id',
                'seedKeyElt',
                1,
                'form-control',
                'form-control-xs',
                3,
                'value',
              ],
              ['seedKeyElt', ''],
              ['for', 'seedNameElt'],
              [
                'type',
                'search',
                'name',
                'seed_name',
                'placeholder',
                'e.g. events',
                'id',
                'seedNameElt',
                'e2e-id',
                'seedNameElt',
                1,
                'form-control',
                'form-control-xs',
                3,
                'value',
              ],
              ['seedNameElt', ''],
              ['for', 'itemKeyElt'],
              [
                'type',
                'search',
                'name',
                'item_key',
                'id',
                'itemKeyElt',
                'e2e-id',
                'itemKeyElt',
                1,
                'form-control',
                'form-control-xs',
                3,
                'value',
                'placeholder',
              ],
              ['itemKeyElt', ''],
              ['for', 'queryKeyElt'],
              [
                'type',
                'search',
                'name',
                'query_key',
                'id',
                'queryKeyElt',
                'e2e-id',
                'queryKeyElt',
                1,
                'form-control',
                'form-control-xs',
                3,
                'value',
                'placeholder',
              ],
              ['queryKeyElt', ''],
              ['for', 'queryPathElt'],
              [
                'type',
                'search',
                'name',
                'query_path',
                'placeholder',
                'e.g. counter/count',
                'id',
                'queryPathElt',
                'e2e-id',
                'queryPathElt',
                1,
                'form-control',
                'form-control-xs',
                3,
                'value',
              ],
              ['queryPathElt', ''],
              [1, 'col-sm-6'],
              ['for', 'deployHashElt'],
              [
                'type',
                'search',
                'name',
                'deploy_hash',
                'placeholder',
                'e.g. 0x',
                'id',
                'deployHashElt',
                'e2e-id',
                'deployHashElt',
                1,
                'form-control',
                'form-control-xs',
                3,
                'value',
              ],
              ['deployHashElt', ''],
              [1, 'col-sm-2'],
              ['for', 'finalizedApprovalsElt', 1, 'form-label'],
              [
                'type',
                'checkbox',
                'name',
                'finalized_approvals',
                'id',
                'finalizedApprovalsElt',
                'e2e-id',
                'finalizedApprovalsElt',
                1,
                'form-check-input',
                'mt-0',
                3,
                'checked',
                'value',
              ],
              ['finalizedApprovalsElt', ''],
              [
                'name',
                'deploy_file',
                'type',
                'file',
                'id',
                'deployFileElt',
                'accept',
                '.json, .txt',
                'e2e-id',
                'deployFileElt',
                1,
                'visually-hidden',
                3,
                'change',
              ],
              ['deployFileElt', ''],
              [1, 'form-floating', 'mt-3'],
              [
                'name',
                'deploy_json',
                'value',
                'deploy_json',
                'id',
                'deployJsonElt',
                'e2e-id',
                'deployJsonElt',
                1,
                'form-control',
                2,
                'height',
                '300px',
                'white-space',
                'pre-wrap',
                3,
                'innerHTML',
              ],
              ['deployJsonElt', ''],
              ['for', 'deployJsonElt'],
              ['class', 'col-sm-2', 4, 'ngIf'],
              ['class', 'col-sm-3', 4, 'ngIf'],
              ['class', 'col-sm-1', 4, 'ngIf'],
              ['class', 'col-sm-6', 4, 'ngIf'],
              ['class', 'row mt-2', 4, 'ngIf'],
              [1, 'text-nowrap'],
              ['class', 'fw-light small text-nowrap', 4, 'ngIf'],
              [
                'type',
                'tel',
                'id',
                'transferAmountElt',
                'name',
                'transfer_amount',
                'pattern',
                '\\d*',
                'maxlength',
                '28',
                'e2e-id',
                'transferAmountElt',
                1,
                'form-control',
                'form-control-xs',
                3,
                'value',
                'placeholder',
                'change',
              ],
              ['transferAmountElt', ''],
              ['for', 'transferAmountElt'],
              [1, 'fw-light', 'small', 'text-nowrap'],
              [1, 'col-sm-3'],
              [
                'type',
                'tel',
                'id',
                'paymentAmountElt',
                'name',
                'payment_amount',
                'pattern',
                '\\d*',
                'maxlength',
                '28',
                'e2e-id',
                'paymentAmountElt',
                1,
                'form-control',
                'form-control-xs',
                3,
                'value',
                'change',
              ],
              ['paymentAmountElt', ''],
              [1, 'col-sm-1'],
              ['for', 'TTLElt'],
              [
                'type',
                'search',
                'id',
                'TTLElt',
                'name',
                'ttl',
                'e2e-id',
                'TTLElt',
                1,
                'form-control',
                'form-control-xs',
                3,
                'value',
                'placeholder',
              ],
              ['TTLElt', ''],
              ['for', 'targetAccountElt'],
              [
                'type',
                'search',
                'name',
                'target_account',
                'placeholder',
                'e.g. Public Key, AccountHash, Purse URef',
                'id',
                'targetAccountElt',
                'e2e-id',
                'targetAccountElt',
                1,
                'form-control',
                'form-control-xs',
                3,
                'value',
              ],
              ['targetAccountElt', ''],
              [
                'name',
                'wasm',
                'type',
                'file',
                'id',
                'wasmElt',
                'accept',
                '.wasm',
                'e2e-id',
                'wasmElt',
                1,
                'visually-hidden',
                3,
                'change',
              ],
              ['wasmElt', ''],
              [
                'class',
                'break-all text-nowrap',
                'class',
                'btn btn-light',
                'e2e-id',
                'wasmName',
                3,
                'click',
                4,
                'ngIf',
              ],
              ['e2e-id', 'wasmName', 1, 'btn', 'btn-light', 3, 'click'],
              [
                'fill',
                'none',
                'stroke',
                'currentColor',
                'viewBox',
                '0 0 24 24',
                'xmlns',
                'http://www.w3.org/2000/svg',
                1,
                'w-6',
                'h-6',
                'ml-1',
                'cursor-pointer',
                'shrink-0',
              ],
              [
                'stroke-linecap',
                'round',
                'stroke-linejoin',
                'round',
                'stroke-width',
                '2',
                'd',
                'M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16',
              ],
              [1, 'row', 'mt-2'],
              ['for', 'argsSimpleElt'],
              [
                'type',
                'search',
                'name',
                'args_simple',
                'placeholder',
                "e.g. foo:Bool='true', bar:String='value'",
                'id',
                'argsSimpleElt',
                'e2e-id',
                'argsSimpleElt',
                1,
                'form-control',
                'form-control-xs',
                3,
                'value',
                'disabled',
                'change',
              ],
              ['argsSimpleElt', ''],
              ['for', 'argsJsonElt'],
              [
                'type',
                'search',
                'name',
                'args_json',
                'placeholder',
                'e.g. [{ "name": "foo", "type": "U256", "value": 1 }]',
                'e2e-id',
                'argsJsonElt',
                1,
                'form-control',
                'form-control-xs',
                3,
                'value',
                'disabled',
                'change',
              ],
              ['argsJsonElt', ''],
              ['for', 'sessionHashElt'],
              [
                'type',
                'search',
                'name',
                'session_hash',
                'placeholder',
                'e.g. Contract Hash or Package Hash',
                'id',
                'sessionHashElt',
                'e2e-id',
                'sessionHashElt',
                1,
                'form-control',
                'form-control-xs',
                3,
                'value',
                'disabled',
                'change',
              ],
              ['sessionHashElt', ''],
              ['for', 'callPackageElt', 1, 'form-label'],
              [
                'type',
                'checkbox',
                'name',
                'call_package',
                'id',
                'callPackageElt',
                'e2e-id',
                'callPackageElt',
                1,
                'form-check-input',
                'mt-0',
                3,
                'checked',
                'value',
                'disabled',
              ],
              ['callPackageElt', ''],
              [1, 'col-sm-3', 'mb-2'],
              ['for', 'versionElt'],
              [
                'type',
                'search',
                'name',
                'version',
                'placeholder',
                'e.g.1, empty for last version',
                'id',
                'versionElt',
                'e2e-id',
                'versionElt',
                1,
                'form-control',
                'form-control-xs',
                3,
                'value',
                'disabled',
              ],
              ['versionElt', ''],
              ['for', 'sessionNameElt'],
              [
                'type',
                'search',
                'name',
                'session_name',
                'placeholder',
                'e.g. Counter',
                'id',
                'sessionNameElt',
                'e2e-id',
                'sessionNameElt',
                1,
                'form-control',
                'form-control-xs',
                3,
                'value',
                'disabled',
                'change',
              ],
              ['sessionNameElt', ''],
              ['for', 'entryPointElt'],
              [
                'type',
                'search',
                'name',
                'entry_point',
                'placeholder',
                'e.g. counter_inc',
                'id',
                'entryPointElt',
                'e2e-id',
                'entryPointElt',
                1,
                'form-control',
                'form-control-xs',
                3,
                'value',
                'disabled',
              ],
              ['entryPointElt', ''],
              [1, 'row', 'd-flex', 'mt-4', 'justify-content-start'],
              [
                'type',
                'button',
                'e2e-id',
                'sign',
                1,
                'btn',
                'btn-warning',
                3,
                'click',
              ],
              ['e2e-id', 'error', 1, 'mt-3'],
              [1, 'error', 'alert', 'alert-warning', 'd-flex'],
            ],
            template: function (r, o) {
              1 & r &&
                (M(0, 'main', 0)(1, 'nav', 1)(2, 'a', 2),
                Se(3, 'img', 3),
                R(),
                M(4, 'span', 4),
                $(5),
                R(),
                M(6, 'span', 5),
                $(7),
                R(),
                M(8, 'form', 6)(9, 'div', 7)(10, 'label', 8),
                $(11, 'RPC'),
                R(),
                M(12, 'select', 9, 10),
                Ce('change', function () {
                  return o.selectNetwork();
                }),
                Se(14, 'option'),
                M(15, 'optgroup', 11),
                ee(16, GN, 2, 4, 'option', 12),
                R(),
                ee(17, JN, 2, 1, 'optgroup', 13),
                R()()()(),
                M(18, 'div', 14)(19, 'div', 15),
                ee(20, ZN, 5, 1, 'div', 16),
                ee(21, KN, 3, 1, 'div', 17),
                ee(22, YN, 3, 1, 'div', 17),
                R()(),
                M(23, 'form', 18),
                Ce('submit', function () {
                  return !1;
                }),
                M(24, 'div', 19)(25, 'div', 7)(26, 'label', 20),
                $(27, 'Action'),
                R(),
                M(28, 'select', 21, 22),
                Ce('change', function (a) {
                  return o.selectAction(a);
                }),
                Se(30, 'option'),
                M(31, 'optgroup', 23),
                ee(32, QN, 2, 3, 'option', 12),
                R(),
                M(33, 'optgroup', 24),
                ee(34, XN, 2, 3, 'option', 12),
                R(),
                M(35, 'optgroup', 25),
                ee(36, ex, 2, 3, 'option', 12),
                R(),
                M(37, 'optgroup', 26),
                ee(38, tx, 2, 2, 'option', 27),
                R()()(),
                ee(39, nx, 2, 0, 'button', 28),
                R(),
                M(40, 'div', 29)(41, 'div', 30)(42, 'label', 31),
                $(43, ' Public Key'),
                R(),
                M(44, 'input', 32, 33),
                Ce('change', function () {
                  return o.onPublicKeyChange();
                }),
                R()(),
                M(46, 'div', 34)(47, 'input', 35, 36),
                Ce('change', function (a) {
                  return o.onPemSelected(a);
                }),
                R(),
                ee(49, rx, 2, 0, 'button', 37),
                ee(50, ox, 2, 0, 'button', 38),
                R()()(),
                ee(51, ix, 20, 7, 'div', 39),
                ee(52, lx, 12, 4, 'div', 39),
                ee(53, Ex, 5, 6, 'div', 39),
                ee(54, Cx, 16, 3, 'div', 39),
                ee(55, Sx, 13, 2, 'div', 39),
                ee(56, Vx, 8, 12, 'div', 39),
                ee(57, Bx, 4, 0, 'div', 40),
                ee(58, $x, 3, 1, 'section', 41),
                M(59, 'section', 42),
                Se(60, 'comp-result'),
                R()()),
                2 & r &&
                  (j(4),
                  V('hidden', !o.chain_name),
                  j(1),
                  no(o.chain_name),
                  j(1),
                  V('hidden', !o.node_address),
                  j(1),
                  no(o.node_address),
                  j(9),
                  V('ngForOf', o.networks),
                  j(1),
                  V('ngIf', o.peers),
                  j(3),
                  V('ngIf', o.state_root_hash),
                  j(1),
                  V('ngIf', o.account_hash),
                  j(1),
                  V('ngIf', o.main_purse),
                  j(10),
                  V('ngForOf', o.sdk_rpc_methods),
                  j(2),
                  V('ngForOf', o.sdk_deploy_utils_methods),
                  j(2),
                  V('ngForOf', o.sdk_deploy_methods),
                  j(2),
                  V('ngForOf', o.sdk_contract_methods),
                  j(1),
                  V('ngIf', !at(25, sb).includes(o.action)),
                  j(5),
                  V('value', o.public_key || ''),
                  j(5),
                  V('ngIf', !o.has_private_key),
                  j(1),
                  V('ngIf', o.has_private_key),
                  j(1),
                  V('ngIf', at(26, Ux).includes(o.action)),
                  j(1),
                  V('ngIf', at(27, qx).includes(o.action)),
                  j(1),
                  V('ngIf', at(28, zx).includes(o.action)),
                  j(1),
                  V('ngIf', 'get_deploy' === o.action),
                  j(1),
                  V('ngIf', at(29, Gx).includes(o.action)),
                  j(1),
                  V('ngIf', at(30, Wx).includes(o.action)),
                  j(1),
                  V('ngIf', at(31, sb).includes(o.action)),
                  j(1),
                  V('ngIf', o.error));
            },
            dependencies: [xi, ly, Wd, nb],
            styles: [
              '.form-floating[_ngcontent-%COMP%] > label[_ngcontent-%COMP%]{color:#d3d3d3}.error[_ngcontent-%COMP%]{display:block;font-family:monospace;white-space:pre-wrap;word-break:break-word}',
            ],
            changeDetection: 0,
          })),
          t
        );
      })();
      const f_ = [Np([hA, tN])];
      f_.push({
        provide: Yy,
        useValue: {
          path_sep: '/',
          gas_price: '1',
          gas_fee: '1500000000',
          minimum_transfer: '2500000000',
          TTL: '30m',
          gas_fee_transfer: '10000',
          block_identifier_height_default: '1958541',
          block_identifier_hash:
            '372e4c83a6ca19c027d3daf4807ad8fc16b9f01411ef39d5e00888128bf4fd59',
          networks: {
            localhost: {
              node_address: 'http://localhost:11101',
              chain_name: 'casper-net-1',
            },
            integration: {
              node_address: 'https://rpc.integration.casperlabs.io',
              chain_name: 'integration-test',
            },
            testnet: {
              node_address: 'https://rpc.testnet.casperlabs.io',
              chain_name: 'casper-test',
            },
            mainnet: {
              node_address: 'https://rpc.mainnet.casperlabs.io',
              chain_name: 'casper',
            },
            ip: {
              node_address: 'http://3.136.227.9:7777',
              chain_name: 'integration-test',
            },
          },
        },
      }),
        f_.push({
          provide: Qy,
          useValue: {
            production: !0,
            node_address: 'https://rpc.integration.casperlabs.io',
            chain_name: 'integration-test',
          },
        }),
        (function HA(e, t) {
          return SM({ rootComponent: e, ...Gy(t) });
        })(Jx, { providers: f_ })
          .then(() => {})
          .catch(() => {});
    },
    6666: (En) => {
      var cr = 0;
      function ot(c, Ae) {
        var B = Ae.data;
        if (Array.isArray(B) && !(B.length < 2)) {
          var Le = B[0],
            zt = B[1],
            I = B[2],
            ft = c._callbacks[Le];
          ft && (delete c._callbacks[Le], ft(zt, I));
        }
      }
      function Ie(c) {
        var Ae = this;
        (Ae._worker = c),
          (Ae._callbacks = {}),
          c.addEventListener('message', function (B) {
            ot(Ae, B);
          });
      }
      (Ie.prototype.postMessage = function (c) {
        var Ae = this,
          B = cr++,
          Le = [B, c];
        return new Promise(function (zt, I) {
          if (
            ((Ae._callbacks[B] = function ($e, et) {
              if ($e) return I(new Error($e.message));
              zt(et);
            }),
            typeof Ae._worker.controller < 'u')
          ) {
            var ft = new MessageChannel();
            (ft.port1.onmessage = function ($e) {
              ot(Ae, $e);
            }),
              Ae._worker.controller.postMessage(Le, [ft.port2]);
          } else Ae._worker.postMessage(Le);
        });
      }),
        (En.exports = Ie);
    },
    9671: (En, cr, ot) => {
      function Ie(Ae, B, Le, zt, I, ft, $e) {
        try {
          var et = Ae[ft]($e),
            O = et.value;
        } catch (H) {
          return void Le(H);
        }
        et.done ? B(O) : Promise.resolve(O).then(zt, I);
      }
      function c(Ae) {
        return function () {
          var B = this,
            Le = arguments;
          return new Promise(function (zt, I) {
            var ft = Ae.apply(B, Le);
            function $e(O) {
              Ie(ft, zt, I, $e, et, 'next', O);
            }
            function et(O) {
              Ie(ft, zt, I, $e, et, 'throw', O);
            }
            $e(void 0);
          });
        };
      }
      ot.d(cr, { Z: () => c });
    },
  },
  (En) => {
    En((En.s = 2311));
  },
]);
