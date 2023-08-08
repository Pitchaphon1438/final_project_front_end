<template>
  <NuxtLayout name="app">
    <template #breadcrumb>
      <Breadcrumb :items="breadcrumbs"/>
    </template>

    <template #page-header>
      Edit Room

    </template>

    <template #default>
      <form>
        <InputText placeholder="Room Number" label="Room Number" v-model="rss.updateForm.RoomNumber" :errors="formError" errorKey="RoomNumber"/>

        <ButtonPrimary @click="updateRooms">Submit</ButtonPrimary>
        <ButtonDefault class="ml-3" to="/console/rooms">Cancel</ButtonDefault>
      </form>

    </template>
  </NuxtLayout>
</template>
<script setup lang="ts">

import {useRoute} from "#app";
import { useToast } from 'vue-toastification';
import { RoomStoreState } from '~~/stores/rooms';
import {nextTick, onActivated, onMounted, ref, Ref, watch} from "vue";
definePageMeta({
  layout: false
})


const route = useRoute();
const rss = RoomStoreState();
const toast = useToast()

let breadcrumbs = [
  {text: 'UserManages', disabled: true, href: ''},
  {text: 'Rooms', disabled: false, href: '/console/rooms'},
  {text: 'Create Room', disabled: false, href: '/console/rooms/create'},
]
let id = route.params.id
await rss.getById({id:id})
const formError: Ref<Array<IFormError>> = ref([])

watch(() => route.name, () => {
  console.log("route", route.name)
  nextTick(() => {
    formError.value = []
    rss.createForm = {} as IRoom
  })
})

async function updateRooms(){
  let result = await rss.updateById({id:id})
  console.log("result",result)
  if (result.status == "success"){
    toast.success(result.message)
    nextTick(async() => {
      await navigateTo("/console/rooms")
      await rss.load()
    })
  }
  else{
    toast.error(result.message)
    formError.value = result.data
  }
}

</script>

<style scoped>
</style>
