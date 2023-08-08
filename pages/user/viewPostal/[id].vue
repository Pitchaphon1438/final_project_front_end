<template>
    <NuxtLayout name="user">
      <template #breadcrumb></template>
  
      <template #page-header>
        My Postals
      </template>
  
      <template #default>
       <form v-if="auth.currentUser">
        <label>Date : {{Intl.DateTimeFormat().format(date)}}</label>
        <br>
        <label>ผู้รับพัสดุ</label>
        <br>
        <label>FirstName : {{auth.currentUser.FirstName}}</label>
        <br>
        <label>LastName : {{auth.currentUser.LastName}}</label>
        <br>
        <label>image</label>
        <br>
        <div v-for="(item,index) in postalStore.postals" :key="item.ID">
            <img style="width:200px" v-if="item.ImageUrl" :src="baseURL+item.ImageUrl"/>
        </div>
        <div v-for="(item,index) in postalStore.postals" :key="item.ID">
          <ButtonPrimary @click="receivedPostal">Receive</ButtonPrimary>
        </div>
        
        
       </form>
        
      </template>
    </NuxtLayout>
  
</template>

<script setup lang="ts">
import {POSITION, useToast} from "vue-toastification";

import {PostalStore} from "@/stores/postal"

import {nextTick, onActivated, onMounted, ref, Ref, watch} from "vue";
import {AuthStore} from "~/stores/auth";
import {$axios} from "~/plugins/axios";

definePageMeta({
  layout: false,
});
const toast = useToast()

let auth = AuthStore()
auth.loadFromLocalStorage()

let drawer = ref(true)
let nuxtApp = useNuxtApp()



const config = useRuntimeConfig()
let baseURL = ref(config.public.apiUrl)
const postalStore = PostalStore()
const date = new Date(Date.UTC(2012, 11, 20, 3, 0, 0));
const route = useRoute();


let id = route.params.id

await postalStore.load()
await postalStore.getById({id:id})

const formError: Ref<Array<IFormError>> = ref([])
  watch(() => route.name, () => {
  console.log("route", route.name)
  nextTick(() => {
    formError.value = []
    postalStore.createForm = {} as IPostal
  })
})

async function receivedPostal(postal:IPostal){
    let result = await postalStore.receivePostal({id:id})
    console.log("result",result)
    if (result.status == "success"){
      toast.success(result.message)
      nextTick(async () => {
      await navigateTo("/user")
      await postalStore.load()
    })
    }
    else {
      toast.error(result.message)
      formError.value = result.data
  }
}



</script>