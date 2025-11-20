import { createRouter, createWebHistory } from 'vue-router';
import ProductsView from '@/views/ProductsView.vue';
import ProductDetailView from '@/views/ProductDetailView.vue';

// Aquí definimos todas las rutas de nuestra aplicación
const routes = [
  {
    // Si el usuario va a la raíz del sitio ('/'), lo redirigimos
    path: '/',
    redirect: '/productos'
  },
  {
    // Cuando el usuario visite '/productos' en el navegador...
    path: '/productos',
    name: 'Products',
    // ...le mostraremos el componente ProductsView.
    component: ProductsView
  },
  {
    // Esta es una ruta dinámica. El ':id' es un parámetro que cambiará.
    // Ej: /productos/1, /productos/25, etc.
    path: '/productos/:id',
    name: 'ProductDetails',
    // ...le mostraremos el componente ProductDetailView.
    component: ProductDetailView
  }
  // Aquí podrías agregar más rutas en el futuro, como para crear usuarios, etc.
];

// Creamos la instancia del router
const router = createRouter({
  history: createWebHistory(),
  routes, // le pasamos nuestro array de rutas
});

// Exportamos el router para que nuestra app principal lo pueda usar
export default router;