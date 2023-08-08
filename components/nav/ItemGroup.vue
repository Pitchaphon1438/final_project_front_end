<template>

  <div class="flex flex-col space-y-1">

    <slot name="activator" :state="state" :open="open" ></slot>

    <VExpandTransition>
    <div v-show="state" class="overflow-hidden flex flex-col items-center-px-2 space-y-1">
      <slot/>
    </div>
    </VExpandTransition>
  </div>

</template>

<script setup lang="ts">
import {ref} from "vue";

const props = defineProps({
  icon: {type: String, default: ""},
  to: {type: String, default: ""},
  value: {type: String, default: ""},

})

const state = ref(true)
function open(){
  state.value = !state.value
}

</script>

<style scoped>
.v-enter-active ,
.v-leave-active {
  transition: opacity 0.5s ease;

}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  height: 0;
}
</style>
