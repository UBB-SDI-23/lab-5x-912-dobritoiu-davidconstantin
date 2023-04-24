import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DeleteAuthor from "./DeleteAuthor";

function AuthorList() {
  const [authors, setAuthors] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [booksCountFilter, setBooksCountFilter] = useState(0);
  const navigate = useNavigate();

  const fetchAuthors = useCallback(() => {
    axios
      .get(`/api/authors?page=${currentPage}&size=${itemsPerPage}`)
      .then((response) => {
        const sortedAuthors = response.data.content.sort((a, b) => a.id - b.id);
        setAuthors(sortedAuthors);
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

  //live-session
  const pageRange = 6;
  const displayPages = [];

  if (currentPage < pageRange + 1) {
    for (let i = 0; i <= currentPage; i++) {
      displayPages.push(i);
    }
  } else {
    displayPages.push(0, -1);
    for (let i = currentPage - pageRange; i <= currentPage; i++) {
      if (i >= 1) {
        displayPages.push(i);
      }
    }
  }

  for (let i = currentPage + 1; i <= currentPage + pageRange; i++) {
    if (i >= 0 && i < totalPages && !displayPages.includes(i)) {
      displayPages.push(i);
    }
  }

  if (displayPages[displayPages.length - 1] < totalPages - 1) {
    displayPages.push(-1, totalPages - 1);
  }

  for (let i = totalPages - pageRange; i < totalPages; i++) {
    if (i >= currentPage && !displayPages.includes(i)) {
      displayPages.push(i);
    }
  }

  if (displayPages[0] > 0) {
    displayPages.unshift(-1);
  }

  const handleNextPage = () => {
    setCurrentPage(Math.min(currentPage + 1, totalPages - 1));
  };

  const handlePrevPage = () => {
    setCurrentPage(Math.max(currentPage - 1, 0));
  };

  const handleJump = (jump) => {
    setCurrentPage(Math.max(Math.min(currentPage + jump, totalPages - 1), 0));
  };

  const handleLast = () => {
    setCurrentPage(totalPages - 1);
  };

  const handleFirst = () => {
    setCurrentPage(0);
  };

  const startIdx = currentPage * itemsPerPage;
  const endIdx = Math.min(startIdx + itemsPerPage, totalAuthors);

  const handleFilter = () => {
    navigate(
      `/authors/filterAuthorsByNumberOfBooks?count=${booksCountFilter}&page=${currentPage}&size=${itemsPerPage}`
    );
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
            value={booksCountFilter}
            onChange={(e) => setBooksCountFilter(e.target.value)}
          />
          <button className="btn btn-secondary" onClick={handleFilter}>
            Filter
          </button>
          <button
            className="btn btn-secondary me-3"
            onClick={() => navigate("/authors/getAuthorsTop?page=0&size=10")}
          >
            Top Authors By Books
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
        <div>
          Showing {startIdx + 1}-{endIdx} of {totalAuthors} authors
        </div>
        <div>
          <button
            className="btn btn-secondary me-2"
            disabled={currentPage === 0}
            onClick={handleFirst}
          >
            First
          </button>
          <button
            className="btn btn-secondary me-2"
            disabled={currentPage === 0}
            onClick={handlePrevPage}
          >
            Previous
          </button>
          {displayPages.map((page, index) => (
            <React.Fragment key={index}>
              {page === -1 ? (
                <button className="btn btn-secondary me-2" disabled>
                  ...
                </button>
              ) : (
                <button
                  className={`btn btn-secondary me-2 ${
                    currentPage === page ? "active" : ""
                  }`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page === 0
                    ? "1"
                    : page >= totalPages - pageRange
                    ? totalPages - pageRange + index + 1
                    : page + 1}
                </button>
              )}
            </React.Fragment>
          ))}
          {displayPages[displayPages.length - 1] < totalPages - 1 && (
            <button className="btn btn-secondary me-2" disabled>
              ...
            </button>
          )}
          <button
            className="btn btn-secondary me-2"
            disabled={currentPage >= totalPages - 1}
            onClick={handleNextPage}
          >
            Next
          </button>
          <button
            className="btn btn-secondary me-2"
            onClick={() => handleJump(-1000)}
          >
            -1000
          </button>
          <button
            className="btn btn-secondary me-2"
            onClick={() => handleJump(-100)}
          >
            -100
          </button>
          <button
            className="btn btn-secondary me-2"
            onClick={() => handleJump(100)}
          >
            +100
          </button>
          <button
            className="btn btn-secondary me-2"
            onClick={() => handleJump(1000)}
          >
            +1000
          </button>
          <button
            className="btn btn-secondary me-2"
            disabled={currentPage === totalPages - 1}
            onClick={handleLast}
          >
            Last
          </button>
        </div>
      </div>
    </div>
  );
}
export default AuthorList;
