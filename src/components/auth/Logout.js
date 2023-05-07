import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import AuthService from "../../services/AuthService";

const Logout = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

  console.log(isAuthenticated);

  useEffect(() => {
    const logout = async () => {
      if (isAuthenticated) {
        await AuthService.logout();
        setIsAuthenticated(false);
      }
    };

    logout();
  }, [isAuthenticated, setIsAuthenticated]);

  if (!isAuthenticated) {
    window.location.href = "/";
    return null;
  }

  return (
    <div>
      <h3>You have been logged out.</h3>
    </div>
  );
};

export default Logout;
