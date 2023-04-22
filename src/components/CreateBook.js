import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CreateBook() {
  const [book, setBook] = useState({
    title: "",
    year: "",
    rating: "",
    price: "",
    authorId: "",
  });
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("/api/books", book)
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
    <div class="container">
      <h1>Create Book</h1>
      <form onSubmit={handleSubmit}>
        <div class="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            class="form-control"
            id="title"
            name="title"
            value={book.title}
            onChange={handleInputChange}
          />
        </div>
        <div class="form-group">
          <label htmlFor="year">Year:</label>
          <input
            type="number"
            class="form-control"
            id="year"
            name="year"
            value={book.year}
            onChange={handleInputChange}
          />
        </div>
        <div class="form-group">
          <label htmlFor="rating">Rating:</label>
          <input
            type="number"
            class="form-control"
            id="rating"
            name="rating"
            value={book.rating}
            onChange={handleInputChange}
          />
        </div>
        <div class="form-group">
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            class="form-control"
            id="price"
            name="price"
            value={book.price}
            onChange={handleInputChange}
          />
        </div>
        <div class="form-group">
          <label htmlFor="author">Author ID:</label>
          <input
            type="number"
            class="form-control"
            id="author"
            name="author"
            value={book.authorId}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" class="btn btn-primary">
          Create
        </button>
      </form>
    </div>
  );
}

export default CreateBook;
