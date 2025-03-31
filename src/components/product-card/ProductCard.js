import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart, toggleCart } from '../../redux/actions/cartActions';
import './ProductCard.css';
import { Button } from '../../components';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const [selectedSize, setSelectedSize] = useState(null);
  
  const handleAddToCart = (size) => {
    setSelectedSize(size);
    
    try {
      const sizeVariant = {
        ...product,
        uniqueId: `${product.id}`,
        quantity: 1,
        size: size,
        totalPrice: product.price
      };
      
      dispatch(addToCart(sizeVariant));
      dispatch(toggleCart(true));
    } catch (err) {
      console.error('Error adding to cart:', err);
      alert('Failed to add item to cart. Please try again.');
    }
  };
  
  return (
    <div className="product-card content-box">
      <div className="media-container">
        <img src={product.image} alt={product.name} />
        <div className="actions">
          <div className="size-options flex-row flex-wrap">
            {['S', 'M', 'L', 'XL', '2XL', '3XL'].map((size) => (
              <Button 
                key={size} 
                className={`size-button ${selectedSize === size ? 'selected' : ''}`} 
                onClick={() => handleAddToCart(size)}
                size="small"
              >
                {size}
              </Button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="flex-column">
        <h3><Link to={`/product/${product.id}`}>{product.name}</Link></h3>
        <div className="price">${product.price.toFixed(2)}</div>
      </div>
    </div>
  );
};

export default ProductCard; 