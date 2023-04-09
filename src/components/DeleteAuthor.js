import React, { useState } from "react";

function DeleteAuthor(props) {
  const { author, handleDelete } = props;
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const handleConfirm = () => {
    handleDelete(author.id);
    setShowConfirmDialog(false);
  };

  const handleCancel = () => {
    setShowConfirmDialog(false);
  };

  const handleDeleteClick = () => {
    setShowConfirmDialog(true);
  };

  return (
    <>
      {showConfirmDialog && (
        <div>
          <p>Are you sure you want to delete {author.name}?</p>
          <button onClick={handleConfirm}>Yes</button>
          <button onClick={handleCancel}>No</button>
        </div>
      )}
      <button onClick={handleDeleteClick}>Delete</button>
    </>
  );
}

export default DeleteAuthor;
