<template>
  <div id="detailsContainer" class="mt-3"></div>
</template>

<script>
export default {
  props: ['showUnit', 'showUnit2'],
  computed: {
    details() {
      return this.$store.state['indexData'];
    },
    forecast() {
      return this.$store.state['forecast'];
    },
    currentWeather() {
      return this.$store.state['currentWeather'];
    },
  },
  watch: {
    details() {
      this.initDetails(this.details);
    },
    currentWeather() {
      this.initDetails('current');
    },
    showUnit() {
      this.initDetails('current');
    }
  },
  methods: {
    windDeg(item) {
      const degrees = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
      const arrows = ['bi bi-arrow-up', 'bi bi-arrow-up-right', 'bi bi-arrow-right', 'bi bi-arrow-down-right', 'bi bi-arrow-down', 'bi bi-arrow-down-left', 'bi bi-arrow-left', 'bi bi-arrow-up-left'];
      let index = Math.round((item % 360) / 45);
      if(index === 8){
        index = index - 1;
      }
      const windObj = {
        deg: degrees[index],
        arrow: arrows[index]
      }

      return windObj
    },
    initDetails(data) {
      if(data === 'current') {
        let rain = 0;
        let snow = 0;
        if(this.currentWeather.rain) {
          rain = parseFloat(this.currentWeather.rain['3h']);
        }
        if(this.currentWeather.snow) {
          snow = parseFloat(this.currentWeather.snow['3h']);
        }
        const currentObj = {
          data: {
            date: `Weather now`,
            hour: '',
            img: `https://openweathermap.org/img/wn/${this.currentWeather.weather[0].icon}.png`,
            temp: this.currentWeather.main.temp,
            feel: this.currentWeather.main.feels_like,
            desc: this.currentWeather.weather[0].description,
            humidity: this.currentWeather.main.humidity,
            pressure: this.currentWeather.main.pressure,
            visibility: this.currentWeather.visibility/1000,
            precipitation: {
              rain: {
                three: rain,
              },
              snow: {
                three: snow,
              }
            },
            windSpeed: this.currentWeather.wind.speed,
            windDegree: this.windDeg(this.currentWeather.wind.deg)
          },
          city: `${this.currentWeather.name}, ${this.currentWeather.sys.country}`,
        }
        this.showDetails(currentObj);
        return;
      }
      const detailsObj = {
        data: data.data,
        index: data.index,
        city: `${this.forecast.city.name}, ${this.forecast.city.country}`
      }
      this.showDetails(detailsObj);
    },
    showDetails(data) {
      const parentEl = document.querySelector('#detailsContainer');
      parentEl.innerHTML = `
        <div>${data.data.date} ${data.data.hour}</div>
        <div class="fw-bold fs-3">${data.city}</div>
        <div class="fs-1 mb-2 d-flex align-items-center">
          <img src="${data.data.img}" alt="Icon">
          <span>&nbsp;</span>
          ${data.data.temp.toFixed(0)}${this.showUnit}
        </div>
        <div class="mb-2 fw-bold">
          Feels like ${data.data.feel.toFixed(0)}${this.showUnit}, ${data.data.desc}
        </div>
        <div>
          <span>Wind: </span>
          <i class="${data.data.windDegree.arrow}"></i>
          <span class="fw-bold">${data.data.windDegree.deg}</span>
          <span>${data.data.windSpeed} ${this.showUnit2}</span>
        </div>
        <div>Humidity: ${data.data.humidity} %</div>
        <div>Pressure: ${data.data.pressure} hPa</div>
        <div>Visibility: ${data.data.visibility.toFixed(0)} km</div>
        <div id="prec"></div>
      `;
      const tempRain = data.data.precipitation.rain.three;
      const tempSnow = data.data.precipitation.snow.three
      if(tempRain !== 0 || tempSnow !== 0) {
        const tempParent = document.querySelector('#prec');
        if(tempRain !==0 && tempSnow !==0) {
          tempParent.innerHTML = `
            <div>Rain: ${data.data.precipitation.rain.three} mm/3h</div>
            <div>Snow: ${data.data.precipitation.snow.three} mm/3h</div>
          `;
          return;
        }
        else if(tempRain !==0) {
          tempParent.innerHTML = `
            <div>Rain: ${data.data.precipitation.rain.three} mm/3h</div>
          `;
        }
        else if(tempSnow !== 0) {
          tempParent.innerHTML = `
            <div>Snow: ${data.data.precipitation.snow.three} mm/3h</div>
          `;
        }
      }
    }
  },
}
</script>

<style lang="scss" scoped>

</style>