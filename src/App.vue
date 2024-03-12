<script setup>
import { onMounted } from "vue"

import { useProductStore } from "@/stores/ProductStore"
import { useCartStore } from "@/stores/CartStore"

import TheHeader from "@/components/TheHeader.vue"
import ProductCard from "@/components/ProductCard.vue"

const productStore = useProductStore()
const cartStore = useCartStore()

onMounted(() => {
  productStore.getProducts()
})
</script>

<template>
  <div class="container">
    <TheHeader />
    <div class="flex justify-end gap-2 mb-5">
      <AppButton :disabled="cartStore.history.length < 2" class="secondary" @click="cartStore.undo">Undo</AppButton>
      <AppButton :disabled="cartStore.future.length < 1" class="secondary" @click="cartStore.redo">Redo</AppButton>
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
