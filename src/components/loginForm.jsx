import React from 'react'
import Joi from 'joi-browser';
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
        password: Joi.string().required().label("Password"),    // Just a markup
    }

    doSubmit = () =>
    {
        //Call the server
        console.log('submited')
    }
    render() { 
        return ( 
            <div>
                <h1 style={{marginBottom:'50px'}}>Login</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput("username","Username")}
                    {this.renderInput("password","Password","password")}
                    {this.renderButton("Login")}
                </form>
            </div>
        );
    }
}
 
export default LoginForm; 