<template lang="html">
  <bs-navbar brand-name="Vonji" link="'/'">
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
