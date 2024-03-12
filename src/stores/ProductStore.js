import { acceptHMRUpdate, defineStore } from "pinia"

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

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useProductStore, import.meta.hot))
}