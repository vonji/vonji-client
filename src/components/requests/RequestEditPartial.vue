<template xmlns:v-on="http://www.w3.org/1999/xhtml">
  <div class="form">
    <div class="form-group">
      <label for="#{{ id }}-request-title">Request title</label>
      <input
        type="text" id="{{ id }}-request-title"
        v-model="title"
        class="form-control"
        placeholder="Title of your request..."
      />
    </div>
    <div class="form-group">
      <label for="#{{ id }}-request-content">Description of your task</label>
      <textarea
        id="{{ id }}-request-content"
        rows="10"
        v-model="content"
        class="form-control"
        placeholder="Describe your request..."
      ></textarea>
    </div>
    <button @click="save" class="btn btn-primary btn-block btn-lg">Save</button>
  </div>
</template>

<script type="text/babel">
export default {
  props: ['title', 'content', 'id'],
  methods: {
    save() {
      this.$dispatch('on-save', this.title, this.content, this.id);
    }
  }
}
</script>

<style>
textarea {
  resize: vertical;
}
</style>
