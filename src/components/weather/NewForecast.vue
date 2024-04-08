<template>
  <div class="d-flex justify-content-center mt-3 gap-3">
    <div>
      <i class="bi bi-arrow-down"></i>
    </div>
    <button class="btn btn-outline-dark border-0 rounded-0 custom-btn"
      @click="activeBtn(0)" id="0">
      Overview
    </button>
    <button class="btn btn-outline-dark border-0 rounded-0 custom-btn"
      @click="activeBtn(1)" id="1">
      Precipitaion
    </button>
    <button class="btn btn-outline-dark border-0 rounded-0 custom-btn"
      @click="activeBtn(2)" id="2">
      Wind
    </button>
  </div>
  <div class="custom-scroll mt-4 mb-3">
    <div class="d-flex justify-content-start gap-3" 
      id="parentEl">
    </div>
  </div>
</template>

<script>
export default {
  props: ['showUnit', 'showUnit2'],
  data() {
    return {
      
    };
  },
  computed: {
    forecast() {
      return this.$store.state['forecast'];
    },
    currentWeather() {
      return this.$store.state['currentWeather'];
    }
  },
  watch: {
    forecast() {
      this.activeBtn(0);
    },
  },
  methods: {
    initDay(item) {
      const date = new Date(item);
      const dayOfWeekIndex = date.getDay();
      const daysOfWeek = ['Sunday', 'Monday','Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const dayOfWeekName = daysOfWeek[dayOfWeekIndex];

      return dayOfWeekName;
    },
    windDeg(item) {
      const degrees = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
      const index = Math.round((item % 360) / 45);
      
      return degrees[index];
    },
    activeBtn(value) {
      for(let i=0; i<=2; i++) {
        const tempCheckEl = document.getElementById(i);
        if(tempCheckEl.classList.contains('active')) {
          tempCheckEl.classList.remove('active');
        }
      }
      const active = document.getElementById(value);
      active.classList.add('active');

      this.prepareData(value);
    },
    prepareData(value) {
      const checkExist = document.querySelector('.card');
      if(checkExist) {
        const takeToRemove = document.querySelector('#parentEl');
        while (takeToRemove.firstChild) {
          takeToRemove.removeChild(takeToRemove.firstChild);
        }
      } 

      // console.log(this.currentWeather);
      const weatherTab = [];
      this.forecast.list.forEach(item => {
        const weatherObj = {
          date: this.initDay(item.dt_txt.substring(0, 10)),
          hour: item.dt_txt.substring(11, 16),
          temp: item.main.temp,
          img: `https://openweathermap.org/img/wn/${item.weather[0].icon}.png`,
          windDegree: this.windDeg(item.wind.deg),
          windGust: item.wind.gust,
          windSpeed: item.wind.speed 
        }
        weatherTab.push(weatherObj);
      });
      console.log(this.showUnit2)
      this.showForecast(weatherTab, value);
    },
    showForecast(obj, value) {
      console.log(obj);
      console.log(value)
      const parentEl = document.querySelector('#parentEl');
      var showData;
      obj.forEach(item => {
        const overview = `
          <div class="card-body">
            <div class="d-flex justify-content-center w-100">
              <img src="${item.img}">
            </div>
            <div class="card-text d-flex justify-content-center">
              <div>
                ${item.temp.toFixed(0)} ${this.showUnit}
              </div>
            </div>
          </div>
        `;
        const wind = `
          <div class="card-body">
            <div class="card-text">
              <div class="d-flex justify-content-center">
                <div class="fs-3 fw-bold">
                  ${item.windDegree}
                </div>
              </div>
              <div class="d-flex justify-content-center mt-3">
                <div>
                  ${item.windSpeed} ${this.showUnit2}
                </div>
              </div> 
            </div>
          </div>
        `;

        if(value === 0) {
          showData = overview;
        } else if(value === 1) {
          showData = overview;
        } else if(value === 2) {
          showData = wind;
        } else {
          return;
        }

        const childrenEl = document.createElement('div');
        childrenEl.innerHTML = `
          <div class="card border-0 rounded-0 mb-3" style="width: 100px">
            <div class="card-header d-flex justify-content-center border-0 rounded-0">
              <div>
                ${item.hour}
              </div>
            </div>
            ${showData}
            <div class="card-footer d-flex justify-content-center border-0 rounded-0">
              <div>${item.date}</div>
            </div>
          </div>
        `;
        parentEl.appendChild(childrenEl)
      });
    },
  },
  mounted() {
    
  }
}
</script>

<style lang="scss" scoped>
.custom-scroll {
  width: 100%;
  white-space: nowrap;
  overflow-x: auto;
}
</style>