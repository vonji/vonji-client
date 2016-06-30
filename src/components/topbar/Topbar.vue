<template lang="html">
  <navbar brand-name="Vonji" link="'/'">
    <login-form v-if="isGuest"></login-form>
    <logout-form v-else></logout-form>
  </navbar>
</template>

<script type="text/babel">
    import LoginForm from './LoginForm.vue';
    import LogoutForm from './LogoutForm.vue';
    import Navbar from '../bootstrap/Navbar.vue';

    export default {
        data() {
            return {};
        },
        components: {
            Navbar,
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
