import React, { useState } from "react";

function DeleteLibraryBook(props) {
  const { librarybook, handleDelete } = props;
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const handleConfirm = () => {
    handleDelete(librarybook.id);
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
        <div className="alert alert-danger">
          <p>Are you sure you want to delete LibraryBook {librarybook.id}?</p>
          <button className="btn btn-danger mr-2" onClick={handleConfirm}>
            Yes
          </button>
          <button className="btn btn-secondary" onClick={handleCancel}>
            No
          </button>
        </div>
      )}
      <button className="btn btn-danger" onClick={handleDeleteClick}>
        Delete
      </button>
    </>
  );
}

export default DeleteLibraryBook;