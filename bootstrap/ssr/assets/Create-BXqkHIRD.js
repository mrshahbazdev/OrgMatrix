import { withCtx, unref, createTextVNode, toDisplayString, createVNode, openBlock, createBlock, Fragment, renderList, createCommentVNode, withModifiers, withDirectives, vModelSelect, vModelCheckbox, vModelText, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderAttr } from "vue/server-renderer";
import { useForm, Head, Link, router } from "@inertiajs/vue3";
import { useI18n } from "vue-i18n";
import { _ as _sfc_main$1 } from "./AuthenticatedLayout-Cwxv3suN.js";
import "./LanguageSwitcher-DWy6sQ-D.js";
const _sfc_main = {
  __name: "Create",
  __ssrInlineRender: true,
  props: { organization: Object, role: Object, availablePeople: Array },
  setup(__props) {
    const { t } = useI18n();
    const props = __props;
    const form = useForm({
      person_id: "",
      is_primary: false,
      start_date: "",
      end_date: "",
      notes: ""
    });
    const submit = () => form.post(route("organizations.roles.assign.store", [props.organization.id, props.role.id]));
    const removeAssignment = (assignment) => {
      router.delete(route("organizations.roles.assign.destroy", [props.organization.id, props.role.id, assignment.id]));
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h1 class="text-xl font-semibold text-gray-900"${_scopeId}>${ssrInterpolate(unref(t)("assignments.title"))}: ${ssrInterpolate(__props.role.name)}</h1>`);
          } else {
            return [
              createVNode("h1", { class: "text-xl font-semibold text-gray-900" }, toDisplayString(unref(t)("assignments.title")) + ": " + toDisplayString(__props.role.name), 1)
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b, _c, _d;
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), {
              title: unref(t)("assignments.title")
            }, null, _parent2, _scopeId));
            _push2(`<div class="mx-auto max-w-2xl space-y-6"${_scopeId}>`);
            if ((_a = __props.role.assignments) == null ? void 0 : _a.length) {
              _push2(`<div class="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"${_scopeId}><h3 class="text-lg font-semibold text-gray-900 mb-4"${_scopeId}>${ssrInterpolate(unref(t)("assignments.current"))}</h3><div class="space-y-2"${_scopeId}><!--[-->`);
              ssrRenderList(__props.role.assignments, (a) => {
                var _a2, _b2, _c2, _d2, _e;
                _push2(`<div class="flex items-center justify-between rounded-xl bg-gray-50 p-3"${_scopeId}><div class="flex items-center gap-3"${_scopeId}><div class="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-600"${_scopeId}>${ssrInterpolate((_b2 = (_a2 = a.person) == null ? void 0 : _a2.first_name) == null ? void 0 : _b2.charAt(0))}${ssrInterpolate((_d2 = (_c2 = a.person) == null ? void 0 : _c2.last_name) == null ? void 0 : _d2.charAt(0))}</div><div${_scopeId}><span class="text-sm font-medium text-gray-900"${_scopeId}>${ssrInterpolate((_e = a.person) == null ? void 0 : _e.full_name)}</span>`);
                if (a.is_primary) {
                  _push2(`<span class="ml-2 rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-medium text-indigo-700"${_scopeId}>${ssrInterpolate(unref(t)("roles.primary"))}</span>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div></div><button class="text-sm text-red-600 hover:text-red-700"${_scopeId}>${ssrInterpolate(unref(t)("common.delete"))}</button></div>`);
              });
              _push2(`<!--]--></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm"${_scopeId}><h3 class="text-lg font-semibold text-gray-900 mb-6"${_scopeId}>${ssrInterpolate(unref(t)("roles.assign_person"))}</h3>`);
            if (!((_b = __props.availablePeople) == null ? void 0 : _b.length)) {
              _push2(`<div class="text-center py-8 text-gray-500"${_scopeId}>${ssrInterpolate(unref(t)("assignments.no_people"))}</div>`);
            } else {
              _push2(`<form class="space-y-6"${_scopeId}><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1.5"${_scopeId}>${ssrInterpolate(unref(t)("assignments.select_person"))} *</label><select required class="block w-full rounded-xl border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:border-indigo-500 focus:bg-white focus:ring-indigo-500 transition"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(form).person_id) ? ssrLooseContain(unref(form).person_id, "") : ssrLooseEqual(unref(form).person_id, "")) ? " selected" : ""}${_scopeId}>${ssrInterpolate(unref(t)("assignments.select_person"))}</option><!--[-->`);
              ssrRenderList(__props.availablePeople, (p) => {
                _push2(`<option${ssrRenderAttr("value", p.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).person_id) ? ssrLooseContain(unref(form).person_id, p.id) : ssrLooseEqual(unref(form).person_id, p.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(p.full_name)}</option>`);
              });
              _push2(`<!--]--></select></div><label class="flex items-center gap-2"${_scopeId}><input${ssrIncludeBooleanAttr(Array.isArray(unref(form).is_primary) ? ssrLooseContain(unref(form).is_primary, null) : unref(form).is_primary) ? " checked" : ""} type="checkbox" class="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"${_scopeId}><span class="text-sm text-gray-700"${_scopeId}>${ssrInterpolate(unref(t)("assignments.is_primary"))}</span></label><div class="grid grid-cols-2 gap-4"${_scopeId}><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1.5"${_scopeId}>${ssrInterpolate(unref(t)("assignments.start_date"))}</label><input${ssrRenderAttr("value", unref(form).start_date)} type="date" class="block w-full rounded-xl border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:border-indigo-500 focus:bg-white focus:ring-indigo-500 transition"${_scopeId}></div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1.5"${_scopeId}>${ssrInterpolate(unref(t)("assignments.end_date"))}</label><input${ssrRenderAttr("value", unref(form).end_date)} type="date" class="block w-full rounded-xl border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:border-indigo-500 focus:bg-white focus:ring-indigo-500 transition"${_scopeId}></div></div><div class="flex gap-3 pt-4"${_scopeId}><button type="submit"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} class="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 transition disabled:opacity-50"${_scopeId}>${ssrInterpolate(unref(t)("roles.assign_person"))}</button>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("organizations.roles.index", __props.organization.id),
                class: "rounded-xl border border-gray-200 px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(unref(t)("common.back"))}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(unref(t)("common.back")), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div></form>`);
            }
            _push2(`</div></div>`);
          } else {
            return [
              createVNode(unref(Head), {
                title: unref(t)("assignments.title")
              }, null, 8, ["title"]),
              createVNode("div", { class: "mx-auto max-w-2xl space-y-6" }, [
                ((_c = __props.role.assignments) == null ? void 0 : _c.length) ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
                }, [
                  createVNode("h3", { class: "text-lg font-semibold text-gray-900 mb-4" }, toDisplayString(unref(t)("assignments.current")), 1),
                  createVNode("div", { class: "space-y-2" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.role.assignments, (a) => {
                      var _a2, _b2, _c2, _d2, _e;
                      return openBlock(), createBlock("div", {
                        key: a.id,
                        class: "flex items-center justify-between rounded-xl bg-gray-50 p-3"
                      }, [
                        createVNode("div", { class: "flex items-center gap-3" }, [
                          createVNode("div", { class: "flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-600" }, toDisplayString((_b2 = (_a2 = a.person) == null ? void 0 : _a2.first_name) == null ? void 0 : _b2.charAt(0)) + toDisplayString((_d2 = (_c2 = a.person) == null ? void 0 : _c2.last_name) == null ? void 0 : _d2.charAt(0)), 1),
                          createVNode("div", null, [
                            createVNode("span", { class: "text-sm font-medium text-gray-900" }, toDisplayString((_e = a.person) == null ? void 0 : _e.full_name), 1),
                            a.is_primary ? (openBlock(), createBlock("span", {
                              key: 0,
                              class: "ml-2 rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-medium text-indigo-700"
                            }, toDisplayString(unref(t)("roles.primary")), 1)) : createCommentVNode("", true)
                          ])
                        ]),
                        createVNode("button", {
                          onClick: ($event) => removeAssignment(a),
                          class: "text-sm text-red-600 hover:text-red-700"
                        }, toDisplayString(unref(t)("common.delete")), 9, ["onClick"])
                      ]);
                    }), 128))
                  ])
                ])) : createCommentVNode("", true),
                createVNode("div", { class: "rounded-2xl border border-gray-100 bg-white p-8 shadow-sm" }, [
                  createVNode("h3", { class: "text-lg font-semibold text-gray-900 mb-6" }, toDisplayString(unref(t)("roles.assign_person")), 1),
                  !((_d = __props.availablePeople) == null ? void 0 : _d.length) ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "text-center py-8 text-gray-500"
                  }, toDisplayString(unref(t)("assignments.no_people")), 1)) : (openBlock(), createBlock("form", {
                    key: 1,
                    onSubmit: withModifiers(submit, ["prevent"]),
                    class: "space-y-6"
                  }, [
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1.5" }, toDisplayString(unref(t)("assignments.select_person")) + " *", 1),
                      withDirectives(createVNode("select", {
                        "onUpdate:modelValue": ($event) => unref(form).person_id = $event,
                        required: "",
                        class: "block w-full rounded-xl border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:border-indigo-500 focus:bg-white focus:ring-indigo-500 transition"
                      }, [
                        createVNode("option", { value: "" }, toDisplayString(unref(t)("assignments.select_person")), 1),
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.availablePeople, (p) => {
                          return openBlock(), createBlock("option", {
                            key: p.id,
                            value: p.id
                          }, toDisplayString(p.full_name), 9, ["value"]);
                        }), 128))
                      ], 8, ["onUpdate:modelValue"]), [
                        [vModelSelect, unref(form).person_id]
                      ])
                    ]),
                    createVNode("label", { class: "flex items-center gap-2" }, [
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => unref(form).is_primary = $event,
                        type: "checkbox",
                        class: "rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelCheckbox, unref(form).is_primary]
                      ]),
                      createVNode("span", { class: "text-sm text-gray-700" }, toDisplayString(unref(t)("assignments.is_primary")), 1)
                    ]),
                    createVNode("div", { class: "grid grid-cols-2 gap-4" }, [
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1.5" }, toDisplayString(unref(t)("assignments.start_date")), 1),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(form).start_date = $event,
                          type: "date",
                          class: "block w-full rounded-xl border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:border-indigo-500 focus:bg-white focus:ring-indigo-500 transition"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).start_date]
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1.5" }, toDisplayString(unref(t)("assignments.end_date")), 1),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(form).end_date = $event,
                          type: "date",
                          class: "block w-full rounded-xl border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:border-indigo-500 focus:bg-white focus:ring-indigo-500 transition"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).end_date]
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "flex gap-3 pt-4" }, [
                      createVNode("button", {
                        type: "submit",
                        disabled: unref(form).processing,
                        class: "rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 transition disabled:opacity-50"
                      }, toDisplayString(unref(t)("roles.assign_person")), 9, ["disabled"]),
                      createVNode(unref(Link), {
                        href: _ctx.route("organizations.roles.index", __props.organization.id),
                        class: "rounded-xl border border-gray-200 px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(unref(t)("common.back")), 1)
                        ]),
                        _: 1
                      }, 8, ["href"])
                    ])
                  ], 32))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Assignments/Create.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
