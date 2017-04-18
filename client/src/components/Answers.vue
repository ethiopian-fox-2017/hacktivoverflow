<template>
  <el-col :span="14" :offset="2">
    <el-tabs type="card">
      <el-tab-pane label="votes" />
    </el-tabs>
    <h3>Answers : </h3>
    <Answer
      v-for="(answer,index) in answernya"
      :answer="answer"
      key="index">
    </Answer>
  </el-col>
</template>

<script>
import Answer from './Answer.vue'

export default {
  props: ['answernya','questionsnya'],
  data() {
    return {

    }
  },
  components: {
    Answer
  },
  mounted(){
    console.log('dari sisi answer',this.answernya[0]);
  }
}
</script>

<style scoped>
  .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  .clearfix:after {
      clear: both
  }

  .box-card {
    width: 480px;
  }
</style>
