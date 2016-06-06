import {
  UDPATE_MEMBERS,
  REQUEST_MEMBERS,
  ISSUE_ALERT,
  REMOVE_ALERT,
  LOGIN,
  LOGOUT,
} from '../actions/all';

import { routerReducer } from 'react-router-redux';

const alerts = (state = [], action) => {
  switch (action.type) {
    case REMOVE_ALERT:
      return state.filter((alert) => alert.guid !== action.guid);
    case ISSUE_ALERT:
      return [
        {
          guid: action.guid,
          message: action.message,
          severity: action.severity,
        },
        ...state.splice(0, 2),
      ];
    default:
      return state;
  }
};

const username = (state = '', action) => {
  switch (action.type) {
    case LOGIN:
      return action.username;
    case LOGOUT:
      return '';
    default:
      return state;
  }
};

const members = (state = {
  isFetching: false,
  list: [],
}, action) => {
  switch (action.type) {
    case REQUEST_MEMBERS:
      return {
        isFetching: true,
      };
    case UDPATE_MEMBERS:
      return {
        isFetching: false,
        list: action.members,
      };
    default:
      return state;
  }
};

export const mainReducer = (state = {}, action) => ({
  routing: routerReducer(state.routing, action),
  members: members(state.members, action),
  alerts: alerts(state.alerts, action),
  username: username(state.username, action),
});
