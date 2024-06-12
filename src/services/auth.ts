import { nextTick } from 'vue'
import { createAxiosInstance } from './factory'
import { useError } from '../stores/Error'
import { useUser } from '../stores/User'
import { useRouter } from 'vue-router'

export const getInformationUser = async () => {
  const { setError } = useError()
  const { axiosPost } = createAxiosInstance()
  const { setUser } = useUser()
  const router = useRouter()

  try {
    const { success, data, message } = await axiosPost('/auth/me')

    if (!success) {
      setError(message)
      await nextTick(() => {
        router.push('/')
      })
    }

    setUser(data)
    await nextTick(() => {
      router.push('/tasks')
    })
  } catch (error) {
    setError(error.message as string)
  }
}
