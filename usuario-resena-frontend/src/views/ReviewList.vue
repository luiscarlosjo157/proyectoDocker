<script setup>
import { onMounted } from 'vue';
import { useReviewStore } from '@/stores/reviewStore';

const reviewStore = useReviewStore();
const props = defineProps(['productId']);

onMounted(() => {
  reviewStore.fetchReviews(props.productId);
});
</script>

<template>
  <div v-if="reviewStore.isLoading">Cargando reseñas...</div>
  <div v-else-if="reviewStore.error">{{ reviewStore.error }}</div>
  <ul v-else>
    <li v-for="review in reviewStore.reviews" :key="review.id">
      <p>{{ review.text }}</p>
      <span>Sentimiento: {{ review.sentiment }}</span>
      <!-- Podrías mostrar un ícono o color basado en el sentimiento -->
    </li>
  </ul>
</template>