import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { fetchOrders } from '../../redux/actions/orderActions';
import './OrdersPage.css';
import { Button, LoadingSpinner } from '../../components';

const OrdersPage = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector(state => state.orders);
  const { user } = useSelector(state => state.auth);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (user) {
      dispatch(fetchOrders());
    }
  }, [dispatch, user]);
  
  if (!user) {
    return <Navigate to="/login" state={{ from: '/orders' }} />;
  }
  
  if (loading) {
    return <LoadingSpinner />;
  }
  
  if (error) {
    return <div className="alert alert-danger container">{error}</div>;
  }
  
  const getStatusClass = (status) => {
    switch (status) {
      case 'pending':
        return 'pending';
      case 'processing':
        return 'processing';
      case 'shipped':
        return 'shipped';
      case 'delivered':
        return 'delivered';
      case 'cancelled':
        return 'cancelled';
      default:
        return 'pending';
    }
  };
  
  return (
    <main>
      <div className="orders-page-header">
        <div className="container">
          <h1>My Orders</h1>
          <ul className="breadcrumb">
            <li><Link to="/">Home</Link></li>
            <li>My Orders</li>
          </ul>
        </div>
      </div>
      
      <div className="container">
        <div className="orders-container">
          {orders.length === 0 ? (
            <div className="empty-orders">
              <i className="fas fa-shopping-bag"></i>
              <h2>No Orders Found</h2>
              <p>You haven't placed any orders yet.</p>
              <Button 
                className="orders-button" 
                onClick={() => navigate('/products')}
              >
                Start Shopping
              </Button>
            </div>
          ) : (
            orders.map(order => (
              <div className="order-card" key={order.id}>
                <div className="order-header">
                  <div className="order-id">
                    Order #{order.id}
                  </div>
                  <div className="order-date">
                    {new Date(order.orderDate).toLocaleDateString()} at {new Date(order.orderDate).toLocaleTimeString()}
                  </div>
                  <div className="order-status">
                    <span className={getStatusClass(order.status)}>
                      {order.status}
                    </span>
                  </div>
                </div>
                <div className="order-body">
                  <div className="order-summary">
                    <div className="summary-item">
                      <h4>Total Amount</h4>
                      <p>${order.total.toFixed(2)}</p>
                    </div>
                    <div className="summary-item">
                      <h4>Payment Method</h4>
                      <p>{order.paymentMethod === 'credit_card' ? 'Credit Card' : 'PayPal'}</p>
                    </div>
                    <div className="summary-item">
                      <h4>Items</h4>
                      <p>{order.items.reduce((sum, item) => sum + item.quantity, 0)}</p>
                    </div>
                    <div className="summary-item">
                      <h4>Shipping</h4>
                      <p>{order.shipping === 0 ? "Free" : `$${order.shipping.toFixed(2)}`}</p>
                    </div>
                  </div>
                  
                  <div className="order-items">
                    <h3>Items</h3>
                    <div className="item-preview">
                      {order.items.slice(0, 4).map((item, index) => (
                        <div className="item-image" key={index}>
                          <img src={item.image} alt={item.name} />
                        </div>
                      ))}
                      {order.items.length > 4 && (
                        <div className="more-items">
                          +{order.items.length - 4}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="order-footer">
                  <div className="order-total">
                    Total: <span>${order.total.toFixed(2)}</span>
                  </div>
                  <div className="order-actions">
                    <Button 
                      className="orders-button"
                      onClick={() => navigate(`/product/${order.items[0].productId}`)}
                    >
                      View Product Details
                    </Button>
                    <Button 
                      className="orders-button outline"                    >
                      Reorder
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
};

export default OrdersPage; 