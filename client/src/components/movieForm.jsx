import React from 'react';
import { getMovie} from '../services/fakeMovieService';


const MovieForm = ( {match, history}) => {
    return ( 
        <React.Fragment>
            {!getMovie(match.params.id) && history.replace("/not-found")}
            <h1>Movie Form {match.params.id} </h1>
            <button className='btn btn-primary' onClick={() => history.push('/movies')}>Save</button>
        </React.Fragment>
     );
}
 
export default MovieForm;