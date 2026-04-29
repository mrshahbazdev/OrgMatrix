<script setup>
import { Head, Link, router } from '@inertiajs/vue3';
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';

const { t } = useI18n();
const props = defineProps({ organization: Object, roles: Array });

const searchQuery = ref('');
const criticalityFilter = ref('all');
const coverageFilter = ref('all');

const filteredRoles = computed(() => {
    let result = props.roles || [];

    if (searchQuery.value) {
        const q = searchQuery.value.toLowerCase();
        result = result.filter(r =>
            r.name.toLowerCase().includes(q) ||
            (r.department && r.department.toLowerCase().includes(q)) ||
            (r.parent?.name && r.parent.name.toLowerCase().includes(q))
        );
    }

    if (criticalityFilter.value !== 'all') {
        result = result.filter(r => r.criticality === criticalityFilter.value);
    }

    if (coverageFilter.value === 'vacant') {
        result = result.filter(r => !r.assignments?.length);
    } else if (coverageFilter.value === 'filled') {
        result = result.filter(r => r.assignments?.length > 0);
    }

    return result;
});

const criticalityColors = {
    low: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300',
    medium: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    high: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
    critical: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
};

const destroy = (org, role) => {
    if (confirm(t('roles.delete_confirm'))) {
        router.delete(route('organizations.roles.destroy', [org.id, role.id]));
    }
};

const isAtRisk = (role) => {
    return !role.assignments?.length && ['high', 'critical'].includes(role.criticality);
};

const clearFilters = () => {
    searchQuery.value = '';
    criticalityFilter.value = 'all';
    coverageFilter.value = 'all';
};
</script>

