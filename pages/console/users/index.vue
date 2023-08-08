<template>
  <NuxtLayout name="app">
    <template #breadcrumb>
      <Breadcrumb :items="breadcrumbs" />
    </template>

    <template #page-header> User </template>

    <template #default>
      <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="py-4 inline-block min-w-full sm:px-6 lg:px-8">
          <div class="overflow-hidden">

            <div class="flex flex-row bg-gray-900 p-3">
              <ButtonPrimary to="/console/users/create">Add User</ButtonPrimary>
              
            </div>

            <table class="min-w-full text-center">
              <thead class="border-b bg-gray-900">
                <tr>
                  <th scope="col" class="text-sm font-medium text-white px-6 py-4">
                    #
                  </th>
                  <th scope="col" class="text-sm font-medium text-white px-6 py-4">
                    First
                  </th>
                  <th scope="col" class="text-sm font-medium text-white px-6 py-4">
                    Last
                  </th>
                  <th scope="col" class="text-sm font-medium text-white px-6 py-4">
                    PersonalID
                  </th>
                  <th scope="col" class="text-sm font-medium text-white px-6 py-4">
                    UserType
                  </th>
                  <th scope="col" class="text-sm font-medium text-white px-6 py-4">
                    Action
                  </th>
                </tr>
              </thead>
              
              <tbody>
                <template v-if="userStore.users">
                  <tr class="bg-white border-b" v-for="(item,index) in userStore.users" :key="item.ID">
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ item.ID }}</td>
                    <td class="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">{{ item.FirstName }}</td>
                    <td class="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">{{ item.LastName }}</td>
                    <td class="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">{{ item.PersonalID }}</td>
                    <td class="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">{{ item.UserType?.Name}}</td>
                    <td class="flex flex-row justify-center space-x-2 px-6 py-2">
                      <ButtonDefault :to="`/console/users/edit/${item.ID}`">Edit</ButtonDefault>
                      <ButtonDanger @click="confirmDelete(item)">Delete</ButtonDanger>
                    </td>
                  </tr>
                </template>
                <tr v-else class="text-xl text-center h-20">
                  <td colspan="4">No User Found</td>
                </tr>
               
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </template>
  </NuxtLayout>
</template>

<script setup lang="ts">
import {POSITION, useToast} from "vue-toastification";
import {UserStore} from "@/stores/user";
definePageMeta({
  layout: false,
});
const toast = useToast()
const userStore = UserStore()

let breadcrumbs = [
  {text: 'UserManages', disabled: true, href: ''},
  { text: "Users", disabled: false, href: "/console/user" }
  ]

  await userStore.load()
  
  async function confirmDelete( user: IUser) {
    if (confirm("Do you want to delete this item?")){
      let result = await userStore.remove(user)
      if (result.status == "success"){
        await userStore.load()
        toast.success(result.message,{
          position: POSITION.TOP_RIGHT,
          timeout: 3000
      });
      }
        else{
        toast.error(result.message)
        }
    }
  }

</script>

<style scoped></style>

