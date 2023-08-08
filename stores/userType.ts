import {defineStore} from 'pinia'
import {$axios} from "~/plugins/axios";

interface UserTypeStoreState {
    userTypes: Array<IUserType>,
    createForm: IUserType,
    updatedForm: IUserType
    formError: IFormError[]
}


export const UserTypeStore = defineStore('userType', {

    state: (): UserTypeStoreState => ({
        userTypes: [],
        createForm: {} as IUserType,
        updatedForm: {} as IUserType,
        formError: [],
    }),
    getters: {
        userTypesList: (state) => (state.userTypes),
    },
    actions: {

        load: async function () {
            let error = false;

            const response = await $axios.get(`/api/user-types`).then(res => res)
                .catch((err) => {
                    error = true
                    return err.response
                })

            if (!error) {
                this.$patch({
                    userTypes: response.data.data
                })
            }
        },
        remove: async function (userType: IUserType) {
            const response = await $axios.delete(`/api/user-types/${userType.ID}`).then(res => res).catch(err => err.response)



            if (response.data.status == "success") {
                await this.load()
            }
            return response.data
        },
        createUserType: async function () {
            const response = await $axios.post(`/api/user-types`, this.createForm)
                .then((res) => (res))
                .catch((err) => {
                    console.log(err)
                    return err.response
                })
            return response.data
        },
        updateById: async function ({id}) {
            const response = await $axios.put(`/api/user-types/${id}`, this.updatedForm).then((res) => (res))
                .catch((error) => {
                    return error.response
                })

            return response.data
        },
        getById: async function ({id}) {
            const response = await $axios.get(`/api/user-types/${id}`,).then(res => res)
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
