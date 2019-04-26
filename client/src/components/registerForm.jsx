import React from 'react';
import Form from './common/form';
import Joi from '@hapi/joi';
import axios from 'axios';

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
     register = async () => {
        const data = { email: "test@test.com", password: "password"}
        await axios.post('/api/users/adduser', data)
        .then(result => console.log(result))
        .catch(err => console.error(err));
    }
    render() { 
        return ( 
            <div className="container">
                <h1>Register Form</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput("email", "Email")}
                    {this.renderInput("username","Username")}
                    {this.renderInput("password","Password","password")}
                    <button onClick={this.register}>REGISTER</button>
                    {this.renderSubmitButton("Sign Up")}
                </form>

            </div>
        );
    }
}
 
export default RegisterForm;