import {defineStore} from 'pinia'
import {$axios} from "~/plugins/axios";

interface RoomStoreState {
    rooms: Array<IRoom>,
    createForm: IRoom,
    updateForm: IRoom
    formError: IFormError[]

}
export const RoomStoreState = defineStore('rooms',{
    
    state: (): RoomStoreState => ({ 
        rooms: [],
        createForm: {} as IRoom,
        updateForm: {} as IRoom,
        formError:[],
    }),
    getters:{
        roomsList: (state) => (state.rooms),
    },
    actions:{
        load: async function () {
            let error = false;

            const response = await $axios.get(`/api/room`).then(res => res)
                .catch((err) =>{
                    error = true
                    return err.response
                })
            if(!error){
                this.$patch({
                    rooms: response.data.data
                })
            }
        },
        remove: async function(room: IRoom) { 
            const {data} = await $axios.delete(`/api/room/${room.ID}`).then(r => r).catch(r => r.data)

            if (data.state == "success") {
                await this.load()
            }
            return data
           
        },
       
        createRooms: async function(){
            const response = await $axios.post(`/api/room`,this.createForm)
                .then((res) => (res))
                .catch((err) =>{
                    console.log(err)
                    return err.response
                })
            return response.data
        },
        updateById: async function ({id}){
            console.log(this.updateForm)
            const response = await $axios.put(`/api/room/${id}`,this.updateForm).then((res) => (res))
            .catch((err) =>{
                return err.response
            })
            return response.data
        },
        getById: async function ({id}){
            const response = await $axios.get(`/api/room/${id}`,).then(res => res)
            .catch(err => err.response)
            if(response.data.state == "success"){
                this.$patch({
                    updateForm: response.data.data
                })
            }
            return response.data
        }
    }

})