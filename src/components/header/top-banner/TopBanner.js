import React from 'react';
import './TopBanner.css';

const TopBanner = ({ scrolled, isAuthPage }) => {
  return (
    <div className={`top-banner ${scrolled ? 'hidden' : ''} ${isAuthPage ? 'static' : ''}`}>
      <div className="banner-container">
        <p><i className="fas fa-tag"></i>50% off select boxing boots</p>
        <p><i className="fas fa-truck"></i>Free standard shipping on all AU orders over $100*</p>
        <p><i className="fas fa-undo"></i>30 day returns on all orders</p>
      </div>
    </div>
  );
};

export default TopBanner; 