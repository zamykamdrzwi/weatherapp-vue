<template>
  <div id="map"></div>
</template>

<script>
/* global google */
import { Loader } from '@googlemaps/js-api-loader';

export default {
  data() {
    return {
      map: null
    };
  },
  methods: {
    initMap() {
      const loader = new Loader({
        apiKey: 'AIzaSyDtc5nYAqGQBk1qGNoTbSOcGfKUR0U0tqg',
        version: 'weekly',
        // ...additionalOptions,
      });

      const options = {
        zoom: 8,
        center: { lat: 42.3601, lng: -71.0589 }
      }
      
      try {
        loader.load().then(async () => {
          const { Map } = await google.maps.importLibrary('maps');
          this.map = new Map(document.querySelector('#map'), options);
        });
      } catch (err) {
        console.log(`Error with Google Maps API: ${err}`);
      }
    }
  },
  mounted() {
    this.initMap();
  }
}
</script>

<style lang="scss" scoped>
#map {
  height: 400px;
  width: 100%;
}
</style>