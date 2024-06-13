import { useError } from '@/stores/Error'
import { useSuccess } from '@/stores/Success'

export const useSnackbar = () => {
  const errorStore = useError()
  const successStore = useSuccess()

  const setError = (payload: string) => {
    errorStore.setError(payload)
  }

  const clearError = () => {
    errorStore.clearError()
  }

  const setSuccess = (payload: string) => {
    successStore.setSuccess(payload)
  }

  const clearSuccess = () => {
    successStore.clearSuccess()
  }

  return {
    setError,
    clearError,
    setSuccess,
    clearSuccess
  }
}
