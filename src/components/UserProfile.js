import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserProfile = ({ id }) => {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [numberOfAuthors, setNumberOfAuthors] = useState(null);
  const [numberOfBooks, setNumberOfBooks] = useState(null);
  const [numberOfLibraries, setNumberOfLibraries] = useState(null);
  const [numberOfLibraryBooks, setNumberOfLibraryBooks] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profileResponse = await axios.get(`/user-profile-id/${id}`);
        setUserProfile(profileResponse.data);

        const numberOfAuthorsResponse = await axios.get(`/user-number-authors/${id}`);
        setNumberOfAuthors(numberOfAuthorsResponse.data);

        const numberOfBooksResponse = await axios.get(`/user-number-books/${id}`);
        setNumberOfBooks(numberOfBooksResponse.data);

        const numberOfLibrariesResponse = await axios.get(`/user-number-libraries/${id}`);
        setNumberOfLibraries(numberOfLibrariesResponse.data);

        const numberOfLibraryBooksResponse = await axios.get(`/user-number-librarybooks/${id}`);
        setNumberOfLibraryBooks(numberOfLibraryBooksResponse.data);

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

          <h3>Additional Information</h3>
          <p>Number of Authors: {numberOfAuthors}</p>
          <p>Number of Books: {numberOfBooks}</p>
          <p>Number of Libraries: {numberOfLibraries}</p>
          <p>Number of Library Books: {numberOfLibraryBooks}</p>
        </div>
      ) : (
        <div>No user profile found.</div>
      )}
    </div>
  );
};

export default UserProfile;
