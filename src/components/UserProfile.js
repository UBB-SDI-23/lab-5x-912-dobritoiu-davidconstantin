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

  return (
    <div>
      <h1>User Profile</h1>
      <p>User ID: {id}</p>
      <p>Bio: {user.bio}</p>
      <p>Location: {user.location}</p>
      <p>Date of Birth: {user.birthdate}</p>
      <p>Gender: {user.gender}</p>
      <p>Marital Status: {user.maritalStatus}</p>
    </div>
  );
};

export default UserProfile;
