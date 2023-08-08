<template>
  <NuxtLayout name="app">
    <template #breadcrumb>
      <Breadcrumb :items="breadcrumbs"/>
    </template>

    <template #page-header>
      Create Postals

    </template>

    <template #default>
      <form>
        <div class="form-group mb-6">
          
          <label for="exampleInputEmail1" class="form-label inline-block mb-2 text-gray-700">User Name</label>
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
          <small id="dateHelp" class="block mt-1 text-xs text-gray-600">Required</small> 
          <br>

          <label for="exampleInputImage" class="mt-4 form-label inline-block mb-2 text-gray-700">image</label>
          <div class="items-center w-full">
            <input type="file" id="img" name="img" accept="image/*" @change="onFileChange" ref="upload"/>
             <div ref="preview">
                <img  style="width:300px" v-if="base64" :src="base64" />
             </div>
          </div> 
        </div>
        <ButtonPrimary @click="createPostal">Submit</ButtonPrimary>
        <ButtonDefault class="ml-3" to="/console/postals">Cancel</ButtonDefault>
      </form>

    </template>
  </NuxtLayout>
</template>

<script setup lang="ts">
import {useRoute} from "#app";
import {useToast} from "vue-toastification";
import {nextTick, onActivated, onMounted, ref, Ref, watch} from "vue";
import {PostalStore} from "@/stores/postal";
import {UserStore} from "@/stores/user";
import {RoomStoreState} from "@/stores/rooms";
import {PostalStatusStore} from "@/stores/postalStatus";
import Datepick from "~~/components/Datepick.vue";
import {$axios} from "~/plugins/axios";



definePageMeta({
  layout: false
})
let base64 = ref(null);
let upload = ref(null);
const userStore = UserStore()
const roomStore = RoomStoreState()
const route = useRoute();
const toast = useToast()
const pss = PostalStore()




let breadcrumbs = [
  {text: 'Postals', disabled: true, href: ''},
  {text: 'Create Postals', disabled: false, href: '/console/postals/create'},
]
const postalStatusStore = PostalStatusStore();
await postalStatusStore.load()

const formError: Ref<Array<IFormError>> = ref([])

watch(() => route.name, () => {
  console.log("route", route.name)
  nextTick(() => {
    formError.value = []
    pss.createForm = {} as IPostal
  })
})

async function createPostal(){
  let result = await pss.createPostals()
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
   const file = e.target.files[0];
    base64.value = URL.createObjectURL(file);
    console.log(base64.value)
}



</script>

<style scoped>
</style>
