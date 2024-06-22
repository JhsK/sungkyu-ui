import { useState } from "react";

interface IUsePaginationProps<T> {
  data: T[];
  perPage?: number;
}

function usePagination<T>({ data, perPage = 5 }: IUsePaginationProps<T>) {
  const [page, setPage] = useState(1);
  const totalCount = data.length;
  const paginatedData = data.slice(0, page * perPage);
  const maxPage = Math.ceil(totalCount / perPage);

  const handleChangeNextPage = () => {
    if (page >= maxPage) return;
    setPage((prev) => prev + 1);
  };

  const handleChangePage = (gotoPage: number) => {
    if (gotoPage > maxPage || gotoPage < 1) return;
    setPage(gotoPage);
  };

  return {
    page,
    paginatedData,
    perPage,
    handleChangeNextPage,
    handleChangePage,
  };
}

export default usePagination;
