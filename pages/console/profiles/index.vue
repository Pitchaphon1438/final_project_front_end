<template>
  <NuxtLayout name="app">
    <template #breadcrumb>
      <Breadcrumb :items="breadcrumbs"/>
    </template>

    <template #page-header>
      Profile
    </template>

    <template #default>
        <form>
        <div class="form-group mb-6">
          <label for="exampleInputEmail1" class="form-label inline-block mb-2 text-gray-700">Frist Name</label>
          <input type="text"
                 class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                 id="exampleInputEmail1"
                 aria-describedby="emailHelp" placeholder="Frist Name">

          <label for="exampleInputEmail1" class="form-label mt-2 inline-block mb-2 text-gray-700">Last Name</label>
          <input type="text"
                 class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                 id="exampleInputEmail1"
                 aria-describedby="emailHelp" placeholder="Last Name">
          
          <label for="exampleInputEmail1" class="form-label mt-2 inline-block mb-2 text-gray-700">Email</label>
          <input type="text"
                 class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                 id="exampleInputEmail1"
                 aria-describedby="emailHelp" placeholder="Email">
                 
                 <div class="mt-2">
                     <label for="formFile" class="form-label inline-block mb-2 text-gray-700 ">Change Profile Picture</label>
                     <input class="form-control block  w-full px-3 py-1.5 text-base font-normal text-gray-900 bg-white bg-clip-padding border border-solid border-gray-900 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" type="file" id="formFile" >
                 </div>
        </div>
        

        <ButtonPrimary to="/console/rooms">Edit</ButtonPrimary>
        <ButtonDefault class="ml-3" to="/console/">Cancel</ButtonDefault>
      </form>
      
    </template>
  </NuxtLayout>
</template>

<script setup lang="ts">
import {POSITION, useToast} from "vue-toastification";

definePageMeta({
  layout: false
})


let breadcrumbs = [
  {text: 'EditProfiles', disabled: false, href: '/console/rooms'},
]

</script>

<style scoped>
</style>
