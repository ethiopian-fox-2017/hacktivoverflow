<template>
<div style="margin-top:200px">
  <el-row :gutter="20">
  <el-col :span="12" :offset="6"><question-card v-for="question in questions" key="index" :question="question"></question-card></el-col>
</el-row>

</div>
</template>

<script>
import QuestionCard from './QuestionCard.vue'

export default {
  components : {
    QuestionCard
  },
  props: ['questions'],
  data(){
    return {
    }
  },
  methods : {

  },
  mounted(){
    this.$emit('loaded')
  }
}
</script>

<style lang="css">
</style>
