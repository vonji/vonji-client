import App from './components/App.vue';

import Vue from 'vue';
import VueRouter from 'vue-router';

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
	},
	'tags/edit/:id': {
		component: TagEdit
	},
	'/achievements': {
		component: AchievementList
	}
});

//TODO use mixin to allow easier access to store.state from components

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

router.start(App, '#app');

/* TODO: this is probably a bad idea */
String.prototype.empty = function() {
	return (this.length === 0 || !this.trim());
};