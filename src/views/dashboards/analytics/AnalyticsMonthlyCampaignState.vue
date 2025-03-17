<script setup>
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

// هر آیتم از `monthlyCampaignState` یک `ref` مستقل برای `stats` دارد.
const monthlyCampaignState = [
  {
    avatarColor: 'success',
    avatarIcon: 'tabler-mail',
    title: 'Emails',
    count: '12,346',
    stats: ref(randomNumber.value),  // استفاده از `ref` برای مقدار جداگانه
    statsColor: 'success',
  },
  {
    avatarColor: 'info',
    avatarIcon: 'tabler-link',
    title: 'Opened',
    count: '8,734',
    stats: ref(randomNumber.value),  // استفاده از `ref` برای مقدار جداگانه
    statsColor: 'success',
  },
  {
    avatarColor: 'warning',
    avatarIcon: 'tabler-mouse',
    title: 'Clicked',
    count: '967',
    stats: ref(randomNumber.value),  // استفاده از `ref` برای مقدار جداگانه
    statsColor: 'error',
  },
  {
    avatarColor: 'primary',
    avatarIcon: 'tabler-users',
    title: 'Subscribe',
    count: '345',
    stats: ref(randomNumber.value),  // استفاده از `ref` برای مقدار جداگانه
    statsColor: 'success',
  },
  {
    avatarColor: 'secondary',
    avatarIcon: 'tabler-alert-triangle',
    title: 'Complaints',
    count: '10',
    stats: ref(randomNumber.value),  // استفاده از `ref` برای مقدار جداگانه
    statsColor: 'error',
  },
  {
    avatarColor: 'error',
    avatarIcon: 'tabler-ban',
    title: 'Unsubscribe',
    count: '86',
    stats: ref(randomNumber.value),  // استفاده از `ref` برای مقدار جداگانه
    statsColor: 'success',
  },
]

const moreList = [
  {
    title: 'Refresh',
    value: 'refresh',
  },
  {
    title: 'Download',
    value: 'Download',
  },
  {
    title: 'View All',
    value: 'View All',
  },
]
</script>

<template>
  <VCard>
    <VCardItem>
      <VCardTitle>Monthly Campaign State</VCardTitle>
      <VCardSubtitle>
        8.52k Social Visitors
      </VCardSubtitle>
      <template #append>
        <div class="mt-n4 me-n2">
          <MoreBtn
            size="small"
            :menu-list="moreList"
          />
        </div>
      </template>
    </VCardItem>

    <VCardText>
      <VList class="card-list">
        <VListItem
          v-for="state in monthlyCampaignState"
          :key="state.title"
        >
          <template #prepend>
            <VAvatar
              :color="state.avatarColor"
              variant="tonal"
              size="34"
              rounded
              class="me-1"
            >
              <VIcon
                :icon="state.avatarIcon"
                size="22"
              />
            </VAvatar>
          </template>

          <VListItemTitle class="font-weight-medium me-4">
            {{ state.title }}
          </VListItemTitle>

          <template #append>
            <div class="d-flex gap-x-4">
              <div class="text-body-1">
                {{ state.count }}
              </div>
              <div :class="`text-${state.statsColor}`">
                {{ state.stats }}  <!-- استفاده از `state.stats` که به `randomNumber.value` متصل است -->
              </div>
            </div>
          </template>
        </VListItem>
      </VList>
    </VCardText>
  </VCard>
</template>

<style lang="scss" scoped>
.card-list {
  --v-card-list-gap: 1.5rem;
}
</style>
