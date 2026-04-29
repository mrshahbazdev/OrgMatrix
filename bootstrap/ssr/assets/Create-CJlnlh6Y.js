import { withCtx, unref, createTextVNode, toDisplayString, createVNode, withModifiers, withDirectives, vModelText, openBlock, createBlock, createCommentVNode, vModelSelect, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList } from "vue/server-renderer";
import { useForm, Head, Link } from "@inertiajs/vue3";
import { useI18n } from "vue-i18n";
import { _ as _sfc_main$1 } from "./AuthenticatedLayout-Cwxv3suN.js";
import "./LanguageSwitcher-DWy6sQ-D.js";
const _sfc_main = {
  __name: "Create",
  __ssrInlineRender: true,
  props: { organization: Object, parentRoles: Array },
  setup(__props) {
    const { t } = useI18n();
    const props = __props;
    const form = useForm({
      name: "",
      description: "",
      department: "",
      parent_role_id: "",
      criticality: "medium"
    });
    const submit = () => form.post(route("organizations.roles.store", props.organization.id));
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h1 class="text-xl font-semibold text-gray-900"${_scopeId}>${ssrInterpolate(unref(t)("roles.create"))}</h1>`);
          } else {
            return [
              createVNode("h1", { class: "text-xl font-semibold text-gray-900" }, toDisplayString(unref(t)("roles.create")), 1)
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), {
              title: unref(t)("roles.create")
            }, null, _parent2, _scopeId));
            _push2(`<div class="mx-auto max-w-2xl"${_scopeId}><div class="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm"${_scopeId}><form class="space-y-6"${_scopeId}><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1.5"${_scopeId}>${ssrInterpolate(unref(t)("roles.name"))} *</label><input${ssrRenderAttr("value", unref(form).name)} type="text" required class="block w-full rounded-xl border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:border-indigo-500 focus:bg-white focus:ring-indigo-500 transition"${_scopeId}>`);
            if (unref(form).errors.name) {
              _push2(`<p class="mt-1.5 text-xs text-red-600"${_scopeId}>${ssrInterpolate(unref(form).errors.name)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1.5"${_scopeId}>${ssrInterpolate(unref(t)("roles.description"))}</label><textarea rows="3" class="block w-full rounded-xl border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:border-indigo-500 focus:bg-white focus:ring-indigo-500 transition"${_scopeId}>${ssrInterpolate(unref(form).description)}</textarea></div><div class="grid grid-cols-2 gap-4"${_scopeId}><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1.5"${_scopeId}>${ssrInterpolate(unref(t)("roles.department"))}</label><input${ssrRenderAttr("value", unref(form).department)} type="text" class="block w-full rounded-xl border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:border-indigo-500 focus:bg-white focus:ring-indigo-500 transition"${_scopeId}></div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1.5"${_scopeId}>${ssrInterpolate(unref(t)("roles.criticality"))} *</label><select class="block w-full rounded-xl border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:border-indigo-500 focus:bg-white focus:ring-indigo-500 transition"${_scopeId}><option value="low"${ssrIncludeBooleanAttr(Array.isArray(unref(form).criticality) ? ssrLooseContain(unref(form).criticality, "low") : ssrLooseEqual(unref(form).criticality, "low")) ? " selected" : ""}${_scopeId}>${ssrInterpolate(unref(t)("roles.low"))}</option><option value="medium"${ssrIncludeBooleanAttr(Array.isArray(unref(form).criticality) ? ssrLooseContain(unref(form).criticality, "medium") : ssrLooseEqual(unref(form).criticality, "medium")) ? " selected" : ""}${_scopeId}>${ssrInterpolate(unref(t)("roles.medium"))}</option><option value="high"${ssrIncludeBooleanAttr(Array.isArray(unref(form).criticality) ? ssrLooseContain(unref(form).criticality, "high") : ssrLooseEqual(unref(form).criticality, "high")) ? " selected" : ""}${_scopeId}>${ssrInterpolate(unref(t)("roles.high"))}</option><option value="critical"${ssrIncludeBooleanAttr(Array.isArray(unref(form).criticality) ? ssrLooseContain(unref(form).criticality, "critical") : ssrLooseEqual(unref(form).criticality, "critical")) ? " selected" : ""}${_scopeId}>${ssrInterpolate(unref(t)("roles.critical"))}</option></select></div></div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1.5"${_scopeId}>${ssrInterpolate(unref(t)("roles.parent_role"))}</label><select class="block w-full rounded-xl border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:border-indigo-500 focus:bg-white focus:ring-indigo-500 transition"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(form).parent_role_id) ? ssrLooseContain(unref(form).parent_role_id, "") : ssrLooseEqual(unref(form).parent_role_id, "")) ? " selected" : ""}${_scopeId}>${ssrInterpolate(unref(t)("roles.none"))}</option><!--[-->`);
            ssrRenderList(__props.parentRoles, (r) => {
              _push2(`<option${ssrRenderAttr("value", r.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).parent_role_id) ? ssrLooseContain(unref(form).parent_role_id, r.id) : ssrLooseEqual(unref(form).parent_role_id, r.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(r.name)}</option>`);
            });
            _push2(`<!--]--></select></div><div class="flex gap-3 pt-4"${_scopeId}><button type="submit"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} class="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 transition disabled:opacity-50"${_scopeId}>${ssrInterpolate(unref(t)("common.create"))}</button>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("organizations.roles.index", __props.organization.id),
              class: "rounded-xl border border-gray-200 px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(t)("common.cancel"))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(t)("common.cancel")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></form></div></div>`);
          } else {
            return [
              createVNode(unref(Head), {
                title: unref(t)("roles.create")
              }, null, 8, ["title"]),
              createVNode("div", { class: "mx-auto max-w-2xl" }, [
                createVNode("div", { class: "rounded-2xl border border-gray-100 bg-white p-8 shadow-sm" }, [
                  createVNode("form", {
                    onSubmit: withModifiers(submit, ["prevent"]),
                    class: "space-y-6"
                  }, [
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1.5" }, toDisplayString(unref(t)("roles.name")) + " *", 1),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => unref(form).name = $event,
                        type: "text",
                        required: "",
                        class: "block w-full rounded-xl border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:border-indigo-500 focus:bg-white focus:ring-indigo-500 transition"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, unref(form).name]
                      ]),
                      unref(form).errors.name ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "mt-1.5 text-xs text-red-600"
                      }, toDisplayString(unref(form).errors.name), 1)) : createCommentVNode("", true)
                    ]),
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1.5" }, toDisplayString(unref(t)("roles.description")), 1),
                      withDirectives(createVNode("textarea", {
                        "onUpdate:modelValue": ($event) => unref(form).description = $event,
                        rows: "3",
                        class: "block w-full rounded-xl border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:border-indigo-500 focus:bg-white focus:ring-indigo-500 transition"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, unref(form).description]
                      ])
                    ]),
                    createVNode("div", { class: "grid grid-cols-2 gap-4" }, [
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1.5" }, toDisplayString(unref(t)("roles.department")), 1),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(form).department = $event,
                          type: "text",
                          class: "block w-full rounded-xl border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:border-indigo-500 focus:bg-white focus:ring-indigo-500 transition"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).department]
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1.5" }, toDisplayString(unref(t)("roles.criticality")) + " *", 1),
                        withDirectives(createVNode("select", {
                          "onUpdate:modelValue": ($event) => unref(form).criticality = $event,
                          class: "block w-full rounded-xl border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:border-indigo-500 focus:bg-white focus:ring-indigo-500 transition"
                        }, [
                          createVNode("option", { value: "low" }, toDisplayString(unref(t)("roles.low")), 1),
                          createVNode("option", { value: "medium" }, toDisplayString(unref(t)("roles.medium")), 1),
                          createVNode("option", { value: "high" }, toDisplayString(unref(t)("roles.high")), 1),
                          createVNode("option", { value: "critical" }, toDisplayString(unref(t)("roles.critical")), 1)
                        ], 8, ["onUpdate:modelValue"]), [
                          [vModelSelect, unref(form).criticality]
                        ])
                      ])
                    ]),
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1.5" }, toDisplayString(unref(t)("roles.parent_role")), 1),
                      withDirectives(createVNode("select", {
                        "onUpdate:modelValue": ($event) => unref(form).parent_role_id = $event,
                        class: "block w-full rounded-xl border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:border-indigo-500 focus:bg-white focus:ring-indigo-500 transition"
                      }, [
                        createVNode("option", { value: "" }, toDisplayString(unref(t)("roles.none")), 1),
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.parentRoles, (r) => {
                          return openBlock(), createBlock("option", {
                            key: r.id,
                            value: r.id
                          }, toDisplayString(r.name), 9, ["value"]);
                        }), 128))
                      ], 8, ["onUpdate:modelValue"]), [
                        [vModelSelect, unref(form).parent_role_id]
                      ])
                    ]),
                    createVNode("div", { class: "flex gap-3 pt-4" }, [
                      createVNode("button", {
                        type: "submit",
                        disabled: unref(form).processing,
                        class: "rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 transition disabled:opacity-50"
                      }, toDisplayString(unref(t)("common.create")), 9, ["disabled"]),
                      createVNode(unref(Link), {
                        href: _ctx.route("organizations.roles.index", __props.organization.id),
                        class: "rounded-xl border border-gray-200 px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(unref(t)("common.cancel")), 1)
                        ]),
                        _: 1
                      }, 8, ["href"])
                    ])
                  ], 32)
                ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Roles/Create.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
