import React, { useState, useEffect } from "react";
import axios from "axios";

function UserProfile(props) {
  const [userProfile, setUserProfile] = useState({});
  const { id } = props;

  useEffect(() => {
    async function fetchUserProfile() {
      const response = await axios.get(`/api/user-profile-id/${id}`);
      const data = response.data;
      setUserProfile(data);
    }

    fetchUserProfile();
  }, [id]);

  useEffect(() => {
    async function fetchUserStats() {
      const response = await axios.all([
        axios.get(`/api/user-number-authors/${id}`),
        axios.get(`/api/user-number-books/${id}`),
        axios.get(`/api/user-number-libraries/${id}`),
        axios.get(`/api/user-number-librarybooks/${id}`)
      ]);
      const data = {
        authors: response[0].data,
        books: response[1].data,
        libraries: response[2].data,
        libraryBooks: response[3].data
      };
      setUserProfile(prevState => ({ ...prevState, stats: data }));
    }

    fetchUserStats();
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
      {userProfile.stats && (
        <div>
          <h2>User Stats</h2>
          <p>Number of authors: {userProfile.stats.authors}</p>
          <p>Number of books: {userProfile.stats.books}</p>
          <p>Number of libraries: {userProfile.stats.libraries}</p>
          <p>Number of library books: {userProfile.stats.libraryBooks}</p>
        </div>
      )}
    </div>
  );
}

export default UserProfile;
