<script setup>
import { useAppointmentStore } from '@/store/appointmentStore'
import { useAuthStore } from '@/store/authStore'
import { useUserStore } from '@/store/userStore'
import { onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const userStore = useUserStore()
const appointmentStore = useAppointmentStore()

watch(
  () => route.params.id,
  async() => {
    window.location.reload()
  },
)

const appointmentData = {
  name: '',
  email: '',
  animalName: '',
  animalAge: null,
  date: '',
  animalType: null,
  prognostic: '',
  period: null,
  userId: null,
}

const appointmentForm = ref(null)

const fieldRules = ref([
  value => {
    if (value) return true

    return 'Field is required.'
  },
])

const emailRules = ref([
  value => {
    if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true

    return 'Must be a valid e-mail.'
  },
])

const appointmentDataLocal = ref(structuredClone(appointmentData))

const animalType = [
  { text: 'Cat', value: 'cat' },
  { text: 'Dog', value: 'dog' },
]

const period = [
  { text: 'Morning', value: 'morning' },
  { text: 'Afternoon', value: 'afternoon' },
]

const doctors = ref([])

const submit = async () => {
  const { valid } = await appointmentForm.value.validate()
  if (!valid) return

  const { id } = route.params

  try {
    if (id) {
      if (authStore.isDoctor()) {
        await updateAppointmentAsDoctor(parseInt(id, 10))
      } else {
        await updateAppointment(parseInt(id, 10))
      }
    } else {
      await createAppointment()
    }
  
    if (authStore.isLoggedIn()) {
      router.push({ name: 'dashboard' })
    }

    toast.success('Appointment saved successfully')
  } catch (error) {
    console.error(error)
  }

}

const fetchDoctors = async () => {
  try {
    await userStore.fetchDoctors()
  } catch (error) {
    console.error(error)
  }
}

const fetchAppointmentById = async id => {
  try {
    await appointmentStore.fetchAppointmentById(id)
  } catch (error) {
    console.error(error)
  }
}

const fetchAppointmentByIdAsDoctor = async id => {
  try {
    await appointmentStore.fetchAppointmentByIdAsDoctor(id)
  } catch (error) {
    console.error(error)
  }
}

const createAppointment = async () => {
  try {
    await appointmentStore.createAppointment(appointmentDataLocal.value)
  } catch (error) {
    console.error(error)
    throw error
  }
}

const updateAppointment = async id => {
  try {
    await appointmentStore.updateAppointment(id, appointmentDataLocal.value)
  } catch (error) {
    console.error(error)
    throw error
  }
}

const updateAppointmentAsDoctor = async id => {
  try {
    await appointmentStore.updateAppointmentAsDoctor(id, appointmentDataLocal.value)
  } catch (error) {
    console.error(error)
    throw error
  }
}

onMounted(async () => {
  if (authStore.isReceptionist()) {
    await fetchDoctors()
    doctors.value = userStore.doctors
  }

  const { id } = route.params

  if (id) {
    if (authStore.isDoctor()) {
      await fetchAppointmentByIdAsDoctor(parseInt(id, 10))
    } else {
      await fetchAppointmentById(parseInt(id, 10))
    }
    appointmentDataLocal.value = appointmentStore.appointment
  }
})
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard title="Account Details">
        <VCardText>
          <VForm
            ref="appointmentForm"
            class="mt-6"
            @submit.prevent="submit"
          >
            <VRow>
              <VCol
                md="6"
                cols="12"
              >
                <VTextField
                  v-model="appointmentDataLocal.name"
                  placeholder="John"
                  label="Your Name"
                  :rules="fieldRules"
                  required
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <VTextField
                  v-model="appointmentDataLocal.email"
                  label="Your E-mail"
                  placeholder="johndoe@gmail.com"
                  type="email"
                  :rules="emailRules"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <VTextField
                  v-model="appointmentDataLocal.animalName"
                  label="Animal Name"
                  placeholder="Rex"
                  :rules="fieldRules"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <VTextField
                  v-model="appointmentDataLocal.animalAge"
                  label="Animal Age"
                  type="number"
                  placeholder="4"
                  :rules="fieldRules"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <VSelect
                  v-model="appointmentDataLocal.animalType"
                  label="Animal Type"
                  placeholder="Select Animal Type"
                  :items="animalType"
                  item-title="text"
                  item-value="value"
                  :rules="fieldRules"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <VTextField
                  v-model="appointmentDataLocal.prognostic"
                  label="Prognostic"
                  placeholder="Write animal's prognostic here"
                  :rules="fieldRules"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <VTextField
                  v-model="appointmentDataLocal.date"
                  label="Date"
                  type="date"
                  placeholder="Select Date"
                  :rules="fieldRules"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <VSelect
                  v-model="appointmentDataLocal.period"
                  label="Period"
                  placeholder="Select Period"
                  :items="period"
                  item-title="text"
                  item-value="value"
                  :rules="fieldRules"
                />
              </VCol>

              <VCol
                v-if="authStore.isReceptionist()"
                cols="12"
                md="6"
              >
                <VSelect
                  v-model="appointmentDataLocal.userId"
                  label="Doctor"
                  placeholder="Select Doctor"
                  :items="doctors"
                  item-title="name"
                  item-value="id"
                />
              </VCol>

              <VCol
                cols="12"
                class="d-flex flex-wrap gap-4"
              >
                <VBtn type="submit">
                  Save changes
                </VBtn>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>
