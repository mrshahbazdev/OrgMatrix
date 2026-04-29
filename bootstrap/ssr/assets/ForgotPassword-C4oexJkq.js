import { withCtx, unref, createVNode, toDisplayString, openBlock, createBlock, createCommentVNode, withModifiers, withDirectives, vModelText, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { useForm, Head } from "@inertiajs/vue3";
import { useI18n } from "vue-i18n";
import { _ as _sfc_main$1 } from "./GuestLayout-7rtMOgD2.js";
import "./LanguageSwitcher-DWy6sQ-D.js";
const _sfc_main = {
  __name: "ForgotPassword",
  __ssrInlineRender: true,
  props: { status: String },
  setup(__props) {
    const { t } = useI18n();
    const form = useForm({ email: "" });
    const submit = () => {
      form.post(route("password.email"));
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), {
              title: unref(t)("auth.forgot_title")
            }, null, _parent2, _scopeId));
            _push2(`<div class="mb-8"${_scopeId}><h2 class="text-2xl font-bold text-gray-900"${_scopeId}>${ssrInterpolate(unref(t)("auth.forgot_title"))}</h2><p class="mt-2 text-sm text-gray-500"${_scopeId}>${ssrInterpolate(unref(t)("auth.forgot_subtitle"))}</p></div>`);
            if (__props.status) {
              _push2(`<div class="mb-4 text-sm font-medium text-green-600 bg-green-50 rounded-lg p-3"${_scopeId}>${ssrInterpolate(__props.status)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<form class="space-y-5"${_scopeId}><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1.5"${_scopeId}>${ssrInterpolate(unref(t)("auth.email"))}</label><input${ssrRenderAttr("value", unref(form).email)} type="email" required autofocus class="block w-full rounded-xl border-gray-200 bg-gray-50 px-4 py-3 text-sm shadow-sm focus:border-indigo-500 focus:bg-white focus:ring-indigo-500 transition"${_scopeId}>`);
            if (unref(form).errors.email) {
              _push2(`<p class="mt-1.5 text-xs text-red-600"${_scopeId}>${ssrInterpolate(unref(form).errors.email)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><button type="submit"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} class="flex w-full items-center justify-center rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/25 hover:bg-indigo-700 transition disabled:opacity-50"${_scopeId}>${ssrInterpolate(unref(t)("auth.send_reset_link"))}</button></form>`);
          } else {
            return [
              createVNode(unref(Head), {
                title: unref(t)("auth.forgot_title")
              }, null, 8, ["title"]),
              createVNode("div", { class: "mb-8" }, [
                createVNode("h2", { class: "text-2xl font-bold text-gray-900" }, toDisplayString(unref(t)("auth.forgot_title")), 1),
                createVNode("p", { class: "mt-2 text-sm text-gray-500" }, toDisplayString(unref(t)("auth.forgot_subtitle")), 1)
              ]),
              __props.status ? (openBlock(), createBlock("div", {
                key: 0,
                class: "mb-4 text-sm font-medium text-green-600 bg-green-50 rounded-lg p-3"
              }, toDisplayString(__props.status), 1)) : createCommentVNode("", true),
              createVNode("form", {
                onSubmit: withModifiers(submit, ["prevent"]),
                class: "space-y-5"
              }, [
                createVNode("div", null, [
                  createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1.5" }, toDisplayString(unref(t)("auth.email")), 1),
                  withDirectives(createVNode("input", {
                    "onUpdate:modelValue": ($event) => unref(form).email = $event,
                    type: "email",
                    required: "",
                    autofocus: "",
                    class: "block w-full rounded-xl border-gray-200 bg-gray-50 px-4 py-3 text-sm shadow-sm focus:border-indigo-500 focus:bg-white focus:ring-indigo-500 transition"
                  }, null, 8, ["onUpdate:modelValue"]), [
                    [vModelText, unref(form).email]
                  ]),
                  unref(form).errors.email ? (openBlock(), createBlock("p", {
                    key: 0,
                    class: "mt-1.5 text-xs text-red-600"
                  }, toDisplayString(unref(form).errors.email), 1)) : createCommentVNode("", true)
                ]),
                createVNode("button", {
                  type: "submit",
                  disabled: unref(form).processing,
                  class: "flex w-full items-center justify-center rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/25 hover:bg-indigo-700 transition disabled:opacity-50"
                }, toDisplayString(unref(t)("auth.send_reset_link")), 9, ["disabled"])
              ], 32)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/ForgotPassword.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
