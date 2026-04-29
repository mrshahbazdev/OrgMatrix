<script setup>
import { Head, Link, useForm } from '@inertiajs/vue3';
import { useI18n } from 'vue-i18n';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';

const { t } = useI18n();
const props = defineProps({ organization: Object });

const form = useForm({
    name: props.organization.name,
    description: props.organization.description || '',
    industry: props.organization.industry || '',
});

const submit = () => form.put(route('organizations.update', props.organization.id));
</script>

<template>
    <AuthenticatedLayout>
        <template #header>
            <h1 class="text-xl font-semibold text-gray-900">{{ t('organizations.edit') }}</h1>
        </template>
        <Head :title="t('organizations.edit')" />

        <div class="mx-auto max-w-2xl">
            <div class="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
                <form @submit.prevent="submit" class="space-y-6">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1.5">{{ t('organizations.name') }} *</label>
                        <input v-model="form.name" type="text" required class="block w-full rounded-xl border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:border-indigo-500 focus:bg-white focus:ring-indigo-500 transition" />
                        <p v-if="form.errors.name" class="mt-1.5 text-xs text-red-600">{{ form.errors.name }}</p>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1.5">{{ t('organizations.description') }}</label>
                        <textarea v-model="form.description" rows="3" class="block w-full rounded-xl border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:border-indigo-500 focus:bg-white focus:ring-indigo-500 transition"></textarea>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1.5">{{ t('organizations.industry') }}</label>
                        <input v-model="form.industry" type="text" class="block w-full rounded-xl border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:border-indigo-500 focus:bg-white focus:ring-indigo-500 transition" />
                    </div>
                    <div class="flex gap-3 pt-4">
                        <button type="submit" :disabled="form.processing" class="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 transition disabled:opacity-50">{{ t('common.save') }}</button>
                        <Link :href="route('organizations.show', organization.id)" class="rounded-xl border border-gray-200 px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition">{{ t('common.cancel') }}</Link>
                    </div>
                </form>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
