import React, { useState } from "react";
import axios from "axios";

const roles = ["ROLE_ADMIN", "ROLE_USER", "ROLE_MODERATOR", "ROLE_ANONYMOUS"];

const UserSearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [selectedRole, setSelectedRole] = useState("");

  const handleSearch = async () => {
    try {
      const response = await axios.get(`/api/user-search?username=${searchQuery}`);
      console.log(response.data[0]);
      setSearchResult(response.data[0]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRoleUpdate = (id) => {
    console.log(id);
    const updatedRoles = { role: selectedRole };
    axios
      .put(`/api/user-roles/${id}`, updatedRoles)
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
    <div>
      <h2>Search users and modify roles</h2>
      <div>
        <label>
          Username:
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </label>
        <button onClick={handleSearch}>Search</button>
        {searchResult && (
          <div>
            <p>
              {searchResult.username} - {searchResult.role}
            </p>
            <label>
              Select a role:
              <select value={selectedRole} onChange={handleRoleChange}>
                {roles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </label>
            <button onClick={() => handleRoleUpdate(searchResult.id)}>
              Update Role
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserSearchPage;
