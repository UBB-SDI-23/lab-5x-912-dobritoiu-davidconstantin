import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import AuthService from "../../services/AuthService";

const ConfirmPage = () => {
  const history = useHistory();
  const { jwtToken } = useParams();
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    AuthService.confirm(jwtToken)
      .then(() => {
        history.push("/login");
      })
      .catch((error) => {
        setErrorMessage(error.response.data.message);
      });
  }, [history, jwtToken]);

  return (
    <div>
      <h2>Confirm Page</h2>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      <p>Please wait while we confirm your registration...</p>
    </div>
  );
};

export default ConfirmPage;
