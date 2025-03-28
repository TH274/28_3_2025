import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { updateCartItem, removeFromCart } from '../../redux/actions/cartActions';
import './ShoppingBag.css';
import Button from '../button/Button';

const ShoppingBag = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { items } = useSelector(state => state.cart);
  const bagRef = useRef(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (bagRef.current && !bagRef.current.contains(event.target) && isOpen) {
        onClose();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);
  
  const handleQuantityChange = (item, change) => {
    const newQuantity = item.quantity + change;
    if (newQuantity <= 0) {
      dispatch(removeFromCart(item.id));
    } else {
      const updates = {
        quantity: newQuantity,
        totalPrice: parseFloat((newQuantity * item.price).toFixed(2))
      };
      dispatch(updateCartItem(item.id, updates));
    }
  };
  
  const handleCheckout = () => {
    onClose();
    navigate('/checkout');
  };
  
  const calculateSubtotal = () => {
    return items.reduce((total, item) => total + item.totalPrice, 0).toFixed(2);
  };
  
  
  return (
    <>
      {/* Dark overlay behind the shopping bag */}
      <div className={`shopping-bag-backdrop ${isOpen ? 'active' : ''}`} onClick={onClose}></div>
      
      {/* Shopping bag component */}
      <div className={`shopping-bag-overlay ${isOpen ? 'active' : ''}`} ref={bagRef}>
        <div className="shopping-bag-header">
          <div className="close-button" onClick={onClose}>✕</div>
          <h2>SHOPPING BAG</h2>
        </div>
        
        <div className="shopping-bag-items">
          {items.length === 0 ? (
            <div className="empty-bag-message">
              <p>Your shopping bag is empty.</p>
              <Link to="/products" onClick={onClose}>Continue shopping</Link>
            </div>
          ) : (
            items.map(item => (
              <div className="bag-item" key={item.id}>
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="bag-item-image" 
                />
                <div className="bag-item-details">
                  <div className="bag-item-title">{item.name}</div>
                  <div className="bag-item-info">Colour: {item.color || 'BLACK/TAUPE'}</div>
                  <div className="bag-item-info">Size: {item.size || '2XL'}</div>
                  <div className="bag-item-quantity-row">
                    <div className="item-quantity">
                      <Button 
                        className="quantity-button" 
                        size="small"
                        onClick={() => handleQuantityChange(item, -1)}
                      >
                        -
                      </Button>
                      <span>{item.quantity}</span>
                      <Button 
                        className="quantity-button" 
                        size="small"
                        onClick={() => handleQuantityChange(item, 1)}
                      >
                        +
                      </Button>
                    </div>
                    <div className="bag-item-price">
                      ${item.totalPrice.toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        
        {items.length > 0 && (
          <div className="shopping-bag-footer">
            <div className="subtotal">
              <span>Subtotal</span>
              <span>${calculateSubtotal()}</span>
            </div>
            <div className="cart-buttons">
              <Button 
                className="checkout-button"
                onClick={() => handleCheckout()}
                block
                variant="primary"
              >
                CHECKOUT
              </Button>
              
              <Button 
                className="shop-pay-button"
                variant="secondary"
                onClick={() => handleCheckout()}
                block
              >
                <span className="shop-pay-icon">⚡</span> SHOP PAY
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ShoppingBag; 