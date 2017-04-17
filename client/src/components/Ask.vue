
<template lang="html">
<div class="">
  <el-row :gutter="20">
  <el-col :span="12" :offset="6">
    <div class="grid-content bg-purple">
      <h5>Ask Question</h5>
      <el-form label-width="120px">
      <el-form-item label="Title">
        <el-input v-model="titleInput"></el-input>
      </el-form-item>
      <el-form-item label="Question">
        <el-input type="textarea" v-model="questionInput"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="postQuestion">Post Your Question</el-button>
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
  data(){
    return {
      titleInput: '',
      questionInput: ''
    }
  },
  methods: {
    postQuestion(){
      let self = this;
      axios.post('http://localhost:3000/questions', {
        title   : self.titleInput,
        post    : self.questionInput
      },{headers: {'token': window.localStorage.getItem('token')}})
      .then((res) => {
        if (res.data.success){
             this.$message('Your question is post on Flashoverflow');
             console.log('ayo ',res.data);
             this.$emit('updatedQuestion', res.data.question)
             self.$router.push('/questions')
             self.titleInput = ''
             self.questionInput = ''
        }else {
            this.$message.error('Oops, sepertinya ada yang salah');
        }
      })
      .catch((err) => {
        console.log(err);
        this.$message.error('Oops, sepertinya ada yang salah');
      })
    }
  }
}
</script>

<style lang="css">
</style>
