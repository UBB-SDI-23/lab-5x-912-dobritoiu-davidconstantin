import React, { useState, useEffect } from "react";
import axios from "axios";

const FilteredAuthorList = () => {
  const [authors, setAuthors] = useState([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);

  useEffect(() => {
    const fetchAuthors = async () => {
      const response = await axios.get(
        `/api/authors/filterAuthorsByNumberOfBooks?count=1&page=${page}&size=${size}`
      );
      setAuthors(response.data.content);
    };
    fetchAuthors();
  }, [page, size]);

  const handlePrevious = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  const handleNext = () => {
    setPage(page + 1);
  };

  return (
    <div>
      <h2>Authors</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Number of Books</th>
          </tr>
        </thead>
        <tbody>
          {authors.map((author) => (
            <tr key={author.authorId}>
              <td>{author.authorId}</td>
              <td>{author.authorName}</td>
              <td>{author.booksCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={handlePrevious} disabled={page === 0}>
          Previous
        </button>
        <button onClick={handleNext} disabled={authors.length < size}>
          Next
        </button>
      </div>
    </div>
  );
};

export default FilteredAuthorList;
