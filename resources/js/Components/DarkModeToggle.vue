<script setup>
import { ref, onMounted, watch } from 'vue';

const isDark = ref(false);

onMounted(() => {
    isDark.value = localStorage.getItem('darkMode') === 'true' ||
        (!localStorage.getItem('darkMode') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    applyTheme();
});

watch(isDark, () => {
    localStorage.setItem('darkMode', isDark.value);
    applyTheme();
});

const applyTheme = () => {
    document.documentElement.classList.toggle('dark', isDark.value);
};

const toggle = () => {
    isDark.value = !isDark.value;
};
</script>

<template>
    <button
        @click="toggle"
        class="flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-200 hover:scale-105"
        :class="isDark ? 'bg-yellow-500/20 text-yellow-400' : 'bg-indigo-100 text-indigo-600 dark:bg-gray-700 dark:text-gray-300'"
    >
        <svg v-if="isDark" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
        <svg v-else class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
    </button>
</template>
