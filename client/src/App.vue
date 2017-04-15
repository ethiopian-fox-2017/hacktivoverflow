<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <Navigasi id="navi">HACKTIV-OVERFLOW</Navigasi>
    <router-view></router-view>
  </div>
</template>

<script>
import Isi from '@/components/Isi'
import Navigasi from '@/components/Navigasi'
export default {
  name: 'app',
  components: {
    Isi,
    Navigasi
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#navi {
  color: #FFFFFF
}
</style>
