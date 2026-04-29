import { mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderClass } from "vue/server-renderer";
import { usePage } from "@inertiajs/vue3";
import { useI18n } from "vue-i18n";
const _sfc_main = {
  __name: "LanguageSwitcher",
  __ssrInlineRender: true,
  setup(__props) {
    const { locale } = useI18n();
    usePage();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex items-center gap-1 rounded-lg bg-white/10 p-1" }, _attrs))}><button class="${ssrRenderClass([
        "px-2.5 py-1 text-xs font-semibold rounded-md transition-all duration-200",
        unref(locale) === "en" ? "bg-white text-indigo-700 shadow-sm" : "text-gray-300 hover:text-white"
      ])}"> EN </button><button class="${ssrRenderClass([
        "px-2.5 py-1 text-xs font-semibold rounded-md transition-all duration-200",
        unref(locale) === "de" ? "bg-white text-indigo-700 shadow-sm" : "text-gray-300 hover:text-white"
      ])}"> DE </button></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/LanguageSwitcher.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
