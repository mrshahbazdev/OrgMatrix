import { withCtx, unref, createTextVNode, toDisplayString, createVNode, openBlock, createBlock, Fragment, renderList, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { Head, Link, router } from "@inertiajs/vue3";
import { useI18n } from "vue-i18n";
import { _ as _sfc_main$1 } from "./AuthenticatedLayout-Cwxv3suN.js";
import "./LanguageSwitcher-DWy6sQ-D.js";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: { organization: Object, people: Array },
  setup(__props) {
    const { t } = useI18n();
    const destroy = (org, person) => {
      if (confirm(t("persons.delete_confirm"))) {
        router.delete(route("organizations.persons.destroy", [org.id, person.id]));
      }
    };
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
            _push2(`<span${_scopeId}>/</span><span class="text-gray-900 font-semibold"${_scopeId}>${ssrInterpolate(unref(t)("persons.title"))}</span></div>`);
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
                createVNode("span", { class: "text-gray-900 font-semibold" }, toDisplayString(unref(t)("persons.title")), 1)
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b;
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), {
              title: unref(t)("persons.title")
            }, null, _parent2, _scopeId));
            _push2(`<div class="flex items-center justify-between mb-6"${_scopeId}><h2 class="text-2xl font-bold text-gray-900"${_scopeId}>${ssrInterpolate(unref(t)("persons.title"))}</h2>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("organizations.persons.create", __props.organization.id),
              class: "rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 transition"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(t)("persons.create"))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(t)("persons.create")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            if (!((_a = __props.people) == null ? void 0 : _a.length)) {
              _push2(`<div class="rounded-2xl border-2 border-dashed border-gray-200 bg-white p-16 text-center"${_scopeId}><p class="text-gray-500"${_scopeId}>${ssrInterpolate(unref(t)("persons.no_persons"))}</p></div>`);
            } else {
              _push2(`<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"${_scopeId}><!--[-->`);
              ssrRenderList(__props.people, (person) => {
                var _a2;
                _push2(`<div class="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm hover:shadow-lg transition-all"${_scopeId}><div class="flex items-center gap-3 mb-3"${_scopeId}><div class="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-600"${_scopeId}>${ssrInterpolate(person.first_name.charAt(0))}${ssrInterpolate(person.last_name.charAt(0))}</div><div${_scopeId}><h3 class="font-semibold text-gray-900"${_scopeId}>${ssrInterpolate(person.full_name)}</h3>`);
                if (person.title) {
                  _push2(`<p class="text-xs text-gray-500"${_scopeId}>${ssrInterpolate(person.title)}</p>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div></div><div class="space-y-1 text-sm text-gray-500 mb-3"${_scopeId}>`);
                if (person.email) {
                  _push2(`<p${_scopeId}>${ssrInterpolate(person.email)}</p>`);
                } else {
                  _push2(`<!---->`);
                }
                if (person.department) {
                  _push2(`<p${_scopeId}>${ssrInterpolate(person.department)}</p>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div>`);
                if ((_a2 = person.roles) == null ? void 0 : _a2.length) {
                  _push2(`<div class="flex flex-wrap gap-1 mb-3"${_scopeId}><!--[-->`);
                  ssrRenderList(person.roles, (role) => {
                    _push2(`<span class="inline-flex rounded-full bg-purple-50 px-2.5 py-0.5 text-xs font-medium text-purple-700"${_scopeId}>${ssrInterpolate(role.name)}</span>`);
                  });
                  _push2(`<!--]--></div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<div class="flex gap-2 pt-3 border-t border-gray-50"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Link), {
                  href: _ctx.route("organizations.persons.edit", [__props.organization.id, person.id]),
                  class: "flex-1 rounded-lg border border-gray-200 py-2 text-center text-xs font-medium text-gray-700 hover:bg-gray-50 transition"
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
                _push2(`<button class="rounded-lg border border-red-200 px-3 py-2 text-xs text-red-600 hover:bg-red-50 transition"${_scopeId}>${ssrInterpolate(unref(t)("common.delete"))}</button></div></div>`);
              });
              _push2(`<!--]--></div>`);
            }
          } else {
            return [
              createVNode(unref(Head), {
                title: unref(t)("persons.title")
              }, null, 8, ["title"]),
              createVNode("div", { class: "flex items-center justify-between mb-6" }, [
                createVNode("h2", { class: "text-2xl font-bold text-gray-900" }, toDisplayString(unref(t)("persons.title")), 1),
                createVNode(unref(Link), {
                  href: _ctx.route("organizations.persons.create", __props.organization.id),
                  class: "rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 transition"
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(unref(t)("persons.create")), 1)
                  ]),
                  _: 1
                }, 8, ["href"])
              ]),
              !((_b = __props.people) == null ? void 0 : _b.length) ? (openBlock(), createBlock("div", {
                key: 0,
                class: "rounded-2xl border-2 border-dashed border-gray-200 bg-white p-16 text-center"
              }, [
                createVNode("p", { class: "text-gray-500" }, toDisplayString(unref(t)("persons.no_persons")), 1)
              ])) : (openBlock(), createBlock("div", {
                key: 1,
                class: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
              }, [
                (openBlock(true), createBlock(Fragment, null, renderList(__props.people, (person) => {
                  var _a2;
                  return openBlock(), createBlock("div", {
                    key: person.id,
                    class: "rounded-2xl border border-gray-100 bg-white p-5 shadow-sm hover:shadow-lg transition-all"
                  }, [
                    createVNode("div", { class: "flex items-center gap-3 mb-3" }, [
                      createVNode("div", { class: "flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-600" }, toDisplayString(person.first_name.charAt(0)) + toDisplayString(person.last_name.charAt(0)), 1),
                      createVNode("div", null, [
                        createVNode("h3", { class: "font-semibold text-gray-900" }, toDisplayString(person.full_name), 1),
                        person.title ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "text-xs text-gray-500"
                        }, toDisplayString(person.title), 1)) : createCommentVNode("", true)
                      ])
                    ]),
                    createVNode("div", { class: "space-y-1 text-sm text-gray-500 mb-3" }, [
                      person.email ? (openBlock(), createBlock("p", { key: 0 }, toDisplayString(person.email), 1)) : createCommentVNode("", true),
                      person.department ? (openBlock(), createBlock("p", { key: 1 }, toDisplayString(person.department), 1)) : createCommentVNode("", true)
                    ]),
                    ((_a2 = person.roles) == null ? void 0 : _a2.length) ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "flex flex-wrap gap-1 mb-3"
                    }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(person.roles, (role) => {
                        return openBlock(), createBlock("span", {
                          key: role.id,
                          class: "inline-flex rounded-full bg-purple-50 px-2.5 py-0.5 text-xs font-medium text-purple-700"
                        }, toDisplayString(role.name), 1);
                      }), 128))
                    ])) : createCommentVNode("", true),
                    createVNode("div", { class: "flex gap-2 pt-3 border-t border-gray-50" }, [
                      createVNode(unref(Link), {
                        href: _ctx.route("organizations.persons.edit", [__props.organization.id, person.id]),
                        class: "flex-1 rounded-lg border border-gray-200 py-2 text-center text-xs font-medium text-gray-700 hover:bg-gray-50 transition"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(unref(t)("common.edit")), 1)
                        ]),
                        _: 1
                      }, 8, ["href"]),
                      createVNode("button", {
                        onClick: ($event) => destroy(__props.organization, person),
                        class: "rounded-lg border border-red-200 px-3 py-2 text-xs text-red-600 hover:bg-red-50 transition"
                      }, toDisplayString(unref(t)("common.delete")), 9, ["onClick"])
                    ])
                  ]);
                }), 128))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Persons/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
