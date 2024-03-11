export default {
  getCords(state) {
    return {
      lat: state.currentWeather.coord.lat,
      lon: state.currentWeather.coord.lon
    };
  },
  getLocalStorage() {
    let myObj = JSON.parse(localStorage.getItem('localObj'));
    return {
      myObj
    }
  }
};