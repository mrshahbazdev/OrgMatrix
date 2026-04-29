import { mergeProps, unref, withCtx, createVNode, openBlock, createBlock, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderSlot } from "vue/server-renderer";
import { Link } from "@inertiajs/vue3";
import { useI18n } from "vue-i18n";
import "./LanguageSwitcher-DWy6sQ-D.js";
const _sfc_main = {
  __name: "GuestLayout",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex min-h-screen" }, _attrs))}><div class="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-900 via-indigo-800 to-purple-900 relative overflow-hidden"><div class="absolute inset-0 opacity-10"><svg class="h-full w-full" viewBox="0 0 800 600"><circle cx="400" cy="100" r="8" fill="white" opacity="0.6"></circle><circle cx="200" cy="250" r="8" fill="white" opacity="0.6"></circle><circle cx="600" cy="250" r="8" fill="white" opacity="0.6"></circle><circle cx="100" cy="400" r="8" fill="white" opacity="0.6"></circle><circle cx="300" cy="400" r="8" fill="white" opacity="0.6"></circle><circle cx="500" cy="400" r="8" fill="white" opacity="0.6"></circle><circle cx="700" cy="400" r="8" fill="white" opacity="0.6"></circle><line x1="400" y1="100" x2="200" y2="250" stroke="white" stroke-width="1.5" opacity="0.4"></line><line x1="400" y1="100" x2="600" y2="250" stroke="white" stroke-width="1.5" opacity="0.4"></line><line x1="200" y1="250" x2="100" y2="400" stroke="white" stroke-width="1.5" opacity="0.4"></line><line x1="200" y1="250" x2="300" y2="400" stroke="white" stroke-width="1.5" opacity="0.4"></line><line x1="600" y1="250" x2="500" y2="400" stroke="white" stroke-width="1.5" opacity="0.4"></line><line x1="600" y1="250" x2="700" y2="400" stroke="white" stroke-width="1.5" opacity="0.4"></line></svg></div><div class="relative z-10 flex flex-col justify-center px-12">`);
      _push(ssrRenderComponent(unref(Link), {
        href: "/",
        class: "flex items-center gap-3 mb-12"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20"${_scopeId}><svg class="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"${_scopeId}></path></svg></div><span class="text-2xl font-bold text-white"${_scopeId}>OrgMatrix</span>`);
          } else {
            return [
              createVNode("div", { class: "flex h-12 w-12 items-center justify-center rounded-xl bg-white/20" }, [
                (openBlock(), createBlock("svg", {
                  class: "h-7 w-7 text-white",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  stroke: "currentColor"
                }, [
                  createVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                  })
                ]))
              ]),
              createVNode("span", { class: "text-2xl font-bold text-white" }, "OrgMatrix")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<h2 class="text-4xl font-bold text-white leading-tight mb-4">${ssrInterpolate(unref(t)("landing.hero_title"))}</h2><p class="text-lg text-indigo-200 leading-relaxed">${ssrInterpolate(unref(t)("landing.hero_subtitle"))}</p><div class="mt-8 flex items-center gap-6"><div class="flex items-center gap-2"><svg class="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg><span class="text-sm text-indigo-200">${ssrInterpolate(unref(t)("landing.feature1_title"))}</span></div><div class="flex items-center gap-2"><svg class="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg><span class="text-sm text-indigo-200">${ssrInterpolate(unref(t)("landing.feature3_title"))}</span></div></div></div></div><div class="flex w-full flex-col justify-center px-6 py-12 lg:w-1/2 lg:px-16"><div class="absolute top-4 right-4"><div class="flex items-center gap-1 rounded-lg bg-gray-100 p-1"><button class="${ssrRenderClass([
        "px-2.5 py-1 text-xs font-semibold rounded-md transition-all",
        _ctx.$page.props.locale === "en" ? "bg-indigo-600 text-white shadow-sm" : "text-gray-500 hover:text-gray-700"
      ])}">EN</button><button class="${ssrRenderClass([
        "px-2.5 py-1 text-xs font-semibold rounded-md transition-all",
        _ctx.$page.props.locale === "de" ? "bg-indigo-600 text-white shadow-sm" : "text-gray-500 hover:text-gray-700"
      ])}">DE</button></div></div><div class="mx-auto w-full max-w-md">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/GuestLayout.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
