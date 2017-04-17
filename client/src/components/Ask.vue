<template>
  <div class="ask">
    <div class="columns">
      <div id="ask" class="column is-half">
        <form>
          <div class="field">
            <label class="title label has-text-centered">Ask a Question</label>
          </div>
          <div class="field">
            <label class="label">Title</label>
            <p class="control"><input class="input" v-model="title" type="text" placeholder="Question title"></p>
          </div>
          <div class="field">
            <label class="label">Password</label>
            <p class="control"><textarea class="input" v-model="content" placeholder="Ask here"></textarea></p>
          </div>
          <div class="field">
            <p class="control"><button class="button is-primary" @click="ask()">Submit</button></p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ask',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    ask() {
      let self = this
      axios.post('http://localhost:3000/api/post/question', {
        username: self.username,
        password: self.password
      }, {headers: {'token': self.$store.state.userToken}}).then((res)=> {
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
#ask {
  margin: auto;
}
</style>
