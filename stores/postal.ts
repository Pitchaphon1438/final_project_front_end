import {defineStore} from 'pinia'
import {$axios} from "~/plugins/axios";

interface PostalStoreState{
    postals: Array<IPostal>,
    createForm: IPostal,
    updatedForm: IPostal
    formError: IFormError[]
}
export const PostalStore = defineStore('postals',{
    state: (): PostalStoreState =>({
        postals: [],
        createForm: {} as IPostal,
        updatedForm: {} as IPostal,
        formError: [],
    }),
    getters:{
        postalsList: (state) => (state.postals),
    },
    actions: {
        load: async function (){
            let error = false;
            const response = await $axios.get(`/api/postals`).then(res => res)
            .catch((err) => {
                error = true
                return err.response
            })

            if (!error) {
                this.$patch({
                    postals: response.data.data
                })
            }
        },
        remove: async function (postals: IPostal){
            const response = await $axios.delete(`/api/postals/${postals.ID}`).then(res => res).catch(err => err.response)
            if (response.data.status == "success") {
                await this.load()
            }
            return response.data
        },
        createPostals: async function (){
            this.createForm.UserID = parseInt(this.createForm.UserID)
            this.createForm.RoomID = parseInt(this.createForm.RoomID)
            
            const response = await $axios.post(`/api/postals`, this.createForm)
                .then((res) => (res))
                .catch((err) => {
                    console.log(err)
                    return err.response
            })
            return response.data
        },
        updateById: async function ({id}){
            const response = await $axios.put(`/api/postals/${id}`, this.updatedForm).then((res) => (res))
                .catch((error) => {
                    return error.response
                })

            return response.data
        },
        getById: async function ({id}) {
            const response = await $axios.get(`/api/postals/${id}`,).then(res => res)
            .catch(err => err.response)
            if (response.data.status == "success") {
                this.$patch({
                    updatedForm: response.data.data
                })
            }
            return response.data
        },
        receivePostal: async function ({id}){
            const response = await $axios.put(`/api/postals/${id}/receivePostal`, this.updatedForm)
            .then((res) => (res))
            .catch((error) => {
                return error.response
            })

            return response.data
        }
            
        
    }
})