<template>
    <AuthenticatedLayout>
        <template #header>
            <div class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <Link :href="route('organizations.show', organization.id)" class="hover:text-indigo-600">{{ organization.name }}</Link>
                <span>/</span>
                <span class="text-gray-900 dark:text-white font-semibold">{{ t('roles.title') }}</span>
            </div>
        </template>
        <Head :title="t('roles.title')" />

        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white">{{ t('roles.title') }}</h2>
            <div class="flex flex-wrap gap-2">
                <a :href="route('organizations.export.roles', organization.id)" class="rounded-xl border border-gray-200 dark:border-gray-600 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                    {{ t('import_export.export_roles') }}
                </a>
                <Link :href="route('organizations.roles.create', organization.id)" class="rounded-xl bg-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 transition">
                    {{ t('roles.create') }}
                </Link>
            </div>
        </div>

        <!-- Search & Filters -->
        <div class="flex flex-col sm:flex-row gap-3 mb-4">
            <div class="relative flex-1">
                <svg class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                <input v-model="searchQuery" type="text" :placeholder="t('common.search')" class="w-full rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 py-2.5 pl-10 pr-4 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500" />
            </div>
            <select v-model="criticalityFilter" class="rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 py-2.5 px-4 text-sm text-gray-700 dark:text-gray-300">
                <option value="all">{{ t('roles.criticality') }}: {{ t('common.all') }}</option>
                <option value="low">{{ t('roles.low') }}</option>
                <option value="medium">{{ t('roles.medium') }}</option>
                <option value="high">{{ t('roles.high') }}</option>
                <option value="critical">{{ t('roles.critical') }}</option>
            </select>
            <select v-model="coverageFilter" class="rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 py-2.5 px-4 text-sm text-gray-700 dark:text-gray-300">
                <option value="all">{{ t('roles.coverage') }}: {{ t('common.all') }}</option>
                <option value="filled">{{ t('dashboard.filled') }}</option>
                <option value="vacant">{{ t('dashboard.vacant') }}</option>
            </select>
            <button v-if="searchQuery || criticalityFilter !== 'all' || coverageFilter !== 'all'" @click="clearFilters" class="rounded-xl border border-gray-200 dark:border-gray-600 px-4 py-2.5 text-sm text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                {{ t('common.clear_filters') }}
            </button>
        </div>

        <div v-if="!roles?.length" class="rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-16 text-center">
            <p class="text-gray-500 dark:text-gray-400">{{ t('roles.no_roles') }}</p>
        </div>

        <div v-else-if="!filteredRoles.length" class="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-12 text-center">
            <p class="text-gray-500 dark:text-gray-400">{{ t('common.no_results') }}</p>
        </div>

        <div v-else class="overflow-x-auto rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">
            <table class="min-w-full divide-y divide-gray-100 dark:divide-gray-700">
                <thead class="bg-gray-50 dark:bg-gray-700/50">
                    <tr>
                        <th class="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">{{ t('roles.name') }}</th>
                        <th class="hidden sm:table-cell px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">{{ t('roles.department') }}</th>
                        <th class="hidden md:table-cell px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">{{ t('roles.parent_role') }}</th>
                        <th class="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">{{ t('roles.criticality') }}</th>
                        <th class="hidden lg:table-cell px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">{{ t('roles.assigned_to') }}</th>
                        <th class="px-6 py-3.5 text-right text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">{{ t('common.actions') }}</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-50 dark:divide-gray-700">
                    <tr v-for="role in filteredRoles" :key="role.id" class="hover:bg-gray-50/50 dark:hover:bg-gray-700/30 transition" :class="isAtRisk(role) ? 'bg-red-50/30 dark:bg-red-900/10' : ''">
                        <td class="px-6 py-4">
                            <div class="flex items-center gap-2">
                                <span class="font-medium text-gray-900 dark:text-white">{{ role.name }}</span>
                                <span v-if="isAtRisk(role)" class="inline-flex items-center gap-1 rounded-full bg-red-100 dark:bg-red-900/30 px-2 py-0.5 text-xs font-medium text-red-700 dark:text-red-400">
                                    <svg class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                    {{ t('roles.at_risk') }}
                                </span>
                            </div>
                        </td>
                        <td class="hidden sm:table-cell px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{{ role.department || '—' }}</td>
                        <td class="hidden md:table-cell px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{{ role.parent?.name || t('roles.none') }}</td>
                        <td class="px-6 py-4">
                            <span :class="['inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium', criticalityColors[role.criticality]]">
                                {{ t(`roles.${role.criticality}`) }}
                            </span>
                        </td>
                        <td class="hidden lg:table-cell px-6 py-4">
                            <div v-if="role.assignments?.length" class="flex flex-wrap gap-1">
                                <span v-for="a in role.assignments" :key="a.id" :class="['inline-flex items-center rounded-full px-2.5 py-0.5 text-xs', a.is_primary ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 font-medium' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400']">
                                    {{ a.person?.full_name }}
                                    <span v-if="a.is_primary" class="ml-1 text-indigo-500">*</span>
                                </span>
                            </div>
                            <span v-else class="text-sm text-amber-600 dark:text-amber-400">{{ t('chart.vacant') }}</span>
                        </td>
                        <td class="px-6 py-4 text-right">
                            <div class="flex items-center justify-end gap-2">
                                <Link :href="route('organizations.roles.assign', [organization.id, role.id])" class="rounded-lg bg-emerald-50 dark:bg-emerald-900/30 px-3 py-1.5 text-xs font-medium text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition">
                                    {{ t('roles.assign_person') }}
                                </Link>
                                <Link :href="route('organizations.roles.edit', [organization.id, role.id])" class="rounded-lg bg-gray-100 dark:bg-gray-700 px-3 py-1.5 text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition">
                                    {{ t('common.edit') }}
                                </Link>
                                <button @click="destroy(organization, role)" class="rounded-lg bg-red-50 dark:bg-red-900/30 px-3 py-1.5 text-xs font-medium text-red-700 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/50 transition">
                                    {{ t('common.delete') }}
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </AuthenticatedLayout>
</template>
