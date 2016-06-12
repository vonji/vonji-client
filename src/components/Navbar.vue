<template lang="html">
  <nav class="navbar navbar-default">
    <div class="container-fluid">
      <!-- Brand and toggle get grouped for better mobile display -->
      <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
          <span class="sr-only">Toggle navigation</span>
        </button>
        <a class="navbar-brand" href="#">Vonji</a>
      </div>

      <!-- Collect the nav links, forms, and other content for toggling -->
      <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <div class="navbar-form navbar-right" role="login">
            <login-form v-if="isGuest"></login-form>
            <logout-form v-else></logout-form>
        </div>
      </div><!-- /.navbar-collapse -->
    </div><!-- /.container-fluid -->
  </nav>
</template>

<script>
import LoginForm from './LoginForm.vue';
import LogoutForm from './LogoutForm.vue';

export default {
  data() { return { }; },
  components: {
    LoginForm,
    LogoutForm,
  },
  vuex: {
    getters: {
      isGuest: state => !(state.user !== undefined && state.user !== ''),
    },
  },
}
</script>

<style lang="css">
</style>
