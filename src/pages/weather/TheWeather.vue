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
      weatherImg: '',
      newMarker: null,
    };
  }, 
  computed: {
    weather() {
      return this.$store.state['currentWeather'];
    },
    searchHistory() {
      return this.$store.state['searchHistory'];
    }
  },
  methods: {
    async currentWeather() {
      this.error = null;
      this.formIsValid = true;
      this.$store.commit('addSearchHistory', this.city);
      console.log(this.searchHistory)
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
        lon: this.weather.coord.lon,
        temp: this.weather.main.temp,
        city: this.weather.name
      }
      this.initMap(cords, );
    },
    async initMap(coords) {
      const position = { 
        lat: coords.lat, 
        lng: coords.lon 
      };

      const options = {
        zoom: 8,
        center: position
      }

      const loader = new Loader({
        apiKey: 'AIzaSyDtc5nYAqGQBk1qGNoTbSOcGfKUR0U0tqg',
        version: 'weekly',
      });

      loader.load().then(async () => {
        const { Map } = await google.maps.importLibrary("maps");
        this.map = new Map(document.getElementById("map"), {options});

        google.maps.event.addListener(this.map, 'click', (event) => {
          this.newMarker = new google.maps.Marker({
            position: event.latLng,
            map: this.map,
          });
          var infoWindow = new google.maps.InfoWindow({
            content: 'cokokwliekk'
          });
          console.log(infoWindow)
          this.newMarker.addListener('click', (event) => {
            infoWindow.open(this.map, this.newMarker)
            console.log(event);
          });
        });
        let marker = new google.maps.Marker({
          position: position,
          map: this.map,
          content: `City: ${coords.city}, Temp: ${coords.temp}`
        });
        console.log(marker);
      });
    },
  },
  created() {
    this.currentWeather()
  },
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
#map {
  height: 400px;
  width: 100%;
}
</style>