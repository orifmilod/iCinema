import React from 'react';
import './style.css';

const Select = ({ name, label, options, error, iconClass }) => {
  console.log(options);
  return ( 
    <div className="input-container">
      {label && <label htmlFor={name}> {label} </label> }
      <div className={`input-icon ${iconClass}`}/> 
      <select name={name}>
        <option value="">Select</option>
        {options.map(element => (
          <option key={element._id} value={element.value} >
            {element.value} 
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger"> {error} </div>}
    </div>
  );
}
 
export default Select;