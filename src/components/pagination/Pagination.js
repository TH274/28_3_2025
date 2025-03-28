import React from 'react';
import PropTypes from 'prop-types';
import Button from '../button/Button';
import './Pagination.css';

const Pagination = ({ currentPage, totalPages, totalItems, itemsPerPage, onPageChange }) => {
  const calculatedTotalPages = totalItems && itemsPerPage ? Math.ceil(totalItems / itemsPerPage) : totalPages;
  
  const getPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= calculatedTotalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < calculatedTotalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="pagination">
      <Button 
        className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}
        onClick={handlePrev}
        disabled={currentPage === 1}
        size="small"
      >
        Prev
      </Button>

      {getPageNumbers().map((page) => (
        <Button
          key={page}
          className={`page-item ${currentPage === page ? 'active' : ''}`}
          onClick={() => onPageChange(page)}
          size="small"
          variant={currentPage === page ? 'primary' : 'secondary'}
        >
          {page}
        </Button>
      ))}

      <Button
        className={`page-item ${currentPage === calculatedTotalPages ? 'disabled' : ''}`}
        onClick={handleNext}
        disabled={currentPage === calculatedTotalPages}
        size="small"
      >
        Next
      </Button>
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number,
  totalItems: PropTypes.number,
  itemsPerPage: PropTypes.number,
  onPageChange: PropTypes.func.isRequired,
};

Pagination.defaultProps = {
  totalPages: 1,
  totalItems: null,
  itemsPerPage: null
};

export default Pagination;