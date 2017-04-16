<template lang="html">
  <!-- pertanyaan -->
  <div class="myquestion">
    <table class="table">
      <tr>
        <td class="voting">
          <div class="vote">
            <a class="glyphicon glyphicon-chevron-up" href="#" @click='voteUp(thread)'></a>
            <span itemprop="upvoteCount" class="vote-count-post ">{{ vote = thread.upvote.length - thread.downvote.length }}</span>
            <a class="glyphicon glyphicon-chevron-down" href="#" @click='voteDown(thread)'></a>
          </div>
        </td>
        <td class="mypostcell">
          <div class="mypost-text">
            <p>{{ thread.content }}</p>
          </div>
          <div class="mypost-footer">
            <table class="table table-bordered">
              <tbody>
                <tr>
                  <td>created by:</td>
                  <td>created at:</td>
                  <td>updated at:</td>
                </tr>
                <tr>
                  <td>{{ thread.author[0].username }}</td>
                  <td>{{ new Date(thread.createdAt).toLocaleString() }}</td>
                  <td>{{ new Date(thread.updatedAt).toLocaleString() }}</td>
                </tr>
              </tbody>
            </table>
            <button v-if="thread.author[0]._id != user.id" type="button" class="btn btn-success btn-sm" data-toggle="modal" data-target="#answer" @click='update(thread)'>Answer</button>
            <button v-if="thread.author[0]._id == user.id" type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#updateQuestion" @click='update(thread)'>Update</button>
            <button v-if="thread.author[0]._id == user.id" type="button" class="btn btn-danger btn-sm" @click="delThread(thread)">Delete</button>
          </div>
        </td>
      </tr>
    </table>
  </div>
  <!-- pertanyaan -->
</template>

<script>
import axios from 'axios'
export default {
  props:['thread'],
  data(){
    return {
      user:{
        id: window.localStorage.getItem('user')
      }
    }
  },
  methods:{
    update(thread){
      this.$emit('update',thread);
    },
    delThread(thread){
      var result = confirm("Want to delete?");
      if (result) {
        axios.delete('http://localhost:3000/thread/'+thread._id,{headers: {'token': window.localStorage.getItem('token')}})
        .then(res => {
          location.reload()
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        })
      }
    },
    voteUp(thread){
      let userId = window.localStorage.getItem('user')
      axios.patch(`http://localhost:3000/thread/${thread._id}/upvote/${userId}`,{},{headers: {'token': window.localStorage.getItem('token')}})
      .then(res => {
        location.href='/#/index'
        if(res.data === false){
          alert('You have already voted this thread')
        }
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      })
    },
    voteDown(thread){
      let userId = window.localStorage.getItem('user')
      axios.patch(`http://localhost:3000/thread/${thread._id}/downvote/${userId}`,{},{headers: {'token': window.localStorage.getItem('token')}})
      .then(res => {
        location.href='/#/index'
        if(res.data === false){
          alert('You have already voted this thread')
        }
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      })
    }
  }
}
</script>

<style lang="css" scoped>

</style>
