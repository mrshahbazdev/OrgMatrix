<script setup>
import { Head, Link, useForm } from '@inertiajs/vue3';
import { useI18n } from 'vue-i18n';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';

const { t } = useI18n();
const props = defineProps({ organization: Object });

const form = useForm({
    first_name: '', last_name: '', email: '', phone: '', title: '', department: '', notes: '',
});

const submit = () => form.post(route('organizations.persons.store', props.organization.id));
</script>

<template>
    <AuthenticatedLayout>
        <template #header><h1 class="text-xl font-semibold text-gray-900">{{ t('persons.create') }}</h1></template>
        <Head :title="t('persons.create')" />

        <div class="mx-auto max-w-2xl">
            <div class="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
                <form @submit.prevent="submit" class="space-y-6">
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1.5">{{ t('persons.first_name') }} *</label>
                            <input v-model="form.first_name" type="text" required class="block w-full rounded-xl border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:border-indigo-500 focus:bg-white focus:ring-indigo-500 transition" />
                            <p v-if="form.errors.first_name" class="mt-1.5 text-xs text-red-600">{{ form.errors.first_name }}</p>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1.5">{{ t('persons.last_name') }} *</label>
                            <input v-model="form.last_name" type="text" required class="block w-full rounded-xl border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:border-indigo-500 focus:bg-white focus:ring-indigo-500 transition" />
                            <p v-if="form.errors.last_name" class="mt-1.5 text-xs text-red-600">{{ form.errors.last_name }}</p>
                        </div>
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1.5">{{ t('persons.email') }}</label>
                            <input v-model="form.email" type="email" class="block w-full rounded-xl border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:border-indigo-500 focus:bg-white focus:ring-indigo-500 transition" />
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1.5">{{ t('persons.phone') }}</label>
                            <input v-model="form.phone" type="text" class="block w-full rounded-xl border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:border-indigo-500 focus:bg-white focus:ring-indigo-500 transition" />
                        </div>
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1.5">{{ t('persons.job_title') }}</label>
                            <input v-model="form.title" type="text" class="block w-full rounded-xl border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:border-indigo-500 focus:bg-white focus:ring-indigo-500 transition" />
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1.5">{{ t('persons.department') }}</label>
                            <input v-model="form.department" type="text" class="block w-full rounded-xl border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:border-indigo-500 focus:bg-white focus:ring-indigo-500 transition" />
                        </div>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1.5">{{ t('persons.notes') }}</label>
                        <textarea v-model="form.notes" rows="3" class="block w-full rounded-xl border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:border-indigo-500 focus:bg-white focus:ring-indigo-500 transition"></textarea>
                    </div>
                    <div class="flex gap-3 pt-4">
                        <button type="submit" :disabled="form.processing" class="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 transition disabled:opacity-50">{{ t('common.create') }}</button>
                        <Link :href="route('organizations.persons.index', organization.id)" class="rounded-xl border border-gray-200 px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition">{{ t('common.cancel') }}</Link>
                    </div>
                </form>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
