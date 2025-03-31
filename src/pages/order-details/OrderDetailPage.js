import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useParams, useNavigate } from 'react-router-dom';
import { fetchOrderDetails } from '../../redux/actions/orderActions';
import { Button, LoadingSpinner } from '../../components';
import './OrderDetailPage.css';

const OrderDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentOrder, loading, error } = useSelector(state => state.orders);
  const { user } = useSelector(state => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && id) {
      dispatch(fetchOrderDetails(id));
    }
  }, [dispatch, id, user]);

  if (!user) {
    return <Navigate to="/login" state={{ from: `/order/${id}` }} />;
  }

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="alert alert-danger container">{error}</div>;
  }

  if (!currentOrder) {
    return (
      <div className="container">
        <div className="alert alert-warning">Order not found.</div>
        <Link to="/orders" className="btn btn-primary">Return to Orders</Link>
      </div>
    );
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

  const handleReorder = () => {
  };

  const handleCancelOrder = () => {
  };

  return (
    <main>
      <div className="order-detail-page-header">
        <div className="container">
          <h1>Order Details</h1>
          <ul className="breadcrumb">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/orders">Orders</Link></li>
            <li>Order #{currentOrder.id}</li>
          </ul>
        </div>
      </div>

      <div className="container">
        <div className="order-container">
          <div className="order-header">
            <div className="order-id">
              <h2>Order <span>#{currentOrder.id}</span></h2>
              <div className="order-date">
                Placed on {new Date(currentOrder.orderDate).toLocaleDateString()} at {new Date(currentOrder.orderDate).toLocaleTimeString()}
              </div>
            </div>
            <div className="order-status">
              Status:
              <span className={`badge ${getStatusClass(currentOrder.status)}`}>
                {currentOrder.status.toUpperCase()}
              </span>
            </div>
          </div>

          <div className="order-grid">
            <div className="order-items">
              <h3>Order Items</h3>
              {currentOrder.items.map((item, index) => (
                <div className="order-item" key={index}>
                  <div className="item-image">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="item-details">
                    <div className="item-name">{item.name}</div>
                    <div className="item-meta">Quantity: {item.quantity}</div>
                    <div className="item-price">${item.price.toFixed(2)} each</div>
                  </div>
                  <div className="item-total">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}

              <div className="order-action-buttons">
                <Button 
                  className="order-detail-button outline" 
                  onClick={() => navigate('/orders')}
                >
                  Back to Orders
                </Button>
                <Button 
                  className="order-detail-button outline" 
                  onClick={handleReorder}
                >
                  Reorder
                </Button>
                <Button 
                  className="order-detail-button outline" 
                  onClick={handleCancelOrder}
                >
                  {currentOrder.status === 'cancelled' ? 'Cancelled' : 'Cancel Order'}
                </Button>
              </div>
            </div>

            <div className="order-info">
              <h3>Order Summary</h3>

              <div className="info-section">
                <h4>Shipping Address</h4>
                <div className="address-details">
                  <div>{currentOrder.shippingAddress.firstName} {currentOrder.shippingAddress.lastName}</div>
                  <div>{currentOrder.shippingAddress.address}</div>
                  <div>{currentOrder.shippingAddress.city}, {currentOrder.shippingAddress.state} {currentOrder.shippingAddress.zipCode}</div>
                  <div>Phone: {currentOrder.shippingAddress.phone}</div>
                </div>
              </div>

              <div className="info-section">
                <h4>Payment Information</h4>
                <div className="payment-details">
                  <div>
                    <span className="label">Method:</span> {currentOrder.paymentMethod === 'credit_card' ? 'Credit Card' : 'PayPal'}
                  </div>
                  {currentOrder.paymentMethod === 'credit_card' && (
                    <div>
                      <span className="label">Card:</span> **** **** **** 4321
                    </div>
                  )}
                </div>
              </div>

              <div className="info-section">
                <h4>Order Total</h4>
                <div className="total-summary">
                  <div className="total-row">
                    <div className="label">Subtotal:</div>
                    <div className="value">${currentOrder.subtotal.toFixed(2)}</div>
                  </div>
                  <div className="total-row">
                    <div className="label">Shipping:</div>
                    <div className="value">
                      {currentOrder.shipping === 0 ? "Free" : `$${currentOrder.shipping.toFixed(2)}`}
                    </div>
                  </div>
                  <div className="total-row grand-total">
                    <div className="label">Total:</div>
                    <div className="value">${currentOrder.total.toFixed(2)}</div>
                  </div>
                </div>
              </div>

              {currentOrder.notes && (
                <div className="info-section">
                  <h4>Order Notes</h4>
                  <p>{currentOrder.notes}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default OrderDetailPage; 