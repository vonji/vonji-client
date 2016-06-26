import Vue from 'vue';
import Router from 'vue-router';
import Resource from 'vue-resource'
import App from './components/App.vue';

import Navbar from './components/Navbar.vue'

import UserAdd from './components/users/UserAdd.vue'
import UserList from './components/users/UserList.vue'

import Request from './components/requests/Request.vue'
import RequestAdd from './components/requests/RequestAdd.vue'
import RequestEdit from './components/requests/RequestEdit.vue'
import RequestList from './components/requests/RequestList.vue'
import ResponseEdit from './components/requests/ResponseEdit.vue'


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
    '/requests': {
        component: RequestList
    },
    '/requests/add/': {
        component: RequestAdd
    },
    '/requests/edit/:id': {
        component: RequestEdit
    },
    '/requests/view/:id': {
        component: Request
    },
    '/responses/edit/:id': {//'requests/:requestId/responses/edit/:id'??
        component: ResponseEdit
    }
});

router.start(App, '#app');
