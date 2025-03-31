import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../../redux/actions/authActions';
import './UserContainer.css';

const UserContainer = () => {
  const dispatch = useDispatch();
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const userDropdownRef = useRef(null);

  const toggleUserDropdown = (e) => {
    e.preventDefault();
    setShowUserDropdown(!showUserDropdown);
  };
  
  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    setShowUserDropdown(false);
    console.log('Logged out successfully');
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (showUserDropdown && userDropdownRef.current && !userDropdownRef.current.contains(e.target) && !e.target.closest('.user-container')) {
        setShowUserDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showUserDropdown]);

  return (
    <div className="user-container">
      {isAuthenticated ? (
        <>
          <a href="#" className="icon-link" onClick={toggleUserDropdown}>
            <i className="fas fa-user"></i>
          </a>
          {showUserDropdown && (
            <div className="user-dropdown" ref={userDropdownRef}>
              <div className="user-welcome">
                <p>Welcome, {user?.username || 'User'}</p>
              </div>
              <ul>
                <li><Link to="/orders">My Orders</Link></li>
                <li><a href="#" onClick={handleLogout}>Logout</a></li>
              </ul>
            </div>
          )}
        </>
      ) : (
        <Link to="/login" className="icon-link">
          <i className="fas fa-user"></i>
        </Link>
      )}
    </div>
  );
};

export default UserContainer; 