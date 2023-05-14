import React, { useState, useEffect } from "react";
import axios from "axios";

function UserProfile(props) {
  const [userProfile, setUserProfile] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    bio: "",
    location: "",
    birthdate: "",
    gender: "male"
  });

  console.log(isEditing);
  
  const id = props.id;

  const role = props.roles;

  console.log(role);

  useEffect(() => {
    async function fetchUserProfile() {
      const response = await axios.get(`/api/user-profile-id/${id}`);
      const data = response.data;
      setUserProfile(data);
    }

    fetchUserProfile();
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`/api/user-profile/${id}`, formData);
      setIsEditing(false);
      setUserProfile((prevState) => ({ ...prevState, ...formData }));
    } catch (error) {
      console.log(error);
    }
  };

  const toggleEditing = () => {
    setIsEditing((prevState) => !prevState);
    setFormData(userProfile);
  };

  return (
    <div className="container">
      <h2>User Profile</h2>
      {isEditing && role === "ROLE_ADMIN" ? (
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="bio">Bio:</label>
            <textarea
              className="form-control"
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="location">Location:</label>
            <input
              type="text"
              className="form-control"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="birthdate">Birthdate:</label>
            <input
              type="date"
              className="form-control"
              id="birthdate"
              name="birthdate"
              value={formData.birthdate}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="gender">Gender:</label>
            <select
              className="form-control"
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary mr-2">
              Save
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={toggleEditing}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div>
          <p>
            <strong>Bio:</strong> {userProfile.bio}
          </p>
          <p>
            <strong>Location:</strong> {userProfile.location}
          </p>
          <p>
            <strong>Birthdate:</strong> {userProfile.birthdate}
          </p>
          <p>
            <strong>Gender:</strong> {userProfile.gender}
          </p>
          <button
            type="button"
            className="btn btn-primary"
            onClick={toggleEditing}
          >
            Edit
          </button>
        </div>
      )}
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
    </div>
  );
}

export default UserProfile;
