import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import _ from 'lodash';

import Pagination from '../common/Pagination.jsx';
import paginate from '../../Utils/paginate';
import MoviesTable from '../MoviesTable';

import Categories from "../categories";
import categorize from '../../Utils/categorize';
import { SearchItem } from '../common/search';
import Input from '../common/input';
import { GetMovies } from '../../actions/moviesAction';
import { GetGenres } from '../../actions/genreAction';

class Movies extends Component {
  state = {
    genres: [],
    pageSize: 12,
    currentPage: 1,
    currentGenre: "All",
    sortColumn: { path: '', order: ''},
    search: "",
    searchFilter:"title"
  };

  componentDidMount() {
    //Get movies form MongoDB
    this.props.GetMovies();
    this.props.GetGenres();
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
  render() {
    const { 
      currentGenre, 
      currentPage, 
      pageSize, 
      sortColumn,
      search,
      searchFilter,
      
    } = this.state;

    let movies = [];
    let categorizedMovie = [];
    const { allMovies, genres, loggedIn } = this.props; 
    if(_.isEmpty(allMovies)){ 
      return (
        <div className="background-container">
          <h1 className="text-muted">Loading Movies...</h1>
        </div>
      )
    }
    else {
      let searchedMovies;
      /* Checking for searched item if nothing searched it will just set it to allMovies*/
      searchedMovies = _.isEmpty(search) ? allMovies : SearchItem(search, allMovies, searchFilter)
      
      categorizedMovie = categorize(searchedMovies, currentGenre) 
      const sortedMovies = _.orderBy(categorizedMovie, [sortColumn.path], [sortColumn.order])
      movies = paginate(sortedMovies, currentPage, pageSize);
    }

    return (
     <div className="background-container">
        <div className="container">
          <div className="row">
            <div className='col-md-2 col-sm-12'>
              <h4 className="text-muted text-left p-1">Filters</h4>
              <Categories
                currentGenre={currentGenre}
                onGenreChange={this.handleGenreChange}
                allGenres={genres}
              />
              { loggedIn && <Link to="/movies/new" className="btn blue btn-block my-2 text-white"> Add Movie </Link> }
            </div>
           
            <div className="col-md-10 col-sm-12">
              <Input 
                name="search" 
                onChange={this.handleSearch} 
                iconClass="fas fa-search"
                placeholder="Search..."
              />
              <p className="text-left text-muted"> { movies ? `${movies.length}` : "0"} items available.</p>
              {
                  movies.length > 0 ?
                  <MoviesTable
                    onDelete={this.handleDelete} 
                    onLike={this.handleLike}
                    movies={movies}
                    sortColumn={sortColumn}
                    onSort={this.handleSort}
                  />  :
                  <h1 className="text-white">No Movies</h1>
              }
              <br/>
              <Pagination
                itemsCount={categorizedMovie.length}
                pageSize={this.state.pageSize}
                onPageChange={this.handlePageChange}
                currentPage={this.state.currentPage}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { 
      allMovies: state.movie.movies,
      genres: state.genre.genres,
      loggedIn: state.auth.loggedIn
  }
}
const mapDispatchToProps = dispatch => {
  return { 
      GetMovies: () => dispatch(GetMovies()),
      GetGenres: () => dispatch(GetGenres())
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (Movies);
