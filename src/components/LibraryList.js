import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DeleteLibrary from "./DeleteLibrary";

function LibraryList() {
  const [libraries, setLibraries] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(100);
  const navigate = useNavigate();

  const fetchLibraries = useCallback(() => {
    axios
      .get(`/api/libraries?page=${currentPage}&size=${itemsPerPage}`)
      .then((response) => {
        setLibraries(response.data.content);
        setCurrentPage(response.data.number);
      })
      .catch((error) => console.log(error));
  }, [currentPage, itemsPerPage]);

  useEffect(() => {
    fetchLibraries();
  }, [fetchLibraries]);

  const handleEdit = (libraryId) => {
    navigate(`/libraries/${libraryId}/edit`);
  };

  const handleDelete = (libraryId) => {
    axios
      .delete(`/api/libraries/${libraryId}`)
      .then((response) => {
        console.log(response);
        fetchLibraries();
      })
      .catch((error) => console.log(error));
  };

  const handleCreate = () => {
    navigate(`/libraries/create`);
  };

  const [totalLibraries, setTotalLibraries] = useState(0);
  useEffect(() => {
    axios
      .get("/api/libraries/count")
      .then((response) => {
        setTotalLibraries(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const totalPages = Math.max(1, Math.ceil(totalLibraries / itemsPerPage));

  const handleNextPage = () => {
    setCurrentPage(Math.min(currentPage + 1, totalPages - 1));
  };

  const handlePrevPage = () => {
    setCurrentPage(Math.max(currentPage - 1, 0));
  };

  const handleJump = (jump) => {
    setCurrentPage(Math.max(Math.min(currentPage + jump, totalPages - 1), 0));
  };

  const startIdx = currentPage * itemsPerPage;
  const endIdx = Math.min(startIdx + itemsPerPage, totalLibraries);

  return (
    <div className="container">
      <h1 className="mt-5 mb-3">Library List</h1>
      <button className="btn btn-primary mb-3" onClick={handleCreate}>
        Create Library
      </button>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Location</th>
            <th>Rating</th>
            <th>Owner</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {libraries.map((library) => (
            <tr key={library.id}>
              <td>{library.name}</td>
              <td>{library.description}</td>
              <td>{library.location}</td>
              <td>{library.rating}</td>
              <td>{library.owner}</td>
              <td>
                <button
                  className="btn btn-primary me-2"
                  onClick={() => handleEdit(library.id)}
                >
                  Edit
                </button>
                <DeleteLibrary library={library} handleDelete={handleDelete} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="d-flex justify-content-between align-items-center">
        <p>
          Showing {startIdx + 1}-{endIdx} of {totalLibraries} libraries
        </p>
        <div>
          <button className="btn btn-secondary me-2" onClick={handlePrevPage}>
            Prev
          </button>
          <button className="btn btn-secondary me-2" onClick={handleNextPage}>
            Next
          </button>
        </div>
        <div>
          <button
            className="btn btn-secondary me-2"
            onClick={() => handleJump(-100)}
          >
            Back 100
          </button>
          <button
            className="btn btn-secondary me-2"
            onClick={() => handleJump(-10)}
          >
            Back 10
          </button>
          <button
            className="btn btn-secondary me-2"
            onClick={() => handleJump(10)}
          >
            Forward 10
          </button>
          <button
            className="btn btn-secondary me-2"
            onClick={() => handleJump(100)}
          >
            Forward 100
          </button>
        </div>
      </div>
    </div>
  );
}

export default LibraryList;
