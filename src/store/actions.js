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
  // async initMap(contex, payload) {
  //   const position = { 
  //     lat: 54.5189,
  //     lng: 18.5319
  //   };
  //   const options = {
  //     zoom: 8,
  //     center: position
  //   };
  // }
};