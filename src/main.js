import Vue from 'vue';
import Router from 'vue-router';
import Resource from 'vue-resource'
import App from './components/App.vue';

import Navbar from './components/Navbar.vue'

import UserAdd from './components/users/UserAdd.vue'
import UserList from './components/users/UserList.vue'

import Request from './components/requests/Request.vue'

global.jQuery = require('jquery');
require('bootstrap-loader');

Vue.use(Router);
Vue.use(Resource);

Vue.http.options.root = 'http://localhost:1618/';

let router = new Router();

router.map({
    '/users/add': {
        component: UserAdd
    },
    '/users/list': {
        component: UserList
    },
    '/requests/:id': {
        component: Request
    }
});

router.start(App, '#app');
