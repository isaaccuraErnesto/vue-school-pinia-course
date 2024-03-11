<script setup>
import { ref } from "vue"
import AppCountInput from "@/components/AppCountInput.vue"

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

defineEmits(["addToCart"])

const count = ref(0)
</script>

<template>
  <li class="card">
    <img :src="`/images/${props.product.image}`" :alt="`An image of the product ${props.product.name}`" class="mb-3" width="300" />
    <div>
      {{ props.product.name }} - <span class="text-green-500">${{props.product.price}}</span>
      <div class="text-center m-4">
        <AppCountInput v-model="count" />
      </div>
      <AppButton
        class="primary" @click="$emit('addToCart', count), (count = 0)">Add to Cart</AppButton>
    </div>
  </li>
</template>
