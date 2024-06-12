import { inject } from 'vue'

export const useAxios = () => {
  const axiosGet = inject<(url: string) => Promise<any>>('get')
  const axiosPost = inject<(url: string, body: any) => Promise<any>>('post')
  const axiosDelete = inject<(url: string) => Promise<any>>('delete')

  if (!axiosGet || !axiosPost || !axiosDelete) {
    throw new Error('Axios functions are not provided')
  }

  return {
    axiosGet,
    axiosPost,
    axiosDelete
  }
}
