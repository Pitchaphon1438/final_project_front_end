<template>
  <div class="bg-gray-200 h-screen">
    <div class="flex flex-col">
      <div class="text-white text-3xl bg-gray-900 py-2">
        Test Page
      </div>
      <div>
        <div class="flex flex-col">
          <div class="text-9xl justify-center self-center">
            {{ testStore.counter }}
          </div>
          <div class="flex flex-row justify-evenly w-96 self-center">
            <button type="button" @click="testStore.increment"
                    class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
              Increment
            </button>
            <button type="button" @click="testStore.decrement"
                    class="inline-block px-6 py-2.5 bg-gray-200 text-gray-700 font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-300 hover:shadow-lg focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-400 active:shadow-lg transition duration-150 ease-in-out">
              Decrement
            </button>
          </div>
        </div>
      </div>

      <div>
        <InputText v-model="rec.data" :error="error.data" label="Name" placeholder="Name placeholder"/>
        DATA : {{ rec.data }}
        <button class="p-2 bg-gray-400" @click="error.data = {'msg' : 'test'}">LoadErrorModel</button>
        <button class="p-2 bg-gray-400" @click="error.data = undefined">Clear Error</button>
      </div>

      <div>
        {{ config.apiUrl }}
      </div>

      <div class="flex flex-col">

        <div class="text-3xl">Test Datepicker</div>
        <div class="flex flex-col">
          <div class="w-1/2 text-blue-300">
            <Datepicker v-model="date" inputClassName="text-blue-300 bg-green-300"></Datepicker>
          </div>
          <div>Date : {{ date }}</div>

        </div>

        <div class="text-3xl">V-for Example</div>
        <div class="text-xl">
          Normal Array V-for
        </div>
        <ul class="flex flex-row">
          <li class="px-2 first:pl-0 last:pr-0"
              v-for="n in numbers"
              v-bind:key="n">{{ n }}
          </li>
        </ul>

        <div class="text-xl">
          Normal String V-for
        </div>
        <ul class="flex flex-row">
          <li class="px-2 first:pl-0 last:pr-0"
              v-for="s in somestring"
              v-bind:key="s">{{ s }}
          </li>
        </ul>

        <div class="text-xl">
          [String] V-for
        </div>
        <ul class="flex flex-row">
          <li class="px-2 first:pl-0 last:pr-0"
              v-for="s in stringlist"
              v-bind:key="s">{{ s }}
          </li>
        </ul>

        <div class="text-xl">
          Simple Object V-for
        </div>
        <ul class="flex flex-row">
          <li class="px-2 first:pl-0 last:pr-0"
              v-for="(value,key) in momo"
              v-bind:key="key">{{ key }} : {{ value }},
          </li>
        </ul>

        <div class="text-xl">
          Array of Object V-for
        </div>
        <ul class="flex flex-col">
          <li class=""
              v-for="(value,key) in pets"
              v-bind:key="key">index[{{ key }}] : {{ value.name }} - {{ value.type }},
          </li>
        </ul>
      </div>
    </div>

  </div>

</template>

<script setup lang="ts">
import {TestStore} from "~~/stores/test"
import {reactive} from "vue";
import {$axios} from "~/plugins/axios";

definePageMeta({
  layout: "blank-layout"
})
const date = ref(null)
const testStore = TestStore()
const config = useRuntimeConfig()




let {data} = await useAsyncData('get_room', async () => {

  let {data} = await $axios.get("/api/room")

  return data

})

console.log(data)

let numbers: Array<number> = [1, 1, 2, 3, 5, 8, 13, 21]
let somestring: string = "Hello world"
let stringlist: Array<string> = [
  "abc", "def", "ghi"
]

interface Pet {
  name: string,
  type: string,
}

let momo: Pet = {
  name: "Momo",
  type: "Cat",
}

let pets: Array<Pet> = [
  {name: "Momo", type: "Cat"},
  {name: "Key", type: "Dog"},
  {name: "Alice", type: "Rabbit"},
  {name: "Doctor", type: "Turtle"},

]

let rec = reactive({
  data: "HELLO",
})

let error = reactive({
  data: undefined
})

</script>

<style scoped>

</style>