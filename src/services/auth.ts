import { nextTick } from 'vue'
import { useError } from '../stores/Error'
import { useUser } from '../stores/User'
import router from '@/router'
import axios from 'axios'

export const getInformationUser = async () => {
  const { setUser } = useUser()
  const { setError } = useError() // Provide the second argument to useError function
  axios.defaults.baseURL = import.meta.env.VITE_API_URL as string
  axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}` ?? ''

  try {
    const { data } = await axios.get('/auth/me')
    setUser(data)
    nextTick(() => {
      router.push({ name: 'tasks' }) // Update the name to the correct route name
    })
  } catch (error: any) {
    // Explicitly type 'error' as 'any'
    router.push({ name: 'login' }) // Update the name to the correct route name
    console.log(error)
    setError(error.message as string)
  }
}
