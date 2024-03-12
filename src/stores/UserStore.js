import { defineStore } from "pinia"
import { ref } from "vue"

export const useUserStore = defineStore('UserStore', () => {
  const user = ref({
    fullName: 'Ernesto Isaaccura',
  })

  return {
    /* State */
    user
  }
})