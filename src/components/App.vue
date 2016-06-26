<template>
    <!--<navbar :is-logged="sharedState"></navbar>-->
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
    </div>
</template>
