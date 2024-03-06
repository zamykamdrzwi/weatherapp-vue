export default {
  setCurrentWeather(state, payload) {
    state.currentWeather = payload;
  },
  addSearchHistory(state, payload) {
    if(state.searchHistory.length < 6) {
      state.searchHistory.push(payload);
    } else {
      state.searchHistory.shift();
      state.searchHistory.push(payload);
    }
  }
};