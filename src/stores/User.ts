import { defineStore } from 'pinia'

interface User {
  name: string
  email: string
  password: string
}

interface State {
  user: User
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
    isAuthenticated(): boolean {
      return !!this.user.name
    }
  },
  actions: {
    setUser(payload: User): void {
      this.user = payload
    },
    logout(): void {
      this.user = {
        name: '',
        email: '',
        password: ''
      }
    }
  }
})
