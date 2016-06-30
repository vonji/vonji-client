<template xmlns:v-on="http://www.w3.org/1999/xhtml">
  <request-edit-partial
    :title="Title"
    :content="Content"
  ></request-edit-partial>
</template>

<script type="text/babel">
import Resources from '../../utils/resources'

export default {
  data() {
    return {
      Title: '',
      Content: '',
    };
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
