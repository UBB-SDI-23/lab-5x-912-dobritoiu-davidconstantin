import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function EditLibrary() {
  const [library, setLibrary] = useState({
    name: "",
    description: "",
    location: "",
    rating: "",
    owner: "",
  });

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchLibrary();
  }, []);

  const fetchLibrary = () => {
    axios
      .get(`/api/libraries/${id}`)
      .then((response) => setLibrary(response.data))
      .catch((error) => console.log(error));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .put(`/api/libraries/${id}`, library)
      .then((response) => {
        console.log(response);
        navigate("/libraries");
      })
      .catch((error) => console.log(error));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setLibrary((prevLibrary) => ({
      ...prevLibrary,
      [name]: value,
    }));
  };

  return (
    <div class="container">
      <h1>Edit Library</h1>
      <form onSubmit={handleSubmit}>
        <div class="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            class="form-control"
            id="name"
            name="name"
            value={library.name}
            onChange={handleInputChange}
          />
        </div>
        <div class="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            class="form-control"
            id="description"
            name="description"
            value={library.description}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <div class="form-group">
          <label htmlFor="location">Location:</label>
          <input
            type="location"
            class="form-control"
            id="location"
            name="location"
            value={library.location}
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
            value={library.rating}
            onChange={handleInputChange}
          />
        </div>
        <div class="form-group">
          <label htmlFor="rating">Owner:</label>
          <input
            type="text"
            class="form-control"
            id="owner"
            name="owner"
            value={library.owner}
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

export default EditLibrary;
