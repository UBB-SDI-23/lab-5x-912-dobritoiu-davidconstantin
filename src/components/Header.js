import React from "react";
import { Link } from "react-router-dom";

function Header(props) {
  const isAuthenticated = props.isAuthenticated;
  const role = props.roles;
  const id = props.id;
  
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
          </>
        )}
      </li>
      <li className="nav-item">
        {!isAuthenticated && (
          <>
            <Link reloadDocument className="nav-link" to="/register">
              Register
            </Link>
          </>
        )}
      </li>
      <li className="nav-item">
        {isAuthenticated && role === "ROLE_ADMIN" && (
          <>
            <Link reloadDocument className="nav-link" to="/dashboard">
              Dashboard
            </Link>
          </>
        )}
      </li>
      <li className="nav-item">
        {isAuthenticated && (
          <>
            <Link reloadDocument className="nav-link" to={`/profile/${id}`}>
              Profile
            </Link>
          </>
        )}
      </li>
      <li className="nav-item">
        {isAuthenticated && (
          <>
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
