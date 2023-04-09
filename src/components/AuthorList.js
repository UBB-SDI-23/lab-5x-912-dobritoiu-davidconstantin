import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DeleteAuthor from "./DeleteAuthor";

function AuthorList() {
  const [authors, setAuthors] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(100);
  const navigate = useNavigate();

  const fetchAuthors = useCallback(() => {
    axios
      .get(`/api/authors?page=${currentPage}&size=${itemsPerPage}`)
      .then((response) => {
        setAuthors(response.data.content);
        setCurrentPage(response.data.number);
      })
      .catch((error) => console.log(error));
  }, [currentPage, itemsPerPage]);

  useEffect(() => {
    fetchAuthors();
  }, [fetchAuthors]);

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
      .get("/api/authors/count")
      .then((response) => {
        setTotalAuthors(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const totalPages = Math.max(1, Math.ceil(totalAuthors / itemsPerPage));
  const pageButtons = [];
  const numButtons = [1, 10, 100];

  const handleNextPage = () => {
    setCurrentPage(Math.min(currentPage + itemsPerPage, totalPages - 1));
  };

  const handlePrevPage = () => {
    setCurrentPage(Math.max(currentPage - itemsPerPage, 0));
  };

  const handleJump = (jump) => {
    setCurrentPage(Math.max(Math.min(currentPage + jump, totalPages - 1), 0));
  };

  const startIdx = currentPage * itemsPerPage;
  const endIdx = Math.min(startIdx + itemsPerPage, totalAuthors);

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
        <p>
          Showing {startIdx + 1}-{endIdx} of {totalAuthors} authors
        </p>
        <div>
          <button onClick={handlePrevPage}>Prev</button>
          {numButtons.map((num) => (
            <button
              key={num}
              onClick={() => setItemsPerPage(num)}
              className={itemsPerPage === num ? "active" : ""}
            >
              {num}
            </button>
          ))}
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i)}
              className={currentPage === i ? "active" : ""}
            >
              {i + 1}
            </button>
          ))}
          <button onClick={handleNextPage}>Next</button>
        </div>
        <div>
          <button onClick={() => handleJump(-100)}>Back 100</button>
          <button onClick={() => handleJump(-10)}>Back 10</button>
          <button onClick={() => handleJump(10)}>Forward 10</button>
          <button onClick={() => handleJump(100)}>Forward 100</button>
        </div>
      </div>
    </div>
  );
}

export default AuthorList;
