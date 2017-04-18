<template>
  <div>
  <div style="background:#eee;padding: 20px">
      <Card :bordered="false">
          <h5 slot="title" style="font-size:24px; margin:10px;">{{question.title}}</h5>
          <a slot="extra">
            Answer
            <Badge :count="''+question.answers.length ">
                <Icon type="email" size="26"></Icon>
            </Badge>
            &nbsp;
            &nbsp;
            Created By {{question.author.username}}

          </a>


          <p>{{question.post}}</p>
          <br>
          <router-link :to="'/questions/'+question._id">
            <Button type="primary" shape="circle" icon="chevron-right">Details Question</Button>
          </router-link>

      </Card>




  </div>
</div>
</template>

<script>
import {Badge} from 'iview'

export default {
  props : ['title','post', 'question'],
  data(){
    return {
      page: 1,
      jawaban : 0
    }
  }
}
</script>



<style scoped>
    .demo-badge{
        width: 42px;
        height: 42px;
        background: #eee;
        border-radius: 6px;
        display: inline-block;
    }
</style>
