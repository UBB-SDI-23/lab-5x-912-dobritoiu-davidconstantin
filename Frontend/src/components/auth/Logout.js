import React, { useEffect } from "react";
import AuthService from "../../services/AuthService";

function Logout(props) {
  const isAuthenticated = props.isAuthenticated;

  useEffect(() => {
    async function logout() {
      if (isAuthenticated) {
        await AuthService.logout();
      }
    }

    logout();
  });

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
