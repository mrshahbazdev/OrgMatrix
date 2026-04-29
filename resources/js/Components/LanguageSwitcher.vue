<script setup>
import { usePage, router } from '@inertiajs/vue3';
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();
const page = usePage();

const switchLocale = (lang) => {
    locale.value = lang;
    router.get(route('language.switch', lang), {}, { preserveState: true });
};
</script>

<template>
    <div class="flex items-center gap-1 rounded-lg bg-white/10 p-1">
        <button
            @click="switchLocale('en')"
            :class="[
                'px-2.5 py-1 text-xs font-semibold rounded-md transition-all duration-200',
                locale === 'en'
                    ? 'bg-white text-indigo-700 shadow-sm'
                    : 'text-gray-300 hover:text-white'
            ]"
        >
            EN
        </button>
        <button
            @click="switchLocale('de')"
            :class="[
                'px-2.5 py-1 text-xs font-semibold rounded-md transition-all duration-200',
                locale === 'de'
                    ? 'bg-white text-indigo-700 shadow-sm'
                    : 'text-gray-300 hover:text-white'
            ]"
        >
            DE
        </button>
    </div>
</template>
