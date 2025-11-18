import { defineStore } from 'pinia';
import ApiService from '@/services/ApiService';

export const useProductStore = defineStore('products', {
  state: () => ({
    products: [], // Aquí guardaremos la lista de productos
    isLoading: false,
    error: null,
  }),
  actions: {
    async fetchProducts() {
      this.isLoading = true;
      this.error = null;
      try {
        // Llama al método del ApiService que corresponde a @GetMapping en ProductoController
        const response = await ApiService.getAllProducts('popularity');
        this.products = response.data;
      } catch (error) {
        this.error = 'No se pudieron cargar los productos.';
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    },

    async addProduct(productData) {
      try {
        // Llama al método que corresponde a @PostMapping en ProductoController
        const response = await ApiService.createProduct(productData);
        // Agrega el nuevo producto a la lista en el state para que la UI se actualice
        this.products.push(response.data);
      } catch (error) {
        console.error('Error al crear el producto:', error);
        // Aquí podrías manejar el error, por ejemplo, mostrando una notificación
      }
    }
  }
});