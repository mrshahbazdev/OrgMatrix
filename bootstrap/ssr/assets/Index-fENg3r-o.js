import { ref, onMounted, watch, withCtx, unref, createTextVNode, toDisplayString, createVNode, openBlock, createBlock, Fragment, renderList, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderStyle, ssrRenderList } from "vue/server-renderer";
import { Head, Link, router } from "@inertiajs/vue3";
import { useI18n } from "vue-i18n";
import * as d3 from "d3";
import { _ as _sfc_main$1 } from "./AuthenticatedLayout-C7ouL3e5.js";
import "./LanguageSwitcher-DWy6sQ-D.js";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: { organization: Object, chartData: Array, roles: Array },
  setup(__props) {
    const { t } = useI18n();
    const props = __props;
    const svgRef = ref(null);
    const containerRef = ref(null);
    const isFullscreen = ref(false);
    let zoomBehavior = null;
    let svgSelection = null;
    const criticalityColors = {
      low: "#9ca3af",
      medium: "#6366f1",
      high: "#f59e0b",
      critical: "#ef4444"
    };
    const departmentColors = [
      "#6366f1",
      "#ec4899",
      "#10b981",
      "#f59e0b",
      "#8b5cf6",
      "#06b6d4",
      "#f97316",
      "#14b8a6",
      "#e11d48",
      "#3b82f6",
      "#84cc16",
      "#a855f7"
    ];
    const deptColorMap = {};
    let deptIndex = 0;
    const getDeptColor = (dept) => {
      if (!dept) return "#a5b4fc";
      if (!deptColorMap[dept]) {
        deptColorMap[dept] = departmentColors[deptIndex % departmentColors.length];
        deptIndex++;
      }
      return deptColorMap[dept];
    };
    const renderChart = () => {
      var _a;
      if (!svgRef.value || !((_a = props.chartData) == null ? void 0 : _a.length)) return;
      const container = containerRef.value;
      const width = container.clientWidth;
      const height = Math.max(600, container.clientHeight);
      d3.select(svgRef.value).selectAll("*").remove();
      const treeData = {
        name: props.organization.name,
        children: props.chartData
      };
      const root = d3.hierarchy(treeData);
      const treeLayout = d3.tree().size([width - 200, height - 160]);
      treeLayout(root);
      svgSelection = d3.select(svgRef.value).attr("width", width).attr("height", height);
      const g = svgSelection.append("g").attr("transform", "translate(100, 80)");
      zoomBehavior = d3.zoom().scaleExtent([0.2, 4]).on("zoom", (event) => g.attr("transform", event.transform));
      svgSelection.call(zoomBehavior);
      svgSelection.call(zoomBehavior.transform, d3.zoomIdentity.translate(100, 80));
      g.selectAll(".link").data(root.links()).enter().append("path").attr("class", "link").attr("fill", "none").attr("stroke", (d) => {
        const dept = d.target.data.department;
        return dept ? getDeptColor(dept) + "60" : "#c7d2fe";
      }).attr("stroke-width", 2).attr(
        "d",
        d3.linkVertical().x((d) => d.x).y((d) => d.y)
      );
      const nodes = g.selectAll(".node").data(root.descendants()).enter().append("g").attr("class", "node").attr("transform", (d) => `translate(${d.x}, ${d.y})`).style("cursor", (d) => d.data.role_id ? "pointer" : "default");
      nodes.on("click", (event, d) => {
        if (d.data.role_id) {
          router.visit(route("organizations.roles.edit", [props.organization.id, d.data.role_id]));
        }
      });
      nodes.append("rect").attr("x", -80).attr("y", -25).attr("width", 160).attr("height", 55).attr("rx", 12).attr("fill", (d) => {
        if (!d.parent) return "#4f46e5";
        if (!d.data.person) return "#fef3c7";
        return "#e0e7ff";
      }).attr("stroke", (d) => {
        if (!d.parent) return "#4338ca";
        if (!d.data.person) return "#fde68a";
        const dept = d.data.department;
        return dept ? getDeptColor(dept) : "#c7d2fe";
      }).attr("stroke-width", (d) => d.data.department ? 2.5 : 1.5).style("filter", "drop-shadow(0 1px 2px rgba(0,0,0,0.1))");
      nodes.filter((d) => d.data.department).append("rect").attr("x", -80).attr("y", -25).attr("width", 5).attr("height", 55).attr("rx", 2).attr("fill", (d) => getDeptColor(d.data.department));
      nodes.filter((d) => !d.data.person && d.data.criticality && ["high", "critical"].includes(d.data.criticality)).append("g").attr("transform", "translate(-72, -32)").each(function() {
        d3.select(this).append("circle").attr("r", 9).attr("fill", "#fef2f2").attr("stroke", "#ef4444");
        d3.select(this).append("text").attr("text-anchor", "middle").attr("y", 4).attr("font-size", "12px").attr("font-weight", "bold").attr("fill", "#ef4444").text("!");
      });
      nodes.filter((d) => d.data.criticality).append("circle").attr("cx", 72).attr("cy", -17).attr("r", 6).attr("fill", (d) => criticalityColors[d.data.criticality] || "#9ca3af");
      nodes.append("text").attr("text-anchor", "middle").attr("y", -5).attr("font-size", "11px").attr("font-weight", "600").attr("fill", (d) => !d.parent ? "#ffffff" : "#1e1b4b").text((d) => {
        const name = d.data.name || "";
        return name.length > 18 ? name.substring(0, 16) + "..." : name;
      });
      nodes.append("text").attr("text-anchor", "middle").attr("y", 14).attr("font-size", "9px").attr("fill", (d) => {
        if (!d.parent) return "rgba(255,255,255,0.7)";
        if (!d.data.person) return "#b45309";
        return "#6366f1";
      }).text((d) => {
        if (!d.parent) return "";
        if (!d.data.person) return t("chart.vacant");
        const name = d.data.person.name || "";
        return name.length > 22 ? name.substring(0, 20) + "..." : name;
      });
      nodes.append("title").text((d) => {
        if (!d.parent) return props.organization.name;
        let tip = d.data.name;
        if (d.data.department) tip += ` | ${d.data.department}`;
        if (d.data.person) tip += `
${d.data.person.name}`;
        else tip += `
${t("chart.vacant")}`;
        if (d.data.criticality) tip += `
${t("roles.criticality")}: ${t("roles." + d.data.criticality)}`;
        tip += `
${t("chart.click_to_edit")}`;
        return tip;
      });
    };
    const zoomIn = () => {
      if (svgSelection && zoomBehavior) svgSelection.transition().duration(300).call(zoomBehavior.scaleBy, 1.3);
    };
    const zoomOut = () => {
      if (svgSelection && zoomBehavior) svgSelection.transition().duration(300).call(zoomBehavior.scaleBy, 0.7);
    };
    const resetZoom = () => {
      if (svgSelection && zoomBehavior) svgSelection.transition().duration(300).call(zoomBehavior.transform, d3.zoomIdentity.translate(100, 80));
    };
    const toggleFullscreen = () => {
      var _a, _b;
      const el = containerRef.value;
      if (!document.fullscreenElement) {
        (_a = el.requestFullscreen) == null ? void 0 : _a.call(el);
        isFullscreen.value = true;
      } else {
        (_b = document.exitFullscreen) == null ? void 0 : _b.call(document);
        isFullscreen.value = false;
      }
    };
    onMounted(() => {
      renderChart();
      document.addEventListener("fullscreenchange", () => {
        isFullscreen.value = !!document.fullscreenElement;
        setTimeout(renderChart, 100);
      });
    });
    watch(() => props.chartData, () => renderChart(), { deep: true });
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
            _push2(`<span${_scopeId}>/</span><span class="text-gray-900 dark:text-white font-semibold"${_scopeId}>${ssrInterpolate(unref(t)("chart.title"))}</span></div>`);
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
                createVNode("span", { class: "text-gray-900 dark:text-white font-semibold" }, toDisplayString(unref(t)("chart.title")), 1)
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b;
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), {
              title: unref(t)("chart.title")
            }, null, _parent2, _scopeId));
            if (!((_a = __props.chartData) == null ? void 0 : _a.length)) {
              _push2(`<div class="rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-16 text-center"${_scopeId}><p class="text-gray-500 dark:text-gray-400 mb-4"${_scopeId}>${ssrInterpolate(unref(t)("chart.empty"))}</p>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("organizations.roles.create", __props.organization.id),
                class: "rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 transition"
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
            } else {
              _push2(`<div${_scopeId}><div class="flex items-center justify-between mb-4"${_scopeId}><div class="flex items-center gap-2"${_scopeId}><button class="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition"${ssrRenderAttr("title", unref(t)("chart.zoom_in"))}${_scopeId}><svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"${_scopeId}></path></svg></button><button class="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition"${ssrRenderAttr("title", unref(t)("chart.zoom_out"))}${_scopeId}><svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"${_scopeId}></path></svg></button><button class="flex h-9 items-center justify-center rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 text-xs font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition"${_scopeId}>${ssrInterpolate(unref(t)("chart.reset"))}</button></div><button class="flex h-9 items-center gap-2 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 text-xs font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition"${_scopeId}><svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId}>`);
              if (!isFullscreen.value) {
                _push2(`<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"${_scopeId}></path>`);
              } else {
                _push2(`<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 9V4H4m0 0l5 5m6-1V4h4m0 0l-5 5M9 15v5H4m0 0l5-5m6 1v4h5m0 0l-5-5"${_scopeId}></path>`);
              }
              _push2(`</svg> ${ssrInterpolate(isFullscreen.value ? unref(t)("chart.exit_fullscreen") : unref(t)("chart.fullscreen"))}</button></div><div class="rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 shadow-sm overflow-hidden" style="${ssrRenderStyle({ "min-height": "600px" })}"${_scopeId}><svg class="w-full" style="${ssrRenderStyle({ "min-height": "600px" })}"${_scopeId}></svg></div><div class="mt-4 flex flex-wrap items-center gap-4 rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 shadow-sm"${_scopeId}><span class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase"${_scopeId}>${ssrInterpolate(unref(t)("roles.criticality"))}:</span><div class="flex items-center gap-2"${_scopeId}><div class="h-3 w-3 rounded-full bg-gray-400"${_scopeId}></div><span class="text-xs text-gray-600 dark:text-gray-400"${_scopeId}>${ssrInterpolate(unref(t)("roles.low"))}</span></div><div class="flex items-center gap-2"${_scopeId}><div class="h-3 w-3 rounded-full bg-indigo-500"${_scopeId}></div><span class="text-xs text-gray-600 dark:text-gray-400"${_scopeId}>${ssrInterpolate(unref(t)("roles.medium"))}</span></div><div class="flex items-center gap-2"${_scopeId}><div class="h-3 w-3 rounded-full bg-amber-500"${_scopeId}></div><span class="text-xs text-gray-600 dark:text-gray-400"${_scopeId}>${ssrInterpolate(unref(t)("roles.high"))}</span></div><div class="flex items-center gap-2"${_scopeId}><div class="h-3 w-3 rounded-full bg-red-500"${_scopeId}></div><span class="text-xs text-gray-600 dark:text-gray-400"${_scopeId}>${ssrInterpolate(unref(t)("roles.critical"))}</span></div><div class="border-l border-gray-200 dark:border-gray-600 pl-4 flex items-center gap-2"${_scopeId}><div class="h-4 w-6 rounded border border-amber-300 bg-amber-50"${_scopeId}></div><span class="text-xs text-gray-600 dark:text-gray-400"${_scopeId}>${ssrInterpolate(unref(t)("chart.vacant"))}</span></div><div class="flex items-center gap-2"${_scopeId}><div class="flex h-4 w-4 items-center justify-center rounded-full border border-red-400 bg-red-50 text-[8px] font-bold text-red-500"${_scopeId}>!</div><span class="text-xs text-gray-600 dark:text-gray-400"${_scopeId}>${ssrInterpolate(unref(t)("roles.at_risk"))}</span></div>`);
              if (Object.keys(deptColorMap).length) {
                _push2(`<!--[--><div class="border-l border-gray-200 dark:border-gray-600 pl-4"${_scopeId}><span class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase"${_scopeId}>${ssrInterpolate(unref(t)("roles.department"))}:</span></div><!--[-->`);
                ssrRenderList(deptColorMap, (color, dept) => {
                  _push2(`<div class="flex items-center gap-2"${_scopeId}><div class="h-3 w-3 rounded-sm" style="${ssrRenderStyle({ backgroundColor: color })}"${_scopeId}></div><span class="text-xs text-gray-600 dark:text-gray-400"${_scopeId}>${ssrInterpolate(dept)}</span></div>`);
                });
                _push2(`<!--]--><!--]-->`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div>`);
            }
          } else {
            return [
              createVNode(unref(Head), {
                title: unref(t)("chart.title")
              }, null, 8, ["title"]),
              !((_b = __props.chartData) == null ? void 0 : _b.length) ? (openBlock(), createBlock("div", {
                key: 0,
                class: "rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-16 text-center"
              }, [
                createVNode("p", { class: "text-gray-500 dark:text-gray-400 mb-4" }, toDisplayString(unref(t)("chart.empty")), 1),
                createVNode(unref(Link), {
                  href: _ctx.route("organizations.roles.create", __props.organization.id),
                  class: "rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 transition"
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(unref(t)("roles.create")), 1)
                  ]),
                  _: 1
                }, 8, ["href"])
              ])) : (openBlock(), createBlock("div", { key: 1 }, [
                createVNode("div", { class: "flex items-center justify-between mb-4" }, [
                  createVNode("div", { class: "flex items-center gap-2" }, [
                    createVNode("button", {
                      onClick: zoomIn,
                      class: "flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition",
                      title: unref(t)("chart.zoom_in")
                    }, [
                      (openBlock(), createBlock("svg", {
                        class: "h-4 w-4",
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
                    ], 8, ["title"]),
                    createVNode("button", {
                      onClick: zoomOut,
                      class: "flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition",
                      title: unref(t)("chart.zoom_out")
                    }, [
                      (openBlock(), createBlock("svg", {
                        class: "h-4 w-4",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        stroke: "currentColor"
                      }, [
                        createVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          "stroke-width": "2",
                          d: "M20 12H4"
                        })
                      ]))
                    ], 8, ["title"]),
                    createVNode("button", {
                      onClick: resetZoom,
                      class: "flex h-9 items-center justify-center rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 text-xs font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                    }, toDisplayString(unref(t)("chart.reset")), 1)
                  ]),
                  createVNode("button", {
                    onClick: toggleFullscreen,
                    class: "flex h-9 items-center gap-2 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 text-xs font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                  }, [
                    (openBlock(), createBlock("svg", {
                      class: "h-4 w-4",
                      fill: "none",
                      viewBox: "0 0 24 24",
                      stroke: "currentColor"
                    }, [
                      !isFullscreen.value ? (openBlock(), createBlock("path", {
                        key: 0,
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        "stroke-width": "2",
                        d: "M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                      })) : (openBlock(), createBlock("path", {
                        key: 1,
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        "stroke-width": "2",
                        d: "M9 9V4H4m0 0l5 5m6-1V4h4m0 0l-5 5M9 15v5H4m0 0l5-5m6 1v4h5m0 0l-5-5"
                      }))
                    ])),
                    createTextVNode(" " + toDisplayString(isFullscreen.value ? unref(t)("chart.exit_fullscreen") : unref(t)("chart.fullscreen")), 1)
                  ])
                ]),
                createVNode("div", {
                  ref_key: "containerRef",
                  ref: containerRef,
                  class: "rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 shadow-sm overflow-hidden",
                  style: { "min-height": "600px" }
                }, [
                  (openBlock(), createBlock("svg", {
                    ref_key: "svgRef",
                    ref: svgRef,
                    class: "w-full",
                    style: { "min-height": "600px" }
                  }, null, 512))
                ], 512),
                createVNode("div", { class: "mt-4 flex flex-wrap items-center gap-4 rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 shadow-sm" }, [
                  createVNode("span", { class: "text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase" }, toDisplayString(unref(t)("roles.criticality")) + ":", 1),
                  createVNode("div", { class: "flex items-center gap-2" }, [
                    createVNode("div", { class: "h-3 w-3 rounded-full bg-gray-400" }),
                    createVNode("span", { class: "text-xs text-gray-600 dark:text-gray-400" }, toDisplayString(unref(t)("roles.low")), 1)
                  ]),
                  createVNode("div", { class: "flex items-center gap-2" }, [
                    createVNode("div", { class: "h-3 w-3 rounded-full bg-indigo-500" }),
                    createVNode("span", { class: "text-xs text-gray-600 dark:text-gray-400" }, toDisplayString(unref(t)("roles.medium")), 1)
                  ]),
                  createVNode("div", { class: "flex items-center gap-2" }, [
                    createVNode("div", { class: "h-3 w-3 rounded-full bg-amber-500" }),
                    createVNode("span", { class: "text-xs text-gray-600 dark:text-gray-400" }, toDisplayString(unref(t)("roles.high")), 1)
                  ]),
                  createVNode("div", { class: "flex items-center gap-2" }, [
                    createVNode("div", { class: "h-3 w-3 rounded-full bg-red-500" }),
                    createVNode("span", { class: "text-xs text-gray-600 dark:text-gray-400" }, toDisplayString(unref(t)("roles.critical")), 1)
                  ]),
                  createVNode("div", { class: "border-l border-gray-200 dark:border-gray-600 pl-4 flex items-center gap-2" }, [
                    createVNode("div", { class: "h-4 w-6 rounded border border-amber-300 bg-amber-50" }),
                    createVNode("span", { class: "text-xs text-gray-600 dark:text-gray-400" }, toDisplayString(unref(t)("chart.vacant")), 1)
                  ]),
                  createVNode("div", { class: "flex items-center gap-2" }, [
                    createVNode("div", { class: "flex h-4 w-4 items-center justify-center rounded-full border border-red-400 bg-red-50 text-[8px] font-bold text-red-500" }, "!"),
                    createVNode("span", { class: "text-xs text-gray-600 dark:text-gray-400" }, toDisplayString(unref(t)("roles.at_risk")), 1)
                  ]),
                  Object.keys(deptColorMap).length ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                    createVNode("div", { class: "border-l border-gray-200 dark:border-gray-600 pl-4" }, [
                      createVNode("span", { class: "text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase" }, toDisplayString(unref(t)("roles.department")) + ":", 1)
                    ]),
                    (openBlock(), createBlock(Fragment, null, renderList(deptColorMap, (color, dept) => {
                      return createVNode("div", {
                        key: dept,
                        class: "flex items-center gap-2"
                      }, [
                        createVNode("div", {
                          class: "h-3 w-3 rounded-sm",
                          style: { backgroundColor: color }
                        }, null, 4),
                        createVNode("span", { class: "text-xs text-gray-600 dark:text-gray-400" }, toDisplayString(dept), 1)
                      ]);
                    }), 64))
                  ], 64)) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/OrgChart/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
