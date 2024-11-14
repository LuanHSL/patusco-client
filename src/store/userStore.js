import axios from 'axios'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    doctors: [],
  }),
  actions: {
    async fetchDoctors() {
      try {
        const response = await axios.get('/user/doctors')

        this.doctors = response.data
      } catch (e) {
        console.error(e)
      }
    },
  },
})
