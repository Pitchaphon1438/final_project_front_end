<template>
  <div>
    <div class="container my-24 px-6 mx-auto">
      <section class="mb-32 text-gray-800 text-center lg:text-top">
        <div
          class="px-6 py-12 md:px-12"
          style="background-color: hsl(0, 0%, 96%)"
        >
          <div class="grid lg:grid-cols-2 gap-12 flex items-center">
            <div class="mt-12 lg:mt-0">
               <img class="ml-36 " src="https://www.freepnglogos.com/uploads/logo-home-png/vector-brush-home-logo-download-vector-logos-6.png" alt="">
              <h1 class="text-5xl font-bold tracking-tight leading-tight mb-12 text-blue-900">Postal Service</h1>
            </div>
            <div class="mb-12 lg:mb-0">
              <div
                class="block rounded-lg shadow-lg bg-white px-6 py-12 md:px-12"
              >
                <form>
                  <h1 class="font-bold  text-2xl  mb-4 text-blue-900 ">Register</h1>
                  <div class="grid md:grid-cols-2 md:gap-6">
                    <div class="mb-6">
                      <input
                        type="text"
                        class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        placeholder="First name"
                      />
                    </div>
                    <div class="mb-6">
                      <input
                        type="text"
                        class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        placeholder="Last name"
                      />
                    </div>
                  </div>
                  <input
                    type="email"
                    class="form-control block w-full px-3 py-1.5 mb-6 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder="Email address"
                  />
                  <input
                    type="password"
                    class="form-control block w-full px-3 py-1.5 mb-6 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder="Password"
                  />
                  <div class="flex justify-start mb-6">

                  </div>
                  <NuxtLink to="/">
                    <button
                    type="button"
                    data-mdb-ripple="true"
                    data-mdb-ripple-color="light"
                    class="rounded-md inline-block px-6 py-2.5 mb-6 w-full bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    Register
                  </button>
                  </NuxtLink>
                
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout:"blank-layout"
})
</script>