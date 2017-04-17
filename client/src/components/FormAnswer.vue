<template lang="html">
<div class="">
  <el-row :gutter="20">
  <el-col :span="12" :offset="6">
    <div class="grid-content bg-purple">
      <h5 style="font-size:30px; margin-left : 120px;">Give Your Answer</h5>
      <el-form label-width="120px">
      <el-form-item label="Title">
        <el-input v-model="answer"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="postAnswer">Post Your Answer</el-button>
      </el-form-item>
      </el-form>
    </div>
  </el-col>
  </el-row>

</div>
</template>

<script>
import axios from 'axios'

export default {
  props : ['id'],
  data(){
    return {
      answer : ''
    }
  },
  methods :{
    postAnswer(){
      var self = this
      axios.post('http://localhost:3000/questions/'+this.id+'/answers', {
        answer    : self.answer
      },{headers: {'token': window.localStorage.getItem('token')}})
      .then((res) => {
        if (res.data.success){
             this.$message('Your question is post on Answer');
             console.log('ayo ',res.data);

        }else {
            this.$message.error('Oops, sepertinya ada yang salah');
        }
      })
    }
  }
}
</script>
