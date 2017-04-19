<template>
  <div v-if="question != null">
    <button type="submit" @click="logout()" id="logout">Logout</button><br>
    <h3 id="login-as-who"><b>You are signing in as: {{ current.username }}.</b></h3>
    <div class="containerQuestion">
      <h1>{{question.title}}</h1>
      <h4>{{question.content}}</h4>
      <h4>Author: {{question.author.username}}</h4>
      <h4>Total UpVotes for this Question: {{question.upVotes.length}}</h4>
      <h4>Total DownVotes for this Question: {{question.downVotes.length}}</h4>
      <h4>Resultan Votes for this Question: {{ question.upVotes.length - question.downVotes.length }}</h4>
      <button class="upQ" @click="upvoteQuestion(question._id)">UpVote Question</button>
      <button class="downQ" @click="downvoteQuestion(question._id)">DownVote Question</button>
      <p class="responseVQ">{{ response.msg }}</p>
    </div>

    <div class="containerAnswer">
      <h3>Total Answer: {{question.answer.length}}</h3><br>

      <div class="boxAnswer">
        <h4>Your Answer:</h4>
        <textarea required rows="3" cols="50" placeholder="Input your answer here..." v-model="newAnswer"></textarea><br>
        <button class="answer" @click="answering(question._id)">Add Answer</button><br><br>
        <p id="warning">{{ warning }}</p>
      </div>

      <div class="answers" v-for="answer in question.answer">
        <h4>answer: {{answer.content}}</h4>
        <p>answered by: {{answer.user.username}}</p>
        <p>Total UpVotes for this Answer: {{answer.upVotes.length}}</p>
        <p>Total DownVotes for this Answer: {{answer.downVotes.length}}</p>
        <p>Resultan Votes for this Answer: {{answer.upVotes.length - answer.downVotes.length}}</p>
        <button class="upA" @click="upvoteAnswer(question._id, answer._id)">UpVote Answer</button>
        <button class="downA" @click="downvoteAnswer(question._id, answer._id)">DownVote Answer</button>
        <br><br>
      </div>
    </div>
    <h3 class="responseVA">{{ response2.msg }}</h3>
  </div>
</template>


<script>
import axios from 'axios'
import serverUrl from '../serverlink'

export default {
  data() {
    return {
      id: this.$route.params.id,
      question: null,
      response: '', //response for Upvote/Downvote Question (Success or Fail)
      response2: '', //response for Upvote/Downvote Answer (Success or Fail)
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
      axios.get(`${serverUrl}/questions/${self.id}`, config)
      .then(function (response){
        self.question = response.data
        //console.log(response.data);
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
        axios.put(`${serverUrl}/questions/${id}/answers`, {content: self.newAnswer}, {headers: {'token': localStorage.getItem('token')}})
        .then(function (response){
          //console.log(response);
          self.getThisQuestion()
        })
        .catch(function(error){
          console.log(error);
        })
        //console.log(id);
      }
    },
    upvoteQuestion(id) {
      let self = this;
      axios.put(`${serverUrl}/questions/up/${id}`, {}, {headers: {'token': window.localStorage.getItem('token')}})
      .then(function (response) {
        //console.log(response.data);
        self.response = response.data
        self.getThisQuestion()
      })
      .catch(function(error){
        console.log(error);
        window.location.reload();
      })
      console.log(id);
    },
    downvoteQuestion(id) {
      let self = this;
      axios.put(`${serverUrl}/questions/down/${id}`, {}, {headers: {'token': localStorage.getItem('token')}})
      .then(function (response){
        //console.log(response.data);
        self.response = response.data
        self.getThisQuestion()
      })
      .catch(function(error){
        console.log(error);
      })
      console.log(id);
    },
    upvoteAnswer(qId, aId) {
      let self = this;
      axios.put(`${serverUrl}/questions/answers/up/${qId}`, {answer:`${aId}`}, {headers: {'token': localStorage.getItem('token')}})
      .then(function (response){
        console.log(response.data);
        self.response2 = response.data
        self.getThisQuestion()
      })
      .catch(function(error){
        console.log(error);
      })
    },
    downvoteAnswer(qId, aId) {
      let self = this;
      axios.put(`${serverUrl}/questions/answers/down/${qId}`, {answer:`${aId}`}, {headers: {'token': localStorage.getItem('token')}})
      .then(function (response){
        console.log(response.data);
        self.response2 = response.data
        self.getThisQuestion()
      })
      .catch(function(error){
        console.log(error);
      })
    },
    logout() {
      localStorage.clear()
      window.location = '/#/'
    },
    getCurrentUser() {
      let config = {
        headers: {'token': localStorage.getItem('token')}
      };

      let self = this;
      axios.get(`${serverUrl}/questions/current`, config)
      .then(function (response){
        self.current = response.data
        //console.log("RESPONSE: ", response.data);
      })
      .catch(function(error){
        console.log(error);
      })
    }
  },
  mounted() {
    this.getThisQuestion(),
    this.getCurrentUser()
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

#login-as-who {
  padding: 20px;
  padding-top: 80px;
  color: DarkRed;
}

#warning {
  color: red;
}

.responseVQ {
  color: green;
  margin-top: 10px;
}

.responseVA {
  color: green;
  margin-left: 40px;
}

.containerQuestion {
  padding-left: 40px;
  padding-bottom: 20px;
  padding-right: 40px;
}

.containerAnswer {
  border-top: 3px solid;
  padding-left: 40px;
  padding-right: 40px;
}

.boxAnswer {
  padding: 14px;
  border: 2px solid DarkRed;
  width: 410px;
  margin-bottom: 30px;
  background-color: PeachPuff;
}

#questionBtn {
  margin-left: 20px;
  background-color: DarkRed;
  border-color: DarkRed;
  margin-bottom: 50px;
  margin-top: 30px;
}

.answers {
  border: 1px solid black;
  padding: 30px;
  padding-bottom: 5px;
  margin-bottom: 30px;
  box-shadow: 5px 5px 5px #888888;
}
</style>
