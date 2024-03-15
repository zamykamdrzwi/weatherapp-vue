<template>
  <div class="chart-container">
    <canvas id="chart" height="40"></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js/auto';
// import { getRelativePosition } from 'chart.js/helpers';

export default {
  props: ['showUnit'],
  data() {
    return {
      chart: null,
    };
  },
  computed: {
    getForecast() {
      return this.$store.state['forecast'];
    }
  },
  watch: {
    getForecast() {
      this.destroyChart();
    }
  },
  methods: {
    async weatherChart() {
      console.log(this.getForecast)
      const unit = this.showUnit;
      const forecast = [];
      // const rainOrSnow = [];
      
      for (let i = 0; i <= 5; i ++) {
        const weatherObj = {
          showDate: await this.getForecast.list[i].dt_txt.substring(0, 10),
          date: await this.getForecast.list[i].dt_txt.substring(11, 16),
          temp: await this.getForecast.list[i].main.temp.toFixed(1),
          min: await this.getForecast.list[i].main.temp_min.toFixed(1),
          max: await this.getForecast.list[i].main.temp_max.toFixed(1),
          feel: await this.getForecast.list[i].main.feels_like.toFixed(1),
          desc: await this.getForecast.list[i].weather[0].description
        }
        forecast.push(weatherObj);
      }

      var data = {
        labels: forecast.map(row => row.date),
        datasets: [
          {
            label: 'Temperature',
            data: forecast.map(row => row.temp),
            backgroundColor: 'rgb(180, 12, 199)',
            color: 'rgb(180, 12, 199)',
            borderColor: 'rgb(180, 12, 199)'
          },
        ]
      }

      var options = {
        maintainAspectRatio: false,
        scales: {
          y: {
            stacked: true,
            beginAtZero: false,
            grid: {
              display: true
            },
            ticks: {
              callback: function(value) {
                return value + unit;
              }
            }
          },
          x: {
            grid: {
              display: false
            }
          }
        },
        plugins: {
          legend: {
            display: false
          },
          title: {
            display: true,
            text: forecast[0].showDate
          },
          subtitle: {
            display: true,
            text: forecast[0].desc
          }
        }
      }

      this.chart = await new Chart('chart', {
        type: 'line',
        options: options,
        data: data
      });
    },
    destroyChart(x) {
      let chartStatus = Chart.getChart('chart');
      if(chartStatus != undefined) {
        chartStatus.destroy();
      }
      if (x) {
        return;
      }
      this.weatherChart();
    }
  },
  beforeMount() {
    this.destroyChart(true);
  }
}
</script>

<style lang="scss" scoped>
.chart-container {
  position: relative;
  margin: auto;
  height: 230px;
  width: auto;
}
</style>