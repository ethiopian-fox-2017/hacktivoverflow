<template>
  <div class="">
    <Card style="width:220px overflow:hidden;">
        <div style="text-align:center">
          <img style="width:45px; height:45px;" src="https://ukla.org/images/icons/user-icon.svg">
          <p slot="title">{{username}}</p>
            <router-link to="/profile">
              <el-button type="primary"
              @click="openFullScreen"
              v-loading.fullscreen.lock="fullscreenLoading">
              My Profile</el-button></router-link>
            <h3></h3>
        </div>
    </Card>
  </div>

</template>

<script>
import { Card } from 'iview'
export default {
  props: ['username'],
  data() {
   return {
     fullscreenLoading: false
   }
 },
 methods: {
   openFullScreen() {
     this.fullscreenLoading = true;
     setTimeout(() => {
       this.fullscreenLoading = false;
     }, 3000);
   }
 } 
}
</script>

<style lang="css">
</style>
