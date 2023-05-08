import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function AdminPage(props) {
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

  const role = props.roles;

  if (role !== "ROLE_ADMIN") {
    window.location.href = "/";
    return null;
  }

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
            <button onClick={handleInsertBooks}>Yes</button>
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

      <h2>Search Users</h2>
      <Link to="/dashboard/users">
        <button>Search Users</button>
      </Link>

      <h2>Set up Entries per Page</h2>
      <Link to="/dashboard/entries">
        <button>Entries Per Page</button>
      </Link>
    </div>
  );
}

export default AdminPage;
