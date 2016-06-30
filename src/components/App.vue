<template>
  <div>
    <topbar></topbar>
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script type="text/babel">
    import store from './../vuex/store';

    import Topbar from './topbar/Topbar.vue'

    export default {
        name: 'App',
        store: store,
        components: {
            Topbar
        }
    }
</script>

<style type="scss">
</style>
