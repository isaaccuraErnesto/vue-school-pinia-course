import { defineStore } from "pinia"

export const useProductStore = defineStore('ProductStore', {
  // State
  state: () => ({
    products: []
  }),

  // Actions
  actions: {
    async getProducts() {
      this.products = (await import("@/data/products.json")).default
    }
  }
})