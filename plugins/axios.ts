import axios, {AxiosInstance} from "axios"
import Toast from "vue-toastification";

export const $axios: AxiosInstance = axios.create({
    baseURL : process.env.API_URL
})

export default defineNuxtPlugin(nuxtApp => {

    const config = useRuntimeConfig()
    $axios.defaults.baseURL = config.public.apiUrl
    console.log('axios base url',$axios.defaults.baseURL)

})

