import React from "react";
import AuthService from "../../services/AuthService";

const Logout = () => {
  AuthService.logout();

  return (
    <div>
      <h3>You have been logged out.</h3>
    </div>
  );
};

export default Logout;
