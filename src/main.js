import App from './components/App.vue';

import Vue from 'vue';
import VueRouter from 'vue-router';

import UserAdd from './components/users/UserAdd.vue';
import UserList from './components/users/UserList.vue';
import UserProfile from './components/users/UserProfile.vue';
import UserProfileEdit from './components/users/UserProfileEdit.vue';
import UserWelcome from './components/users/UserWelcome.vue';

import Request from './components/requests/Request.vue';
import RequestAdd from './components/requests/RequestAdd.vue';
import RequestEdit from './components/requests/RequestEdit.vue';
import RequestList from './components/requests/RequestList.vue';

import TagList from './components/tags/TagList.vue';

global.jQuery = require('jquery');
require('bootstrap-loader');

Vue.use(VueRouter);

const router = new VueRouter();

//TODO subrouter
router.map({
	'/': {
		component: RequestList
	},
	'/users/add': {
		component: UserAdd
	},
	'/users/list': {
		component: UserList
	},
	'/users/profile/view/:id': {
		component: UserProfile
	},
	'/users/profile/edit/:id': {
		component: UserProfileEdit
	},
	'/users/welcome': {
		component: UserWelcome
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
	'/tags/list': {
		component: TagList
	}
});

router.start(App, '#app');
