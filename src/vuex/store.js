import Vue from 'vue';
import Vuex from 'vuex';
import * as acts from './actions';
import * as A from './actionTypes';

Vue.use(Vuex);

const state = {
	alerts: [],
	user: {},
	userID: localStorage.userID
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
	},
	[A.ALERT_DISMISS] (state, index) {
		state.alerts.splice(index, index + 1);
	},
	[A.USER_UPDATE] (state, user) {
		state.user = user;
	},
	}
};

export default new Vuex.Store({
	state,
	mutations
});
