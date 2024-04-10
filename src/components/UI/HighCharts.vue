<template>
  <div class="d-flex justify-content-center m-2">
    <div class="fw-bold fs-5">Forecast chart</div>
  </div>
  <div id="container"></div>
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
      const daysOfWeek = ['Sunday', 'Monday','Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
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

      const humidity = [];
      await this.getForecast.list.forEach(item => {
        humidity.push(parseFloat(item.main.humidity));
      });
      console.log(humidity)

      const rain = [];
      const snow = [];
      await this.getForecast.list.forEach(item => {
        if(item.rain && item.snow) {
          rain.push(parseFloat(item.rain['1h']) || parseFloat(item.rain['3h']));
          snow.push(parseFloat(item.snow['1h']) || parseFloat(item.snow['3h']));
        } if(item.rain || item.snow) {
          if(item.rain) {
            rain.push(parseFloat(item.rain['1h']) || parseFloat(item.rain['3h']));
            snow.push(0);
          } else {
            snow.push(parseFloat(item.snow['1h']) || parseFloat(item.snow['3h']));
            rain.push(0);
          }
        } else {
          rain.push(0);
          snow.push(0);
        }
      });

      await Highcharts.chart('container', {
        chart: {
          zoomType: 'xy',
          scrollablePlotArea: {
            minWidth: 3500,
            scrollPositionX: 0,
          }
        },
        title: {
          text: ''
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
                </br>
              `;
            }
          }
        }],
        yAxis: [{
          labels: {
            format: `{value}${unit}`,
            style: {
              color: '#7482F2'
            }
          },
          title: {
            text: 'Temperature',
            style: {
              color: '#7482F2'
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
        },
        {
          title: {
            text: 'Humidity',
            style: {
              color: '#90ed7d'
            }
          },
          labels: {
            format: '{value} %',
            style: {
              color: '#90ed7d'
            }
          },
          opposite: true
        }],
        tooltip: {
          shared: true
        },
        legend: {
          backgroundColor:
            Highcharts.defaultOptions.legend.backgroundColor ||
            'rgba(255,255,255,0.25)'
        },
        plotOptions: {
          spline: {
            dataLabels: {
              enabled: true,
            },
          },
          column: {
          }
        },
        series: [
        {
          name: 'Temperature',
          type: 'spline',
          data: temp,
          tooltip: {
            valueSuffix: '°C'
          },
          color: '#7482F2'
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
        },
        {
          name: 'Humidity',
          type: 'spline',
          data: humidity,
          yAxis: 2,
          tooltip: {
            valueSuffix: '%'
          },
          color: '#90ed7d'
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