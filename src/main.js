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

import * as M from './vuex/mutationTypes';
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

Vue.mixin({
	created() {
		if (this.fetchData) {
			this.fetchData();
		}
	},
	watch: {
		'$route': function() {
			if (this.fetchData) {
				this.fetchData();
			}
		}
	},
});

let app = new Vue({
	el: '#app',
	...App,
	router,
	store,
	methods: {
		fetchData() {
			fetchUser(this.$store);
			fetchAchievements(this.$store);
			autoFetchNotifications(this.$store);
		}
	}
});

function fetchUser(store) {
	if (localStorage.userID) {
		usersApi.get({ id: localStorage.userID }).then(response => {
			store.commit(M.USER_UPDATE, response.body);
		});
	}
}

function fetchAchievements(store) {
	achievementsApi.get().then(response => {
		store.commit(M.ACHIEVEMENT_LIST_UPDATE, response.body);
	});
}

let refreshId = 9;
function autoFetchNotifications() {
	window.clearInterval(refreshId);//TODO refactor
	refreshId = window.setInterval(() => {
		notificationsApi.getFor(localStorage.userID).then(response => {
			store.commit(M.NOTIFICATION_UPDATE, response.body);
		})
	}, 5000);
}

/* TODO: this is probably a bad idea */
String.prototype.empty = function() {
	return (this.length === 0 || !this.trim());
};