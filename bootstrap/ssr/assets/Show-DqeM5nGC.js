import { withCtx, unref, createVNode, openBlock, createBlock, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderClass } from "vue/server-renderer";
import { Head, Link } from "@inertiajs/vue3";
import { useI18n } from "vue-i18n";
import { _ as _sfc_main$1 } from "./AuthenticatedLayout-C7ouL3e5.js";
import "./LanguageSwitcher-DWy6sQ-D.js";
const _sfc_main = {
  __name: "Show",
  __ssrInlineRender: true,
  props: { organization: Object, stats: Object },
  setup(__props) {
    const { t } = useI18n();
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h1 class="text-xl font-semibold text-gray-900"${_scopeId}>${ssrInterpolate(__props.organization.name)}</h1>`);
          } else {
            return [
              createVNode("h1", { class: "text-xl font-semibold text-gray-900" }, toDisplayString(__props.organization.name), 1)
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), {
              title: __props.organization.name
            }, null, _parent2, _scopeId));
            _push2(`<div class="grid grid-cols-2 gap-4 mb-8 lg:grid-cols-4"${_scopeId}><div class="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"${_scopeId}><p class="text-sm text-gray-500"${_scopeId}>${ssrInterpolate(unref(t)("organizations.roles_count"))}</p><p class="mt-1 text-3xl font-bold text-gray-900"${_scopeId}>${ssrInterpolate(__props.stats.total_roles)}</p></div><div class="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"${_scopeId}><p class="text-sm text-gray-500"${_scopeId}>${ssrInterpolate(unref(t)("organizations.people_count"))}</p><p class="mt-1 text-3xl font-bold text-gray-900"${_scopeId}>${ssrInterpolate(__props.stats.total_people)}</p></div><div class="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"${_scopeId}><p class="text-sm text-gray-500"${_scopeId}>${ssrInterpolate(unref(t)("organizations.active_roles"))}</p><p class="mt-1 text-3xl font-bold text-emerald-600"${_scopeId}>${ssrInterpolate(__props.stats.active_roles)}</p></div><div class="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"${_scopeId}><p class="text-sm text-gray-500"${_scopeId}>${ssrInterpolate(unref(t)("organizations.unassigned"))}</p><p class="${ssrRenderClass([__props.stats.unassigned_roles > 0 ? "text-amber-600" : "text-gray-900", "mt-1 text-3xl font-bold"])}"${_scopeId}>${ssrInterpolate(__props.stats.unassigned_roles)}</p></div></div><div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("organizations.roles.index", __props.organization.id),
              class: "flex items-center gap-3 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm hover:shadow-lg hover:border-indigo-100 transition-all"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50"${_scopeId2}><svg class="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"${_scopeId2}></path></svg></div><div${_scopeId2}><p class="font-semibold text-gray-900"${_scopeId2}>${ssrInterpolate(unref(t)("nav.roles"))}</p><p class="text-xs text-gray-500"${_scopeId2}>${ssrInterpolate(__props.stats.total_roles)} ${ssrInterpolate(unref(t)("organizations.roles_count"))}</p></div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50" }, [
                      (openBlock(), createBlock("svg", {
                        class: "h-5 w-5 text-purple-600",
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
                    createVNode("div", null, [
                      createVNode("p", { class: "font-semibold text-gray-900" }, toDisplayString(unref(t)("nav.roles")), 1),
                      createVNode("p", { class: "text-xs text-gray-500" }, toDisplayString(__props.stats.total_roles) + " " + toDisplayString(unref(t)("organizations.roles_count")), 1)
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("organizations.persons.index", __props.organization.id),
              class: "flex items-center gap-3 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm hover:shadow-lg hover:border-indigo-100 transition-all"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50"${_scopeId2}><svg class="h-5 w-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"${_scopeId2}></path></svg></div><div${_scopeId2}><p class="font-semibold text-gray-900"${_scopeId2}>${ssrInterpolate(unref(t)("nav.persons"))}</p><p class="text-xs text-gray-500"${_scopeId2}>${ssrInterpolate(__props.stats.total_people)} ${ssrInterpolate(unref(t)("organizations.people_count"))}</p></div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50" }, [
                      (openBlock(), createBlock("svg", {
                        class: "h-5 w-5 text-emerald-600",
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
                    createVNode("div", null, [
                      createVNode("p", { class: "font-semibold text-gray-900" }, toDisplayString(unref(t)("nav.persons")), 1),
                      createVNode("p", { class: "text-xs text-gray-500" }, toDisplayString(__props.stats.total_people) + " " + toDisplayString(unref(t)("organizations.people_count")), 1)
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("organizations.chart", __props.organization.id),
              class: "flex items-center gap-3 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm hover:shadow-lg hover:border-indigo-100 transition-all"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50"${_scopeId2}><svg class="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"${_scopeId2}></path></svg></div><div${_scopeId2}><p class="font-semibold text-gray-900"${_scopeId2}>${ssrInterpolate(unref(t)("nav.orgChart"))}</p><p class="text-xs text-gray-500"${_scopeId2}>${ssrInterpolate(unref(t)("dashboard.view_chart"))}</p></div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50" }, [
                      (openBlock(), createBlock("svg", {
                        class: "h-5 w-5 text-indigo-600",
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
                      ]))
                    ]),
                    createVNode("div", null, [
                      createVNode("p", { class: "font-semibold text-gray-900" }, toDisplayString(unref(t)("nav.orgChart")), 1),
                      createVNode("p", { class: "text-xs text-gray-500" }, toDisplayString(unref(t)("dashboard.view_chart")), 1)
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("organizations.edit", __props.organization.id),
              class: "flex items-center gap-3 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm hover:shadow-lg hover:border-indigo-100 transition-all"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100"${_scopeId2}><svg class="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"${_scopeId2}></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"${_scopeId2}></path></svg></div><div${_scopeId2}><p class="font-semibold text-gray-900"${_scopeId2}>${ssrInterpolate(unref(t)("common.edit"))}</p><p class="text-xs text-gray-500"${_scopeId2}>${ssrInterpolate(unref(t)("organizations.edit"))}</p></div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100" }, [
                      (openBlock(), createBlock("svg", {
                        class: "h-5 w-5 text-gray-600",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        stroke: "currentColor"
                      }, [
                        createVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          "stroke-width": "2",
                          d: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                        }),
                        createVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          "stroke-width": "2",
                          d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        })
                      ]))
                    ]),
                    createVNode("div", null, [
                      createVNode("p", { class: "font-semibold text-gray-900" }, toDisplayString(unref(t)("common.edit")), 1),
                      createVNode("p", { class: "text-xs text-gray-500" }, toDisplayString(unref(t)("organizations.edit")), 1)
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode(unref(Head), {
                title: __props.organization.name
              }, null, 8, ["title"]),
              createVNode("div", { class: "grid grid-cols-2 gap-4 mb-8 lg:grid-cols-4" }, [
                createVNode("div", { class: "rounded-2xl border border-gray-100 bg-white p-5 shadow-sm" }, [
                  createVNode("p", { class: "text-sm text-gray-500" }, toDisplayString(unref(t)("organizations.roles_count")), 1),
                  createVNode("p", { class: "mt-1 text-3xl font-bold text-gray-900" }, toDisplayString(__props.stats.total_roles), 1)
                ]),
                createVNode("div", { class: "rounded-2xl border border-gray-100 bg-white p-5 shadow-sm" }, [
                  createVNode("p", { class: "text-sm text-gray-500" }, toDisplayString(unref(t)("organizations.people_count")), 1),
                  createVNode("p", { class: "mt-1 text-3xl font-bold text-gray-900" }, toDisplayString(__props.stats.total_people), 1)
                ]),
                createVNode("div", { class: "rounded-2xl border border-gray-100 bg-white p-5 shadow-sm" }, [
                  createVNode("p", { class: "text-sm text-gray-500" }, toDisplayString(unref(t)("organizations.active_roles")), 1),
                  createVNode("p", { class: "mt-1 text-3xl font-bold text-emerald-600" }, toDisplayString(__props.stats.active_roles), 1)
                ]),
                createVNode("div", { class: "rounded-2xl border border-gray-100 bg-white p-5 shadow-sm" }, [
                  createVNode("p", { class: "text-sm text-gray-500" }, toDisplayString(unref(t)("organizations.unassigned")), 1),
                  createVNode("p", {
                    class: ["mt-1 text-3xl font-bold", __props.stats.unassigned_roles > 0 ? "text-amber-600" : "text-gray-900"]
                  }, toDisplayString(__props.stats.unassigned_roles), 3)
                ])
              ]),
              createVNode("div", { class: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8" }, [
                createVNode(unref(Link), {
                  href: _ctx.route("organizations.roles.index", __props.organization.id),
                  class: "flex items-center gap-3 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm hover:shadow-lg hover:border-indigo-100 transition-all"
                }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50" }, [
                      (openBlock(), createBlock("svg", {
                        class: "h-5 w-5 text-purple-600",
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
                    createVNode("div", null, [
                      createVNode("p", { class: "font-semibold text-gray-900" }, toDisplayString(unref(t)("nav.roles")), 1),
                      createVNode("p", { class: "text-xs text-gray-500" }, toDisplayString(__props.stats.total_roles) + " " + toDisplayString(unref(t)("organizations.roles_count")), 1)
                    ])
                  ]),
                  _: 1
                }, 8, ["href"]),
                createVNode(unref(Link), {
                  href: _ctx.route("organizations.persons.index", __props.organization.id),
                  class: "flex items-center gap-3 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm hover:shadow-lg hover:border-indigo-100 transition-all"
                }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50" }, [
                      (openBlock(), createBlock("svg", {
                        class: "h-5 w-5 text-emerald-600",
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
                    createVNode("div", null, [
                      createVNode("p", { class: "font-semibold text-gray-900" }, toDisplayString(unref(t)("nav.persons")), 1),
                      createVNode("p", { class: "text-xs text-gray-500" }, toDisplayString(__props.stats.total_people) + " " + toDisplayString(unref(t)("organizations.people_count")), 1)
                    ])
                  ]),
                  _: 1
                }, 8, ["href"]),
                createVNode(unref(Link), {
                  href: _ctx.route("organizations.chart", __props.organization.id),
                  class: "flex items-center gap-3 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm hover:shadow-lg hover:border-indigo-100 transition-all"
                }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50" }, [
                      (openBlock(), createBlock("svg", {
                        class: "h-5 w-5 text-indigo-600",
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
                      ]))
                    ]),
                    createVNode("div", null, [
                      createVNode("p", { class: "font-semibold text-gray-900" }, toDisplayString(unref(t)("nav.orgChart")), 1),
                      createVNode("p", { class: "text-xs text-gray-500" }, toDisplayString(unref(t)("dashboard.view_chart")), 1)
                    ])
                  ]),
                  _: 1
                }, 8, ["href"]),
                createVNode(unref(Link), {
                  href: _ctx.route("organizations.edit", __props.organization.id),
                  class: "flex items-center gap-3 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm hover:shadow-lg hover:border-indigo-100 transition-all"
                }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100" }, [
                      (openBlock(), createBlock("svg", {
                        class: "h-5 w-5 text-gray-600",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        stroke: "currentColor"
                      }, [
                        createVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          "stroke-width": "2",
                          d: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                        }),
                        createVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          "stroke-width": "2",
                          d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        })
                      ]))
                    ]),
                    createVNode("div", null, [
                      createVNode("p", { class: "font-semibold text-gray-900" }, toDisplayString(unref(t)("common.edit")), 1),
                      createVNode("p", { class: "text-xs text-gray-500" }, toDisplayString(unref(t)("organizations.edit")), 1)
                    ])
                  ]),
                  _: 1
                }, 8, ["href"])
              ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Organizations/Show.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
