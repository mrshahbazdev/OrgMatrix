<script setup>
import { Head, Link, router } from '@inertiajs/vue3';
import { useI18n } from 'vue-i18n';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';

const { t } = useI18n();
defineProps({ organization: Object, people: Array });

const destroy = (org, person) => {
    if (confirm(t('persons.delete_confirm'))) {
        router.delete(route('organizations.persons.destroy', [org.id, person.id]));
    }
};
</script>

<template>
    <AuthenticatedLayout>
        <template #header>
            <div class="flex items-center gap-2 text-sm text-gray-500">
                <Link :href="route('organizations.show', organization.id)" class="hover:text-indigo-600">{{ organization.name }}</Link>
                <span>/</span>
                <span class="text-gray-900 font-semibold">{{ t('persons.title') }}</span>
            </div>
        </template>
        <Head :title="t('persons.title')" />

        <div class="flex items-center justify-between mb-6">
            <h2 class="text-2xl font-bold text-gray-900">{{ t('persons.title') }}</h2>
            <Link :href="route('organizations.persons.create', organization.id)" class="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 transition">
                {{ t('persons.create') }}
            </Link>
        </div>

        <div v-if="!people?.length" class="rounded-2xl border-2 border-dashed border-gray-200 bg-white p-16 text-center">
            <p class="text-gray-500">{{ t('persons.no_persons') }}</p>
        </div>

        <div v-else class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div v-for="person in people" :key="person.id" class="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm hover:shadow-lg transition-all">
                <div class="flex items-center gap-3 mb-3">
                    <div class="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-600">
                        {{ person.first_name.charAt(0) }}{{ person.last_name.charAt(0) }}
                    </div>
                    <div>
                        <h3 class="font-semibold text-gray-900">{{ person.full_name }}</h3>
                        <p v-if="person.title" class="text-xs text-gray-500">{{ person.title }}</p>
                    </div>
                </div>
                <div class="space-y-1 text-sm text-gray-500 mb-3">
                    <p v-if="person.email">{{ person.email }}</p>
                    <p v-if="person.department">{{ person.department }}</p>
                </div>
                <div v-if="person.roles?.length" class="flex flex-wrap gap-1 mb-3">
                    <span v-for="role in person.roles" :key="role.id" class="inline-flex rounded-full bg-purple-50 px-2.5 py-0.5 text-xs font-medium text-purple-700">
                        {{ role.name }}
                    </span>
                </div>
                <div class="flex gap-2 pt-3 border-t border-gray-50">
                    <Link :href="route('organizations.persons.edit', [organization.id, person.id])" class="flex-1 rounded-lg border border-gray-200 py-2 text-center text-xs font-medium text-gray-700 hover:bg-gray-50 transition">
                        {{ t('common.edit') }}
                    </Link>
                    <button @click="destroy(organization, person)" class="rounded-lg border border-red-200 px-3 py-2 text-xs text-red-600 hover:bg-red-50 transition">
                        {{ t('common.delete') }}
                    </button>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
