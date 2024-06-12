import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Ref } from 'vue'

interface State {
  error: Ref<string>
}

export const useError = defineStore('error', {
  state: (): State => ({
    error: ref('')
  }),
  getters: {
    getError(): string {
      return this.error
    }
  },
  actions: {
    setError(payload: string): void {
      this.error = payload
    },
    clearError(): void {
      this.error = ''
    }
  }
})
