import Vue from 'vue';
import Vuex from 'vuex';

import * as actions from './actions';
import * as getters from './getters';
import { mutations } from './mutations';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		achievementList: [],
		alerts: [],
		user: {},
		userID: localStorage.userID,
		notifications: []
	},
	actions,
	getters,
	mutations
});