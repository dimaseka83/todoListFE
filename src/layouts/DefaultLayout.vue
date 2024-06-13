<script setup lang="ts">
import { useUser } from '@/stores/User'
import { useRouter } from 'vue-router'

const { user, logout } = useUser()
const router = useRouter()

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
</template>
