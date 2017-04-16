<template lang="html">
  <div class="col-xs-9">
    <!-- modal answer -->
    <div class="modal fade" id="answer" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title" id="myModalLabel">New Answer</h4>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label for="myAnswer">Answer</label>
                <textarea class="form-control" rows="5" id="myAnswer" v-model="answer.content" placeholder="Write here..."></textarea>
              </div>
              <button type="submit" class="btn btn-success" data-dismiss="modal" @click='postAnswer'>Post Answer</button>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
    <!-- modal answer -->
    <!-- modal updateAnswer -->
    <div class="modal fade" id="updateAnswer" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title" id="myModalLabel">Update Answer</h4>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label for="myAnswer">Answer</label>
                <textarea class="form-control" rows="5" id="myAnswer" v-model="updAnswer.content" placeholder="Write here..."></textarea>
              </div>
              <button type="submit" class="btn btn-success" data-dismiss="modal" @click="postUpdateAnswer">Post Answer</button>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
    <!-- modal updateAnswer -->
    <!-- modal updateQuestion -->
    <div class="modal fade" id="updateQuestion" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title" id="myModalLabel">Update Question</h4>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label for="myTitle">Title</label>
                <input type="text" class="form-control" id="myTitle" v-model="updThread.title" placeholder="Write here...">
              </div>
              <div class="form-group">
                <label for="myQuestion">Question</label>
                <textarea class="form-control" rows="5" id="myQuestion" v-model="updThread.content" placeholder="Write here..."></textarea>
              </div>
              <button type="submit" class="btn btn-success" data-dismiss="modal" @click="postUpdateThread">Post Question</button>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
    <!-- modal updateQuestion -->
    <div v-if="showOne == false">
      <table>
        <tbody>
          <tr>
            <th>Pertanyaan</th>
            <th>Jawaban</th>
          </tr>
          <tr v-for="thread in threads">
            <td class='table-question'><a href="#/index" @click="detail(thread)" ><p>{{ thread.title }}</p></a></td>
            <td class='table-answer'><p>{{ thread.answers.length }}</p></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="showOne == true">
      <button type="button" class="btn btn-success btn-sm" @click='list()'>Hide</button>
      <div class="myquestionHeader">
        <h2>{{ oneThread.title }}</h2>
      </div>
      <!-- pertanyaan -->
      <Question  @update="update" :thread='oneThread'></Question>
      <!-- pertanyaan -->
      <div class="myanswerHeader">
        <h4>Jawaban ({{ oneThread.answers.length }})</h4>
      </div>
      <!-- jawaban -->
      <Answer @updateAnswer="updateAnswer" :answers='oneThread.answers'></Answer>
      <!-- jawaban -->
      <div class="myclearence"></div>
    </div>
    <div class="myclearence"></div>
  </div>
</template>

<script>
import Question from './Question';
import Answer from './Answer'
import axios from 'axios';
export default {
  components:{
    Question,
    Answer
  },
  props:['threads'],
  data(){
    return {
      updThread: '',
      answer:{
        content:''
      },
      updAnswer:'',
      oneThread:'',
      showOne: false
    }
  }
  ,
  methods:{
    update(thread){
      this.updThread = thread;
    },
    updateAnswer(answer){
      this.updAnswer = answer
      console.log(this.updAnswer.content);
    },
    postUpdateThread(){
      let self = this
      let threadId = self.updThread._id
      console.log(threadId);
      axios.put('http://localhost:3000/thread/'+threadId,{
        title: self.updThread.title,
        content: self.updThread.content
      },
      {headers: {'token': window.localStorage.getItem('token')}})
      .then(res => {
        location.reload()
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      })
    },
    postAnswer(){
      let self = this
      let threadId = self.updThread._id
      let userId = window.localStorage.getItem('user')
      axios.post(`http://localhost:3000/answer/${userId}/${threadId}`,{
        content: self.answer.content
      },
      {headers: {'token': window.localStorage.getItem('token')}})
      .then(res => {
        location.reload()
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      })
    },
    postUpdateAnswer(){
      let self = this
      let answerId = self.updAnswer._id
      console.log(answerId);
      console.log(self.updAnswer.content);
      axios.put('http://localhost:3000/answer/'+answerId,{
        content: self.updAnswer.content
      },
      {headers: {'token': window.localStorage.getItem('token')}})
      .then(res => {
        location.reload()
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      })
    },
    detail(thread){
      this.oneThread = thread;
      this.showOne = true;
    },
    list(){
      this.showOne = false;
      this.oneThread = '';
    }
  }
}
</script>

<style lang="css">
</style>
