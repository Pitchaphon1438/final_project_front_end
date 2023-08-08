<template>
  <div class="">
    <NuxtLink to="/console">
      <v-icon icon="mdi-home"/>
      <span>Console</span>
    </NuxtLink>
    <span>
      <template v-for="i in items" v-bind:key="i.href">
        > <NuxtLink v-if="!i.disabled" :to="i.href">{{ i.text }}</NuxtLink>
        <span class="text-gray-400 hover:cursor-default" v-else>{{i.text}}</span>
      </template>
      </span>
  </div>
</template>
<script lang="ts">
import {PropType} from "vue";


interface IBreadcrumbItem {
  icon?: string;
  text: string;
  href?: string;
  disabled?: boolean
}

class BreadcrumbItem implements IBreadcrumbItem {
  icon = ""
  text = "default"
  href = "#"
  disabled = false

  constructor(obj: IBreadcrumbItem) {
    this.icon = obj.icon
    this.text = obj.text
    this.href = obj.href
    this.disabled = obj.disabled
  }
}

const defaultBreadcrumbItem = new BreadcrumbItem({icon: "", text: "default", href: "#", disabled: false})
</script>
<script setup lang="ts">

const props = defineProps({
  items: {
    type: Object as PropType<Array<IBreadcrumbItem>>,
    default: [defaultBreadcrumbItem]
  },
})
</script>

<style scoped>
</style>
