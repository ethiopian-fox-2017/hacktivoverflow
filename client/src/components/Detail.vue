<template>
  <div v-if="question != null">
    <button type="submit" @click="logout()" id="logout">Logout</button><br>
    <div class="containerQuestion">
      <h1>Title: {{question.title}}</h1>
      <h3>Content: {{question.content}}</h3>
      <h4>Author: {{question.author.username}}</h4>
      <h4>Total UpVotes for this Question: {{question.upVotes.length}}</h4>
      <h4>Total DownVotes for this Question: {{question.downVotes.length}}</h4>
      <h4>Resultan Votes for this Question: {{ question.upVotes.length - question.downVotes.length }}</h4>
      <button class="upQ" @click="upvoteQuestion(question._id)">UpVote Question</button>
      <button class="downQ" @click="downvoteQuestion(question._id)">DownVote Question</button>
      <p class="response">{{ response.msg }}</p>
    </div>

    <div class="containerAnswer">
      <h3>Total Answer: {{question.answer.length}}</h3><br>
      <h4>Your Answer:</h4>
      <textarea required rows="3" cols="50" placeholder="Input your answer here..." v-model="newAnswer"></textarea><br>
      <button class="answer" @click="answering(question._id)">Add Answer</button><br><br>
      <p id="warning">{{ warning }}</p>

      <div class="answers" v-for="answer in question.answer">
        <h4>answer: {{answer.content}}</h4>
        <p>answered by: {{answer.user.username}}</p>
        <p>Total UpVotes for this Answer: {{answer.upVotes.length}}</p>
        <p>Total DownVotes for this Answer: {{answer.downVotes.length}}</p>
        <p>Resultan Votes for this Answer: {{answer.upVotes.length - answer.downVotes.length}}</p>
        <button class="upA" @click="upvoteAnswer(question._id, answer._id)">UpVote Answer</button>
        <button class="downA" @click="downvoteAnswer(question._id, answer._id)">DownVote Answer</button>
        <p class="response">{{ response2.msg }}</p>
        <br><br>
      </div>
    </div>
  </div>
</template>


<script>
import axios from 'axios'
export default {
  data() {
    return {
      id: this.$route.params.id,
      question: null,
      response: '', //response for Upvote/Downvote Question
      response2: '', //response for Upvote/Downvote Answer
      newAnswer: '', //textarea for inputing new Answer
      newQuestionTitle: '', //textarea for Question Title, inside modals of Add New Question
      newQuestionContent: '', //textarea for Question Title, inside modals of Add New Question
      warning: '', //warning when user has not filled anything yet in the Answer textarea
    }
  },
  methods: {
    getThisQuestion(){
      let config = {
        headers: {'token': localStorage.getItem('token')}
      };

      let self = this;
      axios.get(`http://localhost:3000/questions/${self.id}`, config)
      .then(function (response){
        self.question = response.data
        console.log(response.data);
      })
      .catch(function(error){
        console.log(error);
      })
    },
    answering(id) {
      let self = this;
      if(self.newAnswer == ''){
        self.warning = 'You haven\'t answered anything yet'
      } else {
        axios.put(`http://localhost:3000/questions/${id}/answers`, {content: self.newAnswer}, {headers: {'token': localStorage.getItem('token')}})
        .then(function (response){
          console.log(response);
        })
        .catch(function(error){
          console.log(error);
        })
        console.log(id);
      }
    },
    upvoteQuestion(id) {
      let self = this;
      axios.put(`http://localhost:3000/questions/up/${id}`, {}, {headers: {'token': window.localStorage.getItem('token')}})
      .then(function (response) {
        console.log(response.data);
        self.response = response.data
      })
      .catch(function(error){
        console.log(error);
      })
      console.log(id);
    },
    downvoteQuestion(id) {
      let self = this;
      axios.put(`http://localhost:3000/questions/down/${id}`, {}, {headers: {'token': localStorage.getItem('token')}})
      .then(function (response){
        console.log(response.data);
        self.response = response.data
      })
      .catch(function(error){
        console.log(error);
      })
      console.log(id);
    },
    upvoteAnswer(qId, aId) {
      let self = this;
      axios.put(`http://localhost:3000/questions/answers/up/${qId}`, {answer:`${aId}`}, {headers: {'token': localStorage.getItem('token')}})
      .then(function (response){
        console.log(response.data.msg);
        self.response2 = response.data
      })
      .catch(function(error){
        console.log(error);
      })
    },
    downvoteAnswer(qId, aId) {
      let self = this;
      axios.put(`http://localhost:3000/questions/answers/down/${qId}`, {answer:`${aId}`}, {headers: {'token': localStorage.getItem('token')}})
      .then(function (response){
        console.log(response.data.msg);
        self.response2 = response.data
      })
      .catch(function(error){
        console.log(error);
      })
    },
    logout() {
      localStorage.clear()
      window.location = '/#/'
    }
  },
  mounted() {
    this.getThisQuestion()
  }
}
</script>

<style>
#logout {
  margin-right: 20px;
  margin-top: 20px;
  float: right;
  border-radius: 6px;
  background-color: white;
  font-weight: 800;
  color: DarkRed;
}

#logout:hover {
  background-color: DarkRed;
  color: white;
}

#warning {
  color: red;
}

.response {
  color: green;
}

.containerQuestion {
  padding: 20px;
}

.containerAnswer {
  border-top: 3px solid;
  padding: 20px;
  margin: 0;
}

#questionBtn {
  margin-left: 20px;
  background-color: DarkRed;
  border-color: DarkRed;
  margin-bottom: 50px;
  margin-top: 30px;
}
</style>
