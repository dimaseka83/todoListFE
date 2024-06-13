import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Ref } from 'vue'

interface State {
  success: Ref<string>
}

export const useSuccess = defineStore('sucess', {
  state: (): State => ({
    success: ref('')
  }),
  getters: {
    getSuccess(): string {
      return this.success
    }
  },
  actions: {
    setSuccess(payload: string): void {
      this.success = payload
    },
    clearSuccess(): void {
      this.success = ''
    }
  }
})
