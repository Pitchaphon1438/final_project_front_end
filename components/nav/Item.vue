<template>
  <NuxtLink :to="to">
    <div class="flex flex-row  items-center px-2 h-8 hover:bg-gray-200">
      <div class="text-h5 w-1/4">
        <span :class="icon"></span>
      </div>
      <div class="align-middle self-center w-2/4 text-sm">

        {{ value }}

      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
const props = defineProps({
  icon: {type: String, default: ""},
  to: {type: String, default: ""},
  value: {type: String, default: ""},

})
</script>

<style scoped>
</style>
