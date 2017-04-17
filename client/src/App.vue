<template>
  <div id="app">
    <nav class="nav">
      <div class="nav-left">
        <h1 class="title nav-item"><router-link to="/">Hacktivoverflow</router-link></h1>
      </div>
      <div v-if="this.$store.state.isLogin" class="nav-right">
        <p class="nav-item"><router-link :to="{name: 'Profile', params: {username: this.$store.state.loggedUser}}">Profile</router-link></p>
        <p class="nav-item"><a @click="Logout">Logout</a></p>
      </div>
      <div v-else class="nav-right">
        <p class="nav-item"><router-link to="/register">Register</router-link></p>
        <p class="nav-item"><router-link to="/login">Login</router-link></p>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'app',
  methods: {
    ...mapMutations([
      'ifLogin'
    ]),
    Logout() {
      if(this.$store.state.isLogin) {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        window.location.reload()
      }
    }
  },
  mounted() {
    this.ifLogin()
  }
}
</script>

<style>

</style>
