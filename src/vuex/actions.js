import Vue from 'vue'
import {
	usersApi
} from '../utils/resources';
import {
	LOGIN_SUCCESS,
	LOGIN_FAILURE,
	LOGOUT,
	ALERT,
	ALERT_DISMISS,
} from './actionTypes';

export const login = ({ dispatch }, email, password) => {
	usersApi.getByEmail(email)
		.then(result => result.json())
		.then(user => {
			if (user.Password === password) {
				dispatch(LOGIN_SUCCESS, user);
				dispatch(ALERT, 'info', 'Logged in');
			}
			else {
				dispatch(LOGIN_FAILURE);//delete?
				dispatch(ALERT, 'danger', 'Login failure');
			}
		})
		.catch(error => {
			console.error(error);
			dispatch(ALERT, 'danger', 'Login failure');
			dispatch(LOGIN_FAILURE);
		})
};

export const logout = ({ dispatch }) => {
	dispatch(LOGOUT);
	dispatch(ALERT, 'info', 'Logged out');
};

export const alert = ({ dispatch }, type, message) => {
	"use strict";
	dispatch(ALERT, type, message);
};

export const alertDismiss = ({ dispatch }, index) => {
	"use strict";
	dispatch(ALERT_DISMISS, index);
};
