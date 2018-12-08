import React from 'react';
import Form from './common/form';
import Joi from 'joi-browser';
import getGenres from '../services/fakeGenreService';
import { getMovies } from '../services/fakeMovieService';

class AddMovieForm extends Form {

    state = {
        data:{
            title:"",
            genreID:"",
            numberInStock:"",
            dailyRentalRate:"",
        },
        genres:[],
        errors:{}
    }

    schema = {
        id: Joi.string(),
        title: Joi.string().required().label("Title"),
        genreID: Joi.string().required().label("Genre"),
        numberInStock: Joi.number().min(0).max(999).required().label("Number In Stocks"),
        dailyRentalRate: Joi.number().min(0).max(10).required().label("Rate")
    }

    doSubmit()
    {
        console.log("added the movie")
        this.props.history.push("./movie")
    }

    componentDidMount()
    {
        const genres = getGenres();
        this.setState( {genres} );

        // const movieID = this.props.match.params.id;

        // if(movieID === "new") return;

        // const movie = getMovies(movieID);
        // if(!movie) return this.props.history.replace("not-replace");
        
    }
    
    mapToViewModel(movie)
    {
        return {
            _id: movie._id,
            genreID: movie.genre._id,
            title: movie.title,
            numberInStock: movie.numberInStock,
            dailyRentalRate: movie.dailyRentalRate
        }
    }
    render()
    {
        return ( 
            <div>
            <h1 style={{marginBottom:'50px'}}>Add a new movie</h1>
               <form onSubmit={this.handleSubmit}>
                   {this.renderInput("title", "Title")}
                   {this.renderSelect("genreID", "Genre", this.state.genres)}
                   {this.renderInput("numberInStock", "Number In Stock", "number")}
                   {this.renderInput("dailyRentalRate", "Rate", "number")}

                   {this.renderButton("Add Movie")}
               </form>
            </div>
        );
    }

}
export default AddMovieForm;