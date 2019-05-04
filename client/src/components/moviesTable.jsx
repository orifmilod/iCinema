import React, {Component} from 'react';
import Like from "./common/like.jsx";
import { Link } from 'react-router-dom';
import MovieCard from './common/movieCard';
import { connect } from 'react-redux';
import { ToggleFavouriteCard } from '../actions/userAction';
import '../css/movieCard.css';

class MoviesTable extends Component {

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

    render() { 
        const { movies, onSort, sortColumn, favouriteMovies, ToggleFavouriteCard, userID } = this.props;

        return ( 
            <div className="row">
                { 
                    movies.map(movie => 
                    <MovieCard 
                        key={movie._id} 
                        liked={favouriteMovies ? favouriteMovies.includes(movie._id) : false} movie={movie}
                        ToggleFavouriteCard={() => ToggleFavouriteCard(userID)}
                    />) 
                }  
            </div>
        );
    }
}

function FavouriteMovie() {
    
}

const mapStateToProps = state => {
    return {
        favouriteMovies: state.auth.userData.favouriteMovies,
        userID: state.auth.userData.ID
    }
}
 
const mapDispatchToProps = dispatch => {
    return {
        ToggleFavouriteCard: (favouriteMovies) => dispatch(ToggleFavouriteCard(favouriteMovies))
    }
}
export default connect(mapStateToProps, mapDispatchToProps) (MoviesTable);