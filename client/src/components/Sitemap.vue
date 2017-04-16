<template lang="html">
  <div class="container">
    <!-- navigasi -->
    <Navigation></Navigation>
    <!-- navigasi -->
    <div class="mywelcome">
      <h1>WELCOME TO HACKTIVOVERFLOW</h1>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Navigation from './Navigation'
export default {
  components:{
    Navigation
  }
}
</script>

<style lang="css">
.mywelcome {
  text-align: center;
}
</style>
