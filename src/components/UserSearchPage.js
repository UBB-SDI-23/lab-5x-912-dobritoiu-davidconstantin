import React, { useState } from "react";
import axios from "axios";

const roles = ["ROLE_ADMIN", "ROLE_USER", "ROLE_MODERATOR", "ROLE_ANONYMOUS"];

const UserSearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [selectedRole, setSelectedRole] = useState("");

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `/api/user-search?username=${searchQuery}`
      );
      setSearchResult(response.data[0]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRoleUpdate = (id) => {
    const updatedRoles = { [selectedRole]: true };
    axios
      .put(`/api/user-roles/${id}`, updatedRoles, {
        headers: {
          Authorization: localStorage.getItem("user").jwtToken,
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-3">Search users and modify roles</h2>
      <div className="row mb-3">
        <div className="col-md-4">
          <label htmlFor="search-input" className="form-label">
            Username:
          </label>
          <input
            type="text"
            className="form-control"
            id="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="col-md-2">
          <button className="btn btn-primary" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
      {searchResult && (
        <div className="row">
          <div className="col-md-6">
            <p>
              {searchResult.username} - {searchResult.roles[0].name}
            </p>
            <div className="form-group">
              <label htmlFor="role-select">Select a role:</label>
              <select
                className="form-control"
                id="role-select"
                value={selectedRole}
                onChange={handleRoleChange}
              >
                {roles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>
            <button
              className="btn btn-primary"
              onClick={() => handleRoleUpdate(searchResult.id)}
            >
              Update Role
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserSearchPage;
