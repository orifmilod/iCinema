import React from 'react'
import Joi from '@hapi/joi';
import Form from './common/form';
import _ from 'lodash';
import Input from './common/input';
import { connect } from 'react-redux';
import { SignIn } from '../actions/authAction';

class LoginForm extends Form {
    state = {
        data:{
            email:"",
            password:""
        },
        errors: { },
    }

    schema = {
        email: Joi.string().email().required().label("Email"),    
        password: Joi.string().required().label("Password"), 
    }

    handleSubmit = (e) => {
        super.handleSubmit(e);

        if(_.isEmpty(this.state.errors)) 
            this.props.SignIn(this.state.data)
    }

    render() { 
        const { email, password } = this.state.data;
        const { errors } = this.state;
        const { authMessage, loggedIn } = this.props;

        if(loggedIn) this.props.history.push('/');
        
        return ( 
            <div className="background-container">
                <div className="container">
                <h1 className="main-header">Login</h1>
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
                            type="password"
                            label="Password" 
                            error={errors["password"]}
                            iconClass="fas fa-key"
                            onChange={this.handleChange}
                            placeholder="Please enter your password..."
                            value={password}
                        />

                        {authMessage && <p className="bg-info text-white ">{authMessage}</p>}
                        {this.renderSubmitButton("Login")}
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
        SignIn: (creds) => dispatch(SignIn(creds))  
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (LoginForm); 