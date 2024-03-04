export default {
  async takeCurrentWeather(context) {
    const API = '19de70c141fa4749dd0305edb2cd82a9';
    const city = 'Gdynia';
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API}`);
    const responseData = await response.json();

    if(!response.ok) {
      console.log('Nie działa');
    }

    context.commit('setCurrentWeather', responseData);
  }
};