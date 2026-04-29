<script setup>
import { Head, Link, useForm } from '@inertiajs/vue3';
import { useI18n } from 'vue-i18n';
import GuestLayout from '@/Layouts/GuestLayout.vue';

const { t } = useI18n();

const form = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
});

const submit = () => {
    form.post(route('register'), {
        onFinish: () => form.reset('password', 'password_confirmation'),
    });
};
</script>

<template>
    <GuestLayout>
        <Head :title="t('auth.register_title')" />

        <div class="mb-8">
            <h2 class="text-2xl font-bold text-gray-900">{{ t('auth.register_title') }}</h2>
            <p class="mt-2 text-sm text-gray-500">{{ t('auth.register_subtitle') }}</p>
        </div>

        <form @submit.prevent="submit" class="space-y-5">
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1.5">{{ t('auth.name') }}</label>
                <input
                    v-model="form.name"
                    type="text"
                    required
                    autofocus
                    class="block w-full rounded-xl border-gray-200 bg-gray-50 px-4 py-3 text-sm shadow-sm focus:border-indigo-500 focus:bg-white focus:ring-indigo-500 transition"
                    :placeholder="t('auth.name')"
                />
                <p v-if="form.errors.name" class="mt-1.5 text-xs text-red-600">{{ form.errors.name }}</p>
            </div>

            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1.5">{{ t('auth.email') }}</label>
                <input
                    v-model="form.email"
                    type="email"
                    required
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

            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1.5">{{ t('auth.confirm_password') }}</label>
                <input
                    v-model="form.password_confirmation"
                    type="password"
                    required
                    class="block w-full rounded-xl border-gray-200 bg-gray-50 px-4 py-3 text-sm shadow-sm focus:border-indigo-500 focus:bg-white focus:ring-indigo-500 transition"
                    :placeholder="t('auth.confirm_password')"
                />
            </div>

            <button
                type="submit"
                :disabled="form.processing"
                class="flex w-full items-center justify-center rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/25 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition disabled:opacity-50"
            >
                <svg v-if="form.processing" class="mr-2 h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg>
                {{ t('auth.sign_up') }}
            </button>
        </form>

        <p class="mt-8 text-center text-sm text-gray-500">
            {{ t('auth.has_account') }}
            <Link :href="route('login')" class="font-semibold text-indigo-600 hover:text-indigo-500">{{ t('auth.sign_in') }}</Link>
        </p>
    </GuestLayout>
</template>
