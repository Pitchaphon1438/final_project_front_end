<template>
  <NuxtLayout name="app">
    <template #breadcrumb>
      <Breadcrumb :items="breadcrumbs"/>
    </template>

    <template #page-header>
      Create Room

    </template>

    <template #default>
      <form>
        
          <InputText placeholder="Room Number" label="Room Number" v-model="rss.createForm.RoomNumber" :errors="formError" errorKey="RoomNumber"/>
          <ButtonPrimary @click="createRooms">Submit</ButtonPrimary>
          <ButtonDefault class="ml-3" to="/console/rooms">Cancel</ButtonDefault>
      </form>

    </template>
  </NuxtLayout>
</template>

<script setup lang="ts">

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

const formError: Ref<Array<IFormError>> = ref([])

watch(() => route.name,() => {
  console.log("route",route.name)
  nextTick(() =>{
    formError.value = []
    rss.createForm = {} as IRoom
  })
})
async function createRooms(){
  let result = await rss.createRooms()
  console.log("result",result)
  if (result.status == "success"){
    toast.success(result.message)
    nextTick(async() =>{
      await navigateTo("/console/rooms")
    })
  } else{
    toast.error(result.message)
    formError.value = result.data
  }
}

</script>

<style scoped>
</style>
