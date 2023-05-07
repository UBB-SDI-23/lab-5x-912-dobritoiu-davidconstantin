import React, { useState } from "react";
import axios from "axios";

const roles = ["ROLE_ADMIN", "ROLE_USER", "ROLE_MODERATOR", "ROLE_ANONYMOUS"];

const UserSearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchResult, setSearchResult] = useState(null);
  const [selectedRole, setSelectedRole] = useState("");

  const handleSearch = async () => {
    try {
      const response = await axios.get(`/user-search?username=${searchQuery}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRoleUpdate = (id) => {
    const updatedRoles = { role: selectedRole };
    axios
      .put(`/user-roles/${id}`, updatedRoles)
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
        {searchResults.length > 0 && (
          <ul>
            {searchResults.map((user) => (
              <li key={user.id}>
                {user.username} - {user.role}
                <select value={selectedRole} onChange={handleRoleChange}>
                  {roles.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
                <button onClick={() => handleRoleUpdate(user.id)}>
                  Update Role
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default UserSearchPage;
