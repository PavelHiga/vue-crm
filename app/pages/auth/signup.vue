<template>
  <v-sheet v-if="!isAccountCreated" width="420" class="container d-flex flex-column justify-center border rounded-lg pa-8">
    <div>
      <h1 class="text-h5 text-center">Создать аккаунт</h1>
      <v-form class="mt-3" validate-on="blur" ref="form" @submit.prevent="registerFormHandler">
       <v-col class="pa-0 d-flex flex-column ga-1">
         <div>
           <p class="text-subtitle-1 text-medium-emphasis">Имя пользователя</p>
           <v-text-field
               v-model="formData.username"
               :rules="usernameRules"
               required
               placeholder="Иван"
               variant="outlined"
               density="compact"
               hide-details="auto"
           />
         </div>
         <div>
           <p class="text-subtitle-1 text-medium-emphasis">Логин</p>
           <v-text-field
               v-model="formData.login"
               :rules="loginRules"
               required
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
               type="password"
               required
               placeholder="******"
               variant="outlined"
               density="compact"
               hide-details="auto"
           />
         </div>
         <div>
           <p class="text-subtitle-1 text-medium-emphasis">Повторите пароль</p>
           <v-text-field
               v-model="secondPassword"
               :rules="secondPasswordRules"
               type="password"
               required
               placeholder="******"
               variant="outlined"
               density="compact"
               hide-details="auto"
           />
         </div>
         <div>
           <p class="text-subtitle-1 text-medium-emphasis">Почтовый адрес</p>
           <v-text-field
               v-model="formData.email"
               :rules="emailRules"
               required
               placeholder="ivan@mail.ru"
               variant="outlined"
               density="compact"
               hide-details="auto"
           />
         </div>
         <div>
           <p class="text-subtitle-1 text-medium-emphasis">Телефон</p>
           <v-text-field
               v-model="formData.phoneNumber"
               :rules="phoneNumberRules"
               placeholder="+7 (123)-456-789"
               variant="outlined"
               density="compact"
               hide-details="auto"
           />
         </div>

         <v-btn class="mt-5 bg-black px-0 py-2" type="submit" block>
           Зарегистрироваться
         </v-btn>
       </v-col>
      </v-form>

      <p class="text-center mt-5">
        Есть аккаунт?
        <NuxtLink
            to="/auth/signin"
            class="text-black cursor-pointer"
        >
          Войти
        </NuxtLink>
      </p>
    </div>
  </v-sheet>
  <v-sheet v-else width="420" class="container d-flex flex-column justify-center border rounded-lg pa-8">
    <NuxtLink
        to="/auth/signin"
        class="text-black cursor-pointer text-h6 text-center"
    >
      Войти в систему
    </NuxtLink>
  </v-sheet>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';

import type { UserRegistration } from '@/types/auth';
import {
  emailRules,
  loginRules,
  passwordRules,
  phoneNumberRules,
  usernameRules,
} from '@/utils/validateRules';

import { useAuthStore } from '@/store/auth';

const isAccountCreated = ref(false);
const store = useAuthStore();
const { createAccount } = store;

const form = ref<HTMLFormElement | null>(null);
const formData = reactive<UserRegistration>({
  email: '',
  login: '',
  password: '',
  phoneNumber: '',
  username: '',
});

const secondPassword = ref('');

const secondPasswordRules = [
  (value: string) => {
    if (!value) return 'Поле не должно быть пустым';

    if (formData.password !== secondPassword.value) {
      return 'Пароли не совпадают';
    }

    return true;
  },
];

const registerFormHandler = async () => {
  const isFormValid = ref<boolean | null>(null);

  if (form.value) {
    const formInfo = await form.value.validate();
    isFormValid.value = formInfo.valid;
  }

  if (isFormValid.value) {
    try {
      await createAccount(formData);
      isAccountCreated.value = true;
      alert('Акканут успешно создан!');
    } catch (error) {
      alert(error);
    }
  }
};
</script>