<template>
  <v-app>
    <client-only>

      <v-app-bar app :collapse="false" elevation="0" theme="dark" >
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        <v-app-bar-title class="">Postal Service</v-app-bar-title>
      </v-app-bar>

      <v-navigation-drawer v-model="drawer" bottom permanent >
        <v-list >
          <v-list-item v-if="auth.currentUser"
              prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
              :title="`${auth.currentUser.FirstName} ${auth.currentUser.LastName}`"
              :subtitle=" auth.currentUser.UserType?.Name ?? `User`"
          ></v-list-item>
        </v-list>

        <v-divider></v-divider>

        <!-- Navigation Menu -->
        <div class="flex flex-col p-2 space-y-1">

          <NavItem value="Home" icon="mdi mdi-home" to="/console"/>
          <NavItem value="Profiles" icon="mdi mdi-account" to="/console/profiles"/>

          <NavItem value="Postals" icon="mdi mdi-email" to="/console/postals"/>
          <NavItem value="Users" icon="mdi mdi-account" to="/console/users"/>


          <NavItemGroup>
            <template v-slot:activator="{ state,open }">
              <NavItemGroupHeader value="Settings" :state="state" :open="open" icon="mdi mdi-cog"></NavItemGroupHeader>
            </template>

            <NavItem value="User Types" to="/console/user-types"/>
            <NavItem value="Rooms" to="/console/rooms"/>
            <NavItem value="Postal Status" to="/console/postal-status"/>

          </NavItemGroup>

        </div>
      </v-navigation-drawer>
        <!-- Provides the application the proper gutter -->
        <v-main>
          <v-container fluid>

          <slot name="breadcrumb">
            <Breadcrumb></Breadcrumb>
          </slot>


          <hr class="mt-2"/>

          <!-- If using vue-router -->
          <div class="text-3xl my-2.5">
            <slot name="page-header"></slot>
          </div>


          <div class="flex flex-col">
            <slot name="default"></slot>
          </div>


        </v-container>
      </v-main>

      <v-footer app>
  
      </v-footer>
    </client-only>
  </v-app>

</template>


<script lang="ts" setup>
import {useNuxtApp} from "#imports";
import {AuthStore} from "~/stores/auth";

let auth = AuthStore()
auth.loadFromLocalStorage()

let drawer = ref(true)
let nuxtApp = useNuxtApp()
if (process.client) {
}



</script>

<style scoped>

</style>