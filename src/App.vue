<script setup>
import { onMounted, reactive, ref } from "vue"

import { useProductStore } from "@/stores/ProductStore"
import { useCartStore } from "@/stores/CartStore"

import TheHeader from "@/components/TheHeader.vue"
import ProductCard from "@/components/ProductCard.vue"
import AppButton from "@/components/AppButton.vue"

const productStore = useProductStore()
const cartStore = useCartStore()

const history = reactive([])

const doingHistory = ref(false)

history.push(JSON.stringify(cartStore.$state))

const future = reactive([])

const undo = () => {
  if (history.length > 1) {
    doingHistory.value = true
    future.push(history.pop())
    cartStore.$state = JSON.parse(history.at(-1))
    doingHistory.value = false
  }
}

const redo = () => {
  const latestHistoryState = future.pop()

  if (latestHistoryState) {
    doingHistory.value = true
    history.push(latestHistoryState)
    cartStore.$state = JSON.parse(latestHistoryState)
    doingHistory.value = false
  }
}

cartStore.$subscribe((_mutation, state) => {
  if (!doingHistory.value) {
    history.push(JSON.stringify(state))
    // Clears the future history while maintaining reactivity
    future.splice(0)
  }
})

cartStore.$onAction(({ name, /*store,*/ args, after, onError }) => {
  if (name === "addToCart") {
    // console.log(store)

    after(() => {
      console.log(`Added ${args[0].name} to cart`)
    })

    onError((error) => {
      console.error(error)
    })
  }
})

onMounted(() => {
  productStore.getProducts()
})
</script>

<template>
  <div class="container">
    <TheHeader />
    <div class="flex justify-end gap-2 mb-5">
      <AppButton :disabled="history.length < 2" class="secondary" @click="undo">Undo</AppButton>
      <AppButton :disabled="future.length < 1" class="secondary" @click="redo">Redo</AppButton>
    </div>
    <ul class="sm:flex flex-wrap lg:flex-nowrap gap-5">
      <ProductCard
      v-for="product in productStore.products"
      :key="product.name"
      :product="product"
      @addToCart="(count) => cartStore.addToCart(product, count)"
      />
    </ul>
  </div>
</template>
