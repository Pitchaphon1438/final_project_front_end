import {UploadMedia, UpdateMedia} from "vue-media-upload";

export default defineNuxtPlugin(nuxtApp => {

  
    nuxtApp.vueApp.component('upload-media' , UploadMedia);
    nuxtApp.vueApp.component('update-media' , UpdateMedia);
})