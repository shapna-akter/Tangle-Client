import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    console.log(`Pagination: currentPage: ${currentPage}, totalPages: ${totalPages}` );
  const renderPageNumbers = () => {
    const pages = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <button
            key={i}
            className={`join-item btn ${currentPage === i ? 'btn-disabled' : ''}`}
            onClick={() => onPageChange(i)}
          >
            {i}
          </button>
        );
      }
    } else {
      // Handle edge cases and show ellipsis for large number of pages
      if (currentPage <= 3) {
        for (let i = 1; i <= 3; i++) {
          pages.push(
            <button
              key={i}
              className={`join-item btn ${currentPage === i ? 'btn-disabled' : ''}`}
              onClick={() => onPageChange(i)}
            >
              {i}
            </button>
          );
        }
        pages.push(<button key="ellipsis" className="join-item btn btn-disabled">...</button>);
        pages.push(<button key={totalPages} className="join-item btn" onClick={() => onPageChange(totalPages)}>{totalPages}</button>);
      } else if (currentPage >= totalPages - 2) {
        pages.push(<button key={1} className="join-item btn" onClick={() => onPageChange(1)}>1</button>);
        pages.push(<button key="ellipsis" className="join-item btn btn-disabled">...</button>);
        for (let i = totalPages - 2; i <= totalPages; i++) {
          pages.push(
            <button
              key={i}
              className={`join-item btn ${currentPage === i ? 'btn-disabled' : ''}`}
              onClick={() => onPageChange(i)}
            >
              {i}
            </button>
          );
        }
      } else {
        pages.push(<button key={1} className="join-item btn" onClick={() => onPageChange(1)}>1</button>);
        pages.push(<button key="ellipsis1" className="join-item btn btn-disabled">...</button>);
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(
            <button
              key={i}
              className={`join-item btn ${currentPage === i ? 'btn-disabled' : ''}`}
              onClick={() => onPageChange(i)}
            >
              {i}
            </button>
          );
        }
        pages.push(<button key="ellipsis2" className="join-item btn btn-disabled">...</button>);
        pages.push(<button key={totalPages} className="join-item btn" onClick={() => onPageChange(totalPages)}>{totalPages}</button>);
      }
    }

    return pages;
  };

  return (
    <div className="join">
      <button
        className={`join-item btn ${currentPage === 1 ? 'btn-disabled' : ''}`}
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
      >
        Previous
      </button>
      {renderPageNumbers()}
      <button
        className={`join-item btn ${currentPage === totalPages ? 'btn-disabled' : ''}`}
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
