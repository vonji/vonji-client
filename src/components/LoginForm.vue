<template>
  <div class="form-group">
    <input @keyup.enter="submit" v-model="username" type="text" class="form-control" placeholder="Login">
  </div>
  <div class="form-group">
    <input @keyup.enter="submit" v-model="password" type="password" class="form-control" placeholder="Password">
  </div>
  <button
    disabled={{isDisabled}}
    @click="submit"
    class="btn {{buttonClass}}">
    Login
  </button>
</template>

<script>
  import { login } from '../vuex/actions';

  export default {
    data() {
      return { username: '', password: '' };
    },
    computed: {
      isDisabled() {
        return this.username === '' || this.password === '';
      },
      buttonClass() {
        return this.isDisabled ? 'btn-default' : 'btn-primary';
      }
    },
    vuex: {
      actions: {
        submit({ dispatch }, e) {
          login({ dispatch }, this.username, this.password);
        }
      }
    }
  }
</script>

<style lang="css">
</style>
