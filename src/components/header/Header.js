import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { NAV_ITEMS } from './typeLink';
import { useDispatch, useSelector } from 'react-redux';
import { searchProducts } from '../../redux/actions/productActions';
import { toggleCart } from '../../redux/actions/cartActions';
import { logout } from '../../redux/actions/authActions';
import ShoppingBag from '../shopping-bag/ShoppingBag';
import logo from '../../assets/logo/Everlast_logo2.png';
import './Header.css';
import Button from '../button/Button';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const cartItems = useSelector(state => state.cart.items);
  const { isCartOpen } = useSelector(state => state.cart);
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const menuRef = useRef(null);
  const userDropdownRef = useRef(null);

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  useEffect(() => {
    if (isAuthPage) {
      document.body.classList.add('login-page');
    } else {
      document.body.classList.remove('login-page');
    }
    
    return () => {
      document.body.classList.remove('login-page');
    };
  }, [isAuthPage]);

  // Handle scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 100) {
        setScrolled(true);
        document.body.classList.add('scrolled-page');
      } else {
        setScrolled(false);
        document.body.classList.remove('scrolled-page');
      }
    };

    if (!isAuthPage) {
      window.addEventListener('scroll', handleScroll);
    }
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isAuthPage]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      dispatch(searchProducts(searchTerm));
      navigate(`/products?q=${encodeURIComponent(searchTerm)}`);
      setShowSearch(false);
      setSearchTerm('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Escape') {
      setShowSearch(false);
    } else if (e.key === 'Enter' && searchTerm.trim()) {
      handleSearch(e);
    }
  };

  const handleToggleCart = (e) => {
    e.preventDefault();
    dispatch(toggleCart(!isCartOpen));
  };

  const handleCloseCart = () => {
    dispatch(toggleCart(false));
  };

  const toggleSearchBox = (e) => {
    e.preventDefault();
    setShowSearch(!showSearch);
    if (!showSearch) {
      setTimeout(() => {
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
          searchInput.focus();
        }
      }, 100);
    }
  };

  const handleClickOutside = (e) => {
    if (showSearch && !e.target.closest('.search-container')) {
      setShowSearch(false);
    }
    
    if (mobileMenuOpen && menuRef.current && !menuRef.current.contains(e.target) && !e.target.closest('.mobile-menu-toggle')) {
      setMobileMenuOpen(false);
    }
    
    if (showUserDropdown && userDropdownRef.current && !userDropdownRef.current.contains(e.target) && !e.target.closest('.user-container')) {
      setShowUserDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [showSearch, searchTerm, mobileMenuOpen, showUserDropdown]);

  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
    setShowUserDropdown(false);
  }, [location.pathname]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    if (!mobileMenuOpen) {
      setActiveDropdown(null);
      setShowUserDropdown(false);
    }
  };

  const toggleDropdown = (index, e) => {
    if (window.innerWidth > 991) {
      return;
    }
    
    e.preventDefault();
  
    setActiveDropdown(activeDropdown === index ? null : index);
  };
  
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

  const renderNavItem = (item, index) => {
    if (item.subMenu) {
      return (
        <li key={index} className={`nav-item dropdown ${activeDropdown === index ? 'active' : ''}`}>
          <Link to={item.link} onClick={(e) => toggleDropdown(index, e)}>
            {item.label}
            <span className="dropdown-icon">
              <i className={`fas ${activeDropdown === index ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
            </span>
          </Link>
          <div className="dropdown-menu">
            <div className="dropdown-content">
              {item.subMenu.map((subMenu, subIndex) => (
                <div key={subIndex} className="dropdown-column">
                  <h4>{subMenu.title}</h4>
                  <ul>
                    {subMenu.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <Link to={link.link} onClick={() => setMobileMenuOpen(false)}>
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </li>
      );
    }

    return (
      <li key={index} className="nav-item">
        <Link to={item.link} onClick={() => setMobileMenuOpen(false)}>
          {item.label}
        </Link>
      </li>
    );
  };

  return (
    <>
      <div className={`top-banner ${scrolled ? 'hidden' : ''} ${isAuthPage ? 'static' : ''}`}>
        <div className="banner-container">
          <p><i className="fas fa-tag"></i>50% off select boxing boots</p>
          <p><i className="fas fa-truck"></i>Free standard shipping on all AU orders over $100*</p>
          <p><i className="fas fa-undo"></i>30 day returns on all orders</p>
        </div>
      </div>
      <header className={`header-container ${scrolled ? 'scrolled' : ''} ${isAuthPage ? 'static' : ''}`}>
        <div className="header-content">
          <div className="mobile-menu-toggle" onClick={toggleMobileMenu}>
            <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </div>
          
          <div className="logo">
            <Link to="/">
              <img src={logo} alt="Everlast" />
            </Link>
          </div>
          
          <nav className={`navigation ${mobileMenuOpen ? 'active' : ''}`} ref={menuRef}>
            <ul className="main-menu">
              {NAV_ITEMS.map((item, index) => renderNavItem(item, index))}
            </ul>
          </nav>
          
          <div className="header-icons">
            <div className="search-container">
              <a href="#" className="icon-link" onClick={toggleSearchBox}>
                <i className="fas fa-search"></i>
              </a>
              {showSearch && (
                <div className="search-box">
                  <form onSubmit={handleSearch}>
                    <input
                      id="search-input"
                      type="text"
                      placeholder="Search"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      autoFocus
                    />
                    <Button type="submit">
                      <i className="fas fa-search"></i>
                    </Button>
                  </form>
                </div>
              )}
            </div>
            
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
            
            <Link to="/wishlist" className="icon-link">
              <i className="fas fa-bookmark"></i>
            </Link>
            
            <a href="#" className="icon-link cart-icon" onClick={handleToggleCart}>
              <i className="fas fa-shopping-bag"></i>
              {cartItemCount > 0 && (
                <span className="cart-count">{cartItemCount}</span>
              )}
            </a>
          </div>
        </div>
      </header>

      <ShoppingBag isOpen={isCartOpen} onClose={handleCloseCart} />
    </>
  );
};

export default Header; 