<script setup lang="ts">
import { ref, onMounted, Ref } from 'vue'
import { invoke } from '@tauri-apps/api'
import WeatherDashboard from './components/WeatherDashboard.vue'
import MapVisualization from './components/MapVisualization.vue'
import { triggerEarthquakeAlert } from './utils/warningNotifier'

// 状态管理
interface AppState {
  isLoading: boolean
  errorMessage: string | null
  currentWeather: {
    temp: number
    humidity: number
    windSpeed: number
    // 添加其他必要字段
  } | null
  // 添加其他状态字段
}

const state = ref<AppState>({
  isLoading: true,
  errorMessage: null,
  currentWeather: null
}) as Ref<AppState>

// 初始化数据获取
onMounted(async () => {
  try {
    const location = await invoke('get_user_location')
    state.value.currentWeather = await invoke('get_weather_data', { location })
  } catch (error) {
    state.value.errorMessage = `数据加载失败: ${error instanceof Error ? error.message : '未知错误'}`
  } finally {
    state.value.isLoading = false
  }
})
</script>

<template>
  <div class="app-container">

    <!-- 主内容区 -->
    <main class="dashboard-layout">

      <!-- 地震预警板块 -->
      <WeatherDashboard class="warning-section" />

      <!-- 地图可视化 -->
      <section class="map-section">
        <h2>灾害分布图</h2>
        <MapVisualization />
      </section>
    </main>
  </div>
</template>

<style scoped>
.app-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.error-banner {
  padding: 1rem;
  background: #ffebee;
  color: #b71c1c;
  border-radius: 4px;
  margin-bottom: 1rem;
}

.dashboard-layout {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.weather-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.weather-card {
  background: #f5f5f5;
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
}

.label {
  display: block;
  color: #666;
  font-size: 0.9em;
}

.value {
  font-size: 1.5em;
  font-weight: bold;
}

.warning-section,
.map-section {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

h2 {
  color: #2c3e50;
  border-bottom: 2px solid #eee;
  padding-bottom: 0.5em;
  margin-bottom: 1em;
}
</style> 