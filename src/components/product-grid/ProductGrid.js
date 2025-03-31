import React from 'react';
import { ProductCard } from '../../components';
import './ProductGrid.css';

const ProductGrid = ({ products, loading, error }) => {
  if (loading) {
    return <div className="product-loading">Loading products...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  if (!products || products.length === 0) {
    return (
      <div className="no-products-message">
        <p>No products found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="products-grid grid-container">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid; 