<template lang="html">
  <request-edit-partial
    :title="Title"
    :content="Content"
    :id="ID"
  ></request-edit-partial>
</template>

<script>
import Resources from '../../utils/resources';
import RequestEditPartial from './RequestEditPartial.vue';

export default {
  data() {
    return {
      Title: '',
      Content: '',
      ID: '',
    };
  },
  events: {
    'on-save': function(Title, Content, ID) {
      Resources.request.put({
        data: JSON.stringify({ Title, Content, ID }),
        redirect: '/requests/view/' + ID,
      });
    },
  },
  route: {
    data({ to: {params: { id } } }) {
      return Resources.request
      .get({ id: id })
      .then(result => ({
        Title: result.Title,
        Content: result.Content,
        ID: result.ID,
      }));
    },
  },
  components: {
    RequestEditPartial,
  },
}
</script>
