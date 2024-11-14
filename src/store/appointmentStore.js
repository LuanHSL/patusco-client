import axios from 'axios'
import { defineStore } from 'pinia'

export const useAppointmentStore = defineStore('appointment', {
  state: () => ({
    appointments: [],
    appointment: null,
  }),
  actions: {
    async fetchAppointments({ date = null, animalType = null } = {}) {
      try {
        const response = await axios.get('/appointment', { params: { date, animalType } })

        this.appointments = response.data
      } catch (e) {
        console.error(e)
        throw e
      }
    },

    async fetchAppointmentsAsDoctor({ date = null, animalType = null } = {}) {
      try {
        const response = await axios.get('/appointment/all/getByUser', { params: { date, animalType } })

        this.appointments = response.data
      } catch (e) {
        console.error(e)
        throw e
      }
    },

    async fetchAppointmentById(id) {
      try {
        const response = await axios.get(`/appointment/${id}`)

        this.appointment = response.data
      } catch (e) {
        console.error(e)
        throw e
      }
    },

    async fetchAppointmentByIdAsDoctor(id) {
      try {
        const response = await axios.get(`/appointment/${id}/showByUser`)

        this.appointment = response.data
      } catch (e) {
        console.error(e)
        throw e
      }
    },

    async createAppointment(data) {
      try {
        await axios.post('/appointment', data)
      } catch (e) {
        console.error(e)
        throw e
      }
    },

    async updateAppointment(id, data) {
      try {
        await axios.put(`/appointment/${id}`, data)
      } catch (e) {
        console.error(e)
        throw e
      }
    },

    async updateAppointmentAsDoctor(id, data) {
      try {
        await axios.put(`/appointment/${id}/updateByUser`, data)
      } catch (e) {
        console.error(e)
        throw e
      }
    },

    async deleteAppointment(id) {
      try {
        await axios.delete(`/appointment/${id}`)
      } catch (e) {
        console.error(e)
        throw e
      }
    },
  },
})
