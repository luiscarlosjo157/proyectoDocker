<script setup>
import { onMounted, computed } from "vue";
import { useProductStore } from "@/stores/productStore";
import Spinner from '@/components/Spinner.vue';

// 1. Obtenemos una instancia de nuestro store de productos
const productStore = useProductStore();

// 2. Usamos onMounted para ejecutar una acción cuando el componente se carga por primera vez
onMounted(() => {
  // 3. Llamamos a la acción que busca los productos en la API
  productStore.fetchProducts();
});

// Creamos una propiedad computada para manejar la nueva estructura de datos
const productList = computed(() => {
   return productStore.products.map((item) => ({
    ...item.product, // Extraemos el objeto producto (id, name, description)
    averageRating: item.averageRating, // y añadimos las propiedades extra
    reviewCount: item.reviewCount,
  }));
});
</script>

<template>
  <div class="products-page">
    <div class="header">
      <h1>Nuestros Productos</h1>
    </div>

    <!-- 2. Contenedor relativo para posicionar el spinner -->
    <div class="content-wrapper">
      <!-- 3. Usa el spinner en lugar del texto "Cargando..." -->
      <Spinner v-if="productStore.isLoading" />

      <div v-else-if="productStore.error" class="error-message">{{ productStore.error }}</div>
      
      <!-- 4. Mensaje para cuando no hay productos -->
      <div v-else-if="!productList.length" class="empty-state">
        <p>No se encontraron productos. ¡Intenta agregar uno!</p>
      </div>

      <!-- 5. Cambiamos la lista por una cuadrícula de tarjetas -->
      <div v-else class="product-grid">
        <div v-for="product in productList" :key="product.id" class="product-card">
          <div class="card-content">
            <h2>{{ product.name }}</h2>
            <p>{{ product.description || 'Este producto no tiene descripción.' }}</p>

            <div class="product-stats">
              <span v-if="product.reviewCount > 0">
                ⭐ Calificación: {{ product.averageRating.toFixed(1) }}
              </span>
              <span v-else>⭐ Sin calificar</span>
              <span>💬 Reseñas: {{ product.reviewCount }}</span>
            </div>
          </div>
          <div class="card-actions">
            <router-link :to="`/productos/${product.id}`" class="button">
              Ver detalles y reseñas
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Estilos para el nuevo layout */
.content-wrapper {
  position: relative; /* Necesario para que el spinner se posicione correctamente */
  min-height: 200px; /* Evita que el contenedor colapse mientras carga */
}
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}
.product-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
}
.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
}
.card-content {
  padding: 1.5rem;
}
.card-content h2 {
  margin-top: 0;
}
.product-stats {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  color: #555;
  font-size: 0.9em;
}
.card-actions {
  padding: 0 1.5rem 1.5rem;
}
.button {
  display: inline-block;
  background-color: #09f;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 5px;
  text-align: center;
  text-decoration: none;
  font-weight: bold;
  transition: background-color 0.2s;
}
.button:hover {
  background-color: #007acc;
}
.empty-state, .error-message {
  text-align: center;
  padding: 3rem;
  color: #666;
}
.error-message {
  color: #e53e3e;
  background-color: #fff5f5;
  border: 1px solid #e53e3e;
  border-radius: 8px;
}
/* ... otros estilos ... */
</style>