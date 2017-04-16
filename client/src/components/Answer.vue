<template lang="html">
  <!-- jawaban -->
  <div class="myanswer">
    <div v-for='answer in answers'>
      <table class="table">
        <tr>
          <td class="voting">
            <div class="vote">
              <a class="glyphicon glyphicon-chevron-up" href="#" @click='voteUp(answer)'></a>
              <span itemprop="upvoteCount" class="vote-count-post ">{{ vote = answer.upvote.length - answer.downvote.length }}</span>
              <a class="glyphicon glyphicon-chevron-down" href="#" @click='voteDown(answer)'></a>
            </div>
          </td>
          <td class="mypostcell">
            <div class="mypost-text">
              <p>{{ answer.content }}</p>
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
                    <td>{{ answer.author[0].username }}</td>
                    <td>{{ new Date(answer.createdAt).toLocaleString() }}</td>
                    <td>{{ new Date(answer.updatedAt).toLocaleString() }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </td>
        </tr>
      </table>
      <button v-if="answer.author[0]._id == user.id" type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#updateAnswer" @click='updateAnswer(answer)'>Update</button>
      <button v-if="answer.author[0]._id == user.id" type="button" class="btn btn-danger btn-sm" @click='delAnswer(answer)'>Delete</button>
    </div>
  </div>
  <!-- jawaban -->
</template>

<script>
import axios from 'axios'
export default {
  props:['answers'],
  data(){
    return {
      user:{
        id: window.localStorage.getItem('user')
      }
    }
  },
  methods:{
    updateAnswer(answer){
      this.$emit('updateAnswer',answer)
    },
    delAnswer(answer){
      var result = confirm("Want to delete?");
      if (result) {
        axios.delete('http://localhost:3000/answer/'+answer._id,{headers: {'token': window.localStorage.getItem('token')}})
        .then(res => {
          location.reload()
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        })
      }
    },
    voteUp(answer){
      let userId = window.localStorage.getItem('user')
      axios.patch(`http://localhost:3000/answer/${answer._id}/upvote/${userId}`,{},{headers: {'token': window.localStorage.getItem('token')}})
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
    voteDown(answer){
      let userId = window.localStorage.getItem('user')
      axios.patch(`http://localhost:3000/answer/${answer._id}/downvote/${userId}`,{},{headers: {'token': window.localStorage.getItem('token')}})
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
