<template>
  <div class="d-flex justify-content-center mt-3 gap-3 flex-wrap">
    <button class="btn btn-outline-dark border-0 rounded-0 custom-btn"
      @click="activeBtnX(0)" id="0">
      Overview
    </button>
    <button class="btn btn-outline-dark border-0 rounded-0 custom-btn"
      @click="activeBtnX(1)" id="1">
      Precipitaion
    </button>
    <button class="btn btn-outline-dark border-0 rounded-0 custom-btn"
      @click="activeBtnX(2)" id="2">
      Wind
    </button>
    <button class="btn btn-outline-dark border-0 rounded-0 custom-btn"
      @click="activeBtnX(3)" id="3">
      Humidity
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
      activeForecast: 0
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
      this.activeBtnX(this.activeForecast);
    },
    showUnit() {
      this.activeBtnX(this.activeForecast);
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
    activeBtnX(value) {
      for(let i=0; i<=3; i++) {
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

      const weatherTab = [];
      this.forecast.list.forEach(item => {
        let rainOne;
        let rainThree
        let snowOne;
        let snowThree;
        if (item.rain || item.snow) {
          if (item.rain && item.rain['1h']) {
            rainOne = parseFloat(item.rain['1h']);
            rainThree = 0;
          } else if (item.rain && item.rain['3h']) {
            rainThree = parseFloat(item.rain['3h']);
            rainOne = 0;
          } else {
            rainOne = 0;
            rainThree = 0;
          }
          if (item.snow && item.snow['1h']) {
            snowOne = parseFloat(item.snow['1h']);
            snowThree = 0;
          } else if (item.snow && item.snow['3h']) {
            snowThree = parseFloat(item.snow['3h']);
            snowOne = 0;
          } else {
            snowOne = 0;
            snowThree = 0;
          }
        } else {
          rainOne = 0;
          rainThree = 0;
          snowOne = 0;
          snowThree = 0;
        }
        const weatherObj = {
          date: this.initDay(item.dt_txt.substring(0, 10)),
          hour: item.dt_txt.substring(11, 16),
          temp: item.main.temp,
          img: `https://openweathermap.org/img/wn/${item.weather[0].icon}.png`,
          windDegree: this.windDeg(item.wind.deg),
          windGust: item.wind.gust,
          windSpeed: item.wind.speed,
          precipitation: {
            rain: {
              one: rainOne,
              three: rainThree
            },
            snow: {
              one: snowOne,
              three: snowThree
            }
          },
          humidity: item.main.humidity,
          pressure: item.main.pressure,
          feel: item.main.feels_like,
          desc: item.weather[0].description,
          visibility: item.visibility/1000,
        }
        weatherTab.push(weatherObj);
      });
      this.showForecast(weatherTab, value);
    },
    showForecast(obj, value) {
      const parentEl = document.querySelector('#parentEl');
      var showData;
      obj.forEach((item, index) => {
        const overview = `
          <div class="d-flex align-items-center" style="height:215px;">
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
          </div>
        `;
        const wind = `
          <div class="d-flex align-items-center" style="height:215px;">
          <div class="card-body">
            <div class="card-text">
              <div class="d-flex justify-content-center">
                <div class="fs-3 fw-bold">
                  <i class="${item.windDegree.arrow}"></i>
                  ${item.windDegree.deg}
                </div>
              </div>
              <div class="d-flex justify-content-center mt-3">
                <div>
                  ${item.windSpeed} ${this.showUnit2}
                </div>
              </div> 
            </div>
          </div>
          </div>
        `;
        const pressure = `
          <div class="card-body">
            <div class="card-text">
              <div class="d-flex justify-content-center">
                <div>Humidity:</div>
              </div>
              <div class="d-flex justify-content-center">
                <div class="fs-5 fw-bold">
                  ${item.humidity} %
                </div>
              </div>
              <div class="d-flex justify-content-center">
                <div>Pressure:</div>
              </div>
              <div class="d-flex justify-content-center">
                <div class="fw-bold">
                  ${item.pressure} hPa
                </div>
              </div>
            </div>
          </div>
        `;
        let outputData;
        if((item.precipitation.rain.three !== 0 || item.precipitation.rain.one !==0)
          && (item.precipitation.snow.three !== 0 || item.precipitation.snow.one !== 0)) {
            let tempData = ((parseFloat(item.precipitation.rain.one) || parseFloat(item.precipitation.rain.three))
              + (parseFloat(item.precipitation.snow.one) || parseFloat(item.precipitation.snow.three)));
            outputData = `
              <div class="d-flex justify-content-center">
                <div class="text-info fw-bold">
                  <i class="bi bi-snow"></i>
                  Rain and Snow:
                </div>
              </div>
              <div class="d-flex justify-content-center">
                <div>
                  <span class="text-info">
                    ${tempData}
                  </span>   
                  mm/1h
                </div>
              </div>
            `;
        } else{
          if(item.precipitation.rain.one !== 0) {
            outputData = `
              <div class="d-flex justify-content-center">
                <div class="text-info fw-bold">
                  <i class="bi bi-droplet"></i>
                  Rain:
                </div>
              </div>
              <div class="d-flex justify-content-center">
                <div>
                  <span class="text-info">
                    ${item.precipitation.rain.one}
                  </span>   
                  mm/1h
                </div>
              </div>
            `;
          } else if (item.precipitation.rain.three !== 0) {
            outputData = `
              <div class="d-flex justify-content-center">
                <div class="text-info fw-bold">
                  <i class="bi bi-droplet"></i>
                  Rain:
                </div>
              </div>
              <div class="d-flex justify-content-center">
                <div>
                  <span class="text-info">
                    ${item.precipitation.rain.three}
                  </span>   
                  mm/3h
                </div>
              </div>
            `;
          } else if (item.precipitation.snow.one !== 0) {
            outputData = `
              <div class="d-flex justify-content-center">
                <div class="text-info fw-bold">
                  <i class="bi bi-snow"></i>
                  Snow:
                </div>
              </div>
              <div class="d-flex justify-content-center">
                <div>
                  <span class="text-info">
                    ${item.precipitation.snow.one}
                  </span>   
                  mm/1h
                </div>
              </div>
            `;
          } else if (item.precipitation.snow.three !== 0) {
            outputData = `
              <div class="d-flex justify-content-center">
                <div class="text-info fw-bold">
                  <i class="bi bi-snow"></i>
                  Snow:
                </div>
              </div>
              <div class="d-flex justify-content-center">
                <div>
                  <span class="text-info">
                    ${item.precipitation.snow.three}
                  </span>
                  mm/3h
                </div>
              </div>
            `;
          } else {
            outputData = `
              <div class="d-flex justify-content-center">
                <div class="fw-bold">
                  <i class="bi bi-droplet"></i>
                  Rain:
                </div>
              </div>
              <div class="d-flex justify-content-center">
                <div>
                  ${item.precipitation.rain.three} mm/3h
                </div>
              </div>
            `;
          }
        }
        const precipitation = `
          <div class="card-body d-flex align-items-center">
            <div class="card-text">
              <div>
                ${outputData}
              </div>
            </div>
          </div>
        `;

        if(value === 0) {
          showData = overview;
        } else if(value === 1) {
          showData = precipitation;
        } else if(value === 2) {
          showData = wind;
        } else if(value === 3) {
          showData = pressure;
        } else {
          return;
        }

        const childrenEl = document.createElement('div');
        childrenEl.innerHTML = `
          <div class="card border-0 rounded-0 mb-3" 
            style="width: 120px; height: 215px; cursor: pointer;"
            onmouseover="this.style.backgroundColor = '#ccc';"
            onmouseout="this.style.backgroundColor = '#fff';">
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

        parentEl.appendChild(childrenEl);
        childrenEl.addEventListener('click', () => {
          this.showDetails(index, obj);
        });
      });
      this.activeForecast = value;
    },
    showDetails(index, obj) {
      const payload = {
        index: index,
        data: obj[index]
      }
      this.$store.commit('setIndex', payload);
    }
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