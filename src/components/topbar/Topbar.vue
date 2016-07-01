<template lang="html">
  <bs-navbar brand-name="Vonji" link="'/'">
    <ul class="nav navbar-nav">
      <li><a v-link="'/users/list'">User list</a></li>
      <li><a v-link="'/requests'">Requests list</a></li>
      <li><a v-link="'/requests/add'">Request add</a></li>
    </ul>
    <login-form v-if="isGuest"></login-form>
    <logout-form v-else></logout-form>
  </bs-navbar>
</template>

<script type="text/babel">
    import LoginForm from './LoginForm.vue';
    import LogoutForm from './LogoutForm.vue';
    import BsNavbar from '../bootstrap/BsNavbar.vue';

    export default {
        data() {
            return {};
        },
        components: {
            BsNavbar,
            LoginForm,
            LogoutForm,
        },
        vuex: {
            getters: {
                isGuest: state => !state.user
            }
        }
    }
</script>
