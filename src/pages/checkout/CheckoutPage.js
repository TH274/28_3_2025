import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { fetchCart } from '../../redux/actions/cartActions';
import { createOrder } from '../../redux/actions/orderActions';
import './CheckoutPage.css';
import { Button, LoadingSpinner } from '../../components';

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, loading, error } = useSelector(state => state.cart);
  const { user } = useSelector(state => state.auth);
  const { loading: orderLoading } = useSelector(state => state.orders);

  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    paymentMethod: 'credit_card',
    notes: ''
  });

  useEffect(() => {
    if (!user) {
      navigate('/login', { state: { from: '/checkout' } });
    } else {
      dispatch(fetchCart());
    }
  }, [dispatch, navigate, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateSubtotal = () => {
    return items.reduce((total, item) => total + item.totalPrice, 0);
  };

  const calculateShipping = () => {
    const subtotal = calculateSubtotal();
    return subtotal > 100 ? 0 : 10;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateShipping();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const orderData = {
      items: items.map(item => ({
        productId: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image
      })),
      shippingAddress: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        phone: formData.phone
      },
      paymentMethod: formData.paymentMethod,
      subtotal: calculateSubtotal(),
      shipping: calculateShipping(),
      total: calculateTotal(),
      notes: formData.notes,
      status: 'pending'
    };

    dispatch(createOrder(orderData))
      .then(() => {
        navigate('/orders');
      });
  };

  if (loading || orderLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="alert alert-danger container">{error}</div>;
  }

  if (!items || items.length === 0) {
    return (
      <main>
        <div className="checkout-page-header">
          <div className="container">
            <h1>Checkout</h1>
            <ul className="breadcrumb">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/cart">Cart</Link></li>
              <li>Checkout</li>
            </ul>
          </div>
        </div>

        <div className="container">
          <div className="alert alert-warning">
            Your cart is empty. Please add items to your cart before proceeding to checkout.
            <Link to="/products" className="btn btn-primary mt-3 d-block">Shop Now</Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main>
      <div className="checkout-page-header">
        <div className="container">
          <h1>Checkout</h1>
          <ul className="breadcrumb">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/cart">Cart</Link></li>
            <li>Checkout</li>
          </ul>
        </div>
      </div>

      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="checkout-container">
            <div>
              <div className="form-section">
                <h2>Contact Information</h2>
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-section">
                <h2>Shipping Address</h2>
                <div className="form-group">
                  <label htmlFor="address">Address</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="city">City</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="state">State</label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="zipCode">ZIP Code</label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-section">
                <h2>Payment Method</h2>
                <div className="form-group">
                  <div className="radio-group">
                    <div className="radio-option">
                      <input
                        type="radio"
                        id="credit_card"
                        name="paymentMethod"
                        value="credit_card"
                        checked={formData.paymentMethod === 'credit_card'}
                        onChange={handleChange}
                      />
                      <label htmlFor="credit_card">
                        Credit Card
                      </label>
                    </div>
                    <div className="radio-option">
                      <input
                        type="radio"
                        id="paypal"
                        name="paymentMethod"
                        value="paypal"
                        checked={formData.paymentMethod === 'paypal'}
                        onChange={handleChange}
                      />
                      <label htmlFor="paypal">
                        PayPal
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h2>Order Notes</h2>
                <div className="form-group">
                  <label htmlFor="notes">Notes (Optional)</label>
                  <textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="Special instructions for delivery"
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="order-summary">
              <h2>Order Summary</h2>
              {items.map(item => (
                <div className="item" key={item.id}>
                  <div className="name">
                    {item.name}
                    <span className="quantity">x{item.quantity}</span>
                  </div>
                  <div className="price">${item.totalPrice.toFixed(2)}</div>
                </div>
              ))}

              <div className="total-row">
                <div className="label">Subtotal</div>
                <div className="value">${calculateSubtotal().toFixed(2)}</div>
              </div>

              <div className="total-row">
                <div className="label">Shipping</div>
                <div className="value">
                  {calculateShipping() === 0 ? 'Free' : `$${calculateShipping().toFixed(2)}`}
                </div>
              </div>

              <div className="total-row">
                <div className="label">Total</div>
                <div className="value">${calculateTotal().toFixed(2)}</div>
              </div>

              <div className="checkout-actions">
                <Button
                  type="submit"
                  className="checkout-button"
                  disabled={orderLoading}
                  loading={orderLoading}
                  block
                >
                  {orderLoading ? 'Processing...' : 'Place Order'}
                </Button>
              </div>
            </div>

          </div>
        </form>
      </div>
    </main>
  );
};

export default CheckoutPage;