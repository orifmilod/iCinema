import React from 'react';
import Form from './common/form';
import Joi from '@hapi/joi';
import Axios from 'axios';

class AddMovieForm extends Form {
    constructor() {
        super();
    }
    state = {
        data:{
            title:"",
            genre:"",
            numberInStock:"",
            dailyRentalRate:"",
        },
        genres:[],
        errors:{}
    }

    schema = {
        id: Joi.string(),
        title: Joi.string().required().label("Title"),
        genre: Joi.string().required().label("Genre"),
        numberInStock: Joi.number().min(0).required().label("Number In Stocks"),
        dailyRentalRate: Joi.number().min(0).max(10).required().label("Rate")
    }

    //Overriding handleSubmit method
    handleSubmit = (e) => {
        super.handleSubmit(e);
    
        Axios
        .post('/api/movies/addmovie', this.state.data)
        .then(result => { 
            console.log(result);
            this.props.history.push("/movies"); 
        })
        .catch(error => console.error(error))
        // saveMovie(this.state.data);
       
    }

    async componentDidMount()
    {
        Axios.get('/api/genres')
        .then(docs => this.setState({ genres: docs.data }))
        .catch(err => console.error(err));

        // this.setState({ genres });

        // const movieID = this.props.match.params.id;

        // if(movieID === "new") return;

        // const movie = getMovies(movieID);
        // if(!movie) return this.props.history.replace("not-replace");
    }

    mapToViewModel(movie) {
        return {
            _id: movie._id,
            genre: movie.genre._id,
            title: movie.title,
            numberInStock: movie.numberInStock,
            dailyRentalRate: movie.dailyRentalRate
        }
    }

    render() {
        //Restructuring genres object
        const _genres = [];
        this.state.genres.forEach((element) => _genres.push({ _id: element._id, value: element.genre }));
        
        return ( 
            <div className="container">
                <h1>Add a new movie</h1>
                <form onSubmit={this.handleSubmit}>
                   {this.renderInput("title", "Title")}
                   {this.renderSelect("genre", "Genre", _genres)}
                   {this.renderInput("numberInStock", "Number In Stock", "number")}
                   {this.renderInput("dailyRentalRate", "Rate", "number")}

                   {this.renderSubmitButton("Add Movie")}
               </form>
            </div>
        );
    }
}
export default AddMovieForm;