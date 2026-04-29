import { withCtx, unref, createVNode, openBlock, createBlock, toDisplayString, Fragment, renderList, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass } from "vue/server-renderer";
import { Head } from "@inertiajs/vue3";
import { useI18n } from "vue-i18n";
import { _ as _sfc_main$1 } from "./AuthenticatedLayout-C7ouL3e5.js";
import "./LanguageSwitcher-DWy6sQ-D.js";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: { logs: Array },
  setup(__props) {
    const { t } = useI18n();
    const actionColors = {
      created: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
      updated: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
      deleted: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
      assigned: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
      unassigned: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
      imported: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400"
    };
    const formatDate = (date) => new Date(date).toLocaleString();
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h1 class="text-xl font-semibold text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(unref(t)("activity.title"))}</h1>`);
          } else {
            return [
              createVNode("h1", { class: "text-xl font-semibold text-gray-900 dark:text-white" }, toDisplayString(unref(t)("activity.title")), 1)
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b;
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), {
              title: unref(t)("activity.title")
            }, null, _parent2, _scopeId));
            if (!((_a = __props.logs) == null ? void 0 : _a.length)) {
              _push2(`<div class="rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-16 text-center"${_scopeId}><p class="text-gray-500 dark:text-gray-400"${_scopeId}>${ssrInterpolate(unref(t)("activity.no_activity"))}</p></div>`);
            } else {
              _push2(`<div class="rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm overflow-hidden"${_scopeId}><div class="divide-y divide-gray-100 dark:divide-gray-700"${_scopeId}><!--[-->`);
              ssrRenderList(__props.logs, (log) => {
                _push2(`<div class="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"${_scopeId}><span class="${ssrRenderClass(["inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium capitalize", actionColors[log.action] || "bg-gray-100 text-gray-700"])}"${_scopeId}>${ssrInterpolate(unref(t)(`activity.${log.action}`))}</span><div class="flex-1 min-w-0"${_scopeId}><p class="text-sm text-gray-900 dark:text-white"${_scopeId}><span class="font-medium"${_scopeId}>${ssrInterpolate(log.subject_type)}</span>`);
                if (log.subject_name) {
                  _push2(`<span class="text-gray-500 dark:text-gray-400"${_scopeId}> — ${ssrInterpolate(log.subject_name)}</span>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</p>`);
                if (log.organization) {
                  _push2(`<p class="text-xs text-gray-400 mt-0.5"${_scopeId}>${ssrInterpolate(log.organization.name)}</p>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div><span class="text-xs text-gray-400 flex-shrink-0"${_scopeId}>${ssrInterpolate(formatDate(log.created_at))}</span></div>`);
              });
              _push2(`<!--]--></div></div>`);
            }
          } else {
            return [
              createVNode(unref(Head), {
                title: unref(t)("activity.title")
              }, null, 8, ["title"]),
              !((_b = __props.logs) == null ? void 0 : _b.length) ? (openBlock(), createBlock("div", {
                key: 0,
                class: "rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-16 text-center"
              }, [
                createVNode("p", { class: "text-gray-500 dark:text-gray-400" }, toDisplayString(unref(t)("activity.no_activity")), 1)
              ])) : (openBlock(), createBlock("div", {
                key: 1,
                class: "rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm overflow-hidden"
              }, [
                createVNode("div", { class: "divide-y divide-gray-100 dark:divide-gray-700" }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(__props.logs, (log) => {
                    return openBlock(), createBlock("div", {
                      key: log.id,
                      class: "flex items-center gap-4 px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"
                    }, [
                      createVNode("span", {
                        class: ["inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium capitalize", actionColors[log.action] || "bg-gray-100 text-gray-700"]
                      }, toDisplayString(unref(t)(`activity.${log.action}`)), 3),
                      createVNode("div", { class: "flex-1 min-w-0" }, [
                        createVNode("p", { class: "text-sm text-gray-900 dark:text-white" }, [
                          createVNode("span", { class: "font-medium" }, toDisplayString(log.subject_type), 1),
                          log.subject_name ? (openBlock(), createBlock("span", {
                            key: 0,
                            class: "text-gray-500 dark:text-gray-400"
                          }, " — " + toDisplayString(log.subject_name), 1)) : createCommentVNode("", true)
                        ]),
                        log.organization ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "text-xs text-gray-400 mt-0.5"
                        }, toDisplayString(log.organization.name), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("span", { class: "text-xs text-gray-400 flex-shrink-0" }, toDisplayString(formatDate(log.created_at)), 1)
                    ]);
                  }), 128))
                ])
              ]))
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/ActivityLog/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
