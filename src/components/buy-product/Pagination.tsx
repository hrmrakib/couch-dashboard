"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];

    // Always show first page
    pages.push(
      <button
        key={1}
        onClick={() => goToPage(1)}
        className={`w-8 h-8 flex items-center justify-center rounded-md ${
          currentPage === 1
            ? "bg-gray-800 text-white"
            : "bg-white text-gray-600"
        }`}
      >
        1
      </button>
    );

    // Show ellipsis if needed
    if (currentPage > 3) {
      pages.push(
        <span
          key='ellipsis-1'
          className='w-8 h-8 flex items-center justify-center'
        >
          ...
        </span>
      );
    }

    // Show current page and surrounding pages
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      if (i === 1 || i === totalPages) continue; // Skip first and last page as they're always shown

      pages.push(
        <button
          key={i}
          onClick={() => goToPage(i)}
          className={`w-8 h-8 flex items-center justify-center rounded-md ${
            currentPage === i
              ? "bg-gray-800 text-white"
              : "bg-white text-gray-600"
          }`}
        >
          {i}
        </button>
      );
    }

    // Show ellipsis if needed
    if (currentPage < totalPages - 2) {
      pages.push(
        <span
          key='ellipsis-2'
          className='w-8 h-8 flex items-center justify-center'
        >
          ...
        </span>
      );
    }

    // Always show last page if there's more than one page
    if (totalPages > 1) {
      pages.push(
        <button
          key={totalPages}
          onClick={() => goToPage(totalPages)}
          className={`w-8 h-8 flex items-center justify-center rounded-md ${
            currentPage === totalPages
              ? "bg-gray-800 text-white"
              : "bg-white text-gray-600"
          }`}
        >
          {totalPages}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className='flex items-center space-x-2'>
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className='flex items-center justify-center w-8 h-8 bg-gray-800 text-white rounded-md disabled:opacity-50'
      >
        <ArrowLeft className='w-4 h-4' />
      </button>

      <div className='flex items-center space-x-1'>{renderPageNumbers()}</div>

      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className='flex items-center justify-center w-8 h-8 bg-gray-800 text-white rounded-md disabled:opacity-50'
      >
        <ArrowRight className='w-4 h-4' />
      </button>

      <div className='flex items-center ml-2 text-sm'>
        <span className='mr-2'>Page</span>
        <input
          type='number'
          min={1}
          max={totalPages}
          value={currentPage}
          onChange={(e) => {
            const page = Number.parseInt(e.target.value);
            if (!isNaN(page)) goToPage(page);
          }}
          className='w-12 h-8 border rounded-md text-center'
        />
        <span className='ml-2'>Go</span>
      </div>
    </div>
  );
}
