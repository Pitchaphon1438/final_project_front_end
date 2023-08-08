import {defineStore} from 'pinia'

interface TestStoreState {

    counter: number;
}


export const TestStore = defineStore('test', {

    state: (): TestStoreState => ({
        counter : 0,
    }),

    actions: {
        increment() {
            this.counter++
        },
        decrement() {
            this.counter--
        }
    }


})
