import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { login } from '../../redux/actions/authActions';
import './LoginPage.css';
import { Button } from '../../components';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [formError, setFormError] = useState('');
  
  const { loading, error, isAuthenticated } = useSelector(state => state.auth);
  
  // Add the login-page class to the body when component mounts
  useEffect(() => {
    document.body.classList.add('login-page');
    
    // Remove the class when component unmounts
    return () => {
      document.body.classList.remove('login-page');
    };
  }, []);
  
  useEffect(() => {
    console.log('Auth state changed:', isAuthenticated, location.state);
    if (isAuthenticated && location.state?.from) {

      navigate(location.state.from);

    } else if (isAuthenticated) {

      const token = localStorage.getItem('token');
      const userJson = localStorage.getItem('user');
      
      if (token && userJson) {
        navigate('/');
      }
    }
  }, [isAuthenticated, navigate, location.state]);
  
  useEffect(() => {
    if (error) {
      setFormError(error);
    }
  }, [error]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (formError) {
      setFormError('');
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.username.trim()) {
      setFormError('Username is required');
      return;
    }
    
    if (!formData.password.trim()) {
      setFormError('Password is required');
      return;
    }
    
    try {
      await dispatch(login(formData));
    } catch (error) {
      console.error('Login submission error:', error);
    }
  };
  
  return (
    <main className="login-page-main">
      <div className="login-page-header">
        <div className="container">
          <h1>Login</h1>
          <ul className="breadcrumb">
            <li><Link to="/">Home</Link></li>
            <li>Login</li>
          </ul>
        </div>
      </div>
      
      <div className="container">
        <div className="login-container">
          <h2 style={{ marginBottom: '20px', fontWeight: '600' }}>Sign In</h2>
          {formError && <div className="alert alert-danger">{formError}</div>}
          
          <form onSubmit={handleSubmit}>
            <div className="login-form-group">
              <label htmlFor="username">Username</label>
              <input 
                type="text" 
                id="username" 
                name="username"
                value={formData.username}
                onChange={handleChange}
                disabled={loading}
                required
              />
            </div>
            
            <div className="login-form-group">
              <label htmlFor="password">Password</label>
              <input 
                type="password" 
                id="password" 
                name="password"
                value={formData.password}
                onChange={handleChange}
                disabled={loading}
                required
              />
            </div>
            
            <Button 
              className="login-button" 
              type="submit" 
              disabled={loading}
              loading={loading}
              block
            >
              Sign In
            </Button>
            
            {loading && (
              <div className="loading-spinner" style={{ textAlign: 'center', marginTop: '20px' }}>
                <div className="spinner"></div>
              </div>
            )}
          </form>
          
          <div className="login-footer">
            <p>Don't have an account?</p>
            <Link to="/register">Create Account</Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LoginPage; 