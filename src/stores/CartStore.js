import { computed, ref } from "vue"
import { defineStore } from "pinia"

export const useCartStore = defineStore('CartStore', () => {
  const products = ref([])

  const idGroupedProducts = computed(() => {
    return products.value.reduce((groupedProducts, product) => {
      const clonedProduct = { ...product }

      const { id } = clonedProduct

      if (Object.hasOwn(groupedProducts, id)) {
        groupedProducts[id].push(clonedProduct)
      } else {
        groupedProducts[id] = [clonedProduct]
      }

      return groupedProducts
    }, {})
  })

  const productCountById = computed(() => id => idGroupedProducts.value[id].length)

  const totalProductCount = computed(() => products.value.length)

  const grandTotal = computed(() => {
    return products.value.reduce((subTotal, product) => {
      return subTotal + product.price
    }, 0)
  })

  function addToCart(product, productCount) {
    const clonedProduct = { ...product }

    const parsedCount = parseInt(productCount)

    for (let i = 0; i < parsedCount; i++) {
      products.value.push(clonedProduct)
    }
  }

  function updateProductCount(product, productCount) {
    // Remove all current instances of the product in the cart
    removeProduct(product)

    // Add the product back with the new count
    addToCart(product, productCount)
  }

  function removeProduct(product) {
    const { id: productId } = product

    products.value = products.value.filter(product => product.id !== productId)
  }

  function clearCart() {
    products.value = []
  }

  return {
    /* State */
    products,
    /* Getters */
    idGroupedProducts,
    grandTotal,
    productCountById,
    totalProductCount,
    /* Actions */
    addToCart,
    clearCart,
    removeProduct,
    updateProductCount
  }
})
