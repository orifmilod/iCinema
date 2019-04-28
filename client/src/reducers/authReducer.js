import { LOGIN_SUCCESS, LOGIN_ERROR, SIGNOUT_SUCCESS, SIGNUP_ERROR, SIGNUP_SUCCESS } from '../actions/actionTypes';

const initState = {
    authError: null
};
const authReducer = (state = initState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                authError: null
            }
        case LOGIN_ERROR:
            return {
                ...state,
                authError: action.error
            }
        default:
            return state;
    }
}
export default authReducer;