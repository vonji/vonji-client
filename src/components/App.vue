<template>
    <div class="container alert-container" style="z-index: 10">
        <alerts></alerts>
    </div>
    <div class="container">
        <topbar></topbar>
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
    import Alerts from './Alerts.vue'

    import * as actions from '../vuex/actions'

    export default {
        name: 'App',
        store: store,
        components: {
            Topbar,
            Alerts
        },
        actions//
    }
</script>

<style>
    .alert-container {
        position: fixed;
        top: 0;
    }
</style>