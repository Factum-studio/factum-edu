<script setup lang="ts">
definePageMeta({
  middleware: ["admin"],
})

import type { Course } from '~/types/course.interface';
import type { User } from '~/types/user.interface';

const courseStore = useCourse()
const authStore = useAuth()

</script>
<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="mb-4">
        <p class="text-4xl font-semibold">Настройки</p>
        <BackButton class="mt-4"></BackButton>
      </v-col>
      <v-col cols="12">
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field variant="outlined" hide-details="auto" label="Логин"
              clearable></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field variant="outlined" hide-details="auto" label="Пароль" clearable></v-text-field>
          </v-col>
          <v-col class="text" cols="12" md="4">
            каминг сун.....
          </v-col>
           <v-col cols="12" class="flex justify-center">
            <v-btn size="x-large">Отправить</v-btn>
          </v-col>
        </v-row>

      </v-col>
    </v-row>
  </v-container>
</template>