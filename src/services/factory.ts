import { getCurrentInstance } from 'vue'
import { useAxios } from '../composables/useAxios'
import { useSnackbar } from '@/composables/useSnackbar'

export function createAxiosInstance() {
  const instance = getCurrentInstance()
  if (!instance) {
    throw new Error('This function must be called within the setup function of a Vue component.')
  }
  return useAxios()
}

export function createSnackbarInstance() {
  const instance = getCurrentInstance()
  if (!instance) {
    throw new Error('This function must be called within the setup function of a Vue component.')
  }
  return useSnackbar()
}
