import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";

import { search, categorize, filterRating } from "../../utils";
import { Pagination } from "../../components";
import { Input, Loading, ListGroup } from "../../components/common";

import { getGenres } from "../../actions/genreAction";

class Movies extends Component {
  state = {
    genres: [],
    movies: [],
    pageSize: 12,
    currentPage: 1,
    currentGenre: "All",
    searchFilter: "",
    rating: 0,
    loading: true,
    totalResults: 0,
  };

  componentDidMount() {
    this.fetchMovies();
    this.props.getGenres();
  }
  

  fetchMovies = async (page = 1) => {
    const apiKey = '5e221987';
    const url = `http://www.omdbapi.com/?s=all&apikey=${apiKey}`;
    this.setState({ loading: true });

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.Response === "True") {
        this.setState((prevState) => ({
          movies: [...prevState.movies, ...data.Search],
          loading: false,
          totalResults: parseInt(data.totalResults, 10),
        }));
      } else {
        this.setState({ loading: false });
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
      this.setState({ loading: false });
    }
  };

  handleChange = (name, value) => {
    this.setState({ [name]: value, currentPage: 1 });
  };

  onPageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleLoadMore = () => {
    const nextPage = Math.ceil(this.state.movies.length / 10) + 1;
    this.fetchMovies(nextPage);
  };

  render() {
    const {
      currentGenre,
      currentPage,
      searchFilter,
      pageSize,
      rating,
      loading,
      movies,
      totalResults,
    } = this.state;

    const { genres, loggedIn } = this.props;

    if (loading && _.isEmpty(movies)) {
      return (
        <div className="background-container pt-5">
          <Loading />
        </div>
      );
    }

    if (_.isEmpty(movies) && !loading) {
      return (
        <div className="background-container pt-5">
          <h1>No movies found.</h1>
        </div>
      );
    }

    let filteredMovies = [];

    /* Checking for searched item if nothing searched it will just set it to allMovies*/
    filteredMovies = search(movies, searchFilter, "Title");
    filteredMovies = categorize(filteredMovies, currentGenre);
    filteredMovies = filterRating(filteredMovies, rating);

    const startIndex = (currentPage - 1) * pageSize;
    const moviesToDisplay = filteredMovies.slice(startIndex, startIndex + pageSize);

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

              <div className="row">
                {moviesToDisplay.map((movie) => (
                  <div key={movie.imdbID} className="col-lg-3 col-md-4 col-sm-6 mb-4">
                    <div className="card h-100">
                      <img
                        src={movie.Poster}
                        className="card-img-top"
                        alt={movie.Title}
                      />
                      <div className="card-body">
                        <h5 className="card-title">{movie.Title}</h5>
                        <p className="card-text">Year: {movie.Year}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {movies.length < totalResults && (
                <div className="text-center my-4">
                  <button className="btn btn-primary" onClick={this.handleLoadMore}>
                    Load More
                  </button>
                </div>
              )}

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
    genres: state.genre.genres,
    loggedIn: state.auth.loggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenres: () => dispatch(getGenres()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Movies);
