import React from 'react';
import Form from './common/form';
import Joi from '@hapi/joi';
import Axios from 'axios';

class RegisterForm extends Form {
    constructor() {
        super();
    }
    state = { 
        data:{
            email:"",
            password:"",
            passwordRepeat:""
        },
        errors:{},
        authError: ""
    }

    handleSubmit = (e) => {
        super.handleSubmit(e);

        const { password, passwordRepeat, email } = this.state.data;
        if(password !== passwordRepeat) this.setState({ authError: "The passwords doesn't match." });
        else {
            Axios
            .post('/api/users/signup', { email, password })
            .then(result => { 
                this.setState({ authError: "" }); 
                console.log(result)}
            )
            .catch(error => this.setState({ authError: error.response.data.error }))
        }
    } 

    schema = {
        email: Joi.string().email().required().label("Email"),
        password: Joi.string().min(8).required().label("Password"),
        passwordRepeat: Joi.string().required().label("username"),
    }
    render() { 
        const { authError } = this.state;
        return ( 
            <div className="background-container">
                <div className="container">
                    <h1 className="main-header">Register Form</h1>
                    <form onSubmit={this.handleSubmit}>
                        {this.renderInput("email", "Email", "Please enter your email...", "fas fa-envelope", "email", true)}
                        {this.renderInput("password", "Password", "Enter a new password...", "fas fa-key", "password")}
                        {this.renderInput("passwordRepeat","Repeat Password", "Repeat your password...","fas fa-key", "password")}
                        {authError && <p className="bg-danger text-white">{authError}</p>}
                        {this.renderSubmitButton("Sign Up")}
                    </form>
                </div>
            </div>
        );
    }
}
 
export default RegisterForm;