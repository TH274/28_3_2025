import React from 'react';
import styled from 'styled-components';

const MessageContainer = styled.div`
  padding: 1rem;
  margin: 1rem 0;
  border-radius: 4px;
  background-color: ${props => 
    props.variant === 'success' 
      ? '#d4edda' 
      : props.variant === 'danger' 
        ? '#f8d7da' 
        : props.variant === 'info' 
          ? '#d1ecf1' 
          : '#fff3cd'};
  color: ${props => 
    props.variant === 'success' 
      ? '#155724' 
      : props.variant === 'danger' 
        ? '#721c24' 
        : props.variant === 'info' 
          ? '#0c5460' 
          : '#856404'};
  border: 1px solid ${props => 
    props.variant === 'success' 
      ? '#c3e6cb' 
      : props.variant === 'danger' 
        ? '#f5c6cb' 
        : props.variant === 'info' 
          ? '#bee5eb' 
          : '#ffeeba'};
`;

const Message = ({ variant = 'info', children }) => {
  return (
    <MessageContainer variant={variant}>
      {children}
    </MessageContainer>
  );
};

export default Message; 