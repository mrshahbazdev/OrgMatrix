<script setup>
import { ref } from 'vue';
import { Link, usePage } from '@inertiajs/vue3';
import { useI18n } from 'vue-i18n';
import LanguageSwitcher from '@/Components/LanguageSwitcher.vue';
import DarkModeToggle from '@/Components/DarkModeToggle.vue';
import ToastNotification from '@/Components/ToastNotification.vue';

const { t } = useI18n();
const page = usePage();
const sidebarOpen = ref(true);
const mobileMenuOpen = ref(false);

const navigation = [
    { name: () => t('nav.dashboard'), href: 'dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { name: () => t('nav.organizations'), href: 'organizations.index', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
    { name: () => t('nav.activity_log'), href: 'activity-log', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
];
</script>

<template>
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <ToastNotification />

        <!-- Mobile Menu Overlay -->
        <div v-if="mobileMenuOpen" class="fixed inset-0 z-[60] bg-black/50 lg:hidden" @click="mobileMenuOpen = false"></div>

        <!-- Sidebar -->
        <aside
            :class="[
                'fixed inset-y-0 left-0 z-[70] flex flex-col bg-gradient-to-b from-indigo-900 via-indigo-800 to-indigo-900 transition-all duration-300',
                sidebarOpen ? 'w-64' : 'w-20',
                mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
            ]"
        >
            <!-- Logo -->
            <div class="flex h-16 items-center justify-between px-4">
                <Link :href="route('dashboard')" class="flex items-center gap-3">
                    <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
                        <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                        </svg>
                    </div>
                    <span v-if="sidebarOpen" class="text-lg font-bold text-white">OrgMatrix</span>
                </Link>
                <button @click="sidebarOpen = !sidebarOpen" class="hidden lg:block text-white/60 hover:text-white">
                    <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
                <button @click="mobileMenuOpen = false" class="lg:hidden text-white/60 hover:text-white">
                    <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <!-- Navigation -->
            <nav class="mt-6 flex-1 space-y-1 px-3">
                <Link
                    v-for="item in navigation"
                    :key="item.href"
                    :href="route(item.href)"
                    @click="mobileMenuOpen = false"
                    :class="[
                        'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200',
                        route().current(item.href.split('.')[0] + '*')
                            ? 'bg-white/20 text-white shadow-lg shadow-indigo-900/20'
                            : 'text-indigo-200 hover:bg-white/10 hover:text-white'
                    ]"
                >
                    <svg class="h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                        <path stroke-linecap="round" stroke-linejoin="round" :d="item.icon" />
                    </svg>
                    <span v-if="sidebarOpen">{{ item.name() }}</span>
                </Link>
            </nav>

            <!-- Language Switcher & User -->
            <div class="border-t border-white/10 p-4 space-y-3">
                <LanguageSwitcher />
                <div class="flex items-center gap-3">
                    <div class="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600 text-sm font-semibold text-white">
                        {{ page.props.auth.user?.name?.charAt(0)?.toUpperCase() }}
                    </div>
                    <div v-if="sidebarOpen" class="flex-1 min-w-0">
                        <p class="truncate text-sm font-medium text-white">{{ page.props.auth.user?.name }}</p>
                        <Link :href="route('logout')" method="post" as="button" class="text-xs text-indigo-300 hover:text-white">
                            {{ t('nav.logout') }}
                        </Link>
                    </div>
                </div>
            </div>
        </aside>

        <!-- Main Content -->
        <div :class="['transition-all duration-300', sidebarOpen ? 'lg:ml-64' : 'lg:ml-20']">
            <!-- Top Bar -->
            <header class="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 px-4 sm:px-6 backdrop-blur-sm">
                <div class="flex items-center gap-3">
                    <button @click="mobileMenuOpen = true" class="lg:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400">
                        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                    <div>
                        <slot name="header" />
                    </div>
                </div>
                <div class="flex items-center gap-3">
                    <DarkModeToggle />
                    <Link :href="route('profile.edit')" class="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                        {{ t('nav.profile') }}
                    </Link>
                </div>
            </header>

            <!-- Page Content -->
            <main class="p-4 sm:p-6">
                <slot />
            </main>
        </div>
    </div>
</template>
