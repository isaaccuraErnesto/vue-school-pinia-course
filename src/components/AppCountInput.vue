<script setup>
defineProps({
  modelValue: {
    type: [Number, String],
    default: 0
  },
})

const emit = defineEmits(["update:modelValue", "input"])

const updateValue = (value) => emit("update:modelValue", value)

const handleInput = (event) => {
  const value = parseInt(event.target.value)

  if (!isNaN(value)) updateValue(value)
}
</script>
<template>
  <span>
    <button
      class="cursor-pointer bg-gray-200 px-2 rounded-l"
      @click="updateValue(modelValue > 0 ? modelValue - 1 : null)">
      -
    </button>
    <input :value="modelValue" type="number" min="0" aria-label="count" @input="handleInput" />
    <button
      class="bg-gray-200 px-2 rounded-r cursor-pointer"
      @click="updateValue(modelValue + 1)">
      +
    </button>
  </span>
</template>

<style lang="pcss" scoped>
input[type="number"] {
  appearance: none;
  -moz-appearance: textfield;
  border: 1px solid gray;
  @apply border-gray-500 w-10 text-center;
}
button {
  border: 1px solid gray;
}
</style>
