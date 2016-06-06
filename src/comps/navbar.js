import React from 'react';
import { LoginForm } from './loginForm';
import { Link } from 'react-router';

export const Navbar = ({ isLogged, onLogin, onLogout }) => (
  <nav className="navbar navbar-default">
    <div className="container-fluid">
      <div className="navbar-header">
        <Link className="navbar-brand" activeClassName="active" to={'/'}>Vonji</Link>
      </div>
      <ul className="nav navbar-nav">
        <li><Link activeClassName="active" to={'/members'}>Members</Link></li>
      </ul>
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
