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
                <textarea class="form-control" rows="5" id="myAnswer" placeholder="Write here..."></textarea>
              </div>
              <button type="submit" class="btn btn-success">Post Answer</button>
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
            <h4 class="modal-title" id="myModalLabel">New Answer</h4>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label for="myAnswer">Answer</label>
                <textarea class="form-control" rows="5" id="myAnswer" placeholder="Write here..."></textarea>
              </div>
              <button type="submit" class="btn btn-success">Post Answer</button>
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
              <button type="submit" class="btn btn-success" data-dismiss="modal" @click="updateThread">Post Question</button>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
    <!-- modal updateQuestion -->
    <div v-for="thread in threads">
    <div class="myquestionHeader">
      <h2>{{ thread.title }}</h2>
    </div>
    <!-- pertanyaan -->
    <Question @update="update" :thread='thread'></Question>
    <!-- pertanyaan -->
    <div class="myanswerHeader">
      <h3>JAWABAN ({{ thread.answers.length }})</h3>
    </div>
    <!-- jawaban -->
    <Answer :answers='thread.answers'></Answer>
    <!-- jawaban -->
    </div>
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
      updThread: {
        _id:'',
        title: '',
        content: ''
      }
    }
  },
  methods:{
    update(thread){
      this.updThread = thread;
    },
    updateThread(){
      let self = this
      let threadId = self.updThread._id
      console.log(threadId);
      axios.put('http://localhost:3000/thread/'+threadId,{
        title: self.updThread.title,
        content: self.updThread.content
      },
      {headers: {'token': window.localStorage.getItem('token')}})
      .then(res => {
        location.href='/#/index'
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      })
    }
  }
}
</script>

<style lang="css">
</style>
