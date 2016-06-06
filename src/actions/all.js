import $ from 'jquery';
import { createGuid } from '../utils/createGuid';

export const UDPATE_MEMBERS = 'UDPATE_MEMBERS';
export const REQUEST_MEMBERS = 'REQUEST_MEMBERS';

export const ISSUE_ALERT = 'ISSUE_ALERT';
export const REMOVE_ALERT = 'REMOVE_ALERT';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export const loginAction = username => dispatch => {
  dispatch({
    type: LOGIN,
    username,
  });
};

export const logoutAction = () => dispatch => {
  dispatch({
    type: LOGOUT,
  });
};

export const removeAlertAction = alert => dispatch => {
  dispatch({
    type: REMOVE_ALERT,
    guid: alert.guid,
  });
};

export const alertAction = (message, severity) => dispatch => {
  const action = {
    type: ISSUE_ALERT,
    guid: createGuid(),
    message,
    severity,
  };
  dispatch(action);
  if (severity !== 'error') {
    setTimeout(() => dispatch(removeAlertAction(action)), 3000);
  }
};

export const updateMembersAction = members => dispatch => {
  dispatch({
    type: UDPATE_MEMBERS,
    members,
  });
};

export const requestMembersAction = () => (dispatch, getState) => {
  const isLogged = getState().username !== '';
  if (!isLogged) {
    return Promise.reject("Can't request members when not logged in.");
  }
  dispatch({
    type: REQUEST_MEMBERS,
  });
  return new Promise((success, failure) => {
    $.ajax({
      async: true,
      crossDomain: true,
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      url: 'http://localhost:1618/users',
      method: 'GET',
      success: (resp) => {
        dispatch(updateMembersAction(resp));
        success(resp);
      },
      error: (err) => {
        dispatch(alertAction(`Can't get the users: ${err}`, 'error'));
        failure(err);
      },
    });
  });
};
