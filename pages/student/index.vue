<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
  // or middleware: 'auth'
})

const courseStore = useCourse()
const authStore = useAuth()
const router = useRouter()
const route = useRoute()

let { courses } = storeToRefs(courseStore)

await courseStore.getAll()
</script>
<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <p class="text-4xl font-semibold my-4">Доступные курсы</p>
      </v-col>
      <v-col cols="12" sm="6" md="4" lg="3" v-if="authStore.user?.roles[0] == 'teacher'">
        <div class="border rounded-lg cursor-pointer h-100 d-flex justify-center align-center" @click="router.push(`/add-course`)" style="font-size: 40px;">
          <v-icon class="text-zinc-600 ma-8" icon="mdi-plus"></v-icon>
        </div>
      </v-col>
      <v-col cols="12" sm="6" md="4" lg="3" v-for="(course, index) in courses">
        <CourseCard :course="course" :key="index"></CourseCard>
      </v-col>
    </v-row>
  </v-container>
</template>
