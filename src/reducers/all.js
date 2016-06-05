import {
  UDPATE_MEMBERS,
  GET_MEMBERS,
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
          type: action.alertType,
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

const members = (state = [], action) => {
  switch (action.type) {
    case GET_MEMBERS:
      return 'fetching';
    case UDPATE_MEMBERS:
      return action.members;
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
