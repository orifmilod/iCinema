import Axios from "axios";
import { GET_MOVIES_SUCCESS, GET_MOVIES_ERROR } from './actionTypes';
export const GetMovies = () => {
    return async (dispatch) => {
        await Axios.get('/api/movies')
        .then(docs => dispatch({ type: GET_MOVIES_SUCCESS, payload: docs.data.movies }) )
        .catch(error => dispatch({ type: GET_MOVIES_ERROR, error }))   
    }
}

export const AddMovie = (movie) => {
    const contentType = {
        headers: {
            "content-type": "multipart/form-data"
        }
    }
    let formData = new FormData();
    formData.append("title", movie.title);
    formData.append("numberInStock", movie.numberInStock);
    formData.append("genre", movie.genre);
    formData.append("image", movie.image);
     
    return async (dispatch) => {
        await Axios.post('/api/movies/addmovie', formData, contentType)
        .then(docs => { console.log("Movie added"); dispatch({ type: GET_MOVIES_SUCCESS, payload: docs.data.movies }) })
        .catch(error => dispatch({ type: GET_MOVIES_ERROR, error }))   
    }
}