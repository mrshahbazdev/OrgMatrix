<script setup>
import { ref, watch, onMounted } from 'vue';
import { usePage } from '@inertiajs/vue3';

const page = usePage();
const toasts = ref([]);
let toastId = 0;

const addToast = (message, type = 'success') => {
    const id = ++toastId;
    toasts.value.push({ id, message, type, visible: true });
    setTimeout(() => removeToast(id), 5000);
};

const removeToast = (id) => {
    const idx = toasts.value.findIndex(t => t.id === id);
    if (idx !== -1) {
        toasts.value[idx].visible = false;
        setTimeout(() => {
            toasts.value = toasts.value.filter(t => t.id !== id);
        }, 300);
    }
};

watch(() => page.props.flash, (flash) => {
    if (flash?.success) addToast(flash.success, 'success');
    if (flash?.error) addToast(flash.error, 'error');
}, { deep: true, immediate: true });
</script>

<template>
    <Teleport to="body">
        <div class="fixed top-4 right-4 z-[100] flex flex-col gap-3 pointer-events-none">
            <Transition
                v-for="toast in toasts"
                :key="toast.id"
                enter-active-class="transform transition duration-300 ease-out"
                enter-from-class="translate-x-full opacity-0"
                enter-to-class="translate-x-0 opacity-100"
                leave-active-class="transform transition duration-200 ease-in"
                leave-from-class="translate-x-0 opacity-100"
                leave-to-class="translate-x-full opacity-0"
            >
                <div
                    v-if="toast.visible"
                    class="pointer-events-auto flex items-center gap-3 rounded-xl px-5 py-3.5 shadow-2xl backdrop-blur-sm min-w-[300px] max-w-[420px]"
                    :class="toast.type === 'success'
                        ? 'bg-emerald-500 text-white'
                        : 'bg-red-500 text-white'"
                >
                    <svg v-if="toast.type === 'success'" class="h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <svg v-else class="h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span class="text-sm font-medium flex-1">{{ toast.message }}</span>
                    <button @click="removeToast(toast.id)" class="flex-shrink-0 opacity-70 hover:opacity-100">
                        <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </Transition>
        </div>
    </Teleport>
</template>
