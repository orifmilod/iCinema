import { GET_GENRES_ERROR, GET_GENRES_SUCCESS } from './actionTypes'
import Axios from 'axios';

export const GetGenres = () => {
    return async (dispatch) => {
        await Axios.get('/api/genres')
        .then(docs => dispatch({ type: GET_GENRES_SUCCESS, payload: docs.data }))
        .catch(error =>  dispatch({ type: GET_GENRES_ERROR, error }) );
    }
}