import Vue from 'vue';
import Router from 'vue-router';
import Resource from 'vue-resource'

import App from './components/App.vue';

import UserAdd from './components/users/UserAdd.vue'
import UserList from './components/users/UserList.vue'

import Request from './components/requests/Request.vue'
import RequestAdd from './components/requests/RequestAdd.vue'
import RequestEdit from './components/requests/RequestEdit.vue'
import RequestList from './components/requests/RequestList.vue'
import ResponseEdit from './components/requests/ResponseEdit.vue'
import moment from 'moment';

global.jQuery = require('jquery');
require('bootstrap-loader');

Vue.filter('fromNow', input => {
	return moment(input).fromNow();
})

Vue.use(Router);
Vue.use(Resource);

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

export { router };
