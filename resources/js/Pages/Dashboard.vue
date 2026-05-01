<script setup>
import { Head, Link } from '@inertiajs/vue3';
import { ref, onMounted, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { Doughnut, Bar } from 'vue-chartjs';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';

ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const { t } = useI18n();

const props = defineProps({
    organizations: Array,
    analytics: Object,
    recentActivity: Array,
});

const criticalityData = computed(() => ({
    labels: [t('roles.low'), t('roles.medium'), t('roles.high'), t('roles.critical')],
    datasets: [{
        data: [
            props.analytics?.criticality_breakdown?.low || 0,
            props.analytics?.criticality_breakdown?.medium || 0,
            props.analytics?.criticality_breakdown?.high || 0,
            props.analytics?.criticality_breakdown?.critical || 0,
        ],
        backgroundColor: ['#9ca3af', '#6366f1', '#f59e0b', '#ef4444'],
        borderWidth: 0,
    }],
}));

const coverageData = computed(() => ({
    labels: [t('dashboard.filled'), t('dashboard.vacant')],
    datasets: [{
        data: [
            props.analytics?.coverage?.filled || 0,
            props.analytics?.coverage?.vacant || 0,
        ],
        backgroundColor: ['#10b981', '#f59e0b'],
        borderWidth: 0,
    }],
}));

const departmentData = computed(() => {
    const depts = props.analytics?.departments || {};
    return {
        labels: Object.keys(depts),
        datasets: [{
            data: Object.values(depts),
            backgroundColor: '#6366f1',
            borderRadius: 8,
        }],
    };
});

const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: { position: 'bottom', labels: { padding: 16, usePointStyle: true, font: { size: 11 } } },
    },
};

const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
        y: { beginAtZero: true, ticks: { stepSize: 1 } },
        x: { grid: { display: false } },
    },
};

