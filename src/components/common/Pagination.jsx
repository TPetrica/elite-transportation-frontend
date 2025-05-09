import React from 'react'

export default function Pagination({ currentPage = 1, totalPages = 10, onPageChange }) {
  // Generate an array of page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = []
    
    // Always show first page
    pageNumbers.push(1)
    
    // If current page is not 1 and not 2, show ellipsis after page 1
    if (currentPage > 3) {
      pageNumbers.push('...')
    }
    
    // Show current page and one before/after if they're not already included
    if (currentPage > 2) {
      pageNumbers.push(currentPage - 1)
    }
    
    if (currentPage !== 1 && currentPage !== totalPages) {
      pageNumbers.push(currentPage)
    }
    
    if (currentPage < totalPages - 1) {
      pageNumbers.push(currentPage + 1)
    }
    
    // If current page is not near the last page, show ellipsis before last page
    if (currentPage < totalPages - 2) {
      pageNumbers.push('...')
    }
    
    // Always show last page if there's more than one page
    if (totalPages > 1) {
      pageNumbers.push(totalPages)
    }
    
    // Remove duplicates
    return pageNumbers.filter((page, index, self) => 
      self.indexOf(page) === index
    )
  }

  const pageNumbers = getPageNumbers()

  return (
    <ul className="pagination">
      <li className="page-item">
        <a
          className="page-link page-prev cursor-pointer"
          onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
          style={{ opacity: currentPage === 1 ? 0.5 : 1, cursor: currentPage === 1 ? 'default' : 'pointer' }}
        >
          <svg
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            ></path>
          </svg>
        </a>
      </li>
      
      {pageNumbers.map((page, index) => (
        <li key={index} className="page-item">
          {page === '...' ? (
            <span className="page-link">...</span>
          ) : (
            <a
              onClick={() => onPageChange(page)}
              className={`page-link cursor-pointer ${page === currentPage ? 'active' : ''}`}
            >
              {page}
            </a>
          )}
        </li>
      ))}
      
      <li className="page-item">
        <a
          className="page-link page-next cursor-pointer"
          onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
          style={{ opacity: currentPage === totalPages ? 0.5 : 1, cursor: currentPage === totalPages ? 'default' : 'pointer' }}
        >
          <svg
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            ></path>
          </svg>
        </a>
      </li>
    </ul>
  )
}
