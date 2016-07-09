import Vue from 'vue';
import Router from 'vue-router';
import Resource from 'vue-resource'
import App from './components/App.vue';

import Navbar from './components/Navbar.vue'

import UserAdd from './components/users/UserAdd.vue'
import UserList from './components/users/UserList.vue'

import Request from './components/requests/Request.vue'
import RequestEdit from './components/requests/RequestEdit.vue'

global.jQuery = require('jquery');
require('bootstrap-loader');

Vue.use(Router);
Vue.use(Resource);

Vue.http.options.root = 'http://localhost:1618/';//TODO make this work

let router = new Router({
    hashbang: false
});

//TODO subrouter
router.map({
    '/users/add': {
        component: UserAdd
    },
    '/users/list': {
        component: UserList
    },
    '/requests/:id': {
        component: Request
    },
    '/requests/edit/:id': {
        component: RequestEdit
    }
});

router.start(App, '#app');
