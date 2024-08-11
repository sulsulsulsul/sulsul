import { Dispatch, SetStateAction } from 'react';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

interface PracticeListPaginationProp {
  isActive: boolean;
  currentPage: number;
  pages: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}

export default function PracticeListPagination({
  isActive,
  currentPage,
  pages,
  setCurrentPage,
}: PracticeListPaginationProp) {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">{startPage}</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            {startPage + 1}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">{currentPage}</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">{endPage - 1}</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">{endPage}</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={nextClick}
            aria-disabled={endPage === pages}
          ></PaginationNext>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
