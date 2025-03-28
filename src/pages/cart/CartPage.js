import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { fetchCart, updateCartItem, removeFromCart } from '../../redux/actions/cartActions';
import { LoadingSpinner, Button } from '../../components';
import './CartPage.css';

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, loading, error } = useSelector(state => state.cart);
  
  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);
  
  const handleQuantityChange = (item, change) => {
    const newQuantity = item.quantity + change;
    if (newQuantity <= 0) {
      dispatch(removeFromCart(item.id));
    } else {
      const updates = {
        quantity: newQuantity,
        totalPrice: newQuantity * item.price
      };
      dispatch(updateCartItem(item.id, updates));
    }
  };
  
  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id));
  };
  
  const calculateSubtotal = () => {
    return items.reduce((total, item) => total + item.totalPrice, 0);
  };
  
  const handleCheckout = () => {
    navigate('/checkout');
  };
  
  if (loading) {
    return <LoadingSpinner />;
  }
  
  if (error) {
    return <div className="alert alert-danger container">{error}</div>;
  }
  
  return (
    <main>
      <div className="cart-page-header">
        <div className="container">
          <h1>Shopping Cart</h1>
          <ul className="breadcrumb">
            <li><Link to="/">Home</Link></li>
            <li>Shopping Cart</li>
          </ul>
        </div>
      </div>
      
      <div className="container">
        {items.length === 0 ? (
          <div className="empty-cart">
            <i className="fas fa-shopping-cart"></i>
            <h2>Your Cart is Empty</h2>
            <p>Looks like you haven't added any items to your cart yet.</p>
            <div className="empty-cart-message">
              <p>Your shopping bag is empty</p>
              <Button className="cart-button" onClick={() => navigate('/products')}>
                Continue Shopping
              </Button>
            </div>
          </div>
        ) : (
          <>
            <table className="cart-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {items.map(item => (
                  <tr key={item.id}>
                    <td>
                      <div className="product-info">
                        <img src={item.image} alt={item.name} />
                        <div>
                          <div className="title">
                            <Link to={`/product/${item.id}`}>{item.name}</Link>
                          </div>
                          <div className="category">{item.category}</div>
                        </div>
                      </div>
                    </td>
                    <td className="price">${item.price.toFixed(2)}</td>
                    <td>
                      <div className="item-quantity">
                        <Button 
                          className="quantity-btn" 
                          size="small"
                          onClick={() => handleQuantityChange(item, -1)}
                        >
                          -
                        </Button>
                        <span>{item.quantity}</span>
                        <Button 
                          className="quantity-btn" 
                          size="small"
                          onClick={() => handleQuantityChange(item, 1)}
                        >
                          +
                        </Button>
                      </div>
                    </td>
                    <td className="total">${item.totalPrice.toFixed(2)}</td>
                    <td className="item-actions">
                      <Button 
                        className="remove-btn" 
                        variant="danger" 
                        size="small"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        Remove
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="5" className="subtotal">
                    Subtotal: <span>${calculateSubtotal().toFixed(2)}</span>
                  </td>
                </tr>
              </tfoot>
            </table>
            
            <div className="cart-summary-actions">
              <Button className="cart-button" outline onClick={() => navigate('/products')}>
                Continue Shopping
              </Button>
              <Button className="cart-button" onClick={handleCheckout}>
                Proceed to Checkout
              </Button>
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default CartPage; 