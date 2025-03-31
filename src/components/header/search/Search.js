import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { searchProducts } from '../../../redux/actions/productActions';
import { Button } from '../..';
import './Search.css';

const HeaderSearch = ({ 
  showSearch, 
  searchTerm, 
  toggleSearch, 
  updateSearchTerm 
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      dispatch(searchProducts(searchTerm));
      navigate(`/products?q=${encodeURIComponent(searchTerm)}`);
      toggleSearch();
      updateSearchTerm('');
    }
  };

  return (
    <div className="search-container">
      <a href="#" className="icon-link" onClick={(e) => {
        e.preventDefault();
        toggleSearch();
      }}>
        <i className="fas fa-search"></i>
      </a>
      {showSearch && (
        <div className="search-box content-box">
          <form onSubmit={handleSearch} className="flex-row">
            <input
              id="search-input"
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => updateSearchTerm(e.target.value)}
              autoFocus
            />
            <Button type="submit">
              <i className="fas fa-search"></i>
            </Button>
          </form>
        </div>
      )}
    </div>
  );
};

export default HeaderSearch; 