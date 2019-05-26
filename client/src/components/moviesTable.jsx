import React, {Component} from 'react';
import Like from "./common/like.jsx";
import { Link } from 'react-router-dom';
import MovieCard from './common/movieCard';
import { connect } from 'react-redux';
import { UpdateFavouriteMovies } from '../actions/userAction';
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import '../css/movieCard.css';
import { throws } from 'assert';

class MoviesTable extends Component {
    state = {
        favouriteMovies:[],
        movies: []
    }
    columns = [
        { 
            path: 'title',
            label: 'Title',
            content: movie => <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
        },
        { path: 'genre', label: 'Genre' },
        { path: 'numberInStock', label: 'Stock' },
        { path: 'dailyRentalRate', label: 'Rate' },
        { 
            label: 'Favourite', key: "fav", 
            content: movie => <Like liked={movie.liked} onLike={() => this.props.onLike(movie)}/> 
        },
        { 
            label: 'Remove', key: "remove", 
            content: movie => 
            <button onClick={() => this.props.onDelete(movie)} className="btn btn-danger btn-sm">Delete</button> 
        }
    ]
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
        console.log(favouriteMovies);
        this.setState({ movies, favouriteMovies });
    }
    componentWillMount(){
        const { movies, favouriteMovies } = this.props;
        this.setState({ movies, favouriteMovies });
    }
    render() { 
        const { movies, favouriteMovies } = this.state;
        console.log(favouriteMovies);
        return ( 
            <div className="row">
                { 
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
    console.log(state.auth.userData.favouriteMovies)
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