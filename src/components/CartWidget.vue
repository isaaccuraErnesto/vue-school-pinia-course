<script setup>
import { ref } from "vue"

import { useCartStore } from "@/stores/CartStore"

import CartItem from "./CartItem.vue"

const cartStore = useCartStore()

const active = ref(false)
</script>
<template>
  <div class="relative">
    <!-- Icon that always shows -->
    <span class="cursor-pointer" @click="active = true">
      <fa icon="shopping-cart" size="lg" class="text-gray-700" />
      <div class="cart-count absolute">{{cartStore.totalProducts}}</div>
    </span>
    <!-- Modal Overlay only shows when cart is clicked on -->
    <AppModalOverlay :active="active" @close="active = false">
      <div>
        <ul class="items-in-cart">
          <CartItem
            v-for="product in cartStore.cart"
            :key="product.id"
            :product="product"
            :count="product.count"
            @updateCount="(count) => cartStore.updateProductCount(product, count)"
            @clear="cartStore.removeProduct(product)" />
        </ul>
        <div class="flex justify-end text-2xl mb-5">
          Total: <strong>{{ `$${cartStore.grandTotal}` }}</strong>
        </div>
        <div class="flex justify-end">
          <AppButton class="secondary mr-2">Clear Cart</AppButton>
          <AppButton class="primary">Checkout</AppButton>
        </div>
      </div>
      <!-- Uncomment and use condition to show when cart is empty -->
      <!-- <div><em>Cart is Empty</em></div> -->
    </AppModalOverlay>
  </div>
</template>
<style lang="pcss" scoped>
.items-in-cart{
  @apply mb-5;
}
.items-in-cart li{
  @apply flex justify-between p-2;
}
.items-in-cart li:nth-of-type(even){
  @apply bg-gray-300;
}
</style>
