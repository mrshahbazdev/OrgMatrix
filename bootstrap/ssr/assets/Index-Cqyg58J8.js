import { withCtx, unref, createTextVNode, toDisplayString, createVNode, openBlock, createBlock, Fragment, renderList, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass } from "vue/server-renderer";
import { Head, Link, router } from "@inertiajs/vue3";
import { useI18n } from "vue-i18n";
import { _ as _sfc_main$1 } from "./AuthenticatedLayout-Cwxv3suN.js";
import "./LanguageSwitcher-DWy6sQ-D.js";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: { organization: Object, roles: Array },
  setup(__props) {
    const { t } = useI18n();
    const criticalityColors = {
      low: "bg-gray-100 text-gray-700",
      medium: "bg-blue-100 text-blue-700",
      high: "bg-orange-100 text-orange-700",
      critical: "bg-red-100 text-red-700"
    };
    const destroy = (org, role) => {
      if (confirm(t("roles.delete_confirm"))) {
        router.delete(route("organizations.roles.destroy", [org.id, role.id]));
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center gap-2 text-sm text-gray-500"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("organizations.show", __props.organization.id),
              class: "hover:text-indigo-600"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(__props.organization.name)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(__props.organization.name), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<span${_scopeId}>/</span><span class="text-gray-900 font-semibold"${_scopeId}>${ssrInterpolate(unref(t)("roles.title"))}</span></div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center gap-2 text-sm text-gray-500" }, [
                createVNode(unref(Link), {
                  href: _ctx.route("organizations.show", __props.organization.id),
                  class: "hover:text-indigo-600"
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(__props.organization.name), 1)
                  ]),
                  _: 1
                }, 8, ["href"]),
                createVNode("span", null, "/"),
                createVNode("span", { class: "text-gray-900 font-semibold" }, toDisplayString(unref(t)("roles.title")), 1)
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b;
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), {
              title: unref(t)("roles.title")
            }, null, _parent2, _scopeId));
            _push2(`<div class="flex items-center justify-between mb-6"${_scopeId}><h2 class="text-2xl font-bold text-gray-900"${_scopeId}>${ssrInterpolate(unref(t)("roles.title"))}</h2>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("organizations.roles.create", __props.organization.id),
              class: "rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 transition"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(t)("roles.create"))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(t)("roles.create")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            if (!((_a = __props.roles) == null ? void 0 : _a.length)) {
              _push2(`<div class="rounded-2xl border-2 border-dashed border-gray-200 bg-white p-16 text-center"${_scopeId}><p class="text-gray-500"${_scopeId}>${ssrInterpolate(unref(t)("roles.no_roles"))}</p></div>`);
            } else {
              _push2(`<div class="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm"${_scopeId}><table class="min-w-full divide-y divide-gray-100"${_scopeId}><thead class="bg-gray-50"${_scopeId}><tr${_scopeId}><th class="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500"${_scopeId}>${ssrInterpolate(unref(t)("roles.name"))}</th><th class="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500"${_scopeId}>${ssrInterpolate(unref(t)("roles.department"))}</th><th class="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500"${_scopeId}>${ssrInterpolate(unref(t)("roles.parent_role"))}</th><th class="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500"${_scopeId}>${ssrInterpolate(unref(t)("roles.criticality"))}</th><th class="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500"${_scopeId}>${ssrInterpolate(unref(t)("roles.assigned_to"))}</th><th class="px-6 py-3.5 text-right text-xs font-semibold uppercase tracking-wider text-gray-500"${_scopeId}>${ssrInterpolate(unref(t)("common.actions"))}</th></tr></thead><tbody class="divide-y divide-gray-50"${_scopeId}><!--[-->`);
              ssrRenderList(__props.roles, (role) => {
                var _a2, _b2;
                _push2(`<tr class="hover:bg-gray-50/50 transition"${_scopeId}><td class="px-6 py-4"${_scopeId}><span class="font-medium text-gray-900"${_scopeId}>${ssrInterpolate(role.name)}</span></td><td class="px-6 py-4 text-sm text-gray-500"${_scopeId}>${ssrInterpolate(role.department || "—")}</td><td class="px-6 py-4 text-sm text-gray-500"${_scopeId}>${ssrInterpolate(((_a2 = role.parent) == null ? void 0 : _a2.name) || unref(t)("roles.none"))}</td><td class="px-6 py-4"${_scopeId}><span class="${ssrRenderClass(["inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium", criticalityColors[role.criticality]])}"${_scopeId}>${ssrInterpolate(unref(t)(`roles.${role.criticality}`))}</span></td><td class="px-6 py-4"${_scopeId}>`);
                if ((_b2 = role.assignments) == null ? void 0 : _b2.length) {
                  _push2(`<div class="flex flex-wrap gap-1"${_scopeId}><!--[-->`);
                  ssrRenderList(role.assignments, (a) => {
                    var _a3;
                    _push2(`<span class="${ssrRenderClass(["inline-flex items-center rounded-full px-2.5 py-0.5 text-xs", a.is_primary ? "bg-indigo-100 text-indigo-700 font-medium" : "bg-gray-100 text-gray-600"])}"${_scopeId}>${ssrInterpolate((_a3 = a.person) == null ? void 0 : _a3.full_name)} `);
                    if (a.is_primary) {
                      _push2(`<span class="ml-1 text-indigo-500"${_scopeId}>*</span>`);
                    } else {
                      _push2(`<!---->`);
                    }
                    _push2(`</span>`);
                  });
                  _push2(`<!--]--></div>`);
                } else {
                  _push2(`<span class="text-sm text-amber-600"${_scopeId}>${ssrInterpolate(unref(t)("chart.vacant"))}</span>`);
                }
                _push2(`</td><td class="px-6 py-4 text-right"${_scopeId}><div class="flex items-center justify-end gap-2"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Link), {
                  href: _ctx.route("organizations.roles.assign", [__props.organization.id, role.id]),
                  class: "rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700 hover:bg-emerald-100 transition"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`${ssrInterpolate(unref(t)("roles.assign_person"))}`);
                    } else {
                      return [
                        createTextVNode(toDisplayString(unref(t)("roles.assign_person")), 1)
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(ssrRenderComponent(unref(Link), {
                  href: _ctx.route("organizations.roles.edit", [__props.organization.id, role.id]),
                  class: "rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-200 transition"
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
                _push2(`<button class="rounded-lg bg-red-50 px-3 py-1.5 text-xs font-medium text-red-700 hover:bg-red-100 transition"${_scopeId}>${ssrInterpolate(unref(t)("common.delete"))}</button></div></td></tr>`);
              });
              _push2(`<!--]--></tbody></table></div>`);
            }
          } else {
            return [
              createVNode(unref(Head), {
                title: unref(t)("roles.title")
              }, null, 8, ["title"]),
              createVNode("div", { class: "flex items-center justify-between mb-6" }, [
                createVNode("h2", { class: "text-2xl font-bold text-gray-900" }, toDisplayString(unref(t)("roles.title")), 1),
                createVNode(unref(Link), {
                  href: _ctx.route("organizations.roles.create", __props.organization.id),
                  class: "rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 transition"
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(unref(t)("roles.create")), 1)
                  ]),
                  _: 1
                }, 8, ["href"])
              ]),
              !((_b = __props.roles) == null ? void 0 : _b.length) ? (openBlock(), createBlock("div", {
                key: 0,
                class: "rounded-2xl border-2 border-dashed border-gray-200 bg-white p-16 text-center"
              }, [
                createVNode("p", { class: "text-gray-500" }, toDisplayString(unref(t)("roles.no_roles")), 1)
              ])) : (openBlock(), createBlock("div", {
                key: 1,
                class: "overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm"
              }, [
                createVNode("table", { class: "min-w-full divide-y divide-gray-100" }, [
                  createVNode("thead", { class: "bg-gray-50" }, [
                    createVNode("tr", null, [
                      createVNode("th", { class: "px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500" }, toDisplayString(unref(t)("roles.name")), 1),
                      createVNode("th", { class: "px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500" }, toDisplayString(unref(t)("roles.department")), 1),
                      createVNode("th", { class: "px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500" }, toDisplayString(unref(t)("roles.parent_role")), 1),
                      createVNode("th", { class: "px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500" }, toDisplayString(unref(t)("roles.criticality")), 1),
                      createVNode("th", { class: "px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500" }, toDisplayString(unref(t)("roles.assigned_to")), 1),
                      createVNode("th", { class: "px-6 py-3.5 text-right text-xs font-semibold uppercase tracking-wider text-gray-500" }, toDisplayString(unref(t)("common.actions")), 1)
                    ])
                  ]),
                  createVNode("tbody", { class: "divide-y divide-gray-50" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.roles, (role) => {
                      var _a2, _b2;
                      return openBlock(), createBlock("tr", {
                        key: role.id,
                        class: "hover:bg-gray-50/50 transition"
                      }, [
                        createVNode("td", { class: "px-6 py-4" }, [
                          createVNode("span", { class: "font-medium text-gray-900" }, toDisplayString(role.name), 1)
                        ]),
                        createVNode("td", { class: "px-6 py-4 text-sm text-gray-500" }, toDisplayString(role.department || "—"), 1),
                        createVNode("td", { class: "px-6 py-4 text-sm text-gray-500" }, toDisplayString(((_a2 = role.parent) == null ? void 0 : _a2.name) || unref(t)("roles.none")), 1),
                        createVNode("td", { class: "px-6 py-4" }, [
                          createVNode("span", {
                            class: ["inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium", criticalityColors[role.criticality]]
                          }, toDisplayString(unref(t)(`roles.${role.criticality}`)), 3)
                        ]),
                        createVNode("td", { class: "px-6 py-4" }, [
                          ((_b2 = role.assignments) == null ? void 0 : _b2.length) ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "flex flex-wrap gap-1"
                          }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(role.assignments, (a) => {
                              var _a3;
                              return openBlock(), createBlock("span", {
                                key: a.id,
                                class: ["inline-flex items-center rounded-full px-2.5 py-0.5 text-xs", a.is_primary ? "bg-indigo-100 text-indigo-700 font-medium" : "bg-gray-100 text-gray-600"]
                              }, [
                                createTextVNode(toDisplayString((_a3 = a.person) == null ? void 0 : _a3.full_name) + " ", 1),
                                a.is_primary ? (openBlock(), createBlock("span", {
                                  key: 0,
                                  class: "ml-1 text-indigo-500"
                                }, "*")) : createCommentVNode("", true)
                              ], 2);
                            }), 128))
                          ])) : (openBlock(), createBlock("span", {
                            key: 1,
                            class: "text-sm text-amber-600"
                          }, toDisplayString(unref(t)("chart.vacant")), 1))
                        ]),
                        createVNode("td", { class: "px-6 py-4 text-right" }, [
                          createVNode("div", { class: "flex items-center justify-end gap-2" }, [
                            createVNode(unref(Link), {
                              href: _ctx.route("organizations.roles.assign", [__props.organization.id, role.id]),
                              class: "rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700 hover:bg-emerald-100 transition"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(unref(t)("roles.assign_person")), 1)
                              ]),
                              _: 1
                            }, 8, ["href"]),
                            createVNode(unref(Link), {
                              href: _ctx.route("organizations.roles.edit", [__props.organization.id, role.id]),
                              class: "rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-200 transition"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(unref(t)("common.edit")), 1)
                              ]),
                              _: 1
                            }, 8, ["href"]),
                            createVNode("button", {
                              onClick: ($event) => destroy(__props.organization, role),
                              class: "rounded-lg bg-red-50 px-3 py-1.5 text-xs font-medium text-red-700 hover:bg-red-100 transition"
                            }, toDisplayString(unref(t)("common.delete")), 9, ["onClick"])
                          ])
                        ])
                      ]);
                    }), 128))
                  ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Roles/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
