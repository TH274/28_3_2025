import React, { useRef, useEffect, useState } from 'react';
import FilterDropdown from './FilterDropdown';
import './FiltersContainer.css';

const FiltersContainer = ({ 
  filterOptions, 
  activeFilters, 
  setActiveFilters, 
  sortOptions = [],
  sortOption,
  setSortOption,
  sortMenuOpen: externalSortMenuOpen,
  setSortMenuOpen: externalSetSortMenuOpen,
}) => {
  const [internalSortMenuOpen, setInternalSortMenuOpen] = useState(false);
  
  const sortMenuOpen = externalSortMenuOpen !== undefined ? externalSortMenuOpen : internalSortMenuOpen;
  const setSortMenuOpen = externalSetSortMenuOpen || setInternalSortMenuOpen;
  
  const sortContainerRef = useRef(null);
  
  const handleSortChange = (value) => {
    if (setSortOption) {
      setSortOption(value);
    }
    setSortMenuOpen(false);
  };
  
  const hasActiveFilters = () => {
    return activeFilters.category || activeFilters.gloveSize || activeFilters.gloveType;
  };
  
  const handleClearAllFilters = () => {
    setActiveFilters({
      ...activeFilters,
      category: '',
      gloveSize: '',
      gloveType: ''
    });
  };
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sortContainerRef.current && !sortContainerRef.current.contains(event.target)) {
        setSortMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setSortMenuOpen]);

  return (
    <div className="filter-bar">
      <div className="filters-container">
        <FilterDropdown 
          title="CATEGORY" 
          options={filterOptions.category}
          activeFilter={activeFilters.category}
          setFilter={(option) => setActiveFilters({...activeFilters, category: option})}
        />
        <FilterDropdown 
          title="SIZE" 
          options={filterOptions.gloveSize}
          activeFilter={activeFilters.gloveSize}
          setFilter={(option) => setActiveFilters({...activeFilters, gloveSize: option})}
        />
        <FilterDropdown 
          title="TYPE" 
          options={filterOptions.gloveType}
          activeFilter={activeFilters.gloveType}
          setFilter={(option) => setActiveFilters({...activeFilters, gloveType: option})}
        />
        
        {hasActiveFilters() && (
          <button 
            className="clear-all-button"
            onClick={handleClearAllFilters}
          >
            CLEAR FILTER
          </button>
        )}
      </div>
      
      <div className="filter-controls">
        <div className="sort-container" ref={sortContainerRef}>
          <button 
            className="sort-button" 
            onClick={() => setSortMenuOpen(!sortMenuOpen)}
          >
            SORT BY: {sortOption || 'DEFAULT'} {sortMenuOpen ? '▲' : '▼'}
          </button>
          {sortMenuOpen && (
            <div className="sort-menu">
              {sortOptions?.map((option) => (
                <div
                  key={option.value}
                  className={`sort-option ${sortOption === option.value ? 'selected' : ''}`}
                  onClick={() => handleSortChange(option.value)}
                >
                  {option.label}
                </div>
              ))}
            </div>
          )}
        </div>
        <span className="item-count">{activeFilters.totalItems || 0} items</span>
      </div>
    </div>
  );
};

export default FiltersContainer; 