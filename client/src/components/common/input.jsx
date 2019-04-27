import React from 'react';
import '../../css/input.css';

const input = ({ name, label, error, iconClass, ...rest,  }) => {
    return ( 
        <div className="inputt text-left my-3">
            {label && <label htmlFor={name}> {label} </label> }
            <div>
                {iconClass && <div className={`input-icon ${iconClass}`}/> }
                <input      
                    className="w-100"
                    name={name}
                    {...rest}         //value, type, onChange, placeholder, autoFocus
                />
            </div>
           
            {error && <div className="alert alert-danger"> {error} </div>}
        </div>
     );
}
 
export default input;