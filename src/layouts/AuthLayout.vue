<script setup lang="ts">
import { computed, watch } from 'vue'
import { useDisplay } from 'vuetify'
import { useError } from '@/stores/Error'
import { useSuccess } from '@/stores/Success'

const { mobile } = useDisplay()

const errorStore = useError()
const successStore = useSuccess()

const message = computed(() => (errorStore.error !== '' ? errorStore.error : successStore.success))

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
</script>

<template>
    <v-row no-gutters align="center" justify="center">
      <v-col>
        <v-card
          :width="mobile ? '90%' : '40%'"
          height="auto"
          class="mx-auto mt-10 pb-12"
          elevation="12"
        >
          <slot />
        </v-card>
        <v-snackbar v-model="showSnackbar" :timeout="2000" @click="closeSnackbar">
          {{ message }}
        </v-snackbar>
      </v-col>
    </v-row>
</template>

<style lang="scss">
body {
  margin: 0;
}
</style>
