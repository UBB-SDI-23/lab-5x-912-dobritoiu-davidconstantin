import React from "react";
import { Link } from "react-router-dom";

function Header(props) {
  const isLoggedIn = props.isLoggedIn;

  console.log(props);

  return (
    <ul class="navbar-nav mr-auto">
      <li className="nav-item">
        <Link reloadDocument className="nav-link" to="/">
          Home
        </Link>
      </li>
      <li className="nav-item">
        {!isLoggedIn && (
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
        {isLoggedIn && (
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
