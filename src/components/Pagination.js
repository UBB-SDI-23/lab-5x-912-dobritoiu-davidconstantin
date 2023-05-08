import { useState } from "react";

const usePagination = (initialItemsPerPage) => {
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);

  return { itemsPerPage, setItemsPerPage };
};

export default usePagination;