import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

interface PaginationProps {
  currentPage: number;
  setCurrentPage: (number: number) => void;
  totalPage: number;
}

export function Practicepagination({
  currentPage,
  setCurrentPage,
  totalPage,
}: PaginationProps) {
  const TOTAL_PAGE_NUM = totalPage;
  const PAGES_PER_SET = 5;

  const handlePageClick = (pageNum: number) => {
    setCurrentPage(pageNum);
  };

  const handlePreviousClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < TOTAL_PAGE_NUM) {
      setCurrentPage(currentPage + 1);
    }
  };

  const getCurrentPageSet = () => {
    const currentSet = Math.ceil(currentPage / PAGES_PER_SET);
    const startPage = (currentSet - 1) * PAGES_PER_SET + 1;
    const endPage = Math.min(startPage + PAGES_PER_SET - 1, TOTAL_PAGE_NUM);
    return { startPage, endPage };
  };

  const renderPaginationItems = () => {
    const { startPage, endPage } = getCurrentPageSet();
    const items = [];
    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink
            href="#"
            isActive={i === currentPage}
            onClick={(e) => {
              e.preventDefault();
              handlePageClick(i);
            }}
          >
            {i}
          </PaginationLink>
        </PaginationItem>,
      );
    }
    return items;
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={handlePreviousClick}
            aria-disabled={currentPage === 1}
          />
        </PaginationItem>
        {renderPaginationItems()}
        <PaginationItem>
          <PaginationNext
            onClick={handleNextClick}
            aria-disabled={currentPage === TOTAL_PAGE_NUM}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
