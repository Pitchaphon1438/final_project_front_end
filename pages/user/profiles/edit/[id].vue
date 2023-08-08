<template>
    <NuxtLayout name="user">
      <template #breadcrumb>
        <Breadcrumb :items="breadcrumbs"/>
      </template>
  
      <template #page-header>
        EditProfile
      </template>
  
      <template #default>
          <form v-if="auth.currentUser">
            <div class="form-group mb-6">
              
              <InputText placeholder="Frist Name" label="Frist Name" v-model="uss.updatedForm.FirstName" :errors="formError" errorKey="FristName"/>
  
              <InputText placeholder="Last Name" label="Last Name" v-model="uss.updatedForm.LastName" :errors="formError" errorKey="LastName"/>
              
              <InputText placeholder="Email" label="Email" v-model="uss.updatedForm.Email" :errors="formError" errorKey="LastName"/>

              <InputText placeholder="PersonalID" label="PersonalID" v-model="uss.updatedForm.PersonalID" :errors="formError" errorKey="PersonalID"/>

              <label for="exampleInputEmail1" class="form-label inline-block mb-2 text-gray-700">Room Number</label>
              <br>
              <select v-model ="uss.updatedForm.RoomID" style="padding: 10px; background:#4177FF; border:black;color: aliceblue;">
                <option value="0">กรุณาเลือก</option>
                <option v-for="(item,index) in rss.rooms" :key="item.ID" :value="item.ID">
                {{item.RoomNumber}}
                </option>
              </select>
                    
                    <div class="mt-2">
                        <label for="formFile" class="form-label inline-block mb-2 text-gray-700 ">Change Profile Picture</label>
                        <input class="form-control block  w-full px-3 py-1.5 text-base font-normal text-gray-900 bg-white bg-clip-padding border border-solid border-gray-900 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" type="file" id="formFile" >
                    </div>
            </div>
            
  
            <ButtonPrimary @click="updateProfile">Submit</ButtonPrimary>
            <ButtonDefault class="ml-3" to="/user/profiles/">Cancel</ButtonDefault>
        </form>
        
      </template>
    </NuxtLayout>
  </template>
  
  <script setup lang="ts">

  import {useRoute} from "#app";
  import {UserStore} from "@/stores/user";
  import {useToast} from "vue-toastification";
  import {nextTick, onActivated, onMounted, ref, Ref, watch} from "vue";
  import { RoomStoreState } from '~~/stores/rooms';
  import {AuthStore} from "~/stores/auth";
  
  definePageMeta({
    layout: false
  })
  
  
  let breadcrumbs = [
    {text: 'EditProfiles', disabled: false, href: '/console/rooms'},
  ]
  
 
  let auth = AuthStore()
  auth.loadFromLocalStorage()
  const route = useRoute();
  const toast = useToast();
  const uss = UserStore()
  

  const rss = RoomStoreState();
  await rss.load()
  let id = route.params.id
  await uss.getById({id:id})
  const formError: Ref<Array<IFormError>> = ref([])

  watch(() => route.name, () => {
    console.log("route", route.name)
    nextTick(() => {
      formError.value = []
      uss.createForm = {} as IUser
    })
  })
  
  async function updateProfile(){
    let result = await uss.updateById({id:id})
    console.log("result",result)
    if (result.status == "success") {
      toast.success(result.message)
      nextTick(async () => {
        await navigateTo("/user/profiles/")
        await uss.load()


      })
    }
    else {
      toast.error(result.message)
      formError.value = result.data
  }

}






  </script>
  
  <style scoped>
  </style>
  