import { useContext } from "react";
import { PaginationContext } from "./PaginationContext";

function EntitiesPerPage() {
  const { itemsPerPage, setItemsPerPage } = useContext(PaginationContext);

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value));
  };

  return (
    <div className="form-group">
      <label htmlFor="items-per-page">Items per page:</label>
      <div className="input-group">
        <input
          id="items-per-page"
          className="form-control"
          type="number"
          min="1"
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
        />
        <button className="btn btn-primary">Update</button>
      </div>
    </div>
  );
}

export default EntitiesPerPage;
