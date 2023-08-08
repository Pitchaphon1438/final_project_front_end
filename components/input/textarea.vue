<template>
  <div class="mb-2">
    <label for="" :class="labelClass">{{ label }}</label>
    <textarea :rows="rows"
           :value="modelValue"
           @input="$emit('update:modelValue', $event.target.value)"
           :class="inputClass"
           :placeholder="placeholder"></textarea>
    <small v-show="hasError" :class="msgErrorClassName">
      {{ getErrorMsg.join(", ") }} </small>
  </div>
</template>

<script setup lang="ts">

import {inputEmits, inputProps} from "~/components/input/input";

const props = defineProps({
  ...inputProps,
  rows : {type : [String,Number], default : 5}
})
defineEmits([
    ...inputEmits
])

const inputClass = computed(
    () => ({
      [props.inputFocusClassName]: !hasError.value,
      [props.errorClassName]: hasError.value,
      [props.inputClassName]: !!props.inputClassName
    })
)

const labelClass = computed(
    () => ({
      [props.labelErrorClassName]: hasError.value,
      [props.labelClassName]: !!props.labelClassName
    })
)

const getErrorMsg = computed(()=>{
  let errorMsg = []

  if (props.errors === true || props.errors === false) {
    return []
  } else {
    for (let i = 0; i < props.errors.length; i++) {
      if (props.errors[i].FailedField == props.errorKey) {
        errorMsg.push(props.errors[i].Msg)
      }
    }
  }

  return errorMsg
})

const hasError = computed(() => {

  if (props.errors === true || props.errors === false) {
    return props.errors
  } else {
    for (let i = 0; i < props.errors.length; i++) {
      if (props.errors[i].FailedField == props.errorKey) return true
    }
  }
  return false
})


</script>

<style scoped>
</style>
