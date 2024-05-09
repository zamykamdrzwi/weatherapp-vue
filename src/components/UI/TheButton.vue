<template>
  <button  
    @click="activeBtn()">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: ['id'],
  methods: {
    activeBtn() {
    }
  }
}
</script>

<style lang="scss" scoped>
.custom-btn:hover, .active {
  color: #B9FA28 !important;
}
</style>