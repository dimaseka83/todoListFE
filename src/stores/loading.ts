import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Ref } from 'vue'

interface State {
  loading: Ref<boolean>
}

export const useLoading = defineStore('loading', {
  state: (): State => ({
    loading: ref(false)
  }),
  getters: {
    getLoading(): boolean {
      return this.loading
    }
  },
  actions: {
    setLoading(payload: boolean): void {
      this.loading = payload
    }
  }
})
