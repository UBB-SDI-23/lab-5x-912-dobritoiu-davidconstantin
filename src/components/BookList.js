import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DeleteBook from "./DeleteBook";

function BookList() {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(100);
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

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const handleEdit = (bookId) => {
    navigate(`/books/${bookId}/edit`);
  };

  const handleDelete = (bookId) => {
    axios
      .delete(`/api/books/${bookId}`)
      .then((response) => {
        console.log(response);
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

  const startIdx = currentPage * itemsPerPage;
  const endIdx = Math.min(startIdx + itemsPerPage, totalBooks);

  return (
    <div className="container">
      <h1 className="my-4">Book List</h1>
      <button className="btn btn-primary mb-4" onClick={handleCreate}>
        Create Book
      </button>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Year</th>
            <th>Rating</th>
            <th>Price</th>
            <th>Author</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.year}</td>
              <td>{book.rating}</td>
              <td>{book.price}</td>
              <td>{book.authorId}</td>
              <td>
                <button
                  className="btn btn-sm btn-info mr-2"
                  onClick={() => handleEdit(book.id)}
                >
                  Edit
                </button>
                <DeleteBook book={book} handleDelete={handleDelete} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="d-flex justify-content-between align-items-center">
        <p>
          Showing {startIdx + 1}-{endIdx} of {totalBooks} books
        </p>
        <div>
          <button
            className="btn btn-outline-primary mr-2"
            onClick={handlePrevPage}
          >
            Prev
          </button>
          <button
            className="btn btn-outline-primary mr-4"
            onClick={handleNextPage}
          >
            Next
          </button>
        </div>
        <div>
          <button
            className="btn btn-outline-secondary mr-2"
            onClick={() => handleJump(-100)}
          >
            Back 100
          </button>
          <button
            className="btn btn-outline-secondary mr-2"
            onClick={() => handleJump(-10)}
          >
            Back 10
          </button>
          <button
            className="btn btn-outline-secondary mr-2"
            onClick={() => handleJump(10)}
          >
            Forward 10
          </button>
          <button
            className="btn btn-outline-secondary"
            onClick={() => handleJump(100)}
          >
            Forward 100
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookList;
