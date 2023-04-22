import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function EditBook() {
  const [book, setBook] = useState({
    name: "",
    email: "",
    bio: "",
    country: "",
  });

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchBook();
  }, []);

  const fetchBook = () => {
    axios
      .get(`/api/books/${id}`)
      .then((response) => setBook(response.data))
      .catch((error) => console.log(error));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .put(`/api/books/${id}`, book)
      .then((response) => {
        console.log(response);
        navigate("/books");
      })
      .catch((error) => console.log(error));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));
  };

  return (
    <div className="container">
      <h1>Edit Book</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            className="form-control"
            type="text"
            id="title"
            name="title"
            value={book.title}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="year">Year:</label>
          <input
            className="form-control"
            type="number"
            id="year"
            name="year"
            value={book.year}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="rating">Rating:</label>
          <input
            className="form-control"
            type="number"
            id="rating"
            name="rating"
            value={book.rating}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input
            className="form-control"
            type="number"
            id="price"
            name="price"
            value={book.price}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="author">Author ID:</label>
          <input
            className="form-control"
            type="number"
            id="author"
            name="author"
            value={book.authorId}
            onChange={handleInputChange}
          />
        </div>
        <button className="btn btn-primary" type="submit">
          Update
        </button>
      </form>
    </div>
  );
}

export default EditBook;
