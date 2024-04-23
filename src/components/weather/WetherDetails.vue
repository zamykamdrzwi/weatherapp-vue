<template>
  <div id="detailsContainer"></div>
</template>

<script>
export default {
  computed: {
    details() {
      return this.$store.state['indexData'];
    },
    forecast() {
      return this.$store.state['forecast'];
    },
    currentWeather() {
      return this.$store.state['currentWeather'];
    }
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
        // console.log('dziala');
        // console.log(this.currentWeather);
        this.showDetails(this.currentWeather);
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
      console.log(parentEl);
      parentEl.innerHTML = 'dsadas'
      console.log(data);
    }
  },
}
</script>

<style lang="scss" scoped>

</style>