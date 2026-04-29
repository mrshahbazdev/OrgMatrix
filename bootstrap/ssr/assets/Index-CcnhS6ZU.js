import { ref, onMounted, watch, withCtx, unref, createTextVNode, toDisplayString, createVNode, openBlock, createBlock, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderStyle } from "vue/server-renderer";
import { Head, Link } from "@inertiajs/vue3";
import { useI18n } from "vue-i18n";
import * as d3 from "d3";
import { _ as _sfc_main$1 } from "./AuthenticatedLayout-Cwxv3suN.js";
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
    const criticalityColors = {
      low: "#9ca3af",
      medium: "#6366f1",
      high: "#f59e0b",
      critical: "#ef4444"
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
      const svg = d3.select(svgRef.value).attr("width", width).attr("height", height);
      const g = svg.append("g").attr("transform", "translate(100, 80)");
      const zoom = d3.zoom().scaleExtent([0.3, 3]).on("zoom", (event) => g.attr("transform", event.transform));
      svg.call(zoom);
      svg.call(zoom.transform, d3.zoomIdentity.translate(100, 80));
      g.selectAll(".link").data(root.links()).enter().append("path").attr("class", "link").attr("fill", "none").attr("stroke", "#c7d2fe").attr("stroke-width", 2).attr(
        "d",
        d3.linkVertical().x((d) => d.x).y((d) => d.y)
      );
      const nodes = g.selectAll(".node").data(root.descendants()).enter().append("g").attr("class", "node").attr("transform", (d) => `translate(${d.x}, ${d.y})`);
      nodes.append("rect").attr("x", -80).attr("y", -25).attr("width", 160).attr("height", 55).attr("rx", 12).attr("fill", (d) => {
        if (!d.parent) return "#4f46e5";
        if (!d.data.person) return "#fef3c7";
        return "#e0e7ff";
      }).attr("stroke", (d) => {
        if (!d.parent) return "#4338ca";
        if (!d.data.person) return "#fde68a";
        return "#c7d2fe";
      }).attr("stroke-width", 1.5).style("filter", "drop-shadow(0 1px 2px rgba(0,0,0,0.1))");
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
    };
    onMounted(() => renderChart());
    watch(() => props.chartData, () => renderChart(), { deep: true });
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
            _push2(`<span${_scopeId}>/</span><span class="text-gray-900 font-semibold"${_scopeId}>${ssrInterpolate(unref(t)("chart.title"))}</span></div>`);
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
                createVNode("span", { class: "text-gray-900 font-semibold" }, toDisplayString(unref(t)("chart.title")), 1)
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b, _c, _d;
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), {
              title: unref(t)("chart.title")
            }, null, _parent2, _scopeId));
            if (!((_a = __props.chartData) == null ? void 0 : _a.length)) {
              _push2(`<div class="rounded-2xl border-2 border-dashed border-gray-200 bg-white p-16 text-center"${_scopeId}><p class="text-gray-500 mb-4"${_scopeId}>${ssrInterpolate(unref(t)("chart.empty"))}</p>`);
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
              _push2(`<div class="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm overflow-hidden" style="${ssrRenderStyle({ "min-height": "600px" })}"${_scopeId}><svg class="w-full" style="${ssrRenderStyle({ "min-height": "600px" })}"${_scopeId}></svg></div>`);
            }
            if ((_b = __props.chartData) == null ? void 0 : _b.length) {
              _push2(`<div class="mt-4 flex flex-wrap items-center gap-6 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"${_scopeId}><div class="flex items-center gap-2"${_scopeId}><div class="h-3 w-3 rounded-full bg-gray-400"${_scopeId}></div><span class="text-xs text-gray-600"${_scopeId}>${ssrInterpolate(unref(t)("roles.low"))}</span></div><div class="flex items-center gap-2"${_scopeId}><div class="h-3 w-3 rounded-full bg-indigo-500"${_scopeId}></div><span class="text-xs text-gray-600"${_scopeId}>${ssrInterpolate(unref(t)("roles.medium"))}</span></div><div class="flex items-center gap-2"${_scopeId}><div class="h-3 w-3 rounded-full bg-amber-500"${_scopeId}></div><span class="text-xs text-gray-600"${_scopeId}>${ssrInterpolate(unref(t)("roles.high"))}</span></div><div class="flex items-center gap-2"${_scopeId}><div class="h-3 w-3 rounded-full bg-red-500"${_scopeId}></div><span class="text-xs text-gray-600"${_scopeId}>${ssrInterpolate(unref(t)("roles.critical"))}</span></div><div class="flex items-center gap-2"${_scopeId}><div class="h-4 w-6 rounded border border-amber-300 bg-amber-50"${_scopeId}></div><span class="text-xs text-gray-600"${_scopeId}>${ssrInterpolate(unref(t)("chart.vacant"))}</span></div></div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode(unref(Head), {
                title: unref(t)("chart.title")
              }, null, 8, ["title"]),
              !((_c = __props.chartData) == null ? void 0 : _c.length) ? (openBlock(), createBlock("div", {
                key: 0,
                class: "rounded-2xl border-2 border-dashed border-gray-200 bg-white p-16 text-center"
              }, [
                createVNode("p", { class: "text-gray-500 mb-4" }, toDisplayString(unref(t)("chart.empty")), 1),
                createVNode(unref(Link), {
                  href: _ctx.route("organizations.roles.create", __props.organization.id),
                  class: "rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 transition"
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(unref(t)("roles.create")), 1)
                  ]),
                  _: 1
                }, 8, ["href"])
              ])) : (openBlock(), createBlock("div", {
                key: 1,
                ref_key: "containerRef",
                ref: containerRef,
                class: "rounded-2xl border border-gray-100 bg-white p-4 shadow-sm overflow-hidden",
                style: { "min-height": "600px" }
              }, [
                (openBlock(), createBlock("svg", {
                  ref_key: "svgRef",
                  ref: svgRef,
                  class: "w-full",
                  style: { "min-height": "600px" }
                }, null, 512))
              ], 512)),
              ((_d = __props.chartData) == null ? void 0 : _d.length) ? (openBlock(), createBlock("div", {
                key: 2,
                class: "mt-4 flex flex-wrap items-center gap-6 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"
              }, [
                createVNode("div", { class: "flex items-center gap-2" }, [
                  createVNode("div", { class: "h-3 w-3 rounded-full bg-gray-400" }),
                  createVNode("span", { class: "text-xs text-gray-600" }, toDisplayString(unref(t)("roles.low")), 1)
                ]),
                createVNode("div", { class: "flex items-center gap-2" }, [
                  createVNode("div", { class: "h-3 w-3 rounded-full bg-indigo-500" }),
                  createVNode("span", { class: "text-xs text-gray-600" }, toDisplayString(unref(t)("roles.medium")), 1)
                ]),
                createVNode("div", { class: "flex items-center gap-2" }, [
                  createVNode("div", { class: "h-3 w-3 rounded-full bg-amber-500" }),
                  createVNode("span", { class: "text-xs text-gray-600" }, toDisplayString(unref(t)("roles.high")), 1)
                ]),
                createVNode("div", { class: "flex items-center gap-2" }, [
                  createVNode("div", { class: "h-3 w-3 rounded-full bg-red-500" }),
                  createVNode("span", { class: "text-xs text-gray-600" }, toDisplayString(unref(t)("roles.critical")), 1)
                ]),
                createVNode("div", { class: "flex items-center gap-2" }, [
                  createVNode("div", { class: "h-4 w-6 rounded border border-amber-300 bg-amber-50" }),
                  createVNode("span", { class: "text-xs text-gray-600" }, toDisplayString(unref(t)("chart.vacant")), 1)
                ])
              ])) : createCommentVNode("", true)
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
