import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";

import { search, categorize, filterRating } from "../../utils";
import { MoviesTable, Pagination } from "../../components";
import { Input, Loading, ListGroup } from "../../components/common";

import { getMovies } from "../../actions/moviesAction";
import { getGenres } from "../../actions/genreAction";

class Movies extends Component {
  state = {
    genres: [],
    pageSize: 12,
    currentPage: 1,
    currentGenre: "All",
    searchFilter: "",
    rating: 0,
  };

  componentDidMount() {
    this.props.getMovies();
    this.props.getGenres();
  }

  handleChange = (name, value) => {
    this.setState({ [name]: value, currentPage: 1 });
  };

  onPageChange = (page) => {
    this.setState({ currentPage: page });
  };

  render() {
    const {
      currentGenre,
      currentPage,
      searchFilter,
      pageSize,
      rating,
    } = this.state;

    const { movies, genres, loggedIn } = this.props;

    if (_.isEmpty(movies)) {
      return (
        <div className="background-container pt-5">
          <Loading />
        </div>
      );
    }

    let filteredMovies = [];

    /* Checking for searched item if nothing searched it will just set it to allMovies*/
    filteredMovies = search(movies, searchFilter, "title");
    filteredMovies = categorize(filteredMovies, currentGenre);
    filteredMovies = filterRating(filteredMovies, rating);

    return (
      <div className="background-container">
        <div className="mx-5 py-5">
          <div className="row">
            <div className="col-lg-2 col-sm-12">
              <h4 className="text-muted text-left p-1">Filters</h4>
              <ListGroup
                active={currentGenre}
                onChange={(val) => this.handleChange("currentGenre", val)}
                options={genres}
              />

              <Input
                onChange={(val) =>
                  this.handleChange("rating", val.target.value)
                }
                label={"Rating"}
                min={0}
                max={10}
                placeholder="0-10"
                type="number"
                iconClass="fas fa-star"
              />
              {/* { loggedIn && <Link to='/movies/new' className='btn btn-primary btn-block my-2 text-white'> Add Movie </Link> } */}
              {/* <Rating total={5} filled={rating} onChange={val => this.handleChange('rating', val)}/> */}
            </div>

            <div className="col-lg-10 col-sm-12">
              <Input
                onChange={(event) =>
                  this.handleChange("searchFilter", event.target.value)
                }
                label="Search Movie"
                iconClass="fas fa-search"
                placeholder="Search..."
              />
              <p className="text-left text-muted">
                {!!filteredMovies.length ? `${filteredMovies.length}` : "0"}
                movies found.
              </p>

              {!!filteredMovies ? (
                <MoviesTable
                  pageSize={pageSize}
                  currentPage={currentPage}
                  movies={filteredMovies}
                />
              ) : (
                <h1 className="text-white">No Movies</h1>
              )}
              <br />

              <Pagination
                itemsCount={filteredMovies.length}
                pageSize={pageSize}
                onPageChange={this.onPageChange}
                currentPage={currentPage}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    movies: state.movie.movies,
    genres: state.genre.genres,
    loggedIn: state.auth.loggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getMovies: () => dispatch(getMovies()),
    getGenres: () => dispatch(getGenres()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Movies);
