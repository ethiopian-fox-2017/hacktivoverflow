<template lang="html">
  <!-- pertanyaan -->
  <div class="myquestion">
    <table class="table">
      <tr>
        <td class="voting">
          <div class="vote">
            <a class="glyphicon glyphicon-chevron-up" href=""></a>
            <span itemprop="upvoteCount" class="vote-count-post ">10</span>
            <a class="glyphicon glyphicon-chevron-down" href=""></a>
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
                  <td>{{ new Date(thread.created_at).toLocaleString() }}</td>
                  <td>{{ new Date(thread.created_at).toLocaleString() }}</td>
                </tr>
              </tbody>
            </table>
            <button type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#answer" @click='answer(thread)'>Answer</button>
            <button type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#updateQuestion" @click='update(thread)'>Update</button>
            <button type="button" class="btn btn-primary btn-lg" @click="delThread(thread)">Delete</button>
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
  methods:{
    update(thread){
      this.$emit('update',thread)
    },
    answer(thread){

    },
    delThread(thread){
      axios.delete('http://localhost:3000/thread/'+thread._id,{headers: {'token': window.localStorage.getItem('token')}})
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

<style lang="css" scoped>

</style>
