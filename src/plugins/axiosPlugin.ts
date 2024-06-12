import axios from 'axios'
import type { App } from 'vue'

axios.defaults.baseURL = import.meta.env.VITE_API_URL as string
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}` ?? ''

const _get = async (url: string) => {
  try {
    const { data } = await axios.get(url)
    return { success: true, data }
  } catch (error: any) {
    return { success: false, message: error.response?.data?.message || error.message }
  }
}

const _post = async (url: string, body: any) => {
  try {
    const { data } = await axios.post(url, body)
    return { success: true, data }
  } catch (error: any) {
    return { success: false, message: error.response?.data?.message || error.message }
  }
}

const _delete = async (url: string) => {
  try {
    const { data } = await axios.delete(url)
    return { success: true, data }
  } catch (error: any) {
    return { success: false, message: error.response?.data?.message || error.message }
  }
}

export default {
  install: (app: App) => {
    app.provide('get', _get)
    app.provide('post', _post)
    app.provide('delete', _delete)
  }
}
