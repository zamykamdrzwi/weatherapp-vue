<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-6">
        <form @submit.prevent="currentWeather">
          <label for="city" class="form-label">City:</label>
          <div class="btn-group display-flex w-100">
            <input type="text" id="city" class="form-control shadow-none custom-input"
            :class="[error ? 'error' : '']" v-model="city" />
            <button class="btn btn-primary dropdown-toggle dropdown-toggle-split"
            data-bs-toggle="dropdown" type="button">
              <span class="visually-hidden">Toggle Dropdown</span>
            </button>
            <ul class="dropdown-menu">
              <li class="dropdown-item" v-for="item in searchHistory" :key="item"
              @click="putToSearch(item)">
                {{ item }}
              </li>
            </ul>
          </div>
          <div class="mt-3">
            <select class="form-select shadow-none" v-model="units">
              <option value="metric">Celsius °C</option>
              <option value="imperial">Fahrenheit °F</option> 
            </select>
          </div>
          <button class="btn btn-primary mt-3">Pogoda!!</button>
        </form>
        <weather-output v-if="formIsValid && !error"
        :weather="weather"
        :showUnit="showUnit">
        </weather-output>
        <div v-else>
          <div class="text-danger">{{ error }}</div>
        </div>
      </div>
      <div class="col-lg-6">
        <label for="map" class="mb-2">Choose place from map!</label>
        <div id="map"></div>
      </div>
    </div>
    <div>
      <forecast-output v-if="formIsValid && !error"
        :showUnit="showUnit">
      </forecast-output>
      <div v-else>
        <div class="text-danger">{{ error }}</div>
      </div>
    </div>
    <the-chart></the-chart>
    <button class="btn btn-secondary" @click="test">test</button>
    <button class="btn btn-secondary" @click="test2">test</button>
  </div>
</template>

<script>
/* global google */
import { Loader } from '@googlemaps/js-api-loader';
import WeatherOutput from '../../components/weather/WeatherOutput.vue';
import ForecastOutput from '@/components/weather/ForecastOutput.vue';
import TheChart from '@/components/UI/TheChart.vue';

export default {
  components: {
    WeatherOutput,
    ForecastOutput,
    TheChart
  },
  data() {
    return {
      city: 'Gdynia',
      units: 'metric',
      showUnit: '°C',
      formIsValid: true,
      error: null,
      map: null,
      marker: null,
    };
  }, 
  computed: {
    weather() {
      return this.$store.state['currentWeather'];
    },
    searchHistory() {
      return this.$store.state['searchHistory'];
    },
    forecast() {
      return this.$store.state['forecast'];
    }
  },
  methods: {
    putToSearch(value) {
      this.city = value;
    },
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
        const coords = {
          lat: this.weather.coord.lat,
          lon: this.weather.coord.lon,
          units: this.units
        }
        await this.$store.dispatch('takeFutureWeather', coords);
        this.$store.commit('addSearchHistory', this.city);
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
      this.initMap(cords);
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

        google.maps.event.addListener(this.map, 'click', async (event) => {
          this.marker = new google.maps.Marker({
            position: event.latLng,
            map: this.map,
          });

          this.marker.setMap(null)

          const position = this.marker.getPosition();
          const lat = position.lat();
          const lon = position.lng();
          const coords = {
            lat: lat,
            lon: lon,
            units: this.units
          };

          await this.weatherToMap(coords);
          await this.$store.dispatch('takeFutureWeather', coords);

          var infoWindow = new google.maps.InfoWindow({
            content: this.city
          });

          this.marker.addListener('click', () => {
            infoWindow.open(this.map, this.marker)
          });
        });
      });
    },
    async weatherToMap(coords) {
      const params = {
        lat: coords.lat,
        lon: coords.lon,
        units: this.units
      }

      try {
        await this.$store.dispatch('takeWeatherCoords', params);
      } catch (error) {
        this.error = error.message || 'Something failed!';
      }

      if(params.units === 'metric') {
        this.showUnit = '°C'
      } else {
        this.showUnit = '°F'
      }

      this.city = this.weather.name;
      this.$store.commit('addSearchHistory', this.city);
    },
    test() {
      let xd = {
        test: '123',
        xdd: 'tyrtry'
      }
      this.$store.dispatch('setStoreLocal', xd);
    },
    test2() {
      const myObj = this.$store.getters.getLocalStorage;
      console.log(myObj);
    }
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
.custom-input {
  border-top-right-radius: 0 !important;
  border-bottom-right-radius: 0 !important;
}
</style>