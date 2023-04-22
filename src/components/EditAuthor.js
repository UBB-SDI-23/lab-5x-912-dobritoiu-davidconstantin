import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function EditAuthor() {
  const [author, setAuthor] = useState({
    name: "",
    email: "",
    bio: "",
    country: "",
  });

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchAuthor();
  }, []);

  const fetchAuthor = () => {
    axios
      .get(`/api/authors/${id}`)
      .then((response) => setAuthor(response.data))
      .catch((error) => console.log(error));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .put(`/api/authors/${id}`, author)
      .then((response) => {
        console.log(response);
        navigate("/authors");
      })
      .catch((error) => console.log(error));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setAuthor((prevAuthor) => ({
      ...prevAuthor,
      [name]: value,
    }));
  };

  return (
    <div class="container">
      <h1>Edit Author</h1>
      <form onSubmit={handleSubmit}>
        <div class="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            class="form-control"
            id="name"
            name="name"
            value={author.name}
            onChange={handleInputChange}
          />
        </div>
        <div class="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            class="form-control"
            id="email"
            name="email"
            value={author.email}
            onChange={handleInputChange}
          />
        </div>
        <div class="form-group">
          <label htmlFor="bio">Bio:</label>
          <textarea
            class="form-control"
            id="bio"
            name="bio"
            value={author.bio}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <div class="form-group">
          <label htmlFor="country">Country:</label>
          <input
            type="text"
            class="form-control"
            id="country"
            name="country"
            value={author.country}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" class="btn btn-primary">
          Update
        </button>
      </form>
    </div>
  );
}

export default EditAuthor;
