import React from 'react';
import './style.css';

const Select = ({ name, label, options, error, iconClass, value, onChange }) => {
  if (!options) return null;

  return (
    <div className="input-container">
      {label && <label htmlFor={name}>{label}</label>}
      <div className={`input-icon ${iconClass}`} />
      <select name={name} value={value} onChange={onChange} className="form-control">
        <option value="">Select a genre</option>
        {options.map((element) => (
          <option key={element._id} value={element._id}>
            {element.name}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};
 
export default Select;
