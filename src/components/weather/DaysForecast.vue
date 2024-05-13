<template>
  <div id="par" class="mt-2 custom-scroll"></div>
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
    },
    showUnit() {
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
      const minTempTab = [];
      const maxTempTab = [];
      const minTab = [];
      const maxTab = [];
      minTab[0] = parseInt(data.list[0].main.temp_min);
      maxTab[0] = parseInt(data.list[0].main.temp_max);

      data.list.forEach((item, index) => {
        let tempIntMin = parseInt(item.main.temp_min);
        let tempIntMax = parseInt(item.main.temp_max);
        minTempTab.push(tempIntMin);
        maxTempTab.push(tempIntMax);
        if(item.dt_txt.substring(8, 10) != date0){
          date0 = item.dt_txt.substring(8, 10);
          daysIndex++;
          daysTab[daysIndex] = this.initDay(item.dt_txt.substring(0, 10));
          monthTab[daysIndex] = this.initMonth(item.dt_txt.substring(5, 7));
          dateTab[daysIndex] = item.dt_txt.substring(8, 10);
          imgTab[daysIndex] = `https://openweathermap.org/img/wn/${data.list[index+3].weather[0].icon}.png`;

          const min = Math.min.apply(null, minTempTab);
          const max = Math.max.apply(null, maxTempTab);
          minTab.push(min);
          maxTab.push(max);
        }
      });

      const dataObj = {
        days: daysTab,
        month: monthTab,
        date: dateTab,
        tempMin: minTab,
        tempMax: maxTab,
        img: imgTab
      }

      this.showData(dataObj);
    },
    showData(data) {
      const parentEl = document.querySelector('#par');
      data.days.forEach((item, index) => {
        const example = `
          <div class="card rounded-0 border-1 mb-2">
            <div class="card-body row">
              <span class="col-5 me-3 d-flex align-items-center">
                ${item}, ${data.month[index]} ${data.date[index]}
              </span>
              <span class="col-6 d-flex align-items-center justify-content-end">
                <img src="${data.img[index]}" alt="icon">
                <div class="m-auto">
                  ${data.tempMin[index]} / ${data.tempMax[index]} ${this.showUnit}
                </div>
               </span>
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
  //min-width: 261px;
}
.custom-scroll {
  height: 250px;
  overflow-y: scroll;
  overflow-x: hidden;
}
</style>