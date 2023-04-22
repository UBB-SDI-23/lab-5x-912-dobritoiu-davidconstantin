import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DeleteLibraryBook from "./DeleteLibraryBook";

function LibraryBookList() {
  const [librarybook, setLibraryBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(100);
  const navigate = useNavigate();

  const fetchLibraryBooks = useCallback(() => {
    axios
      .get(`/api/librarybook?page=${currentPage}&size=${itemsPerPage}`)
      .then((response) => {
        setLibraryBooks(response.data.content);
        setCurrentPage(response.data.number);
      })
      .catch((error) => console.log(error));
  }, [currentPage, itemsPerPage]);

  useEffect(() => {
    fetchLibraryBooks();
  }, [fetchLibraryBooks]);

  const handleEdit = (librarybookId) => {
    navigate(`/librarybook/${librarybookId}/edit`);
  };

  const handleDelete = (librarybookId) => {
    axios
      .delete(`/api/librarybook/${librarybookId}`)
      .then((response) => {
        console.log(response);
        fetchLibraryBooks();
      })
      .catch((error) => console.log(error));
  };

  const handleCreate = () => {
    navigate(`/librarybook/create`);
  };

  const [totalLibraryBooks, setTotalLibraryBooks] = useState(0);
  useEffect(() => {
    axios
      .get("/api/librarybook/count")
      .then((response) => {
        setTotalLibraryBooks(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const totalPages = Math.max(1, Math.ceil(totalLibraryBooks / itemsPerPage));

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
  const endIdx = Math.min(startIdx + itemsPerPage, totalLibraryBooks);

  return (
    <div className="container">
      <h1 className="mt-5 mb-3">LibraryBook List</h1>
      <button className="btn btn-primary mb-3" onClick={handleCreate}>
        Create LibraryBook
      </button>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Book Title</th>
            <th>Library Name</th>
            <th>Borrow Date</th>
            <th>Return Date</th>
          </tr>
        </thead>
        <tbody>
          {librarybook.map((librarybook) => (
            <tr key={librarybook.id}>
              <td>{librarybook.bookTitle}</td>
              <td>{librarybook.libraryName}</td>
              <td>{librarybook.borrowDate}</td>
              <td>{librarybook.returnDate}</td>
              <td>
                <button
                  className="btn btn-primary me-2"
                  onClick={() => handleEdit(librarybook.id)}
                >
                  Edit
                </button>
                <DeleteLibraryBook librarybook={librarybook} handleDelete={handleDelete} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="d-flex justify-content-between align-items-center">
        <p>
          Showing {startIdx + 1}-{endIdx} of {totalLibraryBooks} LibraryBooks
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

export default LibraryBookList;