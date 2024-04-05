<template>
  <div class="custom-scroll mt-4 mb-3">
    <div class="d-flex justify-content-start gap-3" 
      id="parentEl">
    </div>
  </div>
</template>

<script>
export default {
  props: ['showUnit'],
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
      this.prepareData();
    }
  },
  methods: {
    initDay(item) {
      const date = new Date(item);
      const dayOfWeekIndex = date.getDay();
      const daysOfWeek = ['Sunday', 'Monday','Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const dayOfWeekName = daysOfWeek[dayOfWeekIndex];

      return dayOfWeekName;
    },
    prepareData() {
      // console.log(this.currentWeather);
      const weatherTab = [];
      this.forecast.list.forEach(item => {
        const weatherObj = {
          date: this.initDay(item.dt_txt.substring(0, 10)),
          hour: item.dt_txt.substring(11, 16),
          temp: item.main.temp,
          img: `https://openweathermap.org/img/wn/${item.weather[0].icon}.png`
        }
        weatherTab.push(weatherObj);
      });

      this.showForecast(weatherTab);
    },
    showForecast(obj) {
      console.log(obj);
      const parentEl = document.querySelector('#parentEl');
      obj.forEach(item => {
        const childrenEl = document.createElement('div');
        childrenEl.classList.add(
          
        )
        childrenEl.innerHTML = `
          <div class="card" style="width: 100px">
            <div class="card-header d-flex justify-content-center">
              <div>
                ${item.hour}
              </div>
            </div>
            <div class="card-body">
              <div class="d-flex w-100">
                <img src="${item.img}">
              </div>
              <div class="card-text d-flex justify-content-center">
                <div>
                  ${item.temp.toFixed(0)} ${this.showUnit}
                </div>
              </div>
            </div>
            <div class="card-footer d-flex justify-content-center">
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