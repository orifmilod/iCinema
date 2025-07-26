import React from 'react';
import './style.css';

const Input = ({ name, label, error, iconClass, type, ...rest }) => {
  const isTextarea = type === "textarea";
  const commonProps = {
    name,
    className: "form-control",
    ...rest,
  };

  return (
    <div className="input-container">
      {label && <label htmlFor={name}>{label}</label>}
      {iconClass && <div className={`input-icon ${iconClass}`} />}
      {isTextarea ? (
        <textarea {...commonProps} />
      ) : (
        <input type={type} {...commonProps} />
      )}
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};
 
export default Input;
