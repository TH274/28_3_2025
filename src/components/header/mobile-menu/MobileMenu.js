import React from 'react';
import { NAV_ITEMS } from '../../../constants/category_links';
import { NavItem } from '../../../components';
import './MobileMenu.css';

const MobileMenu = ({ 
  isOpen, 
  menuRef, 
  activeDropdown, 
  toggleDropdown, 
  setMobileMenuOpen
}) => {
  return (
    <>
      <div className="mobile-menu-toggle" onClick={() => setMobileMenuOpen()}>
        <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'}`}></i>
      </div>
      
      <nav className={`navigation ${isOpen ? 'active' : ''}`} ref={menuRef}>
        <ul className="main-menu">
          {NAV_ITEMS.map((item, index) => (
            <NavItem 
              key={index}
              item={item} 
              index={index} 
              activeDropdown={activeDropdown} 
              toggleDropdown={toggleDropdown} 
              setMobileMenuOpen={setMobileMenuOpen}
            />
          ))}
        </ul>
      </nav>
    </>
  );
};

export default MobileMenu; 