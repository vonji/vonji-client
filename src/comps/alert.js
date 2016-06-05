import React from 'react';

export const Alert = ({ type, message, guid, onDismissAlert }) => {
  const alertType = `alert-${type === 'error' ? 'danger' : 'info'}`;
  return (
    <div id={guid} className={['alert', alertType].join(' ')}>
      <button
        type="button"
        className="close"
        data-dismiss="alert"
        aria-label="Close"
        onClick={onDismissAlert}
      >
        <span aria-hidden="true">&times;</span>
      </button>
      <p>{message}</p>
    </div>
  );
};
