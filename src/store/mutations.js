export default {
  setCurrentWeather(state, payload) {
    state.currentWeather = payload;
  },
  addSearchHistory(state, payload) {
    const checkValue = state.searchHistory.includes(payload);
    if(!checkValue) {
      if(state.searchHistory.length < 6) {
        state.searchHistory.push(payload);
      } else {
        state.searchHistory.shift();
        state.searchHistory.push(payload);
      }
    } else {
      const indexToMove = state.searchHistory.indexOf(payload);
      if(indexToMove > 0) {
        const elToMove = state.searchHistory.splice(indexToMove, 1)[0];
        state.searchHistory.unshift(elToMove);
      }
    }
  },
  setAdress(state, payload) {
    state.adress = payload;
  }
};