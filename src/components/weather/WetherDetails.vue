<template>
  <div id="detailsContainer" class="mt-3"></div>
</template>

<script>
export default {
  props: ['showUnit', 'showUnit2'],
  computed: {
    details() {
      return this.$store.state['indexData'];
    },
    forecast() {
      return this.$store.state['forecast'];
    },
    currentWeather() {
      return this.$store.state['currentWeather'];
    },
  },
  watch: {
    details() {
      this.initDetails(this.details);
    },
    currentWeather() {
      this.initDetails('current');
    }
  },
  methods: {
    initDetails(data) {
      if(data === 'current') {
        const currentObj = {
          data: {
            date: `Weather now`,
            hour: '',
            img: `https://openweathermap.org/img/wn/${this.currentWeather.weather[0].icon}.png`,
            temp: this.currentWeather.main.temp,
          },
          city: `${this.currentWeather.name}, ${this.currentWeather.sys.country}`,
        }
        console.log(this.currentWeather);
        this.showDetails(currentObj);
        return;
      }
      console.log(data);
      const detailsObj = {
        data: data.data,
        index: data.index,
        city: `${this.forecast.city.name}, ${this.forecast.city.country}`
      }
      this.showDetails(detailsObj);
    },
    showDetails(data) {
      const parentEl = document.querySelector('#detailsContainer');
      parentEl.innerHTML = `
        <div>${data.data.date} ${data.data.hour}</div>
        <div class="fw-bold fs-3">${data.city}</div>
        <div class="fs-1 mb-2 d-flex align-items-center">
          <img src="${data.data.img}" alt="Icon">
          <span>&nbsp;</span>
          ${data.data.temp.toFixed(0)}${this.showUnit}
        </div>
      `;
      console.log(data);
    }
  },
}
</script>

<style lang="scss" scoped>

</style>