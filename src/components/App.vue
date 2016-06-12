<template>
  <navbar :is-logged="sharedState"></navbar>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-12">
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from './Navbar.vue';
import store from '../vuex/store';

export default {
  data() { return { }; },
  components: {
    Navbar,
  },
  store,
}
</script>
