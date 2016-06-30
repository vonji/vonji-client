<template>
  <form class="navbar-form navbar-right" @submit.prevent="submit">
    <div class="form-group">
      <input v-model="email" type="email" class="form-control" placeholder="Login" />
    </div>
    <div class="form-group">
      <input v-model="password" type="password" class="form-control" placeholder="Password" />
    </div>
    <button type="submit" class="btn {{ isDisabled ? 'btn-default' : 'btn-primary' }}" disabled="{{ isDisabled }}">
      Login
    </button>
  </form>
</template>

<script>
    import {login} from '../../vuex/actions';

    export default {
        data() {
            return {
                email: '',
                password: ''
            };
        },
        computed: {
            isDisabled() {
                return this.email === '' || this.password === '';
            }
        },
        vuex: {
            actions: {
                submit({dispatch}, e) {
                    login({dispatch}, this.email, this.password);
                }
            }
        }
    }
</script>
