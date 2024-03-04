<template>
  <div class="container">
    <div class="row">
      <form @submit.prevent="currentWeather" class="col-6">
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      city: 'Gdynia',
      units: 'metric',
      showUnit: '°C',
      formIsValid: true,
      error: null
    };
  }, 
  computed: {
    weather() {
      return this.$store.state['currentWeather']
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
      const weather = this.$store.state['currentWeather'];
      if(params.units === 'metric') {
        this.showUnit = '°C'
      } else {
        this.showUnit = '°F'
      }
      console.log(weather);
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
</style>