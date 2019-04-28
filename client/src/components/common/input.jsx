import React from 'react';
import '../../css/input.css';

const input = ({ name, label, error, iconClass, ...rest }) => {
    return ( 
        <div className="inputt mb-3">
            {label && <label htmlFor={name}> {label} </label> }
            <div>
                {iconClass && <div className={`input-icon ${iconClass}`}/> }
                <input      
                    id="input"
                    name={name}
                    {...rest}         //value, type, onChange, placeholder, autoFocus
                />
            </div>
           
            {error && <div className="alert alert-danger"> {error} </div>}
        </div>
     );
}
 
export default input;