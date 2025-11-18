<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router'; // Para leer el ID del producto de la URL
import { useReviewStore } from '@/stores/reviewStore';
import ReviewForm from '@/components/ReviewForm.vue'; // Importamos el componente del formulario

const reviewStore = useReviewStore();
const route = useRoute();

// Obtenemos el ID del producto desde la URL (ej: /productos/123)
const productId = route.params.id;

// Cuando el componente se carga, buscamos las reseñas para ESE producto
onMounted(() => {
  reviewStore.fetchReviewsForProduct(productId);
});
</script>

<template>
  <div>
    <h1>Reseñas del Producto</h1>

    <!-- Componente para agregar una nueva reseña -->
    <ReviewForm :product-id="productId" />
    <hr />

    <!-- Lista de reseñas existentes -->
    <h2>Comentarios</h2>
    <div v-if="reviewStore.isLoading">Cargando reseñas...</div>
    <div v-else-if="reviewStore.error">{{ reviewStore.error }}</div>
    <ul v-else>
      <li v-for="review in reviewStore.reviews" :key="review.id" :class="`sentiment-${review.sentiment}`">
        <p><strong>Comentario:</strong> {{ review.comment }}</p>
        <span><strong>Calificación:</strong> {{ review.rating }} / 5</span>
        <br>
        <!-- Mostramos el resultado del análisis de sentimiento que viene del backend -->
        <span><strong>Sentimiento:</strong> {{ review.sentiment }}</span>
      </li>
    </ul>
    <div v-if="!reviewStore.isLoading && reviewStore.reviews.length === 0">
        Sé el primero en dejar una reseña para este producto.
    </div>
  </div>
</template>

<style scoped>
/* Estilos para visualizar el sentimiento */
li.sentiment-positivo {
  border-left: 4px solid #4CAF50; /* Verde */
  padding-left: 10px;
}
li.sentiment-negativo {
  border-left: 4px solid #F44336; /* Rojo */
  padding-left: 10px;
}
li.sentiment-neutral {
    border-left: 4px solid #FFC107; /* Amarillo */
    padding-left: 10px;
}
</style>