import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const UserProfile = ({ roles }) => {
  const { id } = useParams();
  const [user, setUser] = useState({
    bio: null,
    location: null,
    birthdate: null,
    gender: null,
    maritalStatus: null
  });

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = () => {
    axios
      .get(`/api/books/${id}`)
      .then((response) => setUser(response.data))
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <h1>User Profile</h1>
      <p>User ID: {id}</p>
      <p>Bio: {user.bio || 'No bio available'}</p>
      <p>Location: {user.location || 'Unknown location'}</p>
      <p>Date of Birth: {user.birthdate || 'Unknown birthdate'}</p>
      <p>Gender: {user.gender || 'Unknown gender'}</p>
      <p>Marital Status: {user.maritalStatus || 'Unknown marital status'}</p>
    </div>
  );
};

export default UserProfile;
