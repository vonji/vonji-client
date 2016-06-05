import React from 'react';

export const LoginForm = ({ onLogin }) => (
  <div>
    <div className="form-group">
      <input className="form-control" type="text" placeholder="Login." />
    </div>{' '}
    <div className="form-group">
      <input className="form-control" type="password" placeholder="Password." />
    </div>{' '}
    <button onClick={() => onLogin('test', 'test')} className="btn btn-default">Login</button>
  </div>
);
