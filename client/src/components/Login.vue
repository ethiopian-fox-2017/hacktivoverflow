<template>
  <div id="loginmenu">
    Username:
    <input type="text" v-model="username">
    <br><br>
    Password:
    <input type="password" v-model="password">
    <br>
    <button type="submit" @click="login()">Login</button>
    <br><br>
    <p>{{ response }}</p>
  </div>
</template>


<script>
import axios from 'axios'
export default {
  data() {
    return {
      username: '',
      password: '',
      response: ''
    }
  },
  methods: {
      login: function(){
        let self = this;
        axios.post('http://localhost:3000/login', {
          username: self.username,
          password: self.password
        })
        .then(function (response){
          if (response.data.success == false) {
            self.response = response.data.msg
            console.log(response);
          } else {
            self.response = response.data
            console.log(response.data);
            localStorage.setItem('token', response.data)
            window.location = '/#/isi'
          }

        })
        .catch(function(error){
          console.log(error);
        })
      }
  }
}
</script>

<style>
 #loginmenu {
   margin-left: 20px;
   margin-top: 10px;
 }
</style>
