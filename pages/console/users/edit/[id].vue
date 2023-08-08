<template>
  <NuxtLayout name="app">
    <template #breadcrumb>
      <Breadcrumb :items="breadcrumbs"/>
    </template>

    <template #page-header>
      Edit User

    </template>

    <template #default>
      <form>
        <div class="form-group mb-6">

          <InputText placeholder="Frist Name" label="Frist Name" v-model="uss.updatedForm.FirstName" :errors="formError" errorKey="FristName"/>
         
          <InputText placeholder="Last Name" label="Last Name" v-model="uss.updatedForm.LastName" :errors="formError" errorKey="LastName"/>
          
          <InputText placeholder="PersonalID" label="PersonalID" v-model="uss.updatedForm.PersonalID" :errors="formError" errorKey="PersonalID"/>
          <a>User Types</a>
          <br>
          <select v-model="uss.updatedForm.UserTypeID" style="padding: 10px; background:#4177FF; border:black;color: aliceblue;">
            <option value="0">กรุณาเลือก</option>
           
            <option v-for="(item,index) in userTypeStore.userTypes" :key="item.ID" :value="item.ID">
            {{ item.Name }}</option>
            

          </select>

        </div>
        <ButtonPrimary @click="updateUser">Submit</ButtonPrimary>
        <ButtonDefault class="ml-3" to="/console/users">Cancel</ButtonDefault>
      </form>

    </template>
  </NuxtLayout>
</template>

<script setup lang="ts">
import {useRoute} from "#app";
import {UserStore} from "@/stores/user";
import {useToast} from "vue-toastification";
import {nextTick, onActivated, onMounted, ref, Ref, watch} from "vue";
import {UserTypeStore} from "@/stores/userType";

definePageMeta({
  layout: false
})
const route = useRoute();
const uss = UserStore()
const toast = useToast()

let breadcrumbs = [
  {text: 'Users', disabled: true, href: ''},
  {text: 'Add User', disabled: false, href: '/console/users/create'},

]

const userTypeStore = UserTypeStore()
await userTypeStore.load()
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
async function updateUser(){
  let result = await uss.updateById({id:id})
  console.log("result",result)
  if (result.status == "success") {
    toast.success(result.message)
    nextTick(async () => {
      await navigateTo("/console/users")
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
