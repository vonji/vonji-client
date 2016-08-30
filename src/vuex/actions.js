import { usersApi } from '../utils/resources';
import * as A from './actionTypes';

export const login = ({ dispatch }, email, password) => {
	usersApi.getByEmail(email)
		.then(result => result.json())
		.then(user => {
			if (user.Password === password) {
				dispatch(A.LOGIN_SUCCESS, user);
				dispatch(A.ALERT, 'info', 'Logged in');
			}
			else {
				dispatch(A.LOGIN_FAILURE);//delete?
				dispatch(A.ALERT, 'danger', 'Login failure');
			}
		})
		.catch(error => {
			console.error(error);
			dispatch(A.ALERT, 'danger', 'Login failure');
			dispatch(A.LOGIN_FAILURE);
		})
};

export const logout = ({ dispatch }) => {
	dispatch(A.LOGOUT);
	dispatch(A.ALERT, 'info', 'Logged out');
};

export const alert = ({ dispatch }, type, message) => {
	dispatch(A.ALERT, type, message);
};

export const alertDismiss = ({ dispatch }, index) => {
	dispatch(A.ALERT_DISMISS, index);
};


export const userUpdate = ({ dispatch }, user) => {
	dispatch(A.USER_UPDATE, user);
};
};
