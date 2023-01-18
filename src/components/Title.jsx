import React from 'react';

function Title({ children, className }) {
  return (
    <h2 className={className}>
      <strong>{children}</strong>
    </h2>
  );
}

export default Title;
