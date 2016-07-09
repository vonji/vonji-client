<template>
    <div class="user-info">
        <div>Responded 2s ago</div>
        <img src="https://placehold.it/50x50" alt="avatar">
        {{user.FirstName}}
    </div>
</template>

<script>
    export default {
        data() {
            return {}
        },
        props: ['user']
    }
</script>

<style>
    .user-info {
        background-color: blanchedalmond;
        height: 100px;
    }
</style>