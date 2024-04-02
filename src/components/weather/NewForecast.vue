<template>
  <div class="custom-scroll mt-4 mb-3">
    <div class="d-flex justify-content-start gap-3">
      <div class="card">
        <div class="card-header">dasdsada</div>
        <div class="card-body">
          <div class="card-text">Lorem ipsum dolor sit</div>
        </div>
      </div>
      <div class="card">
        <div class="card-header">dasdsada</div>
        <div class="card-body">
          <div class="card-text">Lorem ipsum dolor sit</div>
        </div>
      </div>
      <div class="card">
        <div class="card-header">dasdsada</div>
        <div class="card-body">
          <div class="card-text">Lorem ipsum dolor sit</div>
        </div>
      </div>
      <div class="card">
        <div class="card-header">dasdsada</div>
        <div class="card-body">
          <div class="card-text">Lorem ipsum dolor sit</div>
        </div>
      </div>
      <div class="card">
        <div class="card-header">dasdsada</div>
        <div class="card-body">
          <div class="card-text">Lorem ipsum dolor sit</div>
        </div>
      </div>
      <div class="card">
        <div class="card-header">dasdsada</div>
        <div class="card-body">
          <div class="card-text">Lorem ipsum dolor sit</div>
        </div>
      </div>
      <div class="card">
        <div class="card-header">dasdsada</div>
        <div class="card-body">
          <div class="card-text">Lorem ipsum dolor sit</div>
        </div>
      </div>
      <div class="card">
        <div class="card-header">dasdsada</div>
        <div class="card-body">
          <div class="card-text">Lorem ipsum dolor sit</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['showUnit'],
  computed: {
    forecast() {
      return this.$store.state['forecast'];
    },
  },
  methods: {
    prepareData() {

    },
    async showForecast() {
      await this.prepareData();
      
    },
  },
}
</script>

<style lang="scss" scoped>
.custom-scroll {
  width: 100%;
  white-space: nowrap;
  overflow-x: auto;
}
.card {
  min-width: 200px;
}
</style>