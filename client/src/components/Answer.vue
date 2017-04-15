<template lang="html">
  <!-- jawaban -->
  <div class="myanswer">
    <div v-for='answer in answers'>
      <table class="table">
        <tr>
          <td class="voting">
            <div class="vote">
              <a class="glyphicon glyphicon-chevron-up" href="#"></a>
              <span itemprop="upvoteCount" class="vote-count-post ">10</span>
              <a class="glyphicon glyphicon-chevron-down" href="#"></a>
            </div>
          </td>
          <td class="mypostcell">
            <div class="mypost-text">
              <p>{{ answer.content }}</p>
            </div>
            <div class="mypost-footer">
              <table class="table table-bordered">
                <tbody>
                  <tr>
                    <td>created by:</td>
                    <td>created at:</td>
                    <td>updated at:</td>
                  </tr>
                  <tr>
                    <td>{{ answer.author[0].username }}</td>
                    <td>{{ new Date(answer.created_at).toLocaleString() }}</td>
                    <td>{{ new Date(answer.updated_at).toLocaleString() }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </td>
        </tr>
      </table>
      <button type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#answer">
        Update
      </button>
      <button type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#answer">
        Delete
      </button>
    </div>
  </div>
  <!-- jawaban -->
</template>

<script>
export default {
  props:['answers']
}
</script>

<style lang="css" scoped>

</style>
