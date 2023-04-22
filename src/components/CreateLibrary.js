import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CreateLibrary() {
  const [library, setLibrary] = useState({
    name: "",
    description: "",
    location: "",
    rating: "",
    owner: "",
  });
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("/api/libraries", library)
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
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <h1 class="text-center mb-4">Create Library</h1>
          <form onSubmit={handleSubmit}>
            <div class="mb-3">
              <label class="form-label" htmlFor="name">
                Name:
              </label>
              <input
                type="text"
                class="form-control"
                id="name"
                name="name"
                value={library.name}
                onChange={handleInputChange}
              />
            </div>
            <div class="mb-3">
              <label class="form-label" htmlFor="description">
                Description:
              </label>
              <textarea
                class="form-control"
                id="description"
                name="description"
                value={library.description}
                onChange={handleInputChange}
              ></textarea>
            </div>
            <div class="mb-3">
              <label class="form-label" htmlFor="location">
                Location:
              </label>
              <input
                type="text"
                class="form-control"
                id="location"
                name="location"
                value={library.location}
                onChange={handleInputChange}
              />
            </div>
            <div class="mb-3">
              <label class="form-label" htmlFor="rating">
                Rating:
              </label>
              <input
                type="number"
                class="form-control"
                id="rating"
                name="rating"
                value={library.rating}
                onChange={handleInputChange}
              />
            </div>
            <div class="mb-3">
              <label class="form-label" htmlFor="owner">
                Owner:
              </label>
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
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateLibrary;
