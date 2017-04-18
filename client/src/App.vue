<template>
  <div id="app">
    <div class="layout">
        <Menu mode="horizontal" active-name="1">
            <div class="layout-logo">Hacktivoverflow</div>
            <div class="layout-nav">
                <Menu-item name="1">

                </Menu-item>
            </div>

        </Menu>
        <div class="layout-header">
          <el-row :gutter="20">
              <el-col :span="3">
                <div v-if="isLogin == true">
                    <router-link to="/questions/ask"><el-button type="primary">Ask Question</el-button></router-link>
                </div>
                <div v-else>
                    <el-button type="primary" @click="notLogin">Ask Question</el-button>
                </div>
              </el-col>
                        <el-col :span="2">
              <router-link to="/questions">
                <el-button
               @click="openFullScreen"
               v-loading.fullscreen.lock="fullscreenLoading">
               Question
              </el-button>
              </router-link>
            </el-col>

        <el-col :span="15">
          <el-input
          placeholder="Search Question"
          icon="search"
          v-model="search"
          >
          <el-button slot="append" icon="search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="4">
        <el-button v-if="isLogin == true" type="primary" @click="signOut">Logout</el-button>
        <router-link v-else to="/users/signin"><el-button type="primary" >Signin / Signup</el-button></router-link>
      </el-col>

      </el-row>
    </div>


    </div>
    <el-row>
    <router-view
    @ifExist="ifExist"
    @updatedQuestion="updateListQuestions"
    @loaded="getQuestions"
    :questions="questions"/>
    <el-col v-if="isLogin == true" :span="4" style="position:fixed; top:50%; right:5%;"><me-card :username="'tess'"></me-card></el-col>
  </el-row>


  </div>
</template>

<script>
import {Menu, Breadcrumb} from 'iview'
import MeCard from './components/MeCard.vue'
export default {
  data(){
    return {
      search : '',
      isLogin : false,
      questions : [],
      fullscreenLoading: false,
      username : ''
    }
  },
  components : {
    MeCard
  },
  methods : {
    getQuestions(){
      var self = this
      self.questions = []
      axios.get('http://localhost:3000/questions')
      .then(function (response) {
        if (response.data.success == true){
          self.questions = response.data.questions
          console.log(self.questions);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    updateListQuestions(newQuestion) {
      console.log('question baru ', newQuestion);
      return this.questions.push(newQuestion);
    },
    search(){
      console.log('search');
    },
    ifExist(username){
      if (localStorage.getItem("token") === null) {
          this.isLogin = false
          this.username = username
      }else {
          this.isLogin = true
      }
    },
    signOut(){
				window.localStorage.removeItem('token')
        this.isLogin = false
        this.ifExist()

		},
    openFullScreen() {
        this.fullscreenLoading = true;
        setTimeout(() => {
          this.fullscreenLoading = false;
        }, 1500);
      },
    notLogin() {
      this.$notify.error({
        title: 'Error',
        message: 'You must login'
      });
    }
  },
  mounted(){
    this.ifExist()
  }
}
</script>
<style scoped>
    .layout{
        border: 1px solid #d7dde4;
        background: #fafafa;
    }
    .layout-logo{
        width: 140px;
        height: 30px;
        border-radius: 3px;
        float: left;
        position: relative;
        top: 3px;
        left: 20px;
        font-size: 25px;
        color: #ff6f00;
    }
    .layout-search{
      width: 110px;
      height: 30px;
      border-radius: 3px;
      float: left;
      position: relative;
      top: 15px;
      left: 20px;
    }
    .layout-nav{
        width: 420px;
        margin: 0 auto;
    }
    .layout-assistant{
        width: 300px;
        margin: 0 auto;
        height: inherit;
    }
    .layout-breadcrumb{
        padding: 10px 15px 0;
    }
    .layout-content{
        min-height: 200px;
        margin: 15px;
        overflow: hidden;
        background: #fff;
        border-radius: 4px;
    }
    .layout-content-main{
        padding: 10px;
    }
    .layout-copy{
        text-align: center;
        padding: 10px 0 20px;
        color: #9ea7b4;
    }

    .layout-header {
    height: 60px;
    background: #fff;
    box-shadow: 0 1px 1px rgba(0,0,0,.1);
    padding: 10px 0px 10px 10px;
    }
</style>
