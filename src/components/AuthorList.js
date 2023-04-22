import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DeleteAuthor from "./DeleteAuthor";
import FilteredAuthorList from "./FilteredAuthorList";

function AuthorList() {
  const [authors, setAuthors] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(100);
  const [booksCountFilter, setBooksCountFilter] = useState("");
  const navigate = useNavigate();

  const fetchAuthors = useCallback(() => {
    axios
      .get(
        `/api/authors?page=${currentPage}&size=${itemsPerPage}&booksCount=${booksCountFilter}`
      )
      .then((response) => {
        setAuthors(response.data.content);
        setCurrentPage(response.data.number);
      })
      .catch((error) => console.log(error));
  }, [currentPage, itemsPerPage, booksCountFilter]);

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

  const handleNextPage = () => {
    setCurrentPage(Math.min(currentPage + 1, totalPages - 1));
  };

  const handlePrevPage = () => {
    setCurrentPage(Math.max(currentPage - 1, 0));
  };

  const handleJump = (jump) => {
    setCurrentPage(Math.max(Math.min(currentPage + jump, totalPages - 1), 0));
  };

  const startIdx = currentPage * itemsPerPage;
  const endIdx = Math.min(startIdx + itemsPerPage, totalAuthors);

  const handleFilter = () => {
    fetchAuthors();
  };

  return (
    <div className="container">
      <h1 className="mt-5 mb-3">Author List</h1>
      <div className="mb-3 d-flex justify-content-between align-items-center">
        <button className="btn btn-primary" onClick={handleCreate}>
          Create Author
        </button>
        <div className="d-flex align-items-center">
          <label htmlFor="booksCount" className="me-3">
            Filter by books count:
          </label>
          <input
            type="number"
            id="booksCount"
            min="0"
            className="form-control me-3"
          />
          <button className="btn btn-secondary" onClick={handleFilter}>
            Filter
          </button>
        </div>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Bio</th>
            <th>Country</th>
            <th>Books Count</th>
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
              <td>{author.booksCount}</td>
              <td>
                <button
                  className="btn btn-primary me-2"
                  onClick={() => handleEdit(author.id)}
                >
                  Edit
                </button>
                <DeleteAuthor author={author} handleDelete={handleDelete} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="d-flex justify-content-between align-items-center">
        <p>
          Showing {startIdx + 1}-{endIdx} of {totalAuthors} authors
        </p>
        <div>
          <button className="btn btn-secondary me-2" onClick={handlePrevPage}>
            Prev
          </button>
          <button className="btn btn-secondary me-2" onClick={handleNextPage}>
            Next
          </button>
        </div>
        <div>
          <button
            className="btn btn-secondary me-2"
            onClick={() => handleJump(-100)}
          >
            Back 100
          </button>
          <button
            className="btn btn-secondary me-2"
            onClick={() => handleJump(-10)}
          >
            Back 10
          </button>
          <button
            className="btn btn-secondary me-2"
            onClick={() => handleJump(10)}
          >
            Forward 10
          </button>
          <button
            className="btn btn-secondary me-2"
            onClick={() => handleJump(100)}
          >
            Forward 100
          </button>
        </div>
      </div>
    </div>
  );
}

export default AuthorList;
