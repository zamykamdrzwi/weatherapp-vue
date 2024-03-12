<template>
  <div>
    <canvas id="chart" height="40"></canvas>
  </div>
  <button @click="checkForecast()">XDD</button>
</template>

<script>
import Chart from 'chart.js/auto';
// import { getRelativePosition } from 'chart.js/helpers';

export default {
  props: ['showUnit'],
  data() {
    return {

    };
  },
  computed: {
    getForecast() {
      return this.$store.state['forecast'];
    }
  },
  methods: {
    async weatherChart() {
      const forecast = []
      
      for (let i = 0; i <= 5; i ++) {
        const weatherObj = {
          date: await this.getForecast.list[i].dt_txt.substring(11, 16),
          temp: await this.getForecast.list[i].main.temp
        }
        forecast.push(weatherObj)
      }
      console.log(forecast)

      await new Chart(
        document.querySelector('#chart'),
        {
          type: 'line',
          data: {
            labels: forecast.map(row => row.date),
            datasets: [
              {
                label: 'Hourly Forecast',
                data: forecast.map(row => row.temp)
              }
            ]
          }
        }
      );
    },
    async checkForecast() {
      try {
        const data = await this.$store.state['forecast'];
        console.log(data)
        console.log(this.getForecast)
      } catch (error) {
        console.log(error)
      }
    }
  },
  mounted() {
    this.checkForecast();
  }
}
</script>

<style lang="scss" scoped>
</style>