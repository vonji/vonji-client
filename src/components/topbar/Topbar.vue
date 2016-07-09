<template lang="html">
    <nav class="navbar navbar-default">
        <div>
            <div class="navbar-header">
                <a v-link="'/'" class="navbar-brand">Vonji</a>
            </div>

            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <div class="navbar-form navbar-right" role="login">
                    <login-form v-if="isGuest"></login-form>
                    <logout-form v-else></logout-form>
                </div>
            </div>
        </div>
    </nav>
</template>

<script type="text/babel">
    import LoginForm from './LoginForm.vue';
    import LogoutForm from './LogoutForm.vue';

    export default {
        data() {
            return {};
        },
        components: {
            LoginForm,
            LogoutForm
        },
        vuex: {
            getters: {
                isGuest: state => !state.user
            }
        }
    }
</script>
