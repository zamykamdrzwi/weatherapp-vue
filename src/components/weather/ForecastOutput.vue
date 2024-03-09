<template>
  <ul v-if="forecastList && forecastList.list">
    <li v-for="item in forecastWeek" :key="item">
      <ul>
        <li v-for="x in item" :key="x">
          {{ x.dt_txt }}
        </li>
      </ul>
    </li>
  </ul>
</template>

<script>
export default {
  props: ['showUnit'],
  data() {
    return {
      forecastWeek: []
    };
  },
  computed: {
    forecastList() {
      return this.$store.state['forecast']
    }
  },
  watch: {
    forecastList() {
      this.showForecast()
    }
  },
  methods: {
    showForecast() {
      console.log(this.forecastList);
      let currentDate = this.forecastList.list[0].dt_txt.substring(0, 10);
      let day = 0;

      this.forecastList.list.forEach(item => {
        if(item.dt_txt.substring(0, 10) === currentDate) {
          this.forecastWeek[day] = [];
          
          this.forecastList.list.forEach(x => {
            if(x.dt_txt.substring(0, 10) === currentDate) {
              this.forecastWeek[day].push(x)
            }
          });
        } else {
          currentDate = item.dt_txt.substring(0, 10);
          day ++;
        }
      });

      console.log(this.forecastWeek)
    }
  }
}
</script>