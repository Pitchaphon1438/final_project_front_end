<template>
  <div class="bg-gray-200 h-screen">
    <div class="flex flex-col">


      DATA : <input type="text" name="data" v-model="somedata.data01"/>
      DATA2 : <input type="text" name="data2" v-model="somedata.data02"/>

      <ButtonDefault @click="btnClicked">Click</ButtonDefault>

    </div>

  </div>

</template>

<script setup lang="ts">

import {reactive, ref} from "vue";
import {$axios} from "~/plugins/axios";

// let data01 = ref(10)
// let data02 = ref(20)

let somedata = reactive({
  'data01': 10,
  'data02': 20,
})

async function btnClicked() {
  console.log("HELLO WORLD", somedata.data01, somedata.data02);

  let response = await $axios.post("/api/room",somedata)
      .then(response => response)
      .catch(error => error.respond)

  let data = response.data
}

</script>

<style scoped>

</style>