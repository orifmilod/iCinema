import React from 'react'
import Joi from '@hapi/joi';
import Form from './common/form';
import Axios from 'axios';
import _ from 'lodash';

class LoginForm extends Form {
    constructor() {
        super();
    }
    state = {
        data:{
            email:"",
            password:""
        },
        errors: { },
        authError: ""
    }

    schema = {
        email: Joi.string().email().required().label("Email"),    // .label() is for what to show to the user, instead of "username", it will show "Username"
        password: Joi.string().required().label("Password"),    // Just a markup
    }

    handleSubmit = (e) => {
        super.handleSubmit(e);
        
        if(_.isEmpty(this.state.errors)) {
            console.log("requesting")
            Axios
            .post('/api/users/login', this.state.data)
            .then(() => this.setState({ authError: "" }))
            .catch(error => this.setState({ authError: error.response.data.error }))
        }
    }

    render() { 
        const { authError } = this.state;
        return ( 
            <div className="background-container">
                <div className="container py-5">
                <h1>Login</h1>
                    <form onSubmit={this.handleSubmit}>
                        {this.renderInput("email", "Email", "email", "Please enter your email...", "fas fa-envelope", true)}

                        {this.renderInput("password", "Password", "password", "Please enter your password...", "fas fa-key")}
                        {authError && <p className="bg-danger text-white ">{authError}</p>}
                        {this.renderSubmitButton("Login")}
                    </form>
                </div>
            </div>
        );
    }
}
 
export default LoginForm; 