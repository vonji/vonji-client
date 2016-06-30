<template lang="html">
  <div class="page-header">
    <h1>{{ title }} <small>{{ subText }}</small></h1>
  </div>
</template>

<script>
export default {
  props: ['title', 'subText'],
}
</script>
