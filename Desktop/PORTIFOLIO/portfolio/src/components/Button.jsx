import React from 'react';
import { Button as BsButton } from 'react-bootstrap';

function Button({ children, variant = "primary", ...props }) {
  return (
    <BsButton variant={variant} {...props}>
      {children}
    </BsButton>
  );
}

export default Button;