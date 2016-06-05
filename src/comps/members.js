import React, { Component } from 'react';
import { Member } from './member';
import { connect } from 'react-redux';

import {
  doGetMembers,
} from '../actions/all';

class Members extends Component {
  componentDidMount() {
    doGetMembers(this.props.dispatch);
  }

  render() {
    const members = this.props.members;
    if (members === 'fetching') {
      return (
        <div className="well">
          Members are on their way...
        </div>
      );
    }
    return (
      <div>
        {members.map((member) => (
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
