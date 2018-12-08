import React from 'react';
import Form from './common/form';
import Joi from 'joi-browser';

class RegisterForm extends Form {
    state = { 
        data:{
            email:"",
            password:"",
            name:""
        },
        errors:{},
    }

    schema = {
        email: Joi.string().email().required().label("Email"),
        password: Joi.string().regex(/^[a-zA-Z0-9]{5,30}$/).required().label("Password"),
        name: Joi.string().required().label("Name"),
    }
    
    doSubmit = () =>
    {
        //Call the server
        console.log("Registered");
    }
    

    render() { 

        return ( 
            <div>
                <h1 style={{marginBottom:'50px'}}>Register Form</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput("email", "Email")}
                    {this.renderInput("password","Password","password")}
                    {this.renderInput("name","name")}

                    {this.renderButton("Sign Up")}
                </form>

            </div>
        );
    }
}
 
export default RegisterForm;