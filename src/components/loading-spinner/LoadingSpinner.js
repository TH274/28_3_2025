import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = ({ text = 'Loading...' }) => {
  return (
    <div className="spinner-container">
      <div className="spinner"></div>
      <div className="loading-text">{text}</div>
    </div>
  );
};

export default LoadingSpinner; 