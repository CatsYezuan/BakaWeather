<script setup lang="ts">
import { onMounted, ref } from 'vue'
import L from 'leaflet'

const mapContainer = ref<HTMLElement>()

onMounted(() => {
  if (mapContainer.value) {
    const map = L.map(mapContainer.value).setView([35.68, 139.76], 6)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map)
  }
})
</script>

<template>
  <div ref="mapContainer" class="map-container"></div>
</template>

<style scoped>
.map-container {
  height: 400px;
  border-radius: 8px;
  overflow: hidden;
}
</style> 