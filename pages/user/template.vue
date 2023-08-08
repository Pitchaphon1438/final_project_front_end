<template>
    <NuxtLayout name="appuser">
      <template #breadcrumb>
        <Breadcrumb :items="[{text:'Dashboard',href:'/user'}]"/>
      </template>
  
      <template #page-header>
        User
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
  