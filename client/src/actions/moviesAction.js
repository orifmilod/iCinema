import Axios from "axios";
import { GET_MOVIES_SUCCESS, GET_MOVIES_ERROR } from './actionTypes';

export function GetMovies() {
    console.log("Getting movies")
    return function (dispatch) {
        Axios.get('/api/movies')
        .then(docs => { console.log(123); dispatch({ type: GET_MOVIES_SUCCESS, payload: docs.data.movies}) } )
        .catch(error => dispatch({ type: GET_MOVIES_ERROR, error }))   
    }
}
