import React from 'react';

const input = ({ name, label, error,...rest}) => {
    return ( 
        <div className="form-group text-left">
            <label htmlFor={name}> {label} </label>
            <input      
                {...rest}         //value, type, onChange, placeholder, autoFocus
                name={name}
                id={name}
                className="form-control"
            />
           
        {error && <div className="alert alert-danger"> {error} </div>}
        </div>
     );
}
 
export default input;