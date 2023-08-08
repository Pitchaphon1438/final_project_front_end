<template>
  <div>

    Loggin in...
    {{ callbackCode }}
  </div>
</template>

<script setup lang="ts">


import {BackendLineIssueAccessToken, LineIssueAccessToken} from "~/types/line";

definePageMeta({
  layout: "blank-layout"
})

const route = useRoute()
const router = useRouter()
const config = useRuntimeConfig()
const clientId = config.public.lineChannelId
const clientSecret = config.public.lineChannelSecret
let callbackCode: undefined | string | string[] = undefined
let state: undefined | string | string[] = undefined

callbackCode = route.query.code as string
state = route.query.state as string

if (process.client) {

  if (callbackCode) {
    console.log("Logging in with Code", callbackCode)
    let result = BackendLineIssueAccessToken({
      redirect_uri: config.lineRedirectUri,
      grant_type: "authorization_code",
      code: `${callbackCode}`,
      client_id: clientId,
      client_secret: clientSecret,
      state: state,
    })

    let test = await result
    console.log(test)


  } else {
    router.push('/')

  }

}


</script>

<style scoped>

</style>
