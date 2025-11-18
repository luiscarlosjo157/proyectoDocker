import { defineStore } from 'pinia';
import ApiService from '@/services/ApiService';

export const useReviewStore = defineStore('reviews', {
  state: () => ({
    reviews: [],
    isLoading: false,
    error: null,
    isSubmitting: false,
  }),
  actions: {
    async fetchReviewsForProduct(productId) {
      // ... tu código de fetchReviewsForProduct está bien, aunque también le falta
      // poner isLoading a false en el catch. Lo corregimos abajo.
      this.isLoading = true;
      this.error = null;
      this.reviews = [];
      try {
        const response = await ApiService.getReviewsByProduct(productId);
        this.reviews = response.data;
      } catch (error) {
        this.error = 'No se pudieron cargar las reseñas.';
        console.error(error);
      } finally {
        this.isLoading = false; // <-- Esto está bien aquí
      }
    },
    
    // --- ACCIÓN A CORREGIR ---
    async submitReview(reviewData) {
      this.isSubmitting = true; // Se inicia el envío
      try {
        const response = await ApiService.createReview(reviewData);
        this.reviews.unshift(response.data);
        
        // 1. Poner a false en caso de éxito
        this.isSubmitting = false; 
        return { success: true };

      } catch(error) {
        console.error('Error al enviar la reseña:', error);
        
        // 2. Poner a false en caso de error
        this.isSubmitting = false; 
        return { success: false, message: 'No se pudo enviar la reseña. Revisa la consola para más detalles.' }; 
      }
    }
  }
});