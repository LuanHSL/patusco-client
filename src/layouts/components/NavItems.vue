<script setup>
import { useAuthStore } from '@/store/authStore'
import VerticalNavLink from '@layouts/components/VerticalNavLink.vue'

const authStore = useAuthStore()
</script>

<template>
  <VerticalNavLink
    :item="{
      title: 'Dashboard',
      icon: 'ri-home-smile-line',
      to: { name: 'dashboard' },
    }"
  />

  <VerticalNavLink
    v-if="authStore.isReceptionist()"
    :item="{
      title: 'Appointment',
      icon: 'ri-time-line',
      to: { name: 'me-appointment' },
    }"
  />
</template>
