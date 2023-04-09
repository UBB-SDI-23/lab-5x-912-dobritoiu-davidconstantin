import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CreateAuthor() {
  const [author, setAuthor] = useState({
    name: "",
    email: "",
    bio: "",
    country: "",
  });
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("/api/authors", author)
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
    <div>
      <h1>Create Author</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={author.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={author.email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="bio">Bio:</label>
          <textarea
            id="bio"
            name="bio"
            value={author.bio}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <div>
          <label htmlFor="country">Country:</label>
          <input
            type="text"
            id="country"
            name="country"
            value={author.country}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default CreateAuthor;
