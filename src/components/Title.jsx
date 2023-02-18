import React from 'react';

export default function Title({ children, className }) {
  
  return (
    <h2 className={className}>
      <strong>{children}</strong>
    </h2>
  );
}