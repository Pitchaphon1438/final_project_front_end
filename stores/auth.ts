import {defineStore} from 'pinia'
import {$axios} from "~/plugins/axios";

interface LoginForm {
    username: string;
    password: string;
}

interface AuthStoreState {

    counter: number;
    loginForm: LoginForm
    currentUser: IUser
}


export const AuthStore = defineStore('auth', {

    state: (): AuthStoreState => ({
        counter: 0,
        loginForm: {} as LoginForm,
        currentUser: null
    }),

    actions: {
        loadFromLocalStorage : async  function() {
            console.log("loadFromLocalStorage")
            let currentUser = localStorage.getItem('currentUser')
            let token = localStorage.getItem('token')

            if (currentUser && token) {
                this.currentUser = JSON.parse(currentUser)
                this.token = token;

                $axios.defaults.headers.common['Authorization'] =
                    `Bearer ${token}`
            }else {
                localStorage.removeItem('currentUser')
                localStorage.removeItem('token')
            }
        },
        me: async function () {
            let {data} = await $axios.get('/me')
            if (data.status == "success") {
                console.log(data.data);
                this.currentUser = data.data
                localStorage.setItem('currentUser',JSON.stringify(this.currentUser))
            }else {
                localStorage.removeItem('currentUser')
            }
        },
        login: async function () {
            console.log(this.loginForm);
            let response = await $axios.post('/login', this.loginForm)
            console.log(response)

            let data = response.data
            if (data.status == "success") {
                let result = data.data
                let token = result.token
                console.log(token)

                $axios.defaults.headers.common['Authorization'] =
                    `Bearer ${token}`

                await this.me()

                localStorage.setItem('token',token)
            }else {
                localStorage.removeItem('token')
            }
        },
        logout() {
            $axios.defaults.headers.common['Authorization'] = ``
            this.currentUser = null

            localStorage.removeItem('token')
            localStorage.removeItem('currentUser')

        }
    }


})
