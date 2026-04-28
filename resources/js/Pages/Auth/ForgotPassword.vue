<script setup>
import { Head, useForm } from '@inertiajs/vue3';
import { useI18n } from 'vue-i18n';
import GuestLayout from '@/Layouts/GuestLayout.vue';

const { t } = useI18n();

defineProps({ status: String });

const form = useForm({ email: '' });

const submit = () => {
    form.post(route('password.email'));
};
</script>

<template>
    <GuestLayout>
        <Head :title="t('auth.forgot_title')" />

        <div class="mb-8">
            <h2 class="text-2xl font-bold text-gray-900">{{ t('auth.forgot_title') }}</h2>
            <p class="mt-2 text-sm text-gray-500">{{ t('auth.forgot_subtitle') }}</p>
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
                />
                <p v-if="form.errors.email" class="mt-1.5 text-xs text-red-600">{{ form.errors.email }}</p>
            </div>

            <button
                type="submit"
                :disabled="form.processing"
                class="flex w-full items-center justify-center rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/25 hover:bg-indigo-700 transition disabled:opacity-50"
            >
                {{ t('auth.send_reset_link') }}
            </button>
        </form>
    </GuestLayout>
</template>
