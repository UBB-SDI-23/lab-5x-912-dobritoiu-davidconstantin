import React from "react";
import { Link } from "react-router-dom";

function Header(props) {
  const isLoggedIn = props.isLoggedIn;

  return (
    <li className="nav-item">
      <li>
        <Link reloadDocument className="nav-link" to="/">
          Home
        </Link>
      </li>
      <li>
        {!isLoggedIn && (
          <>
            <li>
              <Link reloadDocument className="nav-link" to="/login">
                Login
              </Link>
            </li>
            <li>
              <Link reloadDocument className="nav-link" to="/register">
                Register
              </Link>
            </li>
          </>
        )}
      </li>
      <li>
        {isLoggedIn && (
          <>
            <li>
              <Link reloadDocument className="nav-link" to="/dashboard">
                Dashboard
              </Link>
            </li>
            <li>
              <Link reloadDocument className="nav-link" to="/logout">
                Logout
              </Link>
            </li>
          </>
        )}
      </li>
    </li>
  );
}

export default Header;
