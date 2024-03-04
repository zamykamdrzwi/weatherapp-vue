<template>
  <div class="container">
    {{ takeCurrentWeather }}
    <button class="btn btn-primary" @click="currentWeather">Pogoda</button>
  </div>
</template>

<script>
export default {
  computed: {
    takeCurrentWeather() {
      return this.$store.state['currentWeather'];
    }
  },
  methods: {
    async currentWeather() {
      try {
        await this.$store.dispatch('takeCurrentWeather');
      } catch(error) {
        console.log('Nie działa - comp');
      }
    }
  }
}
</script>