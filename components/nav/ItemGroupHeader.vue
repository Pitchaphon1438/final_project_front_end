<template>

  <div @click="open" class="flex flex-row items-center  px-2 h-8 hover:bg-gray-200 hover:cursor-pointer">
    <div class="text-h5 w-1/4">
      <span :class="icon"></span>
    </div>
    <div class="align-middle self-center w-2/4 text-sm">
      {{ value }}
    </div>
    <div class="text-h5 w-1/4 text-right">
      <span :class="stateClass"></span>
    </div>
  </div>

</template>

<script setup lang="ts">
import {computed} from "vue";

const props = defineProps({
  icon: {type: String, default: ""},
  to: {type: String, default: ""},
  value: {type: String, default: ""},
  state: {type: Boolean, default: false},
  open: Function,
})

const stateClass = computed(() => {
  if (props.state) {
    return "mdi mdi-chevron-up"
  } else {
    return "mdi mdi-chevron-down"
  }
})

</script>

<style scoped>
</style>
