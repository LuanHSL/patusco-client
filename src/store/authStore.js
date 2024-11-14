import axios from 'axios'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')),
    token: localStorage.getItem('token'),
  }),
  actions: {
    async login(email, password) {
      try {
        const response = await axios.post('/login', { email, password })

        const { user, token } = response.data

        this.token = token
        this.user = user
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(user))
      } catch (e) {
        console.error(e)
        throw e
      }
    },

    async logout() {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    },

    isLoggedIn() {
      return !!this.token
    },

    isDoctor() {
      return this.user?.role === 'doctor'
    },

    isReceptionist() {
      return this.user?.role === 'receptionist'
    },
  },
})
