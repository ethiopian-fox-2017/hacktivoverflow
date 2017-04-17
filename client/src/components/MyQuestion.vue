<template lang="html">
  <div style="margin-top:30px; margin-left:50px;">
  <el-card class="box-card">

  <div slot="header" class="clearfix">
    <el-row>
      <el-col :span="18">
    <span style="line-height: 36px;"><h4 style="font-size:35px;">{{question.title}}</h4></span>
    <span style="line-height: 36px;"><h4 style="font-size:20px;">{{question.post}}</h4></span>
  </el-col>
    <el-col :span="6">
    <el-button  type="primary" icon="delete" @click="deleteQuestion(question._id)">Hapus</el-button>
    &nbsp;
    &nbsp;
    <el-button type="primary" icon="edit" @click="dialogFormVisible = true">Edit</el-button>
  </el-col>
  </el-row>
  </div>
  <div class="text item">
    <span style="line-height: 36px;">Created :<h4 style="font-size:15px;">{{question.createdAt}}</h4></span>
</div>
</el-card>

<el-dialog title="Edit Question" v-model="dialogFormVisible">
  <el-form :model="form">
    <el-form-item label="Title">
      <el-input v-model="form.title" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="Post" >
      <el-input v-model="form.post" auto-complete="off"></el-input>
    </el-form-item>

  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">Cancel</el-button>
    <el-button type="primary" @click="updateQuestion">Confirm</el-button>
  </span>
</el-dialog>
</div>

</template>

<script>
export default {
  props : ['question'],
  data(){
    return {
      form :{
          title : this.question.title,
          post : this.question.post,
          id : this.question._id
      },
      dialogFormVisible : false
    }
  },
  methods : {
    deleteQuestion(id){
      var self = this
      axios.get('http://localhost:3000/questions/'+id+'/delete',{
        headers : {
          token : window.localStorage.getItem('token')
        }
      })
      .then(function (response) {
        self.$message({
            message: 'Congrats, this is a success message.',
            type: 'success'
      })
      self.$emit('changeMyList')
      })
      .catch(function (error) {
          console.log(id);
          self.$message.error('Oops, sepertinya error'+error);
      });
    },
    updateQuestion(){
      var self = this
        axios.put('http://localhost:3000/questions/'+this.form.id,{
          title : self.form.title,
          post : self.form.post
        })
        .then((response) => {
          if (response.data.success == true){
            self.$message({
                message: 'Congrats, this is a success message.',
                type: 'success'
              })
              self.$emit('changeMyList')
          }else {
            self.$message.error('Oops, sepertinya error'+error);
          }
        })
        .catch((error) => {
          self.$message.error('Oops, sepertinya error'+error);
        })
    }
  }
}
</script>

<style lang="css">
</style>
