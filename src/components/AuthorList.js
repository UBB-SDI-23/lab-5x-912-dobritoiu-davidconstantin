import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DeleteAuthor from './DeleteAuthor';

function AuthorList() {
  const [authors, setAuthors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAuthors();
  }, []);

  const fetchAuthors = () => {
    axios
      .get("/api/authors")
      .then((response) => setAuthors(response.data))
      .catch((error) => console.log(error));
  };

  const handleEdit = (authorId) => {
    navigate(`/authors/${authorId}/edit`);
  };

  const handleDelete = (authorId) => {
    axios
      .delete(`/api/authors/${authorId}`)
      .then((response) => {
        console.log(response);
        fetchAuthors();
      })
      .catch((error) => console.log(error));
  };

  const handleCreate = () => {
    navigate(`/authors/create`);
  };

  return (
      <div>
        <h1>Author List</h1>
        <button onClick={handleCreate}>Create Author</button>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Bio</th>
              <th>Country</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {authors.map((author) => (
              <tr key={author.id}>
                <td>{author.name}</td>
                <td>{author.email}</td>
                <td>{author.bio}</td>
                <td>{author.country}</td>
                <td>
                  <button onClick={() => handleEdit(author.id)}>Edit</button>
                  <DeleteAuthor author={author} handleDelete={handleDelete} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  );
}

export default AuthorList;
