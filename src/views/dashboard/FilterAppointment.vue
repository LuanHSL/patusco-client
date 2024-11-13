<script setup>
const emit = defineEmits(['filter'])

const filterData = {
  date: '',
  animalType: null,
}

const filterDataLocal = ref(structuredClone(filterData))


const animalType = [
  { text: 'Cat', value: 'cat' },
  { text: 'Dog', value: 'dog' },
]

const filter = () => {
  emit('filter', filterDataLocal.value)
}
</script>

<template>
  <VCard>
    <VCardText>
      <VCol cols="12">
        <VRow>
          <VCol
            md="4"
            cols="12"
          >
            <VTextField
              v-model="filterDataLocal.date"
              label="Select date"
              type="date"
              clearable
            />
          </VCol>
          <VCol
            cols="12"
            md="4"
          >
            <VSelect
              v-model="filterDataLocal.animalType"
              label="Animal Type"
              placeholder="Select Animal Type"
              :items="animalType"
              item-title="text"
              item-value="value"
              :rules="fieldRules"
              clearable
            />
          </VCol>
  
          <VCol
            cols="12"
            md="4"
            class="d-flex flex-wrap gap-4"
          >
            <VBtn
              type="submit"
              size="x-large"
              block
              @click="filter"
            >
              Filter
            </VBtn>
          </VCol>
        </VRow>
      </VCol>
    </VCardText>
  </VCard>
</template>
