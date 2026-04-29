import { ref, onMounted, watch, mergeProps, useSSRContext, unref, withCtx, createVNode, openBlock, createBlock, createCommentVNode, toDisplayString, createTextVNode } from "vue";
import { ssrRenderAttrs, ssrRenderTeleport, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderComponent, ssrRenderAttr, ssrRenderSlot } from "vue/server-renderer";
import { usePage, Link } from "@inertiajs/vue3";
import { useI18n } from "vue-i18n";
import { _ as _sfc_main$3 } from "./LanguageSwitcher-DWy6sQ-D.js";
const _sfc_main$2 = {
  __name: "DarkModeToggle",
  __ssrInlineRender: true,
  setup(__props) {
    const isDark = ref(false);
    onMounted(() => {
      isDark.value = localStorage.getItem("darkMode") === "true" || !localStorage.getItem("darkMode") && window.matchMedia("(prefers-color-scheme: dark)").matches;
      applyTheme();
    });
    watch(isDark, () => {
      localStorage.setItem("darkMode", isDark.value);
      applyTheme();
    });
    const applyTheme = () => {
      document.documentElement.classList.toggle("dark", isDark.value);
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<button${ssrRenderAttrs(mergeProps({
        class: ["flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-200 hover:scale-105", isDark.value ? "bg-yellow-500/20 text-yellow-400" : "bg-indigo-100 text-indigo-600 dark:bg-gray-700 dark:text-gray-300"]
      }, _attrs))}>`);
      if (isDark.value) {
        _push(`<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>`);
      } else {
        _push(`<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>`);
      }
      _push(`</button>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/DarkModeToggle.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "ToastNotification",
  __ssrInlineRender: true,
  setup(__props) {
    const page = usePage();
    const toasts = ref([]);
    let toastId = 0;
    const addToast = (message, type = "success") => {
      const id = ++toastId;
      toasts.value.push({ id, message, type, visible: true });
      setTimeout(() => removeToast(id), 5e3);
    };
    const removeToast = (id) => {
      const idx = toasts.value.findIndex((t) => t.id === id);
      if (idx !== -1) {
        toasts.value[idx].visible = false;
        setTimeout(() => {
          toasts.value = toasts.value.filter((t) => t.id !== id);
        }, 300);
      }
    };
    watch(() => page.props.flash, (flash) => {
      if (flash == null ? void 0 : flash.success) addToast(flash.success, "success");
      if (flash == null ? void 0 : flash.error) addToast(flash.error, "error");
    }, { deep: true, immediate: true });
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderTeleport(_push, (_push2) => {
        _push2(`<div class="fixed top-4 right-4 z-[100] flex flex-col gap-3 pointer-events-none"><!--[-->`);
        ssrRenderList(toasts.value, (toast) => {
          if (toast.visible) {
            _push2(`<div class="${ssrRenderClass([toast.type === "success" ? "bg-emerald-500 text-white" : "bg-red-500 text-white", "pointer-events-auto flex items-center gap-3 rounded-xl px-5 py-3.5 shadow-2xl backdrop-blur-sm min-w-[300px] max-w-[420px]"])}">`);
            if (toast.type === "success") {
              _push2(`<svg class="h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`);
            } else {
              _push2(`<svg class="h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`);
            }
            _push2(`<span class="text-sm font-medium flex-1">${ssrInterpolate(toast.message)}</span><button class="flex-shrink-0 opacity-70 hover:opacity-100"><svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button></div>`);
          } else {
            _push2(`<!---->`);
          }
        });
        _push2(`<!--]--></div>`);
      }, "body", false, _parent);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/ToastNotification.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "AuthenticatedLayout",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n();
    const page = usePage();
    const sidebarOpen = ref(true);
    const mobileMenuOpen = ref(false);
    const navigation = [
      { name: () => t("nav.dashboard"), href: "dashboard", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
      { name: () => t("nav.organizations"), href: "organizations.index", icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" },
      { name: () => t("nav.activity_log"), href: "activity-log", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$1, null, null, _parent));
      if (mobileMenuOpen.value) {
        _push(`<div class="fixed inset-0 z-[60] bg-black/50 lg:hidden"></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<aside class="${ssrRenderClass([
        "fixed inset-y-0 left-0 z-[70] flex flex-col bg-gradient-to-b from-indigo-900 via-indigo-800 to-indigo-900 transition-all duration-300",
        sidebarOpen.value ? "w-64" : "w-20",
        mobileMenuOpen.value ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
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
      _push(`<button class="hidden lg:block text-white/60 hover:text-white"><svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg></button><button class="lg:hidden text-white/60 hover:text-white"><svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button></div><nav class="mt-6 flex-1 space-y-1 px-3"><!--[-->`);
      ssrRenderList(navigation, (item) => {
        _push(ssrRenderComponent(unref(Link), {
          key: item.href,
          href: _ctx.route(item.href),
          onClick: ($event) => mobileMenuOpen.value = false,
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
      _push(ssrRenderComponent(_sfc_main$3, null, null, _parent));
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
      _push(`</div></div></aside><div class="${ssrRenderClass(["transition-all duration-300", sidebarOpen.value ? "lg:ml-64" : "lg:ml-20"])}"><header class="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 px-4 sm:px-6 backdrop-blur-sm"><div class="flex items-center gap-3"><button class="lg:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400"><svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg></button><div>`);
      ssrRenderSlot(_ctx.$slots, "header", {}, null, _push, _parent);
      _push(`</div></div><div class="flex items-center gap-3">`);
      _push(ssrRenderComponent(_sfc_main$2, null, null, _parent));
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("profile.edit"),
        class: "text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
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
      _push(`</div></header><main class="p-4 sm:p-6">`);
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
