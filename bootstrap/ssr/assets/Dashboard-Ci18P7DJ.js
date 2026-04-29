import { computed, withCtx, unref, createTextVNode, toDisplayString, openBlock, createBlock, createVNode, Fragment, createCommentVNode, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderStyle, ssrRenderList } from "vue/server-renderer";
import { Head, Link } from "@inertiajs/vue3";
import { useI18n } from "vue-i18n";
import { Doughnut, Bar } from "vue-chartjs";
import { Chart, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from "chart.js";
import { _ as _sfc_main$1 } from "./AuthenticatedLayout-C7ouL3e5.js";
import "./LanguageSwitcher-DWy6sQ-D.js";
const _sfc_main = {
  __name: "Dashboard",
  __ssrInlineRender: true,
  props: {
    organizations: Array,
    analytics: Object,
    recentActivity: Array
  },
  setup(__props) {
    Chart.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);
    const { t } = useI18n();
    const props = __props;
    const criticalityData = computed(() => {
      var _a, _b, _c, _d, _e, _f, _g, _h;
      return {
        labels: [t("roles.low"), t("roles.medium"), t("roles.high"), t("roles.critical")],
        datasets: [{
          data: [
            ((_b = (_a = props.analytics) == null ? void 0 : _a.criticality_breakdown) == null ? void 0 : _b.low) || 0,
            ((_d = (_c = props.analytics) == null ? void 0 : _c.criticality_breakdown) == null ? void 0 : _d.medium) || 0,
            ((_f = (_e = props.analytics) == null ? void 0 : _e.criticality_breakdown) == null ? void 0 : _f.high) || 0,
            ((_h = (_g = props.analytics) == null ? void 0 : _g.criticality_breakdown) == null ? void 0 : _h.critical) || 0
          ],
          backgroundColor: ["#9ca3af", "#6366f1", "#f59e0b", "#ef4444"],
          borderWidth: 0
        }]
      };
    });
    const coverageData = computed(() => {
      var _a, _b, _c, _d;
      return {
        labels: [t("dashboard.filled"), t("dashboard.vacant")],
        datasets: [{
          data: [
            ((_b = (_a = props.analytics) == null ? void 0 : _a.coverage) == null ? void 0 : _b.filled) || 0,
            ((_d = (_c = props.analytics) == null ? void 0 : _c.coverage) == null ? void 0 : _d.vacant) || 0
          ],
          backgroundColor: ["#10b981", "#f59e0b"],
          borderWidth: 0
        }]
      };
    });
    const departmentData = computed(() => {
      var _a;
      const depts = ((_a = props.analytics) == null ? void 0 : _a.departments) || {};
      return {
        labels: Object.keys(depts),
        datasets: [{
          data: Object.values(depts),
          backgroundColor: "#6366f1",
          borderRadius: 8
        }]
      };
    });
    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: "bottom", labels: { padding: 16, usePointStyle: true, font: { size: 11 } } }
      }
    };
    const barOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        y: { beginAtZero: true, ticks: { stepSize: 1 } },
        x: { grid: { display: false } }
      }
    };
    const actionIcons = {
      created: { bg: "bg-emerald-100 dark:bg-emerald-900/30", text: "text-emerald-600 dark:text-emerald-400" },
      updated: { bg: "bg-blue-100 dark:bg-blue-900/30", text: "text-blue-600 dark:text-blue-400" },
      deleted: { bg: "bg-red-100 dark:bg-red-900/30", text: "text-red-600 dark:text-red-400" },
      assigned: { bg: "bg-purple-100 dark:bg-purple-900/30", text: "text-purple-600 dark:text-purple-400" },
      unassigned: { bg: "bg-orange-100 dark:bg-orange-900/30", text: "text-orange-600 dark:text-orange-400" },
      imported: { bg: "bg-indigo-100 dark:bg-indigo-900/30", text: "text-indigo-600 dark:text-indigo-400" }
    };
    const timeAgo = (date) => {
      const diff = (Date.now() - new Date(date)) / 1e3;
      if (diff < 60) return "just now";
      if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
      if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
      return `${Math.floor(diff / 86400)}d ago`;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h1 class="text-xl font-semibold text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(unref(t)("dashboard.title"))}</h1>`);
          } else {
            return [
              createVNode("h1", { class: "text-xl font-semibold text-gray-900 dark:text-white" }, toDisplayString(unref(t)("dashboard.title")), 1)
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v;
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), {
              title: unref(t)("dashboard.title")
            }, null, _parent2, _scopeId));
            _push2(`<div class="mb-6"${_scopeId}><h2 class="text-2xl font-bold text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(unref(t)("dashboard.welcome"))}, ${ssrInterpolate((_a = _ctx.$page.props.auth.user) == null ? void 0 : _a.name)}!</h2></div>`);
            if (!((_b = __props.organizations) == null ? void 0 : _b.length)) {
              _push2(`<div class="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-16 text-center"${_scopeId}><div class="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 dark:bg-indigo-900/30 mb-4"${_scopeId}><svg class="h-8 w-8 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"${_scopeId}></path></svg></div><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2"${_scopeId}>${ssrInterpolate(unref(t)("dashboard.no_orgs"))}</h3>`);
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
              _push2(`<!--[--><div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6"${_scopeId}><div class="rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 shadow-sm"${_scopeId}><div class="flex items-center gap-3 mb-2"${_scopeId}><div class="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 dark:bg-indigo-900/30"${_scopeId}><svg class="h-5 w-5 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5"${_scopeId}></path></svg></div></div><p class="text-2xl font-bold text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(((_c = __props.analytics) == null ? void 0 : _c.total_organizations) || 0)}</p><p class="text-sm text-gray-500 dark:text-gray-400"${_scopeId}>${ssrInterpolate(unref(t)("dashboard.total_organizations"))}</p></div><div class="rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 shadow-sm"${_scopeId}><div class="flex items-center gap-3 mb-2"${_scopeId}><div class="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 dark:bg-purple-900/30"${_scopeId}><svg class="h-5 w-5 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"${_scopeId}></path></svg></div></div><p class="text-2xl font-bold text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(((_d = __props.analytics) == null ? void 0 : _d.total_roles) || 0)}</p><p class="text-sm text-gray-500 dark:text-gray-400"${_scopeId}>${ssrInterpolate(unref(t)("dashboard.total_roles"))}</p></div><div class="rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 shadow-sm"${_scopeId}><div class="flex items-center gap-3 mb-2"${_scopeId}><div class="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-900/30"${_scopeId}><svg class="h-5 w-5 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"${_scopeId}></path></svg></div></div><p class="text-2xl font-bold text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(((_e = __props.analytics) == null ? void 0 : _e.total_people) || 0)}</p><p class="text-sm text-gray-500 dark:text-gray-400"${_scopeId}>${ssrInterpolate(unref(t)("dashboard.total_people"))}</p></div><div class="rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 shadow-sm"${_scopeId}><div class="flex items-center gap-3 mb-2"${_scopeId}><div class="${ssrRenderClass([((_f = __props.analytics) == null ? void 0 : _f.risk_roles) > 0 ? "bg-red-50 dark:bg-red-900/30" : "bg-emerald-50 dark:bg-emerald-900/30", "flex h-10 w-10 items-center justify-center rounded-xl"])}"${_scopeId}><svg class="${ssrRenderClass([((_g = __props.analytics) == null ? void 0 : _g.risk_roles) > 0 ? "text-red-600 dark:text-red-400" : "text-emerald-600 dark:text-emerald-400", "h-5 w-5"])}" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"${_scopeId}></path></svg></div></div><p class="${ssrRenderClass([((_h = __props.analytics) == null ? void 0 : _h.risk_roles) > 0 ? "text-red-600 dark:text-red-400" : "text-gray-900 dark:text-white", "text-2xl font-bold"])}"${_scopeId}>${ssrInterpolate(((_i = __props.analytics) == null ? void 0 : _i.risk_roles) || 0)}</p><p class="text-sm text-gray-500 dark:text-gray-400"${_scopeId}>${ssrInterpolate(unref(t)("dashboard.risk_roles"))}</p></div></div>`);
              if (((_j = __props.analytics) == null ? void 0 : _j.total_roles) > 0) {
                _push2(`<div class="grid gap-6 lg:grid-cols-3 mb-6"${_scopeId}><div class="rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 shadow-sm"${_scopeId}><h3 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4"${_scopeId}>${ssrInterpolate(unref(t)("dashboard.criticality_chart"))}</h3><div style="${ssrRenderStyle({ "height": "200px" })}"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Doughnut), {
                  data: criticalityData.value,
                  options: chartOptions
                }, null, _parent2, _scopeId));
                _push2(`</div></div><div class="rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 shadow-sm"${_scopeId}><h3 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4"${_scopeId}>${ssrInterpolate(unref(t)("dashboard.coverage_chart"))}</h3><div style="${ssrRenderStyle({ "height": "200px" })}"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Doughnut), {
                  data: coverageData.value,
                  options: chartOptions
                }, null, _parent2, _scopeId));
                _push2(`</div></div><div class="rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 shadow-sm"${_scopeId}><h3 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4"${_scopeId}>${ssrInterpolate(unref(t)("dashboard.department_chart"))}</h3><div style="${ssrRenderStyle({ "height": "200px" })}"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Bar), {
                  data: departmentData.value,
                  options: barOptions
                }, null, _parent2, _scopeId));
                _push2(`</div></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="grid gap-6 lg:grid-cols-3"${_scopeId}><div class="lg:col-span-2"${_scopeId}><div class="grid gap-4 sm:grid-cols-2"${_scopeId}><!--[-->`);
              ssrRenderList(__props.organizations, (org) => {
                _push2(`<div class="group rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 shadow-sm hover:shadow-lg hover:border-indigo-100 dark:hover:border-indigo-800 transition-all duration-300"${_scopeId}><div class="flex items-start justify-between mb-3"${_scopeId}><div class="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 dark:bg-indigo-900/30 text-lg font-bold text-indigo-600 dark:text-indigo-400"${_scopeId}>${ssrInterpolate(org.name.charAt(0))}</div>`);
                _push2(ssrRenderComponent(unref(Link), {
                  href: _ctx.route("organizations.chart", org.id),
                  class: "flex items-center gap-1 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 px-3 py-1.5 text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition"
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
                _push2(`</div><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-1"${_scopeId}>${ssrInterpolate(org.name)}</h3>`);
                if (org.description) {
                  _push2(`<p class="text-sm text-gray-500 dark:text-gray-400 mb-3 line-clamp-2"${_scopeId}>${ssrInterpolate(org.description)}</p>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<div class="flex items-center gap-4 mt-3 pt-3 border-t border-gray-50 dark:border-gray-700"${_scopeId}><div class="flex items-center gap-1.5"${_scopeId}><div class="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-50 dark:bg-purple-900/30"${_scopeId}><svg class="h-3.5 w-3.5 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"${_scopeId}></path></svg></div><span class="text-sm font-medium text-gray-600 dark:text-gray-400"${_scopeId}>${ssrInterpolate(org.roles_count)} ${ssrInterpolate(unref(t)("dashboard.total_roles"))}</span></div><div class="flex items-center gap-1.5"${_scopeId}><div class="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50 dark:bg-emerald-900/30"${_scopeId}><svg class="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"${_scopeId}></path></svg></div><span class="text-sm font-medium text-gray-600 dark:text-gray-400"${_scopeId}>${ssrInterpolate(org.people_count)} ${ssrInterpolate(unref(t)("dashboard.total_people"))}</span></div></div>`);
                _push2(ssrRenderComponent(unref(Link), {
                  href: _ctx.route("organizations.show", org.id),
                  class: "mt-3 flex w-full items-center justify-center rounded-xl border border-gray-200 dark:border-gray-600 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
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
                class: "flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700 p-6 text-center hover:border-indigo-300 dark:hover:border-indigo-600 hover:bg-indigo-50/50 dark:hover:bg-indigo-900/20 transition-all duration-300"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-700 mb-3"${_scopeId2}><svg class="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"${_scopeId2}></path></svg></div><span class="text-sm font-medium text-gray-500 dark:text-gray-400"${_scopeId2}>${ssrInterpolate(unref(t)("organizations.create"))}</span>`);
                  } else {
                    return [
                      createVNode("div", { class: "flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-700 mb-3" }, [
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
                      createVNode("span", { class: "text-sm font-medium text-gray-500 dark:text-gray-400" }, toDisplayString(unref(t)("organizations.create")), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div></div><div class="rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 shadow-sm"${_scopeId}><h3 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4"${_scopeId}>${ssrInterpolate(unref(t)("dashboard.recent_activity"))}</h3>`);
              if (!((_k = __props.recentActivity) == null ? void 0 : _k.length)) {
                _push2(`<div class="text-center py-8 text-sm text-gray-400"${_scopeId}>${ssrInterpolate(unref(t)("dashboard.no_activity"))}</div>`);
              } else {
                _push2(`<div class="space-y-3"${_scopeId}><!--[-->`);
                ssrRenderList(__props.recentActivity, (log) => {
                  var _a2, _b2, _c2;
                  _push2(`<div class="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"${_scopeId}><div class="${ssrRenderClass([((_a2 = actionIcons[log.action]) == null ? void 0 : _a2.bg) || "bg-gray-100 dark:bg-gray-700", "flex h-8 w-8 items-center justify-center rounded-lg flex-shrink-0"])}"${_scopeId}><svg class="${ssrRenderClass([((_b2 = actionIcons[log.action]) == null ? void 0 : _b2.text) || "text-gray-500", "h-4 w-4"])}" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId}>`);
                  if (log.action === "created") {
                    _push2(`<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"${_scopeId}></path>`);
                  } else if (log.action === "updated") {
                    _push2(`<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"${_scopeId}></path>`);
                  } else if (log.action === "deleted") {
                    _push2(`<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"${_scopeId}></path>`);
                  } else {
                    _push2(`<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"${_scopeId}></path>`);
                  }
                  _push2(`</svg></div><div class="flex-1 min-w-0"${_scopeId}><p class="text-sm text-gray-700 dark:text-gray-300"${_scopeId}><span class="font-medium capitalize"${_scopeId}>${ssrInterpolate(unref(t)(`activity.${log.action}`))}</span><span class="text-gray-500 dark:text-gray-400"${_scopeId}>${ssrInterpolate(log.subject_type)}</span>`);
                  if (log.subject_name) {
                    _push2(`<span class="font-medium"${_scopeId}>${ssrInterpolate(log.subject_name)}</span>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`</p><p class="text-xs text-gray-400 mt-0.5"${_scopeId}>${ssrInterpolate(((_c2 = log.organization) == null ? void 0 : _c2.name) ? log.organization.name + " · " : "")}${ssrInterpolate(timeAgo(log.created_at))}</p></div></div>`);
                });
                _push2(`<!--]--></div>`);
              }
              _push2(`</div></div><!--]-->`);
            }
          } else {
            return [
              createVNode(unref(Head), {
                title: unref(t)("dashboard.title")
              }, null, 8, ["title"]),
              createVNode("div", { class: "mb-6" }, [
                createVNode("h2", { class: "text-2xl font-bold text-gray-900 dark:text-white" }, toDisplayString(unref(t)("dashboard.welcome")) + ", " + toDisplayString((_l = _ctx.$page.props.auth.user) == null ? void 0 : _l.name) + "!", 1)
              ]),
              !((_m = __props.organizations) == null ? void 0 : _m.length) ? (openBlock(), createBlock("div", {
                key: 0,
                class: "flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-16 text-center"
              }, [
                createVNode("div", { class: "flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 dark:bg-indigo-900/30 mb-4" }, [
                  (openBlock(), createBlock("svg", {
                    class: "h-8 w-8 text-indigo-600 dark:text-indigo-400",
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
                createVNode("h3", { class: "text-lg font-semibold text-gray-900 dark:text-white mb-2" }, toDisplayString(unref(t)("dashboard.no_orgs")), 1),
                createVNode(unref(Link), {
                  href: _ctx.route("organizations.create"),
                  class: "mt-4 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/25 hover:bg-indigo-700 transition"
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(unref(t)("dashboard.create_first")), 1)
                  ]),
                  _: 1
                }, 8, ["href"])
              ])) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                createVNode("div", { class: "grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6" }, [
                  createVNode("div", { class: "rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 shadow-sm" }, [
                    createVNode("div", { class: "flex items-center gap-3 mb-2" }, [
                      createVNode("div", { class: "flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 dark:bg-indigo-900/30" }, [
                        (openBlock(), createBlock("svg", {
                          class: "h-5 w-5 text-indigo-600 dark:text-indigo-400",
                          fill: "none",
                          viewBox: "0 0 24 24",
                          stroke: "currentColor"
                        }, [
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            "stroke-width": "2",
                            d: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5"
                          })
                        ]))
                      ])
                    ]),
                    createVNode("p", { class: "text-2xl font-bold text-gray-900 dark:text-white" }, toDisplayString(((_n = __props.analytics) == null ? void 0 : _n.total_organizations) || 0), 1),
                    createVNode("p", { class: "text-sm text-gray-500 dark:text-gray-400" }, toDisplayString(unref(t)("dashboard.total_organizations")), 1)
                  ]),
                  createVNode("div", { class: "rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 shadow-sm" }, [
                    createVNode("div", { class: "flex items-center gap-3 mb-2" }, [
                      createVNode("div", { class: "flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 dark:bg-purple-900/30" }, [
                        (openBlock(), createBlock("svg", {
                          class: "h-5 w-5 text-purple-600 dark:text-purple-400",
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
                      ])
                    ]),
                    createVNode("p", { class: "text-2xl font-bold text-gray-900 dark:text-white" }, toDisplayString(((_o = __props.analytics) == null ? void 0 : _o.total_roles) || 0), 1),
                    createVNode("p", { class: "text-sm text-gray-500 dark:text-gray-400" }, toDisplayString(unref(t)("dashboard.total_roles")), 1)
                  ]),
                  createVNode("div", { class: "rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 shadow-sm" }, [
                    createVNode("div", { class: "flex items-center gap-3 mb-2" }, [
                      createVNode("div", { class: "flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-900/30" }, [
                        (openBlock(), createBlock("svg", {
                          class: "h-5 w-5 text-emerald-600 dark:text-emerald-400",
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
                      ])
                    ]),
                    createVNode("p", { class: "text-2xl font-bold text-gray-900 dark:text-white" }, toDisplayString(((_p = __props.analytics) == null ? void 0 : _p.total_people) || 0), 1),
                    createVNode("p", { class: "text-sm text-gray-500 dark:text-gray-400" }, toDisplayString(unref(t)("dashboard.total_people")), 1)
                  ]),
                  createVNode("div", { class: "rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 shadow-sm" }, [
                    createVNode("div", { class: "flex items-center gap-3 mb-2" }, [
                      createVNode("div", {
                        class: ["flex h-10 w-10 items-center justify-center rounded-xl", ((_q = __props.analytics) == null ? void 0 : _q.risk_roles) > 0 ? "bg-red-50 dark:bg-red-900/30" : "bg-emerald-50 dark:bg-emerald-900/30"]
                      }, [
                        (openBlock(), createBlock("svg", {
                          class: ["h-5 w-5", ((_r = __props.analytics) == null ? void 0 : _r.risk_roles) > 0 ? "text-red-600 dark:text-red-400" : "text-emerald-600 dark:text-emerald-400"],
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
                        ], 2))
                      ], 2)
                    ]),
                    createVNode("p", {
                      class: ["text-2xl font-bold", ((_s = __props.analytics) == null ? void 0 : _s.risk_roles) > 0 ? "text-red-600 dark:text-red-400" : "text-gray-900 dark:text-white"]
                    }, toDisplayString(((_t = __props.analytics) == null ? void 0 : _t.risk_roles) || 0), 3),
                    createVNode("p", { class: "text-sm text-gray-500 dark:text-gray-400" }, toDisplayString(unref(t)("dashboard.risk_roles")), 1)
                  ])
                ]),
                ((_u = __props.analytics) == null ? void 0 : _u.total_roles) > 0 ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "grid gap-6 lg:grid-cols-3 mb-6"
                }, [
                  createVNode("div", { class: "rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 shadow-sm" }, [
                    createVNode("h3", { class: "text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4" }, toDisplayString(unref(t)("dashboard.criticality_chart")), 1),
                    createVNode("div", { style: { "height": "200px" } }, [
                      createVNode(unref(Doughnut), {
                        data: criticalityData.value,
                        options: chartOptions
                      }, null, 8, ["data"])
                    ])
                  ]),
                  createVNode("div", { class: "rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 shadow-sm" }, [
                    createVNode("h3", { class: "text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4" }, toDisplayString(unref(t)("dashboard.coverage_chart")), 1),
                    createVNode("div", { style: { "height": "200px" } }, [
                      createVNode(unref(Doughnut), {
                        data: coverageData.value,
                        options: chartOptions
                      }, null, 8, ["data"])
                    ])
                  ]),
                  createVNode("div", { class: "rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 shadow-sm" }, [
                    createVNode("h3", { class: "text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4" }, toDisplayString(unref(t)("dashboard.department_chart")), 1),
                    createVNode("div", { style: { "height": "200px" } }, [
                      createVNode(unref(Bar), {
                        data: departmentData.value,
                        options: barOptions
                      }, null, 8, ["data"])
                    ])
                  ])
                ])) : createCommentVNode("", true),
                createVNode("div", { class: "grid gap-6 lg:grid-cols-3" }, [
                  createVNode("div", { class: "lg:col-span-2" }, [
                    createVNode("div", { class: "grid gap-4 sm:grid-cols-2" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(__props.organizations, (org) => {
                        return openBlock(), createBlock("div", {
                          key: org.id,
                          class: "group rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 shadow-sm hover:shadow-lg hover:border-indigo-100 dark:hover:border-indigo-800 transition-all duration-300"
                        }, [
                          createVNode("div", { class: "flex items-start justify-between mb-3" }, [
                            createVNode("div", { class: "flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 dark:bg-indigo-900/30 text-lg font-bold text-indigo-600 dark:text-indigo-400" }, toDisplayString(org.name.charAt(0)), 1),
                            createVNode(unref(Link), {
                              href: _ctx.route("organizations.chart", org.id),
                              class: "flex items-center gap-1 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 px-3 py-1.5 text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition"
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
                          createVNode("h3", { class: "text-lg font-semibold text-gray-900 dark:text-white mb-1" }, toDisplayString(org.name), 1),
                          org.description ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-sm text-gray-500 dark:text-gray-400 mb-3 line-clamp-2"
                          }, toDisplayString(org.description), 1)) : createCommentVNode("", true),
                          createVNode("div", { class: "flex items-center gap-4 mt-3 pt-3 border-t border-gray-50 dark:border-gray-700" }, [
                            createVNode("div", { class: "flex items-center gap-1.5" }, [
                              createVNode("div", { class: "flex h-7 w-7 items-center justify-center rounded-lg bg-purple-50 dark:bg-purple-900/30" }, [
                                (openBlock(), createBlock("svg", {
                                  class: "h-3.5 w-3.5 text-purple-600 dark:text-purple-400",
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
                              createVNode("span", { class: "text-sm font-medium text-gray-600 dark:text-gray-400" }, toDisplayString(org.roles_count) + " " + toDisplayString(unref(t)("dashboard.total_roles")), 1)
                            ]),
                            createVNode("div", { class: "flex items-center gap-1.5" }, [
                              createVNode("div", { class: "flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50 dark:bg-emerald-900/30" }, [
                                (openBlock(), createBlock("svg", {
                                  class: "h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400",
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
                              createVNode("span", { class: "text-sm font-medium text-gray-600 dark:text-gray-400" }, toDisplayString(org.people_count) + " " + toDisplayString(unref(t)("dashboard.total_people")), 1)
                            ])
                          ]),
                          createVNode(unref(Link), {
                            href: _ctx.route("organizations.show", org.id),
                            class: "mt-3 flex w-full items-center justify-center rounded-xl border border-gray-200 dark:border-gray-600 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
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
                        class: "flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700 p-6 text-center hover:border-indigo-300 dark:hover:border-indigo-600 hover:bg-indigo-50/50 dark:hover:bg-indigo-900/20 transition-all duration-300"
                      }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-700 mb-3" }, [
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
                          createVNode("span", { class: "text-sm font-medium text-gray-500 dark:text-gray-400" }, toDisplayString(unref(t)("organizations.create")), 1)
                        ]),
                        _: 1
                      }, 8, ["href"])
                    ])
                  ]),
                  createVNode("div", { class: "rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 shadow-sm" }, [
                    createVNode("h3", { class: "text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4" }, toDisplayString(unref(t)("dashboard.recent_activity")), 1),
                    !((_v = __props.recentActivity) == null ? void 0 : _v.length) ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "text-center py-8 text-sm text-gray-400"
                    }, toDisplayString(unref(t)("dashboard.no_activity")), 1)) : (openBlock(), createBlock("div", {
                      key: 1,
                      class: "space-y-3"
                    }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(__props.recentActivity, (log) => {
                        var _a2, _b2, _c2;
                        return openBlock(), createBlock("div", {
                          key: log.id,
                          class: "flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"
                        }, [
                          createVNode("div", {
                            class: ["flex h-8 w-8 items-center justify-center rounded-lg flex-shrink-0", ((_a2 = actionIcons[log.action]) == null ? void 0 : _a2.bg) || "bg-gray-100 dark:bg-gray-700"]
                          }, [
                            (openBlock(), createBlock("svg", {
                              class: ["h-4 w-4", ((_b2 = actionIcons[log.action]) == null ? void 0 : _b2.text) || "text-gray-500"],
                              fill: "none",
                              viewBox: "0 0 24 24",
                              stroke: "currentColor"
                            }, [
                              log.action === "created" ? (openBlock(), createBlock("path", {
                                key: 0,
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                "stroke-width": "2",
                                d: "M12 4v16m8-8H4"
                              })) : log.action === "updated" ? (openBlock(), createBlock("path", {
                                key: 1,
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                "stroke-width": "2",
                                d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                              })) : log.action === "deleted" ? (openBlock(), createBlock("path", {
                                key: 2,
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                "stroke-width": "2",
                                d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              })) : (openBlock(), createBlock("path", {
                                key: 3,
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                "stroke-width": "2",
                                d: "M13 10V3L4 14h7v7l9-11h-7z"
                              }))
                            ], 2))
                          ], 2),
                          createVNode("div", { class: "flex-1 min-w-0" }, [
                            createVNode("p", { class: "text-sm text-gray-700 dark:text-gray-300" }, [
                              createVNode("span", { class: "font-medium capitalize" }, toDisplayString(unref(t)(`activity.${log.action}`)), 1),
                              createVNode("span", { class: "text-gray-500 dark:text-gray-400" }, toDisplayString(log.subject_type), 1),
                              log.subject_name ? (openBlock(), createBlock("span", {
                                key: 0,
                                class: "font-medium"
                              }, toDisplayString(log.subject_name), 1)) : createCommentVNode("", true)
                            ]),
                            createVNode("p", { class: "text-xs text-gray-400 mt-0.5" }, toDisplayString(((_c2 = log.organization) == null ? void 0 : _c2.name) ? log.organization.name + " · " : "") + toDisplayString(timeAgo(log.created_at)), 1)
                          ])
                        ]);
                      }), 128))
                    ]))
                  ])
                ])
              ], 64))
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
