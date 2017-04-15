<template lang="html">
  <div>
    <!-- modal login -->
    <div class="modal fade" id="login" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title" id="myModalLabel">Don't have account? <a href="#" data-dismiss="modal" data-toggle="modal" data-target="#signup">Sign Up</a></h4>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label for="myUsername">Username</label>
                <input type="text" class="form-control" id="myUsername" v-model="datauser.username" placeholder="Username">
              </div>
              <div class="form-group">
                <label for="myPassword">Password</label>
                <input type="password" class="form-control" id="myPassword" v-model="datauser.password" placeholder="Password">
              </div>
              <button type="submit" class="btn btn-default" @click="login">Login</button>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
    <!-- modal login -->
    <!-- modal signup -->
    <div class="modal fade" id="signup" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title" id="myModalLabel">Your account informations</h4>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label for="myUsername">Username</label>
                <input type="text" class="form-control" id="myUsername" v-model="datauser.username" placeholder="Username">
              </div>
              <div class="form-group">
                <label for="myPassword">Password</label>
                <input type="password" class="form-control" id="myPassword" v-model="datauser.password" placeholder="Password">
              </div>
              <button type="submit" class="btn btn-default" @click="signUp">Sign Up</button>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
    <!-- modal signup -->
    <!-- navigasi -->
    <nav class="navbar navbar-inverse">
      <div class="container-fluid">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#">Hacktivoverflow</a>
        </div>
        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul class="nav navbar-nav navbar-right">
            <li v-if="isLogin == false"><a href="#" data-toggle="modal" data-target="#signup"><span class="glyphicon glyphicon-user"></span> Sign Up</a></li>
            <li v-if="isLogin == false"><a href="#" data-toggle="modal" data-target="#login"><span class="glyphicon glyphicon-log-in"></span> Login</a></li>
            <li v-if="isLogin == true"><a href="#">My Profile</a></li>
          </ul>
        </div><!-- /.navbar-collapse -->
      </div><!-- /.container-fluid -->
    </nav>
    <!-- navigasi -->
  </div>
</template>

<script>
import axios from "axios"
export default {
  data() {
    return {
      datauser:{
        username:'',
        password:''
      },
      isLogin: false
    }
  },
  methods:{
    signUp(){
      let self=this;
      axios.post('http://localhost:3000/signup',self.datauser)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        alert(err)
      })
    },
    login(){
      let self=this;
      axios.post('http://localhost:3000/signin',self.datauser)
      .then(res => {
        window.localStorage.setItem('token',res.data.token);
        window.localStorage.setItem('user',res.data.user._id);
        self.isLogin = res.data.isLogin
        location.href = '/#/index'
      })
      .catch(err => {
        alert(err)
      })
    }
  },
  mounted(){
    if(window.localStorage.getItem('token')){this.isLogin = true}
  }
}
</script>

<style lang="css">
</style>
