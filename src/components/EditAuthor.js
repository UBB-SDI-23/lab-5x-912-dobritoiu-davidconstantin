import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { BrowserRouter as Router } from "react-router-dom";

function EditAuthor() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [author, setAuthor] = useState({});

  useEffect(() => {
    axios
      .get(`/api/authors/${id}`)
      .then((response) => setAuthor(response.data))
      .catch((error) => console.log(error));
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setAuthor({ ...author, [name]: value });
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

  return (
    <Router>
        <div>
      <h1>Edit Author</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={author.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={author.email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Bio:</label>
          <textarea
            name="bio"
            value={author.bio}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Country:</label>
          <input
            type="text"
            name="country"
            value={author.country}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
    </Router>
  );
}

export default EditAuthor;
