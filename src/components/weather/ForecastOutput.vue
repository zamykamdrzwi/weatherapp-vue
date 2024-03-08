<template>
  <ul v-if="forecastList && forecastList.list">
    <li>
      <div>Day 1</div>
      <ul>
        <li v-for="day in forecastWeek.day1" :key="day">
          {{ day.dt_txt }}
        </li>
      </ul>
    </li>
    <li>
      <div>Day 2</div>
      <ul>
        <li v-for="day in forecastWeek.day2" :key="day">
          {{ day.dt_txt }}
        </li>
      </ul>
    </li>
    <li>
      <div>Day 3</div>
      <ul>
        <li v-for="day in forecastWeek.day3" :key="day">
          {{ day.dt_txt }}
        </li>
      </ul>
    </li>
    <li>
      <div>Day 4</div>
      <ul>
        <li v-for="day in forecastWeek.day4" :key="day">
          {{ day.dt_txt }}
        </li>
      </ul>
    </li>
    <li>
      <div>Day 5</div>
      <ul>
        <li v-for="day in forecastWeek.day5" :key="day">
          {{ day.dt_txt }}
        </li>
      </ul>
    </li>
    <li>
      <div>Day 6</div>
      <ul>
        <li v-for="day in forecastWeek.day6" :key="day">
          {{ day.dt_txt }}
        </li>
      </ul>
    </li>
    <li>
      <div>Day 7</div>
      <ul>
        <li v-for="day in forecastWeek.day7" :key="day">
          {{ day.dt_txt }}
        </li>
      </ul>
    </li>
  </ul>
  <div v-else>cokwliek</div>
</template>

<script>
export default {
  props: ['showUnit'],
  data() {
    return {
      forecastWeek: {
        day1: [],
        day2: [],
        day3: [],
        day4: [],
        day5: [],
        day6: [],
        day7: []
      }
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
      let day = 1;
      this.forecastList.list.forEach(item => {
        if(item.dt_txt.substring(0, 10) === currentDate) {
          switch (day) {
            case 1:
              this.forecastWeek.day1.push(item);
              break;
            case 2:
              this.forecastWeek.day2.push(item);
              break;
            case 3:
              this.forecastWeek.day3.push(item);
              break;
            case 4:
              this.forecastWeek.day4.push(item);
              break;
            case 5:
              this.forecastWeek.day5.push(item);
              break;
            case 6:
              this.forecastWeek.day6.push(item);
              break;
            case 7:
              this.forecastWeek.day7.push(item);
              break;
            default:
              console.log('Error with switch!');
              break;
          }
        }
        else {
          currentDate = item.dt_txt.substring(0, 10);
          day++;
          console.log(day)
        }
      });
      console.log(this.forecastWeek)
    }
  }
}
</script>