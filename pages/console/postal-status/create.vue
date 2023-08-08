<template>
  <NuxtLayout name="app">
    <template #breadcrumb>
      <Breadcrumb :items="breadcrumbs"/>
    </template>

    <template #page-header>
      Create Postal Status

    </template>

    <template #default>
      <form>
        <InputText placeholder="Name" label="Name" v-model="pss.createForm.Name" :errors="formError" errorKey="Name"/>
        <InputTextarea rows="5" placeholder="Description" label="Description" v-model="pss.createForm.Description" :errors="formError" errorKey="Description"/>

        <ButtonPrimary @click="createpostalStatus">Submit</ButtonPrimary>
        <ButtonDefault class="ml-3" to="/console/postal-status">Cancel</ButtonDefault>
      </form>

    </template>
  </NuxtLayout>
</template>

<script setup lang="ts">

import {PostalStatusStore} from "@/stores/postalStatus";
import {useToast} from "vue-toastification";
import {nextTick, onActivated, onMounted, ref, Ref, watch} from "vue";

definePageMeta({
  layout: false
})

const route = useRoute();
const pss = PostalStatusStore();
const toast = useToast()

let breadcrumbs = [
  {text: 'UserManages', disabled: true, href: ''},
  {text: 'Postal Status', disabled: false, href: '/console/postal-status'},
  {text: 'Create Postal Status', disabled: false, href: '/console/postal-status/create'},
]

const formError: Ref<Array<IFormError>> = ref([])


watch(() => route.name, () => {
  console.log("route", route.name)
  nextTick(() => {
    formError.value = []
    pss.createForm = {} as IPostalStatus
  })
})

async function createpostalStatus() {
  let result = await pss.createpostalStatus()
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

