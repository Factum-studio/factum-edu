<script lang="ts" setup>
import { useTheme } from "vuetify"

const theme = useTheme()

const router = useRouter()
const savedTheme = useCookie('theme')

const userStore = useAuth();

let drawer = ref(false);
let dialog = ref(false);

if (['light', 'dark'].includes(String(savedTheme.value))) {
  theme.global.name.value = String(savedTheme.value);
}

// path of active tab
let activeTab = ref<string>()

function setActiveTab(tabPath: string) {
  activeTab.value = tabPath
  if (tabPath == '/courses') {
    router.push(`/teacher`)
  } else if (tabPath == '/teacher/my-tasks') {
    router.push(`/teacher/my-tasks`)
  } else if (tabPath == "/teacher/my-lessons") {
    router.push(tabPath)
  }
}

function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark ? "light" : "dark"
  savedTheme.value = theme.global.name.value
}

async function logOut() {
  await userStore.logout()
}

// set current active tab
const fullPath = router.currentRoute.value.fullPath
if (fullPath.endsWith('/teacher')) {
  activeTab.value = "/courses"
} else if (fullPath.endsWith("/teacher/my-tasks")) {
  activeTab.value = "/teacher/my-tasks"
} else if (fullPath.endsWith("/my-lessons")) {
  activeTab.value = "/teacher/my-lessons"
}
</script>
<template>
  <v-app class="relative min-h-screen">
    <v-app-bar :elevation="0">
      <v-container>
        <v-row>
          <v-col @click="router.push(`/${userStore.user?.roles[0]}`)" class="logo hidden mt-1 md:flex cursor-pointer"
            cols="3">
            <img class="h-[35px]" src="/assets/images/factum-logo.svg" />
          </v-col>

          <v-col @click="router.push(`/${userStore.user?.roles[0]}`)" class="md:hidden flex mt-1 cursor-pointer"
            cols="6">
            <img class="h-[35px]" src="/assets/images/factum-logo.svg" />
          </v-col>

          <v-col cols="6" class="hidden md:flex justify-center align-center text-sm">
            <div class="select-item" @click="setActiveTab('/courses')" :class="{
              'active-item': activeTab == '/courses',
              'black-border': activeTab == '' && theme.global.name.value == 'light',
              'white-border': activeTab == '/courses' && theme.global.name.value == 'dark',
            }">
              Мои курсы
            </div>
            <div class="select-item" @click="setActiveTab('/teacher/my-lessons')" :class="{
              'active-item': activeTab == '/teacher/my-lessons',
              'black-border': activeTab == '/teacher/my-lessons' && theme.global.name.value == 'light',
              'white-border': activeTab == '/teacher/my-lessons' && theme.global.name.value == 'dark',
            }">
              Мои уроки
            </div>
            <div class="select-item" @click="setActiveTab('/teacher/my-tasks')" :class="{
              'active-item': activeTab == '/teacher/my-tasks',
              'black-border': activeTab == '/teacher/my-tasks' && theme.global.name.value == 'light',
              'white-border': activeTab == '/teacher/my-tasks' && theme.global.name.value == 'dark',
            }">
              Мои задания
            </div>
          </v-col>
          <v-spacer>
          </v-spacer>
          <v-col cols="3" lg="2" class="hidden md:flex px-0 md:px-10 align-center justify-between">
            <button @click="toggleTheme" type="button"
              class="text-zinc-700 border hover:bg-zinc-500 focus:outline-none font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mx-2">
              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="16" height="16"
                class="g-icon" fill="currentColor" stroke="none" aria-hidden="true"><svg
                  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16">
                  <path fill="currentColor" fill-rule="evenodd"
                    d="M8 3a.75.75 0 0 1-.75-.75V.75a.75.75 0 0 1 1.5 0v1.5A.75.75 0 0 1 8 3m0 7.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8m-.75 3.25a.75.75 0 0 0 1.5 0v-1.5a.75.75 0 0 0-1.5 0zM13 8a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5h-1.5A.75.75 0 0 1 13 8M.75 7.25a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5zm10.786-2.786a.75.75 0 0 1 0-1.06l1.06-1.06a.75.75 0 0 1 1.06 1.06l-1.06 1.06a.75.75 0 0 1-1.06 0m-9.193 8.132a.75.75 0 0 0 1.06 1.06l1.062-1.06a.75.75 0 0 0-1.061-1.06zm9.193-1.06a.75.75 0 0 1 1.06 0l1.06 1.06a.75.75 0 0 1-1.06 1.06l-1.06-1.06a.75.75 0 0 1 0-1.06M3.404 2.343a.75.75 0 0 0-1.06 1.06l1.06 1.061a.75.75 0 1 0 1.06-1.06z"
                    clip-rule="evenodd"></path>
                </svg></svg>
            </button>
            <div class="mx-2" v-if="userStore.user?.avatars[0]">
              <v-avatar class="border" :image="userStore.user?.avatars[0]"></v-avatar>
            </div>
            <div class="mx-2" v-else>
              <v-avatar class="border">{{ userStore.user?.name[0] }}{{ userStore.user?.surname[0] }}</v-avatar>
            </div>
            <div class="mx-2">
              <p class="text-sm">
                {{ userStore.user?.name }}
              </p>
              <p class="text-xs">
                {{ userStore.user?.roles[0] }}
              </p>
            </div>
            <v-menu>
              <template v-slot:activator="{ props }">
                <v-btn class="mx-0" icon="mdi-dots-vertical" variant="text" v-bind="props"></v-btn>
              </template>
              <v-list>
                <v-col class='flex justify-start' cols='12'>
                  <v-btn @click="router.push(`/${userStore.user?.roles[0]}/settings`)" class="" rounded="xl"
                    variant="outlined">
                    настройки
                  </v-btn>
                </v-col>
                <v-col @click="dialog = true;" class='flex pt-0 justify-start' cols='12'>
                  <v-btn class="" rounded="xl" variant="outlined">
                    выйти
                  </v-btn>
                </v-col>
              </v-list>
            </v-menu>
          </v-col>
          <v-col cols="6" class="md:hidden flex align-center justify-end pr-0">
            <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
          </v-col>

          <v-dialog v-model="dialog" width="auto">
            <v-card max-width="400" title="Выйти из аккаунта?">
              <template v-slot:actions>
                <v-btn text="нет" @click="dialog = false;"></v-btn>
                <v-btn text="да" @click="dialog = false; logOut()"></v-btn>
              </template>
            </v-card>
          </v-dialog>
        </v-row>
      </v-container>
    </v-app-bar>

    <div v-if="drawer">
      <v-navigation-drawer v-model="drawer" location="right" temporary>
        <template v-slot:prepend>
          <div class="flex flex-row align-center">
            <div class="ml-3" v-if="userStore.user?.avatars[0]">
              <v-avatar class="border" :image="userStore.user?.avatars[0]"></v-avatar>
            </div>
            <div class="ml-3" v-else>
              <v-avatar class="border">{{ userStore.user?.name[0] }}{{ userStore.user?.surname[0] }}</v-avatar>
            </div>
            <v-list-item lines="two" :subtitle="userStore.user?.roles[0]" :title="userStore.user?.name">
            </v-list-item>
            <button @click="toggleTheme" type="button"
              class="text-zinc-700 border border-zinc-700 hover:bg-zinc-400 focus:outline-none font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center dark:hover:bg-zinc-700">
              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="16" height="16"
                class="g-icon" fill="currentColor" stroke="none" aria-hidden="true"><svg
                  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16">
                  <path fill="currentColor" fill-rule="evenodd"
                    d="M8 3a.75.75 0 0 1-.75-.75V.75a.75.75 0 0 1 1.5 0v1.5A.75.75 0 0 1 8 3m0 7.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8m-.75 3.25a.75.75 0 0 0 1.5 0v-1.5a.75.75 0 0 0-1.5 0zM13 8a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5h-1.5A.75.75 0 0 1 13 8M.75 7.25a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5zm10.786-2.786a.75.75 0 0 1 0-1.06l1.06-1.06a.75.75 0 0 1 1.06 1.06l-1.06 1.06a.75.75 0 0 1-1.06 0m-9.193 8.132a.75.75 0 0 0 1.06 1.06l1.062-1.06a.75.75 0 0 0-1.061-1.06zm9.193-1.06a.75.75 0 0 1 1.06 0l1.06 1.06a.75.75 0 0 1-1.06 1.06l-1.06-1.06a.75.75 0 0 1 0-1.06M3.404 2.343a.75.75 0 0 0-1.06 1.06l1.06 1.061a.75.75 0 1 0 1.06-1.06z"
                    clip-rule="evenodd"></path>
                </svg></svg>
            </button>
          </div>
        </template>
        <v-divider></v-divider>
        <v-col cols="12" class="flex justify-start align-center">
          <div class="select-item" @click="setActiveTab('/courses')" :class="{
            'active-item': activeTab == '/courses',
            'black-border': activeTab == '' && theme.global.name.value == 'light',
            'white-border': activeTab == '/courses' && theme.global.name.value == 'dark',
          }">
            Курсы
          </div>
          <div class="select-item" @click="setActiveTab('/teacher/my-lessons')" :class="{
            'active-item': activeTab == '/teacher/my-lessons',
            'black-border': activeTab == '/teacher/my-lessons' && theme.global.name.value == 'light',
            'white-border': activeTab == '/teacher/my-lessons' && theme.global.name.value == 'dark',
          }">
            Уроки
          </div>
          <div class="select-item" @click="setActiveTab('/teacher/my-tasks')" :class="{
            'active-item': activeTab == '/teacher/my-tasks',
            'black-border': activeTab == '/teacher/my-tasks' && theme.global.name.value == 'light',
            'white-border': activeTab == '/teacher/my-tasks' && theme.global.name.value == 'dark',
          }">
            Задания
          </div>
        </v-col>
        <v-divider></v-divider>
        <v-col class='flex justify-start' cols='12'>
          <v-btn @click="router.push('/teacher/settings')" class="" rounded="xl" variant="outlined">
            настройки
          </v-btn>
        </v-col>
        <v-col class='flex pt-0 justify-start' cols='12'>
          <v-btn @click="dialog = true;" class="" rounded="xl" variant="outlined">
            выйти
          </v-btn>
        </v-col>

      </v-navigation-drawer>
    </div>

    <div class="mt-16 pb-28 md:pb-20">
      <slot />
    </div>
    <Footer />
  </v-app>
</template>

<style scoped lang="scss">
.select-item {
  margin: 0px 6px;
  cursor: pointer;
}

.active-item {
  transition: ease 0.2s;
  font-weight: 500;
}

.black-border {
  border-bottom: 2px solid black;
}

.white-border {
  border-bottom: 2px solid white;
}
</style>
