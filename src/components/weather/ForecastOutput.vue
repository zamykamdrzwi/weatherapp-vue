<template>
  <ul v-if="forecastList && forecastList.list" class="list-unstyled p-0 mt-4">
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
  <div id="listEl" class="d-flex justify-content-center"></div>
</template>

<script>
export default {
  props: ['showUnit'],
  data() {
    return {
      forecastWeek: [],
      src1: 'https://openweathermap.org/img/wn/',
      src2: '.png',
      listContainer: null,
    };
  },
  computed: {
    forecastList() {
      return this.$store.state['forecast']
    }
  },
  watch: {
    forecastList() {
      this.showForecast();
      this.hideForecast();
    }
  },
  methods: {
    showForecast() {
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
      const test = document.querySelector('.check-exist')

      if(test === null) {
        this.listContainer = null
      }
      
      if(this.listContainer !== null) {
        listEl.removeChild(this.listContainer);
      }

      this.listContainer = document.createElement('ul');
      this.listContainer.classList.add(
        'list-unstyled', 
        'd-flex',
        'flex-wrap',
        'w-100',
      );
      listEl.appendChild(this.listContainer);

      item.forEach(hour => {
        const newHour = document.createElement('li');
        newHour.classList.add(
          'card',
          'custom-li',
          'm-auto',
          'mt-2'
        );

        newHour.classList.add('check-exist')
        const currentHour = hour.dt_txt.substring(11, 16);

        newHour.innerHTML = `
          <div class="card-header">${currentHour}</div>
          <div class="card-body">
            <div class="fs-3 card-title">
              <img src="https://openweathermap.org/img/wn/${hour.weather[0].icon}.png" alt="Icon" />
              ${hour.main.temp.toFixed(0)} ${this.showUnit}
            </div>
            <div>
              
            </div>
          </div>
        `;
        this.listContainer.appendChild(newHour);
      });
    },
    hideForecast() {
      const listEl = document.querySelector('#listEl');
      if(this.listContainer !== null) {
        try {
          listEl.removeChild(this.listContainer);
        } catch {
          return;
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.custom-padding {
  padding-left: 0 !important;
}
.custom-li {
  display: inline-block;
  background-color: yellow;
}
</style>