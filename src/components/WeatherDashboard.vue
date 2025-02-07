<template>
  <!-- No changes to template section -->
</template>

<script setup>
import { ref } from 'vue'

const eqWarnings = ref([])

const fetchEarthquakeWarnings = async () => {
  try {
    console.log('开始获取地震数据')
    const response = await fetch('https://api.wolfx.jp/sc_eew.json')
    console.debug('响应状态:', response.status)
    const data = await response.json()
    console.table(data.slice(0,3)) // 显示前3条数据
    eqWarnings.value = data
      .filter(item => 
        item?.Report?.Head?.ReportType === "警报" && 
        item?.Report?.Head?.ReportClass === "震源"
      )
      .map(item => ({
        magnitude: item.Report.Body.Earthquake.JmaMagnitude,
        location: item.Report.Body.Earthquake.RegionName
      }))
  } catch (error) {
    console.error('请求失败:', error)
  }
}
</script>

<style>
  /* No changes to style section */
</style> 