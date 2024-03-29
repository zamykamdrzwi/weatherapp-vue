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
      console.log(this.getForecast)
      const unit = this.showUnit;

      const date = [];
      await this.getForecast.list.forEach(item => {
        const tempDate = 
          item.dt_txt.substring(11, 16) + 
          this.createDay(item.dt_txt.substring(0, 10));
        date.push(tempDate);
      });

      const temp = [];
      await this.getForecast.list.forEach(item => {
        const temporaryTemp = parseFloat(item.main.temp.toFixed(0));
        temp.push(temporaryTemp);
      });
      console.log(temp)

      const rain = [];
      const snow = [];
      await this.getForecast.list.forEach(item => {
        if(item.rain && item.snow) {
          rain.push(parseFloat(item.rain['1h']) || parseFloat(item.rain['3h']));
          snow.push(parseFloat(item.snow['1h']) || parseFloat(item.snow['3h']));
        } if(item.rain || item.snow) {
          if(item.rain) {
            rain.push(parseFloat(item.rain['1h']) || parseFloat(item.rain['3h']));
          } else {
            snow.push(parseFloat(item.snow['1h']) || parseFloat(item.snow['3h']));
          }
        } else {
          rain.push(0);
          snow.push(0);
        }
      });
      console.log(rain)
      console.log(snow)

      await Highcharts.chart('container', {
        chart: {
          zoomType: 'xy',
          scrollablePlotArea: {
            minWidth: 3500,
            scrollPositionX: 1,
          }
        },
        title: {
          text: 'Forecast chart'
        },
        xAxis: [{
          categories: date,
          crosshair: true,
          labels: {
            formatter: function() {
              return `
                ${this.value.substring(0, 5)}
                </br>
                ${this.value.substring(5, 30)}
              `;
            }
          },
          scrollbar: {
            enabled: true
          },
        }],
        yAxis: [{
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
        }, 
        {
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
          y: 0,
          floating: true,
          backgroundColor:
            Highcharts.defaultOptions.legend.backgroundColor ||
            'rgba(255,255,255,0.25)'
        },
        series: [
        {
          name: 'Temperature',
          type: 'spline',
          data: temp,
          tooltip: {
            valueSuffix: '°C'
          },
        },
        {
          name: 'Rain',
          type: 'column',
          yAxis: 1,
          data: rain,
          tooltip: {
            valueSuffix: ' mm'
          }
        }, 
        {
          name: 'Snow',
          type: 'column',
          yAxis: 1,
          data: snow,
          tooltip: {
            valueSuffix: ' mm'
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
.highcharts-credits {
  fill: yellow
}
</style>