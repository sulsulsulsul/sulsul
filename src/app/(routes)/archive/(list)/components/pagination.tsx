import { useState } from 'react'

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

export function PaginationDemo() {
  const totalPageNum = 3
  const pagesPerSet = 5
  const [currentPage, setCurrentPage] = useState(1)

  const handlePageClick = (pageNum: number) => {
    setCurrentPage(pageNum)
  }

  const handlePreviousClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleNextClick = () => {
    if (currentPage < totalPageNum) {
      setCurrentPage(currentPage + 1)
    }
  }

  const getCurrentPageSet = () => {
    const currentSet = Math.ceil(currentPage / pagesPerSet)
    const startPage = (currentSet - 1) * pagesPerSet + 1
    const endPage = Math.min(startPage + pagesPerSet - 1, totalPageNum)
    return { startPage, endPage }
  }

  const renderPaginationItems = () => {
    const { startPage, endPage } = getCurrentPageSet()
    const items = []
    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink
            href="#"
            isActive={i === currentPage}
            onClick={(e) => {
              e.preventDefault()
              handlePageClick(i)
            }}
          >
            {i}
          </PaginationLink>
        </PaginationItem>,
      )
    }
    return items
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={handlePreviousClick}
            aria-disabled={currentPage === 1}
          />
        </PaginationItem>
        {renderPaginationItems()}
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={handleNextClick}
            aria-disabled={currentPage === totalPageNum}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
