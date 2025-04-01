import React, { useEffect, useRef, useReducer } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleCart } from '../../redux/actions/cartActions';
import { TopBanner, UserContainer, ShoppingBag, MobileMenu, HeaderSearch } from '../../components';
import logo from '../../assets/logo/Everlast_logo2.png';
import './Header.css';

const initialState = {
  searchTerm: '',
  showSearch: false,
  scrolled: false,
  mobileMenuOpen: false,
  activeDropdown: null,
};

const headerReducer = (state, action) => {
  switch (action.type) {
    case 'SET_SEARCH_TERM':
      return { ...state, searchTerm: action.payload };
    case 'TOGGLE_SEARCH':
      return { ...state, showSearch: !state.showSearch };
    case 'SET_SCROLLED':
      return { ...state, scrolled: action.payload };
    case 'TOGGLE_MOBILE_MENU':
      return { ...state, mobileMenuOpen: !state.mobileMenuOpen, activeDropdown: null };
    case 'SET_ACTIVE_DROPDOWN':
      return { ...state, activeDropdown: state.activeDropdown === action.payload ? null : action.payload };
    default:
      return state;
  }
};

const Header = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [state, dispatchState] = useReducer(headerReducer, initialState);
  const cartItems = useSelector(state => state.cart.items);
  const { isCartOpen } = useSelector(state => state.cart);
  const menuRef = useRef(null);

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

  useEffect(() => {
    const handleScroll = () => {
      dispatchState({ type: 'SET_SCROLLED', payload: window.scrollY > 100 });
    };

    if (!isAuthPage) {
      window.addEventListener('scroll', handleScroll);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isAuthPage]);

  const handleKeyPress = (e) => {
    if (e.key === 'Escape') {
      dispatchState({ type: 'TOGGLE_SEARCH' });
    } else if (e.key === 'Enter' && state.searchTerm.trim()) {
    }
  };

  const handleToggleCart = (e) => {
    e.preventDefault();
    dispatch(toggleCart(!isCartOpen));
  };

  const handleCloseCart = () => {
    dispatch(toggleCart(false));
  };

  const toggleSearchBox = () => {
    dispatchState({ type: 'TOGGLE_SEARCH' });

    if (!state.showSearch) {
      setTimeout(() => {
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
          searchInput.focus();
        }
      }, 100);
    }
  };

  const handleClickOutside = (e) => {
    if (state.showSearch && !e.target.closest('.search-container')) {
      dispatchState({ type: 'TOGGLE_SEARCH' });
    }
    
    if (state.mobileMenuOpen && menuRef.current && !menuRef.current.contains(e.target) && !e.target.closest('.mobile-menu-toggle')) {
      dispatchState({ type: 'TOGGLE_MOBILE_MENU' });
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [state.showSearch, state.searchTerm, state.mobileMenuOpen]);

  useEffect(() => {
    dispatchState({ type: 'TOGGLE_MOBILE_MENU' });
    dispatchState({ type: 'SET_ACTIVE_DROPDOWN', payload: null });
  }, [location.pathname]);

  const toggleMobileMenu = () => {
    dispatchState({ type: 'TOGGLE_MOBILE_MENU' });
  };

  const toggleDropdown = (index, e) => {
    if (window.innerWidth > 991) {
      return;
    }
    e.preventDefault();
    dispatchState({ type: 'SET_ACTIVE_DROPDOWN', payload: index });
  };

  return (
    <>
      <TopBanner scrolled={state.scrolled} isAuthPage={isAuthPage} />
      <header className={`header-container ${state.scrolled ? 'scrolled' : ''} ${isAuthPage ? 'static' : ''}`}>
        <div className="header-content flex-between container-fluid">
          <div className="logo">
            <Link to="/">
              <img src={logo} alt="Everlast" />
            </Link>
          </div>
          
          <MobileMenu 
            isOpen={state.mobileMenuOpen}
            menuRef={menuRef}
            activeDropdown={state.activeDropdown}
            toggleDropdown={toggleDropdown}
            setMobileMenuOpen={toggleMobileMenu}
          />
          
          <div className="header-icons flex-row">
            <HeaderSearch 
              showSearch={state.showSearch}
              searchTerm={state.searchTerm}
              toggleSearch={toggleSearchBox}
              updateSearchTerm={(value) => dispatchState({ type: 'SET_SEARCH_TERM', payload: value })}
            />
    
            <UserContainer />
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