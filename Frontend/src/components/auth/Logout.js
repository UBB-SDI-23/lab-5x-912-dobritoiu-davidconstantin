import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/AuthService";

function Logout(props) {
  const isAuthenticated = props.isAuthenticated;
  const history = useNavigate();

  useEffect(() => {
    async function logout() {
      if (isAuthenticated) {
        await AuthService.logout();
        history.push("/");
      }
    }

    logout();
  }, [isAuthenticated, history]);

  if (!isAuthenticated) {
    window.location.href = "/";
    return null;
  }

  return (
    <div>
      <h3>You have been logged out.</h3>
    </div>
  );
}

export default Logout;
