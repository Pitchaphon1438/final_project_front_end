<template>
  <v-carousel hide-delimiters>
    <v-carousel-item
      v-for="(item,i) in items"
      :key="i"
      :src="item.src"
      cover
    ></v-carousel-item>
  </v-carousel>
</template>

<script>

export default {
    data () {
      return {
        items: [
          {
            src: 'https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
          },
          {
            src: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
          },
          {
            src: 'https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
          },
          {
            src: 'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
          },
        ],
      }
    },
  }

</script>

<style scoped>
</style>
