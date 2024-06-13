import { defineStore } from 'pinia'

interface State {
  user: {
    name: string
    email: string
    password: string
  }
}

export const useUser = defineStore('user', {
  state: (): State => ({
    user: {
      name: '',
      email: '',
      password: ''
    }
  }),
  getters: {
    getUser(): State['user'] {
      return this.user
    },
    isAuthenticated(): boolean {
      return !!this.user.name
    }
  },
  actions: {
    setUser(payload: State['user']): void {
      this.user = payload
    },
    clearUser(): void {
      this.user = {
        name: '',
        email: '',
        password: ''
      }
    }
  }
})
