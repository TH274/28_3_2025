import React, { useState, useRef, useEffect } from 'react';
import './FilterDropdown.css';

const FilterDropdown = ({ title, options, activeFilter, setFilter }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  const handleFilterChange = (option) => {
    setFilter(activeFilter === option ? '' : option);
    setIsOpen(false);
  };
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="filter-dropdown" ref={dropdownRef}>
      <button 
        className={`filter-button ${activeFilter ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {title} {isOpen ? '▲' : '▼'}
      </button>
      
      {isOpen && (
        <div className="filter-dropdown-menu">
          {options.map((option) => (
            <div
              key={option}
              className={`dropdown-item ${activeFilter === option ? 'selected' : ''}`}
              onClick={() => handleFilterChange(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterDropdown; 