import { LOGIN_SUCCESS, LOGIN_ERROR, SIGNOUT_SUCCESS, SIGNUP_ERROR, SIGNUP_SUCCESS } from './actionTypes';
import Axios from 'axios';

export const SignIn = (credentials) => {
    console.log("Action");
    return (dispatch) => {    
        Axios
        .post('/api/users/login', credentials)
        .then(result => dispatch({ type: LOGIN_SUCCESS, payload: result}))
        .catch(error =>  dispatch({ type: LOGIN_ERROR, error }))
    }
}
