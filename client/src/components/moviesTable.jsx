import React, {Component} from 'react';
import Like from "./common/like.jsx";
import TableMaker from '../components/common/TableMaker.jsx';
import TableBody from '../components/common/tableBody.jsx';
import { Link } from 'react-router-dom';
import MovieCard from './common/movieCard';

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
        const { movies, onSort, sortColumn } = this.props;
        return ( 
                <div className="row">
                {movies.map(movie => <MovieCard movie={movie}/>)}
                {movies.map(movie => <MovieCard movie={movie}/>)}
                {/* <TableMaker
                    sortColumn={sortColumn}
                    columns={this.columns}
                    onSort={onSort}
                />
                <TableBody
                    data={movies}
                    columns={this.columns}
                /> */}
            </div>
        );
    }
}
 
export default MoviesTable;