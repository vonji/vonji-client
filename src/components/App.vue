<template>
  <topbar></topbar>
    <div class="container">
        <a v-link="'/'">HOME</a>
        <router-view>
        </router-view>
        <br/>
        <a v-link="'/users/add'">User add</a>
        <a v-link="'/users/list'">User list</a>
        <br>
        <a v-link="'/requests'">Requests list</a>
        <a v-link="'/requests/add'">Request add</a>
        <br>
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
