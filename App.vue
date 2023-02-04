<script setup>
import {ref} from 'vue'

const center = ref({ lat: 51.093048, lng: 6.84212})
const markers = ref([
  { position: { lat: 51.093048, lng: 6.84212 }}
])
</script>

<template>
  <GMapMap :center="center" :zoom="7" style="width: 800px; height: 300px" />
</template>

<style scoped>
button {
  font-weight: bold;
}
</style>