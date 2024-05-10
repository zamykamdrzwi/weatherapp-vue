<template>
  <div id="par"></div>
</template>

<script>
export default {
  props: ['showUnit'],
  computed: {
    forecast() {
      return this.$store.state['forecast'];
    }
  },
  watch: {
    forecast() {
      this.prepareData(this.forecast);
    }
  },
  methods: {
    initDay(item) {
      const date = new Date(item);
      const dayOfWeekIndex = date.getDay();
      const daysOfWeek = ['Sun', 'Mon','Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const dayOfWeekName = daysOfWeek[dayOfWeekIndex];

      return dayOfWeekName;
    },
    initMonth(item) {
      if(item.charAt(0) == 0) {
        item = item.charAt(1)
      }
      const monthsInYear = ['example', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const month = monthsInYear[item];

      return month;
    },
    prepareData(data) {
      const checkExist = document.querySelector('.card');
      if(checkExist) {
        const takeToRemove = document.querySelector('#par');
        while (takeToRemove.firstChild) {
          takeToRemove.removeChild(takeToRemove.firstChild);
        }
      }

      console.log(data);
      let date0 = data.list[0].dt_txt.substring(8, 10);
      let daysIndex = 0;
      const daysTab = [];
      daysTab[0] = this.initDay(data.list[0].dt_txt.substring(0, 10));
      const monthTab = [];
      monthTab[0] = this.initMonth(data.list[0].dt_txt.substring(5, 7));
      const dateTab = [];
      dateTab[0] = data.list[0].dt_txt.substring(8, 10);
      const imgTab = [];
      imgTab[0] = `https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}.png`;
      let tempIndex = 0;
      let minTempSum = 0;
      let maxTempSum = 0;
      const minTempTab = [];
      const maxTempTab = [];

      data.list.forEach((item, index) => {
        let tempIntMin = parseInt(item.main.temp_min);
        let tempIntMax = parseInt(item.main.temp_max);
        minTempSum += tempIntMin;
        maxTempSum += tempIntMax;
        tempIndex++;
        if(item.dt_txt.substring(8, 10) != date0){
          date0 = item.dt_txt.substring(8, 10);
          daysIndex++;
          daysTab[daysIndex] = this.initDay(item.dt_txt.substring(0, 10));
          monthTab[daysIndex] = this.initMonth(item.dt_txt.substring(5, 7));
          dateTab[daysIndex] = item.dt_txt.substring(8, 10);
          imgTab[daysIndex] = `https://openweathermap.org/img/wn/${data.list[index+3].weather[0].icon}.png`;

          let averageMin = minTempSum / tempIndex;
          let averageMax = maxTempSum / tempIndex;
          minTempTab.push(averageMin.toFixed(0));
          maxTempTab.push(averageMax.toFixed(0));
          minTempSum = 0;
          maxTempSum = 0;
          tempIndex = 0;
        }
      });

      const dataObj = {
        days: daysTab,
        month: monthTab,
        date: dateTab,
        tempMin: minTempTab,
        tempMax: maxTempTab,
        img: imgTab
      }

      console.log(dataObj)
      this.showData(dataObj);
    },
    showData(data) {
      const parentEl = document.querySelector('#par');
      data.days.forEach((item, index) => {
        const example = `
          <div class="card rounded-0 border-1">
            <div class="card-body row">
              <span class="me-3 col-4">${item}, ${data.month[index]} ${data.date[index]}</span>
              <span class="col-3">
                <img src="${data.img[index]}" alt="icon">
              </span>
              <span class="col-4">${data.tempMin[index]} / ${data.tempMax[index]} ${this.showUnit}</span>
            </div>
          </div>
        `;
        const childrenEl = document.createElement('div');
        childrenEl.innerHTML = example;
        parentEl.appendChild(childrenEl);
      });
    }
  }
}
</script>

<style scoped lang="scss">
.card {
  min-width: 261px;
}
</style>