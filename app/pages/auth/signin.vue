<template>
  <v-sheet width="420" class="container d-flex flex-column justify-center border rounded-lg pa-8">
    <h1 class="text-h5 text-center">Войти в аккаунт</h1>
    <v-form class="mt-3" fast-fail ref="form" @submit.prevent="loginFormHandler">
      <v-col class="pa-0 d-flex flex-column ga-1">
       <div>
         <p class="text-subtitle-1 text-medium-emphasis">Логин</p>
         <v-text-field
             v-model="formData.login"
             :rules="loginRules"
             placeholder="Ivan"
             variant="outlined"
             density="compact"
             hide-details="auto"
         />
       </div>
        <div>
          <p class="text-subtitle-1 text-medium-emphasis">Пароль</p>
          <v-text-field
              v-model="formData.password"
              :rules="passwordRules"
              placeholder="******"
              type="password"
              variant="outlined"
              density="compact"
              hide-details="auto"
          />
        </div>
      </v-col>
        <NuxtLink
            to="/auth/forgot-password"
            class="d-flex justify-end mt-3 text-subtitle-1 text-black cursor-pointer text-decoration-none"
        >
          Забыли пароль?
        </NuxtLink>
      <v-btn class="mt-3 bg-black px-0 py-2" type="submit" block>Войти</v-btn>
    </v-form>
    <p class="text-center mt-5">
      Нет аккаунта?
      <NuxtLink
          to="/auth/signup"
          class="text-black cursor-pointer"
      >
        Регистрация
      </NuxtLink>
    </p>
  </v-sheet>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useAuthStore } from '@/store/auth';
import type { AuthData } from '@/types/auth';
import { loginRules, passwordRules } from '@/utils/validateRules';

const store = useAuthStore();
const { loginAccount } = store;

const form = ref<HTMLFormElement | null>(null);
const formData = reactive<AuthData>({
  login: '',
  password: '',
});

const loginFormHandler = async () => {
  const isFormValid = ref<boolean | null>(null);

  if (form.value) {
    const formInfo = await form.value.validate();
    isFormValid.value = formInfo.valid;
  }

  if (isFormValid.value) {
    await loginAccount(formData);
    store.isAuth && navigateTo('/');
  }
};
</script>

<style scoped>
.container {
  margin-bottom: 100px;
}
</style>