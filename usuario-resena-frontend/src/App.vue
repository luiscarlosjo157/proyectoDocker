<script setup>
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <header>
    <nav>
      <!-- Estos enlaces ahora usarán el router para navegar sin recargar la página -->
      <RouterLink to="/productos">Productos</RouterLink>
    </nav>
  </header>

  <main>
    <!-- 
      ¡ESTA ES LA ETIQUETA MÁS IMPORTANTE!
      <RouterView /> actúa como un marcador de posición.
      Vue Router reemplazará esta etiqueta con el componente
      que corresponda a la URL actual del navegador.
    -->
    <RouterView />
  </main>
</template>

<style scoped>
/* Agrega algunos estilos básicos para que se vea bien */
header {
  background-color: #f2f2f2;
  padding: 1rem;
  border-bottom: 1px solid #ddd;
}
nav {
  display: flex;
  gap: 1rem;
  font-size: 1.2rem;
}
nav a {
  text-decoration: none;
  color: #333;
}
nav a.router-link-exact-active {
  color: #42b983; /* Color verde de Vue para el enlace activo */
  font-weight: bold;
}
main {
  padding: 1rem;
}
</style>
