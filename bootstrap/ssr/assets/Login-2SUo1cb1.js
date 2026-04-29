import { withCtx, unref, createTextVNode, toDisplayString, createVNode, openBlock, createBlock, createCommentVNode, withModifiers, withDirectives, vModelText, vModelCheckbox, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain } from "vue/server-renderer";
import { useForm, Head, Link } from "@inertiajs/vue3";
import { useI18n } from "vue-i18n";
import { _ as _sfc_main$1 } from "./GuestLayout-7rtMOgD2.js";
import "./LanguageSwitcher-DWy6sQ-D.js";
const _sfc_main = {
  __name: "Login",
  __ssrInlineRender: true,
  props: { canResetPassword: Boolean, status: String },
  setup(__props) {
    const { t } = useI18n();
    const form = useForm({
      email: "",
      password: "",
      remember: false
    });
    const submit = () => {
      form.post(route("login"), {
        onFinish: () => form.reset("password")
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), {
              title: unref(t)("auth.login_title")
            }, null, _parent2, _scopeId));
            _push2(`<div class="mb-8"${_scopeId}><h2 class="text-2xl font-bold text-gray-900"${_scopeId}>${ssrInterpolate(unref(t)("auth.login_title"))}</h2><p class="mt-2 text-sm text-gray-500"${_scopeId}>${ssrInterpolate(unref(t)("auth.login_subtitle"))}</p></div>`);
            if (__props.status) {
              _push2(`<div class="mb-4 text-sm font-medium text-green-600 bg-green-50 rounded-lg p-3"${_scopeId}>${ssrInterpolate(__props.status)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<form class="space-y-5"${_scopeId}><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1.5"${_scopeId}>${ssrInterpolate(unref(t)("auth.email"))}</label><input${ssrRenderAttr("value", unref(form).email)} type="email" required autofocus class="block w-full rounded-xl border-gray-200 bg-gray-50 px-4 py-3 text-sm shadow-sm focus:border-indigo-500 focus:bg-white focus:ring-indigo-500 transition"${ssrRenderAttr("placeholder", unref(t)("auth.email"))}${_scopeId}>`);
            if (unref(form).errors.email) {
              _push2(`<p class="mt-1.5 text-xs text-red-600"${_scopeId}>${ssrInterpolate(unref(form).errors.email)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1.5"${_scopeId}>${ssrInterpolate(unref(t)("auth.password"))}</label><input${ssrRenderAttr("value", unref(form).password)} type="password" required class="block w-full rounded-xl border-gray-200 bg-gray-50 px-4 py-3 text-sm shadow-sm focus:border-indigo-500 focus:bg-white focus:ring-indigo-500 transition"${ssrRenderAttr("placeholder", unref(t)("auth.password"))}${_scopeId}>`);
            if (unref(form).errors.password) {
              _push2(`<p class="mt-1.5 text-xs text-red-600"${_scopeId}>${ssrInterpolate(unref(form).errors.password)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="flex items-center justify-between"${_scopeId}><label class="flex items-center gap-2"${_scopeId}><input${ssrIncludeBooleanAttr(Array.isArray(unref(form).remember) ? ssrLooseContain(unref(form).remember, null) : unref(form).remember) ? " checked" : ""} type="checkbox" class="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"${_scopeId}><span class="text-sm text-gray-600"${_scopeId}>${ssrInterpolate(unref(t)("auth.remember_me"))}</span></label>`);
            if (__props.canResetPassword) {
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("password.request"),
                class: "text-sm font-medium text-indigo-600 hover:text-indigo-500"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(unref(t)("auth.forgot_password"))}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(unref(t)("auth.forgot_password")), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><button type="submit"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} class="flex w-full items-center justify-center rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/25 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition disabled:opacity-50"${_scopeId}>`);
            if (unref(form).processing) {
              _push2(`<svg class="mr-2 h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24"${_scopeId}><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"${_scopeId}></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"${_scopeId}></path></svg>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(` ${ssrInterpolate(unref(t)("auth.sign_in"))}</button></form><p class="mt-8 text-center text-sm text-gray-500"${_scopeId}>${ssrInterpolate(unref(t)("auth.no_account"))} `);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("register"),
              class: "font-semibold text-indigo-600 hover:text-indigo-500"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(t)("auth.sign_up"))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(t)("auth.sign_up")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</p>`);
          } else {
            return [
              createVNode(unref(Head), {
                title: unref(t)("auth.login_title")
              }, null, 8, ["title"]),
              createVNode("div", { class: "mb-8" }, [
                createVNode("h2", { class: "text-2xl font-bold text-gray-900" }, toDisplayString(unref(t)("auth.login_title")), 1),
                createVNode("p", { class: "mt-2 text-sm text-gray-500" }, toDisplayString(unref(t)("auth.login_subtitle")), 1)
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
                    class: "block w-full rounded-xl border-gray-200 bg-gray-50 px-4 py-3 text-sm shadow-sm focus:border-indigo-500 focus:bg-white focus:ring-indigo-500 transition",
                    placeholder: unref(t)("auth.email")
                  }, null, 8, ["onUpdate:modelValue", "placeholder"]), [
                    [vModelText, unref(form).email]
                  ]),
                  unref(form).errors.email ? (openBlock(), createBlock("p", {
                    key: 0,
                    class: "mt-1.5 text-xs text-red-600"
                  }, toDisplayString(unref(form).errors.email), 1)) : createCommentVNode("", true)
                ]),
                createVNode("div", null, [
                  createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1.5" }, toDisplayString(unref(t)("auth.password")), 1),
                  withDirectives(createVNode("input", {
                    "onUpdate:modelValue": ($event) => unref(form).password = $event,
                    type: "password",
                    required: "",
                    class: "block w-full rounded-xl border-gray-200 bg-gray-50 px-4 py-3 text-sm shadow-sm focus:border-indigo-500 focus:bg-white focus:ring-indigo-500 transition",
                    placeholder: unref(t)("auth.password")
                  }, null, 8, ["onUpdate:modelValue", "placeholder"]), [
                    [vModelText, unref(form).password]
                  ]),
                  unref(form).errors.password ? (openBlock(), createBlock("p", {
                    key: 0,
                    class: "mt-1.5 text-xs text-red-600"
                  }, toDisplayString(unref(form).errors.password), 1)) : createCommentVNode("", true)
                ]),
                createVNode("div", { class: "flex items-center justify-between" }, [
                  createVNode("label", { class: "flex items-center gap-2" }, [
                    withDirectives(createVNode("input", {
                      "onUpdate:modelValue": ($event) => unref(form).remember = $event,
                      type: "checkbox",
                      class: "rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    }, null, 8, ["onUpdate:modelValue"]), [
                      [vModelCheckbox, unref(form).remember]
                    ]),
                    createVNode("span", { class: "text-sm text-gray-600" }, toDisplayString(unref(t)("auth.remember_me")), 1)
                  ]),
                  __props.canResetPassword ? (openBlock(), createBlock(unref(Link), {
                    key: 0,
                    href: _ctx.route("password.request"),
                    class: "text-sm font-medium text-indigo-600 hover:text-indigo-500"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(unref(t)("auth.forgot_password")), 1)
                    ]),
                    _: 1
                  }, 8, ["href"])) : createCommentVNode("", true)
                ]),
                createVNode("button", {
                  type: "submit",
                  disabled: unref(form).processing,
                  class: "flex w-full items-center justify-center rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/25 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition disabled:opacity-50"
                }, [
                  unref(form).processing ? (openBlock(), createBlock("svg", {
                    key: 0,
                    class: "mr-2 h-4 w-4 animate-spin",
                    fill: "none",
                    viewBox: "0 0 24 24"
                  }, [
                    createVNode("circle", {
                      class: "opacity-25",
                      cx: "12",
                      cy: "12",
                      r: "10",
                      stroke: "currentColor",
                      "stroke-width": "4"
                    }),
                    createVNode("path", {
                      class: "opacity-75",
                      fill: "currentColor",
                      d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    })
                  ])) : createCommentVNode("", true),
                  createTextVNode(" " + toDisplayString(unref(t)("auth.sign_in")), 1)
                ], 8, ["disabled"])
              ], 32),
              createVNode("p", { class: "mt-8 text-center text-sm text-gray-500" }, [
                createTextVNode(toDisplayString(unref(t)("auth.no_account")) + " ", 1),
                createVNode(unref(Link), {
                  href: _ctx.route("register"),
                  class: "font-semibold text-indigo-600 hover:text-indigo-500"
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(unref(t)("auth.sign_up")), 1)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/Login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
