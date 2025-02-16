<script setup>
import { useTheme } from 'vuetify';


import axios from 'axios';
import { onMounted, onUnmounted, ref } from 'vue';

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
const currentTheme = vuetifyTheme.current.value.colors

const series = [{
  name: 'Subscribers',
  data: [
    200,
    55,
    400,
    250,
  ],
}]

const chartOptions = {
  chart: {
    type: 'area',
    parentHeightOffset: 0,
    toolbar: { show: false },
    sparkline: { enabled: true },
  },
  markers: {
    colors: 'transparent',
    strokeColors: 'transparent',
  },
  grid: { show: false },
  colors: [currentTheme.success],
  fill: {
    type: 'gradient',
    gradient: {
      shadeIntensity: 0.9,
      opacityFrom: 0.5,
      opacityTo: 0.07,
      stops: [
        0,
        80,
        100,
      ],
    },
  },
  dataLabels: { enabled: false },
  stroke: {
    width: 2,
    curve: 'smooth',
  },
  xaxis: {
    show: true,
    lines: { show: false },
    labels: { show: false },
    stroke: { width: 0 },
    axisBorder: { show: false },
  },
  yaxis: {
    stroke: { width: 0 },
    show: false,
  },
  tooltip: { enabled: false },
}
</script>

<template>
  <VCard>
    <VCardItem class="pb-3">
      <VCardTitle>
        Sales
      </VCardTitle>
      <VCardSubtitle>
        Last Year
      </VCardSubtitle>
    </VCardItem>

    <VueApexCharts
      :options="chartOptions"
      :series="series"
      :height="68"
    />

    <VCardText class="pt-1">
      <div class="d-flex align-center justify-space-between gap-x-2">
        <h4 class="text-h4 text-center">
{{ randomNumber }}K
        </h4>
        <span class="text-sm text-error">
{{ randomNumber }}%
        </span>
      </div>
    </VCardText>
  </VCard>
</template>
