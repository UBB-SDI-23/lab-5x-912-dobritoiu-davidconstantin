import { useState, useEffect } from "react";

function UserProfile(props) {
  const [userProfile, setUserProfile] = useState({});
  const { id } = props;

  useEffect(() => {
    async function fetchUserProfile() {
      const response = await fetch(`/api/user-profile-id/${id}`);
      const data = await response.json();
      setUserProfile(data);
    }

    fetchUserProfile();
  }, [id]);

  return (
    <div>
      <h2>User Profile</h2>
      <h4>Bio:</h4>
      <p>{userProfile.bio}</p>
      <h4>Location:</h4>
      <p>{userProfile.location}</p>
      <h4>Birthdate:</h4>
      <p>{userProfile.birthdate}</p>
      <h4>Gender:</h4>
      <p>{userProfile.gender}</p>
      <h4>Marital Status:</h4>
      <p>{userProfile.maritalStatus}</p>
    </div>
  );
}

export default UserProfile;
