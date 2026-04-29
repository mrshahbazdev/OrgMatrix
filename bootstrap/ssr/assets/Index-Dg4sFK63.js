import { ref, computed, withCtx, unref, createTextVNode, toDisplayString, createVNode, openBlock, createBlock, withDirectives, vModelText, vModelSelect, createCommentVNode, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderClass } from "vue/server-renderer";
import { Head, Link, router } from "@inertiajs/vue3";
import { useI18n } from "vue-i18n";
import { _ as _sfc_main$1 } from "./AuthenticatedLayout-C7ouL3e5.js";
import "./LanguageSwitcher-DWy6sQ-D.js";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: { organization: Object, roles: Array },
  setup(__props) {
    const { t } = useI18n();
    const props = __props;
    const searchQuery = ref("");
    const criticalityFilter = ref("all");
    const coverageFilter = ref("all");
    const filteredRoles = computed(() => {
      let result = props.roles || [];
      if (searchQuery.value) {
        const q = searchQuery.value.toLowerCase();
        result = result.filter(
          (r) => {
            var _a;
            return r.name.toLowerCase().includes(q) || r.department && r.department.toLowerCase().includes(q) || ((_a = r.parent) == null ? void 0 : _a.name) && r.parent.name.toLowerCase().includes(q);
          }
        );
      }
      if (criticalityFilter.value !== "all") {
        result = result.filter((r) => r.criticality === criticalityFilter.value);
      }
      if (coverageFilter.value === "vacant") {
        result = result.filter((r) => {
          var _a;
          return !((_a = r.assignments) == null ? void 0 : _a.length);
        });
      } else if (coverageFilter.value === "filled") {
        result = result.filter((r) => {
          var _a;
          return ((_a = r.assignments) == null ? void 0 : _a.length) > 0;
        });
      }
      return result;
    });
    const criticalityColors = {
      low: "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300",
      medium: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
      high: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
      critical: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
    };
    const destroy = (org, role) => {
      if (confirm(t("roles.delete_confirm"))) {
        router.delete(route("organizations.roles.destroy", [org.id, role.id]));
      }
    };
    const isAtRisk = (role) => {
      var _a;
      return !((_a = role.assignments) == null ? void 0 : _a.length) && ["high", "critical"].includes(role.criticality);
    };
    const clearFilters = () => {
      searchQuery.value = "";
      criticalityFilter.value = "all";
      coverageFilter.value = "all";
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400"${_scopeId}>`);
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
            _push2(`<span${_scopeId}>/</span><span class="text-gray-900 dark:text-white font-semibold"${_scopeId}>${ssrInterpolate(unref(t)("roles.title"))}</span></div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400" }, [
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
                createVNode("span", { class: "text-gray-900 dark:text-white font-semibold" }, toDisplayString(unref(t)("roles.title")), 1)
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
            _push2(`<div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6"${_scopeId}><h2 class="text-2xl font-bold text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(unref(t)("roles.title"))}</h2><div class="flex flex-wrap gap-2"${_scopeId}><a${ssrRenderAttr("href", _ctx.route("organizations.export.roles", __props.organization.id))} class="rounded-xl border border-gray-200 dark:border-gray-600 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition"${_scopeId}>${ssrInterpolate(unref(t)("import_export.export_roles"))}</a>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("organizations.roles.create", __props.organization.id),
              class: "rounded-xl bg-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 transition"
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
            _push2(`</div></div><div class="flex flex-col sm:flex-row gap-3 mb-4"${_scopeId}><div class="relative flex-1"${_scopeId}><svg class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"${_scopeId}></path></svg><input${ssrRenderAttr("value", searchQuery.value)} type="text"${ssrRenderAttr("placeholder", unref(t)("common.search"))} class="w-full rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 py-2.5 pl-10 pr-4 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500"${_scopeId}></div><select class="rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 py-2.5 px-4 text-sm text-gray-700 dark:text-gray-300"${_scopeId}><option value="all"${ssrIncludeBooleanAttr(Array.isArray(criticalityFilter.value) ? ssrLooseContain(criticalityFilter.value, "all") : ssrLooseEqual(criticalityFilter.value, "all")) ? " selected" : ""}${_scopeId}>${ssrInterpolate(unref(t)("roles.criticality"))}: ${ssrInterpolate(unref(t)("common.all"))}</option><option value="low"${ssrIncludeBooleanAttr(Array.isArray(criticalityFilter.value) ? ssrLooseContain(criticalityFilter.value, "low") : ssrLooseEqual(criticalityFilter.value, "low")) ? " selected" : ""}${_scopeId}>${ssrInterpolate(unref(t)("roles.low"))}</option><option value="medium"${ssrIncludeBooleanAttr(Array.isArray(criticalityFilter.value) ? ssrLooseContain(criticalityFilter.value, "medium") : ssrLooseEqual(criticalityFilter.value, "medium")) ? " selected" : ""}${_scopeId}>${ssrInterpolate(unref(t)("roles.medium"))}</option><option value="high"${ssrIncludeBooleanAttr(Array.isArray(criticalityFilter.value) ? ssrLooseContain(criticalityFilter.value, "high") : ssrLooseEqual(criticalityFilter.value, "high")) ? " selected" : ""}${_scopeId}>${ssrInterpolate(unref(t)("roles.high"))}</option><option value="critical"${ssrIncludeBooleanAttr(Array.isArray(criticalityFilter.value) ? ssrLooseContain(criticalityFilter.value, "critical") : ssrLooseEqual(criticalityFilter.value, "critical")) ? " selected" : ""}${_scopeId}>${ssrInterpolate(unref(t)("roles.critical"))}</option></select><select class="rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 py-2.5 px-4 text-sm text-gray-700 dark:text-gray-300"${_scopeId}><option value="all"${ssrIncludeBooleanAttr(Array.isArray(coverageFilter.value) ? ssrLooseContain(coverageFilter.value, "all") : ssrLooseEqual(coverageFilter.value, "all")) ? " selected" : ""}${_scopeId}>${ssrInterpolate(unref(t)("roles.coverage"))}: ${ssrInterpolate(unref(t)("common.all"))}</option><option value="filled"${ssrIncludeBooleanAttr(Array.isArray(coverageFilter.value) ? ssrLooseContain(coverageFilter.value, "filled") : ssrLooseEqual(coverageFilter.value, "filled")) ? " selected" : ""}${_scopeId}>${ssrInterpolate(unref(t)("dashboard.filled"))}</option><option value="vacant"${ssrIncludeBooleanAttr(Array.isArray(coverageFilter.value) ? ssrLooseContain(coverageFilter.value, "vacant") : ssrLooseEqual(coverageFilter.value, "vacant")) ? " selected" : ""}${_scopeId}>${ssrInterpolate(unref(t)("dashboard.vacant"))}</option></select>`);
            if (searchQuery.value || criticalityFilter.value !== "all" || coverageFilter.value !== "all") {
              _push2(`<button class="rounded-xl border border-gray-200 dark:border-gray-600 px-4 py-2.5 text-sm text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700 transition"${_scopeId}>${ssrInterpolate(unref(t)("common.clear_filters"))}</button>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            if (!((_a = __props.roles) == null ? void 0 : _a.length)) {
              _push2(`<div class="rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-16 text-center"${_scopeId}><p class="text-gray-500 dark:text-gray-400"${_scopeId}>${ssrInterpolate(unref(t)("roles.no_roles"))}</p></div>`);
            } else if (!filteredRoles.value.length) {
              _push2(`<div class="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-12 text-center"${_scopeId}><p class="text-gray-500 dark:text-gray-400"${_scopeId}>${ssrInterpolate(unref(t)("common.no_results"))}</p></div>`);
            } else {
              _push2(`<div class="overflow-x-auto rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm"${_scopeId}><table class="min-w-full divide-y divide-gray-100 dark:divide-gray-700"${_scopeId}><thead class="bg-gray-50 dark:bg-gray-700/50"${_scopeId}><tr${_scopeId}><th class="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400"${_scopeId}>${ssrInterpolate(unref(t)("roles.name"))}</th><th class="hidden sm:table-cell px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400"${_scopeId}>${ssrInterpolate(unref(t)("roles.department"))}</th><th class="hidden md:table-cell px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400"${_scopeId}>${ssrInterpolate(unref(t)("roles.parent_role"))}</th><th class="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400"${_scopeId}>${ssrInterpolate(unref(t)("roles.criticality"))}</th><th class="hidden lg:table-cell px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400"${_scopeId}>${ssrInterpolate(unref(t)("roles.assigned_to"))}</th><th class="px-6 py-3.5 text-right text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400"${_scopeId}>${ssrInterpolate(unref(t)("common.actions"))}</th></tr></thead><tbody class="divide-y divide-gray-50 dark:divide-gray-700"${_scopeId}><!--[-->`);
              ssrRenderList(filteredRoles.value, (role) => {
                var _a2, _b2;
                _push2(`<tr class="${ssrRenderClass([isAtRisk(role) ? "bg-red-50/30 dark:bg-red-900/10" : "", "hover:bg-gray-50/50 dark:hover:bg-gray-700/30 transition"])}"${_scopeId}><td class="px-6 py-4"${_scopeId}><div class="flex items-center gap-2"${_scopeId}><span class="font-medium text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(role.name)}</span>`);
                if (isAtRisk(role)) {
                  _push2(`<span class="inline-flex items-center gap-1 rounded-full bg-red-100 dark:bg-red-900/30 px-2 py-0.5 text-xs font-medium text-red-700 dark:text-red-400"${_scopeId}><svg class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"${_scopeId}></path></svg> ${ssrInterpolate(unref(t)("roles.at_risk"))}</span>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div></td><td class="hidden sm:table-cell px-6 py-4 text-sm text-gray-500 dark:text-gray-400"${_scopeId}>${ssrInterpolate(role.department || "—")}</td><td class="hidden md:table-cell px-6 py-4 text-sm text-gray-500 dark:text-gray-400"${_scopeId}>${ssrInterpolate(((_a2 = role.parent) == null ? void 0 : _a2.name) || unref(t)("roles.none"))}</td><td class="px-6 py-4"${_scopeId}><span class="${ssrRenderClass(["inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium", criticalityColors[role.criticality]])}"${_scopeId}>${ssrInterpolate(unref(t)(`roles.${role.criticality}`))}</span></td><td class="hidden lg:table-cell px-6 py-4"${_scopeId}>`);
                if ((_b2 = role.assignments) == null ? void 0 : _b2.length) {
                  _push2(`<div class="flex flex-wrap gap-1"${_scopeId}><!--[-->`);
                  ssrRenderList(role.assignments, (a) => {
                    var _a3;
                    _push2(`<span class="${ssrRenderClass(["inline-flex items-center rounded-full px-2.5 py-0.5 text-xs", a.is_primary ? "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 font-medium" : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"])}"${_scopeId}>${ssrInterpolate((_a3 = a.person) == null ? void 0 : _a3.full_name)} `);
                    if (a.is_primary) {
                      _push2(`<span class="ml-1 text-indigo-500"${_scopeId}>*</span>`);
                    } else {
                      _push2(`<!---->`);
                    }
                    _push2(`</span>`);
                  });
                  _push2(`<!--]--></div>`);
                } else {
                  _push2(`<span class="text-sm text-amber-600 dark:text-amber-400"${_scopeId}>${ssrInterpolate(unref(t)("chart.vacant"))}</span>`);
                }
                _push2(`</td><td class="px-6 py-4 text-right"${_scopeId}><div class="flex items-center justify-end gap-2"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Link), {
                  href: _ctx.route("organizations.roles.assign", [__props.organization.id, role.id]),
                  class: "rounded-lg bg-emerald-50 dark:bg-emerald-900/30 px-3 py-1.5 text-xs font-medium text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition"
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
                  class: "rounded-lg bg-gray-100 dark:bg-gray-700 px-3 py-1.5 text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition"
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
                _push2(`<button class="rounded-lg bg-red-50 dark:bg-red-900/30 px-3 py-1.5 text-xs font-medium text-red-700 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/50 transition"${_scopeId}>${ssrInterpolate(unref(t)("common.delete"))}</button></div></td></tr>`);
              });
              _push2(`<!--]--></tbody></table></div>`);
            }
          } else {
            return [
              createVNode(unref(Head), {
                title: unref(t)("roles.title")
              }, null, 8, ["title"]),
              createVNode("div", { class: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6" }, [
                createVNode("h2", { class: "text-2xl font-bold text-gray-900 dark:text-white" }, toDisplayString(unref(t)("roles.title")), 1),
                createVNode("div", { class: "flex flex-wrap gap-2" }, [
                  createVNode("a", {
                    href: _ctx.route("organizations.export.roles", __props.organization.id),
                    class: "rounded-xl border border-gray-200 dark:border-gray-600 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                  }, toDisplayString(unref(t)("import_export.export_roles")), 9, ["href"]),
                  createVNode(unref(Link), {
                    href: _ctx.route("organizations.roles.create", __props.organization.id),
                    class: "rounded-xl bg-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 transition"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(unref(t)("roles.create")), 1)
                    ]),
                    _: 1
                  }, 8, ["href"])
                ])
              ]),
              createVNode("div", { class: "flex flex-col sm:flex-row gap-3 mb-4" }, [
                createVNode("div", { class: "relative flex-1" }, [
                  (openBlock(), createBlock("svg", {
                    class: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    stroke: "currentColor"
                  }, [
                    createVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    })
                  ])),
                  withDirectives(createVNode("input", {
                    "onUpdate:modelValue": ($event) => searchQuery.value = $event,
                    type: "text",
                    placeholder: unref(t)("common.search"),
                    class: "w-full rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 py-2.5 pl-10 pr-4 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500"
                  }, null, 8, ["onUpdate:modelValue", "placeholder"]), [
                    [vModelText, searchQuery.value]
                  ])
                ]),
                withDirectives(createVNode("select", {
                  "onUpdate:modelValue": ($event) => criticalityFilter.value = $event,
                  class: "rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 py-2.5 px-4 text-sm text-gray-700 dark:text-gray-300"
                }, [
                  createVNode("option", { value: "all" }, toDisplayString(unref(t)("roles.criticality")) + ": " + toDisplayString(unref(t)("common.all")), 1),
                  createVNode("option", { value: "low" }, toDisplayString(unref(t)("roles.low")), 1),
                  createVNode("option", { value: "medium" }, toDisplayString(unref(t)("roles.medium")), 1),
                  createVNode("option", { value: "high" }, toDisplayString(unref(t)("roles.high")), 1),
                  createVNode("option", { value: "critical" }, toDisplayString(unref(t)("roles.critical")), 1)
                ], 8, ["onUpdate:modelValue"]), [
                  [vModelSelect, criticalityFilter.value]
                ]),
                withDirectives(createVNode("select", {
                  "onUpdate:modelValue": ($event) => coverageFilter.value = $event,
                  class: "rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 py-2.5 px-4 text-sm text-gray-700 dark:text-gray-300"
                }, [
                  createVNode("option", { value: "all" }, toDisplayString(unref(t)("roles.coverage")) + ": " + toDisplayString(unref(t)("common.all")), 1),
                  createVNode("option", { value: "filled" }, toDisplayString(unref(t)("dashboard.filled")), 1),
                  createVNode("option", { value: "vacant" }, toDisplayString(unref(t)("dashboard.vacant")), 1)
                ], 8, ["onUpdate:modelValue"]), [
                  [vModelSelect, coverageFilter.value]
                ]),
                searchQuery.value || criticalityFilter.value !== "all" || coverageFilter.value !== "all" ? (openBlock(), createBlock("button", {
                  key: 0,
                  onClick: clearFilters,
                  class: "rounded-xl border border-gray-200 dark:border-gray-600 px-4 py-2.5 text-sm text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                }, toDisplayString(unref(t)("common.clear_filters")), 1)) : createCommentVNode("", true)
              ]),
              !((_b = __props.roles) == null ? void 0 : _b.length) ? (openBlock(), createBlock("div", {
                key: 0,
                class: "rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-16 text-center"
              }, [
                createVNode("p", { class: "text-gray-500 dark:text-gray-400" }, toDisplayString(unref(t)("roles.no_roles")), 1)
              ])) : !filteredRoles.value.length ? (openBlock(), createBlock("div", {
                key: 1,
                class: "rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-12 text-center"
              }, [
                createVNode("p", { class: "text-gray-500 dark:text-gray-400" }, toDisplayString(unref(t)("common.no_results")), 1)
              ])) : (openBlock(), createBlock("div", {
                key: 2,
                class: "overflow-x-auto rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm"
              }, [
                createVNode("table", { class: "min-w-full divide-y divide-gray-100 dark:divide-gray-700" }, [
                  createVNode("thead", { class: "bg-gray-50 dark:bg-gray-700/50" }, [
                    createVNode("tr", null, [
                      createVNode("th", { class: "px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400" }, toDisplayString(unref(t)("roles.name")), 1),
                      createVNode("th", { class: "hidden sm:table-cell px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400" }, toDisplayString(unref(t)("roles.department")), 1),
                      createVNode("th", { class: "hidden md:table-cell px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400" }, toDisplayString(unref(t)("roles.parent_role")), 1),
                      createVNode("th", { class: "px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400" }, toDisplayString(unref(t)("roles.criticality")), 1),
                      createVNode("th", { class: "hidden lg:table-cell px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400" }, toDisplayString(unref(t)("roles.assigned_to")), 1),
                      createVNode("th", { class: "px-6 py-3.5 text-right text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400" }, toDisplayString(unref(t)("common.actions")), 1)
                    ])
                  ]),
                  createVNode("tbody", { class: "divide-y divide-gray-50 dark:divide-gray-700" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(filteredRoles.value, (role) => {
                      var _a2, _b2;
                      return openBlock(), createBlock("tr", {
                        key: role.id,
                        class: ["hover:bg-gray-50/50 dark:hover:bg-gray-700/30 transition", isAtRisk(role) ? "bg-red-50/30 dark:bg-red-900/10" : ""]
                      }, [
                        createVNode("td", { class: "px-6 py-4" }, [
                          createVNode("div", { class: "flex items-center gap-2" }, [
                            createVNode("span", { class: "font-medium text-gray-900 dark:text-white" }, toDisplayString(role.name), 1),
                            isAtRisk(role) ? (openBlock(), createBlock("span", {
                              key: 0,
                              class: "inline-flex items-center gap-1 rounded-full bg-red-100 dark:bg-red-900/30 px-2 py-0.5 text-xs font-medium text-red-700 dark:text-red-400"
                            }, [
                              (openBlock(), createBlock("svg", {
                                class: "h-3 w-3",
                                fill: "none",
                                viewBox: "0 0 24 24",
                                stroke: "currentColor"
                              }, [
                                createVNode("path", {
                                  "stroke-linecap": "round",
                                  "stroke-linejoin": "round",
                                  "stroke-width": "2",
                                  d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                })
                              ])),
                              createTextVNode(" " + toDisplayString(unref(t)("roles.at_risk")), 1)
                            ])) : createCommentVNode("", true)
                          ])
                        ]),
                        createVNode("td", { class: "hidden sm:table-cell px-6 py-4 text-sm text-gray-500 dark:text-gray-400" }, toDisplayString(role.department || "—"), 1),
                        createVNode("td", { class: "hidden md:table-cell px-6 py-4 text-sm text-gray-500 dark:text-gray-400" }, toDisplayString(((_a2 = role.parent) == null ? void 0 : _a2.name) || unref(t)("roles.none")), 1),
                        createVNode("td", { class: "px-6 py-4" }, [
                          createVNode("span", {
                            class: ["inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium", criticalityColors[role.criticality]]
                          }, toDisplayString(unref(t)(`roles.${role.criticality}`)), 3)
                        ]),
                        createVNode("td", { class: "hidden lg:table-cell px-6 py-4" }, [
                          ((_b2 = role.assignments) == null ? void 0 : _b2.length) ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "flex flex-wrap gap-1"
                          }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(role.assignments, (a) => {
                              var _a3;
                              return openBlock(), createBlock("span", {
                                key: a.id,
                                class: ["inline-flex items-center rounded-full px-2.5 py-0.5 text-xs", a.is_primary ? "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 font-medium" : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"]
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
                            class: "text-sm text-amber-600 dark:text-amber-400"
                          }, toDisplayString(unref(t)("chart.vacant")), 1))
                        ]),
                        createVNode("td", { class: "px-6 py-4 text-right" }, [
                          createVNode("div", { class: "flex items-center justify-end gap-2" }, [
                            createVNode(unref(Link), {
                              href: _ctx.route("organizations.roles.assign", [__props.organization.id, role.id]),
                              class: "rounded-lg bg-emerald-50 dark:bg-emerald-900/30 px-3 py-1.5 text-xs font-medium text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(unref(t)("roles.assign_person")), 1)
                              ]),
                              _: 1
                            }, 8, ["href"]),
                            createVNode(unref(Link), {
                              href: _ctx.route("organizations.roles.edit", [__props.organization.id, role.id]),
                              class: "rounded-lg bg-gray-100 dark:bg-gray-700 px-3 py-1.5 text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(unref(t)("common.edit")), 1)
                              ]),
                              _: 1
                            }, 8, ["href"]),
                            createVNode("button", {
                              onClick: ($event) => destroy(__props.organization, role),
                              class: "rounded-lg bg-red-50 dark:bg-red-900/30 px-3 py-1.5 text-xs font-medium text-red-700 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/50 transition"
                            }, toDisplayString(unref(t)("common.delete")), 9, ["onClick"])
                          ])
                        ])
                      ], 2);
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
