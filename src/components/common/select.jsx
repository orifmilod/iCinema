import React from 'react';

const Select = ({ name, label, options, error, ...rest}) => {
    return ( 
        <div className="form-group text-left">
            <label htmlFor={name}> {label} </label>  

            <select name={name} id={name} {...rest} className="form-control">
                <option value="">Select</option>
                {options.map(option => (
                    <option 
                        key={option._id}
                        value={option.value}
                    >
                    {option.name} 
                    </option>
                ))}
            </select>
            {error && <div className="alert alert-danger">{error}</div>}
        </div>
     );
}
 
export default Select;