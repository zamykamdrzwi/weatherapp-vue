import "bootstrap/dist/css/bootstrap.css";
import { createApp } from 'vue';

import TheButton from "./components/UI/TheButton.vue";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import fontawesome from './fontawesome.js'
import router from './router.js';
import store from './store/index.js';
import HighchartsVue from 'highcharts-vue';
import App from './App.vue';

const app = createApp(App);

app.use(router);
app.use(fontawesome);
app.use(store);
app.use(HighchartsVue);

app.component('font-awesome-icon', FontAwesomeIcon);
app.component('the-button', TheButton);

app.mount('#app');

import "bootstrap/dist/js/bootstrap.js";