<template>
  <div>
    <button type="submit" @click="logout()" id="logout">Logout</button><br>
    
    <div class="threads" v-for="data in alldata">
      <router-link :to="'detail/'+data._id" id="removeUnderline">
        <h2>{{ data.title }}</h2>
        <h4>Total Votes: {{ data.upVotes.length - data.downVotes.length }}</h4>
        <h4>Total Answer: {{ data.answer.length }}</h4>
      </router-link>
    </div>

    <!-- Button trigger modal New Question -->
    <button type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#myModal2" id="questionBtn">
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
            <textarea rows="4" cols="50" placeholder="Input title here..." v-model="newQuestionTitle">
            </textarea><br>
            <h4>Content</h4>
            <textarea rows="4" cols="50" placeholder="Input content here..." v-model="newQuestionContent">
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
export default {
  name: 'isi',
  components : {
  },
  data() {
    return {
      alldata: [], //Array to get all data from database
      newQuestionTitle: '', //textarea for Question Title, inside modals of Add New Question
      newQuestionContent: '' //textarea for Question Title, inside modals of Add New Question
    }
  },
  methods: {
    getAllData() {
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
    logout() {
      localStorage.clear()
      window.location = '/#/'
    },
    newQuestion() {
      let self = this;
      axios.post('http://localhost:3000/questions/', {title: self.newQuestionTitle, content: self.newQuestionContent}, {headers: {'token': localStorage.getItem('token')}})
      .then(function (response){
        console.log(response);
      })
      .catch(function(error){
        console.log(error);
      })
    }
  },
  mounted() {
    this.getAllData()
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
  border-bottom: 3px solid;
}

#questionBtn {
  margin-left: 20px;
  background-color: DarkRed;
  border-color: DarkRed;
  margin-bottom: 50px;
  margin-top: 30px;
}

#removeUnderline {
  text-decoration: none;
}
</style>
