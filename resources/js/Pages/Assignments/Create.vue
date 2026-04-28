<script setup>
import { Head, Link, useForm, router } from '@inertiajs/vue3';
import { useI18n } from 'vue-i18n';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';

const { t } = useI18n();
const props = defineProps({ organization: Object, role: Object, availablePeople: Array });

const form = useForm({
    person_id: '',
    is_primary: false,
    start_date: '',
    end_date: '',
    notes: '',
});

const submit = () => form.post(route('organizations.roles.assign.store', [props.organization.id, props.role.id]));

const removeAssignment = (assignment) => {
    router.delete(route('organizations.roles.assign.destroy', [props.organization.id, props.role.id, assignment.id]));
};
</script>

<template>
    <AuthenticatedLayout>
        <template #header><h1 class="text-xl font-semibold text-gray-900">{{ t('assignments.title') }}: {{ role.name }}</h1></template>
        <Head :title="t('assignments.title')" />

        <div class="mx-auto max-w-2xl space-y-6">
            <!-- Current Assignments -->
            <div v-if="role.assignments?.length" class="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <h3 class="text-lg font-semibold text-gray-900 mb-4">{{ t('assignments.current') }}</h3>
                <div class="space-y-2">
                    <div v-for="a in role.assignments" :key="a.id" class="flex items-center justify-between rounded-xl bg-gray-50 p-3">
                        <div class="flex items-center gap-3">
                            <div class="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-600">
                                {{ a.person?.first_name?.charAt(0) }}{{ a.person?.last_name?.charAt(0) }}
                            </div>
                            <div>
                                <span class="text-sm font-medium text-gray-900">{{ a.person?.full_name }}</span>
                                <span v-if="a.is_primary" class="ml-2 rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-medium text-indigo-700">{{ t('roles.primary') }}</span>
                            </div>
                        </div>
                        <button @click="removeAssignment(a)" class="text-sm text-red-600 hover:text-red-700">{{ t('common.delete') }}</button>
                    </div>
                </div>
            </div>

            <!-- Add New Assignment -->
            <div class="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
                <h3 class="text-lg font-semibold text-gray-900 mb-6">{{ t('roles.assign_person') }}</h3>

                <div v-if="!availablePeople?.length" class="text-center py-8 text-gray-500">{{ t('assignments.no_people') }}</div>

                <form v-else @submit.prevent="submit" class="space-y-6">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1.5">{{ t('assignments.select_person') }} *</label>
                        <select v-model="form.person_id" required class="block w-full rounded-xl border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:border-indigo-500 focus:bg-white focus:ring-indigo-500 transition">
                            <option value="">{{ t('assignments.select_person') }}</option>
                            <option v-for="p in availablePeople" :key="p.id" :value="p.id">{{ p.full_name }}</option>
                        </select>
                    </div>
                    <label class="flex items-center gap-2">
                        <input v-model="form.is_primary" type="checkbox" class="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                        <span class="text-sm text-gray-700">{{ t('assignments.is_primary') }}</span>
                    </label>
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1.5">{{ t('assignments.start_date') }}</label>
                            <input v-model="form.start_date" type="date" class="block w-full rounded-xl border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:border-indigo-500 focus:bg-white focus:ring-indigo-500 transition" />
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1.5">{{ t('assignments.end_date') }}</label>
                            <input v-model="form.end_date" type="date" class="block w-full rounded-xl border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:border-indigo-500 focus:bg-white focus:ring-indigo-500 transition" />
                        </div>
                    </div>
                    <div class="flex gap-3 pt-4">
                        <button type="submit" :disabled="form.processing" class="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 transition disabled:opacity-50">{{ t('roles.assign_person') }}</button>
                        <Link :href="route('organizations.roles.index', organization.id)" class="rounded-xl border border-gray-200 px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition">{{ t('common.back') }}</Link>
                    </div>
                </form>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
