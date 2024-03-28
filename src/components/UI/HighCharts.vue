<template>
  <div id="container"></div>
  <button class="btn btn-dark"
  @click="initChart">aktywuj</button>
</template>

<script>
import Highcharts from 'highcharts';

export default {
  props: ['showUnit'],
  computed: {
    getForecast() {
      return this.$store.state['forecast'];
    }
  },
  watch: {
    getForecast() {
      this.initChart();
    }
  },
  methods: {
    createDay(item) {
      const date = new Date(item);
      const dayOfWeekIndex = date.getDay();
      const daysOfWeek = ['Monday','Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
      const dayOfWeekName = daysOfWeek[dayOfWeekIndex];

      return dayOfWeekName;
    },
    async initChart() {
      const unit = this.showUnit;

      const date = {
        date: [],
        day: [],
        hour: []
      };
      await this.getForecast.list.forEach(item => {
        date.date.push(item.dt_txt.substring(0, 10));
        date.day.push(this.createDay(item.dt_txt.substring(0, 10)));
        date.hour.push(item.dt_txt.substring(11, 16));
      });
      console.log(date)

      await Highcharts.chart('container', {
        chart: {
           zoomType: 'xy'
        },
        title: {
          text: 'Forecast chart'
        },
        xAxis: [{
          categories: date.day,
          crosshair: true,
          labels: {
            formatter: function() {
              return 'dada' + this.value;
            }
          }
        }],
        yAxis: [{ // Primary yAxis
            labels: {
                format: `{value}${unit}`,
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            },
            title: {
                text: 'Temperature',
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            }
        }, { // Secondary yAxis
            title: {
                text: 'Precipitation',
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            },
            labels: {
                format: '{value} mm',
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            },
            opposite: true
        }],
        tooltip: {
            shared: true
        },
        legend: {
            align: 'left',
            x: 80,
            verticalAlign: 'top',
            y: 60,
            floating: true,
            backgroundColor:
                Highcharts.defaultOptions.legend.backgroundColor || // theme
                'rgba(255,255,255,0.25)'
        },
        series: [{
            name: 'Precipitation',
            type: 'column',
            yAxis: 1,
            data: [27.6, 28.8, 21.7, 34.1, 29.0, 28.4, 45.6, 51.7, 39.0,
                60.0, 28.6, 32.1],
            tooltip: {
                valueSuffix: ' mm'
            }

        }, {
            name: 'Temperature',
            type: 'spline',
            data: [-13.6, -14.9, -5.8, -0.7, 3.1, 13.0, 14.5, 10.8, 5.8,
                -0.7, -11.0, -16.4],
            tooltip: {
                valueSuffix: '°C'
            }
        }]
      })
    },
  },
}
</script>

<style lang="scss" scoped>
#container {
  width: 100%;
  height: 400px;
}
</style>