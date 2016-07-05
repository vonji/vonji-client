import Vue from 'vue';
import Vuex from 'vuex';
import * as acts from './actions';
import {
	LOGIN_SUCCESS,
	LOGIN_FAILURE,
	LOGOUT,
	ALERT,
	ALERT_DISMISS,
} from './actionTypes';

Vue.use(Vuex);

const state = {
	alerts: [],
	userID: localStorage.userID
};

const mutations = {
	[LOGIN_SUCCESS] (state, user) {
		state.userID = user.ID;
		localStorage.userID = user.ID;
	},
	[LOGIN_FAILURE] (state) {
		state.userID = null;
		localStorage.userID = null;
	},
	[LOGOUT] (state) {
		state.userID = null;
		localStorage.userID = null;
	},
	[ALERT] (state, type, message) {
		state.alerts.push({ type: type, message: message });
	},
	[ALERT_DISMISS] (state, index) {
		state.alerts.splice(index, index + 1);
	}
};

export default new Vuex.Store({
	state,
	mutations
});
