import { createStore } from 'vuex';

import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

const store = createStore({
  state() {
    return {
      currentWeather: null,
      searchHistory: [],
      adress: null,
      forecast: null,
      localObj: {},
      indexData: null
    };
  },
  mutations,
  actions,
  getters
});

export default store;