<template lang="html">
  <!-- sidebar -->
  <div class="col-xs-3">
    <div class="new-question">
      <button type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#question">
        New Question
      </button>
    </div><br>
    <div class="sidebar" v-for="thread in threads">
      <a href="#">{{ thread.title }}</a>
    </div>
  </div>
  <!-- sidebar -->
</template>

<script>
export default {
  props:['threads']
}
</script>

<style lang="css">
</style>
