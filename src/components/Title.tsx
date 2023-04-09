import React from 'react';

interface ITitleProps {
  children: string;
  className: string;
}

const Title: React.FC<ITitleProps> = ({ children, className }) => {
  return (
    <h2 className={className}>
      <strong>{children}</strong>
    </h2>
  );
};

export default Title;
