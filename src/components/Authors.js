import React, { useState, useEffect } from "react";
import axios from "axios";

function AuthorList() {
  const [authors, setAuthors] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bio: "",
    country: "",
  });
  const [filteredAuthors, setFilteredAuthors] = useState([]);

  useEffect(() => {
    fetchAuthors();
  }, []);

  const handleFilter = () => {
    axios
      .get("http://18.156.129.65/authors/filterAuthorsByNumberOfBooks")
      .then((response) => {
        const filteredData = response.data
          .filter((author) => author.booksCount > 0)
          .map((author) => {
            return {
              id: author.authorId,
              name: author.authorName,
              booksCount: author.booksCount,
            };
          });
        setFilteredAuthors(filteredData);
      })
      .catch((error) => console.log(error));
  };

  const fetchAuthors = () => {
    axios
      .get("http://18.156.129.65/authors")
      .then((response) => setAuthors(response.data))
      .catch((error) => console.log(error));
  };

  const handleCreate = (e) => {
    e.preventDefault();
    axios
      .post("http://18.156.129.65/authors", formData)
      .then((response) => {
        console.log(response);
        setFormData({ name: "", email: "", bio: "", country: "" });
        fetchAuthors();
      })
      .catch((error) => console.log(error));
  };

  const handleEdit = (authorId) => {
    const authorToUpdate = authors.find((author) => author.id === authorId);
    setFormData(authorToUpdate);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put(`http://18.156.129.65/authors/${formData.id}`, formData)
      .then((response) => {
        console.log(response);
        setFormData({ name: "", email: "", bio: "", country: "" });
        fetchAuthors();
      })
      .catch((error) => console.log(error));
  };

  const handleDelete = (authorId) => {
    axios
      .delete(`http://18.156.129.65/authors/${authorId}`)
      .then((response) => {
        console.log(response);
        fetchAuthors();
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <h1>Author List</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Bio</th>
            <th>Country</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {authors.map((author) => (
            <tr key={author.id}>
              <td>{author.name}</td>
              <td>{author.email}</td>
              <td>{author.bio}</td>
              <td>{author.country}</td>
              <td>
                <button onClick={() => handleEdit(author.id)}>Edit</button>
                <button onClick={() => handleDelete(author.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Create Author</h2>
      <form onSubmit={handleCreate}>
        <label>
          Name:
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </label>
        <label>
          Bio:
          <textarea
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
          ></textarea>
        </label>
        <label>
          Country:
          <input
            type="text"
            value={formData.country}
            onChange={(e) =>
              setFormData({ ...formData, country: e.target.value })
            }
          />
        </label>
        <button type="submit">Create</button>
      </form>

      <h2>Edit Author</h2>
      <form onSubmit={handleUpdate}>
        <label>
          Name:
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </label>
        <label>
          Bio:
          <textarea
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
          ></textarea>
        </label>
        <label>
          Country:
          <input
            type="text"
            value={formData.country}
            onChange={(e) =>
              setFormData({ ...formData, country: e.target.value })
            }
          />
        </label>
        <button type="submit">Update</button>
      </form>


      {filteredAuthors.length > 0 && (
        <div>
          <h1>Filtered Author Book Counts</h1>
          <table>
            <thead>
              <tr>
                <th>Author Name</th>
                <th>Book Count</th>
              </tr>
            </thead>
            <tbody>
              {filteredAuthors.map((author) => (
                <tr key={author.id}>
                  <td>{author.name}</td>
                  <td>{author.booksCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AuthorList;
