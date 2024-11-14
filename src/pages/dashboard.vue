<script setup>
import AppointmentFilter from '@/views/dashboard/AppointmentFilter.vue'
import AppointmentTable from '@/views/dashboard/AppointmentTable.vue'
import { ref } from 'vue'

const filterData = ref({})

const filter = data => {
  filterData.value = { ...data }
}
</script>

<template>
  <VRow class="match-height">
    <VCol cols="12">
      <AppointmentFilter @filter="filter" />
    </VCol>

    <VCol cols="12">
      <AppointmentTable :filter-data="filterData" />
    </VCol>
  </VRow>
</template>
