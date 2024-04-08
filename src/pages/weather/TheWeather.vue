<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-6">
        <form @submit.prevent="currentWeather">
          <label for="city" class="form-label">City:</label>
          <div class="btn-group display-flex w-100">
            <input type="text" id="city" class="form-control shadow-none custom-input"
            :class="[error ? 'error' : '']" v-model="city" />
            <button class="btn btn-primary dropdown-toggle dropdown-toggle-split custom-btn"
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
          <button class="btn btn-primary mt-3 fw-bold custom-btn">Search!</button>
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
        <label for="map" class="mb-2 fw-bold">Choose place from map!</label>
        <div id="map"></div>
      </div>
    </div>
    <div>
      <new-forecast
        v-if="formIsValid && !error"
        :showUnit="showUnit"
        :showUnit2="showUnit2">
      </new-forecast>
      <div v-else>
        <div class="text-danger">{{ error }}</div>
      </div>
    </div>
    <div>
    </div>
    <div>
      <high-charts
        :showUnit="showUnit">
      </high-charts>
    </div>
    <div>
      <forecast-output 
        v-if="formIsValid && !error"
        :showUnit="showUnit">
      </forecast-output>
      <div v-else>
        <div class="text-danger">{{ error }}</div>
      </div>
    </div>
  </div>
</template>

<script>
/* global google */
import { Loader } from '@googlemaps/js-api-loader';
import WeatherOutput from '../../components/weather/WeatherOutput.vue';
import ForecastOutput from '@/components/weather/ForecastOutput.vue';
import HighCharts from '../../components/UI/HighCharts.vue';
import NewForecast from '../../components/weather/NewForecast.vue';

export default {
  components: {
    WeatherOutput,
    ForecastOutput,
    HighCharts,
    NewForecast
  },
  data() {
    return {
      city: 'Gdynia',
      units: 'metric',
      showUnit: '°C',
      showUnit2: 'm/s',
      formIsValid: true,
      error: null,
      map: null,
      marker: null,
      finalSearchHistory: null,
      time: 'cokowliekk'
    };
  }, 
  computed: {
    weather() {
      return this.$store.state['currentWeather'];
    },
    searchHistory() {
      return this.$store.state['searchHistory'];
    },
    searchHistoryStorage() {
      return this.$store.getters.getLocalStorage;
    },
    forecast() {
      return this.$store.state['forecast'];
    },
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
        await this.$store.commit('addSearchHistory', this.city);
      } catch(error) {
        this.error = error.message || 'Something failed!';
      }
      if(params.units === 'metric') {
        this.showUnit = '°C';
        this.showUnit2 = 'm/s';
      } else {
        this.showUnit = '°F';
        this.showUnit2 = 'mph';
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
        this.showUnit = '°C';
        this.showUnit2 = 'm/s';
      } else {
        this.showUnit = '°F';
        this.showUnit2 = 'mph';
      }

      this.city = this.weather.name;
      this.$store.commit('addSearchHistory', this.city);
    },
    setSearchHistory(x) {
      let item;
      if(x) {
        item = this.$store.getters.getLocalStorage;
        x = false;
      } else {
        item = this.$store.state['searchHistory'];
      }
      return item;
    },
    async getStorage() {
      const historyStorage = this.searchHistoryStorage.array;
      await historyStorage.forEach(item => {
        this.$store.commit('addSearchHistory', item);
      });
      this.city = this.searchHistory[0];
      this.currentWeather();
    },
  },
  created() {
    this.currentWeather();
  },
  mounted() {
    this.getStorage();
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/style/style.scss';
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
.custom-btn:hover {
  background-color: $secondary;
  color: $primary;
  border: 1px solid $secondary;
}
</style>