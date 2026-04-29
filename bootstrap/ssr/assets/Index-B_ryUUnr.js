import { withCtx, unref, createTextVNode, toDisplayString, createVNode, openBlock, createBlock, Fragment, renderList, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { Head, Link, router } from "@inertiajs/vue3";
import { useI18n } from "vue-i18n";
import { _ as _sfc_main$1 } from "./AuthenticatedLayout-C7ouL3e5.js";
import "./LanguageSwitcher-DWy6sQ-D.js";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: { organizations: Array },
  setup(__props) {
    const { t } = useI18n();
    const destroy = (org) => {
      if (confirm(t("organizations.delete_confirm"))) {
        router.delete(route("organizations.destroy", org.id));
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h1 class="text-xl font-semibold text-gray-900"${_scopeId}>${ssrInterpolate(unref(t)("organizations.title"))}</h1>`);
          } else {
            return [
              createVNode("h1", { class: "text-xl font-semibold text-gray-900" }, toDisplayString(unref(t)("organizations.title")), 1)
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b;
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), {
              title: unref(t)("organizations.title")
            }, null, _parent2, _scopeId));
            _push2(`<div class="flex items-center justify-between mb-6"${_scopeId}><h2 class="text-2xl font-bold text-gray-900"${_scopeId}>${ssrInterpolate(unref(t)("organizations.title"))}</h2>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("organizations.create"),
              class: "rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 transition"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(t)("organizations.create"))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(t)("organizations.create")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            if (!((_a = __props.organizations) == null ? void 0 : _a.length)) {
              _push2(`<div class="rounded-2xl border-2 border-dashed border-gray-200 bg-white p-16 text-center"${_scopeId}><p class="text-gray-500"${_scopeId}>${ssrInterpolate(unref(t)("organizations.no_orgs"))}</p></div>`);
            } else {
              _push2(`<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"${_scopeId}><!--[-->`);
              ssrRenderList(__props.organizations, (org) => {
                _push2(`<div class="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-lg transition-all"${_scopeId}><div class="flex items-center gap-3 mb-3"${_scopeId}><div class="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 font-bold text-indigo-600"${_scopeId}>${ssrInterpolate(org.name.charAt(0))}</div><div${_scopeId}><h3 class="font-semibold text-gray-900"${_scopeId}>${ssrInterpolate(org.name)}</h3>`);
                if (org.industry) {
                  _push2(`<p class="text-xs text-gray-500"${_scopeId}>${ssrInterpolate(org.industry)}</p>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div></div>`);
                if (org.description) {
                  _push2(`<p class="text-sm text-gray-500 mb-4 line-clamp-2"${_scopeId}>${ssrInterpolate(org.description)}</p>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<div class="flex gap-4 text-sm text-gray-500 mb-4"${_scopeId}><span${_scopeId}>${ssrInterpolate(org.roles_count)} ${ssrInterpolate(unref(t)("organizations.roles_count"))}</span><span${_scopeId}>${ssrInterpolate(org.people_count)} ${ssrInterpolate(unref(t)("organizations.people_count"))}</span></div><div class="flex gap-2"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Link), {
                  href: _ctx.route("organizations.show", org.id),
                  class: "flex-1 rounded-lg border border-gray-200 py-2 text-center text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`${ssrInterpolate(unref(t)("dashboard.manage"))}`);
                    } else {
                      return [
                        createTextVNode(toDisplayString(unref(t)("dashboard.manage")), 1)
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(ssrRenderComponent(unref(Link), {
                  href: _ctx.route("organizations.edit", org.id),
                  class: "rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-500 hover:bg-gray-50 transition"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`${ssrInterpolate(unref(t)("common.edit"))}`);
                    } else {
                      return [
                        createTextVNode(toDisplayString(unref(t)("common.edit")), 1)
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(`<button class="rounded-lg border border-red-200 px-3 py-2 text-sm text-red-500 hover:bg-red-50 transition"${_scopeId}>${ssrInterpolate(unref(t)("common.delete"))}</button></div></div>`);
              });
              _push2(`<!--]--></div>`);
            }
          } else {
            return [
              createVNode(unref(Head), {
                title: unref(t)("organizations.title")
              }, null, 8, ["title"]),
              createVNode("div", { class: "flex items-center justify-between mb-6" }, [
                createVNode("h2", { class: "text-2xl font-bold text-gray-900" }, toDisplayString(unref(t)("organizations.title")), 1),
                createVNode(unref(Link), {
                  href: _ctx.route("organizations.create"),
                  class: "rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 transition"
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(unref(t)("organizations.create")), 1)
                  ]),
                  _: 1
                }, 8, ["href"])
              ]),
              !((_b = __props.organizations) == null ? void 0 : _b.length) ? (openBlock(), createBlock("div", {
                key: 0,
                class: "rounded-2xl border-2 border-dashed border-gray-200 bg-white p-16 text-center"
              }, [
                createVNode("p", { class: "text-gray-500" }, toDisplayString(unref(t)("organizations.no_orgs")), 1)
              ])) : (openBlock(), createBlock("div", {
                key: 1,
                class: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
              }, [
                (openBlock(true), createBlock(Fragment, null, renderList(__props.organizations, (org) => {
                  return openBlock(), createBlock("div", {
                    key: org.id,
                    class: "rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-lg transition-all"
                  }, [
                    createVNode("div", { class: "flex items-center gap-3 mb-3" }, [
                      createVNode("div", { class: "flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 font-bold text-indigo-600" }, toDisplayString(org.name.charAt(0)), 1),
                      createVNode("div", null, [
                        createVNode("h3", { class: "font-semibold text-gray-900" }, toDisplayString(org.name), 1),
                        org.industry ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "text-xs text-gray-500"
                        }, toDisplayString(org.industry), 1)) : createCommentVNode("", true)
                      ])
                    ]),
                    org.description ? (openBlock(), createBlock("p", {
                      key: 0,
                      class: "text-sm text-gray-500 mb-4 line-clamp-2"
                    }, toDisplayString(org.description), 1)) : createCommentVNode("", true),
                    createVNode("div", { class: "flex gap-4 text-sm text-gray-500 mb-4" }, [
                      createVNode("span", null, toDisplayString(org.roles_count) + " " + toDisplayString(unref(t)("organizations.roles_count")), 1),
                      createVNode("span", null, toDisplayString(org.people_count) + " " + toDisplayString(unref(t)("organizations.people_count")), 1)
                    ]),
                    createVNode("div", { class: "flex gap-2" }, [
                      createVNode(unref(Link), {
                        href: _ctx.route("organizations.show", org.id),
                        class: "flex-1 rounded-lg border border-gray-200 py-2 text-center text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(unref(t)("dashboard.manage")), 1)
                        ]),
                        _: 1
                      }, 8, ["href"]),
                      createVNode(unref(Link), {
                        href: _ctx.route("organizations.edit", org.id),
                        class: "rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-500 hover:bg-gray-50 transition"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(unref(t)("common.edit")), 1)
                        ]),
                        _: 1
                      }, 8, ["href"]),
                      createVNode("button", {
                        onClick: ($event) => destroy(org),
                        class: "rounded-lg border border-red-200 px-3 py-2 text-sm text-red-500 hover:bg-red-50 transition"
                      }, toDisplayString(unref(t)("common.delete")), 9, ["onClick"])
                    ])
                  ]);
                }), 128))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Organizations/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
