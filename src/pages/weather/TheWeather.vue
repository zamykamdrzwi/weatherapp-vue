<template>
  <div class="container">
    <div class="row">
      <form @submit.prevent="currentWeather" class="col-6">
        <label for="city" class="form-label">City:</label>
        <input type="text" id="city" class="form-control shadow-none" v-model="city">
        <div class="mt-3">
          <select class="form-select" v-model="units">
            <option value="metric">Celsius °C</option>
            <option value="imperial">Fahrenheit °F</option>
          </select>
        </div>
        <button class="btn btn-primary mt-3">Pogoda!!</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      city: 'Gdynia',
      units: 'metric'
    };
  }, 
  computed: {
    
  },
  methods: {
    async currentWeather() {
      const params = {
        city: this.city,
        units: this.units
      }
      try {
        await this.$store.dispatch('takeCurrentWeather', params);
      } catch(error) {
        console.log('Nie działa - comp');
      }
      const weather = this.$store.state['currentWeather'];
      console.log(weather);
    }
  },
}
</script>