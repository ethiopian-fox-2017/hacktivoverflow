<template lang="html">
  <!-- pertanyaan -->
  <div class="myquestion">
    <table class="table">
      <tr>
        <td class="voting">
          <div class="vote">
            <a class="glyphicon glyphicon-chevron-up" href=""></a>
            <span itemprop="upvoteCount" class="vote-count-post ">10</span>
            <a class="glyphicon glyphicon-chevron-down" href=""></a>
          </div>
        </td>
        <td class="mypostcell">
          <div class="mypost-text">
            <p>{{ thread.content }}</p>
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
                  <td>{{ thread.author[0].username }}</td>
                  <td>{{ thread.created_at }}</td>
                  <td>{{ thread.update_at }}</td>
                </tr>
              </tbody>
            </table>
            <button type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#answer">
              Answer
            </button>
            <button type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#answer">
              Update
            </button>
            <button type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#answer">
              Delete
            </button>
          </div>
        </td>
      </tr>
    </table>
  </div>
  <!-- pertanyaan -->
</template>

<script>
export default {
}
</script>

<style lang="css">
</style>
