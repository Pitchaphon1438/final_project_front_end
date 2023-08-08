<template>
  <NuxtLayout name="user">
    <template #breadcrumb>
      <Breadcrumb :items="breadcrumbs"/>
    </template>

    <template #page-header>
      Profile
    </template>

    <template #default>
        <form v-if="auth.currentUser">
          <div class="form-group mb-6">
            <label for="exampleInputEmail1" class="form-label inline-block mb-2 text-gray-700">Frist Name</label>
            <br>
            <label>{{auth.currentUser.FirstName}}</label>
            <br>
            <label for="exampleInputEmail1" class="form-label inline-block mb-2 text-gray-700">Last Name</label>
            <br>
            <label>{{auth.currentUser.LastName}}</label>
            <br>
            <label for="exampleInputEmail1" class="form-label inline-block mb-2 text-gray-700">PersonalID</label>
            <br>
            <label>{{auth.currentUser.PersonalID}}</label>     
            <br>
            <label for="exampleInputEmail1" class="form-label inline-block mb-2 text-gray-700">Email</label>
            <br>
            <label>{{auth.currentUser.Email}}</label>     
            <br>
            <label for="exampleInputEmail1" class="form-label inline-block mb-2 text-gray-700">Room Number</label>
            <br>
            <label>{{auth.currentUser.Room?.RoomNumber}}</label>
                  <div class="mt-2">
                      <label for="formFile" class="form-label inline-block mb-2 text-gray-700 ">Change Profile Picture</label>
                      <input class="form-control block  w-full px-3 py-1.5 text-base font-normal text-gray-900 bg-white bg-clip-padding border border-solid border-gray-900 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" type="file" id="formFile" >
                  </div>
          </div>
         
            <ButtonPrimary :to="`/user/profiles/edit/${auth.currentUser.ID}`">
              Edit
            </ButtonPrimary>
            
            <ButtonDefault class="ml-3" to="/user/profiles">Cancel</ButtonDefault>
      </form>
      
    </template>
  </NuxtLayout>
</template>

<script setup lang="ts">
import {POSITION, useToast} from "vue-toastification";
import {UserStore} from "@/stores/user";
import {AuthStore} from "~/stores/auth";
import {RoomStoreState} from "@/stores/rooms";
import { PostalStore } from "~~/stores/postal";

definePageMeta({
  layout: false
})





let breadcrumbs = [
  {text: 'EditProfiles', disabled: false, href: '/console/rooms'},
]
const toast = useToast()

let auth = AuthStore()
auth.loadFromLocalStorage()

let drawer = ref(true)
let nuxtApp = useNuxtApp()


const userStore = UserStore()
const config = useRuntimeConfig()
const roomStore = RoomStoreState()
const postalStore = PostalStore()


userStore.load()
postalStore.load()
roomStore.load()


</script>

<style scoped>
</style>
