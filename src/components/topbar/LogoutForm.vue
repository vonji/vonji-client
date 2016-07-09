<template>
    <button @click="logout()" class="btn btn-default">Logout</button>
</template>

<script>
    import * as actions from '../../vuex/actions';

    export default {
        data() {
            return {};
        },
        vuex: {
            actions
        }
    }
</script>
