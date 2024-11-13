<script setup>
import { onMounted } from 'vue'

const route = useRoute()

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
  { text: 'Morning', name: 'morning' },
  { text: 'Afternoon', name: 'afternoon' },
]

const doctors = [
  { id: 2, name: 'Doctor 1' },
  { id: 3, name: 'Doctor 2' },
  { id: 4, name: 'Doctor 3' },
]

const submit = async () => {
  const { valid } = await appointmentForm.value.validate()
  if (!valid) return

  console.log(appointmentDataLocal.value)
}

onMounted(() => {
  const { id } = route.params

  if (id) {
    appointmentDataLocal.value = {
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      animalName: 'Felix',
      animalAge: 3,
      date: '2023-01-01',
      animalType: 'cat',
      prognostic: 'Healthy',
      period: 'morning',

      // userId: 3,
    }
  }

  // console.log(parseInt(id, 10))
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
                  placeholder="ThemeSelection"
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
