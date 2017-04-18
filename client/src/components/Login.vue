<template>
  <el-row :gutter="20" style="margin-top:20px;">

    <el-col :span="12" :offset="6">

      <div class="grid-content">
        <h1 style="font-size:34px; margin-left:45px; margin-bottom:40px;">Login With your Account!</h1>
        <el-form ref="form" :model="form" label-width="120px">
          <el-form-item label="Username">
            <el-input v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item label="Password">
            <el-input v-model="form.password" type="password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">Sign In</el-button>
            <el-button>Cancel</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      form: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    onSubmit() {
      let self = this
      axios.post('http://localhost:3000/users/login', {
        username: self.form.username,
        password: self.form.password
      })
        .then(response => {
          if (response.data.success == true){
            console.log(response.data)
            localStorage.setItem('token', response.data.token);
            this.$message('Login Sukses');
            self.$router.push('/')
            this.$emit('ifExist',self.form.username)
          }else {
            console.log('login');
            this.$message.error('Login gagal');
          }

        })
        .catch(error => {
          alert('error, see console')
          console.log(error)
        })
    }
  },
  created() {
    //
  }
}
</script>

<style>
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
