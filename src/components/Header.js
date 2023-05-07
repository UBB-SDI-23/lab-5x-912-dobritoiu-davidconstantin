import React from "react";
import { Link } from "react-router-dom";

function Header(props) {
  const isLoggedIn = props.isLoggedIn;

  return (
    <nav>
      <ul>
        <li>
          <Link
            className="nav-link"
            to="/"
            onClick={() => window.location.reload()}
          >
            Home
          </Link>
        </li>
      </ul>
      <ul>
        {!isLoggedIn && (
          <>
            <li>
              <Link
                className="nav-link"
                to="/login"
                onClick={() => window.location.reload()}
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                className="nav-link"
                to="/register"
                onClick={() => window.location.reload()}
              >
                Register
              </Link>
            </li>
          </>
        )}
        {isLoggedIn && (
          <>
            <li>
              <Link
                className="nav-link"
                to="/dashboard"
                onClick={() => window.location.reload()}
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                className="nav-link"
                to="/logout"
                onClick={() => window.location.reload()}
              >
                Logout
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Header;
