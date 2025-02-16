<script setup>
import auFlag from '@images/icons/countries/au.png';
import brFlag from '@images/icons/countries/br.png';
import cnFlag from '@images/icons/countries/cn.png';
import frFlag from '@images/icons/countries/fr.png';
import inFlag from '@images/icons/countries/in.png';
import usFlag from '@images/icons/countries/us.png';
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

const salesByCountries = [
  {
    avatarImg: usFlag,
    stats: randomNumber,
    subtitle: 'United states',
    profitLoss: randomNumber.value,
  },
  {
    avatarImg: brFlag,
    stats: randomNumber,
    subtitle: 'Brazil',
    profitLoss: randomNumber.value,
  },
  {
    avatarImg: inFlag,
    stats: randomNumber,
    subtitle: 'India',
    profitLoss: randomNumber.value,
  },
  {
    avatarImg: auFlag,
    stats: randomNumber,
    subtitle: 'Australia',
    profitLoss: randomNumber.value,
  },
  {
    avatarImg: frFlag,
    stats: randomNumber,
    subtitle: 'France',
    profitLoss: randomNumber.value,
  },
  {
    avatarImg: cnFlag,
    stats: randomNumber,
    subtitle: 'China',
    profitLoss: randomNumber.value,
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
  <VCard
    title="Sales by Countries"
    subtitle="Monthly Sales Overview"
  >
    <template #append>
      <div class="mt-n4 me-n2">
        <MoreBtn
          size="small"
          :menu-list="moreList"
        />
      </div>
    </template>

    <VCardText>
      <VList class="card-list">
        <VListItem
          v-for="country in salesByCountries"
          :key="country.stats"
        >
          <template #prepend>
            <VAvatar
              size="34"
              color="secondary"
              variant="tonal"
              class="me-1"
              :image="country.avatarImg"
            />
          </template>

          <VListItemTitle class="font-weight-medium">
            {{ country.stats }}
          </VListItemTitle>
          <VListItemSubtitle>
            {{ country.subtitle }}
          </VListItemSubtitle>

          <template #append>
            <div :class="`d-flex align-center ${country.profitLoss > 0 ? 'text-success' : 'text-error'}`">
              <VIcon
                :icon="country.profitLoss > 0 ? 'tabler-chevron-up' : 'tabler-chevron-down'"
                size="20"
                class="me-1"
              />
              <div class="font-weight-medium">
                {{ Math.abs(country.profitLoss) }}%
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
  --v-card-list-gap: 1rem;
}
</style>
