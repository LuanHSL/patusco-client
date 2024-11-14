import { useAuthStore } from '@/store/authStore'
import axios from 'axios'

axios.defaults.baseURL = import.meta.env.VITE_URL_API

axios.interceptors.request.use(
  config => {
    const { token } = useAuthStore()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
)
