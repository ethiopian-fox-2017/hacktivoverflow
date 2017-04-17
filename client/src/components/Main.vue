<template>
  <div class="main">
    <h1 class="title main-title">{{ msg }}</h1>
    <div class="columns">
      <div class="column is-three-quarters">
        <article v-if="datas.length > 0" v-for="data in datas" class="box">
          <div class="content is-large">
            <h2 class="subtitle">{{ data.title }}</h2>
            <p>{{ data.content }}</p>
          </div>
          <div v-if="this.$store.state.loggedUser !== data.user.username" class="field is-grouped">
            <p class="control"><a class="button" @click="vote(1)"><span class="icon is-small"><i class="fa fa-caret-up"></i></span></a></p>
            <p class="control">{{ voteCount.length }}</p>
            <p class="control"><a class="button" @click="vote(-1)"><span class="icon is-small"><i class="fa fa-caret-down"></i></span></a></p>
          </div>
        </article>
      </div>
      <div class="column is-one-quarters">
        <aside class="menu">
          <button v-if="this.$store.state.loggedUser" class="ask button is-primary"><router-link :to="">Ask a Question</router-link></button>
        </aside>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'main',
  data () {
    return {
      msg: 'Welcome to Hacktivoverflow',
      datas: [],
      selectedQ: null,
      voteCount : []
    }
  },
  methods: {
    getData() {
      let self = this
      axios.get('http://localhost:3000/api/post')
        .then((res)=> {
          self.datas = res.data
          self.selectedQ = res.data[0]
        })
        .catch((err)=> {
          console.log(err)
          alert('Server error')
        })
    },
    selectData(data) {
      self.selectedQ = data
    }
  },
  mounted() {
    this.getData()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main-title {
  text-align: center;
}
.columns {
  margin:auto;
}
.ask {
  margin: 1em;
}
</style>
