import React from 'react';

export const Member = ({ vCoins, vReput, firstName, lastName, description }) => (
  <div className="list-group-item">
    <div className="media">
      <div className="media-left">
        <img src="http://placehold.it/80x80" alt="avatar" />
      </div>
      <div className="media-body">
        <div className="row">
          <div className="col-md-6">
            <h4>{firstName} {lastName}</h4>
            <p>{description}</p>
          </div>
          <div className="col-md-6">
            {vReput || 0} pts<br />
            {vCoins || 0} coins
          </div>
        </div>
      </div>
      <div className="media-right">
      </div>
    </div>
  </div>
);
