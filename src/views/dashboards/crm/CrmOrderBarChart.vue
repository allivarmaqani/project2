
<script setup>
import axios from 'axios';
import { onMounted, onUnmounted, ref } from 'vue';

const randomNumber = ref(null); // متغیر برای ذخیره عدد تصادفی

// تابعی برای دریافت عدد تصادفی
const fetchRandomNumber = async () => {
  try {
    // درخواست به API
    const response = await axios.get('http://localhost:3000/api/random-number');
    
    // بررسی وضعیت پاسخ
    if (response.status === 200 && response.data.randomNumber !== undefined) {
      randomNumber.value = response.data.randomNumber; // ذخیره عدد تصادفی
    } else {
      console.error('Invalid response:', response); // در صورت دریافت پاسخ نادرست
      randomNumber.value = generateRandomNumber(); // تولید عدد تصادفی در صورت خطا
    }
  } catch (error) {
    console.error('API error:', error); // خطاهای درخواست API
    randomNumber.value = generateRandomNumber(); // تولید عدد تصادفی در صورت بروز خطا
  }
};

// تابعی برای تولید عدد تصادفی به صورت دستی در صورت بروز خطا
const generateRandomNumber = () => {
  return Math.floor(Math.random() * (1000 - 100 + 1)) + 100; // عدد تصادفی بین 100 و 1000
};

onMounted(() => {
  fetchRandomNumber(); // دریافت عدد تصادفی هنگام بارگذاری کامپوننت

  const intervalId = setInterval(fetchRandomNumber, 4000); // درخواست مجدد هر 4 ثانیه

  onUnmounted(() => {
    clearInterval(intervalId); // پاک کردن تایمر هنگام حذف کامپوننت
  });
});
</script>

<template>
  <VCard>
    <VCardItem class="pb-3">
      <VCardTitle>Orders</VCardTitle>
      <VCardSubtitle>Last Week</VCardSubtitle>
    </VCardItem>

    <VCardText>
      <VueApexCharts
        :options="chartOptions"
        :series="series"
        :height="62"
      />

      <div class="d-flex align-center justify-space-between gap-x-2 mt-3">
        <h4 class="text-h4 text-center">
          {{ randomNumber }}K
        </h4>
        <div class="text-sm text-success">
          {{ randomNumber }}%
        </div>
      </div>
    </VCardText>
  </VCard>
</template>
