import React from 'react';
import Form from './common/form';
import Joi from '@hapi/joi';
import getGenres from '../services/fakeGenreService';
import { saveMovie } from '../services/fakeMovieService';
import Axios from 'axios';


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
        numberInStock: Joi.number().min(0).required().label("Number In Stocks"),
        dailyRentalRate: Joi.number().min(0).max(10).required().label("Rate")
    }

    //Overriding handleSubmit method
    handleSubmit = (e) => {
        e.preventDefault();
        const errors = this.validate();
        this.setState({ errors: errors || {} }); //If error occur set it in state or if its not set empty object
        if(errors) return;

        saveMovie(this.state.data);
        this.props.history.push("/movies");
    }

    componentDidMount()
    {
        const genres = getGenres();
        this.setState({ genres });

        // const movieID = this.props.match.params.id;

        // if(movieID === "new") return;

        // const movie = getMovies(movieID);
        // if(!movie) return this.props.history.replace("not-replace");
    }

    add = () => {
        Axios.post('/api/users/adduser', { 
            "email" : "test@test.com",
            "password": "password"
        })
    }
    
    mapToViewModel(movie) {
        return {
            _id: movie._id,
            genreID: movie.genre._id,
            title: movie.title,
            numberInStock: movie.numberInStock,
            dailyRentalRate: movie.dailyRentalRate
        }
    }

    render() {
        return ( 
            <div className="container">
                <h1>Add a new movie</h1>
               <form onSubmit={this.handleSubmit}>
                   {this.renderInput("title", "Title")}
                   {this.renderSelect("genreID", "Genre", this.state.genres)}
                   {this.renderInput("numberInStock", "Number In Stock", "number")}
                   {this.renderInput("dailyRentalRate", "Rate", "number")}
                    <button onClick={this.add}>asd</button>
                   {this.renderSubmitButton("Add Movie")}
               </form>
            </div>
        );
    }
}
export default AddMovieForm;