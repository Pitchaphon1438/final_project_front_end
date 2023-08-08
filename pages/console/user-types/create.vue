<template>
  <NuxtLayout name="app">
    <template #breadcrumb>
      <Breadcrumb :items="breadcrumbs"/>
    </template>

    <template #page-header>
      Create User Type

    </template>

    <template #default>
      <form>
        <InputText placeholder="Name" label="Name" v-model="uts.createForm.Name" :errors="formError" errorKey="Name"/>
        <InputTextarea rows="5" placeholder="Description" label="Description" v-model="uts.createForm.Description" :errors="formError" errorKey="Description"/>

        <ButtonPrimary @click="createUserType">Submit</ButtonPrimary>
        <ButtonDefault class="ml-3" to="/console/user-types">Cancel</ButtonDefault>
      </form>
    </template>
  </NuxtLayout>
</template>

<script setup lang="ts">

import {UserTypeStore} from "@/stores/userType";
import {useToast} from "vue-toastification";
import {nextTick, onActivated, onMounted, ref, Ref, watch} from "vue";

definePageMeta({
  layout: false
})

const route = useRoute();
const uts = UserTypeStore()
const toast = useToast()

let breadcrumbs = [
  {text: 'UserManages', disabled: true, href: ''},
  {text: 'User Types', disabled: false, href: '/console/user-types'},
  {text: 'Create User Type', disabled: false, href: '/console/user-types/create'},
]

const formError: Ref<Array<IFormError>> = ref([])

// ใช้สำหรับ clear form data ต่างๆ ก่อนออกจากหน้านี้
watch(() => route.name, () => {
  console.log("route", route.name)
  nextTick(() => {
    formError.value = []
    uts.createForm = {} as IUserType
  })
})

async function createUserType() {
  let result = await uts.createUserType()
  console.log("result",result)
  if (result.status == "success") {
    toast.success(result.message)
    nextTick(async () => {
      await navigateTo("/console/user-types")
      await uts.load()

    })
  } else {
    toast.error(result.message)
    formError.value = result.data
  }

}

</script>

<style scoped>
</style>
