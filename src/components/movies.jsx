import React, { Component } from "react";
import _ from 'lodash';
import { getMovies } from "../services/fakeMovieService";
import Pagination from './common/Pagination.jsx';
import paginate from '../Utils/paginate';
import MoviesTable from './moviesTable.jsx';

import Categories from "./categories.jsx";
import categorize from '../Utils/categorize';
import getGenres from "../services/fakeGenreService.js";
import { Link } from 'react-router-dom';


class Movies extends Component {
  state = {
    allMovies:[],
    genres:[],
    pageSize: 4,
    currentPage: 1,
    currentGenre: "All",
    selectecGenre:'',
    sortColumn: { path: '', order: ''}
  };

  componentDidMount()
  {
    this.setState({ allMovies: getMovies(), genres: getGenres()})
  }

  handleDelete = movie => {
    const movies = this.state.allMovies.filter(m => m._id !== movie._id);
    this.setState({ allMovies:movies });
  };

  handlePageChange = (page) =>
  {
      this.setState({
        currentPage: page
      });
  }
  
  handleLike = movie => {  
    const movies = [...this.state.allMovies];
    const index = movies.indexOf(movie);
    movies[index] = {...movies[index]};
    movies[index].liked = !movies[index].liked;
    this.setState({ allMovies: movies });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  }

  handleGenreChange = genre => {
    this.setState({ currentGenre: genre });
  }

  render() {

    const {
      allMovies, 
      currentGenre, 
      currentPage, 
      pageSize, 
      genres,  
      sortColumn
    } = this.state;


    const categorizedMovie = categorize(allMovies, currentGenre) 

    const sortedMovies = _.orderBy(categorizedMovie, [sortColumn.path], [sortColumn.order])

    const movies = paginate(sortedMovies, currentPage, pageSize);

    const { length: count } = categorizedMovie;
    if (count === 0) return <p>There are no movies in the database.</p>;

    return (
      <React.Fragment>

      <div className="row">
      
      <div className='col-lg-1' style={{margin:'10px'}}>
        <Categories
          currentGenre = {currentGenre}
          onGenreChange = {this.handleGenreChange}
          allGenres={genres}
        />
      </div>

      <div className="col-lg-3">
        <Link to="/movies/addmovie" className="btn btn-primary"> Add Movie </Link>
        <p>You have {count} movies available.</p>
        
        <MoviesTable
          onDelete={this.handleDelete} 
          onLike={this.handleLike}
          movies={movies}
          sortColumn={sortColumn}
          onSort={this.handleSort}
        />
    
      </div>
                
      
    </div>
      <div className='row'>
        <div style={{paddingLeft:'350px', paddingTop:'100px'}} >
            <Pagination
                itemsCount={categorizedMovie.length}
                pageSize={this.state.pageSize}
                onPageChange={this.handlePageChange}
                currentPage={this.state.currentPage}
            />
        </div>
      </div>
      </React.Fragment>
    );
  }
}

export default Movies;
