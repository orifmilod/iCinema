import React from 'react';
import Form from './common/form';
import Joi from '@hapi/joi';
import Input from './common/input';
import _ from 'lodash';
import { connect } from 'react-redux';
import { SignUp } from '../actions/authAction';

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
        passwordError: ""
    }

    handleSubmit = (e) => {
        super.handleSubmit(e);
        console.log(1)
        const { password, passwordRepeat, email } = this.state.data;
        if(password !== passwordRepeat) this.setState({ passwordError: "The passwords doesn't match." });
        else this.props.SignUp({ email, password });
    } 

    schema = {
        email: Joi.string().email().required().label("Email"),
        password: Joi.string().min(8).required().label("Password"),
        passwordRepeat: Joi.string().required().label("Repear Password"),
    }
    render() { 
        const { authMessage, loggedIn } = this.props;
        const { errors, passwordError } = this.state;
        const { email, password, passwordRepeat } = this.state.data;
        console.log(passwordError)
        if(loggedIn) this.props.history.push('/');

        return ( 
            <div className="background-container">
                <div className="container">
                    <h1 className="main-header">Register Form</h1>
                    <form onSubmit={this.handleSubmit}>
                        <Input 
                            name="email" 
                            label="Email" 
                            type="email"
                            error={errors["email"]}
                            iconClass="fas fa-envelope"
                            onChange={this.handleChange}
                            placeholder="Please enter your email..."
                            value={email}
                            autoFocus
                        />
                        <Input 
                            name="password" 
                            label="Password" 
                            type="password"
                            error={errors["password"]}
                            iconClass="fas fa-key"
                            onChange={this.handleChange}
                            placeholder="Please enter your password..."
                            value={password}
                        /> 
                          <Input 
                            name="passwordRepeat" 
                            type="password"
                            label="Repeat Password" 
                            error={errors["passwordRepeat"]}
                            iconClass="fas fa-key"
                            onChange={this.handleChange}
                            placeholder="Repeat your password..."
                            value={passwordRepeat}
                        /> 
                       
                        { authMessage || passwordError ? <p className="bg-info text-white"> {authMessage} {passwordError}</p> : <> </>}
                       
                        <button type="submit" className="btn special-btn" disabled={this.validate()}>
                            Sign Up
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return { 
        loggedIn: state.auth.loggedIn,
        authMessage: state.auth.authMessage
    }
}
const mapDispatchToProps = dispatch => {
    return {
        SignUp: (creds) => dispatch(SignUp(creds))  
    }
}

 
export default connect(mapStateToProps, mapDispatchToProps) (RegisterForm);