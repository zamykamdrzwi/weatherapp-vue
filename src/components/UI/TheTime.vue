<template>
  <div class="mt-2">
    {{ checkedDate }}
  </div>
  <div class="mt-1">
    {{ checkedTime }}
  </div>
</template>

<script>
export default {
  props: ['time'],
  data() {
    return {
      checkedDate: null,
      checkedTime: null
    };
  },
  watch: {
    time() {
      this.setTime()
    }
  },
  methods: {
    setTime() {
      const timestamp = this.time;
      const date = new Date(timestamp * 1000);

      const year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      let hours = date.getHours();
      let minutes = date.getMinutes();

      let strHours = hours.toString();
      if(strHours.length<2){
        strHours = '0' + strHours;
      }

      let strMin = minutes.toString();
      if(strMin.length<2){
        strMin = '0' + strMin;
      }

      let strDay = day.toString();
      if(strDay.length<2){
        strDay = '0' + strDay;
      }

      let strMonth = month.toString();
      if(strMonth.length<2){
        strMonth = '0' + strMonth;
      }


      this.checkedDate = `${year}-${strMonth}-${strDay}`;
      this.checkedTime = `${strHours}:${strMin}`;
    }
  }
}
</script>

<style lang="scss" scoped>

</style>