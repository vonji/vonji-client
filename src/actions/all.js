import $ from 'jquery';
import { createGuid } from '../utils/createGuid';

export const UDPATE_MEMBERS = 'UDPATE_MEMBERS';
export const GET_MEMBERS = 'GET_MEMBERS';

export const ISSUE_ALERT = 'ISSUE_ALERT';
export const REMOVE_ALERT = 'REMOVE_ALERT';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export const loginAction = (username) => ({
  type: LOGIN,
  username,
});
export const doLogin = (dispatch, username) => {
  dispatch(loginAction(username));
};

export const logoutAction = () => ({
  type: LOGOUT,
});
export const doLogout = (dispatch) => {
  dispatch(logoutAction());
};

export const removeAlertAction = (guid) => ({
  type: REMOVE_ALERT,
  guid,
});
export const doRemoveAlert = (dispatch) => {
  dispatch(removeAlertAction(alert.guid));
};

export const alertAction = (message, alertType) => ({
  type: ISSUE_ALERT,
  guid: createGuid(),
  message,
  alertType,
});
export const doAlert = (dispatch, message, alertType) => {
  const alert = alertAction(message, alertType);
  dispatch(alert);
  setTimeout(() => dispatch(removeAlertAction(alert.guid)), 3000);
};

export const updateMembersAction = (members) => ({
  type: UDPATE_MEMBERS,
  members,
});
export const doUpdateMembers = (dispatch, members) => {
  dispatch(updateMembersAction(members));
};

export const getMembersAction = () => ({
  type: GET_MEMBERS,
});
export const doGetMembers = (dispatch) => {
  dispatch(getMembersAction());
  $.ajax({
    async: true,
    crossDomain: true,
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    url: 'http://localhost:1618/users',
    method: 'GET',
    success: (resp) => doUpdateMembers(dispatch, resp),
    error: (err) => doAlert(dispatch, `Can't get the users: ${err}`, 'error'),
  });
};
