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
  const [sortedAuthors, setSortedAuthors] = useState([]);

  useEffect(() => {
    fetchAuthors();
  }, []);

  const handleFilter = () => {
    axios
      .get("/api/authors/filterAuthorsByNumberOfBooks")
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

  function sortAuthors(authors, field, isAscending) {
    const compareFunction = (a, b) => {
      const valueA = a[field];
      const valueB = b[field];

      if (typeof valueA === "string" && typeof valueB === "string") {
        return isAscending
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }

      return isAscending ? valueA - valueB : valueB - valueA;
    };

    return [...authors].sort(compareFunction);
  }

  function handleSort(field) {
    axios
      .get("/api/authors")
      .then((response) => {
        if (!Array.isArray(response.data)) {
          console.log("Author data is not an array.");
          return;
        }
        const isAscending = field === "name";
        const sorted = sortAuthors([...response.data], field, isAscending);
        setSortedAuthors(sorted);
      })
      .catch((error) => console.log(error));
  }

  const fetchAuthors = () => {
    axios
      .get("/api/authors")
      .then((response) => setAuthors(response.data))
      .catch((error) => console.log(error));
  };

  const handleCreate = (e) => {
    e.preventDefault();
    axios
      .post("/api/authors", formData)
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
      .put(`/api/authors/${formData.id}`, formData)
      .then((response) => {
        console.log(response);
        setFormData({ name: "", email: "", bio: "", country: "" });
        fetchAuthors();
      })
      .catch((error) => console.log(error));
  };

  const handleDelete = (authorId) => {
    axios
      .delete(`/api/authors/${authorId}`)
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

      <button onClick={handleFilter}>Filter</button>
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
      <button onClick={() => handleSort('name')}>Sort by Name</button>
      {sortedAuthors.length > 0 && (
        <div>
          <h1>Sorted Authors</h1>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Bio</th>
                <th>Country</th>
              </tr>
            </thead>
            <tbody>
              {sortedAuthors.map((author) => (
                <tr key={author.id}>
                  <td>{author.name}</td>
                  <td>{author.email}</td>
                  <td>{author.bio}</td>
                  <td>{author.country}</td>
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
