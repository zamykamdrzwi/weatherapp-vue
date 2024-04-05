<template>
  <button class="btn btn-outline-dark border-0 rounded-0 custom-btn"
    @click="activeBtn()">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: ['id'],
  methods: {
    activeBtn() {
      console.log(this.id)
    }
  }
}
</script>

<style lang="scss" scoped>
.custom-btn:hover, .active {
  color: #B9FA28 !important;
}
</style>