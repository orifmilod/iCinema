import React from 'react'
import Joi from '@hapi/joi';
import Form from './common/form';

class LoginForm extends Form {

    state = {
        data:{
            username:"",
            password:""
        },
        errors: { },
    }

    schema = {
        username: Joi.string().required().label("Username"),    // .label() is for what to show to the user, instead of "username", it will show "Username"
        password: Joi.string().required().regex(/^[a-zA-Z0-9]{8,30}$/).label("Password"),    // Just a markup
    }

    render() { 
        return ( 
            <div className="container">
               <h1>Login</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput("username", "Username", "text", "Please enter your username...", true)}
                    {this.renderInput("password", "Password", "password", "Please enter your password...")}
                    {this.renderSubmitButton("Login")}
                </form>
            </div>
        );
    }
}
 
export default LoginForm; 