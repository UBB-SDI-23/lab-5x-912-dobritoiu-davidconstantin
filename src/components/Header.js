import React from "react";
import { Link } from "react-router-dom";

function Header(props) {
  console.log(props);

  const isAuthenticated = props.isAuthenticated;

  return (
    <ul class="navbar-nav mr-auto">
      <li className="nav-item">
        <Link reloadDocument className="nav-link" to="/">
          Home
        </Link>
      </li>
      <li className="nav-item">
        {!isAuthenticated && (
          <>
            <Link reloadDocument className="nav-link" to="/login">
              Login
            </Link>
            <Link reloadDocument className="nav-link" to="/register">
              Register
            </Link>
          </>
        )}
      </li>
      <li className="nav-item">
        {isAuthenticated && (
          <>
            <Link reloadDocument className="nav-link" to="/dashboard">
              Dashboard
            </Link>
            <Link reloadDocument className="nav-link" to="/logout">
              Logout
            </Link>
          </>
        )}
      </li>
    </ul>
  );
}

export default Header;
