import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../../redux/actions/authActions';
import '../register/RegisterPage.css';
import { Button, Message } from '../../components';

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const { loading, error, isAuthenticated } = useSelector(state => state.auth);
  
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      return console.error('Passwords do not match');
    }
    
    try {
      await dispatch(register({
        firstName: formData.firstName,
        lastName: formData.lastName,
        username: formData.username,
        email: formData.email,
        password: formData.password
      }));
      navigate('/');
    } catch (error) {
      console.error('Registration error:', error);
    }
  };
  
  return (
    <main>
      <div className="register-page-header">
        <div className="container">
          <h1>Register</h1>
          <ul className="breadcrumb">
            <li><Link to="/">Home</Link></li>
            <li>Register</li>
          </ul>
        </div>
      </div>
      
      <div className="container">
        <div className="register-container">
          <h2 style={{ marginBottom: '20px', fontWeight: '600' }}>Create Account</h2>
          {error && <Message variant="danger">{error}</Message>}
          {loading && <Message>Loading...</Message>}
          
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="register-form-group">
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
              
              <div className="register-form-group">
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
            </div>
            
            <div className="register-form-group">
              <label htmlFor="username">Username</label>
              <input 
                type="text" 
                id="username" 
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="register-form-group">
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
            
            <div className="form-grid">
              <div className="register-form-group">
                <label htmlFor="password">Password</label>
                <input 
                  type="password" 
                  id="password" 
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="register-form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input 
                  type="password" 
                  id="confirmPassword" 
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <Button 
              className="register-button" 
              type="submit" 
              disabled={loading}
              loading={loading}
              block
            >
              Create Account
            </Button>
            
            {loading && (
              <div className="loading-spinner" style={{ textAlign: 'center', marginTop: '20px' }}>
                <div className="spinner"></div>
              </div>
            )}
          </form>
          
          <div className="register-footer">
            <p>Already have an account?</p>
            <Link to="/login">Sign In</Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default RegisterPage; 