<script setup>
import { Head, Link, router } from '@inertiajs/vue3';
import { useI18n } from 'vue-i18n';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';

const { t } = useI18n();
defineProps({ organizations: Array });

const destroy = (org) => {
    if (confirm(t('organizations.delete_confirm'))) {
        router.delete(route('organizations.destroy', org.id));
    }
};
</script>

<template>
    <AuthenticatedLayout>
        <template #header>
            <h1 class="text-xl font-semibold text-gray-900">{{ t('organizations.title') }}</h1>
        </template>
        <Head :title="t('organizations.title')" />

        <div class="flex items-center justify-between mb-6">
            <h2 class="text-2xl font-bold text-gray-900">{{ t('organizations.title') }}</h2>
            <Link :href="route('organizations.create')" class="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 transition">
                {{ t('organizations.create') }}
            </Link>
        </div>

        <div v-if="!organizations?.length" class="rounded-2xl border-2 border-dashed border-gray-200 bg-white p-16 text-center">
            <p class="text-gray-500">{{ t('organizations.no_orgs') }}</p>
        </div>

        <div v-else class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div v-for="org in organizations" :key="org.id" class="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-lg transition-all">
                <div class="flex items-center gap-3 mb-3">
                    <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 font-bold text-indigo-600">{{ org.name.charAt(0) }}</div>
                    <div>
                        <h3 class="font-semibold text-gray-900">{{ org.name }}</h3>
                        <p v-if="org.industry" class="text-xs text-gray-500">{{ org.industry }}</p>
                    </div>
                </div>
                <p v-if="org.description" class="text-sm text-gray-500 mb-4 line-clamp-2">{{ org.description }}</p>
                <div class="flex gap-4 text-sm text-gray-500 mb-4">
                    <span>{{ org.roles_count }} {{ t('organizations.roles_count') }}</span>
                    <span>{{ org.people_count }} {{ t('organizations.people_count') }}</span>
                </div>
                <div class="flex gap-2">
                    <Link :href="route('organizations.show', org.id)" class="flex-1 rounded-lg border border-gray-200 py-2 text-center text-sm font-medium text-gray-700 hover:bg-gray-50 transition">
                        {{ t('dashboard.manage') }}
                    </Link>
                    <Link :href="route('organizations.edit', org.id)" class="rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-500 hover:bg-gray-50 transition">
                        {{ t('common.edit') }}
                    </Link>
                    <button @click="destroy(org)" class="rounded-lg border border-red-200 px-3 py-2 text-sm text-red-500 hover:bg-red-50 transition">
                        {{ t('common.delete') }}
                    </button>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
