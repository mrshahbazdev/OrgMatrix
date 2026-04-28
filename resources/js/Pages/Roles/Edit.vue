<script setup>
import { Head, Link, useForm } from '@inertiajs/vue3';
import { useI18n } from 'vue-i18n';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';

const { t } = useI18n();
const props = defineProps({ organization: Object, role: Object, parentRoles: Array });

const form = useForm({
    name: props.role.name,
    description: props.role.description || '',
    department: props.role.department || '',
    parent_role_id: props.role.parent_role_id || '',
    criticality: props.role.criticality,
    is_active: props.role.is_active,
});

const submit = () => form.put(route('organizations.roles.update', [props.organization.id, props.role.id]));
</script>

<template>
    <AuthenticatedLayout>
        <template #header><h1 class="text-xl font-semibold text-gray-900">{{ t('roles.edit') }}</h1></template>
        <Head :title="t('roles.edit')" />

        <div class="mx-auto max-w-2xl">
            <div class="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
                <form @submit.prevent="submit" class="space-y-6">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1.5">{{ t('roles.name') }} *</label>
                        <input v-model="form.name" type="text" required class="block w-full rounded-xl border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:border-indigo-500 focus:bg-white focus:ring-indigo-500 transition" />
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1.5">{{ t('roles.description') }}</label>
                        <textarea v-model="form.description" rows="3" class="block w-full rounded-xl border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:border-indigo-500 focus:bg-white focus:ring-indigo-500 transition"></textarea>
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1.5">{{ t('roles.department') }}</label>
                            <input v-model="form.department" type="text" class="block w-full rounded-xl border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:border-indigo-500 focus:bg-white focus:ring-indigo-500 transition" />
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1.5">{{ t('roles.criticality') }}</label>
                            <select v-model="form.criticality" class="block w-full rounded-xl border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:border-indigo-500 focus:bg-white focus:ring-indigo-500 transition">
                                <option value="low">{{ t('roles.low') }}</option>
                                <option value="medium">{{ t('roles.medium') }}</option>
                                <option value="high">{{ t('roles.high') }}</option>
                                <option value="critical">{{ t('roles.critical') }}</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1.5">{{ t('roles.parent_role') }}</label>
                        <select v-model="form.parent_role_id" class="block w-full rounded-xl border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:border-indigo-500 focus:bg-white focus:ring-indigo-500 transition">
                            <option value="">{{ t('roles.none') }}</option>
                            <option v-for="r in parentRoles" :key="r.id" :value="r.id">{{ r.name }}</option>
                        </select>
                    </div>
                    <label class="flex items-center gap-2">
                        <input v-model="form.is_active" type="checkbox" class="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                        <span class="text-sm text-gray-700">{{ t('roles.is_active') }}</span>
                    </label>
                    <div class="flex gap-3 pt-4">
                        <button type="submit" :disabled="form.processing" class="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 transition disabled:opacity-50">{{ t('common.save') }}</button>
                        <Link :href="route('organizations.roles.index', organization.id)" class="rounded-xl border border-gray-200 px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition">{{ t('common.cancel') }}</Link>
                    </div>
                </form>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
