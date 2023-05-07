import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/AuthService";

const ConfirmPage = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setToken(user.jwtToken);
    }
  }, []);

  const handleConfirm = () => {
    AuthService.confirm(token)
      .then(() => {
        setTimeout(() => {
          navigate("/login");
        }, 3000);
        setErrorMessage("Confirmation successful. Redirecting to login page...");
      })
      .catch((error) => {
        setErrorMessage(error.response.data.message);
      });
  };

  return (
    <div>
      <h2>Confirm Page</h2>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      <p>Token: {token}</p>
      <button className="btn btn-primary" onClick={handleConfirm}>
        Confirm
      </button>
    </div>
  );
};

export default ConfirmPage;
