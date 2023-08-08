<template>
    <NuxtLayout name="app">
       
      <template #breadcrumb>
        <Breadcrumb :items="breadcrumbs"/>
      </template>
  
      <template #page-header>
        My Postals
      </template>
  
      <template #default>
          
        <table class="min-w-full text-left">
          <thead class="border-b bg-gray-900">
          <tr>
            <th scope="col" class="text-sm font-medium text-white px-6 py-4">
              #
            </th>
            <th scope="col" class="text-sm font-medium text-white px-6 py-4">
              image
            </th>
            <th scope="col" class="text-sm font-medium text-white px-6 py-4">
              Date
            </th>
            <th scope="col" class="text-sm text-center font-medium text-white px-6 py-4">
              Action
            </th>
          </tr>
          </thead>
          <tbody>
            <template v-if="postalStore.postals">
              <tr class="bg-white border-b" v-for="(item,index) in postalStore.postals" :key="item.ID">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ item.ID}}</td>
                <td class="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">{{ item.UserID}}</td>
                <td class="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">{{ item.RoomID }}</td>
                <td class="text-sm text-blue  underline  px-6 py-2 whitespace-nowrap">
                  <img style="width:200px" v-if="item.ImageUrl" :src="baseURL+item.ImageUrl"/>
                </td>
                <td class="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">{{new Intl.DateTimeFormat().format(date)}}</td>
                <td class="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">{{item.PostalStatus?.Name}}</td>
                
                <td class="flex flex-row justify-center space-x-2 px-6 py-2">
                  <ButtonPrimary :to="`/console/postals/edit/${item.ID}`">Edit</ButtonPrimary>
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
  import {PostalStore} from "@/stores/postal"
  import {RoomStoreState} from "@/stores/rooms";
  
  definePageMeta({
    layout: false
  })
  const config = useRuntimeConfig()
  let baseURL = ref(config.public.apiUrl)
  const toast = useToast()
  const postalStore = PostalStore()
  const date = new Date(Date.UTC(2012, 11, 20, 3, 0, 0));
  const roomStore = RoomStoreState()
  
  let breadcrumbs = [
    {text: 'Postals', disabled: false, href: '/console/Postals'},
  ]
  
  
  await postalStore.load()
  
  async function confirmDelete(postal:IPostal) {
    if (confirm("Do you want to delete this item?")){
        let result = await postalStore.remove(postal)
        if (result.status == "success"){
          await postalStore.load()
          toast.success(result.message,{
            position: POSITION.TOP_RIGHT,
            timeout: 3000
        });
        }
          else{
          toast.error(result.message)
          }
      }
  }
  </script>
  
  <style scoped>
  </style>
  