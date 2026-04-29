<script setup>
import { Head, Link, router } from '@inertiajs/vue3';
import { useI18n } from 'vue-i18n';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';

const { t } = useI18n();
defineProps({ organization: Object, roles: Array });

const criticalityColors = {
    low: 'bg-gray-100 text-gray-700',
    medium: 'bg-blue-100 text-blue-700',
    high: 'bg-orange-100 text-orange-700',
    critical: 'bg-red-100 text-red-700',
};

const destroy = (org, role) => {
    if (confirm(t('roles.delete_confirm'))) {
        router.delete(route('organizations.roles.destroy', [org.id, role.id]));
    }
};
</script>

<template>
    <AuthenticatedLayout>
        <template #header>
            <div class="flex items-center gap-2 text-sm text-gray-500">
                <Link :href="route('organizations.show', organization.id)" class="hover:text-indigo-600">{{ organization.name }}</Link>
                <span>/</span>
                <span class="text-gray-900 font-semibold">{{ t('roles.title') }}</span>
            </div>
        </template>
        <Head :title="t('roles.title')" />

        <div class="flex items-center justify-between mb-6">
            <h2 class="text-2xl font-bold text-gray-900">{{ t('roles.title') }}</h2>
            <Link :href="route('organizations.roles.create', organization.id)" class="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 transition">
                {{ t('roles.create') }}
            </Link>
        </div>

        <div v-if="!roles?.length" class="rounded-2xl border-2 border-dashed border-gray-200 bg-white p-16 text-center">
            <p class="text-gray-500">{{ t('roles.no_roles') }}</p>
        </div>

        <div v-else class="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
            <table class="min-w-full divide-y divide-gray-100">
                <thead class="bg-gray-50">
                    <tr>
                        <th class="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">{{ t('roles.name') }}</th>
                        <th class="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">{{ t('roles.department') }}</th>
                        <th class="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">{{ t('roles.parent_role') }}</th>
                        <th class="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">{{ t('roles.criticality') }}</th>
                        <th class="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">{{ t('roles.assigned_to') }}</th>
                        <th class="px-6 py-3.5 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">{{ t('common.actions') }}</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-50">
                    <tr v-for="role in roles" :key="role.id" class="hover:bg-gray-50/50 transition">
                        <td class="px-6 py-4">
                            <span class="font-medium text-gray-900">{{ role.name }}</span>
                        </td>
                        <td class="px-6 py-4 text-sm text-gray-500">{{ role.department || '—' }}</td>
                        <td class="px-6 py-4 text-sm text-gray-500">{{ role.parent?.name || t('roles.none') }}</td>
                        <td class="px-6 py-4">
                            <span :class="['inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium', criticalityColors[role.criticality]]">
                                {{ t(`roles.${role.criticality}`) }}
                            </span>
                        </td>
                        <td class="px-6 py-4">
                            <div v-if="role.assignments?.length" class="flex flex-wrap gap-1">
                                <span v-for="a in role.assignments" :key="a.id" :class="['inline-flex items-center rounded-full px-2.5 py-0.5 text-xs', a.is_primary ? 'bg-indigo-100 text-indigo-700 font-medium' : 'bg-gray-100 text-gray-600']">
                                    {{ a.person?.full_name }}
                                    <span v-if="a.is_primary" class="ml-1 text-indigo-500">*</span>
                                </span>
                            </div>
                            <span v-else class="text-sm text-amber-600">{{ t('chart.vacant') }}</span>
                        </td>
                        <td class="px-6 py-4 text-right">
                            <div class="flex items-center justify-end gap-2">
                                <Link :href="route('organizations.roles.assign', [organization.id, role.id])" class="rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700 hover:bg-emerald-100 transition">
                                    {{ t('roles.assign_person') }}
                                </Link>
                                <Link :href="route('organizations.roles.edit', [organization.id, role.id])" class="rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-200 transition">
                                    {{ t('common.edit') }}
                                </Link>
                                <button @click="destroy(organization, role)" class="rounded-lg bg-red-50 px-3 py-1.5 text-xs font-medium text-red-700 hover:bg-red-100 transition">
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
