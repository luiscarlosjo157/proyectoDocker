import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
// 1. Importa el router que acabamos de crear
import router from './router'; // Vue detectará automáticamente el archivo index.js

import './assets/main.css';

const app = createApp(App);

app.use(createPinia());
// 2. Dile a tu aplicación que use el router
app.use(router);

app.mount('#app');