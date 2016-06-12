import Vue from 'vue';
import App from './components/App.vue';

global.jQuery = require('jquery');
require('bootstrap-loader');

new Vue({
  el: 'body',
  components: {
    app: App,
  },
});
