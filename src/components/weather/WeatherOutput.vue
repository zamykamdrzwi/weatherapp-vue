<template>
  <div class="fw-bold fs-3">{{ weather.name }}, {{ weather.sys.country }}</div>
  <div class="fs-1 mb-2">
    <img :src="imgUrl" alt="Icon">
    {{ weather.main.temp }}{{ showUnit }}
  </div>
  <div class="mb-2 fw-bold">
    Feels like {{ weather.main.feels_like }}{{ showUnit }}, {{ weather.weather[0].description }}
  </div>
  <div>Humidity: {{ weather.main.humidity }} %</div>
  <div>Pressure: {{ weather.main.pressure }} hPa</div>
  <div>Visibility: {{ visibility }} km</div>
</template>

<script>
export default {
  props: ['weather', 'showUnit'],
  computed: {
    imgUrl() {
      return `https://openweathermap.org/img/wn/${this.weather.weather[0].icon}.png`;
    },
    visibility() {
      return this.weather.visibility/1000;
    }
  }
}
</script>

<style lang="scss" scoped>

</style>