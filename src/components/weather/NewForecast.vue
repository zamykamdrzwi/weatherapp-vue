<template>
  <div>new forecast</div>
</template>

<script>
export default {
  props: ['showUnit'],
  computed: {
    forecast() {
      return this.$store.state['forecast'];
    }
  }
}
</script>

<style lang="scss" scoped>

</style>