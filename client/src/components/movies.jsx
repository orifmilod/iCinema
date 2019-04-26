import React, { Component } from "react";
import _ from 'lodash';
import { getMovies } from "../services/fakeMovieService";
import Pagination from './common/Pagination.jsx';
import paginate from '../Utils/paginate';
import MoviesTable from './moviesTable.jsx';

import Categories from "./categories.jsx";
import categorize from '../Utils/categorize';
import getGenres from "../services/fakeGenreService";
import { Link } from 'react-router-dom';
import { SearchBar, SearchItem} from './common/search';
import axios from 'axios';
import { error } from "util";

class Movies extends Component {

  state = {
    allMovies:[],
    genres:[],
    pageSize: 4,
    currentPage: 1,
    currentGenre: "All",
    sortColumn: { path: '', order: ''},
    search: "",
    searchFilter:"title"
  };

  async componentDidMount()
  {
    await axios.get('/api/genres')
    .then(docs => this.setState({ genres: docs.data }))
    .catch(err => console.error(err))
    
    await axios.get('/api/movies')
    .then(docs => this.setState({ allMovies: docs.data.movies }))
    .catch(err => console.error(err))    
  }

  handleDelete = movie => {
    const movies = this.state.allMovies.filter(m => m._id !== movie._id);
    this.setState({ allMovies:movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
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

  handleSearch = (e) => {
    this.setState({ [e.target.name] : e.target.value, currentPage:1 })
  }
  clicy = () => {
    axios.get('/api/genres')
    .then(doc => console.log(doc))
    .catch(err => console.log(err))
  }
  render() {

    const {
      allMovies, 
      currentGenre, 
      currentPage, 
      pageSize, 
      genres,  
      sortColumn,
      search,
      searchFilter
    } = this.state;

    let searchedMovies;

    /* Checking for searched item if nothing searched it will just set it to allMovies*/
    search ? searchedMovies = SearchItem(search, allMovies, searchFilter) : searchedMovies = allMovies
    
    const categorizedMovie = categorize(searchedMovies, currentGenre) 
    const sortedMovies = _.orderBy(categorizedMovie, [sortColumn.path], [sortColumn.order])
    const movies = paginate(sortedMovies, currentPage, pageSize);

    const { length: count } = searchedMovies;
    if (count === 0) return <p>There are no movies in the database.</p>;

    return (
    
      // <div className="background">
      <div className="container py-5">
        <h1 className="main-header">Welcome to iCinema</h1>
        <div className="row">
          <div className='col-2'>
            <h4 className="text-muted text-left p-1">Filters</h4>
            <Categories
              currentGenre = {currentGenre}
              onGenreChange = {this.handleGenreChange}
              allGenres={genres}
            />
            <Link to="/movies/new" className="btn btn-success btn-block my-2"> Add Movie </Link>
          </div>
          {/* <div id="split-line"/> */}
          <div className="col-10">
            <SearchBar 
              name="search"
              onSearch={this.handleSearch} 
            />
            
            <p>You have {count} movies available.</p>
            
            <MoviesTable
              onDelete={this.handleDelete} 
              onLike={this.handleLike}
              movies={movies}
              sortColumn={sortColumn}
              onSort={this.handleSort}
            />
            <Pagination
              itemsCount={categorizedMovie.length}
              pageSize={this.state.pageSize}
              onPageChange={this.handlePageChange}
              currentPage={this.state.currentPage}
            />
          </div>
        </div>
      </div>
      // </div>
    );
  }
}

export default Movies;
