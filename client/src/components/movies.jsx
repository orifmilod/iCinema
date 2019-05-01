import React, { Component } from "react";
import _ from 'lodash';
import Pagination from './common/Pagination.jsx';
import paginate from '../Utils/paginate';
import MoviesTable from './moviesTable.jsx';

import Categories from "./categories.jsx";
import categorize from '../Utils/categorize';
import { Link } from 'react-router-dom';
import { SearchItem } from './common/search';
import Input from './common/input';

import { connect } from "react-redux";
import { GetMovies } from '../actions/moviesAction';
import { GetGenres } from '../actions/genreAction';

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
      searchFilter
    } = this.state;

    let movies = [];
    let categorizedMovie = [];
    const { allMovies, genres } = this.props;

    if(_.isEmpty(allMovies)) console.log("No Movies Yet");
    else {
      let searchedMovies;
      /* Checking for searched item if nothing searched it will just set it to allMovies*/
      searchedMovies = _.isEmpty(search) ? allMovies : SearchItem(search, allMovies, searchFilter)
      // search ? searchedMovies = SearchItem(search, allMovies, searchFilter) : searchedMovies = allMovies
      
      categorizedMovie = categorize(searchedMovies, currentGenre) 
      const sortedMovies = _.orderBy(categorizedMovie, [sortColumn.path], [sortColumn.order])
      movies = paginate(sortedMovies, currentPage, pageSize);
    }
    
    return (
     <div className="background-container">
        <div className="container">
          <div className="row">
            <div className='col-2'>
              <h4 className="text-muted text-left p-1">Filters</h4>
              <Categories
                currentGenre={currentGenre}
                onGenreChange={this.handleGenreChange}
                allGenres={genres}
              />
              <Link to="/movies/new" className="btn blue btn-block my-2 text-white"> Add Movie </Link>
            </div>
           
            <div className="col-10">
              <Input 
                name="search" 
                onChange={this.handleSearch} 
                iconClass="fas fa-search"
                placeholder="Search..."
              />
              <p className="text-left text-muted"> { movies ? `${movies.length}` : "0"} items available.</p>
              {
                movies ?
                  <MoviesTable
                    onDelete={this.handleDelete} 
                    onLike={this.handleLike}
                    movies={movies}
                    sortColumn={sortColumn}
                    onSort={this.handleSort}
                  />  :
                  <div>No Movies</div>
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
      genres: state.genre.genres
  }
}
const mapDispatchToProps = dispatch => {
  return { 
      GetMovies: () => dispatch(GetMovies()),
      GetGenres: () => dispatch(GetGenres())
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (Movies);
