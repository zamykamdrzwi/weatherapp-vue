import "bootstrap/dist/css/bootstrap.css";
import { createApp } from 'vue';

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import fontawesome from './fontawesome.js'
import router from './router.js';
import store from './store/index.js';
import App from './App.vue';

import DayDate from './components/UI/DayDate.vue';

const app = createApp(App);

app.use(router);
app.use(fontawesome);
app.use(store);

app.component('font-awesome-icon', FontAwesomeIcon);
app.component('day-date', DayDate);

app.mount('#app');

import "bootstrap/dist/js/bootstrap.js";