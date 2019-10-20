import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import './style.css';
import MovieCard from '../common/MovieCard';
import { UpdateFavouriteMovies } from '../../actions/userAction';
import PropTypes from "prop-types";

class MoviesTable extends Component {
  state = {
    favouriteMovies:[],
    movies: []
  }
  favouriteCard = (movieID) => {
    let { auth, UpdateFavouriteMovies, favouriteMovies } = this.props

    if(!auth.loggedIn) this.props.history.push('/login')
    else {
      if(favouriteMovies.includes(movieID)) favouriteMovies = favouriteMovies.filter(fmID => fmID !== movieID);
      else favouriteMovies.push(movieID);
      
      UpdateFavouriteMovies(auth.userData.ID, { favouriteMovies: favouriteMovies });
    }
  }
  componentWillReceiveProps(props) {
      const { movies, favouriteMovies } = props;
      this.setState({ movies, favouriteMovies });
  }
  componentWillMount(){
      const { movies, favouriteMovies } = this.props;
      this.setState({ movies, favouriteMovies });
  }
  render() { 
    const { movies, favouriteMovies } = this.state;
    return ( 
      <div className="movies-grid">
      { 
        movies &&
        movies.map(movie => 
        <MovieCard 
          key={movie._id} 
          liked={favouriteMovies ? favouriteMovies.includes(movie._id) : false} movie={movie}
          ToggleFavouriteCard={this.favouriteCard}
        />) 
      }  
      </div>
    );
  }
}

MoviesTable.propTypes = {
  history: PropTypes.object.isRequired
}
const mapStateToProps = state => {
    return {
      favouriteMovies: state.auth.userData.favouriteMovies,
      auth: state.auth
    }
}
 
const mapDispatchToProps = dispatch => {
  return {
    UpdateFavouriteMovies: (userID, movieID) => dispatch(UpdateFavouriteMovies(userID, movieID))
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps) (MoviesTable));