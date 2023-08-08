import {defineStore} from 'pinia'
import {$axios} from "~/plugins/axios";

interface PostalStatusStoreState{
    postalStatuses: Array<IPostalStatus>,
    createForm: IPostalStatus,
    updatedForm: IPostalStatus
    formError: IFormError[]
}
export const PostalStatusStore = defineStore('postalStatus',{

    state: (): PostalStatusStoreState => ({
        postalStatuses: [],
        createForm: {} as IPostalStatus,
        updatedForm: {} as IPostalStatus,
        formError: [],
        
    }),
    getters:{
        postalStatusesList: (state) => (state.postalStatuses),
    },
    actions: {
        load: async function() {
            let error = false;
            const response = await $axios.get(`/api/postal-statuses`).then(res => res)
                .catch((err) => {
                    error = true
                    return err.response
                })

            if (!error) {
                    this.$patch({
                        postalStatuses: response.data.data
                    })
                }
        },
        remove: async function(postalStatuses: IPostalStatus){
            const response = await $axios.delete(`/api/postal-statuses/${postalStatuses.ID}`).then(res => res).catch(err => err.response)

            if(response.data.status == "success"){
                await this.load()
            }
            return response.data
        },
        createpostalStatus: async function() {
            const response = await $axios.post(`/api/postal-statuses`,this.createForm)
            .then((res) => (res))
                .catch((err) => {
                    console.log(err)
                    return err.response
                })
            return response.data
        },
        updateById: async function ({id}){
            const response = await $axios.put(`/api/postal-statuses/${id}`,this.updatedForm).then((res) => (res))
                .catch((error) => {
                    return error.response
                })

            return response.data
        },
        getById: async function ({id}) {
            const response = await $axios.get(`/api/postal-statuses/${id}`).then(res => res)
                .catch(err => err.response)
            if(response.data.status == "success"){
                this.$patch({
                    updatedForm: response.data.data
                })
            }
            return response.data
        }

    }





})