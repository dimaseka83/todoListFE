import axios from 'axios'
import { useUser } from '@/stores/User'
import router from '@/router'

export const getInformationUser = async () => {
  const userStore = useUser()
  const token = localStorage.getItem('token')

  if (!token) {
    return
  }

  axios.defaults.baseURL = import.meta.env.VITE_API_URL
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

  try {
    const { data } = await axios.get('/auth/me')
    userStore.setUser(data)
  } catch (error) {
    userStore.logout()
    router.push({ name: 'login' })
  }
}
