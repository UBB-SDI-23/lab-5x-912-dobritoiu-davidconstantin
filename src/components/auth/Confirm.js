import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/AuthService";

const ConfirmPage = ({ token }) => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

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
