<template>
  <!--<navbar :is-logged="sharedState"></navbar>-->
  <div class="container-fluid">
    <a v-link="'/'">HOME</a>
    <router-view>
    </router-view>
    <br/>
    <a v-link="'/users/add'">User Add</a>
    <a v-link="'/users/list'">User List</a>
  </div>
</template>
