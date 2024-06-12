<script setup lang="ts">
import AuthLayout from "@/layouts/AuthLayout.vue";
import { onMounted } from "vue";

const API_URL = import.meta.env.VITE_BASE_URL;

onMounted(() => {
  console.log(API_URL);
});

</script>
<template>
  <div>
    <AuthLayout>
        <h1>{{ API_URL }}</h1>
        <form>
            <input type="text" placeholder="Username" />
            <input type="password" placeholder="Password" />
            <v-btn>Login</v-btn>
        </form>
    </AuthLayout>
  </div>
</template>
