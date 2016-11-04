import * as M from './mutationTypes';

export const mutations = {
	[M.LOGIN_SUCCESS] (state, user) {
		state.userID = user.ID;
		localStorage.userID = user.ID;
	},
	[M.LOGIN_FAILURE] (state) {
		state.userID = null;
		delete localStorage.userID;
	},
	[M.LOGOUT] (state) {
		state.userID = null;
		delete localStorage.userID;
	},
	//alert: { type, message }
	[M.ALERT] (state, alert) {
		state.alerts.push(alert);
		window.setTimeout(() => {
			mutations[M.ALERT_DISMISS](state, state.alerts.length - 1);
		}, 5000);
	},
	[M.ALERT_DISMISS] (state, index) {
		state.alerts.splice(index, index + 1);
	},
	[M.USER_UPDATE] (state, user) {
		state.user = user;
	},
	[M.ACHIEVEMENT_LIST_UPDATE] (state, achievementList) {
		state.achievementList = achievementList;
	},
	[M.NOTIFICATION_UPDATE] (state, notifications) {
		state.notifications = notifications;
	}
};