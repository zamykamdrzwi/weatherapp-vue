export default {
  setCurrentWeather(state, payload) {
    state.currentWeather = payload;
  },
  addSearchHistory(state, payload) {
    state.searchHistory.push(payload);
  }
};