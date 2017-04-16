<template lang="html">
  <div class="container">
    <!-- modal question -->
    <div class="modal fade" id="question" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title" id="myModalLabel">New Question</h4>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label for="myTitle">Title</label>
                <input type="text" class="form-control" id="myTitle" v-model="question.title" placeholder="Write here...">
              </div>
              <div class="form-group">
                <label for="myQuestion">Question</label>
                <textarea class="form-control" rows="5" id="myQuestion" v-model="question.content" placeholder="Write here..."></textarea>
              </div>
              <button type="submit" class="btn btn-success" data-dismiss="modal" @click="postQuestion">Post Question</button>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
    <!-- modal question -->
    <!-- navigasi -->
    <Navigation></Navigation>
    <!-- navigasi -->
    <!-- main -->
    <div class="row">
      <!-- post -->
      <Post :threads="threads"></Post>
      <!-- post -->
      <!-- sidebar -->
      <Sidebar :threads="threads"></Sidebar>
      <!-- sidebar -->
    </div>
    <!-- main -->

  </div>
</template>

<script>
import Navigation from './Navigation'
import Post from './Post';
import Sidebar from './Sidebar';
import axios from 'axios'
export default {
  components:{
    Navigation,
    Post,
    Sidebar
  },
  data() {
    return {
      threads: [],
      question: {
        title:'',
        content:''
      },
    }
  },
  methods:{
    getThread() {
      let self = this
      axios.get('http://localhost:3000/thread',{headers: {'token': window.localStorage.getItem('token')}})
      .then((thr) => {
        axios.get('http://localhost:3000/answer',{headers: {'token': window.localStorage.getItem('token')}})
        .then((aws) => {
          let myFirstPromise = new Promise((resolve, reject) => {
            thr.data.map(insThr => {
              insThr.answers = aws.data.filter(insAws => {
                return insAws.thread == insThr._id.toString()
              })
            })
          resolve('success')
          });
          myFirstPromise.then((res) => {
            self.threads = thr.data
          });
        })
        .catch((err) => {
          console.log(err);
        })
      })
      .catch((err) => {
        console.log(err);
      })
    },
    postQuestion(){
      let userid = window.localStorage.getItem('user')
      let self = this
      axios.post('http://localhost:3000/thread/'+userid,{
        title: self.question.title,
        content: self.question.content
      },
      {headers: {'token': window.localStorage.getItem('token')}})
      .then(res => {
        location.reload()
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      })
    }
  },
  mounted() {
    if(window.localStorage.getItem('token')){
      this.getThread()
    } else {
      location.href = '/#/'
    }
  }
}
</script>

<style lang="css">
  .container {
    max-width: 90%;
  }
  .voting{
    max-width: 10%;
    display: block;
    text-align: center;
    padding-top: 10px;
    padding-right: 15px
  }
  .vote{
    text-align: center;
  }
  .mypostcell{
    padding-top: 10px;
    width: 100%;
    max-width: 100%;
  }

  .mypost-footer{
    text-align: center;
  }

  .mypost-text{
    text-align: justify;
  }

  .new-question {
    text-align: center;
  }

  .myclearence{
    padding: 10px 0px
  }

  .myanswerHeader{
    display: inline-block;
  }

  .table-question{
    width: 90%;
    max-width: 90%;
  }

  .table-answer{
    width: 10%;
    max-width: 10;
  }
</style>
