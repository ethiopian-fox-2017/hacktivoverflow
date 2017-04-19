<template>
  <div class="question">
    <h1 class="title question-title">{{ data.title }}</h1>
    <div class="columns">
      <div id="question" class="column is-three-quarters">
        <article class="box">
          <div class="content is-large">
            <h3>{{ data.content }}</h3>
          </div>
          <div class="box">
            <div class="content is-medium">
              <h2 class="subtitle is-4">Answers</h2><hr>
              <div class="answers has-text-right" v-for="each in data.answers">
                <h6 class="subtitle is-4">
                  {{ each.content }}
                  <a v-if="logg" id="delete" class="button is-danger" @click="deleteAnswer(each)"><span class="icon is-medium"><i class="fa fa-times"></i></span></a>
                </h6>
                <p class="subtitle is-6">by {{ each.user.username }}</p>
                <div v-if="logg" class="field is-grouped">
                  <p class="control"><a class="button" @click="voteAnswer(1, each._id)"><span class="icon is-small"><i class="fa fa-caret-up"></i></span></a></p>
                  <p class="control">{{ each.votes.filter((val)=> {return val.count == 1}).length - each.votes.filter((val)=> {return val.count == -1}).length }}</p>
                  <p class="control"><a class="button" @click="voteAnswer(-1, each._id)"><span class="icon is-small"><i class="fa fa-caret-down"></i></span></a></p>
                </div><hr>
              </div>
            </div>
          </div>
        </article>
        <article v-if="logg" class="box">
          <form>
            <div class="field">
              <label class="title label has-text-centered">Answer this question</label>
            </div>
            <div class="field">
              <label class="label">Your answer</label>
              <p class="control"><textarea class="textarea" v-model="content" placeholder="Answer here"></textarea></p>
            </div>
            <div class="field">
              <p class="control"><button class="button is-primary" @click="answer()">Submit</button></p>
            </div>
          </form>
        </article>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'question',
  data() {
    return {
      data: {},
      title: '',
      content: '',
      logg : this.$store.state.loggedUser
    }
  },
  methods: {
    getTheQuestion() {
      let self= this
      axios.get('http://localhost:3000/api/post/'+this.$route.params.id)
        .then((res)=> {
          self.data = res.data
          console.log(res.data)
        })
        .catch((err)=> {
          console.log(err)
          alert('Server error')
        })
    },
    answer() {
      let self = this
      axios.post('http://localhost:3000/api/post/answer/'+this.$route.params.id, {
        content: self.content
      }, {headers: {'token': self.$store.state.userToken}}).then((res)=> {
        alert('Answer success')
        window.location.reload()
      }).catch((err)=> {
        alert('Answer failed')
      })
    },
    voteAnswer(data, id) {
      let self = this
      axios.post('http://localhost:3000/api/vote/answer/'+this.$route.params.id+'/'+id, {
        count: data
      }, {headers: {'token': self.$store.state.userToken}}).then((res)=> {
        alert('Vote done!')
      }).catch((err)=> {
        alert('Vote failed')
      })
    },
    deleteAnswer(data) {
      let self = this,
          confirmed = confirm('are you sure?')
      if(confirmed) {
        axios.delete('http://localhost:3000/api/post/answer/'+this.$route.params.id+'/'+data._id)
          .then((res)=> {
            alert('Deleted !')
            window.location.reload()
          })
          .catch((res)=> {
            alert('Delete fail')
          })
      }
    }
  },
  mounted() {
    this.getTheQuestion()
  }
}
</script>

<style scoped>
label {
  display: block;
  margin: 1em;
}
#question {
  margin: auto;
}
.question-title {
  text-align: center;
}

</style>