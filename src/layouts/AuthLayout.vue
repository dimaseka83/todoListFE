<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useDisplay } from 'vuetify'
import { useError } from '@/stores/Error'

const { mobile } = useDisplay()

const errorStore = useError()
const showError = ref(false)

const shouldShowError = computed(() => errorStore.error !== '')

watch(shouldShowError, (val) => {
  if (val) {
    showError.value = true
    setTimeout(() => {
      errorStore.clearError()
      showError.value = false
    }, 2000)
  }
})
</script>

<template>
  <v-container class="fill-height">
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
        <v-snackbar v-model="showError" v-if="shouldShowError" :timeout="2000">
          {{ errorStore.error }}
        </v-snackbar>
      </v-col>
    </v-row>
  </v-container>
</template>

<style lang="scss">
body {
  margin: 0;
}
</style>
