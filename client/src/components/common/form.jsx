import React, { Component } from 'react';
import Joi from '@hapi/joi';
import Input from './input';
import Select from './select';

class Form extends Component {
  
    state = { 
        data: {},
        errors: {},
    }

    validate = e => {
        const options = { abortEarly: false }
        const result = Joi.validate(this.state.data, this.schema, options);
        if(!result.error) return null;
      
        const errors = {};
        result.error.details.forEach(element => {
            errors[element.path[0]] = element.message;
        });
        return errors;
    }


    validateProperty = input =>
    {
        const { name, value } = input;

        const obj = { [name]: value}
        const schema = { [name]: this.schema[name] }

        const { error } = Joi.validate(obj, schema);

        return error ? error.details[0].message : null
    }



    renderInput(name, label, placeholder, iconClass, type='text', autoFocus=false)
    {
        const { data, errors } = this.state;
        return(
            <Input
                name={name}
                iconClass={iconClass}
                autoFocus={autoFocus}
                placeholder={placeholder}
                label={label}
                type={type}
                error={errors[name]}
                value={data[name]}
                onChange={this.handleChange}
            />
        )
    }

    renderSubmitButton(label)
    {
        return(        
            <button 
                type="submit"
                className="btn special-btn"
                disabled={this.validate()}
            >
                {label}
            </button>
        )
    }

    renderSelect(name, label, options)
    {
        const { data, errors } = this.state;
    
        return(
           <Select
            name={name}
            value={data[name]}
            label={label}
            options={options}
            onChange={this.handleChange}
            error={errors[name]}
           />
        )
    }
    handleSubmit(e){
        e.preventDefault();
        const errors = this.validate();
        this.setState({ errors: errors || {} }); //If error occur set it in state or if its not set empty object
        if(errors) return;
    }

    handleChange = ({ currentTarget: input }) =>
    {
        const errors = {...this.state.errors}
        const errorMessage = this.validateProperty(input);
        
        if(errorMessage) errors[input.name] = errorMessage;
        else delete errors[input.name];

        const data = {...this.state.data} 
        data[input.name] = input.value;
        this.setState({ data, errors });
    }
}
 
export default Form;