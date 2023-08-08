<template>
    <NuxtLayout name="user">
      <template #breadcrumb></template>
  
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
              Received Date
            </th>
            <th scope="col" class="text-sm text-center font-medium text-white px-6 py-4">
              Postal Status
            </th>
            <th scope="col" class="text-sm text-center font-medium text-white px-6 py-4">
              Action
            </th>
          </tr>
          </thead>
          <tbody>
            <template v-if="auth.currentUser">
              <tr class="bg-white border-b" v-for="(item,index) in postalStore.postals" :key="item.ID">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ item.ID}}</td>
              <td class="text-sm text-blue  underline  px-6 py-2 whitespace-nowrap">
                <img style="width:200px" v-if="item.ImageUrl" :src="baseURL+item.ImageUrl"/>
              </td>
              <td class="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                <template v-if="item.ReceivedDate">
                  {{new Intl.DateTimeFormat().format(Date.parse(item.ReceivedDate))}}
                </template>
                <template v-else>
                  -
                </template>
              </td>
              <td class="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                {{item.PostalStatus?.Name}}
              </td>
              <td class="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                <ButtonDefault :to="`/user/viewPostal/${item.ID}`">View</ButtonDefault>
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
import {UserStore} from "@/stores/user";
import {PostalStore} from "@/stores/postal"

import {AuthStore} from "~/stores/auth";

definePageMeta({
  layout: false,
});
const toast = useToast()

let auth = AuthStore()
auth.loadFromLocalStorage()

let drawer = ref(true)
let nuxtApp = useNuxtApp()


const userStore = UserStore()
const config = useRuntimeConfig()
let baseURL = ref(config.public.apiUrl)
const postalStore = PostalStore()
const date = new Date(Date.UTC(2012, 11, 20, 3, 0, 0));
await postalStore.load()
await userStore.load()



</script>

