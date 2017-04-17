<template>
  <div>
    <button type="submit" @click="logout()" id="logout">Logout</button><br>
    <h3 id="login-as-who"><b>Welcome, {{ current.username }}.</b></h3>

<!--///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////-->
<!-- LIST OF MY QUESTIONS BUTTON AND MODAL -->

    <!-- Button trigger modal List of My Question -->
    <button type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#myModal" id="listQuestionBtn" @click="getMyQuestions(current._id)">
      List of my Questions
    </button>

    <!-- Modal for List of My Question -->
    <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title" id="myModalLabel">My Questions</h4>
          </div>
          <div class="modal-body" v-for="question in myQuestions">
            <h4>{{question.title}}</h4>
            <!-- <h3>ID: {{question._id}}</h3> -->
            <button id="del" type="button" class="btn btn-default" data-dismiss="modal" @click="deleteMyQuestion(question._id)">DELETE</button>

          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>

<!--///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////-->
<!-- SHOW LIST OF QUESTIONS IN HACKTIV OVERFLOW -->

    <div class="threads" v-for="data in alldata">
      <router-link :to="'detail/'+data._id" id="removeUnderline">
        <h2>{{ data.title }}</h2>
        <h4>Total Votes: {{ data.upVotes.length - data.downVotes.length }}</h4>
        <h4>Total Answer: {{ data.answer.length }}</h4>
        <h4>Author: {{data.author.username}}</h4>
      </router-link>
    </div>

<!--///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////-->
<!-- ADD NEW QUESTIONS BUTTON AND MODAL -->

    <!-- Button trigger modal New Question -->
    <button type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#myModal2" id="question">
      Add New Question
    </button>

    <!-- Modal for New Question -->
    <div class="modal fade" id="myModal2" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title" id="myModalLabel2">New Question</h4>
          </div>
          <div class="modal-body">
            <h4>Title</h4>
            <textarea rows="4" cols="78" placeholder="Input title here..." v-model="newQuestionTitle">
            </textarea><br>
            <h4>Content</h4>
            <textarea rows="4" cols="78" placeholder="Input content here..." v-model="newQuestionContent">
            </textarea>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" @click="newQuestion()">Post Question</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import axios from 'axios'
import serverUrl from '../serverlink'

export default {
  name: 'isi',
  components : {
  },
  data() {
    return {
      alldata: [], //Array to get all data from database
      newQuestionTitle: '', //textarea for Question Title, inside modals of Add New Question
      newQuestionContent: '', //textarea for Question Title, inside modals of Add New Question
      current: '',
      myQuestions: '' //to store the username of current user signing in to Hacktiv Overflow
    }
  },
  methods: {
    getAllData() {
      let config = {
        headers: {'token': localStorage.getItem('token')}
      };

      let self = this;
      axios.get(`${serverUrl}/questions/`, config)
      .then(function (response){
        self.alldata = response.data
      //  console.log(self.alldata);
      })
      .catch(function(error){
        console.log(error);
      })
    },
    logout() {
      localStorage.clear()
      window.location = '/#/'
    },
    newQuestion() {
      let self = this;
      axios.post(`${serverUrl}/questions/`, {title: self.newQuestionTitle, content: self.newQuestionContent}, {headers: {'token': localStorage.getItem('token')}})
      .then(function (response){
        console.log(response);
        self.getAllData();
        $('#myModal2').modal('hide');
      })
      .catch(function(error){
        console.log(error);
      })
    },
    getCurrentUser() {
      let config = {
        headers: {'token': localStorage.getItem('token')}
      };

      let self = this;
      axios.get(`${serverUrl}/questions/current`, config)
      .then(function (response){
        self.current = response.data
        console.log("RESPONSE: ", response.data);
      })
      .catch(function(error){
        console.log(error);
      })
    },
    getMyQuestions(authorId) {
      let config = {
        headers: {'token': localStorage.getItem('token')}
      };

      let self = this;
      axios.get(`${serverUrl}/questions/list/${authorId}`, config)
      .then(function (response){
        self.myQuestions = response.data
        console.log("RESPONSE: ", response);
      })
      .catch(function(error){
        console.log(error);
      })
    },
    deleteMyQuestion(questionId){
      var ask = confirm("Are you sure want to Delete this question?");
      if(ask == true){
        let config = {
          headers: {'token': localStorage.getItem('token')}
        };

        let self = this;
        axios.delete(`${serverUrl}/questions/${questionId}`, config)
        .then(function (response){
          //console.log("DELETE SUCCESS", response.data);
          self.getAllData();
        })
        .catch(function(error){
          console.log(error);
        })
      }
    }
  },
  mounted() {
    this.getAllData(),
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

.threads {
  padding: 20px;
  padding-bottom: 40px;
  border: 1px solid;
  margin-left: 40px;
  margin-right: 40px;
  margin-bottom: 30px;
  box-shadow: 5px 5px 5px #888888;
}

#login-as-who {
  padding: 20px;
  padding-top: 80px;
  color: DarkRed;
  margin-left: 20px;
}

#question {
  margin-left: 40px;
  background-color: DarkRed;
  border-color: DarkRed;
  margin-bottom: 50px;
  margin-top: 30px;
}

#listQuestionBtn {
  margin-left: 40px;
  background-color: Green;
  border-color: Green;
  margin-bottom: 50px;
}

#del {
  background-color: DarkRed;
  color: white;
  border-radius: 10px;

}

#removeUnderline {
  text-decoration: none;
}
</style>
