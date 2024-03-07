<template>
  <div>Weather output</div>
  <button class="btn btn-secondary" @click="showWeather">Pokkaż</button>
</template>

<script>
export default {
  props: ['weather'],
  methods: {
    showWeather() {
      console.log(this.weather);
    }
  }
}
</script>