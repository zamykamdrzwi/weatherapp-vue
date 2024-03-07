<template>
  <div>{{ weather.name }}</div>
  <div>{{ weather.main.temp }}{{ showUnit }}</div>
</template>

<script>
export default {
  props: ['weather', 'showUnit'],
}
</script>