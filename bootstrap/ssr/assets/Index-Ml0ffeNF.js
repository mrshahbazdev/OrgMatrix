import { ref, computed, withCtx, unref, createTextVNode, toDisplayString, createVNode, openBlock, createBlock, withDirectives, vModelText, Fragment, renderList, vModelSelect, createCommentVNode, Teleport, withModifiers, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderTeleport } from "vue/server-renderer";
import { Head, Link, router } from "@inertiajs/vue3";
import { useI18n } from "vue-i18n";
import { _ as _sfc_main$1 } from "./AuthenticatedLayout-C7ouL3e5.js";
import "./LanguageSwitcher-DWy6sQ-D.js";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: { organization: Object, people: Array },
  setup(__props) {
    const { t } = useI18n();
    const props = __props;
    const searchQuery = ref("");
    const departmentFilter = ref("all");
    const departments = computed(() => {
      const depts = /* @__PURE__ */ new Set();
      (props.people || []).forEach((p) => {
        if (p.department) depts.add(p.department);
      });
      return [...depts].sort();
    });
    const filteredPeople = computed(() => {
      let result = props.people || [];
      if (searchQuery.value) {
        const q = searchQuery.value.toLowerCase();
        result = result.filter(
          (p) => p.full_name.toLowerCase().includes(q) || p.email && p.email.toLowerCase().includes(q) || p.department && p.department.toLowerCase().includes(q) || p.title && p.title.toLowerCase().includes(q)
        );
      }
      if (departmentFilter.value !== "all") {
        result = result.filter((p) => p.department === departmentFilter.value);
      }
      return result;
    });
    const destroy = (org, person) => {
      if (confirm(t("persons.delete_confirm"))) {
        router.delete(route("organizations.persons.destroy", [org.id, person.id]));
      }
    };
    const clearFilters = () => {
      searchQuery.value = "";
      departmentFilter.value = "all";
    };
    const showImportModal = ref(false);
    const importFile = ref(null);
    const importPeople = () => {
      if (!importFile.value) return;
      const formData = new FormData();
      formData.append("csv_file", importFile.value);
      router.post(route("organizations.import.people", props.organization.id), formData);
      showImportModal.value = false;
      importFile.value = null;
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
            _push2(`<span${_scopeId}>/</span><span class="text-gray-900 dark:text-white font-semibold"${_scopeId}>${ssrInterpolate(unref(t)("persons.title"))}</span></div>`);
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
                createVNode("span", { class: "text-gray-900 dark:text-white font-semibold" }, toDisplayString(unref(t)("persons.title")), 1)
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
            _push2(`<div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6"${_scopeId}><h2 class="text-2xl font-bold text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(unref(t)("persons.title"))}</h2><div class="flex flex-wrap gap-2"${_scopeId}><a${ssrRenderAttr("href", _ctx.route("organizations.export.people", __props.organization.id))} class="rounded-xl border border-gray-200 dark:border-gray-600 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition"${_scopeId}>${ssrInterpolate(unref(t)("import_export.export_people"))}</a><button class="rounded-xl border border-gray-200 dark:border-gray-600 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition"${_scopeId}>${ssrInterpolate(unref(t)("import_export.import_people"))}</button>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("organizations.persons.create", __props.organization.id),
              class: "rounded-xl bg-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 transition"
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
            _push2(`</div></div><div class="flex flex-col sm:flex-row gap-3 mb-4"${_scopeId}><div class="relative flex-1"${_scopeId}><svg class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"${_scopeId}></path></svg><input${ssrRenderAttr("value", searchQuery.value)} type="text"${ssrRenderAttr("placeholder", unref(t)("common.search"))} class="w-full rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 py-2.5 pl-10 pr-4 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500"${_scopeId}></div><select class="rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 py-2.5 px-4 text-sm text-gray-700 dark:text-gray-300"${_scopeId}><option value="all"${ssrIncludeBooleanAttr(Array.isArray(departmentFilter.value) ? ssrLooseContain(departmentFilter.value, "all") : ssrLooseEqual(departmentFilter.value, "all")) ? " selected" : ""}${_scopeId}>${ssrInterpolate(unref(t)("persons.department"))}: ${ssrInterpolate(unref(t)("common.all"))}</option><!--[-->`);
            ssrRenderList(departments.value, (dept) => {
              _push2(`<option${ssrRenderAttr("value", dept)}${ssrIncludeBooleanAttr(Array.isArray(departmentFilter.value) ? ssrLooseContain(departmentFilter.value, dept) : ssrLooseEqual(departmentFilter.value, dept)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(dept)}</option>`);
            });
            _push2(`<!--]--></select>`);
            if (searchQuery.value || departmentFilter.value !== "all") {
              _push2(`<button class="rounded-xl border border-gray-200 dark:border-gray-600 px-4 py-2.5 text-sm text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700 transition"${_scopeId}>${ssrInterpolate(unref(t)("common.clear_filters"))}</button>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            if (!((_a = __props.people) == null ? void 0 : _a.length)) {
              _push2(`<div class="rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-16 text-center"${_scopeId}><p class="text-gray-500 dark:text-gray-400"${_scopeId}>${ssrInterpolate(unref(t)("persons.no_persons"))}</p></div>`);
            } else if (!filteredPeople.value.length) {
              _push2(`<div class="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-12 text-center"${_scopeId}><p class="text-gray-500 dark:text-gray-400"${_scopeId}>${ssrInterpolate(unref(t)("common.no_results"))}</p></div>`);
            } else {
              _push2(`<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"${_scopeId}><!--[-->`);
              ssrRenderList(filteredPeople.value, (person) => {
                var _a2;
                _push2(`<div class="rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 shadow-sm hover:shadow-lg transition-all"${_scopeId}><div class="flex items-center gap-3 mb-3"${_scopeId}>`);
                if (person.avatar) {
                  _push2(`<img${ssrRenderAttr("src", "/storage/" + person.avatar)}${ssrRenderAttr("alt", person.full_name)} class="h-10 w-10 rounded-full object-cover"${_scopeId}>`);
                } else {
                  _push2(`<div class="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-sm font-bold text-indigo-600 dark:text-indigo-400"${_scopeId}>${ssrInterpolate(person.first_name.charAt(0))}${ssrInterpolate(person.last_name.charAt(0))}</div>`);
                }
                _push2(`<div${_scopeId}><h3 class="font-semibold text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(person.full_name)}</h3>`);
                if (person.title) {
                  _push2(`<p class="text-xs text-gray-500 dark:text-gray-400"${_scopeId}>${ssrInterpolate(person.title)}</p>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div></div><div class="space-y-1 text-sm text-gray-500 dark:text-gray-400 mb-3"${_scopeId}>`);
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
                    _push2(`<span class="inline-flex rounded-full bg-purple-50 dark:bg-purple-900/30 px-2.5 py-0.5 text-xs font-medium text-purple-700 dark:text-purple-400"${_scopeId}>${ssrInterpolate(role.name)}</span>`);
                  });
                  _push2(`<!--]--></div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<div class="flex gap-2 pt-3 border-t border-gray-50 dark:border-gray-700"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Link), {
                  href: _ctx.route("organizations.persons.edit", [__props.organization.id, person.id]),
                  class: "flex-1 rounded-lg border border-gray-200 dark:border-gray-600 py-2 text-center text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
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
                _push2(`<button class="rounded-lg border border-red-200 dark:border-red-800 px-3 py-2 text-xs text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 transition"${_scopeId}>${ssrInterpolate(unref(t)("common.delete"))}</button></div></div>`);
              });
              _push2(`<!--]--></div>`);
            }
            ssrRenderTeleport(_push2, (_push3) => {
              if (showImportModal.value) {
                _push3(`<div class="fixed inset-0 z-[100] flex items-center justify-center bg-black/50"${_scopeId}><div class="rounded-2xl bg-white dark:bg-gray-800 p-6 w-full max-w-md shadow-xl"${_scopeId}><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4"${_scopeId}>${ssrInterpolate(unref(t)("import_export.import_people"))}</h3><input type="file" accept=".csv,.txt" class="w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:rounded-lg file:border-0 file:bg-indigo-50 dark:file:bg-indigo-900/30 file:px-4 file:py-2 file:text-sm file:font-medium file:text-indigo-700 dark:file:text-indigo-400"${_scopeId}><p class="text-xs text-gray-400 mt-2 mb-4"${_scopeId}>CSV: First Name, Last Name, Email, Phone, Job Title, Department</p><div class="flex gap-3 justify-end"${_scopeId}><button class="rounded-xl border border-gray-200 dark:border-gray-600 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition"${_scopeId}>${ssrInterpolate(unref(t)("common.cancel"))}</button><button${ssrIncludeBooleanAttr(!importFile.value) ? " disabled" : ""} class="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50 transition"${_scopeId}>${ssrInterpolate(unref(t)("import_export.import"))}</button></div></div></div>`);
              } else {
                _push3(`<!---->`);
              }
            }, "body", false, _parent2);
          } else {
            return [
              createVNode(unref(Head), {
                title: unref(t)("persons.title")
              }, null, 8, ["title"]),
              createVNode("div", { class: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6" }, [
                createVNode("h2", { class: "text-2xl font-bold text-gray-900 dark:text-white" }, toDisplayString(unref(t)("persons.title")), 1),
                createVNode("div", { class: "flex flex-wrap gap-2" }, [
                  createVNode("a", {
                    href: _ctx.route("organizations.export.people", __props.organization.id),
                    class: "rounded-xl border border-gray-200 dark:border-gray-600 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                  }, toDisplayString(unref(t)("import_export.export_people")), 9, ["href"]),
                  createVNode("button", {
                    onClick: ($event) => showImportModal.value = true,
                    class: "rounded-xl border border-gray-200 dark:border-gray-600 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                  }, toDisplayString(unref(t)("import_export.import_people")), 9, ["onClick"]),
                  createVNode(unref(Link), {
                    href: _ctx.route("organizations.persons.create", __props.organization.id),
                    class: "rounded-xl bg-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 transition"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(unref(t)("persons.create")), 1)
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
                  "onUpdate:modelValue": ($event) => departmentFilter.value = $event,
                  class: "rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 py-2.5 px-4 text-sm text-gray-700 dark:text-gray-300"
                }, [
                  createVNode("option", { value: "all" }, toDisplayString(unref(t)("persons.department")) + ": " + toDisplayString(unref(t)("common.all")), 1),
                  (openBlock(true), createBlock(Fragment, null, renderList(departments.value, (dept) => {
                    return openBlock(), createBlock("option", {
                      key: dept,
                      value: dept
                    }, toDisplayString(dept), 9, ["value"]);
                  }), 128))
                ], 8, ["onUpdate:modelValue"]), [
                  [vModelSelect, departmentFilter.value]
                ]),
                searchQuery.value || departmentFilter.value !== "all" ? (openBlock(), createBlock("button", {
                  key: 0,
                  onClick: clearFilters,
                  class: "rounded-xl border border-gray-200 dark:border-gray-600 px-4 py-2.5 text-sm text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                }, toDisplayString(unref(t)("common.clear_filters")), 1)) : createCommentVNode("", true)
              ]),
              !((_b = __props.people) == null ? void 0 : _b.length) ? (openBlock(), createBlock("div", {
                key: 0,
                class: "rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-16 text-center"
              }, [
                createVNode("p", { class: "text-gray-500 dark:text-gray-400" }, toDisplayString(unref(t)("persons.no_persons")), 1)
              ])) : !filteredPeople.value.length ? (openBlock(), createBlock("div", {
                key: 1,
                class: "rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-12 text-center"
              }, [
                createVNode("p", { class: "text-gray-500 dark:text-gray-400" }, toDisplayString(unref(t)("common.no_results")), 1)
              ])) : (openBlock(), createBlock("div", {
                key: 2,
                class: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
              }, [
                (openBlock(true), createBlock(Fragment, null, renderList(filteredPeople.value, (person) => {
                  var _a2;
                  return openBlock(), createBlock("div", {
                    key: person.id,
                    class: "rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 shadow-sm hover:shadow-lg transition-all"
                  }, [
                    createVNode("div", { class: "flex items-center gap-3 mb-3" }, [
                      person.avatar ? (openBlock(), createBlock("img", {
                        key: 0,
                        src: "/storage/" + person.avatar,
                        alt: person.full_name,
                        class: "h-10 w-10 rounded-full object-cover"
                      }, null, 8, ["src", "alt"])) : (openBlock(), createBlock("div", {
                        key: 1,
                        class: "flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-sm font-bold text-indigo-600 dark:text-indigo-400"
                      }, toDisplayString(person.first_name.charAt(0)) + toDisplayString(person.last_name.charAt(0)), 1)),
                      createVNode("div", null, [
                        createVNode("h3", { class: "font-semibold text-gray-900 dark:text-white" }, toDisplayString(person.full_name), 1),
                        person.title ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "text-xs text-gray-500 dark:text-gray-400"
                        }, toDisplayString(person.title), 1)) : createCommentVNode("", true)
                      ])
                    ]),
                    createVNode("div", { class: "space-y-1 text-sm text-gray-500 dark:text-gray-400 mb-3" }, [
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
                          class: "inline-flex rounded-full bg-purple-50 dark:bg-purple-900/30 px-2.5 py-0.5 text-xs font-medium text-purple-700 dark:text-purple-400"
                        }, toDisplayString(role.name), 1);
                      }), 128))
                    ])) : createCommentVNode("", true),
                    createVNode("div", { class: "flex gap-2 pt-3 border-t border-gray-50 dark:border-gray-700" }, [
                      createVNode(unref(Link), {
                        href: _ctx.route("organizations.persons.edit", [__props.organization.id, person.id]),
                        class: "flex-1 rounded-lg border border-gray-200 dark:border-gray-600 py-2 text-center text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(unref(t)("common.edit")), 1)
                        ]),
                        _: 1
                      }, 8, ["href"]),
                      createVNode("button", {
                        onClick: ($event) => destroy(__props.organization, person),
                        class: "rounded-lg border border-red-200 dark:border-red-800 px-3 py-2 text-xs text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 transition"
                      }, toDisplayString(unref(t)("common.delete")), 9, ["onClick"])
                    ])
                  ]);
                }), 128))
              ])),
              (openBlock(), createBlock(Teleport, { to: "body" }, [
                showImportModal.value ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "fixed inset-0 z-[100] flex items-center justify-center bg-black/50",
                  onClick: withModifiers(($event) => showImportModal.value = false, ["self"])
                }, [
                  createVNode("div", { class: "rounded-2xl bg-white dark:bg-gray-800 p-6 w-full max-w-md shadow-xl" }, [
                    createVNode("h3", { class: "text-lg font-semibold text-gray-900 dark:text-white mb-4" }, toDisplayString(unref(t)("import_export.import_people")), 1),
                    createVNode("input", {
                      type: "file",
                      accept: ".csv,.txt",
                      onChange: ($event) => importFile.value = $event.target.files[0],
                      class: "w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:rounded-lg file:border-0 file:bg-indigo-50 dark:file:bg-indigo-900/30 file:px-4 file:py-2 file:text-sm file:font-medium file:text-indigo-700 dark:file:text-indigo-400"
                    }, null, 40, ["onChange"]),
                    createVNode("p", { class: "text-xs text-gray-400 mt-2 mb-4" }, "CSV: First Name, Last Name, Email, Phone, Job Title, Department"),
                    createVNode("div", { class: "flex gap-3 justify-end" }, [
                      createVNode("button", {
                        onClick: ($event) => showImportModal.value = false,
                        class: "rounded-xl border border-gray-200 dark:border-gray-600 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                      }, toDisplayString(unref(t)("common.cancel")), 9, ["onClick"]),
                      createVNode("button", {
                        onClick: importPeople,
                        disabled: !importFile.value,
                        class: "rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50 transition"
                      }, toDisplayString(unref(t)("import_export.import")), 9, ["disabled"])
                    ])
                  ])
                ], 8, ["onClick"])) : createCommentVNode("", true)
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
