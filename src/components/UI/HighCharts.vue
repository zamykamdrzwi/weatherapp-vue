<template>
  <div id="container"></div>
</template>

<script>
import Highcharts from 'highcharts';

export default {
  methods: {
    initChart() {
      Highcharts.chart('container', {
        chart: {
           zoomType: 'xy'
        },
        title: {
          text: 'Forecast chart'
        },
        xAxis: [{
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        }]
      })
    },
  },
  mounted() {
    this.initChart();
  }
}
</script>

<style lang="scss" scoped>
#container {
  width: 100%;
  height: 400px;
}
</style>