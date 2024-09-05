import { useState } from "react";

interface IUsePaginationProps {
  totalQuantity: number | null;
  quantityPerPage: number;
  currentPage: number;
  onSetPagination: ({ pageNumber }: { pageNumber: number }) => void;
}

function usePagination({
  totalQuantity,
  quantityPerPage,
  currentPage,
  onSetPagination,
}: IUsePaginationProps) {
  const pageCount = 10;
  const totalItemCount = totalQuantity || 1;
  const totalPages = Math.ceil(totalItemCount / quantityPerPage);
  const pageList = Array.from({ length: totalPages }, (_, i) => i + 1);

  const initStep = Math.ceil(currentPage / pageCount); // 1~10 페이지 1 step, 11~20 페이지 2 step
  const [step, setStep] = useState(initStep);
  const disabledPrev = currentPage === 1;
  const disabledPrevStep = disabledPrev || currentPage <= pageCount;

  const disabledNext = currentPage >= totalPages;
  const disabledNextStep =
    disabledNext || Math.ceil(totalPages / pageCount) === step;

  const getPageList = () => {
    const start = Math.floor((currentPage - 1) / pageCount) * pageCount;
    const end = step * pageCount;

    return pageList.slice(start, end);
  };

  const getCursor = (isDisable: boolean) => {
    if (isDisable) return "not-allowed";
    return "pointer";
  };

  const handleNextPage = () => {
    if (disabledNext) return;
    if (currentPage === step * pageCount) {
      setStep((prev) => prev + 1);
    }

    onSetPagination({ pageNumber: currentPage + 1 });
  };

  const handlePreviousPage = () => {
    if (disabledPrev) return;
    if (currentPage === (step - 1) * pageCount + 1) {
      setStep((prev) => prev - 1);
    }

    onSetPagination({ pageNumber: currentPage - 1 });
  };

  const handleNexdStep = () => {
    if (disabledNextStep) return;
    let nextPage = step * pageCount + 1;
    if (nextPage >= totalPages) nextPage = totalPages;

    setStep((prev) => prev + 1);
    onSetPagination({ pageNumber: nextPage });
  };

  const handlePreviousStep = () => {
    if (disabledPrevStep) return;

    const previousPage = (step - 1) * pageCount;
    if (previousPage <= 1 || step === 1) {
      setStep(1);
      onSetPagination({ pageNumber: 1 });
    } else {
      setStep((prev) => prev - 1);
      onSetPagination({
        pageNumber: (step - 1) * pageCount,
      });
    }
  };

  return {
    disabledNext,
    disabledPrev,
    disabledPrevStep,
    disabledNextStep,
    handlePreviousStep,
    handlePreviousPage,
    handleNexdStep,
    handleNextPage,
    getPageList,
    getCursor,
  };
}

export default usePagination;
