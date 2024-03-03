import "bootstrap/dist/css/bootstrap.css";
import { createApp } from 'vue';

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import App from './App.vue';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faHatCowboy } from '@fortawesome/free-solid-svg-icons';

library.add(faHatCowboy);

const app = createApp(App);

app.component('font-awesome-icon', FontAwesomeIcon);

app.mount('#app');

import "bootstrap/dist/js/bootstrap.js";