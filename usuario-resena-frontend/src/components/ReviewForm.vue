<script setup>
import { ref } from 'vue';
import { useReviewStore } from '@/stores/reviewStore';

// Este componente recibe el productId como una "prop" desde la vista padre
const props = defineProps({
  productId: {
    type: [String, Number],
    required: true
  }
});

const reviewStore = useReviewStore();
const comment = ref('');
const rating = ref(5);
// En una app real, el userId vendría de un store de autenticación.
// Por ahora, lo dejamos fijo para el ejemplo.
const userId = ref(1); 
const errorMessage = ref(null);
const successMessage = ref(null);

const handleSubmit = async () => {
  errorMessage.value = null;
  successMessage.value = null;
  if (comment.value.trim() === '') {
    errorMessage.value = 'Tu reseña debe tener al menos 10 caracteres.';
    return;
  }

  const reviewData = {
    comment: comment.value,
    rating: rating.value,
    userId: userId.value,
    productId: Number(props.productId) // Aseguramos que sea un número
  };

  // Llamamos a la acción del store para enviar la reseña al backend
  const result = await reviewStore.submitReview(reviewData);

 if (result.success) {
    // Limpia el formulario y muestra mensaje de éxito
    comment.value = '';
    rating.value = 5;
    successMessage.value = '¡Gracias por tu reseña!';
    // Oculta el mensaje de éxito después de 3 segundos
    setTimeout(() => successMessage.value = null, 3000);
  } else {
    // Muestra el mensaje de error
    errorMessage.value = result.message;
  }
};
</script>

<template>
  <form @submit.prevent="handleSubmit" class="review-form">
    <h3>Deja tu reseña</h3>
    
    <div class="form-group">
      <label for="rating">Calificación:</label>
      <select id="rating" v-model="rating" class="form-control">
        <option value="5">⭐⭐⭐⭐⭐ (Excelente)</option>
        <option value="4">⭐⭐⭐⭐ (Bueno)</option>
        <option value="3">⭐⭐⭐ (Regular)</option>
        <option value="2">⭐⭐ (Malo)</option>
        <option value="1">⭐ (Muy malo)</option>
      </select>
    </div>

    <div class="form-group">
      <label for="comment">Comentario:</label>
      <textarea id="comment" v-model="comment" placeholder="Escribe tu opinión..." rows="4" class="form-control"></textarea>
    </div>
    
    <!-- Mensajes de error y éxito -->
    <div v-if="errorMessage" class="form-message error">{{ errorMessage }}</div>
    <div v-if="successMessage" class="form-message success">{{ successMessage }}</div>

    <!-- El botón ahora muestra un estado de carga y se deshabilita -->
    <button type="submit" class="button" :disabled="reviewStore.isSubmitting">
      {{ reviewStore.isSubmitting ? 'Enviando...' : 'Enviar Reseña' }}
    </button>
  </form>
</template>

<style scoped>
.review-form {
  background-color: #f9f9f9;
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid #eee;
}
.form-group {
  margin-bottom: 1rem;
}
.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}
.form-control {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
}
.button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
.form-message {
  padding: 1rem;
  border-radius: 5px;
  margin-bottom: 1rem;
  text-align: center;
}
.error {
  background-color: #fff5f5;
  color: #e53e3e;
  border: 1px solid #e53e3e;
}
.success {
  background-color: #f0fff4;
  color: #2f855a;
  border: 1px solid #2f855a;
}
</style>