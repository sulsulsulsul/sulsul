import { Dispatch, SetStateAction, useState } from 'react';

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { QuestionSearchType } from '@/entities/types/question';

import { QuestionCollection } from '../../view';

interface PaginationProps {
  currentPage: number;
  setCurrentPage: (number: number) => void;
  collect: QuestionCollection[];
  totalPage: number;
  list: QuestionSearchType[];
  selectAll: boolean;
  setSelectQuestion: Dispatch<SetStateAction<QuestionSearchType[]>>;
}

export function Practicepagination({
  currentPage,
  setCurrentPage,
  totalPage,
  collect,
  list,
  selectAll,
  setSelectQuestion,
}: PaginationProps) {
  const TOTAL_PAGE_NUM = totalPage;
  const PAGES_PER_SET = 5;

  const handlePageClick = (pageNum: number) => {
    collect[currentPage - 1] = {
      list: list,
      page: currentPage - 1,
      select: selectAll,
    };
    setSelectQuestion([]);
    setCurrentPage(pageNum);
  };

  const handlePreviousClick = () => {
    collect[currentPage - 1] = {
      list: list,
      page: currentPage - 1,
      select: selectAll,
    };
    setSelectQuestion([]);
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    collect[currentPage - 1] = {
      list: list,
      page: currentPage - 1,
      select: selectAll,
    };
    setSelectQuestion([]);
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
