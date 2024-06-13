<script setup lang="ts">
import { useUser } from '@/stores/User'
import { useRouter } from 'vue-router'
import { useSuccess } from '@/stores/Success';
import { useError } from '@/stores/Error';
import { computed, watch } from 'vue';

const { user, logout } = useUser()
const router = useRouter()

const errorStore = useError()
const successStore = useSuccess()

const message = computed(() => errorStore.error !== '' ? errorStore.error : successStore.success)

const showSnackbar = computed(() => errorStore.error !== '' || successStore.success !== '')

const closeSnackbar = () => {
  errorStore.clearError()
  successStore.clearSuccess()
}

watch(showSnackbar, (val) => {
  if (val) {
    setTimeout(() => {
      closeSnackbar()
    }, 2000)
  }
})

const logoutButton = async () => {
  try {
    logout()
    localStorage.removeItem('token')
    router.push('/')
  } catch (error) {
    console.log(error)
  }
}
</script>
<template>
  <v-app-bar app>
    <v-toolbar-title>Welcome, {{ user.name }}</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn color="primary" @click="logoutButton">Logout</v-btn>
  </v-app-bar>

  <slot></slot>
  <v-snackbar v-model="showSnackbar" :timeout="2000" @click="closeSnackbar">
    {{ message }}
  </v-snackbar>
</template>
