<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-6">
        <form @submit.prevent="currentWeather">
          <label for="city" class="form-label">City:</label>
          <input type="text" id="city" class="form-control shadow-none" 
          :class="[error ? 'error' : '']" v-model="city">
          <div class="mt-3">
            <select class="form-select shadow-none" v-model="units">
              <option value="metric">Celsius °C</option>
              <option value="imperial">Fahrenheit °F</option>
            </select>
          </div>
          <button class="btn btn-primary mt-3">Pogoda!!</button>
        </form>
        <div v-if="formIsValid && !error">
          <div>{{ weather.name }}</div>
          <div>{{ weather.main.temp }}{{ showUnit }}</div>
        </div>
        <div v-else>
          <div class="text-danger">{{ error }}</div>
        </div>
      </div>
      <div class="col-lg-6">
        <div id="map"></div>
        <div class="weatherImg">
          <img :src="weatherImg" alt="Nie dziala">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* global google */
import { Loader } from '@googlemaps/js-api-loader';

export default {
  data() {
    return {
      city: 'Gdynia',
      units: 'metric',
      showUnit: '°C',
      formIsValid: true,
      error: null,
      map: null,
      weatherImg: ''
    };
  }, 
  computed: {
    weather() {
      return this.$store.state['currentWeather'];
    }
  },
  methods: {
    async currentWeather() {
      this.error = null;
      this.formIsValid = true;
      if(this.city === '') {
        this.formIsValid = false;
        return;
      }
      const params = {
        city: this.city,
        units: this.units
      }
      try {
        await this.$store.dispatch('takeCurrentWeather', params);
      } catch(error) {
        this.error = error.message || 'Something failed!';
      }
      if(params.units === 'metric') {
        this.showUnit = '°C'
      } else {
        this.showUnit = '°F'
      }
      const cords = {
        lat: this.weather.coord.lat,
        lon: this.weather.coord.lon
      }
      //console.log(cords)
      this.initMap(cords);
      this.weatherMap(cords);
    },
    initMap(coords) {
      //console.log(coords);
      const lat = coords.lat;
      const lon = coords.lon;
      // console.log(`lat: ${lat}`);
      // console.log(`lon: ${lon}`);
      const loader = new Loader({
        apiKey: 'AIzaSyDtc5nYAqGQBk1qGNoTbSOcGfKUR0U0tqg',
        version: 'weekly',
        // ...additionalOptions,
      });

      const options = {
        zoom: 8,
        center: { lat: lat, lng: lon }
      }
      
      try {
        loader.load().then(async () => {
          const { Map } = await google.maps.importLibrary('maps');
          this.map = new Map(document.querySelector('#map'), options);
        });
      } catch (err) {
        console.log(`Error with Google Maps API: ${err}`);
      }
    },
    async weatherMap(cords) {
      const API = '19de70c141fa4749dd0305edb2cd82a9';
      const layer = 'pressure_new';
      const z = 8;
      const x = (cords.lat * 10)/10;
      const y = cords.lon;
      console.log(`lat: ${x}`);
      console.log(`lon: ${y}`);
      const responcse = await fetch(`https://tile.openweathermap.org/map/${layer}/${z}/${x}/${y}.png?appid=${API}`);
      const responcseImg = await responcse.blob();
      console.log(responcseImg)
      this.weatherImg = URL.createObjectURL(responcseImg);
    }
  },
  created() {
    this.currentWeather()
  }
}
</script>

<style lang="scss" scoped>
.container {
  font-family: "Rubik", sans-serif;
  font-optical-sizing: auto;
  // font-weight: <weight>;
  font-style: normal;
}
.error {
  border: 1px solid red !important;
}
#map, #weatherImg {
  height: 400px;
  width: 100%;
}
</style>