<template>
  <div class="fw-bold fs-3">{{ weather.name }}, {{ weather.sys.country }}</div>
  <div class="fs-1">{{ weather.main.temp }}{{ showUnit }}</div>
  <div class="">
    Feels like {{ weather.main.feels_like }}{{ showUnit }}, {{ weather.weather[0].description }}
  </div>
  <div>
    <img :src="imgUrl" alt="Icon">
  </div>
  <div>Humidity: {{ weather.main.humidity }} %</div>
  <div>Pressure: {{ weather.main.pressure }} hPa</div>
  <div>Visibility: {{ visibility }} km</div>
</template>

<script>
export default {
  props: ['weather', 'forecast', 'showUnit'],
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