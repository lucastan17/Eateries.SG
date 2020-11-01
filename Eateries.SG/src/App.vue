<script src="https://www.gstatic.com/firebasejs/6.2.3/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/6.2.3/firebase-storage.js"></script>

<template>
  <div id="app">
    <banner></banner>
    <router-view></router-view>
  </div>
</template>

<script>
//import PartnerEateries from './components/PartnerEateries.vue'
//import CurrentBookings from './components/CurrentBookings.vue'
import Banner from './components/Banner.vue'

export default {
  name: 'App',
  components: {
    //PartnerEateries,
    //CurrentBookings
    Banner
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
</style>
