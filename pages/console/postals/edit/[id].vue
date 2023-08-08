<template>
  <NuxtLayout name="app">
    <template #breadcrumb>
      <Breadcrumb :items="breadcrumbs"/>
    </template>

    <template #page-header>
      Edit Postals

    </template>

    <template #default>
      <form>
        <div class="form-group mb-6">
          <label for="exampleInputEmail1" class="form-label inline-block mb-2 text-gray-700">User name</label>
          <br>
         <select v-model ="pss.updatedForm.UserID" style="padding: 10px; background:#4177FF; border:black;color: aliceblue;">
              <option value="0">กรุณาเลือก</option>
              <option v-for="(item,index) in userStore.users" :key="item.ID" :value="item.ID">
              {{item.FirstName}} {{item.LastName}}
              </option>
          </select>
          <br>
          <small id="userIDHelp" class="block mt-1 text-xs text-gray-600">Required</small>
          <br>
          <label for="exampleInputEmail1" class="form-label inline-block mb-2 text-gray-700">Room Number</label>
          <br>
          <select v-model ="pss.updatedForm.RoomID" style="padding: 10px; background:#4177FF; border:black;color: aliceblue;">
              <option value="0">กรุณาเลือก</option>
              <option v-for="(item,index) in roomStore.rooms" :key="item.ID" :value="item.ID">
              {{item.RoomNumber}}
              </option>
          </select>

          <small id="roomHelp" class="block mt-1 text-xs text-gray-600">Required</small>
          

          <label for="exampleInputEmail1" class="form-label inline-block mb-2 text-gray-700">Postal Status</label>
          <br> 
          <select v-model ="pss.updatedForm.PostalStatusID" style="padding: 10px; background:#4177FF; border:black;color: aliceblue;">
              <option value="0">กรุณาเลือก</option>
              <option v-for="(item,index) in postalStatusStore.postalStatuses" :key="item.ID" :value="item.ID">
              {{item.Name}}
              </option>
          </select>
          <br>




          <label for="exampleInputEmail1" class="mt-4 form-label inline-block mb-2 text-gray-700">image</label>
          <div class="  items-center w-full">
              
            <input type="file" id="img" name="img" accept="image/*" @change="onFileChange" ref="upload"/>
             <div ref="preview">
                <img style="width:300px" v-if="base64" :src="base64" />
                <img style="width:300px" v-else-if="pss.updatedForm.ImageUrl" :src="baseURL+pss.updatedForm.ImageUrl"/>

             </div>
           
         
          </div> 

        </div>


        <ButtonPrimary @click="updatePostal">Submit</ButtonPrimary>
        <ButtonDefault class="ml-3" to="/console/postals">Cancel</ButtonDefault>
      </form>

    </template>
  </NuxtLayout>
</template>

<script setup lang="ts">
import {useRoute} from "#app";
import {useToast} from "vue-toastification";
import {nextTick, onActivated, onMounted, ref, Ref, watch} from "vue";
import {PostalStore} from "@/stores/postal"
import {UserStore} from "@/stores/user"
import {RoomStoreState} from "@/stores/rooms";
import {PostalStatusStore} from "@/stores/postalStatus";
import {$axios} from "~/plugins/axios";






definePageMeta({
  layout: false
})
let base64 = ref(null);
let upload = ref(null);
const userStore = UserStore()
const roomStore = RoomStoreState()
const config = useRuntimeConfig()
let baseURL = ref(config.public.apiUrl)
const route = useRoute();
const toast = useToast()
const pss = PostalStore()


userStore.load();
roomStore.load();

let breadcrumbs = [
  {text: 'Postals', disabled: true, href: ''},
  {text: 'Edit Postals', disabled: false, href: '/console/postals/create'},
]
let id = route.params.id
const postalStatusStore = PostalStatusStore();
await postalStatusStore.load()


await pss.getById({id:id})

const formError: Ref<Array<IFormError>> = ref([])

watch(() => route.name, () => {
  console.log("route", route.name)
  nextTick(() => {
    formError.value = []
    pss.createForm = {} as IPostal
  })
})

async function updatePostal(){
  let result = await pss.updateById({id:id})
  console.log("result",result)
  if (result.status == "success") {
    console.log(result.data)
    let id = result.data.ID
    let uri = `/api/postals/${id}/upload`
    
    let files = upload.value.files
    console.log(upload.value.files)
    if (files.length>0){
      let data = new FormData()
      data.append('attachment', files[0])
      let response = await $axios.post(uri,data,{
          headers: {
            "Content-Type": "multipart/form-data",
          },
      })
      console.log(response)
    }
    toast.success(result.message)
    nextTick(async () => {
      await navigateTo("/console/postals")
      await pss.load()
    })
  }
  else {
    toast.error(result.message)
    formError.value = result.data
  }
}
async function onFileChange(e){
   
    if (e.target.files.length>0){
      const file = e.target.files[0];
       base64.value = URL.createObjectURL(file);
      console.log(base64.value)
    }
    else{
      base64.value = null
    }
   
}
</script>

<style scoped>
</style>
