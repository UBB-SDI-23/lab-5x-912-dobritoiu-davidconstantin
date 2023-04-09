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
      <div>
        <h1>Edit Author</h1>
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
          <button type="submit">Update</button>
        </form>
      </div>
  );
}

export default EditAuthor;
