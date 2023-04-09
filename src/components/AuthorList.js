import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DeleteAuthor from './DeleteAuthor';

function AuthorList() {
  const [authors, setAuthors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(100);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAuthors();
  }, [currentPage]);

  const fetchAuthors = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    axios
      .get(`/api/authors?_start=${startIndex}&_limit=${itemsPerPage}`)
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

  const [totalAuthors, setTotalAuthors] = useState(0);
  useEffect(() => {
    axios
      .get('/api/authors/count')
      .then((response) => setTotalAuthors(response.data))
      .catch((error) => console.log(error));
  }, []);

  const totalPages = Math.ceil(totalAuthors / itemsPerPage);
  const pageButtons = [];
  for (let i = 1; i <= totalPages; i++) {
    pageButtons.push(
      <button key={i} onClick={() => setCurrentPage(i)}>{i}</button>
    );
  }

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
        <div>
          {pageButtons}
        </div>
      </div>
  );
}

export default AuthorList;
