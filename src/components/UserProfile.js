import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function UserProfile(props) {
  const [user, setUser] = useState({
    bio: "",
    location: "",
    birthdate: "",
    gender: "",
    maritalStatus: "",
  });

  const [errors, setErrors] = useState({
    bio: "",
    location: "",
    birthdate: "",
    gender: "",
    maritalStatus: "",
  });

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchUser();
  }, []);

  const role = props.roles;

  if (role === "ROLE_ANONYMOUS") {
    window.location.href = "/";
    return null;
  }

  const fetchUser = () => {
    axios
      .get(`/api/user-profile-id/${id}`)
      .then((response) => setUser(response.data))
      .catch((error) => console.log(error));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validateForm(user);
    if (Object.keys(validationErrors).length === 0) {
      axios
        .put(`/api/user-profile/${id}`, user)
        .then((response) => {
          console.log(response);
          navigate("/user-profile");
        })
        .catch((error) => console.log(error));
    } else {
      setErrors(validationErrors);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const validateForm = (user) => {
    const errors = {};
    if (!user.bio.trim()) {
      errors.bio = "Bio is required";
    }
    if (!user.location.trim()) {
      errors.location = "Location is required";
    }
    if (!user.birthdate.trim()) {
      errors.birthdate = "Date of Birth is required";
    }
    if (!user.gender.trim()) {
      errors.gender = "Gender is required";
    }
    if (!user.maritalStatus.trim()) {
      errors.maritalStatus = "Marital Status is required";
    }
    return errors;
  };

  return (
    <div>
      {role === "ROLE_ADMIN" && (
        <div className="container">
          <h1>Edit Profile</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="bio">Bio:</label>
              <textarea
                className="form-control"
                id="bio"
                name="bio"
                value={user.bio}
                onChange={handleInputChange}
              />
              {errors.bio && (
                <div className="alert alert-danger">{errors.bio}</div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="location">Location:</label>
              <input
                type="text"
                className="form-control"
                id="location"
                name="location"
                value={user.location}
                onChange={handleInputChange}
              />
              {errors.location && (
                <div className="alert alert-danger">{errors.location}</div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="birthdate">Date of Birth:</label>
              <input
                type="text"
                className="form-control"
                id="birthdate"
                name="birthdate"
                value={user.birthdate}
                onChange={handleInputChange}
              />
              {errors.birthdate && (
                <div className="alert alert-danger">{errors.birthdate}</div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="gender">Gender:</label>
              <input
                type="text"
                className="form-control"
                id="gender"
                name="gender"
                value={user.gender}
                onChange={handleInputChange}
              />
              {errors.gender && (
                <div className="alert alert-danger">{errors.gender}</div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="maritalStatus">Marital Status:</label>
              <input
                type="text"
                className="form-control"
                id="maritalStatus"
                name="maritalStatus"
                value={user.maritalStatus}
                onChange={handleInputChange}
              />
              {errors.maritalStatus && (
                <div className="alert alert-danger">{errors.maritalStatus}</div>
              )}
            </div>
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </form>
        </div>
      )}
      <div className="container">
        <h1>User Profile</h1>
        <p>User ID: {id}</p>
        <p>Bio: {user.bio || "Bio not set up"}</p>
        <p>Location: {user.location || "Location not set up"}</p>
        <p>Date of Birth: {user.birthdate || "Date of Birth not set up"}</p>
        <p>Gender: {user.gender || "Gender not set up"}</p>
        <p>
          Marital Status: {user.maritalStatus || "Marital Status not set up"}
        </p>
      </div>
    </div>
  );
}

export default UserProfile;
