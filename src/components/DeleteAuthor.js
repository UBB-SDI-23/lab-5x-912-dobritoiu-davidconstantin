import React from 'react';

const DeleteAuthor = ({ author, handleDelete }) => {
  const handleClick = () => {
    if (window.confirm(`Are you sure you want to delete ${author.name}?`)) {
      handleDelete(author.id);
    }
  };

  return (
    <button type="button" className="btn btn-danger" onClick={handleClick}>
      Delete
    </button>
  );
};

export default DeleteAuthor;