const actionIcons = {
    created: { bg: 'bg-emerald-100 dark:bg-emerald-900/30', text: 'text-emerald-600 dark:text-emerald-400' },
    updated: { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-600 dark:text-blue-400' },
    deleted: { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-600 dark:text-red-400' },
    assigned: { bg: 'bg-purple-100 dark:bg-purple-900/30', text: 'text-purple-600 dark:text-purple-400' },
    unassigned: { bg: 'bg-orange-100 dark:bg-orange-900/30', text: 'text-orange-600 dark:text-orange-400' },
    imported: { bg: 'bg-indigo-100 dark:bg-indigo-900/30', text: 'text-indigo-600 dark:text-indigo-400' },
};

const timeAgo = (date) => {
    const diff = (Date.now() - new Date(date)) / 1000;
    if (diff < 60) return 'just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
};
</script>

<template>
    <AuthenticatedLayout>
        <template #header>
            <h1 class="text-xl font-semibold text-gray-900 dark:text-white">{{ t('dashboard.title') }}</h1>
        </template>

        <Head :title="t('dashboard.title')" />

        <div class="mb-6">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white">{{ t('dashboard.welcome') }}, {{ $page.props.auth.user?.name }}!</h2>
        </div>

        <!-- Empty State -->
        <div v-if="!organizations?.length" class="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-16 text-center">
            <div class="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 dark:bg-indigo-900/30 mb-4">
                <svg class="h-8 w-8 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">{{ t('dashboard.no_orgs') }}</h3>
            <Link :href="route('organizations.create')" class="mt-4 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/25 hover:bg-indigo-700 transition">
                {{ t('dashboard.create_first') }}
            </Link>
        </div>

        <template v-else>
            <!-- Stats Cards -->
            <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div class="rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 shadow-sm">
                    <div class="flex items-center gap-3 mb-2">
                        <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 dark:bg-indigo-900/30">
                            <svg class="h-5 w-5 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5" /></svg>
                        </div>
                    </div>
                    <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ analytics?.total_organizations || 0 }}</p>
                    <p class="text-sm text-gray-500 dark:text-gray-400">{{ t('dashboard.total_organizations') }}</p>
                </div>
                <div class="rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 shadow-sm">
                    <div class="flex items-center gap-3 mb-2">
                        <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 dark:bg-purple-900/30">
                            <svg class="h-5 w-5 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                        </div>
                    </div>
                    <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ analytics?.total_roles || 0 }}</p>
                    <p class="text-sm text-gray-500 dark:text-gray-400">{{ t('dashboard.total_roles') }}</p>
                </div>
                <div class="rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 shadow-sm">
                    <div class="flex items-center gap-3 mb-2">
                        <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-900/30">
                            <svg class="h-5 w-5 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                        </div>
                    </div>
                    <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ analytics?.total_people || 0 }}</p>
                    <p class="text-sm text-gray-500 dark:text-gray-400">{{ t('dashboard.total_people') }}</p>
                </div>
                <div class="rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 shadow-sm">
                    <div class="flex items-center gap-3 mb-2">
                        <div class="flex h-10 w-10 items-center justify-center rounded-xl" :class="analytics?.risk_roles > 0 ? 'bg-red-50 dark:bg-red-900/30' : 'bg-emerald-50 dark:bg-emerald-900/30'">
                            <svg class="h-5 w-5" :class="analytics?.risk_roles > 0 ? 'text-red-600 dark:text-red-400' : 'text-emerald-600 dark:text-emerald-400'" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                        </div>
                    </div>
                    <p class="text-2xl font-bold" :class="analytics?.risk_roles > 0 ? 'text-red-600 dark:text-red-400' : 'text-gray-900 dark:text-white'">{{ analytics?.risk_roles || 0 }}</p>
                    <p class="text-sm text-gray-500 dark:text-gray-400">{{ t('dashboard.risk_roles') }}</p>
                </div>
            </div>

            <!-- Charts Row -->
            <div class="grid gap-6 lg:grid-cols-3 mb-6" v-if="analytics?.total_roles > 0">
                <div class="rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 shadow-sm">
                    <h3 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">{{ t('dashboard.criticality_chart') }}</h3>
                    <div style="height: 200px;">
                        <Doughnut :data="criticalityData" :options="chartOptions" />
                    </div>
                </div>
                <div class="rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 shadow-sm">
                    <h3 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">{{ t('dashboard.coverage_chart') }}</h3>
                    <div style="height: 200px;">
                        <Doughnut :data="coverageData" :options="chartOptions" />
                    </div>
                </div>
                <div class="rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 shadow-sm">
                    <h3 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">{{ t('dashboard.department_chart') }}</h3>
                    <div style="height: 200px;">
                        <Bar :data="departmentData" :options="barOptions" />
                    </div>
                </div>
            </div>

            <!-- Succession Planning Summary -->
            <div v-if="analytics?.succession" class="mb-6 rounded-2xl border border-indigo-100 dark:border-indigo-800 bg-indigo-50/30 dark:bg-indigo-900/10 p-5 shadow-sm">
                <h3 class="text-sm font-semibold text-indigo-900 dark:text-indigo-300 mb-4">{{ t('succession.dashboard_title') }}</h3>
                <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div class="rounded-xl bg-white dark:bg-gray-800 p-4 border border-gray-100 dark:border-gray-700">
                        <p class="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{{ analytics.succession.roles_with_successors || 0 }}</p>
                        <p class="text-xs text-gray-500 dark:text-gray-400">{{ t('succession.roles_with_successors') }}</p>
                    </div>
                    <div class="rounded-xl bg-white dark:bg-gray-800 p-4 border border-gray-100 dark:border-gray-700">
                        <p class="text-2xl font-bold" :class="analytics.succession.critical_without_backup > 0 ? 'text-red-600 dark:text-red-400' : 'text-emerald-600 dark:text-emerald-400'">{{ analytics.succession.critical_without_backup || 0 }}</p>
                        <p class="text-xs text-gray-500 dark:text-gray-400">{{ t('succession.critical_without_backup') }}</p>
                    </div>
                    <div class="rounded-xl bg-white dark:bg-gray-800 p-4 border border-gray-100 dark:border-gray-700">
                        <p class="text-2xl font-bold text-amber-600 dark:text-amber-400">{{ analytics.succession.avg_readiness ? analytics.succession.avg_readiness.toFixed(1) : '—' }}</p>
                        <p class="text-xs text-gray-500 dark:text-gray-400">{{ t('succession.avg_readiness') }}</p>
                    </div>
                    <div class="rounded-xl bg-white dark:bg-gray-800 p-4 border border-gray-100 dark:border-gray-700">
                        <div class="flex items-center gap-3 text-xs">
                            <span class="font-medium text-emerald-600 dark:text-emerald-400">{{ analytics.succession.by_horizon?.short || 0 }} {{ t('succession.short') }}</span>
                            <span class="font-medium text-amber-600 dark:text-amber-400">{{ analytics.succession.by_horizon?.mid || 0 }} {{ t('succession.mid') }}</span>
                            <span class="font-medium text-blue-600 dark:text-blue-400">{{ analytics.succession.by_horizon?.long || 0 }} {{ t('succession.long') }}</span>
                        </div>
                        <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">{{ t('succession.by_horizon') }}</p>
                    </div>
                </div>
            </div>

            <!-- Organizations + Activity -->
            <div class="grid gap-6 lg:grid-cols-3">
                <!-- Organization Cards -->
                <div class="lg:col-span-2">
                    <div class="grid gap-4 sm:grid-cols-2">
                        <div v-for="org in organizations" :key="org.id" class="group rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 shadow-sm hover:shadow-lg hover:border-indigo-100 dark:hover:border-indigo-800 transition-all duration-300">
                            <div class="flex items-start justify-between mb-3">
                                <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 dark:bg-indigo-900/30 text-lg font-bold text-indigo-600 dark:text-indigo-400">
                                    {{ org.name.charAt(0) }}
                                </div>
                                <Link :href="route('organizations.chart', org.id)" class="flex items-center gap-1 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 px-3 py-1.5 text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition">
                                    <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                                    {{ t('dashboard.view_chart') }}
                                </Link>
                            </div>
                            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-1">{{ org.name }}</h3>
                            <p v-if="org.description" class="text-sm text-gray-500 dark:text-gray-400 mb-3 line-clamp-2">{{ org.description }}</p>
                            <div class="flex items-center gap-4 mt-3 pt-3 border-t border-gray-50 dark:border-gray-700">
                                <div class="flex items-center gap-1.5">
                                    <div class="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-50 dark:bg-purple-900/30">
                                        <svg class="h-3.5 w-3.5 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                    </div>
                                    <span class="text-sm font-medium text-gray-600 dark:text-gray-400">{{ org.roles_count }} {{ t('dashboard.total_roles') }}</span>
                                </div>
                                <div class="flex items-center gap-1.5">
                                    <div class="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50 dark:bg-emerald-900/30">
                                        <svg class="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                    </div>
                                    <span class="text-sm font-medium text-gray-600 dark:text-gray-400">{{ org.people_count }} {{ t('dashboard.total_people') }}</span>
                                </div>
                            </div>
                            <Link :href="route('organizations.show', org.id)" class="mt-3 flex w-full items-center justify-center rounded-xl border border-gray-200 dark:border-gray-600 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                                {{ t('dashboard.manage') }}
                            </Link>
                        </div>

                        <!-- Add New Card -->
                        <Link :href="route('organizations.create')" class="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700 p-6 text-center hover:border-indigo-300 dark:hover:border-indigo-600 hover:bg-indigo-50/50 dark:hover:bg-indigo-900/20 transition-all duration-300">
                            <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-700 mb-3">
                                <svg class="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
                            </div>
                            <span class="text-sm font-medium text-gray-500 dark:text-gray-400">{{ t('organizations.create') }}</span>
                        </Link>
                    </div>
                </div>

                <!-- Recent Activity -->
                <div class="rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 shadow-sm">
                    <h3 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">{{ t('dashboard.recent_activity') }}</h3>
                    <div v-if="!recentActivity?.length" class="text-center py-8 text-sm text-gray-400">
                        {{ t('dashboard.no_activity') }}
                    </div>
                    <div v-else class="space-y-3">
                        <div v-for="log in recentActivity" :key="log.id" class="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                            <div class="flex h-8 w-8 items-center justify-center rounded-lg flex-shrink-0" :class="actionIcons[log.action]?.bg || 'bg-gray-100 dark:bg-gray-700'">
                                <svg class="h-4 w-4" :class="actionIcons[log.action]?.text || 'text-gray-500'" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path v-if="log.action === 'created'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                                    <path v-else-if="log.action === 'updated'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    <path v-else-if="log.action === 'deleted'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <div class="flex-1 min-w-0">
                                <p class="text-sm text-gray-700 dark:text-gray-300">
                                    <span class="font-medium capitalize">{{ t(`activity.${log.action}`) }}</span>
                                    <span class="text-gray-500 dark:text-gray-400"> {{ log.subject_type }} </span>
                                    <span v-if="log.subject_name" class="font-medium">{{ log.subject_name }}</span>
                                </p>
                                <p class="text-xs text-gray-400 mt-0.5">
                                    {{ log.organization?.name ? log.organization.name + ' · ' : '' }}{{ timeAgo(log.created_at) }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </AuthenticatedLayout>
</template>
