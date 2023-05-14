import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function UserProfile({ roles }) {
  const { id } = useParams();

  console.log(id);
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
        const profileResponse = await axios.get(`/api/user-profile-id/${id}`);
        setUserProfile(profileResponse.data);

        const numberOfAuthorsResponse = await axios.get(`/api/user-number-authors/${id}`);
        setNumberOfAuthors(numberOfAuthorsResponse.data);

        const numberOfBooksResponse = await axios.get(`/api/user-number-books/${id}`);
        setNumberOfBooks(numberOfBooksResponse.data);

        const numberOfLibrariesResponse = await axios.get(`/api/user-number-libraries/${id}`);
        setNumberOfLibraries(numberOfLibrariesResponse.data);

        const numberOfLibraryBooksResponse = await axios.get(`/api/user-number-librarybooks/${id}`);
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
          <p>Bio: {userProfile.bio !== null ? userProfile.bio : 'null'}</p>
          <p>Location: {userProfile.location !== null ? userProfile.location : 'null'}</p>
          <p>Birthdate: {userProfile.birthdate !== null ? userProfile.birthdate : 'null'}</p>
          <p>Gender: {userProfile.gender !== null ? userProfile.gender : 'null'}</p>
          <p>Marital Status: {userProfile.maritalStatus !== null ? userProfile.maritalStatus : 'null'}</p>

          <h3>Additional Information</h3>
          <p>Number of Authors: {numberOfAuthors !== null ? numberOfAuthors : 'null'}</p>
          <p>Number of Books: {numberOfBooks !== null ? numberOfBooks : 'null'}</p>
          <p>Number of Libraries: {numberOfLibraries !== null ? numberOfLibraries : 'null'}</p>
          <p>Number of Library Books: {numberOfLibraryBooks !== null ? numberOfLibraryBooks : 'null'}</p>

          <h3>User Roles</h3>
          <ul>
            {roles.map((role, index) => (
              <li key={index}>{role}</li>
            ))}
          </ul>
        </div>
      ) : (
        <div>No user profile found.</div>
      )}
    </div>
  );
}

export default UserProfile;
