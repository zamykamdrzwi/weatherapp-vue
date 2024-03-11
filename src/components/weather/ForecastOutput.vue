<template>
  <ul v-if="forecastList && forecastList.list" class="list-unstyled p-0">
    <!-- <li v-for="item in forecastWeek" :key="item" class="list-unstyled">
      <ul class="row list-unstyled p-0">  
        <div>Day {{ item[0].dt_txt.substring(0, 10) }}</div>
        <li v-for="hour in item" :key="hour" class="col list-unstyled">
          <div class="fw-bold">{{ hour.dt_txt.substring(11, 16) }}</div>
          <div class="fs-4">
            <img :src="src1+hour.weather[0].icon+src2" alt="Icon">
            {{ hour.main.temp }} {{ showUnit }}
          </div>
        </li>
      </ul>
    </li> -->
    <button class="btn btn-primary" 
    v-for="item in forecastWeek" 
    :key="item"
    @click="currentForecast(item)">
      {{ item[0].dt_txt.substring(0, 10) }}
    </button>
  </ul>
  <div id="listEl"></div>
</template>

<script>
export default {
  props: ['showUnit'],
  data() {
    return {
      forecastWeek: [],
      src1: 'https://openweathermap.org/img/wn/',
      src2: '.png',
      previousLength: null,
      listContainer: null
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
      console.log(this.forecastList)
      let currentDate = this.forecastList.list[0].dt_txt.substring(0, 10);
      let day = 0;

      this.forecastList.list.forEach(item => {
        if(item.dt_txt.substring(0, 10) === currentDate) {
          this.forecastWeek[day] = [];
          
          this.forecastList.list.forEach(hour => {
            if(hour.dt_txt.substring(0, 10) === currentDate) {
              this.forecastWeek[day].push(hour)  
            }
          });
        } else {
          currentDate = item.dt_txt.substring(0, 10);
          day ++;
        }
      });
    },
    currentForecast(item) {
      const listEl = document.querySelector('#listEl');
      if(this.listContainer) {
        listEl.removeChild(this.listContainer);
      }

      this.listContainer = document.createElement('ul');
      listEl.appendChild(this.listContainer)

      item.forEach(hour => {
        let newHour = document.createElement('li');
        newHour.innerHTML = `Test - ${hour.dt_txt}`;
        this.listContainer.appendChild(newHour);
      });

      this.previousLength = item.length;
    }
  }
}
</script>

<style lang="scss" scoped>
.custom-padding {
  padding-left: 0 !important;
}
</style>