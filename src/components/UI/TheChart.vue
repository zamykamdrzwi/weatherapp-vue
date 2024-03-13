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
      const unit = this.showUnit;
      const forecast = []
      
      for (let i = 0; i <= 5; i ++) {
        const weatherObj = {
          date: await this.getForecast.list[i].dt_txt.substring(11, 16),
          temp: await this.getForecast.list[i].main.temp.toFixed(1)
        }
        forecast.push(weatherObj)
      }

      var data = {
        labels: forecast.map(row => row.date),
        datasets: [
          {
            label: 'Hourly Forecast',
            data: forecast.map(row => row.temp)
          }
        ]
      }

      var options = {
        maintainAspectRatio: false,
        scales: {
          y: {
            stacked: true,
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
  height: 200px;
  width: auto;
}
</style>