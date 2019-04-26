import React from 'react';
import Form from './common/form';
import Joi from '@hapi/joi';

class RegisterForm extends Form {
    state = { 
        data:{
            email:"",
            password:"",
            username:""
        },
        errors:{},
    }

    schema = {
        email: Joi.string().email().required().label("Email"),
        password: Joi.string().regex(/^[a-zA-Z0-9]{8,30}$/).required().label("Password"),
        username: Joi.string().required().label("username"),
    }

    render() { 
        return ( 
            <div className="container">
                <h1>Register Form</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput("email", "Email")}
                    {this.renderInput("username","Username")}
                    {this.renderInput("password","Password","password")}
                  
                    {this.renderSubmitButton("Sign Up")}
                </form>

            </div>
        );
    }
}
 
export default RegisterForm;