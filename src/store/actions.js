export default {
  async takeCurrentWeather(context, payload) {
    //console.log(`Zmienna: ${payload.units}`)
    const API = '19de70c141fa4749dd0305edb2cd82a9';
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${payload.city}&units=${payload.units}&appid=${API}`);
    const responseData = await response.json();

    if(!response.ok) {
      const error = new Error(responseData.message || 'Failed to fetch!');
      throw error;
    }

    context.commit('setCurrentWeather', responseData);
  },
  async takeWeatherCoords(context, payload) {
    //console.log(`Zmienna: ${payload.units}`)
    const API = '19de70c141fa4749dd0305edb2cd82a9';
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${payload.lat}&lon=${payload.lon}&units=${payload.units}&appid=${API}`);
    const responseData = await response.json();

    if(!response.ok) {
      const error = new Error(responseData.message || 'Failed to fetch!');
      throw error;
    }

    context.commit('setCurrentWeather', responseData);
  },
  async takeFutureWeather(context, payload) {
    const API = '19de70c141fa4749dd0305edb2cd82a9';
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${payload.lat}&lon=${payload.lon}&units=${payload.units}&appid=${API}`);
    const responseData = await response.json();

    if(!response.ok) {
      const error = new Error(responseData.message || 'Failed to fetch!');
      throw error;
    }

    context.commit('setForecast', responseData);
  },
  async takeAdress(context, payload) {
    const API = 'AIzaSyDtc5nYAqGQBk1qGNoTbSOcGfKUR0U0tqg';
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${payload.lat},${payload.lon}&key=${API}`);
    const responseData = await response.json();

    if(!response.ok) {
      const error = new Error(responseData.message || 'Failed to fetch!');
      throw error;
    }

    context.commit('setAdress', responseData);
  },
  setStoreLocal(_, payload) {
    let localObjSerialized = JSON.stringify(payload);
    localStorage.setItem('localObj', localObjSerialized);
  }
};