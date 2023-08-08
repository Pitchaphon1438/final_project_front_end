<template>
  <NuxtLayout name="app">
    <template #breadcrumb>
      <Breadcrumb :items="[{text:'Dashboard',href:'/console'}]"/>
    </template>

    <template #page-header>
      Console
    </template>

    <template #default>
      <div>Content Row1</div>
      <div>Content Row2</div>
    </template>
  </NuxtLayout>
</template>

<script setup lang="ts">

definePageMeta({
  layout: false
})

</script>

<style scoped>
</style>
