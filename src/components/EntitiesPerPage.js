import usePagination from "./Pagination";

function EntitiesPerPage() {
  const { itemsPerPage, setItemsPerPage } = usePagination();

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value));
  };

  return (
    <div className="form-group">
      <label htmlFor="items-per-page">Items per page:</label>
      <input
        id="items-per-page"
        className="form-control"
        type="number"
        min="1"
        value={itemsPerPage}
        onChange={handleItemsPerPageChange}
      />
    </div>
  );
}

export default EntitiesPerPage;
