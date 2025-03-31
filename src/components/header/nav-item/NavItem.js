import React from 'react';
import { Link } from 'react-router-dom';
import './NavItem.css';

const NavItem = ({ item, index, activeDropdown, toggleDropdown, setMobileMenuOpen }) => {
  if (item.subMenu) {
    return (
      <li className={`nav-item dropdown ${activeDropdown === index ? 'active' : ''}`}>
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
    <li className="nav-item">
      <Link to={item.link} onClick={() => setMobileMenuOpen(false)}>
        {item.label}
      </Link>
    </li>
  );
};

export default NavItem; 