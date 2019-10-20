import React from 'react';
import './style.css';

const Button = ({ label, ...rest }) => {
  return (
    <button className='special-btn' {...rest}> {label} </button>
   );
}
 
export default Button;