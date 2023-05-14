import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserProfile = ({ id }) => {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`/api/user-profile-id/${id}`);
        setUserProfile(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {userProfile ? (
        <div>
          <h2>User Profile</h2>
          <p>Bio: {userProfile.bio}</p>
          <p>Location: {userProfile.location}</p>
          <p>Birthdate: {userProfile.birthdate}</p>
          <p>Gender: {userProfile.gender}</p>
          <p>Marital Status: {userProfile.maritalStatus}</p>
        </div>
      ) : (
        <div>No user profile found.</div>
      )}
    </div>
  );
};

export default UserProfile;
