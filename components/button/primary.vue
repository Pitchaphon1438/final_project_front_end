<template>
  <default color="primary" :to="to" :block="block"
  ><slot></slot></default>
</template>

<script setup lang="ts">
import Default from "~/components/button/default.vue";
import {defineProps} from "@vue/runtime-core";

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
</script>

<style>

</style>
