<template>
  <div class="profile">
    <h1 class="title main-title">{{ msg }}</h1>
    <div class="columns">
      <div class="column is-three-quarters">
        <article class="box">
          <div v-if="userData" class="content is-large">
            <h2 class="subtitle">{{ userData.username }}</h2>
            <p>You asked : {{ userData.postId.length }} questions</p>
          </div>
        </article>
        <article v-if="userQuestions.length > 0" class="box">
          <div class="content is-medium">
            <div v-for="quest in userQuestions">
              <p>{{ quest.title }}</p>
            </div>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'profile',
  data () {
    return {
      msg: 'Welcome to Hacktivoverflow',
      userData: null,
      userQuestions: []
    }
  },
  methods: {
    getUser() {
      let self = this
      axios.get('http://localhost:3000/api/user/'+this.$route.params.username)
        .then((res)=> {
          self.userData = res.data
          self.userQuestions = res.data.postId
        })
        .catch((err)=> {
          console.log(err)
          alert('Server error')
        })
    }
  },
  mounted() {
    this.getUser()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main-title {
  text-align: center;
}
.is-three-quarters {
  margin:auto;
}
</style>
