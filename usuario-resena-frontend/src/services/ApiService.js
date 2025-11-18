import axios from 'axios';

// Creamos una instancia de Axios con la configuración base.
// La URL base debe apuntar a tu backend de Spring Boot.
const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api', // ¡Asegúrate de que el puerto sea correcto!
  headers: {
    'Content-Type': 'application/json'
  }
});

// Exportamos un objeto con métodos que corresponden a tus endpoints.
export default {
  // --- Métodos para UserController ---
  getAllUsers() {
    return apiClient.get('/users');
  },
  createUser(userData) {
    return apiClient.post('/users', userData);
  },

  getAllProducts(sortBy = 'default') {
    return apiClient.get('/productos', {params: {sortBy}});
  },
  createProduct(productData) {
    return apiClient.post('/productos', productData);
  },

  // --- Métodos para ReviewController ---
  getReviewsByProduct(productId) {
    return apiClient.get(`/reviews/product/${productId}`);
  },
  createReview(reviewData) {
    // El 'reviewData' debe ser un objeto que coincida con tu ReviewRequestDto
    return apiClient.post('/reviews', reviewData);
  }
};