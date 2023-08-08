<template>
  <NuxtLink :to="to">
    <button :class="buttonClass">
      <slot/>
    </button>
  </NuxtLink>
</template>

<script setup lang="ts">
import {computed, defineProps} from "@vue/runtime-core";

const props = defineProps({
  block: {
    type: Boolean,
    default: false
  },
  color: {
    type: String,
    default: 'default'
  },
  to: {
    type: String,
    default: "#"
  },

})


const buttonClass = computed(() => {
  let buttonClassName = ""
  if (props.color) {
    buttonClassName = `button-${props.color}`
  }
  console.log(buttonClassName)
  return {
    "w-full": props.block,
    "button": true,
    [buttonClassName]: true
  }
})


</script>

<style lang="scss">
.button.block {
  @apply w-full;
}

.button {
  @apply px-6 py-2.5  text-white font-medium text-xs leading-tight uppercase rounded shadow-md  hover:shadow-lg focus:bg-gray-700 focus:shadow-lg focus:outline-none focus:ring-0  active:shadow-lg transition duration-150 ease-in-out
}

.button.button-default {
  @apply bg-gray-500 hover:bg-gray-700 active:bg-gray-800
}

.button.button-primary {
  @apply bg-blue-500 hover:bg-blue-700 active:bg-blue-800
}

.button.button-danger {
  @apply bg-red-500 hover:bg-red-700 active:bg-red-800
}
</style>
