import { withCtx, unref, createTextVNode, toDisplayString, openBlock, createBlock, createVNode, Fragment, renderList, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { Head, Link } from "@inertiajs/vue3";
import { useI18n } from "vue-i18n";
import { _ as _sfc_main$1 } from "./AuthenticatedLayout-Cwxv3suN.js";
import "./LanguageSwitcher-DWy6sQ-D.js";
const _sfc_main = {
  __name: "Dashboard",
  __ssrInlineRender: true,
  props: {
    organizations: Array
  },
  setup(__props) {
    const { t } = useI18n();
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h1 class="text-xl font-semibold text-gray-900"${_scopeId}>${ssrInterpolate(unref(t)("dashboard.title"))}</h1>`);
          } else {
            return [
              createVNode("h1", { class: "text-xl font-semibold text-gray-900" }, toDisplayString(unref(t)("dashboard.title")), 1)
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b, _c, _d;
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), {
              title: unref(t)("dashboard.title")
            }, null, _parent2, _scopeId));
            _push2(`<div class="mb-8"${_scopeId}><h2 class="text-2xl font-bold text-gray-900"${_scopeId}>${ssrInterpolate(unref(t)("dashboard.welcome"))}, ${ssrInterpolate((_a = _ctx.$page.props.auth.user) == null ? void 0 : _a.name)}!</h2></div>`);
            if (!((_b = __props.organizations) == null ? void 0 : _b.length)) {
              _push2(`<div class="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-white p-16 text-center"${_scopeId}><div class="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 mb-4"${_scopeId}><svg class="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"${_scopeId}></path></svg></div><h3 class="text-lg font-semibold text-gray-900 mb-2"${_scopeId}>${ssrInterpolate(unref(t)("dashboard.no_orgs"))}</h3>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("organizations.create"),
                class: "mt-4 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/25 hover:bg-indigo-700 transition"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(unref(t)("dashboard.create_first"))}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(unref(t)("dashboard.create_first")), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"${_scopeId}><!--[-->`);
              ssrRenderList(__props.organizations, (org) => {
                _push2(`<div class="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-lg hover:border-indigo-100 transition-all duration-300"${_scopeId}><div class="flex items-start justify-between mb-4"${_scopeId}><div class="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-lg font-bold text-indigo-600"${_scopeId}>${ssrInterpolate(org.name.charAt(0))}</div>`);
                _push2(ssrRenderComponent(unref(Link), {
                  href: _ctx.route("organizations.chart", org.id),
                  class: "flex items-center gap-1 rounded-lg bg-indigo-50 px-3 py-1.5 text-xs font-medium text-indigo-600 hover:bg-indigo-100 transition"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"${_scopeId2}></path></svg> ${ssrInterpolate(unref(t)("dashboard.view_chart"))}`);
                    } else {
                      return [
                        (openBlock(), createBlock("svg", {
                          class: "h-3.5 w-3.5",
                          fill: "none",
                          viewBox: "0 0 24 24",
                          stroke: "currentColor"
                        }, [
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            "stroke-width": "2",
                            d: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                          })
                        ])),
                        createTextVNode(" " + toDisplayString(unref(t)("dashboard.view_chart")), 1)
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(`</div><h3 class="text-lg font-semibold text-gray-900 mb-1"${_scopeId}>${ssrInterpolate(org.name)}</h3>`);
                if (org.description) {
                  _push2(`<p class="text-sm text-gray-500 mb-4 line-clamp-2"${_scopeId}>${ssrInterpolate(org.description)}</p>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<div class="flex items-center gap-4 mt-4 pt-4 border-t border-gray-50"${_scopeId}><div class="flex items-center gap-1.5"${_scopeId}><div class="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-50"${_scopeId}><svg class="h-3.5 w-3.5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"${_scopeId}></path></svg></div><span class="text-sm font-medium text-gray-600"${_scopeId}>${ssrInterpolate(org.roles_count)} ${ssrInterpolate(unref(t)("dashboard.total_roles"))}</span></div><div class="flex items-center gap-1.5"${_scopeId}><div class="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50"${_scopeId}><svg class="h-3.5 w-3.5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"${_scopeId}></path></svg></div><span class="text-sm font-medium text-gray-600"${_scopeId}>${ssrInterpolate(org.people_count)} ${ssrInterpolate(unref(t)("dashboard.total_people"))}</span></div></div>`);
                _push2(ssrRenderComponent(unref(Link), {
                  href: _ctx.route("organizations.show", org.id),
                  class: "mt-4 flex w-full items-center justify-center rounded-xl border border-gray-200 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
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
                _push2(`</div>`);
              });
              _push2(`<!--]-->`);
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("organizations.create"),
                class: "flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 p-6 text-center hover:border-indigo-300 hover:bg-indigo-50/50 transition-all duration-300"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 mb-3"${_scopeId2}><svg class="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"${_scopeId2}></path></svg></div><span class="text-sm font-medium text-gray-500"${_scopeId2}>${ssrInterpolate(unref(t)("organizations.create"))}</span>`);
                  } else {
                    return [
                      createVNode("div", { class: "flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 mb-3" }, [
                        (openBlock(), createBlock("svg", {
                          class: "h-6 w-6 text-gray-400",
                          fill: "none",
                          viewBox: "0 0 24 24",
                          stroke: "currentColor"
                        }, [
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            "stroke-width": "2",
                            d: "M12 4v16m8-8H4"
                          })
                        ]))
                      ]),
                      createVNode("span", { class: "text-sm font-medium text-gray-500" }, toDisplayString(unref(t)("organizations.create")), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            }
          } else {
            return [
              createVNode(unref(Head), {
                title: unref(t)("dashboard.title")
              }, null, 8, ["title"]),
              createVNode("div", { class: "mb-8" }, [
                createVNode("h2", { class: "text-2xl font-bold text-gray-900" }, toDisplayString(unref(t)("dashboard.welcome")) + ", " + toDisplayString((_c = _ctx.$page.props.auth.user) == null ? void 0 : _c.name) + "!", 1)
              ]),
              !((_d = __props.organizations) == null ? void 0 : _d.length) ? (openBlock(), createBlock("div", {
                key: 0,
                class: "flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-white p-16 text-center"
              }, [
                createVNode("div", { class: "flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 mb-4" }, [
                  (openBlock(), createBlock("svg", {
                    class: "h-8 w-8 text-indigo-600",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    stroke: "currentColor"
                  }, [
                    createVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "1.5",
                      d: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    })
                  ]))
                ]),
                createVNode("h3", { class: "text-lg font-semibold text-gray-900 mb-2" }, toDisplayString(unref(t)("dashboard.no_orgs")), 1),
                createVNode(unref(Link), {
                  href: _ctx.route("organizations.create"),
                  class: "mt-4 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/25 hover:bg-indigo-700 transition"
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(unref(t)("dashboard.create_first")), 1)
                  ]),
                  _: 1
                }, 8, ["href"])
              ])) : (openBlock(), createBlock("div", {
                key: 1,
                class: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
              }, [
                (openBlock(true), createBlock(Fragment, null, renderList(__props.organizations, (org) => {
                  return openBlock(), createBlock("div", {
                    key: org.id,
                    class: "group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-lg hover:border-indigo-100 transition-all duration-300"
                  }, [
                    createVNode("div", { class: "flex items-start justify-between mb-4" }, [
                      createVNode("div", { class: "flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-lg font-bold text-indigo-600" }, toDisplayString(org.name.charAt(0)), 1),
                      createVNode(unref(Link), {
                        href: _ctx.route("organizations.chart", org.id),
                        class: "flex items-center gap-1 rounded-lg bg-indigo-50 px-3 py-1.5 text-xs font-medium text-indigo-600 hover:bg-indigo-100 transition"
                      }, {
                        default: withCtx(() => [
                          (openBlock(), createBlock("svg", {
                            class: "h-3.5 w-3.5",
                            fill: "none",
                            viewBox: "0 0 24 24",
                            stroke: "currentColor"
                          }, [
                            createVNode("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              "stroke-width": "2",
                              d: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                            })
                          ])),
                          createTextVNode(" " + toDisplayString(unref(t)("dashboard.view_chart")), 1)
                        ]),
                        _: 1
                      }, 8, ["href"])
                    ]),
                    createVNode("h3", { class: "text-lg font-semibold text-gray-900 mb-1" }, toDisplayString(org.name), 1),
                    org.description ? (openBlock(), createBlock("p", {
                      key: 0,
                      class: "text-sm text-gray-500 mb-4 line-clamp-2"
                    }, toDisplayString(org.description), 1)) : createCommentVNode("", true),
                    createVNode("div", { class: "flex items-center gap-4 mt-4 pt-4 border-t border-gray-50" }, [
                      createVNode("div", { class: "flex items-center gap-1.5" }, [
                        createVNode("div", { class: "flex h-7 w-7 items-center justify-center rounded-lg bg-purple-50" }, [
                          (openBlock(), createBlock("svg", {
                            class: "h-3.5 w-3.5 text-purple-600",
                            fill: "none",
                            viewBox: "0 0 24 24",
                            stroke: "currentColor"
                          }, [
                            createVNode("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              "stroke-width": "2",
                              d: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            })
                          ]))
                        ]),
                        createVNode("span", { class: "text-sm font-medium text-gray-600" }, toDisplayString(org.roles_count) + " " + toDisplayString(unref(t)("dashboard.total_roles")), 1)
                      ]),
                      createVNode("div", { class: "flex items-center gap-1.5" }, [
                        createVNode("div", { class: "flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50" }, [
                          (openBlock(), createBlock("svg", {
                            class: "h-3.5 w-3.5 text-emerald-600",
                            fill: "none",
                            viewBox: "0 0 24 24",
                            stroke: "currentColor"
                          }, [
                            createVNode("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              "stroke-width": "2",
                              d: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                            })
                          ]))
                        ]),
                        createVNode("span", { class: "text-sm font-medium text-gray-600" }, toDisplayString(org.people_count) + " " + toDisplayString(unref(t)("dashboard.total_people")), 1)
                      ])
                    ]),
                    createVNode(unref(Link), {
                      href: _ctx.route("organizations.show", org.id),
                      class: "mt-4 flex w-full items-center justify-center rounded-xl border border-gray-200 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(unref(t)("dashboard.manage")), 1)
                      ]),
                      _: 1
                    }, 8, ["href"])
                  ]);
                }), 128)),
                createVNode(unref(Link), {
                  href: _ctx.route("organizations.create"),
                  class: "flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 p-6 text-center hover:border-indigo-300 hover:bg-indigo-50/50 transition-all duration-300"
                }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 mb-3" }, [
                      (openBlock(), createBlock("svg", {
                        class: "h-6 w-6 text-gray-400",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        stroke: "currentColor"
                      }, [
                        createVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          "stroke-width": "2",
                          d: "M12 4v16m8-8H4"
                        })
                      ]))
                    ]),
                    createVNode("span", { class: "text-sm font-medium text-gray-500" }, toDisplayString(unref(t)("organizations.create")), 1)
                  ]),
                  _: 1
                }, 8, ["href"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Dashboard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
