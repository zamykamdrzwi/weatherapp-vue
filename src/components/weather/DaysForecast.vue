<template>
  <div class="card rounded-0 border-1">
    <div class="card-body row">
      <span class="me-3 col-5">Mon, May 09</span>
      <span class="col-3">dasdsada</span>
      <span class="col-3">{{ showUnit }}</span>
    </div>
  </div>
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
      console.log(data);
      let date0 = data.list[0].dt_txt.substring(8, 10);
      let daysIndex = 0;
      const daysTab = [];
      daysTab[0] = this.initDay(data.list[0].dt_txt.substring(0, 10));
      const monthTab = [];
      monthTab[0] = this.initMonth(data.list[0].dt_txt.substring(5, 7));
      const dateTab = [];
      dateTab[0] = data.list[0].dt_txt.substring(8, 10);
      data.list.forEach((item) => {
        if(item.dt_txt.substring(8, 10) != date0){
          date0 = item.dt_txt.substring(8, 10);
          daysIndex++;
          daysTab[daysIndex] = this.initDay(item.dt_txt.substring(0, 10));
          monthTab[daysIndex] = this.initMonth(item.dt_txt.substring(5, 7));
          dateTab[daysIndex] = item.dt_txt.substring(8, 10);
        }
      });

      const dataObj = {
        days: daysTab,
        month: monthTab,
        date: dateTab
      }
      this.showData(dataObj);
    },
    showData(data) {
      console.log(data);
    }
  }
}
</script>

<style scoped lang="scss">
.card {
  min-width: 261px;
}
</style>