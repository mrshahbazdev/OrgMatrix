import { ref, mergeProps, unref, withCtx, createVNode, openBlock, createBlock, createCommentVNode, toDisplayString, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderClass, ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrInterpolate, ssrRenderSlot } from "vue/server-renderer";
import { usePage, Link } from "@inertiajs/vue3";
import { useI18n } from "vue-i18n";
import { _ as _sfc_main$1 } from "./LanguageSwitcher-DWy6sQ-D.js";
const _sfc_main = {
  __name: "AuthenticatedLayout",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n();
    const page = usePage();
    const sidebarOpen = ref(true);
    ref(false);
    const navigation = [
      { name: () => t("nav.dashboard"), href: "dashboard", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
      { name: () => t("nav.organizations"), href: "organizations.index", icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e, _f;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-50" }, _attrs))}><aside class="${ssrRenderClass([
        "fixed inset-y-0 left-0 z-50 flex flex-col bg-gradient-to-b from-indigo-900 via-indigo-800 to-indigo-900 transition-all duration-300",
        sidebarOpen.value ? "w-64" : "w-20"
      ])}"><div class="flex h-16 items-center justify-between px-4">`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("dashboard"),
        class: "flex items-center gap-3"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm"${_scopeId}><svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"${_scopeId}></path></svg></div>`);
            if (sidebarOpen.value) {
              _push2(`<span class="text-lg font-bold text-white"${_scopeId}>OrgMatrix</span>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("div", { class: "flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm" }, [
                (openBlock(), createBlock("svg", {
                  class: "h-6 w-6 text-white",
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
              sidebarOpen.value ? (openBlock(), createBlock("span", {
                key: 0,
                class: "text-lg font-bold text-white"
              }, "OrgMatrix")) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<button class="text-white/60 hover:text-white"><svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg></button></div><nav class="mt-6 flex-1 space-y-1 px-3"><!--[-->`);
      ssrRenderList(navigation, (item) => {
        _push(ssrRenderComponent(unref(Link), {
          key: item.href,
          href: _ctx.route(item.href),
          class: [
            "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
            _ctx.route().current(item.href.split(".")[0] + "*") ? "bg-white/20 text-white shadow-lg shadow-indigo-900/20" : "text-indigo-200 hover:bg-white/10 hover:text-white"
          ]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<svg class="h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round"${ssrRenderAttr("d", item.icon)}${_scopeId}></path></svg>`);
              if (sidebarOpen.value) {
                _push2(`<span${_scopeId}>${ssrInterpolate(item.name())}</span>`);
              } else {
                _push2(`<!---->`);
              }
            } else {
              return [
                (openBlock(), createBlock("svg", {
                  class: "h-5 w-5 flex-shrink-0",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  stroke: "currentColor",
                  "stroke-width": "1.5"
                }, [
                  createVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: item.icon
                  }, null, 8, ["d"])
                ])),
                sidebarOpen.value ? (openBlock(), createBlock("span", { key: 0 }, toDisplayString(item.name()), 1)) : createCommentVNode("", true)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></nav><div class="border-t border-white/10 p-4 space-y-3">`);
      _push(ssrRenderComponent(_sfc_main$1, null, null, _parent));
      _push(`<div class="flex items-center gap-3"><div class="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600 text-sm font-semibold text-white">${ssrInterpolate((_c = (_b = (_a = unref(page).props.auth.user) == null ? void 0 : _a.name) == null ? void 0 : _b.charAt(0)) == null ? void 0 : _c.toUpperCase())}</div>`);
      if (sidebarOpen.value) {
        _push(`<div class="flex-1 min-w-0"><p class="truncate text-sm font-medium text-white">${ssrInterpolate((_d = unref(page).props.auth.user) == null ? void 0 : _d.name)}</p>`);
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("logout"),
          method: "post",
          as: "button",
          class: "text-xs text-indigo-300 hover:text-white"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(unref(t)("nav.logout"))}`);
            } else {
              return [
                createTextVNode(toDisplayString(unref(t)("nav.logout")), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></aside><div class="${ssrRenderClass(["transition-all duration-300", sidebarOpen.value ? "ml-64" : "ml-20"])}"><header class="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-gray-200 bg-white/80 px-6 backdrop-blur-sm"><div>`);
      ssrRenderSlot(_ctx.$slots, "header", {}, null, _push, _parent);
      _push(`</div><div class="flex items-center gap-4">`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("profile.edit"),
        class: "text-sm text-gray-500 hover:text-gray-700"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(t)("nav.profile"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(t)("nav.profile")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></header>`);
      if ((_e = unref(page).props.flash) == null ? void 0 : _e.success) {
        _push(`<div class="mx-6 mt-4"><div class="rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-700">${ssrInterpolate(unref(page).props.flash.success)}</div></div>`);
      } else {
        _push(`<!---->`);
      }
      if ((_f = unref(page).props.flash) == null ? void 0 : _f.error) {
        _push(`<div class="mx-6 mt-4"><div class="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">${ssrInterpolate(unref(page).props.flash.error)}</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<main class="p-6">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/AuthenticatedLayout.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
