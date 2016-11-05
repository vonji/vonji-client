import { usersApi, transactionsApi } from '../utils/resources';
import * as M from './mutationTypes';

//payload: { email, password }
export const login = ({ commit }, payload) => {
	usersApi.getByEmail(payload.email)
		.then(result => result.body)
		.then(user => {
			if (user.Password === payload.email) {
				commit(M.LOGIN_SUCCESS, user);
				commit(M.ALERT, { type: 'info', message: 'Logged in' });
			}
			else {
				commit(M.LOGIN_FAILURE);//delete?
				commit(M.ALERT, { type: 'danger', message: 'Login failure' });
			}
		})
		.catch(error => {
			console.error(error);
			commit(M.ALERT, { type: 'danger', message: 'Login failure' });
			commit(M.LOGIN_FAILURE);
		})
};

export const logout = ({ commit }) => {
	commit(M.LOGOUT);
	commit(M.ALERT, { type: 'info', message: 'Logged out' });
};

//payload: { achievement, user }
export const achievementAward = ({ commit }, payload) => {
	if (payload.user.Achievements.some(e => e.ID == payload.achievement.ID))
		return;
	payload.user.Achievements.push(payload.achievement);
	payload.user.VActions += payload.achievement.Award;
	usersApi.update(payload.user)
		.then(() => {
			transactionsApi.save({
				FromId: 1,
				ToId: payload.user.ID,
				Type: 'VACTION',
				Amount: achievement.Award,
				Reason: 'Achievement get: ' + achievement.Name,
				Source: '/achievements'
			});
		})
		.then(() => {
			usersApi.get({ id: localStorage.userID })//TODO use state
				.then(result => { payload.user = result.body });
		})
		.then(() => {
			commit(M.ALERT, { type: 'info', message: 'Achievement get: ' + payload.achievement.Name });
			commit(M.USER_UPDATE, payload.user);
		});
};