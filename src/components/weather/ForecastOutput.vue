<template>
  <ul v-if="forecastList && forecastList.list" class="list-unstyled p-0 mt-4
  d-flex justify-content-center gap-2 flex-wrap" id="parentElement">
    <button class="btn btn-outline-secondary custom-btn"
      v-for="(item, index) in forecastWeek" 
      :key="item"
      :id="index"
      @click="currentForecast(item, index)">
      {{ item[0].dt_txt.substring(0, 10) }}
      <div class="fw-bold">
        {{ day[index] }}
      </div>
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
      day: null
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
      this.showDate(this.forecastWeek);
    },
    showDate(table) {
      const dateTable = [];
      table.forEach(item => {
        dateTable.push(item[0].dt_txt.substring(0, 10))
      });
      const dayTable = []
      dateTable.forEach(item => {
        const date = new Date(item);
        const dayOfWeekIndex = date.getDay();
        const daysOfWeek = ['Monday','Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        const dayOfWeekName = daysOfWeek[dayOfWeekIndex];
        dayTable.push(dayOfWeekName);
      });

      this.day = dayTable;
    },
    currentForecast(item, index) {
      const parentEl = document.querySelector('#parentElement');
      const childrenEl = parentEl.children;
      for(let i=0; i<=childrenEl.length-1; i++) {
        if(childrenEl[i].classList.contains('active')) {
          childrenEl[i].classList.remove('active');
        }
      }
      const activeBtn = document.getElementById(index);
      activeBtn.classList.add('active');

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
          'mt-2',
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
            <div class="card-text">
              <div>
                Humidity: ${hour.main.humidity} %
              </div>
              <div>
                Pressure: ${hour.main.pressure} hPa
              </div>
              <div>
                Visibility: ${hour.visibility/1000} km
              </div>
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
.custom-btn:hover, .active {
  color: #B9FA28 !important;
}
#listEl {
  width: 100%;
  white-space: nowrap;
  overflow-x: scroll;
}
</style>