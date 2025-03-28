import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';
import { FiltersContainer, LoadingSpinner, Pagination, ProductGrid } from '../../components';
import { getFilterOptions, getSortOptions } from '../../api/staticDataApi/staticDataApi';
import { fetchProducts, fetchProductsByCategory, searchProducts } from '../../redux/actions/productActions';
import './ProductsPage.css';

const ProductsPage = () => {
  const dispatch = useDispatch();
  const { category: pathCategory } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('q');
  const queryCategory = searchParams.get('category');
  const queryType = searchParams.get('type');
  const querySize = searchParams.get('size');
  const pageParam = searchParams.get('page');
  
  const category = pathCategory || queryCategory;
  const itemsPerPage = useSelector(state => state.products.itemsPerPage);
  
  const { products, loading, error, totalProducts, searchResults, searchLoading } = useSelector(state => state.products);
  
  const [currentPage, setCurrentPage] = useState(pageParam ? parseInt(pageParam, 10) : 1);
  const [filterOptions, setFilterOptions] = useState(null);
  const [sortOptions, setSortOptions] = useState([]);
  const [filterLoading, setFilterLoading] = useState(true);
  const [activeFilters, setActiveFilters] = useState({
    category: '',
    gloveSize: '',
    gloveType: ''
  });
  const [sortOption, setSortOption] = useState('');
  const [sortMenuOpen, setSortMenuOpen] = useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setFilterLoading(true);
        const [filterData, sortData] = await Promise.all([
          getFilterOptions(),
          getSortOptions()
        ]);
        setFilterOptions(filterData);
        setSortOptions(sortData);
      } catch (error) {
        console.error('Error fetching filter and sort options:', error);
      } finally {
        setFilterLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFilterChange = (newFilters) => {
    setActiveFilters(newFilters);
    
    const newParams = new URLSearchParams(searchParams);
    
    newParams.delete('page');
    
    if (newFilters.gloveSize) {
      newParams.set('size', newFilters.gloveSize);
    } else {
      newParams.delete('size');
    }
    
    if (newFilters.gloveType) {
      newParams.set('type', newFilters.gloveType);
    } else {
      newParams.delete('type');
    }
    
    if (!pathCategory && newFilters.category) {
      newParams.set('category', newFilters.category);
    } else if (!pathCategory) {
      newParams.delete('category');
    }
    
    setSearchParams(newParams);
  };
  
  useEffect(() => {
    if (pageParam && parseInt(pageParam, 10) !== currentPage) {
      setCurrentPage(parseInt(pageParam, 10));
    }
  }, [pageParam]);
  
  useEffect(() => {
    const initialFilters = {
      ...activeFilters,
      category: category || '',
      gloveType: queryType || '',
      gloveSize: querySize || ''
    };
    
    setActiveFilters(initialFilters);
    
    if (!pageParam) {
      setCurrentPage(1);
    }
  }, [pathCategory, queryCategory, queryType, querySize]);
  
  
  useEffect(() => {
    const filters = {};
    
    Object.entries(activeFilters).forEach(([key, value]) => {
      if (value) {
        if (key === 'gloveSize') {
          filters['size'] = value;
        } else if (key === 'gloveType') {
          filters['type'] = value;
        } else {
          filters[key] = value;
        }
      }
    });
        
    if (searchQuery) {
      dispatch(searchProducts(searchQuery, currentPage, itemsPerPage));
    } else if (category) {
      dispatch(fetchProductsByCategory(category, currentPage, itemsPerPage, filters));
    } else {
      dispatch(fetchProducts(currentPage, itemsPerPage, filters));
    }
  }, [dispatch, category, activeFilters, currentPage, itemsPerPage, searchQuery]);
  
  const handlePageChange = (pageNumber) => {
    if (pageNumber !== currentPage) {
      setCurrentPage(pageNumber);
      
      const newParams = new URLSearchParams(searchParams);
      newParams.set('page', pageNumber);
      setSearchParams(newParams);
      
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  const getPageTitle = () => {
    if (searchQuery) {
      return `Search Results for "${searchQuery}"`;
    } else if (category) {
      const categoryName = category.charAt(0).toUpperCase() + category.slice(1);
      let title = categoryName;
      
      if (activeFilters.gloveType) {
        title += ` - ${activeFilters.gloveType.charAt(0).toUpperCase() + activeFilters.gloveType.slice(1)}`;
      }
      
      if (activeFilters.gloveSize) {
        title += ` - ${activeFilters.gloveSize.toUpperCase()}`;
      }
      
      return title;
    } else {
      return 'All Products';
    }
  };
  
  const displayedProducts = searchQuery ? (searchResults || []) : (products || []);
  const isLoading = searchQuery ? searchLoading : loading;
  const totalItems = totalProducts;

  if (filterLoading) {
    return <LoadingSpinner />;
  }
  
  return (
    <main className="products-page">
      <div className="container">
        <h1 className="page-title">{getPageTitle()}</h1>
        
        {filterOptions && (
          <FiltersContainer 
            filterOptions={filterOptions}
            activeFilters={{...activeFilters, totalItems}}
            setActiveFilters={handleFilterChange}
            sortOptions={sortOptions}
            sortOption={sortOption}
            setSortOption={setSortOption}
            sortMenuOpen={sortMenuOpen}
            setSortMenuOpen={setSortMenuOpen}
          />
        )}
        
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            <ProductGrid 
              products={displayedProducts}
              loading={isLoading}
              error={error}
            />
            
            {totalItems > itemsPerPage && (
              <Pagination 
                totalItems={totalItems} 
                itemsPerPage={itemsPerPage} 
                currentPage={currentPage} 
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}
      </div>
    </main>
  );
};

export default ProductsPage; 
