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




onMounted(fetchRandomNumber);
const assignmentData = [
  {
    title: 'User Experience Design',
    tasks: 120,
    progress:randomNumber ,
    color: 'primary',
  },
  {
    title: 'Basic fundamentals',
    tasks: 32,
    progress: randomNumber,
    color: 'success',
  },
  {
    title: 'React Native components',
    tasks: 182,
    progress: randomNumber,
    color: 'error',
  },
  {
    title: 'Basic of music theory',
    tasks: 56,
    progress: randomNumber,
    color: 'info',
  },
]
</script>

<template>
  <VCard>
    <VCardItem title="Assignment progress">
      <template #append>
        <MoreBtn />
      </template>
    </VCardItem>
    <VCardText>
      <VList class="card-list">
        <VListItem
          v-for="assignment in assignmentData"
          :key="assignment.title"
        >
          <template #prepend>
            <VProgressCircular
              v-model="assignment.progress"
              :size="54"
              class="me-4"
              :color="assignment.color"
            >
              <span class="text-body-1 text-high-emphasis font-weight-medium">
                {{ assignment.progress }}%
              </span>
            </VProgressCircular>
          </template>
          <VListItemTitle class="font-weight-medium mb-2 me-2">
            {{ assignment.title }}
          </VListItemTitle>

          <VListItemSubtitle class="me-2">
            {{ assignment.tasks }} Tasks
          </VListItemSubtitle>
          <template #append>
            <VBtn
              icon
              variant="tonal"
              color="secondary"
              rounded
              size="30"
            >
              <VIcon
                icon="tabler-chevron-right"
                size="20"
                class="flip-in-rtl"
              />
            </VBtn>
          </template>
        </VListItem>
      </VList>
    </VCardText>
  </VCard>
</template>

<style lang="scss" scoped>
.card-list {
  --v-card-list-gap: 2rem;
}
</style>
