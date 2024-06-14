import { defineStore } from 'pinia'
import axios from 'axios'

interface UserState {
  user: any
  isAuthenticated: boolean
}

interface User {
  id: number
  name: string
  email: string
}

export const useUser = defineStore('user', {
  state: (): UserState => ({
    user: null,
    isAuthenticated: false
  }),
  actions: {
    async fetchUser() {
      try {
        const { data } = await axios.get('/auth/me')
        this.user = data
        this.isAuthenticated = true
      } catch (error) {
        this.isAuthenticated = false
        throw error
      }
    },
    setUser(user: User) {
      this.user = user
      this.isAuthenticated = true
    },
    logout() {
      this.user = null
      this.isAuthenticated = false
      localStorage.removeItem('token')
    }
  }
})
