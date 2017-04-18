<template>
  <el-row>
    <el-row :gutter="20">
      <el-col :span="4">
        <div class="vote">
          <a @click="votenya(1)"><i class="el-icon-caret-top"></i></a>
          <span style="line-height: 36px; font-size:32px;">{{totalVote}}</span>
          <a @click="votenya(-1)"><i class="el-icon-caret-bottom"></i></a>
          <a href="#"><i class="el-icon-check"></i></a>
        </div>
      </el-col>

      <el-col :span="20">
        <div class="grid-content bg-purple">
          <h3>{{answer.answer}}</h3>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="10" :offset="14">
        <div class="grid-content bg-purple">
          <h5 style="font-size:12px;">User : {{answer.user.username}}</h5>
        </div>
      </el-col>
    </el-row>
  </el-row>
</template>

<script>
export default {
  props: ['answer'],
  data() {
    return  {
      vote : 0
    }
  },
  computed : {
      totalVote : function(){
        console.log('ini votes',this.answer.votes);
        return this.answer.votes.reduce((total,value) => total + value.number,0) + this.vote
      }
  },
  methods: {
    vote(number) {

    },
    votenya(number){
      let id = this.$route.params.id
      var self = this
      var numbernya = number
      console.log('jalan');

      axios.post(`http://localhost:3000/questions/${id}/answers/votes`, {
        answer: self.answer._id,
        number,
      },{headers: {'token': window.localStorage.getItem('token')}})
        .then(response => {
          console.log(response.data)
          if (response.data.success){
            self.vote += numbernya
            if (numbernya == 1){
              this.$message('You give Upvote for this question');
            }else {
              this.$message('You give Downvote for this question');
            }
          }else {
            this.$notify({
              title: 'Warning',
              message: 'Youre Already vote this answer',
              type: 'warning'
            });
          }
        })
        .catch(error => {
          this.$message({
            message: 'Something wrong',
            type: 'warning'
          });
          console.log(error)
        })
    }
  },
  mounted(){

  }
}
</script>

<style>

</style>
