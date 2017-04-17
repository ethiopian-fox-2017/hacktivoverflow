<template>
<div class="">
  <el-row :gutter="20">
    <el-col :span="8">
    </el-col>
<el-col :span="16">
  <my-question v-for="question in questions" :question="question" @changeMyList="getData"></my-question>
</el-col>
</el-row>
</div>

</template>

<script>
import MyQuestion from './MyQuestion.vue'
export default {
  data(){
    return {
      profile : {
        username : ''
      },
      questions : []
    }
  },
  components :{
    MyQuestion
  },
  methods : {
    getData(){
      var self = this
      self.questions = [];
      axios.get(`http://localhost:3000/profile/`+window.localStorage.getItem('token'))
        .then(response => {
          self.questions = response.data.user.questions
          console.log(self.questions);
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  mounted(){
    if (window.localStorage.getItem('token') == null){
        this.$router.push({path : '/'})
    }
    else{
        this.getData()
    }

    }
  }

</script>

<style lang="css">
</style>
