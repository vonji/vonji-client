import React from 'react';
import { LoginForm } from './loginForm';

export const Navbar = ({ isLogged, onLogin, onLogout }) => (
  <nav className="navbar navbar-default">
    <div className="container-fluid">
      <div className="navbar-header">
        <a className="navbar-brand" href="#">Vonji</a>
      </div>
      <div className="navbar-form navbar-right">
      {(() => {
        if (isLogged) {
          return (
            <button onClick={onLogout} className="btn btn-default">Logout</button>
          );
        }
        return <LoginForm onLogin={onLogin} />;
      })()}
      </div>
    </div>
  </nav>
);
