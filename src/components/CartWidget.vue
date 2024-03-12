<script setup>
import { ref } from "vue"

import { useCartStore } from "@/stores/CartStore"

import CartItem from "./CartItem.vue"

const cartStore = useCartStore()

const active = ref(false)

const handleCheckout = () => {
  active.value = false

  cartStore.checkout()
}
</script>
<template>
  <div class="relative">
    <!-- Icon that always shows -->
    <span class="cursor-pointer" @click="active = true">
      <fa icon="shopping-cart" size="lg" class="text-gray-700" />
      <div class="cart-count absolute">{{cartStore.totalProductCount}}</div>
    </span>
    <!-- Modal Overlay only shows when cart is clicked on -->
    <AppModalOverlay :active="active" @close="active = false">
      <div v-if="cartStore.totalProductCount > 0">
        <ul class="items-in-cart">
          <CartItem
            v-for="(products, productId) in cartStore.idGroupedProducts"
            :key="productId"
            :product="products[0]"
            :count="cartStore.productCountById(productId)"
            @updateCount="(count) => cartStore.updateProductCount(products[0], count)"
            @clear="cartStore.removeProduct(products[0])" />
        </ul>
        <div class="flex justify-end text-2xl mb-5">
          Total: <strong>{{ `$${cartStore.grandTotal}` }}</strong>
        </div>
        <div class="flex justify-end">
          <AppButton class="secondary mr-2" @click="cartStore.clearCart">Clear Cart</AppButton>
          <AppButton class="primary" @click="handleCheckout">Checkout</AppButton>
        </div>
      </div>
      <div v-else><em>Cart is Empty</em></div>
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
