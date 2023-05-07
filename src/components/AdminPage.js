import React, { useState } from "react";
import axios from "axios";

const roles = ["ROLE_ADMIN", "ROLE_USER", "ROLE_MODERATOR", "ROLE_ANONYMOUS"];

const AdminPage = () => {
  const [confirmDeleteAuthors, setConfirmDeleteAuthors] = useState(false);
  const [confirmDeleteBooks, setConfirmDeleteBooks] = useState(false);
  const [confirmDeleteLibraries, setConfirmDeleteLibraries] = useState(false);
  const [confirmDeleteLibraryBooks, setConfirmDeleteLibraryBooks] =
    useState(false);
  const [confirmInsertAuthors, setConfirmInsertAuthors] = useState(false);
  const [confirmInsertBooks, setConfirmInsertBooks] = useState(false);
  const [confirmInsertLibraries, setConfirmInsertLibraries] = useState(false);
  const [confirmInsertLibraryBooks, setConfirmInsertLibraryBooks] =
    useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const [username, setUsername] = useState("");
  const [selectedRole, setSelectedRole] = useState("ROLE_USER");
  const [searchResult, setSearchResult] = useState(null);

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  const handleDeleteAuthors = async () => {
    if (confirmDeleteAuthors) {
      try {
        const response = await axios.post("/run-delete-authors-script");
        alert(response.data.message);
      } catch (error) {
        console.error(error);
      }
    } else {
      setConfirmDeleteAuthors(true);
    }
  };
  const handleInsertAuthors = async () => {
    if (confirmDeleteAuthors) {
      try {
        const response = await axios.post("/run-insert-authors-script");
        alert(response.data.message);
      } catch (error) {
        console.error(error);
      }
    } else {
      setConfirmInsertAuthors(true);
    }
  };

  const handleDeleteBooks = async () => {
    if (confirmDeleteBooks) {
      try {
        const response = await axios.post("/run-delete-books-script");
        alert(response.data.message);
      } catch (error) {
        console.error(error);
      }
    } else {
      setConfirmDeleteBooks(true);
    }
  };
  const handleInsertBooks = async () => {
    if (confirmDeleteBooks) {
      try {
        const response = await axios.post("/run-insert-books-script");
        alert(response.data.message);
      } catch (error) {
        console.error(error);
      }
    } else {
      setConfirmInsertBooks(true);
    }
  };

  const handleDeleteLibraries = async () => {
    if (confirmDeleteLibraries) {
      try {
        const response = await axios.post("/run-delete-libraries-script");
        alert(response.data.message);
      } catch (error) {
        console.error(error);
      }
    } else {
      setConfirmDeleteLibraries(true);
    }
  };

  const handleInsertLibraries = async () => {
    if (confirmDeleteLibraries) {
      try {
        const response = await axios.post("/run-insert-libraries-script");
        alert(response.data.message);
      } catch (error) {
        console.error(error);
      }
    } else {
      setConfirmInsertLibraries(true);
    }
  };

  const handleDeleteLibraryBooks = async () => {
    if (confirmDeleteLibraryBooks) {
      try {
        const response = await axios.post("/run-delete-librarybooks-script");
        alert(response.data.message);
      } catch (error) {
        console.error(error);
      }
    } else {
      setConfirmDeleteLibraryBooks(true);
    }
  };

  const handleInsertLibraryBooks = async () => {
    if (confirmDeleteLibraryBooks) {
      try {
        const response = await axios.post("/run-insert-librarybooks-script");
        alert(response.data.message);
      } catch (error) {
        console.error(error);
      }
    } else {
      setConfirmInsertLibraryBooks(true);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`/user-search?username=${searchQuery}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRoleUpdate = (id) => {
    const updatedRoles = { [selectedRole]: true };
    axios
      .put(`/user-roles/${id}`, updatedRoles)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <h1>Admin Page</h1>
      <div>
        <h2>Delete All Authors</h2>
        {confirmDeleteAuthors ? (
          <div>
            <p>Are you sure you want to delete all authors?</p>
            <button onClick={handleDeleteAuthors}>Yes</button>
            <button onClick={() => setConfirmDeleteAuthors(false)}>No</button>
          </div>
        ) : (
          <button onClick={() => setConfirmDeleteAuthors(true)}>
            Delete All Authors
          </button>
        )}
      </div>
      <div>
        <h2>Insert All Authors</h2>
        {confirmInsertAuthors ? (
          <div>
            <p>Are you sure you want to insert all authors?</p>
            <button onClick={handleInsertAuthors}>Yes</button>
            <button onClick={() => setConfirmInsertAuthors(false)}>No</button>
          </div>
        ) : (
          <button onClick={() => setConfirmInsertAuthors(true)}>
            Insert All Authors
          </button>
        )}
      </div>
      <div>
        <h2>Delete All Books</h2>
        {confirmDeleteBooks ? (
          <div>
            <p>Are you sure you want to delete all books?</p>
            <button onClick={handleDeleteBooks}>Yes</button>
            <button onClick={() => setConfirmDeleteBooks(false)}>No</button>
          </div>
        ) : (
          <button onClick={() => setConfirmDeleteBooks(true)}>
            Delete All Books
          </button>
        )}
      </div>
      <div>
        <h2>Insert All Books</h2>
        {confirmInsertBooks ? (
          <div>
            <p>Are you sure you want to insert all authors?</p>
            <button onClick={handleInsertAuthors}>Yes</button>
            <button onClick={() => setConfirmInsertBooks(false)}>No</button>
          </div>
        ) : (
          <button onClick={() => setConfirmInsertBooks(true)}>
            Insert All Books
          </button>
        )}
      </div>
      <div>
        <h2>Delete All Libraries</h2>
        {confirmDeleteLibraries ? (
          <div>
            <p>Are you sure you want to delete all libraries?</p>
            <button onClick={handleDeleteLibraries}>Yes</button>
            <button onClick={() => setConfirmDeleteLibraries(false)}>No</button>
          </div>
        ) : (
          <button onClick={() => setConfirmDeleteLibraries(true)}>
            Delete All Libraries
          </button>
        )}
      </div>
      <div>
        <h2>Insert All Libraries</h2>
        {confirmInsertLibraries ? (
          <div>
            <p>Are you sure you want to insert all libraries?</p>
            <button onClick={handleInsertLibraries}>Yes</button>
            <button onClick={() => setConfirmInsertLibraries(false)}>No</button>
          </div>
        ) : (
          <button onClick={() => setConfirmInsertLibraries(true)}>
            Insert All Libraries
          </button>
        )}
      </div>
      <div>
        <h2>Delete All Library Books</h2>
        {confirmDeleteLibraryBooks ? (
          <div>
            <p>Are you sure you want to delete all librarybooks?</p>
            <button onClick={handleDeleteLibraryBooks}>Yes</button>
            <button onClick={() => setConfirmDeleteLibraryBooks(false)}>
              No
            </button>
          </div>
        ) : (
          <button onClick={() => setConfirmDeleteLibraryBooks(true)}>
            Delete All LibraryBooks
          </button>
        )}
      </div>
      <div>
        <h2>Insert All LibraryBooks</h2>
        {confirmInsertLibraryBooks ? (
          <div>
            <p>Are you sure you want to insert all librarybooks?</p>
            <button onClick={handleInsertLibraryBooks}>Yes</button>
            <button onClick={() => setConfirmInsertLibraryBooks(false)}>
              No
            </button>
          </div>
        ) : (
          <button onClick={() => setConfirmInsertLibraryBooks(true)}>
            Insert All LibraryBooks
          </button>
        )}
      </div>

      <div>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <button onClick={handleSearch}>Search</button>
        {searchResult && (
          <ul>
            {searchResult.map((user) => (
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

export default AdminPage;