<template>
  <div class="">
    <form class="">
      <label for="">username</label>
      <input type="text" v-model="username">
      <br>
      <label for="">password</label>
      <input type="text" v-model="password">
      <button type="button" @click="post">Sign Up</button>
    </form>
  </div>

</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    post() {
      let self = this
      axios.post('http://localhost:3000/users/register', {
        username: self.username,
        password: self.password
      })
        .then(response => {
          console.log(response.data)
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  created() {
    console.log(123)
  }
}
</script>

<style>
</style>
