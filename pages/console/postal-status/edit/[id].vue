<template>
  <NuxtLayout name="app">
    <template #breadcrumb>
      <Breadcrumb :items="breadcrumbs"/>
    </template>

    <template #page-header>
      Edit postalStatus

    </template>

    <template #default>
      <form>
        <InputText placeholder="Name" label="Name" v-model="pss.updatedForm.Name" :errors="formError" errorKey="Name"/>
        <InputTextarea rows="5" placeholder="Description" label="Description" v-model="pss.updatedForm.Description" :errors="formError" errorKey="Description"/>

        <ButtonPrimary @click="updatePostalStatus">Submit</ButtonPrimary>
        <ButtonDefault class="ml-3" to="/console/postalStatus">Cancel</ButtonDefault>
      </form>

    </template>
  </NuxtLayout>
</template>

<script setup lang="ts">
import {useRoute} from "#app";
import {PostalStatusStore} from "@/stores/postalStatus";
import {useToast} from "vue-toastification";
import {nextTick, ref, Ref, watch} from "vue";

definePageMeta({
  layout: false
})

let breadcrumbs = [
  {text: 'UserManages', disabled: true, href: ''},
  {text: 'Postal Status', disabled: false, href: '/console/postal-status'},
  {text: 'Create Postal Status', disabled: false, href: '/console/postal-status/create'},

]
const route = useRoute();
const pss = PostalStatusStore()
const toast = useToast()

let id = route.params.id
await pss.getById({id:id})

const formError: Ref<Array<IFormError>> = ref([])


watch(() => route.name, () => {
  console.log("route", route.name)
  nextTick(() => {
    formError.value = []
    pss.createForm = {} as IPostalStatus
  })
})



async function updatePostalStatus() {
  let result = await pss.updateById({id:id})
  console.log("result",result)
  if (result.status == "success") {
    toast.success(result.message)
    nextTick(async () => {
      await navigateTo("/console/postal-status")
      await pss.load()
    })
  } else {
    toast.error(result.message)
    formError.value = result.data
  }

}


</script>

<style scoped>
</style>
