<template>
  <the-header></the-header>
  <router-view class="mt-6">
    
  </router-view>
  <the-footer></the-footer>
</template>

<script>
import TheHeader from './components/layouts/TheHeader.vue';
import TheFooter from './components/layouts/TheFooter.vue';

export default {
  components: {
    TheHeader,
    TheFooter
  }
}
</script>

<style lang="scss">
@import './assets/style/style.scss';
body {
  margin: 0;
}
</style>
