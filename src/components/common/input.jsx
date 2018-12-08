import React from 'react';

const input = (props) => {
    const { name, label, error, ...rest} = props;

    return ( 
        <div className="form-group">
        <label htmlFor={name} style={{width:"50%"}}> {label}
            <input      
                {...rest}         //value={value}   // type= {type}  // onChange={onChange}
                name={name}
                id={name}
                className="form-control"
            />
        </label>
        {error && <div className="alert alert-danger"> {error} </div> }
    </div>
     );
}
 
export default input;