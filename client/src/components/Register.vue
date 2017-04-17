<template>
  <div class="register">
    <div class="columns">
      <div id="register" class="column is-half">
        <form>
          <div class="field">
            <label class="title label has-text-centered">Register</label>
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
            <p class="control"><button class="button is-primary" @click="register()">Submit</button></p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'register',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    register() {
      let self = this
      axios.post('http://localhost:3000/api/register', {
        username: self.username,
        password: self.password
      }).then((res)=> {
        alert('Register Success')
        self.$route.router.go('Main')
      }).catch((err)=> {
        alert('Register Failed')
        window.location.reload()
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
#register {
  margin: auto;
}
</style>
