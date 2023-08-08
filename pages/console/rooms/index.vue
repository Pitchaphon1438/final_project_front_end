<template>
  <NuxtLayout name="app">
    <template #breadcrumb>
      <Breadcrumb :items="breadcrumbs"/>
    </template>

    <template #page-header>
      Rooms
    </template>

    <template #default>

      <div class="flex flex-row bg-gray-900 p-3">
        <ButtonPrimary to="/console/rooms/create">Create</ButtonPrimary>

      </div>

      <table class="min-w-full text-left">
        <thead class="border-b bg-gray-900">
        <tr>
          <th scope="col" class="text-sm font-medium text-white px-6 py-4">
            #
          </th>
          <th scope="col" class="text-sm font-medium text-white px-6 py-4">
            Room
          </th>
          <th scope="col" class="text-sm text-center font-medium text-white px-6 py-4">
            Action
          </th>
        </tr>
        </thead>
        <tbody>
          <template v-if="roomStoreState.rooms">
            <tr class="bg-white border-b" v-for="(item,index) in roomStoreState.rooms" :key="item.ID">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ item.ID }}</td>
              <td class="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">{{ item.RoomNumber }}</td>
              <td class="flex flex-row justify-center space-x-2 px-6 py-2">
                <ButtonDefault :to="`/console/rooms/edit/${item.ID}`">Edit</ButtonDefault>
                <ButtonDanger @click="confirmDelete(item)">Delete</ButtonDanger>
              </td>
            </tr>
          </template>
         
       
        </tbody>
      </table>
    </template>
  </NuxtLayout>
</template>

<script setup lang="ts">
import {POSITION, useToast} from "vue-toastification";
import {RoomStoreState} from "@/stores/rooms";

definePageMeta({
  layout: false
})

const toast = useToast()
const roomStoreState = RoomStoreState()

let breadcrumbs = [
  {text: 'UserManages', disabled: true, href: ''},
  {text: 'Rooms', disabled: false, href: '/console/rooms'},
]
await roomStoreState.load()

//let rooms: Array<IRoom> = [
 // {id: 1, name: "101",},
  //{id: 2, name: "102",},
 // {id: 3, name: "201",},
  //{id: 4, name: "202",},

//]

//function confirmDelete(id: number) {
  //if (confirm("Do you want to delete this item?")) {
    //toast.success("Deleted Success", {
      //position: POSITION.TOP_RIGHT,
      //timeout: 3000
    //});
 // }
//}
async function confirmDelete(rooms: IRoom) {
  if (confirm("Do you want to delete this item?")) {
    let result = await roomStoreState.remove(rooms)
    if (result.status == "success"){
      await roomStoreState.load()
      toast.success(result.message,{
        position: POSITION.TOP_RIGHT,
        timeout: 3000
      });
    }else{
      toast.error(result.message)
    }
  }
}

</script>

<style scoped>
</style>
