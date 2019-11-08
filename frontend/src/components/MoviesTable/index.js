import React from 'react';
import './style.css';

import MovieCard from './MovieCard';

const MoviesTable = ({ movies, currentPage, pageSize }) => {
  const currentMovies = movies.slice((currentPage - 1) * pageSize, pageSize * currentPage);
  return (
    <div className='movies-grid'>
      { 
        !!movies &&
        currentMovies.map(movie => <MovieCard movie={movie} key={movie._id}/>) 
      }  
    </div>
  )
}
export default MoviesTable;