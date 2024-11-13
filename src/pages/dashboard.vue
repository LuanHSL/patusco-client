<script setup>
import AnalyticsUserTable from '@/views/dashboard/AnalyticsUserTable.vue'
import FilterAppointment from '@/views/dashboard/FilterAppointment.vue'
import { ref } from 'vue'

const filterData = ref({})

const filter = data => {
  filterData.value = { ...data }
}
</script>

<template>
  <VRow class="match-height">
    <VCol cols="12">
      <FilterAppointment @filter="filter" />
    </VCol>

    <VCol cols="12">
      <AnalyticsUserTable :filter-data="filterData" />
    </VCol>
  </VRow>
</template>
