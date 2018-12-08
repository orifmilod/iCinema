import React from 'react';

const Select = ( props ) => {
    const { name, label, options, error, ...rest} = props;
    return ( 
        <div className="form-group">
            <label htmlFor={name}> {label} </label>
            
            <select name={name} id={name} {...rest} className="from-control">
            <option value=""/>
            {options.map(option => 
            (
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