<template xmlns:v-on="http://www.w3.org/1999/xhtml">
  <div class="row">
    <div class="col-md-8 col-md-offset-2">
      <div class="form">
        <div class="form-group">
          <label for="#request-title">Request title</label>
          <input
            type="text" id="request-title"
            class="form-control"
            v-model="request.Title"
            placeholder="Title of your request..."
          />
        </div>
        <div class="form-group">
          <label for="#request-content">Description of your task</label>
          <textarea
            id="request-content"
            rows="10"
            class="form-control"
            v-model="request.Content"
            placeholder="Describe your request..."
          ></textarea>
        </div>
        <button @click="save" class="btn btn-primary btn-block btn-lg">Post request</button>
      </div>
    </div>
  </div>
</template>

<script type="text/babel">

    import Resources from '../../utils/resources'

    export default {
        data() {
            return {
                request: {}
            };
        },
        methods: {
            save: function () {
                Resources.request.post({
                    data: JSON.stringify(this.request),
                    redirect: '/requests'
                });
            }
        }
    }
</script>

<style>
  textarea {
    resize: vertical;
  }
</style>
