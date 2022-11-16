import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const customerInformationStore = defineStore('information', () => {
  const email = ref('')

  return { email }
})
