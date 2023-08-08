<template>
  <NuxtLayout name="app">
    <template #breadcrumb>
      <Breadcrumb :items="breadcrumbs"/>
    </template>

    <template #page-header>
      User Type Management
    </template>

    <template #default>

      <div class="flex flex-row bg-gray-800 p-3">
        <ButtonPrimary to="/console/user-types/create">Create</ButtonPrimary>
      </div>

      <table class="min-w-full text-left">
        <thead class="border-b bg-gray-900">
        <tr>
          <th scope="col" class="text-sm font-medium text-white px-6 py-4">
            #
          </th>
          <th scope="col" class="text-sm font-medium text-white px-6 py-4">
            Name
          </th>
          <th scope="col" class="text-sm font-medium text-white px-6 py-4">
            Description
          </th>
          <th scope="col" class="text-sm text-center font-medium text-white px-6 py-4">
            Action
          </th>
        </tr>
        </thead>
        <tbody>

        <template v-if="userTypeStore.userTypes">

          <tr class="bg-white border-b" v-for="(item,index) in userTypeStore.userTypes" :key="item.ID">
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ item.ID }}</td>
            <td class="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">{{ item.Name }}</td>
            <td class="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">{{ item.Description }}</td>
            <td class="flex flex-row justify-center space-x-2 px-6 py-2">
              <ButtonDefault :to="`/console/user-types/edit/${item.ID}`">Edit</ButtonDefault>
              <ButtonDanger @click="confirmDelete(item)">Delete</ButtonDanger>
            </td>
          </tr>
        </template>
        <tr v-else class="text-xl text-center h-20">
          <td colspan="4">No User Types Found</td>
        </tr>
        </tbody>
      </table>
    </template>
  </NuxtLayout>
</template>

<script setup lang="ts">
import {POSITION, useToast} from "vue-toastification";
import {UserTypeStore} from "@/stores/userType";

definePageMeta({
  layout: false
})

const toast = useToast()
const userTypeStore = UserTypeStore()
let breadcrumbs = [
  {text: 'UserManages', disabled: true, href: ''},
  {text: 'User Types', disabled: false, href: '/console/user-types'},
]

await userTypeStore.load()

// let userTypes: Array<IUserType> = [
//   {id: 1, name: "admin", description: "Administrator"},
//   {id: 2, name: "user", description: "User"}
// ]

async function confirmDelete(userType : IUserType) {
  if (confirm("Do you want to delete this item?")) {
    let result = await userTypeStore.remove(userType)
    if(result.status == "success") {
      await userTypeStore.load()

      toast.success(result.message, {
        position: POSITION.TOP_RIGHT,
        timeout: 3000
      });
    }else {
      toast.error(result.message)
    }

  }
}
</script>

<style scoped>
</style>
