import { unref, withCtx, createTextVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderClass, ssrInterpolate, ssrRenderList, ssrRenderAttr } from "vue/server-renderer";
import { Head, Link } from "@inertiajs/vue3";
import { useI18n } from "vue-i18n";
const _sfc_main = {
  __name: "Welcome",
  __ssrInlineRender: true,
  props: {
    canLogin: Boolean,
    canRegister: Boolean
  },
  setup(__props) {
    const { t } = useI18n();
    const features = [
      { key: "feature1", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z", color: "indigo" },
      { key: "feature2", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z", color: "purple" },
      { key: "feature3", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", color: "emerald" },
      { key: "feature4", icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z", color: "amber" },
      { key: "feature5", icon: "M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129", color: "rose" },
      { key: "feature6", icon: "M13 10V3L4 14h7v7l9-11h-7z", color: "cyan" }
    ];
    const phases = [
      { num: 1, key: "phase1", color: "indigo", active: true },
      { num: 2, key: "phase2", color: "purple", active: false },
      { num: 3, key: "phase3", color: "emerald", active: false },
      { num: 4, key: "phase4", color: "amber", active: false },
      { num: 5, key: "phase5", color: "rose", active: false }
    ];
    const colorClasses = {
      indigo: { bg: "bg-indigo-100", text: "text-indigo-600", ring: "ring-indigo-600/20" },
      purple: { bg: "bg-purple-100", text: "text-purple-600", ring: "ring-purple-600/20" },
      emerald: { bg: "bg-emerald-100", text: "text-emerald-600", ring: "ring-emerald-600/20" },
      amber: { bg: "bg-amber-100", text: "text-amber-600", ring: "ring-amber-600/20" },
      rose: { bg: "bg-rose-100", text: "text-rose-600", ring: "ring-rose-600/20" },
      cyan: { bg: "bg-cyan-100", text: "text-cyan-600", ring: "ring-cyan-600/20" }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Welcome" }, null, _parent));
      _push(`<div class="min-h-screen bg-white"><nav class="fixed top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-lg"><div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-6"><div class="flex items-center gap-3"><div class="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600"><svg class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg></div><span class="text-xl font-bold text-gray-900">OrgMatrix</span></div><div class="flex items-center gap-3"><div class="flex items-center gap-1 rounded-lg bg-gray-100 p-1"><button class="${ssrRenderClass(["px-2.5 py-1 text-xs font-semibold rounded-md transition-all", _ctx.$page.props.locale === "en" ? "bg-indigo-600 text-white" : "text-gray-500 hover:text-gray-700"])}">EN</button><button class="${ssrRenderClass(["px-2.5 py-1 text-xs font-semibold rounded-md transition-all", _ctx.$page.props.locale === "de" ? "bg-indigo-600 text-white" : "text-gray-500 hover:text-gray-700"])}">DE</button></div>`);
      if (__props.canLogin) {
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("login"),
          class: "rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(unref(t)("nav.login"))}`);
            } else {
              return [
                createTextVNode(toDisplayString(unref(t)("nav.login")), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      if (__props.canRegister) {
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("register"),
          class: "rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition shadow-sm"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(unref(t)("nav.register"))}`);
            } else {
              return [
                createTextVNode(toDisplayString(unref(t)("nav.register")), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></nav><section class="relative overflow-hidden pt-32 pb-20"><div class="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50"></div><div class="absolute top-20 left-1/4 h-72 w-72 rounded-full bg-indigo-200 opacity-20 blur-3xl"></div><div class="absolute bottom-10 right-1/4 h-96 w-96 rounded-full bg-purple-200 opacity-20 blur-3xl"></div><div class="relative mx-auto max-w-7xl px-6 text-center"><div class="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 mb-8"><span class="h-2 w-2 rounded-full bg-indigo-600 animate-pulse"></span><span class="text-sm font-medium text-indigo-700">Phase 1 — Core MVP</span></div><h1 class="mx-auto max-w-4xl text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">${ssrInterpolate(unref(t)("landing.hero_title"))}</h1><p class="mx-auto mt-6 max-w-2xl text-lg text-gray-600 leading-relaxed">${ssrInterpolate(unref(t)("landing.hero_subtitle"))}</p><div class="mt-10 flex items-center justify-center gap-4">`);
      if (__props.canRegister) {
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("register"),
          class: "rounded-xl bg-indigo-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/25 hover:bg-indigo-700 transition-all hover:shadow-indigo-600/40"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(unref(t)("landing.cta_start"))}`);
            } else {
              return [
                createTextVNode(toDisplayString(unref(t)("landing.cta_start")), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<a href="#features" class="flex items-center gap-2 rounded-xl border border-gray-200 px-8 py-3.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition">${ssrInterpolate(unref(t)("landing.cta_demo"))} <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></a></div><div class="mx-auto mt-16 max-w-4xl rounded-2xl border border-gray-200 bg-white p-8 shadow-2xl shadow-gray-200/50"><svg viewBox="0 0 800 300" class="w-full"><rect x="325" y="10" width="150" height="55" rx="12" fill="#4f46e5" opacity="0.9"></rect><text x="400" y="33" text-anchor="middle" fill="white" font-size="11" font-weight="600">CEO</text><text x="400" y="50" text-anchor="middle" fill="rgba(255,255,255,0.7)" font-size="9">Sarah Johnson</text><line x1="400" y1="65" x2="400" y2="85" stroke="#c7d2fe" stroke-width="2"></line><line x1="175" y1="85" x2="625" y2="85" stroke="#c7d2fe" stroke-width="2"></line><line x1="175" y1="85" x2="175" y2="105" stroke="#c7d2fe" stroke-width="2"></line><line x1="400" y1="85" x2="400" y2="105" stroke="#c7d2fe" stroke-width="2"></line><line x1="625" y1="85" x2="625" y2="105" stroke="#c7d2fe" stroke-width="2"></line><rect x="100" y="105" width="150" height="55" rx="12" fill="#7c3aed" opacity="0.85"></rect><text x="175" y="128" text-anchor="middle" fill="white" font-size="11" font-weight="600">CTO</text><text x="175" y="145" text-anchor="middle" fill="rgba(255,255,255,0.7)" font-size="9">Alex Chen</text><rect x="325" y="105" width="150" height="55" rx="12" fill="#7c3aed" opacity="0.85"></rect><text x="400" y="128" text-anchor="middle" fill="white" font-size="11" font-weight="600">COO</text><text x="400" y="145" text-anchor="middle" fill="rgba(255,255,255,0.7)" font-size="9">Maria Lopez</text><rect x="550" y="105" width="150" height="55" rx="12" fill="#7c3aed" opacity="0.85"></rect><text x="625" y="128" text-anchor="middle" fill="white" font-size="11" font-weight="600">CFO</text><text x="625" y="145" text-anchor="middle" fill="rgba(255,255,255,0.7)" font-size="9">James Wilson</text><line x1="175" y1="160" x2="175" y2="180" stroke="#c7d2fe" stroke-width="2"></line><line x1="100" y1="180" x2="250" y2="180" stroke="#c7d2fe" stroke-width="2"></line><line x1="100" y1="180" x2="100" y2="200" stroke="#c7d2fe" stroke-width="2"></line><line x1="250" y1="180" x2="250" y2="200" stroke="#c7d2fe" stroke-width="2"></line><line x1="400" y1="160" x2="400" y2="200" stroke="#c7d2fe" stroke-width="2"></line><line x1="625" y1="160" x2="625" y2="200" stroke="#c7d2fe" stroke-width="2"></line><rect x="25" y="200" width="150" height="55" rx="12" fill="#e0e7ff" stroke="#c7d2fe" stroke-width="1"></rect><text x="100" y="223" text-anchor="middle" fill="#4338ca" font-size="10" font-weight="600">Dev Lead</text><text x="100" y="240" text-anchor="middle" fill="#6366f1" font-size="9">Tom Baker</text><rect x="175" y="200" width="150" height="55" rx="12" fill="#e0e7ff" stroke="#c7d2fe" stroke-width="1"></rect><text x="250" y="223" text-anchor="middle" fill="#4338ca" font-size="10" font-weight="600">Design Lead</text><text x="250" y="240" text-anchor="middle" fill="#6366f1" font-size="9">Emma Davis</text><rect x="325" y="200" width="150" height="55" rx="12" fill="#e0e7ff" stroke="#c7d2fe" stroke-width="1"></rect><text x="400" y="223" text-anchor="middle" fill="#4338ca" font-size="10" font-weight="600">Ops Manager</text><text x="400" y="240" text-anchor="middle" fill="#6366f1" font-size="9">Lisa Wang</text><rect x="550" y="200" width="150" height="55" rx="12" fill="#fef3c7" stroke="#fde68a" stroke-width="1"></rect><text x="625" y="223" text-anchor="middle" fill="#b45309" font-size="10" font-weight="600">Finance Lead</text><text x="625" y="240" text-anchor="middle" fill="#d97706" font-size="9">Vacant</text><circle cx="710" cy="210" r="8" fill="#ef4444" opacity="0.9"></circle><text x="710" y="214" text-anchor="middle" fill="white" font-size="8" font-weight="700">!</text></svg></div></div></section><section id="features" class="py-24 bg-gray-50"><div class="mx-auto max-w-7xl px-6"><div class="text-center mb-16"><h2 class="text-3xl font-bold text-gray-900 sm:text-4xl">${ssrInterpolate(unref(t)("landing.feature1_title").split(" ")[0])} — ${ssrInterpolate(unref(t)("landing.feature2_title").split(" ")[0])} — ${ssrInterpolate(unref(t)("landing.feature3_title").split(" ")[0])}</h2></div><div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"><!--[-->`);
      ssrRenderList(features, (feature) => {
        _push(`<div class="group rounded-2xl border border-gray-100 bg-white p-8 shadow-sm hover:shadow-lg hover:border-indigo-100 transition-all duration-300"><div class="${ssrRenderClass(["mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl ring-1", colorClasses[feature.color].bg, colorClasses[feature.color].text, colorClasses[feature.color].ring])}"><svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round"${ssrRenderAttr("d", feature.icon)}></path></svg></div><h3 class="mb-2 text-lg font-semibold text-gray-900">${ssrInterpolate(unref(t)(`landing.${feature.key}_title`))}</h3><p class="text-sm text-gray-600 leading-relaxed">${ssrInterpolate(unref(t)(`landing.${feature.key}_desc`))}</p></div>`);
      });
      _push(`<!--]--></div></div></section><section class="py-24"><div class="mx-auto max-w-7xl px-6"><div class="text-center mb-16"><span class="text-sm font-semibold uppercase tracking-wider text-indigo-600">${ssrInterpolate(unref(t)("landing.phase_label"))}</span><h2 class="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">5 Phases to Excellence</h2></div><div class="relative"><div class="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200 lg:left-1/2"></div><!--[-->`);
      ssrRenderList(phases, (phase, index) => {
        _push(`<div class="relative mb-12 last:mb-0"><div class="${ssrRenderClass(["flex items-start gap-8", index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"])}"><div class="hidden lg:block lg:w-5/12"></div><div class="relative flex items-center justify-center"><div class="${ssrRenderClass(["flex h-16 w-16 items-center justify-center rounded-2xl text-xl font-bold text-white shadow-lg z-10", phase.active ? "bg-indigo-600" : "bg-gray-400"])}">${ssrInterpolate(phase.num)}</div></div><div class="flex-1 lg:w-5/12"><div class="${ssrRenderClass(["rounded-2xl border p-6", phase.active ? "border-indigo-200 bg-indigo-50" : "border-gray-100 bg-white"])}"><h3 class="${ssrRenderClass(["text-lg font-semibold", phase.active ? "text-indigo-900" : "text-gray-900"])}">${ssrInterpolate(unref(t)(`landing.${phase.key}`))}</h3><p class="mt-2 text-sm text-gray-600">${ssrInterpolate(unref(t)(`landing.${phase.key}_desc`))}</p>`);
        if (phase.active) {
          _push(`<span class="mt-3 inline-flex items-center rounded-full bg-indigo-600 px-3 py-1 text-xs font-semibold text-white"> Current Phase </span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></div></div>`);
      });
      _push(`<!--]--></div></div></section><section class="py-24 bg-gradient-to-br from-indigo-900 via-indigo-800 to-purple-900"><div class="mx-auto max-w-4xl px-6 text-center"><h2 class="text-3xl font-bold text-white sm:text-4xl">${ssrInterpolate(unref(t)("landing.hero_title"))}</h2><p class="mt-4 text-lg text-indigo-200">${ssrInterpolate(unref(t)("landing.hero_subtitle"))}</p><div class="mt-10">`);
      if (__props.canRegister) {
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("register"),
          class: "rounded-xl bg-white px-8 py-3.5 text-sm font-semibold text-indigo-700 shadow-lg hover:bg-indigo-50 transition"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(unref(t)("landing.cta_start"))}`);
            } else {
              return [
                createTextVNode(toDisplayString(unref(t)("landing.cta_start")), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></section><footer class="border-t border-gray-100 bg-white py-12"><div class="mx-auto max-w-7xl px-6 text-center"><div class="flex items-center justify-center gap-3 mb-4"><div class="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600"><svg class="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg></div><span class="text-lg font-bold text-gray-900">OrgMatrix</span></div><p class="text-sm text-gray-500">${ssrInterpolate(unref(t)("landing.footer_tagline"))}</p></div></footer></div><!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Welcome.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
