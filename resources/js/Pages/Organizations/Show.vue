<script setup>
import { Head, Link } from '@inertiajs/vue3';
import { useI18n } from 'vue-i18n';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';

const { t } = useI18n();
defineProps({ organization: Object, stats: Object });
</script>

<template>
    <AuthenticatedLayout>
        <template #header>
            <h1 class="text-xl font-semibold text-gray-900">{{ organization.name }}</h1>
        </template>
        <Head :title="organization.name" />

        <!-- Stats -->
        <div class="grid grid-cols-2 gap-4 mb-8 lg:grid-cols-4">
            <div class="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                <p class="text-sm text-gray-500">{{ t('organizations.roles_count') }}</p>
                <p class="mt-1 text-3xl font-bold text-gray-900">{{ stats.total_roles }}</p>
            </div>
            <div class="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                <p class="text-sm text-gray-500">{{ t('organizations.people_count') }}</p>
                <p class="mt-1 text-3xl font-bold text-gray-900">{{ stats.total_people }}</p>
            </div>
            <div class="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                <p class="text-sm text-gray-500">{{ t('organizations.active_roles') }}</p>
                <p class="mt-1 text-3xl font-bold text-emerald-600">{{ stats.active_roles }}</p>
            </div>
            <div class="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                <p class="text-sm text-gray-500">{{ t('organizations.unassigned') }}</p>
                <p class="mt-1 text-3xl font-bold" :class="stats.unassigned_roles > 0 ? 'text-amber-600' : 'text-gray-900'">{{ stats.unassigned_roles }}</p>
            </div>
        </div>

        <!-- Quick Actions -->
        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            <Link :href="route('organizations.roles.index', organization.id)" class="flex items-center gap-3 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm hover:shadow-lg hover:border-indigo-100 transition-all">
                <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50">
                    <svg class="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </div>
                <div>
                    <p class="font-semibold text-gray-900">{{ t('nav.roles') }}</p>
                    <p class="text-xs text-gray-500">{{ stats.total_roles }} {{ t('organizations.roles_count') }}</p>
                </div>
            </Link>
            <Link :href="route('organizations.persons.index', organization.id)" class="flex items-center gap-3 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm hover:shadow-lg hover:border-indigo-100 transition-all">
                <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50">
                    <svg class="h-5 w-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </div>
                <div>
                    <p class="font-semibold text-gray-900">{{ t('nav.persons') }}</p>
                    <p class="text-xs text-gray-500">{{ stats.total_people }} {{ t('organizations.people_count') }}</p>
                </div>
            </Link>
            <Link :href="route('organizations.chart', organization.id)" class="flex items-center gap-3 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm hover:shadow-lg hover:border-indigo-100 transition-all">
                <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50">
                    <svg class="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                </div>
                <div>
                    <p class="font-semibold text-gray-900">{{ t('nav.orgChart') }}</p>
                    <p class="text-xs text-gray-500">{{ t('dashboard.view_chart') }}</p>
                </div>
            </Link>
            <Link :href="route('organizations.edit', organization.id)" class="flex items-center gap-3 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm hover:shadow-lg hover:border-indigo-100 transition-all">
                <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100">
                    <svg class="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </div>
                <div>
                    <p class="font-semibold text-gray-900">{{ t('common.edit') }}</p>
                    <p class="text-xs text-gray-500">{{ t('organizations.edit') }}</p>
                </div>
            </Link>
        </div>
    </AuthenticatedLayout>
</template>
