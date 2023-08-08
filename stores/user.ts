import {defineStore} from 'pinia'
import {$axios} from "~/plugins/axios";

interface UserStoreState{
    users: Array<IUser>,
    createForm: IUser,
    updatedForm: IUser
    formError: IFormError[]
}
export const UserStore = defineStore('user',{
    state: (): UserStoreState =>({
        users: [],
        createForm: {} as IUser,
        updatedForm: {} as IUser,
        formError: [],
    }),
    getters:{
        usersList: (state) => (state.users),
    },
    actions: {
        load: async function (){
            let error = false;
            const response = await $axios.get(`/api/users`).then(res => res)
            .catch((err) => {
                error = true
                return err.response
            })

            if (!error) {
                this.$patch({
                    users: response.data.data
                })
            }
        },
        remove: async function (users: IUser){
            const response = await $axios.delete(`/api/users/${users.ID}`).then(res => res).catch(err => err.response)
            if (response.data.status == "success") {
                await this.load()
            }
            return response.data
        },
        createUser: async function (){
            const response = await $axios.post(`/api/users`, this.createForm)
                .then((res) => (res))
                .catch((err) => {
                    console.log(err)
                    return err.response
            })
            return response.data
        },
        updateById: async function ({id}){
            const response = await $axios.put(`/api/users/${id}`, this.updatedForm).then((res) => (res))
                .catch((error) => {
                    return error.response
                })

            return response.data
        },
        getById: async function ({id}) {
            const response = await $axios.get(`/api/users/${id}`,).then(res => res)
            .catch(err => err.response)
            if (response.data.status == "success") {
                this.$patch({
                    updatedForm: response.data.data
                })
            }
            return response.data
        }
    }
})