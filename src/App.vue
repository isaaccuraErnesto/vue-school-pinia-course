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
