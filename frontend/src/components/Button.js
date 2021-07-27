//import PropTypes from 'prop-types';
import React from 'react';

const Button = ({ color, text, onclick }) => {
  return <button style={{ backgroundColor: color }}>{text}</button>;
};

Button.defaultProps = {
  color: 'purple',
};

export default Button;
