import App from './components/App.vue';

import Vue from 'vue';
import VueRouter from 'vue-router';

import UserAdd from './components/users/UserAdd.vue';
import UserList from './components/users/UserList.vue';

import Request from './components/requests/Request.vue';
import RequestAdd from './components/requests/RequestAdd.vue';
import RequestEdit from './components/requests/RequestEdit.vue';
import RequestList from './components/requests/RequestList.vue';

global.jQuery = require('jquery');
require('bootstrap-loader');

Vue.use(VueRouter);

const router = new VueRouter();

Vue.directive('confirm', {
	params: ['callback', 'params'],
	bind: function () {
		this.params.callback(this.params.params);//bootstrap confirm package is buggy
		return;
		//require('bootstrap-confirmation2');
		let $ = require('jquery');

		let self = this;
		$(function () {
			"use strict";
			$(self.el).confirmation({
				singleton: true,
				onConfirm: function () {
					"use strict";
					self.params.callback(self.params.params);
				}
			});
		});
	}
});//todo move to file

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
	}
});

router.start(App, '#app');
