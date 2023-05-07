import React from "react";
import { Link } from "react-router-dom";

function Header(props) {
  const isLoggedIn = props.isLoggedIn;

  return (
    <li className="nav-item">
      <Link reloadDocument className="nav-link" to="/">
        Home
      </Link>
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
  );
}

export default Header;
