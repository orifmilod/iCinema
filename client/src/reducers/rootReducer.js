import { combineReducers } from "redux";
import authReducer from './authReducer';
import movieReducer from './movieReducer';

export default combineReducers({
    auth: authReducer,
    movie: movieReducer
});
