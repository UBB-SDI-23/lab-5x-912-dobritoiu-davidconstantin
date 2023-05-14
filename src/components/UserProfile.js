import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const UserProfile = ({ roles }) => {
  const { id } = useParams();
  const [user, setUser] = useState({
    bio: null,
    location: null,
    birthdate: null,
    gender: null,
    maritalStatus: null,
  });

  useEffect(() => {
    fetchUser();
  }, [id]);

  const fetchUser = () => {
    axios
      .get(`/api/user-profile-id/${id}`)
      .then((response) => setUser(response.data))
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <h1>User Profile</h1>
      <p>User ID: {id}</p>
      <p>Bio: {user.bio || "Bio not set up"}</p>
      <p>Location: {user.location || "Location not set up"}</p>
      <p>Date of Birth: {user.birthdate || "Date of Birth not set up"}</p>
      <p>Gender: {user.gender || "Gender not set up"}</p>
      <p>Marital Status: {user.maritalStatus || "Marital Status not set up"}</p>
    </div>
  );
};

export default UserProfile;
