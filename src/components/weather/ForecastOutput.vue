<template>
  <ul v-if="forecastList && forecastList.list">
    <li v-for="item in forecastList.list" :key="item">
      {{ item.dt_txt }}
    </li>
  </ul>
  <div v-else>cokwliek</div>
</template>

<script>
export default {
  props: ['showUnit'],
  computed: {
    forecastList() {
      return this.$store.state['forecast']
    }
  },
  watch: {
    forecastList() {
      this.showForecast()
    }
  },
  methods: {
    showForecast() {
      console.log(this.forecastList);
    }
  }
}
</script>