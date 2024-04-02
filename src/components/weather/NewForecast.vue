<template>
  <div v-if="forecast && currentWeather"
    class="custom-scroll mt-4 mb-3">
    <div class="d-flex justify-content-start gap-3" 
      id="parentEl">
    </div>
  </div>
</template>

<script>
export default {
  props: ['showUnit'],
  computed: {
    forecast() {
      return this.$store.state['forecast'];
    },
    currentWeather() {
      return this.$store.state['currentWeather'];
    }
  },
  watch: {
    forecast() {
      this.prepareData();
    }
  },
  methods: {
    initDay(item) {
      const date = new Date(item);
      const dayOfWeekIndex = date.getDay();
      const daysOfWeek = ['Sunday', 'Monday','Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const dayOfWeekName = daysOfWeek[dayOfWeekIndex];

      return dayOfWeekName;
    },
    prepareData() {
      console.log(this.currentWeather);
      const weatherObj = {
        date: [],
        hour: [],
        temp: []
      };
      this.forecast.list.forEach(item => {
        weatherObj.date.push(this.initDay(item.dt_txt.substring(0, 10)));
        weatherObj.hour.push(item.dt_txt.substring(11, 16));
        weatherObj.temp.push(item.main.temp);
      });

      this.showForecast(weatherObj);
    },
    showForecast(obj) {
      console.log(obj);
      const parentEl = document.querySelector('#parentEl');
      console.log(`parentEl ${parentEl}`)
      // const childrenEl = document.createElement('div');
      // childrenEl.textContent = "dasda";
      // console.log(childrenEl);
      // console.log(parentEl)
      // parentEl.appendChild(childrenEl);
    },
  },
}
</script>

<style lang="scss" scoped>
.custom-scroll {
  width: 100%;
  white-space: nowrap;
  overflow-x: auto;
}
.card {
  min-width: 200px;
}
</style>