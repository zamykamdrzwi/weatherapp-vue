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
      const rainOrSnow = [];
      
      for (let i = 0; i <= 5; i ++) {
        const weatherObj = {
          showDate: await this.getForecast.list[i].dt_txt.substring(0, 10),
          date: await this.getForecast.list[i].dt_txt.substring(11, 16),
          temp: await this.getForecast.list[i].main.temp.toFixed(1),
          desc: await this.getForecast.list[i].weather[0].description
        }
        forecast.push(weatherObj);

        let snow;
        let rain;
        if(this.getForecast.list[i].snow) {
          snow = this.getForecast.list[i].snow['1h'] || this.getForecast.list[i].snow['3h'];
        } else {
          snow = 0
        }
        if(this.getForecast.list[i].rain) {
          rain = this.getForecast.list[i].rain['1h'] || this.getForecast.list[i].rain['3h'];
        } else {
          rain = 0
        }
        
        const rainObj = {
          snow: snow,
          rain: rain
        }
        rainOrSnow.push(rainObj);
      }
      console.log(rainOrSnow)

      // const dataSc = [
      //   {x: 5,  y:2},
      //   {x: 2,  y:5},
      //   {x: 3,  y:2},
      //   {x: 1,  y:1},
      //   {x: 4,  y:3},
      // ]

      // const dataSc2 = [
      //   {x: 1,  y:6},
      //   {x: 1,  y:1},
      //   {x: 5,  y:5},
      //   {x: 5,  y:5},
      //   {x: 1,  y:2},
      // ]

      var data = {
        labels: forecast.map(row => row.date),
        datasets: [
          {
            label: 'Temperature',
            data: forecast.map(row => row.temp),
            order: 1,
            backgroundColor: 'rgb(180, 12, 199)',
            color: 'rgb(180, 12, 199)',
            borderColor: 'rgb(180, 12, 199)'
          },
          {
            type: 'bar',
            label: 'Rain',
            data: rainOrSnow.map(row => row.rain),
            backgroundColor: 'rgb(0,191,255)',
            order: 2
          },
          {
            type: 'bar',
            label: 'Snow',
            data: rainOrSnow.map(row => row.snow),
            backgroundColor: 'rgb(220,220,220)',
            order: 2
          },
        ]
      }
  

      // var data = {
      //   labels: forecast.map(row => row.date),
      //   datasets: [
      //     {
      //       label: 'Hourly Forecast',
      //       data: forecast.map(row => row.temp)
      //     }
      //   ]
      // }

      var options = {
        maintainAspectRatio: false,
        scales: {
          y: {
            stacked: true,
            // beginAtZero: true,
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
        // plugins: {
        //   title: {
        //     display: true,
        //     text: forecast[0].showDate
        //   },
        //   subtitle: {
        //     display: true,
        //     text: forecast[0].desc
        //   }
        // }
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