import { createRouter, createWebHistory } from "vue-router";

import TheRoad from './pages/road/TheRoad.vue';
import TheWeather from './pages/weather/TheWeather.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/weather' },
    { path: '/road', component: TheRoad },
    { path: '/weather', component: TheWeather }
  ]
});

export default router;