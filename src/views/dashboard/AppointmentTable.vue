<script setup>
import { useAppointmentStore } from '@/store/appointmentStore'
import { useAuthStore } from '@/store/authStore'
import { onMounted, watch } from 'vue'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

const props = defineProps({
  filterData: {
    type: Object,
    default: () => {},
  },
  date: {
    type: String,
    default: '',
  },
})

watch(
  () => props.filterData,
  async() => {
    await fetchAppointments(props.filterData)
  },
)

const appointmentStore = useAppointmentStore()
const authStore = useAuthStore()

const headers = [
  { title: 'User', key: 'username' },
  { title: 'Animal Name', key: 'animalName' },
  { title: 'Date', key: 'date' },
  { title: 'Doctor', key: 'user.name' },
  { title: 'Actions', key: 'actions' },
]

const appointments = ref([])
const isLoading = ref(false)

const resolveAnimalTypeVariant = animalType => {
  const animalTypes = {
    cat: 'mdi-cat',
    dog: 'mdi-dog',
  }

  return animalTypes[animalType.toLowerCase()]
}

const resolvePeriodVariant = period => {
  const periods = {
    morning: 'Morning',
    afternoon: 'Afternoon',
  }

  return periods[period.toLowerCase()]
}

const formatDate = date => {
  const dateObj = new Date(date)

  dateObj.setUTCMinutes(dateObj.getUTCMinutes() + dateObj.getTimezoneOffset())

  return dateObj.toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
}

const deleteAppointment = async id => {
  try {
    isLoading.value = true
    await appointmentStore.deleteAppointment(id)

    appointments.value = appointments.value.filter(appointment => appointment.id !== id)

    toast.success('Appointment deleted successfully')
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
}

const fetchAppointments = async ({ date = null, animalType = null } = {}) => {
  try {
    if (authStore.isDoctor()) {
      await appointmentStore.fetchAppointmentsAsDoctor({ date, animalType })
    } else {
      await appointmentStore.fetchAppointments({ date, animalType })
    }

    appointments.value = appointmentStore.appointments
  } catch (error) {
    console.error(error)
  }
}

onMounted(async() => {
  await fetchAppointments()
})
</script>

<template>
  <VCard>
    <VDataTable
      :headers="headers"
      :items="appointments"
      item-value="id"
      class="text-no-wrap"
    >
      <template #item.username="{ item }">
        <div class="d-flex align-center gap-x-4">
          <div class="d-flex flex-column">
            <h6 class="text-h6 font-weight-medium user-list-name">
              {{ item.name }}
            </h6>

            <span class="text-sm text-medium-emphasis">{{ item.email }}</span>
          </div>
        </div>
      </template>

      <template #item.animalName="{ item }">
        <div class="d-flex gap-4">
          <VIcon
            :icon="resolveAnimalTypeVariant(item.animalType)"
            size="22"
          />
          <div class="text-capitalize text-high-emphasis">
            {{ item.animalName }}
          </div>
        </div>
      </template>

      <template #item.date="{ item }">
        <div class="d-flex align-center gap-x-4">
          <div class="d-flex flex-column">
            <h6 class="text-h6 font-weight-medium user-list-name">
              {{ formatDate(item.date) }}
            </h6>

            <span class="text-sm text-medium-emphasis">{{ resolvePeriodVariant(item.period) }}</span>
          </div>
        </div>
      </template>

      <template #item.actions="{ item }">
        <VBtn
          v-if="authStore.isReceptionist()"
          icon="ri-close-line"
          color="error"
          class="me-2"
          :loading="isLoading"
          @click="deleteAppointment(item.id)"
        />
        <RouterLink :to="{ name: 'me-appointment', params: { id: item.id } }">
          <VBtn icon="ri-edit-box-line" />
        </RouterLink>
      </template>

      <template #bottom />
    </VDataTable>
  </VCard>
</template>
