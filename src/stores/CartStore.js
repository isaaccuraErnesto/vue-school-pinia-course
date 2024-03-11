import { computed, ref } from "vue"
import { defineStore } from "pinia"

export const useCartStore = defineStore('CartStore', () => {
  const cart = ref({})

  const totalProducts = computed(() => {
    return Object.values(cart.value).reduce((acc, product) => {
      return acc + product.count
    }, 0)
  })

  const grandTotal = computed(() => {
    return Object.values(cart.value).reduce((acc, product) => {
      return acc + product.count * product.price
    }, 0)
  })

  function addToCart(product, productCount) {
    const clonedProduct = { ...product }

    const { id: productId } = clonedProduct

    const parsedCount = parseInt(productCount)

    const addingExtra = Object.hasOwn(cart.value, productId)

    cart.value[productId] = {
      ...clonedProduct,
      count: addingExtra ? cart.value[productId].count + parsedCount : parsedCount
    }
  }

  function updateProductCount(product, newCount) {
    const { id: productId } = product

    cart.value[productId].count = newCount
  }

  function removeProduct(product) {
    const { id: productId } = product

    delete cart.value[productId]
  }

  function clearCart() {
    cart.value = {}
  }

  return { cart, grandTotal, totalProducts, addToCart, clearCart, removeProduct, updateProductCount }
})
