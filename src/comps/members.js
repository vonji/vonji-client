import React, { Component } from 'react';
import { Member } from './member';
import { connect } from 'react-redux';

import {
  requestMembersAction,
  alertAction,
} from '../actions/all';

class Members extends Component {

  componentDidMount() {
    const { dispatch, username } = this.props;
    if (username !== '') {
      dispatch(requestMembersAction())
      .catch((err) => {
        dispatch(alertAction("Can't retreive the members: " + err, 'error'));
      });
    }
  }

  componentWillReceiveProps() {

  }

  render() {
    const members = this.props.members;
    if (members.isFetching) {
      return (
        <div className="well">
          Members are on their way...
        </div>
      );
    }
    return (
      <div>
        {members.list.map((member) => (
          <Member
            key={member.ID}
            vCoins={member.VCoins}
            vReput={member.VReputation}
            firstName={member.FirstName}
            lastName={member.LastName}
            description={member.Description}
          />
        ))}
      </div>
    );
  }
}

export default connect(state => state)(Members);
