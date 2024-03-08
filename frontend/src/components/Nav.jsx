// Header.js
import React from 'react';
import { Link } from 'react-router-dom';

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">Product Shop</Link>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Welcome</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/product">Product Page</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
