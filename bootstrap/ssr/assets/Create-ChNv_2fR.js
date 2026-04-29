import { withCtx, unref, createTextVNode, toDisplayString, createVNode, withModifiers, withDirectives, vModelText, openBlock, createBlock, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { useForm, Head, Link } from "@inertiajs/vue3";
import { useI18n } from "vue-i18n";
import { _ as _sfc_main$1 } from "./AuthenticatedLayout-C7ouL3e5.js";
import "./LanguageSwitcher-DWy6sQ-D.js";
const _sfc_main = {
  __name: "Create",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n();
    const form = useForm({
      name: "",
      description: "",
      industry: ""
    });
    const submit = () => form.post(route("organizations.store"));
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h1 class="text-xl font-semibold text-gray-900"${_scopeId}>${ssrInterpolate(unref(t)("organizations.create"))}</h1>`);
          } else {
            return [
              createVNode("h1", { class: "text-xl font-semibold text-gray-900" }, toDisplayString(unref(t)("organizations.create")), 1)
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), {
              title: unref(t)("organizations.create")
            }, null, _parent2, _scopeId));
            _push2(`<div class="mx-auto max-w-2xl"${_scopeId}><div class="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm"${_scopeId}><form class="space-y-6"${_scopeId}><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1.5"${_scopeId}>${ssrInterpolate(unref(t)("organizations.name"))} *</label><input${ssrRenderAttr("value", unref(form).name)} type="text" required class="block w-full rounded-xl border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:border-indigo-500 focus:bg-white focus:ring-indigo-500 transition"${_scopeId}>`);
            if (unref(form).errors.name) {
              _push2(`<p class="mt-1.5 text-xs text-red-600"${_scopeId}>${ssrInterpolate(unref(form).errors.name)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1.5"${_scopeId}>${ssrInterpolate(unref(t)("organizations.description"))}</label><textarea rows="3" class="block w-full rounded-xl border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:border-indigo-500 focus:bg-white focus:ring-indigo-500 transition"${_scopeId}>${ssrInterpolate(unref(form).description)}</textarea></div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1.5"${_scopeId}>${ssrInterpolate(unref(t)("organizations.industry"))}</label><input${ssrRenderAttr("value", unref(form).industry)} type="text" class="block w-full rounded-xl border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:border-indigo-500 focus:bg-white focus:ring-indigo-500 transition"${_scopeId}></div><div class="flex gap-3 pt-4"${_scopeId}><button type="submit"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} class="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 transition disabled:opacity-50"${_scopeId}>${ssrInterpolate(unref(t)("common.create"))}</button>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("organizations.index"),
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
                title: unref(t)("organizations.create")
              }, null, 8, ["title"]),
              createVNode("div", { class: "mx-auto max-w-2xl" }, [
                createVNode("div", { class: "rounded-2xl border border-gray-100 bg-white p-8 shadow-sm" }, [
                  createVNode("form", {
                    onSubmit: withModifiers(submit, ["prevent"]),
                    class: "space-y-6"
                  }, [
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1.5" }, toDisplayString(unref(t)("organizations.name")) + " *", 1),
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
                      createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1.5" }, toDisplayString(unref(t)("organizations.description")), 1),
                      withDirectives(createVNode("textarea", {
                        "onUpdate:modelValue": ($event) => unref(form).description = $event,
                        rows: "3",
                        class: "block w-full rounded-xl border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:border-indigo-500 focus:bg-white focus:ring-indigo-500 transition"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, unref(form).description]
                      ])
                    ]),
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1.5" }, toDisplayString(unref(t)("organizations.industry")), 1),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => unref(form).industry = $event,
                        type: "text",
                        class: "block w-full rounded-xl border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:border-indigo-500 focus:bg-white focus:ring-indigo-500 transition"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, unref(form).industry]
                      ])
                    ]),
                    createVNode("div", { class: "flex gap-3 pt-4" }, [
                      createVNode("button", {
                        type: "submit",
                        disabled: unref(form).processing,
                        class: "rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 transition disabled:opacity-50"
                      }, toDisplayString(unref(t)("common.create")), 9, ["disabled"]),
                      createVNode(unref(Link), {
                        href: _ctx.route("organizations.index"),
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Organizations/Create.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
