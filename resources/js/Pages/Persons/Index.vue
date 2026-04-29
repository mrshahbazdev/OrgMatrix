<script setup>
import { Head, Link, router } from '@inertiajs/vue3';
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';

const { t } = useI18n();
const props = defineProps({ organization: Object, people: Array });

const searchQuery = ref('');
const departmentFilter = ref('all');

const departments = computed(() => {
    const depts = new Set();
    (props.people || []).forEach(p => { if (p.department) depts.add(p.department); });
    return [...depts].sort();
});

const filteredPeople = computed(() => {
    let result = props.people || [];

    if (searchQuery.value) {
        const q = searchQuery.value.toLowerCase();
        result = result.filter(p =>
            p.full_name.toLowerCase().includes(q) ||
            (p.email && p.email.toLowerCase().includes(q)) ||
            (p.department && p.department.toLowerCase().includes(q)) ||
            (p.title && p.title.toLowerCase().includes(q))
        );
    }

    if (departmentFilter.value !== 'all') {
        result = result.filter(p => p.department === departmentFilter.value);
    }

    return result;
});

const destroy = (org, person) => {
    if (confirm(t('persons.delete_confirm'))) {
        router.delete(route('organizations.persons.destroy', [org.id, person.id]));
    }
};

const clearFilters = () => {
    searchQuery.value = '';
    departmentFilter.value = 'all';
};

const showImportModal = ref(false);
const importFile = ref(null);

const importPeople = () => {
    if (!importFile.value) return;
    const formData = new FormData();
    formData.append('csv_file', importFile.value);
    router.post(route('organizations.import.people', props.organization.id), formData);
    showImportModal.value = false;
    importFile.value = null;
};
</script>

<template>
    <AuthenticatedLayout>
        <template #header>
            <div class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <Link :href="route('organizations.show', organization.id)" class="hover:text-indigo-600">{{ organization.name }}</Link>
                <span>/</span>
                <span class="text-gray-900 dark:text-white font-semibold">{{ t('persons.title') }}</span>
            </div>
        </template>
        <Head :title="t('persons.title')" />

        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white">{{ t('persons.title') }}</h2>
            <div class="flex flex-wrap gap-2">
                <a :href="route('organizations.export.people', organization.id)" class="rounded-xl border border-gray-200 dark:border-gray-600 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                    {{ t('import_export.export_people') }}
                </a>
                <button @click="showImportModal = true" class="rounded-xl border border-gray-200 dark:border-gray-600 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                    {{ t('import_export.import_people') }}
                </button>
                <Link :href="route('organizations.persons.create', organization.id)" class="rounded-xl bg-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 transition">
                    {{ t('persons.create') }}
                </Link>
            </div>
        </div>

        <!-- Search & Filters -->
        <div class="flex flex-col sm:flex-row gap-3 mb-4">
            <div class="relative flex-1">
                <svg class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                <input v-model="searchQuery" type="text" :placeholder="t('common.search')" class="w-full rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 py-2.5 pl-10 pr-4 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500" />
            </div>
            <select v-model="departmentFilter" class="rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 py-2.5 px-4 text-sm text-gray-700 dark:text-gray-300">
                <option value="all">{{ t('persons.department') }}: {{ t('common.all') }}</option>
                <option v-for="dept in departments" :key="dept" :value="dept">{{ dept }}</option>
            </select>
            <button v-if="searchQuery || departmentFilter !== 'all'" @click="clearFilters" class="rounded-xl border border-gray-200 dark:border-gray-600 px-4 py-2.5 text-sm text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                {{ t('common.clear_filters') }}
            </button>
        </div>

        <div v-if="!people?.length" class="rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-16 text-center">
            <p class="text-gray-500 dark:text-gray-400">{{ t('persons.no_persons') }}</p>
        </div>

        <div v-else-if="!filteredPeople.length" class="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-12 text-center">
            <p class="text-gray-500 dark:text-gray-400">{{ t('common.no_results') }}</p>
        </div>

        <div v-else class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div v-for="person in filteredPeople" :key="person.id" class="rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 shadow-sm hover:shadow-lg transition-all">
                <div class="flex items-center gap-3 mb-3">
                    <img v-if="person.avatar" :src="'/storage/' + person.avatar" :alt="person.full_name" class="h-10 w-10 rounded-full object-cover" />
                    <div v-else class="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-sm font-bold text-indigo-600 dark:text-indigo-400">
                        {{ person.first_name.charAt(0) }}{{ person.last_name.charAt(0) }}
                    </div>
                    <div>
                        <h3 class="font-semibold text-gray-900 dark:text-white">{{ person.full_name }}</h3>
                        <p v-if="person.title" class="text-xs text-gray-500 dark:text-gray-400">{{ person.title }}</p>
                    </div>
                </div>
                <div class="space-y-1 text-sm text-gray-500 dark:text-gray-400 mb-3">
                    <p v-if="person.email">{{ person.email }}</p>
                    <p v-if="person.department">{{ person.department }}</p>
                </div>
                <div v-if="person.roles?.length" class="flex flex-wrap gap-1 mb-3">
                    <span v-for="role in person.roles" :key="role.id" class="inline-flex rounded-full bg-purple-50 dark:bg-purple-900/30 px-2.5 py-0.5 text-xs font-medium text-purple-700 dark:text-purple-400">
                        {{ role.name }}
                    </span>
                </div>
                <div class="flex gap-2 pt-3 border-t border-gray-50 dark:border-gray-700">
                    <Link :href="route('organizations.persons.edit', [organization.id, person.id])" class="flex-1 rounded-lg border border-gray-200 dark:border-gray-600 py-2 text-center text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                        {{ t('common.edit') }}
                    </Link>
                    <button @click="destroy(organization, person)" class="rounded-lg border border-red-200 dark:border-red-800 px-3 py-2 text-xs text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 transition">
                        {{ t('common.delete') }}
                    </button>
                </div>
            </div>
        </div>

        <!-- Import Modal -->
        <Teleport to="body">
            <div v-if="showImportModal" class="fixed inset-0 z-[100] flex items-center justify-center bg-black/50" @click.self="showImportModal = false">
                <div class="rounded-2xl bg-white dark:bg-gray-800 p-6 w-full max-w-md shadow-xl">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">{{ t('import_export.import_people') }}</h3>
                    <input type="file" accept=".csv,.txt" @change="importFile = $event.target.files[0]" class="w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:rounded-lg file:border-0 file:bg-indigo-50 dark:file:bg-indigo-900/30 file:px-4 file:py-2 file:text-sm file:font-medium file:text-indigo-700 dark:file:text-indigo-400" />
                    <p class="text-xs text-gray-400 mt-2 mb-4">CSV: First Name, Last Name, Email, Phone, Job Title, Department</p>
                    <div class="flex gap-3 justify-end">
                        <button @click="showImportModal = false" class="rounded-xl border border-gray-200 dark:border-gray-600 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                            {{ t('common.cancel') }}
                        </button>
                        <button @click="importPeople" :disabled="!importFile" class="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50 transition">
                            {{ t('import_export.import') }}
                        </button>
                    </div>
                </div>
            </div>
        </Teleport>
    </AuthenticatedLayout>
</template>
