import React from 'react';

const Select = ({ name, label, options, error, ...rest}) => {
    return ( 
        <div className="form-group text-left">
            <label htmlFor={name}> {label} </label>  

            <select name={name} id={name} {...rest} className="form-control">
                <option value="">Select</option>
                {options.map(element => (
                    <option 
                        key={element._id}
                        value={element.value}
                    >
                    {element.value} 
                    </option>
                ))}
            </select>
            {error && <div className="alert alert-danger">{error}</div>}
        </div>
     );
}
 
export default Select;