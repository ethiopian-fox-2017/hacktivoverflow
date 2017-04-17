<template>
  <div class="login">
    <div class="columns">
      <div id="login" class="column is-half">
        <form>
          <div class="field">
            <label class="title label has-text-centered">Login</label>
          </div>
          <div class="field">
            <label class="label">Username</label>
            <p class="control"><input class="input" v-model="username" type="text" placeholder="Username here"></p>
          </div>
          <div class="field">
            <label class="label">Password</label>
            <p class="control"><input class="input" v-model="password" type="password" placeholder="Your password here"></p>
          </div>
          <div class="field">
            <p class="control"><button class="button is-primary" @click="login()">Submit</button></p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login() {
      let self = this
      axios.post('http://localhost:3000/api/login', {
        username: self.username,
        password: self.password
      }).then((res)=> {
        localStorage.setItem('token', res.data)
        localStorage.setItem('user', self.username)
        alert('Login Success')
        self.$router.push({ path: '/' })
        window.location.reload()
      }).catch((err)=> {
        console.log(err)
        alert('Login Failed')
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
label {
  display: block;
  margin: 1em;
}
#login {
  margin: auto;
}
</style>
