<template xmlns:v-on="http://www.w3.org/1999/xhtml">
  <div class="row">
    <div class="col-md-8 col-md-offset-2">
      <request-edit-partial
        :title="Title"
        :content="Content"
      ></request-edit-partial>
    </div>
  </div>
</template>

<script type="text/babel">
import Resources from '../../utils/resources'
import RequestEditPartial from './RequestEditPartial.vue';

export default {
  data() {
    return {
      Title: '',
      Content: '',
    };
  },
  components: {
    RequestEditPartial,
  },
  events: {
    'on-save': function (Title, Content) {
      Resources.request.post({
        data: JSON.stringify({ Title, Content }),
        redirect: '/requests'
      });
    },
  },
}
</script>
