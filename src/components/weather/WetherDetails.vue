<template>
  <div>
    dsada
  </div>
  <div>

  </div>
</template>

<script>
export default {
  computed: {
    details() {
      return this.$store.state['indexData'];
    },
    watch: {
      details() {
        this.initDetails(this.details);
      }
    },
    methods: {
      initDetails(data) {
        console.log(data);
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>