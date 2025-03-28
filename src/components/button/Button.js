import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';


const Button = ({
  children,
  type = 'button',
  className = '',
  variant = 'primary',
  size = 'medium',
  outline = false,
  block = false,
  icon = null,
  iconPosition = 'left',
  disabled = false,
  loading = false,
  onClick,
  ...rest
}) => {
  const baseClass = 'btn';
  
  const classes = [
    baseClass,
    variant && `btn-${variant}`,
    size && `btn-${size}`,
    outline && 'btn-outline',
    block && 'btn-block',
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      onClick={onClick}
      {...rest}
    >
      {loading ? (
        <span className="btn-loading">Loading...</span>
      ) : (
        <>
          {icon && iconPosition === 'left' && <span className="btn-icon btn-icon-left">{icon}</span>}
          <span className="btn-text">{children}</span>
          {icon && iconPosition === 'right' && <span className="btn-icon btn-icon-right">{icon}</span>}
        </>
      )}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  className: PropTypes.string,
  variant: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  outline: PropTypes.bool,
  block: PropTypes.bool,
  icon: PropTypes.node,
  iconPosition: PropTypes.oneOf(['left', 'right']),
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  onClick: PropTypes.func
};

export default Button; 