import Toast from "vue-toastification";


export default defineNuxtPlugin(nuxtApp => {
    const options = {
        transition: "Vue-Toastification__bounce",
        maxToasts: 20,
        newestOnTop: true
    }
    nuxtApp.vueApp.use(Toast, options)
})