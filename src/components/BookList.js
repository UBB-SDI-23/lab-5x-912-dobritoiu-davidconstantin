import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DeleteBook from "./DeleteBook";

function BookList() {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentUserRole, setCurrentUserRole] = useState("");
  const navigate = useNavigate();

  const fetchBooks = useCallback(() => {
    axios
      .get(`/api/books?page=${currentPage}&size=${itemsPerPage}`)
      .then((response) => {
        setBooks(response.data.content);
        setCurrentPage(response.data.number);
      })
      .catch((error) => console.log(error));
  }, [currentPage, itemsPerPage]);

  const fetchUserRole = useCallback(() => {
    const token = localStorage.getItem("jwt_token");
    if (!token) {
      // user is not authenticated
      setCurrentUserRole("");
      return;
    }

    axios
      .get("/api/user/Davis856", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
        setCurrentUserRole(response.data.role);
      })
      .catch((error) => console.log(error));
  }, []);

  const canAddOrEditAll =
    currentUserRole === "ROLE_ADMIN" || currentUserRole === "ROLE_MODERATOR";
  const canAddOrEditOwn = currentUserRole === "ROLE_USER" || canAddOrEditAll;

  useEffect(() => {
    fetchBooks();
    fetchUserRole();
  }, [fetchBooks, fetchUserRole]);

  const handleEdit = (bookId) => {
    navigate(`/books/${bookId}/edit`);
  };

  const handleDelete = (bookId) => {
    axios
      .delete(`/api/books/${bookId}`)
      .then((response) => {
        fetchBooks();
      })
      .catch((error) => console.log(error));
  };

  const handleCreate = () => {
    navigate(`/books/create`);
  };

  const [totalBooks, setTotalBooks] = useState(0);
  useEffect(() => {
    axios
      .get("/api/books/count")
      .then((response) => {
        setTotalBooks(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const totalPages = Math.max(1, Math.ceil(totalBooks / itemsPerPage));

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
  const endIdx = Math.min(startIdx + itemsPerPage, totalBooks);

  return (
    <div className="container">
      <h1 className="mt-5 mb-3">Books List</h1>
      <div className="mb-3 d-flex justify-content-between align-items-center">
        <button className="btn btn-primary" onClick={handleCreate}>
          Create Book
        </button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Year</th>
            <th>Price</th>
            <th>Rating</th>
            <th>Author</th>
            <th>User</th>
            {books.some(
              (book) =>
                (book.addedByCurrentUser && canAddOrEditOwn) || canAddOrEditAll
            ) && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.year}</td>
              <td>{book.price}</td>
              <td>{book.rating}</td>
              <td>{book.authorId}</td>
              <td>{book.username}</td>
              <td>
                {(canAddOrEditAll ||
                  (canAddOrEditOwn && book.addedByCurrentUser)) && (
                  <button
                    className="btn btn-primary me-2"
                    onClick={() => handleEdit(book.id)}
                  >
                    Edit
                  </button>
                )}
                {(canAddOrEditAll ||
                  (canAddOrEditOwn && book.addedByCurrentUser)) && (
                  <DeleteBook book={book} handleDelete={handleDelete} />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="d-flex justify-content-between align-items-center">
        <div>
          Showing {startIdx + 1}-{endIdx} of {totalBooks} books
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

export default BookList;
