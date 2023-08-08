<template>
  <NuxtLayout name="app">
    <template #breadcrumb>
      <Breadcrumb :items="breadcrumbs"/>
    </template>

    <template #page-header>
      Edit User Type

    </template>

    <template #default>
      <form>
        <InputText placeholder="Name" label="Name" v-model="uts.updatedForm.Name" :errors="formError" errorKey="Name"/>
        <InputTextarea rows="5" placeholder="Description" label="Description" v-model="uts.updatedForm.Description" :errors="formError" errorKey="Description"/>

        <ButtonPrimary @click="updateUserType">Submit</ButtonPrimary>
        <ButtonDefault class="ml-3" to="/console/user-types">Cancel</ButtonDefault>
      </form>

    </template>
  </NuxtLayout>
</template>

<script setup lang="ts">
import {useRoute} from "#app";
import {UserTypeStore} from "~/stores/userType";
import {useToast} from "vue-toastification";
import {nextTick, ref, Ref, watch} from "vue";

definePageMeta({
  layout: false
})

let breadcrumbs = [
  {text: 'UserManages', disabled: true, href: ''},
  {text: 'User Types', disabled: false, href: '/console/user-types'},
  {text: 'Create User Type', disabled: false, href: '/console/user-types/create'},

]
const route = useRoute();
const uts = UserTypeStore()
const toast = useToast()

let id = route.params.id
await uts.getById({id:id})

const formError: Ref<Array<IFormError>> = ref([])

// ใช้สำหรับ clear form data ต่างๆ ก่อนออกจากหน้านี้
watch(() => route.name, () => {
  console.log("route", route.name)
  nextTick(() => {
    formError.value = []
    uts.createForm = {} as IUserType
  })
})



async function updateUserType() {
  let result = await uts.updateById({id:id})
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
