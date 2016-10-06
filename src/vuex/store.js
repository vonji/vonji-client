import Vue from 'vue';
import Vuex from 'vuex';
import * as acts from './actions';
import * as A from './actionTypes';

Vue.use(Vuex);

const state = {
	achievementList: [],
	alerts: [],
	user: {},
	userID: localStorage.userID,
	notifications: []
};

const mutations = {
	[A.LOGIN_SUCCESS] (state, user) {
		state.userID = user.ID;
		localStorage.userID = user.ID;
	},
	[A.LOGIN_FAILURE] (state) {
		state.userID = null;
		delete localStorage.userID;
	},
	[A.LOGOUT] (state) {
		state.userID = null;
		delete localStorage.userID;
	},
	[A.ALERT] (state, type, message) {
		state.alerts.push({ type: type, message: message });
		window.setTimeout(() => {
			mutations[A.ALERT_DISMISS](state, state.alerts.length - 1);
		}, 5000);
	},
	[A.ALERT_DISMISS] (state, index) {
		state.alerts.splice(index, index + 1);
	},
	[A.USER_UPDATE] (state, user) {
		state.user = user;
	},
	[A.ACHIEVEMENT_LIST_UPDATE] (state, achievementList) {
		state.achievementList = achievementList;
	},
	[A.NOTIFICATION_UPDATE] (state, notifications) {
		state.notifications = notifications;
	}
};

export default new Vuex.Store({
	state,
	mutations
});
