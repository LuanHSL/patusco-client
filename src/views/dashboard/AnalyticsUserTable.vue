<script setup>
import { watch } from 'vue'

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
  () => {
    console.log('filterData', props.filterData)
  },
)

const headers = [
  { title: 'User', key: 'username' },
  { title: 'Animal Name', key: 'animalName' },
  { title: 'Date', key: 'date' },
  { title: 'Doctor', key: 'user.name' },
  { title: 'Actions', key: 'actions' },
]

const appointments = [
  {
    id: 16,
    name: 'Luan Henriqu',
    email: 'luan@luan.com',
    animalName: 'Rex',
    animalType: 'dog',
    animalAge: '10',
    prognostic: 'vomitando sangue',
    period: 'morning',
    date: '2024-11-19T00:00:00.000000Z',
    userId: null,
    user: null,
  },
  {
    id: 17,
    name: 'Luan',
    email: 'luan@luan.com',
    animalName: 'Rex',
    animalType: 'cat',
    animalAge: '4',
    prognostic: 'vomitando sangue',
    period: 'afternoon',
    date: '2024-11-20T00:00:00.000000Z',
    userId: null,
    user: {
      id: 2,
      name: 'Prof. Tyreek Runolfsdottir',
    },
  },
]

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

const deleteAppointment = id => {
  console.log({ id })
}
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
          icon="ri-close-line"
          color="error"
          class="me-2"
          @click="deleteAppointment(item.id)"
        />
        <RouterLink :to="`/account-settings/${item.id}`">
          <VBtn icon="ri-edit-box-line" />
        </RouterLink>
      </template>

      <template #bottom />
    </VDataTable>
  </VCard>
</template>
