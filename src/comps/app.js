import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Alert } from './alert';
import { Navbar } from './navbar';

import {
  doLogin,
  doLogout,
  doRemoveAlert,
  doAlert,
} from '../actions/all';

class App extends Component {
  constructor(props) {
    super(props);
    this.displayAlerts = this.displayAlerts.bind(this);
  }

  displayAlerts() {
    const { alerts, dispatch } = this.props;
    if (alerts.length > 0) {
      return (
        <div className="row">
          <div className="col-md-12">
            {alerts.map((alert) => (
              <Alert
                key={alert.guid}
                type={alert.type}
                message={alert.message}
                guid={alert.guid}
                onDismissAlert={() => doRemoveAlert(dispatch, alert.guid)}
              />
            ))}
          </div>
        </div>
      );
    }
    return null;
  }

  render() {
    const { username, dispatch } = this.props;
    return (
      <div>
        <Navbar
          isLogged={username !== ''}
          onLogin={(givenUsername) => {
            doLogin(dispatch, givenUsername);
            doAlert(dispatch, "Welcome back! You've logged in successfully!", 'info');
          }}
          onLogout={() => {
            doLogout(dispatch);
            doAlert(dispatch, 'See you next time :)! Yo!', 'info');
          }}
        />
        <div className="container-fluid">
          {this.displayAlerts()}
          <div className="row">
            <div className="col-md-6">
              <div className="list-group">
                {this.children}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(state => state)(App);