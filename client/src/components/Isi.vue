<template>
  <div id="isi">
    <div class="threads" v-for="data in alldata">
      <p>Title: {{data.title}}</p>
      <p>Content: {{data.content}}</p>
      <p>Total UpVotes for this Question: {{data.upVotes.length}}</p>
      <p>Total DownVotes for this Question: {{data.downVotes.length}}</p>
      <p>Resultan Votes for this Question: {{ data.upVotes.length - data.downVotes.length }}</p>
      <button class="upQ" @click="upvoteQuestion(data._id)">UpVote Question</button>
      <button class="downQ" @click="downvoteQuestion(data._id)">DownVote Question</button>
      <p>{{ response.msg }}</p>
      <hr>
      <p>Total Answer: {{data.answer.length}}</p>
      <div class="answers" v-for="answer in data.answer">
        <p>answer: {{answer.content}}</p>
        <p>Total UpVotes for this Answer: {{answer.upVotes.length}}</p>
        <p>Total DownVotes for this Answer: {{answer.downVotes.length}}</p>
        <p>Resultan Votes for this Answer: {{answer.upVotes.length - answer.downVotes.length}}</p>
        <button class="upA" @click="upvoteAnswer(data._id, answer._id)">UpVote Answer</button>
        <button class="downA" @click="downvoteAnswer(data._id, answer._id)">DownVote Answer</button>
        <p>{{ response2.msg }}</p>

        <!-- Button trigger modal -->
        <button type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#myModal">
          Add Answer
        </button>

        <!-- Modal -->
        <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel">New Answer</h4>
              </div>
              <div class="modal-body">
                <textarea rows="4" cols="50" placeholder="Input your answer here..." v-model="newAnswer">
                </textarea>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" @click="answering(data._id)">Post Answer</button>
              </div>
            </div>
          </div>
        </div>


      </div>
    </div>
  </div>
</template>

<script>

import axios from 'axios'
export default {
  name: 'isi',
  components : {
  },
  data() {
    return {
      alldata: [],
      response: '',
      response2: '',
      newAnswer: ''
    }
  },
  methods: {
    getAllData: function() {
      let config = {
        headers: {'token': localStorage.getItem('token')}
      };

      let self = this;
      axios.get('http://localhost:3000/questions/', config)
      .then(function (response){
        self.alldata = response.data
      //  console.log(self.alldata);
      })
      .catch(function(error){
        console.log(error);
      })
    },
    upvoteQuestion: function(id) {
      let config = {
        headers: {'token': localStorage.getItem('token')}
      };
      console.log(config);
      let self = this;
      axios.put(`http://localhost:3000/questions/up/${id}`, config)
      .then(function (response){
        console.log(response.data);
        self.response = response.data
      })
      .catch(function(error){
        console.log(error);
      })
    },
    downvoteQuestion: function(id) {
      let self = this;
      axios.put(`http://localhost:3000/questions/down/${id}`, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(function (response){
        console.log(response.data);
        self.response = response.data
      })
      .catch(function(error){
        console.log(error);
      })
    },
    upvoteAnswer: function(qId, aId) {
      let self = this;
      axios.put(`http://localhost:3000/questions/answers/up/${qId}`, {
        answer: `${aId}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(function (response){
        console.log(response.data.msg);
        self.response2 = response.data
      })
      .catch(function(error){
        console.log(error);
      })
    },
    downvoteAnswer: function(qId, aId) {
      let self = this;
      axios.put(`http://localhost:3000/questions/answers/down/${qId}`, {
        answer: `${aId}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(function (response){
        console.log(response.data.msg);
        self.response2 = response.data
      })
      .catch(function(error){
        console.log(error);
      })
    },
    answering: function(id) {
      let self = this;
      axios.put(`http://localhost:3000/questions/${id}/answers`, {
        content: self.newAnswer,
        user: localStorage.getItem('token')
      })
      .then(function (response){
        console.log(response);
      })
      .catch(function(error){
        console.log(error);
      })
    }
  },
  mounted: function() {
    this.getAllData()
  //  console.log(this.alldata);
  }
}
</script>

<style>
#isi {
 margin-left: 20px;
 margin-top: 10px;
 margin-right: 20px;
}
</style>
