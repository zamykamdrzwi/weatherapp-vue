<template>
  <div>
    {{ day }}
  </div>
</template>

<script>
export default {
  props: ['date'],
  data() {
    return {
      day: null
    };
  },
  watch: {
    date() {
      this.setDate();
    },
  },
  methods: {
    setDate() {
      const date = new Date(this.date);
      const dayOfWeekIndex = date.getDay();
      const daysOfWeek = ['Monday','Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
      const dayOfWeekName = daysOfWeek[dayOfWeekIndex];

      console.log(dayOfWeekName);
    }
  }
}
</script>

<style lang="scss" scoped>

</style>