<script setup>
import { Head } from '@inertiajs/vue3';
import { useI18n } from 'vue-i18n';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';

const { t } = useI18n();
defineProps({ logs: Array });

const actionColors = {
    created: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
    updated: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    deleted: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    assigned: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
    unassigned: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
    imported: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400',
};

const formatDate = (date) => new Date(date).toLocaleString();
</script>

<template>
    <AuthenticatedLayout>
        <template #header>
            <h1 class="text-xl font-semibold text-gray-900 dark:text-white">{{ t('activity.title') }}</h1>
        </template>
        <Head :title="t('activity.title')" />

        <div v-if="!logs?.length" class="rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-16 text-center">
            <p class="text-gray-500 dark:text-gray-400">{{ t('activity.no_activity') }}</p>
        </div>

        <div v-else class="rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm overflow-hidden">
            <div class="divide-y divide-gray-100 dark:divide-gray-700">
                <div v-for="log in logs" :key="log.id" class="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                    <span :class="['inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium capitalize', actionColors[log.action] || 'bg-gray-100 text-gray-700']">
                        {{ t(`activity.${log.action}`) }}
                    </span>
                    <div class="flex-1 min-w-0">
                        <p class="text-sm text-gray-900 dark:text-white">
                            <span class="font-medium">{{ log.subject_type }}</span>
                            <span v-if="log.subject_name" class="text-gray-500 dark:text-gray-400"> — {{ log.subject_name }}</span>
                        </p>
                        <p v-if="log.organization" class="text-xs text-gray-400 mt-0.5">{{ log.organization.name }}</p>
                    </div>
                    <span class="text-xs text-gray-400 flex-shrink-0">{{ formatDate(log.created_at) }}</span>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
