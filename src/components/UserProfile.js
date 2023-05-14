import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function UserProfile() {
  const { id } = useParams();
  console.log(id);
  const [user, setUser] = useState({});

  const fetchUser = useCallback(() => {
    axios
      .get(`/api/user-profile-id/${id}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => console.log(error));
  }, [id]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-6">
          <p>
            <strong>Bio:</strong> {user.bio}
          </p>
        </div>
        <div className="col-6">
          <p>
            <strong>Location:</strong> {user.location}
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col-6">
          <p>
            <strong>Date of Birth:</strong> ${user.birthdate}
          </p>
        </div>
        <div className="col-6">
          <p>
            <strong>Gender:</strong> {user.gender}/5
          </p>
        </div>
      </div>
      <div className="row">
        <p>
          <strong>Marital Status:</strong> ${user.maritalStatus}
        </p>
      </div>
    </div>
  );
}

export default UserProfile;
