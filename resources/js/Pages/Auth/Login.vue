<script setup>
import { Head, Link, useForm } from '@inertiajs/vue3';
import { useI18n } from 'vue-i18n';
import GuestLayout from '@/Layouts/GuestLayout.vue';

const { t } = useI18n();

defineProps({ canResetPassword: Boolean, status: String });

const form = useForm({
    email: '',
    password: '',
    remember: false,
});

const submit = () => {
    form.post(route('login'), {
        onFinish: () => form.reset('password'),
    });
};
</script>

<template>
    <GuestLayout>
        <Head :title="t('auth.login_title')" />

        <div class="mb-8">
            <h2 class="text-2xl font-bold text-gray-900">{{ t('auth.login_title') }}</h2>
            <p class="mt-2 text-sm text-gray-500">{{ t('auth.login_subtitle') }}</p>
        </div>

        <div v-if="status" class="mb-4 text-sm font-medium text-green-600 bg-green-50 rounded-lg p-3">
            {{ status }}
        </div>

        <form @submit.prevent="submit" class="space-y-5">
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1.5">{{ t('auth.email') }}</label>
                <input
                    v-model="form.email"
                    type="email"
                    required
                    autofocus
                    class="block w-full rounded-xl border-gray-200 bg-gray-50 px-4 py-3 text-sm shadow-sm focus:border-indigo-500 focus:bg-white focus:ring-indigo-500 transition"
                    :placeholder="t('auth.email')"
                />
                <p v-if="form.errors.email" class="mt-1.5 text-xs text-red-600">{{ form.errors.email }}</p>
            </div>

            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1.5">{{ t('auth.password') }}</label>
                <input
                    v-model="form.password"
                    type="password"
                    required
                    class="block w-full rounded-xl border-gray-200 bg-gray-50 px-4 py-3 text-sm shadow-sm focus:border-indigo-500 focus:bg-white focus:ring-indigo-500 transition"
                    :placeholder="t('auth.password')"
                />
                <p v-if="form.errors.password" class="mt-1.5 text-xs text-red-600">{{ form.errors.password }}</p>
            </div>

            <div class="flex items-center justify-between">
                <label class="flex items-center gap-2">
                    <input v-model="form.remember" type="checkbox" class="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                    <span class="text-sm text-gray-600">{{ t('auth.remember_me') }}</span>
                </label>
                <Link v-if="canResetPassword" :href="route('password.request')" class="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                    {{ t('auth.forgot_password') }}
                </Link>
            </div>

            <button
                type="submit"
                :disabled="form.processing"
                class="flex w-full items-center justify-center rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/25 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition disabled:opacity-50"
            >
                <svg v-if="form.processing" class="mr-2 h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg>
                {{ t('auth.sign_in') }}
            </button>
        </form>

        <p class="mt-8 text-center text-sm text-gray-500">
            {{ t('auth.no_account') }}
            <Link :href="route('register')" class="font-semibold text-indigo-600 hover:text-indigo-500">{{ t('auth.sign_up') }}</Link>
        </p>
    </GuestLayout>
</template>
