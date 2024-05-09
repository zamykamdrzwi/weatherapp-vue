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
      console.log(item);
    },
    prepareData(data) {
      console.log(data);
      let date0 = data.list[0].dt_txt.substring(8, 10);
      let daysIndex = 0
      data.list.forEach(item => {
        if(item.dt_txt.substring(8, 10) != date0){
          date0 = item.dt_txt.substring(8, 10);
          daysIndex++;
        }
      });
      console.log(daysIndex);
    }
  }
}
</script>

<style scoped lang="scss">
.card {
  min-width: 261px;
}
</style>