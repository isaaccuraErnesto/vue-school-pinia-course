<template>
  <button class="bg-gray-700 text-white rounded p-2 text-sm">
    <slot></slot>
  </button>
</template>

<style lang="pcss" scoped>
.primary {
  @apply bg-green-500 border-2 border-green-600;
}
.secondary {
  @apply bg-gray-500 border-2 border-gray-600;
}
[disabled] {
  @apply bg-gray-300 border-2 border-gray-400;
  cursor: not-allowed;
}
</style>
