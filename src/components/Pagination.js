import { useState } from "react";

const usePagination = (initialItemsPerPage = 10) => {
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);

  return { itemsPerPage, setItemsPerPage };
};

export default usePagination;