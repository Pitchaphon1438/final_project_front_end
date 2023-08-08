<template>
  <div class="container mx-auto my-24">

    <div class="flex flex-row justify-center">
      <div class="w-1/3">
        <div class="text-green-500 text-4xl font-bold">
          Line Notification Admin
        </div>
        <div class="text-2xl">
          แอปพลิเคชั่นช่วยแจ้งเตือนผ่านไลน์
        </div>
      </div>
      <div class="w-1/3">

        <div class="bg-white w-full
      shadow-2xl border-solid border-4 rounded-lg border-gray-700 p-3">
          <form>
            <InputText label="Username" v-model="authStore.loginForm.username" name="Username" placeholder="Username"
                       class="mb-4"/>
            <InputText label="Password" v-model="authStore.loginForm.password" name="Password" placeholder="Password"
                       type="password" class="mb-4"/>

            <ButtonPrimary class="mt-4" @click="login" :block="true">Login</ButtonPrimary>
          </form>

          <div class="font-bold text-center my-2"> OR</div>
          <ButtonDefault :to="lineLoginUrl" :block="true">Continue with Line</ButtonDefault>
        </div>
      </div>
    </div>

  </div>
</template>


<script lang="ts" setup>
import {ILineIssueAccessTokenRequest} from "~/types/line";
import {AuthStore} from "~/stores/auth";

import {POSITION, useToast} from "vue-toastification";

definePageMeta({
  layout: "blank-layout"
})

let authStore = AuthStore()

const toast = useToast()

async function login() {
  await authStore.login();
  if (authStore.currentUser == null) {
    toast.error("Login failed")
    // แจ้งเตือนว่า login ไม่สำเร็จ
  } else {
    if (authStore.currentUser.UserType == null || authStore.currentUser.UserType.Name != 'admin') {
      toast.success("Login successful",{
        position: POSITION.TOP_RIGHT,
          timeout: 3000
      });
      navigateTo({
        path: '/user'
      })
    } else if (authStore.currentUser.UserType.Name == "admin") {
      toast.success("Login successful",{
        position: POSITION.TOP_RIGHT,
          timeout: 3000
      });
      navigateTo({
        path: '/console'
      })
    } 
  }
}

function lineLogin() {

  let lineLoginUrl = "https://access.line.me/oauth2/v2.1/authorize"
  let lineClientId = config.public.lineChannelId
  let lineClientSecret = config.public.lineChannelSecret

  let params = {
    response_type: 'code',
    client_id: lineClientId,
    redirect_uri: config.lineRedirectUri,
    state: Math.floor(Math.random() * 1000000),
    scope: "profile",

  }
  let lineurls = `${lineLoginUrl}?`
  for (let paramsKey in params) {
    lineurls += `${paramsKey}=${params[paramsKey]}&`
  }
  return lineurls
}

let config = useRuntimeConfig()
let lineLoginUrl = lineLogin()


</script>