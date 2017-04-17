<template>
  <div style="margin-top:20px;">
  <el-row>
    <el-col :span="14" :offset="2">
      <el-row :gutter="20">
        <h1>{{question.title}}</h1>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="4">
          <div class="vote">
            <a @click="vote(1)"><i class="el-icon-caret-top"></i></a>
            <span style="line-height: 36px; font-size:25px;">{{totalVoteQuestion}}</span>
            <a @click="vote(-1)"><i class="el-icon-caret-bottom"></i></a>
          </div>
        </el-col>
        <el-col :span="20">
          <div class="grid-content">
            <h4 style="font-size:20px;">{{question.post}}</h4>
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="10" :offset="14">
          <div class="grid-content bg-purple">
            <h4>Asked by : </h4>
            <h5 v-if="question.author.username != undefined">{{question.author.username}}</h5>
          </div>
        </el-col>
      </el-row>
    </el-col>

     <Answers :answernya="dataAnswers" :questionsnya="question"/>

  </el-row>
  <el-row :gutter="15">
  <el-col :span="18" :offset="3"><form-answer :id="question._id"></form-answer></el-col>
</el-row>
</div>
</template>

<script>
import Answers from './Answers.vue'
import FormAnswer from './FormAnswer.vue'



export default {
  props : ['id'],
  data() {
    return {
      question: {},
      totalVoteQuestion : 0,
      dataAnswers : [],
      coba : [1,3,4,5]
    }
  },
  watch: {
    '$route': 'fetchData'
  },
  methods: {

    vote(number) {
      var self = this

      this.$message('You give Upvote for this question');
      axios.post(`http://localhost:3000/questions/${this.question._id}/votes`, {
        number
      })
        .then(response => {
          if (response.data.success === false){
            const h = this.$createElement;
            this.$notify({
              title: 'Warning',
              message: 'Youre Already update',
              type: 'warning'
            });
            console.log('sudah');
          }else {
            if (number == 1){
              self.totalVoteQuestion += 1
              this.$message('You give Upvote for this question');
            }else {
              self.totalVoteQuestion -= 1
              this.$message('You give Downvote for this question');
            }
          }


          console.log(response.data.success)
        })
        .catch(error => {

          console.log(error)
        })
    },
    fetchData() {
      let id = this.$route.params.id
      let self = this

      axios.get(`http://localhost:3000/questions/${id}`)
        .then(response => {
          console.log(response.data)
          self.question = response.data.question
          response.data.question.votes.forEach(vote => self.totalVoteQuestion += vote.number)
          self.dataAnswers = response.data.question.answers
          console.log(self.dataAnswers.length);
        })
        .catch(error => {
          alert('error, see console')
          console.log(error)
        })

    }
  },
  components: {
    Answers,
    FormAnswer
  },
  mounted() {
    this.fetchData()
  }
}
</script>

<style>

</style>
