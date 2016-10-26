import App from './components/App.vue';

import Vue from 'vue';
import VueRouter from 'vue-router';

import store from './vuex/store';

import moment from 'moment';
import 'moment/locale/fr';

import UserAdd from './components/users/UserAdd.vue';
import UserList from './components/users/UserList.vue';
import UserProfile from './components/users/UserProfile.vue';
import UserProfileEdit from './components/users/UserProfileEdit.vue';

import Request from './components/requests/Request.vue';
import RequestAdd from './components/requests/RequestAdd.vue';
import RequestEdit from './components/requests/RequestEdit.vue';
import RequestList from './components/requests/RequestList.vue';

import TagEdit from './components/tags/TagEdit.vue';
import TagList from './components/tags/TagList.vue';

import AchievementList from './components/AchievementList.vue';

import * as actions from './vuex/actions';
import { achievementsApi, usersApi, notificationsApi } from './utils/resources';

global.jQuery = require('jquery');
require('bootstrap-loader');

moment().locale('fr');

Vue.use(VueRouter);

const router = new VueRouter({
	routes: [
		{ path: '/', component: RequestList },
		{ path: '/users/add', component: UserAdd },
		{ path: '/users/list', component: UserList },//TODO change path to /users
		{ path: '/users/profile/view/:id', component: UserProfile },
		{ path: '/users/profile/edit/:id', component: UserProfileEdit },
		{ path: '/requests', component: RequestList },
		{ path: '/requests/add/', component: RequestAdd },
		{ path: '/requests/edit/:id', component: RequestEdit },
		{ path: '/requests/view/:id', component: Request },
		{ path: '/tags/list', component: TagList },//TODO change path to /tags
		{ path: '/tags/edit/:id', component: TagEdit },
		{ path: '/achievements', component: AchievementList },
	]
});

let app = new Vue({
	el: '#app',
	...App,
	router,
	store
});

//TODO use mixin to allow easier access to store.state from components
/*
let refreshId = 9;

router.afterEach(transition => {
	let store = transition.to.router.app.$store;

	if (localStorage.userID) {
		usersApi.get({ id: localStorage.userID }).then(response => {
			actions.userUpdate(store, response.body);
		});
	}
	achievementsApi.get().then(response => {
		actions.achievementListUpdate(store, response.body);
	});
	window.clearInterval(refreshId);//TODO refactor
	refreshId = window.setInterval(() => {
		notificationsApi.getFor(localStorage.userID).then(response => {
			actions.notificationsUpdate(store, response.body);
		})
	}, 5000);
});
*/

/* TODO: this is probably a bad idea */
String.prototype.empty = function() {
	return (this.length === 0 || !this.trim());
};