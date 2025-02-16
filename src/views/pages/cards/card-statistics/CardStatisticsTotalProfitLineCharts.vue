<script setup>
import { hexToRgb } from '@core/utils/colorConverter';
import axios from 'axios';
import { onMounted, onUnmounted, ref } from 'vue';
import { useTheme } from 'vuetify';

const randomNumber = ref(null);

const fetchRandomNumber = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/random-number');
    randomNumber.value = response.data.randomNumber; 
    console.log('Random Number:', randomNumber.value); 
  } catch (error) {
    console.error('API error:', error);
  }
};

onMounted(() => {
  fetchRandomNumber();

  const intervalId = setInterval(fetchRandomNumber, 4000);

  onUnmounted(() => {
    clearInterval(intervalId);
  });
});

const vuetifyTheme = useTheme()

const series = [{
  data: [
    0,
    25,
    10,
    40,
    25,
    55,
  ],
}]

const chartOptions = computed(() => {
  const currentTheme = vuetifyTheme.current.value.colors
  const variableTheme = vuetifyTheme.current.value.variables
  
  return {
    chart: {
      height: 90,
      type: 'line',
      parentHeightOffset: 0,
      toolbar: { show: false },
    },
    grid: {
      borderColor: `rgba(${ hexToRgb(String(variableTheme['border-color'])) },${ variableTheme['border-opacity'] })`,
      strokeDashArray: 6,
      xaxis: { lines: { show: true } },
      yaxis: { lines: { show: false } },
      padding: {
        top: -18,
        left: -4,
        right: 7,
        bottom: -10,
      },
    },
    colors: [currentTheme.info],
    stroke: { width: 2 },
    tooltip: {
      enabled: false,
      shared: false,
      intersect: true,
      x: { show: false },
    },
    xaxis: {
      labels: { show: false },
      axisTicks: { show: false },
      axisBorder: { show: false },
    },
    yaxis: { labels: { show: false } },
    markers: {
      size: 3.5,
      fillColor: currentTheme.info,
      strokeColors: 'transparent',
      strokeWidth: 3.2,
      discrete: [{
        seriesIndex: 0,
        dataPointIndex: 5,
        fillColor: currentTheme.surface,
        strokeColor: currentTheme.info,
        size: 5,
        shape: 'circle',
      }],
      hover: { size: 5.5 },
    },
    responsive: [{
      breakpoint: 960,
      options: { chart: { height: 110 } },
    }],
  }
})
</script>

<template>
  <VCard>
    <VCardItem class="pb-3">
      <VCardTitle>
        Profit
      </VCardTitle>
      <VCardSubtitle>
        Last Month
      </VCardSubtitle>
    </VCardItem>
    <VCardText>
      <VueApexCharts
        type="line"
        :options="chartOptions"
        :series="series"
        :height="68"
      />

      <div class="d-flex align-center justify-space-between gap-x-2 mt-3">
        <h4 class="text-h4 text-center font-weight-medium">
          624k
        </h4>
        <span class="text-sm text-success">
          {{ randomNumber }}
        </span>
      </div>
    </VCardText>
  </VCard>
</template>
