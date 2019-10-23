import { LOGIN_SUCCESS, LOGIN_ERROR, SIGNOUT, SIGNUP_SUCCESS, SIGNUP_ERROR } from './actionTypes';
import Axios from 'axios';

export const SignIn = (credentials) => {
  return async (dispatch) => {    
    await Axios
    .post('/api/users/login', credentials)
    .then(result => dispatch({ type: LOGIN_SUCCESS, payload: result })) 
    .catch(error => dispatch({ type: LOGIN_ERROR, error }))
  }
}


export const SignUp = (credentials) => {
  return async (dispatch) => {    
    await Axios
    .post('/api/users/signup', credentials)
    .then(result => dispatch({ type: SIGNUP_SUCCESS, payload: result }))
    .catch(error => dispatch({ type: SIGNUP_ERROR, error }))
  }
}


export const SignOut = () => {
  return (dispatch) => { dispatch({ type: SIGNOUT }) }
}
