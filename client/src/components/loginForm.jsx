import React from 'react'
import Joi from '@hapi/joi';
import Form from './common/form';
import Axios from 'axios';
import _ from 'lodash';
// import { connect } from 'react-redux';
// import { SignIn } from '../actions/authAction';

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
        email: Joi.string().email().required().label("Email"),    
        password: Joi.string().required().label("Password"), 
    }

    handleSubmit = (e) => {
        super.handleSubmit(e);
        
        if(_.isEmpty(this.state.errors)) {
            console.log("requesting")
            Axios
            .post('/api/users/login', this.state.data)
            .then(result => { this.setState({ authError: "" }); console.log(result)})
            .catch(error => this.setState({ authError: error.response.data.error }))
        }
    }

    render() { 
        const { authError } = this.state;
        return ( 
            <div className="background-container">
                <div className="container">
                <h1 className="main-header">Login</h1>
                    <form onSubmit={this.handleSubmit}>
                        {this.renderInput("email", "Email", "Please enter your email...", "fas fa-envelope", "email", true)}
                        {this.renderInput("password", "Password","Please enter your password...", "fas fa-key", "password" )}
                        {authError && <p className="bg-danger text-white ">{authError}</p>}
                        {this.renderSubmitButton("Login")}
                    </form>
                </div>
            </div>
        );
    }
}
// const mapStateToProps = state => {
//     return { 
//         authErrorr: state.auth.authError
//     }
// }
// const mapDispatchToProps = dispatch => {
//     console.log(dispatch);
//     return {
//         SignIn: (creds) => dispatch(SignIn(creds))  
//     }
// }

  
export default (LoginForm); 