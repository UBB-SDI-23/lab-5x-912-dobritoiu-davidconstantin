import { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const UserProfile = ({ roles }) => {
  const { id } = useParams();
  const [uer, setUser] = useState({
    bio: "",
    location: "",
    birthdate: "",
    gender: "",
    maritalStatus: ""
  });

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
      {/* Render the user profile based on the ID and roles */}
    </div>
  );
};

export default UserProfile;
