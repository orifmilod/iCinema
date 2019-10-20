import React from 'react';

const Select = ({ name, label, options, error, ...rest}) => {
  return ( 
    <div className="inputt">
      {label && <label htmlFor={name}> {label} </label> }
      <div>
        <div className="fas fa-fa-address-card"/> 
        <select name={name} {...rest} id="input">
          <option value="">Select</option>
          {options.map(element => (
            <option key={element._id} value={element.value} >
              {element.value} 
            </option>
          ))}
        </select>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
}
 
export default Select;